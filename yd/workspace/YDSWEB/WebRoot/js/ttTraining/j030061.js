/*
 * @(#)userRoleMgr.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 章节编辑JavaScript.
 *
 * @author fangjiayuan
 * @version 1.0
 */
/**
 * RADIO ID.
 */
var g_idcount;

/**
 * 章节标题.
 */
var g_text;

/**
 * 显示层级.
 */
var g_level;

/**
 * 是否保存标志.
 */
var g_saveFlag;

/**
 * 页面初始化
 */
function initForm(){
    // 显示加载动画
    showLoader();
    // 每十分钟更新一次排他锁
    window.setInterval(updateLock, 600000);
    
    g_saveFlag = '0';
    
    var i = 0;
    while ($('cinfo' + i) != null) {
    
        // 章节标题内容
        g_text = $F('cinfo' + i);
        
        // 显示层级
        g_level = $('clevel' + i).innerHTML - 1;
        
        // 章节标题内容编辑
        g_text = '　　'.times(g_level) + g_text;
        $('cinfo' + i).value = g_text;
        
        // 隐藏域显示层级设定
        $('showLevel' + i).value = $('clevel' + i).innerHTML;
        
        i++;
    }
    
    // 默认选择第一行
    if ($('radio0') != null) {
        $('radio0').checked = true;
    }
    g_idcount = $('chaptersize').value - 1;
    // 隐藏加载动画
    hideLoader();
}

/**
 * 添加按钮
 */
function addline(){

    var chapteradd;// 添加行章节标题
    var i;// 章节列表长度
    // 添加行章节标题内容编辑
    i = parseInt($('chaptersize').value, 10);
    chapteradd = '章节标题内容';
    i++;
    
    // 章节列表长度设定
    $('chaptersize').value = i;
    
    // 添加行
    var newline = $('cloneline').clone(true);
    
    // TABLE底部插入添加行
    $('chaptertb').down(0).insert({
        bottom: newline
    });
    
    newline.removeClassName('none');
    
    g_idcount++;
    
    // 添加行RADIO ID
    newline.select('INPUT')[0].id = 'radio' + g_idcount;
    if (i == 1) {
        $('radio' + g_idcount).checked = true;
    }
    
    // 添加行章节标题内容  ID 
    newline.select('INPUT')[1].id = 'cinfo' + g_idcount;
    
    // 添加行章节标题内容  VALUE
    newline.select('INPUT')[1].value = chapteradd;
    
    // 添加行章节标题内容  NAME
    newline.select('INPUT')[1].name = 'chapterInfos[' + g_idcount + '].chapterTitle';
    
    // 添加行显示层级  ID
    newline.select('label')[0].id = 'clevel' + g_idcount;
    
    // 添加行层级减一按钮绑定事件  
    newline.select('INPUT')[2].observe('click', mullevel.curry(g_idcount));
    
    // 添加行层级加一按钮绑定事件
    newline.select('INPUT')[4].observe('click', addlevel.curry(g_idcount));
    
    // 隐藏域显示层级 ID
    newline.select('INPUT')[3].id = 'showLevel' + g_idcount;
    
    // 隐藏域显示层级 NAME
    newline.select('INPUT')[3].name = 'chapterInfos[' + g_idcount + '].showLevel';
    
    // 隐藏域显示层级 VALUE
    newline.select('INPUT')[3].value = newline.select('label')[0].innerHTML;
    
    // 教材ID ID
    newline.select('INPUT')[5].id = 'bookId' + g_idcount;
    
    // 教材ID NAME
    newline.select('INPUT')[5].name = 'chapterInfos[' + g_idcount + '].bookId';
    
    // 教材ID VALUE
    newline.select('INPUT')[5].value = $('bookId').value;
    
    // 编辑号 ID
    newline.select('INPUT')[6].id = 'editNo' + g_idcount;
    
    // 编辑号 NAME
    newline.select('INPUT')[6].name = 'chapterInfos[' + g_idcount + '].editNo';
    
    // 编辑号 VALUE
    newline.select('INPUT')[6].value = $('editNo').value;
    
    // 章节编号 ID
    newline.select('INPUT')[7].id = 'chapterNo' + g_idcount;
    
    // 章节编号 NAME
    newline.select('INPUT')[7].name = 'chapterInfos[' + g_idcount + '].chapterNo';
    
    // 章节编号 VALUE
    newline.select('INPUT')[7].value = '';
    
    // 隐藏域显示顺序 ID
    newline.select('INPUT')[8].id = 'showOrder' + g_idcount;
    
    // 隐藏域显示顺序 NAME
    newline.select('INPUT')[8].name = 'chapterInfos[' + g_idcount + '].showOrder';
    
    // 隐藏域显示顺序 VALUE
    newline.select('INPUT')[8].value = g_idcount + 1;
    
    // 隐藏域删除 FLG ID
    newline.select('INPUT')[9].id = 'hideFlg' + g_idcount;
    
    // 隐藏域删除 FLG NAME
    newline.select('INPUT')[9].name = 'chapterInfos[' + g_idcount + '].hideFlg';
    
    //添加行移动至选中行下方
    addLineMove();
    
    g_saveFlag = '1'
}

/**
 * 删除按钮.
 */
function deleteline(){

    var lineNo = 0;
    var hideNo = 0;
    var trs = parseInt($('chaptersize').value, 10);//画面章节数
    //画面章节数为0的时候
    if (trs <= 0) {
        return;
    }
    if (confirm(getMessage('js.tt.warn.JYW07'))) {
        while (lineNo <= g_idcount) {
        
            // 判断RADIO选中是否
            if ($('radio' + lineNo).checked) {
                // 指定行设定
                var nowLine = $('radio' + lineNo).up('tr', 0);
                $('radio' + lineNo).checked = false;
                
                // 隐藏域删除 FLG设定
                $('hideFlg' + lineNo).value = 0;
                // 列表长度设定	
                $('chaptersize').value = trs - 1;
                
                // 指定行删除				
                //nowLine.hide();
                nowLine.style.display = 'none';
                break;
            }
            lineNo++;
        }
        
        // 默认选择第一行
        while (hideNo <= g_idcount) {
        
            // 判断是否隐藏
            if ($F('hideFlg' + hideNo) == 1) {
            
                if ($('radio' + hideNo) != null) {
                    $('radio' + hideNo).checked = true;
                }
                
                break;
            }
            hideNo++;
        }
    }
    g_saveFlag = '1'
}

/**
 * 添加后调整顺序.
 */
function addLineMove(){

    var addRowNo = g_idcount;
    var checkedRowNo = 0;
    var newCheckRowNo = 0;
    while (checkedRowNo <= g_idcount) {
        // 判断RADIO选中是否
        if ($('radio' + checkedRowNo).checked) {
            break;
        }
        checkedRowNo++;
    }
    while (addRowNo > checkedRowNo) {
        // 指定行设定
        var nowLine = $('radio' + addRowNo).up(1);
        
        //取得交换行行号（非隐藏行）
        hideNo = addRowNo - 1;
        while (hideNo >= 0) {
            if ($F('hideFlg' + hideNo) == 1) {
            
                break;
            }
            hideNo--;
        }
        
        //交换到选中行的下一行为止
        if (hideNo == checkedRowNo) {
            break;
        }
        
        // 指定行的上一行(交换行)				
        var bLine = $('radio' + hideNo).up(1);
        
        if (bLine != null && bLine.previous(0) != undefined) {
        
            // 章节标题内容  VALUE
            var chapter = bLine.select('INPUT')[1].value;
            bLine.select('INPUT')[1].value = nowLine.select('INPUT')[1].value;
            nowLine.select('INPUT')[1].value = chapter;
            
            // 显示层级 
            var clevel = bLine.select('label')[0].innerHTML;
            bLine.select('label')[0].innerHTML = nowLine.select('label')[0].innerHTML;
            nowLine.select('label')[0].innerHTML = clevel;
            
            // 章节编号 VALUE
            var chapterNo = bLine.select('INPUT')[7].value;
            bLine.select('INPUT')[7].value = nowLine.select('INPUT')[7].value;
            nowLine.select('INPUT')[7].value = chapterNo;
            
            // 隐藏域显示层级 VALUE
            var showLevel = bLine.select('INPUT')[3].value;
            bLine.select('INPUT')[3].value = nowLine.select('INPUT')[3].value;
            nowLine.select('INPUT')[3].value = showLevel;
            
            // 隐藏域删除 FLG NAME
            var flg = bLine.select('INPUT')[9].value;
            bLine.select('INPUT')[9].value = nowLine.select('INPUT')[9].value;
            nowLine.select('INPUT')[9].value = flg;
            
            addRowNo = hideNo;
        }
        newCheckRowNo = checkedRowNo + 1;
        $('radio' + checkedRowNo).checked = false;
        $('radio' + newCheckRowNo).checked = true;
    }
    if (addRowNo == checkedRowNo + 1) {
        $('radio' + addRowNo).checked = true;
    }
}

/**
 * 上移按钮.
 */
function upline(){

    var i = 0;
    var hideNo = 0;
    
    while (i <= g_idcount) {
    
        // 判断RADIO选中是否
        if ($('radio' + i).checked) {
            break;
        }
        i++;
    }
    
    hideNo = i - 1;
    while (hideNo >= 0) {
        if ($F('hideFlg' + hideNo) == 1) {
            break;
        }
        hideNo--;
    }
    
    //选中行上方有可用的交换行的情况(hideno>=0)
    if (hideNo != -1) {
    
        // 指定行设定
        var nowLine = $('radio' + i).up(1);
        // 指定行的上一行
        var bLine = $('radio' + hideNo).up(1);
        
        if (bLine != null && bLine.previous(0) != undefined) {
        
            // 章节标题内容  VALUE
            var chapter = bLine.select('INPUT')[1].value;
            bLine.select('INPUT')[1].value = nowLine.select('INPUT')[1].value;
            nowLine.select('INPUT')[1].value = chapter;
            
            // 显示层级 
            var clevel = bLine.select('label')[0].innerHTML;
            bLine.select('label')[0].innerHTML = nowLine.select('label')[0].innerHTML;
            nowLine.select('label')[0].innerHTML = clevel;
            
            // 章节编号 VALUE
            var chapterNo = bLine.select('INPUT')[7].value;
            bLine.select('INPUT')[7].value = nowLine.select('INPUT')[7].value;
            nowLine.select('INPUT')[7].value = chapterNo;
            
            // 隐藏域显示层级 VALUE
            var showLevel = bLine.select('INPUT')[3].value;
            bLine.select('INPUT')[3].value = nowLine.select('INPUT')[3].value;
            nowLine.select('INPUT')[3].value = showLevel;
            
            // 隐藏域删除 FLG NAME
            var flg = bLine.select('INPUT')[9].value;
            bLine.select('INPUT')[9].value = nowLine.select('INPUT')[9].value;
            nowLine.select('INPUT')[9].value = flg;
            
            $('radio' + hideNo).checked = true;
        }
    }
    g_saveFlag = '1'
}

/**
 * 下移按钮.
 */
function downline(){

    var iRow = 0;
    var hideNo = 0;
    
    while (iRow <= g_idcount) {
    
        // 判断RADIO选中是否
        if ($('radio' + iRow).checked && iRow < g_idcount) {
            break;
        }
        iRow++;
    }
    
    hideNo = iRow + 1;
    while (hideNo <= g_idcount) {
        if ($F('hideFlg' + hideNo) == 1) {
            break;
        }
        hideNo++;
    }
    
    if (hideNo <= g_idcount) {
        // 指定行设定
        var nowLine = $('radio' + iRow).up(1);
        // 指定行的下一显示行				
        var bLine = $('radio' + hideNo).up(1);
        
        if (bLine != null && bLine != undefined) {
            // 章节标题内容  VALUE
            var chapter = bLine.select('INPUT')[1].value;
            bLine.select('INPUT')[1].value = nowLine.select('INPUT')[1].value;
            nowLine.select('INPUT')[1].value = chapter;
            
            // 显示层级 
            var clevel = bLine.select('label')[0].innerHTML;
            bLine.select('label')[0].innerHTML = nowLine.select('label')[0].innerHTML;
            nowLine.select('label')[0].innerHTML = clevel;
            
            // 章节编号 VALUE
            var chapterNo = bLine.select('INPUT')[7].value;
            bLine.select('INPUT')[7].value = nowLine.select('INPUT')[7].value;
            nowLine.select('INPUT')[7].value = chapterNo;
            
            // 隐藏域显示层级 VALUE
            var showLevel = bLine.select('INPUT')[3].value;
            bLine.select('INPUT')[3].value = nowLine.select('INPUT')[3].value;
            nowLine.select('INPUT')[3].value = showLevel;
            
            // 隐藏域删除 FLG NAME
            var flg = bLine.select('INPUT')[9].value;
            bLine.select('INPUT')[9].value = nowLine.select('INPUT')[9].value;
            nowLine.select('INPUT')[9].value = flg;
            
            $('radio' + hideNo).checked = true;
        }
    }
    g_saveFlag = '1'
}

/**
 * 层级减一按钮.
 * @param {int} i 章节记录.
 */
function mullevel(i){

    // 章节内容去除全角空格
    g_text = $F('cinfo' + i).replace(/(^　*)|(　*$)/g, "");
    
    // 显示层级
    g_level = $('clevel' + i).innerHTML;
    
    // 显示层级  〉1时
    if (g_level > 1) {
    
        // 章节内容设定	
        g_text = '　　'.times(g_level - 2) + g_text;
        $('cinfo' + i).value = g_text;
        
        // 显示层级设定
        $('clevel' + i).innerHTML = g_level - 1
        
        // 隐藏显示层级设定
        $('showLevel' + i).value = g_level - 1;
        
    }
    g_saveFlag = '1'
}

/**
 * 层级加一按钮.
 * @param {int} i 章节记录.
 */
function addlevel(i){

    // 章节内容去除全角空格
    g_text = $F('cinfo' + i).replace(/(^　*)|(　*$)/g, "");
    
    // 显示层级
    g_level = parseInt($('clevel' + i).innerHTML, 10);
    if (g_level < 5) {
    
        // 章节内容设定	
        g_text = '　　'.times(g_level) + g_text;
        $('cinfo' + i).value = g_text;
        
        // 显示层级设定
        $('clevel' + i).innerHTML = g_level + 1;
        
        // 隐藏显示层级设定
        $('showLevel' + i).value = g_level + 1;
    }
    g_saveFlag = '1'
}

/**
 * 保存按钮事件.
 */
function savechapter(){
    if (g_idcount >= 0) {
        var url = 'j030061SubmitChapterInfos.action';
        $('chapter').action = url;
        // 显示加载动画
        showLoader();
        $('chapter').submit();
    }
}

/**
 * 退出编辑.
 */
function quitEdit(){

    if ('1' == g_saveFlag) {
        if (!confirm(getMessage('js.tt.warn.JYW02'))) {
            return;
        }
    }
    
    
    var url = 'j030061QuitEditChapter.action';
    var params = 'bookId=' + $F('bookId');
    params = addStamp(params);
    var request = new Ajax.Request(url, {
        method: 'post',
        parameters: params,
        asynchronous: false
    });
    if (window.opener != null && 
		!window.opener.closed &&
		window.opener.refreshList != undefined){
		window.opener.refreshList();
	}
    window.open('', '_self', '');
    window.close();
    
}

/**
 * 更新排他锁.
 */
function updateLock(){
    var url = 'j030061UpdateChapterLock.action';
    var params = 'bookId=' + $F('bookId');
    params = addStamp(params);
    new Ajax.Request(url, {
        method: 'get',
        parameters: params,
        onComplete: function(response){
            var flg = checkException(response);
        }
    });
}
