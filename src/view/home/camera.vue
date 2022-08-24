<template>
  <div class="prompt">
    <span>{{tishi}}</span>
  </div>
  <div class="testTracking">
    <div class="testTracking-video-box">
      <div class="video-box">
        <video class="text" :class="{borders: flashing}" id="video" width="300" height="400" preload autoplay loop muted></video>
      </div>

      <canvas id="canvas" width="300" height="300" class="testTracking-canvas"></canvas>
      <canvas id="canva2" width="300" height="300" class="testTracking-canva2"></canvas>
    </div>
      <!-- <div class="buttonDiv">
        <button type="button" @click="submit">上传照片</button>
        <button type="button" name="button" @click="openCamera">点击我拍照</button>
      </div> -->
    </div>
</template>

<script>
  import "../../assets/js/build/tracking.js"
  import "../../assets/js/build/tracking-min.js"
  import "../../assets/js/build/data/face.js"
  import "../../assets/js/build/data/face-min.js"
  import {faceRec} from '@/network/home'
  // import { store } from '../../store/index.js'
  export default {
    name: 'camera',
    data() {
      return {
        trackerTask: null,
        mediaStreamTrack: null,
        // name: '',
        // idcard: '',
        tokenId: '',
        tishi: '',
        flashing: false,
        // store
      }
    },
    created() {
      // this.name = this.$route.query.name;
      // this.idcard = this.$route.query.idcard;
      this.tokenId = this.$route.query.tokenId;
      console.log(this.tokenId);
    },
    mounted() {
      this.openCamera();
    },
    methods: {
      openCamera () {
        console.log('^^^^^^^^');
        const _this = this;
        var information = document.getElementById('information')
        var video = this.mediaStreamTrack = document.getElementById('video');
        console.log(video);
        var canvas = document.getElementById('canvas');
        var canva2 = document.getElementById('canva2');
        console.log(canvas);
        var context = canvas.getContext('2d');
        var context2 = canva2.getContext('2d');
        console.log(context);
        var tracker = new tracking.ObjectTracker('face');
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);

        this.trackerTask = tracking.track('#video', tracker, { camera: true });
        let imgList = [];
        tracker.on('track', function(event) {
          _this.flashing = true;
          context.clearRect(0, 0, canvas.width, canvas.height);
          if(event.data.length === 0){
              // context.font = '13px Helvetica';
              // context.fillText("未识别到人脸!",110,40);
              _this.tishi = '未检测到人脸';
              // setTimeout((res) => {
              //    // _this.$router.replace('noResponse');
              //    _this.$router.replace({name: 'noResponse', query: {tokenId: _this.tokenId}})
              // }, 10000)
              // information.('未识别到人脸')
              // context.strokeStyle = '#a64ceb';
          }
          event.data.forEach(function(rect) {
            _this.tishi = '检测中，请勿乱动';

            context2.drawImage(video, 0,0, 300, 300);
            var snapData = canva2.toDataURL('image/jpeg');

            if(snapData !== null){
              imgList.push(snapData);
              console.log(imgList.length);
              if(imgList.length === 5){
                _this.flashing = false;
                // 停止检测
                // 关闭摄像头
                document.getElementById('video').srcObject.getTracks()[0].stop();
                tracker.removeAllListeners('track');
                console.log("++++++++++");
                _this.tishi = '验证中，请稍等……';
                let file = _this.base64toFile(imgList[4], 'fileImage');
                let param = new FormData();
                param.append("file", file);
                param.append("tokenId", _this.tokenId);
                // console.log('111111'+file);
                // console.log('222222'+_this.tokenId);
                faceRec(param).then((res) => {
                  // console.log(res);
                  // events.emit('res', res);
                  // store.changeMessage(res.message);
                  // console.log(store.message+'00000');
                  _this.updateData(res);

                  if(res.code === 200){
                     // this.$router.replace({name: 'camera', query: {tokenId: this.tokenId}})

                    _this.$router.replace({name: 'result', query: {backUrl: res.backUrl}});
                  }else{
                    console.log(res.message);
                    _this.$router.replace({name: 'noPass', query: {backUrl: res.backUrl, code: res.code,message: res.message}});
                    // _this.$router.replace('noPass');
                  }
                  // window.open('result', '_self').close();
                }).catch((res) => {
                  _this.$router.replace('noPass');
                  console.log(res);
                })
              }
            }
          })
          // event.data.forEach(function(rect) {

          //   context.drawImage(video, 0,0, 300, 300);
          //   var snapData = canvas.toDataURL('image/jpg')
          //   console.log(snapData);
          //   if(snapData !== null){
          //     console.log("++++++++++");
          //     window.open('result', '_self').close();

          //     // 关闭摄像头
          //     let file = _this.base64toFile(snapData, 'fikeImage');
          //     let param = new FormData();
          //     param.append("file", file);
          //     param.append("tokenId", _this.tokenId);
          //     faceRec(param).then((res) => {
          //       console.log(res);
          //     }).catch((res) => {
          //       console.log(res);
          //     })

          //   }
          // });
        });

      },
      updateData(res) {
        console.log('修改前'+this.$store.state.message);
        console.log('修改前'+this.$store.state.code);
        this.$store.dispatch('changeMessage', res.message);
        this.$store.commit('changeCode', res.code);
        console.log('修改后'+this.$store.state.message);
        console.log('修改后'+this.$store.state.code);
      },
      blobToFile(theBlob, fileName) {
          theBlob.lastModifiedDate = new Date();
          theBlob.name = fileName;
          return theBlob;
      },
       base64toFile(data, fileName) {
         console.log(fileName);
            const dataArr = data.split(",");
            console.log(dataArr[0]);
            const byteString = atob(dataArr[1]);
            const options = {
              type: "image/jpeg"
              // endings: "native"
            };
            const u8Arr = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
              u8Arr[i] = byteString.charCodeAt(i);
            }
            return new File([u8Arr], fileName + ".jpg", options);//返回文件流
      },
      uploadImg() {
        faceRec().then((res) => {
          console.log(res);
        }).catch((res) => {
          console.log(res);
        })
      },
      submit() {
          let that = this
          let canvas = document.getElementById('canvas')
          let context = canvas.getContext('2d')
          let video = document.getElementById('video')
          context.drawImage(video, 0,0, 500, 400)
          canvas.toBlob((blob) => {
            // axios.post({faceUrl: URL.createObjectURL(blob)})
            // .then((res) => {
            //  console.log('上传成功')
            // })
            console.log(URL.createObjectURL(blob));
            // faceRec(blob).then((res) => {
            //   console.log(res);
            // }).catch((res) => {
            //   console.log(res);
            // })
          })
      },
    destroyed () {
      // 停止侦测
      this.trackerTask.stop()
      // 关闭摄像头
      this.trackerTask.closeCamera()
    },
    }
  }
</script>

<style>
  .prompt {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #444444;
    /* border: 1px solid palegoldenrod; */
    margin-top: 40px;
  }
  .testTracking-canvas {
    /* border: #A64CEB 1px solid; */
    position: absolute;
    top: -60px;
    border-radius: 50%;
  }
  .testTracking-canva2 {
    display: none;
  }
  .testTracking-video-box {
    /* border: green 1px solid; */
    width: 300px;
    height: 300px;
    border-radius: 50%;
    position: relative;
  }
  .video-box {
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }
  .text {
    /* border: pink 1px solid; */
    border-radius: 50%;
    position: absolute;
  }
  .borders {
    animation: blashing 2s ease-in-out infinite;
  }
  @keyframes blashing{
    from{
      border: 3px solid red;
    }
    to{
      border: 3px solid blue;
    }
  }
  body {
    background-color: #FFFFFF;
  }
  .testTracking {
          height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          margin-top: 20px;
          > * {
              position: absolute;
              left: 0;
              right: 0;
              /* margin: auto; */
          }
          video,
          canvas {
              top: 0;
          }
          .buttonDiv {
              bottom: 10px;
          }
      }
</style>
