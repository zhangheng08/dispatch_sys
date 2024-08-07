import { defineStore } from 'pinia'

export interface TabItem {
  title: string
  tabKey: string
}

const _list = Array<TabItem>() 

export const tabCard = defineStore('tabCard', {
  state: () => {
    return {
      list:_list
    }
  },

  persist: {
    enabled: true
  }
})
