/*
 * 附件管理列表js
 * 创建者：haoqipeng 2017-03-31
 */

var zTreeObj, curTreeNode = null, lastZTreeNodeId = -1, editMode = 'add';

/**
 * 局部刷新分类树，分类添加和修改子页面保存成功之后调用该函数
 * pId:传过来的是parent category id，根据需要重置成ztree的pId
 * id:新增模式下为树最大id加1，更新模式下不变
 * @param node
 * @returns
 */
function refreshZTree(node) {
	node['iconSkin'] = 'diy-group';
//	// 查询父节点
//	var pNode = zTreeObj.getNodeByParam('categoryId',node.pId, null);
//	
//	// 重置修改节点的pId属性
//	if (null != pNode) {
//		node.pId = pNode.id;
//	} else {
//		node.pId = null;
//	}
//	
//	if ('add' === editMode) {
//		// 新增模式下，新增node id + 1
//		node.id = node.id + 1;
//		zTreeObj.addNodes(pNode, node);
//	} else {
//		// 更新模式下
//		// 更新当前节点数据为修改后数据
//		var srcPid = curTreeNode.pId;
//		var srcPNode =  zTreeObj.getNodeByParam('id',srcPid, null);
//		curTreeNode.name = node.name;
//		curTreeNode.pId = node.pId;
//		if (null != pNode) {
//			
//			// 父节点有变动
//			if (pNode.id != srcPNode.id) {
//				zTreeObj.updateNode(srcPNode);
//			}
//		}
//		zTreeObj.updateNode(curTreeNode);
//		zTreeObj.moveNode(pNode, curTreeNode, "inner");
//	}
	var pNode = null;
	if (node.parentId != undefined && node.parentId != null) {
		pNode = zTreeObj.getNodeByParam('id',node.parentId, null);
	}
	
	if ('add' === editMode) {
		zTreeObj.addNodes(pNode, node);
	} else {
		var srcPid = curTreeNode.parentId;
		
		curTreeNode.name = node.name;
		curTreeNode.parentId = node.parentId;
		zTreeObj.updateNode(curTreeNode);
		
		if (srcPid != node.parentId) {
			zTreeObj.moveNode(pNode, curTreeNode, "inner");
		}
	}
}

;(function($, window, document, undefined) {
	//树 搜索名称参数
	var lastValue = "", nodeList = [], fontCss = {};

	//zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
	var setting = {
		view: {
	        fontCss: getFontCss
	    },
		edit: {
			enable: true,
			showRemoveBtn: false,
			showRenameBtn: false
		},
		data: {
			simpleData: {
				enable: true,
				idKey: "id",
				pIdKey: "parentId"
			}
		},
		callback: {
			onClick: zTreeOnClick,
			onExpand: resetScroll,
			onCollapse:resetScroll
		}
	};

	/**
	 * 重置ztree滚动条
	 * 
	 * @returns
	 */
	function resetScroll(event, treeId, treeNode) {
		$.xljUtils.treeResizeFn();
	}
	
	function zTreeOnClick(event, treeId, treeNode) {
		curTreeNode = treeNode
		
		// 取得当前节点所有的子节点ID
		var ctIds = [];
		getAllIds(curTreeNode);
		console.log('查询条件：' + ctIds);
		queryList(ctIds);
		
		function getAllIds(crNode) {
			ctIds.push(crNode.id);
			if (crNode.children && crNode.children.length > 0) {
				for(var i = 0; i < crNode.children.length; i++) {
					getAllIds(crNode.children[i]);
				}
			}
		};
	};

	/**
	 * 初始化附件列表
	 * @returns
	 */
	function initAttachmentGrid() {
		// 创建jqGrid组件
		$.xljUtils.initJqGrid({
			gridSelecter:'#list2',
			url : serviceUrl + 'univ/attachment/attachment/pageByCategoryIds?random='+Date.now(),
			postData : {},
			colNames :['主键','附件名称', '文件大小','上传时间','附件分类', '操作'],
			colModel : [ // jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				{ name : 'id',  index : 'id', align : "center", hidden : true },
				{ name : 'fullName',index : 'fullName', align : "left" },
				{ name : 'fileSize',index : 'fileSize', align : "center", formatter:$.xljUtils.formatFileSize },
				{ name : 'uploadTime',index : 'uploadTime', align : "center"/*, formatter:'date',formatoptions: {newformat:'Y-m-d H:i:s'}*/},
				{ name : 'categoryName', index : 'categoryName',align : "center" },
				{ name : 'path', index : 'path',align : "center",
					formatter:function (value, grid, row, state) {
						return '<a href="javascript:void(0);" class="a-download" data-path="'+value+'" data-filename="'+row.fullName+'" style="color:blue;">下载</a>';
					}
				}
			],
			multiselect:false,
			viewrecords:true,
			pager : '#pager2',//表格页脚的占位符(一般是div)的id
			sortname : 'uploadTime',// 初始化的时候排序的字段
			sortorder : "desc",// 排序方式,可选desc,asc
		});
	}

	/**
	 * 根据分类IDs查询
	 * @param categoryIds
	 * @returns
	 */
	function queryList(categoryIds){
		$.xljUtils.reLoadJqGridData('#list2', {categoryId:categoryIds});
	}


	/*
	 * 树搜索方法
	 */
	function focusKey(e) {
		if (key.hasClass("empty")) {
			key.removeClass("empty");
		}
	}
	function blurKey(e) {
		if (key.get(0).value === "") {
			key.addClass("empty");
		}
	}

	function searchNode(e) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var keyType = "name";
		var value = $.trim(key.get(0).value);
		if (lastValue === value) return;
		lastValue = value;
		if (value === "") return;
		updateNodes(false);

		nodeList = zTree.getNodesByParamFuzzy(keyType, value);
		for(var i=0;i<nodeList.length;i++){
			var node=nodeList[i];
			var parentNode=node.getParentNode();
			if(parentNode && !parentNode.open){
				zTree.expandNode(parentNode,true,false,false,false);
			}
		}

		updateNodes(true);

	}
	
	function updateNodes(highlight) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		for( var i=0, l=nodeList.length; i<l; i++) {
			nodeList[i].highlight = highlight;
			zTree.updateNode(nodeList[i]);
		}
	}
	
	function getFontCss(treeId, treeNode) {
		return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
	}

	/**
	 * 文件下载
	 * 
	 * @returns
	 */
	function download() {
		var path = $(this).attr('data-path');
		var filename = $(this).attr('data-filename');
		// 先查询文件存储机器的IP
		$.post(serviceUrl + 'univ/attachment/attachment/getStorageIP?random='+Date.now(), 
				{filePath:path},
				function(ip){ 
					if (ip)
					var a = document.getElementById("downFile");  
	                a.href="http://"+ip+":8080/" + path + '?filename=' + encodeURI(encodeURI(filename));  
	                a.click();
				}
		);
	}

	/**
	 * 根据查询返回数据整理成zTree需要的JSON数据
	 * 
	 * @param arr
	 * @returns
	 */
	function formatZTreeData(arr) {
//		if (arr == undefined || arr == null) return arr;
//		var con = {};
//		var zNodes = [];
//		for (var i = 0; i < arr.length; i++) {
//			con[arr[i].id] = i + 1;
//		}
//		
//		for (var i = 0; i < arr.length; i++) {
//			zNodes.push({id:con[arr[i].id], pId:con[arr[i].parentId], name:arr[i].name,categoryId:arr[i].id,iconSkin:'diy-group'});
//		}
//		lastZTreeNodeId = zNodes[zNodes.length - 1].id;
		
		$.each(arr, function(index, value){
			value.iconSkin = 'diy-group';
		});
		
		return arr;
		
	};
	
	var key;

	/**
	 * 获取附件分类树
	 * @returns
	 */
	function getAttachmentCategoryTree() {
		$.ajax({
			type:'POST',
			url:serviceUrl + 'univ/attachment/attachmentCategory/queryList?random='+Date.now(),
			dataType:'json',
			contentType:'application/json',
			data:'{}',
			success: function(json) {
				var zNodes = formatZTreeData(json.result);
				zTreeObj = $.fn.zTree.init($('#treeDemo'), setting, zNodes);
				zTreeObj.expandAll(true);
				key = $('#key');
				key.bind('focus', focusKey).bind('blur', blurKey)
					.bind('propertychange', searchNode)
					.bind('input', searchNode);
				setTimeout(function(){
					$.xljUtils.addTreeScroll('ztree-box');
					$.xljUtils.treeResizeFn();
				},300);
			}
		});
	}

	$(function(){
		
		//计算高度
		function resizeHeight(){
			var documentBodyHeight = $(window).height();
			//左侧  头部底部为60px  title类 为50px
			$(".ztree-box").height((documentBodyHeight-$('.org-title').outerHeight()-101) + 'px');
			//右侧table
			$(".con-table").height(documentBodyHeight-$('.user-list').outerHeight());
		}
		/**
		 * 页面自动计算宽度和高度
		 */
		resizeHeight();
		$(window).resize(function() {
			resizeHeight();
		});
		
		$('.btn-category-add').on('click', addCategory);
		$('.btn-category-modify').on('click', updateCategory);
		$('.btn-category-delete').on('click', deleteCategory);
		//初始化initJqGrid
		initAttachmentGrid();
		$('#list2').on('click','.a-download', download);
		//初始化附件分类树
		getAttachmentCategoryTree();
		$.xljUtils.resizeNestedGrid();
	});

	/**
	 * 新增附件分类
	 * 
	 * @returns
	 */
	function addCategory() {
//		if (curTreeNode == null) {
//			$.xljUtils.tip('blue','请选择附件分类树节点！');
//			return;
//		}
		editMode = 'add';
		window.open('attachmentCategory_edit.html','_blank');
	}

	/**
	 * 修改附件分类
	 * 
	 * @returns
	 */
	function updateCategory() {
		// 取得最新节点
		zTreeObj = $.fn.zTree.getZTreeObj("treeDemo");
		var nodes = zTreeObj.getSelectedNodes();
		if (nodes.length == 0) {
			$.xljUtils.tip('blue','请选择附件分类树节点！');
			return;
		}
		curTreeNode = nodes[0];
		editMode = 'update';
		window.open('attachmentCategory_edit.html?random='+Date.now(),'_blank');
	}

	/**
	 * 删除附件分类
	 * 
	 * @returns
	 */
	function deleteCategory() {
		if (curTreeNode == null) {
			$.xljUtils.tip('blue','请选择附件分类树节点！');
			return;
		}
		
		if (curTreeNode.children && curTreeNode.children.length > 0) {
			$.xljUtils.tip('blue','请选择附件分类树叶子节点！');
			return;
		}
		
		if ($.xljUtils.confirm('blue', '确定要删除附件分类：'+$.xljUtils.htmlEncode(curTreeNode.name) + '？', function(){
			
			$.xljUtils.xljAjax({
				type:'DELETE',
		        url:serviceUrl + 'univ/attachment/attachmentCategory/delete/'+ curTreeNode.id
			}, function(data){
				$.xljUtils.tip('green','删除附件分类成功！');
				var newCurNode, preNode = curTreeNode.getPreNode();
				if (preNode != null) {
					newCurNode = preNode;
				} else {
					var parentNode = curTreeNode.getParentNode();
					if (parentNode != null) {
						newCurNode = parentNode;
					}
				}
				zTreeObj.removeNode(curTreeNode);
				curTreeNode = null;
				if (newCurNode != null) {
					zTreeObj.selectNode(newCurNode);
					$('#' + newCurNode.tId + ' a').click();
					curTreeNode = newCurNode;
				}
				
			});
		
		},true));
	}
	
})(jQuery, window, document);

