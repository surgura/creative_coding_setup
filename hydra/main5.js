await loadScript("scripts/plugins/hydra-src.js")
await loadScript("scripts/plugins/hydra-text.js")
await loadScript("scripts/plugins/hydra-mouse.js")
await loadScript("scripts/windows.js")

hydraText.font = "interceptor"
hydraText.lineWidth = "2%"

s0.initCam(0)
s1.initCam(1)
s2.initCam(2)

// voronoi()
// 	.kaleid(4)

function winRotate(n) {
    return Math.sin(time*(1+n/10)+n)/30;
}

solid(0.1,0.1,0.1)
.layer(srcRelMask(s0)
.toWindow(1, () => winRotate(1)))
.layer(srcRelMask(s0)
.toWindow(2, () => winRotate(2)))
.layer(voronoi()
.noWrap()
.toWindow(3, () => winRotate(3)))

.layer(text("Neon Move")
.color(0.1, 0.5, 0.1)
.scale(0.3)
.scroll(0.2, -0.2)
.modulate(voronoi())
.modulate(osc(1, 1, 1))
)
.out()
