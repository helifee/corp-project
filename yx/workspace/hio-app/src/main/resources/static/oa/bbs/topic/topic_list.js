;(function($,window,document,undefined){
/**
 * author:zhangfangzhi
 */
var jqGrid;
$(function(){
    if(status=="PUBLISHED"&&oper=="launch"){
        $('#path').html("发表的帖子");
        if($.inArray("collectBtn", menuArray)>-1){
                $('#collectBtn').show();
        }
        if($.inArray("gotoEssenceBtn", menuArray)>-1){
            $('#gotoEssenceBtn').show();
        }
        if($.inArray("editBtn", menuArray)>-1){
            $('#editBtn').show();
        }
        if($.inArray("postBtn", menuArray)>-1){
            $('#postBtn').show();
        }
        if($.inArray("delBtn", menuArray)>-1){
            $('#delBtn').show();
        }

    }else if(status=="PUBLISHED"&&oper=="reply"){
        $('#path').html("参与的讨论");
        if($.inArray("collectBtn_01", menuArray)>-1){
            $('#collectBtn').show();
        }
        if($.inArray("gotoEssenceBtn_01", menuArray)>-1){
            $('#gotoEssenceBtn').show();
        }
        if($.inArray("editBtn_01", menuArray)>-1){
            $('#editBtn').show();
        }
        if($.inArray("postBtn_01", menuArray)>-1){
            $('#postBtn').show();
        }
        if($.inArray("delBtn_01", menuArray)>-1){
            $('#delBtn').show();
        }
    }else if(status=="DRAFT"&&oper=="launch"){
        $('#path').html("草稿帖子");
        if($.inArray("collectBtn_02", menuArray)>-1){
            $('#collectBtn').show();
        }
        if($.inArray("gotoEssenceBtn_02", menuArray)>-1){
            $('#gotoEssenceBtn').show();
        }
        if($.inArray("editBtn_02", menuArray)>-1){
            $('#editBtn').show();
        }
        if($.inArray("postBtn_02", menuArray)>-1){
            $('#postBtn').show();
        }
        if($.inArray("delBtn_02", menuArray)>-1){
            $('#delBtn').show();
        }
    }
    //input添加伪placeholder
    $("#title").inputPlaceholder();
    //初始化
    initJqGrid();
    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    //按钮事件
    bindButton();
    //所有ajax请求异常的统一处理函数，处理
    $(document).ajaxError(
        function(event,xhr,options,exc ){
            if(xhr.status == 'undefined'){
                return;
            }
            switch(xhr.status){
                case 403:
                    $.xljUtils.tip("red","系统拒绝。");
                    break;
                case 404:
                    $.xljUtils.tip("red","您访问的资源不存在。");
                    break;
                case 500:
                    $.xljUtils.tip("red","服务器异常。");
                    break;
            }
        }
    );

});


    /**
     * 按钮事件
     */

    function  bindButton() {
        //模糊查询按钮
        $('#searchBtn').click(function () {
            var postDataObj = $('#list').jqGrid('getGridParam', 'postData');
            var postData = {};
            postData.status = postDataObj.status;
            postData.oper = postDataObj.oper;
            postData.sortFields = postDataObj.sortFields;
            var value = $('#title').getInputVal();

            var fuzzyArr = [];
            fuzzyArr.push('title');
            postData.title = value;
            postData.fuzzyQueryFields = JSON.stringify(fuzzyArr);
                delete postDataObj[fuzzyArr[0]];

            $("#list").jqGrid('setGridParam', {postData: postData,page:1}).trigger('reloadGrid');
        });
        //发帖按钮
        $('#postBtn').click(function () {
            window.open("topic/topic_edit.html?oper=add");
        });
        //删除按钮
        $('#delBtn').click(function () {
            del();
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
            var postDataObj = $('#list').jqGrid('getGridParam', 'postData');
            var postData = {};
            postData.status ="PUBLISHED";
            postData.sortFields = postDataObj.sortFields;
            postData.essence = true;
            delete postDataObj.oper;
            delete postDataObj.title;
            delete postDataObj.fuzzyQueryFields;
            $("#list").jqGrid('setGridParam', {postData:postData,url:serviceUrl+"oa/bbs/topic/page",page:1}).trigger('reloadGrid');
            $('#path').html("精华区");
            $('#gotoEssenceBtn').hide();
            $('#delBtn').hide();
            $('#editBtn').hide();
            $('#collectBtn').show();
        });
        //收藏按钮
        $('#collectBtn').click(function () {
            toAddFavorite();
        });
        //禁用所有按钮的默认行为
        $('.btn').click(function() {
            return false;
        });
        //模糊查询按钮绑定回车键
        $(document).keydown(function(event){
            if(event.keyCode==13){
                $("#searchBtn").click();
            }
        });

    }
    /**
     * 收藏
     */
    function toAddFavorite(){
        var ids=$('#list').jqGrid('getGridParam','selarrrow');
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
function initJqGrid(){
    jqGrid = jQuery("#list").jqGrid(
        {
            url: serviceUrl+"/oa/bbs/topic/mine/page",
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            contentType : "application/json",
            postData:{'status':status,'oper':oper,'sortFields': JSON.stringify({'stick': 'desc', "sortNum": "asc", 'createDate': 'desc'})},
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
            pager : '#pager',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",
            viewrecords : true,
            ondblClickRow:function(rowid){
//            	window.open("customForm_edit.html?type=edit&id="+rowid);
            	if(status=="DRAFT"&&oper=="launch"){
            		window.open("topic/topic_edit.html?oper=edit&id="+rowid);
            	}else{
            		 window.open('topic/topic_detail.html?id='+rowid);
            	}
               
            },
            gridComplete: function () {
                $('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            },
        }).navGrid('#pager', { add: false, edit: false, del: false,search:false,refresh:false });
}

/**
 * 草稿帖子删除
 */
function del(){
    var ids = $('#list').jqGrid('getGridParam','selarrrow');
    var delCount=ids.length;
    ids = ids.join(",");
	if(ids&&ids!='') {
		pop_text_open("blue", "确认要删除这"+delCount+"条数据吗？",function(){
            $.ajax({
                url:serviceUrl+"oa/bbs/topic/deletePseudoBatch/"+ids,
                type:'DELETE',
                dataType:'JSON',
                contentType:'application/json',
                data:JSON.stringify({}),
                success:function (xhr,textStatus ) {
                    if (xhr){
                        if(xhr.success) {
                            $.xljUtils.tip("green","数据删除成功！");
                            $('#list').jqGrid().trigger("reloadGrid");
                        }else{
                            if(xhr.code=="50000"){
                                $.xljUtils.tip("red",xhr.msg);
                                return;
                            }
                            $.xljUtils.tip("red","数据删除失败！");
                        }
                    }else{
                        $.xljUtils.tip("red","服务异常,请联系管理员！");
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
        },true);
    }else{
        $.xljUtils.tip("blue","请选择要删除的数据！");
    }

}

/**
 * 刷新页面
 */
function reloadList(){
    jQuery("#list").trigger("reloadGrid");
}

    /**
     *  刷新grid
     */
window.reloadList = function () {
    reloadList();
}
})(jQuery,window,document)