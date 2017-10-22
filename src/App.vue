<template>
  <div id="app">
    <HeaderBar />
    <transition :name="transitionName"> 
      <router-view  class="child-view" :style="{height: routeViewHeight + 'px'}"></router-view>
    </transition>
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
</style>
