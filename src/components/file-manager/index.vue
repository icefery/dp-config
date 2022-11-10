<script lang="tsx" setup>
import { deleteFile, fetchFileList, type IR, uploadFile } from '@/api/json'
import { SHARED_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { Delete, UploadFilled } from '@element-plus/icons-vue'
import { ElButton, ElIcon, ElInput, ElTable, ElTableColumn, ElTag, ElUpload, type UploadInstance, type UploadUserFile } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

const state = reactive<{ files: UploadUserFile[] }>({ files: [] })

const uploadRef = ref<UploadInstance>()

onMounted(() => fetchFileList())

const handleUpload = async () => {
  if (state.files.length === 0) {
    return
  }
  // element-plus 文件类型到接口文件类型转换
  const convert = (file: UploadUserFile) => {
    return new Promise<IR>((resolve, reject) => {
      if (file.raw) {
        const reader = new FileReader()
        reader.readAsText(file.raw, 'utf8')
        reader.onload = event => {
          resolve({
            name: file.name,
            fileString: event.target?.result as string,
            size: file.size || 0,
            type: 'json'
          })
        }
      } else {
        reject()
      }
    })
  }
  // 同步读取全部文件
  const todos = await Promise.all(state.files.map(it => convert(it)))
  // 上传文件
  await uploadFile(todos)
  // 清空待上传文件列表
  state.files = []
}

const handleDelete = (index: number) => {
  const todo = SHARED_STATE.list[index]
  if (todo._id) {
    deleteFile(todo._id)
  }
}
</script>

<template>
  <div style="margin-top: 20.5px">
    <!-- 文件上传区域 -->
    <el-upload ref="uploadRef" v-model:file-list="state.files" :auto-upload="false" class="upload-demo" drag multiple>
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
    </el-upload>
    <!-- 手动上传按钮 -->
    <el-button style="width: 100%; height: 50px" @click="handleUpload()" auto-insert-space>上传</el-button>
    <el-table :data="SHARED_STATE.list" border scrollbar-always-on style="margin-top: 10px">
      <!-- 操作列 -->
      <el-table-column align="center" fixed="left" width="50">
        <template #default="scope: IScope<IR>">
          <el-button :icon="Delete" circle type="danger" @click="handleDelete(scope.$index)" />
        </template>
      </el-table-column>
      <!-- 数据列 -->
      <el-table-column align="center" label="type" prop="type" width="80">
        <template #default="scope: IScope<IR>">
          <el-tag>{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="name" prop="name">
        <template #default="scope: IScope<IR>">
          <el-input v-model="scope.row.name" readonly spellcheck="false" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
