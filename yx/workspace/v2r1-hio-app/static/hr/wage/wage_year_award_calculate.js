/**
 * ruanxin
 * 年终奖计算js
 */

;(function ($, window, document, undefined) {
    var payPeriodId;//发薪期间ID
    var payPeriodStatus;//发薪期间状态，确定操作状态：0 草稿、1：审批中  2：完成
    var payPeriod;//当前操作期间

    //定义全局参数
    var rowDataBefore;//上一次选中数据
    var rowData;    //行数据
    var showModel = [];//展示的具体内容
    var calculateDate = [];//计算相关的所有具体值
    var jqgridCalculate;//计算列表
    var lastrow = 0;//可编辑状态下记录单元格的行号 编辑iRow行号
    var lastcell = 1;//可编辑状态下记录单元格的列号
    var lastVaule;//编辑前获取单元格内容
    var isShowData = [];//显示的所有具体数据。方便进行更改显示顺序
    var isShowItemId;//选中是否显示的薪资项ID

    var flag="0";//单元格校验是否通过标志
    var calculateFlag = false;//是否页面改过编辑框又重新计算过
    var ifEditable=false;//是否可编辑单元格(可编辑单元格、删除人员、计算、导入)

    var focusId;//聚焦
    var focusW = false;//非第一页聚焦

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
       resizeHeight();
        resizeGrid();
    });

    //计算表格的高度
    window.resizeHeight = function () {
    };

    //计算表格宽度
    window.resizeGrid = function () {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 200);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 40);
    };

    //查询用户功能权限
    window.queryAuth=function(){
        $.ajax({
            type:'POST',
            url:hostUrl+"auth/authData/queryAuthorizationBtnList",
            dataType:'JSON',
            contentType:'application/json',
            async:false,//设置为同步
            data:JSON.stringify({"menuCode":"hr_salary"}),
            success:function(json){
                var list=json.result;
                if(list!=null&&list.length>0) {
                    $.each(list,function(index,value){
                        for(var key in value){
                            if(key=="code"&&value[key]=="2"){//编辑权限
                                $("#importBtn").show();//导入
                                $("#calculateAllBtn").show();//计算
                                $("#delBtn").show();//删除人员
                                ifEditable = true;
                            }
                            if(key=="code"&&value[key]=="4"){//归档、新建权限
                                $("#filingBtn").show();//归档
                                $("#updatePayPeriodBtn").show();//修改年终奖期间
                                $("#savePayPeriodBtn").show();//新建期间
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    //年终奖核算页面:初始化
    window.initSalaryCalculate = function () {

        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        var queryDataPost = {};
        queryDataPost.nameOrCodeByCal = nameOrCodeByCal;
        queryDataPost.queryOrgIds = orgId;
        queryDataPost.page =1;

        //获取当前操作期间信息
        $.ajax({
            url: hostUrl + 'wage/wageAnnualBonus/queryOperationPayPeriod',//创建完成之后请求数据的url
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype: "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(queryDataPost),
            success: function (resultData) {
                var data = resultData.result;//所有具体的值信息

                //校验设置中的计薪日期设置是否正常显示
                if (data != null && data!=undefined && data.payPeriod != null && data.payPeriod.id!=null) {
                    payPeriod = data.payPeriod;//展示的期间相关信息
                    queryDataPost.payPeriodId = payPeriod.id;

                    if (payPeriod.status == '3') {
                        $("#savePayPeriodBtn").attr("disabled", false);
                    }else {
                        $("#savePayPeriodBtn").attr("disabled", true);//如果未归档不允许调用
                    }

                    //统计行数据
                    var sum = data.sumMap;

                    showModel = [];//所有信息
                    //需要展示的所有记录
                    showModel.push({name: 'id', label: 'id', editable: true, hidden: true, key: true});
                    showModel.push({name: 'personId', label: 'personId', editable: true, hidden: true});
                    showModel.push({name: 'realName', label: '姓名', editable: false, align: 'center',width:120});
                    showModel.push({name: 'prefixName', label: '所属机构', editable: false,align: 'center',width:220});
                    showModel.push({name: 'postition', label: '职务', editable: false,align: 'center',width:100, hidden: true});
                    showModel.push({name: 'workStatus', label: '员工状态', editable: false,  align: 'center',width:120,formatter:personTypeFmatter,unformat:unPersonTypeFmatter, hidden: true});
                    showModel.push({name: 'entryTime', label: '入职时间', editable: false,align: 'center',width:130,formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}});
                    showModel.push({name: 'leaveTime', label: '离职时间', editable: false,align: 'center',width:130,formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}});
                    showModel.push({name: 'ssalary', label: '应发年终奖',editable: ifEditable, align: 'center',width:160});
                    showModel.push({name: 'taxableIncome', label: '年终奖应纳税所得额',editable: false, align: 'center',width:160});
                    showModel.push({name: 'contrastTaxableIncome', label: '对比工资应纳税所得额',editable: false, align: 'center',width:160, hidden: true});
                    showModel.push({name: 'individualTax', label: '个人所得税', editable: false,align: 'center',width:160});
                    showModel.push({name: 'fsalary', label: '实发年终奖', editable: false, align: 'center',width:160});

                    jqgridCalculate = jQuery("#yearAwardCalculateList").jqGrid({
                        url: hostUrl + 'wage/wageAnnualBonus/queryValueListByCalculate',//创建完成之后请求数据的url
                        ajaxGridOptions: {contentType: 'application/json'},
                        mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                        contentType: "application/json",
                        postData: queryDataPost,
                        datatype: "json",
                        sortable: false,//支持标题栏单击排除查询
                        autowidth: true,
                        height: $(window).height() - 220,
                        shrinkToFit:true,
                        footerrow: true,//分页上添加一行，用于显示统计信息
                        rownumbers: true,
                        multiselect: true,//是否可以多选
                        multiboxonly: true,//只能通过复选框进行多选
                        colModel:showModel,//动态表格
                        rowNum: 20,//一页显示多少条 -1全部
                        rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                        pager: "#pager",//表格页脚的占位符(一般是div)的id
                        viewrecords: true, //定义是否要显示总记录数
                        cellEdit: ifEditable,//是否开启单元格的编辑功能
                        cellsubmit : "clientArray",//修改内容后用getChangedCells获取
                        jsonReader: {
                            repeatitems: false
                        },
                        onSelectRow: function () {
                            var rowId=$('#yearAwardCalculateList').jqGrid("getGridParam","selrow");
                            rowData = $('#yearAwardCalculateList').jqGrid('getRowData',rowId);
                        },
                        gridComplete: function () { //滚动条

                            if (calculateFlag){
                                var nameOrCodeByCal = $("#nameOrCodeByCal").val();
                                var orgId = $("#orgId").val();
                                $.ajax({
                                    url: hostUrl + 'wage/wageAnnualBonus/queryOperationPayPeriod',//创建完成之后请求数据的url
                                    datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                                    mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                                    ajaxGridOptions: {contentType: 'application/json'},
                                    contentType: "application/json",
                                    type: "POST",
                                    async: false,
                                    data: JSON.stringify({nameOrCodeByCal:nameOrCodeByCal,queryOrgIds:orgId,updateTime:new Date().getTime()}),
                                    success: function (resultData) {
                                        sum = resultData.result.sumMap;//统计行数据
                                    }
                                });
                            }

                            if (sum === null || sum === undefined){
                                sum = {};
                            }
                            //合计行数据处理
                            for(var p in sum) {
                                if(isNaN(sum[p])) {
                                    sum[p] = sum[p].toFixed(2);
                                }
                            }

                            var sumJson = {"realName": '合计'};
                            $("#yearAwardCalculateList").footerData('set', $.extend(sumJson,sum));

                            $. xljUtils.addGridScroll();
                            $.xljUtils.gridResizeFn();

                            rowDataBefore = rowData;

                            //非第一页聚焦
                            if (focusW == null){
                                $("#yearAwardCalculateList tr").last().find(":input[role='checkbox']").prop('checked', true);
                                $("#yearAwardCalculateList tr").last().find(":input[role='checkbox']").trigger("click");
                            }
                            //聚焦选中
                            if (focusId != undefined && focusId != null){
                                $("#yearAwardCalculateList").setSelection(focusId);
                            }
                        },
                        beforeSaveCell: function (rowid, cellname, value, iRow, iCol) {//在验证输入数据（如果存在）之前触发
                            if (!$.isNumeric(value)) {
                                pop_tip_open("blue", "请输入有效数字！");
                                flag="1";
                                return lastVaule;
                            }
                            if(value!=null) {
                                if(value == 0 && value.length>1){
                                    pop_tip_open("blue", "请输入正确格式的数字！");
                                    flag="1";
                                    return lastVaule;
                                }else {
                                    var value1=value.split(".");
                                    if(value1[0].length>16){
                                        pop_tip_open("blue", "输入的数字整数位长度不能大于16！");
                                        flag="1";
                                        return lastVaule;
                                    }
                                    if(value1.length>1) {
                                        if(value1[1].length>3){
                                            pop_tip_open("blue", "输入的数字小数位长度不能大于3！");
                                            flag="1";
                                            return lastVaule;
                                        }
                                    }
                                }
                            }
                            //保存数据
                            var updateId = $("#yearAwardCalculateList").getCell(rowid,"id");
                            var ColumnName = cellname;
                            if(cellname=='ssalary') {
                                var tempValue = value;
                                //防止输入多个000
                                if (parseInt(value)+"" !== value){
                                    tempValue = parseInt(value);
                                }

                                $.ajax({
                                    type: "POST",
                                    url: hostUrl + "wage/wageAnnualBonus/updateSalaryItemValue",
                                    data: JSON.stringify({payPeriodId: payPeriod.id,updateId: updateId,updateName:ColumnName,value:tempValue}),
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
                        }
                    });
                } else {
                    pop_tip_open("blue", "当前操作期间未空！");
                }
            }
        });
    };

    //薪资计算:全部人员
    window.salaryCalculateAll = function () {
        flag="0";//避免单元格输入错误还能自动进行计算
        $("#yearAwardCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
        if(flag=="1"){
            flag=="0";
            return;
        }
        if(payPeriod!=null&&payPeriod.id!=null) {
            //获取查询得到的总记录数量
            var total = $("#yearAwardCalculateList").jqGrid('getGridParam', 'records');//获取页面总行数，避免无数据进行计算
            if (total != '' && total != null && total > 0) {
                $.ajax({
                    type: "POST",
                    url: hostUrl + "wage/wageAnnualBonus/updateBySalaryCalculate",
                    dataType: "JSON",
                    data: JSON.stringify({payPeriodId:payPeriod.id}),
                    contentType: "application/json",
                    success: function (data) {
                        if(data.success) {
                            pop_tip_open("green", "薪资计算成功！");
                            $('#yearAwardCalculateList').jqGrid().trigger("reloadGrid");
                            // $('#yearAwardCalculateList').GridUnload();//卸载garid
                            // initSalaryCalculate();
                        }else {
                            pop_tip_open("blue",data.message);
                        }
                    },
                    error:function (data) {
                        pop_tip_open("red", data.message);
                    }
                });
            } else {
                pop_tip_open("blue", "没有需要计算薪资的人员");
            }
        }else {
            pop_tip_open("blue", "当前操作期间未空，请刷新页面重新操作!");
        }
    };

    //归档
    window.salaryFiling = function () {

        var title = "您确认归档该月报表吗？";

        //获取当前期间的信息
        if(payPeriod!=null&&payPeriod!=''&&payPeriod.id!=null&&payPeriod.id!='') {
            var tempPeriodId = payPeriod.id;
            $.ajax({
                type:'get',
                url:hostUrl +"/wage/wagePayPeriod/get/"+payPeriod.id,
                success: function(data) {
                    if(data.success&&data.result!=null) {
                        payPeriod = data.result;
                        payPeriod.id = tempPeriodId;//get后，id变为sid

                        if(payPeriod.status=="4") { //已经审批完成
                            pop_tip_open("red","该月报表已成历史报表，请刷新页面重新进入！");
                            return false;
                        }
                        if(payPeriod.status=='3') { //已归档
                            title = "该月报表已归档过，重新归档将覆盖上一份报表，您确认要再次归档吗？";
                        }
                        pop_text_open("blue", title, function () {
                            $.ajax({
                                url: hostUrl + "wage/wagePayPeriod/annualBonusFiling",
                                type: 'post',
                                dataType: 'JSON',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    payPeriodId : tempPeriodId
                                }),
                                success: function (resultData) {
                                    if (resultData) {
                                        var successFlag = resultData.success;
                                        var result = resultData.result;
                                        var message = resultData.message;
                                        if (successFlag) {
                                            pop_tip_open("green", "年终奖归档成功！");
                                            //更新期间状态
                                            payPeriod.status = '3';

                                            $("#savePayPeriodBtn").attr("disabled", false);

                                        } else {
                                            pop_tip_open("blue", "年终奖归档失败！" + message);
                                        }
                                    }
                                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    pop_tip_open("red", "数据修改保存请求失败");
                                }

                            });
                        }, true);
                    }else {
                        pop_tip_open("blue","当前期间信息为空，请刷新页面！");
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    pop_tip_open("red","初始化当前期间信息请求失败");
                }
            });
        } else {
            pop_tip_open("blue","当前期间信息为空，请刷新页面！");
        }
    };

    //期间新建
    window.createPayPeriod = function () {
        localStorage.setItem('periodFlag',JSON.stringify("createPayPeriod"));
        window.location.href="wage_year_award_pay_period.html";
    };

    //修改期间
    window.updatePayPeriod = function () {
        if(payPeriod!=null&&payPeriod.id!=null) {
            localStorage.setItem('payPeriodId',JSON.stringify(payPeriod.id));
            localStorage.setItem('periodFlag',JSON.stringify("updatePayPeriod"));
            window.location.href="wage_year_award_pay_period.html";
        }else {
            pop_tip_open("blue", "当前操作期间未空，请刷新页面重新操作!");
        }
    };

    //导入
    window.importInfo = function () {
        //列表查询
        storageDate();
        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        localStorage.setItem('nameOrCodeByCal',nameOrCodeByCal);
        localStorage.setItem('orgId',orgId);
        window.location.href="wage_year_award_calculate_upload.html";

    };

    //人员维护
    window.personSet = function () {
        if(payPeriod!=null&&payPeriod.id!=null) {
            localStorage.setItem('payPeriodId',JSON.stringify(payPeriod.id));
            window.location.href="wage_year_award_record_change.html";
        }else {
            pop_tip_open("blue", "当前操作期间未空，请刷新页面重新操作!");
        }

    };

    //删除人员
    window.deletePerson = function () {
        var rowIds=$('#yearAwardCalculateList').jqGrid("getGridParam","selarrrow");
        if(rowIds.length==0){
            pop_tip_open("red","请选择需要减少的人员记录！");
            return;
        }
        //组装参数
        var itemAdd = [];
        for(var i in rowIds){
            //根据选中的行获取每行的数据对象
            var rowData = $("#yearAwardCalculateList").jqGrid('getRowData', rowIds[i]);
            //获取指定行对象的name属性的元素
            var personId = rowData.personId;
            var id = rowData.id;
            itemAdd.push({"personId":personId,"id":id})
        }
        var data = {"WageRecords":itemAdd,"type":"2"};
        pop_text_open("blue",'确定删除这'+rowIds.length+'条数据吗？',function(){
            $.ajax({
                type:'post',
                url: hostUrl + "wage/wageRecord/deleteYearAnnualByClaIds",
                // async: false,
                dataType:'json',
                contentType:'application/json',
                data:JSON.stringify(data),
                success:function (xhr,textStatus ) {
                    console.log(xhr);
                    if (xhr){
                        if(xhr.success) {
                            calculateFlag = true;

                            //刷新聚焦处理开始
                            var w = $.hrUtils.focusNode(rowIds);
                            focusW = w;
                            if (w == null){
                                var queryData = {
                                    datatype:'json',
                                    page:1
                                };
                                $('#yearAwardCalculateList').jqGrid('setGridParam',queryData).trigger("reloadGrid");
                            }else {
                                $('#yearAwardCalculateList').jqGrid('setGridParam',{
                                    gridComplete:function () {
                                        if (w != null && w != ""){
                                            $('#yearAwardCalculateList').setSelection(w);
                                        }
                                        w = "";
                                    }
                                }).trigger("reloadGrid");
                            }
                            //刷新聚焦处理结束
                            $.xljUtils.tip("green","人员删除成功！");

                        }else{
                            $.xljUtils.tip("red","人员删除失败！");
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
    };

    //当前月报
    window.currentFile = function () {
        if(payPeriod!=null&&payPeriod.status=='3') {
            // storageDate();
            localStorage.setItem('payPeriodId',JSON.stringify(payPeriod.id));
            window.location.href="wage_year_award_month_report.html";
        } else {
            pop_tip_open("blue","未归档，无法查看当前年终奖月报！");
        }
    };

    //历史月报
    window.historyFile = function () {
        window.location.href="wage_year_award_history_monthly_report.html";
    };

    //名称查询  回车查询
    $('#nameOrCodeByCal').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByCal();
        }
    });

    //点击查询按钮进行筛选查询
    window.refreshJqGridDataByCal = function () {

        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        var queryDataPost = {};
        queryDataPost.nameOrCodeByCal = nameOrCodeByCal;
        queryDataPost.queryOrgIds = orgId;
        queryDataPost.page = 1;
        calculateFlag = true;
        $("#yearAwardCalculateList").jqGrid("setGridParam", {url :hostUrl + 'wage/wageAnnualBonus/queryValueListByCalculate', postData: queryDataPost}).trigger("reloadGrid");
    };

    //查询条件记录
    window.storageDate = function () {
        var show_nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var show_orgIds = $("#orgId").val();
        var show_orgNames = $("#orgName").val();
        localStorage.setItem("show_nameOrCodeByCal", show_nameOrCodeByCal);
        localStorage.setItem("show_orgIds", show_orgIds);
        localStorage.setItem("show_orgNames", show_orgNames);
    };

    //查询条件回显
    window.storageShow = function () {
        var show_nameOrCodeByCal = localStorage.getItem("show_nameOrCodeByCal");
        var show_orgIds = localStorage.getItem("show_orgIds");
        var show_orgNames = localStorage.getItem("show_orgNames");
        if(show_nameOrCodeByCal!=null&&show_nameOrCodeByCal!=""&&show_nameOrCodeByCal!=undefined) {
            $("#nameOrCodeByCal").val(show_nameOrCodeByCal);
        }
        if(show_orgIds!=null&&show_orgIds!=""&&show_orgIds!=undefined&&show_orgNames!=null&&show_orgNames!=""&&show_orgNames!=undefined) {
            $("#orgId").val(show_orgIds);
            $("#orgName").val(show_orgNames);
        }
    };

    //显示员工状态
    window.personTypeFmatter = function(cellvalue, options, rowObject){
        if(cellvalue == '1') {
            return "在职";
        }
        else if(cellvalue == '2') {
            return "离职";
        }
        else {
            return "";
        }
    };

    //显示状态反格式化，用于数据获取
    window.unPersonTypeFmatter = function(cellvalue, options, rowObject) {
        if(cellvalue == "在职") {
            return '';
        }
        if(cellvalue == '在职') {
            return "1";
        }
        else if(cellvalue == '离职') {
            return "2";
        }
        else {
            return cellvalue;
        }
    };

    //返回上一级
    window.goBack = function () {
        window.location.href="wage_salary_calculate.html";
    };

    //清空组织机构
    window.emptyOrg=function() {
        $("#orgId").val("");
        $("#orgName").val("");
    };

    window.orgCallback=function(data) {
        $("#orgId").val(data.id);
        $("#orgName").val(data.name);
    };

    $(function () {

        queryAuth();

        //查询条件记录
        var queryFlag = $.xljUtils.getUrlParam("queryFlag");
        if (queryFlag == "01") {
            storageShow();
        }

        initSalaryCalculate();//初始化薪资计算页面

        //名称查询  回车查询
        $('#nameOrCodeByCal').bind('keypress',function(event){
            if(event.keyCode == "13") {
                // refreshJqGridDataByCal();
            }
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
        $('#valueEmptyOrg').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });

        //单元格修改保存
        $('html').bind('click blur', function (e) { //用于点击其他地方保存正在编辑状态下的行
            if (lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
                if ($(e.target).closest('#yearAwardCalculateList').length == 0) {
                    $("#yearAwardCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }
        });

        //单元格修改后长时间自动保存
        $('html').keyup(function (e) {//自动保存
            lastTime = e.timeStamp;
            setTimeout(function () {
                if (lastTime - e.timeStamp == 0 && lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') {
                    $("#yearAwardCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }, 1000);
        });
        resizeGrid()

    });


})(jQuery, window, document);

