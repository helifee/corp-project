;(function($, window, document, undefined){
    var oper;//操作类型
    var personUUID;//人员ID主键
    var applicationUUID='';//审批单主键
    var personId;
    var img = $('#preImg');
    var applyId;//审批单ID
    var saveFlag = true;//保存标志默认为true
    var applyFlag = false;//发起审批标志位
    var saveBtnFlag = false;//暂存标志位
    var applyBtnFlag = false;//发起审批标志位
    var createrId='';
    var oldPhoto;//二次入职用于存放人员照片
    var submitFlag = false;//判定表单是否提交,默认为false
    var callBackId;//子页面返回给父页面的ID
    var fromZPFlag;//是否来自招聘标志
    var fromZPId;//人员在招聘模块的简历id

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

    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 70) + "px");
        //右侧table
        $(".con-table .mytable").height((w_h - 100) + "px");
        // $("#calendar").height((w_h)+"px");
    }


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

    //todo 判定是更新还是保存
    function saveOrUpdate(){
        if(saveFlag){
            if(saveBtnFlag){
                $("#applicationForm").attr("data-validate-success", " window.submitAddForm()");//保存
                $("#applicationForm").submit();
            }else{
                applyFlag = false;
                $.xljUtils.tip("blue", "请先暂存，再发起审批！");
            }
        }else{
            var statusValue = $("#statusValue").val();
            if(statusValue == "草稿"){
                $("#applicationForm").attr("data-validate-success", " window.submitEditForm()");//更新
                $("#applicationForm").submit();
            }else{
                $.xljUtils.tip("blue", "非草稿状态审批单不能修改和发起审批！");
            }
        }
    };

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
            async:false,
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

    /**
     * 清空ERP帐号
     */
    window.cleanErpAccount = function(){
      $("#account").val("");
    };

    /**
     * 用户选择回调方法
     */
    window.userCallback = function (data, success) {
        console.log(data);
        //经办人
        var userId = data.id;
        $('#applicant').val(userId);
        getDirectDeptAnaDirectComByUser();

        //业务表保存hr系统人员信息
        var loginName = data.loginName;
        getHRUserInfo(loginName);
    };

    /**
     * 根据平台账户获取人力系统用户信息
     * @param account  平台账户
     */
    function getHRUserInfo(account) {
        $.ajax({
            url: serviceUrl + "emp/empPersonInfo/getHREmpInfoByAccount",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({"account": account}),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    var personId = result.id;
                    $('#applicant').val(personId);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        })

    }

    //上来就执行
    $(function(){
        //初始页面
        initPersonInfo();
        //todo 所属机构联动所属公司
        $("#deptmentId").change(function () {
            changeCompanyByDeptId();
        });

//*********************************来自招聘模块，填充数据：开始*********************************
        if(window.opener != undefined){
            fromZPFlag = window.opener.fromZPFlag;
            fromZPId = window.opener.fromZPId;
            // alert("fromZPFlag==" + fromZPFlag + "   fromZPId==" + fromZPId);
            if (fromZPFlag !== null && fromZPFlag !== undefined && (fromZPFlag === true || fromZPFlag === "true") && fromZPId !== null && fromZPId !== "" && fromZPId !== undefined) {
                getPersonInfoFromZP(fromZPId);
            }
        }
//*********************************来自招聘模块，填充数据：结束*********************************
        //关闭页面
        $("#closeBtn").click(function(){
            if(callBackId != undefined && window.opener.parentReloadById != undefined){
                window.opener.parentReloadById(callBackId);
            }
            window.close();
        });

        //新增工作经历
        $("#addWorkHistoryBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            addWorkHistory();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能新增记录！");
            }
        });
        //新增教育经历
        $("#addEmpEducationBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            addEmpEducation();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能新增记录！");
            }
        });
        //新增家庭信息
        $("#addHomeRelationBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            addHomeRelation();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能新增记录！");
            }
        });
        //新增薪酬变动信息
        $("#addHrWageChangeBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody+"?time=" + Math.random();
                $.ajax({
                    type: 'GET',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            addHrWageChange();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能新增记录！");
            }
        });
        //新增补助变动信息
        $("#addHrWageSubchangeBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll+"?time=" + Math.random(),
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            addHrWageSubchange();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能新增记录！");
            }
        });

        //修改工作经历
        $("#editorWorkHistoryBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            editorWorkHistory();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能修改记录！");
            }
        });
        //修改教育经历
        $("#editEmpEducationBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            editEmpEducation();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能修改记录！");
            }
        });
        //修改家庭信息
        $("#editHomeRelationInfoBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            editHomeRelation();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能修改记录！");
            }
        });
        //修改薪酬信息
        $("#editorHrWageChangeBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            editorHrWageChange();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能修改记录！");
            }
        });
        //修改补助信息
        $("#editorHrWageSubchangeBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            editorHrWageSubchange();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能修改记录！");
            }
        });

        //批量删除工作经历
        $("#deleteWorkHistoryBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            delWorkHistory();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能删除记录！");
            }
        });
        //批量删除教育经历
        $("#delEmpEducationBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            delEmpEducation();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能删除记录！");
            }
        });
        //批量删除家庭信息
        $("#delHomeRelationInfoBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            delHomeRelation();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能删除记录！");
            }
        });
        //批量删除薪酬信息
        $("#delHrWageChangeBtn").click(function(){

            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            delHrWageChange();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能删除记录！");
            }

        });
        //批量删除补助信息
        $("#delHrWageSubchangeBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/"+applicationUUID;
                var uAll = serviceUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if(data.result != null){//不为空说明已经暂存，可以新增
                            delHrWageSubchange();
                        }else{
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能删除记录！");
            }
        });


        //todo 上传图片
        $('#upload-button').click(function(){
            $('#photoPic').trigger('click');
            return false;
        });
        //todo 发起审批
        $("#applyBtn").click(function(){
            //todo 判定是否填写补助信息和薪酬信息
            // var wageNum = $("#hrWageChangeForm").getGridParam("reccount");
            // var wageSubNum = $("#hrWageSubchangeForm").getGridParam("reccount");
            // if(wageNum == 0 || wageSubNum == 0){
            //     $.xljUtils.tip("red", "请先维护薪酬和补助信息！",3000);
            // }else{
                var statusValue = $("#statusValue").val();
                if(statusValue == '草稿'){
                    applyFlag = true;
                    saveOrUpdate();
                }else{
                    $.xljUtils.tip("red", "非草稿状态审批单不能发起审批！");
                }
            //}
        });
        //todo 保存附件
        $("#savefujianBtn").click(function(){
            var result = $('.attachment-container').xljAttachmentSubmit();
            console.info(result);
            $.xljUtils.tip("blue", "附件上传成功！");
        });
        //todo 初始化上传插件
        initUpload();
    });

    function initUpload() {
        $('.attachment-container').xljAttachment({
            appId: "HR",
            businessId: applicationUUID,
            categoryId: ATTACH_TYPE_PERSON,
            mode: "edit",
            singleUpload:false,
            autoSubmit: false,
            fromTempTable: false,
            serverAddr: ATTACH_SERVERADDR
        });
    }

    //todo 审批单状态发生变动后的回调函数
     window.flowCallBack = function() {
        //发起后重新查询一下
        getSysApplyById(applicationUUID);
    };

    //todo 根据审批单查询审批信息
    function getSysApplyById(applyId) {
        var uBody = "/sys/sysApply/get/" + applyId + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var status = data.result.status;
                $("#applicationForm").find("input[name='status']").val(status);
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#applicationForm").find("input[name='statusValue']").val(statusValue);
                if(data.result.approvalDate != '' && data.result.approvalDate != null){
                    $("#applicationForm").find("input[name='approvalDate']").val(statusValue);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "更新审批单状态失败");
            }
        })
    }

    //todo 所属职能回调函数
    window.functionsCallback = function(data){
        $("#functions").val(data.id);
        $("#functionsName").val(data.name);
    };

    //todo 部门回调
    window.deptCallback = function(data){
        $("#deptId_name").val(data.name);
        $("#deptId").val(data.id);
        // $("#orgId").val(data.parentId);
        var parentId = data.parentId;
        if(data.parentId != '' && data.parentId != undefined){
            // $("#orgName").val($.hrUtils.getHRPrefixOrgNameById(parentId));
            $.ajax({
                type:'POST',
                url:serviceUrl+"emp/empPersonInfo/queryOrgInfo",
                dataType:'JSON',
                contentType:'application/json',
                // async:false,//设置为同步
                data:JSON.stringify({"parentId":parentId}),
                success: function(data){
                    $("#orgId").val(data.result.id);
                    $("#orgName").val(data.result.name);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        }
        // if(!$.isEmptyObject(data)){
        //     var orgId = data.prefixId.split("/")[0];
        //     var orgName = data.prefixName.split("/")[0];
        //     $("#orgId").val(orgId);
        //     $("#orgName").val(orgName);
        // }
    };

    /**
     * 岗位回调函数
     */
    window.postCallback = function (data) {
        var deptId=$('#deptId').val();
        if(data.prefixId.indexOf(deptId)>-1){
            $("#postName").val(data.name);
            $("#postId").val(data.id);
        }else{
            var deptIdName=$('#deptId_name').val();
            pop_tip_open("blue",'只能选择'+deptIdName+"下的岗位");
            postCallback();
        }

    }


    window.newFile = function() {
        var windowURL = window.URL || window.webkitURL;
        var loadImg = windowURL.createObjectURL(document.getElementById('photoPic').files[0]);
        document.getElementById('preImg').setAttribute('src',loadImg);
        document.getElementById('preImg').setAttribute('width',142);
        document.getElementById('preImg').setAttribute('hight',180);
    }




    /**
     * 初始化页面
     */
    function initPersonInfo(){
        //获取url参数
        oper =  $.xljUtils.getUrlParam("oper");
        if(oper == "add"){
            $('title').text("员工入职新增");
            $(".xj-form-title").text("员工入职新增");
            //todo 初始化审批单
            initSysApply();
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                var idType = $("#idType_name").val();
                var validateResult = false;
                if(idType=="身份证"){
                    validateResult = checkIdCardNo($("#idCard").val()) ;
                    if(!validateResult){
                        pop_tip_open("blue", "身份证未填写或者格式不正确！");
                    }else{
                        saveBtnFlag = true;
                        saveOrUpdate();
                    }
                }else{
                    saveBtnFlag = true;
                    saveOrUpdate();
                }
            });
        }else if(oper == "edit"){
            $('title').text("员工入职编辑");
            $(".xj-form-title").text("员工入职编辑");
            saveFlag = false;
            //根据id获取页面信息
            applicationUUID = $.xljUtils.getUrlParam("id");//获取审批单ID
            // 根据审批单ID获取页面数据
            getInfoByAppId(applicationUUID);//将异步请求改为同步
            personId = $("#personId").attr("value");//获取人员ID
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                var idType = $("#idType_name").val();
                var validateResult = false;
                if(idType=="身份证"){
                    validateResult = checkIdCardNo($("#idCard").val()) ;
                    if(!validateResult){
                        pop_tip_open("blue", "身份证未填写或者格式不正确！");
                    }else{
                        saveBtnFlag = true;
                        saveOrUpdate();
                    }
                }else{
                    saveBtnFlag = true;
                    saveOrUpdate();
                }
            });
        }

        //身份证件校验
        function checkIdCardNo(idCardNo) {
            //15位和18位身份证号码的基本校验
            var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
            if (!check) return false;
            //判断长度为15位或18位
            if (idCardNo.length == 15) {
                return check15IdCardNo(idCardNo);
            } else if (idCardNo.length == 18) {
                return check18IdCardNo(idCardNo);
            } else {
                return false;
            }
        }

        //校验15位的身份证号码
        function check15IdCardNo(idCardNo) {
            //15位身份证号码的基本校验
            var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
            if (!check) return false;
            //校验地址码
            var addressCode = idCardNo.substring(0, 6);
            check = checkAddressCode(addressCode);
            if (!check) return false;
            var birDayCode = '19' + idCardNo.substring(6, 12);
            //校验日期码
            return checkBirthDayCode(birDayCode);
        }
        //校验18位的身份证号码
        function check18IdCardNo(idCardNo) {
            //18位身份证号码的基本格式校验
            var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
            if (!check) return false;
            //校验地址码
            var addressCode = idCardNo.substring(0, 6);
            check = checkAddressCode(addressCode);
            if (!check) return false;
            //校验日期码
            var birDayCode = idCardNo.substring(6, 14);
            check = checkBirthDayCode(birDayCode);
            if (!check) return false;
            //验证校检码
            return checkParityBit(idCardNo);
        }

        function checkBirthDayCode(birDayCode) {
            var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
            if (!check) return false;
            var yyyy = parseInt(birDayCode.substring(0, 4), 10);
            var mm = parseInt(birDayCode.substring(4, 6), 10);
            var dd = parseInt(birDayCode.substring(6), 10);
            var xdata = new Date(yyyy, mm - 1, dd);
            if (xdata > new Date()) {
                return false;//生日不能大于当前日期
            } else if (( xdata.getFullYear() == yyyy ) && ( xdata.getMonth() == mm - 1 ) && ( xdata.getDate() == dd )) {
                return true;
            } else {
                return false;
            }
        }

        function checkParityBit(idCardNo) {
            var parityBit = idCardNo.charAt(17).toUpperCase();
            if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
                return true;
            } else {
                return false;
            }
        }

        function checkAddressCode(addressCode) {
            var check = /^[1-9]\d{5}$/.test(addressCode);
            if (!check) return false;
            if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
                return true;
            } else {
                return false;
            }
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
                    createrId = data.result.personId;//制单人ID
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

        //加载工作经历列表
        jQuery("#workHistoryList").jqGrid(
            {
                url : baseUrl+'/emp/empWorkHistoryTmp/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','开始时间','结束时间','工作单位','部门','工作岗位','证明人','联系方式'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align : "center"},
                    {name : 'startTime',label : 'startTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align : "center"},
                    {name : 'endTime',label : 'endTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align : "center"},
                    {name : 'org',label : 'org',editable:true,width : 60,sortable:false,align : "center"},
                    {name : 'dept',label : 'dept',editable:true,width : 60,sortable:false,align : "center"},
                    {name : 'post',label : 'post',editable:true,width : 60,sortable:false,align : "center"},
                    {name : 'witness',label : 'witness',editable:true,width : 60,sortable:false,align : "center"},
                    {name : 'witnessPhone',label : 'witnessPhone',editable:true,width : 60,sortable:false,align : "center"}
                ],
                postData:{"applyId":applicationUUID},
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                ondblClickRow:function(rowid){

                },
                onCellSelect: function(){

                },
                onSelectRow: function () {
                    var rowId=$('#workHistoryList').jqGrid("getGridParam","selrow");
                    rowData = $('#workHistoryList').jqGrid('getRowData',rowId);
                },
                rowNum:-1,
                loadError:function(xhr,status,error){
                    //异常处理
                    console.log(xhr.status);
                    if(xhr.status==404){
                        $.xljUtils.tip("red","请求url有误！");
                        return;
                    }
                    if(xhr.status==405){
                        $.xljUtils.tip("red","请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red","网络异常,请联系管理员！");
                },
                loadComplete:function(xhr){
                    console.log(xhr);
                    if(!xhr.success){
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
                                $.xljUtils.tip("red","查询数据失败！");
                                break;
                        }
                    }else{
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                }
            });

        //加载教育经历列表
        jQuery("#eduHistoryForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpEducationTmp/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','入学时间','毕业时间','学校名称','专业','学习形式','学历','学位','是否最高学历','是否最高学位'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true},
                    {name : 'startTime',label : 'startTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align : "center"},
                    {name : 'endTime',label : 'endTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align : "center"},
                    {name : 'schooolName',label : 'schooolName',editable:true,width : 60,sortable:false,align : "center"},
                    {name : 'major',label : 'major',editable:true,width : 60,sortable:false,align : "center"},
                    {name : 'studyType',label : 'studyType',editable:true,width : 60,sortable:false,formatter:$.hrUtils.getHRCodeNameById,align : "center"},
                    {name : 'education',label : 'education',editable:true,width : 60,sortable:false,formatter:$.hrUtils.getHRCodeNameById,align : "center"},
                    {name : 'degree',label : 'degree',editable:true,width : 60,sortable:false,formatter:$.hrUtils.getHRCodeNameById,align : "center"},
                    {name : 'isMaxEducation',label : 'isMaxEducation',editable:true,width : 60,sortable:false,formatter:$.hrUtils.getHRCodeNameById,align : "center"},
                    {name : 'isMaxDegree',label : 'isMaxDegree',editable:true,width : 60,sortable:false,formatter:$.hrUtils.getHRCodeNameById,align : "center"},
                ],
                postData:{"applyId":applicationUUID},
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                ondblClickRow:function(rowid){
//            	window.open(openUrl+"?oper=detail&id="+rowid);
                    //跳转编辑页
                    /* rowData = $('#demoList').jqGrid('getRowData',rowid);
                     window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));*/
                },
                onCellSelect: function(){
                    /*if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                     //重新选择行时清除上一次选中行的样式
                     $('#demoList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                     }*/
                },
                onSelectRow: function () {
                    var rowId=$('#eduHistoryForm').jqGrid("getGridParam","selrow");
                    rowData = $('#eduHistoryForm').jqGrid('getRowData',rowId);
                },
                rowNum:-1,
                loadError:function(xhr,status,error){
                    //异常处理
                    console.log(xhr.status);
                    if(xhr.status==404){
                        $.xljUtils.tip("red","请求url有误！");
                        return;
                    }
                    if(xhr.status==405){
                        $.xljUtils.tip("red","请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red","网络异常,请联系管理员！");


                },
                loadComplete:function(xhr){
                    console.log(xhr);
                    if(!xhr.success){
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
                                $.xljUtils.tip("red","查询数据失败！");
                                break;
                        }
                    }else{
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();

                    }
                }
            });

        //加载家庭信息
        jQuery("#hrEmpFamilyForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpFamilyTmp/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','关系','姓名','出生日期','工作单位','职务'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align : "center"},
                    {name : 'relation',label : 'relation',editable:true,width : 60,sortable:false,align : "center",formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'name',label : 'name',editable:true,width : 60,sortable:false,align : "center"},
                    {name : 'birth',label : 'birth',editable:true,width : 60,sortable:false,align : "center",formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                    {name : 'org',label : 'org',editable:true,width : 60,sortable:false,align : "center"},
                    {name : 'headship',label : 'headship',editable:true,width : 60,sortable:false,align : "center"}
                ],
                postData:{"applyId":applicationUUID},
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                ondblClickRow:function(rowid){
//            	window.open(openUrl+"?oper=detail&id="+rowid);
                    //跳转编辑页
                    /* rowData = $('#demoList').jqGrid('getRowData',rowid);
                     window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));*/
                },
                onCellSelect: function(){
                    /*if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                     //重新选择行时清除上一次选中行的样式
                     $('#demoList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                     }*/
                },
                onSelectRow: function () {
                    var rowId=$('#hrEmpFamilyForm').jqGrid("getGridParam","selrow");
                    rowData = $('#hrEmpFamilyForm').jqGrid('getRowData',rowId);
                },
                rowNum:-1,
                loadError:function(xhr,status,error){
                    //异常处理
                    console.log(xhr.status);
                    if(xhr.status==404){
                        $.xljUtils.tip("red","请求url有误！");
                        return;
                    }
                    if(xhr.status==405){
                        $.xljUtils.tip("red","请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red","网络异常,请联系管理员！");


                },
                loadComplete:function(xhr){
                    console.log(xhr);
                    if(!xhr.success){
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
                                $.xljUtils.tip("red","查询数据失败！");
                                break;
                        }
                    }else{
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                }
            });

        //加载薪酬列表信息
        jQuery("#hrWageChangeForm").jqGrid(
            {
                url : baseUrl+'emp/hrWageChangeTmp/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','标准年薪','薪资等级','原因'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true, align: "center"},
                    {name : 'salBefore',label : 'salBefore',editable:true,width : 60,sortable:false, align: "center"},
                    {name : 'rankBefore',label : 'rankBefore',editable:true,width : 60,sortable:false,formatter:getWageRank, align: "center"},
                    {name : 'cause',label : 'cause',editable:true,width : 60,sortable:false, align: "center"}
                ],
                postData:{"applyId":applicationUUID},
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                ondblClickRow:function(rowid){
//            	window.open(openUrl+"?oper=detail&id="+rowid);
                    //跳转编辑页
                    /* rowData = $('#demoList').jqGrid('getRowData',rowid);
                     window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));*/
                },
                onCellSelect: function(){
                    /*if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                     //重新选择行时清除上一次选中行的样式
                     $('#demoList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                     }*/
                },
                onSelectRow: function () {
                    var rowId=$('#hrEmpFamilyForm').jqGrid("getGridParam","selrow");
                    rowData = $('#hrEmpFamilyForm').jqGrid('getRowData',rowId);
                },
                rowNum:-1,
                loadError:function(xhr,status,error){
                    //异常处理
                    console.log(xhr.status);
                    if(xhr.status==404){
                        $.xljUtils.tip("red","请求url有误！");
                        return;
                    }
                    if(xhr.status==405){
                        $.xljUtils.tip("red","请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red","网络异常,请联系管理员！");


                },
                loadComplete:function(xhr){
                    console.log(xhr);
                    if(!xhr.success){
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
                                $.xljUtils.tip("red","查询数据失败！");
                                break;
                        }
                    }else{
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                }
            });

        //薪资等级格式化
        function getWageRank(param){
            var name = $.hrUtils.getHRCodeNameById(param);
            return name  == ''? '其它' : name;
        }

        // 加载补助变动信息列表
        jQuery("#hrWageSubchangeForm").jqGrid(
            {
                url : baseUrl+'emp/hrWageSubchangeTmp/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','补助等级','通讯补助','交通补助','住房补贴','工作所在城市级别'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true, align: "center"},
                    {name : 'rankBefore',label : 'rankBefore',editable:true,width : 60,sortable:false,formatter:getSubWageRank, align: "center"},
                    {name : 'telSubsidyBefore',label : 'telSubsidyBefore',editable:true,width : 60,sortable:false, align: "center",hidden:true},
                    {name : 'tranSubsidyBefore',label : 'tranSubsidyBefore',editable:true,width : 60,sortable:false, align: "center"},
                    {name : 'houseSubsidyBefore',label : 'houseSubsidyBefore',editable:true,width : 60,sortable:false, align: "center"},
                    {name : 'workPlaceRankBefore',label : 'workPlaceRankBefore',editable:true,width : 60,sortable:false,formatter:$.hrUtils.getHRCodeNameById, align: "center"}
                ],
                postData:{"applyId":applicationUUID},
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                ondblClickRow:function(rowid){
//            	window.open(openUrl+"?oper=detail&id="+rowid);
                    //跳转编辑页
                    /* rowData = $('#demoList').jqGrid('getRowData',rowid);
                     window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));*/
                },
                onCellSelect: function(){
                    /*if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                     //重新选择行时清除上一次选中行的样式
                     $('#demoList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                     }*/
                },
                onSelectRow: function () {
                    var rowId=$('#hrEmpLeaveInfoForm').jqGrid("getGridParam","selrow");
                    rowData = $('#hrEmpLeaveInfoForm').jqGrid('getRowData',rowId);
                },
                rowNum:-1,
                loadError:function(xhr,status,error){
                    //异常处理
                    console.log(xhr.status);
                    if(xhr.status==404){
                        $.xljUtils.tip("red","请求url有误！");
                        return;
                    }
                    if(xhr.status==405){
                        $.xljUtils.tip("red","请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red","网络异常,请联系管理员！");


                },
                loadComplete:function(xhr){
                    console.log(xhr);
                    if(!xhr.success){
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
                                $.xljUtils.tip("red","查询数据失败！");
                                break;
                        }
                    }else{
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                }
            });
    }

    //薪资等级格式化
    function getSubWageRank(param){
        var name = $.hrUtils.getHRCodeNameById(param);
        return name  == ''? '其它' : name;
    }

    /**
     * 根据审批单编号获取数据
     */
    function getInfoByAppId(appId){
        $.ajax({
            type:"GET",
            url:baseUrl+"sys/sysApply/get/"+appId,
            dataType:"json",
            async: false,
            success: function(data, textStatus) {
                $("#applyId").val(data.result.id);
                applicationUUID = data.result.id;
                $("#applicationForm").find("input[name='topic']").val(data.result.name);//主题
                //todo  获取单据号
                $("#applicationForm").find("input[name='code']").val(data.result.code);//单据号
                //用户的信息
                //制单人
                $("#applicationForm").find("input[name='creater']").val(data.result.creater);
                $("#applicationForm").find("input[name='createrName']").val(data.result.createrName);
                createrId = data.result.personId;//制单人(Hr)ID
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
        $.ajax({
            type:"POST",
            async: false,
            url:baseUrl+"emp/empPersonInfoTmp/queryList",
            contentType:'application/json',
            data:JSON.stringify({"applyId":appId}),
            dataType:"json",
            success: function(data, textStatus) {
                $("#personId").val(data.result[0].id);
                personUUID = data.result[0].id;//人员ID
                $("#name").val(data.result[0].name);
                $("#sex").val(data.result[0].sex);
                $("#sex_name").val($.hrUtils.getHRCodeNameById(data.result[0].sex));
                var birth = (data.result[0].birth == '' || data.result[0].birth == null)?'':changeTimeStyle(data.result[0].birth).Format("yyyy-MM-dd");
                $("#birth").val(birth);
                if(birth != ''){
                    //todo 年龄赋值
                    var age = new Date().getYear() - new Date(birth).getYear();
                    $("#ageOfEmp").val(age);
                }
                $("#nationality").val(data.result[0].nationality);
                var nationalityName = $.hrUtils.getHRCodeNameById(data.result[0].nationality);
                if(nationalityName != ''){
                    $("#nationality_name").val(nationalityName);
                }
                $("#idType").val(data.result[0].idType);
                var idTypeName = $.hrUtils.getHRCodeNameById(data.result[0].idType);
                if(idTypeName != ''){
                    $("#idType_name").val(idTypeName);
                }
                $("#idCard").val(data.result[0].idCard);
                $("#orgId").val(data.result[0].orgId);
                var orgName = $.hrUtils.getHRPrefixOrgNameById(data.result[0].orgId);
                if(orgName != ''){
                    $("#orgName").val(orgName);
                }
                $("#postId").val(data.result[0].postId);
                $("#postName").val(data.result[0].postName);
                $("#headshipRank").val(data.result[0].headshipRank);
                $("#headshipRank_name").val($.hrUtils.getHRCodeNameById(data.result[0].headshipRank));
                $("#account").val(data.result[0].account);
                $("#maxEducation").val(data.result[0].maxEducation);
                var maxEducationName = $.hrUtils.getHRCodeNameById(data.result[0].maxEducation);
                if(maxEducationName != ''){
                    $("#maxEducation_name").val(maxEducationName);
                }
                $("#maxDegree").val(data.result[0].maxDegree);
                var maxDegreeName = $.hrUtils.getHRCodeNameById(data.result[0].maxDegree);
                if(maxDegreeName != ''){
                    $("#maxDegree_name").val(maxDegreeName);
                }
                $("#partyFigure").val(data.result[0].partyFigure);
                var partyFigureName = $.hrUtils.getHRCodeNameById(data.result[0].partyFigure);
                if(partyFigureName != ''){
                    $("#partyFigure_name").val(partyFigureName);
                }
                $("#folk").val(data.result[0].folk);
                var folkName = $.hrUtils.getHRCodeNameById(data.result[0].folk);
                if(folkName != ''){
                    $("#folk_name").val(folkName);
                }
                if(data.result[0].workTime != '' && data.result[0].workTime != undefined){
                    var workTime = (data.result[0].workTime == null || data.result[0].workTime == '')?'':changeTimeStyle(data.result[0].workTime).Format("yyyy-MM-dd");
                    $("#workTime").val(workTime);
                }
                if(data.result[0].workTime != '' && data.result[0].workTime != undefined){
                    var UToTime = $("#workTime").val();
                    var aDate = UToTime.split("-");
                    var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
                    var myDate = new Date();
                    var dif = myDate.getTime() - NewDate.getTime();
                    myDate.setTime(dif);
                    $("#workAge").val(myDate.getFullYear() - 1970);//计算工龄
                }else{
                    $("#workAge").val(0);//计算工龄
                }
                if(data.result[0].entryTime != null){
                    var entryTime = (data.result[0].entryTime == null || data.result[0].entryTime==null)?'':changeTimeStyle(data.result[0].entryTime).Format("yyyy-MM-dd");
                    $("#entryTime").val(entryTime);
                }
                $("#perviousArea").val(data.result[0].perviousArea);
                $("#residence").val(data.result[0].residence);
                $("#socialPayArea").val(data.result[0].socialPayArea);
                $("#socialPayArea_name").val($.hrUtils.getHRCodeNameById(data.result[0].socialPayArea));
                $("#fundPayArea").val(data.result[0].fundPayArea);
                $("#fundPayArea_name").val($.hrUtils.getHRCodeNameById(data.result[0].fundPayArea));
                $("#workPlaceRank").val(data.result[0].workPlaceRank);
                $("#workPlaceRank_name").val($.hrUtils.getHRCodeNameById(data.result[0].workPlaceRank));
                $("#workPlace").val(data.result[0].workPlace);
                $("#workPlace_name").val($.hrUtils.getHRCodeNameById(data.result[0].workPlace));
                $("#emergency").val(data.result[0].emergency);
                $("#emergencyTel").val(data.result[0].emergencyTel);
                $("#homePlace").val(data.result[0].homePlace);
                $("#email").val(data.result[0].email);
                $("#marry").val(data.result[0].marry);
                $("#marry_name").val($.hrUtils.getHRCodeNameById(data.result[0].marry));
                $("#deptId").val(data.result[0].deptId);
                $("#deptId_name").val($.hrUtils.getHROrgNameById(data.result[0].deptId));
                // $("#postType").val(data.result[0].postType);
                // $("#postType_name").val($.hrUtils.getHRCodeNameById(data.result[0].postType));
                var graduateDate = (data.result[0].graduateDate == null || data.result[0].graduateDate==null)?'':changeTimeStyle(data.result[0].graduateDate).Format("yyyy-MM-dd");
                $("#graduateDate").val(graduateDate);
                $("#bloodType").val(data.result[0].bloodType);
                $("#bloodType_name").val($.hrUtils.getHRCodeNameById(data.result[0].bloodType));
                // $("#outlander").val(data.result[0].outlander);
                // $("#outlander_name").val($.hrUtils.getHRCodeNameById(data.result[0].outlander));
                $("#health").val(data.result[0].health);
                $("#health_name").val($.hrUtils.getHRCodeNameById(data.result[0].health));
                $("#phone").val(data.result[0].phone);
                $("#personType").val(data.result[0].personType);
                $("#personType_name").val($.hrUtils.getHRCodeNameById(data.result[0].personType));
                $("#recruitCannelId").val(data.result[0].recruitCannelId);
                $("#recruitCannelId_name").val($.hrUtils.getHRCodeNameById(data.result[0].recruitCannelId));
                $("#personCode").val(data.result[0].personCode);
                // if(data.result[0].retireDate != null){
                //     var retireDate = (data.result[0].retireDate == '' || data.result[0].retireDate == null)?'':changeTimeStyle(data.result[0].retireDate).Format("yyyy-MM-dd");
                //     $("#retireDate").val(retireDate);//退休时间
                // }
                if(data.result[0].holdHeadshipTime != null){
                    var holdHeadshipTime = (data.result[0].holdHeadshipTime == '' || data.result[0].holdHeadshipTime== null)?'':changeTimeStyle(data.result[0].holdHeadshipTime).Format("yyyy-MM-dd");
                    $("#holdHeadshipTime").val(holdHeadshipTime);
                }
                if(data.result[0].regularTime != null){
                    var regularTime = (data.result[0].regularTime ==''|| data.result[0].regularTime==null)?'':changeTimeStyle(data.result[0].regularTime).Format("yyyy-MM-dd");
                    $("#regularTime").val(regularTime);
                }
                $("#wageId").val(data.result[0].wageId);
                var wageName = getRank(data.result[0].wageId);
                $("#wageId_name").val(wageName);
                $("#wageAllowanceId").val(data.result[0].wageAllowanceId);
                var wageAllowanceName = getRank(data.result[0].wageAllowanceId);
                $("#wageAllowanceId_name").val(wageAllowanceName);
                $("#workPhone").val(data.result[0].workPhone);
                $("#kqType").val(data.result[0].kqType);
                $("#kqType_name").val($.hrUtils.getHRCodeNameById(data.result[0].kqType));
                if(data.result[0].entryOrgTime != null){
                    var entryOrgTime = (data.result[0].entryOrgTime == '' || data.result[0].entryOrgTime == null)?'':changeTimeStyle(data.result[0].entryOrgTime).Format("yyyy-MM-dd");
                    $("#entryOrgTime").val(entryOrgTime);
                }
                $("#remark").val(data.result[0].remark);
                $("#nowPlace").val(data.result[0].nowPlace);//现住址
                if(data.result[0].photo != '' && data.result[0].photo != undefined){
                    $("#preImg").attr("src","data:image/jpeg;base64,"+data.result[0].photo);
                    $("#preImg").attr("height",180);
                    $("#preImg").attr("width",142);
                }else{
                    $("#preImg").attr("src","/hr-app/common/img/defaultPic.png");
                }
                $("#nativePlace").val(data.result[0].nativePlace);//籍贯
                $("#archivePlace").val(data.result[0].archivePlace);//档案所在地
                //todo 新增字段
                $("#siPayArea").val(data.result[0].siPayArea);//公积金缴纳地
                var siPayArea_name = (data.result[0].siPayArea == '' || data.result[0].siPayArea== null)?'':$.hrUtils.getHRCodeNameById(data.result[0].siPayArea);
                $("#siPayArea_name").val(siPayArea_name);

                $("#postLevel").val(data.result[0].postLevel);//岗位层级
                var postLevel_name = (data.result[0].postLevel == '' || data.result[0].postLevel== null)?'':$.hrUtils.getHRCodeNameById(data.result[0].postLevel);
                $("#postLevel_name").val(postLevel_name);

                $("#compileType").val(data.result[0].compileType);//编制属性
                var compileType_name = (data.result[0].compileType == '' || data.result[0].compileType== null)?'':$.hrUtils.getHRCodeNameById(data.result[0].compileType);
                $("#compileType_name").val(compileType_name);
                $("#firstEducation").val(data.result[0].firstEducation);//第一学历
                var firstEducation_name = (data.result[0].firstEducation == '' || data.result[0].firstEducation== null)?'':$.hrUtils.getHRCodeNameById(data.result[0].firstEducation);
                $("#firstEducation_name").val(firstEducation_name);
                $("#firstDegree").val(data.result[0].firstDegree);//第一学位
                var firstDegree_name = (data.result[0].firstDegree == '' || data.result[0].firstDegree== null)?'':$.hrUtils.getHRCodeNameById(data.result[0].firstDegree);
                $("#firstDegree_name").val(firstDegree_name);
                $("#functions").val(data.result[0].functions);
                var functionsName = (data.result[0].functions=="" || data.result[0].functions == undefined)?"":$.hrUtils.getHROrgNameById(data.result[0].functions);
                $("#functionsName").val(functionsName);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });

    }

    function getRank(code){
        if(code == '' || code == undefined){
            return '';
        }else if(code == '其它'){
            return '其它';
        }else{
            return $.hrUtils.getHRCodeNameById(code);
        }
    }

    function randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    /**
     * 保存信息
     */
    window.submitAddForm = function(){
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
        sysApplyDto.personId = createrId;//制单人（Hr）Id
        var applyDate = $("input[name='applyDate']").val();
        if(applyDate != ''){
            sysApplyDto.applyDate = applyDate + " 00:00:00";
        }
        sysApplyDto.type = '1068100133';
        sysApplyDto.status = $("input[name='status']").val();//审批状态
        if($("input[name='approvalDate']").val() != ''){
            sysApplyDto.approvalDate = $("input[name='approvalDate']").val();
        }

        //初始化UUID
        $.ajax({
            type:"GET",
            url:baseUrl+"/sys/uuid/generator/getGuuid"+'?time='+Math.random(),
            dataType:"json",
            async: false,
            success: function(resultValue, textStatus) {
                personUUID = resultValue.result;
                //员工信息
                empPersonInfoTmpDto.id = personUUID;
                empPersonInfoTmpDto.delflag = false;
                empPersonInfoTmpDto.applyId = applicationUUID;//审批单ID
                empPersonInfoTmpDto.name = $("#name").val();//姓名
                empPersonInfoTmpDto.sex = $("#sex").val();//性别
                if($("#birth").val() != ''){
                    empPersonInfoTmpDto.birth = new Date($("#birth").val()).Format("yyyy-MM-dd hh:mm:ss");//出生日期
                }
                empPersonInfoTmpDto.nationality = $("#nationality").val();//国籍
                if($("#nationality").val() == "1066100104"){
                    empPersonInfoTmpDto.outlander = '1009100037';//是否外籍(否)
                }else{
                    empPersonInfoTmpDto.outlander = '1009100036';//是否外籍（是）
                }
                empPersonInfoTmpDto.idType = $("#idType").val();//证件类型
                empPersonInfoTmpDto.idCard = $("#idCard").val();//证件号
                empPersonInfoTmpDto.orgId = $("#orgId").val();//机构ID
                empPersonInfoTmpDto.postId = $("#postId").val();//岗位ID
                empPersonInfoTmpDto.postName = $("#postName").val();//岗位名称
                empPersonInfoTmpDto.headshipRank= $("#headshipRank").val();//职级
                empPersonInfoTmpDto.account = $("#account").val();//帐号
                empPersonInfoTmpDto.maxEducation = $("#maxEducation").val();//最高学历
                empPersonInfoTmpDto.maxDegree = $("#maxDegree").val();//最高学位
                empPersonInfoTmpDto.partyFigure = $("#partyFigure").val();//政治面貌
                empPersonInfoTmpDto.folk = $("#folk").val();//民族
                if($("#workTime").val() !=''){
                    empPersonInfoTmpDto.workTime = new Date($("#workTime").val()).Format("yyyy-MM-dd hh:mm:ss");//参加工作时间
                }
                if($("#entryTime").val() !=''){
                    empPersonInfoTmpDto.entryTime = new Date($("#entryTime").val()).Format("yyyy-MM-dd hh:mm:ss");//进入公司时间
                }
                empPersonInfoTmpDto.perviousArea = $("#perviousArea").val();//入职前所在地
                empPersonInfoTmpDto.residence = $("#residence").val();//户口所在地
                empPersonInfoTmpDto.socialPayArea = $("#socialPayArea").val();//社保缴纳户口类型
                empPersonInfoTmpDto.fundPayArea = $("#fundPayArea").val();//缴纳公积金所在地
                empPersonInfoTmpDto.workPlace = $("#workPlace").val();//工作所在地
                empPersonInfoTmpDto.emergency = $("#emergency").val();//紧急联系人
                empPersonInfoTmpDto.emergencyTel = $("#emergencyTel").val();//紧急联系人电话
                empPersonInfoTmpDto.homePlace = $("#homePlace").val();//家庭住址
                empPersonInfoTmpDto.email = $("#email").val();//邮箱
                empPersonInfoTmpDto.marry = $("#marry").val();//婚姻状况
                //empPersonInfoTmpDto.postType = $("#postType").val();//户口性质
                empPersonInfoTmpDto.personCode = $("#personCode").val();//员工编号
                if($("#graduateDate").val() != ''){
                    empPersonInfoTmpDto.graduateDate = new Date($("#graduateDate").val()).Format("yyyy-MM-dd hh:mm:ss");//毕业时间
                }

                empPersonInfoTmpDto.bloodType = $("#bloodType").val();//血型
                // if($("#retireDate").val() != ""){
                //     empPersonInfoTmpDto.retireDate = new Date($("#retireDate").val()).Format("yyyy-MM-dd hh:mm:ss");//退休时间
                // }
                empPersonInfoTmpDto.remark = $("#remark").val();//备注
                empPersonInfoTmpDto.health = $("#health").val();//健康状况
                empPersonInfoTmpDto.phone = $("#phone").val();//手机号
                empPersonInfoTmpDto.deptId = $("#deptId").val();//所在部门
                if($("#holdHeadshipTime").val() != ''){
                    empPersonInfoTmpDto.holdHeadshipTime = new Date($("#holdHeadshipTime").val()).Format("yyyy-MM-dd hh:mm:ss");//任职时间
                }
                empPersonInfoTmpDto.personType = $("#personType").val();//人员类别
                if($("#entryOrgTime").val() !=''){
                    empPersonInfoTmpDto.entryOrgTime = new Date($("#entryOrgTime").val()).Format("yyyy-MM-dd hh:mm:ss");//进入本公司时间
                }
                empPersonInfoTmpDto.recruitCannelId = $("#recruitCannelId").val();//招聘渠道
                if($("#regularTime").val() != ''){
                    empPersonInfoTmpDto.regularTime = new Date($("#regularTime").val()).Format("yyyy-MM-dd hh:mm:ss");//转正时间
                }
                empPersonInfoTmpDto.wageId = $("#wageId").val();//工资等级
                empPersonInfoTmpDto.wageAllowanceId = $("#wageAllowanceId").val();//补助等级
                empPersonInfoTmpDto.workPhone = $("#workPhone").val();//办公电话
                empPersonInfoTmpDto.kqType = $("#kqType").val();//考勤方式
                empPersonInfoTmpDto.workPlaceRank = $("#workPlaceRank").val();//工作所在城市级别

                empPersonInfoTmpDto.postLevel = $("#postLevel").val();//岗位层级
                empPersonInfoTmpDto.compileType = $("#compileType").val();//编制属性
                empPersonInfoTmpDto.siPayArea = $("#siPayArea").val();//社保缴纳地
                empPersonInfoTmpDto.nativePlace = $("#nativePlace").val();//籍贯
                empPersonInfoTmpDto.archivePlace = $("#archivePlace").val();//档案所在地
                empPersonInfoTmpDto.nowPlace = $("#nowPlace").val();//现住址
                empPersonInfoTmpDto.firstEducation = $("#firstEducation").val();//第一学历
                empPersonInfoTmpDto.firstDegree = $("#firstDegree").val();//第一学位
                empPersonInfoTmpDto.functions = $("#functions").val();//所属职能

                param.empPersonInfoTmpDto = empPersonInfoTmpDto;
                param.sysApplyDto= sysApplyDto;
                var formData = new FormData();
                formData.append("empPersonInfoTmpDto",JSON.stringify(empPersonInfoTmpDto));
                formData.append("sysApplyDto",JSON.stringify(sysApplyDto));
                //todo 员工照片为非必填项
                if($("#photoPic")[0].files[0] != undefined){
                    formData.append("photo",$("#photoPic")[0].files[0]);
                }
                //根据saveBtn标志位判定是否发起审批
                var requestUrl = '';
                //todo 获取审批开关,下面回调里面也需要，所以写在外面
                var applicationFlag = $.hrUtils.getHRSysParamByKey("PER_APP_SETTING");
                if(saveBtnFlag == true){
                    saveBtnFlag = false;
                    requestUrl = baseUrl+'emp/empPersonInfoTmp/saveApply/'+1;
                }else{
                    requestUrl = baseUrl+'emp/empPersonInfoTmp/saveApply/'+applicationFlag;
                }

                $.ajax({
                    type: 'POST',
                    url: requestUrl,
                    data: formData,
                    dataType: "json",
                    async: false,
                    processData:false,
                    contentType:false,
                    success: function (xhr) {
                        console.info(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                saveFlag = false;
                                //todo  将审批单ID传给回调ID
                                callBackId = applicationUUID;
                                if(applyFlag){
                                    applyFlag = false;
                                    if(saveBtnFlag == false){//点击“发起审批”成功
                                        if(applicationFlag == 1){
                                            toApplyByFlCode(FLCODE_RYRZ,applicationUUID);
                                        }else{
                                            //todo 将审批状态更该为“已审批”
                                            $("#status").val("1067100108");
                                            $("#statusValue").val("已审批");
                                            //todo 审批日期更改为当前日期
                                            $("#approvalDate").val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
                                            $.xljUtils.tip("blue", "审批成功");
                                        }
                                    }
                                }else{
                                    $.xljUtils.tip("blue", "保存成功");
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

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
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
        sysApplyDto.personId = createrId;
        if(applyDate != ''){
            sysApplyDto.applyDate = applyDate + " 00:00:00";
        }
        sysApplyDto.type = '1068100133';//机构编制申请
        sysApplyDto.status = $("input[name='status']").val();//审批状态
        if($("input[name='approvalDate']").val() != ''){
            sysApplyDto.approvalDate = $("input[name='approvalDate']").val();
        }

        //员工信息
        empPersonInfoTmpDto.id = personUUID;
        empPersonInfoTmpDto.delflag = false;
        empPersonInfoTmpDto.applyId = applicationUUID;//审批单ID
        empPersonInfoTmpDto.name = $("#name").val();//姓名
        empPersonInfoTmpDto.sex = $("#sex").val();//性别
        if($("#birth").val()!=''){
            empPersonInfoTmpDto.birth = new Date($("#birth").val()).Format("yyyy-MM-dd hh:mm:ss");//出生日期
        }
        empPersonInfoTmpDto.nationality = $("#nationality").val();//国籍
        if($("#nationality").val() == "1066100104"){
            empPersonInfoTmpDto.outlander = '1009100037';//是否外籍(否)
        }else{
            empPersonInfoTmpDto.outlander = '1009100036';//是否外籍（是）
        }
        empPersonInfoTmpDto.idType = $("#idType").val();//证件类型
        empPersonInfoTmpDto.idCard = $("#idCard").val();//证件号
        empPersonInfoTmpDto.orgId = $("#orgId").val();//机构ID
        empPersonInfoTmpDto.postId = $("#postId").val();//岗位ID
        empPersonInfoTmpDto.postName = $("#postName").val();//岗位名称
        empPersonInfoTmpDto.headshipRank= $("#headshipRank").val();//职级
        empPersonInfoTmpDto.account = $("#account").val();//帐号
        empPersonInfoTmpDto.maxEducation = $("#maxEducation").val();//最高学历
        empPersonInfoTmpDto.maxDegree = $("#maxDegree").val();//最高学位
        empPersonInfoTmpDto.partyFigure = $("#partyFigure").val();//政治面貌
        empPersonInfoTmpDto.folk = $("#folk").val();//民族
        if($("#workTime").val() != ''){
            empPersonInfoTmpDto.workTime = new Date($("#workTime").val()).Format("yyyy-MM-dd hh:mm:ss");//参加工作时间
        }
        if($("#entryTime").val() != ''){
            empPersonInfoTmpDto.entryTime = new Date($("#entryTime").val()).Format("yyyy-MM-dd hh:mm:ss");//进入公司时间
        }
        empPersonInfoTmpDto.perviousArea = $("#perviousArea").val();//入职前所在地
        empPersonInfoTmpDto.residence = $("#residence").val();//户口所在地
        empPersonInfoTmpDto.socialPayArea = $("#socialPayArea").val();//社保缴纳户口类型
        empPersonInfoTmpDto.fundPayArea = $("#fundPayArea").val();//缴纳公积金所在地
        empPersonInfoTmpDto.workPlace = $("#workPlace").val();//工作所在地
        empPersonInfoTmpDto.emergency = $("#emergency").val();//紧急联系人
        empPersonInfoTmpDto.emergencyTel = $("#emergencyTel").val();//紧急联系人电话
        empPersonInfoTmpDto.homePlace = $("#homePlace").val();//家庭住址
        empPersonInfoTmpDto.email = $("#email").val();//邮箱
        empPersonInfoTmpDto.marry = $("#marry").val();//婚姻状况
        //新增字段
        //empPersonInfoTmpDto.postType = $("#postType").val();//户口性质
        empPersonInfoTmpDto.personCode = $("#personCode").val();//员工编号
        if($("#graduateDate").val() != ''){
            empPersonInfoTmpDto.graduateDate = new Date($("#graduateDate").val()).Format("yyyy-MM-dd hh:mm:ss");//毕业时间
        }
        empPersonInfoTmpDto.bloodType = $("#bloodType").val();//血型
        // if($("#retireDate").val() != ""){
        //     empPersonInfoTmpDto.retireDate = new Date($("#retireDate").val()).Format("yyyy-MM-dd hh:mm:ss");//退休时间
        // }
        empPersonInfoTmpDto.remark = $("#remark").val();//备注
        empPersonInfoTmpDto.health = $("#health").val();//健康状况
        empPersonInfoTmpDto.phone = $("#phone").val();//手机号
        empPersonInfoTmpDto.deptId = $("#deptId").val();//所在部门
        if($("#holdHeadshipTime").val() != ''){
            empPersonInfoTmpDto.holdHeadshipTime = new Date($("#holdHeadshipTime").val()).Format("yyyy-MM-dd hh:mm:ss");//任职时间
        }
        empPersonInfoTmpDto.personType = $("#personType").val();//人员类别
        if($("#entryOrgTime").val() != ''){
            empPersonInfoTmpDto.entryOrgTime = new Date($("#entryOrgTime").val()).Format("yyyy-MM-dd hh:mm:ss");//进入本公司时间
        }
        empPersonInfoTmpDto.recruitCannelId = $("#recruitCannelId").val();//招聘渠道
        if($("#regularTime").val() != ''){
            empPersonInfoTmpDto.regularTime = new Date($("#regularTime").val()).Format("yyyy-MM-dd hh:mm:ss");//转正时间
        }
        empPersonInfoTmpDto.wageId = $("#wageId").val();//工资等级
        empPersonInfoTmpDto.wageAllowanceId = $("#wageAllowanceId").val();//补助等级
        empPersonInfoTmpDto.workPhone = $("#workPhone").val();//办公电话
        empPersonInfoTmpDto.kqType = $("#kqType").val();//考勤方式
        empPersonInfoTmpDto.workPlaceRank = $("#workPlaceRank").val();//工作所在城市级别

        empPersonInfoTmpDto.postLevel = $("#postLevel").val();//岗位层级
        empPersonInfoTmpDto.compileType = $("#compileType").val();//编制属性
        empPersonInfoTmpDto.siPayArea = $("#siPayArea").val();//社保缴纳地
        empPersonInfoTmpDto.nativePlace = $("#nativePlace").val();//籍贯
        empPersonInfoTmpDto.archivePlace = $("#archivePlace").val();//档案所在地
        empPersonInfoTmpDto.nowPlace = $("#nowPlace").val();//现住址
        empPersonInfoTmpDto.firstEducation = $("#firstEducation").val();//第一学历
        empPersonInfoTmpDto.firstDegree = $("#firstDegree").val();//第一学位
        empPersonInfoTmpDto.functions = $("#functions").val();//所属职能

        var formData = new FormData();
        formData.append("empPersonInfoTmpDto",JSON.stringify(empPersonInfoTmpDto));
        formData.append("sysApplyDto",JSON.stringify(sysApplyDto));
        console.info("图片参数");
        console.info($("#photoPic")[0]);
        console.info($("#photoPic")[0].files[0]);
        if($("#photoPic")[0].files[0] != null && $("#photoPic")[0].files[0]!= undefined){
            formData.append("photo",$("#photoPic")[0].files[0]);
        }
        var updateUrl = '';
        //todo 获取审批开关,下面回调里面也需要，所以写在外面
        var applicationFlag = $.hrUtils.getHRSysParamByKey("PER_APP_SETTING");
        if(saveBtnFlag == true){
            saveBtnFlag = false;
            updateUrl = baseUrl+'emp/empPersonInfoTmp/updateApply/'+sysApplyDto.id+"/"+empPersonInfoTmpDto.id+"/"+1;
        }else{
            updateUrl = baseUrl+'emp/empPersonInfoTmp/updateApply/'+sysApplyDto.id+"/"+empPersonInfoTmpDto.id+"/"+applicationFlag;
        }

        $.ajax({
            type: 'POST',
            url: updateUrl,
            processData:false,
            contentType:false,
            data: formData,
            dataType: "json",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //todo  将审批单ID传给回调ID
                        callBackId = applicationUUID;
                        if(applyFlag){
                            applyFlag = false;
                            //todo 获取审批开关
                            var applicationFlag = $.hrUtils.getHRSysParamByKey("PER_APP_SETTING");
                            if(applicationFlag == 1){
                                toApplyByFlCode(FLCODE_RYRZ,applicationUUID);
                            }else{
                                //todo 将审批状态更该为“已审批”
                                $("#status").val("1067100108");
                                $("#statusValue").val("已审批");
                                //todo 审批日期更改为当前日期
                                $("#approvalDate").val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
                                $.xljUtils.tip("green","审批成功");
                            }
                        }else{
                            $.xljUtils.tip("green","修改成功");
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
     * 新增工作经历
     */
    function addWorkHistory(){
        //todo 将工作经历临时表与申请单ID绑定
        var winObjEI = window.open("emp_workHistoy_tmp.html?oper=add&applyId="+applicationUUID);
        var isClose = 1;
        //关闭open页面时刷新父页面列表
        var loop = setInterval(function () {
            if (winObjEI.closed && isClose == 1) {
                isClose--;
                $("#workHistoryList").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
            }
        }, 1000);
    }

    /**
     * 修改工作信息
     */
    function editorWorkHistory(){
        //todo 修改工作经历是依据中间表的主键 注意与新增情况的不同
        var idsVal = $('#workHistoryList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#workHistoryList').jqGrid("getGridParam", "selrow");
                var rowData = $('#workHistoryList').jqGrid('getRowData', rowId);
                var personId = $("#personId").attr("value");
                var winObjEI = window.open("emp_workHistoy_tmp.html?oper=edit&id="+rowData.id);
                var isClose = 1;
                //关闭open页面时刷新父页面列表
                var loop = setInterval(function () {
                    if (winObjEI.closed && isClose == 1) {
                        isClose--;
                        $('#workHistoryList').jqGrid().trigger("reloadGrid");
                    }
                }, 1000);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }
    /**
     * 批量删除工作经历
     * @param personId
     */
    function delWorkHistory(){
        var idsVal = $('#workHistoryList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/empWorkHistoryTmp/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                $('#workHistoryList').jqGrid().trigger("reloadGrid");
                            } else {
                                if (xhr.code == "50000") {//请求返回的状态码？
                                    $.xljUtils.tip("red", xhr.msg);
                                    return;
                                }
                                $.xljUtils.tip("red", "数据删除失败！");
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
            }, true);
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }

    //重新加载人员信息
    function reloadEmpInfo(){
        $.ajax({
            type:"POST",
            url:baseUrl+"emp/empPersonInfoTmp/queryList",
            contentType:'application/json',
            data:JSON.stringify({"applyId":applicationUUID}),
            dataType:"json",
            success: function(data, textStatus) {
                //最高学历
                $("#maxEducation").val(data.result[0].maxEducation);
                var maxEducationName = (data.result[0].maxEducation==''|| data.result[0].maxEducation == undefined)?'':$.hrUtils.getHRCodeNameById(data.result[0].maxEducation);
                $("#maxEducation_name").val(maxEducationName);
                //最高学位
                $("#maxDegree").val(data.result[0].maxDegree);
                var maxDegreeName = (data.result[0].maxDegree==''|| data.result[0].maxDegree == undefined)?'':$.hrUtils.getHRCodeNameById(data.result[0].maxDegree);
                $("#maxDegree_name").val(maxDegreeName);
                //第一学历
                $("#firstEducation").val(data.result[0].firstEducation);
                var firstEducation_name = (data.result[0].firstEducation==''|| data.result[0].firstEducation == undefined)?'':$.hrUtils.getHRCodeNameById(data.result[0].firstEducation);
                $("#firstEducation_name").val(firstEducation_name);
                //第一学位
                $("#firstDegree").val(data.result[0].firstDegree);
                var firstDegree_name = (data.result[0].firstDegree==''|| data.result[0].firstDegree == undefined)?'':$.hrUtils.getHRCodeNameById(data.result[0].firstDegree);
                $("#firstDegree_name").val(firstDegree_name);
                //薪资等级
                $("#wageId").val(data.result[0].wageId);
                var wageId_name = getRank(data.result[0].wageId);
                $("#wageId_name").val(wageId_name);
                //补助等级
                $("#wageAllowanceId").val(data.result[0].wageAllowanceId);
                var wageAllowanceId_name = getRank(data.result[0].wageAllowanceId);
                $("#wageAllowanceId_name").val(wageAllowanceId_name);
                //工作所在城市级别
                $("#workPlaceRank").val(data.result[0].workPlaceRank);
                var workPlaceRank_name = (data.result[0].workPlaceRank==''|| data.result[0].workPlaceRank == undefined)?'':$.hrUtils.getHRCodeNameById(data.result[0].workPlaceRank);
                $("#workPlaceRank_name").val(workPlaceRank_name);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 添加学习经历
     */
    function addEmpEducation(){
        var winObjEI = window.open("emp_eduHistory_tmp.html?oper=add&applyId="+applicationUUID);
        var isClose = 1;
        //关闭open页面时刷新父页面列表
        var loop = setInterval(function () {
            if (winObjEI.closed && isClose == 1) {
                isClose--;
                //重新加载人员信息
                reloadEmpInfo();
                $("#eduHistoryForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
            }
        }, 1000);
    }

    /**
     * 修改学习经历
     */
    function editEmpEducation(){
        var idsVal = $('#eduHistoryForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#eduHistoryForm').jqGrid("getGridParam", "selrow");
                var rowData = $('#eduHistoryForm').jqGrid('getRowData', rowId);
                var personId = $("#personId").attr("value");
                var winObjEI = window.open("emp_eduHistory_tmp.html?oper=edit&id="+rowData.id);
                var isClose = 1;
                //关闭open页面时刷新父页面列表
                var loop = setInterval(function () {
                    if (winObjEI.closed && isClose == 1) {
                        isClose--;
                        //重新加载人员信息
                        reloadEmpInfo();
                        $('#eduHistoryForm').jqGrid().trigger("reloadGrid");
                    }
                }, 1000);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }

    /**
     * 批量删除学习经历
     */
    function delEmpEducation(){
        var idsVal = $('#eduHistoryForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpEducationTmp/deleteBatchByIds/" + idsVal+"/"+applicationUUID,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                //重新加载人员信息
                                reloadEmpInfo();
                                $('#eduHistoryForm').jqGrid().trigger("reloadGrid");
                            } else {
                                if (xhr.code == "50000") {//请求返回的状态码？
                                    $.xljUtils.tip("red", xhr.msg);
                                    return;
                                }
                                $.xljUtils.tip("red", "数据删除失败！");
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
            }, true);
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }

    /**
     * 添加家庭信息
     */
    function addHomeRelation(){
        var winObjEI = window.open("emp_homeRelation_tmp.html?oper=add&applyId="+applicationUUID);
        var isClose = 1;
        //关闭open页面时刷新父页面列表
        var loop = setInterval(function () {
            if (winObjEI.closed && isClose == 1) {
                isClose--;
                $("#hrEmpFamilyForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
            }
        }, 1000);
    }



    /**
     * 修改家庭信息
     */
    function editHomeRelation(){
        var idsVal = $('#hrEmpFamilyForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#hrEmpFamilyForm').jqGrid("getGridParam", "selrow");
                var rowData = $('#hrEmpFamilyForm').jqGrid('getRowData', rowId);
                var personId = $("#personId").attr("value");
                var winObjEI = window.open("emp_homeRelation_tmp.html?oper=edit&id="+rowData.id);
                var isClose = 1;
                //关闭open页面时刷新父页面列表
                var loop = setInterval(function () {
                    if (winObjEI.closed && isClose == 1) {
                        isClose--;
                        $('#hrEmpFamilyForm').jqGrid().trigger("reloadGrid");
                    }
                }, 1000);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }

    /**
     * 批量删除家庭信息
     */
    function delHomeRelation(){
        var idsVal = $('#hrEmpFamilyForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpFamilyTmp/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                $('#hrEmpFamilyForm').jqGrid().trigger("reloadGrid");
                            } else {
                                if (xhr.code == "50000") {//请求返回的状态码？
                                    $.xljUtils.tip("red", xhr.msg);
                                    return;
                                }
                                $.xljUtils.tip("red", "数据删除失败！");
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
            }, true);
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }


    //todo 根据审批单查询审批单是否已保存
    function checkIsSubmit(){
        $.ajax({
            url: baseUrl+'sys/sysApply/get/'+applicationUUID+"?time=" + Math.random(),
            type: 'GET',
            async:false,//需要改为同步
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        if(xhr.result != null){//审批单未提交
                            submitFlag = true;
                        }
                    } else {
                        if (xhr.code == "50000") {//请求返回的状态码？
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "数据请求失败！");
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

    /**
     * 添加薪酬变动信息
     */
    function addHrWageChange(){
        checkIsSubmit();//检测审批单是否提交
        if(submitFlag == false){
            $.xljUtils.tip("blue", "请先暂存审批单！",3000);
        }else{
            var obj = $("#hrWageChangeForm").jqGrid("getRowData");
            if(obj.length<1){
                //var winObjEI = window.open("emp_hrWageChange_tmp.html?oper=add&applyId="+applicationUUID+"&orgId="+$("#orgId").val());
                var winObjEI = window.open("emp_hrWageChange_tmp.html?oper=add&applyId="+applicationUUID);
                var isClose = 1;
                //关闭open页面时刷新父页面列表
                var loop = setInterval(function () {
                    if (winObjEI.closed && isClose == 1) {
                        isClose--;
                        //重新加载人员信息
                        reloadEmpInfo();
                        $("#hrWageChangeForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
                    }
                }, 1000);
            }else{
                $.xljUtils.tip("blue", "入职时只能添加一条薪资信息！");
            }
        }
    }

    /**
     * 修改薪酬信息
     */
    function editorHrWageChange(){
        var idsVal = $('#hrWageChangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#hrWageChangeForm').jqGrid("getGridParam", "selrow");
                var rowData = $('#hrWageChangeForm').jqGrid('getRowData', rowId);
                var winObjEI = window.open("emp_hrWageChange_tmp.html?oper=edit&id="+rowData.id+"&orgId="+$("#orgId").val());
                var isClose = 1;
                //关闭open页面时刷新父页面列表
                var loop = setInterval(function () {
                    if (winObjEI.closed && isClose == 1) {
                        isClose--;
                        //重新加载人员信息
                        reloadEmpInfo();
                        $('#hrWageChangeForm').jqGrid().trigger("reloadGrid");
                    }
                }, 1000);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }

    /**
     * 批量删除薪酬
     */
    function delHrWageChange(){
        var idsVal = $('#hrWageChangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrWageChangeTmp/deleteBatchByIds/" + idsVal+"/"+applicationUUID,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                //重新加载人员信息
                                reloadEmpInfo();
                                $('#hrWageChangeForm').jqGrid().trigger("reloadGrid");
                            } else {
                                if (xhr.code == "50000") {//请求返回的状态码？
                                    $.xljUtils.tip("red", xhr.msg);
                                    return;
                                }
                                $.xljUtils.tip("red", "数据删除失败！");
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
            }, true);
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }



    /**
     * 添加补助信息
     */
    function addHrWageSubchange(){
        checkIsSubmit();//检测审批单是否提交
        if(submitFlag == false){
            $.xljUtils.tip("blue", "请先暂存审批单！",3000);
        }else{
            var obj = $("#hrWageSubchangeForm").jqGrid("getRowData");
            if(obj.length<1){
                var workPlaceRank =  $("#workPlaceRank").val();
                var wageAllowanceId = $("#wageAllowanceId").val();
                //var winObjEI = window.open("emp_hrWageSubchange_tmp.html?oper=add&applyId="+applicationUUID+"&wageAllowanceId="+wageAllowanceId+"&workPlaceRank="+workPlaceRank);
                var winObjEI = window.open("emp_hrWageSubchange_tmp.html?oper=add&applyId="+applicationUUID);
                var isClose = 1;
                //关闭open页面时刷新父页面列表
                var loop = setInterval(function () {
                    if (winObjEI.closed && isClose == 1) {
                        isClose--;
                        //重新加载人员信息
                        reloadEmpInfo();
                        $("#hrWageSubchangeForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
                    }
                }, 1000);
            }else{
                $.xljUtils.tip("blue", "入职时只能添加一条补助信息！");
            }
        }
    }

    /**
     * 修改补助信息
     */
    function editorHrWageSubchange(){
        var idsVal = $('#hrWageSubchangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#hrWageSubchangeForm').jqGrid("getGridParam", "selrow");
                var rowData = $('#hrWageSubchangeForm').jqGrid('getRowData', rowId);
                var winObjEI = window.open("emp_hrWageSubchange_tmp.html?oper=edit&id="+rowData.id);
                var isClose = 1;
                //关闭open页面时刷新父页面列表
                var loop = setInterval(function () {
                    if (winObjEI.closed && isClose == 1) {
                        isClose--;
                        //重新加载人员信息
                        reloadEmpInfo();
                        $('#hrWageSubchangeForm').jqGrid().trigger("reloadGrid");
                    }
                }, 1000);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }


    /**
     * 批量删除补助信息
     */
    function delHrWageSubchange(){
        var idsVal = $('#hrWageSubchangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrWageSubchangeTmp/deleteBatchByIds/" + idsVal+"/"+applicationUUID,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                //重新加载人员信息
                                reloadEmpInfo();
                                $('#hrWageSubchangeForm').jqGrid().trigger("reloadGrid");
                            } else {
                                if (xhr.code == "50000") {//请求返回的状态码？
                                    $.xljUtils.tip("red", xhr.msg);
                                    return;
                                }
                                $.xljUtils.tip("red", "数据删除失败！");
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
            }, true);
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }

    var flag = true;
    //todo 获取ERP帐号
    $("#getAccountBtn").click(function(){
        var userName = $("#name").val();

        if( userName == '' || userName == null){
            $.xljUtils.tip("green", "请输入人员姓名！");
        }else{
            if(flag){
                //todo 加载数据并打开模态窗口
                jQuery("#personList").jqGrid(
                    {
                        url : baseUrl+'/emp/empPersonInfo/getAccount',//创建完成之后请求数据的url
                        datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                        mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                        ajaxGridOptions: {contentType: 'application/json'},
                        contentType : "application/json",
                        autowidth:true,
                        colModel : [
                            {name : 'id',label : 'id',editable:true,sortable:false,hidden:true},
                            {name : 'realName',label : '用户名',editable:true,sortable:false},
                            {name : 'loginName',label : '账号',editable:true,sortable:false},
                            {name : 'prefixName',label : '所属机构',editable:true,sortable:false},
                            {name : 'isMale',label : '性别',editable:true,sortable:false,formatter:isMaleFmatter},
                            {name : 'type',label : '用户类型',editable:true,sortable:false,formatter:typeFmatter},
                            {name : 'status',label : '状态',editable:true,sortable:false,formatter:statusFmatter},
                            {name : 'mobile',label : '手机号',editable:true,sortable:false},
                            {name : 'sort',label : '排序',editable:true,sortable:false}
                        ],
                        postData:{"userName":userName},
                        multiselect : true,
                        multiboxonly:true,
                        rownumbers:true,
                        jsonReader : {
                            root:"result",
                            repeatitems : false
                        },
                        rowNum:-1,
                        loadError:function(xhr,status,error){
                            //异常处理
                            console.log(xhr.status);
                            if(xhr.status==404){
                                $.xljUtils.tip("red","请求url有误！");
                                return;
                            }
                            if(xhr.status==405){
                                $.xljUtils.tip("red","请求方法有误！");
                                return;
                            }
                            $.xljUtils.tip("red","网络异常,请联系管理员！");
                        },
                        loadComplete:function(xhr){
                            console.log(xhr);
                            if(!xhr.success){
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
                                        $.xljUtils.tip("red","查询数据失败！");
                                        break;
                                }
                            }else{
                                //增加滚动条
                                $.xljUtils.addGridScroll();
                                $.xljUtils.gridResizeFn();
                            }
                        }
                    });
                flag=false;
            }else{
                var postData = $('#personList').jqGrid("getGridParam", "postData");
                $.each(postData, function (k, v) {
                    delete postData[k];
                });
                postData["userName"]=userName;
                $('#personList').setGridParam({"postData":postData}).trigger("reloadGrid");
            }
            $('#getErp').modal('show');
        }
    });
    /**
     * 状态数据格式化
     */
    function statusFmatter (cellvalue, options, rowObject) {
        if(cellvalue == "1"){
            return "启用";
        }else if(cellvalue == "0"){
            return "禁用";
        }else{
            return "";
        }
    }
    function isMaleFmatter (cellvalue, options, rowObject) {
        if(cellvalue == "1"){
            return "男";
        }else if(cellvalue == "0"){
            return "女";
        }else{
            return "";
        }
    }
    function typeFmatter (cellvalue, options, rowObject) {
        if(cellvalue == "0"){
            return "非用户";
        }else if(cellvalue == "1"){
            return "普通用户";
        }else if(cellvalue == "2"){
            return "管理员";
        }else{
            return "";
        }
    }

    //选择人员
    $("#saveCancelBtn").click(function(){
        var idsVal = $('#personList').jqGrid('getGridParam','selarrrow');
        if(idsVal&&idsVal!="") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "请选择指定用户!");
                return;
            }else{
                var rowId = $('#personList').jqGrid("getGridParam", "selrow");
                rowData = $('#personList').jqGrid('getRowData', rowId);
                $.ajax({
                    type:"POST",
                    async: false,
                    url:baseUrl+"emp/empPersonInfo/getHREmpInfoByAccount",
                    contentType:'application/json',
                    data:JSON.stringify({"account":rowData.loginName}),
                    dataType:"json",
                    success: function(data) {
                       var empPersonInfoDto =data.result;
                        //todo 特殊情况，多次入职
                        if(empPersonInfoDto != undefined){
                            //todo 加载人员信息
                            $("#personId").val(empPersonInfoDto.id);
                            //personUUID = data.result[0].id;//人员ID
                            $("#name").val(empPersonInfoDto.name);
                            $("#sex").val(empPersonInfoDto.sex);
                            $("#sex_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.sex));
                            var birth = (empPersonInfoDto.birth == '' || empPersonInfoDto == null)?'':changeTimeStyle(empPersonInfoDto.birth).Format("yyyy-MM-dd");
                            $("#birth").val(birth);
                            $("#nationality").val(empPersonInfoDto.nationality);
                            var nationalityName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.nationality);
                            if(nationalityName != ''){
                                $("#nationality_name").val(nationalityName);
                            }
                            $("#idType").val(empPersonInfoDto.idType);
                            var idTypeName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.idType);
                            if(idTypeName != ''){
                                $("#idType_name").val(idTypeName);
                            }
                            $("#idCard").val(empPersonInfoDto.idCard);
                            $("#orgId").val(empPersonInfoDto.orgId);
                            var orgName = $.hrUtils.getHRPrefixOrgNameById(empPersonInfoDto.orgId);
                            if(orgName != ''){
                                $("#orgName").val(orgName);
                            }
                            $("#postId").val(empPersonInfoDto.postId);
                            $("#postName").val(empPersonInfoDto.postName);
                            $("#headshipRank").val(empPersonInfoDto.headshipRank);
                            $("#headshipRank_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.headshipRank));
                            $("#account").val(empPersonInfoDto.account);
                            $("#maxEducation").val(empPersonInfoDto.maxEducation);
                            var maxEducationName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.maxEducation);
                            if(maxEducationName != ''){
                                $("#maxEducation_name").val(maxEducationName);
                            }
                            $("#maxDegree").val(empPersonInfoDto.maxDegree);
                            var maxDegreeName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.maxDegree);
                            if(maxDegreeName != ''){
                                $("#maxDegree_name").val(maxDegreeName);
                            }
                            $("#partyFigure").val(empPersonInfoDto.partyFigure);
                            var partyFigureName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.partyFigure);
                            if(partyFigureName != ''){
                                $("#partyFigure_name").val(partyFigureName);
                            }
                            $("#folk").val(empPersonInfoDto.folk);
                            var folkName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.folk);
                            if(folkName != ''){
                                $("#folk_name").val(folkName);
                            }
                            if(empPersonInfoDto.workTime != null){
                                var workTime = (empPersonInfoDto.workTime == null || empPersonInfoDto.workTime == '')?'':changeTimeStyle(empPersonInfoDto.workTime).Format("yyyy-MM-dd");
                                $("#workTime").val(workTime);
                            }
                            if(empPersonInfoDto.entryTime != null){
                                var entryTime = (empPersonInfoDto.entryTime == null || empPersonInfoDto.entryTime==null)?'':changeTimeStyle(empPersonInfoDto.entryTime).Format("yyyy-MM-dd");
                                $("#entryTime").val(entryTime);
                            }
                            $("#perviousArea").val(empPersonInfoDto.perviousArea);
                            $("#residence").val(empPersonInfoDto.residence);
                            $("#socialPayArea").val(empPersonInfoDto.socialPayArea);
                            $("#socialPayArea_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.socialPayArea));
                            $("#fundPayArea").val(empPersonInfoDto.fundPayArea);
                            $("#fundPayArea_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.fundPayArea));
                            $("#workPlaceRank").val(empPersonInfoDto.workPlaceRank);
                            $("#workPlaceRank_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.workPlaceRank));
                            $("#workPlace").val(empPersonInfoDto.workPlace);
                            $("#workPlace_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.workPlace));
                            $("#emergency").val(empPersonInfoDto.emergency);
                            $("#emergencyTel").val(empPersonInfoDto.emergencyTel);
                            $("#homePlace").val(empPersonInfoDto.homePlace);
                            $("#email").val(empPersonInfoDto.email);
                            $("#marry").val(empPersonInfoDto.marry);
                            $("#marry_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.marry));
                            $("#deptId").val(empPersonInfoDto.deptId);
                            $("#deptId_name").val($.hrUtils.getHROrgNameById(empPersonInfoDto.deptId));
                            // $("#postType").val(empPersonInfoDto.postType);
                            // $("#postType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.postType));
                            $("#graduateDate").val(empPersonInfoDto.graduateDate);
                            $("#graduateDate_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.graduateDate));
                            $("#bloodType").val(empPersonInfoDto.bloodType);
                            $("#bloodType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.bloodType));
                            // $("#outlander").val(empPersonInfoDto.outlander);
                            // $("#outlander_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.outlander));
                            $("#health").val(empPersonInfoDto.health);
                            $("#health_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.health));
                            $("#phone").val(empPersonInfoDto.phone);
                            $("#personType").val(empPersonInfoDto.personType);
                            $("#personType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.personType));
                            $("#recruitCannelId").val(empPersonInfoDto.recruitCannelId);
                            $("#recruitCannelId_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.recruitCannelId));
                            $("#personCode").val(empPersonInfoDto.personCode);
                            if(empPersonInfoDto.holdHeadshipTime != null){
                                var holdHeadshipTime = (empPersonInfoDto.holdHeadshipTime == '' || empPersonInfoDto.holdHeadshipTime== null)?'':changeTimeStyle(empPersonInfoDto.holdHeadshipTime).Format("yyyy-MM-dd");
                                $("#holdHeadshipTime").val(holdHeadshipTime);
                            }
                            if(empPersonInfoDto.regularTime != null){
                                var regularTime = (empPersonInfoDto.regularTime ==''|| empPersonInfoDto.regularTime==null)?'':changeTimeStyle(empPersonInfoDto.regularTime).Format("yyyy-MM-dd");
                                $("#regularTime").val(regularTime);
                            }
                            $("#wageId").val(empPersonInfoDto.wageId);
                            $("#wageId_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.wageId));
                            $("#wageAllowanceId").val(empPersonInfoDto.wageAllowanceId);
                            $("#wageAllowanceId_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.wageAllowanceId));
                            $("#workPhone").val(empPersonInfoDto.workPhone);
                            $("#kqType").val(empPersonInfoDto.kqType);
                            $("#kqType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.kqType));
                            if(empPersonInfoDto.entryOrgTime != null){
                                var entryOrgTime = (empPersonInfoDto.entryOrgTime == '' || empPersonInfoDto.entryOrgTime == null)?'':changeTimeStyle(empPersonInfoDto.entryOrgTime).Format("yyyy-MM-dd");
                                $("#entryOrgTime").val(entryOrgTime);
                            }
                            $("#remark").val(empPersonInfoDto.remark);
                            $("#nowPlace").val(empPersonInfoDto.nowPlace);//现住址
                            //todo 人员图片暂不处理
                            // if(empPersonInfoDto.photo != '' && empPersonInfoDto.photo != undefined){
                            //     $("#preImg").attr("src","data:image/jpeg;base64,"+empPersonInfoDto.photo);
                            // }
                            $("#nativePlace").val(empPersonInfoDto.nativePlace);//籍贯
                            $("#archivePlace").val(empPersonInfoDto.archivePlace);//档案所在地

                            var personId = empPersonInfoDto.id;
                            //todo 根据人员ID将该人员的正是表信息同步到临时表中
                            $.ajax({
                                type: "POST",
                                async: false,
                                url: serviceUrl + "emp/empPersonInfo/queryDataToTemp",
                                contentType: 'application/json',
                                data: JSON.stringify({"personId":empPersonInfoDto.id,"applyId":applicationUUID}),
                                dataType: "json",
                                success: function (data) {
                                    //todo 重新加载工作经历
                                    var postData = $("#workHistoryList").jqGrid("getGridParam", "postData");
                                    $.each(postData, function (k, v) {
                                        delete postData[k];
                                    });
                                    $("#workHistoryList").jqGrid('setGridParam',{datatype:'json',postData:{"applyId":applicationUUID}}).trigger('reloadGrid');
                                    //todo 重新加载教育经历
                                    var postData = $("#eduHistoryForm").jqGrid("getGridParam", "postData");
                                    $.each(postData, function (k, v) {
                                        delete postData[k];
                                    });
                                    $("#eduHistoryForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
                                    //todo 重新加载家庭信息
                                    var postData = $("#hrEmpFamilyForm").jqGrid("getGridParam", "postData");
                                    $.each(postData, function (k, v) {
                                        delete postData[k];
                                    });
                                    $("#hrEmpFamilyForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
                                    //todo 重新加载薪酬变动子集
                                    // var postData = $("#hrWageChangeForm").jqGrid("getGridParam", "postData");
                                    // $.each(postData, function (k, v) {
                                    //     delete postData[k];
                                    // });
                                    // $("#hrWageChangeForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
                                    //todo 重新加载补助变动信息
                                    // var postData = $("#hrWageSubchangeForm").jqGrid("getGridParam", "postData");
                                    // $.each(postData, function (k, v) {
                                    //     delete postData[k];
                                    // });
                                    // $("#hrWageSubchangeForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
                                }
                            });
                        }else{
                            $("#name").val(rowData.realName);
                            $("#account").val(rowData.loginName);
                            $("#birth").val(rowData.birthday);
                            $("#phone").val(rowData.mobile);
                            $("#entryTime").val(rowData.entryDate);
                            $("#workTime").val(rowData.workTime);
                            $("#email").val(rowData.email);
                            $("#remark").val(rowData.remark);
                            if("男"==rowData.isMale||"1"==rowData.isMale){
                                $("#sex").val("1057100076");
                                $("#sex_name").val("男");
                            }else{
                                $("#sex").val("1057100077");
                                $("#sex_name").val("女");
                            }
                        }
                    },
                    error: function (data) {
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });
                $('#getErp').modal('hide');
            }
        }else{
            $.xljUtils.tip("blue", "请选择指定用户!");
            return;
        }
    });

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
    };

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
        if(id=='deptId'){
            $("#orgId").val("");
            $("#orgName").val("");
        }
    }


    var idCardNoUtil = {
        provinceAndCitys: {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        },

        powers: ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"],

        parityBit: ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"],

        genders: {male: "男", female: "女"},

        checkAddressCode: function (addressCode) {
            var check = /^[1-9]\d{5}$/.test(addressCode);
            if (!check) return false;
            if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
                return true;
            } else {
                return false;
            }
        },

        checkBirthDayCode: function (birDayCode) {
            var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
            if (!check) return false;
            var yyyy = parseInt(birDayCode.substring(0, 4), 10);
            var mm = parseInt(birDayCode.substring(4, 6), 10);
            var dd = parseInt(birDayCode.substring(6), 10);
            var xdata = new Date(yyyy, mm - 1, dd);
            if (xdata > new Date()) {
                return false;//生日不能大于当前日期
            } else if (( xdata.getFullYear() == yyyy ) && ( xdata.getMonth() == mm - 1 ) && ( xdata.getDate() == dd )) {
                return true;
            } else {
                return false;
            }
        },

        getParityBit: function (idCardNo) {
            var id17 = idCardNo.substring(0, 17);
            var power = 0;
            for (var i = 0; i < 17; i++) {
                power += parseInt(id17.charAt(i), 10) * parseInt(idCardNoUtil.powers[i]);
            }
            var mod = power % 11;
            return idCardNoUtil.parityBit[mod];
        },

        checkParityBit: function (idCardNo) {
            var parityBit = idCardNo.charAt(17).toUpperCase();
            if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
                return true;
            } else {
                return false;
            }
        },

        checkIdCardNo: function (idCardNo) {
            //15位和18位身份证号码的基本校验
            var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
            if (!check) return false;
            //判断长度为15位或18位
            if (idCardNo.length == 15) {
                return idCardNoUtil.check15IdCardNo(idCardNo);
            } else if (idCardNo.length == 18) {
                return idCardNoUtil.check18IdCardNo(idCardNo);
            } else {
                return false;
            }
        },
        //校验15位的身份证号码
        check15IdCardNo: function (idCardNo) {
            //15位身份证号码的基本校验
            var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
            if (!check) return false;
            //校验地址码
            var addressCode = idCardNo.substring(0, 6);
            check = idCardNoUtil.checkAddressCode(addressCode);
            if (!check) return false;
            var birDayCode = '19' + idCardNo.substring(6, 12);
            //校验日期码
            return idCardNoUtil.checkBirthDayCode(birDayCode);
        },
        //校验18位的身份证号码
        check18IdCardNo: function (idCardNo) {
            //18位身份证号码的基本格式校验
            var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
            if (!check) return false;
            //校验地址码
            var addressCode = idCardNo.substring(0, 6);
            check = idCardNoUtil.checkAddressCode(addressCode);
            if (!check) return false;
            //校验日期码
            var birDayCode = idCardNo.substring(6, 14);
            check = idCardNoUtil.checkBirthDayCode(birDayCode);
            if (!check) return false;
            //验证校检码
            return idCardNoUtil.checkParityBit(idCardNo);
        },
        formateDateCN: function (day) {
            var yyyy = day.substring(0, 4);
            var mm = day.substring(4, 6);
            var dd = day.substring(6);
            return yyyy + '-' + mm + '-' + dd;
        },
        //获取信息
        getIdCardInfo: function (idCardNo) {
            var idCardInfo = {
                gender: "", //性别
                birthday: "" // 出生日期(yyyy-mm-dd)
            };
            if (idCardNo.length == 15) {
                var aday = '19' + idCardNo.substring(6, 12);
                idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
                if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
                    idCardInfo.gender = idCardNoUtil.genders.female;
                } else {
                    idCardInfo.gender = idCardNoUtil.genders.male;
                }
            } else if (idCardNo.length == 18) {
                var aday = idCardNo.substring(6, 14);
                idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
                if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
                    idCardInfo.gender = idCardNoUtil.genders.female;
                } else {
                    idCardInfo.gender = idCardNoUtil.genders.male;
                }
            }
            return idCardInfo;
        },

        getId15: function (idCardNo) {
            if (idCardNo.length == 15) {
                return idCardNo;
            } else if (idCardNo.length == 18) {
                return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
            } else {
                return null;
            }
        },

        getId18: function (idCardNo) {
            if (idCardNo.length == 15) {
                var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
                var parityBit = idCardNoUtil.getParityBit(id17);
                return id17 + parityBit;
            } else if (idCardNo.length == 18) {
                return idCardNo;
            } else {
                return null;
            }
        }
    };

    //todo 计算员工年龄
    window.calAgeOfEmp = function(){
        var birth = $("#birth").val();
        if(birth != ''){
            var age = new Date().getYear() - new Date(birth).getYear();
            $("#ageOfEmp").val(age);
        }

    };

    //todo 计算工龄
    window.calWorkAge = function(){
        if($("#workTime").val() != ''){
            var UToTime = $("#workTime").val();
            var aDate = UToTime.split("-");
            var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
            var myDate = new Date();
            var dif = myDate.getTime() - NewDate.getTime();
            myDate.setTime(dif);
            $("#workAge").val(myDate.getFullYear() - 1970);//计算工龄
        }
    };


    //通过招聘模块【简历库】添加人员入职，带入人员简历信息
    function getPersonInfoFromZP(id) {
        $.ajax({
            type: "GET",
            url: serviceUrl + "zp/hrZpResume/get/" + id,
            async: false,
            dataType: "JSON",
            success: function (data) {
                console.log();
                if (data.success == true) {
                    var retDt = data.result;
                    if (undefined != retDt) {
                        $("#name").val(retDt.name);//姓名
                        $("#sex").val(retDt.sex);
                        $("#sex_name").val(codeFormatter(retDt.sex));
                        $("#idCard").val(retDt.ic_card_number);//证件号码
                        $("#birth").val(dateFormatter(retDt.birthday));//出生日期
                        calAgeOfEmp();
                        $("#folk").val(retDt.nation);//民族
                        $("#folk_name").val(codeFormatter(retDt.nation));
                        $("#marry").val(retDt.marry);//婚姻状况
                        $("#marry_name").val(codeFormatter(retDt.marry));
                        $("#nativePlace").val(retDt.origin);//籍贯
                        $("#email").val(retDt.email);//邮箱
                        $("#work_time").val(retDt.work_time);
                        $("#remark").val(retDt.remark);//备注
                        $("#firstEducation_name").val(codeFormatter(retDt.education));//第一学历
                        $("#firstEducation").val(retDt.education);
                        $("#phone").val(retDt.phone);//移动电话
                        $("#orgId").val(retDt.org_id);//所属机构
                        $("#orgName").val(orgFormatter(retDt.org_id));
                        $("#postId").val(retDt.apply_post);//岗位
                        $("#postName").val(postFormatter(retDt.apply_post));
                        $("#firstDegree").val(retDt.degree);
                        $("#firstDegree_name").val(codeFormatter(retDt.degree));
                        // $("#education option[value='" + retDt.education + "']").attr("selected", true);
                    }
                } else {
                    pop_tip_open("red", json.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
    }


    function codeFormatter(cellValue) {
        var codeName = $.hrUtils.getHRCodeNameById(cellValue);
        if (codeName !== null) {
            return codeName;
        } else {
            return "";
        }
    }

    function orgFormatter(cellValue) {
        var orgName = "";
        if (cellValue !== undefined && cellValue !== null && cellValue !== "") {
            orgName = $.hrUtils.getHROrgNameById(cellValue);
        }
        if (orgName !== null && orgName !== "") {
            return orgName;
        } else {
            return "";
        }
    }

    function postFormatter(cellValue) {
        var postName = "";
        if (cellValue !== null && cellValue !== undefined && cellValue !== "") {
            postName = $.hrUtils.getHRPostNameById(cellValue);
        }
        if (postName !== null && postName !== "") {
            return postName;
        } else {
            return "";
        }
    }

    //字符串截取：yyyy-MM-dd
    function dateFormatter(cellValue) {
        if (cellValue === null || cellValue === "" || cellValue === undefined) {
            return "";
        } else {
            return cellValue.substring(0, 10);
        }
    }
})(jQuery, window, document);