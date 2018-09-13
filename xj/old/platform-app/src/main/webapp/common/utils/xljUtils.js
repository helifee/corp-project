/**
 * erp_cloud_platform xljUtils Created by dingguanghuai on 2017/3/23.
 * @author dingguanghuai
 * @date 2017/3/23
 */

if("undefined" == typeof hostUrl){
	hostUrl = '/platform-app/';
}
var sessionSign = 0;
(function ($) {
    if (!$.xljUtils) {
        $.extend({xljUtils:{}});
    }

    $.extend($.xljUtils, {
        //按钮权限过滤
        btnPowerOperation: function (appCode,btnMenuCode) {
            //获取页面所有按钮
            var pageMoreBtns = $('a[data-operationcode]');//更多按钮
            var pageNoMoreBtns = $('button[data-operationcode]');//普通按钮

            var operations = [];//有权限的按钮
            //获取页面有权限按钮
            $.ajax({
                type: 'GET',
                url: hostUrl + 'sys/authentication/getUserAuthenticationOperation?_t='+new Date().getTime()+'&appCode='+appCode+'&menuCode=' + btnMenuCode,
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (data.success) {
                        for (var i = 0; i < data.result.length; i++) {
                            var obj = data.result[i];
                            operations.push(obj);
                        }
                    } else {
                        //$.xljUtils.tip('red', '获取按钮权限失败！');
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    //$.xljUtils.tip('red', '获取按钮权限失败！');
                }
            });
            //判断页面是否存在更多按钮
            if(pageMoreBtns.length>0){
                var i=0;
                $.each(pageNoMoreBtns,function(m, item) {
                    if($.inArray($(item).attr("data-operationcode"),operations)==-1){
                        $(item).remove();
                    }else{i++;};
                });
                if(i<3){
                    var moreDiv = null;
                    var num = 0;
                    $.each(pageMoreBtns,function(m, item) {
                        moreDiv = $(item).closest('div');
                        if($.inArray($(item).attr("data-operationcode"),operations)==-1){
                            $(item).remove();
                        }else{
                            num++;
                            if(num>4){return true;}
                            var _text = $(item).text();
                            var _id = $(item).attr("id");
                            var _onclick  =$(item).attr("onclick");
                            var newBtn = $('<button class="btn btn-sm" type="button">'+_text+'</button>');
                            if(_id){
                                newBtn.attr("id",_id);
                            }
                            if(_onclick){
                                newBtn.attr("onclick",_onclick);
                            }
                            moreDiv.parent().prepend(newBtn);
                            $(item).remove();
                        };
                    });
                    if(moreDiv&&num<5){
                        moreDiv.remove();
                    }
                }else{
                    var j=0;
                    $.each(pageMoreBtns,function(m, item) {
                        if($.inArray($(item).attr("data-operationcode"),operations)==-1){
                            $(item).remove();
                        }else{j++;};
                    });
                    if(j==0){
                        $(item).closest('div').remove();
                    }
                }
            }else{
                $.each(pageNoMoreBtns,function(m, item) {
                    if($.inArray($(item).attr("data-operationcode"),operations)==-1){
                        $(item).remove();
                    }
                });
            }
        },
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
                            marginTop = isNaN(marginTop)?0:marginTop;
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
                    marginTop = isNaN(marginTop)?0:marginTop;
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

                //$(fitGridTable).jqGrid().setGridHeight(gridHeight);
                //$(fitGridTable).jqGrid().setGridWidth($(gridContainer).width(), true);
                $(fitGridTable).jqGrid('setGridHeight',gridHeight);
                $(fitGridTable).jqGrid('setGridWidth',$(gridContainer).width(), true);


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
            var html= ' <a href="javascript:void(0);" class="close" onclick="$(this).parent().hide()"> &times; </a> ' +
                '<div class="dialog-tip '+skinType+' clearfix"> <div class="tipImg"></div> <p>'+text+'</p> </div>';

            if(tipBox.length<1){
                //tipBox = $("<div>", {id:"tip-box-alert",class:"tip-box-alert"});

                tipBox = $('<div></div>');
                tipBox.attr('id','tip-box-alert');
                tipBox.addClass('tip-box-alert');
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
        addMaskLayer:function(text){
            if(!text) text = "loading...";
            var maskBox = '<div class="loading maskLayer"><div class="load-box"> <div  class="anzhuangimg">' +
                '<div class="loader-inner ball-spin-fade-loader"> ' +
                '<div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div> ' +
                '<div style="color:#fff">'+text+'</div> </div></div></div>';
            if($(".maskLayer").length<1){
                $('body').append(maskBox);
            }
            $(".maskLayer").css("display","block");
        },
        removeMaskLayer:function(){
            setTimeout(function(){
                $(".maskLayer").css("display","none");
            },1000);

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
        addGridScroll:function (cl,pobj) {
            if(!cl) cl = "ui-jqgrid-bdiv";
            if(!pobj) pobj = "body";
            $(pobj).find("."+cl).niceScroll({
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
                
                //非中文验证(允许录入英文字母、数字、英文字符)
                var englishWordVal = $(formElement).attr("data-englishWord");
                if(englishWordVal&&englishWordVal=="true") {
                    formElementRulesJson["englishWord"]=true;
                    formElementMessagesJson["englishWord"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确,只能输入数字和英文字母";
                }
                
                var priceVal = $(formElement).attr("data-price");
                if (priceVal&&priceVal=="true") {  
                	 formElementRulesJson["price"]=true;
                 	formElementMessagesJson["price"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确,只能输入正数,最多两位小数";
                   
                }
                
              //过滤'\
                var filterSpecialVal = $(formElement).attr("data-filterSpecial");
                if(filterSpecialVal&&filterSpecialVal=="true") {
                    formElementRulesJson["filterSpecial"]=true;
                    formElementMessagesJson["filterSpecial"]= (formElementPlacehold?formElementPlacehold:formElementName)+"格式不正确,不能输入特殊字符'和\\";
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
            	
            	var validateJson = {
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
//                                    var params = dataCallback.substring(dataCallback.indexOf('(')+1);
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

                    
            	};
            	
            	var validateIgnore = $(validateForm).attr('validate-ignore');
            	if(validateIgnore=='true'){
            		validateJson.ignore='';
            	}
            	
                //表单验证
                $(validateForm).validate(validateJson);
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
                var chinese = /[^\w\/]/ig;
                return this.optional(element) || !(chinese.test(value));
            }, "只能输入中文");
            
            //非中文验证(允许录入英文字母、数字、英文字符)
            jQuery.validator.addMethod("englishWord", function(value, element) {
            	var englishWord = /[\u4e00-\u9fa5]/gi;
//              var englishWordSymbol = /[\uFF00-\uFFEF]/;
                //匹配这些中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
//                var englishWordSymbol = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
                var sc=/[^\a-\z\A-\Z0-9\-\_\,]/g
//                return this.optional(element) || (!(englishWord.test(value)) && !(englishWordSymbol.test(value)));
                return this.optional(element) || !(sc.test(value));
            }, "只能输入中文");
            
            //非中文验证
            jQuery.validator.addMethod("price", function(value, element) {
            	var  price = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/;  
            	return this.optional(element) || (price.test(value));
            }, "只能输入正数,最多两位小数");
            
            //url验证
            var oldUrl = jQuery.validator.methods['url'];
           /* jQuery.validator.addMethod("url", function(value, element) {
            	return this.optional(element) || /^https?:\/\/(?:(?:(?:(?:\d|[1-9]\d|1\d{2}|2(?:[0-4]\d|5[0-5]))\.){3}(?:\d|[1-9]\d|1\d{2}|2([0-4]\d|5[0-5])))(?::(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|64\d{3}|654\d{2}|6552\d|6553[0-5]))?|(?:\w+(?:-\w+)?\.){1,3}\w+(?:-\w+)?)\/?(?:(?:\/(?:\w+(?:-\w+)?\/?|\w+(?:-\w+)?\.\w+))+(?:\?(?:\w+|\w+=[\w%]*(&\w+=[\w%]*)*))?)?(#\w+)?$/ig.test(value);
            }, "请输入正确的网址");*/
           jQuery.validator.addMethod('url',function (value,element) {
              return this.optional(element)||/^(http|https|ftp)\:\/\/([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&%\$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(\/[^\/][a-zA-Z0-9\w\.\,\?\'\\/\+&%\$#\=~_\-@]*)*/gi.test(value);
           });
            
          //过滤'\
            jQuery.validator.addMethod("filterSpecial", function(value, element) {
                var sc=/[^\'\\]$/;
                return this.optional(element) || sc.test(value);
            }, "不能输入特殊字符'和\\");
            

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
            };
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
    		
    	    $(gridSelecter).jqGrid("setGridParam",{postData:params,page:1}).trigger("reloadGrid");
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
        ///
        /**
         *  查找树节点
         *  @param 查找节点属性
         *  @param 查找的节点属性的对应值
         *  @param 是否标记为高亮
         */
        _searchOrgTree: function(keyName,value,isHighlight,treeObj,keysArrJson) {
            //var ztreeObj = $.fn.zTree.getZTreeObj(treeObj.attr('id'));
            var that = this;
            var ztreeObj = treeObj;
            if(!ztreeObj){return false;}
            
            var nodes = [];
            if(!keysArrJson){
            	nodes = ztreeObj.getNodesByParamFuzzy(keyName, value, null);
            }else{
            	for(var key in keysArrJson){
            		/*var tempNodes = ztreeObj.getNodesByFilter(function(node){
                		
                    	return node[keysArrJson[key]]?node[keysArrJson[key]].indexOf(value) != -1:false;
                    });*/
                    var tempNodes = ztreeObj.getNodesByParamFuzzy(keysArrJson[key], value, null);
            		nodes = nodes.concat(tempNodes);
        		}
            }
            
            $.each(nodes,function (i,node) {
                //zTree.setting.view.fontCss = {};
                if(isHighlight){
                    node.highlight = 'true';
                }else{
                    node.highlight = 'false';
                }

                var parentNodes = [];
                that._getTreeParentNodes(node,parentNodes);
                $.each(parentNodes,function (i,parentNode) {
                    if(isHighlight){
                        parentNode.highlight = 'true';
                    }else{
                        parentNode.highlight = 'false';
                    }
                    ztreeObj.updateNode(parentNode);
                });

                ztreeObj.updateNode(node);
                if (i==0) {
                    ztreeObj.expandNode(node.getParentNode(), true, false, true,true);
                }else{
                    //ztreeObj.expandNode(node.getParentNode(), true, false, false,true);
                }

            });

            var nodes = ztreeObj.getNodesByFilter(function(node){
                return node.highlight!='true';
            }, false);
            if (isHighlight) {
                ztreeObj.hideNodes(nodes);
            }else{
                ztreeObj.showNodes(nodes);
            }
        },
        /**
         * 个性化文字样式，只针对 zTree 在节点上显示的对象
         * @param treeId
         * @param treeNode
         * @returns
         */
        _getFontCss: function(treeId, treeNode) {
            return (treeNode.highlight&&treeNode.highlight=='true') ?
            {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
                {color:"#333", "font-weight":"normal",'font-style':'normal'} | (treeNode.status&&treeNode.status=='0') ?
                {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
                {color:"#333", "font-weight":"normal",'font-style':'normal'};
        },
        /**
         * 搜索框keyup\blur事件
         * @param searchInputObj 搜索框input的jq对象
         */
        _searchTreeInputEvent: function(searchInputObj,treeObj,searchKey){
            var that = this;
            /*searchInputObj.bind('keyup',function (event) {
                that._searchOrgTree('highlight','true',false,treeObj);
                var value = $(this).val();
                if(value=='') {
                    that._searchOrgTree('highlight','true',false,treeObj);
                }else {
                    that._searchOrgTree('name',$.trim(value),true,treeObj);
                }
            }).bind('blur',function (event) {
                var value = $(this).val();
                if(value=='') {
                    that._searchOrgTree('highlight','true',false,treeObj);
                }

            });*/
            searchInputObj.bind('keypress',function (event) {
            	if(event.keyCode == "13"){
		            that._searchOrgTree('highlight','true',false,treeObj);
		            var inputVal = $(this).val();
		            /*if(value=='') {
		                that._searchOrgTree('highlight','true',false,treeObj);
		            }else {
		                that._searchOrgTree('name',$.trim(value),true,treeObj);
		            }*/
                    if(!searchKey&&$.trim(inputVal)!=''){
                        that._searchOrgTree('name',inputVal,true,treeObj);
                    } else if(searchKey&&$.trim(inputVal)!='') {
                        that._searchOrgTree(null,inputVal,true,treeObj, searchKey);
                    }
            	}
            });
        },
        /**
         * 搜索按钮点击事件
         * @param searchBtnObj 搜索按钮jq对象
         * @param searchInputObj 搜索框input的jq对象
         */
        _searchTreeBtnEvent: function(searchInputObj,treeObj, searchKey) {
            var that = this;
            that._searchOrgTree('highlight','true',false,treeObj);
            var inputVal = searchInputObj.val();
            if(!searchKey&&$.trim(inputVal)!=''){
                that._searchOrgTree('name',inputVal,true,treeObj);
            } else if(searchKey&&$.trim(inputVal)!='') {
            	that._searchOrgTree(null,inputVal,true,treeObj, searchKey);
            }
        },

        _getTreeParentNodes:function (node,parentNodes) {
            var parentNode = node.getParentNode();
            if (parentNode!=null&&typeof parentNode != 'undefined'){
                this._getTreeParentNodes(parentNode,parentNodes);
                parentNodes.push(parentNode);
            }

        },
        ///

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
		},
        /**
         * 转义特殊字符
         */
        encodeSpecialChars:function(_val) {
            _val = (_val == undefined || _val == null)?'':_val;
            _val = _val.replace(/\\/g,"\\\\");//为\加\，实现转义
            return _val.replace(/'/g,"\\'");//为单引号加\，实现转义

        },
        /**
         * 转义特殊字符
         */
        decodeSpecialChars:function(_val) {
            _val = (_val == undefined || _val == null)?'':_val;
            //_val = _val.replace(/\\'/g,"\'");//为单引号加\，实现转义
            return _val.replace(/\\\\/g,"\\");//为\加\，实现转义

        }
    });

    // add by haoqipeng
    // jquery实例扩展
    
    // 重写jquery.fn.val
    $.fn.val = function (baseVal) {
		return function () {
			var self = this, $self = $(this), attrName = 'data-html', attrValue = $self.attr(attrName), isSetter = arguments.length > 0, value = isSetter?arguments[0]:null;
			
			// 不存在自定义属性
			if (attrValue == undefined) {
				if (isSetter) {
					baseVal.call(self, value);
				} else {
					value = baseVal.call(self);
				}
			} else {
				if (attrValue == 'true') {
					if (isSetter) {
						baseVal.call(self, $.xljUtils.htmlDecode(value));
					} else {
						value = $.xljUtils.htmlEncode(baseVal.call(self));
					}
					
				}
			}
			if (!isSetter) {
				if (attrValue == 'true' && !$.xljUtils.isEmpty(value)) {
					value = value.replace(/\\/g,"\\\\");//为\加\，实现转义
					value = value.replace(/'/g,"\\\'");//为单引号加\，实现转义
				}
				return value;
			}
			return this;
		}
	}($.fn.val);
	
    $.fn.extend({
    	serializeObject:function(){
	        var serializeObj = {};
	        var array = this.serializeArray();
	        $(array).each(function() {
	            if (serializeObj[this.name]) {
	                if ($.isArray(serializeObj[this.name])) {
	                    serializeObj[this.name].push(this.value);
	                } else {
	                    serializeObj[this.name] = [serializeObj[this.name],this.value];
	                }
	            } else {
	                serializeObj[this.name]=this.value;    
	            }
	        });
	        return serializeObj;
	    },
    });

    $(function () {

        if($.xljUtils.getUrlParams()._s){
            sessionSign = $.xljUtils.getUrlParams()._s;
        }

        //重写open方法，拦截open的url，为url添加session标识参数
        var oldOpen = window.open;
        window.open = function (url,windowName,windowFeatures,replace) {
            var reg1 = /(\?tendCode=)|(&tendCode=)/g;
            var originSessionSign;
            if(reg1.test(url)){
                var tendCodeParam = url.substring(url.indexOf('?'));
                tendCodeParam = tendCodeParam.replace('?', '').replace(/&/g, '","');
                tendCodeParam = tendCodeParam.replace(/=/g, '":"');
                if (tendCodeParam != "") {
                    try{
                        tendCodeParam = JSON.parse('{"' + tendCodeParam + '"}');
                        originSessionSign = tendCodeParam.tendCode;
                    }catch(e){}

                }

            }

            var reg = /(\?_s=)|(&_s=)/g;
            var paramStart = url.indexOf('?');
            if(paramStart>=0){
                if(!reg.test(url)){
                    if(originSessionSign){
                        url = url+'&_s='+originSessionSign;
                    }else{
                        url = url+'&_s='+sessionSign;
                    }

                }
            }else{
                if(!reg.test(this.url)){
                    url = url+'?_s='+sessionSign;
                }
            }
            var newWin;
            if(replace){
                newWin = oldOpen(url,windowName,windowFeatures,replace);
                return newWin;
            }
            if(windowFeatures){
                newWin = oldOpen(url,windowName,windowFeatures);
                return newWin;
            }
            if(windowName){
                newWin = oldOpen(url,windowName);
                return newWin;
            }
            newWin = oldOpen(url);
            return newWin;
        };

        //拦截所有ajax请求url，为请求加上session标识
        jQuery.ajaxSetup({
            beforeSend:function (xhr) {
                if($.xljUtils.getUrlParams()['_s']){
                    var reg = /(\?_s=)|(&_s=)/g;
                    //var paramStart = this.url.indexOf('?');
                    if(this.url!=null&&this.url.indexOf('?')>=0){

                        if(!reg.test(this.url)){
                            this.url = this.url+'&_s='+sessionSign;
                        }
                    }else{
                        if(!reg.test(this.url)){
                            this.url = this.url+'?_s='+sessionSign;
                        }
                    }
                }

            }
        });

        //改变窗口大小事件
        $(window).on('resize', function () {
            //setTimeout(function () {
               $.xljUtils.resizeNestedGrid();
            //},500);
        });

        $.xljUtils.addCustomValidateMethod();

        $.xljUtils.customValidate();

        //首页logo点击事件
        $('.xj-index-logo img:not(#logoImg)').on('click',function () {
            window.location.href = hostUrl + 'index.html';
        });

        //初始化系统logo
        function initSysLogo() {
            $.ajax({
                url:hostUrl+'sys/sysLogo/getLogo?_s='+sessionSign+'&time='+Math.random(),
                type:'GET',
                dataType:'JSON',
                success:function (resultData) {
                    if(resultData&&resultData.success){
                        var result = resultData.result;
                        if(result != null){
                            $('.xj-index-logo img').attr('src',result.url.indexOf("http://")>-1?result.url:hostUrl+result.url);
                            $('.xj-index-logo img').attr("alt",result.name);
                        }
                    }
                },
                error:function (xhr) {
                }
            });
        }

        initSysLogo();

    });
})(jQuery);
