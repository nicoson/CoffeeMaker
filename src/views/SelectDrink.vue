<template>
  <div class="cm-router-container">
    <p class="cm-selectdrink-title">PICK YOUR FAVORITE COFFEE</p>
    <div class="cm-selectdrink-selection-container">
      <mt-swipe :auto="0">
        <mt-swipe-item v-for="(prods, index) in drinktype" :key="index">
          <div class="cm-selectdrink-selection-page-col">
            <div class="cm-selectdrink-selection-page-col-item" v-for="(prod, subIndex) in prods" :key="subIndex" @click="goDetail(prod.nameEN)">
              <img :src="prod.url">
              <p class="cm-selectdrink-selection-page-col-item-title">{{prod.nameEN}}</p>
            </div>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- <p class="cm-selectdrink-footer">Couldn't find your drink? Click here to see more.</p> -->
  </div>
</template>

<script>
import drinktype from '@/assets/drinktype'
export default {
  name: 'SelectDrink',
  data () {
    return {
      type: drinktype
    }
  },
  computed: {
    drinktype: function () {
      let len = 9
      let res = []
      for (let i = 0; i < Math.ceil(this.type.length / len); i++) {
        res.push(this.type.slice(i * len, (i + 1) * len))
      }
      return res
    }
  },
  methods: {
    goDetail (type) {
      localStorage.setItem('coffeeType', type)
      setTimeout(() => this.$router.push({ name: 'DrinkDetail', params: { type: type } }), 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .cm-router-container {
    padding: 1rem;
    height: 100%;
  }

  .cm-selectdrink-title {
    font-size: 1.7rem;
    text-shadow: 3px 3px 7px #330000;
    width: 100%;
  }

  .cm-selectdrink-footer {
    font-size: 0.8rem;
    margin-top: 0rem;
    width: 100%;
  }

  @containerHeight: 105vw;

  .cm-selectdrink-selection-container {
    height: @containerHeight;
    margin: 3rem 1.5rem 3rem 1.5rem;
    box-shadow: 0 0 2rem #777;
    border-radius: 1rem;
    background: white;

    .mint-swipe {
      height: @containerHeight - 1.5rem - 3rem;
      padding: 1.5rem 1.5rem 3rem 1.5rem;

      .cm-selectdrink-selection-page-col {
        display: flex;
        flex-wrap: wrap;
/*        justify-content: space-between;*/
        color: #666666;
        height: 100%;
        align-content: center;
        align-items: flex-start;

        .cm-selectdrink-selection-page-col-item {
          padding: 1.5rem;
          border: 0.18rem solid white;

          &:hover{
            border-image: linear-gradient(-45deg, #3cb8b5 10%, #3cb8b5 10%, white 10%, white 90%, white 90%, #3cb8b5 90%, #3cb8b5 100%) 2;
          }

          img, p {
            width: 10rem;
          }

          .cm-selectdrink-selection-page-col-item-title {
            color: #666666;
          }
        }
      }
    }
  }
</style>
