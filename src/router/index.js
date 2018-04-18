import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
//employee
import e_index from '@/components/employee/e_index'

import u_index from '@/components/client/u_index'
import u_datile from '@/components/client/u_datile'

import ser_index from '@/components/serviceOrders/ser_index'

import c_index from '@/components/complaints/c_index'

import s_index from '@/components/stock/s_index'

import p_index from '@/components/project/p_index'

import r_index from '@/components/report/r_index'

import re_index from '@/components/reservation/re_index'

import b_index from '@/components/basicInformation/b_index'

import ro_index from '@/components/room/ro_index'


Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: 'b_index',
          name: 'b_index',
          component: b_index,
        },
        {
          path: 'employee',
          name: 'employee',
          component: e_index,
        },
        {
          path: 'u_index',
          name: 'u_index',
          component: u_index,
        },
        {
          path: 'u_datile/:u_id',
          name: 'u_datile',
          component: u_datile,
        },
        {
          path: 'ser_index',
          name: 'ser_index',
          component: ser_index,
        },
        {
          path: 'c_index',
          name: 'c_index',
          component: c_index,
        },
        {
          path: 's_index',
          name: 's_index',
          component: s_index,
        },
        {
          path: 'p_index',
          name: 'p_index',
          component: p_index,
        },
        {
          path: 'r_index',
          name: 'r_index',
          component: r_index,
        },
        {
          path: 're_index',
          name: 're_index',
          component: re_index,
        },
        {
          path: 'ro_index',
          name: 'ro_index',
          component: ro_index,
        },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  next();
})
export default router;
