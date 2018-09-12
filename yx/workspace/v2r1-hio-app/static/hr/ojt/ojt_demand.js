/**
 *Created by xph on 2017/6/30.
*/

(function ($, window, document, undefined) {
//定义全局参数
    var edit_demandId;
    var rowData;
    var rowDataBefore;
    var jqGridPost;
    var postType;//序列树
    var focusId;
    var focusW = false;//聚焦第二页
//手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
//计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 37) + "px");
        //表示con-table 下的mytable1
        $(".con-table .mytable").height((w_h - 100) + "px");
    }

//计算表格宽度
    function resizeGrid() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 70);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }

//上来就执行
    $(function () {
        //初始化高度
        resizeHeight();
        getOrgTree();
        //$(".ztree-box")[0].style.height='900px';
        initCodeSelect("1067","status");
        //初始化加载列表信息
        pageInit();
        //处理日期选择
        initDatetimepicker();
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
        //reloadDemandByIds('86c0ed0aa63b4c74b3904872fd0b564e','e79e4f2a90bb479785ee098c263c074c');
    });
    //清空组织机构
    window.emptyOrg = function () {
        $("#paperBasic").find("input[id='orgId']").val("");
        $("#paperBasic").find("input[id='orgName']").val("");
    }
    /**
     *  获取机构信息
     * @param data
     */
    window.orgCallback = function (data) {
        var orgId = data.id;
        $("#orgId").val(data.id);
        // $("#orgName").val(data.name);
        $("#orgName").val(data.prefixName);
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
    $("#deleteBtn").unbind('click').on('click', function () {
        del();
    });
//编辑
    $("#updateBtn").unbind('click').on('click', function () {
        toUpdate();
    });
    //导出
    $("#exportBtn").unbind('click').on('click', function () {
        exportExcel();
    });
//新增岗位跳转页面
    $("#addBtn").click(function () {
        window.open("ojt_demand_edit.html?type=add");
    });
//查询
    $("#queryBtn").click(function () {
        demandQuery();
    });
    window.reloadDemandList = function (id) {
        focusId = id;
        $('#demandList').jqGrid("setGridParam", {
            gridComplete:function(){
                if(id != null && id != ""){
                    $("#demandList").setSelection(id);
                }
            }
        }).trigger("reloadGrid");
    }
    /**
     * 加载demand列表
     */
    function pageInit() {
        jqGridPost = jQuery("#demandList").jqGrid(
            {
                url: hostUrl + 'ojt/hrOjtDemand/queryListByCondition',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                //postData: {"status": '1', "name": '', "type": ''},
                postData: {"delfalg": '0'},
                autowidth: true,
                colNames: ['id', 'applyId','需求名称', '类型', '举办机构', '负责人', '培训目标',
                        '培训内容', '培训对象','审批状态','申请单编码','申请日期', '开始时间', "结束时间"],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'applyId', index: 'applyId', editable: true, sortable: false, hidden: true},
                    {name: 'name', index: 'name', editable: true, sortable: true, align: 'center'},
                    {
                        name: 'type',
                        index: 'type',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter:setTypeFmatter},
                    {
                        name: 'orgId',
                        index: 'orgId',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: orgIdFmatter},
                    {name: 'chargeName', index: 'chargeName', editable: true, sortable: false, align: 'center'},
                    {name: 'trainAim', index: 'trainAim', editable: true, sortable: false, align: 'center'},
                    {name: 'trainContent', index: 'trainContent', editable: true, sortable: false, align: 'center'},
                    {name: 'trainStudent', index: 'trainStudent', editable: true, sortable: false, align: 'center'},
                    {name: 'status', index: 'status', editable: false, sortable: false, align: 'center',formatter:codeFmatter},
                    {name: 'code', index: 'code', editable: false, sortable: false, align: 'center'},
                    {name: 'applyDate', index: 'applyDate', editable: false, sortable: false, align: 'center',formatter:"date",formatoptions:{newformat:'Y-m-d'}},
                    {name: 'stratDate', index: 'stratDate', editable: true, sortable: false, align: 'center',formatter:"date",formatoptions:{newformat:'Y-m-d'}},
                    {name: 'endDate', index: 'endDate', editable: true, sortable: false, align: 'center',formatter:"date",formatoptions:{newformat:'Y-m-d'}},
                ],
                // columns:[],
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                sortname: 'demand.create_date',//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                jsonReader: {
                    //root: "result",
                    repeatitems: false
                },
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#demandList ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#demandList').jqGrid("getGridParam", "selrow");
                    rowData = $('#demandList').jqGrid('getRowData', rowId);
                },

                ondblClickRow: function () {
                    //跳转编辑页
                    var rowId = $('#demandList').jqGrid("getGridParam", "selrow");
                    rowData = $('#demandList').jqGrid('getRowData', rowId);
                    edit_demandId = rowData.id;
                    window.open("ojt_demand_edit.html?type=update&demandId=" + edit_demandId + "&applyId=" + rowData.applyId);
                    //+"&name="+encodeURI(rowData.name,"UTF-8")
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#demandList').setSelection(rowDataBefore.id, true);
                        $('#demandList ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                    if (focusW == null && focusW != undefined) {
                        $("#demandList tr").last().find(":input[role='checkbox']").prop('checked', true);
                        $("#demandList tr").last().find(":input[role='checkbox']").trigger("click");
                    }
                    if(focusId != null && focusId != ""){
                        $("#demandList").setSelection(focusId);
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
     *  申请状态
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    function codeFmatter(cellvalue, options, rowObject) {
        if(options.gid=="demandList"){
            return $.hrUtils.getHRCodeNameById(cellvalue);
        }
    }
    /**
     * 类别
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    function setTypeFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "1") {
            return "外部";
        } else if (cellvalue == "0") {
            return "内部";
        }
    }

    /**
     * 根据机构id获取机构信息，数据格式化
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {String}
     */
    function orgIdFmatter(cellvalue, options, rowObject) {
        var orgDto = $.hrUtils.getOrgById(cellvalue);
        if(orgDto == undefined){
            return cellvalue;
        }else{
            return orgDto.prefixName;
        }
    }

    /**
     * 打开编辑页面
     * @param
     */
    function toUpdate() {
        var idsVal = $('#demandList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#demandList').jqGrid("getGridParam", "selrow");
                rowData = $('#demandList').jqGrid('getRowData', rowId);
//			 	 $.xljUtils.confirm("blue", "进入【" + rowData.name + "】的编辑状态吗？", function(){
//			 		 window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));
//			 	 },true);
                window.open("ojt_demand_edit.html?type=update&demandId=" + rowData.id + "&applyId=" + rowData.applyId);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }
//查询审批记录
    $("#flowBtn").click(function () {
        /*var rowId = $('#demandList').jqGrid("getGridParam", "selrow");
        rowData = $('#demandList').jqGrid('getRowData', rowId);
        var businessId=rowData.applyId;
        window.open("ojt_demand_view.html?businessId=" + businessId);*/
        flowView();
    });
    //查询审批记录
    function flowView() {
        var idsVal = $('#demandList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行查询！");
                return;
            } else {
                var rowId = $('#demandList').jqGrid("getGridParam", "selrow");
                rowData = $('#demandList').jqGrid('getRowData', rowId);
                if (rowData.status == '草稿'){
                    $.xljUtils.tip("blue", "草稿不能查看审批信息！");
                    return;
                }
                var businessId=rowData.applyId;
                toFlowView(businessId,FLCODE_EXAMPAPER);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要查询的数据！");
        }
    }
    /*//聚焦节点
    function focusNode(idsVal) {
        var le = idsVal.length;
        //$("#60f66e3500714a7eb5ff36f826cf22ba .jqgrid-rownum").text();
        //对list进行排序
        var vList = new Array();
        for(var i=0;i<le;i++){
            vList.push({rowNum:$("#"+idsVal[i]+" .jqgrid-rownum").text(),id:idsVal[i]});
        }
        vList.sort(function (a,b) {
            return a.rowNum - b.rowNum;
        });
        //alert(JSON.stringify(vList));return;
        var v = new Array();
        var v2 = new Array();
        for(var i=0;i<vList.length;i++){
            v.push(vList[i].id);
            v2.push(vList[i].rowNum);
        }
        /!*alert(v+"========="+JSON.stringify(vList));
        return;*!/
        var idsVal = v;
        if(le > 1){
            var rowId = idsVal[le-1];//最后一个id
            var rowId2 = idsVal[0];//第一个id
            //alert($("#"+rowId+"").find(":input[role='checkbox']").is(":checked"));
            if($("#"+rowId+" + tr").prev().text() == ''){
                for(var i = le-1;i>=0;i--){
                    if(i > 0){
                        if(v2[i] != parseInt(v2[i-1])+parseInt(1)){
                            $("#"+idsVal[i]+"").prev().find(":input[role='checkbox']").prop('checked',true);
                            $("#"+idsVal[i]+"").prev().find(":input[role='checkbox']").trigger("click");
                            return;
                        }
                    }else{
                        //表示最后一条数据，聚焦到上一个节点
                        $("#"+rowId2+"").prev().find(":input[role='checkbox']").prop('checked',true);
                        $("#"+rowId2+"").prev().find(":input[role='checkbox']").trigger("click");
                    }
                }
            }else {
                $("#"+rowId+" + tr").find(":input[role='checkbox']").prop('checked',true);
                $("#"+rowId+" + tr").find(":input[role='checkbox']").trigger("click");
            }
        }else {
            var rowId = idsVal[0];
            if($("#"+rowId+" + tr").prev().text() == ''){
                //表示最后一条数据，聚焦到上一个节点
                $("#"+rowId+"").prev().find(":input[role='checkbox']").prop('checked',true);
                $("#"+rowId+"").prev().find(":input[role='checkbox']").trigger("click");
            }else {
                $("#"+rowId+" + tr :input[role='checkbox']").prop('checked',true);
                $("#"+rowId+" + tr :input[role='checkbox']").trigger("click");
            }
        }
    }*/

    /**
     * 删除demo
     */
    function del() {
        var idsVal = $('#demandList').jqGrid('getGridParam', 'selarrrow');
        /*$.hrUtils.focusNode(idsVal);return;*/
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确定要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    //url: baseUrl + "/org/post/deleteBatch/" + idsVal,
                    url: baseUrl + "/ojt/hrOjtDemand/deletePseudoBatch/" + idsVal,
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
                                focusW = w;
                                if (w == null) {
                                    // var ubody = "kq/hrKqBussTrip/queryApplyList";
                                    // var uall = hostUrl + ubody;
                                    var queryData = {
                                        //uall: uall,
                                        datatype: 'json',
                                        page: 1
                                    };
                                    $('#demandList').jqGrid("setGridParam", queryData).trigger("reloadGrid");
                                    return;
                                }
                                $('#demandList').jqGrid("setGridParam",{
                                    gridComplete : function (){
                                        if(w != null && w != ""){
                                            $("#demandList").setSelection(w);
                                        }
                                        w="";
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
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }

    window.treeClick = function () {
        var nodes = zTreeObj.getSelectedNodes();
        var edit_orgId = nodes[0].id;
        //或刷新连带表格
        var queryDataPost = {
            "orgId": edit_orgId=="1"?"":edit_orgId
        };
        $('#demandList').jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
    }


//初始化日期控件
    function initDatetimepicker() {
        //年月日
        var picker = $('.datetimepicker').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });

        //时分
        $('.datetimepicker3').datetimepicker({
            language: 'en',
            format: 'hh:ii',
            startView: 1,
            autoclose: true
        });

        //只选择年月
        $('.datetimepickerM').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN'
        });

        //只选择年
        $('.datetimepickerY').datetimepicker({
            format: 'yyyymm',
            weekStart: 1,
            autoclose: true,
            startView: 4,
            minView: 4,
            forceParse: false,
            language: 'zh-CN'
        });
    }

    /**
     * 刷新grid
     */
    window.reload = function () {
        $('#demandList').jqGrid().trigger("reloadGrid");
    }

    /**
     * 刷新grid
     */
    window.reloadDemandByIds = function (demandId,orgId) {
        //聚焦左边机构树节点   orgId  机构ID
        var zTreeObj = $.fn.zTree.getZTreeObj("treeDemo");
        //获取当前节点
        var zNodes = zTreeObj.getNodesByParam('id', orgId);
        if (zNodes.length > 0) {
            var znode = zNodes[0];
            zTreeObj.selectNode(znode);
        }
        $('#demandList').jqGrid("setGridParam", {
            postData: {"orgId": orgId},
            gridComplete:function(){
                if(demandId != null && demandId != ""){
                    $("#demandList").setSelection(demandId);
                }
            }
        }).trigger("reloadGrid");
    }
//格式化时间
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    window.searchDemand = function() {
        var status = $("#status").val();/*审批状态*/
        var orgId = $("#orgId").val();/*所属机构id*/
        var orgName = $("#orgName").val();/*所属机构名称*/
        var type = $("#type").val();/*培训方式*/
        var applyDate = $("#applyDate").val();/*申请日期*/
        var name = $("#name").val();/*姓名*/
        var applyCoding = $("#applyCoding").val();/*申请单编码*/
        var obj = new Object();
        obj.orgId=orgId;
        obj.orgName=orgName;
        if(type != 2){
            obj.type=type;
        }else{
            obj.type='';
        }
        if(status != 0){
            obj.status=status;
        }else{
            obj.status='';
        }
        obj.applyDate=applyDate;
        obj.name=name;
        obj.applyCoding=applyCoding;
        //obj = JSON.stringify(obj);
        $("#demandList").jqGrid('setGridParam',{datatype:'json',postData:obj}).trigger('reloadGrid');
    }
    $("#type").on('change',function () {
        searchDemand();
    });
    $("#status").on('change',function () {
        searchDemand();
    });
    /*审批条件查询*/
    $("#searchBtn").on('click',function () {
        searchDemand();
    });
    /*控制审批查询html的显隐*/
    var q = false;
    $("#upDownBtn").on('click',function () {
        if(!q){
            $('.expand-search').css({"height":"80px"});
            $("#upDownBtn i").attr("class","fa fa-angle-up");
            q = true;
        }else {
            $('.expand-search').css({"height":"36px"});
            $("#upDownBtn i").attr("class","fa fa-angle-down");
            q = false;
        }
    });
    /*$('.btn-adv').click(function () {
        expandedSearch();
    });
    function expandedSearch() {
        var s_Area = $('.expand-search');
        var s_btn = $('.btn-adv > i');
        if(s_Area.height() == 36) {
            s_Area.css({"height":"114px"});
            s_btn.removeClass('fa-angle-down').addClass('fa-angle-up');
        }else{
            s_Area.css({"height":"36px","overflow":"hidden"});
            s_btn.removeClass('fa-angle-up').addClass('fa-angle-down');
        }
    }*/




    /**
     *  导出Excel
     */
    function exportExcel() {
        //表格数据
        rowData = $('#demandList').jqGrid('getRowData');
        for(var i = 0; i < rowData.length; i++){
            rowData[i].stratDate = new Date(rowData[i].stratDate.replace(/-/g, '/')).getTime();
            rowData[i].endDate = new Date(rowData[i].endDate.replace(/-/g, '/')).getTime();
            rowData[i].applyDate = new Date(rowData[i].applyDate.replace(/-/g, '/')).getTime();
        }
        var urlBody = "ojt/hrOjtDemand/exportInfo";
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
})
(jQuery, window, document);