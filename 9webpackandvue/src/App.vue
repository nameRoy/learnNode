<template>
  <div>
    App{{a}}
    <router-link to='/first'>first</router-link>
    <router-link to='/b'>b</router-link>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        a:1
      }
    }
  }
</script>

<style lang="less" scoped>

</style>