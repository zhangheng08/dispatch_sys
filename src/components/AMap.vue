<template>
  <div class="card-bg">
    <div id="container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map:any = null;

onMounted(() => {
  AMapLoader.load({
    key: "44d140bbd5a351ec3ba267f769c01e87", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 15, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
        mapStyle: "amap://styles/whitesmoke"
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<style scoped>
#container {
   width: 100%;
   height: 450px;
   z-index: 1;
 }

 .card-bg {
     width: 100%;
 }
</style>
