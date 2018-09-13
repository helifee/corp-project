/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _entryList = {
    	ns : "_entryList",
    	dataPar:{
    		rowData:null,
    		rowDataBefore:null
    	},
    	/**
    	 * 初始化tree grid
    	 */
    	get_dataList:function(){
    		var my = this;
    		jQuery('#tree').jqGrid({
				url:hostUrl+"sys/quick/entry/queryTreeList"+'?time='+Math.random(),
				ajaxGridOptions: { contentType: 'application/json' },
	            mtype : "POST",  
	            treeGrid: true,
	            treeGridModel: "adjacency", 
	            ExpandColumn:"name",
	            datatype : "json", 
	            autowidth:true,
	            subGrid:true,
	            jsonReader : {
	                root:function(data){
	                   var arr=data.result;
	                   var arrList = new Array();
	                   var searchVal = $('#searchVal').val();
	                   var entryIds=null;
	                   if(searchVal){
	                	   for(var o in arr){
	                		   var resourceName = arr[o].resourceName==null?"":arr[o].resourceName;
	                		   if(arr[o].name.indexOf(searchVal)>-1||resourceName.indexOf(searchVal)>-1||arr[o].code.indexOf(searchVal)>-1){
	                			   if(arr[o].parentId=="0"){
	                				   entryIds+=arr[o].id;
	                			   }else{
	                				   entryIds+=","+arr[o].parentId+","+arr[o].id;
	                			   }
	                		   }
	                	   }
	                	   if(entryIds.length>0){
                			   for(var i in arr){
            					   if(entryIds.indexOf(arr[i].id)>-1){
            						   arrList[arrList.length]=arr[i];
            					   }
                			   }
	                	   }else{
	                		   return null; 
	                	   }
	                	   return arrList;
	                   }else{
	                	   return arr;
	                   }
	                   
	                },
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
						"name":"name",
						"index":"name",
						"sorttype":"string",
						"label":"名称",
						"align":"center",
						"cellattr": my.addCellAttr
					},{
						"name":"code",
						"index":"code",
						"sorttype":"string",
						"label":"编号",
						"align":"center"
					},{
						"name":"isInner",
						"index":"isInner",
						"sorttype":"string",
						"label":"是否内部",
						"align":"center",
						formatter:function(status){
		                	if(status=="0"){
		                		return "否";
		                	}else if(status=="1"){
		                		return "是";
		                	}else{
		                		return "";
		                	}
		                }
					},{
						"name":"resourceName",
						"index":"resourceName",
						"sorttype":"int",
						"label":"资源名称",
						"align":"center"
					},{
						"name":"url",
						"index":"url",
						"sorttype":"int",
						"label":"地址",
						"align":"center"
					},
					{name : 'linkIcon',label : '图标',width:60,align : "center",formatter:function(linkIcon){
                    	if(linkIcon){
                    		return '<img src="data:image/jpeg;base64,'+linkIcon+'" style="width:30px;height:30px">';
                    	}else{
                    		return "";
                    	}
                    }},
					{name : 'status',label : '状态',width:60,align : "center",formatter:function(status){
                    	if(status=="0"){
                    		return "禁用";
                    	}else if(status=="1"){
                    		return "启用";
                    	}else{
                    		return "";
                    	}
                    },cellattr: my.addCellAttr},
				],
				beforeRequest : function() {
					if(this.p.postData.parentid != null) {
						this.p.url = "";
						return;
					}
				},
				ondblClickRow:function(id){
	        	     window.open("entry_edit.html?id="+id);
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
                    //防止操作完成失去焦点
                    $.xljUtils.gridResizeFn();
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
    	 * 新增方法
    	 */
    	to_addEntry:function(){
    		var ids=$('#tree').jqGrid('getGridParam','selrow');
    		var url = "entry_edit.html";
    		if(ids) {
    			var rowData = $("#tree").getRowData(ids);
    			url = "entry_edit.html?addParentId="+rowData.id;
    		}
    		//打开维护快速入口页面
    		window.open(url);
    	},
    	/**
    	 * 修改方法
    	 */
    	to_updateEntry:function(){
    		var ids=$('#tree').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			 pop_tip_open("blue","请选择要修改的行！");
    			return;
    		}
    		//打开维护快速入口页面
    		window.open("entry_edit.html?id="+ids);
    	},
    	/**
    	 * 修改状态
    	 */
    	to_updateStatus:function(_val){
    		var ids=$('#tree').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			if(1==_val){
    				pop_tip_open("blue","请选择要启用的行！");
    			}else{
    				pop_tip_open("blue","请选择要禁用的行！");
    			}
    			return;
    		}
    		var rowData = $("#tree").jqGrid("getRowData",ids);
    		var  dataStatus="";
    		if(rowData.status=="启用"&&1==_val){
    			pop_tip_open("blue","该记录已启用！");
    			return;
    		}else if(rowData.status=="禁用"&&0==_val){
    			pop_tip_open("blue","该记录已禁用！");
    			return;
    		}
			rowData.status = _val;
			$("#tree").jqGrid('setRowData', ids, rowData);
    		$.ajax({
    			url:hostUrl+"sys/quick/entry/updateStatus/"+ids,
    			type:'PUT',
    			dataType:'JSON',
    			success:function (resultData ) {
    				if (resultData&&resultData.success) {
    					if(1==_val){
    						pop_tip_open("green","启用成功！");
    					}else if(0==_val){
    						pop_tip_open("green","禁用成功！");
    					}
    				}else{
						if(1==_val){
							pop_tip_open("green","启用失败！");
						}else if(0==_val){
							pop_tip_open("green","禁用失败！");
						}
					}
					$('#tree').jqGrid().trigger("reloadGrid");
				},
    			error: function(xhr, textStatus, errorThrown) {
    				pop_tip_open("red","服务异常,请联系管理员！");
					$('#tree').jqGrid().trigger("reloadGrid");
	            }
    		});
    	},
    	/**
    	 * 删除事件
    	 */
    	to_deleteEntry:function(){
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
    		var prevId = $("#tree #" + ids).prev()[0].id;
    		pop_text_open("blue",str,function(){
    			$.ajax({
    				url:hostUrl+"sys/quick/entry/deletePseudoBatch/"+delIds,
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
   	        				my.dataPar.rowData = $("#tree").jqGrid("getRowData",prevId);
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
    	 * 绑定按钮事件
    	 */
    	bind_event:function(){//事件绑定
    		var my = this;
    		//新增
    		$('#_toAdd').on('click',function(){
    			my.to_addEntry();
    		});
    		//修改
    		$('#_toUpdate').on('click',function(){
    			my.to_updateEntry();
    		});
    		//删除
    		$('#_todelete').on('click',function(){
    			my.to_deleteEntry();
    		});
    		//启用
    		$('#_toStart').on('click',function(){
    			my.to_updateStatus(1);
    		});
    		//禁用
    		$('#_toStop').on('click',function(){
    			my.to_updateStatus(0);
    		});
    		//上移
    		$('#_upBtn').on('click',function(){
    			my.upRulerSort(1);
    		});
    		//下移
    		$('#_downBtn').on('click',function(){
    			my.upRulerSort(2);
    		});
    	},
    	/**
    	 * 重新加载列表
    	 */
    	reloadGrid:function(id){
    		var my = this;
    		if(null!=id&&""!=id){
    			my.dataPar.rowData = {id:id};
    		}
    		//刷新grid
    	    $('#tree').jqGrid().trigger("reloadGrid");
    	},
    	/**
    	 * 装载过滤查询的条件
    	 */
    	searchDate:function(){
    		var corname=$("#corname").val();
    		$('#searchVal').val(corname);
    		$('#tree').jqGrid().trigger("reloadGrid");
    	},
    	/**
    	 * 渲染grid数据样式-改变颜色
    	 */
    	addCellAttr:function (rowId, val, rowObject, cm, rdata) {
	    	if(rowObject.status == "0" ){
    	        return "style='color:red'";
    	    }
    	},
    	/**
    	 * 模糊查询支持回车事件
    	 */
    	bindSearchDate:function(){
    		var my = this;
    		$("#corname").keyup(function(event){
    			if(event.keyCode ==13){
    				my.searchDate();
    			}
    		})
    	},
    	/**
    	 * 操作数据排列顺序
    	 * 上移1 下移2 置顶 3 置底4
    	 */
    	upRulerSort:function (type){
    		var ids=$('#tree').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			pop_tip_open("blue","请选择要操作的快速入口行！");
    			return;
    		}
    		$.ajax({
    			url:hostUrl+"sys/quick/entry/updateSort/"+ids,
    			type:'put',
    			dataType:'JSON',
    			contentType:"application/json",
    			data:'{"sortType":'+type+'}',
    			success:function (resultData ) {
    				if (resultData&&resultData.success) {
    					pop_tip_open("green","排序成功！");
    					$('#tree').jqGrid().trigger("reloadGrid");
    				}else{
    					pop_tip_open("red","排序失败！");
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
    		//绑定按钮事件
    		this.bind_event();
    		//支持回车事件
    		this.bindSearchDate();
    		//加载grid列表
    		this.get_dataList();
    		//页面加载完毕后更改grid宽高
    	    $.xljUtils.resizeNestedGrid();
    	}
    };
    $(_entryList.pageInit());
    window[_entryList.ns] = _entryList;
})(window,document);
