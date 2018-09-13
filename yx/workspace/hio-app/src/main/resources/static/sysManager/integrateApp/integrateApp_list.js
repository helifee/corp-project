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
 })

});  

function pageInit(){
	getIntegrateData();//加载主表数据
	    
}


/**
 * author:liuf
 * describe:装载过滤查询的条件
 * param:null
 */
function searchDate(){
	var name=$("#Corname").getInputVal();
 	jQuery("#list2").jqGrid("setGridParam",{postData:{name:name},page:1}).trigger("reloadGrid");
 	getIntegrateData();
}
/**
 * author:liuf
 * describe:查询列表主表数据 
 * param:name,companyname,provincename
 */



function getIntegrateData(){
    jQuery("#list2").jqGrid(
            {

                url:serviceUrl+'sys/party/integrateApp/page',

                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                postData:{name:""},
                autowidth:true,
                rownumbers:true,
                jsonReader : {
                	  repeatitems: false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {name : 'name',label : '应用名称',align : "center"},
                    {name : 'code',label : '应用编码',align : "center"},
                    {name : 'secret',label : '密钥凭证',align : "center"},
                    {name : 'addr',label : 'ip/域名',align : "center"},
                    {name : 'dcount',label : '日允许访问量',align : "center"}
                ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50,100,200 ],//可供用户选择一页显示多少条
                pager : '#pager2',//表格页脚的占位符(一般是div)的id
                ondblClickRow:function(rowid){
                	window.open("integrateApp_edit.html?type=edit&id="+rowid);
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
					 $.xljUtils.resizeNestedGrid();
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
 * author:liuf
 * describe:删除供方信息 （包含子表） 伪删除 
 * param:null
 */
function todelete(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var next=$("#"+ids).next().attr("id");
	  pop_text_open("blue",'确认要删除这条数据吗？',function(){
			$.ajax({

				url:serviceUrl+"sys/party/integrateApp/deletePseudo/"+ids,

				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						/*userOnId=next;*/
						$('#list2').jqGrid().trigger("reloadGrid");
						pop_tip_open("green","删除成功！");
						//$('#list3').clearGridData();
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
 * author:liuf
 * describe:跳转供方信息修改
 * param:null
 */
function toupdate(){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择修改的行");
		return;
	}
	
	window.open("integrateApp_edit.html?type=edit&id="+ids);
}
/**
 * author:liuf
 * describe:跳转供方信息新增
 * param:null
 */
function toadd(){
	window.open("integrateApp_edit.html?type=add");
}
function reloadGrid(){
	 pop_tip_open("green","数据操作成功！");
	 $('#list2').jqGrid().trigger("reloadGrid");
}
//grid 自适应宽度
$(window).resize(function(){
	$.xljUtils.gridResizeFn();
});
