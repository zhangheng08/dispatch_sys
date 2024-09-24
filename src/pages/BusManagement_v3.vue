<template>
  <el-row gutter="8">
    <el-col :span="5">
      <el-card style="height: 100%" :body-style="{ padding: '6px' }">
        <el-scrollbar height="680">
          <el-input
            style="width: 100%; margin-top: 12px"
            v-model="filterText"
            placeholder="筛选"
            :suffix-icon="Search"
          />
          <el-tooltip class="box-item" effect="light" content="创建车队" placement="right-start">
            <el-button
              circle
              bg
              style="margin: 15px 0px 0px 8px; font-size: 13px"
              @click="openDialog('cf')"
            >
              <el-icon color="#409efc" class="no-inherit"><FolderAdd /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tree
            class="tre"
            :data="tree"
            ref="elTreeRef"
            :props="defaultProps"
            :load="loadNode"
            :lazy="false"
            node-key="id"
            :highlight-current="true"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            :default-expand-all="true"
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <span>
                <el-text style="max-width: 180px; text-align: center; height: 18px" truncated>{{
                  node.label
                }}</el-text>
                <span style="margin-bottom: 15px">
                  <el-tooltip
                    class="box-item"
                    effect="light"
                    content="创建分组"
                    placement="right-start"
                  >
                    <a
                      v-if="node.level === 1"
                      style="margin-left: 5px"
                      @click="openDialog('cg', node, data)"
                    >
                      <el-icon>
                        <FolderAdd color="rgb(50, 93, 220)" />
                      </el-icon>
                    </a>
                  </el-tooltip>
                  <a
                    v-if="node.level === 1 || node.level === 2"
                    style="margin-left: 5px"
                    @click="openDialog(node.level === 1 ? 'ef' : 'eg', node, data)"
                  >
                    <el-icon>
                      <Edit color="rgb(189, 172, 172)" />
                    </el-icon>
                  </a>
                  <a
                    v-if="node.level === 1 || node.level === 2"
                    style="margin-left: 5px"
                    @click="doRemove(node.level === 1 ? 'rf' : 'rg', node, data)"
                  >
                    <el-icon>
                      <Delete color="rgb(189, 172, 172)" />
                    </el-icon>
                  </a>
                </span>
              </span>
            </template>
          </el-tree>
        </el-scrollbar>
      </el-card>
    </el-col>
    <el-col :span="19">
      <el-card style="height: 100%" :body-style="{ padding: '6px' }">
        <template #header>
          <PageTop useType="BusManagment" />
        </template>
        <el-table
          style="font-size: 13px; width: 100%; height: 550px"
          :header-cell-style="tableHeaderCellStyle"
          :data="tableDataRel"
          stripe
          :cell-style="tableCellStyle"
        >
          <el-table-column fixed prop="license_plate" label="车牌号" width="120" />
          <el-table-column prop="driver_name" fixed label="驾驶员" width="120" />
          <el-table-column prop="vin" label="车架号" width="120" />
          <el-table-column prop="engine_serial" label="发动机号" width="120" />
          <el-table-column prop="brand" label="品牌" width="120" />
          <el-table-column prop="accommodate" label="核定载客" width="120" />
          <el-table-column prop="issue_certificate_date" label="发证日期" width="120" />
          <el-table-column prop="regist_certificate" label="登记证号" width="160" />
          <el-table-column prop="etc_card" label="ETC卡号" width="120" />

          <el-table-column label="交强险">
            <el-table-column prop="insurer_1" label="保险公司名称" width="200" />
            <el-table-column prop="insurance_policy_no_1" label="保单号" width="120" />
            <el-table-column prop="start_time_1" label="保险时间自" width="120" />
            <el-table-column prop="end_time_1" label="保险时间至" width="120" />
            <el-table-column prop="casualties_limit_1" label="死亡伤残赔偿限额" width="180" />
            <el-table-column prop="medical_limit_1" label="医疗费用赔偿限额" width="180" />
            <el-table-column prop="property_loss_limit_1" label="财产损失赔偿限额" width="180" />
            <el-table-column
              prop="casualties_limit_irresponsibility_1"
              label="无责任死亡伤残赔偿限额"
              width="180"
            />
            <el-table-column
              prop="medical_limit_irresponsibility_1"
              label="无责任医疗费用赔偿限额"
              width="180"
            />
            <el-table-column
              prop="property_loss_limit_irresponsibility_1"
              label="无责任财产损失赔偿限额"
              width="180"
            />
          </el-table-column>
          <el-table-column label="承运人责任险">
            <el-table-column prop="insurer_2" label="保险公司名称" width="200" />
            <el-table-column prop="insurance_policy_no_2" label="保单号" width="120" />
            <el-table-column prop="start_time_2" label="保险时间自" width="120" />
            <el-table-column prop="end_time_2" label="保险时间至" width="120" />
            <el-table-column prop="single_seat_insurance_amount_2" label="单座保额" width="120" />
          </el-table-column>
          <el-table-column label="商业险">
            <el-table-column prop="insurer_3" label="保险公司名称" width="200" />
            <el-table-column prop="insurance_policy_no_3" label="保单号" width="120" />
            <el-table-column prop="start_time_3" label="保险时间自" width="120" />
            <el-table-column prop="end_time_3" label="保险时间至" width="120" />
            <el-table-column prop="damage_insurance_amount_3" label="车损保额" width="120" />
            <el-table-column prop="three_insurance_amount_3" label="三者保额" width="120" />
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="openDetail(scope.row)">
                详情
              </el-button>
              <el-divider style="color: black" direction="vertical" border-style="dashed" />
              <el-button link type="danger" size="small" @click.prevent=""> 删除 </el-button>
            </template>
          </el-table-column>
        </el-table>
        <template #footer>
          <el-row>
            <el-col :span="8"> </el-col>
            <el-col :span="8">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="1000"
                @change="onPageChange"
              />
            </el-col>
            <el-col :span="8"> </el-col>
          </el-row>
        </template>
      </el-card>
    </el-col>
  </el-row>

  <el-dialog v-model="dialogCreateFleetVisible" :title="dialogTitle" width="500">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item :label="dialogInputLabel" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogCreateFleetVisible = false">取消</el-button>
        <el-button type="primary" @click="toSubmit(ruleFormRef)">保存</el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogVehicleInfoVisible"
    title="车辆信息"
    width="800"
    style="margin-top: 60px"
    @open="onDetailDialogOpened"
    @closed="onDetailDialogClosed"
  >
    <el-scrollbar>
      <el-form
        ref="vehicleRuleFormRef"
        style="height: 500px"
        :model="vehicleDetailRuleForm"
        :rules="vehicleDetailRules"
        label-width="auto"
        :size="formSize"
        status-icon
      >
        <el-row>
          <el-col :span="24">
            <el-divider content-position="left">基本信息</el-divider>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 车牌号 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="license_plate">
              <el-input v-model="vehicleDetailRuleForm.license_plate" :disabled="noEditable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 驾驶员 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="driver_name">
              <el-select
                v-model="vehicleDetailRuleForm.driver_name"
                placeholder=""
                :disabled="noEditable"
              >
                <el-option label="张" value="1" />
                <el-option label="王" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 车架号 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="vin">
              <el-input v-model="vehicleDetailRuleForm.vin" :disabled="noEditable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 发动机号 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="engine_serial">
              <el-input v-model="vehicleDetailRuleForm.engine_serial" :disabled="noEditable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 品牌 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="brand">
              <el-input v-model="vehicleDetailRuleForm.brand" :disabled="noEditable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 核定载客 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="accommodate">
              <el-input-number
                v-model="vehicleDetailRuleForm.accommodate"
                :disabled="noEditable"
                style="width: 200px"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 发证日期 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="issue_certificate_date">
              <el-date-picker
                style="width: 200px"
                v-model="vehicleDetailRuleForm.issue_certificate_date"
                type="date"
                placeholder=""
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 登记证号 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="regist_certificate">
              <el-input v-model="vehicleDetailRuleForm.regist_certificate" :disabled="noEditable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> ETC卡号 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="etc_card">
              <el-input v-model="vehicleDetailRuleForm.etc_card" :disabled="noEditable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-divider content-position="left">交强险</el-divider>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 保险公司名称 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="insurer_1">
              <el-input v-model="vehicleDetailRuleForm.insurer_1" :disabled="noEditable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 保单号 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="insurance_policy_no_1">
              <el-input
                v-model="vehicleDetailRuleForm.insurance_policy_no_1"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 保险起止日期 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="start_end_time_1">
              <el-date-picker
                v-model="vehicleDetailRuleForm.start_end_time_1"
                type="daterange"
                range-separator="至"
                :disabled="noEditable"
                start-placeholder="起始日期"
                end-placeholder="截止日期"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 死亡伤残赔偿限额 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="casualties_limit_1">
              <el-input-number
                v-model="vehicleDetailRuleForm.casualties_limit_1"
                :precision="2"
                :step="0.1"
                :max="1000000"
                style="width: 200px"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 医疗费用赔偿限额 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="medical_limit_1">
              <el-input-number
                v-model="vehicleDetailRuleForm.medical_limit_1"
                :precision="2"
                :step="0.1"
                :max="1000000"
                style="width: 200px"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 财产损失赔偿限额 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="medical_limit_1">
              <el-input-number
                v-model="vehicleDetailRuleForm.property_loss_limit_1"
                :precision="2"
                :step="0.1"
                :max="1000000"
                style="width: 200px"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex">
            无责任死亡伤残赔偿限额
          </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="casualties_limit_irresponsibility_1">
              <el-input-number
                v-model="vehicleDetailRuleForm.casualties_limit_irresponsibility_1"
                :precision="2"
                :step="0.1"
                :max="1000000"
                style="width: 200px"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex">
            无责任医疗费用赔偿限额
          </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="medical_limit_irresponsibility_1">
              <el-input-number
                v-model="vehicleDetailRuleForm.medical_limit_irresponsibility_1"
                :precision="2"
                :step="0.1"
                :max="1000000"
                style="width: 200px"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex">
            无责任财产损失赔偿限额
          </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="property_loss_limit_irresponsibility_1">
              <el-input-number
                v-model="vehicleDetailRuleForm.property_loss_limit_irresponsibility_1"
                :precision="2"
                :step="0.1"
                :max="1000000"
                style="width: 200px"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-divider content-position="left">承运人责任险</el-divider>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 保险公司名称 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="insurer_2">
              <el-input v-model="vehicleDetailRuleForm.insurer_2" :disabled="noEditable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 保单号 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="insurance_policy_no_2">
              <el-input
                v-model="vehicleDetailRuleForm.insurance_policy_no_2"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 保险起止日期 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="start_end_time_2">
              <el-date-picker
                v-model="vehicleDetailRuleForm.start_end_time_2"
                type="daterange"
                range-separator="至"
                :disabled="noEditable"
                start-placeholder="起始日期"
                end-placeholder="截止日期"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 单座保额 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="single_seat_insurance_amount_2">
              <el-input-number
                v-model="vehicleDetailRuleForm.single_seat_insurance_amount_2"
                :precision="2"
                :step="0.1"
                :max="1000000"
                style="width: 200px"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-divider content-position="left">商业险</el-divider>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 保险公司名称 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="insurer_3">
              <el-input v-model="vehicleDetailRuleForm.insurer_3" :disabled="noEditable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 保单号 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="insurance_policy_no_3">
              <el-input
                v-model="vehicleDetailRuleForm.insurance_policy_no_3"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 保险起止日期 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="start_end_time_3">
              <el-date-picker
                v-model="vehicleDetailRuleForm.start_end_time_3"
                type="daterange"
                range-separator="至"
                :disabled="noEditable"
                start-placeholder="起始日期"
                end-placeholder="截止日期"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 车损保额 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="damage_insurance_amount_3">
              <el-input-number
                v-model="vehicleDetailRuleForm.damage_insurance_amount_3"
                :precision="2"
                :step="0.1"
                :max="1000000"
                style="width: 200px"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 三者保额 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="three_insurance_amount_3">
              <el-input-number
                v-model="vehicleDetailRuleForm.three_insurance_amount_3"
                :precision="2"
                :step="0.1"
                :max="1000000"
                style="width: 200px"
                :disabled="noEditable"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancelClick" v-if="showCancelReset"> 取消 </el-button>
        <el-button @click="onRestClick" v-if="showCancelReset"> 重置 </el-button>
        <el-button type="primary" @click="onEditClick(vehicleRuleFormRef)">
          {{ editBtnLabel }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="BusManageMent">
import { ElDrawer, ElMessageBox } from 'element-plus'
import PageTop from '@/components/PageTop.vue'
import {
  DocumentAdd,
  CirclePlus,
  RemoveFilled,
  Delete,
  FolderAdd,
  Edit,
  CaretRight,
  Plus
} from '@element-plus/icons-vue'

import BusDetail from '../components/BusDetail.vue'
import BusEdit from '@/components/BusInfoEdit.vue'
import axios from 'axios'
import { format } from 'date-fns'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ref, watch, reactive, type VNodeChild, onMounted } from 'vue'
import { treeDatav2, type VehicleMngTreev2 } from '@/store/Vehicle_v2'
import { Search } from '@element-plus/icons-vue'
import { ElTree, type TreeNode } from 'element-plus'
import { baseUrlStore } from '@/store/BaseUrl'
import { useUserStore } from '@/store/user'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

var baseUrl = baseUrlStore()
var userStore = useUserStore()

var axio = axios.create({
  baseURL: baseUrl.host,
  timeout: 3000,
  headers: {
    Authorization: userStore.accessToken
  }
})

let timer: number | undefined
const dialog = ref(false)
const loading = ref(false)
var dialogCreateFleetVisible = ref(false)
var dialogVehicleInfoVisible = ref(false)
var showCancelReset = ref(false)
var noEditable = ref(true)
var dialogCreateType = ref('') // cf cg ef eg
var dialogTitle = ref('')
var dialogInputLabel = ref('')
var currentId = ref(0)
var currentParentId = ref(0)
var currentPage = ref(1)
var pageSize = ref(15)
var currentCheckedFleetGroupId = ref(1)
var editBtnLabel = ref('编辑')

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
        }, 200)
      }, 300)
    })
    .catch(() => {
      // catch error
    })
}

onMounted(() => {
  loadGroupingInfo()
})

const loadGroupingInfo = () => {
  axio
    .post('/fleet/grouping')
    .then(function (response) {
      if (response.data.code == 200) {
        tree.value = response.data.data
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const cancelForm = () => {
  loading.value = false
  dialog.value = false
  clearTimeout(timer)
}

// left tree
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const treeStore = treeDatav2()
const fleetGroupInfo = Array<VehicleMngTreev2>()
const tree = ref(fleetGroupInfo) //= ref(treeStore.list)
const filterText = ref('')
const lastExpandIds = ref([1, 11, 111, 112])
var tableData = Array()
const tableDataRel = ref(tableData)
var currentSelectVehicleId = ref(0)

const defaultProps = {
  children: 'children',
  label: 'label'
}

interface Tree {
  [key: string]: any
}

const loadNode = (node: Node, resolve: (data: VehicleMngTreev2[]) => void) => {
  let data: VehicleMngTreev2[] = []

  if (node.level === 0) {
    return resolve([
      { id: 0.1, label: tree.value[0].label },
      { id: 0.2, label: tree.value[1].label }
    ])
  } else if (node.level === 1) {
    let list = tree.value
    list.forEach((val, idx, array) => {
      let subList = val.children
      if (node.data.label === val.label) {
        data = subList
      }
    })
  } else if (node.level === 2) {
    let list = tree.value
    list.forEach((val, idx, array) => {
      let subList = val.children
      subList.forEach((subVal, idx, array) => {
        if (node.data.label === subVal.label) {
          data = subVal.children
        }
      })
    })
  } else if (node.level === 3) {
    let list = tree.value
    list.forEach((val, idx, array) => {
      let subList = val.children
      subList.forEach((subVal, idx, array) => {
        let subsubList = subVal.children
        subsubList.forEach((subsubVal, idx, array) => {
          if (node.data.label === subsubVal.label) {
            data = subsubVal.children
          }
        })
      })
    })
  } else {
    data = []
  }

  setTimeout(() => {
    resolve(data)
  }, Math.random() * 300)
}

watch(filterText, (val) => {
  elTreeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree, node: Node) => {
  if (!value) return true
  console.log(node)
  return data.label.includes(value)
}

// const append = (node: Node, data: Tree) => {
//   const newChild = { label: 'testtest', children: [] }
//   if (!data.children) {
//     data.children = []
//   }
//   data.children.push(newChild)
//   tree.value = [...tree.value]
// }

// const remove = (node: Node, data: Tree) => {
//   const parent = node.parent
//   const children: Tree[] = parent.data.children || parent.data
//   const index = children.findIndex((d) => d.id === data.id)
//   children.splice(index, 1)
//   tree.value = [...tree.value]
// }

const onPageChange = function (pNum: number, pSize: number) {
  loadVehicles(pNum, pageSize.value)
}

const handleNodeClick = (nodeObj: Node, treeNode: TreeNode) => {
  if (treeNode.level === 2) {
    console.log(treeNode.parent.data.label, treeNode.data.label)
    currentCheckedFleetGroupId.value = nodeObj.id
    loadVehicles(1, 15)
  }
}

const loadVehicles = (pNum: number, pSize: number) => {
  currentPage.value = pNum
  pageSize.value = pSize

  let url =
    '/fleet/vehicles/' +
    currentCheckedFleetGroupId.value +
    '/' +
    currentPage.value +
    '/' +
    pageSize.value

  axio
    .post(url)
    .then(function (response) {
      if (response.data.code == 200) {
        tableDataRel.value = response.data.data
        for (let i = 0; i < tableDataRel.value.length; i++) {
          let item: VehicleDetailRuleForm = tableDataRel.value[i]
          item.issue_certificate_date = format(item.issue_certificate_date, 'yyyy-MM-dd')
          item.start_time_1 = format(item.start_time_1, 'yyyy-MM-dd')
          item.end_time_1 = format(item.end_time_1, 'yyyy-MM-dd')
          item.start_time_2 = format(item.start_time_2, 'yyyy-MM-dd')
          item.end_time_2 = format(item.end_time_2, 'yyyy-MM-dd')
          item.start_time_3 = format(item.start_time_3, 'yyyy-MM-dd')
          item.end_time_3 = format(item.end_time_3, 'yyyy-MM-dd')
        }
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

// left tree end

// table
const tableCellStyle = (data: { row: any; column: any; rowIndex: number; columnIndex: number }) => {
  return { 'text-align': 'center' }
}

const tableHeaderCellStyle = (data: {
  row: any
  column: any
  rowIndex: number
  columnIndex: number
}) => {
  let cssProp = { 'text-align': 'center', 'background-color': 'white', width: '180' }
  if (data.column.label === '交强险') {
    cssProp['background-color'] = 'white'
  }
  return cssProp
}

interface RuleForm {
  name: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: ''
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 2, max: 15, message: '长度限制在 2 至 15个字符', trigger: 'blur' }
  ]
})

interface VehicleDetailRuleForm {
  license_plate: string
  previous_license_plates: string
  vin: string
  engine_serial: string
  brand: string
  manufactory: string
  accommodate: number
  model: string
  fuel_type: string
  use_purpose: string
  issue_certificate_date: Date | string
  inspection_date: Date | string
  scrapped_date: Date | string
  regist_certificate: string
  etc_card: string
  fleet_id: number
  fleet_group_id: number
  driver_id: number

  insurance_name_1: string
  insurance_policy_no_1: string
  insurer_1: string
  start_time_1: Date | string
  end_time_1: Date | string
  start_end_time_1: Date[] | string[]
  casualties_limit_1: number
  medical_limit_1: number
  property_loss_limit_1: number
  casualties_limit_irresponsibility_1: number
  medical_limit_irresponsibility_1: number
  property_loss_limit_irresponsibility_1: number

  insurance_name_2: string
  insurance_policy_no_2: string
  insurer_2: string
  start_time_2: Date | string
  end_time_2: Date | string
  start_end_time_2: Date[] | string[]
  single_seat_insurance_amount_2: number

  insurance_name_3: string
  insurance_policy_no_3: string
  insurer_3: string
  start_time_3: Date | string
  end_time_3: Date | string
  start_end_time_3: Date[] | string[]
  damage_insurance_amount_3: number
  three_insurance_amount_3: number

  driver_name: string
}

const vehicleRuleFormRef = ref<FormInstance>()
const vehicleDetailRuleForm = reactive<VehicleDetailRuleForm>({
  license_plate: '',
  previous_license_plates: '',
  vin: '',
  engine_serial: '',
  brand: '',
  manufactory: '',
  accommodate: 0,
  model: '',
  fuel_type: '',
  use_purpose: '',
  issue_certificate_date: new Date(),
  inspection_date: new Date(),
  scrapped_date: new Date(),
  regist_certificate: '',
  etc_card: '',
  fleet_id: 0,
  fleet_group_id: 0,
  driver_id: 0,

  insurance_name_1: '',
  insurance_policy_no_1: '',
  insurer_1: '',
  start_time_1: new Date(),
  end_time_1: new Date(),
  start_end_time_1: [new Date(), new Date()],
  casualties_limit_1: 0,
  medical_limit_1: 0,
  property_loss_limit_1: 0,
  casualties_limit_irresponsibility_1: 0,
  medical_limit_irresponsibility_1: 0,
  property_loss_limit_irresponsibility_1: 0,

  insurance_name_2: '',
  insurance_policy_no_2: '',
  insurer_2: '',
  start_time_2: new Date(),
  end_time_2: new Date(),
  start_end_time_2: [new Date(), new Date()],
  single_seat_insurance_amount_2: 0,

  insurance_name_3: '',
  insurance_policy_no_3: '',
  insurer_3: '',
  start_time_3: new Date(),
  end_time_3: new Date(),
  start_end_time_3: [new Date(), new Date()],
  damage_insurance_amount_3: 0,
  three_insurance_amount_3: 0,

  driver_name: ''
})

var vehicleDetailRuleFormBackUp = {}

const vehicleDetailRules = reactive<FormRules<VehicleDetailRuleForm>>({
  license_plate: [
    { required: true, message: '请输入车牌号', trigger: 'blur' },
    { min: 7, max: 15, message: '长度限制在 7 至 15个字符', trigger: 'blur' }
  ],
  vin: [{ required: true, message: '请输入车架号', trigger: 'blur' }],
  engine_serial: [{ required: true, message: '请输入发动机号', trigger: 'blur' }],
  brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
  driver_name: [{ required: true, message: '请选择司机', trigger: 'change' }],
  issue_certificate_date: [
    {
      type: 'date',
      required: true,
      message: '请选择发证日期',
      trigger: 'change'
    }
  ],
  regist_certificate: [{ required: true, message: '请输入登记证号', trigger: 'blur' }],
  insurer_1: [{ required: true, message: '请输入保险公司名称', trigger: 'blur' }],
  insurance_policy_no_1: [{ required: true, message: '请输入保单号', trigger: 'blur' }],
  start_time_1: [
    {
      type: 'date',
      required: true,
      message: '请选择交强险起保日期',
      trigger: 'change'
    }
  ],
  end_time_1: [
    {
      type: 'date',
      required: true,
      message: '请选择交强险截止日期',
      trigger: 'change'
    }
  ],
  casualties_limit_1: [{ required: true, message: '请输入死亡伤残赔偿限额', trigger: 'blur' }],
  medical_limit_1: [{ required: true, message: '请输入医疗费用赔偿限额', trigger: 'blur' }],
  property_loss_limit_1: [{ required: true, message: '请输入财产损失赔偿限额', trigger: 'blur' }],
  casualties_limit_irresponsibility_1: [
    { required: true, message: '请输入如责任死亡伤残赔偿限额', trigger: 'blur' }
  ],
  medical_limit_irresponsibility_1: [
    { required: true, message: '请输入无责任医疗费用赔偿限额', trigger: 'blur' }
  ],
  property_loss_limit_irresponsibility_1: [
    { required: true, message: '请输入无责任财产损失赔偿限额', trigger: 'blur' }
  ]
})

const openDialog = (type: string, node?: Node, data?: Tree) => {
  dialogCreateType.value = type
  switch (dialogCreateType.value) {
    case 'cf':
      dialogTitle.value = '创建车队'
      dialogInputLabel.value = '车队名称'
      break
    case 'cg':
      dialogTitle.value = '创建车队小组'
      dialogInputLabel.value = '小组名称'
      break
    case 'eg':
      dialogTitle.value = '修改小组名称'
      dialogInputLabel.value = '小组名称'
      break
    case 'ef':
      dialogTitle.value = '修改车队名称'
      dialogInputLabel.value = '车队名称'
      break
  }
  if (node != undefined && data != undefined) {
    currentId.value = data.id
    currentParentId.value = node.parent.data.id
  }
  dialogCreateFleetVisible.value = true
}

const toSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      switch (dialogCreateType.value) {
        case 'cf':
          doCreateFleet()
          break
        case 'cg':
          doCreateGroup()
          break
        case 'ef':
          doModifyFleet()
          break
        case 'eg':
          doModifyGroup()
          break
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const doCreateFleet = () => {
  axio
    .post('/fleet/create', { fleetName: ruleForm.name })
    .then(function (response) {
      if (response.data.code == 200) {
        ElMessage({
          message: '车队创建成功',
          type: 'success'
        })
        loadGroupingInfo()
        dialogCreateFleetVisible.value = false
        currentId.value = -1
        currentParentId.value = -1
        ruleForm.name = ''
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const doCreateGroup = () => {
  axio
    .post('/fleet/createGroup', { groupName: ruleForm.name, fleetId: currentId.value })
    .then(function (response) {
      if (response.data.code == 200) {
        ElMessage({
          message: '分组创建成功',
          type: 'success'
        })
        loadGroupingInfo()
        dialogCreateFleetVisible.value = false
        currentId.value = -1
        currentParentId.value = -1
        ruleForm.name = ''
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const doModifyFleet = () => {
  axio
    .post('/fleet/create', { id: currentId.value, fleetName: ruleForm.name })
    .then(function (response) {
      if (response.data.code == 200) {
        ElMessage({
          message: '车队名称修改成功',
          type: 'success'
        })
        loadGroupingInfo()
        dialogCreateFleetVisible.value = false
        currentId.value = -1
        currentParentId.value = -1
        ruleForm.name = ''
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const doModifyGroup = () => {
  const groupId = currentId.value

  axio
    .post('/fleet/createGroup', {
      id: groupId,
      groupName: ruleForm.name,
      fleetId: currentParentId.value
    })
    .then(function (response) {
      if (response.data.code == 200) {
        ElMessage({
          message: '小组名称修改成功',
          type: 'success'
        })
        loadGroupingInfo()
        dialogCreateFleetVisible.value = false
        currentId.value = -1
        currentParentId.value = -1
        ruleForm.name = ''
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const doRemove = (type: string, node: Node, data: Tree) => {
  if (type === 'rf') {
    const children: Tree[] = data.children
    if (children.length != 0) {
      ElMessage.error('请先删除车队下分组')
    } else {
      let rfUrl = '/fleet/delete/1/' + data.id
      axio
        .post(rfUrl)
        .then(function (response) {
          if (response.data.code == 200) {
            ElMessage({
              message: '车队删除成功',
              type: 'success'
            })
            loadGroupingInfo()
            dialogCreateFleetVisible.value = false
            currentId.value = -1
            currentParentId.value = -1
            ruleForm.name = ''
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  } else {
    ElMessageBox.confirm('删除分组，也将删除此分组下关联的车辆数据！', {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        let rfUrl = '/fleet/delete/2/' + data.id
        axio
          .post(rfUrl)
          .then(function (response) {
            if (response.data.code == 200) {
              ElMessage({
                message: '分组删除成功',
                type: 'success'
              })
              loadGroupingInfo()
              dialogCreateFleetVisible.value = false
              currentId.value = -1
              currentParentId.value = -1
              ruleForm.name = ''
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '删除已取消'
        })
      })
  }
}

const dialogTableVisible = ref(false)

const editItem = () => {
  dialogTableVisible.value = true
}

const openDetail = function (row: any) {
  let vehicleInfoVo = row
  currentSelectVehicleId.value = vehicleInfoVo.id
  dialogVehicleInfoVisible.value = true
}

const onDetailDialogOpened = () => {
  loadVehicleDetails()
}

const loadVehicleDetails = () => {
  let detailUrl = '/fleet/detail/' + currentSelectVehicleId.value
  axio
    .post(detailUrl)
    .then(function (response) {
      if (response.data.code == 200) {
        Object.assign(vehicleDetailRuleForm, response.data.data)
        vehicleDetailRuleForm.issue_certificate_date = new Date(format( vehicleDetailRuleForm.issue_certificate_date, 'yyyy-MM-dd' ))
        vehicleDetailRuleForm.start_end_time_1 = [
          new Date(format(vehicleDetailRuleForm.start_time_1, 'yyyy-MM-dd')),
          new Date(format(vehicleDetailRuleForm.end_time_1, 'yyyy-MM-dd'))
        ]
        vehicleDetailRuleForm.start_end_time_2 = [
          new Date(format(vehicleDetailRuleForm.start_time_2, 'yyyy-MM-dd')),
          new Date(format(vehicleDetailRuleForm.end_time_2, 'yyyy-MM-dd'))
        ]
        vehicleDetailRuleForm.start_end_time_3 = [
          new Date(format(vehicleDetailRuleForm.start_time_3, 'yyyy-MM-dd')),
          new Date(format(vehicleDetailRuleForm.end_time_3, 'yyyy-MM-dd'))
        ]
        Object.assign(vehicleDetailRuleFormBackUp, vehicleDetailRuleForm)
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const onEditClick = async (formEl: FormInstance | undefined) => {
  if (editBtnLabel.value == '编辑') {
    showCancelReset.value = true
    noEditable.value = !noEditable.value
    editBtnLabel.value = '保存'
  } else {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        onSaveClick()
      } else {
        console.log('error form info!', fields)
      }
    })
  }
}

const onCancelClick = () => {
  if (editBtnLabel.value == '保存') {
    noEditable.value = !noEditable.value
    editBtnLabel.value = '编辑'
    onRestClick()
    showCancelReset.value = false
  }
}

const onDetailDialogClosed = () => {
  onCancelClick()
}

const onRestClick = () => {
  Object.assign(vehicleDetailRuleForm, vehicleDetailRuleFormBackUp)
}

const onSaveClick = () => {
  axio
    .post('/fleet/updateVehicleInfo', vehicleDetailRuleForm)
    .then(function (response) {
      if (response.data.code == 200) {
        console.log(response.data.data)
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}
</script>

<style scoped>
.tre {
  width: 100%;
  font-size: 13px;
  color: rgb(90, 90, 96);
  height: fit-content;
  margin-top: 15px;
}

.detail-row-col {
  padding-right: 20px;
  height: 55px;
  background-color: #e9e9eb;
  margin-bottom: 1px;
  padding-top: 4px;
}

.detail-row-col-flex {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: top;
  text-align: center;
  padding-top: 8px !important;
}
</style>
