/**
 * ruanxin
 * 薪资计算js
 */
var accountId;//选中的薪资账套ID
var payPeriodId;//发薪期间ID
var applyId;//申请审批单Id
var payPeriodStatus;//发薪期间状态，确定操作状态：0 草稿、1：审批中  2：完成
;
(function ($, window, document, undefined) {
    //定义全局参数
    var rowData;    //行数据
    var payPeriod;//发薪期间
    var sizeApplyDto;//申请审批单对象
    var showModel = [];//展示的具体内容
    var calculateDate = [];//计算相关的所有具体值
    var jqgridCalculate;//计算列表
    var lastrow = 0;//可编辑状态下记录单元格的行号 编辑iRow行号
    var lastcell = 1;//可编辑状态下记录单元格的列号
    var lastVaule;//编辑前获取单元格内容
    var isShowData = [];//显示的所有具体数据。方便进行更改显示顺序
    var isShowItemId;//选中是否显示的薪资项ID

    var fsalary ;//账套的实发金额
    var isOrNot = false;//是否需要审批
    var flag="0";//单元格校验是否通过标志
    var formualCalculateData = [];//所有公式计算项：进行公式计算方式设置

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //表示con-table 下的mytable1
        $(".tableStyle").height((w_h - 120) + "px");
    }

    //计算表格宽度
    function resizeGrid() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.tableStyle').height() - 120);
        //$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.tableStyle').width()-10, true);
        $.xljUtils.gridResizeFn();
    }

    //薪资计算:初始化  姓名、账号、所属机构、入职时间、离职时间、员工状态、所有薪资项目。
    window.initSalaryCalculate = function () {
        showModel = [];//所有信息
        //需要展示的所有记录
        showModel.push({name: 'id', label: 'id', editable: true, hidden: true, key: true});
        showModel.push({name: 'personId', label: 'personId', editable: true, hidden: true});
        showModel.push({name: 'personName', label: '姓名', editable: false, sortable: false, align: 'center',width:120});
        showModel.push({name: 'erpAccount', label: '账号', editable: false, sortable: false, align: 'center',width:120});
        showModel.push({name: 'prefixName', label: '所属机构', editable: false, sortable: false, align: 'center',width:220});
        showModel.push({name: 'deptName', label: '入职时间', editable: false, sortable: false, align: 'center',width:200});
        showModel.push({name: 'postName', label: '离职时间', editable: false, sortable: false, align: 'center',width:160});
        showModel.push({name: 'personStatus', label: '员工状态', editable: false, sortable: false, align: 'center',width:160});
        showModel.push({name: 'type', label: '计算前标志', editable: false, sortable: false, align: 'center',width:160});
        showModel.push({name: 'ffsalary', label: '实发工资', editable: false, sortable: false, align: 'center',width:160});
        jqgridCalculate = jQuery("#salaryCalculateList").jqGrid({
            datatype: "json",
            multiboxonly: true,//只能通过复选框进行多选
            autowidth: true,
            height: $(window).height() - 185,
            footerrow: true,//分页上添加一行，用于显示统计信息
            colModel:showModel,//动态表格
            rowNum: -1
        });
    };


/*
        $.ajax({
            // url: serviceUrl + 'wage/wagePayHistory/queryFileListByCalculate',//创建完成之后请求数据的url
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify({payPeriodId: payPeriodId}),
            success: function(resultData) {
                var data = resultData.result;//所有具体的值信息
                showModel = [];//所有信息
                var tempShowField = data.showField;//查询出来的除默认展示字段外的其他需要展示字段
                fsalary = data.fsalary;//此账套期间的全部人员实发金额
                //需要展示的所有记录
                showModel.push({name: 'id', label: 'id', editable: true, hidden: true, key: true,frozen:true});
                showModel.push({name: 'personId', label: 'personId', editable: true, hidden: true,frozen:true});
                showModel.push({name: 'personName', label: '姓名', editable: false, sortable: false, align: 'center',width:120,frozen:true});
                showModel.push({name: 'personCode', label: '人员编号', editable: false, sortable: false, align: 'center',width:120,frozen:true});
                showModel.push({name: 'orgName', label: '机构', editable: false, sortable: false, align: 'center',width:220,frozen:true, hidden: true});
                showModel.push({name: 'prefixName', label: '机构', editable: false, sortable: false, align: 'center',width:220,frozen:true});
                showModel.push({name: 'deptName', label: '部门', editable: false, sortable: false, align: 'center',width:200,frozen:true});
                showModel.push({name: 'postName', label: '岗位', editable: false, sortable: false, align: 'center',width:160,frozen:true});
                var shrinkToFit=0;//标志列表是否按指定宽度
                if (tempShowField != null && tempShowField != '' && tempShowField.length > 0) {
                    for (var i in tempShowField) {
                        //将隐藏字段进行隐藏
                        if (tempShowField[i].visible == '1009100037') {
                            var temp = {
                                name: tempShowField[i].columnName,
                                label: tempShowField[i].name,
                                align: 'center',
                                sortable: false,
                                hidden: true
                            };
                            showModel.push(temp);
                        } else {
                            //当发薪期间状态为草稿时，单元格才是可编辑
                            if (payPeriodStatus == '0' || payPeriodStatus == 0) {
                                //如果数据来源为手工输入、公式计算、考勤，则支持手动修改金额
                                if (tempShowField[i].accountItemSource == '0' || tempShowField[i].accountItemSource == '1' || tempShowField[i].accountItemSource == '6') {
                                    var temp = {
                                        name: tempShowField[i].columnName,
                                        label: tempShowField[i].name,
                                        align: 'center',
                                        sortable: false,
                                        editable: true
                                    };
                                    showModel.push(temp);
                                }
                                else {
                                    var temp = {
                                        name: tempShowField[i].columnName,
                                        label: tempShowField[i].name,
                                        align: 'center',
                                        sortable: false
                                    };
                                    showModel.push(temp);
                                }
                            }
                            //其他为不能编辑
                            else {
                                var temp = {
                                    name: tempShowField[i].columnName,
                                    label: tempShowField[i].name,
                                    align: 'center',
                                    sortable: false
                                };
                                showModel.push(temp);
                            }
                            shrinkToFit++;
                        }
                    }
                }
                jqgridCalculate = jQuery("#salaryCalculateList").jqGrid({
                    url: serviceUrl + 'wage/wagePayHistory/queryValueListByCalculate',//创建完成之后请求数据的url
                    ajaxGridOptions: {contentType: 'application/json'},
                    mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                    contentType: "application/json",
                    postData: {"payPeriodId": payPeriodId},
                    datatype: "json",
                    multiboxonly: true,//只能通过复选框进行多选
                    autowidth: true,
                    height: $(window).height() - 175,
                    shrinkToFit:shrinkToFit>6?false:true,
                    footerrow: true,//分页上添加一行，用于显示统计信息
                    // shrinkToFit:false,
                    rownumbers: true,
                    multiselect: true,
                    jsonReader: {
                        // root:"result"
                        repeatitems: false
                    },
                    colModel:showModel,//动态表格
                    rowNum: 20,//一页显示多少条 -1全部
                    rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                    pager: "#pager",//表格页脚的占位符(一般是div)的id
                    viewrecords: true, //定义是否要显示总记录数
                    cellEdit: true,//是否开启单元格的编辑功能
                    cellsubmit : "clientArray",//修改内容后用getChangedCells获取
                    gridComplete: function () { //滚动条
                        var tempFsalary = 0 ;
                        if(fsalary!=null&&fsalary!='') {
                            tempFsalary = fsalary ;
                        }
                        fsalary = parseFloat(tempFsalary);
                        //增加合计行功能
                        var sum_fsalary=$("#salaryCalculateList").getCol('fsalary',false,'sum');//此页面的实发金额合计
                        if(sum_fsalary!=null) {
                            sum_fsalary = sum_fsalary.toFixed(3); //进行四色五入
                        }
                        $("#salaryCalculateList").footerData('set', { "personName": '本页实发金额合计', prefixName: sum_fsalary,"deptName": '所有实发金额合计', postName:fsalary});
                        //resizeGrid();
                        $. xljUtils.addGridScroll();
                        //$. xljUtils.gridResizeFn();
                    },

                    beforeSaveCell: function (rowid, cellname, value, iRow, iCol) {//在验证输入数据（如果存在）之前触发
                        if (!$.isNumeric(value)) {
                            pop_tip_open("blue", "请输入有效数字！");
                            flag="1";
                            return lastVaule;
                        }
                        var value1=value.split(".");
                        for(var i in tempShowField) {
                            if(tempShowField[i].columnName==cellname){
                                //数据类型为小数
                                if(tempShowField[i].dataType=="2"){
                                    var valueLength;
                                    if(value1.length==1){
                                        valueLength=value1[0].length;
                                    }else if(value1.length==2) {
                                        if(value1[0]=="0"){
                                            valueLength=value1[1].length;
                                        }else{
                                            valueLength=value1[0].length+value1[1].length;
                                        }
                                    }
                                    if(valueLength>6){
                                        pop_tip_open("blue", "输入的数字长度不能大于6！");
                                        flag="1";
                                        return lastVaule;
                                    }
                                }
                                //数据类型为金钱类型
                                if(tempShowField[i].dataType=="8"){
                                    var length=parseInt(tempShowField[i].itemLength)-parseInt(tempShowField[i].itemPerce);
                                    if(value1.length==1){
                                        if(value1[0].length>length){
                                            pop_tip_open("blue", "输入的数字整数位长度不能大于"+length+"！");
                                            flag="1";
                                            return lastVaule;
                                        }
                                    }else if(value1.length==2) {
                                        if(value1[0].length>length){
                                            pop_tip_open("blue", "输入的数字整数位长度不能大于"+length+"！");
                                            flag="1";
                                            return lastVaule;
                                        }
                                        if(value1[1].length>tempShowField[i].itemPerce){
                                            pop_tip_open("blue", "输入的数字小数位长度不能大于"+tempShowField[i].itemPerce+"！");
                                            flag="1";
                                            return lastVaule;
                                        }
                                    }
                                }
                                //字符和整数类型不能输入小数
                                if(tempShowField[i].dataType=="1"||tempShowField[i].dataType=="3"){
                                    if(value1[1]!=null&&value1[1].length>0){
                                        pop_tip_open("blue", "输入的不能包含小数!");
                                        flag="1";
                                        return lastVaule;
                                    }
                                }
                            }
                        }

                        //当发薪期间状态为草稿时，数据库才会保存相对应值
                        if (payPeriodStatus == '0' || payPeriodStatus == 0) {
                            //保存数据
                            var updateId = $("#salaryCalculateList").getCell(rowid,"id");
                            var ColumnName = cellname;
                            var tempValue = value;
                            $.ajax({
                                type: "POST",
                                url: serviceUrl + "wage/wagePayHistory/updateSalaryItemValue",
                                data: JSON.stringify({accountId: accountId,payPeriodId: payPeriodId,updateId: updateId,updateName:ColumnName,value:tempValue}),
                                dataType: "JSON",
                                async: false,
                                contentType: "application/json",
                                success: function (data) {
                                    if (!data.success) {
                                        pop_tip_open("blue", "数据修改失败！");
                                        flag="1";
                                        return calculateDate[iRow-1][cellname];
                                    }
                                },
                                error:function () {
                                    pop_tip_open("red", "数据修改失败！");
                                    flag="1";
                                    return calculateDate[iRow-1][cellname];
                                }
                            });
                        }
                    },
                    beforeEditCell:function(rowid,cellname,v,iRow,iCol){ //方便使用getRowData方法，可编辑表格状态下，获取具体内容，而不是html
                        lastrow = iRow;//单元格所在行的行号（注意不要和rowid搞混），iRow从1开始
                        lastcell = iCol;//单元格处于行中的列号，iCol从0开始
                        lastVaule = v;//记录编辑前的单元格内容
                    },
                    loadComplete:function () {
                        $('.ui-jqgrid-bdiv').scrollTop(0);
                        //表格加载完成设置表格高度
                    }

                });

                jQuery("#salaryCalculateList").jqGrid('setFrozenColumns');
            }
        });
    };
 */

    //批量修改:初始化为输入项的可以进行批量修改
    window.initBatchUpdateSelect = function () {

        $("#batchUpdateSalaryItem").empty();//清空选项
        $("#batchUpdateSalaryItem").append('<option>请选择项目</option>');
        var dto = {accountId: accountId, salaryItemSource: "0"};
        $.ajax({
            type: "POST",
            url: serviceUrl + "wage/wageAccountSalaryItem/queryListByAccountId",
            data: JSON.stringify(dto),
            dataType: "JSON",
            async: false,
            contentType: "application/json",
            success: function (data) {
                if (data != null && data.result != null) {
                    for (var i = 0; i < data.result.length; i++) {
                        $("#batchUpdateSalaryItem").append(
                            ' <option value="' + data.result[i].itemCode + '">' + data.result[i].itemName + '</option>')
                    }
                }
            }
        });
    };

    //显示设置:初始化
    window.initIsShow = function () {
        $("#isShowTable").empty();//清空选项
        $("#isShowTable").append('<tr align=center><td class=td_lable align="center">显示名称</td><td class=td_lable align="center">是否显示</td></tr>');
        var dto = {accountId: accountId};
        $.ajax({
            type: "POST",
            url: serviceUrl + "wage/wageAccountSalaryItem/queryListByAccountId",
            data: JSON.stringify(dto),
            dataType: "JSON",
            async: false,
            contentType: "application/json",
            success: function (data) {
                if (data != null && data.result != null) {
                    isShowData = [];//初始化选项
                    for (var i = 0; i < data.result.length; i++) {
                        isShowData.push(data.result[i]);//记录原始值
                        if (data.result[i].visible == '1009100036') { //显示
                            $("#isShowTable").append(
                                '<tr  align="center"  onclick="toAlertMes(\'' + data.result[i].id + '\')">' +
                                '<td class=td_lable>' + data.result[i].itemName + '</td>' +
                                '<td><input id="' + data.result[i].id + '" type="checkbox" name="isShow" checked="checked" onchange="updateIsShow(\'' + data.result[i].id + '\',' + i + ')"></td>');
                            // '    <td><input type="checkbox" id="' + data.result[i].id + '" checked="checked" onchange="updateIsShow(this,'+i+')"></td>');
                        }
                        else { //不显示
                            $("#isShowTable").append(
                                '<tr  align="center" onclick="toAlertMes(\'' + data.result[i].id + '\')">' +
                                '    <td class=td_lable>' + data.result[i].itemName + '</td>' +
                                '<td><input id="' + data.result[i].id + '" type="checkbox" name="isShow" onchange="updateIsShow(\'' + data.result[i].id + '\',' + i + ')"></td>');
                        }

                    }
                }
            }

        });
    };

    //是否显示:切换背景色
    window.toAlertMes = function (id) {
        $("tr").css("background-color", "");
        var tempId = '#' + id;
        var data_tr = $(tempId).parents('tr'); //获取到触发的tr
        data_tr.css("background-color", "#46A7FF");
        isShowItemId = id;
    };

    //是否显示:更改显示状态
    window.updateIsShow = function (id,index) {
        if ($("#" + id).prop("checked")) {
            isShowData[index].visible = '1009100036';
        }
        else {
            isShowData[index].visible = '1009100037';
        }
    };

    //是否显示：批量操作：全选、全不选
    window.updateIsShowByCheckAll = function (tempFlag) {
        //全选
        if(tempFlag=='checkAll') {
            if(isShowData!=null&&isShowData.length>0) {
                $("input[name='isShow']").each(function(){
                    $(this).prop("checked",true);
                });
                for(var i=0 ;i<isShowData.length;i++) {
                    isShowData[i].visible = '1009100036';
                }
            }
        }
        //全不选
        else {
            if(isShowData!=null&&isShowData.length>0) {
                $("input[name='isShow']").each(function(){
                    $(this).prop("checked",false);
                });
                for(var i=0 ;i<isShowData.length;i++) {
                    isShowData[i].visible = '1009100037';
                }
            }
        }
    };

    //是否显示:更改显示顺序
    window.changeShowOrder = function (oper) {
        if (isShowItemId == null || isShowItemId == '') {
            pop_tip_open("blue", "请选中需要更改显示顺序的薪资项!");
            return false;
        }
        var tempId = '#' + isShowItemId;
        var data_tr = $(tempId).parents('tr'); //获取到触发的tr

        if (oper == "MoveUp") {    //向上移动
            if ($(data_tr).prev().html() == null) { //获取tr的前一个相同等级的元素是否为空
                pop_tip_open("blue", "已经是最顶部了!");
                return false;
            } else {
                //手动排除第一行
                var temp = $(data_tr).prev().text();
                var fdStart = temp.indexOf("显示名称");
                if (fdStart == 0) {
                    pop_tip_open("blue", "已经是最顶部了!");
                    return false;
                } else if (fdStart == -1) {
                    $(data_tr).insertBefore($(data_tr).prev()); //将本身插入到目标tr的前面
                }
            }
        }
        else if (oper == "MoveDown") { //向下移动
            if ($(data_tr).next().html() == null) {
                pop_tip_open("blue", "已经是最低部了!");
                return;
            } else {
                $(data_tr).insertAfter($(data_tr).next()); //将本身插入到目标tr的后面
            }
        }
        else if (oper == "top") { //置顶
            if ($(data_tr).prev().html() == null) { //获取tr的前一个相同等级的元素是否为空
                pop_tip_open("blue", "已经是最顶部了!");
                return false;
            }
            else {
                //手动排除第一行
                var temp = $(data_tr).prev().text();
                var fdStart = temp.indexOf("显示名称");
                if (fdStart == 0) {
                    pop_tip_open("blue", "已经是最顶部了!");
                    return false;
                } else if (fdStart == -1) {
                    $("#isShowTable").prepend($(data_tr));//将本身插入到表格最前
                    $(data_tr).insertAfter($(data_tr).next()); //将本身插入到目标tr的后面
                }
            }
        }
        else if (oper == "last") { //置底
            if ($(data_tr).next().html() == null) { //获取tr的前一个相同等级的元素是否为空
                pop_tip_open("blue", "已经是最底部了!");
                return false;
            }
            else {
                $("#isShowTable").append($(data_tr));//将本身插入到表格最前
            }
        }
        //$("#isShowTable tr:eq(0) td:eq(0)").trigger('click');
        $("#isShowTable tr:eq(1) td:eq(0)").find("input").trigger('click');
    };

    //是否显示:保存
    window.saveIsShow = function () {
        //获取表的总行数 tr
        var rows = $("#isShowTable").find("tr").length;
        if (rows < 2) {
            pop_tip_open("blue", "没有需要保存更改的显示设置!");
            return false;
        } else {
            //循环遍历表格，确定薪资项的显示顺序
            var saveDtos = [];
            for (var i = 0; i < rows; i++) {
                var temp1 = $("#isShowTable").find("tr").eq(i).text().trim();
                for (var j = 0; j < isShowData.length; j++) {
                    var tempDto = {};
                    var temp2 = isShowData[j].itemName.trim();
                    if (temp1 == temp2) {
                        isShowData[j].sort = i;
                        tempDto.id = isShowData[j].id;
                        tempDto.visible = isShowData[j].visible;
                        tempDto.sort = isShowData[j].sort;
                        saveDtos.push(tempDto);
                        break;
                    }
                }
            }
            if (saveDtos != null && saveDtos.length > 0) {
                $.ajax({
                    type: "POST",
                    url: serviceUrl + "wage/wageAccountSalaryItem/batchUpdateIsShow",
                    dataType: "JSON",
                    data: JSON.stringify({batchUpdateItems: saveDtos}),
                    contentType: "application/json",
                    success: function (xhr) {
                        if (xhr) {
                            if (xhr.success) {
                                pop_tip_open("green", "保存成功！");
                                $('#salaryCalculateList').GridUnload();//卸载garid
                                initSalaryCalculate();
                                $('#showModul').modal('hide');
                            } else {
                                pop_tip_open("blue", xhr.msg);
                            }
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });
            }
        }

    };

    //批量修改：保存（保存至数据库）
    window.saveBatchUpdateByNew = function () {
        var tempColName = $("#batchUpdateSalaryItem").val();
        var tempValue = $("#batchUpdateValue").val();
        if (tempColName == "请选择项目") {
            pop_tip_open("blue", "请选择需要批量修改的薪资项!");
            return false;
        } else if (tempValue == null || tempValue == '') {
            pop_tip_open("blue", "请选择需要批量修改的金额!");
            return false;
        }
        else {
            if (!$.isNumeric(tempValue)) {
                pop_tip_open("blue", "请输入有效数字！");
                return false;
            }
            //如果存在选择人员，则只修改选中人员部分
            var ids=$("#salaryCalculateList").jqGrid('getGridParam','selarrrow');
            if(ids!=null&&ids.length>0) {
                //获取选中的所有人员
                var updateIds = "";
                for(var i=0;i<ids.length;i++) {
                    var tempRowData = $("#salaryCalculateList").jqGrid('getRowData',ids[i]);
                    var tempId = tempRowData.id;
                    updateIds = updateIds + tempId;
                    if(i<ids.length-1) {
                        updateIds = updateIds + ",";
                    }
                }
                //批量保存
                $.ajax({
                    type: "POST",
                    url: serviceUrl + "wage/wagePayHistory/batchUpdateBySalaryItem",
                    data: JSON.stringify({accountId: accountId,payPeriodId: payPeriodId,updateIds: updateIds,updateName:tempColName,value:tempValue}),
                    dataType: "JSON",
                    async: false,
                    contentType: "application/json",
                    success: function (data) {
                        if (!data.success) {
                            pop_tip_open("blue", data.msg);
                        }else {
                            pop_tip_open("green", "批量修改保存成功！");
                            $('#salaryCalculateList').jqGrid().trigger("reloadGrid");
                            // $('#salaryCalculateList').GridUnload();//卸载garid
                            // initSalaryCalculate();
                            $('#batchEditModul').modal('hide');
                        }
                    }
                });
            } else {
                pop_text_open("blue",'未选中需要修改人员，是否修改全部人员？',function(){
                    $.ajax({
                        type: "POST",
                        url: serviceUrl + "wage/wagePayHistory/batchUpdateBySalaryItem",
                        data: JSON.stringify({accountId: accountId,payPeriodId: payPeriodId,updateIds: updateIds,updateName:tempColName,value:tempValue}),
                        dataType: "JSON",
                        async: false,
                        contentType: "application/json",
                        success: function (data) {
                            if (!data.success) {
                                pop_tip_open("blue", data.msg);
                            }else {
                                pop_tip_open("green", "批量修改保存成功！");
                                $('#salaryCalculateList').jqGrid().trigger("reloadGrid");
                                // $('#salaryCalculateList').GridUnload();//卸载garid
                                // initSalaryCalculate();
                                $('#batchEditModul').modal('hide');
                            }
                        }
                    });
                },true);
            }
        }
    };

    //薪资计算:全部人员
    window.salaryCalculateAll = function () {

        pop_tip_open("green", "薪资计算成!");
        return false;


        flag="0";//避免单元格输入错误还能自动进行计算
        $("#salaryCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
        if(flag=="1"){
            flag=="0";
            return;
        }

        var calculateVlaue = [];//为区分计算项是参与计算还是

        var saveDto = {accountId: accountId,payPeriodId:payPeriodId};

        /**
         //以下记录被修改单元格所有的值，暂时未用。修改为单元格值修改后即保存
         //获取修改后的单元格行记录
         var updateDate = $("#salaryCalculateList").getChangedCells('dirty');
         if (updateDate != null && updateDate.length > 0) {
        //根据行号获取记录,  此处获取的只是ID，已经被修改值
        for (var tempData in updateDate) {
            var id = updateDate[tempData].id;
            var thisid = $("#salaryCalculateList").getCell(id, "id");//根据行号，获取ID
            updateDate[tempData].id = thisid;//替换成真是ID，方便后期进行直接保存
            calculateVlaue.push(updateDate[tempData]);
        }
    }
         */
        saveDto.calculateVlaue = calculateVlaue;

        //获取查询得到的总记录数量
        var importValue = [];
        var total = $("#salaryCalculateList").jqGrid('getGridParam', 'records');//获取页面总行数，避免无数据进行计算
        if (total != '' && total != null && total > 0) {
            saveDto.importValue = importValue;//因计算全部人员，不应传人员ID至后台
            $.ajax({
                type: "POST",
                url: serviceUrl + "wage/wagePayHistory/salaryCalculate",
                dataType: "JSON",
                data: JSON.stringify(saveDto),
                contentType: "application/json",
                success: function (data) {
                    if(data.success) {
                        pop_tip_open("green", "薪资计算成功！");
                        //获取此期间的实发金额
                        $.ajax({
                            cache: false,//避免IE缓存
                            type:'get',
                            url:serviceUrl +"/wage/wagePayPeriod/get/"+payPeriodId,
                            success: function(data) {
                                if(data.success) {
                                    var tempFsalary = 0 ;
                                    if(data.result.fsalary!=null&&data.result.fsalary!='') {
                                        tempFsalary = data.result.fsalary ;
                                    }
                                    fsalary = parseFloat(tempFsalary);
                                }
                            }
                        });
                         $('#salaryCalculateList').jqGrid().trigger("reloadGrid");
                        // $('#salaryCalculateList').GridUnload();//卸载garid
                        // initSalaryCalculate();
                    }else {
                        pop_tip_open("blue",data.msg);
                    }

                },
                error:function (data) {
                    pop_tip_open("red", data.msg);
                }
            });
        } else {
            pop_tip_open("blue", "没有需要计算薪资的人员");
        }

    };

    //导出
    window.exportInfo = function () {
        //表格数据
        rowData = $('#salaryCalculateList').jqGrid('getRowData');
        var urlBody = "wage/wagePayHistory/exportInfo";
        var urlAll = serviceUrl + urlBody;
        var nameOrCode = $("#nameOrCodeByCal").val();
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            // data: JSON.stringify({rowData: rowData, accountId: accountId}),
            data: JSON.stringify({payPeriodId: payPeriodId, accountId: accountId,nameOrCode:nameOrCode}),
            async: false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action', serviceUrl + "wage/wagePayHistory/exportInfoClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type', 'hidden');
                        input1.attr('name', "path");
                        input1.attr('value', path);

                        $('body').append(form);  //将表单放置在web中
                        form.append(input1);   //将查询参数控件提交到表单上
                        form.submit();   //表单提交
                        pop_tip_open("green", "导出成功");
                    }
                } else {
                    pop_tip_open("blue", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "导出失败");
            }
        })
    }

    //导入
    window.importInfo = function () {
        // var winObjEI = window.open('wage_salary_calculate_upload.html');
        window.location.href="wage_salary_calculate_upload.html";
    };

    //返回上一级
    window.goBack = function () {
        window.history.go(-1);
    };

    //名称查询  回车查询
    $('#nameOrCodeByCal').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByCal();
        }
    });

    //点击查询按钮进行筛选查询
    window.refreshJqGridDataByCal = function () {
        var nameOrCode = $("#nameOrCodeByCal").val();
        jQuery("#salaryCalculateList").jqGrid("setGridParam", { postData : {payPeriodId:payPeriodId,nameOrCode:nameOrCode}}).trigger("reloadGrid");
    };

    //保存发薪期间申请审批信息
    $("#savaApply").unbind('click').on('click', function () {
        var name = $("#name").val();
        var remark = $("#remark").val();
        if(isOrNot){        //不需要审批
            // pop_tip_open("blue", "此账套不需要审批！");
            updatePayPeriodStatus();//更改状态
        }
        else {//需要审批，走审批流
            if(name==null || name==""){
                pop_tip_open("blue","请填写审核主题！");
                return false;
            }
            else if(name.length>200){
                pop_tip_open("blue","审核主题长度不能超过200！");
                return false;
            } else if(remark!="" && remark.length>1000){
                pop_tip_open("blue","说明长度不能超过1000！");
                return;
            }else if(payPeriodStatus!='0'&&payPeriodStatus!=0) { //如果此期间不是草稿状态，则不能被提交审核
                pop_tip_open("blue", "非草稿状态的发薪期间不能被提交审核!");
            } else if(fsalary==null||fsalary=='') { //如果此期间的实发金额为空，则不能发起审核
                pop_tip_open("blue", "此期间的实发金额为空，不能进行提交审核!");
            }else {
                //1.初始化审批信息
                initSysApply();
                //3.更新发薪期间数据 管理applyId 为sysApply的id
                updatePayPeriodInfo();
                //4.发起审批
                toApplyByObjectCode(BOCODE_XZSH, applyId);
            }
        }
        //页面按钮禁止部分
        hideBtn();
    });

    //更改状态
    window.updatePayPeriodStatus = function () {
        $.ajax({
            url: serviceUrl + "wage/wagePayPeriod/updatePayPeriodStatus",
            type: 'post',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                status : 2,
                payPeriodId : payPeriodId
            }),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        pop_tip_open("green", "此账套不需要审批，操作成功！");
                        // closePage();
                        goBack();
                    } else {
                        pop_tip_open("blue", "数据修改保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
    };

    /**
     * 初始化申请单信息
     * 默认经办人为当前制单人
     */
    window.initSysApply = function () {
        var uBody = "/sys/sysApply/getSysApply?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            async:false,
            success: function (data) {
                //$("#id1").val(data.result.id);/*申请id*/
                applyId = data.result.id;
                var applyCode = $.hrUtils.getApplyCodeByType('XZSH');//初始化申请单编号
                var creater = data.result.creater;
                var createrName = data.result.createrName;
                var applicant = data.result.applicant;//经办人
                var applicantName = data.result.applicantName;
                var companyId = data.result.companyId;
                var companyName = data.result.companyName;
                var deptId = data.result.deptId;
                var deptName = data.result.deptName;
                var applyDate = data.result.applyDate;
                var type = APPLY_TYPE_XZSH;//薪资审核申请
                var status = data.result.status;
                //var approvalDate = "0000-00-00 00:00:00";
                var orgSizeApplyDto = {id:applyId,code:applyCode,creater:creater,createrName:createrName,applicant:applicant,
                    applicantName:applicantName,companyId:companyId,companyName:companyName,deptId:deptId,deptName:deptName,applyDate:applyDate,
                    type:type,status:status};
                orgSizeApplyDto.delflag = false;
                var name = $("#name").val();
                orgSizeApplyDto.name = name;
                //2.保存审批信息
                saveSysApplyInfo(orgSizeApplyDto);
                /*//申请审批单对象
                 sizeApplyDto=data.result;
                 applyId = sizeApplyDto.id;
                 //审核主题
                 var name = $('#name').val();
                 sizeApplyDto.name=name;
                 //初始化申请单编号
                 var applyCode = $.hrUtils.getApplyCodeByType('ORGSIZE');
                 sizeApplyDto.code=applyCode;
                 sizeApplyDto.type=APPLY_TYPE_XZSH;//薪资审核
                 sizeApplyDto.approvalDate="0000-00-00 00:00:00";
                 sizeApplyDto.fsalary=fsalary;//账套的实发金额
                 sizeApplyDto.payPeriod=payPeriod;//发薪期间*/
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化指标集请求失败");
            }
        })
    };

    /**
     * 修改发薪期间表，关联申请表id
     * @param n
     */
    window.updatePayPeriodInfo = function () {
        var payPeriodDto={};
        payPeriodDto.applyId=applyId;
        var remark=$('#remark').val();//说明
        payPeriodDto.remark=remark;
        $.ajax({
            url: serviceUrl + "/wage/wagePayPeriod/update/" + payPeriodId,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(payPeriodDto),
            async:false,
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var msg = resultData.msg;
                    if (successFlag) {
                        $.xljUtils.tip("green", "修改成功！");
                        $("#AReviewModul :button[class='close']").click();
                    } else {
                        pop_tip_open("blue", "数据修改保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
    };

    //期间非草稿状态，隐藏部分按钮
    window.hideBtn = function () {
        $("#calculateAllBtn").hide();
        $("#calculatePortionBtn").hide();
        $("#applyBtn").hide();
        $("#btachUpdateBtn").hide();
        $("#importBtn").hide();
        $("#importBtn").hide();
        $("#foumalCalculateBtn").hide();
    };

    //期间是草稿状态，显示所有按钮
    window.showBtn = function () {
        $("#calculateAllBtn").show();
        $("#calculatePortionBtn").show();
        $("#applyBtn").show();
        $("#btachUpdateBtn").show();
        $("#importBtn").show();
        $("#importBtn").show();
        $("#foumalCalculateBtn").show();
    };

    $(function () {
        //初始化高度
        resizeHeight();
        //
        // //获取参数值
        // payPeriodId = $.xljUtils.getUrlParam("payPeriodId");
        // payPeriodStatus = $.xljUtils.getUrlParam("payPeriodStatus");
        // fsalary = $.xljUtils.getUrlParam("fsalary");
        // payPeriod = $.xljUtils.getUrlParam("payPeriod");
        // //当发薪期间状态为新建时，才能展示所有按钮payPeriodStatus
        // if (payPeriodStatus != '0' && payPeriodStatus != 0) {
        //     hideBtn();
        // } else {
        //     showBtn();
        // }
        //
        initSalaryCalculate();//初始化薪资计算页面
        // initIsShow();//初始化是否显示相关选项
        // initBatchUpdateSelect();//初始化批量修改选项

        //公式计算设置：初始化
        $("#foumalCalculateModul").on("show.bs.modal", function() {
            initFormualCalculateMethod();
        });

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        // resizeGrid();

        //单元格修改保存
        $('html').bind('click blur', function (e) { //用于点击其他地方保存正在编辑状态下的行
            if (lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
                if ($(e.target).closest('#salaryCalculateList').length == 0) {
                    $("#salaryCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }
        });

        //单元格修改后长时间自动保存
        $('html').keyup(function (e) {//自动保存
            lastTime = e.timeStamp;
            setTimeout(function () {
                if (lastTime - e.timeStamp == 0 && lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
                    $("#salaryCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }, 1000);
        });
    });



    //变动人员
    window.recordChange = function () {
        window.location.href="wage_salary_record_change.html";
    };

    //调定薪
    window.salaryAdjustment = function () {
        window.location.href="wage_salary_adjustment.html";
    };

    //年终奖
    window.yearAward = function () {
        window.location.href="wage_year_award_calculate.html";
    };

    //设置
    window.salarySet = function () {
        window.location.href="wage_basics_setting.html";
    };

    //归档
    window.setFile = function () {
        // window.location.href="wage_basics_setting.html";
        pop_tip_open("green", "归档成功!");
    };

    //新建期间
    window.createPayPeriod = function () {
        pop_tip_open("green", "是否确定新建下月期间数据 !");
    };

    //历史月报
    window.historyFile = function () {
        window.location.href="wage_history_file.html";
    };

    //查看薪资详情
    window.viewWageInfo = function () {
        window.location.href="wage_info_detail.html";
    };
})(jQuery, window, document);

