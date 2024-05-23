import { defineStore } from 'pinia'

export interface ScheduleInfo {
  num:number,
  service_name:string,
  name:string,
  type:string,
  exp:string,
  time_interval:string,
  liable:string,
  dispatcher:string,
  dirver:string,
  lince_plate:string,
  vechicle_type:string,
  path:string
}

export const scheduleDataStore = defineStore('schedule_data', {
  state() {
    return {
      list: [
        {
          num:1,
          service_name:'北京方舟科技有限公司',
          name:'天宫院-01',
          type:'固定班线',
          exp:'2023-10 至 2025-10',
          time_interval:'下午 6:15-7:15',
          liable:'王小利',
          dispatcher:'郑立军',
          driver:'白洁',
          lince_plate:'京B00032',
          vechicle_type:'氢能大巴',
          path:'上地软件园-天宫院地铁站'
        }, {
          num:2,
          service_name:'北京方舟科技有限公司',
          name:'天宫院-02',
          type:'固定班线',
          exp:'2023-10 至 2025-10',
          time_interval:'下午 7:00-8:00',
          liable:'王小利',
          dispatcher:'郑立军',
          driver:'鲁明德',
          lince_plate:'京B00016',
          vechicle_type:'氢能大巴',
          path:'上地软件园-天宫院地铁站'
        }, {
          num:3,
          service_name:'北京方舟科技有限公司',
          name:'天宫院-03',
          type:'固定班线',
          exp:'2023-10 至 2025-10',
          time_interval:'下午 7:00-8:00',
          liable:'王小利',
          dispatcher:'郑立军',
          driver:'吴兴',
          lince_plate:'京B00036',
          vechicle_type:'氢能大巴',
          path:'上地软件园-天宫院地铁站'
        }, {
          num:4,
          service_name:'北京方舟科技有限公司',
          name:'方舟科技-01',
          type:'固定班线',
          exp:'2023-10 至 2025-10',
          time_interval:'上午 7:00-9:00',
          liable:'王小利',
          dispatcher:'郑立军',
          driver:'吴兴',
          lince_plate:'京B00036',
          vechicle_type:'氢能大巴',
          path:'天宫院地铁站-上地软件园'
        }, {
          num:5,
          service_name:'北京方舟科技有限公司',
          name:'方舟科技-02',
          type:'固定班线',
          exp:'2023-10 至 2025-10',
          time_interval:'上午 7:00-9:00',
          liable:'王小利',
          dispatcher:'郑立军',
          driver:'鲁明德',
          lince_plate:'京B00016',
          vechicle_type:'氢能大巴',
          path:'天宫院地铁站-上地软件园'
        }, {
          num:6,
          service_name:'北京方舟科技有限公司',
          name:'方舟科技-03',
          type:'固定班线',
          exp:'2023-10 至 2025-10',
          time_interval:'上午 7:40-9:00',
          liable:'王小利',
          dispatcher:'郑立军',
          driver:'白洁',
          lince_plate:'京B00032',
          vechicle_type:'氢能大巴',
          path:'天宫院地铁站-上地软件园'
        }
      ]
    }
  }
})
