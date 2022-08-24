<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div id="app">
	  <router-view/>
    <!-- <div>message{{message}}</div> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  computed: {
    message() {
      return this.$store.state.message
    }
  },
  globalData: {
  	uuid: ""
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
  },
  mounted() {
    // if(this._isMobile()){
    //   alert('手机端');
    //   this.$router.replace('');
    // }else {
    //   alert('PC端');
    //   this.$router.replace('silent')
    // }
  }
}
</script>

<style>
  @import "@/assets/css/normalize.css";
#app {

}
</style>
