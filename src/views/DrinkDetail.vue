<template>
  <div class="cm-router-container" @click="closeOptionPanel">
    <!-- Option Bar -->
    <div id="cm_drinkdetail_optionbar">
      <div class="cm-drinkdetail-option-item" v-for="(flavor, index) in flavors" :key="index" @click="openAdjustPanel(index)">
        <p>{{flavor.name}}</p>
        <img :class="{'tada': iconClick[index]}" :src="flavor.iconUrl" />
        <div class="cm-drinkdetail-option-item-footer">
          {{flavor.choice[recipe[index].chosen] === "STANDARD" ? "STD" : flavor.choice[recipe[index].chosen]}}
        </div>
      </div>
    </div>


    <!-- Slider Bar Panel -->
    <transition name="flip-submenu">
      <div id="cm_drinkdetail_option_slideBar" v-if="adjustPanel.isShow">
        <div id="cm_drinkdetail_option_slideBar_upperContainer" v-if="adjustPanel.subMenu.length != 0">
          <div :class="{'cm_drinkdetail_option_slideBar_subMenuChosen': adjustPanel.subChosen === index}" v-for="(item, index) in adjustPanel.subMenu" :key="index" @click="chooseSubmenu(index)">
            <div></div>
            <p>{{item.name}}</p>
          </div>
        </div>
        <div id="cm_drinkdetail_option_slideBar_lowerContainer">
          <div class="cm-drinkdetail-option-slideBar-slideItemContainer">
            <div class="cm-drinkdetail-option-slideBar-slideItem" v-for="(choice, index) in adjustPanel.choice" :key="index" @touchstart="makeChoice(index)" @touchmove="makeChoice(index)" @touchend="makeChoice(index)">
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


    <!-- Main Image Panel -->
    <div id="cm_drinkdetail_animation" v-if="recipe[4].chosen == 1">
      <div class="cm-drinkdetail-animation-png">        
        <img src="static/imgs/coffeeicons/HotDrink_Making@2x.png" :class="{'cm-drinkdetail-animation-png-hide': (animationUrl.length === 0) ? false : true}">
        <p class="cm-drinkdetail-animation-title">{{type}}</p>
        <div class="cm-drinkdetail-animation-hot">
          <img src="static/imgs/coffeeicons/Smoke@2x.png">
        </div>
      </div>
    </div>
    <div id="cm_drinkdetail_animation" v-else>
      <div class="cm-drinkdetail-animation-png">        
        <img src="static/imgs/coffeeicons/IcedDrink_Making@2x.png" :class="{'cm-drinkdetail-animation-png-hide': (animationUrl.length === 0) ? false : true}">
        <p class="cm-drinkdetail-animation-title">{{type}}</p>
        <div class="cm-drinkdetail-animation-iced">
          <img src="static/imgs/coffeeicons/Ice@2x.png">
          <img src="static/imgs/coffeeicons/Ice@2x.png">
          <img src="static/imgs/coffeeicons/Ice@2x.png">
          <img src="static/imgs/coffeeicons/Ice@2x.png">
        </div>
      </div>
    </div>


    <!-- Footer Button Group -->
    <div id="cm_drinkdetail_footerbar">
      <div id="cm_drinkdetail_actionbar">
        <div class="cm-drinkdetail-button-cancel" @click="goBack">BACK</div>
        <div class="cm-drinkdetail-button-confirm" @click="goConfirm"><p>NEXT</p></div>
      </div>
    </div>

    <!-- Animation gif holder -->
    <img class="cm-drinkdetail-animation-gif" v-if="animationUrl.length > 0" />

    <!-- Animation pop up -->
    <div :class="{'cm-drinkdetail-animation-addEffect': (currentChoice.length === 0) ? false : true, 'cm-drinkdetail-animation-noEffect': (currentChoice.length === 0) ? true : false}">
      <p>{{currentChoice}}</p>
      <p>{{currentNum}}</p>
    </div>
  </div>
</template>

<script>
import Flavors from '@/assets/flavor'
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
        chosen: 0,
        subChosen: 0
      }
    }
  },
  computed: {
    type: function () {
      return sessionStorage.coffeeType
    }
  },
  created () {
    this.resetOption()
    // console.log(this.$route.params.type)
  },
  methods: {
    goBack () {
      this.resetOption()  //  reset custom options
      this.$router.push('/')
    },
    goConfirm () {
      sessionStorage.setItem('recipe', JSON.stringify(this.recipe))
      this.$router.push({ name: 'Confirm', params: { type: this.type, options: this.recipe } })
    },
    openAdjustPanel (index) {
      //  icon click effect
      this.iconClick[index] = true
      let that = this
      setTimeout(e => (that.iconClick = [false, false, false, false, false, false]), 1000)

      if (this.adjustPanel.isShow) {
        this.adjustPanel.isShow = false
        if (this.adjustPanel.itemIndex === index) {
          return
        } else {
          setTimeout(e => (this.adjustPanel.isShow = true), 500)
        }
      } else {
        this.adjustPanel.isShow = true
      }

      this.adjustPanel.itemIndex = index
      this.adjustPanel.subMenu = this.flavors[index].subMenu
      this.adjustPanel.choice = this.flavors[index].choice
      this.adjustPanel.chosen = this.recipe[index].chosen
    },
    makeChoice (index) {
      // this.recipe[this.adjustPanel.itemIndex].chosen = index
      // this.adjustPanel.chosen = index
      // // setTimeout(e => (this.adjustPanel.isShow = false), 800)
      // this.animateTrigger(this.adjustPanel.itemIndex, index)

      let optionEle = document.getElementsByClassName('cm-drinkdetail-option-slideBar-slideItem')
      for (let i = 1; i < optionEle.length; i++) {
        if (optionEle[i].offsetLeft > event.changedTouches[0].screenX) {
          index = i - 1
          break
        }
        index = i
      }
      // console.log(index, optionEle[index].offsetLeft, event.changedTouches[0].screenX)

      this.adjustPanel.chosen = index
      if (event.type !== 'touchend') return

      this.recipe[this.adjustPanel.itemIndex].chosen = index
      this.animateTrigger(this.adjustPanel.itemIndex, index)
    },
    chooseSubmenu (index) {
      this.adjustPanel.subChosen = index
      this.recipe[this.adjustPanel.itemIndex].name = this.adjustPanel.subMenu[index].name
      this.flavors[this.adjustPanel.itemIndex].iconUrl = this.adjustPanel.subMenu[index].iconUrl
    },
    animateTrigger (index, choiceIndex) {
      switch (index) {
        case 0:
          //  sugar/no sugar
          this.currentNum = this.flavors[index].choice[choiceIndex]
          if (this.currentNum === this.flavors[index].choice[0]) {
            this.addAnimation(index, '  ')
            return
          }
          this.animationUrl = this.flavors[index].animationUrl
          break
        case 1:
          //  cream/no cream
          this.currentNum = this.flavors[index].choice[choiceIndex]
          if (this.currentNum === this.flavors[index].choice[0]) {
            this.addAnimation(index, '  ')
            return
          }
          this.animationUrl = this.flavors[index].animationUrl
          break
        case 2:
          //  whole/skim/soya milk
          this.animationUrl = this.flavors[index].subMenu[this.adjustPanel.subChosen].animationUrl
          // this.animationUrl = this.flavors[index].subMenu[index].animationUrl
          this.currentNum = this.flavors[index].choice[choiceIndex]
          break
        case 3:
          //  decaf/caf
          this.currentNum = this.flavors[index].choice[choiceIndex]
          if (this.currentNum === this.flavors[index].choice[0]) {
            this.addAnimation(index, '  ')
            return
          }
          this.animationUrl = this.flavors[index].animationUrl
          break
        case 4:
          //  add ice/hot
          this.currentNum = this.flavors[index].choice[choiceIndex]
          this.addAnimation(index)
          return
        case 5:
          //  shot/no shot
          // this.animationUrl = 'static/imgs/coffeeicons/AddShot.gif'
          this.animationUrl = this.flavors[index].animationUrl
          this.currentNum = this.flavors[index].choice[choiceIndex]
          break
      }
      this.$nextTick(bindPngUrl(this.animationUrl))
      let that = this
      setTimeout(function () {
        that.animationUrl = ''
        that.addAnimation(index)
      }, 2000)
    },
    addAnimation (index, title = '') {
      this.currentChoice = (title.length > 0) ? title : this.recipe[index].name
      setTimeout(e => (this.currentChoice = ''), 2000)
    },
    resetOption () {
      if (sessionStorage.getItem('recipe')) {
        this.recipe = JSON.parse(sessionStorage.getItem('recipe'))
      } else {
        this.recipe = Flavors.map(e => ({
          name: e.name,
          url: e.bottomUrl,
          chosen: e.defaultChoice,
          num: 0,
          showReplace: false,
          showSubmenu: false
        }))
      }
    },
    closeOptionPanel (event) {
      if (event.target.className.indexOf('cm-drinkdetail-option-item') < 0 &&
        event.target.parentElement.className.indexOf('cm-drinkdetail-option-item') < 0 &&
        event.target.id !== 'cm_drinkdetail_option_slideBar' &&
        event.target.parentElement.parentElement.id !== 'cm_drinkdetail_option_slideBar' &&
        event.target.parentElement.parentElement.parentElement.id !== 'cm_drinkdetail_option_slideBar' &&
        event.target.parentElement.parentElement.parentElement.parentElement.id !== 'cm_drinkdetail_option_slideBar') {
        this.adjustPanel.isShow = false
      }
      console.log(1)
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
      /*width: 5rem;*/
      position: relative;

      &:hover {
        cursor: pointer;
      }

      >p {
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }

      img {
        width: 5rem;
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

      .cm_drinkdetail_option_slideBar_subMenuChosen {
        border: 1px solid white;
        border-radius: 2rem;
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
    width: 100%;
    position: fixed;
    bottom: 50%;
    transform: scale(0.1, 0.1);
    animation: addEffect 2s linear;

    p:first-child {
      font-size: 2rem;
    }

    p:last-child {
      font-size: 2rem;
    }
  }

  .cm-drinkdetail-animation-noEffect {
    display: none;
  }
  #cm_drinkdetail_footerbar {
    padding: 2.5rem;

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
      bottom: 50%;
      transform: scale(0.1, 0.1);
      opacity: 1;
    }

    20% {
      bottom: 50%;
      transform: scale(1, 1) scale(1, 1);
      opacity: 1;
    }

    60% {
      bottom: 50%;
      transform: scale(1, 1) rotate(0);
      opacity: .8;
    }

    70% {
      bottom: 40%;
      transform: scale(.6, .6) rotate(360deg);
      opacity: .6;
    }

    80% {
      bottom: 50%;
      transform: scale(.5, .5) rotate(720deg);
      opacity: .4;
    }

    to {
      bottom: 80%;
      transform: scale(0.2, 0.2) rotate(2000deg);
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
</style>
