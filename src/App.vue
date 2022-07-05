<template>
  <div>
    <input
      style="width: 300px,height: 100px"
      type="text"
      placeholder="请输入内容"
      v-model.trim="bookname"
      @keyup.enter="enterFn"
    />
    <button @click="returnFn">返回</button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="200"> </el-table-column>
      <el-table-column prop="bookname" label="书名" width="200">
      </el-table-column>
      <el-table-column prop="author" label="作者"> </el-table-column>
      <el-table-column prop="publisher" label="出版商"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <div>
            <button @click="delFn(row.id)">删除</button>
            <button @click="detailsFn(row.id)">详情</button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="margin-top: 20px"
    >
      <el-form-item label="书名">
        <el-input v-model.trim="form.bookname" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model.trim="form.author" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="出版商">
        <el-input v-model.trim="form.publisher" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      bookname: '',
      form: {
        bookname: '',
        author: '',
        publisher: '',
      },
      flag: false,
      detailData: [],
    };
  },
  methods: {
    onSubmit() {
      if (
        this.form.bookname == '' ||
        this.form.author == '' ||
        this.form.publisher == ''
      )
        return alert('Please enter');
      this.flag = true;
      if (this.flag) {
        this.$axios({
          url: '/api/addbook',
          method: 'POST',
          data: {
            appkey: '7250d3eb-18e1-41bc-8bb2-11483665535a',
            ...this.form,
          },
        }).then((res) => {
          const id = this.tableData[this.tableData.length - 1]
            ? this.tableData[this.tableData.length - 1].id + 1
            : 1;
          this.tableData.push({
            id,
            bookname: this.form.bookname,
            author: this.form.author,
            publisher: this.form.publisher,
          });
          this.form.bookname = '';
          this.form.author = '';
          this.form.publisher = '';
          this.flag = false;
          alert(res.data.msg);
        });
      }
    },
    enterFn() {
      if (this.bookname.length == 0) return alert('Please enter');
      console.log(this.bookname);
      this.$axios({
        url: '/api/getbooks',
        params: {
          bookname: this.bookname,
        },
      }).then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data;
      });
      this.bookname = '';
    },
    returnFn() {
      // this.$axios({
      //   url: '/api/getbooks',
      // }).then((res) => {
      //   // console.log(res.data.data);
      //   this.tableData = res.data.data;
      // });
      this.getBook();
    },
    getBook() {
      this.$axios({
        url: '/api/getbooks',
      }).then((res) => {
        // console.log(res.data.data);
        this.tableData = res.data.data;
      });
    },
    delFn(val) {
      this.$axios({
        url: '/api/delbook',
        params: {
          // 都会axios最终拼接到url?后面
          id: val,
        },
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.data;
      });
    },
    detailsFn(val) {
      this.$axios({
        url: '/api/getbooks',
        params: {
          // 都会axios最终拼接到url?后面
          id: val,
        },
      }).then((res) => {
        console.log(res.data.data);
        alert(
          `书名：${res.data.data[0].bookname},\n作者：${res.data.data[0].author}，\n出版社：${res.data.data[0].publisher}`
        );
      });
    },
  },
  created() {
    //   this.$axios({
    //     url: '/api/getbooks',
    //   }).then((res) => {
    //     // console.log(res.data.data);
    //     this.tableData = res.data.data;
    //   });
    this.getBook();
  },
};
</script>
