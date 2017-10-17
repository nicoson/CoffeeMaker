<template>
  <div class="cm-router-container">
    <div id="cm_drinkdetail_optionbar">
      <div class="cm-drinkdetail-option-item" v-for="(flavor, index) in flavors" :key="index">
        <p>{{flavor.name}}</p>
        <img :src="flavor.url" />
      </div>
    </div>
    <div id="cm_drinkdetail_animation"></div>
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
        <div class="cm-drinkdetail-button-confirm"><p>OK</p></div>
        <div class="cm-drinkdetail-button-cancel">DEFAULT SET</div>
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
  created () {
    console.log(this.$route.params.type)
  },
  methods: {
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
