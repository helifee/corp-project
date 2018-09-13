	function Alert(str,url) {
var msgw,msgh,bordercolor;
msgw=350;//提示窗口的宽度
msgh=80;//提示窗口的高度
titleheight=25 //提示窗口标题高度
bordercolor="#336699";//提示窗口的边框颜色
titlecolor="#99CCFF";//提示窗口的标题颜色
var sWidth,sHeight;
//获取当前窗口尺寸
sWidth = document.body.offsetWidth;
sHeight = document.body.offsetHeight;
//    //背景div
var bgObj=document.createElement("div");
bgObj.setAttribute('id','alertbgDiv');
bgObj.style.position="absolute";
bgObj.style.top="0";
bgObj.style.background="#E8E8E8";
bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
bgObj.style.opacity="0.6";
bgObj.style.left="0";
bgObj.style.width = sWidth + "px";
bgObj.style.height = sHeight + "px";
bgObj.style.zIndex = "10000";
document.body.appendChild(bgObj);
//创建提示窗口的div
var msgObj = document.createElement("div")
msgObj.setAttribute("id","alertmsgDiv");
msgObj.setAttribute("align","center");
msgObj.style.background="white";
msgObj.style.border="1px solid " + bordercolor;
msgObj.style.position = "absolute";
msgObj.style.left = "50%";
msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
//窗口距离左侧和顶端的距离 
msgObj.style.marginLeft = "-225px";
//窗口被卷去的高+（屏幕可用工作区高/2）-150
msgObj.style.top = document.body.scrollTop+(window.screen.availHeight/2)-150 +"px";
msgObj.style.width = msgw + "px";
msgObj.style.height = msgh + "px";
msgObj.style.textAlign = "center";
msgObj.style.lineHeight ="25px";
msgObj.style.zIndex = "10001";
document.body.appendChild(msgObj);
//提示信息标题
var title=document.createElement("h4");
title.setAttribute("id","alertmsgTitle");
title.setAttribute("align","left");
title.style.margin="0";
title.style.padding="3px";
title.style.background = bordercolor;
title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
title.style.opacity="0.75";
title.style.border="1px solid " + bordercolor;
title.style.height="18px";
title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif";
title.style.color="white";
title.innerHTML="提示信息";
document.getElementById("alertmsgDiv").appendChild(title);
//提示信息
var txt = document.createElement("p");
txt.setAttribute("id","msgTxt");
txt.style.margin="16px 0";
txt.innerHTML = str+url;
document.getElementById("alertmsgDiv").appendChild(txt);
//设置关闭时间
window.setTimeout("closewin()",2000); 
}
function closewin() {
document.body.removeChild(document.getElementById("alertbgDiv"));
document.getElementById("alertmsgDiv").removeChild(document.getElementById("alertmsgTitle"));
document.body.removeChild(document.getElementById("alertmsgDiv"));
}










//下面是电票中遇到的
function opendiv(){
   document.all.bgdiv.style.display="";
   document.all.checkdiv.style.display="";
   var objdiv=document.all.bgdiv;
    var ifrm = document.createElement('iframe');
            ifrm.src = 'javascript:false';
            ifrm.style.cssText = 'position:absolute; border-style:hidden; visibility:inherit; top:0px; left:0px; width:100%; height:250%; z-index:-1; filter:alpha(opacity=0);';
            objdiv.appendChild(ifrm);
 }
var iwidth=screen.width/2-200;
  var iheight = screen.height/2-250;
document.write("<div id='bgdiv' style='display:none;BACKGROUND-COLOR:#B9E3F5;filter:alpha(opacity=50);position:absolute; left:0px;top:0px;width:100%;height:250%'></div>");
document.write("<div id=\"checkdiv\" style=\"display:none;BACKGROUND-COLOR:white;filter:alpha(opacity=80);position:absolute; left:");
document.write(iwidth);
document.write(";top:");
document.write(iheight);
document.write(";width:200;height:50\">");
document.writeln("<table width=\"200\" height=\"50\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\" style=\"padding:5px; border:1px #DCE9F3 solid\">");
document.writeln("    <tr>");
document.writeln("      <td valign=\"top\" bgcolor=\"#FFFFD0\"><img src=\"<%=path %>\/image\/uploadWait.gif\"><\/td>");
document.writeln("    <\/tr>");
document.writeln("    <tr>");
document.writeln("      <td align=\"center\" bgcolor=\"#FFFFD0\">处理中,请等待<\/td>");
document.writeln("    <\/tr>");
document.writeln("  <\/table>");
document.write("</div>");
		
		
		
		
		
	//////////////////////////////////////////////////
			<!--      
/**      
* 对Date的扩展，将 Date 转化为指定格式的String      
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
* eg:      
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
*/        
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "\u65e5",         
    "1" : "\u4e00",         
    "2" : "\u4e8c",         
    "3" : "\u4e09",         
    "4" : "\u56db",         
    "5" : "\u4e94",         
    "6" : "\u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}       
     
 var date = new Date();      
  
// -->   	
		
		
		
		


		
		
	
 		
		
		
		
		