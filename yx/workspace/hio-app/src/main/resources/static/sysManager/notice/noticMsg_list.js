/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _noticHistoryList = {
    	ns : "_noticHistoryList",
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
    	        url: serviceUrl+'/sys/sysNoticePhoneMsg/vaguePage',
    	        ajaxGridOptions: { contentType: 'application/json' },
    	        mtype : "POST",  
    	        contentType : "application/json",  
    	        datatype : "json",
    	        postData:{phones:"",msg:"",num:""},
    	        width:$('#div_phone').width(),
    	        height:$(window).height() - 80 -105 ,
    	        multiselect:false,
    	        rownumbers:true,
    	        jsonReader : {
    	            repeatitems : false  
    	        },
    	        colModel : [
    	            {name : 'id',label : 'id',hidden:true,align : "center"},
    	            {name : 'phones',label : '接收方手机号',align : "center",cellattr: my.addCellAttr},
    	            {name : 'msg',label : '接收方信息',align : "center"},
    	            {name : 'num',label : '发送次数',align : "center",cellattr: my.addNumCellAttr},
    	            {name : 'status',label : '状态',align : "center",formatter:function(status){
    	            	if(status=="2"){
    	            		return "未发送";
    	            	}else if(status=="1"){
    	            		return "已发送";
    	            	}else{
    	            		return "";
    	            	}
    	            },cellattr: my.addCellAttr},
    	            {name : 'phoneServerId',label : '服务器Id',align : "center",hidden:true},
    	            {name : 'phoneServerName',label : '服务器名称',align : "center"},
    	            {name : 'remark',label : '备注',align : "center"}
    	        ],
    	        rowNum : 20,//一页显示多少条
    	        rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
    	        pager : '#phonepager',//表格页脚的占位符(一般是div)的id
    	        ondblClickRow:function(rowid){},
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
//                	$.xljUtils.resizeNestedGrid(60);
                	$.xljUtils.addGridScroll();
//                	$.xljUtils.gridResizeFn();
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
    	 * 重新发送短信
    	 */
    	sendPhone:function(){
    		var my = this;
    		var ids=$('#phonelist').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择设置重发的行！");
    			return;
    		}
    		var rowData = $("#phonelist").jqGrid("getRowData",ids);
    		//映射后台保存方法
			var url=serviceUrl+"sys/sysNoticePhoneMsg/againSendMsg";
			//请求方式
			var type = 'POST';
    	    $.ajax({
    	       url:url,
    	       data:JSON.stringify(rowData),
    	       type:type,
    	       contentType:'application/json',
    	       dataType:'JSON',
    	       success:function (resultData ) {
    	           if(resultData) {
    	               var successFlag = resultData.success;
    	               if(successFlag) {
    	            	   pop_tip_open("green",'短信发送成功！');
    	            	   $('#phonelist').jqGrid().trigger("reloadGrid");
    	               }else {
    	            	   pop_tip_open("red",'短信发送失败！');
    	               }
    	           }
    	       },
    	       error: function(XMLHttpRequest, textStatus, errorThrown) {
            		 pop_tip_open("red","服务异常,请联系管理员！");
               }
    	   });
    	},
    	/**
    	 * 装载过滤查询的条件
    	 */
    	searchDate:function(){
    		var corname=$("#phoneCorname").val();
    	 	jQuery("#phonelist").jqGrid("setGridParam",{postData:{phones:corname,msg:corname,num:corname},page:1}).trigger("reloadGrid");
    	},
    	/**
    	 * 渲染grid数据样式
    	 */
    	addCellAttr:function (rowId, val, rowObject, cm, rdata) {
    	    if(rowObject.status != "1" ){
    	        return "style='color:red'";
    	    }
    	},
    	addNumCellAttr:function (rowId, val, rowObject, cm, rdata) {
    	    if(rowObject.num >1 ){
    	        return "style='color:lime'";
    	    }
    	},
    	/**
    	 * 模糊查询支持回车事件
    	 */
    	bindSearchDate:function(){
    		var my = this;
    		$("#phoneCorname").keyup(function(event){
    			if(event.keyCode ==13){
    				my.searchDate();
    			}
    		});
    	},
    	/**
         * tab页切换事件
         */
        eventTab: function() { //tab页绑定事件
            $(".con-tit .approve-btn").on("click",function(){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                var index = $(this).index();
                $(".content-div>div").hide();
                $(".content-div>div").eq(index).show();
                var btnName = $(this).attr("name");
                $.xljUtils.resizeNestedGrid(60);
            });
        },
        /**
         * 初始化页面
         */
        pageInit: function() { // 页面初始化JS
        	//页面切换事件
        	this.eventTab();
        	//回车事件
        	this.bindSearchDate();
        	//加载列表
        	this.loadPhonePageData();
        	//页面加载完毕后更改grid宽高
            $(window).on('resize', function () {
                $.xljUtils.resizeNestedGrid(60);
            });
        }
    };
    $(_noticHistoryList.pageInit());
    window[_noticHistoryList.ns] = _noticHistoryList;
})(window,document);