#!/bin/bash

if [ $# -lt 2 ]; then
    echo "usage: $0 app_yaml_fullpath key_val_str, eg: /K8S/sealK8s-allInOne/graf/graf_112.yaml {NFS_SERVER_IP=192.168.56.61}"
    exit 1
fi

app_yaml_fullpath="$1"
key_val_str="$2"

nfs_share_dir=/opt/nfs


# yaml文件目录
app_yaml_dir=${app_yaml_fullpath%/*}
echo ${app_yaml_dir}

# yaml文件名
app_yaml_name=${app_yaml_fullpath##*/}


# nfs
nfs_server_ip=""


str_len=${#key_val_str}
echo "str_len: "${str_len}
if [ ${str_len} -lt 5 ]; then
    echo "input key-value string[${key_val_str}] error."
    exit 1
fi

((str_len-=2))
tmp_str=$(echo ${key_val_str:1:${str_len}})
echo "str: ${tmp_str}"

declare -a kv_list=(${tmp_str//,/ })

for one_param in ${kv_list[*]}
do
    echo "param: ${one_param}"
    flag_str=$(echo ${one_param} | grep '=')
    if [ -z "${flag_str}" ]; then
        echo "'${one_param}' format error!"
        exit 1;
    fi

    var_name=$(echo ${one_param} | awk -F '=' '{print $1}')
    tmp_value=$(echo ${one_param} | awk -F '=' '{print $2}')
    echo "var_name: ${var_name}, value: ${tmp_value}"
    if [ "${var_name}" == "NFS_SERVER_IP" ]; then
        nfs_server_ip=${tmp_value}
        echo "nfs_server_ip: ${nfs_server_ip}"
    fi
done

if [ -z ${nfs_server_ip} ]; then
    echo "nfs param invalid, nfs_server_ip: ${nfs_server_ip}"
    exit 1
fi

rpcinfo -p | grep nfs
if [ $? -ne 0 ]; then
    echo "nfs server not install!"
    exit 1
fi

# set nfs
# clean dir
rm -rf ${nfs_share_dir}/*

mkdir -p ${nfs_share_dir}
chmod -R 755 ${nfs_share_dir}

cat /etc/exports
find_cnt=$(cat /etc/exports | grep "${nfs_share_dir} " | wc -l)
if [ ${find_cnt} -eq 0 ]; then
    echo "${nfs_share_dir}  *(insecure,rw,sync,no_root_squash)" >> /etc/exports
    #systemctl restart nfs.service
fi

echo "after: "
cat /etc/exports

systemctl restart nfs.service
showmount -e ${nfs_server_ip}

# replace variable
sed -i "s/VAR_NFS_SERVER_IP/${nfs_server_ip}/g" ${app_yaml_fullpath}

host_count=$(kubectl get node --no-headers=true | wc -l)
#if [ ${host_count} -gt 1 ]; then
#    host_count=2
#else
#    host_count=1
#fi

host_count=1
sed -i "s/VAR_REPLICAS_NUM/${host_count}/g" ${app_yaml_fullpath}
