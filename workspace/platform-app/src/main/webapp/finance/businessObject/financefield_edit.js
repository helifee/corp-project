/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _ModalEdit = {
    	ns : "_ModalEdit",
    	dataPar:{upFieldId:""},
    	/**
    	 * 保存规则编号类型
    	 */
    	save_form:function(){
    		//form表单数据
			var dataArr= $("#fieldEditFrom").serializeArray();
			var dataDto={};
			for(var i in dataArr){
				dataDto[dataArr[i].name]=dataArr[i].value;
			}
			dataDto.delflag=0;
			//验证修改id是否为null
			if(this.dataPar.upFieldId){
				var maintainData = _DataEdit.dataPar.maintainData;
				var bool = false;
				for(var i=0;i< maintainData.length;i++){
					if(maintainData[i].id==this.dataPar.upFieldId){
						if(maintainData[i].dataType==1){
							dataDto.dataType = 1;
						}else{
							dataDto.dataType = 3;
						}
						maintainData[i] = dataDto;
						bool = true;
						continue;
					}
				}
				if(!bool){
					dataDto.dataType = 3;
					_DataEdit.dataPar.maintainData[_DataEdit.dataPar.maintainData.length] = dataDto;
				}
				dataDto.nodeIcon = dataDto.name;
				$("#fieldList").jqGrid('setRowData', this.dataPar.upFieldId, dataDto);//修改
			}else{
				var rowId = $("#fieldEditFrom").find("input[name='id']").val();
				dataDto.dataType=1;
				
				dataDto.nodeIcon = dataDto.name;
				//判断是否为子节点
				if(dataDto.parentId!=0){
					//添加到指定行
					var bl = $("#fieldList").addRowData(rowId,dataDto,"after",dataDto.parentId);//新增
				}else{
					$("#fieldList").addRowData(rowId,dataDto, "last");//新增
				}
				//选中新增行
				if(dataDto!=null&&dataDto!='undefined'){
                	//清除上一次选中行的样式
            		$('#fieldList').find("td").removeClass("ui-state-highlight"); 
                	//添加回显选中行样式
                	$('#fieldList').setSelection(rowId,true);
                	$('#fieldList '+'#'+rowId).find("td").addClass("ui-state-highlight"); 
                }
				_DataEdit.dataPar.maintainData[_DataEdit.dataPar.maintainData.length] = dataDto;
			}
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
    	setFormId:function(){
    		//获取id的值，并赋值
    		$("#fieldEditFrom").find("input[name='bizObjectId']").val($("#baseSupplierForm").find("input[name='id']").val());
    		//获取需要维护的id
    		this.dataPar.upFieldId=$("#eId").val();
    		$("#fieldEditFrom").find("input[name='id']").val(this.dataPar.upFieldId);
    	},
    	/**
    	 * 初始化表单数据
    	 */
    	initFrom:function(){
    		var my = this;
    		$('#fieldEditFrom')[0].reset();
    		if(this.dataPar.upFieldId){
    			
    			if(_DataEdit.dataPar.fieldDataType==1){
    				//页面元素赋值
	        		$("#fieldEditFrom").find("input[name='code']").val(_DataEdit.dataPar.fieldRowData.code);
	        		$("#fieldEditFrom").find("input[name='name']").val(_DataEdit.dataPar.fieldRowData.name);
	        		$("#fieldEditFrom").find("input[name='nodeIcon']").val(_DataEdit.dataPar.fieldRowData.name);
	        		$("#fieldEditFrom").find("input[name='parentId']").val(_DataEdit.dataPar.fieldRowData.parentId);
	        		
	        		//加载下拉框
	        		my.loadSelect(_DataEdit.dataPar.fieldRowData.parentId);
	        		$("#fieldEditFrom").find("select[name='type']").val(_DataEdit.dataPar.fieldRowData.type);
	        		$("#fieldEditFrom").find(":radio[name='isQuery'][value="+_DataEdit.dataPar.fieldRowData.isQuery+"]").attr("checked",true);
	        		$("#fieldEditFrom").find(":radio[name='display'][value="+_DataEdit.dataPar.fieldRowData.display+"]").attr("checked",true);
	        		$("#fieldEditFrom").find(":radio[name='urlTypeFlag'][value="+_DataEdit.dataPar.fieldRowData.urlTypeFlag+"]").attr("checked",true);
	        		_DataEdit.dataPar.fieldDataType = 0;
	        		_DataEdit.dataPar.fieldRowData = null;
    			}else{
    				$.ajax({
            	        type:'get',
            	        url:hostUrl+'finance/businessField/get/'+my.dataPar.upFieldId+'?time='+Math.random(),
            	        success: function(data) {
            	        	var fieldData=data.result;
            	        	if(fieldData){
            	        		//页面元素赋值
            	        		$("#fieldEditFrom").find("input[name='code']").val(fieldData.code);
            	        		$("#fieldEditFrom").find("input[name='name']").val(fieldData.name);
            	        		$("#fieldEditFrom").find("input[name='nodeIcon']").val(fieldData.name);
            	        		$("#fieldEditFrom").find("input[name='parentId']").val(fieldData.parentId);
            	        		//加载下拉框
            	        		my.loadSelect(fieldData.parentId);
            	        		$("#fieldEditFrom").find("select[name='type']").val(fieldData.type);
            	        		$("#fieldEditFrom").find(":radio[name='isQuery'][value="+fieldData.isQuery+"]").attr("checked",true);
            	        		$("#fieldEditFrom").find(":radio[name='display'][value="+fieldData.display+"]").attr("checked",true);
            	        		$("#fieldEditFrom").find(":radio[name='urlTypeFlag'][value="+fieldData.urlTypeFlag+"]").attr("checked",true);
            	        	}else{
            	        		pop_tip_open("red","数据为空！");
            	        	}
        	        	},
    		       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
    		    		   pop_tip_open("red","服务异常,请联系管理员！");
    		            }
            		});
    			}
    		}else{
    			my.getFieldUUID();//初始化id
    			//加载下拉框
        		my.loadSelect($("#addParentId").val());
    		}
    	},
    	/**
    	 * 新增的时候 自动的生成表单id
    	 */
    	getFieldUUID:function (){
    		$.ajax({
    			type:'get',
    			url:hostUrl+'/generator/getGuuid'+'?time='+Math.random(),
    			success: function(data) {
    				$("#fieldEditFrom").find("input[name='id']").val(data.result);
    			},
	       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		   pop_tip_open("red","服务异常,请联系管理员！");
	            }
    		});
    	},
    	/**
    	 * 设置model高度
    	 */
    	setModelHeight:function(){
    		//设置model高度及滚动条
    		$("#modalData").css({
    			overflow:"auto",
    			height:$('#modelHeight').height()>$(window).height()-120?$(window).height()-140:$('#modelHeight').height()+40
    		})
    	},
    	/**
    	 * 加载上级元素下拉框
    	 */
    	loadSelect:function(e_val){
			var arr = $("#fieldList").jqGrid("getRowData"); 
		    for(var i = 0;i<arr.length;i++){
		    	if(arr[i].parentId==0){
		    		var name = arr[i].name.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];});
				    if(name.length>32){
					    name = name.substring(0,20)+"...";
				    }
		    		if(arr[i].id==e_val){
						$("#parentId").append("<option selected = 'selected' value='"+arr[i].id+"'>"+name+"</option>");
						$("#fieldEditFrom").find("input[name='parentName']").val(name);
		    		}else{
					  $("#parentId").append("<option value='"+arr[i].id+"'>"+name+"</option>");  
		    		}
		    	}
		    }
		    var config = {
		            '.chosen-select': {},
		            '.chosen-select-deselect': {
		                allow_single_deselect: true
		            },
		            '.chosen-select-no-single': {
		                disable_search_threshold: 10
		            },
		            '.chosen-select-no-results': {
		                no_results_text: 'Oops, nothing found!'
		            },
		            '.chosen-select-width': {
		                width: "95%"
		            }
		        }
		        for (var selector in config) {
		            $(selector).chosen(config[selector]);
		        }
			  $.xljUtils.addGridScroll('chosen-results');
  	    },
  	    /**
  	     * 下拉框改变触发事件
  	     */
  	    changeParentIdEvent:function(e){
  	    	if(e.value==$('#fieldEditFrom').find('input[name="id"]').val()){
  	    		$("#fieldEditFrom").find("input[name='parentName']").val('');
  	    		$("#fieldEditFrom").find("select[name='parentId']").val('0');
  	    		pop_tip_open("green","不能选择节点自身为父节点！");
  	    		return false;
  	    	}
  	    	if(e.value!=0){
  	    		$("#fieldEditFrom").find("input[name='parentName']").val(e.options[e.selectedIndex].text);
  	    	}else{
  	    		$("#fieldEditFrom").find("input[name='parentName']").val('');
  	    	}
  	    },
    	/**
    	 * 初始化页面
    	 */
    	pageInit:function(){// 页面初始化JS
    		this.bind_event();//绑定事件
    		this.setFormId();//初始化赋值
    		this.initFrom();//初始化规则表单S
    	}
    };
    $(_ModalEdit.pageInit());
    window[_ModalEdit.ns] = _ModalEdit;
})(window,document);