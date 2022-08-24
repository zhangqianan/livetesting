<template>
  <div class="box">
      <img src="../../assets/img/success.png">
      认证成功


  </div>
  <div class="silent-button-box">
    <div class="silent-button" @click="getCompetence">
      <button type="button">返回</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'result',
    data() {
      return {
        backUrl: ''
      }
    },
    created() {
      this.backUrl = this.$route.query.backUrl;
      console.log(this.backUrl);
      setTimeout((res) =>{
        window.open(this.backUrl+'?code=200&message=成功','_self')
      }, 20000)
    },
    methods: {
      getCompetence() {
        window.open(this.backUrl+'?code=200&message=成功','_self')
      }
    }
  }
</script>

<style>
  .box{width:200px; text-align:center; font-size: 24px;margin: 0 auto;}
  .box img {width:100%;margin-top: 60px;}
  .silent-button-box {
    width: 100%;
    display: flex;
    justify-content: center;
    /* border: 1px solid pink; */
  }
  .silent-button {
    width: 310px;
    height: 50px;
    background-color: #2263FD;
    border-radius: 40px;
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .silent-button button {
    border: none;
    background-color: transparent;
    color: #fff;
    font-size: 17px;
  }
</style>
