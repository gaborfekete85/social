helm repo update
helm delete social-ingress-nginx -n $1
helm install social-ingress-nginx ingress-nginx/ingress-nginx -n $1 \
     --set controller.scope.enabled=true \
     --set controller.scope.namespaces="$1"

cd K8S
cd ingress
kubectl delete -f ingress-backend.yaml -n $1
kubectl create -f ingress-backend.yaml -n $1

kubectl delete -f ingress-ui.yaml -n $1
kubectl create -f ingress-ui.yaml -n $1