<template>
  <div>
    logManage page
  </div>
</template>

<script>
export default {
  name: 'widget',
  computed: {
    asideWidth() {
     this.$api.get("api/admin/menu/assigned-menu",{}).then(res => {
    return res;
     })
     .catch(error => {
        return error;
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
