/**
 * ruanxin
 * 薪资计算js
 */
;
(function ($, window, document, undefined) {
    //定义全局参数
    var rowDataBefore;//上一次选中数据
    var rowData;    //行数据

    var calculateDate = [];//计算相关的所有具体值
    var jqgridCalculate;//计算列表
    var lastrow = 0;//可编辑状态下记录单元格的行号 编辑iRow行号
    var lastcell = 1;//可编辑状态下记录单元格的列号
    var lastVaule;//编辑前获取单元格内容
    var flag="0";//单元格校验是否通过标志

    var periodDate;//期间日期显示
    var startDay;//开始日期
    var endDay;//结束日期
    var showModel = [];//展示的具体内容
    var payPeriod;//发薪期间

    var ifEditable=false;//是否可编辑单元格(可编辑单元格、删除人员、计算、导入)

    /**
     * 为空指的就是默认查询所有
     * entry: 新入职
     * leave: 离职
     * noAdjust: 未定薪
     * adjust: 定薪
     */
    var queryCalculateStatus = "";//标志查询人员状态（全部、在职、离职、调薪、未定薪。。。）

    var calculateFlag = false;//是否页面改过编辑框又重新计算过

    var focusId;//聚焦
    var focusW = false;//非第一页聚焦


    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
//        resizeHeight();
        resizeGrid();
    });

    //计算表格的高度
    window.resizeHeight = function () {
//        //左侧  头部底部为60px  title类 为50px
//        var w_h = $(window).height();
//        //表示con-table 下的mytable1
//        $(".con-table .mytable").height((w_h - 130) + "px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 235);
        $('#salaryCalculateList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#salaryCalculateList').jqGrid('setFrozenColumns');
        // 冻结列样式
        $.xljUtils.setFrozenColumnStyle(41);
    };

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
                                $("#calculateAllBtn").show();//计算
                                $("#delBtn").show();//删除人员
                                $("#salaryAdjustmentBtn").show();//调定薪
                                $("#importBtn").show();//导入计算数据
                                $("#exportAdjustmentBtn").show();//导入调定薪数据
                                ifEditable = true;
                            }
                            if(key=="code"&&value[key]=="4"){//归档、新建权限
                                $("#fileBtn").show();//归档
                                $("#createPayPeriodBtn").show();//新建期间
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };

    //薪资计算:初始化
    window.initSalaryCalculate = function () {
        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        $.ajax({
            url: hostUrl + 'wage/wagePayHistory/queryFileListByCalculate',//创建完成之后请求数据的url
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify({nameOrCodeByCal:nameOrCodeByCal,queryOrgIds:orgId}),
            success: function(resultData) {
                var data = resultData.result;//所有具体的值信息
                showModel = [];//所有信息
                var tempShowField = data.showField;//查询出来的除默认展示字段外的其他需要展示字段
                payPeriod = data.payPeriod;
                periodDate = data.periodDate;//期间日期展示
                var wagePeriod ;//基础设置中的计薪设置
                startDay = "";//开始日期
                endDay = "";//结束日期
                //校验设置中的计薪日期设置是否正常显示
                if(periodDate!=null) {
                    wagePeriod = periodDate.wagePeriod ;//展示的期间相关信息
                    startDay = periodDate.startDay;
                    endDay = periodDate.endDay;
                }

                //统计行数据
                var sum = data.sum;
                if (sum === null || sum === undefined){
                    sum = {};
                }

                if(wagePeriod !=null && wagePeriod != undefined && wagePeriod != 'undefined') {

                    $("#calculateDate").html(startDay + "-" + endDay);


                    if (payPeriod.status == '3') {
                        $("#createPayPeriodBtn").attr("disabled", false);
                    }else {
                        $("#createPayPeriodBtn").attr("disabled", true);//如果未归档不允许调用
                    }

                    //需要展示的所有记录
                    showModel.push({name: 'id', label: 'id', hidden: true, key: true,frozen:true});
                    showModel.push({name: 'personId', label: 'personId',hidden: true,key:true,frozen:true});
                    showModel.push({name: 'realName', label: '姓名',align: 'center',width:120,frozen:true});
                    showModel.push({name: 'mobile', label: '手机号', align: 'center',width:120,frozen:true});
                    showModel.push({name: 'prefixName', label: '所属机构', align: 'center',width:220,frozen:true});
                    // showModel.push({name: 'postName', label: '职务',align: 'center',width:160});
                    showModel.push({name: 'entryTime', label: '入职时间',align: 'center',width:160});
                    showModel.push({name: 'leaveTime', label: '离职时间', align: 'center',width:160});
                    // showModel.push({name: 'status', label: '人员状态', align: 'center',width:160});
                    showModel.push({name: 'person_type', label: '显示状态',align: 'center',width:160,formatter:personTypeFmatter,unformat:unPersonTypeFmatter});
                    var shrinkToFit=0;//标志列表是否按指定宽度
                    if (tempShowField != null && tempShowField != '' && tempShowField.length > 0&& payPeriod!=null) {
                        for (var i in tempShowField) {
                            //当发薪期间状态为草稿或者是已归档，单元格才是可编辑
                            if (payPeriod.status == '0' || payPeriod.status == '3') {
                                //如果数据来源为手工输入，则支持手动修改金额
                                if (tempShowField[i].itemDataSource == '1') {
                                    var temp = {
                                        name: tempShowField[i].code,
                                        label: tempShowField[i].name,
                                        align: 'center',
                                        editable: ifEditable
                                    };
                                    showModel.push(temp);
                                }
                                else {
                                    var temp = {
                                        name: tempShowField[i].code,
                                        label: tempShowField[i].name,
                                        align: 'center'
                                    };
                                    showModel.push(temp);
                                }
                            }
                            //其他为不能编辑
                            else {
                                var temp = {
                                    name: tempShowField[i].code,
                                    label: tempShowField[i].name,
                                    align: 'center'
                                };
                                showModel.push(temp);
                            }
                            shrinkToFit++;
                        }
                    }
                    var nameOrCodeByCal = $("#nameOrCodeByCal").val();
                    var orgId = $("#orgId").val();
                    var queryDataPost = {};
                    queryDataPost.nameOrCodeByCal = nameOrCodeByCal;
                    queryDataPost.queryOrgIds = orgId;
                    queryDataPost.queryCalculateStatus=queryCalculateStatus;
                    queryDataPost.page =1;
                    jqgridCalculate = jQuery("#salaryCalculateList").jqGrid({
                        url: hostUrl + 'wage/wagePayHistory/queryValueListByCalculate',//创建完成之后请求数据的url
                        ajaxGridOptions: {contentType: 'application/json'},
                        mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                        contentType: "application/json",
                        postData: queryDataPost,
                        datatype: "json",
                        sortable: false,//支持标题栏单击排除查询
                        autowidth: true,
                        height: $(window).height() - 260,
                        shrinkToFit:shrinkToFit>3?false:true,
                        footerrow: true,//分页上添加一行，用于显示统计信息
                        rownumbers: true,
                        multiselect: true,//是否可以多选
                        multiboxonly: true,//只能通过复选框进行多选
                        colModel:showModel,//动态表格
                        rowNum: 20,//一页显示多少条 -1全部
                        rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                        pager: "#pager",//表格页脚的占位符(一般是div)的id
                        viewrecords: true, //定义是否要显示总记录数
                        cellEdit: ifEditable,//是否开启单元格的编辑功能
                        cellsubmit : "clientArray",//修改内容后用getChangedCells获取
                        jsonReader: {
                            // root:"result"
                            repeatitems: false
                        },
                        onSelectRow: function () {
                            var rowId=$('#salaryCalculateList').jqGrid("getGridParam","selrow");
                            rowData = $('#salaryCalculateList').jqGrid('getRowData',rowId);
                        },
                        gridComplete: function () { //滚动条

                            if (calculateFlag){
                                var nameOrCodeByCal = $("#nameOrCodeByCal").val();
                                var orgId = $("#orgId").val();
                                $.ajax({
                                    url: hostUrl + 'wage/wagePayHistory/queryFileListByCalculate',//创建完成之后请求数据的url
                                    datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                                    mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                                    ajaxGridOptions: {contentType: 'application/json'},
                                    contentType: "application/json",
                                    type: "POST",
                                    async: false,
                                    data: JSON.stringify({nameOrCodeByCal:nameOrCodeByCal,queryOrgIds:orgId,updateTime:new Date().getTime()}),
                                    success: function (resultData) {
                                        sum = resultData.result.sum;//统计行数据
                                    }
                                });
                            }
                            //合计行数据处理
                            for(var p in sum){
                                if(isNaN(sum[p])) {
                                    sum[p] = sum[p].toFixed(2);
                                }
                            }
                            var sumJson = {"realName": '合计'};
                            $("#salaryCalculateList").footerData('set', $.extend(sumJson,sum));
                            $. xljUtils.addGridScroll();
                            $.xljUtils.gridResizeFn();
                            $('#salaryCalculateList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                            //冻结列
                            jQuery("#salaryCalculateList").jqGrid('setFrozenColumns');

                            //人数汇总显示
                            initEntryAndLeaveNum();

                            rowDataBefore = rowData;
                            // if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                            //      //添加回显选中行样式
                            //      $('#salaryCalculateList').setSelection(rowDataBefore.id,true);
                            //      $('#salaryCalculateList '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight");
                            //  }
                            
                            //非第一页聚焦
                            if (focusW == null){
                                $("#salaryCalculateList tr").last().find(":input[role='checkbox']").prop('checked', true);
                                $("#salaryCalculateList tr").last().find(":input[role='checkbox']").trigger("click");
                            }
                            //聚焦选中
                            if (focusId != undefined && focusId != null){
                                $("#salaryCalculateList").setSelection(focusId);
                            }

                        },
                        beforeSaveCell: function (rowid, cellname, value, iRow, iCol) {//在验证输入数据（如果存在）之前触发
                            if (!$.isNumeric(value)) {
                                pop_tip_open("blue", "请输入有效数字！");
                                flag="1";
                                return lastVaule;
                            }
                            if(value == 0 && value.length>1){
                                pop_tip_open("blue", "请输入正确格式的数字！");
                                flag="1";
                                return lastVaule;
                            }
                            var value1=value.split(".");
                            for(var i in tempShowField) {
                                if(tempShowField[i].code==cellname){
                                    //数据类型为小数
                                    if(tempShowField[i].type=="2"){
                                        var valueLength;
                                        if(value1.length==1){
                                            valueLength=value1[0].length;
                                        }else if(value1.length==2) {
                                            if(value1[0]=="0"){
                                                valueLength=value1[1].length;
                                            }else{
                                                valueLength=value1[0].length+value1[1].length;
                                            }
                                        }
                                        if(valueLength>4){
                                            pop_tip_open("blue", "输入的数字长度不能大于4！");
                                            flag="1";
                                            return lastVaule;
                                        }
                                    }
                                    //数据类型为金钱类型
                                    if(tempShowField[i].type=="8"){
                                        if(value1.length==1){
                                            if(value1[0].length>16){
                                                pop_tip_open("blue", "输入的数字整数位长度不能大于16！");
                                                flag="1";
                                                return lastVaule;
                                            }
                                        }else if(value1.length==2) {
                                            if(value1[0].length>16){
                                                pop_tip_open("blue", "输入的数字整数位长度不能大于16！");
                                                flag="1";
                                                return lastVaule;
                                            }
                                            if(value1[1].length>4){
                                                pop_tip_open("blue", "输入的数字小数位长度不能大于4！");
                                                flag="1";
                                                return lastVaule;
                                            }
                                        }
                                    }
                                    //字符和整数类型不能输入小数
                                    if(tempShowField[i].type=="1"||tempShowField[i].type=="3"){
                                        if(value1[1]!=null&&value1[1].length>0){
                                            pop_tip_open("blue", "输入的不能包含小数!");
                                            flag="1";
                                            return lastVaule;
                                        }
                                    }
                                }
                            }

                            //当发薪期间状态为草稿或者是归档时，数据库才会保存相对应值
                            if (payPeriod.status == '0' || payPeriod.status == '3') {
                                //保存数据
                                var updateId = $("#salaryCalculateList").getCell(rowid,"id");
                                var ColumnName = cellname;
                                var tempValue = value;
                                $.ajax({
                                    type: "POST",
                                    url: hostUrl + "wage/wagePayHistory/updateSalaryItemValue",
                                    data: JSON.stringify({payPeriodId: payPeriod.id,updateId: updateId,updateName:ColumnName,value:tempValue}),
                                    dataType: "JSON",
                                    async: false,
                                    contentType: "application/json",
                                    success: function (data) {
                                        if (!data.success) {
                                            pop_tip_open("blue", "数据修改失败！");
                                            flag="1";
                                            return calculateDate[iRow-1][cellname];
                                        }else {
                                            // calculateFlag = true;
                                        }
                                    },
                                    error:function () {
                                        pop_tip_open("red", "数据修改失败！");
                                        flag="1";
                                        return calculateDate[iRow-1][cellname];
                                    }
                                });
                            }
                        },
                        beforeEditCell:function(rowid,cellname,v,iRow,iCol){ //方便使用getRowData方法，可编辑表格状态下，获取具体内容，而不是html
                            lastrow = iRow;//单元格所在行的行号（注意不要和rowid搞混），iRow从1开始
                            lastcell = iCol;//单元格处于行中的列号，iCol从0开始
                            lastVaule = v;//记录编辑前的单元格内容
                        },
                        loadComplete:function () {
                            // 冻结列样式
                            $.xljUtils.setFrozenColumnStyle(41);
                            // 冻结列样式end
                        }
                    });
                } else {
                    pop_tip_open("blue", "请在设置中完善计薪日期设置！");
                    return false;
                }
            }
        });
    };

    //薪资计算
    window.salaryCalculate = function () {

        flag="0";//避免单元格输入错误还能自动进行计算
        $("#salaryCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
        if(flag=="1"){
            flag=="0";
            return;
        }
        var calculateVlaue = [];//为区分计算项是参与计算还是
        var saveDto = {payPeriodId: payPeriod.id};
        saveDto.calculateVlaue = calculateVlaue;

        //获取查询得到的总记录数量
        var importValue = [];
        var total = $("#salaryCalculateList").jqGrid('getGridParam', 'records');//获取页面总行数，避免无数据进行计算
        if (total != '' && total != null && total > 0) {
            saveDto.importValue = importValue;//因计算全部人员，不应传人员ID至后台
            $.ajax({
                type: "POST",
                url: hostUrl + "wage/wagePayHistory/salaryCalculate",
                dataType: "JSON",
                data: JSON.stringify(saveDto),
                contentType: "application/json",
                success: function (data) {
                    if(data.success) {
                        pop_tip_open("green", "薪资计算成功！");
                        calculateFlag = true;
                        $('#salaryCalculateList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                        $('#salaryCalculateList').jqGrid().trigger("reloadGrid");
                    }else {
                        pop_tip_open("blue",data.message);
                    }

                },
                error:function (data) {
                    pop_tip_open("red", data.message);
                }
            });
        } else {
            pop_tip_open("blue", "没有需要计算薪资的人员");
        }

    };

    //归档
    window.salaryFiling = function () {

        var title = "您确认归档该月报表吗？";

        //获取当前期间的信息
        if(payPeriod!=null&&payPeriod!=''&&payPeriod.id!=null&&payPeriod.id!='') {
            var tempPeriodId = payPeriod.id;
            $.ajax({
                type:'get',
                url:hostUrl +"/wage/wagePayPeriod/get/"+payPeriod.id,
                success: function(data) {
                    if(data.success&&data.result!=null) {
                        payPeriod = data.result;
                        payPeriod.id = tempPeriodId;//get后，id变为sid

                        if(payPeriod.status=="4") { //已经审批完成
                            pop_tip_open("red","该月报表已成历史报表，请刷新页面重新进入！");
                            return false;
                        }
                        if(payPeriod.status=='3') { //已归档
                            title = "该月报表已归档过，重新归档将覆盖上一份报表，您确认要再次归档吗？";
                        }
                        pop_text_open("blue", title, function () {
                            $.ajax({
                                url: hostUrl + "wage/wagePayPeriod/salaryFiling",
                                type: 'post',
                                dataType: 'JSON',
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    payPeriodId : payPeriod.sid,
                                    startDay:startDay,
                                    endDay:endDay
                                }),
                                success: function (resultData) {
                                    if (resultData) {
                                        var successFlag = resultData.success;
                                        var result = resultData.result;
                                        var message = resultData.message;
                                        if (successFlag) {
                                            pop_tip_open("green", "薪资归档成功！");
                                            //更新期间状态
                                            payPeriod.status = '3';

                                            $("#createPayPeriodBtn").attr("disabled", false);

                                        } else {
                                            pop_tip_open("blue", "薪资归档失败！" + message);
                                        }
                                    }
                                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    pop_tip_open("red", "数据修改保存请求失败");
                                }

                            });
                        }, true);
                    }else {
                        pop_tip_open("blue","当前期间信息为空，请刷新页面！");
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    pop_tip_open("red","初始化当前期间信息请求失败");
                }
            });
        } else {
            pop_tip_open("blue","当前期间信息为空，请刷新页面！");
        }
    };

    //导入
    window.wageImportInfo = function (type) {
        var todoHtml = "wage_salary_calculate_upload.html";//导入薪资计算数据
         if(type==2) { //导入调定薪数据
            todoHtml="wage_adjust_upload.html"
        }
        //列表查询条件
        storageDate();
        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        localStorage.setItem('nameOrCodeByCal',nameOrCodeByCal);
        localStorage.setItem('orgId',orgId);
        window.location.href=todoHtml;
    };

    //返回上一级
    window.goBack = function () {
        window.history.go(-1);
    };

    //名称查询  回车查询
    $('#nameOrCodeByCal').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByCal();
        }
    });

    //点击查询按钮进行筛选查询
    window.refreshJqGridDataByCal=function () {
        var nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var orgId = $("#orgId").val();
        var empType = $("#empType").val();
        var empTypeStr = "";
        if(empType!=null&&empType.length>0){
            for(var i=0;i<empType.length;i++){
                if(empTypeStr.length>0){
                    empTypeStr+=',';
                }
                empTypeStr+=empType[i];
            }
        }
        var queryDataPost = {};
        queryDataPost.nameOrCodeByCal = nameOrCodeByCal;
        queryDataPost.queryOrgIds = orgId;
        queryDataPost.empTypes = empTypeStr;
        queryDataPost.page = 1;
        calculateFlag = true;
        queryDataPost.queryCalculateStatus=queryCalculateStatus;
        //$('#salaryCalculateList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $("#salaryCalculateList").jqGrid("setGridParam", {url :hostUrl + 'wage/wagePayHistory/queryValueListByCalculate', postData: queryDataPost}).trigger("reloadGrid");
    };

    //期间非草稿状态，隐藏部分按钮
    window.hideBtn = function () {
        $("#calculateAllBtn").hide();
        $("#calculatePortionBtn").hide();
        $("#applyBtn").hide();
        $("#btachUpdateBtn").hide();
        $("#importBtn").hide();
        $("#importBtn").hide();
        $("#foumalCalculateBtn").hide();
    };

    //期间是草稿状态，显示所有按钮
    window.showBtn = function () {
        $("#calculateAllBtn").show();
        $("#calculatePortionBtn").show();
        $("#applyBtn").show();
        $("#btachUpdateBtn").show();
        $("#importBtn").show();
        $("#importBtn").show();
        $("#foumalCalculateBtn").show();
    };


    //变动人员
    window.recordChange = function () {
        storageDate();
        localStorage.setItem('payPeriodId',JSON.stringify(payPeriod.id));
        localStorage.setItem('payPeriod',JSON.stringify(payPeriod.payPeriod));
        window.location.href="wage_salary_record_change.html";
    };

    //调定薪
    window.salaryAdjustment = function () {
        // var rowIds=$('#salaryCalculateList').jqGrid("getGridParam","selarrrow");
        // if(rowIds.length==0){
        //     pop_tip_open("blue","请选择需要调定的人员记录！");
        //     return;
        // }
        // if(rowIds.length!=1){
        //     pop_tip_open("blue","只能选择一个人员进行调定薪！");
        //     return;
        // }
        // //根据选中的行获取每行的数据对象
        // var rowData = $("#salaryCalculateList").jqGrid('getRowData', rowIds[0]);
        // //获取指定行对象的name属性的元素
        // var personId = rowData.personId;
        // var realName = rowData.realName;
        // var mobile = rowData.mobile;
        // var prefixName = rowData.prefixName;
        // storageDate();
        // //标记需要返回的页面
        // localStorage.setItem('goBackHtml',JSON.stringify("calculate"));
        // localStorage.setItem('personId',JSON.stringify(personId));
        // localStorage.setItem('realName',JSON.stringify(realName));
        // localStorage.setItem('mobile',JSON.stringify(mobile));
        // localStorage.setItem('prefixName',JSON.stringify(prefixName));

        window.location.href="wage_salary_adjustment.html";
    };

    //年终奖
    window.yearAward = function () {
        localStorage.setItem('periodFlag',JSON.stringify("wageCalculate"));
        window.location.href="wage_year_award_pay_period.html";
    };

    //设置
    window.salarySet = function () {
        storageDate();
        window.location.href="wage_basics_setting.html";
    };

    //按照状态查询数据
    /* 为空指的就是默认查询所有
    * entry: 新入职
    * leave: 离职
    * noAdjust: 未定薪
    * adjust: 定薪
    */
    window.queryCalculateStatus = function (type) {
        queryCalculateStatus = type;
        refreshJqGridDataByCal();

    };

    //查看在职数据
    window.empEntryView = function () {
        window.location.href="wage_entry_list.html";
    };

    //查看在职数据
    window.empLeaveView = function () {
        window.location.href="wage_leave_list.html";
    };

    //历史月报
    window.historyFile = function () {
        storageDate();
        window.location.href="wage_history_file.html";
    };

    //当前月报
    window.currentFile = function () {
        if(payPeriod!=null&&payPeriod.status=='3') {
            storageDate();
            localStorage.setItem('payPeriodId',JSON.stringify(payPeriod.id));
            window.location.href="wage_month_report.html";
        } else {
            pop_tip_open("blue","未归档，无法查看当前月报！");
        }
    };

    //查看薪资详情
    window.viewWageInfo = function () {
        storageDate();
        window.location.href="wage_info_detail.html";
    };

    //删除人员
    window.deletePerson = function () {
        var rowIds=$('#salaryCalculateList').jqGrid("getGridParam","selarrrow");
        if(rowIds.length==0){
            pop_tip_open("red","请选择需要减少的人员记录！");
            return;
        }
        //组装参数
        var itemAdd = [];
        for(var i in rowIds){
            //根据选中的行获取每行的数据对象
            var rowData = $("#salaryCalculateList").jqGrid('getRowData', rowIds[i]);
            //获取指定行对象的name属性的元素
            var personId = rowData.personId;
            var id = rowData.id;
            itemAdd.push({"personId":personId,"id":id})
        }
        var data = {"WageRecords":itemAdd,"type":"1"};
        pop_text_open("blue",'确定删除这'+rowIds.length+'条数据吗？',function(){
            $.ajax({
                type:'post',
                url: hostUrl + "wage/wageRecord/deletePersonBatch",
                // async: false,
                dataType:'json',
                contentType:'application/json',
                data:JSON.stringify(data),
                success:function (xhr,textStatus ) {
                    console.log(xhr);
                    if (xhr){
                        if(xhr.success) {

                            calculateFlag = true;

                            //刷新前先去除冻结列
                            $('#salaryCalculateList').jqGrid('destroyFrozenColumns');

                            //刷新聚焦处理开始
                            var w = $.hrUtils.focusNode(rowIds);
                            focusW = w;

                            if (w == null){
                                var queryData = {
                                    datatype:'json',
                                    page:1
                                };
                                $('#salaryCalculateList').jqGrid('setGridParam',queryData).trigger("reloadGrid");
                            }else {
                                $('#salaryCalculateList').jqGrid('setGridParam',{
                                    gridComplete:function () {
                                        if (w != null && w != ""){
                                            $('#salaryCalculateList').setSelection(w);
                                        }
                                        w = "";
                                    }
                                }).trigger("reloadGrid");
                            }
                            //刷新聚焦处理结束

                            $.xljUtils.tip("green","人员删除成功！");

                            //刷新人数统计显示
                            initEntryAndLeaveNum();
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

    //期间新建
    window.createPayPeriod = function () {
        pop_text_open("blue","新建报表则"+payPeriod.payPeriod+"月报表将不能再修改，且您上一次归档之后的修改将不会被保存。您是否确定现在就开始做下月工资?",function(){
            $.ajax({
                url:hostUrl+"wage/wagePayPeriod/createPayPeriod",
                type:'POST',
                dataType:'JSON',
                contentType:'application/json',
                data:JSON.stringify({type:"1"}),
                success: function(resultData){
                    if(resultData!=null) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var message = resultData.message;
                        if(successFlag) {
                            $.xljUtils.tip("green","发薪期间新增成功！");
                            // payPeriod = result;
                            // payPeriodId = result.id;
                            $('#salaryCalculateList').GridUnload();//卸载garid
                            initSalaryCalculate();
                        }else {
                            pop_tip_open("blue",message);
                        }
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    pop_tip_open("red","发薪期间请求失败");
                }
            });
        },true);
    };

    //刷新人数统计显示
    window.initEntryAndLeaveNum = function () {
        $.ajax({
            url:hostUrl+"wage/wageRecord/queryPersonList",
            type:'POST',
            dataType:'JSON',
            contentType:'application/json',
            data:JSON.stringify({startDay:startDay,endDay:endDay,updateTime:new Date().getTime()}),
            success: function(resultData){
                if(resultData!=null) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var message = resultData.message;
                    if(successFlag) {
                        $("#entryCount").html(result.entryCount);
                        $("#leaveCount").html(result.leaveCount);
                        $("#adjustCount").html(result.adjustCount);
                        $("#notAdjustCount").html(result.notAdjustCount);
                        $("#allCount").html(result.allCount);
                        // $.xljUtils.tip("green","发薪期间新增成功！");
                    }else {
                        pop_tip_open("blue",message);
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","发薪期间请求失败");
            }
        });
    };

    //查询条件记录
    window.storageDate = function () {

        var show_nameOrCodeByCal = $("#nameOrCodeByCal").val();
        var show_orgIds = $("#orgId").val();
        var show_orgNames = $("#orgName").val();

        localStorage.setItem("show_nameOrCodeByCal", show_nameOrCodeByCal);
        localStorage.setItem("show_orgIds", show_orgIds);
        localStorage.setItem("show_orgNames", show_orgNames);
        localStorage.setItem("queryCalculateStatus", queryCalculateStatus);
    };

    //查询条件回显
    window.storageShow = function () {
        var show_nameOrCodeByCal = localStorage.getItem("show_nameOrCodeByCal");
        var show_orgIds = localStorage.getItem("show_orgIds");
        var show_orgNames = localStorage.getItem("show_orgNames");
        queryCalculateStatus=localStorage.getItem("queryCalculateStatus");

        if(show_nameOrCodeByCal!=null&&show_nameOrCodeByCal!=""&&show_nameOrCodeByCal!=undefined) {
            $("#nameOrCodeByCal").val(show_nameOrCodeByCal);
        }
        if(show_orgIds!=null&&show_orgIds!=""&&show_orgIds!=undefined&&show_orgNames!=null&&show_orgNames!=""&&show_orgNames!=undefined) {
            $("#orgId").val(show_orgIds);
            $("#orgName").val(show_orgNames);
        }
    };

    //显示状态
    window.personTypeFmatter = function(cellvalue, options, rowObject){
        if(cellvalue == null || cellvalue=='') {
            return "在职";
        }else {
            return cellvalue;
        }
    };

    //显示状态反格式化，用于数据获取
    window.unPersonTypeFmatter = function(cellvalue, options, rowObject) {
        if(cellvalue == "在职") {
            return '';
        }
    };

    $(function () {

        focusId = localStorage.getItem('personId');
        if (focusId != null && focusId != '' && focusId != 'undefined') {
            focusId = JSON.parse(focusId);
        }
        localStorage.removeItem('personId');
//        resizeHeight();
        queryAuth();

        //查询条件记录
        var queryFlag = $.xljUtils.getUrlParam("queryFlag");
        if (queryFlag == "01") {
            storageShow();
        }
        initSalaryCalculate();//初始化薪资计算页面

        //名称查询  回车查询
        $('#nameOrCodeByCal').bind('keypress',function(event){
            if(event.keyCode == "13") {
                refreshJqGridDataByCal();
            }
        });
        //显示状态样式初始化  add by tangsq since 20180608
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
            $(this).parents('.fullWidth').children('input').val('');
        });
        $('#valueEmptyOrg').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });
        //单元格修改保存
        $('html').bind('click blur', function (e) { //用于点击其他地方保存正在编辑状态下的行
            if (lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
                if ($(e.target).closest('#salaryCalculateList').length == 0) {
                    $("#salaryCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }
        });

        //单元格修改后长时间自动保存
        $('html').keyup(function (e) {//自动保存
            lastTime = e.timeStamp;
            setTimeout(function () {
                if (lastTime - e.timeStamp == 0 && lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
                    $("#salaryCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }, 1000);
        });
        resizeGrid();
    });

})(jQuery, window, document);

