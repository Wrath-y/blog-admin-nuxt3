<template>
    <el-card>
        <form @submit.prevent="fetchList()">
            <div style="display:inline-block">
                <el-input size="default" v-model="formData.cookie" placeholder="输入cookie"></el-input>
            </div>
            <div style="display:inline-block">
                <el-button size="default" @click="synchronizePixiv">同步pixiv</el-button>
            </div>
        </form>
        <el-table :data="list" v-loading="loading" size="default">
            <el-table-column label="图片">
                <template #default="scope">
                    <img :src="`https:///wrath-pixiv.oss-cn-shanghai.aliyuncs.com/${scope.row.Key}?x-oss-process=image/resize,l_100`"
                        width="100" />
                </template>
            </el-table-column>
            <el-table-column>
                <template #default="scope">
                    <el-button type="danger" size="default" @click="deleteHandler(scope.row.Key)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center">
            <el-pagination layout="total, prev, pager, next" @current-change="fetchList" :page-size="pagination.page_size"
                :total="pagination.total">
            </el-pagination>
        </div>
    </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue';

const loading = ref(false)
const pagination = reactive({
    total: 0,
    page_size: 15,
    next_marker: "",
})
const formData = reactive({
    cookie: ''
})
let list = reactive([])

const fetchList = async () => {
    loading.value = true;

    const { data } = await useHttpGet('getPixivs', '/pixivs' + useQueryToString(pagination))
    if (data.value.code == 200) {
        list = data.value.data.Objects.map((i) => {
            i.Key = encodeUrl(i.Key);
            return i;
        });
        pagination.next_marker = data.value.data.NextMarker
    }
    loading.value = false;
}

const fetchCount = async () => {
    const { data } = await useHttpGet('getPixivCount', '/pixivs/count')
    if (data.value.code == 200) {
        pagination.total = data.value.data;
    }
}

const deleteHandler = async (name) => {
    loading.value = true;
    const { data } = await useHttpDel('delPixiv', '/pixivs?name=' + name)
    if (data.value.code == 200) {
        await fetchList();
    };
    loading.value = false;
}


const synchronizePixiv = async (name) => {
    loading.value = true;
    const { data } = await useHttpPost('synchronizePixiv', '/pixivs', { body: form })
    loading.value = false;
}

const encodeUrl = (str) => {
    // str = encodeURIComponent(str);
    str = str.replace(/\+/g, '%2B');
    return str;
}


await fetchCount()
await fetchList()

</script>

