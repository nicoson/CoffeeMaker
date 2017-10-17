<template>
  <div id="app">
    <HeaderBar />
    <router-view/>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'

export default {
  name: 'app',
  components: {
    HeaderBar
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
  font-size: 2vh;
  font-family: 'sans-serif';
  box-sizing: border-box;
}

body {
  height: 100vh;
  background: linear-gradient(-30deg, rgb(59,178,184), rgb(67,230,150));
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
</style>
