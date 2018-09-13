import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import music from '@/components/music'
import list from '@/components/list'
import home from '@/components/home'
import found from '@/components/found'
import my from '@/components/my'
import pro from '@/components/pro'
import navbar from '@/components/nav'
import sett from '@/components/set'
import NotFoundComponent from '@/components/notfound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: navbar,
      redirect: '/home/nav1',
      children: [
        { path: '/home/nav1', component: pro },
        { path: '/home/nav2', component: found },
        { path: '/home/nav3', component: my },
        { path: '/home/nav4', component: sett },
      ]
    },
    { path: '/music', component: music },
    { path: '/list', component: list },
    { path: '*', component: NotFoundComponent }
  ]
})



