/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _phoneList = {
    	ns : "_phoneList",
    	dataPar:{
    		rowData:null,
    		rowDataBefore:null
    	},
    	/**
    	 * 加载页面数据
    	 */
    	loadPhonePageData:function(){
    		var my = this;
    		jQuery("#phonelist").jqGrid({
    			url: hostUrl+'sys/sysNoticePhoneServer/vaguePage',
    	        ajaxGridOptions: { contentType: 'application/json' },
    	        mtype : "POST",  
    	        contentType : "application/json",  
    	        datatype : "json",
    	        postData:{code:"",name:"",username:""},
    	        width:$('#div_phone').width(),
    	        //height:$(window).height() - 80 -105 ,
    	        //autowidth:true,
    	        //multiselect:true,
    	        rownumbers:true,
    	        jsonReader : {
    	            repeatitems : false  
    	        },
    	        colModel : [
    	            {name : 'id',label : 'id',hidden:true,align : "center"},
    	            {name : 'code',label : '编号',align : "center"},
    	            {name : 'name',label : '名称',align : "center",cellattr: my.addCellAttr},
    	            {name : 'host',label : 'web地址',align : "center"},
    	            {name : 'idNumber',label : '企业Id',align : "center"},
    	            {name : 'isDefault',label : '是否默认',align : "center",cellattr: my.addCellAttr,formatter:function(status){
    	            	if(status=="0"){
    	            		return "否";
    	            	}else if(status=="1"){
    	            		return "是";
    	            	}else{
    	            		return "";
    	            	}
    	            }},
    	            {name : 'username',label : '登陆用户',align : "center"},
    	            {name : 'password',label : '用户密码',align : "center"},
    	            {name : 'remark',label : '备注',align : "center"}
    	        ],
    	        rowNum : 20,//一页显示多少条
    	        rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
    	        pager : '#phonepager',//表格页脚的占位符(一般是div)的id
    	        ondblClickRow:function(rowid){
    	        	window.open("phone_edit.html?id="+rowid);
    	        },
    	        onSelectRow: function (rowid) {
        		    my.dataPar.rowData = $('#phonelist').jqGrid('getRowData',rowid);
                },
    	        onCellSelect: function(){
                	if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#phonelist '+'#'+my.dataPar.rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
                	}
                },
                gridComplete: function () {
                	$.xljUtils.addGridScroll();
                	my.dataPar.rowDataBefore = my.dataPar.rowData;
                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#phonelist').setSelection(my.dataPar.rowDataBefore.id,true);
                    	$('#phonelist '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
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
    	toAddPhone:function(){
    		window.open("phone_edit.html");
    	},
    	/**
    	 * 测试页面
    	 */
    	sendPhoneTest:function(){
    		var ids=$('#phonelist').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要测试的短信通道行");
    			return;
    		}
    		window.open("phone_test.html?id="+ids);
    	},
    	/**
    	 * open维护页面
    	 */
    	toUpdatePhone:function(){
    		var ids=$('#phonelist').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要修改的短信通道行");
    			return;
    		}
    		window.open("phone_edit.html?id="+ids);
    	},
    	/**
    	 * 设置默认
    	 */
    	updatePhoneStatus:function(){
    		var ids=$('#phonelist').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择设置默认的行！");
    			return;
    		}
    		var rowData = $("#phonelist").jqGrid("getRowData",ids);
    		if(rowData.isDefault=="是"){
    			return;
    		}else{
				this.dataPar.rowData = $('#phonelist').jqGrid('getRowData',ids);
	    		$.ajax({
	    			url:hostUrl+"sys/sysNoticePhoneServer/setDefault/"+ids,
	    			type:'PUT',
	    			dataType:'JSON',
	    			success:function (resultData ) {
	    				if (resultData&&resultData.success) {
	    					pop_tip_open("green","设置默认成功！");
	    					$('#phonelist').jqGrid().trigger("reloadGrid");
	    				}else{
	    					pop_tip_open("red","设置默认失败！");
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
    	deletePhone:function(){
    		var my = this;
    		var ids=$('#phonelist').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要删除短信通道的行！");
    			return;
    		}
    		var rowData = $('#phonelist').jqGrid('getRowData',ids);
    		if(rowData.isDefault=='是'){
    			pop_tip_open("blue","默认通道不能删除！");
    			return;
    		}
    		var prevId = $("#phonelist #" + ids).prev()[0].id;
    		pop_text_open("blue",'确认要删除这条数据吗？',function(){
	    		$.ajax({
	    			url:hostUrl+"sys/sysNoticePhoneServer/deletePseudoBatch/"+ids,
	    			type:'DELETE',
	    			dataType:'JSON',
	    			success:function (resultData ) {
	    				if (resultData&&resultData.success) {
	    					pop_tip_open("green","删除数据成功！");
	    					my.dataPar.rowData = $("#phonelist").jqGrid("getRowData",prevId);
	    					$('#phonelist').jqGrid().trigger("reloadGrid");
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
    	 * 刷新grid页面
    	 */
    	reloadPhneGrid:function(id){
    		var my = this;
    		if(null!=id&&""!=id){
    			my.dataPar.rowData = {id:id};
    		}
    		$('#phonelist').jqGrid().trigger("reloadGrid");
    	},
    	/**
    	 * 装载过滤短信服务查询的条件
    	 */
    	searchPhoneDate:function(){
    		var corname=$("#phoneCorname").val();
    	 	jQuery("#phonelist").jqGrid("setGridParam",{postData:{code:corname,name:corname,username:corname}}).trigger("reloadGrid");
    	},
    	/**
    	 * 渲染grid数据样式
    	 */
    	addCellAttr:function (rowId, val, rowObject, cm, rdata) {
    	    if(rowObject.isDefault == "1" ){
    	    	return "style='color:blue'";
    	       // return "style='background-color:red'";
    	    }
    	},
    	/**
    	 * 模糊查询支持回车事件
    	 */
    	bindSearchDate:function(){
    		var my = this;
    		$("#phoneCorname").keyup(function(event){
    			if(event.keyCode ==13){
    				my.searchPhoneDate();
    			}
    		});
    		$("#mailCorname").keyup(function(event){
    			if(event.keyCode ==13){
    				my.searchMailDate();
    			}
    		});
    	},
        /**
         * 初始化页面
         */
        pageInit: function() { // 页面初始化JS
        	//回车事件
        	this.bindSearchDate();
        	//加载phone
        	this.loadPhonePageData();
        	//页面加载完毕后更改grid宽高
        	//页面加载完毕后更改grid宽高
    	    $.xljUtils.resizeNestedGrid(60);
            $(window).on('resize', function () {
                $.xljUtils.resizeNestedGrid(60);
            });
        }
    };
    $(_phoneList.pageInit());
    window[_phoneList.ns] = _phoneList;
})(window,document);