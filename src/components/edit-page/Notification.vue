<template>
  <div class="notification warning" :class="{ hide: showNotification === false, show: showNotification }">
    <a @click="showNotification = false" class="delete"></a>
    <p>{{ notificationText }}</p>
  </div>
</template>

<script>
import EventBus from '../../event-bus';

export default {
  name: 'notification',
  props: ['notificationText', 'type'],
  data() {
    return {
      showNotification: '',
    };
  },
  mounted() {
    EventBus.$on('showNotification', (notificationType) => {
      if (notificationType === this.type) {
        this.showNotification = true;
      }
    });
  },
};
</script>

<style scoped>

</style>
