<template>
    <el-dialog v-model="dialogFormVisible" width="1200" style="height: 85%; margin-top: 60px;"
        draggable @open="onDialogOpen" @close="onDialogClose" destroy-on-close="true">

        <el-row style="height: 600px;">

            <el-col :span="12">
                <VehicleAssignDocument />
            </el-col>

            <el-col :span="12">
                <ScatterFlowChart />
            </el-col>

        </el-row>

    </el-dialog>
</template>

<script setup lang="ts" name="ScatteredServiceNewDialog">
import {
    DArrowRight
} from '@element-plus/icons-vue'
import { format } from 'date-fns'
import { ref, onUnmounted, onMounted, reactive, watch } from 'vue'
import type { ComponentSize, FormInstance, FormRules, FormProps } from 'element-plus'
import emitter from '@/utils/emitter'
import { AssignFlowStore, type Flow } from '@/store/AssignFlow'
import ScatterFlowChart from './ScatterFlowChart.vue'
import VehicleAssignDocument from './VehicleAssignDocument.vue'
import { useUserStore } from '@/store/user'
import axios from 'axios'
import { baseUrlStore } from '@/store/BaseUrl'
var baseUrl = baseUrlStore()
var flowStore = AssignFlowStore()
var userStore = useUserStore()
var serviceNo = ref('')
var dialogFormVisible = ref(false)

var axio = axios.create({
    baseURL: baseUrl.host,
    timeout: 3000,
    headers: {
        "Authorization": userStore.accessToken
    }
});


emitter.on("setServiceCode", (code:any) => {
    serviceNo.value = code
    dialogFormVisible.value = true
})

var onDialogOpen = function () {

    // getFlowByOrderCode(serviceNo.value)
    emitter.emit("loadAssign", serviceNo.value)

}

var onDialogClose = function () {


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

onUnmounted(() => {
    emitter.off("setServiceCode")
})

</script>

<style>
.form-style {
    border: 1px dotted #E5F2FF;
}

#ssitem {
    text-align: right;
    line-height: 40px;
}
</style>