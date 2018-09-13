/* 授权值-树型展示
 * @author gyh
 * @date 2017-3-22
 */

var initubody=window.opener.openUrl;
//console.log(initubody);
var valGrid;
/**
 * 加载授权值表格
 */
function initValGrid(){
	var uall = hostUrl+initubody;
	var postdata ={
			delflag:false
	};
    //创建jqGrid组件
	valGrid = jQuery("#list2").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
//            data:JSON.stringify(postdata),
            postData:postdata,
            datatype : "json", 
            height:480,
            jsonReader : {
                root:"result"
            },
            multiselect: true,//复选框
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : 'id',width : 340,align : "center"},
                 {name : 'code',label : 'CODE',width : 340,align : "center"},
                 {name : 'name',label : 'NAME',width : 400,align : "center"}
            ],
            rowNum : -1,
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            //pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

/**
 * 保存授权值
 */
function saveDataVal() {
	//选中多行数据id
	var ids=valGrid.jqGrid('getGridParam','selarrrow');
	var selData=valGrid.jqGrid('getRowData',ids);
	//修改数据授权列表
	var selPointGrid=window.opener.dataAuthGrid;
	var selId=selPointGrid.jqGrid('getGridParam','selrow');
	var vals=[];
	$.each(ids,function(i,val){
		var selData=valGrid.jqGrid('getRowData',val);
		vals[i]=selData.name;
	});
	var selData={
			valIds:ids,
			val:vals
			};
	selPointGrid.jqGrid('setRowData', selId, selData, '');
	closeWin();
};
/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}


$(function(){
	//初始化valGrid
	initValGrid();
});
