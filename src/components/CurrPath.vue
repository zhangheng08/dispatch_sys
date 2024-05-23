<template>
    <el-breadcrumb separator="/" >
        <el-breadcrumb-item style="font-size: 13px;"  v-for="p in currPathArr" :key="p.pathValue" :to="{ path:p.to}">
            {{ p.path }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>
            <el-icon color="#ccf"><MoreFilled /></el-icon>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts" >

import { ref, reactive, onUnmounted } from "vue"
import emitter from '@/utils/emitter'

import {
    MoreFilled
} from '@element-plus/icons-vue'

interface TopPath {
  to:string,
  path:string,
  pathValue:string
}

let pathName = ref('数据面板')

const currPathArr:TopPath[] = reactive([{to:"/dashbd", path:"数据面板", pathValue:"/dashbd"}]);

emitter.on('onNavSelected', (pathVal:any) => {

    currPathArr.length = 0;
    if (pathVal == '/dashbd') {
        pathName.value = '数据面板'
        currPathArr.push({to:pathVal, path:pathName.value, pathValue:pathVal})
    } else if (pathVal == '/rotcus') {
        pathName.value = '线路定制'
        currPathArr.push({to:pathVal, path:pathName.value, pathValue:pathVal})
    } else if (pathVal == '/drvmng') {
        pathName.value = '司机管理'
        currPathArr.push({to:pathVal, path:pathName.value, pathValue:pathVal})
    } else if (pathVal == '/busmng') {
        pathName.value = '车辆管理'
        currPathArr.push({to:pathVal, path:pathName.value, pathValue:"/busmng" + pathVal})
    } else if (pathVal == '/shuschd') {
        pathName.value = '临时班线'
        // currPathArr.push({to:"/dashbd", path:"班车调度", pathValue:pathVal})
        currPathArr.push({to:pathVal, path:pathName.value, pathValue:"/rotcus" + pathVal})
    } else if (pathVal == '/intelrmd') {
        pathName.value = '固定班线'
        currPathArr.push({to:pathVal, path:pathName.value, pathValue:"/rotcus" + pathVal})
    } else if (pathVal == '/busppl') {
        pathName.value = '班车线路规划'
        currPathArr.push({to:"/dashbd", path:"班车调度", pathValue:pathVal})
        currPathArr.push({to:pathVal, path:pathName.value, pathValue:"/rotcus" + pathVal})
    } else if (pathVal == '/addhpl') {
        pathName.value = '加氢线路规划'
        currPathArr.push({to:"/dashbd", path:"班车调度", pathValue:pathVal})
        currPathArr.push({to:pathVal, path:pathName.value, pathValue:"/rotcus" + pathVal})
    } else if (pathVal == '/servsch') {
        pathName.value = '班次管理'
        currPathArr.push({to:"/servsch", path:"班次管理", pathValue:pathVal})
        currPathArr.push({to:pathVal, path:pathName.value, pathValue:"/servsch" + pathVal})
    }
    
    emitter.emit('addTab', {targetName:pathName.value, targetKey:pathVal})

})

onUnmounted(() => {
    emitter.off('onNavSelected')
})

</script>

<style scoped>

    

</style>