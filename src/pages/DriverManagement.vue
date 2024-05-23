<template>
    <div class="card-bg">
            <el-container class="card">
                <el-header style="height: 60px;">
                    <el-row style="height: 100%;">
                        <el-col :span="5" class="top-tool-l">
                            <el-dropdown>
                                <el-button type="primary" size="small"
                                    style="background-color: rgb(238, 237, 237); border-color: rgb(212, 211, 211); color: rgb(86, 86, 86);">
                                    {{ dateType }}<el-icon class="el-icon--right" color="#868686">
                                        <ArrowDown />
                                    </el-icon>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <span style="font-size: 12px;">入职日期</span>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <span style="font-size: 12px;">离职日期</span>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <span style="font-size: 12px;">创建时间</span>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-date-picker style="margin-left: 5px; color: rgb(86, 86, 86);" v-model="value1"
                                type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                size="small" />
                        </el-col>
                        <el-col :span="5" class="top-tool-l">
                            <el-dropdown>
                                <el-button type="primary" size="small"
                                    style="margin-left: 20px; background-color: rgb(238, 237, 237); border-color: rgb(212, 211, 211); color: rgb(86, 86, 86);">
                                    {{ stringType }}<el-icon class="el-icon--right" color="#868686">
                                        <ArrowDown />
                                    </el-icon>
                                </el-button>

                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>
                                            <span style="font-size: 12px;">综合搜索</span>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <span style="font-size: 12px;">姓名</span>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <span style="font-size: 12px;">地址</span>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <span style="font-size: 12px;">手机号</span>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <span style="font-size: 12px;">年龄</span>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <span style="font-size: 12px;">驾龄</span>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-input style="margin-left: 5px;" v-model="inputVal" placeholder="请输入关键字" size="small"
                                clearable />
                        </el-col>
                        <el-col :span="4" class="top-tool-l">
                            <el-button type="primary" :icon="Search" class="btn-sty" size="small"
                                style="margin-left: 20px;" @click="onAddItem">搜索</el-button>
                        </el-col>
                        <el-col :span="10" class="top-tool-r">
                            <el-button type="primary" :icon="Plus" class="btn-sty" size="small"
                                @click="onAddItem">新增记录</el-button>
                            <el-dropdown>
                                <div class="el-dropdown-link">
                                    <el-icon size="large" style="margin-right: 3px;">
                                        <Document />
                                    </el-icon>
                                    <el-button type="default" link class="btn-sty" size="large">导入/导出</el-button>
                                </div>

                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item :icon="Upload"><span
                                                style="font-size: 12px;">导入</span></el-dropdown-item>
                                        <el-dropdown-item :icon="Download"><span
                                                style="font-size: 12px;">导出</span></el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <div class="el-dropdown-link">
                                <el-icon size="large" style="margin-right: 3px; color: rgb(96, 96, 96);">
                                    <Printer />
                                </el-icon>
                                <el-button type="default" link class="btn-sty" size="large">打印</el-button>
                            </div>
                            <div class="el-dropdown-link">
                                <el-icon size="large" style="margin-right: 3px; color: rgb(96, 96, 96);">
                                    <RefreshRight />
                                </el-icon>
                                <el-button type="default" link class="btn-sty" size="large">刷新</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main style="height: 580px;">

                    <el-table :data="tableData" stripe
                        style="width:100%; border: 1px dotted gainsboro; font-size: 12px; max-height: 500px;">
                        <el-table-column fixed prop="name" label="姓名" width="100" />
                        <el-table-column prop="mobile" label="手机号" width="120" />
                        <el-table-column prop="gender" label="性别" width="100" :filters="[
                            { text: '男', value: '男' },
                            { text: '女', value: '女' },
                        ]" :filter-method="filterGender" />
                        <el-table-column prop="age" label="年龄" width="100" sortable />
                        <el-table-column prop="driving_age" label="驾龄" width="100" sortable />
                        <el-table-column prop="idcard" label="身份证" width="150" />
                        <el-table-column prop="city" label="地址" width="150" />
                        <el-table-column prop="driver_license" label="驾驶证" width="100" />
                        <el-table-column prop="no_criminal_checks" label="无犯罪证明" width="100" />
                        <el-table-column prop="road_operation_credential" label="道路运营证" width="100" />
                        <el-table-column prop="emergency_contact" label="紧急联系人" width="120" />
                        <el-table-column prop="joined_date" label="入职日期" width="100" sortable />
                        <el-table-column prop="departure_date" label="离职日期" width="100" sortable />
                        <el-table-column prop="create_date" label="创建日期" width="100" sortable />
                        <el-table-column fixed="right" label="操作" width="100">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click.prevent="">
                                    编辑
                                </el-button>
                                <el-divider style="color: black;" direction="vertical" border-style="dashed" />
                                <el-button link type="danger" size="small" @click.prevent="deleteRow(scope.$index)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-main>
                <el-footer style="height: 60px;" class="footer-align">
                    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :small="small"
                        :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="1000"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </el-footer>
            </el-container>
    </div>
</template>

<script setup lang="ts" name="driver_management">
import { ref } from 'vue'
import dayjs from 'dayjs'

import { driverDataStore, type DriverObj } from '@/store/Driver'

import { ElContainer, ElHeader, ElFooter, ElMain } from 'element-plus';

import {
    Plus,
    Download,
    Printer,
    Document,
    RefreshRight,
    ArrowDown,
    Search,
    Upload
} from '@element-plus/icons-vue'


const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(true)
const background = ref(true)
const disabled = ref(false)
const dateType = ref('创建时间')
const stringType = ref('综合搜索')
const value1 = ref('')
const inputVal = ref('')

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

const driverStore = driverDataStore()

const now = new Date()

let tableData = ref(driverStore.list)

const deleteRow = (index: number) => {
    tableData.value.splice(index, 1)
}

const onAddItem = () => {
    now.setDate(now.getDate() + 1)
    tableData.value.push({
        name: 'new guy',
        mobile: '13439925988',
        gender: '男',
        age: 52,
        city: '北京',
        driving_age: 26,
        idcard: '201675197209160052',
        driver_license: '',
        emergency_contact: '',
        no_criminal_checks: '',
        road_operation_credential: '',
        vaccine_status: '',
        create_date: '2021-01-22',
        joined_date: '2021-01-12'
    })
}

const filterGender = (value: string, row: DriverObj) => {
    return row.gender === value
}
</script>

<style scoped>
.card-bg {
    width: 100%;
}

.card {
    background-color: white;
    border-radius: 5px;
    width: 100%;
}

.top-tool-r {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
}

.top-tool-l {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: left;
}

.btn-sty {
    font-size: 12px;
    margin-right: 15px;
}

.el-dropdown-link {
    font-size: 12px;
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.el-dropdown+.el-dropdown {
    margin-left: 15px;
}

.footer-align {
    display: flex;
    align-items: center;
    justify-content: right;
    cursor: pointer;
}
</style>