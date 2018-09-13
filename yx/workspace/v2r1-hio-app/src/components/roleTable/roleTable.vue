<template>
    <div class="role_table_dialog">
        <el-dialog
            title="选择角色"
            :visible.sync="propsData"
            width="50%"
            append-to-body
            top="8vh"
            :before-close="selectModal">
            <role-table-data :gridData = "gridData" :selectedRolesToTable = "selectedRolesToTable" @roleFromTableFunc="roleFromTableFunc" ref="childTable"></role-table-data>
            <span slot="footer" class="dialog-footer">
              <el-button @click="selectRoleClose">取 消</el-button>
              <el-button type="primary" @click="selectRoleSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import config from '@/config/index.js'
    import roleTableData from './roleTableData.vue'
    import mockData from '@MockData'

    export default{
        components: {
          roleTableData,
        },
        data(){
            return {
                gridData: [{
                  id:1,
                  name: '角色xx1',
                  data: '1',
                  desc:'销售类角色1',
                  checked:false
                }, {
                  id:2,
                  name: '角色xx2',
                  data: '2',
                  desc:'销售类角色2',
                  checked:false
                }, {
                  id:3,
                  name: '角色xx3',
                  data: '3',
                  desc:'销售类角色3',
                  checked:false
                }, {
                  id:4,
                  name: '角色xx4',
                  data: '4',
                  desc:'销售类角色4',
                  checked:false
                }],
                dialogTableVisible: false,
                multipleSelection: [],//已选角色

                selectedRolesToTable:[],
                // selectRoleDialogVisible :true,//选择用户弹出窗
            }
        },
        props:{
            selectedRoles:{
                type:Array,
                default:function(){
                    return []
                }
            },
            selectRoleDialogVisible:{
                type:Boolean,
                default:false
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
                this.selectedRolesToTable.forEach((item)=>{
                  tempRole += item.name + ' '
                })
                this.$message('您已选择了：'+tempRole)
                this.$emit('closeCreateModal',false)

                this.$emit('getRoleTable',this.selectedRolesToTable)
            },
            //取消选择的角色
            selectRoleClose(){
                console.log("取消并关闭")
                this.$emit('closeCreateModal',false)
            },
            //角色选择弹窗关闭前的事件
            selectModal(done) {
                this.$confirm('确认关闭？').then(_ => {
                    console.info(done)
                    done();
                }).catch(_ => {
                    console.log("关闭")
                });
            },
            //接收从用户tree中返回的已选择用户对象
            roleFromTableFunc:function(arr){
              this.selectedRolesToTable = [...arr]
              console.info(this.selectedRolesToTable)
            },
            
        },
        mounted(){
            this.selectedRolesToTable = [...this.selectedRoles]
        },
        watch:{
            "selectedRoles":{
                handler:function(newVal,oldVal){
                    // console.info(newVal)
                    // console.info(oldVal)
                    // console.info("selectedRolesToTable")
                    this.selectedRolesToTable = [...newVal]
                  this.$nextTick(function(){

                      this.$refs.childTable.checked()
                  })
                },
                deep:true
            }
        }
    }
</script>