#/bin/bash

#Build
#./gradlew clean build
npm run build

#Docker image push
docker image build -t security/security-ui .
docker tag security/security-ui:latest localhost:5000/security-ui:latest
docker push localhost:5000/security-ui:latest

#Helm Redeploy
cd ../../pipeline/K8S
helm delete security-ui-service -n security
helm install -f service/values-security-ui-local.yaml security-ui-service ./service -n security