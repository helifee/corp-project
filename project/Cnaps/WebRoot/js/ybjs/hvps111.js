// JavaScript Document
 	var rvalues = new Array();
	var A100 = new Array();
	var A101 = new Array();
	var A102 = new Array();
	var A105 = new Array();
	var A201 = new Array();
	var A202 = new Array();
	var A307 = new Array();
	//����ֵ
	var A09001 = {name:"09001",value:"����"};
	//A100��ֵ
	var A02101 = {name:"02101",value:"�ֽ���"};
	var A02102 = {name:"02102",value:"��ͨ���"};
	var A02103 = {name:"02103",value:"����֧��"};
	var A02104 = {name:"02104",value:"�������"};
	var A02105 = {name:"02105",value:"�ʽ����"};
	var A02106 = {name:"02106",value:"ί���տ���أ�"};
	var A02107 = {name:"02107",value:"���ճи������أ�"};
	var A02110 = {name:"02110",value:"�ڵػ������ⷢ��ծȯ�Ҹ�"};
	var A02111 = {name:"02111",value:"�ڵػ������ⷢ��ծȯ����"};
	var A02112 = {name:"02112",value:"����ó�׽���"};
	var A02113 = {name:"02113",value:"����ó�׽����˿�"};
	var A02114 = {name:"02114",value:"����ó�׽���"};
	var A02115 = {name:"02115",value:"����ó�׽����˿�"};
	var A02116 = {name:"02116",value:"�������¿羳֧��"};
	var A02117 = {name:"02117",value:"�������¿羳֧���˿�"};
	A100 = [A02101,A02102,A02103,A02104,A02105,A02106,A02107,A02110,A02111,A02112,A02113,A02114,A02115,A02116,A02117,A09001];
	//A101��ֵ
	var A01300 = {name:"01300",value:"���ƾ��"};
	A101 = [A01300,A09001];
	//A102��ֵ
	var A03001 = {name:"03001",value:"������"};
	A102 = [A03001];
	//A105��ֵ
	var A02108 = {name:"02108",value:"�˻�"};
	A105 = [A02108];
	//A201��ֵ
	var A03401 = {name:"03401",value:"֧Ʊ"};
	A201 = [A03401];
	//A202��ֵ
	var A02901 = {name:"02901",value:"���л�Ʊ�ʽ��ƴ�"};
	var A02902 = {name:"02902",value:"���л�Ʊ�ʽ�����"};
	var A02903 = {name:"02903",value:"���л�Ʊ�ʽ���໮��"};
	var A02904 = {name:"02904",value:"���л�Ʊ�ʽ�δ���˻�"};
	A202 = [A02901,A02902,A02903,A02904];
	//A307��ֵ
	var A02205 = {name:"02205",value:"��ծ�Ҹ�"};
	A307 = [A02205]; 
	//���������鸳ֵ
	var HVPSA100 = {name:"A100",value:A100};
	var HVPSA101 = {name:"A101",value:A101};
	var HVPSA102 = {name:"A102",value:A102};
	var HVPSA105 = {name:"A105",value:A105};
	var HVPSA201 = {name:"A201",value:A201};
	var HVPSA202 = {name:"A202",value:A202};
	var HVPSA307 = {name:"A307",value:A307};
	rvalues =  [HVPSA100,HVPSA101,HVPSA102,HVPSA105,HVPSA201,HVPSA202,HVPSA307];

	//����Ҫ����ʾ�����
	var A1000211_67 = ['A1001','A1002','A1003','A1004','A1005'];
	var A10502108 = ['A1051','A1054'];
	var A20103401 = ['A2011','A2012','A2013'];
	var A2020290_1 = ['A2022902','A2022903','A2022904','A2022905','A2022906','A2022907','A2022908','A2022909'];
	var A2020290_2 = ['A2022902','A2022903','A2022904','A2022905','A2022906','A2022907','A2022908','A2022909',"A2022910","A2022911"];
	var A2020290_3 = ['A2022902','A2022903','A2022904','A2022905','A2022906','A2022907','A2022908','A2022909',"A2022910","A2022911","A2022912"];
	var A2020290_4 = ['A2022902','A2022903','A2022904','A2022905','A2022906','A2022907','A2022908','A2022909',"A2022910","A2022911","A2022912"];
	var A0000 = ['A0000'];
	
	//�Ƿ���Ҫ���������
	var isA100 = ['02116','02117'];
	var isA105 = ['02108'];
	var isA201 = ['03401'];
	var isA2021 = ['02901'];
	var isA2022 = ['02902'];
	var isA2023 = ['02903'];
	var isA2024 = ['02904'];
	
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
	
	function isDisplayToInline(temp){
	   
		signval = document.getElementById("signval").value; 
		var alist = [];
		//�����е���������鼯Ⱥ
		var lists = A1000211_67.concat(A10502108).concat(A20103401).concat(A2020290_1).concat(A2020290_2).concat(A2020290_3).concat(A2020290_4).concat(A0000);
		//�����е�������Ϳ�
		if(signval=="sign0"){
			trTextVelueToNull(lists);
		}
		//�����е��������������
		arrayToFor(lists);
		if(isEntity(temp,isA100)){
			alist = A1000211_67;//��ʾ02116��02117��Ҫ��ʾ�������
		}else if(isEntity(temp,isA105)){
			alist = A10502108;//��ʾ02108��Ҫ��ʾ�������
		}else if(isEntity(temp,isA201)){
			alist = A20103401;//��ʾ03401��Ҫ��ʾ�������
		}else if(isEntity(temp,isA2021)){
			alist = A2020290_1;//��ʾ02901����Ҫ��ʾ�������
		}else if(isEntity(temp,isA2022)){
			alist = A2020290_2;//��ʾ02902����Ҫ��ʾ�������
			document.getElementById("A20229113").style.display="none";
			document.getElementById("A20229114").style.display="none";
		}else if(isEntity(temp,isA2023)){
			alist = A2020290_3;//��ʾ02903����Ҫ��ʾ�������
			document.getElementById("A20229113").style.display="inline";
			document.getElementById("A20229114").style.display="inline";
		}else if(isEntity(temp,isA2024)){
			alist = A2020290_4;//��ʾ02904����Ҫ��ʾ�������
			document.getElementById("A20229113").style.display="inline";
			document.getElementById("A20229114").style.display="inline";
		}else{
			alist = A0000;
		}
		for(var j=0;j<alist.length;j++){
			document.getElementById(alist[j]).style.display="inline";//ѭ����ʾ
		}
	}
	//�����е��������������
	function arrayToFor(arr){
		for(var i=0;i<arr.length;i++){
			document.getElementById(arr[i]).style.display="none";
		}
	}
	//�����е�������Ϳ�
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
	
//�ύʱ���ж�
	function validate(){
		var msg = "@";
		var ywlxbm = document.getElementById('ywlxbmval').value;//ҵ�����ͱ��� 
		var ywzlbm = document.getElementById('select_input').value;//ҵ���������
		var dddbsh = document.getElementById('hvps11106');//�˵���
		var jybsh = document.getElementById('hvps11107');
		var hbfuh = document.getElementById('hvps11108');//������
		var jine = document.getElementById('hvps11109');//���
		var ywyxj = document.getElementById('hvps11110');//ҵ�����ȼ�
		var fkrmc = document.getElementById('hvps11111');//����������
		var fkrzh = document.getElementById('hvps11112');//�������˺�
		var fkrkhhhh = document.getElementById('hvps11113');//>�����˿������к�
		var fkqshhh = document.getElementById('hvps11114');//�������������к�
		var fkhhh = document.getElementById('hvps11115');//�������к�
		var skqshhh = document.getElementById('hvps11116');//�տ��������к�
		var skhhh = document.getElementById('hvps11117');//�տ����к�
		var skrmc = document.getElementById('hvps11118');//�տ�������
		var skrzh = document.getElementById('hvps11119');//�տ����˺�
		var skrkhhhh = document.getElementById('hvps11120');//�տ��˿������к�
		var beizhu = document.getElementById('hvps11121');//��ע


          if(isNull(trim(dddbsh.value))){
			msg += dddbsh.title+"����Ϊ�գ�@";
		}
		
		if(isNull(trim(hbfuh.value))){
			msg += hbfuh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(jine.value))){
			msg += jine.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(ywyxj.value))){
			msg += ywyxj.title+"����Ϊ�գ�@";
		}

      
		if(ywlxbm=="A100"){
			msg = validateA100(dddbsh,jybsh,hbfuh,jine,ywyxj,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,skqshhh,
			skhhh,skrmc,skrzh,skrkhhhh,beizhu,ywzlbm,msg);
		}else if(ywlxbm=="A101"){
			msg = validateA100(dddbsh,jybsh,hbfuh,jine,ywyxj,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,skqshhh,
			skhhh,skrmc,skrzh,skrkhhhh,beizhu,ywzlbm,msg);
		}else if(ywlxbm=="A102"){
			msg = validateA100(dddbsh,jybsh,hbfuh,jine,ywyxj,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,skqshhh,
			skhhh,skrmc,skrzh,skrkhhhh,beizhu,ywzlbm,msg);
			
		}else if(ywlxbm=="A201"){
			msg = validateA201(dddbsh,jybsh,hbfuh,jine,ywyxj,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,skqshhh,
			skhhh,skrmc,skrzh,skrkhhhh,beizhu,ywzlbm,msg);
			
		}else if(ywlxbm=="A202"){
			msg = validateA202(dddbsh,jybsh,hbfuh,jine,ywyxj,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,skqshhh,
			skhhh,skrmc,skrzh,skrkhhhh,beizhu,ywzlbm,msg);
		}
		return msg;
	}
	//�жϻ��ҵ�񡢹������ʽ�㻮�͹����� �������տ�����Ϣ����Ϊ��
	function validateA100(dddbsh,jybsh,hbfuh,jine,ywyxj,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,
						  skqshhh,skhhh,skrmc,skrzh,skrkhhhh,beizhu,val,msg){
		if(isNull(trim(fkrmc.value))){
			msg += fkrmc.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(fkrzh.value))){
			msg += fkrzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(fkrkhhhh.value))){
			msg += fkrkhhhh.title+"����Ϊ�գ�@";
		}
		
		if(isNull(trim(skrmc.value))){
			msg += skrmc.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(skrzh.value))){
			msg += skrzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(skrkhhhh.value))){
			msg += skrkhhhh.title+"����Ϊ�գ�@";
		}
		
		if(val=="02116" || val=="02117"){
			msg = validate02116_7(dddbsh,msg);
		}
		return msg;
	}
	
	function validate02116_7(dddbsh,msg){
		//var glywckh = document.getElementById('A10011');
		var ywfqzhhBICm = document.getElementById('A10021');//ҵ����ת����BIC��
		var ywfqzhhmc = document.getElementById('A10022');//ҵ����ת��������
		var ywjszhhBICm = document.getElementById('A10031');//ҵ�����ת����BIC��
		var ywjszhhmc = document.getElementById('A10032');//ҵ�����ת��������
		var kjywfy = document.getElementById('A10052');//�羳ҵ����
		
		if(isNull(trim(ywfqzhhBICm.value)) && isNull(trim(ywfqzhhmc.value))){
			msg += ywfqzhhBICm.title+"��"+ywfqzhhmc.title+"������дһ�@";
		}
		if(isNull(trim(ywjszhhBICm.value)) && isNull(trim(ywjszhhmc.value))){
			msg += ywjszhhBICm.title+"��"+ywjszhhmc.title+"������дһ�@";
		}
		if(isNull(trim(kjywfy.value))){
			msg += kjywfy.title+"����Ϊ�գ�@";
		}
		return msg;
	}
	//�ж��˻�ҵ��
	function validateA105(dddbsh,jybsh,hbfuh,jine,ywyxj,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,
						  skqshhh,skhhh,skrmc,skrzh,skrkhhhh,beizhu,val,msg){
		if(isNull(trim(fkrmc.value))){
			msg += fkrmc.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(fkrzh.value))){
			msg += fkrzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(skrmc.value))){
			msg += skrmc.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(skrzh.value))){
			msg += skrzh.title+"����Ϊ�գ�@";
		}
		if(val=="02108"){
			msg = validate02108(msg);
		}
		return msg;
	}
	
	function validate02108(msg){
		var yskrzh = document.getElementById('A10521');
		var yskrmc = document.getElementById('A10522');
		var yfkrzh = document.getElementById('A10531');
		var yfkrmc = document.getElementById('A10532');
		if(isNull(trim(yskrzh.value))){
			msg += yskrzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(yskrmc.value))){
			msg += yskrmc.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(yfkrzh.value))){
			msg += yfkrzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(yfkrmc.value))){
			msg += yfkrmc.title+"����Ϊ�գ�@";
		}
		return msg;
	}
	//�ж�֧Ʊҵ��
	function validateA201(dddbsh,jybsh,hbfuh,jine,ywyxj,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,
						  skqshhh,skhhh,skrmc,skrzh,skrkhhhh,beizhu,val,msg){
		if(isNull(trim(fkrmc.value))){
			msg += fkrmc.title+"����Ϊ�գ�@";
		}
		if(validatehh(trim(fkrkhhhh.value))){
			msg += fkrkhhhh.title+"������12λ���֣�@";
		}
		if(val=="03401"){
			msg = validate03401(dddbsh,fkrmc,fkrkhhhh,msg);
		}
		return msg;
	}
	
	function validate03401(dddbsh,fkrmc,fkrkhhhh,msg){
		var pjhm = document.getElementById('A20111');
		var pjrq = document.getElementById('A20112');
		var qfhhh = document.getElementById('A20121');
		var zpsqrmc = document.getElementById('A20122');
		var pjje = document.getElementById('A20131');
		var pjzs = document.getElementById('A20132');
		if(isNull(trim(pjhm.value))){
			msg += pjhm.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(pjrq.value))){
			msg += pjrq.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(qfhhh.value))){
			msg += qfhhh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(zpsqrmc.value))){
			msg += zpsqrmc.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(pjje.value))){
			msg += pjje.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(pjzs.value))){
			msg += pjzs.title+"����Ϊ�գ�@";
		}
		return msg;
	}
	//�ж����л�Ʊ�ʽ�㻮ҵ��
	function validateA202(dddbsh,jybsh,hbfuh,jine,ywyxj,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,
						  skqshhh,skhhh,skrmc,skrzh,skrkhhhh,beizhu,val,msg){
	 	if(trim(val)=="02901"){
	 		msg = validate02901(dddbsh,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,msg);
	 	}else if(trim(val)=="02902"){
	 		msg = validate02902(dddbsh,fkqshhh,skqshhh,skhhh,skrzh,skrmc,jine,msg);
	 	}else if(trim(val)=="02903"){
	 		msg = validate02903(dddbsh,fkqshhh,skqshhh,skhhh,skrzh,skrmc,msg);
	 	}else if(trim(val)=="02904"){
	 		msg = validate02904(dddbsh,fkqshhh,skqshhh,skhhh,skrzh,skrmc,msg);
	 	}
	 	return msg;
	}
	
	//У�����л�Ʊ�ʽ��ƴ�
	function validate02901(dddbsh,fkrmc,fkrzh,fkrkhhhh,fkqshhh,fkhhh,msg){
		//var fqqshhh = document.getElementById('A20229011');
		//var fqhhh = document.getElementById('A20229012');
		var hphm = document.getElementById('A20229021');
		var cprq = document.getElementById('A20229022');
		var hpmy = document.getElementById('A20229031');
		var hpzl = document.getElementById('A20229032');
		var cpje = document.getElementById('A20229041');
		var hpqfhhh = document.getElementById('A20229042');
		var hpsqrzh = document.getElementById('A20229051');
		var hpsqrmc = document.getElementById('A20229052');
		var hpskrmc = document.getElementById('A20229061');
		var zhcprkhh = document.getElementById('A20229062');
		var zhcprzh = document.getElementById('A20229071');
		var zhcprmc = document.getElementById('A20229072');
		var dyje = document.getElementById('A20229081');
		var sjjsje = document.getElementById('A20229082');
		var tsfkrq = document.getElementById('A20229091');
		var xjhpcfh = document.getElementById('A20229092');
		
		
		if(isNull(trim(hpmy.value))){
			msg += hpmy.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(hphm.value))){
			msg += hphm.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(hpzl.value))){
			msg += hpzl.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(cpje.value))){
			msg += cpje.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(hpqfhhh.value))){
			msg += hpqfhhh.title+"����Ϊ�գ���@";
		}
		if(isNull(trim(hpsqrzh.value))){
			msg += hpsqrzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(hpsqrmc.value))){
			msg += hpsqrmc.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(hpskrmc.value))){
			msg += hpskrmc.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(zhcprkhh.value))){
			msg += zhcprkhh.title+"����Ϊ�գ���@";
		}
		if(isNull(trim(zhcprzh.value))){
			msg += zhcprzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(zhcprmc.value))){
			msg += zhcprmc.title+"����Ϊ�գ�@";
		}
		return msg;
	}
	
	function validate02902(dddbsh,fkqshhh,skqshhh,skhhh,skrzh,skrmc,jine,msg){
		var hphm = document.getElementById('A20229021');
		var cprq = document.getElementById('A20229022');
		var hpmy = document.getElementById('A20229031');
		var hpzl = document.getElementById('A20229032');
		var cpje = document.getElementById('A20229041');
		var hpqfhhh = document.getElementById('A20229042');
		var hpsqrzh = document.getElementById('A20229051');
		var hpsqrmc = document.getElementById('A20229052');
		var hpskrmc = document.getElementById('A20229061');
		var zhcprkhh = document.getElementById('A20229062');
		var zhcprzh = document.getElementById('A20229071');
		var zhcprmc = document.getElementById('A20229072');
		var dyje = document.getElementById('A20229081');
		var sjjsje = document.getElementById('A20229082');
		var tsfkrq = document.getElementById('A20229091');
		var xjhpcfh = document.getElementById('A20229092');
		var cshhpclzx = document.getElementById('A20229101');
		var jsqshhh = document.getElementById('A20229102');
		var jshhh = document.getElementById('A20229111');
		if(isNull(trim(hphm.value))){
			msg += hphm.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(hpzl.value))){
			msg += hpzl.title+"����Ϊ�գ�@";
		}
		if(validatehh(trim(hpqfhhh.value))){
			msg += hpqfhhh.title+"������12λ���֣�@";
		}
		if(isNull(trim(hpsqrzh.value))){
			msg += hpsqrzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(hpsqrmc.value))){
			msg += hpsqrmc.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(dyje.value))){
			msg += dyje.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(sjjsje.value))){
			msg += sjjsje.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(cshhpclzx.value))){
			msg += cshhpclzx.title+"����Ϊ�գ�@";
		}
		if(validatehh(trim(jsqshhh.value))){
			msg += jsqshhh.title+"������12λ���֣�@";
		}
		if(validatehh(trim(jshhh.value))){
			msg += jshhh.title+"������12λ���֣�@";
		}
		return msg;
	}
	
	function validate02903(dddbsh,fkqshhh,skqshhh,skhhh,skrzh,skrmc,msg){
		var hphm = document.getElementById('A20229021');
		var cprq = document.getElementById('A20229022');
		var hpmy = document.getElementById('A20229031');
		var hpzl = document.getElementById('A20229032');
		var cpje = document.getElementById('A20229041');
		var hpqfhhh = document.getElementById('A20229042');
		var hpsqrzh = document.getElementById('A20229051');
		var hpsqrmc = document.getElementById('A20229052');
		var hpskrmc = document.getElementById('A20229061');
		var zhcprkhh = document.getElementById('A20229062');
		var zhcprzh = document.getElementById('A20229071');
		var zhcprmc = document.getElementById('A20229072');
		var dyje = document.getElementById('A20229081');
		var sjjsje = document.getElementById('A20229082');
		var tsfkrq = document.getElementById('A20229091');
		var xjhpcfh = document.getElementById('A20229092');
		var cshhpclzx = document.getElementById('A20229101');
		var jsqshhh = document.getElementById('A20229102');
		var jshhh = document.getElementById('A20229111');
		var yhpqfhhh = document.getElementById('A20229112');
		var yhpsqrzh = document.getElementById('A20229121');
		var yhpsqrmc = document.getElementById('A20229122');
		if(validatehh(trim(zhcprkhh.value))){
			msg += zhcprkhh.title+"������12λ���֣�@";
		}
		if(isNull(trim(zhcprzh.value))){
			msg += zhcprzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(zhcprmc.value))){
			msg += zhcprmc.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(sjjsje.value))){
			msg += sjjsje.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(cshhpclzx.value))){
			msg += cshhpclzx.title+"����Ϊ�գ�@";
		}
		if(validatehh(trim(jsqshhh.value))){
			msg += jsqshhh.title+"������12λ���֣�@";
		}
		if(validatehh(trim(jshhh.value))){
			msg += jshhh.title+"������12λ���֣�@";
		}
		if(validatehh(trim(yhpqfhhh.value))){
			msg += yhpqfhhh.title+"������12λ���֣�@";
		}
		if(isNull(trim(yhpsqrzh.value))){
			msg += yhpsqrzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(yhpsqrmc.value))){
			msg += yhpsqrmc.title+"����Ϊ�գ�@";
		}
		return msg;
	}
	
	function validate02904(dddbsh,fkqshhh,skqshhh,skhhh,skrzh,skrmc,msg){
		var hphm = document.getElementById('A20229021');
		var cprq = document.getElementById('A20229022');
		var hpmy = document.getElementById('A20229031');
		var hpzl = document.getElementById('A20229032');
		var cpje = document.getElementById('A20229041');
		var hpqfhhh = document.getElementById('A20229042');
		var hpsqrzh = document.getElementById('A20229051');
		var hpsqrmc = document.getElementById('A20229052');
		var hpskrmc = document.getElementById('A20229061');
		var zhcprkhh = document.getElementById('A20229062');
		var zhcprzh = document.getElementById('A20229071');
		var zhcprmc = document.getElementById('A20229072');
		var dyje = document.getElementById('A20229081');
		var sjjsje = document.getElementById('A20229082');
		var tsfkrq = document.getElementById('A20229091');
		var xjhpcfh = document.getElementById('A20229092');
		var cshhpclzx = document.getElementById('A20229101');
		var jsqshhh = document.getElementById('A20229102');
		var jshhh = document.getElementById('A20229111');
		var yhpqfhhh = document.getElementById('A20229112');
		var yhpsqrzh = document.getElementById('A20229121');
		var yhpsqrmc = document.getElementById('A20229122');
		if(isNull(trim(cshhpclzx.value))){
			msg += cshhpclzx.title+"����Ϊ�գ�@";
		}
		if(validatehh(trim(jsqshhh.value))){
			msg += jsqshhh.title+"������12λ���֣�@";
		}
		if(validatehh(trim(jshhh.value))){
			msg += jshhh.title+"������12λ���֣�@";
		}
		if(validatehh(trim(yhpqfhhh.value))){
			msg += yhpqfhhh.title+"������12λ���֣�@";
		}
		if(isNull(trim(yhpsqrzh.value))){
			msg += yhpsqrzh.title+"����Ϊ�գ�@";
		}
		if(isNull(trim(yhpsqrmc.value))){
			msg += yhpsqrmc.title+"����Ϊ�գ�@";
		}
		return msg;
	}
	
	
	//�����޸� ����ҳ���������ʾ
	function transferOfClient1(temp,selectname,temp1){
 	
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
		isDisplayToInline1(sel.value);
	}
	function isDisplayToInline1(temp){
	   
		signval = document.getElementById("signval").value; 
		var alist = [];
		//�����е���������鼯Ⱥ
		var lists = A1000211_67.concat(A10502108).concat(A20103401).concat(A2020290_1).concat(A2020290_2).concat(A2020290_3).concat(A2020290_4).concat(A0000);
		
		//�����е��������������
		arrayToFor(lists);
		if(isEntity(temp,isA100)){
			alist = A1000211_67;//��ʾ02116��02117��Ҫ��ʾ�������
		}else if(isEntity(temp,isA105)){
			alist = A10502108;//��ʾ02108��Ҫ��ʾ�������
		}else if(isEntity(temp,isA201)){
			alist = A20103401;//��ʾ03401��Ҫ��ʾ�������
		}else if(isEntity(temp,isA2021)){
			alist = A2020290_1;//��ʾ02901����Ҫ��ʾ�������
		}else if(isEntity(temp,isA2022)){
			alist = A2020290_2;//��ʾ02902����Ҫ��ʾ�������
			document.getElementById("A20229113").style.display="none";
			document.getElementById("A20229114").style.display="none";
		}else if(isEntity(temp,isA2023)){
			alist = A2020290_3;//��ʾ02903����Ҫ��ʾ�������
			document.getElementById("A20229113").style.display="inline";
			document.getElementById("A20229114").style.display="inline";
		}else if(isEntity(temp,isA2024)){
			alist = A2020290_4;//��ʾ02904����Ҫ��ʾ�������
			document.getElementById("A20229113").style.display="inline";
			document.getElementById("A20229114").style.display="inline";
		}else{
			alist = A0000;
		}
		for(var j=0;j<alist.length;j++){
			document.getElementById(alist[j]).style.display="inline";//ѭ����ʾ
		}
	}
