/**
 * 邮件系统跳转
 * Created by lgb on 2018/6/27.
 */
(function (window, document, $, undefined) {
    // 生产环境跳转地址
    var mailHost = 'http://192.168.3.103/jzy_mail/api';
    var runHost = 'http://hiov2.xyre.com:9999/platform-app';

    if (window && window.parent && window.parent.JZY) {
        if (window.parent.JZY.DEBUG_MODE) {
            // mailHost = 'http://192.168.3.103/jzy_mail/api';
            mailHost = 'http://10.17.4.11/jzy_mail_dev/api';
            runHost = 'http://192.168.3.52:9999/platform-app';
        }
    }
    var mboxList = [];

    window.addEventListener("load", function () {
        var accessToken = getUrlParam("accessToken"); // ...
        if (!accessToken && window.parent) {
            accessToken = window.parent.JZY.c.AUTO_LOGIN.headers.authorization
        }
        var device = getUrlParam("device") || getDeviceType(); //跳转设备类型：pc、mobile
        var tendId = getUrlParam("tendId"); // 租户ID

        if (!accessToken) {
            document.write('没有提供accessToken');
        } else {
            initEmailboxes(accessToken, tendId, device);
        }
    });

    var getUrlParam = function (name) {
        // 获取url参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        if (!window.location.search) return null;
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    };

    var initEmailboxes = function (accessToken, tendId, device) {
        // 通过token获取用户邮件列表
        var url = "/oa/mailboxAccount/getMailboxList";
        $.ajax({
            type: 'post',
            url: runHost + url,
            data: {},
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Authorization': accessToken
            },
            success: function (resp) {
                if (resp.result && resp.result.length > 0) {
                    //setAccounts(resp.result);
                    var m = resp.result[0];
                    setIframeUrl(m);
                    resizeBox();
                    $('#setEmailAccountContainer').remove();
                } else {
                    //alert('请绑定一个主邮箱');
                    $('#setEmailAccountContainer').show();
                }
            },
            error: function (resp) {
                if (resp.status = 401) {
                    setIframeUrl('deny.html');
                }
            }
        });
    };

    var setIframeUrl = (m) => {
        var mUrl;
        if (typeof(m) == 'object') {
            mUrl = mailHost + '/auto-login.php?u=' + m.account + '&p=' + encodeURIComponent(m.password);
            //document.querySelector('#rlMailbox').src = mUrl;

        } else if (typeof(m) == 'string') {
            //document.querySelector('#rlMailbox').src = m;
            mUrl = m;
        }

        if (getDeviceType() == 'mobile') {
            window.location.href=mUrl;
            return;
        }

        document.querySelector('#rlMailbox').src = mUrl;

        resizeBox();
    };

    var resizeBox = () => {
        /*try {
            if (typeof(document.querySelector) == 'function') {
                let ifm = document.querySelector('#rlMailbox');
                let oHeight = Math.max(ifm.contentWindow.document.documentElement.offsetHeight, ifm.contentWindow.document.body.offsetHeight);
                let cHeight = Math.max(ifm.contentWindow.document.documentElement.clientHeight, ifm.contentWindow.document.body.clientHeight);
                let height = Math.max(oHeight, cHeight);
                if (document.documentElement && document.documentElement.clientHeight) {
                    let cliHeight = document.documentElement.clientHeight;
                    height = Math.max(cliHeight, oHeight, cHeight);
                }
                ifm.style.height = height + 'px'
                // document.querySelector('#rlMailbox').style.width = document.body.clientWidth + 'px';
                // document.querySelector('#rlMailbox').style.height = document.body.clientHeight + 'px';
                // document.querySelector('#rlMailbox').style.height = document.body.offsetHeight + 'px';
                // document.querySelector('#rlMailbox').style.height = document.body.scrollHeight + 'px';
            }
        } catch (e) {
            console.info($('#rlMailbox').attr('href'));
        }*/

        $('#rlMailbox').height($(window).height()-3);
    };

    var setAccounts = (accounts) => {
        if (!accounts || accounts.length == 0) return;

        var selAccouts = document.querySelector('#selectEmailbox select');
        accounts.map((mbox) => {
            var opt = document.createElement("option");
            opt.text = mbox.account;
            if (mbox.password != '' && findAccount(mbox.account)) {
                mboxList.push({account: mbox.account, password: mbox.password});
                selAccouts.appendChild(opt);
            }
        });
        selAccouts.addEventListener('change', (event) => {
            var m = findPwd(event.target.value);
            if (getDeviceType() == 'mobile') {
                window.document.href.location = m;
            } else {
                setIframeUrl(m);
            }
        });
    }

    var findPwd = (account) => {
        for (var i = 0; i <= mboxList.length; i++) {
            if (mboxList[i].account == account) {
                return mboxList[i];
            }
        }
    }

    var findAccount = (account) => {
        if (!account) return false;
        const allSupportedEmails = [
            "@hio.com",
            "@126.com",
            "@163.com",
            "@qq.com",
            "@outlook.com",
        ];
        var mailDomain = account.substring(account.indexOf('@'));
        return allSupportedEmails.indexOf(mailDomain) > -1 ? true : false;
    }

    var getDeviceType = () => {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return 'mobile';

        } else if (/(Android)/i.test(navigator.userAgent)) {
            return 'mobile';

        } else {
            return 'pc';
        }
        ;
    };

    console.info(window.parent.window.JZY.c.AUTO_LOGIN.headers.authorization);

    var saveSetMailAccount = function() {
        if(!$('#setEmailAccountForm')[0]){
            return;
        }

        var inputDataArr = $('#setEmailAccountForm').serializeArray();
        var formDataJson = {};
        for (var i = 0; i < inputDataArr.length; i++) {
            var inputName = inputDataArr[i].name;
            var inputValue = inputDataArr[i].value;
            formDataJson[inputName] = inputValue;
        }

        var formError = false;
        if ($.trim(formDataJson.emailType) == '') {
            $('#setEmailAccountForm :input[name="emailType"]').siblings('.form-error').show();
            formError = true;
        }

        if ($.trim(formDataJson.emailAccount) == '') {
            $('#setEmailAccountForm :input[name="emailAccount"]').siblings('.form-error').show();
            formError = true;
        }

        if ($.trim(formDataJson.emailPassword) == '') {
            $('#setEmailAccountForm :input[name="emailPassword"]').siblings('.form-error').show();
            formError = true;
        }


        var postData = {
            'id': '',
            'u': formDataJson.emailAccount + '@' + formDataJson.emailType,
            'p': formDataJson.emailPassword,
            't': window.parent.window.JZY.c.AUTO_LOGIN.headers.authorization
        };
        if (!formError) {
            $.ajax({
                type: 'POST',
                url: mailHost + '/bind-account.php',
                dataType: 'json',
                //contentType: 'application/json',
                //async: false,
                data: postData,
                success: function (data) {
                    if (data && data.success) {
                        //$('#setEmailAccountContainer').hide();
                        window.location.reload();

                    } else {
                        alert('邮箱保存失败，请联系管理员！');
                    }
                },
                error: function (xhr) {
                    alert('服务器出错，请联系管理员！');
                }
            });
        }
    };

    $('#setEmailAccountForm :input').on('blur', function () {
        var v = $(this).val();
        if (v && $.trim(v) != '') {
            $(this).siblings('.form-error').hide();
        } else {
            $(this).siblings('.form-error').show();
        }
    });

    $('body').on('keyup',function(e){
        if(e.keyCode==13){
            saveSetMailAccount();
        }
    });

    $('#bindAccountBtn').on('click', function () {
        saveSetMailAccount();
    });

    $(window).on('resize',function () {
        resizeBox();
    });


})(window, document, jQuery);
