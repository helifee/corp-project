/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _assList = {
    	ns : "_assList",
    	dataPar:{
    		tabCompanyId:"",
    		uuid:null,
    		rowData:null,
    		maintainData:[],
    		rowDataBefore:null,
    		isOne:false,
    		appCode:_tabList.dataPar.appCode,
    		accountSetId:$("#selectCompany").val(),
    		isup:false
    	},
    	/**
    	 * 加载页面数据
    	 */
    	loadPageData:function(){
    		var my = this;
    		jQuery("#assType").jqGrid({
    	        url: serviceUrl+'finance/assType/queryList'+'?time='+Math.random(),
    	        ajaxGridOptions: { contentType: 'application/json' },
    	        mtype : "POST",  
    	        datatype : "json",
    	        postData:{delflag:"0",accountSetId:my.dataPar.accountSetId,companyId:$('#companySct').val()==null?"null":$('#companySct').val()},
    	        width:$('.page-div-width').width(),
    	        height:($(window).height()-280)/2,
    	        multiselect:false,
    	        multiboxonly:false,
    	        rownumbers:true,
    	        jsonReader : {
    	        	root:"result",
    	            repeatitems : false  
    	        },
    	        colModel : [
    	            {name : 'id',label:'id',hidden:true,align : "center"},
    	            {name : 'bizObjectId',label:'bizObjectId',hidden:true,align : "center"},
    	            {name : 'accountSetId',label:'accountSetId',hidden:true,align : "center"},
    	            {name : 'assName',label : '辅助核算名称',align : "center"},
    	            {name : 'bizObjectName',label:'业务对象名称',align : "center"},
    	            {name : 'type',label : '类型',align : "center",formatter:"select",
		            	editoptions:{value:"1:银行账户;2:产品类型;3:工程项目;4:业务对象名称；;5:客户辅助核算;6:供应商辅助核算;7:费用科目;7:费用中心;8:人员档案;9:部门档案;10:公司;11:销售项目;12:产品线档案;13:项目维度辅助核算"}},
    	            {name : 'synchro',label : '是否同步',align : "center",formatter:"select",
		            	editoptions:{value:"0:否;1:是"}
    	            },
    	            {name:'isDirectCode',label:'传输类型',align:"center",formatter:"select",
		            	editoptions:{value:"1:核算代码;2:核算名称;3:业务对象代码;4:业务对象名称;5:默认设置"}
    	            }
    	        ],
    	        rowNum : -1,//一页显示多少条
    	        rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
    	        ondblClickRow:function(rowid){
    	        	my.toUpAssType();
    	        },
    	        onSelectRow: function (rowid) {
        		    my.dataPar.rowData = $('#assType').jqGrid('getRowData',rowid);
        		    my.loadMapingData();
                },
    	        onCellSelect: function(){
//                	if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
//                		//重新选择行时清除上一次选中行的样式
//                		$('#assType '+'#'+my.dataPar.rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
//                	}
                },
                gridComplete: function () {
                	$.xljUtils.addGridScroll();
//                	$.xljUtils.resizeNestedGrid(60);
//                	$.xljUtils.addGridScroll();
//                	$.xljUtils.gridResizeFn();
//                	my.dataPar.rowDataBefore = my.dataPar.rowData;
//                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
//                    	//添加回显选中行样式
//                    	$('#assType').setSelection(my.dataPar.rowDataBefore.id,true);
//                    	$('#assType '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
//                    }
                	var obj = $("#assType").jqGrid("getRowData");
                	if(obj.length>0){
                		$('#assType').setSelection(obj[0].id,true);
                	}else{
                		my.dataPar.rowData = null;
                		my.loadMapingData();
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
    	toAddAssType:function(){
    		if(!$('#companySct').val()){
    			pop_tip_open("blue","对照公司为空不能添加");
    			return;
    		}
    		$('#modalTitle').html("辅助核算-新增");
    		$("#addAuxiliary").modal("show");
    	},
    	/**
    	 * modal事件
    	 */
    	modalEvent:function(){
    		var my = this;
    		$('#addAuxiliary').on('show.bs.modal', function () {
    			$('#modalData').load("auxiliaryaccounting_modal.html",function(){
    				//表单初始验证
    	    		$.xljUtils.customValidate();
        			//获取tab财务系统公司id
            		my.getTabComId();
    			});
    		});
    		$('#addAuxiliary').on('hide.bs.modal', function () {
    			//重置表单
    			$('#modalData').empty();
    			
    			my.dataPar.isup = false;
    			my.dataPar.uuid = null;
    		});
		    //隐藏button
		    $('#cancelAdd').hide();
			$('#sendNc').hide();
			$('#sendNcRe').hide();
			$('#getCoContract').hide();
    	},
    	/**
    	 * open维护页面
    	 */
    	toUpAssType:function(){
    		var my = this;
    		$('#modalTitle').html("辅助核算-修改");
    		var ids=$('#assType').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选中辅助核算类型行");
    			return;
    		}
    		my.dataPar.rowData = $('#assType').jqGrid('getRowData',ids);
    		$.ajax({
    	        type:'get',
    	        url:serviceUrl+'finance/assType/get/'+my.dataPar.rowData.id+'?time='+Math.random(),
    	        success: function(data) {
    	        	var formData=data.result;
    	        	if(formData){
    	        		my.dataPar.isup = true;
    	        		my.dataPar.rowData = formData;
    	        		//show modal
    	        		$("#addAuxiliary").modal("show");
    	        	}else{
    	        		pop_tip_open("red","数据为空！");
    	        	}
	        	},
	       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		   pop_tip_open("red","服务异常,请联系管理员！");
	            }
    		});
    	},
    	/**
    	 * 删除数据
    	 */
    	toDelAssType:function(){
    		var ids=$('#assType').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要删除辅助核算的行！");
    			return;
    		}
    		pop_text_open("blue",'确认要删除这条数据吗？',function(){
	    		$.ajax({
	    			url:serviceUrl+"finance/assType/deletePseudoBatch/"+ids+'?time='+Math.random(),
	    			type:'DELETE',
	    			dataType:'JSON',
	    			success:function (resultData ) {
	    				if (resultData&&resultData.success) {
	    					pop_tip_open("green","删除数据成功！");
	    					$('#assType').jqGrid().trigger("reloadGrid");
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
    	 * describe:新增的时候 自动的生成表单id
    	 */
    	getUUID:function (){
    		var my = this;
    		$.ajax({
    			type:'get',
    			url:serviceUrl+'/sys/uuid/generator/getGuuid'+'?time='+Math.random(),
    			async:false,
    			success: function(data) {
    				my.dataPar.uuid = data.result;
    			},
	       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		   pop_tip_open("red","服务异常,请联系管理员！");
	            }
    		});
    	},
    	/**
    	 * 下拉框onchange事件
    	 */
    	searchProjectDate:function(){
    		$("#assType").jqGrid("setGridParam",{postData:{accountSetId:this.dataPar.accountSetId,companyId:$('#companySct').val()},page:1}).trigger("reloadGrid");
    		$("#companyId").val($('#companySct').val());//公司赋值
    	},
    	/**
    	 * 业务对象赋值
    	 */
    	changeProject:function(){
    		$('#bizObjectName').val($("#bizObjectId").find("option:selected").text());
    	},
    	/**
    	 * 加载公司下拉框
    	 */
    	loadSelData:function(){
    		var my = this;
    		$.ajax({
  	          type:'POST',
  	          url:serviceUrl+'finance/accountSetCompany/queryList'+'?time='+Math.random(),
  	          dataType:'json',
  	          contentType:'application/json;charset=utf-8',
  	          data:JSON.stringify('{"delflag":"0","sidx":"createDate","accountSetId":"'+my.dataPar.accountSetId+'"}'),
  	          success: function(json) {
  	        	  if(json.success){
  	        		  var data=json.result;
  	        		  for (var o in data){
    					  $("#companySct").append("<option value='"+data[o].companyId+"'>"+data[o].companyName+"</option>");  
  	        		  }
  	        	  }else{
  	        		//pop_tip_open("red","获取上级数据失败！");
  	        	  }
  	        	  //初始化数据
  	        	  my.loadPageData();
  	          },
  	        error: function(XMLHttpRequest, textStatus, errorThrown) {
  	        	if(XMLHttpRequest.status==0){
					my.loadSelData();
					return ;
				}
         		 pop_tip_open("red","服务异常,请联系管理员！");
             }
  	      });
    	},
    	/**
    	 * 加载业务下拉框
    	 */
    	loadBizObjectData:function(e_val){
    		var my = this;
    		$.ajax({
  	          type:'POST',
  	          url:serviceUrl+'finance/businessObject/queryList'+'?time='+Math.random(),
  	          dataType:'json',
  	          contentType:'application/json',
  	          data:JSON.stringify({"delflag":"0","status":"1","type":"1","appCode":my.dataPar.appCode}),//appCode 系统value
  	          success: function(json) {
  	        	  if(json.success){
  	        		  var data=json.result;
  	        		  $("#bizObjectId").empty();
  	        		  $("#bizObjectId").append("<option value=''>请选择</option>");
  	        		  for (var o in data){
  	        			  if(data[o].id==e_val){
  	        				  $("#bizObjectId").append("<option selected = 'selected' value='"+data[o].id+"'>"+data[o].name+"</option>");
	    				  }else{
	    					  $("#bizObjectId").append("<option value='"+data[o].id+"'>"+data[o].name+"</option>");  
	    				  }
  	        		  }
  	        	  }else{
  	        		//pop_tip_open("red","获取上级数据失败！");
  	        	  }
  	          },
  	          error: function(XMLHttpRequest, textStatus, errorThrown) {
         		 pop_tip_open("red","服务异常,请联系管理员！");
              }
  	      });
    	},
    	/**
    	 * 保存辅助核算
    	 */
    	toSaveAssType:function(){
    		var my = this;
    		var type = 'POST';
			//映射后台保存方法
    		var url=serviceUrl+"finance/assType/save";
    		if(my.dataPar.isup){
    			//映射后台修改方法
				url=serviceUrl+"finance/assType/update/"+$('#addAuxiliaryId').val();
				type = 'PUT';
    		}
			//请求方式
			//获取form表单元素并遍历赋值
			var dataArr= $("#modalFrom").serializeArray();
			var dataDto={};
			for(var i in dataArr){
				dataDto[dataArr[i].name]=dataArr[i].value;
			}
			dataDto.delflag=0;
    	    $.ajax({
    	       url:url,
    	       data:JSON.stringify(dataDto),
    	       type:type,
    	       contentType:'application/json',
    	       dataType:'JSON',
    	       success:function (resultData ) {
	               if(resultData.success) {
	            	   $('#assType').jqGrid().trigger("reloadGrid");
	            	   $("#addAuxiliary").modal("hide");
	                   pop_tip_open("green",'辅助核算保存成功！');
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
    	 * 获取tab财务系统公司id
    	 */
    	getTabComId:function(){
    		var my = this;
    		if(!my.dataPar.isup){
	    		//财务系统公司id
	    		this.dataPar.tabCompanyId = $('#selectCompany').val();
	    		$('#accountSetId').val(this.dataPar.tabCompanyId);
	    		//公司赋值
				$("#companyId").val($('#companySct').val());
				//id
				this.getUUID();
	    		$("#addAuxiliaryId").val(this.dataPar.uuid);
	    		my.loadBizObjectData();
    		}else{
    			var formData = my.dataPar.rowData;
    			//页面元素赋值
        		$("#modalFrom").find("input[name='id']").val(formData.id);
        		$("#modalFrom").find("input[name='companyId']").val(formData.companyId);
        		$("#modalFrom").find("input[name='bizObjectName']").val(formData.bizObjectName);
        		$("#modalFrom").find("input[name='accountSetId']").val(formData.accountSetId);
        		$("#modalFrom").find("input[name='assName']").val(formData.assName);
        		$("#modalFrom").find(":radio[name='synchro'][value="+formData.synchro+"]").attr("checked",true);
        		//加载业务对象
    			my.loadBizObjectData(formData.bizObjectId);
    			
        		$("#modalFrom").find("select[name='isDirectCode']").val(formData.isDirectCode);
        		$("#modalFrom").find("select[name='type']").val(formData.type);
    		}
    	},
    	/**
    	 * 加载从表数据
    	 */
    	loadMapingData:function(){
    		var my = this;
			if(my.dataPar.rowData.synchro==1){
				$('#sendNc').show();
				$('#sendNcRe').show();
				if(my.dataPar.rowData.assName=='合同编码'){
					$('#getCoContract').show();
				}else{
					$('#getCoContract').hide();
				}
			}else{
				$('#sendNc').hide();
				$('#sendNcRe').hide();
				$('#getCoContract').hide();
			}
    		if(!my.dataPar.isOne){
	    		jQuery("#assMapping").jqGrid({
	    	        url: serviceUrl+'finance/assMapping/queryListByBusinessObj'+'?time='+Math.random(),
	    	        ajaxGridOptions: { contentType: 'application/json' },
	    	        mtype : "POST",  
	    	        contentType : "application/json",  
	    	        datatype : "json",
	    	        postData:{
	    	        	assMappingId:my.dataPar.rowData==null?"null":my.dataPar.rowData.id,
	    	        	delflag:"0"
	    	        },
	    	        multiselect:false,
	    	        multiboxonly:false,
	    	        width:$('.page-div-width').width(),
	    	        height:($(window).height()-280)/2,
	    	        rownumbers:true,
	    	        jsonReader : {
	    	        	root:"result",
	    	            repeatitems : false,
	    	            id: function(obj){return parseInt(Math.random() * 10000000);}
	    	        },
	    	        colModel : [
	    	            {name : 'dataType',label : 'dataType',hidden:true,align : "center"},
	    	            {name : 'id',label : 'id',hidden:true,align : "center"},
	    	            {name : 'assMappingId',label : '辅助核算id',hidden:true,align : "center"},
	    	            {name : 'objectId',label : '业务对象id',hidden:true,align : "center"},
	    	            {name : 'assItemCode',label : '核算代码',align : "center",editable:true},
	    	            {name : 'assItemName',label : '核算名称',align : "center",editable:true},
	    	            {name : 'objectItemCode',label : '业务对象代码',align : "center"},
	    	            {name : 'objectItemName',label : '业务对象名称',align : "center"},
						{name : 'sendStatus',label : '推送状态',align : "center",formatter:"select",editoptions:{value:"0:未推送;1:推送成功;2:推送失败"}},
						{name : 'sendDate',label : '推送时间',align : "center"},
						{name : 'errmsg',label : '推送信息',align : "center"},
	    	        ],
	    	        rowNum : -1,//一页显示多少条
	    	        rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
	    	        viewrecords : true,
	    	        ondblClickRow:function(rowid){
	    	        	var rowData = $('#assMapping').jqGrid('getRowData',rowid);
	    	        	if(rowData.id==rowData.objectId){
	    	        		my.getUUID();
	    	        		rowData.id = my.dataPar.uuid;
	    	        		rowData.dataType = 1;
	    	        	}else if(rowData.dataType != 1){
	    	        		rowData.dataType = 3;
	    	        	}
	    	        	$('#assMapping').jqGrid('setRowData', rowid, rowData);//修改
	    	        	$('#assMapping').jqGrid('editRow',rowid, true);
	    	        	$('#cancelAdd').show();
	    	        },
	    	        gridComplete: function () {
	                	$.xljUtils.addGridScroll();
	                	my.dataPar.isOne = true;
	    	        },
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
	        	    		// pop_tip_open("red","查询数据失败！");
	        	    	}else{
	        	    		//success
	        	    	}
	         	    }
	    	        
	    	    });
    		}else{
    			$("#assMapping").jqGrid("setGridParam",{postData:{delflag:"0",assMappingId:my.dataPar.rowData==null?"null":my.dataPar.rowData.id},page:1}).trigger("reloadGrid");
    		}
    	},
    	/**
    	 * 添加数据
    	 */
    	toAddAssMap:function(){
    		var ids=$('#assType').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要修改的辅助核算类型行");
    			return;
    		}
			this.getUUID();
			var rowid = parseInt(Math.random() * 10000000);
			$("#assMapping").addRowData(rowid,
												{
												"id":this.dataPar.uuid,
												"assMappingId":this.dataPar.rowData.id,
												"objectId":"",
												"assItemCode":"",
												"assItemName":"",
												"objectItemCode":"",
												"objectItemName":"",
												"dataType":1
												}
										, "last"); 
			$('#assMapping').jqGrid('editRow', rowid, true);
    		//隐藏button
    		$('#cancelAdd').show();
    	},
    	/**
    	 * 取消新增操作
    	 */
    	toCancelAssMap:function(){
    		$('#assMapping').jqGrid().trigger("reloadGrid");
    		$('#cancelAdd').hide();
    	},
    	/**
    	 * 删除数据
    	 */
    	toDelAssMap:function(){
    		var ids=$('#assMapping').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要删除的行数据！");
    			return;
    		}
    		//添加删除数据
			var rowData = $('#assMapping').jqGrid('getRowData',ids);
			rowData.dataType = 2;
			this.dataPar.maintainData[this.dataPar.maintainData.length] = rowData;
			$("#assMapping").jqGrid("delRowData", ids);//删除
    	},
    	/**
    	 * 数组匹配id
    	 */
    	unique:function (n,arr){
    	    for(var i=0;i<arr.length;i++){
    	        if(n==arr[i].id){
    	            return true;
    	        }
    	    }
    	    return false;
    	},
    	/**
    	 * 保存
    	 */
    	toSaveAssMap:function(){
    		var my = this;
    		var rowData=null;
    		//映射后台保存方法
    		var url=serviceUrl+"finance/assMapping/saveAllAssMapp";
    		//请求方式
    		var type = 'POST';
    		
    		//从表数据
			var arr = $("#assMapping").jqGrid("getRowData");//不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响 
			var ids = $("#assMapping").jqGrid('getDataIDs');
		    var lastArr = [];
		    for(var i = 0;i<arr.length;i++){
		    	arr[i].sort = i+1;
		    	arr[i].delflag=0;
		    	var code=$('#'+ids[i]+'_assItemCode').val()==undefined?arr[i].assItemCode:$('#'+ids[i]+'_assItemCode').val();
		    	var name=$('#'+ids[i]+'_assItemName').val()==undefined?arr[i].assItemName:$('#'+ids[i]+'_assItemName').val();
		    	arr[i].assItemCode=code;
		    	arr[i].assItemName=name;
		    	if(arr[i].dataType==""){
		    		arr[i].dataType=3
		    	}else if(arr[i].dataType=="1"){
		    		arr[i].dataType=1
		    	}else if(arr[i].dataType=="2"){
		    		arr[i].dataType=2
		    	}else if(arr[i].dataType=="3"){
		    		arr[i].dataType=3
		    	}
		        if(arr[i].id!=arr[i].objectId){
		            lastArr.push(arr[i]);
		        }
		    }
		    for(var i=0;i<my.dataPar.maintainData.length;i++){
		    	if(my.dataPar.maintainData[i].dataType=="2"){
		    		my.dataPar.maintainData[i].dataType=2
		    	}
		    }
		    var obj = arr.concat(my.dataPar.maintainData);  //复制，var arr = arr1.slice(0)  
    	    $.ajax({
    	       url:url,
    	       data:JSON.stringify(obj),
    	       type:type,
    	       contentType:'application/json',
    	       dataType:'JSON',
    	       success:function (resultData ) {
	               if(resultData.success) {
                	   if(my.dataPar.lastSel){
                		   my.dataPar.lastSel = null;
                	   }
                	   if(my.dataPar.uuid){
                		   my.dataPar.uuid = null;
                	   }
                	   $('#assMapping').jqGrid().trigger("reloadGrid");
                	   //隐藏button
               		   $('#cancelAdd').hide();
               		   pop_tip_open("green",'表单变量保存成功！');
	               }else {
	                   pop_tip_open("red",'数据保存失败！');
	               }
    	       },
	       	  error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		  pop_tip_open("red","服务异常,请联系管理员！");
	          }
    	   });
    	},
		/**
		 * 推送到NC
		 */
		sendAssMappingNC:function(){
			var my = this;
			var id=my.dataPar.rowData.id;
			var ids = $("#assMapping").jqGrid('getDataIDs');
			if(!id||id.length==0) {
				pop_tip_open("blue","辅助核算类型为空！");
				return;
			}else if(ids.length==0){
				pop_tip_open("blue","核算对象数据为空！");
				return;
			}
			var postData = {
				assMappingId:id,
				sendStatus:"0",
				delflag:"0"
			}
			$.ajax({
				url:serviceUrl+"finance/assMapping/sendAssMappingNC"+'?time='+Math.random(),
				data:JSON.stringify(postData),
				type:'POST',
				contentType:'application/json',
				dataType:'JSON',
				success:function (resultData ) {
					if(resultData.success) {
						$('#assMapping').jqGrid().trigger("reloadGrid");
						pop_tip_open("green",'推送成功！');
					}else {
						pop_tip_open("red",'数据推送失败！');
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					pop_tip_open("red","服务异常,请联系管理员！");
				}
			});
		},
		/**
		 * 重新推送到NC
		 */
		sendAssMappingNCRe:function(){
			var ids=$('#assMapping').jqGrid('getGridParam','selrow');
			if(!ids||ids.length==0) {
				pop_tip_open("blue","请选择要重新推送的行数据！");
				return;
			}
			var senId = $('#assMapping').jqGrid('getRowData',ids).id;
			$.ajax({
				url:serviceUrl+"finance/assMapping/sendAssMappingNCRe/"+senId+'?time='+Math.random(),
				type:'GET',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						$('#assMapping').jqGrid().trigger("reloadGrid");
						pop_tip_open("green","推送数据成功！");
					}else{
						pop_tip_open("red","推送数据失败！");
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					pop_tip_open("red","服务异常,请联系管理员！");
				}
			});
		},
		/**
		 * 抽取成本合同
		 */
		getCoContract:function(){
			var my = this;
			var id=my.dataPar.rowData.id;
			var ids = $("#assMapping").jqGrid('getDataIDs');
			if(!id||id.length==0) {
				pop_tip_open("blue","辅助核算类型为空！");
				return;
			}
			var postData = {
				assMappingId:id,
				companyId:$('#companySct').val()==null?"null":$('#companySct').val(),
				sendStatus:"0",
				delflag:"0"
			}
			$.ajax({
				url:serviceUrl+"finance/assMapping/getCoContract"+'?time='+Math.random(),
				data:JSON.stringify(postData),
				type:'POST',
				contentType:'application/json',
				dataType:'JSON',
				success:function (resultData ) {
					if(resultData.success) {
						$('#assMapping').jqGrid().trigger("reloadGrid");
						pop_tip_open("green",'抽取数据成功！');
					}else {
						pop_tip_open("red",'抽取数据失败！');
					}
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
    		//modal事件
    		this.modalEvent();
    		//加载下拉框
    		this.loadSelData();
    		//页面加载完毕后更改grid宽高
            $(window).on('resize', function () {
            	$('#assType').jqGrid().setGridWidth($('.page-div-width').width(), true);
            	$('#assMapping').jqGrid().setGridWidth($('.page-div-width').width(), true);
            	//页面加载完毕后更改grid宽高
        		$('#assType').jqGrid().setGridHeight(($(window).height()-280)/2);
        		//页面加载完毕后更改grid宽高
        		$('#assMapping').jqGrid().setGridHeight(($(window).height()-280)/2);
            });
    	}
    };
    $(_assList.pageInit());
    window[_assList.ns] = _assList;
})(window,document);