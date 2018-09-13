function se(){
     targetForm = document.forms[0];
	targetForm.action="se01Action";
	targetForm.submit();
	}
function move(name){
	document.getElementById("hidden1").value=name;
	targetForm = document.forms[0];
	targetForm.action="move01Action";
	targetForm.submit();
	}
function search(){
	targetForm = document.forms[0];
	targetForm.action="search01Action";
	targetForm.submit();
	}
function outputExcel1(){
	targetForm = document.forms[0];
	targetForm.action="WriteExcel";
	targetForm.submit();
	}
function addfile(){
	targetForm = document.forms[0];
	targetForm.action="addfile";
	targetForm.submit();
	}
function email(){
	targetForm = document.forms[0];
	targetForm.action="email";
	targetForm.submit();
	}

function send(){
    alert("yu");
	targetForm = document.forms[0];
	targetForm.action="send";
	targetForm.submit();
	}
function find(){

	openAction="find_EmailAction.action";
  	var win=window.open(openAction,'Manage','height=400,width=500,toolbar=no,scrollbar=yes');   
	
	}
function search1(){

	targetForm = document.forms[0];
	targetForm.action="ManageUser02_search1";
	targetForm.submit();
	}
function se1(){
	targetForm = document.forms[0];
	targetForm.action="ManageUser02_se1";
	targetForm.submit();
		}

function detail(name){
	document.getElementById("hidden2").value=name;
	targetForm = document.forms[0];
	targetForm.action="detail01Action";
	targetForm.submit();
	}
function sm02(){
	targetForm = document.forms[0];
	targetForm.action="ManageUser02_sm02";
	targetForm.submit();
	}
function sm03(){
	targetForm = document.forms[0];
	targetForm.action="ManageUser02_sm03";
	targetForm.submit();
	}
function sm04(){
	targetForm = document.forms[0];
	targetForm.action="ManageUser02_sm04";
	targetForm.submit();
	}

function alter(){
	targetForm = document.forms[0];
	targetForm.action="ManageUser03_alter";
	targetForm.submit();
	}
function output(){
	targetForm = document.forms[0];
	targetForm.action="ManageUser03_output";
	targetForm.submit();
	}


function save(){
	targetForm = document.forms[0];
	targetForm.action="ManageUser04_save";
	targetForm.submit();
	}
function Change(){
	targetForm = document.forms[0];
	targetForm.action="ManageUser04_Change";
	targetForm.submit();
	}
function add(){
	targetForm = document.forms[0];
	targetForm.action="loginAction_login.action";
	targetForm.submit();
}

function move2(name){

	document.getElementById("hidden2").value=name;
	targetForm = document.forms[0];
	targetForm.action="onlineuser_move2.action";
	targetForm.submit();
}
function adminselect(){
    targetForm = document.forms[0];
	targetForm.action="ManageUser03_adminselectAction";
	targetForm.submit();
}
function do_ok(){
	document.popupForm.action="popup_setResult.action"
	document.popupForm.submit();

	targetForm=window.opener.document.forms[0];

	targetForm.action="setvalueManage";

	targetForm.submit();
	window.close();	
	
}

