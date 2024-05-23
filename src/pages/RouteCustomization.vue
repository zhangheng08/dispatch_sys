<template>
    <div style="width: 100%;">
        <el-card :body-style="{padding:'0px'}" shadow="never" class="map-card"><BMap /></el-card>
        <el-card class="btm_list" shadow="never"></el-card>
    </div>
</template>

<script setup lang="ts" name="router_customization">

import BMap from '../components/BMap.vue'

</script>

<style scoped>

.map-card {
    width: 100%; 
    height: 450px;
    z-index: 0;
    box-shadow: 0px -2px 3px 1px #ccc inset;
}

.btm_list {
    width: 100%;
    margin-top: 1px;
    height: 300px;
    background-color: white;
    border-radius: 0px;
    z-index: 999;
    box-shadow: 0px -1px 1px 0px #ccc;
}

</style>