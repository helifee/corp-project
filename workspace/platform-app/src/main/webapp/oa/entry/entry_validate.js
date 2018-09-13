/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
$.validator.setDefaults({//表单验证提示配置
	highlight : function(element) {
		$(element).closest('td').removeClass('has-success').addClass(
				'has-error');
	},
	success : function(element) {
		element.closest('td').removeClass('has-error').addClass(
				'has-success');
	},
	errorElement : "span",
	errorPlacement : function(error, element) {
		if (element.is(":radio") || element.is(":checkbox")) {
			error.appendTo(element.parent().parent().parent());
		} else {
			error.appendTo(element.parent());
		}
	},
	errorClass : "help-block m-b-none",
	validClass : ""

});
$().ready(function () {
	//定义url验证
    jQuery.validator.addMethod("checkUrl", function(value, element) {
    	var parentId = $('#parentId').val();
    	var isInner = $("input[name='isInner']:checked").val();
    	if(parentId!=0){
			if(""==$('#_url').val()||null==$('#_url').val()){
				return false;
			}
    	}
		return true;
    }, "地址不能为空");
    var icon = "";
    //添加验证规则
    $("#entryForm").validate({
        rules: {
            code: {
                required: true,
                maxlength: 100
            },
            name: {
                required: true,
                maxlength: 200,
            },
            url: {
            	checkUrl: true
            }
        },
        messages: {
        	code: {
                required: icon + "请输入规则类型编号",
                maxlength: icon + "编号必须100个字符以内"
            },
            name: {
                required: icon + "请输入规则类型名称",
                maxlength: icon + "名称必须200个字符以内"
            },
            url: {
            }
        },
        /**
         * 提交事件
         */
        submitHandler : function(form){
    		_entryEdit.save_form();//保存
        }
    });
});
