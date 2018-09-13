<template>
    <div class="selection-wrap">
        <div class="choose">
            <el-select v-model="year" placeholder="请选择" size="small">
                <el-option
                        v-for="item in tenatDate"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="type" class="type" placeholder="请选择" size="small">
                <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                </el-option>
            </el-select>
        </div>
        <div class="time-line-wrap">
            <ul v-if="type=='week'" class="time-line week">
                <li @click="curweek(index)" v-for="(item,index) in weekData" :class="{'item-big':true,'cur':item.isCurWeek,'end':item.isEndWeek}">
                    <span class="des-right">{{item.value}}</span>
                    <i class="icon-big"></i>
                </li>
            </ul>
            <ul v-if="type=='month'" class="time-line">

                <li @click="curmonth(index)" v-for="(item,index) in monthData" :class="{'item-big':true,'cur':item.isCurWeek,'end':item.isEndWeek}">
                    <span class="des-right">{{item.value}}</span>
                    <i class="icon-big"></i>
                </li>
                <!--<li class="item-big">-->
                <!--<span class="des">五月</span>-->
                <!--<i class="icon-big"></i>-->
                <!--</li>-->
            </ul>
            <ul v-if="type=='quarter'" class="time-line">
                <li @click="curquarter(index)" v-for="(item,index) in quarterData" :class="{'item-big':true,'cur':item.isCurWeek,'end':item.isEndWeek}">
                    <span class="des-right">{{item.value}}</span>
                    <i class="icon-big"></i>
                </li>
            </ul>
            <ul v-if="type=='year'" class="time-line">
                <li class="item-big cur">
                    <span class="des-right">年报</span>
                    <i class="icon-big"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default{
        props:{
            sysTime:{
                type:String,
                required:false
            },
        },
        data(){
            return {
                aaa:'',
                options2: [{
                    value: '2018',
                    label: '2018'
                }, {
                    value: '2017',
                    label: '2017'
                }],
                typeOptions:[{
                    value: 'week',
                    label: '周计划'
                }, {
                    value: 'month',
                    label: '月计划'
                }, {
                    value: 'quarter',
                    label: '季度计划'
                }, {
                    value: 'year',
                    label: '年度计划',
                }
                ],
                date:new Date(),
                year:moment(this.sysTime).format('YYYY'),
                type:'week',
                typeNum:{
                    week:1,
                    month:1,
                    quarter:1,
                    year:1,
                },
                weekData:[

                ],
                monthData:[],
                quarterData:[],
            }
        },
        computed:{
            tenatDate: {
                get:function(){
                    let tenat= parseInt(moment(this.$store.state.session.defaultTenat.createDate).format("YYYY"));
                    let curYear = parseInt(moment(this.sysTime).format("YYYY"));
                    let arr = [];
                    for( let i = tenat;i<=curYear+1;i++){
                        let obj = {
                            value: i,
                            label: i
                        };
                        arr.push(obj);
                    }
                    return arr;
                },
                set:function (arr) {
                    return  arr;
                }
            }
        },
        watch:{
            year:{
                handler:function (newVal) {
//                    console.log(newVal)
                    let str = this.year+'-12-30';
                    let weekTimes = moment(str).format("W");
                    console.log(str,weekTimes,"weekTimesweekTimes")
                    this.$emit('selectYear',newVal);
                }
            },
            type:{
                handler:function (newVal) {
//                    console.log(this.typeNum.week,"this.typeNum.weekthis.typeNum.week");
                    let that = this;
                    setTimeout(function () {
                        $('.time-line-wrap').scrollTop(50*(that.typeNum.week-1));
                    },200);
                    this.$emit('selectType',newVal,this.typeNum);
                }
            },
        },
        methods:{
            initWeekData(){
                    let week = [];
                    let vWeekOfDay=moment(this.sysTime).format("W");
//                    console.log(moment(this.sysTime).format("W"),moment(this.sysTime),this.sysTime,vWeekOfDay,'vWeekO  fDayvWeekOfDay')
                    let str = this.year+'-12-30';
                    let weekTimes = moment(str).format("W");
                    console.log(str,weekTimes,"weekTimesweekTimes")
                    this.typeNum.week=vWeekOfDay;
                    for(let i = 1;i<=52;i++ ){
                        if(i == vWeekOfDay){
                            week.push(
                                {
                                    value:'第'+i+'周',
                                    isCurWeek:true,
                                    isEndWeek:true,
                                }
                            );
                        }else{
                            week.push(
                                {
                                    value:'第'+i+'周',
                                    isCurWeek:false,
                                    isEndWeek:false,
                                }
                            );
                        }
                    }
                    this.weekData=[...week];
                    setTimeout(function () {
                        $('.time-line-wrap').scrollTop(50*(vWeekOfDay-1));
                    },500)

            },
            initMonthData(){
                let month = [];
                let monthOfDay=moment(this.sysTime).format("M");
                this.typeNum.month=monthOfDay;
//                this.$emit('monthChoose',this.typeNum);
                for(let i = 1;i<=12;i++ ){
                    if(i == monthOfDay){
                        month.push(
                            {
                                value:i+'月',
                                isCurWeek:true,
                                isEndWeek:true,
                            }
                        );
                    }else{
                        month.push(
                            {
                                value:i+'月',
                                isCurWeek:false,
                                isEndWeek:false,
                            }
                        );
                    }
                }
                this.monthData=[...month];
            },
            initQuarterData(){
                let quarter = [];
                var quarterOfDay=moment(this.sysTime).format("Q");
                this.typeNum.quarter=quarterOfDay;
//                this.$emit('quarterChoose',this.typeNum);
                for(let i = 1;i<=4;i++ ){
                    if(i == quarterOfDay){
                        quarter.push(
                            {
                                value:'第'+i+'季度',
                                isCurWeek:true,
                                isEndWeek:true,
                            }
                        );
                    }else{
                        quarter.push(
                            {
                                value:'第'+i+'季度',
                                isCurWeek:false,
                                isEndWeek:false,
                            }
                        );
                    }
                }
                this.quarterData=[...quarter];
            },
            curweek(index){
                for (var i = 0; i < 52; i++) {
                    this.weekData[i].isCurWeek = false;
                }
                this.weekData[index].isCurWeek = true;
                this.typeNum.week=index+1;
                this.$emit('weekChoose',this.typeNum);
            },
            curmonth(index){
//                console.log(this.monthData[0].isCurWeek,'curmonth');
                for (let i = 0; i < 12; i++) {
                    this.monthData[i].isCurWeek = false;
                }
                this.monthData[index].isCurWeek = true;
                this.typeNum.month=index+1;
                this.$emit('monthChoose',this.typeNum);
            },
            curquarter(index){
                for (var i = 0; i < 4; i++) {
                    this.quarterData[i].isCurWeek = false;
                }
                this.quarterData[index].isCurWeek = true;
                this.typeNum.quarter=index+1;
                this.$emit('quarterChoose',this.typeNum);
            },
        },
        mounted(){
            this.initWeekData();
            this.initMonthData();
            this.initQuarterData();
            this.$emit('weekChoose',this.typeNum);
            let clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
            $(".time-line-wrap").css({height:clientHeight-150+"px"});
            let $$ = $;
            $(window).resize(function() {
                //clientHeight是网页在浏览器中的可视高度，
                let clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
                    $$(".time-line-wrap").css({height:clientHeight-150+"px"});
            });
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .selection-wrap{
        position: fixed;
        height: 100%;
        .choose{
            font-size: 0;
            padding-bottom: 20px;
            padding-top: 12px;
            .el-select{
                display: inline-block;
                width: 88px;
                margin-right: 12px;
                height: 36px;
            }
            .el-select.type{
                width: 96px;
            }
            .el-input--suffix .el-input__inner {
                font-size: 12px;
            }
        }
        .time-line-wrap{
            overflow-y: scroll;
            margin-bottom: 30px;
        }
        .time-line{
            padding-left:2px;
            position: relative;
            li.item-big{
                position: relative;
                &:hover{
                    span.des-right{
                        font-size: 12px;
                        color: #46a7ff;
                        cursor: pointer;
                    }
                }
                span.des{
                    line-height: 50px;
                    height: 50px;
                }
                span.des-right{
                    font-size: 12px;
                    position: relative;
                    left:80px;
                    line-height: 50px;
                    height: 50px;
                    padding-left: 12px;
                }

                i.icon-big{
                    position: absolute;
                    z-index: 2;
                    left: 50px;
                    top:20px;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: 1px solid #dfdfdf;
                    /*border: 1px solid #42b983;*/
                    background: #ffffff;
                }
                i.icon-big::before{
                    content: '';
                    position: absolute;
                    left: 2px;
                    top:2px;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #dfdfdf;
                    z-index: 2;
                }
                i.icon-big::after{
                    content: '';
                    position: absolute;
                    left: 5px;
                    top:10px;
                    width: 1px;
                    height: 50px;
                    background: #46A7FF;
                    z-index: 1;
                }

                /*i.icon-big:last-child:after{*/
                /*content: '';*/
                /*position: absolute;*/
                /*left: 5px;*/
                /*top:10px;*/
                /*width: 1px;*/
                /*height: 50px;*/
                /*background: #42b983;*/
                /*z-index: 1*/
                /*}*/
            }
            li.item-big.cur{
                i.icon-big{
                    border: 1px solid #46a7ff;
                }
                i.icon-big::before{
                    background: #46a7ff;
                }
                span.des-right{
                    font-size: 12px;
                    position: relative;
                    left:80px;
                    line-height: 50px;
                    height: 50px;
                    border: 1px solid #46a7ff;
                    padding: 6px 12px;
                    background: #ffffff;
                    border-radius: 3px;
                    /*color: #46a7ff;*/

                }
                span.des-right::before{
                    content: '';
                    position: absolute;
                    top: 7px;
                    left: -7px;
                    width: 0;
                    height: 0;
                    border-right: 7px solid #46a7ff;
                    border-bottom: 7px solid transparent;
                    border-top: 7px solid transparent;
                }
                span.des-right::after{
                    content: '';
                    position: absolute;
                    top: 8px;
                    left: -6px;
                    width: 0;
                    height: 0;
                    border-bottom: 6px solid transparent;
                    border-right: 6px solid #fff;
                    border-top: 6px solid transparent;
                }
            }
            li.item-big.end{
                i.icon-big{
                    border: 1px solid red;
                }
                i.icon-big::before{
                    background: red;
                }
            }
            li.item-big:first-child{
                i.icon-big{
                    border: 1px solid $theme-blue;
                }
                i.icon-big::before{
                    background: $theme-blue;
                }
            }
            li.item-big:last-child{
                i.icon-big::after{
                    width: 0;
                }
            }
        }
    }
</style>