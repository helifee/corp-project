<template>
    <div class="role_table_data">
      <el-table
        ref="table1"
        :data="gridData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style = "{background:'#F2F2F2',color:'#333'}"
        @selection-change="handleSelectionChange"
        @select = "select"
        @select-all = "selectAll"
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="角色名称"
          width="200">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          prop="data"
          label="角色数目"
          width="150">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="角色描述"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([gridData[1], gridData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-button @click="getData()">获取已选择数据2</el-button>
      </div>
    </div>
</template>

<script>
    import config from '@/config/index.js'
    import mockData from '@MockData'

    export default{
        components: {
        },
        data(){
            return {
                multipleSelection: [],//已选角色

                dataToTree:[],
                // selectRoleDialogVisible :true,//选择用户弹出窗
            }
        },
        props:{
            gridData:{
                type:Array,
                default:function(){
                    return []
                }
            },
            selectedRolesToTable:{
                type:Array,
                default:function(){
                    return []
                }
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
          select(selection, row){
            console.info(selection)
            console.info(row)
            row.checked = !row.checked
          },
          selectAll(row){
            console.info(row)

          },
          checked(){//根据传入已选角色，实现选中的效果
            this.$nextTick(function(){
              let that = this
              if(Array.isArray(this.dataToTree) &&this.dataToTree.length>0){
                // console.info("this.dataToTree")
                // console.info(this.dataToTree)
                this.dataToTree.forEach(function(item){
                  console.info(item)
                    that.$refs.table1.toggleRowSelection(that.gridData[item.id],true)

                })
              }
              // this.$refs.table1.doLayout();


            })


            // this.$refs.multipleTable.toggleRowSelection(this.gridData[0],true);
          },
          handleSelectionChange(val) {//选中事件
            console.info(val)
            val = val.filter(function(item){
              return item !== undefined
            })
              this.multipleSelection = val;
              console.info(this.multipleSelection)
              this.$emit('roleFromTableFunc',this.multipleSelection)
          },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            
            getData(){
              this.checked()
                console.info(this.multipleSelection)
            },
            
        },
        beforeMount(){
// this.checked();//每次更新了数据，触发这个函数即可
        },
        mounted(){
          this.dataToTree = [...this.selectedRolesToTable]
          this.checked();
        },
        watch:{
            "selectedRolesToTable":{
                handler:function(newVal,oldVal){
                    // console.info(newVal)
                    // console.info(oldVal)
                    this.dataToTree = [...newVal]
                    console.info(this.dataToTree)
                    this.checked();

                    // let tempArr = []
                    // console.info(newVal)
                    // if(Array.isArray(newVal)){
                    //   newVal = newVal.filter(function(item){
                    //     return item.id
                    //   })
                    // }
                    // console.info(newVal)
                    // tempArr = this.gridData.filter(function(index) {
                    //   return newVal.includes(index.id)
                    // });
                    // console.info(tempArr)
                    // this.toggleSelection(tempArr)

                    // [gridData[1], gridData[2]]

                },
                deep:true
            }
        }
    }
</script>