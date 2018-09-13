/**
 * @author dingguanghuai
 * @date 2017/03/22
 *
 */
$(function () {
    //初始化portal列表
    initPortalGrid();

    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();

    //新增
    $("#newPortalBtn").on('click', function () {
        window.open('portal_edit.html?act=create', '_blank');
    });

    //更新/修改
    $("#updatePortalBtn").on('click', function () {
        //判断是否选择多行
        var idsVal = $('#portalList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行更新！");
            return;
        }

        //判断是否选择数据
        var portalPageId = $('#portalList').jqGrid('getGridParam', 'selrow');
        if (!portalPageId) {
            $.xljUtils.tip('blue', "请选择一条需要更新的数据！");
            return;
        }

        //打开编辑界面
        window.open('portal_edit.html?act=update&portalPageId=' + portalPageId, '_blank');
    });

    //复制
    $("#copyPortalBtn").on('click', function () {
        //判断是否选择多行
        var idsVal = $('#portalList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行复制！");
            return;
        }
        var portalPageId = $('#portalList').jqGrid('getGridParam', 'selrow');
        if (portalPageId && portalPageId != "") {
            //打开编辑界面
            window.open('portal_edit.html?act=copy&portalPageId=' + portalPageId, '_blank');
        } else {
            $.xljUtils.tip('blue', "请选择一条需要复制的数据！");
        }

    });

    //删除
    $("#deletePortalBtn").on('click', function () {
        var ids = $('#portalList').jqGrid('getGridParam', 'selarrrow');
        if (!ids || ids.length == 0) {
            $.xljUtils.tip('blue', "请选择要删除的行！");
            return;
        }

        var tipText = "确定要删除这" + ids.length + "条数据吗？";
        $.xljUtils.confirm('blue', tipText, function () {
            ids = ids.join(",");
            if (ids && ids != '') {
                $.ajax({
                    url: serviceUrl + "oa/portal/portalPage/deleteBatch/" + ids,
                    type: 'DELETE',
                    dataType: 'JSON',
                    success: function (resultData) {
                        if (resultData && resultData.success) {
                            $.xljUtils.tip('green', "数据删除成功！");
                            $('#portalList').jqGrid().trigger("reloadGrid");
                        } else {
                            $.xljUtils.tip('red', resultData.msg);
                        }
                    }
                });
            }
        }, true);
    });

    //设计页面
    $("#designPortalBtn").on('click', function () {
        var idsVal = $('#portalList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行页面设计！");
            return;
        }

        var idVal = $('#portalList').jqGrid('getGridParam', 'selrow');

        if (idVal && idVal != "") {
            window.open('portalPosition_edit_copy.html?adminUser=SHORTCUT_ADMIN&portalPageId=' + idVal, '_blank');
        } else {
            $.xljUtils.tip('blue', "请单击行选择进行页面设计的站点！");
        }

    });

    //预览
    $("#previewPortalBtn").on('click', function () {
        var idsVal = $('#portalList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行页面设计！");
            return;
        }

        var idVal = $('#portalList').jqGrid('getGridParam', 'selrow');

        if (idVal && idVal != "") {
            window.open('portal_view_copy.html?portalPageId=' + idVal, "_blank");
        } else {
            $.xljUtils.tip('blue', "请单击行选择进行页面设计的站点！");
        }
    });

    //点击授权按钮弹出角色选择树
    $("#authorizationPortalBtn").on('click', function () {
        //重置角色id、name、code
        $(this).siblings('input:hidden').val('');

        //判断是否选择多条数据，如果选择多条则给出提示
        var idsVal = $('#portalList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行站点授权！");
            return;
        }

        var idVal = $('#portalList').jqGrid('getGridParam', 'selrow');

        var $ele = $(this);
        //判断是否选择数据
        if (idVal) {
            $ele.data('portalPageId', idVal);
            //查找站点对应权限
            $.ajax({
                url: serviceUrl + 'oa/portal/portalPagePermision/queryList?_t=' + new Date().getTime(),
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({portalPageId: idVal}),
                dataType: 'JSON',
                success: function (resultData) {
                    if (resultData) {
                        var portalPageId = $ele.data('portalPageId');
                        //初始化站点权限
                        var result = resultData.result;
                        var roleIds = '';
                        if (result.length > 0) {
                            for (var i in result) {
                                roleIds += result[i].roleId + ',';
                            }
                        }
                        roleIds = roleIds.substring(0, roleIds.lastIndexOf(','));
                        var roleIdsInputObj = $ele.siblings('input[name="_roleIds"]:hidden');
                        if (!roleIdsInputObj[0]) {
                            $('<input type="hidden" id="_roleIds" name="_roleIds" value="' + roleIds + '">').insertAfter($ele);
                        } else {
                            roleIdsInputObj.val(roleIds);
                        }

                        //使用多选选择器，弹出角色树选择框
                        showRoleTree($ele);
                    }
                },
                error: function (xhr) {
                    console.info(xhr);
                }
            });
        } else {
            $.xljUtils.tip('red', "只能选择一行数据进行站点授权！");
        }
    });

    /**
     * 显示角色树
     * @param portalPageId
     */
    function showRoleTree($ele) {
        $ele.xljMultipleSelector({
            selectorType: 'role',//选择器类型
            immediatelyShow: true,//是否立即显示，默认是false，已click事件触发
            title: '选择角色',//选择器标题
            gridTitle: '角色列表',//选择器右侧列表标题
            targetId: '_roleIds',
            treeParam:{roleCataStatus:true},
            //选择器保存按钮回调函数
            saveCallback: function (data, ele) {
                var portalPagePermisions = [];
                var roleArr = data;
                for (var i in roleArr) {
                    var role = roleArr[i];
                    var portalPagePermision = {};
                    portalPagePermision['portalPageId'] = $(ele).data('portalPageId');
                    portalPagePermision['roleId'] = roleArr[i].id;
                    portalPagePermisions.push(portalPagePermision);
                }

                //保存数据
                $.ajax({
                    url: serviceUrl + 'oa/portal/portalPagePermision/saveBatchForPortalPermission/' + $(ele).data('portalPageId'),
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(portalPagePermisions),
                    dataType: 'JSON',
                    success: function (resultData) {
                        if (resultData && resultData.success) {
                            $.xljUtils.tip('green', '站点授权成功！');
                            //$("#roleSelectorModal").modal('hide');
                        } else {
                            $.xljUtils.tip('red', '站点授权失败！');
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (textStatus == '500') {
                            $.xljUtils.tip('red', '服务器异常！');
                        } else if (textStatus == '404') {
                            $.xljUtils.tip('red', '找不到资源！');
                        }
                    }
                });
            }
        });
    }

    //为站点授权操作
    $("#authorizationBtn").on('click', function () {
        var treeObj = $.fn.zTree.getZTreeObj("roleSelectorTree");
        var nodes = treeObj.getCheckedNodes(true);
        var portalPagePermisions = [];
        for (var i in nodes) {
            var roleId = nodes[i].id;
            var mold = nodes[i].mold;
            if (mold == 'role') {

                var portalPagePermision = {};
                portalPagePermision['portalPageId'] = $('#pageId').val();
                portalPagePermision['roleId'] = roleId;
                portalPagePermisions.push(portalPagePermision);
            }
        }

        //参数不为空的时候查找
        if (portalPagePermisions.length > 0) {
            $.ajax({
                url: serviceUrl + 'oa/portal/portalPagePermision/saveBatch',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(portalPagePermisions),
                dataType: 'JSON',
                success: function (resultData) {
                    if (resultData && resultData.success) {
                        $.xljUtils.tip('green', '站点授权成功！');
                        $("#roleSelectorModal").modal('hide');
                    } else {
                        $.xljUtils.tip('red', '站点授权失败！');
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (textStatus == '500') {
                        $.xljUtils.tip('red', '服务器异常！');
                    } else if (textStatus == '404') {
                        $.xljUtils.tip('red', '找不到资源！');
                    }
                }
            });
        }
    });

    //模糊查询按钮绑定事件
    $("#searchBtn").unbind('click').on('click', function () {
        fuzzySearch();
    });

    //模糊搜索关键字ENTER键按下事件
    $('#keywords').on('keydown',function () {
        if (event.keyCode == 13) {
            fuzzySearch();
        }
    });

    //禁用按钮
    $('#disableBtn').on('click',function(){
        changePortalPageStatus(false);
    });
    //启用按钮
    $('#enableBtn').on('click',function(){
        changePortalPageStatus(true);
    });

    //启用or禁用
    function changePortalPageStatus(flag) {
        var ids = $('#portalList').jqGrid('getGridParam', 'selarrrow');
        if(ids.length<=0){
            $.xljUtils.tip('blue','请选择需要操作的数据！');
            return;
        }
        var paramData = {
            portalPageIdList:ids,
            status:flag
        };

        $.ajax({
            type: 'POST',
            url: serviceUrl +'oa/portal/portalPage/updatePortalStatus',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(paramData),
            success: function (json) {
                if (json.success) {
                    $.xljUtils.tip('green',flag?'启用成功！':'禁用成功！');
                    $('#portalList').jqGrid().trigger("reloadGrid");
                } else {
                    $.xljUtils.tip('red',flag?'启用失败！':'禁用失败！');
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        })
    }

});

/**
 * 初始化portal列表
 * @author dgh
 * @date 2017/03/22
 */
function initPortalGrid() {
    function addCellAttr(rowId, val, rowObject, cm, rdata) {
        if(rowObject.status == "0" ){
            return "style='color:red'";
        }
    }
    $.xljUtils.initJqGrid({
        gridSelecter:"#portalList",
        url: serviceUrl + 'oa/portal/portalPage/page',
        ajaxGridOptions: {contentType: 'application/json'},
        mtype: "POST",
        contentType: "application/json",
        datatype: "json",
        postData: {'portalPageOwner':'_NA_','sortFields':JSON.stringify({'priority':'desc','createDate':'desc'})},
        multiboxonly: true,
        multiselect: true,
        autowidth: true,
        rownumbers: true,
        jsonReader: {
            repeatitems: false
        },
        colNames: ['ID', '站点名称', '站点编码','状态', '站点描述', '优先级', '源站点', '站点拥有人', '创建日期'],
        colModel: [
            {name: 'id', index: 'id', width: 55, hidden: true,sortable:false},
            {name: 'portalPageName', index: 'portalPageName',sortable:false, cellattr: addCellAttr},
            {name: 'portalPageCode', index: 'portalPageCode',sortable:false},
            {name: 'status', index: 'status',sortable:false,cellattr: addCellAttr,formatter:function (cellvalue, options, rowObject) {
                if(cellvalue == "1"){
                    return "启用";
                }else if(cellvalue == "0"){
                    return "禁用";
                }else{
                    return "启用";
                }
            }},
            {name: 'portalPageDesc', index: 'portalPageDesc',sortable:false},
            {name: 'priority', index: 'priority',sortable:false},
            {name: 'originPortalPageId', index: 'originPortalPageId', hidden: true,sortable:false},
            {name: 'portalPageOwner', index: 'portalPageOwner', formatter: function (cellvalue, options, rowObject) {
                if (cellvalue == '_NA_') {
                    return '系统';
                }
            }, hidden: true,sortable:false},
            {name: 'createDate', index: 'createDate',sortable:false}
        ],
        rowNum: 20,//一页显示多少条
        rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
        pager: '#portalPager',//表格页脚的占位符(一般是div)的id
        viewrecords: true,
        ondblClickRow: function(rowid,iRow,iCol,e){
            window.open('portal_edit.html?act=update&portalPageId=' + rowid, '_blank');
        },
        loadComplete: function (xhr) {
            if (!xhr.success) {
                switch (xhr.code) {
                    case "50000":
                        $.xljUtils.tip("red", xhr.msg);
                        break;
                    case "50001":
                        $.xljUtils.tip("red", xhr.msg);
                        break;
                    case "50002":
                        $.xljUtils.tip("blue", xhr.msg);
                        break;
                    case "50003":
                        $.xljUtils.tip("red", xhr.msg);
                        break;

                    default:
                        $.xljUtils.tip("red", "查询数据失败！");
                        break;
                }
            } else {
                //success
            }
        }
    });
}

/**
 * 设置新增行ID到jqgrid
 * @param rowId
 * @returns
 */
function setJqGridAddedRowId(rowId) {
	$.xljUtils.setAddedRowId('#portalList', rowId);
}

/**
 * 重新计算grid宽高
 * @author dgh
 * @date 2017/03/22
 */
function resizeNestedGrid() {
    var fitGridTables = $('table[constraint-layout="true"]');
    var documentBodyHeight = document.body.scrollHeight;
    var parentIframe = $(window.parent.document.body).find('iframe')[0];

    if (parentIframe) {
        documentBodyHeight = $(parentIframe).height();
    } else {
    }

    $.each(fitGridTables, function (i, fitGridTable) {
        var gridHeadrHeight = $(fitGridTable).parents(".ui-jqgrid-bdiv").siblings('.ui-jqgrid-hdiv').outerHeight();
        var gridFooterHeight = $(fitGridTable).parents(".ui-jqgrid-view").siblings(".ui-jqgrid-pager").outerHeight();


        var gridContainer = $(fitGridTable).parents('div.grid-container')[0];
        var containerSiblings = $(gridContainer).siblings();
        var gridHeight = documentBodyHeight;
        $.each(containerSiblings, function () {
            gridHeight = gridHeight - $(this).outerHeight();
        });

        gridHeight = gridHeight - gridHeadrHeight - gridFooterHeight - 12;
        $(fitGridTable).jqGrid().setGridHeight(gridHeight);
        $(fitGridTable).jqGrid().setGridWidth($(gridContainer).width(), true);

    });
}

/**
 * 初始化角色树
 */
function initRoleTree() {
    var setting = {
        callback: {},
        check: {
            enable: true,
        }
    };

    $.ajax({
        url: '/platform-app/sys/org/roleCatalog/getRoleTree',
        contentType: 'application/json',
        data: JSON.stringify({}),
        dataType: 'JSON',
        type: 'POST',
        success: function (resultData) {
            //设置model高度及滚动条
            $(".mytable").css({
                overflow: 'yes',
                height: $(window).height() - $('.clearfix').height() - 250
            });
            var zNodes = resultData.result;
            $.fn.zTree.init($("#roleSelectorTree"), setting, zNodes);


        }
    });
}
/**
 * 模糊查询: 名字或者编码
 */
function fuzzySearch() {
    var searchInputVal = $("#keywords").val();
    var queryDataObj =  $('#portalList').jqGrid('getGridParam','postData');
    var queryData = {};
    queryData.sortFields = queryDataObj.sortFields;
    if(searchInputVal!='') {
        queryData.portalPageCode = searchInputVal;
        queryData.portalPageName = searchInputVal;
        queryData.fuzzyQueryFields = JSON.stringify(['portalPageName','portalPageCode']);
    }

    delete queryDataObj.portalPageCode;
    delete queryDataObj.portalPageName;
    delete queryDataObj.fuzzyQueryFields;
    delete queryDataObj.sortFields;

    jQuery("#portalList").jqGrid('setGridParam', {postData: queryData,page:1}).trigger('reloadGrid');
};

/**
 * 刷新grid
 * */
function reloadGrid(rowId) {
    $('#portalList').jqGrid().trigger("reloadGrid");
    // setTimeout(function () {
    //     if(rowId){
    //         $('#portalList').jqGrid('setSelection',rowId);
    //     }
    // },1500);
}
