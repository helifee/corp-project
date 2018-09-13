<template>
    <div>
        <div class="wrap clearfix"  v-loading="!sysTime">
            <div class="content-left" v-if="sysTime">
                <date-selection
                        :sysTime="sysTime"
                        @weekChoose="weekChoose"
                        @monthChoose="monthChoose"
                        @quarterChoose="quarterChoose"
                        @selectYear="selectYear"
                        @selectType="selectType"
                ></date-selection>
            </div>
            <div class="content-right" v-if="!isRecord">
                <div class="operation">
                    <div  style="float: right">
                        <el-button size="small" v-if="cancelBtn" @click="cancel" style="margin-right: 0px">取消</el-button>
                        <el-button size="small" v-if="saveBtn" @click="savePlan" type="primary" :disabled ='$refs.attachUpload&&!$refs.attachUpload.allowSubmit' style="margin-right: 16px">保存</el-button>
                        <el-button size="small" v-if="publishBtn" type="primary" @click="release" :disabled ='$refs.attachUpload&&!$refs.attachUpload.allowSubmit' style="margin-right: 16px">发布</el-button>
                    </div>
                </div>
                <div  v-loading="loading" class="plan-wrap">
                    <h3>{{typeName.planTitle}}</h3>
                    <p class="plan-wrap-time">
                        <span v-if="type =='week'&&timeRangeFormat.startTime" style="font-size: 12px">{{timeRangeFormat.startTime}}~{{timeRangeFormat.endTime}}</span>
                    </p>
                    <div>
                        <el-form label-position="top" label-width="80px":model="form" :rules="rules" ref="form">
                            <el-form-item   prop="planContent" style="height: 200px">
                                <p class="plan-lable"><span class="circle"></span><span>{{typeName.planContent}}</span></p>
                                <el-input v-model="form.planContent" :rows="6" placeholder="请输入内容" v-textarea-limiter type="textarea" :maxlength="2500"></el-input>
                            </el-form-item>
                            <el-form-item  prop="planResult" style="position: relative">
                                <p class="plan-lable"><span class="circle" style="background-color: #F8E71C"></span><span>{{typeName.planResult}}</span></p>
                                <span v-if="this.type=='week'&&this.weekNum>=this.curWeek" class="info-item" @click="reference">本周日志参考</span>
                                <el-input v-model="form.planResult" :rows="6"  placeholder="请输入内容" v-textarea-limiter type="textarea" :maxlength="2500"></el-input>
                            </el-form-item>
                            <el-form-item prop="planSummary">
                                <p class="plan-lable"><span class="circle"></span><span>{{typeName.planSummary}}</span></p>
                                <el-input v-model="form.planSummary" :rows="6"  placeholder="请输入内容" v-textarea-limiter type="textarea" :maxlength="2500"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="planshare">
                            <div class="item1">
                                <span class="item-label" style="float: left;margin-top: 8px;">共享：</span>
                                <blend-tree
                                        ref= "groupTree"
                                        :enable-checked-multiple = "true"
                                        :tagButtons="['dept','role','user']"
                                        activeTab = "dept"
                                        :selectedDataToTree = "selectedDataToTree"
                                        @getDataFromTree = "getDataFromTree">
                                    <!--添加按钮图标的插槽-->
                                    <div slot="add_button">
                                        <i class="el-icon-circle-plus" @click.stop = "$refs.groupTree.blendTreeDialogShow()"></i>
                                    </div>
                                </blend-tree>
                            </div>
                            <div class="item2">
                                <span class="item-label"  style="float: left">附件：</span>
                                <attach-upload
                                        style="display: inline-block;vertical-align: top;"
                                        ref="attachUpload"
                                        :required="false"
                                        :appId="attach.appId"
                                        :multiple="false"
                                        :businessId="attach.businessId"
                                        :categoryId="attach.categoryId"
                                        @fileQueued="handleAttachQueued"
                                        @uploadError="handleAttachError"
                                        @uploadFinished="handleAttachUploadSuccess">
                                </attach-upload>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-right" v-else>
                <div class="operation">
                    <div  style="float: right">
                        <el-button size="small" type="primary" @click="editPlan" style="margin-right: 16px">编辑</el-button>
                    </div>
                </div>
                <span v-if="this.type=='week'&&this.weekNum>=this.curWeek" class="info-item info-item-detail" @click="reference">本周日志参考</span>
                <report-Detail id="reportId"  v-loading="loading" :detailData="detailData" :type="type" :showShare="true" style="padding:0 24px"></report-Detail>
            </div>

        </div>
        <el-dialog width="50%" title="本周工作日志" :visible.sync="dialogRefer">
            <div class="dialog-journal" v-loading="journalLoad">
                <timeline>
                    <timeline-title>{{journalList1.journalMouth}}</timeline-title>
                    <div  v-for="item in journalList1.journalList">
                        <timeline-item v-if="item.isCurDate" color="#9dd8e0"><div slot="others">今天</div>
                            <div v-if="item.journalContent">
                                <pre v-html="item.journalContent"></pre>
                            </div>
                            <div v-else class="noData">无日志内容</div>
                            <p class="time">{{item.journalDate}}</p>
                        </timeline-item>
                        <timeline-item v-else><div slot="others">{{item.journalDay}}号</div>
                            <div v-if="item.journalContent">
                                <pre v-html="item.journalContent"></pre>
                            </div>
                            <div v-else class="noData">无日志内容</div>
                            <p class="time">{{item.journalDate}}</p>
                        </timeline-item>
                    </div>
                    <timeline-title v-if="journalList2.journalMouth">{{journalList2.journalMouth}}</timeline-title>
                    <div  v-for="item in journalList2.journalList">
                        <timeline-item v-if="item.isCurDate" color="#9dd8e0"><div slot="others">今天</div>
                            <div v-if="item.journalContent" >
                                <pre v-html="item.journalContent"></pre>
                            </div>
                            <div v-else class="noData">无日志内容</div>
                            <p class="time">{{item.journalDate}}</p>
                        </timeline-item>
                        <timeline-item v-else><div slot="others">{{item.journalDay}}号</div>
                            <div v-if="item.journalContent" >
                                <pre v-html="item.journalContent"></pre>
                            </div>
                            <div v-else class="noData">无日志内容</div>
                            <p class="time">{{item.journalDate}}</p>
                        </timeline-item>
                    </div>
                </timeline>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    JZY.locale.add('planLocale',require('./plan.locale'));
    import timeline from '@Main/plan/components/timeline'
    import timelineItem from '@Main/plan/components/timelineItem'
    import timelineTitle from '@Main/plan/components/timelineTitle'
    import dateSelection from '@Main/plan/components/dateSelection.vue'
    import reportDetail from '@Main/plan/report.Detail.vue'
    import {postPlanPublish,postPlanDetail} from '@Main/plan/getData.js'
    import moment from 'moment'
    export default{
        components:{
            timeline,
            timelineItem,
            timelineTitle,
            dateSelection,
            reportDetail
        },
        data(){
            return {
                management:JZY.s.hasMenuPermisson('journal_view','modify'),
                filterData:[],
                cancelBtn:false,
                saveBtn:false,
                publishBtn:false,
                isRecord:false,//是否已经有计划  true有  false 没有
                form:{
                    planContent:'',
                    planResult:'',
                    planSummary:'',
                },
                rules:{
                    planContent:[
//                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    planResult:[
//                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    planSummary:[
//                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                },
                attach:{
                    appId:'',
                    businessId:'',
                    categoryId:'',
                },

                year: moment().format('YYYY'),
                weekNum:parseInt(moment().format("W")),
                type:'week',
                typeNum:'1',
                curWeek:1,
                curMonth:1,
                curQuarter:1,
                typeName:{
                    planTitle:'',
                    effect:'本周工作成效',
                    experience:'总结心得',
                    plan:'下一周计划内容',
                },
                timeRange:{
                    startTime:'',
                    endTime:'',
                },
                timeRangeFormat:{
                    startTime:'',
                    endTime:'',
                },
                dialogRefer:false,
                journalList1:{},
                journalList2:{},
                journalLoad:false,
                isEdit:true,
                loading:false,
                detailData:{},
                selectedDataToTree: {//已选树节点
                    userList: [],
                    deptList: [],
                    roleList: []
                },
                formGroupData:{
                    userList: [],
                    deptList: [],
                    roleList: []
                },
                sysTime:'',//系统时间

            }
        },
        methods:{

            getDataFromTree( obj = {} ){
                this.formGroupData = {...obj};
            },


            changeTitle(type){
                let name = this.$store.state.session.tenantInfo.userName;
                let str = '';
                let dataTitle = {};
                switch(type) {
                    case 'week':
                        str = name + '的第' + this.typeNum +'周的工作计划';
                        dataTitle={
                                planTitle:str,
                                planContent:'本周计划内容',
                                planResult:'本周工作成效',
                                planSummary:'总结心得',
                            };
//                        console.log(dataTitle,'wqdnk');
                        this.typeName = {...dataTitle};
                        break;
                    case 'month':
                        str = name + '的'+this.year+'年' + this.typeNum +'月工作计划';
                        dataTitle={
                            planTitle:str,
                            planContent:'本月计划内容',
                            planResult:'本月工作成效',
                            planSummary:'总结心得',
                        };
                        this.typeName = {...dataTitle};
                        break;
                    case 'quarter':
                        str = name + '的'+this.year+'年' + this.typeNum +'季度工作计划';
                        dataTitle={
                            planTitle:str,
                            planContent:'本季度计划内容',
                            planResult:'本季度工作成效',
                            planSummary:'总结心得',
                        };
                        this.typeName = {...dataTitle};
                        break;
                    case 'year':
                        str = name + '的'+this.year+'年' +'年度工作计划';
                        dataTitle={
                            planTitle:str,
                            planContent:'本年计划内容',
                            planResult:'本年工作成效',
                            planSummary:'总结心得',
                        };
                        this.typeName = {...dataTitle};
                        break;
                }
            },
            selectYear(year){
                this.year = year;

                this.loading = true;
//                this.isAttachUploadFinished=true
                this.changeTitle(this.type);
                this.rqPlanDetail();
            },
            selectType(type,typeNum){
                this.type=type;
//                this.isAttachUploadFinished=true
                switch(type) {
                    case 'week':
                        this.typeNum = typeNum.week;
                        break;
                    case 'month':
                        this.typeNum = typeNum.month;
                        break;
                    case 'quarter':
                        this.typeNum = typeNum.quarter;
                        break;
                    case 'year':
                        this.typeNum = typeNum.year;
                        break;
                }
                this.changeTitle(type);
//                console.log(this.year,this.type,this.typeNum,"this.year,this.type,this.typeNum")

                this.loading = true;
                this.rqPlanDetail();

            },
            weekChoose(typeNumber){
//                this.isAttachUploadFinished=true
                this.curWeek=typeNumber.week;
                this.typeNum = typeNumber.week;
                this.type = 'week';
                this.changeTitle(this.type);
//                console.log(this.year,this.type,this.typeNum,"weekChoose")



                this.loading = true;
                this.rqPlanDetail();
            },
            monthChoose(typeNumber){
//                this.isAttachUploadFinished=true
                this.curMonth=typeNumber.month;
                this.typeNum = typeNumber.month;
                this.type = 'month';
                this.changeTitle(this.type);

//                console.log(this.year,this.type,this.typeNum,"monthChoose")

                this.loading = true;
                this.rqPlanDetail();
            },
            quarterChoose(typeNumber){
//                this.isAttachUploadFinished=true
                this.curQuarter=typeNumber.quarter;
                this.typeNum = typeNumber.quarter;
                this.type = 'quarter';
                this.changeTitle(this.type);
//                console.log(this.year,this.type,this.typeNum,"this.year,this.type,this.typeNum")
                this.loading = true;
                this.rqPlanDetail();
            },
            //发布计划
            release(){

                this.$refs['form'].validate(async (valid) => {
                    if(valid) {
                        await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                        let planType;//计划类型：0周，1月，2季度，3年度
                        switch (this.type) {
                            case 'week':
                                planType = 0;
                                break;
                            case 'month':
                                planType = 1;
                                break;
                            case 'quarter':
                                planType = 2;
                                break;
                            case 'year':
                                planType = 3;
                                break;
                        }
                        //用户
                        let userIdList = [];
                        if (this.formGroupData.userList) {
                            let data = this.formGroupData.userList;
                            data.map((item) => {
                                userIdList.push(item.sid);
                            });
                        }
                        //角色
                        let roleIdList = [];
                        if (this.formGroupData.roleList) {
                            let data = this.formGroupData.roleList;
                            data.map((item) => {
                                roleIdList.push(item.roleId);
                            });
                        }
                        //部门
                        let orgIdList = [];
                        if (this.formGroupData.deptList) {
                            let data = this.formGroupData.deptList;
                            data.map((item) => {
                                orgIdList.push(item.sid);
                            });
                        }

                        let queryData = {
                            "planTitle": this.typeName.planTitle,
                            "planYear": this.year,
                            "planType": planType,
                            "planNumber": this.typeNum,
                            "planContent": this.form.planContent,
                            "planResult": this.form.planResult,
                            "planSummary": this.form.planSummary,
                            "userIdList": userIdList,
                            "roleIdList": roleIdList,
                            "orgIdList": orgIdList,
                            "businessId": this.attach.businessId
                        };
                        if (queryData.planContent || queryData.planResult || queryData.planSummary || this.$refs.attachUpload.uploadFilesList.length) {
                            this.loading = true;

//                        console.log(JSON.stringify(queryData));
                            this.rqPlanSave(queryData);
                        } else {
                            this.$message({
                                message: '提交内容不能为空',
                                type: 'warning'
                            });
                        }
                    }
                });

                },
            changeType(value){
                switch (value) {
                    case 'week':
                        return 0;
                    case 'month':
                        return 1;
                    case 'quarter':
                        return 2;
                    case 'year':
                        return 3;
                }
            },
            initData(){
                this.form.planResult = this.detailData.planResult;
                this.form.planSummary = this.detailData.planSummary;
                this.form.planContent = this.detailData.planContent;
                this.formGroupData = {deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[]};
                this.selectedDataToTree = {deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[]};

                //部门
                let orgShareDtoList = this.detailData.orgShareDtoList;
//                console.log(this.detailData)
                if(orgShareDtoList){
                    orgShareDtoList.map((item)=>{
                        let share = {};
                        share.name = item.name;
                        share.sid = item.id;
                        this.selectedDataToTree.deptList.push(share);
                        this.formGroupData.deptList.push(share);
                    });
                }

                //角色
                let roleShareDtoList = this.detailData.roleShareDtoList;
                if(roleShareDtoList){
                    roleShareDtoList.map((item)=>{
                        let share = {};
                        share.roleName = item.name;
                        share.roleId = item.id;
                        this.selectedDataToTree.roleList.push(share);
                        this.formGroupData.roleList.push(share);
                    });
                }

                //人员
                let userShareDtoList = this.detailData.userShareDtoList;
                if(userShareDtoList){
                    userShareDtoList.map((item)=>{
                        let share = {};
                        share.name = item.name;
                        share.sid = item.id;
                        this.selectedDataToTree.userList.push(share);
                        this.formGroupData.userList.push(share);
                    });
                }
            },
            cancel(){
                this.isRecord=true;
            },
            //编辑计划
            editPlan(){
                this.initData();
                this.isRecord=false;
                this.cancelBtn = true;
                this.saveBtn = true;
                this.publishBtn = false;
            },
            savePlan(){
                this.$refs['form'].validate(async (valid) => {
                    if(valid) {
                        await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                        let planType;//计划类型：0周，1月，2季度，3年度
                        switch (this.type) {
                            case 'week':
                                planType = 0;
                                break;
                            case 'month':
                                planType = 1;
                                break;
                            case 'quarter':
                                planType = 2;
                                break;
                            case 'year':
                                planType = 3;
                                break;
                        }
                        //用户
                        let userIdList = [];
                        if (this.formGroupData.userList) {
                            let data = this.formGroupData.userList;
                            data.map((item) => {
                                userIdList.push(item.sid);
                            });
                        }
                        //角色
                        let roleIdList = [];
                        if (this.formGroupData.roleList) {
                            let data = this.formGroupData.roleList;
                            data.map((item) => {
                                roleIdList.push(item.roleId);
                            });
                        }
                        //部门
                        let orgIdList = [];
                        if (this.formGroupData.deptList) {
                            let data = this.formGroupData.deptList;
                            data.map((item) => {
                                orgIdList.push(item.sid);
                            });
                        }

                        let queryData = {
                            "sid": this.detailData.sid,
                            "planTitle": this.typeName.planTitle,
                            "planYear": this.year,
                            "planType": planType,
                            "planNumber": this.typeNum,
                            "planContent": this.form.planContent,
                            "planResult": this.form.planResult,
                            "planSummary": this.form.planSummary,
                            "userIdList": userIdList,
                            "roleIdList": roleIdList,
                            "orgIdList": orgIdList,
                            "businessId": this.attach.businessId
                        };
                        if (queryData.planContent || queryData.planResult || queryData.planSummary || this.$refs.attachUpload.uploadFilesList.length) {
                            this.loading = true;
                            //                    console.log(JSON.stringify(queryData));
                            this.rqPlanSave(queryData);
                        } else {
                            this.$message({
                                message: '提交内容不能为空',
                                type: 'warning'
                            });
                        }
                    }
                    //                console.log(queryData)
                    //                console.log(JSON.stringify(queryData))
                });
            },
            //日报参考
            reference(){
                if(this.management){
                    this.dialogRefer = true;
                    let beginDate = this.timeRange.startTime;
                    let endDate=this.timeRange.endTime;
                    let journalList1 = {
                        journalDate:'',
                        journalMouth:'',
                        journalList:[],
                    };
                    let journalList2 = {
                        journalDate:'',
                        journalMouth:'',
                        journalList:[],
                    };
                    for(let i=0;i<7;i++){
                        let journalDate = moment(beginDate).day(i).add(1, 'days').format('YYYY-MM-DD');
                        let journalMouth = moment(beginDate).day(i).add(1, 'days').format('YYYY年MM月');
                        let obj = {
                            journalDate:journalDate,
                            journalMouth:journalMouth,
                            journalDay:moment(beginDate).day(i).add(1, 'days').format('D'),
                            journalContent:"",
                            isCurDate:moment(beginDate).day(i).add(1, 'days').format('YYYY-MM-DD') == moment().format('YYYY-MM-DD'),
                        };

                        if(journalMouth == moment(beginDate).format('YYYY年MM月')){
                            journalList1.journalDate = journalDate;
                            journalList1.journalMouth = journalMouth;
                            journalList1.journalList.push(obj);
                        }else{
                            journalList2.journalDate = journalDate;
                            journalList2.journalMouth = journalMouth;
                            journalList2.journalList.push(obj);
                        }

                    }
                    this.journalList1 = {...journalList1}
                    this.journalList2 = {...journalList2}
                    this.journalLoad = true;
                    console.log(this.timeRange,"this.timeRangethis.timeRange");
                    this.getJournal();
                }else{
                    this.$message.error(' 您没有权限查看日志，请联系管理员开通日志使用权');
                }

            },

            //文件上传-上传中
            handleAttachQueued(){
                // alert('add one new attach file')
//                this.isAttachUploadFinished=false
            },
            //文件上传-成功
            handleAttachUploadSuccess(res){
//                this.isAttachUploadFinished=true
//                alert('全部上传成功,返回信息请查看控制台显示')
//                console.log('附件上传成功返回信息：',res)
            },
            //文件上传-出错
            handleAttachError(){
//                this.isAttachUploadFinished=true
//                alert('附件上传出错啦')
            },


            //保存计划
            async rqPlanSave(queryData){
                let res = await postPlanPublish(queryData);
//                console.log(res,"res成功啊 啊啊");
                if(queryData.sid){
                    this.$message({
                        message: '计划保存成功！',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: '新建计划成功！',
                        type: 'success'
                    });
                }

//                this.loading = false;
//                this.isRecord = true;


                this.loading = true;
                this.rqPlanDetail();

            },
            //我的计划查看
            async rqPlanDetail(){
                let type = this.changeType(this.type);
                let queryData = {
                    planYear:this.year,
                    planType:type,
                    planNumber:parseInt(this.typeNum),
                };
                let res = await postPlanDetail(queryData);

//                console.log(JSON.stringify(res[0]))
//                console.log(res[0],"res我的计划查看 啊啊");
                this.form = {
                    planContent:'',
                    planResult:'',
                    planSummary:'',
                };
                this.attach = {
                    appId:'',
                    businessId:'',
                    categoryId:''
                };
                this.formGroupData = {deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[]};
                this.selectedDataToTree = {deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[]};


                if(!res[0].sid){
                    this.isRecord = false;
                    this.cancelBtn = false;
                    this.saveBtn = false;
                    this.publishBtn = true;
                    this.timeRange.startTime = res[0].weekPlanStartDate;
                    this.timeRange.endTime = res[0].weekPlanEndDate;
                    this.timeRangeFormat.startTime = moment(res[0].weekPlanStartDate).format("MM-DD");
                    this.timeRangeFormat.endTime = moment(res[0].weekPlanEndDate).format("MM-DD");

//                    this.getAttach();
                }else{
                    this.timeRange.startTime = res[0].weekPlanStartDate;
                    this.timeRange.endTime = res[0].weekPlanEndDate;
                    this.detailData = {...res[0]}
                    this.isRecord = true;
                }
                this.attach.appId = res[0].appId;
                this.attach.businessId = res[0].businessId;
                this.attach.categoryId = res[0].categoryId;

//                console.log(this.attach,"this.attach")
                this.loading = false;

            },
            //本周日报参考
            async getJournal(){
                let beginDate = this.timeRange.startTime;
                let endDate = this.timeRange.endTime;
                let res  = await JZY.xhr.r([{type:'get',url:'/journal/date?startDate='+beginDate+'&endDate='+endDate+''}],'GLOBAL.SHANG_BIN',false,false).then((resultData)=>{
                    try{
                        return resultData;

                    }catch (e){
                        return false;
                    }
                }).catch((e)=>{
                    //接口失败
                    throw new Error(e)
                });
                let list = res[0];
                let journalList1 = this.journalList1.journalList;
                let journalList2 = this.journalList2.journalList;
                list.map(item=>{
//                    journalList1.journalDate
//                    item.journalDate
                    journalList1.map((item1,index)=>{
                        if(item.journalDate==item1.journalDate){
                            this.journalList1.journalList[index].journalContent = item.content;
                        }
                    });
                    journalList2.map((item2,index)=>{
                        if(item.journalDate==item2.journalDate){
                            this.journalList1.journalList[index].journalContent = item.content;
                        }
                    });


                });
                this.journalLoad = false;
//                console.log(JSON.stringify(res[0]),"getJournalgetJournal");
            },
            //获取服务器时间
            async getSysTime(){
                let res = await JZY.xhr.r([{
                    type: 'get',
                    url: '/sys/common/getSysTime',
                    data: {}
                }], 'GLOBAL', false, {alertError:true,alertSuccess:false}).then((res) => {
                    try {

                        this.sysTime = res[0];
                        console.log(res,"系统时间");
                        return res;

                    } catch (e) {

                        return false;
                    }
                }).catch((e) => {
                    //接口失败
                    throw new Error(e)
                });
            }
        },
        mounted(){
            this.changeTitle(this.type);
        },
        filters:{
            type (value){
                switch (value) {
                    case 'week':
                        return '周';
                    case 'month':
                        return '月';
                    case 'quarter':
                        return '季';
                    case 'year':
                        return '年';
                }
            }
        },
        created(){
          this.getSysTime()
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
    .wrap{
        overflow: hidden;
        position: relative;
        height: 100%;
        overflow-y: hidden;
        background: #F0F2F3;
    }
    .content-left{
        float: left;
        width: 200px;
        height: 100%;
        overflow-y: hidden;
        position: relative;
    }
    .content-right{
        margin-left: 208px;
        background: #ffffff;
        height: 100%;
        overflow-y: auto;
        box-shadow: 0 2px 4px 0 rgba(233,233,233,0.50);
        position: relative;
        .el-form .el-form-item{
            margin-bottom: 0px;
        }
        .operation{
            height: 64px;
            line-height: 64px;
            position: absolute;
            right: 0px;
        }
        .plan-wrap{
            padding: 0px 24px;
            h3{
                font-size: 16px;
                font-weight: normal;
                margin: 20px 0 3px 0;
                display: inline-block;
                color: $theme-black-title;
            }
        }
        .plan-wrap-time{
            margin: 0px 20px;
            height: 24px;
            line-height: 24px;
            display: inline-block;
            color: $theme-black-other;
        }
    }
    .el-step.is-vertical .el-step__title{
        margin-left: -120px;
        text-align: right;
        width: 78px;
    }
    .info-item{
        border:0 none;
        position: absolute;
        right: 0px;
        top:10px;
        font-size: 14px;
        line-height: 32px;
        color: $theme-blue;
        cursor: pointer;
    }
    .info-item:hover{
        border:0 none;
        background: #ffffff;
    }
    .info-item.info-item-detail{
        top:80px;
        right: 16px;
    }
    .planshare{
        /*border: 1px solid $theme-grey-table-border;*/
        -webkit-border-radius:3px;
        -moz-border-radius:3px;
        border-radius:3px;
        margin-bottom: 60px;
        .item1,.item2{
            line-height: 24px;
            padding: 6px 6px;
            .item-label{
                float: left;
                vertical-align: middle;
                font-size: 12px;
                margin-top: 4px;
            }
        }
        .item1{
            /* border-bottom: 1px solid $theme-grey-table-border;*/
        }
        .item2{
            margin: 0px;
        }
    }
    .dialog-journal{
        height: 420px;
        overflow-y: scroll;
        .timeline-item{
            border-bottom:0px none;
        }
        .timeline:after{
            top:3px;
        }
        .time{
            color: #999;
            font-size: 12px;
        }
        .noData{
            color: #999;
        }
    }
    .plan-lable{
        font-size: 14px;
        height: 32px;
        padding: 0;
        span{
            float: left;
            vertical-align: middle;
            line-height: 18px;
        }
        .circle{
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: $theme-blue;
            margin-right: 8px;
        }
    }

    .el-popper[x-placement^=bottom] .popper__arrow{
        display: none;
    }
</style>

