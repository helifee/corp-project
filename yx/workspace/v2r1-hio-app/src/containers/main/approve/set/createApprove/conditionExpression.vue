<template>
    <div class="conditon_expression approve_warp">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="rule_form">
            <el-form-item v-if="ruleForm.fromName !='' " :label="l('{approveLocale.set.flowDesign.createApproveType.step_3.conditionExpression.form.fromName}')">
              <el-input v-model="ruleForm.fromName" :placeholder="l('{approveLocale.set.flowDesign.createApproveType.step_3.conditionExpression.form.fromName}')"
               :readonly="nameIsEdit"></el-input>
            </el-form-item>
            <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_3.conditionExpression.form.name}')" prop="name">
              <el-input v-model="ruleForm.name" :placeholder="l('{approveLocale.set.flowDesign.createApproveType.step_3.conditionExpression.form.namePlaceholder}')"></el-input>
            </el-form-item>
            <el-form-item label="符合以下条件">
              <el-row :gutter="0">
                <el-col :span="12">
                  <el-select v-model="ruleForm.condition">
                    <el-option v-for="(item,index) in term" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-col>
                <!-- <el-col :span="12" style="text-align:right">
                  <el-button @click="addLine" class="btn_add" >添加条件</el-button>

                </el-col> -->
              </el-row>
              
            </el-form-item>
            <!-- 条件 -->
            <el-form-item v-for="(items,index) in ruleForm.selectArr" prop="selectArr">
              <el-row :gutter="0">
                <span v-show="false">{{items.condition = ruleForm.condition}}</span>
                <el-form-item  v-show="false">
                    <el-input :value="items.condition = ruleForm.condition"></el-input>
                  </el-form-item>
                <el-col :span="2">
                  <div class="select_var">{{l('{approveLocale.set.flowDesign.createApproveType.step_3.conditionExpression.form.selectVars}')[0]}}</div>
                </el-col>
                <el-col :span="4">
                  <el-form-item
                          :prop="'selectArr.' + index + '.field'"
                          :rules="fieldRules">
                    <el-select v-model="items.field" value-key="code">
                      <el-option v-for="(item,index) in field" :key="index" :label="item.name" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <div class="select_var">{{l('{approveLocale.set.flowDesign.createApproveType.step_3.conditionExpression.form.selectVars}')[1]}}</div>
                </el-col>
                <el-col :span="4">
                  <el-form-item
                          :prop="'selectArr.' + index + '.operator'"
                          :rules="operatorRules">
                    <el-select v-model="items.operator">
                      <el-option v-for="(item,index) in operator" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <div class="select_var">{{l('{approveLocale.set.flowDesign.createApproveType.step_3.conditionExpression.form.selectVars}')[2]}}</div>
                </el-col>
                <el-col :span="5">
                  <el-form-item
                          :prop="'selectArr.' + index + '.shreshold'"
                          :rules="shresholdRules">
                    <el-input v-model="items.shreshold"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1">
                  <span @click="addSelectVar(items,index)" class="icon_condition"><i class="el-icon-success"></i></span>
                  <span @click="delSelectVar(items,index)" class="icon_condition"><i class="el-icon-close"></i></span>
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 公式 -->
            <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_3.conditionExpression.form.formula}')" prop="conditionName">
              <!-- <el-input type="textarea" :rows="5" v-model="ruleForm.conditionName" readonly></el-input> -->
              <expressText v-model="ruleForm.conditionName" :data.sync='ruleForm.selectArr' @blur.native="conditionNameFn" 
              @click.native="conditionNameFn" :type.sync="expressType1"
              ></expressText>
              <div v-show="false">
                <expressText v-model="ruleForm.conditionFormula" :data.sync='ruleForm.selectArr' @blur.native="conditionNameFn" 
                @click.native="conditionNameFn" :type.sync="expressType0"
              ></expressText>
              <expressText v-model="ruleForm.conditionNameNew" :data.sync='ruleForm.selectArr' @blur.native="conditionNameFn" 
                @click.native="conditionNameFn" :type.sync="expressType3"
              ></expressText>
              <expressText v-model="ruleForm.conditionFormulaNew" :data.sync='ruleForm.selectArr' @blur.native="conditionNameFn" 
                @click.native="conditionNameFn" :type.sync="expressType4"
              ></expressText>
              </div>
              
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    JZY.locale.add('approveLocale',require('../../approve.locale'))
    import config from '@/config/index.js'
    import flService from '@/containers/main/flowClient/flow_service.js'
    import expressText from './expressTextArea.vue'
    import mockData from '@MockData'

    export default{
        components: {
          expressText
        },
        props:["flcondition","flowTemplateId","dialogVisible"],
        data(){
            let validationFormula = (rule, value, callback) => {
                if (!value) {
                  return callback(new Error('公式不能为空,请先填写公式'));
                }
                let myThis = this;
                setTimeout(() => {
                    var reg = /\[(.+?)\]/g;
                    var matchArr = value.match(reg);
                    if(!matchArr){
                        callback(new Error("公式出错了！！！"))
                    }
                    flService.validateFormula(value).then(function(data){
                      if(data[0] === true){
                        callback();
                      }else{
                        callback(new Error("公式验证出错了！！！"))
                      }
                      
                    });
                }, 1000);
              };
            let fieldValidator  = (rule, value, callback) => {
                if(value.code){
                  callback()
                }else{
                  callback(new Error('请选择字段'))
                }
            }
         
            return {
              expressType1:1,
              expressType0:0,
              expressType3:3,
              expressType4:4,
              term:[
                {
                 value : "and",
                 name : '全部' 
                },
                {
                 value : "or",
                 name : '任何' 
                }
              ],

              nameIsEdit:false,
              field:[],
              // operator:['=','>','>=','<','<=','!=',' like ',' in ',' not in '],
              operator:{
                '=' : '=',
                '>' : '>',
                '>=' : '>=',
                '<' : '<',
                '<=' : '<=',
                '!=' : '!=',
                ' like ' : '包含'
              },
              ruleForm: {
                condition:'and',
                fromName:'',
                name: '',
                selectArr:[{
                  field:'',//字段
                  operator:'',//运算符
                  shreshold:'',//阈值
                }],
                conditionName: '',
                conditionFormula:'',
                conditionNameNew: '',
                conditionFormulaNew:'',
              },
              rules: {
                name: [
                  { required: true, message: '请输入公式名称', trigger: 'blur' },
                  { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
                ],
                conditionName:[
                  { required:true, message: '请输入公式', trigger: 'blur'},
                  { validator:validationFormula, trigger: 'blur'}
                ]
              },
              operatorRules:[
                {
                  required: true, message: '运算符不能为空', trigger: 'blur' 
                }
              ],
              shresholdRules:[
                
                  { required: true, message: '阈值不能为空', trigger: 'blur' },
                
              ],
              fieldRules:[
                { validator: fieldValidator,trigger:['blur','change'] },
              ]
            }
        },
        methods:{
          conditionNameFn(){
            this.$refs.ruleForm.validateField('conditionName');
          },
          validatorFn(data){
                let error ;
                if(data && data.length){
                    data.forEach( (row,index) => {
                        error || (row.field)  || (error="请选择字段");
                        error || (row.operator ) || (error="请选择运算符");   
                        error || ( row.shreshold ) || (error="请填写阈值"); 
                        return error;
                    })         
                }
                return error;
            },
          addLine(){
            // let error = this.validatorFn(this.ruleForm.selectArr);
            // if(error){
            //   this.$message(error);
            //   return;
            // }
            this.ruleForm.selectArr.push({
                    field:'',//字段
                    operator:'',//运算符
                    shreshold:'',//阈值
                  })
          },
          getfield(code){
            let res = {}; 
            this.field.forEach((value,index,arr) =>{
              if(code == value.code){
                res = value;
                return res;
              }
            })
            return res;
          },
          //拆分当前表达式
          splitStrFn(str){
            if(!str){
              return;
            }
            let myarray = str.split(")");
            let newArr = [];
            myarray.forEach( (value,index,arr) =>{

              if(!value){
                return;
              }
              let nameRep = value.match(/\[[^\]]+\]/g);
              nameRep = nameRep[0].substring(1,nameRep[0].length-1);
              
              let field = this.getfield(nameRep);

              let valueRep = value.match(/\'[^\']+\'/g);
              valueRep = valueRep[0].replace(/\'/g,'');

              let fiedRep = value.match(/\][^\']+\'/);
              fiedRep = fiedRep[0].substring(1,fiedRep[0].length-1);

              let contion = value.split("(")[0];
              //获取当前字段所有值

              let obj = {
                field : field,
                operator : fiedRep,
                shreshold : valueRep,
                // calculation: contion || "and"
              }
              newArr.push(obj);
            })
            this.ruleForm.selectArr = newArr;
            // console.log(this.ruleForm.selectArr)
          },
          async initExpress(){
            // this.getflowExpression();
            let flowId = this.flowTemplateId;
            let res = await flService.initVariableList(flowId);
            if(res[0].length){
              this.field = res[0];
            }
            this.ruleForm.fromName = this.flcondition.fromName || "";
            this.nameIsEdit = this.flcondition.nameIsEdit;
            
            if(this.nameIsEdit){//为网关节点
                this.ruleForm.name = this.flcondition.name;
            }else{ //为联线
                this.ruleForm.name = this.flcondition.value;
            }
            // this.ruleForm.conditionName = this.flcondition.conditionName;
            
            // this.ruleForm.conditionFormula = this.flcondition.conditionFormula;

            let conditionFormula = this.flcondition.conditionFormula;

            this.ruleForm.selectArr = [{
                condition:'and',
                field:'',//字段
                operator:'',//运算符
                shreshold:'',//阈值
            }];
            this.splitStrFn(conditionFormula);
            
            this.ruleForm.selectVar = {
                  field:'',//字段
                  operator:'',//运算符
                  shreshold:'',//阈值
                }
          },
          //添加选择变量
          addSelectVar:function(item){
                  
              this.addLine();
          },
          delSelectVar(item,index){
              this.ruleForm.selectArr.splice(index,1);
          },
          filterSelect(){
              let error = this.validatorFn(this.ruleForm.selectArr);
              
              if(error){
                this.$message(error);
                return;
              }
              this.ruleForm.conditionName = "";
              this.ruleForm.conditionFormula  =  "";

              let len = this.ruleForm.selectArr.length;
              
              //遍历
              this.ruleForm.selectArr.forEach( (element, index, array) =>{
                if(element.calculation){
                  //条件放前面
                  let temp = element.operator 
                      + "'" +element.shreshold + "'" 
                      + ")";    
                  if(this.ruleForm.conditionName != ""){
                    this.ruleForm.conditionName += element.calculation;
                    this.ruleForm.conditionFormula += element.calculation;
                  }    
                  let str = "([" + element.field.name + "]" + temp;
                  let valStr = "([" + element.field.code + "]" + temp;

                  this.ruleForm.conditionName += str;
                  this.ruleForm.conditionFormula += valStr;
                } 
              })
          },
          //获取变量
          async getflowExpression(){
            let flowId = this.flowTemplateId;
            let res = await flService.initVariableList(flowId);
            if(res[0].length){
              this.field = res[0];
            }
            // await flService.initVariableList(flowId).then((data) => {
            //   if(data[0].length){
            //     this.field = data[0]
            //   }
            // })
          }
        },
        computed:{
            // fieldObj(){
            //   let resultVal = {};
            //   for(let i = 0; i< this.field.length;i ++){
            //       resultVal[this.field[i].name] = this.field[i].code;
            //   }
              
            //   return resultVal;
            // }
        },
        mounted(){
          this.initExpress();
        },
        watch:{
          // dialogVisible(nVal,oVal){
          //   if(nVal){
          //     this.initExpress();
          //   }
          // }
          
        }
    }
</script>

<style lang="scss">
.conditon_expression.approve_warp{
}
</style>
<style scoped lang="scss">
.conditon_expression.approve_warp{
    // margin-top: 20px;
    .select_var{
      text-align:center;
    }
    .validation{
      margin-top:25px;
    }
}

.el-icon-close,.el-icon-success{color:red;    font-size: 21px; cursor: pointer;}
.el-icon-success{ color:green;}
._text_area{
  height:80px;
  border:1px solid #E1E1E1;
  border-radius: 3px;
  padding:10px ;
      line-height: 20px;
}
</style>