## Part2 教學
### Docker Compose 

何謂 Docker Compose？ Compose 是一個工具能夠執行多個容器(container)，你可以使用 `docker-compose.yml` 或 `docker-compose.yaml` 來撰寫 Docker Compose 的服務腳本，定義完成後只要一個指令就能啟動所有服務。


三個步驟使用 Docker Compose：

1. 定義好你的 `Dockerfile`，使得可以重複產出image
2. 定義好你的 `docker-compose.yml`，以便於快速啟動多項服務
3. 執行 `docker-compose up` 啟動所有服務

### 前置作業
我們接著上篇文章[]()的程式碼繼續做今天的教學，各位可以下載下面妥提供的程式連結跟著今天的教學實作。

https://github.com/andy6804tw/docker-nodejs-tutorial/releases


#### 新增 Compose file
新增 `docker-compose.yml` 文件，第一個 version 為 Docker Compose CLI 的版本，接下來 services 的參數內可以定義多項服務，我們目前只有一個 image 在後面寫上此 image 的標籤名稱以利於辨認，build 參數就是指目前資料夾代表會執行此專案的 image，environment 參數可以設定環境變數(process.env)，ports 參數裡面的格式 `PORT:PORT` 前者 3000 為映射出來我們電腦實際跑的 PORT 後者 8080 代表 docker container 服務裡面所執行的 PORT，volumes 參數會判斷你的專案是否有變動修改若有系統會自動幫你重建 image 而不需手動 `docker build`。


```yml
version: '3.6'

services:
  docker-nodejs-tutorial:
    image: docker-nodejs-tutorial
    build: .
    environment:
      NODE_ENV: production
    ports:
      - 3000:8080
    volumes:
      - .:/usr/src/app
```

#### Server.js 加入環境變數
還記得我們剛在 `docker-compose.yml` 有加一個 `NODE_ENV` 的環境變數嗎？ 這邊要證明他有正常運作所以我們在 `Server.js` 中把此變數 log 出來。

```js
// 利用 process.env 取得環境參數
process.env.NODE_ENV
```

<img src="/images/part1/img01.png">

#### 執行測試
一切準備就緒後就可以開始執行 Docker Compose 囉！

```bash
# CTRL+C 退出停止服務
$ docker-compose up
```

若想讓他背景執行可以這樣：

```bash
# 啟動服務
$ docker-compose up -d
# 結束服務
$ docker-compose stop
```

可以使用下列指令查看環境變數：

```bash
# 查看環境變數
$ docker-compose run web env
```

上面指令 stop 只是關閉目前 container 的服務，輸入 `docker ps -a ` 會發現此 container 還存在而狀態為 Exited，如果要移除 container 可以這樣做：

```bash
# 移除 container
$ docker-compose down --volumes
```
