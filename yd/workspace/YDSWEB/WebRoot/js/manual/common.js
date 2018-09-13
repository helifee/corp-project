if(window['ie6']){
	IE7_PNG_SUFFIX = '-ie6.png';
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = '../js/common/fix/IE7.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}
document.observe('dom:loaded', function() {
	var flg;
	var toggles = $$('.codetoggle');
	for (var i = 0; i < toggles.length; i++) {
		$(toggles[i]).replace('<a href="#this" onclick="codeToggle(this);" class="' + $(toggles[i]).className + '">' + (flg ? '展开' : '收缩') + '</a>');
	}
	toggles = $$('.codetoggle');
	for (var i = 0; i < toggles.length; i++) {
		flg = $(toggles[i]).hasClassName('none');
		if (flg) {
			codeToggle($(toggles[i]));
			$(toggles[i]).removeClassName('none');
		}
	}
	toggles = $$('.codetoggleall');
	for (var i = 0; i < toggles.length; i++) {
		$(toggles[i]).replace('<a href="#this" onclick="codeToggleAll(this);" class="codetoggleall">代码全展开</a>');
	}
});
function codeToggle(a) {
	a = $(a);
	if (a.innerHTML == '展开') {
		a.up().next().show();
		a.update('收缩');
	} else {
		a.up().next().hide();
		a.update('展开');
	}
}

function codeToggleAll(a) {
	var toggles = $$('.codetoggle');
	a = $(a);
	if (a.innerHTML == '代码全展开') {
		toggles.each(function(item) {
			item.update('收缩');
			item.up('.module_header').next().show();
		});
		a.update('代码全收缩');
	} else {
		toggles.each(function(item) {
			item.update('展开');
			item.up('.module_header').next().hide();
		});
		a.update('代码全展开');
	}
}
