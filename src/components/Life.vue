<template>
  <div>{{msg}}</div>
</template>
<script>
export default {
  data() {
    return {
      msg: 'hello, Vue',
    };
  },
  // 一. 初始化
  // new Vue()以后, vue内部给实例对象添加了一些属性和方法, data和methods初始化"之前"
  beforeCreate() {
    console.log('beforeCreate -- 执行');
    console.log(this.msg); // undefined
  },
  // data和methods初始化以后
  // 场景: 网络请求, 注册全局事件
  created() {
    console.log('created -- 执行');
    console.log(this.msg); // hello, Vue
  },
};
</script>
<style scoped></style>
