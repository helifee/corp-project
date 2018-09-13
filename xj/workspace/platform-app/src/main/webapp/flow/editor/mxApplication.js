

/*
 * Copyright (c) 2006-2013, JGraph Ltd
 *
 * Defines the startup sequence of the application.
 */
{
    /**
     * Constructs a new application (returns an mxEditor instance)
     */
    function createEditor(config,status)
    {			
        var editor = null;
        var hideSplash = function()
        {
            // Fades-out the splash screen
            var splash = document.getElementById('splash');

            if (splash != null)
            {
                try
                {
                    mxEvent.release(splash);
                    mxEffects.fadeOut(splash, 100, true);
                }
                catch (e)
                {
                    splash.parentNode.removeChild(splash);
                }
            }
        };

        try
        {
            if (!mxClient.isBrowserSupported())
            {
                mxUtils.error('Browser is not supported!', 200, false);
            }
            else
            {
                mxObjectCodec.allowEval = true;

                var node = mxUtils.load(config).getDocumentElement();
                editor = new mxEditor(node);
                mxObjectCodec.allowEval = false;

                // Adds active border for panning inside the container
                editor.graph.createPanningManager = function()
                {
                    var pm = new mxPanningManager(this);
                    pm.border = 30;

                    return pm;
                };

                editor.graph.addListener(mxEvent.MOVE_CELLS, function (sender, evt) {
                    //autoscaleResize();
                });
                editor.graph.addListener(mxEvent.MOUSE_MOVE, function (sender, evt) {
                    console.log(evt);
                    console.log(sender);
                    //autoscaleResize();
                });

                mxConnectionHandler.prototype.connectImage  = new mxImage(hostUrl + 'flow/editor/images/connector.gif', 16, 16);

                // Enables connections in the graph and disables
                // reset of zoom and translate on root change
                // (ie. switch between XML and graphical mode).
                editor.graph.setConnectable(true);

                // Clones the source if new connection has no target=
                mxConnectionHandler.prototype.isCreateTarget = function(evt){
                    return true;
                }
                
                //add by zhangdaoqiang start
                var cloneCell = mxCell.prototype.clone;
                mxCell.prototype.clone = function()
                {
                	var clone = cloneCell.call(this);
                	
                	//增加拷贝来源ID
                	//从拷贝按钮或键盘操作时（此时有两个clone动作：1：copy时，2：paste时，所以不能直接拷贝id）
                	if(this.id == null) {
                		clone.copyFrom = this.copyFrom;
                		
                		//用鼠标拖动时
                	} else {
                		clone.copyFrom = this.id;
                	}
                	return clone;
                };
                //add by zhangdaoqiang end                
                
                //add by zhangdaoqiang 执行节点内部配置的拷贝 start
                var cellsAdded = mxGraph.prototype.cellsAdded;
                mxGraph.prototype.cellsAdded = function(cells, parent, index, source, target, absolute, constrain) {
                	
                	//调用cellsAdded后给cell设置ID
                	cellsAdded.call(this, cells, parent, index, source, target, absolute, constrain);

                	if(cells != null && cells[0] != null) {
                		var nodeId = cells[0].copyFrom;
                		if(nodeId != null) {
                			var configOfSource = JSON.parse(window.localStorage.getItem(localTemp+nodeId));
                			if(configOfSource != null) {
                				
                				//替换id,acid, code,nodeid
                				var id = getGuuid();
                				configOfSource.id = id;
                				configOfSource.nodeId = cells[0].id;
                				configOfSource.code = 'task_' + cells[0].id;
                				
                				if(configOfSource.participant != null) {
                					var participant = JSON.parse(configOfSource.participant);
                					$.each(participant, function(index, item) {
                						item.acId = id;
                					});
                					configOfSource.participant = JSON.stringify(participant);
                				}

                				if(configOfSource.ccPerson != null) {
                					var ccPerson = JSON.parse(configOfSource.ccPerson);
                					$.each(ccPerson, function(index, item) {
                						item.acId = id;
                					});
                					configOfSource.ccPerson = JSON.stringify(ccPerson);
                				}
                				
                				window.localStorage.setItem(localTemp+cells[0].id, JSON.stringify(configOfSource));
                			}
                			
                			//清空自定义的拷贝来源属性
                			cells[0].copyFrom = null;
                		}
                	}
                }
                //add by zhangdaoqiang 执行节点内部配置的拷贝 end
                
                //add by zhangdaoqiang 删除cell同时删除缓存信息 start
                var remove = mxGraphModel.prototype.remove;
                mxGraphModel.prototype.remove = function(cell)
                {
                	//从缓存只删除nodeId对象的信息
                	window.localStorage.removeItem(localTemp+cell.id);
                	return remove.call(this, cell);
                };
                //add by zhangdaoqiang 删除cell同时删除缓存信息 end
                
                mxGraph.prototype.autoScroll = false;
                mxGraph.prototype.autoExtend = false;
                mxGraph.prototype.isValidSource = function(cell){
                	 var outnum=0;
                     var innum=0;
                     if(cell.isEdge==1){return false;}
                     var nodeType=cell.getAttribute('nodeType');
                     if( nodeType=='end'){
                         return false;
                     }

                     var  edges=cell.edges;
                     if(edges == null ){
                         outnum=0;
                         innum=0;
                     }
                     mxUtils.forEach(edges,function(edge){
                         if(edge.target==null){
                             return  false;
                         }

                         if(edge.target.isVertex()){
                             if(edge.source.id ==cell.id ){
                                 outnum++;

                             }else{
                                 innum++;
                             }
                         }
                     });
                     var nodeType=cell.getAttribute('nodeType');
                     if(nodeType=='join'|| nodeType=='fork'){
                         return true;
                     }
                     if(nodeType=='task' || nodeType=='end'|| nodeType=='start'|| nodeType=='cc'){

                     }else{
                         return false
                     }
                     if(outnum*1>0){
                         return false;
                     }
                     return true;
                }

                mxConstants.DEFAULT_HOTSPOT = 1;

                // Enables guides
                mxGraphHandler.prototype.guidesEnabled = true;

                // Alt disables guides
                mxGuide.prototype.isEnabledForEvent = function(evt)
                {
                    return !mxEvent.isAltDown(evt);
                };

                // Enables snapping waypoints to terminals
                mxEdgeHandler.prototype.snapToTerminals = true;



                editor.graph.allowAutoPanning = true;
                editor.graph.timerAutoScroll = true;



                editor.graph.dblClick = function(evt, cell){
                    if (cell != null){
                        if(cell.isVertex()){
                            editAc(editor,cell);
                        }
                        else if(cell.isEdge()){
                            editTr(editor,cell);
                        }
                    }
                    else{
                        editFlow(editor);
                    }

                    mxEvent.consume(evt);
                }

                // Updates the window title after opening new files
                var title = document.title;
                var funct = function(sender)
                {
//                    document.title = title + ' - ' + sender.getTitle();
                };

                editor.addListener(mxEvent.OPEN, funct);

                // Prints the current root in the window title if the
                // current root of the graph changes (drilling).
                editor.addListener(mxEvent.ROOT, funct);
                funct(editor);

                // Displays version in statusbar
             //   editor.setStatus('V2017');

                // Shows the application
                hideSplash();
            }
        }
        catch (e)
        {
            hideSplash();

            // Shows an error message if the editor cannot start
            mxUtils.alert('Cannot start application: ' + e.message);
            throw e; // for debugging
        }

        if(status=='new'){
	        var parent = editor.graph.getDefaultParent();
	        var model = editor.graph.model;
	        model.beginUpdate();
	        try
	        {
	            var start = editor.templates['start'];
	            var end = editor.templates['end'];
	            editor.graph.addCell(start,parent);
	            editor.graph.addCell(end,parent);
	        }
	        finally
	        {
	          model.endUpdate();
	        }
        }
        
        return editor;
    }

    mxGraph.prototype.moveCells = function(cells, dx, dy, clone, target, evt, mapping)
    {
        //console.log(cells[0]);
        dx = (dx != null) ? dx : 0;
        dy = (dy != null) ? dy : 0;


        var g_y = cells[0].geometry.y;
        var g_x = cells[0].geometry.x;
        console.log(dx);console.log(dy);

        console.log(g_x);console.log(g_y);

        var bounds = editor.graph.getGraphBounds();
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
        //if(cells[0].geometry.x<40){
        //    cells[0].geometry.x = 40;
        //}
        //if(cells[0].geometry.y<40){
        //    cells[0].geometry.y = 40;
        //}
        //
        //var req = mxUtils.load('config/layouteditor.xml');
        //var root = req.getDocumentElement();
        //var bounds = editor.graph.getGraphBounds();
        //
        //var h = $("#graph").height();
        //var w = $("#graph").width();
        //var p_h = $("#graph_box").height();
        //var p_w = $("#graph_box").width();
        //var svgh = $("#graph").find("svg").css("minHeight");
        //var svgw = $("#graph").find("svg").css("minWidth");
        //if(parseInt(svgh)>h){
        //    root.setAttribute("height",(bounds.y+bounds.height+4)+'px');
        //}
        //if(parseInt(svgw)>w){
        //    root.setAttribute("width",(bounds.x+bounds.width+4)+'px');
        //
        //}
       // $("#graph").css("minHeight",p_h);
       // $("#graph").css("minWidth",p_w);
console.log(cells[0]);





        return cells;
    };
}
//改变celllabel
function changeCell(id,label,editor){
    var model = editor.graph.model;
    var cell=model.getCell(id);
    model.beginUpdate();
    try {
        var edit = new mxCellAttributeChange(cell, 'label', label);
        model.execute(edit);
    }
    finally {
        model.endUpdate();
    }
}
