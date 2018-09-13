require.config({
    paths: {
        jquery: [ hostUrl+'flow/builder/lib/jquery-1.12.4.min'],
        jqueryValidate:[hostUrl+'common/validate/jquery.validate.min'],
        dotdotdot:[hostUrl+'common/jquery/jquery.dotdotdot.min'],
        easyDialog:[hostUrl+'common/easyDialog/easydialog'],
        xljUtils:[hostUrl+'common/utils/xljUtils'],
        lodash: [hostUrl+'flow/builder/lib/lodash.min'],
        utils: [hostUrl+'flow/builder/modules/Utils'],
        actions: [hostUrl+'flow/builder/modules/Actions'],
        sidebar: [hostUrl+'flow/builder/modules/Sidebar'],
        toolbar: [hostUrl+'flow/builder/modules/Toolbar'],
        stage: [hostUrl+'flow/builder/modules/Stage'],
        flowChart: ['flow_chart']
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
        'xljUtils':{
            deps: ['jqueryValidate','easyDialog'],
            exports: 'xljUtils'
        }
    }
});

require(['jquery', 'lodash', 'stage', 'utils','flowChart'], function ($, _, stage, utils,flowChart) {
    //获取实例数据
    var instanceDataDef = flowChart.initInstanceGraph();

    //初始化流程实例图
    var initial = function (container) {
        if (!mxClient.isBrowserSupported()) {
            mxUtils.error('该浏览器不支持!', 200, false);
        } else {
            stage.renderMainStage(container,false,false);
        }
    };

    /**
     * 监听load事件，绘制工具条，容器等
     * */
    document.addEventListener('load', initial(document.getElementById('_designer')));

    //渲染已存在的画图
    function renderInstanceChart(instanceDataDef) {
        $.when(instanceDataDef).done(function(instance){
            var instanceData = instance.instanceData;
            if(instanceData.graphXml){
                var graph = utils.getGraphEditor();
                //从xml中渲染画布
                utils.renderModelFromXml(graph,instanceData.graphXml);

                setTimeout(function () {
                    flowChart.resizeFlowEditorHeight(true);
                },300);
            }
        });
    }
    renderInstanceChart(instanceDataDef);

    //编辑器自适应
    $(window).resize(function() {
        flowChart.resizeFlowEditorHeight();
    });

    window.resizeFlowEditorHeight = flowChart.resizeFlowEditorHeight;

});