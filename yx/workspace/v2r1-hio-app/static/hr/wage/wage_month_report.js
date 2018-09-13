;(function ($,window,document,undefined) {

    /**
     * @author ruanxin
     */
        //工资报表
    var jqgridWage;
    //薪资个税税率表设置
    var jqGridTaxRate;
    //劳务人员个税设置
    var jqGridLabourTaxRate;

    var rowData;//当前选中数据
    var rowDataBefore;//上一次选中数据
    var totalYear = new Date().getFullYear();//获取当前归属年度
    var focusW;//第二页聚焦

    var payPeriod;//发薪期间
    var payPeriodId;//发薪期间Id

    var showModel = [];//工资报表表头信息

    //计算高度
    window.resizeHeight = function () {
//        //左侧  头部底部为60px  title类 为50px
//        var w_h = $(window).height();
//        $(".con-table .mytable").height((w_h - 110) + "px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        //解决切换页面大小出现滚动条、切换页面百分比页面出现空白的问题
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 200);
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 40);
        $('#wageSalaryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#wageSalaryList').jqGrid('setFrozenColumns');

        $('#taxList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#taxList').jqGrid('setFrozenColumns');

        $('#laborCostList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#laborCostList').jqGrid('setFrozenColumns');
        // 冻结列样式
        $.xljUtils.setFrozenColumnStyle(41);
    };


    //grid 自适应宽度
    $(window).resize(function () {
        //resizeHeight();
        resizeGrid();
    });


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
                                $("#wageExportInfoBtn").show();//导出
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
    window.initWageSalaryList = function () {
        if(payPeriodId!=null&&payPeriodId!='') {
            $.ajax({
                url: hostUrl + 'wage/wagePayHistory/queryFileListByRecopt',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                type: "POST",
                data: JSON.stringify({payPeriodId:payPeriodId}),
                success: function(resultData) {
                    var data = resultData.result;//所有具体的值信息
                    showModel = [];//所有信息
                    var tempShowField = data.showField;//查询出来的除默认展示字段外的其他需要展示字段
                    payPeriod = data.payPeriod;//展示的期间相关信息
                    if(payPeriod !=null && payPeriod != undefined && payPeriod != 'undefined'&&payPeriod.status=='3') {

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
                        jqgridWage = jQuery("#wageSalaryList").jqGrid({
                            url: hostUrl + 'wage/wagePayHistory/queryValueListByRecopt',//创建完成之后请求数据的url
                            ajaxGridOptions: {contentType: 'application/json'},
                            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                            contentType: "application/json",
                            postData: {"payPeriodId": payPeriod.sid},
                            datatype: "json",
                            sortable: false,//支持标题栏单击排除查询
//                            width: $('.mytable').width(),
//                            height: $('.mytable').height() - 45,
                            height: $(window).height() - 190,
                            // width: $(window).width() - 40,
                            autowidth: true,
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
                                $('#taxList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                                $('#taxList').jqGrid('setFrozenColumns');
                                $('#internetbankList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                                $('#internetbankList').jqGrid('setFrozenColumns');
                                $('#laborCostList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                                $('#laborCostList').jqGrid('setFrozenColumns');
                                $('#wageSalaryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                                $('#wageSalaryList').jqGrid('setFrozenColumns');
                            },
                            loadComplete:function () {
                                $.xljUtils.setFrozenColumnStyle(41);
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
        if(payPeriodId!=null&&payPeriodId!='') {
            jqgridWage = jQuery("#taxList").jqGrid({
                url: hostUrl + 'wage/wagePayHistory/queryTaxValueListByRecopt',//创建完成之后请求数据的url
                ajaxGridOptions: {contentType: 'application/json'},
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                contentType: "application/json",
                postData: {"payPeriodId": payPeriodId},
                datatype: "json",
                height: $(window).height() - 200,
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
                    $('#taxList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                    $('#taxList').jqGrid('setFrozenColumns');
                    $('#internetbankList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                    $('#internetbankList').jqGrid('setFrozenColumns');
                    $('#laborCostList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                    $('#laborCostList').jqGrid('setFrozenColumns');
                    $('#wageSalaryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                    $('#wageSalaryList').jqGrid('setFrozenColumns');
                    $.xljUtils.setFrozenColumnStyle(41);
                },
                loadComplete:function () {
                    $.xljUtils.setFrozenColumnStyle(41);
                }
            });
            // 设置二级表头 (样式变形)
            // $("#taxList").jqGrid('setGroupHeaders', {
            //     useColSpanStyle: true,//是否合并其他空单元格
            //     groupHeaders: [{
            //         startColumnName : "endowment_emp_total",//合并列的起始位置 colModel中的name
            //         numberOfColumns : 8, //合并列数 包含起始列
            //         titleText : "税前扣除项目"//表头
            //     }]
            // });
        }else {
            pop_tip_open("blue", "当前期间未归档，没有月报需要展示！");
        }
    };

    //网银数据
    window.initInternetbankList = function () {
        if(payPeriodId!=null&&payPeriodId!='') {
            jqgridWage = jQuery("#internetbankList").jqGrid({
                url: hostUrl + 'wage/wagePayHistory/queryInternetbankValueListByRecopt',//创建完成之后请求数据的url
                ajaxGridOptions: {contentType: 'application/json'},
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                contentType: "application/json",
                postData: {"payPeriodId": payPeriodId},
                datatype: "json",
                sortable: false,//支持标题栏单击排除查询
                height: $(window).height() - 200,
                width: $(window).width() - 40,
                shrinkToFit:true,
                rownumbers: true,
                multiselect: true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader: {
                    "root":"result",
                    repeatitems: false
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
                    $('#taxList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                    $('#taxList').jqGrid('setFrozenColumns');
                    $('#internetbankList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                    $('#internetbankList').jqGrid('setFrozenColumns');
                    $('#laborCostList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                    $('#laborCostList').jqGrid('setFrozenColumns');
                    $('#wageSalaryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                    $('#wageSalaryList').jqGrid('setFrozenColumns');
                },
                loadComplete:function () {
                    $.xljUtils.setFrozenColumnStyle(41);
                }
            });

        }else {
            pop_tip_open("blue", "当前期间未归档，没有月报需要展示！");
        }
    };

    //人工成本
    window.initLaborCost= function () {
        if(payPeriodId!=null&&payPeriodId!='') {
            $.ajax({
                url: hostUrl + 'wage/wagePayHistory/queryFileListByRecopt',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                type: "POST",
                data: JSON.stringify({payPeriodId:payPeriodId}),
                success: function(resultData) {
                    var data = resultData.result;//所有具体的值信息
                    showModel = [];//所有信息
                    var tempShowField = data.showField;//查询出来的除默认展示字段外的其他需要展示字段
                    payPeriod = data.payPeriod;//展示的期间相关信息
                    if(payPeriod !=null && payPeriod != undefined && payPeriod != 'undefined'&&payPeriod.status=='3') {

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
                        jqgridWage = jQuery("#laborCostList").jqGrid({
                            url: hostUrl + 'wage/wagePayHistory/queryLaborCostByRecopt',//创建完成之后请求数据的url
                            ajaxGridOptions: {contentType: 'application/json'},
                            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                            contentType: "application/json",
                            postData: {"payPeriodId": payPeriod.sid},
                            datatype: "json",
                            sortable: false,//支持标题栏单击排除查询
                            height: $(window).height() - 200,
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
                                $('#taxList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                                $('#taxList').jqGrid('setFrozenColumns');
                                $('#internetbankList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                                $('#internetbankList').jqGrid('setFrozenColumns');
                                $('#laborCostList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                                $('#laborCostList').jqGrid('setFrozenColumns');
                                $('#wageSalaryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                                $('#wageSalaryList').jqGrid('setFrozenColumns');
                            },
                            loadComplete:function () {
                                $.xljUtils.setFrozenColumnStyle(41);
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

    //工资报表-导出
    window.exportInfo = function () {
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
        input1.attr('name', "nameOrCodeByCal");
        input1.attr('value', nameOrCodeByCal);
        //添加后台导出参数
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', "queryOrgIds");
        input2.attr('value', orgId);
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "payPeriodId");
        input3.attr('value', payPeriodId);
        //添加后台导出参数
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', "empTypes");
        input4.attr('value', empTypeStr);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");
    };

    //个税报表-导出
    window.exportInfoTax = function () {
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
        input1.attr('name', "nameOrCodeByCal");
        input1.attr('value', nameOrCodeByTax);
        //添加后台导出参数
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', "queryOrgIds");
        input2.attr('value', orgIdTax);
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "payPeriodId");
        input3.attr('value', payPeriodId);
        //添加后台导出参数
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', "empTypes");
        input4.attr('value', empTypeStr);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "个税月报导出成功");
    };

    //网银-导出
    window.exportInfoByInternetbank = function () {
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
        input1.attr('name', "nameOrCodeByCal");
        input1.attr('value', nameOrCodeByInternetbank);
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "payPeriodId");
        input3.attr('value', payPeriodId);
        //添加后台导出参数
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', "wageRemarks");
        input4.attr('value', wageRemarkStr);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");
    };

    //人工成本-导出
    window.exportInfoByLaborCost = function () {
        var empType = $("#empTypeByInternetbank").val();
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
        input1.attr('name', "nameOrCodeByCal");
        input1.attr('value', nameOrCodeByLaborCost);
        //添加后台导出参数
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', "queryOrgIds");
        input2.attr('value', orgIdByLaborCost);
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "payPeriodId");
        input3.attr('value', payPeriodId);
        //添加后台导出参数
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', "empTypes");
        input4.attr('value', empTypeStr);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");
    };

    //工资报表：名称查询  回车查询
    $('#nameOrCodeByCal').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByCal();
        }
    });

    //个税报表：名称查询  回车查询
    $('#nameOrCodeByTax').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByTax();
        }
    });

    //网银报表：名称查询  回车查询
    $('#nameOrCodeByInternetbank').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByInternetbank();
        }
    });

    //人工成本：名称查询  回车查询
    $('#nameOrCodeByLaborCost').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByLaborCost();
        }
    });

    //工资报表筛选查询
    window.refreshJqGridDataByCal=function () {
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
        queryDataPost.payPeriodId =payPeriodId;
        queryDataPost.empTypes = empTypeStr;
//        $('#wageSalaryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $("#wageSalaryList").jqGrid("setGridParam", {url :hostUrl + 'wage/wagePayHistory/queryValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
    };

    //人工成本筛选查询
    window.refreshJqGridDataByLaborCost=function () {
        var empType = $("#empTypeByInternetbank").val();
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
        var queryDataPost = {};
        queryDataPost.nameOrCodeByCal = nameOrCodeByLaborCost;
        queryDataPost.queryOrgIds = orgIdByLaborCost;
        queryDataPost.payPeriodId =payPeriodId;
        queryDataPost.empTypes = empTypeStr;
//        $('#laborCostList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $("#laborCostList").jqGrid("setGridParam", {url :hostUrl + 'wage/wagePayHistory/queryLaborCostByRecopt', postData: queryDataPost}).trigger("reloadGrid");
    };

    //个税报表筛选查询
    window.refreshJqGridDataByTax=function () {
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
        queryDataPost.payPeriodId =payPeriodId;
        queryDataPost.empTypes = empTypeStr;
//        $('#taxList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $("#taxList").jqGrid("setGridParam", {url :hostUrl + 'wage/wagePayHistory/queryTaxValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
    };

    //网银报表筛选查询
    window.refreshJqGridDataByInternetbank=function () {
        var empType = $("#wageRemark").val();
        var empTypeStr="";
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var nameOrCodeByInternetbank = $("#nameOrCodeByInternetbank").val();
        var queryDataPost = {};
        queryDataPost.nameOrCodeByCal = nameOrCodeByInternetbank;
        queryDataPost.payPeriodId =payPeriodId;
        queryDataPost.wageRemarks = empTypeStr;
        $("#internetbankList").jqGrid("setGridParam", {url :hostUrl + 'wage/wagePayHistory/queryInternetbankValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
    };

    //初始化日期控件
    window.initDatetimepicker = function () {
        var picker = $('.datetimepicker').datetimepicker({
            language: 'zh-CN', //语言
            format: 'dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });
    };

    //返回上一级
    window.goBack = function () {
        // window.history.go(-1);
        window.location.href="wage_salary_calculate.html?queryFlag=01";
    };

    //初始化jqgrid
    $(function () {
        payPeriodId = localStorage.getItem('payPeriodId');
        if (payPeriodId && payPeriodId != undefined && payPeriodId != 'undefined' && payPeriodId != null) {
            payPeriodId = JSON.parse(payPeriodId);
        }
        //功能权限设置
        queryAuth();

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
        $('#empTypeByInternetbank').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "显示状态",
            minimumCountSelected: 10
        });

        initWageSalaryList();
        initTaxList();//初始化个税报表
        initInternetbankList();//初始化网银报表
        initLaborCost();//初始化人工成本报表

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });

        //清除input框内容
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
        $('#valueEmptyLaborCost').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });

        //初始化日期控件
        initDatetimepicker();


        //初始化宽度
        //resizeGrid();

    });


    //页签切换
    $(".right-content .con-tit button").on("click", function (e) {
        //左侧  头部底部为60px  title类 为50px
        // var w_h = $(window).height();
        // $(".slide-left .ztree-box").height((w_h - 25) + "px");

        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if ($(this).attr('class').indexOf('bytax') > 0) {
            $("#taxDiv").css("display", "block");//个税参数设置为block（显示）
            $("#wageDiv").css("display", "none");//工资报表设置为none（隐藏）
            $("#internetbankDiv").css("display", "none");//网银报表设置为none（隐藏）
            $("#laborCostDiv").css("display", "none");//人工成本为none（隐藏）
            $('#taxList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
            $('#taxList').jqGrid('setFrozenColumns');
            $.xljUtils.setFrozenColumnStyle(41);
        } else if ($(this).attr('class').indexOf('bytotal') > 0) {
            $("#internetbankDiv").css("display", "block");//网银报表设置为block（显示）
            $("#wageDiv").css("display", "none");//工资报表设置为none（隐藏）
            $("#taxDiv").css("display", "none");//个税参数设置为none（隐藏）
            $("#laborCostDiv").css("display", "none");//人工成本为none（隐藏）
            $('#internetbankList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
            $('#internetbankList').jqGrid('setFrozenColumns');
            $.xljUtils.setFrozenColumnStyle(41);
        }  else if ($(this).attr('class').indexOf('byapply') > 0) {
            $("#laborCostDiv").css("display", "block");//人工成本为block（显示）
            $("#wageDiv").css("display", "none");//工资报表设置为none（隐藏）
            $("#taxDiv").css("display", "none");//个税参数设置为none（隐藏）
            $("#internetbankDiv").css("display", "none");//网银报表设置为none（隐藏）
           // $("#laborCostDiv").css("display", "none");//人工成本为none（隐藏）
            $('#laborCostList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
            $('#laborCostList').jqGrid('setFrozenColumns');
            $.xljUtils.setFrozenColumnStyle(41);
            //
        }  else {
            $("#wageDiv").css("display", "block");//工资报表设置为block（显示）
            $("#taxDiv").css("display", "none");//个税参数设置为none（隐藏）
            $("#internetbankDiv").css("display", "none");//网银报表设置为none（隐藏）
            $("#laborCostDiv").css("display", "none");//人工成本为none（隐藏）
            $('#wageSalaryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
            $('#wageSalaryList').jqGrid('setFrozenColumns');
            $.xljUtils.setFrozenColumnStyle(41);

        }
        $.xljUtils.gridResizeFn();
        e.stopPropagation();
    });


})(jQuery,window,document);