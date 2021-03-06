import _ from 'lodash'
import compDefaultProperties from './comp.properties'

export default {
  props: {
    source: Object,
    options: Object,
    theme: Object,
    editMode: {
      type: Boolean,
      'default': false
    }
  },
  computed: {
    properties() {
      if (typeof this.source !== 'object') {
        return {}
      }

      return this.source || {}
    }
  },
  methods: {
    generateStyleString(style) {
      let string = ''

      _.forEach(style, (value, key) => {
        string = string + key + ':' + value + ';'
      })

      return string
    },
    px2rem(px) {
      let rem = 100

      return parseInt(px) / rem + 'rem'
    }
  }
}
