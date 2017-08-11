<template>
  <el-row>
    <el-col :span="3">这是activity</el-col>
  </el-row>
  <el-collapse v-for="activity in actitivies">
    <el-collapse-item title="一致性 consistence" name="1">
      <div>与现实生活一直</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import ElCollapse from "../../node_modules/element-ui/packages/collapse/src/collapse.vue";

  export default {
    components: {ElCollapse},
    name: 'activity',
    data() {
      return {
          acitivitys: []
      }
    }
  }
</script>
