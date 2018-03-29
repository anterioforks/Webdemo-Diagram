<template>
  <div @click="createDiagram" class="diagram-example">
    <img :src="imgSource" alt="new-diagram" :class="{'new-diagram': !value}">
  </div>
</template>

<script>
export default {
  name: 'diagram-tile',
  props: ['imgSource', 'value'],
  methods: {
    createDiagram() {
      if (this.value) {
        this.$router.push({ name: 'Main', params: { diagramData: this.value } });
      } else {
        this.$router.push({ name: 'Main' });
      }
    },
  },
};
</script>

<style scoped>

  .new-diagram {
    height: 96px;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

</style>
