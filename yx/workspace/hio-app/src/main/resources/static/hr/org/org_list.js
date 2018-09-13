/**
 * lixd
 * 机构模块js
 */
var selectNodes;//选中的节点对象
//上来就执行
$(function () {
    //初始化组织机构树
    getOrgTree();
    //加载组织结构岗位列表
    // pageInit();

    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function (e) {
        e.preventDefault();
        $(this).parents('.fullWidth').children('input').val('');
    });
    //树加滚动条
    setTimeout(function () {
        $.xljUtils.addTreeScroll();
        $.xljUtils.treeResizeFn();
    }, 300);
});
/**
 *  点击树触发的事件 只能叫treeClick
 */
window.treeClick = function () {
    var nodes = zTreeObj.getSelectedNodes();
    if (nodes.length < 1) {
        pop_tip_open("blue", "请先选择组织机构");
    } else {
        var allNodes = zTreeObj.getNodes();
        var rootNode = allNodes[0];
        if (rootNode.id == nodes[0].id) {
            pop_tip_open("blue", "根目录不允许操作");
        } else {
            edit_orgId = nodes[0].id;
            //xxx//业务代码
        }
    }
    // postQuery();
    queryEmpListByCondition();
};
//机构变更信息
$("#orgChangeBtn").unbind('click').on('click', function () {
    showOrgChange();
});
function showOrgChange() {
    //获取机构树节点的id
    var nodes = zTreeObj.getSelectedNodes();
    if (nodes.length < 1) {
        pop_tip_open("blue", "请先选择组织机构");
    } else {
        var allNodes = zTreeObj.getNodes();
        var rootNode = allNodes[0];
        if (rootNode.id == nodes[0].id) {
            edit_orgId = '';//根目录查询所有的
            changeOrg();
        } else {
            edit_orgId = nodes[0].id;
            if (edit_orgId && edit_orgId != "") {
                changeOrg();
            } else {
                $.xljUtils.tip("blue", "请选择要查看的机构！");
            }
        }
    }
}
//删除岗位
$("#deleteBtn").unbind('click').on('click', function () {
    del();
});
//查询人员
$("#queryPersonBtn").unbind('click').on('click', function () {
    queryPersonList();
});
//查询岗位下的人员信息
function queryPersonList() {
    var idsVal = $('#orgPostRelationList').jqGrid('getGridParam', 'selarrrow');
    if (idsVal && idsVal != "") {
        if (idsVal.length > 1) {
            $.xljUtils.tip("blue", "只能选择一个岗位进行查询！");
            return;
        } else {
            var rowId = $('#orgPostRelationList').jqGrid("getGridParam", "selrow");
            window.open("org_post_person_list.html?postId=" + rowId);
        }
    } else {
        $.xljUtils.tip("blue", "请选择要查询的岗位！");
    }
}
/**
 * 引入岗位
 * @param data
 */
window.postCallback = function (data) {
    // $("#postName").val(data.name);
    $("#postId").val(data.id);

    //获取机构树节点的id
    var nodes = zTreeObj.getSelectedNodes();
    if (nodes.length < 1) {
        pop_tip_open("blue", "请先选择组织机构");
    } else {
        var allNodes = zTreeObj.getNodes();
        var rootNode = allNodes[0];
        if (rootNode.id == nodes[0].id) {
            pop_tip_open("blue", "根目录不允许分配");
        } else {
            edit_orgId = nodes[0].id;
            if (nodes[0].status == '1') {
                if (edit_orgId && edit_orgId != "") {
                    if (checkOrgPostRepeat(data.id, edit_orgId) && checkPostApplyOrg(data.id, edit_orgId)) {
                        doSaveOrgPostRelation(data.id, edit_orgId);
                    }
                } else {
                    $.xljUtils.tip("blue", "请选择要引入的机构！");
                }
            } else {
                $.xljUtils.tip("blue", "撤销的机构不能引入岗位！");
            }
        }
    }
}
/**
 * 检查机构、岗位对应关系是否存在
 */
function checkOrgPostRepeat(post_id, org_id) {
    var repeat = false;//重复
    var orgPostRelationDto = {
        delflag: false,
        status: '1',
        postId: post_id,
        orgId: org_id
    };
    $.ajax({
            type: 'post',
            url: serviceUrl + "/org/orgPostRelation/queryListByCondition/",
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(orgPostRelationDto),
            async: false,
            success: function (xhr) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        if (xhr.result != null && xhr.result.list.length > 0) {
                            repeat = false;//重复了
                            $.xljUtils.tip("blue", "当前机构与岗位的对应关系已经存在，不能引入！");
                        } else {
                            repeat = true;
                        }
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "查询岗位是否重复！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        }
    );
    return repeat;
}
/**
 * 校验岗位是否使用与引入机构
 */
function checkPostApplyOrg(post_id, org_id) {
    var postDto = $.hrUtils.getPostById(post_id);
    var orgDto = $.hrUtils.getOrgById(org_id);
    if (postDto)
        if (orgDto != null && postDto != null) {
            if ($.hrUtils.filterNull(postDto.applyOrgId) == "") {
                return true;
            } else if (orgDto.prefixId.indexOf(postDto.applyOrgId) != -1) {
                //引入岗位适用于本机构
                return true;
            } else {
                setTimeout(function () {
                    $.xljUtils.tip("red", "引入的岗位不适用于本机构！");
                }, 300);
                return false;
            }
        }
    return true;
}
/**
 * 保存机构-岗位关联信息
 * @param post_id
 * @param org_id
 */
function doSaveOrgPostRelation(post_id, org_id) {
    var uAll = serviceUrl+"sys/uuid/generator/getGuuid" + "?time=" + Math.random();
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            var guuid = data.result;
            var orgPostRelationDto = {
                id: guuid,
                delflag: false,
                status: '1',
                postId: post_id,
                orgId: org_id
            };
            $.ajax({
                url: serviceUrl + "/org/orgPostRelation/save/",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify(orgPostRelationDto),
                success: function (xhr) {
                    console.log(xhr);
                    if (xhr) {
                        if (xhr.success) {
                            $.xljUtils.tip("green", "新增成功！");
                            $('#orgPostRelationList').jqGrid().trigger("reloadGrid");
                        } else {
                            if (xhr.code == "50000") {
                                $.xljUtils.tip("red", xhr.msg);
                                return;
                            }
                            $.xljUtils.tip("red", "保存失败！");
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
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化主键ID请求失败");
        }
    });

}
//删除机构
$("#delOrg").click(function () {
    delOrg();
});
/**
 * 删除机构
 */
function delOrg() {
    var nodes = zTreeObj.getSelectedNodes();
    if (nodes.length < 1) {
        pop_tip_open("blue", "请先选择组织机构");
    } else {
        var allNodes = zTreeObj.getNodes();
        var rootNode = allNodes[0];
        if (rootNode.id == nodes[0].id) {
            pop_tip_open("blue", "根目录不允许删除");
        } else {
            edit_orgId = nodes[0].id;
            //当前节点的父节点
            var parentNode = zTreeObj.getNodeByParam("id", nodes[0].parentId, null);
            doDelOrg(edit_orgId, parentNode);
        }
    }
}
/**
 * 进行机构删除
 * @param edit_orgId
 * @param parentNode
 */
function doDelOrg(edit_orgId, parentNode) {
    $.xljUtils.confirm("blue", "确认要删除当前机构吗？", function () {
        $.ajax({
            //url: serviceUrl + "/org/org/delete/" + edit_orgId,
            url: serviceUrl + "/org/org/deletePseudo/" + edit_orgId,
            type: 'DELETE',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", xhr.msg);
                        //初始化组织机构树
                        getOrgTree();
                        if (parentNode != null && parentNode != undefined) {
                            zTreeObj.selectNode(parentNode);
                        }
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
}
/**
 * 删除机构岗位关联信息
 */
function del() {
    var idsVal = $('#orgPostRelationList').jqGrid('getGridParam', 'selarrrow');
    if (idsVal && idsVal != "") {
        $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
            $.ajax({
                url: serviceUrl + "/org/orgPostRelation/deleteBatch/" + idsVal,
                type: 'DELETE',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({}),
                success: function (xhr, textStatus) {
                    console.log(xhr);
                    if (xhr) {
                        if (xhr.success) {
                            $.xljUtils.tip("green", "数据删除成功！");
                            var w = $.hrUtils.focusNode(idsVal);
                            $('#orgPostRelationList').jqGrid("setGridParam", {
                                gridComplete: function () {
                                    if (w != null && w != "") {
                                        $("#orgPostRelationList").setSelection(w);
                                    }
                                    w = "";
                                }
                            }).trigger("reloadGrid");
                        } else {
                            if (xhr.code == "50000") {
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
//================处理机构撤销=======================
//撤销机构信息
$("#cancelBtn").unbind('click').on('click', function () {
    //清空撤销时间、撤销说明
    $("#cancelDate1").val();
    $("#remark1").val("");
    var cancelDate1 = new Date().format('yyyy-MM-dd hh:mm:ss');
    $("#cancelDate1").val(cancelDate1);

    var nodes = zTreeObj.getSelectedNodes();
    if (nodes.length < 1) {
        pop_tip_open("blue", "请先选择组织机构");
    } else {
        var allNodes = zTreeObj.getNodes();
        var rootNode = allNodes[0];
        if (rootNode.id == nodes[0].id) {
            pop_tip_open("blue", "根目录不允许撤销");
        } else {
            if (nodes[0].status == 0) {
                pop_tip_open("blue", "已经撤销的机构不能再次撤销");
                return;
            }
            edit_orgId = nodes[0].id;
            selectNodes = nodes;
            $('#cancelOrg').modal('show');
        }
    }
});
//保存 撤销机构
$("#cancelOrgBtn").unbind('click').on('click', function () {
    updateCheXiaoBtn1();
});
//撤销-保存
function updateCheXiaoBtn1() {
    //机构id
    var id = edit_orgId;
    var cancelDate = $("#cancelDate1").val();
    var remark = $("#remark1").val();
    if (checkRemark(remark)) {
        $.ajax({
            url: serviceUrl + "/org/org/updateOrgStatus",
            type: 'PUT',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                //'id': id,
                'orgId': id,
                'cancelDate': cancelDate,
                'remark': remark,
                'status': '0'
            }),
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "状态修改成功！");
                        $('#cancelOrg').modal('hide');
                        lockOrUnNodes('0', selectNodes[0]);
                        // window.location.reload();
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
/**
 * 校验撤销理由
 * @param remark
 * @returns {boolean}
 */
function checkRemark(remark) {
    if (remark == null || remark == "") {
        $.xljUtils.tip("red", "请填写撤销理由！");
        return false;
    }
    if (remark.length > 500) {
        $.xljUtils.tip("red", "请填写撤销理由长度不能大于500！");
        return false;
    }
    return true;
}
/**
 * 改变父节点或子节点样式
 * @param status 0禁用，1启用
 * @param node 节点
 * @param unLockChildrenFlag 是否启用子节点 0不启用1启用
 */
function lockOrUnNodes(status, node, unLockChildrenFlag) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    if (status == 0) {
        lockAllChildrenNodes(node, zTree);
    } else {
        unLockAllParentNodes(node, zTree);
        if (unLockChildrenFlag == 1) {//启用
            unlockAllChildrenNodes(node, zTree);
        }
    }
}
/**
 * 禁用所有子节点
 * @param treeNode
 * @param result
 * @returns
 */
function lockAllChildrenNodes(treeNode, zTree) {
    treeNode.status = "0";
    zTree.updateNode(treeNode);
    var childrenNodes = treeNode.children;
    if (childrenNodes) {
        for (var i = 0; i < childrenNodes.length; i++) {
            //递归
            lockAllChildrenNodes(childrenNodes[i], zTree);
        }
    }
}
/**
 * 启用所有父节点
 * @param treeNode
 * @param result
 * @returns
 */
function unLockAllParentNodes(treeNode, zTree) {
    treeNode.status = 1;
    zTree.updateNode(treeNode);
    var pNode = treeNode.getParentNode();
    if (pNode != null) {
        unLockAllParentNodes(pNode, zTree);
    }
}
/**
 * 启用所有子节点
 * @param treeNode
 * @param result
 * @returns
 */
function unlockAllChildrenNodes(treeNode, zTree) {
    treeNode.status = "1";//启用
    zTree.updateNode(treeNode);
    var childrenNodes = treeNode.children;
    if (childrenNodes) {
        for (var i = 0; i < childrenNodes.length; i++) {
            //递归
            unlockAllChildrenNodes(childrenNodes[i], zTree);
        }
    }
}
//==================机构撤销end========================

//==================处理机构启用========================
//启用机构信息
$("#unLockBtn").unbind('click').on('click', function () {
    //清空启用时间、启用说明
    $("#cancelDate2").val();
    $("#remark2").val("");
    var cancelDate2 = new Date().format('yyyy-MM-dd hh:mm:ss');
    $("#cancelDate2").val(cancelDate2);

    var nodes = zTreeObj.getSelectedNodes();
    if (nodes.length < 1) {
        pop_tip_open("blue", "请先选择组织机构");
    } else {
        var allNodes = zTreeObj.getNodes();
        var rootNode = allNodes[0];
        if (rootNode.id == nodes[0].id) {
            pop_tip_open("blue", "根目录不允许操作");
        } else {
            edit_orgId = nodes[0].id;
            selectNodes = nodes;
            //展示启用机构模态框
            $('#unLockOrg').modal('show');
        }
    }
});
//保存 启用机构
$("#unLockOrgBtn").unbind('click').on('click', function () {
    updateQiYongBtn1();
});
//启用-保存
function updateQiYongBtn1() {
    //机构id
    var id = edit_orgId;
    var cancelDate = $("#cancelDate2").val();//启用日期
    var remark = $("#remark2").val();//启用原因
    var unLockChildrenFlag = false;//是否启用子节点
    if (checkRemark(remark)) {
        $.xljUtils.confirm("blue", "是否要启用子节点？",
            //确认按钮回调
            function () {
                updateOrgStatus(id, cancelDate, remark, '1','1');
            },
            //取消按钮回调
            function () {
                updateOrgStatus(id, cancelDate, remark, '1','0');
            });

    }
}
/**
 * 修改机构的状态
 * @param orgId         机构id
 * @param cancelDate    修改时间
 * @param remark        说明
 * @param status        状态：0禁用1启用
 * @param unLockChildrenFlag    是否启用子节点标识 0不起用1启用
 */
function updateOrgStatus(orgId, cancelDate, remark, status, unLockChildrenFlag) {
    $.ajax({
        url: serviceUrl + "/org/org/updateOrgStatus",
        type: 'PUT',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({
            'orgId': orgId,
            'cancelDate': cancelDate,
            'remark': remark,
            'status': status,
            'unLockChildrenFlag': unLockChildrenFlag
        }),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    $.xljUtils.tip("green", "状态修改成功！");
                    //隐藏模态框
                    $('#unLockOrg').modal('hide');
                    //前端样式处理
                    lockOrUnNodes('1', selectNodes[0], unLockChildrenFlag);
                    // window.location.reload();
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
//==================机构启用end========================


//撤销机构-岗位关联信息
$("#cancelBtn1").unbind('click').on('click', function () {

    //清空撤销时间、撤销说明
    $("#cancelDate").val();
    $("#remark").val("");
    var cancelDate = new Date().format('yyyy-MM-dd hh:mm:ss');
    $("#cancelDate").val(cancelDate);
    var idsVal = $('#orgPostRelationList').jqGrid('getGridParam', 'selarrrow');
    if (idsVal && idsVal != "") {
        if (idsVal.length > 1) {
            $.xljUtils.tip("blue", "只能选择一行数据进行状态更新！");
            return;
        } else {
            $('#cancelPost').modal('show');
            var idVal = $('#orgPostRelationList').jqGrid('getGridParam', 'selrow');
            rowData = $('#orgPostRelationList').jqGrid('getRowData', idVal);
            $("#id").val(rowData.id);
        }
    } else {
        $.xljUtils.tip("red", "请先选择一条记录！");
        return;
    }
});
//保存 撤销机构-岗位关联信息
$("#cancelOrgPostBtn").unbind('click').on('click', function () {
    updateCheXiaoBtn();
});
//撤销-保存
function updateCheXiaoBtn() {
    //获取要更改的关联表id
    var id = $("#id").val();
    var cancelDate = $("#cancelDate").val();
    var remark = $("#remark").val();
    if (checkRemark(remark)) {
        $.ajax({
            url: serviceUrl + "/org/orgPostRelation/update/" + id,
            type: 'PUT',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                'id': id,
                'cancelDate': cancelDate,
                'remark': remark,
                'status': '0'
            }),
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "状态修改成功！");
                        $('#cancelPost').modal('hide');
                        $('#orgPostRelationList').jqGrid().trigger("reloadGrid");
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "状态修改失败！");
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

//跳转修改页面时父页面选中的tree节点组织Id
var edit_orgId;
//组织机构新增、修改打开方式：0新增，1修改。默认新增
var editType = 0;
//组织机构或者用户新增默认带的选中的节点
var orgNode;
//组织机构根节点目录
var orgRootNode;
/**
 * 新增和修改组织方法
 * @param sign 跳转信号0新增，1修改
 */
function editOrgInfo(sign) {
    if (sign == 1) {
        editType = 1;
        var nodes = zTreeObj.getSelectedNodes();
        if (nodes.length < 1) {
            pop_tip_open("blue", "请先选择组织机构");
        } else {
            var allNodes = zTreeObj.getNodes();
            var rootNode = allNodes[0];
            if (rootNode.id == nodes[0].id) {
                pop_tip_open("blue", "根目录不允许修改");
            } else {
                edit_orgId = nodes[0].id;
                window.open("org_edit.html");
            }
        }
    } else {
        var allNodes = zTreeObj.getNodes();
        orgRootNode = allNodes[0];
        var nodes = zTreeObj.getSelectedNodes();
        if (nodes.length < 1) {
        } else {
            orgNode = nodes[0];
        }
        if (orgNode != null && orgNode != undefined) {
            if (orgNode.status != '0') {
                editType = 0;
                window.open("org_edit.html");
            } else {
                pop_tip_open("blue", "撤销的组织机构下不能新增");
            }
        } else {
            editType = 0;
            window.open("org_edit.html");
        }
    }

}

//机构变更信息
function changeOrg() {
    window.open("org_change_list.html?edit_orgId=" + edit_orgId);
}

//显示机构图
function showOrgTu() {
    window.open("orgHistory/org_history_version.html");
}
//返回上一级
function goBack() {
    window.history.go(-1);
}

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
//---------------------------------------------
var rightNode;//右键事件节点
var copyNode;//复制节点
var pasteNode;//粘贴节点
//在ztree上的右击事件
function OnRightClick(event, treeId, treeNode) {
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
//        showRMenu("root", event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        //TODO
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        treeObj.selectNode(treeNode);
        //rightNode=treeNode;
        showRMenu("node", event.clientX, event.clientY);
    }
}
var rMenu = $("#rMenu");
//显示右键菜单
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    rMenu.css({"top": y + "px", "left": x - 50 + "px", "visibility": "visible"}); //设置右键菜单的位置、可见
    $("body").bind("mousedown", onBodyMouseDown);
}
//隐藏右键菜单
function hideRMenu() {
    if (rMenu) rMenu.css({"visibility": "hidden"}); //设置右键菜单不可见
    $("body").unbind("mousedown", onBodyMouseDown);
}
//鼠标按下事件
function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({"visibility": "hidden"});
    }
}

/**
 * 复制组织结构
 */
function copyOrg() {
    hideRMenu();
    var nodes = zTreeObj.getSelectedNodes();
    if (nodes.length < 1) {
        pop_tip_open("blue", "请先选择组织机构");
    } else {
        rightNode = nodes[0];
        if (rightNode.type == 'cata') {
            pop_tip_open("blue", "根目录不可复制");
            return false;
        }
        if (rightNode.status == '0') {
            pop_tip_open("blue", "撤销的机构不可复制");
            return false;
        }
        copyNode = rightNode;
    }
}
/**
 * 粘贴组织结构
 */
function pasteOrg() {
    hideRMenu();
    var nodes = zTreeObj.getSelectedNodes();
    if (nodes.length < 1) {
        pop_tip_open("blue", "请先选择组织机构");
    } else {
        if (!copyNode) {
            pop_tip_open("blue", "请先复制组织结构");
            return false;
        }
        rightNode = nodes[0];
        pasteNode = rightNode;
        pop_text_open("blue", "确定要复制【" + copyNode.name + "】到【" + pasteNode.name + "】吗？", function () {
            easyDialog.close();
            //判断节点是否可以复制
            if (copyNode.type == "company") {
                if (!(pasteNode.type == "company" || pasteNode.type == "cata")) {
                    pop_tip_open("blue", "公司只能设置在公司下");
                    return false;
                }
            } else if (copyNode.type == "dept") {
                if (!(pasteNode.type == "company" || pasteNode.type == "dept")) {
                    pop_tip_open("blue", "部门只能设置在公司、部门下");
                    return false;
                }
            } else if (copyNode.type == "virtual") {
                if (!(pasteNode.type == "virtual" || pasteNode.type == "company")) {
                    pop_tip_open("blue", "虚拟机构只能设置在虚拟机构或公司下");
                    return false;
                }
            }
            var data = {
                copyId: copyNode.id
            };
            if (pasteNode.type != 'cata') {
                data.pasteId = pasteNode.id;
            }
            var urlBody = "org/org/copyAndPasteOrg";
            var urlAll = serviceUrl + urlBody;
            $.ajax({
                type: 'POST',
                url: urlAll,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function (json) {
                    if (json.success == true) {
                        // var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                        // //复制节点
                        // var resNodes = treeObj.copyNode(pasteNode, copyNode, "inner");
                        // var data = json.result;
                        // updataCopyNode(data, resNodes);
                        // //修改节点
                        // zTreeObj.updateNode(resNodes);
                        // //console.log(copyNode.name+"<-----,粘贴成功---->"+pasteNode.name);
                        //重载树，定位到粘贴的节点上
                        refreshDictionaryTree(pasteNode);
                    } else {
                        pop_tip_open("red", json.msg);
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "粘贴请求失败");
                }
            })
        }, true);
    }

}
/**
 * 更新复制出的节点的属性
 * @param data
 * @param node
 */
function updataCopyNode(data, node) {
    var key = node.id;
    var newNode = data[key];
    node.id = newNode.id;
    node.parentId = newNode.parentId;
    node.code = newNode.code;
    node.name = newNode.name;
    node.prefixId = newNode.prefixId;
    node.prefixName = newNode.prefixName;

    if (node.children.length > 0) {
        var arr = node.children;
        for (var i in arr) {
            updataCopyNode(data, arr[i]);
        }
    }
}
//---------------------------------------------


/**
 * 机构数据保存成功后刷新树回调函数
 * @param node
 */
function refreshDictionaryTree(node) {
    //重新加载树，保证修改的能及时显示出来
    getOrgTree();
    var zTreeObj = $.fn.zTree.getZTreeObj("treeDemo");
    node.pId = '0';
    var nodeId = node.id;
    //获取当前节点
    var zNodes = zTreeObj.getNodesByParam('id', nodeId);

    if (zNodes.length > 0) {
        var znode = zNodes[0];
        zTreeObj.selectNode(znode);
        znode.id = node.id;
        znode.code = $.xljUtils.htmlDecode(node.code);
        znode.formType = node.formType;
        znode.name = $.xljUtils.htmlDecode(node.name);
        znode.status = node.status;
        znode.sort = node.sort;//排序
        zTreeObj.updateNode(znode);
        return;
    }
    var nodeArr = [];
    if (node.type == "company") {
        node.iconSkin = "diy-company";
    } else if (node.type == "dept") {
        node.iconSkin = "diy-department";
    } else if (node.type == "virtual") {
        node.iconSkin = "diy-program";
    }
    //node.iconSkin = "diy-system";
    nodeArr.push(node);
    node.name = $.xljUtils.htmlDecode(node.name);
    node.code = $.xljUtils.htmlDecode(node.code);
    //父节点
    var treeNode = zTreeObj.getNodeByParam("id", node.parentId, null);
    var rootNode = zTreeObj.getNodes()[0];
    if (treeNode) {
        zTreeObj.addNodes(treeNode, node);
    } else {
        zTreeObj.addNodes(rootNode, node);
    }
    var zNodeArr = zTreeObj.getNodesByParam('id', node.id);
    zTreeObj.selectNode(zNodeArr[0]);
    zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, zNodeArr[0]);
    zTreeObj.updateNode(zNodeArr[0]);

}
/**
 * 计算ztree容器高度
 */
window.initTreeContainer = function () {
    var height = window.innerHeight;//$(window).height()
    $('.dictionary-tree').height(height - $('.tit-box').outerHeight() - $('.searchBox:visible').outerHeight() - 40);
};
//组织机构查询
$('#searchBox').on('hidden.bs.collapse', function () {
    initTreeContainer();
});
$('#searchBox').on('shown.bs.collapse', function () {
    initTreeContainer();
});
