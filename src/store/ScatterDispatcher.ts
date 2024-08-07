import { defineStore } from 'pinia'

export interface ScatterDispatcher {
  name: string
  realName: string
}

const _list = Array<ScatterDispatcher>() 

export const scatterDispatcherDataStore = defineStore('scatter_dispatcher_data', {
  state() {
    return {
      list: _list
    }
  }
})
