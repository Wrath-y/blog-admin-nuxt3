<template>
    <div class="login-page">
        <el-card>
            <el-form ref="ruleFormRef" :model="form" :rules="rules" label-position="top">
                <el-form-item prop="account">
                    <el-input :autofocus="true" placeholder="请输入账号" v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item class="center">
                    <el-button type="primary" @click="login(ruleFormRef)" :loading="isBtnLoading">{{ btnText }}</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: false,
});

interface RuleForm {
    account: string
    password: string
}

const ruleFormRef = ref<FormInstance>()

const form = reactive<RuleForm>({
    account: '',
    password: '',
})

const rules = reactive<FormRules<RuleForm>>({
    account: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})

const isBtnLoading = ref(false)
const btnText = ref('登陆')
const token = useCookie('token')
const router = useRouter()

const login = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            isBtnLoading.value = true;
            btnText.value = '登陆中'
            const {
                data
            } = await useHttpPost("/login", `/login`, { body: form });
            if (data.value.code == 200) {
                token.value = data.value.data.token;
                setPageLayout('default')
                router.push('article')
                isBtnLoading.value = false
            } else {
                ElMessage.error('登陆失败')
                isBtnLoading.value = false
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

</script>

<style lang="scss">
.login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e1e2e2;

    .el-card {
        width: 100%;
        max-width: 400px;
    }

    .title {
        color: #20a0ff;
        font-weight: bold;
        font-size: 30px;
        text-align: center;
        line-height: 2.2;
        font-family: sans-serif;
    }

    .el-button {
        width: 100%;
    }
}
</style>
