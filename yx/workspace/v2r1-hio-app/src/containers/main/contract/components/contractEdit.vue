<template>
    <div class="contractEdit">
        <!--合同查看/编辑/新增  和审批流程共用此组件-->
        <div v-if="editType=='look' || editType=='reLook'">
            <el-form label-position="right" label-width="120px">
                <el-form-item label="合同主题：">{{detailData.title}}</el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同类型：">{{detailData.contractTypeName}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同编号：" >{{detailData.code}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="甲方单位：">{{detailData.firstParty}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="乙方单位：" >{{detailData.secondParty}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收款单位：" >{{detailData.payee}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同开始时间：">{{JZY.u.formatTime(detailData.startDate).substr(0,10)}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同结束时间：" >{{JZY.u.formatTime(detailData.endDate).substr(0,10)}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同金额/元：" >{{formatMoneyDisplay(detailData.money)}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="签订日期：">{{JZY.u.formatTime(detailData.signingDate).substr(0,10)}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="经办人：" >{{detailData.operatorName}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办部门：" >{{detailData.operatorDeptName}}</el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="合同摘要：">
                    <!--<UEditor id="contractLookUEditor" defaultMsg="请输入内容" :config="UEconfig" ref="contractLookUEditor" @ready="lookUEOpen"-->
                             <!--style="line-height: 24px"></UEditor>-->
                    <span v-html="detailData.summary" class="uedit-content-contract"></span>
                </el-form-item>
                <el-form-item label="付款约定：" >{{detailData.paymentAgreement}}</el-form-item>
                <el-form-item label="其他："  prop="remark">{{detailData.remark}}</el-form-item>
                <el-form-item label="附件：" >
                    <attach-upload v-if="showAttachment" @attachUploadSuccess="handleAttachUploadSuccess" :appId="attachmentPK.appId" style="width: calc(100% - 30px)"
                                   :readonly="true"   :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
                </el-form-item>
            </el-form>
        </div>
        <div v-else>
            <el-form label-position="right" label-width="120px" :model="detailData" :rules="rules" ref="refForm">
                <el-form-item label="合同主题：" prop="title">
                    <el-input v-model="detailData.title" maxlength="500" placeholder="输入合同主题"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同类型：" prop="contractTypeId">
                            <el-cascader  :options="contractTypeTreeData"  v-model="selectContractTypeIdPath" change-on-select
                                         expand-trigger="hover" :show-all-levels="false"　:props="typePropsConfig" placeholder="请选择合同类型"
                                          style="width: 100%" @change="handleContractTypeChange" ref="refContractType"></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同编号：" prop="code">
                            <el-input v-model="detailData.code" maxlength="100" placeholder="输入合同编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="甲方单位：" prop="firstParty">
                            <el-input v-model="detailData.firstParty" maxlength="500" placeholder="输入甲方单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="乙方单位：" prop="secondParty">
                            <el-input v-model="detailData.secondParty" maxlength="500" placeholder="输入乙方单位"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="收款单位：" prop="payee">
                            <el-input v-model="detailData.payee" maxlength="500" placeholder="输入收款单位"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同开始时间：" prop="startDate">
                            <el-date-picker v-model="detailData.startDate" type="date" placeholder="合同开始时间" v-if="datePickerShow"
                                            :clearable="false"   style="width: 100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合同结束时间：" prop="endDate">
                            <el-date-picker v-model="detailData.endDate" type="date" placeholder="合同结束时间"  v-if="datePickerShow"
                                            :clearable="false" style="width: 100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="合同金额/元：" prop="money">
                            <el-input v-model="detailData.money" @blur="handleMoney" placeholder="合同金额"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="签订日期：" prop="signingDate">
                            <el-date-picker v-model="detailData.signingDate" type="date" placeholder="签订日期"  v-if="datePickerShow"
                                            :clearable="false"      style="width: 100%">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="!flow">
                    <el-col :span="12">
                        <el-form-item label="经办人：" prop="operatorId">
                            <el-button class="operaterDept" plain
                                       @click="handlerSeleUser">{{detailData.operatorName}}</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经办部门：" prop="operatorDeptId">
                            <el-button class="operaterDept" plain
                                       @click="handlerSeleDep">{{detailData.operatorDeptName}}</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="合同摘要：" prop="summary" style="max-width: 100%">
                    <UEditor id="contractEditUEditor" defaultMsg="请输入内容" :config="UEconfig" ref="contractEditUEditor" @ready="testOpen"
                             style="line-height: 24px" :appId="attachmentPK.appId"
                             :businessId="JZY.u.uuid()" :categoryId="attachmentPK.categoryId"></UEditor>
                </el-form-item>
                <el-form-item label="付款约定："  prop="paymentAgreement">
                    <el-input type="textarea" :rows="5"  v-textarea-limiter maxlength="2500"
                              v-model="detailData.paymentAgreement">
                    </el-input>
                </el-form-item>
                <el-form-item label="其他："  prop="remark">
                    <el-input type="textarea" :rows="5" v-textarea-limiter maxlength="1024"
                              v-model="detailData.remark">
                    </el-input>
                </el-form-item>
                <el-form-item label="附件：" >
                    <attach-upload v-if="showAttachment" @attachUploadSuccess="handleAttachUploadSuccess" :appId="attachmentPK.appId"
                              ref="contractAttachment" :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
                </el-form-item>
            </el-form>
        </div>
        <blend-tree ref= "refSelectUserDialogVisible" :selectedDataToTree = "selectedUsersToTree" :resultDataListShow ="false"
                :enable-checked-multiple = "false" :tagButtons="['user']" activeTab = "user"
                @getDataFromTree = "userFromTreeFunc">
        </blend-tree>
        <selectDep :selectDepDialogVisible.sync="showDeptTreeOnly" @getSelectDep="getDeptFromTree"
                   v-if="showDeptTreeOnly" :displayAllDep="false" :userId="detailData.operatorId"></selectDep>
    </div>
</template>

<script>
    import UEditor from '@/components/UEditor.vue'
    import seleUser from '@/components/userTree/userTree.vue'
    import contractUtil from '../contract.util'
    import selectDep from '../components/selectDep'
    let fromRules={ title:[{required: true,message: '请输入合同主题', trigger: 'blur'},
                { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }],
            contractTypeId:{required: true, message: '请选择合同类型', trigger: 'blur'},
            code:{ required: true, message: '请输入合同编号', trigger: 'blur'},
            firstParty:{ required: true,message: '请输入甲方单位', trigger: 'blur'},
            secondParty:{ required: true,message: '请输入乙方单位', trigger: 'blur'},
            startDate:{ required: true,message: '请选择合同开始时间', trigger: 'blur'},
            endDate:{ required: true,message: '请选择合同结算时间', trigger: 'blur'},
            payee:{ required: true,message: '请输入收款单位', trigger: 'blur'},
            money:{ required: true,message: '请输入合同金额', trigger: 'blur'},
            summary:{ required: true,message: '请输入合同摘要', trigger: 'blur'},};
    export default {
        name: "contract-edit",
        components:{
            UEditor,
            seleUser,
            selectDep
        },
        data(){
            return{
                typePropsConfig:{
                    value:"sid",
                    label:"contractType",
                    children:"children"
                },
                contractTypeTreeData:[],
                selectContractTypeIdPath:[],
                UEconfig:contractUtil.contractUEditConfig(),
                detailData:{
                    sid:"",   //新建时给附件的id
                    businessId:"",
                    title:"",
                    contractTypeId:"",
                    contractTypeName:"",
                    code:"",
                    firstParty:"",
                    secondParty:"",
                    payee:"",
                    startDate:"",
                    endDate:"",
                    money:"",
                    signingDate:new Date(),
                    operatorId:this.$store.state.session.sid,
                    operatorName:this.$store.state.session.name,
                    operatorDeptId:this.$store.state.session.parentRealityId,
                    operatorDeptName:this.$store.state.session.dept,
                    summary:"",
                    paymentAgreement:"",
                    remark:"",
                },
                rules:fromRules,
                // selectUserDialogVisible:false,
                selectedUsersToTree:{},
                showDeptTreeOnly:false,
                selectedDeptToTree:[],
                attachmentPK:{
                    appId:"",
                    businessId:"",
                    categoryId:""
                },
                showAttachment:false,
                contractTypeValue:[],
                datePickerShow:true
            }
        },
        props:{
            contractId:{
                required:true
            },
            editType:{
                required:true,   //look,edit,add,reLook(流程驳回查看),reEdit(流程驳回edit),design(流程设计态不保存但要数据结构)
                default:"look"
            },
            flow:{
                type:Boolean,
                default:true          //是否是流程调用
            }
        },
        mounted(){
            if(this.editType!="add" && this.editType!="design"){
                let isApproveQuery=this.flow==true?1:0;
                JZY.xhr.requestPromises([
                    JZY.xhr.post(this.getUrl('/contract/contractType/getContractTypeList'),{},{alertSuccess:false}),
                    // JZY.xhr.r(this.getUrl('/contract/contractInfo/get/')+this.contractId),
                   // isApproveQuery 1：审批查询 0：其他
                    JZY.xhr.post(this.getUrl('/contract/contractInfo/getContractInfo'),{sid:this.contractId,isApproveQuery:isApproveQuery},{alertSuccess:false}),
                ]).then(async ([contractTypeList,contractDetailData])=>{
                    this.contractTypeTreeData=contractTypeList[0];
                    this.detailData.sid=contractDetailData[0].sid;
                    this.detailData.businessId=contractDetailData[0].sid;
                    this.detailData.title=contractDetailData[0].title;
                    this.detailData.contractTypeId=contractDetailData[0].contractTypeId;
                    this.detailData.contractTypeName=contractDetailData[0].contractTypeName;
                    this.detailData.code=contractDetailData[0].code;
                    this.detailData.firstParty=contractDetailData[0].firstParty;
                    this.detailData.secondParty=contractDetailData[0].secondParty;
                    this.detailData.payee=contractDetailData[0].payee;
                    this.datePickerShow=false;
                    this.detailData.startDate=contractDetailData[0].startDate;
                    this.detailData.endDate=contractDetailData[0].endDate;
                    this.detailData.signingDate=contractDetailData[0].signingDate;
                    this.$nextTick(()=>{
                        this.datePickerShow=true;
                    })
                    this.detailData.money=this.formatMoneyDisplay(contractDetailData[0].money);
                    this.detailData.operatorId=contractDetailData[0].operatorId;
                    this.detailData.operatorName=contractDetailData[0].operatorName;
                    this.detailData.operatorDeptId=contractDetailData[0].operatorDeptId;
                    this.detailData.operatorDeptName=contractDetailData[0].operatorDeptName;
                    this.detailData.paymentAgreement=contractDetailData[0].paymentAgreement;
                    this.detailData.remark=contractDetailData[0].remark;
                    this.detailData.summary=contractDetailData[0].summary;
                    if(this.editType=="reLook" || this.editType=="reEdit"){
                        //驳回需要重新取id
                        JZY.xhr.requestPromises([
                            JZY.xhr.post(this.getUrl('/contract/contractInfo/getContractGeneratePk'),{},{alertSuccess:false}),
                        ]).then(async ([generatePk])=>{
                            this.detailData.sid=generatePk[0].businessId;
                            this.detailData.businessId=generatePk[0].businessId;   //流程使用
                            this.attachmentPK=generatePk[0];
                            this.showAttachment=true;
                        })
                    }else{
                        this.attachmentPK=contractDetailData[0].fileIdDto;
                        this.showAttachment=true;
                    }
                    this.queryContractTypeTreePaths(this.contractTypeTreeData,this.detailData.contractTypeId);
                })
            }else if(this.editType!="design"){
                //新增
                JZY.xhr.requestPromises([
                    JZY.xhr.post(this.getUrl('/contract/contractInfo/getContractGeneratePk'),{},{alertSuccess:false}),
                    JZY.xhr.post(this.getUrl('/contract/contractType/getContractTypeList'),{},{alertSuccess:false}),
                ]).then(async ([generatePk,contractTypeList])=>{
                    this.contractTypeTreeData=contractTypeList[0];
                    this.detailData.sid=generatePk[0].businessId;
                    this.detailData.businessId=generatePk[0].businessId;   //流程使用
                    this.attachmentPK=generatePk[0];
                    // if(this.reBusinessId!="" && this.reBusinessId!=undefined){
                    //     this.attachmentPK.businessId=this.reBusinessId;
                    // }
                    this.showAttachment=true;
                })
            }
        },
        watch:{
            selectContractTypeIdPath(){
                this.detailData.contractTypeId=this.selectContractTypeIdPath[this.selectContractTypeIdPath.length-1]
            }
        },
        methods:{
            getUrl(url){
                let resUrl= JZY.xhr.transformUrl(url,'GLOBAL.OA',false);
                return resUrl;
            },
            formatMoneyDisplay(money){
                return contractUtil.transformMoneyFormat(money);
            },
            handleMoney(){
                this.detailData.money=this.formatMoneyDisplay( this.detailData.money);
            },
            handlerSeleUser(){
                this.selectedUsersToTree={userList:[{
                    sid:this.detailData.operatorId,
                    name:this.detailData.operatorName,
                    organizationId:this.detailData.operatorDeptId,
                    organizationName:this.detailData.operatorDeptName,
                }]};
                // this.selectUserDialogVisible=true;
                this.$refs.refSelectUserDialogVisible.blendTreeDialogShow();
            },
            testOpen(){
                this.$nextTick(()=>{
                    this.$refs.contractEditUEditor.setContent(this.detailData.summary);
                })
            },
            // lookUEOpen(){
            //     this.$nextTick(()=>{
            //         this.$refs.contractLookUEditor.setContent(this.detailData.summary);
            //     })
            // },
            handlerSeleDep(){
                this.showDeptTreeOnly=true;
            },
            getDeptFromTree(selectedDepts){
                this.detailData.operatorDeptName=selectedDepts.name;
                this.detailData.operatorDeptId=selectedDepts.sid;
                // if(selectedDepts.length>0){
                //     this.detailData.operatorDeptName=selectedDepts[0].name;
                //     this.detailData.operatorDeptId=selectedDepts[0].sid;
                // }
            },
            userFromTreeFunc(selectedUsers){
                if(selectedUsers.userList.length>0){
                    this.detailData.operatorName=selectedUsers.userList[0].name;
                    this.detailData.operatorId=selectedUsers.userList[0].sid;
                    this.detailData.operatorDeptId=selectedUsers.userList[0].organizationId;
                    this.detailData.operatorDeptName=selectedUsers.userList[0].organizationName;
                }
            },
            handleAttachUploadSuccess(){

            },
            handleContractTypeChange(curValue){
                this.$nextTick(function(){
                    this.detailData.contractTypeName=this.$refs.refContractType.$el.innerText;
                    // console.info(this.$refs.refContractType.$el.innerText)
                })
            },
            queryContractTypeTreePaths(treeData,sid){
                try{
                    treeData.forEach(item=>{
                        if(item.sid==sid){
                            this.selectContractTypeIdPath=item.prefixId.split("/");
                            foreach.break=new Error("StopIteration");
                        }
                        if(item.children){
                            this.queryContractTypeTreePaths(item.children,sid)
                        }
                    })
                }catch (e){
                    console.log(e)
                }

            },
            getSavePas(){
                this.detailData.summary=this.$refs.contractEditUEditor.getContent();
                let pas={
                    sid:this.detailData.sid,
                    title:this.detailData.title,
                    contractTypeId:this.detailData.contractTypeId,
                    code:this.detailData.code,
                    firstParty:this.detailData.firstParty,
                    secondParty:this.detailData.secondParty,
                    payee:this.detailData.payee,
                    startDate:this.detailData.startDate==""?"":JZY.u.formatTime(this.detailData.startDate),
                    endDate:this.detailData.endDate==""?"":JZY.u.formatTime(this.detailData.endDate),
                    money:(this.detailData.money).replace(/,/g,""),
                    signingDate:JZY.u.formatTime(this.detailData.signingDate),
                    operatorId:this.detailData.operatorId,
                    operatorDeptId:this.detailData.operatorDeptId,
                    summary: this.detailData.summary,
                    paymentAgreement:this.detailData.paymentAgreement,
                    remark:this.detailData.remark,
                }
                return pas;
            },
            flowSave(isValid=true){
                //专给流程保存  不进行保存，只是把数据返回
                // if(isValid){
                if(this.editType!='look' && this.editType!='reLook' && this.editType!='design'){
                    this.detailData.summary=this.$refs.contractEditUEditor.getContent();
                    this.rules=fromRules;
                    setTimeout(() => {
                        this.$refs.refForm.validate(valid=> {
                            if (valid) {
                                // console.log("this.detailData:"+JSON.stringify(this.detailData))
                                this.handleSaveAttach();
                                this.handleSaveUEditor();
                                this.$emit("saveBackFun","success",this.detailData);
                            }else{
                                this.$emit("saveBackFun","fail");
                            }
                        })
                    }, 500);
                }else{
                //look状态提交直接过
                 this.$emit("saveBackFun","success",this.detailData);
                }
                // }else{
                //     this.$emit("saveBackFun","success",this.detailData);
                // }
            },
            operateSave(type){
                let pas=this.getSavePas();
                if(type=="saveDraft"){
                    this.$refs.refForm.clearValidate();
                    this.rules={
                        title:[{required: true,message: '请输入合同主题', trigger: 'blur'},
                            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }]
                    };
                    setTimeout(() => {
                        this.$refs.refForm.validate(valid=> {
                                if (valid) {
                                    pas.approveStatus="4";
                                    if(this.contractId==""){
                                        this.commitAllData(pas,this.getUrl('/contract/contractInfo/save'),"add");
                                    }else{
                                        this.commitAllData(pas,this.getUrl('/contract/contractInfo/update'),"update");
                                    }
                                }else{
                                    this.$emit("saveBackFun","fail");
                                }
                        })
                    }, 500);

                }else{
                    this.rules=fromRules;
                    setTimeout(() => {
                        this.$refs.refForm.validate(valid=> {
                            if (valid) {
                                pas.approveStatus="2";
                                if(this.contractId==""){
                                    this.commitAllData(pas,"/contract/contractInfo/save","add");
                                }else{
                                    this.commitAllData(pas,"/contract/contractInfo/update","update");
                                }
                            }else{
                                this.$emit("saveBackFun","fail");
                            }
                        })
                    }, 500);
                }
            },
            async handleSaveAttach(){
                await Promise.all("contractAttachment".split(",").map((ref)=>this.$refs[ref].saveFiles()))
            },
            async handleSaveUEditor(){
                await this.$refs.contractEditUEditor.saveFiles();
            },
            async commitAllData(pas,url,type){
                this.handleSaveUEditor();
                await JZY.xhr.post(url,pas,{alertSuccess:true}).then((resultData)=>{
                        this.handleSaveAttach();
                        this.$emit("saveBackFun","success",this.detailData);
                }).catch((e)=>{
                    //接口失败
                    this.$emit("saveBackFun","fail");
                })
            },
        }
    }
</script>

<style lang="scss">
    @import '../contract.uedit.scss';
    .contractEdit{
        .operaterDept{
            width:100%;
            text-align:left;
            min-height:40px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
</style>