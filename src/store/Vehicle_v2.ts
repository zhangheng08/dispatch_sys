import { defineStore } from 'pinia'

export interface VehicleMngTreev2 {
  id: number
  label: string
  children?: VehicleMngTreev2[]
}

export const treeDatav2 = defineStore('tree_data', {
  state() {
    return {
      list: [
        {
          id: 1,
          label: '自营车辆',
          children: [
            {
              id: 11,
              label: '一队',
              children: [
                {
                  id: 111,
                  label: '散活组',
                  children: [
                    {
                      id: 1111,
                      label: '京B00053F'
                    },
                    {
                      id: 1112,
                      label: '京B00811F'
                    },
                    {
                      id: 1113,
                      label: '京B00053F'
                    },
                    {
                      id: 1114,
                      label: '京B00053F'
                    },
                    {
                      id: 1115,
                      label: '京B00053F'
                    },
                    {
                      id: 1116,
                      label: '京B00053F'
                    },
                    {
                      id: 1117,
                      label: '京B00053F'
                    },
                    {
                      id: 1118,
                      label: '京B00053F'
                    }
                  ]
                },
                {
                  id: 112,
                  label: '班车组',
                  children: [
                    {
                      id: 1121,
                      label: '京B00053F'
                    },
                    {
                      id: 1122,
                      label: '京B00811F'
                    },
                    {
                      id: 1123,
                      label: '京B00053F'
                    },
                    {
                      id: 1124,
                      label: '京B00053F'
                    },
                    {
                      id: 1125,
                      label: '京B00053F'
                    },
                    {
                      id: 1126,
                      label: '京B00053F'
                    },
                    {
                      id: 1127,
                      label: '京B00053F'
                    },
                    {
                      id: 1128,
                      label: '京B00053F'
                    }
                  ]
                }
              ]
            },
            {
              id: 12,
              label: '二队',
              children: [
                {
                  id: 121,
                  label: '腾讯班车组',
                  children: [
                    {
                      id: 1211,
                      label: '京B00053F'
                    },
                    {
                      id: 1212,
                      label: '京B00811F'
                    },
                    {
                      id: 1213,
                      label: '京B00053F'
                    }
                  ]
                },
                {
                  id: 122,
                  label: '大兴机组班车组',
                  children: [
                    {
                      id: 1221,
                      label: '京B00053F'
                    },
                    {
                      id: 1222,
                      label: '京B00811F'
                    }
                  ]
                },
                {
                  id: 123,
                  label: '海航班车组',
                  children: [
                    {
                      id: 1231,
                      label: '京B00053F'
                    },
                    {
                      id: 1232,
                      label: '京B00811F'
                    }
                  ]
                },
                {
                  id: 124,
                  label: '零散班车组',
                  children: [
                    {
                      id: 1241,
                      label: '京B00053F'
                    },
                    {
                      id: 1242,
                      label: '京B00811F'
                    },
                    {
                      id: 1243,
                      label: '京B00053F'
                    },
                    {
                      id: 1244,
                      label: '京B00053F'
                    },
                    {
                      id: 1245,
                      label: '京B00053F'
                    },
                    {
                      id: 1246,
                      label: '京B00053F'
                    },
                    {
                      id: 1247,
                      label: '京B00053F'
                    },
                    {
                      id: 1248,
                      label: '京B00053F'
                    }
                  ]
                },
                {
                  id: 125,
                  label: '散活组',
                  children: [
                    {
                      id: 1251,
                      label: '京B00053F'
                    },
                    {
                      id: 1252,
                      label: '京B00811F'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '承包车辆',
          children: [
            {
              id: 21,
              label: '承包公司1',
              children: []
            },
            {
              id: 22,
              label: '承包公司2',
              children: []
            },
            {
              id: 23,
              label: '承包公司3',
              children: []
            }
          ]
        }
      ]
    }
  }
})
