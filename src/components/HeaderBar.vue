<template>
  <div class="cm-headerbar">
    <div id="cm_headerbar_menuicon" class="cm-headerbar-item">
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
  }
</style>
