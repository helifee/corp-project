;(function ($,window,document,undefined) {

    //固定项目grid设置
    var jqGridSalaryItem;

    //津贴项目grid设置
    var jqGridAllowanceItem;

    //奖金项目grid设置
    var jqGridBonusItem;

    //考勤项目grid设置
    var jqGridKqItem;

    //社保公积金项目grid设置
    var jqGridSiItem;

    //其他项目grid设置
    var jqGridOtherItem;

    //个税项目grid设置
    var jqGridTaxItem;

    //合计项目grid设置
    var jqGridSumItem;



    var rowData;//当前选中数据
    var rowDataBefore;//上一次选中数据
    var openUrlPeriod = "wage_salary_period_edit.html";//计薪期间的编辑页面
    var openUrlRate = "wage_rate_edit.html";//税率表的编辑页面
    var editPeriodId;//跳转修改页面时记录计薪期间的ID
    var editRateId;//跳转修改页面时记录税率表的ID
    var editTypePeriod=0;//计薪期间新增、修改打开方式：0新增，1修改。默认新增
    var editTypeRate=0;//税率表新增、修改打开方式：0新增，1修改。默认新增
    var openTypeRate=1;//税率表 打开类型，1：薪资&年终奖个税税率表     2:劳务人员个税税率表    默认是薪资&年终奖个税类型税率表
    var totalYear = new Date().getFullYear();//获取当前归属年度
    var focusW;//第二页聚焦


    var periodId ;//计薪期间Id

    //计算高度
    window.resizeHeight = function () {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".con-table .mytable").height((w_h - 180) + "px");
    };

    //为薪资项目页签中的表格设置宽度
    window.resizeGrid = function () {
        $("#salaryItemList").setGridWidth($(window).width()*0.99);
        $("#salaryItemList").setGridWidth(document.body.clientWidth*0.99);
        $("#allowanceItemList").setGridWidth($(window).width()*0.99);
        $("#allowanceItemList").setGridWidth(document.body.clientWidth*0.99);
        $("#bonusItemList").setGridWidth($(window).width()*0.99);
        $("#bonusItemList").setGridWidth(document.body.clientWidth*0.99);
        $("#kqItemList").setGridWidth($(window).width()*0.99);
        $("#kqItemList").setGridWidth(document.body.clientWidth*0.99);
        $("#siItemList").setGridWidth($(window).width()*0.99);
        $("#siItemList").setGridWidth(document.body.clientWidth*0.99);
        $("#otherItemList").setGridWidth($(window).width()*0.99);
        $("#otherItemList").setGridWidth(document.body.clientWidth*0.99);
        $("#taxItemList").setGridWidth($(window).width()*0.99);
        $("#taxItemList").setGridWidth(document.body.clientWidth*0.99);
        $("#sumItemList").setGridWidth($(window).width()*0.99);
        $("#sumItemList").setGridWidth(document.body.clientWidth*0.99);
        $.xljUtils.gridResizeFn();
    };


    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //项目设置页签：固定项目初始化
    window.initSalaryItemList = function () {
        jqGridSalaryItem = jQuery("#salaryItemList").jqGrid(
            {
                // url : baseUrl+'/wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : 'type',sortable:false,hidden:true},
                    {name : 'lowSalaryLimit',label : '项目名称', sortable:false,align:'center',width:130},
                    {name : 'topSalaryLimit',label : '小数位数',sortable:false,align:'center',width:130},
                    {name : 'taxRate',label : '项目属性',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '工资条显示分类',sortable:false,align:'center',width:100},
                    {name : 'taxBase',label : '项目数据来源',sortable:false,align:'center',width:150},
                    {name : 'remark',label : '计税规则',sortable:false,align:'center',width:300}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                }
            });
    };

    //项目设置页签：津贴项目初始化
    window.initAllowanceItemList = function () {
        jqGridAllowanceItem = jQuery("#allowanceItemList").jqGrid(
            {
                // url : baseUrl+'/wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : 'type',sortable:false,hidden:true},
                    {name : 'lowSalaryLimit',label : '项目名称', sortable:false,align:'center',width:130},
                    {name : 'topSalaryLimit',label : '小数位数',sortable:false,align:'center',width:130},
                    {name : 'taxRate',label : '项目属性',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '工资条显示分类',sortable:false,align:'center',width:100},
                    {name : 'taxBase',label : '项目数据来源',sortable:false,align:'center',width:150},
                    {name : 'remark',label : '计税规则',sortable:false,align:'center',width:300}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                }
            });
    };

    //项目设置页签：奖金项目初始化
    window.initBonusItemList = function () {
        jqGridBonusItem = jQuery("#bonusItemList").jqGrid(
            {
                // url : baseUrl+'/wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : 'type',sortable:false,hidden:true},
                    {name : 'lowSalaryLimit',label : '项目名称', sortable:false,align:'center',width:130},
                    {name : 'topSalaryLimit',label : '小数位数',sortable:false,align:'center',width:130},
                    {name : 'taxRate',label : '项目属性',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '工资条显示分类',sortable:false,align:'center',width:100},
                    {name : 'taxBase',label : '项目数据来源',sortable:false,align:'center',width:150},
                    {name : 'remark',label : '计税规则',sortable:false,align:'center',width:300}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                }
            });
    };

    //项目设置页签：考勤项目初始化
    window.initKqItemList = function () {
        jqGridKqItem = jQuery("#kqItemList").jqGrid(
            {
                // url : baseUrl+'/wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : 'type',sortable:false,hidden:true},
                    {name : 'lowSalaryLimit',label : '项目名称', sortable:false,align:'center',width:130},
                    {name : 'topSalaryLimit',label : '小数位数',sortable:false,align:'center',width:130},
                    {name : 'taxRate',label : '项目属性',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '工资条显示分类',sortable:false,align:'center',width:100},
                    {name : 'taxBase',label : '项目数据来源',sortable:false,align:'center',width:150},
                    {name : 'remark',label : '计税规则',sortable:false,align:'center',width:300}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                }
            });
    };

    //项目设置页签：社保公积金项目初始化
    window.initSiItemList = function () {
        jqGridSiItem = jQuery("#siItemList").jqGrid(
            {
                // url : baseUrl+'/wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : 'type',sortable:false,hidden:true},
                    {name : 'lowSalaryLimit',label : '项目名称', sortable:false,align:'center',width:130},
                    {name : 'topSalaryLimit',label : '小数位数',sortable:false,align:'center',width:130},
                    {name : 'taxRate',label : '项目属性',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '工资条显示分类',sortable:false,align:'center',width:100},
                    {name : 'taxBase',label : '项目数据来源',sortable:false,align:'center',width:150},
                    {name : 'remark',label : '计税规则',sortable:false,align:'center',width:300}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                }
            });
    };

    //项目设置页签：其他项目初始化
    window.initOtherItemList = function () {
        jqGridOtherItem = jQuery("#otherItemList").jqGrid(
            {
                // url : baseUrl+'/wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : 'type',sortable:false,hidden:true},
                    {name : 'lowSalaryLimit',label : '项目名称', sortable:false,align:'center',width:130},
                    {name : 'topSalaryLimit',label : '小数位数',sortable:false,align:'center',width:130},
                    {name : 'taxRate',label : '项目属性',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '工资条显示分类',sortable:false,align:'center',width:100},
                    {name : 'taxBase',label : '项目数据来源',sortable:false,align:'center',width:150},
                    {name : 'remark',label : '计税规则',sortable:false,align:'center',width:300}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                }
            });
    };

    //项目设置页签：个税项目初始化
    window.initTaxItemList = function () {
        jqGridTaxItem = jQuery("#taxItemList").jqGrid(
            {
                // url : baseUrl+'/wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : 'type',sortable:false,hidden:true},
                    {name : 'lowSalaryLimit',label : '项目名称', sortable:false,align:'center',width:130},
                    {name : 'topSalaryLimit',label : '小数位数',sortable:false,align:'center',width:130},
                    {name : 'taxRate',label : '项目属性',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '工资条显示分类',sortable:false,align:'center',width:100},
                    {name : 'taxBase',label : '项目数据来源',sortable:false,align:'center',width:150},
                    {name : 'remark',label : '计税规则',sortable:false,align:'center',width:300}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                }
            });
    };

    //项目设置页签：合计项目初始化
    window.initSumItemList = function () {
        jqGridSumItem = jQuery("#sumItemList").jqGrid(
            {
                // url : baseUrl+'/wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                colModel : [
                    {name : 'id',label : 'id',sortable:false,hidden:true},
                    {name : 'type',label : 'type',sortable:false,hidden:true},
                    {name : 'lowSalaryLimit',label : '项目名称', sortable:false,align:'center',width:130},
                    {name : 'topSalaryLimit',label : '小数位数',sortable:false,align:'center',width:130},
                    {name : 'taxRate',label : '项目属性',sortable:false,align:'center',width:80},
                    {name : 'quickDeduction',label : '工资条显示分类',sortable:false,align:'center',width:100},
                    {name : 'taxBase',label : '项目数据来源',sortable:false,align:'center',width:150},
                    {name : 'remark',label : '计税规则',sortable:false,align:'center',width:300}
                ],
                rownumbers: true,
                rowNum: -1,//一页显示多少条 -1全部
                multiselect: true,
                autowidth:true,
                multiboxonly: true,//只能通过复选框进行多选
                jsonReader : {
                    root:"result",
                    repeatitems : false
                }
            });
    };

    //计薪设置：初始化
    window.initPeriodSetting = function () {
        var ubody = "wage/wagePeriod/queryList";
        var uall = serviceUrl+ubody;
        var querydata ={time:new Date()};
        $.ajax({
            type:'post',
            dataType:'json',
            contentType:'application/json',
            data:JSON.stringify(querydata),
            url:uall,
            success: function(data) {
                //记录已经存在，直接修改
                if(data.result!=null&&data.result.length>0) {
                    var tempDate = data.result[0];
                    $("#periodFrom").find("input[name='periodId']").val(tempDate.id);
                    $("#startDate").val(tempDate.startDate);
                    $("#wageWay").val(tempDate.wageWay);
                    $("#periodFrom").find("input[name='workingDay']").val(tempDate.workingDay);
                    $("#kqSource").val(tempDate.kqSource);
                    $("#siSource").val(tempDate.siSource);
                }
                //记录不存在，需新增插入
                else {
                    // initUuid();
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化薪资总额控制请求失败");
            }
        })
    };

    //计薪设置：保存
    window.savePeriodSetting = function () {

        var tempPeriodDto={};
        var id = $("#periodId").val();
        var startDate = $("#startDate").val();
        var wageWay = $("#wageWay").val();
        var workingDay = $("#workingDay").val();
        var kqSource = $("#kqSource").val();
        var siSource = $("#siSource").val();

        if(startDate==null||startDate=='') {
            pop_tip_open("blue","请选择计薪开始时间！");
            return;
        } else if(wageWay==null||wageWay=='') {
            pop_tip_open("blue","请选择计薪方式！");
            return;
        } else if(workingDay==null||workingDay=='') {
            pop_tip_open("blue","请输入工作日天数！");
            return;
        } else if(workingDay<0||workingDay>30) {
            pop_tip_open("blue","请输入有效工作日天数！");
            return;
        } else if(kqSource==null||kqSource=='') {
            pop_tip_open("blue","请选择考勤数据来源！");
            return;
        } else if(siSource==null||siSource=='') {
            pop_tip_open("blue","请选择社保数据来源！");
            return;
        }
        var endDate = calculateEndDate(startDate);//获取结束时间

        tempPeriodDto.startDate = startDate;
        tempPeriodDto.endDate = endDate;
        tempPeriodDto.wageWay = wageWay;
        tempPeriodDto.workingDay = workingDay;
        tempPeriodDto.kqSource = kqSource;
        tempPeriodDto.siSource = siSource;
        tempPeriodDto.delflag=false;
        if(id!=null&&id!=""){//编辑
            tempPeriodDto.id = id;
            updateSavePeriod(tempPeriodDto);
        }else{//新增
            addSavePeriod(tempPeriodDto);
        }
    };

    //计薪设置：修改保存
    window.updateSavePeriod = function (tempPeriodDto) {
        var periodId = $('#periodId').val();
        tempPeriodDto.id = periodId;
        $.ajax({
            url:baseUrl+"/wage/wagePeriod/update/"+periodId,
            data:JSON.stringify(tempPeriodDto),
            type:'put',
            dataType:'JSON',
            contentType:'application/json',
            success:function (resultData ) {
                if(resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if(successFlag) {
                        $.xljUtils.tip("green","计薪设置修改成功！");
                    }else {
                        pop_tip_open("blue","计薪设置修改失败！"+msg);
                        initPeriodSetting();
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","计薪设置修改请求失败");
            }
        });
    };

    //计薪设置：新增保存
    window.addSavePeriod = function (tempPeriodDto) {
        $.ajax({
            type:'get',
            url:serviceUrl +  "sys/uuid/generator/getGuuid"+"?time="+Math.random(),
            success: function(data) {
                var guuid=data.result;
                $("#periodFrom").find("input[name='periodId']").val(guuid);
                var periodId = $('#periodId').val();
                tempPeriodDto.id = periodId;
                $.ajax({
                    url:baseUrl+"/wage/wagePeriod/save/",
                    type:'POST',
                    dataType:'JSON',
                    contentType:'application/json',
                    data:JSON.stringify(tempPeriodDto),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr){
                            if(xhr.success) {
                                $.xljUtils.tip("green","计薪设置新增成功！");
                            }else{
                                if(xhr.code=="50000"){
                                    $.xljUtils.tip("blue",xhr.msg);
                                    initPeriodSetting();
                                    return;
                                }
                                $.xljUtils.tip("blue","计薪设置新增失败！");
                                initPeriodSetting();
                            }
                        }else{
                            $.xljUtils.tip("red","服务异常,请联系管理员！");
                            initPeriodSetting();
                        }
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red","服务异常,请联系管理员！");
                    }
                });
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        });
    };

    //审批设置:初始化
    window.initApprovalSetting=function(){
        var key = "approvalSetting";
        var uBody = "/sys/sysParameter/getValueByKey/" + key;
        var uAll = serviceUrl + uBody;
        $.ajaxSetup({ cache:false });//在IE浏览器下，数据不写入缓存
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                if(data.result == "0"){//不需要审批
                    $("input[name='approvalSetting'][value='0']").prop("checked",true);
                }else{//1需要审批
                    $("input[name='approvalSetting'][value='1']").prop("checked",true);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化薪酬审批设置参数请求失败!");
            }
        })
    };

    //审批设置：保存
    window.saveApprovalSetting=function(){
        //判断是否已经选择值
        var val=$('input:radio[name="approvalSetting"]:checked').val();
        if(val==null){
            pop_tip_open("blue","数据保存失败！审批设置不能为空");
            return false;
        }else {
            //保存更改
            $.ajax({
                url: serviceUrl + "/sys/sysParameter/updateValueByKey/approvalSetting",
                type: 'put',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({paraValue:val,dateTime:new Date()}),
                success: function (resultData) {
                    if (resultData) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var msg = resultData.msg;
                        if (successFlag) {
                            $.xljUtils.tip("green", "审批设置保存成功！");
                        } else {
                            pop_tip_open("blue", "审批设置保存失败！" + msg);
                        }
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "数据修改保存请求失败");
                }
            });
        }
    };


    //项目设置页签：薪资项新增、修改  初始化
    window.updateSalaryItem = function (opType,itemType) {
        window.location.href="wage_salary_item_edit.html";
    };

    //计薪设置：根据选择的开始时间获取结束时间
    window.calculateEndDate = function (startDate) {
      if(startDate!=null&&startDate!='') {
          if(startDate==1){
              return 31;
          }else {
              return startDate-1;
          }
      }
    };



    //初始化jqgrid
    $(function () {
        //初始化高度
        resizeHeight();

        initPeriodSetting();

        //计薪设置：工作日天数默认为21.75
        $("#workingDay").prop("disabled","disabled");

        // initSalaryItemList();
        // initAllowanceItemList();
        // initBonusItemList();
        // initKqItemList();
        // initSiItemList();
        // initOtherItemList();
        // initTaxItemList();
        // initSumItemList();
        //页面加载完毕后更改grid宽高
        resizeGrid();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });

        //计薪设置：切换开始日期进行相关处理
        $("#startDate").change(function(){
            var startDate = $("#startDate").val();
            if(startDate!=null&&startDate!='') {
                var endDate = calculateEndDate(startDate);
                $("#endDate").val("次月" + endDate+"日");
            }
        });

        //计薪设置：切换计薪方式进行相关处理
        $("#wageWay").change(function(){
            var startDate = $("#wageWay").val();
            if(startDate=="1") { //21.75
                $("#workingDay").val("21.75");
                $("#workingDay").prop("disabled",true);
            } else if(startDate=="2") { //来源为考勤
                $("#workingDay").val("22");//后期计算时进行读取
                $("#workingDay").prop("disabled",true);
            } else if(startDate=="3") { //支持自定义设置
                $("#workingDay").val("");
                $("#workingDay").prop("disabled",false);
            }
        });



        //页签切换
        $(".right-content .con-tit button").on("click", function (e) {
            //左侧  头部底部为60px  title类 为50px
            var w_h = $(window).height();
            $(".slide-left .ztree-box").height((w_h - 25) + "px");

            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            if ($(this).attr('class').indexOf('bySlaryItem') > 0) {
                $("#salaryItemDiv").css("display", "block");//薪资项目设置为block（显示）
                $("#applyDiv").css("display", "none");//审批设置为none（隐藏）
                $("#periodDiv").css("display", "none");//计薪期间设置为none（隐藏）

                //刷新薪资项目
                initSalaryItemList();
                initAllowanceItemList();
                initBonusItemList();
                initKqItemList();
                initSiItemList();
                initOtherItemList();
                initTaxItemList();
                initSumItemList();

            } else if ($(this).attr('class').indexOf('byapply') > 0) {
                $("#applyDiv").css("display", "block");//审批设置为block（显示）
                $("#salaryItemDiv").css("display", "none");//薪资项目设置为none（隐藏）
                $("#periodDiv").css("display", "none");//计薪设置为none（隐藏）

                //刷新审批设置值
                initApprovalSetting();

            } else { //计薪设置显示
                $("#periodDiv").css("display", "block");//计薪期间设置为block（显示）
                $("#salaryItemDiv").css("display", "none");//薪资项目设置为none（隐藏）
                $("#applyDiv").css("display", "none");//审批设置为none（隐藏）

                //刷新计薪设置
                initPeriodSetting();
            }
            $.xljUtils.gridResizeFn();
            e.stopPropagation();
        });

        //初始化宽度
        resizeGrid();
    });


    //返回上一级
    window.goBack = function () {
        window.history.go(-1);
    };

    //考勤的公式编辑
    window.setKqFormula = function () {
        window.location.href="wage_formula_kq_mould.html";
    };

    //津贴的公式编辑
    window.setJtFormula = function () {
        window.location.href="wage_formula_allowance_mould.html";
    };


})(jQuery,window,document);