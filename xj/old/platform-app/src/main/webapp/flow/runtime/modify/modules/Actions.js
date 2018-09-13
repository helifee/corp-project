console.info('>> module "actions" is loaded');
/**
 * 处理工具栏的动作
 */
define(['utils'], function (utils) {
    var textInput = document.createElement('textarea');
    var undoManager;
    var preview;
    var lastPaste = null;
    var gs;
    var dx = 0;
    var dy = 0;

    // 须要初始化一些对象，例如undo管理类
    var init = function (graphStage) {
        gs = graphStage.gridSize;
        // 设置undo/redo
        undoManager = new mxUndoManager(100);
        var _listener = function (sender, evt) {
            undoManager.undoableEditHappened(evt.getProperty('edit'));
        };
        graphStage.getModel().addListener(mxEvent.UNDO, _listener);
        graphStage.getView().addListener(mxEvent.UNDO, _listener);

        // 创建粘贴板
        mxUtils.setOpacity(textInput, 0);
        textInput.style.width = '1px';
        textInput.style.height = '1px';
        textInput.style.display = 'none';
        document.body.appendChild(textInput);

    };

    //添加节点
    var addVertex = function (graph,icon, w, h, style) {
        var defaultValue = null;
        var vertex = new mxCell(defaultValue, new mxGeometry(0, 40, w, h), style);
        var encoder = new mxCodec();
        var node = encoder.encode(vertex);

        if(style=='start'){
            defaultValue = '开始';
            node.setAttribute('nodeType','start');
        }
        if(style=='end'){
            defaultValue = '结束';
            node.setAttribute('nodeType','end');
        }
        if(style=='fork'){
            defaultValue = '条件网关';
            node.setAttribute('nodeType','fork');
        }
        if(style=='join'){
            defaultValue = '聚合网关';
            node.setAttribute('nodeType','join');
        }
        if(style=='task'){
            defaultValue = '新节点';
            node.setAttribute('nodeType','task');
        }
        if(style=='cc'){
            defaultValue = '抄送';
            node.setAttribute('nodeType','cc');
        }

        var xml = mxUtils.getXml(node);
        var doc = mxUtils.parseXml(xml);
        var codec = new mxCodec(doc);
        var elt = doc.documentElement;
        var cells = [];

        while (elt != null)
        {
            cells.push(codec.decode(elt));
            elt = elt.nextSibling;
        }
        vertex = cells[0];
        vertex.setValue(defaultValue);
        vertex.setVertex(true);

        return vertex;
    };

    //前加签
    var addNewTask = function (graph,preOrBehind) {
        var selectedCell = graph.getSelectionCell();
        var edges = selectedCell.edges;
        var sourceEdge;
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];

            if(preOrBehind=='pre' && edge.target==selectedCell && selectedCell.nodeType!='start'){
                //前加签
                sourceEdge = edge;


                var parent = graph.getDefaultParent();
                graph.getModel().beginUpdate();
                try {
                    var newVertex = addVertex(graph,'images/editor/sidebar/block.png', 100, 40, 'task');
                    graph.addCell(newVertex,parent);
                    sourceEdge.target = newVertex;
                }finally {
                    graph.getModel().endUpdate();
                }


            }else if(preOrBehind=='behind' && edge.source==selectedCell && selectedCell.nodeType!='end'){
                //后加签
                sourceEdge = edge;
                var newVertex = addVertex(graph,'images/editor/sidebar/block.png', 100, 40, 'task');
                sourceEdge.source = newVertex;
            }
        }


    };

    // 定义每个按钮的动作
    var getAction = function (graphStage, oprType) {
        switch (oprType) {
            case 'baseInfo':
                var frame = document.createElement('iframe');
                frame.setAttribute('width', '100%');
                frame.setAttribute('height', '100%');
                var fakeUrlForTest = hostUrl + 'flow/runtime/modify/instance_base.html';
                frame.setAttribute('src', fakeUrlForTest);
                frame.style.backgroundColor = 'white';
                utils.openFrameWnd(frame, '修改可阅人', 1.0);
                break;
            //节点信息
            case 'acProperties':
                var frame = document.createElement('iframe');
                frame.setAttribute('width', '100%');
                frame.setAttribute('height', '100%');
                var fakeUrlForTest = hostUrl + 'flow/runtime/modify/instance_ac.html';
                frame.setAttribute('src', fakeUrlForTest);
                frame.style.backgroundColor = 'white';
                utils.openFrameWnd(frame, '审批环节信息', 1.0);
                break;

            //抄送信息
            case 'ccProperties':
                var frame = document.createElement('iframe');
                frame.setAttribute('width', '100%');
                frame.setAttribute('height', '100%');
                var fakeUrlForTest = hostUrl + 'flow/runtime/modify/instance_cc.html';
                frame.setAttribute('src', fakeUrlForTest);
                frame.style.backgroundColor = 'white';
                utils.openFrameWnd(frame, '抄送节点信息', 1.0);
                break;

            //前加签
            case 'preAdd':
                addNewTask(graphStage,'pre');
                break;

            //后加签
            case 'behindAdd':
                addNewTask(graphStage,'behind');
                break;

            case 'zoomin':
                graphStage.zoomIn();
                break;

            case 'zoomout':
                graphStage.zoomOut();
                break;

            case 'zoomactual':
                graphStage.zoomActual();
                break;

            case 'copy':
                mxClipboard.copy(graphStage);

                break;

            case 'paste':
                var copyCells = mxClipboard.paste(graphStage);
                console.info(copyCells);
                for (var i = 0; i < copyCells.length; i++) {
                    var cell = copyCells[i];
                    cell.isExecuteNode = false;
                    cell.style = cell.nodeType ;
                    utils.updateCellAttr(cell.id,'style',cell.nodeType);
                }
                break;

            case 'cut':
                mxClipboard.cut(graphStage);
                break;

            case 'delete':
                if (!graphStage.isSelectionEmpty()) {
                    graphStage.stopEditing(false);
                    var cells = graphStage.getSelectionCells();
                    for (var i = 0; i < cells.length; i++) {
                        var cell = cells[i];
                        var nodeType = cell.nodeType;
                        if(nodeType=='start'){
                            $.xljUtils.tip('blue','开始节点不能删除！');
                            graphStage.clearSelection();
                            graphStage.setSelectionCell(cell);
                            return;
                        }else if(nodeType=='end'){
                            $.xljUtils.tip('blue','结束节点不能删除！');
                            graphStage.clearSelection();
                            graphStage.setSelectionCell(cell);
                            return;
                        }

                        var isExecuteNode = cell.isExecuteNode;
                        if(isExecuteNode=='true'){
                            $.xljUtils.tip('blue','已执行的节点不能删除！');
                            graphStage.clearSelection();
                            graphStage.setSelectionCell(cell);
                            return;
                        }
                    }

                    graphStage.removeCells(cells);
                } else {
                    mxUtils.error('请先选择一个元素', 200, true);
                }
                break;

            case 'undo':
                undoManager.undo();
                break;

            case 'redo':
                undoManager.redo();
                break;

            default:
                break;
        }
    };



    return {
        init: init,
        getAction: getAction,
    };
});