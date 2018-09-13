/**
 * Created by ciic on 2017/7/17.
 */
var account_id;
var si_time;//社保期间
var account_status;//社保期间状态
var calculate_id ;/*期间表id*/
var lastrow = 0;//可编辑状态下记录单元格的行号 编辑iRow行号
var lastcell = 1;//可编辑状态下记录单元格的列号
var lastVaule;//编辑前获取单元格内容
var orgSizeApplyDto;
var isShowData = [];//显示的所有具体数据。方便进行更改显示顺序
var isShowItemId;//选中是否显示的薪资项ID
var isOrNot = false;//是否需要审批
var flag="0";//单元格校验是否通过标志
var formualCalculateData = [];//所有公式计算项：进行公式计算方式设置
;
(function ($, window, document, undefined) {

    //根据期间ID获取期间相关信息
    window.getPayPeriodId = function() {
        $.ajax({
            type: "POST",
            url: serviceUrl + "si/siCalculateDate/querySiPayPeriodList",
            data: JSON.stringify({peyPeriodId: calculate_id}),
            dataType: "JSON",
            async: false,
            contentType: "application/json",
            success: function (data) {
                if(data.success) {
                    var tempAccountName = data.result[0].accountName;
                    var tempOrgName = data.result[0].orgName;
                    var tempStatus = data.result[0].accountStatus;
                    if(tempStatus=='0'||tempStatus==0) { //草稿状态才能被修改
                        //当发薪期间状态为新建时，才能展示所有按钮payPeriodStatus
                        account_status=="0";
                    } else { //禁用所有按钮
                        account_status=="1";
                    }
                    $("#account_name").val(tempOrgName+"-"+tempAccountName);
                }
                else {
                    pop_tip_open("blue", data.msg);
                }
            },
            error:function (data) {
                pop_tip_open("red", data.msg);
            }
        });
    }

    window.initBtn = function() {
        if(account_status=="1"||account_status=="2"){ //审批中或者审批通过
            //审批中的数据，按钮不可用
            // $("#calculateAllBtn").attr({"disabled":"disabled"});
            // $("#calculatePortionBtn").attr({"disabled":"disabled"});
            // $("#saveAllBtn").attr({"disabled":"disabled"});
            // $("#applyBtn1").attr({"disabled":"disabled"});
            // document.getElementById("btachUpdateBtn").style.opacity = "0.2";
            // document.getElementById("importBtn").style.opacity = "0.2";
            // document.getElementById("foumalCalculateBtn").style.opacity = "0.2";
            $("#calculateAllBtn").hide();
            $("#calculatePortionBtn").hide();
            $("#applyBtn1").hide();
            $("#btachUpdateBtn").hide();
            $("#importBtn").hide();
            $("#foumalCalculateBtn").hide();
        }else { //草稿状态
            $("#calculateAllBtn").show();
            $("#calculatePortionBtn").show();
            $("#applyBtn1").show();
            $("#btachUpdateBtn").show();
            $("#importBtn").show();
            $("#foumalCalculateBtn").show();
        }
    }

    window.initList = function() {
        $.ajax({
            url: serviceUrl + 'si/siCalculate/queryFileListByCalculate',//创建完成之后请求数据的url
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify({"accountId": account_id}),
            success: function(resultData) {
                var data = resultData.result;//所有具体的值信息
                showModel = [];//所有信息
                var tempShowField = data.showField;//查询出来的除默认展示字段外的其他需要展示字段
                //需要展示的所有记录
                showModel.push({name: 'id', label : 'id', width: 100, editable: true, sortable: false, hidden: true,key:true});
                showModel.push({name: 'personId', label : 'personId', width: 100, editable: true, sortable: false, hidden: true,key:true});
                showModel.push({name: 'siTime',label : '社保期间', width: 100,  editable: false, sortable: false,align:'center'});
                showModel.push({name: 'personName',label : '姓名', width: 100,  editable: false, sortable: false,align:'center'});
                showModel.push({name: 'orgName', label : '机构', width: 100,  editable: false, sortable: false,align:'center'});
                showModel.push({name: 'deptName',label : '部门', width: 100,  editable: false, sortable: false,align:'center'});
                showModel.push({name: 'postName',label : '岗位', width: 100,  editable: false, sortable: false,align:'center'});
                var shrinkToFit=0;
                if(tempShowField!=null&&tempShowField!=''&&tempShowField.length>0) {
                    for(var i in tempShowField) {
                        //将隐藏字段进行隐藏
                        if(tempShowField[i].visible=='1') {
                            var temp = {name:tempShowField[i].columnName ,label : tempShowField[i].name, width: 150,  align:'center',sortable:false , hidden: true};
                            showModel.push(temp);
                        }else {
                            if(account_status=="0"||account_status==0) { //支持修改
                                //如果数据来源为手工输入、公式计算、考勤，则支持手动修改金额
                                if(tempShowField[i].accountItemSource=='0'||tempShowField[i].accountItemSource=='3'||tempShowField[i].accountItemSource=='6') {
                                    var itemPerce=  parseInt(tempShowField[i].itemPerce);
                                    var temp = {name:tempShowField[i].columnName ,label : tempShowField[i].name, width: 150,  align:'center',sortable:false ,editable : true,formatter : "number",formatoptions : {decimalPlaces : itemPerce}};
                                    showModel.push(temp);
                                    shrinkToFit++;
                                    var name=tempShowField[i].columnName;
                                }
                                //数据来源为缴费规则的加上百分号
                                else {
                                    if(tempShowField[i].columnName=='illness_unit_cost'||tempShowField[i].columnName=='illness_emp_cost') {
                                        var temp = {name:tempShowField[i].columnName ,label : tempShowField[i].name,  width: 150, align:'center',sortable:false};
                                        showModel.push(temp);
                                    }else {
                                        var temp = {name:tempShowField[i].columnName ,label : tempShowField[i].name,  width: 150, align:'center',sortable:false,formatter : percentFormatter};
                                        showModel.push(temp);
                                    }
                                    shrinkToFit++;
                                }
                            }
                            else {
                                //区分比例，比例需要自带百分号
                                if(tempShowField[i].accountItemSource=='0'||tempShowField[i].accountItemSource=='3'||tempShowField[i].accountItemSource=='6') {
                                    var itemPerce=  parseInt(tempShowField[i].itemPerce);
                                    var temp = {
                                        name:tempShowField[i].columnName ,
                                        label : tempShowField[i].name,
                                        width: 150,
                                        align:'center',
                                        sortable:false ,
                                        formatter : "number",
                                        formatoptions : {decimalPlaces : itemPerce}
                                    };
                                    showModel.push(temp);
                                    shrinkToFit++;
                                    var name=tempShowField[i].columnName;
                                }
                                //数据来源为缴费规则的加上百分号
                                else {
                                    //排除大病单位和个人缴费金额
                                    if(tempShowField[i].columnName=='illness_unit_cost'||tempShowField[i].columnName=='illness_emp_cost') {
                                        var temp = {
                                            name:tempShowField[i].columnName ,
                                            label : tempShowField[i].name,
                                            width: 150, align:'center',
                                            sortable:false
                                        };
                                        showModel.push(temp);
                                    }else {
                                        var temp = {
                                            name:tempShowField[i].columnName ,
                                            label : tempShowField[i].name,
                                            width: 150, align:'center',
                                            sortable:false,
                                            formatter : percentFormatter
                                        };
                                        showModel.push(temp);
                                    }
                                    shrinkToFit++;
                                }
                            }

                        }
                    }
                }
                jqgridCalculate = jQuery("#siCalculateList").jqGrid({
                    url: serviceUrl + 'si/siCalculate/queryValueListByCalculate',//创建完成之后请求数据的url
                    ajaxGridOptions: {contentType: 'application/json'},
                    mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                    contentType: "application/json",
                    postData: {"accountId": account_id,"peyPeriodId":calculate_id},
                    datatype: "json",
                    autowidth:true,
                    height: $(window).height() - 200,
                    shrinkToFit:shrinkToFit>5?false:true,
                    // shrinkToFit:false,
                    rownumbers: true,
                    multiselect: true,
                    jsonReader: {
                        // root:"result"
                        repeatitems: false
                    },
                    colModel:showModel,//动态表格
                    rowNum: 20,//一页显示多少条 -1全部
                    rowList: [20, 50, 100,200],//可供用户选择一页显示多少条
                    pager: "#pager",//表格页脚的占位符(一般是div)的id
                    viewrecords: true, //定义是否要显示总记录数
                    cellEdit: true,//是否开启单元格的编辑功能
                    cellsubmit : "clientArray",//修改内容后用getChangedCells获取
                    gridComplete: function () { //滚动条
                        resizeGrid();
                        $. xljUtils.addGridScroll();
                        $. xljUtils.gridResizeFn();
                    },
                    beforeSaveCell:function (rowid, cellname, value, iRow, iCol) {//在验证输入数据（如果存在）之前触发
                        var reg = /^-?\d+(\.\d+)?$/;
                        if (!reg.test(value)) {
                            pop_tip_open("blue", "请输入数字！");
                            flag="1";
                            return lastVaule;
                        }
                        var value1=value.split(".");
                        for(var i in tempShowField) {
                            if(tempShowField[i].columnName==cellname){
                                if(tempShowField[i].dataType=="8"){
                                    var length=parseInt(tempShowField[i].itemLength)-parseInt(tempShowField[i].itemPerce);
                                    if(value1.length==1){
                                        if(value1[0].length>length){
                                            pop_tip_open("blue", "输入的数字整数位长度不能大于"+length+"！");
                                            flag="1";
                                            return lastVaule;
                                        }
                                    }else if(value1.length==2) {
                                        if(value1[0].length>length){
                                            pop_tip_open("blue", "输入的数字整数位长度不能大于"+length+"！");
                                            flag="1";
                                            return lastVaule;
                                        }
                                        if(value1[1].length>tempShowField[i].itemPerce){
                                            pop_tip_open("blue", "输入的数字小数位长度不能大于"+tempShowField[i].itemPerce+"！");
                                            flag="1";
                                            return lastVaule;
                                        }
                                    }
                                }
                                if(tempShowField[i].dataType=="2"){
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
                                    if(valueLength>6){
                                        pop_tip_open("blue", "输入的数字长度不能大于6！");
                                        flag="1";
                                        return lastVaule;
                                    }
                                }
                            }
                        }

                        //当发薪期间状态为草稿时，数据库才会保存相对应值
                        if (account_status == '0' || account_status == 0) {
                            //保存数据
                            var updateId = $("#siCalculateList").getCell(rowid,"id");//获取计算的id
                            var personId = $("#siCalculateList").getCell(rowid,"personId");//获取计算人员的id
                            var ColumnName = cellname;
                            var tempValue = value;
                            $.ajax({
                                type: "POST",
                                url: serviceUrl + "si/siCalculate/updatesiItemValue",
                                data: JSON.stringify({accountId: account_id,updateId: updateId,personId:personId,updateName:ColumnName,value:tempValue}),
                                dataType: "JSON",
                                async: false,
                                contentType: "application/json",
                                success: function (data) {
                                    if (!data.success) {
                                        pop_tip_open("blue", "数据修改失败！");
                                        flag="1";
                                        return lastVaule;
                                    }
                                }
                            });
                        }
                    },
                    beforeEditCell:function(rowid,cellname,v,iRow,iCol){ //方便使用getRowData方法，可编辑表格状态下，获取具体内容，而不是html
                        lastrow = iRow;//单元格所在行的行号（注意不要和rowid搞混），iRow从1开始
                        lastcell = iCol;//单元格处于行中的列号，iCol从0开始
                        lastVaule = v;
                    },
                    /*onCellSelect: function (id) {
                        $("#siCalculateList").jqGrid('setSelection',id);
                    }*/
                });
            }
        });
    }

    window.resizeHeight = function() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h-90)+"px");
        //右侧table
        $(".con-table .mytable").height((w_h-70)+"px");
    }

    //计算表格宽度
    window.resizeGrid = function() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height()-82);
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-1, true);
        $.xljUtils.gridResizeFn();
    }

    //grid 自适应宽度
    $(window).resize(function(){
        resizeHeight();
        resizeGrid();
    });

    //薪资计算:全部人员
    window.salaryCalculateAll = function () {
        flag="0";
        $("#siCalculateList").jqGrid("saveCell",lastrow,lastcell);//保存单元格，切换为文本模式
        if(flag=="1"){
            flag=="0";
            return;
        }
        var saveDto = {accountId:account_id};

       var calculateVlaue = [];//为区分计算项是参与计算还是
    /*    // 获取修改后的单元格行记录
        var updateDate = $("#siCalculateList").getChangedCells('dirty');
        if(updateDate!=null&&updateDate.length>0) {
            //根据行号获取记录,
            for(var tempData in updateDate) {
                var id = updateDate[tempData].id;
                var thisid= $("#siCalculateList").getCell(id,"id");//根据行号，获取ID
                updateDate[tempData].id = thisid;//替换成真是ID，方便后期进行直接保存
                calculateVlaue.push(updateDate[tempData]);
            }
        }*/
        saveDto.calculateVlaue = calculateVlaue;

        //获取查询得到的总记录数量
        var importValue = [];
        var total = $("#siCalculateList").jqGrid('getGridParam', 'records');
        if(total!=''&&total!=null&&total>0) {
            // for(var i=1;i<=total;i++) {
            //     var row=$("#siCalculateList").jqGrid("getRowData",i);  //循环获取行记录
            //     importValue.push(row);
            // }
            saveDto.importValue = importValue;
            $.ajax({
                type: "POST",
                url:serviceUrl+ "si/siCalculate/socialFundCalculate",
                dataType: "JSON",
                data: JSON.stringify(saveDto),
                contentType:"application/json",
                success: function(data){
                    if(data.success) {
                        pop_tip_open("green","计算成功！");
                        //重新加载数据
                        $('#siCalculateList').jqGrid().trigger("reloadGrid");
                        // jQuery("#siCalculateList").jqGrid("clearGridData");
                        // initList();
                    }else {
                        pop_tip_open("blue",data.msg);
                    }
                },
                error:function (data) {
                    pop_tip_open("red", data.msg);
                }
            });
        }else {
            pop_tip_open("blue","没有需要计算社保公积金的人员");
        }

    }

    //薪资计算:所选人员
    window.salaryCalculatePortion = function () {
        //获取修改后的单元格行记录
        var updateDate = $("#siCalculateList").getChangedCells('dirty');//获取所有页面更改的值
        flag="0";
        $("#siCalculateList").jqGrid("saveCell",lastrow,lastcell);//保存单元格，切换为文本模式
        if(flag=="1"){
            flag=="0";
            return;
        }

        var idsVal = $('#siCalculateList').jqGrid('getGridParam','selarrrow');  //获取选中的所有行
        if(idsVal&&idsVal!="") {
            var calculateVlaue = [];//为区分计算项是参与计算还是
            var saveDto = {accountId:account_id};
            /*//获取修改后的单元格行记录
            if(updateDate!=null&&updateDate.length>0) {
                //根据行号获取记录,
                for(var tempData in updateDate) {
                    var id = updateDate[tempData].id;
                    var thisid= $("#siCalculateList").getCell(id,"id");//根据行号，获取ID
                    updateDate[tempData].id = thisid;//替换成真是ID，方便后期进行直接保存，不进行
                    calculateVlaue.push(updateDate[tempData]);
                }
            }*/
            saveDto.calculateVlaue = calculateVlaue;

            //获取选择的所有行记录
            var importValue = [];
            for(var i=0;i<idsVal.length;i++) {
                var row=$("#siCalculateList").jqGrid("getRowData",idsVal[i]);  //循环获取行记录
                importValue.push(row);
            }
            saveDto.importValue = importValue;
            $.ajax({
                type: "POST",
                url:serviceUrl+ "si/siCalculate/socialFundCalculate",
                dataType: "JSON",
                data: JSON.stringify(saveDto),
                contentType:"application/json",
                success: function(data){
                    pop_tip_open("green","计算成功！");
                    $('#siCalculateList').jqGrid().trigger("reloadGrid");
                    //重新加载数据
                    // ("#siCalculateList").trigger("reloadGrid");
                }
            });
        }else{
            $.xljUtils.tip("blue","请选择需要参与计算的人员！");
        }
    }

    //保存数据
    window.updateAllCalaulate = function () {
        flag="0";
        $("#siCalculateList").jqGrid("saveCell",lastrow,lastcell);//保存单元格，切换为文本模式
        if(flag=="1"){
            flag=="0";
            return;
        }

        var saveDto = {accountId:account_id};
        //获取修改后的单元格行记录
        var calculateVlaue = [];//为区分计算项是参与计算还是
        /*var updateDate = $("#siCalculateList").getChangedCells('dirty');
        if(updateDate!=null&&updateDate.length>0) {
            //根据行号获取记录,
            for(var tempData in updateDate) {
                var id = updateDate[tempData].id;
                var thisid= $("#siCalculateList").getCell(id,"personId");//根据行号，获取ID
                updateDate[tempData].id = thisid;//替换成真是ID，方便后期进行直接保存
                calculateVlaue.push(updateDate[tempData]);
            }
        }*/
        saveDto.calculateVlaue = calculateVlaue;
        //获取查询得到的总记录数量
        var importValue = [];
        var total = $("#siCalculateList").jqGrid('getGridParam', 'records');
        if(total!=''&&total!=null&&total>0) {
            //表格数据
            importValue = $('#siCalculateList').jqGrid('getRowData');
            saveDto.importValue = importValue;
            $.ajax({
                type: "POST",
                url:serviceUrl+ "si/siCalculate/updateAllCalaulate",
                dataType: "JSON",
                data: JSON.stringify(saveDto),
                contentType:"application/json",
                success: function(data){
                    pop_tip_open("green","保存成功！");
                    //重新加载数据
                    $('#siCalculateList').jqGrid().trigger("reloadGrid");
                }
            });
        }else {
            pop_tip_open("blue","没有需要保存社保公积金的人员");
        }
    }

    //保存申请信息
    window.saveSysApplyInfo = function (orgSizeApplyDto) {
        $.ajax({
            url: serviceUrl + "/sys/sysApply/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(orgSizeApplyDto),
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //$.xljUtils.tip('', "保存成功！");
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("blue", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("blue", xhr.msg);
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

    //初始化申请单信息
    window.initSysApply = function () {
        var uBody = "/sys/sysApply/getSysApply?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                $("#id1").val(data.result.id);/*申请id*/
                var applyId = data.result.id;
                var applyCode = $.hrUtils.getApplyCodeByType('SISH');//初始化申请单编号
                var creater = data.result.creater;
                var createrName = data.result.createrName;
                var applicant = data.result.applicant;//经办人
                var applicantName = data.result.applicantName;
                var companyId = data.result.companyId;
                var companyName = data.result.companyName;
                var deptId = data.result.deptId;
                var deptName = data.result.deptName;
                var applyDate = data.result.applyDate;
                var type = APPLY_TYPE_CALCULATE;//公积金审核申请
                var status = data.result.status;
                var approvalDate = "0000-00-00 00:00:00";

                orgSizeApplyDto = {id:applyId,code:applyCode,creater:creater,createrName:createrName,applicant:applicant,
                    applicantName:applicantName,companyId:companyId,companyName:companyName,deptId:deptId,deptName:deptName,applyDate:applyDate,
                    type:type,status:status,approvalDate:approvalDate};
                orgSizeApplyDto.delflag = false;
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化指标集请求失败");
            }
        })
    }

    //更新hr_si_calculate_date
    window.updatePayPeriodInfo = function (calculateId,obj) {
        $.ajax({
            url: serviceUrl + "/si/siCalculateDate/update/" + calculateId,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(obj),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        //$.xljUtils.tip("green", "修改成功！");
                        $("#AReviewModul :button[class='close']").click();
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }
        });
    }

    //测试获取业务变量接口
    $("#testVarBtn").unbind('click').on('click', function () {
        var businessId = $('#id1').val();//业务申请单的id
        getBusinessObjectVar("/si/siCalculate/getBusinessCalculate", businessId, 'SISH', 'CALCULATE_FLOW');
    });

    //测试状态回调接口 D:\source2\erp-hr\hr-app\src\main\webapp\hr\si\si_calculate\si_check_view.html
    $("#testStatusCallBtn").unbind('click').on('click', function () {
        var businessId = $('#id1').val();//业务申请单的id
        statusCallBack(businessId, "SISH", 1);
    });

    //发起审批   保存
    $("#saveApply").on('click',function () {
        var name = $("#name").val();
        var remark = $("#remark").val();

        if(remark!="" && remark.length>1000){
            pop_tip_open("blue","说明长度不能超过1000！");
            return;
        }
        if(isOrNot){ //需要审批
            if(name==null || name==""){
                 pop_tip_open("blue","请填写审核主题！");
                 return false;
             }
            else if(name.length>200){
                 pop_tip_open("blue","审核主题长度不能超过200！");
                 return false;
             }
            else {
                orgSizeApplyDto.name = name;
                saveSysApplyInfo(orgSizeApplyDto)/*保存审批表*/
                var calculateId = $.xljUtils.getUrlParam("calculateId");/*期间表id*/
                var accountId = $.xljUtils.getUrlParam("accountId");/*账套id*/
                var applyId = $("#id1").val();
                var obj = {remark:remark,applyId:applyId};
                updatePayPeriodInfo(calculateId,obj);/*更新期间表hr_si_calculate_date*/
                toApplyByObjectCode(BOCODE_CALCULATE, applyId);
                // toApply(accountId,applyId);//发起申请
            }
        }else{ //不需要审批直接更改状态
            updateAccountStatus(remark);//更改状态
        }
        $("#AReviewModul").modal('hide');
        account_status="1";
        initBtn();
    });

    // window.updatePayPeriodInfo = function (calculateId,applyId) {
    //     if (calculateId != null && calculateId != "") {
    //         toApplyByObjectCode(BOCODE_CALCULATE, applyId);
    //     }else{
    //         pop_tip_open("blue", "该账套不存在!");
    //     }
    // }

    //批量修改:初始化为输入项的可以进行批量修改
    window.initBatchUpdateSelect = function () {
        $("#batchUpdateSalaryItem").empty();//清空选项
        $("#batchUpdateSalaryItem").append('<option>请选择项目</option>');
        var dto = {accountId: account_id, source: "0"};
        $.ajax({
            type: "POST",
            url: serviceUrl + "si/siCalculate/queryListByAccountId",
            data: JSON.stringify(dto),
            dataType: "JSON",
            async: false,
            contentType: "application/json",
            success: function (data) {
                if (data != null && data.result != null) {
                    for (var i = 0; i < data.result.length; i++) {
                        $("#batchUpdateSalaryItem").append(
                            ' <option value="' + data.result[i].columnName + '">' + data.result[i].name + '</option>')
                    }
                }
            }
        });
    }

    // 批量修改的人员选择校验
    $('#btachUpdateBtn').click(function () {
        if(account_status!="1"){
            $("#batchEditModul").modal('show');
            // var idsVal = $('#siCalculateList').jqGrid('getGridParam','selarrrow');  //获取选中的所有行
            // if(idsVal&&idsVal!="") {
            //     $("#batchEditModul").modal('show');
            // }else{
            //     $.xljUtils.tip("blue","请选择需要参与批量修改的人员！");
            //     $("#batchEditModul").modal('hide');
            // }
        }
    });

    //批量修改:保存
    window.saveBatchUpdate = function () {
        var tempColName = $("#batchUpdateSalaryItem").val();
        var tempValue = $("#batchUpdateValue").val();
        if (tempColName == "请选择项目") {
            pop_tip_open("blue", "请选择需要批量修改的社保公积金项目!");
            return false;
        } else if (tempValue == null || tempValue == '') {
            pop_tip_open("blue", "请填写需要批量修改的金额!");
            return false;
        }
        else {
            var idsVal = $('#siCalculateList').jqGrid('getGridParam','selarrrow');  //获取选中的所有行
            if(idsVal&&idsVal!="") {
                for(var i=0;i<idsVal.length;i++) {
                    $("#siCalculateList").jqGrid("setCell", idsVal[i], tempColName, tempValue);  //循环设置选中行相同列的值
                }
            }
            $("#batchEditModul").modal('hide');
        }
    }

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
            //如果存在选择人员，则只修改选中人员部分
            var ids=$("#siCalculateList").jqGrid('getGridParam','selarrrow');
            if(ids!=null&&ids.length>0) {
                //获取选中的所有人员
                var updateIds = "";
                for(var i=0;i<ids.length;i++) {
                    var tempRowData = $("#siCalculateList").jqGrid('getRowData',ids[i]);
                    var tempId = tempRowData.id;
                    updateIds = updateIds + tempId;
                    if(i<ids.length-1) {
                        updateIds = updateIds + ",";
                    }
                }
                //批量保存
                $.ajax({
                    type: "POST",
                    url: serviceUrl + "si/siCalculate/batchUpdateBySiItem",
                    data: JSON.stringify({accountId: account_id,updateIds: updateIds,updateName:tempColName,value:tempValue}),
                    dataType: "JSON",
                    async: false,
                    contentType: "application/json",
                    success: function (data) {
                        if (!data.success) {
                            pop_tip_open("blue", "批量修改保存失败！");
                        }else {
                            pop_tip_open("green", "批量修改保存成功！");
                            $('#siCalculateList').jqGrid().trigger("reloadGrid");
                            $('#batchEditModul').modal('hide');
                        }
                    }
                });
            } else {
                pop_text_open("blue",'未选中需要修改人员，是否修改全部人员？',function(){
                    $.ajax({
                        type: "POST",
                        url: serviceUrl + "si/siCalculate/batchUpdateBySiItem",
                        data: JSON.stringify({accountId: account_id,updateIds: updateIds,updateName:tempColName,value:tempValue}),
                        dataType: "JSON",
                        async: false,
                        contentType: "application/json",
                        success: function (data) {
                            if (!data.success) {
                                pop_tip_open("blue", "批量修改保存失败！");
                            }else {
                                pop_tip_open("green", "批量修改保存成功！");
                                $('#siCalculateList').jqGrid().trigger("reloadGrid");
                                $('#batchEditModul').modal('hide');
                            }
                        }
                    });
                },true);
            }
        }
    }

    //返回上一级
    window.goBack = function () {
        // window.location.href="si_calculate_date.html";
        window.history.go(-1);
    }

    //查询
    $('#searchBtn').click(function () {
        var nameOrCode = $("#nameOrCode").val();
        jQuery("#siCalculateList").jqGrid("setGridParam", { postData : {accountId:account_id,nameOrCode:nameOrCode},page:1}).trigger("reloadGrid");
    });

    //显示设置:初始化
    window.initIsShow = function () {
        $("#isShowTable").empty();//清空选项
        $("#isShowTable").append('<tr align=center><td class=td_lable align="center">显示名称</td><td class=td_lable align="center">是否显示</td></tr>');
        var dto = {accountId: account_id};
        $.ajax({
            type: "POST",
            url: serviceUrl + "si/siCalculate/queryListByAccountId",
            data: JSON.stringify(dto),
            dataType: "JSON",
            async: false,
            contentType: "application/json",
            success: function (data) {
                if (data != null && data.result != null) {
                    isShowData = [];//初始化选项
                    for (var i = 0; i < data.result.length; i++) {
                        isShowData.push(data.result[i]);//记录原始值
                        if (data.result[i].visible == '0') { //显示
                            $("#isShowTable").append(
                                '<tr  align="center"  onclick="toAlertMes(\'' + data.result[i].id + '\')">' +
                                '<td class=td_lable>' + data.result[i].name + '</td>' +
                                '<td><input id="' + data.result[i].id + '" type="checkbox" name="isShow"  checked="checked" onchange="updateIsShow(\'' + data.result[i].id + '\',' + i + ')"></td></tr>');
                        }
                        else { //不显示
                            $("#isShowTable").append(
                                '<tr  align="center" onclick="toAlertMes(\'' + data.result[i].id + '\')">' +
                                '    <td class=td_lable>' + data.result[i].name + '</td>' +
                                '<td><input id="' + data.result[i].id + '" type="checkbox" name="isShow"  onchange="updateIsShow(\'' + data.result[i].id + '\',' + i + ')"></td></tr>');
                        }
                    }
                    $("#showModul").modal('show');
                }
            }
        });
    }

    //是否显示:切换背景色
    window.toAlertMes = function (id) {
        $("tr").css("background-color", "");
        var tempId = '#' + id;
        var data_tr = $(tempId).parents('tr'); //获取到触发的tr
        data_tr.css("background-color", "#46A7FF");
        isShowItemId = id;
    }

    //是否显示:更改显示状态
    window.updateIsShow = function (id, index) {
        if ($("#" + id).prop("checked")) {
            isShowData[index].visible = '0';
        }
        else {
            isShowData[index].visible = '1';
        }
    }

    //是否显示：批量操作：全选、全不选
    window.updateIsShowByCheckAll = function (tempFlag) {
        //全选
        if(tempFlag=='checkAll') {
            if(isShowData!=null&&isShowData.length>0) {
                $("input[name='isShow']").each(function(){
                    $(this).prop("checked",true);
                });
                for(var i=0 ;i<isShowData.length;i++) {
                    isShowData[i].visible = '0';
                }
            }
        }
        //全不选
        else {
            if(isShowData!=null&&isShowData.length>0) {
                $("input[name='isShow']").each(function(){
                    $(this).prop("checked",false);
                });
                for(var i=0 ;i<isShowData.length;i++) {
                    isShowData[i].visible = '1';
                }
            }
        }
    }

    //是否显示:更改显示顺序
    window.changeShowOrder = function (oper) {
        if (isShowItemId == null || isShowItemId == '') {
            pop_tip_open("blue", "请选中需要更改显示顺序的薪资项!");
            return false;
        }
        var tempId = '#' + isShowItemId;
        var data_tr = $(tempId).parents('tr'); //获取到触发的tr

        if (oper == "MoveUp") {    //向上移动
            if ($(data_tr).prev().html() == null) { //获取tr的前一个相同等级的元素是否为空
                pop_tip_open("blue", "已经是最顶部了!");
                return false;
            } else {
                //手动排除第一行
                var temp = $(data_tr).prev().text();
                var fdStart = temp.indexOf("显示名称");
                if (fdStart == 0) {
                    pop_tip_open("blue", "已经是最顶部了!");
                    return false;
                } else if (fdStart == -1) {
                    $(data_tr).insertBefore($(data_tr).prev()); //将本身插入到目标tr的前面
                }
            }
        }
        else if (oper == "MoveDown") { //向下移动
            if ($(data_tr).next().html() == null) {
                pop_tip_open("blue", "已经是最低部了!");
                return;
            } else {
                $(data_tr).insertAfter($(data_tr).next()); //将本身插入到目标tr的后面
            }
        }
        else if (oper == "top") { //置顶
            if ($(data_tr).prev().html() == null) { //获取tr的前一个相同等级的元素是否为空
                pop_tip_open("blue", "已经是最顶部了!");
                return false;
            }
            else {
                //手动排除第一行
                var temp = $(data_tr).prev().text();
                var fdStart = temp.indexOf("显示名称");
                if (fdStart == 0) {
                    pop_tip_open("blue", "已经是最顶部了!");
                    return false;
                } else if (fdStart == -1) {
                    $("#isShowTable").prepend($(data_tr));//将本身插入到表格最前
                    $(data_tr).insertAfter($(data_tr).next()); //将本身插入到目标tr的后面
                }
            }
        }
        else if (oper == "last") { //置底
            if ($(data_tr).next().html() == null) { //获取tr的前一个相同等级的元素是否为空
                pop_tip_open("blue", "已经是最底部了!");
                return false;
            }
            else {
                $("#isShowTable").append($(data_tr));//将本身插入到表格最前
            }
        }
    }

    //是否显示:保存
    window.saveIsShow = function () {
        //获取表的总行数 tr
        var rows = $("#isShowTable").find("tr").length;
        if (rows < 2) {
            pop_tip_open("blue", "没有需要保存更改的显示设置!");
            return false;
        } else {
            //循环遍历表格，确定账套社保公积金项的显示顺序
            var saveDtos = [];
            for (var i = 0; i < rows; i++) {
                var temp1 = $("#isShowTable").find("tr").eq(i).text().trim();
                for (var j = 0; j < isShowData.length; j++) {
                    var tempDto = {};
                    var temp2 = isShowData[j].name.trim();
                    if (temp1 == temp2) {
                        isShowData[j].sort = i;
                        tempDto.id = isShowData[j].id;
                        tempDto.show_flag = isShowData[j].visible;
                        tempDto.sort = isShowData[j].sort;
                        saveDtos.push(tempDto);
                        break;
                    }
                }
            }
            //批量保存修改结果值
            if (saveDtos != null && saveDtos.length > 0) {
                $.ajax({
                    type: "POST",
                    url: serviceUrl + "si/siCalculate/batchUpdateIsShow",
                    dataType: "JSON",
                    data: JSON.stringify({batchUpdateItems: saveDtos}),
                    contentType: "application/json",
                    success: function (xhr) {
                        if (xhr) {
                            if (xhr.success) {
                                pop_tip_open("green", "保存成功！");
                                //重新加载数据
                                jQuery('#siCalculateList').GridUnload();
                                initList();
                            } else {
                                pop_tip_open("blue", "保存失败！");
                            }
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });
            }
            $("#showModul").modal('hide');
        }
    }

    //导出
    window.exportInfo = function () {
        //表格数据查询条件
        var nameOrCode = $("#nameOrCode").val();
        var urlBody = "si/siCalculate/exportInfo";
        var urlAll = serviceUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({accountId:account_id,nameOrCode:nameOrCode,peyPeriodId:calculate_id}),
            async: false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action', serviceUrl + "si/siCalculate/exportInfoClient");
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
        if(account_status!="1"){
            window.open('si_calculate_upload.html');
        }
    }

    //导入
    window.importRefresh = function () {
        $('#siCalculateList').jqGrid().trigger("reloadGrid");
    }

    //初始化审批设置
    window.initApprovalSetting = function () {
        var key1 = "siApprovalSetting";
        var uBody = "/sys/sysParameter/getValueByKey/" + key1;
        var uAll = serviceUrl + uBody;
        $.ajaxSetup({ cache:false });//在IE浏览器下，数据不写入缓存
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                if(data!=null&&data.result!=null) {
                    if(data.result == "0"||data.result == 0){//不需要审批
                        isOrNot = false;
                    }else{//1需要审批
                        isOrNot = true;
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化社保设置参数请求失败");
            }
        })
    }

    //更改状态
    window.updateAccountStatus = function (remark) {
        $.ajax({
            url: serviceUrl + "si/siCalculateDate/updateAccountStatus",
            type: 'post',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                accountId : account_id,
                status : 2,
                id : calculate_id,
                remark:remark
            }),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    if (successFlag) {
                        $.xljUtils.tip("green", "此账套不需要审批，操作成功！");
                    } else {
                        pop_tip_open("blue", "数据修改保存失败！");
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
    }

    $('html').bind('click blur', function(e) { //用于点击其他地方保存正在编辑状态下的行
        if (lastrow != "" && lastcell != "") { //if a row is selected for edit
            if ($(e.target).closest('#siCalculateList').length == 0) { //and the click is outside of the grid //save the row being edited and unselect the row
                $("#siCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
            }
        }
    });

    $('html').keyup(function (e) {//自动保存
        lastTime = e.timeStamp;
        setTimeout(function () {
            if (lastTime - e.timeStamp == 0 && lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
                $("#siCalculateList").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
            }
        }, 1000);
    });

    window.percentFormatter = function (cellvalue, options, rowObject) {
        if(cellvalue!=null){
            return cellvalue+'%';
        }
        return "";
    }

    //公式计算设置：初始化
    window.initFormualCalculateMethod = function () {
        $("#inputField").empty();//清空选项
        $("#calculateField").empty();//清空选项
        var dto = {accountId: account_id, source: "3"};
        $.ajax({
            type: "POST",
            url:serviceUrl+ "si/siCalculate/queryListByAccountId",
            data: JSON.stringify(dto),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(data){
                formualCalculateData = [];//初始化
                if(data!=null&&data.result!=null) {
                    formualCalculateData = data.result;
                    for(var i=0;i<data.result.length;i++){
                        $("#inputField").append(
                            ' <option value="'+data.result[i].columnName+'" >'+data.result[i].name+'</option>');
                    }
                }
            }
        });
    }

    // 公式计算设置按钮的点击
    $('#foumalCalculateBtn').click(function () {
        if(account_status!="1"){
            $("#foumalCalculateModul").modal('show');
        }
    });

    //公式计算设置：增加对比指标
    window.addFormualCalculateMethod = function() {
        //获取选中的指标项ID
        var tempSelect = $("#inputField").val();
        //获取Select选择的Text
        var checkText=$("#inputField").find("option:selected").text();
        if(tempSelect!=null&&tempSelect!='') {
            $("#calculateField").append("<option value='"+tempSelect+"'>"+checkText+"</option>"); //为Select追加一个Option(下拉项)
            $("#inputField option[value='"+tempSelect+"']").remove(); //删除选中的
        }else {
            pop_tip_open("blue","请选择需要添加对比的指标!");
        }
    }

    //公式计算设置：减少对比指标
    window.delFormualCalculateMethod = function() {
        //获取选中的指标项ID
        var tempSelect = $("#calculateField").val();
        //获取Select选择的Text
        var checkText=$("#calculateField").find("option:selected").text();
        if(tempSelect!=null&&tempSelect!='') {
            $("#inputField").append("<option value='"+tempSelect+"'>"+checkText+"</option>"); //为Select追加一个Option(下拉项)
            $("#calculateField option[value='"+tempSelect+"']").remove(); //删除选中的
        }else {
            pop_tip_open("blue","请选择需要删除对比的指标!");
        }
    }

    //公式计算设置;批量操作：全加、全删
    window.batchFormualCalculateMethod = function (tempFlag) {
        //全加
        if(tempFlag=="batchAdd") {
            //遍历option和添加、移除option
            $("#inputField option").each(function(){ //遍历全部option
                var checkText=$(this).text();
                var checkId=$(this).val();
                $("#calculateField").append("<option value='"+checkId+"' >"+checkText+"</option>"); //为Select追加一个Option(下拉项)
                $("#inputField option[value='"+checkId+"']").remove(); //删除选中的
            });
        }
        //全删
        else {
            //遍历option和添加、移除option
            $("#calculateField option").each(function(){ //遍历全部option
                var checkText=$(this).text();
                var checkId=$(this).val();
                $("#inputField").append("<option value='"+checkId+"' >"+checkText+"</option>"); //为Select追加一个Option(下拉项)
                $("#calculateField option[value='"+checkId+"']").remove(); //删除选中的
            });
        }
    }

    //公式计算设置：保存
    window.saveFormualCalculateMethod = function() {

        if(formualCalculateData!=null&&formualCalculateData.length>0) {


            if(document.getElementById("calculateField").options.length<1) {
                pop_tip_open("blue", "没有需要保存计算方式为公式计算的指标!");
                return false;
            }

            //获取所有的对比指标
            var itemCodes = "";
            $("#calculateField option").each(function(){ //遍历全部option
                var value = $(this).val(); //获取option的内容
                if(value!=''&&value!=null) {
                    if(itemCodes!=""&&itemCodes.length>0) {
                        itemCodes = itemCodes + ",";
                    }
                    itemCodes = itemCodes + value;
                }
            });

            //获取需要保存的人员
            var ids=$("#siCalculateList").jqGrid('getGridParam','selarrrow');
            if(ids!=null&&ids.length>0) {
                //获取选中的所有人员
                var personIds = "";
                for(var i=0;i<ids.length;i++) {
                    var tempRowData = $("#siCalculateList").jqGrid('getRowData', ids[i]);
                    var personId = tempRowData.personId;
                    personIds = personIds + personId;
                    if (i < ids.length - 1) {
                        personIds = personIds + ",";
                    }
                }
                $.ajax({
                    type: "POST",
                    url:serviceUrl+ "si/siCalculate/setFormualCalculateMethod",
                    dataType: "JSON",
                    data: JSON.stringify({personIds:personIds,accountId:account_id,itemCodes:itemCodes}),
                    contentType:"application/json",
                    success: function (xhr) {
                        if (xhr) {
                            if (xhr.success) {
                                pop_tip_open("green", "保存成功！");
                                $('#foumalCalculateModul').modal('hide');
                            } else {
                                pop_tip_open("blue", "保存失败！");
                            }
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });
            }
            else {
                pop_text_open("blue",'未选中需要设置的修改人员，是否设置全部人员？',function(){
                    //直接保存
                    $.ajax({
                        type: "POST",
                        url:serviceUrl+ "si/siCalculate/setFormualCalculateMethod",
                        dataType: "JSON",
                        data: JSON.stringify({accountId:account_id,itemCodes:itemCodes}),
                        contentType:"application/json",
                        success: function (xhr) {
                            if (xhr) {
                                if (xhr.success) {
                                    pop_tip_open("green", "保存成功！");
                                    $('#foumalCalculateModul').modal('hide');
                                } else {
                                    pop_tip_open("blue", "保存失败！");
                                }
                            }
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(xhr);
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                        }
                    });
                },true);
            }


        }
        else {
            pop_tip_open("blue","没有需要保存的公式计算指标!");
            return false;
        }
    }

    $("#showModulBtn").click(function () {
        initIsShow();//初始化显示设置
    });


    $(function () {
        account_id = $.xljUtils.getUrlParam("accountId");
        si_time = $.xljUtils.getUrlParam("siTime");
        account_status = $.xljUtils.getUrlParam("accountStatus");
        calculate_id = $.xljUtils.getUrlParam("calculateId");/*期间表id*/
        initApprovalSetting();//初始化审批设置
        getPayPeriodId();//初始化账套信息
        resizeHeight();
        initBtn();//初始化按钮
        initList();//初始化表格
        initSysApply();/*初始化审批信息*/
        initBatchUpdateSelect();
        initFormualCalculateMethod();//初始化公式计算设置

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });

        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        resizeGrid();
    });

})(jQuery, window, document);