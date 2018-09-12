//前端跳转url
var baseUrl = '/platform-app/';
var hostUrl = '/platform-app/';
//
// document.write('<!--[if lt IE 9]>');
// document.write('<script src="'+baseUrl+'common/html5shiv/html5shiv.min.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/respond/respond.min.js" type="text/javascript"></script>');
// document.write('<![endif]-->');
// //document.write('<script src="'+baseUrl+'common/jquery/jquery-2.2.3.min.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/json2/json2.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/jquery/jquery-ui-1.12.1/jquery-ui.min.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/easyDialog/easydialog.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/validate/jquery.validate.min.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/jquery/jquery.dotdotdot.min.js" type="text/javascript"></script>');
//
// //已移植到xljUtils中
// // document.write('<script src="'+baseUrl+'common/validate/validate.custom.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/bootstrap/js/bootstrap-datetimepicker.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/bootstrap/js/bootstrap-datetimepicker.zh-CN.js" type="text/javascript" charset="UTF-8"></script>');
// document.write('<script src="'+baseUrl+'common/jqGrid/js/i18n/grid.locale-cn.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/jqGrid/js/jquery.jqGrid.src.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/jqGrid/js/jquery.jqGrid.plugin.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/zTreeStyle/jquery.ztree.all.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/zTreeStyle/jquery.ztree.exhide.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/scroll/jquery.nicescroll.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/custom/js/public.js" type="text/javascript"></script>');
//
//
// document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/vendor/jquery.ui.widget.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/jquery.iframe-transport.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/jquery.fileupload.js" type="text/javascript"></script>');
// document.write('<!--[if (gte IE 8)&(lt IE 10)]>');
// document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/cors/jquery.xdr-transport.js" type="text/javascript"></script>');
// document.write('<![endif]-->');
// document.write('<script src="'+baseUrl+'common/utils/xlj-attachment-plugin.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/utils/xljUtils.js" type="text/javascript"></script>');
//
//
// document.write('<script src="' + baseUrl + 'common/hrUtils/hrUtils.js" type="text/javascript"></script>');
// document.write('<script src="' + baseUrl + 'common/hrUtils/code_tree.js" type="text/javascript"></script>');
// //注：字典选择组件需要与平台的合并到一起，否则一起引用会出问题
// // document.write('<script src="' + baseUrl + 'common/hrUtils/hr_multipleSelector.js" type="text/javascript"></script>');
// // document.write('<script src="' + baseUrl + 'common/hrUtils/hr_singleSelector.js" type="text/javascript"></script>');
// document.write('<script src="' + baseUrl + 'common/hrUtils/org_tree.js" type="text/javascript"></script>');
// document.write('<script src="' + baseUrl + 'common/hrUtils/sys_apply.js" type="text/javascript"></script>');
// document.write('<script src="' + baseUrl + 'common/hrUtils/sys_constant.js" type="text/javascript"></script>');
//
// //人员和组织机构选择器 更新此文件人员需注意将此行置于最后
// document.write('<script src="'+baseUrl+'common/utils/xljMultipleSelector.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/utils/xljSingleSelector.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/utils/xljSingleArraySelector.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/jquery/jquery.placeholder.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/utils/xljFlowRelationSelector.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/utils/xljIconRelationSelector.js" type="text/javascript"></script>');
// document.write('<script src="'+baseUrl+'common/utils/xljFlowFlSelect.js" type="text/javascript"></script>');

var SUPPORT_IE;

if(navigator.userAgent.indexOf("MSIE")>0){
    // if(navigator.userAgent.indexOf("MSIE 6.0")>0){
    //     SUPPORT_IE = 'ie6'
    // }
    // if(navigator.userAgent.indexOf("MSIE 7.0")>0){
    //     SUPPORT_IE = 'ie7'
    // }
    if(navigator.userAgent.indexOf("MSIE 9.0")>0 && !window.innerWidth){
        SUPPORT_IE = 'ie8'
    }
    if(navigator.userAgent.indexOf("MSIE 9.0")>0){
        SUPPORT_IE = 'ie9'
    }
    if (window.ActiveXObject) {
        var reg = /10\.0/;
        var str = navigator.userAgent;
        if (reg.test(str)) {
            SUPPORT_IE = 'ie10'
        };
    };
}
//流程flow.html 和modifyInstance.html
var FLOW_PATH;
(function(){
    var pathname = window.location.pathname;
    pathname = pathname.substring(pathname.lastIndexOf("/")+1);
    FLOW_PATH = pathname;
})()
requirejs.config({
    baseUrl: baseUrl,
    paths: {
        html5shiv: 'common/html5shiv/html5shiv.min',
        respond: "common/respond/respond.min",
        json2 : "common/json2/json2",
        jquery: 'common/jquery/jquery-1.11.3.min',
        'jquery.ui': "common/jquery/jquery-ui-1.12.1/jquery-ui.min",
        easydialog: 'common/easyDialog/easydialog',
        'jquery.validate': "common/validate/jquery.validate.min",
        'jquery.dotdotdot': 'common/jquery/jquery.dotdotdot.min',
        bootstrap: 'common/bootstrap/js/bootstrap.min',
        'bootstrap-datetimepicker':'common/bootstrap/js/bootstrap-datetimepicker',
        'bootstrap-datetimepicker.zh-CN': 'common/bootstrap/js/bootstrap-datetimepicker.zh-CN',
        i18n: 'common/jqGrid/js/i18n/grid.locale-cn',
        'jquery.jqGrid': 'common/jqGrid/js/jquery.jqGrid.src',
        'jquery.jqGrid.plugin': 'common/jqGrid/js/jquery.jqGrid.plugin',
        'jquery.ztree': 'common/zTreeStyle/jquery.ztree.all',
        'jquery.ztree.exhide':'common/zTreeStyle/jquery.ztree.exhide',
        'jquery.nicescroll':'common/scroll/jquery.nicescroll',
        public: 'common/custom/js/public',
        'jquery.fileupload': 'common/jquery-file-upload/js/jquery.fileupload',
        'jquery-ui/ui/widget': 'common/jquery-file-upload/js/vendor/jquery.ui.widget',
        'jquery.iframe-transport': 'common/jquery-file-upload/js/jquery.iframe-transport',
        'jquery.xdr-transport': 'common/jquery-file-upload/js/cors/jquery.xdr-transport',
        xljAttachmentPlugin: 'common/utils/xlj-attachment-plugin',
        xljAttachmentPluginFow: 'common/utils/xlj-attachment-plugin_flow',
        xljUtils: 'common/utils/xljUtils',
        xljMultipleSelector: 'common/utils/xljMultipleSelector',
        xljSingleSelector:'common/utils/xljSingleSelector',
        xljSingleArraySelector: 'common/utils/xljSingleArraySelector',
        placeholder: 'common/jquery/jquery.placeholder',
        xljFlowRelationSelector: 'common/utils/xljFlowRelationSelector',
        xljIconRelationSelector: 'common/utils/xljIconRelationSelector',
        xljFlowFlSelect: 'common/utils/xljFlowFlSelect',
        publicJs: 'common/custom/js/public',
        menuJson : 'menuJson',
        codeTree:'common/hrUtils/code_tree',
        // hrUtils:'common/hrUtils/hrUtils',
        hrMultipleSelector: 'common/hrUtils/hr_multipleSelector',
        hrSingleSelector: 'common/hrUtils/hr_singleSelector',
        'WdatePicker':'common/My97DatePicker/WdatePicker',
        'jquery.ecalendar': 'common/custom/js/jquery.e-calendar',
        'ckeditor' : 'meeting/ckeditor/ckeditor',
        'jquery.chosen':'oa/entry/chosen/chosen.jquery',
        'moment' : 'oa/schedule/full/lib/moment.min',
        'fullcalendar':'oa/schedule/full/fullcalendar.min',
        'locale.all': 'oa/schedule/full/locale-all',
        'pinyin':'common/utils/pinyin',
        'ueditor.config': 'oa/ueditor1.4.3/utf8-jsp/ueditor.config',
        'ueditor.all':'oa/ueditor1.4.3/utf8-jsp/ueditor.all.min',
        'ZeroClipboard' : 'oa/ueditor1.4.3/utf8-jsp/third-party/zeroclipboard/ZeroClipboard',
        'underscore.min' : 'oa/bbs/js/underscore-min',
        'jquery.page' : 'oa/bbs/js/pagination/jquery.page',
        'AjaxUtil': 'oa/bbs/js/AjaxUtil',
        'es5-shim':'https://cdn.bootcss.com/es5-shim/4.5.9/es5-shim',  //ie9
        'es5-sham':'https://cdn.bootcss.com/es5-shim/4.5.9/es5-sham',  //ie9
        'html5shiv-printshiv':'https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv-printshiv',  //ie9
        'console-polyfill':'https://cdn.bootcss.com/console-polyfill/0.3.0/index',  //ie9
        'echarts':'common/custom/js/echarts.common.min',
        'fcCommon.min.ie': (SUPPORT_IE == 'ie8' ? "sysManager/customForm/dist/fcCommon.min.ie8" : "sysManager/customForm/dist/fcCommon.min") ,
        'fcMain.min.ie':(SUPPORT_IE == 'ie8' ? 'sysManager/customForm/dist/fcMain.min.ie8':'sysManager/customForm/dist/fcMain.min'),
        'mxClient.min' : 'flow/builder/lib/mxClient.min',  //流程
        'lodash' : 'flow/builder/lib/lodash.min',
        'utils' : (FLOW_PATH == "flow_chart.html" ? 'flow/builder/modules/Utils': "flow/runtime/modify/modules/Utils"),
        'actions' :  (FLOW_PATH == "flow_chart.html" ? 'flow/builder/modules/Actions': "flow/runtime/modify/modules/Actions"),
        'sidebar' :  (FLOW_PATH == "flow_chart.html" ? 'flow/builder/modules/Sidebar': "flow/runtime/modify/modules/Sidebar"),
        'toolbar' :  (FLOW_PATH == "flow_chart.html" ? 'flow/builder/modules/Toolbar': "flow/runtime/modify/modules/Toolbar"),
        'stage' :  (FLOW_PATH == "flow_chart.html" ? 'flow/builder/modules/Stage': "flow/runtime/modify/modules/Stage"),
        'flowChart' : 'flow/runtime/approve/flow_chart',
        'modifyInstance' : 'flow/runtime/modify/modifyInstance',

        'jquery.xjTreegrid' : 'common/jquery.xjTreegrid',
        'bootstrap-year-calendar': 'common/bootstrap/js/bootstrap-year-calendar',

        'entry_validate' : 'oa/entry/entry_validate',
        'jquery-form' : 'common/jquery/jquery-form'
        // orgTree : 'common/hrUtils/org_tree',
        // sysApply : 'common/hrUtils/sys_apply',
        // sysConstant: 'common/hrUtils/sys_constant'
    },
    shim: {
        'jquery.ui': ['jquery'],
        'jquery.ecalendar': ['jquery'],
        'jquery-ui/ui/widget': ['jquery','jquery.ui'],
        'jquery.jqGrid':['jquery'],
        'jquery.jqGrid.plugin':['jquery','jquery.jqGrid'],
        'jquery.ztree':['jquery'],
        'jquery.ztree.exhide':['jquery','jquery.ztree'],
        'jquery.nicescroll':['jquery'],
        'bootstrap':['jquery'],
        'jquery.fileupload' :['jquery','jquery.ui','jquery-ui/ui/widget'],
        'jquery.iframe-transport':['jquery','jquery-ui/ui/widget'],
        'jquery.xdr-transport':['jquery','jquery.iframe-transport'],
        'bootstrap-datetimepicker':['bootstrap'],
        'bootstrap-datetimepicker.zh-CN':['bootstrap','bootstrap-datetimepicker'],
        'jquery.dotdotdot':['jquery'],
        'jquery.validate':['jquery'],
        'xljUtils':['jquery',
            'jquery.validate',
            'bootstrap',
            'jquery.ztree',
            'jquery.ztree.exhide',
            'jquery.jqGrid',
            'jquery.nicescroll',
            'easydialog',
            'jquery.dotdotdot'],
        'xljMultipleSelector':['jquery','bootstrap','jquery.ztree'],
        'xljSingleSelector':['jquery','bootstrap','jquery.ztree'],
        'xljSingleArraySelector':['jquery','bootstrap','jquery.ztree'],
        'xljFlowRelationSelector':['jquery','bootstrap','jquery.ztree'],
        'xljIconRelationSelector':['jquery','bootstrap','jquery.ztree'],
        'xljFlowFlSelect':['jquery','bootstrap','jquery.ztree','xljSingleSelector'],
        'i18n':['jquery'],
        'easydialog':['jquery.dotdotdot'],
        'placeholder':['jquery'],
        'xljAttachmentPlugin':['jquery',
            'bootstrap',
            'jquery.ztree',
            'xljUtils',
            'jquery.fileupload',
            'jquery-ui/ui/widget',
            'jquery.iframe-transport',
            'jquery.xdr-transport'],
        'xljAttachmentPluginFow':['jquery',
            'bootstrap',
            'jquery.ztree',
            'xljUtils',
            'jquery.fileupload',
            'jquery-ui/ui/widget',
            'jquery.iframe-transport',
            'jquery.xdr-transport'],
        'publicJs':['jquery'],
        'WdatePicker':['jquery'],
        'jquery.chosen':['jquery'],
        'moment':['jquery','jquery.ui'],
        'locale.all' : ["moment",'jquery','fullcalendar'],
        // 'ueditor.config' : ['ueditor.all'],
        'ueditor.all' : ['ueditor.config'],
        'AjaxUtil': ['jquery','underscore.min'],
        'fcMain.min.ie':['jquery'],
        'jquery.xjTreegrid':[
            'jquery',
            'jquery.ztree',
            'xljUtils'
        ],
        'bootstrap-year-calendar':['jquery','bootstrap'],
        'entry_validate':['jquery','jquery.validate'],
        'jquery-form':['jquery']
        // 'fullcalendar': ["moment",'pinyin']
        // 'moment': ['fullcalendar','locale.all','pinyin']

        // 'orgTree':['jquery','jquery.ztree','jquery.ztree.exhide']
    },
});
if(SUPPORT_IE == "ie9"){
    require([
        'html5shiv',
        'respond'
        ])
}
require([
    // 'html5shiv',
    // 'respond',
    'json2',
    'i18n',
    // 'bootstrap-datetimepicker.zh-CN',
    // 'jquery.ztree',
    // 'orgTree',
    // 'jquery.nicescroll',
    'publicJs',
    "xljUtils",
    // 'hrUtils',
    // 'jquery.ui.widget',
    'easydialog',
    'placeholder',

]);




