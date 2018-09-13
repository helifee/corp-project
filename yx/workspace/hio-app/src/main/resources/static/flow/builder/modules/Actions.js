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

    // 异步获取所有数据
    var fetchAllFlowData = function (cb) {
        $.ajax({
            type: 'get',
            url:   "http://127.0.0.1:9999/platform-app/flow/fl/getAll/" + utils.getUrlParam('flId') + "?time=" + new Date().getTime(),
            success: function (data) {
                if (data.success && data.result) {
                    return cb(data.result);
                }
            },
            error: function (xhr) {

            }
        });
    };

    // 定义每个按钮的动作
    var getAction = function (graphStage, oprType) {
        switch (oprType) {
            case 'baseInfo':
                var frame = document.createElement('iframe');
                frame.setAttribute('width', '100%');
                frame.setAttribute('height', '100%');
                var fakeUrlForTest = serviceUrl + 'flow/builder/fl_base.html';
                frame.setAttribute('src', fakeUrlForTest);
                frame.style.backgroundColor = 'white';
                utils.openFrameWnd(frame, '基本信息', 1.0);
                break;

            case 'emulation':
                var frame = document.createElement('iframe');
                frame.setAttribute('width', '100%');
                frame.setAttribute('height', '100%');
                var fakeUrlForTest = serviceUrl + 'flow/builder/fl_emulation.html';
                frame.setAttribute('src', fakeUrlForTest);
                frame.style.backgroundColor = 'white';
                utils.openFrameWnd(frame, '流程仿真', 1.0);
                break;

            //节点信息
            case 'acProperties':
                var frame = document.createElement('iframe');
                frame.setAttribute('width', '100%');
                frame.setAttribute('height', '100%');
                var fakeUrlForTest = serviceUrl + 'flow/builder/fl_ac.html';
                frame.setAttribute('src', fakeUrlForTest);
                frame.style.backgroundColor = 'white';
                utils.openFrameWnd(frame, '审批环节信息', 1.0);
                break;
                
              //抄送信息
            case 'ccProperties':
                var frame = document.createElement('iframe');
                frame.setAttribute('width', '100%');
                frame.setAttribute('height', '100%');
                var fakeUrlForTest = serviceUrl + 'flow/builder/fl_cc.html';
                frame.setAttribute('src', fakeUrlForTest);
                frame.style.backgroundColor = 'white';
                utils.openFrameWnd(frame, '抄送节点信息', 1.0);
                break;

            //连接线基本信息
            case 'stepProperties':
                var frame = document.createElement('iframe');
                frame.setAttribute('width', '100%');
                frame.setAttribute('height', '100%');
                var fakeUrlForTest = serviceUrl + 'flow/builder/fl_fork.html';
                frame.setAttribute('src', fakeUrlForTest);
                frame.style.backgroundColor = 'white';
                utils.openFrameWnd(frame, '条件表达式', 1.0);
                break;

            //条件网关基本信息
            case 'forkProperties':
                var frame = document.createElement('iframe');
                frame.setAttribute('width', '100%');
                frame.setAttribute('height', '100%');
                var fakeUrlForTest = serviceUrl + 'flow/builder/fl_fork_multi.html';
                frame.setAttribute('src', fakeUrlForTest);
                frame.style.backgroundColor = 'white';
                utils.openFrameWnd(frame, '条件网关', 1.0);
                break;

            //引用流程
            case 'duplication':
                var frame = document.createElement('iframe');
                //frame.setAttribute('width', '100%');
                //frame.setAttribute('height', '100%');
                var fakeUrlForTest = serviceUrl + 'flow/builder/fl_reference.html';
                frame.setAttribute('src', fakeUrlForTest);
                frame.style.backgroundColor = 'white';
                utils.openFrameWnd(frame, '流程配置-引用流程', 1.0);
                break;

            case 'preview':
                preview = new mxPrintPreview(graphStage);
                preview.marginTop = 10;
                preview.open();
                break;

            case 'print':
                preview = new mxPrintPreview(graphStage);
                preview.marginTop = 10;
                preview.print();
                break;

            case 'refresh':
                //
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
                //copyCells(graphStage, mxUtils.sortCells(graphStage.model.getTopmostCells(graphStage.getSelectionCells())));
                mxClipboard.copy(graphStage);
                break;

            case 'paste':
                //pasteText(graphStage, lastPaste);
                mxClipboard.paste(graphStage);
                break;

            case 'cut':
                /*if (graphStage.isEnabled() && !graphStage.isSelectionEmpty()) {
                    copyCells(graphStage, graphStage.removeCells());
                    dx = -gs;
                    dy = -gs;
                }*/
                mxClipboard.cut(graphStage);
                break;

            case 'delete':
                if (!graphStage.isSelectionEmpty()) {
                    graphStage.stopEditing(false);
                    var cell = graphStage.getSelectionCell();
                    var cells = graphStage.getSelectionCells();
                    graphStage.removeCells(cells);
                    /*mxGraph.prototype.removeCellsFromParent(cells);*/
                    //graphStage.refresh(cells);
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

            case 'arrange':
                // var layout = new mxFastOrganicLayout(graphStage);
                // var parent = graphStage.getDefaultParent();
                // layout.execute(parent);
                break;

            default:
                break;
        }
    };

    /**
     * 剪贴板部分代码
     */
    var copyCells = function (graph, cells) {
        if (cells.length > 0) {
            var clones = graph.cloneCells(cells);

            // Checks for orphaned relative children and makes absolute
            for (var i = 0; i < clones.length; i++) {
                var state = graph.view.getState(cells[i]);

                if (state != null) {
                    var geo = graph.getCellGeometry(clones[i]);

                    if (geo != null && geo.relative) {
                        geo.relative = false;
                        geo.x = state.x / state.view.scale - state.view.translate.x;
                        geo.y = state.y / state.view.scale - state.view.translate.y;
                    }
                }
            }

            textInput.value = utils.cellsToString(clones);
        }

        textInput.select();
        lastPaste = textInput.value;
    };

    // 粘贴
    var pasteText = function (graphStage, text) {
        if (!text) {
            return;
        }
        var xml = mxUtils.trim(text);
        var x = graphStage.container.scrollLeft / graphStage.view.scale - graphStage.view.translate.x;
        var y = graphStage.container.scrollTop / graphStage.view.scale - graphStage.view.translate.y;

        if (xml.length > 0) {
            if (lastPaste != xml) {
                lastPaste = xml;
                dx = 0;
                dy = 0;
            } else {
                dx += gs;
                dy += gs;
            }

            // Standard paste via control-v
            if (xml.substring(0, 14) == '<mxGraphModel>') {
                graphStage.setSelectionCells(importXml(graphStage, xml, dx, dy));
                graphStage.scrollCellToVisible(graphStage.getSelectionCell());
            }
        }
    };

    var importXml = function (graph, xml, dx, dy) {
        dx = (dx != null) ? dx : 0;
        dy = (dy != null) ? dy : 0;
        var cells = [];

        try {
            var doc = mxUtils.parseXml(xml);
            var node = doc.documentElement;

            if (node != null) {
                var model = new mxGraphModel();
                var codec = new mxCodec(node.ownerDocument);
                codec.decode(node, model);

                var childCount = model.getChildCount(model.getRoot());
                var targetChildCount = graph.model.getChildCount(graph.model.getRoot());

                // Merges existing layers and adds new layers
                graph.model.beginUpdate();
                try {
                    for (var i = 0; i < childCount; i++) {
                        var parent = model.getChildAt(model.getRoot(), i);

                        // Adds cells to existing layers if not locked
                        if (targetChildCount > i) {
                            // Inserts into active layer if only one layer is being pasted
                            var target = (childCount == 1) ? graph.getDefaultParent() : graph.model.getChildAt(graph.model.getRoot(), i);

                            if (!graph.isCellLocked(target)) {
                                var children = model.getChildren(parent);
                                cells = cells.concat(graph.importCells(children, dx, dy, target));
                            }
                        } else {
                            // Delta is non cascading, needs separate move for layers
                            parent = graph.importCells([parent], 0, 0, graph.model.getRoot())[0];
                            var children = graph.model.getChildren(parent);
                            graph.moveCells(children, dx, dy);
                            cells = cells.concat(children);
                        }
                    }
                } finally {
                    graph.model.endUpdate();
                }
            }
        } catch (e) {
            mxUtils.error(e, true);
            throw e;
        }

        return cells;
    };


    return {
        init: init,
        getAction: getAction,
        fetchAllFlowData: fetchAllFlowData
    };
});