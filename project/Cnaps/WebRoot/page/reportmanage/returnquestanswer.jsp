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
<title>退回申请及应答情况登记查询</title>
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
		document.forms[0].action="<%=path %>/returnquestanswerAction.do?method=signupMsgExcel";
		
		document.forms[0].submit();
		
	}




</script>
</head>

<body>
<html:form method="post" action="/returnquestanswerAction.do?method=querySendMsg">
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
												报文标识号
											</td>
											<td>
												<html:text property="po.msgid" maxlength="35" />
											</td>
											<td class="text_tablehead_b">
												工作日期
											</td>
											<td>
												<html:text property="po.workdt" styleClass="Wdate"
													onclick="WdatePicker()" />
											</td>
										</tr>
										<tr>
											<td class="text_tablehead_b">
												来往标识
											</td>
											<td>
												<html:select property="po.direction">
													<html:option value="">请选择</html:option>
													<html:option value="I">来账</html:option>
													<html:option value="O">往账</html:option>
												</html:select>
											</td>
											<td class="text_tablehead_b">
												&nbsp;
											</td>
											<td>
												<input name="query" type="button" class="button" value="查 询"
													onclick="submit()" />
													<input name="add" type="button" class="button" value="清单打印" onclick="onprint()"/> 
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
                  <td   align="center" class="text_listhead">支付交易组号</td>
                  <td   align="center" class="text_listhead">原报文标识号</td>
                  <td   align="center" class="text_listhead">回执报文标识号</td>
                  <td   align="center" class="text_listhead">回复报文时间</td>
                  <td   align="center" class="text_listhead">发起直接参与机构</td>
                  <td   align="center" class="text_listhead">接收直接参与机构</td>
                  <td   align="center" class="text_listhead">原发起参与机构</td>
                  <td   align="center" class="text_listhead">退回类型</td>
                  <td   align="center" class="text_listhead">来往标识</td>
              
                </tr>
                <logic:present name="signupMsgList">
					<logic:iterate id="signupMsg" name="signupMsgList">
					<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
					onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
					bgcolor="E6E6E6">
					<td class="text_list">
					${signupMsg.pmtGrpId}
					</td>
					<td class="text_list">
					${signupMsg.ornglmsgid}
					</td>
					<td class="text_list">
					${signupMsg.recptmsgid}
					</td>
					<td class="text_list">
					${signupMsg.recptdttm}
					</td>
					<td class="text_list">
					${signupMsg.instgdrctpty}
					</td>
					<td class="text_list">
					${signupMsg.instddrctpty}
					</td>
					<td class="text_list">
					${signupMsg.orgnlinstgpty}
					</td>
					<td class="text_list">
					${signupMsg.backtpcd}
					</td>
					 <td  class="text_list">
                        <c:if test="${signupMsg.direction=='I'}">来帐</c:if>
                         <c:if test="${signupMsg.direction=='O'}">往帐</c:if>
                        
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
