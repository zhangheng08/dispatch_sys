<template>
  <el-container class="base-con">
    <el-container class="login-con" v-show="loginAfterwardStore.loginToShow">
      <el-row justify="center" style="width: 100%; height: 100%;">
        <el-col :span="11">
          <el-row algin="middle" style="height: 100%;">
            <el-col :span="24" style="height: 15%;"></el-col>
            <el-col :span="24" style="height: 70%;"></el-col>
            <el-col :span="24" style="height: 15%;"></el-col>
          </el-row>
        </el-col>
        <el-col :span="9">
          <el-row algin="middle" style="height: 100%;">
            <el-col :span="24" style="height: 15%;">
            </el-col>
            <el-col :span="24" style="height: 65%;">
              <el-card style="width: 420px; height: 520px;" :body-style="{ padding: '0px' }">
                <el-row style="height: 520px;">
                  <el-col :span="24" style="height: 12.5%; text-align: right; padding: 6px;"><el-image
                      style="width: 42px; height: 42px" :src="fake_code" fit="contain" /></el-col>
                  <el-col :span="24" style="height: 12.5%; text-align: center;">
                    <el-text
                      style="padding-bottom: 10px; font-size: 18px; font-weight: bold; font-family: '微软雅黑'; border-bottom: 3px solid rgb(31, 152, 252);">
                      车 辆 调 度 系 统</el-text>
                  </el-col>
                  <el-col :span="24" style="height: 12.5%;  text-align: center;">
                    <el-input style="width: 75%; height: 38px;" placeholder="请输入账号" :prefix-icon="User"
                      v-model="userName" />
                  </el-col>
                  <el-col :span="24" style="height: 10%; text-align: center;">
                    <el-input style="width: 75%; height: 38px;" v-model="password" type="password" show-password
                      placeholder="请输入密码" :prefix-icon="Lock" />
                  </el-col>
                  <el-col :span="24" style="height: 11.5%; text-align: center; padding: 0px 12% 0px 12%;">
                    <el-row justify="space-between">
                      <el-col :span="6" style="text-align: left;">
                        <el-checkbox label="记住密码" size="small" />
                      </el-col>
                      <el-col :span="6"></el-col>
                      <el-col :span="6" style="text-align: right;">
                        <el-button link style="height: 100%;" size="small">忘记密码</el-button>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="24" style="height: 10%; text-align: center;">
                    <el-button @click="toLogin" style="width: 75%; height: 45px;" type="primary"
                      size="large">登录</el-button>
                  </el-col>
                  <el-col :span="24" style="height: 12%; text-align: center;">
                    <el-button style="width: 75%; height: 45px;" link size="large">注册账号</el-button>
                  </el-col>
                  <el-col :span="24" style="height: 11%; text-align: center; padding: 0 12.5% 0 12.5%">
                    <el-divider style="width: 100%;"><span
                        style="font-size: 10px; color: rgb(147, 204, 251); font-family:'华文新宋';">氢动力（北京）科技服务有限公司</span></el-divider>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
            <el-col :span="24" style="height: 20%;"></el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-container >

    <el-aside width="300" style="height: 100%;" v-show="loginAfterwardStore.menuToShow">
      <LeftNavMenu />
    </el-aside>
    <el-container style="height: 100%;" v-show="loginAfterwardStore.mainTabToShow">
      <el-header class="hd">
        <el-row style="height:58%; border-bottom: 1px dotted rgb(226, 226, 226);">
          <el-col :span="1" class="col-inner-ly">
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

import {
  User,
  Lock
} from '@element-plus/icons-vue'

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

import axios from 'axios'

import { ref, onMounted } from 'vue'

import { useUserStore } from '@/store/user'
import { loginAfterward } from '@/store/LoginAfterward'


var userStore = useUserStore()
var loginAfterwardStore = loginAfterward()

var token = ref('')

var axio = axios.create({
  baseURL: 'http://localhost:8088/API',
  timeout: 3000,
  headers: {
    "Authorization": userStore.accessToken
  }
});

import fake_code from '@/assets/code02.png'

var userName = ref('')
var password = ref('')

onMounted(() => {

//   axio.post('/authValid')
//     .then(function (response) {
//       if (response.data.resultCode === 'SUCCESS') {
//         loginToShow.value = false;
//         mainTabToShow.value = true;
//         menuToShow.value = true;
//       }
//     }).catch(function (error) {
//       loginToShow.value = true;
//       mainTabToShow.value = false;
//       menuToShow.value = false;
//     });
 })

var toLogin = function () {

  axio.post('/login', {
    "username": userName.value,
    "password": password.value
  }).then(function (response) {
    if (response.data.resultCode === 'SUCCESS') {
      userStore.accessToken = 'Bearer ' + response.data.signatureTokenValue
      userStore.userName = response.data.userInfo.realName
      userStore.userCode = response.data.userInfo.name
      loginAfterwardStore.afterward(false, true, true)
    }
  }).catch(function (error) {
    loginAfterwardStore.afterward(true, false, false)
  });
}

</script>

<style scoped>
/* div {
  border: 0px solid pink;
} */

.base-con {
  /* background: url('assets/avatar.jpg') no-repeat center; */
  background-color: rgb(247, 246, 246);
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}

.login-con {
  background: url('assets/c.jpg') no-repeat center;
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

.paperview-input-text :deep(.el-input-wapper) {
  border-radius: 0px;
  border: 0px;
}

.input-sty,
.input-sty:focus {
  border: none;
  box-shadow: none;
  border-bottom: 1px solid #ddd;
}
</style>