<template>
    <div class="wrap">
        <!-- <div class="content-title">
            
        </div> -->

        <div class="project-wrap">
            <!--查询条件-->
            <div class="project-search contactSearch">
                <!--检索内容-->
                <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm">
                    <el-form-item label=" 联系人姓名：" prop="searchVal">
                        <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索"></el-input>
                    </el-form-item>
                    <el-form-item label=" 手机号码：" prop="searchVal1">
                        <el-input v-model="searchForm.searchVal1" placeholder="请输入关键词进行检索"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label=" 客户名称：" prop="searchVal2">
                        <el-input v-model="searchForm.searchVal2" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                    </el-form-item> -->
                    <el-form-item class="buttonList">
                        <el-button type="primary" size="small" @click="search('searchForm');">查询</el-button>
                        <el-button type="primary" size="small" style="margin-right:300px;" @click="resetForm('searchForm')">重置</el-button>
                        <el-button type="primary" size="small" style="margin-left:28px; display:inline-block;" class="add-news" @click="showContactsDialog">创建联系人</el-button>
                    </el-form-item>
                </el-form>   
            </div>
            <!--表格-->
            <div class="scrollContent3" style="">
            <el-table
                :data="tableData5"
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%;text-align: center;"
                :cell-style="{'font-family': 'MicrosoftYaHei','height':'50px','font-size': '12px','color': '#505050','letter-spacing': 0,'text-align': 'center','line-height': '12px'}"
                :header-cell-style="{'font-family': 'MicrosoftYaHei','text-align':'center','height':'50px','background':' #F6F7F8','font-size':'12px','font-weight':'normal','color':'#505050','padding':'0px'}">
               <!-- <el-table-column
                type="selection"
                width="55"> -->
                <!-- </el-table-column>  -->
                <!-- <el-table-column type="expand">
                    <template slot-scope="props" >
                        <p style="text-align: left;">{{ props.row.describe }}</p>
                    </template>
                </el-table-column> -->
                <el-table-column
                    label="姓名"
                    width="80">
                    <template slot-scope="scope">
                        <router-link class="apprave-detail-panel" :to="'/crm/contacts/details?customerId=' + scope.row.customerId+'&contactId='+ scope.row.contcatId">{{ scope.row.contcatName}}</router-link>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    label="来源"
                    prop="source"
                    :filters="[{ text: '网站', value: '网站' }, { text: '微信', value: '微信' },{ text: '广告', value: '广告' }, { text: '推荐', value: '推荐' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <span>{{scope.row.source}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column 
                    prop="customerName"
                    label="客户名称" 
                    width="120">
                    <!-- <template slot-scope="scope">
                        <router-link class="apprave-detail-panel" :to="'/crm/customer/details?customerId=' + scope.row.customerId">{{ scope.row.customerName}}</router-link>
                    </template> -->
                </el-table-column>
                <el-table-column label="决策关系" prop="decisionRole" width="100">
                    <template slot-scope="scope">
                        {{scope.row.decisionRole | deci}}
                    </template>
                </el-table-column>
                <el-table-column label="性别" prop="gendar" width="60">
                    <template slot-scope="scope">
                        {{scope.row.gendar | gend}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="职务"
                    prop="title">
                </el-table-column>
                 <el-table-column
                    label="手机号码"
                    prop="phoneNumber"
                    width="120">
                </el-table-column>
                <el-table-column
                    label="邮箱"
                    prop="email"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="最后跟进时间"
                    align="center"
                    sortable
                    prop="lastFollowTime"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <!-- <span style="color: #409EFF">共享</span> -->
                        <el-tooltip class="item" effect="dark" content="跟进记录" placement="bottom">
                            <i style="margin-right:4px; color:#46A7FF; font-size:14px;" class="el-icon-tickets" @click="showRecordformDialog(scope.row.customerId,scope.row.contcatId)"></i>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                            <i style="margin-right:4px; color:#46A7FF; font-size:14px;" class="el-icon-edit" @click="showContactsDialogDel(scope.row.contcatId)"></i>
                            <!-- <span style="color: #409EFF" @click="showContactsDialogDel(scope.row.contcatId)">编辑</span> -->
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                            <i style="color:#46A7FF; font-size:14px;" class="el-icon-delete" @click="delMethod(scope.row.contcatId)"></i>
                            <!-- <span style="color: #409EFF" @click="delMethod(scope.row.contcatId)">删除</span> -->
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            </div>
        </div>
        <!--分页-->
        <!-- <el-pagination v-if="dataTotal==0?false:true"
            :current-page="pageNum"
                    :page-size="pageCount"
                    :page-sizes="[10,20,30,40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="dataTotal"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
        </el-pagination> -->
        <dialog-follow-recordform-cu-spe :dialogVisible="recordformDialogVisible" ref="recordformId"  v-if="recordformDialogVisible" @closeCreateModal="showRecordformDialogClo"></dialog-follow-recordform-cu-spe>
        <dialog-add-contacts-cu  ref="reftestAdd" v-if="contactsDialogVisible"  :dialog-visible="contactsDialogVisible" @closeCreateModal="closeContactsDialog"></dialog-add-contacts-cu>
        <dialog-del-contacts-cu  ref="reftest" :editLi="editData" v-if="contactsDialogVisibleDelete"  :dialog-visible="contactsDialogVisibleDelete" @closeCreateModal="closeContactsDialogDele"></dialog-del-contacts-cu>
    </div>
</template>

<script>
    import dialogFollowRecordformCuSpe from '@Main/crm/components/dialog.follow.recordform_cu_spe.vue'
    import dialogAddContactsCu from '@Main/crm/components/dialog.addContacts_cu.vue'
    import dialogDelContactsCu from '@Main/crm/components/dialog.delContacts_cu.vue'
    import {contactList,modify,del,modifyCustomer} from '@Main/crm/getData'

    export default{
        components: {
            dialogAddContactsCu,
            dialogDelContactsCu,
            dialogFollowRecordformCuSpe
        },
        props:{
            custoName:{
                type:String,
                required:true
            },
        },
        filters:{
            gend (value){
                //性别 ：0男、1女
                switch (value) {
                    case 1:
                        return '女';
                    case 0:
                        return '男';
                    default:
                        return '--'
                }
            },
            deci (value){
                //决策关系 ：0未完成、1已完成、2已关闭、3超期
                switch (value) {
                    case 0:
                        return '普通员工';
                    case 1:
                        return '采购决策人';
                    case 2:
                        return '项目决策人';
                    case 3:
                        return '人事决策人';
                }
            },
        },
        methods:{
            showRecordformDialog(id,conId){
                this.recordformDialogVisible = true;
                this.$nextTick(function(){
                    this.$refs.recordformId.test(id,conId)
                })
            },
            showRecordformDialogClo(){
                this.$emit("cliNewData");
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                // let customerName=this.searchForm.searchVal2;//客户名称
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let customerId=this.$route.query.customerId;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':customerId,
                    'customerName':'',
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber
                });  
                this.recordformDialogVisible = false;
            },
            async contactListData( {
                pageNum = '' ,
                pageCount = '' ,
                customerId = '' ,
                customerName = '' ,
                contcatName='' ,
                phoneNumber = ''
             } = {} ){
                let res = await contactList(
                    pageNum,
                    pageCount,
                    customerId,
                    customerName,
                    contcatName,
                    phoneNumber
                    )
                res[0].list.forEach((item)=>{
                    if(item.lastFollowTime==null){
                        item.lastFollowTime="--";
                    };
                    if(item.title==""){
                        item.title="--";
                    };
                    if(item.email==""){
                        item.email="--";
                    }
                })
                this.tableData5=res[0].list;
                console.log(this.tableData5);
                console.log(res[0]);
                this.pageCount=res[0].pageCount;
                console.log(this.pageCount);//每页几个pageCount
                this.pageNum=res[0].pageNum;
                console.log(this.pageNum);//第几页pageNum
                this.pageTotal=res[0].pageTotal;
                console.log(this.pageTotal);//总页数pageTotal
                this.dataTotal=res[0].total;
                console.log(this.dataTotal);//总个数total

                //判断是否出现了滚动条
                this.$nextTick(function(){
                    let my = this;
                    let divHeight;
                    if($(".router-wrapper").children("div").length==1){
                        divHeight=$(".router-wrapper").children("div").height();
                    }else{
                        let oneDiv=$(".router-wrapper").children('.top-wrap').height();
                        let twoDiv=$(".router-wrapper").children('.customer-detail-tab').height()+20;
                        divHeight=oneDiv+twoDiv;
                    }
                    if(divHeight<$(".router-wrapper").height()){
                        if(this.pageCount>this.dataTotal){
                            return false;
                        }else{
                            my.pageCount=my.pageCount+10;
                            let pageNum=my.pageNum;
                            let pageCount=my.pageCount;
                            let customerId=my.$route.query.customerId;
                            my.contactListData({
                            'customerId':customerId,
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            });
                        } 
                    }
                })
            },
            // 修改初始化
             async modifyData(sid){
                let res = await modify(sid)
                console.info(res[0])
                this.editData=res[0];
                this.$nextTick(function(){
                    this.$refs.reftest.test(this.editData)
                }) 
                // console.log('修改数据editData',this.editData);
            },
            //删除
             async delData(sid){
                let res = await del(sid)
                console.info(res[0])
                console.log("删除返回信息",res[0]);
                this.$emit('getNum');
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let customerId=this.$route.query.customerId;
                this.contactListData({
                    'customerId':customerId,
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                });
            },
            delMethod(sid){
                this.$confirm('您确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.delData(sid);
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消'
                        }); 
                }); 
            },
            jump(){
                location.href = "#/crm/contacts/details/10034"
            },
            async showContactsDialog (sid){
                let res = modifyCustomer(this.customerId).then(()=>{
                    this.contactsDialogVisible = true;
                    let customerName=this.custoName;
                    // this.tableData5.forEach((item)=>{
                    //     customerName=item.customerName;
                    // })
                    this.$nextTick(function(){
                        this.$refs.reftestAdd.test(customerName)
                    }) 
                }).catch((e)=>{
                    this.$router.go(-1);
                })
            },
            // 编辑按钮
            showContactsDialogDel (sid){
                this.contactsDialogVisibleDelete = true;
                this.modifyId=sid;
                this.modifyData(sid); 
                console.log(this.modifyId);
            },
            closeContactsDialog (){
                this.$emit('getNum')
                this.contactsDialogVisible = false;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let customerId=this.$route.query.customerId;
                this.contactListData({
                    'customerId':customerId,
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                });
            },
            closeContactsDialogDele (){
                this.contactsDialogVisibleDelete = false;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let customerId=this.$route.query.customerId;
                this.contactListData({
                    'customerId':customerId,
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            submitForm(formName) {
                this.
                console.log(this[formName])
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                console.log(this.$refs)
                this.$refs[formName].resetFields();
                
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                // let customerName=this.searchForm.searchVal2;//客户名称
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let customerId=this.$route.query.customerId;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':customerId,
                    'customerName':'',
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber
                }); 
            },
            search (formName){
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         // alert('submit!');
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
                console.log(this.$refs)
                console.log(this.searchForm.searchVal)
                console.log(this.searchForm.searchVal1)
                // console.log(this.searchForm.searchVal2)
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                // let customerName=this.searchForm.searchVal2;//客户名称
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let customerId=this.$route.query.customerId;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':customerId,
                    'customerName':'',
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber
                });   
            },
            handleChange(file, fileList) {
                this.fileList3 = fileList.slice(-3);
            },
            filterTag(value, row) {
                return row.source === value;
            },
//            弹窗中 新增联系人
            addInformation (){
                this.customersForm.information.push({
                    name:'',
                    job:'',
                    telephone:'',
                    mail:'',
                    decision:'',
                    editFlag:true
                });
            },
            saveInformation (index, row){
                this.customersForm.information[index].editFlag = false;
            },
            delInformation (index, row){
                this.customersForm.information.splice(index,1)
            },
            //后端排序
            sortTableList(obj){
                // console.info(obj.prop)
                if (obj.prop) {//排序规则非空
                    let orderProp = obj.prop.replace(/([A-Z])/g,"_$1").toLowerCase();//驼峰命名和下划线转换
                    let orderby = orderProp + ',' + (obj.order == 'ascending' ? 'asc':'desc')
                    this.$emit('sortTaskList',orderby)
                }
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                console.info(typeof val)
                this.pageCount = val;
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let customerId=this.$route.query.customerId;
                    this.contactListData({
                        'customerId':customerId,
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                    });
                // const page = {
                //     pageNum:this.pageNum.toString(),
                //     pageCount:this.pageCount
                // }
                // this.$emit('refleshTable',page)
            },
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.info(typeof val)
                this.pageNum = val
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let customerId=this.$route.query.customerId;
                    this.contactListData({
                        'customerId':customerId,
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                    });
                // const page = {
                //     pageNum:this.pageNum.toString(),
                //     pageCount:this.pageCount
                // }
                // console.info(page)
                // this.$emit('refleshTable',page)
            },
            setScroll(){
                // let scrollBd = $(".scrollContent3");
                let scrollBd = $(".router-wrapper");
                let my = this;
                scrollBd.scroll( function(e) {
                    if($('#pane-Contacts').css("display")=="block"){
                    //向下滚动到底
                    let scrollTop = $(this)[0].scrollTop;
                    let scrollHeight = $(this)[0].scrollHeight;
                    let clientHeight = $(this)[0].clientHeight;
                　　if(scrollHeight - scrollTop  == clientHeight){
                        // my.pageNum++;
                        if(my.pageCount>my.dataTotal){
                            // alert(111111);
                            return false;
                        }else{
                            // alert(2222);
                        my.pageCount=my.pageCount+10;
                        let pageNum=my.pageNum;
                        let pageCount=my.pageCount;
                        let customerId=my.$route.query.customerId;
                        my.contactListData({
                        'customerId':customerId,
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        });
                        }  
                　　}
                }
                });
            }
        },

        created (){
            // let pageNum=this.pageNum;
            // let pageCount=this.pageCount;
            // let customerId=this.$route.query.customerId;
            // this.contactListData({
            //     'customerId':customerId,
            //     'pageNum':pageNum,
            //     'pageCount':pageCount,
            // });
        },
        mounted(){
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;
            let customerId=this.$route.query.customerId;
            this.customerId=customerId;
            this.contactListData({
                'customerId':customerId,
                'pageNum':pageNum,
                'pageCount':pageCount,
            });
            this.setScroll();
        },
        data(){
            return {
                recordformDialogVisible : false,
                contactsDialogVisibleDelete:false,
                contactsDialogVisible:false,
                dialogVisible:false,
                searchForm:{
                    searchVal:'',
                    searchVal1:'',
                    searchVal2:'',
                    searchVal3:'',
                },

                currentPage4: 4,
                content:"",
                customersForm: {
                    id:'',
                    customer: '',//客户名称
                    contactNumber:'',//联系电话
                    email: '',//电子邮件
                    source: '',//客户来源
                    customerType: '',//客户类型
                    address: '',//联系地址
                    website: '',//企业网站
                    progress: null,//备注
                    sharing: '',//共享
                    fileList:[],//附件
                    information:[{
                        name:'姓名',
                        job:'gongzuo',
                        telephone:'1232132142',
                        mail:'1213213@163.com',
                        decision:'juece',
                        editFlag:true
                    }]
                },
                rules:{
                    searchVal: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal1: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal2: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal3: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
                tableData5:[],
                modifyId:'',
                editData:[],
                // tableData5: [{
                //     id: '12987122',
                //     name: '胡彦斌',
                //     describe: '江浙小吃、小吃零食',
                //     source: '微信',
                //     address: '上海市普陀区真北路',
                //     customerType: '潜在客户',
                //     creationTime: '2017-10-01 12：00',
                //     masterContact: '张三',
                //     telephone: '13822229974',

                // }, {
                //     id: '12987122',
                //     name: '胡彦斌',
                //     describe: '江浙小吃、小吃零食',
                //     source: '广告',
                //     address: '上海市普陀区真北路',
                //     customerType: '潜在客户',
                //     creationTime: '2017-10-01 12：00',
                //     masterContact: '张三',
                //     telephone: '13822229974',

                // },{
                //     id: '12987122',
                //     name: '胡彦斌',
                //     describe: '江浙小吃、小吃零食',
                //     source: '网站',
                //     address: '上海市普陀区真北路',
                //     customerType: '潜在客户',
                //     creationTime: '2017-10-01 12：00',
                //     masterContact: '张三',
                //     telephone: '13822229974',

                // },{
                //     id: '12987122',
                //     name: '胡彦斌',
                //     describe: '江浙小吃、小吃零食',
                //     source: '网站',
                //     address: '上海市普陀区真北路',
                //     customerType: '潜在客户',
                //     creationTime: '2017-10-01 12：00',
                //     masterContact: '张三',
                //     telephone: '13822229974',

                // },{
                //     id: '12987122',
                //     name: '胡彦斌',
                //     describe: '江浙小吃、小吃零食',
                //     source: '网站',
                //     address: '上海市普陀区真北路',
                //     customerType: '潜在客户',
                //     creationTime: '2017-10-01 12：00',
                //     masterContact: '张三',
                //     telephone: '13822229974',

                // },{
                //     id: '12987122',
                //     name: '胡彦斌',
                //     describe: '江浙小吃、小吃零食',
                //     source: '推荐',
                //     address: '上海市普陀区真北路',
                //     customerType: '潜在客户',
                //     creationTime: '2017-10-01 12：00',
                //     masterContact: '张三',
                //     telephone: '13822229974',

                // },],
                UEconfig:{
                    initialFrameWidth :800,//设置编辑器宽度
                    initialFrameHeight:250,//设置编辑器高度
                    // 设置不自动调整高度
                    scaleEnabled:false//不可以拉伸
                },
                pageNum:1,
                pageCount:10,
                dataTotal:0,
                pageTotal:1,
                list:[]
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.contactSearch{
    .el-form-item .el-form-item__label{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #505050;
            letter-spacing: 0;
        }
    .el-input__inner{width: 170px; height: 32px; line-height: 32px; background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 3px; font-family: MicrosoftYaHei; font-size: 12px; color: #505050; letter-spacing: 0;}
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        .el-table::before{height:auto;}
        overflow: hidden;
        height: 100%;
        overflow-y: auto;
        background: #ffffff;
        .content-title{
                position: relative;
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #eeeeee;
                 h3{
                     padding-left: 18px;
                 }
                 .add-news{
                     position: absolute;
                     right: 20px;
                     top:0px;
                     padding: 8px 12px;
                     border-radius: 0px;
                 }
        }
        .project-wrap{
            // padding: 20px;
            .project-search .buttonList{float: right; margin-right: 0px;}
            .el-table__body .el-table__row a{cursor: pointer;}
        }
        .el-pagination{
            float: right;
            margin: 20px 12px;
        }
    }
    .slide-modal{
        .operation{
            position: fixed;
            top: 70px;
            right:0px;
            width: 82.333%;
            height: 36px;
            background: rgba(255,255,255,0.3);
            z-index: 1001;
            ul{
                float: right;
                li{
                    float: left;
                    margin-right: 16px;
                    .el-button{
                        padding: 6px 18px;
                        border-radius: 0px;
                        margin-top: 4px;
                        font-weight: normal;
                        color: #82848a;
                    }
                }
            }
        }
        .dia-content{
            margin-top: 60px;
            .information{
                position: relative;
                .add{
                    position: absolute;
                    right: 24px;
                    top:10px;
                    color: #409EFF;
                    font-size: 30px;
                    z-index: 5;
                    cursor: pointer;
                }
            }

        }
    }
    /*项目进度滑块位置调整*/
    .el-slider .el-slider__button-wrapper{
        top:-18px;
    }
</style>

