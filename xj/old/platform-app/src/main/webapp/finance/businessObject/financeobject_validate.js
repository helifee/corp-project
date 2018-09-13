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
    $("#baseSupplierForm").validate({
        rules: {
        	appCode: {
                required: true
            },
            type: {
                required: true
            },
            code: {
                required: true,
                maxlength: 100
            },
            name: {
                required: true,
                maxlength: 200,
            },
            fetchClass: {
                required: true,
                maxlength: 255,
            },
            fetchMethod: {
                required: true,
                maxlength: 255,
            },
            callbackClass: {
                required: false,
                maxlength: 255,
            },
            callbackMethod: {
                required: false,
                maxlength: 255,
            },
            remark: {
                required: false,
                maxlength: 2000,
            }
        },
        //验证提示
        messages: {
        	appCode: {
                required: icon + "请输入业务对象所属系统"
            },
            type: {
                required: icon + "请输入业务对象类型"
            },
        	code: {
                required: icon + "请输入业务对象编号",
                maxlength: icon + "业务对象编号必须100个字符以内"
            },
            name: {
                required: icon + "请输入业务对象名称",
                maxlength: icon + "业务对象名称必须200个字符以内"
            },
            fetchClass: {
            	 required: icon + "请输入数据获取接口类",
                 maxlength: icon + "数据获取接口类必须255个字符以内"
            },
            fetchMethod: {
            	 required: icon + "请输入数据获取接口方法",
                 maxlength: icon + "数据获取接口方法必须255个字符以内"
            },
            callbackClass: {
            	 required: icon + "请输入数据回调类",
                 maxlength: icon + "数据回调接口类必须255个字符以内"
            },
            callbackMethod: {
            	 required: icon + "请输入数据回调方法",
                 maxlength: icon + "数据回调接口方法必须255个字符以内"
            },
            remark: {
            	maxlength: icon + "描述必须2000个字符以内"
            }
        },
        //表单提交
        submitHandler : function(form){
        	_DataEdit.save_form();//保存
        }
    });
});
