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
<title>实时借记业务付款签约报表</title>
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemGroupManage/queryGroup.js"></script>
 
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
function onprint(){
		document.forms[0].action="<%=path %>/paySignupQueryAction.do?method=signupMsgExcel";
		
		document.forms[0].submit();
		document.forms[0].action="<%=path %>/paySignupQueryAction.do?method=signupMsgExcel";
	}




</script>
</head>

<body>
<html:form method="post" action="/paySignupQueryAction.do?method=querySendMsg">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left"> </h5>
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
              
              <table width="95%" border="0" align="center" cellpadding="0"
										class="table_head">
										<tr>
											<td colspan="4">
												&nbsp;
											</td>
										</tr>
										<tr>
											<td class="text_tablehead_b">
												签约人账号
											</td>
											<td>
												<html:text property="po.contractoracct" maxlength="35" />
											</td>
											<td class="text_tablehead_b">
												协议生效日
											</td>
											<td>
												<html:text property="po.contractfctvdt" styleClass="Wdate"
													onclick="WdatePicker()" />
											</td>
										</tr>
										<tr>
											<td class="text_tablehead_b">
												签约类型
											</td>
											<td>
												<html:select property="po.contractmd">
													
													<html:option value="A">通兑</html:option>
													<html:option value="B">通兑和账户查询</html:option>
													<html:option value="C">账户查询</html:option>
													
												</html:select>
											</td>
											<td class="text_tablehead_b">
												&nbsp;
											</td>
											<td>
												 <input name="query" type="button" class="button" value="查 询"
													onclick="submit()" />
												 <input name="addButton" type="button" class="button" value="清单打印" onclick="onprint()"/>
                 
											</td>
										</tr>
										<tr>
											<td colspan="4">
												&nbsp;
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
                  <td   align="center" class="text_listhead">签约人账号</td>
                  <td   align="center" class="text_listhead">签约人证件号</td>
                  <td   align="center" class="text_listhead">签约人地址</td>
                  <td   align="center" class="text_listhead">签约人开户行行号</td>
                  <td   align="center" class="text_listhead">签约人开户行行名</td>
                  <td   align="center" class="text_listhead">单笔累计金额上限</td>
                  <td   align="center" class="text_listhead">日累计金额上限</td>
                  <td   align="center" class="text_listhead">协议生效日</td>
                  <td   align="center" class="text_listhead">协议失效日</td>
                  <td   align="center" class="text_listhead">签约类型</td>
                  <td   align="center" class="text_listhead">协议状态</td>
                </tr>
                <logic:present name="signupMsgList">
					<logic:iterate id="signupMsg" name="signupMsgList">
					<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
					onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
					bgcolor="E6E6E6">
					<td class="text_list">
					${signupMsg.contractoracct}
					</td>
					<td class="text_list">
					${signupMsg.contractorcertid}
					</td>
					<td class="text_list">
					${signupMsg.contractoraddr}
					</td>
					<td class="text_list">
					${signupMsg.contractorissuer}
					</td>
					<td class="text_list">
					${signupMsg.contractorissuernm}
					</td>
					<td class="text_list">
					${signupMsg.singleMoney}
					</td>
					<td class="text_list">
					${signupMsg.totalMoney}
					</td>
					<td class="text_list">
					${signupMsg.contractfctvdt}
					</td>
					<td class="text_list">
					${signupMsg.contractifctvdt}
					</td>
					
					 <td  class="text_list">
                        <c:if test="${signupMsg.contractmd=='A'}">通兑</c:if>
                         <c:if test="${signupMsg.contractmd=='B'}">通兑和账户查询</c:if>
                         <c:if test="${signupMsg.contractmd=='C'}">账户查询</c:if>
					 </td>
					  <td  class="text_list">
                         <c:if test="${signupMsg.contractsts=='CS00'}">协议生效</c:if>
                         <c:if test="${signupMsg.contractsts=='CS01'}">协议失效</c:if>
                         <c:if test="${signupMsg.contractsts=='CS02'}">协议删除</c:if>
                         <c:if test="${signupMsg.contractsts=='CS03'}">协议未生效</c:if>
					 </td>
					
					</logic:iterate>
			</logic:present>
             </table></td>
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
</table>
</html:form></body>
</html>
