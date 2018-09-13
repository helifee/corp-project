

 var svalues = new Array();
 var selecthvps = new Array();
 var selectbeps = new Array();
 
 var h01 = {name:"01",value:"现金汇款"}; 
 var h02 = {name:"02",value:"委托收款(划回)"}; 
 var h03 = {name:"03",value:"托付承兑(划回)"}; 
 var h04 = {name:"04",value:"公益性资金划拨"}; 
 var h05 = {name:"05",value:"国库汇款"}; 
 var h06 = {name:"02",value:"国库贷记资金划拨"}; 
 var h07 = {name:"02",value:"缴费业务"}; 
 
 selecthvps =[h01,h02,h03,h04,h05,h06,h07];
 selectbeps=[h01,h02];
 
 var HVPS={name:"selecthvps",value:selecthvps};
 var BEPS={name:"selectbeps",value:selectbeps};
 
 svalues =[HVPS,BEPS];
    

//选择大小额 显示不同的业务类型
 	function selecthvpsbeps(temp,selectname){
 	
 		var sel = document.getElementById(selectname);
		for(var i=0;i < svalues.length;i++){
			var hvps = svalues[i];
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