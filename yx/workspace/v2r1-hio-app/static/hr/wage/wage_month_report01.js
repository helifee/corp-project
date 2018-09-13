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
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 180);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 40);
        $('#wageSalaryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#wageSalaryList').jqGrid('setFrozenColumns');
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
    window.wageSalaryList = function () {
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
                            height: $(window).height() - 180,
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
                                jQuery("#wageSalaryList").jqGrid('setFrozenColumns');
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

    //导出
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

        // var token = "49109848-ba00-46bd-931f-ba4572ba7e43";
        //
        // var empType = $("#empType").val();
        // var empTypeStr="";
        // if(empType!=null&&empType.length>0){
        //     for(var i=0;i<empType.length;i++){
        //         if(empTypeStr.length>0){
        //             empTypeStr+=',';
        //         }
        //         empTypeStr+=empType[i];
        //     }
        // }
        // var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        // var orgId = $("#orgId").val();
        // var queryDataPost = {};
        // queryDataPost.nameOrCodeByCal = nameOrCodeByCal;
        // queryDataPost.queryOrgIds = orgId;
        // queryDataPost.payPeriodId =payPeriodId;
        // queryDataPost.empTypes = empTypeStr;
        //
        // //表格数据
        // rowData = $('#salaryCalculateList').jqGrid('getRowData');
        // var urlBody = "wage/wagePayHistory/exportInfo";
        // var urlAll = hostUrl + urlBody;
        // $.ajax({
        //     type: 'POST',
        //     url: urlAll,
        //     dataType: 'json',
        //     contentType: 'application/json',
        //     data: JSON.stringify(queryDataPost),
        //     async: false,
        //     success: function (json) {
        //         if (json.success == true) {
        //             var path = json.result;
        //             if (undefined != path && "" != path) {
        //                 var form = $("<form>");   //定义一个form表单
        //                 form.attr('style', 'display:none');   //在form表单中添加查询参数
        //                 form.attr('target', 'exportTarget');
        //                 form.attr('method', 'post');
        //                 form.attr('action', hostUrl + "wage/wagePayHistory/exportInfoClient?access_token=" + token);
        //                 //添加后台导出参数
        //                 var input1 = $('<input>');
        //                 input1.attr('type', 'hidden');
        //                 input1.attr('name', "path");
        //                 input1.attr('value', path);
        //
        //                 $('body').append(form);  //将表单放置在web中
        //                 form.append(input1);   //将查询参数控件提交到表单上
        //                 form.submit();   //表单提交
        //                 pop_tip_open("green", "导出成功");
        //             }
        //         } else {
        //             pop_tip_open("blue", json.message);
        //         }
        //     }, error: function (XMLHttpRequest, textStatus, errorThrown) {
        //         pop_tip_open("red", "导出失败");
        //     }
        // })
    };

    //名称查询  回车查询
    $('#nameOrCodeByCal').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByCal();
        }
    });

    //点击查询按钮进行筛选查询
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
        $('#wageSalaryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $("#wageSalaryList").jqGrid("setGridParam", {url :hostUrl + 'wage/wagePayHistory/queryValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
    };

    //初始化jqgrid
    $(function () {

        payPeriodId = localStorage.getItem('payPeriodId');
        if (payPeriodId && payPeriodId != undefined && payPeriodId != 'undefined' && payPeriodId != null) {
            payPeriodId = JSON.parse(payPeriodId);
        }
        //要手动remove
        // localStorage.removeItem('payPeriodId');

        //功能权限设置
        queryAuth();

        $('#empType').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "显示状态",
            minimumCountSelected: 10
        });

        //初始化高度
        //resizeHeight();
        wageSalaryList();
        // taxRateList();
        // totalList();
        // applyList();
        //页面加载完毕后更改grid宽高
        $.xljUtils.resizeNestedGrid();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmptyOrg').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });
        //初始化日期控件
        initDatetimepicker();



        //页签切换
        $(".right-content .con-tit button").on("click", function (e) {
            //左侧  头部底部为60px  title类 为50px
            var w_h = $(window).height();
            $(".slide-left .ztree-box").height((w_h - 25) + "px");

            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            if ($(this).attr('class').indexOf('bytax') > 0) {
                $("#taxDiv").css("display", "block");//个税参数设置为block（显示）
                $("#wageDiv").css("display", "none");//工资报表设置为none（隐藏）
                $("#totalDiv").css("display", "none");//薪资总额设置为none（隐藏）
                $("#applyDiv").css("display", "none");//审批设置为none（隐藏）
            } else if ($(this).attr('class').indexOf('bytotal') > 0) {
                $("#totalDiv").css("display", "block");//薪资总额设置为block（显示）
                $("#wageDiv").css("display", "none");//工资报表设置为none（隐藏）
                $("#taxDiv").css("display", "none");//个税参数设置为none（隐藏）
                $("#applyDiv").css("display", "none");//审批设置为none（隐藏）
            }  else if ($(this).attr('class').indexOf('byapply') > 0) {
                $("#applyDiv").css("display", "block");//审批设置为block（显示）
                $("#wageDiv").css("display", "none");//工资报表设置为none（隐藏）
                $("#taxDiv").css("display", "none");//个税参数设置为none（隐藏）
                $("#totalDiv").css("display", "none");//薪资总额设置为none（隐藏）
            }  else {
                $("#wageDiv").css("display", "block");//工资报表设置为block（显示）
                $("#taxDiv").css("display", "none");//个税参数设置为none（隐藏）
                $("#totalDiv").css("display", "none");//薪资总额设置为none（隐藏）
                $("#applyDiv").css("display", "none");//审批设置为none（隐藏）
            }
            $.xljUtils.gridResizeFn();
            e.stopPropagation();
        });

        //初始化宽度
        resizeGrid();

    });

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

    //个税报表
    function taxRateList(){
        jqGridTaxRate = jQuery("#taxRateList").jqGrid(
            {
                // url : hostUrl+'wage/wageTaxRate/queryListByType/1',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','序号','姓名' ,'证件类型','证件号码', '所得项目', '所得期间','收入额','免税所得','基本养老保险费',
                    '基本医疗保险费','失业保险费','住房公积金','财产原值','允许扣除的税费','其他'],
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : '序号',sortable:false},
                    {name : 'lowSalaryLimit',label : '姓名', sortable:false,align:'right',width:130},
                    {name : 'topSalaryLimit',label : '证件类型',sortable:false,align:'right',width:130},
                    {name : 'taxRate',label : '证件号码',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '所得项目',sortable:false,align:'right',width:130},
                    {name : 'remark',label : '所得期间',sortable:false,align:'center',width:220},
                    {name : 'remark',label : '收入额',sortable:false,align:'center',width:220},
                    {name : 'remark',label : '免税所得',sortable:false,align:'center',width:220},
                    {name : 'remark',label : '基本养老保险费',sortable:false,align:'center',width:220},
                    {name : 'remark',label : '基本医疗保险费',sortable:false,align:'center',width:220},
                    {name : 'remark',label : '失业保险费',sortable:false,align:'center',width:220},
                    {name : 'remark',label : '住房公积金',sortable:false,align:'center',width:220},
                    {name : 'remark',label : '财产原值',sortable:false,align:'center',width:220},
                    {name : 'remark',label : '允许扣除的税费',sortable:false,align:'center',width:220},
                    {name : 'remark',label : '其他',sortable:false,align:'center',width:220}
                ],
                shrinkToFit:true,
                rownumbers: true,
                multiboxonly: true,//只能通过复选框进行多选
                rowNum: -1,//一页显示多少条 -1全部
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                multiselect: true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    // $(".con-table .mytable").height("300px");
                    rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                        //添加回显选中行样式
                        $('#taxRateList').setSelection(rowDataBefore.id,true);
                        $('#taxRateList '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                    if (focusW == null && focusW != undefined){
                        $("#taxRateList tr").last().find(":input[role='checkbox']").prop('checked', true);
                        $("#taxRateList tr").last().find(":input[role='checkbox']").trigger("click");
                    }
                },
                loadError:function(xhr,status,error){
                    //异常处理
                    // console.log(xhr.status);
                    // if(xhr.status==404){
                    //     $.xljUtils.tip("red","请求url有误！");
                    //     return;
                    // }
                    // if(xhr.status==405){
                    //     $.xljUtils.tip("red","请求方法有误！");
                    //     return;
                    // }
                    // $.xljUtils.tip("red","网络异常,请联系管理员！");
                }
            });
    }

    //网银数据
    function totalList(){
        jqGridLabourTaxRate = jQuery("#totalList").jqGrid(
            {
                // url : hostUrl+'wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colNames : [ 'id','户名','银行账号' ,'金额', '注释'],
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : '户名',sortable:false},
                    {name : 'lowSalaryLimit',label : '银行账号', sortable:false,align:'center',width:130},
                    {name : 'topSalaryLimit',label : '金额',sortable:false,align:'center',width:130},
                    {name : 'taxRate',label : '注释',sortable:false,align:'center',width:80}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                },
                loadError:function(xhr,status,error){
                    // //异常处理
                    // console.log(xhr.status);
                    // if(xhr.status==404){
                    //     $.xljUtils.tip("red","请求url有误！");
                    //     return;
                    // }
                    // if(xhr.status==405){
                    //     $.xljUtils.tip("red","请求方法有误！");
                    //     return;
                    // }
                    // $.xljUtils.tip("red","网络异常,请联系管理员！");
                }
            });
    }

    //人工成本
    function applyList(){
        jqGridLabourTaxRate = jQuery("#applyList").jqGrid(
            {
                // url : hostUrl+'wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colNames : [ 'id','所属机构' ,'姓名','手机号','入职时间','离职时间','基本工资','岗位工资','保密津贴','司龄工资',
                    '交通补助','通讯补助','电脑补助','迟到扣款','早退扣款','旷工扣款','事假扣款','应纳税所得额','个税','实发工资',
                    '社保公积金企业','企业人工成本'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,sortable:false,hidden:true},
                    {name : 'wageBalanceDate',label : '所属机构',editable:true, sortable:false,align:'center',width:120},
                    {name : 'wageWay',label : '姓名',editable:true,sortable:false,align:'center',width:150},
                    {name : 'orgName',label : '手机号',editable:true,sortable:false,align:'center'},
                    {name : 'prefixName',label : '入职时间',editable:true,sortable:false,align:'center',width:280},
                    {name : '1',label : '离职时间',editable:true,sortable:false,align:'center',width:280},
                    {name : '2',label : '基本工资',editable:true,sortable:false,align:'center',width:280},
                    {name : '3',label : '岗位工资',editable:true,sortable:false,align:'center',width:280},
                    {name : '4',label : '保密津贴',editable:true,sortable:false,align:'center',width:280},
                    {name : '5',label : '司龄工资',editable:true,sortable:false,align:'center',width:280},
                    {name : '6',label : '交通补助',editable:true,sortable:false,align:'center',width:280},
                    {name : '7',label : '通讯补助',editable:true,sortable:false,align:'center',width:280},
                    {name : '8',label : '电脑补助',editable:true,sortable:false,align:'center',width:280},
                    {name : '9',label : '迟到扣款',editable:true,sortable:false,align:'center',width:280},
                    {name : '10',label : '早退扣款',editable:true,sortable:false,align:'center',width:280},
                    {name : '11',label : '旷工扣款',editable:true,sortable:false,align:'center',width:280},
                    {name : '12',label : '事假扣款',editable:true,sortable:false,align:'center',width:280},
                    {name : '13',label : '应纳税所得额',editable:true,sortable:false,align:'center',width:280},
                    {name : '14',label : '个税',editable:true,sortable:false,align:'center',width:280},
                    {name : '15',label : '实发工资',editable:true,sortable:false,align:'center',width:280},
                    {name : '16',label : '社保公积金企业',editable:true,sortable:false,align:'center',width:280},
                    {name : '17',label : '企业人工成本',editable:true,sortable:false,align:'center',width:280}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                },
                loadError:function(xhr,status,error){
                    // //异常处理
                    // console.log(xhr.status);
                    // if(xhr.status==404){
                    //     $.xljUtils.tip("red","请求url有误！");
                    //     return;
                    // }
                    // if(xhr.status==405){
                    //     $.xljUtils.tip("red","请求方法有误！");
                    //     return;
                    // }
                    // $.xljUtils.tip("red","网络异常,请联系管理员！");
                }
            });
    }

    //返回上一级
    window.goBack = function () {
        // window.history.go(-1);
        window.location.href="wage_salary_calculate.html?queryFlag=01";
    };

})(jQuery,window,document);