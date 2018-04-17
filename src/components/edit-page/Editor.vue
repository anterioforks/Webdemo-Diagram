<template>
  <div :style="{display: displayStyle}" class="editor" @pointerdown="pointerDown" @loaded="loaded" @changed="changed($event)" @exported="exported($event)" touch-action="none" ref="editor"></div>
</template>

<script>
/* eslint-disable import/no-named-as-default-member,no-underscore-dangle,no-undef,no-console */

import * as FileSaver from 'file-saver';
import MyScript from 'myscript/dist/myscript.esm';
import EventBus from '../../event-bus';
import { attach, detach } from '../../utils/custom_grabber';

export default {
  name: 'editor',
  props: ['diagramData'],
  data() {
    return {
      editor: {},
      pointerType: 'PEN',
      displayStyle: '',
      clientWidth: '',
      clientHeight: '',
      currentColor: '',
      currentThickness: '',
      exports: '',
      saveRequested: false,
    };
  },
  methods: {
    pointerDown() {
      EventBus.$emit('pointerDown');
    },
    loaded() {
      if (this.diagramData) {
        this.editor.reDraw(this.diagramData.rawStrokes, this.diagramData.strokeGroups);
      }
    },
    changed(event) {
      EventBus.$emit('changed', {
        event,
        canClear: this.editor.model.rawStrokes.length > 0,
      });
    },
    exported(event) {
      this.exports = event.detail.exports;
      EventBus.$emit('exported', {
        exports: event.detail.exports,
        clientWidth: this.clientWidth,
        clientHeight: this.clientHeight,
      });
      if (this.exports && this.exports['application/vnd.openxmlformats-officedocument.presentationml.presentation'] && this.saveRequested) {
        const blob = new Blob([this.exports['application/vnd.openxmlformats-officedocument.presentationml.presentation']], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
        FileSaver.saveAs(blob, 'myscript-diagram.pptx');
        this.saveRequested = false;
      }
    },
    updateColor(color) {
      this.currentColor = color;
      this.editor.penStyle = {
        color: this.currentColor,
        '-myscript-pen-width': this.currentThickness ? this.currentThickness : '',
      };
    },
  },
  mounted() {
    this.editor = MyScript.register(this.$refs.editor, {
      restConversionState: 'DIGITAL_EDIT',
      triggers: {
        exportContent: 'DEMAND',
      },
      recognitionParams: {
        type: 'DIAGRAM',
        protocol: 'REST',
        apiVersion: 'V4',
        server: {
          scheme: 'https',
          host: 'cloud-internal-master.corp.myscript.com',
          applicationKey: '515131ab-35fa-411c-bb4d-3917e00faf60',
          hmacKey: '54b2ca8a-6752-469d-87dd-553bb450e9ad',
        },
        v4: {
          diagram: {
            mimeTypes: ['image/svg+xml', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'],
          },
        },
      },
    }, undefined, undefined, {
      grabber: { attach, detach },
    });

    this.editor.pointerType = 'PEN';

    this.clientWidth = this.$refs.editor.clientWidth;
    this.clientHeight = this.$refs.editor.clientHeight;

    EventBus.$on('clear', () => {
      this.editor.clear();
      EventBus.$emit('clearSvg');
    });
    EventBus.$on('undo', () => {
      this.editor.undo();
    });
    EventBus.$on('redo', () => {
      this.editor.redo();
    });

    EventBus.$on('preview', () => {
      this.displayStyle = 'none';
      if (this.editor.model.rawStrokes.length > 0) {
        this.editor.export_(['image/svg+xml', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']);
      } else {
        EventBus.$emit('clearSvg');
      }
    });

    EventBus.$on('edit', () => {
      this.displayStyle = 'inherit';
    });

    EventBus.$on('save', () => {
      if (this.exports && this.exports['application/vnd.openxmlformats-officedocument.presentationml.presentation']) {
        const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if (iOS) {
          const blob = new Blob([this.exports['application/vnd.openxmlformats-officedocument.presentationml.presentation']]);
          FileSaver.saveAs(blob, 'myscript-diagram.pptx');
        } else {
          const blob = new Blob([this.exports['application/vnd.openxmlformats-officedocument.presentationml.presentation']], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
          FileSaver.saveAs(blob, 'myscript-diagram.pptx');
        }
      } else if (this.editor.model.rawStrokes.length > 0) {
        this.editor.export_();
        this.saveRequested = true;
      } else {
        EventBus.$emit('showNotification', 'save');
      }
    });

    EventBus.$on('eraserEnabled', () => {
      this.pointerType = 'ERASER';
      this.editor.pointerType = 'ERASER';
    });

    EventBus.$on('eraserDisabled', () => {
      this.pointerType = 'PEN';
      this.editor.pointerType = 'PEN';
    });

    EventBus.$on('colorChanged', (color) => {
      this.updateColor(color);
    });

    EventBus.$on('customColorChanged', (color) => {
      this.updateColor(color);
    });

    EventBus.$on('thicknessUpdated', (data) => {
      this.currentThickness = data.value;
      this.editor.penStyle = {
        color: this.currentColor ? this.currentColor : '',
        '-myscript-pen-width': this.currentThickness,
      };
    });

    window.addEventListener('resize', () => {
      this.editor.resize();
    });
  },
};
</script>

<style scoped>
  .editor {
    height: calc(100vh - 152px);
  }
</style>
