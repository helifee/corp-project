<template>
    <right-slide-modal
            title="新建文章"
            @open="openCreate"
            :visible.sync="propsDialogVisible"
            :showClose="false"
            class="news-create-dialog"
    >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button @click="operateSave('form')"  :disabled ='$refs.attachUpload&&!$refs.attachUpload.allowSubmit'>保存</el-button></li>
                <li><el-button  @click="operateSubmit('form')" :disabled ='$refs.attachUpload&&!$refs.attachUpload.allowSubmit'>发布</el-button></li>
                <li><el-button  @click="operateClose('form')">关闭</el-button></li>
            </ul>
        </div>
        <div style="padding: 0px">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="">
                <el-form-item label="输入标题：" prop="title">
                    <el-input v-model="form.title" style="width: 680px" maxlength="51" ></el-input>
                </el-form-item>
                <el-form-item label="选择栏目：" prop="typeId">
                    <el-select v-model="form.typeId" placeholder="请选择栏目"  style="width: 680px">
                        <el-option :label="item.name" @change="changeColumn" :value="item.sid" :key="item.sid" v-for="item,index in columnOption"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="输入内容：" prop="newsContent">
                    <UEditor
                             v-if="attach.appId"
                             id="editor"
                             :config="UEconfig"
                             ref="UEditor"
                             :appId="attach.appId"
                             :businessId="JZY.u.uuid()"
                             :categoryId="attach.categoryId"
                             style="line-height: 24px"></UEditor>
                </el-form-item>
                <el-form-item label="可见范围：" prop="groupDataContent">
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
                </el-form-item>
                <el-form-item label="排序设置：" prop="newsTop">
                    <el-radio v-model="form.newsTop" :label="0">默认</el-radio>
                    <el-radio v-model="form.newsTop" :label="1">置顶</el-radio>
                </el-form-item>
                <el-form-item label="评论设置：" prop="isComment">
                    <el-switch
                            v-model="form.isComment">
                    </el-switch>
                </el-form-item>
                <el-form-item label="提醒设置：" prop="msgReminding">
                    <el-switch
                            v-model="form.msgReminding">
                    </el-switch>
                </el-form-item>

                <el-form-item label="上传附件：" prop="enclosure">
                    <!--附件组件-->
                    <attach-upload
                            v-if="attach.businessId"
                            ref="attachUpload"
                            :required="false"
                            :multiple="false"
                            :appId="attach.appId"
                            :businessId="attach.businessId"
                            :categoryId="attach.categoryId"
                            @fileQueued="handleAttachQueued"
                            @uploadError="handleAttachError"
                            @uploadFinished="handleAttachUploadSuccess">
                    </attach-upload>
                </el-form-item>
            </el-form>
        </div>
    </right-slide-modal>
</template>

<script>
    import UEditor from '@/components/UEditor.vue'
    import {postNewsSave,postNewsPublish,getNewsTypeList} from '@Main/news/getData.js'
    import {mapMutations} from 'vuex'
    export default{
        components:{
            UEditor
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            columnId:{
                required:false
            }
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            }
        },
        methods:{
            getDataFromTree( obj = {} ){
                this.formGroupData = {...obj};
                let len = obj.userList.length+obj.deptList.length+obj.roleList.length;
                this.form.groupDataContent = len>0?"1":'';
                this.$refs['form'].validateField('groupDataContent',(valid) => {});
            },
            //打开初始化
            openCreate(){
                this.columnOption = this.$store.state.columnsList;
                this.getAttach();
            },
            //切换栏目
            changeColumn(value){
                this.form.newsTypeName = value;
            },
//            关闭
            operateClose(formName){
                this.formGroupData = {
                    deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[]}
                this.selectedDataToTree = {
                    deptList:[],
                    //已选择的角色
                    roleList:[],
                    //已选择的用户
                    userList:[]};
                this.attach={
                    appId:'',
                    businessId:'',
                    categoryId:''
                };
                this.$refs[formName].resetFields();
                this.$emit("closeCreateModal");
            },
            //文件上传-上传中
            handleAttachQueued(){
            },
            //文件上传-成功
            handleAttachUploadSuccess(res){
            },
            //文件上传-出错
            handleAttachError(){
            },
//            保存
            async operateSave (formName){
                this.form.newsContent = this.$refs.UEditor.getContent();
                this.form.getContentTxt = this.$refs.UEditor.getContentTxt();
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //用户
                        let userIdList = [];
                        if(this.formGroupData.userList){
                            let data = this.formGroupData.userList;
                            data.map((item)=>{
                                userIdList.push(item.sid);
                            });
                        }
                        //角色
                        let roleIdList = [];
                        if(this.formGroupData.roleList){
                            let data = this.formGroupData.roleList;
                            data.map((item)=>{
                                roleIdList.push(item.roleId);
                            });
                        }
                        //部门
                        let orgIdList = [];
                        if(this.formGroupData.deptList){
                            let data = this.formGroupData.deptList;
                            data.map((item)=>{
                                orgIdList.push(item.sid);
                            });
                        }
                        let queryData = {};
                        let form = this.form;
                        queryData.isComment = +form.isComment;//是否允许评论，0：否；1：是    true
//                        queryData.id = '';//id   新闻主键                                  false
                        queryData.newsContent = form.newsContent;//新闻内容                true
                        queryData.hitNum = 0;//新闻点击数量                               false
                        queryData.newsTop = +form.newsTop;//是否置顶，0：否；1：是                     fasle
                        queryData.title = form.title;//新闻标题                         true
                        queryData.headline = form.getContentTxt.substring(0,150);//新闻摘要                      true
                        queryData.newsTypeName = form.newsTypeName;//新闻栏目名称               true
                        queryData.msgReminding = +form.msgReminding;//新闻是否提醒，0：否；1：是  true
                        queryData.isSuper = 0;//是否超级管理员，0：否；1：是                false
                        queryData.typeId = form.typeId;//新闻栏目ID                    true
                        queryData.userIdList = userIdList;//可见范围人的ID集合                     false
                        queryData.orgIdList = orgIdList;//可见范围组织的ID集合                    false
                        queryData.roleIdList = roleIdList;//可见范围角色的ID集合                   false
                        queryData.status = 0;//新闻状态，0：草稿；1：发布                  false
                        queryData.businessId = this.attach.businessId;//新闻附件               false
                        this.rqNewsSave (queryData);

                    } else {
                        return false;
                    }
                });
            },
//            发布
            async operateSubmit(formName){
                this.form.newsContent = this.$refs.UEditor.getContent();
                this.form.getContentTxt = this.$refs.UEditor.getContentTxt();
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //用户
                        let userIdList = [];
                        if(this.formGroupData.userList){
                            let data = this.formGroupData.userList;
                            data.map((item)=>{
                                userIdList.push(item.sid);
                            });
                        }
                        //角色
                        let roleIdList = [];
                        if(this.formGroupData.roleList){
                            let data = this.formGroupData.roleList;
                            data.map((item)=>{
                                roleIdList.push(item.roleId);
                            });
                        }
                        //部门
                        let orgIdList = [];
                        if(this.formGroupData.deptList){
                            let data = this.formGroupData.deptList;
                            data.map((item)=>{
                                orgIdList.push(item.sid);
                            });
                        }
                        let queryData = {};
                        let form = this.form;
                        queryData.isComment = +form.isComment;//是否允许评论，0：否；1：是    true
//                        queryData.id = '';//id   新闻主键                                  false
                        queryData.newsContent = form.newsContent;//新闻内容                true
                        queryData.hitNum = 0;//新闻点击数量                               false
                        queryData.newsTop = +form.newsTop;//是否置顶，0：否；1：是                     fasle
                        queryData.title = form.title;//新闻标题                         true
                        queryData.headline = form.getContentTxt.substring(0,150);//新闻摘要                      true
                        queryData.newsTypeName = form.newsTypeName;//新闻栏目名称               true
                        queryData.msgReminding = +form.msgReminding;//新闻是否提醒，0：否；1：是  true
                        queryData.isSuper = 0;//是否超级管理员，0：否；1：是                false
                        queryData.typeId = form.typeId;//新闻栏目ID                    true
                        queryData.userIdList = userIdList;//可见范围人的ID集合                     false
                        queryData.orgIdList = orgIdList;//可见范围组织的ID集合                    false
                        queryData.roleIdList = roleIdList;//可见范围角色的ID集合                   false
                        queryData.status = 1;//新闻状态，0：草稿；1：发布                  false
                        queryData.businessId = this.attach.businessId;//新闻附件               false
                        this.rqNewsPublish (queryData);
                    } else {
                        return false;
                    }
                });
            },
            setContent(msg){
                this.$refs.UEditor.setContent(msg);
            },
            ...mapMutations({
                updateColumn:'UPDATE_COLUMN'
            }),
            //刷新栏目
            async rqNewsTypeList(){
                let res = await getNewsTypeList();
                this.updateColumn(res);
            },
            //保存新闻
            async rqNewsSave(queryData){
                let res = await postNewsSave(queryData);
                await this.$refs.UEditor.saveFiles()
                await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                this.$message({
                    message: '保存新闻成功！',
                    type: 'success'
                });
                this.operateClose('form');
                this.$emit('refreshList');
            },
            //发布新闻
            async rqNewsPublish(queryData){
                let res = await postNewsPublish(queryData);
                await this.$refs.UEditor.saveFiles()
                await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
//                console.log(res,"resresres");
                this.$message({
                    message: '发布新闻成功！',
                    type: 'success'
                });
                this.rqNewsTypeList();
                this.operateClose('form');
                this.$emit('refreshList');
            },
            //获取附件信息
            async getAttach(){
                let res  = await JZY.xhr.r([{type:'get',url:'/news/attachment',data:{}}],'GLOBAL.MA_CHANG_XI',false,false).then((resultData)=>{
                    try{
                        return resultData;
                    }catch (e){
                        return false;
                    }
                }).catch((e)=>{
                    //接口失败
                    throw new Error(e)
                });
                this.attach.appId = res[0].appId;
                this.attach.businessId = res[0].businessId;
                this.attach.categoryId = res[0].categoryId;
            }
        },
        data(){
            return {
                columnOption:[],
                form:{
                    typeId:'',
                    newsTypeName:'',
                    title:'',
                    newsContent:'',
                    groupDataContent:'',
                    msgReminding:true,
                    isComment:true,
                    newsTop:0,
                },
                attach:{
                    appId:'',
                    businessId:'',
                    categoryId:''
                },
                rules:{
                    typeId: [
                        { required: true, message: '请选择所属类别', trigger: 'change' },
                    ],
                    title: [
                        { required: true, message: '请输入新闻标题', trigger: 'blur' },
                        { min: 1, max: 50, message: '新闻标题文字长度不能大于50字符，请重新输入！', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    newsContent: [
                        { required: true, message: '请输入新闻内容', trigger: 'blur' },
                    ],
                    groupDataContent: [
                        { required: true, message:'请选择可见范围', trigger: 'change'},
                    ],
                    msgReminding: [
                        { required: true, message: '', },
                    ],
                    isComment: [
                        { required: true, message: '', },
                    ],
                    newsTop: [
                        { required: true, message: '', },
                    ],

                },
                editorOption:{
                    placeholder: '请输入内容',
                    modules: { // 配置富文本
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'font': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image', 'video']
                        ]
                    }
                },
                UEconfig:{
                    initialContent:'请输入内容',
                    autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth :680,//设置编辑器宽度
                    initialFrameHeight:400,//设置编辑器高度
                    elementPathEnabled : false,
                    // 设置不自动调整高度
                    scaleEnabled:false,//不可以拉伸
                    maximumWords:5000,//字数限制
                    autoSyncData:false,//自动同步编辑器要提交的数据
                    autoFloatEnabled:false,//是否保持toolbar的位置不动，默认true
                    enableAutoSave: false,//取消自动保存
                    allowDivTransToP:false,
                    autoHeightEnabled: false,
                    zIndex:10000,//编辑器在页面上的z-index层级的基数，默认是900
                    toolbars:[[
                        'undo', //撤销
                        'redo', //重做
                        'bold', //加粗
                        'indent', //首行缩进
                        'italic', //斜体
                        'underline', //下划线
                        'strikethrough', //删除线
                        'formatmatch', //格式刷
                        'blockquote', //引用
                        'horizontal', //分隔线
                        'removeformat', //清除格式
                        'fontfamily', //字体
                        'fontsize', //字号
                        'paragraph', //段落格式
                        'simpleupload', //单图上传
//                        'insertimage', //多图上传
                        'link', //超链接
                        'unlink', //取消链接
                        'justifyleft', //居左对齐
                        'justifyright', //居右对齐
                        'justifycenter', //居中对齐
                        'justifyjustify', //两端对齐
                        'forecolor', //字体颜色
                        'insertorderedlist', //有序列表
                        'insertunorderedlist', //无序列表
                        'lineheight', //行间距
                        'edittip ', //编辑提示
                    ]],
                    insertorderedlist:{
                        'decimal': '' ,
                    },
                    insertunorderedlist:{
                        'circle': '', // '○ 小圆圈'
                        'disc': '', // '● 小圆点'
                        'square': '' //'■ 小方块'
                    }
                },
                selectedDataToTree: {//已选树节点
                    userList: [],
                    deptList: [],
                    roleList: [],


                },
                formGroupData:{ userList: [],
                    deptList: [],
                    roleList: [],
                },
            }
        },
        watch:{
            'columnId':function(curVal,oldVal){
                if(curVal == 'all'){
                    this.form.typeId = '';
                }else {
                    this.form.typeId = curVal;
                }
            },

        },
        mounted (){
        }

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<style rel="stylesheet/scss" lang="scss">
    .news-create-dialog{
        .el-dialog .el-dialog__body{
            padding: 48px 0px;
        }
    }
</style>
