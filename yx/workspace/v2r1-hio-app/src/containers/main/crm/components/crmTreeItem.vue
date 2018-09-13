<template>
        <ul class="treeItem">
            <li v-for='(cel,key) in itemData' @click.stop="clickItem(cel,key)" @dblclick="dbClickItem(cel)">
                <div :class="{'current':cel.selected}">
                    <i :class="{'el-icon-caret-bottom':cel.open,'el-icon-caret-right':!cel.open}" 
                    @click.stop="toggle(cel,key)"
                    v-if="cel[seting.childrenKey] && cel[seting.childrenKey].length"></i>
                    <span>{{cel.name}}</span>
                </div>
                <treeItem v-if="cel[seting.childrenKey] && cel[seting.childrenKey].length" v-show='cel.open' :itemData="cel[seting.childrenKey]" :seting='seting'></treeItem>
            </li>
        </ul>
</template>
<script>
export default {
    name:'treeItem',
    components: {},
    props:{
        itemData:{

            type:Array
        },
        seting:{
            type: Object
        },
    },
    data(){

        return {
            
        }
    },
    created(){
        
    },
    methods : {
        setTreeData(datas){
            return datas.filter(function (data) {
                data.open = false;
                return data
            })
        },
        clickItem(item,key){
            this.$parent.clickItem(item);
            item.selected = !item.selected;
            if(item.selected){
                this.$parent.setCurrentItem(item);
            }
            this.$set(this.itemData,key,item);
        },
        dbClickItem(item){
            this.$parent.dbClickItem(item);
        },
        toggle(item,key){
            item.open = !item.open;
            this.$set(this.itemData,key,item);
        }
    },
    mounted(){
        // this.itemData = Object.assign({}, this.itemData, {
        //     open: false
        // })
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .current{
        background:#409EFF
    }
</style>

