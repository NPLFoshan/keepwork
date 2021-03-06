<template>
  <el-container class="editor-index-page" v-if="presetLoaded" v-loading="loading" id="editor">
    <el-header>
      <EditorHeader></EditorHeader>
    </el-header>
    <el-main>
      <router-view @showPreview='showPreview' />
      <!-- <el-dialog class="preview-dialog" :visible.sync='previewDialogVisible' width='88% ' height='100% '> -->
        <div class="preview-site-wrap" id="previewWinSite">
            <div class="preview-site-close"><span @click="handleClosePreview">X</span></div>
            <div class="preview-content-wrap" v-if="showPreviewClose">
              <PageViewer/>
            </div>
        </div>
      <!-- </el-dialog> -->
    </el-main>
    <div @click.stop v-if="showLoginDialog">
      <login-dialog :show="showLoginDialog" :forceLogin="true" @close="handleLoginDialogClose" />
    </div>
  </el-container>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import { sync } from 'vuex-router-sync'
import fullscreen from 'vue-fullscreen'
import VueClipboard from 'vue-clipboard2'
import 'element-ui/lib/theme-chalk/index.css'
import router from './editor.router'
import editorModule from '@/store/editor'
import userModule from '@/store/user'
import gitlabModule from '@/store/gitlab'
import createPersistedState from '@/store/createPersistedState'
import ElementUI from 'element-ui'
import { broadcast } from 'vuex-iframe-sync'
import VueKeepScrollPosition from 'vue-keep-scroll-position'
import { messages as i18nMessages, locale } from '@/lib/utils/i18n'
import '@/components/common/thirdAuth'
import { mapActions, mapGetters } from 'vuex'
import PageViewer from '@/components/viewer/MdPageViewer'
import LoginDialog from '@/components/common/LoginDialog'
import EditorHeader from '@/components/editor/EditorHeader'

Vue.use(fullscreen)
Vue.use(VueClipboard)
Vue.use(VueKeepScrollPosition)

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale,
  messages: i18nMessages
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

const store = new Vuex.Store({
  modules: {
    user: userModule,
    gitlab: gitlabModule,
    editor: editorModule
  },
  plugins: [
    createPersistedState({
      paths: [
        'editor.openedFiles'
      ]
    }),
    broadcast('frameViewport')
  ]
})

sync(store, router)

export default {
  name: 'EditorPage',
  router,
  store,
  i18n,
  data() {
    return {
      presetLoaded: false,
      loading: true,
      previewDialogVisible: false,
      isFullscreen: false,
      showPreviewClose: false
    }
  },
  async created() {
    await this.loadEditorPresets()
    this.presetLoaded = true
    await this.updateActivePage()
  },
  async mounted() {
    document.title = 'Keepwork Editor'
  },
  watch: {
    $route: 'updateActivePage'
  },
  computed: {
    ...mapGetters({
      activePageInfo: 'activePageInfo',
      userIsLogined: 'user/isLogined',
    }),
    showLoginDialog() {
      return !this.userIsLogined
    }
  },
  methods: {
    ...mapActions({
      setActivePage: 'setActivePage',
      userGetProfile: 'user/getProfile',
      userGetWebsiteDetailInfoByPath: 'user/getWebsiteDetailInfoByPath',
      getAllPersonalAndContributedSite: 'user/getAllPersonalAndContributedSite'
    }),
    async loadEditorPresets() {
      await this.userGetProfile({ useCache: false }).catch(err => {
        console.error(err)
      })
      await this.getAllPersonalAndContributedSite({ useCache: false }).catch(err => {
        console.error(err)
      })
    },
    async updateActivePage() {
      if (!this.presetLoaded) return
      this.loading = true
      let path = this.$router.currentRoute.path
      await this.setActivePage({ path }).catch(e => {
        console.error(e)
        this.loading = false
        // this.$router.push('/')
        throw new Error('Set activePage failed, goto initial page!')
      })
      await this.userGetWebsiteDetailInfoByPath({
        path: this.activePageInfo.sitepath
      }).catch(e => {
        console.error(e)
        this.loading = false
      })
      this.loading = false
    },
    showPreview() {
      // this.previewDialogVisible = true
      this.showPreviewClose = true
      this.$fullscreen.toggle(this.$el.querySelector('#previewWinSite'), {
        wrap: false,
        fullscreenClass: 'preview-win-fullscreen',
        callback: this.fullscreenChange
      })
    },
    fullscreenChange(fullscreen) {
      this.isFullscreen = fullscreen
    },
    handleClosePreview() {
      this.$fullscreen.toggle(this.$el.querySelector('#previewWinSite'), {
        wrap: false,
        fullscreenClass: 'preview-win-fullscreen',
        callback: this.fullscreenChange
      })
      this.showPreviewClose = false
    },
    handleLoginDialogClose() {
      location.reload()
    }
  },
  components: {
    PageViewer,
    EditorHeader,
    LoginDialog
  }
}
</script>

<style lang="scss">
html,
body,
.el-container {
  height: 100%;
}
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
.editor-index-page {
  .el-main {
    height: 100%;
    padding: 0;
  }
}

#editor {
  background: white;
}
.preview-dialog .el-dialog__body {
  padding: 30px 0;
}
.preview-dialog .el-main{
  background-color: #fff;
  overflow: hidden;
}
.preview-site-wrap{
  height: 0;
  overflow: hidden;
}
.preview-win-fullscreen {
  width: 100% !important;
  height: 100%;
  padding: 10px;
  overflow: hidden;
}
.preview-content-wrap{
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.preview-site-close {
  overflow: hidden;
}
.preview-site-close span{
  display: block;
  text-align: center;
  line-height: 50px;
  height: 50px;
  width: 50px;
  float: right;
  cursor: pointer;
  color: #000;
}
</style>

<style lang="scss">
@function px2rem($px) {
  $rem: 100px;
  @return ($px/$rem) + rem;
}
</style>
