<template>
    <div style="margin:15px;">
      <div class="name">
            <div class="name-input">
               <span>所有艺人：</span>
              <input type="text" placeholder="请输入姓名" >
              <span class="query">查询</span>
              <span class="cancel-bac">取消</span>
              <span class="add" @click="add">添加艺人</span>
            </div>
      </div>
      <div class="content" >
    <el-card >
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
             <tbody class="contents">
              <tr>
                <td>TS000001</td>
                <td>多余和毛毛底</td>
                <td>哒哒哒Xavier</td>
                <td>2019-4-30 16：10:10</td>
                <td>抖音红人、歌手、主播...</td>
                <td class="look"><a href="">查看详情 </a> 编辑 删除 推荐</td>
              </tr>
                <tr>
                <td>TS000001</td>
                <td>多余和毛毛底</td>
                <td>哒哒哒Xavier</td>
                <td>2019-4-30 16：10:10</td>
                <td>抖音红人、歌手、主播...</td>
                <td class="look"><a href="">查看详情 </a> 编辑 删除 推荐</td>
              </tr>
                 <tr>
                <td>TS000001</td>
                <td>多余和毛毛底</td>
                <td>哒哒哒Xavier</td>
                <td>2019-4-30 16：10:10</td>
                <td>抖音红人、歌手、主播...</td>
                <td class="look"><a href="">查看详情 </a> 编辑 删除 推荐</td>
              </tr>
                <tr>
                <td>TS000001</td>
                <td>多余和毛毛底</td>
                <td>哒哒哒Xavier</td>
                <td>2019-4-30 16：10:10</td>
                <td>抖音红人、歌手、主播...</td>
                <td class="look"><a href="">查看详情 </a> 编辑 删除 推荐</td>
              </tr>

            </tbody>
        </table>

      </div>
    </el-card>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    async add () {
      this.$router.push({ path: '/Addpeople' })
    }
  },
  mounted () {
  }

}
</script>

<style>
.name i{
    height: 100px;
}

.name-input {
    height:80px;
    background: #fff;
    border-radius:2px;
}
.name-input {
    font-size:7px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
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

.name-input .query{
    height: 28px;
    width: 74px;
    background: #ccc;
    position: absolute;
    line-height: 28px;
    margin-top: 22px;
    background:rgba(24,144,255,1);
    border-radius:2px;
    margin-left: 48px;
    text-align: center;
    color: #fff;
    cursor:pointer;

}

.cancel-bac {
    height: 28px;
    width: 74px;
    background: #ccc;
    position: absolute;
    line-height: 28px;
    margin-top: 22px;
    background:rgba(230,230,230,1);
    border-radius:2px;
    margin-left: 153px;
    text-align: center;
    color: #666666;
    cursor:pointer;

}
.add {
    height: 28px;
    width: 102px;
    background: #ccc;
    position: absolute;
    line-height: 28px;
    margin-top: 22px;
    background:rgba(24,144,255,1);
    border-radius:2px;
    margin-left: 630px;
    text-align: center;
    color: #fff;
    float: right;
    cursor:pointer;

}
.table {
    width: 100%;
    max-width: 100%;
    background: #EBEBEB;
    border-spacing: 0;
}
.table>thead>tr>th {
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
.contents>tr>td {
    font-size: 12px;
    padding: 18px;
    text-align: left !important;
    border-bottom: 1px solid #E6E6E6;

}
.look {
    color :#1890FF;
}
a {
    text-decoration:none;
    color:#1890FF;
}
</style>
