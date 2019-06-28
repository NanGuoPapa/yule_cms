<template>
  <div>
    <!-- 头部 -->
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
    <!-- 热门作品 -->
    <div class="hots-work">
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">热门作品 (选填)</p>
        </div>
      </div>
      <img class="cover-all" alt>
      <div class="add-back" @click="artistCoverHot">
        <span class="add-picter">+</span>
        <span class="add-picter">添加</span>
      </div>
    </div>
    <!-- 出席活动 -->
    <div class="hots-work">
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">出席活动 (选填)</p>
        </div>
      </div>
      <img class="attend-cover" alt>
      <div class="attend" @click="artistCoverHotPicter">
        <span class="attend-active">+</span>
        <span class="attend-active">添加</span>
      </div>
    </div>
    <!-- 保存 -->
    <div class="keep">
      <span class="keep-works">保存</span>
    </div>
    <div class="explains">
      <p class="tiansins">copyright 2019 北京天率科技有限公司出品</p>
    </div>
    <!-- 添加热门作品封面弹窗 -->
    <div v-show="isPerformerShowHot">
      <div class="elastic" style="z-index: 2011;">
        <div class="border-bott">
          <span class="addmatch">添加热门作品</span>
          <span @click="closeCoverUpHot" class="icon">×</span>
        </div>
        <div class="content-news">
          <span class="must">*</span>
          <span class="news">作品名称 :</span>
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
          <span class="news">上传文件 :</span>
          <input class="butto" type="file" @change="onCoverHot">

          <input class="gitup">
          <img class="gitup-img" src="../../assets/images/goup.png" alt>
          <span class="font">上传封面</span>
          <input class="buttos" type="file" @change="onCoverHots">
          <input class="gitups">
          <img class="gitup-imgs" src="../../assets/images/goup.png" alt>
          <span class="fonts">上传视频</span>
          <p class="Jurisdiction">支持扩展名：.doc .docx .pdf .jpg...</p>
          <p class="Jurisdictions">支持扩展名：.doc .docx .pdf .jpg...</p>
          <span class="cover-small">尺寸：400*600px</span>
          <span class="video-small">尺寸：400*600px</span>
          <div class="cover-picter">
            <img class="coverhots" :src="coverFileHot" @click="choiceCover" alt>
          </div>
          <div class="cover-picters">
            <img class="coverhot" :src="coverFileHots" @click="choiceCover" alt>
          </div>
          <div class="footer">
            <span class="abolish">取消</span>
            <span class="determine">确定</span>
          </div>
        </div>
      </div>

      <div class="modal" style="z-index: 2010;"></div>
    </div>
    <!-- 结束 -->
    <!-- 添加出席活动弹窗 -->
    <div v-show="isPerformerShowHotPicter">
      <div class="elastic" style="z-index: 2011;">
        <div class="border-bott">
          <span class="addmatch">添加出席活动</span>
          <span @click="closeCoverUpHotPicter" class="icon">×</span>
        </div>
        <div class="content-news">
          <span class="must">*</span>
          <span class="news">活动标题 :</span>
          <input class="butto" type="text" placeholder="请输入活动标题">
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
          <input class="butto" type="file" @change="onCoverPortrait">
          <input class="gitup">
          <img class="gitup-img" src="../../assets/images/goup.png" alt>
          <span class="font">上传文件</span>
          <p class="Jurisdiction">支持扩展名：.doc .docx .pdf .jpg...</p>
          <div class="content-pict">
            <img class="pict" :src="coverFilePortrait" @click="choiceCover" alt>
          </div>
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
      isPerformerShowHot: false,
      isPerformerShowHotPicter: false,
      coverFilePortrait: "",
      coverFileHot: "",  //封面
      coverFileHots: ""  //视频
    };
  },
  methods: {
    // 点击显示弹窗
    artistCoverHot() {
      this.isPerformerShowHot = true;
    },
    // 关闭上传封面弹窗
    closeCoverUpHot() {
      this.isPerformerShowHot = false;
    },
    // 点击显示弹窗
    artistCoverHotPicter() {
      this.isPerformerShowHotPicter = true;
    },
    // 关闭上传封面弹窗
    closeCoverUpHotPicter() {
      this.isPerformerShowHotPicter = false;
    },
    // 上传出席活动封面
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
    // 上传热门作品视频
    onCoverHots(e) {
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
          _this.coverFileHots = this.result;
        };
      }
    },
    // 上传热门作品封面
    onCoverHot(e) {
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
          _this.coverFileHot = this.result;
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
.hots-work {
  background: #fff;
  border-radius: 2px;
  width: 98%;
  margin: 12px;
  padding-bottom: 24px;
}
.keep {
  width: 74px;
  height: 28px;
  background: #1890ff;
  border-radius: 2px;
  margin: auto;
  margin-top: 48px;
  cursor: pointer;
}
.keep-works {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #fff;
  line-height: 28px;
  margin-left: 26px;
}
.explains {
  text-align: center;
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 15px;
}
.tiansins {
  padding-bottom: 20px;
}
.add-back {
  cursor: pointer;
}
.attend-active {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(217, 217, 217, 1);
  display: -webkit-inline-box;
  margin-top: 40px;
}
.attend-cover {
  width: 135px;
  height: 101px;
  border-radius: 2px;
  text-align: center;
  object-fit: cover;
  position: absolute;
  margin-left: -66px;
  margin-top: 58px;
}
.attend {
  width: 135px;
  height: 101px;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius: 2px;
  margin-top: 14px;
  margin-left: 52px;
  text-align: center;
  cursor: pointer;
}
.content-pict {
  margin-left: 134px;
  width: 137px;
  height: 82px;
  border: 1px solid #ccc;
}
.pict {
  width: 137px;
  height: 82px;
  object-fit: cover;
}
.gitups {
  padding-left: 6px;
  height: 23px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  width: 204px;
  width: 132px;
  margin-left: 116px;
}
.fonts {
  font-size: 7px;
  color: #666666;
  padding-left: 10px;
}
.gitup-imgs {
  margin-left: -102px;
}
.Jurisdictions {
  font-size: 7px;
  font-weight: 400;
  color: #999999;
  margin-top: -27px;
  margin-left: 353px;
}
.cover-small {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 21px;
  margin-left: 133px;
}
.video-small {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 21px;
  margin-left: 123px;
}
.cover-picter {
  margin-left: 134px;
  width: 71px;
  height: 106px;
  border: 1px solid #ccc;
}
.coverhots {
  width: 71px;
  height: 106px;
  object-fit: cover;
}
.cover-picters {
  margin-left: 354px;
  width: 71px;
  height: 106px;
  border: 1px solid #ccc;
  margin-top: -108px;
}
.coverhot {
  width: 71px;
  height: 106px;
  object-fit: cover;
}
.buttos {
  position: absolute;
  margin-left: 158px;
  opacity: 0;
}
</style>
