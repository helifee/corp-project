<template>
    <div class="role_table_dialog">
        <el-dialog
            title="选择角色"
            :visible.sync="propsData"
            width="50%"
            append-to-body
            top="8vh"
            :close-on-click-modal="false"
            :before-close="selectModal">
            <select-role  :selectedRoleToTree = "dataToTree" @roleFromTreeFunc="roleFromTreeFunc" :enableCheckedMultiple ="enableCheckedMultiple"></select-role>
            <span slot="footer" class="dialog-footer">
              <el-button @click="selectRoleClose">取 消</el-button>
              <el-button type="primary" @click="selectRoleSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import config from '@/config/index.js'
    import selectRole from './selectRole.vue'
    import mockData from '@MockData'

    export default{
        components: {
          selectRole,
        },
        data(){
            return {
                tempArr: [],//已选角色
                dataToTree:[...this.selectedRoles],
            }
        },
        props:{
            selectedRoles:{//接收父组件中已选中的角色数组
                type:Array,
                default:function(){
                    return []
                }
            },
            selectRoleDialogVisible:{
                type:Boolean,
                default:false
            },
            enableCheckedMultiple:{
                type:Boolean,
                default:true
            },
        },
        computed: {
            propsData:{//初始化dialog是否显示的变量
                get: function(){
                  return this.selectRoleDialogVisible
                },
                set: function(){
                  this.$emit('closeCreateModal',false)
                }
            }
        },
        methods:{
            //确定选择的角色
            selectRoleSure(){
                let tempRole = ''//已选角色字符串
                this.tempArr.forEach((item)=>{
                  tempRole += item.roleName + ' '
                })
                console.info(this.tempArr)
                // this.$message('您已选择了：'+tempRole)
                this.$emit('closeCreateModal',false)
                this.$emit('getRoleTree',this.tempArr)
            },
            //取消选择的角色
            selectRoleClose(){
                console.log("取消并关闭")
                this.$emit('closeCreateModal',false)
            },
            //角色选择弹窗关闭前的事件
            selectModal(done) {
                done();
                // this.$confirm('确认关闭？').then(_ => {
                //     console.info(done)
                //     done();
                // }).catch(_ => {
                //     console.log("关闭")
                // });
            },
            //接收从角色tree中返回的已选择角色对象数组
            roleFromTreeFunc:function(arr){
              this.tempArr = [...arr]
            },
        },
        mounted(){
        },
        watch:{
            "selectedRoles":{//监控父组件中已选择的角色数组的变化
                handler:function(newVal,oldVal){
                    this.dataToTree = [...newVal]
                },
                deep:true
            }
        }
    }
</script>