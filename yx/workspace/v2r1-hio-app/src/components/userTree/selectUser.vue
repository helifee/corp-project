<template>
    <div class="select_user user_tree">
        <transfer-tree-user
            ref="transferTree"
            tree-key="nodeId"
            :enable-checked-folder="true"
            :advancedRelevanceStrategy="advancedRelevanceStrategy"
            child-key="children"
            @mounted="$refs.transferTree.render(userData);"
            @selectedUser="selectedUser"
            checked-key="isCheckedNode"
            is-inside="inside"
            :expand-all="expandAll"
            :auto-expand-checked-nodes="true"
            :checked-all-childs-when-parent-checked="false"
            prop="name"
            leftHeight="275px"
            rightHeight="320px"
            :customProp = "customProp"
            :enable-checked-multiple = "enableCheckedMultiple"
            :show-inside-outside-tabs="showInsideOutsideTabs"
            label="">
            <template slot-scope="scope">
                <slot :row="scope.row">

                </slot>
            </template>
        </transfer-tree-user>
    </div>
</template>

<script>
    import config from '@/config/index.js'
    // import userData from './userData.js'//tree原始数据
    import transferTreeUser from '@/components/transferTree/src/transferTreeUser.vue'
    import mockData from '@MockData'

    export default{
        components: {
            transferTreeUser,
        },
        data(){
            let _self = this;
            // console.info("this.selectedUsersToTree")
            // console.info(this.selectedUsersToTree)
            return {
                advancedRelevanceStrategy:{//高级关联策略色设置
                    onChecked:{
                        syncParents:false,//选中时同步父
                        syncChilds:false,//选中时同步子
                    },
                    onCancelChecked:{
                        syncParents:true,//取消选中时同步父
                        syncChilds:true,//取消选中时同步子
                    }
                },
                customProp:{//渲染数据前会递归便利所有节点，通过此属性可以为每个节点添加您想要自定义的数据
                    // isShowTitle(node){

                    //     let findObj=_self.selectedUsersToTree.find((item)=>item.sid==node.sid)

                    //     if(findObj && (findObj.isShowTitle==0)){
                    //         return true
                    //     }else{
                    //         return false
                    //     }
                    // },
                    //内部 true，外部false
                    isInside(node){
                        return node.type === 'external'?'outside':'inside'
                    },
                    isCheckedNode(node){//根据调用组件时，已选择的人员，渲染tree
                        // console.log('custom prop thwis:',node.sid,this,node,node.type)
                        // console.info("存在已选择的人员")
                        if (_self.selectedUsersToTree.find((item, index, arr) =>{
                            // console.info(node.type)
                                if (node.type != null && node.type != 'user' && node.type != 'external'){
                                    return false
                                }else{
                                    // console.info(item.sid)
                                    // console.info(node.sid)
                                    // console.info(item.sid == node.sid || item.sid == node.imUserId || ( item.imUserId == node.imUserId && item.imUserId !=null ) )
                                    return item.sid == node.sid || item.sid == node.imUserId || ( item.imUserId == node.imUserId && item.imUserId !=null )
                                }
                            }
                        )) {
                            return true
                        }else{
                            return false
                        }
                    },
                    iDisabled(node){//设置哪些节点不可点击，如非叶子节点
                        // console.log('custom prop this:',this,node)
                        // console.info(node.hasOwnProperty('type') && node.type !='')
                        //type为null可选，其他（公司、部门）节点不可选
                        return node.hasOwnProperty('type') && node.type != null && node.type != 'user' && node.type != 'external'
                        // return node.$extra.hasChildren === true
                    }
                      
                },
                userData:[],//初始化原始数据
            }
        },
        props:{
            selectedUsersToTree:{
                type:Array,
                default:function(){
                    return []
                }
            },
            filterDataUrl:{
                type:Object,
                default:function(){
                    return {
                        host:'',
                        type:'',
                        url:'',
                        data:{}
                    }
                }
            },
            enableCheckedMultiple:{
                type:Boolean,
                default:true
            },
            showInsideOutsideTabs:{
                type:Boolean,
                default:true
            },
            expandAll:{//是否加载后自动展开所有级
                type:Boolean,
                default:true
            }
        },
        methods:{
            selectedUser:function(obj){
                this.selectedUsers = JSON.stringify(obj)
                this.$emit('userFromTreeFunc',this.selectedUsers)
            },
            //获取用户树数据
            async getUserData( {host = '', type='', url = '',data = {} } = {} ){

                host = host || 'GLOBAL.COMPONENTS.ZCY_TEST1'
                type = type || 'post'
                url = url || '/sys/organization/queryTreeWithUser'
                if (type === 'get') {
                    data = {
                        external:true//加载外部联系人
                    }
                }else{ //post
                    data = JZY.u.deepExtend( {} ,{ external:true } ,data)
                }

                console.info("data")
                console.info(data)
                let res = await JZY.xhr.r([{type:type,url:url,data:data}],host,false,false).then((resultData)=>{
                        try{
                            return resultData;
                        }catch (e){
                            this.$message("role.list.vue:"+e);
                            return false;
                        }
                    }).catch((e)=>{
                        //接口失败
                        throw new Error(e)
                    })

                console.info(res)
                // debugger
                res.length > 0 && res[0] !== null && this.$refs.transferTree.render(res);
                this.userData = res.length === 0 ? [] : [...res]
            
            },
            
        },
        mounted(){
            this.getUserData( this.filterDataUrl )
        },
        watch:{
            "selectedUsersToTree":{
                handler:function(newVal,oldVal){
                    // console.info(newVal)
                    // console.info(oldVal)
                    // console.info(this.$refs.transferTree)
                    this.$refs.transferTree.render(this.userData);
                },
                deep:true
            },
            "filterDataUrl":{
                handler:function(newVal,oldVal){
                    console.log(newVal);
                    // console.log(oldVal);

                    this.getUserData({
                        host:newVal.host,
                        type:newVal.type,
                        url:newVal.url,
                        data:newVal.data
                    })
                },
                deep:true
            },
        }
    }
</script>