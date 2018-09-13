var query = function(){
	$('#grid').datagrid('options').queryParams = getQueryParams();
	$('#grid').datagrid('reload');
};

var newBusinessObject = function(id){
	
	dialoginit({
        self: '#newDialog',
        iframe:contextPath+'/BusinessObject!edit.do'+(id != null ? '?id='+id : '') ,
        size:'max',
        modal: true,
        title: '业务对象编辑',
        onClose: function() {
            $(this).dialog('destroy');
        }
    });
   
    $('#newDialog').dialog('open');
  
};

var editBusinessObject = function(){
	 var rows = $('#grid').datagrid('getSelections');
	    if(rows == null || rows.length != 1) {
	        ashow('请勾选要修改的一条数据！');
	        return;
	    }
	    newBusinessObject(rows[0].id);
}

var unable = function(){
	var id = getGridCheckBoxValues();
	 if(!id) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要禁止吗？")) {
		 $('body').mask("禁止中...");
		 $.ajax({
				type : "POST",
				url : "BusinessObject!unable.do",
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
	var id = getGridCheckBoxValues();
	 if(!id) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要启动吗？")) {
		 $('body').mask("启动中...");
		 $.ajax({
				type : "POST",
				url : "BusinessObject!enable.do",
				data : {id:id},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("启动成功！");
						query(0);
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

var del = function(){
	var id = getGridCheckBoxValues();
	 if(!id) {
		 alert("请选择一条记录进行操作！");
		 return;
	 }
	 if(window.confirm("确认要删除吗？")) {
		 $('body').mask("删除中...");
		 $.ajax({
				type : "POST",
				url : "BusinessObject!delete.do",
				data : {id:id},
				dataType : "json",
				success : function(data, textStatus, jqXHR) {
					$('body').unmask();
					if (data && data.success) {
						alert("删除成功！");
						query(0);
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

$(function(){
	
	initGrid();	
});



/** 初始业务对象列表 **/
function initGrid() {

    $('#grid').datagrid({
        url: 'BusinessObject!loadlist.do',
        toolbar: '#aa',
        columns: [[{
            field : 'ck',
            checkbox:true
            },
            {
                field: 'vsyscode',
                title: '所属系统',
                width: 100,
                align: 'center',
                formatter : function(v){
                	return selectFormatter(v,vsyscode_ref);
                }
            },
            {
                field: 'vobject',
                title: '业务对象',
                width: 150,
                align: 'center'
            },
            {
                field: 'vtype',
                title: '业务类型',
                width: 150,
                formatter: function(value,row,index){
    				if (value == "1"){
    					return "基本档案";
    				} else {
    					return "业务表单";
    				}
    			}

            },
            {
                field: 'vfetchdataclass',
                title: '获取数据接口',
                width: 150
            },
            {
                field: 'vrewriteclass',
                title: '回写接口',
                width: 150,
                halign: 'center'
            },
            {
                field: 'status',
                title: '状态',
                width: 150,
                halign: 'center',
                formatter: function(v) {
                	return selectFormatter(v,status_ref);
                }
            },
            {
                field: 'id',
                title: '操作',
                width: 150,
                formatter : function(v,r){
                	return '<a href="javascript:void(0);" onclick="newBusinessObject(\''+v+'\')">编辑</a>';
                }
            }
        ]],
        onDblClickRow: function() {
            mcDialogOpen();
        },
        fit: true,
        border: false,
        pagination: true,
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
			 //alert($(inputs[i]).attr("name"));
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
