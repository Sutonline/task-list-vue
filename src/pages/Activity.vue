<template>
  <div>
    <el-row>
      <el-col :span="3">这是activity</el-col>
    </el-row>
    <el-collapse v-for="item in activities">
      <el-collapse-item name="item" style="text-align: left">
        <template slot="title">
          <talbe>
            <tr class="al">
              <td width="40%">
                activityName: {{item.activityName}}
              </td>
              <td width="20%">
                创建时间: {{item.createTime}}
              </td>
              <td width="20%">
                更新时间: {{item.updateTime}}
              </td>
              <td width="10%">
                剩余任务量: {{item.taskUncompletedCnt}}
              </td>
              <td width="10%" class="ar">
                编辑
              </td>
            </tr>
          </talbe>
        </template>
        <table>
          <tr>
            <td>总任务数量: {{item.taskTotalCnt}}</td>
            <td>已完成百分比: {{item.taskCompletedPercent}}</td>
          </tr>
          <tr>
            <td>当前任务名称: {{item.currentNodeName}}</td>
            <td>超期时间: {{item.currentDueTime}}</td>
          </tr>
          <tr>
            <td><el-button size="mini" type="text">完成</el-button></td>
            <td><el-button size="mini" type="text">放弃进入下一任务</el-button></td>
          </tr>
        </table>
      </el-collapse-item>
    </el-collapse>
    <el-button @click="listActivities">获取activity测试</el-button>
  </div>
</template>

<script>
  import * as api from '../api/task-list-api'

  export default {
    name: 'activity',
    data () {
      return {
        activities: []
      }
    },
    methods: {
      listActivities: function () {
        this.$http.get(api.LIST_ACTIVITIES + '?status=' + '1').then(function (response) {
          this.activities = response.data
        }.bind(this))
      },
      completedNode: function (nodeId) {
        console.log(nodeId)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .ac {
    align-items: center;
    text-align: center;
  }
  .al {
    align-items: left;
    text-align: left;
  }
  .ar {
    align-items: right;
    text-align: right;
  }
</style>
