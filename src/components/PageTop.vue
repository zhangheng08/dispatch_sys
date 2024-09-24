<template>
  <el-row>
    <el-col id="normalSearch" class="item-sty" :span="6">
      <el-input
        v-model="normalSearchInput"
        style="width: 240px"
        :placeholder="hint(useType)"
        clearable
      />
      &nbsp;
      <el-button :icon="Search" circle style="width: 30px; height: 30px" @click='toFuzzySearch(useType)'/>
    </el-col>
    <el-col id="moreSearchExpand" class="item-sty" :span="2">
      <el-button link style="height: 35px; color: #3687da; font-size: 13px" small>
        <el-icon class="el-icon--left">
          <Filter style="color: #3687da" />
        </el-icon>
        更多条件
        <el-icon class="el-icon--right">
          <ArrowDown style="color: #3687da" />
        </el-icon>
      </el-button>
    </el-col>
    <el-col class="item-sty" :span="2" :offset="10">
      <el-button
        style="height: 30px; width: 80px; font-size: 12px"
        @click="triggerEmitter(useType, 'add')"
      >
        <el-icon class="el-icon--left">
          <Plus style="color: grey" />
        </el-icon>
        新增
      </el-button>
    </el-col>
    <el-col class="item-sty" :span="2">
      <el-dropdown>
        <div class="el-dropdown-link">
          <el-icon style="margin-right: 3px">
            <Document />
          </el-icon>
          <el-button link style="font-size: 12px">导入/导出</el-button>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="Upload" @click="triggerEmitter(useType, 'upload')">
              <span style="font-size: 12px">导入</span>
            </el-dropdown-item>
            <el-dropdown-item :icon="Download"
              ><span style="font-size: 12px">导出</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
    <el-col class="item-sty" :span="2">
      <el-button
        style="height: 30px; width: 80px; font-size: 12px"
        link
        @click="triggerEmitter(useType, 'refresh')"
      >
        <el-icon class="el-icon--left">
          <Refresh style="color: grey" />
        </el-icon>
        刷新
      </el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="PageHeader">
import {
  Search,
  ArrowDown,
  Plus,
  Upload,
  Download,
  Printer,
  Refresh,
  Document,
  Filter
} from '@element-plus/icons-vue'

import { ref, onMounted, watch } from 'vue'

import emitter from '@/utils/emitter'

defineProps(['useType'])

var normalSearchInput = ref('')
var placeholderHint = ref('')

onMounted(() => {})

const hint = (type: string): string => {
  if (type === 'DriverManagement') {
    placeholderHint.value = '可输入姓名/档案号/手机号检索'
  } else if (type === 'scatteredServices') {
    placeholderHint.value = '可输入单号/业务负责人/调度员/服务主体检索'
  }
  return placeholderHint.value
}

const triggerEmitter = function (type: string, btnType: string) {
  if (type === 'scatteredServices') {
    if (btnType === 'add') {
      emitter.emit('addDialogSwitch', true)
    }
  } else if (type === 'DriverManagement') {
    if (btnType === 'upload') {
      emitter.emit('uploadDialogSwitch', true)
    } else if (btnType === 'refresh') {
      emitter.emit('refreshList')
    } else if (btnType === 'add') {
      emitter.emit('addDriver')
    }
  }
}

watch(
  normalSearchInput,
  (newValue, oldValue) => {
    emitter.emit('refreshFuzzySearchKeyword', newValue)
  })

const toFuzzySearch = (type:string) => {

  if (type === 'scatteredServices') {
    console.log('')
  } else if (type === 'DriverManagement') {
    emitter.emit('driverPageFuzzySearch')
  }

}

</script>

<style>
#normalSearch,
#moreSearchExpand {
  text-align: left;
}

.item-sty {
  text-align: right;
}

.el-dropdown-link {
  height: 30px;
  font-size: 12px;
  margin-right: 10px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
</style>
