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
    var options;
    options = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1011},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            $("#rankBefore").val(selectData.id);
            $("#rankBefore_name").val(selectData.name);
            var orgId = $("#orgId").val();//获取机构ID
            if(orgId != ''){//只有机构ID不为空才查询
                //todo 根据代码项和机构Id获取薪资
                $.ajax({
                    url: serviceUrl + "wage/wageStandardSalary/querySalaryStandardDetails/",
                    type: 'POST',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({"orgId":orgId,"psyGrads":selectData.id,'codes':'annual_salary'}),
                    success: function (xhr, textStatus) {
                        if(xhr.result.length>0){
                            $("#salBefore").val(xhr.result[0].itemMoney);//获取薪资项对应的薪资
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });
            }
        }
    };
    $('.hr-single-selector-mine'). xljSingleSelector(options);

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
                $("#rankBeforeOption").hide();
                $("#cleanRankBefore").hide();
                $("#salBefore").removeAttr("readonly");
                //todo 手动输入将薪资等级设置为‘其它’
                $("#rankBefore_name").val('其它');
                $("#rankBefore").val('其它');
                //todo 重置标准年薪
                $("#salBefore").val('');
             }else{
                $("#rankBeforeOption").show();
                $("#cleanRankBefore").show();
                $("salBefore").attr("readonly","readonly");
                //todo 重置薪资等级
                $("#rankBefore_name").val('');
                $("#rankBefore").val('');
                //todo 重置标准年薪
                $("#salBefore").val('');
             }
        }
    };
    $('.hr-single-selector-wageSubType'). xljSingleSelector(wageSubTypeOptions);


    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
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
            //todo  初始化表单信息
            $("#wageSubType_name").val("人员薪资/补助标准");
            $("#wageSubType").val("1085100155");

            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrWageChangeForm").attr("data-validate-success", "window.submitAddForm()");
                $("#hrWageChangeForm").submit();
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
            $('title').text("编辑薪酬变动信息");
            $(".xj-form-title").text("编辑薪酬变动信息");
            editWageChange(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrWageChangeForm").attr("data-validate-success", "window.submitEditForm()");
                $("#hrWageChangeForm").submit();
            });
        }
    }
    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var applyId =$.xljUtils.getUrlParam("applyId");//获取审批单ID
        var formElements = $("#hrWageChangeForm").serializeArray();
        var hrWageChangeTmpDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name") || formElements[i].name=='wageSubType'){   //以_name结尾跳过
                continue;
            }
            if(formElements[i].name=='changeTime'|| formElements[i].name=='effectTime'){
                hrWageChangeTmpDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                continue;
            }
            if(formElements[i].name=='rankBefore'){
                hrWageChangeTmpDto.rankAfter = formElements[i].value;//变动后薪资等级
            }
            if(formElements[i].name=='salBefore'){
                hrWageChangeTmpDto.salAfter = formElements[i].value;//变动后薪资
            }
            hrWageChangeTmpDto[formElements[i].name]=formElements[i].value;
        }
        hrWageChangeTmpDto.changeTime = new Date().Format("yyyy-MM-dd hh:mm:ss");//变动时间为当前日期
        hrWageChangeTmpDto.percent = 0;//变动幅度为0
        hrWageChangeTmpDto.cause='入职定薪';//变动原因默认为“入职定薪”
        hrWageChangeTmpDto.type='入职';//变动类型为“入职”
        hrWageChangeTmpDto.delflag=false;//有效标志位
        hrWageChangeTmpDto.applyId=applyId;//审批单ID
        hrWageChangeTmpDto.id=uuid;//主键


        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrWageChangeTmp/saveWage?time=' + Math.random(),
            data: JSON.stringify(hrWageChangeTmpDto),
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
        var id =$.xljUtils.getUrlParam("id");//获取审批单ID
        var formElements = $("#hrWageChangeForm").serializeArray();
        var hrWageChangeTmpDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name") || formElements[i].name=='wageSubType'){   //以_name结尾跳过
                continue;
            }
            if(formElements[i].name=='changeTime'|| formElements[i].name=='effectTime'){
                hrWageChangeTmpDto[formElements[i].name]=formElements[i].value+' 00:00:00';
                continue;
            }
            if(formElements[i].name=='rankBefore'){
                hrWageChangeTmpDto.rankAfter = formElements[i].value;//变动后薪资等级
            }
            if(formElements[i].name=='salBefore'){
                hrWageChangeTmpDto.salAfter = formElements[i].value;//变动后薪资
            }
            hrWageChangeTmpDto[formElements[i].name]=formElements[i].value;
        }
        hrWageChangeTmpDto.changeTime = new Date().Format("yyyy-MM-dd hh:mm:ss");//变动时间为当前日期
        hrWageChangeTmpDto.percent = 0;//变动幅度为0
        hrWageChangeTmpDto.cause='入职定薪';//变动原因默认为“入职定薪”
        hrWageChangeTmpDto.type='入职';//变动类型为“入职”
        hrWageChangeTmpDto.delflag=false;//有效标志位
        hrWageChangeTmpDto.id=id;//主键
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrWageChangeTmp/updateWage/'+id,
            data: JSON.stringify(hrWageChangeTmpDto),
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
     * 编辑薪资变动信息
     * @param
     */
    function editWageChange(id){
        url = baseUrl+'emp/hrWageChangeTmp/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                if(xhr){
                    if(xhr.success){
                        $("#rankBefore").attr("value",xhr.result.rankBefore);
                        var rankName = $.hrUtils.getHRCodeNameById(xhr.result.rankBefore);
                        if(rankName != ''){
                            $("#rankBefore_name").attr("value",rankName);
                            $("#wageSubType_name").val("人员薪资/补助标准");
                            $("#wageSubType").val("1085100155");
                        }else{
                            $("#rankBeforeOption").hide();
                            $("#cleanRankBefore").hide();
                            $("#rankBefore_name").attr("value",'其它');
                            $("#wageSubType_name").val("手动输入");
                            $("#wageSubType").val("1085100154");
                            $("#salBefore").removeAttr("readonly");
                        }
                        $("#orgId").val(xhr.result.orgId);
                        var orgName = (xhr.result.orgId=='' || xhr.result.orgId==null)?'':$.hrUtils.getHROrgNameById(xhr.result.orgId);
                        $("#orgId_name").val(orgName);
                        $("#salBefore").attr("value",xhr.result.salBefore);
                        $("#rankAfter").attr("value",xhr.result.rankAfter);
                        $("#salAfter").attr("value",xhr.result.salAfter);
                        $("#percent").attr("value",xhr.result.percent);
                        $("#cause").attr("value",xhr.result.cause);
                        $("#type").attr("value",xhr.result.type);
                        $("#remark").attr("value",xhr.result.remark);
                        $("#changeTime").attr("value",new Date(xhr.result.changeTime).Format("yyyy-MM-dd"));
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

    /**
     * 调动后机构回调函数
     */
    window.orgCallback = function (data) {
        $("#orgId_name").val(data.name);
        $("#orgId").val(data.id);
        var rankBefore = $("#rankBefore").val();
        if(rankBefore != '' && rankBefore != '其它'){//只有薪资等级不为空才查询
            $.ajax({
                url: serviceUrl + "wage/wageStandardSalary/querySalaryStandardDetails/",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({"orgId":data.id,"psyGrads":rankBefore,'codes':'annual_salary'}),
                success: function (xhr, textStatus) {
                    if(xhr.result.length>0){
                        $("#salBefore").val(xhr.result[0].itemMoney);//获取薪资项对应的薪资
                    }else{
                        $("#salBefore").val("");//查询不到数据则清空
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(xhr);
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            });
        }
    };

    //todo 清空信息
    window.emptyInfo=function (id,hiddenId){
        $("#"+id).val("");
        $("#"+hiddenId).val("");
        $("#salBefore").val("");//重置“标准年薪”
    };

})(jQuery, window, document)
