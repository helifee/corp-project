TrWindow = Ext.extend(Ext.Window, {
	title : '属性设置',
	width : 990,
	height : 480,
	layout : 'border',
	closeAction : 'hide',
	plain : true,
	maximizable : true,
	modal : true,
	closable : true,
	shadow:false,  
	initComponent : function() {
		
		this.tabs = this.createTabs();
		this.cate_tree = this.createCateTree();
		this.cate_val_tree = this.createCateValTree();
		
		Ext.apply(this, {
			layout : 'border',
			items : [this.tabs],
			buttons : [
			{
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
		TrWindow.superclass.initComponent.call(this);
	},
	canEdit : function() {
		
		return 'check' == act || 'edit' == act || 'create' == act;
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
			var edit = new mxCellAttributeChange(this.cell, 'label', this.cell.getAttribute('trName'));
			model.execute(edit);
		}
		finally {
			model.endUpdate();
		}
		
		this.setTitle("流转属性 - " + this.cell.getAttribute('trName'));
	},
	onCancel : function() {
		this.hide();
	},
	
	/**
	 * 如下代码构建组建
	 * 
	 */
	
	createTabs : function() {
		var tabs = new Ext.TabPanel({
			region : 'center',
			margins : '0 0 0 0',
			padding : '5',
			activeTab : 0,
			resizeTabs : true,
			deferredRender : false,
			minTabWidth : 95,
			tabWidth : 95,
			defaults : {
				autoScroll : true
			},
			
			items : [
			{
				title : '基本属性',
				iconCls : 'tabs',
				contentEl : 'tr-div'
			}]
		});
		
		return tabs;
	},
	
	loadData : function(cell, tabIndex) {
		this.cell = cell;
		
		// 基本信息
		setInputValue('trName', cell.getAttribute('trName', ''));
		setInputValue('trId', cell.getId());
		setInputValue('cond', cell.getAttribute('cond', ''));
		
		setSelectValue('trPriority', cell.getAttribute('trPriority', ''));
		setCheckBoxValue('isDefault', cell.getAttribute('isDefault', ''));
	},
	saveData : function() {
		var cell = this.cell;
		
		// 基本信息
		cell.setAttribute('trName', getInputValue('trName'));
		cell.setAttribute('trId', getInputValue('trId'));
		cell.setAttribute('cond', getInputValue('cond'));
		cell.setAttribute('trPriority', getSelectValue('trPriority'));
		cell.setAttribute('isDefault', getCheckBoxValue('isDefault') ? 1 : 0);
		
	},
	createCateTree:function(){
		var root = new Ext.tree.AsyncTreeNode({
	        id : 'Root_0',
	        prefix : 'Root_',
	        text : '条件选择',
	        expanded : true
	    });
	    
	    var cate_tree = new Ext.tree.TreePanel({
	        loader : new Ext.tree.TreeLoader({
	            dataUrl : '../../../CondCate!getCateTree.ajax?parentId=' + root.id.substring(root.attributes.prefix.indexOf('_')+1) + '&prefix=' + root.attributes.prefix,
	            baseAttrs : {
					uiProvider : Ext.ux.TreeCheckNodeUI
				}
	        }),

	        checkModel:'single',
	        onlyLeafCheckable: true,
	        root : root,
	        renderTo : 'cate_tree',
	      
			border : false,
			autoScroll : true,
			rootVisible : false,
			height : 250,
			width : 220
	        

//	        border : false,
//	        autoScroll : false,
//	        rootVisible : true,
//	        autoHeight : true,
//	        width : '100%'
	    });
	    cate_tree.on('click', function(node) {
	        var cateId = (node.id);
	    });
	    cate_tree.on('check', function(node,checked) {
	    	if(checked){
	    		var cateId = node.id.substring(node.attributes.prefix.indexOf('_')+1);
	 	        if('Cate_' == node.attributes.prefix){
		 	        tr_win.cate_val_tree.getLoader().dataUrl = '../../../CondCate!getCateValTree.ajax?cateId=' + cateId;
		 	        tr_win.cate_val_tree.getRootNode().reload();
	 	        }
	 	        node.select();
	 	      
	    	}else{
	    		node.unselect();
	    	}
	    });
	    cate_tree.on('beforeload', function(node) {
	        cate_tree.loader.dataUrl = '../../../CondCate!getCateTree.ajax?parentId=' + node.id.substring(node.attributes.prefix.indexOf('_')+1) + '&prefix=' + node.attributes.prefix;
	    });
	    root.expand();
	    root.select();
	    
	    return cate_tree;
	},
	getSelectedCateId:function() {
	    var node = this.cate_tree.getSelectionModel().getSelectedNode();
	    var cateId = (node && node.id != '0') ? node.id : null;
	    return cateId;
	},
	createCateValTree : function(){
		var root = new Ext.tree.AsyncTreeNode({
	        id : '0',
	        text : '可用取值',
	        expanded : true
	    });
	    
	    var cate_val_tree = new Ext.tree.TreePanel({
	        loader : new Ext.tree.TreeLoader({
	            dataUrl : '../../../CondCate!getCateValTree.ajax?cateId=' + root.id,
	            baseAttrs : {
					uiProvider : Ext.ux.TreeCheckNodeUI
				}
	        }),

	        checkModel:'single',
	        onlyLeafCheckable: true,
	        root : root,
	        renderTo : 'cate_val_tree',
	        
			border : false,
			autoScroll : true,
			rootVisible : false,
			height : 180,
			width : 220
	    });
	    cate_val_tree.on('click', function(node) {
	    });
	    cate_val_tree.on('check', function(node,checked) {
	    	if(checked){
	 	        node.expand();
	 	        node.select();
	    	}
	    	else{
	    		node.unselect();
	    	}
	    });
	    cate_val_tree.on('beforeload', function(node) {
	    });
	    root.expand();
	    root.select();
	    
	    return cate_val_tree;
	}
});
