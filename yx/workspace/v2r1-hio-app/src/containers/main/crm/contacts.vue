<template>
    <div class="wrap">
        <div class="content-title">
            <h3>联系人</h3>
            <i>
                <el-dropdown split-button type="primary" size="small" class="add-news" @click="showContactsDialog" @command="handleImportUser">
                    <i class="el-icon-plus"></i>创建联系人
                    <el-dropdown-menu slot="dropdown" :visible-arrow="false">
                            <el-dropdown-item :visible-arrow="false">导入</el-dropdown-item>
                            <!-- <el-dropdown-item>导出</el-dropdown-item> -->
                    </el-dropdown-menu>
                </el-dropdown>
            </i>
            <!-- <el-button type="primary" class="add-news" @click="showContactsDialog"><i class="el-icon-plus"></i>创建联系人
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>导入</el-dropdown-item>
                        <el-dropdown-item>导出</el-dropdown-item>
                    </el-dropdown-menu>
            </el-button> -->
        </div>

        <div class="project-wrap">
            <!--查询条件-->
            <div class="project-search contactSearch">
                <!--检索内容-->
                <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm">
                    <el-form-item label=" 联系人姓名：" prop="searchVal">
                        <el-input v-model="searchForm.searchVal" placeholder="输入联系人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label=" 手机号码：" prop="searchVal1">
                        <el-input v-model="searchForm.searchVal1" placeholder="输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label=" 客户名称：" prop="searchVal2">
                        <el-input v-model="searchForm.searchVal2" placeholder="输入客户名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="search('searchForm');">查询</el-button>
                        <el-button type="primary" size="small" @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                    <el-form-item>

                    </el-form-item>
                </el-form>

            </div>
            <!--表格-->
            <el-table
                @sort-change="orderList"
                :data="tableData5"
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%;text-align: center;"
                :cell-style="{'font-family': 'MicrosoftYaHei','height':'50px','font-size': '12px','color': '#505050','letter-spacing': 0,'text-align': 'center','line-height': '12px'}"
                :header-cell-style="{'font-family': 'MicrosoftYaHei','text-align':'center','height':'50px','background':' #F6F7F8','font-size':'12px','font-weight':'normal','color':'#505050','padding':'0px'}">
                <!-- <el-table-column type="expand">
                    <template slot-scope="props" >
                        <p style="text-align: left;">{{ props.row.describe }}</p>
                    </template>
                </el-table-column> -->
                <el-table-column
                    label="姓名">
                    <template slot-scope="scope">
                        <a @click="contactJump(scope.row.customerId,scope.row.contcatId)">{{scope.row.contcatName}}</a>
                    </template>
                    <!-- <template slot-scope="scope">
                        <span @click="conJump(scope.row.customerId,scope.row.contactId)">{{scope.row.contactName}}</span>
                    </template> -->
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
                    label="客户名称" 
                    width="120">
                    <template slot-scope="scope">
                        <a @click="customerJump(scope.row.customerId)">{{scope.row.customerName}}</a>
                    </template>
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
                    sortable
                    prop="lastFollowTime"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <!-- <span style="color: #409EFF">共享</span> -->
                        <el-tooltip class="item" effect="dark" content="跟进记录" placement="bottom">
                            <i style="margin-right:4px; color:#46A7FF; font-size:14px;" class="el-icon-tickets" @click="showRecordformDialog(scope.row.customerId,scope.row.contcatId,scope.row)"></i>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                            <i style="margin-right:4px; color:#46A7FF; font-size:14px" class="el-icon-edit" @click="showContactsDialogDel(scope.row.customerId,scope.row.contcatId)"></i>
                            <!-- <span style="color: #409EFF" @click="showContactsDialogDel(scope.row.contcatId)">编辑</span> -->
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                            <i style="color:#46A7FF; font-size:14px" class="el-icon-delete" @click="delMethod(scope.row.customerId,scope.row.contcatId)"></i>
                            <!-- <span style="color: #409EFF" @click="delMethod(scope.row.contcatId)">删除</span> -->
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <el-pagination v-if="dataTotal==0?false:true"
            :current-page="pageNum"
                    :page-size="pageCount"
                    :page-sizes="[10,20,50,100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="dataTotal"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
        </el-pagination>

        <!--右侧弹窗导入用户-->
        <importUserContact :dialogVisible="importUserDialogVisible" v-if="importUserDialogVisible"
                          @closeCreateModal="closeImportUserDialog"></importUserContact>

        <dialog-add-contacts  v-if="contactsDialogVisible"  :dialog-visible="contactsDialogVisible" @closeCreateModal="closeContactsDialog"></dialog-add-contacts>
        <dialog-del-contacts  ref="reftest" :editLi="editData" v-if="contactsDialogVisibleDelete"  :dialog-visible="contactsDialogVisibleDelete" @closeCreateModal="closeContactsDialogDele"></dialog-del-contacts>
        <dialog-follow-recordform-cu-spe :dialogVisible="recordformDialogVisible" ref="recordformId" :customer="currentCustomer"  v-if="recordformDialogVisible" @closeCreateModal="showRecordformDialogClo"></dialog-follow-recordform-cu-spe>
    </div>
</template>

<script>
    import dialogFollowRecordformCuSpe from '@Main/crm/components/dialog.follow.recordform_cu_spe.vue'
    import importUserContact from '@Main/crm/components/importUsers_contact.vue'
    import dialogAddContacts from '@Main/crm/components/dialog.addContacts.vue'
    import dialogDelContacts from '@Main/crm/components/dialog.delContacts.vue'
    import {contactList,modify,del,modifyCustomer} from '@Main/crm/getData'

    export default{
        components: {
            dialogAddContacts,
            dialogDelContacts,
            importUserContact,
            dialogFollowRecordformCuSpe
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
            routerReloadMethod(){
                let pageNum=1;
                let pageCount=10;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                });
            },
            orderList(obj){
                console.log(obj);
                if(obj.order=="ascending"){
                this.lastContactTimeSort="asc";
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                let customerName=this.searchForm.searchVal2;//客户名称
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':'',
                    'customerName':customerName,
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber,
                    'lastContactTimeSort':'asc'
                });
                }else if(obj.order=="descending"){
                    this.lastContactTimeSort="desc";
                    let contcatName=this.searchForm.searchVal;//联系人名称
                    let phoneNumber=this.searchForm.searchVal1;//手机号码
                    let customerName=this.searchForm.searchVal2;//客户名称
                    let pageNum=this.pageNum;
                    let pageCount=this.pageCount;
                    this.contactListData({
                        'pageNum':pageNum,
                        'pageCount':pageCount,
                        'customerId':'',
                        'customerName':customerName,
                        'contcatName':contcatName,
                        'phoneNumber':phoneNumber,
                        'lastContactTimeSort':'desc'
                    });
                }
            },
            showRecordformDialog(id,conId,item){
                this.modifyCustomerData(id,conId,"followRecord",item); 
                // this.recordformDialogVisible = true;
                // this.currentCustomer = {
                //     name : item.customerName,
                //     sid : item.customerId,
                // }
                // this.$nextTick(function(){
                //     this.$refs.recordformId.test(id,conId)
                // })
            },
            showRecordformDialogClo(){
                this.recordformDialogVisible = false;
                let pageNum=this.pageNum;
                if(this.$route.query.pageNum !==undefined){
                    pageNum=this.$route.query.pageNum;
                }
                let pageCount=this.pageCount;
                if(this.$route.query.pageCount !==undefined){
                    pageCount=this.$route.query.pageCount;
                }
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                let customerName=this.searchForm.searchVal2;//客户名称
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':'',
                    'customerName':customerName,
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber,
                    'lastContactTimeSort':this.lastContactTimeSort
                });
            },
            handleImportUser(){
                this.importUserDialogVisible=true;
            },
            closeImportUserDialog(){
                this.importUserDialogVisible=false;
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                let customerName=this.searchForm.searchVal2;//客户名称
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':'',
                    'customerName':customerName,
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber,
                    'lastContactTimeSort':this.lastContactTimeSort
                });   
            },
            async contactListData( {
                pageNum = '' ,
                pageCount = '' ,
                customerId = '' ,
                customerName = '' ,
                contcatName='' ,
                phoneNumber = '',
                lastContactTimeSort=''
             } = {} ){
                let res = await contactList(
                    pageNum,
                    pageCount,
                    customerId,
                    customerName,
                    contcatName,
                    phoneNumber,
                    lastContactTimeSort
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
                JZY.s.hideLoading();
                console.log('lainxirenshuju',this.tableData5);
                console.log(res[0]);
                this.pageCount=res[0].pageCount;
                console.log(this.pageCount);//每页几个pageCount
                this.pageNum=res[0].pageNum;
                console.log(this.pageNum);//第几页pageNum
                this.pageTotal=res[0].pageTotal;
                console.log(this.pageTotal);//总页数pageTotal
                this.dataTotal=res[0].total;
                console.log(this.dataTotal);//总个数total
            },
            // 修改初始化
             async modifyData(sid,customerId,title){
                let res = await modify(sid)
                console.info(res[0])
                if(title=="edit"){
                    this.editData=res[0];
                    this.$refs.reftest.test(this.editData)
                }else if(title=="contactJump"){
                    let routeData = this.$router.push({
                    path: '/crm/contacts/details',
                    query:{
                        customerId:customerId,
                        contactId:sid,
                        }
                    });
                } 
            },
            //删除
             async delData(sid){
                let res = await del(sid)
                console.info(res[0])
                console.log("删除返回信息",res[0]);
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                let customerName=this.searchForm.searchVal2;//客户名称
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':'',
                    'customerName':customerName,
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber,
                    'lastContactTimeSort':this.lastContactTimeSort
                });
            },
            delMethod(customerId,contactId){
                this.modifyCustomerData(customerId,contactId,'delJump');
            },
            contactJump(customerId,contactId){
                this.modifyCustomerData(customerId,contactId,'contactJump');
            },
            customerJump(customerId,contactId){
                this.modifyCustomerData(customerId,contactId,'customerJump');
            },
            // 修改初始化
             async modifyCustomerData(customerId,contactId,title,item){
                let res = await modifyCustomer(customerId).catch((e)=>{
                    if(e.status !==200){
                        let pageNum=this.pageNum;
                        if(this.$route.query.pageNum !==undefined){
                            pageNum=this.$route.query.pageNum;
                        }
                        let pageCount=this.pageCount;
                        if(this.$route.query.pageCount !==undefined){
                            pageCount=this.$route.query.pageCount;
                        }
                        let contcatName=this.searchForm.searchVal;//联系人名称
                        let phoneNumber=this.searchForm.searchVal1;//手机号码
                        let customerName=this.searchForm.searchVal2;//客户名称
                    
                        this.contactListData({
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            'customerId':'',
                            'customerName':customerName,
                            'contcatName':contcatName,
                            'phoneNumber':phoneNumber,
                            'lastContactTimeSort':this.lastContactTimeSort
                        });
                    }   
                })
                console.info(res[0])
                if(title=="customerJump"){
                    let routeData = this.$router.push({
                    path: '/crm/customer/details',
                    query:{
                        customerId:customerId,
                        contactId:contactId,
                        }
                    });
                }else if(title=="followRecord"){
                    console.log('item',item);
                    this.recordformDialogVisible = true;
                    this.currentCustomer = {
                        name : item.customerName,
                        sid : item.customerId,
                    }
                    this.$nextTick(function(){
                        this.$refs.recordformId.test(customerId,contactId)
                    })
                }else if(title=="contactJump"){
                    this.modifyData(contactId,customerId,'contactJump');
                }else if(title=="editJump"){
                    this.contactsDialogVisibleDelete = true;
                    this.modifyId=contactId;
                    this.modifyData(contactId,'','edit'); 
                    console.log(this.modifyId);
                }else if(title=="delJump"){
                    this.$confirm('您确认删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.delData(contactId);
                    }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消'
                        }); 
                });

                }
            },
            showContactsDialog (sid){
                this.contactsDialogVisible = true;
            },
            // 编辑按钮
            showContactsDialogDel (customerId,contactId){
                this.modifyCustomerData(customerId,contactId,'editJump');
            },
            closeContactsDialog (){
                this.contactsDialogVisible = false;
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                let customerName=this.searchForm.searchVal2;//客户名称
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':'',
                    'customerName':customerName,
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber,
                    'lastContactTimeSort':this.lastContactTimeSort
                });
            },
            closeContactsDialogDele (){
                this.contactsDialogVisibleDelete = false;
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                let customerName=this.searchForm.searchVal2;//客户名称
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':'',
                    'customerName':customerName,
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber,
                    'lastContactTimeSort':this.lastContactTimeSort
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
                this.pageNum = 1;
                this.$router.push({
                    path: '/crm/contacts',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                let customerName=this.searchForm.searchVal2;//客户名称
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':'',
                    'customerName':customerName,
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber,
                    'lastContactTimeSort':this.lastContactTimeSort
                });
            },
            search (formName){
                console.log(this.$refs)
                console.log(this.searchForm.searchVal)
                console.log(this.searchForm.searchVal1)
                console.log(this.searchForm.searchVal2)
                this.pageNum = 1;
                this.$router.push({
                    path: '/crm/contacts',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                let customerName=this.searchForm.searchVal2;//客户名称
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':'',
                    'customerName':customerName,
                    'contcatName':contcatName,
                    'phoneNumber':phoneNumber,
                    'lastContactTimeSort':this.lastContactTimeSort
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
            console.log(this.$router);
            this.$router.push({
                path: '/crm/contacts',
                query:{pageNum:this.pageNum,pageCount:this.pageCount}
            });
            let contcatName=this.searchForm.searchVal;//联系人名称
            let phoneNumber=this.searchForm.searchVal1;//手机号码
            let customerName=this.searchForm.searchVal2;//客户名称
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;
            this.contactListData({
                'pageNum':pageNum,
                'pageCount':pageCount,
                'customerId':'',
                'customerName':customerName,
                'contcatName':contcatName,
                'phoneNumber':phoneNumber,
                'lastContactTimeSort':this.lastContactTimeSort
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
            console.log(this.$router);
            this.$router.push({
                path: '/crm/contacts',
                query:{pageNum:this.pageNum,pageCount:this.pageCount}
            });
            let contcatName=this.searchForm.searchVal;//联系人名称
            let phoneNumber=this.searchForm.searchVal1;//手机号码
            let customerName=this.searchForm.searchVal2;//客户名称
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;
            this.contactListData({
                'pageNum':pageNum,
                'pageCount':pageCount,
                'customerId':'',
                'customerName':customerName,
                'contcatName':contcatName,
                'phoneNumber':phoneNumber,
                'lastContactTimeSort':this.lastContactTimeSort
            });
            // const page = {
            //     pageNum:this.pageNum.toString(),
            //     pageCount:this.pageCount
            // }
            // console.info(page)
            // this.$emit('refleshTable',page)
        },
        },

        created (){
            let pageNum=this.pageNum;
            if(this.$route.query.pageNum !==undefined){
                pageNum=this.$route.query.pageNum;
            }
            let pageCount=this.pageCount;
            if(this.$route.query.pageCount !==undefined){
                pageCount=this.$route.query.pageCount;
            }
            let contcatName=this.searchForm.searchVal;//联系人名称
            let phoneNumber=this.searchForm.searchVal1;//手机号码
            let customerName=this.searchForm.searchVal2;//客户名称
            this.contactListData({
                'pageNum':pageNum,
                'pageCount':pageCount,
                'customerId':'',
                'customerName':customerName,
                'contcatName':contcatName,
                'phoneNumber':phoneNumber,
                'lastContactTimeSort':this.lastContactTimeSort
            });
        },
        data(){
            return {
                lastContactTimeSort:'',
                recordformDialogVisible : false,
                importUserDialogVisible:false,
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
    .el-input__inner{width: 200px; height: 32px; line-height: 32px; background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 3px; font-family: MicrosoftYaHei; font-size: 12px; color: #505050; letter-spacing: 0;}
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
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
                    padding-left: 24px;
                    font-family: MicrosoftYaHei;
                    font-size: 14px;
                    color: #191919;
                    margin-top:0px;
                    margin-bottom:0px;
                 }
                 .add-news{
                    position: absolute;
                    right: 24px;
                    top:0px;
                 }
        }
        .project-wrap{
            padding: 24px 24px 0px 24px;
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

