<template>
  <div class="cm-router-container">
    <p class="cm-facerecog-step2-title">HEY! ARE YOU {{name}}?</p>
    <div>
      <div class="cm-facerecog-step2-img">
        <img :src="imgData">
      </div>
    </div>
    <div class="cm-facerecog-step2-buttongroup">
      <div class="cm-facerecog-step2-button-confirm" :class="{'cm-facerecog-step2-button-selected': selectYes}" @click="submit">YES</div>
      <div class="cm-facerecog-step2-button-cancel" :class="{'cm-facerecog-step2-button-selected': !selectYes}" @click="goInputName">NO</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaceRecog_Step2',
  data () {
    return {
      name: 'bhatia rakesh',
      selectYes: true
    }
  },
  computed: {
    imgData: function () {
      return this.$route.params.data
    }
  },
  mounted () {

  },
  methods: {
    submit () {
      this.selectYes = true
      sessionStorage.setItem('clientName', this.name)
      setTimeout(e => this.$router.push('/confirm'), 200)
    },
    goInputName () {
      this.selectYes = false
      setTimeout(e => this.$router.push('/face/3'), 200)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .cm-facerecog-step2-title {
    font-size: 2rem;
  }

  .cm-router-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .cm-facerecog-step2-img {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    border: 1.5rem solid white;
    margin: 0 auto;
    box-shadow: -3rem 2rem 4rem rgba(0,0,0,.3);
    overflow: hidden;

    img {
      width: 100%;
      margin-top: -2rem;
    }
  }

  .cm-facerecog-step2-buttongroup {
    display: flex;
    justify-content: center;
  }

  .cm-facerecog-step2-button-confirm, .cm-facerecog-step2-button-cancel {
    width: 6rem;
    padding: 1.5rem;
    margin: 0 4rem;
    border: 0.18rem solid rgba(255,255,255,0);
    font-size: 1.5rem;
  }

  .cm-facerecog-step2-button-selected {
    border-image: linear-gradient(-45deg, white 10%, white 10%, 10%, rgba(255,255,255,0) 90%, rgba(255,255,255,0) 90%, white 90%, white 100%) 2;
  }
</style>
