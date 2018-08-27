<template>
  <div id="warteam">
    <div class="headerText">
     <img src="../assets/warteam/warteam_header.png" alt="">
   </div>
   <div class="content">
      <div class="contentMain">
        <swiper
          class="swiper-container scheduleSwiper1"
          :options="swiperOption1" 
          ref="mySwiper"
        >
          <swiper-slide
            class="swiper-slide swiper-slide1"
            v-for="(item,index) in gameTypes" :key="item[0].group_id"
          >
          <div class="gameFlag">
            <img :src="item[0].domain+item[0].groupitem_image" alt="">
            </div>
          <div class="slideFlag">
            <div v-for="value in item[0].groupitem" :key="value.country_id" class="flag pointer" @click="playerInfo(item[0].group_id,value.country_id,index)">
              <img :src="item[0].domain+value.country_image" alt="">
              <div class="slideFlagBoxNum">
                0{{index+1}}
              </div>
            </div> 
          </div>
          </swiper-slide>
       </swiper>
      <div class="swiper-button-next swiper-next1 "></div>
      <div class="swiper-button-prev swiper-prev1 "></div>
     </div>
   </div>
   <el-dialog
        :show-close = "false"
        :visible.sync="dialogVisible"
        width="1000px"
        custom-class = "warteamDialog"
      >
      <div class="dialogFlag">
        <img :src="domain+infoItems.agCountry[0].image" alt="">
        <div class="flagFrom">
          0{{isShow}}
        </div>
      </div>
      <swiper
          class="swiper-container scheduleSwiper2"
          :options="swiperOption2" 
          ref="mySwiper2"
        >
          <swiper-slide
            class="swiper-slide swiper-slide2"
            v-for="(item,index) in infoItems.memberList" :key="index"
          > 
          <div class="contentLayout">
            <div class="contentLayoutBg"><img :src="domain+item.member_image" alt=""></div>
            <div>
            <div class="gameLogo">
              <img :src="domain+infoItems.agEsportsCategory[0].cate_image" alt="">
              <span>{{infoItems.agEsportsCategory[0].cate_name}}</span>
            </div>
            <div class="font24">{{item.member_name}}</div>
            <div>专业特长：{{item.member_professional}}</div>
            
            <div class="teamWhere">所属运动队：{{item.team_name}}</div>
            <div>战队内位置：{{item.member_tposition}}</div>
            <div>
              <p>主要成就：</p>
              <p v-for="value in item.contents" :key="value.id" style="width:300px">
                {{value}}
              </p>
            </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <swiper 
        class="swiper-container scheduleSwiper3"
        :options="swiperOption3" 
        ref="mySwiper3">
        <swiper-slide
          class="swiper-slide swiper-slide3"
          v-for="(item,index) in infoItems.memberList" :key="index"
        >
          <div class="mySwiper3Item">
            <div class="mySwiper3ImgBox"><img :src="domain+item.headimage" alt=""></div>
          </div>
          <p>{{item.abbrname}}</p>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next swiper-next2 "></div>
      <div class="swiper-button-prev swiper-prev2 "></div>
      <!-- <div class="pagination">
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </div> -->
</el-dialog>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {getesportsteam,getesportsmember} from 'api/home/home'
export default {
  data(){
    return {
      isShow:1,
      dialogVisible:false,
      domain:"",
      swiperOption1:{
        slidesPerView: 1,
        mousewheel: true,
        // 如果需要前进后退按钮
        navigation: {
        nextEl: '.swiper-next1',
        prevEl: '.swiper-prev1',
        },
        
      },
      swiperOption2:{
        //loop:true,
        mousewheel: true,
        slidesPerView: 1,
        initialSlide :0,
        loopAdditionalSlides: 4,
        bulletElement:"div", 
        // 如果需要前进后退按钮
        navigation: {
          nextEl: '.swiper-next2',
          prevEl: '.swiper-prev2',
        },
      },
      swiperOption3:{
        //autoplay:true,
        slideToClickedSlide:true,
        //loop:true,
        //initialSlide :0,
        slidesPerView: 5,
        //loopAdditionalSlides: 4,
        centeredSlides:true
      },
      gameTypes:[
        [{
          domain:"",
          group:"英雄联盟",
          group_id:1,
          groupitem_image:"",
          groupitem:[
            {
              country_name:"中国",
              country_id:1,
              country_image:require("../assets/schedule/country_01.png"),
            },
            {
              country_name:"中国",
              country_id:2,
              country_image:require("../assets/schedule/country_01.png"),
            },{
              country_name:"中国",
              country_id:3,
              country_image:require("../assets/schedule/country_01.png"),
            },{
              country_name:"中国",
              country_id:4,
              country_image:require("../assets/schedule/country_01.png"),
            },{
              country_name:"中国",
              country_id:5,
              country_image:require("../assets/schedule/country_01.png"),
            },
          ]
        }], 
         
      ],
      infoItems:{
        agCountry:[{
          cn:"",
          image:""
        }],
        agEsportsCategory:[
          {
            cate_name:"",
            cate_image:""
          }
        ],
        memberList:[
          {
            abbrname:"",
            content:"",
            content1:"",
            content2:"",
            content3:"",
            content4:"",
            contents:[
              
            ],
            headimage:"",
            member_image:"",
            member_name:"",
            member_professional:"",
            member_tposition:"",
            team_name:""
          },
          
        ],






        

        
      }
    }
  },
  created(){
    getesportsteam().then(res=>{
      let _base = res.data.data
      this.gameTypes = _base;
    })
    
  },
  mounted(){
      
     
   
  },
  methods:{
    playerInfo (game,country,index) {
      // console.log(game,country)
      this.isShow = index+1
      getesportsmember({
        group_id:game,
        country_id:country
      }).then(res=>{
        let _base = res.data.data
        this.domain = _base.domain
        this.infoItems = _base 
        // console.log(_base)
        // console.log(this.infoItems)

      })
      this.dialogVisible = true
      this.$nextTick(() => {
        this.swiper2.controller.control = this.swiper3;
        this.swiper3.controller.control = this.swiper2;
        //this.dialogVisible=false
        })
    },
  },
  computed: {
      swiper2() {
      //console.log(3)
      return this.$refs.mySwiper2.swiper
       
    
      },
      swiper3() {
        //console.log(4)
        return this.$refs.mySwiper3.swiper
   
      },
    },

  watch:{
    // swiper2(){
    //   // if(this.swiper2){
    //   //   this.swiper2.controller.control = this.swiper3;
    //   //   this.swiper3.controller.control = this.swiper2;
    //   // }
    // }
  },
  components: {
    swiper,
    swiperSlide,

  }
}
</script>
<style lang="stylus" scoped>
#warteam
  height 975px
  position relative
  padding-top 40px
  
  .headerText
    display flex
    justify-content center
    padding-bottom 20px
  .content
    display flex
    justify-content center
    .contentMain
      width 900px
      .swiper-next1
        background url("../assets/warteam/right.png")
        outline-width 0
        right -20px
      .swiper-prev1
        background url("../assets/warteam/left.png")
        outline-width 0
        left -20px
      .scheduleSwiper1
        padding-top 100px
        .swiper-slide1
          height 500px
          position relative
          .gameFlag
            position absolute
            left 50%
            margin-left -200px
            top -100px
            z-index 100
            img
              width 400px
              max-height 240px
              height auto
          .slideFlag
            display flex
            justify-content space-between
            .flag
              width 120px
              height 350px
              background url("../assets/warteam/warteam_bar.png") no-repeat 100% 100%
              display flex
              justify-content center
              align-items center
              position relative
              img
                width 50px
                height 50px
              .slideFlagBoxNum
                position absolute
                top 16px
                left 32px
                width 56px
                height 68px
                background url("../assets/warteam/lolform.png") no-repeat 
                background-size 100% 100%
                font-size 24px
                text-align center
                line-height 56px
            .flag:nth-of-type(2n)
              margin-top 75px
            .flag:nth-of-type(3)
              margin-top 150px
  .warteamDialog
    .scheduleSwiper2
      .swiper-slide2
        height 100%
        .contentLayout
          display flex
          justify-content space-between
          line-height 26px
          .contentLayoutBg
            padding 20px 0 0 100px
            img
              width 290px
              height 400px
          .gameLogo
            padding-bottom 30px
            img
              width 200px
              height auto
              vertical-align middle
          .font24
            padding-bottom 10px
            line-height 30px
          .teamWhere
            padding-bottom 10px
    .scheduleSwiper3
      margin-top 64px
      .swiper-slide3
        text-align center
        
        .mySwiper3Item
          
          display flex
          justify-content center
          .mySwiper3ImgBox
            cursor pointer
            border 1px solid transparent 
            border-radius 50%
            width 102px
            height 102px
            img
              width 100px
              height 100px 
        p
          padding-top 10px
      .swiper-slide-active
        .mySwiper3Item
         .mySwiper3ImgBox
            border 1px solid #ffffff

</style>
<style lang="stylus">
#warteam
  .warteamDialog
    background-color #43392f
    
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
      height 684px
      position relative
      color #a99179
      font-size 18px
      .swiper-next2
        z-index 40
        right 50px
        outline-width 0
        background-image url("../assets/warteam/rightbutton.png")
        top 85%
      .swiper-prev2
        z-index 40
        left 50px
        outline-width 0
        background-image url("../assets/warteam/leftbutton.png")
        top 85%
      .dialogFlag
        position absolute
        top 0
        left 0
        width 120px
        height 356px
        background-repeat no-repeat
        background-size 100% 100%
        background-image url("../assets/warteam/warteam_bar.png")
        display flex 
        justify-content center 
        align-items center
        z-index 30
        img
          width 60px
          height 60px
        .flagFrom
          position absolute
          top 16px
          left 32px
          width 56px
          height 68px
          background url("../assets/warteam/lolform.png") no-repeat
          background-size 100% 100%
          display flex 
          justify-content center
          line-height 56px
          color #302b25
</style>
