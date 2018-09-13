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
	
	font-family: "宋体", arial;
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

/* 链接颜色 */
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

/* 颜色属性 [定义规则，小写c加颜色名称] */
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

/* 字体属性 [定义规则，小写f加属性名称] */
.fB {
	font-weight: bold;
}

.fI {
	font-style: italic;
}

/* 字体大小*/
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


		<!--  练级下拉选项-->
		<script>

function onsave() {
	 //定义正则表达式
	 var reg = /(^\s)* | (\s$)* /gi;
	 //将匹配的字符换成 ""
	 //str = str.replace(reg, "");

	if(document.form1.pmttp.value.replace(reg, "")=="")
	{
		alert("业务类型编码不能为空！");
		return false;
	}
	if(document.form1.pmtkd.value.replace(reg, "")=="")
	{
		alert("业务种类编码不能为空！");
		return false;
	}
	if(document.form1.currency.value.replace(reg, "")=="")
	{
		alert("货币符号不能为空！");
		return false;
	}
	if(document.form1.amount.value.replace(reg, "")=="")
	{
		alert("交易金额不能为空！");
		return false;
	}
	if(document.form1.amount.value.replace(reg, "")=="NaN.undefined")
	{
		alert("交易金额不能为空！");
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
		alert("手续费金额不能为空！");
		return false;
	}
	if(document.form1.charge.value.replace(reg, "")=="NaN.undefined")
	{
		alert("手续费金额不能为空！");
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
		alert("付款人账号不能为空！");
		return false;
	}

	if(document.form1.dbtrnm.value.replace(reg, "")=="")
	{
		alert("付款人户名不能为空！");
		return false;
	}
	
	if(document.form1.cdtracctid.value.replace(reg, "")=="")
	{
		alert("收款人账号不能为空！");
		return false;
	}
	if(document.form1.cdtrnm.value.replace(reg, "")=="")
	{
		alert("收款人户名不能为空！");
		return false;
	}
	if(document.form1.cdtrmmbid.value.replace(reg, "")=="")
	{
		alert("收款人清算行行号不能为空！");
		return false;
	}
	
	if(document.form1.cdtrbrchid.value.replace(reg, "")=="")
	{
		alert("收款人开户行所属网银系统行号不能为空！");
		return false;
	}
	document.form1.submit();
	var pop=new Popup({ contentType:1,scrollType:'no',isReloadOnClose:false,width:360,height:200});
		 pop.setContent("contentUrl","<%=request.getContextPath()%>/admin/netbank/processtiao.jsp");
		 pop.setContent("title","提示信息");
		  pop.build();
		  pop.show();
}


function fmoney(s, n)//将数字转换成逗号分隔的样式,保留两位小数s:value,n:小数位数      
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
//还原金额   
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
			alert("这里不能输入中文/全角字符");
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

 //检查参数
 if(xd==null||xd.documentElement==null||arr==null||arr.length==0)
  throw(new Error(-1,"invalid arguments"));

 //转换成内部的xd
 (function(xmldom){
  xd=new ActiveXObject("Microsoft.XMLDOM");
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
</script>
	</head>
	<body>
		<XML id="oxml">
		<item>
		<item text="请选择" value="">
		<item text="请选择" value="" />
		</item>
		<item text="汇兑" value="C200">
		<item text="请选择" value="" />
		<item text="汇兑" value="02001" />
		</item>
		<item text="投资理财" value="C201">
		<item text="请选择" value="" />
		<item text="理财股票类" value="02002" />
		<item text="理财基金类" value="02003" />
		<item text="理财保险类" value="02004" />
		<item text="理财彩票类" value="02005" />
		<item text="理财黄金类" value="02006" />
		<item text="理财债券类" value="02007" />
		<item text="理财其他类" value="02008" />
		</item>
		<item text="网络购物" value="C202">
		<item text="请选择" value="" />
		<item text="网络购物服装类" value="02009" />
		<item text="网络购物饰品类" value="02010" />
		<item text="网络购物家居类" value="02011" />
		<item text="网络购物生活类" value="02012" />
		<item text="网络购物食品类" value="02013" />
		<item text="网络购物虚拟类" value="02014" />
		<item text="网络购物机票类" value="02015" />
		<item text="网络购物旅游类" value="02016" />
		<item text="网络购物美容类" value="02017" />
		<item text="网络购物数码类" value="02018" />
		<item text="网络购物电器类" value="02019" />
		<item text="网络购物文体类" value="02020" />
		</item>
		<item text="商旅服务" value="C203">
		<item text="请选择" value="" />
		<item text="商旅服务酒店类" value="02021" />
		<item text="商旅服务机票类" value="02022" />
		<item text="商旅服务其他类" value="02023" />
		</item>
		<item text="缴费" value="C204">
		<item text="请选择" value="" />
		<item text="电费" value="00100" />
		<item text="水暖费" value="00200" />
		<item text="煤气费" value="00300" />
		<item text="电话费" value="00400" />
		<item text="通讯费" value="00500" />
		<item text="保险费" value="00600" />
		<item text="房屋管理费" value="00700" />
		<item text="代理服务费" value="00800" />
		<item text="学教费" value="00900" />
		<item text="有线电视费" value="01000" />
		<item text="企业管理费用" value="01100" />
		<item text="薪金报酬" value="01200" />
		</item>
		<item text="慈善捐款" value="C205">
		<item text="请选择" value="" />
		<item text="慈善捐款" value="02024" />
		</item>
		<item text="贷款还款" value="C206">
		<item text="请选择" value="" />
		<item text="贷款还款房贷类" value="02025" />
		<item text="贷款还款车贷类" value="02026" />
		<item text="贷款还款信用卡类" value="02027" />
		</item>
		<item text="预授权结算" value="C207">
		<item text="请选择" value="" />
		<item text="预授权结算" value="02029" />
		</item>
		<item text="交易退款" value="C208">
		<item text="请选择" value="" />
		<item text="网络购物服装类" value="02009" />
		<item text="网络购物饰品类" value="02010" />
		<item text="网络购物家居类" value="02011" />
		<item text="网络购物生活类" value="02012" />
		<item text="网络购物食品类" value="02013" />
		<item text="网络购物虚拟类" value="02014" />
		<item text="网络购物机票类" value="02015" />
		<item text="网络购物旅游类" value="02016" />
		<item text="网络购物美容类" value="02017" />
		<item text="网络购物数码类" value="02018" />
		<item text="网络购物电器类" value="02019" />
		<item text="网络购物文体类" value="02020" />
		</item>
		<item text="实时代付" value="C209">
		<item text="请选择" value="" />
		<item text="电费" value="00100" />
		<item text="水暖费" value="00200" />
		<item text="煤气费" value="00300" />
		<item text="电话费" value="00400" />
		<item text="通讯费" value="00500" />
		<item text="保险费" value="00600" />
		<item text="房屋管理费" value="00700" />
		<item text="代理服务费" value="00800" />
		<item text="学教费" value="00900" />
		<item text="有线电视费" value="01000" />
		<item text="企业管理费用" value="01100" />
		<item text="薪金报酬" value="01200" />
		</item>
		<item text="其他" value="C210">
		<item text="请选择" value="" />
		<item text="其他" value="09001" />
		</item>
		</item>
		</XML>
	
		<div align="left">
			<strong><font size="2" >网银业务管理 ->
					网银贷记业务->付款行录入</font>
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
								网银贷记业务</strong> </font> </span>&nbsp;&nbsp;&nbsp;&nbsp;
					<font color="#CC3300">[录入]</font>&nbsp;&nbsp;&nbsp;&nbsp;
					<br />

					<br />
					<table width="720" border="0" cellpadding="1" cellspacing="1"
						bordercolor="#F0F0F0" bgcolor="#F0F0F0"
						style="text-align: left; vertical-align: top">
						
						<tr>
	                      <td>
						 <fieldset style="width:680px;border:1px #CCCCCC solid; padding:3px;" align=center >
  			  		      <legend >交易信息</legend>
  			  		      <table>
						
						<tr>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								业务类型编码
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<SELECT name="pmttp" style="width: 100px;"></SELECT>
							</td>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								业务种类编码
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<SELECT name="pmtkd" style="width: 170px;"></SELECT>
							</td>
						</tr>
					

						<tr>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								货币符号
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<input name="currency" type="text" maxlength="3" value="CNY"
									readonly="readonly" />
							</td>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								交易金额
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
								手续费金额
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
  			  		      <legend >付款人信息</legend>
  			  		      <table> 
                        
						<tr>
						<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
									付款人账户类型
								</td>
								<td width="220" bgcolor="" colspan="3">
									<select name="dbtraccttp">
										<option value="">
											请选择类型
										</option>
										<option value="AT00">
											单位银行结算账户
										</option>
										<option value="AT01">
											个人借记卡账户
										</option>
										<option value="AT02">
											个人贷记卡账户
										</option>
									</select>
								</td>
						</tr>
						<tr>

							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								付款人账号
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<input name="dbtracctid" type="text" maxlength="32" />
							</td>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								付款人户名
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<input name="dbtrnm" type="text" maxlength="60" />
							</td>
						</tr>
						<tr>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								付款人开户行名称
								
							</td>
							<td width="220" bgcolor="">
								<input name="dbtracctissr" type="text" maxlength="35" />
							</td>
							<%-- 
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								付款人开户行所属城市代码
								
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
  			  		      <legend >接收人信息</legend>
  			  		      <table>
					
						<tr>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								收款人账号
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">
								<input name="cdtracctid" type="text" maxlength="32" />
							</td>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								收款人户名
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">

								<input name="cdtrnm" type="text" maxlength="60" />
							</td>
						</tr>

						<tr>
						   <td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								收款清算行行号
								<font color="#FF0000">*</font>
							</td>
							<td width="220" bgcolor="">

								<input name="cdtrmmbid" type="text" maxlength="12"
									onKeyPress="bnkkeyPress()"
									onkeyup="value=value.replace(/[\W]/g,'') "
									onblur="nocn(this.name,this.value)" />
							</td>
							<td width="130" bgcolor="#F0F0F0" align="right" class="text1">
								收款人开户行所属网银系统行号
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
								附言
								
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
						<font color="#CC0000"><strong>注意</strong> </font>
						<br />
					
						<font color="#00CCFF"> 1.带<font color="#FF0000">*</font>的输入项是必须输入的;<br />
							2.金额输入时币种小数位数为2位. </font>
					</div>
					<br />
					<table border="0" cellpadding="1" cellspacing="1"
						bordercolor="#F8F8F8" bgcolor="#F0F0F0" width="400">
						<tr>
							<td width="200">
								<input type="button" class="qbutton2" id="btnSub" name="btnSub"
									value="提交" onclick="onsave()">
							</td>
							<td width="200">
								<input type="reset" class="qbutton2" value="重置">
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