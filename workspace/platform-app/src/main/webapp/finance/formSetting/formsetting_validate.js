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
    $("#formSettingForm").validate({
        rules: {
        	name: {
                required: true,
                maxlength: 200
            },
            urlType: {
                required: true,
                maxlength: 100
            },
            url: {
                required: true,
                maxlength: 300
            }
        },
        //验证提示
        messages: {
        	name: {
                required: icon + "请输入名称",
                maxlength: icon + "名称必须200个字符以内"
            },
            urlType: {
                required: icon + "请输入编码",
                maxlength: icon + "编码必须100个字符以内"
            },
            url: {
                required: icon + "请输入单据地址url",
                maxlength: icon + "单据地址url必须300个字符以内"
            }
        },
        //表单提交
        submitHandler : function(form){
        	_DataEdit.save_form();//保存
        }
    });
});
