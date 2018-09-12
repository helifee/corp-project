<template>
    <div>
        <!--右侧弹窗编辑合同-->
        <right-slide-modal :title="title" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button :disabled="btnDisabled" @click="operateSave('commit')" >提交</el-button></li>
                    <li><el-button :disabled="btnDisabled" @click="operateSave('saveDraft')" >保存</el-button></li>
                    <li><el-button @click="operateClose()">关闭</el-button></li>
                </ul>
            </div>
            <div>
                <contractEdit :contractId="contractId" :editType="editType"
                           :flow="false"   @saveBackFun="saveBackFun" ref="refContractEdit"></contractEdit>
            </div>
        </right-slide-modal>

    </div>
</template>

<script>
    import contractEdit from './contractEdit'
    export default {
        name: "contract-edit-dialog",
        components:{
            contractEdit
        },
        data(){
            return{
                title:"创建合同",
                btnDisabled:false,
                editType:"add",
            }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            contractId:{
                required:true
            },
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
            if(this.contractId==""){
                //新增
                this.title="创建合同";
                this.editType="add";
            }else{
                this.title="编辑合同";
                this.editType="edit";
            }
        },

        methods:{
            operateClose(){
                this.$emit("closeCreateModal");
            },
            saveBackFun(type,detailData){
                //success /fail
                // console.log("saveBackFun",detailData);
                this.btnDisabled=false;
                if(type=="success"){
                    this.$emit("closeCreateModal");
                    this.$emit("refushTableFun");
                }
            },
            operateSave(type){
                this.btnDisabled=true;
                this.$refs.refContractEdit.operateSave(type);
            },
        }
    }
</script>

<style scoped>
    .operate_buttons {
        float: right;
    }
</style>