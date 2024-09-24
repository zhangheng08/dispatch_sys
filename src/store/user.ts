import { defineStore } from 'pinia'

export const useUserStore = defineStore('storeUser', {
  state: () => {
    return {
      userCode: '',
      userName: '',
      accessToken: '',
      roleCode:'',
      sex:'',
      roleName:''
    }
  },

  actions: {
    setToken(value: string) {
      this.accessToken = value
    }
  },

  persist: {
    enabled: true
  }
})
