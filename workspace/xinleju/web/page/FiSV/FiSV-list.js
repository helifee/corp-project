
var fiSysInfoWindow;
var bmWindow;


var query = function(){
	$('#grid').datagrid('options').queryParams = getQueryParams();
	
	 if( !$('#grid').datagrid('options').url){
	    	$('#grid').datagrid('options').url =  contextPath+'/FiSV!loadlist.do';
	    }
	    
	$('#grid').datagrid('reload');
};

$(function(){
	
	//业务对象开窗
	fiSysInfoWindow = new TemplateWindow({
		"id":"fiSysInfoWindow",
		"title":'业务对象',
		"templateUrl":contextPath+"/page/dialog/grid.jsp?model=FiSysInfoRef",
		"baseParams":{},
		"width":500,
		"okCallback":function(data){
			$('#sysSearch').textbox("setValue",data.vtargetsysname);
			$('#fisysinfoid').val(data.id);
			clearData();
			$('#tree').tree("options").url = contextPath+'/CorpMapping!loadficorp.do'+'?fisysinfoid='+data.id;
			$('#tree').tree("reload");
		}
	});
	
	
	bmWindow = new TemplateWindow({
		"id":"bmWindow",
		"title":'业务类型',
		"templateUrl":contextPath+"/page/dialog/tree.jsp?model=bmRef",
		"baseParams":{},
		"width":400,
		"okCallback":function(data){
			$('#bmname').textbox("setValue",data.text);
			$('#bmid').val(data.id);
			query();
		}
	});
	
	//项目搜索框
	$('#sysSearch').textbox({ 
		editable:false,
        missingMessage: '请选择财务系统！',
        iconWidth: 15,
        icons: [{
            iconCls: 'icon-search',
            handler: function (e) {                
            	fiSysInfoWindow.openWindow();
            }
        }]
		}) ;
	
	//项目搜索框
	$('#bmname').textbox({ 
		editable:false,
        missingMessage: '请选择业务类型！',
        iconWidth: 15,
        icons: [{
            iconCls: 'icon-search',
            handler: function (e) {  
            	var node=$('#tree').tree('getSelected');
            	var queryParams = {};
            	if(node && node!='null'){
            		queryParams.targsyscorpid=node.id;
            	}
            	queryParams.fisysinfoid = $('#fisysinfoid').val();
            	
            	if(queryParams.targsyscorpid && queryParams.fisysinfoid){
            		bmWindow.baseParams.queryParams = queryParams;
                	bmWindow.openWindow();	
            	}else{
            		alert('请选择一个公司');
            	}
            }
        }]
		});
	
	$('#tree').tree({
		 cascadeCheck:false,
		 lines:true,
		 animate:true,
		 onSelect:function(node){
			 //选中节点时候调用
			 clearData();
		 }
		
	  });
	
	  $('#grid').datagrid({
		  singleSelect : true,
		  fit:true,
		  pagination: true,
          columns : [[{
              field : 'ck',
              checkbox:true
          },
                      {
		        		  width:150,
		        		  align : 'center',
			        	  field : 'text',
			        	  title : '凭证字'
		        	  },
		        	  {
		        		  width:150,
		        		  align : 'center',
			        	  field : 'name',
			        	  title : '凭证号'
		        	  },
		        	  {
		        		  width:100,
		        		  align : 'center',
			        	  field : 'name',
			        	  title : '凭证日期'
		        	  },
		        	  {
		        		  width:100,
		        		  align : 'center',
			        	  field : 'name',
			        	  title : '会计分录'
		        	  },
		        	  {
		        		  width:100,
		        		  align : 'center',
			        	  field : 'name',
			        	  title : '金额'
		        	  },
		        	  {
		        		  width:100,
		        		  align : 'center',
			        	  field : 'name',
			        	  title : '是否输出'
		        	  },
		        	  {
		        		  width:100,
		        		  align : 'center',
			        	  field : 'name',
			        	  title : '输出出失败原因'
		        	  }
    	  ]],
    	  rownumbers:true
	  });
	  
	  var p = $('#grid').datagrid('getPager');
	  $(p).pagination({
	      beforePageText: '第',
	      afterPageText: '共{pages}页',
	      displayMsg: '显示{from}到{to},共{total}记录'
	  });
	
})



function selectParam(displayName,value,liId,inputName){
	var appendHtml = '<a href="javascript:void(0)" onclick="clearCurrent(this)">'+displayName+'</a>' +
					 '<input type="hidden" name ="'+inputName+'" ' + 'value="'+value+'"/>';
	//首先查找有没有这个查询条件
	var liDom = $("#selectedCond").children("#"+liId);
	if(liDom.length > 0){
		liDom.html(appendHtml);
	}else{
		$("#selectedCond").append('<li id="'+liId+'">'+appendHtml+'</li>');
	}
	query();
}

function clearAllParam(){
	$("#selectedCond").html("");
	query();
}

function clearCurrent(target){
	$(target).parent().remove();
	query();
}

function getQueryParams(){
	var params = {};
	var inputs = $("#selectedCond").find('input');
	if(inputs != null && inputs.length){
		for(var i = 0,length = inputs.length;i<length;i++){
			 params[$(inputs[i]).attr("name")] = $(inputs[i]).val();
		}
	}
	params.createDate = $('#createDate').val();
	params.bmid = $('#bmid').val();
	var node=$('#tree').tree('getSelected');
	if(node && node!='null'){
		params.targsyscorpid=node.id;
	}
	params.fisysinfoid = $('#fisysinfoid').val();
	 return params;
}



function loadGrid(){
	var param = {};
	var node=$('#tree').tree('getSelected');
	if(node && node!='null'){
		param.targsyscorpid=node.id;
	}
	param.fisysinfoid = $('#sysSearch').textbox("getValue");
    $('#grid').datagrid('options').queryParams =param;
    if(!$('#grid').datagrid('options').url){
    	$('#grid').datagrid('options').url =  contextPath+'/page/CorpMapping/grid.json';
    }
    
    $('#grid').datagrid('reload');
}

function closeDialog(dialogId) {
    $('#' + dialogId).dialog('close');
}

function outputVoucher(){
	 var rows = $('#grid').datagrid('getSelections');
	 var currows = new Array();
	 for(var i = 0,length = rows.length;i<length;i++){
		 if(!rows[i].id+""){
			 currows.push(rows[i]);
		 }
	 }
	if(currows.length == 0){
		 alert("请选择未输出的记录进行操作！");
		 return;
	}else{
		 $('body').mask("提交数据...");
		 $.ajax({
				type : "POST",
				url : "FiSV!outputVoucher.do",
				data : {"vouchers":JSON.stringify(currows),"bmid":$('#bmid').val()},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("输出凭证成功！");
						query();
					} else {
						alert("输出凭证失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("执行失败！");
				}
			});
	}
}


function del(){
	 var id = getGridCheckBoxValues();
	if(!id){
		 alert("请选择一条记录进行操作！");
		 return;
	}else{
		 $('body').mask("提交数据...");
		 $.ajax({
				type : "POST",
				url : "FiSV!delete.do",
				data : {"id":id,"bmid":$('#bmid').val()},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("删除成功！");
						query();
					} else {
						alert("删除失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("执行失败！");
				}
			});
	}
}


function getGridCheckBoxValues(){
	
	var rows = $('#grid').datagrid('getSelections');
	 var cpList = [];
	 if(rows != null && rows){
		 for (var jj = 0,length = rows.length; jj < length; jj++) {
		      		if(rows[jj].id+""){
		      			cpList.push(rows[jj].id);
		      		}
		    }
	 }

	    var val_string = "";
	    if (cpList.length > 0) val_string = cpList.join(";");
	    
	    return val_string;
}


function clearData(){
	$('#grid').datagrid('loadData',[]);
	$("#selectedCond").html("");
	$('#bmname').textbox("setValue",'');
	$('#bmid').val('');
}

