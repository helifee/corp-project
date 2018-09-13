<template>
  <div class="approve top_search">
    <!--查询-->
    <el-row class="search">
      <el-col :span="index !== 2 ? 8 : 4" v-for="(item,index) in l('{approveLocale.serchInputLabels}')" :key="index" :id=" 'inputList-' + index " :style="{'min-width':index !== 2 ? '300px':'150px','max-width':index === 2 ? '220px':'400px'}">
        <span v-if="index > 1 && moduleName =='approve' ">
            <!-- &nbsp; -->
        </span>
        <span v-else>{{item.name}}</span>
        <el-cascader v-if="index === 0"
                     size="small"
            expand-trigger="hover"
            clearable
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

            :title = "inputSearch.betweenDate"

            :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
        <el-tag
            v-if="moduleName !='approve' && index === 2 && inputSearch.createPersonId"
            :placeholder="item.placeholder"
            closable
            :disable-transitions="false"
            @close="deleteUserOnly( inputSearch.createPersonId )">
            {{inputSearch.createPersonName}}
        </el-tag>
        <span v-if="moduleName !='approve' && index === 2" class="el-icon-circle-plus add_permission" @click="showUserTreeOnly = !showUserTreeOnly"></span>

        <div class="buttons" v-if="moduleName =='approve' && index === 2">
          <el-button type="primary" @click="search"
                     size="small">
            {{l('{approveLocale.serchInputButtons.search}')}}
          </el-button>
          <el-button @click="reset"
                     size="small">
            {{l('{approveLocale.serchInputButtons.reset}')}}
          </el-button>
        </div>
      </el-col>
      <el-col :span="4" v-if="projectPermissionValue&& JZY.s.hasMenuPermisson('flow_view','modify')" style="float:right;text-align:right">
        <el-button type="primary" @click="createApprove"
                   size="small">
            <i class="el-icon-arrow-right el-icon-plus"></i>
            {{l('{approveLocale.flowType.buttonName}')}}
        </el-button>
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
            activeName: 'all',//初始化选中的tabs标签
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
        projectPermissionValue:{//是否显示创建按钮
            type: Boolean,
            default:true
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
        // //审批类型的过滤切换
        // changeApprvoeType(tab, event) {
        //     // console.log(tab, event);
        //     // console.log(tab.index);
        //     // console.info(tab.$el.getAttribute("id"))//获取tabs的dom属性
        //     let obj =  JZY.u.deepExtend( {}, {
        //         name: tab.name,
        //         index: tab.index,
        //         flowCategoryId: this.inputSearch.flowCategory[this.inputSearch.flowCategory.length -1],
        //         startDate: this.inputSearch.betweenDate && this.inputSearch.betweenDate.length > 0 ? this.inputSearch.betweenDate[0] : '',
        //         endDate:this.inputSearch.betweenDate && this.inputSearch.betweenDate.length > 0 ? this.inputSearch.betweenDate[1] : '',
        //         createPersonId: this.inputSearch.createPersonId
        //     } )
        //     // console.info(obj)
        //     this.$emit("changeApprvoeType", obj);
        // },
        //搜索
        search() {
            this.inputSearch.flowCategoryCode = this.flowCategoryCode

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
        //接收用户树组件的返回值
        getUserTreeOnly:function(arr){
          this.showUserOnly = [...arr]
          if(arr && arr.length > 0){
            this.inputSearch.createPersonName = arr[0].name
            this.inputSearch.createPersonId = arr[0].sid
          }
        },
        //删除用户tag的事件
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
    }
};
</script>
<style lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.approve.top_search {
    .el-date-editor--datetimerange.el-input__inner{
        width:220px;
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
    }
}
</style>