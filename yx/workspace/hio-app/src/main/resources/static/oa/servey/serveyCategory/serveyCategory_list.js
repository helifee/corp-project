/**
 * Created by dgh on 2017/5/8.
 * update by ztf on 2017/6/16
 */
var rowDataId;
var rowDataBeforeId;
$(function(){
    //数据权限按钮
    $.xljUtils.btnPowerOperation("OA",$.xljUtils.getUrlParam("btnMenuCode"));

    //input添加伪placeholder
    $("#keywords").inputPlaceholder();
    initCategoryList();
    $.xljUtils.resizeNestedGrid();
    //新增分类信息
    $('#createBtn').on('click',function () {
    	//判断是否选择多行
        var idsVal = $('#serveyCategoryList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "最多选择一行数据进行新增！");
            return;
        }
        var idVal = $('#serveyCategoryList').jqGrid('getGridParam', 'selrow');
        var rowData = $('#serveyCategoryList').jqGrid("getRowData",idVal);
        if(idVal != null){
        	window.open('serveyCategory_edit.html?act=create&id='+idVal+'&name='+encodeURI(rowData.name, "UTF-8"), '_blank');
        }else{
        	window.open('serveyCategory_edit.html?act=create', '_blank');
        }
    });
    
  //模糊查询按钮绑定事件
    $("#searchBtn").unbind('click').on('click',function () {
    	fuzzySearch();
    });
    
    
  //删除
    $("#deleteBtn").unbind('click').on('click',function () {
        del();
    });

    //更新数据
    $('#updateBtn').on('click',function () {
        //判断是否选择多行
        var idsVal = $('#serveyCategoryList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行更新！");
            return;
        }

        //判断是否选择数据
        var idVal = $('#serveyCategoryList').jqGrid('getGridParam', 'selrow');
        if (!idVal) {
            $.xljUtils.tip('blue', "请选择一条需要更新的数据！");
            return;
        }
        window.open('serveyCategory_edit.html?act=update&id='+idVal, '_blank');
    });
    
    document.onkeydown = function(e){
        var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
        	fuzzySearch();
         }
    };

});

/**
 * 模糊查询: 分类名称
 */
function fuzzySearch(){
	var param = $('#keywords').getInputVal().trim();
    jQuery("#serveyCategoryList").jqGrid('setGridParam', {postData: {"name":param,page:1}}).trigger('reloadGrid');
};

/**
 * 初始化调查类型列表
 */
function initCategoryList() {
    var categoryGrid = jQuery("#serveyCategoryList").jqGrid({
        url: serviceUrl + 'oa/servey/serveyCategory/page',
        ajaxGridOptions: {contentType: 'application/json'},
        mtype: "POST",
        contentType: "application/json",
        datatype: "json",
        postData: {delflag: false},
        multiboxonly: false,
        multiselect: false,
        autowidth: true,
        rownumbers: true,
        jsonReader: {
            repeatitems: false
        },
        colNames: ['ID', '分类名称', '父级分类', '分类描述', '创建日期'],
        colModel: [
            {name: 'id', index: 'id', width: 55, hidden: true},
            {name: 'name', index: 'name'},
            {name: 'parentName', index: 'parentName'},
            {name: 'description', index: 'description'},
            {name: 'createDate', index: 'createDate'}
        ],
        rowNum: 20,//一页显示多少条
        rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
        pager: '#serveyCategoryPager',//表格页脚的占位符(一般是div)的id
        viewrecords: true,
        ondblClickRow: function(id,name){
        	window.open('serveyCategory_edit.html?act=update&id='+id, '_blank');
		},
		onCellSelect: function(){
        	if(rowDataBeforeId!=null&&rowDataBeforeId!='undefined'){
        		//重新选择行时清除上一次选中行的样式
        		$('#serveyCategoryList'+'#'+rowDataBeforeId).find("td").removeClass("ui-state-highlight"); 
        	}
        },
        onSelectRow: function () {
        },
        loadError: function (xhr, status, error) {
            $.xljUtils.getError(xhr.status);
        },
        gridComplete: function () {
            $.xljUtils.addGridScroll();
            $.xljUtils.gridResizeFn();
            if(rowDataId!=null&&rowDataId!='undefined'){
            	//添加回显选中行样式
            	$('#serveyCategoryList').setSelection(rowDataId,true);
            	$('#serveyCategoryList'+'#'+rowDataId).find("td").addClass("ui-state-highlight"); 
            }
            rowDataBeforeId = rowDataId;
        },
        loadComplete: function (xhr) {

        }
    });
}

/**
 * 删除数据
 */
function del(){
	 
	var idVal = $('#serveyCategoryList').jqGrid('getGridParam', 'selrow');
    if (idVal) {
		   pop_text_open("blue", "确认要删除这【1】条数据吗？",function(){
			   var $jqSublObj = $('#'+idVal).prev();
			   if($jqSublObj.length > 0){
				   if($jqSublObj[0].id != null && $jqSublObj[0].id != ""){
					   rowDataId = $jqSublObj[0].id;
				   }else{
					   var $jqSiblObj = $('#'+idVal).next();
					   if($jqSiblObj.length > 0){
						   rowDataId = $jqSiblObj[0].id;
					   }
				   }
			   }else{
				   var $jqSiblObj = $('#'+idVal).next();
				   if($jqSiblObj.length > 0){
					   rowDataId = $jqSiblObj[0].id;
				   }
			   }
			   $.ajax({
		        	 url:baseUrl+"/oa/servey/serveyCategory/deleteBatch/"+idVal,
		        	 type:'DELETE',
		        	 dataType:'JSON',
		        	 contentType:'application/json',
		        	 data:JSON.stringify({}),
		        	 success:function (xhr,textStatus ) {
		        		 if (xhr){
		        			 if(xhr.success) {
		        				 pop_tip_open("green","数据删除成功！");
		        				 $('#serveyCategoryList').jqGrid().trigger("reloadGrid");
			        		 }else{
			        			 if(xhr.code=="50000"){
			        				 pop_tip_open("red",xhr.msg);
			        				 return;
			        			 }
			        			 pop_tip_open("red",xhr.msg);
			        		 }
		        		 }else{
		        			 pop_tip_open("red","服务异常,请联系管理员！");
		        		 }
		        	 },
		          	 error: function(xhr, textStatus, errorThrown) {
		              	   console.log(xhr);
		              		 pop_tip_open("red","服务异常,请联系管理员！");
		              	}
		         });
		   },true);
		   return;
    }else{
   	 pop_tip_open("blue","请选择要删除的数据！");
    }
 }

function reloadGrid(id){
	pop_tip_open("green","数据操作成功！");
	rowDataId = id;
	$('#serveyCategoryList').jqGrid().trigger("reloadGrid");
}
$(window).resize(function(){
    $.xljUtils.resizeNestedGrid();
});
