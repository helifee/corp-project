<template>
    <div class="contract_type">
        <div class="type-con">
            <div class="type-item" v-for="(item,index) in list" :key="index">
                <h3 @click.stop="expendOrCol(index)"><i :class="{'checkStyle':true,'checked':item.checked}" @click.stop="selectCheckedFn(index)"></i>{{item.contractType}}<i :class="{'arrow':true,'down':item.expend}" v-show="item.children ? true :false"></i></h3>
                 <ulTypeItem ref="ulTpye" v-show="item.expend"  v-if="item.children ? true :false" :model="item"></ulTypeItem>
            </div>
        </div>
        <div class="sub-box">
            <x-button mini type="primary" action-type="submit" :disabled="isdisable"  class="sub-btn blue" v-on:click.native="selectFn">确认选择</x-button>
        </div>
    </div>
</template>
<script>
    import {XButton} from 'vux'
    import ulTypeItem from '../../components/m_contract/m_contract_ulTypeItem'
    import service from '../../pages/m_contract/m_contract_service'
    import eventBus from '../../m_eventBus.js'
    export default {
        name:"m_contract_type",
        props:[],
        components: {
            ulTypeItem,
            XButton
        },
        data () {
            return {
                id:"",
                list:[],
                num:"",
                isdisable:true
            }
        },
        mounted(){
            this.id = this.$route.query.id;
            eventBus.$on("setNoChecked",(val)=>{
                this.setNoChecked();
            });
            eventBus.$on("expend",(index,arr)=>{
               this.expend(index,arr);
             });
            eventBus.$on("select",(index,arr)=>{
                this.select(index,arr);
            });
        },
        created(){

        },
        computed:{

        },
        methods: {
            clearValue (value) {
                this.dateValue = ''
            },
            //展开收起
            expendOrCol(index){
                this.list =  Object.assign([], this.expend(index,this.list));
            },
            expend(index,arr){
                arr.forEach((n,i)=>{
                    if(i==index){
                    n.expend = !n.expend;
                }
                });
                arr =  Object.assign([], arr);
                return arr;
            },
            selectCheckedFn(index){
                this.list =  Object.assign([], this.select(index,this.list));
            },
            select(index,arr){
                arr.forEach((n,i)=>{
                    if(i==index){
                        n.checked = !n.checked;
                        if(n.checked)  {this.isdisable= false;} else this.isdisable= true;;
                    }else{
                        n.checked = false;
                    }
                 });
                return arr;
            },
            arrHandler(arr){
                if(arr.length>0){
                    arr.forEach((n)=>{
                        n.checked = false;
                        if(n.children) this.arrHandler(n.children);
                    });
                }
                return arr;
            },
            setNoChecked(){
                this.list = Object.assign([], this.arrHandler(this.list));
            },
            //确定选择
            selectFn(){

            },
            getContractType(){
                service.getContractType().then((data)=>{
                    if(data[0].length && data[0][0].children){
                        this.list = data[0][0].children;
                        if(this.list){
                            this.list.forEach((item)=>{
                                item.checked = false;
                                item.expend = false;
                             });
                        }
                    console.log("--------------");
                        console.log(this.list);
                    }


            });
            }
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/m_contract.scss';
</style>