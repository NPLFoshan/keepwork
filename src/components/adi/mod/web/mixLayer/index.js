import { generateProperties } from '@/components/adi/mod/base/base.utils'
import styles from './mixLayer.styles'
import templates from './mixLayer.templates'
import mod from './mixLayer'
import themeData from './mixLayer.theme'

const name = 'ModMixLayer'

const components = {
  media: 'AdiMedia',
  title: 'AdiTitle',
  subtitle: 'AdiTitle',
  paragraph: 'AdiMarkdown',

  mediaA: 'AdiMedia',
  titleA: 'AdiTitle',
  subtitleA: 'AdiTitle',
  paragraphA: 'AdiMarkdown',

  mediaB: 'AdiMedia',
  titleB: 'AdiTitle',
  subtitleB: 'AdiTitle',
  paragraphB: 'AdiMarkdown',

  mediaC: 'AdiMedia',
  titleC: 'AdiTitle',
  subtitleC: 'AdiTitle',
  paragraphC: 'AdiMarkdown',

  mediaD: 'AdiMedia',
  titleD: 'AdiTitle',
  subtitleD: 'AdiTitle',
  paragraphD: 'AdiMarkdown'

}

const properties = generateProperties(name, components)

export default { mod, name, components, properties, styles, templates, themeData }
