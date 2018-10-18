// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import 'element-ui/lib/theme-chalk/index.css'
import LessonPage from './LessonPage'
import router from './lesson.router'
import {
  appModule,
  gitlabModule,
  userModule,
  lessonModule,
  createPersistedState
} from '@/store'
import ElementUI from 'element-ui'
import { messages as i18nMessages, locale } from '@/lib/utils/i18n'
import Vhistogram from 'v-charts/lib/histogram.common'
import Cookies from 'js-cookie'
import '@/components/common/thirdAuth'

Vue.use(Vuex)
Vue.use(VueI18n)
Vue.component(Vhistogram.name, Vhistogram)

const i18n = new VueI18n({
  locale,
  messages: i18nMessages
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

const store = new Vuex.Store({
  modules: {
    app: appModule,
    user: userModule,
    gitlab: gitlabModule,
    lesson: lessonModule
  },
  plugins: [
    createPersistedState({
      paths: [
        'lesson.userinfo',
        // 'lesson.student.enterClassInfo',
        'lesson.student.subscribesList',
        // 'lesson.teacher.classroom',
        'user.profile',
        'user.webTemplateConfig',
        'user.skyDrive'
      ]
    })
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.visitor)) {
    console.log(to)
    const { query, params } = to
    if (query.id && query.token) {
      return next({ name: 'VisitorLesson', params, query })
    }
  }

  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!Cookies.get('token')) {
      store.dispatch(
        'lesson/toggleLoginDialog',
        { show: true, to: to },
        { root: true }
      )
      if (!from.name) {
        return next({ name: 'StudentCenter' })
      }
      return next(false)
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#lesson',
  router,
  store,
  i18n,
  components: { LessonPage },
  template: '<LessonPage/>'
})
