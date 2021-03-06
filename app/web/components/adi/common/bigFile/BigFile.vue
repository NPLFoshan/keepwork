<template>
  <div class="comp-bigfile">
    <div v-if="isOldData">
      <a v-if="type=='link'" :href="url">{{this.properties.extraMsg || url}}</a>
      <img v-if="type=='image'" :src="url" :alt="this.properties.extraMsg">
      <div v-if="type=='video'">
        <video :src="url" controls>
          {{$t('editor.videoNotSupport')}}
        </video>
      </div>
      <div v-if="errMsg" class="err">{{errMsg}}</div>
    </div>
    <div v-if="!isOldData">
      <div v-if="getType === otherExt" class="bigfile-box" v-loading="loading">
        <div class="file-type-icon">
          <div class="iconfont" :class="getIconClass"></div>
        </div>
        <div>
          <div class="filename">{{this.properties.filename}}</div>
          <div class="filesize">{{getSize()}}</div>
        </div>
        <div class="split"></div>
        <div class="download iconfont icon-download" @click="download"></div>
      </div>
      <div class="bigfile-image" v-if="getType === handleExt['png'] || getType === handleExt['jpg'] || getType === handleExt['gif']">
        <img :src="actualUrl" />
      </div>
      <div v-if="getType === handleExt['mp4']">
        <video :src="actualUrl" controls>
          {{$t('editor.videoNotSupport')}}
        </video>
      </div>
      <div class="bigfile-pdf" v-if="getType === handleExt['pdf']">
        <iframe :src='getPdfSrc'></iframe>
      </div>
    </div>
  </div>
</template>
<script>
import compBaseMixin from '../comp.base.mixin'
import { keepwork } from '@/api'
import { mapGetters } from 'vuex'
import axios from 'axios'
import filesize from 'filesize'
import _ from 'lodash'

export default {
  name: 'AdiBigFile',
  mixins: [compBaseMixin],
  data() {
    return {
      type: '',
      errMsg: false,
      url: '',
      isOldData: false,
      loading: false,
      actualUrl: '',
      ext: {
        txt: 'icon-txt1',
        mp4: 'icon-mp4-1',
        mp3: 'icon-mp3-1',
        rar: 'icon-rar1',
        gif: 'icon-gif1',
        ppt: 'icon-ppt',
        png: 'icon-PNG',
        html: 'icon-html',
        pdf: 'icon-pdf1',
        xls: 'icon-excel',
        xlsx: 'icon-excel',
        jpg: 'icon-jpg',
        psd: 'icon-PSD',
        svg: 'icon-SVG',
        zip: 'icon-zip',
        ts: 'icon-ts',
        less: 'icon-less',
        jsx: 'icon-jsx',
        js: 'icon-js',
        css: 'icon-css',
        md: 'icon-markdown',
        json: 'icon-json',
        doc: 'icon-word',
        docx: 'icon-word',
        sql: 'icon-sql'
      },
      handleExt: {
        mp4: 'mp4',
        jpg: 'jpg',
        png: 'png',
        gif: 'gif',
        pdf: 'pdf'
      },
      otherExt: 'other'
    }
  },
  methods: {
    getSize() {
      return filesize(this.properties.size)
    },
    async download() {
      let downloadUrl = this.actualUrl

      if (!downloadUrl) return

      let filename = this.properties.filename
      await new Promise((resolve, reject) => {
        let a = document.createElement('a')
        a.target = '_blank'
        a.style.display = 'none'
        a.href = `${downloadUrl};attname=${filename}`
        a.download = filename || ''
        document.body.appendChild(a)
        a.click()

        setTimeout(() => {
          a.remove()
          resolve()
        }, 300)
      }).catch(e => console.error(e))
    },
    getFileType(fileType) {
      if (/image\/\w+/.test(fileType)) {
        return 'image'
      } else if (/video\/\w+/.test(fileType)) {
        return 'video'
      } else {
        return
      }
    },
    async initOldData() {
      if (this.properties.channel === 'qiniu') {
        if (!this.properties.fileId) {
          return
        }

        this.url = await keepwork.bigfile.getDownloadUrlById({
          _id: this.properties.fileId
        })

        if (!this.url) {
          this.errMsg = this.$t('editor.notFound')
          return
        }

        this.type = this.getFileType(this.properties.fileType)
      } else if (this.properties.fileUrl) {
        this.url = this.fileUrl
        this.type = this.getFileType(this.properties.fileType)
      }
    }
  },
  computed: {
    ...mapGetters({
      token: 'user/token'
    }),
    getPdfSrc() {
      let url = encodeURIComponent(this.properties.src || '')
      let src = process.env.PDF || ''

      src = src + '/web/viewer.html?file=' + url

      return src
    },
    getIconClass() {
      if (this.properties.ext) {
        if (this.ext[this.properties.ext]) {
          return this.ext[this.properties.ext]
        } else {
          return 'icon-ukown_file'
        }
      } else {
        return 'icon-ukown_file'
      }
    },
    getType() {
      let ext = this.properties.ext || ''

      if (ext) {
        let beHandle = false

        _.forEach(this.handleExt, item => {
          if (item === ext) {
            beHandle = true
          }
        })

        if (beHandle) {
          return ext
        } else {
          return this.otherExt
        }
      } else {
        return this.otherExt
      }
    }
  },
  async created() {
    if (this.properties.fileId) {
      this.isOldData = true
      this.initOldData()
    } else {
      let src = this.properties.src

      if (!src) return

      let result

      await axios
        .get(src.replace('/raw#', '/rawurl#'))
        .then(response => {
          result = response
        })
        .catch(error => {
          this.actualUrl = src
        })

      if (result && result.data && result.data.data) {
        this.actualUrl = result.data.data
      } else {
        this.actualUrl = src
      }

      // if(this.getType === this.handleExt['mp4']) {
      //   let video = this.$el.querySelector('video')

      //   if (video) {
      //     video.oncanplaythrough = () => {
      //         video.style.opacity = 1
      //     }
      //   }
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.comp-bigfile {
  video {
    width: 100%;
    // opacity: 0;
  }

  img {
    max-width: 100%;
  }

  .err {
    text-align: center;
  }

  .bigfile-pdf {
    iframe {
      width: 100%;
      height: 1000px;
      border: none;
      @media only screen and (max-width: 767px) {
        height: 600px;
      }
    }
  }

  .bigfile-image {
    img {
      width: 100%;
    }
  }

  .bigfile-box {
    width: 423px;
    height: 75 - 17 * 2px;
    border: 1px solid #d9d9d9;
    background-color: #f3f3f3;
    padding: 17px 0px;
    display: flex;
    align-items: center;
    justify-content: center;

    .filename,
    .filesize {
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .file-type-icon {
      .iconfont {
        margin-right: 16px;
        font-size: 45px;
      }

      .icon-txt1 {
        color: rgb(186, 189, 194);
      }

      .icon-mp4-1 {
        color: rgb(98, 166, 245);
      }

      .icon-mp3-1 {
        color: rgb(245, 108, 73);
      }

      .icon-rar1 {
        color: rgb(159, 209, 59);
      }

      .icon-gif1 {
        color: rgb(210, 110, 219);
      }

      .icon-ppt {
        color: rgb(243, 115, 39);
      }

      .icon-PNG {
        color: rgb(60, 153, 216);
      }

      .icon-html {
        color: rgb(240, 70, 49);
      }

      .icon-pdf1 {
        color: rgb(238, 126, 113);
      }

      .icon-excel {
        color: rgb(102, 188, 92);
      }

      .icon-jpg {
        color: rgb(56, 173, 255);
      }

      .icon-PSD {
        color: rgb(60, 153, 216);
      }

      .icon-SVG {
        color: rgb(249, 189, 15);
      }

      .icon-zip {
        color: rgb(249, 189, 15);
      }

      .icon-ts {
        color: rgb(60, 153, 216);
      }

      .icon-less {
        color: rgb(42, 78, 138);
      }

      .icon-jsx {
        color: rgb(249, 189, 15);
      }

      .icon-js {
        color: rgb(249, 189, 15);
      }

      .icon-css {
        color: rgb(102, 188, 92);
      }

      .icon-markdown {
        color: rgb(72, 79, 89);
      }

      .icon-json {
        color: rgb(102, 188, 92);
      }

      .icon-word {
        color: rgb(77, 151, 255);
      }

      .icon-sql {
        color: #333;
      }
    }

    .split {
      height: 100%;
      width: 1px;
      background-color: #979797;
      margin: 0px 38px;
    }

    .download {
      font-size: 20px;
      color: #333333;
      cursor: pointer;
    }
  }
}
</style>
