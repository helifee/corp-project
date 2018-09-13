/*
 * @(#)j030011.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 新建教材及权限分配JavaScript.
 *
 * @author wanqiuhong
 * @version 1.0
 */
/**
 * 画面onload.
 */
function initForm(){
    // 显示加载动画
    showLoader();
    // 隔行变色，并且高度为150px
    listColor('editorListTable', 150);
    
    // 审批者ID
    initTtJsNameFilter("approverUserId", "approverUserName");
    
    // 是否需要权限控制（0：不需要，1：需要）
    var authorityNeed = 0;
    
    if ($F('mode') == OpenEnum.mode1 || $F('mode') == OpenEnum.mode3) {
    
        authorityNeed = 1;
    }
    // 分类初期化
    initCategoryList('J030011', authorityNeed, 1, true, 1, 'sltCategory1', 'sltCategory2', 'sltCategory3', '1', '1');
    // 隐藏加载动画
    hideLoader();
    
}

/**
 * 画面模式枚举.
 * 		1：教材一览（J030021）点击【新建教材】模式
 * 		2:课程详细（管理）（J0200311）点击【创建新教材】模式
 * 		3：教材一览（J030021）点击【管理】模式
 * 		4：课程详细（管理）（J0200311）点击【管理】模式
 */
var OpenEnum = {
    mode1: 1,
    mode2: 2,
    mode3: 3,
    mode4: 4
};

/**
 * 提交教材信息.
 */
function submitBookInfo(){

    // 时间校验
    compareTimeForTable('editorListTable');
    
    // 自动校验
    if (!checkForm('bookInfoForm')) 
        return;
    
    if ($F('mode') == OpenEnum.mode1) {
    
        // 表单提交
        var url = 'j030011NewBookToBook.action?bookInfo.category1Id=' + $F('sltCategory1') +
        '&bookInfo.category2Id=' +
        $F('sltCategory2') +
        '&bookInfo.category3Id=' +
        $F('sltCategory3') +
        '&category1 =' +
        $F('sltCategory1') +
        '&category2 =' +
        $F('sltCategory2') +
        '&category3 =' +
        $F('sltCategory3') +
        '&category1Flag =' +
        $('sltCategory1').readAttribute('accesskey') +
        '&category2Flag =' +
        $('sltCategory2').readAttribute('accesskey') +
        '&category3Flag =' +
        $('sltCategory3').readAttribute('accesskey') +
        "&" +
        dataSerialize($('bookInfoForm'));
        $('bookInfoForm').action = url;
        // 显示加载动画
        showLoader();
        $('bookInfoForm').submit();
    }
    
    if ($F('mode') == OpenEnum.mode2) {
    
        // 表单提交
        var url = 'j030011NewBookToCourse.action?bookInfo.category1Id=' + $F('sltCategory1') +
        '&bookInfo.category2Id=' +
        $F('sltCategory2') +
        '&bookInfo.category3Id=' +
        $F('sltCategory3') +
        '&category1 =' +
        $F('sltCategory1') +
        '&category2 =' +
        $F('sltCategory2') +
        '&category3 =' +
        $F('sltCategory3') +
        '&category1Flag =' +
        $('sltCategory1').readAttribute('accesskey') +
        '&category2Flag =' +
        $('sltCategory2').readAttribute('accesskey') +
        '&category3Flag =' +
        $('sltCategory3').readAttribute('accesskey') +
        "&" +
        dataSerialize($('bookInfoForm'));
        $('bookInfoForm').action = url;
        // 显示加载动画
        showLoader();
        $('bookInfoForm').submit();
    }
    if ($F('mode') == OpenEnum.mode3) {
    
        // 表单提交
        var url = 'j030011UpdateBookToBook.action?bookInfo.category1Id=' + $F('sltCategory1') +
        '&bookInfo.category2Id=' +
        $F('sltCategory2') +
        '&bookInfo.category3Id=' +
        $F('sltCategory3') +
        '&category1=' +
        $F('sltCategory1') +
        '&category2=' +
        $F('sltCategory2') +
        '&category3=' +
        $F('sltCategory3') +
        '&category1Flag=' +
        $('sltCategory1').readAttribute('accesskey') +
        '&category2Flag=' +
        $('sltCategory2').readAttribute('accesskey') +
        '&category3Flag=' +
        $('sltCategory3').readAttribute('accesskey') +
        "&" +
        dataSerialize($('bookInfoForm'));
        $('bookInfoForm').action = url;
        // 显示加载动画
        showLoader();
        $('bookInfoForm').submit();
    }
    
    if ($F('mode') == OpenEnum.mode4) {
    
        // 表单提交
        var url = 'j030011UpdateBookToCourse.action?bookInfo.category1Id=' + $F('sltCategory1') +
        '&bookInfo.category2Id=' +
        $F('sltCategory2') +
        '&bookInfo.category3Id=' +
        $F('sltCategory3') +
        '&category1 =' +
        $F('sltCategory1') +
        '&category2 =' +
        $F('sltCategory2') +
        '&category3 =' +
        $F('sltCategory3') +
        '&category1Flag =' +
        $('sltCategory1').readAttribute('accesskey') +
        '&category2Flag =' +
        $('sltCategory2').readAttribute('accesskey') +
        '&category3Flag =' +
        $('sltCategory3').readAttribute('accesskey') +
        "&" +
        dataSerialize($('bookInfoForm'));
        $('bookInfoForm').action = url;
        // 显示加载动画
        showLoader();
        $('bookInfoForm').submit();
    }
    
}

