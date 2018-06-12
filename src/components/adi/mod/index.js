import ModMarkdown from './common/markdown'
import ModIFrame from './common/iframe'
import ModHeadNavigation from './web/title'
import ModMixPosition from './web/mixPosition'
import ModMixLayer from './web/mixLayer'
import ModWideScreen from './web/img'
import ModMenu from './web/menu'
import ModImgLoop from './web/imgLoop'
import ModParacraft from './web/paracraft'
import ModQQ from './web/qq'
import ModText from './web/text'
import ModBoard from './web/board'
import ModVipRead from './web/vipRead'
import ModComment from './web/comment'
import ModTextBoard from './web/textBoard'
import ModPageList from './web/pageList'
import ModToc from './web/toc'
import ModBigFile from './web/bigFile'
import ModTab from './web/tab'
import ModButton from './web/button'
import ModPagePath from './web/pagePath'
import ModCategoryList from './web/categoryList'
import ModPageSwitching from './web/pageSwitching'

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
  ModBoard,
  ModVipRead,
  ModComment,
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

export const load = modName => {
  return modList[modName]
}

export default {
  load
}
