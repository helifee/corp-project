<template>
    <div>
        <div class="date-carousel">
                <span class="btn btn-left">
                    <i class="el-icon-arrow-left" @click="prev"></i>
                </span>
            <ul>
                <li v-for="(item,index) in weekValue" @click="liClick(item.timestamp,index)" :class="{cur:item.isCur}">{{item.str}}</li>
            </ul>
            <span class="btn btn-right">
                    <i class="el-icon-arrow-right" @click="next"></i>
                    <el-date-picker
                            v-model="curDate"
                            :editable=false
                            :clearable=false
                            @change="changeValue"
                            align="right"
                            type="date"
                            default-value
                            class="date-picker"
                            style=""
                            placeholder="选择日期">
                    </el-date-picker>
                <!--<i class="el-icon-date"></i>-->
                </span>
        </div>
        <div class="date-option">
            <div v-if="value1==0">
                <div>今日工作已完成</div>
                <p class="member">@杨帆</p>
                <div>
                <p class="time">2018-01-04 09:51:12</p>
                <p class="edit" @click="editJournal">
                <i class="el-icon-edit"></i>
                <span @click="dialogTableVisible = true">{{l('{journalLocale.dateWeek.edit}')}}</span>
                </p>
                    <div v-if="dialogTableVisible" style="margin-top: 30px">
                        <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="0px" class="demo-ruleForm">
                            <el-form-item>
                                <UEditor id="editor" defaultMsg="请输入内容" :config="UEconfig" ref="UEditor" style="line-height: 24px"></UEditor>
                            </el-form-item>
                            <el-form-item>

                                <el-button  @click="dialogTableVisible = false">取消</el-button>
                                <el-button type="primary" @click="submitForm('ruleForm2')">{{l('{journalLocale.dateWeek.publish}')}}</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
            </div>
            </div>
            <div v-if="value1==1">
                <p v-show="!payVisible" class="edit" @click="payVisible = true" >{{l('{journalLocale.dateWeek.catch}')}}</p>
                <br>
                <p class="time">2018-01-04 09:51:12</p>

                <div v-if="payVisible" style="margin-top: 30px">
                    <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="0px" class="demo-ruleForm">
                        <el-form-item>
                            <UEditor id="editor" defaultMsg="请输入内容" :config="UEconfig" ref="UEditor" style="line-height: 24px"></UEditor>
                        </el-form-item>
                        <el-form-item>

                            <el-button  @click="payVisible = false">取消</el-button>
                            <el-button type="primary" @click="submitForm('ruleForm2')">{{l('{journalLocale.dateWeek.publish}')}}</el-button>
                        </el-form-item>
                    </el-form>
                </div>

            </div>
            <div v-if="value1==2">
                <span @click="showUserTree = !showUserTree">{{l('{journalLocale.dateWeek.sharePerson}')}} <i class="icon el-icon-plus" style="color: #00a0e9"></i></span>
                <el-tag
                        v-for="(item,index) in filterData"
                        :key="index"
                        closable
                        :disable-transitions="false"
                        @close="deleteUser(item.sid)">
                    {{item.name}}
                </el-tag>
                <el-form :model="ruleForm2" status-icon  ref="ruleForm2" label-width="0px" style="margin-top: 20px" class="demo-ruleForm">
                    <el-form-item>
                        <UEditor id="editor" defaultMsg="请输入内容" :config="UEconfig" ref="UEditor" style="line-height: 24px"></UEditor>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">{{l('{journalLocale.dateWeek.publish}')}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else-if="value1>2">
                {{l('{journalLocale.dateWeek.noData}')}}
            </div>

        </div>

        <user-tree
                :selectUserDialogVisible="showUserTree"
                :enable-checked-multiple = "true"
                :show-inside-outside-tabs = "false"
                :selectedUsers = "filterData"
                @closeCreateModal ="showUserTree = !showUserTree"
                @getUserTree = "getUserTree">
        </user-tree>

    </div>
</template>

<script>
    import UEditor from '@/components/UEditor.vue'
    export default{
        components:{
            UEditor
        },
        methods:{
            //接收用户树返回的数据
            getUserTree:function(arr){
                this.filterData = [...arr]
            },
            //删除用户tag的事件
            deleteUser(sid) {
                this.filterData =  this.filterData.filter(function(item) {
                    return item.sid != sid;
                });
            },
            changeValue (value){
                this.curDate = value;
                console.log(this.curDate.getDay());
                this.getWeek();
                this.value1 = this.curDate.getDay();
            },
            prev (){
                let d = this.weekValue[0].timestamp;
                this.curDate = new Date(d.setDate(d.getDate()-7));
                this.getWeek();
                this.weekValue[0].isCur =true;
            },
            next (){
                let d = this.weekValue[6].timestamp;
                this.curDate = new Date(d.setDate(d.getDate()+7));
                this.getWeek();
            },
            getMonDate (){
                var s=this.curDate.getTime(),
                    d = new Date(s),
                    day=d.getDay(),
                    date=d.getDate();
                if(day==1)
                    return d;
                if(day==0)
                    d.setDate(date-6);
                else
                    d.setDate(date-day+1);
                return d;
            },
            getDayName (day){
                var day=parseInt(day);
                if(isNaN(day) || day<0 || day>6)
                    return false;
                var weekday=[l('{journalLocale.dateWeek.week.Sun}'),l('{journalLocale.dateWeek.week.Mon}'),l('{journalLocale.dateWeek.week.Tues}'),l('{journalLocale.dateWeek.week.Wed}'),l('{journalLocale.dateWeek.week.Thur}'),l('{journalLocale.dateWeek.week.Fri}'),l('{journalLocale.dateWeek.week.Sat}')];
                return weekday[day];
            },
            getWeek (){
                var d=this.getMonDate();
                this.weekValue = [];
                for(var i=0; i<7; i++)
                {
                    let obj = {
                        timestamp:new Date(d.setDate(d.getDate())),
                        str:(d.getMonth()+1)+'-'+d.getDate()+this.getDayName(d.getDay()),
                        isCur:this.curDate.getDate()==d.getDate()
                    }
                    this.weekValue.push(obj);
                    d.setDate(d.getDate()+1);
                }
            },
            liClick (val,index){
                console.log(val.getDay());
                this.value1 = val.getDay();
                this.curDate = val;
                for (var i = 0; i < 7; i++) {
                    this.weekValue[i].isCur = false;
                }
                this.weekValue[index].isCur = true;
            },
//            编辑日志
            editJournal (){
                console.log("edit")
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        data(){
            return {
                payVisible:false,
                showUserTree:false,
                filterData:[],
                dialogTableVisible:false,
                value1: '',
                curDate:'',
                weekValue:[],
                UEconfig:{
                    // 设置不自动调整高度
                    initialFrameHeight:250,//设置编辑器高度
                    scaleEnabled:false,//不可以拉伸
                    toolbars: [[
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'strikethrough',  'blockquote', 'pasteplain', '|', 'selectall', 'cleardoc', '|'
                    ]]
                },
                ruleForm2: {
                    content:''
                }
            }
        },
        mounted (){
            this.curDate = new Date();
            this.getWeek();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

    .date-carousel{
        height: 60px;
        line-height: 60px;
        border: 1px solid #ccc;
        position: relative;
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
            .date-picker{
                float: right;
                width: 80px;
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
        }
    }
    .date-option{
        padding: 12px 22px;
        .member,.time {
            color: #666666;
            font-size: 14px;
            line-height: 24px;
        }
        .time{
            display: inline-block;
        }
        .edit{
            cursor: pointer;
            font-size: 14px;
            color: #00a0e9;
            display: inline-block;
        }
        .edit:hover{

        }
        .filter{
            li{
                position: relative;
                border-top: 1px solid #ccc;
                padding: 20px;
                .avatar{
                    width: 50px;
                    height: 50px;
                    background-color: #c0c4cc;
                    border-radius: 50%;
                    overflow: hidden;
                    position: absolute;
                    left: 20px;
                    top:20px;
                }
                .filter-content{
                    margin-left:80px;
                }
            }

        }
    }

</style>

<style rel="stylesheet/scss" lang="scss">

    .date-picker{
        input.el-input__inner{
            border: 0 none;
            background-color: transparent;

        }
        .el-input__prefix{
            /*position: relative;*/
        }
    }
</style>
