var rowData;//当前选中数据
var rowDataBefore;
var appCode ;
$(function(){
	//appCode = $.xljUtils.getUrlParam('app_code');
	getBusinessObject();
	$.xljUtils.resizeNestedGrid();
});

/**
 * @auther liuf
 * @discution grid show
 */
function getBusinessObject(){
	$.ajax({
          type:'POST',
          url:serviceUrl+'finance/businessObject/queryList'+'?time='+Math.random(),
          dataType:'json',
          contentType:'application/json',
          async:false,
          data:JSON.stringify({"delflag":"0","status":"1","type":"2","appCode":appCode}),//appCode 系统value
          success: function(json) {
        	  if(json.success){
        		  data=json.result;
        		  for (var o in data){
					  $("#selectBusinssObject").append("<option value='"+data[o].id+"'>"+data[o].name+"</option>"); 
					  //$("#bizObjectId").append("<option value='"+data[o].id+"'>"+data[o].name+"</option>");  
        		  }
        	  }else{
        		//pop_tip_open("red","获取上级数据失败！");
        	  }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
          pop_tip_open("red","服务异常,请联系管理员！");
        }
      });
	$("#selectBusinssObject option:first").prop("selected", 'selected');
	getFormSettingList();
}

function getFormSettingList(){
	var bizObjectId = $('#selectBusinssObject').val();
	jQuery("#formSettingGrid").jqGrid(
            {
                url: serviceUrl+'finance/voucherFormSetting/getFormSettingPage',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                autowidth:true,
                rownumbers:true,
                //multiselect:true,
                postData:{bizObjectId:bizObjectId},
                jsonReader : {
                    repeatitems: false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                             {name : 'id',label : 'id',hidden:true,align : "center"},
                             {name : 'name',label : '名称',align : "center"},
                             {name : 'urlType',label : '编码',align : "center"},
                             {name : 'url',label : '单据地址url',align : "center"},
                         ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
                pager : '#formSettingGridPage',//表格页脚的占位符(一般是div)的id
                ondblClickRow:function(rowid){
                	editFormSetting(rowid);
                },
                onCellSelect: function(){
                	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#formSettingGrid'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                onSelectRow: function () {
                	var rowId=$('#formSettingGrid').jqGrid("getGridParam","selrow");
        		      rowData = $('#formSettingGrid').jqGrid('getRowData',rowId);
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
                    	$('#formSettingGrid').setSelection(rowDataBefore.id,true);
                    	$('#formSettingGrid'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                 }
            });
}

function searchData(){
	var bizObjectId = $('#selectBusinssObject').val();
	jQuery("#formSettingGrid").jqGrid("setGridParam",{postData:{bizObjectId:bizObjectId}}).trigger("reloadGrid");
}


function addFormSetting(){
	/*$("#settingId").val("");
	$("#add").modal("show");*/
	window.open("formsetting_edit.html");
}
function editFormSetting(rowid){
	if(""==rowid||null==rowid){
		rowid=$('#formSettingGrid').jqGrid('getGridParam','selrow');
	}
	if(!rowid) {
		pop_tip_open("blue","请选择要编辑的行！");
		return;
	}
	window.open("formsetting_edit.html?id="+rowid);
	 /*$("#add").modal("show");
		$.ajax({
	        type:'get',
	        url:serviceUrl+'finance/voucherFormSetting/get/'+id+'?time='+Math.random(),
	        success: function(data){
	        	if(data.success){
	        	     var result=data.result;
	        	     $("input[name='bizObjectId']").val(result.bizObjectId);
	        	     $("input[name='id']").val(result.id);
	        	     $("input[name='name']").val(result.name);
	        	     $("input[name='urlType']").val(result.urlType);
	        	     $("input[name='url']").val(result.url);
	        	}
	        }
		});*/
}

function delFormSetting(){
	var ids=$('#formSettingGrid').jqGrid('getGridParam','selrow');
	if(!ids) {
		pop_tip_open("blue","请选择修改的行");
		return;
	}
	var prvid=$("#"+ids).prev().attr("id");
	  pop_text_open("blue",'确认要删除这1条数据吗？',function(){
			$.ajax({
				url:serviceUrl+"finance/voucherFormSetting/deletePseudo/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						 rowData = {id:prvid};
						$('#formSettingGrid').jqGrid().trigger("reloadGrid");
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

function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowData = {id:id}
	 $('#formSettingGrid').jqGrid().trigger("reloadGrid");
}