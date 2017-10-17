<template>
  <div class="cm-router-container">
    <p class="cm-selectdrink-title">PICK YOUR FAVORITE COFFEE</p>
    <div class="cm-selectdrink-selection-container">
      <mt-swipe :auto="0">
        <mt-swipe-item>
          <div class="cm-selectdrink-selection-page">1</div>
        </mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
    </div>
    <p class="cm-selectdrink-footer">Couldn't find your drink? Click here to see more.</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
    text-shadow: 3px 3px 7px #777;
  }

  .cm-selectdrink-footer {
    font-size: 0.8rem;
  }

  .cm-selectdrink-selection-container {
    height: 90vw;
    margin: 2rem 0.5rem;

    .cm-selectdrink-selection-page {
      background: white;
      height: 95%;
      border-radius: 1rem;
      box-shadow: 0 0 2rem #777;
    }
  }
</style>
