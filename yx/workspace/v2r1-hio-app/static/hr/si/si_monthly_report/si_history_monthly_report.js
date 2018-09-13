;(function ($,window,document,undefined) {
    var jqGridUser;

    //计算表格高度
    window.resizeHeight = function() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".con-table .mytable").height((w_h - 180) + "px");
    };

    //计算表格宽度
    window.resizeGrid = function() {
        $.xljUtils.addGridScroll();
        // //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 200);
        $('#salaryPeriodList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#salaryPeriodList').jqGrid('setFrozenColumns');
        // 冻结列样式
        $.xljUtils.setFrozenColumnStyle(41);
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

    //查询用户功能权限
    window.queryAuth=function(){
        $.ajax({
            type:'POST',
            url:hostUrl+"auth/authData/queryAuthorizationBtnList",
            dataType:'JSON',
            contentType:'application/json',
            async:false,//设置为同步
            data:JSON.stringify({"menuCode":"hr_social"}),
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
    window.initYear = function(str) {
        var nowYear;
        $.ajax({    //查询所有的历史计薪期间
            type: "POST",
            url:hostUrl+ "si/siCalculate/queryYearList",
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
                    var unitPay = resultData.result.unitPay;
                    var empPay = resultData.result.empPay;
                    var totalPay = resultData.result.totalPay;
                    var monthDiv = "";
                    if(data1!=null) {
                        for(var k in data1){
                            var tempData1 = data1[k].substring(0,4);
                            var month = data1[k].substr(5);
                            if(tempData1==nowYear){
                                var tempUnitTotal = "0";
                                if(unitPay[data1[k]]!=null&&unitPay[data1[k]]!='') {
                                    tempUnitTotal = unitPay[data1[k]];
                                }
                                var tempEmpTotal = "0";
                                if(empPay[data1[k]]!=null&&empPay[data1[k]]!='') {
                                    tempEmpTotal = empPay[data1[k]];
                                }
                                var tempTotal = "0";
                                if(totalPay[data1[k]]!=null&&totalPay[data1[k]]!='') {
                                    tempTotal = totalPay[data1[k]];
                                }

                                monthDiv = monthDiv + "<div class=\"user-list clearfix\" style=\"height: 80px;line-height: 73px\">"
                                + "<span class='l'><span class=\"expend-col\" onclick=\"showExpendDiv('" + data1[k] + "')\"><i></i></span>"
                                + "<span class=\"tit-big\"><span class=\"tit-big-title\">" + month + "月</span>社保报表</span></br>" 
                                + "<span class=\"tit-big-time\">" + payTime[data1[k]] + "</span>" 
                                + "</span>"
                                + "<div class=\"my-btn-group\">"
                                + "<span class=\"tit-big\"> 企业缴纳</br><span class='tb_f'>" + parseFloat(tempUnitTotal).toFixed(3) + "</span></span>"
                                + "<span class=\"tit-big\"> 个人缴纳</br><span class='tb_f'>"+parseFloat(tempEmpTotal).toFixed(3)+"</span></span>"
                                + "<span class=\"tit-big\"> 合计</br><span class='tb_f'>"+parseFloat(tempTotal).toFixed(3)+"</span></span>"
                                + "</div></div><div id=\""+data1[k]+"\"></div>";
                            }
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


    $(function () {
        queryAuth();//查询用户权限

        initYear();//初始化年度
        //初始化高度
        resizeHeight();
        //页面加载完毕后更改grid宽高
        $.xljUtils.resizeNestedGrid();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        getSocialPayArea(socialPayAreaSetId);
        $('#socialPayArea').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "户口性质",
            minimumCountSelected: 10
        });
        $('#empType').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "显示状态",
            minimumCountSelected: 10
        });

        //在加载完表格后，设置表格的宽度
        resizeGrid();
    });

    //社保报表
    window.salaryPeriodList = function() {
        var siTime = $("#siTime").val();
        if(siTime!=null&&siTime!='') {
            $.ajax({
                url: hostUrl + 'si/siCalculate/queryFileListByCalculate',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                type: "POST",
                data: JSON.stringify({}),
                success: function(resultData) {
                    var data = resultData.result;//所有具体的值信息
                    showModel = [];//所有信息
                    var tempShowField = data.showField;//查询出来的除默认展示字段外的其他需要展示字段
                    //当前操作的最新期间
                    var calculateDate = data.calculateDate;
                    if(calculateDate!=null) {

                        //需要展示的所有记录
                        showModel.push({name: 'id', label: 'id', hidden: true, key: true,frozen:true});
                        showModel.push({name: 'personId', label: 'personId',hidden: true,frozen:true});
                        showModel.push({name: 'realName', label: '姓名',align: 'center',width:100,frozen:true});
                        showModel.push({name: 'mobile', label: '手机号', align: 'center',width:120,frozen:true});
                        showModel.push({name: 'prefixName', label: '所属机构', align: 'center',width:200, frozen: true});
                        showModel.push({name: 'entryTime', label: '入职时间',align: 'center',width:120});
                        showModel.push({name: 'leaveTime', label: '离职时间', align: 'center',width:120});
                        showModel.push({name: 'person_type', label: '显示状态',align: 'center',width:160});
                        showModel.push({name: 'siPayAreaName', label: '社保缴纳地',align: 'center',width:160});
                        showModel.push({name: 'socialPayAreaName', label: '户口性质',align: 'center',width:160});
                        showModel.push({name: 'fundPayAreaName', label: '公积金缴纳地',align: 'center',width:160});

                        var shrinkToFit=0;
                        if(tempShowField!=null&&tempShowField!=''&&tempShowField.length>0) {
                            for(var i in tempShowField) {
                                var temp = {name:tempShowField[i].code ,label : tempShowField[i].name,  width: 150, align:'center'};
                                showModel.push(temp);
                                shrinkToFit++;
                            }
                        }
                        jqgridCalculate = jQuery("#salaryPeriodList").jqGrid({
                            url: hostUrl + 'si/siCalculate/queryValueListByRecopt',//创建完成之后请求数据的url
                            ajaxGridOptions: {contentType: 'application/json'},
                            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                            contentType: "application/json",
                            postData: {"siTime":siTime,"accountStatus":"2"},
                            datatype: "json",
                            autowidth: true,
                            height: $('.mytable').height() - 45,
                            shrinkToFit:shrinkToFit>3?false:true,
                            sortable: false,//支持标题栏单击排除查询
                            multiselect: true,
                            multiboxonly: true,//只能通过复选框进行多选
                            rownumbers: true,
                            jsonReader: {
                                root:"result",
                                repeatitems: false
                            },
                            colModel:showModel,//动态表格
                            rowNum: -1,//一页显示多少条 -1全部
                            gridComplete: function () { //滚动条
                                $. xljUtils.addGridScroll();
                                $.xljUtils.gridResizeFn();
                                //冻结列
                                jQuery("#salaryPeriodList").jqGrid('setFrozenColumns');
                            },
                            loadComplete: function (xhr) {
                                $.xljUtils.setFrozenColumnStyle(41);
                                if (!xhr.success) {
                                    switch (xhr.code) {
                                        case "50000":
                                            $.xljUtils.tip("red", xhr.message);
                                            break;
                                        case "50001":
                                            $.xljUtils.tip("red", xhr.message);
                                            break;
                                        case "50002":
                                            $.xljUtils.tip("blue", xhr.message);
                                            break;
                                        case "50003":
                                            $.xljUtils.tip("red", xhr.message);
                                            break;
                                        default:
                                            $.xljUtils.tip("red", "查询数据失败！");
                                            break;
                                    }
                                } else {
                                    personListData=xhr.result;
                                }
                            }
                        });
                    } else {
                        pop_tip_open("blue", "没有月报需要展示！");
                        return false;
                    }
                }

            });
        }else {
            pop_tip_open("blue", "当前期间未归档，没有月报需要展示！");
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
        $("#siTime").val(str);
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
        // window.history.go(-1);
        window.location.href="../si_file/si_file.html?queryFlag=01";
    };

    $("#closeDivWindow").click(function(){
        var mytable = $("#rowDiv").eq(0);
        mytable.hide();
    });

    //导出
    window.exportInfo = function () {
        var urlBody = "si/siCalculate/exportInfo";
        var urlAll = hostUrl + urlBody;

        var nameOrMobile = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        var socialPayArea = $("#socialPayArea").val();
        var fundPayArea = $("#fundAreaId").val();//公积金缴纳地
        var siPayArea = $("#siAreaId").val();
        var socialPayAreaStr="";
        var empType = $("#empType").val();
        var empTypeStr="";
        if(socialPayArea!=null&&socialPayArea.length>0){
            for(var i=0;i<socialPayArea.length;i++){
                if(socialPayAreaStr.length>0){
                    socialPayAreaStr+=',';
                }
                socialPayAreaStr+=socialPayArea[i];
            }
        }
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var siTime = $("#siTime").val();
        var urlBody = "si/siCalculate/exportInfo?"+window.parent.JZY.s.getAccessTokenByAuthorization();
        var urlAll = hostUrl + urlBody;
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', "nameOrMobile");
        input1.attr('value', nameOrMobile);
        //添加后台导出参数
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', "queryOrgIds");
        input2.attr('value', orgId);
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "siPayAreas");
        input3.attr('value', siPayArea);
        //添加后台导出参数
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', "fundPayAreas");
        input4.attr('value', fundPayArea);
        //添加后台导出参数
        var input5 = $('<input>');
        input5.attr('type', 'hidden');
        input5.attr('name', "socialPayAreas");
        input5.attr('value', socialPayAreaStr);
        //添加后台导出参数
        var input6 = $('<input>');
        input6.attr('type', 'hidden');
        input6.attr('name', "empTypes");
        input6.attr('value', empTypeStr);
        //添加后台导出参数
        var input7 = $('<input>');
        input7.attr('type', 'hidden');
        input7.attr('name', "siTime");
        input7.attr('value', siTime);
        //添加后台导出参数
        var input8 = $('<input>');
        input8.attr('type', 'hidden');
        input8.attr('name', "accountStatus");
        input8.attr('value', "2");
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.append(input5);   //将查询参数控件提交到表单上
        form.append(input6);   //将查询参数控件提交到表单上
        form.append(input7);   //将查询参数控件提交到表单上
        form.append(input8);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");

        // var token = "49109848-ba00-46bd-931f-ba4572ba7e43";
        //
        // //表格数据
        // rowData = $('#siRepotList').jqGrid('getRowData');
        // var urlBody = "si/siCalculate/exportInfo";
        // var urlAll = hostUrl + urlBody;
        //
        // var nameOrMobile = $("#nameOrCodeByCal").val();
        // var orgId = $("#orgId").val();
        // var socialPayArea = $("#socialPayArea").val();
        // var fundPayArea = $("#fundAreaId").val();//公积金缴纳地
        // var siPayArea = $("#siAreaId").val();
        // var socialPayAreaStr="";
        // var empType = $("#empType").val();
        // var empTypeStr="";
        // if(socialPayArea!=null&&socialPayArea.length>0){
        //     for(var i=0;i<socialPayArea.length;i++){
        //         if(socialPayAreaStr.length>0){
        //             socialPayAreaStr+=',';
        //         }
        //         socialPayAreaStr+=socialPayArea[i];
        //     }
        // }
        // if(empType!=null&&empType.length>0){
        //     for(var i=0;i<empType.length;i++){
        //         if(empTypeStr.length>0){
        //             empTypeStr+=',';
        //         }
        //         empTypeStr+=empType[i];
        //     }
        // }
        // var queryDataPost = {};
        // var siTime = $("#siTime").val();
        // queryDataPost.nameOrMobile = nameOrMobile;
        // queryDataPost.queryOrgIds = orgId;
        // queryDataPost.siPayAreas = siPayArea;
        // queryDataPost.fundPayAreas = fundPayArea;
        // queryDataPost.socialPayAreas = socialPayAreaStr;
        // queryDataPost.empTypes = empTypeStr;
        // queryDataPost.siTime = siTime;
        // queryDataPost.accountStatus = '2';
        //
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
        //                 form.attr('action', hostUrl + "si/siCalculate/exportInfoClient?access_token=" + token);
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

    //查询方法
    window.refreshJqGridDataByCal=function () {
        var nameOrMobile = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        var socialPayArea = $("#socialPayArea").val();
        var fundPayArea = $("#fundAreaId").val();//公积金缴纳地
        var siPayArea = $("#siAreaId").val();
        var socialPayAreaStr="";
        var empType = $("#empType").val();
        var empTypeStr="";
        if(socialPayArea!=null&&socialPayArea.length>0){
            for(var i=0;i<socialPayArea.length;i++){
                if(socialPayAreaStr.length>0){
                    socialPayAreaStr+=',';
                }
                socialPayAreaStr+=socialPayArea[i];
            }
        }
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var queryDataPost = {};
        queryDataPost.nameOrMobile = nameOrMobile;
        queryDataPost.queryOrgIds = orgId;
        queryDataPost.siPayAreas = siPayArea;
        queryDataPost.fundPayAreas = fundPayArea;
        queryDataPost.socialPayAreas = socialPayAreaStr;
        queryDataPost.empTypes = empTypeStr;
        //刷新前先去除冻结列
        $('#salaryPeriodList').jqGrid('destroyFrozenColumns');
        $("#salaryPeriodList").jqGrid("setGridParam", {url :hostUrl +'si/siCalculate/queryValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
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

    //初始化户口性质
    window.getSocialPayArea = function (codeSetId) {
        $.ajax({
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            type: "POST",
            url:hostUrl+ "sys/sysCodeItem/getCodeMesBySetId",
            data: JSON.stringify({code_set_id:codeSetId}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(resultData){
                if(resultData!=null) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var message = resultData.message;
                    if(successFlag) {
                        //  $("#socialPayArea").empty();
                        for (var i = 0; i < result.length; i++) {
                            $("#socialPayArea").append("<option value=" + result[i].id + ">" + result[i].name + "</option>");
                        }
                        return;
                    }else {
                        pop_tip_open("blue",message);
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","社保户口性质下拉列表初始化失败！");
            }
        });
    };

})(jQuery, window, document);