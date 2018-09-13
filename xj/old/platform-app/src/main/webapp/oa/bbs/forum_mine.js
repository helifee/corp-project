/**
 * author:zhangfangzhi
 * date:20170613
 */
var zTreeObj;
var jqGrid2;
var status; // PUBLISHED/DRAFT
var oper; // launch/reply
var menuArray;//
$(function(){
	//计算高度
	resizeHeight();
	$(window).resize(function() {
		resizeHeight();
	});
	//初始化树
	initTree();
	
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    menuArray = getOperationAuthorition();
	//禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
    });
    oper = 'launch';
    status = 'PUBLISHED';
    $(".right-content").load("topic/topic_list.html");
    
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


    SetCwinHeight();
    
});
//计算高度
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    $('.xj-main-grid').height(w_h - 256);
    $(".ztree-box").height((w_h - $('.forum-title').outerHeight() - 38));
    //动态计算各grid的宽高
}

function SetCwinHeight()
{
    var cwin=document.getElementById("content");
    if (document.getElementById)
    {
        if (cwin && !window.opera)
        {
            if (cwin.contentDocument && cwin.contentDocument.body.offsetHeight)
                cwin.height = cwin.contentDocument.body.offsetHeight;
            else if(cwin.Document && cwin.Document.body.scrollHeight)
                cwin.height = cwin.Document.body.scrollHeight;
        }
    }
}
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
function initTree() {
	var zNodes =[
         { id:11, pId:0, name:"发表的帖子"},
         { id:12, pId:0, name:"参与的讨论"},
         { id:13, pId:0, name:"论坛用户信息"},
         { id:14, pId:0, name:"草稿帖子"}
    ];
    recursionArray(zNodes);
    zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	//加滚动条
	setTimeout(function(){
		$.xljUtils.addTreeScroll('ztree-box');
		$.xljUtils.treeResizeFn();
	},300);
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
	if(treeNode.id==11){
        oper = 'launch';
        status = 'PUBLISHED';
        $(".right-content").load("topic/topic_list.html");
	}else if(treeNode.id==12){
        oper = 'reply';
        status = 'PUBLISHED';
		$(".right-content").load("topic/topic_list.html");
	}else if(treeNode.id==13){
		$(".right-content").load("forumUser/forumUser_view.html?r="+Math.random());
	}else if(treeNode.id==14){
        oper = 'launch';
        status = 'DRAFT';
		$(".right-content").load("topic/topic_list.html")
	}
}
/**
 * 获取按钮权限
 */
function getOperationAuthorition() {
    var menuList;
    $.ajax({
        type: 'GET',
        url: hostUrl + 'sys/authentication/getUserAuthenticationOperation?t_='+new Date().getTime()+'&appCode=OA&menuCode=wdlt',
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
/************************************************treeEnd******************************************/
