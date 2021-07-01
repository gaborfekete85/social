#/bin/bash

namespace="booking"
while (( "$#" )); do
    case $1 in
        -n | --namespace)
        	namespace=$2
        	shift
        ;;
    esac
    shift
done

helm delete social-ingress-nginx -n $namespace
helm delete spring-social -n $namespace
helm delete spring-social-ui-service -n $namespace
cd pipeline/K8S/ingress
kubectl delete -f ingress-backend.yaml -n $namespace
kubectl delete -f ingress-ui.yaml -n $namespace