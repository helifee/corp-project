/**
 *初期画面加载
 */
function initForm(){
	var storeUrl = 'yd0040FindStoreLst.action?goodsCateId=' + parent.$F('goodsCateId');
	new JsContentFilter('store', storeUrl, 'gpsStoreList');
	// 无刷新文件上传
    new JsFileUpload({
        fileInputId: 'upload', // file控件ID
        backVarName: 'fileName', // 储存路径的隐藏控件ID
        eventElementId: 'uploadButton', // 上传图片按钮ID
        onSuccess: function(){ // 成功返回执行方法
            $('goodsImg').src = getTempUrl($('fileName').value);
        }
    });
    var img = $('goodsImg');
    if (!$('fileName').value && $('goodsImgId').value) {
        img.src = '../gps/yd0040GetImage.action?fileName=' + $('goodsImgId').value;
    }
    else if($('fileName').value){
    	img.src = getTempUrl($('fileName').value);
    }
    else {
        img.src = '../images/gps/pho1.png';
    }
	
	$('goodsCateName').disable();
	initValidation('goodsInfoForm');
    
	if (parent.$('flag').innerHTML==1){
		
		$('goodsSwitch').checked = true;
	}
	
	if ($('goodsSwitch').value == 1) {
                $('goodsSwitch').checked = true;
     }
	 addDoubleCheck('goodsPrice',getMessage('js.com.warning.0014','商品售价',0.01,999.99),0.01,999.99)
	 parent.g_box.Popup();
}

/**
 * 修改保存按钮.
 */
function submitModify(){
	
	//输入校验
    if (!checkForm('goodsInfoForm')) {
        return;
    }
	MsgBox.confirm(getMessage('js.com.info.0003'), '确认对话框', function(){
	   
	  if ($('goodsSwitch').checked == true) {
            $('goodsSwitch').value = '1';
        }
	   var url = 'yd0040ModifyGoods.action';
       var pars = $('goodsInfoForm').serialize();
		new Ajax.Request(url, {
		            method: 'post',
		            parameters: pars,
		            onComplete: function(response){
						
						if(checkException(response)){
				
							return;
						}
		                parent.myInnerPageClose();
		                parent.getGoodsInfoList();
		            },
		            onFailure: function(request){
					}
		        });
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}

/*
提交商品编辑画面保存按钮
*/
function creatPosInfo(){
	
	
	// 修改状态下
    if (parent.$('flag').innerHTML==0) {
        submitModify();
        
    // 新建状态下
    }
    else{
            submitCreate();
        }
	    
}

/**
 * 追加商品保存按钮.
 */
function submitCreate(){
	
    //输入校验
    if (!checkForm('goodsInfoForm')) {
        return;
    }
      MsgBox.confirm(getMessage('js.com.info.0002'), '确认对话框', function(){


		
		if ($('goodsSwitch').checked == true) {
		            $('goodsSwitch').value = '1';
		 }
		 
	   var url = 'yd0040AddGoodsInfo.action';
       var pars =$('goodsInfoForm').serialize() + '&goodsCateId=' + parent.$F('goodsCateId');
	  
		new Ajax.Request(url, {
		            method: 'post',
		            parameters: pars,
		            onComplete: function(response){
						if(checkException(response)){
							return;
						}
						parent.myInnerPageClose();
		                parent.getGoodsInfoList();
		            }
		        });
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
		
   

}