// JavaScript Document
	var B100 = new Array();//��ͨ���
	var B104 = new Array();//�����ʽ��ǻ���
	var B307 = new Array();//�����ʽ��ծ�Ҹ���ǻ���
	var B09001 = {name:"09001",value:"����"};
	var B02201={name:"02201",value:"���뼶Ԥ������"};
	var B02202={name:"02202",value:"ʡ��Ԥ������"};
	var B02203={name:"02203",value:"���м�Ԥ������"};
	var B02204={name:"02204",value:"�ؼ�Ԥ������"};
	var B02205={name:"02205",value:"��ծ�Ҹ�"};
	B100=[B09001];
	B104=[B02201,B02202,B02203,B02204,B09001];
	B307=[B02205];
	var BEPSB100 = {name:"B100",value:B100};
	var BEPSB104 = {name:"B104",value:B104};
	var BEPSB307 = {name:"B307",value:B307};
	rvalues =  [BEPSB100,BEPSB104,BEPSB307];
	var B2020290_2 = ['gkzjjjhbdetails'];
	var B2020290_3 = ['gkzjgzdfjjhbdetails'];
	//û�и�����
	var B0000 = ['noaddinfo'];
	//�Ƿ���Ҫ��������� 
	
	var isB100 = ['B100'];
	var isB104 = ['B104'];
	var isB307 = ['B307'];
	
	

	//ѡ��ҵ������ ��ʾ��ͬ��ҵ������
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
	
		isDisplayToInline(temp);
	}
	
	
	
	
	//��ʾ������
	function isDisplayToInline(temp){
	   
		
		var alist = [];
		//�����е���������鼯Ⱥ
		var lists = B2020290_2.concat(B2020290_3).concat(B0000);
		//�����е�������Ϳ�
		trTextVelueToNull(lists);
	
		//�����е��������������
		arrayToFor(lists);
		if(isEntity(temp,isB100)){
			alist = B0000;
		}else if(isEntity(temp,isB104)){
			alist = B2020290_2;
		}else if(isEntity(temp,isB307)){
			alist = B2020290_3;
		}else{
			alist = B0000;
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

	
	
	
	
	
	
	
	
	
	
