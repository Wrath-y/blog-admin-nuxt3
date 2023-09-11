<template>
    <el-upload class="avatar-uploader" :action="ObjData.host" :show-file-list="false" :before-upload="ossPolicy"
        :data="ObjData" list-type="picture" :on-success="success">
        <img v-if="curImage" :src="curImage" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['image'])
const curImage = ref(props.image)

const ObjData = ref({})

const setData = async () => {
    ObjData.value = await getOssPolicy('article_img/' + getNowFormatDate() + '/')
}

const ossPolicy = async (file) => {
    await setData()
}

const emit = defineEmits(['uploadEvent'])

const success = (_, res) => {
    curImage.value = ObjData.value.host + '/' + ObjData.value.dir + res.name
    emit('uploadEvent', curImage.value);
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 278px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>