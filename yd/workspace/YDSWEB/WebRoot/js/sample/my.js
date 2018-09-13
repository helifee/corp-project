/*
 * 说明：本文件中的1、2、3条是调用共通方法实现，其实的都是自已的业务逻辑
 */

/**
 * 提交事件
 */
function treeSubmit(){
	
	//2. 取得选择的职位(调用ydsTree.js中的方法)
	var pos = getSelected();
	
	unselectAll();
	
	var url = '../sample/saveTree.action';
	
	//3. 序列化取得的职位数组
	//bean.posIdList：bean是action中的一个Bean的名字，posIdList是这个bean里的一个List
	//如果有其它参数要向后台传递，可：var params = 'a=' + a + '&' + serialize(pos, 'treeBean.posIdList');
	var params = serialize(pos, 'treeBean.posIdList');
	
	var request = new Ajax.Request(url, {
		method: 'post',
		parameters: params,
		onComplete: function() {},
		asynchronous: true
	});
	
}

window.onload = function() {
	
	//1. 页面加载时创建树
	createTree('myTree', '../common/positionTree.action');
	
	bind('test');
	
	//注册按钮事件
	Event.observe('button1','click', treeSubmit);
}