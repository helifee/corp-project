;(function ($,window,document,undefined) {

    var jqgridCalculate;

    //计算表格高度
    window.resizeHeight = function() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".con-table .mytable").height((w_h - 180) + "px");
    };

    //计算表格宽度
    window.resizeGrid = function() {
        // //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 200);
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 40);
    };

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

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
                                $("#exportInfoBtn").show();//导出
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    //涉及年度查询
    window.initWageYear = function(str) {
        var nowYear;
        $.ajax({    //查询所有的历史计薪期间
            type: "POST",
            url:hostUrl+ "wage/wageAnnualBonus/queryYearList",
            dataType: "JSON",
            async:false,
            data: JSON.stringify({}),
            contentType:"application/json",
            success: function(resultData) {
                if(resultData.success) {
                    var data = resultData.result.yearList;//所有具体的值信息
                    var payTime = resultData.result.payTime;
                    var totalSsalaryMap = resultData.result.totalSsalaryMap;
                    var totalFsalaryMap = resultData.result.totalFsalaryMap;
                    var monthDiv = "";

                    if(data!=null) {
                        for(var k in data){
                            var wageYear = data[k];
                            var tempSsalaryTotal = "0";
                            if(totalSsalaryMap[data[k]]!=null&&totalSsalaryMap[data[k]]!='') {
                                tempSsalaryTotal = totalSsalaryMap[data[k]];
                            }
                            var tempFsarlayTotal = "0";
                            if(totalFsalaryMap[data[k]]!=null&&totalFsalaryMap[data[k]]!='') {
                                tempFsarlayTotal = totalFsalaryMap[data[k]];
                            }

                            monthDiv = monthDiv + "<div class=\"user-list\" style=\"border:1px solid black;height: 80px;line-height: 73px\"><span><span class=\"expend-col\" onclick=\"showExpendDiv('"+data[k]+"')\"><i></i></span>"+
                                "<span class=\"tit-big\">"+wageYear+"年终奖报表</span>&nbsp;&nbsp;&nbsp;<span class=\"tit-big\">"+payTime[data[k]]+"</span></span>"+
                                "<div class=\"my-btn-group\"><span class=\"tit-big\"> 应发年终奖合计"+parseFloat(tempSsalaryTotal).toFixed(3)+"|</span>" +
                                "<span class=\"tit-big\"> 实发年终奖合计"+parseFloat(tempFsarlayTotal).toFixed(3)+"</span></div></div><div id=\""+data[k]+"\"></div>";
                            $("#monthDiv").html(monthDiv);
                        }
                    }
                }else {
                    pop_tip_open("blue", resultData.message);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    };

    //年终奖报表
    window.salaryPeriodList = function() {
        var wageYear = $("#wageYear").val();
        if(wageYear!=null&&wageYear!='') {
            var showModel = [];
            //需要展示的所有记录
            showModel.push({name: 'id', label: 'id', editable: true, hidden: true, key: true});
            showModel.push({name: 'personId', label: 'personId', editable: true, hidden: true});
            showModel.push({name: 'realName', label: '姓名', editable: false, align: 'center',width:100});
            showModel.push({name: 'mobile', label: '手机号', editable: false, align: 'center',width:140});
            showModel.push({name: 'prefixName', label: '所属机构', editable: false,align: 'center',width:200});
            showModel.push({name: 'postition', label: '职务', editable: false,align: 'center', hidden: true});
            showModel.push({name: 'workStatus', label: '员工状态', editable: false,  align: 'center', hidden: true});
            showModel.push({name: 'entryTime', label: '入职时间', editable: false,align: 'center',width:120,formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}});
            showModel.push({name: 'leaveTime', label: '离职时间', editable: false,align: 'center',width:120,formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}});
            showModel.push({name: 'ssalary', label: '应发年终奖',editable: false, align: 'center',width:100});
            showModel.push({name: 'taxableIncome', label: '应纳税所得额',editable: false, align: 'center',width:100});
            showModel.push({name: 'contrastTaxableIncome', label: '对比工资应纳税所得额',editable: false, align: 'center',width:160, hidden: true});
            showModel.push({name: 'individualTax', label: '个人所得税', editable: false,align: 'center',width:100});
            showModel.push({name: 'fsalary', label: '实发年终奖', editable: false, align: 'center',width:100});

            jqgridCalculate = jQuery("#salaryPeriodList").jqGrid({
                url: hostUrl + 'wage/wageAnnualBonus/queryValueListByRecopt',//创建完成之后请求数据的url
                ajaxGridOptions: {contentType: 'application/json'},
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                contentType: "application/json",
                postData: {"wageYear":wageYear},
                datatype: "json",
                autowidth: true,
                height: $('.mytable').height() - 45,
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
                    }
                }
            });
        }else {
            pop_tip_open("blue", "没有月报需要展示！");
        }
    };

    //刷新grid
    window.reloadGrid=function(){
        $.xljUtils.tip("green","数据操作成功！");
        $('#salaryPeriodList').jqGrid().trigger("reloadGrid");
    };

    //清除文本选中内容
    window.clearValue = function (id1,id2) {
        $("#"+id1).val("");
        $("#"+id2).val("");
    };

    /**
     * 显示/隐藏切换
     */
    window.showExpendDiv = function(str){
        // $(this).toggleClass("col");
        $("#wageYear").val(str);
        //给rowDiv进行赋值操作
        salaryPeriodList();
        //挪动rowDiv到点击div下方
        // var x = document.getElementById(str);
        // var p = document.getElementById('rowDiv');
        var x = $('#'+str).eq(0);
        var p = $('#rowDiv').eq(0);
        // x.insertBefore(p, x.childNodes[0]);
        x.after(p);
        var mytable = $("#rowDiv").eq(0);
        if($("#month1").val()!=str){
            mytable.hide();
        }
        if(mytable.is(":hidden")==true){
            $("#month1").val(str);
            mytable.show();
        }else{
            mytable.hide();
        }
        $.xljUtils.gridResizeFn();
    };

    //返回上一级
    window.goBack = function () {
        window.location.href="wage_year_award_calculate.html";
    };

    $("#closeDivWindow").click(function(){
        var mytable = $("#rowDiv").eq(0);
        mytable.hide();
    });

    //导出
    window.exportInfo = function () {

        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();

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
        var wageYear = $("#wageYear").val();
        var urlBody = "wage/wageAnnualBonus/importInfoByRecopt?"+window.parent.JZY.s.getAccessTokenByAuthorization();
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
        input3.attr('name', "wageYear");
        input3.attr('value', wageYear);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");
    };

    //查询方法
    window.refreshJqGridDataByCal=function () {
        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
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
        var queryDataPost = {};
        queryDataPost.nameOrCodeByCal = nameOrCodeByCal;
        queryDataPost.queryOrgIds = orgId;
        // queryDataPost.empTypes = empTypeStr;
        $("#salaryPeriodList").jqGrid("setGridParam", {url :hostUrl +'wage/wageAnnualBonus/queryValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
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
        queryAuth();//查询用户权限

        initWageYear();//初始化列表
        //初始化高度
        resizeHeight();
        //页面加载完毕后更改grid宽高
        $.xljUtils.resizeNestedGrid();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });

        // $('#empType').multipleSelect({
        //     width: '150px',
        //     filter: true,
        //     addTitle: true,
        //     placeholder: "显示状态",
        //     minimumCountSelected: 10
        // });

        //在加载完表格后，设置表格的宽度
        resizeGrid();
    });


})(jQuery, window, document);