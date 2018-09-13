<!--创建分类-->
<template>
    <div class="creatCategory">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="categoryForm" :model="categoryForm" :rules="categoryRules" label-width="85px" class="categoryForm">
            <el-form-item :label="l('{approveLocale.set.flowDesign.createFlowType.inputName}')" prop="name">
              <el-input v-model="categoryForm.name" :maxlength="51" id="name">{{categoryForm.name}}</el-input>
            </el-form-item>
            <el-form-item :label="l('{approveLocale.set.flowDesign.createFlowType.inputDesc}')">
              <el-input type="textarea" v-model="categoryForm.description" v-textarea-limiter :maxlength="200" :rows="5"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    JZY.locale.add('approveLocale',require('../approve.locale'))
    import config from '@/config/index.js'
    
    import {addCategory} from '@Main/approve/getData'

    export default{
        components: {
        },
        data(){
            return {
                categoryForm: {//分类表单信息
                  sid:'',
                  name: '',
                  description: ''
                },
                categoryRules: {
                  name: [
                    { required: true, message: '请输入分类名称', trigger: 'change' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                    { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                  ],
                }
            }
        },
        computed:{
        },
        props: {
          categoryInfo:{
            tyep:Object,
            default:function(){
              return {}
            }
          }
        },
        methods:{
            //保存表单事件
            saveCategoryForm:function(){
              this.$refs.categoryForm.validate(async (valid) => {
                if (valid) {
                  const params = {
                    ...this.categoryForm,
                    // other: '',
                  }
                  try{
                    const result = await addCategory(params)
                    console.info(result)
                    if (result[0] == 1) {
                      this.$refs.categoryForm.resetFields()//置空表单项
                      this.categoryForm.sid = ''
                      this.$emit('closeDialog','reflashData')//关闭父组件的弹出窗
                      this.$message({
                        type: 'success',
                        message: '新增成功'
                      });
                    }
                  }catch(err){
                    console.log(err)
                  }
                } else {
                  // this.$notify.error({
                  //   title: '错误',
                  //   message: '请检查输入是否正确',
                  //   offset: 100
                  // });
                  return false;
                }
              });
            }
        },
        mounted(){
            this.categoryForm = JZY.u.deepExtend( {},this.categoryForm ,this.categoryInfo )

            console.info("nextTick",this.$nextTick)
            this.$nextTick(function(){//初始化页面之后定位光标
                $('#name').focus();
            });
            
        },
        watch:{
            'categoryInfo':{
                handler:function(newVal,oldVal){

                    this.categoryForm = JZY.u.deepExtend( {},this.categoryForm ,newVal )
                },
                deep:true
            },
        }
    }
</script>

<style lang="scss">
.creatCategory{
    .el-textarea{
      textarea{
        box-shadow:none;
      }
    }
}
</style>
<style scoped lang="scss">
.creatCategory{
    margin-top: 16px;
}
</style>