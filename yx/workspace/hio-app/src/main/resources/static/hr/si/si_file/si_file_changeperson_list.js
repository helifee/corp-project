    /**
     * Created by ciic on 2017/6/22.
     */
   // var org_id = window.opener.org_id;//父页面选中的机构Id
   // var account_id = window.opener.account_id;
    resizeHeight();
    changeAddList();
    changeDelList();
    resizeGrid();

    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //右侧table
       $(".con-table .mytable").height((w_h - 175)+ "px");
    }

    //计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height()-54);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-1, true);
        $.xljUtils.gridResizeFn();
    }
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //显示变动明细中的增加人员
    function changeAddList(){
        var ubody = "si/siFile/queryChangeAddPersonList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件

        jQuery("#changeAddList").jqGrid({
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            postData:{orgId:null,accountId:null},//orgId:org_id,accountId:account_id
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            colNames: ['姓名', '手机号', '单位','部门', '岗位','入职时间'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'name',  width: 120,align:'center'},
                {name: 'personCode', width: 120,align:'center'},
                {name: 'orgName',  width: 300,align:'center'},
                {name: 'deptName',  width: 200,align:'center'},
                {name: 'postName',  width: 160,align:'center'},
                {name : 'entryOrgTime',width: 160,align : "center",formatter:"date", formatoptions: {newformat:'Y-m-d'}}
            ],
            loadComplete:function(data){
                //file_data = data.result;
            },
            rowNum : -1,//一页显示多少条 -1全部
            sortname : 'personId',//初始化的时候排序的字段
            rownumbers: true,
            multiselect: true,
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $. xljUtils.addGridScroll();
                $. xljUtils.gridResizeFn();
            }
        });
        //创建jqGrid组件
        var mydata= [
            {   name:"杨幂",
                personCode:"13511672387",
                orgName:"三亚公司",
                deptName:"行政与人力资源部",
                postName:"前台",
                entryOrgTime:"2017-12-12"
            },
            {   name:"高圆圆",
                personCode:"13787237678",
                orgName:"三亚公司",
                deptName:"行政与人力资源部",
                postName:"人事专员",
                entryOrgTime:"2017-12-20"
            },
            {   name:"范冰冰",
                personCode:"17589733654",
                orgName:"三亚公司",
                deptName:"营销管理部",
                postName:"营销经理",
                entryOrgTime:"2017-12-22"
            },
            {   name:"刘涛",
                personCode:"17833627364",
                orgName:"三亚公司",
                deptName:"财务管理部",
                postName:"现场出纳",
                entryOrgTime:"2017-12-22"
            },
            {   name:"胡歌",
                personCode:"17877345676",
                orgName:"三亚公司",
                deptName:"财务管理部",
                postName:"会计",
                entryOrgTime:"2017-12-24"
            }
        ];
        for (var i = 0; i <= mydata.length; i++) {
            jQuery("#changeAddList").jqGrid('addRowData', i + 1, mydata[i]);
        }
    }

    //显示变动明细中的减少人员
    function changeDelList(){
        var ubody = "si/siFile/queryChangeDelPersonList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jQuery("#changeDelList").jqGrid({
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            postData:{},//accountId:account_id,orgId:org_id
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            colNames: ['姓名', '手机号', '单位','部门', '岗位','离职时间'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'name',  width: 120,align:'center'},
                {name: 'personCode', width: 120,align:'center'},
                {name: 'orgName',  width: 300,align:'center'},
                {name: 'deptName',  width: 200,align:'center'},
                {name: 'postName',  width: 160,align:'center'},
                {name : 'leaveTime',width: 160,align : "center",formatter:"date", formatoptions: {newformat:'Y-m-d'}}
            ],
            loadComplete:function(data){
             console.log(data);
            },
            rowNum : -1,//一页显示多少条 -1全部
            rownumbers: true,
            multiselect: true,
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $. xljUtils.addGridScroll();
                $. xljUtils.gridResizeFn();
            }
        });
    }

    //批量保存新增的账套人员
    $("#saveBtn").click(function(){
        //审批中  1
        var temp = new Array();
        temp.push("1");
        $.ajax({    //查询账套是否在审批中
            type: "POST",
            url:serviceUrl+ "/si/siCalculateDate/queryStatusByAccount",
            data: JSON.stringify({accountStatus:temp}),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data) {
                var result = data.result;
                if(result.length!=null && result.length>0){
                    //该账套在审批中
                    pop_tip_open("blue","该账套在审批中，不能增加人员！");
                }else{//该账套不在审批中
                    saveBtnClick();
                }
            }
        });
    });

    $("#delBtn").click(function(){
        //审批中  1
        var tempAccountStatus= new Array();
        tempAccountStatus.push("1");
        $.ajax({    //查询账套是否在审批中
            type: "POST",
            url:serviceUrl+ "/si/siCalculateDate/queryStatusByAccount",
            data: JSON.stringify({accountStatus:tempAccountStatus}),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data) {
                var result = data.result;
                if(result.length!=null && result.length>0){
                    //该账套在审批中
                    pop_tip_open("blue","该账套在审批中，不能删除人员！");
                }else{//该账套不在审批中
                    pop_text_open("blue",'确定删除选中的人员？',function(){
                        delBtnClick();
                    },true);
                }
            }
        });
    })

    function saveBtnClick(){
        var rowIds=$('#changeAddList').jqGrid("getGridParam","selarrrow");
        if(rowIds.length==0){
            pop_tip_open("blue","未有选中的人员！");
            return;
        }
        $.ajax({
            type: "POST",
            url:serviceUrl+ "si/siFile/savePersonsToFile",
            data: JSON.stringify({personIds:rowIds}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(data) {
                if(data.success) {
                    $.xljUtils.tip("green",data.msg);
                    refreshParent();
                    msgClosePage();
                }else{
                    $.xljUtils.tip("blue",data.msg);
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","档案新增人员失败");
            }
        });
    }

    function delBtnClick(){
        var rowIds=$('#changeDelList').jqGrid("getGridParam","selarrrow");
        if(rowIds.length==0){
            pop_tip_open("blue","未有选中的人员！");
            return;
        }
        $.ajax({    //查询所有的账套列表
            type: "POST",
            url:serviceUrl+ "si/siFile/queryListForShow",
            data: JSON.stringify({}),
            dataType: "JSON",
            async:false,
            contentType:"application/json",
            success: function(data) {
                var file_data = data.result;
                if(file_data.length>0){   //当档案下有人人时才能删除
                    var ids = [];
                    var k = 0;
                    for(var i = 0;i<file_data.length;i++){
                        var personId = file_data[i].personId;
                        for(var j = 0;j<rowIds.length;j++){
                            if(personId==rowIds[j]){
                                ids[k] = file_data[i].id;
                                k++
                            }
                        }
                    }
                    $.ajax({
                        type: "DELETE",
                        url:serviceUrl+ "si/siFile/deleteBatch/"+ids,
                        //  data: JSON.stringify({personIds:rowIds,ids:ids,accountId:account_id}),
                        dataType: "JSON",
                        async:false,
                        contentType:"application/json",
                        success: function(data) {
                            $.xljUtils.tip("green","数据删除成功！");
                            refreshParent();
                            msgClosePage();
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            console.log(xhr);
                            $.xljUtils.tip("red","服务异常,请联系管理员！");
                        }
                    });
                }
            }
        });
    }
    //增加条件查询
    function queryAdd() {
        var nameOrCode = $("#nameOrCode_add").val();
        jQuery("#changeAddList").jqGrid('setGridParam', { postData : {orgId:org_id,nameOrCode:nameOrCode}}).trigger('reloadGrid');

    }

    //减少条件查询
    function queryDel() {
        var nameOrCode = $("#nameOrCode_del").val();
        jQuery("#changeDelList").jqGrid('setGridParam', { postData : {nameOrCode:nameOrCode}}).trigger('reloadGrid');//orgId:org_id,

    }

    /**
     * 刷新父页面表格数据
     */
    function refreshParent() {
        window.opener.$('#siFileList').jqGrid().trigger("reloadGrid");
    }

    //保存或修改成功，提示后关闭窗口
    window.msgClosePage = function (){
        setTimeout(function () {
            window.opener=null;
            window.open('','_self');
            window.close();
        }, 450);
    }

    //表格上面 切换：增加人员/减少人员
    $(".right-content .con-tit button").on("click", function (e) {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if ($(this).attr('class').indexOf('bydel') > 0) {
            $("#addDiv").css("display", "none");//增加人员为none（隐藏）
            $("#delDiv").css("display", "block");//减少人员设置为block（显示）
        }  else {
            $("#addDiv").css("display", "block");//增加人员为block（显示）
            $("#delDiv").css("display", "none");//减少人员设置为none（隐藏）
        }
        $.xljUtils.gridResizeFn();
        e.stopPropagation();
    });

    $("#delClose").click(function(){
        window.history.go(-1);
       // window.opener.JQsiFileList.jqGrid().trigger("reloadGrid");
       // window.close();
    });
    $("#addClose").click(function(){
        window.history.go(-1);
       // window.opener.JQsiFileList.jqGrid().trigger("reloadGrid");
        //window.close();
    });

    $('#nameOrCode_add').bind('keypress',function(event){
        if(event.keyCode == "13") {
            queryAdd();
        }
    });

    $('#nameOrCode_del').bind('keypress',function(event){
        if(event.keyCode == "13") {
            queryDel();
        }
    });