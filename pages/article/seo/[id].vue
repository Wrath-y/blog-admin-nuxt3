<template>
    <el-card>
        <el-form :model="formData" label-width="80px">
            <el-form-item label="Title">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="Keywords">
                <el-input v-model="formData.keywords"></el-input>
            </el-form-item>
            <el-form-item label="Description">
                <el-input v-model="formData.description"></el-input>
            </el-form-item>
        </el-form>
        <div style="text-align: center">
            <el-button size="default" @click="save" :loading="loading">保存</el-button>
            <el-button size="default" @click="back" :loading="loading">返回</el-button>
        </div>
    </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter();

const loading = ref(false)
let formData = reactive({
    id: 0,
    article_id: 0,
    title: '',
    keywords: '',
    description: '',
    create_time: '',
})


const fetchData = async () => {
    if (route.params.id == 0) {
        return
    }
    loading.value = true;

    const { data } = await useHttpGet('getArticleSeo', `/seo/${route.params.id}`)
    if (data.value.code == 200) {
        formData = data.value.data;
        if (!formData.create_time) {
            formData.create_time = new Date();
        }
    }
    loading.value = false;
}

await fetchData()

const save = async () => {
    if (route.params.id == 0) {
        return
    }

    loading.value = true;

    formData.article_id = Number(route.params.id)

    const { data } = await useHttpPost('addArticleSeo', '/seo', { body: formData })
    if (data && data.value.code == 200) {
        ElMessage.success('修改成功')
        router.back()
    } else {
        ElMessage.error('修改失败');
    }

    loading.value = false;
}

const back = () => {
    router.back();
}
</script>

