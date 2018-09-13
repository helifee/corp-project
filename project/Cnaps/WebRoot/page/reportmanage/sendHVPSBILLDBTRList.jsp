<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>已签发银行汇票清单 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />

	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function onprint(){
		document.forms[0].action="<%=path %>/hvpsBillDbtrAction.do?method=queryHvpsBillMsgExcel";
		document.forms[0].submit();
		document.forms[0].action="<%=path %>/hvpsBillDbtrAction.do?method=queryHvpsBillMsg";
	}
</script>
</head>
<body>
<html:form  method="post" action="/hvpsBillDbtrAction.do?method=queryHvpsBillMsg">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		
	  	<tr valign="top">
	    	<td >
	    	<td >
	      		
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
                		<td colspan="6">&nbsp;</td>
                	</tr>
	        		<tr>
	          			<td >&nbsp;</td>
	          			<td>
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">已签发银行汇票清单</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0"  class="table_head">
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
				                	 <td  class="text_tablehead_b">&nbsp;</td>
				                	  <td  >&nbsp;</td>
				                	   <td  class="text_tablehead_b">&nbsp;</td>
				                	  <td  ><input name="query" type="button" class="button" value="查 询"  onclick="submit()"/>
				                	  <input type="button" value="清单导出" class="button"  onclick="onprint()" >
				                	   </td>
				                  
				                </tr>
				                <tr>
	          						<td colspan="4">&nbsp;</td>
	          					</tr>
            				</table>
            				<br>
		            		<div align="center">
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead">
					                  <td>
													报文标识号
												</td>
												<td>
													支付交易组号
												</td>
												<td>
													接收行行号
												</td>
												<td>
													发起行行号
												</td>
												<td>
													金额
												</td>
												<td>
													收款人账号
												</td>
												<td>
													付款人账号
												</td>
					                </tr> 
					               <logic:present name="liquidatedMsgList">
												<logic:iterate id="liquidatedMsg" name="liquidatedMsgList">
													<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
														onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
														bgcolor="E6E6E6">
														<td class="text_list">
															${liquidatedMsg.msgid }
														</td>
														<td class="text_list">
															${liquidatedMsg.pmtgrpid }
														</td>
														<td class="text_list">
															${liquidatedMsg.dbtrbrnchid }
														</td>
														<td class="text_list">
															${liquidatedMsg.cdtrbrnchid }
														</td>
														<td class="text_list">
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${liquidatedMsg.amount }"/>
														</td>
														<td class="text_list">
															${liquidatedMsg.cdtracct }
														</td>
														<td class="text_list">
															${liquidatedMsg.dbtracct }
														</td>
													</tr>
												</logic:iterate>
											</logic:present>
		                		</table>
		             		</div>	                
	            		</td>
	        		</tr>
					<tr>  
			    		<td></td>      
					   	<td>
					       	<table width="100%" border="0" cellpadding="0" cellspacing="0">
					        	<tr>
					          		<td><jsp:include page="/page/common/Page.jsp"/></td>
					          	</tr>
				         	</table>
				        </td>
			     		<td></td>
		     		</tr>
	    		</table>
	    	</td>
	    	<td >
	  	</tr>  
	</table>
</html:form>
</body>
</html>
