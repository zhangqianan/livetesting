<template>
  <div class="silent">
    <div class="silent-title">
      <span>本操作数据仅用于身份核实，安全可靠</span>
    </div>
    <img src="../../assets/img/touxiang.png" class="silent-img">
    <div class="silent-prompt">
      <span>请确保本人操作</span>
    </div>
    <div class="silent-button" @click="getCompetence">
      <button type="button">开始确认</button>
    </div>
    <!-- <div class="aa">
      <input type="file" name="myFile" id="" value="" @change="transcribe($event)" capture="user" accept="video/*" style="opacity: 0;" />
      <p>进入录制</p>
    </div> -->
  </div>

</template>

<script>
  import {faceRec} from '@/network/home'
  import { judgeToken } from '@/network/home'
  export default {
    name: 'silent',
    data() {
      return {
        // name: '',
        // idcard: '',
        tokenId: ''
      }
    },
    created() {
      // this.name = this.$route.query.name;
      // this.idcard = this.$route.query.idcard;
      this.tokenId = this.$route.query.tokenId;
    },
    methods: {
      getCompetence() {
        judgeToken(this.tokenId).then((res) => {
          console.log(res);
          if(res.code === 200){
            this.$router.replace({name: 'camera', query: {tokenId: this.tokenId}})
          }else{
            this.$router.replace({name: 'noResponse', query: {message: res.message}})
          }
        }).catch((res) => {

        })
        // this.$router.replace({name: 'camera', query: {tokenId: this.tokenId}})
      },
      transcribe(e) {
        let file = e.target.files[0];
        let param = new FormData();
        param.append("file", file);
        param.append("tokenId", this.tokenId);
        console.log(file);
        // let config = {
        //   headers: { "Content-Type":"multipart/form-data"},
        // }
        faceRec(param).then((res) => {
          console.log(res);
          this.$router.replace('result');
        }).catch((res) => {
          console.log(res);
        })
      },
    }
  }
</script>

<style scoped>
  .silent {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
  }
  .silent-title {
    color: #2263FD;
    font-size: 13px;
    margin: 40px 0;
    background-color: rgba(35,101,254,0.1);
    padding: 10px 20px;
    border-radius: 20px;
  }
  .silent-img {
    width: 170px;
    border: #2263FD 4px solid;
    border-radius: 50%;
  }
  .silent-prompt {
    font-size: 14px;
    margin: 30px 0;
    color: #777777;
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
  .aa{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
    position: relative;
  }
  .aa input{
    width: 250.5px;
    height: 48px;
    line-height: 48px;
    border: none;
    background-color: #2263FD;
    border-radius: 24px;
    color: #FFFFFF;
    font-size: 17px;
    position: absolute;
    left: 50%;
    margin-left: -125px;
    margin-top: 17px;
  }
  .aa p {
    width: 250.5px;
    height: 48px;
    line-height: 48px;
    background-color: #2263FD;
    border-radius: 24px;
    color: #FFFFFF;
    font-size: 17px;
    text-align: center;
    /* z-index: 1; */
  }
  .login-btn{
  	width: 250.5px;
  	height: 48px;
  	line-height: 48px;
  	border: none;
  	background-color: #2263FD;
  	border-radius: 24px;
  	color: #FFFFFF;
  	font-size: 17px;
  }
  .login-btn::after{ border: none; }
</style>
