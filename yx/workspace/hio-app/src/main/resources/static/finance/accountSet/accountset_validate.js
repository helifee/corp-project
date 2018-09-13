/**
 * @author chc
 * @CREATEDATE 2017/05/25
 */
/**
 * 验证插件配置验证样式
 */
$.validator.setDefaults({
	highlight : function(element) {
		$(element).closest('td').addClass('has-error');
	},
	success : function(element) {
		$(element).closest('td').removeClass('has-error');
		$(element).closest('td').addClass('has-success');
		$(element).remove();
	},
	errorElement : "span",
	errorPlacement : function(error, element) {
		error.addClass("help-block");
        error.css({margin:'0',float:'left'});
        element.parents('td').append(error);
	},
	errorClass : "help-block m-b-none",
	validClass : ""

});
$().ready(function () {
	//验证提示图片
    var icon = "";
    //添加验证规则
    $("#accountSetForm").validate({
        rules: {
        	name: {
                required: true,
                maxlength: 100
            },
            code: {
                required: true,
                maxlength: 100
            },
            companyName: {
                required: true,
                maxlength: 200
            },
            companyCode: {
                required: true,
                maxlength: 100,
            }
        },
        //验证提示
        messages: {
        	name: {
                required: icon + "请输入帐套名称",
                maxlength: icon + "帐套名称必须100个字符以内"
            },
            code: {
                required: icon + "请输入帐套编码",
                maxlength: icon + "帐套编码必须100个字符以内"
            },
            companyName: {
                required: icon + "请输入公司名称",
                maxlength: icon + "公司名称必须200个字符以内"
            },
            companyCode: {
                required: icon + "请输入公司编码",
                maxlength: icon + "公司编码必须100个字符以内"
            }
        },
        //表单提交
        submitHandler : function(form){
        	_DataEdit.save_form();//保存
        }
    });
});
