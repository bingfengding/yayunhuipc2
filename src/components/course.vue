<template>
  <div id="course" v-if="isShow">
    <swiper
      class="swiper-container scheduleSwiper4"
      :options="swiperOption4" 
      ref="mySwiper4"
    >
      <swiper-slide
        class="swiper-slide swiper-slide4"
        v-for="(item,index) in items" :key="index"
      >
        <div class="mySwiper1Day">{{item.day}}</div>
      </swiper-slide>
    </swiper>
    <swiper 
      class="swiper-container scheduleSwiper5"
      :options="swiperOption5" 
      ref="mySwiper5">
      <swiper-slide
        class="swiper-slide swiper-slide5"
        v-for="(item,index1) in items" :key="index1"
      >
        <div v-if="item.content">
          <div 
            v-for="(type,index2) in item.content" :key="index2"
            class="mySwiper2Project"
          >
            <div class="mySwiper2ProjectText">
              {{type.item}}

            </div>
            <div class="mySwiperTextTime">
              <div v-for="(textTime,index3) in type.event" :key="index3"
                class="mySwiperTime"
                :class="textTime.status==='1'?'processing':''"
                v-if="type.event!='今日无该项赛事'"
              >
                <div class="mySwiperTitile">{{textTime.event}}</div>
                <div class="mySwiperType" v-if="textTime.status==='2'">{{textTime.startdate}}未开始</div>
                <div class="mySwiperType" v-else-if="textTime.status==='1'">{{textTime.startdate}}进行中</div>
                <div class="mySwiperType" v-else-if="textTime.status==='0'">{{textTime.startdate}}已结束</div>
                <div class="mySwiperType" v-else>今日无赛事</div>
              </div>
 
            </div>
          </div>
        </div>
        <div v-else class="noProject">今日无赛事</div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {getevent} from 'api/home/home'
export default {
  data(){
    return {
      isShow:true,
      swiperOption4:{
        //loop:true,
        slideToClickedSlide:true,
        centeredSlides:true,
        slidesPerView: 3,
        initialSlide :2,
        //loopAdditionalSlides : 4,
        bulletElement:"div",
        slidesPerGroup:1,
        //mousewheel: true,

      },
      swiperOption5:{
        
        //loop:true,
        slidesPerGroup:1,
        initialSlide :2,
        //slidesPerView: 1,
        //mousewheel: true,
      },
      temporarySave:[],
      items:[
        {
          day:"8月11日",
          content:[
            {
              item:"电子竞技",
              event:[
                {
                  id:1,
                  status:"1",
                  event:"",
                  startdate:"",
                }
              ]
            },
          ]
        },
     

      ]
    }
  },
  created(){

  this.dbFuc()

  },
  methods:{
    async dbFuc(){
      let _arr = []
      await this.event(0,_arr)

      await this.event(1,_arr)
      await this.event(2,_arr)
      await this.event(3,_arr)
      await this.event(4,_arr)
    
      await this.event(5,_arr)
      await this.event(6,_arr)
      this.items = _arr
      // console.log(this.items)
      this.$nextTick(()=>{
        this.swiper4.slideTo(3)
        this.swiper5.slideTo(3)
    
      })
      
    },
    event(i,arr){
      let _date = new Date()
     return getevent({
        event_time:Date.parse(_date)/1000+24*3600*(-3+i)
      }).then(
      res=>{
        let _obj = {}
        let  day = ""
        if(_date.getDate()-3+i<=31){
          day = ( _date.getMonth()+1)+"月"+(_date.getDate()-3+i)+"日"
        }else{
          day = ( _date.getMonth()+2)+"月"+(_date.getDate()-3+i-31)+"日"
        }
        _obj = {
          index:i,
          day,
          content:res.data.data
        }
        arr.push(_obj)
        
      })
    }
  },
  mounted(){
   this.swiper4.controller.control = this.swiper5;
  this.swiper5.controller.control = this.swiper4;
  },
  computed: {
    swiper4() {
    return this.$refs.mySwiper4.swiper

    },
    swiper5() {
      return this.$refs.mySwiper5.swiper
    },
  },
  components: {
    swiper,
    swiperSlide,
  }
}
</script>
<style lang="stylus" scoped>
#course
  width 100%
  height 100%
  .scheduleSwiper4
    height 80px
    color #4b3219
    background-color #161310
    .swiper-slide4
      text-align center
      line-height 80px
      font-size 24px
      cursor pointer
    .swiper-slide4.swiper-slide-active
      color #7d5224
  .scheduleSwiper5
    height 480px
    font-size 18px
    color #a99179
    background-image url("../assets/schedule/schedule_04.png")
    background-size 100% 100%
    .swiper-slide5
      text-align center
      .noProject
        width 100%
        height 100%
        font-size 40px

      .mySwiper2Project:nth-of-type(2n)
        background-color #3c332a
      .mySwiper2Project:nth-of-type(2n+1)
        background-color #43392f
      .mySwiper2Project
        display flex
        justify-content flex-start
        .mySwiper2ProjectText
          width 157px
          height 80px
          line-height 80px
        .mySwiperTextTime
          width 843px
          height 80px
          line-height 80px
          display flex
          justify-content space-between
          .mySwiperTime
            min-width 281px
            width 100%
            padding-top 10px
            .mySwiperTitile
              line-height 20px
              font-size 14px
            .mySwiperType
              line-height 20px
              font-size 14px
          .processing
            background url("../assets/schedule/schedule_01.png") no-repeat 
            background-size 100% 100%
            color #161310
          
         
        
</style>

