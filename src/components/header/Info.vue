<template>
  <div>
    <div class="help-div">
      <div class="toast-content">
        <a class="close" @click="$emit('close-info')">×</a>
          <h3>Diagram</h3>
          <p>Sketch lines and shapes, write your text, preview and export to the Microsoft PowerPoint format.</p>
          <div class="center">
            <img src="../../../static/img/preview.gif">
          </div>
      </div>
    </div>
    <div class="help-overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'info',
};
</script>

<style scoped>

  .center > img {
    width: 95%;
    max-width: 600px;
  }

  .help-div {
    color: #333333;
    position: absolute;
    padding: 48px;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: 48px;
    border-radius: 5px;
    z-index: 100;
    -webkit-overflow-scrolling: touch;
    background-color: #f5f5f5;
    overflow: auto;
    max-width: 750px;
  }

  .help-overlay {
    transition: opacity .3s ease-out;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    z-index: 99;
    opacity: 0.7;
  }

  .center {
    text-align: center;
    width: 100%;
  }

  .close {
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 30px;
    transition: all 200ms;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }

  .close:focus,
  .close:hover {
    color: #1A9FFF;
  }

  @media only screen and (min-device-width: 1254px) {
    .help-div {
      width: 750px;
    }
  }

  @media only screen and (min-device-width : 480px) and (max-device-width : 768px) {
    .help-div {
      padding: 24px;
    }

    .close {
      top: 12px;
      right: 18px;
    }

    .help-div {
      padding: 48px 24px 0;
      width: 90%;
    }
  }

  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .close {
      top: 12px;
      right: 18px;
    }

    .help-div {
      padding: 48px 6px 0;
      width: 95%;
    }
  }

</style>
