#/bin/bash

env="dev"
namespace="social"
tag="latest"
while (( "$#" )); do
    case $1 in
        -e | --environment)
        	env=$2
        	shift
        ;;
        -n | --namespace)
        	namespace=$2
        	shift
        ;;
        -t | --tag)
        	tag=$2
        	shift
        ;;
    esac
    shift
done

# Docker image push
docker image build -t social/spring-social-ui .
docker tag social/spring-social-ui:latest gabendockerzone/spring-social-ui:$tag
docker push gabendockerzone/spring-social-ui:$tag

# Helm Redeploy
cd ../../pipeline/K8S
helm delete spring-social-ui-service -n $namespace
helm install -f service/values-$env-spring-social-ui.yaml --set image.tag=$tag --set image.repository=gabendockerzone/spring-social-ui spring-social-ui-service ./service -n $namespace