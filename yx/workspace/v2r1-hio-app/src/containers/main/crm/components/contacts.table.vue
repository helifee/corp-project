<template>
    <div class="wrap">
            <!--表格-->
            <el-table
                :data="tableData5"
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%;text-align: center;"
                :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333'}">
                <el-table-column type="expand">
                    <template slot-scope="props" >
                        <p style="text-align: left;">{{ props.row.describe }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="contcatName">
                    <template slot-scope="scope">
                        <span @click="conJump(scope.row.customerId,scope.row.contactId)">{{scope.row.contactId}}</span>
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
                    label="客户名称" 
                    width="120">
                    <template slot-scope="scope">
                        <span @click="jump(scope.row.customerId,scope.row.contactId)">{{scope.row.customerName}}</span>
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
                    label="最后跟进"
                    sortable
                    prop="lastFollowTime"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <!-- <span style="color: #409EFF">共享</span> -->
                        <el-tooltip class="item" effect="dark" content="跟进记录" placement="bottom">
                            <i class="el-icon-mobile-phone"></i>
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                            <i class="el-icon-edit" @click="showContactsDialogDel(scope.row.contcatId)"></i>
                            <!-- <span style="color: #409EFF" @click="showContactsDialogDel(scope.row.contcatId)">编辑</span> -->
                        </el-tooltip>

                        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                            <i class="el-icon-delete" @click="delMethod(scope.row.contcatId)"></i>
                            <!-- <span style="color: #409EFF" @click="delMethod(scope.row.contcatId)">删除</span> -->
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
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

        <dialog-add-contacts  v-if="contactsDialogVisible"  :dialog-visible="contactsDialogVisible" @closeCreateModal="closeContactsDialog"></dialog-add-contacts>
        <dialog-del-contacts  ref="reftest" :editLi="editData" v-if="contactsDialogVisibleDelete"  :dialog-visible="contactsDialogVisibleDelete" @closeCreateModal="closeContactsDialogDele"></dialog-del-contacts>
    </div>
</template>

<script>
    import dialogAddContacts from '@Main/crm/components/dialog.addContacts.vue'
    import dialogDelContacts from '@Main/crm/components/dialog.delContacts.vue'
    import {contactList,modify,del} from '@Main/crm/getData'

    export default{
        components: {
            dialogAddContacts,
            dialogDelContacts
        },
        filters:{
            gend (value){
                //性别 ：0男、1女
                switch (value) {
                    case 1:
                        return '女';
                    case 0:
                        return '男';
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
            },
            // 修改初始化
             async modifyData(sid){
                let res = await modify(sid)
                console.info(res[0])
                this.editData=res[0];
                this.$refs.reftest.test(this.editData)
                // console.log('修改数据editData',this.editData);
            },
            //删除
             async delData(sid){
                let res = await del(sid)
                console.info(res[0])
                console.log("删除返回信息",res[0]);
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
                this.delData(sid);
            },
            conJump(customerId,contactId){
                let routeData = this.$router.push({
                // path: '/crm/customer/details/'+sid,
                path: '/crm/contacts/details',
                query:{
                    customerId:customerId,
                    contactId:contactId,
                    }
                });
            },
            jump(customerId,contactId){
                let routeData = this.$router.push({
                // path: '/crm/customer/details/'+sid,
                path: '/crm/customer/details',
                query:{
                    customerId:customerId,
                    contactId:contactId,
                    }
                });
            },
            showContactsDialog (sid){
                this.contactsDialogVisible = true;
            },
            // 编辑按钮
            showContactsDialogDel (sid){
                this.contactsDialogVisibleDelete = true;
                this.modifyId=sid;
                this.modifyData(sid); 
                console.log(this.modifyId);
            },
            closeContactsDialog (){
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
                console.log(this.searchForm.searchVal2)
                let contcatName=this.searchForm.searchVal;//联系人名称
                let phoneNumber=this.searchForm.searchVal1;//手机号码
                let customerName=this.searchForm.searchVal2;//客户名称
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;
                let customerId=this.$route.query.customerId;
                this.contactListData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerId':customerId,
                    'customerName':customerName,
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
        },

        created (){
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;
            let customerId=this.$route.query.customerId;
            this.contactListData({
                'customerId':customerId,
                'pageNum':pageNum,
                'pageCount':pageCount,
            });  
        },
        data(){
            return {
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
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        overflow: hidden;
        height: 100%;
        overflow-y: auto;
        background: #ffffff;
        .content-title{
                 position: relative;
                 margin: 12px 0px;
                 line-height: 32px;
                 height: 48px;
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
            padding: 20px;
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

