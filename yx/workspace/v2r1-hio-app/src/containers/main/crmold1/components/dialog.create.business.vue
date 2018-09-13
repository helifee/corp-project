<template>

    <right-slide-modal
            title="创建商机"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateClose()" size="medium ">保存</el-button>
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
            </ul>
        </div>
        <div class="record">
            <el-form :inline="true" :model="form" class="demo-form-inline"  label-width="120px">
                <el-form-item label="商机名称:">
                    <el-input v-model="form.name" placeholder="商机名称"></el-input>
                </el-form-item>
                <el-form-item label="客户名称:" style="margin-left: 150px;">
                    <el-input v-model="form.customerId" placeholder="客户名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人:">
                    <el-input v-model="form.contactId" placeholder="联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系电话:" style="margin-left: 150px;">
                    <el-input v-model="form.phone" placeholder="联系电话"></el-input>
                </el-form-item>
                <el-form-item label="预计成交额:">
                    <el-input v-model="form.estimateAmount" placeholder="预计成交额"></el-input>
                </el-form-item>
                <el-form-item label="预计成交时间:" style="margin-left: 150px;">
                    <el-input v-model="form.estimateDealTime" placeholder="预计成交时间"></el-input>
                </el-form-item>
                <el-form-item label="负责人:">
                    <el-input v-model="form.personInCharge" placeholder="负责人"></el-input>
                </el-form-item>
                <div>
                    {{l('{crmLocale.staticvariable.businessstage}')}}
                </div>
                <el-form-item label="商机阶段" style="margin-left: 150px;">
                    <el-select v-model="form.stage" placeholder="商机阶段">
                        <el-option
                            v-for="item in l('{crmcale.staticvariable.businessstage}')"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="合同" style="margin-left: 50px;">
                    <pl-upload></pl-upload>
                    <p>可以上传多个附件</p>
                </el-form-item>
                <hr>
                <h3>
                </h3>
                <el-form-item class="information" style="margin-left: 0px" prop="des"
                >
                    <span>选择产品</span>
                    <span @click="addInformation" class="el-icon-circle-plus-outline add"></span>
                    <el-table
                            :data="form.des"
                            style="width: 100%;text-align: center;"
                            :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333','padding':'4px 0px'}">
                        <el-table-column
                                type="index">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="产品名称"
                                width="120">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag" >{{ scope.row.name }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.name" @blur="checkName(scope.row.name)"></el-input>
                                <i class="el-icon-search" @click="showGoodsPanel" v-if="scope.$index == form.des.length-1"></i>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="category"
                                label="单位"
                                width="150">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.category }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.houseId"></el-input>
                             </template>
                        </el-table-column>
                        <el-table-column
                                prop="code"
                                label="价格"
                                width="120">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.code }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.code"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="specification"
                                label="数量"
                                width="90">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.specification }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.specification"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="brand"
                                label="折扣"
                                width="90">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.brand }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.brand"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="unit"
                                label="总价"
                                width="80">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.unit }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.unit"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="newInventory"
                                label="备注"
                                width="150">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.newInventoryIsEdit"  @dblclick="dblclickEditInventory(scope.$index)">{{ scope.row.newInventory }}</span>
                                <el-input  v-if="scope.row.newInventoryIsEdit" @change="" v-model.number="scope.row.newInventory" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="120">
                            <template slot-scope="scope">
                                <span class="el-icon-success" v-if="scope.row.editFlag||scope.row.newInventoryIsEdit" @click="saveInformation(scope.$index)" style="font-size: 20px;color: #67c23a;margin-right: 12px"></span>
                                <span class="el-icon-circle-close" @click="delInformation(scope.$index, scope.row)" style="font-size: 20px;color: red"></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
        </div>
    </right-slide-modal>

</template>

<script>
    JZY.locale.add("crmLocale", require("@Main/crm/crm.locale"))
//    JZY.locale.add('crmcale',require('@Main/crm/crm.locale'));
    import config from '@/config/index.js'
    export default{
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            recordId:{
                required:false
            }
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            }
        },
        methods:{
//            关闭
            operateClose(){
                this.$emit("closeCreateModal");
            },
           // 弹窗中 新增
            addInformation (){
                this.form.des.push({
                    category: '',
                    name: '',
                    code: '',
                    specification: '',
                    brand: '',
                    unit: '',
                    inventory: 0,
                    newInventory: '',
                    state:'1',
                    editFlag: true,
                    newInventoryIsEdit: true,
                    isSave: false
                });

            },
            showGoodsPanel (){
                this.$emit("showGoodsModal");
            },
            delInformation (index, row){
                this.form.des.splice(index, 1)
            },
            dblclickEditInventory(index){
                this.$set(this.form.des, index, {
                    ...this.form.des[index],
                    editFlag: false,
                    newInventoryIsEdit: true
                });
            },
            saveInformation (index, row){
                if (this.checkedInput(index)) {
                    if (this.form.des[index].sid) {
                        this.$set(this.form.des, index, {
                            ...this.form.des[index],
                            editFlag: false,
                            newInventoryIsEdit: false,
                            isSave: true
                        });
                    } else {
//                        this.rqOfficeIsHave(index);
                    }
                }


            },
            checkedInput (index){
                console.log(this.form, "checkedInput");
                let obj = this.form.des[index];
                console.log(obj, "checkedInput");
                let that = this;
                const pick = (obj, arr) =>
                    arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});
                let obj2 = pick(obj, ['brand', 'name', 'code', 'specification', 'unit', 'newInventory'])
                for (let key in obj2) {
                    console.log(obj2[key], key)
                    if (!obj2[key]) {
                        that.$message({
                            message: '请填写完整信息',
                            type: 'warning'
                        });
                        return false;
                    }

                }
                return true;
            },

        },
        data(){
            return {
                form:{
                    input:'',
                    des:[{
                        sid:'',
                        houseId:'',
                        category:'',
                        name:'',
                        code:'',
                        specification:'',
                        brand:'',
                        unit:'',
                        inventory:0,
                        newInventory:'',
                        state:'1',
                        newInventoryIsEdit:true,//库存量是否正在编辑
                        editFlag:true, //true为编辑状态
                        isSave:false//false为未保存数据
                    }],
                }
            }
        },
        watch : {
        },
        mounted (){
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
    .record{
        line-height: 48px;
        color: #666666;
        span.label{
            display: inline-block;
            width: 120px;
            text-align: right;
            color: #333333;
        }
    }
</style>
