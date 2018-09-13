/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _billList = {
    	ns : "_billList",
    	dataPar:{
    		rowData:null,
    		rowDataBefore:null
    	},
    	/**
    	 * 加载页面数据
    	 */
    	loadPageData:function(){
    		var my = this;
    		jQuery("#list2").jqGrid({
    	        url: serviceUrl+'sys/num/bill/page',
    	        ajaxGridOptions: { contentType: 'application/json' },
    	        mtype : "POST",  
    	        contentType : "application/json",  
    	        datatype : "json",
    	        postData:{code:"",name:"",connector:""},
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
    	            {name : 'connector',label : '连接符',align : "center"},
    	            {name : 'status',label : '状态',align : "center",formatter:function(status){
    	            	if(status=="0"){
    	            		return "禁用";
    	            	}else if(status=="1"){
    	            		return "启用";
    	            	}else{
    	            		return "";
    	            	}
    	            },cellattr: my.addCellAttr},
    	            {name : 'remark',label : '备注',align : "center"}
    	        ],
    	        rowNum : 20,//一页显示多少条
    	        rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
    	        pager : '#pager2',//表格页脚的占位符(一般是div)的id
    	        ondblClickRow:function(rowid){
    	        	window.open("bill_edit.html?id="+rowid);
    	        },
    	        onSelectRow: function (rowid) {
        		    my.dataPar.rowData = $('#list2').jqGrid('getRowData',rowid);
                },
    	        onCellSelect: function(){
                	if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#list2 '+'#'+my.dataPar.rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                gridComplete: function () {
                	$.xljUtils.addGridScroll();
                	my.dataPar.rowDataBefore = my.dataPar.rowData;
                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#list2').setSelection(my.dataPar.rowDataBefore.id,true);
                    	$('#list2 '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
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
    	toAddBill:function(){
    		window.open("bill_edit.html");
    	},
    	/**
    	 * 规则变量维护页面
    	 */
    	toAddVariable:function(){
    		var ids=$('#list2').jqGrid('getGridParam','selarrrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择规则类型行");
    			return;
    		}
    		if(ids.length>1){
    			pop_tip_open("blue","请选择一行！");
    			return;
    		}
    		window.open("bill_variable.html?id="+ids);
    	},
    	/**
    	 * open维护页面
    	 */
    	toUpdateBill:function(){
    		var ids=$('#list2').jqGrid('getGridParam','selarrrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要修改的规则类型行");
    			return;
    		}
    		if(ids.length>1){
    			pop_tip_open("blue","请选择一行！");
    			return;
    		}
    		this.dataPar.rowData = $('#list2').jqGrid('getRowData',ids);
    		window.open("bill_edit.html?id="+ids);
    	},
    	/**
    	 * 修改状态
    	 */
    	updateStatus:function(e){
    		var ids=$('#list2').jqGrid('getGridParam','selarrrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要修改状态的行！");
    			return;
    		}
    		if(ids.length>1){
    			pop_tip_open("blue","请选择一行！");
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
    			this.dataPar.rowData = $('#list2').jqGrid('getRowData',ids);
	    		$.ajax({
	    			url:serviceUrl+"sys/num/bill/updateStatus/"+ids,
	    			type:'PUT',
	    			dataType:'JSON',
	    			success:function (resultData ) {
	    				if (resultData&&resultData.success) {
	    					pop_tip_open("green","修改状态成功！");
	    					$('#list2').jqGrid().trigger("reloadGrid");
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
    	deleteBill:function(){
    		var my = this;
    		var ids=$('#list2').jqGrid('getGridParam','selarrrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要删除规则类型的行！");
    			return;
    		}
    		var prevId = $("#list2 #" + ids).prev()[0].id;
    		pop_text_open("blue",'确认要删除这'+ids.length+'条数据吗？',function(){
	    		$.ajax({
	    			url:serviceUrl+"sys/num/bill/deletePseudoBatch/"+ids,
	    			type:'DELETE',
	    			dataType:'JSON',
	    			success:function (resultData ) {
	    				if (resultData&&resultData.success) {
	    					pop_tip_open("green","删除数据成功！");
	    					my.dataPar.rowData = $("#list2").jqGrid("getRowData",prevId);
	    					$('#list2').jqGrid().trigger("reloadGrid");
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
    	reloadGrid:function(id){
    		var my = this;
    		if(null!=id&&""!=id){
    			my.dataPar.rowData = {id:id};
    		}
    		$('#list2').jqGrid().trigger("reloadGrid");
    	},
    	/**
    	 * 装载过滤查询的条件
    	 */
    	searchDate:function(){
    		var corname=$("#corname").val();
    	 	jQuery("#list2").jqGrid("setGridParam",{postData:{code:corname,name:corname,connector:corname},page:1}).trigger("reloadGrid");
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
    	bindSearchDate:function(){
    		var my = this;
    		$("#corname").keyup(function(event){
    			if(event.keyCode ==13){
    				my.searchDate();
    			}
    		});
    	},
    	/**
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		//支持回车事件
    		this.bindSearchDate();
    		//初始化数据
    		this.loadPageData();
    		//页面加载完毕后更改grid宽高
    	    $.xljUtils.resizeNestedGrid();
    	}
    };
    $(_billList.pageInit());
    window[_billList.ns] = _billList;
})(window,document);