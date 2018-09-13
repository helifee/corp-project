<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 借记止付业务查询 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewbykey(indentifier,business){
		var newurl = "<%=path %>/debitStopPaymentAction.do?method=viewDetails&business="+business+"&detailid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body><br>
<html:form  method="post" action="/debitStopPaymentAction.do?method=queryMsg&business=${business}">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ><br></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
						<h5 align="left">&nbsp;</h5>
					<br></td>
					<td  width="194" ><br></td>
					<td  width="270"  ><br></td>				
					</tr>
				</table>
			<br></td>
			<td width="8" ><br></td>
		</tr>
	  	<tr valign="top">
	    	<td >
	    	<br><td >
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="10">&nbsp;<br></td>
	          			<td>
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6"><div  class="text_title"><span class="text_blue2">借记止付查询</span></div></td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head" >
                				<tr>
				                	<td  class="text_tablehead_b">报文标识号：</td>
				                  	<td >
				                   		<div align="left"><input type="text" name="po.msgid" id="po.msgid"  value="${po.msgid}"/></div>
				                  	</td>
				                  	<td  class="text_tablehead_b">支付交易组号：</td>
				                  	<td >
				                   		<div align="left"><input type="text" name="po.pmtGrpId" id="po.pmtGrpId"  value="${po.pmtGrpId}"/></div>
				                  	</td>
				                </tr> 
				                 <tr>
				                	<td  class="text_tablehead_b">接收参与机构行号：</td>
				                  	<td >
				                   		<div align="left"><input type="text" name="po.instdPty" id="po.instdPty" value="${po.instdPty}"/></div>
				                  	</td>
				                  	<td  class="text_tablehead_b">止付类型标识：</td>
				                  	<td >
				                  	<div align="left"><input type="text" name="po.grpCxlId" id="po.grpCxlId"  value="${po.grpCxlId}"/>
				                  	</div></td>
				                </tr> 
				                <tr>
				                	<td  class="text_tablehead_b">工作日期：</td>
				                  	<td >
				                  	<div align="left"><input type="text" name="" style="Wdate" id="po.workDt" value="${po.workDt}"   onclick="WdatePicker();"/></div>
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                					<td colspan="3" align="left">&nbsp;
				                  		<div align="left"><input name="query" type="button" class="button" value="查 询"  onclick="submit()"/></div> 
				                  	</td>
				                </tr> 
            				</table>
            				<br>
		            		<div align="center"><br><div align="center">
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr>
					                   <td  align="center" class="text_listhead">报文标识号</td>
					                   <td  align="center" class="text_listhead">支付交易组号</td>
					                  <td  align="center" class="text_listhead">接收参与机构行号</td>					                  
					                   <td  align="center" class="text_listhead">止付类型标识</td>
					                  <td  align="center" class="text_listhead">工作日期</td> 
					                   <td  align="center" class="text_listhead">明细</td>
					                </tr> 
					                 <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
					                  <td  class="text_list">${po.msgId}</td>
					                  <td  class="text_list">${po.pmtGrpId}</td>   
					                  <td  class="text_list">${po.instdPty}</td>
					                  <td  class="text_list">${po.grpCxlId}</td>
					                   <td  class="text_list">${po.workDt}</td>
					                  <td class="text_list"><a href="#" onclick="viewbykey('${po.msgId}','${business}')">明细</a></td>
					                  </tr>               
					                  </logic:iterate>
					                                
					                </logic:present>
					                <logic:notPresent name="queryList">
					                <tr>
					                		<td colspan="9" align="center"><font color="red">没有符合条件的记录!</font></td>
					                	</tr>
					                </logic:notPresent>
							                  </table>
					                
		             		</div>	                
	            		</div><br></td>
	        		</tr>
					<tr>  
			    		<td><br></td>      
					   	<td>
					       	<table width="100%" border="0" cellpadding="0" cellspacing="0">
					        	<tr>
					          		<td><jsp:include page="/page/common/Page.jsp"/><br></td>
					          	</tr>
				         	</table>
				        <br></td>
			     		<td><br></td>
		     		</tr>
	    		</table>
	    	<br></td>
	    	<td >le
	  	<br></tr>  
	</table>
</html:form>
</body>
</html>
