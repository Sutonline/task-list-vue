<template>
  <div>
    <el-row>
      <el-col :span="16" style="text-align: left">
        <h3>当前任务列表</h3>
      </el-col>
      <el-col :span="6" style="text-align: right;margin-right: 20px">
        <el-button type="" size="normal" @click="dialogVisible = true">新增任务</el-button>
        <el-button type="" size="normal" @click="getNonFinishedTask">获取未完成的任务</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      border class="table" style="margin-top: 20px" :row-class-name="setRowClassName">
      <el-table-column
        prop="createDate"
        label="CreateDate"
        width="200">
      </el-table-column>
      <el-table-column
        prop="label"
        label="Category">
      </el-table-column>
      <el-table-column
        prop="content"
        label="Content">
      </el-table-column>
      <el-table-column
        label="Action" width="220">
        <template scope="scope">
          <el-button @click="finish(scope)" type="text" size="small">
            完成
          </el-button>
          <el-button @click="updatex(scope)" type="text" size="small">
            更新
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增任务"
               :visible.sync="dialogVisible"
               size="tiny"
               :before-close="handleClose">
      <el-form ref="newTask" :model="form" :rules="ruleValidate" label-width="80px">
        <el-form-item label="任务类别" prop="label">
          <el-select v-model="form.label" placeholder="请选择">
            <el-option v-for="item in labels"
                       :key="item.name"
                       :label="item.value"
                       :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务内容" prop="content">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="update('newTask')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as api from '../api/task-list-api'

  export default {
    name: 'currentTasks',
    data () {
      this.loadData()
      return {
        form: {
          taskId: 0,
          label: '',
          content: ''
        },
        ruleValidate: {
          label: [{
            required: true,
            message: '请选择标签'
          }],
          content: [{
            required: true,
            message: '任务内容必填'}]},
        labels: [],
        dialogVisible: false,
        tableData: []
      }
    },
    route: {
      data: function (transition) {
        // var q = this.$route.query // 获取url的路由查询对象
        this.loadData()
      }
    },
    methods: {
      updatex: function (scope) {
        console.log(scope)
        this.form.taskId = scope.row.id
        this.form.label = scope.row.label
        this.form.content = scope.row.content
        this.dialogVisible = true
      },
      finish: function (scope) {
        var taskId = scope.row.id
        this.doneTask(taskId)
      },
      loadData: function () {
        this.getAllLabel()
        this.getNonFinishedTask()
      },
      // 每行className设置
      setRowClassName (row, index) {
        return 'table-item'
      },
      handleClose: function (done) {
        this.$confirm('确认关闭?')
          .then(_ => {
            done()
          }).catch()
      },
      getNonFinishedTask: function () {
        this.$http.get(api.GET_NON_FINISH_TASK).then(
          res => {
            this.tableData = res.data
          }
        )
        this.getAllLabel()
      },
      getAllLabel: function () {
        this.$http.get(api.QUERY_LABELS).then(
          res => {
            this.labels = res.data
          }
        )
      },
      doneTask: function (taskId) {
        this.$http.post(api.DONE + '/?id=' + taskId).then(
          res => {
            this.$message({
              type: 'success',
              message: '又完成一个任务'
            })
            this.loadData()
          }
        )
      },
      updateTask: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const taskId = this.form.taskId
            const label = this.form.label
            const content = this.form.content
            var params = new URLSearchParams()
            params.append('id', taskId)
            params.append('label', label)
            params.append('content', content)
            this.$http.post(api.SAVE, params).then(
                res => {
                  this.$message(res.data)
                  this.dialogVisible = false
                  this.loadData()
                }
            ).catch(
              error => {
                this.$message('提交错误' + error)
              }
            )
          } else {
            console.log('error submit')
            return false
          }
        })
          /* this.$http.post(api.SAVE, task).then(
          res => {
            console.log(res)
          }
        ) */
      },
      update: function (task) {
        this.updateTask(task)
      }
    }
  }
</script>

<style lang="scss">
  .el-table .table-item {
    align-items: left;
    text-align: left;
    background-color: #1A191F;
    color: white;
  }
</style>
