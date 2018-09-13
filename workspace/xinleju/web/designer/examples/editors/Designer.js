var ac_win, flow_win, tr_win, editor, copy_flow_win;
var init = function() {
	if (act == 'view') {
		editor = new mxApplication('config/layouteditor_view.xml');
		editor.graph.setCellsLocked(true);
		//editor.graph.setEnabled(false);
		//editor.graph.setTooltips(false);
		editor.graph.getAllConnectionConstraints = null;
		
	}
	else {
		editor = new mxApplication('config/layouteditor.xml');
	}
	
	ac_win = new ActivityWindow();
	tr_win = new TrWindow();
	flow_win = new FlowWindow();
	copy_flow_win = new FlowTemplateWindow();
	
	Ext.EventManager.onDocumentReady(initPosition); 
	Ext.EventManager.onWindowResize(initPosition); 
};

Ext.onReady(init);

function initPosition(){
	
	if(!ac_win.hidden){
		ac_win.setHeight(document.body.clientHeight * 0.96 );  
		ac_win.setWidth(document.body.clientWidth * 0.9 );  
		ac_win.center();
	}
	
	if(!tr_win.hidden){
		tr_win.setHeight(document.body.clientHeight * 0.96 );  
		tr_win.setWidth(document.body.clientWidth * 0.9 );  
		tr_win.center();
	}
	
	if(!flow_win.hidden){
		flow_win.setHeight(document.body.clientHeight * 0.96 );  
		flow_win.setWidth(document.body.clientWidth * 0.9 );  
		flow_win.center();
	}
	
	if(!copy_flow_win.hidden) {
		copy_flow_win.center();
	}
}