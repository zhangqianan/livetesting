<template>
  <div class="certifications" v-if="token">
    <div class="input-content">
      <div class="name-content-one">
        <div class="name-content-one-box">
          <span>姓名</span>
          <div class="input-content-input">
            <input type="text" v-model="name" />
          </div>
        </div>
      </div>
      <div class="name-content-two">
        <div class="name-content-one-box">
          <span>身份证号</span>
          <div class="input-content-input">
            <input type="text" v-model="idcard" />
          </div>
        </div>
      </div>
      <div class="name-content-two" v-if="mobile !== ''">
        <div class="name-content-one-box">
          <span>电话号</span>
          <div class="input-content-input">
            <input type="text" v-model="mobile" />
          </div>
        </div>
      </div>
      <div class="name-content-two" v-if="cardNo !== ''">
        <div class="name-content-one-box">
          <span>银行卡号</span>
          <div class="input-content-input">
            <input type="text" v-model="cardNo" />
          </div>
        </div>
      </div>
    </div>
  	<div class="submit-button">
  		<button class="login-btn" @click="toVerify">开始验证</button>
  	</div>
    <div class="agree-content-box">
      <div class="agree-content" @click="check">
        <!-- <span class="iconfont  icon-fuxuankuang fuxuank" v-if="orCheck" style="color: #3369E7;"></span>
        <span class="iconfont icon-fuxuankuang1 fuxuank" v-else></span> -->
        <img src="@/assets/img/fuxuankuang1.png" v-if="orCheck">
        <img src="@/assets/img/fuxuankuang.png" v-else>
        <span class="text-xieyi">我已阅读并同意<span class="xieyi" @click="look">《认证协议》</span></span>
      </div>
    </div>
  </div>
</template>

<script>
	import navbar from '@/components/common/navbar/navbar'

  export default {
    data() {
      return {
        name: '',
        idcard: '',
        orCheck: false,
        uuid: '',
        token: false,
        checkWay: '',
        mobile: '',
        cardNo: '',
      }
    },
    created() {
      this.token = this.$route.params.token;
      if(this.token){
        this.checkWay = this.$route.params.checkWay;
        if(this.checkWay === 'M3'){
          this.mobile = this.$route.params.mobile;
          this.mobile = this.mobile.slice(0,3) + '****' + this.mobile.slice(-4);
        }else if(this.checkWay === 'BC4'){
          this.mobile = this.$route.params.mobile;
          this.mobile = this.mobile.slice(0,3) + '****' + this.mobile.slice(-4);
          this.cardNo = this.$route.params.cardNo;
          if(this.cardNo.length === 16){
            this.cardNo = '************' + this.cardNo.slice(-6);
          }else if(this.cardNo.length === 17){
            this.cardNo = '************' + this.cardNo.slice(-7);
          }else if(this.cardNo.length === 19){
            this.cardNo = '************' + this.cardNo.slice(-9);
          }
        }
        this.name = this.$route.params.name;
        if(this.name.length === 2){
          this.name = '*' + this.name.slice(1);
        }else if(this.name.length > 2){
          str = '';
          for (var i = 0; i < this.name.length-2; i++) {
            str += '*';
          }
          this.name = this.name.slice(0,1) + str + this.name.split(-1);
        }
        this.idcard = this.$route.params.idcard;
        this.idcard = this.idcard.slice(0,3) + '***********' + this.idcard.slice(-4);
        this.tokenId = this.$route.params.tokenId;
        console.log(this.name);
      }else{

      }
    },
    components: {
      navbar
    },
    methods: {
      toVerify:function(event){
      	// console.log(this.realname);
        if(this.realname==''){
            alert("真实姓名不能为空！");
           return;
        }
        // console.log(this.IDCardNo);
        if(this.IDCardNo==''){
            alert("身份证号码不能为空！");
           return;
        }
        if(this.orCheck == false){
          alert("请勾选认证协议！");
      	  return;
        }
        let realname = this.realname;
        let idcardno = this.IDCardNo;
        let uuid = this.$route.params;
        console.log(uuid);
        this.$router.push({name: 'testingBefore', params: { realname, idcardno, uuid }})
      },
      check:function(){
      	if(this.orCheck){
      		this.orCheck = false;
      	}else{
      		this.orCheck = true;
      	}
      },
      look() {
        alert("本文档包含云南省数字证书认证中西有限公司的专有商业信息和保密信息。接受方同意维护本文档所提供信息的保密性，承诺不对其进行复制，或向评估小组以外、非直接相关的人员公开此信息。对于以下三种信息，接受方不向云南省数字证书认证中西有限公司承担保密责任:1 )  接受方在接收该文档前，已经掌握的信息。2 )  可以通过与接受方无关的其它渠道公开获得的信息。3 )  可以从第三方，以无附加保密要求方式获得的信息。本文档包含云南省数字证书认证中心有限公司的专有商业信息和保密信息。接受方同意维护本文档所提供信息的保密性，承诺不对其进行复制，或向评估小组以外、非直接相关的人员公开此信息。对于以下三种信息，接受方不向云南省数字证书认证中心有限公司承担保密责任:1 )  接受方在接收该文档前，已经掌握的信息。2 )  可以通过与接受方无关的其它渠道公开获得的信息。3 )  可以从第三方，以无附加保密要求方式获得的信息。本文档包含云南省数字证书认证中心有限公司的专有商业信息和保密信息。接受方同意维护本文档所提供信息的保密性，承诺不对其进行复制，或向评估小组以外、非直接相关的人员公开此信息。对于以下三种信息，接受方不向云南省数字证书认证中心有限公司承担保密责任:1 )  接受方在接收该文档前，已经掌握的信息。2 )  可以通过与接受方无关的其它渠道公开获得的信息。3 )  可以从第三方，以无附加保密要求方式获得的信息。");
      },
      // onBlur() {
      //   let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //     if( scrollTop > 0 ) {
      //       document.documentElement.scrollTop = 0
      //       document.body.scrollTop = 0;
      //     }
      // }
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
  .certifications {
  	   /* position: relative; */
  	   width: 100%;
       /* height: 100vh; */
       /* background-color: #F4F4F4; */
  }
  .input-content {
    padding-top: 1px;
  }
  .name-content-one{
  	   width: 100%;
  	   height: 50px;
       /* line-height: 60px; */
  	   background-color: #FFFFFF;
       padding: 0 20px;
  	   /* position: relative; */
       /* box-shadow: 2.5px 2.5px 7.5px rgba(0,0,0,0.08),
                  -2.5px -2.5px 7.5px rgba(0,0,0,0.08); */
  }
  .name-content-one-box {
    height: 50px;
    line-height: 50px;
  }
  .name-content-two{
  	   width: 100%;
  	   height: 50px;
  	   background-color: #FFFFFF;
       margin-top: 2px;
       padding: 0 20px;
  	   /* position: relative; */
       /* box-shadow: 2.5px 2.5px 7.5px rgba(0,0,0,0.08),
                  -2.5px -2.5px 7.5px rgba(0,0,0,0.08) */
  }
  .input-content-input {
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
  }
  .input-content span{
  	  /* position: absolute;
  	   top: 5px;
  	   left: 16px; */
  	   color: #333333;
  	   font-size: 14px;
       float: left;
       width: 100px;
  }
  .input-content input{
      border: none;
  	   /* position: absolute;
  	   top: 45px;
  	   left: 14.5px; */
  	   color: #999999;
  	   font-size: 15px;
       background-color: transparent;
       float: left;
       /* vertical-align: middle; */
  }
  input:focus{
      outline: none;
  }
  .submit-button{
    width: 100%;
    display: flex;
    justify-content: center;
    /* margin-top: 288px; */
    background-color: #F4F4F4;
    position: fixed;
    /* bottom: -30px; */
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
  .agree-content-box {
    padding-top: 96px;
    padding-bottom: 16px;
    background-color: #F4F4F4;
    left: 0px;
    right: 0px;
  }
  .agree-content{
    display: flex;
    justify-content: center;
    /* border: 1px solid #000000; */
    height: 20px;
    line-height: 20px;
    align-items: center;
  }
  .agree-content img {
    width: 11px;
    height: 11px;
    margin-right: 4.8px;
    margin-top: 1.28px;
  }
  .fuxuank{
  	   position: relative;
  	   top: -10px;
  	   margin-right: 10px;
  }
  .text-xieyi{
  	   color: #666666;
  	   font-size: 11px;
  }
  .xieyi{
  	   color: #2263FD;
  }
</style>
