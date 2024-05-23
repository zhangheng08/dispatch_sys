<template>
    <el-card style="height: 100%;" :body-style="{ padding: '6px' }">
        <template #header>
            <div style="min-height: 50px;">
                <el-button text @click="dialog = true">Open Drawer with nested form</el-button>
            </div>
        </template>
        <el-scrollbar height="550">
            <el-table :data="tableData" stripe="true" :header-row-style="{ 'font-size': '13px', 'color': '#000088' }"
                style="width:100%; font-size: 12px; max-height: max-content;" border>
                <el-table-column fixed prop="code" label="编号" width="100" />
                <el-table-column prop="miss" label="服务主体" width="220" />
                <el-table-column prop="content" label="任务描述" width="220" />
                <el-table-column prop="creater" label="甲方联系人" width="150" />
                <el-table-column prop="contract" label="合同号" width="150" />
                <el-table-column prop="time_span" label="用车时段" width="220" />
                <el-table-column prop="allowance" label="出车补助(元)" width="120" />
                <el-table-column prop="stats" label="状态" width="150">
                    <template #default="scope">
                        <el-tag :type="scope.row.tag === 'done' ? 'success' : 'warning'" disable-transitions>
                            {{ scope.row.tag }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="dispatcher" label="调度员" width="100" />
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
        </el-scrollbar>
        <template #footer>
            <div>
                <span>Card name</span>
            </div>
        </template>
    </el-card>


    <el-drawer v-model="dialog" title="I have a nested form inside!" :before-close="handleClose" direction="rtl" size="60%">
        <div>
            <el-form :model="form">
                <el-form-item label="Name" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Area" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="Please select activity area">
                        <el-option label="Area1" value="shanghai" />
                        <el-option label="Area2" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button @click="cancelForm">Cancel</el-button>
                <el-button type="primary" :loading="loading" @click="onClick">
                    {{ loading ? 'Submitting ...' : 'Submit' }}
                </el-button>
            </div>
        </div>
    </el-drawer>

</template>

<script setup lang="ts" name="shuttlebus_scheduling">

import { reactive, ref } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'

const formLabelWidth = '80px'

let timer: number | undefined

interface Mission {
    code: string
    miss: string
    content: string
    contract: string
    time_span: string
    tag: string
    fleet: string
    allowance: number
    creater: string
    dispatcher: string
}

const dialog = ref(false)
const loading = ref(false)

const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})


const onClick = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        dialog.value = false
    }, 400)
}

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


const tableDataArr: Mission[] = [{
    code: '000001',
    miss: '国家药品监督管理局药品评审中心',
    content: '延庆世园会游客接驳',
    contract: '未录入',
    time_span: '2024-08-23 11:00 至 15:30',
    tag: '待调度员确认',
    fleet: 'CD0001',
    creater: '杜国功/13639586533',
    allowance: 100,
    dispatcher: '王志勇'
}, {
    code: '000002',
    miss: '国家药品监督管理局药品评审中心',
    content: '延庆世园会游客接驳',
    contract: '未录入',
    time_span: '2024-08-23 11:00 至 15:30',
    tag: '待调度员确认',
    fleet: 'CD0001',
    creater: '杜国功/13639586533',
    allowance: 100,
    dispatcher: '王志勇'
}]

const tableData = ref(tableDataArr)

</script>

<style scoped>
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>