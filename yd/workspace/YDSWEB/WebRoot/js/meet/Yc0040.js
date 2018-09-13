/*
* 预约情况一览js
*/

// 画面初始化显示
 function  initform(){
		var pars = $('metInfoForm').serialize();
		$('oldParam').value = pars;
		// 在高度达到指定值时出现滚动条
		listColor('table_peoList', 450);
		// 修改Title加入当前的会议室名称
		$('_title_after').innerHTML = ($('_title_after').innerHTML+'【'+$F('metNm')+'】');
		
		if ($('radiobtnSpecifiedDate').checked) {
			$("startDate").enable();
			$("endDate").enable();
	} else {
			$("startDate").disable();
		    $("endDate").disable();		
	}
		//输入校验
      	addCustomCheck($('endDate'), getMessage('js.met.warning.0013'), 'datecheck1', function(value){  
			if($F('startDate') == '' && value == '' ){
				return false;  
			}
			else{
				return true;
			}   
		});  
        addCustomCheck($('endDate'), getMessage('js.com.warning.0006'), 'datecheck2', function(value){
			if ($F('startDate') != '' && value != '') {
				if ($F('startDate') > value) {
					return false;
	   			}
	   			else {
	   				return true;
	   			}
	   		}
	   		return true;
	   });
	// 会议室预约详细弹出层
	myPopbox01 = new PopupBox({
	
		// 唯一标志，相同页面中不可重复
		key: 'my01',
		
		// 标题内容，可用元素或字符串
		title: '会议修改',
		
		// 图标的CSS
		icon: 'img_opt opt_Relation',
	    
	    // 内容元素
		content: $('myPopContent01'),
		    
		// 显示位置，相当与z-index
		position: 3,
		    
		// 是否允许拖动
		drag: true,
		    
		// 是否需要加载动画
		loader: true,

		// 关闭后的回调，用于刷新页面等
		afterclose: function(){
			afterClose();
		}
	});
}

/**
 * 弹出层加载完成时调用的父页面接口 
 */
function popMetReserve(yc0030InitUrl){
	$('myInnerPage').src = yc0030InitUrl.unescapeHTML();
	myPopbox01.popup();
}

/**
 * 弹出层加载完成时调用的父页面接口 
 */
function myInnerPageLoaded(){
	myPopbox01.loaded();
}

/**
 * 弹出层关闭时调用的父页面接口
 */
function myInnerPageClose(){
	myPopbox01.close();
}

function checkDate(){
	checkInput('endDate');
}

 /**
  * 弹出层关闭后的回调，用于刷新页面等
  */
function afterClose(){
	location.href = 'yc0040Init.action?reloadFlg=1';
}

//查询按钮事件.
function searchMetInfo() {
	if(!checkForm('metInfoForm'))return;
	//加载动画
	showLoader();
		$("startDate").enable();
		$("endDate").enable();
		
	var url = 'yc0040FindMetLst.action';
	var pars = $('metInfoForm').serialize();
		$("startDate").disable();
	    $("endDate").disable();
	//把检索条件所在的form串行化后，设到隐藏控件oldParam中，
	//然后使用oldParam的值，进行检索。（点击下一页的时候也是用这个隐藏控件的值）
	$('oldParam').value = pars;
	pars = 'pageNumber=0&'+pars;
	pars = addStamp(pars);
	new Ajax.Updater('div_hy_meetlist', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(response) {
			hideLoader();
			if (checkException(response)) {
				return;
			}
	if ($('radiobtnSpecifiedDate').checked) {
		$("startDate").enable();
		$("endDate").enable();
	}
			// 在高度达到指定值时出现滚动条
			listColor('table_peoList', 450);
		}
	});
}


//点击 第几页时调用的提交函数。
function pagerCommonTag(pageUrl , pageNumber){
	
	//调用自己的具体实现 函数 ，该函数中必须至少包含pageUrl , pageNumber两个参数
	myOwnPagerSubmit(pageUrl , pageNumber);

}

//实现自己的分页提交。
function myOwnPagerSubmit(pageUrl , pageNumber){
	
	//从隐藏控件中取出上次使用的检索条件
	var pars = $('oldParam').value;
	//设定url以及其余参数
	var url = pageUrl +'&pageNumber=' + pageNumber + '&' +pars;
	new Ajax.Updater('div_hy_meetlist', url , {    
		   onLoading : function() {},
		   onSuccess : function(response) {},
		   onComplete : function(response) {
			   var flg = checkException(response);
			    if(!flg) {		    	
					listColor('table_peoList', 450);

			    }
		   }
	   });		
}

//radiobutton 选择显示情况.
function radioBoxChange(val){
	radioDate = val.value;
	var nowDate = new Date();
    var nowYear = nowDate.getFullYear();       //获取当前年份(2位)
    var nowMonth = nowDate.getMonth();         //获取当前月份
 	var nowWeek = nowDate.getDay();			   //获取当前星期
	
	if(radioDate=='currentDay'  ){
		$("startDate").disable();
	    $("endDate").disable();
		$("startDate").value = nowDate.pattern('yyyy-MM-dd');
		$("endDate").value = nowDate.pattern('yyyy-MM-dd') ;
	}
	if(radioDate=='currentWeek'   ){
		 var monday = (new Date(nowDate.getTime()-1000*60*60*24*(nowWeek - 1))).pattern('yyyy-MM-dd');//取周一日期
  		 var sunday = (new Date(nowDate.getTime()+1000*60*60*24*(7-nowWeek))).pattern('yyyy-MM-dd');//取周日日期
		$("startDate").disabled = true;
		$("endDate").disabled = true;
		$("startDate").value = monday;
		$("endDate").value = sunday ;
	}
	if(radioDate=='currentMonth' ){
		var newDate = new Date(nowYear,nowMonth+1,1);                //取下个月中的第一天	
		var monthFirst =  new Date(nowYear,nowMonth,1).pattern('yyyy-MM-dd'); //取当月第一天 日期
   		var monthLast = (new Date(newDate.getTime()-1000*60*60*24)).pattern('yyyy-MM-dd');//取当月最后一天日期
		$("startDate").disabled = true ;
		$("endDate").disabled = true ;
		$("startDate").value = monthFirst;
		$("endDate").value = monthLast ;
	}
	if(radioDate=='SpecifiedDate'  ){
		$("startDate").enable();
		$("endDate").enable();
		
	}
}
