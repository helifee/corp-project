<template>
    <div class="contractChangeEdit">
        <!--合同变更查看/新增/编辑 和审批流程共用此组件-->
            <div v-if="editType=='look' || editType=='reLook'" class="contractChangeView">
                <el-form label-position="right" label-width="130px">
                    <el-form-item label="本次变更内容：" v-if="detailData.changeText!=null">
                        <span v-html="detailData.changeText"></span>
                    </el-form-item>
                    <el-form-item label="合同变更主题：">
                        {{detailData.title}}
                    </el-form-item>
                    <el-form-item label="合同主题：">
                        {{detailData.contractTitle}}
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同类型：">
                                {{detailData.contractType}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同编号：">
                                <span>{{detailData.code}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="甲方单位：">
                                {{detailData.firstParty}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="乙方单位：">
                                <span>{{detailData.secondParty}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="收款单位：">
                                <span>{{detailData.payee}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="变更类型：" >
                                <span>{{detailData.changeType}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同开始时间：">
                                <span>{{detailData.startDate}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同结束时间：">
                                <span>{{detailData.endDate}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同总金额/元：">
                                <span>{{formatMoneyDisplay(detailData.money)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="本次变更金额/元：" >
                                <span>{{formatMoneyDisplay(detailData.changeMoney)}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="变更后合同金额/元">
                                {{formatMoneyDisplay(detailData.newMoney)}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="变更日期：" >
                                {{detailData.signingDate}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="经办人：">
                                {{detailData.operatorName}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="经办部门：">
                                <span>{{detailData.operatorDeptName}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="合同摘要：">
                        <span v-html="detailData.summary" class="uedit-content-contract"></span>
                        <!--<UEditor id="lookEditor" defaultMsg="请输入内容" :config="UEconfig" ref="changeLookUEditor" @ready="changeLookUEditorOpen"-->
                                 <!--style="line-height: 24px"></UEditor>-->
                    </el-form-item>
                    <el-form-item label="付款约定：">
                        <pre>{{detailData.paymentAgreement}}</pre>
                    </el-form-item>
                    <el-form-item label="其它：">
                        <pre>{{detailData.remark}}</pre>
                    </el-form-item>
                    <el-form-item label="附      件：">
                        <attach-upload v-if="showAttachment" :appId="attachmentPK.appId" :readonly="true" style="width: calc(100% - 30px)"
                                       :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else>
                <el-form label-position="right" label-width="130px" ref="refForm" :model="detailData" :rules="rules"
                         @validate="handleFormValidate">
                    <!--流程时要先选择一个合同-->
                    <el-form-item label="请选择操作的合同："  v-if="contractData==undefined && editType=='add'">
                        <el-autocomplete
                                v-model="selectContract"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="本次变更内容：" v-if="editType=='edit' && detailData.changeText!=null">
                        <span v-html="detailData.changeText"></span>
                    </el-form-item>
                    <el-form-item label="合同变更主题：" prop="title">
                        <el-input v-model="detailData.title" maxlength="100" placeholder="输入合同变更主题"></el-input>
                    </el-form-item>
                    <el-form-item label="合同主题：">
                        <el-input v-model="detailData.contractTitle"  disabled></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同类型：">
                                <el-input v-model="detailData.contractType"  disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同编号：" prop="code">
                                <el-input v-model="detailData.code" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="甲方单位：" prop="firstParty">
                                <el-input v-model="detailData.firstParty" maxlength="500"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="乙方单位：" prop="secondParty">
                                <el-input v-model="detailData.secondParty" maxlength="500"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="收款单位：" prop="payee">
                                <el-input v-model="detailData.payee" maxlength="500"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="变更类型：" prop="changeTypeId">
                                <el-select v-model="detailData.changeTypeId" placeholder="请选择变更类型" popper-class="changeTypeCss"
                                           @change="handleChangeType" style="width: 100%">
                                    <el-option v-for="item in changeTypeList"
                                               :label="item.contractChangeType" :value="item.sid" :key="item.sid"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同开始时间：" prop="startDate">
                                <el-date-picker v-model="detailData.startDate" type="date" placeholder="合同开始时间"
                                                value-format="yyyy-MM-dd"   v-if="datePickerShow"
                                                :clearable="false"   style="width: 100%">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同结束时间：" prop="endDate">
                                <el-date-picker v-model="detailData.endDate" type="date" placeholder="合同结束时间"
                                                value-format="yyyy-MM-dd"  v-if="datePickerShow"
                                                :clearable="false"   style="width: 100%">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同总金额/元：">
                                <el-input v-model="detailData.money"  disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="本次变更金额/元：" prop="changeMoney">
                                <el-input v-model="detailData.changeMoney" @blur="handleMoneyFormat('changeMoney')" maxlength="500"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="变更后合同金额/元" prop="newMoney">
                                <el-input v-model="detailData.newMoney" @blur="handleMoneyFormat('newMoney')" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="变更日期：" prop="signingDate">
                                <el-date-picker v-model="detailData.signingDate" type="date" placeholder="变更日期"
                                                value-format="yyyy-MM-dd"  v-if="datePickerShow"
                                                :clearable="false"   style="width: 100%">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="contractData!=undefined">
                        <el-col :span="12">
                            <el-form-item label="经办人：">
                                <el-button class="operaterDept" plain
                                           @click="handlerSeleUser">{{detailData.operatorName}}</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="经办部门：">
                                <el-button style="" class="operaterDept" plain
                                           @click="handlerSeleDep">{{detailData.operatorDeptName}}</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="合同摘要：" prop="summary">
                        <UEditor id="changeEditor" defaultMsg="请输入内容" :config="UEconfig" ref="changeUEditor" @ready="testOpen"
                                 style="line-height: 24px" :appId="attachmentPK.appId"
                                 :businessId="JZY.u.uuid()" :categoryId="attachmentPK.categoryId"></UEditor>
                    </el-form-item>
                    <el-form-item label="付款约定：" prop="paymentAgreement">
                        <el-input type="textarea" :rows="5" v-textarea-limiter maxlength="2500"
                                  v-model="detailData.paymentAgreement">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="其它：" prop="remark">
                        <el-input type="textarea" :rows="5" v-textarea-limiter maxlength="1024"
                                  v-model="detailData.remark">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="附      件：">
                        <attach-upload v-if="showAttachment" @attachUploadSuccess="handleAttachUploadSuccess" :appId="attachmentPK.appId"
                        ref="contractChangeAttachment" :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
                    </el-form-item>
                </el-form>
            </div>
        <blend-tree ref= "refSelectUserDialogVisible" :selectedDataToTree = "selectedUsersToTree" :resultDataListShow ="false"
                    :enable-checked-multiple = "false" :tagButtons="['user']" activeTab = "user"
                    @getDataFromTree = "userFromTreeFunc">
        </blend-tree>
        <selectDep :selectDepDialogVisible.sync="showDeptTreeOnly" @getSelectDep="getDeptFromTree"
                   v-if="showDeptTreeOnly" :displayAllDep="false"  :userId="detailData.operatorId"></selectDep>
    </div>
</template>

<script>
    import UEditor from '@/components/UEditor.vue'
    import contractUtil from '../contract.util'
    import selectDep from '../components/selectDep'
    let newMoneyRule = (rule, value, callback) => {
        if(value!="") {
            let curMoney=(value+"").replace(/,/g,"");
            if(curMoney<=0){
                callback(new Error('变更后合同金额不能小于等于0'));
            }else{
                 callback();
            }
        }else{
            callback();
        }
    };
    let fromRules={
        title:[{required: true,message: '请输入合同变更主题',trigger: 'blur'},
            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }],
        code:{  required: true,message: '请输入合同编号',trigger: 'blur'},
        firstParty:{  required: true, message: '请输入甲方单位',trigger: 'blur'},
        secondParty:{ required: true, message: '请输入乙方单位',trigger: 'blur'},
        payee:{ required: true,message: '请输入收款单位',trigger: 'blur'},
        changeTypeId:{ required: true,message: '请选择变更类型'},
        startDate:{ required: true,message: '请选择合同开始时间'},
        endDate:{ required: true,message: '请选择合同结算时间'},
        changeMoney:{ required: true,message: '请输入本次变更金额',trigger: 'blur'},
        newMoney:[{required: true,message: '请输入变更后合同金额',trigger: 'blur'},{required: true,validator:newMoneyRule}],
        summary:{ required: true,message: '请输入合同摘要',trigger: 'blur'},
    };
    export default {
        name: "contract-change-edit",
        components:{
            UEditor,
            selectDep
        },
        data(){
            return{
                // title:"变更查看",
                // btnDisabled:false,
                detailData:{
                    changeText:"",
                    sid:"",
                    businessId:"",
                    contractId:"",
                    contractTitle:"",
                    contractType:"",
                    changeTypeId:"",
                    changeType:"",
                    code:"",
                    firstParty:"",
                    secondParty:"",
                    payee:"",
                    startDate:"",
                    endDate:"",
                    changeMoney:"",
                    newMoney:"",
                    signingDate:new Date(),
                    money:"",
                    summary:"",
                    paymentAgreement:"",
                    operatorName:this.$store.state.session.name,
                    operatorId:this.$store.state.session.sid,
                    operatorDeptName:this.$store.state.session.dept,
                    operatorDeptId:this.$store.state.session.parentRealityId,
                    contractAuth:{
                        contractUpdate:false,
                        contractCancel:false,
                        contractSeeLog:false,
                        contractDelete:false,
                    },
                    remark:"",
                    contractVersion:"",
                },
                attachmentPK:{
                    appId:"",
                    businessId:"",
                    categoryId:""
                },
                UEconfig:contractUtil.contractUEditConfig(),
                selectUserDialogVisible:false,
                selectedUsersToTree:{},
                showDeptTreeOnly:false,
                selectedDeptToTree:[],
                rules:fromRules,
                showAttachment:false,
                changeTypeList:[],
                selectContract:"",   //流程要自己选择对某个合同操作
                datePickerShow:true,
            }
        },
        props:{
            editType:{
                required:true,   //look,edit,add,reLook(流程驳回查看),reEdit(流程驳回edit),design(流程设计态不保存但要数据结构)
                default:"look"
            },
            contractChangeId:{},
            contractData:{},    //新增时要带过来一些合同的信息
        },
        mounted(){
            if(this.editType!="add" && this.editType!="design"){
                let contractChangeInfo=JZY.xhr.r(this.getUrl('/contract/contractChange/get/'+this.contractChangeId));
                if (this.editType=="reEdit"){
                    contractChangeInfo=JZY.xhr.post(this.getUrl('/contract/contractChange/getContractChangeForReEdit'),{sid:this.contractChangeId},{alertSuccess:false});
                }
                JZY.xhr.requestPromises([
                    contractChangeInfo,
                    JZY.xhr.post(this.getUrl('/contract/contractChangeType/getContractChangeTypeList'),{},{alertSuccess:false}),
                ]).then(async ([contractChange,changeTypeList])=>{
                    this.datePickerShow=false;
                    this.detailData=contractChange[0];
                    this.$nextTick(()=>{
                        this.datePickerShow=true;
                    })
                    this.detailData.contractVersion="";
                    this.detailData.money=this.formatMoneyDisplay(this.detailData.money);
                    this.detailData.changeMoney=this.formatMoneyDisplay(this.detailData.changeMoney);
                    this.detailData.newMoney=this.formatMoneyDisplay(this.detailData.newMoney);
                    this.detailData.businessId=this.detailData.sid;
                    this.changeTypeList=changeTypeList[0];
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
                        this.attachmentPK=contractChange[0].fileIdDto;
                        this.showAttachment=true;
                    }
                    this.$emit("contractAuthBackFun",contractChange[0].contractAuth,contractChange[0].fiId);
                    // console.log("kkk:"+JSON.stringify(contractPayment))
                })
            }else if(this.editType!="desgin"){
                //新增
                // this.title="创建变更"
                JZY.xhr.requestPromises([
                    JZY.xhr.post(this.getUrl('/contract/contractChange/getContractChangeGeneratePk'),{},{alertSuccess:false}),
                    JZY.xhr.post(this.getUrl('/contract/contractChangeType/getContractChangeTypeList'),{},{alertSuccess:false}),
                ]).then(async ([generatePk,changeTypeList])=>{
                    this.attachmentPK=generatePk[0];
                    this.detailData.sid=generatePk[0].businessId;
                    this.detailData.businessId=generatePk[0].businessId;   //流程使用
                    this.showAttachment=true;
                    this.changeTypeList=changeTypeList[0];
                    // console.log("sss:"+JSON.stringify(this.contractData.title))
                    if(this.contractData!=undefined){
                        this.detailData.contractTitle=this.contractData.title;
                        this.detailData.contractType=this.contractData.contractTypeName;
                        this.detailData.code=this.contractData.code;
                        this.detailData.firstParty=this.contractData.firstParty;
                        this.detailData.secondParty=this.contractData.secondParty;
                        this.detailData.payee=this.contractData.payee;
                        this.detailData.startDate=this.contractData.startDate;
                        this.detailData.endDate=this.contractData.endDate;
                        this.detailData.money=this.formatMoneyDisplay(this.contractData.money);
                        this.detailData.contractId=this.contractData.sid;
                        this.detailData.summary=this.contractData.summary;
                        this.detailData.paymentAgreement=this.contractData.paymentAgreement;
                        this.detailData.remark=this.contractData.remark;
                    }
                })
            }
        },
        methods: {
            getUrl(url){
                let resUrl= JZY.xhr.transformUrl(url,'GLOBAL.OA',false);
                return resUrl;
            },
            formatMoneyDisplay(money){
                return contractUtil.transformMoneyFormat(money);
            },
            handleMoneyFormat(type){
              if(type=="changeMoney"){
                  this.detailData.changeMoney=this.formatMoneyDisplay(this.detailData.changeMoney);
                  this.detailData.changeMoney=this.detailData.changeMoney+"";
                  this.detailData.newMoney=Number(this.detailData.money.replace(/,/g,"")) + Number(this.detailData.changeMoney.replace(/,/g,""));
                  this.detailData.newMoney=this.formatMoneyDisplay(this.detailData.newMoney);
              }else if(type=="newMoney"){
                  this.detailData.newMoney=this.formatMoneyDisplay(this.detailData.newMoney);
                  this.detailData.newMoney=this.detailData.newMoney+"";
                  this.detailData.changeMoney=Number(this.detailData.newMoney.replace(/,/g,""))-Number(this.detailData.money.replace(/,/g,""));
                  this.detailData.changeMoney=this.formatMoneyDisplay(this.detailData.changeMoney);
              }
            },
            operateClose() {
                this.$emit("closeCreateModal");
            },
            handleChangeType(value){
                let itemChangeType=this.changeTypeList.filter(item => item.sid === value)[0];
                this.detailData.changeType=itemChangeType.contractChangeType;
            },
            querySearchAsync(queryString, cb) {
                let pas={pageNum:1,pageCount:5,
                    title:queryString,
                    status:2,
                    balanceStatus:0
                };
                JZY.xhr.post(this.getUrl('/contract/contractInfo/page'),pas,{alertSuccess:false}).then((resultData)=>{
                    let contractInfo=[];
                    resultData[0].list.forEach(item=>{
                        contractInfo.push({
                            value:item.title,
                            sid:item.sid
                        })
                    })
                    cb(contractInfo);
                }).catch((e)=>{
                    //接口失败
                })
            },
            handleSelect(item){
                //查合同详情
                //   console.log("item:"+item.sid)
                JZY.xhr.requestPromises([
                    JZY.xhr.r(this.getUrl('/contract/contractInfo/get/'+item.sid)),
                ]).then(async ([contractDetailData])=>{
                    this.detailData.contractTitle=contractDetailData[0].title;
                    this.detailData.contractType=contractDetailData[0].contractTypeName;
                    this.detailData.code=contractDetailData[0].code;
                    this.detailData.firstParty=contractDetailData[0].firstParty;
                    this.detailData.secondParty=contractDetailData[0].secondParty;
                    this.detailData.payee=contractDetailData[0].payee;
                    this.detailData.startDate=contractDetailData[0].startDate;
                    this.detailData.endDate=contractDetailData[0].endDate;
                    this.detailData.money=this.formatMoneyDisplay(contractDetailData[0].money);
                    this.detailData.contractId=contractDetailData[0].sid;
                    this.detailData.summary=contractDetailData[0].summary;
                    this.detailData.paymentAgreement=contractDetailData[0].paymentAgreement;
                    this.$refs.changeUEditor.setContent(this.detailData.summary);
                    this.detailData.remark=contractDetailData[0].remark;
                })
            },
            getSavePas(){
                this.detailData.summary=this.$refs.changeUEditor.getContent();
                let pas={
                    sid:this.detailData.sid,
                    contractId:this.detailData.contractId,
                    title:this.detailData.title,
                    code:this.detailData.code,
                    firstParty:this.detailData.firstParty,
                    secondParty:this.detailData.secondParty,
                    payee:this.detailData.payee,
                    changeTypeId:this.detailData.changeTypeId,
                    startDate:moment(this.detailData.startDate).format("YYYY-MM-DD 00:00:00"),
                    endDate:moment(this.detailData.endDate).format("YYYY-MM-DD 00:00:00"),
                    changeMoney:(this.detailData.changeMoney+"").replace(/,/g,""),
                    newMoney:(this.detailData.newMoney+"").replace(/,/g,""),
                    signingDate:moment(this.detailData.signingDate).format("YYYY-MM-DD 00:00:00"),
                    operatorDeptId:this.detailData.operatorDeptId,
                    operatorId:this.detailData.operatorId,
                    summary:this.detailData.summary,
                    paymentAgreement:this.detailData.paymentAgreement,
                    remark:this.detailData.remark,
                }
                return pas;
            },
            flowSave(isValid=true) {
                //专给流程保存  不进行保存，只是把数据返回
                // if(isValid){
                if(this.editType=='design'){
                    //设计模式直接把结构给出
                    this.$emit("saveBackFun", "success", this.detailData);
                    return;
                }
                if(this.detailData.contractId==""){
                    JZY.u.errorMsg("请选择操作的合同");
                    this.$emit("saveBackFun", "fail");
                    return;
                }
                if(this.editType!='look' && this.editType!='reLook'){
                    this.detailData.summary=this.$refs.changeUEditor.getContent();
                    this.rules=fromRules;
                    setTimeout(() => {
                        this.$refs.refForm.validate(valid=> {
                            if (valid) {
                                this.handleSaveAttach();
                                this.handleSaveUEditor();
                                this.$emit("saveBackFun","success",this.detailData);
                            }else{
                                this.$emit("saveBackFun","fail");
                            }
                        })
                    }, 500);
                }else{
                    this.$emit("saveBackFun","success",this.detailData);
                }

                // }else{
                //     this.$emit("saveBackFun","success",this.detailData);
                // }

            },
            handleFormValidate(prop){
                if(prop=="changeMoney"){
                    this.$refs.refForm.validateField("newMoney");
                }
            },
            operateSave(type){
                let pas=this.getSavePas();
                if(type=="saveDraft"){
                    this.$refs.refForm.clearValidate();
                    this.rules={
                        title:{required: true,message: '请输入合同变更主题',trigger: 'blur'},
                        changeMoney:{ required: false,message: '请输入本次变更金额',trigger: 'blur'},
                        newMoney:{required: false, validator:newMoneyRule ,trigger: 'blur'},
                    };
                    setTimeout(() => {
                        this.$refs.refForm.validate(valid=> {
                                if (valid) {
                                    pas.approveStatus="4";
                                    if(this.editType!="add"){
                                        this.commitAllData(pas,this.getUrl("/contract/contractChange/update"),"update");
                                    }else{
                                        this.commitAllData(pas,this.getUrl("/contract/contractChange/save"),"add");
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
                                // console.log("11111")
                                pas.approveStatus="2";
                                if(this.editType!="add"){
                                    this.commitAllData(pas,this.getUrl('/contract/contractChange/update'),"update");
                                }else{
                                    this.commitAllData(pas,this.getUrl('/contract/contractChange/save'),"add");
                                }
                            }else{
                                this.$emit("saveBackFun","fail");
                            }
                        })
                    }, 500);
                }
            },
            handleAttachUploadSuccess(){

            },
            testOpen(){
                this.$nextTick(()=>{
                    this.$refs.changeUEditor.setContent(this.detailData.summary);
                })
            },
            // changeLookUEditorOpen(){
            //     this.$nextTick(()=>{
            //         this.$refs.changeLookUEditor.setContent(this.detailData.summary);
            //     })
            // },
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
            userFromTreeFunc(selectedUsers){
                if(selectedUsers.userList.length>0){
                    this.detailData.operatorName=selectedUsers.userList[0].name;
                    this.detailData.operatorId=selectedUsers.userList[0].sid;
                    this.detailData.operatorDeptId=selectedUsers.userList[0].organizationId;
                    this.detailData.operatorDeptName=selectedUsers.userList[0].organizationName;
                }
            },
            getDeptFromTree(selectedDepts){
                this.detailData.operatorDeptName=selectedDepts.name;
                this.detailData.operatorDeptId=selectedDepts.sid;
                // if(selectedDepts.length>0){
                //     this.detailData.operatorDeptName=selectedDepts[0].name;
                //     this.detailData.operatorDeptId=selectedDepts[0].sid;
                // }
            },
            handlerSeleDep(){
                this.showDeptTreeOnly=true;
            },
            async handleSaveAttach(){
                await Promise.all("contractChangeAttachment".split(",").map((ref)=>this.$refs[ref].saveFiles()))
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
    .changeTypeCss{
        .el-select-dropdown__list, .el-popper .el-cascader-menu{
            width:242px;
        }
    }
    /*.el-dropdown-link {*/
        /*cursor: pointer;*/
        /*background: #fff;*/
        /*border: 1px solid #dcdfe6;*/
        /*color: #606266;*/
        /*height: 33px;*/
        /*margin-right: 20px;*/
        /*line-height: 33px;*/
        /*display: inline-block;*/
        /*padding: 1px 10px;*/
        /*border-radius: 3px;*/
    /*}*/
    .contractChangeEdit{
        .contractChangeView{
            .el-form .el-form-item{
                margin-bottom:0;
            }
        }
        .operaterDept{
            width:100%;
            text-align:left;
            min-height:40px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    .operate_buttons {
        float: right;
    }
</style>