<template>
    <div class="approve_list">
        <div class="tab-box clearfix">
            <p><a  @click="tabClick(1,1);getApproveList(1)" class="ds_tab" v-bind:class="num=='1' ? 'current':''"  key="ds"><img src="../../static/images/sp_daishen@2x.png" class="menu-img"><br><span>待审</span><label class="num-style" v-if="count1">{{count1}}</label></a></p>
            <p><a  @click="tabClick('',2);getNoReadList(1)" class="dy_tab" v-bind:class="num=='2' ? 'current':''"  key="dy"><img src="../../static/images/sp_daiyue@2x.png" class="menu-img"><br><span>待阅</span><label class="num-style" v-if="count2">{{count2}}</label></a></p>
            <p><a  @click="tabClick(2,3);getApproveList(1)" class="yb_tab" v-bind:class="num=='3' ? 'current':''"  key="yb"><img src="../../static/images/sp_yiban@2x.png" class="menu-img"><br><span>已办</span></a></p>
            <p><a  @click="tabClick('',4);getMyLunchList(1)" class="wfqd_tab" v-bind:class="num=='4' ? 'current':''"  key="wfqd"><img src="../../static/images/sp_wofaqide@2x.png" class="menu-img"><br><span>我发起的</span></a></p>
        </div>
        <div class="con-list">
            <my_scroller v-if="num=='1'" ref="myScroll1" v-on:getList="getApproveList" v-on:gotoDetail="approveDetail" :pageNum="pageNum1" :pageTotal="pageTotal1" :isContinue="isContinue1" scrollPage="approveListPanel1" :list="list1"></my_scroller>
            <my_scroller v-if="num=='2'" ref="myScroll2" v-on:getList="getNoReadList" v-on:gotoDetail="approveDetail" :pageNum="pageNum2" :pageTotal="pageTotal2" :isContinue="isContinue2" scrollPage="approveList" :list="list2"></my_scroller>
            <my_scroller v-if="num=='3'" ref="myScroll3" v-on:getList="getApproveList" v-on:gotoDetail="approveDetail" :pageNum="pageNum3" :pageTotal="pageTotal3" :isContinue="isContinue3" scrollPage="approveList" :list="list3"></my_scroller>
            <my_scroller v-if="num=='4'" ref="myScroll4" v-on:getList="getMyLunchList" v-on:gotoDetail="approveDetail" :pageNum="pageNum4" :pageTotal="pageTotal4" :isContinue="isContinue4" scrollPage="approveList" :list="list4"></my_scroller>

        </div>
    </div>
</template>
<script>
    import my_scroller from '../../components/m_crm_scroll.vue'
    import service from '../../pages/m_approve/m_approve_service'
    export default {
        name:"m_approve_list",
        components: {
            my_scroller
        },
        data () {
            return {
                list1:[],
                list2:[],
                list3:[],
                list4:[],
                state:'1',
                num:'1',
                count1:"",
                count2:"",
                count3:"",
                count4:"",
                pageNum1:1,
                pageNum2:1,
                pageNum3:1,
                pageNum4:1,
                pageCount:10,
                pageTotal1:1,
                pageTotal2:1,
                pageTotal3:1,
                pageTotal4:1,
                isContinue1:false,
                isContinue2:false,
                isContinue3:false,
                isContinue4:false,
                beforeSendAjax:false

            }
        },
        created(){
            document.title = '流程审批';
        },
        mounted(){
            this.num = this.$route.query.num ? this.$route.query.num : "1";
            //this.getApproveList(1);
            switch (this.num) {
                case '1':
                    this.getApproveList(1);
                    break;
                case '2':
                    this.getNoReadList(1)
                    break;
                case '3':
                    this.state = 2;
                    this.getApproveList(1);
                    break;
                case '4':
                    this.getMyLunchList(1)
                    break;
            }
            this.getNumInfo("1");
            this.getNumInfo("2");
            //this.getNumInfo("3");
            //this.getNumInfo("4");
        },
        methods: {
            approveDetail(item){
                this.$router.push({
                    name: 'm_approve_approve',
                    query: {
                        instanceId: item.id,
                        isFormList:true,
                        num:this.num
                    }
                });
            },
            getMyLunchList(pageNum){
                this.num = '4';
                let params = this.handleParams(pageNum);
                if(!params) return;
                let pageTemp = params[0];
                let totalTemp = params[1];
                const param = {
                    pageNum:this[pageTemp],
                    pageCount:this.pageCount
                };
                this.ajaxFn(param,"/instance/getPage",totalTemp,pageTemp);
            },
            getNoReadList(pageNum){
                this.num = "2";
                let params = this.handleParams(pageNum);
                if(!params) return;
                let pageTemp = params[0];
                let totalTemp = params[1];
                const param = {
                    pageNum:this[pageTemp],
                    pageCount:this.pageCount,
                    isRead:"1"
                };
                this.ajaxFn(param,"/copy/getPage",totalTemp,pageTemp);
            },
            ajaxFn(param,url,totalTemp,pageTemp){
                if(this.beforeSendAjax) return;
                JZY.xhr.r([{
                    type: 'post',
                    url: url,
                    data: param,
                    beforeSend(xhr){
                        this.beforeSendAjax = true;
                    },
                }], 'GLOBAL.ZHANG_CHAOYANG', false, {alertError:true,alertSuccess:false}).then((res) => {
                    try {
                        this.callBackFn(res,totalTemp,pageTemp);
                        this.beforeSendAjax = false;
                    } catch (e) {
                        this.beforeSendAjax = false;
                        return false;
                    }
                }).catch((e) => {
                    this.beforeSendAjax = false;
                    this.isError = true;
                    //接口失败
                    throw new Error(e)
                });

            },
            tabClick(state,num){
                if(state) this.state = state;
                if(num) this.num = num;
                this['list'+this.num] = [];
            },
            callBackFn(data,totalTemp,pageTemp){
                if(data[0]){
                    if(data[0].list){
                        if(this[pageTemp]==1) this['list'+this.num] = data[0].list;
                        else  this['list'+this.num].push.apply(this['list'+this.num],data[0].list);
                        this[totalTemp] = data[0].pageTotal;
                        this[pageTemp] = data[0].pageNum;

                        this["isContinue"+this.num] = this[pageTemp]<this[totalTemp];
                        this.$refs['myScroll'+this.num].isJixuFn(this["isContinue"+this.num]);

                    }else{
                        this['list'+this.num] = [];
                        this["isContinue"+this.num] = false;
                        this.$refs['myScroll'+this.num].isJixuFn(this["isContinue"+this.num]);
                    }
                }
            },
            handleParams(pageNum){
                let pageTemp = "pageNum"+this.num;
                let totalTemp = "pageTotal"+this.num;
                let isContinueTemp = "isContinue"+this.num;
                if(pageNum) this[pageTemp] = pageNum;
                if(this[pageTemp]>this[totalTemp]){
                    this[isContinueTemp] = false;
                    this.$refs['myScroll'+this.num].isJixuFn(this[isContinueTemp]);
                    return;
                }
                return [pageTemp,totalTemp];
            },
            getApproveList(pageNum){
                let params = this.handleParams(pageNum);
                if(!params) return;
                let pageTemp = params[0];
                let totalTemp = params[1];
                const param = {
                    pageNum:this[pageTemp],
                    pageCount:this.pageCount,
                    state:this.state
                };
                this.ajaxFn(param,"/approval/getPage",totalTemp,pageTemp);
            },
            getNumInfo(num){
                service.getApproveNum(num).then((data)=>{
                    if(data[0]){
                    let temp = 'count'+num;
                    this[temp] = data[0];
                    if(parseInt(data[0])>99){
                        this[temp] = "99+";
                    }
                }
            });
            }

        }
    }
</script>

<style lang="scss">
    @import '../../static/css/approve_list.css';
    body{
        background: #fff!important;
        overflow: auto!important;
    }
    .menu-img{
        width: 48px;
        height: 48px;
        display: inline-block;
        vertical-align: middle;
    }
</style>