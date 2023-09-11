<template>
    <div class="navtop">
        <el-menu router default-active="/article" class="el-menu-vertical-demo">
            <el-menu-item index="/article">
                <template #title>
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>articles</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/pixiv">
                <template #title>
                    <el-icon>
                        <Picture />
                    </el-icon>
                    <span>pixiv</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/friend">
                <template #title>
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <span>friend</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/comment">
                <template #title>
                    <el-icon>
                        <ChatDotSquare />
                    </el-icon>
                    <span>comments</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/setting">
                <template #title>
                    <el-icon>
                        <Setting />
                    </el-icon>
                    <span>settings</span>
                </template>
            </el-menu-item>
        </el-menu>
    </div>
</template>
