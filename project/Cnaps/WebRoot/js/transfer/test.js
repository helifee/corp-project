function AttachXMLForSelect(xd,arr,defaultText,defaultValue)//xd:xmldom,arr:array of select
{
 function EnsureString(str)
 {
  if(typeof(str)=="string")return str;
  if(str==null)return "";
  try{return str+"";}catch(x){}
  return "";
 }
 defaultText=EnsureString(defaultText);
 defaultValue=EnsureString(defaultValue);

 //检查参数
 if(xd==null||xd.documentElement==null||arr==null||arr.length==0)
  throw(new Error(-1,"invalid arguments"));

 //转换成内部的xd
 (function(xmldom){
  xd = new ActiveXObject("Microsoft.XMLDOM");
	if(document.implementation && document.implementation.createDocument){
		xd =document.implementation.createDocument("","",null);
	}else if(typeof ActiveXObject !="undefined"){
		
		try{
			xd =new ActiveXObject("Msxml2.XMLDOM"); //较新版本的IE浏览器
		}catch(e){
			xd =new ActiveXObject("Msxml.DOMDocument"); //较老版本的IE浏览器
		}
	}
	xd.loadXML(xmldom.xml);
 })(xd)

 //把Select释放掉,换成uniqueID来储存
 for(var i=0;i<arr.length;i++)
  arr[i]={
   uniqueID:arr[i].uniqueID
   ,
   node:null //当前关联的XML Node
   ,
   attach:false //当前是否关联到OnSelectChange
  };

 //把第一个Select相关的XML node设置为XML的根元素
 arr[0].node=xd.documentElement;

 //关联第一个Select
 ReAttachNode(0);

 var Controller={

  HandleChange:HandleChange

 };

 return Controller;

 //响应用户操作
 function OnSelectChange(event)
 {
  HandleChange(event.srcElement);
 }
 //处理Select可能被修改的情况，确认后面的Select正常
 function HandleChange(s)
 {
  //取得Select在arr中的位置
  for(var index=0;index<arr.length;index++)
  {
   if(s.uniqueID==arr[index].uniqueID)
   break;
  }
  //如果不是最后一个Select
  if(index<arr.length-1)
  {
   var node=arr[index].node;

   //关联下一个Select相关的XML node
   if(node)
   {
    var xns=node.selectNodes("item");
    arr[index+1].node=xns.item(s.selectedIndex);
   }
   else arr[index+1].node=null;

   //关联下一个Select
   
   ReAttachNode(index+1);
  }
 }

 //关联，重关联一个Select到指定的node
 function ReAttachNode(index)
 {
  //取当前关联的node
  var node=arr[index].node;
  var pnode=null;
  if(index>0)pnode=arr[index].node;

  //取当前Select
  var s=document.getElementById(arr[index].uniqueID);
  //清楚当前Select的内容
  s.innerHTML="";

  //如果有defaultText，那么设置一项
  if((node==null||node.selectNodes("item").length==0)&&defaultText)
  {
   var o=document.createElement("OPTION");
   o.value=defaultValue;
   o.innerText=defaultText;
   s.appendChild(o);
  }

  //如果关联的node为空，那么取消事件关联
  if(node==null)
  {
   if(arr[index].attach)
   {
    s.detachEvent("onchange",OnSelectChange);
    arr[index].attach=false;
   }

   
   HandleChange(s);
   return;
  }

  //如果node不为空

  //重新关联事件
  if(arr[index].attach==false)
  {
   s.attachEvent("onchange",OnSelectChange);
   arr[index].attach=true;
  }

  //把子node的值倒入到Select中
  var xns=node.selectNodes("item");
  for(var i=0;i<xns.length;i++)
  {
   var o=document.createElement("OPTION");
   o.value=xns.item(i).getAttribute("value");
   o.innerText=xns.item(i).getAttribute("text");
   s.appendChild(o);
  }

  //这个。。。可能不需要吧。。。
  if(s.options.length)
   s.selectedIndex=0;

  
  HandleChange(s);
 }
}