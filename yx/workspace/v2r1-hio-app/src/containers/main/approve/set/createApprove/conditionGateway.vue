<template>
    <div class="condition_gateway approve_warp approve_set_bd">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-table ref="cgt"
            :data="contionList"
            :header-cell-style="{'background':'#ececec','color':'#333','font-size':'14px'}"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="target"
              label="流向环节名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="显示名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="conditionName"
              label="条件公式">
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="editCondition(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <!--编辑条件-->
      
      <el-dialog
        v-if="editConditionDialogVisible"
        custom-class='customDialog'
        title="编辑条件"
        :visible.sync="editConditionDialogVisible"
        width="50%"
        :append-to-body="true">
        <condition-expression 
        :flcondition = "fromData"
        :flowTemplateId="flId"
        v-if="editConditionDialogVisible"
        :dialogVisible="editConditionDialogVisible"
         ref="fcExpression"></condition-expression>
        <span slot="footer" class="dialog-footer">
          <el-button @click="conditionClose">取 消</el-button>
          <el-button type="primary" @click="conditionSure">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    JZY.locale.add('approveLocale',require('../../approve.locale'))
    import conditionExpression from '@Main/approve/set/createApprove/conditionExpression.vue'
    import config from '@/config/index.js'
    import mockData from '@MockData'

    export default{
        components: {
          conditionExpression,
        },
        props:["conditionGateway","flowTemplateId","dialogVisible"],
        data(){
            return {
              flId:this.flowTemplateId,
              editConditionDialogVisible:false,//编辑条件弹出窗
              fromData:{},
              oldEdge:{},
              contionList:[]
            }
        },
        methods:{
          //编辑条件
            editCondition:function(obj){
              this.fromData = {};
              this.fromData.fromName = obj.target;
              $.extend(this.fromData,obj);
              this.editConditionDialogVisible = true;
            },
            //确定条件编辑
            conditionSure(){
              let myThis = this;
              this.$refs['fcExpression'].$refs['ruleForm'].validate((valid) => {
                if (valid) {
                  myThis.editConditionDialogVisible = false;
                  let data = myThis.$refs.fcExpression.ruleForm;

                  myThis.fromData.name = data.name;

                  myThis.fromData.conditionFormula = data.conditionFormula;
                  myThis.fromData.conditionName = data.conditionName;

                  myThis.fromData.conditionNameNew = data.conditionNameNew;  
                  myThis.fromData.conditionFormulaNew = data.conditionFormulaNew;
                  
                  let index = myThis.contionList.findIndex((value, index, arr) => {
                    return myThis.fromData.nodeId == value.nodeId
                  });
                  if(index > -1){
                    this.$set(this.contionList,index,myThis.fromData);
                  }

                }
              })
                
            },
            //取消条件编辑
            conditionClose(){
                this.editConditionDialogVisible = false;
            },
            initList(){
              this.fromData = {};
              let cell = this.conditionGateway;
              let edges = cell.edges;
              let forkLines = [];
              let my = this;
              if(edges){
                $.each(edges,function (i,edge) {
                  if(edge.source.id ===cell.id){
                      let forkLine = {};
                      forkLine.nodeId = edge.id;
                      forkLine.target = edge.target.value;  //流向环节名称
                      forkLine.name = edge.value;   //显示名称 边线

                      forkLine.conditionFormula = edge.conditionFormula;  //选择变量
                      forkLine.conditionName = edge.conditionName;//条件公式

                      forkLine.conditionNameNew = edge.conditionNameNew;  //选择变量
                      forkLine.conditionFormulaNew = edge.conditionFormulaNew;//条件公式

                      forkLine.nameIsEdit = true;
                      forkLines.push(forkLine);
                  }
                });
              }
              this.contionList = forkLines;
            }
        },
        watch:{
          dialogVisible(nVal,oVal){
            if(nVal){
              this.initList();
            }
          }
        },
        mounted(){
          this.initList();
        },
    }
</script>

<style lang="scss">
.customDialog{
      height:75%;
    }
.customDialog .el-dialog__body{
      height: calc(83% - 50px - 32px - 48px);
    }
</style>
<style scoped lang="scss">

.condition_gateway.approve_warp{
    margin-top: 20px;
}

</style>