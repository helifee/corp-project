/**
 * @author lY
 * @CREATEDATE 2017/03/22
 */
$().ready(function () {
	//验证提示图片
    var icon = "";
   //添加验证规则
    $("#fieldEditFrom").validate({
        rules: {
        	code: {
        		required: true,
                maxlength: 100
            },
            name: {
                required: true,
                maxlength: 200
            },
            type: {
                required: true
            },
            isQuery: {
                required: true
            },
            display: {
                required: true
            },
            urlTypeFlag: {
                required: true
            }
        },
        //配置验证提示
        messages: {
            code: {
            	required: icon + "请输入业务数据项编号",
                maxlength: icon + "业务数据项编号必须100个字符以内"
            },
            name: {
            	 required: icon + "请输入业务数据项名称",
                 maxlength: icon + "业务数据项名称必须200个字符以内"
            },
            type: {
                required: icon + "请输入业务数据项类型"
            }
        },
        //表单提交方法
        submitHandler : function(form){
        	var _from = $("#fieldEditFrom");
        	//获取规则类型id  并验证
        	var bizObjectId = _from.find("input[name='bizObjectId']").val();
        	if(null==bizObjectId||undefined==bizObjectId||""==bizObjectId){
        		pop_tip_open("blue","业务对象ID为空不能保存!");
				return false;
			}
        	//保存表单
        	_ModalEdit.save_form();
        }
    });
});