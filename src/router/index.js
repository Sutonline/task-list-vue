import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../pages/Hello.vue'
import Login from '../pages/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import CurrentTasks from '../pages/CurrentTasks.vue'
import HistoryTasks from '../pages/HistoryTasks.vue'
import Activity from '../pages/Activity.vue'

Vue.use(Router)

export default new Router({
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
          name: '/activity',
          component: Activity
        }
      ]
    }
  ]
})
