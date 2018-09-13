/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _billView = {
    	ns : "_billView",
    	dataPar:{
    		upBillId:"",
    		addBillId:""
    	},
    	/**
    	 * 关闭事件
    	 */
    	to_list:function(){//关闭
    	   //调用父页面初始化方法
     	   window.opener.location="javascript:_billList.reloadGrid();";
     	   //本窗口制null
           window.opener=null;
           //关闭窗口
           window.close();
    	},
    	/**
    	 * 页面按钮事件绑定
    	 */
    	bind_event:function(){
    		var my = this;
    		//关闭按钮绑定事件
    		$('#_close').on('click',function(){
    			my.to_list();
    		});
    	},
    	/**
    	 * 获取id值并赋值给页面id
    	 */
    	setBillId:function(){
    		//获取id值
    		this.dataPar.upBillId=$.xljUtils.getUrlParam('id');
    		if(this.dataPar.upBillId){
    			//赋值给页面id元素
    			$("#numBillFrom").find("input[name='id']").val(this.dataPar.upBillId);
    		}
    	},
    	/**
    	 * 初始化页面数据
    	 */
    	initBillFrom:function(){
    		if(this.dataPar.upBillId){
    			$.ajax({
        	        type:'get',
        	        url:serviceUrl+'sys/num/bill/get/'+this.dataPar.upBillId,
        	        success: function(data) {
        	        	var billData=data.result;
        	        	if(billData){
        	        		//页面元素赋值
        	        		$("input[name='code']").val(billData.code);
        	        		$("input[name='name']").val(billData.name);
        	        		$("input[name='connector']").val(billData.connector);
        	        		$("input[name='status']").val(billData.status==1?"启用":"禁用");
        	        		$("textarea[name='remark']").html(billData.remark);
        	        	}else{
        	        		pop_tip_open("red","获取数据为空！");
        	        	}
    	        	},
    	       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
		    		   pop_tip_open("red","服务异常,请联系管理员！");
		            }
        		});
    		}
    	},
    	/**
    	 * 初始化编码规则数据
    	 */
    	loadRulerData:function(){
    		var my = this;
    		if(my.dataPar.upBillId){
    			jQuery("#list3").jqGrid({
    				url: serviceUrl+'sys/num/ruler/getRuleListByBillId',
    				ajaxGridOptions: { contentType: 'application/json' },
    				mtype : "POST",  
    				contentType : "application/json",  
    				datatype : "json", 
    				postData:{id:my.dataPar.upBillId},
    				multiselect:true,
    				autowidth:true,
    				height:$(window).height() - $('.clearfix').height() - $('.form-inline').height()- $('.xj-form-tab').height() - 120,
    				rownumbers:true,
    				rowNum : 0,//一页显示多少条
    				rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
    				jsonReader : {
    					root:"result",
    					repeatitems : false
    				},
    				colModel : [ 
    				            {name : 'id',label : '序号',hidden:true,align : "center"},
    				            {name : 'code',label : '编号',align : "center"},
    				            {name : 'name',label : '名称',align : "center"},
    				            {name : 'type',label : '规则类别',align : "center",formatter:function(_val){
    				            	if(_val=="fixedSerial"){
    				            		return "固定字串";
    				            	}else if(_val=="addReduceSerial"){
    				            		return "自增（减）数字 字串";
    				            	}else if(_val=="enumSerial"){
    				            		return "枚举字串";
    				            	}else if(_val=="dateSerial"){
    				            		return "时间字串";
    				            	}else if(_val=="userInfoSerial"){
    				            		return "当前用户字串";
    				            	}else{
    				            		return "";
    				            	}
    				            }},
    				            {name : 'isOut',label : '是否输出',align : "center",formatter:function(_val){
    				            	if(_val=="0"){
    				            		return "否";
    				            	}else if(_val=="1"){
    				            		return "是";
    				            	}else{
    				            		return "";
    				            	}
    				            }},
    				            {name : 'dateFormat',label : '日期格式',align : "center"},
    				            //{name : 'isSerial',label : '强制连续',align : "center"},
    				            {name : 'initVar',label : '初始值',align : "center"},
    				            {name : 'stepLength',label : '步长',align : "center"},
    				            {name : 'initSerial',label : '起步值',align : "center"},
    				            {name : 'maxSerial',label : '最大值',align : "center"},
    				            {name : 'serialFormat',label : '序号格式',align : "center"},
    				            {name : 'serialLibrary',label : '枚举库',align : "center"},
    				            {name : 'sort',label : '排序号',align : "center"},
    				            {name : 'remark',label : '备注',align : "center"}
    				            ],
		            viewrecords : true,
		            ondblClickRow:function(rowid){
		            	window.open("ruler_view.html?id="+rowid);
		            },
		            loadError:function(xhr,status,error){
		     	    	//异常处理
		     	    	switch(xhr.status){
		    	 	    	case 404:
		    	 	    		 pop_tip_open("red","请求url有误！");
		    	 	    		 break;
		    	 	    	case 405:
		    	 	    		 pop_tip_open("red","请求方法有误！");
		    	 	    		 break;
		    	 	         default:pop_tip_open("red","获取系统菜单服务异常！");
		    	 	        	 break;
		     	    	}
		     	    	
		     	    },
		     	    loadComplete:function(xhr){
		     	    	if(!xhr.success){
		     	    		switch (xhr.code) {
		    				case "50000":
		    					pop_tip_open("red",xhr.msg);
		    					break;
		    				case "50001":
		    					pop_tip_open("red",xhr.msg);
		    					break;
		    				case "50002":
		    					pop_tip_open("blue",xhr.msg);
		    					break;
		    				case "50003":
		    					pop_tip_open("red",xhr.msg);
		    					break;
		    				default:
		    					pop_tip_open("red","查询数据失败！");
		    					break;
		    				}
		    	    	   }else{
		    	    		   //success
		    	    	   }
		     	    }
    			});
    		}
    	},
    	/**
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		//id赋值
    		this.setBillId();
    		//保存关闭按钮绑定事件
    		this.bind_event();
    		//初始化页面数据
    		this.initBillFrom();
    		//加载编码规则
    		this.loadRulerData();
    	}
    };
    $(_billView.pageInit());
    window[_billView.ns] = _billView;
})(window,document);