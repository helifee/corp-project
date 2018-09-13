/**
 * Created by admin on 2017/6/23.
 */
$(function () {

    //computeIframe();

    //编辑的新闻ID
    var contentRowTypeId = $.xljUtils.getUrlParam('id');
    var urlParams = $.xljUtils.getUrlParams();

    if(urlParams.hideHeader&&urlParams.hideHeader=='true'){
        $('header').hide();
        $('.mui-content').css({'padding-top':'0px'});
    }

    $('.xj-form-title span').text('查看');

    var urlParams = $.xljUtils.getUrlParams();
    $('#pageTitle').text('新闻公告');
    $('.mui-title').text('新闻公告');


    //计算点击量
    //addHitNum();
    //$('.content-div-h').height($(window).height() - 80 - 93 + 48);
    /**
     * 查询附件URL列表
     */
    $.xljUtils.queryAttachmentUrlList("CONTENT", contentRowTypeId+"_doc", "0", function (okFlag, data) {
        if (okFlag) {
            if (data.result != null && data.result.length > 0) {
                var webOfficeUrl = data.result[0].url + "/" + data.result[0].path;
                var obj={};
                obj.FILENAME = webOfficeUrl.substring(webOfficeUrl.lastIndexOf('/')+1);
                obj.GROUP = data.result[0].path;
                obj.NAME = data.result[0].name;
                obj.ISMINVERSION = IEVersion();
                mui.ajax(baseUrl + "iwebOffice/getHtmlPath" + "?time=" + Math.random(),{
                    data:JSON.stringify(obj),
                    dataType:'json',//服务器返回json格式数据
                    type:'POST',//HTTP请求类型
                    async:false,
                    timeout:10000,//超时时间设置为10秒；
                    headers:{'Content-Type':'application/json'},
                    success:function(data){
                        //服务器返回响应，根据响应结果，分析是否登录成功；
                        if(data&&data.success) {
                            $('#newsContent').load("../../"+data.msg,function () {
                                var imgs = $('#newsContent').find('img');
                                $.each(imgs,function (i,img) {
                                    var oldSrc = $(img).attr('src');
                                    $(img).attr('src',baseUrl + 'officeFiles/'+oldSrc);
                                });

                                $('#newsContent').find('p[style*="margin-right"]').css({margin:'auto'});
                                $('#newsContent').find('p').each(function (i,item) {
                                   var styleStr = $(item).attr('style');
                                    $(item).css({'word-break':'break-all'});
                                    if(styleStr&&styleStr.indexOf('line-height:')==-1){
                                        $(item).css({'line-height':'30pt'});
                                    }
                                });

                                var trs = $('#newsContent').find('table').find('tr');
                                trs.each(function (i,item) {
                                   var tds = $(item).find('td');
                                    $.each(tds,function (i,tdObj) {
                                        $(tdObj).removeAttr('width').css({'width':100/tds.length+'%'});
                                    })
                                });
                                $('#newsContent').find('table').css({'margin':'0 0 0 0'}).width($('#newsContent').width());
                                //$('#newsContent').find('table').find('td').removeAttr('width').css({'width':'100%'});
                                //$('#newsContent').find('table').width($('#newsContent').width());


                            });
                        }else{
                            mui.toast('新闻内容获取失败！',{ duration:'long', type:'div' });
                        }
                    },
                    error:function(xhr,type,errorThrown){
                        //异常处理；
                        console.log(type);
                    }
                });
            }
        }
    },false);

    //附件显示
    $.xljUtils.queryAttachmentUrlList("1", contentRowTypeId, "1", function (okFlag, data) {
        if (okFlag) {
            if (data.result != null && data.result.length > 0) {
                var ulObj = $('<ul></ul>');
                ulObj.css({'padding-left':'0px'});
                for (var i = 0; i < data.result.length; i++) {
                    var obj = data.result[i];
                    var name = obj.fullName;
                    var url ;
                    if(obj.type=='file'){
                        url = obj.url+'/'+obj.path;
                    }else{
                        url = obj.url;
                    }
                    var liObj = $('<li ></li>');
                    liObj.css({
                        'display': 'table',
                        'width': '100%',
                        'background': 'aliceblue'
                    });
                    var aObj = $('<a></a>');
                    aObj.css({'font-size':'12px'});
                    aObj.attr('href',url+'?attname='+name);
                    aObj.text(name);
                    liObj.append(aObj);
                    ulObj.append(liObj);
                }
                $('#attachFiles').append(ulObj);
            }
        }
    },false);

    /**
     * 如果是待阅页面，第一次打开待阅，待阅变为已阅
     */
    function chnageStatusOfMsg(){
        var paramData = {businessId: urlParams.id, 'newStatus': 'YY', 'oldStatus': 'DY'};
        var fullUrl = hostUrl+"flow/sysNoticeMsg/updateStatusOfNoticeMsgByCurrentUser";
        $.ajax({ //发送更新的ajax请求
            type: "post",
            url: fullUrl,
            dataType: "json",
            async: false,
            data: JSON.stringify( paramData ),
            contentType: 'application/json;charset=utf-8', //设置请求头信息
            success: function (data) {
                //console.info("调用待阅变已阅的接口 已成功!");
            },
            error: function (data) {
                if (data.msg) {
                    $.xljUtils.tip('red', data.msg);
                } else {
                    $.xljUtils.tip('red', "调用待阅变已阅的接口  失败！");
                }
            }
        });
    }
    chnageStatusOfMsg();

    //判断是否是IE浏览器
    function IEVersion(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        if(isIE){
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion < 11)
            { return true;}
            else
            { return false}//IE版本过低
        }else{
            return false;//非IE
        }
    }
});