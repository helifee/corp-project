/**
 * ruanxin
 * 薪资计算js
 */
var accountId;//选中的薪资账套ID
var payPeriodId;//发薪期间ID
var applyId;//申请审批单Id
var payPeriodStatus;//发薪期间状态，确定操作状态：0 草稿、1：审批中  2：完成
;
(function ($, window, document, undefined) {
    //定义全局参数
    var rowData;    //行数据
    var payPeriod;//发薪期间
    var sizeApplyDto;//申请审批单对象
    var showModel = [];//展示的具体内容
    var calculateDate = [];//计算相关的所有具体值
    var jqgridCalculate;//计算列表
    var lastrow = 0;//可编辑状态下记录单元格的行号 编辑iRow行号
    var lastcell = 1;//可编辑状态下记录单元格的列号
    var lastVaule;//编辑前获取单元格内容
    var isShowData = [];//显示的所有具体数据。方便进行更改显示顺序
    var isShowItemId;//选中是否显示的薪资项ID

    var fsalary ;//账套的实发金额
    var isOrNot = false;//是否需要审批
    var flag="0";//单元格校验是否通过标志
    var formualCalculateData = [];//所有公式计算项：进行公式计算方式设置

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //表示con-table 下的mytable1
        $(".tableStyle").height((w_h - 100) + "px");
    }

    //计算表格宽度
    function resizeGrid() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.tableStyle').height() - 120);
        //$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.tableStyle').width()-10, true);
        $.xljUtils.gridResizeFn();
    }

    //薪资计算:初始化
    window.initSalaryCalculate = function () {

        showModel = [];//所有信息
        //需要展示的所有记录
        showModel.push({name: 'id', label: 'id', editable: true, hidden: true, key: true});
        showModel.push({name: 'personId', label: 'personId', editable: true, hidden: true});
        showModel.push({name: 'personName', label: '姓名', editable: false, sortable: false, align: 'center',width:120});
        showModel.push({name: 'erpAccount', label: '账号', editable: false, sortable: false, align: 'center',width:120});
        showModel.push({name: 'prefixName', label: '所属机构', editable: false, sortable: false, align: 'center',width:220});
        showModel.push({name: 'dept', label: '部门', editable: false, sortable: false, align: 'center',width:220});
        showModel.push({name: 'post', label: '岗位', editable: false, sortable: false, align: 'center',width:220});
        showModel.push({name: 'personStatus', label: '员工状态', editable: false, sortable: false, align: 'center',width:160});
        showModel.push({name: 'type', label: '应发年终奖', editable: false, sortable: false, align: 'center',width:160});
        showModel.push({name: 't2', label: '个税', editable: false, sortable: false, align: 'center',width:160});
        showModel.push({name: 't1', label: '实发年终奖', editable: false, sortable: false, align: 'center',width:160});
        showModel.push({name: 'deptName', label: '入职时间', editable: false, sortable: false, align: 'center',width:200});
        showModel.push({name: 'postName', label: '离职时间', editable: false, sortable: false, align: 'center',width:160});
        jqgridCalculate = jQuery("#yearAwardCalculateList").jqGrid({
            datatype: "json",
            multiboxonly: true,//只能通过复选框进行多选
            autowidth: true,
            height: $(window).height() - 185,
            footerrow: true,//分页上添加一行，用于显示统计信息
            colModel:showModel,//动态表格
            rowNum: -1
        });
    };

    //批量修改:初始化为输入项的可以进行批量修改
    window.initBatchUpdateSelect = function () {

        $("#batchUpdateSalaryItem").empty();//清空选项
        $("#batchUpdateSalaryItem").append('<option>请选择项目</option>');
        var dto = {accountId: accountId, salaryItemSource: "0"};
        $.ajax({
            type: "POST",
            url: serviceUrl + "wage/wageAccountSalaryItem/queryListByAccountId",
            data: JSON.stringify(dto),
            dataType: "JSON",
            async: false,
            contentType: "application/json",
            success: function (data) {
                if (data != null && data.result != null) {
                    for (var i = 0; i < data.result.length; i++) {
                        $("#batchUpdateSalaryItem").append(
                            ' <option value="' + data.result[i].itemCode + '">' + data.result[i].itemName + '</option>')
                    }
                }
            }
        });
    };

    //批量修改：保存（保存至数据库）
    window.saveBatchUpdateByNew = function () {
        var tempColName = $("#batchUpdateSalaryItem").val();
        var tempValue = $("#batchUpdateValue").val();
        if (tempColName == "请选择项目") {
            pop_tip_open("blue", "请选择需要批量修改的薪资项!");
            return false;
        } else if (tempValue == null || tempValue == '') {
            pop_tip_open("blue", "请选择需要批量修改的金额!");
            return false;
        }
        else {
            if (!$.isNumeric(tempValue)) {
                pop_tip_open("blue", "请输入有效数字！");
                return false;
            }
            //如果存在选择人员，则只修改选中人员部分
            var ids=$("#yearAwardCalculateList").jqGrid('getGridParam','selarrrow');
            if(ids!=null&&ids.length>0) {
                //获取选中的所有人员
                var updateIds = "";
                for(var i=0;i<ids.length;i++) {
                    var tempRowData = $("#yearAwardCalculateList").jqGrid('getRowData',ids[i]);
                    var tempId = tempRowData.id;
                    updateIds = updateIds + tempId;
                    if(i<ids.length-1) {
                        updateIds = updateIds + ",";
                    }
                }
                //批量保存
                $.ajax({
                    type: "POST",
                    url: serviceUrl + "wage/wagePayHistory/batchUpdateBySalaryItem",
                    data: JSON.stringify({accountId: accountId,payPeriodId: payPeriodId,updateIds: updateIds,updateName:tempColName,value:tempValue}),
                    dataType: "JSON",
                    async: false,
                    contentType: "application/json",
                    success: function (data) {
                        if (!data.success) {
                            pop_tip_open("blue", data.msg);
                        }else {
                            pop_tip_open("green", "批量修改保存成功！");
                            $('#yearAwardCalculateList').jqGrid().trigger("reloadGrid");
                            // $('#yearAwardCalculateList').GridUnload();//卸载garid
                            // initSalaryCalculate();
                            $('#batchEditModul').modal('hide');
                        }
                    }
                });
            } else {
                pop_text_open("blue",'未选中需要修改人员，是否修改全部人员？',function(){
                    $.ajax({
                        type: "POST",
                        url: serviceUrl + "wage/wagePayHistory/batchUpdateBySalaryItem",
                        data: JSON.stringify({accountId: accountId,payPeriodId: payPeriodId,updateIds: updateIds,updateName:tempColName,value:tempValue}),
                        dataType: "JSON",
                        async: false,
                        contentType: "application/json",
                        success: function (data) {
                            if (!data.success) {
                                pop_tip_open("blue", data.msg);
                            }else {
                                pop_tip_open("green", "批量修改保存成功！");
                                $('#yearAwardCalculateList').jqGrid().trigger("reloadGrid");
                                // $('#yearAwardCalculateList').GridUnload();//卸载garid
                                // initSalaryCalculate();
                                $('#batchEditModul').modal('hide');
                            }
                        }
                    });
                },true);
            }
        }
    };

    //薪资计算:全部人员
    window.salaryCalculateAll = function () {
        flag="0";//避免单元格输入错误还能自动进行计算
        $("#yearAwardCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
        if(flag=="1"){
            flag=="0";
            return;
        }

        var calculateVlaue = [];//为区分计算项是参与计算还是

        var saveDto = {accountId: accountId,payPeriodId:payPeriodId};

        /**
         //以下记录被修改单元格所有的值，暂时未用。修改为单元格值修改后即保存
         //获取修改后的单元格行记录
         var updateDate = $("#yearAwardCalculateList").getChangedCells('dirty');
         if (updateDate != null && updateDate.length > 0) {
        //根据行号获取记录,  此处获取的只是ID，已经被修改值
        for (var tempData in updateDate) {
            var id = updateDate[tempData].id;
            var thisid = $("#yearAwardCalculateList").getCell(id, "id");//根据行号，获取ID
            updateDate[tempData].id = thisid;//替换成真是ID，方便后期进行直接保存
            calculateVlaue.push(updateDate[tempData]);
        }
    }
         */
        saveDto.calculateVlaue = calculateVlaue;

        //获取查询得到的总记录数量
        var importValue = [];
        var total = $("#yearAwardCalculateList").jqGrid('getGridParam', 'records');//获取页面总行数，避免无数据进行计算
        if (total != '' && total != null && total > 0) {
            saveDto.importValue = importValue;//因计算全部人员，不应传人员ID至后台
            $.ajax({
                type: "POST",
                url: serviceUrl + "wage/wagePayHistory/salaryCalculate",
                dataType: "JSON",
                data: JSON.stringify(saveDto),
                contentType: "application/json",
                success: function (data) {
                    if(data.success) {
                        pop_tip_open("green", "薪资计算成功！");
                        //获取此期间的实发金额
                        $.ajax({
                            cache: false,//避免IE缓存
                            type:'get',
                            url:serviceUrl +"/wage/wagePayPeriod/get/"+payPeriodId,
                            success: function(data) {
                                if(data.success) {
                                    var tempFsalary = 0 ;
                                    if(data.result.fsalary!=null&&data.result.fsalary!='') {
                                        tempFsalary = data.result.fsalary ;
                                    }
                                    fsalary = parseFloat(tempFsalary);
                                }
                            }
                        });
                         $('#yearAwardCalculateList').jqGrid().trigger("reloadGrid");
                        // $('#yearAwardCalculateList').GridUnload();//卸载garid
                        // initSalaryCalculate();
                    }else {
                        pop_tip_open("blue",data.msg);
                    }

                },
                error:function (data) {
                    pop_tip_open("red", data.msg);
                }
            });
        } else {
            pop_tip_open("blue", "没有需要计算薪资的人员");
        }

    };

    //导出
    window.exportInfo = function () {
        //表格数据
        rowData = $('#yearAwardCalculateList').jqGrid('getRowData');
        var urlBody = "wage/wagePayHistory/exportInfo";
        var urlAll = serviceUrl + urlBody;
        var nameOrCode = $("#nameOrCodeByCal").val();
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            // data: JSON.stringify({rowData: rowData, accountId: accountId}),
            data: JSON.stringify({payPeriodId: payPeriodId, accountId: accountId,nameOrCode:nameOrCode}),
            async: false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action', serviceUrl + "wage/wagePayHistory/exportInfoClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type', 'hidden');
                        input1.attr('name', "path");
                        input1.attr('value', path);

                        $('body').append(form);  //将表单放置在web中
                        form.append(input1);   //将查询参数控件提交到表单上
                        form.submit();   //表单提交
                        pop_tip_open("green", "导出成功");
                    }
                } else {
                    pop_tip_open("blue", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "导出失败");
            }
        })
    }

    //导入
    window.importInfo = function () {
        // var winObjEI = window.open('wage_salary_calculate_upload.html');
        window.location.href="wage_salary_calculate_upload.html";
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
    window.refreshJqGridDataByCal = function () {
        var nameOrCode = $("#nameOrCodeByCal").val();
        jQuery("#yearAwardCalculateList").jqGrid("setGridParam", { postData : {payPeriodId:payPeriodId,nameOrCode:nameOrCode}}).trigger("reloadGrid");
    };

    //保存发薪期间申请审批信息
    $("#savaApply").unbind('click').on('click', function () {
        var name = $("#name").val();
        var remark = $("#remark").val();
        if(isOrNot){        //不需要审批
            // pop_tip_open("blue", "此账套不需要审批！");
            updatePayPeriodStatus();//更改状态
        }
        else {//需要审批，走审批流
            if(name==null || name==""){
                pop_tip_open("blue","请填写审核主题！");
                return false;
            }
            else if(name.length>200){
                pop_tip_open("blue","审核主题长度不能超过200！");
                return false;
            } else if(remark!="" && remark.length>1000){
                pop_tip_open("blue","说明长度不能超过1000！");
                return;
            }else if(payPeriodStatus!='0'&&payPeriodStatus!=0) { //如果此期间不是草稿状态，则不能被提交审核
                pop_tip_open("blue", "非草稿状态的发薪期间不能被提交审核!");
            } else if(fsalary==null||fsalary=='') { //如果此期间的实发金额为空，则不能发起审核
                pop_tip_open("blue", "此期间的实发金额为空，不能进行提交审核!");
            }else {
                //1.初始化审批信息
                initSysApply();
                //3.更新发薪期间数据 管理applyId 为sysApply的id
                updatePayPeriodInfo();
                //4.发起审批
                toApplyByObjectCode(BOCODE_XZSH, applyId);
            }
        }
        //页面按钮禁止部分
        hideBtn();
    });

    //更改状态
    window.updatePayPeriodStatus = function () {
        $.ajax({
            url: serviceUrl + "wage/wagePayPeriod/updatePayPeriodStatus",
            type: 'post',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                status : 2,
                payPeriodId : payPeriodId
            }),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        pop_tip_open("green", "此账套不需要审批，操作成功！");
                        // closePage();
                        goBack();
                    } else {
                        pop_tip_open("blue", "数据修改保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
    };

    /**
     * 初始化申请单信息
     * 默认经办人为当前制单人
     */
    window.initSysApply = function () {
        var uBody = "/sys/sysApply/getSysApply?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            async:false,
            success: function (data) {
                //$("#id1").val(data.result.id);/*申请id*/
                applyId = data.result.id;
                var applyCode = $.hrUtils.getApplyCodeByType('XZSH');//初始化申请单编号
                var creater = data.result.creater;
                var createrName = data.result.createrName;
                var applicant = data.result.applicant;//经办人
                var applicantName = data.result.applicantName;
                var companyId = data.result.companyId;
                var companyName = data.result.companyName;
                var deptId = data.result.deptId;
                var deptName = data.result.deptName;
                var applyDate = data.result.applyDate;
                var type = APPLY_TYPE_XZSH;//薪资审核申请
                var status = data.result.status;
                //var approvalDate = "0000-00-00 00:00:00";
                var orgSizeApplyDto = {id:applyId,code:applyCode,creater:creater,createrName:createrName,applicant:applicant,
                    applicantName:applicantName,companyId:companyId,companyName:companyName,deptId:deptId,deptName:deptName,applyDate:applyDate,
                    type:type,status:status};
                orgSizeApplyDto.delflag = false;
                var name = $("#name").val();
                orgSizeApplyDto.name = name;
                //2.保存审批信息
                saveSysApplyInfo(orgSizeApplyDto);
                /*//申请审批单对象
                 sizeApplyDto=data.result;
                 applyId = sizeApplyDto.id;
                 //审核主题
                 var name = $('#name').val();
                 sizeApplyDto.name=name;
                 //初始化申请单编号
                 var applyCode = $.hrUtils.getApplyCodeByType('ORGSIZE');
                 sizeApplyDto.code=applyCode;
                 sizeApplyDto.type=APPLY_TYPE_XZSH;//薪资审核
                 sizeApplyDto.approvalDate="0000-00-00 00:00:00";
                 sizeApplyDto.fsalary=fsalary;//账套的实发金额
                 sizeApplyDto.payPeriod=payPeriod;//发薪期间*/
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化指标集请求失败");
            }
        })
    };

    /**
     * 修改发薪期间表，关联申请表id
     * @param n
     */
    window.updatePayPeriodInfo = function () {
        var payPeriodDto={};
        payPeriodDto.applyId=applyId;
        var remark=$('#remark').val();//说明
        payPeriodDto.remark=remark;
        $.ajax({
            url: serviceUrl + "/wage/wagePayPeriod/update/" + payPeriodId,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(payPeriodDto),
            async:false,
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var msg = resultData.msg;
                    if (successFlag) {
                        $.xljUtils.tip("green", "修改成功！");
                        $("#AReviewModul :button[class='close']").click();
                    } else {
                        pop_tip_open("blue", "数据修改保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
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

    $(function () {
        //初始化高度
        resizeHeight();
        //
        // //获取参数值
        // payPeriodId = $.xljUtils.getUrlParam("payPeriodId");
        // payPeriodStatus = $.xljUtils.getUrlParam("payPeriodStatus");
        // fsalary = $.xljUtils.getUrlParam("fsalary");
        // payPeriod = $.xljUtils.getUrlParam("payPeriod");
        // //当发薪期间状态为新建时，才能展示所有按钮payPeriodStatus
        // if (payPeriodStatus != '0' && payPeriodStatus != 0) {
        //     hideBtn();
        // } else {
        //     showBtn();
        // }
        //
        initSalaryCalculate();//初始化年终奖计算页面
        // initIsShow();//初始化是否显示相关选项
        // initBatchUpdateSelect();//初始化批量修改选项

        //公式计算设置：初始化
        $("#foumalCalculateModul").on("show.bs.modal", function() {
            initFormualCalculateMethod();
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
        // resizeGrid();

        //单元格修改保存
        $('html').bind('click blur', function (e) { //用于点击其他地方保存正在编辑状态下的行
            if (lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
                if ($(e.target).closest('#yearAwardCalculateList').length == 0) {
                    $("#yearAwardCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }
        });

        //单元格修改后长时间自动保存
        $('html').keyup(function (e) {//自动保存
            lastTime = e.timeStamp;
            setTimeout(function () {
                if (lastTime - e.timeStamp == 0 && lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
                    $("#yearAwardCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }, 1000);
        });
    });


    //变动人员
    window.personSet = function () {
        window.location.href="wage_year_award_record_change.html";
    };

    //归档
    window.setFile = function () {
        // window.location.href="wage_basics_setting.html";
        pop_tip_open("green", "归档成功!");
    };

    //新建期间
    window.createPayPeriod = function () {
        pop_tip_open("green", "是否确定新建下月期间数据 !");
    };

    //历史月报
    window.historyFiles = function () {
        // window.location.href="wage_basics_setting.html";
        pop_tip_open("green", "历史月报!");
    };

})(jQuery, window, document);

