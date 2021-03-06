<template>
  <div class="tool-header">
    <div class="breadcrumb" v-loading='breadcrumbsLoading'>
      <a class="breadcrumb-item iconfont icon-home-keepwork" href="/wiki/home"></a>
      <span class="breadcrumb-separator el-icon-arrow-right" role="presentation"></span>
      <a class="breadcrumb-item" :href="'/' + activePageInfo.username">{{activePageInfo.username}}</a>
      <span class="breadcrumb-separator el-icon-arrow-right" role="presentation"></span>
      <!-- <a class="breadcrumb-item" :href="'/' + activePageInfo.username + '/' + activePageInfo.sitename">{{activePageInfo.sitename}}</a> -->
      <div class="breadcrumb-item">
        <el-popover placement="bottom-start" popper-class="breadcrumb-item-dropdown">
          <el-scrollbar tag='ul' wrap-class="file-list-content" view-class="view-box" :native="false">
            <li v-for='(site,index) in siteList' :key='index'>
              <a class="clearfix" @click="pushNewUrl(site)">
                <span class="list-content">{{index === 0 ? site.name : (site.displayName || site.name)}}</span>
                <i class="iconfont icon-private" v-if="site.visibility==='private'"></i>
              </a>
            </li>
          </el-scrollbar>
          <span class="page-item-content" slot="reference">
            {{siteDisplayName}}
            <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
          </span>
        </el-popover>
      </div>

      <div class="breadcrumb-item" v-for='(fileList, index) in breadcrumbs' :key='index'>
        <span class="breadcrumb-separator el-icon-arrow-right" role="presentation"></span>
        <el-popover placement="bottom-start" popper-class="breadcrumb-item-dropdown">
          <el-scrollbar tag='ul' wrap-class="file-list-content" :native="false">
            <li class="file-list-item" v-for='file in fileList' :key='file.name' @click="handleBreadcrumbClick(file)">{{file.type == 'tree' ? `${file.name}/` : file.name | hideMarkdownExt}}</li>
          </el-scrollbar>
          <span class="page-item-content" slot="reference">
            {{activePageInfo.paths[index] | hideMarkdownExt}}
            <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
          </span>
        </el-popover>
      </div>
    </div>

    <div class="icons">
      <a :href="editorPageUrl" class="icon-item">
        <i class="iconfont icon-edit"></i>
      </a>
      <span v-if="!IS_GLOBAL_VERSION" class="icon-item" v-popover:share>
        <i class="iconfont icon-Share"></i>
      </span>
      <el-popover ref='share' trigger='click' @show='showSocialShare' width='130'>
        <div class="kp-social-share"></div>
      </el-popover>
      <span class="icon-item" v-loading='starPending'>
        <i class="iconfont icon-like-" :class="{'active': (activePageStarInfo && activePageStarInfo.starred)}" @click='togglePageStar'></i>
        <span class="info">{{(activePageStarInfo && activePageStarInfo.starredCount) || 0 }}</span>
      </span>
    </div>
    <div @click.stop v-if="isLoginDialogShow">
      <login-dialog :show="isLoginDialogShow" @close="closeLoginDialog"></login-dialog>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import 'social-share.js/dist/js/social-share.min.js'
import 'social-share.js/dist/css/share.min.css'
import LoginDialog from '@/components/common/LoginDialog'
import { mapGetters, mapActions } from 'vuex'
const IS_GLOBAL_VERSION = !!process.env.IS_GLOBAL_VERSION

export default {
  name: 'ToolHeader',
  mounted() {
    if (!this.userIsLogined) {
      this.getProfile({ forceLogin: false })
        .then(() => {
          this.isLogin = true
        })
        .catch(() => {
          this.isLogin = false
        })
    }
  },
  data() {
    return {
      IS_GLOBAL_VERSION,
      starPending: false,
      breadcrumbsLoading: false,
      siteList: [],
      isLoginDialogShow: false,
    }
  },
  computed: {
    ...mapGetters({
      activePageUrl: 'activePageUrl',
      activePageInfo: 'activePageInfo',
      displayUsername: 'user/displayUsername',
      activePageStarInfo: 'user/activePageStarInfo',
      getSiteDetailInfoByPath: 'user/getSiteDetailInfoByPath',
      gitlabChildrenByPath: 'gitlab/childrenByPath',
      userGetDetailByUsername: 'user/getDetailByUsername',
      userIsLogined: 'user/isLogined'
    }),
    isLogin: {
      get() {
        return this.userIsLogined
      },
      set() {}
    },
    siteDisplayName() {
      let { sitepath } = this.activePageInfo
      if (!sitepath) {
        return
      }
      let siteDetailInfo = this.getSiteDetailInfoByPath(sitepath)
      if (!siteDetailInfo) return
      let siteDisplayName = _.get(siteDetailInfo, 'siteinfo.displayName')
      let name = _.get(siteDetailInfo, 'siteinfo.name')
      if (siteDetailInfo.siteinfo && siteDetailInfo.siteinfo.domain === 'paracraft') {
        siteDisplayName = 'paracraft'
      }
      return siteDisplayName || name
    },
    sitePath() {
      let { sitepath } = this.activePageInfo
      return sitepath
    },
    breadcrumbs() {
      let { username, sitename, paths = [] } = this.activePageInfo
      if (paths.length <= 0) return []
      let breadcrumbs = paths.map((path, index) => {
        let currentPath = [username, sitename, ...paths.slice(0, index)].join(
          '/'
        )
        return this.gitlabChildrenByPath(currentPath)
      })
      return breadcrumbs
    },
    locationOrigin() {
      return location.origin
    },
    editorPageUrl() {
      return `/ed/${this.activePageUrl}`
    }
  },
  watch: {
    async sitePath(sitePath) {
      if (!sitePath) return
      this.breadcrumbsLoading = true
      await this.gitlabGetRepositoryTree({
        path: sitePath,
        editorMode: false
      }).catch(e => console.error(e))
      this.breadcrumbsLoading = false
    },
    activePageInfo: {
      deep: true,
      async handler(newActivePageInfo) {
        let { username } = newActivePageInfo
        if (!username) {
          return
        }
        await this.getUserDetailByUsername({ username })
        let result = this.userGetDetailByUsername(username)
        this.siteList = result.allSiteList
      }
    }
  },
  methods: {
    ...mapActions({
      starPages: 'user/starPages',
      gitlabGetRepositoryTree: 'gitlab/getRepositoryTree',
      getUserDetailByUsername: 'user/getUserDetailByUsername',
      getProfile: 'user/getProfile'
    }),
    pushNewUrl(site) {
      this.$router.push(`/${site.username}/${site.name}`)
    },
    showSocialShare() {
      let { username: siteUsername, sitename } = this.activePageInfo
      window.socialShare('.kp-social-share', {
        mode: 'prepend',
        description:
          this.$t('common.iShare') +
          `${siteUsername}` +
          this.$t('common.shareToYouA'),
        title:
          `${this.displayUsername}` +
          this.$t('common.shareToYouB') +
          `${siteUsername}` +
          this.$t('common.maded') +
          `${siteUsername}` +
          this.$t('common.websiteB'),
        sites: ['qq', 'qzone', 'weibo', 'wechat'],
        wechatQrcodeTitle: '', // 微信二维码提示文字
        wechatQrcodeHelper: this.$t('common.QR')
      })
    },
    async togglePageStar() {
      this.starPending = true
      if (!this.isLogin) {
        this.isLoginDialogShow = true
        this.starPending = false
        return
      }
      await this.starPages({
        url: this.activePageUrl
      }).catch(e => {
        console.log(e)
        this.$message({
          showClose: true,
          message: this.$t('common.error'),
          type: 'error'
        })
      })
      this.starPending = false
    },
    handleBreadcrumbClick(file) {
      let targetFile = file

      if (file.type === 'tree') {
        let children = this.gitlabChildrenByPath(file.path)
        let indexChild = children.filter(file => file.name === 'index.md')[0]
        let firstFileTypeChild = children.filter(
          file => file.type === 'blob'
        )[0]
        targetFile =
          indexChild || firstFileTypeChild || children[0] || targetFile
      }

      let url =
        targetFile && targetFile.path && targetFile.path.replace(/\.md$/, '')
      if (!url) return
      this.$router.push('/' + url)
    },
    closeLoginDialog() {
      this.isLoginDialogShow = false
    }
  },
  filters: {
    hideMarkdownExt: (str = '') => str.replace(/\.md$/, '')
  },
  components: {
    LoginDialog
  }
}
</script>
<style lang="scss">
.breadcrumb-item-dropdown {
  padding: 0;
  min-width: 40px;
  border-color: #e4e7ed;
  .clearfix::after {
    content: '';
    clear: both;
    display: table;
  }
  .file-list-content {
    max-height: 380px;
    box-sizing: border-box;
    overflow: scroll;
    padding: 15px 0;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    color: #909399;
    cursor: pointer;
    font-size: 14px;
    a {
      color: inherit;
      text-decoration: none;
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  li:hover {
    background-color: #e5f2f8;
    color: #0081ba;
  }
  .file-list-item {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  .list-content {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
  .icon-private {
    float: right;
    margin-left: 15px;
    font-size: 18px;
  }
}
.tool-header {
  position: relative;
  height: 50px;
  .breadcrumb {
    display: inline-block;
    padding: 0 200px 0 20px;
    height: 52px;
    line-height: 52px;
    .el-loading-spinner {
      top: 35%;
      transform: scale(0.4);
    }
  }
  .breadcrumb-item {
    color: #909399;
    display: inline-block;
  }
  .page-item-content {
    padding: 0 10px 0 16px;
    border: 1px solid #dcdfe6;
    display: inline-block;
    height: 28px;
    line-height: 26px;
    border-radius: 30px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
  }
  .page-item-content:hover {
    color: #0081ba;
    border-color: #cce6f1;
  }
  .icon-home-keepwork {
    font-size: 22px;
    vertical-align: middle;
    top: -2px;
    position: relative;
  }
  .breadcrumb-separator {
    color: #dbdbdb;
    padding: 0 6px;
  }
  .icons {
    position: absolute;
    right: 0;
    top: 0;
  }
  .icon-item {
    line-height: 1;
    padding: 10px 8px;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    color: #2c3e50;
  }
  .icon-item .iconfont {
    font-size: 30px;
    vertical-align: middle;
  }
  .icon-item .iconfont.active {
    color: #fe7532;
  }
  a {
    color: #606266;
    text-decoration: none;
    font-size: 14px;
  }
  .el-dropdown-link:hover,
  a:hover {
    color: #0081ba;
    cursor: pointer;
  }
}

.kp-social-share.social-share {
  text-align: center;

  .icon-wechat {
    visibility: hidden;
    height: 150px;

    .wechat-qrcode {
      top: 0;
      left: -40px;
      width: 110px;
      background-color: transparent;
      box-shadow: none;
      border: none;
      visibility: visible;
      display: block;
      height: 165px;
    }
    .wechat-qrcode::after {
      content: none;
    }
    h4 {
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
@media (max-width: 768px) {
  .tool-header {
    height: auto;
    .breadcrumb {
      height: 40px;
      line-height: 40px;
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      max-width: 100%;
      box-sizing: border-box;
      padding: 0 15px;
    }
    .icons {
      position: relative;
      text-align: right;
      padding-right: 15px;
    }
    .icon-item {
      padding: 0 8px;
      .iconfont {
        font-size: 20px;
      }
    }
    img {
      width: 20px;
    }
  }
}
</style>
