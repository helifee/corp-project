var payPeriodId;//期间ID
var payPeriod;//薪资期间

;(function ($,window,document,undefined) {

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

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //计算高度
    window.resizeHeight = function () {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //右侧table
        $(".con-table .mytable").height((w_h - 175)+ "px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height()-54);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-1, true);
        $.xljUtils.gridResizeFn();
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
                                $("#addSaveBtn").show();//增加人员  保存
                                $("#delSaveBtn").show();//减少人员 保存
                                $("#delRebackBtn").show();//减少人员 恢复
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    $(function() {
        queryAuth();//权限按钮功能设置
        resizeHeight();
        addPersonList();
        delPersonList();
        resizeGrid();
    });

    //显示变动明细中的增加人员
    window.addPersonList = function () {
        var ubody = "wage/wageRecord/queryExchangeListByAdd";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jQuery("#salaryRecord_addPersonList").jqGrid({
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            postData:{"payPeriodId":payPeriodId,"payPeriod":payPeriod,"type":"1"},
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            colNames: ['personId','所属部门ID',  '姓名', '手机号', '所属部门', '职务', '人员状态','入职时间'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'personId',label : 'personId',editable:true,sortable:false,hidden:true,key:true},
                {name: 'deptId',label : 'deptId',editable:true,sortable:false,hidden:true},
                {name: 'realName',  width: 120,editable:true, sortable:true,align:'center'},
                {name: 'mobile', width: 120,editable:true, sortable:true,align:'center'},
                {name: 'prefixName',  width: 300,editable:true, sortable:true,align:'center'},
                {name: 'postName',  width: 160,editable:true, sortable:true,align:'center'},
                {name: 'personStatusFormat', width: 100,editable:true, sortable:true,align:'center'},
                {name: 'entryTime', width: 100,editable:true, sortable:true,align:'center',formatter:"date", formatoptions: {newformat:'Y-m-d'}}
            ],
            loadComplete:function(data){
                file_data = data.result;
            },
            rowNum : -1,//一页显示多少条 -1全部
            sortname : 'personId',//初始化的时候排序的字段
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
    window.delPersonList = function () {
        var ubody = "wage/wageRecord/queryExchangeListByDel";
        var uall = hostUrl + ubody;
        //创建jqGrid组件

        jQuery("#salaryRecord_delPersonList").jqGrid({
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            postData:{"payPeriodId":payPeriodId,"payPeriod":payPeriod,"type":"1"},
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            colNames: ['id', '姓名', '手机号', '所属部门', '职务', '人员状态','离职时间'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : 'personId',editable:true,sortable:false,hidden:true,key:true},
                {name: 'realName',  width: 120,editable:true, sortable:true,align:'center'},
                {name: 'mobile', width: 120,editable:true, sortable:true,align:'center'},
                {name: 'prefixName',  width: 300,editable:true, sortable:true,align:'center'},
                {name: 'postName',  width: 160,editable:true, sortable:true,align:'center'},
                {name: 'personStatusFormat', width: 100,editable:true, sortable:true,align:'center'},
                {name: 'leaveTime', width: 100,editable:true, sortable:true,align:'center',formatter:"date", formatoptions: {newformat:'Y-m-d'}}

            ],
            loadComplete:function(data){
                file_data = data.result;
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

    //批量保存新增的人员
   window.batchBatchSave = function () {
        var rowIds=$('#salaryRecord_addPersonList').jqGrid("getGridParam","selarrrow");
        if(rowIds.length==0){
            pop_tip_open("red","请选择需要增加的人员记录！");
            return;
        }
        //组装参数
        var itemAdd = [];
        for(var i in rowIds) {
            //根据选中的行获取每行的对象
            var rowData = $("#salaryRecord_addPersonList").jqGrid('getRowData', rowIds[i]);
            //获取指定行对象的name属性的元素
            var temppersonId = rowData.personId;
            itemAdd.push(temppersonId);
        }
        var data = {"WageRecords":itemAdd,"type":"1","payPeriodId":payPeriodId,"payPeriod":payPeriod};
        $.ajax({
            type: "POST",
            url:hostUrl+ "wage/wageRecord/batchSavePersons",
            data:JSON.stringify(data),
            dataType: "JSON",
            contentType:"application/json",
            success: function(resultData){
                var successFlag = resultData.success;
                if(successFlag){
                    pop_tip_open("green","添加成功！");
                    queryAdd();
                }else {
                    pop_tip_open("red", "添加失败！" + message);
                }
            }
        });
    };

    //批量减少应减人员
    window.batchBatchDel = function () {
        var rowIds=$('#salaryRecord_delPersonList').jqGrid("getGridParam","selarrrow");
        if(rowIds.length==0){
            pop_tip_open("red","请选择需要减少的人员记录！");
            return;
        }
        var deleteIds = [];
        for(var i in rowIds){
            //根据选中的行获取每行的数据对象
            var rowData = $("#salaryRecord_delPersonList").jqGrid('getRowData', rowIds[i]);
            deleteIds.push(rowData.id);
        }

        var data = {"ids":deleteIds,"type":"1"};

        pop_text_open("blue",'确定减少这'+rowIds.length+'条数据吗？',function(){
            $.ajax({
                type:'post',
                url: hostUrl + "wage/wageRecord/deleteBatchRecord",
                dataType:'json',
                contentType:'application/json',
                data:JSON.stringify(data),
                success:function (xhr,textStatus ) {
                    console.log(xhr);
                    if (xhr){
                        if(xhr.success) {
                            $.xljUtils.tip("green","人员减少成功！");
                            queryDel();
                        }else{
                            if(xhr.code=="50000"){
                                $.xljUtils.tip("red",xhr.message);
                                return;
                            }
                            $.xljUtils.tip("red","人员减少失败！");
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

    //恢复人员
    window.batchBatchRec = function () {
        var data = {"delflag":1,"payPeriodId":payPeriodId,"payPeriod":payPeriod,"type":"1"};
        $.ajax({
            type: "POST",
            url:hostUrl+ "wage/wageRecord/updateByRecoverPersons",
            data:JSON.stringify(data),
            dataType: "JSON",
            contentType:"application/json",
            success: function(resultData){
                var successFlag = resultData.success;
                var message = resultData.message;
                if(successFlag){
                    pop_tip_open("green",message);
                    queryDel();
                }else {
                    pop_tip_open("red", "恢复失败！" + message);
                }
            }
        });
    };

    //增加条件查询
   window.queryAdd = function () {
        var nameOrCode = $("#nameOrCode_add").val();
        jQuery("#salaryRecord_addPersonList").jqGrid("setGridParam", {url :hostUrl + 'wage/wageRecord/queryExchangeListByAdd',postData : {nameOrCode:nameOrCode,type:"1"}}).trigger("reloadGrid");
    };

    //增加条件查询  回车查询
    $('#nameOrCode_add').bind('keypress',function(event){
        if(event.keyCode == "13") {
            queryAdd();
        }
    });

    //减少条件查询
    window.queryDel = function () {
        var nameOrCode = $("#nameOrCode_del").val();
        jQuery("#salaryRecord_delPersonList").jqGrid("setGridParam", {url :hostUrl + 'wage/wageRecord/queryExchangeListByDel',postData : {nameOrCode:nameOrCode,type:"1"}}).trigger("reloadGrid");
    };

    //增加条件查询  回车查询
    $('#nameOrCode_del').bind('keypress',function(event){
        if(event.keyCode == "13") {
            queryDel();
        }
    });

    //刷新父页面表格数据
    window.refreshParent = function () {
        window.opener.$('#salaryRecordList').jqGrid().trigger("reloadGrid");
    };

    //返回上一级
    window.msgClosePage = function (){
        // window.history.go(-1);
        window.location.href="wage_salary_calculate.html?queryFlag=01";
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

})(jQuery, window, document)