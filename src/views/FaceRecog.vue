<template>
  <div class="cm-router-container">
    <div id="cm_facerecog_container">
      <p>still in build</p>
      <video id="video" width="800" height="1200" autoplay></video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaceRecog',
  data () {
    return {
      name: ''
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
        width: 800,
        height: 1200
      }
    }

    var video = document.querySelector('video')

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      video.src = window.URL.createObjectURL(stream)
      video.onloadedmetadata = function (e) {
        video.play()
      }
    }).catch(function (err) {
      console.log(err.name + ': ' + err.message)
    })

    //  handle drawing img
    // let canvas = document.querySelector('canvas')
    // let context = canvas.getContext('2d')
    // function takePIC() {
    //     context.drawImage(video, 0, 0)
    // }
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
    submit () {
      //  check the name
      if (this.name.trim().length === 0 || this.name.trim().indexOf(' ') < 0) {
        this.popupVisible = true
        this.popupContent = 'Please input your FULL NAME!'
        setTimeout(e => (this.popupVisible = false), 2000)
        return
      }

      //  check option value
      if (this.options === undefined) {
        this.popupVisible = true
        this.popupContent = 'Your data lost, please try again later!'
        setTimeout(function () {
          this.popupVisible = false
          setTimeout(e => this.$router.push('/'), 500)
        }.bind(this), 2000)
        return
      }

      let data = {
        'DrinkName': this.type,
        'Hot_Iced': this.options[4].showReplace ? 1 : 0,
        'Sugar': this.options[0].num,
        'Cream': this.options[1].num,
        'Caf': this.options[3].showReplace ? 1 : 0,
        [this.options[2].name]: this.options[2].num,
        'Shot': this.options[5].showReplace ? 1 : 0,
        'Special': this.requirements,
        'UserName': this.name,
        'Cup': this.cupSize
      }

      this.$router.push({ name: 'Result', params: { name: this.name, type: this.type, data: data } })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='less' scoped>

</style>
