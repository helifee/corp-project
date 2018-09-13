 ;(function ($,window,document,undefined) {

    /**
     * @author ruanxin
     */
    var id;//编辑的id
    var editTypeRate;//操作方式 0新增   1 修改
    var openTypeRate;//操作类型 1 薪资个税   2 劳务个税
    var uuid;//主键
    var url;//提交的地址
    var type;//提交方法

    //页面加载
    $(function () {

        //操作方式：0新增，1修改
        editTypeRate = localStorage.getItem('editTypeRate');
        if (editTypeRate && editTypeRate != undefined && editTypeRate != 'undefined' && editTypeRate != null) {
            editTypeRate = JSON.parse(editTypeRate);
        }
        //打开方式：1 薪资个税，2 劳务个税
        openTypeRate = localStorage.getItem('openTypeRate');
        if (openTypeRate && openTypeRate != undefined && openTypeRate != 'undefined' && openTypeRate != null) {
            openTypeRate = JSON.parse(openTypeRate);
        }

        //要手动remove
        // localStorage.removeItem('editTypeRate');
        // localStorage.removeItem('openTypeRate');

        //按钮权限控制
        queryAuth();

        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });


        $("#rateEditFrom").find("input[name='type']").val(openTypeRate);
        if(openTypeRate==1) {   //1 薪资个税
            //将扣税基数设置为不可见
            $("#taxBaseTr").css('display', 'none');
            $("#rateEditFrom").find("input[name='typeText']").val("薪资&年终奖个税");//类型显示
            if(editTypeRate==1){ //修改
                $("#editTitel").text("薪资&年终奖个税-修改");
                getRateById();
                //修改保存
                $("#saveBtn").unbind('click').on('click', function () {
                    $("#rateEditFrom").attr("data-validate-success","updateSaveForm()");
                    $("#rateEditFrom").submit();
                });

            }else{ //新增
                $("#rateEditFrom").find("input[name='type']").val(openTypeRate);
                $("#editTitel").text("薪资&年终奖个税-新增");
                initUuid();
                //新增保存
                $("#saveBtn").unbind('click').on('click', function () {
                    $("#rateEditFrom").attr("data-validate-success","addSaveForm()");
                    $("#rateEditFrom").submit();
                });
            }
        } else { //劳务个税
            $("#rateEditFrom").find("input[name='typeText']").val("劳务人员个税");//类型显示
            //将扣税基数设置为可见
            $("#taxBaseTr").css('display' ,'line');//新增此处并没有生效
            if(editTypeRate==1){ //修改
                $("#editTitel").text("劳务人员个税-修改");
                getRateById();
                //修改保存
                $("#saveBtn").unbind('click').on('click', function () {
                    $("#rateEditFrom").attr("data-validate-success","updateSaveForm()");
                    $("#rateEditFrom").submit();
                });
            }else{ //新增
                $("#rateEditFrom").find("input[name='type']").val(openTypeRate);
                $("#editTitel").text("劳务人员个税-新增");
                initUuid();
                //新增保存
                $("#saveBtn").unbind('click').on('click', function () {
                    $("#rateEditFrom").attr("data-validate-success","addSaveForm()");
                    $("#rateEditFrom").submit();
                });
            }
        }
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });

     //查询用户功能权限
     window.queryAuth = function(){
         $.ajax({
             type:'POST',
             url:hostUrl+"auth/authData/queryAuthorizationBtnList",
             dataType:'JSON',
             contentType:'application/json',
             async:false,//设置为同步
             data:JSON.stringify({"menuCode":"hr_salary"}),
             success:function(json){
                 var list=json.result;
                 if(list!=null&&list.length>0) {
                     $.each(list,function(index,value){
                         for(var key in value){
                             if(key=="code"&&value[key]=="2"){//编辑权限
                                 $("#saveBtn").show();//保存
                             }
                         }
                     });
                 }
             },
             error:function(){
             }
         });
     };

    //根据ID获取要修改的税率表记录
    window.getRateById = function () {
        var editRateId = localStorage.getItem('editRateId');
        if (editRateId && editRateId != undefined && editRateId != 'undefined' && editRateId != null) {
            editRateId = JSON.parse(editRateId);
        }
        //要手动remove
        // localStorage.removeItem('editRateId');

        if (editRateId != null && editRateId != undefined && editRateId != 'undefined') {
            $.ajax({
                type:'get',
                url:hostUrl +"wage/wageTaxRate/get/"+editRateId,
                success: function(data) {
                    $("#rateEditFrom").find("input[name='id']").val(data.result.sid);
                    $("#rateEditFrom").find("input[name='type']").val(data.result.type);
                    $("#rateEditFrom").find("input[name='lowSalaryLimit']").val(data.result.lowSalaryLimit);
                    $("#rateEditFrom").find("input[name='topSalaryLimit']").val(data.result.topSalaryLimit);
                    $("#rateEditFrom").find("input[name='quickDeduction']").val(data.result.quickDeduction);
                    $("#rateEditFrom").find("input[name='taxRate']").val(data.result.taxRate);
                    $("#rateEditFrom").find("input[name='taxBase']").val(data.result.taxBase);
                    $("#remark").val(data.result.remark);
                    if(openTypeRate==1) {
                        $("#rateEditFrom").find("input[name='typeText']").val("薪资&年终奖个税");//类型显示
                    }else {
                        $("#rateEditFrom").find("input[name='typeText']").val("劳务人员个税");//类型显示
                    }
                },error:function(XMLHttpRequest, textStatus, errorThrown){
                    pop_tip_open("red","初始化税率表请求失败");
                }
            });
        } else {
            pop_tip_open("blue","数据初始化失败!");
        }

    };

    //修改税率表保存
    window.updateSaveForm = function () {
        var rateArr= $("#rateEditFrom").serializeArray();
        var rateDto={};
        //过滤掉不必要的参数
        for(var i in rateArr){
            if(rateArr[i].name=="id") {
                rateDto[rateArr[i].name]=rateArr[i].value;
            }
            if(rateArr[i].name=="type") {
                rateDto[rateArr[i].name]=rateArr[i].value;
            }
            if(rateArr[i].name=="lowSalaryLimit") {
                rateDto[rateArr[i].name]=rateArr[i].value;
            }
            if(rateArr[i].name=="topSalaryLimit") {
                rateDto[rateArr[i].name]=rateArr[i].value;
            }
            if(rateArr[i].name=="taxRate") {
                rateDto[rateArr[i].name]=rateArr[i].value;
            }
            if(rateArr[i].name=="quickDeduction") {
                rateDto[rateArr[i].name]=rateArr[i].value;
            }
            if(rateArr[i].name=="taxBase") {
                rateDto[rateArr[i].name]=rateArr[i].value;
            }
            if(rateArr[i].name=="remark") {
                rateDto[rateArr[i].name]=rateArr[i].value;
            }
        }
        rateDto.delflag=0;
        var rateId = $('#id').val();
        $.ajax({
            url:hostUrl+"wage/wageTaxRate/update/"+rateId,
            data:JSON.stringify(rateDto),
            type:'put',
            dataType:'JSON',
            contentType:'application/json',
            success:function (resultData ) {
                if(resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var message = resultData.message;
                    if(successFlag) {
                        if(openTypeRate==1) { //薪资月薪聚焦
                            $.xljUtils.tip("green","修改成功！");
                            localStorage.setItem('gotoTab',JSON.stringify("taxRateList"));//跳转至个税页签
                            localStorage.setItem('editId',JSON.stringify(rateId));//修改主键ID
                        }else { //劳务人员聚焦
                            $.xljUtils.tip("green","修改成功！");
                            localStorage.setItem('gotoTab',JSON.stringify("labourTaxRateList"));//跳转至个税页签
                            localStorage.setItem('editId',JSON.stringify(rateId));//修改主键ID
                        }
                        window.history.go(-1);
                    }else {
                        pop_tip_open("blue","数据修改保存失败！"+message);
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","数据修改保存请求失败");
            }
        });
    };

    //新增税率表保存
    window.addSaveForm = function () {
        var rateArr= $("#rateEditFrom").serializeArray();
        var rateDto={};
        rateDto.delflag=0;
        for(var i in rateArr){
            if(rateArr[i].name=="id") {
                rateDto.id=rateArr[i].value;
                rateDto.sid=rateArr[i].value;
            }
            //过滤掉不必要的参数
            if(rateArr[i].name=="type"||rateArr[i].name=="lowSalaryLimit"||rateArr[i].name=="topSalaryLimit"||rateArr[i].name=="taxRate"||rateArr[i].name=="quickDeduction"||rateArr[i].name=="taxBase"||rateArr[i].name=="remark") {
                rateDto[rateArr[i].name]=rateArr[i].value;
            }
        }
        $.ajax({
            url:hostUrl+"wage/wageTaxRate/save/",
            type:'POST',
            dataType:'JSON',
            contentType:'application/json',
            data:JSON.stringify(rateDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr){
                    if(xhr.success) {
                        $.xljUtils.tip("green","新增成功！");
                        if(openTypeRate==1) { //薪资月薪聚焦
                            localStorage.setItem('gotoTab',JSON.stringify("taxRateList"));//跳转至个税页签
                            localStorage.setItem('editId',JSON.stringify(rateDto.id));//修改主键ID
                        }else { //劳务人员聚焦
                            localStorage.setItem('gotoTab',JSON.stringify("labourTaxRateList"));//跳转至个税页签
                            localStorage.setItem('editId',JSON.stringify(rateDto.id));//修改主键ID
                        }
                        window.history.go(-1);
                    }else{
                        if(xhr.code=="50000"){
                            $.xljUtils.tip("blue",xhr.message);
                            return;
                        }
                        $.xljUtils.tip("blue","保存失败！");
                    }
                }else{
                    $.xljUtils.tip("red","服务异常,请联系管理员！");
                }

            },
            error: function(xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
    };

    //初始化主键ID
    window.initUuid = function () {
        $.ajax({
            type:'get',
            url:hostUrl +  "generator/getGuuid"+"?time="+Math.random(),
            success: function(data) {
                var guuid=data.result;
                $("#rateEditFrom").find("input[name='id']").val(guuid);
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        })
    };

    //返回上一级
    window.goBack = function () {
        localStorage.setItem('gotoTab',JSON.stringify("backTaxRate"));//跳转至个税参数页签
        window.history.go(-1);
    };

})(jQuery, window, document)