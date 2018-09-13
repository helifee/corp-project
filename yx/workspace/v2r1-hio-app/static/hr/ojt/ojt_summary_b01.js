/**
 * Created by jh on 2017/7/20.
 */
function closeWindow() {
    //关闭本页面
    window.close();
}
;(function($, window, document, undefined){
    /*全局变量*/
    var obj;
    //导出excel
    $("#exportBtn").click(function () {
        exportInfo();
    });
    function exportInfo() {
        //表格数据
        var rowData = $('#listPlannedSpeed').jqGrid('getRowData');
        /*for (var i = 0;i<rowData.lenght;i++){
            if (rowData[i].name == 'startDate'||rowData[i].name == 'endDate'){
            var date = rowData[i].value.replace(/-/g,'/');
                if(date != ''){
                    rowData[rowData[i].name]=new Date(date).getTime();
                }
            }
        }*/
        var urlBody = "ojt/hrOjtExamPapers/exportExamPaperInfo";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(rowData),
            async : false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if(undefined != path && "" != path){
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style','display:none');   //在form表单中添加查询参数
                        form.attr('target','exportTarget');
                        form.attr('method','post');
                        form.attr('action',hostUrl + "ojt/hrOjtExamPapers/exportInfoClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type','hidden');
                        input1.attr('name',"path");
                        input1.attr('value',path);

                        $('body').append(form);  //将表单放置在web中
                        form.append(input1);   //将查询参数控件提交到表单上
                        form.submit();   //表单提交
                        pop_tip_open("", "导出成功");
                    }
                } else {
                    pop_tip_open("red", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "导出失败");
            }
        })
    }
    /*页面查询  按钮*/
    $("#queryDat").on('click',function () {
        var courseName = $("#CourseName").val();
        var strName = $("#strName").val();
        var o = JSON.parse(obj);
        o.name=courseName;
        o.personName=strName;
        obj = JSON.stringify(o);
        //var name = $("#CourseName").val();
        //var queryCondition = "{\"name\":"+name+"}";
        $("#listPlannedSpeed").jqGrid('setGridParam',{datatype:'json',postData:{"obj":obj}}).trigger('reloadGrid');
    });
    /*学生情况分析表页面的展示*/
    /*初始化进行页面的展示*/
    function listPaperList(){
        var ubody = "/ojt/hrOjtExamPapers/querySummaryListByCondition";
        var uall = hostUrl+ubody;
        //创建jqGrid组件
        jqGridRule_social = jQuery("#listPlannedSpeed").jqGrid(
            {
                url: uall,
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",
                contentType : "application/json",
                datatype : "json",
                postData: {"obj": obj},
                width:$('.mytable').width()-10,
                height:$('.mytable').height()-45,
                jsonReader : {
                    root:"result"
                },
                rownumbers: true,
                //multiselect: true,
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',width : 25,align : "center",hidden : true},
                    {name : 'orgName',label : '机构',width : 55,align : "center"},
                    {name : 'deptName',label : '部门',width : 55,align : "center"},
                    {name : 'postName',label : '岗位',width : 55,align : "center"},
                    {name : 'personName',label : '姓名',width : 55,align : "center"},
                    {name : 'name',label : '课程名称',width : 170,align : "center"},
                    {name : 'startDate',label : '起始时间',width : 164,align : "center"},
                    {name : 'endDate',label : '终止时间',width : 164,align : "center"},
                    {name : 'time',label : '时长(分)',width : 164,align : "center",
                        formatter: timeFmatter},
                    {name : 'times',label : '次数',width : 50,align : "center"},
                    {name : 'rate',label : '进度',width : 164,align : "center",
                        formatter: rateFmatter}
                ],
                rowNum : -1,//一页显示多少条 -1全部
                sortname : 'id',//初始化的时候排序的字段
                sortorder : "desc",//排序方式,可选desc,asc
                loadError:function(xhr,status,error){
                    pop_tip_open("red","初始化人员列表请求失败");
                },
                viewrecords : true,
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }

            });
        var w_h = $(window).height();//492px  637
        $(".tableStyle #gview_listPlannedSpeed").children().eq(2).css("height",(w_h-145)+"px");
    }

    function timeFmatter(cellvalue,options,rowObject){
        var time = (cellvalue/60);
        return time.toFixed(2);
    }

    function rateFmatter(cellvalue,options,rowObject){
        return cellvalue.toFixed(2)+"%";
    }

    window.changeSta = function (cellvalue,options,rowObject) {
        if(cellvalue == "1"){
            return "有效";
        }else if(cellvalue == "0"){
            return "已失效";
        }else if(cellvalue == "2"){
            return "未生效";
        }
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
                //$("#ids").val(id);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }
    $("#openNewWindow").on('click',function () {
        window.open("ojt_paper_add2.html?type=add");
    });

    //计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //alert(w_h-111);
        //右侧table
        $(".con-table .mytable").height((w_h-350)+"px");
        $(".tableStyle").css("height",(w_h-111)+"px");
        //$(".tableStyle #gview_listPlannedSpeed").children().eq(2).css("height","499px");
    }
    //计算表格宽度
    function resizeGrid() {
        var w_h = $(window).height();
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 19);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width());
        $.xljUtils.gridResizeFn();
    }
    //grid 自适应宽度
    $(window)
        .resize(function(){
            resizeHeight();
            resizeGrid();
        });
    //关闭页面
    function closePage() {
        //重新加载父页面
        if(window.opener.location!=undefined) {
            window.opener.location.reload();
        }
        //关闭本页面
        window.close();
    }
    $(function () {
        resizeHeight();
        resizeGrid();
        initUuid();
        // obj = $.xljUtils.getUrlParam("obj");
        // listPaperList(obj);
        var name = $.xljUtils.getUrlParam("name");
        var stratDate = $.xljUtils.getUrlParam("stratDate");
        var endDate = $.xljUtils.getUrlParam("endDate");
        var orgId = $.xljUtils.getUrlParam("orgId");
        $("#CourseName").val(name);
        var obj1 = new Object();
        obj1.orgId = orgId;
        obj1.stratDate = stratDate;
        obj1.endDate = endDate;
        obj1.name = name;
        obj = JSON.stringify(obj1);
        listPaperList();
    });

})(jQuery, window, document);