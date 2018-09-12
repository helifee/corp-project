<template>
  <div class="flow_manage top_search">
    <!--title-->
    <el-row class="row-bg title" justify="space-between">
      <el-col :span="8" class="text_left">
        {{l('{approveLocale.menu.flowManage}')}}
      </el-col>
      <el-col :span="8">
        <el-tabs v-model="activeName" @tab-click="changeApprvoeType">
          <el-tab-pane v-for="(item,index) of tabsShow" :key="index" :label="l('{approveLocale.tabs_buttons}')[item]" :name=" 'list-' + index "></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="bottom_border"></el-col>
    </el-row>
    <!--查询-->
    <el-row class="search">
      <el-col :span="6" v-for="(item,index) in l('{approveLocale.serchInputLabels}')" :key="index" :id=" 'inputList-' + index ">
        {{item.name}}
        <el-input v-if="index === 0" :placeholder="item.placeholder" v-model="inputSearch[index]" clearable>
        </el-input>
        <el-cascader v-if="index === 1" 
            expand-trigger="hover"
            :placeholder="item.placeholder"
            :options="optionsData"
            v-model="inputSearch[index]"
            @change="serchInputTwoChange">
        </el-cascader>
      </el-col>
      <el-col :span="6">
        {{l('{approveLocale.set.flowManage.serchInputLabels.name}')}}
        <el-input :placeholder="l('{approveLocale.set.flowManage.serchInputLabels.placeholder}')" v-model="inputSearch['input3']" clearable>
        </el-input>
      </el-col>
      <el-col :span="6">
        <div class="buttons">
          <el-button type="primary" @click="search">
            {{l('{approveLocale.serchInputButtons.search}')}}
          </el-button>
          <el-button @click="reset">
            {{l('{approveLocale.serchInputButtons.reset}')}}
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
JZY.locale.add("approveLocale", require("../approve.locale"));
export default {
    components: {},
    data() {
        return {
            activeName: "list-0",//初始化选中的tabs标签
            tabs: "all",//初始化页头的tabs标签
            inputSearch: {//查询表单值
                input1: "",
                input2: [],
                input3: ""
            },
            optionsData:[{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    },{
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }],
        };
    },
    props: {
        tabButtons: {
            type: Array,
            required: true
        }
    },
    computed: {
        tabsShow: function() {
            this.tabs = [...this.tabButtons];
            return this.tabs;
        }
    },
    mounted() {
        console.info(this.tabsShow);
    },
    filters: {
        // formatePercent: function (value) {
        //   return value + "%"
        // }
    },
    methods: {
        //审批类型的过滤切换
        changeApprvoeType(tab, event) {
            console.log(tab, event);
            console.log(tab.index);
            // console.info(tab.$el.getAttribute("id"))//获取tabs的dom属性
            // this.tabType = tab.index;
            this.$emit("changeApprvoeType", tab.index);
        },
        //单据下拉框的选择事件
        serchInputTwoChange(value) {
            console.log(value);
        },
        //搜索
        search() {
            this.$message("搜索");
        },
        //重置
        reset() {
            this.$message("重置");
            console.info(this.$data);
            console.info(this.$options);
            Object.assign(this.$data, this.$options.data());
        }
    },
    watch: {}
};
</script>
<style scoped lang="scss">
@import "../approveGlobalVar.scss"; //引入任务项目的css变量
.flow_manage.top_search {
    .search {
        .el-cascader{
            width: 60%;
            .el-input {
                width: 100%;
            }

        }
    }
}
</style>