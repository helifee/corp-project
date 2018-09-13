<template>
    <div>
        <el-popover
                ref="popover4"
                placement="bottom"
                width="200"
                trigger="click"
                v-model="visible"
        >
            <div style="width: 200px" class="cascader-panle">
                <!--{{sid}}{{chooseData}}-->
                <smarter-tree
                        :custom-prop="customProp"
                        checked-key="selected"
                        :data="officeTreeData"
                        ref="treeGrid"
                        :expand-all="true"
                        @mounted="$refs.treeGrid.refreshTreeTable(officeTreeData)"
                        @labelClick="chooseHanlder"
                        :expand-on-click-node="false"
                        :enable-check="false"
                        tree-key="sid"
                        child-key="officeHouseList"
                        prop="typeName"
                >
                    <template slot-scope="scope">
                        <!--<span class="custom-tree-node" @click="chooseHanlder(scope.row.sid,scope.row.typeName)">-->
                        <!--&lt;!&ndash;<span>{{scope.row.$extra.parentId}}</span>&ndash;&gt;-->
                        <!--<span :class="{gray:!+scope.row.state}">{{scope.row.typeName}}</span>-->
                        <!--</span>-->
                    </template>
                </smarter-tree>
            </div>
        </el-popover>
        <el-input v-model="chooseData" readonly="readonly" v-popover:popover4 placeholder="请选择分类"></el-input>
    </div>
</template>

<script>
//    JZY.locale.add('officeLocale',require('./office.locale'))
    import {postOfficeHouseSelectTree} from '@Main/officeSupplies/getData.js'
    export default{
        components:{

        },
        props:{
            sid:{
                type:String,
                required:false
            },
            typeName:{
                type:String,
                required:false
            }
        },
        computed:{
            customProp: {
                get:function(){
                    let that = this;
                    return {
                        iDisabled(node){
//                        console.log('custom prop this:',node)
//
//                        if(node.sid===that.sid){
//                            that.chooseData=node.typeName;
////                            console.log(that.chooseData)
//                        }
                        },
                        [JZY.u.uuid()](node){
                            if(node.sid===that.sid){
                                that.chooseData=node.typeName;
                           }
                            return true
                        }
                    }
                },
                set:function () {
                    return  true;
                }
            }
        },
        methods:{
            async rquireOfficeTree(){
                let queryData = {
                    "orderBy":"state desc"
                };
                let res = await postOfficeHouseSelectTree(queryData);
//                console.log(res[0],"res[0]treeee")
                let init = res[0][0];
                let initObj = {
                    typeName:init.typeName,
                    sid:init.sid,
                };
                this.breadcrumb = [...[]];
                this.breadcrumb.push(initObj);
                this.$refs.treeGrid.refreshTreeTable(res[0])

            },
            chooseHanlder(value,type){
                this.chooseData = value.typeName;
                this.visible = false;
                let obj = {
                    typeName :value.typeName,
                    sid :value.sid,
                }
                this.$emit('chooseValue', value);
            },

        },
        data(){
            let sid = this.sid;
            return {
//                customProp:{
//                    iDisabled(node){
////                        console.log('custom prop this:',node)
////
////                        if(node.sid===this.sid){
////                            this.chooseData=node.typeName;
////                        }
//
////
////                        return node.$extra.deepth>1
//                    },
//                    [JZY.u.uuid()](row){
//                        if(row.sid==this.sid){
////                            console.log('row--:',row.sid)
//                        }
//                        return true
//                    }
//                },
                officeTreeData:[],
                chooseData:'',
                visible: false,
            }
        },
        watch:{
        },
        mounted (){
            this.rquireOfficeTree()
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .el-popover{
        z-index: 9000!important;
    }
</style>
