var flagType="";
$(function () {

	 initDictionaryItemList();
	 initServeyResponseList();
	 $.xljUtils.resizeNestedGrid();
	//input添加伪placeholder
	$('#keywords').inputPlaceholder();
    /**
     * 初始化字典树
     */
    function initDictionaryTree() {
    	var zNodes = [
      	         	{name: "我参与的问卷",id:"join"},
      	         	{name: "调查结束",id:"fk"}
      	         ];
          recursionArray(zNodes);
          var setting = {
              view: {
                  fontCss: getFontCss,
                  dblClickExpand: false
              },
              data:{
                  simpleData:{
                      enable:true,
                      idKey:'id',
                      pIdKey:'pId',
                      rootPId:null
                  }
              },
              callback:{
                  onExpand:function (event, treeId, treeNode) {
                      $.xljUtils.treeResizeFn('dictionary-tree');
                  },
                  onCollapse: function(){
                      $.xljUtils.treeResizeFn('dictionary-tree');
                  },
                  onClick:function (event, treeId, treeNode) {
                      loadItemGrid(treeNode.id);
                  }
              }

          };
          zTreeObj = $.fn.zTree.init($("#contentTree"), setting, zNodes);
          var nodes = zTreeObj.getNodes();
          //默认展开第一个节点
          zTreeObj.expandNode(nodes[0], true, false, false,false);
          zTreeObj.selectNode(nodes[0]);
          zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);
          setTimeout(function(){
              $.xljUtils.addTreeScroll('dictionary-tree');
              $.xljUtils.treeResizeFn('dictionary-tree');
          },300);
      }
    initDictionaryTree();
    resizeHeight();
    

    //树增加样式
    function recursionArray(arr) {
        for(var i in arr) {
            arr[i].iconSkin = "diy-system";
        }
    };

    //树的节点字体样式
    function getFontCss(treeId, treeNode) {
        return (treeNode.highlight&&treeNode.highlight=='true') ?
        {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'italic', "font-weight":"bold"} :
            {color:"#333", "font-weight":"normal",'font-style':'normal'} | ((typeof treeNode.status !='undefined')&& !treeNode.status)?
            {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'#CD0000'} :
            {color:"#333", "font-weight":"normal",'font-style':'normal'};
    }
   
    //加载字典项
    function loadItemGrid(flagId) {
    	
    	if(flagId == "join"){
    		flagType = "join";
    		$("#questionnair").show();
    		$("#serveyResponse").hide();
    		jQuery('#serveyQuestionnaire').jqGrid('setGridParam',{
                postData: {'type': "PARTY"},
				page:1
            });
            jQuery('#serveyQuestionnaire').jqGrid().trigger('reloadGrid');
            
    	}else if(flagId == "fk"){
    		flagType = "fk";
    		$("#questionnair").hide();
    		$("#serveyResponse").show();
    		jQuery('#serveyResponseList').jqGrid('setGridParam',{page:1});
            jQuery('#serveyResponseList').jqGrid().trigger('reloadGrid');
    	}
    	
    	$.xljUtils.resizeNestedGrid();
    }
    
    //模糊查询按钮绑定事件
    $("#fuzzySearchBtn").unbind('click').on('click',function () {
    	fuzzySearch();
    });
    
    document.onkeydown = function(e){
        var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
        	fuzzySearch();
         }
    };
    
});


/**
 * 初始化我参与的问卷grid列表
 */
function initDictionaryItemList() {
    
	jQuery('#serveyQuestionnaire').jqGrid({
		url : serviceUrl+"oa/servey/serveyParty/page"+"?time="+Math.random(),
		ajaxGridOptions: {
			contentType: 'application/json'
		},
		postData:{"type":"PARTY"},
		mtype : "POST",
		contentType : "application/json",
		datatype : "json",
		jsonReader : {
			repeatitems:false
		},
		autowidth:true,
		colModel:[
			{name:'id',label:'id', index:'id', align:"center", width:55,hidden:true},
			{name:'serveyId',label:'serveyId', index:'serveyId', align:"center", width:55,hidden:true},
			{name:'serveyName',label:'问卷主题',index:'serveyName',align:"center",  width:100},
			{name:'createPersonName',label:'文档状态',index:'createPersonName', align:"center", width:100,hidden:true},
			{name:'categoryName',label:'所属模板',index:'categoryName',align:"center",  width:100},
			{name:'status',label:'问卷状态',index:'status',align:"center",  width:100},
			{name:'thruDate',label:'调查结束时间',index:'thruDate', align:"center", width:90,
				formatter:"date",formatoptions: {srcformat:'Y-m-d H:i:s',newformat:'Y-m-d H:i:s'}}
		],
		rowNum : 20,//一页显示多少条
		rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
		pager : 'pagered',//表格页脚的占位符(一般是div)的id
		rownumbers:true,
		viewrecords : true,
		multiboxonly : true,
		multiselect: true,
		loadError:function (xhr,status,error) {
			$.xljUtils.tip('red',"数据加载失败！");
		},
		ondblClickRow:function(rowid){
			var rowData = $("#serveyQuestionnaire").jqGrid('getRowData',rowid);
			window.open("serveyQuestionnaire_edit.html?serveyId=" + rowData.serveyId + "&oper=add&serveyName=" + encodeURI(rowData.serveyName,"UTF-8") + "&serveyStatus=" + encodeURI(rowData.status,"UTF-8"));
		},
		onCellSelect: function(rowid,iCol,cellcontent,e) {
			if(iCol == 4 && /view_hov.png/.test(cellcontent)) {

			}
		},
		gridComplete: function() {
			$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
		}
	});
}

/**
 * 初始化问卷反馈grid列表
 */
function initServeyResponseList() {
    
    jQuery('#serveyResponseList').jqGrid({
    	url : serviceUrl+"oa/servey/serveyResponse/page"+"?time="+Math.random(),
		ajaxGridOptions: {
			contentType: 'application/json'
		},
		mtype : "POST",
		contentType : "application/json",
		datatype : "json",
		jsonReader : {
			repeatitems:false
		},
		autowidth:true,
		colModel:[
			{name:'id',label:'id', index:'id', align:"center", width:55,hidden:true},
			{name:'serveyId',label:'serveyId', index:'serveyId', align:"center", width:55,hidden:true},
			{name:'serveyName',label:'问卷主题',index:'serveyName',align:"center",  width:100},
			{name:'createPersonName',label:'文档状态',index:'createPersonName', align:"center", width:100,hidden:true},
			{name:'categoryName',label:'所属模板',index:'categoryName',align:"center",  width:100},
			{name:'status',label:'问卷状态',index:'status',align:"center",  width:100},
			{name:'thruDate',label:'调查结束时间',index:'thruDate', align:"center", width:90,
				formatter:"date",formatoptions: {srcformat:'Y-m-d H:i:s',newformat:'Y-m-d H:i:s'}}
		],
		rowNum : 20,//一页显示多少条
		rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
		pager : 'ResponsePagered',//表格页脚的占位符(一般是div)的id
		rownumbers:true,
		viewrecords : true,
		multiboxonly : true,
		multiselect: true,
		loadError:function (xhr,status,error) {
			$.xljUtils.tip('red',"数据加载失败！");
		},
		ondblClickRow:function(rowid){
			var rowData = $("#serveyResponseList").jqGrid('getRowData',rowid);
			window.open("serveyQuestionnaire_result.html?serveyId=" + rowData.serveyId + "&oper=result&serveyName=" + encodeURI(rowData.serveyName,"UTF-8"));
		},
		onCellSelect: function(rowid,iCol,cellcontent,e) {
			if(iCol == 4 && /view_hov.png/.test(cellcontent)) {

			}
		},
		loadComplete:function(xhr){
            console.info(xhr);
        },
        gridComplete: function() {
            $.xljUtils.addGridScroll();
            $.xljUtils.gridResizeFn();

        }
	});
}
$(window).resize(function(){
	resizeHeight();
})
//计算高度
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
   // $('.xj-main-grid').height(w_h - 256);
    $(".ztree-box").height((w_h - 86));
    //动态计算各grid的宽高
//    setTimeout(function () {
//    	$(".ztree-box").height($('.col9width').height()-69);
//    },200);
}

/**
 * 模糊查询
 */
function fuzzySearch(){
	var param = $('#keywords').getInputVal().trim();
	if(flagType == "join"){
		jQuery("#serveyQuestionnaire").jqGrid('setGridParam', {postData: {"type":"PARTY","name":param},page:1}).trigger('reloadGrid');
	}else if(flagType == "fk"){
        jQuery("#serveyResponseList").jqGrid('setGridParam', {postData: {"name":param},page:1}).trigger('reloadGrid');
	}
    
};