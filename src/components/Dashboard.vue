<!-- 这个vue用来菜单和content，以及modal -->
<template>
  <div id="dashboard">
    <left-menu></left-menu>
    <!-- content -->
    <container></container>
  </div>
</template>

<script>
  // import Vue from 'vue'
  import '../style/dashboard.scss'
  import leftMenu from './LeftMenu.vue'
  import Container from './Container.vue'

  export default {
    name: 'dashboard',
    components: {
      leftMenu,
      Container
    }
  }

</script>
