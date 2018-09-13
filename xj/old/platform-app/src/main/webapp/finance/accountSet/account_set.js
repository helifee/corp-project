var rowData;//当前选中数据
var rowDataBefore;
var appCode ;
var registerId;
$(function(){
	appCode = $.xljUtils.getUrlParam('app_code');
	getFinanceSystem();
	$.xljUtils.resizeNestedGrid();
});

/**
 * @auther liuf
 * @discution grid show
 */
function getFinanceSystemList(){
	registerId = $('#selectFinanceSystem').val();
//	$('#registerId').val(registerId);
	
	jQuery("#systemGrid").jqGrid(
            {
                url: hostUrl+'finance/accountSet/getSystemRegisterpage',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                autowidth:true,
                rownumbers:true,
                multiselect:true,
                postData:{registerId:registerId,appCode:appCode},
                jsonReader : {
                    repeatitems: false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                             {name : 'id',label : 'id',hidden:true,align : "center"},
                             {name : 'name',label : '帐套名称',align : "center"},
                             {name : 'code',label : '帐套编码',align : "center"},
                             {name : 'companyName',label : '公司名称',align : "center"},
                             {name : 'companyCode',label : '公司编码',align : "center"},
                         ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
                pager : '#systemGridPage',//表格页脚的占位符(一般是div)的id
                
                onCellSelect: function(){
                	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#systemGrid'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                onSelectRow: function () {
                	var rowId=$('#systemGrid').jqGrid("getGridParam","selrow");
        		      rowData = $('#systemGrid').jqGrid('getRowData',rowId);
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
                    	$('#systemGrid').setSelection(rowDataBefore.id,true);
                    	$('#systemGrid'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                 }
            });
}

/**
 * author:liuf
 * describe:查询所有财务系统数据 
 * param:null
 */
function getFinanceSystem(){
	var updatedata ={
			status : 1,
			delflag:0
		};
	$.ajax({
        type:'post',
        url:hostUrl+'finance/sysRegister/queryList',
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(updatedata),
        async: false,
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 var company=data.result;
        			 for(var o in company){
        				 $("#selectFinanceSystem").append("<option value='"+company[o].id+"'>"+company[o].fiSysName+"</option>")
        			 }
        		 }
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	}) 
	$("#selectFinanceSystem option:first").prop("selected", 'selected');
	getFinanceSystemList();
}
function searchData(){
	registerId = $('#selectFinanceSystem').val();
	jQuery("#systemGrid").jqGrid("setGridParam",{postData:{registerId:registerId,appCode:appCode}}).trigger("reloadGrid");
	getFinanceSystemList();	
}

function reloadGrid(id){
	var my = this;
	if(null!=id&&""!=id){
		rowData = {id:id};
	}
	$('#systemGrid').jqGrid().trigger("reloadGrid");
}

function addAccountSet(){
//	$("#accountId").val("");
//	$("#add").modal("show");
	window.open("accountset_edit.html?registerId="+registerId+"&app_code="+appCode);
}

function editAccountSet(){
	var id=$('#systemGrid').jqGrid('getGridParam','selrow');
	if(!id) {
		pop_tip_open("blue","请选择要编辑的行！");
		return;
	}
	window.open("accountset_edit.html?id="+id+"&app_code="+appCode);
	 /*$("#add").modal("show");
		$.ajax({
	        type:'get',
	        url:hostUrl+'finance/accountSet/get/'+id+'?time='+Math.random(),
	        success: function(data){
	        	if(data.success){
	        	     var result=data.result;
	        	     $("input[name='registerId']").val(result.registerId);
	        	     $("input[name='id']").val(result.id);
	        	     $("input[name='name']").val(result.name);
	        	     $("input[name='code']").val(result.code);
	        	     $("input[name='companyName']").val(result.companyName);
	        	     $("input[name='companyCode']").val(result.companyCode);
	        	}
	        }
		});*/
}

function delAccountSet(){
	var ids=$('#systemGrid').jqGrid('getGridParam','selarrrow');
	if(!ids || ids.length==0) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var prevId = $("#systemGrid #" + ids).prev()[0].id;
	  pop_text_open("blue",'确认要删除这这'+ids.length+'条数据吗？',function(){
			$.ajax({
				url:hostUrl+"finance/accountSet/deletePseudoBatch/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						pop_tip_open("green","删除成功！");
						rowData = $("#systemGrid").jqGrid("getRowData",prevId);
						$('#systemGrid').jqGrid().trigger("reloadGrid");
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