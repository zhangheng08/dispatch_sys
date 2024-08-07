import { defineStore } from 'pinia'

export interface ScatterClerk {
  name: string
  realName: string
}

const _list = Array<ScatterClerk>() 

export const ScatteClerkDataStore = defineStore('scatter_clerk_data', {
  state() {
    return {
      list: _list
    }
  }
})
