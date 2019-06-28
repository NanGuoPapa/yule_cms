<template>
  <!-- 添加艺人页面 -->
  <div>
    <!-- 介绍 -->
    <div class="introduce">
      <span>艺人/所有艺人/</span>
      <span class="addpep">添加艺人</span>
      <p>添加艺人</p>
      <span>
        填写艺人基本信息，上传艺人写真、热门作品、经历等相关内容，带“
        <span
          class="xing"
          style="color:red"
        >*&nbsp;&nbsp;&nbsp;&nbsp;</span>”号标记为必填项
      </span>
    </div>
    <!-- 基本信息 -->
    <div class="information">
      <div class="information-title">
        <span class="must-fill">*</span>
        <p class="information-news">基本信息</p>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">姓名</p>
          <input class="basic-input" type="text" placeholder="请输入姓名">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">类型</p>
          <input class="basic-input" type="text" placeholder="请输入艺人类型">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">简介</p>
          <input class="basic-input" type="text" placeholder="请输入艺人简介">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">视频类型</p>
          <input class="basic-input" type="text" placeholder="请输入艺人作品视频类型">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">年龄</p>
          <input class="basic-input" type="text" placeholder="请输入艺人年龄">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">生日</p>
          <input class="basic-input" type="text" placeholder="请输入艺人生日">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">身高</p>
          <input class="basic-input" type="text" placeholder="请输入艺人身高">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">体重</p>
          <input class="basic-input" type="text" placeholder="请输入艺人体重">
        </div>
      </div>
    </div>
    <!-- 联系方式 -->
    <div class="information">
      <div class="information-title">
        <span class="must-fill">*</span>
        <p class="information-news">联系方式</p>
      </div>
      <div class="contact">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">微博名称</p>
          <input class="basic-input" type="text" placeholder="请输入微博名称">
        </div>
      </div>
      <div class="contact">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">微博链接</p>
          <input class="basic-input" type="text" placeholder="请输入微博链接">
        </div>
      </div>
      <div class="contact">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">平台名称</p>
          <input class="basic-input" type="text" placeholder="请输入平台名称">
        </div>
      </div>
      <div class="contact">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">平台链接</p>
          <input class="basic-input" type="text" placeholder="请选平台链接">
        </div>
      </div>
      <div class="add-input">
        <span class="add-contact">添加</span>
      </div>
    </div>
    <!-- 照片和写真 -->
    <div class="information">
      <div class="information-title">
        <span class="must-fill">*</span>
        <p class="information-news">照片和写真</p>
      </div>
      <!-- 艺人首页展示 -->
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">艺人首页展示</p>
        </div>
      </div>
      <div class="add-back" :show-file-list="false">
        <img class="cover-works" :src="coverFileReader" @click="choiceCover" alt>
        <input
          class="cover"
          type="file"
          ref="choiceCoverElem"
          @change="onCoverChange"
          accept="image/*"
        >
        <span class="add-picter">+</span>
        <span class="add-picter">添加</span>
      </div>
      <!-- 艺人封面 -->
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">艺人封面</p>
        </div>
      </div>
      <div class="add-artist" :show-file-list="false" >
        <img class="cover-artist" :src="coverFileArtist" @click="choiceCover" alt>
        <input
          class="cover"
          type="file"
          ref="choiceCoverElem"
          @change="onCoverArtist"
          accept="image/*"
        >
        <span class="artist-addto">+</span>
        <span class="artist-addto">添加</span>
      </div>
   
      <!-- 艺人写真 -->
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">艺人写真</p>
        </div>
      </div>
      <img class="cover-all" :src="coverFilePortrait" @click="choiceCover" alt>
      <div class="add-back" :show-file-list="false">
        <input
          class="cover"
          type="file"
          ref="choiceCoverElem"
          @change="onCoverPortrait"
          accept="image/*"
        >
        <span class="add-picter">+</span>
        <span class="add-picter">添加</span>
      </div>
    </div>
    <!-- 获奖经历结束 -->
    <div class="award">
      <div class="information-title">
        <span class="must-fill"></span>
        <p class="information-news">获奖经历(选填)</p>
      </div>
      <div>
        <p class="award-past">获奖经历 :</p>
        <input class="award-input" type="text" placeholder="请输入获奖经历（如：2018 抖音嘉年华人气主播冠军）">
        <p class="award-past">获奖经历 :</p>
        <input class="award-input" type="text" placeholder="请输入获奖经历（如：2019 《音为校园》原唱赛道第一名））">
        <div class="add-award">
          <span class="award-button">添加</span>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <router-link to="/HotWorks" v-if="true">
      <div class="footers">
        <span class="footer-preserve">保存并下一步</span>
      </div>
    </router-link>
    <div class="explain">
      <span>帮助</span>
      <span class="privacy">隐藏</span>
      <span>条款</span>
      <p class="tiansin">copyright 2019 北京天率科技有限公司出品</p>
    </div>
    <!-- 添加艺人封面弹窗 -->
    <div v-show="isPerformerShow">
      <div class="elastic" style="z-index: 2011;">
        <div class="border-bott">
          <span class="addmatch">添加艺人封面</span>
          <span @click="closeCoverUpActor" class="icon">×</span>
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
          <textarea class="entering" cols="330" rows="81" placeholder="请输入备注信息"></textarea>
        </div>
        <div class="content-top">
          <span class="must">*</span>
          <span class="news">图片上传 :</span>
          <input class="butto" type="file">
          <input class="gitup">
          <img class="gitup-img" src="../../assets/images/goup.png" alt>
          <span class="font">上传文件</span>
          <p class="Jurisdiction">支持扩展名：.doc .docx .pdf .jpg...</p>
          <img class="content-img" src="../../assets/images/img.png" alt>
          <div class="footer">
            <span class="abolish">取消</span>
            <span class="determine">确定</span>
          </div>
        </div>
      </div>

      <div class="modal" style="z-index: 2010;"></div>
    </div>
    <!-- 结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      coverFileReader: "",
      coverFileArtist: "",
      coverFilePortrait: "",
      isPerformerShow: false
    };
  },
  methods: {

    onCoverChange(e) {
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
          _this.coverFileReader = this.result;
        };
      }
    },
    onCoverArtist(e) {
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
          _this.coverFileArtist = this.result;
        };
      }
    },
    onCoverPortrait(e) {
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
          _this.coverFilePortrait = this.result;
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
.inp {
  height: 10px;
}
.introduce {
  height: 94px;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  margin-left: 1px;
}
.introduce span {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #999999;
  margin-left: 15px;
}
.introduce .addpep {
  color: #333333;
}
.introduce p {
  font-size: 10px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin-left: 15px;
}
.information {
  background: #fff;
  border-radius: 2px;
  width: 98%;
  margin: 12px;
  padding-bottom: 24px;
}
.information-title {
  font-size: 8px;
  font-family: MicrosoftYaHei;
  font-weight: 800;
  height: 66px;
  border-bottom: 1px solid #e6e6e6;
}
.information-news {
  display: inline;
  line-height: 66px;
  color: #333333;
}
.must-fill {
  color: #ff0000;
  padding-left: 24px;
  padding-right: 3px;
}
.basic-name {
  display: inline;
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 600;
}
.basic-fill {
  color: #ff0000;
  padding-left: 48px;
  padding-right: 3px;
  font-size: 7px;
}
.basic-big {
  margin-top: 22px;
}
.basic-input {
  display: block;
  width: 160px;
  height: 20px;
  border: 1px solid #e5e9ed;
  background: #ffffff;
  padding-left: 10px;
  color: #666666;
  border-radius: 4px;
  font-size: 6px;
  margin-top: 10px;
  margin-left: 48px;
}
.basic {
  width: 24%;
  display: inline-block;
}
.contact {
  width: 34%;
  display: inline-block;
}
.add-input {
  display: -webkit-inline-box;
  width: 58px;
  height: 24px;
  background: rgba(230, 230, 230, 1);
  border-radius: 2px;
  margin-left: -96px;
}
.add-contact {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 21px;
  margin-left: 18px;
}
.cover-works {
  width: 97px;
  height: 146px;
  border-radius: 2px;
  text-align: center;
  object-fit: cover;
  position: absolute;
  margin-left: -32px;
}
.add-back {
  width: 97px;
  height: 146px;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius: 2px;
  margin-top: 14px;
  margin-left: 52px;
  text-align: center;
}
.cover {
  opacity: 0;
  margin-top: 58px;
  margin-left: -17px;
  position: absolute;
}
.add-picter {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(217, 217, 217, 1);
  display: -webkit-inline-box;
  margin-top: 63px;
}
.add-artist {
  width: 346px;
  height: 105px;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius: 2px;
  margin-top: 14px;
  margin-left: 52px;
  text-align: center;
  cursor: pointer;
}
.cover-artist {
  width: 346px;
  height: 105px;
  border-radius: 2px;
  text-align: center;
  object-fit: cover;
  position: absolute;
  margin-left: -156px;
}
.artist-addto {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(217, 217, 217, 1);
  margin-top: 50px;
  display: -webkit-inline-box;
}
.cover-all {
  width: 97px;
  height: 146px;
  border-radius: 2px;
  text-align: center;
  object-fit: cover;
  position: absolute;
  margin-left: -66px;
  margin-top: 58px;
}
.award {
  background: #fff;
  border-radius: 2px;
  width: 98%;
  margin: 12px;
  padding-bottom: 24px;
}
.award-past {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #333333;
  margin-left: 48px;
  margin-top: 22px;
}
.award-input {
  display: block;
  width: 735px;
  height: 20px;
  border: 1px solid #e5e9ed;
  background: #ffffff;
  padding-left: 10px;
  color: #666666;
  border-radius: 2px;
  font-size: 6px;
  margin-top: 10px;
  margin-left: 48px;
}
.add-award {
  width: 74px;
  background: rgba(230, 230, 230, 1);
  border-radius: 2px;
  margin: auto;
  margin-top: 22px;
}
.award-button {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 21px;
  padding-left: 25px;
}
.footers {
  width: 132px;
  height: 28px;
  background: #1890ff;
  border-radius: 2px;
  margin: auto;
  margin-top: 48px;
}
.footer-preserve {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #fff;
  line-height: 28px;
  margin-left: 32px;
}
.explain {
  text-align: center;
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 15px;
  margin-top: 48px;
}
.privacy {
  padding: 0px 36px 0px 36px;
}
.tiansin {
  padding-bottom: 48px;
}
</style>
