$(function () {
    //获取url参数，并将其缓存至body中
    var urlParam = $.xljUtils.getUrlParams();
    $('body').data(urlParam);

    //页面缓存画好的portal页面组件列表
    $('body').data('portalPageComponents',{});

    //增加一屏按钮事件
    $('#increaseScreenBtn').on('click',function () {
        var height = $('#componentParentContainer').height()-32;
        $('#componentContainer').height($('#componentContainer').height()+height);
        //$('#componentContainer').css({'min-height':});
        scaleXHelpLine();
        scaleYHelpLine();

    });

    //保存首页组件位置信息
    $('#saveBtn').on('click',function () {
        var portalPageComponents = $("body").data("portalPageComponents");
        if(portalPageComponents){
            var components = [];
            for(var i in portalPageComponents){
                components.push(portalPageComponents[i]);
            }

            $.ajax({
                type:"POST",
                url:baseUrl+"oa/portal/portalComponentPosition/saveBatch",
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

    //预览
    $('#previewPortalBtn').on('click',function () {
        window.open('portal_view_copy.html?portalPageId='+$("body").data("portalPageId")+'&_t='+new Date().getTime(),'_blank') ;
    });

    //关闭窗口
    $('#closeWinBtn').on('click',function () {
        window.close();
    });

    /**
     * 初始化页面布局
     */
    function initLayout() {
        var winHeight = $(window).height()-100;
        //$('#componentParentContainer').height(winHeight);
        $('#componentParentContainer').css({'min-height':winHeight+'px'});
        //$('#leftBar').height(winHeight-20);
        $('#leftBar').css({'height':(winHeight)+'px'});
        //$('#componentContainer').height($('#componentParentContainer').height()-32);
        $('#componentContainer').css({'min-height':($('#componentParentContainer').height()-32)+'px'});

    }
    initLayout();

    /**
     * 添加x轴辅助线
     */
    function scaleXHelpLine() {
        $('body').find('div.scale-help-line-x').remove();
        var wid = $('#componentContainer').width();
        var containerOffset = $('#componentContainer').offset();
        for (var i = 0; i <= 64; i++) {
            var spaceSize = wid/64;
            var scaleLineObj = $('<div class="scale-help-line-x"></div>');
            scaleLineObj.show();
            scaleLineObj.css({position:'absolute',top:containerOffset.top,left:containerOffset.left+spaceSize*i,height:($('#componentContainer').height())+'px','border-left': '1px dotted gray',width:'1px','z-index':'1'});
            $('body').append(scaleLineObj);
        }
    }
    scaleXHelpLine();

    /**
     * 添加y轴辅助线
     */
    function scaleYHelpLine() {
        $('body').find('div.scale-help-line-y').remove();
        var h = $('#componentContainer').height();
        var containerOffset = $('#componentContainer').offset();
        for (var i = 0; i <= Math.floor(h/25); i++) {
            var spaceSize = 25;
            var scaleLineObj = $('<div class="scale-help-line-y"></div>');
            scaleLineObj.show();
            scaleLineObj.css({position:'absolute',top:containerOffset.top+spaceSize*i,left:containerOffset.left,width:($('#componentContainer').width())+'px','border-top': '1px dotted gray',height:'1px','z-index':'1'});
            $('body').append(scaleLineObj);
        }
    }
    scaleYHelpLine();

    /**
     * 组装组件列表
     * @param component
     */
    function assembleComponentList(component) {
        var liObj = $('<li></li>');
        liObj.attr('title',component.title);
        liObj.addClass('dropable-cs');

        var spanIconObj = $('<span></span>');
        spanIconObj.addClass('glyphicon');
        spanIconObj.addClass('glyphicon-cog');
        liObj.append(spanIconObj);

        var spanTextObj = $('<span></span>');
        spanTextObj.addClass('glyphicon-class');
        spanTextObj.text($.xljUtils.htmlDecode(component.title));
        liObj.append(spanTextObj);

        //拖拽容器
        var divObj = $('<div class="resizable-cs"></div>');
        liObj.append(divObj);

        //组件容器
        var groupNewsContainerObj = $('<div class="groupnews_container"></div>');
        groupNewsContainerObj.attr('data-contentUrl',$.xljUtils.htmlDecode(component.contentUrl));
        groupNewsContainerObj.attr('data-title',$.xljUtils.htmlDecode(component.title));
        groupNewsContainerObj.attr('data-moreUrl',$.xljUtils.htmlDecode(component.moreUrl));
        groupNewsContainerObj.attr('id','pre_'+$.xljUtils.htmlDecode(component.componentId));
        divObj.append(groupNewsContainerObj);

        //
        var fullWidthObj = $('<div class="fullWidth"></div>');
        groupNewsContainerObj.append(fullWidthObj);

        //标题容器
        var newsTitleObj = $('<div class="news_title clearfix"></div>');
        fullWidthObj.append(newsTitleObj);

        //标题
        var titleSpanObj = $('<span><img src="../../common/img/arrow_mini.png" alt="">'+component.title+'</span>');
        //titleSpanObj.text(component.title);
        newsTitleObj.append(titleSpanObj);

        //更多按钮
        //var moreLinkObj = $('<a href="#" class="news_more">更多</a>');
        /*if(component.moreUrl&&component.moreUrl!=''){
            var reg = /^(http:\/\/)/;
            component.moreUrl = reg.test(component.moreUrl)?component.moreUrl:('http://'+window.location.host+component.moreUrl);
            //moreLinkObj.attr('href',component.moreUrl);
        }else{
            moreLinkObj.attr('href','javascript:void(0)');
        }*/
        //newsTitleObj.append(moreLinkObj);

        //组件内容
        var contentObj = $('<div class="component-content"></div>');
        contentObj.css({'min-heihgt':'260px'});
        fullWidthObj.append(contentObj);

        //操作按钮栏
        var toolsObj = $('<div class="component-tools"></div>');
        toolsObj.css({
            position: 'absolute',
            left: '0',
            top: '0px',
            border: '1px solid #eee',
            height: '40px',
            width: '100%',
            'z-index': '5',
            'background-color': '#333',
            filter:'alpha(Opacity=80)',
            '-moz-opacity':'0.3',
            'opacity': '0.3'
        });
        fullWidthObj.append(toolsObj);

        //操作按钮
        var toolsGroupObj = $('<div class="pull-right"></div>');
        toolsGroupObj.css({'line-height':'40px'});
        toolsObj.append(toolsGroupObj);
        //删除按钮
        var delObj = $('<a href="javascript:void(0);" class="news_more" title="删除" ><i class="glyphicon glyphicon-remove"></i> </a>');
        delObj.attr('onclick','removePortlet(this,"'+$.xljUtils.htmlDecode(component.title)+'")');
        delObj.css({
            float:'right',
            'margin-right':'10px',
            color: '#fff'
        });
        toolsGroupObj.append(delObj);

        //移动按钮
        var moveObj = $('<a href="javascript:void(0);" class="news_more move" title="移动" ><i class="glyphicon glyphicon-move"></i> </a>');
        moveObj.css({
            cursor:'move',
            float:'right',
            'margin-right':'10px',
            color: '#fff'
        });
        toolsGroupObj.append(moveObj);

        //刷新按钮
        var refreshObj = $('<a href="javascript:void(0);" class="news_more" title="刷新" ><i class="glyphicon glyphicon-refresh"></i> </a>');
        refreshObj.attr('onclick','refreshPortlet(this,"'+($.xljUtils.htmlDecode(component.contentUrl)==''?'undefined':$.xljUtils.htmlDecode(component.contentUrl))+'")');
        refreshObj.css({
            float:'right',
            'margin-right':'10px',
            color: '#fff'
        });
        toolsGroupObj.append(refreshObj);

        //编辑组件属性按钮
        var editObj = $('<a href="javascript:void(0);" class="news_more" title="编辑组件属性" ><i class="glyphicon glyphicon-edit"></i> </a>');
        editObj.attr('onclick','editComponentAttr(this)');
        editObj.css({
            float:'right',
            'margin-right':'10px',
            color: '#fff'
        });
        toolsGroupObj.append(editObj);

        //更多按钮
        var moreObj = $('<a href="javascript:void(0);" class="news_more" title="更多" ><i class="glyphicon glyphicon-th-list"></i> </a>');
        if(component.moreUrl&&component.moreUrl!=''){
            var reg = /^(http:\/\/)/;
            component.moreUrl = reg.test(component.moreUrl)?component.moreUrl:('http://'+window.location.host+component.moreUrl);
            moreObj.attr('href',$.xljUtils.htmlDecode(component.moreUrl));
            moreObj.attr('target','_blank');
        }
        moreObj.css({
            float:'right',
            'margin-right':'10px',
            color: '#fff'
        });
        toolsGroupObj.append(moreObj);

        return liObj;
    }

    /**
     * 初始化左侧组件列表
     */
    function initComponentList() {
        //leftBar
        $.ajax({
            url:serviceUrl+'portal/component/queryAllList',
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

                            //根据分类创建分类标题
                            var h4Obj = $('<h4></h4>');
                            h4Obj.text(componentList[0].categoryName);
                            $('#leftBar').append(h4Obj);

                            //创建分类下组件容器
                            var divObj = $('<div></div>');
                            $('#leftBar').append(divObj);
                            divObj.addClass('bs-glyphicons');

                            //创建分类下组件容器
                            var ulObj = $('<ul></ul>');
                            divObj.append(ulObj);
                            ulObj.addClass('bs-glyphicons-list');
                            for(var j in componentList){
                                var component = componentList[j];
                                //component.title = $.xljUtils.htmlDecode(component.title);
                                component.componentId = component.id;
                                var liObj = assembleComponentList(component);
                                ulObj.append(liObj);
                                definedDragObj(liObj);
                            }

                        }

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

    $(window).on('resize',function () {
        //var winHeight = $(window).height()-100;
        //$('#componentParentContainer').height(winHeight);
        //$('#leftBar').height(winHeight-20);
        //$('#componentContainer').height($('#componentParentContainer').height()-32);
        scaleXHelpLine();
        scaleYHelpLine();
    });

    /**
     * 定义画布区域组件可放置
     */
    $( "#componentContainer" ).droppable({
        accept:'.dropable-cs',
        drop:function (event,ui) {
            //页面缓存组件位置信息
            var componentPositionObjs = $('body').data('portalPageComponents');

            //将对应组件内容画到portal页中
            var dropObj = ui.helper.find('div.groupnews_container');

            //组件ID
            var componentId = dropObj.attr('id').replace('pre_','');
            dropObj.attr('id',componentId);
            var positionObj = componentPositionObjs[componentId];
            if(!positionObj){
                positionObj = {};
            }else{
                $.xljUtils.tip('blue','组件已存在！');
                return false;
            }

            var lastObj = $('#componentContainer .resizable-cs:last');
            var helperOffset = ui.helper.offset();
            var containerOffset = $('#componentParentContainer').offset();
            var initTop = helperOffset.top - containerOffset.top;
            initTop = initTop<0?0:initTop;
            var initLeft = helperOffset.left - containerOffset.left;
            initLeft = initLeft<0?0:initLeft;




            dropObj.hover(function () {
                $(this).find('.component-tools').fadeIn('slow','linear');
            },function () {
                $(this).find('.component-tools').fadeOut(1000,'linear');
            });
            dropObj.find('.glyphicon-refresh').parent('a').click();

            //组件在画布中位置ID
            var positionId = $('body').data('positionUUID');
            positionObj.id = positionId;//位置id
            positionObj.componentId = componentId;//组件id
            positionObj.portalPageId = $('body').data('portalPageId');//首页ID


            if(!lastObj[0]){
                $('#componentContainer').append(dropObj);
                ui.helper.remove();
            }else{
                $(lastObj[0]).after(dropObj);
            }

            var initStartRow = Math.floor(initTop/25);
            var wid = $('#componentContainer').width();
            var initStartCol = Math.floor(initLeft/(wid/64));

            if(initStartCol>(64-8)){
                initStartCol = 64-8;
            }
            var startPosition = $($('.scale-help-line-x')[initStartCol]).offset().left;
            var endPosition = $($('.scale-help-line-x')[initStartCol+8]).offset().left;
            dropObj.width(endPosition-startPosition);
            dropObj.height(300);
            dropObj.css({position:'absolute','z-index':'3','background-color': '#fff'});
            dropObj.css({top:($($('.scale-help-line-y')[initStartRow]).offset().top-$($('.scale-help-line-y')[0]).offset().top+17)+'px',left:($($('.scale-help-line-x')[initStartCol]).offset().left-$($('.scale-help-line-x')[0]).offset().left+31)+'px'});

            //初始化组件位置信息
            positionObj.componentHeight = 300;//组件高度，以px计算，初始300px
            positionObj.componentWidth = 8;//组件宽度，以列计算，初始8列
            positionObj.startColNum = initStartCol;//开始列
            positionObj.startRowNum = $($('.scale-help-line-y')[initStartRow]).offset().top-$($('.scale-help-line-y')[0]).offset().top;//开始行(像素)

            positionObj.contentUrl = dropObj.attr('data-contentUrl');//组件内容URL
            positionObj.moreUrl = dropObj.attr('data-moreUrl');//组件内容URL
            positionObj.delflag = false;
            positionObj.title = dropObj.attr('data-title');
            //内边距
            positionObj.paddingBottom = 9;
            positionObj.paddingLeft = 0;
            positionObj.paddingRight = 8;
            positionObj.paddingTop = 0;

            positionObj.refreshInterval = 0;
            positionObj.icon = null;
            positionObj.displayTitle = 'Y';
            positionObj.isDel = 'N';
            positionObj.displayMoveMenu = 'Y';
            positionObj.displayMoreMenu = 'Y';

            //将组件缓存至body中
            componentPositionObjs[componentId] = positionObj;
            $('body').data('portalPageComponents',componentPositionObjs);


            //定义组件在画布范围内可拖拽
            definedDragObjInContainer(dropObj);

            //定义组件在画布范围内可更改大小
            definedResizableInContainer(dropObj);

        }
    });

    //定义组件在画布范围内可拖拽
    function definedDragObjInContainer(dropObj) {
        //定义组件在画布范围内可拖拽
        dropObj.draggable({
            //grid: [ 1, 1],
            handle:".move",
            containment: "#componentContainer",
            drag:function (event,ui) {
                var helper = ui.helper;
                var position = ui.position;
                var offset = ui.offset;

                //上
                var topLineObj = $('#componentContainer').find('.drop-help-line-top');
                if(!topLineObj[0]){
                    topLineObj = $('<div class="drop-help-line-top"></div>');
                    $('#componentContainer').append(topLineObj);
                }
                topLineObj.show();
                topLineObj.css({position:'absolute',top:position.top,width:($('#componentContainer').width())+'px','border-top': '1px dotted gray',height:'1px','z-index':'333'});

                //下
                var bottomLineObj = $('#componentContainer').find('.drop-help-line-bottom');
                if(!bottomLineObj[0]){
                    bottomLineObj = $('<div class="drop-help-line-bottom"></div>');
                    $('#componentContainer').append(bottomLineObj);
                }
                bottomLineObj.show();
                bottomLineObj.css({position:'absolute',top:position.top+helper.height(),width:($('#componentContainer').width())+'px','border-top': '1px dotted gray',height:'1px','z-index':'333'});

                //左
                var leftLineObj = $('#componentContainer').find('.drop-help-line-left');
                if(!leftLineObj[0]){
                    leftLineObj = $('<div class="drop-help-line-left"></div>');
                    $('#componentContainer').append(leftLineObj);
                }
                leftLineObj.show();
                leftLineObj.css({position:'absolute',top:'0px',left:position.left,height:($('#componentContainer').height()+15)+'px','border-left': '1px dotted gray',width:'1px','z-index':'333'});

                //右
                var rightLineObj = $('#componentContainer').find('.drop-help-line-right');
                if(!rightLineObj[0]){
                    rightLineObj = $('<div class="drop-help-line-right"></div>');
                    $('#componentContainer').append(rightLineObj);
                }
                rightLineObj.show();
                rightLineObj.css({position:'absolute',top:'0px',left:position.left+helper.width(),height:($('#componentContainer').height()+15)+'px','border-left': '1px dotted gray',width:'1px','z-index':'333'});


                var offsetTipDivObj = $('#componentContainer').find('.offset-tip');
                if(!offsetTipDivObj[0]){
                    offsetTipDivObj = $('<div class="offset-tip"></div>');
                    $('#componentContainer').append(offsetTipDivObj);
                }
                offsetTipDivObj.show();
                offsetTipDivObj.css({position:'absolute',top:(position.top+helper.height()-150)+'px',left:position.left+helper.width()-200,height:'150px','border': '1px solid gray',width:'200px','z-index':'333',color:'red'});
                //offsetTipDivObj.text('当前位置x:'+position.left+';当前位置y:'+position.top);
                var containerWidth = $('#componentContainer').width();

                offsetTipDivObj.html('当前组件起始位置(列):第' + Math.round((position.left-64)/(containerWidth/64)) + '列;<br/>当前组件结束位置(列):第'+ (Math.round((position.left-64+helper.width())/(containerWidth/64)-1))
                    +'列;<br/>当前组件起始位置（y）：'+Math.round(position.top-17)+'px;<br/>当前组件结束位置(y):'+Math.round(position.top-17+helper.height())+'px;');

            },
            stop:function (event,ui) {
                //上
                var topLineObj = $('#componentContainer').find('.drop-help-line-top');
                topLineObj.hide();
                //下
                var bottomLineObj = $('#componentContainer').find('.drop-help-line-bottom');
                bottomLineObj.hide();
                //左
                var leftLineObj = $('#componentContainer').find('.drop-help-line-left');
                leftLineObj.hide();
                //右
                var rightLineObj = $('#componentContainer').find('.drop-help-line-right');
                rightLineObj.hide();

                var offsetTipDivObj = $('#componentContainer').find('.offset-tip');
                offsetTipDivObj.hide();

                var helper = ui.helper;
                var position = ui.position;
                var offset = ui.offset;


                var l = position.left;
                var t = position.top;
                var xLineIndex = Math.round((l-32)/($('#componentContainer').width()/64));
                var yLineIndex = Math.round((t-17)/25);

                var t1 = $($('.scale-help-line-y')[yLineIndex]).offset().top-$($('.scale-help-line-y')[0]).offset().top;
                var l1 = $($('.scale-help-line-x')[xLineIndex]).offset().left-$($('.scale-help-line-x')[0]).offset().left;

                ui.helper.css({'left':(l1+32)+'px','top':(t1+17)+'px'});
                position = ui.position;
                offset = ui.offset;

                var positionCs = {
                    top:parseFloat(ui.helper.css('top')),
                    left:parseFloat(ui.helper.css('left')),
                    height:parseFloat(ui.helper.css('height')),
                    width:parseFloat(ui.helper.css('width'))
                };
                var containerWidth = $('#componentContainer').width();
                var startCol = Math.round((positionCs.left-32)/(containerWidth/64));
                var endCol = Math.round((positionCs.left-32+positionCs.width)/(containerWidth/64)-1);
                var startY = positionCs.top-17;

                //组件ID
                var componentId1 = helper.attr('id');

                var componentPositionObjs1 = $('body').data('portalPageComponents');
                var positionObj1 = componentPositionObjs1[componentId1];
                if(!positionObj1){
                    positionObj1 = {};
                }

                //初始化组件位置信息
                positionObj1.componentHeight = positionCs.height;//组件高度，以px计算，初始300px
                positionObj1.componentWidth = endCol-startCol+1;//组件宽度，以列计算，初始8列
                positionObj1.startColNum = startCol;//开始列
                positionObj1.startRowNum = startY;//开始行(像素)
                $('body').data('portalPageComponents',componentPositionObjs1);

            }
        });
    }

    //定义组件在画布范围内可更改大小
    function definedResizableInContainer(dropObj) {
        dropObj.resizable({
            //minHeight:300,
            //grid: [ 1, 1],
            handles:"all",
            containment: "#componentContainer",
            //animate: true,
            resize:function (event,ui) {
                var $element = ui.element;//resize对象
                var $helper = ui.helper;//
                var $originalElement = ui.originalElement;//原始对象
                var $originalPosition = ui.originalPosition;//原始位置
                var $originalSize = ui.originalSize;//原始大小
                var $position = ui.position;//当前位置
                var $size = ui.size;//当前大小


                var eleOffset;
                if($element[0].style.top&&$element[0].style.top!=''){
                    eleOffset = {top:parseInt($element[0].style.top.replace('px','')),left:parseInt($element[0].style.left.replace('px',''))};
                }else{
                    var componentParentContainerOffset = $('#componentParentContainer').offset();
                    eleOffset = {top:parseInt($element.offset().top-componentParentContainerOffset.top),left:parseInt($element.offset().left-componentParentContainerOffset.left-17+64)};
                }

                //上
                var topLineObj = $('#componentContainer').find('.drop-help-line-top');
                if(!topLineObj[0]){
                    topLineObj = $('<div class="drop-help-line-top"></div>');
                    $('#componentContainer').append(topLineObj);
                }
                topLineObj.show();
                topLineObj.css({position:'absolute',top:eleOffset.top,width:($('#componentContainer').width())+'px','border-top': '1px dotted gray',height:'1px','z-index':'333'});

                //下
                var bottomLineObj = $('#componentContainer').find('.drop-help-line-bottom');
                if(!bottomLineObj[0]){
                    bottomLineObj = $('<div class="drop-help-line-bottom"></div>');
                    $('#componentContainer').append(bottomLineObj);
                }
                bottomLineObj.show();
                bottomLineObj.css({position:'absolute',top:eleOffset.top+$helper.height(),width:($('#componentContainer').width())+'px','border-top': '1px dotted gray',height:'1px','z-index':'333'});

                //左
                var leftLineObj = $('#componentContainer').find('.drop-help-line-left');
                if(!leftLineObj[0]){
                    leftLineObj = $('<div class="drop-help-line-left"></div>');
                    $('#componentContainer').append(leftLineObj);
                }
                leftLineObj.show();
                leftLineObj.css({position:'absolute',top:'0px',left:eleOffset.left,height:($('#componentContainer').height()+15)+'px','border-left': '1px dotted gray',width:'1px','z-index':'333'});

                //右
                var rightLineObj = $('#componentContainer').find('.drop-help-line-right');
                if(!rightLineObj[0]){
                    rightLineObj = $('<div class="drop-help-line-right"></div>');
                    $('#componentContainer').append(rightLineObj);
                }
                rightLineObj.show();
                rightLineObj.css({position:'absolute',top:'0px',left:eleOffset.left+$helper.width(),height:($('#componentContainer').height()+15)+'px','border-left': '1px dotted gray',width:'1px','z-index':'333'});


                var offsetTipDivObj = $('#componentContainer').find('.offset-tip');
                if(!offsetTipDivObj[0]){
                    offsetTipDivObj = $('<div class="offset-tip"></div>');
                    $('#componentContainer').append(offsetTipDivObj);
                }
                offsetTipDivObj.show();
                offsetTipDivObj.css({position:'absolute',top:(eleOffset.top+$size.height-150)+'px',left:eleOffset.left+$size.width-200,height:'150px','border': '1px solid gray',width:'200px','z-index':'333',color:'red'});
                //offsetTipDivObj.text('当前位置x:'+eleOffset.left+';当前位置y:'+eleOffset.top);
                var containerWidth = $('#componentContainer').width();

                offsetTipDivObj.html('当前组件起始位置(列):第' + Math.round((eleOffset.left-32)/(containerWidth/64)) + '列;<br/>当前组件结束位置(列):第'+ (Math.round((eleOffset.left-32+$helper.width())/(containerWidth/64)-1))
                    +'列;<br/>当前组件起始位置（y）：'+Math.round(eleOffset.top-17)+'px;<br/>当前组件结束位置(y):'+Math.round(eleOffset.top-17+$helper.height())+'px;');
            },
            stop:function (event, ui) {
                //上
                var topLineObj = $('#componentContainer').find('.drop-help-line-top');
                topLineObj.hide();
                //下
                var bottomLineObj = $('#componentContainer').find('.drop-help-line-bottom');
                bottomLineObj.hide();
                //左
                var leftLineObj = $('#componentContainer').find('.drop-help-line-left');
                leftLineObj.hide();
                //右
                var rightLineObj = $('#componentContainer').find('.drop-help-line-right');
                rightLineObj.hide();

                var offsetTipDivObj = $('#componentContainer').find('.offset-tip');
                offsetTipDivObj.hide();

                var $element = ui.element;//resize对象
                var $helper = ui.helper;//
                var $originalElement = ui.originalElement;//原始对象
                var $originalPosition = ui.originalPosition;//原始位置
                var $originalSize = ui.originalSize;//原始大小
                var $position = ui.position;//当前位置
                var $size = ui.size;//当前大小

                var l = $position.left;
                var t = $position.top;
                var xLineIndex = Math.round((l-32)/($('#componentContainer').width()/64));
                var yLineIndex = Math.round((t-17)/25);

                var t1 = $($('.scale-help-line-y')[yLineIndex]).offset().top-$($('.scale-help-line-y')[0]).offset().top;
                var l1 = $($('.scale-help-line-x')[xLineIndex]).offset().left-$($('.scale-help-line-x')[0]).offset().left;

                ui.helper.css({'left':(l1+32)+'px','top':(t1+17)+'px'});

                var h = t+$size.height;
                var w = l+$size.width;
                var xLineIndex1 =  Math.round((w-32)/($('#componentContainer').width()/64));
                var yLineIndex1 = Math.round((h-17)/25);

                var t2 = $($('.scale-help-line-y')[yLineIndex1]).offset().top-$($('.scale-help-line-y')[yLineIndex]).offset().top;
                var l2 = $($('.scale-help-line-x')[xLineIndex1]).offset().left-$($('.scale-help-line-x')[xLineIndex]).offset().left;

                ui.helper.css({'width':l2+'px','height':t2+'px'});

                var eleOffset;
                if($element[0].style.top&&$element[0].style.top!=''){
                    eleOffset = {top:parseInt($element[0].style.top.replace('px','')),left:parseInt($element[0].style.left.replace('px',''))};
                }else{
                    var componentParentContainerOffset = $('#componentParentContainer').offset();
                    eleOffset = {top:parseInt($element.offset().top-componentParentContainerOffset.top),left:parseInt($element.offset().left-componentParentContainerOffset.left-17+64)};
                }

                var containerWidth = $('#componentContainer').width();
                var startCol = Math.round((eleOffset.left-32)/(containerWidth/64));
                var endCol = (Math.round((eleOffset.left-32+$helper.width())/(containerWidth/64)-1));
                var startY = Math.round(eleOffset.top-17);
                var endY = Math.round(eleOffset.top-17+$helper.height());

                //组件ID
                var componentId1 = $helper.attr('id');

                var componentPositionObjs1 = $('body').data('portalPageComponents');
                var positionObj1 = componentPositionObjs1[componentId1];
                if(!positionObj1){
                    positionObj1 = {};
                }

                //初始化组件位置信息
                positionObj1.componentHeight = $size.height;//组件高度，以px计算，初始300px
                positionObj1.componentWidth = endCol-startCol+1;//组件宽度，以列计算，初始8列
                positionObj1.startColNum = startCol;//开始列
                positionObj1.startRowNum = startY;//开始行(像素)
                $('body').data('portalPageComponents',componentPositionObjs1);

            }
        });
    }

    //定义左侧组件拖拽效果
    function definedDragObj(dragObj) {
        dragObj.draggable({
            //connectToSortable: "#componentParentContainer",
            helper: "clone",
            revert: "invalid",
            zIndex:10000,
            start:function (event,ui) {
                //ui.helper,ui.position,ui.offset
                ui.helper.find('.resizable-cs').show();
                //初始化UUID
                $.ajax({
                    type:"GET",
                    url:baseUrl+"sys/uuid/generator/getGuuid?_t="+new Date().getTime(),
                    dataType:"json",
                    async:false,
                    success: function(resultValue) {
                        var uuid = resultValue.result;
                        $('body').data('positionUUID',uuid);
                    }
                });

            },
            stop:function (event,ui) {

            }
        });
    }

    //保存组件属性
    $("#saveAttrsBtn").on('click',function () {
        $('#componentAttrForm').submit();
    });

    /**
     * 初始化已保存的组件位置信息
     */
    function initPortalPageComponents() {
        $.ajax({
            type:"POST",
            url:"http://127.0.0.1:9999/platform-app/oa/portal/portalComponentPosition/queryList?_t="+new Date().getTime(),
            data:JSON.stringify({portalPageId:$("body").data('portalPageId')}),
            dataType:"json",
            contentType:'application/json',
            success:function (resultData ) {
                if(resultData) {
                    var componentPositions = resultData.result;
                    var components = [];
                    //console.info(componentPositions);
                    for (var i = 0; i < componentPositions.length; i++) {
                        var positionObj = componentPositions[i];
                        positionObj.delflag = (positionObj.delflag=='1'||positionObj.delflag=='true')?true:false;
                        assemblePortalPageComponents(positionObj);
                    }
                }
            }
        });
    }
    initPortalPageComponents();

    /**
     * 组装已保存的组件位置信息
     */
    function assemblePortalPageComponents(positionObj) {
        var portalPageComponents = $('body').data('portalPageComponents');

        var componentId= positionObj.componentId;
        portalPageComponents[componentId] = positionObj;
        delete positionObj.concurrencyVersion;
        delete positionObj.createCompanyId;
        delete positionObj.createCompanyName;
        delete positionObj.createDate;
        delete positionObj.createOrgId;
        delete positionObj.createOrgName;
        delete positionObj.createPersonId;
        delete positionObj.createPersonName;
        delete positionObj.updateDate;
        delete positionObj.updatePersonId;
        delete positionObj.updatePersonName;
        $('body').data('portalPageComponents',portalPageComponents);

        var componentWidth= positionObj.componentWidth;
        var componentHeight= positionObj.componentHeight;
        var contentUrl= positionObj.contentUrl;
        var displayMoreMenu= positionObj.displayMoreMenu;
        var displayMoveMenu= positionObj.displayMoveMenu;
        var displayTitle= positionObj.displayTitle;
        var id= positionObj.id;
        var paddingBottom= positionObj.paddingBottom;
        var paddingLeft= positionObj.paddingLeft;
        var paddingRight= positionObj.paddingRight;
        var paddingTop= positionObj.paddingTop;
        var portalPageId= positionObj.portalPageId;
        var refreshInterval= positionObj.refreshInterval;
        var startColNum= positionObj.startColNum;
        var startRowNum= positionObj.startRowNum;
        var title = positionObj.title;
        var num = Math.ceil((startRowNum+componentHeight)/($('#componentParentContainer').height()-32));
        var minH = $('#componentParentContainer').height()-32;
        if($('#componentContainer').height()<minH*num){
            $('#increaseScreenBtn').click();
        }

        var componentLiObj = assembleComponentList(positionObj);
        var componentObj = componentLiObj.find('.groupnews_container');
        componentObj.attr('id',componentObj.attr('id').replace('pre_',''));
        if (displayTitle=='N') {
            $(componentObj.find('.news_title')[0]).hide();
        }

        componentObj.hover(function () {
            $(this).find('.component-tools').fadeIn('slow','linear');
        },function () {
            $(this).find('.component-tools').fadeOut(1000,'linear');
        });

        var startPosition = $($('.scale-help-line-x')[startColNum]).offset().left;
        var endPosition = $($('.scale-help-line-x')[startColNum+componentWidth]).offset().left;
        componentObj.css({
            width:(endPosition-startPosition)+'px',
            height:componentHeight+'px',
            position:'absolute',
            top:startRowNum+17,
            left:startPosition-$('#componentParentContainer').offset().left+17,
            'z-index':'3',
            'background-color': '#fff'
        });
        componentObj.find('.glyphicon-refresh').parent('a').click();
        $('#componentContainer').append(componentObj);
        definedDragObjInContainer(componentObj);
        definedResizableInContainer(componentObj);
    }
});


/**
 * 删除组件
 * @param btn
 */
function removePortlet(btn,title) {
    var that = btn;
    var delObj = $($(that).parents('div.groupnews_container')[0]);
    $.xljUtils.confirm('blue','确定删除组件【'+title+'】吗？',function () {
        var componentId = delObj.attr('id');

        //删除缓存中的组件位置信息
        var portalPageComponents = $('body').data('portalPageComponents');
        var positionObj = portalPageComponents[componentId];
        //组件位置ID
        var positionId ;
        if(positionObj) {
            positionId = positionObj.id;
        }

        //删除数据库中对应的组件位置信息
        if(positionId) {
            $.ajax({
                type:"DELETE",
                url:baseUrl+"/oa/portal/portalComponentPosition/delete/"+positionId,
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

        //删除页面缓存中的组件位置信息
        delete portalPageComponents[componentId];
        $('body').data('portalPageComponents',portalPageComponents);

        //删除页面元素
        delObj.remove();
    },true);
}

/**
 * 编辑组件属性
 * @param editBtn
 */
function editComponentAttr(editBtn) {
    var panelObj = $($(editBtn).parents('div.groupnews_container')[0]);
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
        $($('div[id="'+componentId+'"]').find('.news_title')[0]).hide();
    }else{
        $($('div[id="'+componentId+'"]').find('.news_title')[0]).show();
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
 * 获取页面中缓存的组件位置信息
 * @returns {*|jQuery}
 */
function getPortalPageComponents() {
    var portalPageComponents = $("body").data("portalPageComponents");
    return portalPageComponents;
}


/**
 * 刷新组件内容
 * @param btn
 */
function refreshPortlet(btn,contentUrl) {
    try{
        if(contentUrl&&contentUrl.indexOf('?')!=-1){
            contentUrl = contentUrl + '&_t='+new Date().getTime();
        }else{
            contentUrl = contentUrl + '?_t='+new Date().getTime();
        }
        var adminUser = $.xljUtils.getUrlParams().adminUser;
        if(adminUser!=''&&adminUser!='undefined'){
            contentUrl += '&adminUser='+adminUser;
        }

        var portalId = $.xljUtils.getUrlParams().portalPageId;
        contentUrl += '&portalId='+(portalId?portalId:'');

        $(btn).parents('div.groupnews_container').find('.component-content').load(contentUrl,function () {
            var portlet = $(btn).parents('div.groupnews_container');
            var footer = portlet.find('.footer');
            if(footer.length>0) {
                portlet.css({
                    border:'none',
                    'background-color':footer.css('background-color')
                })
            }

            var copyright = portlet.find('.copyright');
            if(copyright.length>0) {
                copyright.css({'margin-top':'10px'});
                portlet.css({
                    border:'none',
                    'background-color':copyright.css('background-color')
                })
            }

            clearNewsIcon();

            //计算新闻列表长度
            $(btn).parents('div.groupnews_container').find(".rules_list li").each(function (i,liObj) {
                var liWidth = $(liObj).width();
                var newIconWidth = 0;
                var citySpanWidth = 0;
                var newIconSpan = $(liObj).find('.newicon');
                newIconWidth = newIconSpan[0]?32:newIconWidth;

                var citySpan = $(liObj).find('.city');
                citySpanWidth = citySpan[0]?(70):citySpanWidth;
                $(liObj).find('a').css({'display':'inline'});
                var aWidth = $(liObj).find('a').width();
                if(aWidth>(liWidth-newIconWidth-citySpanWidth)){
                    $(liObj).find('a').css({width:(liWidth-newIconWidth-citySpanWidth)+'px'});
                }
                $(liObj).find('a').css({'display':'inline-block'});

            });

            //计算待办列表宽度
            $(btn).parents('div.groupnews_container').find('ul.tab_list li').each(function (i,liObj) {
                var spanObj = $(liObj).find('span.t_delay');
                spanObj.dotdotdot();
                var aObj = $(liObj).find('a.t_content');
                var ulObj = $(liObj).parent('ul');
                aObj.width(ulObj.width()-spanObj.width()-15);
                aObj.dotdotdot();


            });

            //处理快捷菜单居中问题
            var shortcutMenuListDivObj = $('#shortcutMenuListDiv');
            if(shortcutMenuListDivObj.length>0) {
                var pWidth = shortcutMenuListDivObj.width();
                var liWidth = shortcutMenuListDivObj.find('li').outerWidth();
                var liCount = Math.floor(pWidth/(liWidth+13));
                shortcutMenuListDivObj.find('ul').width(liWidth*liCount+13*liCount).css({'margin':'auto'});

            }

            //处理快捷菜单居中问题
            var shortcutMenuListDivObj = $('.wuye');
            if(shortcutMenuListDivObj.length>0) {
                var num = shortcutMenuListDivObj.length;
                for(var i=0;i<num;i++){
                    var obj = $(shortcutMenuListDivObj[i]);
                    var pWidth = obj.width();//154
                    var liWidth = obj.find('li').outerWidth();//74
                    var liCount = Math.floor(pWidth/(liWidth+13));//2
                    obj.find('ul').width(liWidth*liCount+13*liCount).css({'margin':'auto'});
                }
            }
            // $.each(shortcutMenuListDivObj,
            //     function(i, pItem) {
            //         var pWidth = pItem.width();
            //         var liWidth = pItem.find('li').outerWidth();
            //         var liCount = Math.floor(pWidth/liWidth);
            //         pItem.find('ul').attr("width",liWidth*liCount+13*liCount).attr("style",{'margin':'auto'});
            //     });


        });
    }catch (e){

    }
}

/**
 * 初始化新闻已读数据
 */
function initNewsRead() {
    $.ajax({
        url:  'http://127.0.0.1:9999/platform-app/oa/content/contentRowType/getNewsReadForPersonal?_t='+new Date().getTime(),
        type:'GET',
        dataType: 'json',
        success:function (resultData) {
            if(resultData.success){
                $('body').data('NEWS_READ',JSON.parse(resultData.result));
            }
        }
    });
}

/**
 * 消除已读的new图标
 */
function clearNewsIcon() {

    var newsIconKeys = $('body').data('NEWS_READ');
    if(newsIconKeys){
        for (var i = 0; i < newsIconKeys.length; i++) {
            var obj = newsIconKeys[i];
            obj = obj.substring(obj.lastIndexOf("_")+1);
            $('#'+obj).siblings('.newicon').remove();
        }
    }
}

/**
 * 记录新闻已读，消除new图标
 * @param ele
 */
function recordNewsReadForPerson(ele) {
    var contentRowTypeId = $(ele).attr('id');
    if($(ele).siblings('.newicon').length>0){
        $.ajax({
            url: 'http://127.0.0.1:9999/platform-app/oa/content/contentRowType/getNewsReadForPersonal?contentRowTypeId='+contentRowTypeId+'&_t='+new Date().getTime(),
            type:'GET',
            dataType: 'json',
            success:function (resultData) {
                if(resultData.success){
                    var contentTypeId = resultData.result;
                    $(ele).siblings('.newicon').remove();
                }
            }
        });
    }
}

/**
 * 计算新闻列表宽度问题
 * @param ele
 */
function computeNewsListWidth(ele) {
    //计算新闻列表长度
    $(ele).parents('div.groupnews_container').find(".rules_list li").each(function (i,liObj) {
        var liWidth = $(liObj).width();
        var newIconWidth = 0;
        var citySpanWidth = 0;
        var newIconSpan = $(liObj).find('.newicon');
        newIconWidth = newIconSpan[0]?32:newIconWidth;

        var citySpan = $(liObj).find('.city');
        citySpanWidth = citySpan[0]?(70):citySpanWidth;
        $(liObj).find('a').css({'display':'inline'});
        var aWidth = $(liObj).find('a').width();
        if(aWidth>(liWidth-newIconWidth-citySpanWidth)){
            $(liObj).find('a').css({width:(liWidth-newIconWidth-citySpanWidth)+'px'});
        }

        $(liObj).find('a').css({'display':'inline-block'});

    });
}

/**
 * 选择公司加载完公司后，大类下面的新闻内容要发生变化，加载该公司下面的新闻
 */
function changeCompanyCallback(data,$ele){
    var url = $($ele).parents('.groupnews_container').attr('data-contentUrl');
    $($ele).parents('.fullWidth').find('.component-content').load(url+"?companyId="+data.id,function () {
        $($ele).parents('.fullWidth').find('.component-content').find(".rules_list li").each(function (i,liObj) {
            var liWidth = $(liObj).width();
            var newIconWidth = 0;
            var citySpanWidth = 0;
            var newIconSpan = $(liObj).find('.newicon');
            newIconWidth = newIconSpan[0]?32:newIconWidth;

            var citySpan = $(liObj).find('.city');
            citySpanWidth = citySpan[0]?(citySpan.outerWidth()+12):citySpanWidth;
            var aWidth = $(liObj).find('a').width();
            if(aWidth>(liWidth-newIconWidth-citySpanWidth)){
                $(liObj).find('a').css({width:(liWidth-newIconWidth-citySpanWidth)+'px'});
            }

        });
    });

}