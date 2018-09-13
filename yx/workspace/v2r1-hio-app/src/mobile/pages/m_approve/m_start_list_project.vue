<template>
    <div class="start_list">
        <!--<div class="clearfix">-->
            <!--<div class="search-btn-box">-->

                <!--<div class="search-btn" style="cursor: pointer" @click="toSearchPage">-->
                    <!--<i class="search-i"></i>-->
                    <!--<span>搜索</span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <tab active-color='#009EFF'>
            <tab-item  active-class="current" :selected="num==index" v-for="(item,index) in list" :key="index" v-if="item.childList.length>0" @on-item-click="num=index">{{item.name}}</tab-item>
        </tab>
        <div id="menu_list_data">
            <div class="cont-tab-box" v-show="index==num" v-for="(item,index) in list">
                <div class="list-sort-show">
                    <ul class="list-sort-ul">
                        <li @click="toApproveStart(n)" v-for="(n,i) in item.childList">
                            <h2 class="icon-my icon-my-s2">
                                <span class="title">{{n.name}}</span>
                            </h2>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem  } from 'vux'
    import service from '../../pages/m_approve/m_approve_service'
    export default {
        name:"m_start_list_project",
        components: {
            Tab,TabItem
        },
        data () {
            return {
                projectId:"",
                num:0,
                list:[],
                draftList:[],
                pageNum:"1",
                pageCount:"10",
                pageTotal:"1",
                isContinue:false

            }
        },
        created(){
            document.title = '审批类别';
        },
        mounted(){
            this.projectId = this.$route.query.projectId;
            this.getTemplateList();
        },
        methods: {
            toSearchPage(){
                this.$router.push({
                    name: 'm_start_search'
                });
            },
            toApproveStart(item){
                if(item.freeOrTemplate=="F"){
                    this.$router.push({
                        name: 'm_approve_free',
                        query: {
                            id: item.sid,
                            code:item.code,
                            projectId:this.projectId,
                            fromWhere:"project"
                        }
                    });
                }else{
                    this.$router.push({
                        name: 'm_approve_start',
                        query: {
                            id: item.sid,
                            code:item.code,
                            projectId:this.projectId,
                            fromWhere:"project"
                        }
                    });
                }

            },
            //分类和模板列表
            getTemplateList(){
                service.getTemplateList().then((data)=>{
                    console.log(data[0]);
                    this.list = data[0];
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../static/css/fill-style.css';
    @import '../../static/css/list.css';
    .cont-tab-box{
        position: static;
    }
    .vux-tab .vux-tab-item{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
<style lang="scss">
    body{
        background: #fff!important;
        overflow: auto!important;
    }
</style>