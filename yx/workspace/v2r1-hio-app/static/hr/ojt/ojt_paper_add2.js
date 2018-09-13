/**
 * Created by jh on 2017/7/7.
 */
;(function($, window, document, undefined){
    var rowData;
    var vc ={};
    var id1;
    var id2;
    var id3;
    var disOut = new Array();
    var delRowId = new Array();
    var rowData;//当前选中数据
    var rowDataBefore;//上一次选中数据
    var paperTypeId;
    var delThemeIds;
    //var paper_id;
    /*保存试卷信息*/
    $("#saveCom").on('click',function(){
        //获取试卷页面的参数
        var name = $("#name").val();
        var duration = $("#duration").val();
        var totalScore = $("#totalScore").val();
        var passScore = $("#passScore").val();
        //var paperTypeId = $("#paperTypeId").val();
        var paperTypeId = $("#themeTypeSelect2 option:checked").val();
        var orgId = $("#orgId").val();
        var ifPublic = $('input:radio[name="ifPublic"]:checked').val();
        var status = $("#status option:checked").val();
        //var status = $("#status").val();
        var remark = $("#remark").val();
        if(name==""||name==null){
            pop_tip_open("red","请填写试卷名称！");
            return;
        }else if(duration==""||duration==null){
            pop_tip_open("red","请填写考试时间！");
            return;
        }else if(parseInt(duration)<0){
            pop_tip_open("red","考试时间不为负数！");
            return;
        }else if(totalScore==""||totalScore==null){
            pop_tip_open("red","请填写试卷分数！");
            return;
        }else if(parseInt(totalScore)<0){
            pop_tip_open("red","试卷分数不为负数！");
            return;
        }else if(passScore==""||passScore==null){
            pop_tip_open("red","请填写通过分数！");
            return;
        }else if(parseInt(passScore)<0){
            pop_tip_open("red","通过分数不为负数！");
            return;
        }else if(paperTypeId==""||paperTypeId==null){
            pop_tip_open("red","请填写试卷分类！");
            return;
        }else if(orgId==""||orgId==null||orgId=='orgId'){
            pop_tip_open("red","请填写所属机构！");
            return;
        }else if(ifPublic==""||ifPublic==null){
            pop_tip_open("red","请填写是否公开！");
            return;
        }else if(status==""||status==null){
            pop_tip_open("red","请填写试卷状态！");
            return;
        }else if(remark==""||remark==null){
            pop_tip_open("red","请填写试卷说明！");
            return;
        }
        //数量
        var ss2 = $("#str2").val();
        var ss5 = $("#str5").val();
        var ss8 = $("#str8").val();
        //总分值
        var ss3 = $("#str3").val();
        var ss6 = $("#str6").val();
        var ss9 = $("#str9").val();
        var totalSco = parseInt(Number(ss3)+Number(ss6)+Number(ss9));
        //单题分值
        var ss1 = $("#str1").val();
        var ss4 = $("#str4").val();
        var ss7 = $("#str7").val();
        var testId = $.xljUtils.getUrlParam("testId");
        var ids = jQuery("#listTheme").jqGrid('getDataIDs');
        var selectedRowIds = $("#listTheme").jqGrid('getGridParam','selarrrow');
        if (type == 'update') {
            var len = ids.length;
            var v1=0;
            var v2=0;
            var v3=0;
            for (var i = 0; i < len; i++) {
                var rowId = ids[i];//获取当前的数据行
                rowData = $('#listTheme').jqGrid('getRowData', rowId);
                var ss = rowData.type;
                if(ss=='单选题'){
                    v1 = v1+1;
                }else if (ss=='多选题'){
                    v2 = v2+1;
                }else if (ss=='判断题'){
                    v3 = v3+1;
                }
            }
        }else{
            if (ids && ids != "") {
                var len = ids.length;
                var v1=0;
                var v2=0;
                var v3=0;
                for (var i = 0; i < len; i++) {
                    var rowId = ids[i];//获取当前的数据行
                    rowData = $('#listTheme').jqGrid('getRowData', rowId);
                    var ss = rowData.type;
                    if(ss=='单选题'){
                        v1 = v1+1;
                    }else if (ss=='多选题'){
                        v2 = v2+1;
                    }else if (ss=='判断题'){
                        v3 = v3+1;
                    }
                }
            }else{
                pop_tip_open("red","请选择要添加的试题！");
                return;
            }
        }
        if(ss2!=v1){
            pop_tip_open("red","单选题数量不一致！");
            return;
        }else if (ss5!=v2){
            pop_tip_open("red","多选题数量不一致！");
            return;
        }else if (ss8!=v3){
            pop_tip_open("red","判断题数量不一致！");
            return;
        }else if (ss1*ss2!=ss3){
            pop_tip_open("red","单选题分值不一致！");
            return;
        }else if (ss4*ss5!=ss6){
            pop_tip_open("red","多选题分值不一致！");
            return;
        }else if (ss7*ss8!=ss9){
            pop_tip_open("red","判断题分值不一致！");
            return;
        }else if (totalScore != totalSco){
            pop_tip_open("red","试卷总分不一致!")
            return;
        }else if (parseInt(totalScore) <parseInt(passScore)){
            pop_tip_open("red","试卷总分不能小于通过分数!")
            return;
        }
        if(ss1==""||ss1==null||ss2==""||ss2==null||ss3==""||ss3==null){
            pop_tip_open("red","请将单选题填写完整！");
            return;
        }else if (ss4==""||ss4==null||ss5==""||ss5==null||ss6==""||ss6==null){
            pop_tip_open("red","请将多选题填写完整！");
            return;
        }else if (ss7==""||ss7==null||ss8==""||ss8==null||ss9==""||ss9==null){
            pop_tip_open("red","请将判断题填写完整！");
            return;
        }
        if (type == 'update') {
            var arr = new Array();
            var dto1 = {themeType:'1114100212',num:ss2,score:ss1,totalScore:ss3};
            dto1.delflag = 0;
            dto1.id=id1;
            var dto2 = {themeType:'1114100213',num:ss5,score:ss4,totalScore:ss6};
            dto2.delflag = 0;
            dto2.id=id2;
            var dto3 = {themeType:'1114100214',num:ss8,score:ss7,totalScore:ss9};
            dto3.delflag = 0;
            dto3.id=id3;
            arr.push(dto1);
            arr.push(dto2);
            arr.push(dto3);
        }else{
            var arr = new Array();
            var paperId =$("#nameId").val();/*试卷表id*/
            var dto1 = {paperId:paperId,themeType1:'1114100212',num1:ss2,score1:ss1,totalScore1:ss3};
            dto1.delflag = 0;
            var dto2 = {paperId:paperId,themeType1:'1114100213',num1:ss5,score1:ss4,totalScore1:ss6};
            dto2.delflag = 0;
            var dto3 = {paperId:paperId,themeType1:'1114100214',num1:ss8,score1:ss7,totalScore1:ss9};
            dto3.delflag = 0;
            arr.push(dto1);
            arr.push(dto2);
            arr.push(dto3);
        }

        if (type == 'update') {
            //修改试卷设置
            updateExamSet(arr);
            /*保存试题库信息*/
            if(disOut.length != 0){
                saveExams(disOut);
            }
            /*删除题库信息*/

            if(delRowId.length != 0){
                del(delRowId);
            }
            /*修改试卷信息*/
            updateInfo(testId);
        }else {
            /*保存试题库信息*/
            saveExams(ids);
            /*保存试卷设置*/
            saveTestBus(arr);
            //保存试卷表
            var dto = {name:name,duration:duration,totalScore:totalScore,passScore:passScore,paperTypeId:paperTypeId,orgId:orgId,ifPublic:ifPublic,status:status,remark:remark};
            dto.id=$("#nameId").val();
            dto.delflag = 0;
            saveExamPapers(dto);
        }
    });

    //修改试卷设置
    function updateExamSet(arr) {
        for(var i=0;i<arr.length;i++){
            $.ajax({
                url: baseUrl + "ojt/hrOjtPaperComposition/update/" + arr[i].id,
                type: 'put',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify(arr[i]),
                success: function (resultData) {
                    if (resultData) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var msg = resultData.msg;
                        if (successFlag) {
                            $.xljUtils.tip("green", "修改成功！");
                            //closePage();
                        }
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "数据修改保存请求失败");
                }
            });
        }
    }
    //保存试卷表
    function saveExamPapers(dto) {
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtExamPapers/save",
            data: JSON.stringify(dto),
            dataType: "JSON",
            contentType:"application/json",
            success: function(){
                //alert(dto.id);
                closePage(dto.id);
                //pop_tip_open("blue","保存成功！");
            }
        });
    }
    /*保存试卷构成表*/
    function saveTestBus(arr) {
            var dt = {rowData1:arr};
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtPaperComposition/saveTestBus",
            data: JSON.stringify(dt),
            dataType: "JSON",
            contentType:"application/json",
            success: function(){
            }
        });
    }
    /*保存试题库信息*/
    function saveExams(ids) {
        if (type == 'update') {
            var paperId = $.xljUtils.getUrlParam("testId");
        }else{
            var paperId = id=$("#nameId").val();/*试卷表id*/
        }
        //var selectedRowIds = $("#listTheme").jqGrid('getGridParam','selarrrow');
        //var rowId = $('#listUser_px').jqGrid("getGridParam", "selrow");
        var len = ids.length;
        var li = new Array();
        for (var i = 0; i < len; i++) {
            var rowId1 = ids[i];//获取当前的数据行
            rowData = $('#listTheme').jqGrid('getRowData', rowId1);
            var obj = {paperId:paperId,remark:rowData.remark,id:rowData.id};
            //formatDa(rowData);
            li.push(obj);
        }
        var dt = {rowData1:li};
        dt.paperId = paperId;
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtExamPaperTheme/saveBus",
            data: JSON.stringify(dt),
            dataType: "JSON",
            contentType:"application/json",
            success: function(){
                //pop_tip_open("blue","保存成功！");
            }
        });
    }
    /**
     * 删除
     */
    function del(selectedRowIds) {
        if (selectedRowIds && selectedRowIds != "") {
            $.ajax({
                url: baseUrl + "ojt/hrOjtExamPaperTheme/deleteBatch/" + selectedRowIds,
                type: 'DELETE',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({}),
                success: function (xhr, textStatus) {
                    console.log(xhr);
                    if (xhr) {
                        if (xhr.success) {
                            $.xljUtils.tip("green", "数据删除成功！");
                            //$('#themeList').jqGrid().trigger("reloadGrid");
                        } else {
                            $.xljUtils.tip("red", xhr.msg);
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
    }

    /*删除试题  页面的展示删除*/
    $("#deleteRecord").on('click',function () {
        var selectedRowIds = $("#listTheme").jqGrid('getGridParam','selarrrow');
        var num1 = 0;
        var num2 = 0;
        var num3 = 0;
        if (selectedRowIds && selectedRowIds != "") {
            /*删除试题*/
            var le = selectedRowIds.length;
            for(var i = 0;i < le ;i++) {
                delRowId.push(selectedRowIds[0]);
                $("#listTheme").jqGrid("delRowData", selectedRowIds[0]);
            }
            /*动态计算试题数量*/
            var listThemeIds = jQuery("#listTheme").jqGrid('getDataIDs');
            if(listThemeIds.length >0 ){
                for(var j = 0;j<listThemeIds.length;j++){
                    var rowThemeData = $('#listTheme').jqGrid('getRowData', listThemeIds[j]);
                    var themeName = rowThemeData.type;
                    if(themeName == '单选题'){
                        num1 = num1 + 1;
                    }else if(themeName == '多选题'){
                        num2 = num2 + 1;
                    }else if(themeName == '判断题'){
                        num3 = num3 + 1;
                    }
                }
                //单题分值
                var ss1 = $("#str1").val();
                var ss4 = $("#str4").val();
                var ss7 = $("#str7").val();
                if (ss1 == ''){
                    ss1 = '1';
                    $("#str1").val("1");
                }
                if (ss4 == ''){
                    ss4 = '1';
                    $("#str4").val("1");
                }
                if (ss7 == ''){
                    ss7 = '1';
                    $("#str7").val("1");
                }
                //数量
                $("#str2").val(num1);
                $("#str5").val(num2);
                $("#str8").val(num3);
                //总分值
                $("#str3").val((num1)*(ss1));
                $("#str6").val((num2)*(ss4));
                $("#str9").val((num3)*(ss7));
                // var ss3 = $("#str3").val();
                // var ss6 = $("#str6").val();
                // var ss9 = $("#str9").val();
                // var totalSco = (ss3)+(ss6)+(ss9);
                var totalSco = (num1)*(ss1)+(num2)*(ss4)+(num3)*(ss7);
                if(String(totalSco).indexOf(".")>-1){
                    $.xljUtils.tip("blue", "总分不能为小数，已为您舍去！");
                }
                var totalScore = $("#totalScore").val(parseInt(totalSco));
            }
        } else {
            $.xljUtils.tip("blue", "请选择要删除的试题！");
        }});
    /*试题分类*/
    $("#themeTypeSelect").on('change',function () {
        examClassifyId = $("#themeTypeSelect option:checked").val();
        //或刷新连带表格
        var queryDataPost = {
            "examClassifyId": examClassifyId
        };
        $('#listUser_px').jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
        jQuery("#listUser_px").trigger("reloadGrid");
    });
    /**
     * 刷新grid
     */
    window.reloadGrid=function(){
        $.xljUtils.tip("green","数据操作成功！");
        $('#demoList').jqGrid().trigger("reloadGrid");
    }
    /*试题类型*/
    $("#examStyle").on('change',function () {
        var examStyle = $("#examStyle").val();
        //或刷新连带表格
        var queryDataPost = {
            "examStyle": examStyle
        };
        $('#listUser_px').jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
        jQuery("#listUser_px").trigger("reloadGrid");
    });
    //刷新试题列表 ，排除选中的试题
    function updateList (themeIds) {
        /*//或刷新连带表格
        var queryDataPost = {
            "themeIds": themeIds
        };
        $('#listUser_px').jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");*/
        var vRowData = new Array();
        var le = themeIds.length;
        for(var i = 0;i < le ;i++) {
            /*var rowData = $('#listTheme').jqGrid('getRowData', themeIds[i]);
            vRowData.push(rowData);
            var themeId = rowData.themeId;*/
            $("#listUser_px").jqGrid("delRowData", themeIds[i]);
        }
    }
    $("#add").on('click',function () {
        listUser_px();
    });
    /*新增试题信息表*/
    $("#confirm").on("click",function(){
        var paperId = id=$("#nameId").val();/*试卷表id*/
        var idsVal1 = $("#listUser_px").jqGrid('getGridParam','selarrrow');//选中的需要添加的试题
        var ids = jQuery("#listTheme").jqGrid('getDataIDs');//页面上展示的试题
        var num1 = 0;
        var num2 = 0;
        var num3 = 0;
        if (idsVal1 && idsVal1 != "") {
            /*if (idsVal.length==1) {*/
            if(ids.length >0 ){//校验是否是重复试题
                var dd = new Array();
                var qq="";
                for (var i =0;i<idsVal1.length;i++){
                    var rowThemeData2 = $('#listUser_px').jqGrid('getRowData', idsVal1[i]);
                    var themeName2 = rowThemeData2.name;
                    var ww=false;
                    for(var j = 0;j<ids.length;j++){
                        var rowThemeData = $('#listTheme').jqGrid('getRowData', ids[j]);
                        var themeName = rowThemeData.name;
                        if(!ww&&themeName == themeName2){
                            qq =qq +' \n '+ themeName;
                            dd.push(idsVal1[i]);
                            ww =true;
                        }
                    }
                    if (!ww){
                        disOut.push(idsVal1[i]);
                        $("#gview_listUser_px #"+idsVal1[i]+"").trigger("click");/!*取消选中状态*!/
                    }
                }
                if (dd.length>0){
                    $.xljUtils.tip("green","[["+qq+"]] 这"+dd.length+"道题不能重复添加！","2000");
                    //return;
                }
                if (disOut.length>0){
                    checkRowDate(disOut);
                    updateList (disOut);
                }
            }else {
                disOut = idsVal1;
                checkRowDate(idsVal1);
                updateList (idsVal1);
            }
            $(".nicescroll-rails:eq(6)").css('display','none');
            $(".nicescroll-rails:eq(7)").css('display','none');
                /*动态计算试题数量*/
                var listThemeIds = jQuery("#listTheme").jqGrid('getDataIDs');
                if(listThemeIds.length >0 ){
                    for(var j = 0;j<listThemeIds.length;j++){
                        var rowThemeData = $('#listTheme').jqGrid('getRowData', listThemeIds[j]);
                        var themeName = rowThemeData.type;
                        if(themeName == '单选题'){
                            num1 = num1 + 1;
                        }else if(themeName == '多选题'){
                            num2 = num2 + 1;
                        }else if(themeName == '判断题'){
                            num3 = num3 + 1;
                        }
                    }
                    //单题分值
                    var ss1 = $("#str1").val();
                    var ss4 = $("#str4").val();
                    var ss7 = $("#str7").val();
                    if (ss1 == ''){
                        ss1 = '1';
                        $("#str1").val("1");
                    }
                    if (ss4 == ''){
                        ss4 = '1';
                        $("#str4").val("1");
                    }
                    if (ss7 == ''){
                        ss7 = '1';
                        $("#str7").val("1");
                    }
                    //数量
                    $("#str2").val(num1);
                    $("#str5").val(num2);
                    $("#str8").val(num3);
                    //总分值
                    $("#str3").val((num1)*(ss1));
                    $("#str6").val((num2)*(ss4));
                    $("#str9").val((num3)*(ss7));
                    // var ss3 = $("#str3").val();
                    // var ss6 = $("#str6").val();
                    // var ss9 = $("#str9").val();
                    // var totalSco = (ss3)+(ss6)+(ss9);
                    var totalSco = (num1)*(ss1)+(num2)*(ss4)+(num3)*(ss7);
                    if(String(totalSco).indexOf(".")>-1){
                        $.xljUtils.tip("blue", "总分不能为小数，已为您舍去！");
                    }
                    var totalScore = $("#totalScore").val(parseInt(totalSco));
                }
            /*}else {
                $.xljUtils.tip("blue", "同时只能添加一道试题！");
            }*/
        } else {
            $.xljUtils.tip("blue", "请选择要添加的试题！");
        }
    });
    /*校验试题数量*/
    function checkRowDate(idsVal) {
        //数量
        var ss2 = $("#str2").val();
        var ss5 = $("#str5").val();
        var ss8 = $("#str8").val();
        var ids = jQuery("#listTheme").jqGrid('getDataIDs');
        var len = idsVal.length;
        for (var i = 0; i < len; i++) {
            var rowId = idsVal[i];//获取当前的数据行
            rowData = $('#listUser_px').jqGrid('getRowData', rowId);
            if(type == 'add'){
                movePaperToAdd(rowData);
            }else{
                $('#listTheme').jqGrid('addRowData', rowData.id,rowData,'last');
            }
        }
    }
    function movePaperToAdd(rowData){
        var ids = jQuery("#listTheme").jqGrid('getDataIDs');
        $("#listTheme").jqGrid(
            {
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : '序号',width : 100,align : "center",hidden : true},
                    {name : 'name',label : '试题名称',width : 250,align : "center"},
                    {name : 'themeTypeId',label : '试题分类id',width : 300,align : "center",hidden:true},
                    {name : 'themeTypeName',label : '试题分类',width : 300,align : "center"},
                    {name : 'type',label : '试题类型',width : 300,align : "center",formatter:codeFmatter},
                    {name : 'difficulty',label : '难度',width : 300,align : "center",formatter:codeFmatter},
                    {name : 'remark',label : '说明',width : 150,align : "center"}
                ],
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                autowidth:true,
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadComplete: function (xhr) {
                    $("#listTheme").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'scroll' });
                }
            });
        if(rowData != null){
            var data = {
                'id':rowData.id,
                'name':rowData.name,
                'themeTypeId':rowData.themeTypeId,
                'themeTypeName':rowData.themeTypeName,
                'type':rowData.type,
                'difficulty':rowData.difficulty,
                'remark':rowData.remark
            };
            $("#listTheme").jqGrid('addRowData',rowData.id, data,'last');
            $("#listTheme").jqGrid('setSelection',rowData.id);
        }
    }
    /**
     * 根据id加载信息
     */
    function getOjtDemandById(rowId,paperId) {
        var uBody = "/ojt/hrOjtExamTheme/get/" + rowId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var remark = data.result.remark;
                vc = {paperId:paperId,themeId:rowId,remark:remark};
                return;
                //initUuid2();
                var them = {paperId:paperId,themeId:rowId,remark:remark};
                //them.id=$("#themeId").val();
                them.delflag = 0;
                $.ajax({
                    type: "POST",
                    url:hostUrl+ "ojt/hrOjtExamPaperTheme/save",
                    data: JSON.stringify(them),
                    dataType: "JSON",
                    contentType:"application/json"
                });
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "添加试题失败");
            }
        })
    }
    /*function saveComById(arr) {
     $.ajax({
     type: "POST",
     url:hostUrl+ "ojt/hrOjtPaperComposition/save",
     data: JSON.stringify(arr),
     dataType: "JSON",
     contentType:"application/json",
     success: function(){
     pop_tip_open("blue","保存成功！");
     closePage();
     }
     });
     }*/
    /*初始化进行试题页面的展示*/
    function listUser_px(){
        var ubody = "ojt/hrOjtExamTheme/queryListByConditionByPage";
        var uall = hostUrl+ubody;
        //var idd = examClassifyId;
        //创建jqGrid组件
        jqGridRule_social = jQuery("#listUser_px").jqGrid(
            {
                url: uall,
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",
                contentType : "application/json",
                datatype : "json",
                width:$('.mytable').width(),
                height:$('.mytable').height(),
                jsonReader : {
                    //root:"result"
                },
                autowidth:true,
                // rownumbers: true,
                multiselect: true,
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : '序号',width : 200,align : "center",hidden : true},
                    //{name : 'themeId',label : '试题id',width : 300,align : "center",hidden:true},
                    {name : 'name',label : '试题名称',width : 220,align : "center"},
                    {name : 'themeTypeId',label : '试题分类id',width : 200,align : "center",hidden:true},
                    {name : 'themeTypeName',label : '试题分类',width : 220,align : "center"},
                    {name : 'type',label : '试题类型',width : 200,align : "center",hidden:true},
                    {name : 'difficulty',label : '难度',width : 200,align : "center",hidden:true},
                    {name : 'typeDisplay',label : '试题类型',width : 220,align : "center",formatter:codeFmatter},
                    {name : 'difficultyDisplay',label : '难度',width : 220,align : "center",formatter:codeFmatter},
                    {name : 'remark',label : '说明',width : 100,align : "center",hidden:true}
                ],
                //rowNum : -1,//一页显示多少条 -1全部
                rowNum: 20,//一页显示多少条 -1全部
                rowList: [20, 50, 100,200],//可供用户选择一页显示多少条
                pager: "#pager2",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
                /*sortname : 'id',//初始化的时候排序的字段
                sortorder : "desc",//排序方式,可选desc,asc*/
                loadError:function(xhr,status,error){
                    pop_tip_open("red","初始化人员列表请求失败");
                },
                onCellSelect: function(){
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                        //重新选择行时清除上一次选中行的样式
                        $('#listUser_px'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                /*gridComplete: function () {
                   /!* $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();*!/
                    rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                        //添加回显选中行样式
                        $('#listUser_px').setSelection(rowDataBefore.id,true);
                        $('#listUser_px '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                },*/
                /*loadComplete: function (xhr) {
                    $("#listUser_px").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'scroll' });
                },*/
                loadComplete: function (xhr) {
                    $("#listUser_px").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'scroll' });
                    /*var rowDat = xhr.result;
                    for (var i=0;i<rowDat.length;i++){
                        $("#listUser_px").jqGrid("delRowData", rowDat[i].themeId);
                    }*/
                },
                viewrecords : true
            });
    }
    function deleteRecord() {
        pop_text_open("blue", '是否确定删除？', function () {
            pop_tip_open("blue", "删除成功！");
        }, function () {
        });
    }
    /**
     * 新增-初始化主键ID
     */
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var id = data.result;
                $("#nameId").val(id);
                initUuid2();
                initUuid4();
                initUuid5();
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }
    function initUuid2() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var id = data.result;
                $("#themeId").val(id);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }
    function initUuid4() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var id = data.result;
                $("#listPaperSetId2").val(id);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }
    function initUuid5() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var id = data.result;
                $("#listPaperSetId3").val(id);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     * 试卷设置
     */
    function paperSetInit() {
        /*var ubody = "sys/org/user/queryUserListByOrgId";
         var uall = hostUrl + ubody;*/
        //创建jqGrid组件
        jqGridUser = jQuery("#listPaperSet").jqGrid(
            {
                //url: "local",
                datatype:"local", //为local时初始化不加载，支持json，xml等
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                contentType: "application/json",
                postData: {"orgId": "", "includelow": "0"},
                width: $('.mytable').width(),
                height: $('.mytable').height() - 45,
                jsonReader: {
                    root: "result"
                },
                rownumbers: true,
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    // {name: 'id', label: "序号", width: 55, align: "center"},
                    {name: 'type', label: "类型", width: 100, align: "center",sortable:false},
                    {name: 'single_score', label: "单题分值", width: 100, align: "center",sortable:false},
                    {name: 'amount', label: "数量", width: 100, align: "center",sortable:false},
                    {name: 'total_score', label: "总分", width: 100, align: "center",sortable:false},
                ],
                rowNum: -1,//一页显示多少条 -1全部
                //sortname: 'id',//初始化的时候排序的字段
                //sortorder: "desc",//排序方式,可选desc,asc
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }
            });
        //创建jqGrid组件
        var mydata = [
            {
                id: "1",
                type: "单选题",
                single_score: "<input id='str1' type='text' class='form-control' style='width: 150px;position:relative;left:25%;text-align: center;' class='form-control' style='width: 150px;position:relative;left:25%'/>",
                amount: "<input id='str2' type='text' class='form-control' style='width: 150px;position:relative;left:25%;text-align: center;'/>",
                total_score: "<input id='str3' type='text' class='form-control' style='width: 150px;position:relative;left:25%;text-align: center;'/>"
            },
            {
                id: "1",
                type: "多选题",
                single_score: "<input id='str4' type='text' class='form-control' style='width: 150px;position:relative;left:25%;text-align: center;'/>",
                amount: "<input id='str5' type='text' class='form-control' style='width: 150px;position:relative;left:25%;text-align: center;'/>",
                total_score: "<input id='str6' type='text' class='form-control' style='width: 150px;position:relative;left:25%;text-align: center;'/>"
            },
            {
                id: "1",
                type: "判断题",
                single_score: "<input id='str7' type='text' class='form-control' style='width: 150px;position:relative;left:25%;text-align: center;'/>",
                amount: "<input id='str8' type='text' class='form-control' style='width: 150px;position:relative;left:25%;text-align: center;'/>",
                total_score: "<input id='str9' type='text' class='form-control' style='width: 150px;position:relative;left:25%;text-align: center;'/>"
            },
        ];
        for (var i = 0; i <= mydata.length; i++) {
            jQuery("#listPaperSet").jqGrid('addRowData', i + 1, mydata[i]);
        }
        $("#userDiv .tableStyle").css("height",160);
    }


    $("#paperPreview").on("click",function () {
        var testId = $.xljUtils.getUrlParam("testId");
        //window.open('ojt_paper_preview.html?type=add2&paperId=' + testId);
        window.open('ojt_paper_preview.html?paperId=' + testId + '&type=add2');
    });
    $("#closeWindow").on('click',function () {
        pop_text_open("blue", '是否确定关闭？', function () {
            window.close();
        }, function () {
        });
    });

    /**
     * 根据id加载试卷信息
     */
    function getOjtTestById(testId) {
        var uBody = "/ojt/hrOjtExamPapers/get/" + testId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#name").val(data.result.name);
                $("#totalScore").val(data.result.totalScore);
                $("#passScore").val(data.result.passScore);
                $("#duration").val(data.result.duration);
                $("#status").val(data.result.status);
                $("#status").attr("disabled","disabled");
                $("#remark").val(data.result.remark);
                setTimeout(function(){
                    $("#themeTypeSelect2").val(data.result.paperTypeId);
                },300);
                //$("#orgName").val(data.result.orgId);
                getOrgNameById(data.result.orgId);
                if(data.result.ifPublic=='1'){
                    $('input:radio[name="ifPublic"]input[id="yes"]').prop('checked',true);
                }else {
                    $('input:radio[name="ifPublic"]input[id="no"]').prop('checked',true);
                }
                getCanEditIfPublic(data.result.createPersonId);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化请求失败");
            }
        })
    }

    function getCanEditIfPublic(createPersonId) {
        var uAll = hostUrl + "ojt/hrOjtSubject/canEditIfPublic/"+createPersonId;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                if (data.success){
                    if(data.result){
                        $("#yes").removeAttr("disabled");
                        $("#no").removeAttr("disabled");
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log(XMLHttpRequest);
            }
        })
    }
    /*根据id加载试卷设置信息*/
    function getOjtTest2ById(testId) {
        var uBody = "ojt/hrOjtExamPapers/queryListByTest2";
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'POST',
            url: uAll,
            data:JSON.stringify({
                id:testId
            }) ,
            dataType: "JSON",
            contentType:"application/json",
            success: function (data) {
                var ff = data.result;
                for (var i=0;i<ff.length;i++){
                    if(ff[i].themeType=='1114100212'){
                        $("#str1").val(ff[i].score);
                        $("#str2").val(ff[i].num);
                        $("#str3").val(ff[i].totalScore);
                        id1=ff[i].id;
                    }else if(ff[i].themeType=='1114100213'){
                        $("#str4").val(ff[i].score);
                        $("#str5").val(ff[i].num);
                        $("#str6").val(ff[i].totalScore);
                        id2=ff[i].id;
                    }else if(ff[i].themeType=='1114100214'){
                        $("#str7").val(ff[i].score);
                        $("#str8").val(ff[i].num);
                        $("#str9").val(ff[i].totalScore);
                        id3=ff[i].id;
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "加载试卷设置信息");
            }
        })
    }

    /*修改试题信息页面的展示*/
    function getListByTheme(testId){
        var ubody = "ojt/hrOjtExamPapers/queryListByTheme";
        var uall = hostUrl+ubody;
        //创建jqGrid组件
        jqGridRule_social = jQuery("#listTheme").jqGrid(
            {
                url: uall,
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",
                postData: {"id": testId},
                contentType : "application/json",
                datatype : "json",
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                autowidth:true,
                multiboxonly: true,
                rownumbers: true,
                multiselect: true,
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : '序号',width : 300,align : "center",hidden : true,key:true},//hr_ojt_exam_paper_theme的id
                    {name : 'name',label : '试题名称',width : 300,align : "center"},
                    {name : 'themeTypeId',label : '试题分类id',width : 300,align : "center",hidden:true},
                    {name : 'themeTypeName',label : '试题分类',width : 300,align : "center"},
                    {name : 'type',label : '试题类型',width : 300,align : "center",formatter:codeFmatter},
                    {name : 'difficulty',label : '难度',width : 300,align : "center",formatter:codeFmatter},
                    {name : 'remark',label : '说明',width : 300,align : "center"}
                ],
                rowNum : -1,//一页显示多少条 -1全部
                /*sortname : 'id',//初始化的时候排序的字段
                sortorder : "desc",//排序方式,可选desc,asc*/
                loadError:function(xhr,status,error){
                    pop_tip_open("red","初始化人员列表请求失败");
                },
                loadComplete: function (xhr) {
                    $("#listTheme").closest(".ui-jqgrid-bdiv").css({ 'overflow-y' : 'scroll' });
                    /*var rowDat = xhr.result;
                    for (var i=0;i<rowDat.length;i++){
                        $("#listUser_px").jqGrid("delRowData", rowDat[i].themeId);
                    }*/
                },
                gridComplete: function () {
                    //刷新试题列表 ，排除选中的试题
                     var themeIds = jQuery("#listTheme").jqGrid('getDataIDs');
                    /*var vId = new Array();
                    for (var i=0;i<themeIds.length;i++){
                        vId.push(themeIds[i]);
                    }
                     updateList(vId);*/
                    /*var vRowData = new Array();
                    var le = themeIds.length;
                    for(var i = 0;i < le ;i++) {
                        var rowData = $('#listTheme').jqGrid('getRowData', themeIds[i]);
                        vRowData.push(rowData);
                        var themeId = rowData.themeId;
                        $("#listUser_px").jqGrid("delRowData", themeId);
                    }*/
                }
    });
        $("#gbox_listTheme .ui-jqgrid-bdiv").css("height",200);
    }
    /**
     *  代码项
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    function codeFmatter(cellvalue, options, rowObject) {
        if(options.gid=="listUser_px"){
            if(options.pos == 7){
                return $.hrUtils.getHRCodeNameById(rowObject.type);
            }
            if(options.pos == 8){
                return $.hrUtils.getHRCodeNameById(rowObject.difficulty);
            }
        }
        return $.hrUtils.getHRCodeNameById(cellvalue);
    }
    /**
     * 修改
     * @param n
     */
    function updateInfo(testId) {
        //获取页面的参数
        var name = $("#name").val();
        var duration = $("#duration").val();
        var totalScore = $("#totalScore").val();
        var passScore = $("#passScore").val();
        //var paperTypeId = $("#paperTypeId").val();
        var paperTypeId = $("#themeTypeSelect2 option:checked").val();
        var orgId = $("#orgId").val();
        var ifPublic = $('input:radio[name="ifPublic"]:checked').val();
        var status = $("#status option:checked").val();
        //var status = $("#status").val();
        var remark = $("#remark").val();
        //修改试卷表
        var dto = {name:name,duration:duration,totalScore:totalScore,passScore:passScore,paperTypeId:paperTypeId,orgId:orgId,ifPublic:ifPublic,status:status,remark:remark};
        //dto.id=$("#nameId").val();
        dto.delflag = 0;
        $.ajax({
            url: baseUrl + "ojt/hrOjtExamPapers/update/" + testId,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(dto),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        $.xljUtils.tip("green", "修改成功！");
                        //window.opener.reloadPaperList(id);
                        closePage(testId);
                    } else {
                        pop_tip_open("red", "数据修改保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
    }
    /**
     * 初始化试题分类下拉框
     */
    function initTypeSelect(){
        $("#themeTypeSelect").empty();
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtThemeType/queryList",
            data: JSON.stringify({}),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                // pop_tip_open("blue","新增成功！");
                var result = data.result;
                if(result == null || result.length==0){
                    return;
                }
                $("#themeTypeSelect").append("<option name='quanbu' value=''>全部</option>");
                for(var i =0;i<data.result.length;i++){
                    $("#themeTypeSelect").append("<option value="+result[i].id+">"+result[i].name+"</option>");
                }
            }
        });
    }
    /*初始化试卷分类*/
    function initPaperTypeSelect(){
        $("#themeTypeSelect2").empty();
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtPaperType/queryList",
            data: JSON.stringify({}),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                // pop_tip_open("blue","新增成功！");
                var result = data.result;
                if(result == null || result.length==0){
                    return;
                }
                for(var i =0;i<data.result.length;i++){
                    $("#themeTypeSelect2").append("<option value="+result[i].id+">"+result[i].name+"</option>");
                }
                $("#themeTypeSelect2").val(paperTypeId);
            }
        });
    }
    //清空组织机构
    window.emptyOrg = function () {
        $("#paperBasic").find("input[id='orgId']").val("");
        $("#paperBasic").find("input[id='orgName']").val("");
    }
    /**
     *  获取机构信息
     * @param data
     */
    window.orgCallback = function (data) {
        var orgId = data.id;
        $("#orgId").val(data.id);
        $("#orgName").val(data.prefixName);
        // $("#orgName").val(data.name);
    }
    //获取机构名称
    window.getOrgNameById = function (orgId) {
        var uBody = "org/org/get/" + orgId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //回显上级机构信息
                /*$("#allowanceStandardEditFrom").find("input[name='orgId']").val(data.result.id);
                 $("#allowanceStandardEditFrom").find("input[id='orgName']").val(data.result.name);*/
                $("#orgId").val(data.result.id);
                $("#orgName").val(data.result.name);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "获取分配机构请求失败");
            }
        })
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
                        if(item.id == '1015100045'){
                            $("#status").val(item.name);
                            $("#status").attr("disabled","disabled");
                        }
                    });
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "代码项初始化失败");
            }
        });
    }
    /**
     * 打开新窗口:弹出页面；
     * 去掉"_blank",则弹出窗口
     */
    function openNewWindow(src) {
        window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 120) + ',top=40, left=100');
    }
    //计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".row .modal-body").height(w_h-80);
        $(".row .modal-body").niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "6px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: true, // nicescroll可以管理水平滚动
            background: "#fff"
        });
        //右侧table
        $(".con-table .mytable").height((w_h-350)+"px");
    }
    //计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }
    //grid 自适应宽度
    // $(window).resize(function () {
    //     resizeHeight();
    //     resizeGrid();
    // });
    $(function () {
        type = $.xljUtils.getUrlParam("type");
        if (type == 'add') {
            $("#paperPreview").hide();
        }
        resizeHeight();
        resizeGrid();
        initUuid();
        listUser_px();
        paperSetInit();
        initTypeSelect();/*初始化试题分类下拉框*/
        initPaperTypeSelect();/*初始化试卷分类下拉框*/
        initCodeSelect("1015","status");
        if (type == 'add') {
            movePaperToAdd();
            $('title').text("试卷-新增");
            $(".xj-form-title").text("试卷-新增");
            paperTypeId = $.xljUtils.getUrlParam("paperTypeId");
            $("#yes").removeAttr("disabled");
            $("#no").removeAttr("disabled");
        } else if (type == 'update') {
            $('title').text("试卷-修改");
            $(".xj-form-title").text("试卷-修改");
            //根据id加载数据
            var testId = $.xljUtils.getUrlParam("testId");
            getOjtTestById(testId); /*修改根据id加载试卷信息的展示*/
            getOjtTest2ById(testId); /*根据id加载试卷设置信息*/
            getListByTheme(testId); /*修改试题信息页面的展示*/
        }
    });
    //关闭页面
    function closePage(id) {
        //重新加载父页面
        //window.opener.location.reload();
        if(window.opener.reloadPaperList!=undefined) {
            window.opener.reloadPaperList(id);
        }
        //关闭本页面
        window.close();
    }
})(jQuery, window, document);