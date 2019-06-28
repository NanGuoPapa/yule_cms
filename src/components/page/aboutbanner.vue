<template>
  <el-card style="margin:15px;">
    <div class="details">
      <ul>
        <li>
          <el-button type="text">
            <div class="upload">+ 添加</div>
          </el-button>
        </li>
        <li>
          <div class="details-news">
            <div class="img">
              <img class="head-img" src="../../assets/images/head.png" alt>
            </div>
            <div class="details-font">
              <h1 class="font">我是标题</h1>
              <span class="mysife">一句话简单介绍自己</span>
              <p class="time">2019.7</p>
            </div>
            <div class="edit">
              <span>编辑</span>
              <span class="division">下架</span>
              <span class="division">删除</span>
              <span class="division">置顶</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
export default {
  methods: {
  }
}
</script>

<style>
.el-card {
  min-height: calc(100vh - 60px);
}
.el-card li {
  list-style: none;
}
.upload {
  width: 151px;
  height: 187px;
  border: 1px dashed rgba(224, 224, 224, 1);
  border-radius: 2px;
  text-align: center;
  line-height: 187px;
  color: #d9d9d9;
  font-size: 8px;
}
.el-message-box__message input {
  height: 24px;
  width: 272px;
  margin-top: 10px;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  padding-left: 15px;

}
.el-message-box__message p {
  text-align: right;
}
.el-message-box {
  width: 800px;
  height: 460px;
}
.el-message-box__message textarea {
  margin-top: 24px;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  padding-left: 15px;
  width: 272px;
  height: 54px;
  resize: none;
}
.el-message-box__message h5 {
  position: absolute;
  margin-top: 23px;
  padding-right: -1px;
  margin-left: 43px;
  color: #333333;
  font-size: 7px;
}
.el-message-box__message span {
  font-size: 7px;
  color: #333333;
  font-weight: 800;
}
.el-message-box__message i {
  color: red;
}
.el-message-box__title span {
  width: 29px;
  height: 8px;
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
}
.el-message-box__header {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 30px;
}
.details li {
  float: left;
  margin-left: 10px;
}
.head-img {
  width: 151px;
  height: 98px;
}
.details-news {
  width: 151px;
  height: 187px;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius: 2px;
  font-size: 8px;
  margin-top: 13px;
  margin-bottom: 15px;
}
.details-font {
  margin-left: 10px;
}
.edit {
  height: 24px;
  background: #E0E0E0;
}

.edit span {
  margin-left: 5px;
  position: initial;
  margin-top: 4px;
  float: right;
  padding-right: 8px;
}
.division {
  border-right: 1px solid #e0e0e0;
}
.font {
  line-height: 0px;
}
.mysife {
  line-height: 0px;
}
.time {
  line-height: 0px;
}
.el-pagination {
  margin-top: 411px;
  text-align: center;
  position: relative;
}
.demonstration {
  opacity: 0.01;
}
.el-message-box__btns {
  border-top: 1px solid #e5e5e5;
  padding: 16px;
}

</style>
