<template>
  <div>
    <!-- activity的表单 -->
    <el-form ref="activity" :rules="ruleValidate" :model="activity" v-model="activity" label-width="80px">
      <el-form-item label="活动名称" prop="activityName">
        <el-input v-model="activity.activityName"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="activity.remark"></el-input>
      </el-form-item>
      <el-form-item label="任务节点" prop="activityNodeList">
        <el-row v-for="(node, index) in activity.activityNodeList" class="nodeItem" :gutter="3">
          <el-col span="3">
            <el-input v-model="node.content" placeholder="节点任务内容"></el-input>
          </el-col>
          <el-col span="3">
            <el-input v-model="node.needDays" placeholder="0"></el-input>
          </el-col>
          <el-col span="3">
            <el-button @click="removeNode(index)">删除</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="3">
            <el-button @click="addNode">add</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit('activity')">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  import * as api from '../api/task-list-api'
  // import qs from 'qs'

  export default {
    name: 'addActivity',
    data () {
      const checkActivityNodeList = (rule, value, callback) => {
        if (!value || !Array.isArray(value) || value.length === 0) {
          return callback(new Error('至少添加一个任务节点'))
        }
        for (let i = 0; i < value.length; i++) {
          let node = value[i]
          if (!node.content || !node.needDays || node.needDays === 0) {
            return callback(new Error('节点任务的内容和需要天数不能为空!'))
          }
        }
        return callback()
      }

      return {
        activity: {
          activityName: '',
          remark: '',
          activityNodeList: []
        },
        ruleValidate: {
          activityName: [
            {required: true, message: '请输入活动名称'},
            {min: 3, max: 30, message: '最长30个字符'}
          ],
          remark: [
            {max: 30, message: '最长30个字符'}
          ],
          activityNodeList: [
            {validator: checkActivityNodeList}
          ]
        }
      }
    },
    methods: {
      addNode: function () {
        if (!this.activity.activityNodeList) {
          this.activity.activityNodeList = []
        }
        this.activity.activityNodeList.push({content: '', needDays: 0})
      },
      removeNode: function (index) {
        this.activity.activityNodeList.splice(index, 1)
      },
      saveActivity: function () {
        // let activity = qs.stringify({'activity': this.activity})
        // console.log('lalal' + activity)
        this.$http.put(api.SAVE_ACTIVITY, JSON.stringify(this.activity), {
          'Content-Type': 'application/json'
        }).then(res => {
          console.log(res)
        })
      },
      submit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveActivity()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .al {
    align-items: left;
    text-align: left;
  },
  .nodeItem {
    padding: 5px;
  }
</style>
