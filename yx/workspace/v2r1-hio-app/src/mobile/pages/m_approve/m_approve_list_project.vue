<template>
    <div class="approve_list">
        <scroller lock-x :height="height" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" style="width: 100%" :scroll-bottom-offset="50">
           <div>
            <div class="pro-item" v-for="(item,index) in list" @click="approveDetail(item)">
                <span class="img"><icon slot="icon" name="m_approve_edit" scale="2"></icon></span>
                <li>
                    <div class="con">
                        <p class="title"><label>{{item.templateName }}</label><span class="date-right">{{handleTime(item.updateDate)}}</span></p>
                        <p>审批人：{{item.approvalPersonName}}</p>
                        <p>发起人：{{item.createPersonName}}</p>
                        <p>发起时间：{{item.startDate}}</p>
                        <p class="status">{{item.state | approveState}}</p>
                    </div>
                </li>
            </div>
               <load-more tip="loading" v-if="moreData"></load-more>
               <load-more tip="没有更多数据" :show-loading="false" v-else></load-more>
           </div>
        </scroller>
        <div class="common-btn"
             v-if="permission && !isOut"><button @click="rightClick">添加</button></div>
    </div>
</template>
<script>
    import { Scroller,LoadMore } from 'vux'
    import service from '../../pages/m_approve/m_approve_service'
    import u from '../../m_util'
    export default {
        name: "m_approve_list_project",
        components: {
            Scroller,
            LoadMore
        },
        data() {
            return {
                permission:'',//是否有创建权限
                isOut:"",
                id: "",
                list: [],
                count: "",
                pageNum: 1,
                pageCount: 10,
                pageTotal: 1,
                isContinue: true,
                onFetching: false,
                moreData:true,
                loading: false,//是否正在加载
            }
        },
        created() {
            document.title = '审批列表';
//            4==共享人的时候没有创建权限
            this.permission = this.$route.query.permission!=4?true:false;
            this.isOut = this.$route.query.orgType==2 ? true : false;//是否是外部联系人 1 内部 2外部
            if(this.permission && !this.isOut){
                this.height = (window.innerHeight-50)+"px";
            }else{
                this.height = (window.innerHeight)+"px";
            }
        },
        mounted() {
            this.id = this.$route.query.projectId;
            if (this.id) this.getProjectApproveList();
        },
        methods: {
            approveDetail(item){
                this.$router.push({
                    name: 'm_approve_approve',
                    query: {
                        instanceId: item.id,
                        isFormList:true,
                        isFormProject:true
                    }
                });
            },
            onScrollBottom(){
                if(this.loading){
                    this.moreData = true;
                    this.loading = false;
                    console.log("loading more")
                    this.getProjectApproveList();
                }

            },
            handleTime(date) {
                return u.handleDateTimeFn(date);
            },
            //获取审批列表
            async getProjectApproveList() {
                const param = {
                    pageNum: this.pageNum,
                    pageCount: this.pageCount,
                    projectId: this.id
                }
                let res =  await service.getProjectApproveList(param);
                console.log(res[0].list)
                if(res[0].list){
                    if(this.pageNum == 1){
                        this.list =[...res[0].list];
                    }else{
                        console.log(res[0].list,"push")
                        this.list.push.apply( this.list, res[0].list );
                    }
                    if(res[0].list.length<=this.pageCount){
                        this.moreData = false;
                        this.loading = false;
                    }
                    this.pageNum++;
                    this.pageTotal = res[0].pageTotal;
                    this.total = res[0].total;
                    if(!this.moreData)
                    this.loading = true;
                }else{
                    this.loading = false;
                    this.moreData = false;
                }
            },
            //添加跳转到模板发起页面
            rightClick() {
                this.$router.push({
                    name: "m_start_list_project",
                    query: {projectId: this.id}
                });
            }

        },
        filters: {
            //审批状态:0未审批、1已审批、2后端用的、3驳回、4跳过
            approveState(value) {
                switch (value) {
                    case 0:
                        return '未审批';
                    case 1:
                        return '审批中';
                    case 2:
                        return '已完成';
                    case 3:
                    case 7:
                        return '被驳回';
                    case 4:
                        return '草稿';
                    case 5:
                        return '跳过';
                    case 6:
                    case 8:
                        return '退回';
                    default:
                        return '--';
                }
            }
        }
    }
</script>
<style lang="scss">
    @import '../../static/css/m_crm.scss';
    </style>
<style lang="scss" scoped>
   .pro-item{
       margin-top: 10px;
       background: #fff;
       padding: 14px;
       position: relative;
       .img{
           position: absolute;
           left: 14px;
           width: 30px;
           height: 30px;
           display: inline-block;
           background: #FB576A;
           text-align: center;
           border-radius: 100%;
           padding-top: 5px;
           box-sizing: border-box;
       }
       li{
           padding-left: 40px;
           overflow: hidden;
           p{
               font-size: 14px;
               color: #999999;
               letter-spacing: 0;
               line-height: 20px;
           }
           p.title{
               margin-bottom: 8px;
               label{
                   font-size: 16px;
                   color: #191919;
                   line-height: 16px;
                   max-width: 70%;
                   white-space: nowrap;
                   text-overflow: ellipsis;
                   overflow: hidden;
                   display: inline-block;
               }
               .date-right{
                   float: right;
                   color: #ccc;
                   line-height: 16px;
               }
           }
           p.status{
               color: #191919;
               line-height: 14px;
               margin-top: 10px;
           }
       }
   }
</style>