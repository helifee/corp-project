/**
 * 机构编辑
 * lixd
 */
//打开方式：0新增，1修改
var editType = 0;
//修改时用原父级组织机构Id
var patentIdold;
//组织机构树
var zTreeObj;
//组织机构树 的参数配置
var setting = {
    view: {
        dblClickExpand: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeClick: beforeClick,
        onClick: onClick
    }
};

var orgTpye;
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
        changeTypeBack();
    });

    //打开方式：0新增，1修改
    editType = window.opener.editType;
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
        var orgNode = window.opener.orgNode;
        //默认带过来的目录
        var orgRootNode = window.opener.orgRootNode;
        $("#orgnazationFrom").find("input[id='rootId']").val(orgRootNode.id);
        $("input[name='status'][value='1']").attr("checked", true);//默认有效
        if (orgNode != null && orgNode != undefined) {
            if (orgNode.id != orgRootNode.id) {//不是根节点
                $("#orgnazationFrom").find("input[id='parentId']").val(orgNode.id);
                $("#orgnazationFrom").find("input[id='parentIdName']").val(orgNode.name);
                $("#orgnazationFrom").find("input[id='parentprefixId']").val(orgNode.prefixId);
                $("#orgnazationFrom").find("input[id='parentprefixName']").val(orgNode.prefixName);
                if (orgNode.type == "company" || orgNode.type == "dept") {//如果上级是公司活部门，默认选中部门
                    $("#type option[value='dept']").attr("selected", true);
                }
                getMaxCodeByParentId(orgNode.id);
            } else {//根节点
                $("#type option[value='company']").attr("selected", true);
                getMaxCodeByParentId(null);
            }
        } else {//未选择 即根节点
            getMaxCodeByParentId(null);
        }
        initUuid();
    }
    initOrgTree();
});
/**
 * 根据机构id查询子节点机构编码最大的值
 */
function getMaxCodeByParentId(parentId) {
    var uBody = "org/org/getMaxCodeByParentId/" + parentId + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
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
 * 递归设置树的图片样式
 */
function recursionArray(arr) {
    //所属的分类 diy-group 目录 diy-company 集团和公司;diy-program 项目和分期;diy-department 部门;
    for (var i in arr) {
        if (arr[i].type == "zb" || arr[i].type == "company") {
            arr[i].iconSkin = "diy-company";
            if (arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        } else if (arr[i].type == "dept") {
            arr[i].iconSkin = "diy-department";
            if (arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }
    }
};
/**
 * 获取组织机构树
 */
function initOrgTree() {
    var urlBody = "org/orgRoot/getTree";
    var urlAll = serviceUrl + urlBody;
    $.ajax({
        type: 'POST',
        url: urlAll,
        dataType: 'json',
        contentType: 'application/json',
        data: '{}',
        success: function (json) {
            var zNodes = json.result;
            //渲染树
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeOrg"), setting, zNodes);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "获取组织机构树请求失败");
        }
    })
}

/**
 * 组织机构树点击前触发事件
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function beforeClick(treeId, treeNode) {
    return true;
}

/**
 * 点击树触发事件
 * @param e
 * @param treeId
 * @param treeNode
 */
function onClick(e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeOrg"),
        nodes = zTree.getSelectedNodes(),
        v = "";
    k = "";
    r = "";
    parentprefixId = "";
    parentprefixName = "";
    t = "";
    nodes.sort(function compare(a, b) {
        return a.id - b.id;
    });
    for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].name + ",";
        k += nodes[i].id + ",";
        r += nodes[i].rootId + ",";
        parentprefixId += nodes[i].prefixId + ",";
        parentprefixName += nodes[i].prefixName + ",";
        t += nodes[i].type + ",";
    }
    if (v.length > 0) v = v.substring(0, v.length - 1);
    if (k.length > 0) k = k.substring(0, k.length - 1);
    if (r.length > 0) r = r.substring(0, r.length - 1);
    if (parentprefixId.length > 0) parentprefixId = parentprefixId.substring(0, parentprefixId.length - 1);
    if (parentprefixName.length > 0) parentprefixName = parentprefixName.substring(0, parentprefixName.length - 1);
    if (t.length > 0) t = t.substring(0, t.length - 1);
    var orgId = $('#id').val();
    if (k == orgId) {
        pop_tip_open("blue", "上级组织不能选择自己");
    } else {
        if (t == "cata") {
            $("#orgnazationFrom").find("input[id='parentIdName']").val(v);
            $("#orgnazationFrom").find("input[id='parentId']").val("");
            $("#orgnazationFrom").find("input[id='parentprefixId']").val("");
            $("#orgnazationFrom").find("input[id='parentprefixName']").val("");
        } else {
            $("#orgnazationFrom").find("input[id='rootId']").val(r);
            $("#orgnazationFrom").find("input[id='parentId']").val(k);
            $("#orgnazationFrom").find("input[id='parentIdName']").val(v);
            $("#orgnazationFrom").find("input[id='parentprefixId']").val(parentprefixId);
            $("#orgnazationFrom").find("input[id='parentprefixName']").val(parentprefixName);
        }

    }

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
 * 上级组织机构回调函数
 * @param data
 */
function orgCallback(data) {
    // console.log(data);
    var orgId = $('#id').val();
    if (data.id == orgId) {
        pop_tip_open("blue", "上级组织不能选择自己");
    } else {
        if (data.type == "cata") {
            $("#orgnazationFrom").find("input[id='parentIdName']").val(data.name);
            $("#orgnazationFrom").find("input[id='parentId']").val("");
            $("#orgnazationFrom").find("input[id='parentprefixId']").val("");
            $("#orgnazationFrom").find("input[id='parentprefixName']").val("");

            getMaxCodeByParentId(null);
        } else {
            $("#orgnazationFrom").find("input[id='rootId']").val(data.rootId);
            $("#orgnazationFrom").find("input[id='parentId']").val(data.id);
            $("#orgnazationFrom").find("input[id='parentIdName']").val(data.name);
            $("#orgnazationFrom").find("input[id='parentprefixId']").val(data.prefixId);
            $("#orgnazationFrom").find("input[id='parentprefixName']").val(data.prefixName);

            getMaxCodeByParentId(data.id);
        }
        changeTypeBack();
    }
}
/**
 * 多选的回调
 */
function orgCallback1(data) {
    console.log(data);
    var orgId11 = "";
    for (var i = 0; i < data.length; i++) {
        orgId11 += data[i].id + ",";
        //alert("第"+i+"个机构的名字是："+data[i].name);
    }
    orgId11 = orgId11.substring(0, orgId11.length - 1);
    $('#orgId11').val(orgId11);
}

/**
 * 显示树
 */
function showMenu() {
    var cityObj = $("#parentIdName");
    var cityOffset = $("#parentIdName").offset();
    $("#menuContent").css({
        left: cityOffset.left + "px",
        top: cityOffset.top + cityObj.outerHeight() + "px"
    }).slideDown("fast");

    $("body").bind("mousedown", onBodyDown);
}
/**
 * 隐藏树
 */
function hideMenu() {
    $("#menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);
}
/**
 * 点击树外
 */
function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
        hideMenu();
    }
}


/**
 * 初始化主键ID
 */
function initUuid() {
    var uBody = "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
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
    //校验组织机构上级以及下级是否正确
    if(!validateTpye()){
        return;
    }
    if (editType == 1) {//编辑
        editSaveForm();
    } else {//新增
        addSaveForm(sign);
    }
}

//校验组织机构上级以及下级是否正确
function validateTpye(){
    //校验组织机构上级以及下级是否正确
    var parentId = $("#orgnazationFrom").find("input[id='parentId']").val();
    var type = $('#type').val();
    if (null == parentId || "" == parentId) {
        if (type != "company") {
            pop_tip_open("blue", "一级组织只能建立公司");
            return false;
        }
    } else {
        var treeNode = zTreeObj.getNodeByParam("id", parentId, null);
        var parentType = treeNode.type;
        if (type == "company") {
            if (parentType == "dept") {
                pop_tip_open("blue", "公司只能建立在公司下");
                return false;
            }
        } else if (type == "dept") {

        }
    }
    return true;
}

/**
 * 新增保存表单
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
    if(orgnazationDto.status!='1'){
        pop_tip_open("red", "只能新增有效的机构！");
        return;
    }
    orgnazationDto.delflag = false;
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
    var uAll = serviceUrl + uBody;
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
                var msg = resultData.msg;
                if (successFlag) {
                    //addTreeNode(orgnazationDto.prefixId, orgnazationDto.prefixName);
                    window.opener.refreshDictionaryTree(result);
                    if (sign == 1) {//保存并新增
                        pop_tip_open("green", "数据保存成功！");
                        refreshWin();
                    } else {
                        closeWin();
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
 * 父页面组织机构树插入新增组织机构的节点
 */
function addTreeNode(prefixId, prefixName) {
    var ss = window.opener.zTreeObj;
    var parentId = $("#parentId").val();
    var nodes = ss.getNodes();
    var rootNode = nodes[0];
    var treeNode = ss.getNodeByParam("id", parentId, null);
    var id = $("#id").val();
    var name = $("#name").val();

    var iconSkin;
    var sort = $("#sort").val();
    var rootId = $("#rootId").val();
    var children = [];

    var type = $('#type').val();

    if (type == "company") {
        iconSkin = "diy-company";
    } else if (type == "dept") {
        iconSkin = "diy-department";
    }
    if (treeNode) {
        treeNode = ss.addNodes(treeNode, {
            id: id,
            name: name,
            type: type,
            sort: sort,
            rootId: rootId,
            children: children,
            iconSkin: iconSkin,
            prefixId: prefixId,
            prefixName: prefixName
        });
    } else {
        treeNode = ss.addNodes(rootNode, {
            id: id,
            name: name,
            type: type,
            sort: sort,
            rootId: rootId,
            children: children,
            iconSkin: iconSkin,
            prefixId: prefixId,
            prefixName: prefixName
        });
    }
    window.opener.refreshDictionaryTree(treeNode);
};

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
    orgnazationDto.delflag = false;
    var orgId = $('#id').val();
    var orgDto = $.hrUtils.getOrgById(orgId);
    var postData = {};
    postData.orgId = orgnazationDto.id;
    postData.parentId = orgnazationDto.parentId;
    postData.name = orgnazationDto.name;
    var isOrgNameRepeat = $.hrUtils.isOrgNameRepeat(postData);
    if(!isOrgNameRepeat){
        pop_tip_open("red", "机构名称已存在，不能修改！");
        return ;
    }
    if (orgDto.status == '0') {
        pop_tip_open("red", "撤销的机构不能修改！");
    } else {
        orgnazationDto.id = orgId;
        var uBody = "org/org/update/" + orgId;
        var uAll = serviceUrl + uBody;
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
                    var msg = resultData.msg;
                    if (successFlag) {
                        // editTreeNode(orgnazationDto.prefixId, orgnazationDto.prefixName);
                        window.opener.refreshDictionaryTree(orgnazationDto);
                        closeWin();
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
 * 修改成功后 父页面机构树回显
 */
function editTreeNode(prefixId, prefixName) {
    var ss = window.opener.zTreeObj;
    var parentId = $("#parentId").val();
    var treeNodep = ss.getNodeByParam("id", parentId, null);
    var id = $("#id").val();
    var treeNodec = ss.getNodeByParam("id", id, null);
    var name = $("#name").val();

    var iconSkin;
    var sort = $("#sort").val();
    var rootId = $("#rootId").val();
    var type = $("#type").val();
    if (type == "company") {
        iconSkin = "diy-company";
    } else if (type == "dept") {
        iconSkin = "diy-department";
    }
    treeNodec.name = name;
    treeNodec.type = type;
    treeNodec.iconSkin = iconSkin;
    treeNodec.sort = sort;
    treeNodec.rootId = rootId;
    treeNodec.prefixId = prefixId;
    treeNodec.prefixName = prefixName;
    ss.updateNode(treeNodec);//更新节点属性

    if (patentIdold != parentId) {//移动节点
        ss.moveNode(treeNodep, treeNodec, "inner");
    }
    closeWin();
};

/**
 * 获取机构名称
 */
function getOrgNameById(orgId) {
    var uBody = "org/org/get/" + orgId + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
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
    var orgId = window.opener.edit_orgId;
    var uBody = "org/org/get/" + orgId + "?time=" + Math.random();
    var uAll = serviceUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            //处理回显

            //机构类型
            $('#type').val(data.result.type);
            orgTpye = data.result.type;

            $("#orgnazationFrom").find("input[name='id']").val(data.result.id);
            $("#orgnazationFrom").find("input[name='code']").val(data.result.code);
            $("#orgnazationFrom").find("input[name='name']").val(data.result.name);
            $("#orgnazationFrom").find("input[name='fullName']").val(data.result.fullName);
            //负责人
            var chargeId = data.result.chargeId;
            $("#orgnazationFrom").find("input[name='chargeId']").val(chargeId);

            $("#orgnazationFrom").find("input[name='chargeName']").val($.hrUtils.getHRPersonNameById(chargeId));

            //上级组织
            $("#orgnazationFrom").find("input[id='parentId']").val(data.result.parentId);
            if (data.result.parentId != null && data.result.parentId != "") {
                getOrgNameById(data.result.parentId);
            }
            $("#orgnazationFrom").find("input[id='rootId']").val(data.result.rootId);
            patentIdold = data.result.parentId;

            $("#orgnazationFrom").find("input[name='sort']").val(data.result.sort);
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

function changeTypeBack(){
    var type = $('#type').val();
    if(!validateTpye()){
        if(orgTpye == type){
            if(type=="dept"){
                $('#type').val("company");
            }else if(type=="company"){
                $('#type').val("dept");
            }
        }else {
            $('#type').val(orgTpye);
        }
    }
    orgTpye = $('#type').val();
    return;
}


/**
 * 关闭页面
 */
function closeWin() {
    window.close();
}


/**
 * 刷新页面
 */
function refreshWin() {
    initOrgTree();
    $("#id").val("");
    $("#name").val("");
    $("#chargeId").val("");//机构负责人
    $("#chargeName").val("");
    $("#sort").val("");
    // $("#type").val("");
    $("input[name='status'][value='1']").attr("checked", true);
    $("#remark").val("");
    $("#fullName").val("");//机构全称

    //默认带出来已选中的
    var orgNode = window.opener.orgNode;
    //默认带过来的目录
    var orgRootNode = window.opener.orgRootNode;
    $("#orgnazationFrom").find("input[id='rootId']").val(orgRootNode.id);
    //显示上级页面选中的节点
    if (orgNode != null && orgNode != undefined) {
        if (orgNode.id != orgRootNode.id) {
            $("#orgnazationFrom").find("input[id='parentId']").val(orgNode.id);
            $("#orgnazationFrom").find("input[id='parentIdName']").val(orgNode.name);
            $("#orgnazationFrom").find("input[id='parentprefixId']").val(orgNode.prefixId);
            $("#orgnazationFrom").find("input[id='parentprefixName']").val(orgNode.prefixName);

            getMaxCodeByParentId(orgNode.id);
        } else {
            getMaxCodeByParentId(null);
        }
    } else {
        getMaxCodeByParentId(null);
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
    var chargeId = data.id;
    $('#chargeId').val(chargeId);
}
/**
 * 负责人清空
 * @param data
 */
function empty1() {
    $("#orgnazationFrom").find("input[id='chargeId']").val("");
    $("#orgnazationFrom").find("input[id='chargeName']").val("");
}