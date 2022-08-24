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
    </div>
</template>

<script>
  import {resultResponse} from '@/network/home'
  export default {
    name: 'cameraRealName',
    data() {
      return {
        trackerTask: null,
        mediaStreamTrack: null,
        tokenId: '',
        tishi: '',
        flashing: false
      }
    },
    created() {
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
              _this.tishi = '未检测到人脸';
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
                resultResponse(param).then((res) => {
                  console.log(res);
                  if(res.code === 200){
                    _this.$router.replace('result');
                  }else{
                    _this.$router.replace('noPass');
                  }
                }).catch((res) => {
                  _this.$router.replace('noPass');
                  console.log(res);
                })
              }
            }
          })
        });

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
            console.log(URL.createObjectURL(blob));
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
    margin-top: 40px;
  }
  .testTracking-canvas {
    position: absolute;
    top: -60px;
    border-radius: 50%;
  }
  .testTracking-canva2 {
    display: none;
  }
  .testTracking-video-box {
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
