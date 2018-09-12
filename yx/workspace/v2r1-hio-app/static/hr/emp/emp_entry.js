;(function ($, window, document, undefined) {
    var oper;//操作类型
    var personUUID;//人员ID主键
    var applicationUUID = '';//审批单主键
    var personId;
    var img = $('#preImg');
    var applyId;//审批单ID
    var saveFlag = true;//保存标志默认为true
    var applyFlag = false;//发起审批标志位
    var saveBtnFlag = false;//暂存标志位
    var applyBtnFlag = false;//发起审批标志位
    var createrId = '';
    var oldPhoto;//二次入职用于存放人员照片
    var submitFlag = false;//判定表单是否提交,默认为false
    var callBackId;//子页面返回给父页面的ID
    var fromZPFlag;//是否来自招聘标志
    var fromZPId;//人员在招聘模块的简历id

    /**
     * 时间控件--中文
     */
    $.fn.datetimepicker.dates['zh'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem: ["上午", "下午"],
        today: "今天"
    };

    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        // resizeGrid();
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
        language: 'zh',
        format: "yyyy-mm-dd",
        minView: 'month',
        weekStart: 1,
        todayBtn: 1,
        autoclose: true,
        startView: 2,
        forceParse: false,
        showMeridian: 1
    }).on('hide', function () {
        //输入框失去焦点，使得前端保存校验通过
        $(this).find("input").trigger("blur");
    });

    //返回人员列表
    $("#backEmpList").click(function () {
        var back = $.xljUtils.getUrlParam("back");
        if (back == "01") {//返回人员列表
            //status=01 载入查询条件
            window.location.href = "../org/org_list.html?status=01";
        }else{
            window.history.go(-1);
        }

    });

    //todo 判定是更新还是保存
    function saveOrUpdate() {
        if (saveFlag) {
            // if (saveBtnFlag) {
                $.xljUtils.customSingleValidate("#applicationForm");
                var validRet = $("#applicationForm").valid();
                if (validRet && validRet == true) {
                    window.submitAddForm();
                }
                // $("#applicationForm").attr("data-validate-success", "window.submitAddForm()");//保存
                // $("#applicationForm").submit();
            // } else {
            //     applyFlag = false;
            //     $.xljUtils.tip("blue", "请先暂存，再发起审批！");
            // }
        } else {
            var statusValue = $("#statusValue").val();
            if (statusValue == "草稿") {
                $.xljUtils.customSingleValidate("#applicationForm");
                var validRet = $("#applicationForm").valid();
                if (validRet && validRet == true) {
                    window.submitEditForm();
                }
                // $("#applicationForm").attr("data-validate-success", "window.submitEditForm()");//更新
                // $("#applicationForm").submit();
            } else {
                $.xljUtils.tip("blue", "非草稿状态审批单不能修改和发起审批！");
            }
        }
    }

    /**
     * 校验在职人员
     * @param name
     * @param phone
     */
    window.checkNamePhone=function(name,phone){
        var b=false;//不存在
        if(name==''||phone==''){
            return b;
        }
        //在职
        var data1 = JSON.stringify({"name": name, "phone": phone,"status":"1143100260","delflag":"0"});
        $.ajax({
            type: "POST",
            async: false,
            url: baseUrl + "emp/empPersonInfo/queryList",
            contentType: 'application/json',
            data: data1,
            dataType: "json",
            success: function (data) {
                if(data.success){
                    if(data.result.length>0){
                        b=true;//存在
                        $.xljUtils.tip("red", "当前手机姓名存在在职人员，不能新增入职！");
                    }
                }
            },
            error: function (data) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
        return b;
    };

    /**
     * 校验在职人员账号
     * @param name
     * @param phone
     */
    window.checkAccount=function(account){
        var b=false;//不存在
        if(account==''){
            return b;
        }
        //在职
        var data1 = JSON.stringify({"account": account,"status":"1143100260","delflag":"0"});
        $.ajax({
            type: "POST",
            async: false,
            url: baseUrl + "emp/empPersonInfo/queryList",
            contentType: 'application/json',
            data: data1,
            dataType: "json",
            success: function (data) {
                if(data.success){
                    if(data.result.length>0){
                        b=true;//存在
                        $.xljUtils.tip("red", "当前账号存在在职人员，不能新增入职！");
                    }
                }
            },
            error: function (data) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
        return b;
    };
    window.queryAccount=function () {
        var account=$('#account').val();
        checkAccount(account);
    }

    /**
     * 当姓名，手机号码都有时，查询当前系统中是否存在此人，并告知操作者该人状态，提示是否要回填信息
     * 若是，则回填信息
     */
    window.queryEmpPersonInfo = function () {
        var phone = $("#phone").val();
        var name = $("#name").val();
        if (phone && phone != '' && name && name != '') {
            //校验在职人员姓名手机
            checkNamePhone(name,phone);
            //查询当前系统中是否存在此人(非在职的)
            var data = JSON.stringify({"name": name, "phone": phone});
            $.ajax({
                type: "POST",
                async: false,
                url: baseUrl + "emp/empPersonInfo/getHREmpInfoByNameAndPhone",
                contentType: 'application/json',
                data: data,
                dataType: "json",
                success: function (data) {
                    var empPersonInfoDto = data.result;
                    if (empPersonInfoDto != undefined) {
                        //后台：如果查询到生成一个新id对应的人员临时信息
                        //并告知操作者该人状态，提示是否要回填信息
                        $.xljUtils.confirm("blue", "当前系统中存在姓名为" + empPersonInfoDto.name + "，手机号码为" + empPersonInfoDto.phone + "，人员状态为离职的人员信息，是否需要回显此人信息？", function () {
                            $("#personId").val(empPersonInfoDto.id);//主键
                            personUUID = empPersonInfoDto.id;//人员ID
                            $("#name").val(empPersonInfoDto.name);//姓名
                            $("#pinyin").val(empPersonInfoDto.pinyin);//拼音
                            $("#sex").val(empPersonInfoDto.sex);//性别
                            // $("#age").val(empPersonInfoDto.age);//年龄
                            $("#sex_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.sex));//性别
                            $("#constellation").val(empPersonInfoDto.constellation);//星座
                            $("#constellation_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.constellation));//星座
                            var birth = (empPersonInfoDto.birth == '' || empPersonInfoDto.birth == null) ? '' : changeTimeStyle(empPersonInfoDto.birth).Format("yyyy-MM-dd");
                            $("#birth").val(birth);
                            if (birth != '') {
                                //todo 年龄赋值
                                calAgeOfEmp(birth);//new Date().getYear() - new Date(birth).getYear();
                            }
                            var entryPartyTime = (empPersonInfoDto.entryPartyTime == '' || empPersonInfoDto.entryPartyTime == null) ? '' : changeTimeStyle(empPersonInfoDto.entryPartyTime).Format("yyyy-MM-dd");
                            $("#entryPartyTime").val(entryPartyTime);//入党日期
                            $("#nationality").val(empPersonInfoDto.nationality);
                            var nationalityName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.nationality);
                            if (nationalityName != '') {
                                $("#nationality_name").val(nationalityName);
                            }
                            $("#roleIds").val(empPersonInfoDto.roleIds);//角色
                            var roleIdsName = $.hrUtils.getPtPostNameByIds(empPersonInfoDto.roleIds);
                            if (roleIdsName != '') {
                                $("#roleIds_name").val(roleIdsName);//角色名称
                            }
                            $("#password").val("******");//密码
                            $("#probationPeriod").val(empPersonInfoDto.probationPeriod);//试用期限
                            $("#idType").val(empPersonInfoDto.idType);//证件类型
                            var idTypeName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.idType);
                            if (idTypeName != '') {
                                $("#idType_name").val(idTypeName);
                            }
                            $("#idCard").val(empPersonInfoDto.idCard);
                            $("#orgId").val(empPersonInfoDto.orgId);
                            var orgName = $.hrUtils.getHRPrefixOrgNameById(empPersonInfoDto.orgId);
                            if (orgName != '') {
                                $("#orgName").val(orgName);
                            }
                            $("#postId").val(empPersonInfoDto.postId);
                            $("#postName").val($.hrUtils.getPtPostNameById(empPersonInfoDto.postId));
                            $("#headshipRank").val(empPersonInfoDto.headshipRank);
                            $("#headshipRank_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.headshipRank));
                            $("#account").val(empPersonInfoDto.account);
                            $("#maxEducation").val(empPersonInfoDto.maxEducation);
                            var maxEducationName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.maxEducation);
                            if (maxEducationName != '') {
                                $("#maxEducation_name").val(maxEducationName);
                            }
                            $("#maxDegree").val(empPersonInfoDto.maxDegree);
                            var maxDegreeName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.maxDegree);
                            if (maxDegreeName != '') {
                                $("#maxDegree_name").val(maxDegreeName);
                            }
                            $("#partyFigure").val(empPersonInfoDto.partyFigure);
                            var partyFigureName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.partyFigure);
                            if (partyFigureName != '') {
                                $("#partyFigure_name").val(partyFigureName);
                            }
                            $("#folk").val(empPersonInfoDto.folk);
                            var folkName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.folk);
                            if (folkName != '') {
                                $("#folk_name").val(folkName);
                            }
                            if (empPersonInfoDto.workTime != '' && empPersonInfoDto.workTime != undefined) {
                                var workTime = (empPersonInfoDto.workTime == null || empPersonInfoDto.workTime == '') ? '' : changeTimeStyle(empPersonInfoDto.workTime).Format("yyyy-MM-dd");
                                $("#workTime").val(workTime);
                            }
                            if (empPersonInfoDto.workTime != '' && empPersonInfoDto.workTime != undefined) {
                                var UToTime = $("#workTime").val();
                                var aDate = UToTime.split("-");
                                var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
                                var myDate = new Date();
                                var dif = myDate.getTime() - NewDate.getTime();
                                myDate.setTime(dif);
                                $("#workAge").val(myDate.getFullYear() - 1970);//计算工龄
                            } else {
                                $("#workAge").val(0);//计算工龄
                            }
                            if (empPersonInfoDto.entryTime != null) {//入职日期
                                var entryTime = (empPersonInfoDto.entryTime == null || empPersonInfoDto.entryTime == null) ? '' : changeTimeStyle(empPersonInfoDto.entryTime).Format("yyyy-MM-dd");
                                $("#entryTime").val(entryTime);
                                //todo 司龄赋值
                                var seniorit = calSeniorit(entryTime);
                                $("#seniorit").val(seniorit);
                            }
                            if (empPersonInfoDto.firstBeginTime != null) {//首次合同开始时间
                                var firstBeginTime = (empPersonInfoDto.firstBeginTime == null || empPersonInfoDto.firstBeginTime == null) ? '' : changeTimeStyle(empPersonInfoDto.firstBeginTime).Format("yyyy-MM-dd");
                                $("#firstBeginTime").val(firstBeginTime);
                            }
                            if (empPersonInfoDto.firstEndTime != null) {//首次合同结束时间
                                var firstEndTime = (empPersonInfoDto.firstEndTime == null || empPersonInfoDto.firstEndTime == null) ? '' : changeTimeStyle(empPersonInfoDto.firstEndTime).Format("yyyy-MM-dd");
                                $("#firstEndTime").val(firstEndTime);
                            }
                            if (empPersonInfoDto.nowBeginTime != null) {//现合同开始时间
                                var nowBeginTime = (empPersonInfoDto.nowBeginTime == null || empPersonInfoDto.nowBeginTime == null) ? '' : changeTimeStyle(empPersonInfoDto.nowBeginTime).Format("yyyy-MM-dd");
                                $("#nowBeginTime").val(nowBeginTime);
                            }
                            if (empPersonInfoDto.nowEndTime != null) {//现合同结束时间
                                var nowEndTime = (empPersonInfoDto.nowEndTime == null || empPersonInfoDto.nowEndTime == null) ? '' : changeTimeStyle(empPersonInfoDto.nowEndTime).Format("yyyy-MM-dd");
                                $("#nowEndTime").val(nowEndTime);
                            }
                            $("#renewalTimes").val(empPersonInfoDto.renewalTimes);//续签次数
                            $("#bankUserName").val(empPersonInfoDto.bankUserName);//开户名
                            $("#bankAccount").val(empPersonInfoDto.bankAccount);//银行账户
                            $("#bankName").val(empPersonInfoDto.bankName);//开户行
                            $("#bankProvince").val(empPersonInfoDto.bankProvince);//银行所在省
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
                            $("#sort").val(empPersonInfoDto.sort);
                            $("#email").val(empPersonInfoDto.email);
                            $("#marry").val(empPersonInfoDto.marry);
                            $("#marry_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.marry));
                            $("#deptId").val(empPersonInfoDto.deptId);
                            $("#deptId_name").val($.hrUtils.getHROrgNameById(empPersonInfoDto.deptId));
                            // $("#postType").val(empPersonInfoDto.postType);
                            // $("#postType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.postType));
                            var graduateDate = (empPersonInfoDto.graduateDate == null || empPersonInfoDto.graduateDate == null) ? '' : changeTimeStyle(empPersonInfoDto.graduateDate).Format("yyyy-MM-dd");
                            $("#graduateDate").val(graduateDate);
                            $("#bloodType").val(empPersonInfoDto.bloodType);
                            $("#bloodType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.bloodType));
                            // $("#outlander").val(empPersonInfoDto.outlander);
                            // $("#outlander_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.outlander));
                            $("#health").val(empPersonInfoDto.health);
                            $("#health_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.health));
                            $("#phone").val(empPersonInfoDto.phone);//手机
                            $("#personType").val(empPersonInfoDto.personType);
                            $("#personType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.personType));
                            $("#recruitCannelId").val(empPersonInfoDto.recruitCannelId);
                            $("#recruitCannelId_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.recruitCannelId));
                            $("#personCode").val(empPersonInfoDto.personCode);
                            // if(empPersonInfoDto.retireDate != null){
                            //     var retireDate = (empPersonInfoDto.retireDate == '' || empPersonInfoDto.retireDate == null)?'':changeTimeStyle(empPersonInfoDto.retireDate).Format("yyyy-MM-dd");
                            //     $("#retireDate").val(retireDate);//退休时间
                            // }
                            if (empPersonInfoDto.holdHeadshipTime != null) {
                                var holdHeadshipTime = (empPersonInfoDto.holdHeadshipTime == '' || empPersonInfoDto.holdHeadshipTime == null) ? '' : changeTimeStyle(empPersonInfoDto.holdHeadshipTime).Format("yyyy-MM-dd");
                                $("#holdHeadshipTime").val(holdHeadshipTime);
                            }
                            if (empPersonInfoDto.regularTime != null) {
                                var regularTime = (empPersonInfoDto.regularTime == '' || empPersonInfoDto.regularTime == null) ? '' : changeTimeStyle(empPersonInfoDto.regularTime).Format("yyyy-MM-dd");
                                $("#regularTime").val(regularTime);
                            }
                            $("#wageId").val(empPersonInfoDto.wageId);
                            var wageName = getRank(empPersonInfoDto.wageId);
                            $("#wageId_name").val(wageName);
                            $("#wageAllowanceId").val(empPersonInfoDto.wageAllowanceId);
                            var wageAllowanceName = getRank(empPersonInfoDto.wageAllowanceId);
                            $("#wageAllowanceId_name").val(wageAllowanceName);
                            $("#workPhone").val(empPersonInfoDto.workPhone);
                            $("#kqType").val(empPersonInfoDto.kqType);
                            $("#kqType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.kqType));
                            if (empPersonInfoDto.entryOrgTime != null) {
                                var entryOrgTime = (empPersonInfoDto.entryOrgTime == '' || empPersonInfoDto.entryOrgTime == null) ? '' : changeTimeStyle(empPersonInfoDto.entryOrgTime).Format("yyyy-MM-dd");
                                $("#entryOrgTime").val(entryOrgTime);
                            }
                            $("#remark").val(empPersonInfoDto.remark);
                            $("#nowPlace").val(empPersonInfoDto.nowPlace);//现住址
                            if (empPersonInfoDto.photo != '' && empPersonInfoDto.photo != undefined) {
                                $("#preImg").attr("src", "data:image/jpeg;base64," + empPersonInfoDto.photo);
                                $("#preImg").attr("height", 180);
                                $("#preImg").attr("width", 142);
                            } else {
                                $("#preImg").attr("src", "/platform-app/common/img/defaultPic.png");
                            }
                            $("#nativePlace").val(empPersonInfoDto.nativePlace);//籍贯
                            $("#archivePlace").val(empPersonInfoDto.archivePlace);//档案所在地
                            //todo 新增字段
                            $("#siPayArea").val(empPersonInfoDto.siPayArea);//公积金缴纳地
                            var siPayArea_name = (empPersonInfoDto.siPayArea == '' || empPersonInfoDto.siPayArea == null) ? '' : $.hrUtils.getHRCodeNameById(empPersonInfoDto.siPayArea);
                            $("#siPayArea_name").val(siPayArea_name);

                            $("#postLevel").val(empPersonInfoDto.postLevel);//岗位层级
                            var postLevel_name = (empPersonInfoDto.postLevel == '' || empPersonInfoDto.postLevel == null) ? '' : $.hrUtils.getHRCodeNameById(empPersonInfoDto.postLevel);
                            $("#postLevel_name").val(postLevel_name);

                            $("#compileType").val(empPersonInfoDto.compileType);//编制属性
                            var compileType_name = (empPersonInfoDto.compileType == '' || empPersonInfoDto.compileType == null) ? '' : $.hrUtils.getHRCodeNameById(empPersonInfoDto.compileType);
                            $("#compileType_name").val(compileType_name);
                            $("#firstEducation").val(empPersonInfoDto.firstEducation);//第一学历
                            var firstEducation_name = (empPersonInfoDto.firstEducation == '' || empPersonInfoDto.firstEducation == null) ? '' : $.hrUtils.getHRCodeNameById(empPersonInfoDto.firstEducation);
                            $("#firstEducation_name").val(firstEducation_name);
                            $("#firstDegree").val(empPersonInfoDto.firstDegree);//第一学位
                            var firstDegree_name = (empPersonInfoDto.firstDegree == '' || empPersonInfoDto.firstDegree == null) ? '' : $.hrUtils.getHRCodeNameById(empPersonInfoDto.firstDegree);
                            $("#firstDegree_name").val(firstDegree_name);
                            $("#functions").val(empPersonInfoDto.functions);
                            var functionsName = (empPersonInfoDto.functions == "" || empPersonInfoDto.functions == undefined) ? "" : $.hrUtils.getHROrgNameById(empPersonInfoDto.functions);
                            $("#functionsName").val(functionsName);

                            var personId = empPersonInfoDto.id;
                            //todo 根据人员ID将该人员的其他子集的正式表信息同步到其他子集临时表中
                            $.ajax({
                                type: "POST",
                                async: false,
                                url: baseUrl + "emp/empPersonInfo/queryDataToTemp",
                                contentType: 'application/json',
                                data: JSON.stringify({
                                    "personId": empPersonInfoDto.id,
                                    "applyId": applicationUUID,
                                    "oldPersonId": empPersonInfoDto.oldPersonId
                                }),
                                dataType: "json",
                                success: function (data) {
                                    //重新加载兼职信息
                                    var postData = $("#postList").jqGrid("getGridParam", "postData");
                                    $.each(postData, function (k, v) {
                                        delete postData[k];
                                    });
                                    $("#postList").jqGrid('setGridParam', {
                                        datatype: 'json',
                                        postData: {'userId': empPersonInfoDto.id}
                                    }).trigger('reloadGrid');

                                    //todo 重新加载工作经历
                                    var postData = $("#workHistoryList").jqGrid("getGridParam", "postData");
                                    $.each(postData, function (k, v) {
                                        delete postData[k];
                                    });
                                    $("#workHistoryList").jqGrid('setGridParam', {
                                        datatype: 'json',
                                        postData: {"applyId": applicationUUID}
                                    }).trigger('reloadGrid');
                                    //todo 重新加载教育经历
                                    var postData = $("#eduHistoryForm").jqGrid("getGridParam", "postData");
                                    $.each(postData, function (k, v) {
                                        delete postData[k];
                                    });
                                    $("#eduHistoryForm").jqGrid('setGridParam', {
                                        datatype: 'json',
                                        postData: {'applyId': applicationUUID}
                                    }).trigger('reloadGrid');
                                    //todo 重新加载家庭信息
                                    // var postData = $("#hrEmpFamilyForm").jqGrid("getGridParam", "postData");
                                    // $.each(postData, function (k, v) {
                                    //     delete postData[k];
                                    // });
                                    // $("#hrEmpFamilyForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
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
                        }, true);//选择不回显也可以
                    }
                },
                error: function (data) {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            });
        }
    };

    /**
     * 当证件类型，证件号码都有，并且证件类型为身份证时，自动计算出生日期、性别、年龄并回填
     */
    window.calBirthAndSexAndAge = function () {
        var idType = $("#idType").val();
        var idCard = $("#idCard").val();
        if (idType == "1058100078" && idCard != '') {
            //自动计算出生日期、性别、年龄并回填
            var idCardInfo = idCardNoUtil.getIdCardInfo($("#idCard").val());
            var birthday = idCardInfo.birthday;
            $("#birth").val(birthday);
            var gender = idCardInfo.gender;
            $("#sex_name").val(gender);
            if (gender == '男') {
                $("#sex").val('1057100076');
            } else if (gender == '女') {
                $("#sex").val('1057100077');
            } else {
                $.xljUtils.tip("red", "身份证号码不正确！");
            }
            calAgeOfEmp(birthday);
        }
    }

    /**
     * 通过维护入职时间自动计算司龄
     */
    window.entryTimeChangeEvent = function () {
        if ($("#entryTime").val() != '') {
            $("#seniorit").val(calSeniorit($("#entryTime").val()));//计算司龄
        }
    }

    /**
     * 计算司龄
     */
    function calSeniorit(entryTime) {
        var UToTime = $("#entryTime").val();
        var aDate = UToTime.split("-");
        var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
        var myDate = new Date();
        var dif = myDate.getTime() - NewDate.getTime();
        myDate.setTime(dif);
        return myDate.getFullYear() - 1970
    }

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
            url: hostUrl + "sys/sysApply/getDirectDeptAnaDirectComByUser",
            type: 'POST',
            dataType: 'JSON',
            async: false,
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
    window.userCallback = function (data, success) {
        console.log(data);
        //经办人
        var userId = data.id;
        $('#applicant').val(userId);
        getDirectDeptAnaDirectComByUser();
    };

    /**
     * 清空ERP帐号
     */
    window.cleanErpAccount = function () {
        $("#account").val("");
    };

    /**
     * 根据姓名、证件类型、证件号码到系统中查询是否已有该雇员。如果有，则自动匹配出账号和其他信息（不含工作信息和兼职信息）。
     */
    window.queryThisEmp = function () {

        //此功能暂时不做
        return;
        /*var name = $("#name").val();//姓名
         var idType = $("#idType").val();//证件类型
         var idCard = $("#idCard").val();//证件号码
         if( name != '' && idType != '' && idCard != ''){
         //todo 根据姓名、证件类型、证件号码到系统中查询是否已有该雇员
         $.ajax({
         type: 'POST',
         url: baseUrl + "emp/empPersonInfo/getByNameIdTypeIdCard",
         data: JSON.stringify({"name" : name, "idType" : idType, "idCard" : idCard}),
         dataType: "json",
         async: false,
         processData:false,
         contentType: 'application/json',
         success: function (xhr) {
         console.info(xhr);
         if (xhr) {
         if (xhr.success) {
         debugger;
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
         }*/
    }

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
            url: baseUrl + "emp/empPersonInfo/getHREmpInfoByAccount",
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
    $(function () {
        //初始页面
        initPersonInfo();
        //todo 所属机构联动所属公司
        $("#deptmentId").change(function () {
            changeCompanyByDeptId();
        });

//*********************************来自招聘模块，填充数据：开始*********************************
        if (window.opener != undefined) {
            fromZPFlag = window.opener.fromZPFlag;
            fromZPId = window.opener.fromZPId;
            // alert("fromZPFlag==" + fromZPFlag + "   fromZPId==" + fromZPId);
            if (fromZPFlag !== null && fromZPFlag !== undefined && (fromZPFlag === true || fromZPFlag === "true") && fromZPId !== null && fromZPId !== "" && fromZPId !== undefined) {
                getPersonInfoFromZP(fromZPId);
            }
        }
//*********************************来自招聘模块，填充数据：结束*********************************
        //关闭页面
        $("#closeBtn").click(function () {
            if (callBackId != undefined && window.opener.parentReloadById != undefined) {
                window.opener.parentReloadById(callBackId);
            }
            window.close();
        });
        //新增工作经历
        $("#addWorkHistoryBtn").click(function () {
            var statusValue = $("#statusValue").val();
            if (statusValue == '草稿') {
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/" + applicationUUID;
                var uAll = hostUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if (data.result != null) {//不为空说明已经暂存，可以新增
                            addWorkHistory();
                        } else {
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            } else {
                $.xljUtils.tip("red", "非草稿状态审批单不能新增记录！");
            }
        });
        //新增教育经历
        $("#addEmpEducationBtn").click(function () {
            var statusValue = $("#statusValue").val();
            if (statusValue == '草稿') {
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/" + applicationUUID;
                var uAll = hostUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if (data.result != null) {//不为空说明已经暂存，可以新增
                            addEmpEducation();
                        } else {
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            } else {
                $.xljUtils.tip("red", "非草稿状态审批单不能新增记录！");
            }
        });
        //新增家庭信息
        /*$("#addHomeRelationBtn").click(function(){
         var statusValue = $("#statusValue").val();
         if(statusValue == '草稿'){
         //根据审批ID查询临时表中是否暂存过
         var uBody = "/sys/sysApply/get/"+applicationUUID;
         var uAll = hostUrl + uBody;
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
         });*/
        //新增薪酬变动信息
        /*$("#addHrWageChangeBtn").click(function(){
         var statusValue = $("#statusValue").val();
         if(statusValue == '草稿'){
         //根据审批ID查询临时表中是否暂存过
         var uBody = "/sys/sysApply/get/"+applicationUUID;
         var uAll = hostUrl + uBody+"?time=" + Math.random();
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
         });*/
        //新增补助变动信息
        /*$("#addHrWageSubchangeBtn").click(function(){
         var statusValue = $("#statusValue").val();
         if(statusValue == '草稿'){
         //根据审批ID查询临时表中是否暂存过
         var uBody = "/sys/sysApply/get/"+applicationUUID;
         var uAll = hostUrl + uBody;
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
         });*/

        //修改工作经历
        $("#editorWorkHistoryBtn").click(function () {
            var statusValue = $("#statusValue").val();
            if (statusValue == '草稿') {
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/" + applicationUUID;
                var uAll = hostUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if (data.result != null) {//不为空说明已经暂存，可以新增
                            editorWorkHistory();
                        } else {
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            } else {
                $.xljUtils.tip("red", "非草稿状态审批单不能修改记录！");
            }
        });

        //修改教育经历
        $("#editEmpEducationBtn").click(function () {
            var statusValue = $("#statusValue").val();
            if (statusValue == '草稿') {
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/" + applicationUUID;
                var uAll = hostUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if (data.result != null) {//不为空说明已经暂存，可以新增
                            editEmpEducation();
                        } else {
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            } else {
                $.xljUtils.tip("red", "非草稿状态审批单不能修改记录！");
            }
        });
        //修改家庭信息
        /*$("#editHomeRelationInfoBtn").click(function(){
         var statusValue = $("#statusValue").val();
         if(statusValue == '草稿'){
         //根据审批ID查询临时表中是否暂存过
         var uBody = "/sys/sysApply/get/"+applicationUUID;
         var uAll = hostUrl + uBody;
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
         });*/
        //修改薪酬信息
        /*$("#editorHrWageChangeBtn").click(function(){
         var statusValue = $("#statusValue").val();
         if(statusValue == '草稿'){
         //根据审批ID查询临时表中是否暂存过
         var uBody = "/sys/sysApply/get/"+applicationUUID;
         var uAll = hostUrl + uBody;
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
         });*/
        //修改补助信息
        /*$("#editorHrWageSubchangeBtn").click(function(){
         var statusValue = $("#statusValue").val();
         if(statusValue == '草稿'){
         //根据审批ID查询临时表中是否暂存过
         var uBody = "/sys/sysApply/get/"+applicationUUID;
         var uAll = hostUrl + uBody;
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
         });*/

        //批量删除工作经历
        $("#deleteWorkHistoryBtn").click(function () {
            var statusValue = $("#statusValue").val();
            if (statusValue == '草稿') {

                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/" + applicationUUID;
                var uAll = hostUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if (data.result != null) {//不为空说明已经暂存，可以新增
                            delWorkHistory();
                        } else {
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            } else {
                $.xljUtils.tip("red", "非草稿状态审批单不能删除记录！");
            }
        });
        //批量删除教育经历
        $("#delEmpEducationBtn").click(function () {
            var statusValue = $("#statusValue").val();
            if (statusValue == '草稿') {
                //根据审批ID查询临时表中是否暂存过
                var uBody = "/sys/sysApply/get/" + applicationUUID;
                var uAll = hostUrl + uBody;
                $.ajax({
                    type: 'get',
                    url: uAll,
                    async: false,
                    success: function (data) {
                        if (data.result != null) {//不为空说明已经暂存，可以新增
                            delEmpEducation();
                        } else {
                            $.xljUtils.tip("red", "请先暂存人员基本信息！");
                        }
                    }
                });
            } else {
                $.xljUtils.tip("red", "非草稿状态审批单不能删除记录！");
            }
        });
        //批量删除家庭信息
        /*$("#delHomeRelationInfoBtn").click(function(){
         var statusValue = $("#statusValue").val();
         if(statusValue == '草稿'){
         //根据审批ID查询临时表中是否暂存过
         var uBody = "/sys/sysApply/get/"+applicationUUID;
         var uAll = hostUrl + uBody;
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
         });*/
        //批量删除薪酬信息
        /* $("#delHrWageChangeBtn").click(function(){

         var statusValue = $("#statusValue").val();
         if(statusValue == '草稿'){
         //根据审批ID查询临时表中是否暂存过
         var uBody = "/sys/sysApply/get/"+applicationUUID;
         var uAll = hostUrl + uBody;
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

         });*/
        //批量删除补助信息
        /*$("#delHrWageSubchangeBtn").click(function(){
         var statusValue = $("#statusValue").val();
         if(statusValue == '草稿'){
         //根据审批ID查询临时表中是否暂存过
         var uBody = "/sys/sysApply/get/"+applicationUUID;
         var uAll = hostUrl + uBody;
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
         });*/
        //todo 上传图片
        // $('#upload-button').click(function(){
        //     $('#photoPic').trigger('click');
        //     return false;
        // });
        //todo 发起审批
        $("#applyBtn").click(function () {
            //todo 判定是否填写补助信息和薪酬信息
            // var wageNum = $("#hrWageChangeForm").getGridParam("reccount");
            // var wageSubNum = $("#hrWageSubchangeForm").getGridParam("reccount");
            // if(wageNum == 0 || wageSubNum == 0){
            //     $.xljUtils.tip("red", "请先维护薪酬和补助信息！",3000);
            // }else{
            var statusValue = $("#statusValue").val();
            if (statusValue == '草稿') {
                applyFlag = true;
                saveOrUpdate();
            } else {
                $.xljUtils.tip("red", "非草稿状态审批单不能发起审批！");
            }
            //}
        });
        //todo 保存附件
        $("#savefujianBtn").click(function () {
            var result = $('.attachment-container').xljAttachmentSubmit();
            console.info(result);
            $.xljUtils.tip("blue", "附件上传成功！");
        });
        //双击照片可以实现照片的维护，修改
        $("#preImg").dblclick(function () {
            $('#photoPic').trigger('click');
            return false;
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
            singleUpload: false,
            autoSubmit: false,
            fromTempTable: false,
            serverAddr: ATTACH_SERVERADDR
        });
    }

    //todo 审批单状态发生变动后的回调函数
    window.flowCallBack = function () {
        //发起后重新查询一下
        getSysApplyById(applicationUUID);
    };

    //todo 根据审批单查询审批信息
    function getSysApplyById(applyId) {
        var uBody = "/sys/sysApply/get/" + applyId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var status = data.result.status;
                $("#applicationForm").find("input[name='status']").val(status);
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#applicationForm").find("input[name='statusValue']").val(statusValue);
                if (data.result.approvalDate != '' && data.result.approvalDate != null) {
                    $("#applicationForm").find("input[name='approvalDate']").val(statusValue);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "更新审批单状态失败");
            }
        })
    }

    //todo 所属职能回调函数
    window.functionsCallback = function (data) {
        $("#functions").val(data.id);
        $("#functionsName").val(data.name);
    };

    //todo 部门回调
    window.deptCallback = function (data) {
        $("#deptId_name").val(data.prefixName);
        $("#deptId").val(data.id);
        $("#deptId_name").trigger("blur");//失焦
        // $("#orgId").val(data.parentId);
        var parentId = data.parentId;
        if (data.parentId != '' && data.parentId != undefined) {
            // $("#orgName").val($.hrUtils.getHRPrefixOrgNameById(parentId));
            $.ajax({
                type: 'POST',
                url: hostUrl + "emp/empPersonInfo/queryOrgInfo",
                dataType: 'JSON',
                contentType: 'application/json',
                // async:false,//设置为同步
                data: JSON.stringify({"parentId": parentId}),
                success: function (data) {

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
        var deptId = $('#deptId').val();
        // if(data.prefixId.indexOf(deptId)>-1){
        $("#postName").val(data.name);
        $("#postId").val(data.id);
        $("#postName").trigger("blur");//失焦
        // }else{
        //     var deptIdName=$('#deptId_name').val();
        // pop_tip_open("blue",'只能选择'+deptIdName+"下的岗位");
        // postCallback();
        // }
    };


    window.newFile = function () {
        var windowURL = window.URL || window.webkitURL;
        var loadImg = windowURL.createObjectURL(document.getElementById('photoPic').files[0]);
        document.getElementById('preImg').setAttribute('src', loadImg);
        document.getElementById('preImg').setAttribute('width', 142);
        document.getElementById('preImg').setAttribute('hight', 180);
    };

    /**
     * 获取账号后缀
     */
    function getAccountSuffix() {

        $.ajax({
            type: "GET",
            url: baseUrl + "emp/empPersonInfo/getAccountSuffix",
            dataType: "json",
            async: false,
            success: function (data, textStatus) {

                $("#acountInputTd").append("<span>@" + data.result.accountSuffix + "</span>");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "获取账户后缀失败");
            }
        });
    }

    /**
     * 初始化页面
     */
    function initPersonInfo() {
        //初始化账号后缀
        getAccountSuffix();
        //获取url参数
        oper = $.xljUtils.getUrlParam("oper");
        //暂存页面状态
        var saveFlagStored = localStorage.getItem('saveFlag');
        localStorage.removeItem("saveFlag");
        if (oper == "add") {
            if (saveFlagStored && saveFlagStored == "false") {
                $('title').text("员工入职编辑");
                $(".xj-form-title").text("员工入职编辑");
                saveFlag = false;
                //根据id获取页面信息
                applicationUUID = $.xljUtils.getUrlParam("id");//获取审批单ID
                var applyIdStored = localStorage.getItem('applyId');
                localStorage.removeItem("applyId");
                if (applyIdStored && applyIdStored != '') {
                    applicationUUID = applyIdStored;
                }
                // 根据审批单ID获取页面数据
                getInfoByAppId(applicationUUID);//将异步请求改为同步
                personId = $("#personId").attr("value");//获取人员ID
                //保存窗口
                $("#saveBtn").unbind('click').on('click', function () {
                    //校验账号 手机姓名
                    var account=$('#account').val();
                    var name=$('#name').val();
                    var phone=$('#phone').val();
                    if(!checkAccount(account)&&!checkNamePhone(name,phone)){
                        var idType = $("#idType_name").val();
                        var validateResult = false;
                        if (idType == "身份证") {
                            validateResult = checkIdCardNo($("#idCard").val());
                            if (!validateResult) {
                                pop_tip_open("blue", "身份证未填写或者格式不正确！");
                            } else {
                                saveBtnFlag = true;
                                saveOrUpdate();
                            }
                        } else {
                            saveBtnFlag = true;
                            saveOrUpdate();
                        }
                    }
                });
            } else {
                $('title').text("员工入职新增");
                $(".xj-form-title").text("员工入职新增");
                //todo 初始化审批单
                initSysApply();
                //保存窗口
                $("#saveBtn").unbind('click').on('click', function () {
                    //校验账号 手机姓名
                    var account=$('#account').val();
                    var name=$('#name').val();
                    var phone=$('#phone').val();
                    if(!checkAccount(account)&&!checkNamePhone(name,phone)) {
                        var idType = $("#idType_name").val();
                        var validateResult = false;
                        if (idType == "身份证") {
                            validateResult = checkIdCardNo($("#idCard").val());
                            if (!validateResult) {
                                pop_tip_open("blue", "身份证未填写或者格式不正确！");
                            } else {
                                saveBtnFlag = true;
                                saveOrUpdate();
                            }
                        } else {
                            saveBtnFlag = true;
                            saveOrUpdate();
                        }
                    }
                });
            }
        } else if (oper == "edit") {
            $('title').text("员工入职编辑");
            $(".xj-form-title").text("员工入职编辑");
            saveFlag = false;
            //根据id获取页面信息
            applicationUUID = $.xljUtils.getUrlParam("id");//获取审批单ID
            // 根据审批单ID获取页面数据
            getInfoByAppId(applicationUUID);//将异步请求改为同步
            personId = $("#personId").attr("value");//获取人员ID
            //保存窗口
            $("#saveBtn").unbind('click').on('click', function () {
                //校验账号 手机姓名
                var account=$('#account').val();
                var name=$('#name').val();
                var phone=$('#phone').val();
                if(!checkAccount(account)&&!checkNamePhone(name,phone)) {
                    var idType = $("#idType_name").val();
                    var validateResult = false;
                    if (idType == "身份证") {
                        validateResult = checkIdCardNo($("#idCard").val());
                        if (!validateResult) {
                            pop_tip_open("blue", "身份证未填写或者格式不正确！");
                        } else {
                            saveBtnFlag = true;
                            saveOrUpdate();
                        }
                    } else {
                        saveBtnFlag = true;
                        saveOrUpdate();
                    }
                }
            });
            //聚焦清空，否则输入会追加到*号上
            $("#password").focus(function () {
                $("#password").val('');
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
            var uAll = hostUrl + uBody;
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

        //加载兼职信息列表
        jQuery("#postList").jqGrid(
            {
                url: baseUrl + '/emp/empPersonInfo/queryPostList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                autowidth: true,
                colNames: ['id', '兼职机构', '兼职岗位'],
                colModel: [
                    {
                        name: 'id',
                        label: 'id',
                        editable: true,
                        width: 60,
                        sortable: false,
                        hidden: true,
                        align: "center"
                    },
                    // {name : 'orgName',label : 'orgName',editable:true,width : 60,sortable:false,align : "center"},
                    {
                        name: 'prefixName',
                        label: 'prefixName',
                        editable: true,
                        width: 60,
                        sortable: false,
                        align: "center"
                    },
                    {name: 'postName', label: 'postName', editable: true, width: 60, sortable: false, align: "center"}
                ],
                postData: {"userId": personId},
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                ondblClickRow: function (rowid) {

                },
                onCellSelect: function () {

                },
                onSelectRow: function () {
                    var rowId = $('#postList').jqGrid("getGridParam", "selrow");
                    rowData = $('#postList').jqGrid('getRowData', rowId);
                },
                rowNum: -1,
                loadError: function (xhr, status, error) {
                    //异常处理
                    console.log(xhr.status);
                    if (xhr.status == 404) {
                        // $.xljUtils.tip("red","请求url有误！");
                        return;
                    }
                    if (xhr.status == 405) {
                        $.xljUtils.tip("red", "请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red", "网络异常,请联系管理员！");
                },
                loadComplete: function (xhr) {
                    console.log(xhr);
                    if (!xhr.success) {
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
                                $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                    } else {
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                }
            });

        //加载工作经历列表
        jQuery("#workHistoryList").jqGrid(
            {
                url: baseUrl + '/emp/empWorkHistoryTmp/queryList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                autowidth: true,
                colNames: ['id', '开始时间', '结束时间', '工作单位', '部门', '工作岗位', '证明人', '联系方式'],
                colModel: [
                    {
                        name: 'id',
                        label: 'id',
                        editable: true,
                        width: 60,
                        sortable: false,
                        hidden: true,
                        align: "center"
                    },
                    {
                        name: 'startTime',
                        label: 'startTime',
                        editable: true,
                        width: 60,
                        sortable: false,
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},
                        align: "center"
                    },
                    {
                        name: 'endTime',
                        label: 'endTime',
                        editable: true,
                        width: 60,
                        sortable: false,
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},
                        align: "center"
                    },
                    {name: 'org', label: 'org', editable: true, width: 60, sortable: false, align: "center"},
                    {name: 'dept', label: 'dept', editable: true, width: 60, sortable: false, align: "center"},
                    {name: 'post', label: 'post', editable: true, width: 60, sortable: false, align: "center"},
                    {name: 'witness', label: 'witness', editable: true, width: 60, sortable: false, align: "center"},
                    {
                        name: 'witnessPhone',
                        label: 'witnessPhone',
                        editable: true,
                        width: 60,
                        sortable: false,
                        align: "center"
                    }
                ],
                postData: {"applyId": applicationUUID},
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                ondblClickRow: function (rowid) {
                    var statusValue = $("#statusValue").val();
                    if (statusValue == '草稿') {
                        //根据审批ID查询临时表中是否暂存过
                        var uBody = "/sys/sysApply/get/" + applicationUUID;
                        var uAll = hostUrl + uBody;
                        $.ajax({
                            type: 'get',
                            url: uAll,
                            async: false,
                            success: function (data) {
                                if (data.result != null) {//不为空说明已经暂存，可以新增
                                    editorWorkHistory();
                                } else {
                                    $.xljUtils.tip("red", "请先暂存人员基本信息！");
                                }
                            }
                        });
                    } else {
                        $.xljUtils.tip("red", "非草稿状态审批单不能修改记录！");
                    }
                },
                onCellSelect: function () {

                },
                onSelectRow: function () {
                    var rowId = $('#workHistoryList').jqGrid("getGridParam", "selrow");
                    rowData = $('#workHistoryList').jqGrid('getRowData', rowId);
                },
                rowNum: -1,
                loadError: function (xhr, status, error) {
                    //异常处理
                    console.log(xhr.status);
                    if (xhr.status == 404) {
                        $.xljUtils.tip("red", "请求url有误！");
                        return;
                    }
                    if (xhr.status == 405) {
                        $.xljUtils.tip("red", "请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red", "网络异常,请联系管理员！");
                },
                loadComplete: function (xhr) {
                    console.log(xhr);
                    if (!xhr.success) {
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
                                $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                    } else {
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                }
            });

        //加载教育经历列表
        jQuery("#eduHistoryForm").jqGrid(
            {
                url: baseUrl + 'emp/hrEmpEducationTmp/queryList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                autowidth: true,
                colNames: ['id', '入学时间', '毕业时间', '学校名称', '专业', '学习形式', '学历', '学位', '是否最高学历', '是否最高学位'],
                colModel: [
                    {name: 'id', label: 'id', editable: true, width: 60, sortable: false, hidden: true},
                    {
                        name: 'startTime',
                        label: 'startTime',
                        editable: true,
                        width: 60,
                        sortable: false,
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},
                        align: "center"
                    },
                    {
                        name: 'endTime',
                        label: 'endTime',
                        editable: true,
                        width: 60,
                        sortable: false,
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},
                        align: "center"
                    },
                    {
                        name: 'schooolName',
                        label: 'schooolName',
                        editable: true,
                        width: 60,
                        sortable: false,
                        align: "center"
                    },
                    {name: 'major', label: 'major', editable: true, width: 60, sortable: false, align: "center"},
                    {
                        name: 'studyType',
                        label: 'studyType',
                        editable: true,
                        width: 60,
                        sortable: false,
                        formatter: $.hrUtils.getHRCodeNameById,
                        align: "center"
                    },
                    {
                        name: 'education',
                        label: 'education',
                        editable: true,
                        width: 60,
                        sortable: false,
                        formatter: $.hrUtils.getHRCodeNameById,
                        align: "center"
                    },
                    {
                        name: 'degree',
                        label: 'degree',
                        editable: true,
                        width: 60,
                        sortable: false,
                        formatter: $.hrUtils.getHRCodeNameById,
                        align: "center"
                    },
                    {
                        name: 'isMaxEducation',
                        label: 'isMaxEducation',
                        editable: true,
                        width: 60,
                        sortable: false,
                        formatter: $.hrUtils.getHRCodeNameById,
                        align: "center"
                    },
                    {
                        name: 'isMaxDegree',
                        label: 'isMaxDegree',
                        editable: true,
                        width: 60,
                        sortable: false,
                        formatter: $.hrUtils.getHRCodeNameById,
                        align: "center"
                    },
                ],
                postData: {"applyId": applicationUUID},
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                ondblClickRow: function (rowid) {
//            	window.open(openUrl+"?oper=detail&id="+rowid);
                    //跳转编辑页
                    /* rowData = $('#demoList').jqGrid('getRowData',rowid);
                     window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));*/

                    var statusValue = $("#statusValue").val();
                    if (statusValue == '草稿') {
                        //根据审批ID查询临时表中是否暂存过
                        var uBody = "/sys/sysApply/get/" + applicationUUID;
                        var uAll = hostUrl + uBody;
                        $.ajax({
                            type: 'get',
                            url: uAll,
                            async: false,
                            success: function (data) {
                                if (data.result != null) {//不为空说明已经暂存，可以新增
                                    editEmpEducation();
                                } else {
                                    $.xljUtils.tip("red", "请先暂存人员基本信息！");
                                }
                            }
                        });
                    } else {
                        $.xljUtils.tip("red", "非草稿状态审批单不能修改记录！");
                    }
                },
                onCellSelect: function () {
                    /*if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                     //重新选择行时清除上一次选中行的样式
                     $('#demoList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                     }*/
                },
                onSelectRow: function () {
                    var rowId = $('#eduHistoryForm').jqGrid("getGridParam", "selrow");
                    rowData = $('#eduHistoryForm').jqGrid('getRowData', rowId);
                },
                rowNum: -1,
                loadError: function (xhr, status, error) {
                    //异常处理
                    console.log(xhr.status);
                    if (xhr.status == 404) {
                        $.xljUtils.tip("red", "请求url有误！");
                        return;
                    }
                    if (xhr.status == 405) {
                        $.xljUtils.tip("red", "请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red", "网络异常,请联系管理员！");


                },
                loadComplete: function (xhr) {
                    console.log(xhr);
                    if (!xhr.success) {
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
                                $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                    } else {
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();

                    }
                }
            });

        //加载家庭信息
        /*jQuery("#hrEmpFamilyForm").jqGrid(
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
         /!* rowData = $('#demoList').jqGrid('getRowData',rowid);
         window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));*!/

         var statusValue = $("#statusValue").val();
         if(statusValue == '草稿'){
         //根据审批ID查询临时表中是否暂存过
         var uBody = "/sys/sysApply/get/"+applicationUUID;
         var uAll = hostUrl + uBody;
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
         },
         onCellSelect: function(){
         /!*if(rowDataBefore!=null&&rowDataBefore!='undefined'){
         //重新选择行时清除上一次选中行的样式
         $('#demoList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
         }*!/
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
         });*/

        //加载薪酬列表信息
        /*jQuery("#hrWageChangeForm").jqGrid(
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
         /!* rowData = $('#demoList').jqGrid('getRowData',rowid);
         window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));*!/
         },
         onCellSelect: function(){
         /!*if(rowDataBefore!=null&&rowDataBefore!='undefined'){
         //重新选择行时清除上一次选中行的样式
         $('#demoList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
         }*!/
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
         });*/

        //薪资等级格式化
        function getWageRank(param) {
            var name = $.hrUtils.getHRCodeNameById(param);
            return name == '' ? '其它' : name;
        }

        // 加载补助变动信息列表
        /*jQuery("#hrWageSubchangeForm").jqGrid(
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
         /!* rowData = $('#demoList').jqGrid('getRowData',rowid);
         window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));*!/
         },
         onCellSelect: function(){
         /!*if(rowDataBefore!=null&&rowDataBefore!='undefined'){
         //重新选择行时清除上一次选中行的样式
         $('#demoList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
         }*!/
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
         });*/
    }

    //薪资等级格式化
    function getSubWageRank(param) {
        var name = $.hrUtils.getHRCodeNameById(param);
        return name == '' ? '其它' : name;
    }

    /**
     * 根据审批单编号获取数据
     */
    function getInfoByAppId(appId) {
        $.ajax({
            type: "GET",
            url: baseUrl + "sys/sysApply/get/" + appId,
            dataType: "json",
            async: false,
            success: function (data, textStatus) {
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
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
        $.ajax({
            type: "POST",
            async: false,
            url: baseUrl + "emp/empPersonInfoTmp/queryList",
            contentType: 'application/json',
            data: JSON.stringify({"applyId": appId}),
            dataType: "json",
            success: function (data, textStatus) {
                $("#personId").val(data.result[0].id);//主键
                personUUID = data.result[0].id;//人员ID
                $("#name").val(data.result[0].name);//姓名
                $("#pinyin").val(data.result[0].pinyin);//拼音
                $("#sex").val(data.result[0].sex);//性别
                // $("#age").val(data.result[0].age);//年龄
                $("#sex_name").val($.hrUtils.getHRCodeNameById(data.result[0].sex));//性别
                $("#constellation").val(data.result[0].constellation);//星座
                $("#constellation_name").val($.hrUtils.getHRCodeNameById(data.result[0].constellation));//星座
                var birth = (data.result[0].birth == '' || data.result[0].birth == null) ? '' : changeTimeStyle(data.result[0].birth).Format("yyyy-MM-dd");
                $("#birth").val(birth);
                if (birth != '') {
                    //todo 年龄赋值
                    calAgeOfEmp(birth);//new Date().getYear() - new Date(birth).getYear();
                }
                var entryPartyTime = (data.result[0].entryPartyTime == '' || data.result[0].entryPartyTime == null) ? '' : changeTimeStyle(data.result[0].entryPartyTime).Format("yyyy-MM-dd");
                $("#entryPartyTime").val(entryPartyTime);//入党日期
                $("#nationality").val(data.result[0].nationality);
                var nationalityName = $.hrUtils.getHRCodeNameById(data.result[0].nationality);
                if (nationalityName != '') {
                    $("#nationality_name").val(nationalityName);
                }
                $("#roleIds").val(data.result[0].roleIds);//角色
                var roleIdsName = $.hrUtils.getPtPostNameByIds(data.result[0].roleIds);
                if (roleIdsName != '') {
                    $("#roleIds_name").val(roleIdsName);//角色名称
                }
                $("#probationPeriod").val(data.result[0].probationPeriod);//试用期(月)
                $("#idType").val(data.result[0].idType);//证件类型
                var idTypeName = $.hrUtils.getHRCodeNameById(data.result[0].idType);
                if (idTypeName != '') {
                    $("#idType_name").val(idTypeName);
                }
                $("#idCard").val(data.result[0].idCard);
                $("#orgId").val(data.result[0].orgId);
                var orgName = $.hrUtils.getHRPrefixOrgNameById(data.result[0].orgId);
                if (orgName != '') {
                    $("#orgName").val(orgName);
                }
                $("#postId").val(data.result[0].postId);
                $("#postName").val(data.result[0].postName);
                // $("#postName").val($.hrUtils.getPtPostNameById(data.result[0].postId));//postName对应的标准岗位信息肯能还为存在，所以，回显用的时
                $("#headshipRank").val(data.result[0].headshipRank);
                $("#headshipRank_name").val($.hrUtils.getHRCodeNameById(data.result[0].headshipRank));
                $("#account").val(data.result[0].account);//账户不允许修改
                // $("#account").attr("readonly", "readonly");
                $("#password").val("******");//密码，值为******，修改时设为只读，不可修改
                // $("#password").attr("readonly", "readonly");
                $("#maxEducation").val(data.result[0].maxEducation);
                var maxEducationName = $.hrUtils.getHRCodeNameById(data.result[0].maxEducation);
                if (maxEducationName != '') {
                    $("#maxEducation_name").val(maxEducationName);
                }
                $("#maxDegree").val(data.result[0].maxDegree);
                var maxDegreeName = $.hrUtils.getHRCodeNameById(data.result[0].maxDegree);
                if (maxDegreeName != '') {
                    $("#maxDegree_name").val(maxDegreeName);
                }
                $("#partyFigure").val(data.result[0].partyFigure);
                var partyFigureName = $.hrUtils.getHRCodeNameById(data.result[0].partyFigure);
                if (partyFigureName != '') {
                    $("#partyFigure_name").val(partyFigureName);
                }
                $("#folk").val(data.result[0].folk);
                var folkName = $.hrUtils.getHRCodeNameById(data.result[0].folk);
                if (folkName != '') {
                    $("#folk_name").val(folkName);
                }
                if (data.result[0].workTime != '' && data.result[0].workTime != undefined) {
                    var workTime = (data.result[0].workTime == null || data.result[0].workTime == '') ? '' : changeTimeStyle(data.result[0].workTime).Format("yyyy-MM-dd");
                    $("#workTime").val(workTime);
                }
                if (data.result[0].workTime != '' && data.result[0].workTime != undefined) {
                    var UToTime = $("#workTime").val();
                    var aDate = UToTime.split("-");
                    var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
                    var myDate = new Date();
                    var dif = myDate.getTime() - NewDate.getTime();
                    myDate.setTime(dif);
                    $("#workAge").val(myDate.getFullYear() - 1970);//计算工龄
                } else {
                    $("#workAge").val(0);//计算工龄
                }
                if (data.result[0].entryTime != null) {//入职日期
                    var entryTime = (data.result[0].entryTime == null || data.result[0].entryTime == null) ? '' : changeTimeStyle(data.result[0].entryTime).Format("yyyy-MM-dd");
                    $("#entryTime").val(entryTime);
                    //todo 司龄赋值
                    var seniorit = calSeniorit(entryTime);
                    $("#seniorit").val(seniorit);
                }
                if (data.result[0].firstBeginTime != null) {//首次合同开始时间
                    var firstBeginTime = (data.result[0].firstBeginTime == null || data.result[0].firstBeginTime == null) ? '' : changeTimeStyle(data.result[0].firstBeginTime).Format("yyyy-MM-dd");
                    $("#firstBeginTime").val(firstBeginTime);
                }
                if (data.result[0].firstEndTime != null) {//首次合同结束时间
                    var firstEndTime = (data.result[0].firstEndTime == null || data.result[0].firstEndTime == null) ? '' : changeTimeStyle(data.result[0].firstEndTime).Format("yyyy-MM-dd");
                    $("#firstEndTime").val(firstEndTime);
                }
                if (data.result[0].nowBeginTime != null) {//现合同开始时间
                    var nowBeginTime = (data.result[0].nowBeginTime == null || data.result[0].nowBeginTime == null) ? '' : changeTimeStyle(data.result[0].nowBeginTime).Format("yyyy-MM-dd");
                    $("#nowBeginTime").val(nowBeginTime);
                }
                if (data.result[0].nowEndTime != null) {//现合同结束时间
                    var nowEndTime = (data.result[0].nowEndTime == null || data.result[0].nowEndTime == null) ? '' : changeTimeStyle(data.result[0].nowEndTime).Format("yyyy-MM-dd");
                    $("#nowEndTime").val(nowEndTime);
                }
                $("#renewalTimes").val(data.result[0].renewalTimes);//续签次数
                $("#bankUserName").val(data.result[0].bankUserName);//开户名
                $("#bankAccount").val(data.result[0].bankAccount);//银行账户
                $("#bankName").val(data.result[0].bankName);//开户行
                $("#bankProvince").val(data.result[0].bankProvince);//银行所在省
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
                $("#sort").val(data.result[0].sort);
                $("#email").val(data.result[0].email);
                $("#marry").val(data.result[0].marry);
                $("#marry_name").val($.hrUtils.getHRCodeNameById(data.result[0].marry));
                $("#deptId").val(data.result[0].deptId);
                $("#deptId_name").val($.hrUtils.getHRPrefixOrgNameById(data.result[0].deptId));
                // $("#postType").val(data.result[0].postType);
                // $("#postType_name").val($.hrUtils.getHRCodeNameById(data.result[0].postType));
                var graduateDate = (data.result[0].graduateDate == null || data.result[0].graduateDate == null) ? '' : changeTimeStyle(data.result[0].graduateDate).Format("yyyy-MM-dd");
                $("#graduateDate").val(graduateDate);
                $("#bloodType").val(data.result[0].bloodType);
                $("#bloodType_name").val($.hrUtils.getHRCodeNameById(data.result[0].bloodType));
                // $("#outlander").val(data.result[0].outlander);
                // $("#outlander_name").val($.hrUtils.getHRCodeNameById(data.result[0].outlander));
                $("#health").val(data.result[0].health);
                $("#health_name").val($.hrUtils.getHRCodeNameById(data.result[0].health));
                $("#phone").val(data.result[0].phone);//手机
                $("#personType").val(data.result[0].personType);
                $("#personType_name").val($.hrUtils.getHRCodeNameById(data.result[0].personType));
                $("#recruitCannelId").val(data.result[0].recruitCannelId);
                $("#recruitCannelId_name").val($.hrUtils.getHRCodeNameById(data.result[0].recruitCannelId));
                $("#personCode").val(data.result[0].personCode);
                // if(data.result[0].retireDate != null){
                //     var retireDate = (data.result[0].retireDate == '' || data.result[0].retireDate == null)?'':changeTimeStyle(data.result[0].retireDate).Format("yyyy-MM-dd");
                //     $("#retireDate").val(retireDate);//退休时间
                // }
                if (data.result[0].holdHeadshipTime != null) {
                    var holdHeadshipTime = (data.result[0].holdHeadshipTime == '' || data.result[0].holdHeadshipTime == null) ? '' : changeTimeStyle(data.result[0].holdHeadshipTime).Format("yyyy-MM-dd");
                    $("#holdHeadshipTime").val(holdHeadshipTime);
                }
                if (data.result[0].regularTime != null) {
                    var regularTime = (data.result[0].regularTime == '' || data.result[0].regularTime == null) ? '' : changeTimeStyle(data.result[0].regularTime).Format("yyyy-MM-dd");
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
                if (data.result[0].entryOrgTime != null) {
                    var entryOrgTime = (data.result[0].entryOrgTime == '' || data.result[0].entryOrgTime == null) ? '' : changeTimeStyle(data.result[0].entryOrgTime).Format("yyyy-MM-dd");
                    $("#entryOrgTime").val(entryOrgTime);
                }
                $("#remark").val(data.result[0].remark);
                $("#nowPlace").val(data.result[0].nowPlace);//现住址
                if (data.result[0].photo != '' && data.result[0].photo != undefined) {
                    $("#preImg").attr("src", "data:image/jpeg;base64," + data.result[0].photo);
                    $("#preImg").attr("height", 180);
                    $("#preImg").attr("width", 142);
                } else {
                    $("#preImg").attr("src", "/platform-app/common/img/defaultPic.png");
                }
                $("#nativePlace").val(data.result[0].nativePlace);//籍贯
                $("#archivePlace").val(data.result[0].archivePlace);//档案所在地
                //todo 新增字段
                $("#siPayArea").val(data.result[0].siPayArea);//公积金缴纳地
                var siPayArea_name = (data.result[0].siPayArea == '' || data.result[0].siPayArea == null) ? '' : $.hrUtils.getHRCodeNameById(data.result[0].siPayArea);
                $("#siPayArea_name").val(siPayArea_name);

                $("#postLevel").val(data.result[0].postLevel);//岗位层级
                var postLevel_name = (data.result[0].postLevel == '' || data.result[0].postLevel == null) ? '' : $.hrUtils.getHRCodeNameById(data.result[0].postLevel);
                $("#postLevel_name").val(postLevel_name);

                $("#compileType").val(data.result[0].compileType);//编制属性
                var compileType_name = (data.result[0].compileType == '' || data.result[0].compileType == null) ? '' : $.hrUtils.getHRCodeNameById(data.result[0].compileType);
                $("#compileType_name").val(compileType_name);
                $("#firstEducation").val(data.result[0].firstEducation);//第一学历
                var firstEducation_name = (data.result[0].firstEducation == '' || data.result[0].firstEducation == null) ? '' : $.hrUtils.getHRCodeNameById(data.result[0].firstEducation);
                $("#firstEducation_name").val(firstEducation_name);
                $("#firstDegree").val(data.result[0].firstDegree);//第一学位
                var firstDegree_name = (data.result[0].firstDegree == '' || data.result[0].firstDegree == null) ? '' : $.hrUtils.getHRCodeNameById(data.result[0].firstDegree);
                $("#firstDegree_name").val(firstDegree_name);
                $("#functions").val(data.result[0].functions);
                var functionsName = (data.result[0].functions == "" || data.result[0].functions == undefined) ? "" : $.hrUtils.getHROrgNameById(data.result[0].functions);
                $("#functionsName").val(functionsName);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });

    }

    function getRank(code) {
        if (code == '' || code == undefined) {
            return '';
        } else if (code == '其它') {
            return '其它';
        } else {
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
    window.submitAddForm = function () {

        var param = {};
        var empPersonInfoTmpDto = {};
        var sysApplyDto = {};
        //申请单信息
        sysApplyDto.id = applicationUUID;
        sysApplyDto.delflag = 0;
        sysApplyDto.name = $("input[name='topic']").val();//主题
        sysApplyDto.code = $("#code").val();//审批编号
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
        if (applyDate != '') {
            sysApplyDto.applyDate = applyDate + " 00:00:00";
        }
        sysApplyDto.type = '1068100133';
        sysApplyDto.status = $("input[name='status']").val();//审批状态
        if ($("input[name='approvalDate']").val() != '') {
            sysApplyDto.approvalDate = $("input[name='approvalDate']").val();
        }

        //初始化UUID
        $.ajax({
            type: "GET",
            url: baseUrl + "/generator/getGuuid" + '?time=' + Math.random(),
            dataType: "json",
            async: false,
            success: function (resultValue, textStatus) {
                personUUID = resultValue.result;

                //获取工号
                // empPersonInfoTmpDto.personCode = $.hrUtils.getApplyCodeByType('personCode').substring(1);

                //员工信息
                empPersonInfoTmpDto.id = personUUID;
                empPersonInfoTmpDto.delflag = 0;
                empPersonInfoTmpDto.applyId = applicationUUID;//审批单ID
                empPersonInfoTmpDto.name = $("#name").val();//姓名
                empPersonInfoTmpDto.sex = $("#sex").val();//性别
                empPersonInfoTmpDto.age = $("#age").val();//年龄
                if ($("#birth").val() != '') {
                    empPersonInfoTmpDto.birth = new Date($("#birth").val()).Format("yyyy-MM-dd hh:mm:ss");//出生日期
                }
                empPersonInfoTmpDto.nationality = $("#nationality").val();//国籍
                if ($("#nationality").val() == "1066100104") {
                    empPersonInfoTmpDto.outlander = '1009100037';//是否外籍(否)
                } else {
                    empPersonInfoTmpDto.outlander = '1009100036';//是否外籍（是）
                }
                empPersonInfoTmpDto.idType = $("#idType").val();//证件类型
                empPersonInfoTmpDto.idCard = $("#idCard").val();//证件号
                empPersonInfoTmpDto.orgId = $("#orgId").val();//机构ID
                empPersonInfoTmpDto.postId = $("#postId").val();//岗位ID
                empPersonInfoTmpDto.postName = $("#postName").val();//岗位名称
                empPersonInfoTmpDto.headshipRank = $("#headshipRank").val();//职级

                empPersonInfoTmpDto.maxEducation = $("#maxEducation").val();//最高学历
                empPersonInfoTmpDto.maxDegree = $("#maxDegree").val();//最高学位getApplyCodeByType
                empPersonInfoTmpDto.partyFigure = $("#partyFigure").val();//政治面貌
                empPersonInfoTmpDto.folk = $("#folk").val();//民族
                if ($("#workTime").val() != '') {
                    empPersonInfoTmpDto.workTime = new Date($("#workTime").val()).Format("yyyy-MM-dd hh:mm:ss");//参加工作时间
                }
                if ($("#entryTime").val() != '') {
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
                // empPersonInfoTmpDto.personCode = $("#personCode").val();//员工编号
                // if($("#graduateDate").val() != ''){
                //     empPersonInfoTmpDto.graduateDate = new Date($("#graduateDate").val()).Format("yyyy-MM-dd hh:mm:ss");//毕业时间
                // }

                empPersonInfoTmpDto.bloodType = $("#bloodType").val();//血型
                // if($("#retireDate").val() != ""){
                //     empPersonInfoTmpDto.retireDate = new Date($("#retireDate").val()).Format("yyyy-MM-dd hh:mm:ss");//退休时间
                // }
                empPersonInfoTmpDto.remark = $("#remark").val();//备注
                empPersonInfoTmpDto.health = $("#health").val();//健康状况
                empPersonInfoTmpDto.phone = $("#phone").val();//手机号
                empPersonInfoTmpDto.deptId = $("#deptId").val();//所在部门
                // if($("#holdHeadshipTime").val() != ''){
                //     empPersonInfoTmpDto.holdHeadshipTime = new Date($("#holdHeadshipTime").val()).Format("yyyy-MM-dd hh:mm:ss");//任职时间
                // }
                empPersonInfoTmpDto.personType = $("#personType").val();//人员类别
                // if($("#entryOrgTime").val() !=''){
                //     empPersonInfoTmpDto.entryOrgTime = new Date($("#entryOrgTime").val()).Format("yyyy-MM-dd hh:mm:ss");//进入本公司时间
                // }
                empPersonInfoTmpDto.recruitCannelId = $("#recruitCannelId").val();//招聘渠道
                if ($("#regularTime").val() != '') {
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
                //人员表新增字段
                empPersonInfoTmpDto.constellation = $("#constellation").val();//星座
                if ($("#entryPartyTime").val() != '') {
                    empPersonInfoTmpDto.entryPartyTime = new Date($("#entryPartyTime").val()).Format("yyyy-MM-dd hh:mm:ss");//入党日期
                }
                empPersonInfoTmpDto.account = $("#account").val();//帐号
                empPersonInfoTmpDto.password = $("#password").val();//密码
                empPersonInfoTmpDto.roleIds = $("#roleIds").val();//角色
                empPersonInfoTmpDto.probationPeriod = $("#probationPeriod").val();//试用期（月）
                empPersonInfoTmpDto.seniorit = $("#seniorit").val();//司龄
                if ($("#firstBeginTime").val() != '') {
                    empPersonInfoTmpDto.firstBeginTime = new Date($("#firstBeginTime").val()).Format("yyyy-MM-dd hh:mm:ss");//首次合同开始时间
                }
                if ($("#firstEndTime").val() != '') {
                    empPersonInfoTmpDto.firstEndTime = new Date($("#firstEndTime").val()).Format("yyyy-MM-dd hh:mm:ss");//首次合同结束时间
                }
                if ($("#nowBeginTime").val() != '') {
                    empPersonInfoTmpDto.nowBeginTime = new Date($("#nowBeginTime").val()).Format("yyyy-MM-dd hh:mm:ss");//现合同开始时间
                }
                if ($("#nowEndTime").val() != '') {
                    empPersonInfoTmpDto.nowEndTime = new Date($("#nowEndTime").val()).Format("yyyy-MM-dd hh:mm:ss");//现合同结束时间
                }
                empPersonInfoTmpDto.renewalTimes = $("#renewalTimes").val();//续签次数
                empPersonInfoTmpDto.bankUserName = $("#bankUserName").val();//开户名
                empPersonInfoTmpDto.bankAccount = $("#bankAccount").val();//银行账户
                empPersonInfoTmpDto.bankName = $("#bankName").val();//开户行
                empPersonInfoTmpDto.bankProvince = $("#bankProvince").val();//银行所在省
                empPersonInfoTmpDto.pinyin = $("#pinyin").val();//拼音
                empPersonInfoTmpDto.sort = $("#sort").val();//排序
                empPersonInfoTmpDto.enabledState = "1";//禁用、启用。在此默认为启用（1）
                //职称 positionalTitles 页面上暂时没有用到这个字段
                //禁用、启用 enabledState 页面上暂时没有用到这个字段
                //禁用时间 disabledtime 页面上暂时没有用到这个字段，只有状态为禁用的时候才会用到

                param.empPersonInfoTmpDto = empPersonInfoTmpDto;
                param.sysApplyDto = sysApplyDto;
                var formData = new FormData();
                formData.append("empPersonInfoTmpDto", JSON.stringify(empPersonInfoTmpDto));
                formData.append("sysApplyDto", JSON.stringify(sysApplyDto));
                //todo 员工照片为非必填项
                if ($("#photoPic")[0].files[0] != undefined) {
                    formData.append("photo", $("#photoPic")[0].files[0]);
                }
                //根据saveBtn标志位判定是否发起审批
                var requestUrl = '';
                //todo 获取审批开关,下面回调里面也需要，所以写在外面
                //1:需要审批 0不经过审批流
                var applicationFlag = $.hrUtils.getHRSysParamByKey("PER_APP_SETTING");
                // if (saveBtnFlag == true) {
                //     saveBtnFlag = false;
                    if (applyFlag) {
                        requestUrl = baseUrl + 'emp/empPersonInfoTmp/saveApply/0' + applicationFlag;
                    } else {
                        requestUrl = baseUrl + 'emp/empPersonInfoTmp/saveApply/0' + 1;
                    }
                // } else {
                //     requestUrl = baseUrl + 'emp/empPersonInfoTmp/saveApply/0' + applicationFlag;
                // }

                $.ajax({
                    type: 'POST',
                    url: requestUrl,
                    data: formData,
                    dataType: "json",
                    async: false,
                    processData: false,
                    contentType: false,
                    success: function (xhr) {
                        console.info(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                saveFlag = false;
                                //暂存成功后，将账号和密码设为只读，不能够再次修改
                                // $("#account").attr("readonly", "readonly");
                                // $("#password").attr("readonly", "readonly");
                                //todo  将审批单ID传给回调ID
                                callBackId = applicationUUID;
                                if (applyFlag) {
                                    applyFlag = false;
                                    if (saveBtnFlag == false) {//点击“发起审批”成功
                                        if (applicationFlag == 1) {
                                            toApplyByFlCode(FLCODE_RYRZ, applicationUUID);
                                        } else {
                                            //todo 将审批状态更该为“已审批”
                                            $("#status").val("1067100108");
                                            $("#statusValue").val("已审批");
                                            //todo 审批日期更改为当前日期
                                            $("#approvalDate").val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
                                            $.xljUtils.tip("blue", "审批成功");
                                            //需求 在没有启动审批流的前提下，入职页面，点击发起审批，应该自动跳转到组织人事页面
                                            //延迟3秒再跳转
                                            setTimeout(function(){
                                                window.location.href = '../org/org_list.html';
                                            },3000);

                                        }
                                    }
                                } else {
                                    //重新加载信息
                                    getInfoByAppId(applicationUUID);
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
                                        // $.xljUtils.tip("red", "服务异常,请联系管理员！");
                                        $.xljUtils.tip("red", xhr.msg);
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
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });

    };

    /**
     * 修改信息
     */
    window.submitEditForm = function () {
        var param = {};
        var empPersonInfoTmpDto = {};
        var sysApplyDto = {};
        //申请单信息
        sysApplyDto.id = applicationUUID;
        sysApplyDto.delflag = 0;
        sysApplyDto.name = $("input[name='topic']").val();//主题
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
        if (applyDate != '') {
            sysApplyDto.applyDate = applyDate + " 00:00:00";
        }
        sysApplyDto.type = '1068100133';//机构编制申请
        sysApplyDto.status = $("input[name='status']").val();//审批状态
        if ($("input[name='approvalDate']").val() != '') {
            sysApplyDto.approvalDate = $("input[name='approvalDate']").val();
        }

        //员工信息
        empPersonInfoTmpDto.id = personUUID;
        empPersonInfoTmpDto.delflag = 0;
        empPersonInfoTmpDto.applyId = applicationUUID;//审批单ID
        empPersonInfoTmpDto.name = $("#name").val();//姓名
        empPersonInfoTmpDto.sex = $("#sex").val();//性别
        empPersonInfoTmpDto.age = $("#age").val();//性别
        if ($("#birth").val() != '') {
            empPersonInfoTmpDto.birth = new Date($("#birth").val()).Format("yyyy-MM-dd hh:mm:ss");//出生日期
        }else{//无值则为空
            empPersonInfoTmpDto.birth=null;
        }
        empPersonInfoTmpDto.nationality = $("#nationality").val();//国籍
        if ($("#nationality").val() == "1066100104") {
            empPersonInfoTmpDto.outlander = '1009100037';//是否外籍(否)
        } else {
            empPersonInfoTmpDto.outlander = '1009100036';//是否外籍（是）
        }
        empPersonInfoTmpDto.idType = $("#idType").val();//证件类型
        empPersonInfoTmpDto.idCard = $("#idCard").val();//证件号
        empPersonInfoTmpDto.orgId = $("#orgId").val();//机构ID
        empPersonInfoTmpDto.postId = $("#postId").val();//岗位ID
        empPersonInfoTmpDto.postName = $("#postName").val();//岗位名称
        empPersonInfoTmpDto.headshipRank = $("#headshipRank").val();//职级

        empPersonInfoTmpDto.maxEducation = $("#maxEducation").val();//最高学历
        empPersonInfoTmpDto.maxDegree = $("#maxDegree").val();//最高学位
        empPersonInfoTmpDto.partyFigure = $("#partyFigure").val();//政治面貌
        empPersonInfoTmpDto.folk = $("#folk").val();//民族
        if ($("#workTime").val() != '') {
            empPersonInfoTmpDto.workTime = new Date($("#workTime").val()).Format("yyyy-MM-dd hh:mm:ss");//参加工作时间
        }
        if ($("#entryTime").val() != '') {
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
        // if($("#graduateDate").val() != ''){
        //     empPersonInfoTmpDto.graduateDate = new Date($("#graduateDate").val()).Format("yyyy-MM-dd hh:mm:ss");//毕业时间
        // }
        empPersonInfoTmpDto.bloodType = $("#bloodType").val();//血型
        // if($("#retireDate").val() != ""){
        //     empPersonInfoTmpDto.retireDate = new Date($("#retireDate").val()).Format("yyyy-MM-dd hh:mm:ss");//退休时间
        // }
        empPersonInfoTmpDto.remark = $("#remark").val();//备注
        empPersonInfoTmpDto.health = $("#health").val();//健康状况
        empPersonInfoTmpDto.phone = $("#phone").val();//手机号
        empPersonInfoTmpDto.deptId = $("#deptId").val();//所在部门
        // if($("#holdHeadshipTime").val() != ''){
        //     empPersonInfoTmpDto.holdHeadshipTime = new Date($("#holdHeadshipTime").val()).Format("yyyy-MM-dd hh:mm:ss");//任职时间
        // }
        empPersonInfoTmpDto.personType = $("#personType").val();//人员类别
        // if($("#entryOrgTime").val() != ''){
        //     empPersonInfoTmpDto.entryOrgTime = new Date($("#entryOrgTime").val()).Format("yyyy-MM-dd hh:mm:ss");//进入本公司时间
        // }
        empPersonInfoTmpDto.recruitCannelId = $("#recruitCannelId").val();//招聘渠道
        if ($("#regularTime").val() != '') {
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
        //人员表新增字段
        empPersonInfoTmpDto.constellation = $("#constellation").val();//星座
        if ($("#entryPartyTime").val() != '') {
            empPersonInfoTmpDto.entryPartyTime = new Date($("#entryPartyTime").val()).Format("yyyy-MM-dd hh:mm:ss");//入党日期
        }
        empPersonInfoTmpDto.account = $("#account").val();//帐号不允许修改
        if($("#password").val() != '******'){
            empPersonInfoTmpDto.password = $("#password").val();//密码不可修改
        }
        empPersonInfoTmpDto.roleIds = $("#roleIds").val();//角色
        empPersonInfoTmpDto.probationPeriod = $("#probationPeriod").val()//试用期（月）
        empPersonInfoTmpDto.seniorit = $("#seniorit").val();//司龄
        if ($("#firstBeginTime").val() != '') {
            empPersonInfoTmpDto.firstBeginTime = new Date($("#firstBeginTime").val()).Format("yyyy-MM-dd hh:mm:ss");//首次合同开始时间
        }
        if ($("#firstEndTime").val() != '') {
            empPersonInfoTmpDto.firstEndTime = new Date($("#firstEndTime").val()).Format("yyyy-MM-dd hh:mm:ss");//首次合同结束时间
        }
        if ($("#nowBeginTime").val() != '') {
            empPersonInfoTmpDto.nowBeginTime = new Date($("#nowBeginTime").val()).Format("yyyy-MM-dd hh:mm:ss");//现合同开始时间
        }
        if ($("#nowEndTime").val() != '') {
            empPersonInfoTmpDto.nowEndTime = new Date($("#nowEndTime").val()).Format("yyyy-MM-dd hh:mm:ss");//现合同结束时间
        }
        empPersonInfoTmpDto.renewalTimes = $("#renewalTimes").val();//续签次数
        empPersonInfoTmpDto.bankUserName = $("#bankUserName").val();//开户名
        empPersonInfoTmpDto.bankAccount = $("#bankAccount").val();//银行账户
        empPersonInfoTmpDto.bankName = $("#bankName").val();//开户行
        empPersonInfoTmpDto.bankProvince = $("#bankProvince").val();//银行所在省
        empPersonInfoTmpDto.pinyin = $("#pinyin").val();//拼音
        empPersonInfoTmpDto.sort = $("#sort").val();//排序
        empPersonInfoTmpDto.enabledState = "1"//禁用、启用。在此默认为启用（1）
        //职称 positionalTitles 页面上暂时没有用到这个字段
        //禁用时间 disabledtime 页面上暂时没有用到这个字段，只有当状态为禁用的时候才会用到这个字段

        var formData = new FormData();
        formData.append("empPersonInfoTmpDto", JSON.stringify(empPersonInfoTmpDto));
        formData.append("sysApplyDto", JSON.stringify(sysApplyDto));
        console.info("图片参数");
        console.info($("#photoPic")[0]);
        console.info($("#photoPic")[0].files[0]);
        if ($("#photoPic")[0].files[0] != null && $("#photoPic")[0].files[0] != undefined) {
            formData.append("photo", $("#photoPic")[0].files[0]);
        }
        var updateUrl = '';
        //todo 获取审批开关,下面回调里面也需要，所以写在外面
        var applicationFlag = $.hrUtils.getHRSysParamByKey("PER_APP_SETTING");
        if (saveBtnFlag == true) {
            saveBtnFlag = false;
            updateUrl = baseUrl + 'emp/empPersonInfoTmp/updateApply/' + sysApplyDto.id + "/" + empPersonInfoTmpDto.id + "/0" + 1;
        } else {
            updateUrl = baseUrl + 'emp/empPersonInfoTmp/updateApply/' + sysApplyDto.id + "/" + empPersonInfoTmpDto.id + "/0" + applicationFlag;
        }

        $.ajax({
            type: 'POST',
            url: updateUrl,
            processData: false,
            contentType: false,
            data: formData,
            dataType: "json",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        //todo  将审批单ID传给回调ID
                        callBackId = applicationUUID;
                        if (applyFlag) {
                            applyFlag = false;
                            //todo 获取审批开关
                            var applicationFlag = $.hrUtils.getHRSysParamByKey("PER_APP_SETTING");
                            if (applicationFlag == 1) {
                                toApplyByFlCode(FLCODE_RYRZ, applicationUUID);
                            } else {
                                //todo 将审批状态更该为“已审批”
                                $("#status").val("1067100108");
                                $("#statusValue").val("已审批");
                                //todo 审批日期更改为当前日期
                                $("#approvalDate").val(new Date().Format("yyyy-MM-dd hh:mm:ss"));
                                $.xljUtils.tip("green", "审批成功");
                                //需求 在没有启动审批流的前提下，入职页面，点击发起审批，应该自动跳转到组织人事页面
                                //延迟3秒再跳转
                                setTimeout(function(){
                                    window.location.href = '../org/org_list.html';
                                },3000);
                            }
                        } else {
                            //重新加载信息
                            getInfoByAppId(applicationUUID);
                            $.xljUtils.tip("green", "修改成功");
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
                    $.xljUtils.tip("red", xhr.msg);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", xhr.msg);
            }
        });
    };

    $("#addPostBtn").click(function () {
        $('#addPost').trigger('click');
        return false;
    });

    /**
     * 新增兼职信息
     * 后台转化为平台的userId进行新增
     * @param data
     */
    function addPost(data) {
        var empPersonId;
        if (personUUID != '') {
            empPersonId = personUUID;
        } else {
            empPersonId = personId;
        }
        $.ajax({
            url: baseUrl + "emp/empPersonInfo/addPartTimeJonInfo",
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify({"personId": empPersonId, "id": data.id}),
            success: function (data, textStatus) {
                //刷新兼职列表
                personId = empPersonId;
                $('#postList').setGridParam({"postData": {"userId": empPersonId}}).trigger("reloadGrid");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "新增兼职失败");
            }
        });
    }

    //添加兼职信息
    window.partTimeJobCallback = function (selectData) {
        var statusValue = $("#statusValue").val();
        if (statusValue == '草稿') {
            //根据审批ID查询临时表中是否暂存过
            var uBody = "/sys/sysApply/get/" + applicationUUID;
            var uAll = hostUrl + uBody;
            $.ajax({
                type: 'get',
                url: uAll,
                async: false,
                success: function (data) {
                    if (data.result != null) {//不为空说明已经暂存，可以新增
                        addPost(selectData);
                    } else {
                        $.xljUtils.tip("red", "请先暂存人员基本信息！");
                    }
                }
            });
        } else {
            $.xljUtils.tip("red", "非草稿状态审批单不能新增记录！");
        }
    };

    $("#deletePostBtn").click(function () {
        delPostUser();
    });

    /**
     * 删除兼职信息
     */
    function delPostUser() {
        var idsVal = $('#postList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: baseUrl + "emp/empPersonInfo/delPostUserInfo",
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({"id": idsVal.join(",")}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype = 'json';
                                    queryData.page = $('#postList').getGridParam('page') - 1;
                                    queryData.rowNum = $('#postList').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function () {
                                    if (focusId != null && focusId != "") {
                                        $("#workHistoryForm").setSelection(focusId);
                                    } else if (focusId == null || focusId == "") {
                                        $("#workHistoryForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId = "";
                                }
                                $('#postList').setGridParam({"postData": queryData}).trigger("reloadGrid");
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
     * 新增工作经历
     */
    function addWorkHistory() {
        //暂存页面状态,审批单Id
        localStorage.setItem('saveFlag', saveBtnFlag);
        localStorage.setItem('applyId', applicationUUID);
        //todo 将工作经历临时表与申请单ID绑定
        window.location.href = "emp_workHistoy_tmp.html?oper=add&applyId=" + applicationUUID;
        /*var winObjEI = window.open("emp_workHistoy_tmp.html?oper=add&applyId="+applicationUUID);
         var isClose = 1;
         //关闭open页面时刷新父页面列表
         var loop = setInterval(function () {
         if (winObjEI && winObjEI.closed && isClose == 1) {

         isClose--;
         $("#workHistoryList").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
         }
         }, 1000);*/
    }

    /**
     * 修改工作信息
     */
    function editorWorkHistory() {
        //todo 修改工作经历是依据中间表的主键 注意与新增情况的不同
        var idsVal = $('#workHistoryList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                //暂存页面状态,审批单Id
                localStorage.setItem('saveFlag', saveBtnFlag);
                localStorage.setItem('applyId', applicationUUID);
                var rowId = $('#workHistoryList').jqGrid("getGridParam", "selrow");
                var rowData = $('#workHistoryList').jqGrid('getRowData', rowId);
                var personId = $("#personId").attr("value");
                window.location.href = "emp_workHistoy_tmp.html?oper=edit&id=" + rowData.id;
                /*var winObjEI = window.open("emp_workHistoy_tmp.html?oper=edit&id="+rowData.id);
                 var isClose = 1;
                 //关闭open页面时刷新父页面列表
                 var loop = setInterval(function () {
                 if (winObjEI.closed && isClose == 1) {
                 isClose--;
                 $('#workHistoryList').jqGrid().trigger("reloadGrid");
                 }
                 }, 1000);*/
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }

    /**
     * 批量删除工作经历
     * @param personId
     */
    function delWorkHistory() {
        var idsVal = $('#workHistoryList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: baseUrl + "emp/empWorkHistoryTmp/deleteBatch/" + idsVal,
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
    function reloadEmpInfo() {
        $.ajax({
            type: "POST",
            url: baseUrl + "emp/empPersonInfoTmp/queryList",
            contentType: 'application/json',
            data: JSON.stringify({"applyId": applicationUUID}),
            dataType: "json",
            success: function (data, textStatus) {

                //最高学历
                $("#maxEducation").val(data.result[0].maxEducation);
                var maxEducationName = (data.result[0].maxEducation == '' || data.result[0].maxEducation == undefined) ? '' : $.hrUtils.getHRCodeNameById(data.result[0].maxEducation);
                $("#maxEducation_name").val(maxEducationName);
                //最高学位
                $("#maxDegree").val(data.result[0].maxDegree);
                var maxDegreeName = (data.result[0].maxDegree == '' || data.result[0].maxDegree == undefined) ? '' : $.hrUtils.getHRCodeNameById(data.result[0].maxDegree);
                $("#maxDegree_name").val(maxDegreeName);
                //第一学历
                $("#firstEducation").val(data.result[0].firstEducation);
                var firstEducation_name = (data.result[0].firstEducation == '' || data.result[0].firstEducation == undefined) ? '' : $.hrUtils.getHRCodeNameById(data.result[0].firstEducation);
                $("#firstEducation_name").val(firstEducation_name);
                //第一学位
                $("#firstDegree").val(data.result[0].firstDegree);
                var firstDegree_name = (data.result[0].firstDegree == '' || data.result[0].firstDegree == undefined) ? '' : $.hrUtils.getHRCodeNameById(data.result[0].firstDegree);
                $("#firstDegree_name").val(firstDegree_name);
                //薪资等级
                // $("#wageId").val(data.result[0].wageId);
                // var wageId_name = getRank(data.result[0].wageId);
                // $("#wageId_name").val(wageId_name);
                //补助等级
                // $("#wageAllowanceId").val(data.result[0].wageAllowanceId);
                // var wageAllowanceId_name = getRank(data.result[0].wageAllowanceId);
                // $("#wageAllowanceId_name").val(wageAllowanceId_name);
                //工作所在城市级别
                // $("#workPlaceRank").val(data.result[0].workPlaceRank);
                // var workPlaceRank_name = (data.result[0].workPlaceRank==''|| data.result[0].workPlaceRank == undefined)?'':$.hrUtils.getHRCodeNameById(data.result[0].workPlaceRank);
                // $("#workPlaceRank_name").val(workPlaceRank_name);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 添加学习经历
     */
    function addEmpEducation() {
        //暂存页面状态,审批单Id
        localStorage.setItem('saveFlag', saveBtnFlag);
        localStorage.setItem('applyId', applicationUUID);
        window.location.href = "emp_eduHistory_tmp.html?oper=add&applyId=" + applicationUUID;
        /*var winObjEI = window.open("emp_eduHistory_tmp.html?oper=add&applyId="+applicationUUID);
         var isClose = 1;
         //关闭open页面时刷新父页面列表
         var loop = setInterval(function () {
         if (winObjEI.closed && isClose == 1) {
         isClose--;
         //重新加载人员信息
         reloadEmpInfo();
         $("#eduHistoryForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
         }
         }, 1000);*/
    }

    /**
     * 在成功添加完教育经历时，通过调用在教育经历子页面调用该方法，在本页面回写最高学历、最高学位、第一学历、第一学位
     */
    function addEmpEduInfo() {
    }

    /**
     * 修改学习经历
     */
    function editEmpEducation() {
        var idsVal = $('#eduHistoryForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                //暂存页面状态,审批单Id
                localStorage.setItem('saveFlag', saveBtnFlag);
                localStorage.setItem('applyId', applicationUUID);
                var rowId = $('#eduHistoryForm').jqGrid("getGridParam", "selrow");
                var rowData = $('#eduHistoryForm').jqGrid('getRowData', rowId);
                var personId = $("#personId").attr("value");
                window.location.href = "emp_eduHistory_tmp.html?oper=edit&id=" + rowData.id;
                /*var winObjEI = window.open("emp_eduHistory_tmp.html?oper=edit&id="+rowData.id);
                 var isClose = 1;
                 //关闭open页面时刷新父页面列表
                 var loop = setInterval(function () {
                 if (winObjEI.closed && isClose == 1) {
                 isClose--;
                 //重新加载人员信息
                 reloadEmpInfo();
                 $('#eduHistoryForm').jqGrid().trigger("reloadGrid");
                 }
                 }, 1000);*/
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }

    /**
     * 批量删除学习经历
     */
    function delEmpEducation() {
        var idsVal = $('#eduHistoryForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: baseUrl + "emp/hrEmpEducationTmp/deleteBatchByIds/" + idsVal + "/" + applicationUUID,
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
    function addHomeRelation() {
        var winObjEI = window.open("emp_homeRelation_tmp.html?oper=add&applyId=" + applicationUUID);
        var isClose = 1;
        //关闭open页面时刷新父页面列表
        var loop = setInterval(function () {
            if (winObjEI.closed && isClose == 1) {
                isClose--;
                $("#hrEmpFamilyForm").jqGrid('setGridParam', {
                    datatype: 'json',
                    postData: {'applyId': applicationUUID}
                }).trigger('reloadGrid');
            }
        }, 1000);
    }


    /**
     * 修改家庭信息
     */
    function editHomeRelation() {
        var idsVal = $('#hrEmpFamilyForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#hrEmpFamilyForm').jqGrid("getGridParam", "selrow");
                var rowData = $('#hrEmpFamilyForm').jqGrid('getRowData', rowId);
                var personId = $("#personId").attr("value");
                var winObjEI = window.open("emp_homeRelation_tmp.html?oper=edit&id=" + rowData.id);
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
    function delHomeRelation() {
        var idsVal = $('#hrEmpFamilyForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: baseUrl + "emp/hrEmpFamilyTmp/deleteBatch/" + idsVal,
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
    function checkIsSubmit() {
        $.ajax({
            url: baseUrl + 'sys/sysApply/get/' + applicationUUID + "?time=" + Math.random(),
            type: 'GET',
            async: false,//需要改为同步
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        if (xhr.result != null) {//审批单未提交
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
    function addHrWageChange() {
        checkIsSubmit();//检测审批单是否提交
        if (submitFlag == false) {
            $.xljUtils.tip("blue", "请先暂存审批单！", 3000);
        } else {
            var obj = $("#hrWageChangeForm").jqGrid("getRowData");
            if (obj.length < 1) {
                //var winObjEI = window.open("emp_hrWageChange_tmp.html?oper=add&applyId="+applicationUUID+"&orgId="+$("#orgId").val());
                var winObjEI = window.open("emp_hrWageChange_tmp.html?oper=add&applyId=" + applicationUUID);
                var isClose = 1;
                //关闭open页面时刷新父页面列表
                var loop = setInterval(function () {
                    if (winObjEI.closed && isClose == 1) {
                        isClose--;
                        //重新加载人员信息
                        reloadEmpInfo();
                        $("#hrWageChangeForm").jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {'applyId': applicationUUID}
                        }).trigger('reloadGrid');
                    }
                }, 1000);
            } else {
                $.xljUtils.tip("blue", "入职时只能添加一条薪资信息！");
            }
        }
    }

    /**
     * 修改薪酬信息
     */
    function editorHrWageChange() {
        var idsVal = $('#hrWageChangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#hrWageChangeForm').jqGrid("getGridParam", "selrow");
                var rowData = $('#hrWageChangeForm').jqGrid('getRowData', rowId);
                var winObjEI = window.open("emp_hrWageChange_tmp.html?oper=edit&id=" + rowData.id + "&orgId=" + $("#orgId").val());
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
    function delHrWageChange() {
        var idsVal = $('#hrWageChangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: baseUrl + "emp/hrWageChangeTmp/deleteBatchByIds/" + idsVal + "/" + applicationUUID,
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
    function addHrWageSubchange() {
        checkIsSubmit();//检测审批单是否提交
        if (submitFlag == false) {
            $.xljUtils.tip("blue", "请先暂存审批单！", 3000);
        } else {
            var obj = $("#hrWageSubchangeForm").jqGrid("getRowData");
            if (obj.length < 1) {
                var workPlaceRank = $("#workPlaceRank").val();
                var wageAllowanceId = $("#wageAllowanceId").val();
                //var winObjEI = window.open("emp_hrWageSubchange_tmp.html?oper=add&applyId="+applicationUUID+"&wageAllowanceId="+wageAllowanceId+"&workPlaceRank="+workPlaceRank);
                var winObjEI = window.open("emp_hrWageSubchange_tmp.html?oper=add&applyId=" + applicationUUID);
                var isClose = 1;
                //关闭open页面时刷新父页面列表
                var loop = setInterval(function () {
                    if (winObjEI.closed && isClose == 1) {
                        isClose--;
                        //重新加载人员信息
                        reloadEmpInfo();
                        $("#hrWageSubchangeForm").jqGrid('setGridParam', {
                            datatype: 'json',
                            postData: {'applyId': applicationUUID}
                        }).trigger('reloadGrid');
                    }
                }, 1000);
            } else {
                $.xljUtils.tip("blue", "入职时只能添加一条补助信息！");
            }
        }
    }

    /**
     * 修改补助信息
     */
    function editorHrWageSubchange() {
        var idsVal = $('#hrWageSubchangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#hrWageSubchangeForm').jqGrid("getGridParam", "selrow");
                var rowData = $('#hrWageSubchangeForm').jqGrid('getRowData', rowId);
                var winObjEI = window.open("emp_hrWageSubchange_tmp.html?oper=edit&id=" + rowData.id);
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
    function delHrWageSubchange() {
        var idsVal = $('#hrWageSubchangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: baseUrl + "emp/hrWageSubchangeTmp/deleteBatchByIds/" + idsVal + "/" + applicationUUID,
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
    $("#getAccountBtn").click(function () {
        var userName = $("#name").val();

        if (userName == '' || userName == null) {
            $.xljUtils.tip("green", "请输入人员姓名！");
        } else {
            if (flag) {
                //todo 加载数据并打开模态窗口
                jQuery("#personList").jqGrid(
                    {
                        url: baseUrl + '/emp/empPersonInfo/getAccount',//创建完成之后请求数据的url
                        datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                        mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                        ajaxGridOptions: {contentType: 'application/json'},
                        contentType: "application/json",
                        autowidth: true,
                        colModel: [
                            {name: 'id', label: 'id', editable: true, sortable: false, hidden: true},
                            {name: 'name', label: '用户名', editable: true, sortable: false},
                            {name: 'account', label: '账号', editable: true, sortable: false},
                            {name: 'deptId', label: '所属机构', editable: true, sortable: false, hidden: true},
                            {name: 'deptName', label: '所属机构', editable: true, sortable: false},
                            {name: 'sex', label: '性别', editable: true, sortable: false, hidden: true},
                            {name: 'sexName', label: '性别', editable: true, sortable: false},
                            // {name : 'type',label : '用户类型',editable:true,sortable:false,formatter:typeFmatter},
                            {
                                name: 'enableStatus',
                                label: '状态',
                                editable: true,
                                sortable: false,
                                formatter: statusFmatter,
                                hidden: true
                            },
                            {name: 'enableStatusName', label: '状态', editable: true, sortable: false},
                            {name: 'phone', label: '手机号', editable: true, sortable: false},
                            {name: 'sort', label: '排序', editable: true, sortable: false},
                            {name: 'idType', label: '证件类型', editable: true, sortable: false, hidden: true},
                            {name: 'idTypeName', label: '证件类型', editable: true, sortable: false},
                            {name: 'idCard', label: '证件号码', editable: true, sortable: false}
                        ],
                        postData: {"userName": userName},
                        multiselect: true,
                        multiboxonly: true,
                        rownumbers: true,
                        jsonReader: {
                            root: "result",
                            repeatitems: false
                        },
                        rowNum: -1,
                        loadError: function (xhr, status, error) {
                            //异常处理
                            console.log(xhr.status);
                            if (xhr.status == 404) {
                                $.xljUtils.tip("red", "请求url有误！");
                                return;
                            }
                            if (xhr.status == 405) {
                                $.xljUtils.tip("red", "请求方法有误！");
                                return;
                            }
                            $.xljUtils.tip("red", "网络异常,请联系管理员！");
                        },
                        loadComplete: function (xhr) {
                            console.log(xhr);
                            if (!xhr.success) {
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
                                        $.xljUtils.tip("red", "查询数据失败！");
                                        break;
                                }
                            } else {
                                //增加滚动条
                                $.xljUtils.addGridScroll();
                                $.xljUtils.gridResizeFn();
                            }
                        }
                    });
                flag = false;
            } else {
                var postData = $('#personList').jqGrid("getGridParam", "postData");
                $.each(postData, function (k, v) {
                    delete postData[k];
                });
                postData["userName"] = userName;
                $('#personList').setGridParam({"postData": postData}).trigger("reloadGrid");
            }
            $('#getErp').modal('show');
        }
    });
    /**
     * 状态数据格式化
     */
    function statusFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "1") {
            return "启用";
        } else if (cellvalue == "0") {
            return "禁用";
        } else {
            return "";
        }
    }

    function isMaleFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "1") {
            return "男";
        } else if (cellvalue == "0") {
            return "女";
        } else {
            return "";
        }
    }

    function typeFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "0") {
            return "非用户";
        } else if (cellvalue == "1") {
            return "普通用户";
        } else if (cellvalue == "2") {
            return "管理员";
        } else {
            return "";
        }
    }

    //选择人员
    $("#saveCancelBtn").click(function () {
        var idsVal = $('#personList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "请选择指定用户!");
                return;
            } else {
                var rowId = $('#personList').jqGrid("getGridParam", "selrow");
                var rowData = $('#personList').jqGrid('getRowData', rowId);
                var data = JSON.stringify({"name": rowData.name, "idType": rowData.idType, "idCard": rowData.idCard});
                $.ajax({
                    type: "POST",
                    async: false,
                    url: baseUrl + "emp/empPersonInfo/getHREmpInfoByNameAndIdTypeAndIdCard",
                    contentType: 'application/json',
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        var empPersonInfoDto = data.result;
                        //todo 特殊情况，多次入职
                        if (empPersonInfoDto != undefined) {
                            // $("#personId").val(empPersonInfoDto.id);//主键
                            personUUID = empPersonInfoDto.id;//人员ID
                            $("#name").val(empPersonInfoDto.name);//姓名
                            $("#pinyin").val(empPersonInfoDto.pinyin);//拼音
                            $("#sex").val(empPersonInfoDto.sex);//性别
                            // $("#age").val(empPersonInfoDto.age);//年龄
                            $("#sex_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.sex));//性别
                            $("#constellation").val(empPersonInfoDto.constellation);//星座
                            $("#constellation_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.constellation));//星座
                            var birth = (empPersonInfoDto.birth == '' || empPersonInfoDto.birth == null) ? '' : changeTimeStyle(empPersonInfoDto.birth).Format("yyyy-MM-dd");
                            $("#birth").val(birth);
                            if (birth != '') {
                                //todo 年龄赋值
                                calAgeOfEmp(birth);//new Date().getYear() - new Date(birth).getYear();
                            }
                            var entryPartyTime = (empPersonInfoDto.entryPartyTime == '' || empPersonInfoDto.entryPartyTime == null) ? '' : changeTimeStyle(empPersonInfoDto.entryPartyTime).Format("yyyy-MM-dd");
                            $("#entryPartyTime").val(entryPartyTime);//入党日期
                            $("#nationality").val(empPersonInfoDto.nationality);
                            var nationalityName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.nationality);
                            if (nationalityName != '') {
                                $("#nationality_name").val(nationalityName);
                            }
                            $("#roleIds").val(empPersonInfoDto.roleIds);//角色
                            var roleIdsName = $.hrUtils.getPtPostNameByIds(empPersonInfoDto.roleIds);
                            if (roleIdsName != '') {
                                $("#roleIds_name").val(roleIdsName);//角色名称
                            }
                            $("#password").val(empPersonInfoDto.password);//密码
                            $("#probationPeriod").val(empPersonInfoDto.probationPeriod);//试用期限
                            $("#idType").val(empPersonInfoDto.idType);//证件类型
                            var idTypeName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.idType);
                            if (idTypeName != '') {
                                $("#idType_name").val(idTypeName);
                            }
                            $("#idCard").val(empPersonInfoDto.idCard);
                            $("#orgId").val(empPersonInfoDto.orgId);
                            var orgName = $.hrUtils.getHRPrefixOrgNameById(empPersonInfoDto.orgId);
                            if (orgName != '') {
                                $("#orgName").val(orgName);
                            }
                            $("#postId").val(empPersonInfoDto.postId);
                            $("#postName").val($.hrUtils.getPtPostNameById(empPersonInfoDto.postId));
                            $("#headshipRank").val(empPersonInfoDto.headshipRank);
                            $("#headshipRank_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.headshipRank));
                            $("#account").val(empPersonInfoDto.account);
                            $("#maxEducation").val(empPersonInfoDto.maxEducation);
                            var maxEducationName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.maxEducation);
                            if (maxEducationName != '') {
                                $("#maxEducation_name").val(maxEducationName);
                            }
                            $("#maxDegree").val(empPersonInfoDto.maxDegree);
                            var maxDegreeName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.maxDegree);
                            if (maxDegreeName != '') {
                                $("#maxDegree_name").val(maxDegreeName);
                            }
                            $("#partyFigure").val(empPersonInfoDto.partyFigure);
                            var partyFigureName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.partyFigure);
                            if (partyFigureName != '') {
                                $("#partyFigure_name").val(partyFigureName);
                            }
                            $("#folk").val(empPersonInfoDto.folk);
                            var folkName = $.hrUtils.getHRCodeNameById(empPersonInfoDto.folk);
                            if (folkName != '') {
                                $("#folk_name").val(folkName);
                            }
                            if (empPersonInfoDto.workTime != '' && empPersonInfoDto.workTime != undefined) {
                                var workTime = (empPersonInfoDto.workTime == null || empPersonInfoDto.workTime == '') ? '' : changeTimeStyle(empPersonInfoDto.workTime).Format("yyyy-MM-dd");
                                $("#workTime").val(workTime);
                            }
                            if (empPersonInfoDto.workTime != '' && empPersonInfoDto.workTime != undefined) {
                                var UToTime = $("#workTime").val();
                                var aDate = UToTime.split("-");
                                var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
                                var myDate = new Date();
                                var dif = myDate.getTime() - NewDate.getTime();
                                myDate.setTime(dif);
                                $("#workAge").val(myDate.getFullYear() - 1970);//计算工龄
                            } else {
                                $("#workAge").val(0);//计算工龄
                            }
                            if (empPersonInfoDto.entryTime != null) {//入职日期
                                var entryTime = (empPersonInfoDto.entryTime == null || empPersonInfoDto.entryTime == null) ? '' : changeTimeStyle(empPersonInfoDto.entryTime).Format("yyyy-MM-dd");
                                $("#entryTime").val(entryTime);
                                //todo 司龄赋值
                                var seniorit = calSeniorit(entryTime);
                                $("#seniorit").val(seniorit);
                            }
                            if (empPersonInfoDto.firstBeginTime != null) {//首次合同开始时间
                                var firstBeginTime = (empPersonInfoDto.firstBeginTime == null || empPersonInfoDto.firstBeginTime == null) ? '' : changeTimeStyle(empPersonInfoDto.firstBeginTime).Format("yyyy-MM-dd");
                                $("#firstBeginTime").val(firstBeginTime);
                            }
                            if (empPersonInfoDto.firstEndTime != null) {//首次合同结束时间
                                var firstEndTime = (empPersonInfoDto.firstEndTime == null || empPersonInfoDto.firstEndTime == null) ? '' : changeTimeStyle(empPersonInfoDto.firstEndTime).Format("yyyy-MM-dd");
                                $("#firstEndTime").val(firstEndTime);
                            }
                            if (empPersonInfoDto.nowBeginTime != null) {//现合同开始时间
                                var nowBeginTime = (empPersonInfoDto.nowBeginTime == null || empPersonInfoDto.nowBeginTime == null) ? '' : changeTimeStyle(empPersonInfoDto.nowBeginTime).Format("yyyy-MM-dd");
                                $("#nowBeginTime").val(nowBeginTime);
                            }
                            if (empPersonInfoDto.nowEndTime != null) {//现合同结束时间
                                var nowEndTime = (empPersonInfoDto.nowEndTime == null || empPersonInfoDto.nowEndTime == null) ? '' : changeTimeStyle(empPersonInfoDto.nowEndTime).Format("yyyy-MM-dd");
                                $("#nowEndTime").val(nowEndTime);
                            }
                            $("#renewalTimes").val(empPersonInfoDto.renewalTimes);//续签次数
                            $("#bankUserName").val(empPersonInfoDto.bankUserName);//开户名
                            $("#bankAccount").val(empPersonInfoDto.bankAccount);//银行账户
                            $("#bankName").val(empPersonInfoDto.bankName);//开户行
                            $("#bankProvince").val(empPersonInfoDto.bankProvince);//银行所在省
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
                            $("#sort").val(empPersonInfoDto.sort);
                            $("#email").val(empPersonInfoDto.email);
                            $("#marry").val(empPersonInfoDto.marry);
                            $("#marry_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.marry));
                            $("#deptId").val(empPersonInfoDto.deptId);
                            $("#deptId_name").val($.hrUtils.getHROrgNameById(empPersonInfoDto.deptId));
                            // $("#postType").val(empPersonInfoDto.postType);
                            // $("#postType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.postType));
                            var graduateDate = (empPersonInfoDto.graduateDate == null || empPersonInfoDto.graduateDate == null) ? '' : changeTimeStyle(empPersonInfoDto.graduateDate).Format("yyyy-MM-dd");
                            $("#graduateDate").val(graduateDate);
                            $("#bloodType").val(empPersonInfoDto.bloodType);
                            $("#bloodType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.bloodType));
                            // $("#outlander").val(empPersonInfoDto.outlander);
                            // $("#outlander_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.outlander));
                            $("#health").val(empPersonInfoDto.health);
                            $("#health_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.health));
                            $("#phone").val(empPersonInfoDto.phone);//手机
                            $("#personType").val(empPersonInfoDto.personType);
                            $("#personType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.personType));
                            $("#recruitCannelId").val(empPersonInfoDto.recruitCannelId);
                            $("#recruitCannelId_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.recruitCannelId));
                            $("#personCode").val(empPersonInfoDto.personCode);
                            // if(empPersonInfoDto.retireDate != null){
                            //     var retireDate = (empPersonInfoDto.retireDate == '' || empPersonInfoDto.retireDate == null)?'':changeTimeStyle(empPersonInfoDto.retireDate).Format("yyyy-MM-dd");
                            //     $("#retireDate").val(retireDate);//退休时间
                            // }
                            if (empPersonInfoDto.holdHeadshipTime != null) {
                                var holdHeadshipTime = (empPersonInfoDto.holdHeadshipTime == '' || empPersonInfoDto.holdHeadshipTime == null) ? '' : changeTimeStyle(empPersonInfoDto.holdHeadshipTime).Format("yyyy-MM-dd");
                                $("#holdHeadshipTime").val(holdHeadshipTime);
                            }
                            if (empPersonInfoDto.regularTime != null) {
                                var regularTime = (empPersonInfoDto.regularTime == '' || empPersonInfoDto.regularTime == null) ? '' : changeTimeStyle(empPersonInfoDto.regularTime).Format("yyyy-MM-dd");
                                $("#regularTime").val(regularTime);
                            }
                            $("#wageId").val(empPersonInfoDto.wageId);
                            var wageName = getRank(empPersonInfoDto.wageId);
                            $("#wageId_name").val(wageName);
                            $("#wageAllowanceId").val(empPersonInfoDto.wageAllowanceId);
                            var wageAllowanceName = getRank(empPersonInfoDto.wageAllowanceId);
                            $("#wageAllowanceId_name").val(wageAllowanceName);
                            $("#workPhone").val(empPersonInfoDto.workPhone);
                            $("#kqType").val(empPersonInfoDto.kqType);
                            $("#kqType_name").val($.hrUtils.getHRCodeNameById(empPersonInfoDto.kqType));
                            if (empPersonInfoDto.entryOrgTime != null) {
                                var entryOrgTime = (empPersonInfoDto.entryOrgTime == '' || empPersonInfoDto.entryOrgTime == null) ? '' : changeTimeStyle(empPersonInfoDto.entryOrgTime).Format("yyyy-MM-dd");
                                $("#entryOrgTime").val(entryOrgTime);
                            }
                            $("#remark").val(empPersonInfoDto.remark);
                            $("#nowPlace").val(empPersonInfoDto.nowPlace);//现住址
                            if (empPersonInfoDto.photo != '' && empPersonInfoDto.photo != undefined) {
                                $("#preImg").attr("src", "data:image/jpeg;base64," + empPersonInfoDto.photo);
                                $("#preImg").attr("height", 180);
                                $("#preImg").attr("width", 142);
                            } else {
                                $("#preImg").attr("src", "/platform-app/common/img/defaultPic.png");
                            }
                            $("#nativePlace").val(empPersonInfoDto.nativePlace);//籍贯
                            $("#archivePlace").val(empPersonInfoDto.archivePlace);//档案所在地
                            //todo 新增字段
                            $("#siPayArea").val(empPersonInfoDto.siPayArea);//公积金缴纳地
                            var siPayArea_name = (empPersonInfoDto.siPayArea == '' || empPersonInfoDto.siPayArea == null) ? '' : $.hrUtils.getHRCodeNameById(empPersonInfoDto.siPayArea);
                            $("#siPayArea_name").val(siPayArea_name);

                            $("#postLevel").val(empPersonInfoDto.postLevel);//岗位层级
                            var postLevel_name = (empPersonInfoDto.postLevel == '' || empPersonInfoDto.postLevel == null) ? '' : $.hrUtils.getHRCodeNameById(empPersonInfoDto.postLevel);
                            $("#postLevel_name").val(postLevel_name);

                            $("#compileType").val(empPersonInfoDto.compileType);//编制属性
                            var compileType_name = (empPersonInfoDto.compileType == '' || empPersonInfoDto.compileType == null) ? '' : $.hrUtils.getHRCodeNameById(empPersonInfoDto.compileType);
                            $("#compileType_name").val(compileType_name);
                            $("#firstEducation").val(empPersonInfoDto.firstEducation);//第一学历
                            var firstEducation_name = (empPersonInfoDto.firstEducation == '' || empPersonInfoDto.firstEducation == null) ? '' : $.hrUtils.getHRCodeNameById(empPersonInfoDto.firstEducation);
                            $("#firstEducation_name").val(firstEducation_name);
                            $("#firstDegree").val(empPersonInfoDto.firstDegree);//第一学位
                            var firstDegree_name = (empPersonInfoDto.firstDegree == '' || empPersonInfoDto.firstDegree == null) ? '' : $.hrUtils.getHRCodeNameById(empPersonInfoDto.firstDegree);
                            $("#firstDegree_name").val(firstDegree_name);
                            $("#functions").val(empPersonInfoDto.functions);
                            var functionsName = (empPersonInfoDto.functions == "" || empPersonInfoDto.functions == undefined) ? "" : $.hrUtils.getHROrgNameById(empPersonInfoDto.functions);
                            $("#functionsName").val(functionsName);

                            var personId = empPersonInfoDto.id;
                            //todo 根据人员ID将该人员的正是表信息同步到临时表中
                            $.ajax({
                                type: "POST",
                                async: false,
                                url: baseUrl + "emp/empPersonInfo/queryDataToTemp",
                                contentType: 'application/json',
                                data: JSON.stringify({"personId": empPersonInfoDto.id, "applyId": applicationUUID}),
                                dataType: "json",
                                success: function (data) {
                                    //todo 重新加载工作经历
                                    var postData = $("#workHistoryList").jqGrid("getGridParam", "postData");
                                    $.each(postData, function (k, v) {
                                        delete postData[k];
                                    });
                                    $("#workHistoryList").jqGrid('setGridParam', {
                                        datatype: 'json',
                                        postData: {"applyId": applicationUUID}
                                    }).trigger('reloadGrid');
                                    //todo 重新加载教育经历
                                    var postData = $("#eduHistoryForm").jqGrid("getGridParam", "postData");
                                    $.each(postData, function (k, v) {
                                        delete postData[k];
                                    });
                                    $("#eduHistoryForm").jqGrid('setGridParam', {
                                        datatype: 'json',
                                        postData: {'applyId': applicationUUID}
                                    }).trigger('reloadGrid');
                                    //todo 重新加载家庭信息
                                    // var postData = $("#hrEmpFamilyForm").jqGrid("getGridParam", "postData");
                                    // $.each(postData, function (k, v) {
                                    //     delete postData[k];
                                    // });
                                    // $("#hrEmpFamilyForm").jqGrid('setGridParam',{datatype:'json',postData:{'applyId':applicationUUID}}).trigger('reloadGrid');
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
                        } else {
                            $("#name").val(rowData.realName);
                            $("#account").val(rowData.loginName);
                            $("#birth").val(rowData.birthday);
                            $("#phone").val(rowData.mobile);
                            $("#entryTime").val(rowData.entryDate);
                            $("#workTime").val(rowData.workTime);
                            $("#email").val(rowData.email);
                            $("#remark").val(rowData.remark);
                            if ("男" == rowData.isMale || "1" == rowData.isMale) {
                                $("#sex").val("1057100076");
                                $("#sex_name").val("男");
                            } else {
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
        } else {
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
    function changeTimeStyle(bTime) {
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
        var later = new Date(bTime);
        return later;
    }

    //todo 清空信息
    window.emptyInfo = function (id, hiddenId) {
        $("#" + id).val("");
        $("#" + hiddenId).val("");
        if (id == 'deptId') {
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

    /**
     * 当 出生日期 改变时，要重新计算员工的年龄，并将新的计算结果回填
     */
    window.birthChangeEvent = function () {
        var birth = $("#birth").val();
        if (birth != '') {
            //校验出生日期
            var flag = checkBirth(birth);
            if (flag) {
                calAgeOfEmp(birth);
                // calConstellationOfEmp(birth);
            } else {
                $.xljUtils.tip("red", "出生日期不能晚于当前日期！");
                $("#birth").val("");
            }
        } else {
            //当出生日期清空时，年龄和星座要一起清空
            $("#age").val("");
            $("#constellation").val("");
        }
    };

    /**
     * 校验出生日期
     */
    window.checkBirth = function (birth) {

        //出生日期不能早于当前时间
        // 获得今天的时间
        var date = new Date();
        var birthDate = new Date(birth);
        return ( date.getTime() > birthDate.getTime() ) || ( date.getTime() == birthDate.getTime() );
    };

    /**
     * todo 计算员工年龄
     */
    window.calAgeOfEmp = function (birth) {
        if (birth && birth != '') {
            // 获得今天的时间
            var date = new Date();
            var birthDate = new Date(birth);
            // 向下取整：例如 10岁 20天 会计算成 10岁
            // 如果要向上取整，计算成11岁，把floor替换成 ceil
            var timeDifference = date.getTime() - birthDate.getTime();
            var age = Math.floor(( date.getTime() - birthDate.getTime() ) / 1000 / 60 / 60 / 24 / 365);
            $("#age").val(age);
        }
    };

    /**
     * 计算员工星座（暂时返回的是中文，等代码集建立好后，再更改成代码）
     */
    // window.calConstellationOfEmp = function(birth){
    //     var birthStr = birth.split("-");
    //     var month = parseInt(birthStr[1]);
    //     var day = parseInt(birthStr[2]);
    //     var s="魔羯水瓶双鱼牧羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    //     var arr=[20,19,21,21,21,22,23,23,23,23,22,22];
    //     var constellation = s.substr(month*2-(day<arr[month-1]?2:0),2);
    //     $("#constellation").val(constellation);
    // }

    //todo 计算工龄
    window.calWorkAge = function () {
        if ($("#workTime").val() != '') {
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
            url: hostUrl + "zp/hrZpResume/get/" + id,
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