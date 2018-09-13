/**
 * Created by dgh on 2017/11/24.
 * 流程模板数据初始化使用
 */
define(['xljUtils', 'utils','actions'], function (xljUtils, utils,action) {

    //初始化实例流程图
    var initInstanceGraph = function () {
        //获取url参数
        var urlParams = $.xljUtils.getUrlParams();
        //操作类型
        var instanceId = urlParams.instanceId;
        var instanceDataDef = new $.Deferred();

        $.ajax({
            type: "get",
            url: hostUrl + "flow/instance/getInstanceGraph/" + instanceId + "?entryType=true&time=" + new Date().getTime(),
            success: function (data) {
                if(data.success&&data.result){
                    var instance = data.result;
                    var data = {
                        instanceData: instance
                    };
                    instanceDataDef.resolve(data);
                }
            },
            error: function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        });

        return instanceDataDef.promise();
    };

    //设置画布编辑器高度
    var resizeFlowEditorHeight = function (isIncreameSvg){
        $("#_designer").height(($(window).height()-2));
        var h = $("#_designer").find('svg').height();
        if(h&&isIncreameSvg){
            $("#_designer").find('svg').height(h+300);
        }
    };

    /**
     * 从父页面获取当前节点信息
     * @returns {Array}
     */
    var markCurrentAc = function () {
        var currentVertexes = [];
        if(window.parent&&$.isFunction(window.parent.getApproveListForInstanceChart)){
            var approveList = window.parent.getApproveListForInstanceChart();
            var currentVertexesIndex = 0;
            for (var i = 0; i < approveList.length; i++) {
                var obj = approveList[i];
                //currentVertexes.push(obj.acId);
                if(obj.acStatus=='2'){
                    currentVertexes.push(obj.acId);
                }

            }
        }

        return currentVertexes;
    };

    /**
     * 更改节点样式
     * @param id
     * @param style 格式：'rounded;strokeColor=red;fillColor=green'
     */
    var changeCellStyle = function changeCellStyle(id,style){
        var model = utils.getGraphEditor.model;
        var cell=model.getCell(id);
        if(!style){
            style = 'strokeColor=red;fillColor=green';
        }

        model.beginUpdate();
        try {
            var edit = new  mxStyleChange(model,cell,style);
            model.execute(edit);
        }catch(e){
            console.error(e)
        }
        finally {
            model.endUpdate();
        }
    };

    return {
        initInstanceGraph:initInstanceGraph,
        resizeFlowEditorHeight:resizeFlowEditorHeight,
        markCurrentAc:markCurrentAc,
        changeCellStyle:changeCellStyle
    };
});