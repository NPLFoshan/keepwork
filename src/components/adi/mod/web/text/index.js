/*doc
---
title: Text Mod
name: Text Mod
category: Adi Mod
---

This is the Text Mod for usage.

```@Text
styleID: // 样式ID
title:
  name: // 标题名称
  link: // 标题点击跳转链接
  target: // 链接从新窗口打开或本窗口打开
paragraph:
  data: // 文章内容

```

*/

import { generateProperties } from '@/components/adi/mod/base/base.utils'
import mod from '@/components/adi/mod/base/Base'
import styles from './text.styles'
import templates from './text.templates'
import themeData from './text.theme'

const name = 'ModText'

const components = {
  title: 'AdiTitle',
  subtitle: 'AdiTitle',
  paragraph: 'AdiMarkdown',
  button: 'AdiButton',

  titleB: 'AdiTitle',
  subtitleB: 'AdiTitle',
  paragraphB: 'AdiMarkdown',
  buttonB: 'AdiButton',

  titleC: 'AdiTitle',
  subtitleC: 'AdiTitle',
  paragraphC: 'AdiMarkdown',
  buttonC: 'AdiButton',

  titleD: 'AdiTitle',
  subtitleD: 'AdiTitle',
  paragraphD: 'AdiMarkdown',
  buttonD: 'AdiButton'
}

const properties = generateProperties(name, components)

export default { mod, name, components, properties, styles, templates, themeData }
