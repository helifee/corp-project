/**
 * 移动端自助我的信息js
 * yyq/lixd
 */
var jqGridContRelation;//机构-岗位关联表id
(function ($, window, document, undefined) {
    //用法: HTML5+的plus对象,必须由click事件触发后,才能在普通网页中使用.所以在没有click的情况下,调用本文件可以解决问题!
    //在代码中使用: plusObj , 等同于plus
    //表单隐藏值: plusok , 是否存在plus对象
    //检查plus是否就绪: checkPlus 函数
    //但是,APP打包后安装,并未出现plus对象获取延迟的情况,所以不必用到本代码
    var isExistFlag = true;//用于标识能否在人力系统中查询出此人
    var personId;
    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //上来就执行
    $(function () {
        //初始化个人信息
        initSelfPersonInfo();
    });

    /**
     * 初始化个人信息
     */
    function initSelfPersonInfo() {
        var id = $.xljUtils.getUrlParam("personId");
        $.ajax({
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            type: 'POST',
            url: hostUrl + 'self/selfPersonInfo/querySelfPerson',
            contentType: "application/json",
            data: JSON.stringify({"personId": id}),
            success: function (data) {
                var perInfo = data.result;
                if (perInfo == undefined) {
                    pop_tip_open("blue", "人力系统查无此人信息！");
                    isExistFlag = false;
                } else {
                    personId = perInfo.id;
                    // $("#id").attr("value",perInfo.id);//人员ID
                    //当没有上传照片的时候，显示默认的图片
                    if (perInfo.photo == null) {
                        $("#imgLocation").append("<img src='/static/common/img/defaultPic.png' height='180' width='102' id='img'/>");
                    } else {
                        $("#imgLocation").append("<img src='data:image/jpeg;base64," + perInfo.photo + "' height='180' width='102' id='img'/>");
                    }
                    $("#nameOfEmp").val(perInfo.realName);
                    $("#perName").text(perInfo.realName);

                    if (perInfo.isMale == '1') {
                        $("#sexName").val('男');
                    } else {
                        $("#sexName").val('女');
                    }

                    $("#idCardOfEmp").val(perInfo.idCard);//证件号码
                    var folkName = (perInfo.folk == '' || perInfo.folk == undefined) ? "" : $.hrUtils.getHRCodeNameById(perInfo.folk);
                    $("#folkName").val(folkName);//民族
                    $("#residenceOfEmp").val(perInfo.residence);//户口所在地
                    var marryName = (perInfo.marry == '' || perInfo.marry == undefined) ? "" : $.hrUtils.getHRCodeNameById(perInfo.marry);
                    $("#marryName").val(marryName);//婚姻状况
                    var deptName = (perInfo.deptId == '' || perInfo.deptId == undefined) ? "" : $.hrUtils.getHRPrefixOrgNameById(perInfo.deptId);
                    $("#deptName").val(deptName);
                    var wageName = (perInfo.wageId == '' || perInfo.wageId == undefined) ? "" : $.hrUtils.getHRCodeNameById(perInfo.wageId);
                    $("#wageName").val(wageName);
                    $("#personCode").val(perInfo.personCode);//员工编号
                    $("#mobile").val(perInfo.mobile);//手机号
                    $("#postName").val(perInfo.postName);//职位名称
                    // $("#workPhone").val(perInfo.workPhone);
                    $("#remark").val(perInfo.remark);//备注
                    if (perInfo.birthday != null && perInfo.birthday != "") {
                        $("#birthOfEmp").val(new Date(changeTimeStyle(perInfo.birthday)).Format("yyyy-MM-dd"));//出生日期
                    }
                    if (perInfo.entryTime != null && perInfo.entryTime != "") {
                        $("#entryTime").val(new Date(changeTimeStyle(perInfo.entryTime)).Format("yyyy-MM-dd"));//入职时间
                    }
                    if (perInfo.regularTime != null && perInfo.regularTime != "") {
                        $("#regularTime").val(new Date(changeTimeStyle(perInfo.regularTime)).Format("yyyy-MM-dd"));//转正时间
                    }
                    //初始化工作经历
                    // $("#selfPersonWorkHistory").append(perInfo.selfPersonWorkHistory);//工作经历

                    //初始化学习经历
                    // $("#selfPersonEducation").append(perInfo.selfPersonEducation);//学习经历
                    var empWorkHistoryList = perInfo.empWorkHistoryDtoList;
                    if (empWorkHistoryList != null && empWorkHistoryList.length > 0) {
                        var str="";
                        for (var i = 0; i < empWorkHistoryList.length; i++) {
                            var empWorkHistory = empWorkHistoryList[i];
                            if (empWorkHistory != null) {
                                //开始时间
                                var startTime = $.hrUtils.filterNull(empWorkHistory.startTime);
                                if(startTime!=''&&startTime.length>10){
                                    startTime=startTime.substr(0,10);
                                }
                                //结束时间
                                var endTime = $.hrUtils.filterNull(empWorkHistory.endTime);
                                if(endTime!=''&&endTime.length>10){
                                    endTime=endTime.substr(0,10);
                                }
                                str+="<div class='time-info'>"+startTime+"至"+endTime+"</div>";
                                //公司
                                var org = $.hrUtils.filterNull(empWorkHistory.org);
                                //部门
                                var dept = $.hrUtils.filterNull(empWorkHistory.dept);
                                //岗位
                                var post = $.hrUtils.filterNull(empWorkHistory.post);
                                str+="<div style='margin-bottom: 16px'>"+org;
                                if(dept!=''){
                                    str+="/"+dept;
                                }
                                if(post!=""){
                                    str+="/"+post;
                                }
                                str+="</div>";
                            }
                        }
                        $("#selfPersonWorkHistory").append(str);//工作经历
                    }
                    var hrEmpEducationList = perInfo.hrEmpEducationDtoList;
                    if (hrEmpEducationList != null && hrEmpEducationList.length > 0) {
                        var str="";
                        for (var i = 0; i < hrEmpEducationList.length; i++) {
                            var hrEmpEducation = hrEmpEducationList[i];
                            if (hrEmpEducation != null) {
                                //开始时间
                                var startTime = $.hrUtils.filterNull(hrEmpEducation.startTime);
                                if(startTime!=''&&startTime.length>10){
                                    startTime=startTime.substr(0,10);
                                }
                                //结束时间
                                var endTime = $.hrUtils.filterNull(hrEmpEducation.endTime);
                                if(endTime!=''&&endTime.length>10){
                                    endTime=endTime.substr(0,10);
                                }
                                str+="<div class='time-info'>"+startTime+"至"+endTime+"</div>";
                                //学校名称
                                var schooolName = $.hrUtils.filterNull(hrEmpEducation.schooolName);
                                //学历
                                var education = $.hrUtils.filterNull(hrEmpEducation.education);
                                //学位
                                var degree = $.hrUtils.filterNull(hrEmpEducation.degree);
                                str+="<div style='margin-bottom: 16px'>"+schooolName;
                                if(education!=''){
                                    str+="/"+education;
                                }
                                if(degree!=''){
                                    str+="/"+degree;
                                }
                                str+="</div>";
                            }
                        }
                        $("#selfPersonEducation").append(str);//学习经历
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "加载人员信息失败，请重试！");
            }
        })
    }

    /**
     * 格式化时间
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
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


    function changeTimeStyle(bTime) {
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
        var later = new Date(bTime);
        return later;
    }

    /**
     * 工作信息点击
     */
    $("#workHistoryShowSpan").click(function () {
        var flag = $(".workHistory").attr("flag");
        var text = $("#selfPersonWorkHistory").html();
        if (flag == 1) {//展开
            $(".workHistory").slideUp("slow");//slideUp()slideDown
            $(".workHistory").attr("flag", 0);
        } else {
            if (text != null && text != "") {
                $(".educationHistory").slideUp("slow");
                $(".educationHistory").attr("flag", 0);
                $(".selfInfo").slideUp("slow");
                $(".selfInfo").attr("flag", 0);
                $(".workHistory").slideDown("slow");//slideUp()slideDown
                $(".workHistory").attr("flag", 1);
            }
        }
    });
    /**
     * 教育信息点击
     */
    $("#educationShowSpan").click(function () {
        var flag = $(".educationHistory").attr("flag");
        var text = $("#selfPersonEducation").html();
        if (flag == 1) {
            $(".educationHistory").slideUp("slow");//slideUp()slideDown
            $(".educationHistory").attr("flag", 0);
        } else {
            if (text != null && text != "") {
                $(".workHistory").slideUp("slow");//slideUp()slideDown
                $(".workHistory").attr("flag", 0);
                $(".selfInfo").slideUp("slow");
                $(".selfInfo").attr("flag", 0);
                $(".educationHistory").slideDown("slow");
                $(".educationHistory").attr("flag", 1);
            }
        }
    });
    /**
     * 人员信息点击
     * 当前显示隐藏标识 flag =1?显示：隐藏
     */
    $("#selfInfo").click(function () {
        var flag = $(".selfInfo").attr("flag");
        if (flag == 1) {//当前展开
            $(".selfInfo").slideUp("slow");
            $(".selfInfo").attr("flag", 0);
            return;
        } else {//当前隐藏
            //隐藏别的
            $(".workHistory").slideUp("slow");//slideUp()slideDown
            $(".workHistory").attr("flag", 0);
            $(".educationHistory").slideUp("slow");
            $(".educationHistory").attr("flag", 0);
            //展示自己
            $(".selfInfo").slideDown("slow");
            $(".selfInfo").attr("flag", 1);
        }
    });


    //*********************调用摄像头**************************
    $(".creame").click(function () {
        $("#imgFile").click();
    });
    // $("#imgLocation").click(function () {
    //     $("#imgFile").click();
    // });


    $("#imgFile").change(function () {
        /*   var value = $("#imgFile").val();//获得图片的本地路径
           $("#selfPicForm").submit();*/
        var windowURL = window.URL || window.webkitURL;
        var loadImg = windowURL.createObjectURL(document.getElementById('imgFile').files[0]);
        var formData = new FormData();
        var tendId = $.xljUtils.getUrlParam("tendId");
        formData.append("tendId", tendId);
        //获取图片参数
        if ($("#imgFile")[0].files[0] != undefined) {
            formData.append("photo", $("#imgFile")[0].files[0]);
        }
        $.ajax({
            type: "post",
            url: hostUrl + "emp/empPersonInfo/updatePhoto/" + personId,//走自定义更新
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            success: function (data) {
                $("#img").attr("src", loadImg);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (saveImgFlag) {
                    pop_tip_open("blue", "图片上传失败，请重试！");
                    saveImgFlag = false;
                } else {
                    pop_tip_open("red", "人员信息更新失败，请重试！");
                }
            }
        });

    })


})(jQuery, window, document);