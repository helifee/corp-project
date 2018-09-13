
function move(name){

	document.getElementByName("projectid").value=name;
	targetForm = document.forms[0];
	targetForm.action="simpleUser02_init.action";
	targetForm.submit();
}
function search(){
	targetForm = document.forms[0];
	targetForm.action="searchAction";
	targetForm.submit();
}