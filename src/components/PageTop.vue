<template>
    <el-row>
        <el-col id="normalSearch" class="item-sty" :span="5">
            <el-input v-model="normalSearchInput" style="width: 240px" placeholder="可输入业务单号/客户名称/车牌..." clearable />
            &nbsp;
            <el-button :icon="Search" circle style="width: 30px; height: 30px;" />
        </el-col>
        <el-col id="moreSearchExpand" class="item-sty" :span="3">
            <el-button link style="height: 35px; color: #3687DA; font-size: 13px;" small>
                <el-icon class="el-icon--left">
                    <Filter style="color: #3687DA;" />
                </el-icon>
                更多条件
                <el-icon class="el-icon--right">
                    <ArrowDown style="color: #3687DA;" />
                </el-icon>
            </el-button>
        </el-col>
        <el-col class="item-sty" :span="2" :offset="9">
            <el-button style="height: 30px; width:80px; font-size: 12px;"  @click="emitter.emit('addDialogSwitch', true)">
                <el-icon class="el-icon--left">
                    <Plus style="color: grey" />
                </el-icon>
                新增
            </el-button>
        </el-col>
        <el-col class="item-sty" :span="2">
            <el-dropdown>
                <div class="el-dropdown-link">
                    <el-icon style="margin-right: 3px;">
                        <Document />
                    </el-icon>
                    <el-button link style="font-size: 12px;">导入/导出</el-button>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :icon="Upload"><span style="font-size: 12px;">导入</span></el-dropdown-item>
                        <el-dropdown-item :icon="Download"><span style="font-size: 12px;">导出</span></el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </el-col>
        <el-col class="item-sty" :span="2">
            <el-button style="height: 30px; width:80px; font-size: 12px;" link>
                <el-icon class="el-icon--left">
                    <Printer style="color: grey" />
                </el-icon>
                打印
            </el-button>
        </el-col>
        <el-col class="item-sty" :span="1">
            <el-button style="height: 30px; width:80px; font-size: 12px;" link>
                <el-icon class="el-icon--left">
                    <Refresh style="color: grey" />
                </el-icon>
                刷新
            </el-button>
        </el-col>
    </el-row>
</template>

<script setup lang="ts" name="PageHeader">
import {
    Search,
    ArrowDown,
    Plus,
    Upload,
    Download,
    Printer,
    Refresh,
    Document,
    Filter
} from '@element-plus/icons-vue'

import { ref } from 'vue'

import emitter from '@/utils/emitter';

var normalSearchInput = ref('')

</script>

<style>

#normalSearch,
#moreSearchExpand {
    text-align: left;
}

.item-sty {
    text-align: right;
}

.el-dropdown-link {
    height: 30px;
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