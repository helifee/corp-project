<template>
    <div class="user_tree_dialog">
        <el-dialog
            size="large"
            title="选择人员"
            :visible.sync="propsData"
            width="50%"
            append-to-body
            top="8vh"
            :close-on-click-modal="false"
            :before-close="selectModal">
            <select-user
              @userFromTreeFunc="userFromTreeFunc"
              :selectedUsersToTree = "dataToTree"
              :filterDataUrl = "filterDataUrl"
              :expand-all="expandAll"
              :enable-checked-multiple = "enableCheckedMultiple"
              :show-inside-outside-tabs="showInsideOutsideTabs"

              >
                <template slot-scope="scope">
                    <slot :row="scope.row">

                    </slot>
                </template>
            </select-user>
            <span slot="footer" class="dialog-footer">
              <el-button @click="selectUserClose">取 消</el-button>
              <el-button type="primary" @click="selectUserSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import config from '@/config/index.js'
    import selectUser from './selectUser.vue'
    import mockData from '@MockData'

    export default{
        components: {
            selectUser
        },
        data(){
            return {
                tempData:[],
                dataToTree:[...this.selectedUsers],
            }
        },
        props:{
            selectedUsers:{
                type:Array,
                default:function(){
                    return []
                }
            },
            filterDataUrl:{
                type:Object,
                default:function(){
                    return {
                        host:'',
                        type:'',
                        url:'',
                        data:{}
                    }
                }
            },
            selectUserDialogVisible:{
                type:Boolean,
                default:false
            },
            enableCheckedMultiple:{
                type:Boolean,
                default:true
            },
            showInsideOutsideTabs:{
                type:Boolean,
                default:true
            },
            expandAll:{//是否加载后自动展开所有级
                type:Boolean,
                default:true
            }
        },
        computed: {
            propsData:{//初始化dialog是否显示的变量
                get: function(){
                  return this.selectUserDialogVisible
                },
                set: function(){
                  this.$emit('closeCreateModal',false)
                }
            }
        },
        methods:{
            //确定选择的人员
            selectUserSure(){
                // console.log("确认并关闭")
                let tempUser = ''//已选人员字符串
                let results = []
                // console.info(this.tempData)
                this.tempData.forEach((item)=>{
                  tempUser += item.name + ' '
                  results.push(item)

                })
                // this.$message('您已选择了：'+tempUser)
                this.$emit('closeCreateModal',false)

                this.$emit('getUserTree',results)
            },
            //取消选择的人员
            selectUserClose(){
                console.log("取消并关闭")
                this.$emit('closeCreateModal',false)
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
            //接收从用户tree中返回的已选择用户对象
            userFromTreeFunc:function(str){
              this.tempData = JSON.parse(str)
              // console.info(this.tempData)
            },
            
        },
        mounted(){
            // console.info(this.dataToTree)
        },
        watch:{
            "selectedUsers":{
                handler:function(newVal,oldVal){
                    // console.info(newVal)
                    // console.info(oldVal)
                    this.dataToTree = [...newVal]
                },
                deep:true
            },
        }
    }
</script>