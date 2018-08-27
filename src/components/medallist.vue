<template>
  <div id="medallist">
   <div class="headerText">
     <img src="../assets/medallist/medallist_01.png" alt="">
   </div>
    <div class="content">
      <div class="contentHeader textCen">
        <div class="ranking num">排名</div>
        <div class="country">国家</div>
        <div class="all">总奖牌数</div>
        <div class="gold">金牌</div>
        <div class="silver">银牌</div>
        <div class="copper">铜牌</div>
      </div>
      <div class="contentMain">
        <swiper
        class = "swiper-container" 
        :options = "swiperOption" 
        ref = "mySwiper"
        >
        <swiper-slide v-for="(value,key) in nowItem" :key="key">
          <ul>
            <li v-for="(item,index) in value" :key="index" class="contentItem" v-show="item.country[0]">
            <div class="num">
              {{ 9> index+key*10   ? '0'+(index+key*10+1):index+key*10+1 }}
              </div>
            <div class="contentCountry country">
              <img :src="item.domain+item.country[0].image" alt="" v-show="item.country[0]">
              <span>{{item.name}}</span>
            </div>
            <div class="all">{{item.total}}</div>
            <div class="gold">{{item.gold}}</div>
            <div class="silver">{{item.silver}}</div>
            <div class="copper">{{item.copper}}</div>
          </li>
          </ul>
        </swiper-slide>
          
        </swiper>
        <!-- <div class="swiper-button-prev swiper-button-prev1"></div>
        <div class="swiper-button-next swiper-button-next1"></div> -->
      </div>   
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {getagmedaltable} from 'api/home/home'
export default {
  data(){
   return{
     domain:"",
     swiperOption:{
        direction:"vertical",
        mousewheel: true,
      // 如果需要分页器
      //pagination: '.swiper-pagination',
      // 如果需要前进后退按钮
      // navigation: {
      //     nextEl: '.swiper-button-next1',
      //     prevEl: '.swiper-button-prev1',
      //   },
      //   on: {
      //     slideChangeTransitionEnd: function(){
      //       if(this.isEnd){
      //         this.navigation.$nextEl.css('display','none');
      //       }else{
      //         this.navigation.$nextEl.css('display','block');
      //       }
      //     },
      //     slideChangeTransitionStart:function(){
      //       if(this.isBeginning){
      //         this.navigation.$prevEl.css('display','none');
      //       }else{
      //         this.navigation.$prevEl.css('display','block');
      //       }
      //     }
      //   },
      },
     nowItem:[[
       {
        domain:"",
        country:[{
          cn:"韩国",
          image:require("../assets/schedule/country_01.png")
        }],
        total:46,
        gold:18,
        silver:22,
        copper:6,
       }
        
          ]
       
        
        
        ],
    
   }
  },
  created(){
    getagmedaltable().then(res=>{
      let _baseArr = res.data.data
      let _len = _baseArr.length
      let _arr = []
      let _type = Math.ceil(_len/10)

      if(_type<=1){
        _arr.push(_baseArr)
      }else{
        for(let i = 0; i < _type; i++){
        _arr.push(_baseArr.slice(i*10,(i+1)*10))
      }
      }
      this.nowItem = _arr
      console.log(this.nowItem)
      
    })
    this.Initialization()
   
  
  },
  mounted(){},
  methods:{
    Initialization(){
    },
  },
  components: {
    swiper,
    swiperSlide,

  }

}
</script>
<style lang="stylus" scoped>
#medallist
  height 975px
  position relative
  padding-top 40px
  .headerText
    display flex
    justify-content center
    padding-bottom 50px
  .content
    .contentHeader
      background-color #161310
      line-height 80px
      height 80px
      display flex
      justify-content space-around
      padding 0 20px
      color #7d5224
      font-size 18px
    .contentMain
      position relative
      .swiper-container
        height 600px
        overflow hidden
        .swiper-slide
          width 100%
          height 600px
          background url("../assets/schedule/schedule_04.png") no-repeat 100% 100%
        .contentItem
          display flex
          justify-content space-around
          padding 0 20px
          color #a99179
          font-size 18px
          width 100%
          height 60px
          line-height 60px
          text-align center
          .contentCountry
            line-height 60px
            // display flex
            // justify-content center
            img
              width 40px
              height @width
              vertical-align middle
            span
              display inline-block
              vertical-align middle
              padding-left 18px
          .ranking:nth-of-type(1)
            color #feb650
      .contentItem:nth-of-type(2n+1)
        background-color #43392f
      .contentItem:nth-of-type(2n)
        background-color #3c332a
      .contentItem:nth-of-type(1)
        .num
          color #feb650
      .contentItem:nth-of-type(2)
        .num
          color #feb650
      .contentItem:nth-of-type(3)
        .num
          color #feb650
    .num
      min-width 70px
      font-size 24px
      font-weight bold
    .country
      min-width 120px
    .all
      min-width 100px
    .gold
      min-width 100px
    .silver
      min-width 100px
    .copper
      min-width 100px
    .swiper-button-prev.swiper-button-prev1
      // display none
      // right -40px !important
      // left auto
      // background url("../assets/schedule/up.png") no-repeat 100% 100%
      // width 24px
      // height 17px
      // top 40%
      // outline-width 0
      background url("../assets/warteam/left.png")
      outline-width 0
      left -80px
      top 50%
    .swiper-button-next.swiper-button-next1
      //display none
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

