<template>
  <div>
    <el-container>
      <el-aside class="as">
        <el-card style="width: 100%; height: 100%" :body-style="{ padding: '10px 10px 10px 10px' }">
          <el-scrollbar>
            <el-input style="width: 180px" v-model="filterText" size="small" placeholder="筛选" :suffix-icon="Search" />
            <el-tree class="tre" :data="tree" ref="elTreeRef" :props="defaultProps" :load="loadNode" show-checkbox
              :lazy="true" :filter-node-method="filterNode" />
          </el-scrollbar>
        </el-card>
      </el-aside>
      <el-main class="m">
        <el-row class="r">
          <el-col :xs="24" :sm="24" :md="24" :lg="8"  style="min-width: 400px;">
            <el-card :body-style="{ padding: '10px' }">
              <el-row justify="space-between" style="height: 60px; border-bottom: 1px dotted rgb(222, 222, 222);">
                <el-col :span="6">
                  <el-statistic title="用氢里程" :value="38500" :value-style="{ color: 'rgb(26, 122, 232)' }" />
                </el-col>
                <el-col :span="1" hidden-md-only>
                  <el-divider border-style="dotted" direction="vertical"
                    style="height: 40px; margin-top: 8px; border-color: rgb(222, 222, 222);" />
                </el-col>
                <el-col :span="6">
                  <el-statistic title="总里程" :value="53000" />
                </el-col>
                <el-col :span="1" hidden-md-only>
                  <el-divider border-style="dotted" direction="vertical"
                    style="height: 40px; margin-top: 8px; border-color: rgb(222, 222, 222);" />
                </el-col>
                <el-col :span="6">
                  <div style="width:100%; height: 100%; display: flex; justify-self: center; align-items: center;">
                    <el-badge :value="3">
                      <el-button size="small" link icon="Warning" width="20">警告</el-button>
                    </el-badge>
                    <el-badge :value="5" type="warning">
                      <el-button size="small" link icon="Warning">提醒</el-button>
                    </el-badge>
                  </div>
                </el-col>
              </el-row>
              <el-row justify="space-between" style="height: 220px;">
                <el-col :span='12'>
                  <div id="chart_1" class="chart-1"></div>
                </el-col>
                <el-col :span='12'>
                  <div id="chart_2" class="chart-1"></div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t-h des-t">车牌号</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="7" class="des-h-v">
                  <el-tag type="primary" effect="dark">京B00012</el-tag></el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">司机</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="7" class="des-h-v">
                  <span class="des-t">刘德龙</span></el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">状态</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="7" class="des-h-v">
                  <el-tag type="primary" effect="light">行驶中</el-tag>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">燃料电池</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="7" class="des-h-v">
                  <el-tag type="success" effect="light">运行中</el-tag>
                </el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">工单</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="7" class="des-h-v">
                  <span class="des-t">BHP-2-0012588</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">线路名称</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="7" class="des-h-v">
                  <span class="des-t">高米店北-瀛海家园</span>
                </el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">当前位置</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="19" class="des-h-v">
                  <el-tag type="primary" effect="light">（116.354503,39.938009）北京市西城区车公庄大街</el-tag>
                </el-col>

                <el-col :xs="24" :sm="24" :md="24" :lg="24" class="des-h-v"
                  style="height: 50px; border-width: 0px; padding-top: 5px;">
                  <el-steps style="max-width: 600px;" :space="200" :active="1" finish-status="success">
                    <el-step status="success"><template #title><span
                          style="font-size:12px; ">高米店北</span></template></el-step>
                    <el-step status="success"><template #title><span
                          style="font-size:12px; ">公安大学</span></template></el-step>
                    <el-step status="process"><template #title><span
                          style="font-size:12px; ">融金公园</span></template></el-step>
                    <el-step><template #title><span style="font-size:12px; ">瀛海家园东</span></template></el-step>
                  </el-steps>
                </el-col>
              </el-row>

              <el-row style="margin-top: 20px;">
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">品牌</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h-v">
                  <span class="des-t">福田</span></el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">发动机号</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="9" class="des-h-v">
                  <span class="des-t">FT100GMH2-M00175</span></el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">燃料类型</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h-v">
                  <span class="des-t">氢(H<sub>2</sub>)</span></el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">ETC卡号</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="9" class="des-h-v">
                  <span class="des-t">1201230003621109</span></el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">核定载客</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h-v">
                  <span class="des-t">48</span></el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">型号</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="9" class="des-h-v">
                  <span class="des-t">BJ6116FCEVUH-3</span></el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">使用性质</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h-v">
                  <span class="des-t">公路客运</span></el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">车架号</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="9" class="des-h-v">
                  <span class="des-t">LVCB4L4D4MM002827</span></el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">发证日期</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h-v">
                  <span class="des-t">2021/10/15</span></el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">登记证号</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="9" class="des-h-v">
                  <span class="des-t">110012169068</span></el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">所有权</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="19" class="des-h-v">
                  <span class="des-t">氢动力（北京）科技服务有限公司</span></el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="5" class="des-h des-h-v">
                  <span class="des-t">制造厂</span>
                </el-col>
                <el-col :xs="12" :sm="12" :md="12" :lg="19" class="des-h-v">
                  <span class="des-t">北汽福田汽车股份有限公司</span></el-col>
              </el-row>

            </el-card>
          </el-col>

          <el-col :xs="24" :sm="24" :md="24" :lg="8" style="margin-left: 10px;">
            <el-card :body-style="{ padding: '10px' }">
              <el-row>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" style="height: 420px;">
                  <el-calendar ref="calendar" v-model="dateVal">
                    <template #header="{ date }">
                      <span>{{ date }}</span>
                      <el-button-group>
                        <!-- <el-button size="small" @click="selectDate('prev-year')">
                          Previous Year
                        </el-button> -->
                        <el-button size="small" @click="selectDate('prev-month')">
                          Previous Month
                        </el-button>
                        <el-button size="small" @click="selectDate('today')">Today</el-button>
                        <el-button size="small" @click="selectDate('next-month')">
                          Next Month
                        </el-button>
                        <!-- <el-button size="small" @click="selectDate('next-year')">
                          Next Year
                        </el-button> -->
                      </el-button-group>
                    </template>
                    <template #date-cell="{ data }">
                      <span :class="data.isSelected ? 'is-selected' : ''" style="font-size: 13px;">
                        {{ data.day.split('-').slice(1).join('-') }}
                        <!-- {{ data.isSelected ? '✔️' : '' }} -->
                      </span>
                    </template>
                  </el-calendar>
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
import type { CalendarDateType, CalendarInstance } from 'element-plus'

import {
  Iphone,
  Location,
  Stopwatch,
  Van,
  Position,
  OfficeBuilding,
  Tickets,
  User,
  Bell,
  Warning,
  ChatLineRound
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
    let list = tree.value
    list.forEach((val, idx, array) => {
      let subList = val.children
      if (node.data.label === val.label) {
        subList.forEach((subVal, idx, array) => {
          data.push({label: subVal.label})
        })
      }
    });
  } else if (node.level === 2) {
    let list = tree.value
    data = []
    list.forEach((val, idx, array) => {
      let subList = val.children
      subList.forEach((subVal, idx, array) => {
        if (node.data.label === subVal.label) {
          data = subVal.children
        }
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

// ************************ echarts ********************************

import * as echarts from 'echarts/core';
import { GaugeChart, type GaugeSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GaugeChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<GaugeSeriesOption>;

function setEChart_1() {

  var chartDom = document.getElementById('chart_1');

  var myChart = echarts.init(chartDom)!;
  var option: EChartsOption;

  const gaugeData = [
    {
      value: 20,
      name: '剩余电量',
      title: {
        offsetCenter: ['-80%', '82%']
      },
      detail: {
        offsetCenter: ['-80%', '100%'],
        formatter: '{value}%'
      }
    },
    {
      value: 40,
      name: '剩余液氢',
      title: {
        offsetCenter: ['0%', '82%']
      },
      detail: {
        offsetCenter: ['0%', '100%'],
        formatter: '{value}L'
      }
    },
    {
      value: 60,
      name: '剩余里程',
      title: {
        offsetCenter: ['80%', '82%']
      },
      detail: {
        offsetCenter: ['80%', '100%'],
        formatter: '{value}km'
      }
    }
  ];

  option = {
    series: [
      {
        type: 'gauge',
        radius: '90%',
        itemStyle: {
          // color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 9,
          itemStyle: {
            color: '#FAC858'
          }
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 3,
          length: '75%',
          offsetCenter: [0, '8%']
        },
        progress: {
          show: true,
          width: 5,
          overlap: true,
          roundCap: true
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 5
          }
        },
        // axisTick: {
        //   splitNumber: 2,
        //   lineStyle: {
        //     width: 2
        //   }
        // },
        axisLabel: {
          distance: 10,
          color: '#999',
          fontSize: 10
        },
        data: gaugeData,
        title: {
          fontSize: 10
        },
        detail: {
          width: 20,
          height: 7,
          fontSize: 10,
          color: '#fff',
          backgroundColor: 'inherit',
          borderRadius: 3,
          formatter: '{value}%'
        }
      }
    ]
  };

  // setInterval(function () {
  //   gaugeData[0].value = +(Math.random() * 100).toFixed(0);
  //   gaugeData[1].value = +(Math.random() * 100).toFixed(0);
  //   gaugeData[2].value = +(Math.random() * 100).toFixed(0);
  //   myChart.setOption<echarts.EChartsOption>({
  //     series: [
  //       {
  //         data: gaugeData,
  //         pointer: {
  //           show: false
  //         }
  //       }
  //     ]
  //   });
  // }, 30000);

  option && myChart.setOption(option);

}

function setEChart_2() {

  var chartDom = document.getElementById('chart_2');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    series: [
      {
        type: 'gauge',
        min: 0,
        max: 180,
        radius: '90%',
        splitNumber: 12,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2
        },
        progress: {
          show: true,
          roundCap: true,
          width: 5
        },
        pointer: {
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 5,
          offsetCenter: [0, '5%']
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 5
          }
        },
        // axisTick: {
        //   splitNumber: 2,
        //   lineStyle: {
        //     width: 2
        //   }
        // },
        // splitLine: {
        //   length: 8,
        //   lineStyle: {
        //     width: 2
        //   }
        // },
        axisLabel: {
          distance: 10,
          color: '#999',
          fontSize: 10
        },
        title: {
          show: false
        },
        detail: {
          backgroundColor: '#fff',
          borderColor: '#999',
          borderWidth: 0,
          width: '50%',
          lineHeight: 10,
          height: 10,
          borderRadius: 2,
          offsetCenter: [0, '99%'],
          valueAnimation: true,
          formatter: function (value: any) {
            return '{value|' + value.toFixed(0) + '}{unit|km/h}';
          },
          rich: {
            value: {
              fontSize: 15,
              fontWeight: 'bolder',
              color: '#777'
            },
            unit: {
              fontSize: 15,
              color: '#999',
              padding: [0, 0, 0, 10]
            }
          }
        },
        data: [
          {
            value: 68
          }
        ]
      }
    ]
  };

  option && myChart.setOption(option);

}

const dateVal = ref(new Date())
const calendar = ref<CalendarInstance>()
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}

onMounted(() => {

  setEChart_1()
  setEChart_2()

});

</script>

<style scoped>
.as {
  width: 14%;
  min-width: 200px;
}

.m {
  width: 80%;
  padding: 0px 10px 0px 10px;
}

.r {
  height: 100%;
}

.tre {
  max-width: 200px;
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
  margin-left: -10px;
  justify-self: center;
  align-items: center;
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

.tmp {
  color: rgb(26, 122, 232)
}

.des-h-v {
  padding-left: 5px;
  height: 30px;
  border: 1px dotted #e2e8f1;
}

.des-h {
  background-color: rgb(245, 247, 250);
}

.des-t-h {
  font-weight: bold;
}

.des-t {
  line-height: 30px;
  font-size: 14px;
  color: rgb(50, 50, 50);
}

:deep(.el-calendar-table .el-calendar-day) {
  height: 45px;
  text-align: left;
}

</style>
