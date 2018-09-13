/**
 * 员工信息编辑js
 */

;
(function ($, window, document, undefined) {
    var codeFilelds = [];//定义自定义代码项
    var personId;// 人员ID
    var rowData;    //行数据
    var focusId;
    //证件类型回调函数
    // var idTypeOptions;
    // idTypeOptions = {
    //     title:'选择代码',//选择器标题，默认是'选择组织机构'
    //     selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
    //     treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
    //     treeParam:{'code_set_id':1058},//生成zTree树的请求参数
    //     targetId:null,//选择的数据的ID存储input域的id
    //     targetName:null,//选择的数据的Name存储input域
    //     saveCallback:function (selectData) {
    //         $("#idType").val(selectData.id);
    //         $("#idType_name").val(selectData.name);
    //         //todo 如果选择身份证追加校验
    //         if(selectData.name =='身份证'){
    //
    //         }
    //     }
    // };
    // $('.hr-single-selector-idType'). xljSingleSelector(idTypeOptions);



    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    };

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


    //上来就执行
    $(function () {
        // $(".btn").show(); //开发时使用
        // $(".col-md-9").show(); //开发时使用
        // $("[name='xinchoubiandong']").show();//开发时使用
        // $("[name='buzhubiandong']").show();//开发时使用

        //导航设置
        //todo 人员基本信息
        $("#empPersonInfoLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#personInfoList").offset().top-70},100);
        });
        //todo 工作经历
        $("#empWorkHistoryLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#empWorkHistoryList").offset().top-70},100);
        });
        //todo 教育经历
        $("#hrEmpEducationLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrEmpEducationList").offset().top-70},100);
        });
        //todo 家庭信息
        $("#hrEmpFamilyLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrEmpFamilyList").offset().top-70},100);
        });
        //todo 变动情况
        $("#hrEmpChangeLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrEmpChangeList").offset().top-70},100);
        });
        //todo 培训信息
        $("#hrOjtTrainLink").click(function(){
            $("html,body").animate({scrollTop:$("#hrOjtTrainList").offset().top-70},100);
        });
        //todo 考核信息
        $("#hrEvaExamineLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrEvaExamineList").offset().top-70},100);
        });
        //todo 语言能力
        $("#hrEmpLanguageAbilityLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrEmpLanguageAbilityList").offset().top-70},100);
        });
        //todo 专业资格认证
        $("#hrEmpMajorLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrEmpMajorList").offset().top-70},100);
        });
        //todo 奖惩信息
        $("#hrEmpRewardPunishLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrEmpRewardPunishList").offset().top-70},100);
        });

        //todo 职称信息
        $("#hrEmpOccupationLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrEmpOccupationList").offset().top-70},100);
        });

        //todo 招聘信息
        $("#hrRecRecruitLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrRecRecruitList").offset().top-70},100);
        });
        //todo 补助变动信息
        $("#hrWageSubchangeInfoLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrWageSubchangeInfoList").offset().top-70},100);
        });
        //todo 任职信息
        $("#hrEmpOfficeLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrEmpOfficeList").offset().top-70},100);
        });
        //todo 薪酬变动信息
        $("#hrWageChangeLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("#html,body").animate({scrollTop:$("#hrWageChangeList").offset().top-70},100);
        });
        //todo 合同签订信息
        $("#hrContSignLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrContSignList").offset().top-70},100);
        });
        //todo 附件信息
        $("#hrEmpAttachmentLink").click(function(){
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            $("html,body").animate({scrollTop:$("#hrEmpAttachmentList").offset().top-70},100);
        });

        //根据id加载数据
        personId = $.xljUtils.getUrlParam("id");

        //todo 初始化上传控件
        initUpload();

        $("#savefujianBtn").click(function(){
            var result = $('.attachment-container').xljAttachmentSubmit();
            console.info(result);
            $.xljUtils.tip("blue", "附件上传成功！");

            //修改附件
            //$('.attachment-container').xljAttachment({appId:'HR',businessId:personId,categoryId:ATTACH_TYPE_PERSON,mode:'edit',serverAddr:ATTACH_SERVERADDR});
        });

        // $("#downfujianBtn").click(function(){
        //     $('.attachment-container').xljAttachment({appId:'HR',businessId:personId,categoryId:ATTACH_TYPE_PERSON,mode:'view',serverAddr:ATTACH_SERVERADDR});
        // });


        getEmpInfoSetById(personId);
        $("#iframeLocation,#leftlist").height($(window).height()-80);
        //todo 查询权限
        $.ajax({
            type:'POST',
            url:serviceUrl+"sys/sysUserInfo/queryAuthorizationBtnList",
            dataType:'JSON',
            contentType:'application/json',
            async:false,//设置为同步
            data:JSON.stringify({"menuCode":"zzrs"}),//组织人事的菜单
            success: function(json) {
                var list = json.result;
                $.each(list,function(index, value) {
                    for(var key in value){
                        if(key=="code" && value[key] =="xzAuthBtn"){
                            $("[name='xinchoubiandong']").show();
                            $("[name='buzhubiandong']").show();
                            $("#hrWageSubchangeInfoLink_li").show();
                            $("#hrWageChangeLink_li").show();
                        }
                        if(key=="code" && value[key] =="xzxgqxBtn"){  //基本信息保存
                            $("#savePeronInfoBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_workBtn"){   //工作经历
                            $("#add_del_update_workBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_eduBtn"){   //教育经历
                            $("#add_del_update_eduBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_familyBtn"){   //家庭信息
                            $("#add_del_update_familyBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_empChangeBtn"){   //变动信息
                            $("#add_del_update_empChangeBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_ojtBtn"){   //培训信息
                            $("#add_del_update_ojtBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_evaBtn"){   //考核信息
                            $("#add_del_update_evaBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_languageBtn"){   //语言能力信息
                            $("#add_del_update_languageBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_majorBtn"){   //专业资格认证信息
                            $("#add_del_update_majorBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_rewardPunishBtn"){   //奖惩情况信息
                            $("#add_del_update_rewardPunishBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_occupationBtn"){   //职称信息
                            $("#add_del_update_occupationBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_recRecruitBtn"){   //招聘信息
                            $("#add_del_update_recRecruitBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_leaveInfoBtn"){   //离职信息
                            $("#add_del_update_leaveInfoBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_wageSubchangeBtn"){   //补助变动信息
                            $("#add_del_update_wageSubchangeBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_officeBtn"){   //任职信息
                            $("#add_del_update_officeBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_wageChangeBtn"){   //薪酬变动信息
                            $("#add_del_update_wageChangeBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_update_contSignBtn"){   //合同签订信息
                            $("#add_del_update_contSignBtn").show();
                        }
                        if(key=="code" && value[key] =="add_del_fuJianBtn"){   //附件
                            $("#add_del_fuJianBtn").show();
                        }
                    }
                });
            },
            error:function(){
                //alert("error");
            }
        });

        //todo 上传图片
        $('#upload-button').click(function(){
            $('#photoPic').trigger('click');
            return false;
        });

        $("#closeBtn").click(function(){
            window.opener.parentReloadById(personId);
            window.close();
        });

        //添加员工工作经历
        $("#addWorkInfoBtn").click(function() {
            var id =  $("#idOfEmp").attr("value");
            var winObjEI = window.open('emp_workHistoy.html?id='+id+'&oper=add');
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    $("#workHistoryForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加教育经历
        $("#addEducationInfoBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_eduHistory.html?oper=add&id="+id);
            var isClose = 1;
             //关闭open页面时刷新父页面列表
             var loop = setInterval(function () {
             if (winObjEI.closed && isClose == 1) {
             isClose--;
             //重新加载人员信息
             reloadEmpInfoSetById(personId);
             // $("#eduHistoryForm").jqGrid().trigger('reloadGrid');
             }
             }, 1000);
        });

        //添加家庭信息
        $("#addHomeRelationBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_homeRelation.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrEmpFamilyForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加培训信息
        $("#addHrOjtTrainBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_hrOjtTrain.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrOjtTrainForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加考核信息
        $("#addHrEvaExamineBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_hrEvaExamine.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    $("#hrEvaExamineForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加语言能力
        $("#addHrEmpLanguageAbilityBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_languageAbility.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrEmpLanguageAbilityForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加变动情况
        $("#addHrEmpChangeInfoBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_hrEmpChange.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrEmpChangeForm").jqGrid().trigger('reloadGrid');
                    //重新加载人员信息
                    reloadEmpInfoSetById(personId);
                }
            }, 1000);
        });

        //添加专业资格认证
        $("#addHrEmpMajorBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_hrEmpMajor.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrEmpMajorForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加奖惩信息
        $("#addHrEmpRewardPunishBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_hrEmpRewardPunish.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrEmpRewardPunishForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //增加职称信息
        $("#addHrEmpOccupationBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_hrEmpOccupation.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrEmpOccupationForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加招聘信息
        $("#addHrRecRecruitBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_hrRecRecruit.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrRecRecruitForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加离职信息
        $("#addHrEmpLeaveInfoBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_hrEmpLeaveInfo.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    $("#hrEmpLeaveInfoForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加补助变更信息
        $("#addHrWageSubchangeBtn").click(function(){
            var id = $("#idOfEmp").val();//人员ID
            var orgId = $("#orgId").val();//机构ID
            var workPlaceRank = $("#workPlaceRank").val();//工作城市所在级别
            var wageAllowanceId= $("#wageAllowanceId").val();//补助等级
            var winObjEI = window.open("emp_hrWageSubchange.html?oper=add&id="+id+"&orgId="+orgId+"&workPlaceRank="+workPlaceRank+"&wageAllowanceId="+wageAllowanceId);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrWageSubchangeForm").jqGrid().trigger('reloadGrid');
                    //重新加载人员信息
                    reloadEmpInfoSetById(personId);
                }
            }, 1000);
        });

        //添加任职列表信息
        $("#addHrEmpOfficeBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_hrEmpOffice.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrEmpOfficeForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加薪酬变动信息
        $("#addHrWageChangeBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var org = $("#orgId").val();
            var winObjEI = window.open("emp_hrWageChange.html?oper=add&id="+id+"&org="+org);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    // $("#hrWageChangeForm").jqGrid().trigger('reloadGrid');
                    //重新加载人员信息
                    reloadEmpInfoSetById(personId);
                }
            }, 1000);
        });

        //添加合同信息
        $("#addHrContSignBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_hrContSign.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    $("#hrContSignForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //添加附件信息
        $("#addfujianBtn").click(function(){
            var id = $("#idOfEmp").attr("value");
            var winObjEI = window.open("emp_fujian.html?oper=add&id="+id);
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    $("#hrEmpAttachmentForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);
        });

        //批量删除工作经历
        $("#delWorkInfoBtn").click(function(){
            delWorkInfo();
        });

        //批量删除教育经历
        $("#deleteEducationInfoBtn").click(function(){
            deleteEducationInfo();
        });

        //批量删除家庭信息
        $("#deleteHomeRelationInfoBtn").click(function(){
            deleteHomeRelationInfo();
        });

        //批量删除培训信息
        $("#delHrOjtTrainBtn").click(function(){
            delHrOjtTrainInfo();
        });

        //批量删除考核信息
        $("#delHrEvaExamineBtn").click(function(){
            delHrEvaExamineInfo();
        });

        //批量删除语言能力列表
        $("#delHrEmpLanguageAbilityBtn").click(function(){
            delHrEmpLanguageAbilityInfo();
        });

        //批量删除变动信息
        $("#delHrEmpChangeInfoBtn").click(function(){
            delHrEmpChangeInfo();
        });

        //批量删除专业资格证书信息
        $("#delHrEmpMajorBtn").click(function(){
            delHrEmpMajorInfo();
        });

        //批量删除奖惩信息
        $("#delHrEmpRewardPunishBtn").click(function(){
            delHrEmpRewardPunishInfo();
        });

        //批量删除职称信息
        $("#delHrEmpOccupationBtn").click(function(){
            delHrEmpOccupationInfo();
        });

        //批量删除招聘信息
        $("#delHrRecRecruitBtn").click(function(){
            delHrRecRecruitInfo();
        });

        //批量删除离职信息
        $("#delHrEmpLeaveInfoBtn").click(function(){
            delHrEmpLeaveInfo();
        });

        //批量删除任职信息
        $("#delHrEmpOfficeBtn").click(function(){
            delHrEmpOfficeInfo();
        });

        //批量删除薪酬变动信息
        $("#delHrWageChangeBtn").click(function(){
            delHrWageChangeInfo();
        });

        //批量删除补助变动信息
        $("#delHrWageSubchangeBtn").click(function(){
            delHrWageSubchangeInfo();
        });

        //批量刪除合同信息
        $("#delHrContSignBtn").click(function(){
            delHrContSignInfo();
        });

        //修改工作经历
        $("#editorWorkInfoBtn").click(function(){
            var idsVal = $('#workHistoryForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_workHistoy.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#workHistoryForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }



           /* var isClose = 1;
            alert(winObjEI.closed && isClose == 1 + "2");
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                alert(winObjEI.closed && isClose == 1 + "1");
                if (winObjEI.closed && isClose == 1) {
                    alert(winObjEI.closed && isClose == 1);
                    isClose--;
                    $("#workHistoryForm").jqGrid().trigger('reloadGrid');
                }
            }, 1000);*/
        });

        //修改教育经历
        $("#editEducationInfoBtn").click(function(){
            var idsVal = $('#eduHistoryForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_eduHistory.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                     //关闭open页面时刷新父页面列表
                     var loop = setInterval(function () {
                     if (winObjEI.closed && isClose == 1) {
                     isClose--;
                     //重新加载人员信息
                     reloadEmpInfoSetById(personId);
                     $("#eduHistoryForm").jqGrid().trigger('reloadGrid');
                     }
                     }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改家庭信息
        $("#editHomeRelationInfoBtn").click(function(){
            var idsVal = $('#hrEmpFamilyForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_homeRelation.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrEmpFamilyForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改培训信息
        $("#editorHrOjtTrainBtn").click(function(){
            var idsVal = $('#hrOjtTrainForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrOjtTrain.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrOjtTrainForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改考核信息
        $("#editorHrEvaExamineBtn").click(function(){
            var idsVal = $('#hrEvaExamineForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrEvaExamine.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrEvaExamineForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改语言能力信息
        $("#editorHrEmpLanguageAbilityBtn").click(function(){
            var idsVal = $('#hrEmpLanguageAbilityForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_languageAbility.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrEmpLanguageAbilityForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改变动信息
        $("#editorHrEmpChangeInfoBtn").click(function(){
            var idsVal = $('#hrEmpChangeForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrEmpChange.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrEmpChangeForm").jqGrid().trigger('reloadGrid');
                            //重新加载人员信息
                            reloadEmpInfoSetById(personId);
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改专业资格证书信息
        $("#editorHrEmpMajorBtn").click(function(){
            var idsVal = $('#hrEmpMajorForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrEmpMajor.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrEmpMajorForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改奖惩情况信息
        $("#editorHrEmpRewardPunishBtn").click(function(){
            var idsVal = $('#hrEmpRewardPunishForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrEmpRewardPunish.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrEmpRewardPunishForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改职称信息
        $("#editorHrEmpOccupationBtn").click(function(){
            var idsVal = $('#hrEmpOccupationForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrEmpOccupation.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrEmpOccupationForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改招聘信息
        $("#editorHrRecRecruitBtn").click(function(){
            var idsVal = $('#hrRecRecruitForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrRecRecruit.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrRecRecruitForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改离职信息
        $("#editorHrEmpLeaveInfoBtn").click(function(){
            var idsVal = $('#hrEmpLeaveInfoForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrEmpLeaveInfo.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrEmpLeaveInfoForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改任职信息
        $("#editorHrEmpOfficeBtn").click(function(){
            var idsVal = $('#hrEmpOfficeForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrEmpOffice.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrEmpOfficeForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改薪资变动信息
        $("#editorHrWageChangeBtn").click(function(){
            var idsVal = $('#hrWageChangeForm').jqGrid('getGridParam', 'selarrrow');
            var org = $("#orgId").val();
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrWageChange.html?id='+idsVal+'&oper=edit&org='+org);
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrWageChangeForm").jqGrid().trigger('reloadGrid');
                            //重新加载人员信息
                            reloadEmpInfoSetById(personId);
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改补助变动信息
        $("#editorHrWageSubchangeBtn").click(function(){
            var idsVal = $('#hrWageSubchangeForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var id = $("#idOfEmp").val();//人员ID
                    var orgId = $("#orgId").val();//机构ID
                    var workPlaceRank = $("#workPlaceRank").val();//工作城市所在级别
                    var wageAllowanceId= $("#wageAllowanceId").val();//补助等级
                    var rowData = $("#hrWageSubchangeForm").jqGrid('getRowData',idsVal[0]);
                    var flag = false;//修改的是否是最新数据
                    if(rowData.isLasterChange == '是'){
                        flag = true;
                    }
                    var winObjEI = window.open('emp_hrWageSubchange.html?id='+idsVal+'&oper=edit&orgId='+orgId+"&flag="+flag);
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrWageSubchangeForm").jqGrid().trigger('reloadGrid');
                            //重新加载人员信息
                            reloadEmpInfoSetById(personId);
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改合同信息
        $("#editorHrContSignBtn").click(function(){
            var idsVal = $('#hrContSignForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_hrContSign.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrContSignForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //修改附件信息
        $("#editfujianBtn").click(function(){
            var idsVal = $('#hrContSignForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var winObjEI = window.open('emp_fujian.html?id='+idsVal+'&oper=edit');
                    var isClose = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose == 1) {
                            isClose--;
                            $("#hrEmpAttachmentForm").jqGrid().trigger('reloadGrid');
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //填充员工工作经历列表
        getWorkHistoryList();

        //填充教育经历列表
        getEducationInfoList();

        //填充家庭信息列表
        getHrEmpFamilyInfoList();

        //填充培训信息列表
        getHrOjtTrainInfoList();

        //填充考核信息列表
        getHrEvaExamineInfoList();

        //填充语言能力列表
        getLanguageAbilityInfoList();

        //填充变动信息列表
        getHrEmpChangeInfoList();

        //填充专业资格认证列表
        getHrEmpMajorInfoList();

        //填充奖惩信息列表
        getHrEmpRewardPunishInfoList();

        //填充职称信息
        getHrEmpOccupationInfoList();

        //填充招聘信息
        getHrRecRecruitInfoList();

        //填充离职信息
        getHrEmpLeaveInfoList();

        //填充补助变动信息
        getHrWageSubchangeInfoList();

        //填充任职情况子集
        getHrEmpOfficeInfoList();

        //填充薪资变动信息列表
        getHrWageChangeInfoList();

        //填充合同签订信息
        getHrContSignInfoList();

        //填充附件列表信息
        //getHrEmpAttachmentInfoList();

        //保存人员信息
        $("#savePeronInfoBtn").on('click',function(){
            var idType = $("#idType_name").val();
            var validateResult = false;
            if(idType=="身份证"){
                validateResult = checkIdCardNo($("#idCardOfEmp").val()) ;
                if(!validateResult){
                    pop_tip_open("blue", "身份证未填写或者格式不正确！");
                }else{
                    $("#baseInfoForm").attr("data-validate-success", "window.savePersonInfo()");
                    $("#baseInfoForm").submit();
                }
            }else{
                $("#baseInfoForm").attr("data-validate-success", "window.savePersonInfo()");
                $("#baseInfoForm").submit();
            }
        });
    });

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


    //表单校验
    // function validForm(){
    //     var validRet = false;
    //     var idType = $("#idType_name").val();
    //     if(idType == "身份证"){
    //         $("#idCardOfEmp").attr("data-required",true);
    //         $.xljUtils.customSingleValidate("#idCardOfEmp");
    //         var validResult = $("#baseInfoForm").valid();
    //         if (validResult) {
    //             validRet = true;
    //         }
    //     }else{
    //         validRet = true;
    //     }
    //     return validRet;
    // }

    //todo 根据Id重新加载人员信息
    function reloadEmpInfoSetById(personId) {
        var uBody = "/emp/empPersonInfo/getEmpById/" + personId + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                $("#postId").attr("value",data.result.postId);//岗位ID
                var postName = (data.result.postId == '' || data.result.postId == undefined)?'':$.hrUtils.getHRPostNameById(data.result.postId);
                $("#postOfEmp").remove();//先移除
                $("#post").append("<li id='postOfEmp'>"+postName+"</li>");//职位名称
                $("#postName").attr("value",postName);//岗位名称
                $("#deptId").attr("value",data.result.deptId);
                $("#deptName").attr("value",$.hrUtils.getHROrgNameById(data.result.deptId));//部门名称
                $("#orgId").attr("value",data.result.orgId);//机构ID
                var orgName = $.hrUtils.getHRPrefixOrgNameById(data.result.orgId);
                if(orgName != null){
                    $("#orgName").attr("value",orgName);//机构名称
                }
                $("#workPlaceRank").val(data.result.workPlaceRank);//工作城市所在级别
                var workPlaceRank = (data.result.workPlaceRank == '' || data.result.workPlaceRank==null)?'':$.hrUtils.getHRCodeNameById(data.result.workPlaceRank);
                $("#workPlaceRank_name").val(workPlaceRank);
                $("#wageAllowanceId").val(data.result.wageAllowanceId);//补助职级
                var wageAllowanceId = getRank(data.result.wageAllowanceId);
                $("#wageAllowanceId_name").val(wageAllowanceId);
                $("#wageId").val(data.result.wageId);//薪资等级
                var wageId =getRank(data.result.wageId);
                $("#wageId_name").val(wageId);
                $("#headshipRank").val(data.result.headshipRank);//职级
                var headshipRank = (data.result.headshipRank == '' || data.result.headshipRank==null)?'':$.hrUtils.getHRCodeNameById(data.result.headshipRank);
                $("#headshipRank_name").val(headshipRank);

                // 第一学历
                $("#firstEducation").val(data.result.firstEducation);
                var firstEducation_name = (data.result.firstEducation == '' || data.result.firstEducation==null)?'':$.hrUtils.getHRCodeNameById(data.result.firstEducation);
                $("#firstEducation_name").val(firstEducation_name);
                // 第一学位
                $("#firstDegree").val(data.result.firstDegree);
                var firstDegree_name = (data.result.firstDegree == '' || data.result.firstDegree==null)?'':$.hrUtils.getHRCodeNameById(data.result.firstDegree);
                $("#firstDegree_name").val(firstDegree_name);
                //第一学历毕业学校
                $("#firstEducationSchool").val(data.result.firstEducationSchool);
                //第一学历所学专业
                $("#firstEducationProfession").val(data.result.firstEducationProfession);
                //最高学历
                $("#maxEducation").val(data.result.maxEducation);
                var maxEducation_name = (data.result.maxEducation == '' || data.result.maxEducation==null)?'':$.hrUtils.getHRCodeNameById(data.result.maxEducation);
                $("#maxEducation_name").val(maxEducation_name);
                //最高学位
                $("#maxDegree").val(data.result.maxDegree);
                var maxDegree_name = (data.result.maxDegree == '' || data.result.maxDegree==null)?'':$.hrUtils.getHRCodeNameById(data.result.maxDegree);
                $("#maxDegree_name").val(maxDegree_name);
                //最高学历毕业学校
                $("#maxEducationSchool").val(data.result.maxEducationSchool);
                //最高学历所学专业
                $("#maxEducationProfession").val(data.result.maxEducationProfession);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "加载人员信息失败，请重试！");
            }
        })
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
     * 保存人员信息
     * @param personId
     */
    window.savePersonInfo = function(saveImgFlag){
        var formData = new FormData();
        var baseInfoArr = $("#baseInfoForm").serializeArray();
        var empPersonInfoDto = {};
        empPersonInfoDto.delflag=false;//有效标志位
        empPersonInfoDto.id=personId;//人员主键
        for(var i in baseInfoArr){
            if(baseInfoArr[i].name.endWith("_name")){
                continue;
            }
            if(baseInfoArr[i].name == "birth" || baseInfoArr[i].name == "workTime" || baseInfoArr[i].name == "entryTime" || baseInfoArr[i].name == 'retireDate'){
                if(baseInfoArr[i].value != ''){
                    empPersonInfoDto[baseInfoArr[i].name]=baseInfoArr[i].value+" 00:00:00";
                }
                continue;
            }
            if(baseInfoArr[i].value != ''){
                empPersonInfoDto[baseInfoArr[i].name]=baseInfoArr[i].value;
                //todo 维护是否外籍
                if(baseInfoArr[i].name == "nationality"){
                    if($("#nationality").val() == "1066100104"){
                        empPersonInfoDto.outlander = '1009100037';//是否外籍(否)
                    }else{
                        empPersonInfoDto.outlander = '1009100036';//是否外籍（是）
                    }
                }
            }
        }
        //获取图片参数
        if($("#photoPic")[0].files[0] != undefined){
            formData.append("photo",$("#photoPic")[0].files[0]);
        }
        formData.append("empPersonInfoDto",JSON.stringify(empPersonInfoDto));
        $.ajax({
            type: "post",
            url:serviceUrl+ "emp/empPersonInfo/updateById/"+personId,//走自定义更新
            data: formData,
            processData:false,
            contentType:false,
            dataType: "json",
            success: function(data){
                if(saveImgFlag){
                    var windowURL = window.URL || window.webkitURL;
                    var loadImg = windowURL.createObjectURL(document.getElementById('photoPic').files[0]);
                    $("#imgLocation").empty();
                    $("#imgLocation").append("<img id='preImg' height='170' width='160'/>");
                    document.getElementById('preImg').setAttribute('src',loadImg);
                    pop_tip_open("blue","图片上传成功！");
                    saveImgFlag = false;
                }else{
                    pop_tip_open("blue","更新成功！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if(saveImgFlag){
                    pop_tip_open("blue","图片上传失败，请重试！");
                    saveImgFlag = false;
                }else {
                    pop_tip_open("red", "人员信息更新失败，请重试！");
                }
            }
        });
    };

    $(window).resize(function () {
        $("#iframeLocation,#leftlist").height($(window).height()-80);
    })

    //todo 根据Id加载人员信息
    function getEmpInfoSetById(personId) {
        var uBody = "/emp/empPersonInfo/getEmpById/" + personId + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                if(data.result.photo != '' && data.result.photo != undefined){
                    // $("#preImg").empty();
                    $("#imgLocation").append("<img id='preImg' src='data:image/jpeg;base64,"+data.result.photo+"' height='170' width='160'/>");
                }else{
                    $("#imgLocation").append("<img id='preImg' src='/hr-app/common/img/defaultPic.png' height='170' width='160'/>");
                }
                $("#imgLocation").attr("src","data:image/jpeg;base64,"+data.result.photo);
                $("#empName").append("<li id='nameOfEmp'>"+data.result.name+"</li>");//姓名
                $("#idOfEmp").attr("value",data.result.id);//人员ID
                $("#name").attr("value",data.result.name);//姓名
                $("#sex").val(data.result.sex);//性别（隐藏） 代码项
                if(data.result.sex != null){
                    $("#sex_name").val($.hrUtils.getHRCodeNameById(data.result.sex));
                }
                //$("#birthOfEmp").attr("value",new Date(data.result.birth).Format("yyyy-MM-dd"));//出生日期
                var birthOfEmp = (data.result.birth == '' || data.result.birth == undefined)?'':changeTimeStyle(data.result.birth).Format("yyyy-MM-dd");
                $("#birthOfEmp").attr("value",birthOfEmp);
                $("#idTypeOfEmp").attr("value",data.result.idType);//证件类型
                $("#idType").val(data.result.idType);//证件类型  （隐藏）
                if(data.result.idType != null){
                    $("#idType_name").val($.hrUtils.getHRCodeNameById(data.result.idType));
                }
                $("#idCardOfEmp").attr("value",data.result.idCard);//证件号码
                $("#deptId").attr("value",data.result.deptId);
                $("#deptName").attr("value",$.hrUtils.getHROrgNameById(data.result.deptId));//部门名称
                $("#orgId").attr("value",data.result.orgId);//机构ID
                var orgName = $.hrUtils.getHRPrefixOrgNameById(data.result.orgId);
                if(orgName != null){
                    $("#orgName").attr("value",orgName);//机构名称
                }
                $("#postId").attr("value",data.result.postId);//岗位ID
                var postName = (data.result.postId == '' || data.result.postId == undefined)?'':$.hrUtils.getHRPostNameById(data.result.postId);
                $("#post").append("<li id='postOfEmp'>"+postName+"</li>");//职位名称
                $("#postName").attr("value",postName);//岗位名称
                if(data.result.birth != '' && data.result.birth != undefined){
                    var birth = changeTimeStyle(data.result.birth);
                    var age = new Date().getYear() - birth.getYear();
                    $("#ageOfEmp").attr("value",age);//年龄
                }
                $("#nationality").attr("value",data.result.nationality);//国籍
                if(data.result.nationality != null){
                    $("#nationality_name").val($.hrUtils.getHRCodeNameById(data.result.nationality));
                }
                $("#marry").val(data.result.marry);//是否已婚
                if(data.result.marry != null){
                    $("#marry_name").val($.hrUtils.getHRCodeNameById(data.result.marry));//婚姻状态 代码项
                }
                $("#maxEducation").val(data.result.maxEducation);//最高学历
                if(data.result.maxEducation != null){
                    $("#maxEducation_name").val($.hrUtils.getHRCodeNameById(data.result.maxEducation));
                }
                $("#maxDegree").val(data.result.maxDegree);//最高学位
                if(data.result.maxDegree != null){
                    $("#maxDegree_name").val($.hrUtils.getHRCodeNameById(data.result.maxDegree));
                }

                $("#partyFigure").val(data.result.partyFigure);//政治面貌
                if(data.result.partyFigure != null){
                    $("#partyFigure_name").val($.hrUtils.getHRCodeNameById(data.result.partyFigure));
                }
                $("#folk").val(data.result.folk);//民族
                if(data.result.folk != null){
                    $("#folk_name").val($.hrUtils.getHRCodeNameById(data.result.folk));
                }
                var worktimeOfEmp = (data.result.workTime == '' || data.result.workTime == undefined)?'':changeTimeStyle(data.result.workTime).Format("yyyy-MM-dd");
                $("#worktimeOfEmp").attr("value",worktimeOfEmp);//参加工作时间
                if(data.result.workTime != '' && data.result.workTime != undefined){
                    var UToTime = $("#worktimeOfEmp").val();
                    var aDate = UToTime.split("-");
                    var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
                    var myDate = new Date();
                    var dif = myDate.getTime() - NewDate.getTime();
                    myDate.setTime(dif);
                    $("#workAge").val(myDate.getFullYear() - 1970);//计算工龄
                }else{
                    $("#workAge").val(0);//计算工龄
                }
                var entrytimeOfEmp = (data.result.entryTime == '' || data.result.entryTime == undefined)?'':changeTimeStyle(data.result.entryTime).Format("yyyy-MM-dd");
                $("#entrytimeOfEmp").attr("value",entrytimeOfEmp);//入职时间
                $("#perviousareaOfEmp").attr("value",data.result.perviousArea);//入职前所在地
                $("#residenceOfEmp").attr("value",data.result.residence);//户口所在地
                $("#socialPayArea").val(data.result.socialPayArea);//社保缴纳户口类型
                if(data.result.socialPayArea != null){
                    $("#socialPayArea_name").val($.hrUtils.getHRCodeNameById(data.result.socialPayArea));
                }
                $("#fundPayArea").val(data.result.fundPayArea);//公积金缴纳地

                if(data.result.fundPayArea != null){
                    $("#fundPayArea_name").val($.hrUtils.getHRCodeNameById(data.result.fundPayArea));
                }
                $("#workPlace").val(data.result.workPlace);//工作场所
                if(data.result.workPlace != null){
                    $("#workPlace_name").val($.hrUtils.getHRCodeNameById(data.result.workPlace));
                }
                $("#emergencyOfEmp").attr("value",data.result.emergency);//紧急联系人
                $("#emergencytelOfEmp").attr("value",data.result.emergencyTel);//紧急联系人电话
                $("#homeplaceOfEmp").attr("value",data.result.homePlace);//家庭住址
                $("#nowPlace").attr("value",data.result.nowPlace);//现住址
                $("#emailOfEmp").attr("value",data.result.email);//emain
                $("#nativePlace").attr("value",data.result.nativePlace);//籍贯
                $("#archivePlace").attr("value",data.result.archivePlace);//档案所在地
                $("#workPlaceRank").val(data.result.workPlaceRank);//工作城市所在级别
                var workPlaceRank = (data.result.workPlaceRank == '' || data.result.workPlaceRank==null)?'':$.hrUtils.getHRCodeNameById(data.result.workPlaceRank);
                $("#workPlaceRank_name").val(workPlaceRank);
                $("#wageAllowanceId").val(data.result.wageAllowanceId);//补助职级
                var wageAllowanceId = getRank(data.result.wageAllowanceId);
                $("#wageAllowanceId_name").val(wageAllowanceId);

                $("#wageId").val(data.result.wageId);//薪资等级
                var wageId = getRank(data.result.wageId);
                $("#wageId_name").val(wageId);

                $("#headshipRank").val(data.result.headshipRank);//职级
                var headshipRank = (data.result.headshipRank == '' || data.result.headshipRank==null)?'':$.hrUtils.getHRCodeNameById(data.result.headshipRank);
                $("#headshipRank_name").val(headshipRank);

                // 第一学历
                $("#firstEducation").val(data.result.firstEducation);
                var firstEducation_name = (data.result.firstEducation == '' || data.result.firstEducation==null)?'':$.hrUtils.getHRCodeNameById(data.result.firstEducation);
                $("#firstEducation_name").val(firstEducation_name);
                // 第一学位
                $("#firstDegree").val(data.result.firstDegree);
                var firstDegree_name = (data.result.firstDegree == '' || data.result.firstDegree==null)?'':$.hrUtils.getHRCodeNameById(data.result.firstDegree);
                $("#firstDegree_name").val(firstDegree_name);
                //第一学历毕业学校
                $("#firstEducationSchool").val(data.result.firstEducationSchool);
                //第一学历所学专业
                $("#firstEducationProfession").val(data.result.firstEducationProfession);
                //最高学历
                $("#maxEducation").val(data.result.maxEducation);
                var maxEducation_name = (data.result.maxEducation == '' || data.result.maxEducation==null)?'':$.hrUtils.getHRCodeNameById(data.result.maxEducation);
                $("#maxEducation_name").val(maxEducation_name);
                //最高学位
                $("#maxDegree").val(data.result.maxDegree);
                var maxDegree_name = (data.result.maxDegree == '' || data.result.maxDegree==null)?'':$.hrUtils.getHRCodeNameById(data.result.maxDegree);
                $("#maxDegree_name").val(maxDegree_name);
                //最高学历毕业学校
                $("#maxEducationSchool").val(data.result.maxEducationSchool);
                //最高学历所学专业
                $("#maxEducationProfession").val(data.result.maxEducationProfession);
                //离职时间
                var leaveTime = (data.result.leaveTime == '' || data.result.leaveTime == undefined)?'':changeTimeStyle(data.result.leaveTime).Format("yyyy-MM-dd");
                $("#leaveTime").val(leaveTime);
                //人员类别
                $("#personType").val(data.result.personType);
                var personType= (data.result.personType == '' || data.result.personType == undefined)?'':$.hrUtils.getHRCodeNameById(data.result.personType);
                $("#personType_name").val(personType);
                //社保缴纳地
                $("#siPayArea").val(data.result.siPayArea);//社保缴纳地
                var siPayArea= (data.result.siPayArea == '' || data.result.siPayArea == undefined)?'':$.hrUtils.getHRCodeNameById(data.result.siPayArea);
                $("#siPayArea_name").val(siPayArea);
                $("#phone").val(data.result.phone);//移动电话
                $("#account").val(data.result.account);//ERP帐号
                $("#functions").val(data.result.functions);//所属职能力
                var functions = (data.result.functions == '' ||data.result.functions==undefined )?"":$.hrUtils.getHROrgNameById(data.result.functions);
                $("#functionsName").val(functions);
                var entryOrgTime = (data.result.entryOrgTime == '' || data.result.entryOrgTime == undefined)?'':changeTimeStyle(data.result.entryOrgTime).Format("yyyy-MM-dd");
                $("#entryOrgTime").val(entryOrgTime);
                if(data.result.sysInfoItems != null && data.result.sysInfoItems != undefined){
                    if(data.result.sysInfoItems.length>0){
                        //追加新增字段
                        var newFields = data.result.newFields;//新增加字段
                        console.info("新增字段为空？");
                        console.info(newFields);
                        var sysInfoItems = data.result.sysInfoItems;//新增指标
                        console.info("字段");
                        console.info(sysInfoItems);
                        var arrList = createNewField(newFields,sysInfoItems);//构造新增字段
                        if(arrList.length > 0){
                            var str = '';//承接追加字符串
                            var arr ='';//承接遍历数组字符串
                            var flag = arrList.length % 2;//新增字段奇偶标识
                            $.each( arrList, function(i, n){
                                arr += arrList[i];//遍历两次
                                if( (i+1) >= 2 ){//保证i=0的时候不进入
                                    if( (i+1) % 2 == 0 ){
                                        str="<tr class='form-tr'>"+arr+"</tr>";
                                        $(str).appendTo($("#newField"));
                                        arr="";
                                    }
                                }
                                if(flag == 1){
                                    if(i+1 == arrList.length){//如果总数为奇数，那么数组最后一个元素需要特别处理
                                        str="<tr class='form-tr'>"+arr+"</tr>";
                                        $(str).appendTo($("#newField"));
                                        arr="";
                                    }
                                }
                            });
                        }
                    }
                }
                initTime();//todo 初始化时间控件
                //todo 初始化代码项
                if(codeFilelds.length>0){
                    for(var i=0;i<codeFilelds.length;i++){
                        var code = codeFilelds[i].code;
                        var codeSetId = codeFilelds[i].codeSetId;
                        initCodeItems(code,codeSetId);
                    }
                }
                commitValidateForm();//todo 校验新增字段
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "加载人员信息失败，请重试！");
            }
        })
    }

    /**
     * 构造新增字段数组
     */
    function createNewField(newFields,sysInfoItems){
        var arrList = new Array();
        $.each(sysInfoItems, function(i, n){
            if(n.editType == 1){//隐藏
                //隐藏字段不处理
            }else if(n.editType == 2){//只读*************************************************************
                if(n.type == 1){//整型
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' readonly='readonly' data-required='true' data-digits='true'  class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' readonly='readonly' data-required='true' data-digits='true' class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text'  readonly='readonly' data-digits='true'  class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text'  readonly='readonly' data-digits='true' class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 2){//小数
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' readonly='readonly' data-required='true' data-number='true'  class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' readonly='readonly' data-required='true' data-number='true' class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' readonly='readonly' data-number='true'  class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' readonly='readonly' data-number='true' class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 3){//字符
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' readonly='readonly' data-required='true'   class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' readonly='readonly' data-required='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' readonly='readonly' data-required='true'   class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' readonly='readonly' data-required='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 4){//备注
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'   class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'    class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'   class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 5){//8位日期
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'   class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'    class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'   class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 6){//6位日期
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'   class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'    class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'   class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 7){//代码项
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'   class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'    class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'   class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 8){//金钱
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'   class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'    class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'   class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 9){//时间
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'   class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly' data-required='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'    class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' readonly='readonly'   class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }
            }else if(n.editType == 3){//可编辑************************************************************
                if(n.type == 1){//整型
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-required='true' data-digits='true'  class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-required='true' data-digits='true' class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-digits='true' class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-digits='true' class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 2){//小数
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-required='true' data-number='true' class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text'  data-required='true' data-number='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-number='true'  class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-number='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 3){//字符
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-required='true' class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-required='true' class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 4){//备注
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' data-required='true'   class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea' data-required='true'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea'  class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='textarea'  class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 5){//8位日期
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                "<div class='input-group date form_datetime_8 form-date'  data-link-field='dtp_input1'>" +
                                "<input class='form-control' readonly='readonly' data-required='true' name='"+n.code+"' id='"+n.code+"' size='16' type='text' value=''  >" +
                                "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                "</div>"+
                                "</td>");
                        }else{
                            if(typeof(newFields[n.code]) == 'undefined'){
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_8 form-date'  data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly' data-required='true'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value=''  >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }else{
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_8 form-date'  data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly' data-required='true'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value='"+new Date(newFields[n.code]).Format("yyyy-MM-dd")+"'  >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                "<div class='input-group date form_datetime_8 form-date'  data-link-field='dtp_input1'>" +
                                "<input class='form-control' readonly='readonly'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value='' >" +
                                "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                "</div>"+
                                "</td>");
                        }else{
                            if(typeof(newFields[n.code]) == 'undefined'){
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_8 form-date'  data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value=''  >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }else{
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_8 form-date'  data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value='"+new Date(result).Format("yyyy-MM-dd")+"' >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }
                        }
                    }
                }else if(n.type == 6){//6位日期
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                "<div class='input-group date form_datetime_six form-date'  data-link-field='dtp_input1'>" +
                                "<input class='form-control' readonly='readonly' data-required='true' name='"+n.code+"' id='"+n.code+"' size='16' type='text' value=''  >" +
                                "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                "</div>"+
                                "</td>");
                        }else{
                            if(typeof(newFields[n.code]) == 'undefined'){
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_six form-date'  data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly' data-required='true'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value=''  >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }else{
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_six form-date'  data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly' data-required='true'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value='"+new Date(newFields[n.code]).Format("yyyy-MM")+"'  >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                "<div class='input-group date form_datetime_six form-date'  data-link-field='dtp_input1'>" +
                                "<input class='form-control' readonly='readonly' name='"+n.code+"' id='"+n.code+"' size='16' type='text' value='' >" +
                                "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                "</div>"+
                                "</td>");
                        }else{
                            if(typeof(newFields[n.code]) == 'undefined'){
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_six form-date'  data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value=''  >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }else{
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_six form-date'  data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value='"+new Date(result).Format("yyyy-MM")+"' >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }
                        }
                    }
                }else if(n.type == 7){//代码项
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label><span>*</span>"+n.name+"</label></td>" +
                                "<td>" +
                                "<div class='input-group form-date'>" +
                                "<input data-required='true' type='text' id='"+n.code+"_name'  class='form-control addInputWidth' readonly='readonly' placeholder='选择代码'/>" +
                                "<input type='hidden' id='"+n.code+"' name='"+n.code+"'  class='form-control addInputWidth'/>" +
                                "<div class='input-group-addon'>" +
                                "<a class='glyphicon glyphicon-remove' onclick='empty()'></a>" +
                                "</div>" +
                                "<span class='input-group-addon hr-single-selector-"+n.code+"' data-selectorType='hrSysCode' data-title='选择代码'" +
                                "data-savecallback=''  data-treeParam='{&quot;code_set_id&quot;:&quot;"+n.codeSetId+"&quot;}' data-targetname='"+n.code+"_name' data-targetId='"+n.code+"'>...</span>" +
                                "</div>" +
                                "</td>" );
	                            var codeSetId = n.codeSetId;
	                            var code = n.code;
	                            var codeItem = {"code":code,"codeSetId":codeSetId};
	                            codeFilelds.push(codeItem);
                        }else{
                            var fileName = newFields[n.code];
                            var fileValue = $.hrUtils.getHRCodeNameById(newFields[n.code]);
                            arrList.push("<td class='form-label'><label><span>*</span>"+n.name+"</label></td>" +
                                "<td>" +
                                "<div class='input-group form-date'>" +
                                "<input data-required='true' type='text' value='"+fileValue+"' id='"+n.code+"_name'  class='form-control addInputWidth' readonly='readonly' placeholder='选择代码'/>" +
                                "<input type='hidden' id='"+n.code+"' value='"+fileName+"' name='"+n.code+"' class='form-control addInputWidth'/>" +
                                "<div class='input-group-addon'>" +
                                "<a class='glyphicon glyphicon-remove' onclick='empty()'></a>" +
                                "</div>" +
                                "<span class='input-group-addon hr-single-selector-"+n.code+"' data-selectorType='hrSysCode' data-title='选择代码'" +
                                "data-savecallback=''  data-treeParam='{&quot;code_set_id&quot;:&quot;"+n.codeSetId+"&quot;}' data-targetname='"+n.code+"_name' data-targetId='"+n.code+"'>...</span>" +
                                "</div>" +
                                "</td>" );
                            var codeSetId = n.codeSetId;
                            var code = n.code;
                            var codeItem = {"code":code,"codeSetId":codeSetId};
                            codeFilelds.push(codeItem);
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label><span>*</span>"+n.name+"</label></td>" +
                                "<td>" +
                                "<div class='input-group form-date'>" +
                                "<input type='text' id='"+n.code+"_name' class='form-control addInputWidth' readonly='readonly' placeholder='选择代码'/>" +
                                "<input type='hidden' id='"+n.code+"' name='"+n.code+"' class='form-control addInputWidth'/>" +
                                "<div class='input-group-addon'>" +
                                "<a class='glyphicon glyphicon-remove' onclick='empty()'></a>" +
                                "</div>" +
                                "<span class='input-group-addon hr-single-selector-"+n.code+"' data-selectorType='hrSysCode' data-title='选择代码'" +
                                "data-savecallback=''  data-treeParam='{&quot;code_set_id&quot;:&quot;"+n.codeSetId+"&quot;}' data-targetname='"+n.code+"_name' data-targetId='"+n.code+"'>...</span>" +
                                "</div>" +
                                "</td>" );
                            var codeSetId = n.codeSetId;
                            var code = n.code;
                            var codeItem = {"code":code,"codeSetId":codeSetId};
                            codeFilelds.push(codeItem);
                        }else{
                            var fileName = newFields[n.code];
                            var fileValue = $.hrUtils.getHRCodeNameById(newFields[n.code]);
                            arrList.push("<td class='form-label'><label><span>*</span>"+n.name+"</label></td>" +
                                "<td>" +
                                "<div class='input-group form-date'>" +
                                "<input type='text' id='"+n.code+"_name' value='"+fileValue+"' class='form-control addInputWidth' readonly='readonly' placeholder='选择代码'/>" +
                                "<input type='hidden' id='"+n.code+"' value='"+fileName+"' name='"+n.code+"' class='form-control addInputWidth'/>" +
                                "<div class='input-group-addon'>" +
                                "<a class='glyphicon glyphicon-remove' onclick='empty()'></a>" +
                                "</div>" +
                                "<span class='input-group-addon hr-single-selector-"+n.code+"' data-selectorType='hrSysCode' data-title='选择代码'" +
                                "data-savecallback=''  data-treeParam='{&quot;code_set_id&quot;:&quot;"+n.codeSetId+"&quot;}' data-targetname='"+n.code+"_name' data-targetId='"+n.code+"'>...</span>" +
                                "</div>" +
                                "</td>" );
                            var codeSetId = n.codeSetId;
                            var code = n.code;
                            var codeItem = {"code":code,"codeSetId":codeSetId};
                            codeFilelds.push(codeItem);
                        }
                    }
                }else if(n.type == 8){//金钱
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-required='true'  data-number='true'  class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text'  data-required='true' data-number='true' class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-number='true'  class='form-control addInputWidth' name='"+n.code+"'/></td>");
                        }else{
                            var result = typeof(newFields[n.code]) == 'undefined'?'':newFields[n.code];//如果为undefined则转为空
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td><input type='text' data-number='true' class='form-control addInputWidth' name='"+n.code+"' value='"+result+"'/></td>");
                        }
                    }
                }else if(n.type == 9){//时间
                    if(n.isEmpty == 1){//必填
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                "<div class='input-group date form_datetime_timestamp form-date'  data-link-field='dtp_input1'>" +
                                "<input class='form-control' readonly='readonly' data-required='true' name='"+n.code+"' id='"+n.code+"' size='16' type='text' value=''  >" +
                                "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                "</div>"+
                                "</td>");
                        }else{
                            if(typeof(newFields[n.code]) == 'undefined'){
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_timestamp form-date'  data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly' data-required='true'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value=''  >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }else{
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_timestamp form-date'  data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly' data-required='true'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value='"+changeTimeStampStyle(newFields[n.code]).Format("yyyy-MM-dd hh:mm:ss")+"'  >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }
                        }
                    }else{
                        if(newFields == null){
                            arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                "<div class='input-group date form_datetime_timestamp form-date'  data-link-field='dtp_input1'>" +
                                "<input class='form-control' readonly='readonly'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value='' >" +
                                "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                "</div>"+
                                "</td>");
                        }else{
                            if(typeof(newFields[n.code]) == 'undefined'){
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_timestamp form-date' data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly' name='"+n.code+"' id='"+n.code+"' size='16' type='text' value=''  >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }else{
                                arrList.push("<td class='form-label'><label>"+n.name+"</label></td><td>" +
                                    "<div class='input-group date form_datetime_timestamp form-date' data-link-field='dtp_input1'>" +
                                    "<input class='form-control' readonly='readonly'  name='"+n.code+"' id='"+n.code+"' size='16' type='text' value='"+changeTimeStampStyle(newFields[n.code]).Format("yyyy-MM-dd hh:mm:ss")+"' >" +
                                    "<div class='input-group-addon'><span class='glyphicon glyphicon-remove' id='reset"+n.code+"'></span></div>"+
                                    "<span class='input-group-addon'><span class='glyphicon glyphicon-th'></span></span>"+
                                    "</div>"+
                                    "</td>");
                            }
                        }
                    }
                }
            }
        });
        console.info("数组信息");
        console.info(arrList);
        return arrList;
    }

    //todo 名称修改
    window.changeName = function(name){
        $("#nameOfEmp").html(name);
    }

    //todo 部门回调
    window.deptCallback = function(data){
        $("#deptName").val(data.name);
        $("#deptId").val(data.id);
        // $("#orgId").val(data.parentId);
        var parentId = data.parentId;
        if(data.parentId != '' && data.parentId != undefined){
            // $("#orgName").val($.hrUtils.getHRPrefixOrgNameById(parentId));
            $.ajax({
                type:'POST',
                url:serviceUrl+"emp/empPersonInfo/queryOrgInfo",
                dataType:'JSON',
                contentType:'application/json',
                // async:false,//设置为同步
                data:JSON.stringify({"parentId":parentId}),
                success: function(data){
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

    //todo 机构选择回调
    //  window.orgCallback = function (data) {
    //      $("#orgName").val(data.name);
    //      $("#orgId").val(data.id);
    //  }

    //todo 所属职能回调函数
    window.functionsCallback = function(data){
        $("#functions").val(data.id);
        $("#functionsName").val(data.name);
    };

    //todo 岗位选择回调函数
    window.postCallback = function(data){
        var deptId=$('#deptId').val();
        if(data.prefixId.indexOf(deptId)>-1){
            $("#postName").val(data.name);
            $("#postId").val(data.id);
            $("#postOfEmp").html(data.name);
        }else{
            var deptName=$('#deptName').val();
            pop_tip_open("blue",'只能选择'+deptName+"下的岗位");
            postCallback();
        }
    };



    //todo 获取人员工作经历信息
    function getWorkHistoryList(){
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
                    {name : 'witnessPhone',label : 'witnessPhone',editable:true,width : 60,sortable:false,align:'center'}
                ],
                postData:{"personId":personId},
                sortname: 'startTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect:true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#workHistoryForm').jqGrid('getRowData',rowid);
                    window.open('emp_workHistoy.html?id='+rowData.id+'&oper=edit');
                },

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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("#workHistoryForm").jqGrid('setSelection',focusId);
                    }
                }
            });
    }

    /**
     * 获取教育经历列表
     */
    function getEducationInfoList(){
        jQuery("#eduHistoryForm").jqGrid(
            {
                url : baseUrl+'/emp/hrEmpEducation/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','入学时间','毕业时间','学校名称','专业','学习形式','学历','学位','是否最高学历','是否最高学位'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'startTime',label : 'startTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'endTime',label : 'endTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'schooolName',label : 'schooolName',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'major',label : 'major',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'studyType',label : 'studyType',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'education',label : 'education',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'degree',label : 'degree',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'isMaxEducation',label : 'isMaxEducation',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'isMaxDegree',label : 'isMaxDegree',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                ],
                postData:{"personId":personId},
                sortname: 'startTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#eduHistoryForm').jqGrid('getRowData',rowid);
                    window.open('emp_eduHistory.html?id='+rowData.id+'&oper=edit');
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("#eduHistoryForm").setSelection(focusId);
                    }
                }
            });
    }

    /**
     * 获取家庭信息列表
     */
    function getHrEmpFamilyInfoList(){
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
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                sortname: 'createDate',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#hrEmpFamilyForm').jqGrid('getRowData',rowid);
                    window.open('emp_homeRelation.html?id='+rowData.id+'&oper=edit');
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("#hrEmpFamilyForm").setSelection(focusId);
                    }
                }
            });
    }

    /**
     * 加载培训信息列表
     */
    function getHrOjtTrainInfoList(){
        jQuery("#hrOjtTrainForm").jqGrid(
            {
                url : baseUrl+'emp/hrOjtTrain/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','课程','开始时间','结束时间'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'subjectId',label : 'subjectId',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'startTime',label : 'startTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'endTime',label : 'endTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'}
                ],
                postData:{"personId":personId},
                sortname: 'startTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#hrOjtTrainForm').jqGrid('getRowData',rowid);
                    window.open('emp_hrOjtTrain.html?id='+rowData.id+'&oper=edit');
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("#hrOjtTrainForm").setSelection(focusId);
                    }
                }
            });
    }

    /**
     * 加载考核信息列表
     */
    function getHrEvaExamineInfoList(){
        jQuery("#hrEvaExamineForm").jqGrid(
            {
                url : baseUrl+'emp/hrEvaExamine/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','考核归属年度','结果'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'examineYear',label : 'examineYear',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'result',label : 'result',editable:true,width : 60,sortable:false,align:'center'}
                ],
                postData:{"personId":personId},
                sortname: 'examineYear',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#hrEvaExamineForm').jqGrid('getRowData',rowid);
                    window.open('emp_hrEvaExamine.html?id='+rowData.id+'&oper=edit');
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("hrEvaExamineForm").setSelection(focusId);
                    }
                }
            });
    }

    /**
     * 加载语言能力列表
     */
    function getLanguageAbilityInfoList(){
        jQuery("#hrEmpLanguageAbilityForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpLanguageAbility/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','语种','等级','证书名称','获得时间','发证单位','证书编号','是否第二外语','是否最高等级'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'languageKind',label : 'languageKind',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'rank',label : 'rank',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'certifiedName',label : 'certifiedName',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'getTime',label : 'getTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'approvalOrg',label : 'approvalOrg',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'certificateCode',label : 'certificateCode',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'isSecondLanguage',label : 'isSecondLanguage',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'isMaxRank',label : 'isMaxRank',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById}
                ],
                postData:{"personId":personId},
                sortname: 'getTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#hrEmpLanguageAbilityForm').jqGrid('getRowData',rowid);
                    window.open('emp_languageAbility.html?id='+rowData.id+'&oper=edit');
                },
                onCellSelect: function(){
                    /*if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                     //重新选择行时清除上一次选中行的样式
                     $('#demoList '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                     }*/
                },
                onSelectRow: function () {
                    var rowId=$('#hrEmpLanguageAbilityForm').jqGrid("getGridParam","selrow");
                    rowData = $('#hrEmpLanguageAbilityForm').jqGrid('getRowData',rowId);
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("hrEmpLanguageAbilityForm").setSelection(focusId);
                    }
                }
            });
    }

    /**
     * 加载人员变动信息
     */
    function getHrEmpChangeInfoList(){
        jQuery("#hrEmpChangeForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpChange/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','变动类型','调动时间','调动前机构','调动前部门','调动前岗位','调动前职级','调动后机构','调动后部门','调动后岗位','调动后职级'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'type',label : 'type',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById },
                    {name : 'changeTime',label : 'changeTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'orgBefore',label : 'orgBefore',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHROrgNameById},
                    {name : 'deptBefpre',label : 'deptBefpre',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHROrgNameById},
                    {name : 'postBefore',label : 'postBefore',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRPostNameById},
                    {name : 'headshipRankBefore',label : 'headshipRankBefore',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'orgAfter',label : 'orgAfter',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHROrgNameById},
                    {name : 'deptAfter',label : 'deptAfter',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHROrgNameById},
                    {name : 'postAfter',label : 'postBefore',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRPostNameById},
                    {name : 'headshipRankAfter',label : 'headshipRankBefore',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById}
                ],
                postData:{"personId":personId},
                sortname: 'changeTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#hrEmpChangeForm').jqGrid('getRowData',rowid);
                    window.open('emp_hrEmpChange.html?id='+rowData.id+'&oper=edit');
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("#hrEmpChangeForm").setSelection(focusId);

                    }
                }
            });
    }

    /**
     * 加载专业资格认证
     */
    function getHrEmpMajorInfoList(){
        jQuery("#hrEmpMajorForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpMajor/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','名称','获得时间','发证单位','证书编号','等级','截止日期'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'name',label : 'name',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'getTime',label : 'getTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'approvalOrg',label : 'approvalOrg',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'certificateCode',label : 'certificateCode',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'rank',label : 'rank',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'endTime',label : 'endTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'}
                ],
                postData:{"personId":personId},
                sortname: 'getTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#hrEmpMajorForm').jqGrid('getRowData',rowid);
                    window.open('emp_hrEmpMajor.html?id='+rowData.id+'&oper=edit');
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("hrEmpMajorForm").setSelection(focusId);
                    }
                }
            });
    }

    /**
     * 加载奖惩信息列表
     */
    function getHrEmpRewardPunishInfoList(){
        jQuery("#hrEmpRewardPunishForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpRewardPunish/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','姓名','类型','原因','时间','批准机构'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'name',label : 'name',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'type',label : 'type',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'cause',label : 'cause',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'getTime',label : 'getTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'approvalOrg',label : 'approvalOrg',editable:true,width : 60,sortable:false,align:'center'}
                ],
                postData:{"personId":personId},
                sortname: 'getTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#hrEmpRewardPunishForm').jqGrid('getRowData',rowid);
                    window.open('emp_hrEmpRewardPunish.html?id='+rowData.id+'&oper=edit');
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("hrEmpRewardPunishForm").setSelection(focusId);
                    }
                }
            });

    }

    /**
     * 加载职称信息列表
     */
    function getHrEmpOccupationInfoList(){
        jQuery("#hrEmpOccupationForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpOccupation/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','职称','专业','获得时间','授予单位','证书编号','是否最高职称','级别'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'name',label : 'name',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'major',label : 'major',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'getTime',label : 'getTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'approvalOrg',label : 'approvalOrg',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'certificateCode',label : 'certificateCode',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'isMax',label : 'isMax',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'rank',label : 'rank',editable:true,width : 60,sortable:false,align:'center'}
                ],
                postData:{"personId":personId},
                sortname: 'getTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#hrEmpOccupationForm').jqGrid('getRowData',rowid);
                    window.open('emp_hrEmpOccupation.html?id='+rowData.id+'&oper=edit');
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("hrEmpOccupationForm").setSelection(focusId);
                    }
                }
            });
    }

    /**
     * 加载招聘信息
     */
    function getHrRecRecruitInfoList(){
        jQuery("#hrRecRecruitForm").jqGrid(
            {
                url : baseUrl+'emp/hrRecRecruit/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','渠道','总费用','已支付金额','剩余支付金额','本次支付金额','支付次数','支付时间','支付方式'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'channelId',label : 'channelId',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'totalCost',label : 'totalCost',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'alreadyPay',label : 'alreadyPay',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'surplusPay',label : 'surplusPay',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'thisPay',label : 'thisPay',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'payCounts',label : 'payCounts',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'time',label : 'time',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'payWay',label : 'payWay',editable:true,width : 60,sortable:false,align:'center'}
                ],
                postData:{"personId":personId},
                sortname: 'payCounts',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#hrRecRecruitForm').jqGrid('getRowData',rowid);
                    window.open('emp_hrRecRecruit.html?id='+rowData.id+'&oper=edit');
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("hrRecRecruitForm").setSelection(focusId);
                    }
                }
            });
    }

    /**
     * 加载离职信息
     */
    function getHrEmpLeaveInfoList(){
        jQuery("#hrEmpLeaveInfoForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpLeaveInfo/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','离职时间','离职类型','原因'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'leaveTime',label : 'leaveTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'leaveType',label : 'leaveType',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById },
                    {name : 'cause',label : 'cause',editable:true,width : 60,sortable:false,align:'center'}
                ],
                postData:{"personId":personId},
                sortname: 'leaveTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
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
                        //success
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },gridComplete:function(){
                var reccount = $("#hrEmpLeaveInfoForm").getGridParam("reccount");//获取行数
                var ids = $("#hrEmpLeaveInfoForm").getDataIDs();
                var id = ids[ids.length-1];
                $("#hrEmpLeaveInfoForm").setSelection(id);
            }
            });
    }

    //todo 翻译补助等级
    function formatSubRank(cellValue){
        if(cellValue=='其它'){
            return "其它";
        }else{
            return $.hrUtils.getHRCodeNameById(cellValue);
        }
    }

    /**
     * 加载补助变动信息列表
     */
    function getHrWageSubchangeInfoList(){
        jQuery("#hrWageSubchangeForm").jqGrid(
            {
                url : baseUrl+'emp/hrWageSubchange/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                shrinkToFit:false,
                autoScroll: false,
                colNames : [ 'id','变动前工作所在城市级别','变动前补助等级','变动前通讯补助','变动前交通补助','变动前住房补贴','变动后工作所在城市级别','变动后补助等级','变动后通讯补助','变动后交通补助','变动后住房补贴','生效时间','通讯补助变动幅度','交通补助变动幅度','住房补贴变动幅度','变动类型','是否最新变动','变动时间'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,sortable:false,hidden:true,align:'center'},
                    {name : 'workPlaceRankBefore',label : 'workPlaceRankBefore',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'rankBefore',label : 'rankBefore',editable:true,sortable:false,align:'center',formatter:formatSubRank},
                    {name : 'telSubsidyBefore',label : 'telSubsidyBefore',editable:true,sortable:false,align:'center',hidden:true},
                    {name : 'tranSubsidyBefore',label : 'tranSubsidyBefore',editable:true,sortable:false,hidden:true,align:'center'},
                    {name : 'houseSubsidyBefore',label : 'houseSubsidyBefore',editable:true,sortable:false,align:'center'},
                    {name : 'workPlaceRankAfter',label : 'workPlaceRankAfter',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'rankAfter',label : 'rankAfter',editable:true,sortable:false,align:'center',formatter:formatSubRank},
                    {name : 'telSubsidyAfter',label : 'telSubsidyAfter',editable:true,sortable:false,align:'center',hidden:true},
                    {name : 'tranSubsidyAfter',label : 'tranSubsidyAfter',editable:true,sortable:false,align:'center'},
                    {name : 'houseSubsidyAfter',label : 'houseSubsidyAfter',editable:true,sortable:false,align:'center'},
                    {name : 'effectTime',label : 'effectTime',editable:true,sortable:false,align:'center',formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                    {name : 'telPercent',label : 'telPercent',editable:true,sortable:false,align:'center',hidden:true},
                    {name : 'tranPercent',label : 'tranPercent',editable:true,sortable:false,align:'center'},
                    {name : 'housePercent',label : 'housePercent',editable:true,sortable:false,align:'center'},
                    {name : 'type',label : 'type',editable:true,sortable:false,hidden:true,align:'center'},
                    {name : 'isLasterChange',label : 'isLasterChange',editable:true,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'changeTime',label : 'changeTime',editable:true,sortable:false,align:'center',formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'}
                ],
                postData:{"personId":personId},
                sortname: 'changeTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    var orgId = $("#orgId").val();//机构ID
                    var flag = false;//修改的是否是最新数据
                    if(rowData.isLasterChange == '是'){
                        flag = true;
                    }
                    rowData = $('#hrWageSubchangeForm').jqGrid('getRowData',rowid);
                    window.open('emp_hrWageSubchange.html?id='+rowData.id+'&oper=edit&orgId='+orgId+"&flag="+flag);
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("hrWageSubchangeForm").setSelection(focusId);
                    }
                }
            });
    }





    /**
     * 加载任职情况子集
     */
    function getHrEmpOfficeInfoList(){
        jQuery("#hrEmpOfficeForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpOffice/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','公司','部门','岗位','任职时间','免职时间','是否当前任职','职级'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'org',label : 'org',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHROrgNameById},
                    {name : 'dept',label : 'dept',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHROrgNameById},
                    {name : 'post',label : 'post',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRPostNameById},
                    {name : 'holdHeadshipTime',label : 'holdHeadshipTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'removeHeadshipTime',label : 'removeHeadshipTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'isCurrent',label : 'isCurrent',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'headshipRank',label : 'headshipRank',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById }
                ],
                postData:{"personId":personId},
                sortname: 'holdHeadshipTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    rowData = $('#hrEmpOfficeForm').jqGrid('getRowData',rowid);
                    window.open('emp_hrEmpOffice.html?id='+rowData.id+'&oper=edit');
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("hrEmpOfficeForm").setSelection(focusId);
                    }
                }
            });
    }

    /**
     * 加载薪资变动情况子集
     */
    function getHrWageChangeInfoList(){
        jQuery("#hrWageChangeForm").jqGrid(
            {
                url : baseUrl+'emp/hrWageChange/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','变动时间','变动前薪资等级','变动前标准年薪','变动后薪资等级','变动后标准年薪','是否最新变动','生效时间','变动幅度','变动原因','变动类型','说明'],
                colModel : [

                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'changeTime',label : 'changeTime',editable:true,width : 60,sortable:false,align:'center',formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'} },
                    {name : 'rankBefore',label : 'rankBefore',editable:true,width : 60,sortable:false,align:'center',formatter:formatRank},
                    {name : 'salBefore',label : 'salBefore',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'rankAfter',label : 'rankAfter',editable:true,width : 60,sortable:false,align:'center',formatter:formatRank},
                    {name : 'salAfter',label : 'salAfter',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'isLastChange',label : 'isLastChange',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'effectTime',label : 'effectTime',editable:true,width : 60,sortable:false,align:'center',formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'} },
                    {name : 'percent',label : 'percent',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'cause',label : 'cause',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'type',label : 'type',editable:true,width : 60,sortable:false,align:'center',formatter:getType},
                    {name : 'remark',label : 'remark',editable:true,width : 60,sortable:false,align:'center'}
                ],
                postData:{"personId":personId},
                sortname: 'changeTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect : true,
                multiboxonly:true,
                rownumbers:true,
                jsonReader : {
                    root:"result",
                    repeatitems : false
                },
                rowNum:-1,
                ondblClickRow:function(rowid){
                    //跳转编辑页
                    var org = $("#orgId").val();
                    rowData = $('#hrWageChangeForm').jqGrid('getRowData',rowid);
                    window.open('emp_hrWageChange.html?id='+rowData.id+'&oper=edit&org='+org);
                },
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
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },
                gridComplete:function(){
                    if(focusId != null && focusId != '') {
                        $("hrWageChangeForm").setSelection(focusId);
                    }
                }
            });
    }

    //todo 翻译薪资等级
    function formatRank(cellValue){
        if(cellValue=='其它'){
            return "其它";
        }else{
            return $.hrUtils.getHRCodeNameById(cellValue);
        }
    }

    function getType(data){
        var type;
        if(data == '入职'){
            type = '入职';
        }else{
            type = $.hrUtils.getHRCodeNameById(data);
        }
        return type;
    }

    /**
     * 加载合同签订列表
     */
    function getHrContSignInfoList(){
        jQuery("#hrContSignForm").jqGrid(
            {
                url : baseUrl+'emp/hrContSign/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','合同编号','起始时间','终止时间','试用期终止时间','工作岗位','签订时间','是否变更','合同期限类型','是否续签','签订单位','是否生效','合同期限','试用期期限','试用期开始时间','是否有特殊协议'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'contCode',label : 'contCode',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'startTime',label : 'startTime',editable:true,width : 60,sortable:false,align:'center',formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                    {name : 'endTime',label : 'endTime',editable:true,width : 60,sortable:false,align:'center',formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                    {name : 'periodEndTime',label : 'periodEndTime',editable:true,width : 60,sortable:false,formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},align:'center'},
                    {name : 'postId',label : 'postId',editable:true,width : 60,sortable:false,formatter:'date',align:'center',formatter:$.hrUtils.getHRPostNameById},
                    {name : 'signTime',label : 'signTime',editable:true,width : 60,sortable:false,align:'center',formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                    {name : 'isChange',label : 'isChange',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'contTermType',label : 'contTermType',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'isRenew',label : 'isRenew',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'orgId',label : 'orgId',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHROrgNameById},
                    {name : 'isEffect',label : 'isEffect',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById},
                    {name : 'contTerm',label : 'contTerm',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'periodTerm',label : 'periodTerm',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'periodStartTime',label : 'periodStartTime',editable:true,width : 60,sortable:false,align:'center',formatter:'date',formatoptions:{srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                    {name : 'isClause',label : 'isClause',editable:true,width : 60,sortable:false,align:'center',formatter:$.hrUtils.getHRCodeNameById}
                ],
                postData:{"personId":personId},
                sortname: 'startTime',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
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
                        //success
                        $.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                    }
                },gridComplete:function(){
                var reccount = $("#hrContSignForm").getGridParam("reccount");//获取行数
                var ids = $("#hrContSignForm").getDataIDs();
                var id = ids[ids.length-1];
                $("#hrContSignForm").setSelection(id);
            }
            });
    }

    /**
     * 加载附件列表
     */
    function getHrEmpAttachmentInfoList(){
        jQuery("#hrEmpAttachmentForm").jqGrid(
            {
                url : baseUrl+'emp/hrEmpAttachment/queryList',//创建完成之后请求数据的url
                datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype : "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: { contentType: 'application/json' },
                contentType : "application/json",
                autowidth:true,
                colNames : [ 'id','名称','大小','分类','说明'],
                colModel : [
                    {name : 'id',label : 'id',editable:true,width : 60,sortable:false,hidden:true,align:'center'},
                    {name : 'name',label : 'name',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'size',label : 'size',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'type',label : 'type',editable:true,width : 60,sortable:false,align:'center'},
                    {name : 'remark',label : 'remark',editable:true,width : 60,sortable:false,formatter:'date',align:'center'},
                ],
                postData:{"personId":personId},
                sortname: 'createDate',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
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
                        //success
                    }
                },gridComplete:function(){
                var reccount = $("#hrEmpAttachmentForm").getGridParam("reccount");//获取行数
                var ids = $("#hrEmpAttachmentForm").getDataIDs();
                var id = ids[ids.length-1];
                $("#hrEmpAttachmentForm").setSelection(id);
            }
            });
    }

    /**
     * 批量删除工作经历
     * @param personId
     */
    function delWorkInfo(){
        var idsVal = $('#workHistoryForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/empWorkHistory/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#workHistoryForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#workHistoryForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#workHistoryForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#workHistoryForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#workHistoryForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 批量删除教育经历
     */
    function deleteEducationInfo(){
        var idsVal = $('#eduHistoryForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpEducation/deleteBatchByIds/" + idsVal+"/"+personId,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#eduHistoryForm').jqGrid().trigger("reloadGrid");
                                //重新加载人员信息
                                reloadEmpInfoSetById(personId);
                                $.xljUtils.tip("green", "数据删除成功！");

                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#eduHistoryForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#eduHistoryForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#eduHistoryForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#eduHistoryForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#eduHistoryForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 批量删除家庭信息
     */
    function deleteHomeRelationInfo(){
        var idsVal = $('#hrEmpFamilyForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpFamily/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrEmpFamilyForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrEmpFamilyForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrEmpFamilyForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrEmpFamilyForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrEmpFamilyForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrEmpFamilyForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 批量删除培训信息
     */
    function delHrOjtTrainInfo(){
        var idsVal = $('#hrOjtTrainForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrOjtTrain/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrOjtTrainForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrOjtTrainForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrOjtTrainForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrOjtTrainForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrOjtTrainForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrOjtTrainForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 批量删除考核信息
     */
    function delHrEvaExamineInfo(){
        var idsVal = $('#hrEvaExamineForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEvaExamine/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrEvaExamineForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrEvaExamineForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrEvaExamineForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrEvaExamineForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrEvaExamineForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrEvaExamineForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 批量删除语言能力列表
     */
    function delHrEmpLanguageAbilityInfo(){
        var idsVal = $('#hrEmpLanguageAbilityForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpLanguageAbility/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrEmpLanguageAbilityForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrEmpLanguageAbilityForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrEmpLanguageAbilityForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrEmpLanguageAbilityForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrEmpLanguageAbilityForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrEmpLanguageAbilityForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 批量删除变动信息
     */
    function delHrEmpChangeInfo(){
        var idsVal = $('#hrEmpChangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpChange/deleteBatchEmpChange/" + idsVal+"/"+personId,//todo 自定义删除方法
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrEmpChangeForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrEmpChangeForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrEmpChangeForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrEmpChangeForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrEmpChangeForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrEmpChangeForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
                                //重新加载人员信息
                                reloadEmpInfoSetById(personId);
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
     * 批量删除专业资格证书信息
     */
    function delHrEmpMajorInfo(){
        var idsVal = $('#hrEmpMajorForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpMajor/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrEmpMajorForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrEmpMajorForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrEmpMajorForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrEmpMajorForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrEmpMajorForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrEmpMajorForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 批量删除奖惩信息
     */
    function delHrEmpRewardPunishInfo(){
        var idsVal = $('#hrEmpRewardPunishForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpRewardPunish/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrEmpRewardPunishForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrEmpRewardPunishForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrEmpRewardPunishForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrEmpRewardPunishForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrEmpRewardPunishForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrEmpRewardPunishForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 批量删除职称信息
     */
    function delHrEmpOccupationInfo(){
        var idsVal = $('#hrEmpOccupationForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpOccupation/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrEmpOccupationForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrEmpOccupationForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrEmpOccupationForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrEmpOccupationForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrEmpOccupationForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrEmpOccupationForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 删除招聘信息
     */
    function delHrRecRecruitInfo(){
        var idsVal = $('#hrRecRecruitForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrRecRecruit/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrRecRecruitForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrRecRecruitForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrRecRecruitForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrRecRecruitForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrRecRecruitForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrRecRecruitForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 删除离职信息
     */
    function delHrEmpLeaveInfo(){
        var idsVal = $('#hrEmpLeaveInfoForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpLeaveInfo/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrEmpLeaveInfoForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrEmpLeaveInfoForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrEmpLeaveInfoForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrEmpLeaveInfoForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrEmpLeaveInfoForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrEmpLeaveInfoForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 删除任职情况信息
     */
    function delHrEmpOfficeInfo(){
        var idsVal = $('#hrEmpOfficeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrEmpOffice/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrEmpOfficeForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrEmpOfficeForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrEmpOfficeForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrEmpOfficeForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrEmpOfficeForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrEmpOfficeForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
     * 删除薪酬变动信息
     */
    function delHrWageChangeInfo() {
        var idsVal = $('#hrWageChangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrWageChange/deleteBatchWageChange/" + idsVal+"/"+personId,//todo 自定义删除方法
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrWageChangeForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrWageChangeForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrWageChangeForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrWageChangeForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrWageChangeForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrWageChangeForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
                                //重新加载人员信息
                                reloadEmpInfoSetById(personId);
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
     * 批量删除补助变动信息
     */
    function delHrWageSubchangeInfo(){
        var idsVal = $('#hrWageSubchangeForm').jqGrid('getGridParam', 'selarrrow');
        var flag = false;//删除数据中是否包含最新数据
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                for(var i=0;i<idsVal.length;i++){
                    var rowData = $("#hrWageSubchangeForm").jqGrid('getRowData',idsVal[i]);
                    if(rowData.isLasterChange == '是'){
                        flag = true;
                        break;
                    }
                }
                $.ajax({
                    url: serviceUrl + "emp/hrWageSubchange/deleteBatchWageSubChange/" + idsVal+"/"+personId+"/"+flag,//todo 自定义删除方法
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrWageSubchangeForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrWageSubchangeForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrWageSubchangeForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrWageSubchangeForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrWageSubchangeForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrWageSubchangeForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
                                //重新加载人员信息
                                reloadEmpInfoSetById(personId);
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
     * 刪除合同信息
     */
    function delHrContSignInfo(){
        var idsVal = $('#hrContSignForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/hrContSign/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                // $('#hrContSignForm').jqGrid().trigger("reloadGrid");
                                $.xljUtils.tip("green", "数据删除成功！");
                                var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                var queryData = {};
                                if (focusId == null) {
                                    queryData.datatype =  'json';
                                    queryData.page =  $('#hrContSignForm').getGridParam('page')-1;
                                    queryData.rowNum = $('#hrContSignForm').getGridParam('rowNum');
                                }
                                queryData.gridComplete = function (){
                                    if(focusId != null && focusId != ""){
                                        $("#hrContSignForm").setSelection(focusId);
                                    }else if (focusId == null || focusId == ""){
                                        $("#hrContSignForm tr").last().find(":input[role='checkbox']").trigger("click");
                                    }
                                    focusId="";
                                }
                                $('#hrContSignForm').jqGrid("setGridParam",queryData).trigger("reloadGrid");
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
    //todo 初始化时间控件
    function initTime(){
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
         * 八位时间格式
         */
        $(".form_datetime_8").datetimepicker({
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
         * 六位时间格式
         */
        $(".form_datetime_six").datetimepicker({
            language : 'zh',
            format : "yyyy-mm",
            minView:'year',
            weekStart : 1,
            todayBtn : 1,
            autoclose : 1,
            startView : 3,
            forceParse : 0,
            showMeridian : 1
        });
        /**
         * 时间戳时间格式
         */
        $('.form_datetime_timestamp').datetimepicker({
            language : 'zh',
            format : "yyyy-mm-dd hh:ii:ss",
            minView:'month',
            weekStart : 1,
            todayBtn : 1,
            autoclose : 1,
            startView : 2,
            forceParse : 0,
            showMeridian : 1
        });
    }

    function initCodeItems(code,codeSetId){
        var options = {};
        options[code] = {
            title:'选择代码',//选择器标题，默认是'选择组织机构'
            selectorType:'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
            treeUrl:serviceUrl+'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
            treeParam:{'code_set_id':codeSetId},//生成zTree树的请求参数
            targetId:null,//选择的数据的ID存储input域的id
            targetName:null,//选择的数据的Name存储input域
            saveCallback:function (selectData) {
                $("#"+code).val(selectData.id);
                $("#"+code+"_name").val(selectData.name);
            }
        };
        $('.hr-single-selector-'+code). xljSingleSelector(options[code]);
    }

    function customValidateForm(validateForm){
        var formElements = $("#baseInfoForm").find(":input");
        // var formElements = $("[id^=hr_emp_personInfo_]");
        var rulesJson = {};
        var messagesJson = {};
        var returnObj = {rulesJson:rulesJson, messagesJson:messagesJson};
        var validateFlag = false;
        $.each(formElements,function (i, formElement) {
            var formElementRulesJson = {};
            var formElementMessagesJson = {};

            var formElementName = $(formElement).attr("name");
            if ($.xljUtils.isEmpty(formElementName)) {
                return;
            }
            //var formElementPlacehold = $(formElement).attr("placeholder");
            var formElementPlacehold = $(formElement).attr("data-placeholder");

            //必填验证
            var requiredVal = $(formElement).attr("data-required");
            if(requiredVal&& requiredVal =='true') {
                formElementRulesJson["required"]=true;
                formElementMessagesJson["required"]= (formElementPlacehold?formElementPlacehold:formElementName)+"不能为空";
            }

            var numReg = new RegExp("^[0-9]*$");
            //字符最小长度验证
            var minlengthVal = $(formElement).attr("data-minlength");
            if(minlengthVal&&numReg.test(minlengthVal)) {
                formElementRulesJson["minlength"]=minlengthVal;
                formElementMessagesJson["minlength"]= (formElementPlacehold?formElementPlacehold:formElementName)+"长度不能少于"+minlengthVal;
            }

            //字符最大长度验证
            var maxlengthVal = $(formElement).attr("data-maxlength");
            if(maxlengthVal&&numReg.test(maxlengthVal)) {
                formElementRulesJson["maxlength"]=maxlengthVal;
                formElementMessagesJson["maxlength"]= (formElementPlacehold?formElementPlacehold:formElementName)+"长度不能大于"+maxlengthVal;
            }

            //字符长度范围验证
            var rangelengthVal = $(formElement).attr("data-rangelength");
            if(rangelengthVal) {
                var rangelengthNums = rangelengthVal.split(",");
                var rangeStart ;
                var rangeEnd ;
                if(rangelengthNums.length==1&&numReg.test(rangelengthNums[0])){
                    rangeStart = 0;
                    rangeEnd = parsInt(rangelengthNums[0]);
                }else if(rangelengthNums.length>=2&&numReg.test(rangelengthNums[0])&&numReg.test(rangelengthNums[1])) {
                    rangeStart = parseInt(rangelengthNums[0]);
                    rangeEnd = parseInt(rangelengthNums[1]);
                }

                if(rangeStart&&rangeEnd) {
                    formElementRulesJson["rangelength"]=[rangeStart,rangeEnd];
                    formElementMessagesJson["rangelength"]= (formElementPlacehold?formElementPlacehold:formElementName)+
                        "最小长度长度不能小于"+rangeStart+",最大长度不能大于"+rangeEnd;
                }
            }

            //整数验证
            var digitsVal = $(formElement).attr("data-digits");
            if(digitsVal&&digitsVal=="true") {
                formElementRulesJson["digits"]=true;
                formElementMessagesJson["digits"]= (formElementPlacehold?formElementPlacehold:formElementName)+"只能输入正整数，包含0";
            }

            //最小值验证
            var minVal = $(formElement).attr("data-min");
            if(minVal&&numReg.test(minVal)) {
                formElementRulesJson["min"]=parseInt(minVal);
                formElementMessagesJson["min"]= (formElementPlacehold?formElementPlacehold:formElementName)+"最小值不能小于"+minVal;
            }

            //最大值验证
            var maxVal = $(formElement).attr("data-max");
            if(maxVal&&numReg.test(maxVal)) {
                formElementRulesJson["max"]=parseInt(maxVal);
                formElementMessagesJson["max"]= (formElementPlacehold?formElementPlacehold:formElementName)+"最大值不能大于"+maxVal;
            }

            //数值区间验证
            var rangeVal = $(formElement).attr("data-range");
            if(rangeVal) {
                var rangeNums = rangeVal.split(",");
                var rangeMin ;
                var rangeMax ;
                if(rangeNums.length==1&&numReg.test(rangeNums[0])){
                    rangeMin = Number.MIN_VALUE;
                    rangeMax = parsInt(rangeNums[0]);
                }else if(rangeNums.length>=2&&numReg.test(rangeNums[0])&&numReg.test(rangeNums[1])) {
                    rangeMin = parseInt(rangeNums[0]);
                    rangeMax = parseInt(rangeNums[1]);
                }

                // modify by haoqipeng 不能判断0值
                if(rangeMin != undefined && rangeMax != undefined) {
                    formElementRulesJson["range"]=[rangeMin,rangeMax];
                    formElementMessagesJson["range"]= (formElementPlacehold?formElementPlacehold:formElementName)+
                        "最小值不能小于"+rangeMin+",最大值不能大于"+rangeMax;
                }
            }

            //邮件验证
            var emailVal = $(formElement).attr("data-email");
            if(emailVal&&emailVal=="true") {
                formElementRulesJson["email"]=true;
                formElementMessagesJson["email"]= (formElementPlacehold?formElementPlacehold:formElementName)+"邮件格式不正确";
            }

            //URL验证
            var urlVal = $(formElement).attr("data-url");
            if(urlVal&&urlVal=="true") {
                formElementRulesJson["url"]=true;
                formElementMessagesJson["url"]= (formElementPlacehold?formElementPlacehold:formElementName)+"网址格式不正确";
            }

            //日期验证
            var dateVal = $(formElement).attr("data-date");
            if(dateVal&&dateVal=="true") {
                formElementRulesJson["date"]=true;
                formElementMessagesJson["date"]= (formElementPlacehold?formElementPlacehold:formElementName)+"日期格式不正确";
            }

            //小数验证
            var numberVal = $(formElement).attr("data-number");
            if(numberVal&&numberVal=="true") {
                formElementRulesJson["number"]=true;
                formElementMessagesJson["number"]= (formElementPlacehold?formElementPlacehold:formElementName)+"数值格式不正确";
            }

            //身份证号验证
            var cardnoVal = $(formElement).attr("data-cardno");
            if(cardnoVal&&cardnoVal=="true") {
                formElementRulesJson["cardno"]=true;
                formElementMessagesJson["cardno"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
            }

            //护照号验证
            var passportVal = $(formElement).attr("data-passport");
            if(passportVal&&passportVal=="true") {
                formElementRulesJson["passport"]=true;
                formElementMessagesJson["passport"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
            }

            //手机号验证
            var mobileVal = $(formElement).attr("data-mobile");
            if(mobileVal&&mobileVal=="true") {
                formElementRulesJson["mobile"]=true;
                formElementMessagesJson["mobile"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
            }

            //电话号码验证
            var telVal = $(formElement).attr("data-tel");
            if(telVal&&telVal=="true") {
                formElementRulesJson["tel"]=true;
                formElementMessagesJson["tel"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
            }

            //联系电话(手机/电话皆可)验证
            var phoneVal = $(formElement).attr("data-phone");
            if(phoneVal&&phoneVal=="true") {
                formElementRulesJson["phone"]=true;
                formElementMessagesJson["phone"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
            }

            //手机验证
            var phoneVal = $(formElement).attr("data-phoneOnly");
            if(phoneVal&&phoneVal=="true") {
                formElementRulesJson["phoneOnly"]=true;
                formElementMessagesJson["phoneOnly"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
            }

            //邮政编码验证
            var zipcodeVal = $(formElement).attr("data-zipcode");
            if(zipcodeVal&&zipcodeVal=="true") {
                formElementRulesJson["zipcode"]=true;
                formElementMessagesJson["zipcode"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
            }

            //非中文验证
            var unchineseVal = $(formElement).attr("data-unchinese");
            if(unchineseVal&&unchineseVal=="true") {
                formElementRulesJson["unchinese"]=true;
                formElementMessagesJson["unchinese"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确,只能输入数字和英文字母";
            }

            var priceVal = $(formElement).attr("data-price");
            if (priceVal&&priceVal=="true") {
                formElementRulesJson["price"]=true;
                formElementMessagesJson["price"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确,只能输入正数,最多两位小数";

            }

            rulesJson[formElementName] = formElementRulesJson;
            messagesJson[formElementName] = formElementMessagesJson;
        });
        return returnObj;
    }

    function  commitValidateForm(){
        var validateForms = $("form[validate-type='jQueryValidate']");
        $.each(validateForms,function (i,validateForm) {
            /*var requiredElements = $(validateForm).find("[data-required]");
             $(requiredElements,function (i,requiredElement) {
             var requiredElementName = $(requiredElement).attr("name");
             });*/
            var ruleObjJson = customValidateForm(validateForm);
            var rulesJson = ruleObjJson.rulesJson;
            var messagesJson = ruleObjJson.messagesJson;

            var validateJson = {
                rules: rulesJson,
                messages:messagesJson,
                highlight : function(element) {
                    //$(element).closest('.form-group').addClass('has-error');
                    $(element).closest('td').addClass('has-error');
                },
                success : function(label) {
                    label.closest('td').removeClass('has-error');
                    label.closest('td').addClass('has-success');
                    label.remove();
                },
                errorPlacement : function(error, element) {
                    error.addClass("help-block");
                    error.css({margin:'0','text-align':'left'});
                    //element.parents('div.form-group').children("div").append(error);
                    element.parents('td').append(error);
                },
                submitHandler : function(form) {
                    //判断form表单action是否有值，有值的时候表单验证完成后提交
                    //否则只验证不提交
                    var actionUrl = $(validateForm).attr('action');
                    if(!actionUrl||actionUrl==""){
                        //获取验证成功回调函数
                        var validateSuccessFun = $(validateForm).attr('data-validate-success');
                        var params;
                        if (validateSuccessFun.indexOf('(') > 0) {
                            params = validateSuccessFun.substring(validateSuccessFun.indexOf('(')+1);
                            params = params.replace(")","");
                            if(params==""){
                                params = [];
                            }else{
                                params = params.split(',');
                            }
                        } else {
                            params = [];
                        }
                        if (validateSuccessFun.indexOf('(') > 0) {
                            validateSuccessFun = validateSuccessFun.substring(0,validateSuccessFun.indexOf('('));
                        }
                        try{
                            if($.isFunction(eval(validateSuccessFun))){
                                if(params.length>0){
                                    validateSuccessFun += "(" + params.join(',') + ")";
                                }else{
                                    validateSuccessFun += "()";
                                }
                                //执行回调函数
                                var func = eval("("+validateSuccessFun+")");
                            }
                        }catch (e){
                            // console.error('函数调用出错!'+e);
                        }
                        return;
                    }
                    //获取form表单数据
                    var formFields = $(form).serializeArray();
                    var jsonData = {};
                    var numReg = new RegExp("^[0-9]*$");
                    for(var i=0;i<formFields.length;i++) {
                        if(formFields[i].value==""){
                            continue;
                        }
                        if(formFields[i].value=="1"||formFields[i].value=="0"){
                            jsonData[formFields[i].name]=numReg.test(formFields[i].value)?parseInt(formFields[i].value):formFields[i].value;
                            continue;
                        }
                        //jsonData[formFields[i].name]=numReg.test(formFields[i].value)?parseInt(formFields[i].value):formFields[i].value;
                        jsonData[formFields[i].name]=formFields[i].value;
                    }

                    //ajax方式提交表单，提交时以json格式提交
                    $.ajax({
                        url:$(form).attr("action"),
                        data:JSON.stringify(jsonData),
                        type:$(form).attr("method"),
                        contentType:'application/json',
                        dataType:'JSON',
                        success:function (resultData ) {
                            if(resultData) {
                                var successFlag = resultData.success;
                                var result = resultData.result;
                                var msg = resultData.msg;
                                //获取回调函数
                                var dataCallback = $(form).attr("data-callback");
                                if(dataCallback){
                                    // modify by haoqipeng
//                                    var params = dataCallback.substring(dataCallback.indexOf('(')+1);
                                    var params;
                                    if (dataCallback.indexOf('(') > 0) {
                                        params = dataCallback.substring(dataCallback.indexOf('(')+1);
                                        params = params.replace(")","");
                                        if(params==""){
                                            params = [];
                                        }else{
                                            params = params.split(',');
                                        }
                                    } else {
                                        params = [];
                                    }
                                    params.push(JSON.stringify(resultData));
                                    if (dataCallback.indexOf('(') > 0) {
                                        dataCallback = dataCallback.substring(0,dataCallback.indexOf('('));// + "(" + params.join(',') + ")";
                                    }
                                    try{
                                        if($.isFunction(eval(dataCallback))){
                                            if(params.length>0){
                                                dataCallback += "(" + params.join(',') + ")";
                                            }else{
                                                dataCallback += "()";
                                            }
                                            //执行回调函数
                                            var func = eval("("+dataCallback+")");
                                        }
                                    }catch (e){
                                        // console.info('函数调用出错!<br><br>'+e);
                                    }
                                }
                            }
                        },
                        error:function (XMLHttpRequest, textStatus, errorThrown) {
                            var status = XMLHttpRequest.status;
                            $.xljUtils.getError(status);
                        }
                    });
                }
            };
            var validateIgnore = $(validateForm).attr('validate-ignore');
            if(validateIgnore=='true'){
                validateJson.ignore='';
            }
            //表单验证
            $(validateForm).validate(validateJson);
        });
    }

    window.newFile = function() {
       if($("#photoPic")[0].files[0] != undefined){
            if($("#photoPic")[0].files[0].size > 2*1024*1024){
                $.xljUtils.tip("blue", "上传图片不能超过2M！");
            }else{
                savePersonInfo(true);
           }
        }
    }


    //针对IE进行时间转换
    function changeTimeStyle(bTime){
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1]+'/'+timeDate[2]+'/'+timeDate[0];
        var later = new Date(bTime);
        return later;
    }

    function changeTimeStampStyle(bTime){
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1]+'/'+timeDate[2]+'/'+timeDate[0];
        var later = new Date(bTime);
        var timeHour = timePar[1].split(':');
        later.setHours(timeHour[0], timeHour[1],timeHour[2]);
        return later;
    }


    //todo 初始化上传插件
    function initUpload() {
        var attachmentId = "";
        var approvalNum = $.xljUtils.getUrlParam("approvalNum");
        if(approvalNum != "" && attachmentId != undefined ){
            attachmentId = approvalNum;
        }else{
            attachmentId = $.xljUtils.getUrlParam("id");
        }
        if(attachmentId != '' && attachmentId != undefined){
            $('.attachment-container').xljAttachment({
                appId: "HR",
                businessId: attachmentId,
                categoryId: ATTACH_TYPE_PERSON,
                mode: "edit",
                singleUpload:false,
                autoSubmit: false,
                fromTempTable: false,
                serverAddr: ATTACH_SERVERADDR
            });
        }
    }


    window.emptyInfo=function (id,hiddenId){
        $("#"+id).val("");
        $("#"+hiddenId).val("");
    };
    window.callBackPerInfo=function (editId, type){
        focusId=editId;
        $('#'+type).jqGrid().trigger("reloadGrid");
    };

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
    //todo 计算年龄
    window.calAge = function(){
        if($("#birthOfEmp").val() != ''){
            var UToTime = $("#birthOfEmp").val();
            var aDate = UToTime.split("-");
            var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
            var myDate = new Date();
            var dif = myDate.getTime() - NewDate.getTime();
            myDate.setTime(dif);
            $("#ageOfEmp").val(myDate.getFullYear() - 1970);//计算工龄
        }
    };


    //todo 计算工龄
    window.calWorkAge = function(){
        if($("#worktimeOfEmp").val() != ''){
            var UToTime = $("#worktimeOfEmp").val();
            var aDate = UToTime.split("-");
            var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
            var myDate = new Date();
            var dif = myDate.getTime() - NewDate.getTime();
            myDate.setTime(dif);
            $("#workAge").val(myDate.getFullYear() - 1970);//计算工龄
        }
    };

    //todo ERP帐号校验
    window.checkERP = function(){
        var account = $("#account").val();
        var postData = {};
        postData.account = account;
        $.ajax({
            url: serviceUrl + "emp/empPersonInfo/queryList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        //todo 判定ERP帐号是否重复
                        if(xhr.result.length > 1){
                            $.xljUtils.tip("blue","ERP帐号重复，请重写填写！");
                            $("#account").val("");
                        }else if(xhr.result.length == 1){
                            if(personId != xhr.result.id){
                                $.xljUtils.tip("blue","ERP帐号重复，请重写填写！");
                                $("#account").val("");
                            }
                        }
                    } else {
                        if (xhr.code == "50000") {//请求返回的状态码？
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "ERP帐号检测失败！");
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
    };
})(jQuery, window, document);