# Docker Node.js Demo

## 教學

### Dockerfile設定
#### 1. 新增 Dockerfile
要把環境跟程式碼包成一個 image，我們需要一個 `Dockerfile` 檔案來撰寫打包的流程。

```bash
touch Dockerfile
```

#### 2. 取得 Base image
所謂的 Base image 就是你的基底環境，然而在 Docker 中允許有多個 image，在 [Docker Hub](https://hub.docker.com/explore/) 有詳細的提供各種 Base image 環境。

此範例為 Node.js 執行環境所以我們基底就使用 Node.js，各位可以到 [Docker Hub](https://hub.docker.com/_/node/) 中找你所想要的版本，這邊教學使用 latest 最新版，若你只想單純測試不想佔太大容量建議可以使用 `FROM node:alpine` 輕量版本。

```bash
# Base image
FROM node:latest 
```

#### 3. 建立工作目錄
首先建立一個空的目錄路徑依個人喜好設定，之後再使用 `WORKDIR` 指定工作目錄，如該目錄不存在，WORKDIR會幫你建立目錄，所以有些人會寫 `RUN mkdir -p /usr/src/app` 其實是可以省略的。

```bash
# Create app directory
WORKDIR /usr/src/app
```

#### 4. 安裝dependencies
首先複製你專案中的 `package.json` 然後再用 `run` 執行 `yarn install` 把所需要用到的套件安裝回來，我個人目前都使用 yarn 做套件管理開發，當然你也可以使用 npm，此外最後執行 cache clean 將專案中的一些快取清除這樣可以稍微幫 image 減肥，我自己測大約可以少個 2.5MB。

```bash
# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean
```

#### 5. 複製原始碼至工作目錄
安裝完 dependencies 之後就使用 `copy` 指令將專案程式碼複製過去。

```bash
# Bundle app source
COPY . /usr/src/app
```

#### 6. 設定預設指令
當 image 被跑起來時要執行 Node.js 寫的 server，所以我們用 `CMD` 設定這個 image 被跑起來時的預設指令，他有三種寫法這邊再提供另一種寫法 `CMD node index.js`

```bash
CMD [ "yarn", "start" ]
```

**完整指令內容**

```bash
# Base image
FROM node:alpine
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn install && yarn cache clean

# Bundle app source
COPY . /usr/src/app

CMD [ "yarn", "start" ]

```

## 最後build image
設定檔完成後可以開始 build image，在專案目錄下跑 `docker build -t 專案名稱` . 就會根據 Dockerfile build 出你自己的 image。

```bash
docker build -t 專案名稱
```

你可以使用 `docker image` 來檢查電腦中所有的 images

```bash
docker image
```

```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
docker-node-demo        latest              67986d4f3068        22 minutes ago      70MB
node                alpine              5d68146e371d        4 hours ago         68.4MB
```

## 啟動 image
最後就可以執行 image 囉！其中 `-d` 的功用就是能夠背景執行並吐出一串 `container ID`，並且將內部監聽的 8080 PORT 是放到我們本機端的 3000 PORT，意思是在 Docker 容器中是跑 8080 原本程式所設定的，然而我們外部本機端用 3000 PORT 來監聽內部容器內容。

```bash
docker run -p 3000:8080 -d  專案名稱  
```

如果想看 log 可以拿剛取得的 container ID 來查看 log (記住有s)。

```bash
docker logs <container ID>
```

若忘記 container ID 的話可以使用下列指令查詢目前所有專案的 container ID，此指令是查詢執行中的 container。

```bash
docker ps
```

## 相關常用指令

### 刪除所有容器 Delete all containers

```bash
docker rm $(docker ps -a -q) 
# 或
docker rm $(docker ps -aq)
```

### 刪除所有映像檔 Delete all images

```bash
docker rmi $(docker images -q)
```

### 刪除執行中的 container
首先取得執行 container 的 container ID，最後拿此 ID 刪除。

```bash
# Get container ID
$ docker ps

CONTAINER ID        IMAGE                     COMMAND             CREATED             STATUS              PORTS                     NAMES
1e19f0cab27d        andy6804tw/node-web-app   "npm start"         7 seconds ago       Up 6 seconds        0.0.0.0:49160->8000/tcp   focused_shannon

# 使用CONTAINER ID刪除container
$ docker container kill 1e19f0cab27d 
```
