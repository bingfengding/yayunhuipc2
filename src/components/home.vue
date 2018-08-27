<template>
  <div id="home">
    <div class="header d_jump" :style="headerStyle">
      <div class="wanbo"><img src="../assets/home/menbetx.png" alt=""></div>
      <div class="wanbo2"><img src="../assets/home/theAsianGames.png" alt=""></div>
      
    </div>
    <div class="main" ref="listView">
      <ul class="main-body">
        <li  class="list-group d_jump schedule" ref="listGroup">
          <div class="center">
           <schedule></schedule>
           
          </div>
        </li>
        <!-- 需要隐藏的 -->
        <!-- <li  class="list-group d_jump guessing" 
        ref="listGroup">
          <div class="center">
            <guessing></guessing>
           
          </div>
        </li> -->

        <li  class="list-group d_jump medallist" ref="listGroup">
          <div class="center">
            <medallist></medallist>
          </div>
        </li>
        <li  class="list-group d_jump warteam" ref="listGroup">
          <div class="center">
            <warteam></warteam>
         
          </div>
        </li>

        <li  class="list-group d_jump moment" ref="listGroup">
          <div class="center">
            <moment></moment>
         
          </div>
        </li>

        <li  class="list-group d_jump preferential" ref="listGroup">
          <div class="center">
            <preferential></preferential>
         
          </div>
        </li>
        

      <li  class="list-group d_jump fieldnews" ref="listGroup">
          <div class="center">
            <fieldnews></fieldnews>
            
          </div>
        </li>

      </ul>
        <transition name="el-fade-in">
          <div class="list-shortcut" v-show="isShow">
            <div class="step">
              <left-step :steps="steps"></left-step>
            </div>
        </div>
        </transition>
        <transition name="el-fade-in">
        <div @click="goTop" class="goTop" v-show="isTopShow">
          <img src="../assets/home/gotoUp.png" alt="">
        </div>
        </transition>
    </div> 
  </div>
</template>
<script>
import leftStep from './public/steps.vue'
import schedule from './schedule'
import guessing from './guessing'
import medallist from './medallist'
import warteam from './warteam'
import moment from "./moment"
import preferential from "./preferential"
import fieldnews from "./fieldnews"
import {getbanner} from "api/home/home"
  export default {
    data() {
      return {
        headerStyle:{
          background:"url(" + require("../assets/home/home_banner.png") + ")"
        },
        isTopShow:false,
        isShow:false,
        steps:{
          active:0,
          step: [
            {title:"背景图"},
            {title:"赛程安排"},

            // {title:"比赛竞猜"},
            {title:"奖牌榜"},
            {title:"电竞战队"},

            {title:"精彩时刻"},
            {title:"优惠活动"},
            {title:"赛场新闻"}
          ]
        },
      }
    },
    created(){
      getbanner().then(res=>{
        let _banner = res.data.data.agBannerList[0].image
        let _baseUrl = res.data.data.domain
        this.headerStyle.background = "url("+_baseUrl + _banner + ")"
      })
    },

    computed: {

      
    },
     watch: {
    
      
    },
    mounted() {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll)
      })
    },
    methods: {
      jump (index) {
        // 用 class="d_jump" 添加锚点
        let jump = document.querySelectorAll('.d_jump')
        let total = jump[index].offsetTop
        // console.log('纵坐标', total)
        let distance = document.documentElement.scrollTop || document.body.scrollTop
        // 平滑滚动，时长500ms，每10ms一跳，共50跳
        let step = total / 50
        if (total > distance) {
          smoothDown()
        } else {
          let newTotal = distance - total + 100
          step = newTotal / 50
          smoothUp()
        }
        function smoothDown () {
          if (distance < total) {
            distance += step
            // Firefox
            document.documentElement.scrollTop = distance
            // Chrome
            document.body.scrollTop = distance
            setTimeout(smoothDown, 10)
          } else {
            document.documentElement.scrollTop = total
            document.body.scrollTop = total
            window.pageYOffset = total
          }
        }
        function smoothUp () {
          if (distance > total) {
            distance -= step
            // Firefox
            document.documentElement.scrollTop = distance
            // Chrome
            document.body.scrollTop = distance
            setTimeout(smoothUp, 10)
          } else {
            document.documentElement.scrollTop = total
            document.body.scrollTop = total
            window.pageYOffset = total
          }
        }
      },
      goTop(){
       this.jump(0);

      },
      onScroll () {
        let scrolled = document.documentElement.scrollTop || document.body.scrollTop
        //手动获取到各个锚点的距离
        // if (scrolled >= 6825) {
        //   let timer =setTimeout(()=>{
        //     this.steps.active = 7
        //     clearTimeout(timer)
        //   },50)
        //   this.isShow = true
        // } else 
        if (
         //scrolled < 6825 && 
        scrolled >= 5850) {
            this.steps.active = 6
          this.isShow = true
        }else 
         if 
         (
            scrolled < 5850 && 
         scrolled >= 4875) {
        
             this.steps.active = 5
            
           this.isShow = true
         }else 
        if (
         scrolled < 4875 && 
          scrolled >= 3900) {
         
            this.steps.active = 4
          
          this.isShow = true
        } else if (scrolled < 3900 && scrolled >= 2925) {
          
            this.steps.active = 3
           
          this.isShow = true
        } else if (scrolled < 2925 && scrolled >= 1950) {
        
            this.steps.active = 2
         
          this.isTopShow = true
        } else if (scrolled < 1950 && scrolled >= 975) {
         
            this.steps.active = 1
           
          
          this.isTopShow = false
          this.isShow = true
        } else  {
         
            this.steps.active = 0
          
          this.isShow = false
        }
      },
    },
    components: {
      leftStep,
      schedule,
      guessing,
      medallist,
      warteam,
      moment,
      preferential,
      fieldnews
    }
  }
</script>
<style scoped lang="stylus">
#home
  .header
    height 975px
    background-repeat no-repeat !important
    background-size cover !important
    background-position:center center !important;
    padding 60px 100px
    img
      width 100%
      height 100%
    .wanbo
      margin-bottom 50px
      width 270px
      height 130px
    .wanbo2
      width 250px
      height 100px
    
  .main-body
    width 100%
    .list-group
      min-height 350px
      display flex
      justify-content center
      //overflow hidden
      .center
        min-width 1000px
        width 100px
    .schedule
      background-image url("../assets/schedule/schedule_bg.png")
      background-repeat no-repeat
      background-size cover 
      background-position:center center
    .guessing
      background-image url("../assets/guessing/guessing_bg.png")
      background-repeat no-repeat
      background-size cover 
      background-position:center center
    .medallist
      background-image url("../assets/medallist/medallist_bg.png")
      background-repeat no-repeat
      background-size cover 
      background-position:center center
    .warteam
      background-image url("../assets/warteam/warteam_bg.png")
      background-repeat no-repeat
      background-size cover 
      background-position:center center
    .moment
      background-image url("../assets/moment/moment_bg.png")
      background-repeat no-repeat
      background-size cover 
      background-position:center center
    .preferential
      background-image url("../assets/preferential/preferential_bg.png")
      background-repeat no-repeat
      background-size cover 
      background-position:center center
    .fieldnews
      background-image url("../assets/fieldnews/fieldnews_bg.png")
      background-repeat no-repeat
      background-size cover 
      background-position:center center
  .list-shortcut
    position fixed
    right 0
    top 50%
    margin-top -300px
    display inline-block
    z-index 100
  .goTop
    right 92px
    position fixed
    top 50%
    margin-top 300px
    z-index 100
    img
      vertical-align middle
      margin-bottom 4px
      cursor pointer
    
</style>
