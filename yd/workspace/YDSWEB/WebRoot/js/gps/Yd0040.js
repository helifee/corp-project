/*
 * @(#)Yd0040.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 社内团购
 */
/**
 * @fileoverview 系统参数维护JavaScript.
 *
 * @author pengchuan
 * @version 1.0  2010/10/21
 */
/**
 *初期画面加载
 */
function initForm(){
    setTable();
	
	// 设定分类的初期显示（由前页面设定的显示的时候）
	var cateID = $F('goodsCateIdPra');
	if(cateID != null && cateID != "" && cateID != undefined){
		var goodsCateSrc = $('goodsCateId');
		if (goodsCateSrc.options != undefined) {
			for (var i = 0; i < goodsCateSrc.options.length; i++) {
				var optionValue = (goodsCateSrc.options[i].value.split(',')[1] == undefined) ? "" : goodsCateSrc.options[i].value.split(',')[1];
				if (cateID == optionValue) {
					goodsCateSrc.options[i].selected = true;
				}
				}
		}
		if($('reFlag').value == 1){
					$('sortBtn').enable();
					$('plusBtn').enable();
				}
				else{
					$('sortBtn').disable();
					$('plusBtn').disable();
		}
	}else{
		$('sortBtn').disable();
		$('plusBtn').disable();
		
	}
/**
 *追加商品弹出画面
*/
    g_box = new PopupBox({
        // 唯一标志
        key: 1,
        // 标题内容，元素或字符串
        title: '商品详细信息-编辑',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_goods_plus'),
        // 显示位置，相当与z-index
        position: 9,
        // 是否允许拖动
        drag: true
    });

/**
 *商品排序弹出画面
*/
    g_box_sort = new PopupBox({
        // 唯一标志
        key: 2,
        // 标题内容，元素或字符串
        title: '商品排序',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_goods_sort'),
        // 显示位置，相当与z-index
        position: 10,
        // 是否允许拖动
        drag: true
    });
/**
 *追加分类弹出画面
*/
    g_box_plus = new PopupBox({
        // 唯一标志
        key: 3,
        // 标题内容，元素或字符串
        title: '追加分类',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_goods_cate'),
        // 显示位置，相当与z-index
        position:11,
        // 是否允许拖动
        drag: true
    });
	
}
function myInnerPageClose(){
	g_box.close(0);
}

/**
 * 取得商品列表信息.
 */
function getGoodsInfoList(){

		var url = 'yd0040getCateList.action';
        var pars =addStamp('goodsCateId=' + $F('goodsCateId'));
    
	    new Ajax.Updater('div_goods_infoList', url, {
	        method: 'get',
			parameters: pars,
	        onComplete: function(response){
				if(checkException(response)){
					return;
				}
		        setTable();
	            if ($F('goodsCateId').indexOf(",")==-1) {
					if($F('goodsCateId').length == 8){
						$('sortBtn').enable();
	                	$('plusBtn').enable();
					}
					else{
						$('sortBtn').disable();
						$('plusBtn').disable();
					}
	            }
	            else {
	                $('sortBtn').enable();
	                $('plusBtn').enable();
	            }
	        }
	    });
}
	
/**
 * 设置table显示.
 */
function setTable(){
	
	listColor('table_goodsList', 450);
    var row = $('table_goodsList').select('tr');
	var swithAry = $NN('goodsSwitch');
    for (var i = 0, len = row.length; i < len; i++) {
		if(swithAry[i].value == '0'){
			row[i].removeClassName('odd').removeClassName('even');
		  	row[i].addClassName('del');
		}
    }
}
/**
 * 追加分类弹出层
 */
function plusCate(){
	

	var url='yd0040PlusGoodsCate.action';
	new Ajax.Updater('div_goods_cate', url, {
        method: 'get',
        onComplete: function(response){
			if(checkException(response)){
				return;
			}
			g_box_plus.Popup();
        }
    });
}
/*
保存追加分类
*/
function submitPlus(){
	
	addRequiredCheck('cateName',getMessage('js.com.warning.0001','分类名称'),true);
	//输入校验
    if (!checkForm('catePlusForm')) {
        return;
    }
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
	   
	    var url = 'yd0040PlusCate.action';
        $('catePlusForm').action=url;
		$('catePlusForm').submit();
		g_box_plus.close();
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
	
}
/**
 * 修改商品信息弹出.
 * @param {String} posId
 */
function modifyGoodsInfo(goodsId){

    setTable();
    // 该行变色标记
    selectLine('table_goodsList');
    $('flag').innerHTML=0;
	$('myInnerPage').src = 'yd0040ModifyGoodsInfo.action?'+'goodsId=' + goodsId;

}


/**
 * 追加商品弹出.
 */
function plusGoods(){

    $('flag').innerHTML=1;
 	$('myInnerPage').src = 'yd0040PlusGoods.action?'+'goodsCateId=' + $F('goodsCateId');

}

/**
 * 商品排序弹出.
 */
function sortGoods(){

   	g_box_sort.Popup();
    var url = 'yd0040GoodsSort.action';
    var pars = 'goodsCateId=' + $F('goodsCateId');
	pars = addStamp(pars);
    new Ajax.Updater('div_goods_sort', url, {
        method: 'get',
		parameters: pars,
        onComplete: function(response){
			
			if(checkException(response)){
				
				return;
			}
			g_box_sort.loaded();
        }
    });
}
/**
 * 职位顺序上移.
 */
function moveUp(){
    var selectObj = $('goodsSort');
    var theObjOptions = selectObj.options;
    for (var i = 1; i < theObjOptions.length; i++) {
        if (theObjOptions[i].selected && !theObjOptions[i - 1].selected) {
            swapOptionProperties(theObjOptions[i], theObjOptions[i - 1]);
        }
    }
}
/**
 * 职位顺序下移.
 */
function moveDown(){
    var selectObj = $('goodsSort');
    var theObjOptions = selectObj.options;
    for (var i = theObjOptions.length - 2; i > -1; i--) {
        if (theObjOptions[i].selected && !theObjOptions[i + 1].selected) {
            swapOptionProperties(theObjOptions[i], theObjOptions[i + 1]);
        }
    }
}

/**
 *顺序交换.
 */
function swapOptionProperties(option1, option2){
    var tempStr = option1.value;
    option1.value = option2.value;
    option2.value = tempStr;
    tempStr = option1.text;
    option1.text = option2.text;
    option2.text = tempStr;
    tempStr = option1.selected;
    option1.selected = option2.selected;
    option2.selected = tempStr;
}

/**
 * 提交商品排序.
 */
function submitGoodsSort(){
	
    var selectObj = $('goodsSort');
    var theObjOptions = selectObj.options;
    var goodsSort = '';
    for (var i = 0; i < theObjOptions.length; i++) {
        goodsSort = goodsSort + ',' + theObjOptions[i].value;
    }
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
	   
	    var url = 'yd0040UpdgoodsSort.action';
        var pars = 'goodsSort=' + goodsSort+'&goodsCateId=' + $F('goodsCateId');
        
        new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
            onComplete: function(response){
			
				if(checkException(response)){
					
					return;
				}
				g_box_sort.close()
				getGoodsInfoList()
			}
        });
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}
