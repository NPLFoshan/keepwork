<template>
  <div class="container" v-loading='loading'>
    <el-row class="website-setting-style" type="flex">
      <el-col class="website-setting-font" :span="12">
        <header>
          <h1>1.{{$t('setting.Font')}}</h1>
        </header>
        <main>
          <el-row class="website-setting-font-family" type="flex" justify="center">
            <el-col :span="22">
              <span class="website-setting-select-title">{{$t('setting.font')}}</span>
              <el-select class="website-setting-select" v-model="fontFamily" size="small" :placeholder="$t('setting.pleaseSelect')">
                <el-option v-for="item in fontFamilyList" :key="item.value" :label="$t('setting.' + item.label)" :value="item.value">
                </el-option>
              </el-select>
              <div class="tips">{{$t('setting.tips')}}</div>
            </el-col>
          </el-row>
          <el-row class="website-setting-font-size" type="flex" justify="center">
            <el-col :span="22">
              <span class="website-setting-select-title">{{$t('setting.fontSize')}}</span>
              <el-select class="website-setting-select" v-model="fontID" size="small" :placeholder="$t('setting.pleaseSelect')">
                <el-option v-for="item in fontSize" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="24" class="website-setting-preview-fontsize">
              <p v-for="(size, index) in fontSizeList" :style="{fontSize: `${size}px`, fontFamily: fontFamily}" :key="index">你好,Hello.</p>
            </el-col>
          </el-row>
        </main>
      </el-col>
      <el-col :span="12" class="website-setting-color">
        <header>
          <h1>2.{{$t('setting.color')}}</h1>
        </header>
        <main>
          <website-setting-sytle-color-preview :colorsList="colors" :colorID.sync="colorID" @handleSelectColor="handleSelectColor" />
        </main>
      </el-col>
    </el-row>
    <DialogOperations class="website-setting-style-operations" @save="handleSave" @close="handleClose"></DialogOperations>
  </div>
</template>

<script>
import DialogOperations from './DialogOperations'
import themeData from '@/lib/theme/theme.data'
import { mapActions, mapGetters } from 'vuex'
import WebsiteSettingSytleColorPreview from './WebSiteSettingSytleColorPreview'
export default {
  name: 'websiteSettingStyle',
  props: {
    sitePath: String
  },
  components: {
    DialogOperations,
    WebsiteSettingSytleColorPreview
  },
  async mounted() {
    this.loading = true
    await this.userGetSiteThemeConfig({ path: this.sitePath })
    this.loading = false
  },
  methods: {
    ...mapActions({
      userGetSiteThemeConfig: 'user/getSiteThemeConfig',
      userSaveSiteThemeConfig: 'user/saveSiteThemeConfig'
    }),
    async handleSave() {
      this.loading = true
      let config = {
        fontID: this.fontID,
        fontFamily: this.fontFamily,
        colorID: this.colorID,
        name: 'classic'
      }
      await this.userSaveSiteThemeConfig({ sitePath: this.sitePath, config })
        .then(() => {
          this.$message({
            message: this.$t('common.saveSuccess'),
            type: 'success'
          })
        })
        .catch(() => {
          this.$message.error(this.$t('common.saveFail'))
        })
      this.loading = false
      this.$emit('close')
    },
    handleClose() {
      this.$emit('close')
    },
    handleSelectColor(index) {
      if (this.colorID !== index) {
        this.colorID = index
      }
    }
  },
  watch: {
    userSiteThemeConfigClone(config) {
      let { fontID = 0, colorID = 0, fontFamily = 'inherit' } = config || {}
      this.fontID = fontID
      this.fontFamily = fontFamily
      this.colorID = colorID
    }
  },
  computed: {
    ...mapGetters({
      userSiteThemeConfigBySitePath: 'user/siteThemeConfigBySitePath'
    }),
    userSiteThemeConfigClone() {
      return this.userSiteThemeConfigBySitePath(this.sitePath)
    },
    colors() {
      return themeData.classic.colors
    },
    fontSize() {
      return this.fontSizeName.map((label, index) => ({
        value: index,
        label: label
      }))
    },
    fontFamilyList() {
      return themeData.classic.fontFamily
    },
    fontSizeList() {
      const fonts = themeData.classic.fonts[this.fontID]
      return fonts
    }
  },
  data() {
    return {
      loading: false,
      colorID: 0,
      fontID: 0,
      fontFamily: 'inherit',
      fontSizeName: [
        this.$t('setting.small'),
        this.$t('setting.medium'),
        this.$t('setting.large')
      ]
    }
  }
}
</script>

<style lang="scss">
.container {
  height: 100%;
  overflow: hidden;
  display: flex;
}
.website-setting {
  $column-height: 100%;
  &-style {
    border-right: 15px solid #cdd4db;
    flex: 1;
    min-height: $column-height;
  }
  &-font,
  &-color {
    padding: 20px;
  }
  &-color {
    main {
      border-left: 1px solid #bcbcbc;
      height: 100%;
      margin-left: -20px;
      padding: 10px 0;
    }
  }
  &-font-size,
  &-font-family {
    margin-top: 30px;
  }
  &-select {
    width: 75%;
  }
  &-preview-fontsize {
    background: #e5edf5;
    border-radius: 4px;
    padding: 20px;
    margin-top: 20px;
    height: 360px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &-select-title {
    margin-right: 10px;
  }
  &-btns {
    padding: 20px;
    height: $column-height;
    h1 {
      padding-left: 0;
    }
  }
  &-style-operations{
    width: 175px;
  }
}
.website-setting-preview-fontsize {
  width: 80%;
}
.tips {
  color: rgba($color: #8a8a8a, $alpha: 0.5);
  font-size: 12px;
  text-align: center;
}
</style>


