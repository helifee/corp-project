/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
$().ready(function () {
	//定义正则表达式(整数)
	jQuery.validator.addMethod("checkInteger", function(value, element) {
    	var chrnum = /^-?\d+$/;
    	return this.optional(element) || (chrnum.test(value));
    }, "只能输入整数");
	//定义正则表达式(正整数)
    jQuery.validator.addMethod("checkPositiveInteger", function(value, element) {
    	var chrnum = /^\d+$/;
    	return this.optional(element) || (chrnum.test(value));
    }, "只能输入正整数");
    //定义正则表达式(正整数)
    jQuery.validator.addMethod("checkInput", function(value, element) {
    	var chrnum = /^[\u4E00-\u9FA5A-Za-z0-9;@:_-]+$/;
    	return this.optional(element) || (chrnum.test(value));
    }, "不能输入特殊字符");
	//验证提示图片
    var icon = "";
   //添加验证规则
    $("#rulerEditFrom").validate({
        rules: {
        	code: {
        		required: true,
        		checkInput:true,
                maxlength: 100
            },
            name: {
                required: true,
                checkInput:true,
                maxlength: 200
            },
            type: {
                required: true
            },
            isOut: {
                required: true
            },
            dateFormat: {
            	required: true,
                maxlength: 23
            },
            initVar: {
            	required: true,
            	checkInteger:true,
            	maxlength: 20
            },
            stepLength: {
            	required: true,
                checkInteger:true,
                maxlength: 11
            },
            initSerial: {
            	required: true,
                checkInteger:true,
                maxlength: 20
            },
            maxSerial: {
            	required: true,
                checkInteger:true,
                maxlength: 20
            },
            serialFormat: {
            	maxlength: 200,
            	checkInput:true
            },
            serialLibrary:{
            	maxlength: 2000,
            	checkInput:true
            },
            sort: {
                required: true,
                checkPositiveInteger:true
            },
            serialNumberLength: {
                required: true,
                checkPositiveInteger:true,
                maxlength: 32
            },
            connectorSymbol: {
                maxlength: 32,
                checkInput:true
            },
            remark: {
            	maxlength: 2000,
            	checkInput:true
            }
        },
        //配置验证提示
        messages: {
            code: {
            	required: icon + "请输入规则编号",
                maxlength: icon + "规则编号必须100个字符以内"
            },
            name: {
            	 required: icon + "请输入规则名称",
                 maxlength: icon + "规则名称必须200个字符以内"
            },
            type: {
                required: icon + "请输入规则类型"
            },
            isOut: {
            	required: icon + "请输入是否输出"
            },
            dateFormat: {
            	required: icon + "请选择日期",
                maxlength: icon + "日期格式必须23个字符以内"
            },
            initVar: {
            	required: icon + "请填写初始值",
            	maxlength: icon + "初始值必须20个字符以内"
            },
            stepLength: {
            	required: icon + "请输入步长",
            	maxlength: icon + "规则编号必须11个字符以内"
            },
            initSerial: {
            	required: icon + "请输入起步值",
            	maxlength: icon + "规则编号必须20个字符以内"
            },
            maxSerial: {
            	required: icon + "请输入最大值",
            	maxlength: icon + "规则编号必须20个字符以内"
            },
            serialFormat: {
            	maxlength: icon + "序号格式必须200个字符以内"
            },
            serialLibrary: {
            	required: icon + "请填写枚举值",
            	maxlength: icon + "枚举值必须2000个字符以内"
            },
            sort: {
                required: icon + "请输入规则排序号"
            },
            serialNumberLength: {
                required: icon + "请填写流水号位数",
                maxlength: icon + "流水号位数必须32个字符以内"
            },
            connectorSymbol: {
                maxlength: icon + "连接符必须32个字符以内"
            },
            remark: {
            	maxlength: icon + "备注必须2000个字符以内"
            }
            
        },
        //表单提交方法
        submitHandler : function(form){
        	var _from = $("#rulerEditFrom");
        	//获取规则类型id  并验证
        	var billId = _from.find("input[name='billId']").val();
        	if(null==billId||undefined==billId||""==billId){
        		pop_tip_open("blue","规则类型ID为空不能保存!");
				return false;
			}
        	//保存表单
    		_rulerEdit.save_form();
        }
    });
});