var rowDataCurr;//当前选中数据
var rowDataBefore;
$(function(){
	//数据权限按钮
	$.xljUtils.btnPowerOperation("OA",$.xljUtils.getUrlParam("btnMenuCode"));

	jQuery('#allListRowgrid').jqGrid({
	      url: serviceUrl + "oa/meeting/meetingSummary/page"+"?time="+Math.random(),
	      ajaxGridOptions: { 
	      	contentType: 'application/json'
	      },
	      mtype : "POST",
	      contentType : "application/json",
	      datatype : "json",
	      jsonReader : {
	    	  repeatitems:false
	      },
	      autowidth:true,
	      colModel:[
	          {name:'id',label:'id', index:'id', align:"center", width:55,hidden:true},
	          {name:'flowStatus',label:'flowStatus', index:'code', align:"center", width:55,hidden:true},
	          {name : 'instanceId',label : 'instanceId',hidden:true,align : "center"},
	          {name:'mtTitle',label:'会议主题',index:'mtTitle',align:"center",  width:100},
	          {name:'createPersonName',label:'创建人',index:'createPersonName', align:"center", width:100},
	          {name:'meetingType',label:'会议类别',index:'meetingType',align:"center",  width:100},
	          {name:'recorderName',label:'记录人员',index:'recorderName',align:"center",  width:100},
	          {name:'status',label:'执行状态',index:'status', align:"center", width:90, formatter: function(val) {
	        	  if(val == 0) {
	        		  return '草稿';
	        	  }else if(val == 1) {
	        		  return '审批中';
	        	  }else if(val == 10) {
	        		  return '完成纪要';
	        	  }
	          }}
	      ],
	      rowNum : 20,//一页显示多少条
	      rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
	      pager : 'allListPagered',//表格页脚的占位符(一般是div)的id
	      rownumbers:true,
	      viewrecords : true,
	      multiboxonly : true,
	      multiselect: true,
	      loadError:function (xhr,status,error) {
	          $.xljUtils.tip('red',"数据加载失败！");
	      },
	      ondblClickRow:function(rowid){
	    	var rowData = $("#allListRowgrid").jqGrid('getRowData',rowid);
	      	
	      	if(rowData.status == '草稿'){
				window.open("meetingSummary_edit.html?act=update&id="+rowid+"&update="+true);
			}else {
				window.open("meetingSummary_view.html?act=view&id=" + rowid + "&update=" + false);
				/*if (rowData.instanceId == "") {
					window.open("meetingSummary_view.html?act=view&id=" + rowid + "&update=" + false);
				} else {
					var pcUrl = "/platform-app/meeting/meetingSummary/meetingSummary_flow.html?businessId=" + rowid;
					window.open("/platform-app/flow/runtime/approve/flow.html?instanceId=" + rowData.instanceId + "&requestSource=start&businessId=" + rowData.id + "&pcUrl=" + pcUrl + "&time=" + Math.random());
				}*/
			}
	      },
	      onCellSelect: function(rowid,iCol,cellcontent,e) {
	    	  if(rowDataBefore!=null&&rowDataBefore!='undefined'){
	        		//重新选择行时清除上一次选中行的样式
	        		$('#allListRowgrid'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
	          }
	      },
	      onSelectRow: function () {
		       	var rowId=$('#allListRowgrid').jqGrid("getGridParam","selrow");
		       	rowDataCurr = $('#allListRowgrid').jqGrid('getRowData',rowId);
	        },
          pager : '#allListPagered',
          loadError:function(jqXHR, textStatus, errorThrown){
     	    $.xljUtils.getError(jqXHR.status);
          },
          gridComplete:function(){
   		   $(".ui-widget-content .ui-state-default").css({"margin-top":"8px"});
        	   $.xljUtils.addGridScroll();
   		   $.xljUtils.gridResizeFn();
             var arrdata=jQuery("#allListRowgrid").jqGrid('getRowData');   
             for(var o in arrdata){
            	 if(arrdata[o].expanded=="false"){
            		 $("#"+arrdata[o].id).hide();
            	 }
             }
             rowDataBefore = rowDataCurr;
             if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            	 //添加回显选中行样式
            	 $('#allListRowgrid').setSelection(rowDataBefore.id,true);
            	 $("#"+rowDataBefore.id).addClass("ui-state-highlight"); 
             }
           }
	  });
	
	$.xljUtils.resizeNestedGrid();
	
	$("#corname").inputPlaceholder();
	/**
	 * 条件查询
	 * add by  Huwl
	 */
	$('.btn-query').click(function() {
		query();
	});
	
	$('.meeting-status').change(function() {
		query();
	});
	

	/**
	 * 添加会议
	 * add by  Huwl
	 */
	$(".addMeeting").click(function() {
		 window.open('meetingSummary_edit.html?act=create');
	});
	
	/**
	 * 删除会议纪要
	 * add by  Huwl
	 */
	$(".deleteMeeting").click(function() {
		//定义选中的最小的编号
		var prev;
		var gridObj = jQuery("#allListRowgrid");
	    var gr = gridObj.jqGrid('getGridParam', 'selarrrow');
	    var flag = 0;
	    if(!gr||gr.length !=0){
			$.each(gr,function(n,value) { 
				if(n == 0){
					prev=	$("#"+value).prev().attr("id");
				}
				var rowData = gridObj.jqGrid("getRowData",value);
				if(rowData.status != '草稿'){
					flag = 1;
		            return;
				}
			});
		}
	    
	    if(flag == 1){
	    	$.xljUtils.tip('blue',"要删除的会议中不全是草稿状态，不能删除！");
	    	return
	    }
	    var tipText = "确定要删除这" + gr.length + "条数据吗？";

        if (gr == "" || gr == null) {
            $.xljUtils.tip("blue", "请选择要删除的行！");
        } else {
            $.xljUtils.confirm("blue", tipText, function () {
                if (gr && gr != '') {
                    $.ajax({
                        url: serviceUrl + "oa/meeting/meetingSummary/deleteBatch/" + gr.join(','),
                        type: 'DELETE',
                        dataType: 'JSON',
                        success: function (resultData) {
                            if (resultData && resultData.success) {
                            	rowDataCurr={id:prev};
                        		$('#allListRowgrid').jqGrid().trigger("reloadGrid");
                        		pop_tip_open("green","删除成功");
                            } else {
                                $.xljUtils.tip('red', resultData.msg);
                            }
                        }
                    });
                }
            }, true);
        }
	});
	/**
	 * 编辑会议
	 * add by  Huwl
	 */
	$(".updateMeeting").click(function() {
		
		var gridObj = jQuery("#allListRowgrid");
		
		
		var idsAll = gridObj.jqGrid("getGridParam", "selarrrow");
		if(!idsAll||idsAll.length >1){
			$.xljUtils.tip('blue',"请选择一行记录进行修改！");
            return;
		}
		var ids=gridObj.jqGrid('getGridParam','selrow');
		if(ids == null){
			$.xljUtils.tip("blue", "请选择要修改的会议！");
			return;
		}
		//获取要修改这条会议的状态，如果会议状态为审批中，则会议信息不能修改
		var rowData = gridObj.jqGrid("getRowData",ids);
		if(rowData.status != '草稿'){
			$.xljUtils.tip('blue',"该会议状态不是草稿，不能进行修改！");
            return;
		}
		if (ids != null) {
			window.open("meetingSummary_edit.html?act=update&id="+ids+"&update="+true);
		}else{
			 $.xljUtils.tip("blue", "请选择要修改的会议！");
		}
	});
	
	/**
	 * 拷贝录入
	 */
	$(".copyInputMeeting").click(function() {
		var gridObj = jQuery("#allListRowgrid");
		var ids=gridObj.jqGrid('getGridParam','selrow');
		if (ids != null) {
			var newId;
			$.ajax({
			 	type: 'get',
			 	url: serviceUrl+"sys/uuid/generator/getGuuid?time=" + Math.random(),
				async: false,
			    success: function (data) {
			     newId = data.result;
			 	}
			 });

			$.ajax({
				type: 'POST',
				url: serviceUrl + 'oa/meeting/meeting/attachment/save',
				contentType: "application/json",
				dataType:'json',
				data:JSON.stringify({appId: '1',businessId: ids,categoryId: '1',newBusinessId:newId}),
				success: function (data) {
					window.open("meetingSummary_edit.html?act=copy&update=copy&id="+ids+"&newId="+newId);
				}
			});
		}else{
			 $.xljUtils.tip("blue", "请选择要拷贝的会议！");
		}
	});
	
	//支持回车事件
	bindSearchDate();
});


/**
 * 模糊查询支持回车事件
 */
function bindSearchDate(){
	$("#corname").keyup(function(event){
		if(event.keyCode ==13){
			query();
		}
	});
	
}


//搜索查询方法
function query() {
	/*var mtTitle = $('.meeting-title').val();
	var meetingType = $('.meeting-title').val();*/
	
	var mtTitle = $("#corname").getInputVal();
	var meetingType = $("#corname").getInputVal();
	var queryData = {
		meetingType:meetingType,
		mtTitle: mtTitle
	};
	$('#allListRowgrid').jqGrid('setGridParam',{ 
		postData: queryData ,
		page:1,
		ajaxGridOptions: {
			dataFilter: function(data) {
				/*if(status == 3) {
					data = JSON.parse(data);
					var res = data.result.list;
					for(var i=0;i<res.length;i++) {
						if(res[i].status == 4) {
							res.splice(i, 1);
						} 
					}
					data.result.list = res;
					
					data = JSON.stringify(data);
				}*/
				
				return data;
			}
		}
	}).trigger('reloadGrid');
}


/**
 * 初始化附件id
 * appid:1是的代表知识管理类型
 * categoryId:1是的代表知识管理类型
 * appid:-1代表新闻管理
 */
function initFile(contentRowTypeId){
	 $('#loadFile').xljAttachment({
		 appId:'1',
		 businessId:contentRowTypeId,
		 categoryId:'1',
		fileUploaded: function(fileInfo) {
			saveAttachement();
			 $.xljUtils.tip('green',"会议纪要上传成功！");
		}
	});
}

//保存会议纪要
function saveAttachement(){
	$('#loadFile').xljAttachmentSubmit(function(isSuccess, obj){
		if (isSuccess) {
			if (obj.success === true) {
				$.xljUtils.tip('blue', '附件信息提交成功');
			} else {
				$.xljUtils.tip('blue', obj.msg);
			}
			window.location.reload();
			//window.close();
		} else {
			$.xljUtils.getError(obj);
		}
	});
}

//选择界面的icon
function formatZTreeData(arr) {
	$.each(arr, function(index, value){
		value.iconSkin = 'diy-group';
	});
	return arr;
};

//查看审批流程
function trackFlow(){
	var id=$('#allListRowgrid').jqGrid('getGridParam','selrow');
	if(id){
		var row = $('#allListRowgrid').jqGrid('getRowData',id);
		if(row.status=='草稿'){
			pop_tip_open("blue","草稿状态没有审批流程");
		}else{
			if(row.instanceId == ""){
				pop_tip_open("blue","当前会议纪要没有审批流程");
				return;
			}
			var pcUrl = "/platform-app/meeting/meetingSummary/meetingSummary_flow.html?businessId="+id;
			window.open("/platform-app/flow/runtime/approve/flow.html?instanceId="+row.instanceId+"&requestSource=start&businessId="+row.id+"&pcUrl="+pcUrl+"&time="+Math.random());
		}
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}


function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowDataCurr={id:id};
	 $('#allListRowgrid').jqGrid().trigger("reloadGrid");
}


function flowCallBack(){
	 pop_tip_open("green","数据操作成功！");
	 $('#allListRowgrid').jqGrid().trigger("reloadGrid");
}
