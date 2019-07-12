<template>
  <el-card style="margin:15px;">
    <div class="details" name="myComponent">
      <ul>
        <li>
          <el-button type="text">
            <div @click="addHomePage(0)" class="upload">+ 添加</div>
          </el-button>
        </li>
        <li v-for="(item,_index) in bannerList" :key="_index.id">
          <div class="details-news">
            <div class="img">
              <img class="head-img" :src="item.cover_link" alt>
            </div>
            <div class="details-font">
              <h1 class="font">{{item.title}}</h1>
              <span class="mysife">{{item.remarks}}</span>
              <p class="time">{{item.ctime | formatDate}}</p>
            </div>
            <div class="edit">
              <span class="write" @click="addHomePage(item.id)">编辑</span>
              <span class="division" v-if="item.banner_status=='1'" @click="bannerStatus(item.id,0)">下架</span>
              <span class="division" v-if="item.banner_status=='0'" @click="bannerStatus(item.id,1)">上架</span>
              <span class="division" @click="bannerDel(item.id,_index)">删除</span>
              <span class="division" @click="bannerTop(item.id)">置顶</span>
            </div>
          </div>
        </li>
      </ul>
      <!-- 添加赛事弹窗 -->
      <div v-show="isMatchShowHomePage">
        <div class="elastic" style="z-index: 2011;">
          <div class="border-bott">
            <span class="addmatch">{{topic}}</span>
            <span @click="closeCoverUpHomePage" class="icon">×</span>
          </div>
          <input type='hidden' v-model="banner_id">
          <div class="content-news">
            <span class="must" style="margin-left:45px;">*</span>
            <span class="news" style="margin-left:2px;">banner标题 :</span>
            <input class="butto" type="text" v-model="title" placeholder="请输入赛事标题">
            <span class="tip">{{msgtitle}}</span>
          </div>
          <div class="content-news">
            <span class="must">*</span>
            <span class="news">  跳转链接 :</span>
            <input class="butto" type="text" v-model="jump_link" placeholder="请输入跳转链接">
            <span class="tip">{{msgjump_link}}</span>
          </div>
          <div class="content-news">
            <span class="must"></span>
            <span class="news" style="margin-left:11px;">备注说明 :</span>
            <textarea class="entering" cols="330" rows="81" v-model="remarks" placeholder="请输入备注说明"></textarea>
            <span class="tip">{{msgremarks}}</span>
          </div>
          <div class="content-top">
            <span class="must">*</span>
            <span class="news">图片上传 :</span>
            <input
              class="butto"
              type="file"
              ref="cover_link"
              @change="onCoverPortraitHomePage"
              accept="image/*"
            >
            <input class="gitup">
            <img class="gitup-img" src="../../assets/images/goup.png" alt>
            <span class="font">上传文件</span>
            <p class="Jurisdiction">支持扩展名：.doc .docx .pdf .jpg...</p>
            <div class="coverHomePage">
              <img class="contentHomePage" :src="coverFilePortraitHomePage" @click="choiceCover" alt>
            </div>
            <span class="tip_file">{{upload_file}}</span>
            <div class="footer">
              <span class="abolish" @click="closeCoverUpHomePage">取消</span>
              <span class="determine" @click="submitSave">确定</span>
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
  inject: ['reload'],
  data () {
    return {
      bannerList: [],
      isMatchShowHomePage: false,
      coverFilePortraitHomePage: '',
      title: '',
      msgtitle: '',
      jump_link: '',
      msgjump_link: '',
      remarks: '',
      msgremarks: '',
      cover: null,
      file: '',
      topic: '',
      banner_id: '',
      upload_file: ''
    }
  },
  filters: {
    formatDate: function (value) {
      value *= 1000
      let date = new Date(value)
      // 注意对方给你的是毫秒还是秒，如果是毫秒需要转秒（*1000）
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  },
  methods: {
    async default () {
      let formData = new FormData()

      formData.append('banner_type', 3)
      this.$http
        .request({
          url: 'actionBannerListApi',
          method: 'post',
          data: formData
        })
        .then(res => {
          if (res.data.code === 200) {
            this.bannerList = res.data.data
          }
        })
    },
    addHomePage (banner_id) {
      this.isMatchShowHomePage = true
      if (banner_id == '0') { // 添加banner
        this.topic = '添加banner'
        this.banner_id = ''
        this.title = ''
        this.jump_link = ''
        this.remarks = ''
        this.coverFilePortraitHomePage = ''
      } else { // 编辑banner
        this.topic = '编辑banner'
        this.banner_id = banner_id
        let formData = new FormData()
        formData.append('banner_id', banner_id)
        this.$http
          .request({
            url: 'actionBannerDetailsApi',
            method: 'post',
            data: formData
          })
          .then(res => {
            if (res.data.code === 200) {
              this.title = res.data.data.title
              this.jump_link = res.data.data.jump_link
              this.remarks = res.data.data.remarks
              this.coverFilePortraitHomePage = res.data.data.cover_link
            }
          })
      }
    },
    // 关闭弹窗
    closeCoverUpHomePage () {
      this.isMatchShowHomePage = false
    },
    // 上传封面
    onCoverPortraitHomePage (e) {
      let _file = e.target.files[0]
      // 判断文件大小是否超出限制
      if (_file.size > 1024 * 1024) {
        this.$refs.videoElem.value = ''
        this.toast = this.$createToast({
          time: 2000,
          txt: '文件大小超过1M',
          type: 'txt'
        })
      } else {
        this.cover = _file
        let _this = this
        if (!e || !window.FileReader) {
          return
        } // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(_file)
        reader.onloadend = function () {
          _this.coverFilePortraitHomePage = this.result
        }
      }
    },
    choiceCover () {
      this.$refs.choiceCoverElem.dispatchEvent(new MouseEvent('click'))
    },

    bannerDel (banner_id, _index) { // banner 删除
      let msg = '您确定要删除吗?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 这里加个 async，可以查下相关文档 async...await
        let formData = new FormData()
        formData.append('banner_id', banner_id)
        this.$http
          .request({
            url: 'actionBannerDelApi ',
            method: 'post',
            data: formData
          })
          .then(res => {
            this.isCoverUploadDialogShow = false
            if (res.data.code === 200) {
              this.$message({
                message: '恭喜你，删除成功',
                type: 'success'
              })
              this.bannerList.splice(_index, 1)
            } else {
              this.$message.error('请联系管理员，删除失败')
            }
          })
      }).catch(() => {
        console.log('cancel')
      })
    },
    bannerTop (banner_id) { // 置顶
      let msg = '您确定要置顶吗?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 这里加个 async，可以查下相关文档 async...await
        let formData = new FormData()
        formData.append('banner_id', banner_id)
        this.$http
          .request({
            url: 'actionBannerTopping ',
            method: 'post',
            data: formData
          })
          .then(res => {
            this.isCoverUploadDialogShow = false
            if (res.data.code === 200) {
              this.$message({
                message: '恭喜你，置顶成功',
                type: 'success'
              })
              this.reload()
            } else {
              this.$message.error('请联系管理员，置顶失败')
            }
          })
      }).catch(() => {
        console.log('cancel')
      })
    },

    bannerStatus (banner_id, banner_status) { // 上架和下架
      if (banner_status == '1') {
        var txt = '确定要上架该Banner吗?'
      } else {
        var txt = '确定要下架该Banner吗?'
      }
      this.$confirm(txt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 这里加个 async，可以查下相关文档 async...await
        let formData = new FormData()
        formData.append('banner_status', banner_status)
        formData.append('banner_id', banner_id)
        this.$http
          .request({
            url: 'actionBannerStatusApi',
            method: 'post',
            data: formData
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '恭喜你，操作成功',
                type: 'success'
              })
              this.reload()
            } else {
              this.$message.error('请联系管理员，操作失败')
            }
          })
      }).catch(() => {
        console.log('cancel')
      })
    },
    submitSave () { // 点击确认按钮时进行信息验证
      if (!this.title) {
        this.msgtitle = '请填写标题'
        return false
      } else {
        this.msgtitle = ''
      }
      if (!this.jump_link) {
        this.msgjump_link = '请填写链接地址'
        return false
      } else {
        this.msgjump_link = ''
      }
      if (!this.remarks) {
        this.msgremarks = '请填写备注说明'
        return false
      } else {
        this.msgremarks = ''
      }
      if (!this.coverFilePortraitHomePage) {
        this.upload_file = '请上传文件'
        return false
      } else {
        this.upload_file = ''
      }
      let msg = '确定要提交吗?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 这里加个 async，可以查下相关文档 async...await
        let formData = new FormData()
        formData.append('banner_id', this.banner_id)
        formData.append('title', this.title)
        formData.append('jump_link', this.jump_link)
        formData.append('remarks', this.remarks)
        formData.append('picfile', this.cover)
        formData.append('banner_type', 3)
        this.$http
          .request({
            url: 'actionBannerSaveApi',
            method: 'post',
            data: formData
          })
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              this.$message({
                message: '恭喜你，操作成功',
                type: 'success'
              })
              this.reload()
            } else {
              this.$message.error('请联系管理员，操作失败')
            }
          })
      }).catch(() => {
        console.log('cancel')
      })
    }
  },
  mounted () {
    this.default()
  }
}
</script>
<style>
  .tip {
    color: red;
    font-size: 12px;
    position: relative;
    float: right;
    right: 30px;
    margin-top: 4px;
  }

  .tip_file {
    color: red;
    font-size: 12px;
    position: relative;
    float: right;
    right: 30px;
    margin-top: -16px;
  }

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
  .el-message-box__wrapper{
    z-index: 2013 !important;
  }
  .v-modal{
    z-index: 2011 !important;
  }
  .el-message-box__message p {
    text-align: left !important;
  }

  .el-message-box {
    width: 800px;
    height: 128px !important;
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
