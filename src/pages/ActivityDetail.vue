<template>
  <div>
    <!-- 这是activity的信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;" v-on:click="toInput($event, syncActivityName)">{{activity.activityName}}</span>
      </div>
      <div>
        <el-row>
          <el-col span="3" class="item-left">
            状态:
          </el-col>
          <el-col span="3" class="item-right">
            {{activity.status}}
          </el-col>
          <el-col span="3" class="item-left">
            备注:
          </el-col>
          <el-col span="3" class="item-right">
            <span v-on:click="toInput($event, syncActivityRemark)">
              {{activity.remark}}
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="3" class="item-left">
            创建时间:
          </el-col>
          <el-col span="3" class="item-right">
            {{activity.createTime}}
          </el-col>
          <el-col span="3" class="item-left">
            更新时间:
          </el-col>
          <el-col span="3" class="item-right">
            {{activity.updateTime}}
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 列表信息 这里使用vue draggable实现-->
    <div class="dragArea">
      <h3 style="text-align: left">任务列表</h3>
      <table class="dragTable">
        <draggable v-model="activity.activityNodeList" @start="drag=true" @end="drag=false" class="dragList" :options="dragOption">
            <tr v-for="(element, index) in activity.activityNodeList" class="row .ignore-elements" v-bind:class="{item: element.status === 0}">
              <td class="name bgblack" >{{element.content}}</td>
              <td class="age bgblack" >
                <span v-if="element.remark">
                  {{element.remark}}
                </span>
                <span v-else>
                  无
                </span>
              </td>
              <td class="sex bgblack" >{{element.needDays}}</td>
              <td class="status bgblack" >{{element.status}}</td>
              <td>
                <el-button @click="removeNode(index)" :disabled="element.status !== 0">删除任务</el-button>
              </td>
            </tr>
            <tr>
              <td>
                <el-input v-model="newNode.content" placeholder="请输入节点内容"></el-input>
              </td>
              <td>
                <el-input v-model="newNode.remark" placeholder="备注"></el-input>
              </td>
              <td>
                <el-input-number v-model="newNode.needDays" ></el-input-number>
              </td>
              <td>
                <el-button slot="footer" @click="addNode">add node</el-button>
              </td>
            </tr>
        </draggable>
      </table>
    </div>

    <div style="align-items: left;text-align: left; margin: 2%">
      <el-button @click="updateActivity">保存</el-button>
      <el-button @click="back">取消</el-button>
    </div>

  </div>
</template>

<script>
  import VueDraggable from 'vuedraggable'
  import Vue from 'vue'
  import * as api from '../api/task-list-api'

  Vue.component('draggable', VueDraggable)

  export default {
    name: 'activityDetail',
    data () {
      let q = this.$route.query
      console.log(q)
      this.getActivityAndNodes(q.activityId)
      return {
        list: ['1', '2', '3'],
        query: {
          activityId: ''
        },
        dragOption: {
          dragClass: 'row',
          draggable: '.item'
        },
        activity: {
          activityName: '',
          remark: '',
          createTime: '',
          updateTime: '',
          activityNodeList: []
        },
        newNode: {
          content: '',
          remark: '',
          needDays: 0
        }
      }
    },
    methods: {
      loadData: function () {
        if (this.query.activityId) {
          this.getActivityAndNodes(this.query.activityId)
        }
      },
      add: function () {
        this.list.push('xxxx')
      },
      getActivityAndNodes: function (activityId) {
        this.$http.get(api.GET_ACTIVITY_NODES + '/' + activityId).then(function (response) {
          console.log(response)
          this.activity = response.data
        }.bind(this))
      },
      updateActivity: function (activity) {
        // TODO 保存对象 能否实现部分拖拽
        // 1. 检查 2. 序列化json 3. 使用URLSearchParam的方式进行传参
        let valid = this.validateNodeList()
        if (!valid) {
          this.$message.error('节点任务信息有误')
          return
        }
        let params = new URLSearchParams()
        params.append('activityJson', JSON.stringify(this.activity))
        this.$http.post(api.UPDATE_ACTIVITY, params).then(function (response) {
          console.log(response)
        })
      },
      toInput: function ($event, func1) {
        let destElement = $event.target
        let srcText = destElement.innerHTML
        destElement.innerHTML = '<input value=' + srcText + '>'
        let input = destElement.querySelector('input')
        input.addEventListener('blur', function (event) {
          destElement.innerHTML = input.value
          func1(input.value)
        })
      },
      syncActivityName: function (value) {
        this.activity.activityName = value
      },
      syncActivityRemark: function (value) {
        this.activity.remark = value
      },
      addNode: function () {
        if (this.newNode && this.newNode.content && this.newNode.needDays) {
          let node = {content: this.newNode.content, remark: this.newNode.remark, needDays: this.newNode.needDays, status: -1}
          this.activity.activityNodeList.push(node)
          // 清空数据
          this.newNode.content = ''
          this.newNode.remark = ''
          this.newNode.needDays = 0
        }
      },
      removeNode: function (index) {
        this.activity.activityNodeList.splice(index, 1)
      },
      validateNodeList: function () {
        let nodeList = this.activity.activityNodeList
        if (nodeList) {
          let node
          for (let i = 0; i < nodeList.length; i++) {
            node = nodeList[i]
            if (node.status) {
              continue
            }
            if (!node.content || !node.needDays || node.needDays <= 0) {
              return false
            }
          }
        }
        return true
      },
      back: function () {
        this.$router.push('/activity')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .dragArea {
    margin-top: 40px;
    margin-left: 2%;
    width: 96%;
    .dragTable{
      width: 100%;
      display: table;
      margin: 10px auto;
      padding: 0;
      height: auto;
      border-collapse: collapse;
      text-align: center;
      .dragList {
        width: 100%;
        .row {
          border: 1px solid;
          width: 100%;
          text-align: left;
        }
        .name {
          width: 300px;
          text-align: left;
          padding: 10px;
        }
        .age {
          width: 300px;
          text-align: left;
          padding: 10px;
        }
        .sex {
          width: 100px;
          text-align: left;
          padding: 10px;
        }
        .status{
          width: 100px;
          padding: 10px;
        }
      }
    }
  },
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .box-card {
    background-color: black;
    width: 96%;
    margin-left: 2%;
  }
  .bgblack {
    background-color: black;
  }
  .item-left {
    align-items: right;
    text-align: right;
    padding: 5px;
  }
  .item-right {
    align-items: left;
    text-align: left;
    padding: 5px;
  }
</style>
