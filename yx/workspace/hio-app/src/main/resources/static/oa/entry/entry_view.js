/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _entryView = {
    	ns : "_entryView",
    	dataPar:{upId:""},
    	/**
    	 * 关闭window窗口
    	 */
    	to_list:function(){//关闭
    		window.opener.location="javascript:_entryList.reloadGrid()";
            window.opener=null;
            window.close();
    	},
    	/**
    	 * 事件绑定(是否内部连接)
    	 */
    	event_isInner:function(el){
    		if(el==1){
    			$('#_external').css('display', '');
    			$('#_url').attr("disabled",true);
    		}else{
    			$('#_external').css('display', 'none');
    			$('#_url').attr("disabled",false);
    		}
    	},
    	/**
    	 * 事件绑定
    	 */
    	bind_event:function(){//事件绑定
    		var my = this;
    		//关闭按钮绑定事件
    		$('#_close').on('click',function(){
    			my.to_list();
    		});
    		//单选框绑定事件
    		$(":radio[name='isInner']").click(function(){
    			   my.event_isInner($(this).val());
		    });
    	},
    	/**
    	 * 加载下拉框
    	 */
    	loadSelect:function(e_val){
    		$.ajax({
  	          type:'POST',
  	          url:serviceUrl+'sys/quick/entry/queryList',
  	          dataType:'json',
  	          contentType:'application/json',
  	          async:false,
  	          data:JSON.stringify('{"delflag":"0"}'),
  	          success: function(json) {
  	        	  if(json.success){
  	        		  data=json.result;
  	        		  for (var o in data){
  	        			  if(data[o].parentId!=0){
  	        				  continue;
  	        			  }else{
  	        				if(data[o].id==e_val){
	        						$("#parentId").append("<option selected = 'selected' value='"+data[o].id+"'>"+data[o].name+"</option>");
	        				  }else{
	        					  $("#parentId").append("<option value='"+data[o].id+"'>"+data[o].name+"</option>");  
	        				  }
  	        			  }
  	        		
  	        		  }
  	        	  }
  	          },
	       	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		  pop_tip_open("red","服务异常,请联系管理员！");
	          }
  	      });
    	},
    	/**
    	 * 设置表单id
    	 */
		setFromId:function(){
    		this.dataPar.upId=$.xljUtils.getUrlParam('id');
    		$("#entryForm").find("input[name='id']").val(this.dataPar.upId);
    	},
    	/**
    	 * 加载表单数据
    	 */
    	initFrom:function(){
    		var my = this;
    		if(this.dataPar.upId){
    			$.ajax({
        	        type:'get',
        	        url:serviceUrl+'sys/quick/entry/get/'+this.dataPar.upId,
        	        success: function(data) {
        	        	var fromData=data.result;
        	        	if(fromData){
        	        		$("input[name='code']").val(fromData.code);
        	        		$("input[name='name']").val(fromData.name);
        	        		$("input[name='parentId']").val(fromData.parentId);
        	        		$("input[name='icon']").val(fromData.icon);
        	        		$("input[name='resourceId']").val(fromData.resourceId);
        	        		$("input[name='resourceName']").val(fromData.resourceName);
        	        		$("input[name='url']").val(fromData.url);
        	        		$("input[name='isInner']").val(fromData.isInner==1?"是":"否");
        	        		$("input[name='status']").val(fromData.status==1?"启用":"禁用");
        	        		
        	        		$("#createDate").val(fromData.createDate);
        	        		$("#updateDate").val(fromData.updateDate);
        	        		$("#createPersonName").val(fromData.createPersonName);
        	        		$("#updatePersonName").val(fromData.updatePersonName);
        	        		$("#createOrgName").val(fromData.createOrgName);
        	        		$("#createCompanyName").val(fromData.createCompanyName);
        	        		my.event_isInner(fromData.isInner);
        	        		my.loadSelect(fromData.parentId);
        	        	}else{
        	        		pop_tip_open("red","获取数据空！");
        	        	}
    	        	},
				    error: function(XMLHttpRequest, textStatus, errorThrown) {
				    	pop_tip_open("red","服务异常,请联系管理员！");
				    }
        		});
    			attachment.queryList('1',this.dataPar.upId, '1');
    		}
    	},
    	/**
    	 * 初始化页面
    	 */
    	pageInit:function(){// 页面初始化JS
    		this.bind_event();
    		this.setFromId();
    		this.initFrom();
    	}
    };
    $(_entryView.pageInit());
    window[_entryView.ns] = _entryView;
})(window,document);