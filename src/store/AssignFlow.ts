import { defineStore } from 'pinia'

export interface Flow {
  orderCode: string
  currentStatus: string
  statusCode: string
  assignTo: string
  activeTime?: Date
  doneTime?: Date
  flowCode: string
}

const _list = Array<Flow>() 

export const AssignFlowStore = defineStore('assign_flow_list', {
  state: () => {
    return {
      list: _list
    }
  },
  persist: {
    enable: true
  }
})
