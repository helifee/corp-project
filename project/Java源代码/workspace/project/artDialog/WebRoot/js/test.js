$(function() {

	$("#open").click(function() {
//		var dialog = art.dialog({
//			lock: true,
//			title: '�������',
//		    content: document.getElementById('demo'),
//		    id: 'EF893L',
//		    icon: 'succeed',
//		    drag: false
//		});
//		
//		dialog.title('new');
		
		art.dialog.load('login.html', false);
	});
	
});