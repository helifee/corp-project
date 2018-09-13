
//全局变量
var g_struct = [];
var g_tree = null;
var g_lastclick = null;
var g_delay = null;
var g_advice = null;

/**
 * 页面初始化
 */
function menuInit() {
	var aArr = $('menuBox').select('a');
	for (i = 0; i < aArr.length; i++) {
		if (aArr[i].up(0).readAttribute('target')) {
			aArr[i].writeAttribute({
				'target': aArr[i].up(0).readAttribute('target')
			});
		} else {
			aArr[i].writeAttribute({
				'target': 'main'
			});
		}
	}
	Event.observe('LeftBox', 'scroll', screenFix);
	
	new PeriodicalExecuter(refreshPage, 600);
	
	g_advice = new PopupBox({
		key: 'adviceBox',
		title: '意见反馈',
		content: $('adviceBox'),
		position: 10,
		drag: true,
		loader: true,
		noclose: true
	});
}

function advicePop(){
	$('adviceFrame').src = window['g_basePath'] + 'common/comAdvice.jsp';
	g_advice.popup();
}
function adviceLoaded(){
	g_advice.loaded();
}
function adviceClose(){
	g_advice.close(0);
	$('adviceFrame').src = '';
}

function refreshPage(){
	$('oldWeb').src = 'http://www.yds.yd/login/jump.html?' + addStamp();
	
	var url = 'common/refresh.html';
	new Ajax.Request(url, {
		method: 'get',
		parameters: addStamp(),
		onComplete: function(request) {
			// do nothing
		}
	});
}

/**
 * 取得主题列表
 */
function getThemeList() {
	var url = 'common/getThemeList.action';
	var params = addStamp();
	var request = new Ajax.Updater('themeList', url, {
		method: 'get',
		parameters: params,
		asynchronous: true
	});
}

function menuP(thisObj) {
	var subObj, returnFlg;
	thisObj = $(thisObj);
	subObj = Element.next(thisObj);
	
	if (thisObj.hasClassName('a1')) {
		if (g_lastclick == thisObj && subObj) {
			Effect.toggle(subObj, 'blind', {
				duration: 0.3,
				afterFinish: screenFix
			})
			if (Element.next(thisObj.down()).readAttribute('href') == '') {
				returnFlg = false;
			} else {
				returnFlg = true;
			}
			
		} else {
			var effects = [];
			if (subObj) {
				if (subObj.hasClassName('none')) {
					subObj.removeClassName('none').addClassName('block').hide();
				}
				effects.push(Effect.BlindDown(subObj, {
					sync: true
				}));
				
				if (Element.next(thisObj.down()).readAttribute('href') == '') {
					returnFlg = false;
				} else {
					returnFlg = true;
				}
			} else {
				returnFlg = true;
			}
			if (g_lastclick && g_lastclick.next()) {
				effects.push(Effect.BlindUp(g_lastclick.next(), {
					sync: true
				}));
			}
			
			g_lastclick = thisObj;
			new Effect.Parallel(effects, {
				duration: 0.3,
				afterFinish: screenFix
			});
		}
	} else {
		returnFlg = true;
	}
	return returnFlg;
}

/**
 * 导航菜单树形结构.
 * @param {Object} numB
 * @param {Object} thisObj
 */
function show_menuB(numB, thisObj) {
	for (j = 0; j < 100; j++) {
		if (j != numB) {
			if ($('Bli0' + j)) {
				$('Bli0' + j).style.display = 'none';
				$('Bf0' + j).style.background = 'url(images/01.gif)';
				thisObj.style.background = 'url(images/nav02.gif)';
			}
		}
	}
	if ($('Bli0' + numB)) {
		if ($('Bli0' + numB).style.display == 'block') {
			$('Bli0' + numB).style.display = 'none';
			$('Bf0' + numB).style.background = 'url(images/01.gif)';
			thisObj.style.background = 'url(images/nav02.gif)';
		} else {
			$('Bli0' + numB).style.display = 'block';
			$('Bf0' + numB).style.background = 'url(images/02.gif)';
			thisObj.style.background = 'url(images/nav03.gif)';
		}
	}
}

/**
 * 隐藏/展开 左侧导航栏.
 */
function show_menuC() {
	if ($('LeftBox').hasClassName('none')) {
		$('LeftBox').toggleClassName('none');
		$('RightBox').setStyle({
			marginLeft: 208 + 'px'
		});
		//$('ImgArrow').src="images/switch_right.gif";
		//$('ImgArrow').alt="打开左侧导航栏";
	} else {
		$('LeftBox').toggleClassName('none');
		$('RightBox').setStyle({
			marginLeft: 0
		});
		//$('ImgArrow').src="images/switch_left.gif";
		//$('ImgArrow').alt="隐藏左侧导航栏";
	}
}

function screenFix() {
	if (ieVersion > 7) return;
	if(g_delay){
		window.clearTimeout(g_delay);
	}
	g_delay = _doFix.defer();
}
function _doFix(){
	MsgBox.message(1).close();
}
