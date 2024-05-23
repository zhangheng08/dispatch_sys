import { defineStore } from 'pinia'
import type { StringMappingType } from 'typescript'

export interface VehiclePath  {
  line_name:string,
  line_driver:string,
  line_type:string,
  line_code:number,
  line_date:Date,
  line_start:string,
  line_end:string
}

export const pathData = defineStore('path_data', {
  state() {
    return {
      list : [
        {
          line_code: 1,
          line_name: '七里庄 - 图书馆(上行)',
          line_type: '固定班线',
          line_driver: '王凯',
          line_date: '2024-11-01',
          line_start: '七里庄公交站',
          line_end: '国家图书馆'
        },
        {
          line_code: 1,
          line_name: '高米店南-瀛海家园（上行)',
          line_type: '固定班线',
          line_driver: '王凯',
          line_date: '2024-11-01',
          line_start: '七里庄公交站',
          line_end: '国家图书馆'
        },
        {
          line_code: 1,
          line_name: '七里庄 - 图书馆(上行)',
          line_type: '固定班线',
          line_driver: '王凯',
          line_date: '2024-11-01',
          line_start: '七里庄公交站',
          line_end: '国家图书馆'
        },
        {
          line_code: 1,
          line_name: '七里庄 - 图书馆(上行)',
          line_type: '固定班线',
          line_driver: '王凯',
          line_date: '2024-11-01',
          line_start: '七里庄公交站',
          line_end: '国家图书馆'
        },
        {
          line_code: 1,
          line_name: '七里庄 - 图书馆(上行)',
          line_type: '固定班线',
          line_driver: '王凯',
          line_date: '2024-11-01',
          line_start: '七里庄公交站',
          line_end: '国家图书馆'
        },
        {
          line_code: 1,
          line_name: '七里庄 - 图书馆(上行)',
          line_type: '固定班线',
          line_driver: '王凯',
          line_date: '2024-11-01',
          line_start: '七里庄公交站',
          line_end: '国家图书馆'
        },
        {
          line_code: 1,
          line_name: '七里庄 - 图书馆(上行)',
          line_type: '固定班线',
          line_driver: '王凯',
          line_date: '2024-11-01',
          line_start: '七里庄公交站',
          line_end: '国家图书馆'
        }
      ]
    }
  }
})
