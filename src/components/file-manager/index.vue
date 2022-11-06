<script lang="ts" setup>
import { fetchFileList, type IArgsTemplate, type IDeployDetails, type IPortMng } from '@/api/json'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadUserFile, UploadInstance } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

const state = reactive<{ files: UploadUserFile[] }>({
  files: []
})

const uploadRef = ref<UploadInstance>()

onMounted(() => {
  fetchFileList<IDeployDetails | IPortMng | IArgsTemplate>().then(data => {
    state.files = data.map(it => ({ name: it.filename }))
  })
})

const handleChange = (e: any) => {
  console.log(e, uploadRef.value)
}
</script>

<template>
  <el-upload ref="uploadRef" v-model:file-list="state.files" :auto-upload="false" action="" class="upload-demo" drag multiple @change="handleChange">
    <el-icon class="el-icon--upload">
      <upload-filled />
    </el-icon>
  </el-upload>
</template>
