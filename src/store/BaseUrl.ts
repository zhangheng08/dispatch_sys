import { defineStore } from 'pinia'

export const baseUrlStore = defineStore('baseUrl', {
  state: () => {
    return {
      // host:'http://81.70.144.143:8088/API'
      host:'http://localhost:8088/API'
    }
  }
})
