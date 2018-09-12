/**
 * 员工信息编辑js
 */

;
(function ($, window, document, undefined) {
    //上来就执行
    $(function () {
        //根据id加载数据
        empId = $.xljUtils.getUrlParam("empId");//从父页面获取员工ID
        getEmpInfoSetById(empId);
    });


})(jQuery, window, document);