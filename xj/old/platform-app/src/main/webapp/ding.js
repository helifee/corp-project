/**
 * erp_cloud_platform ding Created by dingguanghuai on 2017/3/31.
 * @author dingguanghuai
 * @date 2017/3/31
 */

(function ($, window, document, undefined) {
    var OrgOrPersonSelector = function (ele, opts) {
        this.$element = ele;
        this.defaults = {
            title:'',//选择器标题，默认是'选择组织机构'
            selectorType:'org',//选择器类型，默认是组织机构选择器
            gridTitle:'',//列表标题，默认是'组织列表'
            targetIdInput:null,//选择的数据的ID存储input域
            targetNameInput:null,//选择的数据的Name存储input域
            targetPrefixIdInput:null,//选择的数据的PrefixId存储input域
            targetPrefixNameInput:null,//选择的数据的PrefixName存储input域
            targetUserIdInput:null,//选择的数据的用户id存储input域
            targetUserNameInput:null,//选择的数据的用户名称存储input域
            /**
             * 保存回调函数
             * @param selectDatas 已选择的数据json对象
             */
            saveCallback:function (selectDatas) {}
        };
        this.options = $.extend({},this.defaults, opts);
    };

    OrgOrPersonSelector.prototype = {
        _init:function () {
            var $ele = $(this.$element);
            //modal最外层div
            var modalContainer = this._createModalContainer();
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
            var orgTreeHeader = this._createOrgTreeHeader();
            bodyLeftContainer.append(orgTreeHeader);
            //org tree容器div
            var orgTreeContainer = this._createOrgTreeContainer();
            bodyLeftContainer.append(orgTreeContainer);
            //org tree的ul
            var orgTree = this._createOrgTree();
            orgTree.attr('id','_orgTree'+new Date().getTime());
            orgTreeContainer.append(orgTree);

            //modal body 右侧div
            var bodyRightContainer = this._createBodyRightContainer();
            modalBodyContainer.append(bodyRightContainer);
            //orgGrid头部 div
            var orgGridHeader = this._createOrgGridHeader();
            bodyRightContainer.append(orgGridHeader);
            //orgGrid容器div
            var orgGridContainer = this._createOrgGridContainer();
            bodyRightContainer.append(orgGridContainer);

            //orgGrid 的table
            var orgGrid = this._createOrgGrid();
            orgGrid.attr('id','_orgGridList'+new Date().getTime());
            orgGridContainer.append(orgGrid);

            //选择器类型
            var _selectorType = this.options.selectorType;

            //设置选择器标题
            var modalTitle = modalHeaderContainer.find('.modal-title');
            if(_selectorType=='org'){
                modalTitle.text(this.options.title!=''?this.options.title:'选择组织机构');
            }else if(_selectorType=='person'){
                modalTitle.text(this.options.title!=''?this.options.title:'选择人员');
            }

            //设置列表标题
            var gridTitle = orgGridHeader.find('span');
            if(_selectorType=='org') {
                gridTitle.text(this.options.gridTitle!=''?this.options.gridTitle:'组织列表');
            }else if(_selectorType=='person') {
                gridTitle.text(this.options.gridTitle!=''?this.options.gridTitle:'人员列表');
            }

            //取消按钮点击事件
            var cancleBtn = modalHeaderContainer.find('.modal-cancel');
            cancleBtn.on('click',function () {
                orgGrid.jqGrid('clearGridData');
                modalContainer.modal('hide');
            });

            //保存按钮
            var saveBtn = modalHeaderContainer.find('.modal-save');
            var that = this;
            //保存按钮点击事件
            saveBtn.on('click',function () {
                that._saveOrgSelectDatas(orgGrid,$ele,modalContainer);
            });


            //初始化orgTree
            this._initOrgTree(orgTree,orgGrid);
            
            if(_selectorType=='org'){
                //初始化orgGrid
                this._initOrgGridList(orgGrid);
            }else if(_selectorType=='person'){
                this._initPersonGrid(orgGrid);
            }

            //初始化容器大小和数据
            this._initSizeAndData(orgTreeContainer,orgGridContainer,modalContainer,orgGrid,orgTree);

            this._searchTreeInputEvent($(orgTreeHeader.find('input')[0]),orgTree);
            this._searchTreeBtnEvent($(orgTreeHeader.find('button')[0]),orgTree);

            $ele.on('click',function () {
                modalContainer.modal({show:true,backdrop:'static'});
            });

            $(document.body).append(modalContainer);



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
                '   <button type="button" class="btn btn-sm blue pull-right mr20 modal-save">保存</button>' +
                '</div>');
            return modalHeaderContainer;
        },
        _createModalBodyContainer:function () {
            var modalBodyContainer = $('<div class="modal-body clearfix"></div>');
            return modalBodyContainer;
        },
        _createBodyLeftContainer:function () {
            var bodyLeftContainer = $('<div class="col-md-3 addBorder rm-pad" ></div>');
            return bodyLeftContainer;
        },
        _createOrgTreeHeader:function () {
            var orgTreeHeader = $('<div class="modal_title">'+
                '   <i class="fa fa-sitemap" aria-hidden="true"></i>'+
                '   <span>组织机构</span>'+
                '   <input type="text" class="form-control" placeholder="输入关键词..." id="_searchOrgTreeInput">'+
                '   <button type="button" class="btn btn-sm btnMsearch rm-pad" id="_searchOrgTreeBtn">'+
                '       <i class="fa fa-search" aria-hidden="true"></i>'+
                '   </button>'+
                '</div>');
            return orgTreeHeader;
        },
        _createOrgTreeContainer:function () {
            var orgTreeContainer = $('<div class="treeConent selector-model-tree" id="_orgTreeContainer"></div>');
            return orgTreeContainer;
        },
        _createOrgTree:function () {
            var orgTree = $('<ul class="ztree"></ul>');
            return orgTree;
        },
        _createBodyRightContainer:function () {
            var bodyRightContainer = $('<div class="col-md-9 addBorder pull-right changeWidth rm-pad" ></div>');
            return bodyRightContainer;
        },
        _createOrgGridHeader:function () {
            var orgGridHeader = $('<div class="modal_title">' +
                '   <i class="fa fa-list" aria-hidden="true"></i>' +
                '   <span>组织列表</span>' +
                '</div>');
            return orgGridHeader;
        },
        _createOrgGridContainer:function () {
            var orgGridContainer = $('<div id="_orgGridContainer"></div>');
            return orgGridContainer;
        },
        _createOrgGrid:function () {
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
        _initSizeAndData: function (orgTreeContainer,orgGridContainer,orgGridModal,orgGridObj,orgTreeObj) {
            var that = this;
            orgTreeContainer.css({
                height:'430px',
                overflow:'auto'
            });

            orgGridContainer.css({
                height:'430px',
                overflow:'hidden'
            });

            orgGridModal.on('hidden.bs.modal',function () {
                $(".selector-model-tree").getNiceScroll().hide();
                $('.ui-jqgrid-bdiv').getNiceScroll().hide();
            });

            orgGridModal.on('shown.bs.modal',function () {
                orgGridModal.find('div.ui-jqgrid-view').css({'padding-top':'8px'});
                orgGridObj.jqGrid().setGridHeight(orgGridContainer.height()-40);
                orgGridObj.jqGrid().setGridWidth(orgGridContainer.width()-2);

                $.xljUtils.addTreeScroll('selector-model-tree');
                $.xljUtils.addGridScroll();
                $(".selector-model-tree").getNiceScroll().show().resize();
                $('.ui-jqgrid-bdiv').getNiceScroll().show().resize();

                var $ele = $(that.$element);
                var ids = '';
                var names = '';
                var prefixIds = '';
                var prefixNames = '';

                var userIds = '';
                var userNames = '';

                if(that.defaults.selectorType=='org'){
                    if(that.options.targetIdInput&&$.trim(that.options.targetIdInput)!=''){
                        var targetIdInputObj = $('#'+that.options.targetIdInput);
                        if(targetIdInputObj.length>0){
                            ids = targetIdInputObj.val();
                        }
                    }

                    if(that.options.targetNameInput&&$.trim(that.options.targetNameInput)!=''){
                        var targetNameInputObj = $('#'+that.options.targetNameInput);
                        if(targetNameInputObj.length>0){
                            names = targetNameInputObj.val();
                        }
                    }

                    if(that.options.targetPrefixIdInput&&$.trim(that.options.targetPrefixIdInput)!=''){
                        var targetPrefixIdInputObj = $('#'+this.options.targetPrefixIdInput);
                        if(targetPrefixIdInputObj.length>0){
                            targetPrefixIdInputObj.val(prefixIds);
                        }
                    }

                    if(that.options.targetPrefixNameInput&&$.trim(that.options.targetPrefixNameInput)!=''){
                        var targetPrefixNameInputObj = $('#'+that.options.targetPrefixNameInput);
                        if(targetPrefixNameInputObj.length>0){
                            prefixNames = targetPrefixNameInputObj.val();
                        }
                    }

                    var _orgIdsInputObj = $ele.siblings('input[name="_orgIds"]')[0];
                    if(_orgIdsInputObj){
                        ids = $(_orgIdsInputObj).val();
                    }else {
                        $('<input type="hidden" name="_orgIds" value="'+ids+'">').insertAfter($ele);
                    }
                    var _orgNamesInputObj = $ele.siblings('input[name="_orgNames"]')[0];
                    if(_orgNamesInputObj){
                        names = $(_orgNamesInputObj).val();
                    }else {
                        $('<input type="hidden" name="_orgNames" value="'+names+'">').insertAfter($ele);
                    }
                    var _orgPrefixNamesInputObj = $ele.siblings('input[name="_orgPrefixNames"]')[0];
                    if(_orgPrefixNamesInputObj){
                        prefixNames = $(_orgPrefixNamesInputObj).val();
                    }else {
                        $('<input type="hidden" name="_orgPrefixNames" value="'+prefixNames+'">').insertAfter($ele);
                    }
                    var _orgPrefixIdsInputObj = $ele.siblings('input[name="_orgPrefixIds"]')[0];
                    if(_orgPrefixIdsInputObj){
                        prefixIds = $(_orgPrefixIdsInputObj).val();
                    }else {
                        $('<input type="hidden" name="_orgPrefixIds" value="'+prefixIds+'">').insertAfter($ele);
                    }

                    var _orgInputObj = $ele.siblings('input[name="_orgIds"]')[0];
                    if(_orgInputObj&&that.options.selectorType=='org') {
                        var orgIds = _orgInputObj.value;
                        if(orgIds!=''){
                            var orgIdArr = orgIds.split(',');
                            var zTreeObj =  $.fn.zTree.getZTreeObj(orgTreeObj.attr('id'));
                            for(var i in orgIdArr){
                                var treeNode = zTreeObj.getNodesByParam('id',orgIdArr[i],null);
                                if(treeNode&&treeNode[0]){
                                    that._addDataToGrid(orgGridObj,treeNode[0]);
                                }
                            }
                        }

                    }
                }else if(that.defaults.selectorType=='person'){
                    if(that.options.targetUserIdInput&&$.trim(that.options.targetUserIdInput)!=''){
                        var targetUserIdInput = $('#'+that.options.targetUserIdInput);
                        if(targetUserIdInput.length>0){
                            ids = targetUserIdInput.val();
                        }
                    }

                    if(that.options.targetUserNameInput&&$.trim(that.options.targetUserNameInput)!=''){
                        var targetUserNameInput = $('#'+that.options.targetUserNameInput);
                        if(targetUserNameInput.length>0){
                            ids = targetUserNameInput.val();
                        }
                    }

                    var _userIdsInputObj = $ele.siblings('input[name="_userIds"]')[0];
                    if(_userIdsInputObj){
                        userIds = $(_userIdsInputObj).val();
                    }else {
                        $('<input type="hidden" name="_userIds" value="'+userIds+'">').insertAfter($ele);
                    }

                    var _userNamesInputObj = $ele.siblings('input[name="_userNames"]')[0];
                    if(_userNamesInputObj){
                        userNames = $(_userNamesInputObj).val();
                    }else {
                        $('<input type="hidden" name="_userNames" value="'+userNames+'">').insertAfter($ele);
                    }

                    var _userInputObj = $ele.siblings('input[name="_userIds"]')[0];
                    if(_userInputObj) {
                        var userIds = _userInputObj.value;
                        if(userIds!=''){
                            var userIdArr = userIds.split(',');
                            var zTreeObj =  $.fn.zTree.getZTreeObj(orgTreeObj.attr('id'));
                            for(var i in userIdArr){
                                var treeNode = zTreeObj.getNodesByParam('id',userIdArr[i],null);
                                if(treeNode&&treeNode[0]){
                                    that._addDataToGrid(orgGridObj,treeNode[0]);
                                }
                            }
                        }

                    }
                }
            });
        },

        /**
         * 向grid中动态添加数据
         * @private
         */
        _addDataToGrid:function (orgGridObj,treeNode) {
            var _selectorType = this.options.selectorType;
            if(_selectorType=='org'){
                var rowData = orgGridObj.jqGrid('getRowData', treeNode.id);
                if(rowData&&!rowData.id){
                    var data = {
                        id:treeNode.id,
                        name:treeNode.name,
                        type:treeNode.type,
                        prefixName:treeNode.prefixName,
                        status:treeNode.status,
                        sort:treeNode.sort,
                        rootId:treeNode.rootId,
                        prefixId:treeNode.prefixId
                    };
                    orgGridObj.jqGrid('addRowData', treeNode.id, data);
                }
            }else if(_selectorType=='person'){
                if(treeNode.type=="user"){
                    var rowData = orgGridObj.jqGrid('getRowData', treeNode.id);
                    if(rowData&&!rowData.id){
                        var cacheUser = orgGridObj.data('selectedUser');
                        if(!cacheUser){
                            cacheUser = {};
                        }
                        var selectedUser = cacheUser[treeNode.id];
                        if(!selectedUser){
                            $.ajax({
                                type:'GET',
                                url:baseUrl+'sys/org/user/get/'+treeNode.id,
                                dataType:'json',
                                success: function(json) {
                                    var result = json.result;
                                    var data = {
                                        id:result.id,
                                        realName:result.realName,
                                        loginName:result.loginName,
                                        belongOrgId:result.belongOrgId,
                                        prefixName:result.prefixName,
                                        type:result.type,
                                        createDate:result.createDate,
                                        status:result.status
                                    };

                                    cacheUser[result.id] = data;
                                    //选中人员缓存至当前grid对象中
                                    orgGridObj.data('selectedUser',cacheUser);
                                    orgGridObj.jqGrid('addRowData', treeNode.id, data);
                                }
                            });
                        }else{
                            var data = {
                                id:selectedUser.id,
                                realName:selectedUser.realName,
                                loginName:selectedUser.loginName,
                                belongOrgId:selectedUser.belongOrgId,
                                prefixName:selectedUser.prefixName,
                                type:selectedUser.type,
                                createDate:selectedUser.createDate,
                                status:selectedUser.status
                            };
                            orgGridObj.jqGrid('addRowData', selectedUser.id, data);
                        }

                    }
                }

            }


        },
        /**
         *
         * 初始化组织结构树
         * @param treeId 组织机构树的id
         * @param orgGridObj jqGrid的jq对象
         */
        _initOrgTree: function(treeObj,orgGridObj) {
            var that = this;
            var url = baseUrl+'sys/org/root/getTree';
            if(this.options.selectorType=='person'){
                url = baseUrl+'sys/org/user/getUserTree';
            }
            $.ajax({
                type:'POST',
                url:url,
                dataType:'json',
                contentType:'application/json',
                data:'{}',
                success: function(json) {
                    //返回的数据节点
                    var zNodes = json.result;
                    //设置图片样式
                    that._recursionArray(zNodes);
                    var zTreeObj = $.fn.zTree.init(treeObj, {
                        view: {
                            fontCss: that._getFontCss,
                            dblClickExpand: false
                        },
                        callback: {
                            onDblClick:function (event, treeId, treeNode) {

                                that._addDataToGrid(orgGridObj,treeNode);
                            }

                        }
                    }, zNodes);
                    var nodes = zTreeObj.getNodes();
                    //默认展开第一个节点
                    zTreeObj.expandNode(nodes[0], true, false, false,false);
                }
            });
        },
        /**
         * 递归设置树的图片样式
         */
        _recursionArray: function(arr) {
            var that = this;
            //所属的分类 diy-group 目录 diy-company 集团和公司;diy-program 项目和分期;diy-department 部门;
            for(var i in arr) {
                if(arr[i].type == "zb" || arr[i].type == "company") {
                    arr[i].iconSkin = "diy-company";
                    if(arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "dept" ) {
                    arr[i].iconSkin = "diy-department";
                    if(arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "group" ) {
                    arr[i].iconSkin = "diy-program";
                    if(arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "branch" ) {
                    arr[i].iconSkin = "diy-program";
                    if(arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "cata" ) {
                    arr[i].iconSkin = "diy-group";
                    if(arr[i].children.length > 0) {
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
        _searchOrgTree: function(keyName,value,isHighlight,treeObj) {
            var ztreeObj = $.fn.zTree.getZTreeObj(treeObj.attr('id'));
            var nodes = ztreeObj.getNodesByParamFuzzy(keyName, value, null);
            $.each(nodes,function (i,node) {
                //zTree.setting.view.fontCss = {};
                if(isHighlight){
                    node.highlight = 'true';
                }else{
                    node.highlight = 'false';
                }

                ztreeObj.updateNode(node);
                ztreeObj.expandNode(node.getParentNode(), true, false, false);
            });
        },
        /**
         * 个性化文字样式，只针对 zTree 在节点上显示的对象
         * @param treeId
         * @param treeNode
         * @returns
         */
        _getFontCss: function(treeId, treeNode) {
            return (treeNode.highlight&&treeNode.highlight=='true') ?
            {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
            {color:"#333", "font-weight":"normal",'font-style':'normal'} | (treeNode.status&&treeNode.status=='0') ?
            {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
            {color:"#333", "font-weight":"normal",'font-style':'normal'};
        },
        /**
         * 搜索框keyup\blur事件
         * @param searchInputObj 搜索框input的jq对象
         */
        _searchTreeInputEvent: function(searchInputObj,treeObj){
            var that = this;
            searchInputObj.bind('keyup',function (event) {
                that._searchOrgTree('highlight','true',false,treeObj);
                if(event.keyCode==13||event.keyCode==32){
                    var inputVal = $(this).val();
                    that._searchOrgTree('name',$.trim(inputVal),true,treeObj);
                }
            }).bind('blur',function (event) {
                var value = $(this).val();
                if(value=='') {
                    that._searchOrgTree('highlight','true',false,treeObj);
                }

            });
        },
        /**
         * 搜索按钮点击事件
         * @param searchBtnObj 搜索按钮jq对象
         * @param searchInputObj 搜索框input的jq对象
         */
        _searchTreeBtnEvent: function(searchBtnObj,searchInputObj,treeObj) {
            var that = this;
            searchBtnObj.on('click',function () {
                that._searchOrgTree('highlight','true',false,treeObj);
                var inputVal = searchInputObj.val();
                if($.trim(inputVal)!=''){
                    that._searchOrgTree('name',inputVal,true,treeObj);
                }

            });
        },
        /**
         * 初始化组织机构列表
         * @param orgGridListObj 组织机构列表jq对象
         */
        _initOrgGridList: function (orgGridListObj) {
            orgGridListObj.jqGrid({
                datatype : "local",//请求数据返回的类型。可选json,xml,txt
                colNames : [ 'ID', '名称', '类型', '全路径', '状态','排序号', '根目录ID', 'ID全路径', '父级组织ID'   ],//jqGrid的列显示名字
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',index : 'id',width : 55,hidden:true},

                    {name : 'name',index : 'name',width : 90},
                    {name : 'type',index : 'type',width : 100},
                    {name : 'prefixName',index : 'prefixName',width : 80},
                    {name : 'status',index : 'status',width : 80},

                    {name : 'sort',index : 'sort',width : 80,hidden:true},
                    {name : 'rootId',index : 'rootId',width : 80,hidden:true},
                    {name : 'prefixId',index : 'prefixId',width : 80,hidden:true},
                    {name : 'parentId',index : 'parentId',width : 150,hidden:true}
                ],
                autoWidth:true,
                rownumbers: true,
                rowNum : -1,//一页显示多少条
                sortorder : "desc",//排序方式,可选desc,asc
                ondblClickRow:function (rowid,iRow,iCol,e) {
                    orgGridListObj.jqGrid('delRowData',rowid);
                }
            });
        },
        /**
         *
         * @param orgGrid 列表grid的jq对象
         * @param $ele 选择器绑定对象
         * @param modalContainer 模态框jq对象
         * @private
         */
        _saveOrgSelectDatas:function (orgGrid,$ele,modalContainer) {
            var rowDatas = orgGrid.jqGrid('getRowData');
            var that = this;
            if(rowDatas&&rowDatas.length==0){
                $.xljUtils.confirm('blue','当前无选择数据，确定要保存么？',function () {
                    $_saveSelectData();
                },function () {

                });
                return;
            }

            //org选择器时执行
            function $_saveSelectData() {
                var ids = '';
                var names = '';
                var prefixNames = '';
                var prefixIds = '';
                for(var i in rowDatas){
                    var rowData = rowDatas[i];
                    ids += rowData.id + ',';
                    names += rowData.name + ',';
                    prefixNames += rowData.prefixName + ',';
                    prefixIds += rowData.prefixId + ',';
                }
                ids = ids.length>0?ids.substring(0,ids.lastIndexOf(',')):'';
                names = names.length>0?names.substring(0,names.lastIndexOf(',')):'';
                prefixNames = prefixNames.length>0?prefixNames.substring(0,prefixNames.lastIndexOf(',')):'';
                prefixIds = prefixIds.length>0?prefixIds.substring(0,prefixIds.lastIndexOf(',')):'';

                var _orgIdsInputObj = $ele.siblings('input[name="_orgIds"]')[0];
                if(_orgIdsInputObj){
                    $(_orgIdsInputObj).val(ids);
                }else {
                    $('<input type="hidden" name="_orgIds" value="'+ids+'">').insertAfter($ele);
                }
                var _orgNamesInputObj = $ele.siblings('input[name="_orgNames"]')[0];
                if(_orgNamesInputObj){
                    $(_orgNamesInputObj).val(names);
                }else {
                    $('<input type="hidden" name="_orgNames" value="'+names+'">').insertAfter($ele);
                }
                var _orgPrefixNamesInputObj = $ele.siblings('input[name="_orgPrefixNames"]')[0];
                if(_orgPrefixNamesInputObj){
                    $(_orgPrefixNamesInputObj).val(prefixNames);
                }else {
                    $('<input type="hidden" name="_orgPrefixNames" value="'+prefixNames+'">').insertAfter($ele);
                }
                var _orgPrefixIdsInputObj = $ele.siblings('input[name="_orgPrefixIds"]')[0];
                if(_orgPrefixIdsInputObj){
                    $(_orgPrefixIdsInputObj).val(prefixIds);
                }else {
                    $('<input type="hidden" name="_orgPrefixIds" value="'+prefixIds+'">').insertAfter($ele);
                }

                if(that.options.targetIdInput&&$.trim(that.options.targetIdInput)!=''){
                    var targetIdInputObj = $('#'+that.options.targetIdInput);
                    if(targetIdInputObj.length>0){
                        targetIdInputObj.val(ids);
                    }
                }

                if(that.options.targetNameInput&&$.trim(that.options.targetNameInput)!=''){
                    var targetNameInputObj = $('#'+that.options.targetNameInput);
                    if(targetNameInputObj.length>0){
                        targetNameInputObj.val(names);
                    }
                }

                if(that.options.targetPrefixIdInput&&$.trim(that.options.targetPrefixIdInput)!=''){
                    var targetPrefixIdInputObj = $('#'+that.options.targetPrefixIdInput);
                    if(targetPrefixIdInputObj.length>0){
                        targetPrefixIdInputObj.val(prefixIds);
                    }
                }

                if(that.options.targetPrefixNameInput&&$.trim(that.options.targetPrefixNameInput)!=''){
                    var targetPrefixNameInputObj = $('#'+that.options.targetPrefixNameInput);
                    if(targetPrefixNameInputObj.length>0){
                        targetPrefixNameInputObj.val(prefixNames);
                    }
                }

                that.options.saveCallback(rowDatas);

                modalContainer.modal('hide');
            }

            //person选择器时执行
            function $_saveSelectPersonData() {
                var userIds = '';
                var userNames = '';
                for(var i in rowDatas){
                    var rowData = rowDatas[i];
                    userIds += rowData.id + ',';
                    userNames += rowData.realName + ',';
                }
                userIds = userIds.length>0?userIds.substring(0,userIds.lastIndexOf(',')):'';
                userNames = userNames.length>0?userNames.substring(0,userNames.lastIndexOf(',')):'';

                var _userIdsInputObj = $ele.siblings('input[name="_userIds"]')[0];
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
                }


                if(that.options.targetUserIdInput&&$.trim(that.options.targetUserNameInput)!=''){
                    var targetIdInputObj = $('#'+that.options.targetIdInput);
                    if(targetIdInputObj.length>0){
                        targetIdInputObj.val(userIds);
                    }
                }

                that.options.saveCallback(rowDatas);

                modalContainer.modal('hide');
            }
            if(that.options.selectorType=='org'){
                $_saveSelectData();
            }else if(that.options.selectorType=='person'){
                $_saveSelectPersonData();
            }


        },

        _initPersonGrid:function (personGridObj) {

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
                if(rowObject.status == "0" ){
                    return "style='color:red'";
                }
            }

            /**
             * 用户类型数据格式化
             * @param cellvalue
             * @param options
             * @param rowObject
             * @returns {String}
             */
            function jqGridPostUserTypeFmatter (cellvalue, options, rowObject) {
                if(cellvalue == "1"){
                    return "普通用户";
                }else if(cellvalue == "2"){
                    return "管理员";
                }else if(cellvalue == "3"){
                    return "超级管理员";
                }else if(cellvalue == "0"){
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
            function statusFmatter (cellvalue, options, rowObject) {
                if(cellvalue == "1"){
                    return "启用";
                }else if(cellvalue == "0"){
                    return "禁用";
                }
            }

            personGridObj.jqGrid({
                /*url: baseUrl+'sys/org/user/queryUserListByOrgId',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",
                contentType : "application/json",
                postData:{"orgId":"","includelow":"0"},
                datatype : "json",
                jsonReader : {
                    root:"result"
                },*/
                datatype : "local",
                colNames : [ '序号', '用户名', '账号', '所属机构ID', '所属机构','用户类型', '创建时间','状态', '禁用时间', '排序号'   ],//jqGrid的列显示名字
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                    {name : 'realName',label : '用户名',width : 90,align : "center",cellattr: addCellAttr},
                    {name : 'loginName',label : '账号',width : 90,align : "center"},
                    {name : 'belongOrgId',label : '所属机构ID',width : 164,align : "center",hidden : true},
                    {name : 'prefixName',label : '所属机构',width : 120,align : "center"},
                    {name : 'type',label : '用户类型',width : 90,align : "center",formatter:jqGridPostUserTypeFmatter},
                    {name : 'createDate',label : '创建时间',width : 120,align : "center"},
                    {name : 'status',label : '状态',width : 90,align : "center",formatter:statusFmatter,cellattr: addCellAttr},
                    {name : 'disableTime',label : '禁用时间',width : 134,align : "center"},
                    {name : 'sort',label : '排序号',width : 60,align : "center"}
                ],
                rownumbers: true,
                autoWidth:true,
                rowNum : -1,//一页显示多少条 -1全部
                sortname : 'id',//初始化的时候排序的字段
                sortorder : "desc",//排序方式,可选desc,asc
                ondblClickRow:function (rowid,iRow,iCol,e) {
                    personGridObj.jqGrid('delRowData',rowid);
                }
            });
        }

    };

    $.fn.extend({
        orgOrPersonSelector:function (options) {
            var opts = options;
            return this.each(function (index,ele) {
                var orgOrPersonSelector = new OrgOrPersonSelector(this,opts);
                orgOrPersonSelector._init();
                return orgOrPersonSelector;
            });


        }
    });

})(jQuery, window, document);

$(function () {
    var eles = $('.orgAndPersonSelector');
    $.each(eles,function () {
        $(this).attr('readonly','readonly');
        var opts = {};
        var title = $(this).attr('data-title');
        if(title){
            opts.title = title;
        }
        var selectorType = $(this).attr('data-selectorType');
        if(selectorType){
            opts.selectorType = selectorType;
        }
        var gridTitle = $(this).attr('data-gridTitle');
        if(gridTitle){
            opts.gridTitle = gridTitle;
        }
        var targetIdInput = $(this).attr('data-targetIdInput');
        if(targetIdInput){
            opts.targetIdInput = targetIdInput;
        }
        var targetNameInput = $(this).attr('data-targetNameInput');
        if(targetNameInput){
            opts.targetNameInput = targetNameInput;
        }
        var targetPrefixIdInput = $(this).attr('data-targetPrefixIdInput');
        if(targetPrefixIdInput){
            opts.targetPrefixIdInput = targetPrefixIdInput;
        }
        var targetPrefixNameInput = $(this).attr('data-targetPrefixNameInput');
        if(targetPrefixNameInput){
            opts.targetPrefixNameInput = targetPrefixNameInput;
        }
        var targetUserIdInput = $(this).attr('data-targetUserIdInput');
        if(targetUserIdInput){
            opts.targetUserIdInput = targetUserIdInput;
        }
        var targetUserNameInput = $(this).attr('data-targetUserNameInput');
        if(targetUserNameInput){
            opts.targetUserNameInput = targetUserNameInput;
        }
        var saveCallback = $(this).attr('data-saveCallback');
        if(saveCallback){
            opts.saveCallback = saveCallback;
        }
        $(this).orgOrPersonSelector(opts);
    });
});
