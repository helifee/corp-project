<template>
    <div class="right home_wrap">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- <i class="el-icon-document"></i> -->
                工作日历
            </div>
            <colorful-date-picker
                @pick="handlePickChange"
                :highlight-days="highlightDays"
                v-model="testValue"
                type="date"
                placeholder="选择日期">
            </colorful-date-picker>
            <!-- <el-button @click="updateHighlightDays()">测试高亮日期更新</el-button> -->
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <!-- <i class="el-icon-document"></i> -->
            当天日程
          </div>
          <ul v-if="scheduleList.length > 0" class="schedule_list">
              <li v-for="(item,index) in scheduleList" :key="index">
                  <!-- <span class="icon el-icon-time" :style="{'color': item.color}"></span> -->
                  <icon name="home_roundDot" scale="1" :style="{'color': item.color}"></icon>
                  <span class="date">{{item.time}}</span>
                  <span class="title" :title="item.title">{{item.title}}</span>
              </li>
          </ul>
          <ul v-else class="schedule_list">
              <li style="color:#A0A0A0;font-size:12px;text-align:center;">
                  暂无数据
              </li>
          </ul>
        </el-card>
    </div>
</template>
<script>

    import { getScheduleList, } from '@Main/home/getData'
    import moment from 'moment'


    import colorfulDatePicker from '@/components/colorfulDatePicker.js'

    const TYPES = {
        AGENDA:{
            color:'#46A7FF'
        },
        TASK:{
            color:'#BE96F9'
        }
    }
  export default {
        components:{
            colorfulDatePicker
        },
    data() {
      return {
        testValue: '',//测试用，当前选中的日期
        scheduleList:[],//选择日期的日程+任务
        highlightDays:[],//当天高亮
        // highlightDays:[{
        //     type:'0',//会议
        //     color:'#ff414d',
        //     title:'会议hello world',
        //     time:'09:30',
        //     date:'2018-03-12'
        // },{
        //     type:'0',//会议
        //     color:'#ff414d',
        //     title:'会议hello world',
        //     time:'12:30',
        //     date:'2018-04-4'
        // },{
        //     type:'3',//其他2
        //     color:'#ffb438',
        //     title:'其他2hello world',
        //     time:'08:30',
        //     date:'2018-03-5'
        // },{
        //     type:'1',//任务
        //     color:'#03c492',
        //     title:'任务hello world',
        //     time:'14:30',
        //     date:'2018-03-27'
        // },{
        //     type:'2',//其他1
        //     title:'其他1hello world',
        //     time:'15:30',
        //     color:'#04c',
        //     date:'2018-03-4'
        // },{
        //     type:'2',//其他1
        //     title:'其他1hello world',
        //     time:'17:30',
        //     color:'#04c',
        //     date:'2018-03-12'
        // }],
        
      }
    },
    methods: {
        //手动设置需要高亮显示的日程，作废
        updateHighlightDays(){
            this.highlightDays=[{
                type:'3',//其他2
                color:'#ffb438',
                title:'其他2hello world',
                time:'08:30',
                date:'2018-04-25'
            },{
                type:'1',//任务
                color:'#ffb438',
                title:'任务world',
                time:'18:30',
                date:'2018-04-15'
            },{
                type:'1',//任务
                color:'#ffb438',
                title:'任务world',
                time:'18:30',
                date:'2018-04-16'
            }]
        },
        //月 处理
        formalMonth:function( month ){
            return (month + 1) < 10 ? ('0'+(month+ 1)) : (month + 1)
        },
        //点击日历的date事件
        handlePickChange(date,event){
            this.getScheduleData(date)
            console.log('handle pick change argssdfsdfsdsssdfsdfs--:',date,event)
        },
        //加载所选择date的日程列表
        async getScheduleData(date){
            //日程大权限的判断
            let schedulePremission = false
            if(this.$store.state.session.tenantInfo.roleMenus.length > 0 ){//非管理员
                schedulePremission = this.$store.state.session.tenantInfo.roleMenus.some((item)=>{
                    return item.url.indexOf('/schedule') != -1
                })
            }else{
                schedulePremission = true
            }

            if(schedulePremission){//没有日程大权限，不发请求

                let d = new Date(date);
                let nowMonth = this.formalMonth(d.getMonth())
                let nextMonth = this.formalMonth(d.getMonth() + 1)

                let formalDate = moment(d).format("YYYY-MM-DD");


                let beginTime = d.getFullYear() + '-' + nowMonth + '-' + '01' + ' 00:00:00';
                let endTime = d.getFullYear() + '-' + nextMonth + '-' + '01' + ' 00:00:00';

                this.highlightDays = []  //高亮显示日期
                this.scheduleList = []  //当前日期的任务+日期列表


                let tempList = []

                console.info(beginTime)
                console.info(endTime)

                const createPersonList = [{
                    createPersonId:this.$store.state.session.sid
                }]//当前登陆人的id

                let res = await getScheduleList( beginTime, endTime, createPersonList )
                console.info("res[0]",res[0])

                // this.$message('加载当前已选的年月的数据。。。')
                //日程0
                res[0].scheduleList.length > 0 && res[0].scheduleList.forEach((item) =>{

                    if (item.scheduleId) {//id非空

                        this.highlightDays.push({
                            type:'0',
                            color:TYPES.AGENDA.color,
                            title:item.scheduleTitle,
                            time:moment(item.beginTime).format("HH:mm"),
                            date:moment(item.beginTime).format("YYYY-MM-D")
                        })

                        if( formalDate >= moment(item.beginTime).format("YYYY-MM-DD") && formalDate <= moment(item.endTime).format("YYYY-MM-DD") ){

                            this.scheduleList.push({
                                type:'0',
                                color:TYPES.AGENDA.color,
                                title:item.scheduleTitle,
                                time:moment(item.beginTime).format("HH:mm")
                            })
                        }

                    }
                })
                //任务1
                res[0].taskList.length > 0 && res[0].taskList.forEach((item) =>{
                    if (item.taskId) {//id非空
                        
                        this.highlightDays.push({
                            type:'1',
                            color:TYPES.TASK.color,
                            title:item.taskName,
                            time:moment(item.beginTime).format("HH:mm"),
                            date:moment(item.beginTime).format("YYYY-MM-D")
                        })

                        if( formalDate >= moment(item.beginTime).format("YYYY-MM-DD") && formalDate <= moment(item.endTime).format("YYYY-MM-DD") ){

                            this.scheduleList.push({
                                type:'1',
                                color:TYPES.TASK.color,
                                title:item.taskName,
                                time:moment(item.beginTime).format("HH:mm")
                            })
                        }

                    }

                })
                    
                console.info("this.scheduleList",this.scheduleList)
                console.info("this.highlightDays",this.highlightDays)
                //过滤出来当天的数据
                // this.scheduleList = tempList.filter((item) => {
                //     console.info(item.date == formalDate)
                //     return item.date == formalDate;
                // });
                //排序按照时间time
                this.bubbleSort(this.scheduleList,'time')

                this.$emit('getRightHeight')
            }
            
        },
        // //加载所选择date的日程列表，作废——没有排序，且调用两次后端接口，效率低
        // async getSchedule(date,type=''){
        //     let d = new Date(date);
        //     let nowMonth = this.formalMonth(d.getMonth())
        //     let nextMonth = this.formalMonth(d.getMonth() + 1)

        //     let formalDate = d.getFullYear() + '-' + nowMonth + '-' + d.getDate();

        //     let beginTime = ''
        //     let endTime = ''

        //     if (type === 'click') {//点击，获取当天的日程
        //         beginTime = formalDate + ' 00:00:00'
        //         endTime = formalDate + ' 23:59:59'
        //     }else if( type === 'init' ){//初始化、选择年，月等，获取选择月的日程（仅显示开始时间那天的日程，产品已确认05.24）
        //         beginTime = d.getFullYear() + '-' + nowMonth + '-' + '01' + ' 00:00:00';
        //         endTime = d.getFullYear() + '-' + nextMonth + '-' + '01' + ' 00:00:00';

        //         this.highlightDays = []  //高亮显示其他日期

        //     }else{//初始化，获取系统当天的日程
        //         beginTime = formalDate + ' 00:00:00'
        //         endTime = formalDate + ' 23:59:59'
        //     }

        //     console.info(beginTime)
        //     console.info(endTime)
        //     // console.info(formalDate)


        //     //日程大权限的判断
        //     let schedulePremission = false
        //     if(this.$store.state.session.tenantInfo.roleMenus.length > 0 ){//非管理员
        //         schedulePremission = this.$store.state.session.tenantInfo.roleMenus.some((item)=>{
        //             return item.url.indexOf('/schedule') != -1
        //         })
        //     }else{
        //         schedulePremission = true
        //     }

        //     if(schedulePremission){//没有日程大权限，不发请求

        //         let res = await getScheduleList( beginTime, endTime)
        //         console.info(res[0])
        //         this.scheduleList = []

        //         let tempList = []
        //         // this.$message('加载当前已选的年月的数据。。。')
        //         //日程0
        //         res[0].scheduleList.length > 0 && res[0].scheduleList.forEach((item) =>{
        //             item.scheduleId && tempList.push({
        //                 type:'0',
        //                 color:TYPES.AGENDA.color,
        //                 title:item.scheduleTitle,
        //                 time:moment(item.beginTime).format("HH:mm"),
        //                 highlight:type === 'init',
        //                 date:type === 'init'? moment(item.beginTime).format("YYYY-MM-DD"):formalDate
        //             })
        //         })
        //         //任务1
        //         res[0].taskList.length > 0 && res[0].taskList.forEach((item) =>{
        //             item.taskId && tempList.push({
        //                 type:'1',
        //                 color:TYPES.TASK.color,
        //                 title:item.taskName,
        //                 time:moment(item.beginTime).format("HH:mm"),
        //                 highlight:type === 'init',
        //                 date:type === 'init'? item.beginTime.split(' ')[0]:formalDate
        //             })
        //         })
        //             debugger
        //         // this.scheduleList = this.highlightDays.filter(function(item){
        //         //     return item.date === formalDate;
        //         // })
        //         // if (type == 'init') {
        //         //     this.highlightDays = [ ...this.highlightDays ,...this.scheduleList]
        //         // }

        //         this.highlightDays = tempList.filter(function(item){
        //             return item.highlight === true;
        //         })


        //         //过滤出来当天的数据
        //         this.scheduleList = tempList.filter((item) => {
        //             console.info(item.date == formalDate)
        //             return item.date == formalDate;
        //         });
        //         //排序按照时间time
        //         this.bubbleSort(this.scheduleList,'time')


        //         // if (type == 'click') {
        //         //     debugger
        //         //     this.getSchedule(new Date(),'init')//初始化，其他日期
        //         // }
        //         // this.highlightDays = this.scheduleList.filter(function(item){
        //         //     return item.date === formalDate;
        //         // })

        //     }
            
        //     console.info("this.highlightDays",this.highlightDays)
        // },
        // 插入排序
        bubbleSort(arr=[],type=''){
            let i, j, temp, len = arr.length
            for (i = 1; i < len; i++) {
                let tempArr = arr[i]
                temp = arr[i][type]
                j = i
                while (j > 0 && temp < arr[j -1][type]) { // 判定一下temp如果小于前面的项
                    arr[j]  = arr[j - 1] // 则把所有大于temp的项整体往后移动一位
                    j--
                }
                arr[j] = tempArr // 把temp放在往后移动0到多个项后的空缺位置
            }
            return arr
        },

    },
    mounted(){
        this.getScheduleData(new Date())//初始化，当天
    },
    watch:{
        testValue(curVal,oldVal){
            console.log(curVal,oldVal);
        },
        
    }

  }
</script>
<style lang="scss">
$blueColor:#45A7FE;
.right.home_wrap{
    .el-card{
        box-shadow:none;
        border:none;
        .el-card__header{
            border:none;
            i{
                color:$blueColor;
            }
        }
        .el-card__body{
            padding: 0;
        }
    }
    .el-date-picker{
        width:100%;
        margin: 0 auto;
        box-shadow:none;
        border:none;
        .el-date-picker__header{
            margin: 0px 0px 12px;
        }
    }
    .el-date-picker .el-picker-panel__content{
        width:90%;
        margin: 0 auto;
    }
}
</style>
<style scoped lang="scss">
.right.home_wrap{
    .box-card{
        &:first-child{
            padding-bottom:4px;
            // border-bottom:1px solid $theme-grey-table-border;
        }
        .schedule_list{
            margin: 0 0 8px;
            padding:0;
            li{
                width:calc(100% - 16px);
                height:30px;
                list-style:none;
                font-size:12px;
                text-indent:40px;
                line-height:30px;
                padding-right:16px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                span{margin-left:5px;}
                .date{
                    color:$theme-black-other;
                }
                .title{
                    color: $theme-black;
                    &:hover{
                        color: $theme-blue;
                    }
                }
            }
        }
    }
}
</style>