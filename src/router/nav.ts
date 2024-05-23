import {createRouter, createWebHashHistory} from 'vue-router'

import dash_brd from '@/pages/DashBroad.vue'
import driver_mng from '@/pages/DriverManagement.vue'
import bus_mng from '@/pages/BusManagement_v2.vue'
import route_cus from '@/pages/RouteCustomization.vue'
import shuttle_schd from '@/pages/ShuttlebusScheduling.vue'
import intelli_rmd from '@/pages/IntelligentRemind.vue'
import add_hyd_path_pln from '@/pages/AddingHydrogenPathPlanning.vue'
import bus_path_pln from '@/pages/BusPathPlanning.vue'
import service_scheduling from '@/pages/ServiceScheduling.vue'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {name:'dash_broad', path:'/dashbd', component:dash_brd},
        {name:'driver_managment', path:'/drvmng', component:driver_mng},
        {name:'bus_managment', path:'/busmng', component:bus_mng},
        {name:'shuttlebus_scheduling', path:'/shuschd', component:shuttle_schd},
        {name:'route_customization', path:'/rotcus', component:route_cus},
        {name:'intelligent_remind', path:'/intelrmd', component:intelli_rmd},
        {name:'add_hydrogen_path_planning', path:'/addhpl', component:add_hyd_path_pln},
        {name:'service_scheduling', path:'/servsch', component:service_scheduling},
        {name:'bus_path_planning', path:'/busppl', component:bus_path_pln}
    ]
})

export default router

