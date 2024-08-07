<template>
  <el-tabs type="card" closable tab-position="bottom" @tab-remove="removeTab" v-model="currentTabKey" @tab-click="clickTabPane">
    <el-tab-pane v-for="item in cards" :key="item.tabKey" :label="item.title" :name="item.tabKey">
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="TopTabs">

import { ref, reactive } from 'vue'
import emitter from '@/utils/emitter'
import { ElTabPane } from 'element-plus';


interface TabCard {
  title: string
  tabKey: string
}

let cards: TabCard[] = reactive([{tabKey:"/dashbd", title:"数据面板"}]);

const currentTabKey = ref('/dashbd')

emitter.on('addTab', (obj: any) => {

  const tabs = cards;
  const newTabName = obj.targetName
  const newTabKey = obj.targetKey

  let isContain: boolean = false;
  tabs.forEach((tab, index) => {
    if (tab.tabKey === newTabKey) {
      isContain = true;
    }
  })

  if (!isContain) {
    cards.push({
      tabKey: newTabKey,
      title: newTabName
    })
  }

  currentTabKey.value = newTabKey
})

emitter.on('removeTab', (targetName: any) => {
  removeTab(targetName)
})

const clickTabPane = function (pane: any) {
  // ElTabPane
  // currentTabKey.value = pane.props.name

}

const removeTab = function (targetKey: string) {

  if(cards.length == 1) return;

  let tabs:TabCard[] = [];

  Object.assign(tabs, cards)
  
  let activeName = currentTabKey.value
  
  tabs.forEach((tab, index) => {
      if (tab.tabKey === targetKey && tab.tabKey === activeName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.tabKey
        }
      }
    })

  currentTabKey.value = activeName
  tabs = tabs.filter((tab) => tab.tabKey !== targetKey);
  cards.length = 0
  Object.assign(cards, tabs)
}

</script>


<style scoped>

:deep() .el-tabs__header .el-tabs__nav {
  border: 1px solid transparent;
  border-bottom: 1px dotted rgb(227, 227, 227);
  border-radius: 4px 4px 0 0;
  box-sizing: border-box;
  height: 32px;
}

:deep() .el-tabs__header .el-tabs__item {
  border: 1px solid rgb(227, 226, 226);
  margin-left: 8px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  font-size: 12px;
  padding-bottom: 7px;
}

:deep() .el-tabs__header .el-tabs__item:first-child {
  border: 1px solid rgb(227, 226, 226);
  margin-left: 8px;
  font-size: 12px;
}

:deep() .el-tabs__header .el-tabs__item:hover {
  background-color: aliceblue;
}

:deep() .el-tabs__header .el-tabs__item.is-active {
  background-color: aliceblue;
}
</style>