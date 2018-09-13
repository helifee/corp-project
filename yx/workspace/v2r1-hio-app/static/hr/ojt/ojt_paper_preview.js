/**
 * Created by jh on 2017/7/13.
 */
(function($, window, document, undefined){
    /**
     * 全局变量
     */
    var paperName;
    var examTotalScore;//试卷总分
    var totalScore;//试题总分
    var duration;//考试时间
    var themeInfos;//当前试卷的试题信息
    var planId;/*考试id*/
    var subjectId;/*课程id*/
    var personId;/*考生id*/
    var examType;//考试类别。add2为预览，planExam为计划考试，subjectExam为课程考试
    var startDate;/*开始考试点*/
    var endDate;/*结束考试点*/
    var scoreTotal = 0;/*考试总分*/
    var infoId;//之前考试id
    var oldData;//已考数据。若第一次考试则无数据
    var timer; //定时器，考试时间倒计时

    var ifTiming;
    //-------------------------------------------------------------------
    //var v = {"doubanList":[{"type":"类型1","neirong":{"问题1":{"problem":["试题选项内容1","试题选项内容2"]},"问题2":{"problem":["试题选项内容1","试题选项内容2"]}}},{"type":"类型2","neirong":{"问题1":{"problem":["试题选项内容1","试题选项内容2"]},"问题2":{"problem":["试题选项内容1","试题选项内容2"]}}}]};
    //var v = {"type":"类型1","neirong":{"problem":"问题1","reirong":["试题选项内容1","试题选项内容2"]}};
    var v= [{"type":"类型1","neirong":[{"problem":"问题1","option":["试题选项内容1","试题选项内容2"]}]},{"type":"类型2","neirong":[{"problem":"问题2","option":["试题选项内容3","试题选项内容4"]}]}];
    /*
     * {"duration":2,"paperName":"zzzz","themeName":"ewqeq","score":1,"ifCorrect":"0","type":"1","optionContent":"z","answerOption":"A"}
     * */
    function detailAlias(v)
    {
        var j =0;
        $.each(v,function(i)
        {
            var neiro = v[i].neirong;
            $("#showAailas").append("<div class='listboxunion' id='"+ v[i].index +"'><div class='title tt'>"+ v[i].type +"</div></div>");
            $.each(neiro,function(i){
                $("#showAailas").append("<div class='listboxunion' id='"+ neiro[i].index +"'><div class='title tt'>"+ neiro[i].problem +"</div></div>");
                $.each(neiro.option,function(j){
                    $("#showAailas").append("<div class='listboxunion' id='"+ neiro.option[j].index +"'><div class='title tt'>"+ neiro.option[j] +"</div></div>");

                });
            });
        });
    };
    //关闭页面
    $("#close").on('click',function () {
        closePage();
    });
    /*提交试题*/
    $("#confirm").on('click',function () {
        savePaper(1);
    });
    /*暂存试题*/
    $("#save").on('click',function () {
        savePaper(2);
    });

    function savePaper(flag) { //flag等于1为交卷，flag等于2为暂存，flag等于3为开始考试
        if(examType != 'add2'){
            updateThemeInfos();
            var v = getTotalScore(themeInfos);
            if (oldData==undefined || oldData.length<=0){
                //第一次考试
                saveAnswer(v);
            }else{
                //非第一次考试
                for (var i =0;i<oldData.length;i++){
                    for (var j=0;j<v.length;j++){
                        if (v[j].sort == oldData[i].sort){
                            //unpdateAnswer(vDat[i].id,v[j]);
                            v[j].id=oldData[i].id;
                        }
                    }
                }
                updataAnswerList(v);
            }
            switch (flag){//flag等于1为交卷，flag等于2为暂存，flag等于3为开始考试
                case 1:
                    updateExam(0);//更新hrOjtExamInfo
                    clearInterval(timer);
                    break;
                case 2:
                    updateExam(1);//更新hrOjtExamInfo
                    break;
                case 3:
                    break;
            }
        }
    }

    function updateThemeInfos() {
        if (examType == "subjectExam") {
            queryExamAnswerInfo(subjectId, personId);
        } else if (examType == "planExam") {
            queryExamAnswerInfo(planId, personId);
        }
    }

    function updataAnswerList(v) {
        var uBody = "ojt/hrOjtExamAnswer/updataAnswerList";
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'POST',
            url:uAll,
            data:JSON.stringify({v:v}),
            dataType: "JSON",
            contentType:"application/json",
            success:function (data) {

            }
        });
    }
    function unpdateAnswer(answerId,vData) {
        vData.delflag = 0;
        $.ajax({
            url: baseUrl + "ojt/hrOjtExamAnswer/update" + answerId,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(vData),
            success: function (resultData) {

            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "更新失败");
            }
        });
    }
    function updateExam(isSave) { //isSave等于0为交卷，等于1为暂存
        if(infoId != null && infoId != ''){
            //不是第一次考试
            infoId = infoId;
        }else{
            //第一次考试
            infoId = $("#examInfoId").val();
        }
        var endDate = new Date();
        var minus = endDate.getTime() - startDate.getTime();
        var time = Math.round(minus/60000);/*考试时间*/
        //结束时刻
        //var minus = endDate.getFullYear()+"-"+endDate.getMonth()+"-"+endDate.getDate()+" "+endDate.getHours()+":"+endDate.getMinutes()+":"+endDate.getSeconds();
        var score = parseFloat(scoreTotal);
        var time1 = parseInt(time);
        time1 = time1==0&&minus>0?1:time1;
        var minus = endDate.getTime();
        var examStatus = isSave==0?"1127100241":"1127100755";
        var dto2 = {score:score,time:time1,examTime:minus,examStatus:examStatus};
        dto2.delflag = 0;
        $.ajax({
            url: baseUrl + "ojt/hrOjtExamInfo/update/" + infoId,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(dto2),
            success: function (resultData) {
                //pop_tip_open("blue","提交成功！");
                scoreTotal = 0;
                if(isSave == 0) {
                    // alert("您的得分是:" + score + ",请点击关闭按钮!");
                    alert("交卷成功！请退出");
                    $(":radio").attr("disabled","disabled");
                    $(":checkbox").attr("disabled","disabled");
                    $("#confirm").attr("disabled", "disabled");
                    $("#save").attr("disabled", "disabled");
                    $("#close").css('display', 'block');
                    $("#str2").attr("disabled", "disabled");
                }else if(isSave == 1) {
                    pop_tip_open("blue", "暂存成功");
                }
                //closePage();
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "提交失败");
            }
        });
        if(isSave == 0) {
            clearSession();
        }
    }
    /*查询考试次数*/
    function initExam() {
        if(examType=="planExam"){ //planExam为计划考试，subjectExam为课程考试

        }else if(examType=="subjectExam"){ //planExam为计划考试，subjectExam为课程考试

        }
        var paperId = $.xljUtils.getUrlParam("paperId");
        // planId = $.xljUtils.getUrlParam("planId");
        // var subjectId = $.xljUtils.getUrlParam("subjectId");
        var data = {
            id:paperId,
            planId:planId,
            subjectId:subjectId,
            paperId:paperId,
            personId:personId
        };
        var uBody = "ojt/hrOjtExamPapers/queryExamNum";
        var endDate = new Date();
        //结束时刻
        var minus = endDate.getTime();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'POST',
            url: uAll,
            data:JSON.stringify(data) ,
            dataType: "JSON",
            contentType:"application/json",
            success: function (data) {
                var dat1 = data.result;
                if(dat1[0].examStatus == "1127100241"){
                    clearInterval(timer);
                    $("#remianTime").text("已结束");
                    clearSession();
                    $(":radio").attr("disabled","disabled");
                    $(":checkbox").attr("disabled","disabled");
                    alert("您已经参加过本场考试，请退出!");
                    $("#confirm").attr("disabled", "disabled");
                    $("#save").attr("disabled", "disabled");
                    $("#close").css('display', 'block');
                    $("#str2").attr("disabled", "disabled");
                    return;
                }
                if(dat1 ==null || dat1.length == 0){
                    var times = parseInt("1");//考试次数加1
                    var examStatus = '1127100755';  //未考1127100242  已考1127100241 考试中1127100755
                    // var score1 = parseFloat("0");//考试总分
                    // var time1 = parseInt("0");//考试时长
                    // var times1 = parseInt(times);//考试次数
                    // var personId = $.hrUtils.getHREmpInfo().id;
                    var dto = {examStatus:examStatus,score:0,time:0,examTime:minus,times:times};
                    dto.id = $("#examInfoId").val();
                    dto.delflag = 0;
                    $.ajax({
                        type: "POST",
                        url:hostUrl+ "/ojt/hrOjtExamInfo/save",
                        data: JSON.stringify(dto),
                        dataType: "JSON",
                        contentType:"application/json",
                        success: function(){
                        }
                    });
                }else{
                    var times = parseInt(dat1[0].times +1);//考试次数加1
                    var examStatus = '1127100755';  //未考1127100242  已考1127100241
                    infoId = dat1[0].id;//之前考试id
                    // var score1 = parseFloat("0");//考试总分
                    // var time1 = parseInt("0");//考试时间
                    //scoreTotal = parseFloat(scoreTotal);
                    // var personId = $.hrUtils.getHREmpInfo().id;
                    var dto = {examStatus:examStatus,score:0,time:0,examTime:minus,times:times};
                    dto.delflag = 0;
                    $.ajax({
                        url: baseUrl + "ojt/hrOjtExamInfo/update/" + infoId,
                        type: 'put',
                        dataType: 'JSON',
                        contentType: 'application/json',
                        data: JSON.stringify(dto),
                        success: function (resultData) {
                        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                            pop_tip_open("red", "初始化失败");
                        }

                    });
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化失败!");
            }
        })
    }

    /*保存考生答案表*/
    function saveAnswer(v) {
        var dt = {rowData1:v};
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtExamAnswer/saveAnswer",
            data: JSON.stringify(dt),
            dataType: "JSON",
            contentType:"application/json",
            success: function(){
                //pop_tip_open("blue","保存成功！");
                //closePage();
            }
        });
    }
    /*获取试卷信息  将其生成list对象数组*/
    function getTotalScore(v) {
        var answerList = new Array();
        var num1 = 0;
        var num2 = 0;
        var q = false;
        var personId = $.hrUtils.getHREmpInfo().id;
        $.each(v,function (i) {
            if (i<v.length-1){
                var themeName2 = v[i+1].themeName;
            }else {
                var themeName2 = v[i].themeName;
            }
            var themeName = v[i].themeName;
            var themeIdDat = v[i].themeIdDat;
            var score = v[i].score;
            var ifCorrect = v[i].ifCorrect;
            var type = v[i].type;
            var answerOption = v[i].answerOption;//试题选项
            var aa = $("#tt"+themeIdDat+i+"").val();/*单选题选中的value*/
            var a = $("input:radio[name='"+themeName+"']:checked").val();/*选中的value*/
            var fff = $("input:radio[name='"+themeName+"']:checked + span").text();/*单选题被选中的试题选项*/
            var fff2 = $("input:radio[name='"+themeName+"']:checked + label").text();/*单选题被选中的试题选项*/
            var valu = $("#tt"+themeIdDat+i+"").val();/*每行的value*/
            var c = $("input:checkbox[name='"+themeName+"']:checked");
            var dd = $("input:checkbox[name='"+themeName+"']:checked + span").text();/*多选题被选中的试题选项*/
            var d = $("#h"+themeIdDat+"").attr("value");/*试题序号*/
            var t = $("#t"+themeIdDat+i+"").text();/*试题选项*/
            var t1 = $(".stt :input[name='"+themeName+"']:checked").val();//判断题选择的value
            //1114100212  1114100213  1114100214
            if (type == '1114100212'){
                if(themeName2 == themeName){
                    if(!q){
                        if (a=='1'){
                            var answer = {planId:planId,objectiveId:subjectId,personId:personId,themeType:themeIdDat+","+type,sort:d,choiceAns:fff,ansScore:score};
                            scoreTotal = scoreTotal + score;/*考试总分*/
                        }else{
                            var answer = {planId:planId,objectiveId:subjectId,personId:personId,themeType:themeIdDat+","+type,sort:d,choiceAns:fff,ansScore:0};
                        }
                        answerList.push(answer);
                        q = true;
                    }
                }else {
                    q = false;
                }
            }
            if(type == '1114100213'){
                if(themeName2 == themeName){
                    if(ifCorrect == '1'){
                        num2 = num2 +  1;
                    }
                }else {
                    if(ifCorrect == '1'){
                        num2 = num2 + 1;
                    }
                    c.each(function () {
                        if($(this).val() == '1'){
                            num1 = num1 + 1;/*判断多选题选对的个数*/
                        }
                    });
                    if (num1 == num2){
                        var answer = {planId:planId,objectiveId:subjectId,personId:personId,themeType:themeIdDat+","+type,sort:d,choiceAns:dd,ansScore:score};
                        scoreTotal = scoreTotal + score;/*考试总分*/
                    }else{
                        var answer = {planId:planId,objectiveId:subjectId,personId:personId,themeType:themeIdDat+","+type,sort:d,choiceAns:dd,ansScore:0};
                    }
                    answerList.push(answer);
                    num1 = 0;
                    num2 = 0;
                }
            }
            if (type == '1114100214'){
                if (t1=='1'){
                    var answer = {planId:planId,objectiveId:subjectId,personId:personId,themeType:themeIdDat+","+type,sort:d,choiceAns:fff2,ansScore:score};
                    scoreTotal = scoreTotal + score;/*考试总分*/
                }else{
                    var answer = {planId:planId,objectiveId:subjectId,personId:personId,themeType:themeIdDat+","+type,sort:d,choiceAns:fff2,ansScore:0};
                }
                answerList.push(answer);
            }
        })
        return answerList;
    }
    /**
     * 迭代生成页面
     * @param dat
     */
    function bornInfo(dat) {
        var j = 0;//id属性
        var e = 1;//试题类型index
        var r = 1;//试题index
        var q = false;//试题类型判断次数
        var w = false;//试题名称判断次数
        for(var i = 0; i<dat.length;i++){
            var theme1 = dat[i];
            if (i<dat.length-1){
                var theme2 = dat[i+1];
            }else {
                theme2 = theme1;
            }
            if (theme1.type=='1114100212'){
                var th1 = "单选题";
            }else if (theme1.type=='1114100213'){
                var th1 = "多选题";
            }else if (theme1.type=='1114100214'){
                var th1 = "判断题";
            }
            var h1 = "<tr id='h1"+j+"'>"+
                "<td>"+
                "<b><h3 style='padding-left: 15px;text-align:left'>第"+e+"部分 "+th1+"(总分："+theme1.totalScore+")</h3></b>"+
                "</td>"+
                "</tr>";
            var h2 = "<tr id='h2"+j+"' name='"+r+"'>"+
                "<td style='padding-left: 15px;text-align:left'>"+
                "<b><h4><span id='h"+theme1.themeIdDat+"' value='"+r+"'>第"+r+"题("+theme1.score+"分)"+theme1.themeName+"</span></h4></b>"+
                "<ol>";
            var h3 = "<li class='stt'><input id='tt"+theme1.themeIdDat+theme1.answerOption+"' name='"+theme1.themeName+"' type='radio' value='"+theme1.ifCorrect+"'/><span id='t"+theme1.themeIdDat+i+"'>"+theme1.answerOption+"</span><span>、&nbsp;"+theme1.optionContent+"</span></li>";/*单选题*/
            var h31 = "<li class='stt'><input id='tt"+theme1.themeIdDat+theme1.answerOption+"' name='"+theme1.themeName+"' type='checkbox' value='"+theme1.ifCorrect+"'/><span id='t"+theme1.themeIdDat+i+"'>"+theme1.answerOption+"</span><span>、&nbsp;"+theme1.optionContent+"</span></li>";/*多选题*/
            var h32 = "<li class='stt'><input id='tt1"+theme1.themeIdDat+theme1.answerOption+"' name='"+theme1.themeName+"' type='radio' value='1'/><label for='tt1"+theme1.themeIdDat+theme1.answerOption+"'>对</label>&nbsp;<input id='tt2"+theme1.themeIdDat+theme1.answerOption+"' name='"+theme1.themeName+"' type='radio' value='0'/><label for='tt2"+theme1.themeIdDat+theme1.answerOption+"'>错</label>&nbsp;&nbsp;"+"</li>";/*判断题*/
            var h4 = "</ol></td></tr>";
            if (!q&&theme2.type==theme1.type){//试题类型判断
                $("#str2").append(h1);
                q = true;
                e++;
                totalScore += theme1.totalScore;
            }
            if(q&&theme2.type!=theme1.type){
                q = false;
                //r=1;
            }
            if (!w&&theme2.themeName==theme1.themeName){//试题名称判断
                $("#str2").append(h2);
                w = true;
                r++;
            }else if(!w&&theme1.type=='1114100214'){
                $("#str2").append(h2);
                w = true;
                r++;
            }
            if (th1=='多选题'){
                h3=h31;
            }else if (th1=='判断题'){
                h3=h32;
            }
            if(w&&theme2.themeName==theme1.themeName){
                $("#str2").append(h3);
            }else {
                $("#str2").append(h3);
                $("#str2").append(h4);
                w = false;
            }

            j++;
        }
        $("li").on('click',function(){
            var v = $(this).find("input");
            if (v.length == '2'){
                /*$("li").unbind("click");
                var v = $("li").find("input");
                for (var i=0;i<v.length;i++){
                    //alert($(v[i]).val());
                    //判断
                    $(v[i]).next().on('click',function () {
                        $(v[i]).find("input:radio").prop("checked",true);
                    });
                }*/
            }else {
                //单选
                $(this).find("input:radio").prop("checked",true);
            }
        });//$(this).find("input:checkbox").prop("checked",true)
        //多选
        $("li input ~ span").on('click',function(){$(this).parent().find("input").trigger('click');});
    }

    /**
     * 初始化 看是否是第一次提交试卷
     */
    function queryExamAnswerInfo(id,personId) {
        var uBody = "ojt/hrOjtExamAnswer/queryAnswerInfo";
        var uAll = hostUrl + uBody;
        var data;
        if(examType == "subjectExam"){
            data = {subjectId:id,personId:personId};
        }else if(examType == "planExam"){
            data = {planId:id,personId:personId};
        }
        $.ajax({
            type: 'POST',
            url:uAll,
            data:JSON.stringify(data),
            dataType: "JSON",
            contentType:"application/json",
            async: false,
            success:function (data) {
                oldData = data.result;
                /*for (var i =0;i<vDat.length;i++){
                    if (vDat[i].themeType == '1114100212'){
                        var v=0;
                        if (vDat[i].choiceAns == 'A'){
                            v=0;
                        }else if (vDat[i].choiceAns == 'B'){
                            v=1;
                        }else if (vDat[i].choiceAns == 'C'){
                            v=2;
                        }else if (vDat[i].choiceAns == 'D'){
                            v=3;
                        }
                        $("tr[name='"+vDat[i].sort+"'] ~ li").eq(v).find("input:radio").prop("checked",true);
                    }else if (vDat[i].themeType == '1114100213'){
                        var vv = vDat[i].choiceAns;
                        if (vDat[i].choiceAns == 'A'){
                            v=0;
                        }
                        $("tr[name='1'] ~ li").eq(1).find("input:checkbox").prop("checked",true);
                    }
                }*/
                /*var fff = $("input:radio[name='"+themeName+"']").eq(1).prop("checked",true);/!*单选题被选中的试题选项*!/
                var dd = $("input:checkbox[name='"+themeName+"']").eq(1).prop("checked",true);/!*多选题被选中的试题选项*!/*/
            }
        });
    }
    /*试卷预览查询*/
    function queryPaperInfo(paperId) {
        var uBody = "ojt/hrOjtExamPapers/queryPaperInfo";
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'POST',
            url: uAll,
            data:JSON.stringify({
                id:paperId
            }) ,
            dataType: "JSON",
            async: false,
            contentType:"application/json",
            success: function (data) {
                themeInfos = data.result;
                if(themeInfos.length ==null || themeInfos.length == 0){
                    // pop_tip_open("red", "该试卷不存在!!");
                }else{
                    paperName = themeInfos[0].paperName;
                    examTotalScore = themeInfos[0].examTotalScore;
                    duration = themeInfos[0].duration;
                    preview();
                    bornInfo(themeInfos);
                    if(examType != 'add2'){
                        saveSession(duration);
                    }else if(ifTiming!=2) {
                        remainTime(themeInfos[0].duration*60000);//传的是毫秒
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "加载试卷预览查询失败!");
            }
        })
    }
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var id = data.result;
                $("#examInfoId").val(id);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }
    function preview()
    {
        //动态生成的html代码
        var htmlCode = '<b><h2>'+paperName+'</h2></b>';
        //var h5 = "<th  style='padding-right: 8px;text-align:right'>考试时间："+duration+"分钟 总分："+examTotalScore+"</th>";
        var h5 = "<th  style='padding-right: 8px;text-align:right'>剩余考试时间："+"<strong id='remianTime'></strong>"+" 总分："+examTotalScore+"</th>";
        $("#str3").append(h5);
        $("#str1").append(htmlCode);
    }
    function remainTime(durationS){
        //saveSession(new Date());
        var time = Math.round(durationS/1000);
        $("#remianTime").text(timeFmatter(time));
        timer = setInterval(function () {
            time--;
            if(time == 0){
                //$.xljUtils.tip("green", "考试结束，请提交试卷，关闭将按零分计算!！");
                $("#remianTime").text("已结束");
                $(":radio").attr("disabled","disabled");
                $(":checkbox").attr("disabled","disabled");
                $("#str2").attr("disabled", "disabled");
                clearInterval(timer);
                alert("考试时间结束，将为您自动交卷!");
                $("#confirm").click();
            }else {
                $("#remianTime").text(timeFmatter(time));
            }
        },1000);//每分钟更新一次
    }

    function timeFmatter(time){
        if(time>=60){
            return parseInt(time/60)+"分"+time%60+"秒";
        }else {
            return time+"秒";
        }
    }

    /*document.oncontextmenu=function(){event.returnValue=false;}//屏蔽鼠标右键
    document.onkeydown=function()
    {
        if   ((window.event.altKey)&&
            ((window.event.keyCode==37)||       //屏蔽   Alt+   方向键   ←
            (window.event.keyCode==39)))       //屏蔽   Alt+   方向键   →
        {
            event.returnValue=false;
        }

        if   ((event.keyCode==8)     ||                                   //屏蔽退格删除键
            (event.keyCode==116)||                                   //屏蔽   F5   刷新键
            (event.ctrlKey   &&   event.keyCode==82)){   //Ctrl   +   R
            event.keyCode=0;
            event.returnValue=false;
        }
    }*/
    function clearSession() {
        $.ajax({
            url:baseUrl + "ojt/hrOjtExamInfo/clearSession/",
            type:'POST',
            dataType:'JSON',
            contentType:'application/json',
            data:JSON.stringify(new Object()),
            success:function (dd) {
            }
        });
    }
    function saveSession(countdown) {
        var postData = new Object();
        postData.time=new Date().getTime();
        $.ajax({
            url:baseUrl + "ojt/hrOjtExamInfo/saveSession/",
            type:'POST',
            dataType:'JSON',
            async: false,
            contentType:'application/json',
            data:JSON.stringify(postData),
            success:function (data) {
                var startTime = JSON.parse(data);
                if(postData.time == startTime){
                    clearExamAnswer();
                }else {
                    getExamAnswer();
                }
                var nowTime = new Date().getTime();
                var time= nowTime - startTime;
                var duration = countdown*60000 - time;
                if(ifTiming!=2) {
                    $("#remianTime").text("本场考试不计时");
                }else {
                    if (duration > 0) {
                        remainTime(duration);//传的是毫秒
                    } else {
                        //$.xljUtils.tip("green", "考试结束，请提交试卷，关闭将按零分计算!！");
                        $("#remianTime").text("已结束");
                        $(":radio").attr("disabled", "disabled");
                        $(":checkbox").attr("disabled", "disabled");
                        $("#str2").attr("disabled", "disabled");
                        alert("考试时间结束，将为您自动交卷!");
                        $("#confirm").click();
                        // $("#close").css('display','block');
                        // $("#confirm").attr("disabled","disabled");
                    }
                }
            }
        });
    }

    function clearExamAnswer() {
        savePaper(3);
    }


    /**
     *  初始化附件上传大小限制
     */
    function initRemind(){
        var uAll = hostUrl + "ojt/hrOjtSetting/queryListByCondition";
        $.ajax({
            type: 'post',
            url: uAll,
            data: JSON.stringify({}),
            dataType: "JSON",
            async: false,
            contentType:"application/json",
            success: function (data) {
                if(data.result) {
                    if(data.result[0]) {
                        var setting = data.result[0];
                        if(setting) {
                            ifTiming = setting.ifTiming;
                        }
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化培训设置失败");
            }
        })
    }

    function getExamAnswer() {
        updateThemeInfos();
        // var answers = getTotalScore(themeInfos);
        for (var i = 0; i < oldData.length; i++){
            var answer = oldData[i];
            var choiceAnswer = answer.choiceAns;
            var idAndType = answer.themeType.split(",");
            var themeId = idAndType[0];
            var themeType = idAndType[1];
            if(choiceAnswer == ""){
                continue;
            }else if(themeType == "1114100214"){
                if(choiceAnswer == "对"){
                    $(":radio[id^=tt1"+themeId+"]").prop("checked", 'checked');
                }else {
                    $(":radio[id^=tt2"+themeId+"]").prop("checked", 'checked');
                }
            }else if(themeType == "1114100212"){
                $(":radio[id=tt"+themeId+choiceAnswer+"]").prop("checked", 'checked');
            }else if(themeType == "1114100213"){
                var choises = choiceAnswer.split("");
                for (var j = 0; j < choises.length; j++){
                    $(":checkbox[id=tt"+themeId+choises[j]+"]").prop("checked", 'checked');
                }
            }
        }
    }

    $(function () {
        initUuid();/*初始化id  生成hr_ojt_exam_info  表*/
        initPersonId();
        startDate= new Date();
        var paperId = $.xljUtils.getUrlParam("paperId");
        examType = $.xljUtils.getUrlParam("type");/*从试卷修改过来的，预览试卷*/
        planId = $.xljUtils.getUrlParam("planId");
        subjectId = $.xljUtils.getUrlParam("subjectId");
        if(examType == "subjectExam"){
            queryExamAnswerInfo(subjectId,personId);
        }else if(examType == "planExam"){
            initRemind();
            queryExamAnswerInfo(planId,personId);
        }
        queryPaperInfo(paperId);
        if(examType != 'add2'){
            $("#confirm").css('display','block');
            $("#save").css('display','block');
            //$("#close").css('display','block');
            $('title').text("考试");
            initExam();
        }else {
            $('title').text("试卷预览");
        }
    });


    /**
     *  获取当前登录用户的ID
     */
    function initPersonId() {
        var personInfoDto = $.hrUtils.getHREmpInfo()
        if (personInfoDto != null){
            personId = personInfoDto.id;
        }
    }

    //关闭页面
    function closePage() {
        /*//重新加载父页面
         window.opener.location.reload();*/
        //关闭本页面
        window.close();
    }
})(jQuery, window, document);