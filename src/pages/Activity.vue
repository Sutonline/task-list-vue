<template>
  <div>
    <el-row style="margin: 20px">
      <el-col :span="2">
        <el-button @click="listActivities">当前任务</el-button>
      </el-col>
      <el-col :span="2">
        <el-button>历史任务</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="addActivity">新增</el-button>
      </el-col>
    </el-row>
    <el-collapse v-for="item in activities" style="margin-left: 20px">
      <el-collapse-item name="item" style="text-align: left;">
        <template slot="title">
          <talbe>
            <tr class="al">
              <td width="40%" class="mr5">
                activityName: {{item.activityName}}
              </td>
              <td width="20%" class="mr5">
                创建时间: {{item.createTime}}
              </td>
              <td width="20%" class="mr5">
                更新时间: {{item.updateTime}}
              </td>
              <td width="10%" class="mr5">
                剩余任务量: {{item.taskUncompletedCnt}}
              </td>
              <td width="5%" class="ar mr5">
                <el-button type="text" @click="updateActivity(item.activityId)">编辑</el-button>
              </td>
              <td width="5%" class="ar mr5">
                <el-button type="text" @click="deleteActivity(item.activityId)">删除</el-button>
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
            <td><el-button size="mini" type="text" @click="completeNode(item.currentNodeId)">完成</el-button></td>
          </tr>
        </table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import * as api from '../api/task-list-api'

  export default {
    name: 'activity',
    data () {
      this.listActivities()
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
      completeNode: function (nodeId) {
        this.$http.put(api.COMPLETE_NODE + '/' + nodeId).then(function (response) {
          this.$message.success(response.data)
          this.listActivities()
        }.bind(this))
      },
      updateActivity: function (activityId) {
        console.log('update activity' + activityId)
        this.$router.push('/activityDetail?activityId=' + activityId)
      },
      deleteActivity: function (activityId) {
        this.$http.delete(api.DELETE_ACTIVITY + '/' + activityId).then(function (response) {
          this.$message.success(response.data)
          this.listActivities()
        }.bind(this))
      },
      addActivity: function () {
        this.$router.push('/addActivity')
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
  .mr5 {
    margin-right: 5px;
  }
</style>
