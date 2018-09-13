<template>
    <div class="dept_tree_dialog">
        <el-dialog
            title="选择部门"
            :visible.sync="propsData"
            width="50%"
            append-to-body
            top="8vh"
            :close-on-click-modal="false"
            :before-close="selectModal">
            <select-dept
              @deptFromTreeFunc="deptFromTreeFunc"
              :selectedDeptsToTree = "dataToTree"
              :enable-checked-multiple = "enableCheckedMultiple"
              >
            </select-dept>
            <span slot="footer" class="dialog-footer">
              <el-button @click="selectDeptClose">取 消</el-button>
              <el-button type="primary" @click="selectDeptSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import config from '@/config/index.js'
    import selectDept from './selectDept.vue'
    import mockData from '@MockData'

    export default{
        components: {
            selectDept
        },
        data(){
            return {
                tempData:[],
                dataToTree:[...this.selectedDepts],
            }
        },
        props:{
            selectedDepts:{
                type:Array,
                default:function(){
                    return []
                }
            },
            selectDeptDialogVisible:{
                type:Boolean,
                default:false
            },
            enableCheckedMultiple:{
                type:Boolean,
                default:true
            }
        },
        computed: {
            propsData:{//初始化dialog是否显示的变量
                get: function(){
                  return this.selectDeptDialogVisible
                },
                set: function(){
                  this.$emit('closeCreateModal',false)
                }
            }
        },
        methods:{
            //确定选择的人员
            selectDeptSure(){
                // console.log("确认并关闭")
                let tempDept = ''//已选人员字符串
                let results = []
                // console.info(this.tempData)
                this.tempData.forEach((item)=>{
                  tempDept += item.name + ' '
                  results.push(item)

                })
                // this.$message('您已选择了：'+tempDept)
                this.$emit('closeCreateModal',false)

                this.$emit('getDeptTree',results)
            },
            //取消选择的人员
            selectDeptClose(){
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
            deptFromTreeFunc:function(str){
              this.tempData = JSON.parse(str)
              // console.info(this.tempData)
            },
            
        },
        mounted(){
            // console.info(this.dataToTree)
        },
        watch:{
            "selectedDepts":{
                handler:function(newVal,oldVal){
                    // console.info(newVal)
                    // console.info(oldVal)
                    this.dataToTree = [...newVal]
                },
                deep:true
            }
        }
    }
</script>