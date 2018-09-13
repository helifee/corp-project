
function pageWindowPrint(){
	if(navigator.userAgent.indexOf('MSIE') >= 0){ 
		window.print();
	}else{ 
	    alert("当前浏览器不支持打印流程，请使用IE10浏览器进行打印!");
	}
}