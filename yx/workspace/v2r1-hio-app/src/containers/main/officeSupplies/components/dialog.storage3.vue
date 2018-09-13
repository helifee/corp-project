<template>
    <div>
        <right-slide-modal
                :title="l('{officeLocale.storage.otherButtons.newStorage}')"
                :visible.sync="propsDialogVisible"
                :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <el-button @click="operateSubmit('form')" size="medium ">提交</el-button>
                    <el-button @click="operateClose('form')" size="medium ">关闭</el-button>
                </ul>
            </div>
            <el-form ref="form" :model="form" :rules="storageRules"  label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <span style="padding-left: 45px;line-height: 48px">{{l('{officeLocale.goods.detail.code}')}}：{{officeInCode}}</span>
                    </el-col>
                    <el-col :span="10">
                        <span>{{l('{officeLocale.goods.detail.member}')}}：{{session.userName}}</span>
                    </el-col>
                </el-row>
                <el-form-item :label="l('{officeLocale.goods.detail.theme}')+':'" prop="theme">
                    <el-input v-model="form.theme"></el-input>
                </el-form-item>
                <el-form-item class="information" style="margin-left: -120px">
                    <span>{{l('{officeLocale.goods.detail.goods}')}}</span>
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
                                :label="l('{officeLocale.goods.detail.name}')"
                                width="120">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag"  @dblclick="dblclickEdit(scope.$index,scope.row.isChoose)">{{ scope.row.name }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.name"></el-input>
                                <i class="el-icon-search" @click="showGoodsPanel(scope.$index)"></i>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="category"
                                :label="l('{officeLocale.goods.detail.theCategory}')"
                                width="150">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag" @dblclick="dblclickEdit(scope.$index)">{{ scope.row.category }}</span>
                                <el-select   v-if="scope.row.editFlag" v-model="scope.row.category">
                                    <el-option label="办公用品" value="shanghai"></el-option>
                                    <el-option label="保洁用品" value="beijing"></el-option>
                                </el-select>
                                <!--<el-cascader-->
                                        <!--:options="options"-->
                                        <!--v-model="selectedOptions"-->
                                        <!--@change="handleChange">-->
                                <!--</el-cascader>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="code"
                                :label="l('{officeLocale.goods.detail.code}')"
                                width="120">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.code }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.code"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="specification"
                                :label="l('{officeLocale.goods.detail.specification}')"
                                width="90">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.specification }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.specification"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="brand"
                                :label="l('{officeLocale.goods.detail.brand}')"
                                width="90">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.brand }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.brand"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="unit"
                                :label="l('{officeLocale.goods.detail.unit}')"
                                width="80">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.unit }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.unit"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="inventory"
                                :label="l('{officeLocale.goods.detail.inventory}')"
                                width="80">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.inventory||'0' }}</span>
                                <span v-else="scope.row.editFlag">0</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="newInventory"
                                :label="l('{officeLocale.goods.detail.newInventory}')"
                                width="150">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.newInventoryIsEdit" @dblclick="dblclickEditInventory(scope.$index)">{{ scope.row.newInventory }}</span>
                                <el-input  v-if="scope.row.newInventoryIsEdit" v-model="scope.row.newInventory" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="120">
                            <template slot-scope="scope">
                                <span class="el-icon-success" v-if="scope.row.editFlag||scope.row.newInventoryIsEdit" @click="saveInformation(scope.$index, scope.row)" style="font-size: 20px;color: #67c23a;margin-right: 12px"></span>
                                <span class="el-icon-circle-close" @click="delInformation(scope.$index, scope.row)" style="font-size: 20px;color: red"></span>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-form-item>
            </el-form>
        </right-slide-modal>
        <dialog-choose-goods @getChooseData="chooseDataDia" :chooseGoodsIds="chooseGoodsIds" :dialogVisible="goodsDialogVisible"  @chooseGoodsHandle="chooseGoods" @closeCreateModal="closeGoodsDialog"></dialog-choose-goods>
    </div>
</template>

<script>
    import dialogChooseGoods from '@Main/officeSupplies/components/dialog.chooseGoods.vue'
    import {mapGetters} from 'vuex'
    import {getOfficeInCode} from '@Main/officeSupplies/getData.js'
    export default{
        components:{
            dialogChooseGoods
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            chooseData:{
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
            },
            ...mapGetters({
                session:'session'
            })
        },
        methods:{
//            关闭
            operateClose (formName){
//                this.$refs[formName].resetFields();
                this.$emit("closeCreateModal");
            },
//            提交
            operateSubmit (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form);
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            showGoodsPanel (index){
                this.goodsDialogVisible = true
//                this.$emit("showGoodsModal",index);
            },


            showGoodsDialog(index){
                //index为当前行的索引

                this.goodsDialogVisible = true;
            },
            closeGoodsDialog(){
                this.goodsDialogVisible = false;
            },

            chooseGoods (goodsData){
                this.chooseGoodsData = goodsData;

                let  that = this;

                const pick = (obj, arr) =>
                    arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});

//                let des = pick(this.form.des, ['brand', 'name', 'code','specification','brand','unit','newInventory'])
//
//                let goodsData2 = pick(goodsData, ['brand', 'name', 'code','specification','brand','unit','newInventory'])

                    goodsData.map(function (item) {
                        let index = that.form.des.length-1;
                        let  obj =   Object.assign(item,{
                            editFlag:false, //true为编辑状态
                            newInventoryIsEdit:true,//库存量是否正在编辑
                            isChoose:true,
                            isSave:false
                        });
                        that.form.des.splice(index,0,obj)
                    });

//                that.form.des = [...Array.from(new Set(that.form.des))];
                this.goodsDialogVisible = false;

            },

//            弹窗中 新增
            addInformation (){
                    this.form.des.push({
                        category: '',
                        name: '',
                        code: '',
                        specification: '',
                        brand: '',
                        unit: '',
                        inventory: '',
                        newInventory: '',
                        editFlag: true,
                        newInventoryIsEdit:true,
                        isChoose:false,
                        isSave:false
                    });
//                }else{
//                    this.$message({
//                        message: '请先保存上一条数据',
//                        type: 'warning'
//                    });
//                }

            },
            saveInformation (index, row){
                if(this.checkedInput(index)){
                    this.$set(this.form.des,index,{
                        ...this.form.des[index],
                        editFlag:false,
                        newInventoryIsEdit:false,
                        isSave:true
                    });
                }


            },
            delInformation (index, row){
                this.form.des.splice(index,1)
            },
            dblclickEdit (index,ischoose){
                console.log(ischoose)
                if(ischoose){
                    this.$message({
                        message: '库中已有商品只有本次入库库存量可以被编辑',
                        type: 'warning'
                    });
                }else{
                    this.$set(this.form.des,index,{
                        ...this.form.des[index],
                        editFlag:true,
                        newInventoryIsEdit:true
                    });
                }

            },
            dblclickEditInventory(index){
                this.$set(this.form.des,index,{
                    ...this.form.des[index],
                    editFlag:false,
                    newInventoryIsEdit:true
                });
            },
            checkedInput (index){
                  let obj =  this.form.des[index];
                  let that = this;
                    const pick = (obj, arr) =>
                    arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});
                    let obj2 = pick(obj, ['brand', 'name', 'code','specification','brand','unit','newInventory'])

                    for(let key in obj2){
                        console.log(obj2[key],key)
                            if(!obj2[key]){
                                that.$message({
                                    message: '请填写完整信息',
                                    type: 'warning'
                                });
                                return false;
                            }

                    }
                    return true;
            },
            chooseDataDia (val){
                this.chooseGoodsIds = [...val];
            },

            async rqOfficeInCode(){
                let res = await getOfficeInCode();
                console.log(res);
                this.officeInCode = res;
            },


        },
        data(){
            return {

                officeInCode:'',

                chooseGoodsData:[],
                chooseGoodsIds:[],
                goodsDialogVisible:false,
                form:{
                    theme:'',
                    des:[{
                        category:'',
                        name:'',
                        code:'',
                        specification:'',
                        brand:'',
                        unit:'',
                        inventory:'',
                        newInventory:'',
                        newInventoryIsEdit:true,//库存量是否正在编辑
                        editFlag:true, //true为编辑状态
                        isChoose:false,//false为不是从库中选择的物品
                        isSave:false//false为未保存数据
                    }],
                },
                storageRules:{
                    theme: [
                        { required: true, message: '请输入入库主题', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
                    ],
                },
                restaurants: [],
                timeout:  null,
            }
        },
        watch : {
            'form': {
                handler: function (val, oldVal) {
//                    console.log(val,oldVal)
                },
                deep: true
            },
            'dialogVisible':{
                handler: function (val, oldVal) {
                    if(val){
                        //获取入库编号
                        this.rqOfficeInCode();
                    }
                },
            }
        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
</style>
