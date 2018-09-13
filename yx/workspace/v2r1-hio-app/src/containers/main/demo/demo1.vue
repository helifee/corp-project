<template>
    <div class="tend-choose-wrapper" v-if="tendList.length>0" style="background:pink;">



        <div class="outer" style="height:296px;top:50%;
        position:relative;margin:0 auto;margin-top:-148px;" :style="{width:((tendItemWidth+tendItemMarginRight)*everyPageNum-tendItemMarginRight)+'px'}">
            <div style="position:absolute;left:0;top:0;width:100%;height:100%;overflow: hidden;">
                <div class="inner" style="height:100%;position:relative;"
                     :style="{width:((300)*tendList.length)+'px',left:-((currentPage+1)*everyPageNum+((tendItemWidth+tendItemMarginRight)*everyPageNum-tendItemMarginRight)*currentPage)+'px'}">
                    <div v-loading="switchingTend.sid==item.sid"
                         element-loading-text="拼命切换中"
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(0, 0, 0, 0.8)"
                         @click="switchTend(item,index)"
                         :style="{marginRight:(index%everyPageNum==(everyPageNum-1)?'0':(tendItemMarginRight+'px')),width:tendItemWidth+'px'}" v-for="(item,index) in tendList" style="float:left;" class="tend-item">

                        <img style="height:110px;width:auto;margin:0 auto;display:block;margin-top:40px;" :src="JZY.s.getOssThumbSrc(item.logo)">



                        <div style="text-align:center;font-size: 14px;
    margin-top: 50px;padding:0 15px;">{{item.tendName}}</div>

                    </div>
                </div>
            </div>

            <span v-if="totalPage>1" class="dot" style="left:-70px;" @click="handlePrevDotClick">
                <i class="el-icon-arrow-left"></i>
            </span>
            <span v-if="totalPage>1" class="dot" style="right:-70px;" @click="handleNextDotClick">
                <i class="el-icon-arrow-right"></i>
            </span>
        </div>
    </div>
</template>
<style lang="scss">
   .tend-choose-wrapper{
       .inner{
           transition: left ease-in-out .3s;
       }
       .tend-item{
           cursor:pointer;
           /*width:220px;*/
           border-radius:5px;
           background:rgba(255,255,255,0.8);
           height:100%;
           transform:scale(0.92);
           border:solid 1px transparent;
           &:last-child{
               margin-right:0;

           }
           &:hover{

               color:#46A7FF;
               background: #FFFFFF;
               border: 1px solid #46A7FF;
               box-shadow: 0 1px 10px 0 rgba(181,220,255,0.89);
               border-radius: 6px;
           }
       }
       .dot{
           position:absolute;
           top:50%;
           margin-top:-25px;
           width:50px;
           height:50px;
           line-height:50px;
           text-align:center;
           display:block;
           border-radius:50%;
           color:black;
           background: #FFFFFF;
           font-size:24px;
           cursor:pointer;
           &:hover{
               transform: scale(1.2);
           }
       }
   }
</style>
<script>
    import '@Main/task/fonts/iconfont.css'
    import '@Main/home/topNav.js'
    export default {
        data() {
            return {
                switchingTend:{},
                tendItemMarginRight:30,
                tendItemWidth:220,
                everyPageNum:4,
                tendList:[],
                totalPage:0,
                currentPage:0
            };
        },
        components: {},
        created() {
            !JZY.PROD_MODE && (window.DEMO1 = this)
        },
        methods: {

            switchTend(item,index){
                console.log('switch tend was invoked')
                if(item.sid==this.switchingTend.sid){
                    return false
                }
                this.switchingTend=item
                
                setTimeout(()=>{
                    
                    this.switchingTend={}
                },2000)
                
            },
            handleNextDotClick(){
                this.currentPage++;
                this.currentPage>this.totalPage && (this.currentPage=0)
            },
            handlePrevDotClick(){
                this.currentPage--;
                this.currentPage==-1 && (this.currentPage=this.totalPage)

            }
        },
        mounted() {
            let list=[{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend150","userId":null,"defaultFlag":1,"outerLinkman":0,"mobile":"18701031737","tendName":"杜大爷额度企业","createDate":"2018-06-01 17:03:13","updateDate":"2018-06-01 17:03:13","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","delflag":0,"reserve1":"1","logo":null,"sid":"100273"},{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend129","userId":null,"defaultFlag":0,"outerLinkman":0,"mobile":"18701031737","tendName":"pc牛逼团队","createDate":"2018-06-07 09:34:35","updateDate":"2018-06-07 09:34:35","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","delflag":0,"reserve1":"1","logo":"http://hio-cc-test.oss-cn-beijing.aliyuncs.com/1527759672574592358","sid":"100350"},{"uid":"0b3d156524b1438288ad005dc10479bd","tendId":"hio_tend115","userId":null,"defaultFlag":0,"outerLinkman":0,"mobile":"18701031737","tendName":"chc公司债券","createDate":"2018-06-01 17:10:26","updateDate":"2018-06-01 17:10:26","createPersonId":"0b3d156524b1438288ad005dc10479bd","createPersonName":"18701031737","updatePersonId":"0b3d156524b1438288ad005dc10479bd","updatePersonName":"18701031737","delflag":0,"reserve1":"1","logo":"http://hio-cc-test.oss-cn-beijing.aliyuncs.com/1529907609163880171","sid":"100274"}]
            this.tendList=list
                .concat(list).concat(list)
            this.totalPage=Math.ceil(this.tendList.length/4)-1

            this.everyPageNum=Math.min(this.tendList.length,this.everyPageNum)


        }
    }
</script>