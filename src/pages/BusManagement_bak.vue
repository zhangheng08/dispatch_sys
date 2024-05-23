<!-- <template>
  <div>
    <el-container>
      <el-aside class="as">
        <el-card style="width: 100%; height: 100%" :body-style="{ padding: '10px 10px 10px 10px' }">
          <el-scrollbar>
            <el-input style="width: 230px" v-model="filterText" size="small" placeholder="筛选" :suffix-icon="Search" />
            <el-tree class="tre" :data="tree" ref="elTreeRef" :props="defaultProps" :load="loadNode" show-checkbox
              :lazy="true" :filter-node-method="filterNode" />
          </el-scrollbar>
        </el-card>
      </el-aside>
      <el-main class="m">
        <el-row :gutter="10" class="r">
          <el-col :xs="24" :sm="24" :md="24" :lg="14" class="r-c">
            <el-card class="r-c-d" :body-style="{ padding: '10px' }">
              <el-row>
                <el-col :span="24" class="chart-1-t">
                  车辆状态：更新时间(2024-03-05 12:23:50)
                </el-col>
                <el-col :span="8">
                  <div id="chart_1" class="chart-1"></div>
                </el-col>
                <el-col :span="16">
                  
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="10" class="r-c">
            <el-card class="r-c-d" :body-style="{ padding: '10px' }">
              <el-row>
                <el-col :span="24" class="chart-1-t">
                  车辆状态：更新时间(2024-03-05 12:23:50)
                </el-col>
                <el-col :span="8">
                  
                </el-col>
                <el-col :span="16">
                  <div class="chart-1-des-v">
                    <el-descriptions direction="horizontal" size="small" class="chart-1-des" :column="2" border>
                      <el-descriptions-item width="60px">
                        <template #label>
                          <div>
                            <el-icon>
                              <user />
                            </el-icon>
                            司机
                          </div>
                        </template>
                        李凯
                      </el-descriptions-item>
                      <el-descriptions-item width="60px">
                        <template #label>
                          <div>
                            <el-icon>
                              <iphone />
                            </el-icon>
                            手机
                          </div>
                        </template>
                        13896542236
                      </el-descriptions-item>
                      <el-descriptions-item>

                        <template #label>
                          <div>
                            <el-icon>
                              <Stopwatch />
                            </el-icon>
                            电池
                          </div>
                        </template>
                        <el-tag size="small" type="success">运行中</el-tag>
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template #label>
                          <div>
                            <el-icon>
                              <Van />
                            </el-icon>
                            状态
                          </div>
                        </template>
                        <el-tag size="small" type="success">行驶中</el-tag>
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template #label>
                          <div>
                            <el-icon>
                              <location />
                            </el-icon>
                            路线
                          </div>
                        </template>
                        高米店南-中关村大街(上行)
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template #label>
                          <div>
                            <el-icon>
                              <Tickets />
                            </el-icon>
                            工单
                          </div>
                        </template>
                        HPG002155861107
                      </el-descriptions-item>
                      <el-descriptions-item>
                        <template #label>
                          <div>
                            <el-icon>
                              <Position />
                            </el-icon>
                            位置
                          </div>
                        </template>
                        中关村大街附近(116.330065, 39.949641)
                      </el-descriptions-item>
                    </el-descriptions>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" class="r-c">
            <el-card class="r-c-d">
              <el-row :gutter="10">
                <el-col :span="9">
                  <el-row>
                    <el-col :span="24" class="line-his-h-c">
                      <span class="line-his-h">历史线路轨迹</span>
                    </el-col>
                    <el-col :span="24">
                      <el-table highlight-current-row stripe :data="pathes" class="line-his-t" fit="true">
                        <el-table-column fixed prop="line_code" label="编号" width="50"/>
                        <el-table-column fixed prop="line_name" label="线路名称" width="170" />
                        <el-table-column prop="line_type" label="线路类型" width="80" />
                        <el-table-column prop="line_driver" label="驾驶员" width="80" />
                        <el-table-column sortable prop="line_date" label="日期" width="100" />
                        <el-table-column prop="line_start" label="起点" width="100" />
                        <el-table-column prop="line_end" label="终点" width="100" />
                      </el-table>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="15">
                  <BMap />
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts" name="router_customization">
import type Node from 'element-plus/es/components/tree/src/model/node'
import { ref, watch, type VNodeChild, onMounted } from 'vue'
import { treeData, type VehicleMngTree } from '@/store/Vehicle'
import { pathData, type VehiclePath } from '@/store/VehiclePathes'
import { Search } from '@element-plus/icons-vue'
import { ElTree } from 'element-plus'
import BMap from '../components/BMap.vue'

import {
  Iphone,
  Location,
  Stopwatch,
  Van,
  Position,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'

const elTreeRef = ref<InstanceType<typeof ElTree>>()
const treeStore = treeData()
const tree = ref(treeStore.list)
const filterText = ref('')

const pathStore = pathData()
const pathes = ref(pathStore.list)

const defaultProps = {
  children: 'children',
  label: 'label'
}

interface Tree {
  [key: string]: any
}

const loadNode = (node: Node, resolve: (data: VehicleMngTree[]) => void) => {
  let data: VehicleMngTree[] = []

  if (node.level === 0) {
    return resolve([{ label: tree.value[0].label }, { label: tree.value[1].label }])
  } else if (node.level === 1) {
    if (node.data.label === tree.value[0].label) {
      data = [
        { label: tree.value[0].children[0].label },
        { label: tree.value[0].children[1].label }
      ]
    } else if (node.data.label === tree.value[1].label) {
      data = [
        { label: tree.value[1].children[0].label },
        { label: tree.value[1].children[1].label }
      ]
    }
  } else if (node.level === 2) {
    if (node.data.label === tree.value[0].children[0].label) {
      data = tree.value[0].children[0].children
    } else if (node.data.label === tree.value[1].children[1].label) {
      data = tree.value[0].children[1].children
    }
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

// ************************ echarts ********************************

import * as echarts from 'echarts/core';
import { GaugeChart, type GaugeSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GaugeChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;


onMounted(() => {

  var chartDom = document.getElementById('chart_1');
  console.log(chartDom)

  var myChart = echarts.init(chartDom)!;
  var option: EChartsOption;

  const gaugeData = [
    {
      value: 20,
      name: '电量剩余',
      title: {
        offsetCenter: ['0%', '-58%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-39%'],
        formatter: '{value}%'
      }
    },
    {
      value: 40,
      name: '氢气余量',
      title: {
        offsetCenter: ['0%', '-10%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '9%'],
        formatter: '{value}L'
      }
    },
    {
      value: 60,
      name: '剩余里程',
      title: {
        offsetCenter: ['0%', '38%']
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '58%'],
        formatter: '{value}km'
      }
    }
  ];

  option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#464646'
          }
        },
        axisLine: {
          lineStyle: {
            width: 20
          }
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          distance: 50
        },
        data: gaugeData,
        title: {
          fontSize: 12
        },
        detail: {
          width: 20,
          height: 5,
          fontSize: 13,
          color: 'inherit',
          borderColor: 'inherit',
          borderRadius: 16,
          borderWidth: 0,
          formatter: '{value}%'
        }
      }
    ]
  };

  setInterval(function () {
    gaugeData[0].value = +(Math.random() * 100).toFixed(0);
    gaugeData[1].value = +(Math.random() * 100).toFixed(0);
    gaugeData[2].value = +(Math.random() * 100).toFixed(0);
    myChart.setOption<echarts.EChartsOption>({
      series: [
        {
          data: gaugeData,
          pointer: {
            show: false
          }
        }
      ]
    });
  }, 30000);

  option && myChart.setOption(option);

});

</script>

<style scoped>
.as {
  width: 18%;
  min-width: 260px;
}

.m {
  width: 80%;
  padding: 0px 20px 0px 20px;
}

.r {
  height: 100%;
}

.tre {
  max-width: 260px;
  background-color: rgb(253, 252, 249);
  font-size: 12px;
  color: black;
  height: 650px;
}

.r-c:not(:last-child) {
  margin-bottom: 10px;
}

.r-c-d {
  width: 100%;
  min-width: 480px;
  height: 100%;
}

.line-his-h-c {
  border: 1px dotted rgb(74, 163, 226);
  background-color: rgb(101, 186, 247);
}

.line-his-h {
  font-size: 13px;
  color: white;
  line-height: 40px;
  text-align: center;
  height: 40px;
  margin-left: 15px;
}

.line-his-t {
  width: 100%;
  border: 1px dotted gainsboro;
  font-size: 12px;
  height: 340px;
  cursor: pointer;
}

.chart-1 {
  width: 220px;
  height: 200px;
  margin-left: -20px;
}

.chart-1-t {
  font-size: 13px;
  color: black;
  border-bottom: 1px dotted gainsboro;
  padding: 10px;
  width: 100%;
}

.chart-1-des-v {
  padding-left: 15px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
}
</style> -->
