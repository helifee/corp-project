var dt = new Date();
var tree;

var buildTree = function() {
	/* 根节点，虚拟节点，数据库不存 */
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '华夏幸福'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'Orgn!getOrgnTree.ajax'
		}),
		root : root,
		rootVisible : false,
		renderTo : 'orgnTree',
		border : false,
		height : 470,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : true
	});
	tree.on('click', function(node) {
		var dt = new Date().getTime();
		node.expand();
		node.select();
		var userIds = document.getElementById("user_frame").contentWindow.document.getElementById("userIds").value;
		var paramJsonStr = document.getElementById("paramJsonStr").value;
		Ext.get(document.getElementById("user_frame")).dom.src = "Orgn!userList.do?paramJsonStr="+paramJsonStr+"&orgnId="+node.id+"&userIds="+userIds+"&dt="+dt;
	});
	tree.on('beforeload', function(node) {
		var paramJsonStr = document.getElementById("paramJsonStr").value;
		tree.loader.dataUrl = 'Orgn!getOrgnTree.ajax?paramJsonStr='+paramJsonStr+'&parentId=' + node.id;
	});
	root.expand();
	root.select();
};

var init = function() {
	buildTree();
	var nodePath = document.getElementById("nodePath").value;
	tree.expandPath(nodePath);
};
Ext.onReady(init);

function confirmSelectUser(){
	$('body').mask();
	var paramJsonStr = $("#paramJsonStr").val();
	if(paramJsonStr){
		var paramJsonStr_ = decodeURIComponent(paramJsonStr);
		var dto = $.parseJSON(paramJsonStr_);
		//验证过程
		var rCheckBoxs = $(":checkbox[name='r_user']",window.frames["user_frame"].document);
		var selectCount = rCheckBoxs.length;
		if(dto && dto.minCount){
			if(selectCount<dto.minCount){
				$('body').unmask();
				alert("最少选择"+dto.minCount+"人");
				return;
			}
		}
		if(dto.maxCount){
			if(selectCount>dto.maxCount){
				$('body').unmask();
				alert("最多选择"+dto.maxCount+"人");
				return;
			}
		}
		
		var selectedUserIds = [];
		rCheckBoxs.each(function(index,domEle){
			selectedUserIds.push(domEle.value);
		});
		
		//如果需要直接保存
		if(dto && dto.saveUrl){
			var sendData = {'paramJsonStr' : paramJsonStr_,'userIds' : selectedUserIds.join(",")};
			$.ajax({
				url : dto.saveUrl,
				data : sendData,
				type : "POST",
				dataType : "json",
				success :function(data, textStatus, jqXHR){
					if (data && data.success) {
						alert(data.displayMsg);
						doCallBack(dto,selectedUserIds);
					} else {
						alert(data.displayMsg);
					}
				},
				error : function(jqXHR, textStatus, errorThrown){
					alert("请求失败，请检查网络！");
					$('body').unmask();
				}
			})
		}else{
			doCallBack(dto,selectedUserIds);
		}
	}else{
		alert("参数丢失！");
		$('body').unmask();
	}
}

/**
 * 进行回调
 */
function doCallBack(dto,userIds){
	//需要返回信息
	if(dto.needBackUserInfo && dto.needBackUserInfo == 1){
		$.ajax({
			url : "Orgn!getUserInfo.do",
			data : {'userIds':userIds.join(",")},
			type : "POST",
			dataType : "json",
			success :function(data, textStatus, jqXHR){
				if (data) {
					if(dto && dto.callBackFun) {
						if(window.opener){
							window.opener.eval(dto.callBackFun).apply(this,[data]);
						}else{
							window.returnValue = jqXHR.responseText;
						}
					}else{
						window.returnValue = jqXHR.responseText;
					}
				} else {
					alert(data.displayMsg);
				}
				window.close();
			},
			error : function(jqXHR, textStatus, errorThrown){
				alert("请求用户信息失败，请检查网络！");
			}
		})
	}else{
		if(dto && dto.callBackFun) {
			if(window.opener){
				window.opener.eval(dto.callBackFun).apply(this);
			}else{
				window.returnValue = userIds;
			}
			window.close();
		}else{
			window.close();
		}
	}
}