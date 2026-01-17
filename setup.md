## Install Hydra locally
* git clone git@github.com:hydra-synth/hydra.git
* cd hydra
* npm install --global yarn
* yarn install
* yarn build
* yarn dev

### Make scripts importable
* Create simlink in Hydra dir
* cd hydra
* ln -s <path_to_creative_coding_setup>/hydra scripts

## Make borderless browsers apps
* Install Nativefier
* nativefier <url>  --name "<name>" --hide-window-frame

### hydra (untested)
```
let hidden = false;

document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key.toLowerCase() === "j") {
    hidden = !hidden;
    document.querySelectorAll(".myclass").forEach(el => {
      el.style.display = hidden ? "none" : "";
    });
  }
});
```

```
nativefier \
  --inject toggle.js \
  <ip>
```

```
.myclass {
  opacity: 0;
  pointer-events: none;
}
```
