#/bin/bash

#Build
#./gradlew clean build
npm run build

#Docker image push
docker image build -t config/file-upload .
docker tag config/file-upload:latest gabendockerzone/file-upload:1.0.0
docker push gabendockerzone/file-upload:1.0.0
#./gradlew jib

#docker login

#Helm Redeploy
cd ../../pipeline/K8S
helm delete file-upload-service -n booking
helm install -f service/values-file-upload.yaml file-upload-service ./service -n booking