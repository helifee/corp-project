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
        weekStart : 1,
        todayBtn : 1,
        autoclose : 1,
        minView:'month',
        startView : 2,
        forceParse : 0,
        showMeridian : 1
    });

    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    };

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
                 //$("#telSubsidyBefore").removeAttr("readonly");
                 $("#tranSubsidyBefore").removeAttr("readonly");
                 $("#houseSubsidyBefore").removeAttr("readonly");
                 //todo 手动输入将补助等级设置为‘其它’
                 $("#rankBefore_name").val('其它');
                 $("#rankBefore").val('其它');
                 //todo 重置补助
                 //$("#telSubsidyBefore").val('');
                 $("#tranSubsidyBefore").val('');
                 $("#houseSubsidyBefore").val('');
             }else{
                 $("#rankBeforeOption").show();
                 $("#cleanRankBefore").show();
                 //$("#telSubsidyBefore").attr("readonly","readonly");
                 $("#tranSubsidyBefore").attr("readonly","readonly");
                 $("#houseSubsidyBefore").attr("readonly","readonly");
                 //todo 重置薪资等级
                 $("#rankBefore_name").val('');
                 $("#rankBefore").val('');
                 //todo 重置补助
                //$("#telSubsidyBefore").val('');
                $("#tranSubsidyBefore").val('');
                $("#houseSubsidyBefore").val('');
             }
        }
    };
    $('.hr-single-selector-wageSubType'). xljSingleSelector(wageSubTypeOptions);

    //补助等级回调函数
    var subRank;
    subRank = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1149},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            $("#rankBefore_name").val(selectData.name);
            $("#rankBefore").val(selectData.id);
            var orgId = $("#orgId").val();
            var rankId = $("#rankBefore").val();
            var cityRankId = $("#workPlaceRankBefore").val();
            var wageSubType = $("#wageSubType").val();
            if(orgId != '' && rankId != '' && cityRankId != '' && wageSubType != '1085100154'){
                fillSub(orgId,rankId,cityRankId);
            }
        }
    };
    $('.hr-single-selector-subRank'). xljSingleSelector(subRank);

    //城市级别回调函数
    var cityRank;
    cityRank = {
        title:'选择代码',//选择器标题，默认是'选择组织机构'
        selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam:{'code_set_id':1022},//生成zTree树的请求参数
        targetId:null,//选择的数据的ID存储input域的id
        targetName:null,//选择的数据的Name存储input域
        saveCallback:function (selectData) {
            $("#workPlaceRankBefore_name").val(selectData.name);
            $("#workPlaceRankBefore").val(selectData.id);
            var orgId = $("#orgId").val();
            var rankId = $("#rankBefore").val();
            var cityRankId = $("#workPlaceRankBefore").val();
            var wageSubType = $("#wageSubType").val();
            if(orgId != '' && rankId != '' && cityRankId != '' && wageSubType != '1085100154'){
                fillSub(orgId,rankId,cityRankId);
            }
        }
    };
    $('.hr-single-selector-cityRank'). xljSingleSelector(cityRank);

    function fillSub(orgId,rankId,cityRankId){
        $.ajax({
            url: serviceUrl + "wage/wageStandardSubsidy/querySubsidyStandardDetails",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                "orgId": orgId,
                "rankId": rankId,
                'cityRankId': cityRankId,
                'codes':'traffic_allowance,housing_allowance,phone_allowance'
            }),
            success: function (xhr, textStatus) {
                if(xhr.result.length==2){
                    for(var i=0;i<xhr.result.length;i++){
                        // if(xhr.result[i].itemCode=='phone_allowance'){
                        //     $("#telSubsidyBefore").val(xhr.result[i].subsidyMoney);//通话补助
                        // }else
                        if(xhr.result[i].itemCode=='traffic_allowance'){
                            $("#tranSubsidyBefore").val(xhr.result[i].subsidyMoney);//交通补助
                        }else if(xhr.result[i].itemCode=='housing_allowance'){
                            $("#houseSubsidyBefore").val(xhr.result[i].subsidyMoney);//房补
                        }
                    }
                }else{
                    //$("#telSubsidyBefore").val(0);//通话补助
                    $("#tranSubsidyBefore").val(0);//交通补助
                    $("#houseSubsidyBefore").val(0);//房补
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

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
            $('title').text("新增补助信息");
            $(".xj-form-title").text("新增补助信息");
            //todo  初始化表单信息
            $("#wageSubType_name").val("人员薪资/补助标准");
            $("#wageSubType").val("1085100155");
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
            $('title').text("编辑补助信息");
            $(".xj-form-title").text("编辑补助信息");
            editHrWageSubchangeInfo(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#hrWageSubchangeForm").attr("data-validate-success", "window.submitEditForm()");
                $("#hrWageSubchangeForm").submit();
            });
        }
    }

    /**
     * 更改补助等级
     */
    window.changeRank = function(){
        $("#rankBefore").val('其它');
        $("#rankBefore_name").val("其它");
    };

    /**
     * 表单--保存提交
     */
    window.submitAddForm = function(){
        var applyId =$.xljUtils.getUrlParam("applyId");//获取审批单ID
        var formElements = $("#hrWageSubchangeForm").serializeArray();
        var hrWageSubchangeTmpDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name") || formElements[i].name=='wageSubType'){   //以_name结尾跳过
                continue;
            }
            hrWageSubchangeTmpDto[formElements[i].name]=formElements[i].value;

            if(formElements[i].name=='rankBefore'){
                hrWageSubchangeTmpDto.rankAfter = formElements[i].value;//补助等级
            }
            // if(formElements[i].name=='telSubsidyBefore'){
            //     hrWageSubchangeTmpDto.telSubsidyAfter = formElements[i].value;//通讯补助
            // }
            if(formElements[i].name=='tranSubsidyBefore'){
                hrWageSubchangeTmpDto.tranSubsidyAfter = formElements[i].value;//交通补助
            }
            if(formElements[i].name=='houseSubsidyBefore'){
                hrWageSubchangeTmpDto.houseSubsidyAfter = formElements[i].value;//住房补贴
            }
            if(formElements[i].name=='workPlaceRankBefore'){
                hrWageSubchangeTmpDto.workPlaceRankAfter = formElements[i].value;//城市等级
            }
        }
        hrWageSubchangeTmpDto.delflag=false;//有效标志位
        hrWageSubchangeTmpDto.applyId=applyId;//审批单据ID
        hrWageSubchangeTmpDto.cause='入职定补助';
        hrWageSubchangeTmpDto.type='入职定补助';
        hrWageSubchangeTmpDto.telPercent=0;
        hrWageSubchangeTmpDto.tranPercent=0;
        hrWageSubchangeTmpDto.housePercent=0;
        hrWageSubchangeTmpDto.id=uuid;//主键
        $.ajax({
            type: 'POST',
            url: baseUrl+'emp/hrWageSubchangeTmp/saveWageSub?time=' + Math.random(),
            data: JSON.stringify(hrWageSubchangeTmpDto),
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
     * 表单--修改提交
     */
    window.submitEditForm = function(){
        var id =$.xljUtils.getUrlParam("id");//获取审批单ID
        var formElements = $("#hrWageSubchangeForm").serializeArray();
        var hrWageSubchangeTmpDto = {};
        for(var i in formElements){
            if(formElements[i].name.endWith("_name") || formElements[i].name=='wageSubType'){  //以_name结尾跳过
                continue;
            }
            hrWageSubchangeTmpDto[formElements[i].name]=formElements[i].value;

            if(formElements[i].name=='rankBefore'){
                hrWageSubchangeTmpDto.rankAfter = formElements[i].value;//补助等级
            }
            // if(formElements[i].name=='telSubsidyBefore'){
            //     hrWageSubchangeTmpDto.telSubsidyAfter = formElements[i].value;//通讯补助
            // }
            if(formElements[i].name=='tranSubsidyBefore'){
                hrWageSubchangeTmpDto.tranSubsidyAfter = formElements[i].value;//交通补助
            }
            if(formElements[i].name=='houseSubsidyBefore'){
                hrWageSubchangeTmpDto.houseSubsidyAfter = formElements[i].value;//住房补贴
            }
            if(formElements[i].name=='workPlaceRankBefore'){
                hrWageSubchangeTmpDto.workPlaceRankAfter = formElements[i].value;//城市等级
            }
        }
        hrWageSubchangeTmpDto.delflag=false;//有效标志位
        $.ajax({
            type: 'PUT',
            url: baseUrl+'emp/hrWageSubchangeTmp/updateWageSub/'+id,
            data: JSON.stringify(hrWageSubchangeTmpDto),
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
     * 编辑补助变动信息
     * @param
     */
    function editHrWageSubchangeInfo(id){
        url = baseUrl+'emp/hrWageSubchangeTmp/get/'+id;
        $.ajax({
            type:'GET',
            url:url+'?time='+Math.random(),
            success: function(xhr) {
                console.log(xhr);
                if(xhr){
                    if(xhr.success){
                        $("#rankBefore").attr("value",xhr.result.rankBefore);
                        var rank = $.hrUtils.getHRCodeNameById(xhr.result.rankBefore);
                        if(rank != ''){
                            $("#rankBefore_name").attr("value",rank);
                            $("#wageSubType").val('1085100155');
                            $("#wageSubType_name").val('人员薪资/补助标准');
                        }else{
                            $("#rankBefore_name").attr("value",'其它');
                            $("#wageSubType").val('1085100154');
                            $("#wageSubType_name").val('手动输入');
                            $("#rankBeforeOption").hide();
                            $("#cleanRankBefore").hide();
                            //$("#telSubsidyBefore").removeAttr("readonly");
                            $("#tranSubsidyBefore").removeAttr("readonly");
                            $("#houseSubsidyBefore").removeAttr("readonly");

                        }
                        $("#orgId").val(xhr.result.orgId);
                        var orgName = (xhr.result.orgId == '' || xhr.result.orgId == null)?'':$.hrUtils.getHROrgNameById(xhr.result.orgId);
                        $("#orgId_name").val(orgName);
                        $("#workPlaceRankBefore").attr("value",xhr.result.workPlaceRankBefore);
                        $("#workPlaceRankBefore_name").attr("value",$.hrUtils.getHRCodeNameById(xhr.result.workPlaceRankBefore));
                        //$("#telSubsidyBefore").attr("value",xhr.result.telSubsidyBefore);
                        $("#tranSubsidyBefore").attr("value",xhr.result.tranSubsidyBefore);
                        $("#houseSubsidyBefore").attr("value",xhr.result.houseSubsidyBefore);
                        $("#remark").attr("value",xhr.result.remark);
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
        var orgId = $("#orgId").val();
        var rankId = $("#rankBefore").val();
        var cityRankId = $("#workPlaceRankBefore").val();
        var wageSubType = $("#wageSubType").val();
        if(orgId != '' && rankId != '' && cityRankId != '' && wageSubType != '1085100154'){
            fillSub(orgId,rankId,cityRankId);
        }
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
        $("#salBefore").val("");//重置“标准年薪”
    };

})(jQuery, window, document)
