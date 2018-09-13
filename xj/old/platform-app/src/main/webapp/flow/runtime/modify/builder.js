require.config({
    paths: {
        jquery: [hostUrl+'flow/builder/lib/jquery-1.12.4.min'],
        bootstrap: [hostUrl+'common/bootstrap/js/bootstrap.min'],
        jqueryValidate:[hostUrl+'common/validate/jquery.validate.min'],
        dotdotdot:[hostUrl+'common/jquery/jquery.dotdotdot.min'],
        easyDialog:[hostUrl+'common/easyDialog/easydialog'],
        xljUtils:[hostUrl+'common/utils/xljUtils'],
        lodash: [hostUrl+'flow/builder/lib/lodash.min'],
        utils: ['modules/Utils'],
        actions: ['modules/Actions'],
        sidebar: ['modules/Sidebar'],
        toolbar: ['modules/Toolbar'],
        stage: ['modules/Stage'],
        modifyInstance: ['modifyInstance']
    },
    shim:{
        'jqueryValidate': {
            deps: ['jquery'],
            exports: 'jqueryValidate'
        },
        'dotdotdot':{
            deps: ['jquery'],
            exports: 'dotdotdot'
        },
        'easyDialog':{
            deps: ['dotdotdot'],
            exports: 'easyDialog'
        },
        'bootstrap':{
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        'xljUtils':{
            deps: ['jqueryValidate','easyDialog','bootstrap'],
            exports: 'xljUtils'
        }
    }
});

require(['jquery', 'lodash', 'stage', 'utils','modifyInstance'], function ($, _, stage, utils,modifyInstance) {
    var initial = function (container) {
        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('该浏览器不支持!', 200, false);
        } else {
            stage.renderMainStage(container,true,true);
        }
    };

    /**
     * 监听load事件，绘制工具条，容器等
     * */
    document.addEventListener('load', initial(document.getElementById('_designer')));

    //重置窗口大小
    var resizeStageContainer = function (container) {
        var winHeight = $(window).height();
        $(container).height(winHeight - 62);

        $(window).on('resize', function () {
            var winHeight = $(window).height();
            $(container).height(winHeight - 62);
        });
    };
    //初始化容器大小
    resizeStageContainer($('#_designer'));

    //初始化按钮动作
    modifyInstance.initOperation();
    //初始化模板相关数据
    var instanceDataDef = modifyInstance.initInstanceDatas();
    //渲染已存在的画图
    $.when(instanceDataDef).done(function(instanceData){
        if(instanceData){
            var instanceBaseData = instanceData.instanceData;
            if(instanceBaseData&&instanceBaseData.graphXml){
                var graph = utils.getGraphEditor();
                //从xml中渲染画布
                utils.renderModelFromXml(graph,instanceBaseData.graphXml);
            }
        }

        setTimeout(function () {
            var h = $("#_designer").find('svg').height();
            if(h){
                $("#_designer").find('svg').height(h+1000);
            }
        },300);
    });

    //暴露给子页面调用
    window.getInstanceDataDef = function () {
        return instanceDataDef;
    };
    //暴露给iframe子页面调用
    window.getUUID = utils.getUUID;

    //暴露给iframe子页面调用
    window.getSelectCell = function () {
        var graph = utils.getGraphEditor();
        return graph.getSelectionCell();
    };

    //更新节点属性
    window.updateCellAttr = utils.updateCellAttr;

    //根据cell id获取单元格
    window.getCellById = utils.getCellById;

    //暴露给iframe子页面调用
    window.instanceDataDefResolveData = function (data) {
        instanceDataDef = new $.Deferred();
        instanceDataDef.resolve(data);
        instanceDataDef.promise();
        utils.closeFrameWnd();
    };

    //关闭弹出框
    window.closeFrameWnd = utils.closeFrameWnd;
});