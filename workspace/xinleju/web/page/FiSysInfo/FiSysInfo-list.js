/**
 * 查询
 */
function query(){
	var title = $("#title").val();
	$('#grid').datagrid('options').queryParams = {keyword:title};
	
	$('#grid').datagrid('reload');
};


$(function(){
	$('#frm_fiSysInfo_vtype').combobox({    
	    data:vtype_ref,    
	    valueField:'key',    
	    textField:'value'   
	});
	initGrid();//初始化列表
})


function save(){
	$('#frm2').form("submit",{
		url:"FiSysInfo!saveFiSysinfo.do",
		ajax:true,
		//提交前验证
		onSubmit:function(){
            //提交显示提示信息
			$.messager.progress({
				title:"提示",
				text:"数据处理中，请稍后...."
			});	
                        //校验表单
			var isValid = $(this).form("validate");
			if (!isValid) {//校验不通过关提示信息
				$.messager.progress("close");
			}
			return isValid;
		},		
		success:function(data){
			$.messager.progress("close");//关闭在提交表单前显示的提示信息
	    	data = $.parseJSON(data);
	        if(data.success){
	        	$("#editDialog").dialog("close");
	        	$('#grid').datagrid("reload");
	        }else{
	        	alert(data.msg);
	        }
	    }
	});	
}


/**
 * 新增
 * @param id
 */
function newFiSysInfo(id){
	$('#frm2').form("reset");
	if(id){
		$.post("FiSysInfo!getFiSysinfo.do?id="+id,{},function(data){
			$("#frm2").form("load",{
				"fiSysInfo.fiSysCode":data.fiSysCode,
				"fiSysInfo.fiSysName":data.fiSysName,
				"fiSysInfo.type":data.type,
				"fiSysInfo.bizSysCode":data.bizSysCode,
				"fiSysInfo.id":data.id,
				"fiSysInfo.status":data.status,
				"fiSysInfo.sender":data.sender,
				"fiSysInfo.webUrl":data.webUrl
				
			});
		});
	}
	
	$("#editDialog").dialog("open");
	
//	var cp;
//	if(contextPath.length==1){
//		cp = ""
//	}else{
//		cp=contextPath;
//	}
//	dialoginit({
//        self: '#newDialog',
//        iframe:cp+'/FiSysInfo!edit.do'+(id != null ? '?id='+id : '?act=create') ,
//        size:'max',
//        modal: true,
//        title: '财务系统编辑',
//        onClose: function() {
//            $(this).dialog('destroy');
//        }
//    });
//   
//    $('#newDialog').dialog('open');
	
	
};

var editFiSysInfo = function(){
	 var rows = $('#grid').datagrid('getSelections');
	    if(rows == null || rows.length != 1) {
	        ashow('请勾选要修改的一条数据！');
	        return;
	    }
	    newFiSysInfo(rows[0].id);
}

var unable = function(){
	var id = getGridCheckBoxValues("id");
	 if(!id) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要禁止吗？")) {
		 $('body').mask("禁止中...");
		 $.ajax({
				type : "POST",
				url : "FiSysInfo!unable.do",
				data : {id:id},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("禁止成功！");
						query();
					} else {
						alert("禁止失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("执行失败！");
				}
			});
	 }
};

var enable = function(){
	var id = getGridCheckBoxValues("id");
	 if(!id) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要启动吗？")) {
		 $('body').mask("启动中...");
		 $.ajax({
				type : "POST",
				url : "FiSysInfo!enable.do",
				data : {id:id},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("启动成功！");
						query();
					} else {
						alert("启动失败！");
					}
				},
				error : function(jqXHR, textStatus, errorThrown) {
					$('body').unmask();
					alert("启动失败！");
				}
			});
	 }
};

/**
 * 删除
 */
function del(){
	var id = getGridCheckBoxValues("id");
	 if(!id) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要删除吗？")) {
		 $('body').mask("删除中...");
		 $.ajax({
				type : "POST",
				url : "FiSysInfo!delete.do",
				data : {id:id},
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
					alert("删除失败！");
				}
			});
	 }
};

function AutoCheckAll(ele) {
	    var check=document.getElementsByName("id");
	    if(ele.checked){
	    for(i=0;i<check.length;i++){
	        check[i].checked=true;
	    }}else {
	        for (i = 0; i < check.length; i++) {
	            check[i].checked = false;
	        }
	    }


	}


/** 初始业务对象列表 **/
function initGrid() {
    $('#grid').datagrid({
        url: 'FiSysInfo!loadlist.do',
        toolbar: '#aa',
        columns: [[{
            field : 'ck',
            checkbox:true
        },
           
            {
                field: 'fiSysCode',
                title: '财务系统标识',
                width: 150,
                align: 'center',
            },
            {
                field: 'fiSysName',
                title: '财务系统名称',
                width: 150
            },
            {
                field: 'type',
                title: '业务类型',
                width: 150,
                formatter: function(v) {
                    return selectFormatter(v,vtype_ref);
                }
            },
            {
                field: 'webUrl',
                title: '财务系统webservice地址',
                width: 280
            },
            {
                field: 'bizSysCode',
                title: '业务系统标识',
                width: 150,
                halign: 'center'
            },
//            {
//                field: 'status',
//                title: '状态',
//                width: 150,
//                halign: 'center',
//                formatter: function(v) {
//                        return selectFormatter(v,status_ref);
//                }
//            },
            {
                field: 'id',
                title: '操作',
                width: 150,
                formatter : function(v,r){
                	return '<a href="javascript:void(0);" onclick="newFiSysInfo(\''+v+'\')">编辑</a>';
                }
            }
        ]],
//        onDblClickRow: function() {
//            mcDialogOpen();
//        },
        fit: true,
        border: false,
        pagination: true,
        pageSize:20,
        singleSelect: false,
        rownumber: true
    });

    var p = $('#grid').datagrid('getPager');
    $(p).pagination({
        beforePageText: '第',
        afterPageText: '共{pages}页',
        displayMsg: '显示{from}到{to},共{total}记录'
    });
}


function closeDialog(dialogId) {
    $('#' + dialogId).dialog('close');
}

function getGridCheckBoxValues(){
	
	var rows = $('#grid').datagrid('getSelections');
	 var cpList = [];
	 if(rows != null && rows){
		 for (var jj = 0,length = rows.length; jj < length; jj++) {
		      
		            cpList.push(rows[jj].id);
		      
		    }
	 }

	    var val_string = "";
	    if (cpList.length > 0) val_string = cpList.join(";");
	    
	    return val_string;
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


function clearParam(target){
	$(target).parent().remove();
	query();
}


function clearAllParam(){
	$("#selectedCond").html("");
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
	
	params.keyword = $('#keyword').val();
	 return params;
}

function selectFormatter(value,data){
	
	for(var i = 0, length = data.length;i<length;i++){
		if(value == data[i].key){
			return data[i].value;
		}
	}
   
        return '';
}

