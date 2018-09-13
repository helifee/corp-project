/**
 * @author zhangzheng
 */
var g_baseBox;
var g_customBox;

Event.observe(window, 'load', initPage);

function initPage() {
	g_baseBox = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'baseBox',
		
		// *标题内容，可用元素或字符串
		title: '基本用法',
		
		// *图标的CSS
		icon: 'img_opt opt_Help',
		
		// *内容元素
		content: $('baseSample'),
		
		// *显示位置，相当与z-index
		position: 3,
		
		// 是否允许拖动
		drag: true,
		
		loader: true
	});
	g_customBox = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'customBox',
		
		// *标题内容，可用元素或字符串
		title: '自定义校验',
		
		// *图标的CSS
		icon: 'img_opt opt_Help',
		
		// *内容元素
		content: $('customSample'),
		
		// *显示位置，相当与z-index
		position: 3,
		
		// 是否允许拖动
		drag: true,
		
		loader: true
	});

	var frames = $$('iframe');
	for(var i=0;i<frames.length;i++){
		Event.observe(frames[i],'load',function(event){
			var e = Event.element(event);
			if (e.src && e.src.length > 0) {
				$(e).up().loaded();
				setFrame(e);
			}
		});
	}
}

function basePop() {
	$('basePage').src = 'formValidationBaseSample.jsp';
	g_baseBox.popup();
}

function customPop() {
	$('customPage').src = 'formValidationCustomSample.jsp';
	g_customBox.popup();
}

function baseLoaded() {
	g_baseBox.loaded();
}
function customLoaded() {
	g_customBox.loaded();
}

function setFrame(frame) {
	var iframe = $(frame);
	try {
		var bHeight = iframe.contentWindow.document.body.scrollHeight;
		var bWidth = iframe.contentWindow.document.body.scrollWidth;
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		var dWidth = iframe.contentWindow.document.documentElement.scrollWidth;
		var height = Math.max(bHeight, dHeight);
		var width = Math.max(bWidth, dWidth);
		iframe.height = height;
		iframe.width = width;
	} 
	catch (ex) {
	}
}
