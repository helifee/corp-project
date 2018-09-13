var ctWin;
var chooseCt = function(treeRootPrefix,treeRootId,treeRootName,idDomId,nameDomId){
	var dt = new Date();
	if(ctWin!=null){
		ctWin.close(); 
	}
	ctWin = new Ext.Window({ 
		width:275,
		height:300,
		resizable:false,
		html:'<iframe name=\'myFrame\' id=\'myFrame\' height=\'230\' width=\'260\' src=\"Ct!selectCtTrees.do?treeRootPrefix='+treeRootPrefix+'&treeRootId='+treeRootId+'&treeRootName='+treeRootName+'&t=' + dt.getTime() + '\"></iframe>',
		title:"选择树" ,
		buttonAlign: 'center',
		buttons: [{ text: '确定', handler: function(){
				var idNames = myFrame.window.getObjectIds();
				if (isNotEmpty(idNames)){
					$('#' + idDomId).val(idNames.substring(0, idNames.indexOf(';')));
					$('#' + nameDomId).val(idNames.substring(idNames.indexOf(';') + 1));
				}
				ctWin.close();
			}
		}]
	});
	ctWin.show(); 
}