/*
 * @(#)RSSGadget.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
 */
/**
 * @fileoverview RSS新闻.
 *
 * @author 远东)zhaodong
 * @version 1.0 2010/09/7
 */
var last;
/**
 * 画面初期化.
 */
function init(){
    var tabs = $('newsTabs').childElements();
    
    for (var i = 0; i < tabs.length; i++) {
        Event.observe(tabs[i], 'mouseover', changeTab);
    }
    setHeight(240);
    $$('a').each(function(item){
    
        item.writeAttribute({
            'title': item.readAttribute('title').unescapeHTML().stripTags().stripScripts().replace(/<br\/>/ig, "")
        });
        item.writeAttribute({
            'title': StrLeft(item.readAttribute('title'), 300)
        });
        
    });
    fireEvent($('tab_csdnrss'), 'mouseover');
    
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

function changeTab(event){
    var element = Event.element(event);
    element.addClassName('active').removeClassName('normal');
    $(element.id.substr(4)).removeClassName('none');
    if (last && element.id != last) {
        $(last).addClassName('normal').removeClassName('active');
        $(last.substr(4)).addClassName('none');
    }
    last = element.id;
}
