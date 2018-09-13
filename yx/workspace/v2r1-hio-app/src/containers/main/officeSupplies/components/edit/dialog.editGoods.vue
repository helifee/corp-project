<template>
    <right-slide-modal
            title="编辑物品"
            @open="openInt"
            :visible.sync="propsDialogVisible"
            :showClose="false"
            class="office-dialog-wrap"
    >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li><el-button @click="operateSave('form')"  size="medium ">保存</el-button></li>
                <li><el-button @click="operateClose('form')" size="medium ">关闭</el-button></li>
            </ul>
        </div>
        <el-form ref="form" :model="form" :rules="rules"  label-width="86px" class="formPanel">
            <el-form-item label="所属类别：" prop="houseId">

                <!--<cascader-tree v-if="propsDialogVisible" v-model="form.houseId" :sid="form.houseId" style="width: 200px" @chooseValue="chooseVal" ></cascader-tree>-->

                <el-cascader
                        style="width: 200px"
                        placeholder="搜索类别名称"
                        expand-trigger="hover"
                        v-model="form.cateArr"
                        :options="treeData"
                        :props="propsOption"
                        @change="changeHander"
                        filterable
                        change-on-select
                ></el-cascader>

            </el-form-item>
            <el-form-item label="物品名称：" prop="stockName">
                <el-input v-model="form.stockName"></el-input>
            </el-form-item>
            <el-form-item label="物品编号：" prop="stockNum">
                <el-input v-model="form.stockNum"></el-input>
            </el-form-item>
            <el-form-item label="规格：" prop="stockSpecifications">
                <el-input v-model="form.stockSpecifications"></el-input>
            </el-form-item>
            <el-form-item label="品牌：" prop="stockBrand">
                <el-input v-model="form.stockBrand"></el-input>
            </el-form-item>
            <el-form-item label="单位：" prop="meteringUnit">
                <el-input v-model="form.meteringUnit"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input v-model="form.remark" v-textarea-limiter type="textarea" :rows="5" :maxlength="200"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="state">
                <el-radio-group v-model="form.state">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio  :label="0" >禁用</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </right-slide-modal>
</template>

<script>
    import {putOfficeInfoUpdate,getOfficeHouseGet,getofficeInfo,postOfficeHouseSelectTree} from '@Main/officeSupplies/getData.js'
    export default{
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            id:{
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
            openInt(){
                this.rquireOfficeTree();

            },
//            关闭
            operateClose(formName){
                this.form = {
                    houseId:'',
                    stockName:'',
                    stockNum:'',
                    stockSpecifications:'',
                    stockBrand:'',
                    meteringUnit:'',
                    remark:'',
                    state:1
                }
                this.$refs[formName].resetFields();
                this.$emit("closeCreateModal");
            },
//            提交
            operateSave (formName){
//                console.log(this.form.cateArr ,"this.form.cateArr ");
//                console.log(this.form.houseId ,"this.form.houseId ");
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let queryData = {};
                        queryData.houseId = this.form.houseId;
                        queryData.stockName = this.form.stockName;
                        queryData.stockNum = this.form.stockNum;
                        queryData.stockSpecifications = this.form.stockSpecifications;
                        queryData.stockBrand = this.form.stockBrand;
                        queryData.meteringUnit = this.form.meteringUnit;
                        queryData.remark = this.form.remark;
                        queryData.state = this.form.state;
                            console.log(queryData)
                        this.officeHouseSave(queryData);

                    } else {
                        return false;
                    }
                });
            },
            changeHander(cateArr){
//                console.log(cateArr,"cateArrcateArrcateArrcateArr");
                let len = cateArr.length;
//                this.form.houseId = cateArr[len-1];
//                let  houseId = cateArr[len-1];
//                if(len==2){
//                    this.treeData.find((item)=>{
//                        if(item.sid == cateArr[0]){
//                            item.officeHouseList.find((item2)=>{
//                                if(item2.sid == cateArr[1]){
////                                    console.log(item2.typeName);
//                                }
//
//                            });
//                        }
//
//                    });
//                }else if(len == 1){
//                    this.treeData.find((item)=>{
//                        if(item.sid == houseId){
////                            console.log(item.typeName);
//                            return item.typeName;
//                        }
//
//                    });
//                }
//                console.log()

                this.form.houseId = cateArr[1]?cateArr[1]:cateArr[0];

//                console.log(cateArr,this.form.houseId,"cateArrcateArrcateArrcateArr");

                this.$refs['form'].validateField('houseId',(valid) => {

                });

            },

            async officeHouseSave(queryData){
                let res = await putOfficeInfoUpdate(this.id,queryData);
                if(res){
                    this.$emit("refreshCategory",Math.random());
                    this.operateClose('form');
                }
            },
            //根据Id获取入库，包含物品详情列表 id
            async rqOfficeIn(id){
                let res = await getofficeInfo (id);
                this.initData = {...res};
                this.form.cateArr = [this.initData.firstHouseId,this.initData.houseId||''];
                this.form.houseId = this.initData.houseId?this.initData.houseId:this.initData.firstHouseId;


                this.form.stockName = this.initData.stockName;
                this.form.stockNum = this.initData.stockNum;
                this.form.stockSpecifications = this.initData.stockSpecifications;
                this.form.stockBrand = this.initData.stockBrand;
                this.form.meteringUnit = this.initData.meteringUnit;
                this.form.remark = this.initData.remark;
                this.form.state = parseInt(this.initData.state);

                let nodeData = [...this.treeData];
                let sidList = [];
//                console.log(nodeData,"nodeDatanodeData")
                if(nodeData.length){
                    nodeData.map(item=>{
                        sidList.push(item.sid)
                        if(item.officeHouseList){
                            item.officeHouseList.map(item2=>{
                                sidList.push(item2.sid)
                            })
                        }
                    });
                }
                if(sidList.indexOf(this.form.houseId)<0){
//                    console.log(sidList,"sidList")
                    this.form.houseId = ''
                    this.form.cateArr = []
                }


            },

            //加载
            async rquireOfficeTree(){
                let queryData = {
                    "orderBy":"state desc",
                    "state":'1'
                };
                let res = await postOfficeHouseSelectTree(queryData);
                this.treeData = res[0];
                this.rqOfficeIn(this.id);

            },
        },
        data(){
            return {
                propsOption:{
                    children: 'officeHouseList',
                    label: 'typeName',
                    value:'sid',
                },
                treeData:[],
                form:{
                    cateArr:[],
                    houseId:'',
                    stockName:'',
                    stockNum:'',
                    stockSpecifications:'',
                    stockBrand:'',
                    meteringUnit:'',
                    remark:'',
                    state:1
                },
                rules:{
                    houseId:[
                        { required: true, message: '请选择物品分类', trigger: 'blur' }
                    ],
                    stockName: [
                        { required: true, message: '请输入物品名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    stockNum: [
                        { required: true, message: '请输入物品编号', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                        { pattern: /^[A-Za-z0-9]+$/, message: '类别编码只能是数字或者英文', trigger:'blur'  }
                    ],
                    stockSpecifications: [
                        { required: true, message: '请输入物品规格', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    stockBrand: [
                        { required: true, message: '请输入物品品牌', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    meteringUnit: [
                        { required: true, message: '请输入单位', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ],
                    state:[
                        {required: true}
                    ]
                },
                initData:{},
                classList:[],
                propsSelect: {
                    label:'typeName',
                    value:'sid',
                    children: 'officeHouseList'
                },
            }
        },
        watch:{
            initData(curVal){
//                this.form.houseId = curVal.houseId||curVal.firstHouseId;
//                this.form.stockName = curVal.stockName;
//                this.form.stockNum = curVal.stockNum;
//                this.form.stockSpecifications = curVal.stockSpecifications;
//                this.form.stockBrand = curVal.stockBrand;
//                this.form.meteringUnit = curVal.meteringUnit;
//                this.form.remark = curVal.remark;
//                this.form.state = parseInt(curVal.state);
            },
        },
        mounted (){

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate-buttons {
        margin-top: 8px;
        float: right;
    }
    .formPanel{

    }
</style>
