import  stage  from "@/containers/main/flowClient/stage.js"
import  utils  from "@/containers/main/flowClient/utils.js"
import flService from "@/containers/main/flowClient/flow_service.js"

let s_flow = {
    approvalType:{
        'user':3, //用户
        'role':4, //角色+部门
        'higherUp':1, //上级
        'starter':5
    },
    //初始化流程绘制面板
    nodeTypeObj: {
        'start':'1',
        'task':'2',
        'end':'3',
        'join':'4',
        'fork':'5',
        'connector':'6',
        'cc':'7'
    },
    initial (container) {
        
        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('该浏览器不支持!', 200, false);
        } else {
            if(container.className == 'stage'){
                return;
            }
           
            stage.renderMainStage(container,true,true);
            // console.log("initial完成")
        }
    },

    //解析流程XML
    async setGraph (param,containers){
        let my = this;
        this.flowId = param.flId;

        let graph = utils.getGraphEditor();

        let data = await flService.initFlDatas(param);

        if(data.sid && data.graphXml){
            //从xml中渲染画布
            // utils.renderModelFromXml(graph,temp);
            utils.renderModelFromXml(graph,data.graphXml);
        }else{
            utils.initStartNode(graph,containers);
        }
    },
    //从开始节点顺序获取所有节点及连线信息
    //验证节点连接正确性
    getAllCellData (scope,param,isValidate,cb) {
        this.flowId = param.flId;
        var graph = utils.getGraphEditor();
        var parentNode = graph.getDefaultParent();
        var allCells = parentNode.children;
        var acs = [];
        var steps = [];
        var startAc = null;
        var acMap = {};
        //获取所有节点及连线信息
        for(var i in allCells) {
            var cell = allCells[i];
            var acObj = {}, stepObj = {};
            if(cell.isEdge()){
                stepObj.id = cell.id;
                stepObj.name = cell.value;
                stepObj.startLine = cell.source?cell.source.id:null;
                stepObj.targetLine = cell.target?cell.target.id:null;
                stepObj.nodeId = cell.mxObjectId.replace('mxCell#', '');
                stepObj.flowTemplateId = String(this.flowId);
                stepObj.conditionName = cell.conditionNameNew;
                stepObj.conditionFormula = cell.conditionFormulaNew;
                // stepObj.conditionFormulaNew = cell.conditionFormulaNew;
                // stepObj.conditionNameNew = cell.conditionNameNew;
                // stepObj.conditionName = cell.conditionName;
                steps.push(stepObj);
            }else{

                acObj.id = cell.id;
                acObj.name = cell.value;
                // acObj.nodeType = this.nodeTypeObj[cell.nodeType];
                acObj.nodeType = Number(this.nodeTypeObj[cell.nodeType]);
                
                let extra = cell.extra ? (JSON.parse(cell.extra)):{};
                
                // acObj.approvalType = ( cell.approvalType ) || String(extra.approvalType);
                
                if(cell.nodeType == "1" || cell.nodeType == "5" || cell.nodeType == "4"){
                    acObj.approvalType = "999"
                }else{
                    acObj.approvalType =  cell.approvalType  || extra.approvalType || 1;
                }
                acObj.approvalType = String(acObj.approvalType);
                // acObj.approvalType = 
                //     (acObj.approvalType == "undefined" || acObj.approvalType == "null") ? "1" :  acObj.approvalType;

                acObj.flowTemplateId = String(this.flowId);
                acObj.x = cell.geometry.x;
                acObj.y = cell.geometry.y;
                acObj.width = cell.geometry.width;
                acObj.height = cell.geometry.height;

                acObj.ccPerson = cell.ccPerson;

                acObj.participant = cell.participant;


                acs.push(acObj);
                acMap[cell.id] = cell;
            }
        }
        
        var result = {};
        result['ac']=JSON.stringify(acs);
        result['step'] = JSON.stringify(steps);
        result.flowTemplateId = String(this.flowId);
        result.code = String(this.flowId);
        //保存已有模块
        result["sid"] = flService.currentFLSid || "";
        if(isValidate){ //需要校验
            let validateFlagFlow = s_flow.validateFlowChart();
            if(validateFlagFlow.validateFlag){
                this.saveFlData(result,scope,cb)
            }else{
                scope.$message( validateFlagFlow.errorMsg );
                cb && cb(0);
            }
        }else{
            this.saveFlData(result,scope,cb)
        }
    },
    //验证流程图连接正确性
    validateFlowChart  () {
        var graph = utils.getGraphEditor();
        var parentNode = graph.getDefaultParent();
        var allCells = parentNode.children;
        var hasStartCell = false;
        var hasMoreStartCell = false;
        var hasEndCell = false;
        var hasMoreEndCell = false;
        var cellConnectorIsCorrect = true;
        var errorMsg = '';
        var validateList = false;
        if(allCells){
            for(var i in allCells){
                var cell = allCells[i];
                if(!cell.isEdge()){
                    var nodeType = cell.nodeType;
                    if(nodeType=='start'){
                        if(hasStartCell){
                            hasMoreStartCell = true;
                            errorMsg = '只能有一个开始节点';
                            break;
                        }
                        hasStartCell = true;
                        var edges = cell.edges;
                        var isSourceCell = false;
                        //var isTargetCell = false;
                        for(var i in edges){
                            var edge = edges[i];
                            var source = edge.source;
                            if(source==cell){
                                isSourceCell = true;
                            }
                        }
                        if(!isSourceCell){
                            cellConnectorIsCorrect = false;
                            errorMsg = '开始节点未连线';
                            graph.clearSelection();
                            graph.setSelectionCell(cell);
                            break;
                        }
                    }
                    if(nodeType=='end'){
                        if(hasEndCell){
                            hasMoreEndCell = true;
                            errorMsg = '只能有一个结束节点';
                            break;
                        }
                        hasEndCell = true;
                        var edges = cell.edges;
                        var isTargetCell = false;
                        for(var i in edges){
                            var edge = edges[i];
                            var target = edge.target;
                            if(target==cell){
                                isTargetCell = true;
                            }
                        }
                        if(!isTargetCell){
                            cellConnectorIsCorrect = false;
                            errorMsg = '结束节点未连线';
                            graph.clearSelection();
                            graph.setSelectionCell(cell);
                            break;
                        }
                    }
                    if(nodeType!='start'&&nodeType!='end'){
                        var edges = cell.edges;
                        var isSourceCell = false;
                        var isTargetCell = false;
                        for(var i in edges){
                            var edge = edges[i];
                            var source = edge.source;
                            var target = edge.target;
                            if(source==cell){
                                isSourceCell = true;
                            }
                            if(target==cell){
                                isTargetCell = true;
                            }
                        }
                        if(!isSourceCell||!isTargetCell){
                            cellConnectorIsCorrect = false;
                            errorMsg = '任务、网关节点连线不完整';
                            graph.clearSelection();
                            graph.setSelectionCell(cell);
                            break;
                        }
                        
                        
                        if(nodeType=='task' ){
                            let temp = cell.participant; 
                            temp = temp ? JSON.parse(temp) : null ;
                            if( temp && !temp.length ){
                                validateList = true;
                                errorMsg = "请选择审批人";
                                graph.clearSelection();
                                graph.setSelectionCell(cell);
                                break;
                            }
                        }

                        // //验证
                        // if((nodeType=='task'||nodeType=='cc')&&!cell.extra){
                        //     acBaseInfoIsCorrect = false;
                        //     errorMsg = '流程模板环节基本信息填写不完整';
                        //     graph.clearSelection();
                        //     graph.setSelectionCell(cell);
                        //     break;
                        // }else if(nodeType=='task'&&cell.extra&&cell.extra!=''){
                        //     try {
                        //         var acObj = JSON.parse(cell.extra);
                        //         var participant = cell.participant;
                        //         if(!acObj.isAddLabel&&(!participant||participant=='')){
                        //             acBaseInfoIsCorrect = false;
                        //             errorMsg = '流程模板环节基本信息填写不完整';
                        //             graph.clearSelection();
                        //             graph.setSelectionCell(cell);
                        //             break;
                        //         }

                        //     }catch (e){
                        //         console.error(e);
                        //     }

                        // }
                    }
                }
            }

            if(!hasStartCell&&errorMsg==''){
                errorMsg = '没有开始节点';
            }
            if(!hasEndCell&&errorMsg==''){
                errorMsg = '没有结束节点';
            }

            return {validateFlag:hasStartCell&&!hasMoreStartCell&&!hasMoreEndCell&&hasEndCell&&cellConnectorIsCorrect&&!validateList,errorMsg:errorMsg};
        }else{
            errorMsg = '没有流程图';
            return {validateFlag:false,errorMsg:errorMsg};
        }
    },
    saveFlData(param,scope,callback){
        flService.saveFlData(param).then(function(data){
            let msg = (data[0]==1) ? "流程保存成功":"流程保存失败";
            scope.$message( msg );
            callback && callback(data[0]);
        }) 
    },
    //当前选择节点
    getSelectCell () {
        var graph = utils.getGraphEditor();
        return graph.getSelectionCell();
    },
    //更新节点信息
    updateCellAttr (cellId,attrName,attrValue) {
        var model = utils.getGraphEditor().model;
        var cell = model.getCell(cellId);
        model.beginUpdate();
        try {
            var edit = new mxCellAttributeChange(cell, attrName, attrValue);
            model.execute(edit);
        }
        finally {
            model.endUpdate();
        }
    },
    //根据id访问节点
    getCellById (cellId) {
        var model = utils.getGraphEditor().model;
        var cell = model.getCell(cellId);
        return cell;
    },
    //抄送人及 用户审批人
    tranParentList(cell,data,type){
        if(data){
            let arr = data,
                rt = [];
            if(arr && arr.length){
                for(let i=0;i<arr.length;i++){
                    rt[i] = {};
                    if(type == "1"){ //抄送人
                        rt[i].userId = arr[i].sid;
                        rt[i].flowAcId = cell.id;
                        rt[i].flowTemplateId = String(cell.flId);
                        rt[i].name = arr[i].name
                    }else{  //审批人
                        rt[i].approverId = arr[i].sid;
                        rt[i].flowAcId = cell.id;
                        rt[i].approvalType = this.approvalType['user'];  //审批人员类型
                        rt[i].flowTemplateId = String(cell.flId);
                        rt[i].approvalTypeName = arr[i].name;
                    }
                }
            }
            return rt;
        }
    },
    _filterDepList(key,data,filter){
        switch (key){
            case "role":
                filter.roleId = data.roleId ;
                filter.roleName = data.roleName || "";
            break;
            case "dept":
                filter.name = data.name || "";
                filter.sid = data.sid;    
            break;
        }
    },
    //角色+部门 审批人
    tranDepList(cell,data){
        if(data){
            let result = data;
            let filter = {},o = {},a = [];
            if(result){
                for(let key in result){
                    this._filterDepList(key,result[key],filter);
                }

                o.approverId = filter.roleId + (filter.roleId ? "," : "") + filter.sid;
                o.approvalTypeName = filter.roleName + (filter.roleName ? "," : "") + filter.name;
                o.approvalType = this.approvalType['role'];  //审批人员类型
                o.flowAcId = cell.id;
                o.flowTemplateId = cell.flId;
                if(filter.roleId && filter.sid){
                    a.push(o);
                }
            }
            return a;
        }
    },
    filterApprove(cell,data,type,arr){
        data.forEach(element => {
            let isInside = element.userType || 0;
            if(element.isInside == "inside"){
                isInside = 0
            }else if(element.isInside == "outside"){
                isInside = 1
            }
           
            if(type == 1){ //审批人
                
                let obj = {
                    "approvalType" : element.type,
                    "flowAcId" : cell.id,
                    "flowTemplateId" : String(cell.flId),
                    'imUserId' : element.imUserId || "",
                    'userType' : element.userType
                };
                if(element.type == 1 || element.type == 5){
                    obj["approverId"] = "";
                    obj["approvalTypeName"] = "";

                }else{
                    obj.approverId = element.sid;
                    obj.approvalTypeName = element.name
                }
                arr.push(obj);
            }else{  //抄送人
                let obj = {
                    userId : element.sid,
                    flowAcId :  cell.id,
                    flowTemplateId :  String(cell.flId),
                    name : element.name,
                    'imUserId' : element.imUserId || "",
                    userType : element.userType
                }
                arr.push(obj)
            }
        });
        return arr;
    },
    tranApproveList(cell,data,type){
        let arr = [];
        for(let key in data){
            if(data[key] && data[key].length){
                let items = data[key];
                
                this.filterApprove(cell,items,type,arr);
            }
        }
        return arr;
    },
    //条件节点 获取条件节点的连线及目标节点
    forkInit(cell,data){
        let edges = cell.edges;
        let forkLines = [];
        $.each(edges,function (i,edge) {
            if(edge.source===cell){
                let forkLine = {};
                forkLine.nodeId = edge.id;
                forkLine.target = edge.target.value;
                forkLine.name = edge.value;
                forkLine.conditionFormula = edge.conditionFormula;
                forkLine.conditionName = edge.conditionName;
                forkLines.push(forkLine);
            }
        });
        
    }
}
export default s_flow;