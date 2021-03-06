<template>
  <div class="el-tree-node__label" :class="operationButtonsCountClass"  v-loading="removePending || addFilePending || addFolderPending || renamePending || savePending">
    <span class="rename-wrapper" v-if="isRename">
      <el-input @click.native.stop ref="input" v-if="isRename" @blur="delayCancel" @keyup.enter.native="handleRenameConfirm" v-model="newName" class="rename-input" size="mini"></el-input>
      <el-button @click.stop="handleRenameConfirm" class="rename-btn el-icon-check" type="text" size="mini" :title='$t("editor.confirm")'></el-button>
      <el-button @click.stop="handleRenameCancel" class="rename-btn el-icon-close" type="text" size="mini" :title='$t("editor.cancel")'></el-button>
    </span>
    <span v-else-if="data.memberName">{{data.username}}/{{data.sitename}}({{data.displayName || data.name || node.label | hideMDFileExtension}})</span>
    <span v-else>{{data.displayName || data.name || node.label | hideMDFileExtension}}</span>
    <span class="node-icon">
      <i :class="['iconfont', isHasOpened ? 'icon-edited_file is-modified' : 'icon-file_']" v-if="isFile"></i>
      <i class="iconfont icon-folder" v-else-if="isFolder"></i>
      <i class="iconfont icon-private" v-else-if="isWebsite && data.visibility === 'private'"></i>
      <i class="iconfont icon-common_websites" v-else></i>
    </span>
    <span class="file-manager-buttons-container" v-if="!isRename">
      <el-button v-if="isHasOpened" v-loading='data.savePending' class="iconfont icon-save edit-hover" size="mini" type="text" :title='$t("editor.save")' @click.stop='save(data)'>
      </el-button>
      <el-button v-if="isHasOpened" class="iconfont icon-refresh edit-hover" size="mini" type="text" :title='$t("editor.reload")' @click.stop='confirmRefresh'>
      </el-button>
      <el-button v-if="isFile || isFolder" class="iconfont el-icon-edit edit-hover" size="mini" type="text" @click.stop="toggleRename" :title='$t("editor.rename")'>
      </el-button>
      <el-button v-if="isAddable" class="iconfont icon-add_file edit-hover" size="mini" type="text" @click.stop="addFile" :title='$t("editor.newPage")'>
      </el-button>
      <el-button v-if="isAddable" class="iconfont icon-folder_ edit-hover" size="mini" type="text" @click.stop="addFolder" :title='$t("editor.newFolder")'>
      </el-button>
      <el-button v-if="isRemovable" class="iconfont icon-delete edit-hover" size="mini" type="text" @click.stop="removeFile" :title='$t("editor.delete")'>
      </el-button>
      <el-button v-if="isSettable" class="iconfont icon-set_up edit-hover" size="mini" type="text" @click.stop="goSetting" :title='$t("editor.settings")'>
      </el-button>
    </span>
    <div @click.stop v-if='isWebsiteSettingShow'>
      <website-setting-dialog :show='isWebsiteSettingShow' :sitePath='currentPath' @close='closeWebsiteSettingDialog'></website-setting-dialog>
    </div>
    <div @click.stop v-if='isNewWebPageDialogShow'>
      <NewWebPageDialog :show='isNewWebPageDialogShow' :folderPath='currentPath' :sitePath='sitePath' @close='closeNewWebPageDialog' />
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import { suffixFileExtension, gitFilenameValidator } from '@/lib/utils/gitlab'
import WebsiteSettingDialog from '@/components/common/WebsiteSettingDialog'
import NewWebPageDialog from '@/components/common/NewWebPageDialog'

export default {
  name: 'FileManagerCustomTreeNode',
  props: {
    data: Object,
    node: Object
  },
  data() {
    return {
      addFolderPending: false,
      addFilePending: false,
      removePending: false,
      savePending: false,
      renamePending: false,
      isWebsiteSettingShow: false,
      isNewWebPageDialogShow: false,
      isRename: false,
      isValidator: false,
      newName: ''
    }
  },
  methods: {
    ...mapActions({
      setActiveManagePaneComponent: 'setActiveManagePaneComponent',
      gitlabGetRepositoryTree: 'gitlab/getRepositoryTree',
      gitlabCreateFile: 'gitlab/createFile',
      gitlabAddFolder: 'gitlab/addFolder',
      gitlabRemoveFile: 'gitlab/removeFile',
      gitlabRenameFile: 'gitlab/renameFile',
      gitlabRenameFolder: 'gitlab/renameFolder',
      gitlabRemoveFolder: 'gitlab/removeFolder',
      updateFilemanagerTreeNodeExpandMapByPath:
        'updateFilemanagerTreeNodeExpandMapByPath',
      userGetSiteLayoutConfig: 'user/getSiteLayoutConfig',
      userDeletePagesConfig: 'user/deletePagesConfig',
      savePageByPath: 'savePageByPath',
      refreshOpenedFile: 'refreshOpenedFile',
      addRecentOpenedSiteUrl: 'addRecentOpenedSiteUrl'
    }),
    async addFile() {
      this.openNewWebPageDialog()
      // let newFileName = await this.newFileNamePrompt()
      // newFileName = suffixFileExtension(newFileName, 'md')
      // let newFilePath = `${this.currentPath}/${newFileName}`
      // this.addFilePending = true
      // await this.gitlabCreateFile({ path: newFilePath })
      // this.expandFolder(newFilePath)
      // this.addFilePending = false
    },
    async addFolder() {
      let self = this

      let newFolderName = await this.newFileNamePrompt({
        what: self.$t('editor.folder')
      })
      if (!newFolderName) return
      let newFolderPath = `${this.currentPath}/${newFolderName}`
      this.addFolderPending = true
      await this.gitlabAddFolder({ path: newFolderPath })
      this.expandFolder(newFolderPath)
      this.addFolderPending = false
    },
    async newFileNamePrompt({ what = this.$t('editor.website') } = {}) {
      let self = this

      await this.gitlabGetRepositoryTree({ path: this.sitePath })
      let childNames = this.gitlabChildNamesByPath(this.currentPath)

      let { value: newFileName } = await this.$prompt(
        `${what} ${self.$t('editor.name')}`,
        `${self.$t('editor.new')} ${what}`,
        {
          cancelButtonText: self.$t('el.messagebox.cancel'),
          confirmButtonText: self.$t('el.messagebox.confirm'),
          inputValidator: str => {
            let value = (str || '').trim()
            if (!value) return self.$t('editor.required')
            if (!gitFilenameValidator(value))
              return self.$t('editor.nameRule')
            if (childNames.indexOf(value) > -1)
              return self.$t('editor.nameExist')
            return true
          }
        }
      )

      return newFileName && newFileName.trim()
    },
    expandFolder(path) {
      this.updateFilemanagerTreeNodeExpandMapByPath({
        path: path
          .split('/')
          .slice(0, -1)
          .join('/'),
        expanded: true
      })
    },
    removeFolder(data) {
      // let pathArr = data.path.split('/')
      // let folderName = pathArr[pathArr.length - 1]
      let folder = data.path
      let toRemoveFiles = this.recursion(data)

      const h = this.$createElement
      this.$msgbox({
        title: this.$t('editor.delete'),
        message: h('p', null, [
          h('span', null, this.$t('editor.deleteFolderBefore')),
          h('span', { style: 'color: #FF4342' }, ` "${data.name} "`),
          h('span', null, this.$t('editor.deleteFolderAfter'))
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t('el.messagebox.confirm'),
        cancelButtonText: this.$t('el.messagebox.cancel')
      })
        .then(async () => {
          this.removePending = true
          await this.gitlabRemoveFolder({ folder, paths: toRemoveFiles })
          await this.deletePagesFromLayout({ paths: toRemoveFiles })
          this.removeRecentOpenFolder(toRemoveFiles)
          this.resetPage({ toRemoveFiles })
          this.removePending = false
        })
        .catch(e => console.error(e))
    },
    removeRecentOpenFolder(toRemoveFiles){
      let toDele = _.map(toRemoveFiles,(i => `/${i.replace(/\.md$/,'')}`))
      let updateRecentUrlList = this.updateRecentUrlList.filter(item => toDele.indexOf(item.path) === -1 )
      this.addRecentOpenedSiteUrl({ updateRecentUrlList })
    },
    recursion(data) {
      let childrenFiles = []
      const recursionFile = data => {
        // if (!/.md$/.test(data.path)) {
        //   childrenFiles.push(`${data.path}/.gitignore.md`)
        // } else {
        //   childrenFiles.push(data.path)
        // }
        if (/.md$/.test(data.path)) {
          childrenFiles.push(data.path)
        }
        data.children && data.children.forEach(item => recursionFile(item))
      }
      recursionFile(data)
      return childrenFiles
    },
    async save(data) {
      if (data.savePending === undefined) {
        this.$set(data, 'savePending', false)
      }
      let path = data.path
      data.savePending = true
      await this.savePageByPath(path)
      data.savePending = false
    },
    confirmRefresh(){
      this.$confirm(this.$t('editor.pullServerData'), this.$t('editor.hint'), {
        confirmButtonText: this.$t('el.messagebox.confirm'),
        cancelButtonText: this.$t('el.messagebox.cancel'),
        type: 'warning'
      }).then(() => {
        this.refreshOpenedFile(this.data)
      }).catch((err) => { console.warn(err) });
    },
    async toggleRename() {
      if (this.isFolder) {
        let childrenFiles = this.recursion(this.data)
        let unSavedFiles = _.intersection(this.unSavedFiles, childrenFiles)
        if (unSavedFiles.length > 0) {
          await this.$confirm(
            `${unSavedFiles.length}${this.$t('editor.filesUnSaved')}`,
            {
              confirmButtonText: this.$t('editor.confirm'),
              cancelButtonText: this.$t('editor.cancel'),
              type: 'warnning'
            }
          )
            .then(async () => {
              this.savePending = true
              let num = unSavedFiles.length
              let files = unSavedFiles.map(i => i.replace(/.md$/, ''))
              while (num--) {
                await this.savePageByPath(files[num])
              }
              this.savePending = false
            })
            .catch(() => {})
        }
      } else {
        let { saved } = this.getOpenedFileByPath(this.filePath)
        if (!saved) {
          await this.$confirm(this.$t('editor.theFileUnSaved'), {
            confirmButtonText: this.$t('el.messagebox.confirm'),
            cancelButtonText: this.$t('el.messagebox.cancel'),
            type: 'warning'
          })
            .then(async () => {
              await this.savePageByPath(this.filePath)
              this.$message({
                type: 'success',
                message: this.$t('editor.saveSuccess')
              })
              this.toggleInputFocus()
            })
          return
        }
      }
      this.toggleInputFocus()
    },
    toggleInputFocus() {
      this.isRename = true
      this.newName = this.data.name.replace(/.md$/, '')
      this.$nextTick(() => this.$refs.input.focus())
    },
    async handleRenameConfirm() {
      if (
        !this.newName.trim() ||
        this.newName.trim() === this.data.name.replace(/.md$/, '')
      ) {
        return (this.isRename = false)
      }
      await this.gitlabGetRepositoryTree({ path: this.sitePath })
      let childNames = await this.gitlabChildNamesByPath(
        this.currentPath
          .split('/')
          .slice(0, -1)
          .join('/')
      )
      if (childNames.indexOf(this.newName) > -1) {
        return this.$message.error(this.$t('editor.nameExist'))
      }
      if (!gitFilenameValidator(this.newName)) {
        this.isValidator = true
        return this.$message.error(
          `${this.newName} ${this.$t('editor.nameRule')}`
        )
      }
      this.renamePending = true
      if (this.isFolder) {
        let childrenFiles = this.recursion(this.data)
        await this.gitlabRenameFolder({
          currentFolderPath: this.currentPath,
          newFolderPath: `${this.parentPath}/${this.newName}`,
          childrenFiles
        })
      } else {
        let newFilePath = `${this.parentPath}/${this.newName}.md`
        await this.gitlabRenameFile({
          currentFilePath: this.data.path,
          newFilePath: newFilePath
        })
        this.updateFilemanagerTreeNodeExpandMapByPath(newFilePath)
      }
      this.isRename = false
      this.renamePending = false
      this.isValidator = false
      this.resetPage({ currentPath: this.currentPath })
    },
    handleRenameCancel() {
      this.isRename = false
      this.isValidator = false
      this.newFileName = ''
    },
    delayCancel() {
      setTimeout(
        () =>
          !this.isValidator && !this.renamePending && this.handleRenameCancel(),
        250
      )
    },
    removeFile() {
      if (this.isFolder) {
        return this.removeFolder(this.data)
      }
      const h = this.$createElement
      let siteName = this.data.path.split('/').slice(1,2)
      let fileName = this.data.name.replace(/\.md$/, '')
      this.$msgbox({
        title: this.$t('editor.modDelMsgTitle'),
        message: h('p', null, [
          h('span', null, this.$t('editor.delConfirm')),
          h('span', { style: 'color: #FF4342' }, ` "${siteName}/${fileName} " `),
          h('span', null, '?')
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t('el.messagebox.confirm'),
        cancelButtonText: this.$t('el.messagebox.cancel')
      })
        .then(async () => {
          this.removePending = true
          await this.gitlabRemoveFile({ path: this.currentPath})
          await this.deletePagesFromLayout({ paths: [this.currentPath] })
          this.removeRecentOpenFile(this.currentPath)
          this.resetPage({ currentPath: this.currentPath })
          this.removePending = false
        })
        .catch(() => {})
    },
    removeRecentOpenFile(path){
      let delPath = `/${path.replace(/\.md$/,'')}`
      let updateRecentUrlList = this.updateRecentUrlList.filter(item => item.path !== delPath)
      this.addRecentOpenedSiteUrl({ updateRecentUrlList })
    },
    async deletePagesFromLayout({ paths = [] }) {
      const re = /^\w+\/\w+\//
      let sitePath = paths[0].match(re)
      if (sitePath) sitePath = sitePath[0].replace(/\/$/, '')
      let pages = _.map(paths, page => page.replace(re, ''))
      await this.userGetSiteLayoutConfig({ path: sitePath })
      let config = this.getSiteLayoutConfigBySitePath(sitePath)
      await this.userDeletePagesConfig({ sitePath, pages })
    },
    resetPage({ currentPath = null, toRemoveFiles = null }) {
      if (toRemoveFiles && toRemoveFiles.length > 0) {
        let currentRoutePath = this.$route.path.substring(1)
        let isRestPage = toRemoveFiles.some(item => {
          return item.split('.')[0] === currentRoutePath
        })
        if (isRestPage) {
          return this.$router.push('/')
        }
      }
      if (
        currentPath &&
        currentPath.split('.')[0] === this.$route.path.substring(1)
      ) {
        return this.$router.push('/')
      }
    },
    goSetting() {
      if (this.isWebsite) {
        this.openWebsiteSettingDialog()
      }
      if (this.isFile) {
        this.setActiveManagePaneComponent({
          name: 'PageSetting',
          props: {
            pagePath: this.currentPath
          }
        })
      }
    },
    openWebsiteSettingDialog() {
      this.isWebsiteSettingShow = true
    },
    closeWebsiteSettingDialog() {
      this.isWebsiteSettingShow = false
    },
    openNewWebPageDialog() {
      this.isNewWebPageDialogShow = true
    },
    closeNewWebPageDialog() {
      this.isNewWebPageDialogShow = false
    }
  },
  computed: {
    ...mapGetters({
      gitlabChildNamesByPath: 'gitlab/childNamesByPath',
      getSiteLayoutConfigBySitePath: 'user/siteLayoutConfigBySitePath',
      getOpenedFileByPath: 'getOpenedFileByPath',
      openedFiles: 'openedFiles',
      username: 'user/username',
      updateRecentUrlList: 'updateRecentUrlList'
    }),
    operationButtonsCountClass(){
      let count = _.compact([this.isHasOpened, this.isHasOpened, this.isFile, this.isFolder, this.isAddable, this.isAddable, this.isRemovable, this.isSettable]).length
      let buttonCountClass = this.isRename ? '' : `buttons-count-${count}`
      let websiteLabelClass = this.isWebsite ? ' website-node-label':''
      return buttonCountClass + websiteLabelClass
    },
    pending() {
      return (
        this.addFolderPending ||
        this.addFilePending ||
        this.removePending ||
        this.renamePending
      )
    },
    isFile() {
      return this.data.type === 'blob'
    },
    isHasOpened() {
      return this.isFile && _.keys(this.openedFiles).indexOf(this.data.path) !== -1
    },
    isFolder() {
      return this.data.type === 'tree'
    },
    isWebsite() {
      return this.node.level === 1
    },
    isAddable() {
      return !this.isFile
    },
    isRemovable() {
      return this.node.level !== 1
    },
    isSettable() {
      return this.isWebsite || this.isFile
    },
    currentPath() {
      return this.isWebsite
        ? `${this.data.username}/${this.data.name}`
        : this.data.path
    },
    sitePath() {
      if (this.isWebsite) return `${this.data.username}/${this.data.name}`

      let [username, name] = this.data.path.split('/')
      return `${username}/${name}`
    },
    filePath() {
      return this.data.path.replace(/\.md$/, '')
    },
    unSavedFiles() {
      return _.keys(_.pickBy(this.openedFiles, ({ saved }) => !saved))
    },
    parentPath() {
      return this.data.path
        .split('/')
        .slice(0, -1)
        .join('/')
    }
  },
  filters: {
    hideMDFileExtension(str) {
      return str.replace(/\.md$/, '')
    }
  },
  components: {
    WebsiteSettingDialog,
    NewWebPageDialog,
  }
}
</script>

<style lang="scss">
.el-tree-node__label {
  padding-left: 20px;
}
.website-node-label{
  margin-left: -24px;
  padding-left: 44px;
  .node-icon{
    left: 24px;
  }
}
.el-tree-node__label::before {
  content: ' ';
  display: inline-block;
  position: absolute;
  margin-left: -50px;
  height: 30px;
  width: 30px;
}
.el-tree-node__content:hover {
    .buttons-count-3{
      padding-right: 105px;
    }
    .buttons-count-4{
      padding-right: 135px;
    }
    .buttons-count-5{
      padding-right: 160px;
    }
  }
.icon-folder::before {
  font-size: 0.8em;
  color: #ffac33;
}
.edit-hover:hover {
  color: #409eff !important;
}

.rename-wrapper {
  display: inline-flex;
  .rename-btn {
    width: 20px;
    margin: 0 10px;
    color: #8a8a8a;
    font-weight: bold;
    font-size: 1.2em;
  }
}
</style>
