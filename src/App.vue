<template>
  <div id="app">
    <diagram-header/>
    <router-view/>
  </div>
</template>

<script>
import DiagramHeader from './components/header/Header';

export default {
  name: 'App',
  components: {
    DiagramHeader,
  },
};
</script>

<style>
@import '../node_modules/myscript/dist/myscript.min.css';
@import '../static/button.css';
@import '../static/diagram.css';

  body {
    margin: 0;
  }
</style>
