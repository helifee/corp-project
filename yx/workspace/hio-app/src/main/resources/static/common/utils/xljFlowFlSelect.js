/**
 * @author lF
 * @CREATEDATE 2017/03/22
 */
(function(window,document){
    var _flowSelect = {
    	ns : "_flowSelect",
    	dataPar:{
    		tagartId:null,
    		tagartName:null,
    		tagartCode:null,
    		templateRowData:"",
    		tagartSelect:"single",//默认单选
    		templateRowDataBefore:"",
    		zTreeObj:null,
    		parentDom:null,
    		zNodes:null,
			flowSelectmodel:'<div class="modal inmodal" id="_flowModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" >'+
			'<div class="modal-dialog modal-lg" style="width: 80%;">'+
			'<div class="modal-content animated flipInY">'+
			'<div class="modal-header">'+
			'<div class="pull-right">'+
			'<button type="button" class="btn btn-sm blue btn-adv" id="confirmData" ">确定</button>'+
			'<button type="button" class="btn btn-sm blue btn-adv" data-dismiss="modal">取消</button>'+
			'</div>'+
			'</div>'+
			'<div class="modal-body" id="modal_list">'+
			'<div class="container-fluid">'+
			'<div class="row">'+
			'<div  class="col-sm-12">'+
			'<div class="col-md-4 col-sm-4 slide-left ">'+
			'<div class="org-title">'+
			'<span class="fa fa-sitemap"></span><span class="tit">业务对象</span>'+
			'<button type="button"  class="btn btn-sm btnMsearch rm-pad pull-right" id="searchObjectButton" style="margin-top:12px;" >'+
	    	'<i class="fa fa-search" aria-hidden="true"></i>'+
	  		'</button>'+
	  		'<input type="text"  class="form-control mySearchInput pull-right" style="width:50%;margin-top:12px;"  id="searchObject" placeholder="业务对象名称">'+
			'</div>'+
			'<div class="ztree-box" id="ztreeHeight">'+
			'<ul id="_zTree" class="ztree"></ul>'+
			'</div>'+
			'</div>'+
			'<div class="col-md-8 col-sm-8 right-content pdrh0 grid-header-justify" id="rightGrid">'+
			'<div class="con-table">'+
			'<div class="xj-form-tab  container-fluid">'+
			'<div>'+
			'<i class="fa fa-list addBlue" aria-hidden="true"></i>'+
			'<span class="form-title">流程模板</span>'+
			'<button type="button" id="searchTemplateData"  class="btn btn-sm btnMsearch rm-pad pull-right" style="margin-top:12px;" >'+
	    	'<i class="fa fa-search" aria-hidden="true"></i>'+
	  		'</button>'+
	  		'<input type="text"  class="form-control mySearchInput pull-right" style="width:50%;margin-top:12px;"  id="searchTemplate" placeholder="流程模板名称">'+
			'<div class="btns-group pull-right">'+
			'</div>'+
			'</div>'+
			'</div>'+
		    '<div class="xj-main-grid grid-container tableStyle ">'+
		    '<table id="templateGrid"  constraint-layout="true"></table>'+
		    '<div id="templateGridPager"></div>'+
		    '</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'
			
    	},
    	bindEevent:function(){
    		var my = this;
    		var setting={
				data: {
					simpleData: {
						enable: true,
						pIdKey: 'pId'
					},
					key: {}
				},
				callback: {
					beforeClick: function (treeId, treeNode, clickFlag) {
						return !treeNode.isParent;
					},
					onClick: my.appendDataToRight,
					onCollapse: function () {
						$.xljUtils.treeResizeFn();
					},
					onExpand: function () {
						$.xljUtils.treeResizeFn();
					}
				}
    		};
    		
    		$('.flowSelect').on('click', function(){
    			if(my.dataPar.parentDom==null){
    				my.dataPar.parentDom= $(this).closest("td");
    				my.dataPar.parentDom.append(my.dataPar.flowSelectmodel);
    			}
    			my.dataPar.tagartId =	$(this).attr("data-targartId");
    			my.dataPar.tagartName=	$(this).attr("data-targartName");
    			my.dataPar.tagartCode=	$(this).attr("data-targartCode");
    			my.dataPar.tagartSelect=	$(this).attr("data-select");
    			
    			$('#_flowModal').modal("show");
    			$("#searchObject").keypress(function(e){
    		        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    		        if (eCode == 13){
    		        	my.searchObject();
    		        }
        		});
    			$("#searchTemplate").keypress(function(e){
    				var SelectbusinessObjectId="";
    				var nodes = my.dataPar.zTreeObj.getSelectedNodes();
    				if(nodes.length>0){
    					SelectbusinessObjectId=nodes[0].id;
    				}
    				var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
    				if (eCode == 13){
    					var inputVal=$("#searchTemplate").val();
    					jQuery("#templateGrid").jqGrid("setGridParam",{postData:{businessObjectId:SelectbusinessObjectId,flName:inputVal}}).trigger("reloadGrid");
    				}
    			});
    			$("#searchTemplateData").on('click',function(){
    					var inputVal=$("#searchTemplate").val();
    					var SelectbusinessObjectId="";
        				var nodes = my.dataPar.zTreeObj.getSelectedNodes();
        				if(nodes.length>0){
        					SelectbusinessObjectId=nodes[0].id;
        				}
    					jQuery("#templateGrid").jqGrid("setGridParam",{postData:{businessObjectId:SelectbusinessObjectId,flName:inputVal}}).trigger("reloadGrid");
    			});
    			$("#searchObjectButton").on('click',function(){
    				my.searchObject();
    			});
    			if(my.dataPar.tagartSelect=="single"){
    				$("#confirmData").on('click',function(){
    					var rowId=$('#templateGrid').jqGrid("getGridParam","selrow");
    					var rowData = $('#templateGrid').jqGrid('getRowData',rowId);
    					$("#"+my.dataPar.tagartId).val(rowData.id);
    					$("#"+my.dataPar.tagartCode).val(rowData.code);
    					$("#"+my.dataPar.tagartName).val(rowData.name);
    					$('#_flowModal').modal("hide");
    				});
    			}else if(my.dataPar.tagartSelect=="more"){
    				$("#confirmData").on('click',function(){
    					var rowIds=$('#templateGrid').jqGrid("getGridParam","selarrrow");
    					var resultId="";
    					var resultCode="";
    					var resultName="";
    					for(var o in rowIds){
    						var rowData = $('#templateGrid').jqGrid('getRowData',rowIds[o]);
    						resultCode+=rowData.code+",";
    						resultId+=rowData.id+",";
    						resultName+=rowData.name+",";
    					}
    					$("#"+my.dataPar.tagartId).val((resultId).substring(0,(resultId).length-1));
    					$("#"+my.dataPar.tagartCode).val((resultCode).substring(0,(resultCode).length-1));
    					$("#"+my.dataPar.tagartName).val((resultName).substring(0,(resultName).length-1));
    					$('#_flowModal').modal("hide");
    				});
    			}
    			$("#_flowModal .modal-dialog").height($(window).height()*0.8);
    			$("#_flowModal .modal-dialog .ztree-box").height($("#_flowModal .modal-dialog").height()-130);
    			$("#_flowModal .modal-dialog .tableStyle").height($("#_flowModal .modal-dialog").height()-130);
    		    $('#_flowModal').on('hide.bs.modal', function () {
    		    	$('#_flowModal').find(".ztree-box").getNiceScroll().hide();
    			});
    		    $('#_flowModal').on('show.bs.modal', function () {
    		    	$('#_flowModal').find(".ztree-box").getNiceScroll().show();
    			});
    			if(my.dataPar.zTreeObj==null){
	    			$.ajax({
	    				type: "post",
	    				url: serviceUrl + "flow/businessObject/getTree",
	    				dataType: "json",
	    				async:false,
	    				data:"{}",
	    				contentType: 'application/json',
	    				success: function (typeNodes) {
	    					my.dataPar.zNodes = typeNodes.result;
	    					my.recursionArray(my.dataPar.zNodes);
	    					my.dataPar.zTreeObj = $.fn.zTree.init($("#_zTree"), setting, my.dataPar.zNodes);
	    					var nodes = my.dataPar.zTreeObj.getNodes();
	    					my.dataPar.zTreeObj.expandAll(false);
	    					
	    					$.xljUtils.addTreeScroll('ztree-box');
	    					$.xljUtils.treeResizeFn();
	    				},
	    				complete:function(){
	    					if(my.dataPar.tagartSelect=="single"){
	    						my.getTemplateSingData();
	    					}else if(my.dataPar.tagartSelect=="more"){
	    						my.getTemplateMoreData();
	    					}
	    				}
	    			});
    			}
    		});
    	},
    	 appendDataToRight:function(e,treeId,treeNode){
    		jQuery("#templateGrid").jqGrid("setGridParam",{postData:{businessObjectId:treeNode.id,flName:""}}).trigger("reloadGrid");
    		if(_flowSelect.dataPar.tagartSelect=="single"){
    			_flowSelect.getTemplateSingData();
			}else if(_flowSelect.dataPar.tagartSelect=="more"){
				_flowSelect.getTemplateMoreData();
			}
    	},
    	getTemplateSingData:function(){
    		var my = this;
    	    jQuery("#templateGrid").jqGrid({
	            url: serviceUrl+'flow/fl/queryFlByGroupList',
	            ajaxGridOptions: { contentType: 'application/json' },
	            mtype : "POST", 
	            contentType : "application/json",  
	            datatype : "json",
	            height:$("#ztreeHeight").height()-40,
	            autowidth:true,
	            rownumbers:true,
	            postData:{businessObjectId:"null",flName:"null"},
	            jsonReader : {
	                       repeatitems: false
	            },
	            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
	                {name : 'id',label : 'id',hidden:true,align : "center"},
	                {name : 'name',label : '名称',align : "center"},
	                {name : 'code',label : '编码',align : "center"},
	                {name : 'concurrencyVersion',label : '版本',align : "center"}
	            ],
	            rowNum : 20,//一页显示多少条
	            rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
	            pager : '#templateGridPager',//表格页脚的占位符(一般是div)的id
	            ondblClickRow:function(rowId){
	            	var rowData= $('#templateGrid').jqGrid('getRowData',rowId);
	            	$("#"+my.dataPar.tagartId).val(rowData.id);
	            	$("#"+my.dataPar.tagartCode).val(rowData.code);
	            	$("#"+my.dataPar.tagartName).val(rowData.name);
	            	//摸态窗口关闭事件-分录
	            	$('#_flowModal').modal("hide");
	            },
	            viewrecords : true,
	            loadError:function(jqXHR, textStatus, errorThrown){
	         	   $.xljUtils.getError(jqXHR.status);
	            },
	            gridComplete:function(){
	                	 $.xljUtils.addGridScroll();
						 $.xljUtils.gridResizeFn();
	          }
	        });
    	},
    	getTemplateMoreData:function(){
    		var my = this;
    	    jQuery("#templateGrid").jqGrid({
	            url: serviceUrl+'flow/fl/queryFlByGroupList',
	            ajaxGridOptions: { contentType: 'application/json' },
	            mtype : "POST", 
	            contentType : "application/json",  
	            datatype : "json",
	            height:$("#ztreeHeight").height()-40,
	            autowidth:true,
	            rownumbers:true,
	            multiboxonly:true,
	            multiselect:true,
	            postData:{businessObjectId:"null",flName:"null"},
	            jsonReader : {
	                       repeatitems: false
	            },
	            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
	                {name : 'id',label : 'id',hidden:true,align : "center"},
	                {name : 'name',label : '名称',align : "center"},
	                {name : 'code',label : '编码',align : "center"},
	                {name : 'concurrencyVersion',label : '版本',align : "center"}
	            ],
	            rowNum : 20,//一页显示多少条
	            rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
	            pager : '#templateGridPager',//表格页脚的占位符(一般是div)的id
	            viewrecords : true,
	            loadError:function(jqXHR, textStatus, errorThrown){
	         	   $.xljUtils.getError(jqXHR.status);
	            },
	            gridComplete:function(){
	                	 $.xljUtils.addGridScroll();
						 $.xljUtils.gridResizeFn();
	          }
	        });
    	},
    	 recursionArray:function(arr) {
    		for(var i in arr) {
    			if(/['"#$%&\^*]/.test(arr[i].name)){
    	    		arr[i].name=$.xljUtils.htmlDecode(arr[i].name);
    	    	}
    			if(arr[i].pId == 0) {
    				arr[i].icon = "../../common/zTreeStyle/img/diy/main.png";
    			}else {
    				arr[i].icon = "../../common/zTreeStyle/img/diy/1_open.png";
    			} 
    		}
    	},
    	selectParentNode:function(node,dataArr){
    		var my=this;
    		var dataId=node[0].pId
    		var Parentnode =  my.dataPar.zTreeObj.getNodesByParam("id",dataId,null);
    		if(Parentnode.length>0){
    			dataArr+=Parentnode[0].id+",";
    			dataArr+=my.selectParentNode(Parentnode,dataArr);
    		}
    		return dataArr;
    	},
    	
    	searchObject:function(){
    		var my = this;
    		var inputVal=$("#searchObject").val();
        	if(inputVal){
        		var dataArr=new Array();
        		var resultId="";
        		for(var o in my.dataPar.zNodes){
        			if((my.dataPar.zNodes[o].name).indexOf(inputVal)>-1){
   					     var node = my.dataPar.zTreeObj.getNodesByParam("id",my.dataPar.zNodes[o].id,null);
	        				 resultId=my.selectParentNode(node,resultId);
	        				 resultId+=my.dataPar.zNodes[o].id;
        			}
        		}
        		for(var o in my.dataPar.zNodes){
        			 if((resultId).indexOf(my.dataPar.zNodes[o].id)>-1){
        				 dataArr.push(my.dataPar.zNodes[o]);
        				 my.dataPar.zTreeObj.showNode(my.dataPar.zTreeObj.getNodesByParam("id",my.dataPar.zNodes[o].id,null)[0]);
   				  }else{
   					my.dataPar.zTreeObj.hideNode(my.dataPar.zTreeObj.getNodesByParam("id",my.dataPar.zNodes[o].id,null)[0]);
   				  }
        		}
        		my.dataPar.zTreeObj.expandAll(true);
				
        	}else{
        		var treeObj = $.fn.zTree.init($("#_zTree"), setting, my.dataPar.zNodes);
				treeObj.expandAll(false);
        	}
        	$.xljUtils.addTreeScroll('ztree-box');
        	$.xljUtils.treeResizeFn();
        	jQuery("#templateGrid").jqGrid("clearGridData");
    	},
    	
    	/**
    	 * 页面初始化
    	 */
    	pageInit:function(){
    		this.bindEevent();
    		 //设置div高度及滚动条
            $(window).on('resize', function () {
            	$.xljUtils.addTreeScroll('ztree-box');
            	$.xljUtils.treeResizeFn();
            	$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
            });
    	}
    };
    $(_flowSelect.pageInit());
    window[_flowSelect.ns] = _flowSelect;
})(window,document);