var businessObjectWindow;//选择业务对象对话框

$(function(){
	/**
	 * 初始化所属系统下拉框
	 */
	$('#frm_businessObject_vsyscode').combobox({    
	    data:sysList,    
	    valueField:'key',    
	    textField:'value'   
	});  
	
	//业务对象对话框
//	businessObjectWindow = new TemplateWindow({
//		"id":"businessObjectWindow",
//		"title":'业务对象',
//		"templateUrl":contextPath+"/page/dialog/grid.jsp?model=boRef",
//		"baseParams":{},
//		"width":500,
//		"okCallback":function(data){
//			var ed = $('#grid').datagrid('getEditor', {index:editingId,field:'dsid'});
//            $(ed.target).textbox('setText', data.id);
//		}
//		
//	});
	initGrid();
	initDialog();
});

/**
 * 初始化枚举类型数据源选择对话框
 */
function initDialog(){	
	$('#dd').dialog({
		resizable:true,
		modal:true,
		closed:true,
		buttons:[{
			text:'保存',
			handler:function(){
				var checkedData = $('#bizObj').datagrid("getSelected");
			 	if(!checkedData){
			 		alert("请选择一个数据源");
			 		return;
			 	}else{
			 		$('#dd').dialog("close");
			 		var ed = $('#grid').datagrid('getEditor', {index:editingId,field:'dsid'});
		            $(ed.target).textbox('setText', checkedData.id);
			 	}
			}
		},{
			text:'关闭',
			handler:function(){
				$('#dd').dialog("close");
			}
		}]
	});
}

//function openBizObjectDialog(){	
//	
//	$('#dd').dialog("open");
//	
//	$('#bizObj').datagrid({
//	    url:'BusinessObject!getBaseDataObject.do'	    
//	});  
//}

/**
 * 保存业务对象
 */ 
function save() {
	
   $('body').mask("数据保存中...");
   if (editingId != undefined) {
        $('#grid').datagrid('endEdit', editingId);
   }
   var rows = $('#grid').datagrid('getRows');
   var t_rows = {createDate:1978};
   //注册字段信息。
   //$('#boFieldInfoList').val(JSON.stringify(rows));
  // $('#boFieldInfoList').val("");
   //alert($('#boFieldInfoList').val());
   $('#boFieldInfoList').val(JSON.stringify(rows));
   //alert($('#fieldInfoList').val());
   $.ajax({
		type : "POST",
		url : "BusinessObject!save.do",
		data : $('#frm').serialize(),
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$('body').unmask();
			if (data && data.success) {
		        parent.query();
		        parent.closeDialog('newDialog');
			} else {
				alert(data.msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			//$('body').unmask();
			alert("网络故障！");
		}
	
	});
};
 
/**
 * 加载业务对象字段
 */
 var loadFields=function() {
 	var tag = "body";
 	var vfetchdataclass = $("#frm_businessObject_vfetchdataclass").val() ;
    if(vfetchdataclass == ""){
    	alert("请填写[数据获取接口]!");
    	$("#frm_businessObject_vfetchdataclass").focus();
    	return;
    }
    $.ajax({
		type : "POST",
		url : "BusinessObject!loadFields.do",
		data : $('#frm').serialize(),
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$('#grid').datagrid({data:data.rows});
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$(tag).unmask();
			alert("网络故障！");
		},
		dataType : "json"
	});
    
//    $('#grid').datagrid('option').queryParams = $('#frm').serialize();
//    $('#grid').datagrid('reload');
};

/**
 * 
 */
 var query = function(start){
	 if (start && start >= 0) {
		 document.getElementsByName('start')[0].value = start;
     }
	 $('body').mask("数据查询中...");
     $("#frm").submit();
};

var openRef = function(idtag,nametag){
	paramers="dialogWidth:800px; dialogHeight:600px; status:no";
    var values = window.showModalDialog("FiRef!openBORef.do","",paramers);
    if(values!=undefined && values.length > 0){
       var ids = "";
       var names = "";
       for(var i = 0 ; i < values.length; i++){
    	   var arr = values[i].split(',');
    	   if(i > 0){
    		   ids += ",";
    		   names +=",";
    	   }
    	   if(arr.length > 1){
    		   ids += arr[0];
    		   names += arr[1];
    	   }
       }
       $('input:[id="'+idtag+'"]').val(ids);
       $('input:[id="'+nametag+'"]').val(names);
    }
};

var clearRef = function(idtag,nametag){
       $('input:[id="'+idtag+'"]').val("");
       $('input:[id="'+nametag+'"]').val("");
};


var changetype = function(select,idx){
	if(select.value == 'enum'){
		$('div:[id="boRef_'+idx+'.div"]')[0].style.display = '';
	}else{
		$('div:[id="boRef_'+idx+'.div"]')[0].style.display = 'none';
		$('input:[id="boRef_'+idx+'.id"]').val("");
	    $('input:[id="boRef_'+idx+'.name"]').val("");
	}
};


/**
 * "注册字段"列表初始化
 */
var initGrid = function(){
    $('#grid').datagrid({
    	data:boFieldInfoList,
        columns: [[
            {
        	   field : 'state',
               title: '标记',
               width: 100,
               hidden:true,
               align: 'center',
               formatter : function(v){
            	   if(v == 'delete'){
            		   return '<img src="images/icon_delete.png"/>'
            	   }
            	   return v;
               }
            },
            {
                field: 'fieldname',
                title: '数据项名称',
                width: 100,
                align: 'center'
            },
            {
                field: 'fieldkey',
                title: '数据项编码',
                width: 150,
                align: 'center',
            },
            {
                field: 'flag',
                title: '属性',
                width: 100,
                halign: 'center',
                editor: { type: 'combobox',
                    options: { data: flag_ref, valueField: "key", textField: "value" }
                },
                formatter : function(v){
                   
                	return selectFormatter(v,flag_ref);
                }
            },
            {
                field: 'vtype',
                title: '数据类型',
                width: 100,
                halign: 'center',
                editor: { type: 'combobox',
                    options: { data: vtype_ref, valueField: "key", textField: "value",onChange:function(v){
                    	 var ed = $('#grid').datagrid('getEditor', {
	                    	    	index : editingId,
	                    	    	field : 'dsid'
                    	    	});
                    	
                    	 if(v == 'enum'){
                    		 $(ed.target).textbox({"iconWidth":15});
                    	 }else{
                    		 $(ed.target).textbox({"iconWidth":0});
                    	 }
                    } }
                },
                formatter : function(v){
                	return selectFormatter(v,vtype_ref);
                }
            },
            {
                field: 'dsid',
                title: '枚举型数据源',
                width: 150,
                halign: 'center',
                editor: {
                    type: 'textbox',
                    options: {
                    	editable:false,
                        missingMessage: '！',
                        iconWidth: 15,
                        icons: [{
                            iconCls: 'icon-search',
                            handler: function (e) {                
//                            	businessObjectWindow.openWindow();                            	
                            	$('#dd').dialog("open");
                            }
                        }]
                    }
                },
                formatter: function(v){
                	return dsSelectFormatter(v,boList)
                }
            }
        ]],
        onDblClickRow: edit,
        onClickRow: blur,
        fit: true,
        border: false,
        //pagination: true,
        singleSelect: true,
        rownumber: true
    });
};

var editingId;//正在编辑的
//修改
function edit(index) {
	 $('#grid').datagrid('selectRow', index); //先选择再编辑
	    var row = $('#grid').datagrid("getSelected");
	    if(row.state == 'delete'){
	    	return;
	    }
    if (editingId != undefined) {
        $('#grid').datagrid('endEdit', editingId);
    }
    var index = $('#grid').datagrid('getRowIndex', row);
    if (row) {
        editingId = index;
        $('#grid').datagrid('beginEdit', editingId);
    }
   
   
}

function blur(index){
	 if (editingId != undefined) {
	        $('#grid').datagrid('endEdit', editingId);
	    }
	
}

function selectFormatter(value,data){
	
	for(var i = 0, length = data.length;i<length;i++){
		if(value == data[i].key){
			return data[i].value;
		}
	}
        return '';
}

function dsSelectFormatter(value,boList){
	var length = boList.length;
	for(var i = 0;i<length;i++){
		if(value == boList[i].id){
			return boList[i].vobject;
		}
	}
        return '';
}
