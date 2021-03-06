import _ from 'lodash'
import ModFactory from '@/lib/mod/factory'
import Parser from '@/lib/mod/parser'
import BlockHelper from '@/lib/mod/parser/blockHelper'
import UndoHelper from '@/lib/utils/undo/undoHelper'
import LayoutHelper from '@/lib/mod/layout'
import { gConst } from '@/lib/global'
import { props } from './mutations'
import {
  getFileFullPathByPath,
  getFileSitePathByPath,
  CONFIG_FOLDER_NAME
} from '@/lib/utils/gitlab'
import { initPageState, initSiteState, initLayoutPageState } from './state'

const {
  SET_ACTIVE_PAGE,
  SET_ACTIVE_PAGE_URL,

  ADD_MOD,
  DELETE_MOD,
  MOVE_MOD,
  SET_PRE_MOD_KEY,
  SET_IS_MULTIPLE_TEXT_DIALOG_SHOW,

  SET_ACTIVE_MOD,
  SET_ACTIVE_PROPERTY,
  SET_ACTIVE_PROPERTY_OPTIONS,
  SET_ACTIVE_PROPERTY_DATA,
  SET_ACTIVE_AREA,

  UPDATE_ACTIVE_MOD_ATTRIBUTES,
  UPDATE_MODS,
  UPDATE_THEME_NAME,
  UPDATE_THEME_COLOR,
  UPDATE_THEME_BG_COLOR,
  UPDATE_THEME_FONT,

  UPDATE_MANAGE_PANE_COMPONENT,
  UPDATE_PROPERTY_TAB_TYPE,
  RESET_SHOWING_COL,

  UPDATE_FILEMANAGER_TREE_NODE_EXPANDED,

  LOAD_PAGE_DATA,
  ADD_OPENED_FILE,
  UPDATE_OPENED_FILE,
  CLOSE_OPENED_FILE,
  CLOSE_ALL_OPENED_FILE,

  SET_EDITING_AREA,
  SET_NEW_MOD_POSITION,

  REFRESH_SITE_SETTINGS,
  UPDATE_OPENED_LAYOUT_FILE,

  UPDATE_CURSOR_POSITION,

  UNDO,
  REDO,
  SAVE_HISTORY,
  INIT_UNDO,
  TOGGLE_SKY_DRIVE,
  ADD_RECENT_OPENED_SITE
} = props

const actions = {
  // Page
  async setActivePage(context, { path, editorMode = true }) {
    path = decodeURIComponent(path)
    let {
      state,
      getters,
      commit,
      dispatch
    } = context
    // load profile and websites info to get correct projectIds for reading files
    // await dispatch('user/getAllPersonalAndContributedSite', {root: true})
    let {
      'user/username': username
    } = context.rootGetters
    commit(SET_ACTIVE_PAGE_URL, { path })
    if (path === '/') return commit(SET_ACTIVE_PAGE, { path, username })
    const fullPath = getFileFullPathByPath(path)
    const sitePath = getFileSitePathByPath(path)
    const siteData = state.siteSettings[sitePath]

    if (!siteData) {
      await dispatch('refreshSiteSettings', { sitePath })
    }

    const pageData = getters.openedPages[fullPath]
    const needReload = !pageData
    if (needReload) {
      await dispatch('loadActivePage', { path, editorMode })
    }

    commit(SET_ACTIVE_PAGE, { path, username })
    await dispatch('refreshModList')
    await dispatch('refreshCode')

    if (needReload) {
      commit(INIT_UNDO, {
        newCode: getters.code,
        cursor: { line: 0, ch: 0 }
      })
    }
  },
  async loadActivePage(
    { commit, dispatch, getters },
    { path, editorMode = true }) {
    const fullPath = getFileFullPathByPath(path)
    let file = getters.openedFiles[fullPath]
    if (!file) await dispatch('openFile', { path, editorMode })

    file = getters.openedFiles[fullPath]
    if (file) {
      let pageData = initPageState()
      pageData.file = file
      pageData.modList = Parser.buildBlockList(file.content)
      commit(LOAD_PAGE_DATA, { path: fullPath, pageData })
    }
  },
  async saveActivePage({ getters, dispatch }) {
    let { activePageUrl, layoutPages } = getters
    await dispatch('savePageByPath', activePageUrl)
    // Save layout files
    for (let i = 0; i < layoutPages.length; i++) {
      let pageData = layoutPages[i]
      if (!pageData.saved) {
        await dispatch('saveSiteConfigPage', pageData)
      }
    }
  },
  async savePageByPath(
    {
      getters: { getOpenedFileByPath },
      dispatch
    },
    path
  ) {
    if (!path) return
    let { content, saved } = getOpenedFileByPath(path)
    if (!saved) {
      await dispatch('gitlab/saveFile', { content, path }, { root: true })
      dispatch('updateOpenedFile', { saved: true, path })
    }
  },

  // siteSetting
  async refreshSiteSettings(
    { commit, dispatch, rootGetters },
    { sitePath }
  ) {
    let siteSetting = initSiteState()

    await dispatch('user/getSiteLayoutConfig', { path: sitePath })
    await dispatch('user/getSiteThemeConfig', { path: sitePath })
    let {
      'user/siteLayoutConfigBySitePath': siteLayoutConfigBySitePath,
      'user/siteThemeConfigBySitePath': siteThemeConfigBySitePath,
      'user/allLayoutContentFilePathsBySitePath': allLayoutContentFilePathsBySitePath,
      'gitlab/getFileByPath': gitlabGetFileByPath
    } = rootGetters
    siteSetting.siteLayoutConfig = siteLayoutConfigBySitePath(sitePath)
    siteSetting.theme = siteThemeConfigBySitePath(sitePath)
    let allLayoutContentFilePaths = allLayoutContentFilePathsBySitePath(
      sitePath
    )

    await Promise.all(
      allLayoutContentFilePaths.map(async layoutContentFilePath => {
        let fileName = layoutContentFilePath
          .split('/')
          .slice(1)
          .join('/')
        let filePath = `${sitePath}/${CONFIG_FOLDER_NAME}/pages/${layoutContentFilePath}`
        await dispatch(
          'gitlab/readFile',
          { path: filePath, editorMode: true },
          { root: true }
        )
        let { content } = gitlabGetFileByPath(filePath)
        siteSetting.pages[layoutContentFilePath] = initLayoutPageState()
        _.merge(siteSetting.pages[layoutContentFilePath], {
          content,
          modList: Parser.buildBlockList(content),
          path: filePath,
          fileName
        })
      })
    ).catch(e => console.error(e))

    commit(REFRESH_SITE_SETTINGS, { sitePath, siteSetting })
  },
  async updateOpenedLayoutFile({ getters, commit }, payload) {
    let { sitePath, activeArea, activeAreaData } = getters
    commit(UPDATE_OPENED_LAYOUT_FILE, {
      sitePath,
      layoutContentFilePath: `${activeArea}s/${activeAreaData.fileName}`,
      data: payload
    })
  },

  // Files
  async loadFile(
    { commit, dispatch, rootGetters, getters },
    { path, editorMode = true }
  ) {
    await dispatch('gitlab/readFile', { path, editorMode }, { root: true })
    let {
      'gitlab/getFileByPath': gitlabGetFileByPath,
      'user/username': username
    } = rootGetters
    let file = gitlabGetFileByPath(path)
    if (!file) return

    let { content } = file

    let fullPath = getFileFullPathByPath(path)
    let timestamp = Date.now()
    let saved = true
    let commitPayload = {
      username,
      path: fullPath,
      data: { timestamp, path, content, saved }
    }
    return commitPayload
  },
  async openFile(
    { dispatch, commit },
    { path, editorMode = true }
  ) {
    let payload = await dispatch('loadFile', { path, editorMode })
    commit(ADD_OPENED_FILE, payload)
  },
  async refreshOpenedFile(
    { commit, dispatch, getters },
    { path, editorMode = true }
  ) {
    let payload = await dispatch('loadFile', { path, editorMode })
    commit(UPDATE_OPENED_FILE, payload)
    let fullPath = getFileFullPathByPath(path)
    if (getFileFullPathByPath(getters.activePageUrl) === fullPath) {
      dispatch('refreshModList')
    }
  },
  updateOpenedFile(context, payload) {
    let { path } = payload
    let fullPath = getFileFullPathByPath(path)
    let { commit, rootGetters } = context
    let { 'user/username': username } = rootGetters

    let timestamp = Date.now()
    let commitPayload = {
      username,
      path: fullPath,
      data: { timestamp, ...payload }
    }
    commit(UPDATE_OPENED_FILE, commitPayload)
  },
  closeOpenedFile(context, { path }) {
    let fullPath = getFileFullPathByPath(path)
    let {
      commit,
      state,
      rootGetters: { 'user/username': username }
    } = context
    commit(CLOSE_OPENED_FILE, { username, path: fullPath })

    if (path === state.activePageUrl) {
      commit(SET_ACTIVE_PAGE, null)
    }
  },
  closeAllOpenedFile({ commit, rootGetters }) {
    let {
      'user/username': username
    } = rootGetters
    commit(CLOSE_ALL_OPENED_FILE, { username })
  },

  // codes
  updateCode(
    { dispatch, getters, commit },
    { code: newCode, historyDisabled, cursor }
  ) {
    let {
      code: oldCode,
      activePageUrl: path,
      activeArea
    } = getters
    if (newCode === oldCode) return
    if (activeArea === LayoutHelper.Const.MAIN_AREA) {
      dispatch('updateOpenedFile', { content: newCode, saved: false, path })
    } else {
      dispatch('updateOpenedLayoutFile', { content: newCode, saved: false })
    }
    if (!historyDisabled) { commit(SAVE_HISTORY, { newCode, cursor }) }
  },
  refreshCode({ dispatch, getters: { modList } }) {
    const code = Parser.buildMarkdown(modList)
    dispatch('updateCode', { code })
  },
  refreshModList({ commit, getters: { code } }) {
    commit(SET_ACTIVE_MOD, null)
    commit(SET_ACTIVE_PROPERTY, null)
    let blockList = Parser.buildBlockList(code)
    commit(UPDATE_MODS, blockList)
    commit(UPDATE_MANAGE_PANE_COMPONENT, 'FileManager')
  },
  // rebuild all mods, will takes a little bit more time
  async updateMarkDown({ dispatch }, payload) {
    if (payload.code === undefined) payload = { code: payload }
    await dispatch('updateCode', payload)
    await dispatch('refreshModList')
  },

  // adi mod
  moveMod({ commit, dispatch }, payload) {
    commit(SET_ACTIVE_MOD, null)
    commit(SET_ACTIVE_PROPERTY, null)
    commit(MOVE_MOD, payload)
    commit(UPDATE_MANAGE_PANE_COMPONENT, 'ModPropertyManager')
    dispatch('refreshCode')
  },
  addMod({ dispatch, getters }, payload) {
    if (getters.activePage.addingArea === gConst.ADDING_AREA_ADI) {
      dispatch('addModToAdi', payload)
    } else {
      payload.modContent = 'styleID: ' + payload.styleID
      dispatch('addModToMarkdown', payload)
    }
  },
  setPreMod({ commit }, { key = '' }) {
    commit(SET_PRE_MOD_KEY, key)
  },
  setIsMultipleTextDialogShow({ commit }, { isShow = false }) {
    commit(SET_IS_MULTIPLE_TEXT_DIALOG_SHOW, isShow)
  },
  addModToAdi({ commit, dispatch }, payload) {
    let modProperties = ModFactory.generate(payload.modName)
    modProperties.styleID = payload.styleID || modProperties.styleID
    modProperties = _.merge(modProperties, payload.modProperties)
    let newMod = Parser.buildBlock(
      Parser.getCmd(payload.modName),
      modProperties
    )
    commit(SET_ACTIVE_MOD, null)
    commit(SET_ACTIVE_PROPERTY, null)
    commit(ADD_MOD, {
      newMod,
      key: payload.preModKey
    })
    commit(UPDATE_MANAGE_PANE_COMPONENT, 'ModPropertyManager')
    dispatch('refreshCode')
  },
  async addModToMarkdown({ commit, dispatch, getters }, payload) {
    let position = getters.activePage.cursorPosition + 1
    const block = Parser.getBlockByCursorLine(getters.modList, position)
    if (block && !BlockHelper.isMarkdownMod(block)) {
      position = BlockHelper.endLine(block)
    }
    const newCode = Parser.addBlockToMarkdown(
      getters.code,
      position,
      payload.modName,
      payload.modContent
    )
    commit(SET_EDITING_AREA, { area: gConst.ADDING_AREA_ADI }) // reset editing area after mod added
    await dispatch('updateMarkDown', { code: newCode })
    const mod = Parser.getActiveBlock(getters.modList, position + 2)
    commit(SET_ACTIVE_MOD, mod.key)
    commit(SET_ACTIVE_PROPERTY, null)
    commit(UPDATE_MANAGE_PANE_COMPONENT, 'ModPropertyManager')
    dispatch('updateCursor', { cursor: { ch: 0, line: position + 2 } })
  },
  updateCursor({ commit, dispatch }, payload) {
    commit(UPDATE_CURSOR_POSITION, payload.cursor)
  },
  setNewModPosition({ commit }, position) {
    commit(SET_NEW_MOD_POSITION, position)
  },
  setAddingArea({ commit }, payload) {
    commit(SET_EDITING_AREA, payload)
  },
  setActiveMod({ commit }, key) {
    commit(SET_PRE_MOD_KEY, '')
    commit(SET_ACTIVE_MOD, key)
    commit(SET_ACTIVE_PROPERTY, null)
    commit(UPDATE_MANAGE_PANE_COMPONENT, 'ModPropertyManager')
  },
  setActiveProperty({ commit, dispatch }, payload) {
    commit(SET_PRE_MOD_KEY, '')
    commit(SET_ACTIVE_MOD, payload.key)
    commit(SET_ACTIVE_PROPERTY, payload.property)
    commit(UPDATE_MANAGE_PANE_COMPONENT, 'ModPropertyManager')
    dispatch('setActivePropertyTabType', 'attr')
  },
  setActivePropertyOptions({ commit }, playload) {
    commit(SET_ACTIVE_PROPERTY_OPTIONS, playload)
  },
  setActivePropertyTabType({ commit }, type) {
    commit(UPDATE_PROPERTY_TAB_TYPE, type)
  },
  setActivePropertyData(
    {
      commit,
      dispatch,
      getters: { activePropertyData }
    },
    { data }
  ) {
    commit(SET_ACTIVE_PROPERTY_DATA, { activePropertyData, data })
    dispatch('refreshCode')
  },
  async setActiveArea({ commit, getters, dispatch }, area) {
    let { activeArea, activeAreaData, activeAreaFile } = getters
    if (activeArea === area) return
    // save current area unless it is main area
    if (
      activeArea &&
      activeAreaData &&
      activeArea !== LayoutHelper.Const.MAIN_AREA &&
      !activeAreaFile.saved
    ) {
      await dispatch('saveSiteConfigPage', activeAreaData)
    }
    commit(SET_ACTIVE_AREA, area)
    commit(SET_ACTIVE_MOD, null)
    commit(SET_ACTIVE_PROPERTY, null)
    commit(UPDATE_MANAGE_PANE_COMPONENT, 'ModsList')
    await dispatch('refreshCode')
  },
  async saveSiteConfigPage({ commit, dispatch }, { content, path }) {
    await dispatch('gitlab/saveFile', { content, path }, { root: true })
    let [username, sitename, , , areanames, filename] = path.split('/')
    commit(UPDATE_OPENED_LAYOUT_FILE, {
      sitePath: `${username}/${sitename}`,
      layoutContentFilePath: `${areanames}/${filename}`,
      data: { saved: true }
    })
  },
  deleteMod({ commit, dispatch, state }, key) {
    commit(DELETE_MOD, key)
    if (key === _.get(state, ['activePage', 'activeMod', 'key'])) {
      commit(SET_ACTIVE_MOD, null)
      commit(SET_ACTIVE_PROPERTY, null)
      commit(UPDATE_MANAGE_PANE_COMPONENT, 'ModsList')
    }
    dispatch('refreshCode')
  },
  updateActiveModStyle({ commit, dispatch }, styleID) {
    commit(UPDATE_ACTIVE_MOD_ATTRIBUTES, {
      key: 'styleID',
      value: styleID
    })
    dispatch('refreshCode')
  },
  updateActiveModAttribute({ commit, dispatch }, payload) {
    commit(UPDATE_ACTIVE_MOD_ATTRIBUTES, payload)
    dispatch('refreshCode')
  },

  // themes
  changeTheme({ commit }, themeName) {
    commit(UPDATE_THEME_NAME, themeName)
    commit(UPDATE_THEME_COLOR, 0)
    commit(UPDATE_THEME_FONT, 0)
    commit(UPDATE_THEME_BG_COLOR, 0)
  },
  changeThemeColor({ commit }, colorID) {
    commit(UPDATE_THEME_COLOR, colorID)
  },
  changeThemeBgColor({ commit }, bgColorID) {
    commit(UPDATE_THEME_BG_COLOR, bgColorID)
  },
  changeThemeFont({ commit }, fontID) {
    commit(UPDATE_THEME_FONT, fontID)
  },
  setActiveManagePaneComponent({ commit }, payload) {
    commit(UPDATE_MANAGE_PANE_COMPONENT, payload)
  },
  resetShowingCol({ commit }, showingColObj) {
    commit(RESET_SHOWING_COL, showingColObj)
  },
  updateFilemanagerTreeNodeExpandMapByPath({ commit }, payload) {
    commit(UPDATE_FILEMANAGER_TREE_NODE_EXPANDED, payload)
  },

  // undo manager
  undo({ commit, dispatch }) {
    commit(UNDO)
    dispatch('resetCurrentItem')
  },
  redo({ commit, dispatch }) {
    commit(REDO)
    dispatch('resetCurrentItem')
  },
  resetCurrentItem({ getters, dispatch }) {
    const currentItem = UndoHelper.currentItem(getters.activeAreaData.undoManager)
    let code = currentItem.newCode || ''
    let cursor = currentItem.cursor || { line: 0, ch: 0 }
    dispatch('updateMarkDown', { code, historyDisabled: true })
    dispatch('updateCursor', { cursor })
  },
  toggleSkyDrive({ commit }, { showSkyDrive }) {
    commit(TOGGLE_SKY_DRIVE, { showSkyDrive })
  },
  addRecentOpenedSiteUrl(context, { updateRecentUrlList }) {
    let { commit, rootGetters: { 'user/username': username } } = context
    commit(ADD_RECENT_OPENED_SITE, { updateRecentUrlList, username })
  }
}

export default actions
