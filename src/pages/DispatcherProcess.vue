<template>
    <el-card style="height: 100%;" :body-style="{ padding: '6px' }">
        <template #header>
            <PageTop />
        </template>

        <el-table :data="tableData" stripe :header-row-style="{ 'font-size': '13px', 'color': '#000088' }"
            style="width:100%; font-size: 12px; height: 550px;" border>
            <el-table-column fixed prop="code" label="编号" width="180" />
            <el-table-column prop="serv_princ" label="服务主体" width="220" />
            <el-table-column prop="obligation" label="业务负责人" width="150" />
            <el-table-column prop="type_id" label="订单类型" width="150" />
            <el-table-column prop="service_time" label="业务日期" width="150" />
            <el-table-column prop="dispatcher" label="调度员" width="150" />
            <el-table-column prop="vehicleuse" label="用车数量" width="150" />
            <el-table-column prop="serv_desc" label="任务描述" width="220" />
            <el-table-column prop="start_time" label="开始时间" width="150" />
            <el-table-column prop="end_time" label="结束时间" width="150" />
            <el-table-column prop="creator" label="创建人" width="150" />
            <el-table-column prop="creat_time" label="创建时间" width="150" />
            <el-table-column prop="status_code" label="业务状态" width="120" fixed="right">
                <template #default="scope">
                    <el-tag :type="tagTypeSelector(scope.row.status_code)" disable-transitions>
                        {{ scope.row.status_value }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toShowDrawer(scope.row)">
                        去处理
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <el-row>
                <el-col :span="8">
                </el-col>
                <el-col :span="8">
                    <el-pagination background layout="prev, pager, next" :total="1000" @change="onPageChange" />
                </el-col>
                <el-col :span="8">
                </el-col>
            </el-row>
        </template>

    </el-card>

    <el-drawer v-model="showDrawer" :with-header="false" :before-close="handleClose" direction="rtl" size="80%"
        @opened="onDrawerOpened">
        <el-card style="height: 100%; border: 1px dashed pink;">
            <template #header>
                <el-row>
                    <el-col :span="5">
                        业务单号：{{ orderCode }}
                    </el-col>
                    <el-col :span="11">
                        <el-scrollbar>
                            <div style="display: flex; width: 100%; height: 100%;">
                                <div v-for="item in multipleSelection" :key="item.driverAccountId"
                                    style="padding: 2px; min-width: 180px;">
                                    <el-tag effect="dark">{{ item.licensePlate }}</el-tag>
                                    &nbsp;
                                    <el-tag effect="light" round>{{ item.driverName }}</el-tag>
                                    <el-divider direction="vertical" border-style="solid" />
                                </div>
                            </div>
                        </el-scrollbar>
                    </el-col>
                    <el-col :span="4">
                        <div style="display: flex; align-items: center; justify-items: flex-start;">
                            <span style="font-size: 14px;">审批人:</span>&nbsp;&nbsp;&nbsp;
                            <el-select v-model="approve" style="width: 150px">
                                <el-option v-for="item in clerks" :key="item.name" :label="item.realName"
                                    :value="item.name" />
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="confirmDispatchToDriver">确认调度</el-button>
                    </el-col>
                </el-row>
                <el-descriptions class="margin-top" :column="5" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <user />
                                </el-icon>
                                客户名称
                            </div>
                        </template>
                        {{ selectedOrderRea.serv_princ }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <iphone />
                                </el-icon>
                                对接人
                            </div>
                        </template>
                        {{ selectedOrderRea.obligation }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <location />
                                </el-icon>
                                任务类型
                            </div>
                        </template>
                        {{ selectedOrderRea.task_type_code }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <location />
                                </el-icon>
                                业务日期
                            </div>
                        </template>
                        {{ format(selectedOrderRea.start_time, 'yyyy-MM-dd') }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <location />
                                </el-icon>
                                用车数量
                            </div>
                        </template>
                        {{ selectedOrderRea.vehicleuse }} 辆
                    </el-descriptions-item>


                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <tickets />
                                </el-icon>
                                时间安排
                            </div>
                        </template>
                        {{ format(selectedOrderRea.start_time, 'HH:00') }} 至 {{ format(selectedOrderRea.end_time,
        'HH:00')
                        }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <tickets />
                                </el-icon>
                                调度员
                            </div>
                        </template>
                        {{ selectedOrderRea.dispatcher }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <tickets />
                                </el-icon>
                                业务状态
                            </div>
                        </template>
                        {{ selectedOrderRea.status_value }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <office-building />
                                </el-icon>
                                行程安排
                            </div>
                        </template>
                        {{ selectedOrderRea.serv_desc }}
                    </el-descriptions-item>
                </el-descriptions>
            </template>

            <el-row>
                <el-col :span="8">
                    <el-table :data="crewData" stripe :header-row-style="{ 'font-size': '13px', 'color': '#000088' }"
                        style="width:100%; font-size: 12px; height: 550px; cursor: pointer;" @row-click="onRowClick"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="licensePlate" label="车牌号" width="180" />
                        <el-table-column prop="driverName" label="驾驶员" width="180" />
                    </el-table>
                </el-col>
                <el-col :span="16">
                    <SchedulingDetail :licensePlate="rowClick" />
                </el-col>
            </el-row>

        </el-card>
    </el-drawer>

</template>

<script setup lang="ts" name="scattered">
import { h, reactive, ref, onMounted } from 'vue'
import { ElDrawer, ElMessageBox, ElMessage, ElNotification } from 'element-plus'
import PageTop from '@/components/PageTop.vue';
import SchedulingDetail from '@/components/SchedulingDetail.vue'
import { useUserStore } from '@/store/user'
import { dispatchOrderStore, type DispatchOrder } from "@/store/DispatchOrders"
import { ScatteClerkDataStore, type ScatterClerk } from '@/store/ScatterClerk'
import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User
} from '@element-plus/icons-vue'

import axios from 'axios'
import { format } from 'date-fns'
import emitter from '@/utils/emitter';

var userStore = useUserStore()
var orderStore = dispatchOrderStore()
var clerkStore = ScatteClerkDataStore()
let clerks = ref(clerkStore.list)

var axio = axios.create({
    baseURL: 'http://localhost:8088/API',
    timeout: 3000,
    headers: {
        "Authorization": userStore.accessToken
    }
});


const formLabelWidth = '80px'

let timer: number | undefined

var dialog = ref(false)
var loading = ref(false)
var showDrawer = ref(false)
var currentPage = ref(1)
var pageSize = ref(10)
var orderCode = ref('')
var rowClick = ref('')
var approve = ref('')

var selectedOrder: DispatchOrder = {
    id: 0,
    code: '',
    contract_code: '',
    obligation: '',
    serv_princ: '',
    type_id: 0,
    task_type_code: '',
    line_id: 0,
    vehicleuse: 0,
    status_code: '',
    status_value: '',
    start_time: new Date(),
    end_time: new Date(),
    dispatcher: '',
    serv_desc: '',
    create_time: new Date(),
    flow_code: ''
}

var selectedOrderRea = reactive(selectedOrder)

var toShowDrawer = function (row: any) {
    var order: DispatchOrder = row
    orderCode.value = order.code
    showDrawer.value = true
    selectedOrderRea = order
    Object.assign(selectedOrderRea, order)
}

import { ElTable } from 'element-plus'

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<crew[]>([])

interface crew {
    licensePlate: string,
    driverName: string,
    driverAccountId: number
}

var crewList: crew[] = []
var crewData = ref(crewList)

const toggleSelection = (rows?: crew[]) => {
    if (rows) {
        rows.forEach((row) => {
            multipleTableRef.value!.toggleRowSelection(row, undefined)
        })
    } else {
        multipleTableRef.value!.clearSelection()
    }
}

const handleSelectionChange = (val: crew[]) => {
    multipleSelection.value = val
    console.log(multipleSelection.value.length, '---', selectedOrderRea.vehicleuse)
    if (multipleSelection.value.length > selectedOrderRea.vehicleuse) {
        hint_1()
    }
}

const hint_1 = () => {
    ElNotification({
        title: '提示',
        position: 'bottom-left',
        message: h('i', { style: 'color: red' }, '超过订单用车数量！')
    })
}

const hint_2 = () => {
    ElNotification({
        title: '提示',
        position: 'bottom-right',
        message: h('i', { style: 'color: red' }, '不满足订单用车数量！')
    })
}

const openVn = () => {
    ElMessage({
        message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
            h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, 'VNode'),
        ]),
    })
}

const confirmDispatchToDriver = function () {
    if (multipleSelection.value.length != selectedOrderRea.vehicleuse) {
        hint_2()
    } else {

        const pageLoadUrl = '/dispatch/do'

        axio.post(pageLoadUrl, {'approve': approve.value, 'serviceCode': selectedOrderRea.code, 'flowCode': selectedOrderRea.flow_code, 'vehicleSelection': multipleSelection.value })
            .then(function (response) {

                if (response.data.code == 200) {
                    console.log(response.data.data)
                }

            }).catch(function (error) {
                console.log(error)
            });

        loading.value = true
        showDrawer.value = false
        loading.value = false
    }
}

const handleClose = function(done: () => void) {
    if (!loading.value) {
        ElMessageBox.confirm('调度未完成，确认离开吗?')
            .then(() => {
                loading.value = true
                timer = setTimeout(() => {
                    done()
                    setTimeout(() => {
                        loading.value = false
                        clerks.value.length = 0
                    }, 400)
                }, 400)
            }).catch(() => {
                // catch error
            })
    } else {
        timer = setTimeout(() => {
            done()
            setTimeout(() => {
                loading.value = false
                clerks.value.length = 0
            }, 400)
        }, 400)
    }
}


var tableDataArr: DispatchOrder[] = []
var tableData = ref(tableDataArr)

onMounted(() => {

    loadOrderList(1, 10)

})

const onPageChange = function (pNum: number, pSize: number) {
    loadOrderList(pNum, pSize)
}

const loadOrderList = function (pNum: number, pSize: number) {

    currentPage.value = pNum
    pageSize.value = pSize

    const pageLoadUrl = '/dispatch/activeList/' + userStore.userCode

    axio.post(pageLoadUrl)
        .then(function (response) {

            if (response.data.code == 200) {
                console.log(response.data.data)
                orderStore.list = response.data.data
                tableData.value = orderStore.list
            }

        }).catch(function (error) {
            console.log(error)
        });

}

var tagTypeSelector = function (statusCode: string) {

    var tagType = 'primary'

    switch (statusCode) {
        case 'created': {
            tagType = 'primary'
            break
        }
        case 'dispatch':
        case 'manager':
        case 'driver':
        case 'appeal': {
            tagType = 'warning'
            break
        }
        case 'finished':
        case 'effictived': {
            tagType = 'success'
            break
        }
        case 'closed': {
            tagType = 'info'
            break
        }
    }

    return tagType
}


var onDrawerOpened = function () {

    const pageLoadUrl = '/dispatch/groupCrew/' + userStore.userCode

    axio.post(pageLoadUrl)
        .then(function (response) {

            if (response.data.code == 200) {
                crewData.value = response.data.data
            }

        }).catch(function (error) {
            console.log(error)
        });

    axio.post('/dispatch/approve')
        .then(function (response) {
            if (response.data.code == 200) {
                var result = response.data.data
                for (var i = 0; i < result.length; i++) {
                    var sk: ScatterClerk = result[i]
                    clerks.value.push(sk)
                }
            }

        }).catch(function (error) {
            console.log(error)
        });

}

const onRowClick = function (row: any, col: any, event: Event) {

    rowClick.value = row.licensePlate;

    const sh = Number(format(selectedOrderRea.start_time, 'H'))
    const eh = Number(format(selectedOrderRea.end_time, 'H'))

    emitter.emit('sendLicensePlate', ({ 'value': rowClick.value, 'startH': sh, 'endH': eh }))

}


</script>

<style scoped>
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

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