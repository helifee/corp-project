/**
 * erp_cloud_platform portal_view Created by dingguanghuai on 2017/4/11.
 * @author dingguanghuai
 * @date 2017/4/11
 */
$(function () {

    //获取url参数，并将其缓存至body中
    var urlParam = $.xljUtils.getUrlParams();
    $('body').data(urlParam);

    var breadcrumbContainer = $(window.parent.document.getElementById('breadcrumbContainer'));
    var bread_h = 33;
    $(window.parent.document).find(".embed-responsive-4by3").height($(window).height() + bread_h);

    breadcrumbContainer.css("display","none");
    $(window).on('unload', function () {
        $(window.parent.document).find(".embed-responsive-4by3").height($(window).height() - bread_h);
        breadcrumbContainer.css("display","block");
    });

    /**
     * 初始化容器大小
     */
    function _initContainersSize() {
        //获取页面默认高度
        var documentBodyHeight = $(window).height();
        var documentBodyWidth = $(window).width();

        //设定设计区容器样式
        $('#backgroundTable').width(documentBodyWidth);
        $('#backgroundTable').height(documentBodyHeight);

    }

    _initContainersSize();

    /**
     * 为背景表格添加行
     * @param tableId
     */
    function addTrs(tableId, rows) {
        if (!rows) {
            rows = 24;
        }

        var backgroundTable = $('#' + tableId);
        for (var i = 0; i < rows; i++) {
            var trObj = $('<tr></tr>');
            backgroundTable.append(trObj);
            for (var j = 0; j < 32; j++) {
                var tdObj = $('<td></td>');
                trObj.append(tdObj);
            }
        }
        $('#backgroundTable').width($('#backgroundTable').parent().width());
        resizeComponents();
    }

    addTrs('backgroundTable');

    /**
     * 初始化布局容器大小
     */
    function initResizeContainer() {
        $('#resizeContainer').css({
            position: 'absolute',
            left: '0px',
            top: '0px',
            'z-index': '3'
        });

        $('#resizeContainer').height($('#backgroundTable').height());
        $('#resizeContainer').width($('#backgroundTable').width());

    }

    initResizeContainer();
    $(window).on('resize', function () {
        $('#backgroundTable').width($(window).width());
        initResizeContainer();

        resizeComponents();

        cutOutOverHeight();
    });

    /**
     * 初始化组件列表树
     */
    function initComponentList() {
        $.ajax({
            url: serviceUrl + 'portal/component/queryAllList',
            type: 'POST',
            data: JSON.stringify({}),
            contentType: 'application/json',
            dataType: 'JSON',
            async: false,
            success: function (data) {
                if (data && data.success) {
                    var result = data.result;
                    if (result) {
                        for (var i in result) {
                            var componentId = result[i].id;
                            var contentUrl = result[i].contentUrl;
                            $('body').data(componentId, contentUrl);
                        }
                    }

                } else {
                    $.xljUtils.tip('red', '获取组件列表失败！');
                }
            },
            error: function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });
    }

    initComponentList();

    /**
     * 组装组件（portlet容器）
     * @param component
     * @param isPreview
     * @returns {jQuery|HTMLElement}
     */
    function assembleComponent(component, isPreview) {
        var componentId, title, titleIconCls, moreUrl, contentUrl, displayTitle, displayMoreMenu, refreshInterval;
        componentId = component.componentId;
        title = component.title;
        titleIconCls = component.titleIcon;
        moreUrl = component.moreUrl;
        contentUrl = component.contentUrl;
        displayTitle = component.displayTitle;
        displayMoreMenu = component.displayMoreMenu;
        refreshInterval = component.refreshInterval;
        var paddingContainer = $('<div class="padding-container"></div>');
        //portlet容器
        var container = $('<div class="groupnews_container h300 portlet-container" style="background-color: #fff;"></div>');
        container.css({width: '100%', height: '100%'});
        if (componentId && !isPreview) {
            container.attr('id', componentId);
        } else if (componentId && isPreview) {
            container.attr('id', 'pre_' + componentId);
        }
        paddingContainer.append(container);

        //portlet内容
        var contentContainer = $('<div class="fullWidth"></div>');
        container.append(contentContainer);

        //portlet标题容器
        var titleContainer = $('<div class="news_title clearfix"></div>');
        contentContainer.append(titleContainer);
        if (displayTitle && displayTitle == 'N') {
            titleContainer.css({display: 'none'});
        }
        //portlet标题
        var titleSpan = $('<span><i></i></span>');
        titleContainer.append(titleSpan);
        if (title && titleIconCls) {
            titleSpan.find('i').attr('class', titleIconCls);
            titleSpan.find('i').after(title);
        } else {
            var img = $('<img >');
            img.attr('src', serviceUrl + 'common/img/arrow_mini.png');
            titleSpan.find('i').before(img);
            titleSpan.find('i').after(title);
        }


        //删除按钮
        var titleClose = $('<a href="javascript:void(0);" class="news_more" title="删除"><i class="glyphicon glyphicon-remove" ></i></a>');
        titleClose.attr('onclick', 'removePortlet(this,"' + title + '")');

        //移动按钮
        var titleMove = $('<a href="javascript:void(0);" class="news_more move" style="cursor:move;" title="移动"><i class="glyphicon glyphicon-move" ></i></a>');

        //刷新按钮
        var titleRefresh = $('<a href="javascript:void(0);" class="news_more" title="刷新"><i class="glyphicon glyphicon-refresh" ></i></a>');
        titleRefresh.attr('onclick', 'refreshPortlet(this,"' + contentUrl + '")');

        //属性编辑按钮
        var titleEdit = $('<a href="javascript:void(0);" class="news_more" title="编辑组件属性"><i class="glyphicon glyphicon-edit"></i></a>');
        titleEdit.attr('onclick', 'editComponentAttr(this)');

        //更多按钮
        var titleMore = $('<a href="javascript:void(0);" class="news_more" title="更多"><i class="glyphicon glyphicon-th-list"></i></a>');
        if (moreUrl) {
            titleMore.attr('href', moreUrl);
            titleMore.attr('target', '_blank');
        }

        //titleContainer.append(titleClose);
        //titleContainer.append(titleMove);
        titleContainer.append(titleRefresh);
        titleRefresh.css({display: 'none'});
        if (refreshInterval && refreshInterval > 0) {
            setInterval(function () {
                titleRefresh.click();
            }, refreshInterval * 1000);
        }
        //titleContainer.append(titleEdit);
        if (displayMoreMenu && displayMoreMenu == 'Y') {
            titleContainer.append(titleMore);
        }


        //portlet正文容器
        var portletContentContainer = $('<div class="portlet-content"></div>');
        contentContainer.append(portletContentContainer);

        if (contentUrl) {
            $("body").data(componentId, contentUrl);
        }

        return paddingContainer;
    }

    /**
     * 初始化已保存的组件位置信息
     */
    function initLayout() {
        var portalPageComponents;
        $.ajax({
            type: "POST",
            url:  "http://127.0.0.1:9999/platform-app/oa/portal/portalComponentPosition/queryList",
            data: JSON.stringify({portalPageId: $("body").data('portalPageId')}),
            dataType: "json",
            contentType: 'application/json',
            success: function (resultData) {
                if (resultData) {
                    var componentPositions = resultData.result;
                    var components = [];
                    var maxRowNum = 0;
                    $.each(componentPositions, function (i, componentPosition) {
                        var startRowNum = componentPosition.startRowNum;
                        var componentHeight = componentPosition.componentHeight;
                        showComponents(componentPosition);
                        if (maxRowNum <= (startRowNum + componentHeight)) {
                            maxRowNum = startRowNum + componentHeight;
                        }
                    });

                    if (maxRowNum < $('#backgroundTable tr').length) {
                        console.info(maxRowNum);
                    }
                }
            }
        });
    }

    initLayout();

    /**
     * 组装组件内容，计算组件布局位置
     * @param componentPosition
     */
    function showComponents(componentPosition) {
        var id = componentPosition.id;
        var componentId = componentPosition.componentId;
        var portalPageId = componentPosition.portalPageId;
        var componentHeight = componentPosition.componentHeight;
        var componentWidth = componentPosition.componentWidth;
        var displayMoreMenu = componentPosition.displayMoreMenu;
        var displayMoveMenu = componentPosition.displayMoveMenu;
        var displayTitle = componentPosition.displayTitle;
        var startColNum = componentPosition.startColNum;
        var startRowNum = componentPosition.startRowNum;
        //判断组件高度是否超出默认一屏
        if ((startRowNum + componentHeight) > $('#backgroundTable tr').length) {
           /* var n = Math.ceil($('#backgroundTable tr').length / 24);
            $('#backgroundTable').height($('#backgroundTable').height() / (n * 24) * (startRowNum + componentHeight));
            addTrs('backgroundTable', (startRowNum + componentHeight) % $('#backgroundTable tr').length);
            $(window).resize();*/

            var n = $('#backgroundTable tr').length/24;
            $('#backgroundTable').height($('#backgroundTable').height()/n*(n+1));
            addTrs('backgroundTable');
            $(window).resize();
        }

        var refreshInterval = componentPosition.refreshInterval;
        var icon = componentPosition.icon;
        var title = componentPosition.title;
        var isDel = componentPosition.isDel;
        var paddingLeft = componentPosition.paddingLeft;
        var paddingTop = componentPosition.paddingTop;
        var paddingRight = componentPosition.paddingRight;
        var paddingBottom = componentPosition.paddingBottom;
        //将page组件信息缓存至前端
        var portalPageComponents;

        componentPosition['contentUrl'] = $('body').data(componentId);

        //缓存至body中的组件信息
        var bodyPortalPageComponents = $('body').data("portalPageComponents");
        if (!bodyPortalPageComponents) {
            bodyPortalPageComponents = {};
        }
        bodyPortalPageComponents[componentId] = componentPosition;
        $('body').data("portalPageComponents", bodyPortalPageComponents);


        var panelObj = assembleComponent(componentPosition);

        var tds = $($("#backgroundTable tr")[0]).find('td');
        var trs = $("#backgroundTable tr");
        //计算距左初始位置
        var targetLeft = 0;
        for (var i = 0; i < tds.length; i++) {
            if (i == startColNum) {
                break;
            }
            targetLeft += $(tds[i]).outerWidth();
        }

        //计算距顶初始位置
        var targetTop = 0;
        for (var i = 0; i < trs.length; i++) {
            if (i == startRowNum) {
                break;
            }
            targetTop += $(trs[i]).outerHeight();
        }

        panelObj.offset({left: (targetLeft), top: (targetTop)});

        //计算宽度
        var targetUiWidth = 0;
        for (var i = startColNum; i < tds.length; i++) {
            if (i == (startColNum + componentWidth)) {
                break;
            }
            targetUiWidth += $(tds[i]).outerWidth();
        }

        //计算高度
        var targetUiHeight = 0;
        for (var i = startRowNum; i < trs.length; i++) {
            if (i == (startRowNum + componentHeight)) {
                break;
            }
            targetUiHeight += $(trs[i]).outerHeight();
        }

        panelObj.width(targetUiWidth);
        panelObj.height(targetUiHeight);

        panelObj.css({
            float: 'left',
            position: 'absolute',
            overflow: 'hidden'
        });

        panelObj.css({
            padding: '0'
        });

        panelObj.css({
            'padding-top': paddingTop + 'px',
            'padding-bottom': paddingBottom + 'px',
            'padding-left': paddingLeft + 'px',
            'padding-right': paddingRight + 'px'
        });

        panelObj.find('.glyphicon-refresh').parent('a').click();


        $("#resizeContainer").append(panelObj);
        if ($("body").data("edit") == 'true') {
            containmentDragObjs(panelObj);

            containmentResizableObjs(panelObj);
        }
    }

    /**
     * 重置布局设计器中的组件大小
     * @private
     */
    function resizeComponents() {
        $('#resizeContainer').html('');
        var portalPageComponents = $('body').data('portalPageComponents');
        if (portalPageComponents) {
            var maxRowNum = 0;

            for (var item in portalPageComponents) {
                var component = portalPageComponents[item];
                var startRowNum = component.startRowNum;
                var componentHeight = component.componentHeight;
                showComponents(component);
                if (maxRowNum <= (startRowNum + componentHeight)) {
                    maxRowNum = startRowNum + componentHeight;
                }
            }

            if (maxRowNum < $('#backgroundTable tr').length) {
                console.info('===========maxRowNum==================' + maxRowNum);
            }
        }
    }

    function cutOutOverHeight() {
        var trs = $('#backgroundTable tr');
        var portlets = $('#resizeContainer .padding-container');
        var maxHeight = 0;
        $.each(portlets, function (i, portlet) {
            var top = $(portlet).offset().top;
            var height = $(portlet).outerHeight();
            if ((top + height) > maxHeight) {
                maxHeight = top + height;
            }

        })
        console.info('===========MaxHeight==================' + maxHeight);
    }

   //$(window).resize();



});

/**
 * 刷新组建内容
 * @param btn
 */
function refreshPortlet(btn, contentUrl) {
    $(btn).parents('div.portlet-container').find('.portlet-content').load(contentUrl, function () {
        var portlet = $(btn).parents('div.portlet-container');
        var footer = portlet.find('.footer');
        if (footer.length > 0) {
            portlet.css({
                border: 'none',
                'background-color': footer.css('background-color')
            })
        }

        var copyright = portlet.find('.copyright');
        if (copyright.length > 0) {
            portlet.css({
                border: 'none',
                'background-color': copyright.css('background-color')
            })
        }
    });
}

/**
 * 删除组件
 * @param btn
 */
function removePortlet(btn, title) {
    var that = btn;
    var delObj = $($(that).parents('div.portlet-container')[0]);
    $.xljUtils.confirm('blue', '确定删除组件【' + title + '】吗？', function () {
        var portalPageComponents = $("body").data('portalPageComponents');
        var delObjId = delObj.attr("id");
        var portalPosition = portalPageComponents[delObjId];
        if (portalPageComponents) {
            if (portalPosition && portalPosition.id) {
                $.ajax({
                    type: "DELETE",
                    url: serviceUrl + "/oa/portal/portalComponentPosition/delete/" + portalPosition.id,
                    data: JSON.stringify({portalPageId: $("body").data('portalPageId')}),
                    dataType: "json",
                    success: function (resultData) {
                        if (resultData && resultData.success) {
                            $.xljUtils.tip("green", "组件已成功从页面移除！");
                        } else {
                            $.xljUtils.tip('red', "从页面移除组件失败！");
                            return;
                        }
                    },
                    error: function (xhr) {
                        $.xljUtils.getError(xhr.status);
                    }
                });
            }
            delete portalPageComponents[delObj.attr('id')];
            $('body').data('portalPageComponents', portalPageComponents);
        }

        var storageComponents = window.localStorage.getItem("portalPageComponents_" + $("body").data("portalPageId"));
        if (storageComponents) {
            storageComponents = JSON.parse(storageComponents);
            delete storageComponents[delObj.attr('id')];
            window.localStorage.setItem("portalPageComponents_" + $("body").data("portalPageId"), JSON.stringify(storageComponents));
        }

        delObj.remove();
    }, function () {

    });

}

/**
 * 编辑组件属性
 * @param editBtn
 */
function editComponentAttr(editBtn) {
    var panelObj = $($(editBtn).parents('div.portlet-container')[0]);
    var componentId = panelObj.attr('id');
    $("input[name='componentId']").val(componentId);

    var portalPageComponents = $("body").data("portalPageComponents");
    if (!portalPageComponents) {
        $.xljUtils.tip('blue', "无法获取当前组件基本属性！");
        return;
    }

    var componentAttrObj = portalPageComponents[componentId];
    if (!componentAttrObj) {
        $.xljUtils.tip('blue', "无法获取当前组件基本属性！");
        return;
    }
    var title = componentAttrObj.title;
    if (title) {
        $("input[name='title']").val(title);
    }

    var icon = componentAttrObj.icon;
    if (icon) {
        $("input[name='icon']").val(icon);
    }

    var displayTitle = componentAttrObj.displayTitle;
    if (displayTitle) {
        $("input[name='displayTitle'][value='" + displayTitle + "']")[0].checked = true;
    }

    var isDel = componentAttrObj.isDel;
    if (isDel) {
        $("input[name='isDel'][value='" + isDel + "']")[0].checked = true;
    }

    var displayMoveMenu = componentAttrObj.displayMoveMenu;
    if (displayMoveMenu) {
        $("input[name='displayMoveMenu'][value='" + displayMoveMenu + "']")[0].checked = true;
    }

    var displayMoreMenu = componentAttrObj.displayMoreMenu;
    if (displayMoreMenu) {
        $("input[name='displayMoreMenu'][value='" + displayMoreMenu + "']")[0].checked = true;
    }

    var paddingTop = componentAttrObj.paddingTop;
    if (paddingTop) {
        $("input[name='paddingTop']").val(paddingTop);
    }

    var paddingBottom = componentAttrObj.paddingBottom;
    if (paddingBottom) {
        $("input[name='paddingBottom']").val(paddingBottom);
    }

    var paddingLeft = componentAttrObj.paddingLeft;
    if (paddingLeft) {
        $("input[name='paddingLeft']").val(paddingLeft);
    }

    var paddingRight = componentAttrObj.paddingRight;
    if (paddingRight) {
        $("input[name='paddingRight']").val(paddingRight);
    }
    $("#componentAttrModal").modal({backdrop: 'static', show: true});
}

/**
 * 设置cookie
 * @param c_name
 * @param value
 * @param expiredays
 */
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

/**
 * 获取cookie值
 * @param c_name
 * @returns {string}
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}