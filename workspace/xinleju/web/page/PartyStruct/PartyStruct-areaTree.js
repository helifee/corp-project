var dt = new Date();
var tree;
var currentNode;

var buildTree = function() {
	dt = new Date();
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '区域'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'PartyStruct!getAreaTree.do?dt='+dt
		}),
		root : root,
		renderTo : 'areaTree',
		rootVisible:false,
		containerScroll: false,
		border : false,
		autoHeight : false,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : false

	});
	tree.on('click', function(node) {

		dt = new Date();
		$.post('PartyStruct!getAreaFullName.do?areaId='+node.id, $('#frm').serialize(), function(data) {
			if(isEmpty(data.result)){
				window.parent.chooseArea(node.text,node.attributes.id);
			}else{
				window.parent.chooseArea(data.result,node.attributes.id);
			}

		});


	});

	tree.on('beforeload', function(node) {
		dt = new Date();
		tree.loader.dataUrl = 'PartyStruct!getAreaTree.do?parentId='+node.id+'&dt='+dt.getTime();
	});

	root.expand();
	root.select();
	tree.loader.on("load",function(node,response){
		root.firstChild.expand();
	});

};



var init = function() {
	buildTree();

};

Ext.onReady(init);
