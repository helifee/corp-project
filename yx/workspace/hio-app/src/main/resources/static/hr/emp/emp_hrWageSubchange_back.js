;(function($, window, document, undefined){
    /**
     * 专业资格认证编辑js
     */
    var id;//编辑的id
    var name;//编辑的name
    var oper;//操作
    var rowData;//选中的数据
    var uuid;
    var url;//提交的地址
    var type;//提交方法
    var orgId;//机构ID
    var workPlaceRank;//工作城市级别
    var wageAllowanceId;//补助职级
    /**
     * 时间控件--中文
     */
    $.fn.datetimepicker.dates['zh'] = {
        days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],
        daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],
        daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],
        months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],
        monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem:    ["上午", "下午"],
        today:       "今天"
    };
    /**
     * 开始时间-结束时间
     */
    $(".form_datetime").datetimepicker({
        language : 'zh',
        format : "yyyy-mm-dd",
        weekStart : 1,
        todayBtn : 1,
        autoclose : 1,
        startView : 2,
        minView:'month',
        forceParse : 0,
        showMeridian : 1
    });

    //薪资补助等级回调函数
    var wageSubTypeOptions;
    wageSubTypeOptions = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1085},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            $("#wageSubType").val(selectData.id);
            $("#wageSubType_name").val(selectData.name);
            var flag = orgId == '' ||  workPlaceRank == '' || wageAllowanceId == '' || orgId == null || workPlaceRank==null || wageAllowanceId==null ;
            //todo 根据选择的薪资/补助类型控制输入项
            if(selectData.name == '手动输入'){
                //modified by tangsq  20171110 处理选择手动输入就会弹出提示且相关金额无法输入的问题
                // if(flag){
                //     $.xljUtils.tip("blue","人员机构或者工作所在城市或者补助等级未填写，只能是手动输入！");
                // }else{
                    $("#rankAfter_name").val("其它");
                    $("#rankAfter").val("其它");
                //add by tangsq 20171110 如果选择手动输入，则工作城市级别默认为其他
                    $("#workPlaceRankAfter_name").val("其它");
                    $("#workPlaceRankAfter").val("1022100055");
                    // $("#telSubsidyAfter").val("");//话补清空
                    // $("#telSubsidyAfter").removeAttr("readonly");
                    $("#tranSubsidyAfter").val("");//交通补清空
                    $("#tranSubsidyAfter").removeAttr("readonly");
                    $("#houseSubsidyAfter").val("");//房补清空
                    $("#houseSubsidyAfter").removeAttr("readonly");
                    $("#telPercent").val("");
                    $("#tranPercent").val("");
                    $("#housePercent").val("");
                // }
            }else{
                if(flag){
                    $.xljUtils.tip("blue","人员机构或者工作所在城市或者补助等级未填写，只能是手动输入！");
                }else {
                    $("#rankAfter_name").val("");
                    $("#rankAfter").val("");
                    //$("#telSubsidyAfter").val("");//话补清空
                    //$("#telSubsidyAfter").attr("readonly","readonly");
                    $("#tranSubsidyAfter").val("");//交通补清空
                    $("#tranSubsidyAfter").attr("readonly", "readonly");
                    $("#houseSubsidyAfter").val("");//房补清空
                    $("#houseSubsidyAfter").attr("readonly", "readonly");
                    $("#telPercent").val("");
                    $("#tranPercent").val("");
                    $("#housePercent").val("");
                }
            }
        }
    };
    $('.hr-single-selector-wageSubType'). xljSingleSelector(wageSubTypeOptions);


    //todo 变动后补助等级回调函数
    var rankAfterOptions;
    rankAfterOptions = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1149},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            if($("#rankAfter_name").val() == '其它'){
                $.xljUtils.tip("blue","手动输入补助标准只能为其它！");
            }else{
                $("#rankAfter").val(selectData.id);
                $("#rankAfter_name").val(selectData.name);
                //todo 填充补助信息
                fillSub();
            }
        }
    };
    $('.hr-single-selector-wageSubRank'). xljSingleSelector(rankAfterOptions);

    //todo 变动后补助等级回调函数
    var workPlaceRankAfterOptions;
    workPlaceRankAfterOptions = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1022},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            if($("#rankAfter_name").val() == '其它'){
                $.xljUtils.tip("blue","手动输入补助标准只能为其它！");
            }else{
                $("#workPlaceRankAfter").val(selectData.id);
                $("#workPlaceRankAfter_name").val(selectData.name);
                //todo 填充补助信息
                fillSub();
            }
        }
    };
    $('.hr-single-selector-workPlaceRankAfter'). xljSingleSelector(workPlaceRankAfterOptions);

    //todo 填充补助信息
    function fillSub(){
        var orgAfter = $.xljUtils.getUrlParam("orgId");//机构ID
        var workPlaceRankAfter = $("#workPlaceRankAfter").val();//工作城市所在级别
        var subsidyRankAfter = $("#rankAfter").val();//补助职级
        //机构ID和薪资等级不为空，对补助进行赋值操作
        if(orgAfter!='' && subsidyRankAfter!=''&& subsidyRankAfter!='其它' && workPlaceRankAfter!='') {
            //机构ID和薪资等级不为空，对月薪进行赋值操作
            //todo 根据代码项和机构Id获取薪资
            $.ajax({
                url: serviceUrl + "wage/wageStandardSubsidy/querySubsidyStandardDetails",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({
                    "orgId": orgAfter,
                    "rankId": subsidyRankAfter,
                    'cityRankId': workPlaceRankAfter,
                    'codes':'traffic_allowance,housing_allowance,phone_allowance'
                }),
                success: function (xhr, textStatus) {
                    if(xhr.result.length==3){
                        for(var i=0;i<xhr.result.length;i++){
                            //modified by tangsq  20171110 去掉通话补助相关代码
                            // if(xhr.result[i].itemCode=='phone_allowance'){
                            //     $("#telSubsidyAfter").val(xhr.result[i].subsidyMoney);//通话补助
                            // }else
                            if(xhr.result[i].itemCode=='traffic_allowance'){
                                $("#tranSubsidyAfter").val(xhr.result[i].subsidyMoney);//交通补助
                            }else if(xhr.result[i].itemCode=='housing_allowance'){
                                $("#houseSubsidyAfter").val(xhr.result[i].subsidyMoney);//房补
                            }
                        }
                        // var telSubsidyBefore = $("#telSubsidyBefore").val();//变动前通话补助
                        // var telSubsidyAfter = $("#telSubsidyAfter").val();//变动后通话补助
                        var tranSubsidyBefore = $("#tranSubsidyBefore").val();//变动前交通补助
                        var tranSubsidyAfter = $("#tranSubsidyAfter").val();//变动后交通补助
                        var houseSubsidyBefore = $("#houseSubsidyBefore").val();//变动前房补
                        var houseSubsidyAfter = $("#houseSubsidyAfter").val();//变动后房补
                        // if(telSubsidyBefore != 0){
                        //     var telSubsidyPercent = (telSubsidyAfter - telSubsidyBefore)/telSubsidyBefore;
                        //     $("#telPercent").val((telSubsidyPercent*100).toFixed(2));
                        // }else{
                        //     $("#telPercent").val(0);
                        // }
                        if(tranSubsidyBefore != 0){
                            var tranSubsidyBefore = (tranSubsidyAfter - tranSubsidyBefore)/tranSubsidyBefore;
                            $("#tranPercent").val((tranSubsidyBefore*100).toFixed(2));
                        }else{
                            $("#tranPercent").val(0);
                        }
                        if(houseSubsidyBefore != 0){
                            var houseSubsidyPercent = (houseSubsidyAfter - houseSubsidyBefore)/houseSubsidyBefore;
                            $("#housePercent").val((houseSubsidyPercent*100).toFixed(2));
                        }else{
                            $("#housePercent").val(0);
                        }
                    }else{
                        // $("#telSubsidyAfter").val(0);//通话补助  modified by tangsq  20171110 去掉通话补助相关代码
                        $("#tranSubsidyAfter").val(0);//交通补助
                        $("#houseSubsidyAfter").val(0);//房补
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            });
        }
    }





    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    };

    $(function(){
        //初始页面
        initPage();
    });
    /**
     * 初始化页面
     */
    function initPage(){
        //获取url参数
        id=$.xljUtils.getUrlParam("id");
        oper=$.xljUtils.getUrlParam("oper");
        //重置表单
        $('#hrWageSubchangeForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("hrWageSubchangeForm").reset();
            $("#hrWageSubchangeForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("hrWageSubchangeForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增补助变动信息");
            $(".xj-form-title").text("新增补助变动信息");
            initData();
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrWageSubchangeForm").attr("data-validate-success", "window.submitAddForm()");
                $("#hrWageSubchangeForm").submit();
            });
            //初始化UUID
            $.ajax({
                type:"GET",
                url:baseUrl+"/sys/uuid/generator/getGuuid"+'?time='+Math.random(),
                dataType:"json",
                success: function(resultValue, textStatus) {
                    uuid = resultValue.result;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
        }else if(oper=="edit"){
            $('title').text("编辑补助变动信息");
            $(".xj-form-title").text("编辑补助变动信息");
            editHrWageSubChange(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                $("#hrWageSubchangeForm").attr("data-validate-success", "window.submitEditForm()");
                $("#hrWageSubchangeForm").submit();
            });
        }
    }

    //todo 初始化页面数据
    function initData(){
        id = $.xljUtils.getUrlParam("id");
        orgId = $.xljUtils.getUrlParam("orgId");//机构ID
        workPlaceRank = $.xljUtils.getUrlParam("workPlaceRank");//工作城市所在级别
        wageAllowanceId = $.xljUtils.getUrlParam("wageAllowanceId");//补助职级
        var flag = orgId == '' || orgId == undefined;
        if(flag){
            $("#wageSubType").val('1085100154');//如果机构Id或者工作城市级别或者补助职级为空，补助类型为“手动输入”
            $("#wageSubType_name").val('手动输入');
            //todo 如果没有维护机构，则只能是手动录入
            $("#cleanWageSubType").hide();
            $("#wageSubTypeOption").hide();
        }else{
            $("#wageSubType").val('1085100155');
            $("#wageSubType_name").val('人员薪资/补助标准');
        }
        $("#changeTime").val(new Date().Format("yyyy-MM-dd"));//变动时间
        $("#effectTime").val(new Date().Format("yyyy-MM-dd"));//生效时间
        initHrWageSubChange(id,flag);
    }

    //todo 初始化补助信息
    function initHrWageSubChange(id,flag){
        $.ajax({
            type: 'post',
            url: serviceUrl+"emp/hrWageSubchange/queryList",
            data:JSON.stringify({'personId':id,'isLasterChange':'1009100036'}),
            dataType:'json',
            contentType:'application/json',
            success: function (data) {
                console.info("补助变动信息");
                console.info(data);
                if(data.result.length > 0){
                    if(flag){//如果缺少查询条件，需要设置为“手动输入”
                        //工作城市所在级别
                        $("#workPlaceRankBefore_name").val($.hrUtils.getHRCodeNameById(data.result[0].workPlaceRankAfter));
                        $("#workPlaceRankBefore").val(data.result[0].workPlaceRankAfter);
                        $("#workPlaceRankAfter").val(data.result[0].workPlaceRankAfter);
                        $("#workPlaceRankAfter_name").val($.hrUtils.getHRCodeNameById(data.result[0].workPlaceRankAfter));
                        //补助职级
                        $("#rankBefore").val(data.result[0].rankAfter);
                        $("#rankBefore_name").val($.hrUtils.getHRCodeNameById(data.result[0].rankAfter));
                        $("#rankAfter").val('其它');
                        $("#rankAfter_name").val('其它');

                        // $("#telSubsidyBefore").val(data.result[0].telSubsidyAfter);//话补
                        // $("#telSubsidyAfter").val("");
                        // $("#telSubsidyAfter").removeAttr("readonly");//移除只读属性
                        // $("#telPercent").val("");

                        $("#tranSubsidyBefore").val(data.result[0].tranSubsidyAfter);//交通补助
                        $("#tranSubsidyAfter").val("");
                        $("#tranSubsidyAfter").removeAttr("readonly");//移除只读属性
                        $("#tranPercent").val("");

                        $("#houseSubsidyBefore").val(data.result[0].houseSubsidyAfter);//房补
                        $("#houseSubsidyAfter").val("");
                        $("#houseSubsidyAfter").removeAttr("readonly");//移除只读属性
                        $("#housePercent").val("");
                    }else{
                        //工作城市所在级别
                        $("#workPlaceRankBefore_name").val($.hrUtils.getHRCodeNameById(data.result[0].workPlaceRankAfter));
                        $("#workPlaceRankBefore").val(data.result[0].workPlaceRankAfter);
                        $("#workPlaceRankAfter").val(data.result[0].workPlaceRankAfter);
                        $("#workPlaceRankAfter_name").val($.hrUtils.getHRCodeNameById(data.result[0].workPlaceRankAfter));
                        //补助职级
                        $("#rankBefore").val(data.result[0].rankAfter);
                        $("#rankBefore_name").val($.hrUtils.getHRCodeNameById(data.result[0].rankAfter));
                        $("#rankAfter").val(data.result[0].rankAfter);
                        $("#rankAfter_name").val($.hrUtils.getHRCodeNameById(data.result[0].rankAfter));

                        // $("#telSubsidyBefore").val(data.result[0].telSubsidyAfter);//话补
                        // $("#telSubsidyAfter").val(data.result[0].telSubsidyAfter);//话补
                        // $("#telPercent").val("0");

                        $("#tranSubsidyBefore").val(data.result[0].tranSubsidyAfter);
                        $("#tranSubsidyAfter").val(data.result[0].tranSubsidyAfter);
                        $("#tranPercent").val("0");

                        $("#houseSubsidyBefore").val(data.result[0].houseSubsidyAfter);
                        $("#houseSubsidyAfter").val(data.result[0].houseSubsidyAfter);
                        $("#housePercent").val("0");
                    }
                }else{
                    //工作城市所在级别
                    $("#workPlaceRankBefore").val('');
                    $("#workPlaceRankBefore_name").val('');
                    $("#workPlaceRankAfter").val('');
                    $("#workPlaceRankAfter_name").val('');
                    //补助职级
                    $("#subsidyRankBefore").val('');
                    $("#subsidyRankBefore_name").val('');
                    $("#subsidyRankAfter").val('');
                    $("#subsidyRankAfter_name").val('');

                    // $("#telSubsidyBefore").val('');//话补
                    // $("#telSubsidyAfter").val('');//话补
                    // $("#telPercent").val('');

                    $("#tranSubsidyBefore").val('');
                    $("#tranSubsidyAfter").val('');
                    $("#tranPercent").val('');

                    $("#houseSubsidyBefore").val('');
                    $("#houseSubsidyAfter").val('');
                    $("#housePercent").val('');
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "加载补助信息失败，请重试！");
            }
        });
    }

    //todo 手动输入计算通讯补助变动幅度
    // window.calTelPercent = function(){
    //     var telSubsidyBefore = $("#telSubsidyBefore").val();//变动前通话补助
    //     var telSubsidyAfter = $("#telSubsidyAfter").val();//变动后通话补助
    //     if(telSubsidyBefore!=''&& telSubsidyAfter!==''){
    //         if($.isNumeric(telSubsidyBefore) && $.isNumeric(telSubsidyAfter)){
    //             if(telSubsidyBefore != 0){
    //                 var telSubsidyPercent = (telSubsidyAfter - telSubsidyBefore)/telSubsidyBefore;
    //                 $("#telPercent").val((telSubsidyPercent*100).toFixed(2));
    //             }else{
    //                 $("#telPercent").val(0);
    //             }
    //         }else{
    //             $("#telPercent").val('');
    //         }
    //     }else{
    //         $("#telPercent").val('');
    //     }
    // };

    //todo 手动输入计算交通补助变动幅度
    window.calTranPercent = function(){
        var tranSubsidyBefore = $("#tranSubsidyBefore").val();//变动前交通补助
        var tranSubsidyAfter = $("#tranSubsidyAfter").val();//变动后交通补助
        if(tranSubsidyBefore!='' && tranSubsidyAfter!=''){
            if($.isNumeric(tranSubsidyBefore) && $.isNumeric(tranSubsidyAfter)){
                if(tranSubsidyBefore != 0){
                    var tranSubsidyBefore = (tranSubsidyAfter - tranSubsidyBefore)/tranSubsidyBefore;
                    $("#tranPercent").val((tranSubsidyBefore*100).toFixed(2));
                }else{
                    $("#tranPercent").val(0);
                }
            }else{
                $("#tranPercent").val('');
            }
        }else{
            $("#tranPercent").val('');
        }
    };

    //todo 手动输入计算住房补贴变动幅度
    window.calHousePercent = function(){
        var houseSubsidyBefore = $("#houseSubsidyBefore").val();//变动前房补
        var houseSubsidyAfter = $("#houseSubsidyAfter").val();//变动后房补
        if(houseSubsidyBefore!=''&& houseSubsidyAfter!=''){
            if($.isNumeric(houseSubsidyBefore) && $.isNumeric(houseSubsidyAfter)){
                if(houseSubsidyBefore != 0){
                    var houseSubsidyPercent = (houseSubsidyAfter - houseSubsidyBefore)/houseSubsidyBefore;
                    $("#housePercent").val((houseSubsidyPercent*100).toFixed(2));
                }else{
                    $("#housePercent").val(0);
                }
            }else{
                $("#housePercent").val('');//清空
            }
        }else{
            $("#housePercent").val('');//清空
        }
    };

    /**
     * 表单--保存提交
     */
     window.submitAddForm = function(){
        var formElements = $("#hrWageSubchangeForm").serializeArray();
        var hrWageSubchangeDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name") || formElements[i].name == 'wageSubType'){
                continue;
            }
            if(formElements[i].name== 'effectTime'|| formElements[i].name=='changeTime'){
                if(formElements[i].value != ''){
                    hrWageSubchangeDto[formElements[i].name]=formElements[i].value+' '+new Date().Format("hh:mm:ss");
                }
                continue;
            }
            hrWageSubchangeDto[formElements[i].name]=formElements[i].value;
        }
        hrWageSubchangeDto.delflag=false;//有效标志位
        hrWageSubchangeDto.personId=id;//关联人员Id
        hrWageSubchangeDto.id=uuid;//主键
        hrWageSubchangeDto.isLasterChange = '1009100036';
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrWageSubchange/saveWageSub?time=' + Math.random(),
            data: JSON.stringify(hrWageSubchangeDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(xhr.result.id, 'hrWageSubchangeForm');
                        //关闭窗口
                        window.close();
                    } else {
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                                break;
                        }
                    }

                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });

    };
    /**
     * 表单--修改提交
     */
    window.submitEditForm=function(){
        var formElements = $("#hrWageSubchangeForm").serializeArray();
        var hrWageSubchangeDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name") || formElements[i].name == 'wageSubType'){
                continue;
            }
            if(formElements[i].name== 'effectTime'|| formElements[i].name=='changeTime'){
                if(formElements[i].value != ''){
                    hrWageSubchangeDto[formElements[i].name]=formElements[i].value+' '+new Date().Format("hh:mm:ss");
                }
                continue;
            }
            hrWageSubchangeDto[formElements[i].name]=formElements[i].value;
        }
        hrWageSubchangeDto.delflag=false;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrWageSubchange/updateWageSub/'+id,
            data: JSON.stringify(hrWageSubchangeDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(id, 'hrWageSubchangeForm');
                        //关闭窗口
                        window.close();
                    } else {
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                                break;
                        }
                    }

                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    };

    /**
     * 编辑补助变动信息
     * @param
     */
    function editHrWageSubChange(id){
        url = baseUrl+'emp/hrWageSubchange/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        if(xhr.result.rankBefore == '其它'){
                            $("#rankBefore").val("其它");
                            $("#rankBefore_name").val("其它");
                        }else{
                            $("#rankBefore").attr("value",xhr.result.rankBefore);
                            var rankBefore_name = (xhr.result.rankBefore == '' || xhr.result.rankBefore==null)?'':$.hrUtils.getHRCodeNameById(xhr.result.rankBefore);
                            $("#rankBefore_name").val(rankBefore_name);
                        }
                        // $("#telSubsidyBefore").attr("value",xhr.result.telSubsidyBefore);
                        $("#tranSubsidyBefore").attr("value",xhr.result.tranSubsidyBefore);
                        $("#houseSubsidyBefore").attr("value",xhr.result.houseSubsidyBefore);
                        $("#workPlaceRankBefore").val(xhr.result.workPlaceRankBefore);//工作城市所在级别
                        var workPlaceRankBefore_name = (xhr.result.workPlaceRankBefore == '' || xhr.result.workPlaceRankBefore==null)?'':$.hrUtils.getHRCodeNameById(xhr.result.workPlaceRankBefore);
                        $("#workPlaceRankBefore_name").val(workPlaceRankBefore_name);
                        if(xhr.result.rankAfter == '其它'){
                            $("#rankAfter").val("其它");
                            $("#rankAfter_name").val("其它");
                            $("#wageSubType").val("1085100154");
                            $("#wageSubType_name").val("手动输入");
                        }else{
                            $("#rankAfter").attr("value",xhr.result.rankAfter);
                            var rankAfter_name = (xhr.result.rankAfter == '' || xhr.result.rankAfter==null)?'':$.hrUtils.getHRCodeNameById(xhr.result.rankAfter);
                            $("#rankAfter_name").val(rankAfter_name);
                            $("#wageSubType").val("1085100155");
                            $("#wageSubType_name").val("人员薪资/补助标准");
                        }
                        $("#telSubsidyAfter").attr("value",xhr.result.telSubsidyAfter);
                        $("#tranSubsidyAfter").attr("value",xhr.result.tranSubsidyAfter);
                        $("#houseSubsidyAfter").attr("value",xhr.result.houseSubsidyAfter);
                        $("#workPlaceRankAfter").val(xhr.result.workPlaceRankAfter);//工作城市所在级别
                        var workPlaceRankAfter_name = (xhr.result.workPlaceRankAfter == '' || xhr.result.workPlaceRankAfter==null)?'':$.hrUtils.getHRCodeNameById(xhr.result.workPlaceRankAfter);
                        $("#workPlaceRankAfter_name").val(workPlaceRankAfter_name);
                        var effectTime = changeTimeStyle(xhr.result.effectTime).Format("yyyy-MM-dd");
                        $("#effectTime").val(effectTime);
                        $("#isLasterChange").attr("value",xhr.result.isLasterChange);
                        $("#telPercent").attr("value",xhr.result.telPercent);
                        $("#tranPercent").attr("value",xhr.result.tranPercent);
                        $("#housePercent").attr("value",xhr.result.housePercent);
                        $("#cause").attr("value",xhr.result.cause);
                        $("#type").attr("value",xhr.result.type);
                        var type_name = (xhr.result.type == '' || xhr.result.type==null)?'':$.hrUtils.getHRCodeNameById(xhr.result.type);
                        $("#type_name").val(type_name);
                        $("#remark").attr("value",xhr.result.remark);
                        var changeTime = changeTimeStyle(xhr.result.changeTime).Format("yyyy-MM-dd");
                        $("#changeTime").val(changeTime);
                    }else{
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red",xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue",xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red",xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red","服务异常,请联系管理员！");
                                break;
                        }
                    }

                }else{
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }

        });
    }

    /**
     * 格式化时间
     */
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    //针对IE进行时间转换
    function changeTimeStyle(bTime){
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1]+'/'+timeDate[2]+'/'+timeDate[0];
        var later = new Date(bTime);
        return later;
    }

    //todo 清空信息
    window.emptyInfo=function (id,hiddenId){
        $("#"+id).val("");
        $("#"+hiddenId).val("");
    };

})(jQuery, window, document)
