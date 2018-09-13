	 function before(){ 	 	 
 		 var d1=document.getElementById("YyDate").value;
 		 execScript('dim n:n=DateAdd("d",-1,"'+d1+'")','vbscript');   
 		 var d =new Date(n); 
 		 var Date1=d.getFullYear()  
 		 if ((d.getMonth()+1)>0 && (d.getMonth()+1)<10){
 		 	Date1=Date1+"-0"+(d.getMonth()+1);
 		 }else{
 		 	 Date1=Date1+"-"+(d.getMonth()+1);
 		 } 
 		 if(d.getDate()>0 && d.getDate()<10){
          	 Date1=Date1+"-0"+d.getDate(); 
         }else{
         	 Date1=Date1+"-"+d.getDate(); 
         }
 		 document.getElementById("YyDate").value=Date1;
  }
    function after(){
 		 var d1=document.getElementById("YyDate").value;
 		 execScript('dim n:n=DateAdd("d",1,"'+d1+'")','vbscript');   
 		 var d =new Date(n);  
 		 var Date1=d.getFullYear()  
 		 if ((d.getMonth()+1)>0 && (d.getMonth()+1)<10){
 		 	Date1=Date1+"-0"+(d.getMonth()+1);
 		 }else{
 		 	 Date1=Date1+"-"+(d.getMonth()+1);
 		 } 
 		 if(d.getDate()>0 && d.getDate()<10){
          	 Date1=Date1+"-0"+d.getDate(); 
         }else{
         	 Date1=Date1+"-"+d.getDate(); 
         }
 		 document.getElementById("YyDate").value=Date1;
  }