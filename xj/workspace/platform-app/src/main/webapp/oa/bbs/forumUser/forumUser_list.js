;(function($,window,document,undefined){
    /**
     * author:zhangfangzhi
     */
    var jqGrid;
    $(function(){
        var menuArray = getOperationAuthorition();
        if($.inArray("removeGagBtn", menuArray)>-1){
            $('#removeGagBtn').show();
        }
        initJqGrid();
        //页面加载完毕后更改grid宽高
        $.xljUtils.resizeNestedGrid();
        //input添加伪placeholder
        $("#userName").inputPlaceholder();
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
            postData.sortFields = postDataObj.sortFields;
            var userName = $('#userName').getInputVal();
                if ($.trim(userName) != '') {
                    postData.userName = userName;
                    postData.fuzzyQueryFields = JSON.stringify(['userName']);
                }
            delete postDataObj.userName;
            delete postDataObj.fuzzyQueryFields;
            $("#list").jqGrid('setGridParam', {postData: postData,page:1}).trigger('reloadGrid');
        });
        //解禁按钮
        $('#removeGagBtn').click(function () {
            var idVal = $('#list').jqGrid('getGridParam','selrow');
             var  rowData = $('#list').jqGrid('getRowData',idVal);
            if(idVal){
                $.ajax({
                    type: 'PUT',
                    url: baseUrl + "oa/bbs/forumUser/update/"+idVal,
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    data:JSON.stringify({'banCycle':0}),
                    success: function (xhr, textStatus) {
                        if (xhr) {
                            if (xhr.success) {
                                $('#list').jqGrid().trigger('reloadGrid');
                            } else {
                                //异常处理
                                switch (xhr.code) {
                                    case "50000":
                                        $.xljUtils.tip("red", xhr.msg);
                                        break;
                                    case "50002":
                                        $.xljUtils.tip("red", xhr.msg);
                                        break;
                                    default:
                                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                                        break;
                                }
                            }

                        } else {
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });

            }else{
                $.xljUtils.tip("blue","请选择一行！");
                return;
            }
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
     * 初始化表格 禁言用户列表
     */
    function initJqGrid(){
        jqGrid = $("#list").jqGrid(
            {
                url: baseUrl+"/oa/bbs/forumUser/page",
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",
                contentType : "application/json",
                postData:{sortFields:JSON.stringify({'updateDate':'desc'})},
                datatype : "json",
                multiboxonly:true,
                multiselect:false,
                autowidth:true,
                rownumbers: true,
                jsonReader : {
                    repeatitems: false
                },
                colModel : [
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {
                        label: '用户名',
                        name: 'userName',
                        width: 150,
                        editable: false,
                        align : "center"
                    },
                    {
                        label: '禁言开始时间',
                        name: 'banStartDate',
                        width: 150,
                        editable: false,
                        align : "center"
                    },
                    {
                        label : '禁言结束时间',
                        name: 'banEndDate',
                        width: 75,
                        editable: false,
                        align : "center"
                    },
                    {
                        label : '禁言情节',
                        name: 'violationPlot',
                        width: 150,
                        editable: false,align : "center"

                    },
                    {
                        label : '禁言周期(天)',
                        name: 'banCycle',
                        width: 150,
                        editable: false,align : "center"
                    }
                ],
                rowNum : 20,//一页显示多少条
                rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
                pager : '#pager',//表格页脚的占位符(一般是div)的id
                sortname : 'id',//初始化的时候排序的字段
                sortorder : "desc",
                viewrecords : true,
                ondblClickRow:function(rowid){
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
            }).navGrid('#pager', { add: false, edit: false, del: false,search:false,refresh:false });
    }

    /**
     * 刷新页面
     */
    function reloadList(){
        $("#list").trigger("reloadGrid");
    }
    /**
     * 获取按钮权限
     */
    function getOperationAuthorition() {
        var menuList;
        $.ajax({
            type: 'GET',
            url: hostUrl + 'sys/authentication/getUserAuthenticationOperation?t_='+new Date().getTime()+'&appCode=OA&menuCode=jyjl',
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
    /**
     *  刷新grid
     */
    window.reloadList = function () {
        reloadList();
    }
})(jQuery,window,document)