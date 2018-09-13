var rowData;//当前选中数据
var rowDataBefore;
$(function(){
    //页面加载完成之后执行
    pageInit();

    $.xljUtils.resizeNestedGrid();
    $("#Corname").inputPlaceholder();
	 $("#Corname").keypress(function(e){
	        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	        if (eCode == 13){
	     	   searchDate();
	        }
	 });
	  $("#status").on("change",function(){
		  searchDate();
	  })
});  

/**
 * autoer:liuf
 * descirption:查询常用工具列表
 * param：null
 */
function pageInit(){
	getuserConfigData();
}
function searchDate(){
	var name=$("#Corname").getInputVal();
	var status=$("#status option:selected").val();
 	jQuery("#list2").jqGrid("setGridParam",{postData:{name:name,status:status}}).trigger("reloadGrid");
 	getuserConfigData();
}

function getuserConfigData(){
    jQuery("#list2").jqGrid(
            {
                url: serviceUrl+'sys/party/userConfig/getUserConfigPage',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                autowidth:true,
                rownumbers:true,
                postData:{name:"",status:""},
                jsonReader : {
                           repeatitems: false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {name : 'appName',label : '应用名称',align : "center"},
                    {name : 'realName',label : '用户名',align : "center",cellattr: addCellAttr},
                    {name : 'token',label : 'token',align : "center"},
                    {name : 'status',label : '状态',align : "center",formatter:function(status){
                    	if(status=="0"){
                    		return "禁用";
                    	}else if(status=="1"){
                    		return "启用";
                    	}else{
                    		return "";
                    	}
                    },cellattr: addCellAttr},
                    {name : 'startTime',label : 'token生效时间',align : "center"},
                    {name : 'endTime',label : 'token失效时间',align : "center"},
                    {name : 'remark',label : '备注',align : "center"}
                ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
                pager : '#pager2',//表格页脚的占位符(一般是div)的id
                ondblClickRow:function(rowid){
                	toupdate();
                },
                onCellSelect: function(){
                	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#list2'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                onSelectRow: function () {
                	var rowId=$('#list2').jqGrid("getGridParam","selrow");
        		      rowData = $('#list2').jqGrid('getRowData',rowId);
                },
                viewrecords : true,
                loadError:function(jqXHR, textStatus, errorThrown){
             	   $.xljUtils.getError(jqXHR.status);
                },
                gridComplete:function(){
                	 $.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
					rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#list2').setSelection(rowDataBefore.id,true);
                    	$('#list2'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                 }
            });

}
/**
 * autoer:liuf
 * descirption:删除常用工具
 * param：null
 */
function todelete(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
		if(!ids) {
			pop_tip_open("blue","请选择要删除的行！");
			return;
		}
			  pop_text_open("blue",'确认要删除这条数据吗？',function(){
					$.ajax({
						url:serviceUrl+"sys/party/userConfig/deletePseudo/"+ids,
						type:'DELETE',
						dataType:'JSON',
						success:function (resultData ) {
							if (resultData&&resultData.success) {
								$('#list2').jqGrid().trigger("reloadGrid");
								pop_tip_open("green","删除成功！");
							}else{
								pop_tip_open("red",resultData.msg);
							}
						},
						error: function (jqXHR, textStatus, errorThrown) {
							$.xljUtils.getError(jqXHR.status);
				        }
					});
			  },function(){
				  return;
			  });	
	}

/**
 * autoer:liuf
 * descirption:修改状态
 * param：null
 */
function  updateStatus(e){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要修改状态的行");
		return;
	}
	var rowData = $("#list2").jqGrid("getRowData",ids);
	var  dataStatus="";
	if(rowData.status=="启用"){
		dataStatus=1;
	}else if(rowData.status=="禁用"){
		dataStatus=0;
	}
	if(e==dataStatus){
		return;
	}else{
	$.ajax({
		url:serviceUrl+"sys/party/userConfig/updateStatus/"+ids,
		type:'PUT',
		dataType:'JSON',
		success:function (resultData ) {
			if (resultData&&resultData.success) {
				pop_tip_open("green","修改状态成功！");
				 $('#list2').jqGrid().trigger("reloadGrid");
			}else{
				pop_tip_open("red",resultData.msg);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
	}
}
/**
 * autoer:liuf
 * descirption:跳转修改页面
 * param：null
 */
function toupdate(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要修改的行！");
		return;
	}
	window.open("userConfig_edit.html?type=edit&id="+ids);
}

function toupdateList(){
	window.open("userConfig_edit.html?type=editList");	
}
/**
 * autoer:liuf
 * descirption:跳转新增页面
 * param：null
 */
function toadd(){
	window.open("userConfig_edit.html?type=add");
}
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}
function reloadGrid(){
	 pop_tip_open("green","数据操作成功！");
	 $('#list2').jqGrid().trigger("reloadGrid");
}
