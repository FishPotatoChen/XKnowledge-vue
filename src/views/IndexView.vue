<template>
  <a-space direction="vertical" :style="{ width: '100%' ,height: '100vh'}" :size="[0, 48]">
    <a-layout>
      <a-layout-header :style="headerStyle">
        <a-input-search
            v-model:value="value"
            placeholder="搜素您需要的知识图谱"
            :loading="searchLoading"
            enter-button
            :style="{width: '50%'}"
        />
      </a-layout-header>
      <a-layout-content :style="contentStyle">
        <div style="padding: 20px">
          <a-row :gutter="16">
            <a-col :span="4">
              <a-card hoverable size="small" :onclick="createGraph">
                <template #cover>
                  <PlusOutlined style="height: 140px;display: flex;alignItems: center;justifyContent: center"
                                :style="{fontSize: '30px', color: '#0085ca'}"/>
                </template>
                <template #actions>
                  <a-upload
                      v-model:file-list="fileList"
                      name="file"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      @change="handleChange"
                  >
                    <a-button>
                      <upload-outlined></upload-outlined>
                      导入本地文件
                    </a-button>
                  </a-upload>
                </template>
              </a-card>
              <span>新建空白思维导图</span>
            </a-col>
            <a-col :span="4">
              <a-card hoverable size="small">
                <template #cover>
                  <img alt="example"
                       src="https://echarts.apache.org/examples/data/thumb/graph-force2.webp?_v_=1713934768584"/>
                </template>
              </a-card>
              <span>力引导布局</span>
            </a-col>
            <a-col :span="4">
              <a-card hoverable size="small">
                <template #cover>
                  <img alt="example"
                       src="https://echarts.apache.org/examples/data/thumb/graph-simple.webp?_v_=1713934768584"/>
                </template>
              </a-card>
              <span>Graph 简单示例</span>
            </a-col>
            <a-col :span="4">
              <a-card hoverable size="small">
                <template #cover>
                  <img alt="example"
                       src="https://echarts.apache.org/examples/data/thumb/graph-force.webp?_v_=1713934768584"/>
                </template>
              </a-card>
              <span>力引导布局</span>
            </a-col>
            <a-col :span="4">
              <a-card hoverable size="small">
                <template #cover>
                  <img alt="example"
                       src="	https://echarts.apache.org/examples/data/thumb/graph-force-dynamic.webp?_v_=1713934768584"/>
                </template>
              </a-card>
              <span>动态增加图节点</span>
            </a-col>
            <a-col :span="4">
              <a-card hoverable size="small">
                <template #cover>
                  <img alt="example"
                       src="https://echarts.apache.org/examples/data/thumb/graph-webkit-dep.webp?_v_=1713934768584"/>
                </template>
              </a-card>
              <span>WebKit 模块关系依赖图</span>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
    </a-layout>
  </a-space>
</template>


<script setup>
import {ref} from 'vue';
import {PlusOutlined} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import { message } from 'ant-design-vue';


const searchLoading = ref(false);
const value = ref('');

const router = useRouter();

const createGraph = () => {
  router.push({
    path: 'newGraph',
  })
};

const handleChange = info => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const fileList = ref([]);
const headers = {
  authorization: 'authorization-text',
};


const headerStyle = {
  height: '10vh',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center', // 垂直居中
};
const contentStyle = {
  textAlign: 'center',
  height: '90vh',
  lineHeight: '30px',
  backgroundColor: '#ffffff',
};
</script>


<style scoped>

</style>