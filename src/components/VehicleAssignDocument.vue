<template>
  <el-watermark
    :font="font"
    :gap="[100, 70]"
    :content="['氢动力(北京)科技服务有限公司', 'Hydrogen Power Technology Co., Limited']"
  >
    <el-row>
      <el-col :span="24">
        <el-descriptions class="margin-top" title="派车单" :column="3" border>
          <template #extra>
            <span style="font-size: 14px; color: #f89898">单号:{{currentServiceNo}}</span>
          </template>
          <el-descriptions-item width="16%">
            <template #label>
              <div class="cell-item">调度人</div>
            </template>
            {{ orderRea.dui_name }}
          </el-descriptions-item>
          <el-descriptions-item width="16%">
            <template #label>
              <div class="cell-item">市内/外埠</div>
            </template>
            市内
          </el-descriptions-item>
          <el-descriptions-item width="16%">
            <template #label>
              <div class="cell-item">上级负责人<br />(组长/队长)</div>
            </template>
            {{ dispatchRea.group_chief_name }} / {{ dispatchRea.fleet_chief_name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">车辆小组</div>
            </template>
            {{ dispatchRea.fleet_name }} / {{ dispatchRea.group_name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">客户名称</div>
            </template>
            {{ orderRea.serv_princ }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">业务联系人</div>
            </template>
            {{ orderRea.oui_name }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template #label>
              <div class="cell-item">时间</div>
            </template>
            {{ format(orderRea.start_time, 'yyyy-MM-dd HH:ss') }} 至 {{ format(orderRea.end_time, 'yyyy-MM-dd HH:ss') }}
          </el-descriptions-item>
          <el-descriptions-item :span="3">
            <template #label>
              <div class="cell-item">派车事由</div>
            </template>
            {{ orderRea.serv_desc }}
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template #label>
              <div class="cell-item">任务行程</div>
            </template>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">任务类型</div>
            </template>
            {{ orderRea.task_name }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-row style="margin-top: 12px">
      <el-col>
        <el-table
          :data="tableData"
          stripe="true"
          :header-row-style="{ 'font-size': '13px', color: '#000088' }"
          style="width: 100%; font-size: 12px; max-height: 200px"
          border>
          <el-table-column prop="licensePlate" label="车牌号" style="width: 50%" />
          <el-table-column prop="driverName" label="驾驶员" style="width: 50%" />
        </el-table>
      </el-col>
    </el-row>
  </el-watermark>
  <el-watermark
    :font="font_2"
    :gap="[100, 70]"
    :content="waterMark">
    <el-row style="margin-top: 50px; height: 120px;">
      <el-col style="text-align: right" v-show="approveBtnShow">
        <el-button type="plain" text bg @click="doConfirm">
          {{ '同意' }}
        </el-button>
        <el-button type="danger" text bg>
          {{ '退回' }}
        </el-button>
      </el-col>
    </el-row>
  </el-watermark>
</template>

<script setup lang="ts" name="vad">
import { ref, onUnmounted, onMounted, reactive } from 'vue'
import { useUserStore } from '@/store/user'
import axios from 'axios'
import { baseUrlStore } from '@/store/BaseUrl'
import emitter from '@/utils/emitter'
import { format } from 'date-fns'
import { AssignFlowStore, type Flow } from '@/store/AssignFlow'

const font = reactive({
  color: 'rgba(0, 0, 0, .1)'
})

const font_2 = reactive({
  color: 'rgba(255, 0, 0, .1)'
})

var baseUrl = baseUrlStore()
var userStore = useUserStore()
var flowStore = AssignFlowStore()

var axio = axios.create({
  baseURL: baseUrl.host,
  timeout: 3000,
  headers: {
    Authorization: userStore.accessToken
  }
})

interface DispatchOrderEx {
  id: number
  code: string
  contract_code: string
  obligation: string
  serv_princ: string
  type_id: number
  task_type_code: string
  line_id: number
  vehicleuse: number
  service_date: Date | string
  start_time: Date | string
  end_time: Date | string
  dispatcher: string
  serv_desc: string
  status_code: string
  status_value: string
  create_time: Date | string
  creater: string
  task_name: string
  dui_name: string
  oui_name: string
}

var orderRea = reactive<DispatchOrderEx>({
  id: 0,
  code: 'QDLKJ',
  contract_code: '',
  obligation: '',
  serv_princ: '',
  type_id: 0,
  task_type_code: '',
  line_id: 0,
  vehicleuse: 0,
  service_date: '',
  start_time: Date(),
  end_time: Date(),
  dispatcher: '',
  serv_desc: '',
  status_code: '',
  status_value: '',
  create_time: '',
  creater: '',
  task_name: '',
  dui_name: '',
  oui_name: '',
})

interface DispatcherEx {
  account_id:number
  name:string
  fleet_name:string
  group_name:string
  fleet_id:number
  fleet_chief_id:number
  fleet_chief_name:string
  fleet_group_id:number
  group_chief_id:number
  group_chief_name:string
}

var dispatchRea = reactive<DispatcherEx>({
  account_id: 0,
  name:'',
  fleet_name:'',
  group_name:'',
  fleet_id:0,
  fleet_chief_id: 0, 
  fleet_chief_name: '',
  fleet_group_id: 0,
  group_chief_id: 0,
  group_chief_name: '',
})

emitter.on('loadAssign', (code: any) => {
  approveBtnShow.value = true
  getFlowByOrderCode(code)
  loadAssignDocument(code)
})

var tableData = ref(Array())
var currentServiceNo = ref('')
var waterMark = ref(Array())
var approveBtnShow = ref(true)

const loadAssignDocument = (code: string) => {
  currentServiceNo.value = code
  const url = '/scatter/docContent/' + code
  axio
    .post(url)
    .then(function (response) {
      if (response.data.code == 200) {
        let map = response.data.data
        Object.assign(orderRea, map.serviceOrder)
        Object.assign(dispatchRea, map.dispatcherExcessInfo)
        tableData.value = map.tvrList

        if(orderRea.status_code == 'driver') {
          approveBtnShow.value = false
          waterMark.value = ['同意', '已确认']
        }

      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const doConfirm = () => {

  let assignToDrivers = ''
  for(let i = 0; i < tableData.value.length; i ++) {
    let assign = tableData.value[i]
    assignToDrivers += assign.driver
    if(i < tableData.value.length - 1) {
      assignToDrivers += ','
    }
  }

  let len = flowStore.list.length
  let currentStep = flowStore.list[len - 1]
  let flowCode = currentStep.flowCode

  const url = '/scatter/approve/true'
  axio
    .post(url, {currentFlowCode: flowCode, orderCode:currentServiceNo.value, currentStatus:'active', statusCode:'driver', assignTo: assignToDrivers})
    .then(function (response) {
      if (response.data.code == 200) {
        approveBtnShow.value = false
        waterMark.value = ['同意', '已确认']
        getFlowByOrderCode(currentServiceNo.value)
      }
    })
    .catch(function (error) {
      console.log(error)
    })

}

const getFlowByOrderCode = function (orderCode: string) {
    var url = '/scatter/flow/' + orderCode;
    axio.post(url).then(function (response) {
        if (response.data.code == 200) {
            flowStore.list = response.data.data
            emitter.emit('refreshNodeData')
        }
    }).catch(function (error) {
        console.log(error)
    });
}

onMounted(() => {
  
})

onUnmounted(() => {
  emitter.off('loadAssignDocument')
})
</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
