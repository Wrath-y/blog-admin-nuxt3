<template>
    <el-card>
        <el-form :model="formData" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-input v-model="formData.tags"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-radio-group v-model="formData.source">
                    <el-radio :label="0">本人</el-radio>
                    <el-radio :label="1">外部资源</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否显示">
                <el-radio-group v-model="formData.status">
                    <el-radio :label="1">显示</el-radio>
                    <el-radio :label="0">不显示</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="图片">
                <FileUpload :image="formData.image" @upload-event="uploadEvent" />
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="formData.intro"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <MdEditor v-model="formData.con" :sanitize="sanitize" @onUploadImg="onUploadImg" codeTheme="github" />
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
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import axios from 'axios';

const route = useRoute()
const router = useRouter();

const loading = ref(false)
let formData = reactive({
    id: 0,
    title: '',
    tags: '',
    image: '',
    source: 0,
    status: 0,
    html: '',
    con: ''
})

const sanitize = (html) => {
    formData.html = html

    return formData.html
}

const fetchData = async () => {
    if (route.params.id == 0) {
        return
    }
    loading.value = true;

    const { data } = await useHttpGet('getArticle', `/articles/${route.params.id}`)
    if (data.value.code == 200) {
        formData = data.value.data;
    }
    loading.value = false;
}

await fetchData()

const save = async () => {
    loading.value = true;

    if (Number(formData.id) == 0) {
        const { data } = await useHttpPost('addArticle', '/articles', { body: formData })
        if (data.value.code == 200) {
            ElMessage.success('添加成功')
            router.back()
        } else {
            ElMessage.error('添加失败');
        }
    } else {
        const { data } = await useHttpPut('updateArticle', `/articles/${formData.id}`, { body: formData })
        if (data.value.code == 200) {
            ElMessage.success('保存成功')
        } else {
            ElMessage.error('保存失败');
        }
    }

    loading.value = false;
}

// 图片上传
const uploadEvent = (url) => {
    formData.image = url
}
const onUploadImg = async (files, callback) => {
    let obj = await getOssPolicy('article_img/' + getNowFormatDate() + '/')
    let title = formData.title ? formData.title : ''
    let newFiles = []
    files.map((file) => {
        let newFileName = title + formatDate() + ".png"
        let newFile = new File([file], newFileName, file);
        newFiles.push(newFile)
    })
    const res = await Promise.all(
        newFiles.map((file) => {
            return new Promise((rev, rej) => {
                const form = new FormData();
                form.append('OSSAccessKeyId', obj.OSSAccessKeyId);
                form.append('policy', obj.policy);
                form.append('signature', obj.signature);
                form.append('success_action_status', obj.success_action_status);
                form.append('dir', 'article_img/');
                form.append('host', obj.host);
                form.append('key', obj.key);
                form.append('file', file);

                axios
                    .post(obj.host, form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => { res.data = obj.host + '/' + obj.dir + file.name; rev(res) })
                    .catch((error) => rej(error));
            });
        })
    );
    callback(res.map((item) => item.data));
}

const formatDate = () => {
    // 创建一个新的Date对象，表示当前时间
    const currentDate = new Date();

    // 获取年、月、日、时、分、秒
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // 月份从0开始，所以要加1，并确保为两位数
    const day = ('0' + currentDate.getDate()).slice(-2); // 获取日，并确保为两位数
    const hours = ('0' + currentDate.getHours()).slice(-2); // 获取小时，并确保为两位数
    const minutes = ('0' + currentDate.getMinutes()).slice(-2); // 获取分钟，并确保为两位数
    const seconds = ('0' + currentDate.getSeconds()).slice(-2); // 获取秒钟，并确保为两位数

    // 格式化时间字符串
    return year + '-' + month + '-' + day + '_' + hours + '-' + minutes + '-' + seconds;
}

const back = () => {
    router.back();
}
</script>
