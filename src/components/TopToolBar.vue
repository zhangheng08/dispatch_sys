<template>
    <div class="ly">
        <!-- <div>
            <el-icon :size="18" color="black">
                <Search />
            </el-icon>
        </div> -->
        <div>
            <el-icon :size="18" color="black">
                <Bell />
            </el-icon>
        </div>
        <div @click="toFullscreen">
            <el-icon :size="18" color="black">
                <FullScreen />
            </el-icon>
        </div>
        <div style="width: 150px;">
            <el-avatar :size="30" :src="(userSex == '男') ? malePic : femalePic" />
            <el-text style="color: rgb(41, 41, 45); margin-left: 10px; max-width: 90px; font-size: 13px;" truncated>{{
                userName }}</el-text>
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
            <div>
                <el-icon :size="18" color="black">
                    <Setting />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu style="width: 160px;">
                    <el-dropdown-item command="b" ><span style="font-size: 13px;">个人信息</span></el-dropdown-item>
                    <el-dropdown-item command="c" ><span style="font-size: 13px;">关于</span></el-dropdown-item>
                    <el-dropdown-item command="d" disabled><span style="font-size: 13px;">设置</span></el-dropdown-item>
                    <el-dropdown-item command="quit" divided>
                        <el-icon :size="15" color="#F26767">
                            <SwitchButton />
                        </el-icon>
                        <span style="color: #F26767; font-size: 13px;">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- <el-popover placement="bottom" :width="200" trigger="click">
            <template #reference>
                <div>
                    <el-icon :size="18" color="black">
                        <Setting />
                    </el-icon>
                </div>
                <div style="text-align: right; margin: 0; height: 300px;">
                    <el-button size="small" text >cancel</el-button>
                    <el-button size="small" type="primary">
                        confirm
                    </el-button>
                </div>
            </template>
        </el-popover> -->
    </div>
</template>

<script setup lang="ts" name="TopToolBar">

import malePic from '@/assets/male001.jpeg'
import femalePic from '@/assets/female001.jpeg'
import { ref, onMounted } from 'vue'
import screenfull from "screenfull"
import {
    Setting,
    FullScreen,
    SwitchButton,
    Search,
    Bell,
} from '@element-plus/icons-vue'

import { useUserStore } from '@/store/user'
import { loginAfterward } from '@/store/LoginAfterward'
import { tabCard, type TabItem } from '@/store/TabCard'
import { useRouter } from 'vue-router'
import emitter from '@/utils/emitter'
const router = useRouter()

const tabCardStore = tabCard()
var userStore = useUserStore()
var loginAfterwardStore = loginAfterward()

defineProps(['userName', 'userSex'])

onMounted(() => {

    window.addEventListener("keydown", onKeyDown, true)

})

const onKeyDown = function (event: any) {
    if (event.keyCode === 122) {
        event.returnValue = false;
        toFullscreen();
    }
}

const toFullscreen = function () {
    if (!screenfull.isEnabled) {
        console.error("unEnabled");
        return;
    }
    screenfull.toggle();
}

const handleCommand = (command: string | number | object) => {
    if(command == 'quit') {
        toLogout()
    }
}

var toLogout = function () {
    userStore.accessToken = ''
    userStore.userName = ''
    userStore.userCode = ''
    userStore.sex = ''
    loginAfterwardStore.afterward(true, false, false)
    tabCardStore.list.length = 0
    tabCardStore.leftNavActive = '/dashbd'
    tabCardStore.currentTabKey = '/dashbd'
    tabCardStore.list.push({tabKey:tabCardStore.currentTabKey, title:"数据面板"})
    router.replace({'path':'/dashbd'})
    emitter.emit('onNavSelected', '/dashbd')
}

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