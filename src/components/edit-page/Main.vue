<template>
  <div>
    <navbar/>
    <editor ref="editor" :diagramData="diagramData"/>
    <preview/>
  </div>
</template>

<script>
import Editor from './Editor';
import Navbar from './navbar/Navbar';
import Preview from './Preview';
import EventBus from '../../event-bus';

export default {
  name: 'main-diagram',
  props: ['diagramData'],
  components: {
    Editor,
    Navbar,
    Preview,
  },
  destroyed() {
    EventBus.$off();
  },
};
</script>

<style>

</style>
