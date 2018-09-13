<template>
        <el-dialog :title="title" :visible="dialogVisible" @close="dialogVisible=false">
            <smarter-tree-core-template
                    ref="tree"
                    :treeConfig="_props"
                    :treeData="treeData">

            </smarter-tree-core-template>




            <span slot="footer" class="dialog-footer">

                <div style="display:inline-block;float:left;">
                    <slot name="footer-left"></slot>
                </div>
                <el-button type="primary" @click="submit">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
              </span>

        </el-dialog>
</template>
<style>

</style>
<script>
    import treeProps from './treeGrid/src/treeProps'
    import smarterTreeCoreTemplate from './smarterTree/src/smarterTreeCoreTemplate'

    import u from './util/src/util'


    export default {
        mixins:[treeProps],
        computed: {

        },

        components:{
            smarterTreeCoreTemplate
        },
        methods: {
            submit(){
                let checkedNodes=this.getTreeRef().getCheckedNodes()
                console.log("checkedNodes--:",checkedNodes)

                if(checkedNodes.length==0){


                    u.warningMsg('please choose at least one node')
                    return false
                }

                this.$emit('submit',checkedNodes)
            },

            getTreeRef(){
              return this.$refs.tree.$refs.tree
            },
            showDialog(){
                this.dialogVisible=true
            },
            closeDialog(){
                this.dialogVisible=false
            }
        },
        props: {

            title:{
                type:String,
                default:'无标题'
            },
            treeData:{
                type:Array,
                default:[]
            },



            // value: {
            //
            //     type: [Object],
            //     default: {}
            // }
        },
        beforeCreate() {

        },
        data() {

            return {
                dialogVisible:false
            }
        },

        mounted() {



        },

    }
</script>
