<template>

    <el-dialog v-model="dialogTableVisible" width="60%" :show-close="true" close-on-click-modal="false" draggable
        style="min-width: 800px;">
        <el-row :gutter="10">

            <el-col :xs="24" :sm="24" :md="24" :lg="8" style="margin-bottom: 10px; height: fit-content;">
                <span class="dia-inp" style="color: red">*</span>
                <span class="dia-inp">服务方：</span>
                <el-select v-model="selectionVal" placeholder="选择运营服务方" style="width: 240px;">
                    <el-option-group v-for="group in service_info" :key="group.label" :label="group.label">
                        <el-option style="font-size: 12px;" v-for="item in group.options" :key="item.value"
                            :label="item.label" :value="item.value" />
                    </el-option-group>
                </el-select>

            </el-col>

            <el-col :xs="24" :sm="24" :md="24" :lg="8" style="margin-bottom: 10px; height:fit-content;">
                <!-- <span class="dia-inp" style="color: red">*</span>
                <span class="dia-inp">班次名称：</span>
                <el-input v-model="inputClassName" style="width: 240px;" placeholder="输入班次名称" clearable /> -->
            </el-col>

            <el-col :xs="24" :sm="24" :md="24" :lg="8" style="margin-bottom: 10px;"></el-col>

            <el-col :span="24" style="margin-bottom: 10px;">
                <span class="dia-inp" style="color: red">*</span>
                <span class="dia-inp">值班车辆：</span>
                <el-tag type="primary" style="margin-right: 10px; width: 150px;">
                    <span style="font-weight: bold; font-size: 13px;">京B 00001254</span> -
                    <span style="font-weight: bold; font-size: 13px; color:royalblue">赵成利</span>
                </el-tag>
                <el-button type="primary" size="small">选择</el-button>
            </el-col>
            <el-col :span="24" style="margin-bottom: 10px;">
                <span class="dia-inp" style="color: red">*</span>
                <span class="dia-inp">值班时段：</span>
                <!-- <el-button type="primary" size="small">添加</el-button> -->
            </el-col>
            <el-col :span="24" style="margin-bottom: 10px; background-color: aliceblue; height: 180px; padding: 15px;">
                <el-row style="width: 100%; border: 1px solid pink;">
                    <el-col :span="2">
                        <ul>
                            <li class="tm-rg">00:00</li>
                            <li class="tm-rg">~</li>
                            <li class="tm-rg">12:00</li>
                        </ul>
                    </el-col>
                    <el-col :span="22">
                        <el-row :gutter="2">
                            <el-col :span="2">
                                <p class="tm-sep">1</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">2</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">3</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">4</p>
                                <el-progress v-if="roate1 === true" style="transform: rotate(180deg);"
                                    :show-text="false" :text-inside="false" :stroke-width="26" :percentage="20"
                                    striped status="exception"/>
                                <el-progress v-else :text-inside="false" :show-text="false" :stroke-width="26"
                                    :percentage="80" striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">5</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26"
                                    :percentage="100" striped status="exception"/>
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">6</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="60"
                                    striped status="exception"/>
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">7</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">8</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="100"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">9</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="100"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">10</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="100"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">11</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="100"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">12</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="100"
                                    striped />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="2">
                        <ul>
                            <li class="tm-rg">12:00</li>
                            <li class="tm-rg">~</li>
                            <li class="tm-rg">23:00</li>
                        </ul>
                    </el-col>
                    <el-col :span="22">
                        <el-row :gutter="2">
                            <el-col :span="2">
                                <p class="tm-sep">13</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">14</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">15</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">16</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">17</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">18</p>
                                <el-progress v-if="roate1 === true" style="transform: rotate(180deg);"
                                    :show-text="false" :text-inside="false" :stroke-width="26" :percentage="40"
                                    striped />
                                <el-progress v-else :text-inside="false" :show-text="false" :stroke-width="26"
                                    :percentage="0" striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">19</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="100"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">20</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="63"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">21</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="100"
                                    striped status="exception"/>
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">22</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="100"
                                    striped status="exception"/>
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">23</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                            <el-col :span="2">
                                <p class="tm-sep">0</p>
                                <el-progress :text-inside="false" :show-text="false" :stroke-width="26" :percentage="0"
                                    striped />
                            </el-col>
                        </el-row>
                    </el-col>

                </el-row>
            </el-col>

            <el-col :span="24" style="margin-bottom: 10px; background-color: aliceblue; padding: 15px;">

                <el-row :gutter="5">

                    <el-col :span="8">

                        <el-card :body-style="{ padding: '5px' }">
                            <template #header>

                                <el-row>

                                    <el-col :span="5">
                                        <div class="c-day">
                                            <span>{{ tdy }}</span>
                                        </div>
                                    </el-col>

                                    <el-col :span="19">
                                        <div class="c-w">
                                            <p>{{ '甲辰年 二月廿三 ' }}</p>
                                            <p>{{ tdw }}</p>
                                        </div>
                                    </el-col>
                                </el-row>

                            </template>

                            <el-row>

                                <el-col :span="24">
                                    <div class="itm-bc">
                                        <span>
                                            添加班次
                                        </span>
                                        &nbsp;
                                        <el-icon color="#ffffff">
                                            <Plus />
                                        </el-icon>
                                    </div>
                                </el-col>

                            </el-row>

                            <el-row>

                                <el-col :span="24">
                                    <div class="itm-bc">
                                        <span>{{ "第一班 （7:00-9:00）" }}</span>
                                    </div>
                                </el-col>

                                <el-col :span="24">
                                    <ul>
                                        <li>已生效</li>
                                    </ul>
                                </el-col>

                            </el-row>

                            <el-row>

                                <el-col :span="24">
                                    <div class="itm-bc">
                                        <span>{{ "第二班 （9:00-12:00）" }}</span>
                                    </div>
                                </el-col>

                                <el-col :span="24">
                                    <ul>
                                        <li>已生效</li>
                                    </ul>
                                </el-col>

                            </el-row>

                            <el-row>

                                <el-col :span="24">
                                    <div class="itm-bc">
                                        <span>{{ "第三班 （17:40-19:40）" }}</span>
                                    </div>
                                </el-col>

                                <el-col :span="24">
                                    <ul>
                                        <li>已生效</li>
                                    </ul>
                                </el-col>

                            </el-row>

                            <el-row>

                                <el-col :span="24">
                                    <div class="itm-bc itm-bc-inuse">
                                        <span>{{ "第 * 班 （03:45-05:40）" }}</span>
                                    </div>
                                </el-col>

                                <el-col :span="24">
                                    <ul>
                                        <li>已占用，该时段被其他服务方占用</li>
                                    </ul>
                                </el-col>

                            </el-row>

                            <el-row>

                                <el-col :span="24">
                                    <div class="itm-bc itm-bc-inuse">
                                        <span>{{ "第 * 班 （20:00-22:00）" }}</span>
                                    </div>
                                </el-col>

                                <el-col :span="24">
                                    <ul>
                                        <li>已占用，该时段被其他服务方占用</li>
                                    </ul>
                                </el-col>

                            </el-row>

                        </el-card>

                    </el-col>

                    <el-col :span="16">
                        <el-card :body-style="{ padding: '5px' }">
                            <el-calendar ref="calendar" v-model="dateVal">
                                <template #header="{ date }">
                                    <span style="font-size: 15px;">{{ date }}</span>
                                    <el-button-group>
                                        <el-button size="small" @click="selectDate('prev-month')">
                                            < </el-button>
                                                <el-button size="small" @click="selectDate('today')">今天</el-button>
                                                <el-button size="small" @click="selectDate('next-month')">
                                                    >
                                                </el-button>
                                    </el-button-group>
                                </template>
                                <template #date-cell="{ data }">
                                    <span :class="data.isSelected ? 'is-selected' : ''" style="font-size: 13px;">
                                        {{ data.day.split('-').slice(2).join('-') }}
                                        {{ data.isSelected ? '✔️' : '' }}
                                    </span>
                                </template>
                            </el-calendar>
                        </el-card>
                    </el-col>

                </el-row>

            </el-col>

        </el-row>



    </el-dialog>

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
                        <el-button type="primary" :icon="Search" class="btn-sty" size="small" style="margin-left: 20px;"
                            @click="onAddItem">搜索</el-button>
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

                <el-table :data="tableData" stripe border
                    style="width:100%; border: 1px dotted gainsboro; font-size: 12px; max-height: 500px;">

                    <el-table-column fixed prop="num" label="序号" width="50" />

                    <el-table-column fixed prop="service_name" label="服务方" width="150" />

                    <el-table-column prop="name" label="班线名称" width="150" />

                    <el-table-column prop="type" label="运营类型" width="100" />

                    <el-table-column prop="exp" label="运营期限" width="150" />

                    <el-table-column prop="time_interval" label="运营时段" width="150" />

                    <el-table-column prop="liable" label="负责人" width="100" />

                    <el-table-column prop="dispatcher" label="调度员" width="100" />

                    <el-table-column prop="driver" label="司机" width="100" />

                    <el-table-column prop="lince_plate" label="车牌号" width="150" />

                    <el-table-column prop="vechicle_type" label="车辆类型" width="100" />

                    <el-table-column prop="path" label="线路" width="150" />

                    <el-table-column fixed="right" label="操作" width="120">
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
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'

import type { CalendarDateType, CalendarInstance } from 'element-plus'

import { scheduleDataStore, type ScheduleInfo } from '@/store/ServiceScheduling'

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
const inputClassName = ref('')
const tdy = ref(0)
const tdw = ref('')

const roate1 = ref(true)

const dateVal = ref(new Date())
const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
    if (!calendar.value) return
    calendar.value.selectDate(val)
}


const dialogTableVisible = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

const handleClose = function onDialogClose() {
    dialogTableVisible.value = true;
}

const scheduleStore = scheduleDataStore()

const now = new Date()

let tableData = ref(scheduleStore.list)

const deleteRow = (index: number) => {
    tableData.value.splice(index, 1)
}

const onAddItem = () => {
    dialogTableVisible.value = true
}

const filterGender = (value: string, row: ScheduleInfo) => {
    return 0
}


function getWeekDay(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return weekdays[dayOfWeek];
}

onMounted(() => {

    tdw.value = getWeekDay()

    let currentDate = new Date(); // 获取当前日期
    let dayOfMonth = currentDate.getDate();

    tdy.value = dayOfMonth

});


const selectionVal = ref('')
const service_info = [
    {
        label: '固定班线',
        options: [
            {
                value: '1',
                label: '国家药品监督管理局药品评审中心',
            },
            {
                value: '2',
                label: '腾讯科技（北京）有限公司',
            },
        ],
    },
    {
        label: '零散包车',
        options: [
            {
                value: '3',
                label: '维京公司春游拓展',
            },
            {
                value: '4',
                label: '隆文诗友会接驳',
            },
            {
                value: '5',
                label: '国展艺术大观接驳',
            }
        ],
    },
    {
        label: '大型项目',
        options: [
            {
                value: '6',
                label: '大运会运动员接驳',
            },
            {
                value: '7',
                label: '城运会运动员接驳',
            }
        ]
    },
]

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

.dia-inp {
    font-size: 13px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    margin-right: 5px;
}

.tm-rg {
    list-style: none;
    font-size: 14px;
    text-align: center;
}

:deep(.el-progress-bar__outer),
:deep(.el-progress-bar__inner) {
    border-radius: inherit;
}

.tm-sep {
    width: 100%;
    text-align: right;
}

.c-day {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(-30deg, #3fa5fe, #2663fe);
}

.c-w {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    text-align: left;
}

.c-day span {
    font-size: 22px;
    font-weight: bold;
    color: white;
}

.c-w p {
    font-size: 13px;
    font-weight: bold;
    color: black;
}

.itm-bc {
    cursor: pointer;
    width: 260px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(-30deg, #3fa5fe, #2663fe);
    margin: 8px 0 8px 0;

}

.itm-bc-inuse {
    background: linear-gradient(-30deg, #a3a3a3, #767575);
}

.itm-bc span {
    font-size: 13px;
    font-weight: 200;
    color: white;
}
</style>