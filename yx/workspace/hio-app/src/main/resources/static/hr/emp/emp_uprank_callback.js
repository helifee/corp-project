;(function($, window, document, undefined){
    var oper;//操作类型
    var applicationUUID;//审批单ID
    var personId;
    var personArr = new Array();//用来动态保存更新人员的ID
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

    //上来就执行
    $(function(){
        //初始页面
        initInfo();
        setIframeHeight();
    });


    /**
     * 初始化页面
     */
    function initInfo() {
        $('title').text("员工晋升晋级审批页");
        $(".xj-form-title").text("员工晋升晋级审批页");
        //根据id获取页面信息
        var applyId = $.xljUtils.getUrlParam("businessId");//获取审批单ID
        // 根据审批单ID获取页面数据
        getInfoByAppId(applyId);
        //todo 根据审批单ID加载晋升晋级列表
        initChangeList();
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
                $("#topic").html(data.result.name);//主题
                $("#code").html(data.result.code);//单据号
                $("#createrName").html(data.result.createrName);//制单人
                $("#applicantName").html(data.result.applicantName);//经办人
                $("#companyName").html(data.result.companyName);
                $("#deptName").html(data.result.deptName);
                var applyDate = (data.result.applyDate ==''|| data.result.applyDate == undefined)?"":changeTimeStyle(data.result.applyDate).Format("yyyy-MM-dd");
                $("#applyDate").html(applyDate);
                var status = data.result.status;
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#statusValue").html(statusValue);
                $("#approvalDate").html(data.result.approvalDate);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 初始化变动信息列表 为批量调整设置分页
     */
    function initChangeList(){
        applicationUUID = $.xljUtils.getUrlParam("businessId");
        jQuery("#empUprankApplyForm").jqGrid(
            {
                url : baseUrl+'emp/hrUpRankInfoTmp/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
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
                    {name : 'subsidyRankBefore',label : 'subsidyRankBefore',editable:true,sortable:false,align:'center',formatter:subsidyRank},
                    {name : 'telSubsidyBefore',label : 'telSubsidyBefore',editable:true,sortable:false,align:'center',hidden:true},
                    {name : 'tranSubsidyBefore',label : 'tranSubsidyBefore',editable:true,sortable:false,align:'center'},
                    {name : 'houseSubsidyBefore',label : 'houseSubsidyBefore',editable:true,sortable:false,align:'center'},
                    {name : 'subsidyRankAfter',label : 'subsidyRankAfter',editable:true,sortable:false,align:'center',formatter:subsidyRank},
                    {name : 'telSubsidyAfter',label : 'telSubsidyAfter',editable:true,sortable:false,align:'center',hidden:true},
                    {name : 'tranSubsidyAfter',label : 'tranSubsidyAfter',editable:true,sortable:false,align:'center'},
                    {name : 'houseSubsidyAfter',label : 'houseSubsidyAfter',editable:true,sortable:false,align:'center'},
                    {name : 'telPercent',label : 'telPercent',editable:true,sortable:false,align:'center',hidden:true},
                    {name : 'tranPercent',label : 'tranPercent',editable:true,sortable:false,align:'center'},
                    {name : 'housePercent',label : 'housePercent',editable:true,sortable:false,align:'center'},
                    {name : 'cause',label : 'cause',editable:true,sortable:false,align:'center'},
                    {name : 'type',label : 'type',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'wageRankBefore',label : 'wageRankBefore',editable:true,sortable:false,align:'center',formatter:wageRank},
                    {name : 'salBefore',label : 'salBefore',editable:true,sortable:false,align:'center'},
                    {name : 'wageRankAfter',label : 'wageRankAfter',editable:true,sortable:false,align:'center',formatter:wageRank},
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
                    }
                }
            });
    }

    //todo 职级翻译
    function subsidyRank(cellValue, options, rowObject){
        if(cellValue == "其它"){
            return "其它";
        }else if(cellValue == "" || cellValue == undefined){
            return "";
        }else{
            return $.hrUtils.getHRCodeNameById(cellValue);
        }
    }

    //todo 薪资翻译
    function wageRank(cellValue, options, rowObject){
        if(cellValue == "其它"){
            return "其它";
        }else if(cellValue == "" || cellValue == undefined){
            return "";
        }else{
            return $.hrUtils.getHRCodeNameById(cellValue);
        }
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
    };

    //针对IE进行时间转换
    function changeTimeStyle(bTime){
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1]+'/'+timeDate[2]+'/'+timeDate[0];
        var later = new Date(bTime);
        return later;
    }

})(jQuery, window, document)