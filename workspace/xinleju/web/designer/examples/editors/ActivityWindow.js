ActivityWindow = Ext.extend(Ext.Window, {
    title : '属性设置',
    layout : 'border',
    closeAction : 'hide',
    plain : true,
    maximizable : true,
    modal : true,
    closable : true,
    shadow:false,
    initComponent : function() {
        // 参与人配置
        this.paticipantTree = this.buildPaticipantTree();
        // 抄送人配置
        this.csTree = this.init_cs_tree();
        // 左边活动导航
        this.nav = this.createNav();
        // 后退配置
        // this.init_back_select();
        // 触发器数据
        // this.trigger_grid = this.init_trigger_grid();
        // 表单
        // this.forms_grid = this.init_forms_grid();
        // this.activity_fields_grid = this.init_activity_fields_grid();
        // 活动属性Tab
        this.tabs = this.createTabs();
        //this.acPaticipantList_Combo = this.createAcPaticipantList();
        this.participantsSelectAt_Combo = this.createParticipantsSelectAt();
        this.participantsMustSelectAt_Combo = this.createParticipantsMustSelectAt();
        Ext.apply(this, {
            layout : 'border',
            items : [this.nav, this.tabs],
            buttons : [{
                text : '确定',
                handler : this.onOk.createDelegate(this),
                disabled : (!this.canEdit())
            }, {
                text : '应用',
                handler : this.onApplySave.createDelegate(this),
                disabled : (!this.canEdit())
            }, {
                text : '取消',
                handler : this.onCancel.createDelegate(this)
            }]
        });
        ActivityWindow.superclass.initComponent.call(this);
    },
    cleanDetail : function(){
    	if (document.getElementById("cDetailInfo")){
    		document.getElementById("cDetailInfo").value = "";
    	}
    	if (document.getElementById("sDetailInfo")){
    		document.getElementById("sDetailInfo").value = "";
    	}
    	if (document.getElementById("rDetailInfo")){
    		document.getElementById("rDetailInfo").value = "";
    	}
    	if (document.getElementById("fDetailInfo")){
    		document.getElementById("fDetailInfo").value = "";
    	}
    },
    createAcPaticipantList : function() {
        var lc = new Ext.ux.form.LovCombo({
            id : 'lovcombo',
            renderTo : 'acPaticipantList',
            hideOnSelect : false,
            autoWidth : true,
            maxHeight : 200,
            width : 270,
            store : new Ext.data.ArrayStore({
                fields : ['nodeId', 'nodeName']
            }),
            triggerAction : 'all',
            valueField : 'nodeId',
            displayField : 'nodeName',
            mode : 'local',
            forceSelection : true, 
            shadow:false,  
            beforeBlur : function() {
            	
            }
        });
        
        return lc;
    },
    
    createParticipantsSelectAt : function() {
        var lc = new Ext.ux.form.LovCombo({
            id : 'lovcombo',
            renderTo : 'participantsSelectAt',
            hideOnSelect : false,
            autoWidth : true,
            maxHeight : 200,
            width : 320,
            store : new Ext.data.ArrayStore({
                fields : ['nodeId', 'nodeName']
            }),
            triggerAction : 'all',
            valueField : 'nodeId',
            displayField : 'nodeName',
            mode : 'local',
            forceSelection : true, 
            shadow:false,  
            beforeBlur : function() {
            }
        });
        
        return lc;
    },
    createParticipantsMustSelectAt : function() {
        var lc = new Ext.ux.form.LovCombo({
            id : 'lovcombo2',
            renderTo : 'participantsMustSelectAt',
            hideOnSelect : false,
            autoWidth : true,
            maxHeight : 200,
            width : 320,
            store : new Ext.data.ArrayStore({
                fields : ['nodeId', 'nodeName']
            }),
            triggerAction : 'all',
            valueField : 'nodeId',
            displayField : 'nodeName',
            mode : 'local',
            forceSelection : true, 
            shadow:false,  
            beforeBlur : function() {
            }
        });
        
        return lc;
    },
    
    
    onOk : function() {
        this.onApplySave();
        this.hide();
    },
    onApplySave : function() {
        this.saveData();
        var model = editor.graph.model;
        var attrs = this.cell.getValue().attributes;
        
        model.beginUpdate();
        try {
            var edit = new mxCellAttributeChange(this.cell, 'label', this.cell.getAttribute('nodeName'));
            model.execute(edit);
        }
        finally {
            model.endUpdate();
        }
        
        var treeNode = this.nav.getRootNode().findChild('id', this.cell.getId());
        treeNode.setText(this.cell.getAttribute('nodeName'));
        this.setTitle("活动属性 - " + this.cell.getAttribute('nodeName'));
    },
    onCancel : function() {
        this.hide();
    },
    
    onFormsInit : function(ReLoadForm) {
        
        // 清除FormGrid
        if (ReLoadForm) {
            // 重新加载
            this.forms_grid.store.reload();
            // 去除选择加亮效果
            this.forms_grid.selModel.clearSelections();
        }
        
        // 清除列表ActivityFieldGrid
        this.activity_fields_grid.store.removeAll();
    },
    canEdit : function() {
        return 'check' == act || 'edit' == act || 'create' == act;
    },
    onAddForm : function(store, rec, operation) {
        
        if (operation == Ext.data.Record.EDIT) {
            if (!this.canEdit()) {
                rec.reject(false);
            }
            else {
                var id = rec.data['id'];
                var params = rec.data;
                params['flowCode'] = this.flowCode;
                params['flowVersion'] = this.flowVersion;
                params['nodeId'] = this.nodeId;
                
                var url = rec.data['selected'] ? 'designer!addFormForActivity.ajax' : 'designer!deleteFormOnActivity.ajax';
                Ext.Ajax.request({
                    url : url,
                    method : 'POST',
                    params : params,
                    success : function(response) {
                        var data = Ext.util.JSON.decode(response.responseText);
                        var r = store.getById(data.id);
                        r.commit();
                    }
                });
            }
        }
    },
    
    onFormSelected : function(sm, row, rec) {
        this.activity_fields_grid.store.baseParams['formCode'] = rec.data['formCode'];
        this.activity_fields_grid.store.baseParams['formVersion'] = rec.data['formVersion'];
        this.activity_fields_grid.store.reload();
    },
    
    onFormSelected2 : function(g, r, e) {
        var rec = g.store.getAt(r);
        this.activity_fields_grid.store.baseParams['formCode'] = r.data['formCode'];
        this.activity_fields_grid.store.baseParams['formVersion'] = r.data['formVersion'];
        this.activity_fields_grid.store.reload();
    },
    
    onActivityFieldUpdate : function(store, rec, operation) {
        if (operation == Ext.data.Record.EDIT) {
            
            Ext.Ajax.request({
                url : 'designer!saveFields.ajax',
                params : rec.data,
                method : 'POST',
                success : function(response) {
                    var data = Ext.util.JSON.decode(response.responseText);
                    
                    var r = ds2.getById(data.id);
                    r.commit();
                }
            });
        }
    },
    
    onTreeClick : function(node, e) {
        // 加载当前选中的活动
        var nodeId = node.id;
        this.loadData(node.attributes.cell);
        
        this.setTitle("活动属性 - " + node.attributes.text);
    },
    
    /**
     * 如下代码构建组建
     * 
     */
    
    createTabs : function() {
        var tabs = new Ext.TabPanel({
            region : 'center',
            margins : '3 3 3 3',
            padding : '5',
            activeTab : 0,
            resizeTabs : true,
            deferredRender : false,
            minTabWidth : 95,
            tabWidth : 95,
            defaults : {
                autoScroll : true
            },
            items : [{
                title : '基本属性',
                iconCls : 'tabs',
                contentEl : 'basic-div'
            }, {
                title : '参与人',
                iconCls : 'tabs',
                contentEl : 'paticipant-div'
            }, {
                title : '流转控制',
                iconCls : 'tabs',
                contentEl : 'flow-div'
            }
            , {
                title : '自动抄送',
                iconCls : 'tabs',
                contentEl : 'cs-div'
            }
            , {
                title : '逾期设置',
                iconCls : 'tabs',
                contentEl : 'ac_setting-div'
            }            
            
//            , {
//                title : '操作权限',
//                iconCls : 'tabs',
//                contentEl : 'opRelationIns-div',
//                
//            }
            // , {
            // title : '自由流转',
            // iconCls : 'tabs',
            // contentEl : 'free-div'
            // }, {
            // title : '退回设置',
            // iconCls : 'tabs',
            // contentEl : 'back-div'
            // }, {
            // title : '触发事件',
            // iconCls : 'tabs',
            // contentEl : 'trigger-div'
            // }, {
            // title : '子流程',
            // iconCls : 'tabs',
            // contentEl : 'sub-div'
            // }, {
            // title : '表单配置',
            // iconCls : 'tabs',
            // layout : 'border',
            // id : 'forms_tab',
            // defaults : {
            // autoScroll : true,
            // border : false
            // },
            // listeners : {
            // activate : this.onFormsInit.createDelegate(this, false)
            // },
            // items : [{
            // region : 'west',
            // layout : 'fit',
            // items : this.forms_grid,
            // width : 360,
            // margins : '0 2 0 0'
            // }, {
            // region : 'center',
            // layout : 'fit',
            // items : this.activity_fields_grid
            // }]
            // }
            
            ],
            listeners:{ 
                tabchange:function(tp,p){ 
                    if(p.contentEl=='opRelationIns-div'){ 
                    	buildOpGroups(getSelectValue('opGroups'));
                    } 
                } 
            } 
        });
        
        return tabs;
    },
    
    createNav : function() {
        
        var root = new Ext.tree.AsyncTreeNode({
            id : '0',
            text : '活动列表',
            expanded : true,
            
            children : []
        });
        
        var tree = new Ext.tree.TreePanel({
            root : root,
            title : '活动列表',
            region : 'west',
            split : true,
            rootVisible : false,
            width : 130,
            collapsible : true,
            collapseMode : 'mini',
            titleCollapse : false,
            autoScroll:true,
            collapsed : true,
            margins : '3 0 3 3',
            cmargins : '3 3 3 3',
            listeners : {
                click : this.onTreeClick.createDelegate(this)
            }
        });
        
        return tree;
    },
    
    init_forms_grid : function() {
        
        var ds1 = new Ext.data.JsonStore({
            url : 'designer!listFormsForActivity.ajax',
            idProperty : 'id',
            autoload : false,
            fields : ['id', 'formName', 'formCode', 'formVersion', {
                name : 'isDefault',
                type : 'bool'
            }, {
                name : 'selected',
                type : 'bool'
            }],
            listeners : {
                update : this.onAddForm.createDelegate(this)
            }
        });
        
        var selectColumn = new Ext.grid.CheckColumn({
            header : '选择',
            dataIndex : 'selected',
            width : 40
        });
        var isDefaultColumn = new Ext.grid.CheckColumn({
            header : '默认',
            dataIndex : 'isDefault',
            width : 40
        });
        var grid1 = new Ext.grid.EditorGridPanel({
            store : ds1,
            border : true,
            title : '表单列表',
            columns : [new Ext.grid.RowNumberer(), {
                header : '名称',
                width : 140,
                sortable : true,
                dataIndex : 'formName'
            }, {
                header : '编码',
                width : 50,
                sortable : true,
                dataIndex : 'formCode'
            }, {
                header : '版本',
                width : 40,
                sortable : true,
                dataIndex : 'formVersion'
            }, selectColumn, isDefaultColumn],
            
            selModel : new Ext.grid.RowSelectionModel({
                singleSelect : true,
                listeners : {
                    rowselect : this.onFormSelected.createDelegate(this),
                    rowclick : this.onFormSelected2.createDelegate(this)
                }
            })
            
        });
        
        return grid1;
    },
    
    init_activity_fields_grid : function() {
        
        ds2 = new Ext.data.Store({
            proxy : new Ext.data.HttpProxy({
                url : 'designer!listFields.ajax'
            }),
            autoload : false,
            reader : new Ext.data.JsonReader({
                idProperty : "af.id"
            }, ['af.id', 'af.formCode', 'af.formVersion', 'af.flowCode', 'af.flowVersion', 'af.nodeId', 'af.displayName', 'af.columnName', {
                name : 'af.isRequired',
                type : 'bool'
            }, {
                name : 'af.isRead',
                type : 'bool'
            }, {
                name : 'af.isWrite',
                type : 'bool'
            }]),
            listeners : {
                update : this.onActivityFieldUpdate.createDelegate(this)
            }
        });
        
        var isRequiredColumn = new Ext.grid.CheckColumn({
            header : '必填',
            dataIndex : 'af.isRequired',
            width : 38
        });
        var isReadColumn = new Ext.grid.CheckColumn({
            header : '可读',
            dataIndex : 'af.isRead',
            width : 38
        });
        var isWriteColumn = new Ext.grid.CheckColumn({
            header : '可写',
            dataIndex : 'af.isWrite',
            width : 38
        });
        var grid2 = new Ext.grid.EditorGridPanel({
            store : ds2,
            border : true,
            title : '表单权限',
            columns : [new Ext.grid.RowNumberer(), {
                header : '字段名',
                width : 100,
                sortable : true,
                dataIndex : 'af.displayName'
            }, {
                header : '编码',
                width : 130,
                sortable : true,
                dataIndex : 'af.columnName'
            }, isRequiredColumn, isReadColumn, isWriteColumn],
            
            selModel : new Ext.grid.RowSelectionModel({
                singleSelect : true
            })
        });
        return grid2;
    },
    init_cs_tree :function(){
		var currentDep = 0;
		var rootType = 3;
		// 参与者树
		var root = new Ext.tree.AsyncTreeNode({
			id : 'Root_0',
			prefix : 'Root_',
			text : '人员选择',
			expanded : true
		});
		var csTree = new Ext.tree.TreePanel({
			loader : new Ext.tree.TreeLoader({
				dataUrl : '../../../Participant!getTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix,
				baseAttrs : {
					uiProvider : Ext.ux.TreeCheckNodeUI
				}
			}),

			root : root,
			renderTo : 'cs_tree',
			border : true,
			autoScroll : true,
			rootVisible : false,
			height : 300,
			width : '100%'
		});
		csTree.on('click', function(node) {
			// selectToList();
			node.expand();
			node.select();
		});

		csTree.on('beforeload', function(node) {
			csTree.loader.baseParams['q'] = $('#cs_tree_qk').val();
			csTree.loader.dataUrl = '../../../Participant!getTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix;
		});
		root.expand();
		root.select();

		return csTree;
	},
    buildPaticipantTree : function() {
    
        // 参与者树
        var root = new Ext.tree.AsyncTreeNode({
            id : 'Root_0',
            prefix : 'Root_',
            text : '人员选择',
            expanded : true
        });
        var tree = new Ext.tree.TreePanel({
            loader : new Ext.tree.TreeLoader({
                dataUrl : '../../../Participant!getTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix + '&t=' + new Date().getTime(),
                baseAttrs : {
                    uiProvider : Ext.ux.TreeCheckNodeUI
                }
            }),
            
            root : root,
            renderTo : 'users_tree',
            border : true,
            autoScroll : true,
            rootVisible : false,
            height : 300,
            width : '100%'
        });
        tree.on('click', function(node) {
            // selectToList();
            node.expand();
            node.select();
        });
        
        tree.on('beforeload', function(node) {

        	tree.loader.baseParams['q'] = $('#users_tree_qk').val();
        	
            tree.loader.dataUrl = '../../../Participant!getTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix + '&t=' + new Date().getTime();
        });
        root.expand();
        root.select();
        
        return tree;
    },
    
    init_back_select : function() {
        new Ext.Panel({
            renderTo : 'back_ac_select',
            autoWidth : true,
            height : 200,
            border : true,
            contentEl : 'back_ac_select_html'
        });
        new Ext.Panel({
            renderTo : 'back_ac',
            height : 200,
            autoWidth : true,
            // autoHeight:true,
            border : true,
            contentEl : 'back_ac_html'
        });
    },
    init_next_nodes : function(cell) {
        // 参与人.环节参与人
        var finder_list = [];
        var wkList = [cell];
        var model = editor.graph.model;
        var map = model.cells;
        
        while (wkList.length > 0) {
            var store = [];
            for (var k1 = 0; k1 < wkList.length; k1++) {
                var from_cell = wkList[k1];
                for (var k in map) {
                    if (map[k].isEdge()) {
                        var edge = map[k];
                        if (edge.source.id == from_cell.getId()) {
                            finder_list.push(edge.target);
                            store.push(edge.target);
                        }
                    }
                }
            }
            if (store.length == 0) {
                break;
            }
            else {
                wkList = store;
            }
        }
        
    },
    // 参与人 -> 前置环节
    init_previous_nodes : function(cell) {
        
        // 参与人.环节参与人
        var finder_list = [];
        var wkList = [cell];
        var model = editor.graph.model;
        var map = model.cells;
        
        while (wkList.length > 0) {
            var store = [];
            for (var k1 = 0; k1 < wkList.length; k1++) {
                var to_cell = wkList[k1];
                for (var k in map) {
                    if (map[k].isEdge()) {
                        var edge = map[k];
                        if (edge.target.id == to_cell.getId()) {
                            finder_list.push(edge.source);
                            store.push(edge.source);
                        }
                    }
                }
            }
            if (store.length == 0) {
                break;
            }
            else {
                wkList = store;
            }
        }
        
        // 加载到页面[后退设置&&环节参与人]
        // removeSelectValue("acPaticipant", true);
        var arrData = [];
        for (var j = finder_list.length - 1; j >= 0; j--) {
        	if(finder_list[j].getAttribute('isAuto') =='0'){
        		$("#backActivitiesForSelect").append("<option value='" + finder_list[j].getId() + "'>" + finder_list[j].getAttribute('label') + "</option>");
                arrData.push([finder_list[j].getId(), finder_list[j].getAttribute('label')]);
        	}
        }
        
        //this.acPaticipantList_Combo.getStore().loadData(arrData);
        //this.acPaticipantList_Combo.setValue(cell.getAttribute('acPaticipant', ''));
        
        
        
        
        finder_list = [];
        wkList = [cell];
        
        while (wkList.length > 0) {
            var store = [];
            for (var k1 = 0; k1 < wkList.length; k1++) {
                var to_cell = wkList[k1];
                for (var k in map) {
                    if (map[k].isEdge()) {
                        var edge = map[k];
                        if (edge.source.id == to_cell.id) {
                            finder_list.push(edge.target);
                            store.push(edge.target);
                        }
                    }
                }
            }
            if (store.length == 0) {
                break;
            }
            else {
                wkList = store;
            }
        }
        
        arrData = [];
        for (var j = finder_list.length - 1; j >= 0; j--) {
        	if(finder_list[j].getAttribute('isAuto') =='0'){		
                arrData.push([finder_list[j].getId(), finder_list[j].getAttribute('label')]);
        	}
        }
        

        this.participantsSelectAt_Combo.getStore().loadData(arrData);
        this.participantsSelectAt_Combo.setValue(cell.getAttribute('participantsSelectAt', ''));
        
        this.participantsMustSelectAt_Combo.getStore().loadData(arrData);
        this.participantsMustSelectAt_Combo.setValue(cell.getAttribute('participantsMustSelectAt', ''));
        
    },
    
    init_trigger_grid : function() {
        var checkColumn = new Ext.grid.CheckColumn({
            header : '同步执行',
            dataIndex : 'isSyn',
            width : 60
        });
        var triggers = [['1', '活动开始后', '', 'true'], ['2', '活动完成后', '', 'true'], ['3', '活动退回后', '', 'true']];
        var store = new Ext.data.ArrayStore({
            fields : ['code', 'name', 'action', 'isSyn'],
            listeners : {
                update : function(store, rec, operation) {
                    if (operation == Ext.data.Record.EDIT) {
                        rec.commit();
                    }
                }
            }
        });
        
        store.loadData(triggers);
        
        var grid = new Ext.grid.EditorGridPanel({
            store : store,
            
            columns : [new Ext.grid.RowNumberer(), {
                header : '执行时机',
                width : 100,
                sortable : true,
                dataIndex : 'name'
            }, {
                header : '执行任务',
                width : 200,
                sortable : true,
                dataIndex : 'action',
                editor : new Ext.form.TextField({})
            }, checkColumn],
            renderTo : 'trigger_ac_work',
            border : true,
            autoHeight : true,
            clicksToEdit : 1,
            selModel : new Ext.grid.RowSelectionModel()
        });
        
        return grid;
    },
    
    loadData : function(cell, tabIndex) {

    	this.cell = cell;

    	//将所有的参与人列表明细清空（凡是调用showDetail的方法的div都要在此方法里添加）
    	this.cleanDetail();
    	
        // 前置环节(后退 + Ac参与人)
        this.init_previous_nodes(cell);
        // 重新加载参与者树
        this.paticipantTree.root.reload();
        
        // 记载左边菜单
        var model = editor.graph.model;
        editor.graph.setSelectionCell(this.cell);
       
        var cMap = model.cells;
        var list = [];
        for (var k in cMap) {
            var isTask = mxUtils.isNode(model.getValue(cMap[k]), "task") || mxUtils.isNode(model.getValue(cMap[k]), "shape");
            if (cMap[k].isVertex() && isTask) {
                list.push({
                    id : cMap[k].getId(),
                    text : cMap[k].getAttribute('label'),
                    cls : 'folder',
                    leaf : true,
                    cell : cMap[k]
                });
            }
        }
        
        this.nav.getRootNode().removeAll();
        this.nav.getRootNode().appendChild(list);
        // 基本信息
        setInputValue('nodeName', cell.getAttribute('label', ''));
        setInputValue('nodeNote', cell.getAttribute('nodeNote', ''));
        setInputValue('nodeId', cell.getId());
        setInputValue('sort', cell.getAttribute('sort', '')); 
        setCheckBoxValue('isTimelimit', cell.getAttribute('isTimelimit', ''));
        setInputValue('timeLimit', cell.getAttribute('timeLimit', ''));
        setSelectValue('timeUnit', cell.getAttribute('timeUnit', TF.TIME_NUIT_DEFAUTL));
        setSelectValue('acType', cell.getAttribute('acType', 1));
        setSelectValue('endTag', cell.getAttribute('endTag', 0));
        
        setSelectValue('acPriority', cell.getAttribute('acPriority', TF.AC_PRIORITY_DEFAUTL));
        setCheckBoxValue('isTimingStart', cell.getAttribute('isTimingStart', ''));
        setCheckBoxValue('isTimingEnd', cell.getAttribute('isTimingEnd', ''));
        setCheckBoxValue('isRiskPoint', cell.getAttribute('isRiskPoint', ''));
        
        setInputValue('riskNote', cell.getAttribute('riskNote', ''));
        
        // 参与人信息
        // setSelectValue('acPaticipant', cell.getAttribute('acPaticipant', ''));
        // setSelectValue('acScope', cell.getAttribute('acScope', ''));
        
        //处理已禁用的参与岗位
        var pname= cell.getAttribute('paticipantList', '');
        setMSelectValue('paticipantList',pname);
        var newpname='';
        if(pname!=null&&pname!=''){
        	//异步后台处理,查询是否带禁用状态的岗位
        	/*
        	var dt = new Date();
        	Ext.Ajax.request({
        		url : '../../../Participant!dealRoleStatus.ajax',
        		params : {
        			partNames : pname,
        			request_time:dt.getTime()
        		},
        		success : function(response) {
        			var data = Ext.util.JSON.decode(response.responseText);
        			var suc = data.success;
        			alert(suc);
        		}
        	});*/
        	
        	
        	Ext.Ajax.request({
        		type : "POST",
        		dataType : "json",
        		url : "../../../Participant!dealRoleStatus.ajax",
        		params : {'partNames' : pname},
        		success : function(response) {
        				var result = Ext.util.JSON.decode(response.responseText);
    					var d=result.success;
            			if(d!=null&&d!=''){
            				newpname=d;
            	            setMSelectValue('paticipantList',newpname);
            			}
        			
        			
        		},
        		failure : function() {
        			//
        		}
        	});
        }
       
        setCheckBoxValues('classPaticipant', cell.getAttribute('classPaticipant', ''));
        setSelectValue('assignType', cell.getAttribute('assignType', 0));
        setSelectValue('nodeType', cell.getAttribute('nodeType', 0));
        setSelectValue('canWithdraw', cell.getAttribute('canWithdraw', 3));
        setCheckBoxValue('isCs', cell.getAttribute('isCs', ''));
        
        setMSelectValue('csList', cell.getAttribute('csList', ''));
        
        // 流转控制
        setSelectValue('finishCtrl', cell.getAttribute('finishCtrl', TF.AC_FINISH_CTRL_DEFAULT));
        //节点类型
        setSelectValue('at', cell.getAttribute('at'));
      	
        setSelectValue('startCtrl', cell.getAttribute('startCtrl', ''));
        setSelectValue('forkCtrl', cell.getAttribute('forkCtrl', ''));
        
        setInputValue('startCondition', cell.getAttribute('startCondition', ''));
        setInputValue('finishCondition', cell.getAttribute('finishCondition', ''));
        setSelectValue('jqStrategy', cell.getAttribute('jqStrategy', '0'));
        //setCheckBoxValue('canJq', cell.getAttribute('canJq', '0'));
        setSelectValue('participantsSelectStrategy', cell.getAttribute('participantsSelectStrategy', TF.PSS_DEFAULT));
        setCheckBoxValue('isAuto', cell.getAttribute('isAuto', '0'));
        setCheckBoxValue('ignoreFiOwner', cell.getAttribute('ignoreFiOwner', '0'));
        setCheckBoxValue('ignoreAc', cell.getAttribute('ignoreAc', '0'));
        
//        setCheckBoxValue('isHideNote', cell.getAttribute('isHideNote', '0'));
        //setCheckBoxValues('ops', cell.getAttribute('ops', ''));
        
        //操作组列表
        setSelectValue('opGroups', cell.getAttribute('opGroups', ''));
        
		//逾期设置
		setRadioValue('ac_status', cell.getAttribute('status', '2'));
		setInputValue('ac_approverOvertime', cell.getAttribute('approverOvertime', ''));
		setRadioValue('ac_approverRate', cell.getAttribute('approverRate', '0'));
		setInputValue('ac_leaderOvertime', cell.getAttribute('leaderOvertime', ''));
		setInputValue('ac_leaderId', cell.getAttribute('leaderId', ''));
		setInputValue('ac_leaderName', cell.getAttribute('leaderName', ''));
		setRadioValue('ac_leaderRate', cell.getAttribute('leaderRate', '0'));
		lId = cell.getAttribute('leaderId', '');
		lName = cell.getAttribute('leaderName', '');
		
        // // 自由流转
        // setCheckBoxValue('isFree', cell.getAttribute('isFree', ''));
        // setSelectValue('freeType', cell.getAttribute('freeType',
        // TF.AC_FREE_TYPE_DEFAUTL));
        // setSelectValue('paticitpantSelect',
        // cell.getAttribute('paticitpantSelect',
        // TF.AC_PATICIPANT_SELECT_DEFAUTL));
        // setCheckBoxValue('isMultiFlow', cell.getAttribute('isMultiFlow',
        // ''));
        // setCheckBoxValue('isMultiPaticitpant',
        // cell.getAttribute('isMultiPaticitpant', ''));
        //        
        // // 退回
        // setCheckBoxValue('isBack', cell.getAttribute('isBack', ''));
        // setMSelectValue('backActivities', cell.getAttribute('backActivities',
        // ''));
        // removeMSelectValue('backActivitiesForSelect',
        // cell.getAttribute('backActivities', ''));
        
        var root_cell = editor.graph.getCurrentRoot() || editor.graph.getModel().getRoot();
        
        this.flowCode = root_cell.getAttribute('flowCode', '');
        this.flowVersion = root_cell.getAttribute('flowVersion', '');
        this.nodeId = cell.getId();
        
        // this.forms_grid.store.baseParams['flowCode'] = this.flowCode;
        // this.forms_grid.store.baseParams['flowVersion'] = this.flowVersion;
        // this.forms_grid.store.baseParams['nodeId'] = this.nodeId;
        // this.forms_grid.store.reload();
        // this.forms_grid.flowCode = this.flowCode;
        // this.forms_grid.flowVersion = this.flowVersion;
        // this.forms_grid.nodeId = this.nodeId;
        
        // this.activity_fields_grid.store.baseParams['flowCode'] =
        // this.flowCode;
        // this.activity_fields_grid.store.baseParams['flowVersion'] =
        // this.flowVersion;
        // this.activity_fields_grid.store.baseParams['nodeId'] = this.nodeId;
        // this.activity_fields_grid.store.reload();
        // this.activity_fields_grid.flowCode = this.flowCode;
        // this.activity_fields_grid.flowVersion = this.flowVersion;
        // this.activity_fields_grid.nodeId = this.nodeId;
        
        // outCode
        this.outCode = cell.getAttribute('outCode', '');
        var firstSelectValue = this.outCode.length > 2 ? this.outCode.substring(0, this.outCode.indexOf('_')) : '';
        ChangeSelect('0', 'firstSelect', firstSelectValue, outCodeArray, '');
        // this.onFormsInit(false);
        //更新工作组信息
        buildOpGroups(cell.getAttribute('opGroups', ''));
        if (tabIndex) {
            this.tabs.setActiveTab(tabIndex);
        }
		
    },
    saveData : function() {
      
        var cell = this.cell;
        
        // 格式化数字
        var timeLimit = parseFloat(getInputValue('timeLimit')) || '';
        setInputValue('timeLimit', timeLimit);
        
        var finishQuantity = parseFloat(getInputValue('finishQuantity')) || '';
        setInputValue('finishQuantity', finishQuantity);
        var voteQuantity = parseFloat(getInputValue('voteQuantity')) || '';
        setInputValue('voteQuantity', voteQuantity);
        
        // 基本信息
        cell.setAttribute('label', getInputValue('nodeName'));
        cell.setAttribute('nodeName', getInputValue('nodeName'));
        cell.setAttribute('nodeNote', getInputValue('nodeNote'));
        cell.setAttribute('nodeId', getInputValue('nodeId'));
        cell.setAttribute('sort', getInputValue('sort'));
        cell.setAttribute('isTimelimit', getCheckBoxValue('isTimelimit') ? 1 : 0);
        cell.setAttribute('timeLimit', getInputValue('timeLimit'));
        cell.setAttribute('timeUnit', getSelectValue('timeUnit'));
        cell.setAttribute('acType', getSelectValue('acType'));
        cell.setAttribute('endTag', getSelectValue('endTag'));
        
        cell.setAttribute('isTimingStart', getCheckBoxValue('isTimingStart') ? 1 : 0);
        cell.setAttribute('isTimingEnd', getCheckBoxValue('isTimingEnd') ? 1 : 0);
        cell.setAttribute('isRiskPoint', getCheckBoxValue('isRiskPoint') ? 1 : 0);
        cell.setAttribute('riskNote', getInputValue('riskNote'));
        
        // 参与人
        //cell.setAttribute('acPaticipant', this.acPaticipantList_Combo.getValue());
        cell.setAttribute('participantsSelectAt', this.participantsSelectAt_Combo.getValue());
        cell.setAttribute('participantsMustSelectAt', this.participantsMustSelectAt_Combo.getValue());
        
        cell.setAttribute('paticipantList', getMSelectValue('paticipantList'));
        cell.setAttribute('classPaticipant', getCheckBoxValues('classPaticipant'));
        cell.setAttribute('assignType', getSelectValue('assignType'));
        cell.setAttribute('nodeType', getSelectValue('nodeType'));
       // alert(getSelectValue('nodeType'));
        cell.setAttribute('canWithdraw', getSelectValue('canWithdraw'));
        //抄送人
        cell.setAttribute('isCs', getCheckBoxValue('isCs') ? 1 : 0 );
        cell.setAttribute('csList', getMSelectValue('csList'));
        
        // 流转控制
        cell.setAttribute('acPriority', getSelectValue('acPriority'));
        cell.setAttribute('finishCtrl', getSelectValue('finishCtrl'));
        //节点类型
        cell.setAttribute('at', getSelectValue('at'));
        cell.setAttribute('startCtrl', getSelectValue('startCtrl'));
        cell.setAttribute('forkCtrl', getSelectValue('forkCtrl'));
        cell.setAttribute('startCondition', getInputValue('startCondition'));
        cell.setAttribute('finishCondition', getInputValue('finishCondition'));
        cell.setAttribute('isAuto', getCheckBoxValue('isAuto') ? 1 : 0);
        cell.setAttribute('ignoreFiOwner', getCheckBoxValue('ignoreFiOwner') ? 1 : 0);
        cell.setAttribute('ignoreAc', getCheckBoxValue('ignoreAc') ? 1 : 0);
        //alert(getCheckBoxValue('ignoreFiOwner'));
       // alert(getCheckBoxValue('ignoreAc'));
//        cell.setAttribute('isHideNote', getCheckBoxValue('isHideNote') ? 1 : 0);
        cell.setAttribute('jqStrategy', getSelectValue('jqStrategy'));
        cell.setAttribute('participantsSelectStrategy', getSelectValue('participantsSelectStrategy'));
        //cell.setAttribute('ops', getCheckBoxValues('ops'));
        cell.setAttribute('opGroups', getSelectValue('opGroups'));
        
        // // 自由流转
        // cell.setAttribute('isFree', getCheckBoxValue('isFree') ? 1 : 0);
        // cell.setAttribute('freeType', getSelectValue('freeType'));
        // cell.setAttribute('paticitpantSelect',
        // getSelectValue('paticitpantSelect'));
        // cell.setAttribute('isMultiFlow', getCheckBoxValue('isMultiFlow') ? 1
        // : 0);
        // cell.setAttribute('isMultiPaticitpant',
        // getCheckBoxValue('isMultiPaticitpant') ? 1 : 0);
        //        
        // // 退回
        // cell.setAttribute('isBack', getCheckBoxValue('isBack')? 1 : 0);
        // cell.setAttribute('backActivities',
        // getMSelectValue('backActivities'));
        
        //
        cell.setAttribute('outCode', getSelectValue('outCode'));
        
		//逾期设置
		cell.setAttribute('status', getRadioValue('ac_status'));
		cell.setAttribute('approverOvertime', getInputValue('ac_approverOvertime'));
		cell.setAttribute('approverRate', getRadioValue('ac_approverRate'));
		cell.setAttribute('leaderOvertime', getInputValue('ac_leaderOvertime'));
		cell.setAttribute('leaderId', getInputValue('ac_leaderId'));
		cell.setAttribute('leaderName', getInputValue('ac_leaderName'));
		cell.setAttribute('leaderRate', getRadioValue('ac_leaderRate'));
		
    },
    loadTriggers : function() {

    },
    saveTriggers : function() {

    }
});

var selectToPaticipantList = function() {
	
    var selNodes = ac_win.paticipantTree.getChecked();
    var ids = [];
	
    Ext.each(selNodes, function(node) {
		var nodePrefix = node.id.substring(0, 5);
        if (nodePrefix == 'Xdpa_' || nodePrefix == 'Part_' || nodePrefix == 'User_' || nodePrefix == 'Role_' || nodePrefix == 'Orgn_' || nodePrefix == 'Pbiz_' || nodePrefix == 'Objf_' || nodePrefix == 'Gnrl_' || nodePrefix == 'Rank_') {
			if (node.id.substring(5) != 0) {
				var userid = node.id;
				if(node.leaf==true||(node.attributes.type=='user'||node.attributes.type=='role')){
					jsAddItemToSelect('paticipantList', node.text, userid);
				}else{
					alert("请选择正确的标准角色和人员！！");
				}
			}
        }
    });
};

//操作组
var buildOpGroups = function(opGroupId){
	var flowCode = ac_win.flowCode;
	var nodeId = ac_win.nodeId;
	var flowVersion = ac_win.flowVersion;
	var dealTime = (new Date()).getTime();
	Ext.Ajax.request({
		type : "POST",
		dataType : "json",
		url : "../../../OpRelationIns!initOpRelationIns.ajax",
		params : {'id' : opGroupId,'flowCode' : flowCode,'nodeId' : nodeId ,'flowVersion' : flowVersion , 't' : dealTime},
		success : function(resp) {
			//
		},
		failure : function() {
			//
		}
	});
}

var selectToCsList = function() {
	var selNodes = ac_win.csTree.getChecked();
	var ids = [];

	
	Ext.each(selNodes, function(node) {
		var nodePrefix = node.id.substring(0, 5);
		if (nodePrefix == 'Xdpa_' || nodePrefix == 'Part_' || nodePrefix == 'User_' || nodePrefix == 'Role_' || nodePrefix == 'Orgn_' || nodePrefix == 'Pbiz_' || nodePrefix == 'Objf_'|| nodePrefix == 'Gnrl_' || nodePrefix == 'Rank_') {
			if (node.id.substring(5) != 0) {
				var userid = node.id;
				if(node.leaf==true||(node.attributes.type=='user'||node.attributes.type=='role')){
					jsAddItemToSelect('csList', node.text, userid);
				}else{
					alert("请选择正确的标准角色和人员！！");
				}
			}
		}
	});
};


var query_users_tree = function(){
	ac_win.paticipantTree.root.reload(function(){
		
		var users_tree_qk = $('#users_tree_qk').val();
		if(users_tree_qk != ''){
			ac_win.paticipantTree.getRootNode().expandChildNodes(true);
		}
	});
}
var query_cs_tree = function(){

	ac_win.csTree.root.reload(function(){
		var cs_tree_qk = $('#cs_tree_qk').val();
		if(cs_tree_qk != ''){
			ac_win.csTree.getRootNode().expandChildNodes(false);
		}
	});
}

var showDetail = function(selectedString,tarDiv){
	Ext.Ajax.request({
		type : "POST",
		dataType : "json",
		url : "../../../Designer!showDetail.ajax",
		params : {'selectedString' : selectedString},
		success : function(resp) {
			var response = Ext.util.JSON.decode(resp.responseText);
			$('#' + tarDiv).val(response.detail);
		},
		failure : function() {
			
		}
	});
}