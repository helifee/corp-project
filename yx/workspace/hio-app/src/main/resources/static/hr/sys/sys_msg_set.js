/**
 * lixd
 * 预警消息js
 */
;
(function ($, window, document, undefined) {
    var item_data;//列表数据缓存对象
    var jqGridOrg;//机构范围列表
    var orgData;//机构对象
    var jqGridPost;//岗位范围列表
    var postData;//岗位对象
    var jqGridPerson;//人员范围列表
    var personData;//人员对象
    //上来就执行
    $(function () {
        //初始化高度
        resizeHeight();
        //加载提醒范围
        initOrgList();
        initPostList();
        initPersonList();
        //初始化预警消息列表
        getitems();
        //加载树的滚动条
        setTimeout(function () {
            $.xljUtils.addTreeScroll();
            $.xljUtils.treeResizeFn();
        }, 300);
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });
        $('#valueEmpty1').click(function (e) {
            e.preventDefault();
            $(this).parents('.input-group').children('input').val('');
        });
        $('.my-checkbox').on('click', function (event) {
        });
        //在加载完表格后，设置表格的宽度
        resizeGrid();
    });
    /**
     * 加载预警树信息
     * @param id    新增的id
     */
    function getitems(id) {
        $("#treeDemo_1_ul").empty();
        var postData={};
        postData.delflag='0';
        $.ajax({
            type: "POST",
            url: serviceUrl + "sys/sysMsgSet/queryList",
            data: JSON.stringify(postData),
            dataType: "JSON",
            contentType: "application/json",
            success: function (data) {
                var result = data.result;
                item_data = result;//扔缓存里
                if (result.length == 0) {
                    add();
                    return;
                }
                for (var i = 0; i < data.result.length; i++) {
                    $("#treeDemo_1_ul").append('<li class="level1" tabindex="0" hidefocus="true" > <a  class="level1"  target="_blank" style="color:#333;font-weight:normal;font-style:normal;"onclick="toShowMessage(\'' + result[i].id + '\')"> <span class="node_name" name="' + result[i].id + '">' + result[i].name + '</span> </a> </li>')
                }
                if (id == null || id == "") {//首次加载
                    getMsgInfo(result[0]);
                } else {//编辑后加载
                    for (var i = 0; i < data.result.length; i++) {
                        if (id == data.result[i].id) {
                            getMsgInfo(result[i]);
                            return;
                        }
                    }
                }
            }
        });
    }

    //新增
    $('#addBtn').click(function (e) {
        add();
    });
    function add() {
        $("#id").val("");
        $("#name").val("");
        $("#advanceDate").val("");
        $("#showUrl").val("");
        //清空范围表
        $('#orgList').jqGrid('clearGridData');
        $('#postList').jqGrid('clearGridData');
        $('#personList').jqGrid('clearGridData');
        $("input[name='status'][value='1']").attr("checked", true);//默认有效
    }

    /**
     * 查看详细设置
     * @param id
     */
    window.toShowMessage = function (id) {
        if (item_data != "" && item_data != null && item_data.length > 0) {
            for (var i = 0; i < item_data.length; i++) {
                if (item_data[i].id == id) {
                    getMsgInfo(item_data[i]);
                    break;
                }
            }
        }
    }

    //保存预警消息
    $("#saveBtn").unbind('click').on('click', function () {
        $("#msgSetForm").attr("data-validate-success", "save()");
        $("#msgSetForm").submit();
    });
    window.save = function () {
        var id = $("#id").val();
        if (id == null || id == "") { // 页面默认加载一个项目，这个项目的id存在隐藏域中，保存时，如果有id  是更新，没有的话 是新增  点击新增按钮，隐藏域的ID会清除，点击左侧树。就从新赋值
            id = initUuid();
            $('#id').val(id);
            //序列化表单数组
            var postArr = $("#msgSetForm").serializeArray();
            var postDto = {};
            postDto.delflag = false;
            //将表单数组转化为 数据传输对象
            for (var i in postArr) {
                if (postArr[i].name == "typeValue"||postArr[i].name == "personTypeValue") {
                    //过滤掉预警类型名、人员类型名称
                } else {
                    postDto[postArr[i].name] = postArr[i].value;
                }
            }
            $.ajax({
                type: "POST",
                url: serviceUrl + "sys/sysMsgSet/save",
                data: JSON.stringify(postDto),
                dataType: "JSON",
                contentType: "application/json",
                success: function (data) {
                    if (data.success) {
                        pop_tip_open("blue", "保存成功！");
                        //保存后加载预警树
                        getitems($("#id").val())
                    } else {
                        pop_tip_open("blue", "保存失败！");
                    }
                }
            });
        } else {//修改
            updateMethod();
        }
    }

    function updateMethod() {
        var postArr = $("#msgSetForm").serializeArray();
        var postDto = {};
        var postID = "";
        for (var i in postArr) {
            if (postArr[i].name == "id") {
                postID = postArr[i].value;
            }
            if (postArr[i].name == "typeValue"||postArr[i].name == "personTypeValue") {
                //过滤掉预警类型名、人员类型名称
            } else {
                postDto[postArr[i].name] = postArr[i].value;
            }
        }
        $.ajax({
            type: "PUT",
            url: serviceUrl + "sys/sysMsgSet/update/" + postID,
            data: JSON.stringify(postDto),
            dataType: "JSON",
            contentType: "application/json",
            success: function (data) {
                pop_tip_open("blue", "保存成功！");
                getitems(postID);
            }
        });
    }

    //初始化id
    function initUuid() {
        var id = "";
        var uBody = "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'GET',
            async: false,
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                // $("#id").val(guuid);
                id = guuid;
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        });
        return id;
    }

    //删除预警设置
    $("#del").click(function () {
        delMsgInfo();
    });
    function delMsgInfo() {
        var id = $("#id").val();
        var name = $('#name').val();
        if (id && id != '') {
            $.xljUtils.confirm("blue", "预警设置删除后系统将不会发送改预警的消息，确认要删除这【" + name + "】条数据吗？", function () {
                $.ajax({
                    type: "DELETE",
                    url: serviceUrl + "sys/sysMsgSet/deletePseudoBatch/" + id,
                    data: JSON.stringify({}),
                    dataType: "JSON",
                    contentType: "application/json",
                    success: function (data) {
                        pop_tip_open("blue", "删除成功！");
                        $("#id").val("");
                        getitems();
                    }
                });
            }, true);
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }

    }

    //按名称查询
    $("#searchBtn").click(function () {
        searchInfo();
    });
    function searchInfo() {
        var k = $("#key").val();
        if (k == "" || k == null || k.trim() == "") {
            getitems();
            return;
        }
        $("#treeDemo_1_ul").empty();
        var judge = "0";//展示过滤后的第一个数据
        for (var i = 0; i < item_data.length; i++) {
            var n = item_data[i].name.indexOf(k);//从缓存里捞
            if (Number(n) >= 0) {
                $("#treeDemo_1_ul").append('<li class="level1" tabindex="0" hidefocus="true" > <a  class="level1"  target="_blank" style="color:#333;font-weight:normal;font-style:normal;"onclick="toShowMessage(\'' + item_data[i].id + '\')"> <span class="node_name" name="' + item_data[i].id + '">' + item_data[i].name + '</span> </a> </li>')
                if (judge == "0") {
                    getMsgInfo(item_data[i]);
                }
                judge = "1";
            }
        }
    }

    /**
     * 回显
     * 显示加载信息
     */
    function getMsgInfo(msgDto) {
        $("#id").val(msgDto.id);
        $("#name").val(msgDto.name);
        var type = msgDto.type;
        $("#type").val(type);
        var typeValue = $.hrUtils.getHRCodeNameById(type);
        $('#typeValue').val(typeValue);
        $("#advanceDate").val(msgDto.advanceDate);
        $("#advanceUnit").val(msgDto.advanceUnit);
        //状态
        var status = msgDto.status;
        if (status == "1") {
            $("input[name='status'][value='1']").prop("checked", true);
        } else {
            $("input[name='status'][value='0']").prop("checked", true);
        }
        //已阅的处理方式
        var readType = msgDto.readType;
        if (readType == "1") {
            $("input[name='readType'][value='1']").prop("checked", true);
        } else {
            $("input[name='readType'][value='0']").prop("checked", true);
        }
        //自定义提醒范围
        var customScope=msgDto.customScope;
        if (customScope == "1") {
            $("input[name='customScope'][value='1']").prop("checked", true);
        } else {
            $("input[name='customScope'][value='0']").prop("checked", true);
        }
        $("#showUrl").val(msgDto.showUrl);
        $("#showText").val(msgDto.showText);
        //人员类型
        var personType = msgDto.personType;
        $('#personType').val(personType);
        var personTypeValue = $.hrUtils.getHRCodeNameById(personType);
        $('#personTypeValue').val(personTypeValue);
        //重新加载
        var queryDataPost = {};
        queryDataPost.msgSetId = msgDto.id;
        jqGridOrg.jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
        jqGridPost.jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
        jqGridPerson.jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
    }

    /**
     * 加载机构范围列表
     */
    function initOrgList() {
        var id = $('#id').val();
        jqGridOrg = jQuery("#orgList").jqGrid(
            {
                url: serviceUrl + '/sys/sysMsgScopeOrg/queryListByCondition',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData: {"msgSetId": id},
                autowidth: true,
                colNames: ['id', '消息设置id', '机构id', '机构名称','机构编码','机构全路径名称'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'msgSetId', index: 'msgSetId', editable: true, sortable: false, hidden: true},
                    {name: 'orgId', index: 'orgId', editable: true, sortable: false, hidden: true},
                    {name: 'orgName', index: 'orgName', editable: true, sortable: false, align: 'center'},
                    {name: 'code', index: 'code', editable: true, sortable: false, align: 'center'},
                    {name: 'prefixName', index: 'prefixName', editable: true, sortable: false, align: 'center'}
                ],
                multiselect: true,
                multiboxonly: true,
                sortname: 'orgName',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                rownumbers: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                rowNum: -1,
                loadError: function (xhr, status, error) {
                    //异常处理
                    console.log(xhr.status);
                    if (xhr.status == 404) {
                        $.xljUtils.tip("red", "请求url有误！");
                        return;
                    }
                    if (xhr.status == 405) {
                        $.xljUtils.tip("red", "请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red", "网络异常,请联系管理员！");
                },
                gridComplete: function () {
                    //加滚动条
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadComplete: function (xhr) {
                    if (!xhr.success) {
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                    } else {
                        //success
                        orgData=xhr.result;
                    }
                }

            });


    }

    //机构多选回调函数
    window.orgCallback = function (data) {
        console.log(data);
        var orgId = "";
        var orgName = "";
        var msg="";
        for (var i = 0; i < data.length; i++) {
            orgId += data[i].id;
            orgName = data[i].name;
            if(checkOrgExist(orgId)){
                saveOrgInfo(orgId, orgName);
            }else{
                msg+=orgName+",";
            }
        }
        if(msg.length>0){
            $.xljUtils.tip("blue", msg+"已经存在了！");
        }
        $('#orgList').jqGrid().trigger("reloadGrid");
    };
    //保存机构范围信息
    function saveOrgInfo(orgId, orgName) {
        var id = $("#id").val();
        if (id != null && id != "") {
            var orgScopeId = initUuid();
            var postDto = {};
            postDto.id = orgScopeId;
            postDto.delflag = false;
            postDto.msgSetId = id;
            postDto.orgId = orgId;
            postDto.orgName = orgName;
            $.ajax({
                type: "POST",
                url: serviceUrl + "sys/sysMsgScopeOrg/save",
                data: JSON.stringify(postDto),
                dataType: "JSON",
                contentType: "application/json",
                success: function (data) {
                    pop_tip_open("blue", "保存成功！");
                }
            });
        } else {
            $.xljUtils.tip("blue", "请选择要添加机构范围的预警信息！");
        }
    }

    /**
     * 校验机构是否存在
     */
    function checkOrgExist(orgId) {
        if(orgData!=null&&orgData.length>0){
            for(var i=0;i<orgData.length;i++){
                if(orgId==orgData[i].orgId){//存在
                    return false;
                }
            }
        }
        return true;
    }
    //删除机构
    $('#delOrgBtn').click(function () {
        delOrg();
    });
    /**
     * 删除demo
     */
    function delOrg() {
        var idsVal = $('#orgList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "/sys/sysMsgScopeOrg/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                $('#orgList').jqGrid().trigger("reloadGrid");
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
            }, true);
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }

    /**
     * 加载岗位范围列表
     */
    function initPostList() {
        var id = $('#id').val();
        jqGridPost = jQuery("#postList").jqGrid(
            {
                url: serviceUrl + '/sys/sysMsgScopePost/queryListByCondition',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData: {"msgSetId": id},
                autowidth: true,
                colNames: ['id', '消息设置id','机构id','机构名称', '全路径名称','机构编码','机构岗位关联表id', '岗位名称','岗位编码'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'msgSetId', index: 'msgSetId', editable: true, sortable: false, hidden: true},
                    {name: 'orgId', index: 'orgId', editable: true, sortable: false, hidden: true},
                    {name: 'orgName', index: 'orgName', editable: true, sortable: false},
                    {name: 'prefixName', index: 'prefixName', editable: true, sortable: false},
                    {name: 'code', index: 'code', editable: true, sortable: false},
                    {name: 'postId', index: 'postId', editable: true, sortable: false, hidden: true},
                    {name: 'postName', index: 'postName', editable: true, sortable: false, align: 'center'},
                    {name: 'postCode', index: 'postCode', editable: true, sortable: false, align: 'center'}
                ],
                multiselect: true,
                multiboxonly: true,
                sortname: 'postName',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                rownumbers: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                rowNum: -1,
                loadError: function (xhr, status, error) {
                    //异常处理
                    console.log(xhr.status);
                    if (xhr.status == 404) {
                        $.xljUtils.tip("red", "请求url有误！");
                        return;
                    }
                    if (xhr.status == 405) {
                        $.xljUtils.tip("red", "请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red", "网络异常,请联系管理员！");
                },
                gridComplete: function () {
                    //加滚动条
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadComplete: function (xhr) {
                    if (!xhr.success) {
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                    } else {
                        //success
                        postData=xhr.result;
                    }
                }

            });


    }

    //岗位回调函数
    window.postCallback = function (data) {
        // var postId = data.id;
        // var postName = data.name;
        // savePostInfo(postId, postName);
        var msg="";
        for(var i=0;i<data.length;i++){
            var postId = data[i].id;
            var postName = data[i].name;
            if(checkPostExist(postId)){
                savePostInfo(postId, postName);
            }else{
                msg+=postName+",";
            }
        }
        if(msg.length>0){
            $.xljUtils.tip("blue", msg+"已经存在了！");
        }
        $('#postList').jqGrid().trigger("reloadGrid");
    };
    //保存岗位范围信息
    function savePostInfo(postId, postName) {
        var id = $("#id").val();
        if (id != null && id != "") {
            var postScopeId = initUuid();
            var postDto = {};
            postDto.id = postScopeId;
            postDto.delflag = false;
            postDto.msgSetId = id;
            postDto.postId = postId;
            postDto.postName = postName;
            $.ajax({
                type: "POST",
                url: serviceUrl + "sys/sysMsgScopePost/save",
                data: JSON.stringify(postDto),
                dataType: "JSON",
                contentType: "application/json",
                success: function (data) {
                    pop_tip_open("blue", "保存成功！");
                }
            });
        } else {
            $.xljUtils.tip("blue", "请选择要添加岗位范围的预警信息！");
        }
    }

    /**
     * 检查岗位是否存在
     * @param postId
     * @returns {boolean}
     */
    function checkPostExist(postId) {
        if(postData!=null&&postData.length>0){
            for(var i=0;i<postData.length;i++){
                if(postId==postData[i].postId){
                    return false;
                }
            }
        }
        return true;
    }
    //删除岗位
    $('#delPostBtn').click(function () {
        delPost();
    });
    /**
     * 删除demo
     */
    function delPost() {
        var idsVal = $('#postList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "/sys/sysMsgScopePost/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                $('#postList').jqGrid().trigger("reloadGrid");
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
            }, true);
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }

    /**
     * 加载人员范围列表
     */
    function initPersonList() {
        var id = $('#id').val();
        jqGridPerson = jQuery("#personList").jqGrid(
            {
                url: serviceUrl + '/sys/sysMsgScopePerson/queryListByCondition',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData: {"msgSetId": id},
                autowidth: true,
                colNames: ['id', '消息设置id', '人员id', '人员姓名','人员编号','机构全路径名称','岗位名称'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'msgSetId', index: 'msgSetId', editable: true, sortable: false, hidden: true},
                    {name: 'personId', index: 'personId', editable: true, sortable: false, hidden: true},
                    {name: 'personName', index: 'personName', editable: true, sortable: false, align: 'center'},
                    {name: 'personCode', index: 'personCode', editable: true, sortable: false, align: 'center'},
                    {name: 'prefixName', index: 'prefixName', editable: true, sortable: false, align: 'center'},
                    {name: 'postName', index: 'postName', editable: true, sortable: false, align: 'center'}
                ],
                multiselect: true,
                multiboxonly: true,
                sortname: 'personName',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                rownumbers: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                rowNum: -1,
                loadError: function (xhr, status, error) {
                    //异常处理
                    console.log(xhr.status);
                    if (xhr.status == 404) {
                        $.xljUtils.tip("red", "请求url有误！");
                        return;
                    }
                    if (xhr.status == 405) {
                        $.xljUtils.tip("red", "请求方法有误！");
                        return;
                    }
                    $.xljUtils.tip("red", "网络异常,请联系管理员！");
                },
                gridComplete: function () {
                    //加滚动条
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadComplete: function (xhr) {
                    if (!xhr.success) {
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.msg);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.msg);
                                break;

                            default:
                                $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                    } else {
                        //success
                        personData=xhr.result;
                    }
                }

            });


    }

    //人员多选回调函数
    window.personCallback = function (data) {
        console.log(data);
        var personId = "";
        var personName = "";
        var msg="";
        for (var i = 0; i < data.length; i++) {
            personId = data[i].userId;
            personName = data[i].name;
            if(checkPersonExist(personId)){
                savePersonInfo(personId, personName);
            }else{
                msg+=personName+",";
            }
        }
        if(msg.length>0){
            $.xljUtils.tip("blue", msg+"已经存在了！");
        }
        $('#personList').jqGrid().trigger("reloadGrid");
    };
    //保存人员范围信息
    function savePersonInfo(personId, personName) {
        var id = $("#id").val();
        if (id != null && id != "") {
            var personScopeId = initUuid();
            var postDto = {};
            postDto.id = personScopeId;
            postDto.delflag = false;
            postDto.msgSetId = id;
            postDto.personId = personId;
            postDto.personName = personName;
            $.ajax({
                type: "POST",
                url: serviceUrl + "sys/sysMsgScopePerson/save",
                data: JSON.stringify(postDto),
                dataType: "JSON",
                contentType: "application/json",
                success: function (data) {
                    pop_tip_open("blue", "保存成功！");
                }
            });
        } else {
            $.xljUtils.tip("blue", "请选择要添加人员范围的预警信息！");
        }
    }
    function checkPersonExist(personId) {
        if(personData!=null&&personData.length>0){
            for(var i=0;i<personData.length;i++){
                if(personId==personData[i].personId){
                    return false;
                }
            }
        }
        return true;
    }
    //删除人员
    $('#delPersonBtn').click(function () {
        delPerson();
    });
    /**
     * 删除demo
     */
    function delPerson() {
        var idsVal = $('#personList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "/sys/sysMsgScopePerson/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                $('#personList').jqGrid().trigger("reloadGrid");
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
            }, true);
            return;
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }

    //计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //右侧table
        $(".con-table .mytable1").height("200px");
    }

    //计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
        $.xljUtils.gridResizeFn();
    }

    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
})
(jQuery, window, document);
