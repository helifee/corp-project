function loaderUrl(url, nodeId) {
		Ext.MessageBox.wait('ҳ�������,���Ժ�...');
		url=getRootPath()+url
		i1frame = "<iframe id='iframe-bancstone-"
				+ nodeId
				+ "' scrolling='auto' frameborder='0' width='100%' height='100%' src='"
				+ url + "'></iframe>"
		i1frameid = "iframe-bancstone-" +nodeId;
		if (!window.frames[i1frameid]) {
			Ext.MessageBox.hide();
		}
		return i1frame;
	}

function mytestpanel1(){
	
	var panelItems = [
			{xtype:'tabpanel',
				region:'center',
				activeTab: 0,
				items:[
					{title:'¼��',
						html:loaderUrl('/transfer/transferManage/transferOfClientAction.do?method=gotoAdd','add')},
					{title:'�޸�',
						html:loaderUrl('/transfer/transferManage/transferOfClientAction.do?method=findALLTranssferOfClientList','modify')},
					{title:'����',
						html:loaderUrl('/transfer/transferManage/transferOfClientAction.do?method=chickfindALLTranssferOfClientList','check')}
				]
			}
	];
	var mypanel = new Ext.Viewport({
		
		enableTabScroll:true,
		layout:"fit",
		items:panelItems
	});
	return mypanel;
}
Ext.onReady(mytestpanel1);