<template>
  <div id="container">
    <top-bar></top-bar>
    <transition name="slide-fade">
      <router-view class="content"></router-view>
    </transition>
  </div>
</template>

<script>
  import topBar from './TopBar.vue'

  export default {
    name: 'container',
    components: {
      topBar
    }
  }
</script>
