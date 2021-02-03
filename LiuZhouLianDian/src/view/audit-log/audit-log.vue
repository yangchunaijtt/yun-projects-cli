<template>
  <div>
    <Card>
      <tables
        :handleType="handleType"
        ref="tables"
        :loading="loading"
        :data="tableData"
        :columns="columns"
        :current="current"
        :pageSize="pageSize"
        :total="total"
        @getList="getList"
        @pageCurrentChange="pageCurrentChange"
        @pageSizeChange="pageSizeChange"
      >
        <template slot="search">
          <Form :model="searchData" :label-width="80">
            <FormItem label="关键字">
              <Input v-model="searchData.keyword" placeholder="输入关键字" />
            </FormItem>
          </Form>
        </template>
      </tables>
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { toObjstrTrim } from "@/utils/configFus.js";
import { getTableData } from "@/api/data";
export default {
  name: "users",
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: "角色", key: "username", align: "center", sortable: true },
        { title: "显示名", key: "name", align: "center" },
        { title: "描述", key: "email", align: "center", sortable: true }
      ],
      handleType: "search",
      tableData: [],
  
      loading: true,
      searchData: {
        keyword: "",
      },
      current: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    getList() {
      console.log("getlist");
      this.searchData = toObjstrTrim(this.searchData);
      getTableData().then((res) => {
        this.tableData = res.data;
        this.loading = false;
        this.total = 100;
      });
    },
    pageCurrentChange(current) {
      this.current = current;
      this.getList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getList();
      console.log(this.pageSize);
    }
  },
};
</script>
