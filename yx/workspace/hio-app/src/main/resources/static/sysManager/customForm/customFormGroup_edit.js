/**
 * author:zhangfangzhi
 * date:20170710
 */
var zTreeObj;
var type = null;
var parentId =null;
var currentDataId=null;	//当前节点ID
var parentDataId=null;	//上级ID
var isChangeParent=false;	//是否更换上级
$(function () {
	parentId = $.xljUtils.getUrlParam('parentId'); 
    type = $.xljUtils.getUrlParam('type');
    if(parentId=="0"){
    	$("#preFenLei").css("display","none");
    }
	//初始化form数据
    initFormData();
	
    //禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
    });
    
    if(!parentId){
    	$("#customForumGroupForm").find("input[name='parentId']").val("0");
    }
    
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

/**
 *  初始化附件分类树
 */
function initTreeSelect(){
	$(".parent-selecter").unbind( "click" );
	$('.parent-selecter').xljSingleSelector({
		title:'选择上级分类',//选择器标题，默认是'选择组织机构'
		selectorType:'eeee',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
		treeUrl:serviceUrl + '/sys/base/customFormGroup/getTree'+'?time='+Math.random(),// 生成zTree树的请求url,不指定使用默认对应类型的url
		treeParam:{'parentId':'0'},//生成zTree树的请求参数，json对象
		targetId:'parentId',//选择的数据的ID存储input域的id
		targetName:'parentName',//选择的数据的Name存储input域
		saveCallback:function (selectData,ele) {
			if (selectData != null) {
				$("#parentName").val($.xljUtils.htmlEncode(selectData.name));
				$("input[name='parentId']").val(selectData.id);
				parentDataId=selectData.id;
				isChangeParent=true;
			}
		},
		formatTreeJson:formatZTreeData,
		treeSettings:{data:{
			simpleData: {
				enable: true
			}
		}}
	});
}

/**
 * 根据查询返回数据整理成zTree需要的JSON数据
 * @param arr
 * @returns
 */
function formatZTreeData(arr) {
	var zNodes = [];
	
	for (var i = 0; i < arr.length; i++) {
		var iconStyle='diy-group';
		if(arr[i].pId == '0') {
			iconStyle = "diy-program";
		}else {
			iconStyle = "diy-group";
	    } 
		zNodes.push({id:arr[i].id, pId:arr[i].pId, name:$.xljUtils.htmlDecode(arr[i].name),iconSkin:iconStyle});
	}
	return zNodes;
};

/*******************************************treeBegin************************************************/

/**
 * 树参数设置
 */
var setting = {
	view: {
        dblClickExpand: false,  
        showLine: false,  
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
        onExpand: null, //捕获节点被展开的事件回调函数  
        onClick:zTreeOnClick //点击节点事件
    }  
};

/**
 * 节点点击事件
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnClick(event, treeId, treeNode) {
	
}

/**
 * 递归树匹配节点icon
 * @param arr
 */
function recursionArray(arr) {
	for(var i in arr) {
		if(arr[i].pId == '0') {
			arr[i].iconSkin = "diy-group";
		}else {
			arr[i].iconSkin = "diy-program";
	    } 
	}
}
/*******************************************treeEnd************************************************/

/**
 * 初始化form数据
 */
function initFormData() {
    //获取url中的参数type,id
    var id = $.xljUtils.getUrlParam('id');
    if("add"==type){
    	$(".show_title").html("单据分类-新增");
    	$.ajax({
	          type:'get',
	          url:serviceUrl+'/sys/uuid/generator/getGuuid'+'?time='+Math.random(),
	          success: function(data) {
	  	        var guuid=data.result;
	  		    $("#customForumGroupForm").find("input[name='id']").val(guuid);
	  	    }
	  	});
    	if(parentId!=null && parentId!=""){
    		var parentName=decodeURI(escape($.xljUtils.getUrlParam("parentName")));
    		$("#parentName").val(parentName);
	        $("#customForumGroupForm").find("input[name='parentId']").val(parentId);
    	}
        $("#customForumGroupForm").attr('action',serviceUrl+'/sys/base/customFormGroup/save');
        $("#customForumGroupForm").attr('method','POST');
    }else {
    	$(".show_title").html("单据分类-修改");
    	var id = $.xljUtils.getUrlParam('id');
    	currentDataId=id;
    	var parentName=decodeURI(escape($.xljUtils.getUrlParam("parentName")));
        $.ajax({
            url:serviceUrl+'/sys/base/customFormGroup/get/'+id+'?time='+Math.random(),
            type:'GET',
            success:function (resultData) {
                if(resultData&&resultData.success) {
                    var result = resultData.result;
                    for(var item in result) {
                        if($("#customForumGroupForm :input[name='"+item+"']").length>0){
                            $("#customForumGroupForm :input[name='"+item+"']").val(result[item]);
                        }
                    }
                    parentDataId=result.parentId;
                    $("#parentName").val($.xljUtils.htmlEncode(parentName));
                    $("#customForumGroupForm").attr('action',serviceUrl+'/sys/base/customFormGroup/update/'+result['id']);
                    $("#customForumGroupForm").attr('method','PUT');
                    
                }
            }
        });
    }
}

/**
 * 关闭Modal（冲突需手动关闭）
 * @param modal
 */
function closeModleSelf(modal){
	$('#'+modal).modal('hide');
}

/**
 * 表单保存
 * @param op
 */
function saveForm(op){
	$('#customForumGroupForm').attr('data-callback','formCallBack(true)');
    $('#customForumGroupForm').submit();
}

/**
 * form表单提交回调函数
 */
function formCallBack(isSave,resultJsonData) {
    if(resultJsonData) {
        var successFlag = resultJsonData.success;
        var msg = resultJsonData.msg;
        var result = resultJsonData.result;
        if(successFlag) {
     	   if(result.codeExist){
     		   //code重复
     		   $("#customForumGroupForm").find("input[name='code']").parent().addClass("has-error has-feedback");
	           $("#customForumGroupForm").find("input[name='code']").after("<label id='code-error' class='error help-block' style='margin: 0px; float: left;' for='code'>编码重复请重新输入</label>");
     	   }else{
     		   $("#customForumGroupForm").find("input[name='code']").parent().removeClass("has-error has-feedback");
	           $("#customForumGroupForm").find("input[name='code']").after("");
     	   }
     	   if(result.nameExist){
     		   //name重复
     		   $("#customForumGroupForm").find("input[name='name']").parent().addClass("has-error has-feedback");
	           $("#customForumGroupForm").find("input[name='name']").after("<label id='name-error' class='error help-block' style='margin: 0px; float: left;' for='name'>名称重复请重新输入</label>");
     	   } else{
     		   $("#customForumGroupForm").find("input[name='name']").parent().removeClass("has-error has-feedback");
	           $("#customForumGroupForm").find("input[name='name']").after("");
     	   }
     	   if(result.codeExist==false && result.nameExist==false){
     		   if(type=="edit"){
     			  result.name=$("#customForumGroupForm").find("input[name='name']").val();
     			  result.code=$("#customForumGroupForm").find("input[name='code']").val();
     			  result.isChangeParent=isChangeParent;
     			  result.currentDataId=currentDataId;
     			  result.parentDataId=parentDataId;
     		   }else if(type=="add"){
     			   var parentId=$("#customForumGroupForm").find("input[name='parentId']").val();
        		   if(parentId=="0" || isChangeParent==true){
        			   result.cleanParent="1";
        		   }
     		   }
     		   
     		   window.opener.reloadTree(type,result);
               window.close();
     	   }
        }else {
            pop_tip_open("red","数据保存失败！");
        }
    }
}

/**
 * 清除选中（用于选择根节点）
 */
function cleanParent(){
	$("#parentName").val("");
	isChangeParent=true;
	$("#customForumGroupForm").find("input[name='parentId']").val("0");
}

/**
 * 选择上级树
 */
function openTreeModal(){
//	if(parentId!=null && parentId!=""){
//		$('#replaceTreeModal').modal('show');
		initTreeSelect();
//	}else{
//		pop_tip_open("blue","暂无上级分类");
//	}
}

/**
 * 上级保存回调
 */
function saveGroupTree(){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getSelectedNodes();
	if(nodes.length>0){
    	$("#parentName").val(nodes[0].name);
		$("#customForumGroupForm").find("input[name='parentId']").val(nodes[0].id);
		parentDataId=nodes[0].id;
		isChangeParent=true;
		$('#replaceTreeModal').modal('hide');
	}else{
		pop_tip_open("blue","请选中操作节点！");
	}
}
