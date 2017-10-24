<template>
  <div id="app">
    <HeaderBar />
    <transition :name="transitionName"> 
      <router-view  class="child-view" :style="{height: routeViewHeight + 'px'}"></router-view>
    </transition>
    <div id="app_photoCache">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00000.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00001.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00002.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00003.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00004.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00005.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00006.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00007.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00008.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00009.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00010.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00011.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00012.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00013.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00014.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00015.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00016.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00017.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00018.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00019.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00020.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00021.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00022.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00023.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00024.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00025.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00026.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00027.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00028.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00029.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00030.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00031.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00032.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00033.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00034.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00035.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00036.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00037.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00038.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00039.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00040.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00041.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00042.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00043.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00044.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00045.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00046.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00047.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00048.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00049.png">
      <img src="/static/imgs/coffeeicons/Shot/Shot_00050.png">
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'

export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left',
      routeViewHeight: 0
    }
  },
  components: {
    HeaderBar
  },
  mounted () {
    console.log(window.outerHeight, document.getElementsByTagName('body')[0].clientHeight, document.getElementsByClassName('cm-headerbar')[0].clientHeight)
    this.routeViewHeight = document.getElementsByTagName('body')[0].clientHeight - document.getElementsByClassName('cm-headerbar')[0].clientHeight
  },
  watch: {
    '$route' (to, from) {
      if ((from.path === '/' && to.path === '/drinkdetail') ||
        (from.path === '/drinkdetail' && to.path === '/confirm') ||
        (from.path === '/confirm' && to.path === '/result')) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  color: white;
}

html {
  font-size: 2vw;
  font-family: 'sans-serif';
  box-sizing: border-box;
  height: 100%;
  letter-spacing: 0.1rem;
}

body {
  height: 100%;
  background: linear-gradient(-30deg, rgb(59,178,184), rgb(67,230,150));
  /*overflow: hidden;*/
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.cm-common-itemspace {
  flex-grow: 1;
}

.child-view {
  box-sizing: border-box;
  transition: all .5s cubic-bezier(.55,0,.1,1);
  /*border: 1px solid black;*/
  display: flex;
  flex-direction: column;
  align-content: space-between;
  overflow: hidden;
}

.slide-right-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(30rem, 0);  
  transform: translate(30rem 0);  
}

.slide-left-leave-active {  
  opacity: 0;  
  -webkit-transform: translate(-30rem, 0);  
  transform: translate(-30rem, 0);  
}

/* css for component confirm.vue */
.mint-toast {
  span.mint-toast-text {
    font-size: 2.5rem;
    margin: 1rem 2rem;
  }
}

.mint-indicator {
  .mint-indicator-wrapper {
    /*background: none;*/
  }

  .mint-spinner-fading-circle {
    width: 5rem !important;
    height: 5rem !important;
    border-top-color: rgb(38, 162, 255);
    border-left-color: rgb(38, 162, 255);
    border-bottom-color: rgb(38, 162, 255);
  }

  .mint-indicator-mask {
    opacity: unset;
    background: rgba(0, 0, 0, 0.3);;
  }
}

#app_photoCache {
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
