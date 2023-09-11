<template>
    <el-row>
        <el-col :span="4">
            <navigator />
        </el-col>
        <el-col :span="20">
            <slot />
        </el-col>
    </el-row>
</template>
