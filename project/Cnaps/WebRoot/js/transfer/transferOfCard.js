// JavaScript Document
 	var rvalues = new Array();
	var A100 = new Array();
	var A108 = new Array();
	var A109 = new Array();
	var A110 = new Array();
	var A201 = new Array();
	var A202 = new Array();
	var A111 = new Array();
	var A112 = new Array();
	var A113 = new Array();
	var A101 = new Array();
	var A114 = new Array();
	var A102 = new Array();
	var A307 = new Array();
	var A104 = new Array();
	var A103 = new Array();
	var A106 = new Array();
	var A115 = new Array();
	var A116 = new Array();
	var A117 = new Array();
	var A113 = new Array();
	var A200 = new Array();
	var A400 = new Array();
	var A301 = new Array(); 
	
	
	
	//公共值
	var A09001 = {name:"09001",value:"其他"};
	
	var A02102={name:"02102",value:"普通汇兑"};
	A100 =[A02102]; //普通汇兑
	
	var A02101 = {name:"02101",value:"现金汇款"};
	A108 = [A02101];
	
	var A02106 = {name:"02106",value:"委托收款（划回）"};
	A109 = [A02106];
	
	var A02107 = {name:"02107",value:"托收承付（划回）"};
	A110 = [A02107];
	
	var A03401 = {name:"03401",value:"支票"};
	A201 = [A03401];
	
	var A02901 = {name:"02901",value:"银行汇票资金移存"};
	var A02902 = {name:"02902",value:"银行汇票资金清算"};
	var A02903 = {name:"02903",value:"银行汇票资金多余划回"};
	var A02904 = {name:"02904",value:"银行汇票资金未用退回"};
	A202=[A02901,A02902,A02903,A02904];
	
	var A03404 = {name:"03404",value:"银行承兑汇票"};
	var A03403 = {name:"03403",value:"商业承兑汇票"};
	A111=[A03404,A03403]; //商业汇票
	
	var A02104 = {name:"02104",value:"外汇清算"};
	A112=[A02104]; //外汇清算
	
	var A02112 ={name:"02112",value:"货物贸易结算"};
	var A02113 ={name:"02113",value:"货物贸易结算退款"};
	var A02114 ={name:"02114",value:"服务贸易结算"};
	var A02115 ={name:"02115",value:"服务贸易结算退款"};
	var A02116 ={name:"02116",value:"资本项下跨境支付"};
	var A02117 ={name:"02117",value:"资本项下跨境支付退款"};
	A113 =[A02112,A02113,A02114,A02115,A02116,A02117];
	
	var A01300 ={name:"01300",value:"慈善捐款"};
	A101=[A01300,A09001];
	
	var A02122={name:"02122",value:"人行跨区域票据交换轧差净额"};
	A114=[A02122];
	
	var A03001={name:"03001",value:"国库汇款"};
	A102=[A03001];
	
	var A02205={name:"02205",value:"国债兑付"};
	A307=[A02205]; 
	
	var A03101={name:"03101",value:"国库同城交换净额清算"};
	A103=[A03101]; 
	
	var A02201={name:"02201",value:"中央级预算收入"};
	var A02202={name:"02202",value:"省级预算收入"};
	var A02203={name:"02203",value:"地市级预算收入"};
	var A02204={name:"02204",value:"县级预算收入"};
	A104=[A02201,A02202,A02203,A02204,A09001];
	
	var A03201={name:"03201",value:"支取发行基金"};
	A106=[A03201];
	
	var A04101={name:"04101",value:"再贷款"};
	A115=[A04101];
	
	var A04001={name:"04001",value:"再贴现"};
	A116=[A04001];
	
	var A02704={name:"02704",value:"买断式转贴现"};
	var A02705={name:"02705",value:"回购式转贴现"};
	var A02706={name:"02706",value:"回购式转贴现赎回"};
	A117=[A02704,A02705,A02706];
	
	var A02118={name:"02118",value:"场内资金拆借"};
	var A02119={name:"02119",value:"场内资金拆借还款"};
	var A02120={name:"02120",value:"场外资金拆借"};
	var A02121={name:"02121",value:"场外资金拆借还款"};
	var A02105={name:"02105",value:"资金调拨"};
	A200=[A02118,A02119,A02120,A02121,A02105];
	
	

	var A01400 ={name:"01400",value:"缴费"};
	A301=[A01400];
	
	A400=[A09001];//其他
	
	
	
	
	//给级联数组赋值
	var HVPSA100 = {name:"A100",value:A100};
	var HVPSA108 = {name:"A108",value:A108};
	var HVPSA109 = {name:"A109",value:A109};
	var HVPSA110 = {name:"A110",value:A110};
	var HVPSA201 = {name:"A201",value:A201};
	var HVPSA202 = {name:"A202",value:A202};
	var HVPSA111 = {name:"A111",value:A111};
	var HVPSA112 = {name:"A112",value:A112};
	var HVPSA101 = {name:"A101",value:A101};
	var HVPSA114 = {name:"A114",value:A114};
	var HVPSA102 = {name:"A102",value:A102};
	var HVPSA307 = {name:"A307",value:A307};
	var HVPSA104 = {name:"A104",value:A104};
	var HVPSA103 = {name:"A103",value:A103};
	var HVPSA106 = {name:"A106",value:A106};
	var HVPSA115 = {name:"A115",value:A115};
	var HVPSA116 = {name:"A116",value:A116};
	var HVPSA117 = {name:"A117",value:A117};
	var HVPSA113 = {name:"A113",value:A113};
	var HVPSA200 = {name:"A200",value:A200};
	var HVPSA400 = {name:"A400",value:A400};
	var HVPSA301 = {name:"A301",value:A301};
	
	rvalues =  [HVPSA100,HVPSA108,HVPSA109,HVPSA110,HVPSA201,HVPSA202,HVPSA111,HVPSA112,HVPSA101,HVPSA114,HVPSA102,HVPSA307,HVPSA104,
	HVPSA103,HVPSA106,HVPSA115,HVPSA116,HVPSA117,HVPSA113,HVPSA200,HVPSA400,HVPSA301];

	//根据要求显示输入框
	
	//A109 委托收款(划回)
	var A1000211_67 = ['A1091','A1092'];
	//A110(-托收承付（划回）)
	var A10502108 = ['A1101','A1102','A1103','A1104'];
	//A301-(缴费业务)
	var A2020290_1 = ['A3011','A3012'];
	//A104-国库资金贷记划拨
	var A2020290_2 = ['A1041','A1042','A1043','A1044','A1045','A1046'];
	//没有附加项
	var A0000 = ['A0000'];
	
	//是否需要添加输入项 
	var isA109 = ['02106']; 
	var isA110 = ['02107'];
	var isA301 = ['01400'];
	var isA1041 = ['02201'];
	var isA1042 = ['02202'];
	var isA1043 = ['02203'];
	var isA1044 = ['02204'];
	var isA1045 = ['09001'];
	
	
	
	var syscodes =new Array();
	var HVPS = new Array();
	var BEPS = new Array();
	
	var PA100 = {name:"A100",value:"普通汇兑"};
	var PA109 = {name:"A109",value:"委托收款（划回"};
	var PA110 = {name:"A110",value:"托收承付（划回）"};
	var PA201 = {name:"A201",value:"支票"};
	var PA202 = {name:"A202",value:"银行汇票"};//
	var PA111 = {name:"A111",value:"商业汇票"};//
	var PA112 = {name:"A112",value:"外汇清算"};//
	var PA113 = {name:"A113",value:"跨境支付"};//
	var PA101 = {name:"A101",value:"公益性资金汇划"};//
	var PA114 = {name:"A114",value:"人行跨区域票据交换轧差净额"};//
	var PA102 = {name:"A102",value:"国库汇款"};
	var PA307 = {name:"A307",value:"国库资金国债兑付贷记划拨"};
	var PA103 = {name:"A103",value:"国库同城交换净额清算"};
	var PA106 = {name:"A106",value:"支取发行基金"};
	var PA115 = {name:"A115",value:"再贷款"};//
	var PA116 = {name:"A116",value:"再贴现"};//
	var PA117 = {name:"A117",value:"票据转贴现"};//
	var PA113 = {name:"A113",value:"跨境支付"};//
	var PA200 = {name:"A200",value:"行间资金汇划"};
	
	var PA400 = {name:"A400",value:"其他"};
	var PA301 = {name:"A301",value:"缴费业务"};

    HVPS=[PA109,PA110,PA101,PA102];
    
    BEPS=[PA109,PA110,PA101,PA102,PA301];
	
	
	//给级联数组赋值
	var HVPS = {name:"HVPS",value:HVPS};
	var BEPS = {name:"BEPS",value:BEPS};
	syscodes=[HVPS,BEPS];
	
	function selectsyscode(temp,selectname){
	
		var sel = document.getElementById(selectname);
			for(var i=0;i < syscodes.length;i++){
				var hvps = syscodes[i];
				var x = hvps.name;
				var arr = hvps.value;
				if(x==temp ? true:false){
					sel.options.length = 0;
					for(var j=0;j < arr.length;j++){
						var a = arr[j];
						if(a){
							var opt = document.createElement('option');
							opt.setAttribute('value', a.name);
							opt.innerText = a.value;
							sel.appendChild(opt);
						}
					}
				}
			}
				var temp = document.getElementById('ywlxbmval').value;
				transferOfClient(temp,'select_input');
	
	}
	function selectsyscode1(temp,selectname){
	
		var sel = document.getElementById(selectname);
			for(var i=0;i < syscodes.length;i++){
				var hvps = syscodes[i];
				var x = hvps.name;
				var arr = hvps.value;
				if(x==temp ? true:false){
					sel.options.length = 0;
					for(var j=0;j < arr.length;j++){
						var a = arr[j];
						if(a){
							var opt = document.createElement('option');
							opt.setAttribute('value', a.name);
							opt.innerText = a.value;
							sel.appendChild(opt);
						}
					}
				}
			}
				
	
	}
	
	
	
	//选择业务类型 显示不同的业务种类
 	function transferOfClient(temp,selectname){
 	
 		var sel = document.getElementById(selectname);
		for(var i=0;i < rvalues.length;i++){
			var hvps = rvalues[i];
			var x = hvps.name;
			var arr = hvps.value;
			if(x==temp ? true:false){
				sel.options.length = 0;
				for(var j=0;j < arr.length;j++){
					var a = arr[j];
					if(a){
						var opt = document.createElement('option');
						opt.setAttribute('value', a.name);
						opt.innerText = a.value;
						sel.appendChild(opt);
					}
				}
			}
		}
		isDisplayToInline(sel.value);
	}
	
	
	
	
	//显示隐藏域
	function isDisplayToInline(temp){
	   
		signval = document.getElementById("signval").value; 
		var alist = [];
		//将所有的输入框数组集群
		var lists = A1000211_67.concat(A10502108).concat(A2020290_1).concat(A2020290_2).concat(A0000);
		//将所有的输入框滞空
		if(signval=="sign0"){
			trTextVelueToNull(lists);
		}
		//将所有的隐藏输入框隐藏
		arrayToFor(lists);
		if(isEntity(temp,isA109)){
			alist = A1000211_67;//显示02106需要显示的输入框
		}else if(isEntity(temp,isA110)){
			alist = A10502108;//显示02108需要显示的输入框
		}else if(isEntity(temp,isA301)){
			alist = A2020290_1;//显示02901中需要显示的输入框
		}else if(isEntity(temp,isA1041)){
			alist = A2020290_2;//显示02902中需要显示的输入框
		}else if(isEntity(temp,isA1042)){
			alist = A2020290_2;//显示02903中需要显示的输入框
		}else if(isEntity(temp,isA1043)){
			alist = A2020290_2;//显示02904中需要显示的输入框
		
		}else if(isEntity(temp,isA1044)){
			alist = A2020290_2;//显示02904中需要显示的输入框
		}else{
			alist = A0000;
		}
		for(var j=0;j<alist.length;j++){
			document.getElementById(alist[j]).style.display="inline";//循环显示
		}
	}
	//将所有的隐藏输入框隐藏
	function arrayToFor(arr){
		for(var i=0;i<arr.length;i++){
			document.getElementById(arr[i]).style.display="none";
		}
	}
	//将所有的输入框滞空
	function trTextVelueToNull(alist){
	
		for(var i=0;i<alist.length;i++){
			for(var j=1;j<3;j++){
				var temp = "";
				if(alist[i]=="A0000"){
					return ;
				}else{
					temp = alist[i]+j;
				}
				if(document.getElementById(temp)!=null){
				document.getElementById(temp).value="";
				}
				
			}
		}
	}
	
	function isEntity(temp,val){
		var boo = false;
		for(var i=0;i<val.length;i++){
			if(temp==val[i]){
				boo = true;
			}
		}
		return boo;
	}
	
//提交时的判断
	function validate(){
		var msg = "@";
		var ywlxbm = document.getElementById('ywlxbmval').value;//业务类型编码 
		var ywzlbm = document.getElementById('select_input').value;//业务种类编码
		var bzdm = document.getElementById('bzdm');//币种代码
		var hkje = document.getElementById('hkje');//汇款金额
		var sxf = document.getElementById('sxf');//手续费
		var ydf = document.getElementById('ydf');//邮电费
		var ze = document.getElementById('ze');//总额
		var xth = document.getElementById('xth');//系统号
		var yxj = document.getElementById('yxj');//优先级
		var fkrzh = document.getElementById('fkrzh');//付款人账号
		var fkrmc = document.getElementById('fkrmc');//付款人名称
		var fkrkhhhh = document.getElementById('fkrkhhhh');//付款人开户行行号
		var fkqshhh = document.getElementById('fkqshhh');//付款清算行行号
		var fkhhh = document.getElementById('fkhhh');//付款行行号
		var skrzh = document.getElementById('skrzh');//收款人账号
		var skrmc = document.getElementById('skrmc');//收款人名称
		var skhhh = document.getElementById('skhhh');//收款行行号
		var skhmc = document.getElementById('skhmc');//收款人名称
		var sgrzjh = document.getElementById('sgrzjh');//付款人证件号
		var zjlx = document.getElementById('zjlx');//证件类型
		var sqrlxdh = document.getElementById('sqrlxdh');//付款人电话
		


		
		if(isNull(trim(sgrzjh.value))){
			msg += sgrzjh.title+"不能为空！@";
		}
		if(isNull(trim(zjlx.value))){
			msg += zjlx.title+"不能为空！@";
		}
		if(isNull(trim(sqrlxdh.value))){
			msg += sqrlxdh.title+"不能为空！@";
		}
		
		if(isNull(trim(hkje.value))){
			msg += hkje.title+"不能为空！@";
		}
		

		if(isNull(trim(ze.value))){
			msg += ze.title+"不能为空！@";
		}
		
		
		if(isNull(trim(fkrzh.value))){
			msg += fkrzh.title+"不能为空！@";
		}
		if(isNull(trim(fkrmc.value))){
			msg += fkrmc.title+"不能为空！@";
		}
		
		if(isNull(trim(fkrkhhhh.value))){
			msg += fkrkhhhh.title+"不能为空！@";
		}
		if(isNull(trim(fkqshhh.value))){
			msg += fkqshhh.title+"不能为空！@";
		}
		if(isNull(trim(fkhhh.value))){
			msg += fkhhh.title+"不能为空！@";
		}
		
		
		if(isNull(trim(skhhh.value))){
			msg += skhhh.title+"不能为空！@";
		}
		if(isNull(trim(skhmc.value))){
			msg += skhmc.title+"不能为空！@";
		}
		
		
	
		if(ywlxbm=="A109"){  //委托收款（划回）的校验
			msg = validateA109(msg);
		}
		else if(ywlxbm=="A110"){  //托收承付（划回）
			msg = validateA110(msg);
		}else if(ywlxbm=="A301"){ //缴费业务
			msg = validateA301(msg);
			
		}else if(ywlxbm=="A104"){//国库资金贷记划拨
			msg = validateA104(msg);
		}
		return msg;
	}
	
	
	//委托收款（划回）的校验
	function validateA109(msg){
	 var pjrq109 = document.getElementById('pjrq109');
     var pjzl109 = document.getElementById('pjzl109');
     var pjhm109 = document.getElementById('pjhm109');
     
      if(isNull(trim(pjrq109.value))){
			msg += pjrq109.title+"不能为空！@";
		}
		
	if(isNull(trim(pjzl109.value))){
			msg += pjzl109.title+"不能为空！@";
		}
		
	if(isNull(trim(pjhm109.value))){
			msg += pjhm109.title+"不能为空！@";
		}
     
     return msg;
	}
	
	
	//委托收款（划回）的校验
	function validateA110(msg){
	 var pjrq110 = document.getElementById('pjrq110');//票据日期
     var pjhm110 = document.getElementById('pjhm110');// 票据号码
     var pcjje110 = document.getElementById('pcjje110');//赔偿金金额
     var jfjje110 = document.getElementById('jfjje110');//拒付金金额
     
      if(isNull(trim(pjrq110.value))){
			msg += pjrq110.title+"不能为空！@";
		}
		
	if(isNull(trim(pjhm110.value))){
			msg += pjhm110.title+"不能为空！@";
		}
		
	if(isNull(trim(pcjje110.value))){
			msg += pcjje110.title+"不能为空！@";
		}
	 	
     if(isNull(trim(jfjje110.value))){
			msg += jfjje110.title+"不能为空！@";
		}
     return msg;
	}
	
	//支票 校验
	function validateA201(msg){
	var pjrq201 = document.getElementById('pjrq201');//票据日期
	var cprmc201 = document.getElementById('cprmc201');//出票人名称
	var pjje201 = document.getElementById('pjje201');//票据金额
	var pj201 = document.getElementById('pj201');//票据日期
	var pjzs201 = document.getElementById('pjzs201');//票据日期
	
	if(isNull(trim(pjrq201.value))){
			msg += pjrq201.title+"不能为空！@";
	}
	if(isNull(trim(cprmc201.value))){
			msg += cprmc201.title+"不能为空！@";
	}
	if(isNull(trim(pjje201.value))){
			msg += pjje201.title+"不能为空！@";
	}
	if(isNull(trim(pj201.value))){
			msg += pj201.title+"不能为空！@";
	}
	if(isNull(trim(pjzs201.value))){
			msg += pjzs201.title+"不能为空！@";
	}
			
     return msg;
	
	}
	
	
	//缴费业务 校验
	function validateA301(msg){
	var sfdwlsh301 = document.getElementById('sfdwlsh301');//收费单位流水号
	var ssqj301 = document.getElementById('ssqj301');//所属期间
	var jflx301 = document.getElementById('jflx301');//交费类型
	var sfyy301 = document.getElementById('sfyy301');//所属附言
	
	if(isNull(trim(sfdwlsh301.value))){
			msg += sfdwlsh301.title+"不能为空！@";
	}
	if(isNull(trim(ssqj301.value))){
			msg += ssqj301.title+"不能为空！@";
	}
	if(isNull(trim(jflx301.value))){
			msg += jflx301.title+"不能为空！@";
	}
	if(isNull(trim(sfyy301.value))){
			msg += sfyy301.title+"不能为空！@";
	}
	
	 return msg;
	
	}
	
	
	//-国库资金贷记划拨 校验
	function validateA104(msg){
	var mxhzje104 = document.getElementById('mxhzje104');//明细汇总金额
	var sbgkdm104 = document.getElementById('sbgkdm104');//上报国库代码
	var jsgkdm104 = document.getElementById('jsgkdm104');//接收国库代码
	var bbrq104 = document.getElementById('bbrq104');//报表日期
	var bbxh104 = document.getElementById('bbxh104');//报表序号
	var ysjb104 = document.getElementById('ysjb104');//预算级别
	var tzqbz104 = document.getElementById('tzqbz104');//调整期标志
	var yszl104 = document.getElementById('yszl104');//
	
	if(isNull(trim(mxhzje104.value))){
			msg += mxhzje104.title+"不能为空！@";
	}
	if(isNull(trim(sbgkdm104.value))){
			msg += sbgkdm104.title+"不能为空！@";
	}
	if(isNull(trim(jsgkdm104.value))){
			msg += jsgkdm104.title+"不能为空！@";
	}
	if(isNull(trim(bbrq104.value))){
			msg += bbrq104.title+"不能为空！@";
	}
	if(isNull(trim(bbxh104.value))){
			msg += bbxh104.title+"不能为空！@";
	}
	if(isNull(trim(ysjb104.value))){
			msg += ysjb104.title+"不能为空！@";
	}
	if(isNull(trim(tzqbz104.value))){
			msg += tzqbz104.title+"不能为空！@";
	}
	if(isNull(trim(yszl104.value))){
			msg += yszl104.title+"不能为空！@";
	}
	
	 return msg;
	
	}
	
	
	//用于修改 复核页面的下拉显示
	function transferOfClient1(temp,selectname,temp1){
 //getListnum();
 		var sel = document.getElementById(selectname);
 		
		for(var i=0;i < rvalues.length;i++){
			var hvps = rvalues[i];
			var x = hvps.name;
			var arr = hvps.value;
			if(x==temp ? true:false){
				sel.options.length = 0;
				for(var j=0;j < arr.length;j++){
					var a = arr[j];
					
					if(a){
					if(a.name==temp1){
						var opt = document.createElement('option');
						opt.setAttribute('value', a.name);
						opt.innerText = a.value;
						sel.appendChild(opt);
						}
					}
				}
			}
		}
		//isDisplayToInline1(sel.value);
	}
	function isDisplayToInline1(temp){
	   
		signval = document.getElementById("signval").value; 
		var alist = [];
		//将所有的输入框数组集群
		var lists = A1000211_67.concat(A10502108).concat(A20103401).concat(A2020290_1).concat(A2020290_2).concat(A2020290_3).concat(A2020290_4).concat(A0000);
		
		//将所有的隐藏输入框隐藏
		arrayToFor(lists);
		if(isEntity(temp,isA100)){
			alist = A1000211_67;//显示02116和02117需要显示的输入框
		}else if(isEntity(temp,isA105)){
			alist = A10502108;//显示02108需要显示的输入框
		}else if(isEntity(temp,isA201)){
			alist = A20103401;//显示03401需要显示的输入框
		}else if(isEntity(temp,isA2021)){
			alist = A2020290_1;//显示02901中需要显示的输入框
		}else if(isEntity(temp,isA2022)){
			alist = A2020290_2;//显示02902中需要显示的输入框
			document.getElementById("A20229113").style.display="none";
			document.getElementById("A20229114").style.display="none";
		}else if(isEntity(temp,isA2023)){
			alist = A2020290_3;//显示02903中需要显示的输入框
			document.getElementById("A20229113").style.display="inline";
			document.getElementById("A20229114").style.display="inline";
		}else if(isEntity(temp,isA2024)){
			alist = A2020290_4;//显示02904中需要显示的输入框
			document.getElementById("A20229113").style.display="inline";
			document.getElementById("A20229114").style.display="inline";
		}else{
			alist = A0000;
		}
		for(var j=0;j<alist.length;j++){
			document.getElementById(alist[j]).style.display="inline";//循环显示
		}
	}
	
	
	function changehkle(temp,id){
	if(temp=="A104"){
	
				document.getElementById(id).readOnly = true;
				}else{
				document.getElementById(id).readOnly = false;
				}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
