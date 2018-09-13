;;(function ($,window,document,undefined) {
	/**
	 * @author luorongxin
	 */
	var rowData;//当前选中数据
	var rowDataBefore;//上一次选中数据
	var openUrl="dataSync_edit.html";//编辑页

/**
 * 初始化
 */
$(function(){
	   //初始化查询条件
	    initSearchParam();
	    //加载grid
	    pageInit();
		//绑定事件
		bindButton();
	    //页面加载完毕后更改grid宽高
	    $.xljUtils.resizeNestedGrid();

	});
	/**
	 * 绑定按钮事件
     */
	function bindButton(){
		// 按钮事件绑定
		$("#updateBtn").on('click',function () {
			editDataSync();
		});
		//删除
		$("#delBtn").on('click',function () {
			delDataSync();
		});
		//新增
		$("#addBtn").on('click',function () {
			addDataSync();
		});
		//启用
		$("#actBtn").on('click',function () {
			changeState(true);
		});
		//禁用
		$("#disBtn").on('click',function () {
			changeState(false);
		});
		//查询
		$("#searchBtn").on('click',function () {
			searchDataSync();
		});
		//模糊查询按钮绑定回车键
		$(document).keydown(function(event){
			if(event.keyCode==13){
				$("#searchBtn").click();
			}
		});
        //同步数据
		$("#syncBtn").on('click',function () {
			syncData();
		});
		//同步记录
		$("#recordBtn").on('click',function () {
			dataRecord();
		});
		//禁用所有按钮的默认行为
//	    $('.btn').click(function() {
//	        return false;
//	    });
//	    //阻止默认行为
//	    $('.btn').click(function(e) {
//	        e.preventDefault();
//	    });
	}

	/**
	 * 同步数据
     */
	function syncData() {
		var idsVal = $('#list').jqGrid('getGridParam','selarrrow');
		if(idsVal&&idsVal!="") {
			if(idsVal.length>1) {
				$.xljUtils.tip("blue","只能选择一行数据进行编辑！");
				return;
			}else{
				var rowId=$('#list').jqGrid("getGridParam","selrow");
				rowData = $('#list').jqGrid('getRowData',rowId);
				if(rowData.status == false){
					$.xljUtils.tip("blue",rowData.system+(rowData.dataType=='user'?"用户数据":"组织机构数据")+"同步未开启！");
					return;
				}

				$.ajax({
					url:serviceUrl+"sys/sync/syncData/syncData/"+rowId,
					type:'POST',
					dataType:'JSON',
					contentType:'application/json',
					data:JSON.stringify(),
					success:function (xhr,textStatus ) {
						console.log(xhr);
						if (xhr){
							if(xhr.success) {
								$.xljUtils.tip("green",xhr.msg);
							}else{
								if(xhr.code=="50000"){
									$.xljUtils.tip("red",xhr.msg);
									return;
								}
								$.xljUtils.tip("red","数据同步失败！");
							}
						}else{
							$.xljUtils.tip("blue","网络繁忙，请稍后重试！");
						}

					},
					error: function(xhr, textStatus, errorThrown) {
						console.log(xhr);
						$.xljUtils.tip("blue","网络繁忙，请稍后重试！");
					}

				});

			}
		}else{
			$.xljUtils.tip("blue","请选择要操作的数据！");
		}
	}

	/**
	 * 同步记录
     */
	function dataRecord() {
		var idsVal = $('#list').jqGrid('getGridParam','selarrrow');
		if(idsVal&&idsVal!="") {
			if(idsVal.length>1) {
				$.xljUtils.tip("blue","只能选择一行数据进行编辑！");
				return;
			}else{
				var rowId=$('#list').jqGrid("getGridParam","selrow");
				rowData = $('#list').jqGrid('getRowData',rowId);
				window.open(openUrl+"?oper=edit&id="+rowId);
			}
		}else{
			$.xljUtils.tip("blue","请选择要操作的数据！");
		}
	}
    /**
 * 初始化 查询条件
 */
function initSearchParam(){
	$('#keywords').val('');
}
/**
 * 查询:
 */
function searchDataSync(){
	var keywords = $('#keywords').val();
	$("#list").jqGrid('setGridParam',{postData:{delflag:false,system:keywords,systemCode:keywords,'fuzzyQueryFields':JSON.stringify(['system','systemCode'])},page:1}).trigger('reloadGrid');
};

/**
 * 加载列表
 */
	function pageInit(){
	  jQuery("#list").jqGrid(
	      {
	        url : serviceUrl+'sys/sync/syncData/page',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            postData:{delflag:false,'sortFields':JSON.stringify({'createDate':'desc'})},
            contentType : "application/json",
            autowidth:true,
	        colNames : [ 'id','数据类型','系统名称','系统编码','同步接口','同步方式','每次同步条数', '同步状态','备注'],
	        colModel : [ 
	                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true},
						{name : 'dataType',label : '数据类型',editable:true,width : 60,sortable:false,hidden:false},
	                    {name : 'system',label : '系统名称',editable:true,width : 60,sortable:false,hidden:false,cellattr: addCellAttr},
	                    {name : 'systemCode',label : '系统编码',editable:true,width : 60,sortable:false,align:'center'},
		                {name : 'url',label : '同步接口',editable:true,width : 60,sortable:false,align:'center'},
		                {name : 'mode',label : '同步方式',editable:true,width : 60,sortable:false,align:'center',formatter: "select", editoptions:{value:"0:自动;1:手动;2:定时;"},
							formatter: function (v, opt, rec) { if (v == '0') return "自动";if (v == '1')  return "手动";if(v == '2')return "定时"},
							unformat: function (v) { if (v == '自动') return '0';if(v == '手动')return '1';return '2'; }},
		                {name : 'num',label : '每次同步条数',editable:true,width : 60,sortable:false,align:'center'},
		                {name : 'status',label : '状态',editable:true,width : 50,sortable:false,align:'center',formatter: "select", editoptions:{value:"false:禁用;true:启用;"},
							formatter: function (v, opt, rec) { if (v == true) return "启用";if (v == false)  return "禁用";},
							unformat: function (v) { if (v == '启用') return true;if(v == '禁用')return false; },cellattr: addCellAttr},
				    	{name : 'remark',label : '备注',editable:true,width : 60,sortable:false,align:'center'}
		                ],
	        multiselect : true,
	        multiboxonly:true,
            rownumbers:true,
	        jsonReader : {
    	        repeatitems : false
    	    },
    	    ondblClickRow:function(rowId){
    	    	//跳转编辑页
			     rowData = $('#list').jqGrid('getRowData',rowId);
			     window.open(openUrl+"?oper=edit&id="+rowId);
    	    	
            },
            onCellSelect: function(){
            	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            		//重新选择行时清除上一次选中行的样式
            		$('#list '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
            	}
            },
            onSelectRow: function () {
            	var rowId=$('#list').jqGrid("getGridParam","selrow");
    		      rowData = $('#list').jqGrid('getRowData',rowId);
            },
            gridComplete: function () {
            	$.xljUtils.addGridScroll();
            	rowDataBefore = rowData;
                if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                	//添加回显选中行样式
                	$('#list').setSelection(rowDataBefore.id,true);
                	$('#list '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                }
            },
            rowNum : 20,//一页显示多少条
            rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
            pager : '#Pager',//表格页脚的占位符(一般是div)的id
            viewrecords : true,
    	    loadError:function(xhr,status,error){
    	    	//异常处理
    	    	console.log(xhr.status);
    	    	if(xhr.status==404){
    	    		 $.xljUtils.tip("red","请求url有误！");
    	    		 return;
    	    	}
    	    	if(xhr.status==405){
    	    		$.xljUtils.tip("red","请求方法有误！");
   	    		 return;
    	    	}
    	    	$.xljUtils.tip("blue","网络繁忙，请稍后重试！");
    	    	
    	    	
    	    },
    	    loadComplete:function(xhr){
    	    	console.log(xhr);
    	    	if(!xhr.success){
    	    		switch (xhr.code) {
    				case "50000":
    					$.xljUtils.tip("red",xhr.msg);
    					break;
    				case "50001":
    					$.xljUtils.tip("red",xhr.msg);
    					break;
    				case "50002":
    					$.xljUtils.tip("blue",xhr.msg);
    					break;
    				case "50003":
    					$.xljUtils.tip("red",xhr.msg);
    					break;

    				default:
    					$.xljUtils.tip("red","查询数据失败！");
    					break;
    				}
   	    	   }else{
   	    		   //success
   	    	   }
    	    }
	      });
	}
	/**
	 * 改变行字段颜色
	 */
	function addCellAttr(rowId, val, rawObject, cm, rdata) {
        if(rawObject.status == false){
            return "style='color:red'";
        }
    }
	/**
	 * 新增
	 */
	function addDataSync(){
		window.open(openUrl+"?oper=add");
	}
	
	 
	 /**
	  * 编辑
	  * @param
	  */
	 function editDataSync(){
		 var idsVal = $('#list').jqGrid('getGridParam','selarrrow');
		 if(idsVal&&idsVal!="") {
			 if(idsVal.length>1) {
				 $.xljUtils.tip("blue","只能选择一行数据进行编辑！");
				 return;
		     }else{
		    	 var rowId=$('#list').jqGrid("getGridParam","selrow");
			     rowData = $('#list').jqGrid('getRowData',rowId);
			     window.open(openUrl+"?oper=edit&id="+rowId);
		     }
		 }else{
			 $.xljUtils.tip("blue","请选择要修改的数据！");
		 }	 
	 }
	 
	 
	 /**
	  * 状态修改
	  * @param n
	  */
	 function changeState(status){
		 var idsVal = $('#list').jqGrid('getGridParam','selarrrow');
		 if(idsVal&&idsVal!="") {
			 if(idsVal.length>1) {
				 $.xljUtils.tip("blue","只能选择一行数据进行状态更新！");
		         return;
		     }
			 var idVal = $('#list').jqGrid('getGridParam','selrow');
			 rowData = $('#list').jqGrid('getRowData',idVal);
			 //不进行同样状态的操作
			 if(status==false&&rowData.status==false){
				 $.xljUtils.tip("blue","该记录已禁用！");
				 return;
			 }
			 if(status==true&&rowData.status==true){
				 $.xljUtils.tip("blue","该记录已启用！");
				 return;
			 }
	         $.ajax({
	        	 url:serviceUrl+"sys/sync/syncData/update/"+idVal,
	        	 type:'PUT',
	        	 dataType:'JSON',
	        	 contentType:'application/json',
	        	 data:JSON.stringify({'id':idVal,'status':status}),
	        	 success:function (xhr,textStatus ) {
	        		 console.log(xhr);
	        		 if (xhr){
	        			 if(xhr.success) {
	        				 $.xljUtils.tip("green","状态修改成功！");
	        				 $('#list').jqGrid().trigger("reloadGrid");
		        		 }else{
		        			 if(xhr.code=="50000"){
		        				 $.xljUtils.tip("red",xhr.msg);
		        				 return;
		        			 }
		        			 $.xljUtils.tip("red","状态修改失败！");
		        		 }
	        		 }else{
	        			 $.xljUtils.tip("blue","网络繁忙，请稍后重试！");
	        		 }
	        		 
	        	 },
	          	 error: function(xhr, textStatus, errorThrown) {
	          		     console.log(xhr);
	              	     $.xljUtils.tip("blue","网络繁忙，请稍后重试！");
	              	}
	        	
	         });
	     }else{
	    	 $.xljUtils.tip("blue","请选择要操作的数据！");
	     }
	 }
	 /**
	  * 删除租户
	  */
	 function delDataSync(){
		 
		 var idsVal = $('#list').jqGrid('getGridParam','selarrrow');
		 if(idsVal&&idsVal!="") {
			 $.xljUtils.confirm("blue", "确认要删除这【" +idsVal.length + "】条数据吗？",function(){
				   $.ajax({
			        	 url:serviceUrl+"sys/sync/syncData/deletePseudoBatch/"+idsVal,
// 			        	 url:serviceUrl+"/sys/tend/syncData/deleteBatch/"+idsVal,
			        	 type:'DELETE',
			        	 dataType:'JSON',
			        	 contentType:'application/json',
			        	 data:JSON.stringify({}),
			        	 success:function (xhr,textStatus ) {
			        		 console.log(xhr);
			        		 if (xhr){
			        			 if(xhr.success) {
			        				 $.xljUtils.tip("green","数据删除成功！");
			        				 $('#list').jqGrid().trigger("reloadGrid");
				        		 }else{
				        			 if(xhr.code=="50000"){
				        				 $.xljUtils.tip("red",xhr.msg);
				        				 return;
				        			 }
				        			 $.xljUtils.tip("red","数据删除失败！");
				        		 }
			        		 }else{
			        			 $.xljUtils.tip("blue","网络繁忙，请稍后重试！");
			        		 }
			        	 },
			          	 error: function(xhr, textStatus, errorThrown) {
			              	   console.log(xhr);
			              		 $.xljUtils.tip("blue","网络繁忙，请稍后重试！");
			              	}
			         });
			   },true);
	     }else{
	    	 $.xljUtils.tip("blue","请选择要删除的数据！");
	     }
	  }
	 
	 window.reloadGrid =  function(){
//		 $.xljUtils.tip("green","数据操作成功！");
		 $('#list').jqGrid().trigger("reloadGrid");
	 }
})(jQuery,window,document);