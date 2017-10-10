<template>
  <div id="container">
    <top-bar></top-bar>
    <transition name="slide-fade">
      <router-view class="content"></router-view>
    </transition>

    <!-- 增加备案信息 -->
    <el-row>
      <el-col span="24" style="text-align:center;align-items: center">
        <a href="http://www.miitbeian.gov.cn/">京ICP备17056815号</a>
      </el-col>
    </el-row>
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
