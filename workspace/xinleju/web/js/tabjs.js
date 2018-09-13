/*addLoadEvent.js*/
function addLoadEvent(func) {
	func();
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
/*addLoadEvent.js结束*/
/*switch_display_area.js*/
function getConfigInputObj(){
	if(!document.getElementById || !document.getElementsByTagName)return;
	var configObj=document.getElementById("kp_OtherRegional");if(configObj==null)return;
	var configValue=configObj.getAttribute("value").replace(/\s/g,"");
	var configArray=configValue.split("|")
	var length=configArray.length;
	var childConfigArray=null;
	var childConfigValue="";
	for(var i=0;i<length;i++){
		childConfigArray=configArray[i].split(",");
		giveEvent(childConfigArray);
	}
	//destroy(getConfigInputObj);
}
function giveEvent(obj){
	if(obj==null){return;}
	var parentId=obj[0];
	var whichToTrigger=obj[1];
	var itemParent=obj[2];
	var itemClass=obj[3];
	var currentClassName=obj[4];
	var listerEvent=obj[5];
	if(!parentId || !whichToTrigger || !itemParent || !itemClass)return;
	var parentObj=null;
	var whichToTriggerObj=null;
	var itemParentObj=null;
	var itemObj=null;
	/*准备好各个元素*/
	parentObj=document.getElementById(parentId);
	if(!parentObj){return;}
	itemParentObj=document.getElementById(itemParent);
	whichToTriggerObj=parentObj.getElementsByTagName(whichToTrigger);//获取事件源对象的集合
	if(!parentObj || !itemParentObj || !whichToTriggerObj)return;
	itemObj=itemParentObj.getElementsByTagName("*");
	var length=itemObj.length;
	var objArray=new Array();
	for(var i=0;i<itemObj.length;i++){
		if(itemObj[i].className.indexOf(itemClass)>-1){
			objArray.push(itemObj[i]);
		}
	}
	var whichToTriggerObjLength=whichToTriggerObj.length;//获取事件源对象的长度
	var isExistAObj=null;
	for(var i=0;i<whichToTriggerObjLength;i++){
		whichToTriggerObj[i].setAttribute("oldClassName",whichToTriggerObj[i].className.replace(currentClassName));
		whichToTriggerObj[i].setAttribute("currentNum",i);
		if(listerEvent==null){
			whichToTriggerObj[i].onclick=function(){
				//return 
				return correspondingRegion(this,objArray,currentClassName,whichToTriggerObj);
			}
			isExistAObj=whichToTriggerObj[i].getElementsByTagName("a");
			if(isExistAObj.length>0){
				for(var j=0;j<isExistAObj.length;j++){
					isExistAObj[j].onfocus=function(){this.blur();}
				}
			}
		}else{
			whichToTriggerObj[i].onmouseover=function(){
				//return 
				return correspondingRegion(this,objArray,currentClassName,whichToTriggerObj);
			}
		}
		whichToTriggerObj[i].onfocus=function(){
			this.blur();
		}
	}
	//destroy(giveEvent);
}
//功能; 根据传递的参数切换（显示或隐藏）各个区域
function correspondingRegion(obj,objArray,currentClassName,whichToTriggerObj){
	var length=objArray.length;
	var currentNum=parseInt(obj.getAttribute("currentNum"),10);
	if(!objArray[currentNum]){
		/*alert("该div不存在");*/
		return;
	}else{
		/*先将所有样式 "归零"*/
		for(var i=0;i<length;i++){
			objArray[i].style.display="none";
			if(whichToTriggerObj[i]==null){continue;}
			//如果有老的样式
			if(whichToTriggerObj[i].getAttribute("oldClassName")!="" && whichToTriggerObj[i].getAttribute("oldClassName").indexOf(currentClassName)<0){
				whichToTriggerObj[i].className=whichToTriggerObj[i].getAttribute("oldClassName");
			}else if(whichToTriggerObj[i].getAttribute("oldClassName")!=""){
				whichToTriggerObj[i].className=whichToTriggerObj[i].getAttribute("oldClassName");
			}else{
				whichToTriggerObj[i].className="";
			}
		}
		//然后单独给当前对象加上className
		if(objArray[currentNum]!=null){
			objArray[currentNum].style.display="block";
			if(obj.getAttribute("oldClassName")!=""){
				obj.className=currentClassName+" "+obj.getAttribute("oldClassName");
			}else{
				obj.className=currentClassName;
			}
			//return false;
		}else{
			//return true;
		}
		return false;
	}
}
addLoadEvent(getConfigInputObj);
/*switch_display_area.js结束*/
