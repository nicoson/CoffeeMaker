<template>
  <div class="cm-router-container">
    <p class="cm-result-t1">SUCCESS</p>
    <P class="cm-result-t2">
      Your coffee order has been submitted to our receptionist successfully. It will be provided to you shortly.
      </br>
      </br>
      Thank you!
    </P>
    <div class="cm-result-cupgroup">
      <img src="/static/imgs/coffeeicons/IcedDrink@2x.png">
      <p class="cm-result-cupgroup-name">{{name}}</p>
    </div>
    <p class="cm-result-t3">{{type}}</p>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="top" :modal="false">
      Will leave the page within {{popupRemainTime}} secs
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'Result',
  data () {
    return {
      popupVisible: true,
      popupRemainTime: 6
    }
  },
  computed: {
    name: function () {
      return this.$route.params.name
    },
    type: function () {
      return this.$route.params.type
    }
  },
  created () {
    this.countBack()
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

    p.cm-result-cupgroup-name {
      position: absolute;
      top: 55%;
      left: 22%;
      width: 60%;
      font-size: 2rem;
      text-align: center;
      padding: 0;
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
