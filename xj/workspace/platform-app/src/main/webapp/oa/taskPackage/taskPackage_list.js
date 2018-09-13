
var rowData;//当前选中数据
var rowDataBefore;
$(function(){
	var menuArray = getOperationAuthorition();
	if ($.inArray("addBtn", menuArray) > -1) {
		$('#addBtn').show();
	}
	if ($.inArray("updateBtn", menuArray) > -1) {
		$('#updateBtn').show();
	}
	if ($.inArray("publishBtn", menuArray) > -1) {
		$('#publishBtn').show();
	}
	if ($.inArray("reminderBtn", menuArray) > -1) {
		$('#reminderBtn').show();
	}
	if ($.inArray("moreBtn", menuArray) > -1 && menuArray.length >= 6) {
		$('#moreBtn').show();
	} else if ($.inArray("moreBtn", menuArray) > -1 && menuArray.length <= 5) {
		$('.my-btn-group').append('<button  class="btn btn-sm" type="button"  onclick="deltaskPackage()">删除</button>');
	}
	//页面加载完成之后执行
	pageInit();
	$.xljUtils.resizeNestedGrid();
	$("#theme").inputPlaceholder();
	$("#theme").keypress(function (e) {
		var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if (eCode == 13) {
			searchData();
		}
	});
	$('#startDate').on('click', function () {
		WdatePicker({
			el: this,
			dateFmt: "yyyy-MM-dd",
			errDealMode: -1
		});
	});
	$('#startDate').siblings('.input-group-addon').on('click', function () {
		WdatePicker({
			el: $(this).siblings(':input')[0],
			dateFmt: "yyyy-MM-dd",
			errDealMode: -1
		});
	});

	$('#endDate').on('click', function () {
		var minDate = $('#startDate').val();
		WdatePicker({
			el: this,
			dateFmt: "yyyy-MM-dd",
			errDealMode: -1,
			minDate: minDate
		});
	});
	$('#endDate').siblings('.input-group-addon').on('click', function () {
		var minDate = $('#startDate').val();
		WdatePicker({
			el: $(this).siblings(':input')[0],
			dateFmt: "yyyy-MM-dd",
			errDealMode: -1,
			minDate: minDate
		});
	});

});  

/**
 * autoer:liuf
 * descirption:查询常用工具列表
 * param：null
 */
function pageInit(){
	getTaskPackageData();
	
}
function searchData(){
	var title=$("#theme").getInputVal();
	var startTime=$("#startDate").val();
	var endTime=$("#endDate").val();
 	jQuery("#list2").jqGrid("setGridParam",{postData:{title:title,startTime:startTime,endTime:endTime},page:1}).trigger("reloadGrid");
 	getTaskPackageData();
}
function getTaskPackageData(){
    jQuery("#list2").jqGrid(
             {
                url: hostUrl+'oa/taskPackage/getTaskPackagePage',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                autowidth:true,
                rownumbers:true,
                jsonReader : {
                           repeatitems: false
                },
                postData:{title:"",startTime:"",endTime:''},
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
	                {name : 'title',label : '任务包主题',align : "center"},
	                {name : 'status',label : '状态',align : "center",formatter:function(status){
                    	if(status=="1"){
                    		return "草稿";
                    	}else if(status=="2"){
                    		return "已发布";
                    	}else if(status=="3"){
                    		return "停用";
                    	}else if(status=="4"){
                    		return "汇报完成";
                    	}
                    }},
                    {name : 'totalCount',label : '总任务数',align : "center"},
                    {name : 'completeCount',label : '已完成任务数',align : "center"},
                    {name : 'unCompleteCount',label : '未完成任务数',align : "center"},
                    {name : 'publishUser',label : '发布人',align : "center"},
                    {name : 'percent',label : '完成率',align : "center",formatter:function(cellvalue, options, rowObject){
						return rowObject.completeCount+'/'+rowObject.totalCount;
					}},
                    {name : 'publishDate',label : '发布时间',align : "center" ,formatter:function(publishDate){
                        if(publishDate){
							if(publishDate.indexOf(".")!=-1){
								return	publishDate.substring(0,publishDate.indexOf("."));
							}
                        	return	publishDate;
                        }else{
                        	return "";
                        }
                    }}
                ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
                pager : '#pager2',//表格页脚的占位符(一般是div)的id
                ondblClickRow:function(rowid){
                	var data= $('#list2').jqGrid('getRowData',rowid);
                     if(data.status=="草稿"){
                    	 toUpdate();
                     }else{
                    	 toView();
                     }
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
                	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
                	 $.xljUtils.addGridScroll();
					$.xljUtils.gridResizeFn();
					rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#list2').setSelection(rowDataBefore.id,true);
                    	$('#list2'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                 },
				 loadComplete:function (xhr) {
					 console.info(xhr);
				 }
            });

}

function toAdd(){
	window.open("taskPackage_edit.html?type=add");
}
function toUpdate(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	var data= $('#list2').jqGrid('getRowData',ids);
	if(!ids) {
		pop_tip_open("blue","请选择修改的行");
		return;
	}
    if(data.status=="草稿"){
   	 window.open("taskPackage_edit.html?type=edit&id="+ids);
    }else{
    	pop_tip_open("blue","只允许草稿的进行修改");	
    }
}
function reloadGrid(){
	 pop_tip_open("green","数据操作成功！");
	 $('#list2').jqGrid().trigger("reloadGrid");
}
function deltaskPackage(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var prvid=$("#"+ids).prev().attr("id");
	var delrowData = $('#list2').jqGrid('getRowData',ids);
	var status=delrowData.status;
	if(status=="已发布"){
		pop_tip_open("blue","已发布的任务不允许删除！");
		return;
	}
		  pop_text_open("blue",'确认要删除这条数据吗？',function(){
				$.ajax({
					url:hostUrl+"oa/taskPackage/deletePseudo/"+ids,
					type:'DELETE',
					dataType:'JSON',
					success:function (resultData ) {
						if (resultData&&resultData.success) {
							pop_tip_open("green","删除成功！");
							rowData={id:prvid};
							$('#list2').jqGrid().trigger("reloadGrid");
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

function  publishMessage(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要发布的行！");
		return;
	}
/*	var delrowData = $('#list2').jqGrid('getRowData',ids);
	var status=delrowData.status;
	if(status!="草稿"){
		pop_tip_open("blue","只允许草稿的数据进行发布！");
		return;
	}*/
	$.ajax({
		url:hostUrl+"oa/taskPackage/publishMessage/"+ids,
		type:'PUT',
		dataType:'JSON',
		success:function (resultData ) {
			if (resultData&&resultData.success) {
				pop_tip_open("green","发布成功！");
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

function updateStatus(options){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		if(options=="0"){
			pop_tip_open("blue","请选择要关闭的任务！");
			return;
		}else if(options=="1"){
			pop_tip_open("blue","请选择要启用的任务！");
			return;
			
		}
	}
	var delrowData = $('#list2').jqGrid('getRowData',ids);
	var status=delrowData.status;
	if(status=="停用"){
		if(options=="0"){
			return;
		}
	}else if(status=="草稿"){
		pop_tip_open("blue","草稿的任务不允许启用关闭！");
		return;
	}else{
		if(options=="1"){
			return;
		}
	}
	var data={status:options,taskPackageId:ids}
	$.ajax({
		url:hostUrl+"oa/taskPackage/updateStatus",
		type:'PUT',
	    contentType : "application/json", 
		dataType:'JSON',
		data:JSON.stringify(data),
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
function reminder(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var delrowData = $('#list2').jqGrid('getRowData',ids);
	var status=delrowData.status;
	if(status!="已发布"){
		pop_tip_open("blue","只允许已发布的数据进行催办！");
		return;
	}
	$.ajax({
		url:hostUrl+"oa/taskPackage/reminder/"+ids,
		type:'post',
		dataType:'JSON',
		success:function (resultData ) {
			if (resultData&&resultData.success) {
				pop_tip_open("green","催办成功！");
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
function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowData = {id:id}
	 $('#list2').jqGrid().trigger("reloadGrid");
}
function toView(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	window.open("taskPackage_view.html?id="+ids);
}

/**
 * 获取按钮权限
 */
function getOperationAuthorition() {
	var menuList;
	$.ajax({
		type: 'GET',
		url: hostUrl + 'sys/authentication/getUserAuthenticationOperation?t_='+new Date().getTime()+'&appCode=OA&menuCode=rwbgl',
		dataType: 'json',
		//contentType: 'application/json',
		async: false,
		//data: JSON.stringify(postdata),
		success: function (data) {
			if (data.success) {
				menuList =  data.result;

			} else {
				$.xljUtils.tip('red', '获取按钮权限失败！');
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			$.xljUtils.tip('red', '获取按钮权限失败！');
		}
	});
	return menuList;
}