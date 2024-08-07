import { defineStore } from 'pinia'

export interface ScatterTaskType {
  identical: number
  taskCode: string
  taskName: string
}

const _list = Array<ScatterTaskType>() 

export const ScatterTaskTypeDataStore = defineStore('scatter_task_data', {
  state() {
    return {
      list: _list
    }
  }
})
