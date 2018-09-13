//模板业务类型树 的参数配置
var setting = {
	view: {
        dblClickExpand: false,  
        showLine: false,
        selectedMulti: false,
        nameIsHTML: true
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
        onCollapse: function(){
            $.xljUtils.treeResizeFn();
        },
        onClick:zTreeOnClick //点击节点事件
    }  
};
/**
 * 获取凭证模板树
 */
function getTempTree() {
	//获取组织机构树地址
    var urlBody = "finance/voucherTemplateType/queryList"+'?time='+Math.random();
    var urlAll = hostUrl + urlBody;
    var jsonData={
    		delflag:0,
    		accountSetId:$("#selectCompany").val()==null?"null":$("#selectCompany").val(),
    		companyId:$('#companySct').val()==null?"null":$('#companySct').val()
    };
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(jsonData),
        success: function(json) {
        	//返回的数据节点
            var zNodes = json.result;
            
           var zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);

            var nodes = zTreeObj.getNodes();
            //默认展开第一个节点
            zTreeObj.expandNode(nodes[0], true, false, false,false);

			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
			
        },error:function(XMLHttpRequest, textStatus, errorThrown){
        	pop_tip_open("red","获取组织机构树请求失败");
        }
    })
}
/**
 * 树点击节点事件
 */
function zTreeOnClick(event, treeId, treeNode) {
	var treeTypeId = treeNode.id;
	var treeTypeName = treeNode.name;
	
	var queryDataPost={
			"typeId":treeTypeId,
			"delflag":0
	};
	//模板数据
	$.ajax({
        type:'post',
        url:hostUrl+'finance/voucherTemplate/queryList'+'?time='+Math.random(),
        async: false,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(queryDataPost),
        success: function(data) {
        	var formData=data.result;
        	if(formData){
        		//凭证模板
        		$("#fieldEditFrom").find("input[name='id']").val(formData.id);
        		$("#fieldEditFrom").find("input[name='typeId']").val(formData.typeId);
        		$("#fieldEditFrom").find("input[name='typeName']").val(treeTypeName);
        		$("#fieldEditFrom").find("select[name='bizObjectId']").val(formData.bizObjectId);
        		$("#fieldEditFrom").find("input[name='bizObjectName']").val(formData.bizObjectName);
        		$("#fieldEditFrom").find("input[name='remark']").val(formData.remark);
        		$("#fieldEditFrom").find(":radio[name='status'][value="+formData.status+"]").attr("checked",true);
        		$("#fieldEditFrom").find("select[name='word']").val(formData.word);
        		$("#fieldEditFrom").find("select[name='filter']").val(formData.filter);
        		//凭证模板分录
        		
        	}else{
        		$("#fieldEditFrom").find("input[name='typeId']").val(formData.typeId);
        		$("#fieldEditFrom").find("input[name='typeName']").val(treeTypeName);
        	}
    	},
   	    error: function(XMLHttpRequest, textStatus, errorThrown) {
		   pop_tip_open("red","服务异常,请联系管理员！");
        }
	});
}
//计算高度
function resizeHeight(){
    //左侧  头部底部为60px  title类 为50px
	var w_h = $(window).height();
    $(".slide-left .ztree-box").height((w_h-90)+"px");
}
$(function () {
	//miying样式初始化需要
    resizeHeight();
  //初始化组织机构树
    getTempTree();
});
