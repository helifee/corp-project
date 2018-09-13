var rowData;//当前选中数据
var rowDataBefore;
$(function(){
    //页面加载完成之后执行
    pageInit();
    $.xljUtils.resizeNestedGrid();
});  

/**
 * autoer:liuf
 * descirption:查询常用工具列表
 * param：null
 */
function pageInit(){
	getCommonToolsData();
}
function getCommonToolsData(){
    jQuery("#list2").jqGrid(
            {
                url: serviceUrl+'oa/sys/sysCommonTools/page',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                //multiboxonly:true,
               // multiselect:true,
                autowidth:true,
                rownumbers:true,
                jsonReader : {
                           repeatitems: false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {name : 'name',label : '工具名称',align : "center"},
                    {name : 'code',label : '编码',align : "center"},
                    {name : 'pic',label : '图标',align : "center",formatter:function(pic){
                    	if(pic){
                    		return '<img src="data:image/jpeg;base64,'+pic+'" style="width:30px;height:30px">';
                    	}else{
                    		return "";
                    	}
                    }},
                    {name : 'sort',label : '序号',align : "center"},
                    {name : 'url',label : '地址',align : "center"}
                ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
                pager : '#pager2',//表格页脚的占位符(一般是div)的id
                ondblClickRow:function(rowid){
                	window.open("commonTools_edit.html?type=edit&id="+rowid);
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
function deleteCommon(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
		if(!ids) {
			pop_tip_open("blue","请选择要删除的行！");
			return;
		}
		var prvid=$("#"+ids).prev().attr("id");
			  pop_text_open("blue",'确认要删除这条数据吗？',function(){
					$.ajax({
						url:serviceUrl+"oa/sys/sysCommonTools/deletePseudo/"+ids,
						type:'DELETE',
						dataType:'JSON',
						success:function (resultData ) {
							if (resultData&&resultData.success) {
								rowData={id:prvid};
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
 * descirption:排序
 * param：e(上移1 下移2 )
 */
function updateSort(e){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要排序的行！");
		return;
	}
	if(ids){
		var sortType="";
		if(e=="1"){
			sortType="1";
		}else if(e=="2"){
			sortType="2";
		}
		$.ajax({
			url:serviceUrl+"oa/sys/sysCommonTools/updateSort/"+ids,
			type:'put',
			dataType:'JSON',
			contentType:"application/json",
			data:'{"sortType":'+sortType+'}',
			success:function (resultData ) {
				if (resultData&&resultData.success) {
					$('#list2').jqGrid().trigger("reloadGrid");
					pop_tip_open("green","排序成功！");
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
	window.open("commonTools_edit.html?type=edit&id="+ids);
}
/**
 * autoer:liuf
 * descirption:跳转新增页面
 * param：null
 */
function toadd(){
	window.open("commonTools_edit.html?type=add");
}
function showPortal(){
	window.open("commonTools_portal.html");
}
function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	jQuery("#list2").jqGrid("setGridParam",{postData:{id:id}}).trigger("reloadGrid");
}