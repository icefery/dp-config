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


if [ ${app_service_name} == "ysp-kube" ]; then
    master_cnt=$(kubectl get node | grep k8smaster | wc -l)
    # replicas num
    #sed -i "s/VAR_REPLICAS_NUM/${master_cnt}/g" ${app_yaml_fullpath}

    pvc2_cnt=$(kubectl get pvc | grep "pub-conf-pvc-2" | wc -l)
    if [ ${master_cnt} -eq 2 ] && [ ${pvc2_cnt} -eq 1 ]; then
        #添加volumes
        sed -i '/volumes:/a\ \ \ \ \ \ \ \ - name: nfs-volume-2' ${app_yaml_fullpath}

        vol_line=$(sed -n '/volumes:/{n;=;}' ${app_yaml_fullpath})
        sed -i ''${vol_line}'a\ \ \ \ \ \ \ \ \ \ persistentVolumeClaim:' ${app_yaml_fullpath}
        ((vol_line++))
        sed -i ''${vol_line}'a\ \ \ \ \ \ \ \ \ \ \ \ claimName: pub-conf-pvc-2' ${app_yaml_fullpath}

        #查找containers的volumeMounts, 再添加volumeMounts
        last_line=$(sed -n '/volumeMounts:/{=;}' ${app_yaml_fullpath})

        sed -i ''${last_line}'a\ \ \ \ \ \ \ \ \ \ \ \ - mountPath: /opt/conf/m2' ${app_yaml_fullpath}
        ((last_line++))
        sed -i ''${last_line}'a\ \ \ \ \ \ \ \ \ \ \ \ \ \ name: nfs-volume-2' ${app_yaml_fullpath}
    fi

    echo "add all env parameters for ${app_yaml_fullpath}"
else
    echo "normal"
fi

