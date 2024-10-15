# About this repo

Small REST API for [shooter game](https://github.com/piotr-grzegorzek/shadowlands-the-rescue). It is built with express.js, typescript and drizzle. It utilizes docker image of postgres for easy setup and deployment.

# Install docker (skip if already installed)

1. Make sure you have enabled virtualization in your BIOS and WSL enabled in windows features

2. In command prompt, enter the following to install wsl
```powershell
wsl --install
```

3. Restart PC (if steps below dont occur, go to wsl troubleshooting below)

4. You automatically get prompt to set username and password for wsl

5. In the wsl terminal, enter the following to update and upgrade
```bash
sudo apt update && sudo apt upgrade
```

6. Install docker desktop [here](https://www.docker.com/products/docker-desktop/) (make sure Use the WSL 2 instead of the Hyper-V is checked)

# Create server (generally done once)

1. Clone this repo

2. Open powershell in the repo (in file explorer, hold shift and right click, then select open powershell window here)

3. In powershell, enter the following
```powershell
./dev.bat -y
```

4. After you gain access to terminal in the container, enter the following
```bash
npm run dev
```

Now the server is running in the container and can be accessed at localhost. If you want to stop the server, open docker desktop, go to containers tab, and press stop icon on the right.

# How to run the server again

1. open command prompt in the repo (just as before)

2. In command prompt, enter the following
```powershell
docker start local
docker exec -it local bash
```

3. After you gain access to terminal in the container, enter the following
```bash
npm run dev
```

Server is running. If you want to stop the server, open docker desktop, go to containers tab, and press stop icon on the right.

# How to update the server

Simply fetch the latest changes from the repo and run the server again. (it uses volume so changes are automatically applied)

# WSL troubleshooting

1. Open command prompt as admin and enter the following
```powershell
wsl --install -d ubuntu
```
2. If you get error "WSL2 requires an update to its kernel component." download wsl2 kernel update package from [here](https://docs.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)

3. Type the step 1 command again, and get back to step 4 in docker installation

# Repositories and resources used

- [Microsoft WSL docs](https://learn.microsoft.com/en-us/windows/wsl/setup/environment)
- [Postgres docker image setup](https://stackoverflow.com/questions/38713597/create-table-in-postgresql-docker-image)
- [.dockerignore](https://github.com/borjapazr/express-typescript-skeleton/blob/main/.dockerignore)
- Typescript and Express blogs - [dev.to](https://dev.to/wizdomtek/typescript-express-building-robust-apis-with-nodejs-1fln), [logrocket](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)
- [prettier-eslint setup](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)
- Express docs - [using middleware](https://expressjs.com/en/guide/using-middleware.html), [writing middleware](https://expressjs.com/en/guide/writing-middleware.html)
- Callbacks, promises and async/await - [w3schools](https://www.w3schools.com/js/js_callback.asp), [javascript.info](https://javascript.info/async), [ColorCode](https://www.youtube.com/watch?v=QSqc6MMS6Fk)
- [nodejsapi](https://github.com/another-coder4life/nodejsapi), [video](https://www.youtube.com/watch?v=9alCkObbDJc&t=442s)
