<template>
  <el-card style="margin:15px;">
    <div class="details">
      <ul>
        <li>
          <el-button type="text">
            <div @click="addHomePage" class="upload">+ 添加</div>
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
              <span class="write">编辑</span>
              <span class="division">下架</span>
              <span class="division">删除</span>
              <span class="division">置顶</span>
            </div>
          </div>
        </li>
      </ul>
      <!-- 添加赛事弹窗 -->
      <div v-show="isMatchShowHomePage">
        <div class="elastic" style="z-index: 2011;">
          <div class="border-bott">
            <span class="addmatch">添加赛事</span>
            <span @click="closeCoverUpHomePage" class="icon">×</span>
          </div>
          <div class="content-news">
            <span class="must" style="margin-left:45px;">*</span>
            <span class="news" style="margin-left:2px;">banner标题 :</span>
            <input class="butto" type="text" placeholder="请输入赛事标题">
          </div>
          <div class="content-news">
            <span class="must">*</span>
            <span class="news">  跳转链接 :</span>
            <input class="butto" type="text" placeholder="请输入跳转链接">
          </div>
          <div class="content-news">
            <span class="must"></span>
            <span class="news" style="margin-left:11px;">备注说明 :</span>
            <!-- <input class="entering" type="text" placeholder="请输入赛事名称"> -->
            <textarea class="entering" cols="330" rows="81" placeholder="请输入备注说明"></textarea>
          </div>
          <div class="content-top">
            <span class="must">*</span>
            <span class="news">图片上传 :</span>
            <input class="butto" type="file"  @change="onCoverPortraitHomePage">
            <input class="gitup">
            <img class="gitup-img" src="../../assets/images/goup.png" alt>
            <span class="font">上传文件</span>
            <p class="Jurisdiction">支持扩展名：.doc .docx .pdf .jpg...</p>
            <div class="coverHomePage">
              <img class="contentHomePage" :src="coverFilePortraitHomePage" @click="choiceCover" alt>
            </div>

            <div class="footer">
              <span class="abolish">取消</span>
              <span class="determine">确定</span>
            </div>
          </div>
        </div>
        <div class="modal" style="z-index: 2010;"></div>
      </div>
      <!-- 赛事弹窗结束 -->
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      isMatchShowHomePage: false,
      coverFilePortraitHomePage:''
    };
  },
  methods: {
    addHomePage() {
      this.isMatchShowHomePage = true;
    },
    // 关闭弹窗
    closeCoverUpHomePage() {
      this.isMatchShowHomePage = false;
    },
      // 上传封面
    onCoverPortraitHomePage(e) {
      let _file = e.target.files[0];
      // 判断文件大小是否超出限制
      if (_file.size > 1024 * 1024) {
        this.$refs.videoElem.value = "";
        this.toast = this.$createToast({
          time: 2000,
          txt: "文件大小超过1M",
          type: "txt"
        });
        this.toast.show();
        return false;
      } else {
        this.cover = _file;
        let _this = this;
        if (!e || !window.FileReader) {
          return;
        } // 看支持不支持FileReader
        let reader = new FileReader();
        reader.readAsDataURL(_file);
        reader.onloadend = function() {
          _this.coverFilePortraitHomePage = this.result;
        };
      }
    },
      choiceCover() {
      console.log("点击了上传视频");
      this.$refs.choiceCoverElem.dispatchEvent(new MouseEvent("click"));
    }
  }
};
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
  background: #e0e0e0;
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
  cursor: pointer;
}
.write {
  cursor: pointer;
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
.coverHomePage {
  border: 1px solid #ccc;
  width: 137px;
  height: 82px;
  margin-left: 134px;
}
.contentHomePage {
  width: 137px;
  height: 82px;
  object-fit: cover;
}
</style>
