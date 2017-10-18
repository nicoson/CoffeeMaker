<template>
  <div class="cm-router-container">
    <p class="cm-result-t1">SUCCESS</p>
    <P class="cm-result-t2">We're preparing your coffee now....</P>
    <div class="cm-result-cupgroup">
      <img src="/static/imgs/coffeeicons/IcedDrink@2x.png">
      <p class="cm-result-cupgroup-name">xxxxxxxx xxxxx</p>
    </div>
    <p class="cm-result-t3">Americano</p>
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
  p {
    padding: 1rem;
  }

  .cm-result-t1 {
    font-weight: 700;
    font-size: 2.5rem;
    margin-top: 4rem;
  }

  .cm-result-t2 {
    font-weight: 100;
    font-size: 1.7rem;
    color: #e6ffff;
  }

  .cm-result-t3 {
    font-weight: 100;
    font-size: 1.5rem;
  }

  .cm-result-cupgroup {
    width: 40%;
    margin: 3rem auto 0 auto;
    position: relative;

    >img {
      width: 100%;
    }

    p.cm-result-cupgroup-name {
      position: absolute;
      top: 55%;
      left: 22%;
      width: 60%;
      font-size: 2rem;
      text-align: center;
      padding: 0;
    }
  }

</style>
