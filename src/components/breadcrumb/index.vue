<template>
  <el-breadcrumb class="eden-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in list"
        v-if="item.meta.title"
        :key="item.path">
        <span 
          class="no-redirect"
          v-if="item.redirect === 'noredirect' || index === item.length - 1">
          {{getTitle(item.meta.title)}}
        </span>
        <router-link
          v-else
          :to="item.redirect || item.path">
          {{getTitle(item.meta.title)}}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  data() {
    return {
      list: null
    }
  },
  created() {
    this.getBreadcrumb()
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      if (matched[0] && matched[0].name !== '首页') {
        matched = [{ path: '/首页', meta: { title: '首页' } }].concat(matched)
      }
      this.list = matched
    },
    getTitle(title) {
      return title
    }
  }
}
</script>

<style lang="stylus" scoped>
.breadcrumb-enter-active, .breadcrumb-leave-active
  transition all 0.5s
.breadcrumb-enter, .breadcrumb-leave-active
  opacity 0
  transform translateX(20px)
.breadcrumb-move
  transition all 0.5s
.breadcrumb-leave-active
  position absolute
.eden-breadcrumb
  display inline-block
  min-width 50px
  line-height 60px
  .el-breadcrumb
    display inline-block
    font-size 14px
    line-height 60px
    margin-left 10px
    .no-redirect
      cursor text
</style>
