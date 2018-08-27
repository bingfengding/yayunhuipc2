<template>
  <div id="guessing">
    <div class="text">
      <img src="../assets/guessing/guessing_text.png" alt="">
    </div>
    <div class="content" v-if="isHave">
      <el-row class="header">
        <el-col 
          :span="4" 
          v-for="(item,index) in items" :key="item.id" 
          @click.native="changeTab(index,item.id)"
          class="pointer textCen"
          :class="chooesId===index?'activeTab':''"
        >
        {{item.item}}
        </el-col>
      </el-row>
      <el-row  class="main">
        <el-col :span="12" v-for="(item,index) in nowItems" :key="index" class="mainItem">
          <div class="mainChind">
            <div class="mainHeader">
              <div class="mainHeaderLeft"> 
                {{item.title}}
              </div>
              <div class="mainHeaderRight"> 
                {{item.startdate}} {{item.starttimes}}
              </div>
            </div>
            <div class="mainSubject">
              <div class="mainSubjectCountry">
                <div class="rateOfSupport">
                  <div class="rateOfSupportIcon"> 
                    <img :src="domain+item.home_flag_image" alt="">
                    <p class="textCen font18">{{item.home_name}}</p>
                  </div>
                 
                  <div class="rateOfSupportValue rateOfSupportValueLeft" v-if="item.status == '0'">
                    <p>{{item.home_support_rate}}%</p>
                    <img v-if="item.rate===1" src="../assets/guessing/guessing_03_3.png" alt="">
                    <img v-else-if="item.rate===2" src="../assets/guessing/guessing_03_2.png" alt="">
                    <img v-else src="../assets/guessing/guessing_03_1.png" alt="">
                  </div>
                </div>
                <div class="mainSubjectVS" >
                  <img src="../assets/guessing/guessing_03.png" alt=""
                  v-show="item.status == '0'"
                  >
                  <div v-show="item.status == '1'">
                    {{item.score}}
                  </div>
                </div>
                
                <div class="rateOfSupport">
                  <div class="rateOfSupportValue rateOfSupportValueRight" v-if="item.status == '0'">
                    <p>{{item.customer_support_rate}}%</p>
                    <img v-if="item.rate===1" src="../assets/guessing/guessing_04_1.png" alt="">
                    <img v-else-if="item.rate===2" src="../assets/guessing/guessing_04_2.png" alt="">
                    <img v-else src="../assets/guessing/guessing_04_3.png" alt="">
                  </div>
                  <div class="rateOfSupportIcon"> 
                    <img :src="domain+item.customer_flag_image" alt="">
                    <p class="textCen font18">{{item.customer_name}}</p>
                  </div>
                  
                </div>
              </div>
               <div class="toBetting pointer" @click="toBetting">
                 <img src="../assets/guessing/guessing_02.png" alt="">
               </div>
            </div>
           
          </div>
        </el-col>
      </el-row>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="4"
          layout="prev, pager, next"
          :total="alltotal">
        </el-pagination>
      </div>
    </div>
    <div class="content" v-else>
      <el-row  class="main">
        <div class="noGuess">今日无赛事</div>
      </el-row>
     
      
    </div>
  </div>
</template>
<script>
import {getguess,getitems} from 'api/home/home'
export default {
  data(){
    return  {
      isHave:true,
      domain:"",
      chooesId:0,//选择标签的对应位置
      alltotal:1,//总数量
      howLenght:1,//分页长度
      currentPage:1,//当前页面
      headerText:[
        {
          item:"电子竞技",id:1
        },{
          item:"网球",id:2
        },{
          item:"羽毛球",id:3
        },{
          item:"田径",id:4
        },{
          item:"格斗",id:5
        },{
          item:"其他",id:6
        },
      ],
      nowItems:{
        domain:"",
        id:1,
        item:"电子竞技",
        schedule:[
          {
            customer_flag_image:"",
            customer_name:"",
            customer_support_rate:0,
            home_flag_image:"",
            home_name:"",
            home_support_rate:0,
            rate:0,
            score:"",
            startdate:"",
            starttimes:"",
            status:"",
            title:""
          }
        ],
      }
      ,
      items:[{
        domain:"",
        id:1,
        item:"电子竞技",
        schedule:[
          {
            customer_flag_image:"",
            customer_name:"",
            customer_support_rate:0,
            home_flag_image:"",
            home_name:"",
            home_support_rate:0,
            rate:0,
            score:"",
            startdate:"",
            starttimes:"",
            status:"",
            title:""
          }
        ],
      },
      {
        domain:"",
        id:3,
        item:"篮球",
        schedule:[
          {
            customer_flag_image:"",
            customer_name:"",
            customer_support_rate:0,
            home_flag_image:"",
            home_name:"",
            home_support_rate:0,
            rate:0,
            score:"",
            startdate:"",
            starttimes:"",
            status:"",
            title:""
          }
        ],
      }],
  
        
      
    }
  },
  created(){
    getguess().then(res=>{
      let _base = res.data.data
      if(_base == "今日无该项赛事"){
        this.isHave = false
      }else {
        this.isHave = true
        this.domain = _base[0].domain
        this.items = _base
        this.Initialization()
      }
      
      
    })
    // getitems().then(res=>{
    //   let _base = res.data.data
    //   console.log(_base)
    //   this.headerText = _base;
    // })
   


  },
  mounted(){},
  methods:{
    Initialization(){
      let _base = this.items[this.chooesId].schedule
      this.alltotal = _base.length
      this.howLenght =  Math.ceil(this.alltotal/4)
      let _arr = []
      if(this.howLenght>1){
        _arr = _base.slice(this.currentPage*4-4,this.currentPage*4)
      }else{
        _arr = _base
      }

     this.nowItems = _arr;
    // console.log(this.nowItems)

    },
    changeTab(index,id){
      this.chooesId = index
      this.Initialization()
      
    },

    toBetting(){
      window.open("http://cn.man257.com/game/index")
    },
    handleCurrentChange(val){
      let _arr = [];
      if(this.howLenght>1){
       
        _arr = this.items.slice(this.currentPage*4-4,this.currentPage*4)
      }
     this.nowItems = _arr;
    },


  }

}
</script>
<style lang="stylus" scoped>
#guessing
  height 975px
  position relative
  padding-top 40px
  .text
    display flex
    justify-content center
    align-content center
    margin-bottom 50px
  .content
    .noGuess
      font-size 40px
      color #7d5224
      text-align center
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
    .main
      padding-top 20px
      min-height 650px
      background url("../assets/schedule/schedule_04.png") no-repeat
      background-size cover
      .mainItem
        .mainChind
          padding-bottom 20px
          .mainHeader
            display flex
            justify-content space-between
            color #a99179
            background-color #352d25
            line-height 50px
            height 50px
            .mainHeaderLeft
              min-width 200px
              width 60%
              font-size 18px
              padding-left 10px
            .mainHeaderRight
              width 40%
              padding-right 10px
              min-width 160px
              font-size 18px
              text-align right 
          .mainSubject
            padding 30px 40px
            background-color #43392f
            .mainSubjectCountry
              display flex
              justify-content space-between
              .mainSubjectVS
                margin 0 30px
                line-height 108px
                color #a99179
                font-size 40px
              .rateOfSupport
                display flex
                justify-content flex-start
                color #a99179
                .rateOfSupportValueLeft
                  padding-top 10px
                  text-align center
                  margin-left -15px
                  img 
                    height 30px
                .rateOfSupportValueRight
                  padding-top 10px
                  text-align center
                  margin-right -15px
                  img 
                    height 30px
                .rateOfSupportIcon
                  z-index 100
                  img
                    width 80px
                    height 80px
            .toBetting
              margin-top 30px
              text-align center
      .mainItem:nth-of-type(2n-1)
        padding-right 10px
      .mainItem:nth-of-type(2n)
        padding-left 10px
    .pagination
      display flex
      justify-content center
</style>
<style>
#guessing .pagination .el-pagination .el-pager li{
  background-color :transparent;
  color:#fff;
  font-size: 16px;
  font-weight:400
}
#guessing .pagination .el-pagination .el-pager li:hover{

  color:#7d5224
}
#guessing .pagination .el-pagination .el-pager li.active{

  color:#7d5224
}
#guessing .pagination .el-pagination .btn-prev{
  background-color: transparent ;
  color: #7d5224
}
#guessing .pagination .el-pagination .btn-prev .el-icon{
  font-size: 16px
}
#guessing .pagination .el-pagination .btn-next {
  background-color: transparent ;
  color: #7d5224;
}
#guessing .pagination .el-pagination .btn-next .el-icon{
   font-size: 16px
}
</style>
