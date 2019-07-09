<template>
  <div style="margin:15px;">
    <div class="name">
      <div class="name-input">
        <span>所有艺人：</span>
        <input placeholder="请输入姓名" type="text" v-model="sear">
        <span class="query" @click="Search">查询</span>
        <span class="cancel-bac" @click="emptySearch">取消</span>
        <span @click="add" class="add">添加艺人</span>
      </div>
    </div>
    <div class="content">
      <el-card>
        <div class="list">
          <table class="table">
            <thead>
            <tr>
              <th>编号</th>
              <th>姓名</th>
              <th>微博ID</th>
              <th>添加时间</th>
              <th>基本介绍</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody class="contents" v-for="(item,index) in people" :key="index">
            <tr>
              <td>{{(peoplePage.pageCurrent - 1) * peoplePage.pageSize + 1 + index}}</td>
              <td>{{item.artist_name}}</td>
              <td>{{item.weibo_name}}</td>
              <td>{{item.ctime}}</td>
              <td>{{item.artist_introduction}}</td>
              <td class="look">
                <a href="" @click="Details">查看详情 </a>
                <a href="" @click="Edit(item.id)">编辑</a>
                <a href="" @click="Deletes(item.id,index)">删除</a>
                <a href="" @click="Recommend(item.id, item.is_push)" v-if="item.is_push == 0">推荐</a>
                <a href="" @click="Recommend(item.id, item.is_push)" v-else>取消推荐</a>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next, jumper"
              :total="peoplePage.pageNumber * 10">
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      people: [],
      peoplePage: [],
      sear: '',
      pageCurrent: ''
    }
  },
  methods: {
    // 分页请求
    handleCurrentChange (val) {
      this.pageCurrent = val
      this.Search()
    },
    // 清空操作
    emptySearch () {
      this.sear = ''
      this.Search()
    },
    // 搜索艺人
    async Search () {
      let formData = new FormData()
      formData.append('artist_name', this.sear) // 艺人姓名
      formData.append('pageCurrent', this.pageCurrent) // 当前页数
      this.$axios.request({
        url: 'actionArtistListApi',
        method: 'POST',
        data: formData
      }).then((res) => {
        // 处理请求结果
        this.people = res.data.data.result
        this.peoplePage = res.data.data.PageList
      })
    },
    // 添加艺人
    async add () {
      this.$router.push({ path: '/Addpeople' })
    },
    // 查看艺人详情
    async Details () {

    },
    // 编辑艺人
    async Edit (id) {
      this.$router.push({
        path: '/Addpeople',
        name: 'addpeople',
        query: {
          artist: id
        }
      })
    },
    // 删除艺人
    async Deletes (id, index) {
      let formData = new FormData()
      formData.append('artist_id', id) // 艺人id

      this.$axios.request({
        url: 'actionArtistDelApi',
        method: 'POST',
        data: formData
      }).then((res) => {
        // 处理请求结果
        if (res.data.code === 200) {
          // 成功请求到数据后的处理
          alert(res.data.message)
          this.people.splice(index, 1)
        } else {
          // 请求失败后的处理
          alert(res.data.message)
        }
      })
    },
    // 艺人推荐/取消推荐
    async Recommend (id, push) {
      let formData = new FormData()
      formData.append('artist_id', id) // 艺人id
      if (push === 0) {
        formData.append('is_push', 1) // 艺人推荐状态(成为推荐)
      } else {
        formData.append('is_push', 0) // 艺人推荐状态(取消推荐)
      }

      this.$axios.request({
        url: 'actionArtistPushApi',
        method: 'POST',
        data: formData
      }).then((res) => {
        // 处理请求结果
        if (res.data.code === 200) {
          // 成功请求到数据后的处理
          alert(res.data.message)
        } else {
          // 请求失败后的处理
          alert(res.data.message)
        }
      })
    }
  },
  mounted () {
    this.$axios.request({
      url: 'actionArtistListApi',
      method: 'POST'
    }).then((res) => {
      // 处理请求结果
      this.people = res.data.data.result
      this.peoplePage = res.data.data.PageList
    })
  }
}
</script>

<style>
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
    font-size: 7px;
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
    cursor: pointer;

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
    cursor: pointer;

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
    cursor: pointer;

  }

  .table {
    width: 100%;
    max-width: 100%;
    background: #EBEBEB;
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
    border-bottom: 1px solid #E6E6E6;

  }

  .look {
    color: #1890FF;
  }

  .look a {
    margin-left: 10px;
  }

  a {
    text-decoration: none;
    color: #1890FF;
  }
</style>
