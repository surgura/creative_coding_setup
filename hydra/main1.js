await loadScript("scripts/plugins/hydra-src.js")

s0.initCam(0)
s1.initCam(1)
s2.initCam(2)
s3.initCam(3)

srcRelMask(s0)
    .scale(0.3)
    .rotate(() => Math.sin(time) / 30)
    .scroll(-0.3, -0.3)
    .modulate(src(s1))
    .layer(
        srcRelMask(s1)
            .scale(0.3)
            .scroll(0.3, 0.3)
            .pixelate(200, 100)
    )
    .layer(
        srcRelMask(s2)
            .scale(0.35)
            .scroll(-0.1, 0.1)
            .pixelate(200, 100)
    )
    .layer(
        srcRelMask(s3)
    )
    .out()

// .add(src(s0)).out()