<template>
  <div class="cm-router-container">
    <p class="cm-confirm-title">ANY SPECIAL REQUIREMENT</p>
    <div class="cm-confirm-inputgroup">
      <input type="text" name="" v-model="requirements"/>
      <!-- <img src="/static/imgs/coffeeicons/Voice@2x.png"> -->
    </div>

    <P class="cm-confirm-title">PLEASE INPUT YOUR FULL NAME</P>
    <div class="cm-confirm-inputgroup">
      <input type="text" name="" v-model="name" placeholder="FULL NAME" />
      <!-- <img src="/static/imgs/coffeeicons/Face@2x.png"> -->
    </div>

    <P class="cm-confirm-title">WHAT SIZE WOULD YOU LIKE?</P>
    <div id="cm_confirm_capsize_container">
      <div :class="{'cm-confirm-cupSize-chosen': (cupSize == 0)}" @click="chooseCupSize(0)">
        <img src="/static/imgs/coffeeicons/Cup@2x.png">
        <p>Tall</p>
      </div>
      <div :class="{'cm-confirm-cupSize-chosen': (cupSize == 1)}" @click="chooseCupSize(1)">
        <img src="/static/imgs/coffeeicons/Cup@2x.png">
        <p>Grande</p>
      </div>
      <div :class="{'cm-confirm-cupSize-chosen': (cupSize == 2)}" @click="chooseCupSize(2)">
        <img src="/static/imgs/coffeeicons/Cup@2x.png">
        <p>Venti</p>
      </div>
    </div>

    <div class="cm-confirm-button-confirm" @click="submit">MAKE COFFEE</div>
    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      {{popupContent}}
    </mt-popup>
  </div>
</template>

<script>
// import { Indicator } from 'mint-ui'
export default {
  name: 'Confirm',
  data () {
    return {
      name: '',
      requirements: '',
      cupSize: 0,
      popupVisible: false,
      popupContent: ''
    }
  },
  computed: {
    type: function () {
      return this.$route.params.type
    },
    options: function () {
      return this.$route.params.options
    }
  },
  methods: {
    chooseCupSize (size) {
      this.cupSize = size
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

      //  submit value
      // Indicator.open({
      //   spinnerType: 'fading-circle'
      // })

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
      // console.log(this.type, this.options, this.name, this.requirements, this.cupSize)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .cm-confirm-title {
    font-size: 1.5rem;
    margin: 5rem 0 1rem 0;
    font-weight: 700;
  }

  .cm-confirm-inputgroup {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1rem;
    border-bottom: 1px solid white;
    width: 60%;
    margin: 0 auto;

    >input {
      height: 3rem;
      flex-grow: 1;
      background: rgba(255,255,255,0);
      border: none;
      font-size: 1.5rem;
      letter-spacing: 0.1rem;
      text-align: center;
      color: #e6ffff;
    }

    >img {
      height: 3rem;
    }
  }

  #cm_confirm_capsize_container {
    display: flex;
    justify-content: center;
    align-items: flex-end;

    >div {
      padding: 3rem;
      opacity: 0.7;

      &:first-child>img {
        width: 5rem;
      }

      &:nth-of-type(2)>img {
        width: 5.5rem;
      }

      &:last-child>img {
        width: 6rem;
      }

      >p {
        padding: 1rem;
        font-size: 1.2rem;
        color: #e6ffff;
      }
    }
  }

  .cm-confirm-button-confirm {
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

  .cm-confirm-cupSize-chosen {
    opacity: 1 !important;
    img {
      animation: snow 5s infinite;
    }
  }

  @keyframes snow {
    from {
      animation-timing-function: linear;
      transform:translate(0, 0rem);
    }

    25% {
      animation-timing-function: linear;
      transform:translate(0, -1rem);
    }

    50% {
      animation-timing-function: linear;
      transform:translate(0, 0rem);
    }

    75% {
      animation-timing-function: linear;
      transform:translate(0, 1rem);
    }

    to {
      animation-timing-function: linear;
      transform:translate(0, 0rem);
    }
  }

  input::-webkit-input-placeholder{
    color: white;
    opacity: 0.5;
  }

  /* mint-ui component css */
  .mint-popup {
    padding: 2rem;
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 1rem;
  }
</style>
