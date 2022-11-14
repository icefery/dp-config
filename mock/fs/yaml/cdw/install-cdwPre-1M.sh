#!/bin/bash

if [ $# -lt 1 ]; then
    echo "usage: $0 app_yaml_fullpath"
    exit -1
fi

app_yaml_fullpath="$1"


# yaml文件目录
app_yaml_dir=${app_yaml_fullpath%/*}

# yaml文件名
app_yaml_name=${app_yaml_fullpath##*/}

# 服务名
app_service_name=${app_yaml_name%_*}



if [ ${app_service_name} == "cp" ]; then
    # add new mount path
    sed -i '/volumes:/a\ \ \ \ \ \ \ \ - name: area-VAR_POD_NAME' ${app_yaml_fullpath}
    sed -i '/area-VAR_POD_NAME/a\ \ \ \ \ \ \ \ \ \ hostPath:' ${app_yaml_fullpath}
    searchRet=$(sed -n '/volumes:/{n;n;=;}' ${app_yaml_fullpath})
    echo ${searchRet}
    sed -i ''$searchRet'a\ \ \ \ \ \ \ \ \ \ \ \ path: /opt/VAR_PRODUCT_NAME/VAR_POD_NAME' ${app_yaml_fullpath}
    sed -i '/volumeMounts:/a\ \ \ \ \ \ \ \ \ \ \ \ - mountPath: /Area1/cp' ${app_yaml_fullpath}
    searchRet=$(sed -n '/volumeMounts:/{n;=;}' ${app_yaml_fullpath})
    sed -i ''$searchRet'a\ \ \ \ \ \ \ \ \ \ \ \ \ \ name: area-VAR_POD_NAME' ${app_yaml_fullpath}

    echo "add all env parameters for ${app_yaml_fullpath}"
elif [ ${app_service_name} == "wp" ]; then
    #添加volumes
    sed -i '/volumes:/a\ \ \ \ \ \ \ \ - name: area-VAR_POD_NAME' ${app_yaml_fullpath}

    vol_line=$(sed -n '/volumes:/{n;=;}' ${app_yaml_fullpath})
    sed -i ''${vol_line}'a\ \ \ \ \ \ \ \ \ \ hostPath:' ${app_yaml_fullpath}
    vol_line=`expr ${vol_line} + 1`
    sed -i ''${vol_line}'a\ \ \ \ \ \ \ \ \ \ \ \ path: /opt/VAR_PRODUCT_NAME/VAR_POD_NAME' ${app_yaml_fullpath}

    vol_line=`expr ${vol_line} + 1`
    sed -i ''${vol_line}'a\ \ \ \ \ \ \ \ - name: database-path' ${app_yaml_fullpath}
    vol_line=`expr ${vol_line} + 1`
    sed -i ''${vol_line}'a\ \ \ \ \ \ \ \ \ \ hostPath:' ${app_yaml_fullpath}
    vol_line=`expr ${vol_line} + 1`
    sed -i ''${vol_line}'a\ \ \ \ \ \ \ \ \ \ \ \ path: /opt/VAR_PRODUCT_NAME/wp/database/VAR_POD_NAME' ${app_yaml_fullpath}

    #查找containers的volumeMounts, 再添加volumeMounts
    last_line=$(sed -n '/volumeMounts:/{=;}' ${app_yaml_fullpath})

    sed -i ''${last_line}'a\ \ \ \ \ \ \ \ \ \ \ \ - mountPath: /Area1/wp' ${app_yaml_fullpath}
    last_line=`expr ${last_line} + 1`
    sed -i ''${last_line}'a\ \ \ \ \ \ \ \ \ \ \ \ \ \ name: area-VAR_POD_NAME' ${app_yaml_fullpath}

    last_line=`expr ${last_line} + 1`
    sed -i ''${last_line}'a\ \ \ \ \ \ \ \ \ \ \ \ - mountPath: /home/database' ${app_yaml_fullpath}
    last_line=`expr ${last_line} + 1`
    sed -i ''${last_line}'a\ \ \ \ \ \ \ \ \ \ \ \ \ \ name: database-path' ${app_yaml_fullpath}

    echo "add all env parameters for ${app_yaml_fullpath}"
elif [ ${app_service_name} == "idp" ]; then
    #添加volumes
    sed -i '/volumes:/a\ \ \ \ \ \ \ \ - name: idp-volume' ${app_yaml_fullpath}

    vol_line=$(sed -n '/volumes:/{n;=;}' ${app_yaml_fullpath})
    sed -i ''${vol_line}'a\ \ \ \ \ \ \ \ \ \ hostPath:' ${app_yaml_fullpath}
    vol_line=`expr ${vol_line} + 1`
    sed -i ''${vol_line}'a\ \ \ \ \ \ \ \ \ \ \ \ path: RESOURCE_PACKAGE_PATH/idpdata' ${app_yaml_fullpath}

    #添加volumeMounts
    last_line=$(sed -n '/volumeMounts:/{=;}' ${app_yaml_fullpath})

    sed -i ''${last_line}'a\ \ \ \ \ \ \ \ \ \ \ \ - mountPath: /opt/idp' ${app_yaml_fullpath}
    last_line=`expr ${last_line} + 1`
    sed -i ''${last_line}'a\ \ \ \ \ \ \ \ \ \ \ \ \ \ name: idp-volume' ${app_yaml_fullpath}

    echo "add all env parameters for ${app_yaml_fullpath}"
else
    echo "normal"
fi
