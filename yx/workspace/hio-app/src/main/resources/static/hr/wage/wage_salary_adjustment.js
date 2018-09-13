//todo 试卷设置js
;(function($, window, document, undefined){
    var paperId;//试卷ID
    //todo 上来就执行
    $(function () {
        // paperId = $.xljUtils.getUrlParam("id");

        //初始化变动信息
        getEmpChange(paperId);

        //初始化调薪历史
        initExamSetList(paperId);


        //todo 加载试题列表
        $("#addThemeBtn").click(function () {
            loadThemeList();
        });

        //todo 保存试题列表
        $("#saveCancelBtn").click(function () {
            savePaperThemeList();
        });

        //todo 删除试题
        $("#delThemeBtn").click(function () {
            deleteThemeList();
        });

        //todo 关闭窗口
        $("#closeBtn").click(function () {
            window.close();
        });

        //todo 查询试题
        $("#queryBtn").click(function () {
            queryThemeByCondition();
        });


    });
    
    //todo 根据试题类别查询试题
    function queryThemeByCondition() {
        var queryCondition = {};
        var themeCategory = $("#themeCategory").val();//试题类别
        queryCondition.themeCategory = themeCategory;
        var postData = $("#themeList").jqGrid("getGridParam", "postData");
        $.each(postData, function (k, v) {
            delete postData[k];
        });
        $("#themeList").jqGrid('setGridParam', {datatype: 'json', postData: queryCondition}).trigger('reloadGrid');
    }

    //todo 删除试题
    function deleteThemeList() {
        var idsVal = $('#evaExamSetForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "eva/hrEvaPaperTheme/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $('#evaExamSetForm').jqGrid().trigger("reloadGrid");
                            } else {
                                if (xhr.code == "50000") {//请求返回的状态码？
                                    $.xljUtils.tip("red", xhr.msg);
                                    return;
                                }
                                $.xljUtils.tip("red", "数据删除失败！");
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
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }
    
    //todo 保存试题列表
    function savePaperThemeList() {
        var itemSeleted = item_selected.toString();
        var param = {};
        param.itemSeleted = itemSeleted;
        param.paperId = paperId;
        $.ajax({
            type:'POST',
            contentType: "application/json",
            url:baseUrl+ 'eva/hrEvaPaperTheme/savePaperThemeList',
            async:false,
            data:JSON.stringify(param),
            dataType:"JSON",
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        // alert("保存成功");
                        $('#getThemeList').modal('hide');
                        $('#evaExamSetForm').jqGrid().trigger("reloadGrid");
                    }else{
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue",xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red",xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red","服务异常,请联系管理员！");
                                break;
                        }
                    }
                }else{
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
    }

    var item_selected = new Array();
    //todo 加载试题列表
    function loadThemeList(){
        //创建jqGrid组件
        var jqGridSysInfoSet = jQuery("#themeList").jqGrid(
            {
                url: baseUrl+'eva/hrEvaExamTheme/getThemePageByPageId',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                colNames: ['id','是否选中','试题编号', '题干','答案','维度','难度','类型','试题类别'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',editable:false,sortable:false,hidden:true,align: "center"},
                    {name : 'optionSeleted',label : 'optionSeleted',editable:false,sortable:false,hidden:true,align: "center"},
                    {name: 'themeNum', index: 'themeNum', editable: false, width: 100, align: "center"},
                    {name: 'name', index: 'name', editable: false, width: 100, align: "center"},
                    {name: 'optionManageId', index: 'optionManageId', editable: false, width: 100, align: "center",hidden:true},
                    {name: 'dimensionalityId', index: 'dimensionalityId', editable: false, width: 100, align: "center",hidden:true},
                    {name: 'difficulty', index: 'difficulty', editable: false, width: 100, align: "center",hidden:true},
                    {name: 'themeType', index: 'themeType', editable: false, width: 100, align: "center"},
                    {name: 'themeCategory', index: 'themeCategory', editable: false, width: 100, align: "center"}
                ],
                width: window.screen.availWidth - 25,
                height: $(window).height() - 270,
                autoWidth: true,
                pager: '#pager3',
                rowList: [20,50,100,200],//可供用户选择一页显示多少条
                viewrecords: true,
                sortname: 'theme_num',//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                multiselect: true,
                postData:{"paperId":paperId},
                jsonReader: {
                    repeatitems: false
                },
                afterInsertRow:function (rowid,rowdata,rowelem) {
                    if(rowdata.optionSeleted == 'true'){
                        if($.inArray(rowid,item_selected) == -1){
                            item_selected.push(rowid);
                        }
                    }
                },
                onSelectAll:function(aRowids,status) {
                    $.each(aRowids,function (index,content) {
                        var index = $.inArray(content,item_selected);
                        if(index == -1){
                            item_selected.push(content);
                        }else{
                            item_selected.remove(content);
                        }
                    });
                },
                beforeSelectRow:function(rowid, e) {
                    //todo 获取所有选中的行
                    var idsVal = $('#themeList').jqGrid('getGridParam', 'selarrrow');
                    $("#themeList").setSelection(rowid, true);
                    var index = $.inArray(rowid,item_selected);
                    if(index == -1){
                        item_selected.push(rowid);
                    }else{
                        item_selected.remove(rowid);
                    }
                },
                gridComplete: function () {
                    $("#cb_themeList").hide();
                    if(item_selected.length>0){
                        for (var i = 0; i < item_selected.length; i++) {
                            $("#themeList").jqGrid('setSelection',item_selected[i]);
                        }
                    }
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                rowNum: 20,
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
                    }
                }
            });
        $('#getThemeList').modal('show');
    }

    //初始化变动信息
    function getEmpChange(paperId) {
        url = baseUrl+'eva/hrEvaExamPaper/get/'+paperId;
        $.ajax({
            type:'GET',
            // url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#paperNum").val(xhr.result.paperNum);
                        $("#paperName").val(xhr.result.name);
                    }else{
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue",xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red",xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red","服务异常,请联系管理员！");
                                break;
                        }
                    }
                }else{
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }

        });
    }
    
    //todo 调薪历史列表
    function initExamSetList(paperId){
        var jqGridSysInfoSet = jQuery("#evaExamSetForm").jqGrid(
            {
                // url: baseUrl+'eva/hrEvaExamTheme/pageList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                colNames: ['id','调整后基本工资', '调整后岗位工资','调整幅度','调整生效时间','调整原因'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',editable:true,sortable:false,hidden:true,align: "center"},
                    {name: 'themeNum', index: 'themeNum', editable: true, width: 100, align: "center"},
                    {name: 'name', index: 'name', editable: true, width: 100, align: "center"},
                    {name: 'optionManageId', index: 'optionManageId', editable: true, width: 100, align: "center"},
                    {name: 'dimensionalityId', index: 'dimensionalityId', editable: true, width: 100, align: "center"},
                    {name: 'difficulty', index: 'difficulty', editable: true, width: 100, align: "center",hidden:true}
                ],
                width: window.screen.availWidth - 25,
                height: $(window).height() - 270,
                autoWidth: true,
                pager: '#pager2',
                rowList: [20,50,100,200],//可供用户选择一页显示多少条
                viewrecords: true,
                sortname: 'theme_num',//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                multiselect: true,
                // multiboxonly: true,
                postData:{"delflag":0,'paperId':paperId},
                jsonReader: {
                    repeatitems: false
                },
                onSelectRow: function (rowId) {
                    var rowId = $('#evaExamPaperForm').jqGrid("getGridParam", "selrow");
                    rowData = $('#evaExamPaperForm').jqGrid('getRowData', rowId);
                },
                ondblClickRow:function(rowId){
                    //var winObjEI = window.open('eva_exam_paper_edit.html?id='+rowId+'&oper=edit');
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                rowNum: 20,
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
                    }
                }
            });
    }

    //todo 格式化试题类型
    function formatThemeType(cellvalue, options, rowObject) {
        if(cellvalue == '1'){
            return '单选题';
        }else if(cellvalue == '2'){
            return '多选题';
        }else if(cellvalue == '3'){
            return '两级题';
        }else if(cellvalue == '4'){
            return '主观题';
        }
    }

    //todo 删除数组指定元素
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };



    //返回上一级
    window.goBack = function () {
        window.history.go(-1);
    };


})(jQuery, window, document);