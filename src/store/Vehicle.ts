import { defineStore } from 'pinia'

export interface VehicleMngTree {
  label: string
  children?: VehicleMngTree[]
}

export const treeData = defineStore('tree_data', {
  state() {
    return {
      list : [
        {
          label: '一队',
          children: [
            {
              label: '散活组',
              children: [
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00811F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                }
              ]
            },
            {
              label: '班车组',
              children: [
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00811F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                }
              ]
            }
          ],
        },
        {
          label: '二队',
          children: [
            {
              label: '腾讯班车组',
              children: [
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00811F',
                },
                {
                  label: '京B00053F',
                }
              ]
            },
            {
              label: '大兴机组班车组',
              children: [
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00811F',
                }
              ]
            },
            {
              label: '海航班车组',
              children: [
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00811F',
                }
              ]
            },
            {
              label: '零散班车组',
              children: [
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00811F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00053F',
                }
              ]
            }, 
            {
              label: '散活组',
              children: [
                {
                  label: '京B00053F',
                },
                {
                  label: '京B00811F',
                }
              ]
            }
          ],
        }
      ]
    }
  }
})
