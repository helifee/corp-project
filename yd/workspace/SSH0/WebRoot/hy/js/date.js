function before(){ 	 	 
	var d1=document.getElementById("yyDate").value;

	var    chs    =    new    Array();   
	chs    =    d1.split("-"); 
	var years =new Date(chs[0], chs[1]-1, chs[2]);
	var strTimes = new Date(years-0-1*86400000);
	var Date1=strTimes.getFullYear()  
	if ((strTimes.getMonth()+1)>0 && (strTimes.getMonth()+1)<10){
		Date1=Date1+"-0"+(strTimes.getMonth()+1);
	}else{
		 Date1=Date1+"-"+(strTimes.getMonth()+1);
	} 
	if(strTimes.getDate()>0 && strTimes.getDate()<10){
    	 Date1=Date1+"-0"+strTimes.getDate(); 
    }else{
    	 Date1=Date1+"-"+strTimes.getDate(); 
    }
	document.getElementById("yyDate").value=Date1;
	reshow(Date1);
  }
function after(){
	var d1=document.getElementById("yyDate").value;

	var chs = new Array();   
	chs = d1.split("-"); 
	var years =new Date(chs[0], chs[1]-1, chs[2]);
	var strTimes = new Date(years-0+1*86400000);
	var Date1=strTimes.getFullYear()  
	if ((strTimes.getMonth()+1)>0 && (strTimes.getMonth()+1)<10){
		Date1=Date1+"-0"+(strTimes.getMonth()+1);
	}else{
		 Date1=Date1+"-"+(strTimes.getMonth()+1);
	} 
	if(strTimes.getDate()>0 && strTimes.getDate()<10){
    	 Date1=Date1+"-0"+strTimes.getDate(); 
    }else{
    	 Date1=Date1+"-"+strTimes.getDate(); 
    }
	document.getElementById("yyDate").value=Date1;
	reshow(Date1);
 		 
}
function reshow(date){
	var url = "hysylinit.action?stryyDate =" + date;
	new Ajax.Updater('div_hy_reserve_list', url, {
		onLoading : function() {
		},
		onSuccess: function(response){ 
			checkSession(response);
		},
		onFailure : function(request) {
			alert("程序有错误");
		},
		onComplete : function(request) {
		}
		});
}