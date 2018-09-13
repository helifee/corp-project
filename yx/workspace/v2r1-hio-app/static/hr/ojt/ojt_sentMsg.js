// (function ($, window, document, undefined) {


$(function () {
    //课程id
    subjectId = $.xljUtils.getUrlParam("subjectId");
    getOjtSubjectById(subjectId);

    $("#selectPerson").on('click', function () {
        $("#selectPersonModal").click();
    });

    $("#selectOrg").on('click', function () {
        $("#selectOrgModal").click();
    });

    /**
     * 保存推送
     */
    $("#saveBtn").on('click', function () {
        var id=$('#id').val();
        var name=$('#name').val();
        var remark=$('#remark').val();
        var userIds=$('#userIds').val();
        var orgIds=$('#orgIds').val();
        //如果选择了人员范围或机构范围
        if(userIds!=''||orgIds!=''){
            var data={};
            data.id=id;
            data.name=name;
            data.remark=remark;
            data.userIds=userIds;
            data.orgIds=orgIds;
            sentMsg(data);
        }else{
            // pop_tip_open("red", "请选择推送的人员范围或机构范围");
            $.xljUtils.tip("red", "请选择推送的人员范围或机构范围");
        }
    });

    //关闭
    $("#goBack").click(function () {
        window.parent.closePa();
    });

});

/**
 * 根据课程id加载课程信息
 */
function getOjtSubjectById(subjectId) {
    var uBody = "/ojt/hrOjtSubject/get/" + subjectId + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            //名称
            $('#id').val(data.result.sid);
            $('#name').val(data.result.name);
            //简介
            $('#remark').val(data.result.remark);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化培训需求请求失败");
        }
    })
}
function sentMsg(data) {
    var uBody = "/ojt/hrOjtSubject/sentMsg";
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'post',
        url: uAll,
        data:JSON.stringify(data),
        contentType: 'application/json',//内容编码
        success: function (data) {
            if(data.success){
                pop_tip_open("bule", data.message);
                window.parent.closePa();
            }else{
                pop_tip_open("red", data.message);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "培训消息推送失败");
        }
    })
}

/**
 * 清空组织机构上级
 */
function empty() {
    $("#durAddForm").find("input[id='orgId']").val("");
    $("#durAddForm").find("input[id='belongOrgName']").val("");
}

/**
 * 多选机构的回调
 */
function orgCallback(data) {
    // var orgIds = $("#orgIds").val();
    // var orgNames = $("#orgNames").val();
    var orgIds = "";
    var orgNames = "";
    if (data.length === 0) {//没有选择任何机构
        return;
    }
    for (var i = 0; i < data.length; i++) {
        orgIds += data[i].id + ",";
        orgNames += data[i].prefixName + ",";
    }
    orgIds = orgIds.substring(0, orgIds.length - 1);
    orgNames = orgNames.substring(0, orgNames.length - 1);
    var orgIds_check = "";
    if (type === 'add') {
        orgIds_check = orgIds;
    } else if (type === 'update') {
        if (orgIds !== undefined && orgIds !== null && orgIds !== "") {
            var orgIds_arr = orgIds.split(",");
            if (beforeOrgIds !== undefined && beforeOrgIds !== null && beforeOrgIds !== "") {

                for (var i = 0; i < orgIds_arr.length; i++) {
                    var orgId_ = orgIds_arr[i];
                    if (!contains(beforeOrgIds.split(","), orgId_)) {
                        orgIds_check += orgId_ + ",";
                    }
                }
                orgIds_check = orgIds_check.substring(0, orgIds_check.length - 1);
            } else {
                orgIds_check = orgIds;
            }
        }
    }

    $('#orgIds').val(orgIds);
    $('#orgNames').val(orgNames);
}

/*
    选人回调方法，获取人员ids 更新操作  add by tangsq 20170719
    */
function personCallback(data) {
    console.log(data);
    // var userIds = $("#userIds").val();
    // var userNames = $("#userNames").val();
    var userIds = "";
    var userNames = "";
    var userIds_check = "";
    if (data.length === 0) {//没有选择任何人员
        return;
    }
    for (var i = 0; i < data.length; i++) {
        var user_id;
        var data_id = data[i].id.split("/");
        if (data_id !== undefined && data_id != null) {
            user_id = data_id[data_id.length - 1];
        }
        userIds += user_id + ",";
        userNames += data[i].prefixName + "/" + data[i].name + ",";
        if (type === 'add') {
            userIds_check += user_id + ",";
        } else if (type === 'update') {
            if (beforeUserIds !== undefined && beforeUserIds !== null && beforeUserIds !== "") {
                if (!contains(beforeUserIds.split(","), user_id)) {
                    userIds_check += user_id + ",";
                }
            } else {
                userIds_check += user_id + ",";
            }
        }

    }
    userIds = userIds.substring(0, userIds.length - 1);

        $('#userIds').val(userIds);
        $('#userNames').val(userNames);
}


function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}


// })(jQuery, window, document)