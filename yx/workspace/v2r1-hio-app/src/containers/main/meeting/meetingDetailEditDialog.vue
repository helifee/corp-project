<template>
    <div>
        <!--右侧弹窗创建会议-->
        <right-slide-modal :title="meetingTitle" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button @click="operateCommit()" >提交</el-button></li>
                    <li><el-button @click="operateSave()" >保存</el-button></li>
                    <li><el-button @click="operateClose()" >关闭</el-button></li>
                </ul>
            </div>
            <detailEditForm ref="refDetailEditForm" :meetingData="meetingData" @successBackFun="successBackFun" ></detailEditForm>
        </right-slide-modal>
    </div>

</template>

<script>
    import detailEditForm from './components/detialEditForm.vue'
    export default {
        name: "meeting-detail-edit-dialog",
        components:{
            detailEditForm
        },
        data(){
            return{
                meetingTitle:"创建会议"
            }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            meetingData:{
                required:true
            }
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            }
        },
        mounted(){
            if(this.meetingData!=""){
                this.meetingTitle="修改会议";
            }else{
                this.meetingTitle="创建会议";
            }
        },
        methods:{
            operateClose(){
                this.$emit("closeCreateModal");
            },
            successBackFun(){
                this.$emit("closeCreateModal");
                this.$emit("successBackFun");
            },
            operateCommit(){
                if(this.meetingData!=""){
                    this.$refs.refDetailEditForm.saveMeetingInfo("1",true)
                }else{
                    this.$refs.refDetailEditForm.saveMeetingInfo("1",false)
                }
            },
            operateSave(){
                if(this.meetingData!=""){
                    this.$refs.refDetailEditForm.saveMeetingInfo("0",true)
                }else{
                    this.$refs.refDetailEditForm.saveMeetingInfo("0",false)
                }
            }
        }

    }
</script>

<style scoped>
    .operate_buttons {
        float: right;
    }
</style>