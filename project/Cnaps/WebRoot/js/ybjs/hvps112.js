// JavaScript Document
 	var rvalues = new Array();
	var A103 = new Array();
	var A104 = new Array();
	var A106 = new Array();
	var A107 = new Array();
	var A200 = new Array();
	var A307 = new Array();
	//公共值
	var A09001 = {name:"09001",value:"其他"};
	//A103（国库同城交换净额清算）赋值
	var A03101 = {name:"03101",value:"国库同城交换净额清算"};
	A103 = [A03101];
	//A104（国库资金贷记划拨）赋值
	var A02201 = {name:"02201",value:"中央级预算收入"};
	var A02202 = {name:"02202",value:"省级预算收入"};
	var A02203 = {name:"02203",value:"地市级预算收入"};
	var A02204 = {name:"02204",value:"县级预算收入"};
	A104 = [A02201,A02202,A02203,A02204];
	//A106（支取发起基金）赋值
	var A03201 = {name:"03201",value:"支取发起基金"};
	A106 = [A03201];
	//A107（内地机构境外发行债券结算）赋值
	var A02111 = {name:"02111",value:"内地机构境外发行债券结算"};
	A107 = [A02111];
	//A200（行间资金汇划）赋值
	var A02118 = {name:"02118",value:"资金拆借"};
	var A02105 = {name:"02105",value:"资金调拨"};
	A200 = [A02118,A02105];
	//A307赋值
	var A02205 = {name:"02205",value:"国债兑付"};
	A307 = [A02205]; 
	//给级联数组赋值
	var HVPSA103 = {name:"A103",value:A103};
	var HVPSA104 = {name:"A104",value:A104};
	var HVPSA106 = {name:"A106",value:A106};
	var HVPSA107 = {name:"A107",value:A107};
	var HVPSA200 = {name:"A200",value:A200};
	var HVPSA307 = {name:"A307",value:A307};
	rvalues =  [HVPSA103,HVPSA104,HVPSA106,HVPSA107,HVPSA200,HVPSA307];
	//实现级联菜单显示 secondval 为二级菜单VAL 默认为空
 	function transferOfOrgan(temp,selectname,secondval){
 	if(temp=="")
 	{
 		temp="A103";
 	}
		for(var i=0;i < rvalues.length;i++){
			var hvps = rvalues[i];
			var x = hvps.name;
			var arr = hvps.value;
			if(x==temp ? true:false){
				var sel = document.getElementById(selectname);
				sel.options.length = 0;
				for(var j=0;j < arr.length;j++){
					var a = arr[j];
					if(a){
						var opt = document.createElement('option');
						
						 
						opt.setAttribute('value', a.name);
						opt.innerText = a.value;
						//判断二级菜单 不为空 就是修改或者复核时 选中二级菜单
						if(secondval!="")
						{
							if(a.name==secondval)
							{
								opt.selected="selected";
							}
						}
						sel.appendChild(opt);
					}
				}
			}
		}
	}
	//提交时的判断
	function textToValidate(){
		var msg = "@";
		var ywlxbm = document.getElementById('ywlxbmval').value;
		var ywzlbm = document.getElementById('select_input').value;
		var dddbsh = document.getElementById('hvps11201');
		//var jybsh = document.getElementById('hvps11202');
		var hbfh = document.getElementById('hvps11203');
		var jine = document.getElementById('hvps11204');
		var ywyxj = document.getElementById('hvps11205');
		var zjfl = document.getElementById('hvps11206');
		var zjll = document.getElementById('hvps11207');
		var zjqx = document.getElementById('hvps11208');
		var fuyan = document.getElementById('hvps11209');
		var fkrmc = document.getElementById('hvps11210');
		var fkrzh = document.getElementById('hvps11211');
		var fkrkhhhh = document.getElementById('hvps11212');
		var fkqshhh = document.getElementById('hvps11213');
		var fkhhh = document.getElementById('hvps11214');
		var skrmc = document.getElementById('hvps11215');
		var skrzh = document.getElementById('hvps11216');
		var skrkhhhh = document.getElementById('hvps11217');
		var skqshhh = document.getElementById('hvps11218');
		var skhhh = document.getElementById('hvps11219');
		if(isNull(trim(dddbsh.value))){
			msg += dddbsh.title+"不能为空！@";
		}
		//if(isNull(trim(jybsh.value))){
		//	msg += jybsh.title+"不能为空！@";
		//}
		if(isNull(trim(hbfh.value))){
			msg += hbfh.title+"不能为空！@";
		}
		if(isNull(trim(jine.value))){
			msg += jine.title+"不能为空！@";
		}
		if(isNull(trim(ywyxj.value))){
			msg += ywyxj.title+"不能为空！@";
		}
		if(validatehh(trim(fkhhh.value))){
			msg += fkhhh.title+"必须是12位数字！@";
		}
		if(validatehh(trim(fkqshhh.value))){
			msg += fkqshhh.title+"必须是12位数字！@";
		}
		if(validatehh(trim(skhhh.value))){
			msg += skhhh.title+"必须是12位数字！@";
		}
		if(validatehh(trim(skqshhh.value))){
			msg += skqshhh.title+"必须是12位数字！@";
		}
		if(trim(ywlxbm)=="A103"){
			msg = validateA103(fuyan,msg);
		}else if(trim(ywlxbm)=="A104"){
			msg = validateA104(msg);
		}else if(trim(ywlxbm)=="A106"){
			msg = validateA106(ywzlbm,fkrmc,fkrzh,fkrkhhhh,skrmc,skrzh,skrkhhhh,msg);
		}else if(trim(ywlxbm)=="A107"){
			msg = validateA107(fkrmc,fkrzh,fkrkhhhh,skrmc,skrzh,skrkhhhh,msg);
		}else if(trim(ywlxbm)=="A200"){
			msg = validateA200(zjfl,zjll,zjqx,msg);
		}else if(trim(ywlxbm)=="A307"){
			msg = validateA307(msg);
		}
		return msg;
	}
	
	function validateA103(fuyan,msg){
		if(isNull(fuyan.value)){
			msg += fuyan.title+"不能为空！@";
		}
		return msg;
	}
	
	function validateA104(msg){
		
		return msg;
	}
	
	function validateA106(ywzlbm,fkrmc,fkrzh,fkrkhhhh,skrmc,skrzh,skrkhhhh,msg){
		if(trim(ywzlbm)!="03201"){
			if(isNull(fkrmc.value)){
				msg += fkrmc.title+"不能为空！@";
			}
			if(isNull(fkrzh.value)){
				msg += fkrzh.title+"不能为空！@";
			}
			if(validatehh(trim(fkrkhhhh.value))){
				msg += fkrkhhhh.title+"必须是12位数字！@";
			}
			if(isNull(skrmc.value)){
				msg += skrmc.title+"不能为空！@";
			}
			if(isNull(skrzh.value)){
				msg += skrzh.title+"不能为空！@";
			}
			if(validatehh(trim(skrkhhhh.value))){
				msg += skrkhhhh.title+"必须是12位数字！@";
			}
		}
		return msg;
	}
	
	function validateA107(fkrmc,fkrzh,fkrkhhhh,skrmc,skrzh,skrkhhhh,msg){
		if(isNull(fkrmc.value)){
			msg += fkrmc.title+"不能为空！@";
		}
		if(isNull(fkrzh.value)){
			msg += fkrzh.title+"不能为空！@";
		}
		if(validatehh(trim(fkrkhhhh.value))){
			msg += fkrkhhhh.title+"必须是12位数字！@";
		}
		if(isNull(skrmc.value)){
			msg += skrmc.title+"不能为空！@";
		}
		if(isNull(skrzh.value)){
			msg += skrzh.title+"不能为空！@";
		}
		if(validatehh(trim(skrkhhhh.value))){
			msg += skrkhhhh.title+"必须是12位数字！@";
		}
		return msg;
	}
	
	function validateA200(zjfl,zjll,zjqx,msg){
		if(isNull(zjfl.value)){
			msg += zjfl.title+"不能为空！@";
		}
		if(isNull(zjll.value)){
			msg += zjll.title+"不能为空！@";
		}
		if(isNull(zjqx.value)){
			msg += zjqx.title+"不能为空！@";
		}
		return msg;
	}
	
	function validateA307(msg){
		
		return msg;
	}
	
	