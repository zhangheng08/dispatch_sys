import { defineStore } from 'pinia'

export interface flow {
  orderCode: string
  currentStatus: string
  statusCode: string
  assignTo: string
  activeTime?: Date
  doneTime?: Date
  flowCode: string
}

const _list = Array<flow>() 

export const AssignFlowStore = defineStore('assign_flow_list', {
  state() {
    return {
      list: _list
    }
  }
})
