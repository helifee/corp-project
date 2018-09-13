<template>
  <div class="order right_modal">
    <right-slide-modal :title="pageTitle" :showClose="false" :visible.sync="propsData" class="order_right_model">
      <div slot="operateButtons" class="operate_buttons">
        <ul>
          <li v-for="(item,index) in pageButtons" :key="index">
            <el-button @click="operateFun(index)">{{item}}</el-button>
          </li>
        </ul>
      </div>
        <order-create
            ref="orderCreate"
            :orderInfo="createFormData"
            @closeDialog = "gobackFromCreate">
        </order-create>
    </right-slide-modal>
  </div>
</template>
<script>
JZY.locale.add("orderLocale", require("@Main/crm/crm.locale"));

import orderCreate from "@Main/crm/components/orderCreate.vue";
import {getUserCategory} from '@Main/approve/getData'

export default {
    components: {
        orderCreate
    },
    data() {
        return {
            pageTitle: l("{orderLocale.order.createOrder.title}"),//页头标题
            pageButtons: l("{orderLocale.order.createOrder.buttons}"),//页头右侧的按钮数组
            createFormData: {//新增审批表单的data
                id: "",
                name: ""
            },
            flowTypeData: [],
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        propsData:{//初始化dialog是否显示的变量
            get: function(){
              return this.dialogVisible
            },
            set: function(){
              this.$emit('closeCreateModal',false)
            }
        }
    },
    methods: {
        //右侧弹出页面顶部的功能按钮事件
        operateFun(index) {
            console.info(index)
            switch (index) {
                case 0: //保存事件
                    this.saveDialog();
                    break;
                case 1: //提交事件
                    this.refer();
                    break;
                case 2: //关闭事件
                    this.gobackFromCreate();
                    break;
                default:
                    this.$message("错误");
            }
        },
        //保存审批
        saveDialog() {
            this.$message("保存成功");
            this.$emit("closeCreateModal", ''); //关闭弹出窗
        },
        //提交审批
        refer: function() {
            this.$refs.orderCreate.submitForm();
            // this.$router.push({path:'/order', query:{stage: stage}});
            // 带查询参数，变成/order?stage=stage
            // this.$message("提交成功");
        },
        //关闭1
        gobackFromCreate(str) {
            if (str === 'reflashData') {
                this.$emit("closeCreateModal", str); //关闭弹出窗

            }else if(str ==='noClose'){

            }else{
                this.$emit("closeCreateModal"); 
            }
        },
        //在审批分类页面中直接打开新增审批页面
        openCreatePage: function(obj) {
            this.pageTitle = obj.name;
            this.pageButtons = l("{orderLocale.createOrder.buttons}");

            this.createFormData = Object.assign({}, obj);
            this.$message("成功打开新建审批的表单页面:" + obj.name);
        },

        //获取我的审批分类
        async userCategory(){
            let res = await getUserCategory()
            console.info(res)
            this.flowTypeData = [...this.flowTypeData,...res]
        },
    },
    mounted(){
        this.userCategory()
    },
    watch: {

    },
};
</script>
<style lang="scss">
.order_right_model{//右侧弹出窗
    .el-dialog {
        .el-dialog__header {
            // background: $backgroundColor;
            z-index: 3;
            .operate_buttons {
                position: absolute;
                right: 0;
                top: 8px;
                ul {
                    float: right;
                    li {
                        float: left;
                        list-style: none;
                        margin-right: 16px;
                        .el-button {
                            padding: 6px 18px;
                            border-radius: 0px;
                            margin-top: 4px;
                            font-weight: normal;
                            color: #82848a;
                        }
                    }
                }
            }
        }
    }
}
</style>