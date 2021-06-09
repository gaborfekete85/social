#!/bin/sh

nameSpaceExists=$(~/kubectl get namespaces | grep "$1" | head -c1 | wc -c)
echo "nameSpaceExists: $nameSpaceExists"

if [ $nameSpaceExists -eq 0 ] 
then
    echo "Create namespace $1"
    ~/kubectl create namespace "$1"
fi