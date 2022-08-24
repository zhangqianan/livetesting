<template>
  <div class="noPass">
    <img src="../../assets/img/noPass.png" alt="" class="noPass-img">
    <span class="noPass-span">{{message}}</span>
  </div>
  <div class="silent-button-box">
    <div class="silent-button" @click="getCompetence">
      <button type="button">返回</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'noPass',
    data(){
      return {
        message: '',
        code: null,
        backUrl: ''
      }
    },
    created() {
      this.code = this.$route.query.code;
      console.log(this.$route.query.message);
      this.message = this.$route.query.message;
      this.backUrl = this.$route.query.backUrl;
      console.log(this.message);
      console.log(this.backUrl);
    },
    methods: {
      getCompetence() {
        // window.opener = null;
        // window.open(this.backUrl+'?code='+this.code+'&message='+this.message, '_top')
        this.$router.replace('overdue');
        window.location.href=this.backUrl+'?code='+this.code+'&message='+this.message
      }
    }
  }
</script>

<style>
  .noPass {
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .noPass-img {
    margin-bottom: 70px;
    width: 100px;
  }
  .noPass-span {
    font-size: 17px;
    color: red;
  }
  .silent-button-box {
    width: 100%;
    display: flex;
    justify-content: center;
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
