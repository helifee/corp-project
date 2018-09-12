<template>
    <div class="right-modal storage">
        <right-slide-modal
                class="office-storage-diawrap"
                :title="l('{officeLocale.storage.otherButtons.newStorage}')"
                :visible.sync="propsDialogVisible"
                :showClose="false">
            <div slot="title">

                <span class="el-dialog__title">
                            <span class="note"></span>
                            {{ l('{officeLocale.storage.otherButtons.newStorage}') }}
                        </span>
                <el-tooltip content="每天入库单数量上限为9999，多于9999不能进行入库操作" placement="right" effect="light">
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
                        <span style="padding-left: 10px;line-height: 48px">{{l('{officeLocale.goods.detail.code}')}}：&nbsp;&nbsp;&nbsp;{{officeInCode}}</span>
                    </el-col>
                    <el-col :span="10" style="line-height: 48px">
                        <span>{{l('{officeLocale.goods.detail.member}')}}：{{session.name}}</span>
                    </el-col>
                </el-row>
                <el-form-item :label="l('{officeLocale.goods.detail.theme}')+'：'" prop="theme">
                    <el-input v-model="form.theme" :maxlength="51"></el-input>
                </el-form-item>
                <el-form-item class="information" style="margin-left: -96px" prop="des"
                >
                    <span>{{l('{officeLocale.goods.detail.goods}')}}</span>
                    <el-tooltip content="入库时您可以选择库中已有物品入库，也可以手工填写进行新物品的入库。手工填写物品时，我们会根据物品的名称、类别、规格和品牌去匹配库中已有物品，若百分百匹配则认为您填写的物品与库中物品为同一物品，入库时更改库存数量；若名称、类别、规格和品牌中有一项与库中物品不一致则为新物品入库。" placement="right" effect="light">
                        <i class="el-icon-question icon-question"  style="color: #4989ee"></i>
                    </el-tooltip>
                    <span @click="addInformation" class="el-icon-circle-plus-outline add"></span>
                    <el-table
                            :data="form.des"
                            style="width: 100%;text-align: center;"
                            :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333','padding':'4px 0px'}">
                        <el-table-column
                                label="序号">
                            <template slot-scope="scope">
                                {{scope.$index+1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="物品名称"
                                width="140"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag" >{{ scope.row.name }}</span>
                                <div class="choose-input">
                                    <el-form-item
                                            style="float: left"
                                            v-if="scope.row.editFlag"
                                            :prop="'des.' + scope.$index + '.name'"
                                            :rules="[
                                            { required: true, message: '请输入物品名称', trigger: 'blur' },
                                            { min: 1, max: 100, message: '1~100字符', trigger: 'blur' },
                                            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                                            ]"
                                    >
                                        <el-input  size="small" style="margin-top: 16px;width: 90px" :maxlength="101" v-model="scope.row.name"></el-input>
                                    </el-form-item>


                                    <!--<el-input size="small" v-if="scope.row.editFlag" v-model="scope.row.name" ></el-input>-->
                                    <i class="el-icon-search" @click="showGoodsPanel" v-if="scope.row.newInventoryIsEdit&&scope.row.editFlag"></i>
                                    <!--scope.$index == form.des.length-1&&-->
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="cateArr"
                                :label="l('{officeLocale.goods.detail.theCategory}')"
                                width="150"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.category }}</span>
                                <el-form-item
                                        v-if="scope.row.editFlag"
                                        :prop="'des.' + scope.$index + '.cateArr'"
                                        :rules="[
                                            { required: true, message: '请选择物品类别', trigger: 'blur' }
                                            ]"
                                >
                                    <el-cascader
                                            size="small"
                                            v-if="scope.row.editFlag"
                                            expand-trigger="hover"
                                            style="width: 120px;margin-top: 19px"
                                            placeholder="搜索类别名称"
                                            v-model="form.des[scope.$index].cateArr"
                                            :options="treeData"
                                            :props="propsOption"
                                            @change="changeHander($event, scope.$index)"
                                            filterable
                                            change-on-select
                                            :ref="'cascader'+scope.$index"
                                    ></el-cascader>
                                </el-form-item>

                                <!--<cascader-tree  v-if="scope.row.editFlag"  v-model="scope.row.houseId" :sid="scope.row.houseId" style="width: 200px" @chooseValue="chooseVal($event,scope.$index)" ></cascader-tree>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="code"
                                label="编号"
                                width="120"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.code }}</span>
                                <el-form-item
                                        v-if="scope.row.editFlag"
                                        :prop="'des.' + scope.$index + '.code'"
                                        :rules="[
                                            { required: true, message: '请输入物品编号', trigger: 'blur' },
                                            { min: 1, max: 100, message: '1~100字符', trigger: 'blur' },
                                            { pattern: /^[A-Za-z0-9]+$/, message: '只能是数字或英文', trigger: 'blur'}
                                            ]"
                                >
                                    <el-input size="small" style="margin-top: 16px" v-model="scope.row.code"  :maxlength="101"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="specification"
                                :label="l('{officeLocale.goods.detail.specification}')"
                                width="90"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.specification }}</span>
                                <el-form-item
                                        v-if="scope.row.editFlag"
                                        :prop="'des.' + scope.$index + '.specification'"
                                        :rules="[
                                            { required: true, message: '请输入规格', trigger: 'blur' },
                                            { min: 1, max: 100, message: '1~100字符', trigger: 'blur' },
                                            { pattern: /^[^/&'<>%*\\]*$/, message: '有不合法字符', trigger: 'blur'}
                                            ]"
                                >
                                    <el-input size="small" style="margin-top: 16px" v-model="scope.row.specification" :maxlength="101"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="brand"
                                :label="l('{officeLocale.goods.detail.brand}')"
                                width="90"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.brand }}</span>
                                <el-form-item
                                        v-if="scope.row.editFlag"
                                        :prop="'des.' + scope.$index + '.brand'"
                                        :rules="[
                                            { required: true, message: '请输入品牌', trigger: 'blur' },
                                            { min: 1, max: 100, message: '1~100字符', trigger: 'blur' },
                                            { pattern: /^[^/&'<>%*\\]*$/, message: '有不合法字符', trigger: 'blur'}
                                            ]"
                                >
                                    <el-input size="small" style="margin-top: 16px"  v-if="scope.row.editFlag" v-model="scope.row.brand"  :maxlength="101"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="unit"
                                :label="l('{officeLocale.goods.detail.unit}')"
                                width="80"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.unit }}</span>
                                <el-form-item
                                        v-if="scope.row.editFlag"
                                        :prop="'des.' + scope.$index + '.unit'"
                                        :rules="[
                                            { required: true, message: '请输入单位', trigger: 'blur' },
                                            { min: 1, max: 100, message: '1~100字符', trigger: 'blur' },
                                            { pattern: /^[^/&'<>%*\\]*$/, message: '有不合法字符', trigger: 'blur'}
                                            ]"
                                >
                                    <el-input size="small"  style="margin-top: 16px" v-model="scope.row.unit" :maxlength="101"></el-input>
                                </el-form-item>

                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="inventory"
                                :label="l('{officeLocale.goods.detail.inventory}')"
                                width="80"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{ scope.row.inventory||'0' }}</span>
                                <span v-else="scope.row.editFlag">{{scope.row.inventory}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="newInventory"
                                :label="l('{officeLocale.goods.detail.newInventory}')"
                                width="100"
                                show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span v-if="!scope.row.newInventoryIsEdit"  @dblclick="dblclickEditInventory(scope.$index)">{{ scope.row.newInventory }}</span>
                                <el-form-item
                                        v-if="scope.row.newInventoryIsEdit"
                                        :prop="'des.' + scope.$index + '.newInventory'"
                                        :rules="[
                                            { required: true, message: '请输入入库量', trigger: 'blur' },
                                            { pattern: /^[0-9]*$/, message: '只能是数字', trigger: 'change' },
                                            { pattern: /^[1-9][0-9]*$/, message: '大于0的整数', trigger: 'blur' },
                                            ]"
                                >
                                    <el-input size="small" style="margin-top: 16px"  v-model="scope.row.newInventory"></el-input>
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
    import cascaderTree from '@Main/officeSupplies/components/cascader.tree.vue'
    import {getOfficeInCode,postOfficeInfoList,postOfficeInSave,postOfficeHouseSelectTree} from '@Main/officeSupplies/getData.js'
    export default{
        components:{
            cascaderTree
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
            changeHander(cateArr,index){
                let len = cateArr.length;
//                console.log(index,"indexindex");
                this.form.des[index].houseId = cateArr[len-1];
                let  houseId = cateArr[len-1];
                if(len==2){
                    this.treeData.find((item)=>{
                        if(item.sid == cateArr[0]){
//                            console.log(item.typeName);
                            item.officeHouseList.find((item2)=>{
                                if(item2.sid == cateArr[1]){
                                    this.form.des[index].category = item2.typeName;
                                }

                            });
                        }

                    });
                }else if(len == 1){
                    this.treeData.find((item)=>{
                        if(item.sid == houseId){
                            this.form.des[index].category = item.typeName;
//                            console.log(item.typeName);
//                            return item.typeName;
                        }

                    });
                }




//                this.selectCurrentId = item[0];
            },
            //关闭
            operateClose (formName){
                try{
                    this.$refs[formName].resetFields();
                }catch(e){}
                this.form={
                    theme:'',
                    des:[{
                    sid:'',
                    houseId:'',
                    cateArr:[],
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
                }]};
//
                this.$emit("closeCreateModal");
                let obj = {}
                obj.stopPropagation = () =>{}

                if(this.$refs.cascader0){
                    this.$refs.cascader0.clearValue(obj)
                }
//
            },
//            提交
            operateSubmit (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let queryData = {};
                        queryData.theme = this.form.theme;
                        queryData.code = this.officeInCode;
//                        queryData.inPerson = this.session.name;
                        queryData.officeInInfoDtoList = [];
                        let officeInInfoDtoList = [];
                        let isBreak = false;
                        this.form.des.map((item) => {
                            if(item.isSave){
                                let obj = {};
                                obj.houseId = item.houseId;//所属类别
                                obj.stockNum = item.code; //编号
                                obj.stockName = item.name; //物品名称
                                obj.stockSpecifications = item.specification;//规格
                                obj.stockBrand = item.brand;//品牌
                                obj.meteringUnit = item.unit; //单位
                                obj.stockCount = item.inventory;//库存量
                                obj.officeinfoNum = item.newInventory;//本次入库量
                                obj.state = item.state; //状态
                                officeInInfoDtoList.push(obj);
                            }else{
                                isBreak = true;
                            }
                        });

                        if(isBreak){
                            this.$message({
                                message: "请保存入库物品",
                                type: 'warning'
                            });
                        }else{
                            queryData.officeInInfoDtoList = [...officeInInfoDtoList];
                            console.log(queryData)
                            this.rqSave(queryData);
                        }




                    } else {
                        console.log('error submit!!');
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
                this.form.des[index].cateArr = [];
                console.log(value.typeName, value.sid, index)
//                this.$set(this.form,"houseId",typeName)
            },
//            chooseGoods (goodsData){
//                this.chooseGoodsData = goodsData;
//
//                let  that = this;
//
//                const pick = (obj, arr) =>
//                    arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});
//
////                let des = pick(this.form.des, ['brand', 'name', 'code','specification','brand','unit','newInventory'])
////
////                let goodsData2 = pick(goodsData, ['brand', 'name', 'code','specification','brand','unit','newInventory'])
//
//                    goodsData.map(function (item) {
//                        let index = that.form.des.length-1;
//                        let  obj =   Object.assign(item,{
//                            editFlag:false, //true为编辑状态
//                            newInventoryIsEdit:true,//库存量是否正在编辑
//                            isChoose:true,
//                            isSave:false
//                        });
//                        that.form.des.splice(index,0,obj)
//                    });
//
////                that.form.des = [...Array.from(new Set(that.form.des))];
//                this.goodsDialogVisible = false;
//            },

//            弹窗中 新增
            addInformation (){
                this.form.des.push({
                    category: '',
                    cateArr:[],
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
                this.$refs['form'].validateField('des',(valid) => {

                });

            },
            saveInformation (index, row){
//                editFlag false   newInventoryIsEdit  true
                let curRow = this.form.des[index];

//                console.log(curRow.newInventoryIsEdit&&!curRow.editFlag,"curRow.newInventoryIsEdit&&!curRow.editFlag")
                if(curRow.newInventoryIsEdit&&!curRow.editFlag){
                    let validNewInventory = 'des.' + index + '.newInventory';
                    let validNewInventoryPass;
                    this.$refs['form'].validateField(validNewInventory,(valid) => {
                        validNewInventoryPass = valid?false:true;
                    });
                    if(validNewInventoryPass){
                        if (this.checkedInput(index)) {
                            if (this.form.des[index].sid) {
                                this.$set(this.form.des, index, {
                                    ...this.form.des[index],
                                    editFlag: false,
                                    newInventoryIsEdit: false,
                                    isSave: true
                                });
                            } else {
                                this.rqOfficeIsHave(index);
                            }
                        }
                    }
                }else{
                    let validName = 'des.' + index + '.name';
                    let validCategory = 'des.' + index + '.cateArr';
                    let validCode = 'des.' + index + '.code';
                    let validSpecification = 'des.' + index + '.specification';
                    let validBrand = 'des.' + index + '.brand';
                    let validUnit = 'des.' + index + '.unit';
                    let validNewInventory = 'des.' + index + '.newInventory';
                    let validNamePass,validCategoryPass,validCodePass,validSpecificationPass,validBrandPass,validUnitPass,validNewInventoryPass;
                    this.$refs['form'].validateField(validName,(valid) => {
                        validNamePass = valid?false:true;
                    });
                    this.$refs['form'].validateField(validCategory,(valid) => {
                        validCategoryPass = valid?false:true;
                    });
                    this.$refs['form'].validateField(validCode,(valid) => {
                        validCodePass = valid?false:true;
                    });
                    this.$refs['form'].validateField(validSpecification,(valid) => {
                        validSpecificationPass = valid?false:true;
                    });
                    this.$refs['form'].validateField(validBrand,(valid) => {
                        validBrandPass = valid?false:true;
                    });
                    this.$refs['form'].validateField(validUnit,(valid) => {
                        validUnitPass = valid?false:true;
                    });
                    this.$refs['form'].validateField(validNewInventory,(valid) => {
                        validNewInventoryPass = valid?false:true;
                    });
                    if(validNamePass&&validCategoryPass&&validCodePass&&validSpecificationPass&&validBrandPass&&validUnitPass&&validNewInventoryPass){
                        if (this.checkedInput(index)) {
                            if (this.form.des[index].sid) {
                                this.$set(this.form.des, index, {
                                    ...this.form.des[index],
                                    editFlag: false,
                                    newInventoryIsEdit: false,
                                    isSave: true
                                });
                            } else {
                                this.rqOfficeIsHave(index);
                            }
                        }
                    }

                }


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
            //获取入库编号
            async rqOfficeInCode(){
                let res = await getOfficeInCode();
                console.log(res);
                this.officeInCode = res;
            },
            //校验是否存在 postOfficeInfoList
            async rqOfficeIsHave(index){
                let arrData = this.form.des[index];
                let stockName = arrData.name,
                    houseId = arrData.houseId,
                    stockSpecifications = arrData.specification,
                    stockBrand = arrData.brand;
                let res = await postOfficeInfoList(stockName, houseId, stockSpecifications, stockBrand);
                console.log(res[0][0])
                if (res[0].length) {
                    console.log(+(res[0][0].state),"+res[0].state+res[0].state")
                    if (+res[0][0].state) {


                        const h = this.$createElement;
                        this.$confirm('物品在库中已存在，确定添加库存中已有物品', {
                            title: '物品已存在',
                            message: h('p', null, [
                                h('span', { style: 'color: red' }, '物品在库中已存在，确定添加库存中已有物品')
                            ]),
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.form.des[index].sid = res[0][0].sid;
                            this.form.des[index].inventory = res[0][0].stockCount;
                            this.$set(this.form.des, index, {
                                ...this.form.des[index],
                                editFlag: false,
                                newInventoryIsEdit: false,
                                isSave: true
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消操作'
                            });
                        });



                    } else {
                        this.$confirm('该物品已经禁用，不能进行入库操作', '提示', {
                            confirmButtonText: '确定',
                            showCancelButton:false,
                            showClose:false,
                            type: 'warning'
                        }).then(() => {

                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消操作'
                            });
                        });
                    }

                } else {
                    this.form.des[index].sid = res[0].sid;
                    this.$set(this.form.des, index, {
                        ...this.form.des[index],
                        editFlag: false,
                        newInventoryIsEdit: false,
                        isSave: true
                    });
                }

            },
            //保存接口
            async rqSave(queryData){
                let res =  await postOfficeInSave (queryData);
                this.operateClose("form");
                this.$emit("refreshData");
            },
            //加载
            async rquireOfficeTree(){
                let queryData = {
                    "orderBy":"state desc",
                    "state":'1'
                };
                let res = await postOfficeHouseSelectTree(queryData);
                this.treeData = res[0];

            },
        },
        data(){
            let that = this;
            var validatePass = (rule, value, callback) => {
                if (!that.form.des.length) {
                    callback(new Error('请输入入库物品'));
                } else {
//                    if (this.ruleForm2.checkPass !== '') {
//                        this.$refs.ruleForm2.validateField('checkPass');
//                    }
                    callback();
                }
            };
            return {
                propsOption:{
                    children: 'officeHouseList',
                    label: 'typeName',
                    value:'sid',
                },
                treeData:[],
                officeInCode:'',
                form:{
                    theme:'',
                    des:[{
                        sid:'',
                        houseId:'',
                        category:'',
                        cateArr:[],
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
                },
                storageRules:{
                    theme: [
                        { required: true, message: '请输入入库主题', trigger: 'blur' },
                        { min: 1, max: 50, message: '入库主题文字长度不能大于50个字符', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    des:[
                        {validator:validatePass,trigger:'change'}
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
                        this.rquireOfficeTree();
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
                        item.cateArr = [];
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
                    let newArr = this.form.des.filter((item) =>{
                        if(item.houseId){
                            return item;
                        }
                    })
                    this.form.des = [...newArr];

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
    .choose-input{
        position: relative;
        i{
            float: left;
            position: absolute;
            right: -10px;
            /*top: 10px;*/
            cursor: pointer;
            font-size: 18px;
            line-height: 68px;
            margin-left: 8px;
        }
    }
    .el-dialog .el-dialog__header .el-dialog__title .note{
        top: 0px;
    }

</style>
<style rel="stylesheet/scss" lang="scss">
    .right-modal.storage{

        .el-form .el-form-item{
            margin-bottom: 16px;
        }
    }
    .el-tooltip__popper.is-light{
         width: 300px!important;
     }
    .office-storage-diawrap .el-dialog .el-dialog__body{
        padding: 16px 24px;
        .el-table th>.cell{
            padding: 0px;
            margin: 0px;
        }
    }
</style>