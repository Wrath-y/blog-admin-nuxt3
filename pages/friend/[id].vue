<template>
    <el-card>
        <el-form :model="formData" label-width="80px">
            <el-form-item label="Name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="Url">
                <el-input v-model="formData.url"></el-input>
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
    name: '',
    email: '',
    url: '',
})


const fetchData = async () => {
    if (route.params.id == 0) {
        return
    }
    loading.value = true;

    const { data } = await useHttpGet('getFriend', `/friend_links/${route.params.id}`)
    if (data.value.code == 200) {
        formData = data.value.data;
    }
    loading.value = false;
}

await fetchData()

const save = async () => {
    loading.value = true;

    if (Number(formData.id) == 0) {
        const { data } = await useHttpPost('addFriend', '/friend_links', { body: formData })
        if (data.value.code == 200) {
            ElMessage.success('添加成功')
            router.back()
        } else {
            ElMessage.error('添加失败');
        }
    } else {
        const { data } = await useHttpPut('updateFriend', `/friend_links/${formData.id}`, { body: formData })
        if (data.value.code == 200) {
            ElMessage.success('保存成功')
        } else {
            ElMessage.error('保存失败');
        }
    }

    loading.value = false;
}

const back = () => {
    router.back();
}
</script>

