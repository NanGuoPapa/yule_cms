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
    <el-card style="margin:15px;">
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">热门作品 (选填)</p>
        </div>
      </div>
      <div class="details" name="myComponent">
        <ul>
          <li>
            <el-button type="text">
              <div style="border: 1px solid rgb(224, 224, 224);" @click="artistCoverHot" class="upload">+ 添加</div>
            </el-button>
          </li>
          <li v-for="(item, index) in WorkList" :key="index" @mouseenter="onMouseover(index,1)" @mouseleave="onMouseout">
            <div class="details-news">
              <div class="img" style="position:relative">
                  <img class="work_img" :src="item.works_cover">
              </div>
                <div class="operation" v-show="seenWork && index === current">
                    <div class="modify" @click="artistCoverHot(item.id)">修改</div>
                    <div class="delete" @click="SaveWorkRemove(item.id, index)">删除</div>
                </div>
            </div>
          </li>
        </ul>
      </div>
    </el-card>
    <!-- 出席活动 -->
    <el-card style="margin:15px;">
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">出席活动 (选填)</p>
        </div>
      </div>
      <div class="details" name="myComponent">
        <ul>
          <li>
            <el-button type="text">
              <div @click="artistCoverHotPicter" class="upload" style="text-align:center;width: 135px;height: 101px; border: 1px solid rgb(224, 224, 224); line-height: 101px;">+ 添加</div>
            </el-button>
          </li>
          <li v-for="(item, index) in EventList" :key="index" @mouseenter="onMouseover(index,2)" @mouseleave="onMouseout">
            <div class="details-news" style="width: 135px;height: 101px;">
              <div class="img" style="position:relative">
                <img class="event_img" :src="item.event_cover">
              </div>
                <div class="eoperation" v-show="seenEvent && index === current">
                    <div class="emodify" @click="artistCoverHotPicter(item.id)">修改</div>
                    <div class="edelete" @click="SaveEventRemove(item.id, index)">删除</div>
                </div>
            </div>
          </li>
        </ul>
      </div>
    </el-card>
    <!-- 保存 -->
    <div class="keep">
        <span class="keep-works" v-if="EventList && WorkList" @click="JumpList">完成</span>
        <span class="keep-works" v-else @click="JumpList">跳过</span>
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
          <input class="butto" type="text" placeholder="请输入作品名称" v-model="WorkDetail.works">
        </div>
        <div class="content-news">
          <span class="must"></span>
          <span class="news">备注说明 :</span>
          <textarea class="entering" cols="330" rows="81" placeholder="请输入备注信息" v-model="WorkDetail.remarks"></textarea>
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
              <video class="coverhot" :src="coverFileHots" @click="choiceCover" alt></video>
          </div>
          <div class="footer">
            <span class="abolish" @click="closeCoverUpHot">取消</span>
            <span class="determine" @click="SaveWorkList">确定</span>
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
          <input class="butto" type="text" placeholder="请输入活动标题" v-model="EventDetail.title">
        </div>
        <div class="content-news">
          <span class="must">*</span>
          <span class="news">跳转链接 :</span>
          <input class="butto" type="text" placeholder="请输入跳转链接" v-model="EventDetail.jump_link">
        </div>
        <div class="content-news">
          <span class="must"></span>
          <span class="news">备注说明 :</span>
          <!-- <input class="entering" type="text" placeholder="请输入赛事名称"> -->
          <textarea class="entering" cols="330" rows="81" placeholder="请输入备注信息" v-model="EventDetail.remarks"></textarea>
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
            <span class="abolish" @click="closeCoverUpHotPicter">取消</span>
            <span class="determine" @click="SaveEventList">确定</span>
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
  data () {
    return {
      artist: 0, // 艺人id
      work: 0, // 热门作品id
      event: 0, // 参加活动id
      WorkList: [], // 艺人热门作品列表
      WorkDetail: [], // 艺人热门作品详情
      EventList: [], // 艺人参加活动列表
      EventDetail: [], // 艺人参加活动详情
      isPerformerShowHot: false,
      isPerformerShowHotPicter: false,
      coverFilePortrait: '', // 活动图片（预览）
      eventPic: '', // 活动封面图文件
      coverFileHot: '', // 封面（预览）
      workPic: '', // 作品封面图文件
      coverFileHots: '', // 视频（预览）
      workVideo: '', // 作品视频文件
      seenWork: false,
      seenEvent: false,
      current: 0 // 控制显示和隐藏
    }
  },
  mounted () {
    this.artist = this.$route.query.artist
    let formData = new FormData()
    formData.append('artist_id', this.artist) // 艺人id
    // 热门作品列表
    this.$axios.request({
      url: 'actionArtistWorkListApi',
      method: 'POST',
      data: formData
    }).then((res) => {
      // 处理请求结果
      this.WorkList = res.data.data // 基本数据
    })
    // 出席活动列表
    this.$axios.request({
      url: 'actionArtistEventListApi',
      method: 'POST',
      data: formData
    }).then((res) => {
      // 处理请求结果
      this.EventList = res.data.data // 基本数据
    })
  },
  methods: {
    // 点击显示弹窗
    artistCoverHot (id) {
      if (id) {
        this.work = id
      }
      this.isPerformerShowHot = true
      this.WorkDetails()
    },
    // 关闭上传封面弹窗
    closeCoverUpHot () {
      this.work = 0
      this.WorkDetail = []
      this.coverFileHot = ''
      this.coverFileHots = ''
      this.isPerformerShowHot = false
    },
    // 热门作品详情
    WorkDetails () {
      let formData = new FormData()
      formData.append('work_id', this.work) // 艺人id
      if (this.work > 0) {
        this.$axios.request({
          url: 'actionArtistWorkDetailsApi',
          method: 'POST',
          data: formData
        }).then((res) => {
          // 处理请求结果
          this.WorkDetail = res.data.data // 基本数据
          this.work = res.data.data.id // 热门作品id
          this.coverFileHot = res.data.data.works_cover // 视频封面
          this.coverFileHots = res.data.data.works_link // 视频文件
        })
      }
    },
    // 点击显示弹窗
    artistCoverHotPicter (id) {
      if (id) {
        this.event = id
      }
      this.isPerformerShowHotPicter = true
      this.EventDetails()
    },
    // 关闭上传封面弹窗
    closeCoverUpHotPicter () {
      this.event = 0
      this.EventDetail = []
      this.coverFilePortrait = ''
      this.isPerformerShowHotPicter = false
    },
    // 出席活动详情
    EventDetails () {
      let formData = new FormData()
      formData.append('event_id', this.event) // 艺人id
      if (this.event > 0) {
        this.$axios.request({
          url: 'actionArtistEventDetailsApi',
          method: 'POST',
          data: formData
        }).then((res) => {
          // 处理请求结果
          this.EventDetail = res.data.data // 基本数据
          this.event = res.data.data.id // 出席活动id
          this.coverFilePortrait = res.data.data.event_cover // 活动图片
        })
      }
    },
    // 上传出席活动封面
    onCoverPortrait (e) {
      let _file = e.target.files[0]
      // 判断文件大小是否超出限制
      if (_file.size > 1024 * 1024) {
        this.$refs.videoElem.value = ''
        this.toast = this.$createToast({
          time: 2000,
          txt: '文件大小超过1M',
          type: 'txt'
        })
        this.toast.show()
        return false
      } else {
        this.eventPic = _file
        let _this = this
        if (!e || !window.FileReader) {
          return
        } // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(_file)
        reader.onloadend = function () {
          _this.coverFilePortrait = this.result
        }
      }
    },
    // 上传热门作品视频
    onCoverHots (e) {
      let _file = e.target.files[0]
      // 判断文件大小是否超出限制
      if (_file.size > 1024 * 1024 * 40) {
        this.$refs.videoElem.value = ''
        this.toast = this.$createToast({
          time: 2000,
          txt: '文件大小超过40M',
          type: 'txt'
        })
        this.toast.show()
        return false
      } else {
        this.workVideo = _file
        let _this = this
        if (!e || !window.FileReader) {
          return
        } // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(_file)
        reader.onloadend = function () {
          _this.coverFileHots = this.result
        }
      }
    },
    // 上传热门作品封面
    onCoverHot (e) {
      let _file = e.target.files[0]
      // 判断文件大小是否超出限制
      if (_file.size > 1024 * 1024) {
        this.$refs.videoElem.value = ''
        this.toast = this.$createToast({
          time: 2000,
          txt: '文件大小超过1M',
          type: 'txt'
        })
        this.toast.show()
        return false
      } else {
        this.workPic = _file
        let _this = this
        if (!e || !window.FileReader) {
          return
        } // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(_file)
        reader.onloadend = function () {
          _this.coverFileHot = this.result
        }
      }
    },
    choiceCover () {
      console.log('点击了上传视频')
      this.$refs.choiceCoverElem.dispatchEvent(new MouseEvent('click'))
    },
    // 艺人热门作品添加修改操作
    SaveWorkList () {
      let formData = new FormData()
      formData.append('artist_id', this.artist) // 艺人id
      formData.append('work_id', this.work) // 作品id
      formData.append('works', this.WorkDetail.works) // 作品名称
      formData.append('remarks', this.WorkDetail.remarks) // 作品备注
      formData.append('picfile', this.workPic) // 作品封面
      formData.append('video', this.workVideo) // 视频文件
      this.$axios.request({
        url: 'actionArtistWorkSaveApi',
        method: 'POST',
        data: formData
      }).then((res) => {
        // 处理请求结果
        if (res.data.code === 200) {
          // 将新添加或修改后的数据展示到页面中
          if (this.work > 0) {
            for (let i = 0; i < this.WorkList.length; i++) {
              if (this.WorkList[i].id === this.work) {
                this.WorkList[i].works_cover = this.coverFileHot
              }
            }
          } else {
            this.WorkList.push({ 'id': res.data.data, 'works_cover': this.coverFileHot })
          }
          // 关闭热门作品弹窗
          this.closeCoverUpHot()
          // 提示
          alert(res.data.message)
        } else {
          alert(res.data.message)
        }
      })
    },
    // 艺人热门作品删除操作
    SaveWorkRemove (id, index) {
      let formData = new FormData()
      formData.append('work_id', id) // 热门作品id
      this.$axios.request({
        url: 'actionArtistWorkDelApi',
        method: 'POST',
        data: formData
      }).then((res) => {
        // 处理请求结果
        if (res.data.code === 200) {
          this.WorkList.splice(index, 1)
          // 成功请求到数据后的处理
          alert(res.data.message)
        } else {
          // 请求失败后的处理
          alert(res.data.message)
        }
      })
    },
    // 艺人出席活动添加修改操作
    SaveEventList () {
      let formData = new FormData()
      formData.append('artist_id', this.artist) // 艺人id
      formData.append('event_id', this.event) // 出席活动id
      formData.append('title', this.EventDetail.title) // 活动标题
      formData.append('jump_link', this.EventDetail.jump_link) // 活动链接
      formData.append('remarks', this.EventDetail.remarks) // 活动备注
      formData.append('picfile', this.eventPic) // 活动封面
      this.$axios.request({
        url: 'actionArtistEventSaveApi',
        method: 'POST',
        data: formData
      }).then((res) => {
        // 处理请求结果
        if (res.data.code === 200) {
          // 将新添加或修改后的数据展示到页面中
          if (this.event > 0) {
            for (let i = 0; i < this.EventList.length; i++) {
              if (this.EventList[i].id === this.event) {
                this.EventList[i].works_cover = this.coverFilePortrait
              }
            }
          } else {
            this.EventList.push({ 'id': res.data.data, 'event_cover': this.coverFilePortrait })
          }
          // 关闭出席活动弹窗
          this.closeCoverUpHotPicter()
          // 提示
          alert(res.data.message)
        } else {
          alert(res.data.message)
        }
      })
    },
    // 艺人出席活动删除操作
    SaveEventRemove (id, index) {
      let formData = new FormData()
      formData.append('event_id', id) // 参加活动id
      this.$axios.request({
        url: 'actionArtistEventDelApi',
        method: 'POST',
        data: formData
      }).then((res) => {
        // 处理请求结果
        if (res.data.code === 200) {
          this.EventList.splice(index, 1)
          // 成功请求到数据后的处理
          alert(res.data.message)
        } else {
          // 请求失败后的处理
          alert(res.data.message)
        }
      })
    },
    // 鼠标浮动移入触发事件
    onMouseover (index, type) {
      if (type === 1) {
        this.seenWork = true
      } else if (type === 2) {
        this.seenEvent = true
      }
      this.current = index
    },
    // 鼠标浮动移出触发事件
    onMouseout () {
      this.seenWork = false
      this.seenEvent = false
      this.current = null
    },
    // 返回列表页
    JumpList () {
      this.$router.push({ path: '/allpeople' })
    }
  }
}
</script>

<style>
  .el-card {
    min-height: calc(50vh - 60px);
  }
  .cover-all {
    width: 97px;
    height: 146px;
    border-radius: 2px;
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
    margin-left: 191px;
    margin-top: 20px;
  }
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
    .work_img{
        position:absolute;
        width: 151px;
        height: 187px;
    }
    .operation{
        width: 151px;
        height: 187px;
        position:absolute;
        z-index:1;
        background:rgba(0,0,0,0.5);
    }
    .operation div{
        width:32px;
        height:32px;
        background:rgba(153,153,153,1);
        opacity:0.9;
        border-radius:50%;
        margin: 0 auto;
        text-align: center;
        line-height:30px;
        color:rgba(255,255,255,1);
    }
    .modify{
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        cursor:pointer
    }
    .delete{
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translate(-50%, -50%);
        cursor:pointer
    }
  .event_img{
      position:absolute;
      width: 135px;
      height: 101px;
  }
  .eoperation{
      width: 135px;
      height: 101px;
      position:absolute;
      z-index:1;
      background:rgba(0,0,0,0.5);
  }
  .eoperation div{
      width:32px;
      height:32px;
      background:rgba(153,153,153,1);
      opacity:0.9;
      border-radius:50%;
      margin: 0 auto;
      text-align: center;
      line-height:30px;
      color:rgba(255,255,255,1);
  }
  .emodify{
      position: absolute;
      left: 35%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor:pointer
  }
  .edelete{
      position: absolute;
      left: 65%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor:pointer
  }
</style>
