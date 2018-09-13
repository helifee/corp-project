/**
 * author:zhangfangzhi
 * date:20170608
 */
var zTreeObj;
var jqGrid2;
var type=null;
var sessionId=null;
var rowData;
var rowDataBefore;
$(function(){
	//计算高度
//	function resizeHeight(){
//		//左侧  头部底部为60px  title类 为50px
//		var w_h = $(window).height();
//		$(".slide-left .ztree-box").height((w_h-152)+"px");
//	}
//	resizeHeight();
//	$(window).resize(function() {
//		resizeHeight();
//	});
	if($.inArray("addBtn_01", menuArray)>-1){
		$('#addBtn').show();
	}
	if($.inArray("updateBtn_01", menuArray)>-1){
		$('#updateBtn').show();
	}
	if($.inArray("delsBtn_01", menuArray)>-1){
		$('#delsBtn').show();
	}
	if($.inArray("manageBtn", menuArray)>-1){
		$('#manageBtn').show();
	}
	//初始化表格
	initJqGrid2();
	//input添加伪placeholder
	$("#keywords").inputPlaceholder();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    
	//禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
    });
    
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
 * 初始化表格
 */
function initJqGrid2(){
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: baseUrl+"/oa/bbs/forum/page",
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{"parentId":"-1"},
            datatype : "json", 
            multiboxonly:true,
            multiselect:true,
            autowidth:true,
            rownumbers: true,
            jsonReader : {
                repeatitems: false
            },
            colModel : [ 
                 {name : 'id',label : 'id',hidden:true,align : "center"},
                 {name : 'anonymityPermission',label : 'anonymityPermission',hidden:true,align : "center"},
                 {name : 'publishScore',label : 'publishScore',hidden:true,align : "center"},
                 {name : 'replyScore',label : 'replyScore',hidden:true,align : "center"},
                 {name : 'setEssenceScore',label : 'setEssenceScore',hidden:true,align : "center"},
                 {
                 	label: '板块名称',
                     name: 'name',
                     width: 75,
                     editable: false
                 },
                 {
                 	 label: '上级分类',
                     name: 'forumTypeName',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '版主',
                     name: 'forumManager',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '版块创建人',
                     name: 'createPersonName',
                     width: 120,
                     editable: false
                 },
                 {
 					 label : '创建时间',
                     name: 'createDate',
                     width: 120,
                     editable: false
                 }
             ],
            rowNum : 20,//一页显示多少条
            rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",
            viewrecords : true,
            ondblClickRow:function(rowid){
            	window.open("forum/forum_edit.html?oper=edit&id="+rowid);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                rowDataBefore = rowData;
                if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                	$('#list2').setSelection(rowDataBefore.id,true);
                	$('#list2 '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                }
            },
            onCellSelect: function(){
            	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            		$('#list2 '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
            	}
            },
            onSelectRow: function () {
            	var rowId=$('#list2').jqGrid("getGridParam","selrow");
    		    rowData = $('#list2').jqGrid('getRowData',rowId);
            },
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}


/**
 * 自定义表单添加
 */
function formAdd(){
	window.open("forum/forum_edit.html?oper=add");
}

/**
 * 自定义表单修改
 */
function formEdit(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(ids && ids.length==1){
		window.open("forum/forum_edit.html?oper=edit&id="+ids);
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}

/**
 * 刷新表格
 */
function reloadList(type,id){
	jQuery("#list2").trigger("reloadGrid");
	if(type=="add"){
		rowData = {id:id};
	}
}

/**
 * 查询
 */
function search(){
	var forum={};
	forum.name=null;
	if($("#keywords").getInputVal()){
		forum.name=$("#keywords").getInputVal();
	}
	$("#list2").jqGrid('setGridParam',{postData:forum,page:1}).trigger('reloadGrid');
}

/**
 * 版务管理
 */
function formManage(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(ids && ids.length==1){
		$.ajax({
	        type:'get',
			url : baseUrl + '/oa/bbs/forumPermission/getPermissionFormRole/'+ids+'?time='+Math.random(),
	        success: function(data) {
	        	var resultData=data.result;
	        	if(resultData){
	        		var rd = $('#list2').jqGrid('getRowData',ids);
//	        		if(rd.anonymityPermission=="1"){
//	        			$("#anonymity_permission").html("允许匿名发帖");
//	        		}else if(rd.anonymityPermission=="0"){
//	        			$("#anonymity_permission").html("禁止匿名发帖");
//	        		}
	        		$("#publish_score").html(rd.publishScore);
	        		$("#reply_score").html(rd.replyScore);
	        		$("#set_essence_score").html(rd.setEssenceScore);
	        		$('#bbsForumPermissionForm')[0].reset();
	        		$("#roleIds").val(resultData.roleId);
	        		$("#roleNames").val(resultData.roleName);
	        		$("#bbsForumPermissionForm").find("input[name='forumId']").val(ids);
	        		$(".modal-title").html("版务管理");
	        	    $("#bbsForumPermissionForm").attr('action',baseUrl+'/oa/bbs/forumPermission/save');
	        	    $("#bbsForumPermissionForm").attr('method','POST');
	        		$('#myModal').modal('show');
	        	}
	        }
		});
		$("#clearContent").unbind('click').on('click',function () {//清除内容
		$("#roleNames").val("");
			$("#roleIds").val("");
		});
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}

/**
 * 关闭Modal（冲突需手动关闭）
 * @param modal
 */
function closeModleSelf(modal){
	$("#bbsForumPermissionForm").validate().resetForm(); //清除验证
	$('#myModal').modal('hide');
}

/**
 * 版务保存
 */
function saveForm(){
	$('#bbsForumPermissionForm').attr('data-callback','formCallBack(true)');
    $('#bbsForumPermissionForm').submit();
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
        	$('#myModal').modal('hide');
        }else {
            pop_tip_open("red","数据保存失败！");
        }
    }
}

/**
 * 自定义表单删除
 */
function formDel(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(!ids||ids.length==0) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var prevId = $("#list2 #" + ids).prev()[0].id;
	var delCount=ids.length;
	ids = ids.join(",");
	if(ids&&ids!='') {
		$.ajax({
	        type:'get',
			url : baseUrl + 'oa/bbs/forum/isExistTopic/'+ids+'?time='+Math.random(),
	        success: function(data) {
	        	var resultData=data.result;
	        	if(resultData){
	        		if(resultData.hasInstance){
	        			pop_tip_open("blue","选中的版块第"+resultData.validateRow+"行下存在帖子不能删除！");
	        		}else{
	        			pop_text_open("blue","确认删除【"+delCount+"】个版块吗？",function(){
							$.ajax({
								url:baseUrl+"/oa/bbs/forum/deletePseudo/"+ids,
								type:'DELETE',
								dataType:'JSON',
								success:function (resultData ) {
									if (resultData && resultData.success) {
										rowData = $("#list2").jqGrid("getRowData",prevId);
										reloadList();
									}else{
										pop_tip_open("red","删除数据失败！");
									}
								}
							});
						},true);
	        		}
	        	}
        	}
		});
	}
}
