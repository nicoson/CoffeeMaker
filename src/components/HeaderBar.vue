<template>
  <div class="cm-headerbar">
    <div id="cm_headerbar_menuicon" class="cm-headerbar-item" @click="openMenu">
      <i class="fa fa-bars" aria-hidden="true"></i>
    </div>
    <div class="cm-common-itemspace"></div>
    <div id="cm_headerbar_lang" class="cm-headerbar-item">
      <li>English</li>
      <li>中文</li>
      <li>日本語</li>
    </div>
    <div id="cm_headerbar_helper" class="cm-headerbar-item">
      <i class="fa fa-microphone" aria-hidden="true">&nbsp;&nbsp;HELP</i>
    </div>

    <div v-if="showMask" id="cm_headerbar_menupanel_mask" :class="{'cm-headerbar-menupanel-showpanel': showMask}" @click="closeMenu">
      <div id="cm_headerbar_menupanel" :class="{'cm-headerbar-menupanel-bouncein': showMenu, 'cm-headerbar-menupanel-bounceout': !showMenu}">
        <ul>
          <li>NEW ORDER</li>
          <li>ORDER RECORDS</li>
          <li>LANGUAGE</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      showMenu: false,
      showMask: false
    }
  },
  methods: {
    openMenu () {
      this.showMask = true
      this.showMenu = true
    },
    closeMenu () {
      if (event.target.id === 'cm_headerbar_menupanel') {
        event.stopPropagation()
      } else {
        this.showMenu = false
        setTimeout(e => (this.showMask = false), 800)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .cm-headerbar {
    padding: 2vh;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    .cm-headerbar-item {
      flex-grow: 0;
      &:hover{
        cursor: pointer;
      }
    }

    #cm_headerbar_menuicon {
      font-size: 2rem;
    }

    #cm_headerbar_lang {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      list-style: none;
      font-size: 1rem;

      li {
        padding: 0 0.5rem;

        &:nth-of-type(2) {
          border-left: 1px solid white;
          border-right: 1px solid white;
        }
      }
    }

    #cm_headerbar_helper {
      font-size: 1rem;
      padding: 0.5rem 1.5rem;
      border: 1px solid white;
      margin-left: 2rem;
      border-radius: 2rem;
    }

    #cm_headerbar_menupanel_mask.cm-headerbar-menupanel-showpanel {
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0,0,0,.4);
      width: 100%;
      height: 100%;
      z-index: 999;

      #cm_headerbar_menupanel {
        position: fixed;
        top: 0;
        left: 0;
        background: #4a4a4a;
        width: 60%;
        height: 100%;
        z-index: 999;

        ul {
          list-style: none;
          text-align: left;
          padding: 4rem;
          font-size: 1.5rem;

          li {
            margin: 5rem 0;
          }
        }

        &.cm-headerbar-menupanel-bouncein {
          animation: bounceInLeft 1s;
        }

        &.cm-headerbar-menupanel-bounceout {
          animation: bounceOutLeft 1s;
        }
      }
    }
  }

  @keyframes bounceInLeft {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }

    0% {
      opacity: 0;
      transform: translate3d(-3000px, 0, 0);
    }

    60% {
      opacity: 1;
      transform: translate3d(25px, 0, 0);
    }

    75% {
      transform: translate3d(-10px, 0, 0);
    }

    90% {
      transform: translate3d(5px, 0, 0);
    }

    to {
      transform: none;
    }
  }

  @keyframes bounceOutLeft {
    20% {
      opacity: 1;
      transform: translate3d(20px, 0, 0);
    }

    to {
      opacity: 0;
      transform: translate3d(-2000px, 0, 0);
    }
  }
</style>
