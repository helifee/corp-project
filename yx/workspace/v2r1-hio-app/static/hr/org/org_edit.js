/**
 * 机构编辑
 * lixd
 */
//打开方式：0新增，1修改
var editType = 0;

/**
 * 页面加载
 */
$(function () {
    $("#saveBtn").on('click', function () {
        $("#orgnazationFrom").attr("data-validate-success", "saveForm(0)");
        $("#orgnazationFrom").submit();
    });
    //保存并新增
    $("#saveAndCreateBtn").on('click', function () {
        $("#orgnazationFrom").attr("data-validate-success", "saveForm(1)");
        $("#orgnazationFrom").submit();
    });
    //切换结构类型
    $("#type").on('change', function (e) {
        // changeTypeBack();
    });

    //打开方式：0新增，1修改
    editType = $.xljUtils.getUrlParam("editType");
    if (editType == 1) {
        $("#saveAndCreateBtn").hide();
        $("#editTitel").text("修改");
        $('title').text("机构修改");
        getOrgById();
        //不能修改上级机构
        $('.input-group-addon').eq(0).hide();
        $('.input-group-addon').eq(1).hide();
    } else {
        $("#editTitel").text("新增");
        $('title').text("机构新增");
        //默认带出来已选中的
        var orgNode = localStorage.getItem('orgNode');
        if (orgNode && orgNode != undefined && orgNode != 'undefined' && orgNode != null) {
            orgNode = JSON.parse(orgNode);
        }
        var orgRootNode = localStorage.getItem('orgRootNode');
        if (orgRootNode && orgRootNode != undefined && orgRootNode != 'undefined' && orgRootNode != null) {
            orgRootNode = JSON.parse(orgRootNode);
        }
        $("input[name='status'][value='1']").attr("checked", true);//默认有效
        if (orgNode != null && orgNode != undefined && orgNode != 'undefined') {
            $("#orgnazationFrom").find("input[id='parentId']").val(orgNode.id);
            $("#orgnazationFrom").find("input[id='parentIdName']").val(orgNode.name);
            $("#orgnazationFrom").find("input[id='parentprefixId']").val(orgNode.prefixId);
            $("#orgnazationFrom").find("input[id='parentprefixName']").val(orgNode.prefixName);
        } else {//未选择 即根节点
        }
        initUuid();
    }
});

/**
 * 根据机构id查询子节点机构编码最大的值
 */
function getMaxCodeByParentId(parentId) {
    var uBody = "org/org/getMaxCodeByParentId/" + parentId + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            console.log(data);
            //自动生成机构编码
            $("#orgnazationFrom").find("input[name='code']").val(data.result);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化组织编码请求失败");
        }
    })
}


/**
 * 清空组织机构上级
 */
function empty() {
    $("#orgnazationFrom").find("input[id='parentId']").val("");
    $("#orgnazationFrom").find("input[id='parentIdName']").val("");
    $("#orgnazationFrom").find("input[id='parentprefixId']").val("");
    $("#orgnazationFrom").find("input[id='parentprefixName']").val("");
}

/**
 * 机构选择器重置
 * 原因新增的机构也要在上级机构中可以选到
 * @constructor
 */
function SelectorReset() {
    $('#selectOrgParent').hrxljSingleSelectorReset({
        title: '选择代码',//选择器标题，默认是'选择组织机构'
        // selectorPersonType: 'org',
        selectorType: 'org',//选择器类型，默认是组织机构选择器
        immediatelyShow: false,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
        gridTitle: '',//列表标题，默认是'组织列表'
        treeUrl: null,
        ajaxType: 'POST',	//ajax的type 默认为post
        treeParam: {},//生成zTree树的参数
        targetId: null,//选择的数据的ID存储input域ID
        targetName: null,//选择的数据的Name存储input域ID
        targetPrefixId: null,//选择的数据的PrefixId存储input域ID
        targetPrefixName: null,//选择的数据的PrefixName存储input域ID
        targetCode: null,//选择数据的编码存储input域ID
        noSelectedDataTip: null,
        selectNodeType: {},//JSON格式,可选节点,其中msg为固定key，显示选择错误提示之用
        // 例：{
        //      msg:'请选择分期',
        //      type:'branch',//指定分期可选
        //      type:'dept',//指定部门可选
        //      type:'company',//指定公司可选
        //      type:'group',//指定项目可选
        //      type:'person',//指定人员可选
        //      type:'post',//指定岗位可选
        //      mold:'role'//指定角色可选
        // }
        /**
         * 保存回调函数
         * @param selectedData 已选择的数据json对象
         * @param ele 绑定选择器的对象
         */
        saveCallback: orgCallback,
        treeSettings: {}
    });
}

/**
 * 上级组织机构回调函数
 * @param data
 */
function orgCallback(data) {
    // console.log(data);
    var orgId = $('#id').val();
    if (data.id == orgId) {
        pop_tip_open("blue", "上级组织不能选择自己");
    } else {

        $("#orgnazationFrom").find("input[id='parentId']").val(data.id);
        $("#orgnazationFrom").find("input[id='parentIdName']").val(data.name);
        $("#orgnazationFrom").find("input[id='parentprefixId']").val(data.prefixId);
        $("#orgnazationFrom").find("input[id='parentprefixName']").val(data.prefixName);

    }
}

/**
 * 初始化主键ID
 */
function initUuid() {
    var uBody = "generator/getGuuid" + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            var guuid = data.result;
            $("#orgnazationFrom").find("input[name='id']").val(guuid);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化主键ID请求失败");
        }
    })
}


/**
 * 保存表单
 * @param sign 0保存 1保存并新增
 */
function saveForm(sign) {
    if (editType == 1) {//编辑
        editSaveForm();
    } else {//新增
        addSaveForm(sign);
    }
}

/**
 * 新增保存表单
 * @param sign 0保存 1保存并新增
 */
function addSaveForm(sign) {
    var orgnazationArr = $("#orgnazationFrom").serializeArray();
    var orgnazationDto = {};
    for (var i in orgnazationArr) {

        if (orgnazationArr[i].name == "parentIdName" || orgnazationArr[i].name == "chargeName") {
            //表单中与dto映射不到的字段，过滤掉********************
        }
        //处理全路径机构id、名称
        else if (orgnazationArr[i].name == "parentprefixId") {
            if (orgnazationArr[i].value == "" || null == orgnazationArr[i].value || "null" == orgnazationArr[i].value) {
                orgnazationDto.prefixId = $('#id').val();
            } else {
                orgnazationDto.prefixId = orgnazationArr[i].value + "/" + $('#id').val();
            }

        } else if (orgnazationArr[i].name == "parentprefixName") {
            if (orgnazationArr[i].value == "" || null == orgnazationArr[i].value || "null" == orgnazationArr[i].value) {
                orgnazationDto.prefixName = $('#name').val();
            } else {
                orgnazationDto.prefixName = orgnazationArr[i].value + "/" + $('#name').val();
            }
        } else {
            orgnazationDto[orgnazationArr[i].name] = orgnazationArr[i].value;
        }
    }
    // if (orgnazationDto.status != '1') {
    //     pop_tip_open("red", "只能新增有效的机构！");
    //     return;
    // }
    orgnazationDto.delflag = 0;
    var postData = {};
    postData.orgId = orgnazationDto.id;
    postData.parentId = orgnazationDto.parentId;
    postData.name = orgnazationDto.name;
    //名称是否重复
    var isOrgNameRepeat = $.hrUtils.isOrgNameRepeat(postData);
    if (isOrgNameRepeat) {
        doSave(orgnazationDto, sign);
    } else {
        pop_tip_open("red", "机构名称已存在，不能新增！");
    }
}

/**
 * 进行保存
 * @param orgnazationDto
 * @param sign =1？保存并新增：保存
 */
function doSave(orgnazationDto, sign) {
    var uBody = "org/org/save";
    var uAll = hostUrl + uBody;
    $.ajax({
        url: uAll,
        data: JSON.stringify(orgnazationDto),
        type: 'POST',
        contentType: 'application/json',
        dataType: 'JSON',
        success: function (resultData) {
            if (resultData) {
                var successFlag = resultData.success;
                var result = resultData.result;
                var msg = resultData.message;
                if (successFlag) {
                    //编辑的节点，用于回显
                    localStorage.setItem('orgnazationDto', orgnazationDto);

                    if (sign == 1) {//保存并新增
                        pop_tip_open("green", "数据保存成功！");
                        refreshWin();
                    } else {
                        window.parent.location.reload();//重载
                        window.parent.closePa();
                    }
                } else {
                    pop_tip_open("red", "数据保存失败！" + msg);
                }
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "数据保存请求失败");
        }
    });
}

/**
 * 修改-保存表单
 */
function editSaveForm() {
    var orgnazationArr = $("#orgnazationFrom").serializeArray();
    var orgnazationDto = {};
    for (var i in orgnazationArr) {
        //处理全路径机构id、名称
        if (orgnazationArr[i].name == "parentIdName" || orgnazationArr[i].name == "chargeName") {
            //表单中与dto映射不到的字段，过滤掉********************
        } else if (orgnazationArr[i].name == "parentprefixId") {
            if (orgnazationArr[i].value == "" || null == orgnazationArr[i].value || "null" == orgnazationArr[i].value) {
                orgnazationDto.prefixId = $('#id').val();
            } else {
                orgnazationDto.prefixId = orgnazationArr[i].value + "/" + $('#id').val();
            }

        } else if (orgnazationArr[i].name == "parentprefixName") {
            if (orgnazationArr[i].value == "" || null == orgnazationArr[i].value || "null" == orgnazationArr[i].value) {
                orgnazationDto.prefixName = $('#name').val();
            } else {
                orgnazationDto.prefixName = orgnazationArr[i].value + "/" + $('#name').val();
            }

        } else {
            orgnazationDto[orgnazationArr[i].name] = orgnazationArr[i].value;
        }
    }
    orgnazationDto.delflag = 0;
    var orgId = $('#id').val();
    var orgDto = $.hrUtils.getOrgById(orgId);
    var postData = {};
    postData.orgId = orgnazationDto.id;
    postData.parentId = orgnazationDto.parentId;
    postData.name = orgnazationDto.name;
    var isOrgNameRepeat = $.hrUtils.isOrgNameRepeat(postData);
    if (!isOrgNameRepeat) {
        pop_tip_open("red", "机构名称已存在，不能修改！");
        return;
    }
    if (orgDto.status == '0') {
        pop_tip_open("red", "撤销的机构不能修改！");
    } else {
        orgnazationDto.id = orgId;
        var uBody = "org/org/update/" + orgId;
        var uAll = hostUrl + uBody;
        $.ajax({
            url: uAll,
            data: JSON.stringify(orgnazationDto),
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.message;
                    if (successFlag) {
                        localStorage.setItem('orgnazationDto', orgnazationDto);
                        window.parent.location.reload();//重载
                        window.parent.closePa();
                    } else {
                        pop_tip_open("red", "数据修改保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }
        });
    }
}

/**
 * 获取机构名称
 */
function getOrgNameById(orgId) {
    var uBody = "org/org/get/" + orgId + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            //回显上级机构信息
            $("#orgnazationFrom").find("input[id='parentIdName']").val(data.result.name);
            $("#orgnazationFrom").find("input[id='parentprefixId']").val(data.result.prefixId);
            $("#orgnazationFrom").find("input[id='parentprefixName']").val(data.result.prefixName);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "获取上级机构请求失败");
        }
    })
}

/**
 * 根据ID获取要修改的组织机构
 */
function getOrgById() {
    var edit_orgId = $.xljUtils.getUrlParam("edit_orgId");
    var orgId = edit_orgId;
    var uBody = "org/org/get/" + orgId + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            //处理回显
            $("#orgnazationFrom").find("input[name='id']").val(data.result.sid);
            $("#orgnazationFrom").find("input[name='code']").val(data.result.code);
            $("#orgnazationFrom").find("input[name='name']").val(data.result.name);
            // $("#orgnazationFrom").find("input[name='fullName']").val(data.result.fullName);
            //负责人
            var leaderId = data.result.leaderId;
            $("#orgnazationFrom").find("input[name='leaderId']").val(leaderId);

            $("#orgnazationFrom").find("input[name='chargeName']").val($.hrUtils.getHRPersonNameById(leaderId));

            //上级组织
            $("#orgnazationFrom").find("input[id='parentId']").val(data.result.parentId);
            if (data.result.parentId != null && data.result.parentId != "") {
                getOrgNameById(data.result.parentId);
            }
            //状态
            if (data.result.status == "1") {
                $("input[name='status'][value='1']").attr("checked", true);
            } else {
                $("input[name='status'][value='0']").attr("checked", true);
            }
            $('#remark').val(data.result.remark);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化组织机构请求失败");
        }
    })
}


/**
 * 刷新页面
 */
function refreshWin() {
    $("#id").val("");
    $("#name").val("");
    $("#leaderId").val("");//机构负责人
    $("#chargeName").val("");
    // $("#sort").val("");
    // $("#type").val("");
    $("input[name='status'][value='1']").attr("checked", true);
    $("#remark").val("");
    // $("#fullName").val("");//机构全称

    //默认带出来已选中的
    var orgNode = localStorage.getItem('orgNode');
    if (orgNode && orgNode != undefined && orgNode != 'undefined' && orgNode != null) {
        orgNode = JSON.parse(orgNode);
    }
    //默认带过来的目录
    var orgRootNode = localStorage.getItem('orgRootNode');
    if (orgRootNode && orgRootNode != undefined && orgRootNode != 'undefined' && orgRootNode != null) {
        orgRootNode = JSON.parse(orgRootNode);
    }
    //显示上级页面选中的节点
    if (orgNode != null && orgNode != undefined) {
        if (orgNode.id != orgRootNode.id) {
            $("#orgnazationFrom").find("input[id='parentId']").val(orgNode.id);
            $("#orgnazationFrom").find("input[id='parentIdName']").val(orgNode.name);
            $("#orgnazationFrom").find("input[id='parentprefixId']").val(orgNode.prefixId);
            $("#orgnazationFrom").find("input[id='parentprefixName']").val(orgNode.prefixName);

            // getMaxCodeByParentId(orgNode.id);
        } else {
            // getMaxCodeByParentId(null);
        }
    } else {
        // getMaxCodeByParentId(null);
    }
    editType = 0;//新增
    initUuid();
}

/**
 * 人员选择回调函数
 * @param data
 */
function personCallback(data, success) {
    //经办人
    var leaderId = data.id;
    $('#leaderId').val(leaderId);
}

/**
 * 负责人清空
 * @param data
 */
function empty1() {
    $("#orgnazationFrom").find("input[id='leaderId']").val("");
    $("#orgnazationFrom").find("input[id='chargeName']").val("");
}