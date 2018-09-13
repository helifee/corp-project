/*
 * @(#)searchGadget.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
 */
/**
 * @fileoverview 社员信息检索JavaScript.
 *
 * @author 远东)xupai
 * @version 1.0 2010/09/25
 */
/**
 * 画面初期化.
 */
function init(){
    setHeight(140);
    new JsNameFilter("userId", "userNm", "../");
}

//查询按钮事件.
function searchMumInfo(){

    var url = 'getphone.action';
    var pars = 'userId=' + $('userId').value;
    new Ajax.Request(url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
            hideLoader();
            if (checkException(response)) {
                return;
            }
            var name = $('userNm').value;
            var phone = response.responseText;
            $('div_gd_tel').update(name + '的电话：' + phone);
            
        }
    });
}

// 坐席系统查询
function searchSeatInfo(){
    var url = 'getseat.action?userId=' + $('userId').value;
    
    //Request方式
    var request = new Ajax.Request(url, {
        method: 'get',
        parameter: '',
        onComplete: function(response){
        
            if (!checkException(response)) {
                var tempurl = 'http://www2.yds.yd/seat/sekiSearch.jsp?LFLG=4&LOCATION_ID=';
                var strWindowFormat = "status:no;help:no;scroll:yes;resizable:yes;minimize:yes;maximize:yes;dialogTop:0px;dialogLeft:0px;dialogWidth:" + (screen.width - 10) + "px;dialogHeight:" + (screen.height - 70) + "px";
                tempurl = tempurl + response.responseText
                window.showModalDialog(tempurl, '', strWindowFormat);
                
            }
        }
    });
    
}


/**
 * 画面大小调整.
 */
function resize(size){
    if (size == 2) {
        $('content').removeClassName('w_300').addClassName('w_600');
        $$('a').each(function(item){
            item.update(StrLeft(item.innerHTML, 94));
        });
    }
    else 
        if (size == 1) {
            $('content').removeClassName('w_600').addClassName('w_300');
            $$('a').each(function(item){
                item.update(StrLeft(item.innerHTML, 45));
            });
        }
}
