<template>
    <div class="group_tree">
        <div class="group_tree_buttons">
            <!--下拉选择框-->
            <el-select v-model="addButton" :placeholder="l('{groupTreeLocale.selectPlaceholder}')">
              <el-option v-for="(item,index) in tagShow" :key="index" :label="l('{groupTreeLocale.selectButtons}')[item]" :value="item"></el-option>
            </el-select>
            <!--添加按钮-->
            <div class="el-icon-circle-plus add_permission" v-if="addButton === item" v-for="(item,index) in tagShow" :key="index" @click="openAddDialog(item)" ><span>{{l('{groupTreeLocale.addButtons}')[item]}}</span></div>
        </div>
        <div class="group_tree_content">

            <el-tag
              v-for="(item,index) in sortList"
              :key="item.type+'-'+item.sid"
              closable
              :type="item.tagType"
              :disable-transitions="false"
              @close="deleteListData(item.sid,item.type)">
              {{item.name}}
            </el-tag>
            <!--部门权限-->
            <!-- <el-tag
              v-for="(item,index) in dataListFromParent.deptList"
              :key="'dept1-'+item.sid"
              closable
              :disable-transitions="false"
              @close="deleteListData(item.sid,'dept')">
              {{item.name}}
            </el-tag> -->
            <!--角色权限-->
            <!-- <el-tag
              v-for="(item,index) in dataListFromParent.roleList"
              :key="'role1-'+item.roleId"
              closable
              type="info"
              :disable-transitions="false"
              @close="deleteListData(item.roleId,'role')">
              {{item.roleName}}
            </el-tag> -->
            <!--用户权限-->
            <!-- <el-tag
              v-for="(item,index) in dataListFromParent.userList"
              :key="'user1-'+item.sid"
              closable
              type="danger"
              :disable-transitions="false"
              @close="deleteListData(item.sid,'user')">
              {{item.name}}
            </el-tag> -->
        </div>
        <!--选择部门树弹出窗-->
        <dept-tree
            v-if=""
            :selectDeptDialogVisible="showTree.dept"
            :enable-checked-multiple="deptTreeEnableCheckedMultipleDept"
            :selectedDepts = "dataListFromParent.deptList"
            @closeCreateModal ="showTree.dept = !showTree.dept"
            @getDeptTree = "getDeptTree">
        </dept-tree>
        <!--选中角色树弹出窗-->
        <role-tree
            :selectRoleDialogVisible="showTree.role"
            :selectedRoles = "dataListFromParent.roleList"
            @closeCreateModal ="showTree.role = !showTree.role"
            @getRoleTree = "getRoleTree">
        </role-tree>
        <!--选择用户树弹出窗-->
        <user-tree
            :selectUserDialogVisible="showTree.user"
            :enable-checked-multiple="userTreeEnableCheckedMultipleUser"
            :expand-all="expandAll"
            :show-inside-outside-tabs="userTreeShowInsideOutsideTabs"
            :selectedUsers = "dataListFromParent.userList"
            @closeCreateModal ="showTree.user = !showTree.user"
            @getUserTree = "getUserTree">
        </user-tree>
    </div>
</template>

<script>
//解决全局引入的时候，main.js中的JZY没生效的bug

//此处代码写到了定义这个tree之前的main.js文件里，因为setTimeout不靠谱 在ie下失败
// setTimeout(function(){
//     JZY.locale.add('groupTreeLocale',require('./groupTree.locale'))
// },100)



    export default{
        components: {
        },
        data(){
            return {
                addButton:this.tagButtons[2],//添加审批人按钮类型dept部门，role角色，user用户
                
                showTree:{//树组件弹出窗开关
                    dept:false,//部门
                    role:false,//角色
                    user:false,//用户
                },

                // showTree.dept:false,//部门树组件弹出窗开关
                deptTreeEnableCheckedMultipleDept:true,//部门树：false单选，true多选（默认是多选，此种模式可不传递此参数

                userTreeEnableCheckedMultipleUser:true,//用户树：false单选，true多选（默认是多选，此种模式可不传递此参数）
                // userTreeShowInsideOutsideTabs:true,//用户树：显示内、外部，false:只显示‘人员’，其他逻辑无差异
                dataListFromParent:{//已选list
                    deptList:[],
                    roleList:[],
                    userList:[],
                },
                // dataListFromParent:{//已选list
                //     permissionDept:[{//已选择的部门
                //       sid:'1002',
                //       name:'市场部'
                //     },{
                //       sid:'1003',
                //       name:'人事部'
                //     }],
                //     permissionRole:[{//已选择的角色
                //         roleId:'1003',
                //         roleName:'销售经理'
                //     }],
                //     permissionUser:[{//已选择的用户
                //       // nodeId:'e08fa8dcfb0f443fb8d09437e7a60aca',
                //       sid:'1000',
                //       name:'创建者'
                //     }],
                // },
                sortList:[],//定义一个全局变量，实现tag按照先后产生的时间排序
            }
        },
        props:{
            //已选部门
            selectedDeptsToTree:{
                type:Array,
                default:function(){
                    return []
                }
            },
            //已选角色
            selectedRolesToTree:{
                type:Array,
                default:function(){
                    return []
                }
            },
            //已选人员
            selectedUsersToTree:{
                type:Array,
                default:function(){
                    return []
                }
            },
            //显示模块，默认全部
            tagButtons: {
                type: Array,
                default:function(){
                    return ['dept','role','user']
                }
            },
            //用户，是否显示外部联系人，false不显示外部联系人
            userTreeShowInsideOutsideTabs: {
                type: Boolean,
                default:false
            },
            //用户树，是否默认展开
            expandAll:{
                type:Boolean,
                default:true
            }
        },
        computed:{
            //select的选项list
            tagShow: function() {
                return [...this.tagButtons]
            }
        },
        methods:{
            //弹出窗事件，添加部门、角色、用户
            openAddDialog:function(type = ''){
                this.showTree[type] = true
            },
            //删除部门、角色、用户的tag标签事件
            deleteListData(sid,type) {
                //处理排序的逻辑
                this.setDeleteSortList(sid,type)
                if (type == 'role') {
                    this.dataListFromParent[type+'List'] = this.dataListFromParent[type+'List'].filter(function(item) {
                      return item.roleId != sid;
                    });
                }else{
                    this.dataListFromParent[type+'List'] = this.dataListFromParent[type+'List'].filter(function(item) {
                      return item.sid != sid;
                    });
                }
                // debugger
                this.emitTreeData()
            },
            //接收部门树组件的返回值
            getDeptTree:function(arr){
                //处理排序的逻辑
                this.setAddSortList(arr,this.dataListFromParent.deptList,'dept')

                this.dataListFromParent.deptList = [...arr]
                this.emitTreeData()

            },
            //接收角色组件的返回值
            getRoleTree:function(arr){
                //处理排序的逻辑
                this.setAddSortList(arr,this.dataListFromParent.roleList,'role')

                this.dataListFromParent.roleList = [...arr]
                this.emitTreeData()
            },
            //接收用户树返回的数据
            getUserTree:function(arr){
                //处理排序的逻辑
                this.setAddSortList(arr,this.dataListFromParent.userList,'user')

                this.dataListFromParent.userList = [...arr]
                this.emitTreeData()
            },
            //输出数据到父组件
            emitTreeData:function(){
                this.$emit('getDataFromGroupTree',this.dataListFromParent);
            },
            //处理添加节点的排序逻辑
            setAddSortList:function(newArr,oldArr,type=''){
                let key = 'sid'
                let name = 'name'
                let tagType = ''

                if (type === 'role') {
                    key = 'roleId'
                    name = 'roleName'
                    tagType = 'info'
                }else if(type === 'user'){
                    tagType = 'danger'
                }
                
                let tempArr = []
                // console.info("newArr",newArr)
                // console.info("oldArr",oldArr)
                // tempArr = this.subSet([{sid:1},{sid:2},{sid:3},{sid:4}],[{sid:1},{sid:4}],'sid')
                // console.info("tempArr",tempArr)
                tempArr = this.subSet(newArr,oldArr,key)
// debugger
                tempArr.forEach((item)=>{
                    // alert(item[name])
                    this.sortList.push({
                        type:type,
                        sid:item[key],
                        name:item[name],
                        tagType:tagType
                    })
                })
                
                console.info("this.sortList",this.sortList)
            },
            //处理删除节点的排序逻辑
            setDeleteSortList:function(sid,type=''){

                this.sortList=this.sortList.filter((item)=> {
                    if (item.type === type) {
                        return item.sid !== sid
                    }else{
                        return true
                    }
                    
                });
                
                console.info("this.sortList",this.sortList)
            },


//             //处理排序的逻辑
//             setSortList:function(newArr,oldArr,type=''){
//                 let key = 'sid'
//                 let name = 'name'
//                 let tagType = ''

//                 if (type === 'role') {
//                     key = 'roleId'
//                     name = 'roleName'
//                     tagType = 'info'
//                 }else if(type === 'user'){
//                     tagType = 'danger'
//                 }

//                 let tempArr = []
//                 // console.info("newArr",newArr)
//                 // console.info("oldArr",oldArr)
//                 // tempArr = this.subSet([{sid:1},{sid:2},{sid:3},{sid:4}],[{sid:1},{sid:4}],'sid')
//                 // console.info("tempArr",tempArr)
// debugger
//                 if ( newArr.length > oldArr.length ) {//增加元素

//                     tempArr = this.subSet(newArr,oldArr,key)

//                     tempArr.forEach((item)=>{
//                         // alert(item[name])
//                         this.sortList.push({
//                             type:type,
//                             sid:item[key],
//                             name:item[name],
//                             tagType:tagType
//                         })
//                     })
//                 }else if( newArr.length < oldArr.length ){//删除元素

//                     tempArr = this.subSet(oldArr,newArr,key)

//                     tempArr.forEach((item)=>{
//                         let that = this
//                         if (item.type == 'role' || item.hasOwnProperty('roleId')) { //角色的删除
//                             that.sortList = that.sortList.filter(function(list) {
//                                 if(list.type == 'role') { 
//                                     return list.sid != item[key];
//                                 }else{
//                                     return true
//                                 }
//                             });
//                         }else if(item.type == 'dept'){ //部门的删除
//                             that.sortList = that.sortList.filter(function(list) {
//                                 if(list.type == 'dept') { 
//                                     return list.sid != item[key];
//                                 }else{
//                                     return true
//                                 }
//                             });
//                         }else{ //人员的删除
//                             that.sortList = that.sortList.filter(function(list) {
//                                 if(item.type == 'user') { 
//                                     return list.sid != item[key];
//                                 }else{
//                                     return true
//                                 }
//                             });
//                         }
//                     })
//                 }else{//初始化
//                     // this.sortList = [ ...this.sortList , ...newArr ]
//                 }
                
//                 console.info("this.sortList",this.sortList)
//             },
            /*
            * 两个数组取差集，key数组对象的主键sid
            * arr1中的元素不在arr2中，则返回此部分差集
            */
            subSet:function(arr1, arr2, key='') {

                let tempArr = arr2.map((item) => {
                    return item[key];
                });
                var set1 = new Set(arr1);
                var set2 = new Set(tempArr);

                var subset = [];

                for (let item of set1) {
                    if (!set2.has(item[key])) {
                        subset.push(item);
                    }
                }
                return subset;
            },
        },
        mounted(){
            // JZY.locale.add('groupTreeLocale',groupTreeLocale)
            // this.getUserData()
            console.info(this.dataListFromParent)
// debugger
            //初始化排序list
            this.selectedDeptsToTree.forEach((item)=>{
                this.dataListFromParent.deptList.push({
                    type:'dept',
                    sid:item.sid,
                    name:item.name,
                    tagType:''
                })
            })

            this.sortList = [ ...this.sortList ,...this.dataListFromParent.deptList ]

            this.selectedRolesToTree.forEach((item)=>{
                this.dataListFromParent.roleList.push({
                    type:'role',
                    roleId:item.roleId,
                    roleName:item.roleName,
                    tagType:'info'
                })

                this.sortList.push({
                    type:'role',
                    sid:item.roleId,
                    name:item.roleName,
                    tagType:'info'
                })
            })
            this.selectedUsersToTree.forEach((item)=>{
                this.dataListFromParent.userList.push({
                    type:'user',
                    sid:item.sid,
                    imUserId:item.imUserId,
                    name:item.name,
                    tagType:'danger'
                })
            })
            this.sortList = [ ...this.sortList ,...this.dataListFromParent.userList ]
// debugger
            //初始化排序list
            console.info("this.sortList12",this.sortList)

        },
        watch:{
            "selectedDeptsToTree":{
                handler:function(newVal,oldVal){
                    this.dataListFromParent.deptList = [...newVal]
                    
                    //处理排序的逻辑
                    // alert('dept')
                    // this.setSortList(newVal,oldVal,'dept')
// debugger
                    //清空所有的部门
                    this.sortList = this.sortList.filter((item)=>{
                        return item.type !== 'dept'
                    })
                    //初始化部门排序列表
                    newVal.forEach((item)=>{
                        this.sortList.push({
                            type:'dept',
                            sid:item.sid,
                            name:item.name,
                            tagType:''
                        })
                    })
                },
                deep:true
            },
            "selectedRolesToTree":{
                handler:function(newVal,oldVal){
                    this.dataListFromParent.roleList = [...newVal]

                    //处理排序的逻辑
                    // alert('role')
                    // this.setSortList(newVal,oldVal,'role')

                    //清空所有的角色
                    this.sortList = this.sortList.filter((item)=>{
                        return item.type !== 'role'
                    })
                    //初始化部门排序列表
                    newVal.forEach((item)=>{
                        this.sortList.push({
                            type:'role',
                            sid:item.roleId,
                            name:item.roleName,
                            tagType:'info'
                        })
                    })

                },
                deep:true
            },
            "selectedUsersToTree":{
                handler:function(newVal,oldVal){
                    this.dataListFromParent.userList = [...newVal]

                    //处理排序的逻辑
                    // alert('user')
                    // this.setSortList(newVal,oldVal,'user')

                    //清空所有的用户
                    this.sortList = this.sortList.filter((item)=>{
                        return item.type !== 'user'
                    })
                    //初始化部门排序列表
                    newVal.forEach((item)=>{
                        this.sortList.push({
                            type:'user',
                            sid:item.sid,
                            name:item.name,
                            tagType:'danger'
                        })
                    })

                },
                deep:true
            },
            // "dataListFromParent.deptList":{//排序显示用
            //     handler:function(newVal,oldVal){
            //         console.info("newVal",newVal)
            //         console.info("oldVal",oldVal)
            //         //处理排序的逻辑
            //         alert('dept')
            //         this.setSortList(newVal,oldVal,'dept')

            //     },
            //     deep:true
            // },
            // "dataListFromParent.roleList":{//排序显示用
            //     handler:function(newVal,oldVal){
            //         //处理排序的逻辑
            //         // alert('role')
            //         this.setSortList(newVal,oldVal,'role')
            //     },
            //     deep:true
            // },
            // "dataListFromParent.userList":{//排序显示用
            //     handler:function(newVal,oldVal){
            //         //处理排序的逻辑
            //         // alert('user')
            //         this.setSortList(newVal,oldVal,'user')
            //     },
            //     deep:true
            // },
        }
    }
</script>
<style scoped lang="scss">
.group_tree{
    .group_tree_buttons{
        position: relative;
        .add_permission{
            padding-left:16px;
        }
    }
    .group_tree_content{
        padding-top:8px;
        .el-tag{
            margin-bottom:8px;
        }
    }
}
</style>