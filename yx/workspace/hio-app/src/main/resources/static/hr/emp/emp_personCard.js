/**
 * 员工卡片js
 */
;
(function ($, window, document, undefined) {
    var ids;//被编辑的列表
    var idArr;
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

    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    };

    $(function(){
        //初始页面
        initPage();

        //grid 自适应宽度
        $(window).resize(function () {
            resizeHeight();
            resizeGrid();
        });

        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            window.close();
        });

        //导出
        $("#exportBtn").unbind('click').on('click',function(){
            exportWordResume(idArr[0]);
        });
    });

    //计算高度
    function resizeHeight() {
        $("#work").height("200px");
    }

    //计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
        //$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
        $.xljUtils.gridResizeFn();
    }

    //导出word简历
    function exportWordResume(rowid){
        var form = $("<form>");   //定义一个form表单
        form.attr('style','display:none');   //在form表单中添加查询参数
        form.attr('target','exportTarget');
        form.attr('method','post');
        form.attr('action',serviceUrl + "emp/empPersonInfo/exportWord");
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type','hidden');
        input1.attr('name',"id");
        input1.attr('value',rowid);

        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "导出成功");
    }

    /**
     * 初始化页面
     */
    function initPage(){
        //获取url参数
        ids=$.xljUtils.getUrlParam("ids");//被编辑的人员ID
        idArr = ids.split(",");
        //根据ID加载数据
        $.ajax({
            type:"GET",
            url:baseUrl+"emp/empPersonInfo/getEmpInfoById/"+idArr[0],
            dataType:"json",
            success: function(data, textStatus) {
                $("#name").html(data.result.name);
                $("#sex").html(data.result.sex);
                var birth = (data.result.birth == '' || data.result.birth==null)?'':changeTimeStyle(data.result.birth).Format("yyyy-MM-dd");
                $("#birth").html(birth);
                $("#idCard").html(data.result.idCard);
                 $("#fork").html(data.result.folk);
                $("#nativePlace").html(data.result.nativePlace);
                $("#ageOfEmp").html(data.result.age);
                $("#nationality").html(data.result.nationality);
                $("#marry").html(data.result.marry);
                $("#maxEducation").html(data.result.maxEducation);
                $("#maxDegree").html(data.result.maxDegree);//最高学位
                $("#partyFigure").html(data.result.partyFigure);//政治面貌
                $("#occupation").html(data.result.occupation);//职称
                var workTime = (data.result.workTime == '' || data.result.workTime==null)?'':changeTimeStyle(data.result.workTime).Format("yyyy-MM-dd");
                $("#workTime").html(workTime);
                var entryTime = (data.result.entryTime == '' || data.result.entryTime==null)?'':changeTimeStyle(data.result.entryTime).Format("yyyy-MM-dd");
                $('#entryTime').html(entryTime);//入职时间
                $("#perviousArea").html(data.result.perviousArea);//工作前所在地
                $("#residence").html(data.result.residence);//户口所在地
                $("#siPayArea").html(data.result.siPayArea);
                $("#archivePlace").html(data.result.archivePlace);//档案所在地
                $("#phone").html(data.result.phone);//移动电话
                $("#homePlace").html(data.result.homePlace);//家庭住址
                $("#nowPlace").html(data.result.nowPlace);//现住址
                $("#email").html(data.result.email);//邮箱
                $("#emergency").html(data.result.emergency);//紧急联系人
                $("#emergencyTel").html(data.result.emergencyTel);//紧急联系人电话
                if(data.result.photo != undefined && data.result.photo != ''){
                    $("#photo").attr("src","data:image/jpeg;base64,"+data.result.photo);
                }
            }
        });
        getWorkHistoryList(idArr[0]);//加载工作经历信息
        getEducationInfoList(idArr[0]);//加载教育经历
        getHrEmpFamilyInfoList(idArr[0]);//加载家庭信息

    }

    //todo 获取人员工作经历信息
    function getWorkHistoryList(personId){
        jQuery("#workHistoryForm").jqGrid(
            {
                url : baseUrl+'/emp/empWorkHistory/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','开始时间','结束时间','工作单位','工作岗位','证明人','证明人联系方式'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'startTime',label : 'startTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'endTime',label : 'endTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'org',label : 'org',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'post',label : 'post',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'witness',label : 'witness',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'witnessPhone',label : 'witnessPhone',editable:true,width : 60,sortable:false,align:'center'},
                ],
                postData:{"personId":personId},
                sortname: 'startTime',//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                multiboxonly:true,
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
                        //success
                    }
                },
                gridComplete:function(){
                    var reccount = $("#workHistoryForm").getGridParam("reccount");//获取行数
                    var ids = $("#workHistoryForm").getDataIDs();
                    var id = ids[ids.length-1];
                    $("#workHistoryForm").setSelection(id);
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }
            });
    }

    /**
     * 获取教育经历列表
     */
    function getEducationInfoList(personId){
        jQuery("#eduHistoryForm").jqGrid(
            {
                url : baseUrl+'/emp/hrEmpEducation/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','入学时间','毕业时间','学校名称','专业','学历','学位'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'startTime',label : 'startTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'endTime',label : 'endTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'schooolName',label : 'schooolName',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'major',label : 'major',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'education',label : 'education',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'degree',label : 'degree',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                ],
                postData:{"personId":personId},
                sortname: 'startTime',//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                multiboxonly:true,
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
                        //success
                    }
                }
            });
    }

    /**
     * 获取家庭信息列表
     */
    function getHrEmpFamilyInfoList(personId){
        jQuery("#hrEmpFamilyForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpFamily/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','关系','姓名','出生日期','工作单位','职务'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'relation',label : 'relation',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'name',label : 'name',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'birth',label : 'birth',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'org',label : 'org',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'headship',label : 'headship',editable:true,width : 60,sortable:false,align:'center'}
                ],
                postData:{"personId":personId},
                multiboxonly:true,
                sortname: 'createDate',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
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
                        //success
                    }
                },
                gridComplete:function(){
                    var reccount = $("#hrEmpFamilyForm").getGridParam("reccount");//获取行数
                    var ids = $("#hrEmpFamilyForm").getDataIDs();
                    var id = ids[ids.length-1];
                    $("#hrEmpFamilyForm").setSelection(id);
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
})(jQuery, window, document);