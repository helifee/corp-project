/**
 * author:zhangfangzhi
 * date:20170323
 */
var zTreeObj;
var jqGrid2;
var menuArray;//
$(function(){
	//计算高度
	/*function resizeHeight(){
		//左侧  头部底部为60px  title类 为50px
		var w_h = $(window).height();
		$(".slide-left .ztree-box").height((w_h-89)+"px");
	}*/

	resizeHeight();
	$(window).resize(function() {
		resizeHeight();
	});
	//初始化树
	getCustomTree();
	menuArray = getOperationAuthorition();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    
	//禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
    });
    
    $(".right-content").load("forumType/forumType_list.html");
    
    //所有ajax请求异常的统一处理函数，处理
    $(document).ajaxError(
        function(event,xhr,options,exc ){
            if(xhr.status == 'undefined'){
                return;
            }
            switch(xhr.status){
	            case 403:
	                pop_tip_open("red","系统拒绝。");
	                break;
	            case 404:
	                pop_tip_open("red","您访问的资源不存在。");
	                break;
	            case 500:
	                pop_tip_open("red","服务器异常。");
	                break;
            }
        }
    );
    
});

/************************************************treeBegin******************************************/
/**
 * 树参数设置
 */
var setting = {
		view: {
            dblClickExpand: false,  
            showLine: true,  
            selectedMulti: false,
            fontCss: false,
            nameIsHTML: true
        },  
	edit: {  
		enable: true,
		showRemoveBtn:false,
        showRenameBtn:false,
        drag: {  
            autoExpandTrigger: true,  
            prev: null,  
            inner: null,  
            next: null,
            isCopy: false,
            isMove: true
        }
        
    },  
    data: {
    	keep: {
			leaf: false,
			parent: true
		},
        simpleData: {
            enable: true
        }
    },
    callback: {  
        onClick: null,  
        beforeDrag: null, //拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作  
        beforeDrop: null, //拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作  
        beforeDragOpen: null, //拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作  
        onDrag: null, //捕获节点被拖拽的事件回调函数  
        onDrop: null, //捕获节点拖拽操作结束的事件回调函数
		onCollapse: function(){
			$.xljUtils.treeResizeFn();
		},
        onExpand:  function(){
			$.xljUtils.treeResizeFn();
		}, //捕获节点被展开的事件回调函数
        onClick:zTreeOnClick //点击节点事件
    }  
};


//获取自定义分类树
function getCustomTree() {
//    $.ajax({
//        type:'POST',
//        url:baseUrl + "/sys/base/customFormGroup/getTree",
//        dataType:'json',
//        contentType:'application/json',
//        data:JSON.stringify({'showAll':true}),
//        success: function(json) {
//  var zNodes = json.result;
			var zNodes =[
	             { id:42, pId:0, name:"板块分类设置"},
	             { id:43, pId:0, name:"板块设置"}
	        ];
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
			//加滚动条
			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
				resizeHeight();
			},300);
			var nodes = zTreeObj.getNodes();  
	  		zTreeObj.selectNode(nodes[0],true);  
//        }
//    })
}

/**
 * 递归树匹配节点icon
 */
function recursionArray(arr) {
	for(var i in arr) {
		arr[i].iconSkin = "diy-group";
	}
}

/*
 * 树点击节点事件
 */
function zTreeOnClick(event, treeId, treeNode) {
//	var queryData={"parentId":treeNode.id};
//	jqGrid2.jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
//	$("#listButton").show();
	if(treeNode.id==42){
		$(".right-content").load("forumType/forumType_list.html");
	}else if(treeNode.id==43){
		$(".right-content").load("forum/forum_list.html");
	}
}
function resizeHeight() {
	var height = window.innerHeight;//$(window).height()
	$('.ztree-box').height(height-$('.org-title').outerHeight()-39);
}
/************************************************treeEnd******************************************/
/**
 * 获取按钮权限
 */
function getOperationAuthorition() {
	var menuList;
	$.ajax({
		type: 'GET',
		url: serviceUrl + 'sys/authentication/getUserAuthenticationOperation?t_='+new Date().getTime()+'&appCode=OA&menuCode=ltsz',
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
	return menuList;
}