<template>
    <right-slide-modal
            title="创建阶段"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button @click="operateSave('form')">保存</el-button></li>
                <li><el-button @click="operateClose('form')">关闭</el-button></li>
            </ul>
        </div>
        <div>
            <el-form ref="form" v-model="form" :rules="rules"  label-width="120px">
                <el-form-item label="阶段名称:" prop="name">
                    <el-input v-model="form.name" :maxlength="51"></el-input>
                </el-form-item>
                <el-form-item label="阶段描述:" >
                    <el-input v-model="form.des" :maxlength="101"></el-input>
                </el-form-item>
                <el-form-item label="我方负责人:">
                    <el-tag
                            v-for="(item,index) in leaderData"
                            :key="index"
                            closable
                            :disable-transitions="false"
                            @close="deleteUser(item.sid,'user1')">
                        {{item.name}}
                    </el-tag>
                    <span class="el-icon-edit" @click="showLeaderTree">修改负责人</span>
                </el-form-item>
                <el-form-item label="参与人:">
                    <el-tag
                            v-for="(item,index) in participantsData"
                            :key="index"
                            closable
                            :disable-transitions="false"
                            @close="deleteUser(item.sid,'partTree')">
                        {{item.name}}
                    </el-tag>

                    <span class="el-icon-circle-plus add_approver" @click="showPartTree('leader')">添加参与人</span>
                </el-form-item>
                <el-form-item label="开始日期:" style="display: inline-block">
                    <el-date-picker
                            v-model="form.startTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请输入开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期:" style="display: inline-block">
                    <el-date-picker
                            v-model="form.endTime"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请输入结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <user-tree :selectUserDialogVisible="showUserTree"
                       @closeCreateModal ="showUserTree = !showUserTree"
                       :show-inside-outside-tabs="showInsideOutsideTabs"
                       :selectedUsers = "userData"
                       @getUserTree = "getUserTree"
                       :enable-checked-multiple="enableCheckedMultipleUser">
            </user-tree>
        </div>
    </right-slide-modal>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default{
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            ...mapGetters({
                session:'session'
            })
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            },
        },
        methods:{
//            关闭
            operateClose(formName){
                this.$emit("closeCreateModal");
            },
            operateSave (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('sub')

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //接收用户树返回的数据
            getUserTree:function(arr){
                let typeName = this.treeType;
                if(typeName == 'leaderTree'){
                    this.leaderData = [...arr];
                    this.projectForm.leader = [...arr];
                }else if(typeName == 'partTree'){
                    this.participantsData = [...arr];
                    this.projectForm.participants = [...arr];
                }else if(typeName == 'shareTree'){
                    this.sharedData = [...arr];
                    this.projectForm.sharing = [...arr];
                }

            },
            //删除用户tag的事件
            deleteUser(sid,type) {
                if(type == 'leaderTree'){
                    this.leaderData =  this.leaderData.filter(function(item) {
                        return item.sid != sid;
                    });
                }else if(type == 'partTree'){
                    this.participantsData =  this.participantsData.filter(function(item) {
                        return item.sid != sid;
                    });
                }
            },
            //负责人
            showLeaderTree(){
                this.showUserTree = true;
                this.enableCheckedMultipleUser = false;
                this.showInsideOutsideTabs = false;
                this.treeType = 'leaderTree';
            },
            //参与人
            showPartTree(){
                this.showUserTree = true;
                this.enableCheckedMultipleUser = true;
                this.showInsideOutsideTabs = true;
                this.treeType = 'partTree';
            },
            getUserData(){
                let obj = {};
                this.leaderData = [];
                obj.sid = this.session.sid;
                obj.name = this.session.name;
                this.leaderData.push(obj);
            }
        },
        data(){
            return {
                enableCheckedMultipleUser:false,//是否多选
                showUserTree:false,
                showInsideOutsideTabs:false,
                userData:[],
                leaderData:[],
                participantsData:[],
                form:{
                    name:'',
                    des:'',
                    leader: [],//负责人
                    participants: [],//参与人
                    startTime:'',
                    endTime:'',
                },
                rules:{
                    name:[
                        { required: true, message: '请输入阶段名称', trigger: 'blur' },
                        { min: 1, max: 50, message: '阶段名称文字长度不能大于50字符，请重新输入！', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    des:[
                        { min: 1, max: 100, message: '阶段描述文字长度不能大于50字符，请重新输入！', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ]
                },
            }
        },
        watch:{

        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
</style>
