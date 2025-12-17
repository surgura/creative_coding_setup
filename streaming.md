# Streaming screen from one device to another

## On receiver side

`sudo zypper install gstreamer-plugins-libav gstreamer-plugins-bad gstreamer-plugins-good`

`gst-launch-1.0 udpsrc port=5000 caps="application/x-rtp,media=video,encoding-name=H264,payload=96" ! rtph264depay ! avdec_h264 ! videoconvert ! autovideosink sync=false`

looping directly to virtual camera:

`gst-launch-1.0 udpsrc port=5000 \
caps="application/x-rtp,media=video,encoding-name=H264,payload=96" \
! rtpjitterbuffer latency=0 \
! rtph264depay \
! h264parse \
! decodebin \
! videoconvert \
! video/x-raw,format=YUY2 \
! v4l2sink device=/dev/video0 sync=false
`

have to create camera first with 

`sudo modprobe v4l2loopback video_nr=10 card_label=GSTCam exclusive_caps=1`

## On sender windows

https://gstreamer.freedesktop.org/download/?__goaway_challenge=meta-refresh&__goaway_id=fd064a6910b8f1c0ccaba2d6c996c25e&__goaway_referer=https%3A%2F%2Fwww.google.com%2F#windows

### For NVIDIA:

`gst-launch-1.0 d3d11screencapturesrc ! video/x-raw,framerate=30/1 ! videoconvert ! nvh264enc preset=low-latency-hq gop-size=30 zerolatency=true ! h264parse config-interval=1 ! rtph264pay pt=96 config-interval=1 ! udpsink host=192.168.178.74 port=5000 sync=false`

#### Specific window

`Get-Process | Where-Object { $_.MainWindowTitle -match "Task Manager" } | Select-Object MainWindowTitle, MainWindowHandle`

`gst-launch-1.0 d3d11screencapturesrc capture-api=wgc window-handle=460312 window-capture-mode=client ! video/x-raw,framerate=30/1 ! videoconvert ! nvh264enc preset=low-latency-hq gop-size=30 zerolatency=true ! h264parse config-interval=1 ! rtph264pay pt=96 config-interval=1 ! udpsink host=192.168.178.74 port=5000 sync=false`

#### With cursor
`show-cursor=true`
