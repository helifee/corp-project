var lastSel,flag;
var isEditing = "NO";
$(function() {
	//页面加载完成之后执行
	getOperationTypePage();
	getApproveTypePage();//审批类型
	$.xljUtils.resizeNestedGrid();
	resizeCalendarH();
	$.xljUtils.addNoHScroll("scroll-box");

});
$(window).resize(function(){
	resizeCalendarH();
});
function resizeCalendarH(){
	if($("#calendar").height()>=310){
		$("#calendar").height($(window).height()-160);
	}else{
		$("#calendar").height("310px");
	}
}
/**
 * 多页签切换
 */
$(".con-tit button").on("click",function(e){
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    var label = $(this).html();
    console.log("多页签切换 >> label="+label);
    
    $('#calendar_list').hide();
    $('#type_list').hide();
    $('#opration_list').hide();
	$("#overdue_list").hide();
    
    if(label == "审批操作定义"){
	    $('#opration_list').show();
    }else if(label == "审批类型定义"){
	    $('#type_list').show();
    }else if(label == "工作日历"){
	    $('#calendar_list').show();
    }else if(label == "逾期配置"){
		$("#overdue_list").show();
	}
	$.xljUtils.treeResizeFn("scroll-box");
	$.xljUtils.resizeNestedGrid();
    e.stopPropagation();
});
/**
 * 获得操作类型列表
 */
function getOperationTypePage(){
    //创建jqGrid组件
    $("#list").jqGrid(
        {
            url : serviceUrl+"flow/operationType/queryList",
            datatype : "json",
            ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
            mtype : "post", 
            jsonReader : {
            	//root:"result"
            	root:function(data){
            		console.log("--->>> getOperationTypePage() jsonReader >>> ");
            		var dataArray = data.result;
					var newArray = new Array();
	            	//jsonData.code=$.xljUtils.htmlEncode($.trim(this.code));
					for(var idx=0; idx<dataArray.length; idx++){
						 var itemData = dataArray[idx];
						 //console.log("0001 itemData.name="+itemData.name+"; itemData.remark="+itemData.remark);
						 itemData.name = $.xljUtils.htmlEncode($.trim(itemData.name));
						 itemData.remark = $.xljUtils.htmlEncode($.trim(itemData.remark));
						 //console.log("0002--->>> new data>> itemData.name="+itemData.name+"; itemData.remark="+itemData.remark);
						 newArray.push(itemData);
					 }
					 return newArray;
            	}	
            },            
            colModel : [
                {name:'id',label:'id',align:"center", hidden:true},
                {name:'name',label:'操作名称',align:"center", editable:true},
                {name:'code',label:'操作编号',align:"center", classes:"grid-column"},
                {name:'remark',label:'描述',align:"center", editable:true},
            ],
            forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
//	        pager : '#pager',//定义翻页用的导航栏，必须是有效的html元素            
	        rowNum: -1,//在grid上显示记录条数，这个参数是要被传递到后台
//            rowList: [20, 50, 100, 200], //可供用户选择一页显示多少条
            sortname : 'id',//默认的排序列
            sortorder : "desc",//排序方式,可选desc,asc
            viewrecords : true, //定义是否要显示总记录数
           	/*ondblClickRow: function(rowid){ 
       			lastSel = rowid;  
       			flag = true;
           		$('#list').jqGrid('editRow', rowid, true); 
           	},*/
            onSelectRow: function(rowid) {
            	if(isEditing == "NO"){
            		lastSel = rowid;
            	}
            	
                /*if (flag && lastSel && rowid !== lastSel) {
                	$('#list').jqGrid('saveRow', lastSel, save());
                }*/
            },
            gridComplete: function() {//当表格所有数据都加载完成，
            	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
            	$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();

            },
            loadError:function(xhr,status,error){
            	$.xljUtils.getError(xhr.status);
            }
        });
}

function modifyType(){
	isEditing = "YES";
	flag = true;
	$('#list').jqGrid('editRow', lastSel, true);
	$("#operateSave").show();
	$("#operateCancel").show();
	$("#operateModify").hide();	
}

function saveType(){
	isEditing = "NO";
	flag = true;
	$('#list').jqGrid('saveRow', lastSel, save());
	$("#operateSave").hide();
	$("#operateCancel").hide();
	$("#operateModify").show();	
}

function cancelType(){
	isEditing = "NO";
	flag = true;
	$('#list').jqGrid('saveRow', lastSel);
	$("#operateSave").hide();
	$("#operateCancel").hide();
	$("#operateModify").show();	
	$('#list').jqGrid('setGridParam', { datatype: 'json' }).trigger("reloadGrid");
}

/**
 * 保存操作类型数据
 */
function save(){
	if(lastSel){
		flag = false; 
		/*var nameValue=$("#list").jqGrid("getCell",lastSel,"name");
    	var remarkValue=$("#list").jqGrid("getCell",lastSel,"remark");
    	if($(nameValue) && $(nameValue).attr("id")){
    		$("#list").find("#"+$(nameValue).attr("id")).attr("data-html",true);
    	}
    	console.log("002------");
    	if($(remarkValue) && $(remarkValue).attr("id")){
    		$("#list").find("#"+$(remarkValue).attr("id")).attr("data-html",true);
    	}*/
		$('#list').saveRow(lastSel);
		var rowData = $('#list').jqGrid('getRowData', lastSel);
		//console.log("test name="+ $.xljUtils.htmlEncode(rowData.name));
		//console.log("test remark="+ $.xljUtils.htmlEncode(rowData.remark));
		
		rowData.name = $.xljUtils.htmlDecode(rowData.name);
		rowData.remark =  $.xljUtils.htmlDecode(rowData.remark);
		//console.log("name="+rowData.name);
		//console.log("remark="+rowData.remark);
		//console.log(" JSON.stringify(rowData)="+JSON.stringify(rowData));
		if(!verify(rowData.name.trim())){
			pop_tip_open("red","请输入正确的操作类型名称！");
			$("#list").setGridParam({url:serviceUrl+"flow/operationType/queryList"}).trigger("reloadGrid");
			return;
		}
		$.ajax({  
		    type: "put",  
		    url: serviceUrl+"flow/operationType/update/" + lastSel,  
		    data: JSON.stringify(rowData),//将对象序列化成JSON字符串  
		    dataType:"json",  
		    contentType: "application/json;charset=utf-8", //设置请求头信息  
		    success: function(data){ 
		    	pop_tip_open("green","保存成功！");
		    	$('#list').jqGrid('setGridParam', { datatype: 'json' }).trigger("reloadGrid");
		    },
			error: function(xhr){ 
				$.xljUtils.getError(xhr.status);
			} 
		})	
	}
}

function resetBasicTypeData(type){
	var updateData = {code: type};
	$.ajax({  
	    type: "POST",  
	    url: serviceUrl+"flow/approveType/resetBasicTypeData",  
	    data: JSON.stringify(updateData),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType: "application/json;charset=utf-8", //设置请求头信息  
	    success: function(data){ 
	    	pop_tip_open("green","恢复默认值操作成功！");
	    	$('#list').jqGrid('setGridParam', { datatype: 'json' }).trigger("reloadGrid");
	    },
		error: function(xhr){ 
			$.xljUtils.getError(xhr.status);
		} 
	})
}
