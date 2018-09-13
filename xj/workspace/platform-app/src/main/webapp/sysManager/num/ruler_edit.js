/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _rulerEdit = {
    	ns : "_rulerEdit",
    	dataPar:{upRulerId:"",formSerialData:null},
    	/**
    	 * 保存规则编号类型
    	 */
    	save_form:function(){
    		//form表单数据
			var RulerArr= $("#rulerEditFrom").serializeArray();
			var RulerDto={};
			for(var i in RulerArr){
				if(RulerArr[i].name=="isOut"||RulerArr[i].name=="serialNumberType"){
					RulerDto[RulerArr[i].name] = this.getRadio(RulerArr[i].name);
				}else if(RulerArr[i].name=="remark"){
					RulerDto[RulerArr[i].name] = document.getElementById(RulerArr[i].name).innerHTML;
				}else{
					var val = document.getElementById(RulerArr[i].name).value.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]});
					RulerDto[RulerArr[i].name]=val;
				}
			}
			RulerDto.delflag=0;
			if("dateSerialNumber"!=RulerDto.type){
				RulerDto.serialNumberType = null;
			}
			//验证修改id是否为null
			if(this.dataPar.upRulerId){
				var maintainData = _billEdit.dataPar.maintainData;
				var bool = false;
				for(var i=0;i< maintainData.length;i++){
					if(maintainData[i].id==this.dataPar.upRulerId){
						if(maintainData[i].dataType==1){
							RulerDto.dataType = 1;
						}else{
							RulerDto.dataType = 3;
						}
						maintainData[i] = RulerDto;
						bool = true;
						continue;
					}
				}
				if(!bool){
					RulerDto.dataType = 3;
					//_billEdit.dataPar.maintainData[_billEdit.dataPar.maintainData.length] = RulerDto;
				}
				$("#list3").jqGrid('setRowData', this.dataPar.upRulerId, RulerDto);//修改
			}else{
				var rowId = $("#rulerEditFrom").find("input[name='id']").val();
				RulerDto.dataType=1;
				$("#list3").addRowData(rowId,RulerDto, "last");//新增
				//_billEdit.dataPar.maintainData[_billEdit.dataPar.maintainData.length] = RulerDto;
			}
			//选中新增及修改
			$('#list3').find("td").removeClass("ui-state-highlight"); 
			$('#list3').setSelection(RulerDto.id,true);
			$('#list3 '+'#'+RulerDto.id).find("td").addClass("ui-state-highlight");
			$("#myModal").modal("hide");
    	},
    	/**
    	 * 初始化绑定事件
    	 */
    	bind_event:function(){//事件绑定
    		var my = this;
    		//显示保存按钮
    		$("#confirmData").show();
    	},
    	/**
    	 * 初始化赋值
    	 */
    	setBillId:function(){
    		//获取规则类型id的值，并赋值
    		$("#rulerEditFrom").find("input[name='billId']").val($("#numBillFrom").find("input[name='id']").val());
    		//获取需要维护的规则id
    		this.dataPar.upRulerId=$("#eId").val();
    		$("#rulerEditFrom").find("input[name='id']").val(this.dataPar.upRulerId);
    	},
    	/**
    	 * 初始化表单数据
    	 */
    	initRulerFrom:function(){
    		var my = this;
    		$('#rulerEditFrom')[0].reset();
    		if(this.dataPar.upRulerId){
    				//页面元素赋值
	        		$("#rulerEditFrom").find("input[name='billId']").val(_billEdit.dataPar.rulerRowData.billId);
	        		
	        		$("#rulerEditFrom").find("input[name='code']").val(_billEdit.dataPar.rulerRowData.code.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]}));
	        		$("#rulerEditFrom").find("input[name='name']").val(_billEdit.dataPar.rulerRowData.name.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]}));
	        		$("#oldType").val(_billEdit.dataPar.rulerRowData.type);
	        		$("#rulerEditFrom").find("select[name='type']").val(_billEdit.dataPar.rulerRowData.type);
	        		$("#rulerEditFrom").find(":radio[name='isOut'][value="+_billEdit.dataPar.rulerRowData.isOut+"]").prop("checked","checked");
	        		$("#rulerEditFrom").find("input[name='sort']").val(_billEdit.dataPar.rulerRowData.sort);
	        		$("#rulerEditFrom").find("textarea[name='remark']").html(_billEdit.dataPar.rulerRowData.remark.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]}));
	        		
	        		$("#rulerEditFrom").find("select[name='dateFormat']").val(_billEdit.dataPar.rulerRowData.dateFormat);
	        		
	        		$("#rulerEditFrom").find("input[name='initVar']").val(_billEdit.dataPar.rulerRowData.initVar.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]}));
	        		$("#rulerEditFrom").find("input[name='stepLength']").val(_billEdit.dataPar.rulerRowData.stepLength);
	        		$("#rulerEditFrom").find("input[name='serialLibrary']").val(_billEdit.dataPar.rulerRowData.serialLibrary.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]}));
	        		
	        		$("#rulerEditFrom").find("input[name='initSerial']").val(_billEdit.dataPar.rulerRowData.initSerial);
	        		$("#rulerEditFrom").find("input[name='maxSerial']").val(_billEdit.dataPar.rulerRowData.maxSerial);
	        		$("#rulerEditFrom").find("input[name='serialFormat']").val(_billEdit.dataPar.rulerRowData.serialFormat.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]}));
	        		
	        		debugger;
	        		$("#rulerEditFrom").find("input[name='connectorSymbol']").val(_billEdit.dataPar.rulerRowData.connectorSymbol.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]}));
	        		$("#rulerEditFrom").find("input[name='serialNumberLength']").val(_billEdit.dataPar.rulerRowData.serialNumberLength);
	        		$("#rulerEditFrom").find(":radio[name='serialNumberType'][value='"+_billEdit.dataPar.rulerRowData.serialNumberType+"']").prop("checked","checked");
	        		//初始化div显隐
	        		my.hideDiv(_billEdit.dataPar.rulerRowData.type);
	        		_billEdit.dataPar.rulerDataType = 0;
	        		_billEdit.dataPar.rulerRowData = null;
//	        		if(_billEdit.dataPar.rulerDataType==1){
//    			}else{
//    				$.ajax({
//            	        type:'get',
//            	        url:hostUrl+'sys/num/ruler/get/'+my.dataPar.upRulerId,
//            	        success: function(data) {
//            	        	var rulerData=data.result;
//            	        	if(rulerData){
//            	        		//页面元素赋值
//            	        		$("#rulerEditFrom").find("input[name='billId']").val(rulerData.billId);
//            	        		
//            	        		$("#rulerEditFrom").find("input[name='code']").val(rulerData.code);
//            	        		$("#rulerEditFrom").find("input[name='name']").val(rulerData.name);
//            	        		$("#oldType").val(rulerData.type);
//            	        		$("#rulerEditFrom").find("select[name='type']").val(rulerData.type);
//            	        		$("#rulerEditFrom").find(":radio[name='isOut'][value="+rulerData.isOut+"]").attr("checked",true);
//            	        		$("#rulerEditFrom").find("input[name='sort']").val(rulerData.sort);
//            	        		$("#rulerEditFrom").find("textarea[name='remark']").html(rulerData.remark);
//            	        		
//            	        		$("#rulerEditFrom").find("select[name='dateFormat']").val(rulerData.dateFormat);
//            	        		
//            	        		$("#rulerEditFrom").find("input[name='initVar']").val(rulerData.initVar);
//            	        		$("#rulerEditFrom").find("input[name='stepLength']").val(rulerData.stepLength);
//            	        		$("#rulerEditFrom").find("input[name='serialLibrary']").val(rulerData.serialLibrary);
//            	        		
//            	        		$("#rulerEditFrom").find("input[name='initSerial']").val(rulerData.initSerial);
//            	        		$("#rulerEditFrom").find("input[name='maxSerial']").val(rulerData.maxSerial);
//            	        		$("#rulerEditFrom").find("input[name='serialFormat']").val(rulerData.serialFormat);
//            	        		
//            	        		$("#rulerEditFrom").find("input[name='connectorSymbol']").val(rulerData.connectorSymbol);
//            	        		$("#rulerEditFrom").find("input[name='serialNumberLength']").val(rulerData.serialNumberLength);
//            	        		$("#rulerEditFrom").find("input[name='serialNumberType'][value='"+rulerData.serialNumberType+"']").attr("checked",true);
//            	        		
//            	        		//初始化div显隐
//            	        		my.hideDiv(rulerData.type);
//            	        	}else{
//            	        		my.hideDiv("fixedSerial");
//            	        		pop_tip_open("red","数据为空！");
//            	        	}
//        	        	},
//    		       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
//    		    		   pop_tip_open("red","服务异常,请联系管理员！");
//    		            }
//            		});
//    			}
    		}else{
    			my.getRulerUUID();//初始化id
    			$("#oldType").val("fixedSerial");
    			my.hideDiv("fixedSerial");
    		}
    	},
    	/**
    	 * 获取单选框的值
    	 */
    	getRadio:function (name){
    		  var value="";
    		  var radio=document.getElementsByName(name);
    		  for(var i=0;i<radio.length;i++){
    			if(radio[i].checked==true){
    			  value=radio[i].value;
    			  break;
    			}
    		  }
    		  return value;
		},
    	/**
    	 * 新增的时候 自动的生成表单id
    	 */
    	getRulerUUID:function (){
    		$.ajax({
    			type:'get',
    			url:hostUrl+'/generator/getGuuid'+'?time='+Math.random(),
    			success: function(data) {
    				$("#rulerEditFrom").find("input[name='id']").val(data.result);
    			},
	       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		   pop_tip_open("red","服务异常,请联系管理员！");
	            }
    		});
    	},
    	/**
    	 * 获取用户id
    	 */
    	getLoginUserID:function (){
    		$.ajax({
    			type:'get',
    			url:hostUrl+'sys/num/bill/getLoginUserID'+'?time='+Math.random(),
    			success: function(data) {
    				$("#rulerEditFrom").find("input[name='code']").val(data.result);
    			},
	       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		   pop_tip_open("red","服务异常,请联系管理员！");
	            }
    		});
    	},
    	/**
    	 * 绑定事件(数据类型改变后，数据清空并显隐div)
    	 */
		bindRuleTypeEvent:function(){
			var my = this;
			$('#type').on('change',function(e){
				var selObj = $(this);
//				pop_text_open("blue",'修改类型后将清除原有数据,确认修改吗？',function(){
	    			var _val = selObj.children('option:selected').val();
	    			$("#oldType").val(_val);
	    			if(_val=='fixedSerial'){
	    				$("._enumSerial td input[type=text]").val('');
	    				$("._noDateSeria td input[type=text]").val('');
	    				$("._addReduceSerial td input[type=text]").val('');
	    				$("#rulerEditFrom").find("select[name='dateFormat']").val('');
	    				$("#rulerEditFrom").find("input[name='code']").val('');
	    				$(".serialNumber td input[type=text]").val('');
	    				
	    				my.unCheckBox();//取消选中
	    				$("._formSerial").css('display', 'none');
	    				$("._enumSerial").css('display', 'none');
	    				$("._noDateSeria").css('display', 'none');
	    				$("._addReduceSerial").css('display', 'none');
	    				$("._dateSeria").css('display', 'none');
	    				$(".serialNumber").css('display', 'none');
	    			}else if(_val=='addReduceSerial'){
	    				$("._enumSerial td input[type=text]").val('');
	    				$("#rulerEditFrom").find("select[name='dateFormat']").val('');
	    				$("#rulerEditFrom").find("input[name='code']").val('');
	    				$(".serialNumber td input[type=text]").val('');
	    				
	    				my.unCheckBox();//取消选中
	    				$("._formSerial").css('display', 'none');
	    				$("._enumSerial").css('display', 'none');
	    				$("._noDateSeria").css('display', '');
	    				$("._addReduceSerial").css('display', '');
	    				$("._dateSeria").css('display', 'none');
	    				$(".serialNumber").css('display', 'none');
	    			}else if(_val=='enumSerial'){
	    				$("._addReduceSerial td input[type=text]").val('');
	    				$("#rulerEditFrom").find("select[name='dateFormat']").val('');
	    				$("#rulerEditFrom").find("input[name='code']").val('');
	    				$(".serialNumber td input[type=text]").val('');
	    				
	    				my.unCheckBox();//取消选中
	    				$("._formSerial").css('display', 'none');
	    				$("._enumSerial").css('display', '');
	    				$("._noDateSeria").css('display', '');
	    				$("._addReduceSerial").css('display', 'none');
	    				$("._dateSeria").css('display', 'none');
	    				$(".serialNumber").css('display', 'none');
	    			}else if(_val=='dateSerial'){
	    				$("._enumSerial td input[type=text]").val('');
	    				$("._noDateSeria td input[type=text]").val('');
	    				$("._addReduceSerial td input[type=text]").val('');
	    				$("#rulerEditFrom").find("input[name='code']").val('');
	    				$(".serialNumber td input[type=text]").val('');
	    				
	    				my.unCheckBox();//取消选中
	    				$("._formSerial").css('display', 'none');
	    				$("._enumSerial").css('display', 'none');
	    				$("._noDateSeria").css('display', 'none');
	    				$("._addReduceSerial").css('display', 'none');
	    				$(".serialNumber").css('display', 'none');
	    				$("._dateSeria").css('display', '');
	    			}else if(_val=='userInfoSerial'){
	    				$("._enumSerial td input[type=text]").val('');
	    				$("._noDateSeria td input[type=text]").val('');
	    				$("._addReduceSerial td input[type=text]").val('');
	    				$("#rulerEditFrom").find("select[name='dateFormat']").val('');
	    				$(".serialNumber td input[type=text]").val('');
	    				
	    				my.unCheckBox();//取消选中
	    				$("._formSerial").css('display', 'none');
	    				$("._enumSerial").css('display', 'none');
	    				$("._noDateSeria").css('display', 'none');
	    				$("._addReduceSerial").css('display', 'none');
	    				$("._dateSeria").css('display', 'none');
	    				$(".serialNumber").css('display', 'none');
//	    				$("#rulerEditFrom").find("input[name='code']").val('userId');
	    				my.getLoginUserID();
	    			}else if(_val=='dateSerialNumber'){
	    				$("._enumSerial td input[type=text]").val('');
	    				$("._noDateSeria td input[type=text]").val('');
	    				$("._addReduceSerial td input[type=text]").val('');
	    				$("#rulerEditFrom").find("select[name='dateFormat']").val('');
	    				
	    				my.unCheckBox();//取消选中
	    				$("._formSerial").css('display', 'none');
	    				$("._enumSerial").css('display', 'none');
	    				$("._noDateSeria").css('display', 'none');
	    				$("._addReduceSerial").css('display', 'none');
	    				$("._dateSeria").css('display', 'none');
	    				$(".serialNumber").css('display', '');
	    			}else if(_val=='formSerial'){
	    				$("._enumSerial td input[type=text]").val('');
	    				$("._noDateSeria td input[type=text]").val('');
	    				$("._addReduceSerial td input[type=text]").val('');
	    				$("#rulerEditFrom").find("select[name='dateFormat']").val('');
	    				$(".serialNumber td input[type=text]").val('');
	    				
	    				$("._enumSerial").css('display', 'none');
	    				$("._noDateSeria").css('display', 'none');
	    				$("._addReduceSerial").css('display', 'none');
	    				$("._dateSeria").css('display', 'none');
	    				$(".serialNumber").css('display', 'none');
	    				
	    				my.loadCheckbox();//加载表单变量
	    				$("._formSerial").css('display', '');
	    				$("#rulerEditFrom").find("input[name='code']").val('');
	    			}
//				},function(){
//					$("#rulerEditFrom").find("select[name='type']").val($("#oldType").val());
//				});
    			//设置model高度及滚动条
    			my.setModelHeight();
    		});
		},
		formSerialChange:function(e){
			var obj = $("#rulerEditFrom").find("input[name='code']");
			var codeVal = obj.val();
			if(e.checked ==true){
	            if(codeVal.indexOf("@"+$(e).val()+"@")<0){
	            	if(obj.val()){
	            		obj.val(codeVal+"_@"+$(e).val()+"@");
	            	}else{
	            		obj.val(codeVal+"@"+$(e).val()+"@");
	            	}
	            	obj.focus();
	            }
	        }else{
	        	var repVal="";
	        	if(codeVal.indexOf("_@"+$(e).val()+"@")>=0){
	        		repVal = codeVal.replace("_@"+$(e).val()+"@", "");
	            }else if(codeVal.indexOf("@"+$(e).val()+"@_")>=0){
	            	repVal = codeVal.replace("@"+$(e).val()+"@_", "");
	            }else if(codeVal.indexOf("@"+$(e).val()+"@")>=0){
	            	repVal = codeVal.replace("@"+$(e).val()+"@", "");
	            }
	        	obj.val(repVal);
	        	obj.focus();
	        }
		},
		/**
		 * 根据数据类型初始化显隐div
		 */
		hideDiv:function(_val){
			if(_val=='fixedSerial'){
				$("._formSerial").css('display', 'none');
				$("._enumSerial").css('display', 'none');
				$("._noDateSeria").css('display', 'none');
				$("._addReduceSerial").css('display', 'none');
				$("._dateSeria").css('display', 'none');
				$(".serialNumber").css('display', 'none');
			}else if(_val=='addReduceSerial'){
				$("._formSerial").css('display', 'none');
				$("._enumSerial").css('display', 'none');
				$("._noDateSeria").css('display', '');
				$("._addReduceSerial").css('display', '');
				$("._dateSeria").css('display', 'none');
				$(".serialNumber").css('display', 'none');
			}else if(_val=='enumSerial'){
				$("._formSerial").css('display', 'none');
				$("._enumSerial").css('display', '');
				$("._noDateSeria").css('display', '');
				$("._addReduceSerial").css('display', 'none');
				$("._dateSeria").css('display', 'none');
				$(".serialNumber").css('display', 'none');
			}else if(_val=='dateSerial'){
				$("._formSerial").css('display', 'none');
				$("._enumSerial").css('display', 'none');
				$("._noDateSeria").css('display', 'none');
				$("._addReduceSerial").css('display', 'none');
				$(".serialNumber").css('display', 'none');
				$("._dateSeria").css('display', '');
			}else if(_val=='userInfoSerial'){
				$("._formSerial").css('display', 'none');
				$("._enumSerial").css('display', 'none');
				$("._noDateSeria").css('display', 'none');
				$("._addReduceSerial").css('display', 'none');
				$("._dateSeria").css('display', 'none');
				$(".serialNumber").css('display', 'none');
			}else if(_val=='dateSerialNumber'){
				$("._formSerial").css('display', 'none');
				$("._enumSerial").css('display', 'none');
				$("._noDateSeria").css('display', 'none');
				$("._addReduceSerial").css('display', 'none');
				$("._dateSeria").css('display', 'none');
				$(".serialNumber").css('display', '');
			}else if(_val=='formSerial'){
				$(".serialNumber").css('display', 'none');
				$("._enumSerial").css('display', 'none');
				$("._noDateSeria").css('display', 'none');
				$("._addReduceSerial").css('display', 'none');
				$("._dateSeria").css('display', 'none');
				
				var _checkBoxVal = $("#rulerEditFrom").find("input[name='code']").val();
				this.loadCheckbox(_checkBoxVal);//加载表单变量
				$("._formSerial").css('display', '');
				$("#rulerEditFrom").find("input[name='code']").val();
			}
			this.setModelHeight();//设置model高度
		},
		/**
		 * 取消复选框选中
		 */
		unCheckBox:function(){
			$("._formSerial .toggle").attr("checked",false);
		},
		/**
		 * 清空复选框
		 */
		clenCheckBox:function(){
			 $("._formSerial .form-value").html("");
		},
		/**
    	 * 加载表单变量
    	 */
		loadCheckbox:function(e_val){
			var my = this;
			this.clenCheckBox();
			if(null==my.dataPar.formSerialData){
	    		$.ajax({
	  	          type:'POST',
	  	          url:hostUrl+'sys/num/formVariable/queryList'+'?time='+Math.random(),
	  	          dataType:'json',
	  	          contentType:'application/json;charset=utf-8',
	  	          async:false,
	  	          data:JSON.stringify('{"delflag":"0","billId":"'+$("#rulerEditFrom").find("input[name='billId']").val()+'"}'),
	  	          success: function(json) {
	  	        	  if(json.success){
	  	        		  my.dataPar.formSerialData=json.result;
	  	        	  }else{
	  	        		pop_tip_open("red","获取表单变量数据失败！");
	  	        	  }
	  	          },
	  	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	         		 pop_tip_open("red","服务异常,请联系管理员！");
	             }
	  	      });
			}
			//添加基本变量
			if(!e_val||e_val.indexOf("@company@")<0){
				$("._formSerial .form-value").append('<label class="btn blue"><input class="toggle" value="company" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">公司</label>');
			}else{
				$("._formSerial .form-value").append('<label class="btn blue"><input checked="checked" class="toggle" value="company" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">公司</label>');
			}
			if(!e_val||e_val.indexOf("@dept@")<0){
				$("._formSerial .form-value").append('<label class="btn blue"><input class="toggle" value="dept" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">部门</label>');
			}else{
				$("._formSerial .form-value").append('<label class="btn blue"><input checked="checked" class="toggle" value="dept" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">部门</label>');
			}
			if(!e_val||e_val.indexOf("@project@")<0){
				$("._formSerial .form-value").append('<label class="btn blue"><input class="toggle" value="project" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">项目</label>');
			}else{
				$("._formSerial .form-value").append('<label class="btn blue"><input checked="checked" class="toggle" value="project" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">项目</label>');
			}
			if(!e_val||e_val.indexOf("@project_brach@")<0){
				$("._formSerial .form-value").append('<label class="btn blue"><input class="toggle" value="project_brach" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">分期</label>');
			}else{
				$("._formSerial .form-value").append('<label class="btn blue"><input checked="checked" class="toggle" value="project_brach" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">分期</label>');
			}
			for (var o in my.dataPar.formSerialData){
				if(e_val){
					if(e_val.indexOf("@"+my.dataPar.formSerialData[o].code+"@")>=0){
						$("._formSerial .form-value").append('<label class="btn blue"><input checked="checked" class="toggle" value="'+my.dataPar.formSerialData[o].code+'" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">'+my.dataPar.formSerialData[o].name+'</label>');
					}else{
						$("._formSerial .form-value").append('<label class="btn blue"><input class="toggle" value="'+my.dataPar.formSerialData[o].code+'" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">'+my.dataPar.formSerialData[o].name+'</label>');
					}
				}else{
					$("._formSerial .form-value").append('<label class="btn blue"><input class="toggle" value="'+my.dataPar.formSerialData[o].code+'" onclick="_rulerEdit.formSerialChange(this)" type="checkbox">'+my.dataPar.formSerialData[o].name+'</label>');
				}
		    }
    	},
    	/**
    	 * 设置model高度
    	 */
    	setModelHeight:function(){
    		//设置model高度及滚动条
    		$("#modalRuler").css({
    			overflow:"auto",
    			height:$('#modelHeight').height()>$(window).height()-120?$(window).height()-140:$('#modelHeight').height()+40
    		})
    	},
    	/**
    	 * 初始化页面
    	 */
    	pageInit:function(){// 页面初始化JS
    		this.bind_event();//绑定事件
    		this.setBillId();//初始化赋值
    		this.initRulerFrom();//初始化规则表单S
    		this.bindRuleTypeEvent();//根据数据类型做数据清空计算
    	}
    };
    $(_rulerEdit.pageInit());
    window[_rulerEdit.ns] = _rulerEdit;
})(window,document);