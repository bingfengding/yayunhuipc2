<template>
  <div id="app">
   <transition name="el-fade-in" mode="out-in">
     
      <router-view></router-view>
      

    </transition>
    <!-- <footer-list></footer-list> -->
  </div>
</template>
<script>
//import footerList from '@/components/footer'
export default {
  name: 'App',
  components: {
    //footerList
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
