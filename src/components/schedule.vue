<template>
  <div id="schedule">
    <div class="header">
      <div class="nowEvent textCen pointer" :class="active == 1? 'colorFFF' : ''" @click="changeLabel(1)">{{header[0].title}}</div>
      <img src="../assets/schedule/schedule_02.png" alt="">
      <div class="scheduleArrange textCen pointer" :class="active == 2? 'colorFFF' : ''"  @click="changeLabel(2)">{{header[1].title}}</div>
      <img src="../assets/schedule/schedule_02.png" alt="">
      <div class="countries textCen pointer" :class="active == 3? 'colorFFF' : ''"  @click="changeLabel(3)">{{header[2].title}}</div>
    </div>
    <div class="text">
      <img src="../assets/schedule/schedule_03.png" alt="">
    </div>
    <div class="content nowEventContent" v-show="active===1">
      <course></course>
    </div>

    <div class="content scheduleArrangeContent" v-show="active===2">
      <div class="scheduleArrangeHeader">
        <div class="font24 scheduleArrangeHeaderLeft">项目名称</div>
        <div class="font24 scheduleArrangeHeaderRight textCen">金牌看点</div>
      </div>
      <div class="scheduleArrangeMain">
        <swiper 
          class="swiper-container scheduleSwiper1" 
          id="scheduleSwiper1"
          :options="swiperOption1"
          ref="mySwiper">
          <swiper-slide class="swiper-slide1" v-for="(item,index) in scheduleArrangeMain" :key="index">
            <ul>
              <li v-for="value in item" :key="value.id">
                <div class="scheduleArrangeMainLeft">{{value.item}}</div>
                <div class="scheduleArrangeMainRight">{{ value.schedule[0].content}}</div> 
         
              </li>
            </ul>
          </swiper-slide>  
        </swiper>
        <!-- <div class="swiper-button-prev swiper-button-prev1"></div>
        <div class="swiper-button-next swiper-button-next1"></div> -->
      </div>
    </div>
    <div class="content countriesContent" v-show="active===3">
       <swiper 
        class="swiper-container2 scheduleSwiper2" 
        id="scheduleSwiper2"
        :options="swiperOption2" 
       >
          <!-- <div class="swiper-wrapper swiper-wrapper2"> -->
            <swiper-slide class="swiper-slide swiper-slide2" v-for="(item,index) in country" :key="index">
              <ul>
                <li v-for="value in item" :key="value.id">
                  <div>
                    <img :src="baseUrl+value.image" alt="">
                  <div class="countriesContentText">{{value.cn}}</div>
                  </div>
                  
                </li>
              </ul>
              
            </swiper-slide>
            
          <!-- </div> -->
    
        </swiper>
        <!-- <div class="swiper-button-prev swiper-button-prev2"></div>
        <div class="swiper-button-next swiper-button-next2"></div> -->
    </div>
  </div>  
</template>
<script>
import Swiper from 'swiper'
import course from './course'
import {getevent,getschedule,getcountry} from 'api/home/home'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data(){
    return{
      
      swiperOption1:{
        direction:"vertical",
        mousewheel: true,
        // navigation: {
        //   nextEl: '.swiper-button-next1',
        //   prevEl: '.swiper-button-prev1',
        // },
        // on: {
        //   slideChangeTransitionEnd: function(){
        //     if(this.isEnd){
        //       this.navigation.$nextEl.css('display','none');
        //     }else{
        //       this.navigation.$nextEl.css('display','block');
        //     }
        //   },
        //   slideChangeTransitionStart:function(){
        //     if(this.isBeginning){
        //       this.navigation.$prevEl.css('display','none');
        //     }else{
        //       this.navigation.$prevEl.css('display','block');
        //     }
        //   }
        // },
      },
      swiperOption2:{
        direction:"vertical",
        mousewheel: true,
        // navigation: {
        //   nextEl: '.swiper-button-next2',
        //   prevEl: '.swiper-button-prev2',
        // },
        // on: {
        //   slideChangeTransitionEnd: function(){
        //     if(this.isEnd){
        //       this.navigation.$nextEl.css('display','none');
        //     }else{
        //       this.navigation.$nextEl.css('display','block');
        //     }
        //   },
        //   slideChangeTransitionStart:function(){
        //     if(this.isBeginning){
        //       this.navigation.$prevEl.css('display','none');
        //     }else{
        //       this.navigation.$prevEl.css('display','block');
        //     }
        //   }
        // },
      },
    
      header:[
        {title:"今日赛事"},
        {title:"赛程安排"},
        {title:"参赛国家"},
      ],
      baseUrl:"",
      active:1,
      scheduleArrangeMain:[
        [
          {
            item:"英雄联盟",
            id:1,
            schedule:[
              {content:"1",ag_items_id:1}
            ],
          },
        {
          item:"英雄联盟",
          id:2,
        schedule:[
          {content:"2",ag_items_id:2
          }
        ],}],[{
          item:"英雄联盟",
          id:1,
        schedule:[
          {content:"3",ag_items_id:1}
        ],},
        {
          item:"英雄联盟",
          id:2,
        schedule:[
          {content:"4",ag_items_id:2
          }
        ],}]
        
        
      ],
      country:[
        [{image:require("../assets/schedule/country_01.png"),cn:"中国",id:1},{image:require("../assets/schedule/country_01.png"),cn:"中国",id:2},{image:require("../assets/schedule/country_01.png"),cn:"中国",id:3}],
       
       ]
    }
  },
  created(){
    getschedule().then(res=>{
      let _baseArr = res.data.data
      let _len = _baseArr.length
      let _arr = []
      let _arr2 = []
      
      _baseArr.forEach(element => {
        let _obj = {}
        if(element.schedule.length) {
          _arr2.push(element)
        }else{
          // console.log(element)
          _obj = {
            id:element.id,
            item:element.item,
            schedule:[
              {content:"该赛事暂无赛程安排",ag_items_id:1}
            ]
          }
          _arr2.push(_obj)
          // console.log(_arr2)
        }
      });
      let _type = Math.ceil(_len/6)
      for(let i = 0; i < _type; i++){
        _arr.push(_arr2.slice(i*6,(i+1)*6))
      }
      this.scheduleArrangeMain = _arr
      //console.log(_arr)

    })
    getcountry().then(res=>{
      let _baseArr = res.data.data[0].agcountry
      let _len = _baseArr.length
      let _arr = []
      let _type = Math.ceil(_len/30)
      for(let i = 0; i < _type; i++){
        _arr.push(_baseArr.slice(i*30,(i+1)*30))
      }
      this.baseUrl = res.data.data[0].domain
      this.country = _arr
    })
  },
  mounted(){
    this.Initialization()
    
  },
  methods:{
    Initialization(){
           
    },
   
    changeLabel(index){
      if (index !== this.active) {
        this.active = index
      }
      if(index==2){
       
      }
      
    }
  },
  components: {
      swiper,
      swiperSlide,
      course

    }
}
</script>
<style lang="stylus" scoped>
#schedule
  height 975px
  position relative
  padding-top 206px
  
  .header
    width 100%
    height 110px
    display flex
    justify-content center
    background-image url("../assets/schedule/schedule_header.png")
    background-size 100% 100%
    position absolute
    top 66px
    >div
      width 282px
      line-height 110px
      color #7d5224
      &.colorFFF
        color #ffffff
      &:hover
        color #ffffff
    img
      height 70px
      margin-top 20px
  .text
    display flex
    justify-content center
    align-content center
    margin-bottom 55px
  .content
    height 560px
  .scheduleArrangeContent
    position relative
    .scheduleArrangeHeader
      height 80px
      background-color #161310
      color #7D5224
      padding 0 40px
      line-height 80px
      display flex
      justify-content flex-start
      .scheduleArrangeHeaderLeft
        width 240px
      .scheduleArrangeHeaderRight

        width 600px
    .scheduleArrangeMain
      .scheduleSwiper1
        width 100%
        height 480px
        .swiper-slide1
          width 100%
          height 100%
          background url("../assets/schedule/schedule_04.png") no-repeat 100% 100%
          ul
            li
              height 80px
              font-size 18px
              color #a99179
              padding 0 40px
              display flex
              justify-content flex-start
              .scheduleArrangeMainLeft
                width 240px
                line-height 80px
              .scheduleArrangeMainRight
                display flex
                align-items center
                width 600px
                overflow hidden
                font-size 14px
                line-height 20px
            li:nth-of-type(2n)
              background-color #3c332a
            li:nth-of-type(2n+1)
              background-color #43392f
      .swiper-button-prev.swiper-button-prev1
       
        // right -40px !important
        // left auto
        // background url("../assets/schedule/up.png") no-repeat 100% 100%
        // width 24px
        // height 17px
        // top 50%
        // outline-width 0
        background url("../assets/warteam/left.png")
        outline-width 0
        left -80px
        top 50%
      .swiper-button-next.swiper-button-next1
   
        // right -40px !important
        // left auto
        // width 24px
        // height 17px
        // top 80%
        // background url("../assets/schedule/down.png")
        // outline-width 0
        background url("../assets/warteam/right.png")
        outline-width 0
        right -80px
        top 50%
  .countriesContent
    position relative
    .scheduleSwiper2
      width 100%
      height 560px
      background url("../assets/schedule/schedule_04.png") no-repeat 100% 100%
      overflow hidden
      .swiper-wrapper
        height 100%
      .swiper-slide2
        width 100%
        height 560px
        ul
          height 560px
          li
            display inline-block
           
            >div
              width 195px
              height 88px
              background-color #43392f
              padding 14px 0 14px 24px
              display flex
              justify-content flex-start
              margin 0 5px 5px 0
              img
                width 60px
                height 60px
              .countriesContentText
                height 100%
                padding-left 25px
                display flex
                align-items center
                color #a99179
                font-size 18px
    .swiper-button-prev.swiper-button-prev2
  
        // right -40px !important
        // left auto
        // background url("../assets/schedule/up.png") no-repeat 100% 100%
        // width 24px
        // height 17px
        // top 50%
        // outline-width 0
        background url("../assets/warteam/left.png")
        outline-width 0
        left -80px
        top 50%
      .swiper-button-next.swiper-button-next2
      
        // right -40px !important
        // left auto
        // width 24px
        // height 17px
        // top 80%
        // background url("../assets/schedule/down.png")
        // outline-width 0
        background url("../assets/warteam/right.png")
        outline-width 0
        right -80px
        top 50%
</style>
