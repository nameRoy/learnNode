import Vue from "vue"
import Router from "vue-router"
import Cmp1 from "@/Cmp1.vue"
import B from "@/B.vue"
Vue.use(Router)

export default new Router({
  routes:[{
    path:'/first',
    name:'first',
    component:Cmp1
  },{
    path:'/b',
    name:'b',
    component:B
  }


  ]
})