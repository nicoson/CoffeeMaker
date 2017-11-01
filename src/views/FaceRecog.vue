<template>
  <div class="cm-router-container">
    <div id="cm_facerecog_container">
      <video id="video" autoplay></video>
      <canvas width="500" height="800"></canvas>
      <div id="cm_facerecog_masker">
        <svg id="svg" viewBox="0 0 500 800">
          <desc>三次贝塞尔曲线</desc><defs></defs>
          <path d="M50 250 
          A200 200 0 0 1 450 250
          Q450,350 350,500
          Q250,630 150,500
          Q50,350 50,250
          L0,250 L0,800 L500,800 L500,0 L0,0 L0,250 L50,250Z" style="fill:rgba(0,0,0,.5);"></path>
        </svg>
      </div>
      <div id="cm_facerecog_toolPanle">
        <p>Please put your face in the cycle</p>
        <div id="cm_facerecog_button" @click="submit"></div>
        <p>Take Photo</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaceRecog',
  data () {
    return {
      name: '',
      video: '',
      canvas: '',
      interval: ''
    }
  },
  computed: {
  },
  mounted () {
    // 旧的浏览器可能无法实现mediadevices可言，所以我们设置一个空的对象第一
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {}
    }

    // 一些浏览器部分实现mediadevices。我们不能只指定一个对象
    // 随着它将覆盖现有的性能getUserMedia。
    // 在这里，我们就要错过添加getUserMedia财产。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = this.promisifiedOldGUM
    }

    // Prefer camera resolution nearest to 1280x720.
    var constraints = {
      audio: true,
      video: {
        width: 500,
        height: 800
      }
    }

    this.video = document.querySelector('video')

    let that = this
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      that.video.src = window.URL.createObjectURL(stream)
      that.video.onloadedmetadata = function (e) {
        that.video.play()
        this.interval = setInterval(e => that.takePIC(), 100)
      }
    }).catch(function (err) {
      console.log(err.name + ': ' + err.message)
    })

    // handle drawing img
    this.canvas = document.querySelector('canvas')
    this.context = this.canvas.getContext('2d')
  },
  methods: {
    promisifiedOldGUM (constraints) {
      // 第一个拿到getUserMedia，如果存在
      var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)

      // 有些浏览器只是不实现它-返回一个不被拒绝的承诺与一个错误保持一致的接口
      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser-getUserMedia是不是在这个浏览器实现'))
      }

      // 否则，调用包在一个旧navigator.getusermedia承诺
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject)
      })
    },
    takePIC () {
      this.context.drawImage(this.video, 0, 0)
    },
    submit () {
      this.takePIC()
      this.video.pause()
      this.interval = ''
      setTimeout(e => this.$router.push({name: 'FaceRecog2', params: { data: this.canvas.toDataURL() }}), 1000)
      // this.$router.push()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='less' scoped>
  #cm_facerecog_masker {
    width: 400px;
    height: 600px;
    margin: 0 auto;
  }

  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: black;
  }

  video {
    position: fixed;
    top: 0;
    left: 0;
    width: 500px;
    height: 800px;
/*    transform: rotate(-90deg);
    transform-origin: top right;*/
  }

  svg {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }

  #cm_facerecog_toolPanle {
    position: fixed;
    width: 100%;
    bottom: 0rem;
    height: 20rem;
    border-top: 1px solid white;

    p {
      font-size: 1.7rem;
    }

    #cm_facerecog_button {
      width: 7rem;
      height: 7rem;
      background: #3cb8b5;
      border-radius: 50% 50%;
      border: 3px solid #aaa;
      margin: 2rem auto;
    }
  }
</style>
