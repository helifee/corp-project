/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _billEdit = {
    	ns : "_billEdit",
    	dataPar:{
    		upBillId:"",
    		addBillId:"",
			rowData:null,
			rowDataBefore:null,
			maintainData:[],
			rulerDataType:0,
			rulerRowData:null
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
    	 * 保存规则编号类型事件
    	 */
    	save_form:function(){
			var my = this;
			//映射后台保存方法
			var url=hostUrl+"sys/num/bill/saveBillAndRuler";
			//请求方式
			var type = 'POST';
			//获取form表单元素并遍历赋值
			var BillArr= $("#numBillFrom").serializeArray();
			var BillDto={};
			for(var i in BillArr){
				BillDto[BillArr[i].name]=BillArr[i].value;
			}
			BillDto.delflag=0;
			//从表数据
			var obj = $("#list3").jqGrid("getRowData");//不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响  
		    var arr = obj.concat(my.dataPar.maintainData);  //复制，var arr = arr1.slice(0)  
		    var lastArr = [];
		    for(var i = 0;i<arr.length;i++){
		    	arr[i].sort = i+1;
		    	arr[i].delflag=0;
		    	if(arr[i].dataType==""){
		    		arr[i].dataType=3
		    	}else if(arr[i].dataType=="1"){
		    		arr[i].dataType=1
		    	}else if(arr[i].dataType=="3"){
		    		arr[i].dataType=3
		    	}
		    	arr[i].code = arr[i].code.replace(/[<>&"\\']/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;','\\':'\\\\','\'':'\\\''}[c]});
		    	arr[i].name = arr[i].name.replace(/[<>&"\\']/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;','\\':'\\\\','\'':'\\\''}[c]});
		    	arr[i].serialFormat = arr[i].serialFormat.replace(/[<>&"\\']/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;','\\':'\\\\','\'':'\\\''}[c]});
		    	arr[i].serialLibrary = arr[i].serialLibrary.replace(/[<>&"\\']/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;','\\':'\\\\','\'':'\\\''}[c]});
		    	arr[i].connectorSymbol = arr[i].connectorSymbol.replace(/[<>&"\\']/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;','\\':'\\\\','\'':'\\\''}[c]});
		    	arr[i].remark = arr[i].remark.replace(/[<>&"\\']/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;','\\':'\\\\','\'':'\\\''}[c]});
		        if(! my.unique(arr[i].id,lastArr)){
		            lastArr.push(arr[i]);
		        }
		    }
			//规则列表赋值
			BillDto.rulerList = lastArr;
    	    $.ajax({
    	       url:url,
    	       data:JSON.stringify(BillDto),
    	       type:type,
    	       contentType:'application/json',
    	       dataType:'JSON',
    	       success:function (resultData ) {
	               if(resultData.success) {
	                   pop_tip_open("green",'规则类型保存成功！');
	                   if(!my.dataPar.upBillId){
	                	   my.dataPar.upBillId = $("#numBillFrom").find("input[name='id']").val();
		       		   }
	                   window.opener.location="javascript:_billList.reloadGrid('"+BillDto.id+"');";
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
    		//保存按钮绑定事件
    		$('#saveAddForm').on('click',function(){
    			my.save_form('continue');
    		});
    		//关闭按钮绑定事件
    		$('#_close').on('click',function(){
    			my.to_list();
    		});
    		//摸态窗口关闭事件
    		$('#myModal').on('hidden.bs.modal', function () {
    			$("#modalRuler").empty();//清空div
    			$("#eId").val("");//ruler主键清空,防止明细和维护页面冲突
    			$('#confirmData').unbind();//移除所有事件
			});
    	},
    	/**
    	 * 获取id值并赋值给页面id
    	 */
    	setBillId:function(){
    		//获取id值
    		this.dataPar.upBillId=$.xljUtils.getUrlParam('id');
    		if(this.dataPar.upBillId){
    			$('#billTitle').html("编码规则类别-修改");
    			$(document).attr("title","编码规则类别-修改");//修改title值
    			//赋值给页面id元素
    			$("#numBillFrom").find("input[name='id']").val(this.dataPar.upBillId);
    		}else{
    			$('#billTitle').html("编码规则类别-新增");
    			$(document).attr("title","编码规则类别-新增");//修改title值
    			//生成uuid并赋值页面id元素
    			this.getUUID();
    		};
    	},
    	/**
    	 * 初始化页面数据
    	 */
    	initBillFrom:function(){
    		if(this.dataPar.upBillId){
    			$.ajax({
        	        type:'get',
        	        url:hostUrl+'sys/num/bill/get/'+this.dataPar.upBillId+'?time='+Math.random(),
        	        success: function(data) {
        	        	var billData=data.result;
        	        	if(billData){
        	        		//页面元素赋值
        	        		$("input[name='code']").val(billData.code);
        	        		$("input[name='name']").val(billData.name);
        	        		$("input[name='connector']").val(billData.connector);
        	        		$(":radio[name='status'][value="+billData.status+"]").attr("checked",true);
        	        		$("textarea[name='remark']").html(billData.remark);
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
    	 * 初始化编码规则数据
    	 */
    	loadRulerData:function(){
    		var my = this;
    		var billId = $("#numBillFrom").find("input[name='id']").val();
    		if(billId){
    			jQuery("#list3").jqGrid({
    				url: hostUrl+'sys/num/ruler/getRuleListByBillId'+'?time='+Math.random(),
    				ajaxGridOptions: { contentType: 'application/json' },
    				mtype : "POST",  
    				contentType : "application/json",  
    				datatype : "json", 
    				postData:{id:billId},
    				autowidth:true,
    				width:$('.container-all').width(),
    				height:"auto",
    				rownumbers:true,
    				rowNum : -1,//一页显示多少条
    				rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
    				jsonReader : {
    					root:"result",
    					repeatitems : false
    				},
    				colModel : [ 
    				            {name : 'id',label : '序号',hidden:true,align : "center"},
    				            {name : 'billId',label : '编码规则id',hidden:true,align : "center"},
    				            {name : 'dataType',label : '数据维护类型',hidden:true,align : "center"},
    				            {name : 'code',label : '编号',align : "center"},
    				            {name : 'name',label : '名称',align : "center"},
    				            {name : 'type',label : '规则类别',align : "center",formatter:"select",
    				            	editoptions:{value:"fixedSerial:固定字串;addReduceSerial:自增（减）数字 字串;enumSerial:枚举字串;dateSerial:时间字串;userInfoSerial:当前用户字串;formSerial:表单;dateSerialNumber:日期流水"}
    				            },
    				            {name : 'isOut',label : '是否输出',align : "center",formatter:"select",
    				            	editoptions:{value:"0:否;1:是"}
    				            },
    				            {name : 'dateFormat',label : '日期格式',align : "center"},
    				            {name : 'initVar',label : '初始值',align : "center"},
    				            {name : 'stepLength',label : '步长',align : "center"},
    				            {name : 'initSerial',label : '起步值',align : "center"},
    				            {name : 'maxSerial',label : '最大值',align : "center"},
    				            {name : 'serialFormat',label : '序号格式',align : "center"},
    				            {name : 'serialLibrary',label : '枚举库',align : "center"},
    				            {name : 'connectorSymbol',label : '连接符',align : "center"},
    				            {name : 'serialNumberLength',label : '流水号位数',align : "center"},
    				            {name : 'serialNumberType',label : '流水类型',align : "center",formatter:"select",
    				            	editoptions:{value:"4:年;6:月;8:日"}},
    				            {name : 'sort',label : '排序号',hidden:true,align : "center"},
    				            {name : 'delflag',label : '删除',hidden:true,align : "center"},
    				            {name : 'remark',label : '备注',align : "center"}
    				            ],
		            viewrecords : true,
		            ondblClickRow:function(rowid){
		            	var rowData = $('#list3').jqGrid('getRowData',rowid);
//		        		if(rowData.dataType==1){
//		        			my.dataPar.rulerDataType = 1;
		        			my.dataPar.rulerRowData = rowData;
//		        		}
		            	$("#eId").val(rowid);
		            	my.openModel("ruler_edit.html");
		            	$('#rulerTitle').html("编码规则-修改");
		            },
		            onSelectRow: function () {
	                	var rowId=$('#list3').jqGrid("getGridParam","selrow");
	        		    my.dataPar.rowData = $('#list3').jqGrid('getRowData',rowId);
	                },
	    	        onCellSelect: function(){
                		$('#list3').find("td").removeClass("ui-state-highlight"); 
	                },
	                gridComplete: function () {
	                	my.dataPar.rowDataBefore = my.dataPar.rowData;
	                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
	                    	//添加回显选中行样式
	                    	$('#list3').setSelection(my.dataPar.rowDataBefore.id,true);
	                    	$('#list3 '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
	                    }
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
		    					//pop_tip_open("blue",xhr.msg);
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
    	 * describe:新增的时候 自动的生成表单id
    	 */
    	getUUID:function (){
    		var my = this;
    		$.ajax({
    			type:'get',
    			url:hostUrl+'/generator/getGuuid'+'?time='+Math.random(),
    			async:false,
    			success: function(data) {
    				$("#numBillFrom").find("input[name='id']").val(data.result);
    			},
	       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		   pop_tip_open("red","服务异常,请联系管理员！");
	            }
    		});
    	},
    	/**
    	 * 打开模态窗口
    	 */
    	openModel:function(url){
    		$("#modalRuler").load(url);
    		$("#myModal").modal("show");
    	},
    	/**
    	 * 添加编码规则
    	 */
    	toAddRuler:function (){
    		//打开维护规则页面(摸态框方式)
    		this.openModel("ruler_edit.html");
    		$('#rulerTitle').html("编码规则-新增");
    	},
    	/**
    	 * 修改编码规则
    	 */
    	toUpRuler:function (){
    		var ids=$('#list3').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要修改的规则行！");
    			return;
    		}
    		
    		var rowData = $('#list3').jqGrid('getRowData',ids);
//    		if(rowData.dataType==1){
//    			this.dataPar.rulerDataType = 1;
    			this.dataPar.rulerRowData = rowData;
//    		}
    		//打开维护规则页面(摸态框方式)
    		$("#eId").val(ids);
    		this.openModel("ruler_edit.html");
    		$('#rulerTitle').html("编码规则-修改");
    	},
    	/**
    	 * 删除编码规则(伪删除)
    	 */
    	toDeleteRuler:function (){
    		var my = this;
    		var ids=$('#list3').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要删除规则的行！");
    			return;
    		}
    		var prevId = $("#list3 #" + ids).prev()[0].id;
    		//添加删除数据
			var rowData = $('#list3').jqGrid('getRowData',ids);
			rowData.dataType = 2;
			this.dataPar.maintainData[this.dataPar.maintainData.length] = rowData;
			$("#list3").jqGrid("delRowData", ids);//删除
    		//grid删除操作
			if(prevId!=""){
				$('#list3').setSelection(prevId,true);
				$('#list3 '+'#'+prevId).find("td").addClass("ui-state-highlight");
			}
    	},
    	/**
    	 * 操作数据排列顺序
    	 * 上移1 下移2 置顶 3 置底4
    	 */
    	upRulerSort:function (type){
    		var ids=$('#list3').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要操作的规则行！");
    			return;
    		}
    		if(this.dataPar.maintainData.length>0){
    			pop_tip_open("blue","存在未保存数据,请先保存数据！");
    			return;
    		}
    		var rowData = $('#list3').jqGrid('getRowData',ids);
			$("#list3").addRowData(ids,rowData, "last");//新增
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
    		jQuery("#list3").jqGrid('sortableRows');
			//初始化grid宽度
    		$(window).on('resize',function(){
    			$('#list3').jqGrid().setGridWidth($('.container-all').width());
    		});
			$("#list3").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });  //强制隐藏横向滚动条
			$("#list3").closest(".ui-jqgrid-bdiv").css({ "overflow-y" : "hidden" });  //强制隐藏竖向滚动条
			setTimeout(function(){
				$(".nicescroll-rails").empty();
			},100);
		}
    };
    $(_billEdit.pageInit());
    window[_billEdit.ns] = _billEdit;
})(window,document);