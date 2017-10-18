<template>
  <div class="cm-router-container">
    <div id="cm_drinkdetail_optionbar">
      <div class="cm-drinkdetail-option-item" v-for="(flavor, index) in flavors" :key="index">
        <p>{{flavor.name}}</p>
        <img :src="flavor.url" />
      </div>
    </div>

    <div id="cm_drinkdetail_animation">
      <img src="/static/imgs/coffeeicons/HotDrink_Making@2x.png">
      <p class="cm-drinkdetail-animation-title">{{type}}</p>
      <div class="cm-drinkdetail-animation-hot"></div>
      <div class="cm-drinkdetail-animation-iced">
        <img src="/static/imgs/coffeeicons/Ice@2x.png">
        <img src="/static/imgs/coffeeicons/Ice@2x.png">
        <img src="/static/imgs/coffeeicons/Ice@2x.png">
        <img src="/static/imgs/coffeeicons/Ice@2x.png">
      </div>
    </div>

    <div id="cm_drinkdetail_footerbar">
      <div id="cm_drinkdetail_results">
        <div class="cm-drinkdetail-results-item">
          <i class="fa fa-hourglass-o" aria-hidden="true"></i>
          <div>
            <p>Sugar</p>
            <p>+1</p>
          </div>
        </div>
        <div class="cm-drinkdetail-results-item">
          <i class="fa fa-hourglass-o" aria-hidden="true"></i>
          <div>
            <p>Milk</p>
            <p>+1</p>
          </div>
        </div>
        <div class="cm-drinkdetail-results-item">
          <i class="fa fa-hourglass-o" aria-hidden="true"></i>
          <div>
            <p>Iced</p>
            <p>+1</p>
          </div>
        </div>
      </div>
      <div class="cm-common-itemspace"></div>
      <div id="cm_drinkdetail_actionbar">
        <div class="cm-drinkdetail-button-confirm" @click="goDetail"><p>OK</p></div>
        <div class="cm-drinkdetail-button-cancel">DEFAULT SET</div>
        <div class="cm-drinkdetail-button-cancel" @click="goBack">BACK</div>
      </div>
    </div>
  </div>
</template>

<script>
import flavors from '@/assets/flavor'
export default {
  name: 'HelloWorld',
  data () {
    return {
      flavors: flavors
    }
  },
  computed: {
    type: function () {
      return this.$route.params.type
    }
  },
  created () {
    console.log(this.$route.params.type)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goDetail () {
      this.$router.push({ name: 'Confirm', params: { type: 1 } })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  #cm_drinkdetail_optionbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;

    .cm-drinkdetail-option-item {
      width: 6vw;

      &:hover {
        cursor: pointer;
      }

      >p {
        font-size: 0.8rem;
        margin-bottom: 1rem;
      }

      img {
        width: 100%;
      }
    }
  }

  .cm-drinkdetail-animation-common {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  #cm_drinkdetail_animation {
    position: absolute;
    bottom: 8rem;
    left: 30%;
    width: 40%;

    >img {
      width: 100%;
    }

    p.cm-drinkdetail-animation-title {
      font-size: 1.5rem;
    }

    .cm-drinkdetail-animation-hot {
      .cm-drinkdetail-animation-common;
    }

    .cm-drinkdetail-animation-iced {
      .cm-drinkdetail-animation-common;

      img {
        position: absolute;

        &:nth-of-type(1){
          width: 6rem;
          left: -18rem;
          top: 2rem;
          transform: rotate(10deg);
        }

        &:nth-of-type(2){
          width: 3rem;
          left: -11rem;
          top: -1rem;
          transform: rotate(0deg);
        }

        &:nth-of-type(3){
          width: 2.5rem;
          left: 8rem;
          top: -5rem;
          transform: rotate(30deg);
        }

        &:nth-of-type(4){
          width: 6rem;
          left: 13rem;
          top: -15rem;
          transform: rotate(0deg);
        }
      }
    }
  }

  #cm_drinkdetail_footerbar {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    position: absolute;
    bottom: 0;
    width: 100vw;
    padding: 2rem;
    box-sizing: border-box;

    #cm_drinkdetail_results {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .cm-drinkdetail-results-item {
      margin-left: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        i.fa {
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }

        >div {
          font-size: 0.8rem;
          >p:first-child {
            margin-bottom:0.3rem;
          }
        }
      }
    }
  }

  .cm-common-btn {
    width: 4rem;
    height: 2.5rem;
    padding: 0 1rem;
    border-radius: 2rem;
    color: white;
    border: 1px solid white;
    vertical-align: middle;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1.7rem;
    box-shadow: 1px 1px 3px #777;
  }

  .cm-drinkdetail-button-confirm {
    .cm-common-btn;
    background: #a25817;
    border-color: #a25817;
  }

  .cm-drinkdetail-button-cancel {
    .cm-common-btn
  }
</style>
