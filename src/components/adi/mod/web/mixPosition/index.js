import { generateProperties } from '@/components/adi/mod/base/base.utils'
import styles from './mixPosition.styles'
import templates from './mixPosition.templates'
import mod from './mixPosition'

const name = 'ModMixPosition'

const components = {
  media: 'AdiMedia',
  title: 'AdiTitle',
  subtitle: 'AdiTitle',
  paragraph: 'AdiMarkdown',
  button: 'AdiButton',
  mediaTwo: 'AdiMedia',
  titleTwo: 'AdiTitle',
  subtitleTwo: 'AdiTitle',
  paragraphTwo: 'AdiMarkdown',
  buttonTwo: 'AdiButton'
}

const properties = generateProperties(name, components)

export default {
  mod,
  name,
  components,
  properties,
  styles,
  templates
}
