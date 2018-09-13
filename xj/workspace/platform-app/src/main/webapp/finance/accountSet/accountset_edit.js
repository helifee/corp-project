/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _DataEdit = {
    	ns : "_DataEdit",
    	dataPar:{
    		upDataId:"",
			rowData:null,
			rowDataBefore:null,
			maintainData:[],
			fieldDataType:0,
			fieldRowData:null,
			registerId:"",
			appCode:""
    	},
    	/**
    	 * 保存数据项事件
    	 */
    	save_form:function(){
    		var my = this;
			//映射后台保存方法
			var url=hostUrl+"finance/accountSet/save";
			//请求方式
			var type = 'POST';
			if(my.dataPar.upDataId){
    			//映射后台修改方法
				url=hostUrl+"finance/accountSet/update/"+$('#accountSetForm').find("input[name='id']").val();
				type = 'PUT';
    		}
			var financeSystemarr=$("#accountSetForm").serializeArray();
			var accountSetDto={};
			accountSetDto.delflag=0;
			accountSetDto.appCode=this.dataPar.appCode;
			for(var o in financeSystemarr){
				accountSetDto[financeSystemarr[o].name]=financeSystemarr[o].value;
			}
			$.ajax({
	    	       url:url,
	    	       data:JSON.stringify(accountSetDto),
	    	       type:type,
	    	       contentType:'application/json',
	    	       dataType:'JSON',
	    	       success:function (resultData ) {
		               if(resultData.success) {
		                   pop_tip_open("green",'保存成功！');
		                   window.opener.location="javascript:reloadGrid('"+accountSetDto.id+"');";
		                   window.opener=null;
		                   window.close();
		               }else {
		                   pop_tip_open("red",resultData.msg);
		               }
	    	       },
		       	  error: function(XMLHttpRequest, textStatus, errorThrown) {
		    		  pop_tip_open("red","服务异常,请联系管理员！");
		          }
	    	   });
    	},

    	/**
    	 * 关闭事件
    	 */
    	to_list:function(){//关闭
			//调用父页面初始化方法
			window.opener.location="javascript:searchData();";
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
    		//摸态窗口关闭事件
    		$('#myModal').on('hidden.bs.modal', function () {
    			$("#modalData").empty();//清空div
    			$("#eId").val("");//ruler主键清空,防止明细和维护页面冲突
    			$('#confirmData').unbind();//移除所有事件
			});
    	},
    	/**
    	 * 获取id值并赋值给页面id
    	 */
    	setObjId:function(){
    		//获取id值
    		this.dataPar.upDataId=$.xljUtils.getUrlParam('id');
    		this.dataPar.registerId=$.xljUtils.getUrlParam('registerId');
    		this.dataPar.appCode=$.xljUtils.getUrlParam('app_code');
    		if(this.dataPar.upDataId){
    			$('#editTitle').html("财务系统公司-修改");
    			$(document).attr("title","财务系统公司-修改");//修改title值
    			//赋值给页面id元素
    			$("#accountSetForm").find("input[name='id']").val(this.dataPar.upDataId);
    		}else{
    			$('#editTitle').html("财务系统公司-新增");
    			$(document).attr("title","财务系统公司-新增");//修改title值
    			if(this.dataPar.registerId){
    				$("#registerId").val(this.dataPar.registerId);
    			}
    			//生成uuid并赋值页面id元素
    			this.getUUID();
    		};
    	},
    	/**
    	 * 初始化页面数据
    	 */
    	initObjFrom:function(){
    		if(this.dataPar.upDataId){
    			$.ajax({
        	        type:'get',
        	        url:hostUrl+'finance/accountSet/get/'+this.dataPar.upDataId+'?time='+Math.random(),
        	        success: function(data) {
        	        	var result=data.result;
        	        	if(result){
        	        		//页面元素赋值
	       	        	     $("input[name='registerId']").val(result.registerId);
	       	        	     $("input[name='id']").val(result.id);
	       	        	     $("input[name='name']").val(result.name);
	       	        	     $("input[name='code']").val(result.code);
	       	        	     $("input[name='companyName']").val(result.companyName);
	       	        	     $("input[name='companyCode']").val(result.companyCode);
        	        	}else{
        	        		pop_tip_open("red","数据为空！");
        	        	}
    	        	},
		       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
		    		   pop_tip_open("red","服务异常,请联系管理员！");
		            }
        		});
    		}
    	},
    	
    	/**
    	 * describe:新增的时候 自动的生成表单id
    	 */
    	getUUID:function (){
    		var my = this;
    		$.ajax({
    			type:'get',
    			url:hostUrl+'/generator/getGuuid'+'?time='+Math.random(),
    			async:false,
    			success: function(data) {
    				$("#accountSetForm").find("input[name='id']").val(data.result);
    			},
	       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		   pop_tip_open("red","服务异常,请联系管理员！");
	            }
    		});
    	},
    	
    	/**
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		//id赋值
    		this.setObjId();
    		//保存关闭按钮绑定事件
    		this.bind_event();
    		//初始化页面数据
    		this.initObjFrom();
    	}
    };
    $(_DataEdit.pageInit());
    window[_DataEdit.ns] = _DataEdit;
})(window,document);