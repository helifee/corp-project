<template>
    <div class="role_dept_dialog">
        <el-dialog
            title="选择角色部门"
            :visible.sync="propsData"
            width="50%"
            append-to-body
            top="8vh"
            :close-on-click-modal="false"
            :before-close="selectModal">
            <select-role-dept
              @roleDeptFromTreeFunc="roleDeptFromTreeFunc"
              :selectedRoleDeptsToTree="dataToTree">
            </select-role-dept>
            <span slot="footer" class="dialog-footer">
              <el-button @click="selectRoleDeptClose">取 消</el-button>
              <el-button type="primary" @click="selectRoleDeptSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import config from '@/config/index.js'
    import selectRoleDept from './selectRoleDept.vue'
    import mockData from '@MockData'

    export default{
        components: {
          selectRoleDept,
        },
        data(){
            return {
                tempArr: [],//已选角色，已作废
                selectedRoleDeptsFromTree:{},//已选角色+部门对象
                dataToTree:JZY.u.deepExtend({}, this.selectedRoleDepts),
            }
        },
        props:{
            selectedRoleDepts:{//接收父组件中已选中的角色+部门对象
                type:Object,
                default:function(){
                    return {}
                }
            },
            selectRoleDeptDialogVisible:{
                type:Boolean,
                default:false
            },
        },
        computed: {
            propsData:{//初始化dialog是否显示的变量
                get: function(){
                  return this.selectRoleDeptDialogVisible
                },
                set: function(){
                  this.$emit('closeCreateModal',false)
                }
            }
        },
        methods:{
            //确定选择的角色+部门
            selectRoleDeptSure(){
                // console.log("确认并关闭")
                if (Object.keys(this.selectedRoleDeptsFromTree.role).length === 0 || Object.keys(this.selectedRoleDeptsFromTree.dept).length === 0) {
                  this.$message('没有数据，请选择')
                }else{

                    let tempUser = this.selectedRoleDeptsFromTree.role.roleName + " + " + this.selectedRoleDeptsFromTree.dept.name//已选人员字符串

                    this.$emit('getRoleDepts',this.selectedRoleDeptsFromTree)
                    // this.$message('您已选择了：'+tempUser)
                    
                    this.$emit('closeCreateModal',false)
                }
            },
            //人员选择弹窗关闭前的事件
            selectModal(done) {
                done();
                // this.$confirm('确认关闭？').then(_ => {
                //     console.info(done)
                //     done();
                // }).catch(_ => {
                //     console.log("关闭")
                // });
            },
            //取消选择的角色+部门
            selectRoleDeptClose(){
                console.log("取消并关闭")
                this.$emit('closeCreateModal',false)
            },
            //接收从角色部门tree中返回的已选择角色部门对象
            roleDeptFromTreeFunc:function(obj){
              this.selectedRoleDeptsFromTree = JZY.u.deepExtend({}, obj);
              // console.info(this.selectedRoleDeptsFromTree)
            },
        },
        mounted(){
        },
        watch:{
            "selectedRoleDepts":{//监控父组件中已选择的角色数组的变化
                handler:function(newVal,oldVal){
                    this.dataToTree = JZY.u.deepExtend({}, newVal);
                },
                deep:true
            }
        }
    }
</script>