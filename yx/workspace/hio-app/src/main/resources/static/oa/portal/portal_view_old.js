/**
 * erp_cloud_platform portal_view Created by dingguanghuai on 2017/3/29.
 * @author dingguanghuai
 * @date 2017/3/29
 */
$(function () {
    //将portalPageId缓存至body中
    var urlParam = $.xljUtils.getUrlParams();
    $('body').data(urlParam);

    var documentBodyHeight = $(window).height();
    var documentBodyWidth = $(window).width();
    //添加背景表格
    function _addTrs(tb,init) {

        var trHeight =  $('#'+tb+' tr').height();
        for(var i=0;i<24;i++) {
            var trObj = $('<tr></tr>');
            for(var j=0;j<32;j++) {
                var tdObj = $('<td></td>');
                trObj.append(tdObj);
            }

            $('#'+tb).append(trObj);
        }
        if(init) {
            var tabelHeight =  documentBodyHeight;
            $('#'+tb+' tr').height(Math.round(tabelHeight/24));
        }else {

            $('#'+tb+' tr').height(trHeight);
        }

    };
    //初始化背景表格
    _addTrs('backgroundTable',true);

    /**
     * 重置table尺寸
     * @private
     */
    function _resizeTable() {
        var tabelHeight = $(window).height();
        $('#backgroundTable tr').height(Math.round(tabelHeight/24));
    }

    /**
     * 初始化布局容器大小
     */
    function _initResizeContainer() {
        $('#resizeContainer').css({
            position:'absolute',
            'z-index':'2',
            width:'100%',
            display:'block'
        });

        $('#resizeContainer').height($('#backgroundTable').height());
        $('#resizeContainer').width($('#backgroundTable').width());

    }
    _initResizeContainer();

    //组装组件列表内容
    function _assembleComponents(componentObj) {
        //组件外层容器div

        var divContainer = $('<div id="' + componentObj.componentId + '" class="myresizable"></div>');

        //组件
        var myresizableObj = $('<div class="panel panel-default" ></div>');
        myresizableObj.css({
            padding:'0',
            margin:'0',
            width:'100%',
            height:'100%'
        });
        if($("body").data("edit")=='true'){
            myresizableObj = $('<div id="' + componentObj.componentId + '" class="panel panel-default myresizable" ></div>');
        }
        divContainer.append(myresizableObj);
        //组件标题栏
        var panelHeadObj = $('<div class="panel-heading clearfix" ></div>');
        myresizableObj.append(panelHeadObj);
        //组件标题容器
        var panelTitleContainerObj = $('<div class="form-inline clearfix"></div>');
        panelHeadObj.append(panelTitleContainerObj);
        //组件标题
        var panelTitleObj = $('<label class="control-label"></label>');
        var iconObj = $('<i class="'+componentObj.icon+'"></i>');
        panelTitleObj.append(iconObj);
        panelTitleObj.append(''+componentObj.title+'');
        panelTitleContainerObj.append(panelTitleObj);

        //组件标题容器中的工具容器
        var panelToolsObj = $('<div class=" pull-right" ></div>');
        //删除按钮
        var delObj = $('<span style="padding:5px;cursor:pointer;" onclick="delComponent(this)"><i class="glyphicon glyphicon-remove" title="删除"></i></span>');
        //刷新按钮
        var refrenshObj = $('<span style="padding:5px;cursor:pointer;" onclick="refreshComponent(this)"><i class="glyphicon glyphicon-refresh" title="刷新"></i></span>');
        //移动按钮
        var moveObj = $('<span style="padding:5px;cursor:move;" class="move"><i class="glyphicon glyphicon-move" title="移动"></i></span>');
        //更多按钮
        var moreObj = $('<span style="padding:5px;cursor:pointer;" ><a href="'+componentObj.moreUrl+'" target="_blank"><i class="glyphicon glyphicon-th-list" title="更多"></i></a></span>');
        panelToolsObj.append(moreObj);
        panelToolsObj.append(moveObj);
        panelToolsObj.append(refrenshObj);
        panelToolsObj.append(delObj);
        panelTitleContainerObj.append(panelToolsObj);
        //组件内容放置body
        var resizablePanelBodyObj = $('<div class="panel-body" style="padding:0px;"></div>');
       /* resizablePanelBodyObj.css({
            padding: '0px',
            width: '100%',
            height: '85%'
        });*/
        myresizableObj.append(resizablePanelBodyObj);

        $("body").data(componentObj.componentId,componentObj.componentUrl);
        if($("body").data("edit")=='true'){
            return myresizableObj
        }
        return divContainer;
    }

    /**
     * 初始化布局
     * @private
     */
    function _initLayout() {
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
                _showComponents(componentPosition);
            }
        }else{
            $.ajax({
                type:"POST",
                url: "http://127.0.0.1:9999/platform-app/oa/portal/portalComponentPosition/queryList",
                data:JSON.stringify({portalPageId:$("body").data('portalPageId')}),
                dataType:"json",
                contentType:'application/json',
                success:function (resultData ) {
                    if(resultData) {
                        var componentPositions = resultData.result;
                        var components = [];
                        $.each(componentPositions,function (i,componentPosition) {
                            _showComponents(componentPosition);
                        });
                    }
                }
            });
        }
    }
    _initLayout();

    /**
     * 加载每个组件内容
     * @param componentPosition
     */
    function _showComponents(componentPosition) {
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
        if((startRowNum+componentHeight)>24){
            _addTrs('backgroundTable',false);
            _initResizeContainer();
        }

        var refreshInterval = componentPosition.refreshInterval;
        var icon = componentPosition.icon;
        var title = componentPosition.title;
        var isDel = componentPosition.isDel;
        var paddingLeft = componentPosition.paddingLeft;
        var paddingTop = componentPosition.paddingTop;
        var paddingRight = componentPosition.paddingRight;
        var paddingBottom = componentPosition.paddingBottom;
        //缓存至body中的组件信息
        var bodyPortalPageComponents = $('body').data("portalPageComponents");
        if(!bodyPortalPageComponents){
            bodyPortalPageComponents = {};
        }

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

        //获取component组件信息
        $.ajax({
            type:"GET",
            url:"/platform-app/portal/component/get/"+componentId,
            dataType:"json",
            success:function (resultData ) {
                var url = resultData.result.contentUrl;
                componentPosition['componentUrl']=url;
                bodyPortalPageComponents[componentId] = componentPosition;
                //将组件缓存至body
                $('body').data('portalPageComponents',bodyPortalPageComponents);

                var panelObj = _assembleComponents(componentPosition);

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

                panelObj.width(targetUiWidth-1);
                panelObj.height(targetUiHeight-1);

                panelObj.css({
                    float:'left',
                    position:'absolute',
                    overflow:'hidden'
                });

                if($("body").data("edit")!='true'){
                    panelObj.css({
                        'padding-left':paddingLeft+'px',
                        'padding-right':paddingRight+'px',
                        'padding-top':paddingTop+'px',
                        'padding-bottom':paddingBottom+'px',
                    });
                }

                panelObj.find('.glyphicon-refresh').parent('span').hide();
                panelObj.find('.glyphicon-refresh').parent('span').click();
                if(displayTitle=='N'){
                    panelObj.find('.panel-heading').hide();
                }

                if(isDel=='N'){
                    panelObj.find('.glyphicon-remove').parent('span').hide();
                }

                if(displayMoveMenu=='N'){
                    panelObj.find('.glyphicon-move').parent('span').hide();
                }

                if(displayMoreMenu=='N') {
                    panelObj.find('.glyphicon-move').parent('a').parent('span').hide();
                }

                $("#resizeContainer").append(panelObj);
                if($("body").data("edit")=='true'){
                    _containmentDragObjs(panelObj);

                    _containmentResizableObjs(panelObj);
                }

            }
        });
    }

    /**
     * 定义设计容器内组件可拖拽
     * @param dragableObj
     * @private
     */
    function _containmentDragObjs(dragableObj) {
        var tdHeight = $("#backgroundTable tr td").outerHeight();
        var tdWidth = $("#backgroundTable tr td").outerWidth();

        //使拖拽到容器内的组件可在容器范围内拖拽
        dragableObj.draggable({
            containment:"#resizeContainer",
            handle:"span.move",
            //grid:[tdWidth,tdHeight],
            stop:function (event,ui) {
                var tdHeight0 = $("#backgroundTable tr td").outerHeight();
                var tdWidth0 = $("#backgroundTable tr td").outerWidth();

                var uiHeight = ui.helper.height();
                var uiWidth = ui.helper.width();
                var x = Math.floor(uiWidth/tdWidth0);
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

                ui.helper.offset({left:tableOffset.left+(targetLeft),top:tableOffset.top+(targetTop)});


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
                ui.helper.width(targetUiWidth-2);
                ui.helper.height(targetUiHeight-2);
            }
        });
    }

    /**
     * 定义设计容器内组件可更改大小
     * @param resizableObj
     * @private
     */
    function _containmentResizableObjs(resizableObj) {
        var tdHeight = $("#backgroundTable tr td").outerHeight();
        var tdWidth = $("#backgroundTable tr td").outerWidth();

        //使拖拽到容器内的组件可在容器范围内缩放
        resizableObj.resizable({
            grid:[tdWidth,tdHeight],
            containment:"#resizeContainer",
            handles:"all",
            stop:function (event,ui) {
                var tdHeight1 = $("#backgroundTable tr td").outerHeight();
                var tdWidth1 = $("#backgroundTable tr td").outerWidth();

                var uiHeight = ui.size.height;
                var uiWidth = ui.size.width;
                var x = Math.floor(uiWidth/tdWidth1);
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

                $(this).width(targetUiWidth-2);
                $(this).height(targetUiHeight-2);

            }
        });
    }


    /**
     * 重置组件容器尺寸
     * @private
     */
    function _resizeContainers() {
        //_initContainersSize();
        _resizeTable();
        _initResizeContainer();
        _resizeComponents();
    }

    /**
     * 重置布局设计器中的组件大小
     * @private
     */
    function _resizeComponents() {
        var resizableObjs =  $('#resizeContainer .myresizable');
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

                $(this).width(targetUiWidth-1);
                $(this).height(targetUiHeight-1);
            });
        }

    }

    $(window).on('resize',function () {
        _resizeContainers();
    });


});

//刷新组件内容
function refreshComponent(refreshBtn) {
    console.info($('body').data());
    var panelObj = $($(refreshBtn).parents('div.myresizable')[0]);
    var componentId = panelObj.attr('id');
    var overlayObj = $('<div></div>');
    overlayObj.css({
        'z-index': 50,
        background: 'rgba(255,255,255,0.7)',
        'border-radius': '3px',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
    });
    var refreshIconObj = $('<i class="fa fa-refresh fa-spin"></i>');
    refreshIconObj.css({
        position: 'absolute',
        top: '50%',
        left: '50%',
        'margin-left': '-15px',
        'margin-top': '-15px',
        color: '#000',
        'font-size': '30px'
    });
    overlayObj.append(refreshIconObj);
    $(panelObj.find('.panel-body')[0]).append(overlayObj);
    $(panelObj.find('.panel-body')[0]).load($('body').data()[componentId],function () {
        overlayObj.remove();
    });
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