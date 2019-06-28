import Vue from 'vue'
import Router from 'vue-router'
import Header from './components/common/Header.vue'
import Homepage from './components/page/homepagbaner.vue'
import Peopbanner from './components/page/peopbanner.vue'
import Allpeople from './components/page/allpeople.vue'
import Match from './components/page/match.vue'
import Matchbanner from './components/page/matchbanner.vue'
import Aboutbanner from './components/page/aboutbanner.vue'
import Addpeople from './components/page/addpeople.vue'
import News from './components/page/news.vue'
import HotWorks from './components/page/HotWorks.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [

    {
      path: '/',
      name: 'hrader',
      component: Header,
      children: [
        { path: '/', component: Homepage },
        { path: '/Peopbanner', component: Peopbanner },
        { path: '/Allpeople', component: Allpeople },
        { path: '/Match', component: Match },
        { path: '/News', component: News },
        { path: '/Matchbanner', component: Matchbanner },
        { path: '/Aboutbanner', component: Aboutbanner },
        { path: '/Addpeople', component: Addpeople },
        { path: '/HotWorks', component: HotWorks }
      ]
    }
  ]
})
