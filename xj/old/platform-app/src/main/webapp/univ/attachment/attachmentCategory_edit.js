;(function($, window, document, undefined) {

	/**
	 * 根据查询返回数据整理成zTree需要的JSON数据
	 * @param arr
	 * @returns
	 */
	function formatZTreeData(arr) {
//		var con = {};
//		var zNodes = [];
//		for (var i = 0; i < arr.length; i++) {
//			con[arr[i].id] = i + 1;
//		}
//		
//		for (var i = 0; i < arr.length; i++) {
//			zNodes.push({id:con[arr[i].id], pId:con[arr[i].parentId], name:arr[i].name,categoryId:arr[i].id,iconSkin:'diy-group'});
//		}
		
		
		$.each(arr, function(index, value){
			value.iconSkin = 'diy-group';
		});
		
		return arr;
	};
	
	
//	/**
//	 * 分类树点击前事件
//	 * 
//	 * @param treeId
//	 * @param treeNode
//	 * @returns
//	 */
//	function beforeClick(treeId, treeNode) {
//		console.log("beforeClick " + treeNode.categoryId);
//		if ("add" != window.opener.editMode && $('input[name="id"]').val() != '') {
//			var ctIds = [];
//			var tNode = zTreeObj.getNodeByParam('categoryId',$('input[name="id"]').val(), null);
//			getAllIds(tNode);
//			console.log(ctIds);
//			if (ctIds.indexOf(treeNode.categoryId) > -1) {
//				return false;
//			}
//			
//		}
//		// 取得当前node及子node的categoryId数组
//		function getAllIds(crNode) {
//			ctIds.push(crNode.categoryId);
//			if (crNode.children && crNode.children.length > 0) {
//				for(var i = 0; i < crNode.children.length; i++) {
//					getAllIds(crNode.children[i]);
//				}
//			}
//		};
//		
//		
//		return true;
//	}
	
	/**
	 * 初始化主键ID
	 * 
	 * @returns
	 */
	function initUuid(){
		
		$.xljUtils.getUuid(function(uuid){
			if (!$.xljUtils.isEmpty(uuid)) {
				$("#attachmentCategoryForm").find("input[name='id']").val(uuid);
			}
		});
	}
	
	/**
	 * 提交表单
	 * 
	 * @returns
	 */
	function submitForm(successCallback) {
		var $curForm = $("#attachmentCategoryForm");
		if ($curForm.find("input[name='id']").val() == '') {
			initUuid();
			return;
		} 
		$.xljUtils.customSingleValidate($curForm[0]);
		if (!$curForm.valid()) {
			return;
		}
		
		var inputArr = $curForm.serializeArray();
		var dataJson = {};
		for (var i = 0; i < inputArr.length; i++) {
			if (inputArr[i].name == 'parentName' || inputArr[i].name.indexOf('_') == 0) continue;
			dataJson[inputArr[i].name] = inputArr[i].value != ''?inputArr[i].value:null;
		}
		var mtype = "POST";
		var urlBody = hostUrl + 'univ/attachment/attachmentCategory';
		if ("add" === window.opener.editMode) {
			urlBody += '/save';
		} else {
			mtype = "PUT";
			urlBody += '/update/' + $('input[name="id"]').val();
		}
		
		$.xljUtils.xljAjax({
			url : urlBody,
			data : JSON.stringify(dataJson),
			type : mtype
		}, function(data){
			$.xljUtils.tip('green', '附件分类保存成功！');
			var x, v;
			for(x in dataJson) {
				v = dataJson[x];
				if (v != null) {
					v = v.replace(/\\\'/g, '\'');
					v = v.replace(/\\\\/g, '\\');
					dataJson[x] = v;
				}
			}
			successCallback(dataJson);
		});
	}
	
	$(function () {
		
		// 绑定事件
		// 关闭
		$('.btn-close').on('click', function(){
			window.close();
		});
		// 保存并新增
		$('.btn-saveadd').on('click', function(){
			submitForm(function(node){
				window.opener.refreshZTree(node);
				window.opener.editMode = 'add';
				$('input[name="code"]').removeAttr('disabled');
				$('input[name="appId"]').removeAttr('disabled');
				$('#attachmentCategoryForm input').each(function(){
					var inputName = $(this).attr('name');
					if (['parentId','parentName'].indexOf(inputName) == -1) {
						$(this).val('');
					}
				});
				// 重新获取UUID
				initUuid();
			});
		});
		// 保存
		$('.btn-save').on('click', function(){
			submitForm(function(node){
				window.opener.refreshZTree(node);
				window.close();
			});
		});
		
		if ("add" === window.opener.editMode) {
			$('.form-title-end').text('新增');
			$('title').text('附件分类-新增');
			if (window.opener.curTreeNode != undefined) {
				$('input[name="parentId"]').val(window.opener.curTreeNode.id);
				$('input[name="parentName"]').val(window.opener.curTreeNode.name);
			}
			$('input[name="code"]').removeAttr('disabled');
			$('input[name="appId"]').removeAttr('disabled');
			initUuid();
		} else {
			$('.form-title-end').text('修改');
			$('title').text('附件分类-修改');
		    
			$.xljUtils.xljAjax({
				type:'GET',
		        url:hostUrl + 'univ/attachment/attachmentCategory/get/'+window.opener.curTreeNode.id + '?random=' + Date.now()
			}, function(data) {
				var category = data;
        		$('input[name="id"]').val(category.id);
        		$('input[name="name"]').val(category.name);
        		$('input[name="code"]').val(category.code);
        		$('input[name="appId"]').val(category.appId);
        		$('input[name="parentId"]').val(category.parentId);
        		var pNode = window.opener.curTreeNode.getParentNode();
        		if (pNode != undefined && pNode != null) {
        			$('input[name="parentName"]').val(pNode.name);
        		}
			});
			
		}
		// 初始化附件分类树
		$('.category-selecter').xljSingleSelector({
			title:'选择附件分类',//选择器标题，默认是'选择组织机构'
			selectorType:'eeee',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
			treeUrl:hostUrl + 'univ/attachment/attachmentCategory/queryList?random=' + Date.now(),// 生成zTree树的请求url,不指定使用默认对应类型的url
			treeParam:{},//生成zTree树的请求参数，json对象
			targetId:'parentId',//选择的数据的ID存储input域的id
			targetName:'parentName',//选择的数据的Name存储input域
			saveCallback:function (selectData,ele) {
				if (selectData != null) {
					$("input[name='parentName']").val(selectData.name);
					$("input[name='parentId']").val(selectData.id);
				}
			},
			formatTreeJson:formatZTreeData,
			treeSettings:{data:{
					simpleData: {
						enable: true,
						idKey: 'id',
						pIdKey: 'parentId'
					}
				}
			}
		});
	});

})(jQuery, window, document);
