<template>
  <div>
    <!-- 这是activity的信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;" v-on:focus="changeInput" v-on:blur="changeText" v-on:click="toInput($event)">活动名称</span>
      </div>
      <div>
        <el-row>
          <el-col span="3" class="item-left">
            状态:
          </el-col>
          <el-col span="3" class="item-right">
            进行中
          </el-col>
          <el-col span="3" class="item-left">
            备注:
          </el-col>
          <el-col span="3" class="item-right">
            remarkxxxx
          </el-col>
        </el-row>
        <el-row>
          <el-col span="3" class="item-left">
            创建时间:
          </el-col>
          <el-col span="3" class="item-right">
            2017-08-14 16:12:13
          </el-col>
          <el-col span="3" class="item-left">
            更新时间:
          </el-col>
          <el-col span="3" class="item-right">
            2017-08-15 11:10:08
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 列表信息 这里使用vue draggable实现-->
    <div class="dragArea">
      <h3 style="text-align: left">任务列表</h3>
      <table class="dragTable">
        <draggable v-mode="dragList" @start="drag=true" @end="drag=false" class="dragList" :options="dragOption">
            <tr v-for="(element, index) in dragList" class="row" v-bind:class="{item: element.status === '未进行'}">
              <td class="name bgblack" >{{'测试数据' + element.name}}</td>
              <td class="age bgblack" >{{element.age}}</td>
              <td class="sex bgblack" >{{element.sex}}</td>
              <td class="status bgblack" >{{element.status}}</td>
              <td>
                <el-button @click="removeNode(index)" :disabled="element.status !== '未进行'">删除任务</el-button>
              </td>
            </tr>
            <el-button slot="footer" @click="addNode">add node</el-button>
        </draggable>
      </table>
    </div>

    <div style="align-items: left;text-align: left; margin: 2%">
      <el-button>保存</el-button>
      <el-button>取消</el-button>
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
      return {
        list: ['1', '2', '3'],
        dragList: [
          {name: '小一', age: 10, sex: '女', status: '已完成'},
          {name: '小二', age: 10, sex: '女', status: '进行中'},
          {name: '小三', age: 10, sex: '女', status: '未进行'}
        ],
        dragOption: {
          dragClass: 'row',
          draggable: '.item'
        }
      }
    },
    methods: {
      add: function () {
        this.list.push('xxxx')
      },
      getActivityAndNodes: function (activityId) {
        this.$http.get(api.GET_ACTIVITY_NODES + '?activityId=' + activityId).then(function (response) {
          console.log(response)
        })
      },
      saveActivity: function (activity) {
        // TODO 保存对象
        // this.$http.post(api.SAVE_ACTIVITY)
      },
      changeInput: function () {
        console.log('我变成input了')
      },
      changeText: function () {
        console.log('我变成text了')
      },
      toInput: function ($event) {
        var destElement = $event.target
        var srcText = destElement.innerHTML
        destElement.innerHTML = '<input value=' + srcText + ' >'
        var input = destElement.querySelector('input')
        input.addEventListener('blur', function (event) {
          destElement.innerHTML = input.value
        })
      },
      addNode: function () {
        var node = {name: '新增', age: 20, sex: '啦啦', status: '未进行'}
        this.dragList.push(node)
      },
      removeNode: function (index) {
        this.dragList.splice(index, 1)
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
