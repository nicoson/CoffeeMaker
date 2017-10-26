<template>
  <div class="cm-router-container">
    <!-- Option Bar -->
    <div id="cm_drinkdetail_optionbar">
      <div class="cm-drinkdetail-option-item" v-for="(flavor, index) in flavors" :key="index" @click="openAdjustPanel(index)">
        <p>{{recipe[index].showReplace ? flavor.replace.name : flavor.name}}</p>
        <img :class="{'tada': iconClick[index]}" :src="recipe[index].showReplace ? flavor.replace.iconUrl : flavor.iconUrl" />
<!--         <transition name="flip-submenu">
          <div class="cm-drinkdetail-option-item-subitemgroup" v-if="flavor.subMenu.length != 0 && recipe[index].showSubmenu">
            <ul>
              <li v-for="(item, subIndex) in flavor.subMenu" :key="subIndex" @click="addOption(index,subIndex)">{{item.name}}</li>
            </ul>
          </div>
        </transition> -->
        <div class="cm-drinkdetail-option-item-footer">
          {{flavor.choice[recipe[index].chosen] === "STANDARD" ? "STD" : flavor.choice[recipe[index].chosen]}}
        </div>
      </div>
    </div>


    <!-- Slider Bar Panel -->
    <transition name="flip-submenu">
      <div id="cm_drinkdetail_option_slideBar" v-if="adjustPanel.isShow">
        <div id="cm_drinkdetail_option_slideBar_upperContainer" v-if="adjustPanel.subMenu.length != 0">
          <div v-for="(item, index) in adjustPanel.subMenu" :key="index">
            <div></div>
            <p>{{item.name}}</p>
          </div>
        </div>
        <div id="cm_drinkdetail_option_slideBar_lowerContainer">
          <div class="cm-drinkdetail-option-slideBar-slideItemContainer">
            <div class="cm-drinkdetail-option-slideBar-slideItem" v-for="(choice, index) in adjustPanel.choice" :key="index" @click="makeChoice(index)">
              <p :class="{'cm-drinkdetail-option-slideBar-slideItem-chosen': index === adjustPanel.chosen}">{{choice}}</p>
              <div>
                <p :class="{'cm-drinkdetail-option-slideBar-slideItem-chosen': index === adjustPanel.chosen}"></p>
              </div>
            </div>
          </div>
          <div class="cm-drinkdetail-option-slideBar-slideLine"></div>
        </div>
      </div>
    </transition>


    <!-- flex space -->
    <div class="cm-common-itemspace"></div>


    <!-- Animation PIC -->
    <div id="cm_drinkdetail_animation" v-if="recipe[4].num == 0">
      <div class="cm-drinkdetail-animation-png">        
        <img src="/static/imgs/coffeeicons/HotDrink_Making@2x.png" :class="{'cm-drinkdetail-animation-png-hide': (animationUrl.length === 0) ? false : true}">
        <p class="cm-drinkdetail-animation-title">{{type}}</p>
        <div class="cm-drinkdetail-animation-hot">
          <img src="/static/imgs/coffeeicons/Smoke@2x.png">
        </div>
      </div>
    </div>
    <div id="cm_drinkdetail_animation" v-else>
      <div class="cm-drinkdetail-animation-png">        
        <img src="/static/imgs/coffeeicons/IcedDrink_Making@2x.png" :class="{'cm-drinkdetail-animation-png-hide': (animationUrl.length === 0) ? false : true}">
        <p class="cm-drinkdetail-animation-title">{{type}}</p>
        <div class="cm-drinkdetail-animation-iced">
          <img src="/static/imgs/coffeeicons/Ice@2x.png">
          <img src="/static/imgs/coffeeicons/Ice@2x.png">
          <img src="/static/imgs/coffeeicons/Ice@2x.png">
          <img src="/static/imgs/coffeeicons/Ice@2x.png">
        </div>
      </div>
    </div>


    <!-- Footer Button Group -->
    <div id="cm_drinkdetail_footerbar">
<!--       <div id="cm_drinkdetail_results">
        <div class="cm-drinkdetail-results-item" v-for="(item, index) in recipe" :key="index">
          <transition name="rotate-footmenu">
            <div v-if="item.num != 0">
              <div>
                <p>{{item.name}}<span v-if="item.num > 0">&nbsp;+{{item.num}}</span></p>
              </div>
              <img :src="item.url">
            </div>
          </transition>
        </div>
      </div>
      <div class="cm-common-itemspace"></div> -->
      <div id="cm_drinkdetail_actionbar">
        <div class="cm-drinkdetail-button-cancel" @click="goBack">BACK</div>
        <div class="cm-drinkdetail-button-confirm" @click="goConfirm"><p>NEXT</p></div>
<!--         <div class="cm-drinkdetail-button-cancel" @click="resetOption">DEFAULT SET</div> -->
      </div>
    </div>

    <img class="cm-drinkdetail-animation-gif" v-if="animationUrl.length > 0" />
    <div :class="{'cm-drinkdetail-animation-addEffect': (currentChoice.length === 0) ? false : true, 'cm-drinkdetail-animation-noEffect': (currentChoice.length === 0) ? true : false}">
      <p>{{currentChoice}}</p>
      <p>{{currentNum}}</p>
    </div>
  </div>
</template>

<script>
import Flavors from '@/assets/flavor'

// replay the gif by using global function, in case of VUE refresh trap
// function bindGifUrl (url) {
//   setTimeout(e => (document.getElementsByClassName('cm-drinkdetail-animation-gif')[0].src = url), 100)
// }

// play the pngs by using global function, in case of VUE refresh trap
function bindPngUrl (url) {
  for (let i = 0; i < 40; i++) {
    let src = url + (100 + i).toString().slice(1) + '.png'
    setTimeout(e => (document.getElementsByClassName('cm-drinkdetail-animation-gif')[0].src = src), i * 50)
  }
}

export default {
  name: 'DrinkDetail',
  data () {
    return {
      flavors: Flavors,
      recipe: [],
      iconClick: Flavors.map(e => false),
      animationUrl: '',
      currentChoice: '',
      currentNum: '',
      adjustPanel: {
        isShow: false,
        itemIndex: -1,
        subMenu: [],
        choice: [],
        chosen: 0
      }
    }
  },
  computed: {
    type: function () {
      return this.$route.params.type ? this.$route.params.type : localStorage.coffeeType
    }
  },
  created () {
    this.resetOption()
    console.log(this.$route.params.type)
  },
  methods: {
    goBack () {
      this.resetOption()  //  reset custom options
      this.$router.push('/')
    },
    goConfirm () {
      this.$router.push({ name: 'Confirm', params: { type: this.type, options: this.recipe } })
    },
    openAdjustPanel (index) {
      //  icon click effect
      this.iconClick[index] = true
      let that = this
      setTimeout(e => (that.iconClick = [false, false, false, false, false, false]), 1000)

      if (this.adjustPanel.isShow && this.adjustPanel.itemIndex === index) {
        this.adjustPanel.isShow = false
        return
      } else if (!this.adjustPanel.isShow) {
        this.adjustPanel.isShow = true
      }

      this.adjustPanel.itemIndex = index
      this.adjustPanel.subMenu = this.flavors[index].subMenu
      this.adjustPanel.choice = this.flavors[index].choice
      this.adjustPanel.chosen = this.recipe[index].chosen
    },
    makeChoice (index) {
      this.recipe[this.adjustPanel.itemIndex].chosen = index
      this.adjustPanel.chosen = this.recipe[this.adjustPanel.itemIndex].chosen
      // setTimeout(e => (this.adjustPanel.isShow = false), 800)
      this.animateTrigger(this.adjustPanel.itemIndex, index)
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
            //  trigger png animation
            this.animateTrigger(index, subIndex)
          }
        } else {
          this.recipe[index].name = this.flavors[index].subMenu[subIndex].name
          this.flavors[index].iconUrl = this.flavors[index].subMenu[subIndex].iconUrl
          this.recipe[index].num = 1
          //  trigger png animation
          this.animateTrigger(index, subIndex)
        }
        return
      }

      //  handle items with submenu
      if (this.flavors[index].subMenu.length !== 0 && subIndex === -1) {
        this.recipe[index].showSubmenu = !this.recipe[index].showSubmenu
        return
      }

      //  add click effect
      this.iconClick[index] = true
      let that = this
      setTimeout(e => (that.iconClick = [false, false, false, false, false, false]), 1000)

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

      //  trigger png animation
      this.animateTrigger(index, subIndex)
    },
    animateTrigger (index, subIndex) {
      switch (index) {
        case 0:
          //  sugar/no sugar
          this.animationUrl = this.flavors[index].animationUrl
          this.currentNum = '+' + this.recipe[index].num
          break
        case 1:
          //  cream/no cream
          this.animationUrl = this.flavors[index].animationUrl
          this.currentNum = '+' + this.recipe[index].num
          break
        case 2:
          //  whole/skim/soya milk
          this.animationUrl = this.flavors[index].subMenu[subIndex].animationUrl
          this.currentNum = '+' + this.recipe[index].num
          break
        case 3:
          //  decaf/caf
          this.currentNum = ''
          if (this.recipe[index].name !== this.flavors[index].name) {
            this.animationUrl = this.flavors[index].replace.animationUrl
          } else {
            this.addAnimation(index)
            return
          }
          break
        case 4:
          //  add ice/hot
          // this.animationUrl = '/static/imgs/coffeeicons/AddSugar.gif'
          // this.$nextTick(bindUrl(this.animationUrl))
          // break
          this.addAnimation(index)
          return
        case 5:
          //  shot/no shot
          // this.animationUrl = '/static/imgs/coffeeicons/AddShot.gif'
          this.currentNum = ''
          if (this.recipe[index].name === this.flavors[index].name) {
            this.animationUrl = this.flavors[index].animationUrl
          } else {
            this.addAnimation(index)
            return
          }
          break
      }
      this.$nextTick(bindPngUrl(this.animationUrl))
      // this.$nextTick(bindUrl(this.animationUrl))  //  replay the gif by using global function, in case of VUE refresh trap
      // this.$nextTick(bindPngUrl(this.animationUrl))  //  replay the gif by using global function, in case of VUE refresh trap
      let that = this
      setTimeout(function () {
        that.animationUrl = ''
        that.addAnimation(index)
      }, 2000)
    },
    addAnimation (index) {
      this.currentChoice = this.recipe[index].name
      setTimeout(e => (this.currentChoice = ''), 2000)
    },
    resetOption () {
      this.recipe = Flavors.map(e => ({
        name: e.name,
        url: e.bottomUrl,
        chosen: e.defaultChoice,
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
      width: 5rem;
      position: relative;

      &:hover {
        cursor: pointer;
      }

      >p {
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }

      img {
        width: 100%;
      }

      .cm-drinkdetail-option-item-footer {
        border: 1px solid white;
        border-radius: 1rem;
        font-size: .9rem;
        padding: 0.4rem 0.2rem;
        box-shadow: 2px 2px 2px #aaa;
      }

      .cm-drinkdetail-option-item-subitemgroup {
        position: absolute;
        border: 0.2rem solid #e6ffff;
        width: 6rem;
        top: -1rem;
        left: -1.9rem;
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
      }
    }
  }

  .cm-drinkdetail-animation-common {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  #cm_drinkdetail_animation {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    position: relative;

    div.cm-drinkdetail-animation-png {
      width: 40%;
      margin: 0 auto;
      position: relative;

      >img:first-child {
        width: 100%;
      }

      p.cm-drinkdetail-animation-title {
        font-size: 1.5rem;
        height: 4rem;
      }

      .cm-drinkdetail-animation-png-hide {
        visibility: hidden;
      }

      .cm-drinkdetail-animation-hot {
        .cm-drinkdetail-animation-common;

        img {
          position: absolute;
          width: 10rem;
          left: -5rem;
          top: -21rem;
          animation: smoke 5s infinite linear;
          transform: translate(0, 0rem) rotateY(90deg);
        }
      }

      .cm-drinkdetail-animation-iced {
        .cm-drinkdetail-animation-common;

        img {
          position: absolute;
          animation: snow 5s infinite;

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
            animation-delay: -3s;
          }

          &:nth-of-type(3){
            width: 2.5rem;
            left: 8rem;
            top: -5rem;
            transform: rotate(30deg);
            animation-delay: -1s;
          }

          &:nth-of-type(4){
            width: 6rem;
            left: 13rem;
            top: -15rem;
            transform: rotate(0deg);
            animation-delay: -4s;
          }
        }
      }
    }
  }

  #cm_drinkdetail_option_slideBar {
    border-radius: 1.5rem;
    background: rgba(108,108,108,.8);
    /*width: 80%;*/
    margin: 0 auto;

    #cm_drinkdetail_option_slideBar_upperContainer {
      background: rgba(108,108,108,.5);
      padding: 1.5rem 0 1rem 0;
      border-top-left-radius: 1.5rem;
      border-top-right-radius: 1.5rem;
      box-shadow: 0 5px 10px rgb(108,108,108);
      display: flex;
      justify-content: center;

      >div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: .5rem ;
        margin: 0 1rem;

        border: 1px solid white;
        border-radius: 2rem;

        >div {
          width: 0;
          height: 0;
          border: 0.7rem solid white;
          border-radius: 50%;
        }

        &:nth-of-type(2)>div {
          border-color: #bbdeff;
        }

        &:nth-of-type(3)>div {
          border-color: #fcf7bb;
        }

        >p {
          padding-left: .8rem;
        }
      }
    }

    #cm_drinkdetail_option_slideBar_lowerContainer {
      border-radius: 1.5rem;
      padding: 2rem 2rem 2.5rem 2rem;

      .cm-drinkdetail-option-slideBar-slideItemContainer {
        display: flex;
        justify-content: space-between;
        color: rgba(255,255,255,.6);

        div.cm-drinkdetail-option-slideBar-slideItem {
          width: 7rem;

          >p:first-child {
            margin-bottom: 1.2rem;
            font-size: 1rem;
          }

          >div {
            width: 2rem;
            height: 2rem;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;

            >p {
              width: 0;
              height: 0;
              border: 0.5rem solid rgba(255,255,255,.6);
              border-radius: 50%;
              margin: 0 auto;
            }
          }

          .cm-drinkdetail-option-slideBar-slideItem-chosen {
            color: #69d0ba;
            border-color: #69d0ba;
            border-width: .9rem;
            animation: makeChoice .5s cubic-bezier(1, 3.09, 0.53, -0.22);
          }
        }
      }

      .cm-drinkdetail-option-slideBar-slideLine {
        border-top: 0.4rem dashed #979797;
        width: 80%;
        margin: 0 auto;
        margin-top: -1.2rem;
      }
    }
  }

  .cm-drinkdetail-animation-gif {
    position: fixed;
    bottom: 1.5rem;
    width: 105%;
    left: -1.5rem;
  }

  .cm-drinkdetail-animation-addEffect {
    position: fixed;
    left: 50%;
    bottom: 50%;
    padding: 2rem;
    margin-left: -4.5rem;
    transform: scale(0.1, 0.1);
    animation: addEffect 2s linear;

    p:first-child {
      font-size: 2rem;
    }

    p:last-child {
      font-size: 5rem;
    }
  }

  .cm-drinkdetail-animation-noEffect {
    display: none;
  }
  #cm_drinkdetail_footerbar {
    padding: 2.5rem;

/*    #cm_drinkdetail_results {
      display: flex;
      justify-content: space-around;
      align-items: center;
      animation: shinning 2s infinite;

      .cm-drinkdetail-results-item>div {
        margin-left: 1.5rem;

        >img {
          height: 4rem;
        }

        >div {
          font-size: 1rem;
        }
      }
    }*/

    #cm_drinkdetail_actionbar {
      display: flex;
      justify-content: center;
    }
  }

  .cm-common-btn {
    width: 9rem;
    height: 2.5rem;
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    color: white;
    border: 1px solid white;
    vertical-align: middle;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 1rem;
    box-shadow: 1px 1px 3px #777;
    letter-spacing: 0.2rem;
  }

  .cm-drinkdetail-button-confirm {
    .cm-common-btn;
    background: #a25817;
    border-color: #a25817;
  }

  .cm-drinkdetail-button-cancel {
    .cm-common-btn
  }

  .animated {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  .flip-submenu-enter-active{
      -webkit-backface-visibility: visible !important;
      backface-visibility: visible !important;
      animation-name: flipInX;
      .animated;
  }

  .flip-submenu-leave-active{
      -webkit-backface-visibility: visible !important;
      backface-visibility: visible !important;
      animation-name: flipOutX;
      .animated;
  }

/*  .flipInY {
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    animation-name: flipInY;
    .animated;
  }

  .flipOutY {
    -webkit-backface-visibility: visible !important;
    backface-visibility: visible !important;
    animation-name: flipOutY;
    .animated;
  }
*/

  @keyframes flipInX {
    from {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      animation-timing-function: ease-in;
    }

    60% {
      transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
      opacity: 1;
    }

    80% {
      transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    }

    to {
      transform: perspective(400px);
    }
  }

  @keyframes flipOutX {
    from {
      transform: perspective(400px);
    }

    30% {
      transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
      opacity: 1;
    }

    to {
      transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
      opacity: 0;
    }
  }

  .rotateIn {
    animation-name: rotateIn;
    .animated;
  }

  .rotate-footmenu-enter-active {
    animation-name: rotateIn;
    .animated;
  }

  .rotate-footmenu-leave-active {
    animation-name: rotateOut;
    .animated;
  }

  @keyframes flipInY {
    from {
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      animation-timing-function: ease-in;
      opacity: 0;
    }

    40% {
      transform: perspective(400px) rotate3d(0, 1, 0, -20deg);
      animation-timing-function: ease-in;
    }

    60% {
      transform: perspective(400px) rotate3d(0, 1, 0, 10deg);
      opacity: 1;
    }

    80% {
      transform: perspective(400px) rotate3d(0, 1, 0, -5deg);
    }

    to {
      transform: perspective(400px);
    }
  }

  @keyframes flipOutY {
    from {
      transform: perspective(400px);
    }

    30% {
      transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
      opacity: 1;
    }

    to {
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      opacity: 0;
    }
  }

  @keyframes rotateIn {
    from {
      transform-origin: center;
      transform: rotate3d(0, 0, 1, -200deg);
      opacity: 0;
    }

    to {
      transform-origin: center;
      transform: none;
      opacity: 1;
    }
  }

  @keyframes rotateOut {
    from {
      transform-origin: center;
      opacity: 1;
    }

    to {
      transform-origin: center;
      transform: rotate3d(0, 0, 1, 200deg);
      opacity: 0;
    }
  }

  @keyframes shinning {
    from {
      animation-timing-function: linear;
      opacity: 1;
    }

    25% {
      opacity: 0.75;
    }

    50% {
      opacity: 0.5;
    }

    75% {
      opacity: 0.75;
    }

    to {
      animation-timing-function: linear;
      opacity: 1;
    }
  }

  @smoke-start: 1rem;
  @smoke-step: 1.5rem;
  @keyframes smoke {
    from {
      transform: translate(0, @smoke-start) rotateY(90deg);
    }

    20% {
      transform: translate(0, @smoke-start - @smoke-step) rotateY(90deg + 45deg);
    }

    40% {
      transform: translate(0, @smoke-start - 2*@smoke-step) rotateY(90deg + 2*45deg);
    }

    60% {
      transform: translate(0, @smoke-start - 3*@smoke-step) rotateY(90deg + 3*45deg);
    }

    80% {
      transform: translate(0, @smoke-start - 4*@smoke-step) rotateY(90deg + 4*45deg);
    }

    to {
      transform: translate(0, @smoke-start - 4*@smoke-step) rotateY(90deg + 4*45deg);
    }
  }

  @keyframes snow {
    from {
      animation-timing-function: linear;
      transform:translate(0, 0rem) rotate(0);
    }

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
    }

    to {
      animation-timing-function: linear;
      transform:translate(0, 0rem) rotate(360deg);
    }
  }

  .tada {
    .animated;
    animation-name: tada;
  }

  @keyframes tada {
    from {
      transform: scale3d(1, 1, 1);
    }

    10%, 20% {
      transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -10deg);
    }

    30%, 50%, 70%, 90% {
      transform: scale3d(1.5, 1.5, 1.5) rotate3d(0, 0, 1, 10deg);
    }

    40%, 60%, 80% {
      transform: scale3d(1.5, 1.5, 1.5) rotate3d(0, 0, 1, -10deg);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes addEffect {
    from {
      position: fixed;
      left: 50%;
      bottom: 50%;
      padding: 2rem;
      margin-left: -4.5rem;
      transform: scale(0.1, 0.1);
      opacity: 1;
    }

    20% {
      left: 50%;
      bottom: 50%;
      transform: scale(1, 1) scale(1, 1);
      opacity: 1;
    }

    60% {
      left: 50%;
      bottom: 50%;
      transform: scale(1, 1) rotate(0);
      opacity: .8;
    }

    70% {
      left: 40%;
      bottom: 60%;
      transform: scale(1, 1) rotate(360deg);
      opacity: .6;
    }

    80% {
      left: 30%;
      bottom: 50%;
      transform: scale(1, 1) rotate(720deg);
      opacity: .4;
    }

    to {
      left: 10%;
      bottom: 0;
      transform: scale(0.1, 0.1) rotate(2000deg);
      opacity: .2;
    }
  }

  @keyframes makeChoice {
    from {
      border-width: .5rem;
    }

    to {
      border-width: .8rem;
    }
  }

/*  @keyframes bounceIn {
    from, 20%, 40%, 60%, 80%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
      border-width: .5rem;
    }

    20% {
      border-width: 1rem;
    }

    40% {
      border-width: .7rem;
    }

    60% {
      border-width: .9rem;
    }

    80% {
      border-width: .75rem;
    }

    to {
      border-width: .8rem;
    }
  }*/
</style>
