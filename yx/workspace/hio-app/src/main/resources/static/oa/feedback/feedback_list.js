var rowData;//当前选中数据
var rowDataBefore;
$(function(){
	//数据权限按钮
	$.xljUtils.btnPowerOperation("OA",$.xljUtils.getUrlParam("btnMenuCode"));
    //页面加载完成之后执行
    pageInit();
	//input添加伪placeholder
	$("#Corname").inputPlaceholder();
    $.xljUtils.resizeNestedGrid();
	 $("#Corname").keypress(function(e){
	        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	        if (eCode == 13){
	     	   searchDate();
	        }
	 });
});  

/**
 * autoer:liuf
 * descirption:查询常用工具列表
 * param：null
 */
function pageInit(){
	getSettlementTradesData();
}
function searchDate(){
	var theme=$("#Corname").getInputVal();
 	jQuery("#list2").jqGrid("setGridParam",{postData:{theme:theme},page:1}).trigger("reloadGrid");
 	getSettlementTradesData();
}

function getSettlementTradesData(){
    jQuery("#list2").jqGrid(
            {
                url: serviceUrl+'oa/feedBack/getFeedBackPage',
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
                    {name : 'theme',label : '主题',align : "center",cellattr: addCellAttr},
            /*        {name : 'code',label : '编码',align : "center"},*/
                    {name : 'createPersonName',label : '创建人',align : "center"},
                    {name : 'createOrgName',label : '创建部门',align : "center"},
                    {name : 'createDate',label : '创建时间',align : "center"},
                    {name : 'content',label : '内容',align : "center"},
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
function deleteSettlementTrades(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
		if(!ids) {
			pop_tip_open("blue","请选择要删除的行！");
			return;
		}
		var prev=	$("#"+ids).prev().attr("id");
			  pop_text_open("blue",'确认要删除这条数据吗？',function(){
					$.ajax({
						url:serviceUrl+"oa/feedBack/deletePseudo/"+ids,
						type:'DELETE',
						dataType:'JSON',
						success:function (resultData ) {
							if (resultData&&resultData.success) {
								$('#list2').jqGrid().trigger("reloadGrid");
								rowData={id:prev};
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
 * descirption:跳转修改页面
 * param：null
 */
function toupdate(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要修改的行！");
		return;
	}
	window.open("feedback_edit.html?type=edit&id="+ids);
}
/**
 * autoer:liuf
 * descirption:跳转新增页面
 * param：null
 */
function toadd(){
	window.open("feedback_edit.html?type=add");
}
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}
function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowData={id:id};
	 $('#list2').jqGrid().trigger("reloadGrid");
}
