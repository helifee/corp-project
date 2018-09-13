/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _dataEdit = {
    	ns : "_dataEdit",
    	dataPar:{upId:""},
    	/**
    	 * 保存方法
    	 */
    	save_form:function(){//保存规则编号类型
    		var my = this;
    		//映射后台保存方法
			var url=serviceUrl+"sys/sysNoticePhoneServer/save";
			//请求方式
			var type = 'POST';
			var objArr= $("#dataForm").serializeArray();
			var objDto={};
			for(var i in objArr){
				objDto[objArr[i].name]=objArr[i].value;
			}
			objDto.delflag=0;
			//验证修改id是否为null
			if(this.dataPar.upId){
				//映射后台修改方法
				url=serviceUrl+"sys/sysNoticePhoneServer/update/"+my.dataPar.upId;
				var type = 'PUT';
			}
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
    	            	   pop_tip_open("green",'数据保存成功！');
    	                   window.opener.location="javascript:_phoneList.reloadPhneGrid('"+objDto.id+"')";
    	                   window.opener=null;
    	                   window.close();
    	               }else {
    	            	   pop_tip_open("red",'数据保存失败！');
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
     	   window.opener.location="javascript:_phoneList.reloadPhneGrid()";
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
    	},
    	/**
    	 * 设置表单id
    	 */
    	setFromId:function(){
    		this.dataPar.upId=$.xljUtils.getUrlParam('id');
    		if(this.dataPar.upId){
    			$('#formTitle').html("短信通道-修改");
    			$(document).attr("title","短信通道-修改");//修改title值
    			//赋值给页面id元素
    			$("#dataForm").find("input[name='id']").val(this.dataPar.upId);
    		}else{
    			$('#formTitle').html("短信通道-新增");
    			$(document).attr("title","短信通道-新增");//修改title值
    			//生成uuid并赋值页面id元素
    			this.getUUID();
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
    	 * 初始化表单
    	 */
    	initFrom:function(){
    		var my = this;
    		if(this.dataPar.upId){
    			$.ajax({
        	        type:'get',
        	        url:serviceUrl+'sys/sysNoticePhoneServer/get/'+this.dataPar.upId+'?time='+Math.random(),
        	        success: function(data) {
        	        	var fromData=data.result;
        	        	if(fromData){
        	        		$("input[name='code']").val(fromData.code);
        	        		$("input[name='name']").val(fromData.name);
        	        		$("input[name='host']").val(fromData.host);
        	        		$("input[name='idNumber']").val(fromData.idNumber);
        	        		$("input[name='username']").val(fromData.username);
        	        		$("input[name='password']").val(fromData.password);
        	        		$(":radio[name='isDefault'][value="+fromData.isDefault+"]").attr("checked",true);
        	        		$("textarea[name='remark']").html(fromData.remark);
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
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		//事件绑定
    		this.bind_event();
    		//设置表单id
    		this.setFromId();
    		//初始化form表单
    		this.initFrom();
    		//$("input[name='code']").val($.xljUtils.getNumber('1c1c17ba406a45aba662feb7c634aac9'));
    	}
    };
    $(_dataEdit.pageInit());
    window[_dataEdit.ns] = _dataEdit;
})(window,document);