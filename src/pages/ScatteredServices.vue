<template>
    <el-card style="height: 100%;" :body-style="{ padding: '6px' }">
        <template #header>
            <PageTop useType="scatteredServices"/>
        </template>
        <el-table :data="tableData" stripe=true :header-row-style="{ 'font-size': '13px', 'color': '#000088' }"
            style="width:100%; font-size: 12px; height: 550px;" border>
            <el-table-column fixed prop="code" label="编号" width="180" />
            <el-table-column prop="serv_princ" label="服务主体" width="220" />
            <el-table-column prop="obligation_name" label="业务负责人" width="150" />
            <el-table-column prop="vehicleuse" label="用车数量" width="150" />
            <el-table-column prop="service_date" label="业务日期" width="150" />
            <el-table-column prop="dispatch_name" label="调度员" width="150" />
            <el-table-column prop="serv_desc" label="任务描述" width="220" />
            <el-table-column prop="start_time" label="开始时间" width="150" />
            <el-table-column prop="end_time" label="结束时间" width="150" />
            <el-table-column prop="creater" label="创建人" width="150" />
            <el-table-column prop="create_time" label="创建时间" width="150" />
            <el-table-column prop="latest_assign_name" label="指派给" width="80" fixed="right"/>
            <el-table-column label="当前状态" width="120" fixed="right">
                <template #default="scope">
                    <el-tag :type="tagTypeSelector(scope.row.status_code)" disable-transitions>
                        {{ scope.row.status_value }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="onTabRightBtnClick(scope.row.code)">
                        {{ (scope.row.flow_code == '0') ? '详情' : '待办' }}
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
    <AddDialog />
    <ApproveDialog />
</template>

<script setup lang="ts" name="scattered">
import { reactive, ref, onMounted } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'
import PageTop from '@/components/PageTop.vue';
import AddDialog from '@/components/ScatteredServiceNewDialog.vue'
import ApproveDialog from '@/components/ScatteredApproveDialog.vue'
import { useUserStore } from '@/store/user'
import { dispatchOrderStore } from "@/store/DispatchOrders"
import { format } from 'date-fns'
import axios from 'axios'
import emitter from '@/utils/emitter'
import { baseUrlStore } from '@/store/BaseUrl'
var baseUrl = baseUrlStore()

interface DispatchOrderVo {
    id: number
    code: string
    contract_code: string
    obligation: string
    serv_princ: string
    type_id: number
    task_type_code: string
    line_id: number
    vehicleuse: number
    service_date: string
    start_time: Date | string
    end_time: Date | string
    dispatcher: string
    serv_desc: string
    status_code: string
    status_value: string
    create_time: Date | string
    creater: string
    dispatch_name: string
    obligation_name: string
    flow_code: string
    latest_assign_name: string
}

var userStore = useUserStore()
var orderStore = dispatchOrderStore()

var axio = axios.create({
    baseURL: baseUrl.host,
    timeout: 3000,
    headers: {
        "Authorization": userStore.accessToken
    }
});


const formLabelWidth = '80px'

let timer: number | undefined

var dialog = ref(false)
var loading = ref(false)
var currentPage = ref(1)
var pageSize = ref(10)

const handleClose = (done: () => void) => {
    if (loading.value) {
        return
    }
    ElMessageBox.confirm('Do you want to submit?')
        .then(() => {
            loading.value = true
            timer = setTimeout(() => {
                done()
                // 动画关闭需要一定的时间
                setTimeout(() => {
                    loading.value = false
                }, 400)
            }, 1000)
        })
        .catch(() => {
            // catch error
        })
}

const cancelForm = () => {
    loading.value = false
    dialog.value = false
    clearTimeout(timer)
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


var tableDataArr = Array()
var tableData = ref(tableDataArr)

onMounted(() => {

    // loadOrderList(1, 10)
    loadOrderListMarked(1, 10)

})

const onPageChange = function (pNum: number, pSize: number) {
    // loadOrderList(pNum, pSize)
    loadOrderListMarked(pNum, pSize)
}

const loadOrderList = function (pNum: number, pSize: number) {

    currentPage.value = pNum
    pageSize.value = pSize

    const pageLoadUrl = '/scatter/list/' + currentPage.value + '/' + pageSize.value

    axio.post(pageLoadUrl)
        .then(function (response) {

            if (response.data.code == 200) {
                let dataList = response.data.data
                for (let i = 0; i < dataList.length; i++) {
                    let item = dataList[i] as DispatchOrderVo
                    item.start_time = format(item.start_time, 'yyyy-MM-dd HH:ss:mm')
                    item.end_time = format(item.end_time, 'yyyy-MM-dd HH:ss:mm')
                    item.create_time = format(item.create_time, 'yyyy-MM-dd HH:ss:mm')
                }
                orderStore.list = dataList
                tableData.value = orderStore.list
            }

        }).catch(function (error) {
            console.log(error)
        });

}

const loadOrderListMarked = function (pNum: number, pSize: number) {

    currentPage.value = pNum
    pageSize.value = pSize

    const pageLoadUrl = '/scatter/listMarked/' + userStore.userCode + '/' + currentPage.value + '/' + pageSize.value

    axio.post(pageLoadUrl)
        .then(function (response) {

            if (response.data.code == 200) {
                let dataList = response.data.data
                for (let i = 0; i < dataList.length; i++) {
                    let item = dataList[i] as DispatchOrderVo
                    item.start_time = format(item.start_time, 'yyyy-MM-dd HH:ss:mm')
                    item.end_time = format(item.end_time, 'yyyy-MM-dd HH:ss:mm')
                    item.create_time = format(item.create_time, 'yyyy-MM-dd HH:ss:mm')
                    if(item.status_code == 'driver') {
                        item.latest_assign_name = '驾驶员'
                    }
                }
                orderStore.list = dataList
                tableData.value = orderStore.list
            }

        }).catch(function (error) {
            console.log(error)
        });
}

const onTabRightBtnClick = function(rowItemCode:string) {
    emitter.emit('setServiceCode', rowItemCode)
}

</script>

<style scoped>
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>