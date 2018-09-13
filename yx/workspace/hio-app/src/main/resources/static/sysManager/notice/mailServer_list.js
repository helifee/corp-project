/** 
 * 数据权限作用域列表
 * @author add by gyh
 * @date 2017-4-12
 */

var mailServerGridObj;
var mailServerOnId;//选中行ID


/**
 * 邮件服务列表
 */
function initmailServerGridObj(){
	var ubody = "sys/notice/mailServer/queryListLike";
	var uall = serviceUrl+ubody;
    //创建jqGrid组件
    mailServerGridObj = jQuery("#mailServerGrid").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{delflag:"0"},
            datatype : "json", 
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            autowidth:true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                 {name : 'code',label : '邮件服务器编码',width : 120,align : "center"},
                 {name : 'name',label : '邮件服务器名称',width : 120,align : "center",cellattr: addCellAttr},
                 {name : 'isDefault',label : '是否默认',width : 80,align : "center", formatter:defaultFmatter,cellattr: addCellAttr},
                 {name : 'host',label : '发送服务器',width : 150,align : "center"},
                 {name : 'displayName',label : '邮件显示名称',width : 150,align : "center"},
                 {name : 'username',label : '账号',width : 120,align : "center"},
                 {name : 'password',label : '密码',width : 120,align : "center"},
                 {name : 'remark',label : '备注',width : 80,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
//            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
//            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            ondblClickRow:function(rowid){
            	editType=1;
            	updateMailServerId = rowid;
            	window.open("mailServer_edit.html");
            },
            loadError:function(xhr,status,error){
            	$.xljUtils.tip("red","邮件服务列表加载失败");
            },
            gridComplete: function(){
            	if(mailServerOnId){
            		$(this).jqGrid("setSelection",mailServerOnId);
            	}
            	$.xljUtils.addGridScroll();
            },
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

/**
 * 格式化样式
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.isDefault == "1" ){
        return "style='color:blue'";
    }
}
//打开方式：0新增，1编辑。默认新增
var editType=0;

/**
 * 增加业务系统
 */
function addMailServer(){
	 editType=0;
	window.open("mailServer_edit.html");
}
/**
 * 测试邮件发送
 */
var testMailServerId;
function testMailServer(){
//	event=arguments.callee.caller.arguments[0] || window.event;
//	(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	var ids=mailServerGridObj.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选中一条邮件服务器");
	}else{
		mailServerOnId=ids;
		testMailServerId = ids;
		window.open("mailServer_test.html");
	}
}
/**
 * 条件查询
 */
function searchMailServer(){
	var mailKey=$("#mailKey").val();
	//TODO 
	var queryData2={
		deflag:"0",
		mailKey:mailKey
	};
	mailServerGridObj.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
}

/**
 * 修改业务系统
 */
var updateMailServerId;
function updateMailServer(){
	var ids=mailServerGridObj.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选中一条邮件服务器");
	}else{
		mailServerOnId=ids;
		updateMailServerId = ids;
		editType=1;
		window.open("mailServer_edit.html");
	}
}
/**
 * 设置默认
 */
function updateMailDefault(){
	var ids=mailServerGridObj.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选中一条邮件服务器");
	}else{
		mailServerOnId=ids;
		var updatedata={};
		updatedata.id=ids;
		updatedata.isDefault=true;
		var uBody = "sys/notice/mailServer/update/"+ids;
	    var uAll = serviceUrl + uBody;
		$.ajax({
			type:'PUT',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(updatedata),
	        success: function(json) {
	            if(json.success == true){
	            	pop_tip_open("green",json.msg);
	            	/*var queryData2={
	            			deflag:"0"	            			
	            			};
	            	mailServerGridObj.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");*/
	            	searchMailServer();
	            	//mailServerGridObj.jqGrid('setSelection',ids);
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	        },
	        error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","设置默认请求失败");
	        }
	    })
	}
}

/**
 * 删除邮件服务器
 */
function deleteMailServer(){
	//多选框获取IDS
//	var ids=mailServerGridObj.jqGrid('getGridParam','selarrrow');
	//单选行获取一个ID
	var ids=mailServerGridObj.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择邮件服务器");
	}else{
		var lastId = $("#mailServerGrid #"+ids).prev()[0].id;
		mailServerOnId=lastId;
		pop_text_open("blue","确定要删除这【1】条数据吗？",function(){
			var uBody = "sys/notice/mailServer/deletePseudoBatch/"+ids;
		    var uAll = serviceUrl + uBody;
			$.ajax({
		        type:'DELETE',
		        url:uAll,
		        dataType:'json',
		        success: function(json) {
		        	if(json.success == true){
		            	pop_tip_open("green",json.msg);
		            	/*var queryData2={
		            			deflag:"0"
		            			};
		            	mailServerGridObj.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");*/
		            	searchMailServer();
		            }else{
		            	pop_tip_open("red",json.msg);
		            }
		        },
		        error:function(XMLHttpRequest, textStatus, errorThrown){
		        	pop_tip_open("red","删除邮件服务器请求失败");
		        }
		    })
	    },true);
	}
}

/**
 * 是否启用格式化
 */
function defaultFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "是";
	}else if(cellvalue == "0"){
		return "否";
	}else{
		return "";
	}
}
/**
 * 回车查询
 */
$("#mailKey").keydown(function(e) {
	if (e.keyCode == 13) {
		searchMailServer();
		event=arguments.callee.caller.arguments[0] || window.event;
		(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
	}
}); 
$(function(){
	//初始化initmailServerGridObj
	initmailServerGridObj();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid(60);
    $(window).on('resize', function () {
            $.xljUtils.resizeNestedGrid(60);
    });
  //禁用所有按钮的默认行为，即刷新页面
    $('.btn').click(function() {
        return false;
    });
});
