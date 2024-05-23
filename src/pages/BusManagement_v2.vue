<template>

  <el-card style="height: 100%;" :body-style="{ padding: '6px' }">

    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <el-scrollbar height="700">
          <el-input style="width: 100%" v-model="filterText" placeholder="筛选" :suffix-icon="Search" />
          <el-tree class="tre" :data="tree" ref="elTreeRef" :props="defaultProps" :load="loadNode" :lazy="false"
            node-key="id" :default-expanded-keys="lastExpandIds" :filter-node-method="filterNode"
            :expand-on-click-node="false" :default-expand-all="false" @node-click="handleNodeClick">

            <template #default="{ node, data }">
              <span>
                <span>{{ node.label }}</span>
                <span>
                  <a v-if="node.level === 2 || node.level === 3" style="margin-left: 5px" @click="append(node, data)">
                    <el-icon>
                      <FolderAdd color="rgb(50, 93, 220)" />
                    </el-icon> </a>
                  <a v-if="node.level === 4 || node.level === 3" style="margin-left: 5px" @click="remove(node, data)">
                    <el-icon>
                      <Delete color="rgb(189, 172, 172)" />
                    </el-icon> </a>
                </span>
              </span>
            </template>

          </el-tree>
        </el-scrollbar>
      </el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <el-scrollbar height="700">
          <el-table style="font-size: 12px; width: 100%; height: 650px;" :header-cell-style="tableHeaderCellStyle"
            :data="tableData" stripe
            :cell-style="tableCellStyle">
            <el-table-column fixed prop="code" label="序号" width="80" />
            <el-table-column fixed prop="plate" label="车牌号" width="120" />
            <el-table-column fixed prop="real_time_state" label="状态" width="80">
                    <template #default="scope">
                        <el-tag :type="scope.row.tag === '在线' ? 'success' : 'info'" disable-transitions>
                            {{ scope.row.tag }}</el-tag>
                    </template>
                </el-table-column>
            <el-table-column prop="vin" label="车架号" width="120" />
            <el-table-column prop="engine" label="发动机号" width="120" />
            <el-table-column prop="drivers" label="对应司机" width="120" />
            <el-table-column prop="brand" label="品牌" width="120" />
            <el-table-column prop="accommodate" label="核定载客" width="120" />
            <el-table-column prop="issue_certificate_date" label="发证日期" width="120" />
            <el-table-column prop="regist_certificate" label="登记证号" width="120" />
            <el-table-column prop="etc_card" label="ETC卡号" width="120" />
            <el-table-column label="交强险">
              <el-table-column prop="insurer_0" label="保险公司名称" width="120" />
              <el-table-column prop="insurance_policy_no_0" label="保单号" width="120" />
              <el-table-column prop="insurance_start_time_0" label="保险时间自" width="120" />
              <el-table-column prop="insurance_end_time_0" label="保险时间至" width="120" />
              <el-table-column prop="casualties_limit" label="死亡伤残赔偿限额" width="180" />
              <el-table-column prop="medical_limit" label="医疗费用赔偿限额" width="180" />
              <el-table-column prop="property_loss_limit" label="财产损失赔偿限额" width="180" />
              <el-table-column prop="casualties_limit_irresponsibility" label="无责任死亡伤残赔偿限额" width="180" />
              <el-table-column prop="medical_limit_irresponsibility" label="无责任医疗费用赔偿限额" width="180" />
              <el-table-column prop="property_loss_limit_irresponsibility" label="无责任财产损失赔偿限额" width="180" />
            </el-table-column>
            <el-table-column label="承运人责任险">
              <el-table-column prop="insurer_1" label="保险公司名称" width="120" />
              <el-table-column prop="insurance_policy_no_1" label="保单号" width="120" />
              <el-table-column prop="insurance_start_time_1" label="保险时间自" width="120" />
              <el-table-column prop="insurance_end_time_1" label="保险时间至" width="120" />
              <el-table-column prop="single_seat_insurance_amount" label="单座保额" width="120" />
            </el-table-column>
            <el-table-column label="商业险">
              <el-table-column prop="insurer_2" label="保险公司名称" width="120" />
              <el-table-column prop="insurance_policy_no_2" label="保单号" width="120" />
              <el-table-column prop="insurance_start_time_2" label="保险时间自" width="120" />
              <el-table-column prop="insurance_end_time_2" label="保险时间至" width="120" />
              <el-table-column prop="damage_insurance_amount" label="车损保额" width="120" />
              <el-table-column prop="three_insurance_amount" label="三者保额" width="120" />
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template #default="props">
                <el-button link type="primary" size="small" @click="dialog = true">
                  详情
                </el-button>
                <el-divider style="color: black;" direction="vertical" border-style="dashed" />
                <el-button link type="primary" size="small" @click.prevent="editItem">
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
      </el-col>
    </el-row>

  </el-card>

  <el-drawer v-model="dialog" title="I have a nested form inside!" :before-close="handleClose" direction="rtl" size="80%">
        <div>
            <BusDetail />
            <!-- <div class="demo-drawer__footer">
                <el-button @click="cancelForm">Cancel</el-button>
                <el-button type="primary" :loading="loading" @click="onClick">
                    {{ loading ? 'Submitting ...' : 'Submit' }}
                </el-button>
            </div> -->
        </div>
    </el-drawer>

    <el-dialog v-model="dialogTableVisible" width="70%" :show-close="true" close-on-click-modal="false" draggable
        style="min-width: 800px;">
      
        <BusEdit />
      
    </el-dialog>

</template>


<script setup lang="ts" name="bus_management">

import { ElDrawer, ElMessageBox } from 'element-plus'

import {
  DocumentAdd,
  CirclePlus,
  RemoveFilled,
  Delete,
  FolderAdd,
  Plus
} from '@element-plus/icons-vue'

import BusDetail from '../components/BusDetail.vue'
import BusEdit from '@/components/BusInfoEdit.vue'

import type Node from 'element-plus/es/components/tree/src/model/node'
import { ref, watch, reactive, type VNodeChild, onMounted } from 'vue'
import { treeDatav2, type VehicleMngTreev2 } from '@/store/Vehicle_v2'
import { Search } from '@element-plus/icons-vue'
import { ElTree, type TreeNode } from 'element-plus'

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

const formLabelWidth = '80px'
let timer: number | undefined
const dialog = ref(false)
const loading = ref(false)

const onClick = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        dialog.value = false
    }, 200)
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
                }, 200)
            }, 300)
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

// left tree
const elTreeRef = ref<InstanceType<typeof ElTree>>()
const treeStore = treeDatav2()
const tree = ref(treeStore.list)
const filterText = ref('')
const lastExpandIds = ref([1, 11, 111, 112])

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
    return resolve([{ id: 0.1, label: tree.value[0].label }, { id: 0.2, label: tree.value[1].label }])
  } else if (node.level === 1) {
    let list = tree.value
    list.forEach((val, idx, array) => {
      let subList = val.children
      if (node.data.label === val.label) {
        data = subList
      }
    });
  } else if (node.level === 2) {
    let list = tree.value
    list.forEach((val, idx, array) => {
      let subList = val.children
      subList.forEach((subVal, idx, array) => {
        if (node.data.label === subVal.label) {
          data = subVal.children
        }
      })
    });
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
    });
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


const append = (node: Node, data: Tree) => {

  if (node.level === 1) {
    alert(node.level)
  } else {
    const newChild = { label: 'testtest', children: [] }
    if (!data.children) {
      data.children = []
    }
    data.children.push(newChild)
    tree.value = [...tree.value]
  }
}

const remove = (node: Node, data: Tree) => {
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  tree.value = [...tree.value]
}

const handleNodeClick = (nodeObj: Node, treeNode: TreeNode) => {

  if (treeNode.level === 3) {
    return;// 输出右侧车辆列表信息
  }

}

// left tree end


// table
const tableCellStyle = (data: { row: any, column: any, rowIndex: number, columnIndex: number }) => {
  return  { 'text-align': 'center'};
}

const tableHeaderCellStyle = (data: { row: any, column: any, rowIndex: number, columnIndex: number }) => {
  let cssProp = { 'text-align': 'center', 'background-color': 'white' , 'width':'180'};
  if (data.column.label === '交强险') {
    cssProp['background-color'] = 'pink';
  }
  return cssProp;
}

const tableData = ref([{
    code: '000001',
    plate: '京ABD790',
    tag: '在线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '在线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}, {
    code: '000001',
    plate: '京ABD790',
    tag: '离线',
    vin: 'HPB0000010121',
    engine: 'HK0988u',
    drivers: '刘启夏，段艳红',
    brand: '宇通',
    stats: '待调度员确认',
    accommodate: '46',
    issue_certificate_date: '2020-10-13',
    regist_certificate: 'J109L887',
    etc_card: 'JD1221',
    insurer_0: '太平洋保险',
    insurance_policy_no_0: 'JK120097',
    insurance_start_time_0: '2020-02-11',
    insurance_end_time_0: '2021-02-11',
    casualties_limit: '1,000,000',
    medical_limit: '200,000',
    property_loss_limit: '5,000,000',
    casualties_limit_irresponsibility: '2,000,000',
    medical_limit_irresponsibility: '100,000',
    property_loss_limit_irresponsibility: '8,000,000',
    insurer_1: '中国平安保险',
    insurance_policy_no_1: 'JK120097',
    insurance_start_time_1: '2020-02-11',
    insurance_end_time_1: '2021-02-11',
    single_seat_insurance_amount: '50,000',
    insurer_2: '奇兰保险',
    insurance_policy_no_2: 'JK120097',
    insurance_start_time_2: '2020-02-11',
    insurance_end_time_2: '2020-02-11',
    damage_insurance_amount: '60,000',
    three_insurance_amount: '50,000'
}])

// table end 


const dialogTableVisible = ref(false)

const editItem = () => {
    dialogTableVisible.value = true
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
</style>
