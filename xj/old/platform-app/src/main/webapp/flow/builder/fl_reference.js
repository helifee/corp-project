/**
 * udpate by dgh on 2017/12/05
 */
$(function () {

    //计算高度
    function resizeHeight(){
        //var windowHeight = $(window.parent.document).find('.mxWindow').height();
        $(".slide-left .ztree-box").height(($(window).height()-90-$('.ztree-box').siblings('.org-title').outerHeight()-$('.ztree-box').siblings('.searchBox').outerHeight())+"px");
        $(".grid-container").height(($(window).height()-$('.grid-container').siblings('div').outerHeight()-$('#flListSearchForm').outerHeight()-70)+"px");
    }
    resizeHeight();
    function resizeGrid(){
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.grid-container').height()-60);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.grid-container').width(), true);
    }
    //ztree 自适应宽度
    $(window).resize(function(){
        resizeHeight();
        resizeGrid();
    });

    //初始化日期控件
    function initDatetimepicker() {
       /* $('.glyphicon-calendar').parent('div').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd hh:ii:ss',//显示格式
            //minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });*/
        $('.form_datetime').find('.glyphicon-calendar').parent('div.input-group-addon').on('click',function () {
            WdatePicker({
                el: $(this).siblings(':input')[0],
                dateFmt: "yyyy-MM-dd",
                errDealMode: -1
            });
        });

        $('.form_datetime').find('.glyphicon-remove').parent('div.input-group-addon').on('click',function () {
            $(this).siblings(':input').val('');
        });
    }
    initDatetimepicker();

    //递归树匹配节点icon
    function recursionArray(arr) {
        for (var i in arr) {
            if (arr[i].pId == 0) {
                arr[i].icon = "../../common/zTreeStyle/img/diy/main.png";
            } else {
                arr[i].icon = "../../common/zTreeStyle/img/diy/1_open.png";
            }
        }
    }

    //初始化流程业务对象树
    function initTree() {
        $.ajax({
            type: "post",
            url: hostUrl + "flow/businessObject/getTree",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: "{}",
            success: function (json) {
                var setting = {
                    view: {
                        dblClickExpand: false,
                        showLine: true,
                        selectedMulti: false,
                        nameIsHTML: true,
                        fontCss: function (treeId, treeNode) {
                            return (treeNode.highlight && treeNode.highlight == 'true') ?
                            {
                                'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif',
                                'font-style': 'italic',
                                "font-weight": "bold"
                            } :
                                {
                                    color: "#333",
                                    "font-weight": "normal",
                                    'font-style': 'normal'
                                } | (treeNode.status && treeNode.status == '0') ?
                                {
                                    'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif',
                                    'font-style': 'normal',
                                    'color': '#CD0000'
                                } :
                                {color: "#333", "font-weight": "normal", 'font-style': 'normal'};
                        }
                    },
                    data: {
                        keep: {
                            leaf: true,
                            parent: true
                        },
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: function (event, treeId, treeNode) {
                            $('input:radio[name="flow_status"][value=""]')[0].checked = true;
                            $('#_startDate').val("");
                            $('#_endDate').val("");
                            $('#flName').val("");
                            var postData = $("#_flList").jqGrid("getGridParam", "postData");
                            $.each(postData, function (k, v) {
                                delete postData[k];
                            });

                            if(treeNode.dataType=='1'){
                                postData = {parentId:treeNode.id};
                            }else if(treeNode.dataType=='2'){
                                postData = {businessObjectId:treeNode.id};
                            }else{
                                postData = {appId:treeNode.id};
                            }

                            $("#_flList").jqGrid("setGridParam", { postData: postData, page: 1, start: 0 }).trigger("reloadGrid");
                        }, //点击节点事件
                        onCollapse: function () {
                            $.xljUtils.treeResizeFn();
                        },
                        onExpand: function () {
                            $.xljUtils.treeResizeFn();
                            //捕获节点被展开的事件回调函数
                        }
                    }
                };
                var zNodes = json.result;
                recursionArray(zNodes);
                var zTreeObj = $.fn.zTree.init($("#_zTree"), setting, zNodes);
                $.xljUtils._searchTreeInputEvent($('#key'),zTreeObj,['name','code']);
                $.xljUtils.addTreeScroll();
                setTimeout(function () {
                    $.xljUtils.addTreeScroll('ztree-box');
                    $.xljUtils.treeResizeFn();
                }, 300);
            },
            error: function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        })
    }
    initTree();

    //初始化模板列表
    function initFlList() {
        //创建jqGrid组件
        var flListGrid = $("#_flList").jqGrid({
            url: hostUrl + "flow/fl/queryFlList",//获取数据的地址
            datatype: "json",//从服务器端返回的数据类型，默认xml。可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
            ajaxGridOptions: {contentType: 'application/json;charset=utf-8'},
            mtype: "post",//ajax提交方式。POST或者GET，默认GET
//            postData:{"businessObjectId":""},
            jsonReader: {
                repeatitems: false
            },
            colModel: [
                {name: 'id', label: 'id', align: "center", hidden: true},
                {name: 'businessObjectId', label: '业务对象ID', align: "center", hidden: true},
                {name: 'concurrencyVersion', label: '并发版本', align: "center", hidden: true},
                {name: 'name', label: '名称', align: "center" ,cellattr: function (cellvalue, options, rowObject) {
                    if (!rowObject.useStatus) {
                        return "style='color:red'";
                    }
                }},//,formatter:nameFormatter  错误 #15794 流程配置-引用其他流程：引用页面，名称的超链接去掉，请修改 update by dingguanghuai on 2017/11/02
                {name: 'code', label: '编号', align: "center"},
                {name: 'businessObjectName', label: '业务对象', align: "center"},
                {
                    name: 'isDefualt',
                    label: '是否默认',
                    align: "center",
                    formatter: function (cellvalue, options, rowObject) {
                        if (cellvalue == true) {
                            return "是";
                        } else {
                            return "否";
                        }
                    }
                },
                {
                    name: 'versionAndStatus',
                    label: '版本号及类型',
                    align: "center",
                    formatter: function (cellvalue, options, rowObject) {
                        var _versionValue = "";
                        var data = JSON.parse(cellvalue);
                        _versionValue += "<select id=\"" + options.rowId + "\" >";
                        var i = 0;
                        for (var key in data) {
                            if (i == 0) {
                                _versionValue += "<option value=\"" + key + "\" selected=\"selected\">" + data[key] + "<\/option>";
                            } else {
                                _versionValue += "<option value=\"" + key + "\">" + data[key] + "<\/option>";
                            }
                            ++i;
                        }
                        _versionValue += "<\/select>";
                        return _versionValue
                    },
                    width: 200
                },
                {
                    name: 'useStatus',
                    label: '状态',
                    align: "center",
                    formatter: function (cellvalue, options, rowObject) {
                        //useStatusFormatter
                        if (cellvalue == true) {
                            return "启用";
                        } else {
                            return "禁用";
                        }

                    },
                    cellattr: function (cellvalue, options, rowObject) {
                        if (!rowObject.useStatus) {
                            return "style='color:red'";
                        }
                    }
                },
                {name: 'updateDate', label: '修改时间', align: "center"}
            ],
            forceFit: true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
            pager: '#_flPager',//定义翻页用的导航栏，必须是有效的html元素
            rowNum: 20,//在grid上显示记录条数，这个参数是要被传递到后台
            rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
            viewrecords: true, //定义是否要显示总记录数
            //autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度
            //multiselect: true,//定义是否可以多选
            rownumbers: true,
            gridComplete: function () {
                resizeGrid();
                $.xljUtils.addGridScroll();

            },
            loadError: function (xhr, status, error) {
                $.xljUtils.getError(xhr.status);
            }
        });
        /*创建jqGrid的操作按钮容器*/
        /*可以控制界面上增删改查的按钮是否显示*/
        $("#_flList").jqGrid('navGrid', '#_flPager', {
            add: false,
            edit: false,
            del: false,
            search: false,
            refresh: false
        });
    }
    initFlList();

    //根据条件获取流程模板列表
    function searchFlList() {
        var postData = $("#_flList").jqGrid("getGridParam", "postData");
        delete postData['useStatus'];
        delete postData['startDate'];
        delete postData['endDate'];
        delete postData['flName'];
        var useStatus = $('#flListSearchForm :input[name="flow_status"]:checked').val();
        if(useStatus!=''){
            postData.useStatus = useStatus;
        }
        var startDate = $('#flListSearchForm :input[name="_startDate"]').val();
        if(startDate!=''){
            postData.startDate = startDate;
        }
        var endDate = $('#flListSearchForm :input[name="_endDate"]').val();
        if(endDate!=''){
            postData.endDate = endDate;
        }
        var flName = $('#flListSearchForm :input[name="flName"]').val();
        if(flName!=''){
            postData.flName = flName;
        }
        $("#_flList").jqGrid("setGridParam", {postData: postData, page: 1, start: 0}).trigger("reloadGrid");
    }

    /**
     * 重置JQGrid列的值
     */
    window.resetData = function (rowId){
        var v_value = $("#"+rowId+" option:selected").val();
        var v_html = $("#"+rowId+" option:selected").html();
        $("#_flList").jqGrid('setCell',rowId,'id',v_value);
    };

    //错误 #15772 流程配置-引用其他流程：弹出的页面，查询要支持回车，请修改 update by dingguanghuai on 2017/11/02
    $('#_flListContainer').on('keypress', function (event) {
        if (event.keyCode == "13") {
            searchFlList();
        }
    });
    $('#searchFlListBtn').on('click',function () {
        searchFlList();
    });

    //搜索业务对象树按钮事件
    $('#searchTreeBtn').on('click',function () {
        $.xljUtils._searchTreeBtnEvent($('#key'),$.fn.zTree.getZTreeObj("_zTree"),['name','code']);
    });

    //确定按钮点击事件
    $('#saveBtn').on('click',function () {
        var rowId =  $('#_flList').jqGrid('getGridParam','selrow');
        if(rowId){
            var selFlId =  $('#_flList').find('tr.ui-state-highlight').find('select').val();
            window.parent.referenceOtherFl(selFlId);
        }else{
            $.xljUtils.tip('blue','请选择流程模板列表中的一行数据！')
        }
    });
});
