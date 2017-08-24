import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../pages/Hello.vue'
import Login from '../pages/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import CurrentTasks from '../pages/CurrentTasks.vue'
import HistoryTasks from '../pages/HistoryTasks.vue'
import Activity from '../pages/Activity.vue'
import ActivityDetail from '../pages/ActivityDetail.vue'
import AddActivity from '../pages/AddActivity.vue'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/current',
          name: 'currentTasks',
          component: CurrentTasks
        },
        {
          path: '/history',
          name: 'historyTasks',
          component: HistoryTasks
        },
        {
          path: '/activity',
          name: 'activity',
          component: Activity
        },
        {
          path: '/activityDetail',
          name: 'activityDetail',
          component: ActivityDetail
        },
        {
          path: '/addActivity',
          name: 'addActivity',
          component: AddActivity
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userInfo = store.state.userInfo
  const x = to.path.indexOf('login')
  if ((userInfo && userInfo === 'kevin') || x !== -1) {
    next()
  } else {
    next('/login')
  }
})

export default router
