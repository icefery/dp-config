#!/bin/bash

if [ $# -lt 1 ]; then
    echo "usage: $0 app_yaml_fullpath, eg: /K8S/sealK8s-allInOne/graf/graf_112.yaml"
    exit -1
fi

app_yaml_fullpath="$1"


# yaml文件目录
app_yaml_dir=${app_yaml_fullpath%/*}

# yaml文件名
app_yaml_name=${app_yaml_fullpath##*/}

# 服务名
app_service_name=${app_yaml_name%_*}


if [ ${app_service_name} == "llf" ]; then
    echo "add all env parameters for ${app_yaml_fullpath}"
else
    echo "normal"
fi

