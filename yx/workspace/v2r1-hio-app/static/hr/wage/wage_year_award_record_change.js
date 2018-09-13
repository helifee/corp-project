

;(function ($,window,document,undefined) {
    var payPeriodId;//期间ID

    payPeriodId = localStorage.getItem('payPeriodId');

    if (payPeriodId && payPeriodId != undefined && payPeriodId != 'undefined' && payPeriodId != null) {
        payPeriodId = JSON.parse(payPeriodId);
    }
    //要手动remove
    // localStorage.removeItem('payPeriodId');

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //计算高度
    window.resizeHeight = function () {
        // //左侧  头部底部为60px  title类 为50px
        // var w_h = $(window).height();
        // //右侧table
        // $(".con-table .mytable").height((w_h - 175)+ "px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        //解决切换页面大小出现滚动条、切换页面百分比页面出现空白的问题
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 200);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 40);
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
        resizeGrid();

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });

    });

    //显示变动明细中的增加人员
    window.addPersonList = function () {
        //创建jqGrid组件
        jQuery("#salaryRecord_addPersonList").jqGrid({
            url: hostUrl + "wage/wageRecord/queryAnnualRecordListByAdd",
            height: $(window).height() - 200,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            postData:{"payPeriodId":payPeriodId,"type":"2"},
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            colNames: ['personId','所属部门ID',  '姓名', '手机号', '所属部门', '职务', '人员状态','入职时间','离职时间'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'personId',label : 'personId',editable:true,sortable:false,hidden:true,key:true},
                {name: 'deptId',label : 'deptId',editable:true,sortable:false,hidden:true},
                {name: 'realName',  width: 120,editable:true, sortable:true,align:'center'},
                {name: 'mobile', width: 120,editable:true, sortable:true,align:'center'},
                {name: 'prefixName',  width: 300,editable:true, sortable:true,align:'center'},
                {name: 'postName',  width: 160,editable:true, sortable:true,align:'center'},
                {name: 'personStatusFormat', width: 100,editable:true, sortable:true,align:'center'},
                {name: 'entryTime', width: 100,editable:true, sortable:true,align:'center',formatter:"date", formatoptions: {newformat:'Y-m-d'}},
                {name: 'leaveTime', width: 100,editable:true, sortable:true,align:'center',formatter:"date", formatoptions: {newformat:'Y-m-d'}}
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
        var data = {"WageRecords":itemAdd,"type":"2","payPeriodId":payPeriodId};
        $.ajax({
            type: "POST",
            url:hostUrl+ "wage/wageRecord/saveBatchAnnualRecord",
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


    //增加条件查询
    window.queryAdd = function () {
        var nameOrCode = $("#nameOrCode_add").val();
        jQuery("#salaryRecord_addPersonList").jqGrid("setGridParam",
            {url :hostUrl + 'wage/wageRecord/queryAnnualRecordListByAdd',postData : {nameOrCode:nameOrCode,type:"2"}}).trigger("reloadGrid");
    };

    //增加条件查询  回车查询
    $('#nameOrCode_add').bind('keypress',function(event){
        if(event.keyCode == "13") {
            queryAdd();
        }
    });


    //返回上一级
    window.msgClosePage = function (){
        window.location.href="wage_year_award_calculate.html?queryFlag=01";
    };


})(jQuery, window, document)