
/**
 *优化滑动子页面获取参数失败的问题
 */

//前端跳转url
var baseUrl = '/static/';
var hostUrl = 'http://' + document.domain + ':9999/platform-app/hr/';


document.write('<!--[if lt IE 9]>');
document.write('<script src="'+baseUrl+'common/html5shiv/html5shiv.min.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/respond/respond.min.js" type="text/javascript"></script>');
document.write('<![endif]-->');
//document.write('<script src="'+baseUrl+'common/jquery/jquery-2.2.3.min.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jquery/jquery-1.11.3.min.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/json2/json2.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jquery/jquery-ui-1.12.1/jquery-ui.min.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/easyDialog/easydialog.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/validate/jquery.validate.min.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jquery/jquery.dotdotdot.min.js" type="text/javascript"></script>');

//已移植到xljUtils中
// document.write('<script src="'+baseUrl+'common/validate/validate.custom.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/bootstrap/js/bootstrap-datetimepicker.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/bootstrap/js/bootstrap-datetimepicker.zh-CN.js" type="text/javascript" charset="UTF-8"></script>');
document.write('<script src="'+baseUrl+'common/jqGrid/js/i18n/grid.locale-cn.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jqGrid/js/jquery.jqGrid.src.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jqGrid/js/jquery.jqGrid.plugin.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/zTreeStyle/jquery.ztree.all.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/zTreeStyle/jquery.ztree.exhide.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/scroll/jquery.nicescroll.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/custom/js/public.js" type="text/javascript"></script>');


document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/vendor/jquery.ui.widget.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/jquery.iframe-transport.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/jquery.fileupload.js" type="text/javascript"></script>');
document.write('<!--[if (gte IE 8)&(lt IE 10)]>');
document.write('<script src="'+baseUrl+'common/jquery-file-upload/js/cors/jquery.xdr-transport.js" type="text/javascript"></script>');
document.write('<![endif]-->');
document.write('<script src="'+baseUrl+'common/utils/xlj-attachment-plugin.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/utils/xljUtils.js" type="text/javascript"></script>');

document.write('<script src="'+baseUrl+'common/HrUserMobileUtil.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/hrApply.js" type="text/javascript"></script>');
//$mobile 开发环境放开、生产环境注释掉，原因 移动端im会自动追加token到header上

document.write('<script src="'+baseUrl+'common/hrApply.js" type="text/javascript"></script>');
document.write('<script src="' + baseUrl + 'common/hrUtils/hrUtils.js" type="text/javascript"></script>');
document.write('<script src="' + baseUrl + 'common/hrUtils/code_tree.js" type="text/javascript"></script>');
//hr字典选择组件
document.write('<script src="' + baseUrl + 'common/hrUtils/hr_multipleSelector.js" type="text/javascript"></script>');
document.write('<script src="' + baseUrl + 'common/hrUtils/hr_singleSelector.js" type="text/javascript"></script>');
document.write('<script src="' + baseUrl + 'common/hrUtils/org_tree.js" type="text/javascript"></script>');
document.write('<script src="' + baseUrl + 'common/hrUtils/sys_apply.js" type="text/javascript"></script>');
document.write('<script src="' + baseUrl + 'common/hrUtils/sys_constant.js" type="text/javascript"></script>');

//人员和组织机构选择器 更新此文件人员需注意将此行置于最后
document.write('<script src="'+baseUrl+'common/utils/xljMultipleSelector.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/utils/xljSingleSelector.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/utils/xljSingleArraySelector.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/jquery/jquery.placeholder.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/utils/xljFlowRelationSelector.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/utils/xljIconRelationSelector.js" type="text/javascript"></script>');
document.write('<script src="'+baseUrl+'common/utils/xljFlowFlSelect.js" type="text/javascript"></script>');


//滑动js css
document.write('<script src="'+baseUrl+'common/iframePage.js"></script>');
document.write('<link href="'+baseUrl+'common/iframePage.css" rel="styleSheet">');
document.write('<link href="'+baseUrl+'common/animate.css" rel="styleSheet">');

