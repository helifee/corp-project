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
<title> 自由格式查询（发送） </title>
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
		var newurl = "<%=path %>/sendFreeMessageAction.do?method=querysendMsgdetail&business="+business+"&detailid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/sendFreeMessageAction.do?method=querysendMsg">
<input type="hidden" name="direction" value="${direction }"/>
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
                						<div  class="text_title"><span class="text_blue2">自由格式查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0"  class="table_head">
	          					<tr>
	          						<td colspan="4">&nbsp;</td>
	          					</tr>
                				<tr>
				                	<td class="text_tablehead_b">报文标识号</td>
				                  	<td >
				                   		<html:text property="po.msgid" maxlength="35" />
				                  	</td>
				                  	<td class="text_tablehead_b">工作日期</td>
				                  	<td >
				                   		<html:text property="po.workdate" styleClass="Wdate" onclick="WdatePicker()"/>
				                  	</td>
				                  
				                </tr> 
				                <tr>
				                	<td class="text_tablehead_b">系统编号</td>
				                	<td >
				                   		<select name="po.systemcd" id="systemcd">
				                   			<option value="">请选择</option>
				                   			<option value="HVPS" ${condition.systemcd eq 'HVPS' ? 'selected' : '' }>大额实时支付系统</option>
				                   			<option value="BEPS" ${condition.systemcd eq 'BEPS' ? 'selected' : '' }>小额批量支付系统</option>
				                   			<option value="IBPS" ${condition.systemcd eq 'IBPS' ? 'selected' : '' }>网上支付跨行清算系统</option>
				                   		</select>
				                  	</td>
				                  	<td class="text_tablehead_b">来往标识</td>
				                	<td >
				                   		<select name="po.direction" id="direction">
				                   			<option value="">请选择</option>
				                   			<option value="O" ${condition.direction eq 'O' ? 'selected' : '' }>发送</option>
				                   			<option value="I" ${condition.direction eq 'I' ? 'selected' : '' }>接收</option>
				                   		</select>
				                  	</td>
				                </tr>
				                <tr>
				                	 <td  class="text_tablehead_b">&nbsp;</td>
				                	  <td  >&nbsp;</td>
				                	   <td  class="text_tablehead_b">&nbsp;</td>
				                	  <td  ><input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> </td>
				                  
				                </tr>
				                <tr>
	          						<td colspan="4">&nbsp;</td>
	          					</tr>
            				</table>
            				<br>
		            		<div align="center">
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead">
					                  <td  >报文标识号</td>
					                   <td  >发起参与机构</td>
					                   <td  >接收参与机构</td>
					                   <td  >工作日期</td>
					                   <td  >终态日期</td>
					                   <td  >处理状态</td>
					                   <td  >系统编号</td>
					                   <td  >来往标识</td>
					       			   <td  >明细</td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
					                  <td  class="text_list">${po.msgid }</td>
					                  <td  class="text_list">${po.instgpty }</td>   
					                  <td  class="text_list">${po.instdpty }</td>
					                  <td  class="text_list">${po.workdate }</td>
					                   <td  class="text_list">${po.prodate }</td>
					                  <td  class="text_list">
					                  								<c:if test="${po.pmtsts eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${po.pmtsts eq 'PR08' }">已撤销</c:if>
																	<c:if test="${po.pmtsts eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${po.pmtsts eq 'PR05' }">已成功</c:if>
																	<c:if test="${po.pmtsts eq 'PR96' }">待发送    </c:if>
																	<c:if test="${po.pmtsts eq 'PR97' }">已发送    </c:if>
																	<c:if test="${po.pmtsts eq 'PR99' }">故障</c:if>
																	<c:if test="${po.pmtsts eq 'PR89' }">待回执 </c:if>
																	<c:if test="${po.pmtsts eq 'PR88' }">已回执</c:if>
					                  	
					                  
					                  </td>
					                   <td  class="text_list">
					                   	<c:if test="${po.systemcd eq 'HVPS'}">大额实时支付系统</c:if>
					                   	<c:if test="${po.systemcd eq 'BEPS'}">小额批量支付系统</c:if>
					                   	<c:if test="${po.systemcd eq 'IBPS'}">网上支付跨行清算系统</c:if>
					                   </td>
					                    <td  class="text_list">
					                   	<c:if test="${po.direction eq 'O'}">发送</c:if>
					                   	<c:if test="${po.direction eq 'I'}">接收</c:if>
					                   </td>
					                  <td  class="text_list">
            								<a href="#" onclick="viewbykey('${po.msgid}','${business}')">明细</a>
					                  </td>
					                  </tr>               
					                  </logic:iterate>
					                  <logic:notPresent name="queryList">
					                	<tr>
					                		<td colspan="9" align="center"><font color="red">没有符合条件的记录!</font></td>
					                	</tr>
					                </logic:notPresent>            
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
