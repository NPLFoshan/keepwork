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

  function getClass() {
    if (parentIndex != 1) {
      return 'footer-subtitle'
    } else {
      return 'footer-title'
    }
  }

  return _.map(data, menuData => {
    index++

    if (!parentIndex) {
      parentIndex = index
    }

    if (m.options.type === 'menu' && !menuData.child) {
      return (
        <el-menu-item
          index={getIndexString(index)}
          style={parentIndex == 1 && m.itemStyle}
        >
          <a
            target={m.menuTarget}
            href={menuData.link}
          >
            {m.getNameMenu(menuData)}
          </a>
        </el-menu-item>
      )
    } else if (m.options.type === 'menu' && menuData.child) {
      return (
        <el-submenu
          index={getIndexString(index)}
          style={parentIndex == 1 && m.itemStyle}
        >
          <template slot="title">
            <a
              target={m.menuTarget}
              href={menuData.link}
            >
              {m.getNameMenu(menuData)}
            </a>
          </template>
          {renderTemplate(h, m, menuData.child, getIndexString(index))}
        </el-submenu>
      )
    } else if (m.options.type !== 'menu' && menuData.child) {
      return (
        <div
          index={getIndexString(index)}
          style={m.options.itemStyle}
          class={getClass()}
        >
          <a
            target={m.menuTarget}
            style={m.getItemStyle(parentIndex)}
            href={menuData.link}
          >
            {m.getNameMenu(menuData)}
          </a>
          {renderTemplate(h, m, menuData.child, getIndexString(index))}
        </div>
      )
    } else {
      return (
        <div
          index={getIndexString(index)}
          style={m.options.itemStyle}
          class={getClass()}
        >
          <a
            target={m.menuTarget}
            style={m.getItemStyle(parentIndex)}
            href={menuData.link}
          >
            {m.getNameMenu(menuData)}
          </a>
        </div>
      )
    }
  })
}

export default {
  name: 'AdiMenu',
  render(h) {
    if (this.options.type === 'menu') {
      return (
        <div class="comp-menu">
          <el-menu
            mode={this.mode}
            background-color={this.options.menuBackground}
            text-color={this.options.fontColor}
            active-text-color={this.options.fontColor}
            style={this.menuStyle}
          >
            {renderTemplate(h, this)}
          </el-menu>
        </div>
      )
    } else if (this.options.type === 'footer') {
      return (
        <div class="comp-footer">
          <div
            background-color={this.options.footerBackground}
            style={this.optionsStyle}
          >
            {renderTemplate(h, this)}
          </div>
        </div>
      )
    }
  },
  mixins: [compBaseMixin],
  computed: {
    menuStyle() {
      return this.generateStyleString(this.options.menuStyle)
    },
    itemStyle() {
      return this.generateStyleString(this.options.itemStyle)
    },
    getItemTopStyle() {
      return this.generateStyleString({
        'font-size': this.options.itemTop
      })
    },
    getItemOtherStyle() {
      return this.generateStyleString({
        'font-size': this.options.itemOther
      })
    },
    mode() {
      return this.options.mode
    },
    data() {
      return this.properties.data
    },
    isEmptyData() {
      return this.properties.data.length != 0 ? false : true
    },
    menuTarget() {
      return this.properties.target ? this.properties.target : this.options.emptyLinkTarget
    },
    optionsStyle() {
      return 'display:' + this.options.display + ';' + 'justify-content:' + this.options.justifyContent + ';'
    }
  },
  methods: {
    getNameMenu(menuData) {
      return this.isEmptyData ? this.$t(menuData.name) : menuData.name
    },
    getItemStyle(parentIndex) {
      return parentIndex == 1 ? this.getItemTopStyle : this.getItemOtherStyle
    }

  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: unset;
}
.el-menu--horizontal {
  .el-menu {
    .el-submenu {
      .el-submenu__title {
        //子菜单
        padding: 0;
        a {
          //子菜单文字与超链接
          display: inline-block;
          height: 100%;
          width: 100%;
          margin-left: -10px;
          padding-left: 10px;
          padding-right: 10px;
          margin-right: -10px;
          position: relative;
          z-index: 999;
        }
        .el-submenu__icon-arrow {
          //子菜单图片
        }
      }
    }
    .el-menu-item {
      padding: 0;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 0 10px;
        position: relative;
        z-index: 999;
      }
    }
  }
}
.comp-menu {
  a {
    display: inline-block;
    height: 100%;
    padding-left: 40px;
    padding-right: 40px;
    position: relative;
    z-index: 999;
  }
  height: 100%;
  .el-menu {
    height: 100%;
    .el-menu-item {
      height: 100%;
      line-height: 50px;
      border: 0;
      padding: 0;
    }
  }
}
.el-menu--horizontal {
  border: none;
}
</style>

<style lang="scss">
.comp-menu {
  a {
    text-decoration: none;
    color: unset;
  }
  .el-menu {
    .el-submenu {
      height: 100%;
    }
    .el-submenu__title {
      width: auto;
      height: 100%;
      line-height: 50px;
      border: 0;
      padding: 0;
      i {
        margin-left: -20px;
      }
    }
  }
}

.comp-footer {
  height: 100%;
  padding: 40px 0;
  font-weight: bold;
  a {
    display: block;
    text-decoration: none;
    color: unset;
  }
  .footer-title {
    padding: 0 20px;
  }
  .footer-title > a {
    padding-bottom: 10px;
    line-height: 22px;
  }
  .footer-subtitle {
    font-weight: normal;
  }
  .footer-subtitle > a {
    padding-top: 15px;
    line-height: 22px;
  }
}

.el-menu--horizontal {
  border: 0;
}
</style>