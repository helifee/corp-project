<template>
    <div class="m_project_detail">
        <div>
            <group label-width="6em" label-margin-right="2em" label-align="left">
                <cell title="会议主题" align-items="flex-start" >
                    <div class="rightBd text_l_r"  slot>{{detail.mtTitle}}</div>
                </cell>
                <cell title="实际开始时间" :value="detail.beginDate" >

                </cell>
                <cell title="实际召开地点" :value="detail.endDate"></cell>
            </group>
            <group label-width="6em" label-margin-right="2em" label-align="left">
                <cell title="要求参会成员" align-items="flex-start" >
                    <div class="rightBd text_l_r"  slot>{{detail.meetingAttendeesNameList | filterArrName}}</div>
                </cell>
                <cell title="实际参会成员"  >
                    <div class="rightBd text_l_r"  slot>{{detail.actualAttendeesNameList | filterArrName}}</div>
                </cell>
            </group>
            <group label-width="6em" label-margin-right="2em" label-align="left">
                <attachItem v-if="attachInfoParam.appId" :param="attachInfoParam"></attachItem>
            </group>
            <group label-width="6em" label-margin-right="2em" label-align="left">
                <div class="m_summary_bd">
                    <div class="m_project_tit">会议内容</div>
                    <div class="m_project_info">
                        <!-- <pre> -->
                        {{detail.meetingContent}}
                        <!-- </pre> -->
                    </div>
                </div>
                
            </group>
            <group label-width="6em" label-margin-right="2em" label-align="left">
                <div class="m_summary_bd">
                    <div class="m_project_tit">会议记录</div>
                    <div class="m_project_info">
                        <!-- <pre> -->
                        {{detail.meetingRecord}}
                        <!-- </pre> -->
                    </div>
                </div>
                
            </group>
            <group label-width="6em" label-margin-right="2em" label-align="left">
                <div class="m_summary_bd">
                    <div class="m_project_tit">会议决议</div>
                    <div class="m_project_info">
                        <!-- <pre> -->
                            {{detail.meetingResult}}
                        <!-- </pre> -->
                        
                    </div>
                </div>
                
            </group>
            <group label-width="6em" label-margin-right="2em" label-align="left">
                <div class="m_summary_bd">
                    <div class="m_project_tit">备注</div>
                    <div class="m_project_info">
                        <!-- <pre> -->
                            {{detail.remarks}}
                        <!-- </pre> -->
                        
                    </div>
                </div>
                
            </group>
        </div>
    </div>
</template>
<script>
import { Group,XInput,Selector,PopupPicker,XAddress,XTextarea,Cell,Grid, GridItem ,Actionsheet} from 'vux'
import attachItem from '../../components/attachItem.vue'
import dService from '@mobile/pages/m_details/detailService.js'
export default {
    components: {
            Group,
            XInput,
            Selector,
            PopupPicker,
            XAddress,
            XTextarea,
            Cell,
            Grid,
            GridItem,
            Actionsheet,
            attachItem
        },
    filters:{
        filterArrName (val){
            let str = "";
            if(val){
                val.forEach(element => {
                    str += " " +element
                });
            }
            return str;
        }
    },
    created(){
        document.title = "会议纪要";
    },
    methods:{
        async getdetail(){
            let id = this.$route.params.id;
            // let id = "2667833"
            let res = await dService.getMeetSummary(id);
            if(res.status == "200"){
                this.detail = res.result;
                document.title = res.result.mtTitle;
                this.attachInfoParam = {
                    appId: this.detail.accessoryIdDto.appId,
                    categoryId: this.detail.accessoryIdDto.categoryId,
                    businessId : this.detail.accessoryIdDto.businessId
                }
            }
        }
    },
    data(){
        return {
            detail : {},
            attachInfoParam : {
                appId: null,
                categoryId: null,
                businessId : null
            }
        }
    },
    mounted(){
        this.getdetail();
    }
}
</script>
<style lang="scss" scoped="scoped">
    @import '../../static/css/common.scss';
    .m_project_detail{
    padding-bottom: 60px;
    .m_summary_bd{
        padding: 14px 15px;
        .m_project_tit{
            font-size: 16px;
            color: #191919;
            margin-bottom: 10px;
        }
        .m_project_info{
            color:#666666;
            font-size:17px;
            // pre{
                word-wrap:break-word;
                word-break:break-all;
            // }
        }
    }
    .nav-wrap{
        background-color: #ffffff;
    }

    .btnGroups {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top:1px solid #d9d9d9;
        button {
            width: 100%;
            float: left;
            height: 50px;
            background-color: #ffffff;
            color: #009EFF;
            font-size: 16px;
            border: 0;
        }
    }
    .list_icon{
        width:30px;
        height:30px;
        line-height:30px;
        text-align:center;
        background-color:#0ABF86;
        color:#fff;
        border-radius:50%;
        margin-right:20px;
        position: relative;
        svg{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

}
</style>

<style lang="scss">
    body{
        overflow: auto!important;
    }
    
    .m_project_detail{
        .weui-grid:after{
            border-bottom: none;
        }
        .weui-grid__label{
            color: #191919;
            font-size: 12px;
        }
        .vux-label{
            font-size: 16px;
            color: #191919;
        }
        .weui-cell__ft{
            font-size: 16px;
            color: #666666;
        }
        .weui-cell__ft{
            color: #666666;
        }
        .weui-actionsheet__action{
            .weui-actionsheet__cell{
                color: #999999;
            }
        }

    }
</style>

