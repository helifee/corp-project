;(function($, window, document, undefined){
    var oper;//操作类型
    var applicationUUID;//审批单ID
    var personId;
    var personArr = new Array();//用来动态保存更新人员的ID
    var saveFlag = true;//保存标志默认为true
    var applyFlag = false;//发起审批标志位
    var createrId = '';
    var callBackId;//子页面返回给父页面的ID
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
        //$(".nicescroll-rails").offset();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 99) + "px");
        //右侧table
        $(".mytable").height($(window).height()-400 + "px");
        // $(".gbox_hrEmpSetList").height((w_h - 250) + "px");
        // $("#calendar").height((w_h)+"px");
    }

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

    /**
     * 根据机构改变公司
     */
    function changeCompanyByDeptId() {
        //当前机构的默认值
        var deptId = $("#deptmentId").val();
        // alert("现在的机构ID是======"+deptId);
        $.each(deptComList, function (n, value) {
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
        initInfo();

        //todo 所属机构联动所属公司
        $("#deptmentId").change(function () {
            changeCompanyByDeptId();
        });

        $("#addNewBtn").click(function(){
            var winObjEI = window.open("emp_personChange_edit.html?oper=add&applyId="+applicationUUID);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    $('#empChangeApplyForm').jqGrid().trigger("reloadGrid");
                }
            }, 1000);
        });

        //todo 批量删除晋升晋级人员
        $("#delBtn").click(function(){
            deleteEmpChangeApply();
        });

        //关闭页面
        $("#closeBtn").click(function(){
            if(callBackId != undefined && window.opener.parentReloadById != undefined){
                window.opener.parentReloadById(callBackId);
            }
            window.close();
        });

        //todo 发起审批
        $("#applyBtn").click(function(){
            var statusValue = $("#statusValue").val();
            if(statusValue == '草稿'){
                var empChangeNum = $("#empChangeApplyForm").getGridParam("reccount");
                if(empChangeNum==0){
                    $.xljUtils.tip("red", "无调动人员，不能发起审批！");
                }else{
                    applyFlag = true;
                    saveOrUpdate();
                }
            }else{
                $.xljUtils.tip("red", "非草稿状态审批单不能发起审批！");
            }
        });

    });


    /**
     * 初始化页面
     */
    function initInfo() {
        //获取url参数
        oper = $.xljUtils.getUrlParam("oper");
        if (oper == "add") {
            $('title').text("员工调动新增");
            $(".xj-form-title").text("员工调动新增");

            //todo 初始化审批单
            initSysApply();
            //todo 初始化薪资变动列表
            initChangeList(false);
            //设置默认变动时间
            $("#changeTime").val(new Date().Format("yyyy-MM-dd"));


            //保存窗口
            $("#saveBtn").unbind('click').on('click', function () {
                saveOrUpdate();

            });
        } else if (oper == "edit") {
            $('title').text("员工调动编辑");
            $(".xj-form-title").text("员工调动编辑");
            saveFlag = false;//如果为编辑，则将saveFlag置为false
            //根据id获取页面信息
            var applyId = $.xljUtils.getUrlParam("id");//获取审批单ID
            // 根据审批单ID获取页面数据
            getInfoByAppId(applyId);
            //todo 根据审批单ID加载晋升晋级列表
            initChangeList(true);
            //保存窗口
            $("#saveBtn").unbind('click').on('click', function () {
                saveOrUpdate();
            });
        }
    }

    //todo 判定是更新还是保存
    function saveOrUpdate(){
        if(saveFlag){
            $("#empPersonChangeForm").attr("data-validate-success", " window.submitAddForm()");//保存
            $("#empPersonChangeForm").submit();
            //表单提交
            $("#empPersonChangeForm1").attr("data-validate-success", "window.submitAddForm()");
            $("#empPersonChangeForm1").submit();
        }else{
            var statusValue = $("#statusValue").val();
            if(statusValue == "草稿"){
                $("#empPersonChangeForm").attr("data-validate-success", " window.submitEditForm()");//更新
                $("#empPersonChangeForm").submit();
                $("#empPersonChangeForm1").attr("data-validate-success", "window.submitEditForm()");
                $("#empPersonChangeForm1").submit();
            }else{
                $.xljUtils.tip("blue", "非草稿状态审批单不能修改和发起审批！");
            }
        }
    };

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
                $("#empPersonChangeForm").find("input[name='topic']").val(data.result.name);//主题
                //todo  获取单据号
                var applyCode = $.hrUtils.getApplyCodeByType('EMPDDSQ');
                $("#empPersonChangeForm").find("input[name='code']").val(applyCode);
                //用户的信息
                //制单人
                $("#empPersonChangeForm").find("input[name='creater']").val(data.result.creater);
                $("#empPersonChangeForm").find("input[name='createrName']").val(data.result.createrName);
                //经办人
                $("#empPersonChangeForm").find("input[name='applicant']").val(data.result.applicant);
                $("#empPersonChangeForm").find("input[name='applicantName']").val(data.result.applicantName);
                createrId = data.result.personId;

                $("#empPersonChangeForm").find("input[name='companyId']").val(data.result.companyId);
                $("#empPersonChangeForm").find("input[name='companyName']").val(data.result.companyName);

                $("#empPersonChangeForm").find("input[name='deptmentId']").val(data.result.deptId);//机构ID
                $("#empPersonChangeForm").find("input[name='deptName']").val(data.result.deptName);
                var dept = $("#deptmentId");
                //先清空
                dept.empty();
                //机构信息
                dept.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

                var applyDate = changeTimeStyle(data.result.applyDate).Format("yyyy-MM-dd");
                $("#empPersonChangeForm").find("input[name='applyDate']").val(applyDate);//申请日期
                $("#empPersonChangeForm").find("input[name='type']").val(APPLY_TYPE_JGBZ);//机构编制申请

                var status = data.result.status;
                $("#empPersonChangeForm").find("input[name='status']").val(status);
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#empPersonChangeForm").find("input[name='statusValue']").val(statusValue);
                //$("#empPersonChangeForm").find("input[name='approvalDate']").val("0000-00-00 00:00:00");
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化指标集请求失败");
            }
        })
    }

    /**
     * 根据id获取审批单信息
     */
    function getInfoByAppId(applyId){
        $.ajax({
            type:"GET",
            url:baseUrl+"sys/sysApply/get/"+applyId,
            dataType:"json",
            async: false,
            success: function(data, textStatus) {
                $("#applyId").val(data.result.id);
                $("#empPersonChangeForm").find("input[name='topic']").val(data.result.name);//主题
                //todo  获取单据号
                $("#empPersonChangeForm").find("input[name='code']").val(data.result.code);//单据号
                //用户的信息
                //制单人
                $("#empPersonChangeForm").find("input[name='creater']").val(data.result.creater);
                $("#empPersonChangeForm").find("input[name='createrName']").val(data.result.createrName);
                createrId = data.result.personId;
                //经办人
                $("#empPersonChangeForm").find("input[name='applicant']").val(data.result.applicant);
                $("#empPersonChangeForm").find("input[name='applicantName']").val(data.result.applicantName);

                $("#empPersonChangeForm").find("input[name='companyId']").val(data.result.companyId);
                $("#empPersonChangeForm").find("input[name='companyName']").val(data.result.companyName);

                $("#empPersonChangeForm").find("input[name='deptmentId']").val(data.result.deptId);//机构ID
                $("#empPersonChangeForm").find("input[name='deptName']").val(data.result.deptName);
                var dept = $("#deptmentId");
                //先清空
                dept.empty();
                //机构信息
                dept.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

                var applyDate = changeTimeStyle(data.result.applyDate).Format("yyyy-MM-dd");
                $("#empPersonChangeForm").find("input[name='applyDate']").val(applyDate);//申请日期
                $("#empPersonChangeForm").find("input[name='type']").val(APPLY_TYPE_JGBZ);//机构编制申请

                //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
                //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
                var status = data.result.status;
                $("#empPersonChangeForm").find("input[name='status']").val(status);
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#empPersonChangeForm").find("input[name='statusValue']").val(statusValue);
                $("#empPersonChangeForm").find("input[name='approvalDate']").val(data.result.approvalDate);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 初始化变动信息列表 为批量调整设置分页
     */
    function initChangeList(flag){
        if(flag){
            applicationUUID = $.xljUtils.getUrlParam("id");
        }

        jQuery("#empChangeApplyForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpChangeTmp/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                shrinkToFit:false,
                autoScroll: false,
                autowidth:true,
                width: window.screen.availWidth-25,
                height: $(window).height()-400,
                colNames : [ 'id','personId','姓名','变动时间','变动前补助职级','变动前通讯补助','变动前交通补助','变动前住房补贴',
                    '变动后补助职级','变动后通讯补助','变动后交通补助','变动后住房补贴','通讯补助变动幅度',
                    '交通补助变动幅度','住房补贴变动幅度','变动原因','变动类型','变动前薪资职级','变动前年薪',
                    '变动后薪资职级','变动后年薪','年薪变动幅度','调动前机构','调动前部门','调动前岗位','调动前职级',
                    '调动后机构','调动后部门','调动后岗位','调动后职级','调动前工作所在城市级别','调动后工作所在城市级别'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,sortable:false,hidden:true,align:'center'},
                    {name : 'personId',label : 'personId',editable:true,sortable:false,hidden:true,align:'center'},
                    {name : 'personName',label : 'personName',editable:true,sortable:false,align:'center'},
                    {name : 'changeTime',label : 'changeTime',editable:true,sortable:false,align:'center',formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                    {name : 'subsidyRankBefore',label : 'subsidyRankBefore',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'telSubsidyBefore',label : 'telSubsidyBefore',editable:true,sortable:false,align:'center',hidden:true},
                    {name : 'tranSubsidyBefore',label : 'tranSubsidyBefore',editable:true,sortable:false,align:'center'},
                    {name : 'houseSubsidyBefore',label : 'houseSubsidyBefore',editable:true,sortable:false,align:'center'},
                    {name : 'subsidyRankAfter',label : 'subsidyRankAfter',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'telSubsidyAfter',label : 'telSubsidyAfter',editable:true,sortable:false,align:'center',hidden:true},
                    {name : 'tranSubsidyAfter',label : 'tranSubsidyAfter',editable:true,sortable:false,align:'center'},
                    {name : 'houseSubsidyAfter',label : 'houseSubsidyAfter',editable:true,sortable:false,align:'center'},
                    {name : 'telPercent',label : 'telPercent',editable:true,sortable:false,align:'center',hidden:true},
                    {name : 'tranPercent',label : 'tranPercent',editable:true,sortable:false,align:'center'},
                    {name : 'housePercent',label : 'housePercent',editable:true,sortable:false,align:'center'},
                    {name : 'cause',label : 'cause',editable:true,sortable:false,align:'center'},
                    {name : 'type',label : 'type',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'wageRankBefore',label : 'wageRankBefore',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'salBefore',label : 'salBefore',editable:true,sortable:false,align:'center'},
                    {name : 'wageRankAfter',label : 'wageRankAfter',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'salAfter',label : 'salAfter',editable:true,sortable:false,align:'center'},
                    {name : 'percent',label : 'percent',editable:true,sortable:false,align:'center'},
                    {name : 'orgBefore',label : 'orgBefore',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRPrefixOrgNameById},
                    {name : 'deptBefpre',label : 'deptBefpre',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHROrgNameById},
                    {name : 'postBefore',label : 'postBefore',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRPostNameById},
                    {name : 'headshipRankBefore',label : 'headshipRankBefore',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'orgAfter',label : 'orgAfter',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRPrefixOrgNameById},
                    {name : 'deptAfter',label : 'deptAfter',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHROrgNameById},
                    {name : 'postAfter',label : 'postAfter',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRPostNameById},
                    {name : 'headshipRankAfter',label : 'headshipRankAfter',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'workPlaceRankBefore',label : 'workPlaceRankBefore',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'workPlaceRankAfter',label : 'workPlaceRankAfter',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById}
                ],
                postData:{"applyId":applicationUUID},
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                }
            });
    }

    /**
     * 批量删除晋升晋级人员
     */
    function deleteEmpChangeApply(){
        var idsVal = $('#empChangeApplyForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpChangeTmp/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $('#empChangeApplyForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
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
     * 保存审批单
     */
    window.submitAddForm = function(){
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
        sysApplyDto.type="1068100113";//审批类型
        sysApplyDto.personId = createrId;

        $.ajax({
            type: 'POST',
            url: baseUrl+'sys/sysApply/save',
            data: JSON.stringify(sysApplyDto),
            dataType: "json",
            contentType: 'application/json',
            success: function (xhr) {
                console.info(xhr);
                if (xhr) {
                    if (xhr.success) {
                        saveFlag = false;
                        //todo  将审批单ID传给回调ID
                        callBackId = applicationUUID;
                        if(applyFlag){
                            applyFlag = false;
                            //todo 获取审批开关
                            var applicationFlag = $.hrUtils.getHRSysParamByKey("PER_APP_SETTING");
                            if(applicationFlag == 1){
                                var obj = $("#empChangeApplyForm").jqGrid("getRowData");
                                if(obj.length>0){
                                    var checkFlag = true;
                                    var orgAfter = obj[0].orgAfter;
                                    var deptAfter = obj[0].deptAfter;
                                    var postAfter = obj[0].postAfter;
                                    jQuery(obj).each(function(index,content){
                                        if(content.orgAfter != orgAfter || content.deptAfter != deptAfter || content.postAfter != postAfter){
                                            checkFlag = false;
                                        }
                                    });
                                    if(checkFlag){
                                        toApplyByFlCode(FLCODE_RYDD,applicationUUID);
                                    }else{
                                        $.xljUtils.tip("blue", "调动人员需具有相同机构、部门和岗位！");
                                    }
                                }else{
                                    //todo 校验列表，防止调动列表为空，审批无法获取业务变量
                                    $.xljUtils.tip("blue", "人员调动列表不能为空！");
                                }

                            }else{
                                //todo 不走审批，直接同步正式表
                                $.ajax({
                                    type: 'POST',
                                    url: baseUrl+'emp/empPersonInfoTmp/applyPass/'+applicationUUID+"/rydd",
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
                                                $.xljUtils.tip("blue", "审批成功");
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
    };

    /**
     * 表单--保存提交
     */
    window.submitAddForm1 = function(){
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
        var formElements = $("#empPersonChangeForm").serializeArray();
        var hrEmpChangeTmpDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name") ){
                continue;
            }
            if(formElements[i].name == 'changeTime'){
                hrEmpChangeTmpDto[formElements[i].name]=formElements[i].value+" 00:00:00";
                continue;
            }
            hrEmpChangeTmpDto[formElements[i].name]=formElements[i].value;
        }
        hrEmpChangeTmpDto.delflag=false;//有效标志位
        hrEmpChangeTmpDto.applyId=applyId;//审批单ID
        hrEmpChangeTmpDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrEmpChangeTmp/save?time=' + Math.random(),
            data: JSON.stringify(hrEmpChangeTmpDto),
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

    };

    /**
     * 修改审批单
     */
    window.submitEditForm = function(){
        var applyId = applicationUUID;//获取审批单ID
        var sysApplyDto = {};
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
        sysApplyDto.type="1068100113";//审批类型
        sysApplyDto.personId = createrId;//制单人ID

        $.ajax({
            type: 'PUT',
            url: baseUrl+'sys/sysApply/update/'+applyId,
            data: JSON.stringify(sysApplyDto),
            dataType: "json",
            contentType: 'application/json',
            success: function (xhr) {
                console.info(xhr);
                if (xhr) {
                    if (xhr.success) {
                        //todo  将审批单ID传给回调ID
                        callBackId = applicationUUID;
                        if(applyFlag){
                            applyFlag = false;
                            //todo 获取审批开关
                            var applicationFlag = $.hrUtils.getHRSysParamByKey("PER_APP_SETTING");
                            if(applicationFlag == 1){
                                var obj = $("#empChangeApplyForm").jqGrid("getRowData");
                                if(obj.length>0){
                                    var checkFlag = true;
                                    var orgAfter = obj[0].orgAfter;
                                    var deptAfter = obj[0].deptAfter;
                                    var postAfter = obj[0].postAfter;
                                    jQuery(obj).each(function(index,content){
                                        if(content.orgAfter != orgAfter || content.deptAfter != deptAfter || content.postAfter != postAfter){
                                            checkFlag = false;
                                        }
                                    });
                                    if(checkFlag){
                                        toApplyByFlCode(FLCODE_RYDD,applicationUUID);
                                    }else{
                                        $.xljUtils.tip("blue", "调动人员需具有相同机构、部门和岗位！");
                                    }
                                }else{
                                    //todo 校验列表，防止调动列表为空，审批无法获取业务变量
                                    $.xljUtils.tip("blue", "人员调动列表不能为空！");
                                }
                            }else{
                                //todo 不走审批，直接同步正式表
                                $.ajax({
                                    type: 'POST',
                                    url: baseUrl+'emp/empPersonInfoTmp/applyPass/'+applicationUUID+"/rydd",
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
                                                $.xljUtils.tip("green","审批成功");
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
    };

    /**
     * 人员姓名回调函数
     */
    window.personCallBack = function(data){
        $("#personId").val(data.id);
        $("#personName").val(data.name);
        if(data.id != ''){
            getEmpInfoSetById(data.id);//选择人员后需要根据人员ID进行查询
        }
    };

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
    }

    /**
     * 调动后机构回调函数
     */
    window.orgAfterCallback = function (data) {
        $("#orgAfterName").val(data.prefixName);
        $("#orgAfter").val(data.id);
    };

    /**
     * 调动后部门回调函数
     */
    window.deptAfterCallback = function (data) {
        $("#deptAfterName").val(data.name);
        $("#deptAfter").val(data.id);
    };

    /**
     * 调动后岗位回调函数
     */
    window.postAfterCallback = function (data) {
        $("#postAfterName").val(data.name);
        $("#postAfter").val(data.id);
    };


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
})(jQuery, window, document)