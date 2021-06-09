#!/bin/sh

function cerateNamespaceIfNotExists() {
    if [[ $(kubectl get namespaces | grep "$1" | head -c1 | wc -c) -eq 0 ]]; then
    echo "Creating namespace $1"
        kubectl create namespace "$1"
    fi
}

sqlExec() {
    echo 'postgres' | kubectl exec --tty -it -n managed "postgres-postgresql-0" -- psql -U postgres -c "$1"
}

cerateNamespaceIfNotExists managed
cerateNamespaceIfNotExists udemy

echo "REMOVE RESOURCES"
# Cleaning
kubectl delete -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
helm delete postgres -n managed
helm delete zipkin -n udemy
kubectl delete -f ../pipeline/K8S/ingress-resource.yaml -n udemy

echo "CREATING RESOURCES"
# Creating
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml

echo ""
echo ""
kubectl get secret -n default -o yaml
echo ""
echo "*************************************************************************************"
echo "Token for the dashboard: "
echo "Decode the token part on https://www.base64decode.org/"
echo "*************************************************************************************"
echo ""

# Postgres
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install postgres --set service.nodePort=30001 --set postgresqlPassword=postgres --set service.type=NodePort --set volumePermissions.enabled=true bitnami/postgresql -n managed

echo ""
echo "*************************************************************************************"
echo "Execute the following statements in the database"
echo "create schema todo;"
echo "create schema security;"
echo "CREATE EXTENSION "uuid-ossp";"
echo "For reactive"
echo "alter table todo.todo_items ALTER COLUMN todo_item_id SET DEFAULT uuid_generate_v4();"
echo "*************************************************************************************"
echo ""

sleep 10
echo "postgres" | kubectl exec --tty -it -n managed "postgres-postgresql-0" -- psql -U postgres -c "CREATE SCHEMA IF NOT EXISTS security";
echo "postgres" | kubectl exec --tty -it -n managed "postgres-postgresql-0" -- psql -U postgres -c "CREATE SCHEMA IF NOT EXISTS todo";
echo "postgres" | kubectl exec --tty -it -n managed "postgres-postgresql-0" -- psql -U postgres -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"";

# Zipkin
helm repo add carlosjgp https://carlosjgp.github.io/open-charts/ 
helm install zipkin carlosjgp/zipkin --version 0.2.0 -n udemy

# Build Contracts
cd ../contracts
./generate.sh authorization-service
./generate.sh todo-service

# Build & Redeploy Services
cd ../services
./redeploy.sh --build --remote

# Enable API Gateway ( Ingress )
cd ..
cd pipeline
cd K8S
cd ingress
kubectl create -f ingress-resource.yaml -n udemy
kubectl apply -f nginx-controller.yaml -n managed
echo ""
echo ""
echo "Access the dashboard: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy"
kubectl proxy
