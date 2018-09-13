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
<title> 信息往报查询 </title>
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
		var newurl = "<%=path %>/informationAction.do?method=querysendMsgdetail&business="+business+"&detailid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/informationAction.do?method=querysendMsg">
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
                						<div  class="text_title"><span class="text_blue2">信息往报查询</span></div>
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
				                   		<html:text property="po.msgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	</td>
				                  	<td class="text_tablehead_b">工作日期</td>
				                  	<td >
				                   		<html:text property="po.workdate"  styleClass="Wdate" onclick="WdatePicker()"/>
				                  	</td>
				                  
				                </tr> 
				                <tr>
				                	<td class="text_tablehead_b">系统编号</td>
				                	<td >
				                   		<select name="po.systemcd" id="systemcd">
				                   			<option value="HVPS" ${condition.systemcd eq 'HVPS' ? 'selected' : '' }>大额实时支付系统</option>
				                   			<option value="BEPS" ${condition.systemcd eq 'BEPS' ? 'selected' : '' }>小额批量支付系统</option>
				                   			<option value="IBPS" ${condition.systemcd eq 'IBPS' ? 'selected' : '' }>网上支付跨行清算系统</option>
				                   		</select>
				                  	</td>
				                  	<td class="text_tablehead_b">报文类型</td>
				                	<td >
				                   		<select name="po.msgtpcd" id="msgtpcd">
				                   			<option value="303" ${condition.systemcd eq '303' ? 'selected' : '' }>自由格式报文</option>
				                   			<option value="307" ${condition.systemcd eq '307' ? 'selected' : '' }>业务撤销申请报文</option>
				                   			<option value="310" ${condition.systemcd eq '310' ? 'selected' : '' }>通用非签名信息业务报文</option>
				                   			<option value="312" ${condition.systemcd eq '312' ? 'selected' : '' }>通用签名信息业务报文</option>
				                   			<option value="314" ${condition.systemcd eq '314' ? 'selected' : '' }>业务查询报文</option>
				                   			<option value="315" ${condition.systemcd eq '315' ? 'selected' : '' }>业务查复报文</option>
				                   			<option value="316" ${condition.systemcd eq '316' ? 'selected' : '' }>业务状态查询申请报文</option>
				                   			<option value="318" ${condition.systemcd eq '318' ? 'selected' : '' }>业务退回申请报文</option>
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
					       			   <td  >明细</td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
					                  <td  class="text_list">${po.msgid }</td>
					                  <td  class="text_list">${po.sendbranch }</td>   
					                  <td  class="text_list">${po.recvbranch }</td>
					                  <td  class="text_list">${po.workdate }</td>
					                
					                  <td  class="text_list">
            								<a href="#" onclick="viewbykey('${po.msgid}','${business}')">明细</a>
					                  </td>
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
