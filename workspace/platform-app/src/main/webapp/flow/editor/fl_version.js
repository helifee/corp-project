/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-24
 */

/**
 * 此文件实现业务对象的业务变量的列表及相关操作
 */
// var flId;
var businessObjectId;
var lastSel_dataId;
var flCode;
/**
 * 页面JS的执行入口处
 */
$(function() {
	// flId = $.getUrlParam('flId');
    flCode = $.getUrlParam('code');
	businessObjectId = $.getUrlParam('businessObjectId');
	queryFlowInfo(flCode);
	$("#busiObjectId").val(businessObjectId);
	queryFlVersionList();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
});

/**
 * 根据flId获取模版基本的名称
 * @param systemId
 */
function queryFlowInfo(flCode){
	var paramData ={
		delflag :0,
		code:flCode,
        sidx:"version",
        sord:"desc"
	};
	$.ajax({
	       url: hostUrl+"flow/fl/queryList",
	       type: 'post',
	       contentType: 'application/json',
			data: JSON.stringify(paramData),
	       dataType: 'JSON',
	       async: false,
	       success: function (resultData) {
	    	   var dataList = resultData.result;
	    	   if(dataList && dataList.length >0){
	    	   		var dataObj = dataList[0];
                   $("#flIdInfo").html("流程模板名称: "+dataObj.name
                       +"&nbsp;&nbsp;&nbsp;创建时间："+dataObj.createDate);
                   // flCode = dataObj.code;
			   }

	       }
	});
}
var versionGrid;
/**
 * 在jqgridList标签上绑定jqgrid表格，并实现获取数据
 */
function queryFlVersionList(){
    versionGrid = jQuery("#jqgridList").jqGrid(//创建jqGrid组件
        {
            url : hostUrl+"flow/fl/queryList",//获取数据的地址
            postData : { code: flCode, delflag:false},
            datatype : "json",//从服务器端返回的数据类型，默认xml。可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
            ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
            mtype : "post",//ajax提交方式。POST或者GET，默认GET
            jsonReader : {
            	root:"result"
            },
            colModel : [
                {name:'id',       label:'ID',           align:"center", hidden:true},
                {name:'businessObjectId',       label:'businessObjectId',           align:"businessObjectId", hidden:true},
                {name:'version',    label:'流程版本',       align:"center", },
                {name:'createDate',     label:'发布时间',    align:"center"},
                {name:'updateDate',     label:'修改时间',    align:"center"},
                {name:'createPersonName',     label:'发布人',    align:"center" },
    			{name:'status',  label: '状态',      align:"center",  formatter: statusFormatter },
                {name:'versionRemark',     label:'版本说明',    align:"center" }
            ],
            rowNum : -1,//在grid上显示记录条数，这个参数是要被传递到后台
            sortname : 'version',//默认的排序列
            sortorder : "desc",//排序方式,可选desc,asc
            viewrecords : true, //定义是否要显示总记录数
           	//autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度 
            onSelectRow: function(rowid, status) {//被选中的状态
            	lastSel_dataId = rowid;
            },
            ondblClickRow:function(rowid){
            	var selItem = $("#jqgridList").jqGrid('getRowData', rowid);
        		var urlText = hostUrl + "flow/builder/fl_template.html?act=update&flId="+rowid+"&businessObjectId="+selItem.businessObjectId;
                var status = selItem.status;
                console.log("--->>>status="+status);
                if(status!="草稿"){
                	urlText = hostUrl + "flow/builder/fl_template.html?act=view&flId="+rowid+"&businessObjectId="+selItem.businessObjectId;
                }
        		openWin(urlText);
            },
            loadError: function(xhr, status, error){
            	
            }
    });
}

/**
 * 对bool类型的变量进行解析
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function statusFormatter(cellvalue, options, rowObject){  
	//0:草稿，1:发布，2:失效
	if(cellvalue == "0"){
		return "草稿";
	}else if(cellvalue == "2"){
		return "失效";
	}else{
		return "生效";
	}
}

/**
 * 刷新JqGrid的表格数据，子窗口调用是opener.refreshJqGridData();
 */
function refreshJqGridData(){
	$("#jqgridList").jqGrid('setGridParam',{
	      datatype: 'json', 
	      postData: { code: flCode, delflag:false },   
	 }).trigger("reloadGrid");
}

/**
 * 删除业务变量的处理事件
 */
function deleteItem() {
	if(!lastSel_dataId){
		pop_tip_open("blue","请选择草稿状态模板!");
		return;
	}
	
	var selItem = $("#jqgridList").jqGrid('getRowData', lastSel_dataId);
	var flId = selItem.id;
	var status = selItem.status;
	//console.info("status="+status);
	if(status!=0 && status !="草稿"){
		pop_tip_open("blue","不能删除非草稿状态的版本!");
		return;
	}else{
		$.ajax({
		       url: hostUrl+"flow/fl/deletePseudo/"+lastSel_dataId,
		       type:'DELETE',
		       contentType:'application/json',
		       dataType:'JSON',
		       success:function (resultData) {
		    	   pop_tip_open("green",resultData.msg);
		    	   var dataObj = resultData.result;
		    	   refreshJqGridData();
			 }
		});
	}
	
	
}
/**
 * 修改流程模板
 */
function editFlow(){
    var  id= $('#jqgridList').jqGrid('getGridParam','selrow');
    if(!id){
        pop_tip_open("blue","请选择一条数据！");
        return;
    }else {
        var rowdata = $("#jqgridList").jqGrid('getRowData',id);
        var v_businessObjectId = rowdata.businessObjectId;
        var url = encodeURI("../builder/fl_template.html?flId="+id+"&businessObjectId=" + v_businessObjectId+"&act=update");
        // openWin(url);
        window.open(encodeURI(url), '', specs);
    }
}

/**
 * 生效模板：发布生效或失效的模板
 */
function useFlow() {
    var id= $('#jqgridList').jqGrid('getGridParam','selrow');
    if(!id){
        pop_tip_open("blue","请选择一条数据！");
        return;
    }else {
        var rowData = $('#jqgridList').jqGrid('getRowData',id);
        if(rowData.status == '草稿'){
            pop_tip_open("blue","草稿状态不可生效！");
            return;
		}
		//查询模板详情
        $.ajax({
            type: "get",
            url: hostUrl + "flow/fl/getAll/" + id + "?entryType=true&time=" + new Date().getTime(),
            success: function (data) {
                if(data.success && data.result){
                    var flData = data.result;
                    //设置生效
                    flData.status = '1';
                    $.ajax({
                        url : hostUrl + "flow/fl/saveAll",
                        data : JSON.stringify(flData),
                        type : 'POST',
                        contentType : 'application/json',
                        dataType : 'JSON',
                        success : function(data) {
                            if (data) {
                                var successFlag = data.success;
                                var result = data.result;
                                var msg = data.msg;
                                if (successFlag) {
                                        $.xljUtils.tip("green", "生效成功！");
                                } else {
                                        $.xljUtils.tip("red", "生效失败！");
                                }
                                versionGrid.jqGrid("setGridParam").trigger("reloadGrid");
                            }
                        },
                        error : function(xhr) {
                            $.xljUtils.getError(xhr.status);
                        }
                    });
                }else{
                    pop_tip_open("blue","版本不存在！");
                    return;
				}
            },
            error: function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });
    }
}

/**
 * 关闭当前的子窗口
 */
function closeMe(){
	lastSel_rowId = "";
	window.opener=null;
	window.open('','_self');
	window.close();
}