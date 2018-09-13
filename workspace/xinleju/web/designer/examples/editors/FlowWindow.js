FlowWindow = Ext.extend(Ext.Window, {
	title : '属性设置',
	closable : true,
	width : 990,
	height : 500,
	plain : true,
	maximizable : true,
	layout : 'border',
	closeAction : 'hide',
	modal : true,
	shadow:false,
	initComponent : function() {
		// 触发器数据
		this.trigger_grid = this.init_trigger_grid();
		// this.forms_grid = this.init_forms_grid();
		// this.selected_forms_grid = this.init_selected_forms_grid();
		this.tabs = this.createTabs();
		// 可阅人配置
		this.kyTree = this.init_ky_tree();
		// 发起人配置
		this.fqTree = this.init_fq_tree();
		Ext.apply(this, {
			layout : 'border',
			items : [this.tabs],
			buttons : [
			{
				text : '确定',
				disabled : (!this.canEdit()),
				handler : this.onOk.createDelegate(this)
			}, {
				text : '取消',
				handler : this.onCancel.createDelegate(this)
			}]
		});
		FlowWindow.superclass.initComponent.call(this);
	},
	createTabs : function() {
		var tabs = new Ext.TabPanel({
			region : 'center',
			margins : '0 0 0 0',
			padding : '5',
			activeTab : 0,
			resizeTabs : true,
			deferredRender : false,
			minTabWidth : 90,
			tabWidth : 90,
			defaults : {
				autoScroll : true
			},
			items : [
			{
				title : '基本属性',
				iconCls : 'tabs',
				contentEl : 'flow-basic-div'
			},
			{
				title : '可阅人员',
				iconCls : 'tabs',
				contentEl : 'flow-readPaticipant-div'
			},
			{
				title : '发起人员',
				iconCls : 'tabs',
				contentEl : 'flow-fqPaticipant-div'
			},
            {
                title : '逾期设置',
                iconCls : 'tabs',
                contentEl : 'setting-div'
            } 			
			// , {
			// title : '表单配置',
			// iconCls : 'tabs',
			// layout : 'border',
			// defaults : {
			// autoScroll : false,
			// border : false
			// },
			// listeners : {
			// activate : this.formsInit.createDelegate(this)
			// },
			// items : [{
			// region : 'west',
			// style : 'width:50%',
			// layout : 'fit',
			// items : this.forms_grid,
			// margins : '0 3 0 0'
			// }, {
			// region : 'center',
			// layout : 'fit',
			// items : this.selected_forms_grid
			// }]
			// }
			// ,this.selected_forms_grid
//			 ,{
//			 title : '触发事件',
//			 iconCls : 'tabs',
//			 contentEl : 'flow-trigger-div'
//			 }
			]
		});
		return tabs;
	},
	formsInit : function() {
		
		this.forms_grid.store.reload();
		this.selected_forms_grid.store.reload();
	},
	canEdit : function() {
		return 'check' == act || 'edit' == act || 'create' == act;
	},
	onOk : function() {
		
		this.saveData();
		var model = editor.graph.model;
		var attrs = this.cell.getValue().attributes;
		for (var i = 0; i < attrs.length; i++) {
			var nodeName = attrs[i].nodeName;
			var nodeValue = attrs[i].nodeValue;
			var edit = new mxCellAttributeChange(this.cell, nodeName, nodeValue);
			model.execute(edit);
		}
		this.hide();
	},
	onCancel : function() {
		this.hide();
	},
	init_forms_grid : function() {
		
		var ds1 = new Ext.data.JsonStore({
			url : 'designer!listAllForm.do',
			root : 'items',
			totalProperty : 'total',
			idProperty : 'id',
			
			fields : ['id', 'formName', 'formCode', 'formVersion', 'formHTML', 'isDisabled', 'isCommited']
		});
		
		var grid1 = new Ext.grid.EditorGridPanel({
			store : ds1,
			border : true,
			title : '待选表单',
			columns : [
			new Ext.grid.RowNumberer(), {
				header : '名称',
				width : 250,
				sortable : true,
				dataIndex : 'formName'
			}, {
				header : '编码',
				width : 70,
				sortable : true,
				dataIndex : 'formCode'
			}, {
				header : '操作',
				width : 50,
				sortable : true,
				dataIndex : 'isCommited',
				renderer : function(value, metaData, record) {
					var formCode = record.data['formCode'];
					var formVersion = record.data['formVersion'];
					var sHTML =
					"<input type='button' style='height:20px;' "
					+ (('check' != act && 'edit' != act) ? " disabled='disabled'" : "") + "  onclick=addForm('" + formCode + "','" + formVersion
					+ "') value='选择' />";
					return sHTML;
				}
			}],
			
			selModel : new Ext.grid.RowSelectionModel(),
			
			bbar : new Ext.PagingToolbar({
				store : ds1,
				pageSize : 10,
				displayInfo : true
			}),
			tbar : [
			{
				text : '选择',
				iconCls : 'icon_add',
				handler : function() {
					if (('check' == act || 'edit' == act)) {
						var rows = grid1.getSelectionModel().getSelections();
						for (var i = 0; i < rows.length; i++) {
							addForm(rows[i].data['formCode'], rows[i].data['formVersion'], true);
						}
					}
					
				}
			}, '->', {
				id : 'formName',
				xtype : 'textfield',
				emptyText : "表单名称"
			}, '-', {
				text : '查询',
				iconCls : 'icon_search',
				handler : function() {
					var flowName = Ext.getCmp('formName').getValue();
					grid1.store.baseParams['formName'] = flowName;
					grid1.store.load();
				}
			}]
			
		});
		return grid1;
	},
	init_selected_forms_grid : function() {
		var ds2 = new Ext.data.JsonStore({
			url : 'designer!listSelectedFormsByFlow.do',
			root : 'items',
			totalProperty : 'total',
			idProperty : 'id',
			fields : ['id', 'formName', 'formCode', 'formVersion', 'formHTML', 'isDisabled', 'isCommited'],
			listeners : {
				update : this.onFormVersionSelected.createDelegate(this)
			}
		});
		
		var s = new Ext.data.Store({
			proxy : new Ext.data.HttpProxy({
				url : 'designer!getAllFormVersion.ajax'
			}),
			reader : new Ext.data.JsonReader({}, ['id', 'formVersion']),
			autoLoad : false,
			mode : 'remote'
		});
		
		var grid2 = new Ext.grid.EditorGridPanel({
			store : ds2,
			border : true,
			clicksToEdit : 1,
			title : '已选表单',
			columns : [
			new Ext.grid.RowNumberer(), {
				header : '名称',
				width : 180,
				sortable : true,
				dataIndex : 'formName'
			}, {
				header : '编码',
				width : 60,
				sortable : true,
				dataIndex : 'formCode'
			}, {
				header : '使用版本',
				width : 80,
				sortable : true,
				dataIndex : 'formVersion',
				editor : {
					xtype : 'combo',
					disabled : (('check' != act && 'edit' != act)),
					readOnly : (('check' != act && 'edit' != act)),
					disabledClass : '',
					name : '_formVersion',
					store : s,
					displayField : 'formVersion',
					valueField : 'formVersion',
					editable : false,
					triggerAction : 'all',
					mode : 'remote',
					width : 150,
					allowBlank : false,
					listeners : {
						focus : function(c) {
							if (('check' == act || 'edit' == act)) {
								var rec = grid2.getSelectionModel().getSelected();
								s.proxy = new Ext.data.HttpProxy({
									url : "designer!getAllFormVersion.ajax?formCode=" + rec.data['formCode']
								});
								s.load();
							}
						}
					}
				}
			}, {
				header : '操作',
				width : 50,
				sortable : true,
				dataIndex : 'isCommited',
				renderer : function(value, metaData, record) {
					var formCode = record.data['formCode'];
					var formVersion = record.data['formVersion'];
					var sHTML =
					"<input type='button' style='height:20px;'"
					+ (('check' != act && 'edit' != act) ? " disabled='disabled'" : "") + " onclick=deleteForm('" + formCode + "','" + formVersion
					+ "') value='移除' />";
					return sHTML;
				}
			}],
			
			selModel : new Ext.grid.RowSelectionModel(),
			
			bbar : new Ext.PagingToolbar({
				store : ds2,
				pageSize : 10,
				displayInfo : true
			}),
			tbar : [
			{
				text : '移除',
				iconCls : 'icon_delete',
				handler : function() {
					if (('check' == act || 'edit' == act)) {
						var rows = grid2.getSelectionModel().getSelections();
						for (var i = 0; i < rows.length; i++) {
							deleteForm(rows[i].data['formCode'], rows[i].data['formVersion'], true);
						}
					}
				}
			}]
		});
		return grid2;
	},
	
	onFormVersionSelected : function(store, rec, operation) {
		
		if (operation == Ext.data.Record.EDIT) {
			var id = rec.data['id'];
			
			var params = rec.data;
			params['flowCode'] = this.flowCode;
			params['flowVersion'] = this.flowVersion;
			
			Ext.Ajax.request({
				url : 'designer!updateFlowFormVersion.ajax',
				method : 'POST',
				params : params,
				success : function(response) {
					var data = Ext.util.JSON.decode(response.responseText);
					
					var r = store.getById(data.id);
					r.commit();
				}
			});
		}
	},
	init_trigger_grid : function() {
		var checkColumn = new Ext.grid.CheckColumn({
			header : '同步执行',
			dataIndex : 'isSyn',
			width : 60
		});
		var triggers =
		[ ['FSE', '流程开始后', '', true]
		, ['FEE', '流程结束后', '', true]
		, ['ASE', '活动开始后', '', true]
		, ['AEE', '活动完成后', '', true]
		, ['ABE', '活动退回后', '', true]];
		var store = new Ext.data.ArrayStore({
			fields : ['code', 'name', 'action', 'isSyn'],
			idIndex : 0,
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
			
			columns : [
			new Ext.grid.RowNumberer(), {
				header : '执行时机',
				width : 100,
				sortable : true,
				dataIndex : 'name'
			}, {
				header : '执行任务',
				width : 500,
				sortable : true,
				dataIndex : 'action',
				editor : new Ext.form.TextField({})
			}
//			, checkColumn
			],
			renderTo : 'flow-trigger',
			border : true,
			autoHeight : true,
			clicksToEdit : 1,
			selModel : new Ext.grid.RowSelectionModel()
		});
		return grid;
	},
	init_ky_tree :function(){
		var currentDep = 0;
		var rootType = 3;
		// 参与者树
		var root = new Ext.tree.AsyncTreeNode({
			id : 'Root_0',
			prefix : 'Root_',
			text : '人员选择',
			expanded : true
		});
		var kyTree = new Ext.tree.TreePanel({
			loader : new Ext.tree.TreeLoader({
				dataUrl : '../../../Participant!getTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix+ '&t=' + new Date().getTime(),
				baseAttrs : {
					uiProvider : Ext.ux.TreeCheckNodeUI
				}
			}),
			root : root,
			renderTo : 'ky_tree',
			border : true,
			autoScroll : true,
			rootVisible : false,
			height : 300,
			width : '100%'
		});
		kyTree.on('click', function(node) {
			// selectToList();
			node.expand();
			node.select();
		});
		kyTree.on('beforeload', function(node) {
			kyTree.loader.baseParams['q'] = $('#ky_tree_qk').val();
			kyTree.loader.dataUrl = '../../../Participant!getTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix+ '&t=' + new Date().getTime();
		});
		root.expand();
		root.select();
		return kyTree;
	},
	init_fq_tree :function(){
		var currentDep = 0;
		var rootType = 3;
		// 参与者树
		var root = new Ext.tree.AsyncTreeNode({
			id : 'Root_0',
			prefix : 'Root_',
			text : '人员选择',
			expanded : true
		});
		var fqTree = new Ext.tree.TreePanel({
			loader : new Ext.tree.TreeLoader({
				dataUrl : '../../../Participant!getTree.ajax?parentId=' + root.id + '&prefix=' + root.attributes.prefix,
				baseAttrs : {
					uiProvider : Ext.ux.TreeCheckNodeUI
				}
			}),
			root : root,
			renderTo : 'fq_tree',
			border : true,
			autoScroll : true,
			rootVisible : false,
			height : 300,
			width : '100%'
		});
		fqTree.on('click', function(node) {
			// selectToList();
			node.expand();
			node.select();
		});
		fqTree.on('beforeload', function(node) {
			fqTree.loader.baseParams['q'] = $('#fq_tree_qk').val();
			fqTree.loader.dataUrl = '../../../Participant!getTree.ajax?parentId=' + node.id + '&prefix=' + node.attributes.prefix;
		});
		root.expand();
		root.select();
		return fqTree;
	},
	loadData : function(cell, tabIndex) {
		
		// add by liuhm 重新加载参与者树
        this.kyTree.root.reload();
        this.fqTree.root.reload();
		
		this.cell = cell;
		
		var flowName = cell.getAttribute('flowName', '');
		var flowCode = cell.getAttribute('flowCode', '');
		var flowVersion = cell.getAttribute('flowVersion', '');
		var ctId = cell.getAttribute('ctId', '');
		
		var isFlowTimeLimit = cell.getAttribute('isFlowTimeLimit', '');
		var flowTimeLimit = cell.getAttribute('flowTimeLimit', '');
		var flowTimeUnit = cell.getAttribute('flowTimeUnit', TF.TIME_NUIT_DEFAUTL);
		
		var fix_top  = cell.getAttribute('fix_top', '');
		var fix_left = cell.getAttribute('fix_left', '');
		var doWhenRepeatInAcs = cell.getAttribute('doWhenRepeatInAcs', '0');
		var doWhenNoUsersAtWp = cell.getAttribute('doWhenNoUsersAtWp', '2');
		setInputValue('flowName', flowName);
		setInputValue('flowCode', flowCode);
		setInputValue('flowVersion', flowVersion);
		setInputValue('ctId', ctId);
		setInputValue('flowCtName', cell.getAttribute('flowCtName', ''));
		
		setSelectValue('jqStrategyDefault', cell.getAttribute('jqStrategy', ''));
		setCheckBoxValue('isFlowTimeLimit', isFlowTimeLimit);
		setInputValue('flowTimeLimit', flowTimeLimit);
		setSelectValue('flowTimeUnit', flowTimeUnit);
		setSelectValue('appCode', cell.getAttribute('appCode', ''));
		setRadioValue('isBizFl', cell.getAttribute('isBizFl', '0'));
		
		
		setInputValue('flRemark', cell.getAttribute('flRemark', ''));
		setInputValue('flSort', cell.getAttribute('flSort', ''));
		setRadioValue('startType', cell.getAttribute('startType', '0'));
		setRadioValue('isDisabled', cell.getAttribute('isDisabled', '0'));
		setInputValue('codePrefix', cell.getAttribute('codePrefix'));
		setInputValue('codeTypeCode', cell.getAttribute('codeTypeCode'));
		setInputValue('codeType', cell.getAttribute('codeType'));
		setInputValue('titleType', cell.getAttribute('titleType', ''));
		setCheckBoxValue('canChangeTitle', cell.getAttribute('canChangeTitle', ''));
		setRadioValue('showGraph', cell.getAttribute('showGraph', '0'));
		setRadioValue('showRelationFile', cell.getAttribute('showRelationFile', '0'));
		setRadioValue('wisSortType', cell.getAttribute('wisSortType', '0'));

		// 业务对象信息
		loadServiceObjectDefineInfo(cell.getAttribute('serviceObjectDefineId', ''));
		
		setInputValue('createUserName', cell.getAttribute('createUserName', ''));
		setInputValue('createTime', cell.getAttribute('createTime', ''));
		setInputValue('editUserName', cell.getAttribute('editUserName', ''));
		setInputValue('updateTime', cell.getAttribute('updateTime', ''));
		
		setInputValue('fix_top', fix_top);
		setInputValue('fix_left', fix_left);
		setSelectValue('doWhenRepeatInAcs', doWhenRepeatInAcs);
		setSelectValue('doWhenNoUsersAtWp', doWhenNoUsersAtWp);
		//可阅人员
		setMSelectValue('kyList', cell.getAttribute('kyList', ''));
		//发起人员
		setMSelectValue('fqList', cell.getAttribute('fqList', ''));
		
		//逾期设置
		setRadioValue('status', cell.getAttribute('status', '1'));
		setInputValue('approverOvertime', cell.getAttribute('approverOvertime', ''));
		setRadioValue('approverRate', cell.getAttribute('approverRate', '0'));
		setInputValue('leaderOvertime', cell.getAttribute('leaderOvertime', ''));
		setInputValue('leaderId', cell.getAttribute('leaderId', ''));
		setInputValue('leaderName', cell.getAttribute('leaderName', ''));
		setRadioValue('leaderRate', cell.getAttribute('leaderRate', '0'));
		lId = cell.getAttribute('leaderId', '');
		lName = cell.getAttribute('leaderName', '');
		
		
		
		this.loadTriggers();
		
		
		
		
		
		//
		// this.flowCode = flowCode;
		// this.flowVersion = flowVersion;
		//
		// this.forms_grid.store.baseParams['flowCode'] = this.flowCode;
		// this.forms_grid.store.baseParams['flowVersion'] =
		// this.flowVersion;
		// this.forms_grid.flowCode = this.flowCode;
		// this.forms_grid.flowVersion = this.flowVersion;
		//        
		// this.selected_forms_grid.store.baseParams['flowCode'] =
		// this.flowCode;
		// this.selected_forms_grid.store.baseParams['flowVersion'] =
		// this.flowVersion;
		// this.selected_forms_grid.flowCode = this.flowCode;
		// this.selected_forms_grid.flowVersion = this.flowVersion;
		
		if (tabIndex) {
			this.tabs.setActiveTab(tabIndex);
		}
	},
	saveData : function() {
		var flowTimeLimit = parseFloat(getInputValue('flowTimeLimit')) || '';
		setInputValue('flowTimeLimit', flowTimeLimit);
		
		this.cell.setAttribute('flowName', getInputValue('flowName'));
		this.cell.setAttribute('flowCode', getInputValue('flowCode'));
		this.cell.setAttribute('flowVersion', getInputValue('flowVersion'));
		this.cell.setAttribute('ctId', getInputValue('ctId'));
		this.cell.setAttribute('isFlowTimeLimit', getCheckBoxValue('isFlowTimeLimit'));

		this.cell.setAttribute('jqStrategy', getSelectValue('jqStrategyDefault'));
		this.cell.setAttribute('flowTimeLimit', getInputValue('flowTimeLimit'));
		this.cell.setAttribute('flowTimeUnit', getSelectValue('flowTimeUnit'));
		this.cell.setAttribute('appCode', getSelectValue('appCode'));

		this.cell.setAttribute('flRemark', getInputValue('flRemark'));
		this.cell.setAttribute('flSort', getInputValue('flSort'));
		this.cell.setAttribute('startType', getRadioValue('startType'));
		this.cell.setAttribute('isDisabled', getRadioValue('isDisabled'));
		this.cell.setAttribute('codeType', getInputValue('codeType'));
		this.cell.setAttribute('codeTypeCode', getInputValue('codeTypeCode'));
		this.cell.setAttribute('codePrefix', getInputValue('codePrefix'));
		this.cell.setAttribute('titleType', getInputValue('titleType'));
		this.cell.setAttribute('canChangeTitle', getCheckBoxValue('canChangeTitle') == true || getCheckBoxValue('canChangeTitle') == 'true' || getCheckBoxValue('canChangeTitle') == 1 || getCheckBoxValue('canChangeTitle') == '1' ? 1 : 0);
		this.cell.setAttribute('showGraph', getRadioValue('showGraph'));
		this.cell.setAttribute('showRelationFile', getRadioValue('showRelationFile'));
		this.cell.setAttribute('wisSortType', getRadioValue('wisSortType'));
		this.cell.setAttribute('serviceObjectDefineId', getInputValue('serviceObjectDefineId'));
		
		this.cell.setAttribute('fix_left', getInputValue('fix_left'));
		this.cell.setAttribute('fix_top', getInputValue('fix_top'));
		this.cell.setAttribute('doWhenRepeatInAcs', getSelectValue('doWhenRepeatInAcs'));
		this.cell.setAttribute('doWhenNoUsersAtWp', getSelectValue('doWhenNoUsersAtWp'));
		
		this.cell.setAttribute('isBizFl', getRadioValue('isBizFl'));
		
		//可阅人员
		this.cell.setAttribute('kyList', getMSelectValue('kyList'));
		//发起人员
		this.cell.setAttribute('fqList', getMSelectValue('fqList'));
		
		//逾期设置
		this.cell.setAttribute('status', getRadioValue('status'));
		this.cell.setAttribute('approverOvertime', getInputValue('approverOvertime'));
		this.cell.setAttribute('approverRate', getRadioValue('approverRate'));
		this.cell.setAttribute('leaderOvertime', getInputValue('leaderOvertime'));
		this.cell.setAttribute('leaderId', getInputValue('leaderId'));
		this.cell.setAttribute('leaderName', getInputValue('leaderName'));
		this.cell.setAttribute('leaderRate', getRadioValue('leaderRate'));
		
		//
		this.saveTriggers();
		
	},
	loadTriggers : function() {
		var triggers = this.cell.getAttribute('triggers', '').split("|");
		for (var i = 0; i < triggers.length; i++) {
			var aTrigger = triggers[i].split(",");
			
			if (aTrigger.length == 4) {
				var trigger_code = aTrigger[0];
				var trigger_name = aTrigger[1];
				var trigger_action = aTrigger[2];
				var trigger_isSyn = aTrigger[3];
				this.trigger_grid.store.getById(trigger_code).set('action', trigger_action);
				this.trigger_grid.store.getById(trigger_code).set('isSyn', trigger_isSyn == 'true');
			}
		}
		
	},
	saveTriggers : function() {
		
		var triggers = this.trigger_grid.store.data;
		var trigger_str_array = [];
		
		for (var i = 0; i < triggers.length; i++) {
			var aTrigger = triggers.get(i).data;
			if (triggers.get(i).get('action') != '') {
				var aTrigger_str =
				triggers.get(i).get('code')
				+ ',' + triggers.get(i).get('name') + ',' + triggers.get(i).get('action') + ',' + triggers.get(i).get('isSyn');
				trigger_str_array.push(aTrigger_str);
			}
		}
		
		if (trigger_str_array.length > 0) {
			var triggers_str = trigger_str_array.join("|");
			this.cell.setAttribute('triggers', triggers_str);
		}
	}
});
var loadServiceObjectDefineInfo = function(serviceObjectDefineIdVar){
	if (isNotEmpty(serviceObjectDefineIdVar)){
		Ext.Ajax.request({
			type : "POST",
			dataType : "json",
			url : "../../../ServiceObjectDefine!getServiceObjectDefineInfo.ajax",
			params : {'id' : serviceObjectDefineIdVar, 't' : (new Date()).getTime()},
			success : function(resp) {
				var data = Ext.util.JSON.decode(resp.responseText);
				setInputValue('serviceObjectDefineId', data.serviceObjectDefineId);
				setInputValue('serviceObjectDefineName', (isNotEmpty(data.serviceObjectDefineAppName) ? data.serviceObjectDefineAppName + '/' : '') + data.serviceObjectDefineName);
				setInputValue('serviceObjectDefineUrlPc', data.serviceObjectDefineUrlPc);
				setInputValue('serviceObjectDefineUrlPh', data.serviceObjectDefineUrlPh);
				setInputValue('serviceObjectDefineUrlPd', data.serviceObjectDefineUrlPd);
			},
			failure : function() {
				setInputValue('serviceObjectDefineId', '');
				setInputValue('serviceObjectDefineName', '');
				setInputValue('serviceObjectDefineUrlPc', '');
				setInputValue('serviceObjectDefineUrlPh', '');
				setInputValue('serviceObjectDefineUrlPd', '');
			}
		});
	} else {
		setInputValue('serviceObjectDefineId', '');
		setInputValue('serviceObjectDefineName', '');
		setInputValue('serviceObjectDefineUrlPc', '');
		setInputValue('serviceObjectDefineUrlPh', '');
		setInputValue('serviceObjectDefineUrlPd', '');
	}
}
var loadCtInfo = function(cateIdVar){
	if (isNotEmpty(cateIdVar)){
		Ext.Ajax.request({
			type : "POST",
			dataType : "json",
			url : "../../../Ct!getCtInfo.ajax",
			params : {'id' : cateIdVar, 't' : (new Date()).getTime()},
			success : function(resp) {
				var data = Ext.util.JSON.decode(resp.responseText);
				setInputValue('ctId', data.ctId);
				setInputValue('flowCtName', data.flowCtName);
			},
			failure : function() {
				setInputValue('ctId', '');
				setInputValue('flowCtName', '');
			}
		});
	} else {
		setInputValue('ctId', '');
		setInputValue('flowCtName', '');
	}
}
var addForm = function(formCode, formVersion, notAlertError) {
	var flowCode = flow_win.flowCode;
	var flowVersion = flow_win.flowVersion;
	Ext.Ajax.request({
		url : 'designer!addFormsForFlow.ajax',
		method : 'POST',
		params : {
			formCode : formCode,
			formVersion : formVersion,
			flowCode : flowCode,
			flowVersion : flowVersion
		},
		success : function(response) {
			var data = Ext.util.JSON.decode(response.responseText);
			if (data.success) {
				flow_win.forms_grid.store.reload();
				flow_win.selected_forms_grid.store.reload();
				
			}
			else if (!notAlertError) {
				Ext.MessageBox.alert('警告', data.msg);
			}
		}
	});
};
var deleteForm = function(formCode, formVersion, notAlertError) {
	
	var flowCode = flow_win.flowCode;
	var flowVersion = flow_win.flowVersion;
	Ext.Ajax.request({
		url : 'designer!deleteFormsOnFlow.ajax',
		method : 'POST',
		params : {
			formCode : formCode,
			formVersion : formVersion,
			flowCode : flowCode,
			flowVersion : flowVersion
		},
		success : function(response) {
			var data = Ext.util.JSON.decode(response.responseText);
			if (data.success) {
				flow_win.forms_grid.store.reload();
				flow_win.selected_forms_grid.store.reload();
				
			}
			else if (!notAlertError) {
				Ext.MessageBox.alert('警告', data.msg);
			}
		}
	});
};
/** 选择 从左向右 */
var selectToKyList = function() {
	var selNodes = flow_win.kyTree.getChecked();
	var ids = [];
	Ext.each(selNodes, function(node) {
		var nodePrefix = node.id.substring(0, 5);
		if (nodePrefix == 'Xdpa_' || nodePrefix == 'Part_' || nodePrefix == 'User_' || nodePrefix == 'Role_' || nodePrefix == 'Orgn_' || nodePrefix == 'Pbiz_' || nodePrefix == 'Objf_' || nodePrefix == 'Rank_') {
			if (node.id.substring(5) != 0) {
				var userid = node.id;
				if(node.leaf==true||(node.attributes.type=='user'||node.attributes.type=='role')){
					jsAddItemToSelect('kyList', node.text, userid);
				}else{
					alert("请选择正确的标准角色和人员！！");
				}
			}
		}
	});
};

var query_ky_tree = function(){
	flow_win.kyTree.root.reload(function(){
		var ky_tree_qk = $('#ky_tree_qk').val();
		if(ky_tree_qk != ''){
			flow_win.kyTree.getRootNode().expandChildNodes(true);
		}
	});
}

var selectToFqList = function() {
	var selNodes = flow_win.fqTree.getChecked();
	var ids = [];
	Ext.each(selNodes, function(node) {
		var nodePrefix = node.id.substring(0, 5);
		if (nodePrefix == 'Xdpa_' || nodePrefix == 'Part_' || nodePrefix == 'User_' || nodePrefix == 'Role_' || nodePrefix == 'Orgn_' || nodePrefix == 'Pbiz_' || nodePrefix == 'Objf_' || nodePrefix == 'Rank_') {
			if (node.id.substring(5) != 0) {
				var userid = node.id;
				if(node.leaf==true||(node.attributes.type=='user'||node.attributes.type=='role')){
					jsAddItemToSelect('kyList', node.text, userid);
				}else{
					alert("请选择正确的标准角色和人员！！");
				}
			}
		}
	});
};
var query_fq_tree = function(){
	flow_win.fqTree.root.reload(function(){
		var fq_tree_qk = $('#fq_tree_qk').val();
		if(fq_tree_qk != ''){
			flow_win.fqTree.getRootNode().expandChildNodes(true);
		}
	});
}
var ctWin;
var showTree = function(treeRootId, treeRootPrefix){
	if(ctWin!=null){
		ctWin.close(); 
	}
	ctWin = new Ext.Window({ 
		width:275,
		height:300,
		resizable:false,
		html:'<iframe name=\'myFrame\' id=\'myFrame\' height=\'230\' width=\'260\' src=\"../../../Ct!selectCtTree.do?treeRootPrefix='+treeRootPrefix+'&treeRootId='+treeRootId+'\"></iframe>',
		title:"选择树" ,
		buttonAlign: 'center',
		buttons: [{ text: '确定', handler: function(){
				var idName = myFrame.window.getObjectId();
				if (isNotEmpty(idName)){
					var objectId = idName.substring(idName.indexOf('_')+1);
					var prefix = idName.substring(0,idName.indexOf('_')+1);
					if(prefix == 'App_'){
						alert('请选择具体的业务对象');
					} else if(prefix == 'Object_'){
						loadServiceObjectDefineInfo(objectId);
						ctWin.close();
					} else {
						loadCtInfo(objectId);
						ctWin.close();
					}
				} else {
					ctWin.close();
				}
			}
		}]
	});
	ctWin.show(); 
}

var idRuleWin;
var showIdRuleTree = function(treeRootId, treeRootPrefix){
	if(idRuleWin!=null){
		idRuleWin.close(); 
	}
	idRuleWin = new Ext.Window({ 
		width:275,
		height:300,
		resizable:false,
		html:'<iframe name=\'idRuleFrame\' id=\'idRuleFrame\' height=\'230\' width=\'260\' src=\"../../../IdRule!tree.do?treeRootPrefix='+treeRootPrefix+'&treeRootId='+treeRootId+'&t=' + (new Date).getTime() + '\"></iframe>',
		title:"选择树" ,
		buttonAlign: 'center',
		buttons: [{ text: '确定', handler: function(){
				var idName = idRuleFrame.window.getObjectIdName();
				if (isNotEmpty(idName)){
					var objectId = idName.substring(0,idName.indexOf(';'));
					var objectName = idName.substring(idName.indexOf(';')+1);
					loadIdRuleInfo(objectId, objectName);
					idRuleWin.close();
				} else {
					idRuleWin.close();
				}
			}
		}]
	});
	idRuleWin.show(); 
}
var loadIdRuleInfo = function(objectId, objectName){
	if (isNotEmpty(objectId) && isNotEmpty(objectName)){
		setInputValue('codeTypeCode', objectId);
		setInputValue('codeType', objectName);
	} else {
		setInputValue('ctId', '');
		setInputValue('flowCtName', '');
	}
}