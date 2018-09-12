import  utils  from "@/containers/main/flowClient/utils.js"
import setFlowAPI from "@/containers/main/approve/set/setFlowAPI.js"//流程配置的调用接口

let action = {
    textInput : document.createElement('textarea'),
    dx : 0,
    dy : 0,
    // 须要初始化一些对象，例如undo管理类
    init (graphStage) {
        var my = this;
        this.gs = graphStage.gridSize;
        // 设置undo/redo
        this.undoManager = new mxUndoManager(100);
       
        var _listener = function (sender, evt) {
            my.undoManager.undoableEditHappened(evt.getProperty('edit'));
        };
        graphStage.getModel().addListener(mxEvent.UNDO, _listener);
        graphStage.getView().addListener(mxEvent.UNDO, _listener);

        // 创建粘贴板
        mxUtils.setOpacity(this.textInput, 0);
        this.textInput.style.width = '1px';
        this.textInput.style.height = '1px';
        this.textInput.style.display = 'none';
        document.body.appendChild(this.textInput);

    },
    // creatCoverBox (frame,wndProp){
    //     var coverDiv = document.createElement("div");
    //     $(coverDiv).addClass("coverLayerDiv");
    //     document.body.appendChild(coverDiv);
    //     //关闭事件
    //     // wndProp.destroy();
    // },
    // 异步获取所有数据
    fetchAllFlowData (cb) {
        let my = this;
        $.ajax({
            type: 'get',
            url: hostUrl + "flow/fl/getAll/" + utils.getUrlParam('flId') + "?time=" + new Date().getTime(),
            success: function (data) {
                if (data.success && data.result) {
                    return cb(data.result);
                }
            },
            error: function (xhr) {

            }
        });
    },
    setPasteVal(cell,cellId){
        let participant = cell.participant ? JSON.parse(cell.participant) : [];
        let ccPerson = cell.ccPerson ? JSON.parse(cell.ccPerson) : [];
        if(participant && participant.length){
            participant.forEach(element => {
                element.flowAcId = cellId;
            });
        }
        if(ccPerson && ccPerson.length){
            ccPerson.forEach(element =>{
                element.flowAcId = cellId;
            })
        }
        cell.participant = JSON.stringify(participant);
        cell.ccPerson = JSON.stringify(ccPerson);
    },
    pasteSetNewVal(cell){
        let cellId = cell.getId();
        let my = this;
        if(!cellId){
            utils.getUUID().then(function(data){
                cell.setId(data);
                cellId = data;
                my.setPasteVal(cell,cellId);
            })
        }else{
            my.setPasteVal(cell,cellId);
        }
        
    },
    // 定义每个按钮的动作
    getAction (graphStage, oprType,cell) {
        let my = this;
        switch (oprType) {


            //节点信息
            case 'acProperties':
                

                //调用vue组件的接口
                console.info("acProperties")
                setFlowAPI.acProperties(cell)
                break;
            //连接线基本信息
            case 'stepProperties':


                //调用vue组件的接口
                console.info("stepProperties")
                setFlowAPI.stepProperties(cell)
                break;

            //条件网关基本信息
            case 'forkProperties':

                
                //调用vue组件的接口
                console.info("forkProperties")
                setFlowAPI.forkProperties(cell)

    
                break;

            case 'preview':
                my.preview = new mxPrintPreview(graphStage);
                my.preview.marginTop = 10;
                my.preview.open();
                break;

            case 'print':
                my.preview = new mxPrintPreview(graphStage);
                my.preview.marginTop = 10;
                my.preview.print();
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
                var cell = graphStage.getSelectionCell();
                this.pasteSetNewVal(cell);
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
                my.undoManager.undo();
                break;

            case 'redo':
                my.undoManager.redo();
                break;

            case 'arrange':
                // var layout = new mxFastOrganicLayout(graphStage);
                // var parent = graphStage.getDefaultParent();
                // layout.execute(parent);
                break;

            default:
                break;
        }
    },

    /**
     * 剪贴板部分代码
     */
    copyCells (graph, cells) {
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

            this.textInput.value = utils.cellsToString(clones);
        }

        this.textInput.select();
        this.lastPaste = this.textInput.value;
    },

    // 粘贴
    pasteText (graphStage, text) {
        var my = this;
        if (!text) {
            return;
        }
        var xml = mxUtils.trim(text);
        var x = graphStage.container.scrollLeft / graphStage.view.scale - graphStage.view.translate.x;
        var y = graphStage.container.scrollTop / graphStage.view.scale - graphStage.view.translate.y;

        if (xml.length > 0) {
            if (this.lastPaste != xml) {
                this.lastPaste = xml;
                this.dx = 0;
                this.dy = 0;
            } else {
                this.dx += this.gs;
                this.dy += this.gs;
            }

            // Standard paste via control-v
            if (xml.substring(0, 14) == '<mxGraphModel>') {
                graphStage.setSelectionCells(my.importXml(graphStage, xml, this.dx, this.dy));
                graphStage.scrollCellToVisible(graphStage.getSelectionCell());
            }
        }
    },

    importXml (graph, xml, dx, dy) {
        this.dx = (dx != null) ? dx : 0;
        this.dy = (dy != null) ? dy : 0;
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
                                cells = cells.concat(graph.importCells(children, this.dx, this.dy, target));
                            }
                        } else {
                            // Delta is non cascading, needs separate move for layers
                            parent = graph.importCells([parent], 0, 0, graph.model.getRoot())[0];
                            var children = graph.model.getChildren(parent);
                            graph.moveCells(children, this.dx, this.dy);
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
    }
}
export default action;