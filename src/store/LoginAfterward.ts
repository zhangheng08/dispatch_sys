import { defineStore } from 'pinia'

export const loginAfterward = defineStore('afterward', {
  state: () => {
    return {
      loginToShow:true,
      menuToShow:false,
      mainTabToShow:false
    }
  },

  actions: {
    afterward(loginToShow: boolean, menuToShow: boolean, tabToShow: boolean) {
      this.loginToShow = loginToShow
      this.menuToShow = menuToShow
      this.mainTabToShow = tabToShow
    }
  },

  persist: {
    enabled: true
  }
})
