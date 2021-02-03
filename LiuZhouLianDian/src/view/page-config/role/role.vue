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
        @addItem="addItem"
      >
        <template slot="search">
          <Form :model="searchData" :label-width="80">
            <FormItem label="关键字">
              <Input v-model="searchData.keyword" placeholder="输入关键字" />
            </FormItem>
          </Form>
        </template>
      </tables>
      <page-model
        :modelShow="modelShow"
        :title="modelTitle"
        @onOk="changeItemOk"
        @onCancel="changeItemCancel"
      >
        <template slot="froms">
          <Form :model="editData">
            <FormItem label="角色">
              <Input v-model="editData.name" placeholder="请输入角色" />
            </FormItem>
            <FormItem label="显示名">
              <Input v-model="editData.email" placeholder="请输入显示名" />
            </FormItem>
            <FormItem label="描述">
              <Input v-model="editData.email" placeholder="请输入描述" />
            </FormItem>
          </Form>
        </template>
      </page-model>
      <DeleteModel
        :deleteShow="deleteShow"
        @onOk="removeOk"
        @onCancel="removeCancel"
      />
    </Card>
  </div>
</template>

<script>
import Tables from "_c/tables";
import DeleteModel from "_c/delete-model";
import { toObjstrTrim } from "@/utils/configFus.js";
import { getTableData } from "@/api/data";
import pageModel from "_c/page-model";
export default {
  name: "users",
  components: {
    Tables,
    pageModel,
    DeleteModel,
  },
  data() {
    return {
      columns: [
        { title: "角色", key: "username", align: "center", sortable: true },
        { title: "显示名", key: "name", align: "center" },
        { title: "描述", key: "email", align: "center", sortable: true },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params, vm) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.index);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      handleType: "add",
      tableData: [],
      deleteShow: false,
      removeIndex: null,
      loading: true,
      searchData: {
        keyword: "",
      },
      current: 1,
      pageSize: 10,
      total: 0,
      modelShow: false,
      modelTitle: "添加角色",
      editData: {
        username: "",
        name: "",
        email: "",
        isuserd: "",
        createTime: "",
      },
      editIndex: null,
    };
  },
  methods: {
    addItem() {
      this.editIndex = null;
      this.modelTitle = "添加角色";
      Object.assign(this.$data.editData, this.$options.data().editData);
      this.modelShow = true;
    },
    toEdit(index) {
      this.editIndex = index;
      this.editData = this.tableData[index];
      this.modelTitle = "修改角色";
      this.modelShow = true;
    },
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
    },
    changeItemOk() {
      if (this.editIndex) {
        // 发送修改api
        this.modelShow = false;
        this.getList();
        this.$Message.success("修改成功！");
      } else {
        // 发送新增api
        this.modelShow = false;
        this.$Message.success("添加成功！");
      }
    },
    changeItemCancel() {
      Object.assign(this.$data.editData, this.$options.data().editData);
      this.modelShow = false;
    },
    remove(index) {
      this.removeIndex = index;
      this.deleteShow = true;
    },
    removeOk() {
      if (this.removeIndex) {
        // 发送删除ajax
        this.deleteShow = false;
        this.getList();
        this.$Message.success("删除成功！");
      } else {
        this.$Message.success("抱歉，请稍后再试！");
      }
    },
    removeCancel() {
      this.deleteShow = false;
    },
  },
};
</script>
