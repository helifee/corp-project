$(function() {
	var setting = {
	    data: {
	        simpleData: {
	            enable: true,
	            pIdKey: 'parentId'
	        },
	        key: {
	        	
	        }
	    },
	    callback: {
	    	beforeClick: function(treeId, treeNode, clickFlag) {
	    		return !treeNode.isParent;
	    	},
	        onClick: loadContentChildByTypeId
	    }
	};
	//生成左侧的菜单数
	/**
	 * 查询大类树结构
	 * null 参数代表查询所有的树结构，不带条件搜索
	 */
	
    $.ajax({
        type: "GET",
        url: baseUrl + "oa/office/officeHouse/getOfficeHouseTreeById/null?t=" + (+new Date()),
        dataType: "json",
        contentType: 'application/json',
        success: function (typeNodes) {
            var zNodes = typeNodes.result;
            recursionArray(zNodes);
            var treeObj = $.fn.zTree.init($("#_zTree"), setting, zNodes);
            treeObj.expandAll(true);
            //默认加载第一个菜单的列表数据
            if(zNodes.length>0){
            	var firstChildNode = null;
            	var nodes =  treeObj.transformToArray(treeObj.getNodes());
            	for(var i = 0, len = nodes.length;i<len;i++) {
            		if(!nodes[i].isParent) {
            			firstChildNode = nodes[i];
            			break;
            		}
            	}
            	treeObj.selectNode(firstChildNode);	//选中第一个节点
            	onClick("","",firstChildNode);
            }
        }
    });
    
    
    /**
     * 默认进入只是目录页面的时候，加载左侧树第一个大类信息
     * 加载对应jqgrid数据列表
     */
    function onClick(e,treeId,treeNode){
    	jQuery("#officeInfoList").jqGrid({
        	url : baseUrl + "oa/office/officeInfo/getOfficeInfopage",
            ajaxGridOptions: { contentType: 'application/json', aync:true },
            mtype : "post",
            datatype : "json",
            contentType : "application/json",
            postData: {stockHouseId: treeNode.id},
            jsonReader : {
            	repeatitems: false
            },
            colModel : [
                 {name : 'id',label : 'id', align:"center",hidden : true},
                 {name : 'stockNum',label : '编号', align:"center",defaultValue:"eeee"},
                 {name : 'stockName',label : '名称', align:"center",editable : true},
                 {name : 'typeName',label : '所属类别', align:"center",editable : true},
                 {name : 'stockSpecifications',label : '规格',align:"center",editable : true},
                 {name : 'stockBrand',label : '品牌',align:"center",editable : true},
                 {name : 'meteringUnit',label : '单位',align:"center",editable : true},
                 {name : 'price',label : '单价',align:"center",editable : true},
                 {name : 'stockCount',label : '库存量',align:"center",editable : true}
            ],
            rowNum : 20,//一页显示多少条
            rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
            autowidth:true,
            pager : '#pagered',//表格页脚的占位符(一般是div)的id
            rownumbers:true,
            viewrecords : true,
//            multiboxonly : true,
            multiselect: true,
            gridComplete: function() {
            	$.xljUtils.resizeNestedGrid();
            	$.xljUtils.addGridScroll();
            }
    	});
    }
    /**
     * 单击左侧菜单事件
     * 加载对应jqgrid数据列表
     */

    function loadContentChildByTypeId(e,treeId,treeNode){
    	jQuery("#officeInfoList").jqGrid('setGridParam',{
    		postData: {stockHouseId: treeNode.id}
    	}).trigger('reloadGrid');
    }
    
  //树增加样式
    function recursionArray(arr) {
        for(var i in arr) {
        	arr[i].iconSkin = "diy-system";
        }
    };
	
	/**
	 * 删除按钮
	 * add by  yongmei.xiao
	 */
	$("#btnDelete").click(function() {
	    var gr = jQuery("#officeInfoList").jqGrid('getGridParam', 'selarrrow');
	    
	    if (gr.length > 0){
	    	var url;
	        var grStr = gr.join(',');
	        
	        if(gr.length > 1) {	//批量删除
	        	url = baseUrl + "oa/office/officeInfo/deleteBatch/"+grStr
	        }else {	//单个删除
	        	url = baseUrl + "oa/office/officeInfo/delete/"+grStr
	        }
	        
	    	 $.ajax({
	        	   type: "delete",
	        	   url: url,
	        	   dataType:"json",
	        	   success: function(result){
	        		  jQuery("#officeInfoList").trigger('reloadGrid');
	        	   }
	    	 });
	    }else{
	    	 $.xljUtils.tip("red", "请选择要删除的行!");
	    }
	});

	/**
	 * 新增按钮
	 * add by  yongmei.xiao
	 */
	$("#btnAdd").click(function() {
		 window.open('officeInfo_edit.html');
	});
	
	var w_h = $(window).height();
	resizeHeight();
	$(window).resize(function() {
	    resizeHeight();
	});
	//计算高度
	function resizeHeight(){
	    //左侧  头部底部为60px  title类 为50px
		$(".slide-left .ztree-box").height((w_h-100)+"px");
		//右侧table
		$(".con-table .mytable").height((w_h-80)+"px");
	}

})