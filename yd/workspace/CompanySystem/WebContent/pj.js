function add(){
	targetForm = document.forms[0];
	targetForm.action="loginAction";
	targetForm.submit();
}
function search(){
     targetForm = document.forms[0];
	targetForm.action="searchpjAction.action";
	targetForm.submit();
}
function ndsearch(){
	targetForm = document.forms[0];
	targetForm.action="ndsearchPageAction.action";
	targetForm.submit();
}
function superuser05_init(){
	targetForm = document.forms[0];
	targetForm.action="superuser05initAction.action";
	targetForm.submit();
}
function research(name){
 	document.getElementById("hidden1").value=name;
	targetForm = document.forms[0];
	targetForm.action="researchpjAction.action";
	targetForm.submit();
}

function remove(name){
 	document.getElementById("hidden1").value=name;
	targetForm = document.forms[0];
	targetForm.action="removepjAction.action";
	targetForm.submit();
}
function update(name){
 	document.getElementById("hidden1").value=name;
	targetForm = document.forms[0];
	targetForm.action="updatechAction.action";
	targetForm.submit();
}
function delect(){
   // document.getElementById("hidden1").value=name;
	targetForm = document.forms[0];
	targetForm.action="delectctAction.action";
	targetForm.submit();
}
function save(){
	targetForm = document.forms[0];
	targetForm.action="saveAction.action";
	targetForm.submit();
}
function save1(){
	targetForm = document.forms[0];
	targetForm.action="save1Super04Action.action";
	targetForm.submit();
}
function userselect(){
    targetForm = document.forms[0];
	targetForm.action="selectAction.action";
	targetForm.submit();
}
function adminselect(){
    targetForm = document.forms[0];
	targetForm.action="adminselectAction.action";
	targetForm.submit();
}
function do_ok(){
	document.popupForm.action="setvaluechAction.action"
	document.popupForm.submit();	
	targetForm=window.opener.document.forms[0];
	//targetForm.action="setvaluechAction.action";
	targetForm.submit();
	window.close();	
	
}
function do_ok1(){
	
	document.popupForm.action="setvalue1chAction.action"
	//thisForm=document.forms[0];
	//thisForm.action="popup_setResult.action";
	document.popupForm.submit();
	window.close();
	
	targetForm=window.opener.document.forms[0];
	targetForm.action="setvalue1chAction.action";
	targetForm.submit();
	
	
}