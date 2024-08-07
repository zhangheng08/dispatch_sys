<template>

    <el-card style="height: 100%; width:100%;">

        <template #header>
            <div class="card-header">
                <span style="font-weight: bold; font-size: 15px;">车辆信息录入</span>&nbsp;&nbsp;<a>数据录入</a>&nbsp;<a>模板下载</a>
            </div>
        </template>

        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="车牌号" prop="license_plate">
                <el-input v-model="ruleForm.license_plate" />
            </el-form-item>
            <el-form-item label="车架号" prop="vin">
                <el-input v-model="ruleForm.vin" />
            </el-form-item>
            <el-form-item label="发动机号" prop="engine_no">
                <el-input v-model="ruleForm.engine_no" />
            </el-form-item>
            <el-form-item label="对应司机" prop="drivers">
                <el-select v-model="ruleForm.drivers" multiple filterable>
                    <el-option v-for="item in driver_options" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="品牌" prop="drivers">
                <el-select v-model="ruleForm.brand" filterable>
                    <el-option label="宇通" value="yutong" />
                    <el-option label="福田" value="futian" />
                </el-select>
            </el-form-item>

            <el-form-item label="Activity count" prop="count">
                <el-select-v2 v-model="ruleForm.count" placeholder="Activity count" :options="options" />
            </el-form-item>
            <el-form-item label="Activity time" required>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker v-model="ruleForm.date1" type="date" aria-label="Pick a date"
                            placeholder="Pick a date" style="width: 100%" />
                    </el-form-item>
                </el-col>
                <el-col class="text-center" :span="2">
                    <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                    <el-form-item prop="date2">
                        <el-time-picker v-model="ruleForm.date2" aria-label="Pick a time" placeholder="Pick a time"
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="Instant delivery" prop="delivery">
                <el-switch v-model="ruleForm.delivery" />
            </el-form-item>
            <el-form-item label="Activity location" prop="location">
                <el-segmented v-model="ruleForm.location" :options="locationOptions" />
            </el-form-item>
            <el-form-item label="Activity type" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox value="Online activities" name="type">
                        Online activities
                    </el-checkbox>
                    <el-checkbox value="Promotion activities" name="type">
                        Promotion activities
                    </el-checkbox>
                    <el-checkbox value="Offline activities" name="type">
                        Offline activities
                    </el-checkbox>
                    <el-checkbox value="Simple brand exposure" name="type">
                        Simple brand exposure
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio value="Sponsorship">Sponsorship</el-radio>
                    <el-radio value="Venue">Venue</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form" prop="desc">
                <el-input v-model="ruleForm.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    Create
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>



    </el-card>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
    license_plate: string
    vin: string
    engine_no: string
    drivers: string
    brand: string

    count: string
    date1: string
    date2: string
    delivery: boolean
    location: string
    type: string[]
    resource: string
    desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    license_plate: '京',
    vin: '',
    engine_no: '',
    drivers: '',
    brand: '',

    count: '',
    date1: '',
    date2: '',
    delivery: false,
    location: '',
    type: [],
    resource: '',
    desc: '',
})

const locationOptions = ['Home', 'Company', 'School']

const rules = reactive<FormRules<RuleForm>>({
    license_plate: [
        { required: true, message: '请录入车牌号', trigger: 'blur' },
        { min: 7, max: 8, message: '请录入正确的车牌号', trigger: 'blur' },
    ],
    vin: [
        {
            required: true,
            message: '请录入车架号',
            trigger: 'blur',
        },
        { min: 7, max: 8, message: '请录入正确的车架号', trigger: 'blur' }
    ],
    engine_no: [
        {
            required: true,
            message: '请录入发动机号',
            trigger: 'blur',
        },
        { min: 7, max: 8, message: '请录入正确的发动机号', trigger: 'blur' }
    ],
    drivers: [
        {
            required: true,
            message: '请至少选择一位驾驶员',
            trigger: 'change',
        },
    ],
    brand: [
        {
            required: true,
            message: '请选择车辆品牌',
            trigger: 'change',
        },
    ],


    count: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'change',
        },
    ],
    date1: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
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
        { required: true, message: 'Please input activity form', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}))

const driver_options = [
    {
        value: '1',
        label: '刘明利',
    },
    {
        value: '2',
        label: '郑先利',
    },
    {
        value: '3',
        label: '王兴',
    },
    {
        value: '4',
        label: '杜维忠',
    },
    {
        value: '5',
        label: '冯鑫',
    },
    {
        value: '6',
        label: '王丽',
    },
]

</script>

<style style="scoped"></style>