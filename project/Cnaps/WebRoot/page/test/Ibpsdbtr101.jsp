<%@ page language="java" contentType="text/html; charset=gb2312"
	pageEncoding="GB2312" isELIgnored="false"%>
	<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>

		<style type="text/css">
/* CSS Document */
body {
	text-align: center;
	
	font-family: "����", arial;
	margin: 0;
	padding: 0;
   
	font-size: 12px;

}

div,form,img,ul,ol,li,dl,dt,dd {
	margin: 0;
	padding: 0;
	border: 0;
}

h1,h2,h3,h4,h5,h6 {
	margin: 0;
	padding: 0;
}

table,td,tr,th {
	font-size: 12px;
}

/* ������ɫ */
a:link {
	color: #1f3a87;
	text-decoration: none;
}

a:visited {
	color: #83006f;
	text-decoration: none;
}

a:hover {
	color: #bc2931;
	text-decoration: underline;
}

a:active {
	color: #bc2931;
}

/* ��ɫ���� [�������Сдc����ɫ����] */
.cRed,a.cRed:link,a.cRed:visited {
	color: Red;
}

.cBlue,a.cBlue:link,a.cBlue:visited {
	color: #1f3a87;
}

.cDRed,a.cDRed:link,a.cDRed:visited {
	color: #bc2931;
}

.cGray,a.cGray:link,a.cGray:visited {
	color: #4F544D;
}

.cDGray,a.cDGray:link,a.cDGray:visited {
	color: #666;
}

.cWhite,a.cWhite:link,a.cWhite:visited {
	color: #fff;
}

.cBlack,a.cBlack:link,a.cBlack:visited {
	color: #000;
}

a.cBlack:hover {
	color: #bc2931;
}

.cYellow,a.cYellow:link,a.cYellow:visited {
	color: #ff0;
}

.cGreen,a.cGreen:link,a.cGreen:visited {
	color: #008000;
}

/* �������� [�������Сдf����������] */
.fB {
	font-weight: bold;
}

.fI {
	font-style: italic;
}

/* �����С*/
.f12px {
	font-size: 12px;
}

.f14px {
	font-size: 14px;
}

.lg {
	width: 740px;
	border: 1px solid #cbcbcb;
	clear: both;
	text-align: center
}

.wdiv {
	width: 400px;
	border: 1px solid #cbcbcb;
	clear: both;
	text-align: left
}
</style>
		<link href="<%=request.getContextPath()%>/css/style.css"
			rel="stylesheet" type="text/css" />
		<link href="<%=request.getContextPath()%>/css/calendar-blue.css"
			rel="stylesheet" type="text/css" />
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js2/popup.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js2/calendar.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js2/calendar-zh.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js2/calendar-setup.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/js2/calendarHelper.js"></script>
		<script language="javascript" type="text/javascript"
			src="<%=request.getContextPath()%>/javascripts/shawnjs/check.js"></script>


		<!--  ��������ѡ��-->
		<script>

function onsave() {
	 //����������ʽ
	 var reg = /(^\s)* | (\s$)* /gi;
	 //��ƥ����ַ����� ""
	 //str = str.replace(reg, "");

	if(document.form1.pmttp.value.replace(reg, "")=="")
	{
		alert("ҵ�����ͱ��벻��Ϊ�գ�");
		return false;
	}
	if(document.form1.pmtkd.value.replace(reg, "")=="")
	{
		alert("ҵ��������벻��Ϊ�գ�");
		return false;
	}
	if(document.form1.currency.value.replace(reg, "")=="")
	{
		alert("���ҷ��Ų���Ϊ�գ�");
		return false;
	}
	if(document.form1.amount.value.replace(reg, "")=="")
	{
		alert("���׽���Ϊ�գ�");
		return false;
	}
	if(document.form1.amount.value.replace(reg, "")=="NaN.undefined")
	{
		alert("���׽���Ϊ�գ�");
		document.form1.amount.value = "";
		return false;
	}
	if(document.form1.amount.value.replace(reg, "")!="")
	{
	    var number = document.form1.amount.value.replace(reg, "");
	    document.form1.amount.value = number.replace(/[^\d\.-]/g, "");
	}
	if(document.form1.charge.value.replace(reg, "")=="")
	{
		alert("�����ѽ���Ϊ�գ�");
		return false;
	}
	if(document.form1.charge.value.replace(reg, "")=="NaN.undefined")
	{
		alert("�����ѽ���Ϊ�գ�");
		document.form1.charge.value = "";
		return false;
	}
	if(document.form1.charge.value.replace(reg, "")!="")
	{
		var number = document.form1.charge.value.replace(reg, "");
	    document.form1.charge.value = number.replace(/[^\d\.-]/g, "");
	}
	if(document.form1.dbtracctid.value.replace(reg, "")=="")
	{
		alert("�������˺Ų���Ϊ�գ�");
		return false;
	}

	if(document.form1.dbtrnm.value.replace(reg, "")=="")
	{
		alert("�����˻�������Ϊ�գ�");
		return false;
	}
	
	if(document.form1.cdtracctid.value.replace(reg, "")=="")
	{
		alert("�տ����˺Ų���Ϊ�գ�");
		return false;
	}
	if(document.form1.cdtrnm.value.replace(reg, "")=="")
	{
		alert("�տ��˻�������Ϊ�գ�");
		return false;
	}
	if(document.form1.cdtrmmbid.value.replace(reg, "")=="")
	{
		alert("�տ����������кŲ���Ϊ�գ�");
		return false;
	}
	
	if(document.form1.cdtrbrchid.value.replace(reg, "")=="")
	{
		alert("�տ��˿�������������ϵͳ�кŲ���Ϊ�գ�");
		return false;
	}
	document.form1.submit();
	var pop=new Popup({ contentType:1,scrollType:'no',isReloadOnClose:false,width:360,height:200});
		 pop.setContent("contentUrl","<%=request.getContextPath()%>/admin/netbank/processtiao.jsp");
		 pop.setContent("title","��ʾ��Ϣ");
		  pop.build();
		  pop.show();
}


function fmoney(s, n)//������ת���ɶ��ŷָ�����ʽ,������λС��s:value,n:С��λ��      
{   
    n = n > 0 && n <= 20 ? n : 2;   
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
    var l = s.split(".")[0].split("").reverse(),   
    r = s.split(".")[1];   
    t = "";   
    for(i = 0; i < l.length; i ++ )   
    {   
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
    }   
    return t.split("").reverse().join("") + "." + r;   
}   
//��ԭ���   
function rmoney(s)   
{   
    return parseFloat(s.replace(/[^\d\.-]/g, ""));   
}  


function nocn(ss,str){
	for(i=0;i<str.length;i++){
		var c = str.substr(i,1);
		var ts = escape(c);
		if(ts.substring(0,2) == "%u"){
			document.str = "";
			alert("���ﲻ����������/ȫ���ַ�");
			 document.getElementById(ss).focus();
			 return false;
		}
	}
	
}


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
  xd=new ActiveXObject("Microsoft.XMLDOM");
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
</script>
	</head>
	<body>
		<XML id="oxml">
		<item>
		<item text="��ѡ��" value="">
		<item text="��ѡ��" value="" />
		</item>
		<item text="���" value="C200">
		<item text="��ѡ��" value="" />
		<item text="���" value="02001" />
		</item>
		<item text="Ͷ�����" value="C201">
		<item text="��ѡ��" value="" />
		<item text="��ƹ�Ʊ��" value="02002" />
		<item text="��ƻ�����" value="02003" />
		<item text="��Ʊ�����" value="02004" />
		<item text="��Ʋ�Ʊ��" value="02005" />
		<item text="��ƻƽ���" value="02006" />
		<item text="���ծȯ��" value="02007" />
		<item text="���������" value="02008" />
		</item>
		<item text="���繺��" value="C202">
		<item text="��ѡ��" value="" />
		<item text="���繺���װ��" value="02009" />
		<item text="���繺����Ʒ��" value="02010" />
		<item text="���繺��Ҿ���" value="02011" />
		<item text="���繺��������" value="02012" />
		<item text="���繺��ʳƷ��" value="02013" />
		<item text="���繺��������" value="02014" />
		<item text="���繺���Ʊ��" value="02015" />
		<item text="���繺��������" value="02016" />
		<item text="���繺��������" value="02017" />
		<item text="���繺��������" value="02018" />
		<item text="���繺�������" value="02019" />
		<item text="���繺��������" value="02020" />
		</item>
		<item text="���÷���" value="C203">
		<item text="��ѡ��" value="" />
		<item text="���÷���Ƶ���" value="02021" />
		<item text="���÷����Ʊ��" value="02022" />
		<item text="���÷���������" value="02023" />
		</item>
		<item text="�ɷ�" value="C204">
		<item text="��ѡ��" value="" />
		<item text="���" value="00100" />
		<item text="ˮů��" value="00200" />
		<item text="ú����" value="00300" />
		<item text="�绰��" value="00400" />
		<item text="ͨѶ��" value="00500" />
		<item text="���շ�" value="00600" />
		<item text="���ݹ����" value="00700" />
		<item text="��������" value="00800" />
		<item text="ѧ�̷�" value="00900" />
		<item text="���ߵ��ӷ�" value="01000" />
		<item text="��ҵ�������" value="01100" />
		<item text="н�𱨳�" value="01200" />
		</item>
		<item text="���ƾ��" value="C205">
		<item text="��ѡ��" value="" />
		<item text="���ƾ��" value="02024" />
		</item>
		<item text="�����" value="C206">
		<item text="��ѡ��" value="" />
		<item text="��������" value="02025" />
		<item text="��������" value="02026" />
		<item text="��������ÿ���" value="02027" />
		</item>
		<item text="Ԥ��Ȩ����" value="C207">
		<item text="��ѡ��" value="" />
		<item text="Ԥ��Ȩ����" value="02029" />
		</item>
		<item text="�����˿�" value="C208">
		<item text="��ѡ��" value="" />
		<item text="���繺���װ��" value="02009" />
		<item text="���繺����Ʒ��" value="02010" />
		<item text="���繺��Ҿ���" value="02011" />
		<item text="���繺��������" value="02012" />
		<item text="���繺��ʳƷ��" value="02013" />
		<item text="���繺��������" value="02014" />
		<item text="���繺���Ʊ��" value="02015" />
		<item text="���繺��������" value="02016" />
		<item text="���繺��������" value="02017" />
		<item text="���繺��������" value="02018" />
		<item text="���繺�������" value="02019" />
		<item text="���繺��������" value="02020" />
		</item>
		<item text="ʵʱ����" value="C209">
		<item text="��ѡ��" value="" />
		<item text="���" value="00100" />
		<item text="ˮů��" value="00200" />
		<item text="ú����" value="00300" />
		<item text="�绰��" value="00400" />
		<item text="ͨѶ��" value="00500" />
		<item text="���շ�" value="00600" />
		<item text="���ݹ����" value="00700" />
		<item text="��������" value="00800" />
		<item text="ѧ�̷�" value="00900" />
		<item text="���ߵ��ӷ�" value="01000" />
		<item text="��ҵ�������" value="01100" />
		<item text="н�𱨳�" value="01200" />
		</item>
		<item text="����" value="C210">
		<item text="��ѡ��" value="" />
		<item text="����" value="09001" />
		</item>
		</item>
		</XML>
	
		<div align="left">
			<strong><font size="2" >����ҵ����� ->
					��������ҵ��->������¼��</font>
			</strong>
		</div>

		<br />
		<br />

		<div align="center" id="first" style="display:block">
			<form id="form1" name="form1"
				action="<%=request.getContextPath()%>/admin/ibpsdbtr101add.do?operate=sendMessage"
				method="post">
				<input type="hidden" name="token" value="${token }"/>
				<legend class="lg">
					<span class="fB"><font color="#0033FF"><strong>
								��������ҵ��</strong> </font> </span>&nbsp;&nbsp;&nbsp;&nbsp;
					<font color="#CC3300">[¼��]</font>&nbsp;&nbsp;&nbsp;&nbsp;
					<br />

					<br />
					<table width="720" border="0" cellpadding="1" cellspacing="1"
						bordercolor="#F0F0F0" bgcolor="#F0F0F0"
						style="text-align: left; vertical-align: top">
						
						<tr>
	                      <td>
						 <fieldset style="width:680px;border:1px #CCCCCC solid; padding:3px;" align=center >
  			  		      <legend >������Ϣ</legend>
  			  		      <table>
						
						<tr>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								ҵ�����ͱ���
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<SELECT name="pmttp" style="width: 100px;"></SELECT>
							</td>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								ҵ���������
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<SELECT name="pmtkd" style="width: 170px;"></SELECT>
							</td>
						</tr>
					

						<tr>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								���ҷ���
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<input name="currency" type="text" maxlength="3" value="CNY"
									readonly="readonly" />
							</td>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								���׽��
								<font color="#FF0000">*</font>
							</td>
							<td bgcolor="">
								<input type="text" name="amount" maxlength="18" 
									onKeyPress="amountPress()"
									onkeyup="value=value.replace(/[^\d.,]/g,'')  "
									onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';">
							</td>
						</tr>
						<tr>
							

							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								�����ѽ��
								<font color="#FF0000">*</font>
							</td>
							<td bgcolor="" colspan="3">
								<input type="text" name="charge" maxlength="18" 
									onKeyPress="amountPress()"
									onkeyup="value=value.replace(/[^\d.]/g,'')  "
									onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';">
							</td>
						</tr>
							</table>
                        </fieldset>
                        </td>
                        </tr>
                        <tr>
                        <td>
                         <fieldset style="width:680px;border:1px #CCCCCC solid; padding:3px;"" align=center >
  			  		      <legend >��������Ϣ</legend>
  			  		      <table> 
                        
						<tr>
						<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
									�������˻�����
								</td>
								<td width="220" bgcolor="" colspan="3">
									<select name="dbtraccttp">
										<option value="">
											��ѡ������
										</option>
										<option value="AT00">
											��λ���н����˻�
										</option>
										<option value="AT01">
											���˽�ǿ��˻�
										</option>
										<option value="AT02">
											���˴��ǿ��˻�
										</option>
									</select>
								</td>
						</tr>
						<tr>

							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								�������˺�
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<input name="dbtracctid" type="text" maxlength="32" />
							</td>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								�����˻���
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<input name="dbtrnm" type="text" maxlength="60" />
							</td>
						</tr>
						<tr>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								�����˿���������
								
							</td>
							<td width="220" bgcolor="">
								<input name="dbtracctissr" type="text" maxlength="35" />
							</td>
							<%-- 
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								�����˿������������д���
								
							</td>
							<td width="220" bgcolor="">
								<input name="dbtrctrysubdvsn" type="text" maxlength="6" />
							</td>
							--%>
						</tr>
							</table>
                        </fieldset>
                        </td>
                        </tr>
                        <tr>
                        <td>
                        
                         <fieldset style="width:680px;border:1px #CCCCCC solid; padding:3px;"" align=center >
  			  		      <legend >��������Ϣ</legend>
  			  		      <table>
					
						<tr>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								�տ����˺�
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<input name="cdtracctid" type="text" maxlength="32" />
							</td>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								�տ��˻���
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">

								<input name="cdtrnm" type="text" maxlength="60" />
							</td>
						</tr>

						<tr>
						   <td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								�տ��������к�
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">

								<input name="cdtrmmbid" type="text" maxlength="12"
									onKeyPress="bnkkeyPress()"
									onkeyup="value=value.replace(/[\W]/g,'') "
									onblur="nocn(this.name,this.value)" />
							</td>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								�տ��˿�������������ϵͳ�к�
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="" >
								<input name="cdtrbrchid" type="text" maxlength="12"
									onKeyPress="bnkkeyPress()"
									onkeyup="value=value.replace(/[\W]/g,'') "
									onblur="nocn(this.name,this.value)" />
							</td>
							
						</tr>
						
						<tr>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								����
								
							</td>
							<td bgcolor="" colspan="3">
								<textarea name="rmkInf" cols="75" rows="2"></textarea>
							</td>
						</tr>
						
							</table>
                        </fieldset>
                        </td>
                        </tr>
					</table>
					
					
				
					<div class="wdiv">
						<font color="#CC0000"><strong>ע��</strong> </font>
						<br />
					
						<font color="#00CCFF"> 1.��<font color="#FF0000">*</font>���������Ǳ��������;<br />
							2.�������ʱ����С��λ��Ϊ2λ. </font>
					</div>
					<br />
					<table border="0" cellpadding="1" cellspacing="1"
						bordercolor="#F8F8F8" bgcolor="#F0F0F0" width="400">
						<tr>
							<td width="200">
								<input type="button" class="qbutton2" id="btnSub" name="btnSub"
									value="�ύ" onclick="onsave()">
							</td>
							<td width="200">
								<input type="reset" class="qbutton2" value="����">
							</td>

						</tr>
					</table>
				</legend>

				<br />
			</form>
		</div>

		<input type="hidden" id="flag" value="0">
		<script>
    var C=AttachXMLForSelect(oxml.XMLDocument,[form1("pmttp"),form1("pmtkd")]);
</script>

	</body>

</html>