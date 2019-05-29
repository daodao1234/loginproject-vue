import Vue from 'vue'
import Router from 'vue-router'
import LoginIn from '../components/Login.vue'
import HelloWorld from '../components/HelloWorld.vue'
import UserList from '../components/UserList.vue'
import MainView from '../components/MainView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      component: LoginIn,
      name: 'LoginIn'
    },
    {
      path: '/helloworld',
      component: HelloWorld,
      name: 'HelloWorld',
      meta: {
        requireAuth: true,
      }
    },
    {
      path: '/mainView',
      component: MainView,
      name: 'MainView',
      meta: {
        requireAuth: true,
      },
      redirect: "/calendar",
      children: [
        {
          path: '/calendar',
          component: resolve => require(['../components/Calendar.vue'], resolve),
          name: 'Calendar',
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/userList',
          component: UserList,
          name: 'UserList',
          meta: {
            requireAuth: true,
          }
        },
        {
          path: '/deviceList',
          component: resolve => require(['../components/DeviceList.vue'], resolve),
          name: 'DeviceList',
          meta: {
            requireAuth: true,
          }
        }
      ]
    },
    {
      path: '**',
      redirect: '/calendar'
    }

  ]
})

