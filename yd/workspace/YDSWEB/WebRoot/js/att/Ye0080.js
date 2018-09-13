/*
 * @(#)Ye0080.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
 */
/**
 * @fileoverview 员工考勤查询JavaScript.
 *
 * @author 远东)zhangzheng
 * @version 1.0 2010/12/21
 */
var g_xLeft = 0;
var g_xMax = 1;
var g_xCell = 35;
var g_xWindow = 22;
var g_gWidth = 769;
var g_gHeight = 420;
var g_exec;
var g_baseX;
var g_baseY;
var g_delay;
var g_lastVal;

/**
 * 画面初期化.
 */
function init(){
    g_xMax = $('days').value;
    g_delay = 0;
    g_lastVal = 0;
    PeriodicalExecuter.prototype.resume = function(){
        if (!this.timer) 
            this.registerCallback();
    };
	
	// 横向滚动动画处理
    g_exec = new PeriodicalExecuter(animate, 0.04);
	
	// 纵向滚动动画处理
    new PeriodicalExecuter(function(){
        $('yLine').setStyle({
            top: $('mainGrid').scrollTop + 'px'
        });
		
		// 判断滚动是否已停止
        g_lastVal -= $('mainGrid').scrollTop;
        if (g_lastVal > 2 || g_lastVal < -2) {
			g_delay = 0;
            g_lastVal = $('mainGrid').scrollTop;
            return;
        }
		g_lastVal = $('mainGrid').scrollTop;
		
		// 滚动停止后延迟0.04*10秒开始动画
        g_delay++;
        if (g_delay < 10) 
            return;
			
		// 继续滚动到整行显示的位置
        var offset = $('mainGrid').scrollTop % 42;
        if (offset == 0) 
            return;
        var px = offset > 21 ? 2 : -2;
        px = offset > 1 ? px : -1;
        px = offset > 40 ? 1 : px;
        $('mainGrid').scrollTop += px;
    }, 0.04);
    
    Event.observe(document.body, 'mousemove', assistLine);
    $('xLine').setStyle({
        width: '1500px',
        height: '20px',
        background: '#0f0',
        opacity: 0.1,
        zIndex: 5
    }).hide();
    $('xLineA').setStyle({
        width: '75px',
        height: '20px',
        left: '0px',
        background: '#0f0',
        opacity: 0.1,
        zIndex: 5
    }).hide();
    $('xLineB').setStyle({
        width: '150px',
        height: '20px',
        left: '0px',
        background: '#0f0',
        opacity: 0.1,
        zIndex: 5
    }).hide();
    $('yLine').setStyle({
        top: $('mainGrid').scrollTop + 'px',
        height: g_gHeight + 'px',
        width: '35px',
        background: '#0f0',
        opacity: 0.1,
        zIndex: 5
    }).hide();
    var pos = $('gContent').up().cumulativeOffset();
    g_baseX = pos.left;
    g_baseY = pos.top;
}

/**
 * 设置新位置.
 * @param {int} pos 位置
 */
function setPos(pos){
    var xOld = g_xLeft;
    g_xLeft += pos;
    if (g_xLeft < 0) {
        g_xLeft = 0;
    }
    if (g_xLeft > g_xMax - g_xWindow) {
    
        g_xLeft = g_xMax - g_xWindow;
    }
    if (g_xLeft == xOld) {
        return;
    }
    g_exec.resume();
}

/**
 * 动画滚动.
 */
function animate(){
    var now = $('gTitle').up().scrollLeft;
    var dest = g_xLeft * g_xCell;
    var dist = dest - now;
    if (dist == 0) {
        if (now == 0) {
            $('btnLeft').disable();
            $('btnRight').enable();
        }
        else {
            $('btnRight').disable();
            $('btnLeft').enable();
        }
        g_exec.stop();
        return;
    }
    
    var step = g_xCell;
    if (dist < step && dist > 0 - step) {
        $('gContent').up().scrollLeft = dest;
        $('gTitle').up().scrollLeft = dest;
        return;
    }
    step = dist < 0 ? 0 - step : step;
    $('gContent').up().scrollLeft += step;
    $('gTitle').up().scrollLeft += step;
}

/**
 * 更改日期.
 */
function changeDate(){
    var year = $dp.cal.getP('y');
    var month = $dp.cal.getP('M');
    showLoader();
    loadUrl.delay(0.1, window['g_basePath'] + 'att/ye0080findAllList.action?cond.year={0}&cond.month={1}'.format(year, month));
}

/**
 * 更新画面.
 * @param {Object} url
 */
function loadUrl(url){
    window.location = url;
}

/**
 * 辅助线控制.
 * @param {Object} event
 */
function assistLine(event){
    var element = Event.element(event);
    var offY = Event.pointerY(event) - g_baseY;
    var offX = Event.pointerX(event) - g_baseX;
    var xTop = Math.floor((Event.pointerY(event) - g_baseY + $('mainGrid').scrollTop) / 21) * 21 + 1;
    var g_xLeft = Math.floor((Event.pointerX(event) - g_baseX + $('gContent').up().scrollLeft) / 35) * 35;
    if (offX > -1 && offY > -1 && offY < g_gHeight && offX < g_gWidth && xTop < $('gContent').up().getHeight()) {
        $('xLine').show();
        $('xLineA').show();
        $('xLineB').show();
        $('yLine').show();
    }
    else {
        $('xLine').hide();
        $('xLineA').hide();
        $('xLineB').hide();
        $('yLine').hide();
        return;
    }
    $('xLine').setStyle({
        top: xTop + 'px'
    });
    $('xLineA').setStyle({
        top: xTop + 'px'
    });
    $('xLineB').setStyle({
        top: xTop + 'px'
    });
    $('yLine').setStyle({
        left: g_xLeft + 'px'
    });
}
