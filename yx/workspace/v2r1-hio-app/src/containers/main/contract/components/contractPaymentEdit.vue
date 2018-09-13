<template>
    <div class="contractPaymentEdit">
        <!--合同付款查看/新增/编辑 和审批流程共用此组件-->
            <div v-if="editType=='look' || editType=='reLook'" class="contractPaymentView">
                <el-form label-position="right" label-width="130px">
                    <el-form-item label="合同付款主题：">
                        {{detailData.title}}
                    </el-form-item>
                    <el-form-item label="合同主题：">
                        {{detailData.contractTitle}}
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同类型：">
                                {{detailData.contractTypeName}}
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
                            <el-form-item label="付款单位：">
                                {{detailData.payer}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="收款单位：">
                                <span>{{detailData.payee}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="开户行：">
                                {{detailData.openingBank}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="银行账号：">
                                <span>{{detailData.bankAccount}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="本次付款金额/元：">
                                {{formatMoneyDisplay(detailData.paymentMoney)}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所有支付金额/元：（含审批中）">
                                <span>{{formatMoneyDisplay(detailData.sumPaymentMoney)}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="付款日期：">
                                <span>{{detailData.paymentDate}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同金额/元：">
                                {{formatMoneyDisplay(detailData.money)}}
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

                    <el-form-item label="付款说明：">
                        <pre >{{detailData.paymentExplain}}</pre>
                    </el-form-item>
                    <el-form-item label="附      件：">
                        <attach-upload v-if="showAttachment" :appId="attachmentPK.appId" :readonly="true" style="width: calc(100% - 30px)"
                                       :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else>
                <el-form label-position="right" label-width="130px" ref="refForm" :model="detailData" :rules="rules">
                    <!--流程时要先选择一个合同-->
                    <el-form-item label="请选择操作的合同："  v-if="contractData==undefined && editType=='add'">
                        <el-autocomplete
                                v-model="selectContract"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                @select="handleSelect"
                        ></el-autocomplete>
                    </el-form-item>
                    <el-form-item label="合同付款主题：" prop="title">
                        <el-input v-model="detailData.title" maxlength="100" placeholder="输入合同付款主题"></el-input>
                    </el-form-item>
                    <el-form-item label="合同主题：">
                        <el-input v-model="detailData.contractTitle"  disabled></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="合同类型：">
                                <el-input v-model="detailData.contractTypeName"  disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同编号：">
                                <el-input v-model="detailData.code"  disabled></el-input>
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
                            <el-form-item label="付款单位：" prop="payer">
                                <el-input v-model="detailData.payer" maxlength="500"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="收款单位：" prop="payee">
                                <el-input v-model="detailData.payee" maxlength="500"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="收款单位开户行：" prop="openingBank">
                                <el-input v-model="detailData.openingBank" maxlength="500"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="收款单位银行账号：" prop="bankAccount">
                                <el-input v-model="detailData.bankAccount"  maxlength="500"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="本次付款金额/元：" prop="paymentMoney">
                                <el-input v-model="detailData.paymentMoney" @blur="handleMoneyFormat" maxlength="500"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所有支付金额/元：（含审批中）">
                                <el-input v-model="detailData.sumPaymentMoney"  disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="付款日期：" prop="paymentDate">
                                <el-date-picker v-model="detailData.paymentDate" type="date" placeholder="付款日期"
                                                value-format="yyyy-MM-dd"   v-if="datePickerShow"
                                         :clearable="false"   style="width: 100%">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="合同总金额/元：">
                                <el-input v-model="detailData.money"  disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row v-if="contractData!=undefined">
                        <el-col :span="12">
                            <el-form-item label="经办人：">
                                <!--<el-input v-model="detailData.operatorName" maxlength="500"></el-input>-->
                                <el-button class="operaterDept" plain
                                           @click="handlerSeleUser">{{detailData.operatorName}}</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="经办部门：">
                                <el-button class="operaterDept" plain
                                           @click="handlerSeleDep">{{detailData.operatorDeptName}}</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="付款说明：">
                        <el-input type="textarea" :rows="5" v-textarea-limiter maxlength="2500"
                                  v-model="detailData.paymentExplain">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="附      件：">
                        <attach-upload v-if="showAttachment" :appId="attachmentPK.appId"  ref="contractPaymentAttachment"
                                       :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
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
    import contractUtil from '../contract.util'
    import selectDep from '../components/selectDep'
    let fromRules={
        title:[{required: true,message: '请输入合同付款主题',trigger: 'blur'},
            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }],
        firstParty:{  required: true, message: '请输入甲方单位',trigger: 'blur'},
        secondParty:{ required: true, message: '请输入乙方单位',trigger: 'blur'},
        payer:{ required: true,message: '请输入付款单位',trigger: 'blur'},
        payee:{ required: true,message: '请输入收款单位',trigger: 'blur'},
        openingBank:{ required: true,message: '请输入开户行',trigger: 'blur'},
        bankAccount:[{ required: true,message: '请输入银行账号',trigger: 'blur'},
            { pattern: /^[0-9a-zA-Z]*$/, message: '只能输入数字和字母', trigger: 'blur' }],
        paymentMoney:{ required: true,message: '请输入本次付款金额',trigger: 'blur'},
        // paymentDate:{ required: true,type:'date',message: '请输入付款日期'},
    };
    export default {
        name: "contract-payment-edit",
        components:{
            selectDep
        },
        data(){
           return{
               detailData:{
                   sid:"",
                   businessId:"",
                   contractId:"",
                   contractTitle:"",
                   contractTypeName:"",
                   code:"",
                   firstParty:"",
                   secondParty:"",
                   payer:"",
                   payee:"",
                   openingBank:"",
                   bankAccount:"",
                   paymentMoney:"",
                   sumPaymentMoney:"",
                   money:"",
                   paymentExplain:"",
                   paymentDate:new Date(),
                   operatorName:this.$store.state.session.name,
                   operatorId:this.$store.state.session.sid,
                   operatorDeptName:this.$store.state.session.dept,
                   operatorDeptId:this.$store.state.session.parentRealityId,
                   contractAuth:{
                       contractUpdate:false,
                       contractCancel:false,
                       contractSeeLog:false,
                       contractDelete:false,

                   }
               },
               attachmentPK:{
                   appId:"",
                   businessId:"",
                   categoryId:""
               },
               // selectUserDialogVisible:false,
               selectedUsersToTree:{},
               showDeptTreeOnly:false,
               selectedDeptToTree:[],
               rules:fromRules,
               showAttachment:false,
               selectContract:"",   //流程要自己选择对某个合同操作
               datePickerShow:true,
           }
        },
        props:{
            editType:{
                required:true,   //look,edit,add,reLook(流程驳回查看),reEdit(流程驳回edit),design(流程设计态不保存但要数据结构)
                default:"look"
            },
            contractPayId:{},    //付款合同id查看和编辑是要传，add时传空
            contractData:{},    //新增时要带过来一些合同的信息
        },
        mounted(){
             if(this.editType!="add" && this.editType!="design"){
                 JZY.xhr.requestPromises([
                     JZY.xhr.r(this.getUrl('/contract/contractPayment/get/'+this.contractPayId)),
                 ]).then(async ([contractPayment])=>{
                     this.datePickerShow=false;
                     this.detailData=contractPayment[0];
                     this.detailData.paymentMoney=this.formatMoneyDisplay(this.detailData.paymentMoney);
                     this.detailData.money=this.formatMoneyDisplay(this.detailData.money);
                     this.detailData.sumPaymentMoney=this.formatMoneyDisplay(this.detailData.sumPaymentMoney);
                     this.$nextTick(()=>{
                         //为了解决IE11下更新了时间组件的v-model页面不渲染问题
                         this.datePickerShow=true;
                     })
                     this.detailData.businessId=contractPayment[0].sid;
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
                         this.attachmentPK=contractPayment[0].fileIdDto;
                         this.showAttachment=true;
                     }
                     this.$emit("contractAuthBackFun",contractPayment[0].contractAuth,contractPayment[0].fiId);
                    // console.log("kkk:"+JSON.stringify(contractPayment))
                 })
             }else if(this.editType!="design"){
                 //新增
                 JZY.xhr.requestPromises([
                     JZY.xhr.post(this.getUrl('/contract/contractPayment/getContractPaymentGeneratePk'),{},{alertSuccess:false}),
                 ]).then(async ([generatePk])=>{
                     this.showAttachment=true;
                     this.attachmentPK=generatePk[0];
                     this.detailData.sid=generatePk[0].businessId;
                     this.detailData.businessId=generatePk[0].businessId;   //流程使用
                     // console.log("sss:"+JSON.stringify(this.contractData.title))
                     if(this.contractData!=undefined){
                         this.detailData.contractTitle=this.contractData.title;
                         this.detailData.contractTypeName=this.contractData.contractTypeName;
                         this.detailData.code=this.contractData.code;
                         this.detailData.firstParty=this.contractData.firstParty;
                         this.detailData.secondParty=this.contractData.secondParty;
                         this.detailData.payee=this.contractData.payee;
                         this.detailData.money=this.formatMoneyDisplay(this.contractData.money);
                         this.detailData.sumPaymentMoney=this.formatMoneyDisplay(this.contractData.sumPaymentMoney);
                         this.detailData.contractId=this.contractData.sid;
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
            handleMoneyFormat(){
                this.detailData.paymentMoney=this.formatMoneyDisplay( this.detailData.paymentMoney);
            },
            operateClose() {
                this.$emit("closeCreateModal");
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
                    // this.detailData=contractDetailData[0];
                    this.detailData.contractTitle=contractDetailData[0].title;
                    this.detailData.contractTypeName=contractDetailData[0].contractTypeName;
                    this.detailData.code=contractDetailData[0].code;
                    this.detailData.firstParty=contractDetailData[0].firstParty;
                    this.detailData.secondParty=contractDetailData[0].secondParty;
                    this.detailData.payee=contractDetailData[0].payee;
                    this.detailData.money=this.formatMoneyDisplay(contractDetailData[0].money);
                    this.detailData.sumPaymentMoney=this.formatMoneyDisplay(contractDetailData[0].sumPaymentMoney);
                    this.detailData.contractId=contractDetailData[0].sid;
                })
            },
            getSavePas(){
                let pas={
                    sid:this.detailData.sid,
                    contractId:this.detailData.contractId,
                    title:this.detailData.title,
                    firstParty:this.detailData.firstParty,
                    secondParty:this.detailData.secondParty,
                    payee:this.detailData.payee,
                    payer:this.detailData.payer,
                    openingBank:this.detailData.openingBank,
                    bankAccount:this.detailData.bankAccount,
                    paymentMoney:(this.detailData.paymentMoney).replace(/,/g,""),
                    paymentDate:JZY.u.formatTime(this.detailData.paymentDate),
                    operatorId:this.detailData.operatorId,
                    operatorDeptId:this.detailData.operatorDeptId,
                    paymentExplain:this.detailData.paymentExplain,
                }
                return pas;
            },
            flowSave(isValid=true) {
                //专给流程保存  不进行保存，只是把数据返回
             // if(isValid) {
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
                    this.rules = fromRules;
                    setTimeout(() => {
                        this.$refs.refForm.validate(valid => {
                            if (valid) {
                                this.handleSaveAttach();
                                this.$emit("saveBackFun", "success", this.detailData);
                            } else {
                                this.$emit("saveBackFun", "fail");
                            }
                        })
                    }, 500);
                }else{
                    this.$emit("saveBackFun", "success", this.detailData);
                }

             // }else{
             //     this.$emit("saveBackFun", "success", this.detailData);
             // }
            },
            operateSave(type){
              let pas=this.getSavePas();
                if(type=="saveDraft"){
                    this.$refs.refForm.clearValidate();
                    this.rules={
                        title:{  required: true,message: '请输入合同付款主题',trigger: 'blur'}
                    };
                    setTimeout(() => {
                        this.$refs.refForm.validate(valid=> {
                            if (valid) {
                                pas.approveStatus="4";
                                if(this.editType!="add"){
                                    this.commitAllData(pas,this.getUrl("/contract/contractPayment/update"),"update");
                                }else{
                                    this.commitAllData(pas,this.getUrl("/contract/contractPayment/save"),"add");
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
                                if(this.editType!="add"){
                                    this.commitAllData(pas,this.getUrl("/contract/contractPayment/update"),"update");
                                }else{
                                    this.commitAllData(pas,this.getUrl("/contract/contractPayment/save"),"add");
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
                await Promise.all("contractPaymentAttachment".split(",").map((ref)=>this.$refs[ref].saveFiles()))
            },
            async commitAllData(pas,url,type){
                // this.btnDisabled=true;
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

<style scoped lang="scss">
   .contractPaymentEdit{
       .contractPaymentView{
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