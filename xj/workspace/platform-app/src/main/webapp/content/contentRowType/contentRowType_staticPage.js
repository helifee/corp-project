;(function ($, window, document, undefined) {
    /**
     * 全局变量
     */
//新闻id
    var contentRowTypeId;

    var webOfficeUrl;
    var title;//主题
    /**
     * 初始化数据操作
     */
    /**
     * 参数说明：
     * sourceType  源类型
     */
    $(document).ready(function () {
        try {
            //编辑的新闻ID
            contentRowTypeId = $.xljUtils.getUrlParam('id');
            validateDataAuth(contentRowTypeId);

            chnageStatusOfMsg();

            $('#officeJk').height($(window).height() - 100);
            //computeIframe();



            var urlParams = $.xljUtils.getUrlParams();
            if (urlParams.act == 'flowView') {
                $('#newsViewContentHeader').remove();
                $('#newsViewContentDiv').removeClass('mt50');
            }
            //计算点击量
            addHitNum();
            //綁定按鈕事件
            bindButton();
            
            var tableObj = $('#newContentTbody');
            //加载office静态文件
            addOfficeToForm(tableObj);
            //加载office 附件
            addAttachToForm($('#newContent'));
            //新闻标题
            getTitle();
            //初始化收藏夹
            initFavoriteTree();
        } catch (e) {

        }

   
    
    /**
     * 添加正文金格office操作行
     * @param table
     */
    function addOfficeToForm(table) {
        //添加正文金格office
        var contentTrObj = $('<tr class="form-tr"></tr>');
        table.append(contentTrObj);

        var contentTdObj = $('<td colspan="4"></td>');
        contentTrObj.append(contentTdObj);
        var contentDivObj = $('<div id="officeJk" style="min-height:200px;"></div>');
        contentTdObj.append(contentDivObj);

        if($('#bizForm')[0]){
            contentDivObj.width($('#bizForm').width()-100);
            contentDivObj.css({'overflow':'auto'});
        }
        var contentIframeObj = $('<iframe class="mt50 embed-responsive-item" src="" id="contentOffice" name="contentOffice"></iframe>');
        contentIframeObj.css({width:'100%',border:'none'});
        contentIframeObj.on("load",function(){
        	var b_iframe = document.getElementById("contentOffice");
        	$($(window.contentOffice.document.body).find('div')[0]).width($(b_iframe).width()-65);
        	$($(window.contentOffice.document.body).find('div')[0]).css({margin:'auto'});
        	$(b_iframe).height(window.contentOffice.document.body.scrollHeight+20);
        });
        $.xljUtils.queryAttachmentUrlList("CONTENT", contentRowTypeId+"_doc", "0", function (okFlag, data) {
            if (okFlag) {
                if (data.result != null && data.result.length > 0) {
                    webOfficeUrl = data.result[0].url + "/" + data.result[0].path;
                    var obj={};
                    obj.FILENAME = webOfficeUrl.substring(webOfficeUrl.lastIndexOf('/')+1);
                    obj.GROUP = data.result[0].path;
                    obj.NAME = data.result[0].name;
                    obj.ISMINVERSION = IEVersion();
                    $.ajax({
                        url:baseUrl + "iwebOffice/getHtmlPath" + "?time=" + Math.random(),
                        data:JSON.stringify(obj),
                        type:"POST",
                        contentType:'application/json',
                        dataType:'JSON',
                        async:false,
                        success:function (resultData ) {
                            if(resultData) {
                                var successFlag = resultData.success;
                                if(successFlag) {
                                    contentIframeObj.attr('src','../../'+resultData.msg+ "?time=" + Math.random()).ready();
                                }else {
                                    $.xljUtils.tip("red",'获取静态页面失败！');
                                }
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            $.xljUtils.tip("red","服务异常,请联系管理员！");
                        }
                    });
                }
            }
        },false);
        contentDivObj.append(contentIframeObj);
    }
    //判断是否是IE浏览器
    function IEVersion(){
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        if(isIE){
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion < 11)
            { return true;}
            else
            { return false}//IE版本过低
        }else{
            return false;//非IE
        }
    }

        /**
     * 设置office高度
     */
    function resizeOfficeIframe() {
    	var b_iframe = document.getElementById("contentOffice");
    	$($(document.contentOffice.document.body).find('div')[0]).width($(b_iframe).width()-65);
    	$($(document.contentOffice.document.body).find('div')[0]).css({margin:'auto'});
    	$(b_iframe).height(document.contentOffice.document.body.scrollHeight+20);
    	
    	if (window.parent&&window.parent.document.bizForm){
    		var bizForm = window.parent.document.bizForm;
    		$(window.parent.document.getElementById('bizForm')).height(bizForm.document.body.scrollHeight);
    	}
    }
});

    function validateDataAuth(contentRowTypeId) {
        $.ajax({
            type: "get",
            url: hostUrl + "oa/content/contentRowType/validateDataAuth/" + contentRowTypeId+"?time="+Math.random(),
            dataType: "json",
            async:false,
            success: function (xhr) {
                if(xhr.success){
                    var contentRowTypeList = xhr.result;
                    if(!contentRowTypeList){
                        window.open(hostUrl + 'nopower.html','_self');
                    }
                }else{
                    switch (xhr.code) {
                        case "50000":
                            $.xljUtils.tip("red",xhr.msg);
                            break;
                        case "50001":
                            $.xljUtils.tip("red",xhr.msg);
                            break;
                        case "50002":
                            $.xljUtils.tip("blue",xhr.msg);
                            break;
                        case "50003":
                            $.xljUtils.tip("red",xhr.msg);
                            break;

                        default:
                            $.xljUtils.tip("red","查询数据失败！");
                            break;
                    }
                }

            }
        });
    }
    //计算点击量
    function addHitNum() {
        try {
            var from = $.xljUtils.getUrlParam('from');
            if (from && from == 'portal') {
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: hostUrl + "oa/content/contentRowType/hit/" + contentRowTypeId + "?time=" + Math.random(),
                    dataType: "json",
                    success: function (contentObj) {
                    }
                });
            }
        } catch (e) {

        }

    }

    /**
     * 获取主题
     */
    function getTitle() {
        $.ajax({
            type: 'get',
            url: hostUrl + "oa/content/contentRowType/get/"+ contentRowTypeId + "?time=" + Math.random(),
            async:false,
            dataType: "json",
            success: function (data) {
                if(data.success){
                    title = data.result.title;
                }
            }
        });
    }
    /**
     * 绑定按钮
     */
    function bindButton() {
        //收藏按钮点击事件
        $('#favoriteBtn').on('click',function () {
            $('#favoriteModal').modal('show');
        });

        //保存收藏事件
        $('#saveFavoriteBtn').on('click',function () {
            $('#favoriteForm').attr('action',hostUrl+'oa/favorite/save');
            $("#favoriteId").val(contentRowTypeId);
            $("#favoriteCode").val(contentRowTypeId);
            $('#favoriteForm').submit();
        });

        //保存收藏夹按钮事件
        $('#saveParentFavoriteBtn').on('click',function () {
            $('#parentFavoriteForm').attr('action',hostUrl+'oa/favorite/save');
            var url = baseUrl + "generator/getGuuid" + "?time=" + Math.random();
            $.ajax({
                type: 'get',
                url: url,
                async:false,
                success: function (data) {
                    var guuid = data.result;
                    $("#parentFavoriteId").val(guuid);
                    $("#parentFavoriteCode").val(guuid);
                }
            });
            $('#parentFavoriteForm').submit();
        });

        $('#favoriteModal').on('shown.bs.modal',function () {
            var resourceLink = baseUrl+"content/contentRowType/contentRowType_staticPage.html?id="+contentRowTypeId;
            var favoriteName = title;
            if($.trim(favoriteName)=='') {
                favoriteName = resourceLink;
            }
            $('#resourceLink').val(resourceLink);
            $('#favoriteName').val(favoriteName);
        });

        //创建文件夹
        $('#addParentFavorite').on('click',function () {
            // $('#parentFavoriteModal').modal('show');
            $('#parentFavoriteModal').show();
        });
    }
    /**
     * 初始化页面
     */
    function computeIframe() {
        $('#content').css({overflow: 'hidden'});
        $('#content').height($(window).height() - $('.xj-form-header').height());
        //美化滚动条
        addNiceScroll();
    }
    /**
     * 添加附件操作行
     * @param table
     */
     function addAttachToForm(table) {
         //初始化附件
         try{
             $('#attach_files').xljAttachment({
            	 appId: '1',
                 businessId: contentRowTypeId,
                 categoryId: '1',
                 mode: 'view',
                 hideButtonsWithNoFile:true,
                 singleUpload: false,
                 loadFilesDone:loadFilesDone
             });
             table.append(attachTrObj);
         }catch (e){
             //console.warn('附件初始化失败！');
         }
     }

    /**
     * 附件加载后出发函数
     */
    function loadFilesDone(){
        if($('#attach_files').getFileCount()==0){
            $('#attach_tr').hide();
        }
    }
    /**
     * 页面滚动条
     */
    function addNiceScroll() {
        $("#content").niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "6px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: true, // nicescroll可以管理水平滚动
            background: "#fff"

        });
    }

    /**
     *  closeWin
     */
    window.closeWin = function closeWin() {
        //window.close();
        window.open('','_self','');
        window.close();
    }

    /**
     * 
     */
    $("#officeJk").load(function () {
    	    var mainheight = $(this).contents().find("body").height() + 30;
    	    $(this).height(mainheight);
    });
    //============================
    //初始化收藏夹树
    function initFavoriteTree() {
        $.ajax({
            type: "POST",
            url: hostUrl + "oa/favorite/queryList",
            data: JSON.stringify({}),
            dataType: "json",
            contentType: 'application/json',
            success: function (typeNodes) {
                if(typeNodes.success) {
                    var zNodes = typeNodes.result;
                    if(!zNodes){
                        return;
                    }

                    for (var j = 0; j < zNodes.length; j++) {
                        var zNode = zNodes[j];

                        if(zNode.isFavorite){
                            var optObj = $('<option></option>');
                            optObj.val(zNode.id);
                            optObj.text(zNode.name);
                            $('#favoriteParentId').append(optObj);

                            optObj = $('<option></option>');
                            optObj.val(zNode.id);
                            optObj.text(zNode.name);
                            $('#parentFavoriteParentId').append(optObj);
                            zNode.isParent = true;
                        }
                    }
                    var setting = {

                        data:{
                            simpleData:{
                                enable:true,
                                idKey:'id',
                                pIdKey:'parentId',
                                rootPId:null
                            }
                        },
                        callback:{
                            onExpand:function (event, treeId, treeNode) {
                                $.xljUtils.treeResizeFn('favorite-tree');
                            },
                            onCollapse: function(){
                                $.xljUtils.treeResizeFn('favorite-tree');
                            },
                            onClick:function (event, treeId, treeNode) {
                                if(!treeNode.isFavorite){
                                    $('#xj-index-iframe').attr('src',treeNode.resourceLink);
                                    $('#favoriteContainer').hide();
                                }
                            },
                            onRightClick:function (event,treeId,treeNode) {

                            },
                            beforeRemove:function (treeId,treeNode) {
                                var id = treeNode.id;
                                var flag = false;
                                /*$.xljUtils.confirm('blue', '确定要删除吗？', function () {

                                 },true);*/
                                $.ajax({
                                    url: hostUrl + "oa/favorite/delete/" + id,
                                    type: 'DELETE',
                                    dataType: 'JSON',
                                    async:false,
                                    success: function (resultData) {
                                        if (resultData && resultData.success) {
                                            $.xljUtils.tip('green', "数据删除成功！");
                                            flag = true;
                                        } else {
                                            $.xljUtils.tip('red', "删除数据失败！");
                                        }
                                    }
                                });
                                return flag;
                            },
                            beforeRename:function (treeId,treeNode,newName) {
                                var jsonData = {};
                                jsonData.id = treeNode.id;
                                jsonData.name = newName;
                                var flag = false;
                                $.ajax({
                                    url:hostUrl+'oa/favorite/update/'+treeNode.id,
                                    data:JSON.stringify(jsonData),
                                    type:'PUT',
                                    contentType:'application/json',
                                    dataType:'JSON',
                                    async:false,
                                    success:function (resultData ) {
                                        if(resultData) {
                                            var successFlag = resultData.success;
                                            var result = resultData.result;
                                            var msg = resultData.msg;
                                            if(successFlag) {
                                                $.xljUtils.tip('green', "重命名成功！");
                                                flag = true;
                                            }else{
                                                $.xljUtils.tip('red', "重命名失败！");
                                            }
                                        }

                                    },
                                    error:function (XMLHttpRequest, textStatus, errorThrown) {
                                        var status = XMLHttpRequest.status;
                                        $.xljUtils.getError(status);
                                    }
                                });
                                return flag;
                            },
                            onRemove:function (event, treeId, treeNode) {
                                var pNode =  treeNode.getParentNode();
                                pNode.isParent = true;
                                $.fn.zTree.getZTreeObj(treeId).updateNode(pNode);
                            }
                        },
                        edit:{
                            enable:true,
                            removeTitle:'删除',
                            renameTitle:'重命名',
                            shownRemoveBtn:true,
                            shownRenameBtn:true
                        }

                    };
                    zTreeObj = $.fn.zTree.init($("#favoriteTree"), setting, zNodes);
                    var nodes = zTreeObj.getNodes();
                    //默认展开第一个节点
                    zTreeObj.expandNode(nodes[0], true, false, false,false);
                    //zTreeObj.selectNode(nodes[0]);
                    //zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);
                    setTimeout(function(){
                        $.xljUtils.addTreeScroll('favorite-tree');
                        $.xljUtils.treeResizeFn('favorite-tree');
                    },300);
                }else{

                }
            }
        });
    }


    /**
     * 如果是待阅页面，第一次打开待阅，待阅变为已阅
     */
    function chnageStatusOfMsg(){
        var paramData = {businessId: $.xljUtils.getUrlParam('id'), 'newStatus': 'YY', 'oldStatus': 'DY'};
        var fullUrl = hostUrl+"flow/sysNoticeMsg/updateStatusOfNoticeMsgByCurrentUser";
        $.ajax({ //发送更新的ajax请求
            type: "post",
            url: fullUrl,
            dataType: "json",
            async: false,
            data: JSON.stringify( paramData ),
            contentType: 'application/json;charset=utf-8', //设置请求头信息
            success: function (data) {
                //console.info("调用待阅变已阅的接口 已成功!");
            },
            error: function (data) {
                if (data.msg) {
                    $.xljUtils.tip('red', data.msg);
                } else {
                    $.xljUtils.tip('red', "调用待阅变已阅的接口  失败！");
                }
            }
        });
    }



//关闭收藏bain编辑弹出框
    window.closeFavoriteModal=function(isParent,resultData) {
        console.info(resultData);
        if (resultData.success) {
            var result = resultData.result;
            if (isParent) {
                $.xljUtils.tip('green', '文件夹创建成功');
                var optObj = $('<option></option>');
                optObj.val(result.id);
                optObj.text(result.name);
                $('#favoriteParentId').append(optObj);

                optObj = $('<option></option>');
                optObj.val(result.id);
                optObj.text(result.name);
                $('#parentFavoriteParentId').append(optObj);
                $('#parentFavoriteModal').modal('hide');
                result.isParent = true;

            } else {
                $.xljUtils.tip('green', '添加收藏成功');
                $('#favoriteModal').modal('hide');
                result.isParent = false;
            }

            var favoriteTree = $.fn.zTree.getZTreeObj('favoriteTree');
            var pNode = favoriteTree.getNodeByParam('id', result.parentId);
            favoriteTree.addNodes(pNode, result);
            favoriteTree.updateNode(result);

        } else {
            if (isParent) {
                $.xljUtils.tip('red', '文件夹创建失败');
            } else {
                $.xljUtils.tip('red', '添加收藏失败');
            }
        }

        $('#favoriteForm').reset();
        $('#parentFavoriteForm').reset();
    }
})(jQuery, window, document)




