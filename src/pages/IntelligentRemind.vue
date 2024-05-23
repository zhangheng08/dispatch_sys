<template>

    <el-dialog v-model="dialogTableVisible" width="70%" :show-close="true" close-on-click-modal="false" draggable
        style="min-width: 500px; background-color: gainsboro;">

        <el-card>

            <el-row>
                <el-col :span="24">
                    <span>服务主体信息：</span>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8">
                    <span>甲方名称：</span><el-input style="width: 240px" placeholder="Please input" />
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8">
                    <span>甲方电话：</span><el-input style="width: 240px" placeholder="Please input" />
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8">
                    <span>甲方联系人：</span><el-input style="width: 240px" placeholder="Please input" />
                </el-col>
                <el-col :span="24">
                    <span>合同信息：</span>
                    <span>是否已签署合同</span>
                    &nbsp;
                    <el-switch
                        v-model="value3"
                        inline-prompt
                        active-text="是"
                        inactive-text="否"
                    />
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="8">
                    <span>合同编号：</span><el-input style="width: 240px" placeholder="Please input" />
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="10">
                    <span>合同时效：</span>
                    <el-date-picker style="color: rgb(86, 86, 86);" v-model="value1" type="daterange"
                        range-separator="至" start-placeholder="起始日期" end-placeholder="截止日期" />
                </el-col>

                <el-col :xs="24" :sm="24" :md="24" :lg="6">

                    <el-dropdown>
                        <div class="el-dropdown-link">
                            <el-icon size="large" style="margin-right: 3px;">
                                <Document />
                            </el-icon>
                            <el-button type="default" link class="btn-sty" size="large">合同导入/导出</el-button>
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

                </el-col>

                <el-col :span="24">
                    <span>本方信息：</span>
                </el-col>




            </el-row>

        </el-card>


    </el-dialog>

    <el-scrollbar>
        <el-card style="height: 100%;">
            <el-row style="height: 100%; margin-bottom: 35px;">
                <el-col :span="5" class="top-tool-l">
                    <el-dropdown>
                        <el-button type="primary" size="small"
                            style="background-color: rgb(238, 237, 237); border-color: rgb(212, 211, 211); color: rgb(86, 86, 86);">
                            {{ '创建时间' }}<el-icon class="el-icon--right" color="#868686">
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
                    <el-date-picker style="margin-left: 5px; color: rgb(86, 86, 86);" v-model="value1" type="daterange"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" />
                </el-col>
                <el-col :span="5" class="top-tool-l">
                    <el-dropdown>
                        <el-button type="primary" size="small"
                            style="margin-left: 20px; background-color: rgb(238, 237, 237); border-color: rgb(212, 211, 211); color: rgb(86, 86, 86);">
                            {{ "综合搜索" }}<el-icon class="el-icon--right" color="#868686">
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
                        style="margin-left: 20px;">搜索</el-button>
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

            <el-row class="con">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">

                    <el-table :data="tableData" stripe border
                        style="width:100%; font-size: 12px; max-height: max-content;">
                        <el-table-column fixed type="expand">
                            <template #default="props">
                                <div
                                    style="width: 100%; height: fit-content; background-color: rgb(245,247,250); padding: 10px;">
                                    <el-row :gutter="10">
                                        <el-col :xs="24" :sm="24" :md="24" :lg="12" style="margin-bottom: 10px;">
                                            <el-card style="width: fit-content; height: fit-content;">
                                                <p style="font-size: 15px; font-weight: bold; ">甲方：国家药品监督管理局药品审评中心</p>
                                                <p style="font-size: 13px; margin-top: 8px;">地址：北京市北京经济技术开发区广德大街22号2区1号楼
                                                </p>
                                                <p style="font-size: 13px; margin-top: 8px;">联系人：陈旭明</p>
                                                <p style="font-size: 13px; margin-top: 8px;">电话：13520008152</p>
                                                <p style="font-size: 13px; margin-top: 8px;">电子邮件：chenxm@cde.org.cn</p>
                                            </el-card>
                                        </el-col>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="12">
                                            dfdfdfdf
                                        </el-col>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="5">
                                            <el-card :bodyStyle="{ padding: '10px' }"
                                                style="min-height: 180px; min-width: 300px; width:100%; height: 400px;">

                                                <el-calendar ref="calendar" v-model="dateVal" style="height: 400px;">
                                                    <template #header="{ date }">
                                                        <span style="font-size: 15px;">{{ date }}</span>
                                                        <el-button-group>
                                                            <el-button size="small" @click="selectDate('prev-month')">
                                                                < </el-button>
                                                                    <el-button size="small"
                                                                        @click="selectDate('today')">今天</el-button>
                                                                    <el-button size="small"
                                                                        @click="selectDate('next-month')">
                                                                        >
                                                                    </el-button>
                                                        </el-button-group>
                                                    </template>
                                                    <template #date-cell="{ data }">
                                                        <span :class="data.isSelected ? 'is-selected' : ''"
                                                            style="font-size: 13px;">
                                                            {{ data.day.split('-').slice(2).join('-') }}
                                                            {{ data.isSelected ? '✔️' : '' }}
                                                        </span>
                                                    </template>
                                                </el-calendar>
                                            </el-card>
                                        </el-col>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="11">
                                            <el-card :bodyStyle="{ padding: '10px' }"
                                                style="min-height: 180px; min-width: 300px; width:100%; height: 400px;">
                                                <!-- <template #header>
                                                    <div style="height: 10px; background-color: pink;">
                                                        <span style="line-height: 10px; text-align: center; font-size: 13px; font-weight: bold;">班次信息</span>
                                                    </div>
                                                </template> -->
                                                <el-tabs type="border-card" class="demo-tabs">
                                                    <el-tab-pane>
                                                        <template #label>
                                                            <span class="custom-tabs-label">
                                                                <el-icon>
                                                                    <Calendar />
                                                                </el-icon>
                                                                <span>班次</span>
                                                            </span>
                                                        </template>
                                                        <el-collapse accordion
                                                            style="max-height: 300px; overflow-y: scroll;">
                                                            <el-collapse-item name="1">
                                                                <template #title>
                                                                    <el-text
                                                                        style=" font-size: 14px; font-weight: bold;">G001
                                                                        公司方向</el-text>
                                                                    &nbsp;&nbsp;
                                                                    <el-tag type="primary" effect="dark">
                                                                        京B00001254
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-tag type="primary">
                                                                        起点：天宫院地铁站
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-tag type="success">
                                                                        发车时间：早 7:00
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-icon class="header-icon">
                                                                        <info-filled />
                                                                    </el-icon>
                                                                </template>

                                                                <el-table stripe border highlight-current-row
                                                                    :data="subTableData"
                                                                    style="font-size: 12.5px; width:fit-content;"
                                                                    height="fit-content">

                                                                    <el-table-column prop="station_u" label="车站"
                                                                        width="180" />

                                                                    <el-table-column label="到达时间" prop="arrive_time" />

                                                                </el-table>

                                                            </el-collapse-item>


                                                            <el-collapse-item name="2">
                                                                <template #title>
                                                                    <el-text
                                                                        style=" font-size: 14px; font-weight: bold;">G001
                                                                        公司方向</el-text>
                                                                    &nbsp;&nbsp;
                                                                    <el-tag type="primary" effect="dark">
                                                                        京B00005877
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-tag type="primary">
                                                                        起点：天宫院地铁站
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-tag type="success">
                                                                        发车时间：早 7:40
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-icon class="header-icon">
                                                                        <info-filled />
                                                                    </el-icon>
                                                                </template>

                                                                <el-table stripe border highlight-current-row
                                                                    :data="subTableData"
                                                                    style="font-size: 12.5px; width:fit-content;"
                                                                    height="fit-content">

                                                                    <el-table-column prop="station_u" label="车站"
                                                                        width="180" />

                                                                    <el-table-column label="到达时间" prop="arrive_time" />

                                                                </el-table>

                                                            </el-collapse-item>

                                                            <el-collapse-item name="3">
                                                                <template #title>
                                                                    <el-text
                                                                        style=" font-size: 14px; font-weight: bold;">T001
                                                                        天宫院方向</el-text>
                                                                    &nbsp;&nbsp;
                                                                    <el-tag type="primary" effect="dark">
                                                                        京B00005561
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-tag type="primary">
                                                                        起点：公司总部
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-tag type="success">
                                                                        发车时间：晚 6:10
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-icon class="header-icon">
                                                                        <info-filled />
                                                                    </el-icon>
                                                                </template>

                                                                <el-table stripe border highlight-current-row
                                                                    :data="subTableData"
                                                                    style="font-size: 12.5px; width:fit-content;"
                                                                    height="fit-content">

                                                                    <el-table-column prop="station_u" label="车站"
                                                                        width="180" />

                                                                    <el-table-column label="到达时间" prop="arrive_time" />

                                                                </el-table>

                                                            </el-collapse-item>

                                                            <el-collapse-item name="4">
                                                                <template #title>
                                                                    <el-text
                                                                        style=" font-size: 14px; font-weight: bold;">L001
                                                                        立水桥方向</el-text>
                                                                    &nbsp;&nbsp;
                                                                    <el-tag type="primary" effect="dark">
                                                                        京B00005091
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-tag type="primary">
                                                                        起点：公司总部
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-tag type="success">
                                                                        发车时间：晚 6:10
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-icon class="header-icon">
                                                                        <info-filled />
                                                                    </el-icon>
                                                                </template>

                                                                <el-table stripe border highlight-current-row
                                                                    :data="subTableData"
                                                                    style="font-size: 12.5px; width:fit-content;"
                                                                    height="fit-content">

                                                                    <el-table-column prop="station_u" label="车站"
                                                                        width="180" />

                                                                    <el-table-column label="到达时间" prop="arrive_time" />

                                                                </el-table>

                                                            </el-collapse-item>

                                                            <el-collapse-item name="5">
                                                                <template #title>
                                                                    <el-text
                                                                        style=" font-size: 14px; font-weight: bold;">T001
                                                                        天宫院方向</el-text>
                                                                    &nbsp;&nbsp;
                                                                    <el-tag type="primary" effect="dark">
                                                                        京B00008741
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-tag type="primary">
                                                                        起点：公司总部
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-tag type="success">
                                                                        发车时间：晚 7:10
                                                                    </el-tag>
                                                                    &nbsp;
                                                                    <el-icon class="header-icon">
                                                                        <info-filled />
                                                                    </el-icon>
                                                                </template>

                                                                <el-table stripe border highlight-current-row
                                                                    :data="subTableData"
                                                                    style="font-size: 12.5px; width:fit-content;"
                                                                    height="fit-content">

                                                                    <el-table-column prop="station_u" label="车站"
                                                                        width="180" />

                                                                    <el-table-column label="到达时间" prop="arrive_time" />

                                                                </el-table>

                                                            </el-collapse-item>

                                                        </el-collapse>
                                                    </el-tab-pane>
                                                    <el-tab-pane label="运营状态">

                                                        <el-steps style="max-width: 600px" :space="200" :active="1"
                                                            finish-status="success">
                                                            <el-step title="Done" />
                                                            <el-step title="Processing" />
                                                            <el-step title="Step 3" />
                                                        </el-steps>

                                                    </el-tab-pane>
                                                </el-tabs>
                                            </el-card>
                                        </el-col>
                                        <el-col :xs="24" :sm="24" :md="24" :lg="8">
                                            <el-card :body-style="{ padding: '0px' }"
                                                style="width: 400px; height: 400px;">
                                                <BMap />
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column fixed prop="code" label="编号" width="100" />
                        <el-table-column prop="miss" label="服务主体" width="220" />
                        <el-table-column prop="crter" label="甲方联系人" width="150" />
                        <el-table-column prop="line" label="合同号" width="150" />
                        <el-table-column prop="start" label="生效日期" width="150" />
                        <el-table-column prop="end" label="失效日期" width="150" />
                        <el-table-column prop="stats" label="状态" width="150" />
                        <el-table-column prop="dispr" label="调度员" width="150" />
                        <el-table-column prop="fleet" label="车队" width="150" />
                        <el-table-column fixed="right" label="操作" width="150">
                            <template #default="props">
                                <el-button link type="primary" size="small" @click.prevent="">
                                    详情
                                </el-button>
                                <el-divider style="color: black;" direction="vertical" border-style="dashed" />
                                <el-button link type="primary" size="small" @click.prevent="">
                                    编辑
                                </el-button>
                                <el-divider style="color: black;" direction="vertical" border-style="dashed" />
                                <el-button link type="danger" size="small" @click.prevent="">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-card>
    </el-scrollbar>
</template>

<script setup lang="ts" name="intelligent_remind">

import { ref, onMounted } from 'vue'

// import fs from 'fs'

import axios from "axios"

import AMap from '../components/AMap.vue'

import BMap from '../components/BMap.vue'

import type { CalendarDateType, CalendarInstance } from 'element-plus'

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

const dateVal = ref(new Date())
const calendar = ref<CalendarInstance>()
const inputVal = ref('')
const value1 = ref('')
const dialogTableVisible = ref(false)
const value3 = ref(false)

const selectDate = (val: CalendarDateType) => {
    if (!calendar.value) return
    calendar.value.selectDate(val)
}

const tableData = ref([{
    code: '000001',
    miss: '国家药品监督管理局药品评审中心',
    line: 'HPB0000010121',
    type: '固定班线',
    start: '2024-1-21',
    end: '2025-1-22',
    stats: '待调度员确认',
    fleet: 'CD0001',
    crter: '杜国功/13639586533',
    dispr: '王志勇'
}, {
    code: '000002',
    miss: '腾讯科技（北京）有限公司',
    line: 'HPB0000010331',
    type: '固定班线',
    start: '2023-10-21',
    end: '2025-10-22',
    stats: '待调度员确认',
    fleet: 'CD0003',
    crter: '李杰/13386542233',
    dispr: '王志勇'
}])

const subTableData = ref([{
    station_u: '天宫院地铁站',
    arrive_time: '7:00',
}, {
    station_u: '高米店北地铁站',
    arrive_time: '7:15',
}, {
    station_u: '角门西地铁站',
    arrive_time: '7:45',
}, {
    station_u: '公司',
    arrive_time: '8:20',
}])

const props = ref({ a: 'ss' })

onMounted(() => {

    //f1('2024-4-12')

})

function f1(dataStr: string) {

    const response = axios.get('http://v.juhe.cn/calendar/day?date=' + dataStr + '&key=5a73bc6f3586564eadbc9bf7c3a7cfea', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Credentials': true,
            // 'Access-Control-Allow-Origin':'http://v.juhe.cn/calendar/day',
            // 'Origin': 'http://localhost:5173',
            // 'Referer': 'http://v.juhe.cn/calendar/day'
        }
    })

    console.log(response);

}

const onAddItem = () => {
    dialogTableVisible.value = true
}

</script>

<style scoped>
.con {
    width: 100%;
    height: 100%;
}

:deep(.el-calendar-table .el-calendar-day) {
    height: 45px;
    text-align: left;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
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
</style>