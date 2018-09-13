<template>

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
                    <span style="padding-left: 45px;line-height: 48px">{{l('{officeLocale.goods.detail.code}')}}：2018122334330001</span>
                </el-col>
                <el-col :span="10">
                    <span>{{l('{officeLocale.goods.detail.member}')}}：曲丽丽</span>
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
                            prop="category"
                            :label="l('{officeLocale.goods.detail.theCategory}')"
                            width="150">
                        <template slot-scope="scope">
                            <span v-if="!scope.row.editFlag" @dblclick="dblclickEdit(scope.$index)">{{ scope.row.category }}</span>
                            <el-select   v-if="scope.row.editFlag" v-model="scope.row.category">
                                <el-option label="办公用品" value="shanghai"></el-option>
                                <el-option label="保洁用品" value="beijing"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            :label="l('{officeLocale.goods.detail.name}')"
                            width="120">
                        <template slot-scope="scope">
                            <span v-if="!scope.row.editFlag" @click="tableIndex1(scope.$index)" @dblclick="dblclickEdit(scope.$index)">{{ scope.row.name }}</span>
                            <el-autocomplete
                                    v-if="scope.row.editFlag"
                                    v-model="scope.row.name"
                                    :fetch-suggestions="querySearchAsync"
                                    placeholder="请输入内容"
                                    @select="handleSelect"
                            >

                                <!--@blur="handleChange(scope.$index, scope.row)"-->
                            </el-autocomplete>
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
                            <span v-if="!scope.row.editFlag">{{ scope.row.newInventory }}</span>
                            <el-input  v-if="scope.row.editFlag" v-model="scope.row.newInventory" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="120">
                        <template slot-scope="scope">
                            <span class="el-icon-success" v-if="scope.row.editFlag" @click="saveInformation(scope.$index, scope.row)" style="font-size: 20px;color: #67c23a;margin-right: 12px"></span>
                            <span class="el-icon-circle-close" @click="delInformation(scope.$index, scope.row)" style="font-size: 20px;color: red"></span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

        </el-form>
    </right-slide-modal>

</template>

<script>
    export default{
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
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
            diaTableIndex:
                {
                get:function(){
                    return this.form.des.length -1;
                },
                set:function (newValue) {
                    console.log("newValue",newValue)

                    return  newValue;
                }
            }
        },
        methods:{
//            关闭
            operateClose(formName){
                this.$refs[formName].resetFields();
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


            loadAll() {
                return [
                    { "value": "铅笔0", "category": "办公用品","name":'铅笔0', "code":"001", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔1", "category": "办公用品","name":'铅笔1', "code":"002", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔2", "category": "办公用品","name":'铅笔2', "code":"003", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔3", "category": "办公用品","name":'铅笔3', "code":"004", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔4", "category": "办公用品","name":'铅笔4', "code":"005", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔5", "category": "办公用品","name":'铅笔5', "code":"006", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔6", "category": "办公用品","name":'铅笔6', "code":"007", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔7", "category": "办公用品","name":'铅笔7', "code":"008", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔8", "category": "办公用品","name":'铅笔8', "code":"009", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔9", "category": "办公用品","name":'铅笔9', "code":"010", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔10", "category": "办公用品","name":'铅笔10', "code":"011", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔11", "category": "办公用品","name":'铅笔11', "code":"012", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔12", "category": "办公用品","name":'铅笔12', "code":"013", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔13", "category": "办公用品","name":'铅笔13', "code":"014", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                    { "value": "铅笔14", "category": "办公用品","name":'铅笔14', "code":"015", "specification":"36g", "brand":'得力', "unit":'只', "inventory":21},
                ];
            },
            querySearchAsync(queryString, cb) {
                let restaurants = this.restaurants;
                let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 300 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                let index = this.diaTableIndex;
                this.$set(this.form.des,index,{
                    ...item,
                    newInventory:'',
                    editFlag:true,
                });

            },
            tableIndex1 (index){
                this.diaTableIndex = index;
                console.log(this.diaTableIndex,"tableIndex");
            },


//            弹窗中 新增
            addInformation (){
                if(this.isSave) {
                    this.form.des.push({
                        category: '',
                        name: '',
                        code: '',
                        specification: '',
                        brand: '',
                        unit: '',
                        inventory: '',
                        newInventory: '',
                        editFlag: true
                    });
                    this.diaTableIndex = this.form.des.length - 1;
                    this.isSave = false;
                }else{
                    this.$message({
                        message: '请先保存上一条数据',
                        type: 'warning'
                    });
                }

            },
            saveInformation (index, row){
                console.log(this.form.des[index])
                console.log("save,,,,checkedInput",this.checkedInput());
                if(this.checkedInput()){
                    this.form.des[index].editFlag = false;
                }
                this.isSave = true;

            },
            delInformation (index, row){
                this.form.des.splice(index,1)
            },
            dblclickEdit (index){
                this.diaTableIndex = index;
                this.$set(this.form.des,index,{
                    ...this.form.des[index],
                    editFlag:true,
                });
            },
            checkedInput (){
                console.log("this.form.des[this.diaTableIndex]",this.form.des[this.diaTableIndex])
                let obj = this.form.des[this.diaTableIndex];
                let that = this;
                let returnVal = true;
                for(let key in obj){
                    console.log(key,obj[key],!obj[key]);

                    if(obj[key] != 'inventory'){
                        if(!obj[key]){
                            console.log(obj[key])
                            that.$message({
                                message: '请填写完整信息',
                                type: 'warning'
                            });
                            return false;
                        }
                    }


                }

                return true;


            }

        },
        data(){
            return {
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
                        editFlag:true
                    }],
                },
                storageRules:{
                    theme: [
                        { required: true, message: '请输入主题名称', trigger: 'blur' },
                    ],
                },
                restaurants: [],
                timeout:  null,
                isSave:false
            }
        },
        watch : {
            'form': {
                handler: function (val, oldVal) {
                    console.log(val,oldVal)
                },
                deep: true
            }
        },
        mounted (){
            this.restaurants = this.loadAll();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
</style>
