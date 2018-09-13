function loaderUrl(url, nodeId) {
		Ext.MessageBox.wait('页面加载中,请稍后...');
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
					{title:'录入',
						html:loaderUrl('/transfer/transferManage/transferOfOrganAction.do?method=gotoSaveSendPageTransferOfOrgan','add')},
					{title:'修改',
						html:loaderUrl('/transfer/transferManage/transferOfOrganAction.do?method=findModifySendList','modify')},
					{title:'复核',
						html:loaderUrl('/transfer/transferManage/transferOfOrganAction.do?method=findCheckSendList','check')}
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