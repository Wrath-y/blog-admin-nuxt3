<template>
    <el-card>
        <form>
            <div style="width: 240px;display:inline-block">
                <el-input placeholder="搜索" v-model="formData.keyword" size="default" />
            </div>
            <div style="display:inline-block">
                <el-button size="default" @click="fetchList()">筛选</el-button>
            </div>
            <div style="display:inline-block">
                <router-link to="/friend/0" append>
                    <el-button size="default">添加</el-button>
                </router-link>
            </div>
        </form>
        <el-table :data="list" v-loading="loading" size="default">
            <el-table-column prop="id" label="ID" width="50" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="Url" label="Url" />
            <el-table-column prop="update_time" label="更新时间" width="220">
                <template #default="scope">
                    {{ getNowFormatDateTime(scope.row.update_time) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="230">
                <template #default="scope">
                    <router-link :to="`/friend/${scope.row.id}`" append>
                        <el-button size="default">编辑</el-button>
                    </router-link>
                    <el-button type="danger" size="default" @click="deleteHandler(scope.row.id)">删除</el-button>
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
    page_size: 6,
})
const formData = reactive({
    page: 1,
})
let list = reactive([])

const fetchList = async (page = 0) => {
    loading.value = true;
    if (page > 0) {
        formData.page = page;
    }
    const { data } = await useHttpGet('getFriends', '/friend_links' + useQueryToString(formData))
    if (data.value.code == 200) {
        list = data.value.data.list;
        pagination.total = data.value.data.count;
    }
    loading.value = false;
}

const deleteHandler = async (id) => {
    loading.value = true;
    const { data } = await useHttpDel('delFriend', '/friend_links/' + id)
    if (data.value.code == 200) {
        await fetchList();
    };
    loading.value = false;
}

await fetchList()

</script>

