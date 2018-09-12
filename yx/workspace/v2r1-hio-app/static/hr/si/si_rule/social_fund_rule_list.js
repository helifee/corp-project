/**
 * Created by ciic on 2017/6/14.
 */


;(function ($, window, document, undefined) {

    var rowData;//当前选中数据
    var rowDataBefore;//上一次选中数据

    var saveType;//保存方式
    var row_data;
    var focusId;
    var gotoTab;//切换页签

    var jqGridRule_social;
    var jqGridRule_fund;


    //grid 自适应宽度
    $(window).resize(function(){
        resizeHeight();
        resizeGrid();
    });

    //计算高度
    window.resizeHeight = function (){
        var w_h = $(window).height();
        //右侧table
        $(".con-table .mytable").height((w_h-120)+"px");
    };

    //计算表格宽度
    window.resizeGrid=function (){
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 230);
        $.xljUtils.gridResizeFn();
    };

    //社保列表初始化
    window.listRule_social=function (){
        var queryDataPost = {};

        var siPayArea = $("#siPayArea").val();
        queryDataPost.siPayAreas = siPayArea;

        var socialPayArea = $("#socialPayArea").val();
        var socialPayAreaStr="";
        if(socialPayArea!=null&&socialPayArea.length>0){
            for(var i=0;i<socialPayArea.length;i++){
                if(socialPayAreaStr.length>0){
                    socialPayAreaStr+=',';
                }
                socialPayAreaStr+=socialPayArea[i];
            }
            queryDataPost.socialPayAreas = socialPayAreaStr;
        }

        var ubody = "si/socialRule/queryListBySocial";
        var uall = hostUrl+ubody;


        //创建jqGrid组件
        jqGridRule_social = jQuery("#listRule_social").jqGrid({
            url:uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            contentType : "application/json",
            datatype : "json",
            postData: queryDataPost,
            autowidth: true,
            height: $(window).height() - 230,
            jsonReader : {
                root:"result",
                repeatitems: false
            },
            rownumbers: true,
            multiselect: true,
            multiboxonly: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : '序号',width : 55,align : "center",hidden : true },
                {name : 'siPayAreaName',label : '社保缴纳地',width : 140,align : "center"},
                {name : 'siPayArea',label : '社保缴纳地代码项',align : "center",hidden : true},
                {name : 'socialPayAreaName',label : '户口性质',width : 120,align : "center"},
                {name : 'socialPayArea',label : '户口性质',align : "center",hidden : true},
                {name : 'endowmentEmpScale',label : '养老个人比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'endowmentUnitScale',label : '养老公司比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'medicalEmpScale',label : '医疗个人比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'medicalUnitScale',label : '医疗公司比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'outworkEmpScale',label : '失业个人比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'outworkUnitScale',label : '失业公司比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'injuryUnitScale',label : '工伤公司比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'birthUnitScale',label : '生育公司比例',width : 150,align : "center", formatter:percentFormatter},
                {name : 'illnessEmpCost',label : '大病个人金额',width : 150,align : "right", formatter:percentFormatter2},
                {name : 'illnessUnitCost',label : '大病单位金额',width : 150,align : "right", formatter:percentFormatter2},
                //   {name : 'unitFixedPay',label : '大病公司固定金额',width : 164,align : "right"},
                {name : 'empCostNumberLength',label : '社保个人缴费额小数位数',width : 195,align : "center"},
                {name : 'unitCostNumberLength',label : '社保公司缴费额小数位数',width : 195,align : "center"},
                {name : 'mantissaProcessingRule',label : '尾数处理规则代码',width : 150,align : "center",hidden : true},
                {name : 'mantissaProcessingRuleName',label : '尾数处理规则',width : 150,align : "center"}
            ],
            autowidth: true,
            shrinkToFit: false,
            rowNum : -1,//一页显示多少条 -1全部
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            viewrecords : true,
            ondblClickRow: function () {
                foredit(1);
            },
            gridComplete: function(){
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                rowDataBefore = rowData;
                if(rowDataBefore!=null&&rowDataBefore.valueType('undefined')){
                    //添加回显选中行样式
                    $('#listRule_social').setSelection(rowDataBefore.id,true);
                    $('#listRule_social '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight");
                }
                //如果焦点id不为空
                if (focusId != undefined && focusId != null) {
                    //闪亮聚焦
                    $("#listRule_social").setSelection(focusId);
                }
            },
            loadError:function(xhr,status,error){
                pop_tip_open("red","初始化社保缴费规则列表请求失败");
            }
        });
    };

    //公积金列表初始化
    window.listRule_fund=function (){
        var queryDataPost = {};
        var fundArea = $("#fundArea").val();
        queryDataPost.fundPayAreas = fundArea;

        var ubody = "si/fundRule/queryListByFund";
        var uall = hostUrl+ubody;

        //hr所嵌入的ifrmae宽度
        // var width = $('iframe').width();
        var width = $(window).width();;
        //字数
        var num =50;
        //平均每个子占的宽度
        var cellwidth=(width-50)/num;

        //创建jqGrid组件
        jqGridRule_fund = jQuery("#listRule_fund").jqGrid({
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            contentType : "application/json",
            postData: queryDataPost,
            datatype : "json",
            autowidth: true,
            height: $(window).height() - 230,
            jsonReader : {
                root:"result",
                repeatitems: false
            },
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                {name : 'fundAreaName',label : '公积金缴纳地',width : cellwidth*6,align : "center",editable:false},
                {name : 'fundArea',label : '公积金缴纳地代码项',align : "center",hidden : true},
                {name : 'fundEmpScale',label : '公积金个人比例',width : cellwidth*7,align : "center",editable:true, formatter:percentFormatter},
                {name : 'fundUnitScale',label : '公积金公司比例',width : cellwidth*7,align : "center",editable:true, formatter:percentFormatter},
                {name : 'empCostNumberLength',label : '公积金个人缴费额小数位数',width : cellwidth*12,align : "center",editable:true},
                {name : 'unitCostNumberLength',label : '公积金公司缴费额小数位数',width : cellwidth*12,align : "center",editable:true},
                {name : 'mantissaProcessingRule',label : '尾数处理规则代码',width : 130,align : "center",hidden : true},
                {name : 'mantissaProcessingRuleName',label : '尾数处理规则',width : cellwidth*6,align : "center"}
            ],
            autowidth: true,
            shrinkToFit: false,
            rowNum : -1,//一页显示多少条 -1全部
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
            multiselect: true,
            multiboxonly: true,
            viewrecords : true,
            onCellSelect: function(){
                if(rowDataBefore!=null&&rowDataBefore.valueType('undefined')){
                    //重新选择行时清除上一次选中行的样式
                    $('#listRule_fund '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                }
            },
            ondblClickRow: function () {
                //跳转编辑页
                foredit(2);
            },
            gridComplete: function(){
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                rowDataBefore = rowData;
                if(rowDataBefore!=null&&rowDataBefore.valueType('undefined')){
                    //添加回显选中行样式
                    $('#listRule_fund').setSelection(rowDataBefore.id,true);
                    $('#listRule_fund '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight");
                }
                //如果焦点id不为空
                if (focusId != undefined && focusId != null) {
                    //闪亮聚焦
                    $("#listRule_fund").setSelection(focusId);
                }
            },
            loadError:function(xhr,status,error){
                pop_tip_open("red","初始化公积金缴费规则列表请求失败");
            }
        });
    };

    //新增缴费规则
    window.add=function (e){
            if(e==1){;
                var ids = $('#listRule_social').getDataIDs();//返回数据表的ID数组["66","39"..]
                var socialPayArea = new Array();
                if(ids.length>0){
                    for(var i =0;i<ids.length;i++){
                        var rowData = $("#listRule_social").jqGrid('getRowData',ids[i]);
                        socialPayArea[i]=rowData;
                    }
                }
                row_data = socialPayArea;
                saveType = "add";
                storageDate();
                localStorage.setItem('row_data',row_data);
                localStorage.setItem('saveType',saveType);
                window.location.href="social_rule_edit.html";
            }
            if(e==2){
                var ids = $('#listRule_fund').getDataIDs();//返回数据表的ID数组["66","39"..]
                var fundarea = new Array();
                if(ids.length>0){
                    for(var i =0;i<ids.length;i++){
                        var rowData = $("#listRule_fund").jqGrid('getRowData',ids[i]);
                         fundarea[i]=rowData;
                    }
                }
                row_data = fundarea;
                saveType = "add";
                storageDate();
                localStorage.setItem('row_data',row_data);
                localStorage.setItem('saveType',saveType);
                window.location.href="fund_rule_edit.html";// window.open("fund_rule_edit.html");//
            }

        };

    //删除缴费规则
    window.del=function (model){
        if(model=="1"){
             var rowIds=$('#listRule_social').jqGrid("getGridParam","selarrrow");
             if(rowIds.length==0){
                 pop_tip_open("blue","请选择要删除的记录！");
                 return;
             }
             pop_text_open("blue",'确定删除选中的社保缴费规则？',function(){
                 $.ajax({
                     type: "DELETE",
                     url:hostUrl+ "/si/socialRule/deleteBatch/"+rowIds,
                     dataType: "JSON",
                     contentType:"application/json",
                     success: function(data){
                         if(data.success){
                             pop_tip_open("green","删除成功！");
                             //刷新聚焦处理开始
                             var w = $.hrUtils.focusNode(rowIds);
                             if (w == null){
                                 var queryData = {
                                     datatype:'json',
                                     page:1
                                 };
                                 $('#listRule_social').jqGrid('setGridParam',queryData).trigger("reloadGrid");
                             }else {
                                 $('#listRule_social').jqGrid('setGridParam',{
                                     gridComplete:function () {
                                         if (w != null && w != ""){
                                             $('#listRule_social').setSelection(w);
                                         }
                                         w = "";
                                     }
                                 }).trigger("reloadGrid");
                             }
                             //刷新聚焦处理结束
                         }else {
                             pop_tip_open("red",data.message);
                         }
                     }
                 });
             },true);
         }

        if(model=="2"){
            var rowIds=$('#listRule_fund').jqGrid("getGridParam","selarrrow");
            if(rowIds.length==0){
                pop_tip_open("blue","请选择要删除的记录！");
                return;
            }
            pop_text_open("blue",'确定删除选中的公积金缴费规则？',function(){
                $.ajax({
                    type: "DELETE",
                    url:hostUrl+ "/si/fundRule/deleteBatch/"+rowIds,
                    dataType: "JSON",
                    contentType:"application/json",
                    success: function(data){
                        if(data.success){
                            pop_tip_open("green","删除成功！");
                            //刷新聚焦处理开始
                            var w = $.hrUtils.focusNode(rowIds);
                            if (w == null){
                                var queryData = {
                                    datatype:'json',
                                    page:1
                                };
                                $('#listRule_fund').jqGrid('setGridParam',queryData).trigger("reloadGrid");
                            }else {
                                $('#listRule_fund').jqGrid('setGridParam',{
                                    gridComplete:function () {
                                        if (w != null && w != ""){
                                            $('#listRule_fund').setSelection(w);
                                        }
                                        w = "";
                                    }
                                }).trigger("reloadGrid");
                            }
                            //刷新聚焦处理结束
                        }else {
                            pop_tip_open("red",data.message);
                        }
                    }
                });
            },true);
        }
    };

    //返回
    window.goBack=function (){
        // window.history.go(-1);
        window.location.href="../si_file/si_file.html?queryFlag=01";
    };

    //尾数处理规则 翻译
    window.typeFmatter=function (cellvalue, options, rowObject) {
        if (cellvalue == "1") {
            return "四舍五入";
        } else if (cellvalue == "2") {
            return "见角进元";
        } else if (cellvalue == "3") {
            return "见分进角";
        } else if (cellvalue == "4") {
            return "取整";
        } else if (cellvalue == "") {
            return "";
        }
    };

    //修改
    window.foredit=function (model){
        if(model=="1"||model==1){
            var editId=$('#listRule_social').jqGrid("getGridParam","selarrrow");
            if(editId.length!=1){
                pop_tip_open("blue","请选择一条您要编辑的记录！");
                return;
            }
            saveType="update";
            storageDate();
            localStorage.setItem('saveType',saveType);
            localStorage.setItem('editId',JSON.stringify(editId));
            window.location.href="social_rule_edit.html";// window.open("social_rule_edit.html");//
        }

        if(model=="2"||model==2){
            var editId=$('#listRule_fund').jqGrid("getGridParam","selarrrow");
            if(editId.length!=1){
                pop_tip_open("blue","请选择一条您要编辑的记录！");
                return;
            }
            //获取选中的最后一行的ID
            saveType="update";
            storageDate();
            localStorage.setItem('saveType',saveType);
            localStorage.setItem('editId',JSON.stringify(editId));
            window.location.href="fund_rule_edit.html";//window.open("fund_rule_edit.html");
        }
    };

    //导出excel
    window.exportInfo=function (e) {

        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');

        var socialPayArea = $("#socialPayArea").val();
        var siPayArea = $("#siPayArea").val();
        var socialPayAreaStr="";
        if(socialPayArea!=null&&socialPayArea.length>0){
            for(var i=0;i<socialPayArea.length;i++){
                if(socialPayAreaStr.length>0){
                    socialPayAreaStr+=',';
                }
                socialPayAreaStr+=socialPayArea[i];
            }
        }
        var fundArea = $("#fundArea").val();

        var uAll;
        if(e==1||e=="1") {
            var ubody = "si/socialRule/exportInfo?"+window.parent.JZY.s.getAccessTokenByAuthorization();
            uAll = hostUrl + ubody;

            form.attr('action', uAll);
            //添加后台导出参数
            var input1 = $('<input>');
            input1.attr('type', 'hidden');
            input1.attr('name', "socialPayAreas");
            input1.attr('value', socialPayArea);
            //添加后台导出参数
            var input2 = $('<input>');
            input2.attr('type', 'hidden');
            input2.attr('name', "siPayAreas");
            input2.attr('value', siPayArea);
            $('body').append(form);  //将表单放置在web中
            form.append(input1);   //将查询参数控件提交到表单上
            form.append(input2);   //将查询参数控件提交到表单上
            form.submit();   //表单提交
            pop_tip_open("", "导出成功");
        } else if(e==2||e=="2") {
            var ubody = "si/fundRule/exportInfo?"+window.parent.JZY.s.getAccessTokenByAuthorization();
            uAll = hostUrl + ubody;
            form.attr('action', uAll);
            //添加后台导出参数
            var input1 = $('<input>');
            input1.attr('type', 'hidden');
            input1.attr('name', "fundPayAreas");
            input1.attr('value', fundArea);
            $('body').append(form);  //将表单放置在web中
            form.append(input1);   //将查询参数控件提交到表单上
            form.submit();   //表单提交
            pop_tip_open("", "导出成功");
        }


        // var token = "49109848-ba00-46bd-931f-ba4572ba7e43";
        //
        // var socialPayArea = $("#socialPayArea").val();
        // var siPayArea = $("#siPayArea").val();
        // var socialPayAreaStr="";
        // if(socialPayArea!=null&&socialPayArea.length>0){
        //     for(var i=0;i<socialPayArea.length;i++){
        //         if(socialPayAreaStr.length>0){
        //             socialPayAreaStr+=',';
        //         }
        //         socialPayAreaStr+=socialPayArea[i];
        //     }
        // }
        //
        // var fundArea = $("#fundArea").val();
        //
        // //表格数据查询条件
        // var rowData = {};
        // var uAll;
        // if(e==1||e=="1") {
        //     rowData = {socialPayAreas:socialPayArea,siPayAreas:siPayArea};
        //     var ubody = "si/socialRule/exportInfo";
        //     uAll = hostUrl + ubody;
        // } else if(e==2||e=="2") {
        //     rowData = {fundPayAreas:fundArea};
        //     var ubody = "si/fundRule/exportInfo";
        //     uAll = hostUrl + ubody;
        // }
        // $.ajax({
        //     type: 'POST',
        //     url: uAll,
        //     dataType: 'json',
        //     contentType: 'application/json',
        //     data: JSON.stringify(rowData),
        //     async : false,
        //     success: function (json) {
        //         if (json.success == true) {
        //             var path = json.result;
        //             if(undefined != path && "" != path){
        //                 var form = $("<form>");   //定义一个form表单
        //                 form.attr('style','display:none');   //在form表单中添加查询参数
        //                 form.attr('target','exportTarget');
        //                 form.attr('method','post');
        //                 form.attr('action',hostUrl + "si/socialRule/exportInfoClient?access_token=" + token);
        //                 //添加后台导出参数
        //                 var input1 = $('<input>');
        //                 input1.attr('type','hidden');
        //                 input1.attr('name',"path");
        //                 input1.attr('value',path);
        //
        //                 $('body').append(form);  //将表单放置在web中
        //                 form.append(input1);   //将查询参数控件提交到表单上
        //                 form.submit();   //表单提交
        //                 pop_tip_open("green", "导出成功");
        //             }
        //             } else {
        //                 pop_tip_open("blue", json.message);
        //             }
        //     }, error: function (XMLHttpRequest, textStatus, errorThrown) {
        //             pop_tip_open("red", "导出失败");
        //     }
        // })
    };

    /**
     *  代码项
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    window.fmatter=function (cellvalue, options, rowObject) {
            return $.hrUtils.getHRCodeNameById(cellvalue);
    };

    // 根据社保缴纳地户籍类型和公积金缴纳地来查询
    window.refreshJqGridDataByCal = function (e) {
        if(e==1){
            var socialPayArea = $("#socialPayArea").val();
            var siPayArea = $("#siPayArea").val();
            var socialPayAreaStr="";
            if(socialPayArea!=null&&socialPayArea.length>0){
                for(var i=0;i<socialPayArea.length;i++){
                    if(socialPayAreaStr.length>0){
                        socialPayAreaStr+=',';
                    }
                    socialPayAreaStr+=socialPayArea[i];
                }
            }
            var queryDataPost = {};
            queryDataPost.siPayAreas = siPayArea;
            queryDataPost.socialPayAreas = socialPayAreaStr;
            if((socialPayArea!=null && socialPayArea!="") || (siPayArea!=null && siPayArea!="")){
                $("#listRule_social").jqGrid("setGridParam", {url :hostUrl + 'si/socialRule/queryListBySocial', postData: queryDataPost}).trigger("reloadGrid");
            }else{
                /*
                 * 先清空条件
                 * jqgrid postData setGridParam 调用多次时查询条件会累加
                 */
                var postData = $('#listRule_social').jqGrid("getGridParam", "postData");
                $.each(postData, function (k, v) {
                    delete postData[k];
                });
                jQuery("#listRule_social").jqGrid().trigger('reloadGrid');
            }
        }
        if(e==2){
            var fundArea = $("#fundArea").val();
            if(fundArea!=null && fundArea!=""){
                jQuery("#listRule_fund").jqGrid('setGridParam', { postData : {fundPayAreas:fundArea}}).trigger('reloadGrid');
            }else{
                var postData = $('#listRule_fund').jqGrid("getGridParam", "postData");
                $.each(postData, function (k, v) {
                    delete postData[k];
                });
                jQuery("#listRule_fund").jqGrid().trigger('reloadGrid');
            }
        }
    };

    window.emptySi=function () {
        $("#siPayArea_name").val("");
        $("#siPayArea").val("");
    };

    window.emptyFund=function () {
        $("#fundArea_name").val("");
        $("#fundArea").val("");
    };

    window.percentFormatter=function  (cellvalue, options, rowObject) {
        if(cellvalue!=null){
            return cellvalue+'%';
        }
        return "";
    };

    window.percentFormatter2=function  (cellvalue, options, rowObject) {
        if(cellvalue!=null&&cellvalue!=''){
            var temp = parseFloat(cellvalue);
                return temp.toFixed(2);
        }
        return 0;
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

    //查询用户功能权限  add by tangsq since 20180123
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
                                $("#addBtnBySocial").show();//  新增
                                $("#addBtnByFund").show();//  新增

                                $("#editBtnBySocial").show();//  修改
                                $("#editBtnByFund").show();//  修改

                                $("#delBtnBySocial").show();//  删除
                                $("#delBtByFund").show();//  删除

                                $("#exportBtnBySocial").show();//导出
                                $("#exportBtnByFund").show();//导出
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    //查询条件记录
    window.storageDate = function () {

        // 户口性质
        var show_socialPayAreaShow = $(".ms-drop").eq(0).html();
        var show_socialPayAreaName = $(".ms-choice").eq(0).find("span").text();
        var show_socialPayAreaIds = $("#socialPayArea").val();

        //社保缴纳地
        var show_siPayAreaIds = $("#siPayArea").val();
        var show_siAreaNames = $("#siPayArea_name").val();

        //公积金缴纳地
        var show_fundPayAreaIds = $("#fundArea").val();
        var show_fundAreaNames = $("#fundArea_name").val();

        localStorage.setItem("show_socialPayAreaShow", show_socialPayAreaShow);
        localStorage.setItem("show_socialPayAreaName", show_socialPayAreaName);
        localStorage.setItem("show_socialPayAreaIds", show_socialPayAreaIds);
        localStorage.setItem("show_siPayAreaIds", show_siPayAreaIds);
        localStorage.setItem("show_siAreaNames", show_siAreaNames);
        localStorage.setItem("show_fundPayAreaIds", show_fundPayAreaIds);
        localStorage.setItem("show_fundAreaNames", show_fundAreaNames);
    };

    //查询条件回显
    window.storageShow = function () {

        //社保缴纳地
        var show_siPayAreaIds = localStorage.getItem("show_siPayAreaIds");
        var show_siAreaNames = localStorage.getItem("show_siAreaNames");

        // 户口性质
        var show_socialPayAreaShow = localStorage.getItem("show_socialPayAreaShow");
        var show_socialPayAreaIds = localStorage.getItem("show_socialPayAreaIds");
        var show_socialPayAreaName = localStorage.getItem("show_socialPayAreaName");
        var socialPayAreaId = [];
        if (show_socialPayAreaIds != null) {
            socialPayAreaId = show_socialPayAreaIds.split(",");
        }

        //公积金缴纳地
        var show_fundPayAreaIds = localStorage.getItem("show_fundPayAreaIds");
        var show_fundAreaNames = localStorage.getItem("show_fundAreaNames");


        if(show_siPayAreaIds!=null&&show_siPayAreaIds!=""&&show_siPayAreaIds!=undefined&&
            show_siAreaNames!=null&&show_siAreaNames!=""&&show_siAreaNames!=undefined
        ) {
            $("#siPayArea").val(show_siPayAreaIds);
            $("#siPayArea_name").val(show_siAreaNames);
        }


        $(".ms-drop").eq(0).html(show_socialPayAreaShow);
        $(".ms-choice").eq(0).find("span").text(show_socialPayAreaName);
        $("#socialPayArea").val(socialPayAreaId);


        $("#fundArea").val(show_fundPayAreaIds);
        $("#fundArea_name").val(show_fundAreaNames);
    };

    $(function () {

        resizeHeight();

        getSocialPayArea(socialPayAreaSetId);
        $('#socialPayArea').multipleSelect({
            width: '150px',
            filter: true,
            addTitle: true,
            placeholder: "户口性质",
            minimumCountSelected: 10
        });

        //防止按钮刷新页面
        $('.btn').click(function(e) {
            e.preventDefault();
        });

        queryAuth();

        //是否带查询条件
        var queryFlag = $.xljUtils.getUrlParam("queryFlag");
        if (queryFlag == "01") {
            storageShow();
        }
        listRule_social();
        resizeGrid();

        //页签切换
        $(".right-content .con-tit button").on("click", function (e) {

            $(this).siblings().removeClass("active");
            $(this).addClass("active");

            if ($(this).attr('class').indexOf('byFund') > 0) {
                $("#fundDiv").css("display", "block");//公积金缴费规则设置为block（显示）
                $("#socialDiv").css("display", "none");//社保缴费规则设置为none（隐藏）
                //刷新公积金缴费规则设置
                listRule_fund();
            } else {
                $("#socialDiv").css("display", "block");//社保缴费规则设置为block（显示）
                $("#fundDiv").css("display", "none");//公积金缴费规则设置为none（隐藏）
                //刷新社保缴费规则设置
                listRule_social();
            }
            $.xljUtils.gridResizeFn();
            e.stopPropagation();
        });

        //聚焦ID
        focusId = localStorage.getItem('editId');//修改或新增ID
        if (focusId != null && focusId != '' && focusId != 'undefined') {
            focusId = JSON.parse(focusId);
            localStorage.removeItem('editId');
        }

        gotoTab = localStorage.getItem('gotoTab');//跳转的页签
        if (gotoTab && gotoTab != undefined && gotoTab != 'undefined' && gotoTab != null) {
            gotoTab = JSON.parse(gotoTab);
            localStorage.removeItem('gotoTab');
            if(gotoTab=="soc") {
                $("#socialBtn").click();
                if(focusId!=null&&focusId!="") {
                    $("#listRule_social").jqGrid('setGridParam',{
                        gridComplete:function () {
                            $.xljUtils.addGridScroll();
                            $.xljUtils.gridResizeFn();
                            $("#listRule_social").setSelection(focusId);
                        }
                    }).trigger("reloadGrid");
                }
            }else if(gotoTab=="fund"){
                $("#fundBtn").click();
                if(focusId!=null&&focusId!="") {
                    $("#listRule_fund").jqGrid('setGridParam',{
                        gridComplete:function () {
                            $.xljUtils.addGridScroll();
                            $.xljUtils.gridResizeFn();
                            $("#listRule_fund").setSelection(focusId);
                        }
                    }).trigger("reloadGrid");
                }
            }
        }


    });

})(jQuery, window, document);

