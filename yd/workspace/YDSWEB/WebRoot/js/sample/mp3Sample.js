/*
 * @(#)mp3Sample.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: sample
 */

/**
 * 指定页面中链接对应的音频资源
 */
function initLinks() {
	var link = $('mp3');
	link.href = '../sample/mp3Test.action?id=1234567';
}

/**
 * 生成播放器对象
 */
oneBit = new OneBit('1bit.swf');

/**
 * 准备链接
 */
oneBit.ready(initLinks);

/**
 * 煊染页面中链接
 */
oneBit.ready(function() {
	oneBit.specify('color', '#000000');
	oneBit.apply('a');
});
