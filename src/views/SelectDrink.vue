<template>
  <div class="cm-router-container">
    <p class="cm-selectdrink-title">PICK YOUR FAVORITE COFFEE</p>
    <div class="cm-selectdrink-selection-container">
      <mt-swipe :auto="0">
        <mt-swipe-item v-for="(prods, index) in drinktype" :key="index">
          <div class="cm-selectdrink-selection-page-col">
            <div class="cm-selectdrink-selection-page-col-item" v-for="(prod, subIndex) in prods" :key="subIndex" @click="goDetail">
              <img :src="prod.url">
              <p class="cm-selectdrink-selection-page-col-item-title">{{prod.typename}}</p>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <p class="cm-selectdrink-footer">Couldn't find your drink? Click here to see more.</p>
  </div>
</template>

<script>
import drinktype from '@/assets/drinktype'
export default {
  name: 'SelectDrink',
  data () {
    return {
      drinktype: drinktype
    }
  },
  methods: {
    goDetail () {
      setTimeout(() => this.$router.push('/drinkdetail'), 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .cm-router-container {
    padding: 1rem;
  }

  .cm-selectdrink-title {
    font-size: 1.2rem;
    text-shadow: 3px 3px 7px #330000;
  }

  .cm-selectdrink-footer {
    font-size: 0.8rem;
    margin-top: 2rem;
  }

  .cm-selectdrink-selection-container {
    height: 90vw;
    margin: 1.5rem;
    box-shadow: 0 0 2rem #777;
    border-radius: 1rem;
    background: white;

    .mint-swipe {
      height: 90vw-2*1.5vw;
      padding: 1.5rem;

      .cm-selectdrink-selection-page-col {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        color: #666666;

        .cm-selectdrink-selection-page-col-item {
          width: 20%;
          padding: 1.5rem;
          border: 0.18rem solid white;

          &:hover{
            border-image: linear-gradient(-45deg, #3cb8b5 10%, #3cb8b5 10%, white 10%, white 90%, white 90%, #3cb8b5 90%, #3cb8b5 100%) 2;
          }

          img {
            width: 5rem;
            height: 7rem;
          }

          .cm-selectdrink-selection-page-col-item-title {
            color: #666666;
          }
        }
      }
    }
  }

  .mint-swipe-items-wrap {

  }

</style>
