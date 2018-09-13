function upload(){
	targetForm = document.forms[0];
	targetForm.action="upload_execute.action";
	targetForm.submit();
}
function inituploadpage(){
	targetForm = document.forms[0];
	targetForm.action="upload_initUploadPage.action";
	targetForm.submit();
}

function movedown(name){
	document.getElementById("hidden1").value=name;
	targetForm = document.forms[0];
	targetForm.action="download_movedown.action";
	targetForm.submit();
} 