<template>
  <div ref="sticky" class="keep-work-sticky" :style="{width: `${width}px`}" :class="{'fixed': isFixed}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sticky',
  props: {
    width: {
      type: Number,
      default: 1229
    },
    resetTop: {
      type: Number,
      default: 310
    },
    fixedTop: {
      type: Number,
      default: 50
    }
  },
  async mounted() {
    window.addEventListener('scroll', _.debounce(this.handleScroll, 100))
  },
  data() {
    return {
      isFixed: false
    }
  },
  methods: {
    async handleScroll() {
      await this.$nextTick()
      if (!this.$refs.sticky) return
      let clientRect = this.$refs.sticky.getBoundingClientRect()
      let top = clientRect.top
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (this.isFixed && scrollTop < this.resetTop) {
        this.isFixed = false
      }
      if (!this.isFixed && top < this.fixedTop && top !== 0) {
        this.isFixed = true
      }
    }
  },
  computed: {
    stickyWidth() {
      return `width: ${width}px`
    }
  }
}
</script>


<style lang="scss">
.keep-work-sticky {
  &.fixed {
    box-sizing: border-box;
    background: white;
    position: fixed;
    z-index: 200;
    top: 0;
    box-shadow: 1px 1px 5px #dadada;
  }
}
</style>


