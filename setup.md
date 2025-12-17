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
