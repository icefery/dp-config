#!/bin/bash

source /etc/profile


if [ $# -lt 1 ]; then
    echo "usage: $0 app_yaml_fullpath, eg: /K8S/sealK8s-allInOne/graf/graf_112.yaml"
    exit 1
fi

app_yaml_fullpath="$1"


# yaml文件目录
app_yaml_dir=${app_yaml_fullpath%/*}

# yaml文件名
app_yaml_name=${app_yaml_fullpath##*/}

# 服务名
app_service_name=${app_yaml_name%_*}



function parse_key_value_str()
{
    str_len=${#key_val_str}
    if [ ${str_len} -lt 5 ]; then
        echo "input key-value string[${key_val_str}] error."
        return 1
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
            return 1;
        fi

        var_name=$(echo ${one_param} | awk -F '=' '{print $1}')
        tmp_value=$(echo ${one_param} | awk -F '=' '{print $2}')
        echo "var_name: ${var_name}, value: ${tmp_value}"
        if [ "${var_name}" == "VAR_NAMESPACE" ]; then
            app_namespace=${tmp_value}
            echo "app_namespace: ${app_namespace}"
        elif [ "${var_name}" == "VAR_ALP_WEB_TCP_PORT" ]; then
				    VAR_ALP_WEB_TCP_PORT=${tmp_value}
				elif [ "${var_name}" == "VAR_ALP_FILE_TCP_PORT" ]; then
				    VAR_ALP_FILE_TCP_PORT=${tmp_value}
				fi
    done

    if [ -z ${app_namespace} ]; then
        echo "namespace param invalid, app_namespace: ${app_namespace}"
        return 1
    fi

    return 0
}


function replace_svc_nodeport()
{
    local service_name=$1
    local svc_ns=$2
    local var_nodeport=$3
    local svc_yaml_file=$4
    split_str="alloc result: "

    kubetool_cfg_file=${K8S_INSTALL_PATH}/tool/kube_cmd/config.xml
    kubetool_path=${app_yaml_dir}/../yamlTemplate/tool/kubetool
    if [ ! -f ${kubetool_cfg_file} ]; then
        echo "kubetool cfg file (${kubetool_cfg_file}) not exist."
        return 1
    fi

    if [ ! -f ${kubetool_path} ]; then
        echo "kubetool (${kubetool_path}) not exist."
        return 1
    fi

    chmod 755 ${kubetool_path}
    alloc_result_str=$(${kubetool_path} --cfg=${kubetool_cfg_file} --cmd_type=nodeport --service_name=${service_name} --service_namespace=${svc_ns} --nodeport_cnt=1)
    echo "1 alloc_result_str = ${alloc_result_str}."

    ports_array_str=$(echo ${alloc_result_str##*${split_str}})
    echo "2 alloc_result_str = ${alloc_result_str}."
    echo "split_str = ${split_str}."
    echo "ports_array_str = ${ports_array_str}."
    # nodeport长度判断
    arr_len=${#ports_array_str}
    if [ ${arr_len} -ne 5 ]; then
        echo "alloc nodeport array (${ports_array_str}) error."
        return 1
    fi

    nodeport_val_str=${ports_array_str}
    echo "nodeport: ${nodeport_val_str}"
    sed -i "s/${var_nodeport}/${nodeport_val_str}/g" ${svc_yaml_file}
    echo "new service yaml:"
    cat ${svc_yaml_file}
    return 0
}





# 其他可选参数
exist_flag=$(cat ${app_yaml_fullpath} | grep "nodePort: 10000000001")
if [ -n "${exist_flag}" ]; then
    if [ $# -lt 2 ]; then
        echo "usage: $0 app_yaml_fullpath key_val_str, eg: /K8S/sealK8s-allInOne/cms/cms_36.yaml {VAR_NAMESPACE=mcs}"
        exit 1
    fi

    key_val_str="$2"
    app_namespace=""
    parse_key_value_str 
    if [ $? -ne 0 ]; then
        echo "parse key_val_str error, ${key_val_str}"
        exit 1
    fi
fi



sed -i 's/10000000001/'${VAR_ALP_WEB_TCP_PORT}'/g' ${app_yaml_fullpath}
sed -i 's/10000000002/'${VAR_ALP_FILE_TCP_PORT}'/g' ${app_yaml_fullpath}


# alloc nodePort
#if [ -n "${exist_flag}" ]; then
#    replace_svc_nodeport ${app_service_name} ${app_namespace} "100000099" ${app_yaml_fullpath}
#    if [ $? -ne 0 ]; then
#        echo "[error] replace ${app_yaml_fullpath} nodePort failed."
#        exit 2
#    fi
#fi
