<template>
  <VueFlow
    :nodes="nodes"
    :edges="edges"
    :class="{ dark }"
    class="basic-flow"
    :default-viewport="{ zoom: 3.0 }"
    :min-zoom="0.5"
    :max-zoom="5"
  >
    <Background pattern-color="#aaa" :gap="16" />
  </VueFlow>
</template>

<script setup lang="ts" name="ScatterFlowChart">
import { ref, onUnmounted } from 'vue'
import { format } from 'date-fns'
import { VueFlow, useVueFlow, type GraphNode } from '@vue-flow/core'
import { AssignFlowStore } from '@/store/AssignFlow'
import type { Flow } from '@/store/AssignFlow'
import { Background } from '@vue-flow/background'
// import { ControlButton, Controls } from '@vue-flow/controls'
// import { MiniMap } from '@vue-flow/minimap'
// import ToolBarIcon from '@/utils/vueflow/ToolBarIcon.vue'
import { initialEdges, initialNodes } from '@/utils/vueflow/InitNode'
import emitter from '@/utils/emitter'
const useVueFlowInstance = useVueFlow()

const { onInit, onNodeDragStop, onConnect, addEdges } = useVueFlow()

var nodes = ref(initialNodes)

var edges = ref(initialEdges)

const dark = ref(false)

var assignFlowStore = AssignFlowStore()

/**
 * This is a Vue Flow event-hook which can be listened to from anywhere you call the composable, instead of only on the main component
 * Any event that is available as `@event-name` on the VueFlow component is also available as `onEventName` on the composable and vice versa
 *
 * onInit is called when the VueFlow viewport is initialized
 */
onInit((vueFlowInstance) => {
  // instance is the same as the return of `useVueFlow`
  vueFlowInstance.fitView()
})

/**
 * onNodeDragStop is called when a node is done being dragged
 *
 * Node drag events provide you with:
 * 1. the event object
 * 2. the nodes array (if multiple nodes are dragged)
 * 3. the node that initiated the drag
 * 4. any intersections with other nodes
 */
onNodeDragStop(({ event, nodes, node }) => {
  console.log('Node Drag Stop', { event, nodes, node })
})

/**
 * onConnect is called when a new connection is created.
 *
 * You can add additional properties to your new edge (like a type or label) or block the creation altogether by not calling `addEdges`
 */
onConnect((connection) => {
  addEdges(connection)
})

var refreshNodeData = function () {
  var list = Array<Flow>()
  list = list.concat(assignFlowStore.list)
  console.log(list)

  for (let idx = 0; idx < list.length; idx++) {
    let flow = list[idx] as Flow
    let currentStatus = ''
    let statusCode = ''
    let doneTime = ''
    let activeTime = ''
    let assignTo = ''
    let flowIndex = idx + 1

    let node = useVueFlowInstance.findNode(String(flowIndex))

    if (node != null) {
      if (flowIndex == 1) {
        currentStatus = flow.currentStatus == 'done' ? '已完成' : '待办'
        doneTime = format(flow.doneTime == null ? new Date() : flow.doneTime, 'yyyy-MM-dd HH:mm:ss')
        assignTo = flow.assignTo
        let nodeData = `创建【${currentStatus}】由${assignTo}于${doneTime}`
        node.data.label = nodeData
        let edge = useVueFlowInstance.findEdge('e1-2')
        if (edge != null) {
          edge.animated = true
          edge.label = '未指派调度员'
        }
      } else if (flowIndex == 2) {
        currentStatus = flow.currentStatus == 'done' ? '已完成' : '待办'
        assignTo = flow.assignTo

        let edge12 = useVueFlowInstance.findEdge('e1-2')
        activeTime = format(
          flow.activeTime == null ? new Date() : flow.activeTime,
          'yyyy-MM-dd HH:mm:ss'
        )
        edge12.label = `已指派给【${flow.assignTo}】于${activeTime}`

        if (flow.currentStatus == 'done') {
          doneTime = format(
            flow.doneTime == null ? new Date() : flow.doneTime,
            'yyyy-MM-dd HH:mm:ss'
          )
          let nodeData = `调度【${currentStatus}】由${assignTo}于${doneTime}`
          node.data.label = nodeData
          edge12.animated = false
          edge12.labelBgStyle.fill = '#11E6F9'
          edge12.style.stroke = '#11E6F9'
        } else if (flow.currentStatus == 'active') {
          let nodeData = `调度【${currentStatus}】等待${assignTo}执行`
          node.data.label = nodeData
          edge12.animated = true
          edge12.labelBgStyle.fill = '#11E6F9'
          edge12.style.stroke = 'red'
        }
      } else if (flowIndex == 3) {
        currentStatus = flow.currentStatus == 'done' ? '已同意' : '待办'
        assignTo = flow.assignTo

        let edge23 = useVueFlowInstance.findEdge('e2-3')

        activeTime = format(
          flow.activeTime == null ? new Date() : flow.activeTime,
          'yyyy-MM-dd HH:mm:ss'
        )
        edge23.label = `已指派给【${flow.assignTo}】于${activeTime}`

        if (flow.currentStatus == 'done') {
          doneTime = format(
            flow.doneTime == null ? new Date() : flow.doneTime,
            'yyyy-MM-dd HH:mm:ss'
          )
          let nodeData = `调度单复核【${currentStatus}】由${assignTo}于${doneTime}`
          node.data.label = nodeData

          edge23.animated = false
          edge23.labelBgStyle.fill = '#11E6F9'
          edge23.style.stroke = '#11E6F9'
        } else if (flow.currentStatus == 'active') {
          let nodeData = `派车单复核【${currentStatus}】等待${assignTo}执行`
          node.data.label = nodeData

          edge23.animated = true
          edge23.labelBgStyle.fill = '#11E6F9'
          edge23.style.stroke = 'red'
        }

      } else if (flowIndex == 4) {
        currentStatus = flow.currentStatus == 'done' ? '已完成' : '待办'
        assignTo = flow.assignTo

        let edge34 = useVueFlowInstance.findEdge('e3-4')

        activeTime = format(
          flow.activeTime == null ? new Date() : flow.activeTime,
          'yyyy-MM-dd HH:mm:ss'
        )
        edge34.label = `已指派给【${flow.assignTo}】于${activeTime}`

        if (flow.currentStatus == 'done') {
          doneTime = format(
            flow.doneTime == null ? new Date() : flow.doneTime,
            'yyyy-MM-dd HH:mm:ss'
          )
          let nodeData = `调度单【${currentStatus}】由${assignTo}于${doneTime}`
          node.data.label = nodeData

          edge34.animated = false
          edge34.labelBgStyle.fill = '#11E6F9'
          edge34.style.stroke = '#11E6F9'
        } else if (flow.currentStatus == 'active') {
          let nodeData = `派车单【${currentStatus}】等待${assignTo}确认`
          node.data.label = nodeData

          edge34.animated = true
          edge34.labelBgStyle.fill = '#11E6F9'
          edge34.style.stroke = 'red'
        }

      }
    }
  }
  console.log(nodes.value[0])
}

var resetNodeData = function () {
  console.log('todo')
}

emitter.on('refreshNodeData', () => {
  refreshNodeData()
})

onUnmounted(() => {
  emitter.off('refreshNodeData')
})
</script>

<style>
@import '@/assets/vueflow.css';
</style>
