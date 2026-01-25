(() => {
  if (window.win) return; // prevent double init on reload

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

    // usage: win.new(0, srcRelMask(s0))
    // num is 0..8
    new(num, strm) {
      return strm
        .scale(() => win.scale[num])
        .scroll(() => win.x[num], () => win.y[num]);
    },
  };

  const valid = (i) => Number.isInteger(i) && i >= 1 && i <= win.count;

  document.addEventListener("keydown", (e) => {
    if (!e.ctrlKey) return;

    if (e.key === "0") win.selected = null;
    if (/^[1-9]$/.test(e.key)) win.selected = Number(e.key);
  });

  document.addEventListener("mousemove", () => {
    if (!valid(win.selected)) return;
    const i = win.selected - 1;
    win.x[i] = mouse.posx;
    win.y[i] = mouse.posy;
  });

  document.addEventListener("wheel", (e) => {
    if (!valid(win.selected)) return;

    e.preventDefault();

    const i = win.selected - 1;
    const dir = e.deltaY < 0 ? 1 : -1;

    win.scale[i] = clamp(win.scale[i] + dir * win.step, win.min, win.max);
  }, { passive: false });

  window.win = win;
})();
