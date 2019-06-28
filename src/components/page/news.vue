<template>
  <div style="margin:15px;">
    <div class="name">
      <div class="name-input">
        <span>新闻标题：</span>
        <input type="text" placeholder="请输入赛事名称">
        <span class="query">查询</span>
        <span class="cancel-bac">取消</span>
        <span @click="addNews" class="add">添加赛事</span>
      </div>
    </div>
    <div class="content">
      <el-card>
        <div class="list">
          <table class="table">
            <thead>
              <tr>
                <th>编号</th>
                <th>名称</th>
                <th>链接</th>
                <th>添加时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody class="contents">
              <tr>
                <td>01</td>
                <td>少年映像 | 黄克强：梦想若飞蛾扑火，何惧时光蹉...</td>
                <td>http://www.baidu.com</td>
                <td>2019-4-30 16：10:10</td>
                <td class="look">
                  <a href>查看详情</a> 编辑 删除
                </td>
              </tr>
              <tr>
                <td>01</td>
                <td>少年映像 | 黄克强：梦想若飞蛾扑火，何惧时光蹉...</td>
                <td>http://www.baidu.com</td>
                <td>2019-4-30 16：10:10</td>
                <td class="look">
                  <a href>查看详情</a> 编辑 删除
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </el-card>
    </div>
    <!-- 添加赛事弹框 -->
    <div v-show="isPerformerShow">
      <div class="elastic" style="z-index: 2011;">
        <div class="border-bott">
          <span class="addmatch">添加赛事</span>
          <span @click="closeCoverUploadDialog" class="icon">×</span>
        </div>
        <div class="content-news">
          <span class="must">*</span>
          <span class="news">赛事标题 :</span>
          <input class="butto" type="text" placeholder="请输入赛事标题">
        </div>
        <div class="content-news">
          <span class="must">*</span>
          <span class="news">跳转链接 :</span>
          <input class="butto" type="text" placeholder="请输入跳转链接">
        </div>
        <div class="content-news">
          <span class="must"></span>
          <span class="news">备注说明 :</span>
          <!-- <input class="entering" type="text" placeholder="请输入赛事名称"> -->
          <textarea class="entering" cols="330" rows="81" placeholder="请输入备注说明"></textarea>
        </div>
        <div class="content-top">
          <span class="must">*</span>
          <span class="news">图片上传 :</span>
          <input class="butto" type="file" @change="onCoverPortraitNews">
          <input class="gitup">
          <img class="gitup-img" src="../../assets/images/goup.png" alt>
          <span class="font">上传文件</span>
          <p class="Jurisdiction">支持扩展名：.doc .docx .pdf .jpg...</p>
          <div class="coversNews">
            <img class="content-imgs" :src="coverFilePortraitNews" @click="choiceCover" alt>
          </div>

          <div class="footer">
            <span class="abolish">取消</span>
            <span class="determine">确定</span>
          </div>
        </div>
      </div>
      <div class="modal" style="z-index: 2010;"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPerformerShow: false,
      coverFilePortraitNews: ""
    };
  },
  methods: {
    // 点击显示弹窗
    addNews() {
      console.log("点击了");
      this.isPerformerShow = true;
    },
    // 关闭上传封面弹窗
    closeCoverUploadDialog() {
      this.isPerformerShow = false;
    },
    // 上传封面
    onCoverPortraitNews(e) {
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
          _this.coverFilePortraitNews = this.result;
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
/* 弹窗 */
.footer {
  border-top: 1px solid #e5e5e5;
  margin-top: 10px;
}
.abolish {
  height: 28px;
  width: 74px;
  position: absolute;
  line-height: 28px;
  background: rgba(230, 230, 230, 1);
  border-radius: 2px;
  margin-left: 70px;
  text-align: center;
  color: #666666;
  font-size: 7px;
  margin-top: 10px;
  margin-left: 407px;
  cursor: pointer;
}
.determine {
  height: 28px;
  width: 74px;
  position: absolute;
  line-height: 28px;
  background: #1890ff;
  border-radius: 2px;
  text-align: center;
  color: #fff;
  font-size: 7px;
  margin-top: 10px;
  margin-left: 495px;
  cursor: pointer;
}
.elastic {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 599px;
  height: 510px;
  background: #fff;
  margin: 40px auto;
  border-radius: 2px;
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}
.addmatch {
  font-size: 7px;
  position: absolute;
  margin-top: 16px;
  margin-left: 48px;
}
.icon {
  float: right;
  font-size: 23px;
  margin-top: 8px;
  margin-right: 48px;
  font-weight: 100;
  color: #ccc;
  cursor: pointer;
}
.border-bott {
  height: 48px;
  border-bottom: 1px solid #e5e5e5;
}
.content-news .must {
  color: red;
  font-size: 7px;
  margin-left: 53px;
}
.content-news .news {
  font-size: 7px;
  color: #333333;
  margin-left: 3px;
  font-weight: 400;
}
.content-news .butto {
  margin-left: 18px;
  padding-left: 6px;
  height: 23px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  width: 204px;
}
.content-news {
  margin-top: 21px;
}
.content-news .entering {
  margin-left: 18px;
  padding-left: 6px;
  height: 81px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  width: 330px;
  resize: none;
  position: absolute;
  font-family: -webkit-body;
}
.content-top {
  margin-top: 88px;
}
.content-top .must {
  color: red;
  font-size: 7px;
  margin-left: 53px;
}
.content-top .news {
  font-size: 7px;
  color: #333333;
  margin-left: 3px;
  font-weight: 400;
}
.content-top .butto {
  margin-left: 18px;
  padding-left: 6px;
  height: 23px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  width: 204px;
  opacity: 0.01;
}
.content-top .gitup {
  margin-left: 18px;
  padding-left: 6px;
  height: 23px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  width: 204px;
  width: 132px;
  margin-left: -212px;
}
.content-top .gitup-img {
  margin-left: -109px;
  margin-bottom: -2px;
}
.content-top .font {
  font-size: 7px;
  color: #666666;
  margin-left: 10px;
}
.content-top .Jurisdiction {
  font-size: 7px;
  font-weight: 400;
  color: #999999;
  margin-left: 134px;
}
.content-top .content-img {
  margin-left: 134px;
  width: 151px;
  height: 98px;
}
/* 内容 */
.name i {
  height: 100px;
  position: absolute;
  margin-top: 24px;
  margin-left: 48px;
}

.name-input {
  height: 80px;
  background: #fff;
  border-radius: 2px;
}
.name-input {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 75px;
  padding-left: 24px;
  margin-bottom: 15px;
}
.name-input input {
  padding-left: 6px;
  height: 23px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.name-input .query {
  height: 28px;
  width: 74px;
  background: #ccc;
  position: absolute;
  line-height: 28px;
  margin-top: 22px;
  background: rgba(24, 144, 255, 1);
  border-radius: 2px;
  margin-left: 48px;
  text-align: center;
  color: #fff;
}

.cancel-bac {
  height: 28px;
  width: 74px;
  background: #ccc;
  position: absolute;
  line-height: 28px;
  margin-top: 22px;
  background: rgba(230, 230, 230, 1);
  border-radius: 2px;
  margin-left: 153px;
  text-align: center;
  color: #666666;
}
.add {
  height: 28px;
  width: 102px;
  background: #ccc;
  position: absolute;
  line-height: 28px;
  margin-top: 22px;
  background: rgba(24, 144, 255, 1);
  border-radius: 2px;
  margin-left: 630px;
  text-align: center;
  color: #fff;
  float: right;
}
.table {
  width: 100%;
  max-width: 100%;
  background: #ebebeb;
  border-spacing: 0;
}
.table > thead > tr > th {
  text-align: left !important;
  border: none;
  color: #333333;
  font-weight: 400;
  padding: 18px;
  font-size: 12px;
}
.contents {
  width: 100%;
  max-width: 100%;
  border-spacing: 0;
  background: #fff;
}
.contents > tr > td {
  font-size: 12px;
  padding: 18px;
  text-align: left !important;
  border-bottom: 1px solid #e6e6e6;
}
.look {
  color: #1890ff;
}
a {
  text-decoration: none;
  color: #1890ff;
}
.coversNews {
  border: 1px solid #ccc;
  width: 137px;
  height: 82px;
  margin-left: 134px;
 
}
.content-imgs {
  width: 137px;
  height: 82px;
  object-fit: cover;
}
</style>
