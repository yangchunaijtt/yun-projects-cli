<template>
  <Modal
    v-model="modalShow"
    :title="title ? title : '您确定要删除嘛？'"
    @on-ok="onOk"
    @on-cancel="onCancel"
  >
    <p>
      {{ deleteCenterText ? deleteCenterText : "注意！您正在进行删除操作" }}
    </p>
    <div slot="footer">
      <Button type="primary" @click="onOk">确定</Button>
      <Button type="error" @click="onCancel">取消</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "delete-model",
  props: {
    deleteShow: Boolean,
    title: String,
    deleteCenterText: String,
  },
  data() {
    return {
      modalShow: false,
    };
  },
  methods: {
    onOk() {
      this.$emit("onOk");
    },
    onCancel() {
      this.$emit("onCancel");
      this.$Message.info("已取消！");
    },
  },
  watch: {
    deleteShow(newVal) {
      this.modalShow = newVal;
    },
  },
};
</script>
