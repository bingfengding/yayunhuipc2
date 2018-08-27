<template>
  <div id="fieldnews">
    <div class="headerText">
     <img src="../assets/fieldnews/fieldnews_text.png" alt="">
   </div>
   <div class="content">
     <div class="contentMain">
       <div class="contentMainLeft">
         <div >
           <div class="firstVideoBox pointer" :style="{backgroundImage: 'url('+domain + videos[0].image + ')'}" 
           @click="openVideo(index=0,videos[0].id)">
             <img src="../assets/moment/player.png" alt="">
           </div>
           
           <p class="firstVideoTitle">{{videos[0].title}}</p>
         </div>
         <ul class="otherVideoBox">
           <li >
             <div :style="{backgroundImage:'url('+domain+ videos[1].image +')'}" class="pointer otherVideoItem" @click="openVideo(index=1,videos[1].id)"><img src="../assets/moment/player.png" alt="">
             </div>
             <p>{{videos[1].title}}</p>
       
           </li>
          <li >
             <div :style="{backgroundImage:'url('+domain+ videos[2].image +')'}" class="pointer otherVideoItem" @click="openVideo(index=2,videos[2].id)"><img src="../assets/moment/player.png" alt=""></div>
             <p>{{videos[2].title}}</p>
        
           </li>
           <li >
              <div :style="{backgroundImage:'url('+domain+ videos[3].image +')'}" class="pointer otherVideoItem" @click="openVideo(index=3,videos[3].id)">
                <img src="../assets/moment/player.png" alt="">
              </div>
              <p>{{videos[3].title}}</p>
           </li>
         </ul>
       </div>
       <div class="contentMainRight">
          <el-collapse v-model="activeName" accordion>
          <el-collapse-item 
            v-for="(item,index) in newTexts" :key="index"
          :title="item.cate_name" :name="index">
            <div class="smallItem" v-for="sceItem in item.news" :key="sceItem.id"
            @click="openArticle(sceItem.maincontent)">
                {{sceItem.title}}
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
     </div>
     <div class="videoBox">
        <el-dialog
          :show-close = "false"
          :visible.sync="dialogVisible"
          width="1000px"
          @close="closePlay"
          custom-class = "momentDialog"
        >
          <player 
          :video-url="videoUrl" 
          :state="state">
          </player>
        </el-dialog>
      </div>
      <div class="articleBox">
        <el-dialog
          :show-close = "false"
          :visible.sync="dialogVisibleArticle"
          width="1000px"
          @close="closePlayArticle"
          custom-class = "momentDialogArticle"
        >
          <div class="titleBox">
            <div class="article" v-html="maincontent"></div>
          </div>
        </el-dialog>
      </div>
   </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {getnewsvideo} from 'api/home/home'
import  player  from './player'
export default {
  data(){
    return {
      maincontent:"",
      dialogVisibleArticle:false,//文章弹窗
      domain:"",
      videoUrl:"http://45.112.214.142/youku/6774479CDA64C822F68AF56380/03000A01005B015C0FDA7C3055AF6712C0B143-26D0-4B59-AEAC-254A51892F50.mp4?sid=053412434290812c2bd6a&ctype=12&ccode=0519&duration=134&expire=18000&psid=ba567d668eed5b6a94e7d3ea31743fd4&ups_client_netip=de7f83fa&ups_ts=1534124342&ups_userid=&utid=jvjuE4R89EsCAd5%2Fg%2Fo4wDfg&vkey=A5ade267a227d37d6cbeaf750718ab054&vid=XMzYxNzE4MzM2MA%3D%3D",//视频链接
      state:false,//关闭赋值
      dialogVisible:false,
      activeName:1,//当前折叠面板的位置
      videos:[
        {
          url:"www.baidu.com",
          image:require("../assets/fieldnews/fieldnews_video_01.png"),
          maincontent:"lol全明星赛2018赛程",
          title:"",
          id:1  
        },{
          url:"www.baidu.com",
          image:require("../assets/fieldnews/fieldnews_video_01.png"),
          maincontent:"lol全明星赛2018赛程",
          title:"",
          id:2
        },{
          url:"www.baidu.com",
          image:require("../assets/fieldnews/fieldnews_video_01.png"),
          maincontent:"lol全明星赛2018赛程",
          title:"",
          id:3
        },{
          url:"www.baidu.com",
          image:require("../assets/fieldnews/fieldnews_video_01.png"),
          maincontent:"lol全明星赛2018赛程",
          title:"",
          id:4
        },
        
      ],
      newTexts:[
        {
          cate_name:"亚运新闻一",
          news:[
            {
              ag_news_category_id:1,
              id:1,
              url:"http://www.baidu.com",
              articleId:5,
              maincontent:"",
              title:"lol全明星赛2018赛程  vg 对战edg",
              url:""
            },{
              ag_news_category_id:1,
              id:2,
              url:"http://www.baidu.com",
              articleId:5,
              title:"lol全明星赛2018赛程  vg 对战edg",
              url:""
            },{
              ag_news_category_id:1,
              id:3,
              url:"http://www.baidu.com",
              articleId:5,
              title:"lol全明星赛2018赛程  vg 对战edg",
              url:""
            },{
              ag_news_category_id:1,
              id:4,
              url:"http://www.baidu.com",
              articleId:5,
              title:"lol全明星赛2018赛程  vg 对战edg",
              url:""
            },
          ]
        },
         
         
      ]
    }
  },
  created(){
    getnewsvideo().then(res=>{
      let _base = res.data.data
      this.domain = _base.domain
      this.videos = _base.agNewsVideoList
      //console.log(this.videos)
      this.newTexts = _base.agNewsList
    })
  },
  
  methods:{
    closePlayArticle(){},
    openArticle(value){
      //console.log(value)
      this.maincontent = value
      this.dialogVisibleArticle =true
    },
    openVideo(index,id){
      this.dialogVisible = true
      this.videoUrl = this.videos[index].url
      //console.log(index,id)
      //console.log(this.videoUrl)
      this.state = false
    },
    closePlay(){
     // console.log("我关闭了窗口")
      this.state = true
      //console.log(this.state)
       this.videoUrl =""
    }
  },
  components: {
    swiper,
    swiperSlide,
    player

  }
}
</script>
<style lang="stylus" scoped>
#fieldnews
  height 975px
  position relative
  padding-top 40px
  color #a99179
  font-size 14px
  .headerText
    display flex
    justify-content center
    padding-bottom 50px
  .content
    .contentMain
      display flex
      justify-content space-between
      .contentMainLeft
        width 610px
        text-align center
        .firstVideoBox
          height 450px
          display flex
          justify-content center
          align-items center
          background-size 100% 100%
          img
            width 80px
            height 80px
        .firstVideoTitle
          margin 20px 0 40px 0
        .otherVideoBox
          display flex
          justify-content space-between
          li
            .otherVideoItem 
              width 185px
              height 136px
              display flex
              justify-content center
              align-items center
              background-size 100% 100%
              img
                width 40px 
                height 40px
      .contentMainRight
        width 354px
        height 710px
      
        

</style>
<style lang="stylus" >
#fieldnews 
  .el-collapse
    border-top 1px solid #4b4034
    border-bottom 1px solid #4b4034
  .el-collapse-item
    .el-collapse-item__header
      background-color #3c332a
      color #a99179
      border-color #a99179
      font-size 18px
      height 60px
      line-height 60px
      padding-left 40px
      padding-right 10px
    .el-collapse-item__wrap
      background-color #3c332a
      border-bottom 1px solid #4b4034
      .el-collapse-item__content
        background-color #43392f
        padding-bottom 0
        height 400px
        overflow hidden
        padding 0 10px
        .smallItem
          height 50px
          line-height 50px
          border-bottom 1px solid #4b4034
          padding-left 30px
          color #a99179
          cursor pointer
  .articleBox
    .momentDialogArticle
      background-color #43392f
      margin-top 10vh !important
      .el-dialog__body
        min-height 500px
        max-height 800px
        overflow hidden
        .titleBox
          min-height 460px
          max-height 760px
          width 1000px
          padding-right 30px
          
          overflow:auto
          .article
            p
              color #e4d9c5 !important
  .videoBox
    .momentDialog
      margin-top 10vh !important
      background-color #43392f
</style>
