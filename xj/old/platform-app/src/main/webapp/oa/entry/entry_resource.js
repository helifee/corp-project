/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _resourceList = {
    	ns : "_resourceList",
    	dataPar:{modalType:""},
    	/**
    	 * 加载数据
    	 */
    	get_dataList:function(){
    		var my = this;
    		jQuery('#resourcelist').jqGrid({
				url:hostUrl+"/sys/res/resource/getResourceTreeAll"+'?time='+Math.random(),
				ajaxGridOptions: { contentType: 'application/json' },
	            mtype : "POST",
	            postData:{appStatus:1,menuStatus:1,appDelFlag:0,menuDelFlag:0},
	            treeGrid: true,
	            treeGridModel: "adjacency", 
	            ExpandColumn:"name",
	            datatype : "json", 
	            height:$(window).height()/3,
	            subGrid:true,
	            autowidth:true,
	            jsonReader : {
	                root:function (data) { return my.formateTreeView(data);},
	                repeatitems : false  
	            },
				colModel:[
					{
						"name":"id",
						"index":"id",
						"sorttype":"string",
						"key":true,
						"hidden":true,
						"width":20
					},{
						"name":"name",
						"index":"name",
						"sorttype":"string",
						"label":"名称",
						"align":"center",
						"width":120
					},{
						"name":"code",
						"index":"code",
						"sorttype":"string",
						"label":"编号",
						"align":"center",
						"width":120
					},{
						"name":"url",
						"index":"url",
						"sorttype":"String",
						"label":"url",
						"align":"center",
						"width":240
					},
				],
				//获取数据后调用函数
				beforeRequest : function() {},
				//双击选择方法
				ondblClickRow:function(id){
					var rowData = $("#resourcelist").jqGrid("getRowData",id);
					_entryEdit.confirmResource(rowData);
	            },
	            //模糊查询加粗
	            gridComplete: function () {
	            	$.xljUtils.addGridScroll();//滚动条样式修改
	            	
	            	var ids = $("#resourcelist").getDataIDs();
	            	for(var i=0;i<ids.length;i++){
	            		var rowD = $("#resourcelist").getRowData(ids[i]);
	            		var searchVal = $('#searchVal').val();
	            		if(searchVal){
	            			if(rowD.name.indexOf(searchVal)>-1){
	            				console.log(JSON.stringify($('#'+ids[i])));
	            				$('#'+ids[i]).find("td").css("font-weight","bold");
	            			}
	            		}
	            	}
	            },
	            //树初始数据
	            treeReader:{
         		   level_field: "level",
         		   parent_id_field: "parentId",
         		   leaf_field: "isLeaf",
         		   expanded_field: "expanded",
         		   left_field:"lft",
         		   right_field: "rgt"
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
        	    		 pop_tip_open("red","查询数据失败！");
        	    	}else{
        	    		//success
        	    	}
         	    }
			});
    	},
    	/**
    	 * treeview 格式化
    	 */
    	formateTreeView:function (data){
    		var my = this;
    		var num = 0;
    		var level = 0;
    		var nodeArray = new Array();
    		  for(var i in data.result){
    			  var node = data.result[i];
    			  var treeViewData = {};
    			  treeViewData.id=node.id;
    			  treeViewData.name=node.name;
    			  treeViewData.url=node.resourceurl;
    			  treeViewData.resourcename="系统";
    			  treeViewData.code=node.code;
    			  treeViewData.type=node.type;
    			  treeViewData.parentId=node.parentId;
    			  treeViewData.level= level;
    			  if(node.children!=null&&node.children.length>0){
    				  treeViewData.isLeaf= false;
    			  }else{
    				  treeViewData.isLeaf= true;
    			  }
    			  treeViewData.expanded= false;
    			  treeViewData.loaded=true;
    			  treeViewData.lft=num ;
    			  nodeArray.push(treeViewData);
    			  my.expandedNode(nodeArray,treeViewData);
    			  num = my.getChildren(node,nodeArray,level,num); 
    			  treeViewData.rgt=num;
    		  }
    		return nodeArray;
    	},
    	/**
    	 * 递归子集
    	 */
    	getChildren:function (parentNode,nodeArray,level,num){
    		var my = this;
    		if(parentNode.children!=null&&parentNode.children.length>0){
    			++level;
    			for(var i in parentNode.children){
    				++num;
    				var node = parentNode.children[i];
    				var treeViewData = {};
    				  treeViewData.id=node.id;
    				  treeViewData.name=node.name;
    				  treeViewData.url=node.resourceurl;
    				  treeViewData.resourcename=parentNode.name;
    				  treeViewData.code=node.code;
    				  treeViewData.type=node.type;
    				  treeViewData.parentId= parentNode.id;
    				  treeViewData.level= level;
    				  if(node.children!=null&&node.children.length>0){
    					  treeViewData.isLeaf= false;
    				  }else{
    					  treeViewData.isLeaf= true;
    				  }
    				  treeViewData.expanded= false;
    				  treeViewData.loaded=true;
    				  treeViewData.lft=num ;
    				  nodeArray.push(treeViewData);
    				  my.expandedNode(nodeArray,treeViewData);
    				  num = my.getChildren(node,nodeArray,level,num);
    				  treeViewData.rgt = num;
    			}
    			++num;
    			
    		}else{
    			++num;
    		}
    		return num;
    	},
    	//模糊查询动态展开
    	expandedNode:function (nodeArray,treeViewData){
    		var my =this;
    		//模糊查询出来的节点，都展开
    		var searchVal = $('#searchVal').val();
		    if(searchVal){
		    	if(treeViewData.name.indexOf(searchVal)>-1){
		    		treeViewData.expanded="true";
		    		if(treeViewData.parentId!=null&&treeViewData.parentId!=''){
		    			my.expandedParentNode(nodeArray,treeViewData.parentId);
		    		}
		    	}
		    }
    	},
    	//展开父级节点
    	expandedParentNode:function (nodeArray,parentId){
    		//展开父级
    		for(var i in nodeArray){
				if(nodeArray[i].id == parentId){
					nodeArray[i].expanded="true";
					this.expandedParentNode(nodeArray,nodeArray[i].parentId);
				}
    		}
    	},
		/**
		 * 页面初始化
		 */
    	pageInit:function(){// 页面初始化JS
    		this.get_dataList();
    		//设置model高度及滚动条
    		$("#modal_list").css({
    			overflow:"auto",
    			height:$(window).height()/2
    		});
    	}
    };
    $(_resourceList.pageInit());
    window[_resourceList.ns] = _resourceList;
})(window,document);