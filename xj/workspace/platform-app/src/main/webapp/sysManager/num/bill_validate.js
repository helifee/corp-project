/**
 * @author lY
 * @CREATEDATE 2017/03/22
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
        error.css({margin:'0'});
        element.parents('td').append(error);
	},
	errorClass : "help-block m-b-none",
	validClass : ""

});
$().ready(function () {
	//验证提示图片
    var icon = "";
  //定义正则表达式(由数字和26个英文字母组成的字符串)
	jQuery.validator.addMethod("checkCode", function(value, element) {
    	var chrnum = /^[A-Za-z0-9]+$/;
    	return this.optional(element) || (chrnum.test(value));
    }, "只能输入由数字和字母组成的字符串");
    //添加验证规则
    $("#numBillFrom").validate({
        rules: {
            code: {
                required: true,
                checkCode:true,
                maxlength: 100
            },
            name: {
                required: true,
                maxlength: 200,
            },
            connector: {
                required: false,
                maxlength: 10,
            },
            remark: {
                required: false,
                maxlength: 2000,
            }
        },
        //验证提示
        messages: {
        	code: {
                required: icon + "请输入规则类型编号",
                maxlength: icon + "规则类型编号必须100个字符以内"
            },
            name: {
                required: icon + "请输入规则类型名称",
                maxlength: icon + "规则类型名称必须200个字符以内"
            },
            connector: {
            	maxlength: icon + "连接符必须10个字符以内"
            },
            remark: {
            	maxlength: icon + "备注必须2000个字符以内"
            }
        },
        //表单提交
        submitHandler : function(form){
    		_billEdit.save_form();//保存
        }
    });
});
