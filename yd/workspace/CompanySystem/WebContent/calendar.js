function atCalendarControl(){ 
  var calendar=this; 
  this.calendarPad=null; 
  this.prevMonth=null; 
  this.nextMonth=null; 
  this.prevYear=null; 
  this.nextYear=null; 
  this.goToday=null; 
  this.calendarClose=null; 
  this.calendarAbout=null; 
  this.head=null; 
  this.body=null; 
  this.today=[]; 
  this.currentDate=[]; 
  this.sltDate; 
  this.target; 
  this.source; 
 
  this.addCalendarPad=function(){ 
   document.write("<div id='divCalendarpad' style='position:absolute;top:100;left:0;width:283;height:231;display:none;'>"); 
   document.write("<iframe frameborder=0 height=189 width=250></iframe>"); 
   document.write("<div style='position:absolute;top:2;left:2;width:283;height:231;background-image:images/datebg.gif;'></div>"); 
   document.write("</div>"); 
   calendar.calendarPad=document.all.divCalendarpad; 
  } 

  this.addCalendarBoard=function(){ 
   var BOARD=this; 
   var divBoard=document.createElement("div"); 
   calendar.calendarPad.insertAdjacentElement("beforeEnd",divBoard); 
   divBoard.style.cssText="position:absolute;top:0;left:0;width:250;height:187;border:0 outset;background-color:buttonface;"; 
 
   var tbBoard=document.createElement("table"); 
   divBoard.insertAdjacentElement("beforeEnd",tbBoard); 
   tbBoard.style.cssText="position:absolute;top:2;left:2;width:248;height:10;font-size:9pt;"; 
   tbBoard.cellPadding=0; 
   tbBoard.cellSpacing=1; 
 

   /**//*********** Calendar About Button ***************/ 
   trRow = tbBoard.insertRow(0); 
   calendar.calendarAbout=calendar.insertTbCell(trRow,0,"-","center"); 
   calendar.calendarAbout.title="H"; 
   calendar.calendarAbout.onclick=function(){calendar.about();} 
   /**//*********** Calendar Head ***************/ 
   tbCell=trRow.insertCell(1); 
   tbCell.colSpan=5; 
   tbCell.bgColor="#99CCFF"; 
   tbCell.align="center"; 
   tbCell.style.cssText = "cursor:default"; 
   calendar.head=tbCell; 
   /**//*********** Calendar Close Button ***************/ 
   tbCell=trRow.insertCell(2); 
   calendar.calendarClose = calendar.insertTbCell(trRow,2,"x","center"); 
   calendar.calendarClose.title="ESC,X"; 
   calendar.calendarClose.style.cssText ="width:100%;border:1 outset;background-color:#ff0000;color:#FFFFFF;font-size=14px;"; 
   calendar.calendarClose.onmouseout = ""; 
   calendar.calendarClose.onmouseover = ""; 
   calendar.calendarClose.onmouseup = ""; 
   calendar.calendarClose.onclick=function(){calendar.hide();} 
 
   /**//*********** Calendar PrevYear Button ***************/ 
   trRow = tbBoard.insertRow(1); 
   calendar.prevYear = calendar.insertTbCell(trRow,0,"<<<","center"); 
   calendar.prevYear.onmousedown=function(){ 
    calendar.currentDate[0]--; 
    calendar.show(calendar.target,calendar.returnTime,calendar.currentDate[0]+"-"+calendar.formatTime(calendar.currentDate[1])+"-"+calendar.formatTime(calendar.currentDate[2]),calendar.source); 
   } 
   /**//*********** Calendar PrevMonth Button ***************/ 
   calendar.prevMonth = calendar.insertTbCell(trRow,1,"<<","center"); 
   calendar.prevMonth.onmousedown=function(){ 
    calendar.currentDate[1]--; 
    if(calendar.currentDate[1]==0){ 
     calendar.currentDate[1]=12; 
     calendar.currentDate[0]--; 
    } 
    calendar.show(calendar.target,calendar.returnTime,calendar.currentDate[0]+"-"+calendar.formatTime(calendar.currentDate[1])+"-"+calendar.formatTime(calendar.currentDate[2]),calendar.source); 
   } 
   /**//*********** Calendar Today Button ***************/ 
   calendar.goToday = calendar.insertTbCell(trRow,2,"TODAY","center",3); 
   calendar.goToday.title="T"; 
   calendar.goToday.onclick=function(){ 
     if(calendar.returnTime)   
        calendar.sltDate=calendar.today[0]+"-"+calendar.formatTime(calendar.today[1])+"-"+calendar.formatTime(calendar.today[2])+" "+calendar.formatTime(calendar.today[3])+":"+calendar.formatTime(calendar.today[4]) 
     else 
        calendar.sltDate=calendar.today[0]+"-"+calendar.formatTime(calendar.today[1])+"-"+calendar.formatTime(calendar.today[2]); 
    calendar.target.value=calendar.sltDate; 
    calendar.hide(); 
    //calendar.show(calendar.target,calendar.today[0]+"-"+calendar.today[1]+"-"+calendar.today[2],calendar.source); 
   } 
   /**//*********** Calendar NextMonth Button ***************/ 
   calendar.nextMonth = calendar.insertTbCell(trRow,3,">","center"); 
   calendar.nextMonth.onmousedown=function(){ 
    calendar.currentDate[1]++; 
    if(calendar.currentDate[1]==13){ 
     calendar.currentDate[1]=1; 
     calendar.currentDate[0]++; 
    } 
    calendar.show(calendar.target,calendar.returnTime,calendar.currentDate[0]+"-"+calendar.formatTime(calendar.currentDate[1])+"-"+calendar.formatTime(calendar.currentDate[2]),calendar.source); 
   } 
   /**//*********** Calendar NextYear Button ***************/ 
   calendar.nextYear = calendar.insertTbCell(trRow,4,">>","center"); 
   calendar.nextYear.onmousedown=function(){ 
    calendar.currentDate[0]++; 
    calendar.show(calendar.target,calendar.returnTime,calendar.currentDate[0]+"-"+calendar.formatTime(calendar.currentDate[1])+"-"+calendar.formatTime(calendar.currentDate[2]),calendar.source); 
 
   } 
 
   trRow = tbBoard.insertRow(2); 
   var cnDateName = new Array("0","1","2","3","4","5","6"); 
   for (var i = 0; i < 7; i++) { 
    tbCell=trRow.insertCell(i) 
    tbCell.innerText=cnDateName[i]; 
    tbCell.align="center"; 
    tbCell.width=35; 
    tbCell.style.cssText="cursor:default;border:1 solid #99CCCC;background-color:#99CCCC;"; 
   } 
 
   /**//*********** Calendar Body ***************/ 
   trRow = tbBoard.insertRow(3); 
   tbCell=trRow.insertCell(0); 
   tbCell.colSpan=7; 
   tbCell.height=97; 
   tbCell.vAlign="top"; 
   tbCell.bgColor="#F0F0F0"; 
    
   var tbBody=document.createElement("table"); 
   tbCell.insertAdjacentElement("beforeEnd",tbBody); 
   tbBody.style.cssText="position:relative;top:0;left:0;width:245;height:103;font-size:9pt;" 
   tbBody.cellPadding=0; 
   tbBody.cellSpacing=1; 
   calendar.body=tbBody; 
     
   /**//*********** Time Body ***************/ 
   trRow = tbBoard.insertRow(4); 
   tbCell=trRow.insertCell(0); 
   calendar.prevHours = calendar.insertTbCell(trRow,0,"-","center"); 
   calendar.prevHours.title="Home"; 
   calendar.prevHours.onmousedown=function(){ 
        calendar.currentDate[3]--; 
        if(calendar.currentDate[3]==-1) calendar.currentDate[3]=23; 
        calendar.bottom.innerText=calendar.formatTime(calendar.currentDate[3])+":"+calendar.formatTime(calendar.currentDate[4]); 
    } 
   tbCell=trRow.insertCell(1); 
   calendar.nextHours = calendar.insertTbCell(trRow,1,"+","center"); 
   calendar.nextHours.title="End"; 
   calendar.nextHours.onmousedown=function(){ 
        calendar.currentDate[3]++; 
        if(calendar.currentDate[3]==24) calendar.currentDate[3]=0; 
        calendar.bottom.innerText=calendar.formatTime(calendar.currentDate[3])+":"+calendar.formatTime(calendar.currentDate[4]); 
    } 
   tbCell=trRow.insertCell(2); 
   tbCell.colSpan=3; 
   tbCell.bgColor="#99CCFF"; 
   tbCell.align="center"; 
   tbCell.style.cssText = "cursor:default"; 
   calendar.bottom=tbCell; 
   tbCell=trRow.insertCell(3); 
   calendar.prevMinutes = calendar.insertTbCell(trRow,3,"-","center"); 
   calendar.prevMinutes.title="PageUp"; 
   calendar.prevMinutes.onmousedown=function(){ 
        calendar.currentDate[4]--; 
        if(calendar.currentDate[4]==-1) calendar.currentDate[4]=59; 
        calendar.bottom.innerText=calendar.formatTime(calendar.currentDate[3])+":"+calendar.formatTime(calendar.currentDate[4]); 
    } 
   tbCell=trRow.insertCell(4); 
   calendar.nextMinutes = calendar.insertTbCell(trRow,4,"+","center"); 
   calendar.nextMinutes.title="PageDown"; 
   calendar.nextMinutes.onmousedown=function(){ 
        calendar.currentDate[4]++; 
        if(calendar.currentDate[4]==60) calendar.currentDate[4]=0; 
        calendar.bottom.innerText=calendar.formatTime(calendar.currentDate[3])+":"+calendar.formatTime(calendar.currentDate[4]); 
    } 
 
} 
   
  this.insertTbCell=function(trRow,cellIndex,TXT,trAlign,tbColSpan){ 
   var tbCell=trRow.insertCell(cellIndex); 
   if(tbColSpan!=undefined) tbCell.colSpan=tbColSpan; 
 
   var btnCell=document.createElement("button"); 
   tbCell.insertAdjacentElement("beforeEnd",btnCell); 
   btnCell.value=TXT; 
   btnCell.style.cssText="width:100%;border:1 outset;background-color:buttonface;"; 
   btnCell.onmouseover=function(){ 
   btnCell.style.cssText="width:100%;border:1 outset;background-color:#F0F0F0;"; 
 
   } 
   btnCell.onmouseout=function(){ 
    btnCell.style.cssText="width:100%;border:1 outset;background-color:buttonface;"; 
   } 
  // btnCell.onmousedown=function(){ 
  //  btnCell.style.cssText="width:100%;border:1 inset;background-color:#F0F0F0;"; 
  // } 
   btnCell.onmouseup=function(){ 
    btnCell.style.cssText="width:100%;border:1 outset;background-color:#F0F0F0;"; 
   } 
   btnCell.onclick=function(){ 
    btnCell.blur(); 
   } 
   return btnCell; 
  } 
   
  this.setDefaultDate=function(){ 
   var dftDate=new Date(); 
   calendar.today[0]=dftDate.getYear(); 
   calendar.today[1]=dftDate.getMonth()+1; 
   calendar.today[2]=dftDate.getDate(); 
   calendar.today[3]=dftDate.getHours(); 
   calendar.today[4]=dftDate.getMinutes(); 
  } 
 
  /**//****************** Show Calendar *********************/ 
  this.show=function(targetObject,returnTime,defaultDate,sourceObject){ 
   if(targetObject==undefined) { 
    return false; 
   } 
   else calendar.target=targetObject; 
    
   if(sourceObject==undefined) calendar.source=calendar.target; 
   else calendar.source=sourceObject; 
 
   if(returnTime) calendar.returnTime=true; 
   else calendar.returnTime=false; 
 
   var firstDay; 
   var Cells=new Array(); 
   if((defaultDate==undefined) || (defaultDate=="")){ 
    var theDate=new Array(); 
    calendar.head.innerText = calendar.today[0]+"-"+calendar.formatTime(calendar.today[1])+"-"+calendar.formatTime(calendar.today[2]); 
    calendar.bottom.innerText = calendar.formatTime(calendar.today[3])+":"+calendar.formatTime(calendar.today[4]); 
     
    theDate[0]=calendar.today[0]; theDate[1]=calendar.today[1]; theDate[2]=calendar.today[2]; 
    theDate[3]=calendar.today[3]; theDate[4]=calendar.today[4]; 
   } 
   else{ 
    var Datereg=/^\d{4}-\d{1,2}-\d{2}$/ 
    var DateTimereg=/^(\d{1,4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2})$/ 
    if((!defaultDate.match(Datereg)) && (!defaultDate.match(DateTimereg))){ 
     calendar.setDefaultDate(); 
     return; 
    } 
     
    if(defaultDate.match(Datereg)) defaultDate=defaultDate+" "+calendar.today[3]+":"+calendar.today[4]; 
    var strDateTime=defaultDate.match(DateTimereg); 
    var theDate=new Array(4) 
    theDate[0]=strDateTime[1]; 
    theDate[1]=strDateTime[2]; 
    theDate[2]=strDateTime[3]; 
    theDate[3]=strDateTime[4]; 
    theDate[4]=strDateTime[5]; 
    calendar.head.innerText = theDate[0]+"-"+calendar.formatTime(theDate[1])+"-"+calendar.formatTime(theDate[2]); 
    calendar.bottom.innerText = calendar.formatTime(theDate[3])+":"+calendar.formatTime(theDate[4]); 
    } 
   calendar.currentDate[0]=theDate[0]; 
   calendar.currentDate[1]=theDate[1]; 
   calendar.currentDate[2]=theDate[2]; 
   calendar.currentDate[3]=theDate[3]; 
   calendar.currentDate[4]=theDate[4]; 
    
   theFirstDay=calendar.getFirstDay(theDate[0],theDate[1]); 
   theMonthLen=theFirstDay+calendar.getMonthLen(theDate[0],theDate[1]); 
   //calendar.setEventKey(); 
 
   calendar.calendarPad.style.display=""; 
   var theRows = Math.ceil((theMonthLen)/7); 

   while (calendar.body.rows.length > 0) { 
    calendar.body.deleteRow(0) 
   } 

   var n=0;day=0; 
   for(i=0;i<theRows;i++){ 
    theRow=calendar.body.insertRow(i); 
    for(j=0;j<7;j++){ 
     n++; 
     if(n>theFirstDay && n<=theMonthLen){ 
      day=n-theFirstDay; 
      calendar.insertBodyCell(theRow,j,day); 
     } 
 
     else{ 
      var theCell=theRow.insertCell(j); 
      theCell.style.cssText="background-color:#F0F0F0;cursor:default;"; 
     } 
    } 
   } 
 

   var offsetPos=calendar.getAbsolutePos(calendar.source);
   if((document.body.offsetHeight-(offsetPos.y+calendar.source.offsetHeight-document.body.scrollTop))<calendar.calendarPad.style.pixelHeight){ 
    var calTop=offsetPos.y-calendar.calendarPad.style.pixelHeight; 
   } 
   else{ 
    var calTop=offsetPos.y+calendar.source.offsetHeight; 
   } 
   if((document.body.offsetWidth-(offsetPos.x+calendar.source.offsetWidth-document.body.scrollLeft))>calendar.calendarPad.style.pixelWidth){ 
    var calLeft=calendar.target.offsetLeft;//offsetPos.x; 
   } 
   else{ 
   //alert(document.body.offsetWidth); 
    var calLeft=calendar.target.offsetLeft; 
   } 
   //alert(offsetPos.x); 
   calendar.calendarPad.style.pixelLeft=calLeft; 
   calendar.calendarPad.style.pixelTop=calTop; 
  } 

  this.getAbsolutePos = function(el) { 
   var r = { x: el.offsetLeft, y: el.offsetTop }; 
   if (el.offsetParent) { 
    var tmp = calendar.getAbsolutePos(el.offsetParent); 
    r.x += tmp.x; 
    r.y += tmp.y; 
   } 
   return r; 
  }; 
 ///
  this.insertBodyCell=function(theRow,j,day,targetObject){ 
   var theCell=theRow.insertCell(j); 
   if(j==0) var theBgColor="#FF9999"; 
   else var theBgColor="#FFFFFF"; 
   if(day==calendar.currentDate[2]) var theBgColor="#CCCCCC"; 
   if(day==calendar.today[2]) var theBgColor="#99FFCC"; 
   theCell.bgColor=theBgColor; 
   theCell.innerText=day; 
   theCell.align="center"; 
   theCell.width=35; 
   theCell.style.cssText="border:1 solid #CCCCCC;cursor:hand;"; 
   theCell.onmouseover=function(){  
    theCell.bgColor="#FFFFCC";  
    theCell.style.cssText="border:1 outset;cursor:hand;"; 
   } 
   theCell.onmouseout=function(){  
    theCell.bgColor=theBgColor;  
    theCell.style.cssText="border:1 solid #CCCCCC;cursor:hand;"; 
   } 
   theCell.onmousedown=function(){  
    theCell.bgColor="#FFFFCC";  
    theCell.style.cssText="border:1 inset;cursor:hand;"; 
   } 
   theCell.onclick=function(){ 
     if(calendar.returnTime)   
        calendar.sltDate=calendar.currentDate[0]+"-"+calendar.formatTime(calendar.currentDate[1])+"-"+calendar.formatTime(day)+" "+calendar.formatTime(calendar.currentDate[3])+":"+calendar.formatTime(calendar.currentDate[4]) 
     else 
        calendar.sltDate=calendar.currentDate[0]+"-"+calendar.formatTime(calendar.currentDate[1])+"-"+calendar.formatTime(day); 
    calendar.target.value=calendar.sltDate; 
    calendar.hide(); 
   } 
  } 

  this.getFirstDay=function(theYear, theMonth){ 
   var firstDate = new Date(theYear,theMonth-1,1); 
   return firstDate.getDay(); 
  } 

 
  this.getMonthLen=function(theYear, theMonth) { 
   theMonth--; 
   var oneDay = 1000 * 60 * 60 * 24; 
   var thisMonth = new Date(theYear, theMonth, 1); 
   var nextMonth = new Date(theYear, theMonth + 1, 1); 
   var len = Math.ceil((nextMonth.getTime() - thisMonth.getTime())/oneDay); 
   return len; 
  } 

  this.hide=function(){ 
   //calendar.clearEventKey(); 
   calendar.calendarPad.style.display="none"; 
   //document.onkeydown = "";
    
  } 

  this.setup=function(defaultDate){ 
   calendar.addCalendarPad(); 
   calendar.addCalendarBoard(); 
   calendar.setDefaultDate(); 
  } 

 this.formatTime = function(str) { 
  str = ("00"+str); 
  return str.substr(str.length-2); 
 } 
 
  this.about=function(){ 
   var strAbout = "\nWeb discription:\n\n"; 
   strAbout+="-\t: \n"; 
   strAbout+="x\t: \n"; 
   strAbout+="<<\t: last year\n"; 
   strAbout+="<\t: last month\n"; 
 
   strAbout+="today\t: today\n"; 
   strAbout+=">\t: next month\n"; 
   strAbout+="<<\t: next year\n"; 
   strAbout+="\nWebCalender\tVer:v1.0\t\nDesigned By:sundun \t\t2005\t\n"; 
   alert(strAbout); 
  } 
   
document.onkeydown=function(){ 
    if(calendar.calendarPad.style.display=="none"){ 
        window.event.returnValue= true; 
        return true ; 
    } 
    switch(window.event.keyCode){ 
       case 27 : calendar.hide(); break; //ESC 
       case 37 : calendar.prevMonth.onmousedown(); break;
       case 38 : calendar.prevYear.onmousedown();break; 
       case 39 : calendar.nextMonth.onmousedown(); break;
       case 40 : calendar.nextYear.onmousedown(); break;
       case 84 : calendar.goToday.onclick(); break;//T 
       case 88 : calendar.hide(); break;   //X 
       case 72 : calendar.about(); break;   //H     
       case 36 : calendar.prevHours.onmousedown(); break;//Home 
       case 35 : calendar.nextHours.onmousedown(); break;//End 
       case 33 : calendar.prevMinutes.onmousedown();break; //PageUp 
       case 34 : calendar.nextMinutes.onmousedown(); break;//PageDown 
        }  
        window.event.keyCode = 0; 
        window.event.returnValue= false; 
        } 
 
  calendar.setup(); 
 } 
   
var CalendarWebControl = new atCalendarControl(); 
