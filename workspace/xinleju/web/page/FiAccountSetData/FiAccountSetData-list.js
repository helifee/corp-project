var global={};
//账套Id
global.accountSetId='';
global.saveOrUpdateUrl="";
global.sysId='';


//公司对照
function saveCrop(){
	$("#asId").val(global.accountSetId);
	$("#sysId").val(global.sysId);
	$('#frm3').form("submit",{
		url:"FiAccountSetData!saveFiAccountSetData.do",
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
	        	$("#editDialog3").dialog("close");
	        	$('#grid').datagrid("reload");
	        }else{
	        	alert(data.msg);
	        }
	    }
	});	
}

/**
 * 查询
 */
function query(){
	var title = $("#title").val();
	$('#grid').datagrid('options').queryParams = {keyword:title};
	
	$('#grid').datagrid('reload');
};


$(function(){
	/*$('#frm_fiAccountSetData_vtype').combobox({    
	    data:vtype_ref,    
	    valueField:'key',    
	    textField:'value'   
	});*/
	
	//选择的系统不同必填不同
	/*$("#checkSys").find("input").click(function(){
		var value=$(this).val();
		changeUnitProject(value);
	}).click();*/
	if(global.sysId == 1 || global.sysId == 2){
		initCoAnSadGrid();
	}else{
		initExGrid();
	}
	
	
	dialoginit({
        self: '#deptDialog',
        width: 450,
        height: 500,
    });
});
/**
 * 根据选择的系统，选择项目分期还是付款单位
 * @param value
 */
function changeUnitProject(value){
	$("#projectBranch,#fundUnit").show();
	if(value=="1" || value=="2"){
		$("#fundUnit").hide();
	}else{
		$("#projectBranch").hide();
	}
}

function save(){
	$('#frm2').form("submit",{
		url:"FiAccountSetData!saveFiAccountSetData.do",
		ajax:true,
	    success:function(data){
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
function newFiAccountSetData(id){
	$('#frm2').form("reset");
	//$.ajaxSetup({async:false});
	if(id){
		$.post("FiAccountSetData!getFiAccountSetDataById.do?id="+id,{},function(data){
			
			$("#frm3").form("load",{
				"fiAccountSetData.accountSetId":data.accountSetId,
				"fiAccountSetData.companyName":data.companyName,
				"fiAccountSetData.sysId":data.sysId,
				"fiAccountSetData.projectId":data.projectId,
				"fiAccountSetData.projectCode":data.projectCode,
				"fiAccountSetData.projectBrachId":data.projectBrachId,
				"fiAccountSetData.projectName":data.projectName,
				"fiAccountSetData.paymentOrganId":data.paymentOrganId,
				"fiAccountSetData.paymentOrganCode":data.paymentOrganCode,
				"fiAccountSetData.paymentOrganName":data.paymentOrganName,
				"fiAccountSetData.id":data.id,
				"fiAccountSetData.status":data.status
			});
		});
	}
	//changeUnitProject($("#checkSys").find("input:checked").val());
	$("#editDialog3").dialog("open");
	
//	var cp;
//	if(contextPath.length==1){
//		cp = ""
//	}else{
//		cp=contextPath;
//	}
//	dialoginit({
//        self: '#newDialog',
//        iframe:cp+'/FiAccountSetData!edit.do'+(id != null ? '?id='+id : '?act=create') ,
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

function newCorp(id) {
	
	$('#frm3').form("reset");
	if(id){
		$.post("FiAccountSetData!getFiAccountSetDataById?id="+id,{},function(data){
			$("#frm3").form("load",{
				"fiAccountSetData.companyName":data.companyName,
				"fiAccountSetData.projectName":data.projectName,
				"fiAccountSetData.projectCode":data.projectCode,
				"fiAccountSet.companyCode":data.companyCode,
				"fiAccountSet.id":data.id,
				"fiAccountSetData.paymentOrganName":data.paymentOrganName,
				"fiAccountSetData.paymentOrganCode":data.paymentOrganCode,
				"fiAccountSetData.sysId":data.sysId,
				"fiAccountSetData.companyId":data.companyId,
			});
		});
	}

	if(global.sysId == 1 || global.sysId == 2){
		$("#pbanch1").show();
		$("#pbanch2").show();
		$("#payUnit1").hide();
		$("#payUnit2").hide();
		
	}else{
		$("#pbanch1").hide();
		$("#pbanch2").hide();
		$("#payUnit1").show();
		$("#payUnit2").show();
	}
	$('#editDialog3').dialog('open');

};

var editAccountSetData = function(){
	 var rows = $('#grid').datagrid('getSelections');
	    if(rows == null || rows.length != 1) {
	        ashow('请勾选要修改的一条数据！');
	        return;
	    }
	    newFiAccountSetData(rows[0].id);
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
				url : "FiAccountSetData!unable.do",
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
				url : "FiAccountSetData!enable.do",
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
				url : "FiAccountSetData!delete.do",
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


/** 初始成本和销售业务对象列表 **/
function initCoAnSadGrid() {
	$('#grid').datagrid({
    	url: 'FiAccountSetData!loadlist.do?setId='+global.accountSetId+'&sysId='+global.sysId,
        toolbar: '#tb_grid',
        columns: [[{
            field : 'ck',
            checkbox:true
            },
            {
                field: 'companyName',
                title: '公司',
                width: 300,
                align: 'center'
            },
            {
                field: 'projectName',
                title: '项目分期',
                width: 350,
                align: 'center'
            }
       
        ]],
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

/** 初始费用业务对象列表 **/
function initExGrid(){
	$('#grid').datagrid({
    	url: 'FiAccountSetData!loadlist.do?setId='+global.accountSetId+'&sysId='+global.sysId,
        toolbar: '#tb_grid',
        columns: [[{
            field : 'ck',
            checkbox:true
            },
            {
                field: 'companyName',
                title: '公司',
                width: 300,
                align: 'center'
            },
            {
                field: 'paymentOrganName',
                title: '付款单位（公司法人）',
                width: 350,
                align: 'center'
            }
       
        ]],
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

/**
 * 项目分期改变之后
 * @param item
 */
function changeProjectBranch(item){
	var $t=$(item);
	var projectBranch;
	for(var i=0;i<projectBranchs.length;++i){
		var pb=projectBranchs[i];
		if(pb.name==$t.val()){
			projectBranch=pb;
			break;
		}
	}
	console.log(projectBranch);
	if(projectBranch){
		$("#projectId").val(projectBranch.pid);
		$("#projectCode").val(projectBranch.code);
		$("#projectBranchId").val(projectBranch.id);
	}
}


//以下是处理公司选择和付款单位选择

/**
 * 付款单位参照.
 * @param e 参照传过来的.
 */
var payunitindex = ""; //下标，否则双击事件不好用.
function payunitDialogOpen(e){
	payunitindex = $(e.delegateTarget).closest(".datagrid-row").attr("datagrid-row-index"); //获取下标.
	var url="FiAccountSetData!payUnit.do?corpid=";
    dialoginit({
        self: '#deptDialog',
        title:"选择付款单位",
        iframe:url,
        buttons: [
                  {
                      text: '确定',
                      handler: function () {
                    	  payunitDialogOpenDBClick(e);
                      }
                  },
                  {
                      text: '关闭',
                      handler: function () {
                          $('#deptDialog').dialog('close');
                      }
                  }
              ],
		    left : 450,
			top : 30+$('#firstunitid').offset().top
    });
    $('#deptDialog').dialog('open');
}

//点击打开付款单位窗口
function firstunitpDialogOpen(name,id,toppx){
	if($('#companyId').val()){
	if(name=='firstunit'){
		url="FiAccountSetData!payUnit.do?companyId="+$('#companyId').val();
	}
    dialoginit({
        self: '#deptDialog',
        title:"选择付款单位",
        iframe:url,
        buttons: [
                  {
                      text: '确定',
                      handler: function () {
                    	  firstunitpDialogOpenDBClick(name,id);
                      }
                  },
                  {
                      text: '关闭',
                      handler: function () {
                          $('#deptDialog').dialog('close');
                      }
                  }
              ],
              left : 150,
      		  top : 30+$('#'+id).offset().top              
    });
    $('#deptDialog').dialog('open');
	}else{
		alert("请选择公司");
	}
}

var jfUnitname = ""; var jfUnitId = "";
function firstunitpDialogOpenDBClick(name,id){
	  var deptData = $("#iframedialogdeptDialog")[0].contentWindow.getData();
	  $('#'+name).textbox('setValue',deptData.name);
	  $('#'+id).val(deptData.id);
	  
	  if(name=='firstunit'){
		  jfUnitname = deptData.name;
		  jfUnitId = deptData.id;
	  }
	  
	  //加载项目分期
	  if(global.sysId == 1 || global.sysId == 2){
		  $('#pbanch').combobox({    
			    url:'FiAccountSetData!findProjectBanchByCompanyId.do?companyId='+deptData.id,    
			    valueField:'id',    
			    textField:'name',
			    onSelect:function(record){
			        $('#pbanchName').val(record.name);
			    }    
		  }); 
		  
		 
	  }
	  
	  
	  
	  
      $('#deptDialog').dialog('close');
   
      if(name == "firstunit") { 
    	  $("#firstparty").val(deptData.name); 
      } 
	
}

//点击打开公司窗口
function companyDialogOpen(name,id,toppx){
	
	var url_="FiAccountSetData!companys.do";

    dialoginit({
        self: '#deptDialog',
        title:"选择公司",
        iframe:url_,
        buttons: [
                  {
                      text: '确定',
                      handler: function () {
                    	  firstunitpDialogOpenDBClick(name,id);
                      }
                  },
                  {
                      text: '关闭',
                      handler: function () {
                          $('#deptDialog').dialog('close');
                      }
                  }
              ],
              left : 150,
      		  top : 30+$('#'+id).offset().top              
    });
    $('#deptDialog').dialog('open');
}
