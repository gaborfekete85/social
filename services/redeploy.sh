#/bin/bash
repository="localhost:5000"
build="false"
tag=`git rev-parse --short HEAD`
services=(spring-social)
name="default"
namespace="social"
env="dev"
while (( "$#" )); do
    case $1 in
        -s | --services)
        	IFS=',' read -r -a services <<< "$2"
        	shift
        ;;
        -b | --build)
        	build="true"
        ;;
        -r | --remote)
			repository="gabendockerzone"
        ;;
        -n | --name)
			name=$2
			shift
        ;;
        -ns | --namespace)
			namespace=$2
			shift
        ;;
        -t | --tag)
			tag=$2
			shift
        ;;
        -e | --env)
			env=$2
			shift
        ;;
    esac
    shift
done

echo "Repository: $repository"
echo "Build: $build"
echo "Building the following services: "
for service in "${services[@]}"; do
	echo "$service"
done

function buildService() {
	echo ""
	echo ""
	echo "Building $1"
	echo "Repository: $2"
	cd $1
	./gradlew clean build
	./gradlew publish
	./gradlew jib -PDOCKER_REPOSITORY=gabendockerzone
	#Docker image push
	#docker image build -t udemy/$1 .
	#docker tag udemy/$1:latest $2/$1:0.0.1-SNAPSHOT
	#docker push $2/$1:0.0.1-SNAPSHOT
	cd ..
}

function deployService() {
	echo "Deploying $1"
	echo "Deploying chart name $3 $5"
	helm delete $1 -n $4
	helm install -f ../pipeline/K8S/service/values-$6-$service.yaml --set image.tag=$5 --set image.repository=$2/$1 \
				 $3 ../pipeline/K8S/service -n $4
}

for service in "${services[@]}"; do
	if [ $build = "true" ]
	then
		buildService $service $repository
	fi
	if [[ "$name" == "default" ]]
	then
		helmChartRelease=$service
	else
		helmChartRelease=$name
	fi
	deployService $service $repository $helmChartRelease $namespace $tag $env
done

#OPTIND=1
#while getopts ':b:r:s:' option
#do
#	case "${option}"
#		in
#		s)
#			IFS=',' read -r -a services <<< "${OPTARG}"
#			for service in "${service_array[@]}"; do
#				echo "$service"
#			done
#			;;
#		b)
#			build=${OPTARG}
#			;;
#		r)	
#			if [ ${OPTARG} = "hub" ] 
#			then
#			    repository="gabendockerzone"
#			fi
#			;;
#	esac
#done
# -s todo-service -b true -r hub