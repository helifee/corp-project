/** 
 * 数据权限作用域列表
 * @author add by gyh
 * @date 2017-4-13
 */

var mailMsglistObj;
var mailServerOnId;//选中行ID


/**
 * 邮件信息列表
 */
function initmailMsglistObj(){
	var ubody = "sys/notice/mailMsg/vaguePage";
	var uall = serviceUrl+ubody;
    //创建jqGrid组件
    mailMsglistObj = jQuery("#mailMsglist").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{delflag:"0"},
            datatype : "json", 
            jsonReader : {
	            repeatitems : false  
	        },
            rownumbers: true,
            width:$('#div_mail').width(),
	        height:$(window).height() - 80 -105 ,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                 {name : 'title',label : '主题',width : 120,align : "center"},
                 {name : 'sendName',label : '收件人名称',width : 80,align : "center",hidden : true},
                 {name : 'sendAddress',label : '收件人地址',width : 150,align : "center"},
                 {name : 'copyName',label : '抄送人名称',width : 80,align : "center",hidden : true},
                 {name : 'copyAddress',label : '抄送人地址',width : 150,align : "center"},
                 {name : 'context',label : '正文',width : 200,align : "center"},
                 {name : 'status',label : '状态',width : 100,align : "center", formatter:statusFmatter},
                 {name : 'num',label : '发送次数',width : 80,align : "center"}
            ],
            rowNum : 20,//一页显示多少条
            rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
            pager : '#mailpager',//表格页脚的占位符(一般是div)的id
            /*ondblClickRow:function(rowid){
            	editType=1;
            	updateMailServerId = rowid;
            	window.open("mailServer_edit.html");
            },*/
            loadError:function(xhr,status,error){
            	$.xljUtils.tip("red","邮件信息列表加载失败");
            },
            gridComplete: function(){
            	if(mailServerOnId){
            		$(this).jqGrid("setSelection",mailServerOnId);
            	}
            	$.xljUtils.addGridScroll();
            	$.xljUtils.gridResizeFn();
            },
            sortname : 'create_date',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

/**
 * 重发
 */
function reMailSend(){
	var ids=mailMsglistObj.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选中一条邮件信息");
	}else{
		var uBody = "sys/notice/mailMsg/testMailSendMsg";
		var uAll = serviceUrl + uBody;
		var rowData =mailMsglistObj.jqGrid('getRowData',ids);
		var dataJson=rowData;
		dataJson.status=2;
		dataJson.num=null;
		console.log(dataJson);
		$.ajax({
			type:'post',
			url:uAll,
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(dataJson),
			success: function(resultData) {
				if(resultData) {
					var successFlag = resultData.success;
					var result = resultData.result;
					var msg = resultData.msg;
					if(successFlag) {
						pop_tip_open("green",'发送成功！');
						var queryData2={
								delflag:"0"	            			
		            			};
						mailMsglistObj.jqGrid("setGridParam", { postData: queryData2}).trigger("reloadGrid");
					}else {
						pop_tip_open("red",msg);
					}
				}else {
					pop_tip_open("red",'发送失败！');
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				pop_tip_open("red","重发邮件请求失败");
			}
		})
	}
	
}

/**
 * 条件查询
 */
function searchMailMsg(){
	var mailKey=$("#mailKey").val();
	var queryData2={
		deflag:"0",
		mailKey:mailKey
	};
	mailMsglistObj.jqGrid("setGridParam", { postData: queryData2 ,page:1}).trigger("reloadGrid");
}


/**
 * 状态格式化
 */
function statusFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "已发送";
	}else if(cellvalue == "2"){
		return "未发送";
	}else{
		return "";
	}
}
/**
 * 回车查询
 */
$("#mailKey").keydown(function(e) {
	if (e.keyCode == 13) {
		searchMailMsg();
	}
});
$(function(){
	//初始化initmailMsglistObj
	initmailMsglistObj();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid(60);
  //禁用所有按钮的默认行为，即刷新页面
    $('.btn').click(function() {
        return false;
    });
  //页面加载完毕后更改grid宽高
    $(window).on('resize', function () {
        $.xljUtils.resizeNestedGrid(60);
    });
});
