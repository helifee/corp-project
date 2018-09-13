// JavaScript Document
	
	/* -----------------------------------帮助-------------------------------------- */
	//判断是否为空
	function isNull(val){
		var boo = false;
		if(trim(val)==""){
			boo = true;
		}
		return boo;
	}
	
	//去空格的方法
	function ltrim(s){ return s.replace( /^\s*/, ''); } 
	function rtrim(s){ return s.replace( /\s*$/, ''); } 
	function trim(s){ return rtrim(ltrim(s)); }
	
	//判断行号是否是12位
	var hhlength = /\d{12}/;
	function validatehh(val){
		var boo = false;
		if(!hhlength.exec(val)){
			boo = true;
		}
		return boo;
	}
	//将以@为分割的字符串进行分割返回一个字符串
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
	//使用Enter键实现与Tab键一样的功能
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