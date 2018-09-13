import Vue from 'vue'
// let util=require('./util')
import util from './util'
let isVue=typeof(Vue)!='undefined'


let IIFE={

}


let renderEngine={


    

    destroyPrivateData(){
      this.ownDataManageCenter().destroy()
      this.realDataManageCenter().destroy()
    },
    //原始数据管理中心，for非vue环境
    ownDataManageCenter:(function(){


        let ownData=null
        return function(){
            return {
                destroy(){
                  ownData=null
                },
                get(){
                    return ownData
                },
                set(data){
                    ownData=data
                }
            }
        }
    })(),
    //调用commit data store方法后会将处理后的数据提交到宿主store或者此数据管理中心，此get方法将返回dom结构中对应的真实数据
    realDataManageCenter:(function(){

        let realData=null

        return function(){
            return {
                destroy(){
                    realData=null
                },
                get(){
                    return realData
                },
                set(data){
                    realData=data
                }
            }
        }
    })(),










//从宿主或者原始数据管理中心获取处理之前的原始数据
    getOwnerData(){
        if(isVue){
            this.getOwner().data
        }else{
            return this.ownDataManageCenter().get()
        }
    },
    //调用commit data store方法后会将处理后的数据提交到宿主store或者此数据管理中心，此get方法将返回dom结构中对应的真实数据
    getRealData(){
        if(isVue){
            return this.getOwner().store.states._data
        }else{
            return this.realDataManageCenter().get()
        }

    },
    //调用commit data store方法后会将处理后的数据提交到宿主store或者此数据管理中心
    commitTableStoreData(data){

        try{
            if(isVue){
                util.killLog('get owner:',this.getOwner())
                let owner=this.getOwner()

                owner.store.commit('setData',data)
                this.$nextTick(()=>{

                    try{
                        owner.$el.parentNode.classList[data.length>0?'add':'remove']('tree-table-parent-with-data')
                    }catch(e){

                    }



                })
                // }
            }else{
                this.realDataManageCenter().set(data)
                util.killLog('commit成功')
            }
        }catch(e){

        }




    },
    //p1:数组格式的原始数据 p2:是否是嵌套结构的数据  p3:是否不采用懒加载模式：如果是则
    // 仅加载第一级节点（但这样将无法判断一级节点的半选中状态，且获取选中节点和所有节点会执行大量计算）
    refreshTreeTable(data,isNestedStructure=true){



        if(!isVue){
            this.ownDataManageCenter().set(data)
        }




        util.killLog('refreshTreeTable-- data:',data)

        this.allExistTreeKeys=[]


        let beginRefreshTime=Date.now()
        this.generateViewDataBySourceData(isNestedStructure,data,(result)=>{
            let expandedTree=result.expandedTree,
                generateViewDataBySourceDataTime=(Date.now()-beginRefreshTime)
            util.clog('处理原始嵌套数据 耗时:',generateViewDataBySourceDataTime/1000)
            util.clog('共计处理数据条数:',expandedTree.length)
            // console.log('fukcu result---:',result)

            // util.testTime('计算index=4节点父亲节点',()=>{
            //
            //     let list=this.getShouldSyncParentStatusNodes(4,expandedTree[4],[],{})
            //     util.killLog('kcuf_u list--:',list)
            // })


            // return false

            util.testTime('计算所有需要计算父节点半选中状态的节点所有祖先节点',()=>{
                result.everyShouldSyncParentStatusNodes.forEach((item)=>{
                    this.handleTreeCheckboxClick(item.row,item.index,false,false,expandedTree)
                })
            })

                // result.everyMaxDeepthNodeOfRootNodes.forEach((item)=>{
                //
                //     this.handleTreeCheckboxClick(item.row,item.index,false,false,expandedTree)
                // })

            let memoryTree=[]

            expandedTree.forEach((item)=>{
                delete item.$extra.parentNode
                memoryTree.push(util.copy(item,[this.childKey]))
            })

            // return false


            // expandedTree.forEach((item)=>{
            //     memoryTree.push(util.copy(item,[this.childKey]))
            // })

            this.memoryTree=memoryTree

            this.handleExpandAfterViewDataGenerated(result)

            let expandTime=(Date.now()-beginRefreshTime-generateViewDataBySourceDataTime)

            util.clog('根据expandAll或者expandCheckedNodes的配置找到对应数据，提交更新ui总共耗时:',expandTime/1000)



            let maxDeepth=result.maxDeepth

            util.killLog('real data--:',this.getRealData())


            util.clog('执行render总共耗时:',(Date.now()-beginRefreshTime)/1000)

        })



               this.tryUpdateVirtualTreeMethod()


    },
    //根据id值，数据数组，表示id的key字符串，获取所有儿子孙子节点；可
    // 指定GET_TYPE(id返回符合条件节点id，index为索引，不指定则为数据实体)
    //conFun为一个过滤条件，可以更智能匹配符合条件的孙子节点
    getDescendantChilds : function(id, data, treeKey,GET_TYPE='ID',conFun){
//        console.trace()
        conFun=conFun||function(){
            return true
        }
        let result = [],
            compare = [id],
            length = -1
        while (length != compare.length) {
            length = compare.length
            data.forEach(function(item,index) {
                if (util.findIndexInArr(item.$extra.parentId, compare) > -1 && util.findIndexInArr(item[treeKey], compare) == -1) {
                    if(conFun(item,index)){
                        if(GET_TYPE=='ID'){
                            result.push(item[treeKey])
                        }else if(GET_TYPE=='INDEX'){
                            result.push(index)
                        }else{
                            result.push(item)
                        }
                        // result.push(GET_TYPE=='ID'?item[treeKey]:item)
                    }

                    compare.push(item[treeKey])
                }
            })
        }
        return result
    },
    //根据某节点的索引，深度，展开后树的list数据数组，获取满足fn条件的最后一个孙子节点的索引
    getLastDescendantChildIndex(index,deepth,tree,fn){
        fn=fn||function(){return true}
        let treeLen=tree.length

//                index+=1

        for(let i=index+1;i<treeLen;i++){
            util.killLog(' i and fn:',i,fn,fn(tree[i]))
            if(tree[i].$extra.deepth==deepth){

                break
            }else{
                if(fn(tree[i])){
                    index=i
//                            index++
                }

            }
        }

//                index-=1
        util.killLog('kcuf_u my index:',index)
        return index
    },
    //当前行row的选中状态发生了改变之后，同步当前节点所有父亲节点，儿子节点的选中 半选中状态

    handleTreeCheckboxClick:function(row,index,isRealTree=true,syncChilds=true,expandedTreeList=null){

        util.killLog('this.cAdvancedRelevanceStrategy--:',this.cAdvancedRelevanceStrategy)
        let isChecked=row[this.checkedKey],
            {onChecked,onCancelChecked}=this.cAdvancedRelevanceStrategy

        if(isRealTree){
            row.$extra.indeterminate=false
            this.influencedRowsInRealTree.push(row)
        }

        if(syncChilds&&row.$extra.childsNum>0&&((isChecked&&onChecked.syncChilds)||(!isChecked&&onCancelChecked.syncChilds))){

            this.syncChildNodesCheckedStatus(row,index)
        }
        if((isChecked&&onChecked.syncParents)||(!isChecked&&onCancelChecked.syncParents)){

            this.syncParentNodesCheckedStatus(index,isRealTree,expandedTreeList)
        }

        if(isRealTree){

            this.updateInfluencedRowsInmemoryTree()
        }


    }
    ,
    // 根据id获取list中对应的节点，inVirtualTree=true则从虚拟树中查找，否则从真实数中查找
    getNodeById(id,inVirtualTree=true,list=null){
        let index,row=null,
            eachedData=list?list:(inVirtualTree?this.memoryTree:this.getRealData())

        for(let i=0,len=eachedData.length;i<len;i++){
            if(eachedData[i][this.treeKey]==id){
                index=i
                row=eachedData[i]
                break
            }
        }

        eachedData.forEach((r,i)=>{
            if(r[this.treeKey]==id){
                index=i
                row=r
            }
        })
        return {
            index,
            row
        }
    },

    //在虚拟树种更新因为某个节点checked状态变更导致的父亲，儿子孙子节点选中状态变化的所有受影响节点对应的虚拟节点的状态
    updateInfluencedRowsInmemoryTree(){
        util.killLog('this.influencedRowsInRealTree',this.influencedRowsInRealTree)
        this.influencedRowsInRealTree.forEach((row)=>{
            let id=row[this.treeKey]
            let memoryRow=this.getNodeById(id).row
            memoryRow[this.checkedKey]=row[this.checkedKey]
            if(typeof(row.$extra['indeterminate'])!='undefined'){
                memoryRow.$extra.indeterminate=row.$extra.indeterminate
                if(row.$extra.indeterminate){
                    memoryRow[this.checkedKey]=true
                }
            }


            // memoryRow[this.checkedKey]=
        })
        this.tryUpdateVirtualTreeMethod()
        this.influencedRowsInRealTree=[]
    },
    //个人调试专用，对其他人是一无用的方法，不会对性能造成影响，其他人自行忽略
    tryUpdateVirtualTreeMethod(){
        if(isVue){
            try{
                this.updateVirtualTreeMethod()
            }catch(e){
                util.warningMsg('亲爱的请不要惊慌出现这个错误原因在于你配置的updateVirtualTreeMethod方法（此方法用于调试虚拟树，与你无关）调用报错，删除它即可。错误信息为:'+e.message)
            }
        }
        else{
            util.killLog('update成功')
        }
    },
    // 同步当前点击节点所有父节点的各种状态,isRealTree是否是真实dom中的tree，
    // 如果是则根据parent id找孩子并push收影响的行到影响中心数组，否则直接读取children
    syncParentNodesCheckedStatus(index,isRealTree=true,listData=null,onLoop=function(){}){


        listData=listData||this.getRealData()
        let row=listData[index]

        let targetCheckedStatus=row[this.checkedKey]
        let deepth=row.$extra.deepth
        util.killLog('deepth:',deepth)
        if(deepth==1){
            return false
        }
        let firstSibling=this.getFirstSiblingNode(index,listData)
        util.killLog('first sibling:',firstSibling)
        row=firstSibling.row
        index=firstSibling.index

        let parentIndex=index-1,
            parent=listData[parentIndex],
            // parentCheckedStatus=parent[this.checkedKey],
            parentId=parent[this.treeKey],
            allSiblings=this.memoryTree.length==0&&(this.childKey in listData[parentIndex])?listData[parentIndex][this.childKey]:this.getChildsByParentId(parentId,listData)


        // util.killLog('allSiblings when sync--:',allSiblings)


        isRealTree && (this.influencedRowsInRealTree.push(parent))

        if(allSiblings.every((sibling)=>{
                return sibling[this.checkedKey]==targetCheckedStatus&&sibling.$extra.indeterminate==false
                // return sibling[this.checkedKey]==targetCheckedStatus&&sibling.$extra.indeterminate==false
            })){
            parent[this.checkedKey]=targetCheckedStatus
            parent.$extra.indeterminate=false

        }else{
            parent[this.checkedKey]=true
            parent.$extra.indeterminate=true
        }
        if(parent.$extra.deepth!=1){
            onLoop(listData[parentIndex])
            this.syncParentNodesCheckedStatus(parentIndex,isRealTree,listData)
        }





    },
    //根据索引获取当前节点的第一个兄弟节点
    getFirstSiblingNode(index,d){

        if('parentNode' in d[index]){
            return d[index].parentNode[this.childKey][0]
        }

        util.killLog('index and d:',index,d)
        let resIndex=null,
            row=d[index],
            parentId=row.$extra.parentId,
            deepth=row.$extra.deepth

        for(let i=0,len=d.length;i<len;i++){
            let item=d[i]
            if(resIndex==null&&item.$extra.parentId==parentId&&item.$extra.deepth==deepth){
                resIndex=i
                break
            }
        }
        // d.forEach((item,index)=>{
        //     if(resIndex==null&&item.$extra.parentId==parentId&&item.$extra.deepth==deepth){
        //         resIndex=index
        //     }
        // })

        return {
            index:resIndex,
            row:d[resIndex]
        }
    },
    // 同步当前选中节点所有子孙节点,该动作只发生在真实tree点击时
    syncChildNodesCheckedStatus(row,index){


        let isChecked=row[this.checkedKey],
            deepth=row.$extra.deepth,
            handler=(fromIndex,list)=>{
                for(let i=fromIndex+1,len=list.length;i<len;i++){
                    if(deepth>=list[i].$extra.deepth){

                        break
                    }
                    list[i][this.checkedKey]=isChecked
                    list[i].$extra.indeterminate=false
                }
            }

            // alert(row.$extra.indexInMemoryTree)
        handler(this.getNodeById(row[this.treeKey]).index,this.memoryTree)
        // handler(row.$extra.indexInMemoryTree,this.memoryTree)
        handler(index,this.getRealData())





    },
    //            获取当前节点最后一个选中的孙子节点     ``
    getLastCheckedDescendantChildIndex(index,deepth,tree){

        return this.getLastDescendantChildIndex.apply(this,Array.from(arguments).concat((item)=>{
            return item[this.checkedKey]==true
        }))
    },



    // getEveryMaxDeepthNodeOfRootNodesInExpandedList
    //获取需要同步父节点checked状态的节点集合，这么设计是为了在加载渲染时不需要再次遍历list就可以得到想要的结果
    // p3返回的数组，p4能出现在在返回数组中的节点的idPath的map集合，p1和p2为节点在list中的index和list数据
    getShouldSyncParentStatusNodes(index,item,res=[],resIdPathMap={}){

        if(arguments.length!=1){
            if(item.$extra.childsNum==0){
                let str=item.$extra.idPath.split('->').slice(0,-1).join('->')
                if(!resIdPathMap.hasOwnProperty(str)){

                    res=res.concat({
                        index:index,
                        row:item
                    })

                    resIdPathMap[str]=true
                }

            }

            return res
        }else{
            let arr=[],map={},list=arguments[0]
            util.killLog('list and list len:',list,list.length)
            list.forEach((item,index)=>{
                arr=this.getShouldSyncParentStatusNodes(index,item,arr,map)
            })
            return arr
        }



    },



    // 根据原始数据处理生成可以被tree table的视图列表所用的数据：p1:是否是嵌套结构数据    p2：需要处理的数据，若为null则处理宿主的原始数据
    //p3所有数据处理成功后的回调，参数有很多细节 ）  p4开始的节点嵌套深度
    generateViewDataBySourceData(isNestedStructure=true,insertRows=null,cb,parentObj,skipDuplicateCheck=false){
        cb=cb||function(){}
        // let this=this,
        let eachedData,
            maxDeepth=1,
            expandedTree=isNestedStructure?[]:insertRows,
            allCheckedNodesIndex=[],
            allCheckedNodes=[],
            allCheckedNodesAncestorId=[],
            firstCheckedNode=null,
            //存放每一个顶级节点下嵌套层级最深的那个节点的信息
            // everyMaxDeepthNodeOfRootNodes=[],
            //一个树中所有需要向上同步父节点选中状态的节点集合
            everyShouldSyncParentStatusNodes=[],
            everyShouldSyncParentStatusHandlerMap={},
            allCheckedIds=[],
            allIds=[],
            otherCheckedNodes=[],
            checkedNum=0,


            handleAboveVarsCount=0

        let handleAboveVars=(item,ancestorId)=>{
            let deepth=item.$extra.deepth
            if(isNestedStructure){
                expandedTree.push(item)
            }




            everyShouldSyncParentStatusNodes=this.getShouldSyncParentStatusNodes(handleAboveVarsCount,
                item,everyShouldSyncParentStatusNodes,everyShouldSyncParentStatusHandlerMap)


            // console.log('kcuf_u everyShouldSyncParentStatusNodes--:',everyShouldSyncParentStatusNodes)



            // util.killLog('handleAboveVarsCount---:',handleAboveVarsCount,item[this.prop])
            maxDeepth=Math.max(maxDeepth,deepth)
            // everyMaxDeepthNodeOfRootNodes[]
            allIds.push(''+item[this.treeKey])

            if(item[this.checkedKey]){
                checkedNum++
                if(firstCheckedNode==null){
                    allCheckedIds.push(item[this.treeKey])
                    allCheckedNodesIndex.push(handleAboveVarsCount)
                    allCheckedNodesAncestorId.push(item.$extra.ancestorId)
                    firstCheckedNode=item
                }else{
                    if(this.enableCheckedMultiple){
                        allCheckedIds.push(item[this.treeKey])
                        allCheckedNodesIndex.push(handleAboveVarsCount)
                        allCheckedNodesAncestorId.push(item.$extra.ancestorId)
                    }
                    otherCheckedNodes.push(item)
                }
            }
            // item.$extra.indexInMemoryTree=handleAboveVarsCount
            handleAboveVarsCount++
        }

        // 为每个节点添加额外数据
        let addInitialExtraData4List=(item,parentNode,ancestorId)=>{

            let _parentNode=parentNode||{},
                parentId=_parentNode[this.treeKey]||null
            if(typeof(item[this.checkedKey])==='undefined'){
                // Vue.set(item,this.checkedKey,false)
                item[this.checkedKey]=false
            }

// console.info(_parentNode)
// console.info(item)
// console.info(_parentNode['sid'])


            let hasChildren=Array.isArray(item[this.childKey])&&item[this.childKey].length>0
            util.killLog('hasChildren--:',hasChildren,item,this.childKey)

            // item[this.treeKey]=''+item[this.treeKey]
            item.$extra = {
                loading:false,
                deepth:(parentNode?parentNode.$extra.deepth:0)+1,
                hasChildren:hasChildren,
                childsNum:hasChildren?item[this.childKey].length:0,
                parentId:parentId,
                ancestorId:ancestorId,
                parentNode:parentNode,

                parentRealityId:_parentNode.hasOwnProperty('sid') ? _parentNode.sid : null,//父节点id，真实的

               indeterminate:false,
                expanded:false,
                disabled:false,
                path:(parentNode?parentNode.$extra.path+'->':'')+item[this.prop],
                idPath:(parentNode?parentNode.$extra.idPath+'->':'')+item[this.treeKey],
                // path:item,path+'->'+subItem[this.prop],
//                        disabled:item[this.disabledKey]?true:false
                // expanded:item[this.expandKey]
            }

            for(let i in this.customProp){
                let fun=this.customProp[i]
                if(typeof(fun)=='function'){
                    if(isVue){
                        item[i]=fun.call(this.getOwner(),item)
                    }

                }else{
                    item[i]=fun
                }
            }


            item.$extra.disabled=item[this.disabledKey]?true:false

            handleAboveVars(item,ancestorId)


            // let childTreeKeys=[]

            if(hasChildren){

//                        let firstChildChecked,
//                            countOfSameCheckedStatusAsNo1=1
                item[this.childKey].forEach((subItem,index)=>{

                    // childTreeKeys.push(subItem[this.treeKey])
                    if(item[this.checkedKey]==true&&this.cAdvancedRelevanceStrategy.onChecked.syncChilds){
                    // if(item[this.checkedKey]==true&&this.cCheckedAllChildsWhenParentChecked){
                        subItem[this.checkedKey]=true
                    }


                        addInitialExtraData4List(subItem,item,ancestorId)



                })

            }

        }


        if(isNestedStructure){
            eachedData=insertRows||this.getOwnerData()
            // eachedData=insertRows||(this.getOwner().data)

            eachedData.forEach((item,index)=>{
                addInitialExtraData4List(item,parentObj||null,item[this.treeKey])
            })
        }else{
            eachedData=insertRows

            insertRows.forEach((item,index)=>{
            // this.getRealData().forEach((item,index)=>{
                handleAboveVars(item)
            })
        }


        let allExistIdsFromBeginest=[].concat(allIds).concat(skipDuplicateCheck==false?this.allExistTreeKeys:[]),
            set=Array.from(new Set(allExistIdsFromBeginest))


        util.clog("allExistIdsFromBeginest--:",allExistIdsFromBeginest,set)

        if(allExistIdsFromBeginest.length!=set.length){

            util.errorMsg('您的数据中某些数据主键是相同的，这将会造成数据紊乱，请修改数据再调用我')
            return false
        }else{

            this.initialNestedData=

            this.allExistTreeKeys=allExistIdsFromBeginest
        }



        if(!this.enableCheckedMultiple){
            if(checkedNum>0){
                this.radioTreeKeyModel=firstCheckedNode[this.treeKey]
            }
            if(checkedNum>1){
                util.warningMsg('您设定的为单选模式，但是有超过一条数据为选中状态，将仅设定第一个选中的为选中节点，其他都变为非选中状态')
                otherCheckedNodes.forEach((obj)=>{
                    obj[this.checkedKey]=false
                })
            }
        }







        //




        util.killLog('eached data before expand:',eachedData)





        util.killLog('eachedData in last:',eachedData,eachedData.length)




        allCheckedNodes=(firstCheckedNode==null?[]:[firstCheckedNode]).concat(otherCheckedNodes)
        cb({
            // everyMaxDeepthNodeOfRootNodes,
            expandedTree,
            eachedData,
            maxDeepth,
            allCheckedNodes,
            firstCheckedNode,
            allCheckedNodesIndex,
            allCheckedIds,
            allCheckedNodesAncestorId:Array.from(new Set(allCheckedNodesAncestorId)),
            everyShouldSyncParentStatusNodes,
            allIds,
            otherCheckedNodes,
            checkedNum
        })

        return expandedTree



    },

    // 展开所有选中节点
    expandAllCheckedNodes(allCheckedNodesIndex,allCheckedNodes,allCheckedNodesAncestorId){

        util.killLog('allCheckedNodesAncestorId--:',allCheckedNodesAncestorId)


        let newList=[],
            handledMap={},
            expandNodesIndex=[],
            expandNodesIds=[]

            allCheckedNodes.forEach((item,index)=>{

                let str=item.$extra.idPath.split('->').slice(0,-1).join('->')
                if(!handledMap.hasOwnProperty(str)){
                    let allParents=this.getAllParentNodes(item,allCheckedNodesIndex[index],'INDEX',this.memoryTree,(row)=>{
                        expandNodesIds.push(row[this.treeKey])
                    })
                    util.killLog('allParents--:',allParents)
                    expandNodesIndex=expandNodesIndex.concat(allParents)

                    handledMap[str]=true
                }


            })


        expandNodesIndex=Array.from(new Set(expandNodesIndex))
        expandNodesIds=Array.from(new Set(expandNodesIds))

        this.memoryTree.forEach((item,index)=>{

            if(item.$extra.deepth==1){
                item.$extra.expanded=allCheckedNodesAncestorId.includes(item[this.treeKey])
                newList.push(util.copy(item,[this.childKey]))
                // allCheckedNodesAncestorId
                // if(allCheckedNodesAncestorId.includes(item[this.treeKey])){
                //
                // }
            }else{
                if(expandNodesIndex.includes(index)){
                    // if(item.$extra.deepth==1||expandNodesIndex.includes(index)||expandNodesIds.includes(item.$extra.parentId)){
                    item.$extra.expanded=true
                    // if(item.$extra.indeterminate==true){
                    //     item.$extra.expanded=true
                    // }else{
                    //
                    //     //这么处理是为了防止父亲选中不同步孩子的情况出现父亲选中并展开却没有儿子节点的情况
                    //     item.$extra.expanded=this.memoryTree[index+1]&&(this.memoryTree[index+1].$extra.deepth>item.$extra.deepth)
                    //         // &&item[this.checkedKey]==true
                    // }
                    // item.$extra.expanded=item[index+1]&&item[index+1].$extra.deepth>item.$extra.deepth&&
                    //     (item[this.checkedKey]==true||item.$extra.indeterminate==true?true:false)
                    newList.push(util.copy(item,[this.childKey]))
                }
                else{
                    if(expandNodesIds.includes(item.$extra.parentId)){
                        newList.push(util.copy(item,[this.childKey]))
                    }
                    item.$extra.expanded=false
                }
            }


        })
        util.killLog('expandNodesIndex--:',expandNodesIndex)
        util.killLog('expandNodesIds--:',expandNodesIds)


        util.killLog('commited new list:',newList)

        this.commitTableStoreData(newList)





    },
    // 获取所有父亲爷爷节点
    getAllParentNodes(row,index,GET_TYPE='ROW',d,onEach=function(){}){


        if(row.$extra.deepth==1){
            return []
        }
        let res=[]

        if('parentNode' in row.$extra){
            while(row.$extra.parentNode!=null){
                row=row.$extra.parentNode
                if(typeof(GET_TYPE)=='function'){
                    res.unshift(GET_TYPE(row))
                }else{
                    res.unshift(row)
                }

            }
        }else{
            d=d||this.memoryTree

            let idPath=row.$extra.idPath

            for(let i=0;i<index;i++){
                if(idPath.includes(d[i].$extra.idPath)){
                    onEach(d[i])
                    res.push(this.getRowOrIndexOrIdByRow(d[i],i,GET_TYPE))
                }
            }
        }



        return res




    },
    //当视图所用的初始数据处理出来之后，再处理这些数据中节点的展开情况，用户可能设定展开所有，或展开所有选中，
    handleExpandAfterViewDataGenerated(result){
        console.log('kcuf_u result--:',result)
        // debugger
        let {allCheckedNodesAncestorId,allCheckedNodes,allCheckedNodesIndex}=result
        // let t=Date.now(),res
        if(!this.isVirtualTree){
            // 展开所有
            if(this.expandAll){
                console.log('expand nodes:all')
                let arr=util.copy(this.memoryTree,[this.childKey])
                console.log('kcuf_u arr expand all--:',arr)
                arr.forEach((item)=>{
                    item.$extra.expanded=true
                })
                this.commitTableStoreData(arr)
                // res=this.commitTableStoreData(arr)



                // 展开所有选中节点
            }else if(this.autoExpandCheckedNodes){

                console.log('expand nodes:selected')

                this.expandAllCheckedNodes(allCheckedNodesIndex,allCheckedNodes,allCheckedNodesAncestorId)
                // 展开所有1级节点
            }else{
                console.log('expand nodes:root')
                let commitData=util.copy(result.eachedData.filter((item)=>{
                    return item.$extra.deepth==1
                }),[this.childKey])
                util.killLog('commitData--:',commitData)

                this.commitTableStoreData(commitData)
            }
        }
        // util.killLog('真实tree首次展开用时：',Date.now()-t,res)
        // return res


    },
    // 获取所有兄弟节点=根据父亲id获取所有儿子节点
    getChildsByParentId(pid,fromData,resType='ROW'){
        fromData=fromData||this.getRealData()
        util.killLog('pid-----:',pid)
        let arr=[]
        fromData.forEach((item,index)=>{
            if(item.$extra.parentId==pid){
                arr.push(resType=='ROW'?item:item[this.treeKey])
            }
        })
        return arr
    },
    // 在一个完全展开的树种根据父节点的index获取所有子节点
    getChildsByParentIndexInList(index,list,GET_TYPE='ROW'){
        let arr=[],
            parentDeepth=list[index].$extra.deepth,
            pid=list[index][this.treeKey]
        for(let i=index+1;i<list.length;i++){
            if(list[i].deepth==parentDeepth){
                break
            }
            if(list[i].$extra.parentId==pid){
                arr.push(this.getRowOrIndexOrIdByRow(list[i],i,GET_TYPE))
            }

        }
        return arr
    },
    hasChild(row){

        return row.$extra.childsNum>0

    },

    //根据节点索引，数据数组列表展开/合拢节点;若是新增的行，则从新行中获取所有儿子几点；否则从memory tree中获取对应儿子节点
    //ifSetData是否提交最新数据到真实数据管理中心，在vue的element-ui框架下提交此方法浏览器就会更新数据
    //ifForceCloseExpand:是否强制吧节点的闭合设置为false
    toggleExpandChildsByIndex(index){
    // toggleExpandChildsByIndex(index,ifSetData=false,fromListData,isInsertRowMutation=false,isExpandTreeMutation=false){
        let d=this.getRealData()
        // util.killLog('d----:',d);return false
        // let ifSetData=fromListData?false:true
        let row=d[index]
        if((this.remote==null) && (!this.hasChild(row))){
            return d
        }



        util.killLog('index----:',index,row)
        let data=d
        // let data=util.copy(d)
        // util.killLog('data---:',data,index)







        // if(!isExpandTreeMutation){
        //     data[index].$extra.expanded = !data[index].$extra.expanded
        // }

        util.killLog("is loading--:",data[index].$extra.loading)

        if(data[index].$extra.loading){
            return false
        }else if(this.remote && (!data[index].$extra.expanded)){

            data[index].$extra.loading=true
            // return false;
        }


        data[index].$extra.expanded = !data[index].$extra.expanded

        if(data[index].$extra.expanded){


            if(this.remote){
                this.remote(data[index],index)
                    .then(()=>{


                        data[index].$extra.loading=false
                    })
                    .catch(()=>{

                        data[index].$extra.expanded=false
                        data[index].$extra.loading=false

                    })
                return false;
            }




            let prefixData=[],postFixData=[]

            let id = row[this.treeKey]
            // let expandedIds = this.getDescendantChilds(id,data,this.treeKey)
            // let prefix = data.slice(0,index+1)

            for(let i=0;i<index+1;i++){
                prefixData.push(data[i])
            }
            for(let j=index+1;j<data.length;j++){
                postFixData.push(data[j])
            }






            util.killLog('this.memoryTree.length--:',this.memoryTree.length)





            let allChildNodes=this.getChildsByParentIndexInList(this.getNodeById(row[this.treeKey]).index,this.memoryTree)


            util.killLog('allChildNodes---:',allChildNodes)

            // if(this.memoryTree.length==0){
            //     data = prefixData.concat(allChildNodes=row[this.childKey]).concat(postFixData)
            // }else{
                // allChildNodes=this.getChildNodesByRow(row)
                allChildNodes.forEach((child)=>{
                    if(child.$extra.childsNum>0){
                        child.$extra.expanded=false
                    }
                })
                data = prefixData.concat(allChildNodes).concat(postFixData)
            // }
            //
            // this.commitTableStoreData(data)
            // ifSetData&&this.commitTableStoreData(data)

            // return {
            //     allChildNodes:allChildNodes,
            //     data:data
            // }

            // return data

            this.commitTableStoreData(data)
            // }
        }

        // if(!isExpandTreeMutation&&(!data[index].$extra.expanded)){
        else{


            util.killLog('rows before delete:',this.getRealData())

            let willDeleteIds=this.getDescendantChilds(row[this.treeKey],data,this.treeKey)
            util.killLog(" render args:",willDeleteIds)
            //非远程加载 ，闭合标签时仅删除真实树木节点有关东西
            this.deleteRowsByIds(willDeleteIds,this.remote?true:false)

            util.killLog('rows after delete:',this.getRealData())



            // //此处修改后可能有bug
            //
            // let id = row[this.treeKey],result = []
            //
            //
            //
            // let removeIds = this.getDescendantChilds(id,data,this.treeKey)
            // data.forEach((item)=>{
            //     if(util.findIndexInArr(item[this.treeKey],removeIds) == -1){
            //         result.push(item)
            //     }
            // })
            //
            // data = result
            // ifSetData&&this.commitTableStoreData(data)

            // return data

        }



    }

}

export default renderEngine
