/*
 * 附件上传下载jQuery扩展
 *
 * 调用方法：
 *
 * 1.控件初始化
 * $(selector).xljAttachment({
 *     appId:(应用ID，必须),
 *     businessId:(业务ID，必须),
 *     categoryId:(附件分类ID，必须),
 *     mode:(三种加载模式：'add','edit','view'，默认'add')主要针对表单附件中存在上传,
 *     isTable:(是否是表单附件，true:表单附件,false:流程附件，默认为表单附件)
 *     singleUpload:(默认false,单附件上传请指定true),
 *     autoSubmit:是否自动提交到附件正式表，自动提交到正式表时，不需要再次提交附件信息，默认false
 *     fromTempTable:初始化时是否从临时表里加载附件信息，默认false,
 *     fileUploaded:附件上传之后的回调函数，用于自定义处理上传完成之后返回的附件信息,
 *     hideButtonsWithNoFile:没有附件信息时隐藏操作按钮连接，默认为false，不隐藏；为true时，无附件时隐藏操作按钮
 * });
 * selecter为自己表单放置附件的父元素选择器
 *
 * 例如：
 * add表单：
 * 	$('.attachment-container').xljAttachment({appId:'1',businessId:'122',categoryId:'1'});
 * 	或者 $('.attachment-container').xljAttachment({appId:'1',businessId:'122',categoryId:'1',mode:'add'});
 *
 * 修改编辑表单：
 * 	$('.attachment-container').xljAttachment({appId:'1',businessId:'122',categoryId:'1',mode:'edit'});
 *
 * 预览页面：
 * $('.attachment-container').xljAttachment({appId:'1',businessId:'122',categoryId:'1',mode:'view'});
 *
 * 2.附件信息提交：
 * $(selector).xljAttachmentSubmit();
 *
 * 创建者：haoqipeng 2017-03-27
 */

;(function($, window, document, undefined) {
    if (!$.xljUtils) {
        $.extend({xljUtils:{}});
    }

    $.extend($.xljUtils, {
        /** 文件服务器地址 */
        // serverAddr:location.origin,
        serverAddr: 'http://127.0.0.1:9999/platform-app/',
        /** fdfs存储服务端口 */
        fdfsStoragePort: '38727',
        /** 控件初始化模式：add-添加， edit-编辑修改， view-浏览， view-列表*/
        modeEnum:{
            add:'add',edit:'edit',view:'view',isTable:true
        },
        uploadResultCode:{
            uploadUnfinished:1,uploadfinished:2, uploadError:3, noSubmitData:4,checkError:5, autoSubmited:6
        },
        uploadStatus:{
            started:1,finished:2,uploading:3, progress100:4
        },
        /**
         * 格式化文件大小
         */
        formatFileSize : function(bytes) {
            if (typeof bytes !== 'number') {
                return '';
            }
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' GB';
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' MB';
            }
            return (bytes / 1000).toFixed(2) + ' KB';
        },
        /**
         * 将总秒数换算成 0d 00:00:00
         */
        formatTime : function(seconds) {
            var date = new Date(seconds * 1000), days = Math.floor(seconds / 86400);
            days = days ? days + 'd ' : '';
            return days + ('0' + date.getUTCHours()).slice(-2) + ':'
                + ('0' + date.getUTCMinutes()).slice(-2) + ':'
                + ('0' + date.getUTCSeconds()).slice(-2);
        },

        /**
         * 根据最大长度格式化字符串
         */
        formatStringByLength:function(val, maxLength) {
            if (val === undefined || val == null || val.constructor != String) return val;
            if (maxLength === undefined || maxLength == null) return val;
            var valLength = 0;
            var subString = val;
            for (var i = 0; i < val.length; i++) {
                valLength ++;
                if (val.charCodeAt(i) > 127) {
                    valLength ++;
                }
                if (valLength >= maxLength) {
                    subString = val.substring(0, i) + '...';
                    break;
                }
            }
            // if (valLength <= maxLength) return val;
            // return val.substr(0, (maxLength/2 - 2)) + '...' + val.substr(-(maxLength/2) + 2);
            return subString;
        },

        /**
         * 查询附件URL列表
         * @param appId 应用ID
         * @param businessId 业务ID
         * @param categoryId 附件分类ID
         * @param callback 回调函数
         * 		callback(okFlag, data): okFlag=true时，data为controller返回的JSON，附件URL为data.result[index].url
         * 								okFlag=false时，data为ajax请求的xhr对象
         *
         * @param isAsync 是否异步，默认true
         */
        queryAttachmentUrlList:function(appId, businessId, categoryId, callback,isAsync) {
            if(typeof isAsync == 'undefined'){
                isAsync = true;
            }
            $.ajax({
                url:$.xljUtils.serverAddr + 'univ/attachment/attachment/queryUrlList',
                type:'POST',
                contentType: "application/json",
                data:JSON.stringify({appId: appId, businessId: businessId, categoryId:categoryId}),
                dataType:"JSON",
                async:isAsync,
                success:function(dt) {
                    callback(true, dt);
                },
                error:function(xhr) {
                    callback(false, xhr);
                }
            });
        },
        tip:function (skinType,text,time) {
            if(this.options['customApp']){
                $(document).dialog({
                    type : 'notice',
                    infoText: text,
                    autoClose: 2500,
                    position: 'top'  // center: 居中; bottom: 底部
                });
                return;
            }
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
         * 附件下载
         * @param {String} appId 应用ID
         * @param {String} businessId 表单业务ID
         * @param {String} categoryId 附件分类ID
         */
        xljDownLoad: function(appId, businessId, categoryId) {
            $.xljUtils.queryAttachmentUrlList(appId, businessId, categoryId, function(successFlag, obj) {
                // 查询成功
                if (successFlag == true) {
                    if(obj.result && obj.result.constructor == Array) {
                        if (obj.result.length == 1) {
                            var fileUrl;
                            if (obj.result[0].type == 'url') {
                                fileUrl = obj.result[0].url;
                                window.open(encodeURI(encodeURI(fileUrl)), '_blank');
                            } else {
                                var fileName = obj.result[0].fullName;
                                if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
                                    fileName = encodeURI(encodeURI(fileName));
                                }
                                fileUrl = obj.result[0].url.replace(/:8080/g, ':' + $.xljUtils.fdfsStoragePort) + '/' + obj.result[0].path + '?filename=' + fileName;
                                window.open(fileUrl, '_self');
                            }
                        } else if (obj.result.length > 1) {
                            $.xljUtils.tip('blue', '查询出多个文件，无法定位文件，请联系管理员');
                        } else {
                            $.xljUtils.tip('blue', '文件不存在');
                        }
                    } else {
                        $.xljUtils.tip('blue', '文件不存在');
                    }
                } else {
                    $.xljUtils.tip('blue', '文件下载失败，请稍后重试');
                }
            });
        },

        /**
         * 根据文件路径和文件名下载文件
         * @param {String} filePath 文件路径
         * @param {String} fileName 文件名
         */
        xljDownloadFromFileInfo: function (filePath, fileName) {
            $.post($.xljUtils.serverAddr + "univ/attachment/attachment/getStorageIP",
                { filePath: filePath },
                function (ip) {
                    if (ip) {
                        // 火狐浏览器不做转码处理
                        if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
                            fileName = encodeURI(encodeURI(fileName));
                        }
                        window.open(['http://' + ip + ':', $.xljUtils.fdfsStoragePort, '/', filePath, '?filename=', fileName].join(''), "_self");
                    }
                }
            );
        },

        getUuid:function(callback) {
            $.ajax({
                type:'get',
                url:$.xljUtils.serverAddr + "sys/uuid/generator/getGuuid"+"?time="+Math.random(),
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
        // 判空
        isEmpty:function(val) {
            if (val === undefined || val === null || val === '') {
                return true;
            }
            return false;
        },
        replaceNull:function(val, rpl) {
            if (rpl === undefined || rpl === null) rpl = '';
            if ($.xljUtils.isEmpty(val)) return rpl;
            return val;
        }

    });

    var XljAttachment = function(ele, opts) {
        this.$element = ele;
        this.$element.data('uploadFinished', $.xljUtils.uploadStatus.finished);
        this.defaults = {
            appId:null,
            businessId:null,
            categoryId:null,
            customApp:false,
            serverAddr:$.xljUtils.serverAddr,
            singleUpload:false,// 是否单附件上传
            mode:'add',// 是否新增表单上传附件 默认为上传
            isTable:true,//是否表单展示  默认为表单附件
            fileList:{oldList:[], newList:[],totalSize:0},
            fileUploaded:function(){},
            autoSubmit: false,// 是否自动提交
            fromTempTable: false,
            loadFilesDone:function(){},
            hideButtonsWithNoFile: false,
            isAsyncSubmit:true,// 是否异步保存附件信息
            onShowModalEvent:function(){},// modal打开触发事件
            onHideModalEvent:function(){},//modal关闭出发事件
            addUrlClickEvent:null // 添加url附件点击事件
        };
        this.options = $.extend({},this.defaults, opts);
        $.xljUtils.serverAddr = this.options.serverAddr;
    };

    XljAttachment.prototype = {
        // 添加控件内容到页面
        _createAttachmentModal:function(){
            var attHtmls = [];
            // table显示附件列表
            if (this.options.isTable == $.xljUtils.modeEnum.isTable) {
                var _aClass = this.options.mode == $.xljUtils.modeEnum.view ?"mui-navigate-right":"custom-add-btn";
                var _vClass = this.options.mode == $.xljUtils.modeEnum.view ?"attachNum":"attachAddFiels";
                attHtmls.push('<a class="'+_aClass+'" href="javascript:void(0)">附件<div id="attachmentSum" class="'+_vClass+'"></div></a>');
                attHtmls.push('<div class="mui-collapse-content up_files">');
                attHtmls.push('		<ul class="attachment-box clearfix attachmentList"></ul>');
                attHtmls.push('</div>');
                this.$element.html(attHtmls.join(''));
            }
            return this;
        },
        // 实例化选项检查
        _initOptionsCheck:function(){
            var msgs = [];
            // 浏览模式下可以不传递appid
            if (this.options.mode != $.xljUtils.modeEnum.view && this.options.mode != $.xljUtils.modeEnum.table) {
                if ($.xljUtils.isEmpty(this.options['appId'])) {
                    msgs.push('应用ID');
                }
            }
            if ($.xljUtils.isEmpty(this.options['businessId'])) {
                msgs.push('业务ID');
            }
            if ($.xljUtils.isEmpty(this.options['categoryId'])) {
                msgs.push('附件分类ID');
            }
            return msgs.length == 0?null:'初始化参数【' + msgs.join('、') + '】不能为空' ;
        },
        // 附件列表查询
        _queryList:function() {
            var chkMsg = this._initOptionsCheck();
            if (chkMsg != null) {
                $.xljUtils.tip('red',chkMsg);
                return false;
            }
            var that = this;
            if(this.options.isTable != $.xljUtils.modeEnum.isTable){
                // 查询时可以不传appid
                var queryParam = {businessId: this.options.businessId, categoryId:this.options.categoryId,sidx:"CONVERT( name USING gbk ) COLLATE gbk_chinese_ci",sord:"asc"};
                if (!$.xljUtils.isEmpty(this.options.appId)) {
                    queryParam.appId = this.options.appId;
                }
                $.ajax({
                    url:'http://127.0.0.1:9999/platform-app/univ/attachment/attachment/queryList',
                    type:'POST',
                    contentType: "application/json",
                    data:JSON.stringify(queryParam),
                    dataType:"JSON",
                    success:function(dt) {
                        var clist = [];
                        if (dt.result != null) {
                            clist = dt.result;
                        }
                        // 从正式表加载附件
                        if (!that.options.fromTempTable) {
                            that.options.fileList.oldList = clist;
                        }
                        // 从临时表加载附件
                        else {
                            that.options.fileList.newList = clist;
                            $.each(clist, function(index, item){
                                delete item.fileBytes;
                            });
                        }
                        $.each(clist, function(index, item){
                            that.options.fileList.totalSize += item.fileSize;
                        });
                        var attFliesSum = 0;
                        $(".attachmentList",that.$element).empty();
                        var flAtt = $('<ul class="attachment-box" style="display: none;">');
                        $.each(dt.result, function (index, file) {
                            var fullName = file.fullName;
                            var smallIcon = "default"
                            if(fullName.indexOf("pdf")>=0){
                                smallIcon = "pdf";
                            }
                            if(fullName.indexOf("doc")>=0){
                                smallIcon = "word";
                            }
                            if(fullName.indexOf("xls")>=0){
                                smallIcon = "excel";
                            }
                            if(fullName.indexOf("rar")>=0 || fullName.indexOf("zip")>=0 ){
                                smallIcon = "rarzip";
                            }
                            if(fullName.indexOf("ppt")>=0){
                                smallIcon = "ppt";
                            }
                            if(fullName.indexOf("txt")>=0){
                                smallIcon = "txt";
                            }

                            if(fullName.indexOf("bmp")>=0 || fullName.indexOf("tif")>=0
                                || fullName.indexOf("jpg")>=0 || fullName.indexOf("png")>=0 ){
                                smallIcon = "picture";
                            }
                            str =  $("<li/>").on("click",function() {
                                var officeType = '*.pdf;*.doc;*.ppt;*.xls;*.docx;*.pptx;*.xlsx';
                                var pngType = "image/jpg,image/jpeg,image/png,image/gif";
                                // if(file.fileSize>10240000){
                                //     alert("附件过大请下载后查看！");
                                //     return false;
                                // }
                                if("url"==file.type){
                                    window.location.href=file.url;
                                }else{
                                    var obj = {};
                                    obj.FILENAME = file.path.substring(file.path.lastIndexOf('/') + 1);
                                    obj.GROUP = file.path;
                                    obj.NAME = file.name;
                                    var extensionName = obj.GROUP.substring(obj.GROUP.lastIndexOf(".") + 1);
                                    if (officeType.indexOf(extensionName.toLowerCase()) > -1) {
                                        $.ajax({
                                            url: "/platform-app/univ/attachment/attachment/docConverter" + "?time=" + Math.random(),
                                            data: JSON.stringify(obj),
                                            type: "POST",
                                            contentType: 'application/json',
                                            dataType: 'JSON',
                                            async: false,
                                            success: function (resultData) {
                                                if (resultData) {
                                                    var successFlag = resultData.success;
                                                    debugger;
                                                    if (successFlag) {
                                                       var exName =  resultData.msg.substring(resultData.msg.lastIndexOf(".")+1);
                                                        if("html"==exName){
                                                            // window.location.href=$.xljUtils.serverAddr+resultData.msg;
                                                            window.location.href=encodeURI(encodeURI($.xljUtils.serverAddr+"/mobile/approve/approve_view.html?path="+resultData.msg.replace(/\\/g,"/")+"&fileName="+file.name));
                                                        }else{
                                                            window.location.href=encodeURI(encodeURI($.xljUtils.serverAddr+"/pdf/viewer.html?path="+resultData.msg.replace(/\\/g,"/")+"&fileName="+file.name));
                                                        }
                                                    } else {
                                                        $.xljUtils.tip("red", '获取静态页面失败！');
                                                    }
                                                }
                                            },
                                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                                            }
                                        });
                                    } else if(pngType.indexOf(extensionName.toLowerCase()) > -1){
                                        $.post($.xljUtils.serverAddr + "univ/attachment/attachment/getStorageIP",
                                            { filePath: file.path },
                                            function (ip) {
                                                if (ip) {
                                                    // window.location.href=location.protocol + '//' +ip+":"+$.xljUtils.fdfsStoragePort+"/"+file.path;
                                                    window.location.href=encodeURI(encodeURI($.xljUtils.serverAddr+"/mobile/approve/approve_view.html?path="+location.protocol + '//' +ip+":"+$.xljUtils.fdfsStoragePort+"/"+file.path+"&fileName="+file.name));
                                                }
                                            }
                                        );
                                        //window.location.href=location.protocol + '//' +file.url+":"+$.xljUtils.fdfsStoragePort+"/"+file.path;
                                    }else{
                                        alert("该文件不支持预览,请在电脑上查看！")
                                        return;
                                    }
                                }
                        }).append("<img src=\"../myimg/attach_suffix/"+smallIcon+"_s.png\"><span title=\""+file.fullName+"\" class=\"tit\">"+file.fullName+"</span>");
                            flAtt.append(str);
                            attFliesSum +=1;
                        });
                        if(attFliesSum!=0){
                            $($(that.$element)[0].parentNode.parentNode).find("ul").remove();
                            $($(that.$element)[0].parentNode.parentNode).append(flAtt);
                        }else{
                            // alert("该记录没有上传附件！")
                            $($(that.$element)[0]).remove();
                        }
                    },
                    error:function(xhr){
                        $.xljUtils.getError(xhr.status);
                    }
                });
            }else if (that.options.mode == $.xljUtils.modeEnum.view) {
                // 查询时可以不传appid
                var queryParam = {businessId: this.options.businessId, categoryId:this.options.categoryId};
                if (!$.xljUtils.isEmpty(this.options.appId)) {
                    queryParam.appId = this.options.appId;
                }
                $.ajax({
                    url:this.options.serverAddr + 'univ/attachment/attachment'+(that.options.fromTempTable?'Temp':'')+'/queryList',
                    type:'POST',
                    contentType: "application/json",
                    data:JSON.stringify(queryParam),
                    dataType:"JSON",
                    success:function(dt) {
                        var clist = [];
                        if (dt.result != null) {
                            clist = dt.result;
                        }
                        // 从正式表加载附件
                        if (!that.options.fromTempTable) {
                            that.options.fileList.oldList = clist;
                        }
                        // 从临时表加载附件
                        else {
                            that.options.fileList.newList = clist;
                            $.each(clist, function(index, item){
                                delete item.fileBytes;
                            });
                        }
                        $.each(clist, function(index, item){
                            that.options.fileList.totalSize += item.fileSize;
                        });
                        var attFliesSum = 0;
                        $(".attachmentList",that.$element).empty();
                        $.each(dt.result, function (index, file) {
                            var fullName = file.fullName;
                            var smallIcon = "default"
                            if(fullName.indexOf("pdf")>=0){
                                smallIcon = "pdf";
                            }
                            if(fullName.indexOf("doc")>=0){
                                smallIcon = "word";
                            }
                            if(fullName.indexOf("xls")>=0){
                                smallIcon = "excel";
                            }
                            if(fullName.indexOf("rar")>=0 || fullName.indexOf("zip")>=0 ){
                                smallIcon = "rarzip";
                            }
                            if(fullName.indexOf("ppt")>=0){
                                smallIcon = "ppt";
                            }
                            if(fullName.indexOf("txt")>=0){
                                smallIcon = "txt";
                            }

                            if(fullName.indexOf("bmp")>=0 || fullName.indexOf("tif")>=0
                                || fullName.indexOf("jpg")>=0 || fullName.indexOf("png")>=0 ){
                                smallIcon = "picture";
                            }
                            str =  $("<li/>").on("click",function() {
                                    var officeType = '*.pdf;*.doc;*.ppt;*.xls;*.docx;*.pptx;*.xlsx';
                                    var pngType = "image/jpg,image/jpeg,image/png,image/gif";
                                    // if(file.fileSize>10240000){
                                    //     alert("附件过大请下载后查看！");
                                    //     return false;
                                    // }
                                    if("url"==file.type){
                                        window.location.href=file.url;
                                    }else {
                                        var obj = {};
                                        obj.FILENAME = file.path.substring(file.path.lastIndexOf('/') + 1);
                                        obj.GROUP = file.path;
                                        obj.NAME = file.name;
                                        var extensionName = obj.GROUP.substring(obj.GROUP.lastIndexOf(".") + 1);
                                        if (officeType.indexOf(extensionName.toLowerCase()) > -1) {
                                            $.ajax({
                                                url: "/platform-app/univ/attachment/attachment/docConverter" + "?time=" + Math.random(),
                                                data: JSON.stringify(obj),
                                                type: "POST",
                                                contentType: 'application/json',
                                                dataType: 'JSON',
                                                async: false,
                                                success: function (resultData) {
                                                    if (resultData) {
                                                        var successFlag = resultData.success;
                                                        debugger;
                                                        if (successFlag) {
                                                            var exName = resultData.msg.substring(resultData.msg.lastIndexOf(".") + 1);
                                                            if ("html" == exName) {
                                                                // window.location.href=$.xljUtils.serverAddr+resultData.msg;
                                                                window.location.href = encodeURI(encodeURI($.xljUtils.serverAddr + "/mobile/approve/approve_view.html?path=" + resultData.msg.replace(/\\/g, "/") + "&fileName=" + file.name));
                                                            } else {
                                                                window.location.href = encodeURI(encodeURI($.xljUtils.serverAddr + "/pdf/viewer.html?path=" + resultData.msg.replace(/\\/g, "/") + "&fileName=" + file.name));
                                                            }
                                                        } else {
                                                            $.xljUtils.tip("red", '获取静态页面失败！');
                                                        }
                                                    }
                                                },
                                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                                                }
                                            });
                                        } else if (pngType.indexOf(extensionName.toLowerCase()) > -1) {
                                            $.post($.xljUtils.serverAddr + "univ/attachment/attachment/getStorageIP",
                                                {filePath: file.path},
                                                function (ip) {
                                                    if (ip) {
                                                        // window.location.href=location.protocol + '//' +ip+":"+$.xljUtils.fdfsStoragePort+"/"+file.path;
                                                        window.location.href = encodeURI(encodeURI($.xljUtils.serverAddr + "/mobile/approve/approve_view.html?path=" + location.protocol + '//' + ip + ":" + $.xljUtils.fdfsStoragePort + "/" + file.path + "&fileName=" + file.name));
                                                    }
                                                }
                                            );
                                            //window.location.href=location.protocol + '//' +file.url+":"+$.xljUtils.fdfsStoragePort+"/"+file.path;
                                        } else {
                                            alert("该文件不支持预览,请在电脑上查看！")
                                            return;
                                        }
                                    }
                                }).append("<img src=\"../myimg/attach_suffix/"+smallIcon+"_s.png\"><span title=\""+file.fullName+"\" class=\"tit\">"+file.fullName+"</span>");
                            $(".attachmentList",that.$element).append(str);
                            attFliesSum +=1;
                        });
                        $("#attachmentSum",that.$element).empty().append(attFliesSum);
                        //无附件则隐藏附件插件
                        if(clist.length==0){
                            $(that.$element).remove();
                        }
                    },
                    error:function(xhr){
                        $.xljUtils.getError(xhr.status);
                    }
                });
            }else if(that.options.mode == $.xljUtils.modeEnum.edit){
                // 查询时可以不传appid
                var queryParam = {businessId: this.options.businessId, categoryId:this.options.categoryId};
                if (!$.xljUtils.isEmpty(this.options.appId)) {
                    queryParam.appId = this.options.appId;
                }
                $.ajax({
                    url:this.options.serverAddr + 'univ/attachment/attachment'+(that.options.fromTempTable?'Temp':'')+'/queryList',
                    type:'POST',
                    contentType: "application/json",
                    data:JSON.stringify(queryParam),
                    dataType:"JSON",
                    success:function(dt) {
                        var clist = [];
                        if (dt.result != null) {
                            clist = dt.result;
                        }
                        // 从正式表加载附件
                        if (!that.options.fromTempTable) {
                            that.options.fileList.oldList = clist;
                        }
                        // 从临时表加载附件
                        else {
                            that.options.fileList.newList = clist;
                            $.each(clist, function(index, item){
                                delete item.fileBytes;
                            });
                        }
                        $.each(clist, function(index, item){
                            that.options.fileList.totalSize += item.fileSize;
                        });
                        $(".attachmentList",that.$element).empty();
                        $.each(dt.result, function (index, file) {
                            var fullName = file.fullName;
                            var smallIcon = "default"
                            if(fullName.indexOf("pdf")>=0){
                                smallIcon = "pdf";
                            }
                            if(fullName.indexOf("doc")>=0){
                                smallIcon = "word";
                            }
                            if(fullName.indexOf("xls")>=0){
                                smallIcon = "excel";
                            }
                            if(fullName.indexOf("rar")>=0 || fullName.indexOf("zip")>=0 ){
                                smallIcon = "rarzip";
                            }
                            if(fullName.indexOf("ppt")>=0){
                                smallIcon = "ppt";
                            }
                            if(fullName.indexOf("txt")>=0){
                                smallIcon = "txt";
                            }
                            if(fullName.indexOf("bmp")>=0 || fullName.indexOf("tif")>=0
                                || fullName.indexOf("jpg")>=0 || fullName.indexOf("png")>=0 ){
                                smallIcon = "picture";
                            }
                                var fileLi = $('<li/>');
                                var context = (file.createDate.length > 10?(file.createDate.substr(0,10)):(file.createDate))
                                    + ', ' + $.xljUtils.replaceNull(file.createPersonName,'--');
                                fileLi.append(
                                    $('<img class="fileType"/>').attr('src', function() {
                                        if(file.fullName && /.docx?$/g.test(file.fullName)) {
                                            return that.options.serverAddr + 'univ/images/doc02.png';
                                        } else {
                                            return that.options.serverAddr + 'univ/images/doc03.png';
                                        }
                                    })
                                ).append(
                                    $('<div class="fileName"/>').append(
                                        $('<p/>').text(file.fullName).attr('title',file.fullName))
                                        .append($('<p/>').text(that._showTotalSize(file.fileSize))
                                            .append($('<p/>').text(context).attr('title',context))
                                        )
                                ).append($('<a class="del_li up_delete" href="javascript:void(0);"><span class="close_offset"></span></a>'));
                                $('.up_files ul', that.$element).append(fileLi);

                                // 下载
                                that._bindDownloadEvent(fileLi.find('.fileName p:eq(0)'), file);

                                fileLi.find('a.up_delete').on('click', function(e) {
                                    var node = $(this).parent();
                                    $.ajax({
                                        url:that.options.serverAddr + 'univ/attachment/attachment/deletefile',
                                        type:'POST',
                                        dataType:'JSON',
                                        contentType:'application/json',
                                        data:JSON.stringify(file),
                                        success:function(rs) {
                                            if (rs.success) {
                                                var nodeParent = node.parent();
                                                node.remove();
                                                that._removeInfoFromFileList(file);
                                                //$('.up_info', that.$element).text('(上传完成，总文件大小' + $.xljUtils.replaceNull($.xljUtils.formatFileSize(that.options.fileList.totalSize,'--')) + ')');
                                                //that._setTotalSize();
                                                if (that.options['singleUpload'] === false) {
                                                    if (nodeParent.children('li').size()==0) {
                                                        that._hideTotalProgressInfo();
                                                    }
                                                }

                                            } else {
                                                $.xljUtils.tip('red','附件删除失败');
                                            }
                                        },
                                        error:function(xhr){
                                            $.xljUtils.getError(xhr.status);
                                        }
                                    });
                                });


                                fileLi.find('.fileName p:eq(0)').on('mouseover',function(){
                                    $(this).css({'cursor':'pointer','text-decoration':'underline'});
                                }).on('mouseout',function(){
                                    $(this).css({'cursor':'','text-decoration':''});
                                });
                        });
                    }
                });
                $("#attachmentSum",that.$element).empty().append('<a href="javascript:void(0);" class="fileinput-button"><span>添加附件</span><input id="fileupload" class="fileupload" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" name="files[]" multiple></a><span></span>');
            }else{
                $("#attachmentSum",that.$element).empty().append('<a href="javascript:void(0);" class="fileinput-button"><span>添加附件</span><input id="fileupload" class="fileupload" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" name="files[]" multiple></a>');
            }
        },
        // 附件信息提交
        _submit: function(callback) {
            var that = this;
            if (that.$element.data('uploadFinished') != $.xljUtils.uploadStatus.finished) {
                $.xljUtils.tip('blue','附件正在上传，请稍后提交...');
                if (typeof callback === "function") {
                    callback(false, {msg:'附件正在上传，请稍后提交...',code:$.xljUtils.uploadResultCode.uploadUnfinished,success:false});
                }
                return;
            }
            // 如果没有附件
            if (this.options.fileList.newList.length == 0) {
                if (typeof callback === "function") {
                    callback(true, {msg:'没有要提交的附件信息',code:$.xljUtils.uploadResultCode.noSubmitData,success:false});
                }
                return;
            }
            $.ajax({
                url:this.options.serverAddr + 'univ/attachment/attachment/saveBatch',
                type:'POST',
                //async: this.options.isAsyncSubmit,
                contentType: "application/json",
                data:JSON.stringify(this.options.fileList.newList),
                dataType:"JSON",
                /*success:function(dt) {
                 if (typeof callback === "function") {
                 callback(true, dt);
                 }
                 },
                 error:function(xhr){
                 if (typeof callback === "function") {
                 callback(false, xhr);
                 }
                 },*/
                complete:function(xhr,ts) {
                    if (typeof callback === "function") {
                        if (xhr.status == 200) {
                            // 提交成功则清空文件信息
                            if (xhr.responseJSON.success == true) {
                                that.options.fileList.oldList = that.options.fileList.oldList.concat(that.options.fileList.newList);
                                that.options.fileList.newList = [];
                            }
                            callback(true, xhr.responseJSON);
                        } else {
                            callback(false, $.extend(xhr,{code:$.xljUtils.uploadResultCode.uploadError}));
                        }
                    }
                }
            });
        },
        // 创建附件信息展示内容
        _createFileInfoEle: function(file) {
            var that = this;
            return $("<li/>").append(
                $('<img class="fileType"/>').attr('src', function() {
                    var smallIcon = "default"
                    var fullName = file.name.substring(file.name.lastIndexOf('.')+1);
                    if(fullName.indexOf("pdf")>=0){
                        smallIcon = "pdf";
                    }
                    if(fullName.indexOf("doc")>=0){
                        smallIcon = "word";
                    }
                    if(fullName.indexOf("xls")>=0){
                        smallIcon = "excel";
                    }
                    if(fullName.indexOf("rar")>=0 || fullName.indexOf("zip")>=0 ){
                        smallIcon = "rarzip";
                    }
                    if(fullName.indexOf("ppt")>=0){
                        smallIcon = "ppt";
                    }
                    if(fullName.indexOf("txt")>=0){
                        smallIcon = "txt";
                    }
                    return that.options.serverAddr + 'mobile/myimg/attach_suffix/'+smallIcon+'_s.png';
                })
            ).append(
                $('<div class="fileName"/>').append($('<p/>').text(file.name).attr('title',file.name))
                    .append($('<p class="clearfix"/>')
                        .append($('<div class="progress up_progress"/>')
                            .append($('<div/>',{
                                    'class':'progress-bar progress-bar-info',
                                    role:'progressbar',
                                    'aria-valuemin':'0',
                                    'aria-valuemax':'100',
                                    style:'width:0%'
                                }).append($('<span class="sr-only"/>').text('20% Complete'))
                            )
                        ).append($('<span class="up_size"/>').text('0%'))
                        .append($('<span class="up_status"/>').text('剩余时间：').append($('<i/>')))

                    )
            ).append($('<a class="del_li up_delete" href="javascript:void(0);"><span class="close_offset"></span></a>'));
        },
        // 添加附件操作处理
        _fileAdd:function(e, data) {
            var that = this;
            var isNull = false;
            // 多附件上传，显示整体统计信息
            $.each(data.files, function (index, file) {
                //判断文件大小
                if(file.size<=0){
                    isNull = true;
                    $.xljUtils.tip('blue','不能上传空文件！');
                    return false;
                }
                // 1、文件类型

                var fileLi = that._createFileInfoEle(file);
                // if (isSingleUpload) {
                //     $('.up_files ul', that.$element).html(fileLi);
                // } else {
                    $('.up_files ul', that.$element).append(fileLi);
                // }
                data.context = fileLi;
            });
            if(isNull){
                return false;
            }
            that.$element.data('uploadFinished', $.xljUtils.uploadStatus.started);
            // 附件上传
            var jqXHR = data.submit()
                .success(function (result, textStatus, jqXHR) {
                    // console.log(result);
                }).error(function (jqXHR, textStatus, errorThrown) {
                    // console.log(errorThrown);
                }).complete(function (result, textStatus, jqXHR) {
                    // console.log(result);
                });
            // 上传过程中删除事件处理
            data.context.find('.up_delete').on('click', function(e){
                jqXHR.abort();
                //var nodeParent = $(this).parent().parent();
                $(this).parent().remove();
                // if (!that.options.isSingleUpload) {
                //     // 附件全部删除，重置整体统计信息
                //     if (nodeParent.children('li').size()==0) {
                //         that._hideTotalProgressInfo();
                //     }
                // }
            });

        },
        // 绑定下载事件
        _bindDownloadEvent:function(target, file) {
            var that = this;
            target.on('click',function() {
                var officeType = '*.pdf;*.doc;*.ppt;*.xls;*.docx;*.pptx;*.xlsx';
                var pngType = "image/jpg,image/jpeg,image/png,image/gif";
                if("url"==file.type){
                    window.location.href=file.url;
                }else {
                    var obj = {};
                    obj.FILENAME = file.path.substring(file.path.lastIndexOf('/') + 1);
                    obj.GROUP = file.path;
                    obj.NAME = file.name;
                    var extensionName = obj.FILENAME.substring(obj.FILENAME.lastIndexOf(".") + 1);
                    if (officeType.indexOf(extensionName.toLowerCase()) > -1) {
                        $.ajax({
                            url: "/platform-app/univ/attachment/attachment/docConverter" + "?time=" + Math.random(),
                            data: JSON.stringify(obj),
                            type: "POST",
                            contentType: 'application/json',
                            dataType: 'JSON',
                            async: false,
                            success: function (resultData) {
                                if (resultData) {
                                    var successFlag = resultData.success;
                                    if (successFlag) {
                                        var exName = resultData.msg.substring(resultData.msg.lastIndexOf(".") + 1);
                                        debugger;
                                        if ("html" == exName) {
                                            // window.location.href=$.xljUtils.serverAddr+resultData.msg;
                                            window.location.href = $.xljUtils.serverAddr + "/mobile/approve/approve_view.html?path=" + resultData.msg.replace(/\\/g, "/") + "&fileName=" + encodeURIComponent(file.name);
                                        } else {
                                            window.location.href = $.xljUtils.serverAddr + "/pdf/viewer.html?path=" + resultData.msg.replace(/\\/g, "/") + "&fileName=" + encodeURIComponent(file.name);
                                        }
                                    } else {
                                        $.xljUtils.tip("red", '获取静态页面失败！');
                                    }
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                            }
                        });
                    } else if (pngType.indexOf(extensionName.toLowerCase()) > -1) {
                        $.post($.xljUtils.serverAddr + "univ/attachment/attachment/getStorageIP",
                            {filePath: file.path},
                            function (ip) {
                                if (ip) {
                                    // window.location.href=location.protocol + '//' +ip+":"+$.xljUtils.fdfsStoragePort+"/"+file.path;
                                    window.location.href = $.xljUtils.serverAddr + "/mobile/approve/approve_view.html?path=" + location.protocol + '//' + ip + ":" + $.xljUtils.fdfsStoragePort + "/" + file.path + "&fileName=" + encodeURIComponent(file.name);
                                }
                            }
                        );
                    } else {
                        alert("该文件不支持预览,请在电脑上查看！")
                        return;
                    }
                }
            });
        },
        // 隐藏整体进度信息
        _hideTotalProgressInfo:function() {
            $('.up_info .totalpercent', this.$element).text(0);
            $('.up_info .totalloaded', this.$element).text(0);
            $('.up_info .totalsize', this.$element).text(0);
            $('.up_total .progress-bar', this.$element).css('width', '0%');
            $('.totalstatus', this.$element).addClass('hidden');
        },

        // 从列表中删除元素
        _removeInfoFromFileList:function(fileInfo) {
            if (fileInfo === undefined || fileInfo == null) return;
            if (fileInfo.constructor === Object) {
                var deleted = false;
                for (var i = 0,tempList = this.options.fileList.oldList; i < tempList.length; i++) {
                    if (tempList[i]['id'] === fileInfo['id']) {
                        tempList.splice(i, 1);
                        if (fileInfo.type=='file') {
                            this.options.fileList.totalSize -= fileInfo.fileSize;
                            this._setTotalSize();
                        }
                        return;
                    }
                }

                for (var i = 0,tempList = this.options.fileList.newList; i < tempList.length; i++) {
                    if (tempList[i]['id'] === fileInfo['id']) {
                        tempList.splice(i, 1);
                        if (fileInfo.type=='file') {
                            this.options.fileList.totalSize -= fileInfo.fileSize;
                            this._setTotalSize();
                        }
                        return;
                    }
                }
            }
        },
        // 计算总文件大小
        _getTotalFileSize:function() {
            var total = 0;
            $.each(this.options.fileList.oldList, function(index, item){
                total += (item.fileSize != null?item.fileSize:0);
            });
            $.each(this.options.fileList.newList, function(index, item){
                total += (item.fileSize != null?item.fileSize:0);
            });
            return total;
        },

        // 验证url名称重复
        _isExistUrlName: function(urlName) {
            var that = this;
            var isExist = false;
            $.each(this.options.fileList.oldList, function(index, item){
                if (item.type == 'url' && item.fullName == urlName) {
                    isExist = true;
                    return false;
                }
            });
            if (isExist) return true;
            $.each(this.options.fileList.newList, function(index, item){
                if (item.type == 'url' && item.fullName == urlName) {
                    isExist = true;
                    return false;
                }
            });
            return isExist;
        },
        // 附件控件初始化
        _init:function() {
            // appId, businessId, categoryId三项不能为空，否则页面初始化失败
            var chkMsg = this._initOptionsCheck();
            if (chkMsg != null) {
                $.xljUtils.tip('red',chkMsg + '，页面初始化失败');
                return null;
            }
            var that = this;
            // 预览模式不进行上传功能初始化
            if(this.options.isTable === $.xljUtils.modeEnum.isTable){
                if (this.options.mode === $.xljUtils.modeEnum.edit ||this.options.mode === $.xljUtils.modeEnum.add ) {
                    var uploadSubmitUrl;
                    if (that.options.autoSubmit === true) {
                        uploadSubmitUrl = this.options.serverAddr + 'univ/attachment/attachment/upload';
                    } else {
                        uploadSubmitUrl = this.options.serverAddr + 'univ/attachment/attachmentTemp/upload';
                    }

                    var $this = $('.fileupload', this.$element).fileupload({
                        url: uploadSubmitUrl,
                        dataType: 'json',
                        formData: {
                            appId: this.options.appId,
                            businessId: this.options.businessId,
                            categoryId: this.options.categoryId,
                            type: 'file'
                        },
                        autoUpload: false,
                        acceptFileTypes: /\.(gif|jpe?g|png|zip|rar|docx?|xlsx?)$/i,
                        maxFileSize: 102400000
                    }).on('fileuploadadd', function (e, data) {
                        e.stopPropagation();
                        // 添加文件
                        that._fileAdd(e, data);
                        var node = $(data.context);
                        if (that.isIE()) {
                            var progress = 9;
                            var progressWidth = 0;
                            var interval = setInterval(function () {
                                progressWidth = node.find('.progress .progress-bar').css('width');
                                if (progress > 90 || progressWidth == '100%') {
                                    clearInterval(interval);
                                }
                                node.find('.progress .progress-bar').css('width', progress + '%');
                                // 上传百分比进度
                                node.find('.up_size').text(progress + '%');
                                progress += 10;
                            }, 1000);
                        }
                    }).on('fileuploadprocessalways', function (e, data) {
                        // console.log('fileuploadprocessalways');
                    }).on('fileuploadprogress', function (e, data) {
                        // console.log('fileuploadprogress start ');
                        var node = $(data.context);

                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        node.find('.progress .progress-bar').css('width', progress + '%');
                        // 上传百分比进度
                        node.find('.up_size').text(progress + '%');
                        // 剩余时间
                        if (data.bitrate != 0) {
                            node.find('.up_status i').text($.xljUtils.formatTime(((data.total - data.loaded) * 8) / data.bitrate));
                        }

                    }).on('fileuploaddone', function (e, data) {
                        // console.log('fileuploaddone');
                        var node = $(data.context);
                        var resultData = data.result;
                        node.find('.progress').parent().remove();
                        node.find('.fileName').append($('</p>')
                            .addClass("fc")
                        //			    	.text(that._showTotalSize(data.files[0].size))
                        //that._showTotalSize(data.files[0].size)
                            .append($('<span class="up_status up_ok">' + (resultData.success ? '上传完成' : '上传失败') + '</span><span>' + that._showTotalSize(data.result.result[0].fileSize) + '</span>')));
                        if (that.options.singleUpload == true) {
                            that.$element.data('uploadFinished', $.xljUtils.uploadStatus.finished);
                        } else {
                            if (that.$element.data('uploadFinished') == $.xljUtils.uploadStatus.progress100) {
                                that.$element.data('uploadFinished', $.xljUtils.uploadStatus.finished);
                            }
                        }
                        var timeout = null;
                        timeout = setTimeout(function () {
                            var doneStatus = node.find('.fileName p .up_status');
                            $(doneStatus).removeClass('up_ok');
                            if (timeout) {
                                clearTimeout(timeout);
                            }
                        }, 1000);
                        node.find('.up_delete').off();
                        var isSingleUpload = that.options['singleUpload'] === false;
                        if (resultData.success) {
                            var fileInfo = $.extend({}, resultData.result[0]);
                            delete fileInfo.fileBytes;
                            that.options.fileList.newList.push(fileInfo);
                            that.options.fileList.totalSize += fileInfo.fileSize;
                            that._setTotalSize();
                            // 上传完成回调
                            if (that.options.fileUploaded != null && that.options.fileUploaded.constructor === Function) {
                                that.options.fileUploaded(fileInfo);
                            } else {

                            }
                            debugger;
                            // 绑定附件下载或查看事件
                            that._bindDownloadEvent(node.find('.fileName p:eq(0)'), fileInfo);

                            node.find('.fileName p:eq(0)').on('mouseover', function () {
                                $(this).css({'cursor': 'pointer', 'text-decoration': 'underline'});
                            }).on('mouseout', function () {
                                $(this).css({'cursor': '', 'text-decoration': ''});
                            });

                            node.find('.up_delete').on('click', function (e) {
                                $.ajax({
                                    url: that.options.serverAddr + 'univ/attachment/attachment/deletefile',
                                    type: 'POST',
                                    dataType: 'JSON',
                                    contentType: 'application/json',
                                    data: JSON.stringify(fileInfo),
                                    success: function (rs) {
                                        if (rs.success) {
                                            // console.log("..................delete success")
                                            var nodeParent = node.parent();
                                            node.remove();

                                            // 从附件列表信息中清除
                                            that._removeInfoFromFileList(fileInfo);
                                            //that._setTotalSize();
                                            if (that.options['singleUpload'] === false) {
                                                if (nodeParent.children('li').size() == 0) {
                                                    that._hideTotalProgressInfo();
                                                }
                                            }

                                        } else {
                                            $.xljUtils.tip('red', '附件删除失败');
                                        }
                                    },
                                    error: function (xhr) {
                                        $.xljUtils.getError(xhr.status);
                                    }
                                });
                            });
                        }
                        // 上传失败
                        else {
                            node.find('.up_delete').on('click', function (e) {
                                var nodeParent = node.parent();
                                node.remove();

                                if (that.options['singleUpload'] === false) {
                                    if (nodeParent.children('li').size() == 0) {
                                        that._hideTotalProgressInfo();
                                    }
                                }

                            });
                        }

                    }).on('fileuploadfail', function (e, data) {
                        // console.log('fileuploadfail');
                    }).on('fileuploadfinished', function (e, data) {
                        // console.log('fileuploadfinished start 3');
                    }).on('fileuploadcompleted', function (e, data) {
                        // console.log('fileuploadcompleted start 2');
                    }).on('fileuploadfailed', function (e, data) {
                        // console.log('fileuploadprogress start 1 ');
                    }).prop('disabled', !$.support.fileInput)
                        .parent().addClass($.support.fileInput ? undefined : 'disabled');
                    // 多附件上传绑定整体进度
                    if (that.options['singleUpload'] === false) {
                        $this.on('fileuploadprogressall', function (e, data) {
                            var progress = parseInt(data.loaded / data.total * 100, 10);
                            $('.up_info .totalpercent', that.$element).text(progress);
                            $('.up_info .totalloaded', that.$element).text($.xljUtils.formatFileSize(data.loaded));
                            $('.up_info .totalsize', that.$element).text($.xljUtils.formatFileSize(data.total));
                            $('.up_total .progress-bar', that.$element).css('width', progress + '%');

                            if (data.loaded == data.total) {
                                // console.log('fileuploadprogressall 100%');
                                // 隐藏总进度条
                                $('div.progress.up_total.totalstatus', that.$element).addClass('hidden');
                                that.$element.data('uploadFinished', $.xljUtils.uploadStatus.progress100);
                                // 显示总统计信息
                                $('.up_info:not(.done-total)', that.$element).addClass('hidden');
                                $('.done-total', that.$element).removeClass('hidden');
                            }
                        });
                    }
                    return this.$element;
                }
            }
        },
        _setTotalSize: function() {
            if(this.options.singleUpload == false) {
                $('.up_info.done-total', this.$element).text(
                    '(上传完成，总文件大小' + this._showTotalSize() + ')'
                ).removeClass('hidden');
            }
        },
        _showTotalSize: function(sizeValue) {
            if (sizeValue === undefined) sizeValue = this.options.fileList.totalSize;
            return $.xljUtils.replaceNull($.xljUtils.formatFileSize(sizeValue,'--'));
        },
        //判断是否是IE浏览器及版本
        isIE:function(){
            var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
            if(isIE){
                var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion < 10){
                    return true;
                }else{
                    return false;
                }//IE版本过低
            }else{
                return false;
            }
        }
    };
    var xljAtts = {};
    $.fn.extend({
        /**
         * 根据选择器初始化附件控件
         * @param {object} options 至少包含三个选项：appId, businessId, categoryId
         */
        xljAttachment: function(options){
            debugger;
            this.selector = this.selector ==""?this[0].target:this.selector;
            xljAtts[this.selector] = new XljAttachment(this, options);

            // appId, businessId, categoryId都不能为空，否则不进行控件初始化
            var chkMsg = xljAtts[this.selector]._initOptionsCheck();
            if (chkMsg != null) {
                $.xljUtils.tip('red','附件上传组件初始化失败：<br>' + chkMsg);
                return this;
            }

            // 添加附件控件HTML到页面
            xljAtts[this.selector]._createAttachmentModal();
            // 表单非新增模式下，查询附件信息
            xljAtts[this.selector]._queryList();
            //初始化附件 --（有附件则提供预览或者下载，无附件则隐藏附件插件，上传附件则绑定上传事件）
            xljAtts[this.selector]._init();

            return this;
        },
        // 附件信息提交
        xljAttachmentSubmit:function(callback) {
            // 附件控件是直接提交模式，则不执行整体附件信息提交
            if (xljAtts[this.selector].options.autoSubmit === true) {
                if (typeof callback == 'function') {
                    callback(true, {msg:'',code:$.xljUtils.uploadResultCode.autoSubmited, success:true});
                }
                return this;
            }

            // appId, businessId, categoryId都不能为空，否则不进行表单提交
            var chkMsg = xljAtts[this.selector]._initOptionsCheck();
            if (chkMsg != null) {
                $.xljUtils.tip('red',chkMsg);
                if (typeof callback == 'function') {
                    callback(false, {msg:'',code:$.xljUtils.uploadResultCode.checkError, success:false});
                }
                return this;
            }
            xljAtts[this.selector]._submit(callback);
            return this;
        },
        // 查询附件列表信息
        xljAttachmentQueryList: function() {
            xljAtts[this.selector]._queryList();
            return this;
        },

        // 初始化检查
        initOptionsCheck:function() {
            var msg = xljAtts[this.selector]._initOptionsCheck();
            if (msg != null) {
                $.xljUtils.tip('red',msg);
                return false;
            }
            return true;
        },
        // 取得文件信息列表
        getFileList:function() {
            return xljAtts[this.selector].options.fileList.oldList.concat(xljAtts[this.selector].options.fileList.newList);
        },
        // 取得文件信息列表文件数量大小
        getFileCount:function() {
            return this.getFileList().length;
        },
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
        }
    });

})(jQuery, window, document);