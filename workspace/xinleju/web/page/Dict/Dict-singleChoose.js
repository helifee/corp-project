var dt = new Date();
function dictTreeOperator(){}
dictTreeOperator.prototype = {
	tree:null,
	root:null,
	buildDictWin:function(idDom,nameDom,codeDom,treeDom,searchDom,rootCode,dictLevel,ifExpendAll){
		var dto = this;
		dto.root = new Ext.tree.AsyncTreeNode({
			id : '0',
			text : '数据字典',
			rootCode : rootCode,
			dictLevel : dictLevel
		});
		dto.tree = new Ext.tree.TreePanel({
			loader : new Ext.tree.TreeLoader({
				dataUrl : 'Dict!getTrees.do'
			}),
			root : dto.root,
			renderTo : treeDom,
			border : false,
			autoHeight : false,
			animate : true,// 以动画形式伸展,收缩子节点
			autoScroll : true,
			height:300
		});
		dto.tree.on('click',function(node){
	    	node.expand();
	        node.select();
	    });
		dto.tree.on('dblclick',function(node){
	    	node.expand();
	        node.select();
	        var ifReturn = true;
	        //如果存在可选层级，则只能选择叶子节点
	        if(dictLevel!=null && dictLevel!=""){
	        	if(!node.leaf){
	        		ifReturn = false;
	        	}
	        }
	        if(ifReturn){
	        	if(idDom!=null && idDom!="")
		    		$("#"+idDom).val(node.id);
		    	if(nameDom!=null && nameDom!=""){
		    		$("#"+nameDom).val(node.attributes.text);
		    		$("#"+nameDom).focus();
		    	}
		    	if(codeDom!=null && codeDom!="")
		    		$("#"+codeDom).val(node.attributes.dictCode);
		    	if(treeDom!=null && treeDom!="")
		    		$("#"+treeDom).css("display","none");
		    	//触发改变时间
		    	$("#"+nameDom).trigger("onchange");
	        }
	    });
		dto.tree.on('beforeload',function(node) {
			//带上名称检索条件
			var dictName = $("#"+searchDom).val();
			if(dictName!="" && dictName!=null && trim(dictName)!=""){
				dictName = encodeURIComponent(encodeURIComponent(dictName));
			}
			dto.tree.loader.dataUrl = 'Dict!getTrees.do?parentId=' + node.id+"&dictName="+dictName+"&rootCode="+rootCode+"&dictLevel="+dictLevel+"&dt="+dt;
	    });
		dto.tree.on('load', function(node) {
			//若存在搜索或定义为全部展开，则自动全部展开
			var dictName = $("#"+searchDom).val();
			if(ifExpendAll || (dictName!="" && dictName!=null && trim(dictName)!="")){
				node.expand(true);
			}
		});
		dto.tree.getRootNode().expand(false);
		dto.root.expand();
		dto.root.select();
	},

	selectDict:function(idDom,nameDom,codeDom,treeDom,searchDom,rootCode,dictLevel,ifExpendAll){
		var dto = this;
		dto.buildDictWin(idDom,nameDom,codeDom,treeDom,searchDom,rootCode,dictLevel,ifExpendAll);
	},

	//树形菜单查询
	searchDict:function(){
		var dto = this;
		dto.root.reload();     
	}
}