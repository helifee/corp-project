/**
 * author:zhangfangzhi
 * date:20170614
 */
var jqGrid2;
$(function(){
	
	//初始化树
	initJqGrid2();
	var menuArray = getOperationAuthorition();
	if($.inArray("collectBtn", menuArray)>-1){
		$('#collectBtn').show();
	}
	if($.inArray("gotoEssenceBtn", menuArray)>-1){
		$('#gotoEssenceBtn').show();
	}
	if($.inArray("postBtn", menuArray)>-1){
		$('#postBtn').show();
	}
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    
	//禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
    });
	//input添加伪placeholder
	$("#title").inputPlaceholder();
    
    //初始化查询条件
	initSearch();
    //绑定按钮事件
	bindButton();
    //模糊查询按钮绑定回车键
    $(document).keydown(function(event){ 
    	if(event.keyCode==13){
    		$("#searchBtn").click();
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
 * 按钮事件
 */
function bindButton() {
	//发帖按钮
	$('#postBtn').click(function () {
		window.open("topic/topic_edit.html?oper=add");
	});
	//编辑按钮
	$('#editBtn').click(function () {
		var ids=$('#list').jqGrid('getGridParam','selarrrow');
		if(ids && ids.length==1){
			window.open("topic/topic_edit.html?oper=edit&id="+ids);
		}else{
			$.xljUtils.tip("blue","请选择一行！");
			return;
		}
	});
	//跳转精华区按钮
	$('#gotoEssenceBtn').click(function () {
		var postDataObj = $('#list2').jqGrid('getGridParam', 'postData');
		var postData = {};
		postData.status ="PUBLISHED";
		postData.sortFields = postDataObj.sortFields;
		postData.essence = true;
		$('#searchForm :input').each(function (index,item) {
			delete postDataObj[item.name];
		})
		delete postDataObj.fuzzyQueryFields;
		$("#list2").jqGrid('setGridParam', {postData:postData,url:serviceUrl+"oa/bbs/topic/page",page:1}).trigger('reloadGrid');
	});
	//收藏按钮
	$('#collectBtn').click(function () {
		toAddFavorite();
	});

	//模糊查询按钮
	$('#searchBtn').click(function () {
		var postDataObj = $('#list2').jqGrid('getGridParam', 'postData');
		var postData = {};
		postData.status = postDataObj.status;
		postData.sortFields = postDataObj.sortFields;
		var value = $('#title').getInputVal();
		var fuzzyArr = [];
		fuzzyArr.push('title');
		postData.title = value;
		postData.fuzzyQueryFields = JSON.stringify(fuzzyArr);
		delete postDataObj[fuzzyArr[0]];
		delete postDataObj.essence;
		$('#searchForm :input').each(function (index,item) {
			delete postDataObj[item.name];
		})
		$("#list2").jqGrid('setGridParam', {postData: postData,page:1}).trigger('reloadGrid');
	});

	//精确查询按钮
	$('#exactSearchBtn').click(function () {
		var postDataObj = $('#list2').jqGrid('getGridParam', 'postData');
		var postData = {};
		var dateArr = [];
		postData.status = postDataObj.status;
		postData.sortFields = postDataObj.sortFields;
		delete  postDataObj.fuzzyQueryFields;
		delete postDataObj.title;
		delete postDataObj.essence;
			$('.senior-box input').each(function (index, item) {
				if ($.trim(item.value) != '') {
					var name = item.name;
					if (name.indexOf('starttime') > -1 || name.indexOf('endtime') > -1) {
						dateArr.push(name);
					}
					postData[item.name] = item.value;
				}
				delete postDataObj[item.name];
			});
			if (dateArr.length > 0) {
				postData.dateFields = JSON.stringify(dateArr);
			}

			delete postDataObj.dateFields;
		$("#list2").jqGrid('setGridParam', {postData: postData,page:1}).trigger('reloadGrid');
	});
	//清除板块信息
	$('#clearForum').click(function () {
		$('#forumId').val('');
		$('#forumName').val('');
	});

}
/**
 * 查询初始化
 */
function initSearch(){
	$("#forumSelf").xljSingleSelector({
		title:'版块选择',//选择器标题，默认是'选择组织机构'
		selectorType:'eeee',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
		treeUrl:serviceUrl + 'oa/bbs/forumType/getHomePageTree'+'?time='+Math.random(),// 生成zTree树的请求url,不指定使用默认对应类型的url
		treeParam:{},//生成zTree树的请求参数，json对象
		saveCallback:function (selectData,ele) {
			if (selectData != null) {
				$("#forumName").val(selectData.name);
				$("#forumId").val(selectData.id);
			}
		},
		selectNodeType:{
			"dataType":"1",
			"msg":"请选择版块！"
		},
		formatTreeJson:formatZTreeData,
		treeSettings:{data:{
			simpleData: {
				enable: true
			}
		}}
	});
	$(".fa-times").unbind('click').on('click',function () {//清除内容
		$("#forumName").val("");
		$("#forumId").val("");
	});
	
	$(".datetimepicker1").datetimepicker({ 
		  language: 'zh-CN', //语言
		  format: 'yyyy-mm-dd',//显示格式
		  minView: "month",//设置只显示到月份
		  initialDate: new Date(),//初始化当前日期
		  autoclose: true,//选中自动关闭
		  todayBtn: true//显示今日按钮
	});
}
/**
 * 收藏
 */
function toAddFavorite(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(!ids||ids.length==0) {
		pop_tip_open("blue","请选择要收藏的记录！");
		return;
	}
	ids = ids.join(",");
	if(ids&&ids!='') {
		$.ajax({
			url:serviceUrl+"oa/bbs/topic/addFavorite/"+ids,
			type:'post',
			dataType:'json',
			contentType:'application/json',
			success:function (resultData ) {
				if (resultData && resultData.success) {
					pop_tip_open("green","收藏成功！");
				}else{
					pop_tip_open("red","收藏失败！");
				}
			}
		});
	}
}
/**
 * 查询数据
 */

function searchData(){
	var forumTopic={};
	forumTopic.forumId=null;
	forumTopic.title=null;
	forumTopic.content=null;
	forumTopic.createPersonName=null;
	forumTopic.startDate1=null;
	forumTopic.startDate2=null;
	forumTopic.updateDate1=null;
	forumTopic.updateDate2=null;
	
	if($("#forumId").val()){
		forumTopic.forumId=$("#forumId").val();
	}
	if($("#createPerson").val()){
		forumTopic.createPersonName=$("#createPerson").val();
	}
	if($("#content").val()){
		forumTopic.content=$("#content").val();
	}
	if($("#title").val()){
		forumTopic.title=$("#title").val();
	}
	if($("#startDate1").val()){
		forumTopic.startDate1=$("#startDate1").val();
	}
	if($("#startDate2").val()){
		forumTopic.startDate2=$("#startDate2").val();
	}
	if($("#updateDate1").val()){
		forumTopic.updateDate1=$("#updateDate1").val();
	}
	if($("#updateDate2").val()){
		forumTopic.updateDate2=$("#updateDate2").val();
	}
	$("#list2").jqGrid('setGridParam',{postData:forumTopic,page:1}).trigger('reloadGrid');
}

/**
 * 递归树匹配节点icon
 */
function formatZTreeData(arr) {
	var zNodes = [];
	
	for (var i = 0; i < arr.length; i++) {
		var iconStyle='diy-group';
		if(arr[i].code == "") {
			iconStyle = "diy-group";
		}else {
			iconStyle = "diy-program";
	    } 
		zNodes.push({id:arr[i].id, pId:arr[i].pId, name:arr[i].name,dataType:arr[i].dataType,iconSkin:iconStyle});
	}
	return zNodes;
};

/**
 * 初始化表格
 */
function initJqGrid2(){
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: serviceUrl+"/oa/bbs/topic/page",
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{"status":"PUBLISHED"},
            datatype : "json", 
            multiboxonly:true,
            multiselect:true,
            autowidth:true,
            rownumbers: true,
            jsonReader : {
				root: function (obj) {
					var result = obj.rows;
					var arr = [];
					for(var row in result){
						var data ={};
						var rowData = result[row];
						data.id = rowData.id;
						var essence="";
						if(rowData.essence){
							essence = "<span class='bbsIcon elite'></span>";
						}
						var stick="";
						if(rowData.stick){
							stick=  "<span class='bbsIcon up'></span>";
						}
						var hot="";
						if(rowData.clickNum>200){
							hot=  "<span class='bbsIcon hot'></span>";
						}
						var closed="";
						if(rowData.closed){
							closed="<span class='bbsIcon ok'></span>";
						}
						data.title =stick+essence+hot+closed+rowData.title;
						data.forum = rowData.forum;
						data.createPersonName = rowData.createPersonName;
						data.clickNum =  rowData.clickNum;
						data.replyNum =  rowData.replyNum;
						data.updateDate =  rowData.updateDate;
						data.lastReplyUser =  rowData.lastReplyUser;
						arr.push(data);
					}
					return arr;
				},
                repeatitems: false
            },
            colModel : [ 
                 {name : 'id',label : 'id',hidden:true,align : "center"},
                 {
                 	label: '主题',
                     name: 'title',
                     width: 200,
                     editable: false
                 },
                 {
                 	 label: '版块',
                     name: 'forum',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '作者',
                     name: 'createPersonName',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '点击',
                     name: 'clickNum',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '回复',
                     name: 'replyNum',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '更新时间',
                     name: 'updateDate',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '最后回复',
                     name: 'lastReplyUser',
                     width: 75,
                     editable: false
                 }
             ],
            rowNum : 20,//一页显示多少条
            rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",
            viewrecords : true,
            ondblClickRow:function(rowid){
//            	window.open("customForm_edit.html?type=edit&id="+rowid);
				window.open('topic/topic_detail.html?id='+rowid);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

/**
 * 刷新页面
 */
function reloadList(){
	jQuery("#list2").trigger("reloadGrid");
}

/**
 * 发贴
 */
function postTopic(){
	window.open("topic/topic_edit.html?oper=add");
}

function editTopic(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(ids && ids.length==1){
		window.open("topic/topic_edit.html?oper=edit&id="+ids);
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}
/**
 * 获取按钮权限
 */
function getOperationAuthorition() {
	var menuList;
	$.ajax({
		type: 'GET',
		url: serviceUrl + 'sys/authentication/getUserAuthenticationOperation?t_='+new Date().getTime()+'&appCode=OA&menuCode=sytz',
		dataType: 'json',
		//contentType: 'application/json',
		async: false,
		//data: JSON.stringify(postdata),
		success: function (data) {
			if (data.success) {
				menuList =  data.result;

			} else {
				$.xljUtils.tip('red', '获取按钮权限失败！');
			}
		},
		error: function (xhr, textStatus, errorThrown) {
			$.xljUtils.tip('red', '获取按钮权限失败！');
		}
	});
	return menuList;
}