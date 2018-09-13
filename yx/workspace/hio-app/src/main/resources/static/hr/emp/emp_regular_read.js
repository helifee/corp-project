;(function($, window, document, undefined){
    var oper;//操作类型
    var uuid;//新增主键
    var personId;
    var account;//人员帐号
    var orgId;//机构ID
    var headshipRank;//职级
    var sex;
    var maxEducation;//最高学历
    var maxDegree;//最高学位
    var applicationUUID;//审批单ID
    var saveFlag = true;//保存标志默认为true
    var applyFlag = false;//发起审批标志位
    var appPersonId;//制单人ID
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
        minView:'month',
        weekStart : 1,
        todayBtn : 1,
        autoclose : 1,
        startView : 2,
        forceParse : 0,
        showMeridian : 1
    });
    /**
     * 根据机构改变公司
     */
    function changeCompanyByDeptId() {
        //当前机构的默认值
        var deptId = $("#deptmentId").val();
        // alert("现在的机构ID是======"+deptId);
        $.each(deptComList, function (n, value) {
            //顶级
            // if (value.topDeptId == deptId) {
            //     $('#deptName').val(value.deptName);
            //     $('#companyId').val(value.topCompId);
            //     $('#companyName').val(value.topCompName);
            // }
            //直属
            if (value.directDeptId == deptId) {
                $('#deptName').val(value.directDeptName);
                $('#companyId').val(value.directCompId);
                $('#companyName').val(value.directCompName);
            }
        });
    }

    /**
     * 根据用户获取其所有组织的直属部门和直属公司
     */
    function getDirectDeptAnaDirectComByUser() {
        //经办人
        var applicant = $('#applicant').val();
        var postData = {"userId": applicant};
        $.ajax({
            url: "/hr-app/sys/sysApply/getDirectDeptAnaDirectComByUser",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        var data = xhr.result;
                        console.log(data);
                        //赋值所属机构下拉
                        //部门公司映射
                        deptComList = data;
                        var deptmentId = $("#deptmentId");
                        //先清空
                        deptmentId.empty();

                        //遍历机构信息
                        $.each(data, function (n, value) {
                            deptmentId.append("<option value='" + value.directDeptId + "'>" + value.directDeptAllName + "</option>");
                        });
                        //联动所属公司
                        changeCompanyByDeptId();
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "获取顶级部门和公司失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }


    /**
     * 用户选择回调方法
     */
    window.userCallback = function(data, success) {
        console.log(data);
        //经办人
        var userId = data.id;
        $('#applicant').val(userId);
        //getTopDeptAnaTopComByUser();
        getDirectDeptAnaDirectComByUser();
    };

    //上来就执行
    $(function(){

        //初始页面
        initPersonInfo();

        //todo 所属机构联动所属公司
        $("#deptmentId").change(function () {
            changeCompanyByDeptId();
        });

        //关闭页面
        $("#closeBtn").click(function(){
            window.close();
        });

        //发起审批
        $("#applyBtn").click(function () {
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                applyFlag = true;
                saveOrUpdate();
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能发起审批！");
            }
        });

    });

    /**
     * 初始化页面
     */
    function initPersonInfo() {
        //获取url参数
        oper = $.xljUtils.getUrlParam("oper");
        if (oper == "add") {
            $('title').text("员工转正新增");
            $(".xj-form-title").text("员工转正新增");
            //todo 初始化审批单
            initSysApply();

            //todo  获取单据号
            //getApplyCode("EMPRZSQ");
            //$("#applyDate").val(new Date().Format("yyyy-MM-dd"));//申请日期默认为当天
            //保存窗口
            $("#saveBtn").unbind('click').on('click', function () {
                saveOrUpdate();
            });
        } else if (oper == "edit") {
            $('title').text("员工转正查看");
            $(".xj-form-title").text("员工转正查看");
            saveFlag = false;
            // 根据审批单ID获取页面数据
            getEidtInfo();
            //保存窗口
            $("#saveBtn").unbind('click').on('click', function () {
                saveOrUpdate();
            });
        }
    }

    //todo 判定是更新还是保存
    function saveOrUpdate(){
        if(saveFlag){
            $("#applicationForm").attr("data-validate-success", "window.submitAddForm()");//保存
            $("#applicationForm").submit();
        }else{
            var statusValue = $("#statusValue").val();
            if(statusValue == "草稿"){
                $("#applicationForm").attr("data-validate-success", "window.submitEditForm()");//更新
                $("#applicationForm").submit();
            }else{
                $.xljUtils.tip("blue", "非草稿状态审批单不能修改和发起审批！");
            }
        }
    };


    /**
     *  人员选择回调函数
     */
    window.personCallBack = function(data){
        $("#name").val(data.id);
        $("#nameName").val(data.name);
        if(data.id != ''){
            getEmpInfoSetById(data.id);//选择人员后需要根据人员ID进行查询
        }
    }

    /**
     * 根据用户获取其所有组织的顶级部门和顶级公司
     */
    function getTopDeptAnaTopComByUser() {
        //经办人
        var applicant = $('#applicant').val();
        var postData = {"userId": applicant};
        $.ajax({
            url: "/hr-app/sys/sysApply/getTopDeptAnaTopComByUser",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        var data = xhr.result;
                        console.log(data);
                        //赋值所属机构下拉
                        //部门公司映射
                        deptComList = data;
                        var deptId = $("#deptId");
                        //先清空
                        deptId.empty();

                        //遍历机构信息
                        $.each(data, function (n, value) {
                            deptId.append("<option value='" + value.topDeptId + "'>" + value.topDeptAllName + "</option>");
                        });
                        //联动所属公司
                        changeCompanyByDeptId();
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "获取顶级部门和公司失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    //根据人员ID获取人员信息
    function getEmpInfoSetById(personId){
        //todo  获取人员基本信息
        $.ajax({
            type:"GET",
            url:baseUrl+"emp/empPersonInfo/get/"+personId,//从正式表中查询
            dataType:"json",
            success: function(data, textStatus) {
                $("#personId").val(data.result.id);//人员ID
                $("#personCode").val(data.result.personCode);
                $("#orgName").val($.hrUtils.getHROrgNameById(data.result.orgId));
                $("#postName").val(data.result.postName);
                $("#headshipRank").val($.hrUtils.getHRCodeNameById(data.result.headshipRank));
                $("#sex").val( $.hrUtils.getHRCodeNameById(data.result.sex));
                $("#maxEducation").val($.hrUtils.getHRCodeNameById(data.result.maxEducation));
                $("#maxDegree").val($.hrUtils.getHRCodeNameById(data.result.maxDegree));
                var entryTime = (data.result.entryTime==null || data.result.entryTime=='')?'':changeTimeStyle(data.result.entryTime).Format("yyyy-MM-dd");
                $("#entryTime").val(entryTime);
                var entryOrgTime = (data.result.entryTime==null || data.result.entryTime=='')?'':changeTimeStyle(data.result.entryOrgTime).Format("yyyy-MM-dd");
                $("#entryOrgTime").val(entryOrgTime);
                account = data.result.account;//人员帐号
                orgId = data.result.orgId;//机构ID
                headshipRank = data.result.headshipRank;//职级
                sex = data.result.sex;// 性别
                maxEducation = data.result.maxEducation;//最高学历
                maxDegree = data.result.maxDegree;//最高学位
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
        //todo 获取人员合同信息
        $.ajax({
            type:"POST",
            url:baseUrl+"emp/hrContSign/queryList",//从正式表中查询
            data:JSON.stringify({"personId":personId}),
            dataType:"json",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function(data, textStatus) {
                if(data.result.length>0){
                    $("#periodTerm").val(data.result[0].periodTerm);//试用期
                    var periodEndTime = (data.result[0].periodEndTime == null|| data.result[0].periodEndTime == '')?'':changeTimeStyle(data.result[0].periodEndTime).Format("yyyy-MM-dd");
                    $("#periodEndTime").val(periodEndTime);//转正日期
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });

    }

    /**
     * 初始化申请单信息
     * 默认经办人为当前制单人
     */
    function initSysApply() {
        var uBody = "/sys/sysApply/getSysApply?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            async: false,
            success: function (data) {
                applicationUUID = data.result.id;//审批单主键ID

                $("#applicationForm").find("input[name='topic']").val(data.result.name);//主题
                //todo  获取单据号
                var applyCode = $.hrUtils.getApplyCodeByType('EMPRZSQ');
                $("#applicationForm").find("input[name='code']").val(applyCode);
                //用户的信息
                //制单人
                $("#applicationForm").find("input[name='creater']").val(data.result.creater);
                $("#applicationForm").find("input[name='createrName']").val(data.result.createrName);
                appPersonId = data.result.personId;//制单人ID
                //经办人
                $("#applicationForm").find("input[name='applicant']").val(data.result.applicant);
                $("#applicationForm").find("input[name='applicantName']").val(data.result.applicantName);

                $("#applicationForm").find("input[name='companyId']").val(data.result.companyId);
                $("#applicationForm").find("input[name='companyName']").val(data.result.companyName);

                $("#applicationForm").find("input[name='deptmentId']").val(data.result.deptId);//机构ID
                $("#applicationForm").find("input[name='deptName']").val(data.result.deptName);
                var dept = $("#deptmentId");
                //先清空
                dept.empty();
                //机构信息
                dept.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

                var applyDate = changeTimeStyle(data.result.applyDate).Format("yyyy-MM-dd");
                $("#applicationForm").find("input[name='applyDate']").val(applyDate);//申请日期
                $("#applicationForm").find("input[name='type']").val(APPLY_TYPE_JGBZ);//机构编制申请

                //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
                //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
                var status = data.result.status;
                $("#applicationForm").find("input[name='status']").val(status);
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#applicationForm").find("input[name='statusValue']").val(statusValue);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化指标集请求失败");
            }
        })
    }





    /**
     * 保存信息
     */
    window.submitAddForm = function(){
        var personUUID;//获取人员ID，审批通过后对该ID进行更新操作

        $.ajax({
            type:"GET",
            url:baseUrl+"/sys/uuid/generator/getGuuid"+'?time='+Math.random(),
            dataType:"json",
            async: false,
            success: function(resultValue, textStatus) {
                applicationUUID = resultValue.result;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
        $.ajax({
            type:"GET",
            url:baseUrl+"/sys/uuid/generator/getGuuid"+'?time='+Math.random(),
            dataType:"json",
            async: false,
            success: function(resultValue, textStatus) {
                personUUID = resultValue.result;
                personId = personUUID;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
        var param = {};
        var empPersonInfoTmpDto = {};
        var sysApplyDto = {};
        //申请单信息
        sysApplyDto.id = applicationUUID;
        sysApplyDto.delflag = false;
        sysApplyDto.name= $("input[name='topic']").val();//主题
        sysApplyDto.code = $("input[name='code']").val();//审批编号
        sysApplyDto.creater = $("input[name='creater']").val();//制单人
        sysApplyDto.createrName = $("input[name='createrName']").val();
        sysApplyDto.applicant = $("input[name='applicant']").val();
        sysApplyDto.applicantName = $("input[name='applicantName']").val();
        sysApplyDto.companyId = $("input[name='companyId']").val();
        sysApplyDto.companyName = $("input[name='companyName']").val();
        sysApplyDto.deptId = $("#deptmentId").val();//机构ID
        sysApplyDto.deptName = $("input[name='deptName']").val();
        var applyDate = $("input[name='applyDate']").val();
        if(applyDate != ''){
            sysApplyDto.applyDate = applyDate + " 00:00:00";
        }
        sysApplyDto.status = $("input[name='status']").val();//审批状态
        if($("input[name='approvalDate']").val() != ''){
            sysApplyDto.approvalDate = $("input[name='approvalDate']").val();
        }
        sysApplyDto.type="1068100111";//审批类型  转正
        sysApplyDto.personId = appPersonId;//人员ID

        //员工信息
        empPersonInfoTmpDto.id = personUUID;
        empPersonInfoTmpDto.delflag = false;
        empPersonInfoTmpDto.applyId = applicationUUID;//审批单ID
        empPersonInfoTmpDto.name = $("#nameName").val();//姓名
        empPersonInfoTmpDto.personId = $("#name").val();//人员ID
        empPersonInfoTmpDto.personCode = $("#personCode").val();//人员编号
        empPersonInfoTmpDto.orgId = orgId;//所在机构
        empPersonInfoTmpDto.postName = $("#postName").val();//岗位
        empPersonInfoTmpDto.headshipRank = headshipRank;//职级
        empPersonInfoTmpDto.sex = sex;//性别
        empPersonInfoTmpDto.maxEducation = maxEducation;//最高学历
        empPersonInfoTmpDto.maxDegree = maxDegree;//最高学位
        empPersonInfoTmpDto.entryTime = $("#entryTime").val()+' 00:00:00';//入职时间
        empPersonInfoTmpDto.entryOrgTime = $("#entryOrgTime").val()+' 00:00:00';//加入本公司时间
        empPersonInfoTmpDto.periodTerm = $("#periodTerm").val();//试用期
        empPersonInfoTmpDto.regularTime = $("#periodEndTime").val()+' 00:00:00';//转正日期
        empPersonInfoTmpDto.account = account;//人员帐号 审批通过后根据帐号在正是表中查找人的信息
        empPersonInfoTmpDto.workSummary = $("#workSummary").val();//工作总结

        param.empPersonInfoTmpDto = empPersonInfoTmpDto;
        param.sysApplyDto= sysApplyDto;

        console.info(param);
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/empPersonInfoTmp/saveRegular',
            data: JSON.stringify(param),
            dataType: "json",
            async: false,
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        saveFlag = false;
                        $.xljUtils.tip("blue", "保存成功");
                        if(applyFlag){
                            applyFlag = false;
                            //todo 获取审批开关
                            var applicationFlag = $.hrUtils.getHRSysParamByKey("PER_APP_SETTING");
                            if(applicationFlag == 1){
                                toApplyByFlCode(FLCODE_RYZZ,applicationUUID);
                            }else{
                                //todo 不走审批，直接同步正式表
                                $.ajax({
                                    type: 'POST',
                                    url: baseUrl+'emp/empPersonInfoTmp/applyPass/'+applicationUUID+"/ryzz",
                                    dataType: "json",
                                    contentType: "application/json;charset=utf-8",
                                    success: function (xhr) {
                                        if (xhr) {
                                            if (xhr.success) {
                                                //todo 将审批状态更该为“已审批”
                                                $("#status").val("1067100108");
                                                $("#statusValue").val("已审批");
                                                //todo 审批日期更改为当前日期
                                                $("#approvalDate").val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
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
                        }
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
     * 修改信息
     */
    window.submitEditForm = function(){
        var param = {};
        var empPersonInfoTmpDto = {};
        var sysApplyDto = {};

        var applyId = applicationUUID;
        //申请单信息
        sysApplyDto.id = applyId;
        sysApplyDto.delflag = false;
        sysApplyDto.name= $("input[name='topic']").val();//主题
        sysApplyDto.code = $("input[name='code']").val();//审批编号
        sysApplyDto.creater = $("input[name='creater']").val();//制单人
        sysApplyDto.createrName = $("input[name='createrName']").val();
        sysApplyDto.applicant = $("input[name='applicant']").val();
        sysApplyDto.applicantName = $("input[name='applicantName']").val();
        sysApplyDto.companyId = $("input[name='companyId']").val();
        sysApplyDto.companyName = $("input[name='companyName']").val();
        sysApplyDto.deptId = $("#deptmentId").val();//机构ID
        sysApplyDto.deptName = $("input[name='deptName']").val();
        var applyDate = $("input[name='applyDate']").val();
        if(applyDate != ''){
            sysApplyDto.applyDate = applyDate + " 00:00:00";
        }
        sysApplyDto.status = $("input[name='status']").val();//审批状态
        if($("input[name='approvalDate']").val() != ''){
            sysApplyDto.approvalDate = $("input[name='approvalDate']").val();
        }
        sysApplyDto.type="1068100111";//审批类型
        sysApplyDto.personId = appPersonId;//制单人ID

        //员工信息
        empPersonInfoTmpDto.id = personId;//中间表ID
        empPersonInfoTmpDto.delflag = false;
        empPersonInfoTmpDto.applyId = applyId;//审批单ID
        empPersonInfoTmpDto.name = $("#nameName").val();//姓名
        empPersonInfoTmpDto.personId = $("#name").val();//人员ID
        empPersonInfoTmpDto.personCode = $("#personCode").val();//人员编号
        empPersonInfoTmpDto.orgId = orgId;//所在机构
        empPersonInfoTmpDto.postName = $("#postName").val();//岗位
        empPersonInfoTmpDto.headshipRank = headshipRank;//职级
        empPersonInfoTmpDto.sex = sex;//性别
        empPersonInfoTmpDto.maxEducation = maxEducation;//最高学历
        empPersonInfoTmpDto.maxDegree = maxDegree;//最高学位
        empPersonInfoTmpDto.entryTime = $("#entryTime").val()+' 00:00:00';//入职时间
        empPersonInfoTmpDto.entryOrgTime = $("#entryOrgTime").val()+' 00:00:00';//加入本公司时间
        empPersonInfoTmpDto.periodTerm = $("#periodTerm").val();//试用期
        empPersonInfoTmpDto.regularTime = $("#periodEndTime").val()+' 00:00:00';//转正日期
        empPersonInfoTmpDto.account = account;//人员帐号 审批通过后根据帐号在正是表中查找人的信息
        empPersonInfoTmpDto.workSummary = $("#workSummary").val();//工作总结

        param.empPersonInfoTmpDto = empPersonInfoTmpDto;
        param.sysApplyDto= sysApplyDto;
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/empPersonInfoTmp/updateApp/'+sysApplyDto.id+"/"+empPersonInfoTmpDto.id,
            data: JSON.stringify(param),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("blue", "修改成功");
                        if(applyFlag){
                            applyFlag = false;
                            //todo 获取审批开关
                            var applicationFlag = $.hrUtils.getHRSysParamByKey("PER_APP_SETTING");
                            if(applicationFlag == 1){
                                toApplyByFlCode(FLCODE_RYZZ,applicationUUID);
                            }else{
                                //todo 不走审批，直接同步正式表
                                $.ajax({
                                    type: 'POST',
                                    url: baseUrl+'emp/empPersonInfoTmp/applyPass/'+applicationUUID+"/ryzz",
                                    dataType: "json",
                                    contentType: "application/json;charset=utf-8",
                                    success: function (xhr) {
                                        if (xhr) {
                                            if (xhr.success) {
                                                //todo 将审批状态更该为“已审批”
                                                $("#status").val("1067100108");
                                                $("#statusValue").val("已审批");
                                                //todo 审批日期更改为当前日期
                                                $("#approvalDate").val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
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
                        }
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
     * 获取申请单编号
     * @param numType
     */
    function getApplyCode(numType) {
        var uBody = "/sys/sysSerialNumber/getValueByType/" + numType + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                $("#code").val(data.result);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化指标集请求失败");
            }
        })
    }

    /**
     * 修改功能--加载信息
     */
    function getEidtInfo(){
        var applyId = $.xljUtils.getUrlParam("id");//获取审批单ID
        applicationUUID = applyId;
        //根据审批单Id获取审批单信息
        $.ajax({
            type:"GET",
            url:baseUrl+"sys/sysApply/get/"+applyId,
            dataType:"json",
            async: false,
            success: function(data, textStatus) {
                $("#applyId").val(data.result.id);
                $("#applicationForm").find("input[name='topic']").val(data.result.name);//主题
                //todo  获取单据号
                $("#applicationForm").find("input[name='code']").val(data.result.code);//单据号
                //用户的信息
                //制单人
                $("#applicationForm").find("input[name='creater']").val(data.result.creater);
                $("#applicationForm").find("input[name='createrName']").val(data.result.createrName);
                appPersonId = data.result.personId;//制单人ID
                //经办人
                $("#applicationForm").find("input[name='applicant']").val(data.result.applicant);
                $("#applicationForm").find("input[name='applicantName']").val(data.result.applicantName);

                $("#applicationForm").find("input[name='companyId']").val(data.result.companyId);
                $("#applicationForm").find("input[name='companyName']").val(data.result.companyName);

                $("#applicationForm").find("input[name='deptmentId']").val(data.result.deptId);//机构ID
                $("#applicationForm").find("input[name='deptName']").val(data.result.deptName);
                var dept = $("#deptmentId");
                //先清空
                dept.empty();
                //机构信息
                dept.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");
                var applyDate = changeTimeStyle(data.result.applyDate).Format("yyyy-MM-dd");
                $("#applicationForm").find("input[name='applyDate']").val(applyDate);//申请日期
                $("#applicationForm").find("input[name='type']").val(APPLY_TYPE_JGBZ);//机构编制申请

                //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
                //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
                var status = data.result.status;
                $("#applicationForm").find("input[name='status']").val(status);
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#applicationForm").find("input[name='statusValue']").val(statusValue);
                $("#applicationForm").find("input[name='approvalDate']").val(data.result.approvalDate);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
        //根据审批单ID获取从中间表获取页面信息
        $.ajax({
            url: serviceUrl + "emp/empPersonInfoTmp/queryList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"applyId":applyId}),
            success: function (data, textStatus) {
                if(data.result.length > 0){
                    personId = data.result[0].id;//中间表Id
                    $("#name").val(data.result[0].personId);//人员ID
                    $("#nameName").val(data.result[0].name);//人员名称
                    $("#personCode").val(data.result[0].personCode);//人员编号
                    $("#orgName").val($.hrUtils.getHROrgNameById(data.result[0].orgId));//机构名称
                    orgId = data.result[0].orgId;
                    $("#postName").val(data.result[0].postName); //岗位名称
                    $("#headshipRank").val($.hrUtils.getHRCodeNameById(data.result[0].headshipRank)); //职级
                    headshipRank = data.result[0].headshipRank;
                    $("#sex").val( $.hrUtils.getHRCodeNameById(data.result[0].sex));//性别
                    sex = data.result[0].sex;
                    $("#maxEducation").val($.hrUtils.getHRCodeNameById(data.result[0].maxEducation));//最高学历
                    maxEducation = data.result[0].maxEducation;
                    $("#maxDegree").val($.hrUtils.getHRCodeNameById(data.result[0].maxDegree));//最高学位
                    maxDegree = data.result[0].maxDegree;
                    var entryTime = data.result[0].entryTime == null ?'': changeTimeStyle(data.result[0].entryTime).Format("yyyy-MM-dd");
                    $("#entryTime").val(entryTime);//入职时间
                    var entryOrgTime = data.result[0].entryOrgTime==null?'':changeTimeStyle(data.result[0].entryOrgTime).Format("yyyy-MM-dd");
                    $("#entryOrgTime").val(entryOrgTime);//进入本公司时间
                    $("#periodTerm").val(data.result[0].periodTerm);//试用期
                    var periodEndTime = data.result[0].regularTime == null?'':changeTimeStyle(data.result[0].regularTime).Format("yyyy-MM-dd");
                    $("#periodEndTime").val(periodEndTime);//转正日期【注意对应关系】
                    $("#workSummary").val(data.result[0].workSummary);//工作总结
                    account = data.result[0].acount;//人员帐号

                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
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
        $("#applicationForm")[0].reset();
    }


})(jQuery, window, document)