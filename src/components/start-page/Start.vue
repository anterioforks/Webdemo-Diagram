<template>
  <div class="introduction diagram-container">
    <diagram-tile v-for="diagram in diagrams" :key="diagram.name" :imgSource="diagram.img" :value="diagram.value"/>
  </div>
</template>

<script>
import DiagramTile from './DiagramTile';
import diagram1 from '../../../static/js/diagram1';
import diagram2 from '../../../static/js/diagram2';

export default {
  name: 'start',
  components: {
    DiagramTile,
  },
  data() {
    return {
      diagrams: [
        {
          name: 'diagram1',
          value: {
            rawStrokes: diagram1.rawStrokes1,
            strokeGroups: diagram1.strokeGroups1,
          },
          img: 'static/img/diagram1.jpeg',
        },
        {
          name: 'diagram2',
          value: {
            rawStrokes: diagram2.rawStrokes2,
            strokeGroups: diagram2.strokeGroups2,
          },
          img: 'static/img/diagram2.jpeg',
        },
        {
          name: 'diagram3',
          img: 'static/img/add.svg',
        },
      ],
    };
  },
  mounted() {
    if (this.$el.clientWidth < 580) {
      this.$router.push({ name: 'Main' });
    }
  },
};
</script>

<style scoped>

  .diagram-container {
    margin: 0;
    padding-top: 64px;
    height: calc(100vh - 64px);
  }

</style>
