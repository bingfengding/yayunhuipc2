<template>
  <div id="moment">
    <div class="headerText">
     <img src="../assets/moment/moment_text.png" alt="">
   </div>
   <div class="content">
     <el-row class="header">
        <el-col 
          :span="4" 
          v-for="(item,index) in items" :key="index" 
          @click.native="changeTab(index,item.id)"
          class="pointer textCen"
          :class="chooesId===index?'activeTab':''"
        >
          {{item.item}}
        </el-col>
      </el-row>
      <div class="contentMain">
        <ul>
          <li v-for="(item,index) in items[chooesId].video" :key="index" class="item" >
            <div>
              <div class="videoBoxImg pointer" 
              :style="{backgroundImage: 'url('+domain + item.image + ')'}"
              @click="openVideo(index,item.id)"
              >
                <img src="../assets/moment/player.png" alt="">
              </div>
              <div class="videoBoxText">
                <p class="textCen">{{item.title}}</p>
              
              </div>
            </div>
          </li>
        </ul>
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
   </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import  player  from './player'
import {getvideo} from 'api/home/home'
export default {
  data(){
    return {
      videoUrl:"http://45.112.214.90/6773D4E84F83B81B09CC73446F/03000A05005B7232786CA2C497F2E985F383CD-B2AF-4CA9-A32D-9637843BFC88.mp4?ccode=0502&duration=392&expire=18000&psid=e860d48a3bd00dbac0c3f2f3741d3800&ups_client_netip=de7f83fb&ups_ts=1534496762&ups_userid=&utid=%2BX39E1X%2FzRgCAd5%2Fg%2FsMILDP&vid=XMzc3OTQzMTAyNA%3D%3D&vkey=A41d4ada97135c86f2fed68e3da23204c",//视频链接
      state:false,//关闭赋值
      dialogVisible:false,
      chooesId:0,//选择标签的对应位置
      headerText:[
        {
          value:"电子竞技",id:1
        },{
          value:"网球",id:2
        },{
          value:"羽毛球",id:3
        },{
          value:"田径",id:4
        },{
          value:"格斗",id:5
        },{
          value:"其他",id:6
        },
      ],
      domain:"",
      items:[
        {
          id :1,
          item:"电子竞技",
          video:[{
            ag_items_id:1,
            image:"",
            title:"",
            url:""
          },{
            ag_items_id:2,
            image:"",
            title:"",
            url:""
          }],
         
        },{
          id :1,
          item:"电子竞技",
          video:[{
            ag_items_id:1,
            image:"",
            title:"",
            url:""
          },{
            ag_items_id:2,
            image:"",
            title:"",
            url:""
          }],
         
        }
       
      ]
    }
  },
  created(){
    getvideo().then(res=>{
      this.domain = res.data.data.domain
      let _base = res.data.data.videoList
      this.items = _base
    })
    this.initial()
  },
  methods:{
    initial(){

    },

     changeTab(index,id){
      this.chooesId = index;
    },

    openVideo(index,id){
      this.dialogVisible = true
      this.videoUrl = this.items[this.chooesId].video[index].url
      // console.log(this.videoUrl)
      this.state = false
    },
    closePlay(){

      this.state = true
      // console.log(this.state)
      
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
#moment
  height 975px
  position relative
  padding-top 40px
  .headerText
    display flex
    justify-content center
    padding-bottom 50px
  .content
    .header
      height 60px
      .el-col
        background-color #161310
        height 100%
        font-size 18px
        color #7d5224
        line-height 60px
      .el-col.activeTab
        background-color #0b0907
        background-image url("../assets/guessing/guessing_01.png")
        background-repeat no-repeat
        background-size 100% 100%
    .contentMain
      min-height 500px
      margin-top 60px
      background url("../assets/schedule/schedule_04.png") no-repeat
      background-size cover
      ul
        .item
          display inline-flex
          margin-right 20px
          color #a99179
          font-size 14px
          margin-bottom 40px
          .videoBoxImg 
            width 235px
            height 173px
            background-repeat no-repeat
            background-size cover
            display flex
            justify-content center
            align-items center
            img
              width 40px
              height 40px
          .videoBoxText
            display flex
            justify-content center
            padding-top 10px
            p
              line-height 24px
              width 146px
        .item:nth-of-type(4n)
          margin-right 0

          
</style>
<style lang="stylus">
#moment
  .momentDialog
    background-color transparent
    .el-dialog__header
      padding 0
      .el-dialog__headerbtn
        top 10px
        right 10px
        .el-dialog__close
          width 40px
          height 40px
          font-size 40px
          color #675441
    .el-dialog__body
      padding 40px 100px
      //height 684px
      position relative
      color #a99179
      font-size 18px
      
</style>
