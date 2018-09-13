<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 业务退回申请查询 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />

	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewbykey(flag,id){
		var newurl = "<%=path %>/businessReturnAnswerAction.do?method=sendMsg&flag="+flag+"&id="+id;
		viewDetailsByHeightWidth(newurl,'业务退回应答录入',400,'90%');
	}
</script>
</head>
<body>
<html:form  method="post" action="/businessReturnAction.do?method=querysendMsg">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		
	  	<tr valign="top">
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
                						<div  class="text_title"><span class="text_blue2">业务退回应答发送</span></div>
                					</td>
                				</tr>
                			</table>
	          				
		            		<div align="center">
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead">
					                   <td>原业务明细标识号</td>
					                   <td>原业务报文标识号</td>
					                   <%-- 
					                   <td>原直接发起参与机构</td>
					                   <td>原直接接收参与机构</td>
					                   --%>
					                   <td>原发起参与机构</td>
					                 
					                   <td>原接收参与机构</td>
					                   <td>来往标识</td>
					                   <td>应答状态</td>
					                    <td>原业务类型代码</td>
					                    <td>原业务机构代码</td>
					                  
					       			   <td>操作</td>
					       			  
					                </tr> 
					                
					                 <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
					                  <td  class="text_list">${po.orngltxid}</td>
					                  <td  class="text_list">${po.ornglMsgId}</td>  
					                  <%--
					                  <td  class="text_list">${po.ornglInstgDrctPty}</td>
					                   <td  class="text_list">${po.ornglInstdDrctPty}</td>
					                   --%> 
					                  <td  class="text_list">${po.orgnlInstgPty}</td>
					                  <td  class="text_list">${po.ornglInstdPty}</td>
					                  <td  class="text_list">
					                  	<c:if test="${po.direction eq 'O'}">发送</c:if>
					                  	<c:if test="${po.direction eq 'I'}">接收</c:if>
					                  </td>
					                   <td  class="text_list">
					                   	<c:if test="${po.status eq '0'}">未应答</c:if>
					                   	<c:if test="${po.status eq '1'}">同意</c:if>
					                   	<c:if test="${po.status eq '2'}">不同意</c:if>
					                   </td>
					                  <td  class="text_list">
					                  		<c:if test="${po.ornglPmtTp eq 'A108'}">现金汇款</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A110'}">托收承付</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A109'}">委托收款(划回)</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A101'}">公益性资金汇划</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A102'}">国库汇款</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A104'}">国库资金贷记划拨</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A301'}">缴费业务</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A201'}">支票</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A100'}">普通汇兑</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A112'}">外汇清算</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A200'}">行间资金汇划</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A202'}">银行汇票</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A113'}">跨境支付</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A307'}">国库资金国债兑付贷记划拨</c:if>
																	<c:if test="${po.ornglPmtTp eq 'B307'}">国库资金国债兑付借记划拨</c:if>
				                  									<c:if test="${po.ornglPmtTp eq 'A106'}">支取发行基金</c:if>
																	<c:if test="${po.ornglPmtTp eq 'B100'}">普通借记业务</c:if>
																	<c:if test="${po.ornglPmtTp eq 'C102'}">个人储蓄通存业务</c:if>
																	<c:if test="${po.ornglPmtTp eq 'D102'}">个人储蓄通兑业务</c:if>
																	<c:if test="${po.ornglPmtTp eq 'E100'}">普通定期贷记业务</c:if>
																	<c:if test="${po.ornglPmtTp eq 'B308'}">支票截留</c:if>
																	<c:if test="${po.ornglPmtTp eq 'B309'}">票据截留</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A113'}">跨境支付</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A309'}">CIS通用票据业务回执</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A308'}">CIS支票业务回执</c:if>
					                  
					                  </td>
					                   <td  class="text_list">${po.orgCode}</td>
					                  
					                  <td class="text_list"><a href="#" onclick="viewbykey('1','${po.id }')">同意</a>
					                  	<a href="#" onclick="viewbykey('2','${po.id }')">拒绝</a>
					                  </td>
					                 
					                  </tr>               
					                  </logic:iterate>
					                   <logic:empty name="queryList">
					                  	<tr>
					                		<td colspan="9" align="center"><font color="red">没有符合条件的记录!</font></td>
					                	</tr>
					                  </logic:empty>    
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
