import  utils  from "@/containers/main/flowClient/utils.js"
import  actions  from "@/containers/main/flowClient/action.js"
import  sidebar  from "@/containers/main/flowClient/sidebar.js"
import  toolbar  from "@/containers/main/flowClient/toolBar.js"
let stage = {
   renderMainStage (container,isShowToolbar,graphEnable,xml) {
        if(typeof container === 'string'){
            container = document.getElementById(container);
        }
        //var container = container;//document.getElementById('_designer'); //document.createElement('div');

        //初始化参数
        this.init();
       
        // 设置主操作界面
        this.graphStage = this.setStage(container,graphEnable,xml);
     
        //设置快捷键
        this.bindKeyHander(this.graphStage);
      
        //设置样式
        this.setDefaultCellStyle(this.graphStage);
        
        //是否显示工具栏
        if(isShowToolbar){
            // 巨洲云logo
            // this.setLogo(container);
            // 初始化工具栏动作
           
            actions.init(this.graphStage);
           
            // 渲染侧边栏，顶部工具栏
            sidebar.renderSidebar(this.graphStage, container);
            
            // toolbar.renderToolbar(this.graphStage, container);
        }
      
        utils.setGraphEditor(this.graphStage);
       
    },

    callbackFetchAllFlowData (data) {
        // 渲染到图形绘图区
        this.renderGraphFromXml(this.graphStage, data.graphXml);
    },

    // 渲染到图形绘图区
    renderGraphFromXml (graphStage, xml) {
        if (!xml || xml == '') return false;
        var xmlDocument = mxUtils.parseXml(xml);
        if (xmlDocument && xmlDocument.documentElement) {
            var decoder = new mxCodec(xmlDocument);
            var nodes = xmlDocument.documentElement;

            var model = graphStage.getModel();
            decoder.decode(nodes, model);
        }

    },

    // 巨洲云logo
    setLogo (container) {
        // var imgLogo = document.createElement('img');
        // imgLogo.className = 'jzylogo shadow';
        // imgLogo.src = 'static/mxClient/images/editor/jzylogo.png';
        // imgLogo.title = '切换工具栏';
        // container.appendChild(imgLogo);
        // container.after(imgLogo);

        // 切换工具栏的显示和隐藏
        // imgLogo.addEventListener('click', function () {
        //     $('.sidebar').toggle();
        //     $('.toolbar').toggle();
        //     $(this).toggleClass('shadow');
        //     $(this).toggleClass('r0080');
        // });
        // imgLogo = null;
    },

    // 设置主操作页面参数
    setStage (container,graphEnable,xml) {
        var my = this;
        container.className = 'stage';
        // container.style.backgroundImage = utils.getBaseImgByBtnType('stageBg');
        container.style.background = '#F6F7F8';
        // Workaround for Internet Explorer ignoring certain styles
        if (mxClient.IS_QUIRKS) {
            // document.body.style.overflow = 'hidden';
            new mxDivResizer(container);
        }

        var model = new mxGraphModel();
        var graphStage = new mxGraph(container, model);
        // 开启可以拖拽建立关系
        graphStage.setConnectable(true);

        // 开启方块上的文字编辑功能
        graphStage.setCellsEditable(true);
        //开启提示
        graphStage.setTooltips(true);
        graphStage.setAllowDanglingEdges(false);
        //禁用自连接
        graphStage.setAllowLoops(false);
        graphStage.setVertexLabelsMovable(false);
        graphStage.setEdgeLabelsMovable(false);
        // 选择基本元素开启
        graphStage.setEnabled(graphEnable?graphEnable:false);

        // 启用一对多连接
        graphStage.setMultigraph(false);
        //鼠标覆盖高亮显示
        //var highlight = new mxCellTracker(graphStage, '#00FF00');

        //设置可编辑节点
        var oldEditable = graphStage.isCellEditable;
        graphStage.isCellEditable = function (cell) {
            var flag = false;
            var nodeType = cell.nodeType;
            if (nodeType == 'start') {
                flag = false;
            } else {
                flag = true;
            }
            return oldEditable.apply(this, arguments) && flag;
        };

        //cell添加后更改cell ID
        var oldCellAdded = model.cellAdded;

        model.cellAdded = function (cell) {
            var id = cell.getId();
            let self = this;
            if(!id){
                
                utils.getUUID().then(function(data){
                    cell.setId(data);
                    var participant = cell.participant || "[]";// = JSON.stringify(approvePartnerArr?approvePartnerArr:[]);
                    var ccPerson = cell.ccPerson || "[]";// = JSON.stringify(copyForPartnerArr?copyForPartnerArr:[]);
                    if(participant&&participant!=''){
                        try {
                            var participantArr = JSON.parse(participant);
                            var partnerArr = [];
                            $.each(participantArr,function (i,partner) {
                                partner.acId = data;
                                partnerArr.push(partner);
                            });
                            cell.participant = JSON.stringify(partnerArr);
                        }catch (e){
                            console.error(e);
                        }

                    }

                    if(ccPerson&&ccPerson!=''){
                        try {
                            var ccPersonArr = JSON.parse(ccPerson);
                            var partnerArr = [];
                            $.each(ccPersonArr,function (i,partner) {
                                partner.acId = data;
                                partnerArr.push(partner);
                            });
                            cell.ccPerson = JSON.stringify(partnerArr);
                        }catch (e){
                            console.error(e);
                        }
                    }
                    oldCellAdded.call(self, cell);
                });
            }else{
                oldCellAdded.call(self, cell);
            }

            
            
            // var participant = cell.participant;// = JSON.stringify(approvePartnerArr?approvePartnerArr:[]);
            // var ccPerson = cell.ccPerson;// = JSON.stringify(copyForPartnerArr?copyForPartnerArr:[]);
            // if(participant&&participant!=''){
            //     try {
            //         var participantArr = JSON.parse(participant);
            //         var partnerArr = [];
            //         $.each(participantArr,function (i,partner) {
            //             utils.getUUID().then(function(data){
            //                 partner.acId = data;
            //             });
            //             partnerArr.push(partner);
            //         });
            //         cell.participant = JSON.stringify(partnerArr);
            //     }catch (e){
            //         console.error(e);
            //     }

            // }

            // if(ccPerson&&ccPerson!=''){
            //     try {
            //         var ccPersonArr = JSON.parse(ccPerson);
            //         var partnerArr = [];
            //         $.each(ccPersonArr,function (i,partner) {
            //             utils.getUUID().then(function(data){
            //                 partner.acId = data;
            //             });
            //             partnerArr.push(partner);
            //         });
            //         cell.ccPerson = JSON.stringify(partnerArr);
            //     }catch (e){
            //         console.error(e);
            //     }
            // }

            // oldCellAdded.call(this, cell);
        };

        //单元格提示
        graphStage.getTooltipForCell = function(cell){
            var tip = null;

            if (cell != null && cell.getTooltip != null)
            {
                tip = cell.getTooltip();
            }
            else
            {
                if(cell.isEdge()){
                    tip = cell.value?('名称：'+ cell.value + ';\n'):'';
                    if(cell.conditionName){
                        tip += '条件表达式：' + cell.conditionName + ';\n';
                    }else if(cell.conditionFormula){
                        tip += '条件表达式：' + cell.conditionFormula + ';\n';
                    }

                }else{
                    if(cell.nodeType=='task'){
                        tip = '节点名称：'+cell.value + ';\n';
                        let extra = cell.extra ? (JSON.parse(cell.extra)):{};
                        switch(cell.approvalType){
                            case 1:
                                tip += '审批类型：审核' + ';\n';
                            break;
                            case 2:
                                tip += '审批类型：会签' + ';\n';
                            break;
                        }

                        //环节审批参与者
                        if(cell.participant&&cell.participant!=''){
                            var participantArr = JSON.parse(cell.participant);
                            var participantStr = '';
                            for(var i=0;i<participantArr.length;i++){
                                var participant = participantArr[i];
                                
                                switch (participant.approvalType){
                                    case 1:
                                        participantStr += "直属上级" + ';\n'
                                        break;
                                    case 3:
                                        participantStr += "用户：" + participant.approvalTypeName  + ';\n'
                                        break;
                                    case 5:
                                        participantStr += "发起人" + ';\n'
                                        break;
                                    default:
                                    let strN = participant.approvalTypeName.split(","),
                                        roleN = strN[0], deptN = strN[1];
                                    let strId = participant.approverId.split(","),
                                        roleId = strId[0], deptId = strId[1];
                                        participantStr += "角色+部门：" + roleN + deptN  + ';\n';
                                        break;
                                }

                            }
                            if(participantStr!=''){
                                tip += '环节审批人：\n【' + participantStr + '】\n';
                            }
                        }
                        //环节抄送参与者
                        if(cell.ccPerson&&cell.ccPerson!=''){
                            var ccPersonArr = JSON.parse(cell.ccPerson);
                            var ccPersonStr = '';
                            for(var i=0;i<ccPersonArr.length;i++){
                                var ccPerson = ccPersonArr[i];
                                ccPersonStr += ccPerson.name + ';\n';
                            }
                            if(ccPersonStr!=''){
                                tip += '环节抄送人：\n【' + ccPersonStr + '】\n';
                            }
                        }
                    }else if(cell.nodeType=='end'){
                        tip = '节点名称：'+cell.value + ';\n';
                        if(cell.extra&&cell.extra!=''){
                            // var extraJson = JSON.parse(cell.extra);
                            // if(extraJson.code){
                            //     tip += '编码：' + extraJson.code + ';\n';
                            // }

                            // if(cell.nodeType=='cc'){
                            //     if(extraJson.isAddLabel=='0'){
                            //         tip += '抄送人设置方式：在抄送节点中设置;\n';
                            //     }else if(extraJson.isAddLabel=='1'){
                            //         tip += '抄送人设置方式：流程发起时，由发起人指定抄送人;\n';
                            //     }
                            // }
                        }

                        //环节抄送参与者
                        if(cell.ccPerson&&cell.ccPerson!=''){
                            var ccPersonArr = JSON.parse(cell.ccPerson);
                            var ccPersonStr = '';
                            for(var i=0;i<ccPersonArr.length;i++){
                                var ccPerson = ccPersonArr[i];
                                ccPersonStr += ccPerson.name + ';\n';
                            }
                            if(ccPersonStr!=''){
                                tip += '环节抄送人：\n【' + ccPersonStr + '】\n';
                            }
                        }
                    }else{
                        tip = '节点名称：'+cell.value + ';\n';
                    }


                }

                //tip = this.convertValueToString(cell);
            }

            return tip;
        };

        //启用选择多个节点功能
        var rubberband = new mxRubberband(graphStage);

        // 设置连接线
        var style = graphStage.getStylesheet().getDefaultEdgeStyle();
        style[mxConstants.STYLE_ROUNDED] = false;
        style[mxConstants.STYLE_SEGMENT] = true;
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        graphStage.alternateEdgeStyle = 'elbow=vertical';

        // 渲染画图区域
        // model.beginUpdate();
        // try {
        //     if(xml){
        //         my.renderGraphFromXml(graphStage,xml);
        //     }
        // } finally {
        //     model.endUpdate();
        // }
        // utils.renderModelFromXml(graphStage,xml);
        // 关闭右键菜单
        this.setContextMenu(container, graphStage);

        return graphStage;
    },

    // 关闭右键菜单
    setContextMenu (container, graphStage) {
        var my = this;
        mxEvent.disableContextMenu(container);
        graphStage.popupMenuHandler.factoryMethod = function (menu, cell, evt) {
            return createPopupMenu(graphStage, menu, cell, evt);
        };

        function createPopupMenu(graph, menu, cell, evt) {
            if (cell != null) {
                menu.addItem('剪切',  'static/mxClient/images/editor/toolbar/cut.png', function () {
                    actions.getAction(graph, 'cut');
                });
                menu.addItem('复制', 'static/mxClient/images/editor/toolbar/copy.png', function () {
                    actions.getAction(graph, 'copy');
                });
                menu.addItem('粘贴',  'static/mxClient/images/editor/toolbar/paste.png', function () {
                    actions.getAction(graph, 'paste');
                });
                menu.addItem('删除', 'static/mxClient/images/editor/toolbar/delete.png', function () {
                    actions.getAction(graph, 'delete');
                });
            } else {
                if(mxClipboard.cells&&mxClipboard.cells.length>0){
                    menu.addItem('粘贴', 'static/mxClient/images/editor/toolbar/paste.png', function () {
                        actions.getAction(graph, 'paste');
                    });
                }
            }
        }

    },

    //绑定快捷键
    bindKeyHander (graph) {
        // escape键，取消操作
        let my = this;
        var keyHandler = new mxKeyHandler(graph);
        //剪切
        keyHandler.bindControlKey(88, function () {
            actions.getAction(graph, 'cut');
        });
        //复制
        keyHandler.bindControlKey(67, function () {
            actions.getAction(graph, 'copy');
        });
        //粘贴
        keyHandler.bindControlKey(86, function () {
            actions.getAction(graph, 'paste');
        });
        //删除
        keyHandler.bindKey(46, function () {
            actions.getAction(graph, 'delete');
        });

        //撤销
        keyHandler.bindControlKey(90, function () {
            actions.getAction(graph, 'undo');
        });

        //重做
        keyHandler.bindControlShiftKey(90, function () {
            actions.getAction(graph, 'redo');
        });
    },

    //初始化特定规则
    init () {
        let my = this;
        mxUtils.alert = function (message) {
            // $.xljUtils.confirm('blue',message,function () {});
        };

        mxConstants.VERTEX_SELECTION_STROKEWIDTH = 1;
        mxConstants.EDGE_SELECTION_STROKEWIDTH = 1;
        mxConstants.VERTEX_SELECTION_DASHED = false;
        mxConstants.EDGE_SELECTION_DASHED = true;
        mxConstants.OUTLINE_HIGHLIGHT_COLOR = "#AE81FF";
        mxConstants.VERTEX_SELECTION_COLOR = "#AE81FF";
        mxConstants.HIGHLIGHT_COLOR = "#AE81FF";
        mxConstants.EDGE_SELECTION_COLOR = "#AE81FF";
        mxConstants.DEFAULT_VALID_COLOR  = "#AE81FF";
        mxConstants.HANDLE_FILLCOLOR = "#AE81FF";
        mxConstants.VALID_COLOR = "#AE81FF";

        //添加copy或剪切时要忽略的节点属性
        // var mxTransientArr = mxCell.prototype.mxTransient;
        // mxTransientArr.push('id');
        // mxTransientArr.push('participant');
        // mxTransientArr.push('ccPerson');
        // mxTransientArr.push('conditionTranslation');
        // mxTransientArr.push('conditionExpression');
        // mxCell.prototype.mxTransient = mxTransientArr;

        mxGraph.prototype.allowAutoPanning = true;
        // 禁止改变元素大小
        mxGraph.prototype.isCellResizable = function (cell) {
            return false;
        };

        //graph 单元格双击事件
        mxGraph.prototype.dblClick = function (evt, cell) {
            var mxe = new mxEventObject(mxEvent.DOUBLE_CLICK, 'event', evt, 'cell', cell);
            this.fireEvent(mxe);

            // Handles the event if it has not been consumed
            if (this.isEnabled() && !mxEvent.isConsumed(evt) && !mxe.isConsumed() &&
                cell != null && this.isCellEditable(cell) && !this.isEditing(cell)) {
                //this.startEditingAtCell(cell, evt);
                if(cell.isEdge()){
                    actions.getAction(mxGraph,'stepProperties',cell);
                }else{
                    var nodeType = cell.nodeType;
                    switch (nodeType){
                        case 'fork':
                        actions.getAction(mxGraph,'forkProperties',cell);
                            break;
                        case 'task':
                        actions.getAction(mxGraph,'acProperties',cell);
                            break;
                        case 'end':
                        actions.getAction(mxGraph, 'acProperties',cell);
                            break;
                        case 'cc':
                        actions.getAction(mxGraph, 'ccProperties',cell);
                            break;
                        default:
                            break;
                    }
                }
                mxEvent.consume(evt);
            }
        };

        //限制单元格向左及向右移动
        mxGraph.prototype.moveCells = function(cells, dx, dy, clone, target, evt, mapping){
            //console.log(cells[0]);
            dx = (dx != null) ? dx : 0;
            dy = (dy != null) ? dy : 0;


            var g_y = cells[0].geometry.y;
            var g_x = cells[0].geometry.x;


            var bounds = this.getGraphBounds();
            //不能超出左上边界
            if(dx<0 && dx+g_x<0){
                dx = -g_x;
            }
            if(dy<0 && dy+g_y<0){
                dy = -g_y;
            }


            clone = (clone != null) ? clone : false;

            if (cells != null && (dx != 0 || dy != 0 || clone || target != null))
            {
                // Removes descandants with ancestors in cells to avoid multiple moving
                cells = this.model.getTopmostCells(cells);

                this.model.beginUpdate();
                try
                {
                    // Faster cell lookups to remove relative edge labels with selected
                    // terminals to avoid explicit and implicit move at same time
                    var dict = new mxDictionary();

                    for (var i = 0; i < cells.length; i++)
                    {
                        dict.put(cells[i], true);
                    }

                    var isSelected = mxUtils.bind(this, function(cell)
                    {
                        while (cell != null)
                        {
                            if (dict.get(cell))
                            {
                                return true;
                            }

                            cell = this.model.getParent(cell);
                        }

                        return false;
                    });

                    // Removes relative edge labels with selected terminals
                    var checked = [];

                    for (var i = 0; i < cells.length; i++)
                    {
                        var geo = this.getCellGeometry(cells[i]);
                        var parent = this.model.getParent(cells[i]);

                        if ((geo == null || !geo.relative) || !this.model.isEdge(parent) ||
                            (!isSelected(this.model.getTerminal(parent, true)) &&
                            !isSelected(this.model.getTerminal(parent, false))))
                        {
                            checked.push(cells[i]);
                        }
                    }

                    cells = checked;

                    if (clone)
                    {
                        cells = this.cloneCells(cells, this.isCloneInvalidEdges(), mapping);

                        if (target == null)
                        {
                            target = this.getDefaultParent();
                        }
                    }

                    // FIXME: Cells should always be inserted first before any other edit
                    // to avoid forward references in sessions.
                    // Need to disable allowNegativeCoordinates if target not null to
                    // allow for temporary negative numbers until cellsAdded is called.
                    var previous = this.isAllowNegativeCoordinates();

                    if (target != null)
                    {
                        this.setAllowNegativeCoordinates(true);
                    }

                    this.cellsMoved(cells, dx, dy, !clone && this.isDisconnectOnMove()
                        && this.isAllowDanglingEdges(), target == null,
                        this.isExtendParentsOnMove() && target == null);

                    this.setAllowNegativeCoordinates(previous);

                    if (target != null)
                    {
                        var index = this.model.getChildCount(target);
                        this.cellsAdded(cells, target, index, null, null, true);
                    }

                    // Dispatches a move event
                    this.fireEvent(new mxEventObject(mxEvent.MOVE_CELLS, 'cells', cells,
                        'dx', dx, 'dy', dy, 'clone', clone, 'target', target, 'event', evt));
                }
                finally
                {
                    this.model.endUpdate();
                }
            }
            return cells;
        };
        //节点删除
        mxGraph.prototype.isCellDeletable = function(cell,item){
            if(cell.nodeType == "start" || cell.nodeType == "end"){
                return false;
            }else{
                return true;
            }
        };

        // 启用对齐线帮助定位
        mxGraphHandler.prototype.guidesEnabled = true;

        mxEdgeHandler.prototype.snapToTerminals = true;

        // 设置连接图形
        mxConnectionHandler.prototype.connectImage = new mxImage('static/mxClient/images/editor/toolbar/connector.png', 16, 16);

        //设置可连接节点
        mxConnectionHandler.prototype.isConnectableCell = function (cell) {
            
            return true;
        };

        //根据情况禁用节点连接
        mxConnectionHandler.prototype.createIcons = function (state) {
            var image = this.getConnectImage(state);

            if (image != null && state != null) {
                this.iconState = state;
                var icons = [];

                // Cannot use HTML for the connect icons because the icon receives all
                // mouse move events in IE, must use VML and SVG instead even if the
                // connect-icon appears behind the selection border and the selection
                // border consumes the events before the icon gets a chance
                var bounds = new mxRectangle(0, 0, image.width, image.height);
                var icon = new mxImageShape(bounds, image.src, null, null, 0);
                icon.preserveImageAspect = false;

                if (this.isMoveIconToFrontForState(state)) {
                    icon.dialect = mxConstants.DIALECT_STRICTHTML;
                    icon.init(this.graph.container);
                } else {
                    icon.dialect = (this.graph.dialect == mxConstants.DIALECT_SVG) ?
                        mxConstants.DIALECT_SVG : mxConstants.DIALECT_VML;
                    icon.init(this.graph.getView().getOverlayPane());

                    // Move the icon back in the overlay pane
                    if (this.moveIconBack && icon.node.previousSibling != null) {
                        icon.node.parentNode.insertBefore(icon.node, icon.node.parentNode.firstChild);
                    }
                }

                icon.node.style.cursor = mxConstants.CURSOR_CONNECT;

                // Events transparency
                var getState = mxUtils.bind(this, function () {
                    return (this.currentState != null) ? this.currentState : state;
                });

                // Updates the local icon before firing the mouse down event.
                var mouseDown = mxUtils.bind(this, function (evt) {
                    if (!mxEvent.isConsumed(evt)) {
                        this.icon = icon;
                        this.graph.fireMouseEvent(mxEvent.MOUSE_DOWN,
                            new mxMouseEvent(evt, getState()));
                    }
                });

                var currentCell = state.cell;
                var currentCellNodeType = currentCell.nodeType;
                if (currentCellNodeType != 'fork') {
                    switch (currentCellNodeType) {
                        case 'end':
                            break;
                        case 'start':
                            var edges = currentCell.edges;

                            if (!edges) {
                                mxEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);
                                icons.push(icon);
                                this.redrawIcons(icons, this.iconState);
                            } else {
                                var edges = currentCell.edges;
                                if (edges == null) {
                                    mxEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);
                                    icons.push(icon);
                                    this.redrawIcons(icons, this.iconState);
                                    break;
                                }
                                var isEdgeSource = false;
                                for (var i = 0; i < edges.length; i++) {
                                    var edge = edges[i];
                                    var source = edge.source;
                                    if (source == currentCell) {
                                        isEdgeSource = true;
                                        break;
                                    }
                                }
                                if (!isEdgeSource) {
                                    mxEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);
                                    icons.push(icon);
                                    this.redrawIcons(icons, this.iconState);
                                }
                            }
                            break;
                        case 'task':
                            var edges = currentCell.edges;
                            if (!edges) {
                                mxEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);
                                icons.push(icon);
                                this.redrawIcons(icons, this.iconState);
                            } else {
                                var isEdgeSource = false;
                                for (var i = 0; i < edges.length; i++) {
                                    var edge = edges[i];
                                    var source = edge.source;
                                    if (source == currentCell) {
                                        isEdgeSource = true;
                                        break;
                                    }
                                }
                                if (!isEdgeSource) {
                                    mxEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);
                                    icons.push(icon);
                                    this.redrawIcons(icons, this.iconState);
                                }
                            }

                            break;
                        case 'cc':
                            var edges = currentCell.edges;
                            if (!edges) {
                                mxEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);
                                icons.push(icon);
                                this.redrawIcons(icons, this.iconState);
                            } else {
                                var isEdgeSource = false;
                                for (var i = 0; i < edges.length; i++) {
                                    var edge = edges[i];
                                    var source = edge.source;
                                    if (source == currentCell) {
                                        isEdgeSource = true;
                                        break;
                                    }
                                }
                                if (!isEdgeSource) {
                                    mxEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);
                                    icons.push(icon);
                                    this.redrawIcons(icons, this.iconState);
                                }
                            }

                            break;
                        case 'join':
                            var edges = currentCell.edges;
                            if (!edges) {
                                mxEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);
                                icons.push(icon);
                                this.redrawIcons(icons, this.iconState);
                            } else {
                                var isEdgeSource = false;
                                for (var i = 0; i < edges.length; i++) {
                                    var edge = edges[i];
                                    var source = edge.source;
                                    if (source == currentCell) {
                                        isEdgeSource = true;
                                        break;
                                    }
                                }
                                if (!isEdgeSource) {
                                    mxEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);
                                    icons.push(icon);
                                    this.redrawIcons(icons, this.iconState);
                                }
                            }
                            break;

                    }
                } else {
                    mxEvent.redirectMouseEvents(icon.node, this.graph, getState, mouseDown);

                    icons.push(icon);
                    this.redrawIcons(icons, this.iconState);
                }

                return icons;
            }

            return null;
        };

        //验证连接（首次创建连接线）
        mxConnectionHandler.prototype.validateConnection = function (source, target) {
            let msg = "";
            if (!target.isEdge()) {
                var nodeType = target.nodeType;

                // if(source.nodeType == "fork" && nodeType == "join"){
                //     return '条件网关节点不允许直接与聚合网关连接'
                // }
                if (nodeType == 'start') {
                    return '开始节点不允许作为目标连接节点';

                } else if (nodeType == 'end') {
                    var edgeCount = target.getEdgeCount();
                    if (edgeCount > 0) {
                        return '结束节点已连接';
                    }
                } else if (nodeType == 'task' || nodeType == 'fork' || nodeType == 'cc') {
                    var edges = target.edges;
                    var targetIsConnected = false;
                    if (edges) {
                        for (var i = 0; i < edges.length; i++) {
                            var obj = edges[i];
                            if (obj.target == target) {
                                targetIsConnected = true;
                                break;
                            }
                        }
                    }
                    if (targetIsConnected) {
                        return '当前节点已是目标连接点';
                    }
                }

                if(source==target){
                    return '源节点和目标节点不能相同';
                }

            }else{
                return '连线不能作为目标节点';
            }

        };

        //验证连接（拖动连接线时）
        mxEdgeHandler.prototype.validateConnection = function(source, target){
            if (!target.isEdge()) {
                var nodeType = target.nodeType;
                if (nodeType == 'start') {
                    return '开始节点不允许作为目标连接节点';

                } else if (nodeType == 'end') {
                    var edgeCount = target.getEdgeCount();
                    if (edgeCount > 0) {
                        return '结束节点已连接';
                    }
                } else if (nodeType == 'task' || nodeType == 'fork' || nodeType == 'cc') {
                    var edges = target.edges;
                    var targetIsConnected = false;
                    if (edges) {
                        for (var i = 0; i < edges.length; i++) {
                            var obj = edges[i];
                            if (obj.target == target) {
                                targetIsConnected = true;
                                break;
                            }
                        }
                    }
                    if (targetIsConnected) {
                        return '当前节点已是目标连接点';
                    }
                }

            }else{
                return '连线不能作为目标节点';
            }
        };
    },

    //定义画布样式
    setDefaultCellStyle (graph) {
        //default vertex style
        var style = graph.getStylesheet().getDefaultVertexStyle();
        
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_FONTSIZE] = 11;
        style[mxConstants.STYLE_FONTFAMILY] = 'Arial,Helvetica';
        style[mxConstants.STYLE_FONTSTYLE] = 0;
        style[mxConstants.STYLE_FONTCOLOR] = '#333';
        style[mxConstants.STYLE_STROKECOLOR] = 'transparent';
        style[mxConstants.STYLE_FILLCOLOR] = 'transparent';
        // style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        //style[mxConstants.STYLE_GRADIENT_DIRECTION] = mxConstants.DIRECTION_EAST;
        style[mxConstants.STYLE_ROUNDED] = true;
        style[mxConstants.STYLE_SHADOW] = false;
        style[mxConstants.STYLE_IMAGE_HEIGHT] = 112;
        style[mxConstants.STYLE_IMAGE_WIDTH] = 48;
        style[mxConstants.STYLE_IMAGE] =  'static/mxClient/images/editor/sidebar/task.png';
        graph.getStylesheet().putCellStyle('task', style);

        //default edge style
        style = graph.getStylesheet().getDefaultEdgeStyle();
        
        
        style[mxConstants.STYLE_STROKECOLOR] = '#3897EC';
        // style[mxConstants.EDGE_SELECTION_COLOR] = "#AE81FF";
        style[mxConstants.STYLE_ROUNDED] = false;
        style[mxConstants.STYLE_SEGMENT] = true;
        style[mxConstants.STYLE_SHADOW] = false;
        style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
        //default step style
        style = [];

        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RhombusPerimeter;
        // style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        style[mxConstants.STYLE_STROKECOLOR] = '#91BCC0';
        style[mxConstants.STYLE_FILLCOLOR] = '#91BCC0';
        // style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
        style[mxConstants.STYLE_FONTSIZE] = 11;
        style[mxConstants.STYLE_FONTFAMILY] = 'Arial,Helvetica';
        style[mxConstants.STYLE_FONTSTYLE] = 0;
        style[mxConstants.STYLE_FONTCOLOR] = '#333';
        graph.getStylesheet().putCellStyle('step', style);

        //default start style
        style = [];
        // console.log("mxConstants=============mxConstants");
        // console.log(mxConstants);
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
        style[mxConstants.STYLE_FILLCOLOR] = '#46A7FF';
        style[mxConstants.STYLE_GRADIENTCOLOR] = false;
        style[mxConstants.STYLE_STROKECOLOR] = '#2C92EE';
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        // style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;
        // style[mxConstants.STYLE_MARGIN] = 30;
        style[mxConstants.STYLE_FONTSIZE] = 11;
        style[mxConstants.STYLE_FONTFAMILY] = 'Arial,Helvetica';
        style[mxConstants.STYLE_FONTCOLOR] = '#333';
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
        style[mxConstants.STYLE_IMAGE_HEIGHT] = 50;
        style[mxConstants.STYLE_IMAGE_WIDTH] = 50;
        style[mxConstants.STYLE_IMAGE] =  'static/mxClient/images/editor/sidebar/start.png';
        
        graph.getStylesheet().putCellStyle('start', style);

        //default end style
        style = mxUtils.clone(style);
        style[mxConstants.STYLE_FILLCOLOR] = '#36BF63';
        style[mxConstants.STYLE_STROKECOLOR] = '#1EA64B';
        // style[mxConstants.STYLE_INDICATOR_IMAGE] = 'static/mxClient/images/editor/sidebar/over.png'
        style[mxConstants.STYLE_IMAGE] =  'static/mxClient/images/editor/sidebar/over.png';
        graph.getStylesheet().putCellStyle('end', style);

        style = [];
        style[mxConstants.STYLE_FONTSIZE] = 11;
        style[mxConstants.STYLE_FONTFAMILY] = 'Arial,Helvetica';
        style[mxConstants.STYLE_FONTSTYLE] = 0;
        style[mxConstants.STYLE_FONTCOLOR] = '#333';
        style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
        //style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
        style[mxConstants.STYLE_SHADOW] = false;
        style[mxConstants.STYLE_ROUNDED] = false;
        // 背景图片宽
        style[mxConstants.STYLE_IMAGE_WIDTH] = 60;
        // 背景图片高
        style[mxConstants.STYLE_IMAGE_HEIGHT] = 60;
        //style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
        style[mxConstants.STYLE_FONTCOLOR] = '#333';
        style[mxConstants.STYLE_FILLCOLOR] = 'transparent';
        style[mxConstants.STYLE_STROKECOLOR] = 'transparent';
        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
        style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
        style[mxConstants.STYLE_IMAGE] =  'static/mxClient/images/editor/sidebar/condition.png';
        graph.getStylesheet().putCellStyle('fork', style);

        style = mxUtils.clone(style);
        style[mxConstants.STYLE_IMAGE] =  'static/mxClient/images/editor/sidebar/dispatch.png';
        graph.getStylesheet().putCellStyle('join', style);
        
        //抄送样式
        style = mxUtils.clone(style);
        style[mxConstants.STYLE_IMAGE] = 'static/mxClient/images/editor/sidebar/message.png';
        graph.getStylesheet().putCellStyle('cc', style);
    }
}
export default stage;