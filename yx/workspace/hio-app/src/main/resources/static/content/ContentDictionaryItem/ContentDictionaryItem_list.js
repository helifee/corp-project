/**
 * author:wangw
 */
var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onClick: loadContentChildByTypeId
    }
};
/**
 * 查询大类树结构
 * null 参数代表查询所有的树结构，不带条件搜索
 */
$(document).ready(function () {
    $.ajax({
        type: "get",
        url: serviceUrl + "oa/content/contentChild/getContentParentTreeById/null",
        dataType: "json",
        contentType: 'application/json',
        success: function (typeNodes) {
            var zNodes = typeNodes.result;
            $.fn.zTree.init($("#contentChildTree"), setting, zNodes);
            //默认加载第一个菜单的列表数据
            if(zNodes.length>0){
            	onClick("","",zNodes[0]);
            }
        }
    });
});

//树增加样式
function recursionArray(arr) {
    for(var i in arr) {
    	arr[i].iconSkin = "diy-system";
    }
};



/**
 * 默认进入只是目录页面的时候，加载左侧树第一个大类信息
 * 加载对应jqgrid数据列表
 */
function onClick(e,treeId,treeNode){
	var contentId = treeNode.id;
	$("#contentTypeId").val(contentId);
	jQuery("#listContentChild").jqGrid(
      {
    	url : baseUrl+"oa/content/contentChild/getContentChildByContentTypeId/"+contentId,
        ajaxGridOptions: { contentType: 'application/json' },
        width:$('.container-all').width(),
        height:$(window).height() - $('.xj-main-breadcrumbs').height() - $('.xj-main-advanced').height() - $('.xj-main-dimsearch').height() - 110,
        data:{},
        mtype : "get",
        datatype : "json",
        jsonReader : {
        	root:"result"
        },
        colModel : [
                     {name : 'id',label : 'id',width : 75, align:"center",hidden:true},
                     {name : 'name',label : '知识类型名称',width : 100,align:"center",editable : true},
                     {name : 'code',label : '知识类型编码',width : 90,align:"center",editable : true},
                     {name : 'parentName',label : '所属知识大类',width : 75, align:"center"},
                     {name : 'typeName',label : '上级知识类型', align:"center",width : 55,editable : true},
                     {name : 'isModel',label : '护眼模式',width : 80,align : "center",editable : true,
                     formatter: function (v, opt, rec) { if (v == '1') return "是";return "否";}},
                     {name : 'isRecord',label : '允许回复',width : 80,align : "center",editable : true,
                     formatter: function (v, opt, rec) { if (v == '1') return "是";return "否";}}
                  ],
            sortname : 'sort',//排序字段
	        pgbuttons: false,
	        viewrecords : true,
	        pager:'#pagered',
	        rownumbers: true,
	        sortorder : "asc",
	        multiboxonly:true,
		    multiselect:true,
	       caption : "",
	       autowidth:true,
	       rowNum:-1,
	       ondblClickRow: function(id){
	        	onClickForm("viewData");
			}
      });
}
/**
 * 单击左侧菜单事件
 * 加载对应jqgrid数据列表
 */

function loadContentChildByTypeId(e,treeId,treeNode){
	var contentId = treeNode.id;
	$("#contentTypeId").val(contentId);
	jQuery("#listContentChild").jqGrid('setGridParam',{
		url:baseUrl+"oa/content/contentChild/getContentChildByContentTypeId/"+contentId

	}).trigger('reloadGrid');
}

/**
 * 添加
 */
function onClickForm(type){
	
	var urlPage ="contentChild_edit.html";
	var ids = jQuery("#listContentChild").jqGrid("getGridParam", "selarrrow");
	var id = jQuery("#listContentChild").jqGrid('getGridParam', 'selrow');
	if(type == 'addForm'){//新建数据
		//第一次点击加载大类的时候，要把大类的信息填充过去
		$("#operationType").val("addForm");
		window.open(urlPage);
	}else if(type == 'delData'){//删除数据
	        if(!id||id.length==0) {
	            $.xljUtils.tip('blue',"请选择要删除的行！");
	            return;
	        }
	        deletecontentChildObj(ids);
	}else if(type == 'updateData'){//修改数据
		if(ids.length > 1) {
	            $.xljUtils.tip('blue',"请选择一行记录进行修改！");
	            return;
	        }
		if (id != null) {
			$("#selectId").val(id);
			$("#operationType").val("updateData");
			window.open(urlPage);
		}else{
			 pop_tip_open("blue","请选择需要修改数据!");
		}
	}else if(type == 'viewData'){//查看数据
		$("#selectId").val(id);
		$("#operationType").val("viewData");
	    window.open(urlPage);
	}
}

//删除知识目录
function deletecontentChildObj(ids){

	   var tipText = "确定要删除这"+ids.length+"条数据吗？";
	     if(ids == "" || ids == null){
	 			pop_tip_open("blue","请选择要删除的行！");
	 	   }else{
	 		    pop_text_open("blue",tipText,function(){
		   		   	 if(ids&&ids!='') {
		                 $.ajax({
		                     url:baseUrl+"oa/content/contentChild/deleteBatch/"+ids,
		                     type:'DELETE',
		                     dataType:'JSON',
		                     success:function (resultData ) {
		                         if (resultData&&resultData.success) {
		                        	 $.xljUtils.tip('green',"数据删除成功！");
		                             jQuery("#listContentChild").trigger('reloadGrid');
		                         }else{
		                             $.xljUtils.tip('red',"删除数据失败！");
		                         }
		                     }
		                 });
		             }
	 		   	},true);
	 	   }
	   
	   
	   
}

var w_h = $(window).height();
resizeHeight();
$(window).resize(function() {
    resizeHeight();
});
//计算高度
function resizeHeight(){
    //左侧  头部底部为60px  title类 为50px
	$(".slide-left .ztree-box").height((w_h-100)+"px");
	//右侧table
	$(".con-table .mytable").height((w_h-80)+"px");
}
