;(function($, window, document, undefined){
    /**
     * 家庭信息编辑js
     */
    var id;//编辑的id
    var name;//编辑的name
    var oper;//操作
    var rowData;//选中的数据
    var uuid;
    var url;//提交的地址
    var type;//提交方法
    var orgId;

    //薪资/补助类型回调函数
    var wageSubTypeOptions;
    wageSubTypeOptions = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:hostUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1085},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            $("#wageSubType").val(selectData.id);
            $("#wageSubType_name").val(selectData.name);
            //todo 根据选择的薪资/补助类型控制输入项
            if(selectData.name == '手动输入'){
                if(orgId==''){
                    $.xljUtils.tip("blue","人员机构未填写，只能是手动输入！");
                }else{
                    $("#rankAfter_name").val("其它");//薪資等級设为“其它”
                    $("#rankAfter").val("其它");
                    $("#salAfter").val("");
                    $("#salAfter").removeAttr("readonly");
                    $("#percent").val("");
                }
            }else{
                $("#salAfter").attr("readonly","readonly");
                $("#salAfter").val("");
                $("#rankAfter").val("");
                $("#rankAfter_name").val("");
                $("#percent").val("");
            }
        }
    };
    $('.hr-single-selector-wageSubType'). xljSingleSelector(wageSubTypeOptions);

    //变动后薪资等级回调函数
    var wageRankAfterOptions;
    wageRankAfterOptions = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:hostUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1011},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            if($("#rankAfter_name").val() == '其它'){
                $.xljUtils.tip("blue","手动输入薪资标准只能为其它！");
            }else{
                $("#rankAfter").val(selectData.id);
                $("#rankAfter_name").val(selectData.name);
                //todo 填充薪酬信息
                fillWage();
            }
        }
    };
    $('.hr-single-selector-wageRankAfter'). xljSingleSelector(wageRankAfterOptions);


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
        $('#hrWageChangeForm')[0].reset();
        $("#closeBtn").on("click",function(){
            document.getElementById("hrWageChangeForm").reset();
            $("#hrWageChangeForm :input[type='hidden']").val("");
        });
        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            document.getElementById("hrWageChangeForm").reset();
            window.close();
        });
        if(oper=="add"){
            $('title').text("新增薪酬变动信息");
            $(".xj-form-title").text("新增薪酬变动信息");
            initData();
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrWageChangeForm").attr("data-validate-success", "window.submitAddForm()");
                $("#hrWageChangeForm").submit();
            });
            //初始化UUID
            $.ajax({
                type:"GET",
                url:baseUrl+"/generator/getGuuid"+'?time='+Math.random(),
                dataType:"json",
                success: function(resultValue, textStatus) {
                    uuid = resultValue.result;
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }
            });
        }else if(oper=="edit"){
            $('title').text("编辑薪酬变动信息");
            $(".xj-form-title").text("编辑薪酬变动信息");
            editHrWageChange();
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                $("#hrWageChangeForm").attr("data-validate-success", "window.submitEditForm()");
                $("#hrWageChangeForm").submit();
            });
        }
    }

    //todo 初始化页面数据
    function initData(){
        orgId = $.xljUtils.getUrlParam("org");
        if(orgId != ''){
            $("#wageSubType").val('1085100155');//如果机构Id不为空，补助类型默认为“人员薪资/补助标准”
            $("#wageSubType_name").val('人员薪资/补助标准');
            //todo 如果没有维护机构，则只能是手动录入
            $("#cleanWageSubType").hide();
            $("#wageSubTypeOption").hide();
        }else{
            $("#wageSubType").val('1085100154');//如果机构Id为空，补助类型为“手动输入”
            $("#wageSubType_name").val('手动输入');
        }
        $("#changeTime").val(new Date().Format("yyyy-MM-dd"));//变动时间
        $("#effectTime").val(new Date().Format("yyyy-MM-dd"));//生效时间
        initHrWageChange(id);
    }

    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var formElements = $("#hrWageChangeForm").serializeArray();
        var hrWageChangeDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name") || formElements[i].name == 'wageSubType'){
                continue;
            }
            if(formElements[i].name=='changeTime'|| formElements[i].name=='effectTime'){
                hrWageChangeDto[formElements[i].name]=formElements[i].value+' '+new Date().Format("hh:mm:ss");
                continue;
            }
            hrWageChangeDto[formElements[i].name]=formElements[i].value;
        }
        hrWageChangeDto.delflag=0;//有效标志位
        hrWageChangeDto.personId=id;//关联人员Id
        hrWageChangeDto.id=uuid;//主键
        hrWageChangeDto.isLastChange='1009100036';
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrWageChange/saveWage?time=' + Math.random(),
            data: JSON.stringify(hrWageChangeDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(xhr.result.id, 'hrWageChangeForm');
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
    window.submitEditForm = function(){
        var formElements = $("#hrWageChangeForm").serializeArray();
        var hrWageChangeDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name") || formElements[i].name == 'wageSubType'){
                continue;
            }
            if(formElements[i].name=='changeTime'|| formElements[i].name=='effectTime'){
                hrWageChangeDto[formElements[i].name]=formElements[i].value+' '+new Date().Format("hh:mm:ss");;
                continue;
            }
            hrWageChangeDto[formElements[i].name]=formElements[i].value;
        }
        hrWageChangeDto.delflag=0;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrWageChange/updateWage/'+id,
            data: JSON.stringify(hrWageChangeDto),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        window.opener.callBackPerInfo(id, 'hrWageChangeForm');
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

    //todo 初始化薪资信息
    function initHrWageChange(id){
        url = baseUrl+'emp/hrWageChange/queryList';
        $.ajax({
            type:'POST',
            url:url+'?time='+Math.random(),
            data:JSON.stringify({"personId":id,"isLastChange":'1009100036'}),
            dataType:"json",
            contentType: "application/json;charset=utf-8",
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        if(xhr.result!=null && xhr.result.length > 0){
                            if(xhr.result[0].rankAfter == '其它'){
                                $("#rankBefore_name").attr("value",'其它');
                                $("#rankAfter_name").val('其它');
                            }else{
                                var rankBefore = (xhr.result[0].rankAfter =='' || xhr.result[0].rankAfter == null)?'':$.hrUtils.getHRCodeNameById(xhr.result[0].rankAfter);
                                $("#rankBefore_name").attr("value",rankBefore);
                                $("#rankAfter_name").val(rankBefore);
                            }
                            $("#rankBefore").val(xhr.result[0].rankAfter);
                            $("#salBefore").attr("value",xhr.result[0].salAfter);
                            $("#rankAfter").attr("value",xhr.result[0].rankAfter);
                            $("#salAfter").attr("value",xhr.result[0].salAfter);
                            $("#percent").attr("value",0);
                        }
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
     * 编辑薪资变动信息
     * @param
     */
    function editHrWageChange(){
        var id=$.xljUtils.getUrlParam("id");
        url = baseUrl+'emp/hrWageChange/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        if(xhr.result.rankAfter=='其它'){
                            $("#wageSubType").val('1085100154');//如果机构Id为空，补助类型为“手动输入”
                            $("#wageSubType_name").val('手动输入');
                        }else{
                            $("#wageSubType").val('1085100155');//如果机构Id不为空，补助类型默认为“人员薪资/补助标准”
                            $("#wageSubType_name").val('人员薪资/补助标准');
                        }
                        $("#rankBefore").attr("value",xhr.result.rankBefore);
                        if(xhr.result.rankBefore == '其它'){
                            $("#rankBefore_name").val('其它');
                        }else{
                            var rankBefore = (xhr.result.rankBefore =='' || xhr.result.rankBefore == null)?'':$.hrUtils.getHRCodeNameById(xhr.result.rankBefore);
                            $("#rankBefore_name").val(rankBefore);
                        }
                        $("#salBefore").attr("value",xhr.result.salBefore);
                        $("#rankAfter").attr("value",xhr.result.rankAfter);
                        if(xhr.result.rankAfter == '其它'){
                            $("#rankAfter_name").val('其它');
                        }else{
                            var rankAfter = (xhr.result.rankAfter =='' || xhr.result.rankAfter == null)?'':$.hrUtils.getHRCodeNameById(xhr.result.rankAfter);
                            $("#rankAfter_name").val(rankAfter);
                        }
                        $("#salAfter").attr("value",xhr.result.salAfter);
                        $("#percent").attr("value",xhr.result.percent);
                        $("#cause").attr("value",xhr.result.cause);
                        if(xhr.result.cause=='入职'){
                            $("#type").attr("value",xhr.result.type);
                            $("#type_name").val('入职');
                        }else{
                            $("#type").attr("value",xhr.result.type);
                            var type = (xhr.result.type =='' || xhr.result.type == null)?'':$.hrUtils.getHRCodeNameById(xhr.result.type);
                            $("#type_name").val(type);
                        }

                        $("#remark").attr("value",xhr.result.remark);
                        $("#changeTime").attr("value",changeTimeStyle(xhr.result.changeTime).Format("yyyy-MM-dd"));
                        $("#effectTime").attr("value",changeTimeStyle(xhr.result.effectTime).Format("yyyy-MM-dd"));
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

    //todo 清空信息
    window.emptyInfo=function (id,hiddenId){
        $("#"+id).val("");
        $("#"+hiddenId).val("");
    }

    //todo 针对IE进行时间转换
    function changeTimeStyle(bTime){
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1]+'/'+timeDate[2]+'/'+timeDate[0];
        var later = new Date(bTime);
        return later;
    }

    //todo 变动幅度计算
    window.calPercent = function(){
        var salBefore = $("#salBefore").val();//变动前通话补助
        var salAfter = $("#salAfter").val();//变动后通话补助
        if(salBefore!=''&& salAfter!==''){
            if($.isNumeric(salBefore) && $.isNumeric(salAfter)){
                if(salBefore != 0){
                    var percent = (salAfter - salBefore)/salBefore;
                    $("#percent").val((percent*100).toFixed(2));
                }else{
                    $("#percent").val(0);
                }
            }else{
                $("#percent").val('');
            }
        }else{
            $("#percent").val('');
        }
    };

    //填充薪资
    function fillWage(){
        var wageRankAfter = $("#rankAfter").val();
        orgId=$.xljUtils.getUrlParam("org");
        if(orgId!='' && (wageRankAfter!=''&& wageRankAfter!='其它')){
            //机构ID和薪资等级不为空，对月薪进行赋值操作
            //todo 根据代码项和机构Id获取薪资
            $.ajax({
                url: baseUrl + "wage/wageStandardSalary/querySalaryStandardDetails/",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({"orgId":orgId,"psyGrads":wageRankAfter,'codes':'annual_salary'}),
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

})(jQuery, window, document)
