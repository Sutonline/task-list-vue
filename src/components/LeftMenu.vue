<!-- 左侧菜单 -->
<template>
  <el-menu default-active="current" class="el-menu-vertical-demo" theme="dark" :router="true" id="left-menu">
    <el-menu-item index="current">
      当前任务
    </el-menu-item>
    <el-menu-item index="history">
      历史任务
    </el-menu-item>
    <el-menu-item index="activity">
      Activity
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'leftMenu',
    methods: {}
  }
</script>

