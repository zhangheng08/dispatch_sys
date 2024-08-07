import { defineStore } from 'pinia'

export interface DispatchOrder {
  id: number
  code: string
  contract_code: string
  obligation: string
  serv_princ: string
  type_id: number
  task_type_code: string
  line_id: number
  vehicleuse: number
  start_time: Date
  end_time: Date
  dispatcher: string
  serv_desc: string
  status_code:string
  status_value: string
  create_time: Date
  flow_code: string
}

const _list = Array<DispatchOrder>() 

export const dispatchOrderStore = defineStore('order_list', {
  state() {
    return {
      list: _list
    }
  }
})
