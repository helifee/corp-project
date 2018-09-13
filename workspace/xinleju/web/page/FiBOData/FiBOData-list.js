
var query = function(){
	$('#grid').datagrid('options').queryParams = getQueryParams();
	
	
	 if( !$('#grid').datagrid('options').url){
	    	$('#grid').datagrid('options').url =  contextPath+'/FiBOData!loadlist.do';
	    }
	    
	$('#grid').datagrid('reload');
};

var fiSysInfoWindow;
var bmWindow;
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
			$('#tree').tree("options").url = contextPath+'/CorpMapping!loadficorp.do'+'?fisysinfoid='+data.id;
			$('#tree').tree("reload");
			clearData();
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
			reOption(data.id);
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
		});
	
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
	//reOption();
	
	
	$('#nl').click(function() {
        var t =  $(this).html();
        if ('展开' == t) {
            $('#search').show();
            relayout();
            $(this).html("收缩");
        } else {
            $('#search').hide();
            relayout();
            $(this).html('展开');
        }
    });
})


function reOption(value){
	
	 $.ajax({
			type : "POST",
			url : contextPath+'/FiBOData!initlist.do',
			data : {"bmid":value},
			dataType : "json",
			async: false,
			success : function(data, textStatus, jqXHR) {
				if (data) {
					var conditions = data.conditions;
					var showfields = data.showfields;
					$("#selectedCond").html("");
					initCd(conditions);
					initGrid(showfields);
				} else {
					alert(data.msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				alert("网络故障！");
			},
			dataType : "json"
		});
}


function initGrid(showfields){
	var cols = new Array();
	cols.push({
	    field : 'ck',
	    checkbox:true
	},{
		 width : 50,
		 align : 'center',
   	  	 field : 'mergenum ',
   	  	 title : '合并号',
   	  	 editor: {
          type: 'numberspinner',
          options: {
        	 min:1
          }
      }
	});
	for(var i = 0,length = showfields.length;i < length;i++){
		cols.push( {
  		  width:150,
		  align : 'center',
    	  field : showfields[i].key,
    	  title : showfields[i].name
	  });
	}
	
	cols.push( {
		  width:150,
		  align : 'center',
		  field : 'voucherstate',
		  title : '凭证生成状态'
	  });
	
	cols.push( {
		  width:150,
		  align : 'center',
		  field : 'createDate',
		  title : '生成日期',
		  formatter : function formatterdate(val, row) {
				if (val) {
					var date = new Date(val);
					return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
				} else {
					return '';
				}
			}
	  });
	
	var options = {
			singleSelect : false,
		  fit:true,
    	  rownumbers:true,
    	//  pagination: true,
    	  columns : [cols],
    	  onDblClickRow:gridEdit,
    	  onClickRow:blur	  
	};

$('#grid').datagrid(options);
/*var p = $('#grid').datagrid('getPager');
$(p).pagination({
    beforePageText: '第',
    afterPageText: '共{pages}页',
    displayMsg: '显示{from}到{to},共{total}记录'
});*/
query();
	
}


var editingId = null;
function gridEdit(index){
		if(!$('#grid').datagrid('getRows')[index].voucherstate == 'temp'){
			return;
		};
	    if (editingId != null) {
	    	var validate = $('#grid').datagrid('validateRow', editingId);
	    	if(validate){
	    		$('#grid').datagrid('endEdit', editingId);	
	    	}else{
	    		$('#grid').datagrid('selectRow', editingId);
	    		alert('请完整的输入信息');
	    		return;
	    	}
	    }
        editingId = index;
        $('#grid').datagrid('beginEdit', editingId);
}

function blur(index){
	 if (editingId != undefined) {
		 var validate = $('#grid').datagrid('validateRow', editingId);
	    	if(validate){
	    		$('#grid').datagrid('endEdit', editingId);	
	    	}else{
	    		$('#grid').datagrid('selectRow', editingId);
	    		alert('请完整的输入信息');
	    		return;
	    	}
	    }
}

function initCd(conditions){
	$('.sl-wrap').each(function(){
		$(this).remove();
	});
	for(var i = 0,length = conditions.length;i < length;i++){
		var d = '<div class="sl-wrap"><div class="sl-key"<span>'+conditions[i].name+':</span></div><div class="sl-value"><ul>';
		for(var j = 0,length1 = conditions[i].values.length;j < length1; j++ ){
			d += '<li><a href="javascript:void(0)" onclick="selectParam(\''+conditions[i].name+'：'+conditions[i].values[j].name+'\',\''+conditions[i].values[j].key+'\',\''+conditions[i].key+'Li\',\''+conditions[i].key+'\')" id="'+conditions[i].values[j].id+'">'+conditions[i].values[j].name+'</a></li>'; 
		}
		d += '</ul></div><div class="clear"></div></div>';
		$('#search').append(d);
	}
	relayout();
	
}

function relayout(){
	 $('#layout').layout('resize', {
	        height: 'auto'
	    });
}

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
	var conditions = {};
	var inputs = $("#selectedCond").find('input');
	if(inputs != null && inputs.length){
		for(var i = 0,length = inputs.length;i<length;i++){
			conditions[$(inputs[i]).attr("name")] = $(inputs[i]).val();
		}
	}
	params.conditions = JSON.stringify(conditions);
	params.createDate = $('#createDate').datebox('getValue');
	params.bmid = $('#bmid').val();
	var node=$('#tree').tree('getSelected');
	if(node && node!='null'){
		params.targsyscorpid=node.id;
	}
	params.fisysinfoid = $('#fisysinfoid').val();
	 return params;
}

function createVoucher(){
	 blur();
	 var rows = $('#grid').datagrid('getSelections');
	 var currows = new Array();
	 for(var i = 0,length = rows.length;i<length;i++){
		 if(!rows[i].id+""){
			 currows.push(rows[i]);
		 }
	 }
	if(currows.length == 0){
		 alert("请选择未生成的记录进行操作！");
		 return;
	}else{
		 $('body').mask("生成凭证...");
		 $.ajax({
				type : "POST",
				url : "FiBOData!createVoucher.do",
				data : {"vouchers":JSON.stringify(currows),"bmid":$('#bmid').val()},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("生成凭证成功！");
						query();
					} else {
						alert("生成凭证失败！");
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
		 $('body').mask("生成凭证...");
		 $.ajax({
				type : "POST",
				url : "FiBOData!delete.do",
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

function closeDialog(dialogId) {
    $('#' + dialogId).dialog('close');
}

function clearData(){
	$('#grid').datagrid({columns:[[]],url:null});
	$('#grid').datagrid('loadData',[]);
	$("#selectedCond").html("");
	$('#bmname').textbox("setValue",'');
	$('#bmid').val('');
	$('.sl-wrap').each(function(){
		$(this).remove();
	});
	relayout();
}

