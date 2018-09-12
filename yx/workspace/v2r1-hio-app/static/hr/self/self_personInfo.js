/**
 * Created by Administrator on 2017/5/17.
 */
var jqGridContRelation;//机构-岗位关联表id
(function ($, window, document, undefined) {


    var isExistFlag = true;//用于标识能否在人力系统中查询出此人

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

    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //上来就执行
    $(function(){

        //初始化个人信息
        initSelfPersonInfo();


    });

    /**
     * 初始化个人信息
     */
    function initSelfPersonInfo() {
        $.ajax({
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            type: 'POST',
            url: hostUrl + 'self/selfPersonInfo/querySelfPerson',
            contentType: "application/json",
            data: JSON.stringify({}),
            success: function (data) {
                var perInfo = data.result;
                console.log(perInfo);
                if(perInfo == undefined){
                    pop_tip_open("blue", "人力系统查无此人信息！");
                    isExistFlag = false;
                }else{
                    $("#id").attr("value",perInfo.id);//人员ID
                    if(!perInfo.photo){
                        $("#imgLocation").append("<img src='/static/common/img/defaultPic.png' height='180' width='142'/>");
                    }else{
                        $("#imgLocation").append("<img src='data:image/jpeg;base64,"+perInfo.photo+"' height='180' width='142'/>");
                    }
                    $("#nameOfEmp").append(perInfo.realName);
                    var sexName = perInfo.isMale == 1 ? '男':'女';
                    $("#sexName").append(sexName);//性别
                    if(perInfo.birthday){
                        var birthOfEmp =changeTimeStyle(perInfo.birthday).Format("yyyy-MM-dd");
                        $("#birthOfEmp").append(birthOfEmp);//出生日期
                    }
                    var entryTime = (perInfo.entryTime == "" || perInfo.entryTime == undefined)?"":changeTimeStyle(perInfo.entryTime).Format("yyyy-MM-dd");
                    $("#entryTime").append(entryTime);//入职时间
                    var regularTime = (perInfo.regularTime == "" || perInfo.regularTime == undefined)?"":changeTimeStyle(perInfo.regularTime).Format("yyyy-MM-dd");
                    $("#regularTime").append(regularTime);//出生日期
                    $("#idCardOfEmp").append(perInfo.idCard);//证件号码
                    var folkName = (perInfo.folk==''||perInfo.folk==undefined)?"":$.hrUtils.getHRCodeNameById(perInfo.folk);
                    $("#folkName").append(folkName);//民族
                    $("#residenceOfEmp").append(perInfo.nativePlace);//户口所在地
                    var marryName = (perInfo.marry==''||perInfo.marry==undefined)?"":$.hrUtils.getHRCodeNameById(perInfo.marry);
                    $("#marryName").append(marryName);//婚姻状况
                    var deptName = (perInfo.deptId==''||perInfo.deptId==undefined)?"":$.hrUtils.getHROrgNameById(perInfo.deptId);
                    $("#deptName").append(deptName);//部门
                    var personType = (perInfo.personType==''||perInfo.personType==undefined)?"":$.hrUtils.getHRCodeNameById(perInfo.personType);
                    $("#wageName").append(personType);
                    $("#workTime").append(changeTimeStyle(perInfo.workTime).Format("yyyy-MM-dd"));//参加工作时间
                    $("#phone").append(perInfo.mobile);//手机号
                    // var postName = (perInfo.postId == ""||perInfo.postId == undefined)?"":$.hrUtils.getHRCodeNameById(perInfo.postId);
                    $("#postName").append(perInfo.postName);//职位名称
                    $("#workPhone").append(perInfo.workPhone);
                    $("#remark").append(perInfo.remark);//备注
                    // $("#selfPersonWorkHistory").append(perInfo.selfPersonWorkHistory);//工作经历
                    // $("#selfPersonEducation").append(perInfo.selfPersonEducation);//学习经历
                    //初始化工作经历
                    initSelfPersonWorkHistory(perInfo.id);

                    //初始化学习经历
                    initSelfPersonEducation(perInfo.id);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "加载人员信息失败，请重试！");
            }
        })
    }

    function initSelfPersonWorkHistory(personId) {
        jqGridContRelation = jQuery("#selfPersonWorkHistory").jqGrid(
            {
                url: hostUrl+'emp/empWorkHistory/queryList',//创建完成之后请求数据的url  --pageList
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData : {personId:personId},
                autowidth: true,
                colNames: ['开始时间','结束时间','公司', '部门','岗位'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'startTime', index: 'startTime', editable: true, width: 100, align: "center",formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},sortable:false},
                    {name: 'endTime', index: 'endTime', editable: true, width: 100, align: "center",formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},sortable:false},
                    {name: 'org', index: 'org', editable: true, width: 100, align: "center",sortable:false},
                    {name: 'dept', index: 'dept', editable: true, width: 100, align: "center",sortable:false},
                    {name: 'post', index: 'post', editable: true, width: 100, align: "center",sortable:false}
                ],
                sortname: 'startTime',//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                rownumbers: false,
                rowNum:-1,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                /*gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },*/
                viewrecords: false, //定义是否要显示总记录数
                shrinkToFit: true,
                loadComplete: function (xhr) {
                    // $("#selfPersonWorkHistory").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'scroll' });//始终显示纵向滚动条
                    $("#selfPersonWorkHistory").closest(".ui-jqgrid-bdiv").css({ 'overflow-x' : 'hidden' });
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
                        //success
                    }
                }

            });
    }


    function initSelfPersonEducation(personId) {
        jqGridContRelation = jQuery("#selfPersonEducation").jqGrid(
            {
                url: hostUrl+'emp/hrEmpEducation/queryList',//创建完成之后请求数据的url  --pageList
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData : {personId:personId},
                autowidth: true,
                colNames: ['开始时间','结束时间','学校', '学历','学位'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'startTime', index: 'startTime', editable: true, width: 100, align: "center",formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},sortable:false},
                    {name: 'endTime', index: 'endTime', editable: true, width: 100, align: "center",formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},sortable:false},
                    {name: 'schooolName', index: 'schooolName', editable: true, width: 100, align: "center",sortable:false},
                    {name: 'education', index: 'education', editable: true, width: 100, align: "center",formatter:$.hrUtils.getHRCodeNameById,sortable:false},
                    {name: 'degree', index: 'degree', editable: true, width: 100, align: "center",formatter:$.hrUtils.getHRCodeNameById,sortable:false}
                ],
                sortname: 'startTime',//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                rownumbers: false,
                rowNum:-1,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                /*gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },*/
                viewrecords: false, //定义是否要显示总记录数
                shrinkToFit: true,
                loadComplete: function (xhr) {
                    // $("#selfPersonEducation").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'scroll' });//始终显示纵向滚动条
                    $("#selfPersonEducation").closest(".ui-jqgrid-bdiv").css({ 'overflow-x' : 'hidden' });
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
                        //success
                    }
                }

            });
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
    }
    
    $("#exportPersonInfo").click(function () {
        if(isExistFlag){
            var id = $("#id").val();
            var form = $("<form>");   //定义一个form表单
            form.attr('style','display:none');   //在form表单中添加查询参数
            form.attr('target','exportTarget');
            form.attr('method','post');
            form.attr('action',hostUrl + 'self/selfPersonInfo/exportPersonInfoWord?'+window.parent.JZY.s.getAccessTokenByAuthorization());
            //添加后台导出参数
            var input1 = $('<input>');
            input1.attr('type','hidden');
            input1.attr('name',"id");
            input1.attr('value',id);
            $('body').append(form);  //将表单放置在web中
            form.append(input1);   //将查询参数控件提交到表单上
            form.submit();   //表单提交
            pop_tip_open("", "导出成功");
        }else{
            pop_tip_open("blue", "人力系统无此人信息,不能导出！");
        }
    });

    function changeTimeStyle(bTime){
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1]+'/'+timeDate[2]+'/'+timeDate[0];
        var later = new Date(bTime);
        return later;
    }

})(jQuery, window, document);