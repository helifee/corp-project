	function Alert(str,url) {
var msgw,msgh,bordercolor;
msgw=350;//��ʾ���ڵĿ��
msgh=80;//��ʾ���ڵĸ߶�
titleheight=25 //��ʾ���ڱ���߶�
bordercolor="#336699";//��ʾ���ڵı߿���ɫ
titlecolor="#99CCFF";//��ʾ���ڵı�����ɫ
var sWidth,sHeight;
//��ȡ��ǰ���ڳߴ�
sWidth = document.body.offsetWidth;
sHeight = document.body.offsetHeight;
//    //����div
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
//������ʾ���ڵ�div
var msgObj = document.createElement("div")
msgObj.setAttribute("id","alertmsgDiv");
msgObj.setAttribute("align","center");
msgObj.style.background="white";
msgObj.style.border="1px solid " + bordercolor;
msgObj.style.position = "absolute";
msgObj.style.left = "50%";
msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
//���ھ������Ͷ��˵ľ��� 
msgObj.style.marginLeft = "-225px";
//���ڱ���ȥ�ĸ�+����Ļ���ù�������/2��-150
msgObj.style.top = document.body.scrollTop+(window.screen.availHeight/2)-150 +"px";
msgObj.style.width = msgw + "px";
msgObj.style.height = msgh + "px";
msgObj.style.textAlign = "center";
msgObj.style.lineHeight ="25px";
msgObj.style.zIndex = "10001";
document.body.appendChild(msgObj);
//��ʾ��Ϣ����
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
title.innerHTML="��ʾ��Ϣ";
document.getElementById("alertmsgDiv").appendChild(title);
//��ʾ��Ϣ
var txt = document.createElement("p");
txt.setAttribute("id","msgTxt");
txt.style.margin="16px 0";
txt.innerHTML = str+url;
document.getElementById("alertmsgDiv").appendChild(txt);
//���ùر�ʱ��
window.setTimeout("closewin()",2000); 
}
function closewin() {
document.body.removeChild(document.getElementById("alertbgDiv"));
document.getElementById("alertmsgDiv").removeChild(document.getElementById("alertmsgTitle"));
document.body.removeChild(document.getElementById("alertmsgDiv"));
}










//�����ǵ�Ʊ��������
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
document.writeln("      <td align=\"center\" bgcolor=\"#FFFFD0\">������,��ȴ�<\/td>");
document.writeln("    <\/tr>");
document.writeln("  <\/table>");
document.write("</div>");
		
		
		
		
		
	//////////////////////////////////////////////////
			<!--      
/**      
* ��Date����չ���� Date ת��Ϊָ����ʽ��String      
* ��(M)����(d)��12Сʱ(h)��24Сʱ(H)����(m)����(s)����(E)������(q) ������ 1-2 ��ռλ��      
* ��(y)������ 1-4 ��ռλ��������(S)ֻ���� 1 ��ռλ��(�� 1-3 λ������)      
* eg:      
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 �� 20:09:04      
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 �ܶ� 08:09:04      
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 ���ڶ� 08:09:04      
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
*/        
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //�·�         
    "d+" : this.getDate(), //��         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //Сʱ         
    "H+" : this.getHours(), //Сʱ         
    "m+" : this.getMinutes(), //��         
    "s+" : this.getSeconds(), //��         
    "q+" : Math.floor((this.getMonth()+3)/3), //����         
    "S" : this.getMilliseconds() //����         
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
		
		
		
		


		
		
	
 		
		
		
		
		