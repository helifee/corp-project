/**
 * erp_cloud_platform xljSingleSelector Created by dingguanghuai on 2017/4/2.
 * @author dingguanghuai
 * @date 2017/4/2
 */
;;(function ($,window,document,undefined) {
    var SingleSelector = function (ele, opts) {
        this.$element = ele;
        this.defaults = {
            title:'',//选择器标题，默认是'选择组织机构'
            selectorType:'org',//选择器类型，默认是组织机构选择器
            immediatelyShow:false,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
            treeUrl:null,
            treeParam:null,//生成zTree树的参数
            targetId:null,//选择的数据的ID存储input域
            targetName:null,//选择的数据的Name存储input域
            ajaxType: 'POST',	//ajax的type 默认为post
            selectNodeType:{},//JSON格式,可选节点,其中msg为固定key，显示选择错误提示之用
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
             * @param selectDatas 已选择的数据json对象
             * @param ele 绑定选择器的对象
             */
            saveCallback:function (selectData,ele) {},
            //打开事件
            onShowModalEvent:function () {},
            //关闭事件
            onHideModalEvent:function () {},
            formatTreeJson:function(data){return data;},
            treeSettings:{}
        };
        this.options = $.extend({},this.defaults, opts);
    };

    SingleSelector.prototype = {
        modalContainer:null,
        zTreeObj:null,
        _init:function () {
            var $ele = $(this.$element);
            $ele.css({cursor:'pointer'});
            /*if(this.modalContainer!=null){
                this.modalContainer.modal('show');
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
            //树容器div
            var treeContainer = this._createTreeContainer();
            modalBodyContainer.append(treeContainer);
            //树对象div
            var tree = this._createTree();
            tree.attr('id','_singleTree'+new Date().getTime());
            treeContainer.append(tree);

            if(this.options.title==''){
                this.options.title='组织机构';
            }

            modalHeaderContainer.find('h6.modal-title span').text(this.options.title);
            if(!this.options.treeParam){
                this.options.treeParam = {};
            }
            var that = this;

            modalContainer.on('show.bs.modal',function () {
                if(that.zTreeObj){
                    return;
                }
                switch (that.options.selectorType){
                    case 'org':
                        var url = serviceUrl + 'sys/org/root/getTree';
                        if(that.options.treeUrl){
                            url = that.options.treeUrl;
                        }
                        that.options.treeParam.rootDelFlag = false;
                        that.options.treeParam.orgDelFlag = false;
                        that.options.treeParam.delflag = false;
                        that._initTree(tree,url,that.options.treeParam,modalContainer);
                        break;
                    case 'person':
                        var url = serviceUrl+'sys/org/user/getUserTree';
                        //var url = serviceUrl + 'sys/org/roleUser/selectUserPostTree';
                        if(that.options.treeUrl){
                            url = that.options.treeUrl;
                        }

                        that.options.treeParam.rootDelFlag = false;
                        if(typeof that.options.treeParam.rootStatus == 'undefined'){
                            that.options.treeParam.rootStatus = true;
                        }else{
                            delete that.options.treeParam.rootStatus;
                        }
                        if(typeof that.options.treeParam.orgStatus == 'undefined'){
                            that.options.treeParam.orgStatus = true;
                        }else{
                            delete that.options.treeParam.orgStatus;
                        }
                        that.options.treeParam.orgDelFlag = false;
                        that.options.treeParam.delflag = false;

                        that.options.treeParam.userDelFlag = false;
                        if(typeof that.options.treeParam.userStatus == 'undefined'){
                            that.options.treeParam.userStatus = true;
                        }else{
                            delete that.options.treeParam.userStatus;
                        }
                        var treeSettings = that.options.treeSettings;
                        treeSettings.data = {
                            simpleData: {
                                enable: true
                            }
                        };

                        that._initTree(tree,url,that.options.treeParam,modalContainer);
                        break;
                    case 'post':
                        var url = serviceUrl+'sys/org/post/getPostTree';
                        if(that.options.treeUrl){
                            url = that.options.treeUrl;
                        }
                        that.options.treeParam.rootDelFlag = false;
                        that.options.treeParam.orgDelFlag = false;
                        that.options.treeParam.postDelFlag = false;
                        that._initTree(tree,url,that.options.treeParam,modalContainer);
                        break;
                    case 'role':
                        var url = serviceUrl+'sys/org/roleCatalog/getRoleTree';
                        if(that.options.treeUrl){
                            url = that.options.treeUrl;
                        }
                        that.options.treeParam.delflag = false;
                        that._initTree(tree,url,that.options.treeParam,modalContainer);
                        break;
                    case 'menu':
                        var url = serviceUrl+'sys/res/resource/getResourceTreeAll';
                        if(that.options.treeUrl){
                            url = that.options.treeUrl;
                        }
                        that.options.treeParam.appDelFlag = false;
                        that.options.treeParam.menuDelFlag = false;
                        that.options.treeParam.delflag = false;
                        that._initTree(tree,url,that.options.treeParam,modalContainer);
                        break;
                    case 'userMenu':
                        var url = serviceUrl+'sys/res/resource/getResourceTreeAllByUser';
                        if(that.options.treeUrl){
                            url = that.options.treeUrl;
                        }
                        that.options.treeParam.appDelFlag = false;
                        that.options.treeParam.menuDelFlag = false;
                        that.options.treeParam.delflag = false;
                        that.options.treeSettings ={data: {
                            simpleData: {
                                enable: true,
                                pIdKey: 'parentId'
                            }
                        }};
                        that._initTree(tree,url,that.options.treeParam,modalContainer);
                        break;
                    default:
                        var url ;
                        if(that.options.treeUrl){
                            url = that.options.treeUrl;
                        }
                        if(url){
//                    	this.options.treeParam = JSON.stringify(this.options.treeParam)=='{}'?null:this.options.treeParam
                            that._initTree(tree,url,that.options.treeParam,modalContainer);
                        }
                        break;
                }

            });

            //初始化数据及容器大小
            this._initSizeAndData(modalContainer,treeContainer);

            if(!this.options.immediatelyShow) {
                /*$ele.unbind('click').on('click', function () {
                    modalContainer.modal({show: true, backdrop: 'static'});
                });*/
            }else{
                modalContainer.modal({show: true, backdrop: 'static'});
            }

            this._searchTreeInputEvent($(modalHeaderContainer.find('input')[0]),tree);
            this._searchTreeBtnEvent($(modalHeaderContainer.find('button.btnMsearch')[0]),$(modalHeaderContainer.find('input')[0]),tree);

            $(document.body).append(modalContainer);

            var that = this;
            modalHeaderContainer.find('button.save-modal-data').on('click',function () {
                if(that.zTreeObj){
                    var treeNodes = that.zTreeObj.getSelectedNodes();
                    if(undefined!=that.options.treeSettings.check){
                    	if(that.options.treeSettings.check.enable){
                    		treeNodes = that.zTreeObj.getCheckedNodes();
                        	that._saveCheckedData(treeNodes,modalContainer);
                    	}
                    }else{
                    	var treeNode = treeNodes[0];
                    	if(treeNode){
                    		var $selectorType = that.options.selectorType;
                    		if($selectorType=='person'&&treeNode.type!='user'){
                    			$.xljUtils.tip('blue','只能选择人员！');
                    			return;
                    		}
                    		if($selectorType=='org'&&treeNode.type=='cata'){
                    		    if(that.options.treeParam.rootSelect&&that.options.treeParam.rootSelect=='1'){
                                      treeNode.id= ''; //portal新闻切换全集团
                                }else{
                                    $.xljUtils.tip('blue','不能选择根节点！');
                                    return;
                                }
                    		}
                    		if($selectorType=='post'&&treeNode.type!='post'){
                    			$.xljUtils.tip('blue','只能选择岗位！');
                    			return;
                    		}

                            //定义可选节点
                            var selectNodeType = that.options.selectNodeType;
                            for(var item in selectNodeType){

                                if(selectNodeType[item]=='all'){
                                    break;
                                }
                                if(item=='msg'){
                                    continue;
                                }
                                if(treeNode[item]!=selectNodeType[item]){
                                    if(that.options.treeParam.rootSelect&&that.options.treeParam.rootSelect=='1'){
                                         //portal新闻切换全集团
                                    }else {
                                        if (selectNodeType.msg) {
                                            $.xljUtils.tip('blue', selectNodeType.msg);
                                        }
                                        return;
                                    }
                                }
                            }
                    		
                    		that._saveSelectData(treeNode,modalContainer);
                    	}else{
                    		$.xljUtils.tip('blue','请选择数据！');
                    	}
                    }
                }
            });
        },
        _createModalContainer: function () {
            var modalContainer = $('<div class="modal fade" tabindex="-1" id="single_modal_tree" data-backdrop="static" role="dialog"></div>');
            return modalContainer;
        },
        _createModalContentContainer: function () {
            var modalContentContainer = $('<div class="modal-dialog modal-tree" role="document"><div class="modal-content"></div></div>');
            return modalContentContainer;
        },
        _createModalHeaderContainer: function () {
            var modalHeaderContainer = $('<div class="modal-header">'+
                '   <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                '   <h6 class="modal-title" id="treeModalLabel"><i class="fa fa-sitemap" aria-hidden="true"></i><span>组织机构</span></h6>'+
                '   <input type="text" class="form-control modalInput" placeholder="输入关键词查询...">'+
                '   <button class="btn btn-sm btnMsearch rm-pad">'+
                '       <i class="fa fa-search" aria-hidden="true"></i>'+
                '   </button>'+
                '   <button class="btn btn-sm blue pull-right mr20 save-modal-data">确定</button>'+
                '</div>');
            return modalHeaderContainer;
        },
        _createModalBodyContainer:function () {
            var modalBodyContainer = $('<div class="modal-body"></div>');
            return modalBodyContainer;
        },
        _createTreeContainer:function () {
            var treeContainer = $('<div class="treeContainer selector-model-tree"></div>');
            return treeContainer;
        },
        _createTree:function () {
            var tree = $('<ul class="ztree"></ul>');
            return tree;
        },
        _initTree:function (treeObj,url,param,modalContainer) {
            var that = this;
            var type = this.options.ajaxType;
            $.ajax({
                type:type,
                url:url,
                dataType:'json',
                contentType:'application/json',
                data:JSON.stringify(param),
                success: function(json){
                    //返回的数据节点
                    var zNodes = json.result;
                    if (that.options.formatTreeJson != undefined && typeof that.options.formatTreeJson === 'function') {
                    	zNodes = that.options.formatTreeJson(zNodes);
                    }
                    //设置图片样式
                    that._recursionArray(zNodes);
                    var settings = $.extend(true, {
                        view: {
                            fontCss: that._getFontCss,
                            dblClickExpand: false
                        },
                        callback: {
                            onDblClick:function (event, treeId, treeNode) {
                                var $selectorType = that.options.selectorType;
                                if($selectorType=='person'&&treeNode.type!='user'){
                                    return;
                                }
                                if($selectorType=='org'&&treeNode.type=='cata'){
                                    if(that.options.treeParam.rootSelect&&that.options.treeParam.rootSelect=='1'){
                                        treeNode.id= ''; //portal新闻切换全集团
                                        that._saveSelectData(treeNode,modalContainer);
                                    }else{
                                        $.xljUtils.tip('blue','不能选择根节点！');
                                    }
                                    return;
                                }
                                if($selectorType=='post'&&treeNode.type!='post'){
                                    return;
                                }

                                //定义可选节点
                                var selectNodeType = that.options.selectNodeType;
                                for(var item in selectNodeType){
                                    if(selectNodeType[item]=='all'){
                                        break;
                                    }
                                    if(item=='msg'){
                                        continue;
                                    }
                                    if(typeof selectNodeType[item] == 'string'){
                                        var selectNodeTypeArr = selectNodeType[item].split(',');
                                        if($.inArray(treeNode[item],selectNodeTypeArr) == -1){
                                            if(selectNodeType.msg){
                                                $.xljUtils.tip('blue',selectNodeType.msg);
                                            }
                                            return;
                                        }
                                    }else if(treeNode[item]!=selectNodeType[item]){
                                        if(selectNodeType.msg){
                                            $.xljUtils.tip('blue',selectNodeType.msg);
                                        }
                                        return;
                                    }

                                }

                                if(undefined!=that.options.treeSettings.check){
                                	if(that.options.treeSettings.check.enable){
                                		//treeNodes = that.zTreeObj.getCheckedNodes();
                                    	//that._saveCheckedData(treeNodes,modalContainer);
                                	}
                                }else{
                                	that._saveSelectData(treeNode,modalContainer);
                                }
                            },
                            onExpand:function (event, treeId, treeNode) {
                                $.xljUtils.treeResizeFn('selector-model-tree');
                            },
                            onCollapse: function(){
                                $.xljUtils.treeResizeFn('selector-model-tree');
                            }
                        }
                    }, that.options.treeSettings);
                    var zTreeObj = $.fn.zTree.init(treeObj, settings, zNodes);
                    that.zTreeObj = zTreeObj;
                    var nodes = zTreeObj.getNodes();
                    //默认展开第一个节点
                    zTreeObj.expandNode(nodes[0], true, false, false,true);



                    var targetIdObj = $('#'+that.options.targetId);
                    var targetNameObj = $('#'+that.options.targetName);
                    if(targetIdObj[0]){
                        $(that).data('_id',targetIdObj.val());
                    }
                    if(targetNameObj[0]){
                        $(that).data('_name',targetNameObj.val());
                    }
                    var $ele = $(that.$element);
                    //var _id = $ele.siblings('input[name="_id"]').val();
                    var _id = $(that).data('_id');
                    if(that.zTreeObj){
                        that.zTreeObj.checkAllNodes(false);
                        var treeNode = that.zTreeObj.getNodeByParam('id',_id,null);
                        if(treeNode){
                            var windowScrollTop = $(window).scrollTop();
                            that.zTreeObj.selectNode(treeNode);
                            window.scrollTo(0,windowScrollTop);

                            that.zTreeObj.expandNode(treeNode.getParentNode(), true, false, false,false);
                        }

                    }


                    setTimeout(function(){
                        $.xljUtils.addTreeScroll('selector-model-tree');
                        $.xljUtils.treeResizeFn('selector-model-tree');
                    },300);
                },
                error:function (xhr) {
                    $.xljUtils.getError(xhr.status);
                }
            });
        },
        /**
         * 设置ztree节点图标
         * @param arr
         * @private
         */
        _recursionArray: function(arr) {
            var that = this;
            //所属的分类 diy-group 目录 diy-company 集团和公司;diy-program 项目和分期;diy-department 部门;
            for(var i in arr) {
            	if(/['"#$%&\^*]/.test(arr[i].name)){
            		arr[i].name=$.xljUtils.htmlDecode(arr[i].name);
            	}
                if(arr[i].type == "zb" || arr[i].type == "company") {
                    arr[i].iconSkin = "diy-company";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "dept" ) {
                    arr[i].iconSkin = "diy-department";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "group" ) {
                    arr[i].iconSkin = "diy-program";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "branch" ) {
                    arr[i].iconSkin = "diy-program";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "cata" ) {
                    arr[i].iconSkin = "diy-group";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "post" ) {
                    arr[i].iconSkin = "diy-post";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "user" ) {
                    arr[i].iconSkin = "diy-member";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "officetype" ) {
                    arr[i].iconSkin = "diy-officetype";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }

                if(arr[i].mold == "cata" ) {
                    arr[i].iconSkin = "diy-roleType";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].mold == "role"){
                    if(arr[i].type=='0'){
                        arr[i].iconSkin = "diy-fictitious";
                        /*if(arr[i].children&&arr[i].children.length > 0) {
                         that._recursionArray(arr[i].children);
                         }*/
                    }else{
                        arr[i].iconSkin = "diy-role";
                        /*if(arr[i].children&&arr[i].children.length > 0) {
                         that._recursionArray(arr[i].children);
                         }*/
                    }
                }

                if(arr[i].type == "APPSystem" ) {
                    arr[i].iconSkin = "diy-system";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }else if(arr[i].type == "RESOURCE" ) {
                    arr[i].iconSkin = "diy-menu";
                    if(arr[i].children&&arr[i].children.length > 0) {
                        that._recursionArray(arr[i].children);
                    }
                }
            }
        },
        /**
         * 保存数据 单选
         * @param treeNode
         * @param modalContainer
         * @private
         */
        _saveSelectData:function (treeNode,modalContainer) {
            var $ele = $(this.$element);
            var idInputObj = $('#'+this.options.targetId);
            if(idInputObj[0]){
                idInputObj.val(treeNode.id);
                $(idInputObj).focus();
            }
            var nameInputObj = $('#'+this.options.targetName);
            if(nameInputObj[0]){
                nameInputObj.val(treeNode.name);
                $(nameInputObj).focus();
            }

            //$ele.siblings('input[name="_id"]').val(treeNode.id);
            //$ele.siblings('input[name="_name"]').val(treeNode.name);
            $(this).data('_id',treeNode.id);
            $(this).data('_name',treeNode.name);

            this.options.saveCallback(treeNode,this.$element);

            modalContainer.modal('hide');
        },
        /**
         * 保存数据 多选
         * @param treeNode
         * @param modalContainer
         * @private
         */
        _saveCheckedData:function (treeNodes,modalContainer) {
        	if(treeNodes.length>0){
	        	var treeIds = "";
	        	var treeNames = "";
	        	for(var i=0;i<treeNodes.length;i++){
	        		//var isLastNode = treeNodes[i].isLastNode;
	        		//if(isLastNode){
        			treeIds += treeNodes[i].id+",";
        			treeNames += treeNodes[i].name+",";
	        		//}
	        	}
	            var $ele = $(this.$element);
	            var idInputObj = $('#'+this.options.targetId);
	            if(idInputObj[0]){
	                idInputObj.val(treeIds.substring(0, treeIds.length-1));
	            }
	            var nameInputObj = $('#'+this.options.targetName);
	            if(nameInputObj[0]){
	                nameInputObj.val(treeNames.substring(0, treeNames.length-1));
	            }
        	}
            //$ele.siblings('input[name="_id"]').val(treeNode.id);
            //$ele.siblings('input[name="_name"]').val(treeNode.name);
           // $(this).data('_id',treeNode.id);
           // $(this).data('_name',treeNode.name);

            this.options.saveCallback(treeNodes,this.$element);

            modalContainer.modal('hide');
        },
        /**
         * 初始化容器大小和数据
         * @param orgTreeContainer ztree父级容器
         * @param orgGridContainer grid父级容器
         * @param orgGridModal 模态框jq对象
         * @param orgGridObj grid jq对象
         * @param orgTreeObj ztree jq对象
         */
        _initSizeAndData: function (modalContainer,treeContainer) {
            var that = this;
            treeContainer.css({
                height:'350px',
                overflow:'auto'
            });
            /*var $ele = $(this.$element);
            var targetIdObj = $('#'+this.options.targetId);
            var targetNameObj = $('#'+this.options.targetName);
            if(targetIdObj[0]){
                $(this).data('_id',targetIdObj.val());
            }

            if(targetNameObj[0]){
                $(this).data('_name',targetNameObj.val());
            }*/

            modalContainer.on('hide.bs.modal',function () {
                modalContainer.css({
                    height:'475px',
                    overflow:"hidden"
                });
                treeContainer.getNiceScroll().remove();
                // 关闭后事件
                if (that.options.onHideModalEvent !== undefined && that.options.onHideModalEvent.constructor == Function) {
                    that.options.onHideModalEvent();
                }
            });

            modalContainer.on('shown.bs.modal',function () {
                modalContainer.css({
                    height:'475px',
                    overflow:"hidden"
                });
                // 打开事件
                if (that.options.onShowModalEvent !== undefined && that.options.onShowModalEvent.constructor == Function) {
                    that.options.onShowModalEvent();
                }
            	var $ele = $(this.$element);
                var targetIdObj = $('#'+that.options.targetId);
                var targetNameObj = $('#'+that.options.targetName);
                if(targetIdObj[0]){
                    $(that).data('_id',targetIdObj.val());
                }
                if(targetNameObj[0]){
                    $(that).data('_name',targetNameObj.val());
                }

                    $.xljUtils.addTreeScroll('selector-model-tree');
                    $.xljUtils.treeResizeFn('selector-model-tree');

                var $ele = $(that.$element);
                //var _id = $ele.siblings('input[name="_id"]').val();
                var _id = $(that).data('_id');
                if(that.zTreeObj){
                    that.zTreeObj.checkAllNodes(false);
                	var treeNode = that.zTreeObj.getNodeByParam('id',_id,null);
                    if(treeNode){
                        var windowScrollTop = $(window).scrollTop();
                        that.zTreeObj.selectNode(treeNode);
                        window.scrollTo(0,windowScrollTop);

                        that.zTreeObj.expandNode(treeNode.getParentNode(), true, false, false,false);
                    }

                }


                modalContainer.css({position:'fixed'});
            });
        },
        /**
         *  查找树节点
         *  @param 查找节点属性
         *  @param 查找的节点属性的对应值
         *  @param 是否标记为高亮
         */
        _searchOrgTree: function(keyName,value,isHighlight,treeObj) {
            //var ztreeObj = $.fn.zTree.getZTreeObj(treeObj.attr('id'));
            var that = this;
            var ztreeObj = this.zTreeObj;
            var nodes = [];
            var tempNodes1 = ztreeObj.getNodesByParamFuzzy(keyName, value, null);
            nodes = nodes.concat(tempNodes1);
            if(this.options.selectorType=='person'){
                var tempNodes = ztreeObj.getNodesByParamFuzzy('loginName', value, null);
                nodes = nodes.concat(tempNodes);
            }
            $.each(nodes,function (i,node) {
                //zTree.setting.view.fontCss = {};
                if(isHighlight){
                    node.highlight = 'true';
                }else{
                    node.highlight = 'false';
                }

                var parentNodes = [];
                that._getTreeParentNodes(node,parentNodes);
                $.each(parentNodes,function (i,parentNode) {
                    if(isHighlight){
                        parentNode.highlight = 'true';
                    }else{
                        parentNode.highlight = 'false';
                    }
                    ztreeObj.updateNode(parentNode);
                });

                ztreeObj.updateNode(node);
                if (i==0) {
                    ztreeObj.expandNode(node.getParentNode(), true, false, false,true);
                }else{
                    //ztreeObj.expandNode(node.getParentNode(), true, false, false,true);
                }

            });

            var nodes = ztreeObj.getNodesByFilter(function(node){
                return node.highlight!='true';
            }, false);
            if (isHighlight) {
                ztreeObj.hideNodes(nodes);
            }else{
                ztreeObj.showNodes(nodes);
            }
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
            /*searchInputObj.bind('keyup',function (event) {
                that._searchOrgTree('highlight','true',false,treeObj);
                var value = $(this).val();
                if(value=='') {
                    that._searchOrgTree('highlight','true',false,treeObj);
                }else {
                    that._searchOrgTree('name',$.trim(value),true,treeObj);
                }
            }).bind('blur',function (event) {
                var value = $(this).val();
                if(value=='') {
                    that._searchOrgTree('highlight','true',false,treeObj);
                }

            });*/
            searchInputObj.bind('keypress',function (event) {
            	if(event.keyCode == "13"){
		            that._searchOrgTree('highlight','true',false,treeObj);
		            var value = $(this).val();
		            if(value=='') {
		                that._searchOrgTree('highlight','true',false,treeObj);
		            }else {
		                that._searchOrgTree('name',$.trim(value),true,treeObj);
		            }
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
        _getTreeParentNodes:function (node,parentNodes) {
            var parentNode = node.getParentNode();
            if (parentNode!=null&&typeof parentNode != 'undefined'){
                this._getTreeParentNodes(parentNode,parentNodes);
                parentNodes.push(parentNode);
            }

        }

    };

    $.fn.extend({
        xljSingleSelector:function (options) {
            if(!options){
                return SingleSelector;
            }
            var opts = options;
            return this.each(function (index,ele) {
            	if(opts.isTransParam){
            		 $(ele).unbind();
                     var singleSelector = new SingleSelector(this,opts);
            	}else{
            		/*var eleId = $(ele).attr('id');
            		if(!eleId||eleId==''){
            			eleId = 'singleEle_'+new Date().getTime();
            			$(ele).attr('id',eleId);
            		}*/
                    var singleSelector = $(ele).data('_singleSelector');
            		//var singleSelector = $(document.body).data(eleId);
            		if(!singleSelector){
            			singleSelector = new SingleSelector(this,opts);
            			//$(document.body).data(eleId,singleSelector);
                        singleSelector._init();
                        if(!opts.immediatelyShow){
                            $(ele).on('click',function () {
                                singleSelector.modalContainer.modal({show:true,backdrop:'static'});
                            });
                        }
                        $(ele).data('_singleSelector',singleSelector)
            		}else{
                        singleSelector.modalContainer.modal({show:true,backdrop:'static'});
                    }
            	}

                return singleSelector;
            });
        },
        xljSingleSelectorUtil:function () {
            var eles = $(this).find('.single-selector');
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
                var treeUrl = $(this).attr('data-treeUrl');
                if(treeUrl){
                    opts.treeUrl = treeUrl;
                }
                var treeParam = $(this).attr('data-treeParam');
                if(treeParam&&treeParam!=''){
                    try {
                        opts.treeParam = eval('('+treeParam+')');//JSON.parse(treeParam);
                    }catch (e){
                        console.error(e);
                    }
                }
                var targetId = $(this).attr('data-targetId');
                if(targetId){
                    opts.targetId = targetId;
                }
                var targetName = $(this).attr('data-targetName');
                if(targetName){
                    opts.targetName = targetName;
                }
                
                var ajaxType = $(this).attr('data-ajaxType');
                if(ajaxType&&ajaxType!=''){
                    opts.ajaxType = ajaxType;
                }

                var treeSettings = $(this).attr('data-treeSettings');
                if(treeSettings&&treeSettings!=''){
                    var treeSettingsJson = JSON.parse(treeSettings);
                    opts.treeSettings = treeSettingsJson;
                }

                var saveCallback = $(this).attr('data-saveCallback');
                if(saveCallback&&saveCallback!=''){
                    try {
                        if($.isFunction(eval(saveCallback))){
                            opts.saveCallback = eval(saveCallback);
                        }
                    }catch(e){
                        console.error(e);
                    }
                }
                var selectNodeType = $(this).attr('data-selectNodeType');
                if(selectNodeType&&selectNodeType!=''){
                    var selectNodeTypeJson = JSON.parse(selectNodeType);
                    opts.selectNodeType = selectNodeTypeJson;
                }

                if(!$(this).data('_singleSelector')){
                    $(this).xljSingleSelector(opts);
                }

            });
        },
        /**
         * 重置单选选择器
         * @param options
         */
        xljSingleSelectorReset:function (options) {
            var opt = options;
            this.each(function(index,ele){
                var singleSelector = $(ele).data('_singleSelector');
                if(singleSelector){
                    singleSelector.modalContainer.remove();
                    singleSelector.zTreeObj = null;
                    if(opt){
                        singleSelector.options = opt;
                    }
                    singleSelector._init();
                }else{
                	$(this).xljSingleSelector(opt);
                }

            });
        }
    });

})(jQuery,window,document);

$(function () {
    var eles = $('.single-selector');
    $.each(eles,function () {
        $(this).attr('readonly','readonly');

        var opts = {};
        var title = $(this).attr('data-title');
        if(title&&title!=''){
            opts.title = title;
        }
        var selectorType = $(this).attr('data-selectorType');
        if(selectorType&&selectorType!=''){
            opts.selectorType = selectorType;
        }
        var treeUrl = $(this).attr('data-treeUrl');
        if(treeUrl&&treeUrl!=''){
            opts.treeUrl = treeUrl;
        }
        var treeParam = $(this).attr('data-treeParam');
        if(treeParam&&treeParam!=''){
            try {
                opts.treeParam = eval('('+treeParam+')');//JSON.parse(treeParam);
            }catch (e){
                console.error(e);
            }
        }
        var targetId = $(this).attr('data-targetId');
        if(targetId&&targetId!=''){
            opts.targetId = targetId;
        }
        var targetName = $(this).attr('data-targetName');
        if(targetName&&targetName!=''){
            opts.targetName = targetName;
        }
        var ajaxType = $(this).attr('data-ajaxType');
        if(ajaxType&&ajaxType!=''){
            opts.ajaxType = ajaxType;
        }

        var treeSettings = $(this).attr('data-treeSettings');
        if(treeSettings&&treeSettings!=''){
            var treeSettingsJson = JSON.parse(treeSettings);
            opts.treeSettings = treeSettingsJson;
        }

        var saveCallback = $(this).attr('data-saveCallback');
        if(saveCallback&&saveCallback!=''){
            try {
                if($.isFunction(eval(saveCallback))){
                    opts.saveCallback = eval(saveCallback);
                }
            }catch(e){
                console.error(e);
            }
        }
        $(this).xljSingleSelector(opts);
    });


});