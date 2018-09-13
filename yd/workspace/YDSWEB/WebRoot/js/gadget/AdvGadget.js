/*
 * @(#)AdvGadget.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 广告
 */
/**
 * @fileoverview 广告JavaScript.
 *
 * @author 远东)yuanjinling
 * @version 1.0 2010/09/09
 */
var moveDelay;
var active;
var count;
var height;
var nowView

function resize(size) {
	if (size == 2) {
		$('content').removeClassName('w_300').addClassName('w_600');
		height=265;
	} else if (size == 1) {
		$('content').removeClassName('w_600').addClassName('w_300');
		height=130;
	}
	setHeight(height);
	$('content').setStyle({
		height: height + 'px'
	});
}

function init() {
	count = $('slideDiv').childElements().length;
	new PeriodicalExecuter(moveUp, 5);
	
	$('btn_0').addClassName('active');
	nowView = 0;
	active = true;
	var btns = $$('span');
	for (var i = 0; i < btns.length; i++) {
		Event.observe(btns[i], 'mouseover', moveTo.curry(i));
	}
	Event.observe(document.body, 'mouseover', function() {
		active = false;
	});
	Event.observe(document.body, 'mouseout', function() {
		active = true;
	});
}

function moveUp() {
	if (!active) return;
	$('btn_' + nowView).removeClassName('active');
	if (nowView == (count - 1)) {
		$('img_' + nowView).insert({
			after: $('img_0')
		});
		nowView = 0;
	} else {
		$('img_' + nowView).insert({
			after: $('img_' + (nowView + 1))
		});
		nowView++;
	}
	_move();
}

function _moveTo(dest) {
	if (nowView == dest) return;
	$('img_' + nowView).insert({
		after: $('img_' + dest)
	});
	$('btn_' + nowView).removeClassName('active');
	nowView = dest;
	_move();
}

function moveTo(dest) {
	if (moveDelay) {
		window.clearTimeout(moveDelay);
		moveDelay = null;
	}
	moveDelay = _moveTo.delay(1, dest);
}

function _move() {
	$('btn_' + nowView).addClassName('active');
	new Effect.Move($('slideDiv'), {
		y: -height,
		mode: 'relative',
		duration: 1,
		afterFinish: function() {
			$('slideDiv').setStyle({
				'top': '0px'
			});
			$('slideDiv').insert({
				bottom: $('slideDiv').down()
			});
		}
	});
}
