//前端跳转url
var baseUrl = '/platform-app/';
//后端跳转url 用来调用获取选择器组件数据的接口
var serviceUrl = 'http://localhost:9999/platform-app/';
//平台访问的路径
var platformhosturl="/platform-app/";//注：平台访问hosturl与common.js中定义hosturl="/hr-app/"冲突，所以改名，讲访问平台遇到的地方改为这个

document.write('<!--[if lt IE 9]>');
document.write('<script src="'+baseUrl+'common/html5shiv/html5shiv.min.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/respond/respond.min.js" type="text/javascript"></script>');
document.write('<![endif]-->');
document.write('<script src="'+baseUrl+'common/jquery/jquery-2.2.3.min.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jquery/jquery-ui-1.12.1/jquery-ui.min.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/easyDialog/easydialog.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/validate/jquery.validate.min.js" type="text/javascript"></script>');
//已移植到xljUtils中
// document.write('<script src="'+baseUrl+'common/validate/validate.custom.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/bootstrap/js/bootstrap-datetimepicker.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/bootstrap/js/bootstrap-datetimepicker.zh-CN.js" type="text/javascript" charset="UTF-8"></script>');
document.write('<script src="'+baseUrl+'common/jqGrid/js/i18n/grid.locale-cn.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jqGrid/js/jquery.jqGrid.src.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jqGrid/js/jquery.jqGrid.plugin.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/zTreeStyle/jquery.ztree.all.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/ztree/js/jquery.ztree.exhide.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/scroll/jquery.nicescroll.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/custom/js/public.js" type="text/javascript"></script>');


document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/vendor/jquery.ui.widget.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/jquery.iframe-transport.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/jquery.fileupload.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/utils/xlj-attachment-plugin.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/utils/xljUtils_new.js" type="text/javascript"></script>');


document.write('<script src="'+baseUrl+'common/hrUtils/hrUtils.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/hrUtils/code_tree.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/hrUtils/hr_multipleSelector.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/hrUtils/hr_singleSelector.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/hrUtils/hrUtils.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/hrUtils/org_tree.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/hrUtils/sys_apply.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/hrUtils/sys_constant.js" type="text/javascript"></script>');

document.write('<script src="'+baseUrl+'common/jquery/jquery.placeholder.js" type="text/javascript"></script>');




