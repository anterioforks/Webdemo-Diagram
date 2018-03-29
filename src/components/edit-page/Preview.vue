<template>
  <div>
    <svg @click="showNotification" v-if="requestedPreview && svgExport" :style="{display: displayStyle}" :width="width" :height="height" :viewBox="viewBox" v-html="svgExport">
    </svg>
    <notification :notificationText="notificationText" :type="'preview'"/>
  </div>
</template>

<script>
import EventBus from '../../event-bus';
import Notification from './Notification';

export default {
  name: 'preview',
  components: {
    Notification,
  },
  data() {
    return {
      notificationText: 'You\'re in preview mode, please use the edit mode to modify your diagram!',
      displayStyle: '',
      width: '',
      height: '',
      viewBox: '',
      svgExport: '',
      requestedPreview: false,
    };
  },
  mounted() {
    EventBus.$on('exported', (data) => {
      if (data.exports && data.exports.svg) {
        const divSvgElement = document.createElement('div');
        divSvgElement.innerHTML = data.exports.svg.trim();
        this.svgExport = divSvgElement.firstChild.innerHTML;
        this.width = data.clientWidth;
        this.height = data.clientHeight;
        this.viewBox = `0 0 ${data.clientWidth / 3.77953} ${data.clientHeight / 3.77953}`;
      }
    });

    EventBus.$on('preview', () => {
      this.displayStyle = 'initial';
      this.requestedPreview = true;
    });

    EventBus.$on('edit', () => {
      this.displayStyle = 'none';
      this.requestedPreview = false;
    });

    EventBus.$on('clearSvg', () => {
      this.svgExport = '';
    });
  },
  methods: {
    showNotification() {
      EventBus.$emit('showNotification', 'preview');
    },
  },
};
</script>

<style scoped>

</style>
