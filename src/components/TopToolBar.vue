<template>
    <div class="ly">
        <div>
            <el-icon :size="18" color="black">
                <Search />
            </el-icon>
        </div>
        <div>
            <el-icon :size="18" color="black">
                <Bell />
            </el-icon>
        </div>
        <div>
            <el-icon :size="18" color="black">
                <FullScreen />
            </el-icon>
        </div>
        <div style="width: 150px;">
            <el-avatar :size="30" :src="avatar_pic" />
            <el-text style="color: rgb(41, 41, 45); margin-left: 10px; max-width: 90px; font-size: 13px;" truncated>云逸舟</el-text>
        </div>
        <div>
            <el-icon :size="18" color="black">
                <Setting />
            </el-icon>           
        </div>
    </div>
</template>

<script setup lang="ts" name="TopToolBar">

import avatar_pic from '@/assets/avatar.jpg'

import {
  Setting,
  FullScreen,
  Search,
  Bell,
} from '@element-plus/icons-vue'

</script>

<style scoped>
.ly {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
}

.ly div {
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ly div:hover {
    background-color: aliceblue;
    cursor: pointer;
}

</style>