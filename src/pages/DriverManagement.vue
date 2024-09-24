<template>
  <el-card style="height: 100%" :body-style="{ padding: '6px' }">
    <template #header>
      <PageTop useType="DriverManagement" />
    </template>
    <el-table
      :data="tableData"
      stripe="true"
      :default-sort="{ prop: 'bron_date', order: 'ascending' }"
      :header-row-style="{ 'font-size': '13px', color: '#000088' }"
      style="width: 100%; font-size: 12px; height: 550px"
      border
      v-loading="loadingTableData"
      :element-loading-text="loadingTableText"
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(122, 122, 122, 0.4)"
    >
      <el-table-column fixed prop="name" label="姓名" width="100" />
      <el-table-column label="" width="60" fixed>
        <template #default="scope">
          <el-image
            :src="baseUrl.host + '/upload/files/' + scope.row.id + '.jpg'"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[baseUrl.host + '/upload/files/' + scope.row.id + '.jpg']"
            :initial-index="4"
            fit="cover"
          >
            <template #error>
              <div>
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="profile_code" label="档案编号" width="120" />
      <el-table-column prop="mobile" label="电话" width="120" />
      <el-table-column prop="idcard" label="身份证号" width="150" />
      <el-table-column prop="bron_date" label="出生日期" sortable width="120" />
      <el-table-column prop="age" sortable label="年龄" width="120" />
      <el-table-column prop="gender" label="性别" width="120" />
      <el-table-column prop="nation" label="民族" width="120" />
      <el-table-column prop="residence" label="户籍" width="120" />
      <el-table-column prop="city" label="现住址" width="160" />
      <el-table-column prop="emergency_contact" label="家属姓名" width="120" />
      <el-table-column prop="emergency_mobile" label="家属电话" width="120" />
      <el-table-column prop="fleet_name" label="队别" width="120" />
      <el-table-column prop="fleet_group_name" label="组别" width="120" />
      <el-table-column prop="job" label="职位" width="120" />
      <el-table-column prop="qualif_start" sortable label="从业资格证有效期始" width="170" />
      <el-table-column prop="qualif_end" sortable label="从业资格证有效期止" width="170" />
      <el-table-column prop="license_class" label="驾驶员准驾证类别" width="150" />
      <el-table-column prop="bank" label="开户行" width="120" />
      <el-table-column prop="bank_card" label="银行卡号" width="150" />
      <el-table-column prop="joined_date" sortable label="劳动合同开始日期" width="160" />
      <el-table-column prop="departure_date" sortable label="劳动合同截至日期" width="160" />
      <el-table-column label="操作" width="100" fixed="right">
        <template #default="scope">
          <el-row>
            <el-col :span="12">
              <el-button link size="small" type="primary" @click="openDetail(scope.row)"
                >详情</el-button
              >
            </el-col>
            <el-col :span="12">
              <el-popconfirm
                title="确定要删除这条记录吗?"
                @confirm="confirmDeleteEvent(scope.row.id)"
              >
                <template #reference>
                  <el-button link size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </el-col>
          </el-row>
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
  <el-dialog v-model="dialogUploadVisible" title="司机数据导入" width="800">
    <template #header="{ titleId }">
      <div class="my-header">
        <h4 :id="titleId" style="font-size: 16px; color: black">司机数据导入</h4>
      </div>
    </template>
    <el-upload
      ref="upload"
      drag
      :action="uploadUrl"
      :limit="1"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :auto-upload="false"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text" style="font-size: 13px">
        拖拽至此&nbsp;或&nbsp;<em>点击选择</em>
      </div>
      <template #tip>
        <div class="el-upload__tip text-red" style="color: #bbb">上传的文件请勿超过3MB</div>
      </template>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogUploadVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUpload"> 上传 </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogDriverInfoVisible"
    title="驾驶员信息"
    width="800"
    style="margin-top: 60px"
    @closed="onCancelClick"
  >
    <el-scrollbar>
      <el-form
        ref="ruleFormRef"
        style="height: 500px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        :size="formSize"
        status-icon
      >
        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex" style="height: 150px">
            相片
          </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white; padding: 0px">
            <!-- <el-image style="width: 150px; height: 150px"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /> -->
            <el-upload
              class="el-upload"
              :action="uploadAvatarUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :disabled="editable"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 姓名 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="name">
              <el-input v-model="ruleForm.name" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 档案编号 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="profileCode">
              <el-input v-model="ruleForm.profileCode" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 电话 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="mobile">
              <el-input v-model="ruleForm.mobile" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 身份证 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="idcard">
              <el-input v-model="ruleForm.idcard" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 出生日期 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="bronDate">
              <el-date-picker
                v-model="ruleForm.bronDate"
                type="date"
                placeholder="Pick a day"
                :disabled="editable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 年龄 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="age">
              <el-input v-model="ruleForm.age" :disabled="editable" type="number" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 性别 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="gender">
              <el-select v-model="ruleForm.gender" style="width: 180px" :disabled="editable">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 民族 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="nation">
              <el-input v-model="ruleForm.nation" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 户籍 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="residence">
              <el-input v-model="ruleForm.residence" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex" style="height: 100px">
            现住址
          </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white; height: 100px">
            <el-form-item prop="city">
              <el-input
                v-model="ruleForm.city"
                type="textarea"
                :autosize="{ minRows: 4 }"
                :disabled="editable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 家属姓名 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="emergencyContact">
              <el-input v-model="ruleForm.emergencyContact" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 家属电话 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="emergencyMobile">
              <el-input v-model="ruleForm.emergencyMobile" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 队别 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="fleetName">
              <el-input v-model="ruleForm.fleetName" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 组别 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="fleetGroupName">
              <el-input v-model="ruleForm.fleetGroupName" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 职位 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="job">
              <el-input v-model="ruleForm.job" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 资格证有效期 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="qualifDate">
              <el-date-picker
                v-model="ruleForm.qualifDate"
                type="daterange"
                range-separator="至"
                start-placeholder="起始日期"
                end-placeholder="截止日期"
                :disabled="editable"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 驾驶员准驾证类别 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="licenseClass">
              <el-input v-model="ruleForm.licenseClass" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 开户行 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="bank">
              <el-input v-model="ruleForm.bank" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 银行卡号 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="bankCard">
              <el-input v-model="ruleForm.bankCard" :disabled="editable" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" class="detail-row-col detail-row-col-flex"> 劳动合同 </el-col>
          <el-col :span="16" class="detail-row-col" style="background-color: white">
            <el-form-item prop="contractDate">
              <el-date-picker
                v-model="ruleForm.contractDate"
                type="daterange"
                range-separator="至"
                :disabled="editable"
                start-placeholder="起始日期"
                end-placeholder="截止日期"
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
        <el-button type="primary" @click="onEditClick"> {{ editBtnLabel }} </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="driverManagement">
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'
import PageTop from '@/components/PageTop.vue'
import AddDialog from '@/components/ScatteredServiceNewDialog.vue'
import { useUserStore } from '@/store/user'
import { dispatchOrderStore } from '@/store/DispatchOrders'
import { format } from 'date-fns'
import axios from 'axios'
import emitter from '@/utils/emitter'
import { baseUrlStore } from '@/store/BaseUrl'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { UploadFilled, Plus, Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const loadingTableData = ref(true)
var loadingTableText = ref('数据加载中...')

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

var upload = ref<UploadInstance>()
var baseUrl = baseUrlStore()

interface driverInfo {
  id: number
  name: string
  job: string
  mobile: string
  gender: string
  age: number | string
  city: string
  driving_age: number
  idcard: string
  driver_license: number
  emergency_contact: string
  emergency_mobile: string
  no_criminal_checks: number
  road_operation_credential: number
  joined_date: Date | string
  departure_date: Date | string
  create_date: Date | string
  update_date: Date | string
  account_id: number
  fleet_id: number
  fleet_group_id: number
  is_fleet_chief: number
  is_fleet_g_chief: number
  profile_code: string
  residence: string
  qualif_start: Date | string
  qualif_end: Date | string
  license_class: string
  fleet_name: string
  fleet_group_name: string
  bank: string
  bank_card: string
  nation: string
  bron_date: Date | string
}

var userStore = useUserStore()

var axio = axios.create({
  baseURL: baseUrl.host,
  timeout: 3000,
  headers: {
    Authorization: userStore.accessToken
  }
})

const uploadUrl = baseUrl.host + '/upload/handle'
var uploadAvatarUrl = ref('')

var tableDataArr = Array()
var tableData = ref(tableDataArr)

let timer: number | undefined

var dialog = ref(false)
var loading = ref(false)
var currentPage = ref(1)
var pageSize = ref(15)
var dialogUploadVisible = ref(false)
var dialogDriverInfoVisible = ref(false)
var editable = ref(true)
var showCancelReset = ref(false)

var currentSelectDriverId = ref('')
var fuzzySearchKeyword = ref('')

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

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  dialogUploadVisible.value = false
  loadingTableData.value = true
  loadingTableText.value = '数据上传成功，正在解析...'
  const pageLoadUrl = 'upload/parse/0/import.xlsx'
  axio
    .post(pageLoadUrl)
    .then(function (response) {
      if (response.data.code == 200) {
        loadOrderList(1, pageSize.value)
      }
    })
    .catch(function (error) {
      console.log('解析异常')
      loadingTableData.value = false
      loadingTableText.value = '数据加载中...'
    })
}

const submitUpload = () => {
  upload.value!.submit()
}

emitter.on('uploadDialogSwitch', (value: any) => {
  dialogUploadVisible.value = value
})

emitter.on('refreshList', () => {
  loadOrderList(currentPage.value, pageSize.value)
})

emitter.on('addDriver', () => {
  addDriver()
})

emitter.on('refreshFuzzySearchKeyword', (newWord: any) => {
  fuzzySearchKeyword.value = newWord
})

emitter.on('driverPageFuzzySearch', () => {
  loadOrderList(currentPage.value, pageSize.value)
})

onMounted(() => {
  loadOrderList(currentPage.value, pageSize.value)
})

onUnmounted(() => {
  emitter.off('uploadDialogSwitch')
  emitter.off('refreshList')
  emitter.off('addDriver')
  emitter.off('refreshFuzzySearchKeyword')
  emitter.off('driverPageFuzzySearch')
})

const onPageChange = function (pNum: number, pSize: number) {

  loadOrderList(pNum, pageSize.value)

}

const loadOrderList = function (pNum: number, pSize: number) {
  currentPage.value = pNum
  pageSize.value = pSize
  loadingTableData.value = true

  let loadPageUrl = ''
  if(fuzzySearchKeyword.value.length != 0) {
    loadPageUrl = '/driver/fuzzy/' + fuzzySearchKeyword.value + '/' + currentPage.value + '/' + pageSize.value
  } else {
    loadPageUrl = '/driver/list/' + currentPage.value + '/' + pageSize.value
  }

  axio
    .post(loadPageUrl)
    .then(function (response) {
      if (response.data.code == 200) {
        let dataList = response.data.data
        for (let i = 0; i < dataList.length; i++) {
          let item = dataList[i] as driverInfo
          if (item.joined_date != null && item.joined_date != '')
            item.joined_date = format(item.joined_date, 'yyyy-MM-dd')
          if (item.departure_date != null && item.departure_date != '')
            item.departure_date = format(item.departure_date, 'yyyy-MM-dd')
          if (item.bron_date != null && item.bron_date != '')
            item.bron_date = format(item.bron_date, 'yyyy-MM-dd')
          if (item.qualif_start != null && item.qualif_start != '')
            item.qualif_start = format(item.qualif_start, 'yyyy-MM-dd')
          if (item.qualif_end != null && item.qualif_end != '')
            item.qualif_end = format(item.qualif_end, 'yyyy-MM-dd')
        }
        tableData.value = dataList
        loadingTableData.value = false
        loadingTableText.value = '数据加载中...'
      }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const onTabRightBtnClick = function (rowItemCode: string) {}

//form --------------------------------------------------------------

import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  id: number
  name: string
  job: string
  idcard: string
  mobile: string
  gender: string
  age: number
  city: String
  driverLicense: number
  emergencyContact: string
  emergencyMobile: string
  joinedDate: Date | string
  departureDate: Date | string
  contractDate: Date[] | string
  profileCode: string
  residence: string
  qualifEnd: Date | string
  qualifStart: Date | string
  qualifDate: Date[] | string
  licenseClass: string
  fleetName: string
  fleetGroupName: string
  bank: string
  bankCard: string
  nation: string
  bronDate: Date | string
  createDate: Date | string
  updateDate: Date | string
  deleted: number
}

const today = new Date()
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  job: '',
  mobile: '',
  gender: '',
  idcard: '',
  city: '',
  emergencyContact: '',
  emergencyMobile: '',
  contractDate: [
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    new Date(2099, today.getMonth(), today.getDate())
  ],
  profileCode: '',
  residence: '',
  qualifDate: [
    new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    new Date(2099, today.getMonth(), today.getDate())
  ],
  licenseClass: '',
  fleetName: '',
  fleetGroupName: '',
  bank: '',
  bankCard: '',
  nation: '',
  bronDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  deleted: 0
})

const locationOptions = ['Home', 'Company', 'School']

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, trigger: 'blur' }],
  mobile: [{ required: true, trigger: 'blur' }],
  job: [{ required: true, trigger: 'blur' }],
  idcard: [{ required: true, trigger: 'blur' }],
  city: [{ required: true, trigger: 'blur' }],
  nation: [{ required: true, trigger: 'blur' }],
  profileCode: [{ required: true, trigger: 'blur' }],
  emergencyContact: [{ required: true, trigger: 'blur' }],
  emergencyMobile: [{ required: true, trigger: 'blur' }],
  bronDate: [
    {
      type: 'date',
      required: true,
      trigger: 'blur'
    }
  ],
  licenseClass: [{ required: true, trigger: 'blur' }],
  fleetName: [{ required: true, trigger: 'blur' }],
  // fleetGroupName: [
  //     { required: false, message: 'Please input Activity name', trigger: 'blur' },
  // ],
  gender: [
    {
      required: true,
      trigger: 'change'
    }
  ],
  bank: [{ required: true, trigger: 'blur' }],
  bankCard: [{ required: true, trigger: 'blur' }],
  age: [{ required: true, trigger: 'blur' }]
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
  label: `${idx + 1}`
}))

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const imageUrl = ref('')

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }

  return true
}

var currentFetchedObj = {}

const openDetail = function (row: any) {
  let driverVo = row
  currentSelectDriverId.value = driverVo.id
  dialogDriverInfoVisible.value = true

  uploadAvatarUrl.value = baseUrl.host + '/upload/handleAvatar/' + currentSelectDriverId.value
  imageUrl.value = baseUrl.host + '/upload/files/' + currentSelectDriverId.value + '.jpg'

  const pageLoadUrl = 'driver/3'

  axio
    .post(pageLoadUrl, driverVo)
    .then(function (response) {
      currentFetchedObj = response.data.data
      fillRuleObj(currentFetchedObj)
    })
    .catch(function (error) {
      console.log(error, '解析异常')
      loadingTableData.value = false
      loadingTableText.value = '数据加载中...'
    })
}

const fillRuleObj = (d: any) => {
  console.log(d)
  ruleForm.id = d.id
  ruleForm.name = d.name
  ruleForm.job = d.job
  ruleForm.age = d.age
  ruleForm.residence = d.residence
  ruleForm.idcard = d.idcard
  ruleForm.mobile = d.mobile
  ruleForm.gender = d.gender
  ruleForm.city = d.city
  ruleForm.emergencyContact = d.emergencyContact
  ruleForm.emergencyMobile = d.emergencyMobile
  ruleForm.joinedDate = d.joinedDate
  ruleForm.departureDate = d.departureDate
  ruleForm.contractDate = [d.joinedDate, d.departureDate]
  ruleForm.qualifStart = d.qualifStart
  ruleForm.qualifEnd = d.qualifEnd
  ruleForm.qualifDate = [d.qualifStart, d.qualifEnd]
  ruleForm.profileCode = d.profileCode
  ruleForm.licenseClass = d.licenseClass
  ruleForm.fleetName = d.fleetName
  ruleForm.fleetGroupName = d.fleetGroupName
  ruleForm.bank = d.bank
  ruleForm.bankCard = d.bankCard
  ruleForm.nation = d.nation
  ruleForm.bronDate = d.bronDate
  ruleForm.createDate = d.createDate
}

var editBtnLabel = ref('编辑')
const onEditClick = function () {
  if (editBtnLabel.value == '编辑') {
    showCancelReset.value = true
    editable.value = !editable.value
    editBtnLabel.value = '保存'
  } else {
    onSaveClick()
  }
}

const onCancelClick = () => {
  if (editBtnLabel.value == '保存') {
    editable.value = !editable.value
    editBtnLabel.value = '编辑'
    onRestClick()
    showCancelReset.value = false
    uploadAvatarUrl.value = ''
  }
}

const onRestClick = () => {
  fillRuleObj(currentFetchedObj)
}

const onSaveClick = () => {
  ruleForm.joinedDate = ruleForm.contractDate[0]
  ruleForm.departureDate = ruleForm.contractDate[1]
  ruleForm.qualifStart = ruleForm.qualifDate[0]
  ruleForm.qualifEnd = ruleForm.qualifDate[1]
  ruleForm.updateDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const updateUrl = 'driver/2'

  axio
    .post(updateUrl, ruleForm)
    .then(function (response) {
      if (response.data.code == 200) {
        ElMessage({
          message: '保存成功',
          type: 'success'
        })

        editable.value = !editable.value
        editBtnLabel.value = '编辑'
        showCancelReset.value = false
        openDetail({ id: response.data.data.id })
      }
    })
    .catch(function (error) {
      console.log(error, '解析异常')
      loadingTableData.value = false
      loadingTableText.value = '数据加载中...'
    })
}

// form ----------------------------------------------------------------------------------------------

const confirmDeleteEvent = (id: number) => {
  const pageLoadUrl = 'driver/1'

  axio
    .post(pageLoadUrl, { id: id })
    .then(function (response) {
      if (response.data.code == 200) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })

        loadOrderList(currentPage.value, pageSize.value)
      }
    })
    .catch(function (error) {
      console.log(error, '解析异常')
      loadingTableData.value = false
      loadingTableText.value = '数据加载中...'
    })
}

const addDriver = () => {
  editBtnLabel.value = '保存'
  dialogDriverInfoVisible.value = true
  editable.value = false
  imageUrl.value = ''
  Object.assign(ruleForm, {
    name: '',
    job: '',
    mobile: '',
    gender: '男',
    idcard: '',
    city: '',
    age: '',
    emergencyContact: '',
    emergencyMobile: '',
    contractDate: [
      new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      new Date(2099, today.getMonth(), today.getDate())
    ],
    profileCode: '',
    residence: '',
    qualifDate: [
      new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      new Date(2099, today.getMonth(), today.getDate())
    ],
    licenseClass: '',
    fleetName: '',
    fleetGroupName: '',
    bank: '',
    bankCard: '',
    nation: '',
    bronDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    deleted: 0,
    createDate: new Date(today.getFullYear(), today.getMonth(), today.getDate())
  })
}
</script>

<style scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.detail-row-col {
  padding-right: 20px;
  height: 40px;
  background-color: #e9e9eb;
  margin-bottom: 1px;
  padding-top: 4px;
}

.detail-row-col-flex {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  text-align: center;
  padding-top: 0px !important;
}

.avatar {
  width: 150px;
  height: 150px;
  display: block;
}

.el-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>
