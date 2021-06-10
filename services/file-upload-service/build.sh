#!/bin/sh

docker build -t gabendockerzone/file-upload .
docker run -p 3001:3001 gabendockerzone/file-upload