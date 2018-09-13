<template>
    <div>
        <tree-item :itemData="treeData" :seting='seting'></tree-item>
    </div>
</template>
<script>

import treeItem from '@Main/crm/components/crmTreeItem.vue'

export default {
    props:{
        treeData: {
            type:Array
        },
        seting:{
            type: Object
        },
        showLabel:{
            type:String
        }
    },
    components: {
        treeItem
    },
    data(){
        return {
            currentItem : {}
        }
    },
    methods : {
        getCurrentItem(){
            return this.currentItem;
        },
        setCurrentItem(item){
            this.currentItem = item;
        },
        clickItem(item){
            this.$emit("clickItem",item);
        },
        dbClickItem(item){
            this.$emit("dbClickItem",item);
        },
        initTree(){

        }
    },
    mounted(){
        this.initTree();
    }
}
</script>
<style scoped lang="scss">

</style>

