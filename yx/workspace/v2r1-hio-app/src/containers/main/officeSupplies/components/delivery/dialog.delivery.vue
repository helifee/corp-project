<template>
    <div class="right-modal ">
        <right-slide-modal
                class="office-delivery-diawrap"
                title="新建出库"
                @open="initData"
                :visible.sync="propsDialogVisible"
                :showClose="false">
            <div slot="title">

                <span class="el-dialog__title">
                            <span class="note"></span>
                            新建出库
                        </span>
                <el-tooltip content="每天出库单数量上限为9999，多于9999不能进行出库操作" placement="right" effect="light">
                    <i class="el-icon-question" style="color: #4989ee;cursor: pointer"></i>
                </el-tooltip>
            </div>
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button @click="operateSubmit('form')" size="medium ">提交</el-button></li>
                    <li><el-button @click="operateClose('form')" size="medium ">关闭</el-button></li>
                </ul>
            </div>
            <el-form ref="form" :model="form" :rules="storageRules"  label-width="96px">
                <el-row :gutter="20">
                    <el-col :span="10">
                        <span style="padding-left: 10px;line-height: 48px">出库单编号：&nbsp;&nbsp;&nbsp;{{officeOutCode}}</span>
                    </el-col>
                    <el-col :span="10">
                        <span style="line-height: 48px">出库人：{{session.name}}</span>
                    </el-col>
                </el-row>
                <el-form-item label="出库主题：" prop="theme">
                    <el-input v-model="form.theme" :maxlength="51"></el-input>
                </el-form-item>
                <el-form-item label="领用人：" prop="person">
                    <!--<el-tag-->
                            <!--v-if="this.form.person.length"-->
                            <!--closable-->
                            <!--@close="removePerson"-->
                            <!--:disable-transitions="false">-->
                        <!--{{this.form.person[0].name}}-->
                    <!--</el-tag>-->
                    <!--<el-input v-model="form.person"></el-input>-->
                    <!--<span class="el-icon-circle-plus add_approver" @click="showUserTree = !showUserTree">添加领用人</span>-->

                    <blend-tree
                            ref= "groupTree"
                            :enable-checked-multiple = "false"
                            :tagButtons="['user']"
                            activeTab = "user"
                            :selectedDataToTree = "selectedDataToTree"
                            @getDataFromTree = "getDataFromTree">
                        <!--添加按钮图标的插槽-->
                        <div slot="add_button">
                            <i class="el-icon-circle-plus" @click.stop = "$refs.groupTree.blendTreeDialogShow()"></i>
                        </div>
                    </blend-tree>


                </el-form-item>
                <el-form-item class="information" style="margin-left: -96px" prop="des"
                >
                    <span>出库物品</span>
                    <el-tooltip content="物品出库时只能选择库中已有物品进行出库操作" placement="right" effect="light">
                        <i class="el-icon-question icon-question" style="color: #4989ee"></i>
                    </el-tooltip>
                    <span @click="showGoodsPanel" class="el-icon-circle-plus-outline add"></span>
                    <el-table
                            :data="form.des"
                            style="text-align: center;width: 100%"
                            :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333','padding':'4px 0px'}">
                        <el-table-column
                                label="序号">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                :label="l('{officeLocale.goods.detail.name}')"
                                width="120"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag" >{{ scope.row.name }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.name" @blur="checkName(scope.row.name)"></el-input>
                                <!--<i class="el-icon-search" @click="showGoodsPanel" v-if="scope.$index == form.des.length-1"></i>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="category"
                                :label="l('{officeLocale.goods.detail.theCategory}')"
                                width="150"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.category }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="code"
                                label="编号"
                                width="120"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.code }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.code"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="specification"
                                label="规格"
                                width="90"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.specification }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.specification"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="brand"
                                :label="l('{officeLocale.goods.detail.brand}')"
                                width="90"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.brand }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.brand"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="unit"
                                :label="l('{officeLocale.goods.detail.unit}')"
                                width="80"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.unit }}</span>
                                <el-input  v-if="scope.row.editFlag" v-model="scope.row.unit"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="inventory"
                                :label="l('{officeLocale.goods.detail.inventory}')"
                                width="80"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.inventory||'0' }}</span>
                                <span v-else="scope.row.editFlag">0</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="newInventory"
                                label="本次出库量"
                                width="100"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.newInventoryIsEdit" @dblclick="dblclickEditInventory(scope.$index)">{{ scope.row.newInventory }}</span>
                                <el-form-item
                                        v-if="scope.row.newInventoryIsEdit"
                                        :prop="'des.' + scope.$index + '.newInventory'"
                                        :rules="[
                                            { required: true, message: '请输入出库量', trigger: 'blur' },
                                            { pattern: /^[0-9]*$/, message: '只能是数字', trigger: 'change' },
                                            { pattern: /^[1-9][0-9]*$/, message: '大于0的整数', trigger: 'blur' },
                                            ]"
                                >
                                    <el-input  style="margin-top: 16px"  size="small"   v-model="scope.row.newInventory"></el-input>
                                </el-form-item>
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
        </right-slide-modal>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {getOfficeOutCode,postOfficeInfoList,postOfficeOutSave,postOfficeHouseSelectTree} from '@Main/officeSupplies/getData.js'
    export default{
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            chooseGoodsData:{
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
        methods: {
            getDataFromTree( obj = {} ){
                console.log(obj)
                this.formGroupData = {...obj};
                this.form.person = obj.userList[0]? obj.userList[0].name:'';
                this.$refs['form'].validateField('person',(valid) => {});
            },
            initData(){
                this.form.des = [];
            },
            //接收用户树返回的数据
            getUserTree:function(arr){
                this.form.person = [...arr]
            },
//            关闭
            operateClose (formName){
                this.form={
                    theme:'',
                    person:'',
                    des:[{newInventory:''}]
                };
                try{
                    this.$refs[formName].resetFields();
                }catch(e){}
                this.formGroupData = {userList:[]};
                this.selectedDataToTree = {userList:[]};
                this.$emit("closeCreateModal");
            },
//            提交
            operateSubmit (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let queryData = {};
                        queryData.theme = this.form.theme;
                        queryData.code = this.officeOutCode;
                        queryData.outPerson = this.formGroupData.userList[0].sid;
                        queryData.officeInfoDtoList = [];
                        let officeInfoDtoList = [];
                        let isBreak = false;
                        this.form.des.map((item) => {

                            if(item.isSave){
                                let obj = {};
                                obj.sid = item.sid;//所属类别
                                obj.houseId = item.houseId;//所属类别
                                obj.stockNum = item.code; //编号
                                obj.stockName = item.name; //物品名称
                                obj.stockSpecifications = item.specification;//规格
                                obj.stockBrand = item.brand;//品牌
                                obj.meteringUnit = item.unit; //单位
                                obj.stockCount = item.inventory;//库存量
                                obj.officeinfoNum = item.newInventory;//本次出库量
                                obj.state = item.state; //状态
                                officeInfoDtoList.push(obj);
                            }else{
                                isBreak = true;
                            }
                        });

                        if(isBreak){
                            this.$message({
                                message: "请保存出库物品",
                                type: 'warning'
                            });
                        }else{
                            queryData.officeInfoDtoList = [...officeInfoDtoList];
                            this.rqSave(queryData);
                        }


                    } else {
                        return false;
                    }
                });
            },
            showGoodsPanel (){
                this.$emit("showGoodsModal");
            },
            chooseVal(value, index){
                this.form.des[index].houseId = value.sid;
                this.form.des[index].category = value.typeName;
            },

            saveInformation (index, row){
                let props = 'des.' + index + '.newInventory';
                props = props.toString();
//                console.log(props)
                let valid = true;
                this.$refs['form'].validateField(props,(valid) => {
//                    console.log(valid,"validvalid")
                    if (!valid) {
//                        alert('submit!');
//                        console.log(this.form.des[index].inventory);
//                        console.log(this.form.des[index].newInventory);
                        let  inventory = this.form.des[index].inventory;
                        let  newInventory = this.form.des[index].newInventory;
                        if(inventory<newInventory){
                            this.$message({
                                message: '出库数量不能大于库存量',
                                type: 'warning'
                            });
                        }else{
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
                        }

                    } else {
//                        console.log('error submit!!');
                        return false;
                    }
                });






            },
            delInformation (index, row){
                this.form.des.splice(index, 1)

                this.$refs['form'].validateField('des',(valid) => {

                });
            },
            dblclickEditInventory(index){
                this.$set(this.form.des, index, {
                    ...this.form.des[index],
                    editFlag: false,
                    newInventoryIsEdit: true
                });
            },
            checkedInput (index){
//                console.log(this.form, "checkedInput");
                let obj = this.form.des[index];
//                console.log(obj, "checkedInput");
                let that = this;
                const pick = (obj, arr) =>
                    arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});
                let obj2 = pick(obj, ['brand', 'name', 'code', 'specification', 'unit', 'newInventory'])
                for (let key in obj2) {
//                    console.log(obj2[key], key)
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

            //获取出库编号
            async rqOfficeInCode(){
                let res = await getOfficeOutCode();
                this.officeOutCode = res;
            },
            async rqSave(queryData){
                let res =  await postOfficeOutSave (queryData);
                this.operateClose("form");
                this.$emit("refreshData");
            },


        },
        data(){
            let that = this;
            var validatePass = (rule, value, callback) => {
                if (!that.form.des.length) {
                    callback(new Error('请选择物品'));
                } else {
//                    if (this.ruleForm2.checkPass !== '') {
//                        this.$refs.ruleForm2.validateField('checkPass');
//                    }
                    callback();
                }
            };
            return {
                officeOutCode:'',
                form:{
                    theme:'',
                    person:'',
                    des:[
//                        {
//                        sid:'',
//                        houseId:'',
//                        category:'',
//                        name:'',
//                        code:'',
//                        specification:'',
//                        brand:'',
//                        unit:'',
//                        inventory:0,
//                        newInventory:'',
//                        state:'1',
//                        newInventoryIsEdit:true,//库存量是否正在编辑
//                        editFlag:true, //true为编辑状态
//                        isSave:false//false为未保存数据
//                    }
                    ],
                },
                storageRules:{
                    theme: [
                        { required: true, message: '请输入出库主题', trigger: 'blur' },
                        { min: 1, max: 50, message: '出库主题文字长度不能大于50个字符', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    person: [
                        { required: true, message: '请选择领用人', trigger: 'blur' }
                    ],
                    des:[
                        {validator:validatePass,trigger:'change'}
                    ],
//                    newInventory:[
//                        { required: true, message: '请输入入库主题', trigger: 'blur' },
//                    ]
                },
                showUserTree:false,
                selectedDataToTree: {//已选树节点
                    userList: [],
                },
                formGroupData:{},
            }
        },
        watch : {
            'dialogVisible':{
                handler: function (val, oldVal) {
                    if(val){
                        //获取入库编号
                        this.rqOfficeInCode();
                    }
                },
            },
            'chooseGoodsData':{
                handler: function (val, oldVal) {




//                    console.log(val,oldVal,"chooseGoodsData")
                    let  that = this;



                    const pick = (obj, arr) =>
                        arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});

//                let des = pick(this.form.des, ['brand', 'name', 'code','specification','brand','unit','newInventory'])
//                let goodsData2 = pick(goodsData, ['brand', 'name', 'code','specification','brand','unit','newInventory'])

                    val.map(function (item) {
//                        let index = that.form.des.length-1;
                        item.sid = item.sid
                        item.category = item.typeName
                        item.name = item.stockName
                        item.code = item.stockNum
                        item.specification = item.stockSpecifications
                        item.brand = item.stockBrand
                        item.unit = item.meteringUnit
                        item.inventory = item.stockCount
                        item.state = item.state

                        let  obj =   {
                            ...item,
                            newInventory:'',
                            editFlag:false, //true为编辑状态
                            newInventoryIsEdit:true,//库存量是否正在编辑
                            isSave:false
                        };
//
//
//                            JZY.u.deepExtend(item,{
//                            editFlag:false, //true为编辑状态
//                            newInventoryIsEdit:true,//库存量是否正在编辑
//                            isChoose:true,
//                            isSave:false
//
//                            JZY.u.deepExtend(item,{
//                            editFlag:false, //true为编辑状态
//                            newInventoryIsEdit:true,//库存量是否正在编辑
//                            isChoose:true,
//                            isSave:false
//                        });
                        that.form.des.push(obj)


                    });
                    this.$refs['form'].validateField('des',(valid) => {

                    });
                },
            }
        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .add,.icon-question{
        cursor: pointer;
        font-size: 18px;
        vertical-align: middle;
        margin-top: -4px;
    }
    .el-dialog .el-dialog__header .el-dialog__title .note{
        top: 0px;
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .office-delivery-diawrap .el-dialog .el-dialog__body{
        padding: 16px 24px;
        .el-table th>.cell{
            padding: 0px;
            margin: 0px;
        }
    }
</style>
