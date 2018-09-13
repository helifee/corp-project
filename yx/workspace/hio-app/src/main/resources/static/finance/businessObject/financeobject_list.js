/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _gridList = {
    	ns : "_gridList",
    	dataPar:{
    		rowData:null,
    		rowDataBefore:null
    	},
    	/**
    	 * 加载页面数据
    	 */
    	loadPageData:function(){
    		var my = this;
    		jQuery("#gridList").jqGrid({
    	        url: serviceUrl+'finance/businessObject/page',
    	        ajaxGridOptions: { contentType: 'application/json' },
    	        mtype : "POST",  
    	        contentType : "application/json",  
    	        datatype : "json",
    	        postData:{},
    	        autowidth:true,
    	        multiselect:true,
    	        autowidth:true,
    	        rownumbers:true,
    	        jsonReader : {
    	            repeatitems : false  
    	        },
    	        colModel : [
    	            {name : 'id',label : 'id',hidden:true,align : "center"},
    	            {name : 'code',label : '编号',align : "center"},
    	            {name : 'name',label : '名称',align : "center",cellattr: my.addCellAttr},
    	            {name : 'appCode',label : '所属系统',align : "center",formatter:"select",
		            	editoptions:{value:"SA:销售系统;CO:成本系统;EX:费用系统"}
    	            },
    	            {name : 'type',label : '业务类型',align : "center",formatter:"select",
			            	editoptions:{value:"1:基本档案;2:业务表单"}
    	            },
    	            {name : 'fetchClass',label : '数据获取接口类',align : "center"},
    	            {name : 'fetchMethod',label : '数据获取接口方法',align : "center"},
    	            {name : 'callbackClass',label : '数据回调接口类',align : "center"},
    	            {name : 'callbackMethod',label : '数据回调接口方法',align : "center"},
    	            {name : 'status',label : '状态',align : "center",formatter:function(status){
    	            	if(status=="0"){
    	            		return "禁用";
    	            	}else if(status=="1"){
    	            		return "启用";
    	            	}else{
    	            		return "";
    	            	}
    	            },cellattr: my.addCellAttr},
    	            {name : 'remark',label : '描述',align : "center"}
    	        ],
    	        rowNum : 20,//一页显示多少条
    	        rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
    	        pager : '#gridPager',//表格页脚的占位符(一般是div)的id
    	        ondblClickRow:function(rowid){
    	        	window.open("financeobject_edit.html?id="+rowid);
    	        },
    	        onSelectRow: function (rowid) {
        		    my.dataPar.rowData = $('#gridList').jqGrid('getRowData',rowid);
                },
    	        onCellSelect: function(){
                	if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#gridList '+'#'+my.dataPar.rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                gridComplete: function () {
                	$.xljUtils.addGridScroll();
                	my.dataPar.rowDataBefore = my.dataPar.rowData;
                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#gridList').setSelection(my.dataPar.rowDataBefore.id,true);
                    	$('#gridList '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                },
    	        viewrecords : true,
                loadError:function(xhr,status,error){
                	//异常处理
        	    	if(xhr.status==404){
        	    		 pop_tip_open("red","请求url有误！");
        	    		 return;
        	    	}
        	    	if(xhr.status==405){
        	    		pop_tip_open("red","请求方法有误！");
        	    		 return;
        	    	}
        	    	pop_tip_open("red","网络异常,请联系管理员！");
         	    },
         	    loadComplete:function(xhr){
        	    	if(!xhr.success){
        	    		if(xhr.code=="50000"||xhr.code=="50001"||xhr.code=="50003"){
        	    			pop_tip_open("red",xhr.msg);
        	    			return;
        	    		}
        	    		if(xhr.code=="50002"){
        	    			pop_tip_open("blue",xhr.msg);
        	    			return;
        	    		}
        	    		 pop_tip_open("red","查询数据失败！");
        	    	}else{
        	    		//success
        	    	}
         	    }
    	        
    	    });
    	},
    	/**
    	 * open维护页面
    	 */
    	toAddData:function(){
    		window.open("financeobject_edit.html");
    	},
    	/**
    	 * open维护页面
    	 */
    	toUpdateData:function(){
    		var ids=$('#gridList').jqGrid('getGridParam','selarrrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要修改的业务对象行");
    			return;
    		}
    		if(ids.length>1){
    			pop_tip_open("blue","请选择一行！");
    			return;
    		}
    		this.dataPar.rowData = $('#gridList').jqGrid('getRowData',ids);
    		window.open("financeobject_edit.html?id="+ids);
    	},
    	/**
    	 * 修改状态
    	 */
    	updateStatus:function(e){
    		var ids=$('#gridList').jqGrid('getGridParam','selarrrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要修改状态的行！");
    			return;
    		}
    		if(ids.length>1){
    			pop_tip_open("blue","请选择一行！");
    			return;
    		}
    		var rowData = $("#gridList").jqGrid("getRowData",ids);
    		var  dataStatus="";
    		if(rowData.status=="启用"){
    			dataStatus=1;
    		}else if(rowData.status=="禁用"){
    			dataStatus=0;
    		}
    		if(e==dataStatus){
    			return;
    		}else{
    			this.dataPar.rowData = $('#gridList').jqGrid('getRowData',ids);
	    		$.ajax({
	    			url:serviceUrl+"/finance/businessObject/updateStatus/"+ids,
	    			type:'PUT',
	    			dataType:'JSON',
	    			success:function (resultData ) {
	    				if (resultData&&resultData.success) {
	    					pop_tip_open("green","修改状态成功！");
	    					$('#gridList').jqGrid().trigger("reloadGrid");
	    				}else{
	    					pop_tip_open("red","修改状态失败！");
	    				}
	    			},
		          	error: function(xhr, textStatus, errorThrown) {
	          	      pop_tip_open("red","服务异常,请联系管理员！");
	              	}
	    		});
    		}
    	},
    	/**
    	 * 删除数据
    	 */
    	deleteData:function(){
    		var my = this;
    		var ids=$('#gridList').jqGrid('getGridParam','selarrrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要删除业务对象的行！");
    			return;
    		}
    		var prevId = $("#gridList #" + ids).prev()[0].id;
    		pop_text_open("blue",'确认要删除这'+ids.length+'条数据吗？',function(){
	    		$.ajax({
	    			url:serviceUrl+"/finance/businessObject/deletePseudoBatch/"+ids,
	    			type:'DELETE',
	    			dataType:'JSON',
	    			success:function (resultData ) {
	    				if (resultData&&resultData.success) {
	    					pop_tip_open("green","删除数据成功！");
	    					my.dataPar.rowData = $("#gridList").jqGrid("getRowData",prevId);
	    					$('#gridList').jqGrid().trigger("reloadGrid");
	    				}else{
	    					pop_tip_open("red","删除数据失败！");
	    				}
	    			},
		          	error: function(xhr, textStatus, errorThrown) {
	          	      pop_tip_open("red","服务异常,请联系管理员！");
	              	}
	    		});
    		},function(){});
    	},
    	/**
    	 * 刷新grid
    	 */
    	reloadGrid:function(id){
    		var my = this;
    		if(null!=id&&""!=id){
    			my.dataPar.rowData = {id:id};
    		}
    		$('#gridList').jqGrid().trigger("reloadGrid");
    	},
    	/**
    	 * 装载过滤查询的条件
    	 */
    	searchData:function(){
    		var corname=$("#corname").val();
    		var appSystem=$("#appSystem").val();
    		var businessStatus=$("#businessStatus").val();
    		var businessType=$("#businessType").val();
    	 	jQuery("#gridList").jqGrid("setGridParam",{postData:{code:corname,name:corname,appCode:appSystem,status:businessStatus,type:businessType},page:1}).trigger("reloadGrid");
    	},
    	/**
    	 * 渲染grid数据样式
    	 */
    	addCellAttr:function (rowId, val, rowObject, cm, rdata) {
    	    if(rowObject.status == "0" ){
    	        return "style='color:red'";
    	    }
    	},
    	/**
    	 * 模糊查询支持回车事件
    	 */
    	bindSearchData:function(){
    		var my = this;
    		$("#corname").keyup(function(event){
    			if(event.keyCode ==13){
    				my.searchData();
    			}
    		});
    	},
    	/**
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		//支持回车事件
    		this.bindSearchData();
    		//初始化数据
    		this.loadPageData();
    		//页面加载完毕后更改grid宽高
    	    $.xljUtils.resizeNestedGrid();
    	}
    };
    $(_gridList.pageInit());
    window[_gridList.ns] = _gridList;
})(window,document);