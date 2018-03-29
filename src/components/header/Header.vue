<template>
  <header>
    <a id="index-header-link" @click="previous" class="ooo-link-back" style="cursor: pointer"></a>
    <h1 class="ooo-write">Diagram</h1>
    <a class="ooo-link-info" @click="showInfo = true"></a>
    <info v-on:close-info="showInfo = false" v-show="showInfo"/>
  </header>
</template>

<script>
import Info from './Info';

export default {
  name: 'diagram-header',
  components: {
    Info,
  },
  data() {
    return {
      showInfo: false,
    };
  },
  methods: {
    previous() {
      if (this.$route.name === 'Main' && this.$el.clientWidth > 580) {
        this.$router.push('/');
      } else {
        window.location.replace('https://webdemo.myscript.com/');
      }
    },
  },
};
</script>

<style scoped>

  .ooo-link-info {
    cursor: pointer;
  }

  header {
    border-bottom: 1px solid #dddddd;
    background-color: #fff;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }

  .ooo-link-back {
    height: 24px;
    width: 24px;
    margin: 0 16px;
    background: transparent url(../../../static/img/larr.svg) no-repeat center/contain;
  }

  .ooo-link-info {
    height: 24px;
    width: 24px;
    margin: 0 16px;
    background: transparent url(../../../static/img/info.svg) no-repeat center/contain;
  }

  h1 {
    color: #131C26;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    -webkit-flex-grow: 1;
    flex-grow: 1;
  }

</style>
