// JavaScript Document
	
	/* -----------------------------------����-------------------------------------- */
	//�ж��Ƿ�Ϊ��
	function isNull(val){
		var boo = false;
		if(trim(val)==""){
			boo = true;
		}
		return boo;
	}
	
	//ȥ�ո�ķ���
	function ltrim(s){ return s.replace( /^\s*/, ''); } 
	function rtrim(s){ return s.replace( /\s*$/, ''); } 
	function trim(s){ return rtrim(ltrim(s)); }
	
	//�ж��к��Ƿ���12λ
	var hhlength = /\d{12}/;
	function validatehh(val){
		var boo = false;
		if(!hhlength.exec(val)){
			boo = true;
		}
		return boo;
	}
	//����@Ϊ�ָ���ַ������зָ��һ���ַ���
	function msgSplit(val){
		var msg = val.split("@");
		var msgs = "";
		var boo = true;
		for(var i=0;i<msg.length;i++){
			if(trim(msg[i])!=""){
				msgs += i+"."+msg[i]+"\n";
			}
		}
		if(trim(msgs)!=""){
			window.alert(msgs);
			boo = false;
		}
		return boo;
	}
	//ʹ��Enter��ʵ����Tab��һ���Ĺ���
	document.onkeydown = function keydown(){
		if (window.event.keyCode=="13") {
			if(document.activeElement.tagName== "INPUT"||document.activeElement.tagName== "SELECT"||document.activeElement.tagName== "TEXTAREA"){
				if(document.activeElement.type!="button"){ 
					window.event.keyCode = "9";
				}
			}
		}
	}
	/* -------------------------------------------------------------------------------- */