<template>
  <div class="noRespinse">
    <img src="../../assets/img/no.png" alt="" class="img-box">
    <div class="tishi">[提示]登录态已经失效，请退出重试</div>
    <div class="silent-button" @click="revalidation">
      <button  type="button">退出验证</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'noReponse',
    data(){
      return {
        tokenId: ''
      }
    },
    created() {
      this.tokenId = this.$route.query.tokenId;
    },
    methods: {
      revalidation() {
        // this.$router.replace('camera');
        // this.$router.replace({name: 'camera', query: {tokenId: this.tokenId}})
        this.$router.back();
      }
    }
  }
</script>

<style>
  .noRespinse {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .img-box {
    width: 200px;
    margin: 20px 0;
  }
  .tishi {
    font-size: 19px;
    margin-bottom: 30px;
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
