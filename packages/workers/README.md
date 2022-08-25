# Server-side workers for Tarkov Map

## Setting up for development

  1. Clone this repo.
  2. Copy `template.env` file to `.env` and setup all the variables.
  3. Run the app:
      ```bash
      npm run start
      ```

App is run with `nodemon` and listens to the changes in the local directory and re-runs the script. Also, `nodemon` is run with `--inspect` flag so the debugger is available on port `9229`.

To install an npm package:
  1. Install it on the host machine:
      ```bash
      npm install --save ...
      ```
  2. Build the image again, renewing the container's volume (this recreates the node_modules directory):
      ```bash
      npm run start:update
      ```

## Deploying to production

* Login into docker hub:
  ```bash
  docker login
  ```
* Build the app image and push to repo:
  > ### This repo is public so be careful to not leave any secrests in the image! Use `.dockerignore` to ignore files from local directory
  ```bash
  npm run docker:build && npm run docker:push
  ```
* Copy `template.env` file to `.env.prod` and setup all the variables
* Setup a gcloud service account for a firebase project
  * go to firebase project -> Project Settings -> Service Accounts
  * cleate a new service account with admin priveleges
  * go to gcloud console -> Menu -> IAM & Admin -> Service Accounts
  * select the created account -> keys -> add key
  * download key to `svc_account.json`
* Move `.env.prod`, `docker-compose.prod.yml`, `svc_account.json`
to your production machine:
  ```bash
  scp -r {.env.prod,docker-compose.prod.yml,./.secrets/svc_account.json} \
          USER@SERVER:/home/USER/tarkov-map-workers
  ```
* Rename `.evn.prod` to `.env` on the server
  ```bash
  mv .env.prod .env
  ```
* To start the container with the app, run:
  ```bash
  docker compose -f docker-compose.prod.yml pull
  docker compose -f docker-compose.prod.yml up -d
  ```
This setup works with [traefik](https://docs.traefik.io/user-guide/docker-and-lets-encrypt/) which is setup in [jetpackpony/vm-setup](https://github.com/jetpackpony/vm-setup) repo.
