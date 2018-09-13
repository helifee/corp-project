    /**
     * Created by ciic on 2017/6/22.
     */
;(function ($, window, document, undefined) {

        payPeriodId = localStorage.getItem('payPeriodId');
        payPeriod = localStorage.getItem('payPeriod');

        if (payPeriodId && payPeriodId != undefined && payPeriodId != 'undefined' && payPeriodId != null) {
            payPeriodId = JSON.parse(payPeriodId);
        }
        if (payPeriod && payPeriod != undefined && payPeriod != 'undefined' && payPeriod != null) {
            payPeriod = JSON.parse(payPeriod);
        }
        //要手动remove
        // localStorage.removeItem('payPeriodId');
        // localStorage.removeItem('payPeriod');

    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //计算高度
    window.resizeHeight=function () {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //右侧table
       $(".con-table .mytable").height((w_h - 175)+ "px");
    };

    //计算表格宽度
        window.resizeGrid=function () {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height()-54);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-1, true);
        $.xljUtils.gridResizeFn();
    };
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //显示变动明细中的增加人员
    window.changeAddList=  function (){
        var ubody = "si/siFile/queryChangeAddPersonList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件

        jQuery("#changeAddList").jqGrid({
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            postData:{"siCalculateDateId":payPeriodId,"payPeriod":payPeriod},//orgId:org_id,accountId:account_id
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            colNames: ['姓名','手机','所属部门','岗位','入职时间'],//jqGrid的列显示名字 '拼音'隐藏
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'realName',  width: 120,align:'center'},
                {name: 'mobile',  width: 300,align:'center'},
                {name: 'prefixName',  width: 200,align:'center'},
                {name: 'postName',  width: 160,align:'center'},
                {name: 'entryTime',width: 160,align : "center",formatter:"date", formatoptions: {newformat:'Y-m-d'}}
            ],
            loadComplete:function(data){
              //  file_data = data.result;
            },
            rowNum : -1,//一页显示多少条 -1全部
            sortname : 'entryTime',//初始化的时候排序的字段
            rownumbers: true,
            multiselect: true,
            // multiboxonly: true,//只能通过复选框进行多选
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $. xljUtils.addGridScroll();
                $. xljUtils.gridResizeFn();
            }
        });
    };

    //显示变动明细中的减少人员
    window.changeDelList =   function (){
        var ubody = "si/siFile/queryChangeDelPersonList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jQuery("#changeDelList").jqGrid({
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            postData:{"payPeriodId":payPeriodId,"payPeriod":payPeriod},//accountId:account_id,orgId:org_id
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            colNames: ['姓名','手机','所属部门','岗位','离职时间'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'realName',  width: 120,align:'center'},
                {name: 'mobile', width: 120,align:'center'},
                {name: 'prefixName',  width: 300,align:'center'},
                {name: 'postName',  width: 160,align:'center'},
                {name: 'leaveTime',width: 160,align : "center",formatter:"date", formatoptions: {newformat:'Y-m-d'}}
            ],
            loadComplete:function(data){
             console.log(data);
            },
            rowNum : -1,//一页显示多少条 -1全部
            rownumbers: true,
            multiselect: true,
            // multiboxonly: true,//只能通过复选框进行多选
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $. xljUtils.addGridScroll();
                $. xljUtils.gridResizeFn();
            }
        });
    };

    //将人员添加到临时表与单档案表
    window.saveBtnClick=function (){
        var rowIds=$('#changeAddList').jqGrid("getGridParam","selarrrow");
        if(rowIds.length==0){
            pop_tip_open("blue","未有选中的人员！");
            return;
        }
        $.ajax({
            type: "POST",
            url:hostUrl+ "si/siFile/savePersonsToFile",
            data: JSON.stringify({personIds:rowIds}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(data) {
                if(data.success) {
                    $.xljUtils.tip("green",data.message);
                    queryAdd();
                    // window.location.href="si_file.html";
                    // goBack();
                }else{
                    $.xljUtils.tip("blue",data.message);
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","档案新增人员失败");
            }
        });
    };


    window.delBtnClick=function (){
        var rowIds=$('#changeDelList').jqGrid("getGridParam","selarrrow");
        if(rowIds.length==0){
            pop_tip_open("blue","未有选中的人员！");
            return;
        }else{
            $.ajax({
                type: "POST",
                url:hostUrl+ "si/siFile/deletePersonsFromTemp/",
                data: JSON.stringify({personIds:rowIds}),
                dataType: "JSON",
                async:false,
                contentType:"application/json",
                success: function(data) {
                    if(data.success) {
                        $.xljUtils.tip("green","数据删除成功！");
                        queryDel();
                        // window.location.href="si_file.html";
                    }else{
                        $.xljUtils.tip("blue",data.message);
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    console.log(xhr);
                    pop_tip_open("red","服务异常,请联系管理员！");
                }
            });
        }
    };

    //恢复人员
    window.batchBatchRec = function () {
        var data = {"delflag":1,"payPeriodId":payPeriodId,"payPeriod":payPeriod.siTime};
        $.ajax({
            type: "POST",
            url:hostUrl+ "si/siFile/updateByRecoverPersons",
            data:JSON.stringify(data),
            dataType: "JSON",
            contentType:"application/json",
            success: function(resultData){
                var successFlag = resultData.success;
                var message = resultData.message;
                if(successFlag){
                    pop_tip_open("green",message);
                    queryDel();
                    // msgClosePage();
                }else {
                    pop_tip_open("blue", message);
                }
            }
        });
    };

    //增加条件查询
    window.queryAdd=function () {
        var nameOrCode = $("#nameOrCode_add").val();
        jQuery("#changeAddList").jqGrid('setGridParam', {url :hostUrl + 'si/siFile/queryChangeAddPersonList', postData : {nameOrCode:nameOrCode}}).trigger('reloadGrid');

    };

    //减少条件查询
    window.queryDel=function () {
        var nameOrCode = $("#nameOrCode_del").val();
            jQuery("#changeDelList").jqGrid('setGridParam', {url :hostUrl + 'si/siFile/queryChangeDelPersonList',postData : {nameOrCode:nameOrCode}}).trigger('reloadGrid');//orgId:org_id,
    };

    /**
     * 刷新父页面表格数据
     */
    window.refreshParent=function () {
        window.opener.$('#siFileList').jqGrid().trigger("reloadGrid");
    };


    window.goBack=function(){
        // window.history.go(-1);
        window.location.href="si_file.html?queryFlag=01"
    };

    //保存或修改成功，提示后关闭窗口
    window.msgClosePage = function (){
        setTimeout(function () {
            window.opener=null;
            window.open('','_self');
            window.close();
        }, 450);
    };

    //表格上面 切换：增加人员/减少人员
    $(".right-content .con-tit button").on("click", function (e) {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if ($(this).attr('class').indexOf('bydel') > 0) {
            $("#addDiv").css("display", "none");//增加人员为none（隐藏）
            $("#delDiv").css("display", "block");//减少人员设置为block（显示）
        }  else {
            $("#addDiv").css("display", "block");//增加人员为block（显示）
            $("#delDiv").css("display", "none");//减少人员设置为none（隐藏）
        }
        $.xljUtils.gridResizeFn();
        e.stopPropagation();
    });

    $("#delClose").click(function(){
        goBack();
    });
    $("#addClose").click(function(){
        goBack();
    });

    $('#nameOrCode_add').bind('keypress',function(event){
        if(event.keyCode == "13") {
            queryAdd();
        }
    });

    $('#nameOrCode_del').bind('keypress',function(event){
        if(event.keyCode == "13") {
            queryDel();
        }
    });

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
                                ifEditable=true;
                                $("#saveBtn").show();// 新增人员 增加
                                $("#delBtn").show();// 减少人员 删除
                                $("#recBtn").show();// 减少人员 恢复
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    $(function (){
        resizeHeight();
        queryAuth();
        changeAddList();
        changeDelList();
        resizeGrid();

    });


})(jQuery, window, document);