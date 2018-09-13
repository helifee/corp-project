/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _tableList = {
    	ns : "_tableList",
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
				url:serviceUrl+"oa/office/officeHouse/queryTreeGridList"+'?time='+Math.random(),
				ajaxGridOptions: { contentType: 'application/json' },
	            mtype : "POST",  
	            treeGrid: true,
	            treeGridModel: "adjacency", 
	            ExpandColumn:"typeName",
	            datatype : "json", 
	            autowidth:true,
	            subGrid:true,
	            jsonReader : {
	                root:function(data){
						//模糊查询
						var name=$('#searchVal').val();// 获取名称
						var array="";
						var arr=data.result;
						var newArr = new Array();
						if(name){
							for(var o in arr){
								if(arr[o].typeName.indexOf(name)>-1||arr[o].numberCode.indexOf(name)>-1){
									array+=arr[o].sortNumber+",";
								}
							}
							if(array.length>0){
								for(var i in arr){
									if(array.indexOf(arr[i].sortNumber)>-1){
										arr[i].expanded=true;
										newArr[newArr.length] = arr[i];
									}else{
										arr[i].expanded=false;
									}
								}
								return newArr;
							}else{
								return null;
							}
						}else{
							for(var o in arr){
								if(my.dataPar.rowData&&my.dataPar.rowData.prefixId.indexOf(arr[o].id)>-1){
									arr[o].expanded=true;
								}
							}
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
						"name":"typeName",
						"index":"typeName",
						"sorttype":"string",
						"label":"名称",
						"align":"center",
						"cellattr": my.addCellAttr
					},{
						"name":"numberCode",
						"index":"numberCode",
						"sorttype":"string",
						"label":"编号",
						"align":"center"
					},{
						"name":"sortNumber",
						"index":"sortNumber",
						"sorttype":"string",
						"label":"排序",
						"hidden":true,
						"align":"center"
					},{
						"name":"prefixId",
						"index":"prefixId",
						"sorttype":"string",
						"label":"prefixId",
						"hidden":true,
						"align":"center"
					},{
						"name":"typeParentName",
						"index":"typeParentName",
						"sorttype":"int",
						"hidden":true,
						"label":"父级分类",
						"align":"center"
					},{
						"name":"realName",
						"index":"realName",
						"sorttype":"int",
						"label":"创建人",
						"hidden":true,
						"align":"center"
					},{name : 'state',label : '状态',width:60,align : "center",formatter:function(status){
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
					if(this.p.postData.parentNodeId != null) {
						this.p.url = "";
						return;
					}
				},
				ondblClickRow:function(id){
	        	     window.open("officeHouse_edit.html?id="+id);
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
         		   parent_id_field: "parentNodeId",
         		   leaf_field: "isLeaf",
         		   expanded_field: "expanded",
         		   left_field:"lft",
         		   right_field: "rgt"
         		},
         		gridComplete:function(){
                    $.xljUtils.addGridScroll();
                    //重绘滚动条
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
    	 * 新增方法
    	 */
    	to_addEntry:function(){
    		var ids=$('#tree').jqGrid('getGridParam','selrow');
    		var url = "officeHouse_edit.html";
    		if(ids) {
    			var rowData = $("#tree").getRowData(ids);
    			url = "officeHouse_edit.html?addParentId="+rowData.id+"&addParentName="+encodeURI(encodeURI(rowData.typeName));
				this.dataPar.rowData.prefixId = rowData.prefixId;
			}
    		//打开维护用品分类页面
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
			var rowData = $("#tree").getRowData(ids);
			this.dataPar.rowData.prefixId = rowData.prefixId;
			//打开维护用品分类页面
    		window.open("officeHouse_edit.html?id="+ids);
    	},
    	/**
    	 * 修改状态
    	 */
    	to_updateStatus:function(_val){
    		var my = this;
    		var ids=$('#tree').jqGrid('getGridParam','selrow');
    		if(!ids||ids.length==0) {
    			if(1==_val){
    				pop_tip_open("blue","请选择要启用的行！");
    			}else{
    				pop_tip_open("blue","请选择要禁用的行！");
    			}
    			return;
    		}else{
    			var rowData = $("#tree").jqGrid("getRowData",ids);
    			if(rowData.state=="启用"&&1==_val){
        			pop_tip_open("blue","该记录已启用！");
        			return;
        		}else if(rowData.state=="禁用"&&0==_val){
        			pop_tip_open("blue","该记录已禁用！");
        			return;
        		}
    			var delIds= new Array(); //定义一数组
    			var obj = $("#tree").jqGrid("getRowData");//获取所有数据
    			var idArr = ids.split(",");//已选节点
    			for (var i=0;i<idArr.length ;i++ ){
    				$(obj).each(function(n,item){//遍历所有数据
    					if(item.prefixId.indexOf(idArr[i])>-1){//匹配节点的子节点
    						delIds[delIds.length]=item.id;//添加到id数组
    					}
    				});
    				//delIds[delIds.length]=idArr[i];//添加已选择的id
    			} 
				var bl = true;
				var str = "";
				if(delIds.length>1&&1==_val){
					str = "该节点下存在子节点,确认启用吗？";
					pop_text_open("blue",str,function(){
						bl = true;
						var data = {'id':ids,'state':_val,'isRelation':bl,"ids":delIds};
						my.updateStatus(data);
					},function(){});
				}else{
					var data = {'id':ids,'state':_val,'isRelation':bl,"ids":delIds};
					my.updateStatus(data);
				}
				my.dataPar.rowData = rowData;
			}
    	},
    	/**
    	 * 修改状态-访问后台
    	 */
    	updateStatus:function(data){
    		$.ajax({
    			url:serviceUrl+"oa/office/officeHouse/updateStatus",
    			type:'POST',
    			dataType:'JSON',
				contentType:'application/json',
				data:JSON.stringify(data),
    			success:function (resultData ) {
    				if (resultData&&resultData.success) {
    					if(1==data.state){
    						pop_tip_open("green","启用成功！");
    					}else if(0==data.state){
    						pop_tip_open("green","禁用成功！");
    					}
						$('#tree').jqGrid().trigger("reloadGrid");
    				}else{
    					if(1==data.state){
    						pop_tip_open("green","启用失败！");
    					}else if(0==data.state){
    						pop_tip_open("green","禁用失败！");
    					}
    				}
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
    					if(item.prefixId.indexOf(idArr[i])>-1){//匹配删除节点的子节点
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
    				url:serviceUrl+"oa/office/officeHouse/deletePseudoBatch/"+delIds,
    				type:'DELETE',
    				dataType:'JSON',
    				success:function (xhr, textStatus  ) {
    					if (xhr){
   	        			 if(xhr.success) {
   	        				pop_tip_open("green","删除数据成功！");
   	        				my.dataPar.rowData= null;
   	        				my.dataPar.rowData = $("#tree").jqGrid("getRowData",prevId);
   	        				for(var i=0;i<delIds.length;i++){
   	        					$("#tree").jqGrid("delRowData", delIds[i]);//删除
   	        				}
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
    		if(null!=id&&""!=id&&my.dataPar.rowData){
    			my.dataPar.rowData.id = id;
    		}
    	    $('#tree').jqGrid().trigger("reloadGrid");
    	},
    	/**
    	 * 装载过滤查询的条件
    	 */
    	searchDate:function(){
    		var corname=$("#corname").getInputVal();
    		$('#searchVal').val(corname);
    		$('#tree').jqGrid().trigger("reloadGrid");
    	},
    	/**
    	 * 渲染grid数据样式-改变颜色
    	 */
    	addCellAttr:function (rowId, val, rowObject, cm, rdata) {
	    	if(rowObject.state == "0" ){
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
    			pop_tip_open("blue","请选择要操作的用品分类行！");
    			return;
    		}
    		$.ajax({
    			url:serviceUrl+"oa/office/officeHouse/updateSort/"+ids,
    			type:'put',
    			dataType:'JSON',
    			contentType:"application/json",
    			data:'{"sortType":'+type+'}',
    			success:function (resultData ) {
    				if (resultData&&resultData.success) {
    					pop_tip_open("green",resultData.msg);
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
		 * 获取菜单按钮权限
		 * @returns {*}
         */
		getOperationAuthorition:function () {
			var menuList;
			$.ajax({
				type: 'GET',
				url: serviceUrl + 'sys/authentication/getUserAuthenticationOperation?t_='+new Date().getTime()+'&appCode=OA&menuCode=YPFL',
				dataType: 'json',
				//contentType: 'application/json',
				async: false,
				//data: JSON.stringify(postdata),
				success: function (data) {
					if (data.success) {
						menuList =  data.result;

					} else {
						$.xljUtils.tip('red', '获取按钮权限失败！');
					}
				},
				error: function (xhr, textStatus, errorThrown) {
					$.xljUtils.tip('red', '获取按钮权限失败！');
				}
			});
			if($.inArray("_toAdd", menuList)>-1){
				$('#_toAdd').show();
			}
			if($.inArray("_toUpdate", menuList)>-1){
				$('#_toUpdate').show();
			}
			if($.inArray("_todelete", menuList)>-1){
				$('#_todelete').show();
			}
			if($.inArray("_upBtn", menuList)>-1){
				$('#_upBtn').show();
			}
			if($.inArray("_downBtn", menuList)>-1){
				$('#_downBtn').show();
			}
			if($.inArray("_toStart", menuList)>-1){
				$('#_toStart').show();
			}
			if($.inArray("_toStop", menuList)>-1){
				$('#_toStop').show();
			}
		},
    	/**
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		this.getOperationAuthorition();
    		//绑定按钮事件
    		this.bind_event();
    		//支持回车事件
    		this.bindSearchDate();
			$('#corname').inputPlaceholder();
    		//加载grid列表
    		this.get_dataList();
    		//页面加载完毕后更改grid宽高
    	    $.xljUtils.resizeNestedGrid();
    	}
    };
    $(_tableList.pageInit());
    window[_tableList.ns] = _tableList;
})(window,document);