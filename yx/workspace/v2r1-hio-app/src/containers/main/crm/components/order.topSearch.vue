<template>
  <div class="order_wrap top_search">
    <!--title-->
    <el-row class="row-bg title" justify="space-between">
      <el-col :span="8" class="text_left" v-if="!showTabTitle">
        {{l('{orderLocale.menu.'+moduleName+'}')}}
      </el-col>
      <el-col :span="8" v-if="!showTabTitle">
        <el-tabs v-model="activeName" @tab-click="changeOrderType">
          <el-tab-pane v-for="(item,index) of tabsShow" :key="index" :label="l('{orderLocale.tabs_buttons}')[item]" :name="item"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8" class="text_right" style="height:40px;">
        <el-dropdown split-button type="primary" style="position: absolute;">
            <span @click="createOrder">
                <i class="el-icon-arrow-right el-icon-plus"></i> {{l('{orderLocale.order.createOrder.buttonName}')}}
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{l('{orderLocale.order.createOrder.download}')}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24" class="bottom_border"></el-col>
    </el-row>
    <!--查询-->
    <!-- <el-row class="search">
        <el-col :span="24">
            <el-row>
              <el-col :span="8" v-for="(item,index) in l('{orderLocale.order.serchInputLabels}')" :key="index" :id=" 'inputList-' + index ">
                <div class="label">{{item.name}}</div>
                <div class="search_content">
                    <el-input :placeholder="item.placeholder" v-model="inputSearch[index].name" clearable></el-input>
                </div>
              </el-col>
            </el-row>
        </el-col>
        <el-col :span="24" style="margin-top:15px;">
            <el-row>
                <el-col :span="8" v-for="(item,index) in l('{orderLocale.order.serchSelectLabels}')" :key="index" :id=" 'selectList-' + index " class="order_select_search">
                    <div class="label">{{item.name}}</div>
                    <div class="search_content" v-if="index == 0">
                        <el-input class="money" v-model="orderMoney[0]"></el-input>
                        <div style="width:10%;float:left;text-align:center;">-</div>
                        <el-input class="money" v-model="orderMoney[1]"></el-input>
                    </div>
                    <div class="search_content" v-if="index == 1">
                        <div class="money">
                            <el-date-picker type="date" placeholder="选择日期" v-model="date[0]" style="width: 100%;"></el-date-picker>
                        </div>
                        <div style="width:10%;float:left;text-align:center;">-</div>
                        <div class="money">
                            <el-date-picker type="date" placeholder="选择日期" v-model="date[0]" style="width: 100%;"></el-date-picker>
                        </div>
                    </div>
                     <el-cascader v-if="index == 1"
                        expand-trigger="hover"
                        :props="flowCategory.props"
                        :placeholder="item.placeholder"
                        :options="flowCategory.data"
                        v-model="inputSearch.flowCategory"
                        @change="flowCategoryChange">
                    </el-cascader> -->
                <!-- </el-col>
                <el-col :span="8">
                    <div class="buttons">
                      <el-button type="primary" @click="search">
                        {{l('{orderLocale.order.serchInputButtons.search}')}}
                      </el-button>
                      <el-button @click="reset">
                        {{l('{orderLocale.order.serchInputButtons.reset}')}}
                      </el-button>
                    </div>
                </el-col> -->
            <!-- </el-row> -->
        <!-- </el-col> -->
    <!-- </el-row> -->
  </div>
</template>
<script>
JZY.locale.add("orderLocale", require("@Main/crm/crm.locale"))
// import {getFlowCategoryChildList} from '@Main/order/getData'

export default {
    components: {},
    data() {
        return {
            activeName: "all",//初始化选中的tabs标签
            inputSearch: [{//查询input值
                name:''
            },{
                name:''
            },{
                name:''
            }],
            orderMoney:['10','20'],
            date:['',''],
        };
    },
    props: {
        moduleName: {
            type: String,
            required: true
        },
        tabButtons: {
            type: Array,
            required: true
        },
        showTabTitle:{
            type:Boolean
        }
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
            // this.flowCategory.data = [...res[0]]
        },
        //单据下拉框的选择事件
        flowCategoryChange(value) {
            console.log(value);
            let flowCategoryId = value[value.length -1]
            this.$message("过滤table中单据类型id为："+flowCategoryId+"的数据")
        },
        //初始化获取数据
        createOrder() {
            this.$emit("openCreateModal", true);
        },
        //审批类型的过滤切换
        changeOrderType(tab, event) {
            console.log(tab, event);
            console.log(tab.index);
            this.$emit("changeOrderType", tab);
        },
        //搜索
        // search() {
        //     this.$emit("changeSearch", this.inputSearch);
            
        //     this.$message("搜索");
        // },
        //重置
        // reset() {
        //     this.$message("重置");
        //     console.info(this.$data);
        //     console.info(this.$options);
        //     Object.assign(this.$data, this.$options.data());
        // }
    },
    mounted() {
        this.getFlowCategory()
    },
    watch: {}
};
</script>
<style lang="scss">
.order_wrap.top_search {
    //tabs标签切换
    .el-tabs__nav-wrap::after {
        height: 0px;
    }
    .el-tabs__header {
        margin-bottom: 0;
    }
}
</style>
<style scoped lang="scss">
.order_wrap.top_search {
    .bottom_border {
        width: 100%;
        height: 1px;
        background-color: #ebeef5;
    }
    .title {
        padding-left: 10px;
        padding-right: 10px;
        .text_left {
            line-height: 32px;
        }
        .text_right {
            text-align: right;
        }
    }
    .search {
        padding-left: 10px;
        padding-right: 10px;
        margin-top: 15px;
        margin-bottom: 20px;
        line-height:40px;
        .label{
            width: 25%;
            float: left;
            font-size: 14px;
            color: #606266;
            overflow:hidden;
        }
        .search_content{
            width: 60%;
            float: left;
            .money {
                width: 45%;
                float: left;
            }
        }
        .buttons {
            text-align: right;
        }
    }
}
</style>