/**
 * author:zhangfangzhi
 * date:20171123
 */
var jqGrid2;
var rowData;
var rowDataBefore;
var sessionId=null;
$(function () {
	var customFormId = $.xljUtils.getUrlParam('customFormId');
	//初始化表格
	initJqGrid2(customFormId);
    
	//获取SESSIONID
	$.ajax({
        type:'get',
        url:baseUrl+'/sys/base/customForm/getSessionId'+'?time='+Math.random(),
        success: function(data) {
	        sessionId=data.result;
	    }
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
function initJqGrid2(customFormId){
    jqGrid2 = jQuery("#list2").jqGrid({
    	url: baseUrl+"sys/base/customFormVersionHistory/page",
        ajaxGridOptions: { contentType: 'application/json' },
        mtype : "POST",  
        contentType : "application/json",  
        postData:{'customFormId':customFormId},
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
             {name : 'customFormId',label : 'customFormId',hidden:true,align : "center"},
             {
             	label: '编码',
                name: 'code',
                width: 100,
                align:'center'
             },
             {
             	 label: '显示名称',
                 name: 'name',
				 width: 100,
	             align:'center'
             },
             {
				 label : '版本名称',
                 name: 'versionName',
                 width: 100,
                 align:'center'
             },
             {
				 label : '创建人',
                 name: 'versionCreatePersonName',
                 width: 100,
                 align:'center'
             },
             {
				 label : '创建时间',
                 name: 'versionCreateDate',
                 width: 100,
                 align:'center'
             }
         ],
        rowNum : 20,//一页显示多少条
        rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
        pager : '#pager2',//表格页脚的占位符(一般是div)的id
        sortname : 'id',//初始化的时候排序的字段
        sortorder : "desc",
        viewrecords : true,
        ondblClickRow:function(rowid){
        	view();
        },
        gridComplete: function () {
            $.xljUtils.addGridScroll();
            $.xljUtils.gridResizeFn();
            rowDataBefore = rowData;
            if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            	$('#list2').setSelection(rowDataBefore.id,true);
            	$('#list2 '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
            }
            $(".ui-state-default.ui-jqgrid-hdiv").css("marginTop","8px");
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
 * 模板版本查看
 */
function view(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(ids && ids.length==1){
		var selData = $('#list2').jqGrid('getRowData',ids[0]);
		window.open("dist/index.html?id="+selData.customFormId+"&cfVid="+selData.id+"&session="+sessionId+"&time="+Math.random());
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}