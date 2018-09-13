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
			fieldRowData:null
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
    	 * 保存数据项事件
    	 */
    	save_form:function(){
			var my = this;
			//映射后台保存方法
			var url=hostUrl+"finance/businessObject/saveMasterTable";
			//请求方式
			var type = 'POST';
			//获取form表单元素并遍历赋值
			var dataArr= $("#baseSupplierForm").serializeArray();
			var dataDto={};
			for(var i in dataArr){
				dataDto[dataArr[i].name]=dataArr[i].value;
			}
			dataDto.delflag=0;
			//从表数据
			var obj = $("#fieldList").jqGrid("getRowData");//不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响  
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
		    	arr[i].code = arr[i].code.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]});
		    	arr[i].name = arr[i].name.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]});
		    	arr[i].parentName = arr[i].parentName.replace(/[<>&"]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]});
		        if(! my.unique(arr[i].id,lastArr)){
		            lastArr.push(arr[i]);
		        }
		    }
			//规则列表赋值
			dataDto.fieldList = lastArr;
    	    $.ajax({
    	       url:url,
    	       data:JSON.stringify(dataDto),
    	       type:type,
    	       contentType:'application/json',
    	       dataType:'JSON',
    	       success:function (resultData ) {
	               if(resultData.success) {
	                   pop_tip_open("green",'保存成功！');
	                   if(!my.dataPar.upDataId){
	                	   my.dataPar.upDataId = $("#baseSupplierForm").find("input[name='id']").val();
		       		   }
	                   window.opener.location="javascript:_gridList.reloadGrid('"+dataDto.id+"');";
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
			window.opener.location="javascript:_gridList.reloadGrid();";
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
    		if(this.dataPar.upDataId){
    			$('#editTitle').html("业务对象-修改");
    			$(document).attr("title","业务对象-修改");//修改title值
    			//赋值给页面id元素
    			$("#baseSupplierForm").find("input[name='id']").val(this.dataPar.upDataId);
    		}else{
    			$('#editTitle').html("业务对象-新增");
    			$(document).attr("title","业务对象-新增");//修改title值
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
        	        url:hostUrl+'finance/businessObject/get/'+this.dataPar.upDataId+'?time='+Math.random(),
        	        success: function(data) {
        	        	var billData=data.result;
        	        	if(billData){
        	        		//页面元素赋值
        	        		$("select[name='appCode']").val(billData.appCode);
        	        		$("select[name='type']").val(billData.type);
        	        		$("input[name='code']").val(billData.code);
        	        		$("input[name='name']").val(billData.name);
        	        		$("input[name='fetchClass']").val(billData.fetchClass);
        	        		$("input[name='fetchMethod']").val(billData.fetchMethod);
        	        		$("input[name='callbackClass']").val(billData.callbackClass);
        	        		$("input[name='callbackMethod']").val(billData.callbackMethod);
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
    	 * 初始化数据项
    	 */
    	loadFieldData:function(){
    		var my = this;
    		var dataId = $("#baseSupplierForm").find("input[name='id']").val();
    		if(dataId){
    			jQuery("#fieldList").jqGrid({
    				url: hostUrl+'finance/businessField/getTreeByObjId'+'?time='+Math.random(),
    				ajaxGridOptions: { contentType: 'application/json' },
    				mtype : "POST",
    				treeGrid: true,
    		        treeGridModel: "adjacency",
    		        ExpandColumn:"nodeIcon",
    				datatype : "json", 
    				postData:{bizObjectId:dataId},
    				subGrid:true,
    				width:$('.container-all').width(),
    				height:"auto",
    				//width:$('.container-all').width(),
    				//height:"auto",
    				jsonReader : {
    					root:"result",
    					repeatitems : false
    				},
    				colModel : [ 
    				            {name : 'id',label : 'id',hidden:true,align : "center"},
    				            {name : 'parentId',label : 'parentId',hidden:true,align : "center"},
    				            {name : 'bizObjectId',label : '业务对象id',hidden:true,align : "center"},
    				            {name : 'dataType',label : '数据维护类型',hidden:true,align : "center"},
    				            {name : 'name',label : '名称',hidden:true,align : "center"},
    				            {name : 'nodeIcon',label : '名称',align : "center"},
    				            {name : 'code',label : '编号',align : "center"},
    				            {name : 'type',label : '数据类别',align : "center",formatter:"select",
    				            	editoptions:{value:"String:字符串;Integer:整数 ;Boolean:布尔;Double:浮点;Object:对象"}
    				            },
    				            {name : 'parentName',label : '所属上级',align : "center"},
    				            {name : 'isQuery',label : '是否查询',align : "center",formatter:"select",
    				            	editoptions:{value:"0:否;1:是"}
    				            },
    				            {name : 'display',label : '是否显示',align : "center",formatter:"select",
    				            	editoptions:{value:"0:否;1:是"}
    				            },
    				            {name : 'urlTypeFlag',label : '是否url类型标识',align : "center",formatter:"select",
    				            	editoptions:{value:"0:否;1:是"}
    				            }
    				            ],
		            viewrecords : true,
		            ondblClickRow:function(rowid){
		            	var rowData = $('#fieldList').jqGrid('getRowData',rowid);
		        		if(rowData.dataType==1){
		        			my.dataPar.fieldDataType = 1;
		        			my.dataPar.fieldRowData = rowData;
		        		}
		            	$("#eId").val(rowid);
		            	my.openModel("financefield_edit.html");
		            	$('#rulerTitle').html("业务数据项-修改");
		            },
		            onSelectRow: function () {
	                	var rowId=$('#fieldList').jqGrid("getGridParam","selrow");
	        		    my.dataPar.rowData = $('#fieldList').jqGrid('getRowData',rowId);
	                },
	    	        onCellSelect: function(){
	                	if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
	                		//重新选择行时清除上一次选中行的样式
	                		$('#fieldList').find("td").removeClass("ui-state-highlight"); 
	                	}
	                },
	                treeReader:{
	          		   level_field: "level",
	          		   parent_id_field: "parentId",
	          		   leaf_field: "isLeaf",
	          		   expanded_field: "expanded",
	          		   left_field:"lft",
	          		   right_field: "rgt"
	          		},
	                gridComplete: function () {
	                	//$(window).resize();
	                    //$.xljUtils.addGridScroll();
	                    //重绘滚动条
	                    //$.xljUtils.gridResizeFn();
	                	my.dataPar.rowDataBefore = my.dataPar.rowData;
	                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
	                    	//添加回显选中行样式
	                    	$('#fieldList').setSelection(my.dataPar.rowDataBefore.id,true);
	                    	$('#fieldList '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
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
    				$("#baseSupplierForm").find("input[name='id']").val(data.result);
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
    		$("#modalData").load(url);
    		$("#myModal").modal("show");
    	},
    	/**
    	 * 添加数据项
    	 */
    	toAddData:function (){
    		//打开维护规则页面(摸态框方式)
    		var ids=$('#fieldList').jqGrid('getGridParam','selrow');
    		var url = "financefield_edit.html";
    		if(ids) {
    			var rowData = $("#fieldList").getRowData(ids);
    			$("#addParentId").val(rowData.id);
    		}
    		//打开新增页面
    		this.openModel(url);
    		//修改titile
    		$('#fieldTitle').html("业务数据项-新增");
    		
    	},
    	/**
    	 * 修改数据项
    	 */
    	toUpData:function (){
    		var ids=$('#fieldList').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要修改的数据项行！");
    			return;
    		}
    		
    		var rowData = $('#fieldList').jqGrid('getRowData',ids);
    		if(rowData.dataType==1){
    			this.dataPar.fieldDataType = 1;
    			this.dataPar.fieldRowData = rowData;
    		}
    		//打开维护规则页面(摸态框方式)
    		$("#eId").val(ids);
    		this.openModel("financefield_edit.html");
    		$('#fieldTitle').html("业务数据项-修改");
    	},
    	/**
    	 * 删除数据项(伪删除)
    	 */
    	toDeleteData:function (){
    		var my = this;
    		var ids=$('#fieldList').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要删除数据项的行！");
    			return;
    		}
    		var prevId = $("#fieldList #" + ids).prev()[0].id;
    		pop_text_open("blue",'确认要删除该节点数据吗？',function(){
	    		//从表数据
				var arr = $("#fieldList").jqGrid("getRowData");
				for(var i = 0;i<arr.length;i++){
					if(arr[i].parentId == ids){
						var rowData = $('#fieldList').jqGrid('getRowData',arr[i].id);
						rowData.dataType = 2;
						my.dataPar.maintainData[my.dataPar.maintainData.length] = rowData;
						$("#fieldList").jqGrid("delRowData", arr[i].id);//删除
					}
				}
	    		//添加删除数据
				var rowData = $('#fieldList').jqGrid('getRowData',ids);
				rowData.dataType = 2;
				my.dataPar.maintainData[my.dataPar.maintainData.length] = rowData;
	    		//grid删除操作
				$("#fieldList").jqGrid("delRowData", ids);//删除
				//选中上一行
				my.dataPar.rowData = $("#fieldList").jqGrid("getRowData",prevId);
				if(my.dataPar.rowData!=null&&my.dataPar.rowData!='undefined'){
                	//添加回显选中行样式
                	$('#fieldList').setSelection(my.dataPar.rowData.id,true);
                	$('#fieldList '+'#'+my.dataPar.rowData.id).find("td").addClass("ui-state-highlight"); 
                }
			},function(){});
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
    		//加载编码规则
    		this.loadFieldData();
    		$("#fieldList").jqGrid('sortableRows');
    		//初始化grid宽度
    		$(window).on('resize',function(){
    			$('#fieldList').jqGrid().setGridWidth($('.container-all').width());
    		});
    		$("#fieldList").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });  //强制隐藏横向滚动条
    		$("#fieldList").closest(".ui-jqgrid-bdiv").css({ "overflow-y" : "hidden" });  //强制隐藏竖向滚动条
    	}
    };
    $(_DataEdit.pageInit());
    window[_DataEdit.ns] = _DataEdit;
})(window,document);