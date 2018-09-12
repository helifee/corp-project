
;(function ($, window, document, undefined) {

    var personListData;//机构对象
    var payPeriodId;//操作期间ID
    var jqgridCalculate;
    var showModel = [];//展示的具体内容

    //计算高度
    window.resizeHeight = function () {
        var w_h = $(window).height();
        $(".con-table .mytable").height((w_h - 150)+ "px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 160);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 40);
    };

    //grid 自适应宽度
    $(window).resize(function () {
       resizeHeight();
        resizeGrid();
    });

    //清空组织机构
    window.emptyOrg=function() {
        $("#orgId").val("");
        $("#orgName").val("");
    };

    window.orgCallback=function(data) {
        $("#orgId").val(data.id);
        $("#orgName").val(data.name);
    };

    //初始化页面
    window.yearAwardReportList=function(){
        if(payPeriodId!=null&&payPeriodId!='') {
            showModel = [];
            //需要展示的所有记录
            showModel.push({name: 'id', label: 'id', editable: true, hidden: true, key: true});
            showModel.push({name: 'personId', label: 'personId', editable: true, hidden: true});
            showModel.push({name: 'realName', label: '姓名', editable: false, align: 'center',width:120});
            showModel.push({name: 'mobile', label: '手机号', editable: false, align: 'center',width:160});
            showModel.push({name: 'prefixName', label: '所属机构', editable: false,align: 'center',width:220});
            showModel.push({name: 'postition', label: '职务', editable: false,align: 'center',width:100, hidden: true});
            showModel.push({name: 'workStatus', label: '员工状态', editable: false,  align: 'center',width:120, hidden: true});
            showModel.push({name: 'entryTime', label: '入职时间', editable: false,align: 'center',width:130,formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}});
            showModel.push({name: 'leaveTime', label: '离职时间', editable: false,align: 'center',width:130,formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}});
            showModel.push({name: 'ssalary', label: '应发年终奖',editable: false, align: 'center',width:160});
            showModel.push({name: 'taxableIncome', label: '应纳税所得额',editable: false, align: 'center',width:160});
            showModel.push({name: 'contrastTaxableIncome', label: '对比工资应纳税所得额',editable: false, align: 'center',width:160, hidden: true});
            showModel.push({name: 'individualTax', label: '个人所得税', editable: false,align: 'center',width:160});
            showModel.push({name: 'fsalary', label: '实发年终奖', editable: false, align: 'center',width:160});

            jqgridCalculate = jQuery("#yearAwardRepotList").jqGrid({
                url: hostUrl + 'wage/wageAnnualBonus/queryValueListByRecopt',//创建完成之后请求数据的url
                ajaxGridOptions: {contentType: 'application/json'},
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                contentType: "application/json",
                postData: {"payPeriodId":payPeriodId},
                datatype: "json",
                autowidth: true,
                height: $(window).height() - 200,
                shrinkToFit:true,
                sortable: false,//支持标题栏单击排除查询
                rownumbers: true,
                jsonReader: {
                    root:"result",
                    repeatitems: false
                },
                cellEdit: false,//不可编辑
                multiselect: true,
                multiboxonly: true,//只能通过复选框进行多选
                colModel:showModel,//动态表格
                rowNum: -1,//一页显示多少条 -1全部
                gridComplete: function () { //滚动条
                    $. xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadComplete: function (xhr) {
                    if (!xhr.success) {
                        $.xljUtils.tip("blue", "查询数据失败！");
                    } else {
                        personListData=xhr.result;
                    }
                }
            });
        }else {
            pop_tip_open("blue", "当前期间未归档，没有月报需要展示！");
        }

    };

    //导出
    window.exportInfo = function () {

        var urlBody = "wage/wageAnnualBonus/importInfoByRecopt?"+window.parent.JZY.s.getAccessTokenByAuthorization();
        var urlAll = hostUrl + urlBody;

        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        // var workStatus = $("#workStatus").val();
        // var workStatusStr="";
        // if(workStatus!=null&&workStatus.length>0){
        //     for(var i=0;i<workStatus.length;i++){
        //         if(workStatusStr.length>0){
        //             workStatusStr+=',';
        //         }
        //         workStatusStr+=workStatus[i];
        //     }
        // }
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', "payPeriodId");
        input1.attr('value', payPeriodId);
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
        // //添加后台导出参数
        // var input4 = $('<input>');
        // input4.attr('type', 'hidden');
        // input4.attr('name', "workStatus");
        // input4.attr('value', workStatusStr);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        // form.append(input4);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");
    };

    //点击查询按钮进行筛选查询
    window.refreshJqGridDataByCal=function () {
        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        var wrokStatus = $("#wrokStatus").val();
        var wrokStatusStr="";
        if(wrokStatus!=null&&wrokStatus.length>0){
            for(var i=0;i<wrokStatus.length;i++){
                if(wrokStatusStr.length>0){
                    wrokStatusStr+=',';
                }
                wrokStatusStr+=wrokStatus[i];
            }
        }
        var queryDataPost = {};
        queryDataPost.payPeriodId = payPeriodId;
        queryDataPost.nameOrCodeByCal = nameOrCodeByCal;
        queryDataPost.queryOrgIds = orgId;
        queryDataPost.wrokStatus = wrokStatusStr;
        $("#yearAwardRepotList").jqGrid("setGridParam", {url :hostUrl + 'wage/wageAnnualBonus/queryValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
    };


    //查询用户功能权限  add by tangsq since 20180124
    window.queryAuth = function () {
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
                                $("#importBtn").show();//导出
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    //返回
    window.goBack=function (){
        window.location.href="wage_year_award_calculate.html";
    };

    $(function () {

        payPeriodId = localStorage.getItem('payPeriodId');
        if (payPeriodId && payPeriodId != undefined && payPeriodId != 'undefined' && payPeriodId != null) {
            payPeriodId = JSON.parse(payPeriodId);
        }

        //要手动remove
        // localStorage.removeItem('payPeriodId');

        //初始化高度
//        resizeHeight();
        queryAuth();//查询用户权限
        yearAwardReportList();
        resizeGrid();
        // $('#workStatus').multipleSelect({
        //     width: '150px',
        //     filter: true,
        //     addTitle: true,
        //     placeholder: "人员状态",
        //     minimumCountSelected: 10
        // });
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });
        $('#valueEmpty1').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });
        $('#valueEmptyOrg').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });

        //名称查询  回车查询
        $('#nameOrCodeByCal').bind('keypress',function(event){
            if(event.keyCode == "13") {
                refreshJqGridDataByCal();
            }
        });
    });

})(jQuery, window, document);