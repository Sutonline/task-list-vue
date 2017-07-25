<template>
  <div>
    <el-form ref="searchForm" :model="searchModel" label-width="80px" style="margin: 10px">
      <el-form-item label="任务内容">
        <el-input v-model="searchModel.content"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-col :span="3">
          <el-date-picker type="date" placeholder="开始日期" v-model="searchModel.createDateStart"></el-date-picker>
        </el-col>
        <el-col :span="1">
          -
        </el-col>
        <el-col :span="3">
          <el-date-picker type="date" placeholder="结束日期" v-model="searchModel.createDateEnd"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item style="">
        <el-button type="" @click="getHistoryTasks(1)">搜索</el-button>
        <el-button type="" @click="reset('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="historyTasks" rowClassName="setRowClassName" style="width: 100%" border>
      <el-table-column prop="createDate" label="createDate"></el-table-column>
      <el-table-column prop="content" label="content"></el-table-column>
      <el-table-column prop="updateDate" label="updateDate"></el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="page.totalItemsCnt"
      style="text-align: right;margin-top: 15px"></el-pagination>
  </div>
</template>

<script>
  import * as api from '../api/task-list-api'

  export default {
    name: 'historyTasks',
    data () {
      return {
        page: {
          currentPage: 1,
          pageSize: 10,
          totalItemsCnt: 200
        },
        searchModel: {
          content: '',
          createDateStart: '',
          createDateEnd: ''
        },
        historyTasks: []
      }
    },
    methods: {
      setRowClassName: function (row, index) {
        return 'table-item'
      },
      handleSizeChange (val) {
        console.log(`每页${val}条`)
      },
      handleCurrentChange (val) {
        this.getHistoryTasks(val)
      },
      search: function () {
        console.log('搜索')
      },
      reset: function (formName) {
        this.$refs[formName].resetFields()
      },
      getHistoryTasks: function (pageIndex) {
        this.$http.get(api.LIST_BY_PAGE + '?pageIndex=' + pageIndex + '&pageSize=' + this.page.pageSize)
          .then(function (response) {
            this.historyTasks = response.data.list
            this.page.totalItemsCnt = response.data.totalItems
            this.page.currentPage = response.data.pageIndex
            this.page.pageSize = response.data.pageSize
          }.bind(this))
      },
      test: function () {
        this.getHistoryTasks()
      }
    }
  }
</script>

