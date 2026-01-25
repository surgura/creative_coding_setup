(() => {
  if (window.win) return;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  const win = {
    count: 9,
    selected: null,
    scale: Array(9).fill(0.5),
 x: Array(9).fill(0.0),
 y: Array(9).fill(0.0),
 step: 0.05,
 min: 0,
 max: 1,
  };

  const validSel = (i) => Number.isInteger(i) && i >= 1 && i <= win.count;

  document.addEventListener("keydown", (e) => {
    if (!e.ctrlKey) return;
    if (e.key === "0") win.selected = null;
    if (/^[1-9]$/.test(e.key)) win.selected = Number(e.key);
  });

    document.addEventListener("mousemove", () => {
      if (!validSel(win.selected)) return;
      const i = win.selected - 1;
      win.x[i] = mouse.posx;
      win.y[i] = mouse.posy;
    });

    document.addEventListener(
      "wheel",
      (e) => {
        if (!validSel(win.selected)) return;

        e.preventDefault();

        const i = win.selected - 1;
        const dir = e.deltaY < 0 ? 1 : -1;

        win.scale[i] = clamp(win.scale[i] + dir * win.step, win.min, win.max);
      },
      { passive: false }
    );

    window.win = win;

    // hydra extension
    if (!window.__win_hydra_ext) {
      window.__win_hydra_ext = true;

      const getHydra = () => {
        const whereami = window.location?.href?.includes("hydra.ojack.xyz")
        ? "editor"
        : window.atom?.packages
        ? "atom"
        : "idk";

        if (whereami === "editor") return window.hydraSynth;
        if (whereami === "atom")
          return global.atom.packages.loadedPackages["atom-hydra"].mainModule.main.hydra;

        return [
          window.hydraSynth,
          window._hydra,
          window.hydra,
          window.h,
          window.H,
          window.hy,
        ].find((h) => h?.regl);
      };

      const _hydra = getHydra();
      const _scope = _hydra.sandbox.makeGlobal ? window : _hydra.synth;

      const gS = _scope.osc().constructor.prototype;

      gS.towindow = function (num) {
        if (!Number.isInteger(num) || num < 1 || num > win.count) {
          return this; // no-op, keep chain intact
        }

        const i = num - 1;

        return this
        .scale(() => win.scale[i])
        .scroll(() => win.x[i], () => win.y[i]);
      };
    }
})();
