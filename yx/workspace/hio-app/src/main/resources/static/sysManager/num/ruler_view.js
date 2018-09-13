/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _rulerView = {
    	ns : "_rulerView",
    	dataPar:{upRulerId:""},
    	/**
    	 * 初始化id赋值并隐藏保存按钮
    	 */
    	setRulerId:function(){
    		//隐藏保存按钮
    		$("#confirmData").hide();
    		//规则id赋值
    		this.dataPar.upRulerId=$("#eId").val();
    		$("#rulersViewFrom").find("input[name='id']").val(this.dataPar.upRulerId);
    	},
    	/**
    	 * 加载表单数据
    	 */
    	initRulerFrom:function(){
    		var my = this;
    		if(this.dataPar.upRulerId){
    			$.ajax({
        	        type:'get',
        	        url:serviceUrl+'sys/num/ruler/get/'+my.dataPar.upRulerId,
        	        success: function(data) {
        	        	var rulerData=data.result;
        	        	if(rulerData){
        	        		$("#rulersViewFrom").find("input[name='billId']").val(rulerData.billId);
        	        		
        	        		$("#rulersViewFrom").find("input[name='code']").val(rulerData.code);
        	        		$("#rulersViewFrom").find("input[name='name']").val(rulerData.name);
        	        		$("#rulersViewFrom").find("#oldType").val(rulerData.type);
        	        		$("#rulersViewFrom").find("select[name='type']").val(rulerData.type);
        	        		$("#rulersViewFrom").find("input[name='isOut']").val(rulerData.isOut==1?"是":"否");
        	        		$("#rulersViewFrom").find("input[name='sort']").val(rulerData.sort);
        	        		$("#rulersViewFrom").find("textarea[name='remark']").html(rulerData.remark);
        	        		
        	        		$("#rulersViewFrom").find("select[name='dateFormat']").val(rulerData.dateFormat);
        	        		
        	        		$("#rulersViewFrom").find("input[name='initVar']").val(rulerData.initVar);
        	        		$("#rulersViewFrom").find("input[name='stepLength']").val(rulerData.stepLength);
        	        		$("#rulersViewFrom").find("input[name='serialLibrary']").val(rulerData.serialLibrary);
        	        		
        	        		$("#rulersViewFrom").find("input[name='initSerial']").val(rulerData.initSerial);
        	        		$("#rulersViewFrom").find("input[name='maxSerial']").val(rulerData.maxSerial);
        	        		$("#rulersViewFrom").find("input[name='serialFormat']").val(rulerData.serialFormat);
        	        		
        	        		$("#createDate").val(rulerData.createDate);
        	        		$("#updateDate").val(rulerData.updateDate);
        	        		$("#createPersonName").val(rulerData.createPersonName);
        	        		$("#updatePersonName").val(rulerData.updatePersonName);
        	        		$("#createOrgName").val(rulerData.createOrgName);
        	        		$("#createCompanyName").val(rulerData.createCompanyName);
        	        		my.hideDiv(rulerData.type);
        	        	}else{
        	        		my.hideDiv("fixedSerial");
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
    	 * 根据数据类型显隐div
    	 */
		hideDiv:function(_val){
			if(_val=='fixedSerial'){
				$("._enumSerial").css('display', 'none');
				$("._noDateSeria").css('display', 'none');
				$("._addReduceSerial").css('display', 'none');
				$("._dateSeria").css('display', 'none');
			}else if(_val=='addReduceSerial'){
				$("._enumSerial").css('display', 'none');
				$("._noDateSeria").css('display', '');
				$("._addReduceSerial").css('display', '');
				$("._dateSeria").css('display', 'none');
			}else if(_val=='enumSerial'){
				$("._enumSerial").css('display', '');
				$("._noDateSeria").css('display', '');
				$("._addReduceSerial").css('display', 'none');
				$("._dateSeria").css('display', 'none');
			}else if(_val=='dateSerial'){
				$("._enumSerial").css('display', 'none');
				$("._noDateSeria").css('display', 'none');
				$("._addReduceSerial").css('display', 'none');
				$("._dateSeria").css('display', '');
			}else if(_val=='userInfoSerial'){
				$("._enumSerial").css('display', 'none');
				$("._noDateSeria").css('display', 'none');
				$("._addReduceSerial").css('display', 'none');
				$("._dateSeria").css('display', 'none');
				var obj=$("#rulersViewFrom");
				obj.find("input[name='code']").val('userId');
			}
		},
		/**
		 * 页面初始化
		 */
    	pageInit:function(){// 页面初始化JS
    		//初始化id
    		this.setRulerId();
    		//加载初始化数据
    		this.initRulerFrom();
    	}
    };
    $(_rulerView.pageInit());
    window[_rulerView.ns] = _rulerView;
})(window,document);