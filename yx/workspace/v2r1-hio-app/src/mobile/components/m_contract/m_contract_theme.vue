<template>
    <div class="contract_type">
        <div class="search-box">
            <input type="text" v-model="title" class="my-search-input"/><a class="crm_a" @click="searchFn">确定</a>
        </div>
        <div class="search-con">
            <div class="type-item item">
                <h3 v-for="(item,index) in list" :key="index"><span>{{item.title}}</span><i :class="{'checkStyle':true,'checked':item.checked}" @click="checkedFn(index,item)"></i></h3>
            </div>
        </div>
        <div class="sub-box">
            <x-button mini type="primary" action-type="submit" :disabled="isdisable"  class="sub-btn blue" v-on:click.native="selectFn">确认选择</x-button>
        </div>
    </div>
</template>
<script>
    import {XButton} from 'vux'
    import service from '../../pages/m_contract/m_contract_service'
    import moment from '../../../../static/moment/src/moment.js'
    export default {
        name:"m_contract_type",
        props:["type"],
        components: {
            XButton
        },
        data () {
            return {
                id:"",
                checked:false,
                isdisable:true,
                num:"",
                list:[],
                title:""
            }
        },
        mounted(){
            this.id = this.$route.query.id;
        },
        methods: {
            checkedFn(index){
                this.list.forEach((n,i)=>{
                    if(i==index){
                        n.checked =  !n.checked;
                        if(n.checked) {this.num = index;this.isdisable = false;} else this.isdisable = true;
                    }else{
                        n.checked = false;
                    }
                });
                this.list = Object.assign([], this.list);
            },
            selectFn(){
                let item = this.list[this.num];
                let obj = {};
                const commonObj = {
                    contractId: item.sid,
                    contractTypeId: item.contractTypeId,
                    contractTypeName: item.contractTypeName,
                    contractTitle: item.title,
                    code: item.code,
                    signingDate: item.signingDate,
                    money: item.money,
                    firstParty: item.firstParty,
                    secondParty: item.secondParty,
                    payee: item.payee
                }
                    if(this.type=='pay'){ //付款合同信息
                        obj = object.assign({},commonObj,{
                            startDate:item.signingDateBegin,
                            endDate:item.signingDateEnd,
                            summary:item.summary,
                            paymentAgreement:item.paymentAgreement,
                            remark:item.remark
                        });
                    }else{ //
                        obj = object.assign({},commonObj,{
                            operatorId:item.operatorId,
                            operatorDeptId:item.operatorDeptId,
                            operatorName:item.operatorName ,
                            operatorDeptName :item.operatorDeptName ,
                            sumPayMoney:item.sumPaymentMoney,
                            sumChangeMoney:item.sumChangeMoney,
                            status:item.status,
                            balanceStatus:item.balanceStatus
                        });
                    }
                this.$emit("selectThemeAfter",obj);
            },
            //搜索
            searchFn(){
                this.getContractList();
            },
            clearValue (value) {
                this.dateValue = ''
            },
            //列表查询后回调
            callBackFn(data){
                this.list = data[0].list;
                if(this.list){
                    this.list.forEach((item)=>{
                        item.checked = false;
                    });
                }
            },

            getContractList(){
                const param = {
                    pageCount:"10",
                    pageNum:"1",
                    title:this.title,
                    status:"2"
                }
                service.getContractList(param).then((data)=>{
                    this.callBackFn(data);
                    console.log(data);
            });
            }
        }
    }
</script>

<style lang="scss">
    @import '../../static/css/m_contract.scss';
</style>