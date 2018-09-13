<template>
    <smarter-tree
            ref="tree"
            @mounted="$refs.tree.refreshTreeTable(treeData)"

            :enableCheckedMultiple="treeConfig.enableCheckedMultiple"
            :autoExpandCheckedNodes="treeConfig.autoExpandCheckedNodes"
            :advancedRelevanceStrategy="treeConfig.advancedRelevanceStrategy"
            :isVirtualTree="treeConfig.isVirtualTree"
            :updateVirtualTreeMethod="treeConfig.updateVirtualTreeMethod"
            :showArraw="treeConfig.showArraw"
            :enableCheckedFolder="treeConfig.enableCheckedFolder"
            :expandAll="treeConfig.expandAll"
            :folderIcon="treeConfig.folderIcon"
            :customProp="treeConfig.customProp"
            :childKey="treeConfig.childKey"
            :fileIcon="treeConfig.fileIcon"
            :width="treeConfig.width"
            :disabledKey="treeConfig.disabledKey"
            :disabledDeepth="treeConfig.disabledDeepth"
            :checked-key="treeConfig.checkedKey"

            :checked-all-childs-when-parent-checked="treeConfig.checkedAllChildsWhenParentChecked"
            :enable-check="treeConfig.enableCheck"
            :tree-key="treeConfig.treeKey"
            :prop="treeConfig.prop" :label="treeConfig.label"
    >
    </smarter-tree>


</template>

<script>

    import treeProps from '../../treeGrid/src/treeProps'


    export default {
        mixins:[treeProps],
        computed: {

        },

        components:{

        },
        methods: {

        },
        props: {
            // treeConfig:{
            //     type:Object,
            //     default:{
            //         ...treeProps,
            //         data:[]
            //     }
            // }
            treeConfig:Object,
            treeData:{
                type:Array,
                default:[]
            }

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

            }
        },

        mounted() {

            console.log('kcuf_u treeConfig--:',this.treeConfig)


        },

    }
</script>
