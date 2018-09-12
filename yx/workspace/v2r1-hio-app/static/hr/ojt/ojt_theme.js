/**
 * Created by xph on 2017/7/5.
 */

(function ($, window, document, undefined) {
    //定义全局参数
    var edit_subjectId;
    var rowData;
    var rowDataBefore;
    var jqGridPost;

    var focusTypeId;

    var postType;//序列树
    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //表示con-table 下的mytable1
        $(".con-table .mytable").height((w_h - 103) + "px");
    }

    //计算表格宽度
    function resizeGrid() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 75);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-5, true);
        $.xljUtils.gridResizeFn();
    }

    //上来就执行
    $(function () {
        //初始化高度
        resizeHeight();
        //加载左侧类别树
        getThemeTypeTree();
        //初始化加载列表信息
        getThemeList();

        initTypeSelect();
        initCodeSelect("1113","difficulty");
        initCodeSelect("1114","type");
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        $('.my-checkbox').on('click', function (event) {
        });
        //在加载完表格后，设置表格的宽度
        resizeGrid();

        $("#addThemeType").on('click', function () {
            addThemeType();
        });
        $("#updateThemeType").on('click', function () {
            updateThemeType();
        });
        $("#delThemeType").on('click', function () {
            delThemeType();
        });
        $("#exportBtn").on('click', function () {
            exportExcel();
        });
        $("#importBtn").on('click', function () {
            importExcel();
        });
    });

    $("#deleteBtn").unbind('click').on('click', function () {
        del();
    });
    $("#expandedSearchBtn").unbind('click').on('click', function () {
        expandedSearchTheme();
    });
    //新增试题跳转页面
    $("#addBtn").click(function () {
        window.open("ojt_theme_add.html?type=add");
    });
    //修改试题跳转页面
    $("#updateBtn").click(function () {
        var idsVal = $('#themeList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#themeList').jqGrid("getGridParam", "selrow");
                rowData = $('#themeList').jqGrid('getRowData', rowId);
                window.open("ojt_theme_add.html?type=update&id=" + rowData.id);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    });

    /**
     * 加载themem列表
     */
    function getThemeList() {
        jqGridPost = jQuery("#themeList").jqGrid(
            {
                url: hostUrl + 'ojt/hrOjtExamTheme/queryListByConditionByPage',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                //postData: {"status": '1', "name": '', "type": ''},
                postData: {"delfalg": '0'},
                autowidth: true,
                colNames: ['id', '试题名称', '试题类型', '试题分类id','试题分类', '试题难度', '说明'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'name', index: 'name', editable: true, align: 'center'},
                    {
                        name: 'type',
                        index: 'type',
                        editable: true,
                        align: 'center',
                        formatter:codeFmatter},
                    {
                        name: 'themeTypeId',
                        index: 'themeTypeId',
                        editable: true,
                        sortable: false,
                        align: 'center', hidden: true},
                    {
                        name: 'themeTypeName',
                        index: 'themeTypeName',
                        editable: true,
                        align: 'center'},
                    {
                        name: 'difficulty',
                        index: 'difficulty',
                        editable: true,
                        align: 'center',
                        formatter:codeFmatter},
                    {name: 'remark', index: 'remark', editable: true, sortable: false, align: 'center'}
                ],
                // columns:[],
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                jsonReader: {
                    //root: "result",
                    repeatitems: false
                },
                sortname: "theme.create_date",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#themeList ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#themeList').jqGrid("getGridParam", "selrow");
                    rowData = $('#themeList').jqGrid('getRowData', rowId);
                },

                ondblClickRow: function () {
                    //跳转编辑页
                    var rowId = $('#themeList').jqGrid("getGridParam", "selrow");
                    rowData = $('#themeList').jqGrid('getRowData', rowId);
                    window.open("ojt_theme_add.html?type=update&id=" + rowData.id);
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#themeList').setSelection(rowDataBefore.id, true);
                        $('#themeList ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                },
                rowNum: 20,//一页显示多少条 -1全部
                rowList: [20, 50, 100,200],//可供用户选择一页显示多少条
                pager: "#pager",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
                shrinkToFit: true,
                loadError: function (xhr, status, error) {
                    //异常处理
                    console.log(xhr.status);
                    if (xhr.status == 404) {
                        $.xljUtils.tip("red", "请求url有误！");
                        return;
                    }
                    if (xhr.status == 405) {
                        $.xljUtils.tip("red", "请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red", "网络异常,请联系管理员！");
                },
                onSortCol: function (index, colindex, sortorder) {//列排序事件
                    var postData = $('#themeList').jqGrid("getGridParam", "postData");
                    // delete  postData["zTreeOnClick"];
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
        var w_h = $(window).height();
        var v = w_h - 150;
        $("#gbox_themeList").css("height",v+"px");

    }

    /**
     * 加载type树
     */
    function getThemeTypeTree() {
        $("#treeDemo_1_ul").empty();
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtThemeType/queryListByCondition",
            data: JSON.stringify({}),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                // pop_tip_open("blue","新增成功！");
                var result = data.result;
                if(result==null||result.length==0){
                    return;
                }

                for(var i =0;i<data.result.length;i++){
                    $("#treeDemo_1_ul").append('' +
                        '<li class="level1" tabindex="0" hidefocus="true" > ' +
                            '<a  class="level1"  target="_blank" style="color:#333;font-weight:normal;font-style:normal;' +
                            '"onclick="clickTreeNode(this)"> ' +
                                '<span class="node_name" name="'+result[i].id+'">'+result[i].name+'</span> ' +
                            '</a> ' +
                        '</li>')
                }

                if(focusTypeId != null && focusTypeId != "") {
                    $("#treeDemo_1_ul").find("span[name="+focusTypeId+"]").parent().click();
                }
            }
        });


    }

    $("#treeDemo_1_a").click(function (e) {
        clickTreeNode(this);
    })

    /**
     *  代码项
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    function codeFmatter(cellvalue, options, rowObject) {
        return $.hrUtils.getHRCodeNameById(cellvalue);
    }

    /**
     * 初始化试题分类下拉框
     */
    function initTypeSelect(){
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtThemeType/queryListByCondition",
            data: JSON.stringify({}),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                // pop_tip_open("blue","新增成功！");
                var result = data.result;
                if(result==null||result.length==0){
                    return;
                }
                for(var i =0;i<data.result.length;i++){
                    $("#themeType").append("<option value="+result[i].id+">"+result[i].name+"</option>");
                }
            }
        });
    }
    //初始化页面中的代码项列表
    function initCodeSelect(code_set_id,selectId){
        var pam = {};
        pam.code_set_id = code_set_id;
        var urlBody = "/sys/sysCodeItem/getSysCodeItemById";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            type: 'POST',
            url: urlAll,
            data: JSON.stringify(pam),
            dataType: 'json',
            success: function (json) {
                var retDt = json.result;
                if(undefined != retDt){
                    $.each(retDt,function(i,item){
                        $("#"+selectId).append("<option value='" + item.id + "'>" + item.name + "</option>")
                    });
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "代码项初始化失败");
            }
        });
    }

    /**
     * 删除试题
     */
    function del() {
        var idsVal = $('#themeList').jqGrid('getGridParam', 'selarrrow');
        /*var w = $.hrUtils.focusNode(idsVal);//聚焦checked
        $('#themeList').jqGrid("setGridParam",{
            getComplete:function () {
                if(w != null && w != ""){
                    $("#themeList").setSelection(w);
                }
            }
        }).trigger("reloadGrid");
        return;*/
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    //url: baseUrl + "/org/post/deleteBatch/" + idsVal,
                    url: baseUrl + "ojt/hrOjtExamTheme/deletePseudoBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                var w = $.hrUtils.focusNode(idsVal);//聚焦checked
                                var postData = $("#themeList").jqGrid("getGridParam", "postData");
                                $.each(postData, function (k, v) {
                                    delete postData[k];
                                });
                                $('#themeList').jqGrid("setGridParam", {
                                    page:1,
                                    gridComplete: function () {
                                        if (w != null && w != "") {
                                            $("#themeList").setSelection(w);
                                        }
                                        w = "";
                                    }
                                }).trigger("reloadGrid");
                            } else {
                                $.xljUtils.tip("red", xhr.msg);
                            }
                        } else {
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });
            }, true);
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }

    /**
     *  点击左侧类别树后改变样式并刷新右侧表格
     */

    window.clickTreeNode = function (e){
        $("#treeDemo_1_ul").find("a").removeClass("curSelectedNode");
        $(e).addClass("curSelectedNode");
        var themeTypeId = $(e).children("span").attr("name");
        var postData = $("#themeList").jqGrid("getGridParam", "postData");
        $.each(postData, function (k, v) {
            delete postData[k];
        });
        //或刷新连带表格
        var queryDataPost = {
            "themeTypeId": themeTypeId
        };
        $('#themeList').jqGrid("setGridParam", {postData: queryDataPost,page:1}).trigger("reloadGrid");
    }

    /**
     *  新增类别
     */

    function addThemeType(){
        window.open("ojt_theme_type_add.html?type=add");
    }

    /**
     *  修改类别
     */
    function updateThemeType(){
        var selectType = $("#treeDemo_1_ul").find("a.curSelectedNode");
        var updateId = $(selectType).children("span").attr("name");
        if (updateId == undefined){
            $.xljUtils.tip("blue", "请选择要修改的试题类别！");
            return;
        }
        window.open("ojt_theme_type_add.html?type=update&typeId="+updateId);
    }

    /**
     *  删除类别
     */

    function delThemeType(){
        var selectType = $("#treeDemo_1_ul").find("a.curSelectedNode");
        var delId = $(selectType).children("span").attr("name");
        if (delId == undefined){
            $.xljUtils.tip("blue", "请选择要删除的试题类别！");
            return;
        }
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtExamTheme/queryListByCondition",
            data: JSON.stringify({"themeTypeId": delId,delflag:0}),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                // pop_tip_open("blue","新增成功！");
                var result = data.result;
                if(result==null){
                    $.xljUtils.tip("red", "校验异常，删除失败！");
                    return;
                }
                if(result.length>0){
                    $.xljUtils.tip("red", "该试题分类下还有试题，无法删除！");
                    return;
                }
                $.ajax({
                    url: baseUrl + "ojt/hrOjtThemeType/deletePseudo/" + delId,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                getThemeTypeTree();
                            } else {
                                $.xljUtils.tip("red", xhr.msg);
                            }
                        } else {
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });
            }
        });
    }

    /**
     *  导出Excel
     */
    function exportExcel() {
        //表格数据
        rowData = $('#themeList').jqGrid('getRowData');
        var urlBody = "ojt/hrOjtExamTheme/exportInfo";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(rowData),
            async: false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {//指定下载
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action', hostUrl + "org/orgPostRelation/exportInfoClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type', 'hidden');
                        input1.attr('name', "path");
                        input1.attr('value', path);

                        $('body').append(form);  //将表单放置在web中
                        form.append(input1);   //将查询参数控件提交到表单上
                        form.submit();   //表单提交
                        pop_tip_open("", "导出成功");
                    }
                } else {
                    pop_tip_open("red", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "导出失败");
            }
        })
    }

    function importExcel() {
        window.open("ojt_theme_import.html");
    }

    window.selectChange = function(){
        expandedSearchTheme();
    }

    /**
     *  条件查询
     */
    function expandedSearchTheme(){
        var type = $("#type").val();
        var themeType = $("#themeType").val();
        var difficulty = $("#difficulty").val();
        var name = $("#name").val();
        var queryCondition = {};
        queryCondition.type = type;
        queryCondition.themeTypeId = themeType;
        queryCondition.difficulty = difficulty;
        queryCondition.name = name;
        var postData = $("#themeList").jqGrid("getGridParam", "postData");
        $.each(postData, function (k, v) {
            delete postData[k];
        });
        $("#themeList").jqGrid('setGridParam',{datatype:'json',postData:queryCondition,page:1}).trigger('reloadGrid');
    }

    /**
     * 刷新grid
     */
    window.reloadThemeAndSelect = function (themeId,themeTypeId) {
        var postData = $("#themeList").jqGrid("getGridParam", "postData");
        $.each(postData, function (k, v) {
            delete postData[k];
        });
        if (themeId == undefined && themeTypeId == undefined){
            $('#themeList').jqGrid("setGridParam", { page:1}).trigger("reloadGrid");
            return;
        }
        var type = $("#treeDemo_1_ul").find("span[name="+themeTypeId+"]").parent();
        $("#treeDemo_1").find("a").removeClass("curSelectedNode");
        $(type).addClass("curSelectedNode");

        $('#themeList').jqGrid("setGridParam", {
            postData: {"themeTypeId": themeTypeId},
            page:1,
            gridComplete:function(){
                if(themeId != null && themeId != ""){
                    $("#themeList").setSelection(themeId);
                }
            }
        }).trigger("reloadGrid");
    }

    window.reloadTypeList = function (typeId) {
        focusTypeId = typeId;
        getThemeTypeTree();
    }

})(jQuery, window, document);