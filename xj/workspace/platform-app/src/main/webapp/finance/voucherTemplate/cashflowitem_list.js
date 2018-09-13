/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _gridList = {
    	ns : "_gridList",
    	dataPar:{
    		rowData:null,
    		rowDataBefore:null,
    		isup:false,
    		accountSetId:$('#selectCompany').val(),
    		appCode:_tabList.dataPar.appCode,
    		subjectContrast:{"SA":"科目对照","EX":"预算科目对照","CO":"成本科目对照"},
    		nodeLevel:null
    	},
    	/**
    	 * 初始化tree grid
    	 */
    	get_dataList:function(){
    		var my = this;
    		jQuery('#tree').jqGrid({
				url:hostUrl+"finance/cashFlowItem/queryTreeList"+'?time='+Math.random(),
				ajaxGridOptions: { contentType: 'application/json' },
	            mtype : "POST",
	            postData:{accountSetId:my.dataPar.accountSetId==null?"null":my.dataPar.accountSetId},
	            treeGrid: true,
	            treeGridModel: "adjacency", 
	            ExpandColumn:"name",
	            datatype : "json", 
	            autowidth:true,
	            subGrid:true,
	            jsonReader : {
	                root:"result",
	                repeatitems : false  
	            },
				colModel:[
					{
						"name":"id",
						"index":"id",
						"sorttype":"string",
						"key":true,
						"hidden":true,
					},{
						"name":"parentId",
						"index":"parentId",
						"sorttype":"string",
						"label":"parentId",
						"hidden":true,
					},{
						"name":"name",
						"index":"name",
						"sorttype":"string",
						"label":"名称",
						"align":"center"
					},{
						"name":"code",
						"index":"code",
						"sorttype":"string",
						"label":"编号",
						"align":"center"
					},{
						"name":"parentName",
						"index":"parentName",
						"sorttype":"int",
						"label":"所属上级",
						"align":"center"
					},{
						"name":"subjectCodes",
						"index":"subjectCodes",
						"sorttype":"int",
						"label":"科目编码",
						"hidden":true,
						"align":"center"
					},{
						"name":"nodeLevel",
						"index":"nodeLevel",
						"sorttype":"int",
						"label":"节点等级",
						"hidden":true,
						"align":"center"
					},{
						"name":"subjectNames",
						"index":"subjectNames",
						"sorttype":"int",
						"label":my.dataPar.subjectContrast[my.dataPar.appCode],
						"align":"center"
					}
				],
				ondblClickRow:function(id){
					my.to_updateData(id);
	            },
	            onSelectRow: function (rowid) {
        		    my.dataPar.rowData = $('#tree').jqGrid('getRowData',rowid);
                },
    	        onCellSelect: function(){
                	if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                		//重新选择行时清除上一次选中行的样式
                		$('#tree '+'#'+my.dataPar.rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
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
         		gridComplete:function(){
         			//重绘滚动条
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    //防止操作完成失去焦点
                	my.dataPar.rowDataBefore = my.dataPar.rowData;
                    if(my.dataPar.rowDataBefore!=null&&my.dataPar.rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#tree').setSelection(my.dataPar.rowDataBefore.id,true);
                    	$('#tree '+'#'+my.dataPar.rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
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
        	    			//pop_tip_open("blue",xhr.msg);
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
    	 * 新增的时候 自动的生成表单id
    	 */
    	getFormUUID:function (){
    		var my = this;
    		$.ajax({
    			type:'get',
    			url:hostUrl+'/generator/getGuuid'+'?time='+Math.random(),
    			success: function(data) {
    				$("#cashFlowModalFrom").find("input[name='id']").val(data.result);
    				$("#cashFlowModalFrom").find("input[name='accountSetId']").val(my.dataPar.accountSetId);
    			},
	       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    		   pop_tip_open("red","服务异常,请联系管理员！");
	            }
    		});
    	},
    	/**
    	 * 新增方法
    	 */
    	to_addData:function(){
    		if(null==this.dataPar.accountSetId||""==this.dataPar.accountSetId||undefined==this.dataPar.accountSetId){
    			pop_tip_open("blue","账套为空不能添加");
    			return;
    		}
    		//打开模态窗口
    		$("#flowModal").modal("show");
    		//修改titile
    		$('#fieldTitle').html("现金流量项目-新增");
    	},
    	/**
    	 * 修改方法
    	 */
    	to_updateData:function(ids){
    		var my = this;
    		if(null==ids||"null"==ids||""==ids){
    			ids=$('#tree').jqGrid('getGridParam','selrow');
    			if(!ids||ids.length==0) {
    				pop_tip_open("blue","请选择要修改的行！");
    				return;
    			}
    		}
    		my.dataPar.rowData = $('#tree').jqGrid('getRowData',ids);
    		$.ajax({
    	        type:'get',
    	        url:hostUrl+'finance/cashFlowItem/get/'+ids+'?time='+Math.random(),
    	        success: function(data) {
    	        	var fieldData=data.result;
    	        	if(fieldData){
    	        		//修改titile
    	        		$('#fieldTitle').html("现金流量项目-修改");
    	        		my.dataPar.isup = true;
    	        		fieldData.parentName = my.dataPar.rowData.parentName;
    	        		my.dataPar.rowData = fieldData;
    	        		//show modal
    	        		$("#flowModal").modal("show");
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
    	 * 删除事件
    	 */
    	to_deleteData:function(){
    		var my = this;
    		var delIds= new Array(); //定义一数组
    		var ids=$('#tree').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要删除的行！");
    			return;
    		}else{
    			var obj = $("#tree").jqGrid("getRowData");//获取所有数据
    			var idArr = ids.split(",");//已选删除节点
    			for (var i=0;i<idArr.length ;i++ ){
    				$(obj).each(function(n,item){//遍历所有数据
    					if(item.parentId.indexOf(idArr[i])>-1){//匹配删除节点的子节点
    						delIds[delIds.length]=item.id;//添加到删除id数组
    					}
    				});
    				delIds[delIds.length]=idArr[i];//添加已选择的删除id
    			} 
    		}
    		var str = "确认要删除该节点吗？";
    		if(delIds.length>1){
    			str = "该节点下存在"+(delIds.length-1)+"个子节点,确认删除吗？";
    		}
    		pop_text_open("blue",str,function(){
    			$.ajax({
    				url:hostUrl+"finance/cashFlowItem/deletePseudoBatch/"+delIds,
    				type:'DELETE',
    				dataType:'JSON',
    				success:function (xhr, textStatus  ) {
    					if (xhr){
   	        			 if(xhr.success) {
   	        				pop_tip_open("green","删除数据成功！");
   	        				for(var i=0;i<delIds.length;i++){
   	        					$("#tree").jqGrid("delRowData", delIds[i]);//删除
   	        				}
   	        				my.dataPar.rowData= null;
    						my.reloadGrid();
   		        		 }else{
   		        			 if(xhr.code=="50000"){
   		        				 pop_tip_open("red",xhr.msg);
   		        				 return;
   		        			 }
   		        			 pop_tip_open("red","数据删除失败！");
   		        		 }
   	        		 }else{
   	        			 pop_tip_open("red","服务异常,请联系管理员！");
   	        		 }
    				},
        			error: function(xhr, textStatus, errorThrown) {
        				pop_tip_open("red","服务异常,请联系管理员！");
    	            }
    			});
    		},function(){
    			return;
    		});
    	},
    	
    	/**
    	 * 清空上级
    	 */
    	empty:function (){
    		$("#cashFlowModalFrom").find("input[name='parentId']").val("");
    		$("#cashFlowModalFrom").find("input[id='parentName']").val("");
    	},
    	/**
    	 * 清空科目对照上级
    	 */
    	subjectEmpty:function (){
    		$("#cashFlowModalFrom").find("input[name='subjectCodes']").val("");
    		$("#cashFlowModalFrom").find("input[id='subjectNames']").val("");
    	},
    	/**
    	 * 科目回调函数
    	 * @param data
    	 */
    	subjectCallback:function (treeNodes,e) {
    		var treeIds = "";
        	var treeNames = "";
        	for(var i=0;i<treeNodes.length;i++){
        		var isParent = treeNodes[i].isParent;
        		if(!isParent){
	    			treeIds += treeNodes[i].id+",";
	    			treeNames += treeNodes[i].name+",";
        		}
        	}
			$("#cashFlowModalFrom").find("input[id='subjectCodes']").val(treeIds.substring(0, treeIds.length-1));
			$("#cashFlowModalFrom").find("input[id='subjectNames']").val(treeNames.substring(0, treeNames.length-1));
    	},
    	/**
    	 * 上级回调函数
    	 * @param data
    	 */
    	flowCallback:function (treeNode,e) {
    		var flowId = $("#cashFlowModalFrom").find("input[name='id']").val();
    		if(treeNode.id == flowId){
    			pop_tip_open("blue","上级组织不能选择自己");
				$("#cashFlowModalFrom").find("input[id='parentId']").val('');
				$("#cashFlowModalFrom").find("input[id='parentName']").val('');
    		}else{
    			_gridList.dataPar.nodeLevel=treeNode.nodeLevel;
    		}
    	},
    	/**
    	 * 保存
    	 */
    	save_form:function(){
			var my = this;
			//映射后台保存方法
			var url=hostUrl+"finance/cashFlowItem/save";
			//请求方式
			var type = 'POST';
			if(my.dataPar.isup){
    			//映射后台修改方法
				url=hostUrl+"finance/cashFlowItem/update/"+$('#cashFlowModalFrom').find("input[name='id']").val();
				type = 'PUT';
    		}
			//获取form表单元素并遍历赋值
			var dataArr= $("#cashFlowModalFrom").serializeArray();
			var dataDto={};
			for(var i in dataArr){
				if(dataArr[i].name=='parentId'){
					if(dataArr[i].value==null||dataArr[i].value==""||dataArr[i].value==undefined){
						dataArr[i].value = '0';
					}
				}
				dataDto[dataArr[i].name]=dataArr[i].value;
			}
			dataDto.delflag=0;
			//节点等级
			if("0"==dataDto.parentId){
				dataDto.nodeLevel = 1;
			}else{
				dataDto.nodeLevel = parseInt(my.dataPar.nodeLevel) +1;
			}
    	    $.ajax({
    	       url:url,
    	       data:JSON.stringify(dataDto),
    	       type:type,
    	       contentType:'application/json',
    	       dataType:'JSON',
    	       success:function (resultData ) {
	               if(resultData.success) {
	                   pop_tip_open("green",'保存成功！');
	                   //关闭模态窗口
	           		   $("#flowModal").modal("hide");
	           		   $("#tree").jqGrid("setGridParam",{postData:{accountSetId:my.dataPar.accountSetId==null?"null":my.dataPar.accountSetId},page:1}).trigger("reloadGrid");
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
    	 * 绑定按钮事件
    	 */
    	bind_event:function(){//事件绑定
    		var my = this;
    		//新增
    		$('#_toAdd').on('click',function(){
    			my.to_addData();
    		});
    		//修改
    		$('#_toUpdate').on('click',function(){
    			my.to_updateData();
    		});
    		//删除
    		$('#_todelete').on('click',function(){
    			my.to_deleteData();
    		});
    		//摸态窗口关闭事件
    		$('#flowModal').on('hidden.bs.modal', function () {
    			//重置表单
    			$('#modalData').empty();
    			my.dataPar.isup = false;
    			my.dataPar.nodeLevel = null;
			});
    		//摸态窗口打开事件
    		$('#flowModal').on('show.bs.modal', function () {
    			$('#modalData').load("cashflowitem_modal.html",function(){
    				$.xljUtils.customValidate();
    				if(!my.dataPar.isup){
    					//赋值parentId
        	    		var ids=$('#tree').jqGrid('getGridParam','selrow');
        	    		if(ids) {
        	    			var rowData = $("#tree").getRowData(ids);
        	    			$("#parentId").val(rowData.id);
        	    			$("#parentName").val(rowData.name);
        	    			my.dataPar.nodeLevel = rowData.nodeLevel;
        	    		}
        	    		//赋值id
        	    		my.getFormUUID();
    				}else{
    					var fieldData = my.dataPar.rowData;
    					my.dataPar.nodeLevel = fieldData.nodeLevel;
    					//页面元素赋值
    	        		$("#cashFlowModalFrom").find("input[name='id']").val(fieldData.id);
    	        		$("#cashFlowModalFrom").find("input[name='code']").val(fieldData.code);
    	        		$("#cashFlowModalFrom").find("input[name='name']").val(fieldData.name);
    	        		$("#cashFlowModalFrom").find("input[name='parentId']").val(fieldData.parentId);
    	        		$("#cashFlowModalFrom").find("input[id='parentName']").val(fieldData.parentName);
    	        		$("#cashFlowModalFrom").find("input[name='accountSetId']").val(fieldData.accountSetId);
						$("#cashFlowModalFrom").find("input[name='subjectCodes']").val(fieldData.subjectCodes);
						$("#cashFlowModalFrom").find("input[name='subjectNames']").val(fieldData.subjectNames);
    				}
    	    		//绑定modal树事件
    	    		my.modalSelEvent();
    			});
			});
    	},
    	modalSelEvent:function(){
    		var my = this;
    		//上级树插件
    		$('#parentName,#selectCashFlowItem').on('click', function() {
        		var urlBody = "finance/cashFlowItem/queryCashFlowItemList"+'?time='+Math.random();
        		var urlAll = hostUrl + urlBody;
        		$(this).xljSingleSelector({
        			title : '选择现金流量',//选择器标题，默认是'选择组织机构'
        			selectorType : 'company',//选择器类型，默认是组织机构选择器
        			immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
        			treeUrl : urlAll,
        			treeParam : {"nodeLevel":my.dataPar.nodeLevel,"accountSetId":my.dataPar.accountSetId==null?"null":my.dataPar.accountSetId},//生成zTree树的参数
        			targetId : 'parentId',//选择的数据的ID存储input域
        			targetName : 'parentName',//选择的数据的Name存储input域
        			ajaxType : 'POST', //ajax的type 默认为post
        			saveCallback:my.flowCallback,
        			isTransParam:true,
        			treeSettings : {
        				data : {
        					simpleData : {
        						enable : true,
        						idKey : 'id',
        						pIdKey : 'parentId'
        					}
        				},
        			}
        		});
        	});
    		//科目树插件
    		$('#subjectNames,#selectSubject').on('click', function() {
    			var urlBody = "finance/cashFlowItem/querySyncFinaCoData"+'?time='+Math.random();
        		var urlAll = hostUrl + urlBody;
        		var dataPost = {"appCode":my.dataPar.appCode,"accountSetId":my.dataPar.accountSetId==null?"null":my.dataPar.accountSetId};
        		$(this).xljSingleSelector({
        			title : '选择科目',//选择器标题，默认是'选择组织机构'
        			selectorType : 'company',//选择器类型，默认是组织机构选择器
        			immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
        			treeUrl : urlAll,
        			treeParam : dataPost,//生成zTree树的参数
        			targetId : 'subjectCodes',//选择的数据的ID存储input域
        			targetName : 'subjectNames',//选择的数据的Name存储input域
        			ajaxType : 'POST', //ajax的type 默认为post
        			saveCallback:my.subjectCallback,
        			treeSettings : {
        				data : {
        					simpleData : {
        						enable : true,
        						idKey : 'id',
        						pIdKey : 'parentId'
        					}
        				},
        				check: {
        					enable: true,
        					chkStyle: "checkbox",
        					chkboxType: { "Y": "ps", "N": "ps" }
                        }
        			}
        		});
        	});
    		//$('#subjectName').html(my.dataPar.subjectContrast[my.dataPar.appCode]+" :"); 
    	},
    	/**
    	 * 重新加载列表
    	 */
    	reloadGrid:function(){
    		//页面加载完毕后更改grid宽高
    	    $('#tree').jqGrid().trigger("reloadGrid");
    	},
    	/**
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		//表单初始验证
    		//$.xljUtils.customValidate();
    		//绑定按钮事件
    		this.bind_event();
    		//加载grid列表
    		this.get_dataList();
    		//页面加载完毕后更改grid宽高
    		$('#tree').jqGrid().setGridHeight($(window).height()-195);
    	}
    };
    $(_gridList.pageInit());
    window[_gridList.ns] = _gridList;
})(window,document);
