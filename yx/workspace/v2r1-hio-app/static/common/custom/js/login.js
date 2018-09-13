//是否支持本地存储
function isSecretBrowse(){
    var _localStorage = window.localStorage;
    if(!_localStorage){
        return false;
    }
    var testKey = 'test';
    try{
        _localStorage.setItem(testKey, '1');
        _localStorage.removeItem(testKey);
        return false;
    }catch (error){
        return true;
    }
}
var isLocal = isSecretBrowse();
$(function() {
    var $cbSavePwd = $('#save_pwd'), $pwd = $('#password');
    var $nameList = $("#nameList"),$pawList = $("#pawList");
    var $username = $("#username");

    //读图片文件
    function viewFile(file) {
        var reader = new FileReader();
        reader.onload = function(evt) {
            $('.fullPic').css('background','url(' + evt.target.result + ')');
        }
        reader.readAsDataURL(file);
    }
    function initPage() {
        // check the state of checkbox
        // if the stored value is null, set the value is checked, save the pwd
        if (null == sessionStorage.getItem('save_pwd')) {
            sessionStorage.setItem('save_pwd', 'true');
        }

        render();
    }
    function getUserData (){
        if(!isLocal){
            var user = localStorage.getItem("user");
            render(user);
        }
    }

    // $cbSavePwd.click(function(){
    //     if (sessionStorage.getItem('save_pwd') == 'false') {
    //         sessionStorage.setItem('save_pwd', 'true');
    //     } else {
    //         sessionStorage.setItem('save_pwd', 'false');
    //     }
    //     render();
    // });
    // $cbSavePwd.click(function(){
    //     if(!isLocal){
    //         //选中状态
    //         if($(this).is(":checked")){
    //             //保存密码
    //             var user = $username.val(), paw = $pwd.val();
    //             if( user && paw ){
    //                 setUserData(user,paw);
    //             }
    //         }
    //     }else{
    //         $pwd.attr('type', 'password');
    //     }
    //
    // });
    $username.click(function(e){
        e.stopPropagation();
        $nameList.show();
    })
    function renderCbSavingPwd() {
        // render the state of checkbox that remember users pwd
        var bSavePwd = sessionStorage.getItem('save_pwd') == 'false' ? false : true;
        $cbSavePwd.prop('checked', bSavePwd);
        if (!bSavePwd) {
            // don't save user pwd
            // toggle the state of the pwd input type, remove the remembered user pwd
            $pwd.attr('type', 'text'); 
            $pwd.val('');
        } else {
            $pwd.attr('type', 'password'); 

        }
    }
    function eventMenu (){
        $nameList.find("li").on("click",function(e){
            e.preventDefault();
            e.stopPropagation();
            var me = $(this),
                data = me.data();
            $pwd.val(data.val);
            $username.val(data.name);
            // $cbSavePwd.attr("checked",true);
            $cbSavePwd.prop('checked', true)
            $nameList.hide();
        })
        $nameList.hover(function(e){
            var me = $(e.target),
                data = me.data();
            $pwd.val(data.val);
            $username.val(data.name);
        },function(){
            $nameList.hide();
        })
        $username.keyup(function(e){
            if(e.which != "13"){
                $cbSavePwd.removeProp("checked");
            }

        })
        var clickFn = function(){
            $nameList.hide();
        }
        var keyPressFn = function(e){
            if(e.which == "9"){
                $nameList.hide();
            }
        }
        $(document).off("click").on("click", clickFn);
        $(document).off("keydown").on("keydown",keyPressFn)
    }
    function render(data) {
        // renderCbSavingPwd();
        if(data){
            data = JSON.parse(data);
            $nameList.empty();
            for(key in data){
                if(key){
                    var tplName = $("<li>" + key + "</li>"),
                        tplPaw = $("<li data-p='" + key +"'>" + data[key] + "</li>");
                    tplName.data({val:data[key],name:key});
                    $nameList.append(tplName);
                    // $pawList.append(tplPaw);
                }
            }
            eventMenu();
        }

    }
    $('#viewFiles').change(function() {
        viewFile(this.files[0]);
    });

    getUserData();
    // initPage();
});
function setUserData(key,data){
    if(!isLocal){
        var user = localStorage.getItem("user");
        user = user ? JSON.parse(user) : {};
        user[key] = data;
        user = JSON.stringify(user);
        localStorage.setItem("user",user);
    }
}
function delUserData (key,data){
    if(!isLocal){
        var user = localStorage.getItem("user");
        user = user ? JSON.parse(user) : {};
        delete user[key];
        user = JSON.stringify(user);
        localStorage.setItem("user",user);
    }
}