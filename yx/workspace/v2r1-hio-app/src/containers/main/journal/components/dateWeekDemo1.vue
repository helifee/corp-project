<template>
    <div>
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
                <!--<i class="el-icon-date"></i>-->
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
        components:{

        },
        methods:{
            //右侧日历选择
            changeValue (value){
                this.curDate = value;
                console.log(value,"当前日期");
                this.getWeek();
            },
            //上一周
            prev (){
                let date = this.curDate;
                this.curDate =  moment(date).subtract(7,'days').format('YYYY-MM-DD');
                console.log(this.curDate,"当前日期+++prev");
                this.getWeek();
            },
            //下一周
            next (){
                let date = this.curDate;
                if(!this.canNext){
                    this.$message({
                        message: '只能查询当前日和当日之前的日志',
                        type: 'warning'
                    });
                }else{
                    console.log(date,this.current);
                this.curDate =  moment(date).add(7, 'days').format('YYYY-MM-DD');
                console.log(this.curDate,"当前日期+++next");
                this.getWeek();
                }


//
            },
            //获取周几
            getMonDate (){
                let d = moment(this.curDate).format('d');
                console.log(d,"getMonDate获取周几")
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
            getWeek (){
                this.weekValue = [];
                for(var i=0; i<7; i++)
                {
                    let obj = {
                        mouthDate:moment(this.curDate).day(i).add(1, 'days').format('MM-DD'),
                        fullDate:moment(this.curDate).day(i).add(1, 'days').format('YYYY-MM-DD'),
                        dayName: this.getDayName(moment(this.curDate).day(i).add(1, 'days').format('d')),
                        isCur:moment(this.curDate).day(i).add(1, 'days').format('d') == moment(this.curDate).format('d')
                    };
                    this.weekValue.push(obj);
                }

                let date = this.curDate;
                let lastDate = moment(date).add(7, 'days').format('YYYY-MM-DD');
                if(lastDate>this.current){
                   this.canNext = false;
                }else{
                    this.canNext = true;
                }

//                console.log(this.weekValue);
            },
            //点击切换
            liClick (fullDate,index){
                console.log(fullDate,"当前日期");

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
                let res = await JZY.xhr.r([{type:'get',url:'/platform-app/sys/common/getSysTime'}],'GLOBAL.WANG_TAO',{alertError:false}).then((resultData)=>{
                    try{
                        return resultData;
                    }catch (e){
//                        this.$message("role.list.vue:"+e);
                        return false;
                    }
                }).catch((e)=>{
                    //接口失败
                    throw new Error(e)
                })

                console.log(res[0]);
                let date = moment(res[0]).format('YYYY-MM-DD')
                this.curDate = date;
                this.current = date;
                console.log(this.curDate);
                return date;

            },

        },
        data(){
            return {
                current: '',
                curDate: '',
                canNext:false,//是否可以点击下一周
                weekValue: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
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
            this.current = moment().format('YYYY-MM-DD');
            this.curDate = moment().format('YYYY-MM-DD');
            this.getWeek();
//            this.$emit("curdate",this.curDate);
        },
        watch:{
            curDate(curVal){
                let isCurDate = this.curDate==this.current?true:false;
                this.getWeek();
                this.$emit("curdate",curVal,isCurDate);
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .date-carousel{
        height: 60px;
        line-height: 60px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        position: relative;
        /*overflow: hidden;*/
        .btn{
            text-align: center;
            font-size: 16px;
            width: 60px;
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
            i.el-icon-arrow-right{
                color: #cccccc;
            }
            .date-picker{
                float: right;
                width: 80px;
                position: absolute;
                right: 0;
                top:0;
                z-index: 2;
                cursor: pointer;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
                font-size: 14px;
            }
            li.cur{
                border-bottom: 3px solid #00a0e9;
            }
            li.gray{
                color: #CCCCCC;
            }
        }
    }
    .date-option{
        padding: 12px 20px;
    }
    .icon-date{
        display: block;
        width: 80px;
        height: 60px;
        text-align: center;
        color: #9a9a9a;
        position: absolute;
        right: 0;
        top:0;
        z-index: 1;
        background-color: #ffffff;
        .el-icon-date{
            display: block;
            width: 80px;
            height: 8px;
            line-height: 32px;
            font-size: 28px;
            margin-top: 8px;
        }
        span{
            font-size: 12px;
            line-height: 24px;
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss">
    .date-picker{
        input.el-input__inner{
            border: 0 none;
            background-color: transparent;
            color: transparent;
        }
        .el-input__icon{
            color: transparent;
            cursor: pointer;
        }
    }
</style>
