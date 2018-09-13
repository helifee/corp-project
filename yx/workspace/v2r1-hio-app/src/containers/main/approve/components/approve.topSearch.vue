<template>
  <div class="approve top_search">
    <!--title-->
    <el-row class="row-bg title" justify="space-between">
      <el-col :span="3" class="text_left">
        {{l('{approveLocale.menu.'+moduleName+'}')}}
      </el-col>
      <el-col :span="moduleName =='my' ? 13 : 13" :offset="moduleName =='my' ? 0 : 0">
        <el-tabs v-model="activeNameData" @tab-click="changeApprvoeType">
          <el-tab-pane v-for="(item,index) of tabsShow" :key="index" :label="l('{approveLocale.tabs_buttons}')[item]" :name="item"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8" class="text_right" v-if="moduleName !=='flowManage'">
        <el-checkbox v-if="moduleName == 'shared'" v-model="isRead">含已阅</el-checkbox>
        <el-button type="primary" size="small" @click="createApprove">
          <i class="el-icon-arrow-right el-icon-plus"></i>
          {{l('{approveLocale.flowType.buttonName}')}}
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="bottom_border"></el-col>
    </el-row>
    <!--查询-->
    <el-row class="search">
      <el-col :span="index !== 2 ? 7 : 6" v-for="(item,index) in l('{approveLocale.serchInputLabels}')" :key="index" :id=" 'inputList-' + index " :style="{'min-width':index !== 2 ? '255px':'0px','max-width':index === 2 && moduleName =='approve' ? '0px':'400px'}">
        <span v-if="index > 1 && moduleName =='approve' ">
            &nbsp;
        </span>
        <span v-else>{{item.name}}</span>
        <el-cascader v-if="index === 0"
            expand-trigger="hover"
            clearable
            size="small" 
            :props="flowCategory.props"
            :placeholder="item.placeholder"
            :options="flowCategory.data"
            v-model="inputSearch.flowCategory"

            :title="flowCategoryTitle"

            @change="flowCategoryChange">
        </el-cascader>
        <el-date-picker
            v-if="index === 1" 
            size="small" 
            v-model="inputSearch.betweenDate"
            type="datetimerange"
            :range-separator="item.betweenTo"
            :start-placeholder="item.startDate"
            :end-placeholder="item.lastDate"
            format = "yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"

            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :title = "inputSearch.betweenDate"

            :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>

        <!--发起人树组件的使用-->
        <blend-tree
          ref = "createPersonTree"
          v-if="moduleName !='approve' && index === 2"
          :enable-checked-multiple="enableCheckedMultipleForCreatePerson"
          :tagButtons="tagButtonsForCreatePerson"
          :activeTab = "activeTabForCreatePerson"
          :workStatus = "workStatusForCreatePerson"
          :selectedDataToTree = "selectedForCreatePerson"
          @getDataFromTree = "getDataFromTreeForCreatePerson">
          <!--添加按钮图标的插槽-->
          <div slot="add_button">
            <i class="el-icon-circle-plus" @click.stop = "$refs.createPersonTree[0].blendTreeDialogShow()"></i>
          </div>
        </blend-tree>

        <!-- <el-tag
            v-if="moduleName !='approve' && index === 2 && inputSearch.createPersonId"
            :placeholder="item.placeholder"
            closable
            :disable-transitions="false"
            @close="deleteUserOnly( inputSearch.createPersonId )">
            {{inputSearch.createPersonName}}
        </el-tag>
        <span v-if="moduleName !='approve' && index === 2" class="el-icon-circle-plus add_permission" @click="showUserTreeOnly = !showUserTreeOnly"></span> -->


      </el-col>
      <el-col :span="4" style="min-width:150px;float:right;">
        <div class="buttons">
          <el-button type="primary" size="small" @click="search">
            {{l('{approveLocale.serchInputButtons.search}')}}
          </el-button>
          <el-button size="small" @click="reset">
            {{l('{approveLocale.serchInputButtons.reset}')}}
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!--发起人组件-->
    <user-tree
        :selectUserDialogVisible="showUserTreeOnly"
        :enable-checked-multiple="false"
        :show-inside-outside-tabs="false"
        :selectedUsers = "showUserOnly"
        @closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"
        @getUserTree = "getUserTreeOnly">
    </user-tree>
  </div>
</template>
<script>
    JZY.locale.add("approveLocale", require("../approve.locale"))
    import { getUserCategory } from '@Main/approve/getData'

export default {
    components: {},
    data() {
        return {
            activeNameData: this.activeTab.name,//初始化选中的tabs标签
            tabs: '',//初始化页头的tabs标签
            inputSearch: {//查询表单值
                flowCategory: [], //流程类型
                betweenDate: '', //发起时间
                createPersonName: '',//发起人，单选
                createPersonId: ''//发起人，单选
            },
            flowCategory:{//流程类型
                data: [],
                props: {
                  value: 'sid',
                  label: 'name',
                  children: 'childList'
                }
            },
            flowCategoryTitle:'',//hover事件title显示
            flowCategoryCode:'',//流程类型的code
            /*1棵树*/
            showUserTreeOnly:false,
            showUserOnly:[],//已选发起人

            isRead:false,//是否包含已阅，false不包含
            isReadNum:1,//是否包含已阅，1是未读  2是已读  0 全部
            tabName:'',//已选择的tab
            tabIndex:'',//已选择的tab


            selectedForCreatePerson:{//已选树节点
                userList:[]
            },
            selectedForCreatePersonCoyp:{//混合树输出已选的参与人，缓存用
              userList:[]
            },
            workStatusForCreatePerson:7,//人员状态，默认值是1，0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;7、在职、离职 （包含删除人员）
            enableCheckedMultipleForCreatePerson:false,//人员树是否可以多选
            tagButtonsForCreatePerson:['user'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
            activeTabForCreatePerson:'user',//初始化激活的tab标签

        };
    },
    props: {
        moduleName: {//当前调用的模块名称
            type: String,
            required: true
        },
        tabButtons: {
            type: Array,
            required: true
        },
        activeTab: {//默认选中的tab
            type: Object,
            default: function(){
                return {
                    name:'all',
                    index:0
                }
            }
        },
        
        
    },
    computed: {
        tabsShow: function() {
            this.tabs = [...this.tabButtons];
            return this.tabs;
        }
    },
    filters: {
        // formatePercent: function (value) {
        //   return value + "%"
        // }
    },
    methods: {
        //获取单据类型列表
        async getFlowCategory(){
            // let res = await getFlowCategoryChildList()
            let res = await getUserCategory()
            console.info(res[0])
            this.flowCategory.data = [...res[0]]
            console.info(this.flowCategory)
        },
        //单据下拉框的选择事件
        flowCategoryChange(value) {
            console.log(value);
            // let flowCategoryId = value[value.length -1]
            
            //由sid改成code，返回给后端
            this.flowCategory.data.forEach((item)=>{
                if (item.sid ==  this.inputSearch.flowCategory[0]) {
                    let objTemp = item.childList.filter((subItem) => {
                        return subItem.sid == this.inputSearch.flowCategory[1];
                    });
                    this.flowCategoryCode = objTemp.length && objTemp[0].code


                    this.flowCategoryTitle = item.name + '/' +objTemp[0].name
                }
            })
            // this.$message("过滤table中单据类型id为："+flowCategoryId+"的数据")
        },
        //初始化获取数据
        createApprove() {
            this.$emit("openCreateModal", true);
        },
        //审批类型的过滤切换
        changeApprvoeType( tab = {} ) {
            // console.log(tab, event);
            // console.log(tab.index);
            // console.info(tab.$el.getAttribute("id"))//获取tabs的dom属性
            if (Object.keys(tab).length !== 0) {
                this.tabName = tab.name
                this.tabIndex = tab.index
            }
            
            let obj =  JZY.u.deepExtend( {}, {
                name: this.tabName,
                index: this.tabIndex,
                flowCategoryId: this.flowCategoryCode,
                startDate: this.inputSearch.betweenDate && this.inputSearch.betweenDate.length > 0 ? this.inputSearch.betweenDate[0] : '',
                endDate:this.inputSearch.betweenDate && this.inputSearch.betweenDate.length > 0 ? this.inputSearch.betweenDate[1] : '',
                createPersonId: this.inputSearch.createPersonId,
                isRead:this.isReadNum
            } )
            // console.info(obj)
            this.$emit("changeApprvoeType", obj);
        },
        //搜索
        search() {

            this.inputSearch.flowCategoryCode = this.flowCategoryCode

            console.info("this.inputSearch",this.inputSearch)
            this.$emit("changeSearch", this.inputSearch);
            
            // this.$message("搜索");
        },
        //重置
        reset() {
            // this.$message("重置");
            this.inputSearch.flowCategory = []
            this.inputSearch.betweenDate = ''
            this.inputSearch.createPersonName = ''
            this.inputSearch.createPersonId = ''
            this.showUserOnly = []
            this.flowCategoryCode = ''

            this.search()
            // console.info(this.$data);
            // console.info(this.$options);
            // Object.assign(this.$data, this.$options.data());
        },

        //参与人，接收混合树组件的返回值
        getDataFromTreeForCreatePerson( obj = {} ){
          console.info(obj)
          console.info(JSON.stringify(obj))
          this.selectedForCreatePersonCoyp = JZY.u.deepExtend( {}, obj )
          
          if(obj.userList.length > 0){
            this.inputSearch.createPersonName = obj.userList[0].name
            this.inputSearch.createPersonId = obj.userList[0].sid
          }else{
            this.inputSearch.createPersonName = ''
            this.inputSearch.createPersonId = ''

          }

        },

        //接收用户树组件的返回值-作废
        getUserTreeOnly:function(arr){
          this.showUserOnly = [...arr]
          if(arr && arr.length > 0){
            this.inputSearch.createPersonName = arr[0].name
            this.inputSearch.createPersonId = arr[0].sid
          }
        },
        //删除用户tag的事件-作废
        deleteUserOnly(sid) {
            this.showUserOnly = this.showUserOnly.filter(function(item) {
              return item.sid != sid;
            });

            this.inputSearch.createPersonName = ''
            this.inputSearch.createPersonId = ''
        },
    },
    mounted() {
        this.getFlowCategory()
    },
    watch: {
        'activeTab':{//默认选中的tab
    　　　　handler(newValue, oldValue) {
                this.activeNameData = newValue.name
                //更新数据
                this.changeApprvoeType( newValue )
    　　　　},
    　　　　deep: true
    　　},
        'inputSearch.flowCategory':{
    　　　　handler(newValue, oldValue) {
                console.info("newValue")
                console.info(newValue)
                if(newValue.length === 0){
                    this.flowCategoryTitle = ''
                    this.flowCategoryCode = ''
                }
    　　　　},
    　　　　deep: true
    　　},
        //监控已阅开关
        isRead(newVal,oldVal){
            if (newVal ===true ) {//ture，包含已阅
                this.isReadNum = 0
            }else{//false，只加载未读
                this.isReadNum = 1
            }
            this.changeApprvoeType()

            
        },
    }
};
</script>
<style lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.top_search {
    .el-date-editor--datetimerange.el-input__inner{
        width:calc(100% - 100px)
    }
}
</style>
<style scoped lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.top_search {
    .search{
        line-height: 40px;
        .add_permission{
          // color: #67C23A;
          // margin-left:5px;
          // font-size:18px;
          &:hover{
            cursor:pointer;
          }
        }
        .blend_tree_wrap{
            display: inline-block;
        }
    }
}
</style>