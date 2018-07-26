import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import AddProject from '@/components/addProject'
import Manage from '@/components/manage'
import Approval_manage from '@/components/approval_manage'
import ManageDw from '@/components/manageDw'
import Bidding_manage from '@/components/bidding_manage'
import Login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'login',
      component:Login
    },
    {
      path:'/manage', //manage/xxx   xm=xxx
      name:'manage',
      component:Manage,

    },
    {
      path:'/approval_manage',
      name:'approval_manage',
      component:Approval_manage
    },
    {
      path:'/bidding_manage',
      name:'bidding_manage',
      component:Bidding_manage
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/manageDw',
      name: 'manageDw',
      component: ManageDw
    },
    {
      path:'/addProject',
      name:'addProject',
      component:AddProject
    }
  ]
})
