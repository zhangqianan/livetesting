<template>
  <!-- <navbar>
    <template v-slot:left>
      <img src="@/assets/img/back.png" class="left-img">
    </template>
    <template v-slot:center>
      <div class="center-content">人脸识别</div>
    </template>
  </navbar> -->
  <img src="@/assets/img/face.gif" class="gif">
  <div class="tips-content">
    <div class="tips-title">录制时，普通话大声读如下数字</div>
    <div class="tips-numbers">
      <span v-for="item in nums">{{item}}</span>
    </div>
    <div class="tips-bottom">正对屏幕 >> 录制3~5秒</div>
  </div>

  <div class="aa">
    <input type="file" name="myFile" id="" value="" @change="transcribe($event)" capture="user" accept="video/*" style="opacity: 0;" />
    <p>已记住，进入录制</p>
    <!-- <button class="login-btn" @click="transcribe">已记住，进入录制</button> -->
  </div>

</template>

<script>
  import navbar from '@/components/common/navbar/navbar';
  import {updateVedio, livingH5} from '@/network/home'
  export default {
    data() {
      return {
        nums: [],
        video: '',
      }
    },
    props: ['IDCardNo', 'realname'],
    created() {
      for(let i=0;i<4;i++){
      	this.nums.push(Math.floor(Math.random()*(10-0)));
      }
      this.name = this.$route.params.realname;
      this.idcard = this.$route.params.idcardno;
      this.uuid = this.$route.params.uuid;
      console.log(this.name);
      console.log(this.idcard);
    },
    components: {
      navbar
    },
    methods: {
      transcribe(e) {
        let file = e.target.files[0];
        let param = new FormData();
        param.append("file", file);
        param.append("appkey", "b54b6e4e918e8bf8e99cc3bae35a9c91");
        console.log(param.get("file"));
        let config = {
          headers: { "Content-Type":"multipart/form-data"},
        }
        // test().then((res) => {
        //   console.log(res);
        // }).catch((res) => {
        //   console.log(res);
        // })
        updateVedio(param).then((res) => {
          console.log(res);
          console.log(res.code === '10000');
          if(res.code === '10000'){

            let datas = {
              "data": res.data,
              "num": this.nums.join(''),
              "name": this.name,
              "idcard": this.idcard,
              "uuid": this.uuid
            }
            livingH5(datas).then((res) => {
              console.log(res);
            }).catch((res) => {
              console.log(res);
            })
          }
        }).catch((res) => {
          console.log(res);
        })
      	// uni.chooseVideo({
      	// 	sourceType: ['camera'],
      	// 	maxDuration: 5,
      	// 	camera: 'front',
      	// 		success: (res) => {
      	// 			console.log(res);
      	// 			var data = {"appkey":"b54b6e4e918e8bf8e99cc3bae35a9c91"};
      	// 			uni.uploadFile({
      	// 				url: 'https://file.chinadatapay.com/img/upload',
      	// 				filePath: res.tempFilePath,
      	// 				name: 'file',
      	// 				formData: data,
      	// 				success: (res) => {
      	// 					console.log(res);
      	// 					if(res.statusCode === 200){
      	// 						let datas = {
      	// 						  "name": this.realname,
      	// 						  "idcard": this.IDCardNo,
      	// 						  "data": JSON.parse(res.data).data,
      	// 						  "num": this.nums.join('')
      	// 						}
      	// 						this.changeData();
      	// 					}
      	// 				}
      	// 			})
      	// 		},
      	// })
      },
      //调用成功的方法
      success(stream){
        //兼容webkit核心浏览器
        let CompatibleURL = window.URL || window.webkitURL;
        //将视频流设置为video元素的源
        console.log(stream);
        this.video.srcObject = stream;
        this.video.play();
      },
      // 调用失败的方法
      error(error) {
        console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
      },

      //采集图片
      getUserMedia(constraints, success, error) {
        if (navigator.mediaDevices.getUserMedia) {
          //最新的标准API
          navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
          //webkit核心浏览器
          navigator.webkitGetUserMedia(constraints,success, error)
        } else if (navigator.mozGetUserMedia) {
          //firfox浏览器
          navigator.mozGetUserMedia(constraints, success, error);
        } else if (navigator.getUserMedia) {
          //旧版API
          navigator.getUserMedia(constraints, success, error);
        }
      },
    }
  }
</script>

<style scoped="scoped">
  .left-img {
    width: 20px;
    height: 20px;
  }
  .center-content {
    color: #333333;
    font-size: 20px;
  }
  .gif {
    width: 100%;
    background-color: #f4f4f4;
  }
  .tips-content {
    border-radius: 5px 5px 0px 0px;
    background-color: #FFFFFF;
  }
  .tips-title {
    padding-top: 40px;
    display: flex;
    justify-content: center;
    color: #333333;
    font-size: 18px;
    font-weight: 600;
  }
  .tips-numbers {
    padding-top: 30px;
    display: flex;
    justify-content: center;
    color: #2263FD;
    font-size: 26px;
  }
  .tips-numbers span {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #E0E0E0;
  }
  .tips-bottom {
    padding-top: 30px;
    display: flex;
    justify-content: center;
    color: #333333;
  }
  .submit-button{
  	left: 50%;
  	margin-left: -125px;
  	width: 250.5px;
  	height: 48px;
  }
  .aa{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 32px;
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
