import { MarkerType } from '@vue-flow/core'

// export interface NodeType {
//   id: string
//   type: string
//   data: {
//     label: string
//   }
//   position: {
//     x: number
//     y: number
//   }
//   class: string
// }

export const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: '业务创建' },
    position: { x: 80, y: 0 },
    class: 'light'
  },
  // {
  //   id: '2',
  //   type: 'output',
  //   data: { label: 'Node 2' },
  //   position: { x: 100, y: 100 },
  //   class: 'light',
  // },
  {
    id: '2',
    type: 'default',
    data: { label: '任务调度' },
    position: { x: 350, y: 100 },
    class: 'light'
  },
  {
    id: '3',
    type: 'default',
    data: { label: '业务确认' },
    position: { x: 350, y: 230 },
    class: 'light'
  },
  {
    id: '4',
    type: 'default',
    data: { label: '司机确认' },
    position: { x: 350, y: 360 },
    class: 'light'
  },
  {
    id: '5',
    type: 'default',
    data: { label: '出车确认' },
    position: { x: 350, y: 560 },
    class: 'light'
  }
]

export const initialEdges = [
  // {
  //   id: 'e1-2',
  //   source: '1',
  //   target: '2',
  //   animated: true,
  // },
  {
    id: 'e1-2',
    type: 'smoothstep',
    source: '1',
    target: '2',
    label: '等待',
    style: { stroke: 'grey' },
    labelBgStyle: { fill: 'grey' },
    // labelBgStyle: { fill: '#11E6F9' },
    // style: {stroke:'#11E6F9'},
    animated: false,
    markerEnd: MarkerType.ArrowClosed
  },
  {
    id: 'e2-3',
    type: 'smoothstep',
    source: '2',
    target: '3',
    style: { stroke: 'grey' },
    labelBgStyle: { fill: 'grey' },
    // labelBgStyle: { fill: '#11E6F9' },
    // style: {stroke:'red'},
    label: '等待',
    animated: false,
    markerEnd: MarkerType.ArrowClosed
  },
  {
    id: 'e3-4',
    type: 'smoothstep',
    source: '3',
    target: '4',
    label: '等待',
    style: { stroke: 'grey' },
    labelBgStyle: { fill: 'grey' },
    animated: false,
    markerEnd: MarkerType.ArrowClosed
  },
  {
    id: 'e4-1',
    type: 'smoothstep',
    source: '4',
    target: '1',
    label: '等待',
    style: { stroke: 'grey' },
    labelBgStyle: { fill: 'grey' },
    animated: false,
    markerEnd: MarkerType.ArrowClosed
  },
  {
    id: 'e4-5',
    type: 'smoothstep',
    source: '4',
    target: '5',
    label: '等待',
    style: { stroke: 'grey' },
    labelBgStyle: { fill: 'grey' },
    animated: false,
    markerEnd: MarkerType.ArrowClosed
  },
  {
    id: 'e5-1',
    type: 'smoothstep',
    source: '5',
    target: '1',
    label: '等待',
    style: { stroke: 'grey' },
    labelBgStyle: { fill: 'grey' },
    animated: false,
    markerEnd: MarkerType.ArrowClosed
  }
]
