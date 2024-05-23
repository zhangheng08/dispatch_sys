<template>
  <el-container class="base-con">
    <el-aside width="300" style="height: 100%;"><!-- width="300px" 导致侧栏宽度变得固定，侧栏无法跟随 <LeftNavMenu /> 一起收起 -->
      <LeftNavMenu />
    </el-aside>
    <el-container style="height: 100%;">
      <el-header class="hd">
        <el-row style="height:58%; border-bottom: 1px dotted rgb(226, 226, 226);">
          <el-col :span="1" class="col-inner-ly">
            <!-- <el-button class="expand-btn" :icon="Fold" text @click="emitter.emit('isCollapseSide')" /> -->
            <el-icon color="#000000" class="expand-btn" @click="emitter.emit('isCollapseSide')">
              <Fold />
            </el-icon>
          </el-col>
          <el-col :span="8" class="col-inner-ly">
            <CurrPath />
          </el-col>
          <el-col :span="15">
            <TopToolBar />
          </el-col>
        </el-row>
        <el-row style="height: 42%; border-bottom: 1px dotted rgb(226, 226, 226);">
          <el-col :span="24">
            <TopTabs />
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding: 8px; height: 87.8%;">
        <RouterView>
        </RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="App">

import { ElContainer, ElHeader, ElMain } from 'element-plus';

import { RouterView } from 'vue-router';

import emitter from './utils/emitter';

import {
  Fold
} from '@element-plus/icons-vue'

import CurrPath from './components/CurrPath.vue';

import LeftNavMenu from './components/LeftNavMenu.vue';

import TopToolBar from './components/TopToolBar.vue'

import TopTabs from './components/TopTabs.vue'

</script>

<style scoped>
.base-con {
  background-color: aliceblue;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}

.hd {
  width: 100%;
  height: 12.2%;
  background-color: white;
  padding: 0px;
}

.col-inner-ly {
  height: 100%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
}

.expand-btn {
  width: 20px;
  height: 20px;
  margin-left: 8px;
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


