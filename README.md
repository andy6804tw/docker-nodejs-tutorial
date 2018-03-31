# Docker Node.js tutorial
Dockerizing a Node.js web app

## 教學
- Part1 建立 Dockerfile
  - [Tutorial 教學](/tutorial/Part1.md)
  
------
## Getting Started
### Clone Project
 you can create a new project based on docker-nodejs-tutorial by doing the following:

```bash
$ git clone https://github.com/andy6804tw/docker-nodejs-tutorial.git
$ cd docker-nodejs-tutorial
```

### Installation
When that's done, install the project dependencies.You can use npm or yarn(recommended) for dependency management。

```bash
$ npm install
```

### Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

| script | Description |
| ------| ------ |
| start | Serves your app at localhost:8080 |


## Run with Docker
You can using docker iamge access this project !

### Pull Project
Pull Docker image from Docker Hub.

```bash
$ docker pull andy6804tw/docker-nodejs-tutorial
```

### Run the image
Running your image with -d runs the container in detached mode, leaving the container running in the background. The -p flag redirects a public port to a private port inside the container. Run the image you previously built.

```bash
$ docker run -p 3000:8080 -d  andy6804tw/docker-nodejs-tutorial
```

### Test
Docker mapped the 8080 port inside of the container to the port 3000 on your machine.

```bash
$ curl -i localhost:3000
```
