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
    $("#dataForm").validate({
        rules: {
            code: {
                required: true,
                maxlength: 100
            },
            name: {
                required: true,
                maxlength: 200,
            },
            host: {
                required: true,
                maxlength: 200,
            },
            idNumber: {
                required: true,
                maxlength: 200,
            },
            username: {
                required: true,
                maxlength: 200,
            },
            password: {
                required: true,
                maxlength: 100,
            },
            remark: {
            	required: false,
                maxlength: 2000,
            },
            phones: {
                required: true,
            },
            msg: {
                required: true,
            }
        },
        //验证提示
        messages: {
        	code: {
                 required: icon + "请输入短信服务器编号",
                 maxlength: icon + "规则类型编号必须100个字符以内"
            },
            name: {
                 required: icon + "请输入短信服务器名称",
                 maxlength: icon + "规则类型名称必须200个字符以内"
            },
            host: {
            	 required: icon + "请输入短信服务器web地址",
                 maxlength: icon + "规则类型名称必须200个字符以内"
            },
            idNumber: {
           	 	required: icon + "请输入企业Id",
                maxlength: icon + "规则类型名称必须200个字符以内"
            },
            username: {
            	required: icon + "请输入登陆用户",
                maxlength: icon + "规则类型名称必须200个字符以内"
            },
            password: {
             	required: icon + "请输入登陆密码",
                maxlength: icon + "规则类型名称必须100个字符以内"
            },
            remark: {
            	maxlength: icon + "备注必须2000个字符以内"
            },
            phones: {
            	required: icon + "请输入测试接收手机号码",
            },
            msg: {
            	required: icon + "请输入发送信息",
            }
        },
        //表单提交
        submitHandler : function(form){
        	_dataEdit.save_form();//保存
        }
    });
});
