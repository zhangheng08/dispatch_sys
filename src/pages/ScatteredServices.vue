<template>
    <el-card style="height: 100%;" :body-style="{ padding: '6px' }">
        <template #header>
            <PageTop />
        </template>
        <el-table :data="tableData" stripe=true :header-row-style="{ 'font-size': '13px', 'color': '#000088' }"
            style="width:100%; font-size: 12px; height: 550px;" border>
            <el-table-column fixed prop="code" label="编号" width="180" />
            <el-table-column prop="servPrinc" label="服务主体" width="220" />
            <el-table-column prop="obligation" label="业务负责人" width="150" />
            <el-table-column prop="vehicleUse" label="用车数量" width="150" />
            <el-table-column prop="serviceTime" label="业务日期" width="150" />
            <el-table-column prop="dispatcher" label="调度员" width="150" />
            <el-table-column prop="vehicleUse" label="用车数量" width="150" />
            <el-table-column prop="servDesc" label="任务描述" width="220" />
            <el-table-column prop="startTime" label="开始时间" width="150" />
            <el-table-column prop="endTime" label="结束时间" width="150" />
            <el-table-column prop="creator" label="创建人" width="150" />
            <el-table-column prop="creatTime" label="创建时间" width="150" />
            <el-table-column prop="statusCode" label="业务状态" width="120" fixed="right">
                <template #default="scope">
                    <el-tag :type="tagTypeSelector(scope.row.statusCode)" disable-transitions>
                        {{ scope.row.statusValue }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
                <template #default="props">
                    <el-button link type="primary" size="small" @click.prevent="">
                        详情
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
</template>

<script setup lang="ts" name="scattered">
import { reactive, ref, onMounted } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'
import PageTop from '@/components/PageTop.vue';
import AddDialog from '@/components/ScatteredServiceNewDialog.vue'
import { useUserStore } from '@/store/user'
import { dispatchOrderStore , type DispatchOrder} from "@/store/DispatchOrders"

import axios from 'axios'

var userStore = useUserStore()
var orderStore = dispatchOrderStore()

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

var tagTypeSelector = function(statusCode: string) {

    var tagType = 'primary'

    switch(statusCode) {
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

    const pageLoadUrl = '/scatter/list/' + currentPage.value + '/' + pageSize.value

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

</script>

<style scoped>
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>