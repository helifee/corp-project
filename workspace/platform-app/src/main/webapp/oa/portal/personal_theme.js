/**
 * erp_cloud_platform portalPosition_copy Created by dingguanghuai on 2017/4/10.
 * @author dingguanghuai
 * @date 2017/4/15.
 */

$(function () {
    //获取url参数，并将其缓存至body中
    var urlParam = $.xljUtils.getUrlParams();
    $('body').data(urlParam);
    $("body").data('edit','true');

    /**
     * 初始化容器大小
     */
    function _initContainersSize() {
        //获取页面默认高度
        var documentBodyHeight = $(window).height()-100;
        //设定组件列表容器样式
        $('#componentsContainer').height(documentBodyHeight);
        $('#componentsContainer').css({border:'1px solid #e7e7e7',overflow:'hidden',padding:'0'});

        //设置组件列表表头样式
        $('#componentsContainer > div > .form-inline').css({
            'padding-top': '10px',
            'padding-bottom': '10px',
            'padding': '10px 0 10px 10px',
            'background-color': '#F5F5F5',
            'border': '1px solid #F5F5F5',
            'margin-bottom': '10px'
        });
        //设定组件列表内容样式
        $('.componentsContent').css({
            overflow:'auto'
        });
        $('.componentsContent').height(documentBodyHeight-$('.componentsTitle').outerHeight()-10);
        $.xljUtils.addTreeScroll('componentsContent');

        //设定设计区容器样式
        $('#designContainer').height(documentBodyHeight);
        $('#designContainer').css({border:'1px solid #e7e7e7',overflow:'auto',padding:'15px'});
        $.xljUtils.addTreeScroll('designContainer');

    }
    _initContainersSize();

    /**
     * 为背景表格添加行
     * @param tableId
     */
    function addTrs(tableId) {
        var backgroundTable = $('#'+tableId);
        for(var i=0;i<24;i++) {
            var trObj = $('<tr></tr>');
            backgroundTable.append(trObj);
            for(var j=0;j<32;j++) {
                var tdObj = $('<td></td>');
                trObj.append(tdObj);
            }
        }

        resizeComponents();
        $.xljUtils.treeResizeFn('designContainer');
    }
    addTrs('backgroundTable');

    /**
     * 初始化布局容器大小
     */
    function initResizeContainer(){
        $('#resizeContainer').css({
            /*height:'100%',
             width:'100%',*/
            position:'absolute',
            left:'15px',
            top:'15px',
            'z-index':'3'
        });

        $('#resizeContainer').height($('#backgroundTable').height());
        $('#resizeContainer').width($('#backgroundTable').width());

    }
    initResizeContainer();

    $(window).on('resize',function () {
        initResizeContainer();
    });

    //增加一屏按钮事件
    $('#increaseScreenBtn').on('click',function () {
        var n = $('#backgroundTable tr').length/24;
        $('#backgroundTable').height($('#backgroundTable').height()/n*(n+1));
        addTrs('backgroundTable');
        initResizeContainer();
    });

    /**
     * 组装组件（portlet容器）
     * @param title
     * @returns {jQuery|HTMLElement}
     */
    function assembleComponent(component,isPreview) {
        var componentId,title,titleIconCls,moreUrl,contentUrl,displayTitle;
        componentId = component.componentId;
        title = component.title;
        titleIconCls = component.titleIcon;
        moreUrl = component.moreUrl;
        contentUrl = component.contentUrl;
        displayTitle = component.displayTitle;
        //portlet容器
        var container = $('<div class="groupnews_container h300 portlet-container" style="background-color: #fff;"></div>');
        if(componentId&&!isPreview){
            container.attr('id',componentId);
        }else if(componentId&&isPreview ){
            container.attr('id','pre_'+componentId);
        }

        //portlet内容
        var contentContainer = $('<div class="fullWidth"></div>');
        container.append(contentContainer);

        //portlet标题容器
        var titleContainer = $('<div class="news_title clearfix"></div>');
        contentContainer.append(titleContainer);
        //portlet标题
        var titleSpan = $('<span><i></i></span>');
        titleContainer.append(titleSpan);
        if(title&&titleIconCls){
            titleSpan.find('i').attr('class',titleIconCls);
            titleSpan.find('i').after(title);
        }else{
            var img = $('<img >');
            img.attr('src',hostUrl+'common/img/arrow_mini.png');
            titleSpan.find('i').before(img);
            titleSpan.find('i').after(title);
        }
        if(displayTitle&&displayTitle=='N'){
            titleContainer.css({display:'none'});
        }

        var toolsContainer = $('<div></div>');
        toolsContainer.css({
            position:'absolute',
            'z-index': '333',
            right:'0',
            top:'10px'
        });
        contentContainer.append(toolsContainer);


        //删除按钮
        var titleClose = $('<a href="javascript:void(0);" class="news_more" title="删除"><i class="glyphicon glyphicon-remove" ></i></a>');
        titleClose.attr('onclick','removePortlet(this,"'+title+'")');
        //titleContainer.append(titleClose);
        toolsContainer.append(titleClose);
        //移动按钮
        var titleMove = $('<a href="javascript:void(0);" class="news_more move" style="cursor:move;" title="移动"><i class="glyphicon glyphicon-move" ></i></a>');
        //titleContainer.append(titleMove);
        toolsContainer.append(titleMove);
        //刷新按钮
        var titleRefresh = $('<a href="javascript:void(0);" class="news_more" title="刷新"><i class="glyphicon glyphicon-refresh" ></i></a>');
        titleRefresh.attr('onclick','refreshPortlet(this,"'+contentUrl+'")');
        //titleContainer.append(titleRefresh);
        toolsContainer.append(titleRefresh);
        //属性编辑按钮
        var titleEdit = $('<a href="javascript:void(0);" class="news_more" title="编辑组件属性"><i class="glyphicon glyphicon-edit"></i></a>');
        titleEdit.attr('onclick','editComponentAttr(this)');
        //titleContainer.append(titleEdit);
        toolsContainer.append(titleEdit);
        //更多按钮
        var titleMore = $('<a href="javascript:void(0);" class="news_more" title="更多"><i class="glyphicon glyphicon-th-list"></i></a>');
        if(moreUrl){
            titleMore.attr('href',moreUrl);
            titleMore.attr('target','_blank');
        }
        // titleContainer.append(titleMore);
        toolsContainer.append(titleMore);
        toolsContainer.find('a').css({
            float: 'right',
            'margin-right': '10px'
        });


        //portlet正文容器
        var portletContentContainer = $('<div class="portlet-content"></div>');
        contentContainer.append(portletContentContainer);

        /*//portlet正文
         var portletContent = $('  <ul class="news_list">                                                                                                '+
         '	<li class="new"><a href="">集团董事长莅临河南区域公司开封公司视察工作</a><span>2017-03-22</span></li>                '+
         '	<li class="new"><a href="">集团执行董事兼CEO张立洲赴济南区域公司、河南区域公司检查</a><span>2017-03-22</span></li>   '+
         '	<li class="new"><a href="">纽约大学房地产学院Robinson教授一行到上海区域公司参观交流</a><span>2017-03-22</span></li>  '+
         '	<li class="new"><a href="">集团执行董事兼CEO张立洲莅临物业公司召开集团战略发展业务...</a><span>2017-03-22</span></li>'+
         '	<li><a href="">鑫苑集团成功举办2017年度整体保险培训</a><span>2017-03-22</span></li>                                  '+
         '	<li><a href="">纽约大学房地产学院Robinson教授一行到上海区域公司参观交流</a><span>2017-03-22</span></li>              '+
         '	<li><a href="">集团执行董事兼CEO张立洲赴济南区域公司、河南区域公司检查…</a><span>2017-03-22</span></li>              '+
         '	<li><a href="">集团董事长莅临河南区域公司开封公司视察工作</a><span>2017-03-22</span></li>                            '+
         '  </ul>                                                                                                                 '
         );
         portletContentContainer.append(portletContent);*/

        if(contentUrl) {
            $("body").data(componentId,contentUrl);
        }

        return container;
    }

    /**
     * 组装左侧组件列表树
     * @param title
     * @param categoryId
     * @returns {jQuery|HTMLElement}
     */
    function assembleComponentList(title,categoryId) {
        var panel = $('<div class="panel panel-default" style="border-radius: 0;"></div>');
        var panelHeader = $('<div class="panel-heading" role="tab" id="heading_'+categoryId+'"></div>');
        panel.append(panelHeader);
        var panelTitle = $('<h4 class="panel-title"></h4>');
        panelHeader.append(panelTitle);
        var panelTitleA = $('<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse_' + categoryId + '" ' +
            'aria-expanded="true" aria-controls="collapse_' + categoryId + '">'+ title + '</a>');
        panelTitle.append(panelTitleA);
        var panelBodyContainer = $(
            '<div id="collapse_'+categoryId+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading_'+categoryId+'"></div>'
        );
        panel.append(panelBodyContainer);
        var panelBody = $('<div class="panel-body"></div>' );
        panelBodyContainer.append(panelBody);
        return panel;
    }

    /**
     * 初始化组件列表树
     */
    function initComponentList() {
        $.ajax({
            url:hostUrl+'portal/component/queryAllList',
            type:'POST',
            data:JSON.stringify({}),
            contentType:'application/json',
            dataType:'JSON',
            async:false,
            success:function (data) {
                if(data&&data.success){
                    var result = data.result;
                    if(result) {
                        var categoryMap = {};
                        for(var i in result){
                            var categoryId = result[i].categoryId;
                            var categoryName = result[i].categoryName;
                            var componentList = categoryMap[categoryId];
                            if(!componentList){
                                componentList = [];
                            }
                            componentList.push(result[i]);
                            categoryMap[categoryId] = componentList;
                        }

                        for (var item in categoryMap){
                            var componentList = categoryMap[item];
                            var panel = assembleComponentList(componentList[0].categoryName,item);
                            for(var j in componentList){
                                var component = componentList[j];
                                component.componentId = component.id;
                                var portlet = assembleComponent(component,true);
                                var mydraggable = $('<div class="mydraggable"></div>');
                                mydraggable.append('<span style="float:left;width: 50px;cursor:move">' +
                                    '<span class="glyphicon glyphicon-th" style="font-size:30px;float:left;padding-left: 20px;padding-top: 0;padding-bottom: 5px;padding-right: 10px;">' +
                                    '</span><span style="margin-left: 5px;">' + component.title +
                                    '</span>' +
                                    '</span>');
                                portlet.css({'display':'none'});
                                panel.find('.panel-body').append(mydraggable);
                                mydraggable.append(portlet);
                                defineDragObj(mydraggable);
                                $('#componentListDiv').find('.panel-group').append(panel);
                            }

                        }

                        defineDropObj();
                    }

                }else{
                    $.xljUtils.tip('red','获取组件列表失败！');
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });
    }
    initComponentList();

    /**
     * 组件拖拽效果
     * @param obj
     */
    function defineDragObj(obj) {
        obj.draggable({
            //connectToSortable:"#sortableContainer",
            handle:"span",
            helper: "clone",
            revert: "invalid",
            zIndex:10000,
            start:function (event,ui) {
                ui.helper.css({'z-index':'9999',position:'absolute'});
                ui.helper.find('.portlet-container').show();
                //初始化UUID
                $.ajax({
                    type:"GET",
                    url:baseUrl+"oa/content/contentChild/getGuuid",
                    dataType:"json",
                    async:false,
                    success: function(resultValue) {
                        //console.info(resultValue);
                        var uuid = resultValue.result;
                        $("body").data("positionUUID",uuid);
                    }
                });
            }
        });
    }

    /**
     * 定义放置组件容器
     */
    function defineDropObj() {
        $( "#resizeContainer" ).droppable({
            accept: ".mydraggable",
            classes: {
                "ui-droppable-active": "ui-state-active",
                "ui-droppable-hover": "ui-state-hover"
            },
            drop: function( event, ui ) {
                var myresizableObj = ui.helper.find(".portlet-container");
                var myresizableObj = ui.helper.find(".portlet-container");
                myresizableObj.appendTo($(this));

                var componentId = myresizableObj.attr("id").replace("pre_","");
                myresizableObj.attr("id",componentId);

                var tdHeight = $("#backgroundTable tr td").outerHeight();
                var tdWidth = $("#backgroundTable tr td").outerWidth();

                var x = 10;
                var y = 8;
                myresizableObj.css({
                    height:tdHeight*y,
                    width:tdWidth*x,
                    float:"left",
                    position:"absolute",
                    overflow: "hidden",
                    padding:'0',
                    margin:'0'
                });
                myresizableObj.show("slow");

                myresizableObj.find('.glyphicon-refresh').click();

                var componentUrl = $("body").data(componentId);


                var portalPageComponents = $("body").data("portalPageComponents");
                if(!portalPageComponents) {
                    portalPageComponents = {};
                }
                //组件位置信息
                var componentAttrObj = {};
                componentAttrObj.id = $("body").data("positionUUID");
                componentAttrObj.componentId = componentId;
                componentAttrObj.portalPageId = $("body").data("portalPageId");
                componentAttrObj.title = myresizableObj.find('.news_title span').text();
                componentAttrObj.startRowNum = 0;//组件起始行；
                componentAttrObj.startColNum = 0;//组件起始列；
                //组件默认属性值
                componentAttrObj.icon = null;
                componentAttrObj.refreshInterval = 0;
                componentAttrObj.paddingTop = 0;
                componentAttrObj.paddingBottom = 9;
                componentAttrObj.paddingLeft = 0;
                componentAttrObj.paddingRight = 8;
                componentAttrObj.displayTitle = 'Y';
                componentAttrObj.isDel = 'N';
                componentAttrObj.displayMoveMenu = 'Y';
                componentAttrObj.displayMoreMenu = 'Y';

                componentAttrObj.componentWidth = x;//组件宽（所占列数）；
                componentAttrObj.componentHeight = y;//组件高（所占行数）

                portalPageComponents[componentId] = componentAttrObj;

                $("body").data("portalPageComponents",portalPageComponents);


                //使拖拽到容器内的组件可在容器范围内拖拽
                containmentDragObjs(myresizableObj);

                //使拖拽到容器内的组件可在容器范围内缩放
                containmentResizableObjs(myresizableObj);
            }
        });
    }

    /**
     * 定义设计容器内组件可拖拽
     * @param dragableObj
     * @private
     */
    function containmentDragObjs(dragableObj) {
        // var tdHeight = $("#backgroundTable tr td").outerHeight();
        // var tdWidth = $("#backgroundTable tr td").outerWidth();
        var tdHeight = $("#backgroundTable").height()/$("#backgroundTable tr").length;
        var tdWidth = $("#backgroundTable").width()/$($("#backgroundTable tr")[0]).find('td').length;

        //使拖拽到容器内的组件可在容器范围内拖拽
        dragableObj.draggable({
            containment:"#resizeContainer",
            handle:"a.move",
            //grid:[tdWidth,tdHeight],
            stop:function (event,ui) {
                // var tdHeight0 = $("#backgroundTable tr td").outerHeight();
                // var tdWidth0 = $("#backgroundTable tr td").outerWidth();
                var tdHeight0 = $("#backgroundTable").height()/$("#backgroundTable tr").length;
                var tdWidth0 = $("#backgroundTable").width()/$($("#backgroundTable tr")[0]).find('td').length;

                var uiHeight = ui.helper.height();
                var uiWidth = ui.helper.width();
                var x = Math.round(uiWidth/tdWidth0);
                var y = Math.round(uiHeight/tdHeight0);

                var pleft = ui.position.left;
                var ptop = ui.position.top;
                var startRow = Math.round(ptop/tdHeight0);
                var startCol = Math.round(pleft/tdWidth0);

                var tableOffset = $("#backgroundTable").offset();
                //ui.helper.offset({left:tableOffset.left+startCol*tdWidth0,top:tableOffset.top+startRow*tdHeight0});


                var portalPageComponents = $("body").data("portalPageComponents");
                if(!portalPageComponents){
                    portalPageComponents = {};
                }
                var componentAttrObj = portalPageComponents[ui.helper.attr("id")];
                if(!componentAttrObj){
                    componentAttrObj = {};
                }
                componentAttrObj.startRowNum = startRow;//组件起始行；
                componentAttrObj.startColNum = startCol;//组件起始列；
                componentAttrObj.componentWidth = x;//组件宽（所占列数）；
                componentAttrObj.componentHeight = y;//组件高（所占行数）

                portalPageComponents[ui.helper.attr("id")] = componentAttrObj;
                $("body").data("portalPageComponents",portalPageComponents);


                var tds = $($("#backgroundTable tr")[0]).find('td');
                var trs = $("#backgroundTable tr");
                //计算距左初始位置
                var targetLeft = 0;
                for(var i=0;i<tds.length;i++){
                    if(i==startCol) {
                        break;
                    }
                    targetLeft += $(tds[i]).outerWidth();
                }

                //计算距顶初始位置
                var targetTop = 0;
                for(var i=0;i<trs.length;i++){
                    if(i==startRow) {
                        break;
                    }
                    targetTop += $(trs[i]).outerHeight();
                }

                ui.helper.offset({left:tableOffset.left+(targetLeft)+1,top:tableOffset.top+(targetTop)+1});


                //计算宽度
                var targetUiWidth = 0;
                for (var i=startCol;i<tds.length;i++){
                    if(i==(startCol+x)){
                        break;
                    }
                    targetUiWidth += $(tds[i]).outerWidth();
                }

                //计算高度
                var targetUiHeight = 0;
                for (var i=startRow;i<trs.length;i++){

                    targetUiHeight += $(trs[i]).outerHeight();
                    if(i==(startRow+y-1)){
                        break;
                    }
                }

                ui.helper.width(targetUiWidth);
                ui.helper.height(targetUiHeight);
            }
        });
    }

    /**
     * 定义设计容器内组件可更改大小
     * @param resizableObj
     * @private
     */
    function containmentResizableObjs(resizableObj) {
        // var tdHeight = $("#backgroundTable tr td").outerHeight();
        // var tdWidth = $("#backgroundTable tr td").outerWidth();
        var tdHeight = $("#backgroundTable").height()/$("#backgroundTable tr").length;
        var tdWidth = $("#backgroundTable").width()/$($("#backgroundTable tr")[0]).find('td').length;

        //使拖拽到容器内的组件可在容器范围内缩放
        resizableObj.resizable({
            grid:[tdWidth,tdHeight],
            containment:"#resizeContainer",
            handles:"all",
            stop:function (event,ui) {
                // var tdHeight1 = $("#backgroundTable tr td").outerHeight();
                // var tdWidth1 = $("#backgroundTable tr td").outerWidth();
                var tdHeight1 = $("#backgroundTable").height()/$("#backgroundTable tr").length;
                var tdWidth1 = $("#backgroundTable").width()/$($("#backgroundTable tr")[0]).find('td').length;

                var uiHeight = ui.size.height;
                var uiWidth = ui.size.width;
                var x = Math.round(uiWidth/tdWidth1);
                var y = Math.round(uiHeight/tdHeight1);

                var portalPageComponents = $("body").data("portalPageComponents");
                if(!portalPageComponents){
                    portalPageComponents = {};
                }
                var componentAttrObj = portalPageComponents[ui.helper.attr("id")];
                if(!componentAttrObj){
                    componentAttrObj = {};
                }
                componentAttrObj.componentWidth = x;//组件宽（所占列数）；
                componentAttrObj.componentHeight = y;//组件高（所占行数）

                var pleft = ui.position.left;
                var ptop = ui.position.top;
                var startRow = Math.round(ptop/tdHeight1);
                var startCol = Math.round(pleft/tdWidth1);
                componentAttrObj.startRowNum = startRow;//组件起始行；
                componentAttrObj.startColNum = startCol;//组件起始列；
                portalPageComponents[ui.helper.attr("id")] = componentAttrObj;
                $("body").data("portalPageComponents",portalPageComponents);

                var targetUiWidth = 0;
                var tds = $($("#backgroundTable tr")[0]).find('td');
                for (var i=startCol;i<tds.length;i++){

                    targetUiWidth += $(tds[i]).outerWidth();
                    if(i==(startCol+x-1)){
                        break;
                    }
                }

                var targetUiHeight = 0;
                var trs = $("#backgroundTable tr");
                for (var i=startRow;i<trs.length;i++){
                    targetUiHeight += $(trs[i]).outerHeight();
                    if(i==(startRow+y-1)){
                        break;
                    }
                }

                $(this).width(targetUiWidth);
                $(this).height(targetUiHeight);

            }
        });
    }

    /**
     * 保存组件位置信息
     */
    $('#saveBtn').on('click',function () {
        var portalPageComponents = $("body").data("portalPageComponents");
        if(portalPageComponents){
            var components = [];
            for(var i in portalPageComponents){
                components.push(portalPageComponents[i]);
            }

            $.ajax({
                type:"POST",
                url:baseUrl+"oa/portal/portalComponentPosition/saveBatchForPersonal",
                data:JSON.stringify(components),
                dataType:"json",
                contentType:'application/json',
                success:function (resultData ) {
                    if (resultData) {

                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var msg = resultData.msg;
                        if (successFlag) {
                            $.xljUtils.tip('green','数据保存成功！');
                        } else {
                            $.xljUtils.tip('red','数据保存失败！');
                        }
                    }
                },
                error:function (xhr) {
                    $.xljUtils.getError(xhr.stauts);
                }
            });
        }else{
            $.xljUtils.tip('blue','暂无组件位置信息！');
        }

    });

    //保存组件属性
    $("#saveAttrsBtn").on('click',function () {
        $('#componentAttrForm').submit();
    });

    //预览页面
    $('#previewPortalBtn').on('click',function () {
        //onLoadIframe('portal/viewPortalPosition.html');
        var portalPageComponents = $("body").data("portalPageComponents");
        if(typeof  window.localStorage != "undefined"){
            window.localStorage.setItem("portalPageComponents_"+$("body").data("portalPageId"),JSON.stringify(portalPageComponents));
        }else {
            setCookie("portalPageComponents_"+$("body").data("portalPageId"),JSON.stringify(portalPageComponents),1);
        }
        window.open('portal_view.html?portalPageId='+$("body").data("portalPageId"),"_blank") ;
    });

    /**
     * 初始化已保存的组件位置信息
     */
    function initLayout() {
        var portalPageComponents ;
        if(window.localStorage) {
            portalPageComponents = window.localStorage.getItem("portalPageComponents_"+$("body").data("portalPageId"));
        }else {
            portalPageComponents = getCookie("portalPageComponents_"+$("body").data("portalPageId"));
        }

        if(portalPageComponents){
            portalPageComponents = JSON.parse(portalPageComponents);
            for(var i in portalPageComponents){
                var componentPosition = portalPageComponents[i];
                showComponents(componentPosition);
            }
        }else{
            $.ajax({
                type:"POST",
                url:baseUrl+"oa/portal/portalComponentPosition/queryList",
                data:JSON.stringify({portalPageId:$("body").data('portalPageId')}),
                dataType:"json",
                contentType:'application/json',
                success:function (resultData ) {
                    if(resultData) {
                        var componentPositions = resultData.result;
                        var components = [];
                        $.each(componentPositions,function (i,componentPosition) {
                            showComponents(componentPosition);
                        });
                    }
                }
            });
        }
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
        if((startRowNum+componentHeight)>$('#backgroundTable tr').length){
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
        var portalPageComponents ;
        if(window.localStorage) {
            portalPageComponents = window.localStorage.getItem("portalPageComponents_"+$("body").data("portalPageId"));
            if(!portalPageComponents){
                portalPageComponents = {};
            }else{
                portalPageComponents = JSON.parse(portalPageComponents);
            }

            portalPageComponents[componentId] = componentPosition;

            window.localStorage.setItem("portalPageComponents_"+$("body").data("portalPageId"),JSON.stringify(portalPageComponents));

        }else {
            portalPageComponents = getCookie("portalPageComponents_"+$("body").data("portalPageId"));
            if(!portalPageComponents){
                portalPageComponents = {};
            }else{
                portalPageComponents = JSON.parse(portalPageComponents);
            }
            portalPageComponents[componentId] = componentPosition;
            setCookie("portalPageComponents_"+$("body").data("portalPageId"),JSON.stringify(portalPageComponents),1);
        }

        componentPosition['contentUrl']=$('body').data(componentId);

        //缓存至body中的组件信息
        var bodyPortalPageComponents = $('body').data("portalPageComponents");
        if(!bodyPortalPageComponents){
            bodyPortalPageComponents = {};
        }
        bodyPortalPageComponents[componentId] = componentPosition;
        $('body').data("portalPageComponents",bodyPortalPageComponents);


        var panelObj = assembleComponent(componentPosition);


        panelObj.find('.glyphicon-refresh').parent('a').hide();
        if(displayMoreMenu&&displayMoreMenu=='N'){
            panelObj.find('.glyphicon-th-list').parent('a').hide();
        }

        if(displayMoveMenu&&displayMoveMenu=='N'){
            panelObj.find('.glyphicon-move').parent('a').hide();
        }

        if(isDel&&isDel=='N'){
            panelObj.find('.glyphicon-remove').parent('a').hide();
        }



        var tableOffset = $("#backgroundTable").offset();
        var tdWidth = $("#backgroundTable tr td").outerWidth();
        var tdHeight = $("#backgroundTable tr td").outerHeight();

        var tds = $($("#backgroundTable tr")[0]).find('td');
        var trs = $("#backgroundTable tr");
        //计算距左初始位置
        var targetLeft = 0;
        for(var i=0;i<tds.length;i++){
            if(i==startColNum) {
                break;
            }
            targetLeft += $(tds[i]).outerWidth();
        }

        //计算距顶初始位置
        var targetTop = 0;
        for(var i=0;i<trs.length;i++){
            if(i==startRowNum) {
                break;
            }
            targetTop += $(trs[i]).outerHeight();
        }

        //panelObj.offset({left:tableOffset.left+(targetLeft),top:tableOffset.top+(targetTop)});
        panelObj.offset({left:(targetLeft),top:(targetTop)});

        //计算宽度
        var targetUiWidth = 0;
        for (var i=startColNum;i<tds.length;i++){
            if(i==(startColNum+componentWidth)){
                break;
            }
            targetUiWidth += $(tds[i]).outerWidth();
        }

        //计算高度
        var targetUiHeight = 0;
        for (var i=startRowNum;i<trs.length;i++){
            if(i==(startRowNum+componentHeight)){
                break;
            }
            targetUiHeight += $(trs[i]).outerHeight();
        }

        panelObj.width(targetUiWidth);
        panelObj.height(targetUiHeight);

        panelObj.css({
            float:'left',
            position:'absolute',
            overflow:'hidden'
        });

        panelObj.css({
            padding:'0'
        });

        panelObj.find('.glyphicon-refresh').parent('a').click();


        $("#resizeContainer").append(panelObj);
        if($("body").data("edit")=='true'){
            containmentDragObjs(panelObj);

            containmentResizableObjs(panelObj);
        }
    }

    /**
     * 重置布局设计器中的组件大小
     * @private
     */
    function resizeComponents() {
        var resizableObjs =  $('#resizeContainer .portlet-container');
        var portalPageComponents = $('body').data('portalPageComponents');
        if(portalPageComponents) {
            $.each(resizableObjs,function () {
                var componentId = $(this).attr('id');
                var componentObj = portalPageComponents[componentId];
                var startRowNum = componentObj.startRowNum;
                var startColNum = componentObj.startColNum;
                var componentWidth = componentObj.componentWidth;
                var componentHeight = componentObj.componentHeight;

                var tbObj = $('#backgroundTable');

                var tds = $($("#backgroundTable tr")[0]).find('td');
                var trs = $("#backgroundTable tr");
                //计算距左初始位置
                var targetLeft = 0;
                for(var i=0;i<tds.length;i++){
                    if(i==startColNum) {
                        break;
                    }
                    targetLeft += $(tds[i]).outerWidth();
                }

                //计算距顶初始位置
                var targetTop = 0;
                for(var i=0;i<trs.length;i++){
                    if(i==startRowNum) {
                        break;
                    }
                    targetTop += $(trs[i]).outerHeight();
                }

                $(this).offset({left:tbObj.offset().left+(targetLeft),top:tbObj.offset().top+(targetTop)});

                //计算宽度
                var targetUiWidth = 0;
                for (var i=startColNum;i<tds.length;i++){
                    if(i==(startColNum+componentWidth)){
                        break;
                    }
                    targetUiWidth += $(tds[i]).outerWidth();
                }

                //计算高度
                var targetUiHeight = 0;
                for (var i=startRowNum;i<trs.length;i++){
                    if(i==(startRowNum+componentHeight)){
                        break;
                    }
                    targetUiHeight += $(trs[i]).outerHeight();
                }

                $(this).width(targetUiWidth);
                $(this).height(targetUiHeight);
            });
        }

    }

    $(window).resize();

});

/**
 * 刷新组建内容
 * @param btn
 */
function refreshPortlet(btn,contentUrl) {
    try {
        $(btn).parents('div.portlet-container').find('.portlet-content').load(contentUrl,function () {
            var portlet = $(btn).parents('div.portlet-container');
            var footer = portlet.find('.footer');
            if(footer.length>0) {
                portlet.css({
                    border:'none',
                    'background-color':footer.css('background-color')
                })
            }

            var copyright = portlet.find('.copyright');
            if(copyright.length>0) {
                portlet.css({
                    border:'none',
                    'background-color':copyright.css('background-color')
                })
            }
        });
    }catch (e){

    }

}

/**
 * 删除组件
 * @param btn
 */
function removePortlet(btn,title) {
    var that = btn;
    var delObj = $($(that).parents('div.portlet-container')[0]);
    $.xljUtils.confirm('blue','确定删除组件【'+title+'】吗？',function () {
        var portalPageComponents = $("body").data('portalPageComponents');
        var delObjId = delObj.attr("id");
        var portalPosition = portalPageComponents[delObjId];
        if(portalPageComponents){
            if(portalPosition&&portalPosition.id) {
                $.ajax({
                    type:"DELETE",
                    url:baseUrl+"/oa/portal/portalComponentPosition/delete/"+portalPosition.id,
                    data:JSON.stringify({portalPageId:$("body").data('portalPageId')}),
                    dataType:"json",
                    success:function (resultData ) {
                        if(resultData&&resultData.success) {
                            $.xljUtils.tip("green","组件已成功从页面移除！");
                        }else {
                            $.xljUtils.tip('red',"从页面移除组件失败！");
                            return;
                        }
                    },
                    error:function (xhr) {
                        $.xljUtils.getError(xhr.status);
                    }
                });
            }
            delete portalPageComponents[delObj.attr('id')];
            $('body').data('portalPageComponents',portalPageComponents);
        }

        var storageComponents = window.localStorage.getItem("portalPageComponents_"+$("body").data("portalPageId"));
        if(storageComponents) {
            storageComponents = JSON.parse(storageComponents);
            delete storageComponents[delObj.attr('id')];
            window.localStorage.setItem("portalPageComponents_"+$("body").data("portalPageId"),JSON.stringify(storageComponents));
        }

        delObj.remove();
    },function () {

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
    if(!portalPageComponents){
        $.xljUtils.tip('blue',"无法获取当前组件基本属性！");
        return;
    }

    var componentAttrObj = portalPageComponents[componentId];
    if(!componentAttrObj) {
        $.xljUtils.tip('blue',"无法获取当前组件基本属性！");
        return;
    }
    var title = componentAttrObj.title;
    if(title) {
        $("input[name='title']").val(title);
    }

    var icon = componentAttrObj.icon;
    if(icon) {
        $("input[name='icon']").val(icon);
    }

    var refreshInterval = componentAttrObj.refreshInterval;
    if(refreshInterval) {
        $("input[name='refreshInterval']").val(refreshInterval);
    }

    var displayTitle = componentAttrObj.displayTitle;
    if(displayTitle) {
        $("input[name='displayTitle'][value='"+displayTitle+"']")[0].checked=true;
    }

    var isDel = componentAttrObj.isDel;
    if(isDel) {
        $("input[name='isDel'][value='"+isDel+"']")[0].checked=true;
    }

    var displayMoveMenu = componentAttrObj.displayMoveMenu;
    if(displayMoveMenu) {
        $("input[name='displayMoveMenu'][value='"+displayMoveMenu+"']")[0].checked=true;
    }

    var displayMoreMenu = componentAttrObj.displayMoreMenu;
    if(displayMoreMenu) {
        $("input[name='displayMoreMenu'][value='"+displayMoreMenu+"']")[0].checked=true;
    }

    var paddingTop = componentAttrObj.paddingTop;
    if(paddingTop) {
        $("input[name='paddingTop']").val(paddingTop);
    }

    var paddingBottom = componentAttrObj.paddingBottom;
    if(paddingBottom) {
        $("input[name='paddingBottom']").val(paddingBottom);
    }

    var paddingLeft = componentAttrObj.paddingLeft;
    if(paddingLeft) {
        $("input[name='paddingLeft']").val(paddingLeft);
    }

    var paddingRight = componentAttrObj.paddingRight;
    if(paddingRight) {
        $("input[name='paddingRight']").val(paddingRight);
    }
    $("#componentAttrModal").modal({backdrop:'static',show:true});
}

/**
 * 保存组件属性，只是缓存到body中，未调用后台
 */
function saveComponentAttr() {
    var formEleArr = $("#componentAttrForm").serializeArray();
    var formEleJson = {};
    for(var i in formEleArr) {
        var name = formEleArr[i].name;
        var value = formEleArr[i].value;
        formEleJson[name] = value;
    }

    var componentId = formEleJson.componentId;
    var portalPageComponents = $("body").data("portalPageComponents");
    if(!portalPageComponents){
        $.xljUtils.tip('blue',"无法获取当前组件基本属性！");
        $('#componentAttrModal').modal('hide');
        return;
    }
    var componentAttrObj = portalPageComponents[componentId];
    if(!componentAttrObj) {
        $.xljUtils.tip('blue',"无法获取当前组件基本属性！");
        $('#componentAttrModal').modal('hide');
        return;
    }

    var title = formEleJson.title;
    componentAttrObj.title = title?title:null;

    var icon = formEleJson.icon;
    componentAttrObj.icon = icon?icon:null;

    var refreshInterval = formEleJson.refreshInterval;
    componentAttrObj.refreshInterval = refreshInterval?parseInt(refreshInterval):0;

    var paddingTop = formEleJson.paddingTop;
    componentAttrObj.paddingTop = paddingTop?paddingTop:null;

    var paddingBottom = formEleJson.paddingBottom;
    componentAttrObj.paddingBottom = paddingBottom?paddingBottom:null;

    var paddingLeft = formEleJson.paddingLeft;
    componentAttrObj.paddingLeft = paddingLeft?paddingLeft:null;

    var paddingRight = formEleJson.paddingRight;
    componentAttrObj.paddingRight = paddingRight?paddingRight:null;

    var displayTitle = formEleJson.displayTitle;
    if(displayTitle=='N'){
        $('div[id="'+componentId+'"]').find('.news_title').css({display:'none'});
    }
    componentAttrObj.displayTitle = displayTitle?displayTitle:null;

    var isDel = formEleJson.isDel;
    componentAttrObj.isDel = isDel?isDel:null;

    var displayMoveMenu = formEleJson.displayMoveMenu;
    componentAttrObj.displayMoveMenu = displayMoveMenu?displayMoveMenu:null;

    var displayMoreMenu = formEleJson.displayMoreMenu;
    componentAttrObj.displayMoreMenu = displayMoreMenu?displayMoreMenu:null;

    portalPageComponents[componentId] = componentAttrObj;

    $("body").data("portalPageComponents",portalPageComponents);
    $('#componentAttrModal').modal('hide');
    $("#componentAttrForm")[0].reset();

    $.xljUtils.tip('green','组件属性保存成功！');
}

/**
 * 设置cookie
 * @param c_name
 * @param value
 * @param expiredays
 */
function setCookie(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

/**
 * 获取cookie值
 * @param c_name
 * @returns {string}
 */
function getCookie(c_name) {
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}