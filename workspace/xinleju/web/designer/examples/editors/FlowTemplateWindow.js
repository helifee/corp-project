FlowTemplateWindow = Ext.extend(Ext.Window, {
	title : '流程复制' ,
	closable : true ,
	width : 960,
	height : 500,
	plain : true ,
	maximizable : true ,
	closeAction : 'hide',
	modal : true,
	onOk : function() {
		var id = $("input:checkbox:checked").attr("value");
		
		if(id != null && id != "") {
			Ext.MessageBox.confirm('提示', '是否确认复制该流程，该流程会覆盖当前流程，是否继续', function(option){
				if(option == "yes") {
					
					var url = ""
						
					var xml = "";
							
					if(flowId && flowId != "null"){
						url = '../../../Designer!copyFlow.ajax?copyFlId='+id+"&flowId="+flowId;
					}else {
						url = '../../../Designer!copyFlow.ajax?copyFlId='+id;
						var encoder = new mxCodec();
						var node = encoder.encode(editor.graph.getModel());
						xml = encodeURIComponent(mxUtils.getPrettyXml(node));
					}
							
					var req = new mxXmlRequest(url,'xml='+xml, 'POST', false);
					
					req.send(function(req) {
						var doc = req.getDocumentElement();
						editor.readGraphModel(doc);
					});
				}
			});
		} else {
			Ext.MessageBox.alert("提示","请选择一行数据！");
			return;
		}
		
		this.hide();
	},
	onCancel : function() {
		this.hide();
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
				title : '流程模板',
				iconCls : 'tabs',
				contentEl : 'flow-template-div'
			}
			]
		});
		return tabs;
	},
	initComponent : function() {
		this.tabs = this.createTabs();
		this.kyTree = this.init_tree();
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
		FlowTemplateWindow.superclass.initComponent.call(this);
	},
	canEdit : function() {
		return 'check' == act || 'edit' == act || 'create' == act;
	},
	init_tree :function(){
		var currentDep = 0;
		var rootType = 3;
		var root = new Ext.tree.AsyncTreeNode({
	        id : 'Root_0',
	        prefix : 'Root_',
	        text : '根节点',
	        expanded : true
	    });
	    var tree = new Ext.tree.TreePanel({
	        loader : new Ext.tree.TreeLoader({
	            dataUrl : '../../../Ct!getTree.ajax?parentId=' + root.id.substring(root.attributes.prefix.indexOf('_')+1) + '&prefix=' + root.attributes.prefix + '&isDisabled=' + $("#isDisabled").val()
	        }),
	        root : root,
	        renderTo : 'tree',
	        border : false,
	        autoScroll : false,
	        rootVisible : false,
	        autoHeight : true,
	        width : '100%'
	    });
	    tree.on('click', function(node) {
	    	 node.expand();
			 node.select();
	    	 var ctId = (node.id).substring(node.attributes.prefix.indexOf('_')+1);
	         var prefixVar = node.attributes.prefix;
	         $('#ctId',window.document).val('');
	         $('#appId',window.document).val('');
	         $('#serviceObjectDefineId',window.document).val('');
	         var objDomId = 'ctId';
	         if (prefixVar == 'App_'){
	         	objDomId = 'appId';
	         } else if(prefixVar == 'Object_'){
	         	objDomId = 'serviceObjectDefineId';
	         }
	         $('#'+objDomId,window.document).val(ctId);
	         $('#keyword').val("");
	         queryFlData("../../../Ct!listAjax.do?limit=2000&"+objDomId+"="+ctId);
	    });
	    tree.on('beforeload', function(node) {
	        var ctId = (node.id).substring(node.attributes.prefix.indexOf('_')+1);
	        var isDisabled = $("#isDisabled").val();
	        tree.loader.dataUrl = '../../../Ct!getTree.ajax?parentId=' + ctId + '&prefix=' + node.attributes.prefix + '&isDisabled='+isDisabled;
	    });
		root.expand();
		root.select();
		return tree;
	}
});

function queryFlData(url) {
	$.get(url, function(datas) {
    	var items = eval(datas);
    	var tbodyHtml = "";
    	
    	if(items.length > 13)
		{
			$.each(items, function() {
				var id = "id_"+this.flowId;
				tbodyHtml += "<tr onclick='chooseCheckBox(\""+id+"\")'>";
				tbodyHtml += "<td width='5.3%' align='center'><input name='ids' type='checkbox' id='"+id+"' value='"+this.flowId+"' onclick='chooseCheckBox(\""+id+"\")' ></td>";
				tbodyHtml += "<td width='21.1%' title=\""+this.flowName+"\">"+this.flowName+"</td>";
				tbodyHtml += "<td width='15%' title=\""+this.flowCode+"\">"+this.flowCode+"</td>";
				tbodyHtml += "<td width='20%' title=\""+this.flowVersion+"\">"+this.flowVersion+"</td>";
				tbodyHtml += "<td width='20%' title=\""+this.ctName+"\">"+this.ctName+"</td>";
				tbodyHtml += "<td width='20%' title=\""+this.allPath+"\">"+this.allPath+"</td>";
				tbodyHtml += "</tr>";
			});
		}
		else
		{
			$.each(items, function() {
				var id = "id_"+this.flowId;
				tbodyHtml += "<tr onclick='chooseCheckBox(\""+id+"\")'>";
				tbodyHtml += "<td width='5%' align='center'><input name='ids' type='checkbox' id='"+id+"' value='"+this.flowId+"' onclick='chooseCheckBox(\""+id+"\")' ></td>";
				tbodyHtml += "<td width='20%' title=\""+this.flowName+"\">"+this.flowName+"</td>";
				tbodyHtml += "<td width='15%' title=\""+this.flowCode+"\">"+this.flowCode+"</td>";
				tbodyHtml += "<td width='20%' title=\""+this.flowVersion+"\">"+this.flowVersion+"</td>";
				tbodyHtml += "<td width='19%' title=\""+this.ctName+"\">"+this.ctName+"</td>";
				tbodyHtml += "<td width='21%' title=\""+this.allPath+"\">"+this.allPath+"</td>";
				tbodyHtml += "</tr>";
			});
		}
    	$("#flowTableBody").empty().html(tbodyHtml);
     });
}

function chooseCheckBox(id){
	
	$.each($("input:checkbox") , function() {
		$(this).prop("checked",false); 
	});
	$("#"+id).prop("checked", true);
	
}

function queryFl(inputObj) {
	
	if(inputObj.value == null ) {
		inputObj.value = "";
	}
	
	var objDomId = "";
	var value = "";
	
	var ctId = $('#ctId').val();
    var appId = $('#appId').val();
    var serviceObjectDefineId = $('#serviceObjectDefineId').val();
    
    if(ctId != null && ctId != "") {
    	objDomId = "ctId";
    	value = ctId;
    }
    
    if(appId != null && appId != "") {
    	objDomId = "appId";
    	value = appId;
    }
    
    if(serviceObjectDefineId != null && serviceObjectDefineId != "") {
    	objDomId = "serviceObjectDefineId";
    	value = serviceObjectDefineId;
    }
    
    queryFlData("../../../Ct!listAjax.do?limit=2000&"+objDomId+"="+value + "&keyword="+ encodeURIComponent(inputObj.value));
}

