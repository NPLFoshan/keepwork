<script>
import compBaseMixin from '../comp.base.mixin'
import _ from 'lodash'

const renderTemplate = (h, m, data, parentIndex) => {
  data = data || m.data

  let index = 0

  function getIndexString(index, isSubIndex) {
    if (parentIndex) {
      return String(parentIndex + '-' + index)
    } else {
      return String(index)
    }
  }

  return _.map(data, footerData => {
    index++

    if (!footerData.child) {
      return (
        <div index={getIndexString(index)} style={m.options.itemStyle}>
          <a
            target={
              m.properties.target ? m.properties.target : m.options.emptyTarget
            }
            href={footerData.link}
          >
            {m.isEmptyData ? m.$t(footerData.name) : footerData.name}
          </a>
        </div>
      )
    } else {
      return (
        <div index={getIndexString(index)} style={m.options.itemStyle}>
          <a
            target={
              m.properties.target ? m.properties.target : m.options.emptyTarget
            }
            href={footerData.link}
          >
            {m.isEmptyData ? m.$t(footerData.name) : footerData.name}
          </a>
          {renderTemplate(h, m, footerData.child, getIndexString(index))}
        </div>
      )
    }
  })
}

export default {
  name: 'AdiFooter',
  render(h) {
    return (
      <div class="comp-footer">
        <div
          // mode={this.mode}
          background-color={this.options.menuBackground}
          // text-color={this.options.fontColor}
          style={
            'display:' +
            this.options.disPlay +
            ';' +
            'justify-content:' +
            this.options.justifyContent +
            ';'
          }
          // active-text-color={this.options.fontColor}
        >
          {renderTemplate(h, this)}
        </div>
      </div>
    )
  },
  mixins: [compBaseMixin],
  computed: {
    mode() {
      return this.options.mode
    },
    data() {
      return this.properties.data
    },
    isEmptyData() {
      return this.properties.data.length != 0 ? false : true
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: unset;
}

.comp-footer {
  height: 100%;
  padding: 20px 0;
  a:hover {
    color: #1780dc;
  }
  // .nav-group {
  //   // padding: 0 20px;
  // }
  // .nav-title {
  //   // padding-bottom: 20px;
  //   // font-weight: bold;
  // }
}
</style>
