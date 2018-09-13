/**
 * erp_cloud_platform xljUtils Created by dingguanghuai on 2017/3/23.
 * @author dingguanghuai
 * @date 2017/3/23
 */

(function ($) {
    if (!$.xljUtils) {
        $.extend({xljUtils:{}});
    }

    $.extend($.xljUtils, {
        //根据名称获取url参数
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            if(!window.location.search) return null;
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        //获取url参数json对象
        getUrlParams: function () {
            var urlParam = location.search;
            var urlParamObj = "";
            if(urlParam){
                urlParam = urlParam.replace("?", "").replace(/&/g, "\",\"");
                urlParam = urlParam.replace(/=/g, '":"');
                if (urlParam != "") {
                    try {
                        urlParamObj = JSON.parse('{"' + urlParam + '"}');
                    }catch(e) {
                        urlParamObj = {};
                    }

                }else{
                    urlParamObj = {};
                }
            }else{
                urlParamObj = {};
            }
            return urlParamObj;
        },
        /**
         * 重新计算grid宽高，根据grid的table属性tabel[constraint-layout="true"]，
         * 及table的父div.grid-container判断grid是否自适应窗口
         * 例如：<div class="xj-main-grid grid-container">
         * <table id="portalList" constraint-layout="true"></table>
         * <div id="portalPager"></div>
         * </div>
         */
        resizeNestedGrid: function (marginSize) {
            function _hasParent(gridContainer, gridHeight) {
                var containerSiblings = $(gridContainer).siblings(':visible');
                var gridContainerTop = $(gridContainer).offset() ? $(gridContainer).offset().top : 0;
                $.each(containerSiblings, function () {
                    if(!$(this).hasClass('nicescroll-rails')){
                        var sibTop = $(this).offset().top;

                        if (gridContainerTop != sibTop) {
                            gridHeight = gridHeight - $(this).outerHeight();
                            var marginTop = $(this).css('margin-top');
                            marginTop = marginTop?parseInt(marginTop.replace('px','')):0;
                            gridHeight = gridHeight-marginTop;
                        } else {
                            gridHeight = gridHeight - ($(gridContainer).outerHeight() - $(gridContainer).height());
                        }
                    }
                });
                var gridParentContainer = $(gridContainer).parent()[0];
                if (gridParentContainer) {
                	var marginTop;
                	try{
                		marginTop = $(gridParentContainer).css('margin-top');
                	}catch(e){
               		// console.warn(e);
                	}
                	
                    marginTop = marginTop?parseInt(marginTop.replace('px','')):0;
                    gridHeight = gridHeight-marginTop;
                    
                    gridHeight = _hasParent(gridParentContainer, gridHeight);

                }
                return gridHeight;
            }


            var fitGridTables = $('table[constraint-layout="true"]');
            var documentBodyHeight = document.body.scrollHeight;
            var parentIframe = $(window.parent.document.body).find('iframe')[0];

            if (parentIframe) {
                documentBodyHeight = $(parentIframe).height();
            } else {
                documentBodyHeight = $(window).height();
            }

            $.each(fitGridTables, function (i, fitGridTable) {
                var gridHeadrHeight = $(fitGridTable).parents(".ui-jqgrid-bdiv").siblings('.ui-jqgrid-hdiv').outerHeight();
                var gridFooterHeight = $(fitGridTable).parents(".ui-jqgrid-view").siblings(".ui-jqgrid-pager").outerHeight();


                var gridContainer = $(fitGridTable).parents('div.grid-container')[0];
                //var containerSiblings = $(gridContainer).siblings();
                var gridHeight = documentBodyHeight;
                gridHeight = _hasParent(gridContainer, gridHeight);
                marginSize = marginSize?marginSize:0;
                gridHeight = gridHeight-marginSize;

                gridHeight = gridHeight - gridHeadrHeight - gridFooterHeight - 28;

                $(fitGridTable).jqGrid().setGridHeight(gridHeight);
                $(fitGridTable).jqGrid().setGridWidth($(gridContainer).width(), true);


            });
        },
        /**
         * author:liuf
         * describe:ajax 请求失败返回值
         * param:status 服务器请求的状态码
         */
        getError: function (status) {
            if (status == 400) {
                $.xljUtils.tip("red", "请求无效！");
            } else if (status == 401) {
                $.xljUtils.tip("red", "未授权！");
            } else if (status == 403) {
                $.xljUtils.tip("red", "禁止访问");
            } else if (status == 404) {
                $.xljUtils.tip("red", "请求地址无效！");
            } else if (status == 405) {
                $.xljUtils.tip("red", "资源被禁止！");
            } else if (status == 414) {
                $.xljUtils.tip("red", "请求地址太长！");
            } else if (status == 500) {
                $.xljUtils.tip("red", "服务器出错！");
            } else if (status == 501) {
                $.xljUtils.tip("red", "服务器不支持请求的函数！");
            } else if (status == 504) {
                $.xljUtils.tip("red", "网关错误！");
            }

        },
        /**
         * 提示框
         * @param skinType 样式类别：blue、red、green
         * @param text 提示内容
         * @param time 停留时间
         */
        tip:function (skinType,text,time) {
            if(!skinType){
                skinType = "blue";
            }
            //默认消失时间
            if(!time){
                time = 3000;
            }
            var tipBox = $('body').find("#tip-box-alert");
            var html= ' <a href="#" class="close" onclick="$(this).parent().hide()"> &times; </a> ' +
                '<div class="dialog-tip '+skinType+' clearfix"> <div class="tipImg"></div> <p>'+text+'</p> </div>';

            if(tipBox.length<1){
                tipBox = $("<div>", {id:"tip-box-alert",class:"tip-box-alert"});
                $('body').append(tipBox);
            }
            //鼠标滑入滑出
            $(tipBox).hover(function(){
                clearTimeout(timer);
            },function(){
                tipBox.fadeOut();
            }).trigger("mouseleave");

            tipBox.html(html);
            tipBox.show();
            var timer = setTimeout(function(){
                tipBox.fadeOut();
            },2000);
        },
        /**
         * 确认提示框弹出层
         * @param skinType 样式类别：blue、red、green
         * @param text 提示内容
         * @param fn 确认按钮事件回调
         * @param failFn 取消按钮事件回调  ；failFn为false则不需要取消按钮 ；failFn为true则默认执行取消事件（关闭弹框）
         * @param yesText 确认按钮文本
         * @param callback 设置关闭弹出层后执行的回调函数，this指向easyDialog。
         */
        confirm:function (skinType, text, fn, failFn,yesText,callback) {
            if(!skinType){
                skinType = "blue";
            }
            var html= '<div class="dialog-box" id=""> <div class="con '+skinType+'"> ' +
                '<div class="tipImg"></div> <div class="tipBody"><div class="p_con">' +
                '<p title=""></p></div> <div class="btn-footer"> ' +
                '<button class="sure" id="easyDialogYesBtn">确定</button> <button class="cancel" id="easyDialogNoBtn">取消</button> </div> </div> </div></div>';
            html = $(html);
            html.find('p').attr('title',text);
            html.find('p').text(text);
            html = html[0].outerHTML;
            easyDialog.open({
                container: {
                    content: html,
                    yesFn: fn,
                    noFn: failFn
                },
                callback:callback
            });
            if(yesText) $("#easyDialogYesBtn").text(yesText);
            if(!failFn) $("#easyDialogNoBtn").remove();
            $(".easyDialog_footer").remove();

            $(".p_con").dotdotdot();  //出现省略号  jquery插件

        },
        addTreeScroll:function(cl){
            if(!cl) cl = "ztree-box";
            $("."+cl).niceScroll({
                autohidemode: false,
                cursorcolor: "#eee",
                cursorwidth: "6px", // 滚动条的宽度，单位：便素
                cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
                horizrailenabled: true, // nicescroll可以管理水平滚动
                background: "#fff"
            });

        },
        treeResizeFn:function (cl) {
            if(!cl) cl = "ztree-box";
            //$("."+cl).getNiceScroll().hide();
            $("."+cl).getNiceScroll().show().resize();
        },
        addGridScroll:function (cl) {
            if(!cl) cl = "ui-jqgrid-bdiv";
            $("."+cl).niceScroll({
                autohidemode: false,
                cursorcolor: "#eee",
                cursorwidth: "6px", // 滚动条的宽度，单位：便素
                cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
                horizrailenabled: true, // nicescroll可以管理水平滚动
                background: "#fff"

            });
        }, addNoHScroll:function (cl) {
            if(!cl) cl = "ui-jqgrid-bdiv";
            $("."+cl).niceScroll({
                autohidemode: false,
                cursorcolor: "#eee",
                cursorwidth: "6px", // 滚动条的宽度，单位：便素
                cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
                horizrailenabled: false, // nicescroll可以管理水平滚动
                background: "#fff"

            });
        },removeGridScroll:function (cl) {
            if(!cl) cl = "ui-jqgrid-bdiv";
            $("."+cl).getNiceScroll().remove();
        },
        gridResizeFn:function (cl,pcl) {
            if(!pcl) pcl = "body";
            $(pcl).find($(".ui-jqgrid-bdiv")).getNiceScroll().show().resize();
        },
        addModalScroll:function (id,listClass) { //模态框加滚动条  id为模态框id    listClass为要加滚动条的div的class
            $('#'+id).on('shown.bs.modal', function () {
            	$('#'+id).find("."+listClass).getNiceScroll().show();
            	$('#'+id).find(".ztree-box").getNiceScroll().show();
            	$('#'+id).find("."+listClass).niceScroll({
                    autohidemode: false,
                    cursorcolor: "#eee",
                    cursorwidth: "6px", // 滚动条的宽度，单位：便素
                    cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
                    horizrailenabled: true, // nicescroll可以管理水平滚动
                    background: "#fff"
                });
            });
            $('#'+id).on('hide.bs.modal', function () {
            	$('#'+id).find(".ztree-box").getNiceScroll().hide();
            	$('#'+id).find("."+listClass).getNiceScroll().hide();
            });
        },
        
        createValidateRule: function(validateForm){
        	var formElements = $(validateForm).find(":input");
            var rulesJson = {};
            var messagesJson = {};
            var returnObj = {rulesJson:rulesJson, messagesJson:messagesJson};
            var validateFlag = false;
            $.each(formElements,function (i, formElement) {
            	var formElementRulesJson = {};
                var formElementMessagesJson = {};

                var formElementName = $(formElement).attr("name");
                if ($.xljUtils.isEmpty(formElementName)) {
                	return;
                }
                //var formElementPlacehold = $(formElement).attr("placeholder");
                var formElementPlacehold = $(formElement).attr("data-placeholder");

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
                    formElementRulesJson["digits"]=true;
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
                    
                    // modify by haoqipeng 不能判断0值
                    if(rangeMin != undefined && rangeMax != undefined) {
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

                //身份证号验证
                var cardnoVal = $(formElement).attr("data-cardno");
                if(cardnoVal&&cardnoVal=="true") {
                    formElementRulesJson["cardno"]=true;
                    formElementMessagesJson["cardno"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
                }

                //护照号验证
                var passportVal = $(formElement).attr("data-passport");
                if(passportVal&&passportVal=="true") {
                    formElementRulesJson["passport"]=true;
                    formElementMessagesJson["passport"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
                }

                //手机号验证
                var mobileVal = $(formElement).attr("data-mobile");
                if(mobileVal&&mobileVal=="true") {
                    formElementRulesJson["mobile"]=true;
                    formElementMessagesJson["mobile"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
                }

                //电话号码验证
                var telVal = $(formElement).attr("data-tel");
                if(telVal&&telVal=="true") {
                    formElementRulesJson["tel"]=true;
                    formElementMessagesJson["tel"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
                }

                //联系电话(手机/电话皆可)验证
                var phoneVal = $(formElement).attr("data-phone");
                if(phoneVal&&phoneVal=="true") {
                    formElementRulesJson["phone"]=true;
                    formElementMessagesJson["phone"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
                }
                
                //手机验证
                var phoneVal = $(formElement).attr("data-phoneOnly");
                if(phoneVal&&phoneVal=="true") {
                	formElementRulesJson["phoneOnly"]=true;
                	formElementMessagesJson["phoneOnly"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
                }

                //邮政编码验证
                var zipcodeVal = $(formElement).attr("data-zipcode");
                if(zipcodeVal&&zipcodeVal=="true") {
                    formElementRulesJson["zipcode"]=true;
                    formElementMessagesJson["zipcode"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确";
                }

                //非中文验证
                var unchineseVal = $(formElement).attr("data-unchinese");
                if(unchineseVal&&unchineseVal=="true") {
                    formElementRulesJson["unchinese"]=true;
                    formElementMessagesJson["unchinese"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确,只能输入数字和英文字母";
                }
                
                var priceVal = $(formElement).attr("data-price");
                if (priceVal&&priceVal=="true") {  
                	 formElementRulesJson["price"]=true;
                 	formElementMessagesJson["price"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确,只能输入正数,最多两位小数";
                   
                }

                rulesJson[formElementName] = formElementRulesJson;
                messagesJson[formElementName] = formElementMessagesJson;
            });
        	return returnObj;
        },
        customSingleValidate:function(validateForm){
            /*var requiredElements = $(validateForm).find("[data-required]");
             $(requiredElements,function (i,requiredElement) {
             var requiredElementName = $(requiredElement).attr("name");
             });*/
        	var ruleObjJson = $.xljUtils.createValidateRule(validateForm);
        	var rulesJson = ruleObjJson.rulesJson;
        	var messagesJson = ruleObjJson.messagesJson;
            //表单验证
            $(validateForm).validate({
                debug:true,
                rules: rulesJson,
                messages:messagesJson,
                highlight : function(element) {
                    //$(element).closest('.form-group').addClass('has-error');
                    $(element).closest('td').addClass('has-error');
                },
                success : function(label) {
                    label.closest('td').removeClass('has-error');
                    label.closest('td').addClass('has-success');
                    label.remove();
                    validateFlag = true;
                },
                errorPlacement : function(error, element) {
                    error.addClass("help-block");
                    error.css({margin:'0','text-align':'left'});
                    //element.parents('div.form-group').children("div").append(error);
                    element.parents('td').append(error);
                }

            });
        },
        customValidate:function () {
            var validateForms = $("form[validate-type='jQueryValidate']");
            $.each(validateForms,function (i,validateForm) {
                /*var requiredElements = $(validateForm).find("[data-required]");
                 $(requiredElements,function (i,requiredElement) {
                 var requiredElementName = $(requiredElement).attr("name");
                 });*/
            	var ruleObjJson = $.xljUtils.createValidateRule(validateForm);
            	var rulesJson = ruleObjJson.rulesJson;
            	var messagesJson = ruleObjJson.messagesJson;
            	
                //表单验证
                $(validateForm).validate({
                    rules: rulesJson,
                    messages:messagesJson,
                    highlight : function(element) {
                        //$(element).closest('.form-group').addClass('has-error');
                        $(element).closest('td').addClass('has-error');
                    },
                    success : function(label) {
                        label.closest('td').removeClass('has-error');
                        label.closest('td').addClass('has-success');
                        label.remove();
                    },
                    errorPlacement : function(error, element) {
                        error.addClass("help-block");
                        error.css({margin:'0','text-align':'left'});
                        //element.parents('div.form-group').children("div").append(error);
                        element.parents('td').append(error);
                    },
                    submitHandler : function(form) {
                        //判断form表单action是否有值，有值的时候表单验证完成后提交
                        //否则只验证不提交
                        var actionUrl = $(validateForm).attr('action');
                        if(!actionUrl||actionUrl==""){
                            //获取验证成功回调函数
                            var validateSuccessFun = $(validateForm).attr('data-validate-success');
                            var params;
                            if (validateSuccessFun.indexOf('(') > 0) {
                                params = validateSuccessFun.substring(validateSuccessFun.indexOf('(')+1);
                                params = params.replace(")","");
                                if(params==""){
                                    params = [];
                                }else{
                                    params = params.split(',');
                                }
                            } else {
                                params = [];
                            }
                            if (validateSuccessFun.indexOf('(') > 0) {
                                validateSuccessFun = validateSuccessFun.substring(0,validateSuccessFun.indexOf('('));
                            }
                            try{
                                if($.isFunction(eval(validateSuccessFun))){
                                    if(params.length>0){
                                        validateSuccessFun += "(" + params.join(',') + ")";
                                    }else{
                                        validateSuccessFun += "()";
                                    }
                                    //执行回调函数
                                    var func = eval("("+validateSuccessFun+")");
                                }
                            }catch (e){
                                // console.error('函数调用出错!'+e);
                            }
                            return;
                        }


                        //获取form表单数据
                        var formFields = $(form).serializeArray();
                        var jsonData = {};
                        var numReg = new RegExp("^[0-9]*$");
                        for(var i=0;i<formFields.length;i++) {
                            if(formFields[i].value==""){
                                continue;
                            }
                            if(formFields[i].value=="1"||formFields[i].value=="0"){
                                jsonData[formFields[i].name]=numReg.test(formFields[i].value)?parseInt(formFields[i].value):formFields[i].value;
                                continue;
                            }
                            //jsonData[formFields[i].name]=numReg.test(formFields[i].value)?parseInt(formFields[i].value):formFields[i].value;
                            jsonData[formFields[i].name]=formFields[i].value;
                        }

                        //ajax方式提交表单，提交时以json格式提交
                        $.ajax({
                            url:$(form).attr("action"),
                            data:JSON.stringify(jsonData),
                            type:$(form).attr("method"),
                            contentType:'application/json',
                            dataType:'JSON',
                            success:function (resultData ) {
                                if(resultData) {
                                    var successFlag = resultData.success;
                                    var result = resultData.result;
                                    var msg = resultData.msg;
                                    //获取回调函数
                                    var dataCallback = $(form).attr("data-callback");
                                    if(dataCallback){
                                        // modify by haoqipeng
//                                var params = dataCallback.substring(dataCallback.indexOf('(')+1);
                                        var params;
                                        if (dataCallback.indexOf('(') > 0) {
                                            params = dataCallback.substring(dataCallback.indexOf('(')+1);
                                            params = params.replace(")","");
                                            if(params==""){
                                                params = [];
                                            }else{
                                                params = params.split(',');
                                            }
                                        } else {
                                            params = [];
                                        }
                                        params.push(JSON.stringify(resultData));
                                        if (dataCallback.indexOf('(') > 0) {
                                            dataCallback = dataCallback.substring(0,dataCallback.indexOf('('));// + "(" + params.join(',') + ")";
                                        }
                                        try{
                                            if($.isFunction(eval(dataCallback))){
                                                if(params.length>0){
                                                    dataCallback += "(" + params.join(',') + ")";
                                                }else{
                                                    dataCallback += "()";
                                                }
                                                //执行回调函数
                                                var func = eval("("+dataCallback+")");
                                            }
                                        }catch (e){
                                            // console.info('函数调用出错!<br><br>'+e);
                                        }
                                    }

                                }

                            },
                            error:function (XMLHttpRequest, textStatus, errorThrown) {
                                var status = XMLHttpRequest.status;
                                $.xljUtils.getError(status);
                            }
                        });
                    }

                });
            });
        },
        addCustomValidateMethod:function () {

            //验证护照是否正确
            function checknumber(number) {
                var str = number;
                //在Javascript中，正则表达式只能使用"/"开头和结束，不能使用双引号
                var Expression = /(P\d{7})|(G\d{8})/;
                var objExp = new RegExp(Expression);
                if (objExp.test(str) == true) {
                    return true;
                } else {
                    return false;
                }
            }

            var idCardNoUtil = {
                provinceAndCitys: {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
                    31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",
                    45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
                    65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},

                powers: ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"],

                parityBit: ["1","0","X","9","8","7","6","5","4","3","2"],

                genders: {male:"男",female:"女"},

                checkAddressCode: function(addressCode){
                    var check = /^[1-9]\d{5}$/.test(addressCode);
                    if(!check) return false;
                    if(idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0,2))]){
                        return true;
                    }else{
                        return false;
                    }
                },

                checkBirthDayCode: function(birDayCode){
                    var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
                    if(!check) return false;
                    var yyyy = parseInt(birDayCode.substring(0,4),10);
                    var mm = parseInt(birDayCode.substring(4,6),10);
                    var dd = parseInt(birDayCode.substring(6),10);
                    var xdata = new Date(yyyy,mm-1,dd);
                    if(xdata > new Date()){
                        return false;//生日不能大于当前日期
                    }else if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) ){
                        return true;
                    }else{
                        return false;
                    }
                },

                getParityBit: function(idCardNo){
                    var id17 = idCardNo.substring(0,17);
                    var power = 0;
                    for(var i=0;i<17;i++){
                        power += parseInt(id17.charAt(i),10) * parseInt(idCardNoUtil.powers[i]);
                    }
                    var mod = power % 11;
                    return idCardNoUtil.parityBit[mod];
                },

                checkParityBit: function(idCardNo){
                    var parityBit = idCardNo.charAt(17).toUpperCase();
                    if(idCardNoUtil.getParityBit(idCardNo) == parityBit){
                        return true;
                    }else{
                        return false;
                    }
                },

                checkIdCardNo: function(idCardNo){
                    //15位和18位身份证号码的基本校验
                    var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
                    if(!check) return false;
                    //判断长度为15位或18位
                    if(idCardNo.length==15){
                        return idCardNoUtil.check15IdCardNo(idCardNo);
                    }else if(idCardNo.length==18){
                        return idCardNoUtil.check18IdCardNo(idCardNo);
                    }else{
                        return false;
                    }
                },
                //校验15位的身份证号码
                check15IdCardNo: function(idCardNo){
                    //15位身份证号码的基本校验
                    var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
                    if(!check) return false;
                    //校验地址码
                    var addressCode = idCardNo.substring(0,6);
                    check = idCardNoUtil.checkAddressCode(addressCode);
                    if(!check) return false;
                    var birDayCode = '19' + idCardNo.substring(6,12);
                    //校验日期码
                    return idCardNoUtil.checkBirthDayCode(birDayCode);
                },
                //校验18位的身份证号码
                check18IdCardNo: function(idCardNo){
                    //18位身份证号码的基本格式校验
                    var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
                    if(!check) return false;
                    //校验地址码
                    var addressCode = idCardNo.substring(0,6);
                    check = idCardNoUtil.checkAddressCode(addressCode);
                    if(!check) return false;
                    //校验日期码
                    var birDayCode = idCardNo.substring(6,14);
                    check = idCardNoUtil.checkBirthDayCode(birDayCode);
                    if(!check) return false;
                    //验证校检码
                    return idCardNoUtil.checkParityBit(idCardNo);
                },
                formateDateCN: function(day){
                    var yyyy =day.substring(0,4);
                    var mm = day.substring(4,6);
                    var dd = day.substring(6);
                    return yyyy + '-' + mm +'-' + dd;
                },
                //获取信息
                getIdCardInfo: function(idCardNo){
                    var idCardInfo = {
                        gender:"", //性别
                        birthday:"" // 出生日期(yyyy-mm-dd)
                    };
                    if(idCardNo.length==15){
                        var aday = '19' + idCardNo.substring(6,12);
                        idCardInfo.birthday=idCardNoUtil.formateDateCN(aday);
                        if(parseInt(idCardNo.charAt(14))%2==0){
                            idCardInfo.gender=idCardNoUtil.genders.female;
                        }else{
                            idCardInfo.gender=idCardNoUtil.genders.male;
                        }
                    }else if(idCardNo.length==18){
                        var aday = idCardNo.substring(6,14);
                        idCardInfo.birthday=idCardNoUtil.formateDateCN(aday);
                        if(parseInt(idCardNo.charAt(16))%2==0){
                            idCardInfo.gender=idCardNoUtil.genders.female;
                        }else{
                            idCardInfo.gender=idCardNoUtil.genders.male;
                        }
                    }
                    return idCardInfo;
                },

                getId15:function(idCardNo){
                    if(idCardNo.length==15){
                        return idCardNo;
                    }else if(idCardNo.length==18){
                        return idCardNo.substring(0,6) + idCardNo.substring(8,17);
                    }else{
                        return null;
                    }
                },

                getId18: function(idCardNo){
                    if(idCardNo.length==15){
                        var id17 = idCardNo.substring(0,6) + '19' + idCardNo.substring(6);
                        var parityBit = idCardNoUtil.getParityBit(id17);
                        return id17 + parityBit;
                    }else if(idCardNo.length==18){
                        return idCardNo;
                    }else{
                        return null;
                    }
                }
            };


            // 身份证号码验证
            jQuery.validator.addMethod("cardno", function(value, element) {
                return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
            }, "请正确输入您的身份证号码");

            //护照编号验证
            jQuery.validator.addMethod("passport", function(value, element) {
                return this.optional(element) || checknumber(value);
            }, "请正确输入您的护照编号");

            // 手机号码验证
            jQuery.validator.addMethod("required", function(value, element) {
                return $.trim(value)!='';
            }, "必填项");

            // 手机号码验证
            jQuery.validator.addMethod("mobile", function(value, element) {
                var length = value.length;
                var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
                return this.optional(element) || (length == 11 && mobile.test(value));
            }, "请正确填写您的手机号码");

            // 电话号码验证
            jQuery.validator.addMethod("tel", function(value, element) {
                var tel = /^\d{3,4}-?\d{7,9}$/; //电话号码格式010-12345678
                return this.optional(element) || (tel.test(value));
            }, "请正确填写您的电话号码");

            // 联系电话(手机/电话皆可)验证
            jQuery.validator.addMethod("phone", function(value,element) {
                var length = value.length;
                var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
                var tel = /^\d{3,4}-?\d{7,9}$/;
//                var tel = /^[0-9-()（）]{7,18}$/;
                return this.optional(element) || (tel.test(value) || mobile.test(value));

            }, "请正确填写您的联系电话");
            // 手机验证
            jQuery.validator.addMethod("phoneOnly", function(value,element) {
            	var length = value.length;
            	var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
            	return this.optional(element) || mobile.test(value);
            	
            }, "请正确填写您的手机号码");

            // 邮政编码验证
            jQuery.validator.addMethod("zipcode", function(value, element) {
                var tel = /^[0-9]{6}$/;
                return this.optional(element) || (tel.test(value));
            }, "请正确填写您的邮政编码");

            //非中文验证
            jQuery.validator.addMethod("unchinese", function(value, element) {
                //var chinese = /^[\u4e00-\u9fa5]+$/;
                var chinese = /[\u4e00-\u9fa5]/gi;
                return this.optional(element) || !(chinese.test(value));
            }, "只能输入中文");
            //非中文验证
            jQuery.validator.addMethod("price", function(value, element) {
            	var  price = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/;  
            	return this.optional(element) || (price.test(value));
            }, "只能输入正数,最多两位小数");
            
            //url验证
            var oldUrl = jQuery.validator.methods['url'];
            jQuery.validator.addMethod("url", function(value, element) {
            	return this.optional(element) || /^https?:\/\/((((\d|[1-9]\d|1\d{2}|2([0-4]\d|5[0-5]))\.){3}(\d|[1-9]\d|1\d{2}|2([0-4]\d|5[0-5])))(:(\d|[1-9]\d{1,3}|[1-5]\d{4}|64\d{3}|654\d{2}|6552\d|6553[0-5]))?|(\w+\.){1,3}\w+)\/?((\/\w+)+(\?\w+=[\w%]*(&\w+=[\w%]*)*)?)?(#\w+)?$/ig.test(value);
            }, "请输入正确的网址");

        },
        formatDate:function(format,date){
            var o = {
                "M+" : date.getMonth()+1, //month
                "d+" : date.getDate(), //day
                "h+" : date.getHours(), //hour
                "m+" : date.getMinutes(), //minute
                "s+" : date.getSeconds(), //second
                "q+" : Math.floor((date.getMonth()+3)/3), //quarter
                "S" : date.getMilliseconds() //millisecond
            }
            if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                (date.getFullYear()+"").substr(4- RegExp.$1.length));
            for(var k in o)if(new RegExp("("+ k +")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length==1? o[k] :
                        ("00"+ o[k]).substr((""+ o[k]).length));
            return format;
        },
        
        /**
         * jqGrid初始化共通方法，调用时，只需要给定和共通选项不同的选项值即可
         * 参数选项里要有gridSelecter，指定jqgrid选择器
         * 
         * @param options 初始化选项
         * @returns
         */
        initJqGrid: function(options){
        	// Grid默认选项
        	var defaultOptions = {
        			gridSelecter:"#list1",
        			url:hostUrl + 'univ/search/searchProperty/page',
        	    	ajaxGridOptions: { contentType: 'application/json' },
        	        contentType : "application/json",  
        	        datatype : "json", 
        	    	postData:{},
        	    	multiselect:true,
        	        autowidth:true,
        	    	jsonReader : {
        	    		 repeatitems: false
        			},
        			rownumbers : true,
        	        // colNames : ['主键' ,'名称'],//jqGrid的列显示名字
        	        // colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
        	        //     {name : 'id',index : 'id',hidden:true},
        	        //     {name : 'name',index : 'name', width : 90}],
        	        rowNum : 20,// 一页显示多少条
        	        rowList :  [ 20, 50, 100, 200 ],// 可供用户选择一页显示多少条
        	        viewrecords:true,
        	        pager : '#pager',// 表格页脚的占位符(一般是div)的id
        	        // sortname : "updateDate",// 初始化的时候排序的字段
        	        // sortorder : "desc",// 排序方式,可选desc,asc
        	        mtype : "POST",// 向后台请求数据的ajax的类型。可选post,get
        	        loadError:function(xhr,status,error) {
        	        	$.xljUtils.getError(status);
        	        },
        	        // 双击行
        	        ondblClickRow:function(rowid,iRow,iCol,e) {
        	        	// console.log('ondblClickRow:rowid = ' + rowid + ', iRow = ' + iRow);
        	        	var editUrl = $(this).attr('data-editUrl');
        	        	if (!$.xljUtils.isEmpty(editUrl)) {
        	        		window.open(editUrl + '?random='+Date.now() + '&id=' +rowid, '_blank');
        	        	}
        	        },
        	        // 选中行
        	        onSelectRow:function(rowid,status) {
        	        	$(this).attr('data-current-rowid', null);
    	        		$(this).attr('data-previous-rowid', null);
                        // 有选择行时，以行号最小的rowid作为当前行id
                        var selIds = $(this).jqGrid('getGridParam','selarrrow');
                        if (selIds.length > 0) {
                            var rowIndexs = [];
                            for(var i = 0; i < selIds.length; i++) {
                                 rowIndexs.push(this.rows[selIds[i]].rowIndex);
                            }
                           
                            var minRowIndex = Math.min.apply(Math, rowIndexs);
                            $(this).attr('data-current-rowid', this.rows[minRowIndex].id);
                            $(this).attr('data-previous-rowid', this.rows[minRowIndex].previousSibling.id);
                        }
        	        	// console.log('onSelectRow:rowid = ' + rowid + ', status = ' + status);
        	        },
        	        gridComplete:function() {
        	        	//$.xljUtils.resizeNestedGrid();
        	        	$.xljUtils.addGridScroll();
                        $.xljUtils.gridResizeFn();
                        
                        var addRowId = $(this).data('data-added-rowid');
                        // 新增行时，设置当前行焦点
                        if (!$.xljUtils.isEmpty(addRowId)) {
                        	$(this).setSelection(addRowId,true);
                    		$(this).find('#' + addRowId + ' td').addClass("ui-state-highlight");
                    		$(this).data('data-added-rowid', null);
                        } 
                        // 非新增时，设置当前焦点行
                        else {
                        	var currentRowId = $(this).attr('data-current-rowid');
                            // console.log('gridComplete: currentRowId = ' + currentRowId);
                            if(currentRowId != undefined && currentRowId != null){
                            	// 旧有当前行id存在时，作为焦点行
                            	if(this.rows[currentRowId] != undefined) {
                            		$(this).setSelection(currentRowId,true);
                            		$(this).find('#' + currentRowId + ' td').addClass("ui-state-highlight"); 
                            	} 
                                // 旧有当前行id不存在(删除)时
                                else {
                        	        var previousRowId = $(this).attr('data-previous-rowid');
                                    // 焦点行为旧有当前行的上一行
                        	        if (previousRowId != undefined && previousRowId != null && this.rows[previousRowId] != undefined) {
                    	                 $(this).setSelection(previousRowId,true);
                    	                 $(this).find('#' + previousRowId + ' td').addClass("ui-state-highlight"); 
                        	        } 
                                    // 旧有当前行的上一行不存在时，焦点行为首行
                                    else {
                        	        	// 选中首行
                        	        	if (this.rows.length > 0) {
                        	        		if (!$.xljUtils.isEmpty(this.rows[0].id)) {
                        	        			$(this).setSelection(this.rows[0].id,true);
                            	        		$(this).find('#' + this.rows[0].id + ' td').addClass("ui-state-highlight");
                        	        		} else if (this.rows.length > 1 && !$.xljUtils.isEmpty(this.rows[1].id)) {
                        	        			$(this).setSelection(this.rows[1].id,true);
                            	        		$(this).find('#' + this.rows[1].id + ' td').addClass("ui-state-highlight");
                        	        		}
                        	        	}
                        	        	
                        	        }
                            	}
                            	
                            } else {
                            	// 没有标识当前行
                            }
                        }
                        
                        // console.log('--------- gridComplete ---------');
        	        },
        	        loadComplete:function(xhr) {
        	        	if (xhr.success == false) {
        	        		$.xljUtils.tip('red', '列表数据加载失败');
        	        	}
        	        	// console.log('--------- loadComplete ---------');
        	        }
        	};
        	
        	$.extend(defaultOptions, options);
        	
            // 创建jqGrid组件
            $(defaultOptions.gridSelecter).jqGrid(defaultOptions).attr('data-editUrl', options.editUrl)/*.navGrid(defaultOptions.pager,
        		{
        			add : false,
        			edit : false,
        			del : false,
        			search : false,
        			refresh : false
        		})*/;
        },

        /**
         * 重新查询jqgrid数据
         * @param params 查询条件
         */
        reLoadJqGridData: function (gridSelecter, params){
    		// 清空jqGrid参数缓存
    		var srcPostData = $(gridSelecter).jqGrid("getGridParam", "postData");
    		if (srcPostData != undefined) {
    			if (srcPostData.constructor === Array) {
    				srcPostData.splice(0);
    			} else if (srcPostData.constructor === Object) {
    				for(var v in srcPostData) {
    					srcPostData[v] = null;
    				}
    			}
    		}
    		
    	    $(gridSelecter).jqGrid("setGridParam",{postData:params}).trigger("reloadGrid");
    	},
    	
    	// 设置新增行ID到jqGrid
    	setAddedRowId:function(jqGridSelector, rowId) {
    		$(jqGridSelector).data('data-added-rowid', rowId);
    	},

        setJqGridAddedRowId:function($jqGrid, rowId) {
    		$jqGrid.data('data-added-rowid', rowId);
    	},
    	
    	// add by haoqipeng
    	// 从服务器取得UUID
    	getUuid:function(callback) {
			$.ajax({
		        type:'get',
                async: false,
		        url:hostUrl + "generator/getGuuid?time="+Math.random(),
		        success: function(data) {
			        var guuid=data.result;
			        if (typeof callback === "function") {
			        	callback(guuid);
			        }
		        },
		        error:function(xhr) {
		        	callback(null);
		        }
			});
		},
		/**
		 * 获取编码规则id
		 */
		getNumber:function(typeId){
        	var Num;
    		$.ajax({
    			url:'/platform-app/sys/num/rulerSub/getBeanIdByBillId/'+typeId+"?time="+Math.random(),
    	        type:'GET',
    	        dataType:'JSON',
    	        async:false,
    	        success: function(data) {
    	        	if(data.success){
    	        		  Num=data.result;
    	        	}
    	        }
    			}); 
    		return Num;
        },
		isEmpty:function(val) {
			if (val == undefined || val == null || val == '') {
				return true;
			}
			return false;
		},
		
		/**
		 * html标签转义
		 */
		htmlEncode: function(val) {
			return $('<span/>').text(val).html();
		},
		/**
		 * html标签解析
		 */
		htmlDecode: function(val) {
			return $('<span/>').html(val).text();
		},
        escapeHtml:function(string) {
            var entityMap = {
                // "&": "&amp;",
                "<": "&lt;",
                "\\": "\\\\",
                ">": "&gt;",
                // '"': '&quot;',
                "'": '&#39;',
                "/": '&#x2F;'
            };
            // return String(string).replace(/[&<>"'\/]/g, function (s) {
            //     return entityMap[s];
            // });
            return String(string).replace(/[<>'\/\\]/g, function (s) {
                return entityMap[s];
            });
        },

        /**
		 * ajax提交方法
		 * 如果只想处理请求返回的JSON，需要传入第二个参数okCallback回调函数
		 * 如果想完全自己处理ajax的success、error，请在options参数中覆盖默认ajax的success和error回调函数
		 * @param {object} options 请求选项，默认提交方式type:'POST'
		 * @param {function} successCallback json处理回调函数
		 * @param {function} failCallback json处理回调函数
		 * @param {function} errorCallback json处理回调函数
		 * @returns
		 */
		xljAjax:function(options, successCallback, failCallback, errorCallback) {
			var defaults = {
			        type:'POST',
			        contentType: "application/json",
					dataType:"JSON",
			        success:function (resultData) {
			            if (resultData && resultData.success) {
			               if (successCallback != undefined && typeof successCallback === "function") {
			            	   successCallback(resultData.result);
			               } else {
                               $.xljUtils.tip('blue',resultData.msg);
                           }
			            } else {
                            if (failCallback != undefined && typeof failCallback === "function") {
                                failCallback(resultData);
                            } else {
    			            	$.xljUtils.tip('red',resultData.msg);
                            }
			            }
			        }, error:function(xhr) {
                        if (errorCallback != undefined && typeof errorCallback === "function") {
                            errorCallback(xhr);
                        } else {
                           $.xljUtils.getError(xhr.status);
                        }
			        }
			    };
			$.ajax($.extend(defaults, options));
		}
    });
})(jQuery);
