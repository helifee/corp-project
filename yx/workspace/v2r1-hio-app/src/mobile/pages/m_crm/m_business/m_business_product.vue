<template>
    <div class="productPageShow">
        <div class="wrapPage_product">
            <ul class="m_list_product">
                <li v-for="(item,key,index) in productList">

                    <div class="checkBd" @click="setSelected(item,key,true)">
                        <span class="icon_bg1" v-show="!item.selected">
                            <x-icon type="ios-circle-outline" size="30"></x-icon>
                        </span>
                        <span class="icon_bg2" v-show="item.selected">
                            <x-icon type="ios-checkmark" size="30"></x-icon>
                        </span>
                    </div>
                    <div class="flex_bd">
                        <div class="flex_fr">
                            <div class="mb10">
                                <h2 class="title">{{ item.name }} </h2>
                                <p class="dec">{{item | filterName}}</p>
                            </div>
                        <div>
                            <h2 class="title">总价(元)</h2>
                            <p class="dec">{{item.total}}</p>
                        </div>
                    </div>
                        <div class="flex_ft">
                            <x-number align="left" v-if="!showCheck" v-model="item.productCount" :min="1" :max="10000000000" width="24px"></x-number>
                            <div v-if="showCheck">
                                <div class="mb10">
                                    <h2 class="title">单价(元/{{item.unit}}) </h2>
                                    <p class="dec"> {{item.price}}</p> 
                                </div>
                                <div>
                                    <h2 class="title">折扣 </h2>
                                    <p class="dec"> {{(item.discount || item.discount === 0) ? item.discount : 100}}%</p> 
                                </div>
                            </div>
                            <!-- <span v-if="showCheck" class="productCount">数量/{{item.productCount}}</span> -->
                        </div>
                    </div>
                </li>
            </ul>
            <myloadMore :currentTotal="currentTotal" :pageNum="pageNum" :status="status" :total="total" @getPageNum="getPageNum"></myloadMore>

        </div>
        <div class="bottom b_product_m">
            <div class="text" @click="openDialog">已选中{{totalSelect}}</div>
            <div class="button button_f" @click="closePage">取消</div>
            <div class="button" @click="sure">确定</div>
            
        </div>
        <selectResultProduct 
        :dialogVisible="visibleModal"
         @closeAll="closePage"
         @closeModal="openDialog" 
         @save="saveBusiness"
         :showCheck="showCheck"
         :type="type"
         :selectList.sync="selectedProductList"></selectResultProduct>
        <toast v-model="showPositionValue" type="text" :time="800" is-show-mask position="top">{{message}}</toast>

    </div>
</template>
<script>
    import { XNumber,Toast  } from 'vux'
    import myloadMore from './loadMore.vue'
    import bService from '@mobile/pages/m_crm/m_business/b_service.js'
    import selectResultProduct from "@mobile/pages/m_crm/m_business/modalProduct.vue"

    export default {
        name:"proPage",
        components: {
            myloadMore,
            XNumber,
            Toast  ,
            selectResultProduct,
        },
        props:{
            // businessId:{
            //     type:String
            // }
            list : {
                type : Array
            },
            showCheck:{
                type:Boolean
            },
            type:{
            type : String,
        }
        },
        filters:{
            filterName(obj){
                let str = "";
                if(obj){
                    if(obj.categoryBaseName){
                        str += obj.categoryBaseName;
                    }
                    str += obj.categoryName ? " / " + obj.categoryName : ""
                }
                return str;
            }
        },
        methods: {
            
            closePage(){
                this.$emit("close");
            },
            openDialog(){
                this.visibleModal = !this.visibleModal;
                //重新设置值
                if(this.visibleModal){
                    this.selectedProductList = [];
                    this.selectedProductList = this.filterObj(this.resultList,this.selectedProductList); 
                }
                
            },
            setSelected(item,index,type){
                item.selected = !item.selected;
                item.productId = item.sid;
                this.$set(this.productList, index, item);
               
                if(item.selected){
                    this.resultList[item.sid] = item;
                }else{
                    delete this.resultList[item.sid];
                }
            },
            getPageNum(val){
                this.pageNum = val;
                this.getAllProductFn();
            },
            async getAllProductFn(){
                //产品列表
                let param = {
                    pageNum:this.pageNum,
                    pageCount:this.pageCount,
                    cateleveOneId:"",
                    cateLeveTwoId:"",
                    productName:""
                }
                param = JSON.stringify(param);
                let products = await bService.getProductByType(param,"other");
                if(products.status == "200"){
                    this.total = products.result.total;
                    this.setSelectedList(products.result.list);

                }
            },
            setSelectedList(data){
                //已选产品this.resultList
                let arr = [];
                if(data && data.length){
                    for(let i = 0; i<data.length; i++){
                        let item = data[i];
                        if(this.resultList[item.sid]){
                            $.extend(item,this.resultList[item.sid]);
                            item.selected = true;
                        }else{
                            item.selected = false;
                        }
                        arr.push(item);
                    }
                }
                this.productList = this.productList.concat(arr);
                this.currentTotal = this.productList.length;
                
            },
            async getProcuetFn(){
                if(!this.showCheck){
                    this.getAllProductFn();
                    this.resultList = this.filterArr(this.list,this.resultList);
                }else{
                    this.resultList = this.filterArr(this.list,this.resultList);
                    this.openDialog();
                }
                
                
                return;
                let query = this.$route.query;
                let businessId = query.businessId;
                let type = query.type == "true" ? true : false;  //true 订单  false 商机 

                let show = query.show;     //是否是展示产品
                this.showCheck = (show == "true") ? true : false;
                //业务Id
                let currentId = businessId || this.businessId;
               
                //编辑商机或订单的产品
                let result = await bService.getOpportunities(currentId,type);
                if(result.status == "200"){
                    this.details = result.result;
                    
                    if(type){
                        this.resultList = this.filterArr(this.details.orderProducts,this.resultList);
                    }else{
                        this.resultList = this.filterArr(this.details.opportunityProducts,this.resultList);
                    }
                    if(this.details.opportunityProducts && this.details.opportunityProducts.length ||
                        this.details.orderProducts && this.details.orderProducts.length
                    ){
                        // this.openDialog();
                    }
                }
                if(this.showCheck){
                    this.getAllProductFn();
                }
                
                
            },
            sure(){
                this.selectedProductList = [];
                this.selectedProductList = this.filterObj(this.resultList,this.selectedProductList); 
                this.saveBusiness();
            },
            async saveBusiness(){
                // if(this.selectedProductList && this.selectedProductList.length){
                    
                    let param = this.details;

                    this.selectedProductList = this.filterSelected(this.selectedProductList);
                    let error;
                    for(let i = 0;i<this.selectedProductList.length;i++){
                        let temp = this.selectedProductList[i];
                        error || temp.productCount || (error = "请输入产品数量");
                        break; 
                    }
                    if(error){
                        this.message = error;
                        this.showPositionValue = true;
                        return;
                    }
                    this.selectedProductList.forEach(element => {
                        element.total = (Number(element.discount)||100)/100 * Number(element.price) * Number(element.productCount).toFixed(2);
                    });
                    // return;
                    this.closePage();
                    this.$emit("reloadFn",this.selectedProductList);
                    // param.opportunityProducts = this.selectedProductList;
                    // param = { data : JSON.stringify(param)};

                    // let saveSign = await bService.saveOpportunities(param);
                    // if(saveSign.status == "200"){
                    //     this.message = saveSign.message;
                    //     this.showPositionValue = true;
                    //     this.closePage();
                    //     // this.$router.go(-1);
                    //     // this.$router.push("/m_business");
                    // }
                    
                // }
                
            },
            filterSelected(data){
                let arr = [];
                if(data && data.length){
                    for(let i = 0; i< data.length; i ++){
                        if(data[i].selected){
                            arr.push(data[i])
                        }
                    }
                }
                return arr;
            },
            //将数组转换成对象
            filterArr(data,result){
                if(data && data.length){
                    for(let i = 0; i< data.length; i ++){
                        data[i]['selected'] = true;
                        result[data[i].productId] = data[i];
                    }
                }
                return result;
            },
            // 将对象转换成数组
            filterObj(data,result){
                result = [];
                for(let key in data){
                    if(data[key]['selected']){
                        result.push(data[key]);
                    }
                }
                return result;
            }
        },
        mounted(){
            this.getProcuetFn();
            
        },
        data () {
            return {
                tempProduct:[],
                showPositionValue:false,
                message:"",
                visibleModal:false,
                resultList:{},
                productList:[],
                selectedProductList:[],
                status:false,
                currentTotal:0,
                pageCount:10,
                pageNum:1,
                total:0,
                // showCheck:false  //是否显示编辑按钮
            }
        },
        computed:{
            // productList(){
            //     this.tempProduct 

            // }
            totalSelect(){
                let index = 0;
                this.productList.map((item)=>{
                    if(item.selected){
                        index ++
                    }
                })
                return index;
            }
        }
    } 
</script>
<style lang="scss">
    @import '../../../static/css/business.scss';
</style>

<style lang="scss" scoped>
    @import '../../../static/css/n_myCss.scss';
</style>