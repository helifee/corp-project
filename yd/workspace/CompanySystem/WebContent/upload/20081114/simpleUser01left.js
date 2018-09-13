function add1(){
	targetForm = document.forms[0];
	targetForm.action="user_search.action";
	targetForm.submit();
}
function move1(name){

	document.getElementById("hidden1").value=name;
	targetForm = document.forms[0];
	targetForm.action="user_move1.action";
	targetForm.submit();
}
function init(){
	targetForm = document.forms[0];
	targetForm.action="simpleUser01_init.action";
	targetForm.submit();
}