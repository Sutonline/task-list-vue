<template>
  <el-table
    :data="tableData"
    border class="table" style="margin-top: 50px" :row-class-name="setRowClassName">
    <el-table-column
      prop="date"
      label="CreateDate"
      width="118">
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
        <el-button @click="delete(scope)" type="text" size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'currentTasks',
    data () {
      return {
        tableItemName: 'tableItem',
        tableData: [
          {
            date: '2017-07-10',
            content: '做点什么吧',
            action: 'dododo'
          },
          {
            date: '2017-07-09',
            content: '什么都不做吗?',
            action: 'dododo'
          },
          {
            date: '2017-07-08',
            content: '大发大打',
            action: 'dododo'
          }
        ]
      }
    },
    methods: {
      delete: function (scope) {
        console.log(scope)
      },
      finish: function (scope) {
        console.log(scope)
      },
      // 每行className设置
      setRowClassName (row, index) {
        return 'table-item'
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
