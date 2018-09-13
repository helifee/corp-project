/**
 * Created by xueshuang on 2017/2/21.
 */

$(function () {
    var validateForms = $("form[validate-type='jQueryValidate']");
    $.each(validateForms,function (i,validateForm) {
        /*var requiredElements = $(validateForm).find("[data-required]");
         $(requiredElements,function (i,requiredElement) {
         var requiredElementName = $(requiredElement).attr("name");
         });*/
        var formElements = $(validateForm).find(":input");
        var rulesJson = {};
        var messagesJson = {};
        $.each(formElements,function (i, formElement) {
            var formElementRulesJson = {};
            var formElementMessagesJson = {};

            var formElementName = $(formElement).attr("name");
            var formElementPlacehold = $(formElement).attr("placeholder");

            //必填验证
            var requiredVal = $(formElement).attr("data-required");
            if(requiredVal&& requiredVal =='true') {
                formElementRulesJson["required"]=true;
                formElementMessagesJson["required"]= (formElementPlacehold?formElementPlacehold:formElementName)+"不能为空";
            }

            var numReg = new RegExp("^[0-9]*$");
            //字符最小长度验证
            var minlengthVal = $(formElement).attr("data-minlength");
            if(minlengthVal&&numReg.test(minlengthVal)) {
                formElementRulesJson["minlength"]=minlengthVal;
                formElementMessagesJson["minlength"]= (formElementPlacehold?formElementPlacehold:formElementName)+"长度不能少于"+minlengthVal;
            }

            //字符最大长度验证
            var maxlengthVal = $(formElement).attr("data-maxlength");
            if(maxlengthVal&&numReg.test(maxlengthVal)) {
                formElementRulesJson["maxlength"]=maxlengthVal;
                formElementMessagesJson["maxlength"]= (formElementPlacehold?formElementPlacehold:formElementName)+"长度不能大于"+maxlengthVal;
            }

            //字符长度范围验证
            var rangelengthVal = $(formElement).attr("data-rangelength");
            if(rangelengthVal) {
                var rangelengthNums = rangelengthVal.split(",");
                var rangeStart ;
                var rangeEnd ;
                if(rangelengthNums.length==1&&numReg.test(rangelengthNums[0])){
                    rangeStart = 0;
                    rangeEnd = parsInt(rangelengthNums[0]);
                }else if(rangelengthNums.length>=2&&numReg.test(rangelengthNums[0])&&numReg.test(rangelengthNums[1])) {
                    rangeStart = parseInt(rangelengthNums[0]);
                    rangeEnd = parseInt(rangelengthNums[1]);
                }

                if(rangeStart&&rangeEnd) {
                    formElementRulesJson["rangelength"]=[rangeStart,rangeEnd];
                    formElementMessagesJson["rangelength"]= (formElementPlacehold?formElementPlacehold:formElementName)+
                        "最小长度长度不能小于"+rangeStart+",最大长度不能大于"+rangeEnd;
                }
            }

            //整数验证
            var digitsVal = $(formElement).attr("data-digits");
            if(digitsVal&&digitsVal=="true") {
                formElementRulesJson["digits"]=digitsVal;
                formElementMessagesJson["digits"]= (formElementPlacehold?formElementPlacehold:formElementName)+"只能输入正整数，包含0";
            }

            //最小值验证
            var minVal = $(formElement).attr("data-min");
            if(minVal&&numReg.test(minVal)) {
                formElementRulesJson["min"]=parseInt(minVal);
                formElementMessagesJson["min"]= (formElementPlacehold?formElementPlacehold:formElementName)+"最小值不能小于"+minVal;
            }

            //最大值验证
            var maxVal = $(formElement).attr("data-max");
            if(maxVal&&numReg.test(maxVal)) {
                formElementRulesJson["max"]=parseInt(maxVal);
                formElementMessagesJson["max"]= (formElementPlacehold?formElementPlacehold:formElementName)+"最大值不能大于"+maxVal;
            }

            //数值区间验证
            var rangeVal = $(formElement).attr("data-range");
            if(rangeVal) {
                var rangeNums = rangeVal.split(",");
                var rangeMin ;
                var rangeMax ;
                if(rangeNums.length==1&&numReg.test(rangeNums[0])){
                    rangeMin = Number.MIN_VALUE;
                    rangeMax = parsInt(rangeNums[0]);
                }else if(rangeNums.length>=2&&numReg.test(rangeNums[0])&&numReg.test(rangeNums[1])) {
                    rangeMin = parseInt(rangeNums[0]);
                    rangeMax = parseInt(rangeNums[1]);
                }

                if(rangeMin&&rangeMax) {
                    formElementRulesJson["range"]=[rangeMin,rangeMax];
                    formElementMessagesJson["range"]= (formElementPlacehold?formElementPlacehold:formElementName)+
                        "最小值不能小于"+rangeMin+",最大值不能大于"+rangeMax;
                }
            }

            //邮件验证
            var emailVal = $(formElement).attr("data-email");
            if(emailVal&&emailVal=="true") {
                formElementRulesJson["email"]=true;
                formElementMessagesJson["email"]= (formElementPlacehold?formElementPlacehold:formElementName)+"邮件格式不正确";
            }

            //URL验证
            var urlVal = $(formElement).attr("data-url");
            if(urlVal&&urlVal=="true") {
                formElementRulesJson["url"]=true;
                formElementMessagesJson["url"]= (formElementPlacehold?formElementPlacehold:formElementName)+"网址格式不正确";
            }

            //日期验证
            var dateVal = $(formElement).attr("data-date");
            if(dateVal&&dateVal=="true") {
                formElementRulesJson["date"]=true;
                formElementMessagesJson["date"]= (formElementPlacehold?formElementPlacehold:formElementName)+"日期格式不正确";
            }

            //小数验证
            var numberVal = $(formElement).attr("data-number");
            if(numberVal&&numberVal=="true") {
                formElementRulesJson["number"]=true;
                formElementMessagesJson["number"]= (formElementPlacehold?formElementPlacehold:formElementName)+"数值格式不正确";
            }


            rulesJson[formElementName] = formElementRulesJson;
            messagesJson[formElementName] = formElementMessagesJson;

        });

        $(validateForm).validate({
            rules: rulesJson,
            messages:messagesJson,
            highlight : function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            success : function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement : function(error, element) {
                error.addClass("help-block");
                element.parents('div.form-group').children("div").append(error);
            },
            submitHandler : function(form) {
                //获取form表单数据
                var formFields = $(form).serializeArray();
                var jsonData = {};
                /*$.each(formFields,function () {
                    jsonData[this.name]=this.value;
                });*/
                var numReg = new RegExp("^[0-9]*$");
                for(var i=0;i<formFields.length;i++) {

                    jsonData[formFields[i].name]=numReg.test(formFields[i].value)?parseInt(formFields[i].value):formFields[i].value;
                }

                console.info("form data:"+JSON.stringify(jsonData));

                //ajax方式提交表单，提交时以json格式提交
                $.ajax({
                    url:$(form).attr("action"),
                    data:JSON.stringify(jsonData),
                    type:'POST',
                    contentType:'application/json',
                    dataType:'JSON',
                    success:function (resultData ) {
                        if(resultData) {

                            toastr.options={
                                positionClass:"toast-top-center"
                            };

                            var successFlag = resultData.success;
                            var result = resultData.result;
                            var msg = resultData.msg;
                            if(successFlag) {

                                toastr.success('数据保存成功！');

                                //获取回调函数
                                var dataCallback = $(form).attr("data-callback");
                                dataCallback = dataCallback + "(" + JSON.stringify(resultData) + ")";
                                //执行回调函数
                                var func = eval("("+dataCallback+")");
                            }else {
                                toastr.error('数据保存失败！');
                            }

                        }

                    }
                });
            }

        });
    });
})
