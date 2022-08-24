<template>
  <div class="bounced-radius" v-if="bouncedShow">
    <div class="bounced">
      <img src="../../assets/img/chahao.png" class="bounced-chahao" @click="noAgree">
      <div class="bounced-text">
        <span>
          请您仔细阅读<a href="/#/agreement" class="bounced-a" target="_blank">《人脸识别服务协议》</a>，您点击同意即表示您已充分理解并同意上述协议的全部内容，同意数字认证收集您的姓名、证件号码、脸部图像用于身份核验。
        </span>
      </div>
      <div class="bounced-button" @click="agree">
        <button type="button" >同意</button>
      </div>
    </div>
  </div>
  <div class="bounced-radius" v-if="qrCode">
    <div class="qr-code-box">
      <img :src="image" class="qr-code-box-image">
      <div class="qr-code-box-image-mask" @click="determine" v-if="qrcodes">
        <span>二维码已过期</span>
        <span>点击刷新</span>
        <img src="../../assets/img/shuaxin.png" >
      </div>
      <span class="qr-code-box-span">使用手机扫码，完成人脸识别</span>
      <div class="qr-code-box-button" @click="cancel">
        <button type="button" class="qr-code-box-button-content">取消</button>
      </div>
    </div>
  </div>
  <div class="content">
  <div class="title">
    <div class="title-left"></div>
    <div class="title-center">
      <!-- <span class="title-center-tag">数字认证 | </span> -->
      <div class="title-center-imgs-box"><img src="../../assets/img/yunnanca.png" alt="" class="title-center-imgs"></div>
      <span class="title-center-type">身份核验服务</span>
    </div>
    <div class="title-right"></div>
  </div>
  <div class="user-application" v-if="token">
    <div class="user-application-left"></div>
    <div class="user-application-center">
      <div class="user-application-center-left"></div>
      <div class="user-application-center-center">
        <div class="user-application-center-center-one">
          <div class="user-application-center-center-one-box"><label>姓名</label></div>
          <div class="user-application-center-center-one-boxs"><input type="text" disabled="disabled" v-model="name" class="user-application-center-center-one-boxs-input"></div>
        </div>
        <div class="user-application-center-center-one">
          <div class="user-application-center-center-one-box"><label>证件号</label></div>
          <div class="user-application-center-center-one-boxs"><input type="text" disabled="disabled" v-model="idcard" class="user-application-center-center-one-boxs-input"></div>
        </div>
        <div class="user-application-center-center-two">
          <div class="user-application-center-center-one-box"></div>
          <div class="user-application-center-center-one-boxs">
            <div class="user-application-center-center-img-box" @click="bouncedChange">
              <img src="../../assets/img/fuxuankuang1.png" class="user-application-center-center-img" v-if="checked">
              <img src="../../assets/img/fuxuankuang.png" class="user-application-center-center-img" v-else>
            </div>
            <span class="user-application-center-center-one-agreement">已阅读并同意<a href="/#/agreement" class="bounced-a" target="_blank">《人脸识别服务协议》</a></span>
          </div>
        </div>
        <div class="user-application-center-center-two">
          <div class="user-application-center-center-one-box"></div>
          <div class="user-application-center-center-one-boxs" v-if="checked" @click="determine">
            <button type="button" class="user-application-center-center-two-button-checked">确定</button>
          </div>
          <div class="user-application-center-center-one-boxs" v-else>
            <button type="button" class="user-application-center-center-two-button">确定</button>
          </div>
        </div>
      </div>
      <div class="user-application-center-right"></div>
    </div>
    <div class="user-application-right"></div>
  </div>
  <div class="tokenFalse" v-else>
    <img src="../../assets/img/no.png" class="tokenFalse-image">
    <span class="tokenFalse-span">token已失效，请重新认证</span>
    <div class="tokenFalse-button-box">
      <button type="button" class="tokenFalse-button" @click="comeBack">返回</button>
    </div>
  </div>
  <!-- <div @click="add">{{getMessage}}{{code}}</div> -->
  <!-- <div>{{store.message}}</div> -->
</div>
</template>

<script>
  import { getQrCode } from '@/network/home'
  // import { store } from '../../store/index.js'
  export default {
    name: 'Person',
    data() {
      return {
        data: '1',
        name: "",
        idcard: '',
        checked: false,
        bouncedShow: false,
        token: false,
        qrCode: false,
        image: '',
        qrcodes: false,
        tokenId: '',
        // store,
        // message: ''
      }
    },
    created() {
      this.token = this.$route.params.token;
      if(this.token){
        this.name = this.$route.params.name;
        if(this.name.length === 2){
          this.name = '*' + this.name.slice(1);
        }else if(this.name.length > 2){
          let str = '';
          for (var i = 0; i < this.name.length-2; i++) {
            str += '*';
          }
          // console.log(this.name.slice(0,1));
          // console.log(this.name.slice(-1))
          this.name = this.name.slice(0,1) + str + this.name.slice(-1);
        }
        this.idcard = this.$route.params.idcard;
        this.idcard = this.idcard.slice(0,3) + '***********' + this.idcard.slice(-4);
        this.tokenId = this.$route.params.tokenId;
        console.log(this.name);
      }else{

      }
      console.log(this.$store);
      // this.message = store.message;
    },
    watch: {
      // message: {
      //   handler(val) {
      //     let message = this.message
      //     this.$store.commit('changeMessage', {
      //       id: message,
      //       time: Date.now().valueOf(),
      //       random: Math.random()
      //     })
      //   }
      // }
    },
    computed: {
      getMessage() {
        console.log(this.$store.state.message);
        return this.$store.state.message;
      },
      code() {
        return this.$store.state.code;
      }
    },
    methods: {
      add() {
        this.$store.commit('changeMessage', '数据改变了吗？')
      },
      agree() {
        // alert("请您仔细阅读《个人信息保护政策》与《个人生物识别信息保护声明》，您点击同意即表示您已充分理解并同意上述协议的全部内容，同意数字认证收集您的姓名、证件号码、脸部图像用于身份核验。");
        this.checked = true;
        this.bouncedShow = false;
      },
      bouncedChange() {
        this.bouncedShow = true;
      },
      noAgree() {
        this.checked = false;
        this.bouncedShow = false;
      },
      determine() {
        this.qrCode = true;
        let data = {
          tokenId: this.tokenId
        };
        getQrCode(data).then((res) => {
          console.log(res);
          if(res.code === 0){
            this.image = `data:image/jpeg;base64,` + res.data.url;
            this.qrcodes = false;
            console.log(this.image);
            this.overdue();
          }
        })
      },
      overdue() {
        setTimeout((res) => {
          this.image = '';
          this.qrcodes = true;
        }, 60000);
      },
      comeBack() {
        // window.open('../', '_blank');
        window.opener = null;
        window.open("about:blank", "_top").close()
      },
      cancel() {
        this.qrCode = false;
      }
    }
  }
</script>

<style scoped>
  body::before {
    content: '';
    position: fixed;
    z-index: -1;
    background-size: 100% auto;
    background-color: rgb(245,245,249);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .title {
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
  }
  .title-left {
    flex: 1;
  }
  .title-center {
    min-width: 650px;
    max-width: 1300px;
    height: 50px;
    line-height: 50px;
    flex: 4;
  }
  .title-center-tag {
    font-size: 20px;
    font-weight: 600;
  }
  .title-center-type {
    font-size: 17px;
    color: #aaaaaa;
    float: left;
  }
  .title-right {
    flex: 1;
  }
  .title-center-imgs-box {
    width: 90px;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    float: left;
    margin-right: 15px;
    /* border: 1px solid #000; */
  }
  .title-center-imgs {
    width: 90px;
    /* margin-top: 20px; */
    margin-right: 15px;

  }
  .user-application {
    margin-top: 20px;
    width: 100%;
    height: 520px;
    display: flex;
    /* justify-content: ; */
  }
  .user-application-left {
    flex: 1;
  }
  .user-application-center {
    min-width: 650px;
    max-width: 1300px;
    height: 500px;
    background-color: #fff;
    flex: 4;
  }
  .user-application-right {
    flex: 1;
  }
  .user-application-center {
    display: flex;
    width: 100%;
    height: 100%;
    /* border: #2263FD 1px solid; */
  }
  .user-application-center-left {
    flex: 1;
  }
  .user-application-center-center {
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /* border: #2263FD solid 1px; */
    margin: 100px 0;
  }
  .user-application-center-right {
    flex: 1;
  }
  .user-application-center-center-one {
    width: 100%;
    height: 80px;
    line-height: 80px;
    display: flex;
  }
  .user-application-center-center-two {
    width: 100%;
    height: 50px;
    display: flex;
    line-height: 19px;
  }
  .user-application-center-center-one label {
    width: 130px;
    /* margin-right: 10px; */
    font-size: 14px;
  }
  .user-application-center-center-one-box {
    width: 15%;
    padding-right: 5%;
    text-align: right;
  }
  .user-application-center-center-one-boxs {
    width: 80%;
  }
  .user-application-center-center-img {
    width: 14px;
    margin-right: 10px;
    position: relative;
    top: 3px;
  }
  .user-application-center-center-img-box {
    display: inline-block;
  }
  .user-application-center-center-one-boxs-input {
    width: 380px;
    height: 30px;
  }
  .user-application-center-center-one-boxs-input:hover {
    cursor: no-drop;
  }
  .user-application-center-center-one-agreement {
    font-size: 13px;
  }
  .user-application-center-center-two-button-checked {
    width: 240px;
    height: 40px;
    background-color: rgb(64,158,255);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
  }
  .user-application-center-center-two-button {
    width: 240px;
    height: 40px;
    background-color: rgb(235,238,245);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    color: #cccccc;
  }
  .user-application-center-center-two-button:hover {
    cursor: no-drop;
  }
  .bounced-radius {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .bounced {
    width: 600px;
    height: 200px;
    position: fixed;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 10px;
  }
  .bounced-chahao {
    width: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .bounced-text {
    margin: 50px 20px 30px;
    font-size: 16px;
    color: #999;
  }
  .bounced-button {
    width: 80px;
    height: 30px;
    background-color: rgb(64,158,255);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    margin-top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  .bounced-button button {
    border: none;
    background-color: transparent;
    color: #FFFFFF;
    font-size: 15px;
  }
  .bounced-a {
    text-decoration: none;
    color: rgb(64,158,255);
  }
  .qr-code-box {
    width: 300px;
    height: 400px;
    background-color: #FFFFFF;
    border-radius: 5px;
    position: fixed;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .qr-code-box-image {
    width: 250px;
    height: 250px;
  }
  .qr-code-box-image-mask {
    width: 200px;
    height: 200px;
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    top: 63px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* backdrop-filter: blur(3px); */
  }
  .qr-code-box-image-mask img {
    width: 20px;
    height: 20px;
  }
  .qr-code-box-image-mask span {
    color: #fff;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .qr-code-box-span {
    color: #999999;
    font-size: 14px;
  }
  .qr-code-box-button {
    width: 110px;
    height: 32px;
    border: #dcdfe6 1px solid;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .qr-code-box-button-content {
    border: none;
    background-color: transparent;
    color: #606266;
    font-size: 12px;
  }
  .tokenFalse {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
  }
  .tokenFalse-image {
    width: 300px;
    height: 300px;
  }
  .tokenFalse-span {
    font-size: 14px;
    color: #CCCCCC;
  }
  .tokenFalse-button-box {
    width: 200px;
    height: 36px;
    background-color: #409eff;
    margin: 10px 0;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tokenFalse-button {
    border: none;
    background-color: transparent;
    color: #FFFFFF;
    font-size: 14px;
  }
</style>
