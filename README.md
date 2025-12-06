# Creative Coding Setup

* Use OBS to place windows

* Nativefier creates borderless websites:
*   nativefier https://strudel.cc  --name "Strudel" --hide-window-frame
*   nativefier https://hydra.ojack.xyz  --name "Hydra" --hide-window-frame

## Stream from other computer
* Install mediamtx
* Config mediamtx.yml
```
###############################################
# Global settings

logLevel: info
logDestinations: [stdout]
logFile: mediamtx.log
sysLogPrefix: mediamtx

readTimeout: 10s
writeTimeout: 10s
writeQueueSize: 512
udpMaxPayloadSize: 1472
udpReadBufferSize: 0

runOnConnect:
runOnConnectRestart: no
runOnDisconnect:

###############################################
# Authentication

authMethod: internal
authInternalUsers:
  - user: any
    pass:
    ips: []
    permissions:
      - action: publish
      - action: read
      - action: playback

  - user: any
    pass:
    ips: ['127.0.0.1', '::1']
    permissions:
      - action: api
      - action: metrics
      - action: pprof

authHTTPAddress:
authHTTPExclude:
  - action: api
  - action: metrics
  - action: pprof

authJWTJWKS:
authJWTJWKSFingerprint:
authJWTClaimKey: mediamtx_permissions
authJWTExclude: []
authJWTInHTTPQuery: true

###############################################
# API, metrics, pprof, playback disabled

api: no
apiAddress: :9997
apiEncryption: no
apiServerKey: server.key
apiServerCert: server.crt
apiAllowOrigins: ['*']
apiTrustedProxies: []

metrics: no
metricsAddress: :9998
metricsEncryption: no
metricsServerKey: server.key
metricsServerCert: server.crt
metricsAllowOrigins: ['*']
metricsTrustedProxies: []

pprof: no
pprofAddress: :9999
pprofEncryption: no
pprofServerKey: server.key
pprofServerCert: server.crt
pprofAllowOrigins: ['*']
pprofTrustedProxies: []

playback: no
playbackAddress: :9996
playbackEncryption: no
playbackServerKey: server.key
playbackServerCert: server.crt
playbackAllowOrigins: ['*']
playbackTrustedProxies: []

###############################################
# Disable RTSP, RTMP, HLS, WebRTC

rtsp: no

rtmp: no

hls: no

webrtc: no
webrtcLocalUDPAddress: :8189
webrtcLocalTCPAddress: ''

###############################################
# SRT only

srt: yes
srtAddress: :8890

###############################################
# Default path settings

pathDefaults:
  source: publisher
  sourceFingerprint:
  sourceOnDemand: no
  sourceOnDemandStartTimeout: 10s
  sourceOnDemandCloseAfter: 10s
  maxReaders: 0
  srtReadPassphrase:
  fallback:
  useAbsoluteTimestamp: false

  record: no
  recordPath: ./recordings/%path/%Y-%m-%d_%H-%M-%S-%f
  recordFormat: fmp4
  recordPartDuration: 1s
  recordMaxPartSize: 50M
  recordSegmentDuration: 1h
  recordDeleteAfter: 1d

  overridePublisher: yes
  srtPublishPassphrase:

  rtspTransport: automatic
  rtspAnyPort: no
  rtspRangeType:
  rtspRangeStart:

  rtpSDP:

  sourceRedirect:

  rpiCameraCamID: 0
  rpiCameraSecondary: false
  rpiCameraWidth: 1920
  rpiCameraHeight: 1080
  rpiCameraHFlip: false
  rpiCameraVFlip: false
  rpiCameraBrightness: 0
  rpiCameraContrast: 1
  rpiCameraSaturation: 1
  rpiCameraSharpness: 1
  rpiCameraExposure: normal
  rpiCameraAWB: auto
  rpiCameraAWBGains: [0, 0]
  rpiCameraDenoise: "off"
  rpiCameraShutter: 0
  rpiCameraMetering: centre
  rpiCameraGain: 0
  rpiCameraEV: 0
  rpiCameraROI:
  rpiCameraHDR: false
  rpiCameraTuningFile:
  rpiCameraMode:
  rpiCameraFPS: 30
  rpiCameraAfMode: continuous
  rpiCameraAfRange: normal
  rpiCameraAfSpeed: normal
  rpiCameraLensPosition: 0.0
  rpiCameraAfWindow:
  rpiCameraFlickerPeriod: 0
  rpiCameraTextOverlayEnable: false
  rpiCameraTextOverlay: '%Y-%m-%d %H:%M:%S - MediaMTX'
  rpiCameraCodec: auto
  rpiCameraIDRPeriod: 60
  rpiCameraBitrate: 5000000
  rpiCameraHardwareH264Profile: main
  rpiCameraHardwareH264Level: '4.1'
  rpiCameraSoftwareH264Profile: baseline
  rpiCameraSoftwareH264Level: '4.1'
  rpiCameraMJPEGQuality: 60

  runOnInit:
  runOnInitRestart: no

  runOnDemand:
  runOnDemandRestart: no
  runOnDemandStartTimeout: 10s
  runOnDemandCloseAfter: 10s
  runOnUnDemand:

  runOnReady:
  runOnReadyRestart: no
  runOnNotReady:

  runOnRead:
  runOnReadRestart: no
  runOnUnread:

  runOnRecordSegmentCreate:
  runOnRecordSegmentComplete:

###############################################
# Paths

paths:
  friend:
    source: publisher

```
* Other pc uses OBS to stream to mediamtx. stream -> custom -> url is srt://127.0.0.1:8890?streamid=publish:friend, stream code is empty.
* They need to also output->advanced->video encoder x264 -> Profile baseline and tune zerolatency
* Install v4l2loopback-kmp-default and reboot
* Run `ffmpeg \
  -fflags nobuffer \
  -flags low_delay \
  -i "srt://127.0.0.1:8890?mode=caller&transtype=live&streamid=read:friend" \
  -vf format=yuv420p \
  -f v4l2 /dev/video0
` to make stream into virtual camera
