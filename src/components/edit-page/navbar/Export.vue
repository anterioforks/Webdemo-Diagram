<template>
  <div class="nav-group">
    <div id="preview-container">
      <div v-if="editMode" @click="preview" id="preview-btn" class="classic-btn">
        <img src="../../../../static/img/document.svg">
        <span>Preview</span>
      </div>
      <div v-else @click="edit" id="edit-btn" class="classic-btn">
        <img src="../../../../static/img/edit.svg">
        <span>Edit</span>
      </div>
    </div>
    <div @click="save" id="save-btn" class="save-group classic-btn">
      <img src="../../../../static/img/powerpoint.svg">
      <span>Save</span>
    </div>
    <notification :notificationText="notificationText" :type="'save'"/>
  </div>
</template>

<script>
import EventBus from '../../../event-bus';
import Notification from '../Notification';

export default {
  name: 'export',
  components: {
    Notification,
  },
  data() {
    return {
      notificationText: 'You may want to add some content before saving to a file.',
      editMode: true,
    };
  },
  methods: {
    preview() {
      this.editMode = false;
      EventBus.$emit('preview');
    },
    edit() {
      this.editMode = true;
      EventBus.$emit('edit');
    },
    save() {
      EventBus.$emit('save');
    },
  },
};
</script>

<style scoped>

</style>
