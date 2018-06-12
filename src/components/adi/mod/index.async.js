const ModMarkdown = () => import('./common/markdown')
const ModIFrame = () => import('./common/iframe')
const ModHeadNavigation = () => import('./web/title')
const ModMixPosition = () => import('./web/mixPosition')
const ModMixLayer = () => import('./web/mixLayer')
const ModWideScreen = () => import('./web/img')
const ModMenu = () => import('./web/menu')
const ModImgLoop = () => import('./web/imgLoop')
const ModParacraft = () => import('./web/paracraft')
const ModQQ = () => import('./web/qq')
const ModText = () => import('./web/text')
const ModVipRead = () => import('./web/vipRead')
const ModComment = () => import('./web/comment')
const ModBoard = () => import('./web/board')
const ModTextBoard = () => import('./web/textBoard')
const ModPageList = () => import('./web/pageList')
const ModToc = () => import('./web/toc')
const ModBigFile = () => import('./web/bigFile')
const ModTab = () => import('./web/tab')
const ModButton = () => import('./web/button')
const ModPagePath = () => import('./web/pagePath')
const ModCategoryList = () => import('./web/categoryList')
const ModPageSwitching = () => import('./web/pageSwitching')

export const modList = {
  ModMarkdown,
  ModIFrame,
  ModHeadNavigation,
  ModMixPosition,
  ModMixLayer,
  ModWideScreen,
  ModMenu,
  ModImgLoop,
  ModParacraft,
  ModQQ,
  ModText,
  ModVipRead,
  ModComment,
  ModBoard,
  ModTextBoard,
  ModPageList,
  ModToc,
  ModBigFile,
  ModTab,
  ModButton,
  ModPagePath,
  ModCategoryList,
  ModPageSwitching
}

export const load = async modName => {
  const mod = modList[modName]

  if (mod) return mod()
}

export default {
  load
}
