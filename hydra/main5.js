await loadScript("scripts/plugins/hydra-src.js")
await loadScript("scripts/plugins/hydra-text.js")
await loadScript("scripts/plugins/hydra-mouse.js")
await loadScript("scripts/plugins/hydra-glsl.js")
await loadScript("scripts/windows.js")

hydraText.font = "interceptor"
hydraText.lineWidth = "2%"

s0.initCam(0)
s1.initCam(1)
s2.initCam(2)

function winRotate(n) {
    return Math.sin(time * (1 + n / 10) + n) / 30;
}

srcRelMask(s0)
.out(o1)
srcRelMask(s0)
.modulate(voronoi())
.out(o2)

// voronoi()
// solid(0,0,0)
glsl('vec2 p=st-0.5; float d=length(p)-0.25; vec4(vec3(1.0-smoothstep(0.0,0.003,d)),1.0)')
.noWrap()
.out(o3)

background = solid(0.2, 0.2, 0.2)

background
.layer(srcMask(o1)
.toWindow(1, () => winRotate(1)))
.layer(srcMask(o2)
.toWindow(2, () => winRotate(2)))
.layer(srcMask(o3)
.toWindow(3, () => winRotate(3)))

.layer(text("Neon Move")
.color(0.1, 0.5, 0.1)
.scale(0.3)
.scroll(0.2, -0.2)
.modulate(voronoi())
.modulate(osc(1, 1, 1))
)
.out(o0)
