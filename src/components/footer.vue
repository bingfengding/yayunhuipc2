<template>
  <el-row type="flex" justify="center" id="footer">
    <el-col :span="24" class="center">
      <el-row type="flex" justify="space-between">
        <el-col :span="4" v-for="(item,index) in items" :key="index" class="big-item">
          <ul>
            <li v-for="(value,key) in item" :key="key" class="small-item">
              <a :href="value.url">
                {{value.value}}
              </a>
              
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data(){
    return {
      items:[
       [{
         value:"关于万博",
         url:"javascript:void(0);"
       },
       {
         value:"关于我们",
         url:"http://cn.man257.com/help/contact"
       },
       {
         value:"万博足迹",
         url:"http://cn.man257.com/help/contact"
       },
       {
         value:"优惠活动",
         url:"http://cn.man257.com/promotions/index"
       },
       {
         value:"免费开户",
         url:"http://cn.man257.com/home/register"
       },
       ],
       [{
         value:"产品服务",
         url:"javascript:void(0);"
       },
       {
         value:"体育",
         url:"http://cn.man257.com/sports/msports"
       },
       {
         value:"彩票",
         url:"http://cn.man257.com/lottery/keno"
       },
       {
         value:"电子游戏",
         url:"http://cn.man257.com/game/index"
       },
       {
         value:"真人娱乐",
         url:"http://cn.man257.com/liveCasino/index"
       },
       ],
       [{
         value:"帮助中心",
         url:"javascript:void(0);"
       },
       {
         value:"存款指南",
         url:"http://cn.man257.com/help/faqs"
       },
       {
         value:"新手学堂",
         url:"https://jx.manbet1.tv/HelpTick.html"
       },
       {
         value:"常见问题",
         url:"http://cn.man257.com/help/faqs"
       },
       {
         value:"游戏规则",
         url:"http://cn.man257.com/help/faqs"
       },
       ],[{
         value:"官方客服",
         url:"javascript:void(0);"
       },
       {
         value:"在线客服",
         url:"http://cs.0manbet.com/"
       },
       {
         value:"贴吧客服1",
         url:"http://tieba.baidu.com/home/main?un=ManBetX_%E5%A9%B7%E5%A9%B7&ie=utf-8&fr=frs&id=cd474d616e426574585fe6c3e6c34f93&red_tag=o2127582729"
       },
       {
         value:"贴吧客服2",
         url:"http://tieba.baidu.com/home/main?un=ManBetX_%E4%BD%93%E8%82%B2&ie=utf-8&fr=frs&id=932e4d616e426574585fcce5d3fd4f93&red_tag=w3306466483"
       },
       {
         value:"微博客服",
         url:"https://www.weibo.com/u/1650637754?refer_flag=1001030101_&is_hot=1"
       },
       ]
       ,[{
         value:"常用工具",
         url:"javascript:void(0);"
       },
       {
         value:"Winrar压缩",
         url:"https://www.win-rar.com/"
       },
       {
         value:"远程协助",
         url:"http://b01image.hubijjl.com/static/B01P/_default/__static/__download/TeamViewer.rar"
       },
       {
         value:"清除缓存",
         url:"http://b01image.hubijjl.com/static/B01P/_default/__static/__download/clearcache.rar"
       },
      
       ]

      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
#footer
  padding-top 60px
  padding-bottom 30px
  background-image url("../assets/home_03.png")
  background-repeat no-repeat
  background-size cover
  .center
    max-width 1340px
    min-width 1200px
    .big-item
      .small-item
        text-align center
        font-size 20px
        color #4d4d4d
        padding-bottom 25px
      .small-item:first-of-type
        font-size 26px
        font-weight bold
        color #1a1a1a

</style>
