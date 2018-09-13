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
<title> 银行本票查询 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
var type=<%=request.getAttribute("type")%>;
	function viewdetails(paymentgrouppo,type){
		var newurl = "<%=path %>/cashierAction.do?method=gotoTransDetails&paymentgrouppo="+paymentgrouppo+"&type="+type;
		viewDetails(newurl);	
	}
	function go() {
 		var url="<%=path %>/cashierAction.do?method=querySendxml&type="+type;
  	  	document.forms[0].action = url;
 		document.forms[0].submit();
	}
	
</script>
</head>
<body>
<!--
<htmlform  method="post" action="/cashierAction.do?method=querySendxml">  -->



<html:form  method="post"  action="/cashierAction.do?method=querySendxml&type=1"> 
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0 cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
	  	<tr valign="top">
	    	<td >
	    	<td >
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="O"/>
	      		<table width="100%" border="0" cellspacing="0" cellpadding="O">
	      			<tr>
                		<td colspan="6">&nbsp;</td>
                	</tr>
	        		<tr>
	          			<td >&nbsp;</td>
	          			<td>
	          			<div  align="center">
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">银行本票查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                			
                				<tr height="30">
				                  	<td  class="text_tablehead_b">出票日期</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.issuedtstart" class="Wdate" onclick="WdatePicker()" value="${condition.issuedtstart }"/>-<input type="text" name="po.issuedtend" class="Wdate" onclick="WdatePicker()" value="${condition.issuedtend }"/>
				                  	</td>
				                  	<td class="text_tablehead_b" >
																	本票种类
																</td>
																<td >
																<select  name="po.billTp" id="billTp" style="width:180px;" title="本票种类">
																<option value=""  selected="selected">请选择</option>
																<option value="1" >现金本票</option>
																<option value="2" >转账本票</option>
																</select>
																&nbsp;&nbsp;
																<input name="query" type="button" class="button" value="查 询" onclick="go()">
																</td>
                				</tr>
                				<tr height="30">
                				<td class="text_tablehead_b">出票金额</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.issueamtstart" value="${condition.issueamtstart }"/>-<input type="text" name="po.issueamtend" value="${condition.issueamtend }"/>
				                  	</td>
				                  	<td class="text_tablehead_b"  >本票号码</td>
                					<td>
									<input type="text" name="po.honourno" id="honourno" value="${condition.honourno }">
				                  	</td>
                				</tr>
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					                <tr  class="text_listhead">
					                   <td>本票号码</td>
					                   <td>本票密押</td>
					                   <td>出票日期</td>
					                   <td>本票流水号</td>
					                   <td>本票种类</td>
					                   <td>出票金额</td>			                  
					                   <td>付款人名称</td>
					                   <td>收款人名称</td>
					                   <td>业务状态</td>
					                   <c:choose>
					                   <c:when test="${type eq '0'}"></c:when>
					                   <c:otherwise> <td>操作</td></c:otherwise>
					                   </c:choose>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td><div>${po.honourno }</div></td>
							                  <td><div>${po.billseal }</div></td>
							                  <td><div>${po.issueDt }</div></td>
							                  <td><div>${po.paymentGrouppo }</div></td>
							                  <td><div>
							                  <c:choose>
							                  <c:when test="${po.businessSizeCode eq '1' }">现金本票</c:when>
							                  <c:when test="${po.businessSizeCode eq '2' }">转账本票</c:when>
							                  <c:otherwise>${po.businessSizeCode}</c:otherwise>
							                  </c:choose>
							                  </div></td>
							                   <td><div>${po.issueAmt }</div></td>
							                   <td><div>${po.proposerNm }</div></td>
							                   <td><div>${po.name }</div></td>
							                     <td><div>
							                     <c:choose>
							                     <c:when test="${po.status eq ''}">已签发</c:when>
							                     <c:when test="${po.status eq '02'}">已退回</c:when>
							                     <c:when test="${po.status eq '01'}">已解付</c:when>
							                     <c:when test="${po.status eq '03'}">已挂失</c:when>
							                     <c:when test="${po.status eq '04'}">已解挂</c:when>
							                     <c:when test="${po.status eq '05'}">已挂失维护</c:when>
							                     <c:otherwise>
							                     ${po.status}</c:otherwise>
							                     </c:choose>
							                    </div></td>
                                                <td  ><div ><span>
                                         			<c:if test="${type eq '1'}">
                                         			<c:choose>
														 <c:when test="${po.status eq ''}">
														 	<a href="#"   onClick="viewdetails('${po.paymentGrouppo}','${type }')"><u>解&nbsp;付</u></a>
														 </c:when>
									                   <c:otherwise><del>解&nbsp;付</del>  </c:otherwise>									                  
									                  </c:choose>
									                  </c:if>
									                  <c:if test="${type eq '2'}">
									                  <c:choose>
									                  <c:when test="${po.status eq ''}">
														 	<a href="#"   onClick="viewdetails('${po.paymentGrouppo}','${type }')"><u>退&nbsp;回</u></a>
														 </c:when>
									                   <c:otherwise><del>退&nbsp;回</del> </c:otherwise>		
									                  </c:choose>
									                  </c:if>
									                  <c:if test="${type eq '3'}">
									                   <c:choose>
									                  <c:when test="${po.status eq ''}">
														 	<a href="#"   onClick="viewdetails('${po.paymentGrouppo}','${type }')"><u>挂&nbsp;失</u></a>
														 </c:when>
									                   <c:otherwise><del>挂&nbsp;失</del></c:otherwise>		
									                  </c:choose>
															
									                  </c:if>
									                  <c:if test="${type eq '4'}">
									                  <c:choose>
									                  <c:when test="${po.status eq ''}">
														 	<a href="#"   onClick="viewdetails('${po.paymentGrouppo}','${type }')"><u>挂失维护</u></a>
														 </c:when>
														 <c:when test="${po.status eq '02'}">
														 	<a href="#"   onClick="viewdetails('${po.paymentGrouppo}','${type }')"><u>挂失维护</u></a>
														 </c:when>
														 <c:when test="${po.status eq '03'}">
														 	<a href="#"   onClick="viewdetails('${po.paymentGrouppo}','${type }')"><u>挂失维护</u></a>
														 </c:when>
														 <c:when test="${po.status eq '04'}">
														 	<a href="#"   onClick="viewdetails('${po.paymentGrouppo}','${type }')"><u>挂失维护</u></a>
														 </c:when>
									                   <c:otherwise><del>挂失维护</del></c:otherwise>		
									                  </c:choose>
															
									                  </c:if>
									                  <c:if test="${type eq '5'}">
									                    <c:choose>
									                  <c:when test="${po.status eq '03'}">
														 	<a href="#"   onClick="viewdetails('${po.paymentGrouppo}','${type }')"><u>解&nbsp;挂</u></a>
														 </c:when>
									                   <c:otherwise><del>解&nbsp;挂</del></c:otherwise>		
									                  </c:choose>
															
									                  </c:if>
                                                </span></div>
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
	    	<td ></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
