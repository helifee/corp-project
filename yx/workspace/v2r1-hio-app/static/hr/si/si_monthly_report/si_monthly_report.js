/**
 * Created by ciic on 2017/6/28.
 */


;(function ($, window, document, undefined) {
    var personListData;//机构对象
    var calculateDateId;//操作期间ID
    var jqgridCalculate;
    var showModel = [];//展示的具体内容

    //计算高度
    window.resizeHeight = function () {
        // var w_h = $(window).height();
        // $(".con-table .mytable").height((w_h - 150)+ "px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 160);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 40);

        $('#siRepotList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#siRepotList').jqGrid('setFrozenColumns');
        // 冻结列样式
        $.xljUtils.setFrozenColumnStyle(41);

    };

    //grid 自适应宽度
    $(window).resize(function () {
//        resizeHeight();
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
    window.siReportList=function(){
        if(calculateDateId!=null&&calculateDateId!='') {
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
                        jqgridCalculate = jQuery("#siRepotList").jqGrid({
                            url: hostUrl + 'si/siCalculate/queryValueListByRecopt',//创建完成之后请求数据的url
                            ajaxGridOptions: {contentType: 'application/json'},
                            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                            contentType: "application/json",
                            postData: {"calculateDateId":calculateDateId},
                            datatype: "json",
                            autowidth: true,
                            height: $(window).height() - 160,
                            shrinkToFit:shrinkToFit>3?false:true,
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
                                //冻结列
                                $('#siRepotList').jqGrid('destroyFrozenColumns');
                                $("#siRepotList").jqGrid('setFrozenColumns');
                            },
                            loadComplete: function (xhr) {
                                // 冻结列样式begin
                                $.xljUtils.setFrozenColumnStyle(41);
                                // 冻结列样式end

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

    //导出
    window.exportInfo = function () {

        var urlBody = "si/siCalculate/exportInfo";
        var urlAll = hostUrl + urlBody;

        var nameOrMobile = $("#nameOrMobile").val();
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
        var urlBody = "si/siCalculate/exportInfo?"+window.parent.JZY.s.getAccessTokenByAuthorization();
        var urlAll = hostUrl + urlBody;
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input0 = $('<input>');
        input0.attr('type', 'hidden');
        input0.attr('name', "calculateDateId");
        input0.attr('value', calculateDateId);
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
        $('body').append(form);  //将表单放置在web中
        form.append(input0);   //将查询参数控件提交到表单上
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.append(input5);   //将查询参数控件提交到表单上
        form.append(input6);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");

        // var token = "49109848-ba00-46bd-931f-ba4572ba7e43";
        //
        // //表格数据
        // rowData = $('#siRepotList').jqGrid('getRowData');
        // var urlBody = "si/siCalculate/exportInfo";
        // var urlAll = hostUrl + urlBody;
        //
        // var nameOrMobile = $("#nameOrMobile").val();
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
        // queryDataPost.calculateDateId = calculateDateId;
        // queryDataPost.nameOrMobile = nameOrMobile;
        // queryDataPost.queryOrgIds = orgId;
        // queryDataPost.siPayAreas = siPayArea;
        // queryDataPost.fundPayAreas = fundPayArea;
        // queryDataPost.socialPayAreas = socialPayAreaStr;
        // queryDataPost.empTypes = empTypeStr;
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

    //初始化户口性质
    window.getSocialPayArea = function(codeSetId) {
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

    //点击查询按钮进行筛选查询
    window.refreshJqGridDataByCal=function () {
        var nameOrMobile = $("#nameOrMobile").val();
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
        queryDataPost.calculateDateId = calculateDateId;
        queryDataPost.nameOrMobile = nameOrMobile;
        queryDataPost.queryOrgIds = orgId;
        queryDataPost.siPayAreas = siPayArea;
        queryDataPost.fundPayAreas = fundPayArea;
        queryDataPost.socialPayAreas = socialPayAreaStr;
        queryDataPost.empTypes = empTypeStr;
        $("#siRepotList").jqGrid("setGridParam", {url :hostUrl + 'si/siCalculate/queryValueListByRecopt', postData: queryDataPost}).trigger("reloadGrid");
    };

    //名称查询  回车查询
    $('#nameOrMobile').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByCal();
        }
    });
   //查询用户功能权限  add by tangsq since 20180124
    window.queryAuth = function () {
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
        // window.history.go(-1);
        window.location.href="../si_file/si_file.html?queryFlag=01";
    };

    $(function () {

        calculateDateId = localStorage.getItem('calculateDateId');
        if (calculateDateId && calculateDateId != undefined && calculateDateId != 'undefined' && calculateDateId != null) {
            calculateDateId = JSON.parse(calculateDateId);
        }

        //要手动remove
        // localStorage.removeItem('calculateDateId');

        //初始化高度
//        resizeHeight();
        queryAuth();//查询用户权限  add by tangsq since 20180124
        getSocialPayArea("1069");
        siReportList();
        resizeGrid();
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