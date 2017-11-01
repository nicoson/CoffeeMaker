<template>
  <div class="cm-router-container">
    <p class="cm-result-t1">{{statusTitle}}</p>
    <div class="cm-result-t2-container">
      <p class="cm-result-t2" :class="{'cm-result-t2-flipOver': flip}">{{subTitle}}</p>      
    </div>
    <div class="cm-result-cupgroup">
      <img :src="imgUrl">
      <p :class="{'cm-result-cupgroup-name-hot': (imgUrl.indexOf('Hot') > 0), 'cm-result-cupgroup-name-cold': (imgUrl.indexOf('Iced') > 0)}">{{name}}</p>
    </div>
    <p class="cm-result-t3">{{type}}</p>
<!--     <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="top" :modal="false">
      Will leave the page within {{popupRemainTime}} secs
    </mt-popup> -->

    <div v-if="ajaxDone" class="cm-result-button-confirm" @click="goHome">ONE MORE</div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  data () {
    return {
      statusTitle: 'WAITING',
      subTitle: 'We\'re preparing your coffee now....',
      popupVisible: true,
      popupRemainTime: 6,
      flip: false,
      ajaxDone: false,
      data: this.$route.params.data
    }
  },
  computed: {
    name: function () {
      return this.$route.params.name
    },
    type: function () {
      return this.$route.params.type
    },
    imgUrl: function () {
      return (this.data.Hot_Iced === 0) ? '/static/imgs/coffeeicons/HotDrink@2x.png' : '/static/imgs/coffeeicons/IcedDrink@2x.png'
    }
  },
  mounted () {
    // this.countBack()

    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let that = this
    fetch('/api/CoffeeMaker/Booking', {
      body: JSON.stringify(this.data),
      headers: headers,
      method: 'POST'
    })
    .then(res => res.json())
    .then(function (e) {
      // Indicator.close()
      // that.$router.push({ name: 'Result', params: { name: that.name, type: that.type } })
      that.statusTitle = 'SUCCESS'
      that.subTitle = 'Your coffee order has been submitted to our receptionist successfully. It will be provided to you shortly. Thank you!'
      that.flip = true
      that.ajaxDone = true
      setTimeout(e => (that.flip = false), 2000)
    })
    .catch(function (e) {
      that.statusTitle = 'OOPS!'
      that.subTitle = 'Sorry, your submit data was somehow lost, please make your choice again'
      that.flip = true
      that.ajaxDone = true
      setTimeout(e => (that.flip = false), 2000)
      // Indicator.close()
      // that.popupVisible = true
      // that.popupContent = 'Something error happened, please try again!'
      // setTimeout(e => (that.popupVisible = false), 2000)
    })
  },
  methods: {
    countBack () {
      if (this.popupRemainTime > 0) {
        this.popupRemainTime--
        setTimeout(this.countBack, 1000)
      } else {
        this.popupVisible = false
        setTimeout(e => this.$router.push({ name: 'home' }), 1000)
      }
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  p {
    padding: 1rem;
  }

  .cm-result-t1 {
    font-weight: 700;
    font-size: 2.5rem;
    margin-top: 4rem;
  }

  .cm-result-t2-container {
    perspective: 8rem;
  }

  .cm-result-t2 {
    font-weight: 100;
    font-size: 1.7rem;
    color: #e6ffff;
    width: 70%;
    margin: 0 auto;
  }

  .cm-result-t3 {
    font-weight: 100;
    font-size: 1.5rem;
  }

  .cm-result-cupgroup {
    width: 40%;
    margin: 3rem auto 0 auto;
    position: relative;

    >img {
      width: 100%;
    }

    p.cm-result-cupgroup-name-hot {
      position: absolute;
      bottom: 48%;
      left: 18%;
      width: 60%;
      font-size: 2rem;
      text-align: center;
      padding: 0;
    }

    p.cm-result-cupgroup-name-cold {
      position: absolute;
      bottom: 38%;
      left: 22%;
      width: 60%;
      font-size: 2rem;
      text-align: center;
      padding: 0;
    }
  }

  .cm-result-button-confirm {
    width: 19rem;
    padding: 1rem 3rem;
    border-radius: 2rem;
    color: white;
    border: 1px solid white;
    vertical-align: middle;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1.7rem auto;
    box-shadow: 1px 1px 3px #777;
    background: #a25817;
    border-color: #a25817;
    font-size: 1.1rem;
  }

  .cm-result-t2-flipOver {
    animation: flipOver 1s
  }

  @keyframes flipOver {
    from {
      animation-timing-function: linear;
      transform: rotateX(90deg);
/*      border: 1px solid #666;
      box-shadow: 0 0 0 2px white;*/
    }
/*
    25% {
      animation-timing-function: linear;
      transform:translate(1rem, -2rem) rotate(90deg);
    }

    50% {
      animation-timing-function: linear;
      transform:translate(2rem, 0rem) rotate(180deg);
    }

    75% {
      animation-timing-function: linear;
      transform:translate(1rem, 2rem) rotate(270deg);
    }*/

    to {
      animation-timing-function: linear;
      transform: rotateX(0);
    }
  }

  /* mint-ui component css */
  .mint-popup {
    padding: 2rem;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 1rem;
  }
</style>
