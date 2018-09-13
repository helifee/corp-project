<template>
    <div class="popBox" ref="pts" v-show="dialogVisible">
        <ul class="m_list_product">
            <li v-for="(item,index) in selectList">
            
                <div class="checkBd" @click.stop="setSelected(item,index)"  v-if="type=='opportunity'">
                    <span class="icon_bg1" v-show="!item.selected">
                    <x-icon type="ios-circle-outline" size="30"></x-icon>
                    </span>
                    <span class="icon_bg2" v-show="item.selected">
                        <x-icon type="ios-checkmark" size="30"></x-icon>
                    </span>
                </div>
                <div class="flex_bd" @click.stop="openDetails(item)" v-if="showCheck">
                <!-- <div class="flex_bd" @click.stop="openDetails(item)"> -->
                    <div class="flex_fr" >
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
                        <!-- <x-number align="left" v-if="!showCheck"  v-model="item.productCount" :min="1" :max="10000000000" width="24px"></x-number> -->
                        <div class="mb10">
                           <h2 class="title">单价(元/{{item.unit}}) </h2>
                            <p class="dec"> {{item.price}}</p> 
                        </div>
                        <div>
                           <h2 class="title">折扣 </h2>
                            <p class="dec"> {{(item.discount || item.discount === 0) ? item.discount : 100}}%</p> 
                        </div>
                    </div>
                </div>
                <div class="flex_bd" v-else>
                <!-- <div class="flex_bd" @click.stop="openDetails(item)"> -->
                    <div class="flex_fr" >
                        <div>
                            <h2 class="title">{{ item.name }} </h2>
                            <p class="dec">{{item | filterName}}</p>
                        </div>
                        <div>
                            <h2 class="title">总价(元)</h2>
                            <p class="dec">{{item.total}}</p>
                        </div>
                    </div>
                    <div class="flex_ft">
                        <x-number align="left" v-model="item.productCount" :min="1" :max="10000000000" width="24px"></x-number>
                        <!-- <span v-if="showCheck" class="productCount">数量/{{item.productCount}}</span> -->
                    </div>
                </div>

            </li>
        </ul>
        <div class="bottom_modalProduct">
            <div class="text" @click="back">取消</div>
            <div class="button" @click="save" v-if="type=='opportunity'">保存</div>
        </div>
        <productDetail class="m_pDetailsPage"
            @close="openDetails"
            :detail.sync="productContent"
            :showType="showType"
            :showEdit="showCheck"
          v-if="pcoductDetailshow">
          </productDetail>
    </div>

</template>
<script>
    import { XNumber } from 'vux'
    import productDetail from './productDetail.vue'
    

    export default {
        components: {
            XNumber,
            productDetail
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            selectList:{
                type:Array
            },
            showCheck:{
                type:Boolean
            },
            type:{
                type : String
            },
            showType:{
                type: Boolean
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
            openDetails(item){
                this.pcoductDetailshow = !this.pcoductDetailshow;
                item ? (this.productContent = item) : '';
            },
            setSelected(item,index,type){
                item.selected = !item.selected;
                this.$set(this.selectList, index, item);
                //修改父组件节点的视图
                if(!item.selected){
                    let productList = this.$parent.productList;
                    let key = productList.findIndex((value, index, arr) => {
                        if(value.sid == item.productId){
                            return item;
                        }
                    })
                    if(key > 0){
                        this.$set(this.$parent.productList,key,item);
                    }
                }
                
            },
            back(){
                if(this.showCheck){
                    this.$emit("closeAll");
                }else{
                    this.$emit("closeModal");
                }
                
                // this.$emit("closeAll");
            },
            save(){
                this.$emit("closeModal");
                this.$emit("save")
            }
        },
        mounted(){

        },
        data () {
            return {
               pcoductDetailshow : false
            }
        }
    } 
</script>

