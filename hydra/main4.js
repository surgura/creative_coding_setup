await loadScript("scripts/plugins/hydra-src.js")
await loadScript("scripts/plugins/hydra-text.js")
await loadScript("scripts/plugins/hydra-mouse.js")

hydraText.font = "interceptor"
hydraText.lineWidth = "2%"

s0.initCam(0)
s1.initCam(1)
s2.initCam(2)



const w_scale = Array(9)
.fill(0.5);
const w_posx = Array(9)
.fill(0.0);
const w_posy = Array(9)
.fill(0.0);

solid(1, 1, 1)
.diff(shape([4, 4, 4, 24].smooth()
.fast(.5), 0.95, .09)
.repeat(20, 10))
.color(0, 0.2, 0)
.modulateScale(osc(2)
.rotate(-0.5), .22)
.add(
    src(o0)
    .scale(0.965)
    .rotate(.012 * (Math.round(-2)))
    .color(0.1, 0.5, 0.1)
    .modulateRotate(o0, 0.5)
    .brightness(.05), .7)
.layer(srcRelMask(s0)
.scale(() => w_scale[0])
.rotate(() => Math.sin(time) / 30)
.scroll(() => w_posx[0], () => w_posy[0])
//     .modulate(src(s1))
)
.layer(srcRelMask(s0)
.scale(() => w_scale[1])
.rotate(() => Math.sin(time) / 30)
.scroll(() => w_posx[1], () => w_posy[1])
//     .modulate(src(s1))
)
// .layer(srcRelMask(s1)
//     .scale(0.3)
//     .scroll(0.3, 0.3)
//     .pixelate(200, 100)
// )
// .layer(srcRelMask(s2)
//     .scale(0.35)
//     .scroll(-0.1, 0.1)
//     .pixelate(200, 100)
// )
// .layer(text("Neon Move")
//     .color(0.1, 0.5, 0.1)
//     .scale(0.3)
//     .scroll(0.2, -0.2)
//     .modulate(voronoi())
//     .modulate(osc(1, 1, 1))
// )
.out()

w_selected = null

function w_select(win) {
    w_selected = win;
}

function w_deselect() {
    w_selected = null;
}

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === '0') {
        w_deselect();
    }

    if (e.ctrlKey && /^[1-9]$/.test(e.key)) {
        w_select(Number(e.key));
    }
});

document.addEventListener("mousemove", (e) => {
    if (w_selected < 1 || w_selected > 9) return;

    e.preventDefault();
    w_posx[w_selected - 1] = mouse.posx;
    w_posy[w_selected - 1] = mouse.posy;



});

const SCALE_STEP = 0.05;

document.addEventListener("wheel", (e) => {
    if (w_selected < 1 || w_selected > 9) return;

    e.preventDefault();

    const i = w_selected - 1;
    const dir = e.deltaY < 0 ? 1 : -1; // up increases, down decreases

    w_scale[i] = Math.max(0, w_scale[i] + dir * SCALE_STEP);
}, {
    passive: false
});

