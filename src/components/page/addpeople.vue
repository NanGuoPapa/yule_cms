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
          <span class="wrong">{{basicText}}</span>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">姓名</p>
          <input class="basic-input" type="text" placeholder="请输入姓名" v-model="artistInfo.artist_name">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">类型</p>
          <input class="basic-input" type="text" placeholder="请输入艺人类型" v-model="artistInfo.artist_type">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">简介</p>
          <input class="basic-input" type="text" placeholder="请输入艺人简介" v-model="artistInfo.artist_introduction">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">视频类型</p>
          <input class="basic-input" type="text" placeholder="请输入艺人作品视频类型" v-model="artistInfo.video_type">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">年龄</p>
          <input class="basic-input" type="number" placeholder="请输入艺人年龄" v-model="artistInfo.artist_age">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">生日</p>
          <input class="basic-input" type="date" placeholder="请输入艺人生日" v-model="artistInfo.birthday">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">身高(cm)</p>
          <input class="basic-input" type="number" placeholder="请输入艺人身高" v-model="artistInfo.artist_height">
        </div>
      </div>
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">体重(kg)</p>
          <input class="basic-input" type="number" placeholder="请输入艺人体重" v-model="artistInfo.artist_weight">
        </div>
      </div>
    </div>
    <!-- 联系方式 -->
    <div class="information">
      <div class="information-title">
        <span class="must-fill">*</span>
        <p class="information-news">联系方式</p>
          <span class="wrong">{{contactText}}</span>
      </div>
      <div class="contact">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">微博名称</p>
          <input class="basic-input" type="text" placeholder="请输入微博名称" v-model="artistInfo.weibo_name">
        </div>
      </div>
      <div class="contact">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">微博链接</p>
          <input class="basic-input" type="text" placeholder="请输入微博链接" v-model="artistInfo.weibo_link">
        </div>
      </div>
        <div v-for="(items, index) in platforms" :key="index">
      <div class="contact">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">平台名称</p>
          <input class="basic-input" type="text" placeholder="请输入平台名称" v-model="items.name">
        </div>
      </div>
      <div class="contact">
        <div class="basic-big">
          <span class="basic-fill"></span>
          <p class="basic-name">平台链接</p>
          <input class="basic-input" type="text" placeholder="请选平台链接" v-model="items.link">
        </div>
      </div>
            <div class="add-input" @click="platform">
                <span class="add-contact">添加</span>
            </div>
            <div style="margin-left: 50px;" class="add-input" @click="platformRemove(index)">
                <span class="add-contact">删除</span>
            </div>
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
            <span class="wrong">{{picfileText}}</span>
        </div>
      </div>
      <div class="add-back" :show-file-list="false" @mouseenter="fileOnMouseOver(1)" @mouseleave="fileOnMouseOut">
          <div class="exhibition">
              <img class="cover-works" :src="coverFileReader" @click="choiceCover" alt>
              <input class="cover" type="file" ref="choiceCoverElem" @change="onCoverChange" accept="image/*">
              <span class="add-picter">+</span>
              <span class="add-picter">添加</span>
          </div>
          <div class="exhibitions" v-show="seenPicfile">
              <div class="replace" @click="choiceCover">替换</div>
          </div>
      </div>
      <!-- 艺人封面 -->
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">艺人封面</p>
            <span class="wrong">{{backfileText}}</span>
        </div>
      </div>
      <div class="add-artist" @mouseenter="fileOnMouseOver(2)" @mouseleave="fileOnMouseOut">
          <div class="coverPhoto">
              <img class="cover-artist" :src="coverFileArtist" @click="choiceCovers" alt>
              <input class="cover" type="file" ref="choiceCoverElems" @change="onCoverArtist" accept="image/*">
              <span class="artist-addto">+</span>
              <span class="artist-addto">添加</span>
          </div>
          <div class="coverPhotos" v-show="seenBackfile">
              <div class="replace" @click="choiceCovers">替换</div>
          </div>
      </div>
      <!-- 艺人写真 -->
      <div class="basic">
        <div class="basic-big">
          <span class="basic-fill">*</span>
          <p class="basic-name">艺人写真</p>
            <span class="wrong">{{portraitText}}</span>
        </div>
      </div>
      <div  class="add-backs" :show-file-list="false">
          <input class="cover" type="file" ref="choiceCoverElemUpdate" @change="onCoverPortraits" accept="image/*">
          <input class="cover" type="file" ref="choiceCoverElemPortrait" @change="onCoverPortrait" accept="image/*" multiple="multiple">
        <span class="add-picter">+</span>
        <span class="add-picter">添加</span>
      </div>
      <div class="all_picter">
        <ul class="picter_ul">
          <li style="display: inline-block;" class="more_picter" v-for="(item, index) in coverFilePortraits" :key="index" @mouseenter="onMouseover(index,3)" @mouseleave="onMouseout">
              <img class="cover-all" :src="item" alt>
              <div class="portrait-all" v-show="seenPortrait && index === current">
                  <div class="modify" @click="choiceCoverPortrait(index)">替换</div>
                  <div class="delete" @click="artistPhotoRemove(index)">删除</div>
              </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 获奖经历结束 -->
    <div class="award">
      <div class="information-title">
        <span class="must-fill"></span>
        <p class="information-news">获奖经历(选填)</p>
      </div>
      <div>
          <div v-for=" (item, index) in experiences" :key="index">
              <p class="award-past">获奖经历 :</p>
              <input class="award-input" type="text" v-model="experiences[index]" placeholder="请输入获奖经历（如：2018 抖音嘉年华人气主播冠军）" >
              <div class="add-awards" @click="experienceRemove(index)">
                  <span class="award-button">删除</span>
              </div>
          </div>
        <div class="add-award" @click="experience">
          <span class="award-button">添加</span>
        </div>
      </div>
    </div>
    <!-- 热门作品 -->
    <el-card style="margin:15px;" v-if="artist > 0">
        <div class="basic">
            <div class="basic-big">
                <span class="basic-fill"></span>
                <p class="basic-name">热门作品</p>
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
                            <div class="modify" @click="artistCoverHot(item.id)">替换</div>
                            <div class="delete" @click="SaveWorkRemove(item.id, index)">删除</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </el-card>
    <!-- 出席活动 -->
    <el-card style="margin:15px;" v-if="artist > 0">
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
                            <div class="emodify" @click="artistCoverHotPicter(item.id)">替换</div>
                            <div class="edelete" @click="SaveEventRemove(item.id, index)">删除</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </el-card>
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
            <img class="coverhots" :src="coverFileHot" alt>
          </div>
          <div class="cover-picters">
            <video class="coverhot" :src="coverFileHots" alt></video>
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
          <textarea class="entering" cols="330" rows="81" placeholder="请输入备注信息" v-model="EventDetail.remarks"></textarea>
        </div>
        <div class="content-top">
          <span class="must">*</span>
          <span class="news">图片上传 :</span>
          <input class="butto" type="file" @change="onCoverPortraitgo">
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
    <!-- 底部 -->
    <!--<router-link to="/HotWorks" v-if="true">-->
      <div class="footers">
        <div class="footer-preserve" @click="artistAdd" v-if="artist > 0">完成</div>
        <div class="footer-preserve" @click="artistAdd" v-else>保存并下一步</div>
      </div>
    <!--</router-link>-->
    <div class="explain">
      <span>帮助</span>
      <span class="privacy">隐藏</span>
      <span>条款</span>
      <p class="tiansin">copyright 2019 北京天率科技有限公司出品</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      artist: 0,
      artistInfo: [],
      platforms: [{ name: '', link: '' }], // 平台
      experiences: [''], // 获奖经历
      picfile: '', // 艺人首页展示
      coverFileReader: '', // 艺人首页展示图预览
      backfile: '', // 艺人封面
      coverFileArtist: '', // 艺人封面预览
      portrait: [], // 艺人写真
      coverFilePortraits: [], // 艺人写真预览
      updatePortrait: -1, // 修改艺人写真参数信息
      isPerformerShow: false,
      work: 0, // 热门作品id
      event: 0, // 参加活动id
      WorkList: [], // 艺人热门作品列表
      WorkDetail: [], // 艺人热门作品详情
      EventList: [], // 艺人参加活动列表
      EventDetail: [], // 艺人参加活动详情
      isPerformerShowHot: false,
      isPerformerShowHotPicter: false,
      coverFilePortrait: '', // 活动封面图预览
      eventPic: '', // 活动封面图文件
      coverFileHot: '', // 封面（预览）
      workPic: '', // 作品封面图文件
      coverFileHots: '', // 视频（预览）
      workVideo: '', // 视频文件
      seenPicfile: false,
      seenBackfile: false,
      seenPortrait: false,
      seenWork: false,
      seenEvent: false,
      current: 0, // 控制鼠标悬浮时的显示和隐藏
      basicText: '', // 基本信息为空的警告信息
      contactText: '', // 联系方式信息为空的警告信息
      picfileText: '', // 艺人首页展示警告信息
      backfileText: '', // 艺人封面展示警告信息
      portraitText: '' // 艺人写真展示警告信息
    }
  },
  mounted () {
    this.artist = this.$route.query.artist
    if (this.artist > 0) {
      let formData = new FormData()
      formData.append('artist_id', this.artist) // 艺人id
      // 艺人基本信息
      this.$http.request({
        url: 'actionArtistDetailsApi',
        method: 'POST',
        data: formData
      }).then((res) => {
        // 处理请求结果
        if (res.data.code === 200) {
          this.artistInfo = res.data.data // 基本数据
          this.platforms = JSON.parse(res.data.data.platform) // 平台信息
          this.experiences = JSON.parse(res.data.data.award_experience) // 平台信息
          this.coverFileReader = res.data.data.artist_cover// 艺人首页展示图预览
          this.coverFileArtist = res.data.data.artist_back// 艺人封面图图预览
          if (res.data.data.artist_photo && res.data.data.artist_photo !== 'undefined') {
            this.coverFilePortraits = JSON.parse(res.data.data.artist_photo) // 艺人写真预览
          }
        }
      })
      // 热门作品列表
      this.$http.request({
        url: 'actionArtistWorkListApi',
        method: 'POST',
        data: formData
      }).then((res) => {
        // 处理请求结果
        if (res.data.code === 200) {
          this.WorkList = res.data.data // 基本数据
        }
      })
      // 出席活动列表
      this.$http.request({
        url: 'actionArtistEventListApi',
        method: 'POST',
        data: formData
      }).then((res) => {
        // 处理请求结果
        if (res.data.code === 200) {
          this.EventList = res.data.data // 基本数据
        }
      })
    }
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
        this.$http.request({
          url: 'actionArtistWorkDetailsApi',
          method: 'POST',
          data: formData
        }).then((res) => {
          // 处理请求结果
          if (res.data.code === 200) {
            this.WorkDetail = res.data.data // 基本数据
            this.work = res.data.data.id // 热门作品id
            this.coverFileHot = res.data.data.works_cover // 视频封面
            this.coverFileHots = res.data.data.works_link // 视频文件
          }
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
        this.$http.request({
          url: 'actionArtistEventDetailsApi',
          method: 'POST',
          data: formData
        }).then((res) => {
          // 处理请求结果
          if (res.data.code === 200) {
            this.EventDetail = res.data.data // 基本数据
            this.event = res.data.data.id // 出席活动id
            this.coverFilePortrait = res.data.data.event_cover // 活动图片
          }
        })
      }
    },
    // 上传出席活动封面
    onCoverPortraitgo (e) {
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
    // 艺人热门作品添加修改操作
    SaveWorkList () {
      let msg = '您确定提交吗?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let formData = new FormData()
        formData.append('artist_id', this.artist) // 艺人id
        formData.append('work_id', this.work) // 作品id
        formData.append('works', this.WorkDetail.works) // 作品名称
        formData.append('remarks', this.WorkDetail.remarks) // 作品备注
        formData.append('picfile', this.workPic) // 作品封面
        formData.append('video', this.workVideo) // 视频文件
        this.$http.request({
          url: 'actionArtistWorkSaveApi',
          method: 'POST',
          data: formData
        }).then((res) => {
          // 处理请求结果
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
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
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        console.log('cancel')
      })
    },
    // 艺人热门作品删除操作
    SaveWorkRemove (id, index) {
      let msg = '您确定删除吗?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let formData = new FormData()
        formData.append('work_id', id) // 热门作品id
        this.$http.request({
          url: 'actionArtistWorkDelApi',
          method: 'POST',
          data: formData
        }).then((res) => {
          // 处理请求结果
          if (res.data.code === 200) {
            // 成功请求到数据后的处理
            this.$message.success(res.data.message)
            this.WorkDetail.splice(index, 1)
          } else {
            // 请求失败后的处理
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        console.log('cancel')
      })
    },
    // 艺人出席活动添加修改操作
    SaveEventList () {
      let msg = '您确定提交吗?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let formData = new FormData()
        formData.append('artist_id', this.artist) // 艺人id
        formData.append('event_id', this.event) // 出席活动id
        formData.append('title', this.EventDetail.title) // 活动标题
        formData.append('jump_link', this.EventDetail.jump_link) // 活动链接
        formData.append('remarks', this.EventDetail.remarks) // 活动备注
        formData.append('picfile', this.eventPic) // 活动封面
        this.$http.request({
          url: 'actionArtistWorkSaveApi',
          method: 'POST',
          data: formData
        }).then((res) => {
          // 处理请求结果
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            // 将新添加或修改后的数据展示到页面中
            if (this.event > 0) {
              for (let i = 0; i < this.EventList.length; i++) {
                if (this.EventList[i].id === this.event) {
                  this.EventList[i].event_cover = this.coverFilePortrait
                }
              }
            } else {
              this.EventList.push({ 'id': res.data.data, 'event_cover': this.coverFilePortrait })
            }// 关闭出席活动弹窗
            this.closeCoverUpHotPicter()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        console.log('cancel')
      })
    },
    // 艺人热门作品删除操作
    SaveEventRemove (id, index) {
      let msg = '您确定删除吗?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let formData = new FormData()
        formData.append('event_id', id) // 参加活动id
        this.$http.request({
          url: 'actionArtistEventDelApi',
          method: 'POST',
          data: formData
        }).then((res) => {
          // 处理请求结果
          if (res.data.code === 200) {
            // 成功请求到数据后的处理
            this.$message.success(res.data.message)
            this.EventDetail.splice(index, 1)
          } else {
            // 请求失败后的处理
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        console.log('cancel')
      })
    },
    // 添加平台信息文本框
    platform () {
      this.platforms.push({ name: '', link: '' })
    },
    // 删除平台信息文本框
    platformRemove (index) {
      this.platforms.splice(index, 1)
    },
    // 添加获奖经历文本框
    experience () {
      this.experiences.push([])
    },
    // 删除获奖经历文本框
    experienceRemove (index) {
      this.experiences.splice(index, 1)
    },
    onCoverChange (e) {
      let _file = e.target.files[0]
      // 判断文件大小是否超出限制
      if (_file.size > 1024 * 1024) {
        this.picfileText = '图片大小请小于1M'
        return false
      } else {
        this.picfileText = ''
        this.picfile = _file
        let _this = this
        if (!e || !window.FileReader) {
          return
        } // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(_file)
        reader.onloadend = function () {
          _this.coverFileReader = this.result
        }
      }
    },
    choiceCover () {
      this.$refs.choiceCoverElem.dispatchEvent(new MouseEvent('click'))
    },
    onCoverArtist (e) {
      let _file = e.target.files[0]
      // 判断文件大小是否超出限制
      if (_file.size > 1024 * 1024) {
        this.backfileText = '图片大小请小于1M'
        return false
      } else {
        this.backfileText = ''
        this.backfile = _file
        let _this = this
        if (!e || !window.FileReader) {
          return
        } // 看支持不支持FileReader
        let reader = new FileReader()
        reader.readAsDataURL(_file)
        reader.onloadend = function () {
          _this.coverFileArtist = this.result
        }
      }
    },
    choiceCovers () {
      this.$refs.choiceCoverElems.dispatchEvent(new MouseEvent('click'))
    },
    // 艺人写真图片上传
    onCoverPortrait (e) {
      let _file = e.target.files
      // this.portrait = _file
      let _this = this
      if (!e || !window.FileReader) {
        return
      }// 看支持不支持FileReader\
      for (let i = 0; i < _file.length; i++) {
        if (_file[i].size > 1024 * 1024) {
          this.portraitText = '每张图片大小请小于1M'
          return false
        } else {
          this.portraitText = ''
        }
        this.portrait.push(_file[i])
        let reader = new FileReader()
        reader.readAsDataURL(_file[i])
        reader.onloadend = function () {
          _this.coverFilePortraits.push(this.result)
        }
      }
    },
    choiceCoverPortrait (index) {
      this.updatePortrait = index
      this.$refs.choiceCoverElemUpdate.dispatchEvent(new MouseEvent('click'))
    },
    onCoverPortraits (e) {
      let _file = e.target.files
      // this.portrait = _file
      let _this = this
      if (!e || !window.FileReader) {
        return
      }// 看支持不支持FileReader\
      for (let i = 0; i < _file.length; i++) {
        if (_file[i].size > 1024 * 1024) {
          this.portraitText = '每张图片大小请小于1M'
          return false
        } else {
          this.portraitText = ''
        }
        this.portrait.push(_file[i])
        let reader = new FileReader()
        reader.readAsDataURL(_file[i])
        reader.onloadend = function () {
          _this.$set(_this.coverFilePortraits, _this.updatePortrait, this.result)
          if (_this.artistInfo.artist_photo && JSON.parse(_this.artistInfo.artist_photo).length > _this.updatePortrait) {
            let artistPhoto = JSON.parse(_this.artistInfo.artist_photo)
            artistPhoto.splice(_this.updatePortrait, 1)
            _this.artistInfo.artist_photo = JSON.stringify(artistPhoto)
          } else {
            _this.portrait.splice(_this.updatePortrait, 1)
          }
          _this.updatePortrait = -1
        }
      }
    },
    // 艺人写真图片删除
    artistPhotoRemove (index) {
      if (this.artistInfo.artist_photo && JSON.parse(this.artistInfo.artist_photo).length > index) {
        let artistPhoto = JSON.parse(this.artistInfo.artist_photo)
        artistPhoto.splice(index, 1)
        this.artistInfo.artist_photo = JSON.stringify(artistPhoto)
      }
      this.coverFilePortraits.splice(index, 1)
    },
    artistAdd () {
      // 基本信息验证是否为空
      if (!this.artistInfo.artist_name) {
        this.basicText = '请输入艺人姓名'
        this.$message.error('请输入艺人姓名')
        return false
      } else {
        this.basicText = ''
      }
      if (!this.artistInfo.artist_type) {
        this.basicText = '请输入艺人类型'
        this.$message.error('请输入艺人类型')
        return false
      } else {
        this.basicText = ''
      }
      if (!this.artistInfo.artist_introduction) {
        this.basicText = '请输入艺人简介'
        this.$message.error('请输入艺人简介')
        return false
      } else {
        this.basicText = ''
      }
      // 联系方式验证是否为空
      if (!this.artistInfo.weibo_name) {
        this.contactText = '请输入微博姓名'
        this.$message.error('请输入微博姓名')
        return false
      } else {
        this.contactText = ''
      }
      if (!this.artistInfo.weibo_link) {
        this.contactText = '请输入微博链接'
        this.$message.error('请输入微博链接')
        return false
      } else {
        this.contactText = ''
      }
      // 文件信息验证
      if (!this.picfile || this.picfile === undefined && this.artist === 0) {
        this.picfileText = '请上传艺人首页展示图'
        this.$message.error('请上传艺人首页展示图')
        return false
      } else {
        this.picfileText = ''
      }
      if (!this.backfile || this.backfile === undefined && this.artist === 0) {
        this.backfileText = '请上传艺人封面图'
        this.$message.error('请上传艺人封面图')
        return false
      } else {
        this.backfileText = ''
      }
      if (!this.portrait || this.portrait === undefined && this.artist === 0) {
        this.portraitText = '请上传艺人写真图'
        this.$message.error('请上传艺人写真图')
        return false
      } else {
        this.portraitText = ''
      }
      let formData = new FormData()
      formData.append('artist_id', this.artist) // 艺人id
      formData.append('artist_name', this.artistInfo.artist_name) // 艺人姓名
      formData.append('artist_age', this.artistInfo.artist_age) // 艺人年龄
      formData.append('artist_height', this.artistInfo.artist_height) // 艺人身高
      formData.append('artist_weight', this.artistInfo.artist_weight) // 艺人体重
      formData.append('birthday', this.artistInfo.birthday) // 艺人生日
      formData.append('weibo_name', this.artistInfo.weibo_name) // 微博名称
      formData.append('weibo_link', this.artistInfo.weibo_link) // 微博链接
      formData.append('artist_introduction', this.artistInfo.artist_introduction) // 艺人介绍
      formData.append('artist_type', this.artistInfo.artist_type) // 艺人类型
      formData.append('video_type', this.artistInfo.video_type) // 视频类型
      formData.append('picfile', this.picfile) // 艺人首页展示图片
      formData.append('backfile', this.backfile) // 艺人封面图片
      for (let i in this.portrait) { // 艺人写真（图片数据）
        if (this.portrait[i] % 1 === 0) {
          break
        }
        formData.append('photo[]', this.portrait[i])
      }
      if (!this.artistInfo.artist_photo) {
        formData.append('jphoto', '') // 艺人写真（修改信息时必传的原json数据）
      } else {
        formData.append('jphoto', this.artistInfo.artist_photo) // 艺人写真（修改信息时必传的原json数据）
      }
      formData.append('platform', JSON.stringify(this.platforms)) // 平台信息
      formData.append('award_experience', JSON.stringify(this.experiences)) // 艺人获奖经历
      let msg = '您确定提交吗?'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.$http.request({
          url: 'actionArtistSaveApi',
          method: 'POST',
          data: formData
        }).then((res) => {
          // 处理请求结果
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            if (this.artist > 0) {
              // 修改操作跳转至列表页
              this.$router.push({ path: '/allpeople' })
            } else {
              // 添加操作跳转至艺人作品和艺人活动页
              this.$router.push({ path: '/HotWorks',
                name: 'HotWorks',
                query: { artist: res.data.data.artist_id }
              })
            }
          } else {
            this.$message.error(res.data.message)
          }
        })
      }).catch(() => {
        console.log('cancel')
      })
    },
    // 艺人首页，艺人封面鼠标移入时触发事件
    fileOnMouseOver (type) {
      if (this.artist > 0) {
        if (type === 1) {
          this.seenPicfile = true
        } else if (type === 2) {
          this.seenBackfile = true
        }
      }
    },
    fileOnMouseOut () {
      this.seenPicfile = false
      this.seenBackfile = false
    },
    // 鼠标浮动移入触发事件
    onMouseover (index, type) {
      if (type === 1) {
        this.seenWork = true
      } else if (type === 2) {
        this.seenEvent = true
      } else if (type === 3) {
        this.seenPortrait = true
      }
      this.current = index
    },
    // 鼠标浮动移出触发事件
    onMouseout () {
      this.seenPortrait = false
      this.seenWork = false
      this.seenEvent = false
      this.current = null
    }
  }
}
</script>

<style>
  .add-backs {
    width: 97px;
    height: 146px;
    border: 1px solid rgba(224, 224, 224, 1);
    border-radius: 2px;
    margin-top: 14px;
    margin-left: 52px;
    text-align: center;
  }

.picter_ul {
  width: 77%;
  margin: auto;
  margin-top: -190px;
  position: relative;
}
.all_picter {
  display: -webkit-box;

}
.more_picter {
  width: 1px;
  margin-left: 114px;
  position:relative
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
    cursor:pointer;
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
  margin-left: -35.5px;
}
.add-back {
  width: 97px;
  height: 146px;
  border: 1px solid rgba(224, 224, 224, 1);
  border-radius: 2px;
  margin-top: 14px;
  margin-left: 52px;
  text-align: center;
    position:relative
}
.cover {
  opacity: 0;
  margin-top: 58px;
  margin-left: -17px;
  position: absolute;
  width: 60px;
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
  margin-left: -160px;
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
  margin-left: -99px!important;
  margin-top: 27px!important;
    position:absolute;
    z-index: 0;
}
.portrait-all{
    width: 97px;
    height: 146px;
    border-radius: 2px;
    text-align: center;
    object-fit: cover;
    margin-left: -99px!important;
    margin-top: 27px!important;
    position:absolute;
    z-index: 1;
    background:rgba(0,0,0,0.5);
}
  .portrait-all div{
      width:28px;
      height:28px;
      font-size: 10px;
      background:rgba(153,153,153,1);
      opacity:0.9;
      border-radius:50%;
      margin: 0 auto;
      text-align: center;
      line-height:28px;
      color:rgba(255,255,255,1);
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
    cursor:pointer;
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
    cursor:pointer;
}
.footer-preserve {
  font-size: 7px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: #fff;
  line-height: 28px;
    text-align: center;
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
  .exhibition{
      width: 97px;
      height: 146px;
      position:absolute;
  }
  .exhibitions{
      width: 97px;
      height: 146px;
      position:absolute;
      z-index:1;
      background:rgba(0,0,0,0.5);
  }
  .coverPhoto{
      width: 346px;
      height: 105px;
      position:absolute;
  }
  .coverPhotos{
      width: 346px;
      height: 105px;
      position:absolute;
      z-index:1;
      background:rgba(0,0,0,0.5);
  }
  .replace{
      width:32px;
      height:32px;
      background:rgba(153,153,153,1);
      opacity:0.9;
      border-radius:50%;
      margin: 0 auto;
      text-align: center;
      line-height:30px;
      color:rgba(255,255,255,1);
      font-size: 12px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor:pointer;
  }
    .add-awards {
        width: 74px;
        background: rgba(230, 230, 230, 1);
        border-radius: 2px;
        margin: auto;
        display: inline-block;
        float: left;
        margin-top: -24px;
        margin-left: 900px;
        left: 100px;
        cursor: pointer;
    }
    .wrong{
        margin-left: 20px;
        font-size:7px;
        font-weight:400;
        color:rgba(255,85,85,1)
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
