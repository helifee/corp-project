;(function($, window, document, undefined){

    var oper;//操作类型
    var personUUID;//人员ID主键
    var applicationUUID='';//审批单主键
    var personId;
    var img = $('#preImg');
    var applyId;//审批单ID
    var saveFlag = true;//保存标志默认为true
    var applyFlag = false;//发起审批标志位
    var createrId='';


    //上来就执行
    $(function(){
        $('title').text("员工入职查看");
        $(".xj-form-title").text("员工入职查看");
        saveFlag = false;
        //根据id获取页面信息
        applicationUUID = $.xljUtils.getUrlParam("id");//获取审批单ID
        // 根据审批单ID获取页面数据
        getInfoByAppId(applicationUUID);//将异步请求改为同步
        personId = $("#personId").attr("value");//获取人员ID
        //保存窗口
        $("#saveBtn").unbind('click').on('click',function () {
            saveOrUpdate();
        });

        //关闭窗口
        $("#closeBtn").click(function () {
            window.close();
        });

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
//         jQuery("#hrEmpFamilyForm").jqGrid(
//             {
//                 url : baseUrl+'emp/hrEmpFamilyTmp/queryList',//创建完成之后请求数据的url
//                 datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
//                 mtype : "post",//向后台请求数据的ajax的类型。可选post,get
//                 ajaxGridOptions: { contentType: 'application/json' },
//                 contentType : "application/json",
//                 autowidth:true,
//                 colNames : [ 'id','关系','姓名','出生日期','工作单位','职务'],
//                 colModel : [
//                     {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align : "center"},
//                     {name : 'relation',label : 'relation',editable:true,width : 60,sortable:false,align : "center",formatter:$.hrUtils.getHRCodeNameById},
//                     {name : 'name',label : 'name',editable:true,width : 60,sortable:false,align : "center"},
//                     {name : 'birth',label : 'birth',editable:true,width : 60,sortable:false,align : "center",formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
//                     {name : 'org',label : 'org',editable:true,width : 60,sortable:false,align : "center"},
//                     {name : 'headship',label : 'headship',editable:true,width : 60,sortable:false,align : "center"}
//                 ],
//                 postData:{"applyId":applicationUUID},
//                 multiselect : true,
//                 multiboxonly:true,
//                 rownumbers:true,
//                 jsonReader : {
//                     root:"result",
//                     repeatitems : false
//                 },
//                 ondblClickRow:function(rowid){
// //            	window.open(openUrl+"?oper=detail&id="+rowid);
//                     //跳转编辑页
//                     /* rowData = $('#demoList').jqGrid('getRowData',rowid);
//                      window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));*/
//                 },
//                 onCellSelect: function(){
//                     /*if(rowDataBefore!=null&&rowDataBefore!='undefined'){
//                      //重新选择行时清除上一次选中行的样式
//                      $('#demoList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
//                      }*/
//                 },
//                 onSelectRow: function () {
//                     var rowId=$('#hrEmpFamilyForm').jqGrid("getGridParam","selrow");
//                     rowData = $('#hrEmpFamilyForm').jqGrid('getRowData',rowId);
//                 },
//                 rowNum:-1,
//                 loadError:function(xhr,status,error){
//                     //异常处理
//                     console.log(xhr.status);
//                     if(xhr.status==404){
//                         $.xljUtils.tip("red","请求url有误！");
//                         return;
//                     }
//                     if(xhr.status==405){
//                         $.xljUtils.tip("red","请求方法有误！");
//                         return;
//                     }
//                     $.xljUtils.tip("red","网络异常,请联系管理员！");
//
//
//                 },
//                 loadComplete:function(xhr){
//                     console.log(xhr);
//                     if(!xhr.success){
//                         switch (xhr.code) {
//                             case "50000":
//                                 $.xljUtils.tip("red",xhr.msg);
//                                 break;
//                             case "50001":
//                                 $.xljUtils.tip("red",xhr.msg);
//                                 break;
//                             case "50002":
//                                 $.xljUtils.tip("blue",xhr.msg);
//                                 break;
//                             case "50003":
//                                 $.xljUtils.tip("red",xhr.msg);
//                                 break;
//
//                             default:
//                                 $.xljUtils.tip("red","查询数据失败！");
//                                 break;
//                         }
//                     }else{
//                         $.xljUtils.addGridScroll();
//                         $.xljUtils.gridResizeFn();
//                     }
//                 }
//             });
    });










    //薪资等级格式化
    function getWageRank(param){
        var name = $.hrUtils.getHRCodeNameById(param);
        return name  == ''? '其它' : name;
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

                $("#applicationForm").find("input[name='type']").val(data.result.type);

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
                // $("#name").val(data.result[0].name);
                $("#name").html(data.result[0].name);
                // $("#sex").val(data.result[0].sex);
                $("#sex_name").html($.hrUtils.getHRCodeNameById(data.result[0].sex));
                var birth = (data.result[0].birth == '' || data.result[0].birth == null)?'':changeTimeStyle(data.result[0].birth).Format("yyyy-MM-dd");
                $("#birth").html(birth);
                if(birth != ''){
                    //todo 年龄赋值
                    var age = new Date().getYear() - new Date(birth).getYear();
                    $("#ageOfEmp").html(age);
                }
                // $("#nationality").val(data.result[0].nationality);
                var nationalityName = $.hrUtils.getHRCodeNameById(data.result[0].nationality);
                if(nationalityName != ''){
                    $("#nationality_name").html(nationalityName);
                }
                // $("#idType").val(data.result[0].idType);
                var idTypeName = $.hrUtils.getHRCodeNameById(data.result[0].idType);
                if(idTypeName != ''){
                    $("#idType_name").html(idTypeName);
                }
                $("#idCard").html(data.result[0].idCard);
                // $("#orgId").val(data.result[0].orgId);
                var orgName = $.hrUtils.getHRPrefixOrgNameById(data.result[0].orgId);
                if(orgName != ''){
                    $("#orgName").html(orgName);
                }
                // $("#postId").val(data.result[0].postId);
                $("#postName").html(data.result[0].postName);
                // $("#headshipRank").val(data.result[0].headshipRank);
                $("#headshipRank_name").html($.hrUtils.getHRCodeNameById(data.result[0].headshipRank));
                $("#account").val(data.result[0].account);
                // $("#maxEducation").val(data.result[0].maxEducation);
                var maxEducationName = $.hrUtils.getHRCodeNameById(data.result[0].maxEducation);
                if(maxEducationName != ''){
                    $("#maxEducation_name").html(maxEducationName);
                }
                // $("#maxDegree").val(data.result[0].maxDegree);
                var maxDegreeName = $.hrUtils.getHRCodeNameById(data.result[0].maxDegree);
                if(maxDegreeName != ''){
                    $("#maxDegree_name").html(maxDegreeName);
                }
                // $("#partyFigure").val(data.result[0].partyFigure);
                var partyFigureName = $.hrUtils.getHRCodeNameById(data.result[0].partyFigure);
                if(partyFigureName != ''){
                    $("#partyFigure_name").html(partyFigureName);
                }
                // $("#folk").val(data.result[0].folk);
                var folkName = $.hrUtils.getHRCodeNameById(data.result[0].folk);
                if(folkName != ''){
                    $("#folk_name").html(folkName);
                }
                if(data.result[0].workTime != '' && data.result[0].workTime != undefined){
                    var workTime = (data.result[0].workTime == null || data.result[0].workTime == '')?'':changeTimeStyle(data.result[0].workTime).Format("yyyy-MM-dd");
                    $("#workTime").html(workTime);
                }
                if(data.result[0].workTime != '' && data.result[0].workTime != undefined){
                    var UToTime = changeTimeStyle(data.result[0].workTime).Format("yyyy-MM-dd");
                    var aDate = UToTime.split("-");
                    var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
                    var myDate = new Date();
                    var dif = myDate.getTime() - NewDate.getTime();
                    myDate.setTime(dif);
                    $("#workAge").html(myDate.getFullYear() - 1970);//计算工龄
                }else{
                    $("#workAge").html(0);//计算工龄
                }
                if(data.result[0].entryTime != null){
                    var entryTime = (data.result[0].entryTime == null || data.result[0].entryTime==null)?'':changeTimeStyle(data.result[0].entryTime).Format("yyyy-MM-dd");
                    $("#entryTime").html(entryTime);
                }
                $("#perviousArea").html(data.result[0].perviousArea);
                $("#residence").html(data.result[0].residence);
                // $("#socialPayArea").val(data.result[0].socialPayArea);
                var socialPayAreaName = (data.result[0].socialPayArea==""||data.result[0].socialPayArea==undefined)?"":$.hrUtils.getHRCodeNameById(data.result[0].socialPayArea);
                $("#socialPayArea_name").html(socialPayAreaName);
                // $("#fundPayArea").val(data.result[0].fundPayArea);
                var fundPayArea = (data.result[0].fundPayArea == "" || data.result[0].fundPayArea == undefined)?"":$.hrUtils.getHRCodeNameById(data.result[0].fundPayArea);
                $("#fundPayArea_name").html(fundPayArea);
                // $("#workPlaceRank").val(data.result[0].workPlaceRank);
                var workPlaceRankName = (data.result[0].workPlaceRank==""||data.result[0].workPlaceRank == undefined)?"":$.hrUtils.getHRCodeNameById(data.result[0].workPlaceRank);
                $("#workPlaceRank_name").html(workPlaceRankName);
                $("#workPlace").val(data.result[0].workPlace);
                var workPlaceName= (data.result[0].workPlace=="" || data.result[0].workPlace == undefined)?"":$.hrUtils.getHRCodeNameById(data.result[0].workPlace);
                $("#workPlace_name").html(workPlaceName);
                $("#emergency").html(data.result[0].emergency);
                $("#emergencyTel").html(data.result[0].emergencyTel);
                $("#homePlace").html(data.result[0].homePlace);
                $("#email").html(data.result[0].email);
                // $("#marry").val(data.result[0].marry);
                var marryName = (data.result[0].marry==""||data.result[0].marry==undefined)?"":$.hrUtils.getHRCodeNameById(data.result[0].marry);
                $("#marry_name").html(marryName);
                // $("#deptId").val(data.result[0].deptId);
                var deptName= (data.result[0].deptId == null || data.result[0].deptId == undefined)?"":$.hrUtils.getHROrgNameById(data.result[0].deptId);
                $("#deptId_name").html(deptName);
                // $("#postType").val(data.result[0].postType);
                // $("#postType_name").val($.hrUtils.getHRCodeNameById(data.result[0].postType));
                var graduateDate = (data.result[0].graduateDate == null || data.result[0].graduateDate==null)?'':changeTimeStyle(data.result[0].graduateDate).Format("yyyy-MM-dd");
                $("#graduateDate").html(graduateDate);
                //$("#bloodType").val(data.result[0].bloodType);
                var bloodType = (data.result[0].bloodType == "" || data.result[0].bloodType == undefined)?"":$.hrUtils.getHRCodeNameById(data.result[0].bloodType);
                $("#bloodType_name").html(bloodType);
                // $("#outlander").val(data.result[0].outlander);
                // $("#outlander_name").val($.hrUtils.getHRCodeNameById(data.result[0].outlander));
                // $("#health").val(data.result[0].health);
                var healthName = (data.result[0].health == "" || data.result[0].health ==undefined)?"":$.hrUtils.getHRCodeNameById(data.result[0].health);
                $("#health_name").html(healthName);
                $("#phone").html(data.result[0].phone);
                // $("#personType").val(data.result[0].personType);
                var personTyepName = (data.result[0].personType == "" || data.result[0].personType == undefined)?"":$.hrUtils.getHRCodeNameById(data.result[0].personType);
                $("#personType_name").html(personTyepName);
                // $("#recruitCannelId").val(data.result[0].recruitCannelId);
                var recruitCannelIdName = (data.result[0].recruitCannelId == "" ||data.result[0].recruitCannelId==undefined)?"":$.hrUtils.getHRCodeNameById(data.result[0].recruitCannelId);
                $("#recruitCannelId_name").html(recruitCannelIdName);
                $("#personCode").html(data.result[0].personCode);
                // if(data.result[0].retireDate != null){
                //     var retireDate = (data.result[0].retireDate == '' || data.result[0].retireDate == null)?'':changeTimeStyle(data.result[0].retireDate).Format("yyyy-MM-dd");
                //     $("#retireDate").val(retireDate);//退休时间
                // }
                if(data.result[0].holdHeadshipTime != null){
                    var holdHeadshipTime = (data.result[0].holdHeadshipTime == '' || data.result[0].holdHeadshipTime== undefined)?'':changeTimeStyle(data.result[0].holdHeadshipTime).Format("yyyy-MM-dd");
                    $("#holdHeadshipTime").html(holdHeadshipTime);
                }
                if(data.result[0].regularTime != null){
                    var regularTime = (data.result[0].regularTime ==''|| data.result[0].regularTime==undefined)?'':changeTimeStyle(data.result[0].regularTime).Format("yyyy-MM-dd");
                    $("#regularTime").html(regularTime);
                }
                // $("#wageId").val(data.result[0].wageId);
                var wageName = getRank(data.result[0].wageId);
                $("#wageId_name").html(wageName);
                // $("#wageAllowanceId").val(data.result[0].wageAllowanceId);
                var wageAllowanceName = getRank(data.result[0].wageAllowanceId);
                $("#wageAllowanceId_name").html(wageAllowanceName);
                $("#workPhone").html(data.result[0].workPhone);
                // $("#kqType").val(data.result[0].kqType);
                var kqTypeName = (data.result[0].kqType == "" || data.result[0].kqType == undefined)?"":$.hrUtils.getHRCodeNameById(data.result[0].kqType);
                $("#kqType_name").html(kqTypeName);
                if(data.result[0].entryOrgTime != null){
                    var entryOrgTime = (data.result[0].entryOrgTime == '' || data.result[0].entryOrgTime == null)?'':changeTimeStyle(data.result[0].entryOrgTime).Format("yyyy-MM-dd");
                    $("#entryOrgTime").html(entryOrgTime);
                }
                $("#remark").html(data.result[0].remark);
                $("#nowPlace").html(data.result[0].nowPlace);//现住址
                if(data.result[0].photo != '' && data.result[0].photo != undefined){
                    $("#preImg").attr("src","data:image/jpeg;base64,"+data.result[0].photo);
                    $("#preImg").attr("height",180);
                    $("#preImg").attr("width",142);
                }else{
                    $("#preImg").attr("src","/platform-app/common/img/defaultPic.png");
                }
                $("#nativePlace").html(data.result[0].nativePlace);//籍贯
                $("#archivePlace").html(data.result[0].archivePlace);//档案所在地
                //todo 新增字段
               // $("#siPayArea").val(data.result[0].siPayArea);//公积金缴纳地
                var siPayArea_name = (data.result[0].siPayArea == '' || data.result[0].siPayArea== null)?'':$.hrUtils.getHRCodeNameById(data.result[0].siPayArea);
                $("#siPayArea_name").html(siPayArea_name);

                //$("#postLevel").val(data.result[0].postLevel);//岗位层级
                var postLevel_name = (data.result[0].postLevel == '' || data.result[0].postLevel== null)?'':$.hrUtils.getHRCodeNameById(data.result[0].postLevel);
                $("#postLevel_name").html(postLevel_name);

                //$("#compileType").val(data.result[0].compileType);//编制属性
                var compileType_name = (data.result[0].compileType == '' || data.result[0].compileType== null)?'':$.hrUtils.getHRCodeNameById(data.result[0].compileType);
                $("#compileType_name").html(compileType_name);
                //$("#firstEducation").val(data.result[0].firstEducation);//第一学历
                var firstEducation_name = (data.result[0].firstEducation == '' || data.result[0].firstEducation== null)?'':$.hrUtils.getHRCodeNameById(data.result[0].firstEducation);
                $("#firstEducation_name").html(firstEducation_name);
                //$("#firstDegree").val(data.result[0].firstDegree);//第一学位
                var firstDegree_name = (data.result[0].firstDegree == '' || data.result[0].firstDegree== null)?'':$.hrUtils.getHRCodeNameById(data.result[0].firstDegree);
                $("#firstDegree_name").html(firstDegree_name);
                var functionsName = (data.result[0].functions=="" || data.result[0].functions == undefined)?"":$.hrUtils.getHROrgNameById(data.result[0].functions);
                $("#functionsName").html(functionsName);
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


})(jQuery, window, document);