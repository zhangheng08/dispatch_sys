<template>
    <el-dialog v-model="dialogFormVisible" title="创建派车单" width="1200" style="height: 85%; margin-top: 60px;"
        draggable @open="onDialogOpen" @close="onDialogClose" destroy-on-close="true">

        <el-row style="height: 600px;">

            <el-col :span="12">

                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="form-style"
                    :label-position="labelPosition" :size="formSize" status-icon>

                    <el-form-item label="业务单号" prop="serviceNo">
                        <el-input v-model="ruleForm.serviceNo" disabled />
                    </el-form-item>

                    <el-form-item label="客户名称" prop="customerName">
                        <el-input v-model="ruleForm.customerName" :disabled="finishCreated" />
                    </el-form-item>

                    <el-row gutter="10">
                        <el-col :span="12">
                            <el-form-item label="对接代表" prop="obligation">
                                <el-select v-model="ruleForm.obligation" style="width: 250px" :disabled="finishCreated">
                                    <el-option v-for="item in clerks" :key="item.name" :label="item.realName"
                                        :value="item.name" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" style="text-align: right;">
                            <el-form-item label="用车数量" prop="vechicleUse">
                                <el-input-number v-model="ruleForm.vehicleUse" :min="1" :max="1000" style="width: 180px"
                                    :disabled="finishCreated" />
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item label="任务类型" prop="missionType">
                        <el-select v-model="ruleForm.missionType" style="width: 180px" :disabled="finishCreated">
                            <el-option v-for="item in tasks" :key="item.identical" :label="item.taskName"
                                :value="item.taskCode" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="业务日期" required>
                        <el-date-picker v-model="ruleForm.serviceDate" type="date" aria-label="选择业务日期"
                            placeholder="选择业务日期" style="width: 180px;" :disabled="finishCreated" />
                    </el-form-item>

                    <el-form-item label="时间安排" required>
                        <el-time-picker v-model="ruleForm.serviceTime" is-range range-separator="至"
                            start-placeholder="开始时间" end-placeholder="结束时间" :disabled="finishCreated"
                            :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds" />
                    </el-form-item>

                    <el-form-item label="行程安排" prop="desc">
                        <el-input v-model="ruleForm.desc" type="textarea" maxlength="200" show-word-limit
                            :disabled="finishCreated" :disabled-minutes="disabledMinutes"
                            :disabled-seconds="disabledSeconds" />
                    </el-form-item>

                    <!-- <el-form-item label="调度负责人" prop="dispatchObligation">
                        <el-select v-model="ruleForm.dispatchObligation" style="width: 180px" :disabled="finishCreated">
                            <el-option v-for="item in dispatchers" :key="item.name" :label="item.realName"
                                :value="item.name" :disabled="finishCreated" />
                        </el-select>
                    </el-form-item> -->

                    <el-form-item v-show="showSubmit">
                        <el-button type="primary" @click="submitForm(ruleFormRef)"
                            style="margin-top: 50px;">提交</el-button>
                        <el-button @click="resetForm(ruleFormRef)" style="margin-top: 50px;">重置</el-button>
                    </el-form-item>

                </el-form>

                <el-form style="margin-top: 20px;" ref="ruleFormRef2" :model="ruleForm2" :rules="rules2"
                    label-width="auto" class="form-style" :label-position="labelPosition" :size="formSize" status-icon
                    v-show="!showSubmit">

                    <el-row>
                        <el-col :span="3">
                            <div style="height: 35px; display: flex; justify-content: center; align-items: center;">
                                指派给 &nbsp;<el-icon color="#409EFF">
                                    <DArrowRight />
                                </el-icon>&nbsp;</div>
                        </el-col>
                        <el-col :span="21">
                            <el-form-item label="调度负责人" prop="dispatchObligation">
                                <el-select v-model="ruleForm2.dispatchObligation" style="width: 180px"
                                    :disabled="finishAssign">
                                    <el-option v-for="item in dispatchers" :key="item.name" :label="item.realName"
                                        :value="item.name" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>



                    <el-form-item v-show="!showSubmit">
                        <el-button type="primary" @click="confirmAssign(ruleFormRef2)"
                            style="margin-top: 50px;">确认</el-button>
                        <el-button @click="console.log('todo cancel service')"
                            style="margin-top: 50px;">取消业务</el-button>
                    </el-form-item>

                </el-form>

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
import { scatterDispatcherDataStore, type ScatterDispatcher } from '@/store/ScatterDispatcher'
import { ScatterTaskTypeDataStore, type ScatterTaskType } from '@/store/ScatterTaskInfo'
import { ScatteClerkDataStore, type ScatterClerk } from '@/store/ScatterClerk'
import { AssignFlowStore, type Flow } from '@/store/AssignFlow'
import ScatterFlowChart from './ScatterFlowChart.vue'
import VehicleAssignDocument from './VehicleAssignDocument.vue'
import { useUserStore } from '@/store/user'
import axios from 'axios'
import { baseUrlStore } from '@/store/BaseUrl'
var baseUrl = baseUrlStore()

var flowStore = AssignFlowStore()
var userStore = useUserStore()
var token = ref('')

var axio = axios.create({
    baseURL: baseUrl.host,
    timeout: 3000,
    headers: {
        "Authorization": userStore.accessToken
    }
});

var dispaterDataStore = scatterDispatcherDataStore()
var taskTypesStore = ScatterTaskTypeDataStore()
var clerkStore = ScatteClerkDataStore()

const labelPosition = ref<FormProps['labelPosition']>('right')



var isOrderSaved = ref(false)
var showSubmit = ref(true)
var finishCreated = ref(false);
var finishAssign = ref(false)
var dialogFormVisible = ref(false)

var customerName = ref("")
var currentServiceNo = ref('生成中...')
var currentOrderCodeIdentical = ref(-1)
var dispatchers = ref(dispaterDataStore.list)
var tasks = ref(taskTypesStore.list)
var clerks = ref(clerkStore.list)
var stempStatus = ref('创建中')


emitter.on('addDialogSwitch', (value: any) => {
    dialogFormVisible.value = value
})

onMounted(() => {
    token.value = userStore.accessToken
    flowStore.list.push({
        orderCode: '',
        currentStatus: '',
        statusCode: '待创建',
        assignTo: userStore.userName,
        activeTime: new Date(),
        flowCode: ''
    })
})


onUnmounted(() => {
    emitter.off('addDialogSwitch')
})

interface RuleForm {
    userCode: string
    serviceNo: string
    customerName: string
    vehicleUse: number
    obligation: string
    // dispatchObligation: string
    missionType: string
    serviceDate: Date
    serviceTime: Date[]
    delivery: boolean
    location: string
    type: string[]
    resource: string
    desc: string
    creater: string
}

interface RuleForm2 {
    dispatchObligation: string
}

const formSize = ref<ComponentSize>('default')
const today = new Date()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    userCode: userStore.userCode,
    serviceNo: currentServiceNo.value,
    customerName: '',
    vehicleUse: 1,
    obligation: '',
    // dispatchObligation: '',
    missionType: '',
    serviceDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0, 0),
    serviceTime: [new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0,), new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)],
    delivery: false,
    location: '',
    type: [],
    resource: '',
    desc: '',
    creater: userStore.userName
})

const makeRange = (start: number, end: number) => {
    const result: number[] = []
    for (let i = start; i <= end; i++) {
        result.push(i)
    }
    return result
}

const disabledMinutes = () => {
    return makeRange(1, 59)
}
const disabledSeconds = () => {
    return makeRange(1, 59)
}

const ruleFormRef2 = ref<FormInstance>()
const ruleForm2 = reactive<RuleForm2>({
    dispatchObligation: ''
})

watch(() => ruleForm.serviceDate, (newVal, oldVal) => {

    ruleForm.serviceTime = [
        new Date(newVal.getFullYear(), newVal.getMonth(), newVal.getDate(), 9, 0, 0),
        new Date(newVal.getFullYear(), newVal.getMonth(), newVal.getDate(), 23, 59, 59)
    ];

}, { deep: true })

var onDialogOpen = function () {

    if (currentServiceNo.value.length != 0 && currentServiceNo.value != '生成中...') {

        getFlowByOrderCode(currentServiceNo.value)

        axio.post('/scatter/dispatchers')
            .then(function (response) {

                if (response.data.code == 200) {
                    var result = response.data.data
                    for (var i = 0; i < result.length; i++) {
                        var sd: ScatterDispatcher = result[i]
                        dispatchers.value.push(sd)
                    }
                }

            }).catch(function (error) {
                console.log(error)
            });

    } else {
        axio.post('/scatter/dispatchers')
            .then(function (response) {

                if (response.data.code == 200) {
                    var result = response.data.data
                    for (var i = 0; i < result.length; i++) {
                        var sd: ScatterDispatcher = result[i]
                        dispatchers.value.push(sd)
                    }
                }

            }).catch(function (error) {
                console.log(error)
            });

        axio.post('/scatter/taskTypes/2')
            .then(function (response) {
                if (response.data.code == 200) {
                    var result = response.data.data
                    for (var i = 0; i < result.length; i++) {
                        var st: ScatterTaskType = result[i]
                        tasks.value.push(st)
                    }
                }

            }).catch(function (error) {
                console.log(error)
            });

        axio.post('/scatter/clerks')
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

        isOrderSaved.value = false
        axio.post('/scatter/serviceCodeGen', { "prefix": "QDLKJ", "creator": "shaojie" })
            .then(function (response) {
                if (response.data.code == 200) {
                    var result = response.data
                    currentServiceNo.value = result.serviceOrderCode
                    currentOrderCodeIdentical.value = result.data.identical
                    ruleForm.serviceNo = currentServiceNo.value
                }
            }).catch(function (error) {
                console.log(error)
            });
    }


}

var onDialogClose = function () {

    var status = 2
    status = isOrderSaved.value ? 1 : 0;

    axio.post('/scatter/serviceCodeUsage', { "identical": currentOrderCodeIdentical.value, "usageStatus": status })
        .then(function (response) {
            if (response.data.code == 200) {

                var result = response.data
                ruleForm.serviceNo = result.serviceOrderCode;
                currentOrderCodeIdentical.value = result.data.identical

            }
        }).catch(function (error) {
            console.log(error)
        });

    currentServiceNo.value = '生成中...'
    ruleFormRef.value.resetFields()
    isOrderSaved.value = false
    showSubmit.value = true
    finishCreated.value = false
    finishAssign.value = false
    dialogFormVisible.value = false
    clerks.value.length = 0
    tasks.value.length = 0
    dispatchers.value.length = 0
    flowStore.list.length = 0
}

const rules = reactive<FormRules<RuleForm>>({
    serviceNo: [{ required: true, message: '请稍后...', trigger: 'blur' }],
    customerName: [
        { required: true, message: '请输入客户名称', trigger: 'blur' },
        { max: 30, message: '名称长度超过限制', trigger: 'blur' },
    ],
    vehicleUse: [
        { required: true, message: '请输入用车数量', trigger: 'blur' }
    ],
    obligation: [
        {
            required: true,
            message: '请选择负责人',
            trigger: 'change'
        },
    ],
    missionType: [
        {
            required: true,
            message: '请选择任务类型',
            trigger: 'change'
        },
    ],
    serviceDate: [
        {
            required: false,
            type: 'date',
            message: '请选择业务日期',
            trigger: 'change'
        },
    ],
    serviceTime: [
        {
            required: false,
            type: 'date',
            message: '请选择业务日期',
            trigger: 'change'
        },
    ],
    location: [
        {
            required: true,
            message: 'Please select a location',
            trigger: 'change',
        },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    desc: [
        { required: true, message: '请输入行程安排', trigger: 'change' },
    ],
})


const rules2 = reactive<FormRules<RuleForm2>>({
    dispatchObligation: [
        {
            required: true,
            message: '请选择调度负责人',
            trigger: 'change'
        },
    ]
})


const submitForm = async (formEl: FormInstance | undefined) => {

    if (!formEl) return

    await formEl.validate((valid, fields) => {
        if (valid) {
            axio.post('/scatter/createOrder', ruleForm).then(function (response) {
                if (response.data.code == 200) {
                    isOrderSaved.value = true
                    finishCreated.value = true
                    showSubmit.value = false
                    getFlowByOrderCode(ruleForm.serviceNo)
                }
            }).catch(function (error) {
                console.log(error)
            });
        } else {
            console.log('error submit!', fields)
        }
    })
}

const confirmAssign = async (formEl: FormInstance | undefined) => {

    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            axio.post('/scatter/flowSta', { 'orderCode': ruleForm.serviceNo, 'currentStatus': 'active', 'statusCode': 'dispatch', 'assignTo': ruleForm2.dispatchObligation }).then(function (response) {
                if (response.data.code == 200) {
                    flowStore.list = response.data.data
                    emitter.emit('refreshNodeData')
                    finishAssign.value = true
                }
            }).catch(function (error) {
                console.log(error)
            });
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    ruleForm.serviceNo = currentServiceNo.value
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`
}))

const updateFlow = function (statusCode: string, flowStatus: string) {
    axio.post('/scatter/flowSta', { 'orderCode': ruleForm.serviceNo, 'currentStatus': flowStatus, 'statusCode': statusCode, 'assignTo': userStore.userCode }).then(function (response) {
        if (response.data.code == 200) {
            isOrderSaved.value = true
        }
    }).catch(function (error) {
        console.log(error)
    });
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

</script>

<style>
.form-style {
    border: 1px dotted #E5F2FF;
}

#ssitem {
    text-align: right;
    line-height: 40px;
}

/* .demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
} */
</style>