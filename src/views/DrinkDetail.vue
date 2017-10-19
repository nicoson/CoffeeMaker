<template>
  <div class="cm-router-container">
    <div id="cm_drinkdetail_optionbar">
      <div class="cm-drinkdetail-option-item" v-for="(flavor, index) in flavors" :key="index" @click="addOption(index)">
        <p>{{recipe[index].showReplace ? flavor.replace.name : flavor.name}}</p>
        <img :src="recipe[index].showReplace ? flavor.replace.iconUrl : flavor.iconUrl" />
        <div class="cm-drinkdetail-option-item-subitemgroup" :class="{'cm-drinkdetail-option-item-submenu-hide': !recipe[index].showSubmenu}" v-if="flavor.subMenu.length != 0">
          <ul>
            <li v-for="(item, subIndex) in flavor.subMenu" :key="subIndex" @click="addOption(index,subIndex)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div id="cm_drinkdetail_animation" v-if="recipe[4].num == 0">
      <img src="/static/imgs/coffeeicons/HotDrink_Making@2x.png">
      <p class="cm-drinkdetail-animation-title">{{type}}</p>
      <div class="cm-drinkdetail-animation-hot"></div>
    </div>
    <div id="cm_drinkdetail_animation" v-else>
      <img src="/static/imgs/coffeeicons/IcedDrink_Making@2x.png">
      <p class="cm-drinkdetail-animation-title">{{type}}</p>
      <div class="cm-drinkdetail-animation-iced">
        <img src="/static/imgs/coffeeicons/Ice@2x.png">
        <img src="/static/imgs/coffeeicons/Ice@2x.png">
        <img src="/static/imgs/coffeeicons/Ice@2x.png">
        <img src="/static/imgs/coffeeicons/Ice@2x.png">
      </div>
    </div>

    <div id="cm_drinkdetail_footerbar">
      <div id="cm_drinkdetail_results">
        <div class="cm-drinkdetail-results-item" v-for="(item, index) in recipe" :key="index">
          <div v-if="item.num != 0">
            <img :src="item.url">
            <div>
              <p>{{item.name}}</p>
              <p v-if="item.num > 0">+{{item.num}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="cm-common-itemspace"></div>
      <div id="cm_drinkdetail_actionbar">
        <div class="cm-drinkdetail-button-confirm" @click="goConfirm"><p>OK</p></div>
        <div class="cm-drinkdetail-button-cancel" @click="resetOption">DEFAULT SET</div>
        <div class="cm-drinkdetail-button-cancel" @click="goBack">BACK</div>
      </div>
    </div>
  </div>
</template>

<script>
import Flavors from '@/assets/flavor'
export default {
  name: 'DrinkDetail',
  data () {
    return {
      flavors: Flavors,
      recipe: []
    }
  },
  computed: {
    type: function () {
      return this.$route.params.type
    }
  },
  created () {
    this.resetOption()
    console.log(this.$route.params.type)
  },
  methods: {
    goBack () {
      this.resetOption()  //  reset custom options
      this.$router.go(-1)
    },
    goConfirm () {
      this.$router.push({ name: 'Confirm', params: { type: this.type, options: this.recipe } })
    },
    addOption (index, subIndex = -1) {
      console.log(index)

      //  handle submenu items
      if (subIndex !== -1) {
        event.stopPropagation()
        this.recipe[index].showSubmenu = !this.recipe[index].showSubmenu
        if (this.recipe[index].name === this.flavors[index].subMenu[subIndex].name) {
          if (this.recipe[index].num < 3) {
            this.recipe[index].num++
          }
        } else {
          this.recipe[index].name = this.flavors[index].subMenu[subIndex].name
          this.recipe[index].num = 1
        }
        return
      }
      //  handle items with submenu
      if (this.flavors[index].subMenu.length !== 0 && subIndex === -1) {
        this.recipe[index].showSubmenu = !this.recipe[index].showSubmenu
        return
      }

      //  handle binary choice - ice/hot caf/decaf
      if (this.flavors[index].replace !== null) {
        this.recipe[index].showReplace = !this.recipe[index].showReplace
        this.recipe[index].name = this.recipe[index].showReplace ? this.flavors[index].name : this.flavors[index].replace.name
        this.recipe[index].url = this.recipe[index].showReplace ? this.flavors[index].bottomUrl : this.flavors[index].replace.bottomUrl
        this.recipe[index].num = this.recipe[index].showReplace ? -1 : 0
      } else {
        //  handle the addable choice
        this.recipe[index].name = this.flavors[index].name
        if (this.recipe[index].num < 3) {
          this.recipe[index].num++
        }
      }
    },
    resetOption () {
      this.recipe = Flavors.map(e => ({
        name: e.name,
        url: e.bottomUrl,
        num: 0,
        showReplace: false,
        showSubmenu: false
      }))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  #cm_drinkdetail_optionbar {
    display: flex;
    justify-content: space-around;
    /*align-items: center;*/
    padding: 1rem 4rem;

    .cm-drinkdetail-option-item {
      width: 4rem;
      position: relative;

      &:hover {
        cursor: pointer;
      }

      >p {
        font-size: 1rem;
        margin-bottom: 1rem;
      }

      img {
        width: 100%;
      }

      .cm-drinkdetail-option-item-subitemgroup {
        position: absolute;
        border: 0.2rem solid #e6ffff;
        width: 6rem;
        top: -1rem;
        left: -2.3rem;
        border-radius: 3rem;
        box-shadow: 3px 3px 2px #999;
        padding: 7.5rem 1rem 1rem 1rem;

        ul {
          list-style: none;
          z-index: 999;

          li {
            padding: 0.6rem;
            margin-top: 1.2rem;
            background: white;
            color: #6c6c6c;
            border-radius: 2rem;
            box-shadow: 3px 3px 2px #999;

            &:nth-of-type(1) {
              background: white;
            }
            &:nth-of-type(2) {
              background: #bbdeff;
            }
            &:nth-of-type(3) {
              background: #f3ce91;
            }
          }
        }

/*        .cm-drinkdetail-option-item-subitemgroup-border {
          position: absolute;
          border: 0.2rem solid #e6ffff;
          width: 7rem;
          height: 20rem;
          top: -9rem;
          left: -0.7rem;
          border-radius: 3rem;
          box-shadow: 3px 3px 2px #999;
          z-index: 0;
        }*/
      }
    }
  }

  .cm-drinkdetail-option-item-submenu-hide {
    display: none;
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

      .cm-drinkdetail-results-item>div {
        margin-left: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        >img {
          height: 2.5rem;
          margin-right: 0.3rem;
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
