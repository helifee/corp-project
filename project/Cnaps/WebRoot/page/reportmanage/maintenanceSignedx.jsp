<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean"
	prefix="bean"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html"
	prefix="html"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic"
	prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 定期借记-付款签约 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewbykey(htbh){
		var newurl = "<%=path %>/RegularDebitASignupAction.do?method=sendMsgMaintenanceSignedx&syspara=mx&htbh="+htbh;
		viewDetails(newurl);
	}
	function onprint(){
		document.forms[0].action="<%=path %>/RegularDebitASignupAction.do?method=regularMsgExcel";
		alert(document.forms[0].action);
		document.forms[0].submit();
		document.forms[0].action="<%=path %>/RegularDebitASignupAction.do?method=regularMsgExcel";
	}
	
</script>
</head>
<body>
<html:form method="post" action="/regularDTurnAction.do?method=querySendMsg">
<input id="repeatmark" type="hidden" value="0">



<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">&nbsp;</h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
  <tr valign="top">
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
             <table width="95%" height="22" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2">查询条件</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
            <tr>
				                	<td width="120" height="40" class="text_tablehead_b">合同编号：</td>
				                  	<td><div align="left">
				                   		<html:text property="po.pmtagrmtnb" maxlength="26" onkeyup="fun_number(this)" onblur="fun_number(this)" style="width:200px;"/>
				                  	</td>
				                   	<td>
				                  		<input name="query" type="button" class="button" value="查 询"
													onclick="submit()" />
				                  		<input name="add" type="button" class="button" value="清单打印" onclick="onprint()"/> 
				                  	</td>
				                </tr> 
              </table>
              <table width="761" height="23" border="0" cellpadding="0" cellspacing="0">
                <tr >
                <td width="41"   ></td>
                <td width="41" align="center"></td>
                <td width="414" ><div align="right">
                </div></td>
                </tr>
              </table>
              
              <table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
                   <tr>
					                   <td  align="center" class="text_listhead">收款人代码</td>
					                   <td  align="center" class="text_listhead">收款人名称</td>
					                   <td  align="center" class="text_listhead">收款人开户行行号</td>					                  
					                   <td  align="center" class="text_listhead">付款人账号</td>
					                   <td  align="center" class="text_listhead">付款人名称</td>
					                   <td  align="center" class="text_listhead">付款人开户行行号</td>
					                   <td  align="center" class="text_listhead">扣款合同编号</td>
					                   <td  align="center" class="text_listhead">协议状态</td>
					                   <td  align="center" class="text_listhead">业务种类编码</td>
					                   <td  align="center" class="text_listhead">业务类型编码</td>

					       				 
					 </tr> 
                 <logic:present name="regularMsgList">
					<logic:iterate id="regularMsg" name="regularMsgList">
					<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
					onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
					bgcolor="E6E6E6">
					<td class="text_list">
					${regularMsg.cdtrcd}
					</td>
					<td class="text_list">
					${regularMsg.cdtrnm}
					</td>
					<td class="text_list">
					${regularMsg.cdtrissuer}
					</td>
					<td class="text_list">
					${regularMsg.dbtracct}
					</td>
					<td class="text_list">
					${regularMsg.dbtrnm}
					</td>
					<td class="text_list">
					${regularMsg.dbtrissuer}
					</td>
					<td class="text_list">
					${regularMsg.pmtagrmtnb}
					</td>
					<td class="text_list">
					${regularMsg.contractsts}
					</td>
					<td class="text_list">
					${regularMsg.pmtkd}
					</td>
					<td class="text_list">
					${regularMsg.pmttp}
					</td>
					</logic:iterate>
			</logic:present>
             </table> 
        </tr>
		<tr>  
	      <td></td>      
	      <td>
	            <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><jsp:include page="/page/common/Page.jsp"/></td>
        </tr>
      </table>	      </td>
	      <td></td>
	      </tr>
    </table>    </td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	
  </tr>  
</table></html:form>
</body>
</html>
