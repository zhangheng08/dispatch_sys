<template>
    <el-menu style="height: 100%;" text-color="#fff" class="aside" :collapse="isCollapse" @open="handleOpen" @close="handleClose" router="true"
        :default-active="tabCardStore.leftNavActive" unique-opened="true">
        <el-menu-item index="1" class="logo-eara">
            <!-- <el-image :src="local_logo" style="width: 30px; height: 30px;"/> -->
            <img :src="local_logo" style="width: 30px; height: 30px;" />
            <template #title><span
                    style="font-size: 18px; font-weight: bold; color: white; margin-left: 10px;in">氢动力科技</span></template>
        </el-menu-item>
        <!-- <el-sub-menu index="/dashbd" class="menu-item" @click="emitter.emit('onNavSelected', '/dashbd')">
            <template #title>
                <el-icon>
                    <Histogram />
                </el-icon>
                <span>数据面板</span>
            </template>
        </el-sub-menu> -->
        <el-menu-item index="/dashbd" class="menu-item" @click="emitter.emit('onNavSelected', '/dashbd')">
            <el-icon>
                <Histogram />
            </el-icon>
            <template #title>数据面板</template>
        </el-menu-item>
        <el-sub-menu index="111" class="sub-menu">
            <template #title>
                <el-icon>
                    <Calendar />
                </el-icon>
                <span>业务管理</span>
            </template>
            <!-- <el-menu-item index="/intelrmd" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/intelrmd')">固定班线</el-menu-item> -->
            <el-menu-item index="/shuschd" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/shuschd')">零散用车</el-menu-item>
            <!-- <el-menu-item index="/busppl" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/busppl')">大型项目</el-menu-item>
            <el-menu-item index="/addhpl" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/addhpl')">承包车</el-menu-item>
            <el-menu-item index="/addhp2" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/addhp2')">直通车</el-menu-item> -->
        </el-sub-menu>
        <el-sub-menu index="1111" class="sub-menu">
            <template #title>
                <el-icon>
                    <Calendar />
                </el-icon>
                <span>运营调度</span>
            </template>
            <!-- <el-menu-item index="/servsch" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/servsch')">班次管理</el-menu-item> -->
            <el-menu-item index="/dispprc" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/dispprc')">
                <el-badge :value="11" class="badge-sty" :max="10">车辆调度</el-badge>
            </el-menu-item>
            <!-- <el-menu-item index="/" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/')">薪资信息</el-menu-item>
            <el-menu-item index="/" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/')">评价信息</el-menu-item>
            <el-menu-item index="/" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/')">历史工单查询</el-menu-item>
            <el-menu-item index="/" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/')">调度提醒</el-menu-item> -->
        </el-sub-menu>
        <el-menu-item index="/busmng" class="menu-item" @click="emitter.emit('onNavSelected', '/busmng')">
            <el-icon>
                <MapLocation />
            </el-icon>
            <template #title>车辆管理</template>
        </el-menu-item>
        <el-menu-item index="/drvmng" class="menu-item" @click="emitter.emit('onNavSelected', '/drvmng')">
            <el-icon>
                <Avatar />
            </el-icon>
            <template #title>司机管理</template>
        </el-menu-item>


        <!-- <el-sub-menu index="112" class="sub-menu">
            <template #title>
                <el-icon>
                    <CreditCard />
                </el-icon>
                <span>结算管理</span>
            </template>
            <el-menu-item index="/" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/')">工单管理</el-menu-item>
            <el-menu-item index="/" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/')">工单结算</el-menu-item>
            <el-menu-item index="/" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/')">开票信息</el-menu-item>
            <el-menu-item index="/" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/')">薪资信息</el-menu-item>
            <el-menu-item index="/" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/')">支付设置</el-menu-item>
            <el-menu-item index="/" class="sub-menu-item" @click="emitter.emit('onNavSelected', '/')">收款分类统计</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/rotcus" class="menu-item" @click="emitter.emit('onNavSelected', '/rotcus')">
            <el-icon>
                <MapLocation />
            </el-icon>
            <template #title>线路定制</template>
        </el-menu-item>
        <el-menu-item index="/rotcus" class="menu-item" @click="emitter.emit('onNavSelected', '/rotcus')">
            <el-icon>
                <Key />
            </el-icon>
            <template #title>权限设置</template>
        </el-menu-item> -->


    </el-menu>
</template>

<script setup lang="ts" name="LeftNavMenu">

import { ref, onMounted, onUnmounted } from 'vue'

import {
    Histogram,
    MapLocation,
    Calendar,
    CreditCard,
    Van,
    Iphone,
    List,
    Key,
    Avatar
} from '@element-plus/icons-vue'

import local_logo from '@/assets/hpts.png'

import emitter from '@/utils/emitter'

import { tabCard } from '@/store/TabCard'

const tabCardStore = tabCard()

let isCollapse = ref(false)

let defaultActive = ref('/dashbd')

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    tabCardStore.leftNavActive = key
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

emitter.on('isCollapseSide', () => {
    isCollapse.value = !isCollapse.value;
})

onUnmounted(() => {
	emitter.off('isCollapseSide')
})

</script>

<style scoped>

.badge-sty {
    line-height: 20px;
    width: 70px;
}

.logo-eara {
    height: 100px;
    background-color: #001529;
}

.logo-eara:hover {
    cursor: default;
}

.aside:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background-color: #001529;
}

:deep().sub-menu {
    background-color: #001529;
}

.sub-menu-item {
    background-color: #0c2135;
    font-size: 12px;
}

.sub-menu-item:hover,
.menu-item:hover {
    background-color: #15314b !important;
    cursor: pointer;
}

.expand-btn {
    width: 15px;
    height: 15px;
}

.header-inner {
    float: left;
    width: 100%;
    height: 100%;
    background-color: antiquewhite;
}

.header-inner-r {
    float: right !important;
}
</style>

<style lang="less">
.el-sub-menu .el-sub-menu__title {
    background-color: #001529 !important;
}

.el-sub-menu .el-sub-menu__title:hover {
    background-color: #15314b !important;
}

.el-button:hover {
    background-color: transparent !important;
    color: black;
}

.el-menu--collapse {
    width: 75px;
    min-height: 400px;
    background-color: #001529;
}
</style>