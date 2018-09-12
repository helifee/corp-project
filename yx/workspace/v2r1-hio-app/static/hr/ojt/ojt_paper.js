/**
 * Created by jh on 2017/7/6.
 */
var paperTypeId;

;(function ($, window, document, undefined) {
    /*全局变量*/
    var item_data;
    var focusTypeId;

    var deptId;
    //有效
    $("#validY").on('click',function () {
        var sta = $("#validY").val();
        validChan(sta);
    });
    /*$("#validChange :button[name='validChange']").on('click',function () {
        alert('12');
    });*/
    //无效
    $("#validN").on('click',function () {
        var sta = $("#validN").val();
        validChan(sta);
    });
    //未生效
    $("#validNN").on('click',function () {
        var sta = $("#validNN").val();
        validChan(sta);
    });
    function validChan(sta) {
        var idsVal = $('#listPaperList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length==1) {
                var rowId = $('#listPaperList').jqGrid("getGridParam", "selrow");
                updateInfo(rowId, sta);
            }else {
                $.xljUtils.tip("blue", "同时只能修改一条数据！");
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }
    /*状态设置*/
    $("#saveSta").on('click', function () {
        var sta = $('input:radio[name="radioStatue"]:checked').val();
        var idsVal = $('#listPaperList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length==1) {
                var rowId = $('#listPaperList').jqGrid("getGridParam", "selrow");
                updateInfo(rowId, sta);
            }else {
                $.xljUtils.tip("blue", "同时只能修改一条数据！");
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    });
    /**
     * 修改状态设置
     * @param n
     */
    function updateInfo(rowId, sta) {
        //获取页面的参数
        var status = $("#status option:checked").val();
        //修改试卷表
        var dto = {status: sta};
        dto.delflag = 0;
        $.ajax({
            url: baseUrl + "ojt/hrOjtExamPapers/update/" + rowId,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(dto),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        $.xljUtils.tip("green", "修改成功！");
                        var v = new Array();
                        /*v.push(rowId);
                        var w = $.hrUtils.focusNode(v);//聚焦checked*/
                        $('#listPaperList').jqGrid("setGridParam", {
                            gridComplete:function(){
                                if(rowId != null && rowId != ""){
                                    $("#listPaperList").setSelection(rowId);
                                }
                            }
                        }).trigger("reloadGrid");
                        //jQuery("#listPaperList").jqGrid().trigger("reloadGrid");
                    } else {
                        pop_tip_open("red", "数据修改保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
    }

    /**
     * 加载type树
     */
    function getPaperTree() {
        $("#treeDemo_1_ul").empty();
        $.ajax({
            type: "POST",
            url: hostUrl + "ojt/hrOjtPaperType/queryList",
            data: JSON.stringify({}),
            dataType: "JSON",
            contentType: "application/json",
            success: function (data) {
                // pop_tip_open("blue","新增成功！");
                var result = data.result;
                if (result == null || result.length == 0) {
                    return;
                }
                for (var i = 0; i < data.result.length; i++) {
                    $("#treeDemo_1_ul").append('' +
                        '<li class="level1" tabindex="0" hidefocus="true" > ' +
                        '<a  class="level1"  target="_blank" style="color:#333;font-weight:normal;font-style:normal;' +
                        '"onclick="clickTreeNode(this)"> ' +
                        '<span id="treeDemo_2_ico" title="" treenode_ico="" class="button diy-company_ico_close" style=""></span>' +
                        '<span class="node_name" name="' + result[i].id + '">' + result[i].name + '</span> ' +
                        '</a> ' +
                        '</li>')
                }

                if(focusTypeId != null && focusTypeId != "") {
                    $("#treeDemo_1_ul").find("span[name="+focusTypeId+"]").parent().click();
                }
            }
        });
    }

    /*点击试卷分类  显示所有类别的试卷信息*/
    $("#treeDemo_1_a").on('click', function (e) {
        clickTreeNode(this);
    });
    /**
     * 新增-初始化主键ID
     */
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var id = data.result;
                $("#ids").val(id);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /*初始化进行页面的展示*/
    function listPaperList() {
        var ubody = "/ojt/hrOjtExamPapers/queryPageListByCondition";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridRule_social = jQuery("#listPaperList").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                data: JSON.stringify({deptId:deptId}),
                mtype: "POST",
                contentType: "application/json",
                datatype: "json",
                jsonReader: {
                    //root: "result",
                    repeatitems: false
                },
                rownumbers: true,
                multiselect: true,
                multiboxonly: true,
                autowidth:true,
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', label: '序号', align: "center", hidden: true},
                    {name: 'name', label: '试卷名称', align: "center"},
                    {name: 'totalScore', label: '分值', align: "center"},
                    {name: 'passScore', label: '通过分数', align: "center"},
                    {name: 'duration', label: '考试时长', align: "center"},
                    {name: 'status', label: '试卷状态', align: "center", formatter: codeFmatter},
                    {name: 'remark', label: '试卷说明', align: "center"}
                ],
                rowNum: 20,//一页显示多少条 -1全部
                rowList: [20, 50, 100,200],//可供用户选择一页显示多少条
                pager: "#pager2",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
                /*sortname: 'id',//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc*/
                loadError: function (xhr, status, error) {
                    pop_tip_open("red", "初始化人员列表请求失败");
                },
                /*viewrecords: true,*/
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                ondblClickRow:function () {
                    //跳转编辑页
                    var rowId = $('#listPaperList').jqGrid("getGridParam", "selrow");
                    rowData = $('#listPaperList').jqGrid('getRowData', rowId);
                    window.open("ojt_paper_add2.html?type=update&testId=" + rowData.id);
                }
                /*loadComplete: function (xhr) {
                    $("#listPaperList").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'scroll' });
                }*/

            });

        //
        //'420px';'380px'
        /*$(".col-md-12 .tableStyle #gbox_listPaperList")[0].style.height='420px';
        $(".ui-jqgrid-bdiv")[0].style.height='380px';*/
        /*$(".col-md-12 .tableStyle #gbox_listPaperList")[0].style.height=($('.mytable').height()-67)+'px';
        $(".ui-jqgrid-bdiv")[0].style.height=($('.mytable').height()-107)+'px';*/
        var winH = window.innerHeight;//637
        $("#userDiv #gview_listPaperList .ui-jqgrid-bdiv").css('height',($('.mytable').height()-67)+'px')
    }

    /*window.changeSta = function (cellvalue, options, rowObject) {
        if (cellvalue == "1") {
            return "有效";
        }else if(cellvalue == "0") {
            return "已失效";{
        }else if(cellvalue == "2"){
            return "未生效";
        }
    }*/
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

    $('.btn').click(function (e) {
        e.preventDefault();
    });
    $("#deleteRecord").on("click", function () {
        pop_text_open("blue", '是否确定删除？', function () {
            if (paperTypeId && paperTypeId != "") {
                /*删除试题*/
                delPaperType(paperTypeId);
            } else {
                $.xljUtils.tip("blue", "请选择要删除的类型！");
            }
        }, function () {
        });
    });
    function delPaperType(paperTypeId) {
        $.ajax({
            type: "POST",
            url: hostUrl + "/ojt/hrOjtExamPapers/queryListByCondition",
            data: JSON.stringify({"paperTypeId": paperTypeId}),
            dataType: "JSON",
            contentType: "application/json",
            success: function (data) {
                // pop_tip_open("blue","新增成功！");
                var result = data.result;
                if (result.length > 0) {
                    $.xljUtils.tip("red", "该试卷分类下还有试卷，无法删除！");
                    return;
                }
                $.ajax({
                    url: baseUrl + "ojt/hrOjtPaperType/delete/" + paperTypeId,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                window.location.reload();
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

    $("#dele").on("click", function () {
        var selectedRowIds = $("#listPaperList").jqGrid('getGridParam', 'selarrrow');
        //pop_text_open("blue", '确定要删除这一条数据吗？', function () {
            $.xljUtils.confirm("blue", "确认要删除这【" + selectedRowIds.length + "】条数据吗？", function () {
            if (selectedRowIds && selectedRowIds != "") {
                /*删除试题*/
                del(selectedRowIds);
                /*if (selectedRowIds.length == 1) {
                    /!*删除试题*!/
                    del(selectedRowIds);
                } else {
                    $.xljUtils.tip("blue", "同时只能删除一条数据！");
                }*/
            } else {
                $.xljUtils.tip("blue", "请选择要删除的试题！");
            }
        }, function () {
        });
    });

    /**
     * 删除
     */
    function del(selectedRowIds) {
        var rowDat = new Array();
        for (var i=0;i<selectedRowIds.length;i++){
            var rowData = $('#listPaperList').jqGrid('getRowData', selectedRowIds[i]);
            var map = {"name":rowData.name,"id":rowData.id};
            rowDat.push(map);
        }
        var dto = {rowDat: rowDat};
        $.ajax({
            url: baseUrl + "ojt/hrOjtExamPapers/deletePseudo/" + JSON.stringify(rowDat),
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(dto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        //$.xljUtils.tip("green", "数据删除成功！");
                        $.xljUtils.tip("green", xhr.msg);
                        var w = $.hrUtils.focusNode(selectedRowIds);//聚焦checked
                        $('#listPaperList').jqGrid("setGridParam", {
                            gridComplete:function(){
                                if(w != null && w != ""){
                                    $("#listPaperList").setSelection(w);
                                }
                                w = "";
                            }
                        }).trigger("reloadGrid");
                        //$("#listPaperList").jqGrid().trigger("reloadGrid");
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

    function paperPreview() {
        window.open('ojt_paper_preview.html');
        //window.open('ojt_paper_preview.html?paperId=' + testId);
    }
    $("#examButt").on('click',function () {
        var corname = $("#corname").val();
        var obj = new Object();
        obj.name=corname;
        obj.deptId=deptId;
        $("#listPaperList").jqGrid('setGridParam',{datatype:'json',postData:obj}).trigger('reloadGrid');
    });
    $("#openNewWindow").on('click', function () {
        window.open("ojt_paper_add2_add.html?type=add&paperTypeId="+paperTypeId);
    });
    window.reloadPaperList = function (id) {
        $('#listPaperList').jqGrid("setGridParam", {
            gridComplete:function(){
                if(id != null && id != ""){
                    $("#listPaperList").setSelection(id);
                }
            }
        }).trigger("reloadGrid");
    }
    /**
     *  修改试卷类别
     */
    $("#updatePpaerType").on('click',function () {
        var selectType = $("#treeDemo_1_ul").find("a.curSelectedNode");
        var updateId = $(selectType).children("span").eq(1).attr("name")
        if (updateId == undefined){
            $.xljUtils.tip("blue", "请选择要修改的试卷类别！");
            return;
        }
        window.open("ojt_paper_type_add.html?type=update&typeId="+updateId);
    });
    /*修改数据*/
    $("#toUpdate").on('click', function () {
        var idsVal = $('#listPaperList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#listPaperList').jqGrid("getGridParam", "selrow");
                rowData = $('#listPaperList').jqGrid('getRowData', rowId);
                window.open("ojt_paper_add2.html?type=update&testId=" + rowData.id);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    });

    window.clickTreeNode = function (e) {
        $("#treeDemo_1").find("a").removeClass("curSelectedNode");
        $(e).addClass("curSelectedNode");
        paperTypeId = $(e).children("span:last").attr("name");
        //alert(paperTypeId);
        if (e.className.indexOf("level0") != -1) {
            paperTypeId = '';
        }
        //或刷新连带表格
        var queryDataPost = {
            "paperTypeId": paperTypeId,
            deptId:deptId
        };
        $('#listPaperList').jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
    }


    /**
     *  获取当前登录用户的deptId
     */
    function initPersonDeptId() {
        var personInfoDto = $.hrUtils.getHREmpInfo()
        if (personInfoDto != null && personInfoDto != undefined){
            deptId = personInfoDto.deptId;
        }else {
            // $.xljUtils.tip("red", "未获取到当前登录信息！");
        }
    }

    //初始化页面中的代码项列表(单选框)
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
                        //$("#"+selectId).append("<input type='radio' name='radioStatue' value='"+ item.id +"'/><span style='margin-right: 40px'>"+item.name+"</span>");
                        $("#"+selectId).append("<button class='btn btn-sm' name='validChange' value='"+item.id+"'>"+item.name+"</button>");
                    });
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "代码项初始化失败");
            }
        });
    }
    window.reloadPaperTypeList = function (paperTypeId) {
        focusTypeId = paperTypeId;
    }
    window.reloadTypeList = function () {
        getPaperTree();
    }

    $('.btn').click(function (e) {
        e.preventDefault();
    });

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
//计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px 637  605
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 140) + "px");
        //表示con-table 下的mytable1
        $(".con-table .mytable").height((w_h - 70) + "px");
    }

//计算表格宽度
    function resizeGrid() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 70);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }
    $(function () {
        //initCodeSelect("1015","radioYesOrNo");
        //initCodeSelect("1015","validChange");
        resizeHeight();
        resizeGrid();
        initUuid();
        initPersonDeptId();
        listPaperList();
        getPaperTree();
        /*加载Paper树*/
        setTimeout(function () {
            $.xljUtils.addTreeScroll();
            $.xljUtils.treeResizeFn();
        }, 300);
    });

})(jQuery, window, document);