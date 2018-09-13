
<template>

    <tree-tpl :vm="_self">
        <template slot-scope="scope">
            <slot :row="scope.row">

            </slot>
        </template>
    </tree-tpl>


</template>
<script>
//    var Parallel = require('paralleljs')
//    import u from './util'
    import treeTpl from './treeCommonTemplate'
import treeProps from './treeProps'


    import renderEngine from './render.js'
    // let renderEngine=require('./render.js')

    // console.log('renderEngine-:',renderEngine)





    // let util=require('./util')
    import util from './util'




    export default {
        components:{treeTpl},

        mixins: [treeProps],
        // props:treeProps.props,


        data(){

            // return {loading:false}

            return {
                allExistTreeKeys:[],
                // isInitialDataTransformEnd:false,
                searchConditionFunction:function(){return true},
                influencedRowsInRealTree:[],
                // 初始数全部展开之后的副本
                memoryTree:[],
                radioTreeKeyModel:null
            }
        },

        watch:{
            // 'owner.data':function(){
            //   util.killLog('master data changed:',arguments)
            // },
            'checkedAllChildsWhenParentChecked':function(){
                this.setDCheckedAllChildsWhenParentChecked()
            },
            // 'enableCheckedMultiple':function(){
            //     this.updateTreeTable(false)
            // },
            'radioTreeKeyModel':function(nv,ov){
                util.killLog('nv and ov:',nv,ov)
                let {_data}=this.getOwner().store.states
                if(ov!=null){
                    try{
                        _data.find((item)=>{
                            return item[this.treeKey]==ov
                        })[this.checkedKey]=false

                        this.memoryTree.find((item)=>{
                            return item[this.treeKey]==ov
                        })[this.checkedKey]=false
                    }catch(e){}



                }
                try{
                    _data.find((item)=>{
                        return item[this.treeKey]==nv
                    })[this.checkedKey]=true

                    this.memoryTree.find((item)=>{
                        return item[this.treeKey]==nv
                    })[this.checkedKey]=true
                }catch(e){

                }


                this.tryUpdateVirtualTreeMethod()
            }
        },


        mounted(){
            util.killLog('cAdvancedRelevanceStrategy--:',this.cAdvancedRelevanceStrategy)
            this.$emit('mounted')


        },
        computed:{
            cCheckedAllChildsWhenParentChecked(){

             return this.enableCheckedMultiple==false?false:this.checkedAllChildsWhenParentChecked
            },
            cAdvancedRelevanceStrategy(){
                let relatedAll=this.cCheckedAllChildsWhenParentChecked,
                    extendSourceObj={
                    onChecked:{
                        syncParents:relatedAll,
                        syncChilds:relatedAll,
                    },
                    onCancelChecked:{
                        syncParents:relatedAll,
                        syncChilds:relatedAll,
                    }
                }
                util.killLog('extendSourceObj--:',extendSourceObj)
                if(relatedAll==true){
                    return !this.enableCheckedMultiple?extendSourceObj:util.deepExtend(extendSourceObj,this.advancedRelevanceStrategy)
                }else{
                    return extendSourceObj
                }

            }

//            advancedRelevanceStrategy:{
//                onChecked:{
//                    syncParents:true,
//                    syncChilds:true,
//                },
//                onCancelChecked:{
//                    syncParents:true,
//                    syncChilds:true,
//                }
//            },


        },
        created(){
//          this.setDCheckedAllChildsWhenParentChecked()
//            this.advancedRelevanceStrategy.onChecked.syncParents=false
        },

        methods:{

            ...renderEngine,

            //在展开后列表中获取每一个顶级节点嵌套层级最深的节点信息
            // getEveryMaxDeepthNodeOfRootNodesInExpandedList(list){
            //
            //     let count=0,
            //         everyMaxDeepthNodeOfRootNodes=[]
            //     list.forEach((item)=>{
            //         let ancestorIndex,
            //             deepth=item.$extra.deepth
            //         if(count==0){
            //             ancestorIndex=0
            //         }else{
            //             ancestorIndex=list[count-1].$extra.ancestorIndex+(deepth==1?1:0)
            //         }
            //         item.$extra.ancestorIndex=ancestorIndex
            //
            //         if(!everyMaxDeepthNodeOfRootNodes[ancestorIndex] || (everyMaxDeepthNodeOfRootNodes[ancestorIndex].deepth<deepth)){
            //             everyMaxDeepthNodeOfRootNodes[ancestorIndex]={
            //                 index:count,
            //                 deepth:deepth,
            //                 row:item
            //             }
            //         }
            //     })
            //     return everyMaxDeepthNodeOfRootNodes
            // },
            clearCheckedNodes(){
                if(this.enableCheckedMultiple){
                    this.getRealData().forEach((item)=>{
                        item.$extra.indeterminate=false
                        item[this.checkedKey]=false
                    })
                    this.memoryTree.forEach((item)=>{
                        item.$extra.indeterminate=false
                        item[this.checkedKey]=false
                    })
                }else{
                    this.radioTreeKeyModel=null
                }
            },
//            根据id数据集合删除对应的数据
            //ids中如果有节点是非叶子节点，则其所有子孙节点也会被计算出来并且被删除
            deleteRowsByIds(ids,deleteMemory=true){


                console.log("ids begin--:",ids.toString())

                let realData=this.getRealData(),
                    allRootNodeIds=new Set(),
                    allMemoryRootNodes=[],
                    allInfluencedNodesInMemoryTree,
                    memoryData=this.memoryTree,
                    memoryDataTreeKeyIndexMap={};


                if(deleteMemory){
                    realData.filter((item)=>ids.includes(item[this.treeKey])).forEach((item)=>{
                        allRootNodeIds.add(item.$extra.ancestorId)
                    })
                    allMemoryRootNodes=memoryData.filter((item)=>allRootNodeIds.has(item[this.treeKey]))

                    //这么做是为了删除id对应元素包含的所有子孙元素
                    ids=[...new Set(ids.map((id)=>
                        this.getDescendantChilds(id,this.memoryTree,this.treeKey,'ID'))
                        .reduce((a,b)=>a.concat(b)).concat(ids))]
                }



                // var allNodes=this.getAllNodes().filter((row)=>!ids.includes(item[this.treeKey]))
                    // .filter((item)=>{
                    //         return !ids.includs(item[this.treeKey])
                    //     })

                // console.log('kcuf_u all nodes--:',allNodes)
                //
                // console.log('kcuf_u allNodes--:',allNodes)

                // console.log('')
                // generateViewDataBySourceData

                for(let i=realData.length-1;i>=0;i--){
                    if(ids.includes(realData[i][this.treeKey])){
                        realData.splice(i,1)
                    }
                }
                if(deleteMemory){
                    for(let j=memoryData.length-1;j>=0;j--){
                        if(ids.includes(memoryData[j][this.treeKey])){
                            memoryData.splice(j,1)
                        }
                    }

                    for(let k=this.allExistTreeKeys.length-1;k>=0;k--){
                        if(ids.includes(this.allExistTreeKeys[k])){
                            this.allExistTreeKeys.splice(k,1)
                        }
                    }






                    allInfluencedNodesInMemoryTree=allMemoryRootNodes.map((item)=>
                        [item].concat(this.getDescendantChilds(item[this.treeKey],this.memoryTree,this.treeKey,'ROW')))
                        .reduce((a,b)=>a.concat(b))





                    console.log('will delete ids---:',ids,allRootNodeIds,allMemoryRootNodes,allInfluencedNodesInMemoryTree)


                    memoryData.forEach((item,index)=>{
                        memoryDataTreeKeyIndexMap[item[this.treeKey]]=index
                    })


                    console.log('kcuf_u memoryDataTreeKeyIndexMap--:',memoryDataTreeKeyIndexMap)
                    let memoryDataLen=memoryData.length

                    allInfluencedNodesInMemoryTree.forEach((item)=>{
                        let indexInMemory=memoryDataTreeKeyIndexMap[item[this.treeKey]]
                        console.log('indexInMemory--:',indexInMemory)

                        let childsNum=0,deepth=item.$extra.deepth
                        for(let i=indexInMemory+1;i<memoryDataLen;i++){
                            let next=memoryData[i]
                            if(next && next.$extra.deepth-1==item.$extra.deepth){
                                childsNum++
                            }
                            else if(next.$extra.deepth==item.$extra.deepth){
                                break;
                            }


                        }

                        let realRow=realData.find((realItem)=>realItem[this.treeKey]==item[this.treeKey])
                        item.$extra.childsNum=childsNum;
                        item.$extra.hasChildren=childsNum>0
                        
                        
                        if(realRow){
                            realRow.$extra.childsNum=childsNum;
                            realRow.$extra.hasChildren=childsNum>0
                        }



                    })


                    let shouldSyncParentStatusNodes=this.getShouldSyncParentStatusNodes(allInfluencedNodesInMemoryTree)
                    shouldSyncParentStatusNodes.forEach((item)=>{
                        let rowIndex=realData.findIndex((node)=>{
                            return node[this.treeKey]==item.row[this.treeKey]
                        })

                        if(rowIndex!=-1){
                            this.handleTreeCheckboxClick(realData[rowIndex],rowIndex)
                        }
                    })


                }

                // realData.forEach((row,index)=>{
                //     if(realData[index+1] && realData[index+1].$extra.deepth==realData[index].$extra.deepth && realData[index].$extra.expanded){
                //         realData[index].$extra.expanded=false
                //     }else if(!realData[index+1] && realData[index].$extra.expanded){
                //         realData[index].$extra.expanded=false
                //     }
                // })

                // let allNodes=this.generateViewDataBySourceData(false,this.getAllNodes().filter((item)=>{
                //     return !ids.includes(item[this.treeKey])
                // }),(res)=>{
                //     console.log('kcuf_u delete res--:',res)
                // },null,true)


                /*
                1 在real tree中获取每一个root节点下素有嵌套最深的要删除的节点（该节点必然是叶子节点）
                2 对上述节点分别获取第一个兄弟节点或父节点，执行handleCheckboxClick
                3 对1中所有root节点分别全部展开然后归并到一个key为tree-key的map中
                4 遍历real tree,从3中找到对应的东西的$extra复制给eached node
                5 处理expanded
                 */

                /*
                0 对原始ids进行遍历，找到所有ancestorId,今儿找到所有顶级节点row

                2 从0中找到所有root node,对其下所有节点遍历，分别更新每一个节点的hasChildren childsNum

                1 调用getShouldSyncParentStatusNodes获取所有嵌套最深的需要同步父节点checked状态的节点
                3 对1中所有节点进行遍历,调用handleCheckboxclick方法
                4 是否需要更新expanded?
                 */




                // this.allExistTreeKeys.forEach((item,index)=>{
                //     if(ids.includes(item)){
                //         this.allExistTreeKeys.splice(index,1)
                //     }
                // })
                JZY.s.clog('this.allExistTreeKeys--:',this.allExistTreeKeys)

                this.tryUpdateVirtualTreeMethod()


            },
            isNodeDisabled(node){
                // 如果disabled deepth数组中包含该deepth;
                // 或者该节点时一个文件夹，但是声明了enableCheckedFolder=false(不允许勾选文件夹);
                //或者节点本身设定的disabled key==true
                return this.disabledDeepth.includes(node.$extra.deepth)
                    ||(!this.enableCheckedFolder&&this.hasChild(node))
                    ||(node.$extra.disabled==true)
            },
            changeSelectedRadio(id){
              this.radioTreeKeyModel=id
            },



            getAllIdsInVirtualTree(){
                let res=[]
                this.memoryTree.forEach((item)=>{
                    res.push(item[this.treeKey])
                })
                return res
            },
            updateParentExtraAfterInsertRows(parentRow,insertRowsLen){
                let parentRowId=parentRow[this.treeKey],
                    memoryParentRow=this.getNodeById(parentRowId).row,
                    updateData={
                        hasChildren:(!parentRow.$extra.hasChildren&&insertRowsLen==0)?false:true,
                        childsNum:parentRow.$extra.childsNum+insertRowsLen
                    }
                parentRow.$extra=util.deepExtend(parentRow.$extra,updateData)

                memoryParentRow.$extra=util.deepExtend(memoryParentRow.$extra,updateData)

                this.tryUpdateVirtualTreeMethod()
            },


                // DescendantChilds
            // insertRows(index,rows,isSibling){
            //     let insertRowsLen=rows.length
            //     if(insertRowsLen==0){
            //         util.warningMsg('没有数据无法插入')
            //         return false
            //     }
            //     let realData=this.getRealData(),
            //
            //
            //         // virtualTreeLen=this.memoryTree.length,
            //         row=realData[index],
            //         realParentNode=!isSibling?(realData[index]):this.getParentNode(realData,row),
            //         rowDeepth=row.$extra.deepth
            //
            //     index=this.getLastDescendantChildIndex(index,rowDeepth,realData)
            //
            //
            //     try{
            //         row.$extra
            //     }catch(e){
            //         util.warningMsg('不存在第'+index+'条数据!')
            //         return false
            //     }
            //
            //     let id=row[this.treeKey],
            //         memoryRow=this.getNodeById(id),
            //         firstAddedChildDeepth=rowDeepth+(isSibling?0:1),
            //         virtualParentNode=!isSibling?(this.memoryTree[index]):this.getParentNode(this.memoryTree,memoryRow.row),
            //
            //         memoryRowIndex=this.getLastDescendantChildIndex(memoryRow.index,rowDeepth,this.memoryTree)
            //
            //
            //
            //     let expandedTree=this.updateTreeTable(true,rows,firstAddedChildDeepth)
            //
            //     util.killLog('expandedTree---:',expandedTree)
            //     if(!expandedTree){
            //         return false
            //     }
            //     // util.killLog('real data len:',realData.length)
            //     this.memoryTree.splice(memoryRowIndex+1,0,...util.copy(expandedTree))
            //     // util.killLog('real data len:',realData.length)
            //     realData.splice(index+1,0,...util.copy(expandedTree.filter((item)=>{
            //
            //         let bool=item.$extra.deepth==firstAddedChildDeepth
            //         if(bool){
            //             item.$extra.expanded=false
            //         }
            //         return bool
            //     })))
            //
            //     // util.killLog('kcuf_u realData--:',realData,realData.length,JSON.stringify(realData))
            //
            //
            //
            //
            //     let updateData={
            //             hasChildren:(!realParentNode.$extra.hasChildren&&insertRowsLen==0)?false:true,
            //             childsNum:realParentNode.$extra.childsNum+insertRowsLen
            //         }
            //     realParentNode.$extra=util.deepExtend(realParentNode.$extra,updateData)
            //
            //     virtualParentNode.$extra=util.deepExtend(virtualParentNode.$extra,updateData)
            //
            //
            //     this.tryUpdateVirtualTreeMethod()
            //
            //
            //
            //
            // },
            // // 注意插入孩子节点始终会插入到孩子的最前面；如果想插入某个孩子的后面请使用insertSiblingRows
            // insertChildRows(index,rows){
            //     this.insertRows.apply(this,Array.from(arguments).concat([false]))
            //     // &&
            //     // this.updateParentExtraAfterInsertRows(this.getRealData()[index],rows.length)
            //
            // },

            // insertSiblingRows(index,rows){
            //     this.insertRows.apply(this,Array.from(arguments).concat([true]))
            //
            //
            //
            // },

            handleDataBeforeInsertChilds(rows,cb){

            },
            //插入子节点，插入在一个没有任何孩子的节点上
            insertChildRows(index,rows){





                let realData=this.getRealData(),
                    row=realData[index],
                    // realParentNode=realData[index],
                    // rowDeepth=row.$extra.deepth,
                    id=row[this.treeKey],
                    // memoryRow=this.getNodeById(id),
                    // firstAddedChildDeepth=rowDeepth+1,
                    indexOfMemoryTree=null,
                    virtualParentNode=null;




                for(var i=0,len=this.memoryTree.length;i<len;i++){
                    if(id==this.memoryTree[i][this.treeKey]){

                        indexOfMemoryTree=i;
                        virtualParentNode=this.memoryTree[i]
                        break;
                    }
                }

                row.$extra.childsNum=rows.length;
                virtualParentNode.$extra.childsNum=rows.length;

                if(rows.length==0){

                    row.$extra.expanded=false;
                    virtualParentNode.$extra.expanded=false;

                    row.$extra.hasChildren=false;
                    virtualParentNode.$extra.hasChildren=false;




                    return false;
                }


                row.$extra.expanded=true;
                virtualParentNode.$extra.expanded=true;

                row.$extra.hasChildren=true;
                virtualParentNode.$extra.hasChildren=true;







                this.generateViewDataBySourceData(true,rows,(res)=>{
                    JZY.s.clog('res--:',res)

                    res.expandedTree.forEach((item)=>{
                        delete item.$extra.parentNode
                    })



                    // 更改父节点和子节点展开状态等信息


                    let copiedExpandedTree=util.copy(res.expandedTree)



                    realData.splice(index+1,0,...res.expandedTree.filter((item)=>item.$extra.deepth==row.$extra.deepth+1))

                    this.commitTableStoreData(realData)



                    this.memoryTree.splice(indexOfMemoryTree+1,0,...copiedExpandedTree)


                    this.tryUpdateVirtualTreeMethod()

                },row)








                // this.handleDataBeforeInsertChilds(row,(res)=>{
                //
                // })

            },

            filterRows(conFun,GET_TYPE='ROW',commit=true){

                if(typeof(conFun)=='string'){
                    let str=conFun
                    conFun=(row)=>{
                        return this.filterMethod(row,str)
                    }
                }else{
                    conFun=conFun||function(){ return true}
                }


                this.searchConditionFunction=conFun

                let allMatchedNodesIndex=[],i=0,allMathedIds=[],allCheckedIds=[]


                while(i<this.memoryTree.length){

                    let item=this.memoryTree[i]

                    if(conFun(item)){
                        let allParentsIndex=this.getAllParentNodes(item,i,'INDEX')
                        allMatchedNodesIndex=allMatchedNodesIndex.concat(allParentsIndex).concat([i])
                        let descendantChilds=
                                this.getDescendantChilds(item[this.treeKey],this.memoryTree,this.treeKey,'INDEX'),
                            childLen=descendantChilds.length

                        allMatchedNodesIndex=allMatchedNodesIndex.concat(descendantChilds)
                        util.killLog('descendantChilds---:',descendantChilds)

                        i+=(childLen+1)




                    }else{
                        i++
                    }
                }


                this.memoryTree.forEach((item,i)=>{
                    if(conFun(item)){
                        util.killLog('match con fun:',i)
                        let allParentsIndex=this.getAllParentNodes(item,i,'INDEX')
                        util.killLog('allParentsIndex---:',allParentsIndex)
                        // allMatchedNodesIndex.push(i)
                        allMatchedNodesIndex=allMatchedNodesIndex.concat(allParentsIndex).concat([i])

                    }
                })



                util.killLog('allMatchedNodesIndex before---:',allMatchedNodesIndex)
                allMatchedNodesIndex=Array.from(new Set(allMatchedNodesIndex))


                if(GET_TYPE=='INDEX'){
                    return allMatchedNodesIndex
                }


                let newData=[]
                allMatchedNodesIndex.forEach((index)=>{
                    newData.push(util.copy(this.memoryTree[index]))
                })
                util.killLog('kcuf_u new data:',newData)
                commit&&this.commitTableStoreData(newData)

                return this.getRowOrIdCollectionByList(newData,GET_TYPE)
                // return newData
            },
            getOwner(){
                if('smarterTree' in this.$refs){
                    return this.$refs.smarterTree
                }

                let parent = this.$parent
                while (parent && !parent.tableId) {
                    parent = parent.$parent
                }
                return parent
            },

            updateRows(rows,props){
                rows.map((row)=>{
                    util.killLog('update row and props',row,props)
                    let id=row[this.treeKey],
                        memoryRow=this.getNodeById(id).row,
                        realRow=this.getNodeById(id,false).row

                    util.killLog('memoryRow:',memoryRow)
                    props.forEach((prop)=>{
                        memoryRow[prop]=util.copy(row[prop])
                        try{
                            realRow[prop]=util.copy(row[prop])
                        }catch(e){}
                    })
                })

                this.tryUpdateVirtualTreeMethod()
            },



            // 获取memory tree nodes
            getVirtualTreeNodes(){
                return this.memoryTree
            },

            // 获取父节点对象
            getParentNode(list,item){
                if(item.$extra.deepth==1){
                    return null
                }
                return list.find((obj)=>{
                    return obj[this.treeKey]==item.$extra.parentId
                })
            },

//            lazyRender(data){
//                this.refreshTreeTable(data,true,false)
//
//                let realTree=this.getRealData()
//
//                realTree.forEach((item)=>{
//
//                })
//            },




            // 展开所有节点
            expandAllNodes(conFun){
                conFun=conFun||function(){return true}
                this.commitTableStoreData(util.copy(this.memoryTree))
            },
            // 获取所有节点
            getAllNodes(conFun,GET_TYPE='ROW'){
                conFun=conFun||function(){return true}
                let
                    checkedIndexArr=[],
                    checkedIdArr=[],
                    // updateChilds=()=>{
                    //
                    // },
                    checkedNodes=this.memoryTree.filter((item,i)=>{
                        if(conFun(item)&&this.searchConditionFunction(item)){
                            checkedIndexArr.push(i)
                            checkedIdArr.push(item[this.treeKey])
                            return true
                        }else{
                            return false
                        }

                    })


                if(GET_TYPE=='ROW'){
//                    checkedNodes=checkedNodes.map((item)=>{
//
//                        return util.copyDataAndDeleteSomeProps(item,[this.childKey])
//                    })




                    return checkedNodes
                }else if(GET_TYPE=='INDEX'){
                    return checkedIndexArr
                }else if(GET_TYPE=='ID'){
                    return checkedIdArr
                }






            },
            // 从list中获取row集合或者id集合
            getRowOrIdCollectionByList(list,GET_TYPE='ROW'){
              let res=[]
              list.forEach((item,index)=>{
                  res.push(this.getRowOrIndexOrIdByRow(item,index,GET_TYPE))
              })
                return res
            },
//            获取行数据或者行数据索引或者行数据id
            getRowOrIndexOrIdByRow(row,index,GET_TYPE='ROW'){
                if(GET_TYPE=='ROW'){
                    return row
                }else if(GET_TYPE=='INDEX'){
                    return index
                }else if(GET_TYPE=='ID'){
                    return row[this.treeKey]
                }
            },
            // 获取所有选中nodes
            getCheckedNodes(includeParent=false,GET_TYPE='ROW'){

                let res=[]
//                // 默认不包含父节点
//                if(includeParent){
//
//
//
//                    return this.filterRows((item)=>{
//                        return item[this.checkedKey]==true
//                    },GET_TYPE,false)
//                }


                this.memoryTree.forEach((item)=>{

                    if((includeParent&&(item[this.checkedKey]==true||item.$extra.indeterminate==true))||(!includeParent&&(item[this.checkedKey]==true))){
//                    if(item[this.checkedKey]==true){
//                        let data=util.copyDataAndDeleteSomeProps(item,[this.childKey])
                        res.push(typeof(GET_TYPE)=='string'?item:GET_TYPE(item))
                    }
                })

                return res
            },
            isItemChecked(item){
                return   item[this.checkedKey]==true
            },
            handleLabelClick:util.debounce(function(row){
                // util.killLog('handle label click:',row)


                if(!this.isNodeDisabled(row)){
                    this.$emit('labelClick',row)
                }


            })

                ,


            floderIcon(row){
                util.killLog('kcuf_u row--:',row)
                let expanded = row.$extra && row.$extra.expanded
                let  floder = this.folderIcon,
                    floder_open = this.folderIcon+'-open'
                return expanded ? floder_open : floder
            },

            paddingLeft(row){
                return  (parseInt(row.$extra.deepth) * 14)+'px'
            },
            icon(row){
                if(row.$extra && row.$extra.loading == true) return 'el-icon-loading'
                return row.$extra && row.$extra.expanded ?'el-icon-caret-bottom':'el-icon-caret-right'
            },


        },
        beforeDestroy(){
            this.destroyPrivateData()
        }
    }
</script>
<style>
</style>
