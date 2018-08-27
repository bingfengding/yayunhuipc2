<template>
  <div id="preferential">
    <div class="headerText">
     <img src="../assets/preferential/preferential_text.png" alt="">
   </div>
   <div class="content">
     <div class="contentMain">
       <ul>
          <li v-for="(item,index) in nowItems" :key="index">
            <img :src="domain + item.image" alt="">
            <div class="contentMainText">
              <p class="font18 contentMainTextTitle">{{item.title}}</p>
              <p class="font14 contentMainTextContext">{{item.content}}</p>
              <div class="contentButton pointer">
                <a :href="baseUrl" target="_blank">
                </a>
              </div>
           </div>
         </li>
       </ul>
     </div>
     <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="3"
          layout="prev, pager, next"
          :total="alltotal">
        </el-pagination>
      </div>
   </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {getactivity} from 'api/home/home'
export default {
  data(){
    return {
      domain:"",
      baseUrl:"http://cn.man257.com/promotions/index",
      chooesId:0,//选择标签的对应位置
      alltotal:1,//总数量
      howLenght:1,//分页长度
      currentPage:1,//当前页面
      nowItems:[{ image:require("../assets/preferential/preferential_02.png"),
          title:"优惠活动1",
          id:1,
          content:"第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动，每个优惠图片设计需要有亚运会LOGO和元素第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动，每个优惠图片设计需要有亚运会LOGO和元素第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动",
          url:""
        },
        { image:require("../assets/preferential/preferential_02.png"),
          title:"优惠活动1",
          id:2,
          content:"第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动，每个优惠图片设计需要有亚运会LOGO和元素第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动，每个优惠图片设计需要有亚运会LOGO和元素第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动",
          url:""
        },
       { image:require("../assets/preferential/preferential_02.png"),
          title:"优惠活动1",
          id:12,
          content:"第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动，每个优惠图片设计需要有亚运会LOGO和元素第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动，每个优惠图片设计需要有亚运会LOGO和元素第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动",
          url:""
        }],
      items:[
        { image:require("../assets/preferential/preferential_02.png"),
          title:"优惠活动1",
          id:12,
          content:"第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动，每个优惠图片设计需要有亚运会LOGO和元素第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动，每个优惠图片设计需要有亚运会LOGO和元素第六个版块展示优惠内容，分栏展示亚运会主题的优惠活动",
          url:""
        }

      ]
    }
  },
  created(){
    getactivity().then(res=>{
      let _arr = []
      
      let _base = res.data.data.agActivityList
      this.domain = res.data.data.domain
      this.items = _base
      this.Initialization()
    })
    
  },
  methods:{
    Initialization(){
      let urlReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
      if(document.referrer){
        console.log(document.referrer)
        let url=urlReg.exec(document.referrer);
        this.baseUrl = "http://"+url[0] +"/promotions/index"
        console.log(this.baseUrl)
      }
      this.alltotal = this.items.length;
      this.howLenght =  Math.ceil(this.alltotal/3);
      let _arr = [];
      if(this.howLenght>1){
        _arr = this.items.slice(this.currentPage*3-3,this.currentPage*3)
      }else{
        _arr = this.items
      }
     this.nowItems = _arr;

    },
    handleCurrentChange(val){
      let _arr = [];
      if(this.howLenght>1){
        _arr = this.items.slice(this.currentPage*3-3,this.currentPage*3)
      }
     this.nowItems = _arr;
    }
  },
  components: {
    swiper,
    swiperSlide,
  }
}
</script>
<style lang="stylus" scoped>
#preferential
  height 975px
  position relative
  padding-top 40px
  .headerText
    display flex
    justify-content center
    padding-bottom 50px
  .content
    .pagination
        display flex
        justify-content center
    .contentMain
      min-height 700px
      background url("../assets/schedule/schedule_04.png") no-repeat 100% 100%
      li
        height 220px
        margin-bottom 20px
        padding-right 40px
        background-color #43392f
        display flex
        justify-content space-between
        color #a99179
        .contentMainText
          width 630px
          padding-top 36px
          position relative
          .contentMainTextTitle
            padding-bottom 10px
          .contentMainTextContext
            line-height 24px
          .contentButton
            margin-top 16px
            background url("../assets/preferential/preferential_01.png") no-repeat 100% 100%
            width 177px
            height 50px
            position absolute
            bottom 16px
            a
              display inline-block
              width 100%
              height 100%
        >img
          width 300px
          height 100%

      
</style>
<style>
#preferential .pagination .el-pagination .el-pager li{
  background-color :transparent;
  color:#fff;
  font-size: 16px;
  font-weight:400
}
#preferential .pagination .el-pagination .el-pager li:hover{

  color:#7d5224
}
#preferential .pagination .el-pagination .el-pager li.active{

  color:#7d5224
}
#preferential .pagination .el-pagination .btn-prev{
  background-color: transparent ;
  color: #7d5224
}
#preferential .pagination .el-pagination .btn-prev .el-icon{
  font-size: 16px
}
#preferential .pagination .el-pagination .btn-next {
  background-color: transparent ;
  color: #7d5224;
}
#preferential .pagination .el-pagination .btn-next .el-icon{
   font-size: 16px
}
</style>
