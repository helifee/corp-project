/**
 * Created by admin on 2017/6/12.
 */
$(function () {
    function initShortcutMenuList() {
        $.ajax({
            type: 'POST',
            url: hostUrl + 'oa/shortcutMenu/queryList?_t='+new Date().getTime(),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({'sidx':'createDate'}),
            success: function (xhr) {
                if (xhr&&xhr.success){
                    var result = xhr.result;
                    if(result){
                        $('#shortcutMenuListDiv ul').html('');
                        for (var i = 0; i < result.length; i++) {
                            var obj = result[i];
                            var liObj = $('<li style="width:53px"></li>');
                            liObj.attr('title',obj.name);
                            var aObj = $('<a></a>');
                            if(obj.innerLink){
                                var reg = /^\/platform-app\//;
                                //var reg1 = /^\//;
                                if(!reg.test(obj.linkAddr)){
                                    obj.linkAddr = hostUrl + obj.linkAddr;
                                }
                                aObj.attr('href',obj.linkAddr);
                            }
                            else{
                                var url = obj.linkAddr;
                                var userInfo = getUserInfo();
                                url = url.replace('#[userName]',userInfo.userLoginName);
                                url = url.replace('#[sessionId]',userInfo.sessionId);
                                aObj.attr('href',url);
                            }
                            aObj.attr('target','_blank');
                            liObj.append(aObj);
                            /*var iconSpan = $('<span class="glyphicon glyphicon-th-large"></span>');
                            aObj.append(iconSpan);*/
                            var iconSpan = $("<img src='data:image/jpeg;base64," + obj.iconShow + "' style='width:50px;height:50px;'>");
                            aObj.append(iconSpan);

                            var titleSpan = $('<span class="glyphicon-class"></span>');
                            titleSpan.text(obj.name);
                            aObj.append(titleSpan);

                            var removeSpan = $('<span class="removeShortcutSpan glyphicon glyphicon-remove" ></span>');
                            removeSpan.attr('onclick','removeShortcutMenu("'+obj.id+'")');
                            removeSpan.attr('title','删除');
                            var top = 48+80*Math.floor(i/4);
                            var left = ($('#shortcutMenuListDiv').width()*0.1)/2 + ($('#shortcutMenuListDiv').width()*0.9)/4*(i%4) + 4;
                            removeSpan.css({
                                'font-size': '10px',
                                width:'0px',
                                height:'0px',
                                position: 'absolute',
                                top: top+'px',
                                left: left+'px',
                                'z-index': '999',
                                /*display:'none'*/
                            });
                            liObj.append(removeSpan);

                            $('#shortcutMenuListDiv ul').append(liObj);

                            liObj = undefined;

                        }
                        if(result.length<12){
                            var liObj = $('<li></li>');
                            var plusSpanObj = $('<span ></span>');
                            plusSpanObj.addClass('glyphicon glyphicon-plus');
                            liObj.attr('title','添加');
                            liObj.append(plusSpanObj);
                            liObj.on('click',function () {
                                /*$('#shortcutMenuModal').modal({
                                    backdrop:'static',
                                    show:true
                                })*/
                                window.open(hostUrl+'oa/shortcutMenu/shortcutMenu_edit.html');
                            });

                            $('#shortcutMenuListDiv ul').append(liObj);
                        }

                    }

                }else {
                    $.xljUtils.tip('red','获取快捷菜单列表失败！');
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }

        });
    }
    setTimeout(function () {
        initShortcutMenuList();
    },500);

    function getUserInfo() {
        var result;
        $.ajax({
            url:hostUrl + 'oa/sys/sysNaviMenu/getUserInfo?_t='+new Date().getTime(),
            type:'GET',
            async:false,
            dataType:'JSON',
            success:function (resultData) {
                if(resultData&&resultData.success){
                    result = resultData.result;
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });

        return result;

    }
    window.initShortcutMenuList = initShortcutMenuList;

    window.removeShortcutMenu = function (id) {
        $.ajax({
            url: hostUrl + "oa/shortcutMenu/delete/" + id,
            type: 'DELETE',
            dataType: 'JSON',
            success: function (resultData) {
                if (resultData && resultData.success) {
                    initShortcutMenuList();
                    $.xljUtils.tip('green', "数据删除成功！");
                } else {
                    $.xljUtils.tip('red', "删除数据失败！");
                }
            }
        });
    };
});

