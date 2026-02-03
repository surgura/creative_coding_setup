await loadScript("scripts/plugins/hydra-src.js")
await loadScript("scripts/plugins/hydra-text.js")
await loadScript("scripts/plugins/hydra-mouse.js")
await loadScript("scripts/plugins/hydra-glsl.js")
await loadScript("scripts/plugins/lib-screen.js")
await loadScript("scripts/windows.js")

// hydraText.font = "interceptor"
// hydraText.font = "Monospace"
hydraText.font = "Source Code Pro Light"
hydraText.lineWidth = "2%"

s0.initCam(0)
s1.initCam(1)
s2.initCam(2)

// s3.initImage("image/brtree.jpg")
s3.initImage("image/brtreetop.jpg")
// s3.initImage("image/reactorblur.webp")

function winRotate(n) {
    return 0.0 //Math.sin(time * (1 + n / 10) + n) / 30;
}

srcRelMask(s0)
.out(o1)
srcRelMask(s1).rotate(Math.PI).contrast(1.8).brightness(0.2)
.out(o2)

background = src(s3)

background
.layer(srcMask(o1)
.toWindow(1, () => winRotate(1)))
.layer(srcMask(o2)
.toWindow(2, () => winRotate(2)))
// .layer(srcMask(o3)
// .toWindow(3, () => winRotate(3)))

.layer(text("Neon Move\n&\nDurk")
.color(0.1, 0.5, 0.1)
.scale(0.5)
.scroll(0.0, 0.2)
// .modulate(voronoi())
.modulate(osc(1, 1, 1))
)
.out(o0)


