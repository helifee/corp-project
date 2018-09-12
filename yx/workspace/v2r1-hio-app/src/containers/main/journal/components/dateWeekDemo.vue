<template>
    <div class="date-wrap">
        <div class="date-carousel">
                <span class="btn btn-left">
                    <i class="el-icon-arrow-left" @click="prev"></i>
                </span>
            <ul>
                <li v-for="(item,index) in weekValue" @click="liClick(item.fullDate,index)" :class="{cur:item.isCur,'gray': item.fullDate>current}">{{item.mouthDate}}{{item.dayName}}</li>
            </ul>
            <span class="btn btn-right">
                    <i :class="{'el-icon-arrow-right':true,'gray':!canNext}" @click="next(canNext)"></i>
                    <div class="icon-date">
                         <i class="el-icon-date"></i>
                        <span>查看日历</span>
                    </div>
                    <el-date-picker
                            v-model="curDate"
                            :editable=false
                            :clearable=false
                            @change="changeValue"
                            align="right"
                            type="date"
                            default-value
                            class="date-picker"
                            :picker-options="pickerOptions"
                            value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </span>
        </div>
        <div class="date-option">
            <slot name="detail">
            </slot>
        </div>
    </div>
</template>

<script>
    import {getSysTime} from '@Main/journal/getData.js'
    import moment from 'moment'
    export default{
        props:{
            sysTime:{
                type:String,
                required:false
            },
        },
        components:{
        },
        methods:{
            //右侧日历选择
            changeValue (value){
                this.curDate = value;
                this.weekDate = value;
//                console.log(value,"当前日期右侧");
                this.getWeek(this.curDate);
            },
            //上一周
            prev (){
                let date = this.weekDate;
                this.weekDate =  moment(date).subtract(7,'days').format('YYYY-MM-DD');
//                console.log(this.weekDate,"当前日期+++prev");
                this.getWeek(this.weekDate);
            },
            //下一周
            next (){
                if(!this.canNext){
                    this.$message({
                        message: '只能查询当前日和当日之前的日志',
                        type: 'warning'
                    });
                }else{
                    let date = this.weekDate;
//                    console.log(date,this.weekDate);
                    this.weekDate =  moment(date).add(7, 'days').format('YYYY-MM-DD');
//                    console.log(this.weekDate,"当前日期+++next");
                    this.getWeek(this.weekDate);
                }


//
            },
            //获取周几
            getMonDate (){
                let d = moment(this.curDate).format('d');
//                console.log(d,"getMonDate获取周几")
                return d;
            },
            //获取日期名称
            getDayName (day){
                var day=parseInt(day);
                if(isNaN(day) || day<0 || day>6)
                    return false;
                var weekday=[l('{journalLocale.dateWeek.week.Sun}'),l('{journalLocale.dateWeek.week.Mon}'),l('{journalLocale.dateWeek.week.Tues}'),l('{journalLocale.dateWeek.week.Wed}'),l('{journalLocale.dateWeek.week.Thur}'),l('{journalLocale.dateWeek.week.Fri}'),l('{journalLocale.dateWeek.week.Sat}')];
                return weekday[day];
            },
            //获取周
            getWeek (changeDate){
                this.weekValue = [];
                let sun = moment(changeDate).format('d');
                //如果是周日
                if(+sun){
                    for(var i=0; i<7; i++)
                    {   let obj = {
                        mouthDate:moment(changeDate).day(i).add(1, 'days').format('MM-DD'),
                        fullDate:moment(changeDate).day(i).add(1, 'days').format('YYYY-MM-DD'),
                        dayName: this.getDayName(moment(changeDate).day(i).add(1, 'days').format('d')),
                        isCur:moment(changeDate).day(i).add(1, 'days').format('YYYY-MM-DD') == this.curDate
                    };
                        this.weekValue.push(obj);
                    }
                    let lastDate = moment(changeDate).endOf('week').add(1, 'days').format("YYYY-MM-DD");
                    if(lastDate>=this.current){
                        this.canNext = false;
                    }else{
                        this.canNext = true;
                    }
                }else{
                    let changeDate2 = moment(changeDate).subtract(1, 'days').format('YYYY-MM-DD')
                    for(var i=0; i<7; i++)
                    {   let obj = {
                        mouthDate:moment(changeDate2).day(i).add(1, 'days').format('MM-DD'),
                        fullDate:moment(changeDate2).day(i).add(1, 'days').format('YYYY-MM-DD'),
                        dayName: this.getDayName(moment(changeDate2).day(i).add(1, 'days').format('d')),
                        isCur:moment(changeDate2).day(i).add(1, 'days').format('YYYY-MM-DD') == this.curDate
                    };
                    this.weekValue.push(obj);
                    }
                    let lastDate = moment(changeDate2).endOf('week').add(1, 'days').format("YYYY-MM-DD");
                    if(lastDate>=this.current){
                        this.canNext = false;
                    }else{
                        this.canNext = true;
                    }
                }

            },
            //点击切换
            liClick (fullDate,index){
//                console.log(fullDate,"当前日期li");

                if(fullDate>this.current){
                    this.$message({
                        message: '只能查询当前日和当日之前的日志',
                        type: 'warning'
                    });
                }else{
                    this.curDate = fullDate;
                    for (var i = 0; i < 7; i++) {
                        this.weekValue[i].isCur = false;
                    }
                    this.weekValue[index].isCur = true;
                }

            },

            async getTime(){
//                let res = await JZY.xhr.r([{type:'get',url:'/platform-app/sys/common/getSysTime'}],'GLOBAL.WANG_TAO',{alertError:false}).then((resultData)=>{
//                    try{
//                        return resultData;
//                    }catch (e){
////                        this.$message("role.list.vue:"+e);
//                        return false;
//                    }
//                }).catch((e)=>{
//                    //接口失败
//                    throw new Error(e)
//                })
//
//                console.log(res[0]);
                let date = moment(this.sysTime).format('YYYY-MM-DD')
                this.curDate = date;
                this.current = date;
                this.weekDate= date;
                return date;

            },

        },
        data(){
            let _this = this;
            return {
                current: '',
                curDate: '',
                weekDate:'',
                canNext:false,//是否可以点击下一周
                weekValue: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > moment(_this.sysTime).format('X')+'000';
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }]
                },
            }
        },
        mounted (){
            let date = this.getTime();
            if(this.sysTime){
                this.current = moment(this.sysTime).format('YYYY-MM-DD');
                this.curDate = moment(this.sysTime).format('YYYY-MM-DD');
                this.weekDate = moment(this.sysTime).format('YYYY-MM-DD');
                this.getWeek(this.curDate);
            }

        },
        watch:{
            curDate(curVal){
                let isCurDate = this.curDate==this.current?true:false;
                this.getWeek(curVal);
                this.$emit("curdate",curVal,isCurDate);
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .date-carousel{

        height: 60px;
        line-height: 60px;
        border-top: 1px solid $theme-grey-table-border;
        border-bottom: 1px solid $theme-grey-table-border;
        position: relative;
        /*overflow: hidden;*/
        .btn{
            text-align: center;
            font-size: 16px;
            width: 60px;
            cursor: pointer;
        }
        .btn-left{
            position: absolute;
            left:0px;
            top: 0px;
        }
        .btn-right{
            position: absolute;
            right:0px;
            top: 0px;
            width:150px;
            i.el-icon-arrow-right{
                width: 60px;float: left;
                line-height: 60px;
            }
            i.el-icon-arrow-right.gray{
                color: $theme-black-other;
            }
            .date-picker{
                float: right;
                width: 80px;
                position: absolute;
                right: 0;
                top:0;
                z-index: 2;
                cursor: pointer;
                border-left: 1px solid $theme-grey-table-border;
                /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
            }
        }
        .btn:hover{
            i{
                color: $theme-blue;
            }
        }
        ul{
            display: block;
            font-size: 0;
            margin:0px 150px 0 60px;
            height: 60px;
            li{
                cursor: pointer;
                display: inline-block;
                width: 14.2%;
                text-align: center;
                font-size: 12px;
                color: $theme-black;
            }
            li.cur{
                border-bottom: 3px solid $theme-blue;
            }
            li.gray{
                color: $theme-black-other;
            }
        }
    }
    .date-option{
        padding: 16px 20px;
    }
    .icon-date{
        display: block;
        width: 80px;
        height: 60px;
        text-align: center;
        color: $theme-black-other;
        position: absolute;
        right: 0;
        top:0;
        z-index: 1;
        font-weight: normal;
        background-color: #ffffff;
        .el-icon-date{
            font-weight: normal;
            display: block;
            width: 80px;
            height: 8px;
            line-height: 32px;
            font-size: 28px;
            margin-top: 8px;
        }
        span{
            font-weight: normal;
            font-size: 12px;
            line-height: 24px;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss">
    .date-wrap{
        min-height: 300px;
        .btn-right{
            .date-picker input.el-input__inner{
                cursor: pointer;
            }
            input.el-input__inner{
                border: 0 none;
                background-color: transparent;
                color: transparent;
                height: 60px;
            }
            .el-input__icon{
                width: 70px;
                /*background-color: #666666;*/
                color: transparent;
                cursor: pointer;
            }
        }
    }

</style>
