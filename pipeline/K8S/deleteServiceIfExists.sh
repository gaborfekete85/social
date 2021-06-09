#!/bin/sh

serviceExists=$(~/kubectl get services -n udemy | grep "$1" | head -c1 | wc -c)
echo "serviceExists: $serviceExists"

if [ $serviceExists -eq 1 ] 
then
    echo "Deleting service $1"
    ~/helm delete $1 -n udemy
fi