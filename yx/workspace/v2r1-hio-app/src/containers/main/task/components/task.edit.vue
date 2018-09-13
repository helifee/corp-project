<template>
  <div class="task edit">
    <!--页头-->
    <el-row class="operate_buttons">
        <el-col :span="20">
            您打开的任务id是：{{$route.params.id}}
        </el-col>
        <el-col :span="4">
            <el-button  @click="saveTask">{{l('{taskLocale.editTask.buttons.save}')}}</el-button>
            <el-button  @click="goback">{{l('{taskLocale.editTask.buttons.goback}')}}</el-button>
        </el-col>
    </el-row>
    <!--表单项-->
    <div class="detail_content">
        <el-form ref="form" label-position="right" label-width="100px" :model="form" class="task_edit_form">
            <el-row :gutter="0" class="border_all">
                <el-col :span="24">
                    <el-form-item :label="l('{taskLocale.createTask.form.taskName}')">
                        <el-input v-model="form.taskName" class="task_name" :placeholder="l('{taskLocale.createTask.form.placeholder}')"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="l('{taskLocale.createTask.form.ownUserName}')">
                        <i class="el-icon-news" @click = "selectTasker"></i>
                        <el-tag type="success">{{form.ownUserName}}</el-tag>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="l('{taskLocale.createTask.form.startDate}')">
                        <el-date-picker v-model="form.startDate" type="date" placeholder=""></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="l('{taskLocale.createTask.form.lastDate}')">
                        <el-date-picker v-model="form.lastDate" type="date" :placeholder="l('{taskLocale.createTask.form.datePlaceholder}')"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0" class="border_all">
                <el-col :span="24">
                    <el-form-item :label="l('{taskLocale.createTask.form.joinUserName}')">
                        <i class="el-icon-news" @click = "selectTasker"></i>
                        <el-tag
                          v-for="(tag,index) in form.joinUserName"
                          :key="index"
                          closable
                          type="info"
                          :disable-transitions="false"
                          @close="deleteOneUser('joinUserName',tag)">
                          {{tag}}
                        </el-tag>
                    </el-form-item>
                </el-col>
                <el-col :span="24"><div class="line"></div></el-col>
                <el-col :span="24">
                    <el-form-item :label="l('{taskLocale.createTask.form.sharedUserName}')">
                        <i class="el-icon-news" @click = "selectTasker"></i>
                        <el-tag
                          v-for="(tag,index) in form.sharedUserName"
                          :key="index"
                          closable
                          type="info"
                          :disable-transitions="false"
                          @close="deleteOneUser('sharedUserName',tag)">
                          {{tag}}
                        </el-tag>
                    </el-form-item>
                </el-col>
                <el-col :span="24"><div class="line"></div></el-col>
                <el-col :span="24">
                    <el-col :span="12">
                        <el-form-item :label="l('{taskLocale.createTask.form.process}')">
                            <el-row :gutter="0">
                                <el-col :span="16" class="process">
                                    <!-- <el-progress :percentage="form.process"></el-progress> -->
                                    <el-slider v-model="form.process"></el-slider>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" class="region">
                        <el-form-item :label="l('{taskLocale.createTask.form.region}')">
                            <span class="region_icon" :class="regionSelectedClass"><i class="iconfont icon-yuan"></i></span>
                            <el-select v-model="form.region" @change="regionSelected">

                                <el-option v-for="(item,index) in l('{taskLocale.createTask.form.regionSelectOptions}')" :key="index" :label="item.name" :value="item.value">
                                    <div class="region_html" :class="regionClass[index]">
                                        <i class="iconfont icon-yuan"></i>
                                        <em>{{item.name}}</em>
                                    </div>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="24"><div class="line"></div></el-col>
                <el-col :span="24">
                    <el-form-item :label="l('{taskLocale.createTask.form.desc}')">
                        <el-input type="textarea" :rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24"><div class="line"></div></el-col>
                <el-col :span="24" class="warn_date">
                    <el-row :gutter="0">
                        <el-col :span="10">
                            <el-form-item :label="l('{taskLocale.createTask.form.warnDate}')">
                                {{l('{taskLocale.createTask.form.warnDateDesc}')}}
                                <el-select v-model="form.warnDate" :placeholder="l('{taskLocale.createTask.form.datePlaceholder}')" >
                                    <el-option v-for="(item,index) in l('{taskLocale.createTask.form.warnDateSelectOptions}')" :key="index" :label="item.name" :value="item.value">
                                        {{item.name}}
                                    </el-option>
                                </el-select>
                                <el-time-select
                                    v-model="form.timeStep"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:30',
                                    end: '24:00'
                                    }"
                                    placeholder="08:00">
                                </el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item :label="l('{taskLocale.createTask.form.warnDateName}')">
                                <el-checkbox-group v-model="form.warnListSelected">
                                    <el-checkbox v-for="(item,index) in form.warnList" :key="index" :label="item"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="24"><div class="line"></div></el-col>
                <el-col :span="24">
                    <el-form-item :label="l('{taskLocale.createTask.form.file}')" class="file_upload">
                        <pl-upload :filesList="form.fileList3"></pl-upload>
                        <!-- <el-upload
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-change="handleChange"
                          :file-list="form.fileList3">
                            <el-button type="primary"><i class="el-icon-upload"></i> 点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">点击左侧上传按钮上传文件</div>
                        </el-upload> -->
                    </el-form-item>
                </el-col>
                <el-col :span="24"><div class="line"></div></el-col>
                <el-col :span="24" class="relate_project">
                    <el-form-item :label="l('{taskLocale.createTask.form.relateProject}')">
                        <el-select v-model="form.relateProject" :placeholder="l('{taskLocale.createTask.form.relateProjectPlaceholder}')">
                          <el-option  v-for="(item,index) in form.relateProjectList" :key="index" :label="item.name" :value="item.value"
                          ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
  </div>
</template>
<script>
  JZY.locale.add('taskLocale',require('../task.locale'))
  export default {
    components: {
    },
    data() {
      return {
        form: {
          id:'',
          taskName: '',
          ownUserName:'杨帆',
          joinUserName:['杨帆','杨帆2'],
          lastDate: '',
          startDate: '2018-01-20',
          timeStep:'',
          region: 0,
          process: 0,
          desc: 'test',
          sharedUserName: ['王五','赵六'],
          warnDate:"1天",
          warnList:['创建人','负责人','参与人'],
          warnListSelected:[],
          fileList3: [{
              name: 'food.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
              status: 'finished'
            }, {
              name: 'food2.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
              status: 'finished'
            }],
            relateProject:'',
            relateProjectList:[{
                name:'项目一',
                value:'beijing'
            },{
                name:'项目二',
                value:'shanghai'
            },{
                name:'项目三',
                value:'tianjin'
            }]
        },
        regionClass:['default','warning','very_warning'],//紧急程度可选class，正常、紧急、非常紧急
        regionSelectedClass:'default',//紧急程度已选择的标识class
      }
    },
    created(){
        this.initData();
    },
    computed: {

    },
    filters:{
        // formatePercent: function (value) {
        //   return value + "%"
        // }
    },
    methods: {
        //初始化获取数据
        initData(){
            //获取从页面传递过来的参数
            this.form.id = this.$route.params.id;
        },
        //保存任务
        saveTask(){
            this.$message({
                message: '修改成功',
                type: 'success'
            });
            this.goback();
        },
        //返回上级
        goback (){
            this.$router.go(-1);
        },
        //选择任务的负责人
        selectTasker: function () {
            alert('获取组织架构')
        },
        //共享人、参与人的删除事件
        deleteOneUser(nameType,tag) {
            this.form[nameType].splice(this.form[nameType].indexOf(tag), 1);
        },
        //文件上传事件
        handleChange(file, fileList) {
            this.fileList3 = fileList.slice(-3);
        },
        //紧急程度选择事件
        regionSelected(val){
            this.regionSelectedClass = this.regionClass[val];
        }
    },
    watch: {
    }
  }
</script>
<style lang="scss">
@import "../taskGlobalVar.scss"; //引入任务项目的css变量
.task.edit{
    .task_edit_form{
        .el-form-item__label,.el-form-item__content{
            font-size: 15px;
            color: $color;
        }
        .el-date-editor.el-input{
            width: 140px;
        }
        .relate_project .el-select{
            // width: 50%;
        }
        .task_name.el-input{
            width: 80%;
        }
        .ql-toolbar.ql-snow{
            border:none;
            border-bottom:1px solid $borderColor;
            margin-left:-20px;
            margin-right:-20px;
        }
        .ql-container.ql-snow{
            border:none;
            margin-left:-20px;
            margin-right:-20px;
        }
        .region{
            .el-input__inner{
                text-indent:30px;
            }
        }
        .warn_date{
            .el-input{
                width:100px;
                .el-input__inner{
                    text-indent:0px;
                }
            }
        }
    }
}
</style>
<style scoped lang="scss">
@import "../taskGlobalVar.scss"; //引入任务项目的css变量
.task.edit{
    padding: 20px;
    position: relative;
    background: whitesmoke;
    .operate_buttons{
        width: 82.333%;
        position: fixed;
        top: 70px;
        right:0px;
        height:40px;
        line-height:40px;
        background-color:$backgroundColor;
        z-index:10;
    }
    .detail_content{
        margin-top: 30px;
        padding: 20px 30px;
        background-color: #fff;
        border:1px solid $borderColor;
        .task_edit_form{
            .el-form-item{
                margin-top: 12px;
                margin-bottom: 12px;
                .el-tag + .el-tag {
                    margin-left: 10px;
                }
            }
        }
        .border_all{
            padding-left: 20px;
            padding-right: 20px;
            border:1px solid $borderColor;
            border-radius:4px;
            margin-bottom: 20px;
        }
        .line{
            margin-left: -20px;
            margin-right: -20px;
            border-top: 1px solid $borderColor;
        }
        .task_name{
            input{
                border: none;
                border-bottom: 1px solid $borderColor;
                font-size: 18px;
                border-radius: 0px;
                padding-left: 0;
                color: $color;
            }
        }
        .region_icon{
            position:absolute;
            left: 20px;
            top: 1px;
            z-index:2;
            
        }
        .process{
            margin-top: 3px;
        }
        .el-checkbox-group{
            height: 40px
        }
        .file_upload{
            margin-top: 5px;
            label{
                margin-top: 7px;
            }
            .el-upload__tip{
                font-size: 14px;
                color: #999;
                display: inline-block;
                margin-left: 30px;
            }
        }
    }
}
//弹出层，在根dom下
.region_html{
    em{
        margin-left:5px;
        font-style: normal;
    }
}
.default{
    i{
        color:#eee;
    }
}
.warning{
    i{
        color: #ffba38;
    }
}
.very_warning{
    i{
        color: #e60000;
    }
}

</style>