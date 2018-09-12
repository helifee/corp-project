var payPeriodId;
;(function ($,window,document,undefined) {
    var jqGridUser;
    var jqgridWage;

    //计算表格高度
    window.resizeHeight = function() {
        var w_h = $(window).height();
        $(".con-table .mytable").height((w_h - 320) + "px");
    };

    //计算表格宽度
    window.resizeGrid = function() {
        $.xljUtils.addGridScroll();
        // //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 320);
        $('#salaryPeriodList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#salaryPeriodList').jqGrid('setFrozenColumns');


        $('#taxList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#taxList').jqGrid('setFrozenColumns');

        // $('#internetbankList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        // $('#internetbankList').jqGrid('setFrozenColumns');

        $('#laborCostList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#laborCostList').jqGrid('setFrozenColumns');
        // 冻结列样式
        $.xljUtils.setFrozenColumnStyle(38);
    };

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
            resizeHeight();
            resizeGrid();
        });

    //状态数据格式化
    window.statusFmatter = function(cellvalue) {
        if(cellvalue == "1"){
            return "正常";
        }else if(cellvalue == "0"){
            return "撤销";
        }
    };

    //网银报表年度涉及年度查询
    window.initYear = function(str) {
        var nowYear;
        $.ajax({    //查询所有的历史计薪期间
            type: "POST",
            url:hostUrl+ "wage/wagePayHistory/queryYearList",
            dataType: "JSON",
            async:false,
            data: JSON.stringify({}),
            contentType:"application/json",
            success: function(resultData) {
                if(resultData.success) {
                    var data = resultData.result.yearList;//所有具体的值信息
                    if(data!=null) {
                        for(var k in data){
                            $("#yearSelect").append("<option value=" + data[k] + ">" + data[k] + "</option>");
                            nowYear = data[k];
                        }
                    }
                    // $("#yearSelect option:last").checked = true;
                    if(str!=undefined){
                        nowYear = str;
                    }
                    document.getElementById('yearSelect').value=nowYear;
                    var data1 = resultData.result.monthList;//所有具体的值信息
                    var payTime = resultData.result.payTime;

                    var fsalaryMap = resultData.result.fsalaryMap;
                    var ssalaryMap = resultData.result.ssalaryMap;
                    var taxMap = resultData.result.taxMap;

                    var monthDiv = "";
                    if(data1!=null) {
                        for(var k in data1){
                            var tempData1 = data1[k].substring(0,4);
                            var month = data1[k].substr(5);
                            if(tempData1==nowYear){

                                var tempFsalary = "0";
                                if(fsalaryMap!=null&&fsalaryMap!=undefined&&fsalaryMap[data1[k]]!=null&&fsalaryMap[data1[k]]!='') {
                                    tempFsalary = fsalaryMap[data1[k]];
                                }
                                var tempSsalary = "0";
                                if(ssalaryMap!=null&&ssalaryMap!=undefined&&ssalaryMap[data1[k]]!=null&&ssalaryMap[data1[k]]!='') {
                                    tempSsalary = ssalaryMap[data1[k]];
                                }
                                var tempTax = "0";
                                if(taxMap!=null&&taxMap!=undefined&&taxMap[data1[k]]!=null&&taxMap[data1[k]]!='') {
                                    tempTax = taxMap[data1[k]];
                                }

                                // monthDiv = monthDiv + "<div class=\"user-list clearfix\" style=\"height: 80px;line-height: 73px\">"
                                // + "<span class='l'><span class=\"expend-col\" onclick=\"showExpendDiv('" + data1[k] + "')\"><i></i></span>"
                                // + "<span class=\"tit-big\"><span class=\"tit-big-title\">" + month + "月</span>薪资报表</span></br>"
                                // + "<span class=\"tit-big-time\">" + payTime[data1[k]] + "</span>"
                                // + "</span>"
                                // + "<div class=\"my-btn-group\">"
                                // + "<span class=\"tit-big\"> 应发工资合计</br><span class='tb_f'>"+parseFloat(tempSsalary).toFixed(3)+"</span></span>"
                                // + "<span class=\"tit-big\"> 个税合计</br><span class='tb_f'>"+parseFloat(tempTax).toFixed(3)+"</span></span>"
                                // + "<span class=\"tit-big\"> 实发工资合计</br><span class='tb_f'>"+parseFloat(tempFsalary).toFixed(3)+"</span></span>"
                                // + "</div></div><div id=\""+data1[k]+"\"></div>";
                                monthDiv = monthDiv + "<div class=\"user-list clearfix\" style=\"height: 80px;line-height: 73px\">"
                                    + "<span class='l'><span class=\"expend-col\" id='zidingyi_"+data1[k]+"' month='"+data1[k]+"'><i></i></span>"
                                    + "<span class=\"tit-big\"><span class=\"tit-big-title\">" + month + "月</span>薪资报表</span></br>"
                                    + "<span class=\"tit-big-time\">" + payTime[data1[k]] + "</span>"
                                    + "</span>"
                                    + "<div class=\"my-btn-group\">"
                                    + "<span class=\"tit-big\"> 应发工资合计</br><span class='tb_f'>"+parseFloat(tempSsalary).toFixed(3)+"</span></span>"
                                    + "<span class=\"tit-big\"> 个税合计</br><span class='tb_f'>"+parseFloat(tempTax).toFixed(3)+"</span></span>"
                                    + "<span class=\"tit-big\"> 实发工资合计</br><span class='tb_f'>"+parseFloat(tempFsalary).toFixed(3)+"</span></span>"
                                    + "</div></div><div id=\""+data1[k]+"\"></div>";
                            }
                        }
                        $("#monthDiv").html(monthDiv);

                        $.each($("span[id^='zidingyi']"),function (index,content) {
                            var monthy = this.getAttribute("month");
                            (function(that,month){
                                $(that).click(function(){
                                    if(!that.flag){
                                        showExpendDiv(monthy);
                                    }
                                    var str = monthy;
                                    var x = $('#'+str).eq(0);
                                    var p = $('#rowDiv').eq(0);
                                    x.after(p);
                                    var mytable = $("#rowDiv").eq(0);
                                    if($("#month1").val()!=str){
                                        mytable.hide();
                                    }
                                    if(mytable.is(":hidden")==true){
                                        $("#month1").val(str);
                                        $(".btn.btn-default.btn-sm").removeClass("active");
                                        $(".btn.btn-default.btn-sm.byWage").addClass("active");
                                        $(".btn.btn-default.btn-sm.byWage").trigger("click");
                                        // $("#listApply").hide();
                                        // $("#listTax").hide();
                                        // $("#listTotal").hide();
                                        // $("#periodList").show();
                                        mytable.show();
                                    }else{
                                        mytable.hide();
                                    }
                                    that.flag = !that.flag;
                                });
                            })(this,monthy);
                        });

                    }
                }else {
                    pop_tip_open("blue", resultData.msg);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    };

    //查询用户功能权限
    window.queryAuth = function(){
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
                                $("#exportBtn").show();//导出
                                $("#taxRateBtn").show();//导出
                                $("#totalExportBtn").show();//导出
                                $("#applyExportBtn").show();//导出
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    //工资报表
    window.initSalaryPeriodList = function() {
        //$("#container").height( $(window).height() - 330);
        var payPeriodDate = $("#wagePayPeriod").val();
        if(payPeriodDate!=null&&payPeriodDate!='') {
            $.ajax({
                type: "POST",
                url:hostUrl+ "wage/wagePayHistory/queryFileListByRecopt",
                dataType: "JSON",
                data: JSON.stringify({"payPeriod":payPeriodDate,"type":"1"}),
                contentType:"application/json",
                success: function(resultData) {
                    var data = resultData.result;//所有具体的值信息
                    showModel = [];//所有信息
                    var tempShowField = data.showField;//查询出来的除默认展示字段外的其他需要展示字段
                    var payPeriod = data.payPeriod;//展示的期间相关信息
                    if(payPeriod !=null && payPeriod != undefined && payPeriod != 'undefined'&&payPeriod.status=='4') {
                        payPeriodId=payPeriod.sid;
                        //需要展示的所有记录
                        showModel.push({name: 'id', label: 'id', hidden: true, key: true,frozen:true});
                        showModel.push({name: 'personId', label: 'personId',hidden: true,frozen:true});
                        showModel.push({name: 'realName', label: '姓名',align: 'center',width:120,frozen:true});
                        showModel.push({name: 'mobile', label: '手机号', align: 'center',width:120,frozen:true});
                        showModel.push({name: 'prefixName', label: '所属机构', align: 'center',width:220,frozen:true});
                        showModel.push({name: 'entryTime', label: '入职时间',align: 'center',width:160});
                        showModel.push({name: 'leaveTime', label: '离职时间', align: 'center',width:160});
                        showModel.push({name: 'person_type', label: '显示状态',align: 'center',width:160});
                        var shrinkToFit=0;//标志列表是否按指定宽度
                        if (tempShowField != null && tempShowField != '' && tempShowField.length > 0&& payPeriod!=null) {
                            for (var i in tempShowField) {
                                var temp = {
                                    name: tempShowField[i].code,
                                    label: tempShowField[i].name,
                                    align: 'center'
                                };
                                showModel.push(temp);
                                shrinkToFit++;
                            }
                        }
                        var flag = true;
                        initSalaryPeriodListgrid = jQuery("#salaryPeriodList").jqGrid({
                            url: hostUrl + 'wage/wagePayHistory/queryValueListByRecopt',//创建完成之后请求数据的url
                            ajaxGridOptions: {contentType: 'application/json'},
                            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                            contentType: "application/json",
                            postData: {"payPeriodId": payPeriod.sid},
                            datatype: "json",
                            sortable: false,//支持标题栏单击排除查询
                            width: $('.mytable').width(),
                            height: $(window).height() - 350,
                            width: $(window).width() - 50,
                            shrinkToFit:shrinkToFit>3?false:true,
                            rownumbers: true,
                            multiselect: true,
                            multiboxonly: true,//只能通过复选框进行多选
                            jsonReader: {
                                "root":"result",
                                repeatitems: false
                            },
                            colModel:showModel,//动态表格
                            rowNum: -1,//一页显示多少条 -1全部
                            viewrecords: true, //定义是否要显示总记录数
                            gridComplete: function () { //滚动条
                                $.xljUtils.gridResizeFn();
                                $. xljUtils.addGridScroll();
                                $('#salaryPeriodList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                                $('#salaryPeriodList').jqGrid('setFrozenColumns'); //冻结列
                            },
                            loadComplete:function () {
                                $("#load_salaryPeriodList").remove();

                                $.xljUtils.setFrozenColumnStyle(38);
                                // if(flag){
                                //     $('#salaryPeriodList').jqGrid().trigger("reloadGrid");
                                // }
                            }
                        });
                    } else {
                        pop_tip_open("blue", "当前期间未归档，没有月报需要展示！");
                        return false;
                    }
                }
            });
        }else {
            pop_tip_open("blue", "当前期间未归档，没有月报需要展示！");
        }
    };

    //个税
    window.initTaxList = function () {
        //$("#container").height( $(window).height() - 330);
        var payPeriodDate = $("#wagePayPeriod").val();
        if(payPeriodDate!=null&&payPeriodDate!='') {
            initTaxListgrad = jQuery("#taxList").jqGrid({
                url: hostUrl + 'wage/wagePayHistory/queryTaxValueListByRecopt',//创建完成之后请求数据的url
                ajaxGridOptions: {contentType: 'application/json'},
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                contentType: "application/json",
                postData: {"payPeriod":payPeriodDate,"type":"1"},
                datatype: "json",
                height: $(window).height() - 350,
                width: $(window).width() - 40,
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true,frozen:true},
                    {name : 'realName',label : '姓名',sortable:false,align:'center',width:120,frozen:true},
                    {name : 'idType',label : '证件类型',sortable:false,align:'center',width:120},
                    {name : 'idCard',label : '证件号码', sortable:false,align:'center',width:160},
                    {name : 'incomeItem',label : '所得项目',sortable:false,align:'center',width:260},
                    {name : 'pay_period',label : '所得期间',sortable:false,align:'center',width:120},
                    {name : 'ssalary',label : '收入额',sortable:false,align:'center',width:100},
                    {name : 'dimission_compensation',label : '免税所得',sortable:false,align:'center',width:100},
                    {name : 'endowment_emp_total',label : '基本养老保险费',sortable:false,align:'center',width:120},
                    {name : 'medical_emp_total',label : '基本医疗保险费',sortable:false,align:'center',width:120},
                    {name : 'outwork_emp_total',label : '失业保险费',sortable:false,align:'center',width:120},
                    {name : 'fund_emp_total',label : '住房公积金',sortable:false,align:'center',width:120},
                    {name : '',label : '财产原值',sortable:true,align:'center',width:120},
                    {name : '',label : '允许扣除的税费',sortable:true,align:'center',width:120},
                    {name : '',label : '其他',sortable:true,align:'center',width:100},
                    {name : 'social_fund_emp_total',label : '合计',sortable:false,align:'center',width:100},
                    {name : 'tax_base',label : '减除费用',sortable:false,align:'center',width:120},
                    {name : '',label : '准予扣除的捐赠额',sortable:true,align:'center',width:140},
                    {name : 'taxable_income',label : '应纳税所得额',sortable:false,align:'center',width:120},
                    {name : 'tax_rate',label : '税率%',sortable:false,align:'center',width:100},
                    {name : 'quick_deduction',label : '速算扣除数',sortable:false,align:'center',width:120},
                    {name : 'individual_tax',label : '应纳税额',sortable:false,align:'center',width:100},
                    {name : '',label : '减免税额',sortable:true,align:'center',width:100},
                    {name : 'taxable_income',label : '应扣缴税额',sortable:false,align:'center',width:120},
                    {name : 'taxable_income',label : '已扣缴税额',sortable:false,align:'center',width:120},
                    {name : '',label : '应补（退）税额',sortable:true,align:'center',width:120},
                    {name : '',label : '备注',sortable:true,align:'center',width:100}
                ],
                shrinkToFit:false,
                rownumbers: true,
                sortable: false,//支持标题栏单击排除查询
                multiselect: true,
                useColSpanStyle : true ,//没有表头的列是否与表头所在行的空单元格合并
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader: {
                    "root":"result",
                    repeatitems: false
                },
                rowNum: -1,//一页显示多少条 -1全部
                gridComplete: function () { //滚动条
                    $. xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    // $('#taxList').jqGrid('destroyFrozenColumns');//刷新前先去除冻结列
                    // $('#taxList').jqGrid('setFrozenColumns');     //冻结列
                },
                loadComplete:function () {
                    $.xljUtils.setFrozenColumnStyle(38);
                }
            });
            // 设置二级表头
            jQuery("#taxList").jqGrid('setGroupHeaders', {
                useColSpanStyle: true,//是否合并其他空单元格
                groupHeaders: {
                    startColumnName : "endowment_emp_total",//合并列的起始位置 colModel中的name
                    numberOfColumns : 8, //合并列数 包含起始列
                    titleText : "税前扣除项目"//表头
                }
            });
        }else {
            pop_tip_open("blue", "当前期间未归档，没有月报需要展示！");
        }
    };

    //网银数据
    window.initInternetbankList = function () {
        //$("#container").height( $(window).height() - 400);
       var payPeriodDate = $("#wagePayPeriod").val();
        if(payPeriodDate!=null&&payPeriodDate!='') {
            initInternetbankListgrid = jQuery("#internetbankList").jqGrid({
                url: hostUrl + 'wage/wagePayHistory/queryInternetbankValueListByRecopt',//创建完成之后请求数据的url
                ajaxGridOptions: {contentType: 'application/json'},
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                contentType: "application/json",
                postData: {"payPeriod": payPeriodDate,"type":"1"},
                datatype: "json",
                sortable: false,//支持标题栏单击排除查询
                height: $(window).height() - 350,
                width: $(window).width() - 40,
                shrinkToFit:true,
                rownumbers: true,
                multiselect: true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader: {
                    "root":"result",
                    //repeatitems: false
                },
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'realName',label : '户名',sortable:false,align:'center',width:150},
                    {name : 'bankAccount',label : '银行账号',sortable:false,align:'center',width:200},
                    {name : 'fsalary',label : '金额', sortable:false,align:'center',width:160},
                    {name : 'wageRemark',label : '注释',sortable:false,align:'center',width:160}
                ],
                rowNum: -1,//一页显示多少条 -1全部
                gridComplete: function () { //滚动条
                    $. xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    // jQuery("#internetbankList").jqGrid('setFrozenColumns');
                },
                loadComplete:function () {
                    // $.xljUtils.setFrozenColumnStyle(38);
                }
            });

        }else {
            pop_tip_open("blue", "当前期间未归档，没有月报需要展示！");
        }
    };

    //人工成本
    window.initLaborCostList= function () {
        var payPeriodDate = $("#wagePayPeriod").val();
        if(payPeriodDate!=null&&payPeriodDate!='') {
            $.ajax({
                url: hostUrl + 'wage/wagePayHistory/queryFileListByRecopt',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                type: "POST",
                data: JSON.stringify({"payPeriod":payPeriodDate,"type":"1"}),
                success: function(resultData) {
                    var data = resultData.result;//所有具体的值信息
                    showModel = [];//所有信息
                    var tempShowField = data.showField;//查询出来的除默认展示字段外的其他需要展示字段
                    var payPeriod = data.payPeriod;//展示的期间相关信息
                    if(payPeriod !=null && payPeriod != undefined && payPeriod != 'undefined'&&payPeriod.status=='4') {

                        //需要展示的所有记录
                        showModel.push({name: 'id', label: 'id', hidden: true, key: true,frozen:true});
                        showModel.push({name: 'personId', label: 'personId',hidden: true,frozen:true});
                        showModel.push({name: 'realName', label: '姓名',align: 'center',width:120,frozen:true});
                        showModel.push({name: 'mobile', label: '手机号', align: 'center',width:120,frozen:true});
                        showModel.push({name: 'prefixName', label: '所属机构', align: 'center',width:220,frozen:true});
                        showModel.push({name: 'entryTime', label: '入职时间',align: 'center',width:160});
                        showModel.push({name: 'leaveTime', label: '离职时间', align: 'center',width:160});
                        showModel.push({name: 'person_type', label: '显示状态',align: 'center',width:160});
                        var shrinkToFit=0;//标志列表是否按指定宽度
                        if (tempShowField != null && tempShowField != '' && tempShowField.length > 0&& payPeriod!=null) {
                            for (var i in tempShowField) {
                                var temp = {
                                    name: tempShowField[i].code,
                                    label: tempShowField[i].name,
                                    align: 'center'
                                };
                                showModel.push(temp);
                                shrinkToFit++;
                            }
                        }

                        var temp = {
                            name: 'laborCost',
                            label: '人工成本',
                            align: 'center'
                        };
                        showModel.push(temp);
                        shrinkToFit++;

                        initLaborCostListgrid = jQuery("#laborCostList").jqGrid({
                            url: hostUrl + 'wage/wagePayHistory/queryLaborCostByRecopt',//创建完成之后请求数据的url
                            ajaxGridOptions: {contentType: 'application/json'},
                            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                            contentType: "application/json",
                            postData: {"payPeriodId": payPeriod.sid},
                            datatype: "json",
                            sortable: false,//支持标题栏单击排除查询
                            height: $(window).height() - 350,
                            width: $(window).width() - 40,
                            shrinkToFit:shrinkToFit>3?false:true,
                            rownumbers: true,
                            multiselect: true,
                            multiboxonly: true,//只能通过复选框进行多选
                            jsonReader: {
                                "root":"result",
                                repeatitems: false
                            },
                            colModel:showModel,//动态表格
                            rowNum: -1,//一页显示多少条 -1全部
                            gridComplete: function () { //滚动条
                                $. xljUtils.addGridScroll();
                                $.xljUtils.gridResizeFn();
                                //冻结列
                                jQuery("#laborCostList").jqGrid('setFrozenColumns');
                            },
                            loadComplete:function () {
                                $.xljUtils.setFrozenColumnStyle(38);
                            }
                        });
                    } else {
                        pop_tip_open("blue", "当前期间未归档，没有月报需要展示！");
                        return false;
                    }
                }
            });
        }else {
            pop_tip_open("blue", "当前期间未归档，没有月报需要展示！");
        }
    };

    function taxListFun(){
        return function () {
            try {
                initTaxList();
            }
            catch (e) {
                console.error(e);//一般可以注释掉这行
            }
            finally {
                taxListFun = null;
            }
        }
    }

    function salaryPeriodListFun(){
        return function () {
            try {
                initSalaryPeriodList();
            }
            catch (e) {
                console.error(e);//一般可以注释掉这行
            }
            finally {
                salaryPeriodListFun = null;
            }
        }
    }

    //页签切换
    $(".right-content .con-tit button").on("click", function (e) {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 25) + "px");

        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if ($(this).attr('class').indexOf('bytax') > 0) {
            // $("#listApply").hide(); //人工成本
            // $("#listTax").show(); //个税
            // $("#listTotal").hide(); //网银
            // $("#periodList").hide(); //工资
            $("#wageDiv").css("z-index", "1");//工资报表设置为none（隐藏）
            $("#internetbankDiv").css("z-index", "1");//网银报表设置为none（隐藏）
            $("#laborCostDiv").css("z-index", "1");//人工成本为none（隐藏）
            $("#taxDiv").css("z-index", "2");//个税参数设置为block（显示）
            $('#taxList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
            $('#taxList').jqGrid('setFrozenColumns'); //冻结列
            $.xljUtils.setFrozenColumnStyle(38);
            initTaxList();
        } else if ($(this).attr('class').indexOf('bytotal') > 0) {
            // $("#listApply").hide(); //人工成本
            // $("#listTax").hide(); //个税
            // $("#listTotal").show(); //网银
            // $("#periodList").hide(); //工资
            $("#wageDiv").css("z-index", "1");//工资报表设置为none（隐藏）
            $("#taxDiv").css("z-index", "1");//个税参数设置为none（隐藏）
            $("#laborCostDiv").css("z-index", "1");//人工成本为none（隐藏）
            $("#internetbankDiv").css("z-index", "2");//网银报表设置为block（显示）
            $('#internetbankList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
            $('#internetbankList').jqGrid('setFrozenColumns'); //冻结列
            $.xljUtils.setFrozenColumnStyle(38);
            initInternetbankList();
        }  else if ($(this).attr('class').indexOf('byapply') > 0) {
            // $("#listApply").show(); //人工成本
            // $("#listTax").hide(); //个税
            // $("#listTotal").hide(); //网银
            // $("#periodList").hide(); //工资
            $("#wageDiv").css("z-index", "1");//工资报表设置为none（隐藏）
            $("#taxDiv").css("z-index", "1");//个税参数设置为none（隐藏）
            $("#internetbankDiv").css("z-index", "1");//网银报表设置为none（隐藏）
            $("#laborCostDiv").css("z-index", "2");//人工成本为block（显示）
            $('#laborCostList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
            $('#laborCostList').jqGrid('setFrozenColumns'); //冻结列
            $.xljUtils.setFrozenColumnStyle(38);
            initLaborCostList();
        }  else {
            // $("#listApply").hide(); //人工成本
            // $("#listTax").hide(); //个税
            // $("#listTotal").hide(); //网银
            // $("#periodList").show(); //工资
            $("#taxDiv").css("z-index", "1");//个税参数设置为none（隐藏）
            $("#internetbankDiv").css("z-index", "1");//网银报表设置为none（隐藏）
            $("#laborCostDiv").css("z-index", "1");//人工成本为none（隐藏）
            $("#wageDiv").css("z-index", "2");//工资报表设置为block（显示）
            $('#salaryPeriodList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
            $('#salaryPeriodList').jqGrid('setFrozenColumns'); //冻结列
            $.xljUtils.setFrozenColumnStyle(38);
            initSalaryPeriodList();
        }
        // $.xljUtils.gridResizeFn();
        e.stopPropagation();
    });

    //刷新grid
    window.reloadGrid=function(){
        $.xljUtils.tip("green","数据操作成功！");
        $('#salaryPeriodList').jqGrid().trigger("reloadGrid");
    };


    /**
     * 显示/隐藏切换
     */
    window.showExpendDiv = function(str){
        try{
            initSalaryPeriodListgrid.GridUnload();
        }catch (err){

        }
        try{
            initTaxListgrad.GridUnload();
        }catch (err){

        }
        try{
            initInternetbankListgrid.GridUnload();
        }catch (err){

        }
        try{
            initLaborCostListgrid.GridUnload();
        }catch (err){

        }
        $(".nicescroll-rails.nicescroll-rails-vr").remove();
        // $(this).toggleClass("col");
        $("#wagePayPeriod").val(str);
        //给rowDiv进行赋值操作
        initSalaryPeriodList();
        // initTaxList();
        // initInternetbankList();
        // initLaborCostList();
        //$("#taxDiv").css("display", "block");//个税参数设置为block（显示）
        // $("#wageDiv").css("display", "block");//工资报表设置为none（隐藏）
        // $("#internetbankDiv").css("display", "block");//网银报表设置为none（隐藏）
        // $("#laborCostDiv").css("display", "block");//人工成本为none（隐藏）
        //挪动rowDiv到点击div下方
        // var x = document.getElementById(str);
        // var p = document.getElementById('rowDiv');




        //todo 切换显隐
        // var x = $('#'+str).eq(0);
        // var p = $('#rowDiv').eq(0);
        // x.after(p);
        // var mytable = $("#rowDiv").eq(0);
        // if($("#month1").val()!=str){
        //     mytable.hide();
        // }
        // if(mytable.is(":hidden")==true){
        //     $("#month1").val(str);
        //     mytable.show();
        // }else{
        //     mytable.hide();
        // }






        // $.xljUtils.gridResizeFn();
    };


    //返回上一级
    window.goBack = function () {
        // window.history.go(-1);
        window.location.href="wage_salary_calculate.html?queryFlag=01";
    };

    $("#closeDivWindow").click(function(){
        var mytable = $("#rowDiv").eq(0);
        mytable.hide();
    });



    window.annualQuery = function () {
        var str = $("#yearSelect").val();
        initYear(str);
    };

    //工资报表-导出
    window.exportInfo = function () {
        var payPeriodDate = $("#wagePayPeriod").val();
        var empType = $("#empType").val();
        var empTypeStr="";
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();

        var urlBody = "wage/wagePayHistory/exportInfo?"+window.parent.JZY.s.getAccessTokenByAuthorization();
        var urlAll = hostUrl + urlBody;
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', "payPeriod");
        input1.attr('value', payPeriodDate);
        //添加后台导出参数
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', "nameOrCodeByCal");
        input2.attr('value', nameOrCodeByCal);
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "queryOrgIds");
        input3.attr('value', orgId);
        //添加后台导出参数
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', "payPeriodId");
        input4.attr('value', payPeriodId);
        //添加后台导出参数
        var input5 = $('<input>');
        input5.attr('type', 'hidden');
        input5.attr('name', "empTypes");
        input5.attr('value', empTypeStr);
        //添加后台导出参数
        var input6 = $('<input>');
        input6.attr('type', 'hidden');
        input6.attr('name', "type");
        input6.attr('value', '1');
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.append(input5);   //将查询参数控件提交到表单上
        form.append(input6);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");
    };

    //个税-导出
    window.exportInfoTax = function () {
        var payPeriodDate = $("#wagePayPeriod").val();
        var empType = $("#empTypeTax").val();
        var empTypeStr="";
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var nameOrCodeByTax = $("#nameOrCodeByTax").val();
        var orgIdTax = $("#orgIdTax").val();

        var urlBody = "wage/wagePayHistory/exportInfoByTax?"+window.parent.JZY.s.getAccessTokenByAuthorization();
        var urlAll = hostUrl + urlBody;
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', "payPeriod");
        input1.attr('value', payPeriodDate);
        //添加后台导出参数
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', "nameOrCodeByCal");
        input2.attr('value', nameOrCodeByTax);
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "queryOrgIds");
        input3.attr('value', orgIdTax);
        //添加后台导出参数
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', "payPeriodId");
        input4.attr('value', payPeriodId);
        //添加后台导出参数
        var input5 = $('<input>');
        input5.attr('type', 'hidden');
        input5.attr('name', "empTypes");
        input5.attr('value', empTypeStr);
        //添加后台导出参数
        var input6 = $('<input>');
        input6.attr('type', 'hidden');
        input6.attr('name', "type");
        input6.attr('value', '1');
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.append(input5);   //将查询参数控件提交到表单上
        form.append(input6);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");
    };

    //网银-导出
    window.exportInfoByInternetbank = function () {
        var payPeriodDate = $("#wagePayPeriod").val();
        var wageRemark = $("#wageRemark").val();
        var wageRemarkStr="";
        if(wageRemark!=null&&wageRemark.length>0){
            for(var i=0;i<wageRemark.length;i++){
                if(wageRemarkStr.length>0){
                    wageRemarkStr+=',';
                }
                wageRemarkStr+=wageRemark[i];
            }
        }
        var nameOrCodeByInternetbank = $("#nameOrCodeByInternetbank").val();

        var urlBody = "wage/wagePayHistory/exportInfoByInternetbank?"+window.parent.JZY.s.getAccessTokenByAuthorization();
        var urlAll = hostUrl + urlBody;
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', "payPeriod");
        input1.attr('value', payPeriodDate);
        //添加后台导出参数
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', "nameOrCodeByCal");
        input2.attr('value', nameOrCodeByInternetbank);
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "wageRemarks");
        input3.attr('value', wageRemarkStr);
        //添加后台导出参数
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', "type");
        input4.attr('value', '1');
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");
    };

    //人工成本-导出
    window.exportInfoByLaborCost = function () {
        var payPeriodDate = $("#wagePayPeriod").val();
        var empType = $("#empTypeByLaborCost").val();
        var empTypeStr="";
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var nameOrCodeByLaborCost = $("#nameOrCodeByLaborCost").val();
        var orgIdByLaborCost = $("#orgIdByLaborCost").val();

        var urlBody = "wage/wagePayHistory/exportInfoByLaborCost?"+window.parent.JZY.s.getAccessTokenByAuthorization();
        var urlAll = hostUrl + urlBody;
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', "payPeriod");
        input1.attr('value', payPeriodDate);
        //添加后台导出参数
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', "nameOrCodeByCal");
        input2.attr('value', nameOrCodeByLaborCost);
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "queryOrgIds");
        input3.attr('value', orgIdByLaborCost);
        //添加后台导出参数
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', "payPeriodId");
        input4.attr('value', payPeriodId);
        //添加后台导出参数
        var input5 = $('<input>');
        input5.attr('type', 'hidden');
        input5.attr('name', "empTypes");
        input5.attr('value', empTypeStr);
        //添加后台导出参数
        var input6 = $('<input>');
        input6.attr('type', 'hidden');
        input6.attr('name', "type");
        input6.attr('value', '1');
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.append(input5);   //将查询参数控件提交到表单上
        form.append(input6);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");
    };

    //工资报表：名称查询  回车查询
    $('#nameOrCodeByCal').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByCal();
            return false;
        }
    });

    //个税报表：名称查询  回车查询
    $('#nameOrCodeByTax').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByTax();
            return false;
        }
    });

    //网银报表：名称查询  回车查询
    $('#nameOrCodeByInternetbank').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByInternetbank();
            return false;
        }
    });

    //名称查询  回车查询
    $('#nameOrCodeByLaborCost').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByLaborCost();
            return false;
        }
    });

    //工资月报：点击查询按钮进行筛选查询
    window.refreshJqGridDataByCal=function () {
        var payPeriodDate = $("#wagePayPeriod").val();
        var empType = $("#empType").val();
        var empTypeStr="";
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        var queryDataPost = {};
        queryDataPost.nameOrCodeByCal = nameOrCodeByCal;
        queryDataPost.queryOrgIds = orgId;
        queryDataPost.payPeriod =payPeriodDate;
        queryDataPost.empTypes = empTypeStr;
        $('#salaryPeriodList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
       $("#salaryPeriodList").jqGrid("setGridParam", {url :hostUrl + 'wage/wagePayHistory/queryValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
        return false;
    };

    //个税-点击查询按钮进行筛选查询
    window.refreshJqGridDataByTax=function () {
        var payPeriodDate = $("#wagePayPeriod").val();
        var empType = $("#empTypeTax").val();
        var empTypeStr="";
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var nameOrCodeByTax = $("#nameOrCodeByTax").val();
        var orgIdTax = $("#orgIdTax").val();
        var queryDataPost = {};
        queryDataPost.nameOrCodeByCal = nameOrCodeByTax;
        queryDataPost.queryOrgIds = orgIdTax;
        queryDataPost.payPeriod =payPeriodDate;
        queryDataPost.empTypes = empTypeStr;
        $('#taxList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $("#taxList").jqGrid("setGridParam", {url :hostUrl + 'wage/wagePayHistory/queryTaxValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
        return false;
    };

    //网银 - 点击查询按钮进行筛选查询
    window.refreshJqGridDataByInternetbank=function () {
        var payPeriodDate = $("#wagePayPeriod").val();
        var wageRemark = $("#wageRemark").val();
        var wageRemarkStr="";
        if(wageRemark!=null&&wageRemark.length>0){
            for(var i=0;i<wageRemark.length;i++){
                if(wageRemarkStr.length>0){
                    wageRemarkStr+=',';
                }
                wageRemarkStr+=wageRemark[i];
            }
        }
        var nameOrCodeByInternetbank = $("#nameOrCodeByInternetbank").val();
        var orgIdTotal = $("#orgIdTotal").val();
        var queryDataPost = {};
        queryDataPost.nameOrCodeByCal = nameOrCodeByInternetbank;
        queryDataPost.queryOrgIds = orgIdTotal;
        queryDataPost.payPeriod =payPeriodDate;
        queryDataPost.wageRemarks = wageRemarkStr;
        $("#internetbankList").jqGrid("setGridParam", {url :hostUrl + 'wage/wagePayHistory/queryInternetbankValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
        return false;
    };

    //人工成本 - 点击查询按钮进行筛选查询
    window.refreshJqGridDataByLaborCost=function () {
        var payPeriodDate = $("#wagePayPeriod").val();
        var empType = $("#empTypeByLaborCost").val();
        var empTypeStr="";
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var nameOrCodeByLaborCost= $("#nameOrCodeByLaborCost").val();
        var orgIdByLaborCost = $("#orgIdByLaborCost").val();
        var queryDataPost = {};
        queryDataPost.nameOrCodeByCal = nameOrCodeByLaborCost;
        queryDataPost.queryOrgIds = orgIdByLaborCost;
        queryDataPost.payPeriod =payPeriodDate;
        queryDataPost.empTypes = empTypeStr;
        $('#laborCostList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $("#laborCostList").jqGrid("setGridParam", {url :hostUrl + 'wage/wagePayHistory/queryLaborCostByRecopt', postData: queryDataPost}).trigger("reloadGrid");
        return false;
    };

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
    };


    $(function () {

        queryAuth();

        initYear();
        //页面加载完毕后更改grid宽高
        $.xljUtils.resizeNestedGrid();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        $('#empType').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "显示状态",
            minimumCountSelected: 10
        });
        $('#empTypeTax').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "显示状态",
            minimumCountSelected: 10
        });
        $('#wageRemark').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "注释",
            minimumCountSelected: 10
        });
        $('#empTypeByLaborCost').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "显示状态",
            minimumCountSelected: 10
        });

        $('#valueEmptyOrg').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });
        //清除input框内容
        $('#valueEmptyOrgTax').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });
        //清除input框内容
        $('#valueEmptyOrgByLaborCost').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });

        resizeGrid();

        //initSalaryPeriodList();
    });

})(jQuery, window, document);