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

 //������
 if(xd==null||xd.documentElement==null||arr==null||arr.length==0)
  throw(new Error(-1,"invalid arguments"));

 //ת�����ڲ���xd
 (function(xmldom){
  xd = new ActiveXObject("Microsoft.XMLDOM");
	if(document.implementation && document.implementation.createDocument){
		xd =document.implementation.createDocument("","",null);
	}else if(typeof ActiveXObject !="undefined"){
		
		try{
			xd =new ActiveXObject("Msxml2.XMLDOM"); //���°汾��IE�����
		}catch(e){
			xd =new ActiveXObject("Msxml.DOMDocument"); //���ϰ汾��IE�����
		}
	}
	xd.loadXML(xmldom.xml);
 })(xd)

 //��Select�ͷŵ�,����uniqueID������
 for(var i=0;i<arr.length;i++)
  arr[i]={
   uniqueID:arr[i].uniqueID
   ,
   node:null //��ǰ������XML Node
   ,
   attach:false //��ǰ�Ƿ������OnSelectChange
  };

 //�ѵ�һ��Select��ص�XML node����ΪXML�ĸ�Ԫ��
 arr[0].node=xd.documentElement;

 //������һ��Select
 ReAttachNode(0);

 var Controller={

  HandleChange:HandleChange

 };

 return Controller;

 //��Ӧ�û�����
 function OnSelectChange(event)
 {
  HandleChange(event.srcElement);
 }
 //����Select���ܱ��޸ĵ������ȷ�Ϻ����Select����
 function HandleChange(s)
 {
  //ȡ��Select��arr�е�λ��
  for(var index=0;index<arr.length;index++)
  {
   if(s.uniqueID==arr[index].uniqueID)
   break;
  }
  //����������һ��Select
  if(index<arr.length-1)
  {
   var node=arr[index].node;

   //������һ��Select��ص�XML node
   if(node)
   {
    var xns=node.selectNodes("item");
    arr[index+1].node=xns.item(s.selectedIndex);
   }
   else arr[index+1].node=null;

   //������һ��Select
   
   ReAttachNode(index+1);
  }
 }

 //�������ع���һ��Select��ָ����node
 function ReAttachNode(index)
 {
  //ȡ��ǰ������node
  var node=arr[index].node;
  var pnode=null;
  if(index>0)pnode=arr[index].node;

  //ȡ��ǰSelect
  var s=document.getElementById(arr[index].uniqueID);
  //�����ǰSelect������
  s.innerHTML="";

  //�����defaultText����ô����һ��
  if((node==null||node.selectNodes("item").length==0)&&defaultText)
  {
   var o=document.createElement("OPTION");
   o.value=defaultValue;
   o.innerText=defaultText;
   s.appendChild(o);
  }

  //���������nodeΪ�գ���ôȡ���¼�����
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

  //���node��Ϊ��

  //���¹����¼�
  if(arr[index].attach==false)
  {
   s.attachEvent("onchange",OnSelectChange);
   arr[index].attach=true;
  }

  //����node��ֵ���뵽Select��
  var xns=node.selectNodes("item");
  for(var i=0;i<xns.length;i++)
  {
   var o=document.createElement("OPTION");
   o.value=xns.item(i).getAttribute("value");
   o.innerText=xns.item(i).getAttribute("text");
   s.appendChild(o);
  }

  //������������ܲ���Ҫ�ɡ�����
  if(s.options.length)
   s.selectedIndex=0;

  
  HandleChange(s);
 }
}