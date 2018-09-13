/**
 * Created by ztf on 2017/6/19.
 */
var rowDataId;
var rowDataBeforeId;
$(function(){
    //数据权限按钮
    $.xljUtils.btnPowerOperation("OA",$.xljUtils.getUrlParam("btnMenuCode"));
    /**
     * 初始化调查问卷列表
     */
    function initCategoryList() {
        var categoryGrid = jQuery("#serveyTemplateList").jqGrid({
            url: serviceUrl + 'oa/servey/page',
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            datatype: "json",
            postData: {delflag: false,"serveyType":"0"},
            multiboxonly: true,
            multiselect: true,
            autowidth: true,
            rownumbers: true,
            jsonReader: {
                repeatitems: false
            },
            colNames: ['ID', '问卷名称', '分类名称', '问卷描述', '创建日期'],
            colModel: [
                {name: 'id', index: 'id', width: 55, hidden: true},
                {name: 'name', index: 'name'},
                {name: 'serveyCategoryName', index: 'serveyCategoryName'},
                {name: 'description', index: 'description'},
                {name: 'createDate', index: 'createDate'}
            ],
            rowNum: 20,//一页显示多少条
            rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
            pager: '#serveyTemplatePager',//表格页脚的占位符(一般是div)的id
            viewrecords: true,
            ondblClickRow: function(id,name){
            	window.open('serveyTemplate_edit.html?act=update&id='+id, '_blank');
			},
			onCellSelect: function(){
	        	if(rowDataBeforeId!=null&&rowDataBeforeId!='undefined'){
	        		//重新选择行时清除上一次选中行的样式
	        		$('#serveyTemplateList'+'#'+rowDataBeforeId).find("td").removeClass("ui-state-highlight"); 
	        	}
	        },
            loadError: function (xhr, status, error) {
                $.xljUtils.getError(xhr.status);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                if(rowDataId!=null&&rowDataId!='undefined'){
                	//添加回显选中行样式
                	$('#serveyTemplateList').setSelection(rowDataId,true);
                	$('#serveyTemplateList'+'#'+rowDataId).find("td").addClass("ui-state-highlight"); 
                }
                rowDataBeforeId = rowDataId;
            },
            loadComplete: function (xhr) {

            }
        });
    }
    initCategoryList();
    //input添加伪placeholder
    $('#keywords').inputPlaceholder();
    $.xljUtils.resizeNestedGrid();

    //新增分类信息
    $('#createBtn').on('click',function () {
        window.open('serveyTemplate_edit.html?act=create', '_blank');
    });
    
  //模糊查询按钮绑定事件
    $("#searchBtn").unbind('click').on('click',function () {
    	fuzzySearch();
    });
    
    
  //删除
    $("#deleteBtn").unbind('click').on('click',function () {
        del();
    });
    
  //预览
    $("#previewBtn").unbind('click').on('click',function () {
    	preview();
    });
    
    /**
     * 预览问卷
     */
    function preview(){
    	 //判断是否选择多行
        var idsVal = $('#serveyTemplateList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行预览！");
            return;
        }

        //判断是否选择数据
        var idVal = $('#serveyTemplateList').jqGrid('getGridParam', 'selrow');
        if (!idVal) {
            $.xljUtils.tip('blue', "请选择一条需要预览的数据！");
            return;
        }
        var rowData = $('#serveyTemplateList').jqGrid("getRowData",idVal);
    	window.open(serviceUrl+"oa/servey/serveyQuestionnaire/serveyQuestionnaire_edit.html?serveyId=" + idVal + "&oper=add&serveyName=" + encodeURI(rowData.name, "UTF-8") + "&type=1");
    }

    //更新数据
    $('#updateBtn').on('click',function () {
        //判断是否选择多行
        var idsVal = $('#serveyTemplateList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行更新！");
            return;
        }

        //判断是否选择数据
        var idVal = $('#serveyTemplateList').jqGrid('getGridParam', 'selrow');
        if (!idVal) {
            $.xljUtils.tip('blue', "请选择一条需要更新的数据！");
            return;
        }
        window.open('serveyTemplate_edit.html?act=update&id='+idVal, '_blank');
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
    var queryDataObj =  $('#serveyTemplateList').jqGrid('getGridParam','postData');
    var queryData = {};
    queryData.sortFields = queryDataObj.sortFields;
    if(param!='') {
        queryData.name = param;
        queryData.fuzzyQueryFields = JSON.stringify(['name']);
    }
    console.log(queryData);
    delete queryDataObj.name;
    delete queryDataObj.fuzzyQueryFields;
    delete queryDataObj.sortFields;

    jQuery("#serveyTemplateList").jqGrid('setGridParam', {postData: queryData,"serveyType":"0",page:1}).trigger('reloadGrid');
};

/**
 * 删除数据
 */
function del(){
	 
	 var idsVal = $('#serveyTemplateList').jqGrid('getGridParam','selarrrow');
	 if(idsVal&&idsVal!="") {
		   pop_text_open("blue", "确认要删除这【" +idsVal.length + "】条数据吗？",function(){
			   if(idsVal.length > 0){
				   var $jqSublObj = $('#'+idsVal[0]).prev();
				   if($jqSublObj.length > 0){
					   if($jqSublObj[0].id != null && $jqSublObj[0].id != ""){
						   rowDataId = $jqSublObj[0].id;
					   }else{
						   var $jqSiblObj = $('#'+idsVal[idsVal.length-1]).next();
						   if($jqSiblObj.length > 0){
							   rowDataId = $jqSiblObj[0].id;
						   }
					   }
				   }else{
					   var $jqSiblObj = $('#'+idsVal[idsVal.length-1]).next();
					   if($jqSiblObj.length > 0){
						   rowDataId = $jqSiblObj[0].id;
					   }
				   }
			   }
			   $.ajax({
		        	 url:serviceUrl+"/oa/servey/deleteBatch/"+idsVal,
		        	 type:'DELETE',
		        	 dataType:'JSON',
		        	 contentType:'application/json',
		        	 data:JSON.stringify({}),
		        	 success:function (xhr,textStatus ) {
		        		 console.log(xhr);
		        		 if (xhr){
		        			 if(xhr.success) {
		        				 pop_tip_open("green","数据删除成功！");
		        				 $('#serveyTemplateList').jqGrid().trigger("reloadGrid");
			        		 }else{
			        			 if(xhr.code=="50000"){
			        				 pop_tip_open("red",xhr.msg);
			        				 return;
			        			 }
			        			 pop_tip_open("red","数据删除失败！");
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
	 $('#serveyTemplateList').jqGrid().trigger("reloadGrid");
}