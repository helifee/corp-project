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
        var categoryGrid = jQuery("#serveyCreateList").jqGrid({
            url: serviceUrl + 'oa/servey/serveyCreate/pageByUser',
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            datatype: "json",
            postData: {delflag: false,"serveyType":"1"},
            multiboxonly: true,
            multiselect: true,
            autowidth: true,
            rownumbers: true,
            jsonReader: {
                repeatitems: false
            },
            colNames: ['ID', '问卷名称', '分类名称', '问卷描述', '执行状态', '创建日期','流程id'],
            colModel: [
                {name: 'id', index: 'id', width: 55, hidden: true},
                {name: 'name', index: 'name'},
                {name: 'serveyCategoryName', index: 'serveyCategoryName'},
                {name: 'description', index: 'description'},
                {name: 'status', index: 'status'},
                {name: 'createDate', index: 'createDate'},
                {name: 'instanceId', index: 'instanceId', hidden: true}
            ],
            rowNum: 20,//一页显示多少条
            rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
            pager: '#serveyCreatePager',//表格页脚的占位符(一般是div)的id
            viewrecords: true,
            ondblClickRow: function(id,name){
            	var rowData = $('#serveyCreateList').jqGrid("getRowData",id);
            	if(rowData.status == "草稿"){
            		window.open('serveyCreate_edit.html?act=update&id='+id, '_blank');
            	}else{
            		window.open('serveyCreate_flow_over.html?act=update&id='+id, '_blank');
            	}
			},
			onCellSelect: function(){
	        	if(rowDataBeforeId!=null&&rowDataBeforeId!='undefined'){
	        		//重新选择行时清除上一次选中行的样式
	        		$('#serveyCreateList'+'#'+rowDataBeforeId).find("td").removeClass("ui-state-highlight"); 
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
                	$('#serveyCreateList').setSelection(rowDataId,true);
                	$('#serveyCreateList'+'#'+rowDataId).find("td").addClass("ui-state-highlight"); 
                }
                rowDataBeforeId = rowDataId;
            },
            loadComplete: function (xhr) {

            }
        });
    }
    initCategoryList();
    $.xljUtils.resizeNestedGrid();
	//input添加伪placeholder
	$('#keywords').inputPlaceholder();
    //新增分类信息
    $('#createBtn').on('click',function () {
        window.open('serveyCreate_edit.html?act=create', '_blank');
    });
    
  //模糊查询按钮绑定事件
    $("#searchBtn").unbind('click').on('click',function () {
    	fuzzySearch();
    });
    
  //结束调查
    $("#investigationOver").unbind('click').on('click',function () {
    	//判断是否选择多行
        var idsVal = $('#serveyCreateList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行结束调查！");
            return;
        }

        //判断是否选择数据
        var idVal = $('#serveyCreateList').jqGrid('getGridParam', 'selrow');
        if (!idVal) {
            $.xljUtils.tip('blue', "请选择一条需要结束的数据！");
            return;
        }
        var rowData = $('#serveyCreateList').jqGrid("getRowData",idVal);
        if(rowData.status == "进行中"){
        	investigationOver(idVal);
        }else{
        	 $.xljUtils.tip('blue', "只能结束状态为进行中的数据！");
             return;
        }
    });
    
  //催办未调查者
    $("#remindersNotInvestigators").unbind('click').on('click',function () {
    	//判断是否选择多行
        var idsVal = $('#serveyCreateList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行催办未调查者！");
            return;
        }

        //判断是否选择数据
        var idVal = $('#serveyCreateList').jqGrid('getGridParam', 'selrow');
        if (!idVal) {
            $.xljUtils.tip('blue', "请选择一条需要催办的数据！");
            return;
        }
        var rowData = $('#serveyCreateList').jqGrid("getRowData",idVal);
        if(rowData.status == "进行中"){
        	 remindersNotInvestigators(idVal);
        }else{
        	 $.xljUtils.tip('blue', "只能催办状态为进行中的数据！");
             return;
        }
        
    });
    
    
  //删除
    $("#deleteBtn").unbind('click').on('click',function () {
        del();
    });
    
  //预览
    $("#previewBtn").unbind('click').on('click',function () {
    	preview();
    });
    
  //修改调查结束时间
    $("#updateThruDate").unbind('click').on('click',function () {
    	//判断是否选择多行
        var idsVal = $('#serveyCreateList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行修改！");
            return;
        }

        //判断是否选择数据
        var idVal = $('#serveyCreateList').jqGrid('getGridParam', 'selrow');
        if (!idVal) {
            $.xljUtils.tip('blue', "请选择一条需要修改的数据！");
            return;
        }
        var rowData = $('#serveyCreateList').jqGrid("getRowData",idVal);
        if(rowData.status == "进行中"){
        	 $("#updateDateServeyId").val(idVal);
        	 $("#thruDate").val("")
             $("#myModal").modal({backdrop:'static',show:true});
        }else{
        	 $.xljUtils.tip('blue', "只能修改状态为进行中的数据！");
             return;
        }
       
    });
    
    
    //查看审批
    $("#seeFlowBtn").unbind('click').on('click',function () {
    	//判断是否选择多行
        var idsVal = $('#serveyCreateList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行查看！");
            return;
        }

        //判断是否选择数据
        var idVal = $('#serveyCreateList').jqGrid('getGridParam', 'selrow');
        if (!idVal) {
            $.xljUtils.tip('blue', "请选择一条需要查看的数据！");
            return;
        }
        var rowData = $('#serveyCreateList').jqGrid("getRowData",idVal);
        if(rowData.status == "草稿"){
        	 $.xljUtils.tip('blue', "草稿状态没有审批流程！");
        }else{
        	if(rowData.instanceId == null || rowData.instanceId == "" || rowData.instanceId == "undefined"){
        		$.xljUtils.tip('blue', "当前问卷没有审批流程！");
				return;
			}
        	var pcUrl = "/platform-app/oa/servey/serveyCreate/serveyCreate_flow.html?businessId="+rowData.id;
			window.open("/platform-app/flow/runtime/approve/flow.html?instanceId="+rowData.instanceId+"&requestSource=start&businessId="+rowData.id+"&pcUrl="+pcUrl+"&time="+Math.random());
        }
    });
    

    //更新数据
    $('#updateBtn').on('click',function () {
        //判断是否选择多行
        var idsVal = $('#serveyCreateList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行更新！");
            return;
        }

        //判断是否选择数据
        var idVal = $('#serveyCreateList').jqGrid('getGridParam', 'selrow');
        if (!idVal) {
            $.xljUtils.tip('blue', "请选择一条需要更新的数据！");
            return;
        }
        var rowData = $('#serveyCreateList').jqGrid("getRowData",idVal);
        if(rowData.status == "草稿"){
        	 window.open('serveyCreate_edit.html?act=update&id='+idVal, '_blank');
        }else{
        	$.xljUtils.tip('blue', "只能修改草稿数据！");
        }
       
    });
	var picker2 = $('#thruDate').datetimepicker({
		language : 'zh-CN', // 语言
		format : 'yyyy-mm-dd',// 显示格式
		minView : "month",// 设置只显示到月份
		initialDate : new Date(),// 初始化当前日期
		autoclose : true,// 选中自动关闭
		todayBtn : true
	// 显示今日按钮
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
    var queryDataObj =  $('#serveyCreateList').jqGrid('getGridParam','postData');
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

    jQuery("#serveyCreateList").jqGrid('setGridParam', {postData: queryData,"serveyType":"1",page:1}).trigger('reloadGrid');
};

/**
 * 删除数据
 */
function del(){
	 var idsVal = $('#serveyCreateList').jqGrid('getGridParam','selarrrow');
	 if(idsVal&&idsVal!="") {
		 var flag = "true";
		 for(var i = 0; i < idsVal.length; i++){
			 var rowData = $('#serveyCreateList').jqGrid("getRowData",idsVal[i]);
		        if(rowData.status != "草稿"){
		        	flag = "false";
		        	break;
		        }
		 }
		 if(flag == "false"){
			 $.xljUtils.tip('blue', "只能删除草稿数据！");
	         return;
		 }
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
		        	 url:serviceUrl+"/oa/servey/serveyCreate/deleteBatch/"+idsVal,
		        	 type:'DELETE',
		        	 dataType:'JSON',
		        	 contentType:'application/json',
		        	 data:JSON.stringify({}),
		        	 success:function (xhr,textStatus ) {
		        		 console.log(xhr);
		        		 if (xhr){
		        			 if(xhr.success) {
		        				 pop_tip_open("green","数据删除成功！");
		        				 $('#serveyCreateList').jqGrid().trigger("reloadGrid");
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

/**
 * 预览问卷
 */
function preview(){
	 //判断是否选择多行
    var idsVal = $('#serveyCreateList').jqGrid('getGridParam', 'selarrrow');
    if (idsVal.length > 1) {
        $.xljUtils.tip('blue', "只能选择一行数据进行预览！");
        return;
    }

    //判断是否选择数据
    var idVal = $('#serveyCreateList').jqGrid('getGridParam', 'selrow');
    if (!idVal) {
        $.xljUtils.tip('blue', "请选择一条需要预览的数据！");
        return;
    }
    var rowData = $('#serveyCreateList').jqGrid("getRowData",idVal);
	window.open(serviceUrl+"oa/servey/serveyQuestionnaire/serveyQuestionnaire_edit.html?serveyId=" + idVal + "&oper=add&serveyName=" + encodeURI(rowData.name, "UTF-8") + "&type=1");
}

function investigationOver(id){
	
	$.ajax({
		contentType: "application/json",
	    type: 'POST',
	    url:serviceUrl+"oa/servey/serveyCreate/investigationOver?time="+Math.random(),
	    dataType: "json",
   	 	data:JSON.stringify({"serveyId":id}),
   	 	success:function (xhr,textStatus ) {
   		 if (xhr){
   			 if(xhr.success) {
   				pop_tip_open("green","结束调查成功！");
   				reloadGrid(id);
       		 }else{
       			 if(xhr.code=="50000"){
       				 pop_tip_open("red",xhr.msg);
       				 return;
       			 }
       			 pop_tip_open("red","结束调查失败！");
       		 }
   		 }else{
   			 pop_tip_open("red","服务异常,请联系管理员！");
   		 }
   	 },
     	 error: function(xhr, textStatus, errorThrown) {
         		 pop_tip_open("red","服务异常,请联系管理员！");
         	}
    });
}

function remindersNotInvestigators(id){
	$.ajax({
		contentType: "application/json",
	    type: 'POST',
	    url:serviceUrl+"oa/servey/serveyCreate/remindersNotInvestigators?time="+Math.random(),
	    dataType: "json",
	   	data:JSON.stringify({"serveyId":id}),
	   	success:function (xhr,textStatus ) {
	   		 if (xhr){
	   			 if(xhr.success) {
	   				 pop_tip_open("green","结束调查成功！");
	   				 reloadGrid(id);
	       		 }else{
	       			 if(xhr.code=="50000"){
	       				 pop_tip_open("red",xhr.msg);
	       				 return;
	       			 }
	       			 pop_tip_open("red","结束调查失败！");
	       		 }
	   		 }else{
	   			 pop_tip_open("red","服务异常,请联系管理员！");
	   		 }
	   	 },
	     	 error: function(xhr, textStatus, errorThrown) {
	         		 pop_tip_open("red","服务异常,请联系管理员！");
	         	}
	    });
}

function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowDataId = id;
	 $('#serveyCreateList').jqGrid().trigger("reloadGrid");
}

function emptyDateObject(dateIdText){
	$("#"+dateIdText).val("");
}

function updateDate(){
	var serveyId = $("#updateDateServeyId").val();
	var thruDate = $("#thruDate").val() +" 23:59:59";
	var sysDate = new Date();//获取系统时间  
    var newDate = new Date(thruDate);//把用户输入的字符串转换成日期格式；  
	if(sysDate > newDate){
		$("#myModal").modal("hide");
		$.xljUtils.tip('blue', "输入问卷结束时间不能小于当前时间！");
		return;
	}
	
	$.ajax({
		contentType: "application/json",
	    type: 'POST',
	    url:serviceUrl+"oa/servey/serveyCreate/updateThruDate?time="+Math.random(),
	    dataType: "json",
	   	data:JSON.stringify({"serveyId":serveyId,"thruDate":thruDate}),
	   	success:function (xhr,textStatus ) {
	   		$("#myModal").modal("hide");
	   		 if (xhr){
	   			 if(xhr.success) {
	   				 pop_tip_open("green","结束调查成功！");
	   				 reloadGrid(serveyId);
	       		 }else{
	       			 if(xhr.code=="50000"){
	       				 pop_tip_open("red",xhr.msg);
	       				 return;
	       			 }
	       			 pop_tip_open("red","结束调查失败！");
	       		 }
	   		 }else{
	   			 pop_tip_open("red","服务异常,请联系管理员！");
	   		 }
	   	 },
	     	 error: function(xhr, textStatus, errorThrown) {
	     		$("#myModal").modal("hide");
	     		pop_tip_open("red","服务异常,请联系管理员！");
	         }
	    });
	
}

function flowCallBack(){
	 pop_tip_open("green","数据操作成功！");
	 $('#serveyCreateList').jqGrid().trigger("reloadGrid");
}