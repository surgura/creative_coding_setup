# Creative Coding Setup

* Use OBS to place windows

* Nativefier creates borderless websites:
*   nativefier https://strudel.cc  --name "Strudel" --hide-window-frame
*   nativefier https://hydra.ojack.xyz  --name "Hydra" --hide-window-frame

## Stream from other computer
* Install mediamtx & run
* Other pc uses OBS to stream to mediamtx. stream -> custom -> url is rtmp://192.168.x.x:1935, stream code is live/stream
* Install v4l2loopback-kmp-default and reboot
* Run `ffmpeg \
  -rtsp_transport tcp \
  -i rtsp://localhost:8554/live/stream \
  -fflags nobuffer \
  -flags low_delay \
  -vf format=yuv420p \
  -f v4l2 /dev/video0` to make stream into virtual camera
