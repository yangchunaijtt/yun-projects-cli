<template>
  <div>
    <slot name="search"></slot>
    <div class="handle-div mt10">
      <div v-if="handleType === 'add'">
        <Button type="primary" @click="addItem" :size="btsDefaultSize"
          >添加</Button
        >
        <Button
          type="primary"
          class="ml10"
          @click="getList"
          :size="btsDefaultSize"
          >查找</Button
        >
      </div>
      <div v-else-if="handleType === 'search'">
        <Button type="primary" @click="getList" :size="btsDefaultSize"
          >查找</Button
        >
        <Button
          type="primary"
          class="ml10"
          @click="exportExcel"
          :size="btsDefaultSize"
          >导出</Button
        >
      </div>
      <div v-else-if="handleType === 'config'">
        <Button type="primary" @click="toConfig" :size="btsDefaultSize"
          >Config</Button
        >
        <Button
          type="primary"
          class="ml10"
          @click="getList"
          :size="btsDefaultSize"
          >Run</Button
        >
      </div>
      <div v-else-if="handleType === 'slot'">
        <slot name="handleBts" slot="handleBts"></slot>
      </div>
    </div>
    <Table
      ref="tablesMain"
      :data="data"
      :columns="columns"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      class="mt10"
    >
    </Table>
    <Page
      :total="total"
      :page-size="pageSize"
      :current="current"
      show-sizer
      class="mt10"
      @on-change="pageCurrentChange"
      @on-page-size-change="pageSizeChange"
    />
    <slot name="footer" slot="footer"></slot>
  </div>
</template>

<script>
import TablesEdit from "./edit.vue";
import handleBtns from "./handle-btns";
import "./index.less";
export default {
  name: "Tables",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    handleType: {
      type: String,
      default: "add",
    },
    size: String,
    width: {
      type: [Number, String],
    },
    height: {
      type: [Number, String],
    },
    border: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    noDataText: {
      type: String,
      default: "暂无数据",
    },
    noFilteredDataText: {
      type: String,
      default: "暂无数据",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    //分页相关的设置
    page_size: {
      type: String,
      default: "",
    },
    current: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    btsDefaultSize: {
      type: String,
      default: "default",
    },
    btsDefaultType: {
      type: String,
      default: "primary",
    },
    toExcelParams: {
      type: Object,
      default() {
        return {
          filename: `table-${new Date().valueOf()}.csv`,
        };
      },
    },
  },
  data() {
    return {
      mainPageTotal: 30,
      mainPageSize: 10,
      mainPageCurrent: 1,
    };
  },
  methods: {
    getList() {
      this.$emit("getList");
    },
    pageCurrentChange(current) {
      this.$emit("pageCurrentChange",current);
    },
    pageSizeChange(pageSize) {
      this.$emit("pageSizeChange",pageSize);
    },
    addItem() {
      this.$emit("addItem");
    },
    exportExcel() {
      this.$refs.tablesMain.exportCsv(this.toExcelParams);
      console.log("导出配置");
    },
    toConfig() {
      this.$emit("toConfig");
    },
  },
  created() {
    this.getList();
  }
};
</script>
