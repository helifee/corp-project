<template>
    <div class="stage">
        <stage-panel
                :stage-list="stageList"
                :is-stage-detail="isStageDetail"
                @showEditStageDialog="showEditStageDialog"
                @showCreatStageDialog="showCreatStageDialog"
                @stageDetail="stageDetail"
        ></stage-panel>

        <stage-detail
                :is-stage-detail="isStageDetail"
                @gobackStage="gobackStage"
        ></stage-detail>


        <!--创建阶段-->
        <dialog-creat-stage :dialog-visible="creatStageDialogVisible" @showCreateModal="showCreatStageDialog" @closeCreateModal="closeCreatStageDialog"></dialog-creat-stage>
        <!--编辑阶段-->
        <dialog-edit-stage :id="editId" :dialog-visible="editStageDialogVisible" @showCreateModal="showEditStageDialog" @closeCreateModal="closeEditStageDialog"></dialog-edit-stage>
    </div>
</template>
<script>

    import dialogCreatStage from '@Main/project/components/details/dialog.creatStage.vue'
    import dialogEditStage from '@Main/project/components/details/dialog.editStage.vue'
    import stagePanel from '@Main/project/components/details/stage.panel.vue'
    import stageDetail from '@Main/project/components/details/stage.detail.vue'

    export default {
        components: {

            dialogCreatStage,
            dialogEditStage,
            stagePanel,
            stageDetail
        },
        data() {
            return {
                creatStageDialogVisible:false,
                editStageDialogVisible:false,
                isStageDetail:true,
                editId:'',//编辑id
                stageList:[{
                    id:1,
                    icon:'招',
                    number:'30',
                    title:'招标阶段',
                    des:'一句话描述',
                    time:'5小时前',
                    headPic:[
                        {
                            name:'aaa',
                            src:'',
                        },{
                            name:'aaa',
                            src:'',
                        },{
                            name:'aaa',
                            src:'',
                        },{
                            name:'aaa',
                            src:'',
                        },{
                            name:'aaa',
                            src:'',
                        },
                    ],
                },{
                    id:2,
                    icon:'招',
                    title:'招标阶段',
                    number:'20',
                    des:'一句话描述',
                    time:'5小时前',
                    headPic:[
                        {
                            name:'aaa',
                            src:'',
                        },{
                            name:'aaa',
                            src:'',
                        },{
                            name:'aaa',
                            src:'',
                        },{
                            name:'aaa',
                            src:'',
                        },{
                            name:'aaa',
                            src:'',
                        },
                    ],
                }],


                // 拖拽列表
//                list: message.map( (name,index) => {return {name, order: index+1, fixed: false}; }),



            }
        },
        props: [],
        computed: {

        },
        filters:{
        },
        methods: {
            //阶段
            stageDetail (){
                this.isStageDetail = true;
            },
            gobackStage (){
                this.isStageDetail = false;
            },




            //创建阶段
            showCreatStageDialog (){
                this.creatStageDialogVisible = true;
            },
            closeCreatStageDialog (){
                this.creatStageDialogVisible = false;
            },

            //编辑阶段
            showEditStageDialog (){
                this.editStageDialogVisible = true;
            },
            closeEditStageDialog (){
                this.editStageDialogVisible = false;
            }

        },
        watch: {

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
