var lastSel_approveType;
//参考资料见 http://www.cnblogs.com/duhuo/p/5521116.html 
function getApproveTypePage(){
    //创建jqGrid组件
    jQuery("#jqgridList").jqGrid(
        {
            url : "/platform-app/flow/ac/page",//获取数据的地址
            postData : { flId: '1'},
            datatype : "json",//从服务器端返回的数据类型，默认xml。可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
            ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
            mtype : "post",//ajax提交方式。POST或者GET，默认GET
            jsonReader : {
                root:"result.list"
            },
            
            colModel : [
                {name:'id',              label:'ID',           align:"center", hidden:true},
                {name:'code',            label:'编码',          align:"center"},
                {name:'name',            label: '环节名称',      align:"center" },
    			{name:'participant',     label: '参与人',       align:"center" },
    			{name:'approveStrategy', label: '多人审批处理策略',align:"center", formatter: typeformatter },
    			{name:'postMultiPerson', label: '同岗审批策略',   align:"center", formatter: typeformatter },
    			{name:'approveTypeName', label: '审批类型',      align:"center" },
    			{name:'ccPerson',        label: '抄送人',       align:"center" },
    			{name:'transferInfo',    label: '流转信息',      align:"center" },
    			//{name:'status', label: '状态',  align:"center",  } 
            ],
            height: 225,            
            pager : '#jqgridPager',//定义翻页用的导航栏，必须是有效的html元素            
            rowNum : 10,//在grid上显示记录条数，这个参数是要被传递到后台
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            sortname : 'id',//默认的排序列
            sortorder : "desc",//排序方式,可选desc,asc
            viewrecords : true, //定义是否要显示总记录数
           	autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度 
            onSelectRow: function(rowid, status) {//被选中的状态
            	lastSel_approveType = rowid;
            }
    });
    /*创建jqGrid的操作按钮容器*/
    /*可以控制界面上增删改查的按钮是否显示*/
    jQuery("#jqgridList").jqGrid('navGrid', '#approveType_pager', {add: false, edit: false, del: false, search:false, refresh:false });
}

function typeformatter(cellvalue, options, rowObject){  
    //console.log(cellvalue);
	cellvalue = ""+cellvalue;
	//1:抢占,2:串行,3:竞争
	if("1" == cellvalue){
		return "抢占";
	}
	if("2" == cellvalue){
		return "串行";
	}
	if("3" == cellvalue){
		return "竞争";
	}
    return "["+cellvalue+"]";  
}

function modifyItem(){
	if(!lastSel_approveType){
		alert("请选择一个审批类型进行修改操作!");
		return;
	}
	window.open("/platform-app/flow/approveType/approveForm.html?approveId="+lastSel_approveType); 
}

function changeStatus(newStatus){
	if(!lastSel_approveType){
		alert("请选择一个审批类型进行操作!");
		return;
	}
	var rowData = jQuery('#approveType_list').jqGrid('getRowData', lastSel_approveType);
	if('1' == newStatus){
		rowData.status = 'true';
	}else if('0' == newStatus){
		rowData.status = 'false';
	}
	//---------------------  开始进行提交请求，交由后台处理   -----------------------
	$.ajax({ //发送更新的ajax请求
	    type: "put",  
	    url: "/platform-app/flow/approveType/update/" + lastSel_approveType,  
	    data: JSON.stringify(rowData),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){ 
	    	lastSel_approveType = "";
	    	alert(data.msg);
	    	jQuery("#jqgridList").trigger("reloadGrid");//调用reloadGrid的方法来 刷新JQGrid列表
	    },  
	    error: function(data){  
	    	lastSel_approveType = "";
	    	if(data.msg){
	    		alert(data.msg);
	    	}else{
	    		//alert("修改失败！");
	    	}
	    }  
	});//end-for $.ajax({
}

$(function() {//单个页面测试时, 需要打开此函数
	//alert("-----0001");//有时候打开需要用
	getApproveTypePage();//审批类型
});
