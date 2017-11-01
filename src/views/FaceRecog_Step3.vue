<template>
  <div class="cm-router-container">
    <div class="cm-facerecog-step3-titlegroup">
      <p>OPPS!</p>
      <p>NO PROBLEM</p>
      <br />
      <p>LET ME KNOW YOU NOW</p>
    </div>

    <div class="cm-facerecog-step3-formgroup">
      <p>Please enter your name</p>
      <input type="text" name="username" v-model="name" placeholder="FULL NAME" />
      <div class="cm-facerecog-step3-button-submit" @click="submit">SAVE</div>
    </div>

    <mt-popup v-model="popupVisible" popup-transition="popup-fade">
      {{popupContent}}
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'FaceRecog_Step3',
  data () {
    return {
      name: '',
      popupVisible: false,
      popupContent: ''
    }
  },
  computed: {
  },
  mounted () {

  },
  methods: {
    submit () {
      //  check the name
      if (this.name.trim().length === 0 || (this.name.trim().indexOf(' ') < 0 && this.name.trim().indexOf('.') < 0)) {
        this.popupVisible = true
        this.popupContent = 'Please input your FULL NAME!'
        setTimeout(e => (this.popupVisible = false), 2000)
        return
      }

      sessionStorage.setItem('clientName', this.name)
      setTimeout(e => this.$router.push('/confirm'), 200)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .cm-router-container {
    display: flex;
    justify-content: space-between;
    color: #e6ffff;

    .cm-facerecog-step3-titlegroup {
      font-size: 2.7rem;
      text-align: left;
      padding: 4rem 0 0 7rem;
    }

    .cm-facerecog-step3-formgroup {
      height: 30%;
      font-size: 1.8rem;
      text-align: left;
      padding: 4rem 7rem;
      background-color: rgba(0,0,0,.2);

      input {
        font-size: 2rem;
        background: rgba(255,255,255,0);
        border: none;
        border-bottom: 1px solid #e6ffff;
        width: 100%;
        line-height: 2;
        margin: 3rem 0;
        color: #e6ffff;
      }

      .cm-facerecog-step3-button-submit {
        padding: 1rem 3rem;
        border: 1px solid white;
        width: 6rem;
        text-align: center;
        font-size: 1.3rem;
        background-color: white;
        color: #5b9795;
        box-shadow: 0px 0px 2px 3px #999;
      }
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