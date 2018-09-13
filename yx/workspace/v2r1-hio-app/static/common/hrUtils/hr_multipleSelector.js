/**
 * erp_cloud_platform xljMultipleSelector Created by dingguanghuai on 2017/4/2.
 * @author dingguanghuai
 * @date 2017/4/2
 */
/**
 * erp_cloud_platform xljSingleSelector Created by dingguanghuai on 2017/4/2.
 * @author dingguanghuai
 * @date 2017/4/2
 */
;;(function ($, window, document, undefined) {
    var treeId;
    if (!$.HrMultipleSelector) {
        $.extend({HrMultipleSelector: {}});
    }
    $.extend($.HrMultipleSelector, {
        getTreeId: function () {
            return treeId;
        }
    });
    var HrMultipleSelector = function (ele, opts) {
        this.$element = ele;
        var selectorpersontype = ele.dataset.selectorpersontype;
        this.defaults = {
            title: '',//选择器标题，默认是'选择组织机构'
            selectorPersonType: selectorpersontype,
            selectorType: 'org',//选择器类型，默认是组织机构选择器
            immediatelyShow: false,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
            gridTitle: '',//列表标题，默认是'组织列表'
            treeUrl: null,
            treeParam: null,//生成zTree树的参数
            targetId: null,//选择的数据的ID存储input域ID
            targetName: null,//选择的数据的Name存储input域ID
            targetPrefixId: null,//选择的数据的PrefixId存储input域ID
            targetPrefixName: null,//选择的数据的PrefixName存储input域ID
            targetCode: null,//选择数据的编码存储input域ID
            noSelectedDataTip: null,
            selectNodeType: {},//JSON格式,可选节点,其中msg为固定key，显示选择错误提示之用
            // 例：{
            //      msg:'请选择分期',
            //      type:'branch',//指定分期可选
            //      type:'dept',//指定部门可选
            //      type:'company',//指定公司可选
            //      type:'group',//指定项目可选
            //      type:'person',//指定人员可选
            //      type:'post',//指定岗位可选
            //      mold:'role'//指定角色可选
            // }
            /**
             * 保存回调函数
             * @param selectedData 已选择的数据json对象
             * @param ele 绑定选择器的对象
             */
            saveCallback: function (selectedData, ele) {
            },
            treeSettings: {}
        };
        this.options = $.extend({}, this.defaults, opts);
    };

    HrMultipleSelector.prototype = {
        modalContainer: null,
        zTreeObj: null,
        rightContainer: null,
        gridObj: null,
        _init: function () {
            var $ele = $(this.$element);
            /*if(this.modalContainer!=null){
             if(this.options.immediatelyShow){
             this.modalContainer.modal({show:true,backdrop:'static'});
             }else{
             var that = this;
             $ele.on('click',function () {
             that.modalContainer.modal({show:true,backdrop:'static'});
             });
             }

             return;
             }*/
            //modal最外层div
            var modalContainer = this._createModalContainer();
            this.modalContainer = modalContainer;
            //modal内容div
            var modalContentContainer = this._createModalContentContainer();
            modalContainer.append(modalContentContainer);
            //modal头部div
            var modalHeaderContainer = this._createModalHeaderContainer();
            modalContentContainer.find('.modal-content').append(modalHeaderContainer);
            //modal body div
            var modalBodyContainer = this._createModalBodyContainer();
            modalContentContainer.find('.modal-content').append(modalBodyContainer);

            //modal body左侧div
            var bodyLeftContainer = this._createBodyLeftContainer();
            modalBodyContainer.append(bodyLeftContainer);
            //modal body左侧头部div
            var treeHeader = this._createTreeHeader();
            bodyLeftContainer.append(treeHeader);
            //org tree容器div
            var treeContainer = this._createTreeContainer();
            bodyLeftContainer.append(treeContainer);
            //org tree的ul
            var tree = this._createTree();
            tree.attr('id', '_multipleTree' + new Date().getTime());
            treeContainer.append(tree);

            //modal body 右侧div
            var bodyRightContainer = this._createBodyRightContainer();
            this.rightContainer = bodyRightContainer;
            modalBodyContainer.append(bodyRightContainer);
            //orgGrid头部 div
            var gridHeader = this._createGridHeader();
            bodyRightContainer.append(gridHeader);
            //orgGrid容器div
            var gridContainer = this._createGridContainer();
            bodyRightContainer.append(gridContainer);

            //orgGrid 的table
            var grid = this._createGrid();
            this.gridObj = grid;
            grid.attr('id', '_multipleGridList' + new Date().getTime());
            gridContainer.append(grid);

            /**
             * 样式格式化
             * @param rowId
             * @param val
             * @param rowObject
             * @param cm
             * @param rdata
             * @returns {String}
             */
            function addCellAttr(rowId, val, rowObject, cm, rdata) {
                if (rowObject.status == "0") {
                    return "style='color:red'";
                }
            }

            /**
             * 格式化组织机构类型
             * @param cellvalue
             * @param options
             * @param rowObject
             * @returns {*}
             */
            function formatOrgTypeVal(cellvalue, options, rowObject) {
                if (cellvalue == "zb") {
                    return "集团";
                } else if (cellvalue == "company") {
                    return "公司";
                } else if (cellvalue == "dept") {
                    return "部门";
                    //}else if(cellvalue == "group"){
                    //   return "项目";
                    //}else if(cellvalue=='branch'){
                    //    return "分期";
                } else if (cellvalue == 'post') {
                    return "岗位";
                }
            }

            /**
             * 用户类型数据格式化
             * @param cellvalue
             * @param options
             * @param rowObject
             * @returns {String}
             */
            function jqGridPostUserTypeFmatter(cellvalue, options, rowObject) {
                if (cellvalue == "1") {
                    return "普通用户";
                } else if (cellvalue == "2") {
                    return "管理员";
                } else if (cellvalue == "3") {
                    return "超级管理员";
                } else if (cellvalue == "0") {
                    return "非用户";
                }
            }

            /**
             * 状态数据格式化
             * @param cellvalue
             * @param options
             * @param rowObject
             * @returns {String}
             */
            function statusFmatter(cellvalue, options, rowObject) {
                if (cellvalue == "1") {
                    return "启用";
                } else if (cellvalue == "0") {
                    return "禁用";
                } else {
                    return "启用";
                }
            }

            if (!this.options.treeParam) {
                this.options.treeParam = {};
            }

            //设置左侧树标题
            var TreeTitle = treeHeader.find('.modal-title');
            //设置选择器标题
            var modalTitle = modalHeaderContainer.find('.modal-title');
            //设置列表标题
            var gridTitle = gridHeader.find('span');
            var that = this;
            modalContainer.on('show.bs.modal', function () {
                if (that.zTreeObj) {
                    return;
                }
                switch (that.options.selectorType) {
                    case 'org':
                        modalTitle.text(that.options.title != '' ? that.options.title : '选择组织机构');
                        gridTitle.text(that.options.gridTitle != '' ? that.options.gridTitle : '组织列表');

                        //初始化左侧树
                        var url = hostUrl + 'org/orgRoot/getTree';
                        if (that.options.treeUrl) {
                            url = that.options.treeUrl;
                        }
                        // that.options.treeParam.rootDelFlag = 0;
                        that.options.treeParam.orgDelFlag = 0;
                        that.options.treeParam.delflag = 0;
                        that.options.treeParam.orgStatus = true;//只查询有效的
                        that._initTree(tree, url, that.options.treeParam, grid);

                        //初始化右侧grid
                        //jqGrid的列显示名
                        var colNames = ['ID', '名称', '类型', '全路径', '状态', '排序号', '根目录ID', 'ID全路径', '父级组织ID'];
                        var colModel = [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                            {name: 'id', index: 'id', width: 55, hidden: true},
                            {name: 'name', index: 'name', width: 90, cellattr: addCellAttr},
                            {name: 'type', index: 'type', width: 100, formatter: formatOrgTypeVal},
                            {name: 'prefixName', index: 'prefixName', width: 80},
                            {
                                name: 'status',
                                index: 'status',
                                width: 80,
                                cellattr: addCellAttr,
                                formatter: statusFmatter
                            },
                            {name: 'sort', index: 'sort', width: 80, hidden: true},
                            {name: 'rootId', index: 'rootId', width: 80, hidden: true},
                            {name: 'prefixId', index: 'prefixId', width: 80, hidden: true},
                            {name: 'parentId', index: 'parentId', width: 150, hidden: true}
                        ];
                        that._initGrid(grid, colNames, colModel);

                        break;

                    case 'region':
                        TreeTitle.text('省、市、区');
                        modalTitle.text(that.options.title != '' ? that.options.title : '选择地区');
                        gridTitle.text(that.options.gridTitle != '' ? that.options.gridTitle : '地区列表');
                        //初始化左侧树
                        var url = hostUrl + 'org/orgRoot/getRegionTree';
                        if (that.options.treeUrl) {
                            url = that.options.treeUrl;
                        }
                        // that.options.treeParam.rootDelFlag = 0;
                        that.options.treeParam.orgDelFlag = 0;
                        that.options.treeParam.delflag = 0;
                        that.options.treeParam.orgStatus = true;//只查询有效的
                        that._initTree(tree, url, that.options.treeParam, grid);

                        //初始化右侧grid
                        //jqGrid的列显示名
                        var colNames = ['ID', '名称', '排序号', 'ID全路径', '父级组织ID'];
                        var colModel = [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                            {name: 'id', index: 'id', width: 55, hidden: true},
                            {name: 'name', index: 'name', width: 90, cellattr: addCellAttr},
                            {name: 'sort', index: 'sort', width: 80, hidden: true},
                            {name: 'prefixId', index: 'prefixId', width: 80, hidden: true},
                            {name: 'parentId', index: 'parentId', width: 150, hidden: true}
                        ];
                        that._initGrid(grid, colNames, colModel);
                        break;
                    case 'person':
                        modalTitle.text(that.options.title != '' ? that.options.title : '选择人员');
                        gridTitle.text(that.options.gridTitle != '' ? that.options.gridTitle : '人员列表');
                        var treeSettings = that.options.treeSettings;
                        treeSettings.data = {
                            simpleData: {
                                enable: true
                            }
                        };
                        //url = hostUrl+'sys/org/user/getUserTree';
                        // url = hostUrl + 'sys/org/roleUser/selectUserPostTree';
                        url = hostUrl + 'org/orgRoot/getUserTree';
                        if (that.options.treeUrl) {
                            url = that.options.treeUrl;
                        }
                        var $selectorPersonType = that.options.selectorPersonType;
                        if ($selectorPersonType != null && $selectorPersonType == "personForGroup") {//班组选择人员
                            that.options.treeParam.selectorPersonType = $selectorPersonType;
                        }
                        // this.options.treeParam.rootDelFlag = 0;
                        that.options.treeParam.orgDelFlag = 0;
                        that.options.treeParam.delflag = 0;
                        //人员状态默认在职
                        if(that.options.treeParam.userStatus==undefined){
                            that.options.treeParam.userStatus = '1';
                        }
                        that.options.treeParam.userDelFlag = 0;
                        //alert("树的参数================="+JSON.stringify(that.options.treeParam));
                        that._initTree(tree, url, that.options.treeParam, grid);
                        //初始化右侧grid
                        //jqGrid的列显示名
                        var colNames = ['人员ID全路径', '人员ID', 'type','姓名', '所属机构ID全路径', '所属机构', '岗位ID', '职务', '性别', '性别'];//,'用户类型'
                        var colModel = [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                            {name: 'id', label: '序号', width: 55, align: "center", hidden: true},
                            {name: 'userId', label: '人员ID', width: 55, align: "center", hidden: true},
                            {name: 'type', label: 'type', width: 55, align: "center", hidden: true},
                            {name: 'name', label: '姓名', width: 90, align: "center", cellattr: addCellAttr},
                            {name: 'prefixId', label: '所属机构ID全路径', width: 120, align: "center", hidden: true},
                            {name: 'prefixName', label: '所属机构', width: 120, align: "center"},
                            {name: 'postId', label: '岗位ID', width: 120, align: "center", hidden: true},
                            {name: 'postName', label: '职务', width: 120, align: "center"},
                            {name: 'sex', label: '性别', width: 120, align: "center", hidden: true},
                            {name: 'sexName', label: '性别', width: 120, align: "center"}/*,
                             {name : 'type',label : '用户类型',width : 90,align : "center",formatter:jqGridPostUserTypeFmatter},*/
                        ];
                        that._initGrid(grid, colNames, colModel);
                        break;
                    case 'post':
                        modalTitle.text(that.options.title != '' ? that.options.title : '选择岗位');
                        gridTitle.text(that.options.gridTitle != '' ? that.options.gridTitle : '岗位列表');
                        // url = hostUrl+'sys/org/post/getPostTree';
                        url = hostUrl + 'org/post/getPostTreeMul';
                        if (that.options.treeUrl) {
                            url = that.options.treeUrl;
                        }
                        that.options.treeParam.rootDelFlag = 0;
                        that.options.treeParam.orgDelFlag = 0;
                        that.options.treeParam.postDelFlag = 0;
                        that._initTree(tree, url, that.options.treeParam, grid);

                        var colNames = ['ID', '名称', '所属机构ID', '所属机构', '类型', '状态'];
                        var colModel = [
                            {name: 'id', width: 55, align: "center", hidden: true},
                            {name: 'name', width: 90, align: "center", cellattr: addCellAttr},
                            // {name : 'code',width : 90,align : "center"},
                            {name: 'prefixId', width: 90, align: "center", hidden: true},
                            {name: 'prefixName', width: 90, align: "center"},
                            {name: 'type', width: 90, align: "center", formatter: formatOrgTypeVal},
                            {
                                name: 'status',
                                width: 90,
                                align: "center",
                                cellattr: addCellAttr,
                                formatter: statusFmatter
                            }
                        ];
                        that._initGrid(grid, colNames, colModel);
                        break;
                    case 'role':
                        modalTitle.text(that.options.title != '' ? that.options.title : '选择角色');
                        gridTitle.text(that.options.gridTitle != '' ? that.options.gridTitle : '角色列表');
                        url = hostUrl + 'emp/empPersonInfo/queryRoleTree';
                        if (that.options.treeUrl) {
                            url = that.options.treeUrl;
                        }
                        that.options.treeParam.delflag = 0;
                        that._initTree(tree, url, that.options.treeParam, grid);

                        var colNames = ['ID', '名称', '编号', '类型', '状态', '所属目录ID', '所属目录', '所属目录'];
                        var colModel = [
                            {name: 'id', width: 100, align: "center", hidden: true},
                            {name: 'name', width: 90, align: "center", cellattr: addCellAttr},
                            {name: 'code', width: 90, align: "center"},
                            {
                                name: 'type',
                                width: 90,
                                align: "center",
                                formatter: function (cellvalue, options, rowObject) {
                                    if (cellvalue == '1') {
                                        return '标准角色';
                                    } else {
                                        return '虚拟角色';
                                    }
                                }
                            },
                            {
                                name: 'status',
                                width: 90,
                                align: "center",
                                cellattr: addCellAttr,
                                formatter: statusFmatter
                            },
                            {name: 'belongCatalogId', width: 90, align: "center", hidden: true},
                            {name: 'belongCatalog', width: 90, align: "center", hidden: true},
                            {name: 'prefixName', width: 90, align: "center"}
                        ];
                        that._initGrid(grid, colNames, colModel);
                        break;
                    case 'assType':
                        TreeTitle.text(that.options.treeTitle);
                        modalTitle.text(that.options.title);
                        gridTitle.text(that.options.gridTitle);
                        var url;
                        if (that.options.treeUrl) {
                            url = that.options.treeUrl;
                        }
                        if (url) {
//                	this.options.treeParam = JSON.stringify(this.options.treeParam)=='{}'?null:this.options.treeParam
                            that._initTree(tree, url, that.options.treeParam, modalContainer);
                        }
                        break;
                    default:
                        break;
                }
            });

            var that = this;
            //取消按钮事件
            modalHeaderContainer.find('button.modal-cancel').on('click', function () {
                grid.jqGrid('clearGridData');
                modalContainer.modal('hide');
            });

            //保存按钮事件
            modalHeaderContainer.find('button.modal-save').on('click', function () {
                that._saveSelectData(grid, $ele, modalContainer);
            });

            $(document.body).append(modalContainer);
            $ele.data('isCreated', true);
            //初始化各个容器大小
            this._initSizeAndData(treeContainer, gridContainer, modalContainer, grid, tree);

            if (!this.options.immediatelyShow) {
                /*$ele.on('click',function () {
                 modalContainer.modal({show:true,backdrop:'static'});
                 });*/
            } else {
                modalContainer.modal({show: true, backdrop: 'static'});
            }

            //tree搜索框
            var searchInputObj = $(treeHeader.find('input[type="text"]')[0]);
            //tree搜索按钮
            var searchBtnObj = $(treeHeader.find('button.btnMsearch')[0]);
            //tree搜索按钮点击事件
            this._searchTreeBtnEvent(searchBtnObj, searchInputObj, tree);
            //tree搜索框key事件
            this._searchTreeInputEvent(searchInputObj, tree);

            //grid搜索框
            var searchGridInput = $(gridHeader.find('input[type="text"]')[0]);
            //grid搜索按钮
            var searchGridBtn = $(gridHeader.find('button.btnMsearch')[0]);
            //grid搜索框key事件
            this._searchGridInputEvent(searchGridInput, grid);
            //grid搜索按钮点击事件
            this._searchGridBtnEvent(searchGridBtn, searchGridInput, grid);

        },
        _createModalContainer: function () {
            var modalContainer = $('<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="orgGridModalLabel"></div>');
            return modalContainer;
        },
        _createModalContentContainer: function () {
            var modalContentContainer = $('<div class="modal-dialog modal-grid" role="document"><div class="modal-content"></div></div>');
            return modalContentContainer;
        },
        _createModalHeaderContainer: function () {
            var modalHeaderContainer = $('<div class="modal-header">' +
                '   <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '   <h5 class="modal-title modal-jz" id="orgGridModalLabel">选择组织机构</h5>' +
                '   <button type="button" class="btn btn-sm blue pull-right mr20 modal-cancel">取消</button>' +
                '   <button type="button" class="btn btn-sm blue pull-right mr20 modal-save">确定</button>' +
                '</div>');
            return modalHeaderContainer;
        },
        _createModalBodyContainer: function () {
            var modalBodyContainer = $('<div class="modal-body clearfix"></div>');
            return modalBodyContainer;
        },
        _createBodyLeftContainer: function () {
            var bodyLeftContainer = $('<div class="addBorder rm-pad pull-left" style="width: 230px"></div>');
            return bodyLeftContainer;
        },
        _createTreeHeader: function () {/*
         var orgTreeHeader = $('<div class="modal_title" id="changeSpanText">'+
         '   <i class="fa fa-sitemap" aria-hidden="true"></i>'+
         '   <span class="modal-title">组织机构</span>'+
         '   <input type="text" class="form-control" placeholder="输入关键词..." id="_searchOrgTreeInput">'+
         '   <button type="button" class="btn btn-sm btnMsearch rm-pad" id="_searchOrgTreeBtn">'+
         '       <i class="fa fa-search" aria-hidden="true"></i>'+
         '   </button>'+
         '</div>');*/

            var orgTreeHeader = $('<div class="modal_title" id="changeSpanText" style="height: 85px">' +
                '   <i class="fa fa-sitemap" aria-hidden="true"></i>' +
                '   <span class="modal-title" style="display: inline-block">组织机构</span>' +
                '   <input type="text" class="form-control" placeholder="输入关键词..." id="_searchOrgTreeInput" style="width: 64%">' +
                '   <button type="button" class="btn btn-sm btnMsearch rm-pad" id="_searchOrgTreeBtn">' +
                '       <i class="fa fa-search" aria-hidden="true"></i>' +
                '   </button>' +
                '</div>');

            return orgTreeHeader;
        },
        _createTreeContainer: function () {
            var orgTreeContainer = $('<div class="treeConent selector-model-tree" id="_orgTreeContainer"></div>');
            return orgTreeContainer;
        },
        _createTree: function () {
            var orgTree = $('<ul class="ztree"></ul>');
            return orgTree;
        },
        _createBodyRightContainer: function () {
            var bodyRightContainer = $('<div class="pull-right changeWidth rm-pad" style="width: 678px;"></div>');
            return bodyRightContainer;
        },
        _createGridHeader: function () {
            var orgGridHeader = $('<div class="modal_title">' +
                '   <i class="fa fa-list" aria-hidden="true"></i>' +
                '   <span>组织列表</span>' +
                '   <input type="text" class="form-control " placeholder="名称/全路径/序号" id="form-control-one">' +
                '   <button type="button" class="btn btn-sm btnMsearch rm-pad">' +
                '      <i class="fa fa-search" aria-hidden="true"></i>' +
                '   </button>' +
                '</div>');
            return orgGridHeader;
        },
        _createGridContainer: function () {
            var orgGridContainer = $('<div id="_orgGridContainer"></div>');
            return orgGridContainer;
        },
        _createGrid: function () {
            var orgGrid = $('<table id="_orgGridList"></table>');
            return orgGrid;
        },

        /**
         * 初始化容器大小和数据
         * @param orgTreeContainer ztree父级容器
         * @param orgGridContainer grid父级容器
         * @param orgGridModal 模态框jq对象
         * @param orgGridObj grid jq对象
         * @param orgTreeObj ztree jq对象
         */
        _initSizeAndData: function (treeContainer, gridContainer, modalContainer, gridObj, treeObj) {
            var that = this;
            treeContainer.css({
                height: '350px',
                overflow: 'auto'
            });

            gridContainer.css({
                height: '350px',
                overflow: 'hidden'
            });

            modalContainer.on('hide.bs.modal', function () {
                if (that.options.targetId) {
                    var cacheObj = $(that).data();
                    if (cacheObj) {
                        for (var item in cacheObj) {
                            if (item) {
                                //console.info(cacheObj[item]);
                                cacheObj[item] = undefined;
                            }
                        }
                        gridObj.jqGrid('clearGridData');
                    }
                }

                treeContainer.getNiceScroll().hide();
                gridContainer.find('.ui-jqgrid-bdiv').getNiceScroll().hide();
                gridContainer.find('.ui-jqgrid-bdiv').css({
                    height:'200px ! important'
                });
            });

            modalContainer.on('shown.bs.modal', function () {
                //modalContainer.find('div.ui-jqgrid-view').css({'padding-top':'8px'});

                //gridObj.jqGrid().setGridHeight(gridContainer.height()-32);
                //gridObj.jqGrid().setGridWidth(gridContainer.width()-2);
                gridObj.jqGrid('setGridHeight', gridContainer.height() - 32);
                gridObj.jqGrid('setGridWidth', gridContainer.width() - 2);

                $.xljUtils.addTreeScroll('selector-model-tree');
                $.xljUtils.addGridScroll("", gridContainer); //加上父级元素 否则其他grid受影响 miying add
                $(".selector-model-tree").getNiceScroll().show().resize();
                gridContainer.find('.ui-jqgrid-bdiv').getNiceScroll().show().resize();

                var $ele = $(that.$element);
                var ids = '';
                var names = '';
                var prefixIds = '';
                var prefixNames = '';

                setTimeout(function () {
                    if (that.options.selectorType == 'org') {
                        if (that.options.targetId && $.trim(that.options.targetId) != '') {
                            var targetIdInputObj = $('#' + that.options.targetId);
                            if (targetIdInputObj.length > 0) {
                                ids = targetIdInputObj.val();
                            }
                        }

                        if (that.options.targetName && $.trim(that.options.targetName) != '') {
                            var targetNameInputObj = $('#' + that.options.targetName);
                            if (targetNameInputObj.length > 0) {
                                names = targetNameInputObj.val();
                            }
                        }

                        if (that.options.targetPrefixId && $.trim(that.options.targetPrefixId) != '') {
                            var targetPrefixIdInputObj = $('#' + that.options.targetPrefixId);
                            if (targetPrefixIdInputObj.length > 0) {
                                targetPrefixIdInputObj.val(prefixIds);
                            }
                        }

                        if (that.options.targetPrefixName && $.trim(that.options.targetPrefixName) != '') {
                            var targetPrefixNameInputObj = $('#' + that.options.targetPrefixName);
                            if (targetPrefixNameInputObj.length > 0) {
                                prefixNames = targetPrefixNameInputObj.val();
                            }
                        }

                        /*ids = ids==''?$(that).data('_orgIds'):ids;
                         names = names==''?$(that).data('_orgNames'):names;
                         prefixNames = prefixNames==''?$(that).data('_orgPrefixNames'):prefixNames;
                         prefixIds = prefixIds==''?$(that).data('_orgPrefixIds'):prefixIds;

                         $(that).data('_orgIds',ids);
                         $(that).data('_orgNames',names);
                         $(that).data('_orgPrefixNames',prefixNames);
                         $(that).data('_orgPrefixIds',prefixIds);

                         var orgIds = $(that).data('_orgIds');*/
                        orgIds = ids;
                        if (orgIds && orgIds != '') {
                            var orgIdArr = orgIds.split(',');
                            var zTreeObj = that.zTreeObj;//$.fn.zTree.getZTreeObj(treeObj.attr('id'));
                            if (zTreeObj) {
                                for (var i in orgIdArr) {
                                    var treeNode = zTreeObj.getNodesByParam('id', orgIdArr[i], null);
                                    if (treeNode && treeNode[0]) {
                                        that._addDataToGrid(gridObj, treeNode[0]);
                                    }
                                }
                            }

                        } else {
                            gridObj.data('unsearchIds', []);
                            gridObj.data('searchIds', []);
                        }
                    }else  if (that.options.selectorType == 'region') {
                        if (that.options.targetId && $.trim(that.options.targetId) != '') {
                            var targetIdInputObj = $('#' + that.options.targetId);
                            if (targetIdInputObj.length > 0) {
                                ids = targetIdInputObj.val();
                            }
                        }

                        if (that.options.targetName && $.trim(that.options.targetName) != '') {
                            var targetNameInputObj = $('#' + that.options.targetName);
                            if (targetNameInputObj.length > 0) {
                                names = targetNameInputObj.val();
                            }
                        }

                        if (that.options.targetPrefixId && $.trim(that.options.targetPrefixId) != '') {
                            var targetPrefixIdInputObj = $('#' + that.options.targetPrefixId);
                            if (targetPrefixIdInputObj.length > 0) {
                                targetPrefixIdInputObj.val(prefixIds);
                            }
                        }

                        if (that.options.targetPrefixName && $.trim(that.options.targetPrefixName) != '') {
                            var targetPrefixNameInputObj = $('#' + that.options.targetPrefixName);
                            if (targetPrefixNameInputObj.length > 0) {
                                prefixNames = targetPrefixNameInputObj.val();
                            }
                        }
                        var orgIds = ids;
                        if (orgIds && orgIds != '') {
                            var orgIdArr = orgIds.split(',');
                            var zTreeObj = that.zTreeObj;//$.fn.zTree.getZTreeObj(treeObj.attr('id'));
                            if (zTreeObj) {
                                for (var i in orgIdArr) {
                                    var treeNode = zTreeObj.getNodesByParam('id', orgIdArr[i], null);
                                    if (treeNode && treeNode[0]) {
                                        that._addDataToGrid(gridObj, treeNode[0]);
                                    }
                                }
                            }

                        } else {
                            gridObj.data('unsearchIds', []);
                            gridObj.data('searchIds', []);
                        }
                    }
                    else if (that.options.selectorType == 'person') {
                        var userIds = '';
                        var userNames = '';

                        if (that.options.targetId && $.trim(that.options.targetId) != '') {
                            var targetUserIdInput = $('#' + that.options.targetId);
                            if (targetUserIdInput.length > 0) {
                                userIds = targetUserIdInput.val();
                            }
                        }
                        if (that.options.targetName && $.trim(that.options.targetName) != '') {
                            var targetUserNameInput = $('#' + that.options.targetName);
                            if (targetUserNameInput.length > 0) {
                                userNames = targetUserNameInput.val();
                            }
                        }

                        /*userIds = userIds==''?$(that).data('_userIds'):userIds;
                         userNames = userNames==''?$(that).data('_userNames'):userNames;

                         $(that).data('_userIds',userIds);
                         $(that).data('_userNames',userNames);

                         var userIds = $(that).data('_userIds');*/
                        if (userIds && userIds != '') {
                            var userIdArr = userIds.split(',');
                            //var zTreeObj =  $.fn.zTree.getZTreeObj(treeObj.attr('id'));
                            var zTreeObj = that.zTreeObj;
                            if (zTreeObj) {
                                for (var i in userIdArr) {
                                    var treeNode = zTreeObj.getNodesByParam('id', userIdArr[i], null);
                                    if (treeNode && treeNode[0]) {
                                        //只回显人员
                                        for(var j=0;j<treeNode.length;j++){
                                            if(treeNode[j].type=='user'){
                                                that._addDataToGrid(gridObj, treeNode[j]);
                                                break;
                                            }
                                        }

                                    }
                                }
                            }
                        } else {
                            gridObj.data('unsearchIds', []);
                            gridObj.data('searchIds', []);
                        }

                    } else if (that.options.selectorType == 'post') {
                        var postIds = '';
                        var postNames = '';
                        var postCodes = '';
                        if (that.options.targetId && $.trim(that.options.targetId) != '') {
                            var targetUserIdInput = $('#' + that.options.targetId);
                            if (targetUserIdInput.length > 0) {
                                postIds = targetUserIdInput.val();
                            }
                        }

                        if (that.options.targetName && $.trim(that.options.targetName) != '') {
                            var targetUserNameInput = $('#' + that.options.targetName);
                            if (targetUserNameInput.length > 0) {
                                postNames = targetUserNameInput.val();
                            }
                        }

                        if (that.options.targetCode && $.trim(that.options.targetCode) != '') {
                            var targetCodeInput = $('#' + that.options.targetCode);
                            if (targetCodeInput.length > 0) {
                                postCodes = targetCodeInput.val();
                            }
                        }

                        postIds = postIds == '' ? $(that).data('_postIds') : postIds;
                        postNames = postNames == '' ? $(that).data('_postNames') : postNames;
                        postCodes = postCodes == '' ? $(that).data('_postCodes') : postCodes;

                        $(that).data('_postIds', postIds);
                        $(that).data('_postNames', postNames);
                        $(that).data('_postCodes', postCodes);

                        var postIds = $(that).data('_postIds');
                        if (postIds && postIds != '') {
                            var postIdArr = postIds.split(',');
                            //var zTreeObj =  $.fn.zTree.getZTreeObj(treeObj.attr('id'));
                            var zTreeObj = that.zTreeObj;
                            if (zTreeObj) {
                                for (var i in postIdArr) {
                                    var treeNode = zTreeObj.getNodesByParam('id', postIdArr[i], null);
                                    if (treeNode && treeNode[0]) {
                                        that._addDataToGrid(gridObj, treeNode[0]);
                                    }
                                }
                            }
                        }

                    } else if (that.options.selectorType == 'role') {
                        var roleIds = '';
                        var roleNames = '';
                        var roleCodes = '';
                        if (that.options.targetId && $.trim(that.options.targetId) != '') {
                            var targetUserIdInput = $('#' + that.options.targetId);
                            if (targetUserIdInput.length > 0) {
                                roleIds = targetUserIdInput.val();
                            }
                        }

                        if (that.options.targetName && $.trim(that.options.targetName) != '') {
                            var targetUserNameInput = $('#' + that.options.targetName);
                            if (targetUserNameInput.length > 0) {
                                roleNames = targetUserNameInput.val();
                            }
                        }

                        if (that.options.targetCode && $.trim(that.options.targetCode) != '') {
                            var targetCodeInput = $('#' + that.options.targetCode);
                            if (targetCodeInput.length > 0) {
                                roleCodes = targetCodeInput.val();
                            }
                        }

                        roleIds = roleIds == '' ? $(that).data('_roleIds') : roleIds;
                        roleNames = roleNames == '' ? $(that).data('_roleNames') : roleNames;
                        roleCodes = roleCodes == '' ? $(that).data('_roleCodes') : roleCodes;

                        $(that).data('_roleIds', roleIds);
                        $(that).data('_roleNames', roleNames);
                        $(that).data('_roleCodes', roleCodes);

                        var roleIds = $(that).data('_roleIds');
                        if (roleIds && roleIds != '') {
                            var roleIdArr = roleIds.split(',');
                            //var zTreeObj =  $.fn.zTree.getZTreeObj(treeObj.attr('id'));
                            var zTreeObj = that.zTreeObj;
                            var nodes = zTreeObj.transformToArray(zTreeObj.getNodes());
                            var dataArr = [];
                            for (var i in nodes) {
                                if ($.inArray(nodes[i].id, roleIdArr) != -1) {
                                    dataArr.push(that._formatGridRowData(gridObj, nodes[i]));
                                }
                            }
                            gridObj.jqGrid("addRowData", "id", dataArr);
                            //var zTreeObj =  $.fn.zTree.getZTreeObj(treeObj.attr('id'));

                            /*var zTreeObj =  that.zTreeObj;		
                             if(zTreeObj){
                             for(var i in roleIdArr){
                             var treeNode = zTreeObj.getNodesByParam('id',roleIdArr[i],null);
                             if(treeNode&&treeNode[0]){
                             that._addDataToGrid(gridObj,treeNode[0]);
                             }
                             }
                             }*/

                        }

                    }

                }, 500);


                modalContainer.css({position: 'fixed'});
            });
        },

        /**
         * 初始化左侧树
         * @param treeObj
         * @param url
         * @param param
         * @param modalContainer
         * @private
         */
        _initTree: function (treeObj, url, param, gridObj) {
            var that = this;
            treeId = treeObj[0].id;
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(param),
                success: function (json) {
                    var success = json.success;
                    if (success) {
                        //返回的数据节点
                        var zNodes = json.result;
                        //设置图片样式
                        that._recursionArray(zNodes);
                        var settings = $.extend(true, {
                            view: {
                                fontCss: that._getFontCss,
                                dblClickExpand: false
                            },
                            callback: {
                                onDblClick: function (event, treeId, treeNode) {
                                    //定义可选节点
                                    var selectNodeType = that.options.selectNodeType;
                                    for (var item in selectNodeType) {
                                        if (selectNodeType[item] == 'all') {
                                            break;
                                        }

                                        if (item == 'msg') {
                                            continue;
                                        }
                                        /* var selectNodeTypeArr = selectNodeType[item].split(',');
                                         if($.inArray(treeNode[item],selectNodeTypeArr) == -1){
                                         if(selectNodeType.msg){
                                         $.xljUtils.tip('blue',selectNodeType.msg);
                                         }
                                         return;
                                         }*/

                                        if (typeof selectNodeType[item] == 'string') {
                                            var selectNodeTypeArr = selectNodeType[item].split(',');
                                            if ($.inArray(treeNode[item], selectNodeTypeArr) == -1) {
                                                if (selectNodeType.msg) {
                                                    $.xljUtils.tip('blue', selectNodeType.msg);
                                                }
                                                return;
                                            }
                                        } else if (treeNode[item] != selectNodeType[item]) {
                                            if (selectNodeType.msg) {
                                                $.xljUtils.tip('blue', selectNodeType.msg);
                                            }
                                            return;
                                        }
                                    }

                                    var $selectorType = that.options.selectorType;
                                    if ($selectorType == 'person' && treeNode.type != 'user') {
                                        var childNodes = that.zTreeObj.transformToArray(treeNode.children);
                                        $.each(childNodes, function (i, childNode) {
                                            if (childNode.type == 'user') {
                                                that._addDataToGrid(gridObj, childNode);
                                            }
                                        });
                                        return;
                                    }
                                    if ($selectorType == 'org' && treeNode.type == 'cata') {
                                        $.tip('blue', '组织机构顶级目录不能选择！');
                                        return;
                                    }
                                    if ($selectorType == 'org' && treeNode.type != 'cata') {
                                        //lixd 处理考勤机构多选，选择公司的时候，不把旗下的部门带过去
                                        //2018-2-11 根据李伟的需求 所有的模块都改，就不需求特殊指定处理了
                                        //页面配置 data-treeParam='{"noChildren":"1"}'
                                        // var noChildren=that.options.treeParam.noChildren;//不选择子节点
                                        var childNodes;//所有节点
                                        // if(noChildren!=undefined&&noChildren=='1'){
                                            var children=treeNode.children;//子节点
                                            treeNode.children=[];//清空子节点
                                            childNodes = that.zTreeObj.transformToArray(treeNode);
                                            treeNode.children=children;//还原子节点
                                        // }else{
                                        //     childNodes = that.zTreeObj.transformToArray(treeNode);
                                        // }

                                        $.each(childNodes, function (i, childNode) {
                                            if (childNode.type != 'cata') {
                                                /*if(selectNodeType){
                                                 if(selectNodeType.type==childNode.type){
                                                 that._addDataToGrid(gridObj,childNode);
                                                 }

                                                 }else {*/
                                                that._addDataToGrid(gridObj, childNode);
                                                //}
                                            }
                                        });
                                        return;
                                    }
                                    if ($selectorType == 'region' && treeNode.id == '1') { //省市区的根节点
                                        $.tip('blue', '省市县顶级目录不能选择！');
                                        return;
                                    }
                                    if ($selectorType == 'region'&& treeNode.id != '1') {
                                        var childNodes;//所有节点
                                        // if(noChildren!=undefined&&noChildren=='1'){
                                        var children=treeNode.children;//子节点
                                        treeNode.children=[];//清空子节点
                                        childNodes = that.zTreeObj.transformToArray(treeNode);
                                        treeNode.children=children;//还原子节点

                                        $.each(childNodes, function (i, childNode) {
                                            if (childNode.id != '1') { //排除根节点
                                                that._addDataToGrid(gridObj, childNode);
                                            }
                                        });
                                        return;
                                    }
                                    if ($selectorType == 'post' && treeNode.type != 'post') {
                                        var childNodes = that.zTreeObj.transformToArray(treeNode.children);
                                        $.each(childNodes, function (i, childNode) {
                                            if (childNode.type == 'post') {
                                                that._addDataToGrid(gridObj, childNode);
                                            }
                                        });
                                        return;
                                    }
                                    if ($selectorType == 'role' && treeNode.mold == 'cata') {
                                        //$.xljUtils.tip('blue','不能选择角色目录！');
                                        var childNodes = that.zTreeObj.transformToArray(treeNode.children);
                                        $.each(childNodes, function (i, childNode) {
                                            if (childNode.mold != 'cata') {
                                                that._addDataToGrid(gridObj, childNode);
                                            }
                                        });
                                        return;
                                    }

                                    that._addDataToGrid(gridObj, treeNode);
                                },
                                onExpand: function (event, treeId, treeNode) {
                                    $(".selector-model-tree").getNiceScroll().show().resize();
                                },
                                onCollapse: function () {
                                    $(".selector-model-tree").getNiceScroll().show().resize();
                                }
                            }
                        }, that.options.treeSettings);

                        var zTreeObj = $.fn.zTree.init(treeObj, settings, zNodes);
                        that.zTreeObj = zTreeObj;
                        var nodes = zTreeObj.getNodes();
                        //默认展开第一个节点
                        zTreeObj.expandNode(nodes[0], true, false, false, true);
                    } else {
                        $.xljUtils.tip('red', '数据获取失败！')
                    }

                },
                error: function (xhr) {
                    $.xljUtils.getError(xhr.status);
                }
            });
        },
        _initGrid: function (gridObj, colNames, colModel) {
            var that = this;
            gridObj.jqGrid({
                datatype: "local",//请求数据返回的类型。可选json,xml,txt
                colNames: colNames,//jqGrid的列显示名字
                colModel: colModel,
                autoWidth: true,
                rownumbers: true,
                rowNum: -1,//一页显示多少条
                sortorder: "desc",//排序方式,可选desc,asc
                ondblClickRow: function (rowid, iRow, iCol, e) {
                    var rowData = gridObj.jqGrid('getRowData', rowid);
                    var unsearchIds = gridObj.data("unsearchIds");
                    if (!unsearchIds) {
                        unsearchIds = [];
                    }
                    if (unsearchIds.indexOf(rowData.id) != -1) {
                        unsearchIds.splice(unsearchIds.indexOf(rowData.id), 1);
                    }
                    gridObj.data('unsearchIds', unsearchIds);


                    var searchIds = gridObj.data("searchIds");
                    if (!searchIds) {
                        searchIds = [];
                    }
                    if (searchIds.indexOf(rowData.id) != -1) {
                        searchIds.splice(searchIds.indexOf(rowData.id), 1);
                    }
                    gridObj.data('searchIds', searchIds);

                    gridObj.jqGrid('delRowData', rowid);
                },
                afterInsertRow: function (rowId, rowData, rowElem) {
                    var unsearchIds = gridObj.data("unsearchIds");
                    if (!unsearchIds) {
                        unsearchIds = [];
                    }
                    if (unsearchIds.indexOf(rowData.id) != -1) {
                        unsearchIds.splice(unsearchIds.indexOf(rowData.id), 1);
                    }
                    gridObj.data('unsearchIds', unsearchIds);

                    var searchIds = gridObj.data("searchIds");
                    if (!searchIds) {
                        searchIds = [];
                    }
                    if (searchIds.indexOf(rowData.id) == -1) {
                        searchIds.push(rowData.id);
                    }
                    gridObj.data('searchIds', searchIds);
                },
                gridComplete: function () {
                    that.modalContainer.find('.ui-jqgrid-htable').css({'margin-top': '4px'});
                    $('.ui-jqgrid-bdiv').getNiceScroll().show().resize();
                }
            });
        },
        /**
         * 向grid中动态添加数据
         * @private
         */
        _addDataToGrid: function (gridObj, treeNode) {
            var _selectorType = this.options.selectorType;
            var rowData = gridObj.jqGrid('getRowData', treeNode.id);
            if (rowData && !rowData.id) {
                switch (this.options.selectorType) {
                    case 'org':
                        var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                        var data = {};
                        for (var i in gridProp) {
                            if (gridProp[i].name != 'rn') {
                                if (gridProp[i].name == 'name') {
                                    data[gridProp[i].name] = $.xljUtils.htmlEncode(treeNode[gridProp[i].name]);
                                } else {
                                    data[gridProp[i].name] = treeNode[gridProp[i].name];
                                }
                            }
                        }
                        gridObj.jqGrid('addRowData', treeNode.id, data);
                        break;
                    case 'region':
                        var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                        var data = {};
                        for (var i in gridProp) {
                            if (gridProp[i].name != 'rn') {
                                if (gridProp[i].name == 'name') {
                                    data[gridProp[i].name] = $.xljUtils.htmlEncode(treeNode[gridProp[i].name]);
                                } else {
                                    data[gridProp[i].name] = treeNode[gridProp[i].name];
                                }
                            }
                        }
                        gridObj.jqGrid('addRowData', treeNode.id, data);
                        break;
                    case 'person':

                        var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                        var data = {};
                        var prefixName = treeNode.prefixName;
                        var prefixId = treeNode.prefixId;
                        var postId = treeNode.postId;
                        // var postName = '';
                        if (postId && postId != '') {
                            if (prefixId.lastIndexOf('/') > -1) {
                                prefixId = prefixId.substring(0, prefixId.lastIndexOf('/'));
                            }

                            if (prefixId.lastIndexOf('/') > -1) {
                                prefixId = prefixId.substring(0, prefixId.lastIndexOf('/'));
                            }

                            if (prefixName.lastIndexOf('/') > -1) {
                                prefixName = prefixName.substring(0, prefixName.lastIndexOf('/'));
                            }
                            // if (prefixName.lastIndexOf('/') > -1) {
                            //     postName = prefixName.substring(prefixName.lastIndexOf('/') + 1);
                            //     prefixName = prefixName.substring(0, prefixName.lastIndexOf('/'));
                            // }

                        } else {

                        }
                        data.id = treeNode.prefixId;
                        data.userId = treeNode.id;
                        data.name = $.xljUtils.htmlEncode(treeNode.name);
                        data.prefixId = prefixId;
                        data.prefixName = prefixName;
                        data.postId = treeNode.postId;
                        // data.postName = postName;
                        data.postName = treeNode.postName;
                        data.type = treeNode.type;
                        data.sex = treeNode.sex;
                        data.sexName = treeNode.sexName;
                        gridObj.jqGrid('addRowData', treeNode.id, data);
                        break;
                    case 'post':
                        var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                        var data = {};
                        for (var i in gridProp) {
                            if (gridProp[i].name != 'rn') {
                                if (gridProp[i].name == 'name') {
                                    data[gridProp[i].name] = $.xljUtils.htmlEncode(treeNode[gridProp[i].name]);
                                } else {

                                    data[gridProp[i].name] = treeNode[gridProp[i].name];
                                }
                            }
                        }
                        gridObj.jqGrid('addRowData', treeNode.id, data);
                        break;
                    case 'role':
                        var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                        var data = {};
                        for (var i in gridProp) {
                            if (gridProp[i].name != 'rn') {
                                if (gridProp[i].name == 'name') {
                                    data[gridProp[i].name] = $.xljUtils.htmlEncode(treeNode[gridProp[i].name]);
                                } else {

                                    data[gridProp[i].name] = treeNode[gridProp[i].name];
                                }
                            }
                        }
                        var parentNode = treeNode.getParentNode();
                        data.belongCatalogId = parentNode ? parentNode.id : '';
                        data.belongCatalog = parentNode ? parentNode.name : '';
                        if (treeNode.prefixName && treeNode.prefixName.lastIndexOf('/') > -1) {
                            data.prefixName = treeNode.prefixName.substring(0, treeNode.prefixName.lastIndexOf('/'));
                        } else {
                            data.prefixName = treeNode.prefixName;
                        }

                        gridObj.jqGrid('addRowData', treeNode.id, data);
                        break;
                }

            } else if (_selectorType == 'person') {
                var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                var data = {};
                var prefixName = treeNode.prefixName;
                var prefixId = treeNode.prefixId;
                var postId = treeNode.postId;
                var postName = '';
                if (postId && postId != '') {
                    if (prefixId.lastIndexOf('/') > -1) {
                        prefixId = prefixId.substring(0, prefixId.lastIndexOf('/'));
                    }

                    if (prefixId.lastIndexOf('/') > -1) {
                        prefixId = prefixId.substring(0, prefixId.lastIndexOf('/'));
                    }

                    if (prefixName.lastIndexOf('/') > -1) {
                        prefixName = prefixName.substring(0, prefixName.lastIndexOf('/'));
                    }
                    if (prefixName.lastIndexOf('/') > -1) {
                        postName = prefixName.substring(prefixName.lastIndexOf('/') + 1);
                        prefixName = prefixName.substring(0, prefixName.lastIndexOf('/'));
                    }

                } else {

                }
                data.id = treeNode.prefixId; //数据的id=节点对象的前缀id 机构id+"/"+人员id 保证唯一
                //console.log(989898);
                //console.log(data.id);
                data.userId = treeNode.id;
                data.name = $.xljUtils.htmlEncode(treeNode.name);
                data.prefixId = prefixId;
                data.prefixName = prefixName;
                data.postId = treeNode.postId;
                // data.postName = postName;
                data.postName = treeNode.postName;
                data.type = treeNode.type;
                data.sex = treeNode.sex;
                data.sexName = treeNode.sexName;
                if (rowData && rowData.id) {
                    gridObj.jqGrid('delRowData', treeNode.id);
                    var unsearchIds = gridObj.data("unsearchIds");
                    if (!unsearchIds) {
                        unsearchIds = [];
                    }
                    if (unsearchIds.indexOf(rowData.id) != -1) {
                        unsearchIds.splice(unsearchIds.indexOf(rowData.id), 1);
                    }
                    gridObj.data('unsearchIds', unsearchIds);

                    var searchIds = gridObj.data("searchIds");
                    if (!searchIds) {
                        searchIds = [];
                    }
                    if (searchIds.indexOf(rowData.id) != -1) {
                        searchIds.splice(searchIds.indexOf(rowData.id), 1);
                    }
                    gridObj.data('searchIds', searchIds);
                }
                gridObj.jqGrid('addRowData', treeNode.id, data);
            }
        },
        /**
         * 批量向grid中添加数据
         *
         */
        _formatGridRowData: function (gridObj, treeNode) {
            var _selectorType = this.options.selectorType;
            var rowData = gridObj.jqGrid('getRowData', treeNode.id);
            var _data;
            if (rowData && !rowData.id) {
                switch (this.options.selectorType) {
                    case 'org':
                        var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                        var data = {};
                        for (var i in gridProp) {
                            if (gridProp[i].name != 'rn') {
                                data[gridProp[i].name] = treeNode[gridProp[i].name];
                            }
                        }
                        _data = data;
                        break;
                    case 'region':
                        var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                        var data = {};
                        for (var i in gridProp) {
                            if (gridProp[i].name != 'rn') {
                                data[gridProp[i].name] = treeNode[gridProp[i].name];
                            }
                        }
                        _data = data;
                        break;
                    case 'person':

                        var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                        var data = {};
                        var prefixName = treeNode.prefixName;
                        var prefixId = treeNode.prefixId;
                        var postId = treeNode.postId;
                        // var postName = '';
                        if (postId && postId != '') {
                            if (prefixId.lastIndexOf('/') > -1) {
                                prefixId = prefixId.substring(0, prefixId.lastIndexOf('/'));
                            }

                            if (prefixId.lastIndexOf('/') > -1) {
                                prefixId = prefixId.substring(0, prefixId.lastIndexOf('/'));
                            }

                            if (prefixName.lastIndexOf('/') > -1) {
                                prefixName = prefixName.substring(0, prefixName.lastIndexOf('/'));
                            }
                            // if (prefixName.lastIndexOf('/') > -1) {
                            //     postName = prefixName.substring(prefixName.lastIndexOf('/') + 1);
                            //     prefixName = prefixName.substring(0, prefixName.lastIndexOf('/'));
                            // }

                        } else {

                        }
                        data.id = treeNode.prefixId;
                        data.userId = treeNode.id;
                        data.name = treeNode.name;
                        data.prefixId = prefixId;
                        data.prefixName = prefixName;
                        data.postId = treeNode.postId;
                        // data.postName = postName;
                        data.postName = treeNode.postName;
                        data.type = treeNode.type;
                        data.sex = treeNode.sex;
                        data.sexName = treeNode.sexName;
                        _data = data;
                        break;
                    case 'post':
                        var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                        var data = {};
                        for (var i in gridProp) {
                            if (gridProp[i].name != 'rn') {
                                data[gridProp[i].name] = treeNode[gridProp[i].name];
                            }
                        }
                        _data = data;
                        break;
                    case 'role':
                        var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                        var data = {};
                        for (var i in gridProp) {
                            if (gridProp[i].name != 'rn') {
                                data[gridProp[i].name] = treeNode[gridProp[i].name];
                            }
                        }
                        var parentNode = treeNode.getParentNode();
                        data.belongCatalogId = parentNode ? parentNode.id : '';
                        data.belongCatalog = parentNode ? parentNode.name : '';
                        if (treeNode.prefixName && treeNode.prefixName.lastIndexOf('/') > -1) {
                            data.prefixName = treeNode.prefixName.substring(0, treeNode.prefixName.lastIndexOf('/'));
                        } else {
                            data.prefixName = treeNode.prefixName;
                        }

                        _data = data;
                        break;
                }

            } else if (_selectorType == 'person') {
                var gridProp = gridObj.jqGrid('getGridParam', 'colModel');
                var data = {};
                var prefixName = treeNode.prefixName;
                var prefixId = treeNode.prefixId;
                var postId = treeNode.postId;
                var postName = '';
                if (postId && postId != '') {
                    if (prefixId.lastIndexOf('/') > -1) {
                        prefixId = prefixId.substring(0, prefixId.lastIndexOf('/'));
                    }

                    if (prefixId.lastIndexOf('/') > -1) {
                        prefixId = prefixId.substring(0, prefixId.lastIndexOf('/'));
                    }

                    if (prefixName.lastIndexOf('/') > -1) {
                        prefixName = prefixName.substring(0, prefixName.lastIndexOf('/'));
                    }
                    if (prefixName.lastIndexOf('/') > -1) {
                        postName = prefixName.substring(prefixName.lastIndexOf('/') + 1);
                        prefixName = prefixName.substring(0, prefixName.lastIndexOf('/'));
                    }

                } else {

                }
                data.id = treeNode.prefixId;
                data.userId = treeNode.id;
                data.name = treeNode.name;
                data.prefixId = prefixId;
                data.prefixName = prefixName;
                data.postId = treeNode.postId;
                // data.postName = postName;
                data.postName = treeNode.postName;
                data.type = treeNode.type;
                data.sex = treeNode.sex;
                data.sexName = treeNode.sexName;
                if (rowData && rowData.id) {
                    gridObj.jqGrid('delRowData', treeNode.id);
                    var unsearchIds = gridObj.data("unsearchIds");
                    if (!unsearchIds) {
                        unsearchIds = [];
                    }
                    if (unsearchIds.indexOf(rowData.id) != -1) {
                        unsearchIds.splice(unsearchIds.indexOf(rowData.id), 1);
                    }
                    gridObj.data('unsearchIds', unsearchIds);

                    var searchIds = gridObj.data("searchIds");
                    if (!searchIds) {
                        searchIds = [];
                    }
                    if (searchIds.indexOf(rowData.id) != -1) {
                        searchIds.splice(searchIds.indexOf(rowData.id), 1);
                    }
                    gridObj.data('searchIds', searchIds);
                }
                _data = data;
            }
            return _data;
        },
        /**
         * 设置ztree节点图标
         * @param arr
         * @private
         */
        _recursionArray: function (arr) {
            var that = this;
            //所属的分类 diy-group 目录 diy-company 集团和公司;diy-program 项目和分期;diy-department 部门;
            for (var i in arr) {
                arr[i].name = $.xljUtils.htmlDecode(arr[i].name);
                if (arr[i].type == "zb" || arr[i].type == "company") {
                    arr[i].iconSkin = "diy-company";
                    if (arr[i].children && arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                } else if (arr[i].type == "dept") {
                    arr[i].iconSkin = "diy-department";
                    if (arr[i].children && arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                } else if (arr[i].type == "group") {
                    arr[i].iconSkin = "diy-program";
                    if (arr[i].children && arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                } else if (arr[i].type == "branch") {
                    arr[i].iconSkin = "diy-program";
                    if (arr[i].children && arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                } else if (arr[i].type == "cata") {
                    arr[i].iconSkin = "diy-group";
                    if (arr[i].children && arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                } else if (arr[i].type == "post") {
                    arr[i].iconSkin = "diy-post";
                    if (arr[i].children && arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                } else if (arr[i].type == "user") {
                    arr[i].iconSkin = "diy-member";
                    if (arr[i].children && arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }

                if (arr[i].mold == "cata") {
                    arr[i].iconSkin = "diy-roleType";
                    if (arr[i].children && arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                } else if (arr[i].mold == "role") {
                    if (arr[i].type == '0') {
                        arr[i].iconSkin = "diy-fictitious";
                        /*if(arr[i].children&&arr[i].children.length > 0) {
                         that._recursionArray(arr[i].children);
                         }*/
                    } else {
                        arr[i].iconSkin = "diy-role";
                        /*if(arr[i].children&&arr[i].children.length > 0) {
                         that._recursionArray(arr[i].children);
                         }*/
                    }

                }

                if (arr[i].type == "APPSystem") {
                    arr[i].iconSkin = "diy-system";
                    if (arr[i].children && arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                } else if (arr[i].type == "RESOURCE") {
                    arr[i].iconSkin = "diy-menu";
                    if (arr[i].children && arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }
            }
        },
        /**
         *  查找树节点
         *  @param 查找节点属性
         *  @param 查找的节点属性的对应值
         *  @param 是否标记为高亮
         */
        _searchOrgTree: function (keyName, value, isHighlight, treeObj) {
            var ztreeObj = this.zTreeObj;
            var that = this;
            var nodes = ztreeObj.getNodesByParamFuzzy(keyName, value, null);
            $.each(nodes, function (i, node) {
                //zTree.setting.view.fontCss = {};
                if (isHighlight) {
                    node.highlight = 'true';
                } else {
                    node.highlight = 'false';
                }
                var parentNodes = [];
                that._getTreeParentNodes(node, parentNodes);
                $.each(parentNodes, function (i, parentNode) {
                    if (isHighlight) {
                        parentNode.highlight = 'true';
                    } else {
                        parentNode.highlight = 'false';
                    }
                    ztreeObj.updateNode(parentNode);
                });

                ztreeObj.updateNode(node);
                if (i == 0) {
                    ztreeObj.expandNode(node.getParentNode(), true, false, true, true);
                } else {
                    //ztreeObj.expandNode(node.getParentNode(), true, false, false,true);
                }

            });

            var nodes = ztreeObj.getNodesByFilter(function (node) {
                return node.highlight != 'true';
            }, false);
            if (isHighlight) {
                ztreeObj.hideNodes(nodes);
            } else {
                ztreeObj.showNodes(nodes);
            }
        },
        /**
         * 个性化文字样式，只针对 zTree 在节点上显示的对象
         * @param treeId
         * @param treeNode
         * @returns
         */
        _getFontCss: function (treeId, treeNode) {
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
        },
        /**
         * 搜索框keyup\blur事件
         * @param searchInputObj 搜索框input的jq对象
         */
        _searchTreeInputEvent: function (searchInputObj, treeObj) {
            var that = this;
            searchInputObj.bind('keyup', function (event) {
                if (event.keyCode == 13) {
                    that._searchOrgTree('highlight', 'true', false, treeObj);
                    var value = $(this).val();
                    if (value == '') {
                        that._searchOrgTree('highlight', 'true', false, treeObj);
                    } else {
                        that._searchOrgTree('name', $.trim(value), true, treeObj);
                    }
                }
            }).bind('blur', function (event) {
                var value = $(this).val();
                if (value == '') {
                    that._searchOrgTree('highlight', 'true', false, treeObj);
                }

            });
        },
        /**
         * 搜索按钮点击事件
         * @param searchBtnObj 搜索按钮jq对象
         * @param searchInputObj 搜索框input的jq对象
         */
        _searchTreeBtnEvent: function (searchBtnObj, searchInputObj, treeObj) {
            var that = this;
            searchBtnObj.on('click', function () {
                that._searchOrgTree('highlight', 'true', false, treeObj);
                var inputVal = searchInputObj.val();
                if ($.trim(inputVal) != '') {
                    that._searchOrgTree('name', inputVal, true, treeObj);
                }

            });
        },
        _searchGrid: function (searchVal, gridObj) {
            var that = this;
            var unsearchIds = gridObj.data("unsearchIds");
            if (!unsearchIds) {
                unsearchIds = [];
            }
            var searchIds = gridObj.data("searchIds");
            if (!searchIds) {
                searchIds = [];
            }
            if (searchVal != '') {
                var trs = gridObj.find('tr');
                $.each(trs, function (i, trObj) {
                    if (i > 0) {
//                        var trHtml = $(trObj).html();
                        var trHtml = trObj.innerText;
                        //var reg = new RegExp('('+searchVal+')');
                        var trId = $(trObj).attr('id');
                        var rowData = gridObj.jqGrid('getRowData', trId);
                        if (trHtml.indexOf(searchVal) != -1) {
                            if (searchIds.indexOf(rowData.id) == -1) {
                                searchIds.push(rowData.id);
                            }

                            if (unsearchIds.indexOf(rowData.id) != -1) {
                                unsearchIds.splice(unsearchIds.indexOf(rowData.id), 1);
                            }

                        } else {
                            if (unsearchIds.indexOf() == -1) {
                                unsearchIds.push(rowData.id);
                            }
                            if (searchIds.indexOf(rowData.id) != -1) {
                                searchIds.splice(searchIds.indexOf(rowData.id), 1);
                            }
                        }
                    }
                });

                gridObj.data("searchIds", searchIds);
                gridObj.data("unsearchIds", unsearchIds);
                gridObj.jqGrid('clearGridData');

                /*var searchNodes = that.zTreeObj.getNodesByFilter(function (node) {
                 if(that.selectorType=='person'){
                 return searchIds.indexOf(node.prefixId)!=-1;
                 }
                 return searchIds.indexOf(node.id)!=-1;
                 });*/
                //获取所有已搜索组织机构节点
                var searchNodes = this.zTreeObj.getNodesByFilter(function (node) {
                    if (that.options.selectorType == 'person') {
                        return searchIds.indexOf(node.prefixId) != -1;
                    }
                    return searchIds.indexOf(node.id) != -1;
                });
                $.each(searchNodes, function (i, searchNode) {
                    that._addDataToGrid(gridObj, searchNode);
                })
            } else {
                gridObj.jqGrid('clearGridData');
                var searchNodes = this.zTreeObj.getNodesByFilter(function (node) {
                    if (that.options.selectorType == 'person') {
                        return searchIds.indexOf(node.prefixId) != -1;
                    }
                    return searchIds.indexOf(node.id) != -1;
                });
                $.each(searchNodes, function (i, searchNode) {
                    that._addDataToGrid(gridObj, searchNode);
                });

                var unsearchNodes = this.zTreeObj.getNodesByFilter(function (node) {
                    if (that.options.selectorType == 'person') {
                        return unsearchIds.indexOf(node.prefixId) != -1;
                    }
                    return unsearchIds.indexOf(node.id) != -1;
                });

                $.each(unsearchNodes, function (i, unsearchNode) {
                    that._addDataToGrid(gridObj, unsearchNode);
                });
            }

        },
        _searchGridInputEvent: function (gridSearchInputObj, gridObj) {
            var that = this;
            gridSearchInputObj.bind('keyup', function (event) {
                if (event.keyCode == 13) {
                    that._searchGrid($(this).val(), gridObj);
                }
            });
        },
        _searchGridBtnEvent: function (gridSearchBtn, gridSearchInputObj, gridObj) {
            var that = this;
            gridSearchBtn.on('click', function () {
                var inputVal = gridSearchInputObj.val();
                that._searchGrid(inputVal, gridObj);
            });
        },
        _saveSelectData: function (gridObj, $ele, modalContainer) {
            $("#form-control-one").val('');
            $("#_searchOrgTreeInput").val('');
            var that = this;
            gridObj.jqGrid('clearGridData');
            //获取所有缓存的未搜索id
            var unsearchIds = gridObj.data("unsearchIds");
            if (!unsearchIds) {
                unsearchIds = [];
            }
            //获取所有缓存的已搜索ID
            var searchIds = gridObj.data("searchIds");
            if (!searchIds) {
                searchIds = [];
            }

            //获取所有已搜索组织机构节点
            var searchNodes = this.zTreeObj.getNodesByFilter(function (node) {
                if (that.options.selectorType == 'person') {
                    return searchIds.indexOf(node.prefixId) != -1;
                }
                return searchIds.indexOf(node.id) != -1;
            });


            var _searchNodesArr = []
            $.each(searchNodes, function (i, searchNode) {
                //that._addDataToGrid(gridObj,searchNode);
                _searchNodesArr.push(that._formatGridRowData(gridObj, searchNode));
            });
            gridObj.jqGrid("addRowData", "id", _searchNodesArr);
            //获取所有未搜索组织机构节点
            var unsearchNodes = this.zTreeObj.getNodesByFilter(function (node) {
                if (that.selectorType == 'person') {
                    return unsearchIds.indexOf(node.prefixId) != -1;
                }
                return unsearchIds.indexOf(node.id) != -1;
            });
            var _unsearchNodesArr = [];
            $.each(unsearchNodes, function (i, unsearchNode) {

                //that._addDataToGrid(gridObj,unsearchNode);
                _unsearchNodesArr.push(that._formatGridRowData(gridObj, unsearchNode));
            });
            gridObj.jqGrid("addRowData", "id", _unsearchNodesArr);

            var rowDatas = gridObj.jqGrid('getRowData');

            if (rowDatas && rowDatas.length == 0) {
                $.xljUtils.confirm('blue', '当前无选择数据，确定要保存吗？', function () {

                    switch (that.defaults.selectorType) {
                        case 'org':
                            _saveSelectOrgData();
                            break;
                        case 'region':
                            _saveSelectRegionData();
                            break;
                        case 'person':
                            _saveSelectPersonData();
                            break;
                        case 'post':
                            _saveSelectPostData();
                            break;
                        case 'role':
                            _saveSelectRoleData();
                            break;
                        default:
                            break;
                    }
                }, function () {

                });
                return;
            }

            //org选择器时执行
            function _saveSelectOrgData() {
                var ids = '';
                var names = '';
                var prefixNames = '';
                var prefixIds = '';
                for (var i in rowDatas) {
                    var rowData = rowDatas[i];
                    ids += rowData.id + ',';
                    names += rowData.name + ',';
                    prefixNames += rowData.prefixName + ',';
                    prefixIds += rowData.prefixId + ',';
                }
                ids = ids.length > 0 ? ids.substring(0, ids.lastIndexOf(',')) : '';
                names = names.length > 0 ? names.substring(0, names.lastIndexOf(',')) : '';
                prefixNames = prefixNames.length > 0 ? prefixNames.substring(0, prefixNames.lastIndexOf(',')) : '';
                prefixIds = prefixIds.length > 0 ? prefixIds.substring(0, prefixIds.lastIndexOf(',')) : '';

                $(that).data('_orgIds', ids);
                $(that).data('_orgNames', names);
                $(that).data('_orgPrefixNames', prefixNames);
                $(that).data('_orgPrefixIds', prefixIds);

                if (that.options.targetId && $.trim(that.options.targetId) != '') {
                    var targetIdInputObj = $('#' + that.options.targetId);
                    if (targetIdInputObj.length > 0) {
                        targetIdInputObj.val(ids);
                        targetIdInputObj.attr('title', ids);
                        $(targetIdInputObj).focus();
                    }
                }

                if (that.options.targetName && $.trim(that.options.targetName) != '') {
                    var targetNameInputObj = $('#' + that.options.targetName);
                    if (targetNameInputObj.length > 0) {
                        targetNameInputObj.val(names);
                        targetNameInputObj.attr('title', names);
                        $(targetNameInputObj).focus();
                    }
                }

                if (that.options.targetPrefixId && $.trim(that.options.targetPrefixId) != '') {
                    var targetPrefixIdInputObj = $('#' + that.options.targetPrefixId);
                    if (targetPrefixIdInputObj.length > 0) {
                        targetPrefixIdInputObj.val(prefixIds);
                        targetPrefixIdInputObj.attr('title', prefixIds);
                        $(targetPrefixIdInputObj).focus();
                    }
                }

                if (that.options.targetPrefixName && $.trim(that.options.targetPrefixName) != '') {
                    var targetPrefixNameInputObj = $('#' + that.options.targetPrefixName);
                    if (targetPrefixNameInputObj.length > 0) {
                        targetPrefixNameInputObj.val(prefixNames);
                        targetPrefixNameInputObj.attr('title', prefixNames);
                        $(targetPrefixNameInputObj).focus();

                    }
                }

                that.options.saveCallback(rowDatas, that.$element);
                $('#' + that.options.targetName).focus();
                modalContainer.modal('hide');
            }

            //region选择器时执行
            function _saveSelectRegionData() {
                var ids = '';
                var names = '';
                var prefixIds = '';
                for (var i in rowDatas) {
                    var rowData = rowDatas[i];
                    ids += rowData.id + ',';
                    names += rowData.name + ',';
                    prefixIds += rowData.prefixId + ',';
                }
                ids = ids.length > 0 ? ids.substring(0, ids.lastIndexOf(',')) : '';
                names = names.length > 0 ? names.substring(0, names.lastIndexOf(',')) : '';
                prefixIds = prefixIds.length > 0 ? prefixIds.substring(0, prefixIds.lastIndexOf(',')) : '';

                $(that).data('_orgIds', ids);
                $(that).data('_orgNames', names);
                $(that).data('_orgPrefixIds', prefixIds);

                if (that.options.targetId && $.trim(that.options.targetId) != '') {
                    var targetIdInputObj = $('#' + that.options.targetId);
                    if (targetIdInputObj.length > 0) {
                        targetIdInputObj.val(ids);
                        targetIdInputObj.attr('title', ids);
                        $(targetIdInputObj).focus();
                    }
                }

                if (that.options.targetName && $.trim(that.options.targetName) != '') {
                    var targetNameInputObj = $('#' + that.options.targetName);
                    if (targetNameInputObj.length > 0) {
                        targetNameInputObj.val(names);
                        targetNameInputObj.attr('title', names);
                        $(targetNameInputObj).focus();
                    }
                }

                if (that.options.targetPrefixId && $.trim(that.options.targetPrefixId) != '') {
                    var targetPrefixIdInputObj = $('#' + that.options.targetPrefixId);
                    if (targetPrefixIdInputObj.length > 0) {
                        targetPrefixIdInputObj.val(prefixIds);
                        targetPrefixIdInputObj.attr('title', prefixIds);
                        $(targetPrefixIdInputObj).focus();
                    }
                }
                that.options.saveCallback(rowDatas, that.$element);
                $('#' + that.options.targetName).focus();
                modalContainer.modal('hide');
            }

            //person选择器时执行
            function _saveSelectPersonData() {
                var userIds = '';
                var userNames = '';
                var _userIds = '';
                for(var i in rowDatas){
                    var rowData = rowDatas[i];
                    //删除不是用户的数据
                    if(rowData.type!=undefined&&rowData.type!='user'){
                        rowDatas.splice(i,1);
                        i--;
                        continue;
                    }
                }
                for (var i in rowDatas) {
                    var rowData = rowDatas[i];
                    userIds += rowData.userId + ',';
                    _userIds += rowData.id + ',';
                    userNames += rowData.name + ',';
                }
                userIds = userIds.length > 0 ? userIds.substring(0, userIds.lastIndexOf(',')) : '';
                _userIds = _userIds.length > 0 ? _userIds.substring(0, _userIds.lastIndexOf(',')) : '';
                userNames = userNames.length > 0 ? userNames.substring(0, userNames.lastIndexOf(',')) : '';

                $(that).data('_userIds', _userIds);
                $(that).data('_userNames', userNames);
                /*var _userIdsInputObj = $ele.siblings('input[name="_userIds"]')[0];
                 if(_userIdsInputObj){
                 $(_userIdsInputObj).val(userIds);
                 }else {
                 $('<input type="hidden" name="_userIds" value="'+userIds+'">').insertAfter($ele);
                 }
                 var _userNamesInputObj = $ele.siblings('input[name="_userNames"]')[0];
                 if(_userNamesInputObj){
                 $(_userNamesInputObj).val(userNames);
                 }else {
                 $('<input type="hidden" name="_userNames" value="'+userNames+'">').insertAfter($ele);
                 }*/


                if (that.options.targetId && $.trim(that.options.targetId) != '') {
                    var targetIdInputObj = $('#' + that.options.targetId);
                    if (targetIdInputObj.length > 0) {
                        targetIdInputObj.val(userIds);
                        targetIdInputObj.attr('title', userIds);
                        $(targetIdInputObj).focus();
                    }
                }

                if (that.options.targetName && $.trim(that.options.targetName) != '') {
                    var targetNameInputObj = $('#' + that.options.targetName);
                    if (targetNameInputObj.length > 0) {
                        targetNameInputObj.val(userNames);
                        targetNameInputObj.attr('title', userNames);
                        $(targetIdInputObj).focus();
                    }
                }

                that.options.saveCallback(rowDatas, that.$element);

                modalContainer.modal('hide');
            }

            //post选择器时执行
            function _saveSelectPostData() {
                var postIds = '';
                var postNames = '';
                var postCodes = '';
                for (var i in rowDatas) {
                    var rowData = rowDatas[i];
                    postIds += rowData.id + ',';
                    postNames += rowData.name + ',';
                    postCodes += rowData.code + ',';
                }

                postIds = postIds.length > 0 ? postIds.substring(0, postIds.lastIndexOf(',')) : '';
                postNames = postNames.length > 0 ? postNames.substring(0, postNames.lastIndexOf(',')) : '';
                postCodes = postCodes.length > 0 ? postCodes.substring(0, postCodes.lastIndexOf(',')) : '';

                if (that.options.targetId && $.trim(that.options.targetId) != '') {
                    var targetUserIdInput = $('#' + that.options.targetId);
                    if (targetUserIdInput.length > 0) {
                        targetUserIdInput.val(postIds);
                        $(targetUserIdInput).focus();
                    }
                }

                if (that.options.targetName && $.trim(that.options.targetName) != '') {
                    var targetUserNameInput = $('#' + that.options.targetName);
                    if (targetUserNameInput.length > 0) {
                        targetUserNameInput.val(postNames);
                        $(targetUserNameInput).focus();
                    }
                }

                if (that.options.targetCode && $.trim(that.options.targetCode) != '') {
                    var targetCodeInput = $('#' + that.options.targetCode);
                    if (targetCodeInput.length > 0) {
                        targetCodeInput.val(postCodes);
                        $(targetCodeInput).focus();
                    }
                }

                $(that).data('_postIds', postIds);
                $(that).data('_postNames', postNames);
                $(that).data('_postCodes', postCodes);

                /*var _roleIdsInputObj = $ele.siblings('input[name="_roleIds"]')[0];
                 if(_roleIdsInputObj){
                 $(_roleIdsInputObj).val(postIds);
                 }else {
                 $('<input type="hidden" name="_roleIds" value="'+postIds+'">').insertAfter($ele);
                 }

                 var _roleNamesInputObj = $ele.siblings('input[name="_postNames"]')[0];
                 if(_roleNamesInputObj){
                 $(_roleNamesInputObj).val(postNames);
                 }else {
                 $('<input type="hidden" name="_postNames" value="'+postNames+'">').insertAfter($ele);
                 }

                 var _roleCodesInputObj = $ele.siblings('input[name="_postCodes"]')[0];
                 if(_roleCodesInputObj){
                 $(_roleCodesInputObj).val(postCodes);
                 }else {
                 $('<input type="hidden" name="_postCodes" value="'+postCodes+'">').insertAfter($ele);
                 }*/

                that.options.saveCallback(rowDatas, that.$element);

                modalContainer.modal('hide');

            }

            //role选择器时执行
            function _saveSelectRoleData() {
                var roleIds = '';
                var roleNames = '';
                var roleCodes = '';
                for (var i in rowDatas) {
                    var rowData = rowDatas[i];
                    roleIds += rowData.id + ',';
                    roleNames += rowData.name + ',';
                    roleCodes += rowData.code + ',';
                }

                roleIds = roleIds.length > 0 ? roleIds.substring(0, roleIds.lastIndexOf(',')) : '';
                roleNames = roleNames.length > 0 ? roleNames.substring(0, roleNames.lastIndexOf(',')) : '';
                roleCodes = roleCodes.length > 0 ? roleCodes.substring(0, roleCodes.lastIndexOf(',')) : '';

                if (that.options.targetId && $.trim(that.options.targetId) != '') {
                    var targetUserIdInput = $('#' + that.options.targetId);
                    if (targetUserIdInput.length > 0) {
                        targetUserIdInput.val(roleIds);
                        $(targetUserIdInput).focus();
                    }
                }

                if (that.options.targetName && $.trim(that.options.targetName) != '') {
                    var targetUserNameInput = $('#' + that.options.targetName);
                    if (targetUserNameInput.length > 0) {
                        targetUserNameInput.val(roleNames);
                        $(targetUserNameInput).focus();
                    }
                }

                if (that.options.targetCode && $.trim(that.options.targetCode) != '') {
                    var targetCodeInput = $('#' + that.options.targetCode);
                    if (targetCodeInput.length > 0) {
                        targetCodeInput.val(roleCodes);
                        $(targetCodeInput).focus();
                    }
                }


                $(that).data('_roleIds', roleIds);
                $(that).data('_roleNames', roleNames);
                $(that).data('_roleCodes', roleCodes);
                /*var _roleIdsInputObj = $ele.siblings('input[name="_roleIds"]')[0];
                 if(_roleIdsInputObj){
                 $(_roleIdsInputObj).val(roleIds);
                 }else {
                 $('<input type="hidden" name="_roleIds" value="'+roleIds+'">').insertAfter($ele);
                 }

                 var _roleNamesInputObj = $ele.siblings('input[name="_roleNames"]')[0];
                 if(_roleNamesInputObj){
                 $(_roleNamesInputObj).val(roleNames);
                 }else {
                 $('<input type="hidden" name="_roleNames" value="'+roleNames+'">').insertAfter($ele);
                 }

                 var _roleCodesInputObj = $ele.siblings('input[name="_roleCodes"]')[0];
                 if(_roleCodesInputObj){
                 $(_roleCodesInputObj).val(roleCodes);
                 }else {
                 $('<input type="hidden" name="_roleCodes" value="'+roleCodes+'">').insertAfter($ele);
                 }*/

                that.options.saveCallback(rowDatas, that.$element);

                modalContainer.modal('hide');
            }

            switch (that.options.selectorType) {
                case 'org':
                    _saveSelectOrgData();
                    break;
                case 'region':
                    _saveSelectRegionData();
                    break;
                case 'person':
                    _saveSelectPersonData();
                    break;
                case 'post':
                    _saveSelectPostData();
                    break;
                case 'role':
                    _saveSelectRoleData();
                    break;
                default:
                    break;
            }

            gridObj.jqGrid('clearGridData');

        },
        _getTreeParentNodes: function (node, parentNodes) {
            var parentNode = node.getParentNode();
            if (parentNode != null && typeof parentNode != 'undefined') {
                this._getTreeParentNodes(parentNode, parentNodes);
                parentNodes.push(parentNode);
            }

        }

    };

    $.fn.extend({
        /**
         * 多选选择器初始化方法调用
         * @param options
         * @returns {*}
         */
        hrxljMultipleSelector: function (options) {
            if (!options) {
                return HrMultipleSelector;
            }
            var opts = options;
            return this.each(function (index, ele) {
                /*var eleId = $(ele).attr('data-id');
                 if(!eleId||eleId==''){
                 eleId = 'multipleEle_'+new Date().getTime();
                 $(ele).attr('data-id',eleId);
                 }*/
                var hrMultipleSelector = $(ele).data('_multilSelector');
                //var hrMultipleSelector = $(document.body).data(eleId);
                if (!hrMultipleSelector) {
                    hrMultipleSelector = new HrMultipleSelector(this, opts);
                    //$(document.body).data(eleId,hrMultipleSelector);
                    $(ele).data('_multilSelector', hrMultipleSelector);
                    hrMultipleSelector._init();
                    if (!opts.immediatelyShow) {
                        $(ele).on('click', function () {
                            hrMultipleSelector.modalContainer.modal({show: true, backdrop: 'static'});
                        });
                    }
                } else {
                    hrMultipleSelector.modalContainer.modal({show: true, backdrop: 'static'});
                }


                return hrMultipleSelector;
            });
        },

        /**
         * 多选选择器初始化工具类，使用js追加内容或ajax请求追加内容时调用此方法触发，
         * jquery selector为父元素
         */
        hrxljMultipleSelectorUtil: function () {
            var eles = $(this).find('.hr-multiple-selector');
            $.each(eles, function () {
                $(this).attr('readonly', 'readonly');

                var opts = {};
                var title = $(this).attr('data-title');
                if (title) {
                    opts.title = title;
                }
                var selectorType = $(this).attr('data-selectorType');
                if (selectorType) {
                    opts.selectorType = selectorType;
                }
                var gridTitle = $(this).attr('data-gridTitle');
                if (gridTitle) {
                    opts.gridTitle = gridTitle;
                }
                var treeUrl = $(this).attr('data-treeUrl');
                if (treeUrl && treeUrl != '') {
                    opts.treeUrl = treeUrl;
                }

                var treeParam = $(this).attr('data-treeParam');
                if (treeParam && treeParam != '') {
                    try {
                        opts.treeParam = JSON.parse(treeParam);
                    } catch (e) {
                        console.error(e);
                    }
                }
                var targetIdInput = $(this).attr('data-targetId');
                if (targetIdInput) {
                    opts.targetId = targetIdInput;
                }
                var targetNameInput = $(this).attr('data-targetName');
                if (targetNameInput) {
                    opts.targetName = targetNameInput;
                }
                var targetPrefixIdInput = $(this).attr('data-targetPrefixId');
                if (targetPrefixIdInput) {
                    opts.targetPrefixId = targetPrefixIdInput;
                }
                var targetPrefixNameInput = $(this).attr('data-targetPrefixName');
                if (targetPrefixNameInput) {
                    opts.targetPrefixName = targetPrefixNameInput;
                }

                var targetCode = $(this).attr('data-targetCode');
                if (targetCode) {
                    opts.targetCode = targetCode;
                }

                var saveCallback = $(this).attr('data-saveCallback');
                if (saveCallback && saveCallback != '') {
                    try {
                        if ($.isFunction(eval(saveCallback))) {
                            opts.saveCallback = eval(saveCallback);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
                if (!$(this).data('_multilSelector')) {
                    $(this).hrxljMultipleSelector(opts);
                }
            });

        },
        /**
         * 重置多选选择器
		 * 如果要再次触发字典选择组件的初始化，追加动态参数调用此方法
         * @param options
         */
        hrxljMultipleSelectorReset:function (options) {
            var opt = options;
            this.each(function(index,ele){
                var multilSelector = $(ele).data('_multilSelector');
                if(multilSelector){
                    multilSelector.modalContainer.remove();
                    multilSelector.zTreeObj = null;
                    if(opt){
                        multilSelector.options = opt;
                    }
                    multilSelector._init();
                }else{
                    $(ele).hrxljMultipleSelector(options);
                }

            });
        }


    });

})(jQuery, window, document);

$(function () {

    var eles = $('.hr-multiple-selector');
    $.each(eles, function () {
        $(this).attr('readonly', 'readonly');

        var opts = {};
        var title = $(this).attr('data-title');
        if (title && title != '') {
            opts.title = title;
        }
        var selectorType = $(this).attr('data-selectorType');
        if (selectorType && selectorType != '') {
            opts.selectorType = selectorType;
        }
        var gridTitle = $(this).attr('data-gridTitle');
        if (gridTitle && gridTitle != '') {
            opts.gridTitle = gridTitle;
        }
        var treeUrl = $(this).attr('data-treeUrl');
        if (treeUrl && treeUrl != '') {
            opts.treeUrl = treeUrl;
        }

        var treeParam = $(this).attr('data-treeParam');
        if (treeParam && treeParam != '') {
            try {
                opts.treeParam = eval('('+treeParam+')'); //JSON.parse(treeParam);
            } catch (e) {
                console.error(e);
            }
        }

        var targetIdInput = $(this).attr('data-targetId');
        if (targetIdInput) {
            opts.targetId = targetIdInput;
        }
        var targetNameInput = $(this).attr('data-targetName');
        if (targetNameInput && targetNameInput != '') {
            opts.targetName = targetNameInput;
        }
        var targetPrefixIdInput = $(this).attr('data-targetPrefixId');
        if (targetPrefixIdInput && targetPrefixIdInput != '') {
            opts.targetPrefixId = targetPrefixIdInput;
        }
        var targetPrefixNameInput = $(this).attr('data-targetPrefixName');
        if (targetPrefixNameInput && targetPrefixNameInput != '') {
            opts.targetPrefixName = targetPrefixNameInput;
        }
        var targetCode = $(this).attr('data-targetCode');
        if (targetCode && targetCode != '') {
            opts.targetCode = targetCode;
        }

        var saveCallback = $(this).attr('data-saveCallback');
        if (saveCallback && saveCallback != '') {
            try {
                if ($.isFunction(eval(saveCallback))) {
                    opts.saveCallback = eval(saveCallback);
                }
            } catch (e) {
                console.error(e);
            }
        }
        $(this).hrxljMultipleSelector(opts);
    });
});
