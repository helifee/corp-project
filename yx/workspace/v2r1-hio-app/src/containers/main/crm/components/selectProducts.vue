<template>

            <div class="selectProductsPage">
            <!-- <el-form label-width="120px"> -->
            <div style="overflow:hidden;">
                <span style="float:left;">
                    <span style="color:red">*</span>产品信息
                </span>
                <span style="float:right;" @click="addInformation"  class="addRight">
                    
                    <span class="el-icon-plus add"></span>
                    <span>选择产品</span>
                </span>
            </div>    
            
            <el-table
                    ref="selectTable"
                    show-summary
                    :summary-method="getSummaries"
                    :data="goodsList"
                    style="width: 100%;text-align: center;"
                    :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333','padding':'4px 0px'}">
                <el-table-column type="index" label="序号">
                </el-table-column>
                
                <el-table-column
                        prop="name"
                        label="产品名称"
                        align="left"
                        show-overflow-tooltip
                        >
                        <template slot-scope="scope">
                        <span >{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="categoryname"
                        label="产品类别"
                        align="left"
                        show-overflow-tooltip
                        >
                        <template slot-scope="scope">
                            <span>{{ scope.row.categoryname }}</span>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="unit"
                        label="单位"
                        show-overflow-tooltip
                        >
                        <template slot-scope="scope">
                        <span>{{ scope.row.unit }}</span>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格"
                        show-overflow-tooltip
                        >
                        <template slot-scope="scope">
                        <span>{{ scope.row.price }}</span>
                        </template>
                </el-table-column>
                <el-table-column
                        prop="productCount"
                        label="数量"
                        >
                    <template slot-scope="scope">
                            <el-form-item
                                        :prop="'des.' + scope.$index + '.productCount'"
                                        :rules="productRules"
                                >
                                    <!-- <el-input size="small" type="Number"  v-model="scope.row.productCount"></el-input> -->
                                    <numberInput size="small" v-model="scope.row.productCount"
                                    placeholder="数量" type="init" >

                                    </numberInput>
                            </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="discount"
                        label="折扣%"
                        >
                    <template slot-scope="scope">
                            <el-form-item
                                        :prop="'des.' + scope.$index + '.discount'"
                                        :rules="discountRules"
                                >
                                    <!-- <el-input size="small" type="Number" v-model="scope.row.discount" :maxlength="3"></el-input> -->
                                    <numberInput size="small" v-model="scope.row.discount"
                                    placeholder="折扣" type="hundred" ></numberInput>
                            </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                        width="80px"
                        prop="total"
                        show-overflow-tooltip
                        label="总价"
                        >
                    <template slot-scope="scope">
                        <!-- <el-input v-model.number="scope.row.total"
                         :value="Number(scope.row.price)*(scope.row.discount ? Number(scope.row.discount) : 100)/100 * (scope.row.productCount ? scope.row.productCount : 0) | filterFloor" readonly >
                         </el-input> -->
                        <!-- <el-input v-model.number="scope.row.total" value="10" readonly ></el-input> -->
                        <span>{{ scope.row.total = (Number(scope.row.price)*((scope.row.discount || scope.row.discount === 0 ) ? Number(scope.row.discount) : 100)/100 * (scope.row.productCount ? scope.row.productCount : 0)) | filterFloor}}</span>
                        <!-- <span style="display:none">{{ scope.row.total = (Number(scope.row.price)*(scope.row.discount ? Number(scope.row.discount) : 100)/100 * (scope.row.productCount ? scope.row.productCount : 0)) | filterFloor}}</span> -->

                    </template>
                </el-table-column>
                <el-table-column
                        width="100px" 
                        prop="comment"
                        label="备注"
                        align="left"
                        >
                    <template slot-scope="scope">
                        <!-- <span>{{scope.row.comment}}</span> -->
                        <el-form-item
                                :prop="'des.' + scope.$index + '.comment'"
                                :rules="[{ min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: ['blur','change'] }]"
                                >
                                    <el-input size="small" v-model="scope.row.comment" :maxlength="201"></el-input>
                            </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column width="40px">
                    <template slot-scope="scope">
                        <!-- <span class="el-icon-success" v-if="scope.row.newInventoryIsEdit" @click="saveInformation(scope.$index,scope)" 
                        style="font-size: 20px;color: #67c23a;margin-right: 12px"></span> -->
                        <span class="el-icon-close" @click="delInformation(scope.$index, scope.row)" 
                        style="font-size: 20px;color: #505050"></span>
                    </template>
                </el-table-column>    
            </el-table>
        </div>

</template>
<script>
import numberInput from '@Main/crm/components/number.vue'
export default {
    components:{
        numberInput
    },
    methods:{
        addInformation(){
            
            this.$emit("showGoodsModal")
        },  
        delInformation (index, row){
            this.goodsList.splice(index, 1);
        },
        getSummaries(param){    
            const { columns, data } = param;
            const sums = [];
            
           
            
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
               
                
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                    }, 0);
                    if(column.property == "total"){
                        
                        sums[index] = sums[index].toFixed(2);
                        this.selectSum = sums[index];
                        // this.$emit("totalProducts",sums[index] );
                        sums[index] += ' 元';
                    }else{
                        sums[index] = '';
                    }
                    
                } else {
                    sums[index] = '';
                }
            });

            return sums;
        }
    },
    filters:{
        filterFloor(value,price){
            if(isNaN(value)){
                
                return 0;
            }else{
                return value.toFixed(2);
            }
        }
    },
    props:{
        goodsList:{
            type:Array
        },
        isHaveAmount:{
            type:Boolean
        }
    },
    data(){
        
        
        let numberTwoValidator = (rule, value, callback) => {
            if(value){
                let reg =  /^(?:0|[1-9][0-9]?|100)$/;
                if(reg.test(value)){
                    callback();
                }else{
                    callback(new Error("请输入0至100的整数"))
                }
            }else{
                callback();
            }
        }
        return {
            selectSum : 0,
            productRules:[
                        { required: true, message: '不能为空', trigger: 'blur' },
                        // { type: 'number', message: '请输入数字', trigger: ['blur,change']  },
                        { pattern:/^[1-9]([0-9]{0,12})$/,message:'请输入13位以内的正整数',trigger:['blur','change'] },
                        ],
            discountRules:[
                // { type: 'number', message: '请输入数字', trigger: ['blur,change'] },
                { validator: numberTwoValidator,trigger:['blur','change'] },
            ],
            result:{},
            des:[]
        }
    },
    watch:{
        selectSum(nVal,oVal){
            this.$emit("totalProducts",nVal );
        }
    },
    computed:{
        
    },
    mounted(){
       
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" >
    // .el-table__row{
    //     .el-form-item__content{
    //         padding: 0;
    //         .el-input{
    //             padding: 0;
    //         }
    //     }
    // }
     @import '../crmcss/css.scss'
</style>

