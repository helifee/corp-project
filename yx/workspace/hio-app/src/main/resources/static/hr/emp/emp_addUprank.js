/**
 * 新增晋升晋级员工审批单js
 */
;
(function ($, window, document, undefined) {

    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    }

    //薪资/补助类型回调函数
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
            //todo 根据选择的薪资/补助类型控制输入项
            if(selectData.name == '手动输入'){
                $(".afterChange").removeAttr("readonly");
                $(".afterChange").val('');//将补助金额和工资重置
                $("#wageRankAfter_name").val("其它");//薪資等級设为“其它”
                $("#wageRankAfter").val("其它");
                $("#subsidyRankAfter").val("其它");//补助职级设置为“其它”
                $("#subsidyRankAfter_name").val("其它");
                //禁选补助职级
                $("[data-targetId='subsidyRankAfter']").hide();
                //禁选薪资等级
                $("[data-targetId='wageRankAfter']").hide();
            }else{
                //禁选补助职级
                $("[data-targetId='subsidyRankAfter']").show();
                //禁选薪资等级
                $("[data-targetId='wageRankAfter']").show();
                $(".afterChange").attr("readonly","readonly");
                fillWage();
                fillSub();
            }
        }
    };
    $('.hr-single-selector-wageSubType'). xljSingleSelector(wageSubTypeOptions);

    //调动后工作所在城市级别回调函数
    var workPlaceRankAfterOptions;
    workPlaceRankAfterOptions = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1022},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            $("#workPlaceRankAfter").val(selectData.id);
            $("#workPlaceRankAfter_name").val(selectData.name);
            //todo 根据工作城市所在级别进行补助信息填充
            fillSub();
        }
    };
    $('.hr-single-selector-workPlaceRankAfter'). xljSingleSelector(workPlaceRankAfterOptions);

    //变动后补助等级回调函数
    var subsidyRankAfterOptions;
    subsidyRankAfterOptions = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1149},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            $("#subsidyRankAfter").val(selectData.id);
            $("#subsidyRankAfter_name").val(selectData.name);
            //todo 填充补助信息
            fillSub();
        }
    };
    $('.hr-single-selector-subsidyRankAfter'). xljSingleSelector(subsidyRankAfterOptions);

    //变动后薪资等级回调函数
    var wageRankAfterOptions;
    wageRankAfterOptions = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1011},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            $("#wageRankAfter").val(selectData.id);
            $("#wageRankAfter_name").val(selectData.name);
            //todo 填充补助信息
            fillWage();
        }
    };
    $('.hr-single-selector-wageRankAfter'). xljSingleSelector(wageRankAfterOptions);

    //填充薪资
    function fillWage(){
        var orgAfter = $("#orgAfter").val();
        var wageRankAfter = $("#wageRankAfter").val();
        if(orgAfter!='' && (wageRankAfter!=''&& wageRankAfter!='其它')){
            //机构ID和薪资等级不为空，对月薪进行赋值操作
            //todo 根据代码项和机构Id获取薪资
            $.ajax({
                url: serviceUrl + "wage/wageStandardSalary/querySalaryStandardDetails/",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({"orgId":orgAfter,"psyGrads":wageRankAfter,'codes':'annual_salary'}),
                success: function (xhr, textStatus) {
                    if(xhr.result.length>0){
                        $("#salAfter").val(xhr.result[0].itemMoney);//获取薪资项对应的薪资
                        var salBefor = $("#salBefore").val();
                        var salAfter = $("#salAfter").val();
                        if(salBefor != 0){
                            var percent = ($("#salAfter").val() - $("#salBefore").val())/$("#salBefore").val();
                            $("#percent").val((percent*100).toFixed(2));
                        }else{
                            $("#percent").val(0);//薪酬变动幅度
                        }
                    }else{
                        $("#salAfter").val(0);//如果查询不到，默认为‘0’
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            });
        }
    }
    //填充补助值
    function fillSub(){
        var orgAfter = $("#orgAfter").val();
        var workPlaceRankAfter = $("#workPlaceRankAfter").val();//调动后工作所在城市级别
        var subsidyRankAfter = $("#subsidyRankAfter").val();//变动补助职级
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
                    'codes':'traffic_allowance,housing_allowance'
                }),
                success: function (xhr, textStatus) {
                    if(xhr.result.length==2){
                        for(var i=0;i<xhr.result.length;i++){
                            // if(xhr.result[i].itemCode=='phone_allowance'){
                            //     $("#telSubsidyAfter").val(xhr.result[i].subsidyMoney);//通话补助
                            // }else
                            if(xhr.result[i].itemCode=='traffic_allowance'){
                                $("#tranSubsidyAfter").val(xhr.result[i].subsidyMoney);//交通补助
                            }else if(xhr.result[i].itemCode=='housing_allowance'){
                                $("#houseSubsidyAfter").val(xhr.result[i].subsidyMoney);//房补
                            }
                        }
                        //var telSubsidyBefore = $("#telSubsidyBefore").val();//变动前通话补助
                        //var telSubsidyAfter = $("#telSubsidyAfter").val();//变动后通话补助
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
                        $("#telSubsidyAfter").val(0);//通话补助
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
    //todo 手动输入计算薪资变动幅度
    window.calPercent = function(){
        var salBefor = $("#salBefore").val();
        var salAfter = $("#salAfter").val();
        if(salBefor != '' && salAfter != ''){
            if($.isNumeric(salBefor) && $.isNumeric(salAfter)){
                if(salBefor != 0){
                    var percent = ($("#salAfter").val() - $("#salBefore").val())/$("#salBefore").val();
                    $("#percent").val((percent*100).toFixed(2));
                }else{
                    $("#percent").val(0);//薪酬变动幅度
                }
            }else{
                $("#percent").val('');//清空薪酬变动幅度
            }
        }else{
            $("#percent").val('');//清空
        }
    };

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
     * 时间控件--中文
     */
    $.fn.datetimepicker.dates['zh'] = {
        days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],
        daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],
        daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],
        months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],
        monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem:    ["上午", "下午"],
        //suffix:      ["st", "nd", "rd", "th"],
        today:       "今天"
    };
    /**
     * 开始时间-结束时间
     */
    $(".form_datetime").datetimepicker({
        language : 'zh',
        format : "yyyy-mm-dd",
        minView:'month',
        weekStart : 1,
        todayBtn : 1,
        autoclose : 1,
        startView : 2,
        forceParse : 0,
        showMeridian : 1
    });

    $(function(){
        //初始页面
        initPage();

        //关闭页面
        $("#cloBtn").click(function(){
            window.close();
        });
    });

    /**
     * 根据id加载员工信息
     */
    function getEmpInfoSetById(personId) {
        //获取人员信息
        $.ajax({
            type: 'get',
            url: serviceUrl+"emp/empPersonInfo/get/" + personId + "?time=" + Math.random(),
            success: function (data) {
                $("#orgBefore").val(data.result.orgId);
                $("#orgBeforeName").val($.hrUtils.getHRPrefixOrgNameById(data.result.orgId));//获取机构名称
                $("#orgAfter").val(data.result.orgId);
                $("#orgAfterName").val($.hrUtils.getHRPrefixOrgNameById(data.result.orgId));//获取机构名称
                $("#headshipRankBefore").val(data.result.headshipRank);
                $("#headshipRankBefore_name").val($.hrUtils.getHRCodeNameById(data.result.headshipRank));
                $("#headshipRankAfter").val(data.result.headshipRank);
                $("#headshipRankAfter_name").val($.hrUtils.getHRCodeNameById(data.result.headshipRank));
                $("#deptBefpre").val(data.result.deptId);
                $("#deptBefpreName").val($.hrUtils.getHROrgNameById(data.result.deptId));//获取部门名称
                $("#deptAfter").val(data.result.deptId);
                $("#deptAfterName").val($.hrUtils.getHROrgNameById(data.result.deptId));//获取部门名称
                $("#postBefore").val(data.result.postId);
                $("#postAfter").val(data.result.postId);
                if(data.result.postId != '' && data.result.postId != undefined){
                    var postName =  $.hrUtils.getHRPostNameById(data.result.postId);
                    $("#postAfterName").val(postName);//获取岗位
                    $("#postBeforeName").val(postName);//获取岗位
                }else{
                    $("#postAfterName").val("");//获取岗位
                    $("#postBeforeName").val("");//获取岗位
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "加载人员信息失败，请重试！");
            }
        });

        //获取薪酬变动信息
        $.ajax({
            type: 'post',
            url: serviceUrl+"emp/hrWageChange/queryList",
            data:JSON.stringify({'personId':personId,'isLastChange':'1009100036'}),
            dataType:'json',
            contentType:'application/json',
            success: function (data) {
                console.info("薪酬变动信息");
                console.info(data);
                if(data.result.length > 0){
                    //薪资等级
                    $("#wageRankBefore").val(data.result[0].rankAfter);
                    if(data.result[0].rankAfter == '其它'){
                        $("#wageRankBefore_name").val('其它');
                    }else{
                        $("#wageRankBefore_name").val($.hrUtils.getHRCodeNameById(data.result[0].rankAfter));
                    }
                    $("#wageRankAfter").val(data.result[0].rankAfter);
                    if(data.result[0].rankAfter == '其它'){
                        $("#wageRankAfter_name").val('其它');
                    }else{
                        $("#wageRankAfter_name").val($.hrUtils.getHRCodeNameById(data.result[0].rankAfter));
                    }
                    //薪资
                    $("#salBefore").val(data.result[0].salAfter);
                    $("#salAfter").val(data.result[0].salAfter);
                    $("#percent").val('0');
                }else{
                    //薪资等级
                    $("#wageRankBefore").val('');
                    $("#wageRankBefore_name").val('');
                    $("#wageRankAfter").val('');
                    $("#wageRankAfter_name").val('');
                    //薪资
                    $("#salBefore").val('');
                    $("#salAfter").val('');
                    $("#percent").val('');
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "加载薪酬信息失败，请重试！");
            }
        });

        //获取补助变动信息
        $.ajax({
            type: 'post',
            url: serviceUrl+"emp/hrWageSubchange/queryList",
            data:JSON.stringify({'personId':personId,'isLasterChange':'1009100036'}),
            dataType:'json',
            contentType:'application/json',
            success: function (data) {
                console.info("补助变动信息");
                console.info(data);
                if(data.result.length > 0){
                    //工作城市所在级别
                    $("#workPlaceRankBefore").val(data.result[0].workPlaceRankAfter);
                    $("#workPlaceRankBefore_name").val($.hrUtils.getHRCodeNameById(data.result[0].workPlaceRankAfter));
                    $("#workPlaceRankAfter").val(data.result[0].workPlaceRankAfter);
                    $("#workPlaceRankAfter_name").val($.hrUtils.getHRCodeNameById(data.result[0].workPlaceRankAfter));
                    //补助职级
                    $("#subsidyRankBefore").val(data.result[0].rankAfter);
                    if(data.result[0].rankAfter == '其它'){
                        $("#subsidyRankBefore_name").val('其它');
                    }else{
                        $("#subsidyRankBefore_name").val($.hrUtils.getHRCodeNameById(data.result[0].rankAfter));
                    }
                    $("#subsidyRankAfter").val(data.result[0].rankAfter);
                    if(data.result[0].rankAfter == '其它'){
                        $("#subsidyRankAfter_name").val('其它');
                    }else{
                        $("#subsidyRankAfter_name").val($.hrUtils.getHRCodeNameById(data.result[0].rankAfter));
                    }

                    //$("#telSubsidyBefore").val(data.result[0].telSubsidyAfter);//话补
                    //$("#telSubsidyAfter").val(data.result[0].telSubsidyAfter);//话补
                    //$("#telPercent").val("0");

                    $("#tranSubsidyBefore").val(data.result[0].tranSubsidyAfter);
                    $("#tranSubsidyAfter").val(data.result[0].tranSubsidyAfter);
                    $("#tranPercent").val("0");

                    $("#houseSubsidyBefore").val(data.result[0].houseSubsidyAfter);
                    $("#houseSubsidyAfter").val(data.result[0].houseSubsidyAfter);
                    $("#housePercent").val("0");
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

    /**
     * 人员姓名回调函数
     */
    window.personCallBack = function(data){
        $("#personId").val(data.id);
        $("#personName").val(data.name);
        if(data.id != ''){
            getEmpInfoSetById(data.id);//选择人员后需要根据人员ID进行查询
        }

    }

    /**
     * 调动前机构回调函数
     */
    window.orgBeforeCallback = function (data) {
        $("#orgBeforeName").val(data.prefixName);
        $("#orgBefore").val(data.id);
    }

    /**
     * 调动后机构回调函数
     */
    window.orgAfterCallback = function (data) {
        $("#orgAfterName").val(data.prefixName);
        $("#orgAfter").val(data.id);
        fillWage();
        fillSub();
    }

    /**
     * 调动前部门回调函数
     */
    window.deptBefpreCallback = function (data) {
        $("#deptBefpreName").val(data.name);
        $("#deptBefpre").val(data.id);
    }

    /**
     * 调动后部门回调函数
     */
    window.deptAfterCallback = function (data) {
        $("#deptAfterName").val(data.name);
        $("#deptAfter").val(data.id);
    }

    /**
     * 调动前岗位回调函数
     */
    window.postBeforeCallback = function (data) {
        $("#postBeforeName").val(data.name);
        $("#postBefore").val(data.id);
    }

    /**
     * 调动后岗位回调函数
     */
    window.postAfterCallback = function (data) {
        $("#postAfterName").val(data.name);
        $("#postAfter").val(data.id);
    }


    /**
     * 初始化页面
     */
    function initPage(){
        //获取url参数
        var oper=$.xljUtils.getUrlParam("oper");//操作类型
        //重置表单
        $('#addUprankForm')[0].reset();
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("addUprankForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增员工晋升晋级");
            $(".xj-form-title").text("新增员工晋升晋级");

            //设置默认选项
            $("#wageSubType").val('1085100155');//薪资/补助类型 默认为“人员薪资/补助标准”
            $("#wageSubType_name").val('人员薪资/补助标准');

            //设置默认变动时间
            $("#changeTime").val(new Date().Format("yyyy-MM-dd"));


            //保存窗口
            $("#saveBtn").unbind('click').on('click', function () {
               $("#addUprankForm").attr("data-validate-success", "window.submitAddForm()");
               $("#addUprankForm").submit();
               $("#addUprankForm").attr("data-validate-success", "");
            });
        }
        // else if(oper=="edit"){//编辑学习经历
        //     $('title').text("员工晋升晋级修改");
        //     $(".xj-form-title").text("员工晋升晋级修改");
        //     editEduHistory(id);
        //     //保存窗口
        //     $("#saveButton").unbind('click').on('click',function () {
        //         //表单提交
        //         $("#addUprankForm").attr("data-validate-success", "window.submitEditForm()");
        //         $("#addUprankForm").submit();
        //     });
        // }
    }
    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var uuid;
        //初始化UUID
        $.ajax({
            type:"GET",
            url:baseUrl+"/sys/uuid/generator/getGuuid"+'?time='+Math.random(),
            dataType:"json",
            async:false,
            success: function(resultValue, textStatus) {
                uuid = resultValue.result;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
        var applyId=$.xljUtils.getUrlParam("applyId");//审批单ID
        var formElements = $("#addUprankForm").serializeArray();
        var hrUpRankInfoTmpDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            if(formElements[i].name == 'changeTime'){
                hrUpRankInfoTmpDto[formElements[i].name]=formElements[i].value+" 00:00:00";
                continue;
            }
            hrUpRankInfoTmpDto[formElements[i].name]=formElements[i].value;
        }
        hrUpRankInfoTmpDto.delflag=false;//有效标志位
        hrUpRankInfoTmpDto.applyId=applyId;//审批单ID
        hrUpRankInfoTmpDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrUpRankInfoTmp/save?time=' + Math.random(),
            data: JSON.stringify(hrUpRankInfoTmpDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
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

    }
    /**
     * 表单--修改提交
     */
    window.submitEditForm = function(){
        var formElements = $("#eduHistoryForm").serializeArray();
        var hrUpRankInfoTmpDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name")){
                continue;
            }
            if(formElements[i].name == 'startTime' || formElements[i].name == 'endTime'){
                hrUpRankInfoTmpDto[formElements[i].name]=formElements[i].value+" 00:00:00";
                continue;
            }
            hrUpRankInfoTmpDto[formElements[i].name]=formElements[i].value;
        }
        hrUpRankInfoTmpDto.delflag=false;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrEmpEducation/update/'+id,
            data: JSON.stringify(hrUpRankInfoTmpDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
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
    }

    /**
     * 编辑工作经历
     * @param
     */
    function editEduHistory(id){
        url = baseUrl+'emp/hrEmpEducation/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            data:JSON.stringify({}),
            dataType:"json",
            contentType: "application/json;charset=utf-8",
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        var startTime = (xhr.result.startTime == '' || xhr.result.startTime==null)?'':changeTimeStyle(xhr.result.startTime).Format("yyyy-MM-dd");
                        $("#startTime").attr("value",startTime);//入学时间
                        var endTime = (xhr.result.endTime == '' || xhr.result.endTime==null)?'':changeTimeStyle(xhr.result.endTime).Format("yyyy-MM-dd");
                        $("#endTime").attr("value",endTime);//毕业时间
                        $("#schooolName").attr("value",xhr.result.schooolName);//学校名称
                        $("#major").attr("value",xhr.result.major);//专业
                        $("#studyType").val(xhr.result.studyType);//学习形式
                        $("#education").val(xhr.result.education);//学历
                        $("#degree").val(xhr.result.degree);//学位
                        $("#isMaxEducation").val(xhr.result.isMaxEducation);//是否最高学历
                        $("#isMaxDegree").val(xhr.result.isMaxDegree);//是否最高学位
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

    //todo 重置表单
    window.resetForm = function(){
        $("#addUprankForm")[0].reset();
    };

})(jQuery, window, document);