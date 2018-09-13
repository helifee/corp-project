<template>
    <div class="m_pdetil">
        <div class="bd">
           <group>
                <cell title="产品名称" :value="detail.name" ></cell>
                <cell title="产品类别" >
                    <span slot="value">
                        {{detail | filterName}}
                    </span>
                </cell>

                <cell title="数量" :value="detail.productCount"  v-if="!isEdit">
                    <span class="value">
                        {{detail.productCount}}
                    </span>
                </cell>
                <cell title="数量" :value="detail.productCount"  v-if="isEdit">
                    <span class="value">
                        <x-number align="left"  v-model="detail.productCount" :min="1" :max="10000000000" width="24px"></x-number>
                    </span>
                </cell>
                <!-- <x-input title="数量" text-align="right" v-model="detail.productCount" type="number" :max="15"></x-input> -->

                <cell title="单价" :value="detail.price"></cell>

                <cell title="折扣" :value="detail.discount"  v-if="!isEdit"></cell>
                
                
                <x-input title="折扣"  v-if="isEdit" v-model="detail.discount" text-align="right"></x-input>
                <cell title="总价"  v-if="!isEdit">
                    <span slot="value">
                        {{detail.total  | filterTotal}}
                    </span>
                </cell>
                <cell title="总价"  v-if="isEdit">
                    <span slot="value">
                        {{detail.total = (detail.discount||100)/100 * detail.price * detail.productCount | filterTotal}}
                    </span>
                </cell>

                <cell title="备注" v-if="!isEdit">
                    <span slot="value">
                        {{detail.comment}}
                    </span>
                </cell>
                <!-- <x-input title="备注" text-align="right" :max="200"></x-input> -->
                <x-textarea  v-if="isEdit" title="备注" :max="200" :rows="8" :cols="30" name="备注" v-model="detail.comment" placeholder="备注"></x-textarea>

            </group> 
        </div>
        
        <div class="bottom"  v-if="!showType">
        <!-- <div class="bottom"> -->
            <div class="button" @click="back">取消</div>
            <div class="button" @click="del">删除</div>
            <div class="button" @click="editFn" v-if="!isEdit">编辑</div>
            <div class="button" @click="sure" v-if="isEdit">确定</div>
        </div>
        <div class="bottom "  v-else>
            <div class="button_all" @click="back">取消</div>
        </div>
    </div>
</template>
<script>
import { XInput, Group, XButton, Cell,XTextarea,XNumber  } from 'vux'
export default {
    components: {
            Group,
            Cell ,
            XInput,
            XButton,
            XTextarea,
            XNumber
        },
    props:{
        showType:{
            type: Boolean
        },
        detail : {} ,
        showEdit : {
            type : Boolean
        },
        type:{
            type : Boolean
        }
    },
    filters:{
        filterTotal(val){
            if(val || val === 0){
                
                return Number(val).toFixed(2)
            }else{
                return val;
            }
        },
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
    data(){
        return {
            
            isEdit : false
        }
    },
    methods:{
        back(){
            this.$emit("close");
        },
        del(){
            this.$emit("delProdcut",this.detail);
            this.$emit("close")
        },
        editFn(){
            this.isEdit = !this.isEdit
        },
        sure(){
            let reg = /^(?:0|[1-9][0-9]?|100)$/;
            if(this.detail.discount===0 || this.detail.discount){
                if(!reg.test(this.detail.discount)){
                    this.$alert("请输入0至100的整数");
                    return;
                }
            }
            
            this.$emit("editProdcut",this.detail);
            this.$emit("close")
        }
    }     
}
</script>



