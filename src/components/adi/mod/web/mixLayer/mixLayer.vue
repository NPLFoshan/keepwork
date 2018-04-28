<script>
/*doc
---
title: mixLayer Mod
name: mixLayer Mod
category: Adi Mod
---

## @mixLayer

## 参数说明

```
- styleID : //当前样式id

#media
- src  : //当前图片地址
- link : //当前图片跳转链接

#title
- name : //当前标题内容
- link : //当前标题跳转链接

#subtitle
- name : //当前副标题内容
- link : //当前副标题跳转链接

#paragraph
- data : //当前文档内容

#button
- name :  //按钮名称
- link :  //按钮点击跳转链接
- target :  //链接从新窗口打开或本窗口打开

#mediaTwo
- src  : //当前图片地址
- link : //当前图片跳转链接

#titleTwo
- name : //当前标题内容
- link : //当前标题跳转链接

#subtitleTwo
- name : //当前副标题内容
- link : //当前副标题跳转链接

#paragraphTwo
- data : //当前文档内容

#buttonTwo
- name :  //按钮名称
- link :  //按钮点击跳转链接
- target :  //链接从新窗口打开或本窗口打开
```
*/

import baseMixin from '../../base/base.mixin'
import index from 'vue'

export default {
  mixins: [baseMixin],
  created() {
    let mixLayerArrColor = { color: this.themeData('color_4') }
    let self = this
    function responsiveMode(index) {
      return self.conf.styles[index].data[
        '@media only screen and (max-width: 768px)'
      ]
    }
    for (let i = 0; i < 11; i++) {
      responsiveMode(i).title = mixLayerArrColor
      responsiveMode(i).subtitle = mixLayerArrColor
      responsiveMode(i).paragraph = mixLayerArrColor
    }
    for (let i = 9; i < 11; i++) {
      responsiveMode(i).titleTwo = mixLayerArrColor
      responsiveMode(i).subtitleTwo = mixLayerArrColor
      responsiveMode(i).paragraphTwo = mixLayerArrColor
    }
  },
  methods: {
    compWrapperOptions(name) {
      let options = {}

      options = _.merge(options, this.generateOptionsStyle(name))

      if (this.modData.styleID == '9' || this.modData.styleID == '10') {
        return _.merge(
          {},
          options,
          (this.modData.media.src = require('@/../static/adi/mixLayer/schoolOne.png')),
          (this.modData.mediaTwo.src = require('@/../static/adi/mixLayer/schoolTwo.png'))
        )
      } else {
        return options
      }
    }
  }
}
</script>