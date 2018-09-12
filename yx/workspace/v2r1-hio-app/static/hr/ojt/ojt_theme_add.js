/**
 * 培训试题编辑js
* Created by xph on 2017/7/5.
*/

;(function($, window, document, undefined){
    var rowDataBefore;//修改前数据
    var rowData;        //数据
    var themeId,themeTypeId;
    var type;

    var themeOptionIds;
    //手动的调整窗口时
    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //表示con-table 下的mytable1
        $(".con-table .mytable1").height((w_h - 80) + "px");
    }
    //上来就执行
    $(function () {
        resizeHeight();
        //初始化试题分类下拉框
        initTypeSelect();
        //初始化代码项下拉框
        initCodeSelect("1114","type");
        initCodeSelect("1113","difficulty");
        type = $.xljUtils.getUrlParam("type");
        setTimeout(function () {
            if(type=='add'){
                //初始化id
                initUuid();
                $('title').text("试题-新增");
                $(".xj-form-title").text("试题-新增");
                forChanged("1114100212");
            }else if(type=='update'){
                $('title').text("试题-修改");
                $(".xj-form-title").text("试题-修改");
                //根据id加载数据
                var id = $.xljUtils.getUrlParam("id");
                getOjtThemeById(id);
            }
        },300);

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        $("#saveBtn").on('click', function () {
            if(type=='add'){
                $("#ojtThemeFrom").attr("data-validate-success", "saveInfo(0)");
                $("#ojtThemeFrom").submit();
            }else if(type=='update') {
                $("#ojtThemeFrom").attr("data-validate-success", "saveInfo(1)");
                $("#ojtThemeFrom").submit();
            }
        });
        $("#addBtn").on('click', function () {
            addOption();
        });
        $("#delBtn").on('click', function () {
            delOption();
        });
    });

    /**
     * 初始化主键ID
     */
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#ojtThemeFrom").find("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     * 初始化试题分类下拉框
     */
    function initTypeSelect(){
        $("#themeTypeSelect").empty();
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtThemeType/queryListByCondition",
            data: JSON.stringify({}),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                // pop_tip_open("blue","新增成功！");
                var result = data.result;
                if(result==null||result.length==0){
                    return;
                }
                for(var i =0;i<data.result.length;i++){
                    $("#themeTypeSelect").append("<option value="+result[i].id+">"+result[i].name+"</option>");
                }
            }
        });
    }


    //初始化页面中的代码项列表
    function initCodeSelect(code_set_id,selectId){
        var pam = {};
        pam.code_set_id = code_set_id;
        var urlBody = "/sys/sysCodeItem/getSysCodeItemById";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            type: 'POST',
            url: urlAll,
            data: JSON.stringify(pam),
            dataType: 'json',
            success: function (json) {
                var retDt = json.result;
                if(undefined != retDt){
                    $.each(retDt,function(i,item){
                        $("#"+selectId).append("<option value='" + item.id + "'>" + item.name + "</option>")
                    });
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "代码项初始化失败");
            }
        });
    }

    function getOjtThemeById(id){
        var uBody = "/ojt/hrOjtExamTheme/get/" + id + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                if(data.result != null) {
                    //根据结果集 解析、赋值、显示
                    var theme = data.result;
                    forChanged(theme.type);
                    $("#ojtThemeFrom").find("input[name='id']").val(theme.id);
                    $("#ojtThemeFrom").find("textarea[name='name']").val(theme.name);
                    $("#ojtThemeFrom option[value='"+theme.type+"']").attr("selected", true);
                    $("#ojtThemeFrom option[value='"+theme.themeTypeId+"']").attr("selected", true);
                    $("#ojtThemeFrom option[value='"+theme.difficulty+"']").attr("selected", true);
                    $("#ojtThemeFrom").find("textarea[name='analysis']").val(theme.analysis);
                    $("#ojtThemeFrom").find("textarea[name='remark']").val(theme.remark);
                    switch (theme.type){
                        //判断题，无选项，填充页面正确选项数据
                        case "1114100214":
                            $("input[name='a'][value='"+theme.anwserObjective+"']").attr("checked", true);
                            break;
                        //选择题，需加载选项数据，并填充正确选项数据
                        case "1114100212":
                        case "1114100213":
                            $.ajax({
                                type: "POST",
                                url:hostUrl+ "ojt/hrOjtThemeOptionChoice/queryListByCondition",
                                data: JSON.stringify({"themeId":theme.id}),
                                dataType: "JSON",
                                contentType:"application/json",
                                success: function (data) {
                                    if(data == null || data.result == null ){
                                        return;
                                    }
                                    themeOptionIds = "";
                                    for (var i = 0; i < data.result.length; i ++){
                                        addOption();
                                        var themeOption = data.result[i];
                                        if(themeOptionIds == ""){
                                            themeOptionIds = themeOption.id;
                                        }else {
                                            themeOptionIds += "," + themeOption.id;
                                        }
                                        $("#option"+themeOption.answerOption).nextAll("input").val(themeOption.optionContent);
                                        if(themeOption.ifCorrect=="1") {
                                            $("input[name='answerRad'][value=" + themeOption.answerOption + "]").prop("checked", "checked");
                                            $("input[name='answerChe'][value=" + themeOption.answerOption + "]").prop("checked", "checked");
                                        }
                                    }
                                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    pop_tip_open("red", "初始化试题选项信息请求失败");
                                }
                            })
                            break;
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化试题类别信息请求失败");
            }
        })
    }

    /**
     * 保存信息
     * @param 0:新增，1：修改
     */
    window.saveInfo = function(isSave) {
        if(!validateForm())
            return;
        //序列化表单数组
        // var ojtThemeArr = $("#ojtThemeFrom").serializeArray();
        var ojtThemeDto = {};
        ojtThemeDto.id = $("#id").val();
        ojtThemeDto.name = $("#name:visible").val();
        ojtThemeDto.type = $("#type:visible").val();
        ojtThemeDto.themeTypeId = $("#themeTypeSelect:visible").val();
        ojtThemeDto.difficulty = $("#difficulty:visible").val();
        ojtThemeDto.analysis = $("#analysis:visible").val();
        ojtThemeDto.remark = $("#remark:visible").val();
        switch ($("#type:visible").val()){
            case "1114100212":
                ojtThemeDto.anwserObjective = $("[name=answerRad]:checked:visible").next().html();
                break;
            case "1114100213":
                if($("[name=answerChe]:checked:visible").length>1){
                    $("[name=answerChe]:checked:visible").each(function(index,ele){
                        if (ojtThemeDto.anwserObjective == undefined){
                            ojtThemeDto.anwserObjective = $(ele).next().html();
                        }else{
                            ojtThemeDto.anwserObjective += ","+$(ele).next().html();
                        }
                    });
                }else {
                    ojtThemeDto.anwserObjective = $("[name=answerChe]:checked:visible").next().html();
                }
                break;
            case "1114100214":
                ojtThemeDto.anwserObjective = $("[name=a]:checked:visible").val();
                break;
        }

        ojtThemeDto.delflag = 0;
        $.ajax({
            url: baseUrl + (isSave == 0 ? "ojt/hrOjtExamTheme/save/" : ("ojt/hrOjtExamTheme/update/" + ojtThemeDto.id)),
            type: isSave==0?'POST':'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtThemeDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        if($("#type:visible").val()=="1114100212"||$("#type:visible").val()=="1114100213"){
                            //新增试题成功，开始新增试题选项
                            if(isSave==0) {
                                saveThemeOptions();
                            }else {
                                editThemeOptions();
                            }
                        }else {
                            $.xljUtils.tip("green", "新增成功！");
                            closePage(ojtThemeDto.id,ojtThemeDto.themeTypeId);
                        }
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "保存试题失败！");
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
    
    function editThemeOptions() {
        $.ajax({
            // url: baseUrl + "/ojt/hrOjtThemeOptionChoice/deletePseudoBatchByThemeId/" + $("#id").val(),
            url: baseUrl + "/ojt/hrOjtThemeOptionChoice/deletePseudoBatch/" + themeOptionIds,
            type: 'DELETE',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        console.log("删除选项成功！");
                        saveThemeOptions();
                    } else {
                        $.xljUtils.tip("red", xhr.msg);
                    }
                } else {
                    $.xljUtils.tip("red", "更新选项失败,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "更新选项请求失败,请联系管理员！");
            }
        });
    }
    

    function saveThemeOptions(){
        var ojtThemeOptionsDto = {};
        var options = $("#options").find("div");
        options.each(function (index,optionDiv) {
            ojtThemeOptionsDto[index] = {};
            ojtThemeOptionsDto[index]["themeId"] = $("#id").val();
            ojtThemeOptionsDto[index]["delflag"] = 0;
            var optionNumber = $(optionDiv).find("span:first").html();
            ojtThemeOptionsDto[index]["answerOption"] = optionNumber;
            ojtThemeOptionsDto[index]["optionContent"] = $(optionDiv).find(":visible:text").val();
            if ($("#type:visible").val()=="1114100212"){
                if($("[name=answerRad]:visible[value="+optionNumber+"]").is(":checked")){
                    ojtThemeOptionsDto[index]["ifCorrect"] = "1";
                }else {
                    ojtThemeOptionsDto[index]["ifCorrect"] = "0";
                }
            }else {
                if($("[name=answerChe]:visible[value="+optionNumber+"]").is(":checked")){
                    ojtThemeOptionsDto[index]["ifCorrect"] = "1";
                }else {
                    ojtThemeOptionsDto[index]["ifCorrect"] = "0";
                }
            }
        });
        var data = {"datas":ojtThemeOptionsDto,id:$("#id").val()};
        $.ajax({
            url: baseUrl + "ojt/hrOjtThemeOptionChoice/saveList/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtThemeOptionsDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "保存成功！");
                        closePage($("#id").val(),$("#themeTypeSelect:visible").val());
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "保存选项失败！");
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
     *  新增选项
     */
    function addOption(){
        var options = $("#options").find("div");
        var number = options.length+1;
        if (number>6){
            $.xljUtils.tip("green", "最多只能有6个选项！");
            return;
        }
        var code = String.fromCharCode(64+number);
        $("#options").append("" +
            "<div style='vertical-align: middle'>"+
            "<input type='checkbox' style='vertical-align: middle;width: 17px'><span style='width: 20px;display: inline-block' id='option"+code+"'>"
            +code+"</span><span style='margin-right: 20px'>:</span>" +
            "<input class='form-control option' type='text' style='width: 250px;'placeholder='选项内容'>"+
            "</div>"+
            "");
        $("#radios").append("<input name='answerRad' value='"+code+"' type='radio'><span style='display: inline-block;margin: 0px 10px;'>"+code+"</span>");
        $("#checkbos").append("<input name='answerChe' value='"+code+"' type='checkbox'><span style='display: inline-block;margin: 0px 10px;'>"+code+"</span>");
    }

    /**
     *  删除选项
     */
    function delOption(){
        if($("#options").find("input:checkbox").length==0){
            $.xljUtils.tip("blue", "当前没有选项可以删除！");
            return;
        }
        var selectedOptions = $("#options").find("input:checkbox:checked");
        if(selectedOptions.length==0){
            $.xljUtils.tip("blue", "请选择要删除的选项！");
            return;
        }else if (selectedOptions.length > 0){
            $.xljUtils.confirm("blue", "确认要删除这【" + selectedOptions.length + "】条数据吗？", function () {
                for(var i = 0; i<selectedOptions.length;  i++){
                    var code = $(selectedOptions[i]).next().html();
                    $("#radios").find("span").each(function(index,span){
                        if($(span).html()==code){
                            $(span).prev().remove();
                            $(span).remove();
                        }
                    });
                    $("#checkbos").find("span").each(function(index,span){
                        if($(span).html()==code){
                            $(span).prev().remove();
                            $(span).remove();
                        }
                    });
                    $(selectedOptions[i]).parent().remove();
                }
                sortOptions();
            }, true);
        }

    }

    /**
     * 排序选项
     */
    function sortOptions(){
        var options = $("#options").find("div");
        var radios = $("#radios").find("span");
        var checkbos = $("#checkbos").find("span");
        if(options.length<=0)
            return;
        for(var i = 0; i<options.length;i++){
            var code = String.fromCharCode(65+i);
            $(options[i]).find("span:first").attr("id","option"+code);
            $(options[i]).find("span:first").html(code);

            $(radios[i]).html(code);
            $(checkbos[i]).html(code);
        }
    }

    /**
     * 根据试题类型，改变页面
     */
    window.forChanged = function (value){
        switch (value){
            case "1114100212":
                $("#delBtn").show();
                $("#addBtn").show();

                $("#optionTr").show();

                $("#radioAnsTr").show();
                $("#selectAnsTr").hide();
                $("#checkAnsTr").hide();
                $("#queAnsTr").hide();
                break;
            case "1114100213":
                $("#delBtn").show();
                $("#addBtn").show();

                $("#optionTr").show();

                $("#radioAnsTr").hide();
                $("#selectAnsTr").show();
                $("#checkAnsTr").hide();
                $("#queAnsTr").hide();
                break;
            case "1114100214":
                $("#delBtn").hide();
                $("#addBtn").hide();

                $("#optionTr").hide();

                $("#radioAnsTr").hide();
                $("#selectAnsTr").hide();
                $("#checkAnsTr").show();
                $("#queAnsTr").hide();
                break;
        }
    }

    /**
     * 校验表单
     */
    function validateForm(){
        var name = $("#name:visible").val();
        var type = $("#type:visible").val();
        var themeTypeId = $("#themeTypeSelect:visible").val();
        var difficulty = $("#difficulty:visible").val();
        var analysis = $("#analysis:visible").val();
        var remark = $("#remark:visible").val();

        if(name==""||name==null){
            pop_tip_open("red","请填写试题名称！");
            return false;
        }
        if (name.length>1000){
            pop_tip_open("red","试题名称长度不能超过1000位！");
            return false;
        }
        if(themeTypeId==""||themeTypeId==null){
            pop_tip_open("red","请选择试题分类！");
            return false;
        }
        if(difficulty==""||difficulty==null){
            pop_tip_open("red","请选择试题难度！");
            return false;
        }
        if (type=="1114100212"||type=="1114100213"){
            if($("#options").find("input:visible:checkbox").length<=1){
                pop_tip_open("red","选择题的选项不能少于1个！");
                return false;
            }
            // var isEmpty = false;
            var optionsText = $("#options").find("input:visible:text");
            for(var i = 0; i<optionsText.length;i++){
                if($(optionsText[i]).val() == ''){
                    pop_tip_open("red","请填写选项内容后再保存！");
                    // isEmpty = true;
                    return;
                }
                if($(optionsText[i]).length >1000){
                    pop_tip_open("red","选项内容长度不能超过1000位！");
                    // isEmpty = true;
                    return;
                }
            }
            // if(isEmpty){
            //     return false;
            // }
            // var isSame = false;
            var options = $("#options").find("div");
            for(var i = 0; i<options.length;i++){
                for(var j = 1; j<options.length;j++){
                    if(i==j)
                        continue;
                    if($(options[i]).find(":text:visible").val()==$(options[j]).find(":text:visible").val()){
                        pop_tip_open("red","选项内容不能重复！");
                        return;
                    }
                }
            }
            // if (isSame){
            //     return false;
            // }
            if($("#radios").find(":visible:radio:checked").length!=1&&type=="1114100212"){
                pop_tip_open("red","请选择试题答案！");
                return false;
            }
            if($("#checkbos").find(":visible:checkbox:checked").length<=1&&type=="1114100213"){
                pop_tip_open("red","多选题的试题答案不能少于1个！");
                return false;
            }

        }else if(type=="1114100214"){
            if($("[name=a]:visible:checked").length<=0){
                pop_tip_open("red","请选择试题答案！");
                return false;
            }

        }
        if(analysis==""||analysis==null){
            pop_tip_open("red","请填写试题解析！");
            return false;
        }
        if (analysis.length>1000){
            pop_tip_open("red","试题解析长度不能超过1000位！");
            return false;
        }

        if (remark.length>1000){
            pop_tip_open("red","说明长度不能超过1000位！");
            return false;
        }
        return true;
    }


    //关闭页面
    function closePage(themeId,themeTypeId) {
        //重新加载父页面
        if(window.opener.reloadThemeAndSelect!=undefined) {
            window.opener.reloadThemeAndSelect(themeId, themeTypeId);
        }
        //关闭本页面
        window.close();
    }
})(jQuery, window, document);
