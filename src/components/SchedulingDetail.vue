<template>

    <el-row :gutter="10">

        <el-col :span="24">
            <span style="font-size: 12px;">车牌号：{{ licensePlate }}</span>
        </el-col>

        <el-col :span="24" style="margin-bottom: 10px; background-color: aliceblue; height: 180px; padding: 15px;">
            <el-row style="width: 100%; height: 150px; border: 1px dashed wheat;">
                <el-col :span="1" v-for="item in taskTimeProgressRef" :key="item.idx" style="padding-right: 2px;">
                    <p class="tm-sep">{{ item.idx }}</p>
                    <el-progress status="exception" striped striped-flow :text-inside="false" :show-text="false"
                        :stroke-width="26" :percentage="item.progress" />
                </el-col>
                <el-col :span="1" v-for="item in taskIntentToProgressRef" :key="item.idx" style="padding-right: 2px;">
                    <p class="tm-sep">{{ item.idx }}</p>
                    <el-progress striped :text-inside="false" :show-text="false"
                        :stroke-width="26" :percentage="item.progress" />
                </el-col>
            </el-row>
        </el-col>

        <el-col :span="24" style="margin-bottom: 10px; background-color: aliceblue; padding: 10px;">

            <el-row :gutter="5">

                <el-col :span="24">

                    <el-table :data="tableData" stripe=true height="316"
                        :header-row-style="{ 'font-size': '13px', 'color': '#000088' }" @row-click="onRowClick"
                        style="font-size: 12px; cursor: pointer;">
                        <el-table-column prop="code" label="业务单号" width="160" fixed />
                        <el-table-column prop="servPrinc" label="服务方" width="120" />
                        <!-- <el-table-column prop="licensePlate" label="车牌号" width="160" /> -->
                        <el-table-column prop="typeName" label="业务类型" width="100" />
                        <el-table-column prop="taskName" label="任务类型" width="100" />
                        <el-table-column prop="dispatcher" label="调度员" width="100" />
                        <el-table-column prop="startTimeFormatString" label="开始时间" width="200" />
                        <el-table-column prop="endTimeFormatString" label="结束日期" width="200" />
                    </el-table>

                </el-col>

            </el-row>

        </el-col>

    </el-row>

</template>

<script setup lang="ts" name="driver_management">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'
import { format } from 'date-fns'
import { useUserStore } from '@/store/user'
import { baseUrlStore } from '@/store/BaseUrl'
var baseUrl = baseUrlStore()
var userStore = useUserStore()

import type { CalendarDateType, CalendarInstance } from 'element-plus'

import { ElContainer, ElHeader, ElFooter, ElMain } from 'element-plus'

import emitter from '@/utils/emitter'


onUnmounted(() => {
    emitter.off('sendLicensePlate')
})

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

defineProps(['licensePlate'])

const tdy = ref(0)
const tdw = ref('')
const roate1 = ref(true)

const dateVal = ref(new Date())
const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
    if (!calendar.value) return
    calendar.value.selectDate(val)
}


function getWeekDay(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return weekdays[dayOfWeek];
}

var axio = axios.create({
    baseURL: baseUrl.host,
    timeout: 3000,
    headers: {
        "Authorization": userStore.accessToken
    }
});

onMounted(() => {

    tdw.value = getWeekDay()

    let currentDate = new Date(); // 获取当前日期
    let dayOfMonth = currentDate.getDate();

    tdy.value = dayOfMonth

});


interface ScheduleTask {
    taskName: String,
    typeName: String,
    code: String,
    servPrinc: String,
    taskTypeCode: String,
    licensePlate: String,
    dispatcher: String,
    typeId: number,
    startTime: Date,
    endTime: Date,
    startTimeFormatString: String,
    endTimeFormatString: String,
    startTimeFormatHour: number,
    endTimeFormatHour: number
}

var scheduleTasks: ScheduleTask[] = []
var tableData = ref(scheduleTasks)


var onParentDrawerOpen = function (licensePlate: String) {

    const pageLoadUrl = '/dispatch/ScheduledTask/' + licensePlate

    axio.post(pageLoadUrl)
        .then(function (response) {

            if (response.data.code == 200) {
                tableData.value = response.data.data
                var tasks: ScheduleTask[] = tableData.value
                for (let i = 0; i < tasks.length; i++) {
                    tasks[i].startTimeFormatString = format(tasks[i].startTime, 'yyyy-MM-dd HH:00:00')
                    tasks[i].endTimeFormatString = format(tasks[i].endTime, 'yyyy-MM-dd HH:00:00')
                    tasks[i].startTimeFormatHour = Number(format(tasks[i].startTime, 'H'))
                    tasks[i].endTimeFormatHour = Number(format(tasks[i].endTime, 'H'))
                }
            }

        }).catch(function (error) {
            console.log(error)
        });

}

interface TaskProgressItem {
    idx: Number,
    progress: Number
}
var taskTimeProgress: TaskProgressItem[] = []
var taskIntentToProgress: TaskProgressItem[] = []

var taskTimeProgressRef = reactive(taskTimeProgress)
var taskIntentToProgressRef = reactive(taskIntentToProgress)

const onRowClick = function (row: any) {

    console.log(row)

    var item: ScheduleTask = row
    var eh = item.endTimeFormatHour
    var sh = item.startTimeFormatHour

    if (eh > sh) {
        taskTimeProgressRef.length = 0
        for (let i = 0; i < 24; i++) {

            var hTick = i + 1
            var progressItem: TaskProgressItem = { idx: 0, progress: 0 }

            if (hTick < sh) {
                progressItem.progress = 0
            } else if (hTick > sh && hTick <= eh) {
                progressItem.progress = 100
            } else {
                progressItem.progress = 0
            }

            if (hTick == 24) hTick = 0
            progressItem.idx = hTick
            taskTimeProgressRef.push(progressItem)
        }
    }

}

var superClickedLicensePlate = ref('')
interface emmiterParam { value: any, startH: number, endH: number }
emitter.on('sendLicensePlate', (param: emmiterParam) => {
    if (param.value != superClickedLicensePlate.value) {
        superClickedLicensePlate.value = param.value
        onParentDrawerOpen(superClickedLicensePlate.value)

        taskTimeProgressRef.length = 0
        for (let i = 0; i < 24; i++) {
            var hTick = i + 1
            if (hTick == 24) hTick = 0
            var progressItem: TaskProgressItem = { idx: hTick, progress: 0 }
            taskTimeProgressRef.push(progressItem)
        }

        taskIntentToProgressRef.length = 0
        for (let i = 0; i < 24; i++) {

            var itentHTick = i + 1
            var intentProgressItem: TaskProgressItem = { idx: 0, progress: 0 }

            if (itentHTick > param.startH && itentHTick <= param.endH) {
                intentProgressItem.progress = 100
            }

            if (itentHTick == 24) itentHTick = 0
            intentProgressItem.idx = itentHTick
            taskIntentToProgressRef.push(intentProgressItem)
        }
    }
})

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
    text-align: left;
    padding-left: 0px;
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