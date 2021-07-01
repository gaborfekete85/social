#/bin/bash
gitHash=`git rev-parse --short HEAD`

env="dev"
namespace="booking"
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
    esac
    shift
done

# Create namespace
function cerateNamespaceIfNotExists() {
    if [[ $(kubectl get namespaces | grep "$1" | head -c1 | wc -c) -eq 0 ]]; then
    echo "Creating namespace $1"
        kubectl create namespace "$1"
    fi
}

function sqlExec() {
    echo 'postgres' | kubectl exec --tty -it -n managed "postgres-postgresql-0" -- psql -U postgres -c "$1"
}

cerateNamespaceIfNotExists $namespace

cd services
helm delete spring-social -n $namespace
./redeploy.sh -s spring-social -b -r -t $gitHash -ns social -e $env

cd coreui-free-react-admin-template-master
./redeploy.sh -n $namespace -t $gitHash

cd ../../pipeline
./ingress.sh $namespace