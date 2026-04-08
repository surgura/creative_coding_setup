// A bunch of standard plugins
await loadScript("scripts/plugins/hydra-src.js")
await loadScript("scripts/plugins/hydra-text.js")
await loadScript("scripts/plugins/hydra-mouse.js")
await loadScript("scripts/plugins/hydra-glsl.js")

// This is my custom windowing plugin so I can show you multiple things at the same time
await loadScript("scripts/windows.js")

// Font setup
hydraText.font = "Source Code Pro Light"
hydraText.lineWidth = "2%"

// Source init
s0.initCam(0)
s1.initCam(1)
s2.initCam(2)

// Some images
// s3.initImage("image/brtree.jpg")
// s3.initImage("image/brtreetop.jpg")
// s3.initImage("image/reactorblur.webp")

// This lets me dynamically rotate the windows on screen
function winRotate(n) {
    return 0.0 //Math.sin(time * (1 + n / 10) + n) / 30;
}

base = shape(3).color(1,[1,0].ease(),[0,1]).modulate(osc()).rotate(0,1)

base

// Here I add windows
// .layer(srcMask(s0)
// .toWindow(1, () => winRotate(1)))

.layer(text("Neon Move\n&\nDurk")
.color(0.1, 0.5, 0.1)
.scale(0.5)
.scroll(0.0, 0.2)
// .modulate(voronoi())
.modulate(osc(1, 1, 1))
)
.out(o0)

src(o0).blend(src(o0).rotate(0, 0.1)).out(o3)

render(o0)
