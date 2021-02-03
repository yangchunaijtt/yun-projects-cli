<template>
  <Modal v-model="modaltype" :title="title" @on-ok="onOk" @on-cancel="onCancel" :width='width' >
    <slot name='froms'></slot>
    <div slot="footer">
      <Button type="primary" @click="onOk">确定</Button>
      <Button type="error" @click="onCancel">取消</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "page-model",
  props: {
    modelShow: Boolean,
    title: String,
    width:[Number,String]
  },
  data() {
    return {
      modaltype: false,
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
    modelShow(newVal) {
      this.modaltype = newVal;
    },
  },
};
</script>
