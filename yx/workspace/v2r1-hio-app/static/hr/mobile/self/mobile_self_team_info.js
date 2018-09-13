/**
 * 移动端自助我的课程js
 * yyq、lixd
 */
(function ($, window, document, undefined) {
    var val = "";
    var flag = 1;
    $.weui = {};
    $.weui.alert = function (options) {
        options = $.extend({title: '警告', text: '警告内容'}, options);
        var $alert = $('.weui_dialog_alert');
        $alert.find('.weui_dialog_title').text(options.title);
        $alert.find('.weui_dialog_bd').text(options.text);
        $alert.on('touchend click', '.weui_btn_dialog', function () {
            $alert.hide();
        });
        $alert.show();
    };
    //上来就执行
    $(function () {
        initPersonId();
        //加载左侧类别树
      //  initSubjectType();
        initSubjectList();
    });
    /**
     *  获取当前登录用户的ID
     */
    function initPersonId() {
        var personInfoDto = $.hrUtils.getLoginUser();
        if (personInfoDto != null && personInfoDto != undefined) {
            var personId = personInfoDto.userId;
            $("#personId").val(personId);
        } else {
            var options = {title: '提示', text: '未获取到当前登录信息!'};
            $.weui.alert(options);
        }
    }



    /**
     * 初始化课程列表
     */
    function initSubjectList() {

        var condition = {};
        var urlBody = "self/hrSelfTeanInfo/pageList";
        var urlAll = hostUrl + urlBody;
        var personName = $("#name").val();
        condition.name = personName;
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(condition),
            success: function (data) {
                if (data.success == true) {
                    $("#subjectDiv").html("");
                    var html = "";
                    var list = data.result.list;
                    for (var i = 0; i < list.length; i++) {
                    var orgName;
                    if(list[i].orgName == null){
                        orgName = '';
                    } else {
                        orgName = list[i].orgName;
                    }
                    var postName;
                    if(list[i].postName == null){
                        postName = '&nbsp;&nbsp;&nbsp;';
                    } else {
                        postName = list[i].postName
                    }
                    var str=orgName+"/"+postName;
                        //排序展示 点击打开人员的详细信息页面
                   html +=  '<div class="subject_item" onclick="goSelf(\''+ list[i].id +'\')" >';
                    if(list[i].photo == null || list[i].photo == ''){
                        html +=  '<div style="float:left"><div class="user_pic"> <img src="/static/common/img/defaultPic.png"/ height="100%" width="100%"> </div>';
                    } else {
                        html +=  '<div style="float:left"><div class="user_pic"> <img src="data:image/jpeg;base64,'+list[i].photo  +'" height="100%" width="100%"/> </div>';
                     }
                        // html +=  '      </div><div style="float:left;width: 80px;margin-left: 16px;">'+ list[i].name +'</div>  <div style="float:left;width: 80px;">'+ postName +'</div><div style="float:left;max-width:200px;margin-left: 16px;">'+ orgName
                        html +=  '      </div><div class="user_name">'+ list[i].name +'</div>  <div class="user_job">'+ str +'</div>'
                       +'</div>'+
                            '</div>';
                    }
                    $("#subjectDiv").html(html);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                var options = {title: '提示', text: '服务异常,请联系管理员！'};
                $.weui.alert(options);
            }
        });
    }
    //处理穿透跳转页面token 切库问题
    var tendId = $.xljUtils.getUrlParam("tendId");
    var accessToken = $.xljUtils.getUrlParam("accessToken");
    window.goSelf = function(id){
        location.href="mobile_self_perInfo.html?personId="+id+"&tendId="+tendId+"&accessToken="+accessToken;
    };

    window.goToView = function(param){
        window.location.href="mobile_self_myCourse_view.html?"+param+"&tendId="+tendId+"&accessToken="+accessToken;
    };

    window.getVal = function(input){
       initSubjectList();
    }
})(jQuery, window, document);