<template>
  <div style="margin:15px;">
    <div class="name">
      <div class="name-input">
        <span>赛事名称：</span>
        <input type="text" v-model="searchTitle" placeholder="请输入赛事名称">
        <span class="query" @click="search();">查询</span>
        <span class="cancel-bac" @click="cancel">取消</span>
        <span @click="addMatch(0,0)" class="add">添加赛事</span>
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
              <th>赛事类型</th>
              <th>添加时间</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody class="contents">
            <tr v-for="(item,_index) in eventList" :key="_index.id">
              <td>{{item.id}}</td>
              <td>{{item.title}}</td>
              <td>{{item.event_type}}</td>
              <td>{{item.ctime | formatDate}}</td>
              <td class="look">
                <a href="javascript:void(0);">查看详情</a>
                <a href="javascript:void(0);" @click="addMatch(1,item.id)">编辑</a>
                <a href="javascript:void(0);" @click="eventDel(item.id)">删除</a>
              </td>
            </tr>

            </tbody>
          </table>
        </div>
        <!-- 添加弹框 -->
        <div v-show="isMatchShow">
          <div class="elastic" style="z-index: 2011;">
            <div class="border-bott">
              <span class="addmatch">{{topic}}</span>
              <span @click="closeCoverUpMatch" class="icon">×</span>
            </div>
            <input type="hidden" v-model="event_id">
            <div class="content-news">
              <span class="must">*</span>
              <span class="news">赛事标题:</span>
              <input class="butto" v-model="title" type="text" placeholder="请输入赛事标题">
              <span class="tip">{{msgtitle}}</span>
            </div>
            <div class="content-news">
              <span class="must">*</span>
              <span class="news">跳转链接 :</span>
              <input class="butto" v-model="jump_link" type="text" placeholder="请输入跳转链接">
              <span class="tip">{{msgjump_link}}</span>
            </div>
            <div class="content-news">
              <span class="must"></span>
              <span class="news">赛事类型 :</span>
              <input class="butto" v-model="event_type" type="text" placeholder="请输入赛事类型">
              <span class="tip">{{msgevent_type}}</span>
            </div>
            <div class="content-news">
              <span class="must"></span>
              <span class="news">备注说明 :</span>
              <textarea class="entering" v-model="remarks" cols="330" rows="81" placeholder="请输入备注说明"></textarea>
              <span class="tip">{{msgremarks}}</span>
            </div>
            <div class="content-top">
              <span class="must">*</span>
              <span class="news">图片上传 :</span>
              <input class="butto" type="file" @change="onCoverPortraitMatch">
              <input class="gitup">
              <img class="gitup-img" src="../../assets/images/goup.png" alt>
              <span class="font">上传文件</span>
              <p class="Jurisdiction">支持扩展名：.doc .docx .pdf .jpg...</p>
              <div class="coverMatch">
                <img class="contentMatch" :src="coverFilePortraitMatch" @click="choiceCover" alt>
                <span class="tip">{{msgcover_link}}</span>
              </div>

              <div class="footer">
                <span class="abolish" @click="closeCoverUpMatch">取消</span>
                <span class="determine" @click="eventCheck">确定</span>
              </div>
            </div>
          </div>
          <div class="modal" style="z-index: 2010;"></div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  data () {
    return {
      eventList: [],
      topic: '',
      event_id: '',
      title: '',
      msgtitle: '',
      jump_link: '',
      msgjump_link: '',
      remarks: '',
      msgremarks: '',
      cover_link: '',
      event_type: '',
      msgevent_type: '',
      isMatchShow: false,
      coverFilePortraitMatch: ''
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
    // 点击显示弹窗
    addMatch (event_type, event_id) {
      this.isMatchShow = true
      if (event_type == '0') { // 添加
        this.topic = '添加赛事'
        this.title = ''
        this.event_type = ''
        this.jump_link = ''
        this.remarks = ''
        this.coverFilePortraitMatch = ''
        this.event_id = ''
      } else { // 编辑按钮
        this.topic = '编辑赛事'
        this.event_id = event_id
        let formData = new FormData()
        formData.append('event_id', event_id)
        this.$http
          .request({
            url: 'actionEventInfoApi',
            method: 'post',
            data: formData
          })
          .then(res => {
            if (res.data.code === 200) {
              this.title = res.data.data.title
              this.event_type = res.data.data.event_type
              this.jump_link = res.data.data.jump_link
              this.remarks = res.data.data.remarks
              this.coverFilePortraitMatch = res.data.data.cover_link
            }
          })
      }
    },
    // 关闭上传封面弹窗
    closeCoverUpMatch () {
      this.isMatchShow = false
    },
    // 上传封面
    onCoverPortraitMatch (e) {
      let _file = e.target.files[0]
      // 判断文件大小是否超出限制
      if (_file.size > 1024 * 1024) {
        this.$refs.videoElem.value = ''
        alert('文件不可大于1M')
      } else {
        this.cover = _file
        let _this = this
        if (!e || !window.FileReader) {
          return
        } // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(_file)
        reader.onloadend = function () {
          _this.coverFilePortraitMatch = this.result
        }
      }
    },
    choiceCover () {
      this.$refs.choiceCoverElem.dispatchEvent(new MouseEvent('click'))
    },
    default (searchTitle = '') {
      let formData = new FormData()
      formData.append('title', searchTitle)
      this.$http
        .request({
          url: 'actionEventListApi',
          method: 'post',
          data: formData
        })
        .then(res => {
          if (res.data.code === 200) {
            this.eventList = res.data.data.result
          }
        })
    },
    search () {
      if (!this.searchTitle) {
        alert('请填写赛事名称进行搜索')
        return false
      }
      let formData = new FormData()
      formData.append('title', this.searchTitle)
      this.$http
        .request({
          url: 'actionEventListApi',
          method: 'post',
          data: formData
        })
        .then(res => {
          if (res.data.code === 200) {
            this.eventList = res.data.data.result
          }
        })
    },
    cancel () {
      this.searchTitle = ''
      let formData = new FormData()
      this.$http
        .request({
          url: 'actionEventListApi',
          method: 'post',
          data: formData
        })
        .then(res => {
          if (res.data.code === 200) {
            this.eventList = res.data.data.result
          }
        })
    },
    eventDel (event_id) {
      if (confirm('确定要删除吗?')) {
        let formData = new FormData()
        formData.append('event_id', event_id)

        this.$http
          .request({
            url: 'actionEventDelApi',
            method: 'post',
            data: formData
          })
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              alert('操作成功')
              this.reload()
            } else {
              alert('操作失败')
            }
          })
      }
    },
    eventCheck () {
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
      if (!this.event_type) {
        this.msgevent_type = '请填写赛事类型'
        return false
      } else {
        this.msgevent_type = ''
      }
      if (!this.remarks) {
        this.msgremarks = '请填写备注信息'
        return false
      } else {
        this.msgremarks = ''
      }
      if (!this.coverFilePortraitMatch) {
        this.msgcover_link = '请上传文件'
        return false
      } else {
        this.msgcover_link = ''
      }
      if (confirm('确定要提交吗?')) {
        let formData = new FormData()
        formData.append('title', this.title)
        formData.append('jump_link', this.jump_link)
        formData.append('event_type', this.event_type)
        formData.append('remarks', this.remarks)
        formData.append('picfile', this.cover)
        formData.append('event_id', this.event_id)
        this.$http
          .request({
            url: 'actionEventSaveApi',
            method: 'post',
            data: formData
          })
          .then(res => {
            console.log(res)
            if (res.data.code === 200) {
              alert('操作成功')
              this.reload()
            } else {
              alert('操作失败')
            }
          })
      }
    }

  },
  mounted () {
    this.default()
  }
}
</script>

<style>
  /* 弹框 */
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

  /* 弹框结束 */
  .name i {
    height: 100px;
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

  .coverMatch {
    border: 1px solid #ccc;
    width: 137px;
    height: 82px;
    margin-left: 134px;
  }

  .contentMatch {
    width: 137px;
    height: 82px;
    object-fit: cover;
  }
</style>
