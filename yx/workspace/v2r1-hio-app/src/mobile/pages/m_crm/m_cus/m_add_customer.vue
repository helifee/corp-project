<template>
    <div class="add-customer-box detail pb_60">
        <div class="add-cus-list">
            <div>
                <group label-width="5em" label-margin-right="2em" label-align="left">
                    <x-input class="require" title="客户名称" :show-clear="false" v-model="formData.name" :max='100' :required="true" placeholder="必填..." ></x-input>
                    <x-input title="联系电话" :show-clear="false" v-model="formData.phoneNumber"  :max='20' :is-type="isBeNumber" keyboard="number" placeholder="输入..." ></x-input>
                    <x-input title="电子邮箱" :show-clear="false" v-model="formData.email" :max='70'  is-type="email" placeholder="输入..." ></x-input>
                    <selector class="require" title="客户来源" :options="sourceList" v-model="formData.source"></selector >
                    <selector class="require" title="客户类型" :options="typeList"  v-model="formData.type"></selector >
                    <x-input title="联系地址" :show-clear="false" :max='100' v-model="formData.address" placeholder="输入..." ></x-input>
                    <x-input title="企业网站" :show-clear="false" :max='100' v-model="formData.webSite" placeholder="输入..." ></x-input>
                    <x-input title="负责人" class="no-event require" :disabled="true" :show-clear="false" v-model="myName" :readonly="true" placeholder=""></x-input>
                    <!--<x-input title="共享跟进人" :show-clear="false" v-model="salesmanNames" :dataId="salesmanIds" :readonly="true" placeholder="请选择" class="selectPerson"></x-input>-->
                    <x-textarea title="备注" v-model="formData.comment" 
                        :max="2500" placeholder="输入..."  :rows="3"></x-textarea>
                </group>
                <attachUpload :param="attachInfoParam" v-if="attachInfoParam" ref="uploadCompoment" maxUploadNum="1"></attachUpload>
                <x-button class="bottomBtn"  action-type="submit" @click.native="saveCustomer">提交</x-button>

            </div>
        </div>

    </div>

</template>
<script>
    import mCrmHeader from '../../../components/m_crm_header.vue'
    import attachUpload from '../../../components/attachUpload.vue'
    import mCrmService from '../m_crm_search/m_crm_bservice.js'
    import { Group, XInput, Selector, PopupPicker, XTextarea,XButton   } from 'vux'
    import {AlertModule,Alert} from 'vux'
    export default {
        name:"m_add_customer",
        components: {
            mCrmHeader,
            attachUpload,
            Group,
            XInput,
            Selector,
            PopupPicker,
            XTextarea,
            XButton,
            AlertModule,
            Alert
        },
        data () {
            return {
                show:false,
                id:"",
                myName:"",
                isBeNumber: function (value) {
                    return {
                        valid: !isNaN(value),
                        msg: '只能输入数字'
                    }
                },
                attachInfoParam:"",
                formData:{
                    sid:"",
                    name:"",
                    phoneNumber:"",
                    email:"",
                    source:0,
                    type:1,
                    address:"",
                    webSite:"",
                    comment:""
                },
                sourceList:[
                    {key:1,value:"百度推广"},
                    {key:0,value:"网站"},
                    {key:2,value:"会销"},
                    {key:3,value:"微信"},
                    {key:4,value:"地推"},
                    {key:9,value:"其它"},
                ],
                typeList:[{key:1,value:"潜在客户"},{key:2,value:"普通客户"},{key:3,value:"VIP客户"}],
//                salesmanNames:"",
//                salesmanIds:"",
                isShowPlus:false,
                num:0
            }
        },
        mounted(){
            this.myName = this.$store.state.session.name;
            //获取修改信息
            this.id = this.$route.params.id;
            document.title = this.id ?  '编辑客户' : '新建客户';
            this.num = this.$route.params.num;
            if(this.id) {
                this.formData.sid = this.id;
                this.getCustomerInfo();
            }
            else{
                this.getAttachmentParam(); //附件业务id
            }
        },
        methods: {
            //获取附件信息id
            getAttachmentParam(){
                mCrmService.getAttachmentParam().then((data)=>{
                    console.log(data);
                     if(data[0]){
                         this.formData.sid = data[0].businessId;
                         this.attachInfoParam = {
                             "businessId" : data[0].businessId,
                             "categoryId" : data[0].category,
                             "appId" : data[0].app
                         }
                     }
                });
            },
            //获取单条数据
            getCustomerInfo(){
                let _self = this;
                mCrmService.getCustomerInfoById(_self.id).then(function(data){
                    console.log(data);
                    if(data[0]){
                        _self.formData = data[0];
                        _self.myName = data[0].ownerPersonName;//负责人
                        delete _self.formData.contacts;
                        delete _self.formData.status;
                        _self.attachInfoParam = {
                            "businessId" : data[0].attachmentParam.businessId,
                            "categoryId" : data[0].attachmentParam.category,
                            "appId" : data[0].attachmentParam.app
                        }
                    }
                });
            },
            //保存表单数据
            async saveCustomer(){
                if(!this.formData.name){
                    AlertModule.show({
                        content: '客户名称不能为空!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 2000)
                    return;
                }

                if($(".weui-cell.weui-cell_warn").length){
                    AlertModule.show({
                        content: '存在不合法输入!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 2000)
                    return;
                }
               let res = await mCrmService.saveCustomer(this.formData);
                if(res){
                   let attachDataInfo = await this.$refs.uploadCompoment.saveAttachFn();
                    let that = this;
                    AlertModule.show({
                        content: '保存成功!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                        that.$router.go(-1);
                    }, 2000)
                }
            },
            goBack(){
                let that = this;
                setTimeout(function(){
                    that.$router.push({
                        name: 'm_customer',
                        query: {
                            num:this.num
                        }
                    });
                },2000);
            }
        }
    }
</script>
<style lang="scss">
    @import '../../../static/css/m_crm_add.scss';
    @import '../../../static/css/m_crm_detail.scss';
</style>