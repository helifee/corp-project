/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _dataEdit = {
    	ns : "_dataEdit",
    	dataPar:{upId:""},
    	/**
    	 * 发送方法
    	 */
    	save_form:function(){//保存规则编号类型
    		var my = this;
    		//映射后台保存方法
			var url=serviceUrl+"sys/sysNoticePhoneMsg/send";
			//请求方式
			var type = 'POST';
			var objArr= $("#dataForm").serializeArray();
			var objDto={};
			for(var i in objArr){
				objDto[objArr[i].name]=objArr[i].value;
			}
			objDto.delflag=0;
    	    $.ajax({
    	       url:url,
    	       data:JSON.stringify(objDto),
    	       type:type,
    	       contentType:'application/json',
    	       dataType:'JSON',
    	       success:function (resultData ) {
    	           if(resultData) {
    	               var successFlag = resultData.success;
    	               if(successFlag) {
    	            	   pop_tip_open("green",'短信发送成功！');
    	                   window.opener.location="javascript:_noticList.reloadPhneGrid()";
    	                   window.opener=null;
    	                   window.close();
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
    	 * 关闭window方法
    	 */
    	to_list:function(){//关闭
     	   window.opener.location="javascript:_noticList.reloadPhneGrid()";
           window.opener=null;
           window.close();
    	},
    	/**
    	 * 按钮事件绑定
    	 */
    	bind_event:function(){//事件绑定
    		var my = this;
    		$('#_close').on('click',function(){
    			my.to_list();
    		});
    		$("#saveForm").on('click',function() {
    			$("#dataForm").submit();
		    });
    	},
    	/**
    	 * 设置表单id
    	 */
    	setFromId:function(){
    		this.dataPar.upId=$.xljUtils.getUrlParam('id');
    		if(this.dataPar.upId){
    			$('#formTitle').html("短信通道-测试");
    			$(document).attr("title","短信通道-测试");//修改title值
    			//赋值给页面id元素
    			$("#dataForm").find("input[name='id']").val(this.dataPar.upId);
    		}
    	},
    	/**
    	 * 新增的时候 自动的生成表单id
    	 */
    	getUUID:function (){
    		$.ajax({
    			type:'get',
    			url:serviceUrl+'/sys/uuid/generator/getGuuid'+'?time='+Math.random(),
    			async: false,
    			success: function(data) {
    				$("#dataForm").find("input[name='id']").val(data.result);
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
    		//事件绑定
    		this.bind_event();
    		//设置表单id
    		this.setFromId();
    		//初始化form表单
    		//this.initFrom();
    	}
    };
    $(_dataEdit.pageInit());
    window[_dataEdit.ns] = _dataEdit;
})(window,document);