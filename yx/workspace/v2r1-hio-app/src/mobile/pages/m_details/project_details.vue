<template>
    <div class="details_page detail">
        <div class="title">
            <h2>{{detail.projectName}}</h2>
        </div>
        
        <group :gutter="0">
            <cell title="负责人" :value="detail.projectResponsiblePersonName"></cell>
            <cell primary="content" value-align='left' title="参与人" :value="detail.projectParticipantPersonList | projectList">
                <div class="rightBd" slot>{{detail.projectParticipantPersonList | projectList}}</div>
            </cell>
            <cell title="起止日期" >
                <slot name="value">
                   {{detail.projectStart}}<br/>
                   {{detail.projectEnd}}
                </slot>
            </cell>
            <cell primary="content" value-align='left' title="共享人">
                <div class="rightBd"  slot>{{detail.projectSharePersonList | projectList}}</div>
            </cell>
            <cell title="进度" :value="detail.projectProgressBar"></cell>
            <cell title="紧急程度" :value="detail.projectLevel | projectLevel"></cell>
            <cell primary="content" value-align='left' title="描述" :value="detail.projectDesc | projectDesc" ></cell>
            <cell title="创建人" :value="detail.projectCreatePersonName"></cell>
            <cell title="创建时间" :value="detail.createDate" ></cell>
            <cell title="沟通群组" :value="detail.projectCommunication | projectCommunication"></cell>
            <cell title="网盘文件夹" :value="detail.projectNetDisk | projectNetDisk" ></cell>
        </group>
        <attachItem v-if="AttachmentInfo" :param="AttachmentInfo"></attachItem>
        <!-- <group :gutter="0">
            <cell-box is-link>
                
            </cell-box>
        </group> -->
        <!-- <panel :list="list" :type="type" ></panel> -->
    </div>
</template>
<script>
    import { Badge, Group, Cell,Panel } from 'vux'
    import attachItem from '../../components/attachItem.vue'
    import dService from '@mobile/pages/m_details/detailService.js'
    export default {
        components: {
           Group,
           Cell,
           Panel,
           attachItem
        },
        props:[],
        filters:{
            projectLevel(val){
                let temp = "";
                // 项目等级 非常紧急2，紧急1，正常0。
                switch(val){
                    case "0":
                    temp = "正常";
                    break;
                    case "1":
                    temp = "紧急"
                    break;
                    case "2":
                    temp = "非常紧急"
                    break;
                }
                return temp;
            },
            projectStatus(val){
                let temp = "";
                // 1已延期、2未启动、3已完成、4已撤销。
                switch(val){
                    case "0":
                    temp = "进行中";
                    break;
                    case "1":
                    temp = "已延期"
                    break;
                    case "2":
                    temp = "未启动"
                    break;
                    case "3":
                    temp = "已完成"
                    break;
                    case "4":
                    temp = "已撤销"
                    break;
                }
                return temp;
            },
            projectDesc(val){
                if(val){
                    return val.replace(/<[^>]+>/g,"")
                }
            },
            projectNetDisk(val){
                 let temp = "";
                // 是否创建网盘 0否1是
                switch(val){
                    case "0":
                    temp = "未创建";
                    break;
                    case "1":
                    temp = "已创建"
                    break;
                }
                return temp;
            },
            projectCommunication(val){
                 let temp = "";
                // 项目沟通 0未启用 1启用
                switch(val){
                    case "0":
                    temp = "未创建";
                    break;
                    case "1":
                    temp = "已创建"
                    break;
                }
                return temp;
            },
            projectList(list){
                let temp = "";
                if(list && list.length){
                    list.forEach(element => {
                        temp += " " + element.teamPersonName
                    });
                }
                return temp;
            }
        },
        methods: {

            async getDetail(){
                let route = this.$route.query;
                let tendId=route.tendId,projectId=route.projectId;
                let param = {
                    tendId : route.tendId,
                    projectId : route.projectId,
                    isOut : route.isOut
                }
                param = JSON.stringify(param);
                let detail = await dService.getDetail(param);
                if(detail.status == "200"){
                    this.detail = detail.result;
                    this.detail.date = this.detail.projectStart + "<br/>" + this.detail.projectEnd;
                    this.detail.projectProgressBar = this.detail.projectProgressBar + "%";
                    this.detail.createDate = this.detail.createDate.substring(0,this.detail.createDate.lastIndexOf(":"));
                    this.AttachmentInfo = {
                        appId: this.detail.appId,
                        categoryId: this.detail.categoryId,
                        businessId : this.detail.sid
                    }
                }     
            }
        },
        mounted(){
            this.getDetail()
        },
        data () {
            return {
                AttachmentInfo:false,
                type: '1',
                detail : {}
            }
        }
    }
</script>

<style  lang="scss">
// @import '../../static/css/m_crm_detail.scss'; 
@import '../../static/css/m_crm.scss';
@import './css.scss';
</style>

<style lang="scss" scoped>



    // .weui-cell:before {
    //         left:0;
    //             top: -10px;
    //       }
    // .weui-cell{ margin-bottom:10px;background:#fff;}
</style>