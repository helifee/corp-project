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
<title>净借记限额可用额度预警值设置查询 </title>
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
		var newurl = "<%=path %>/netDebitLimitWarningSetAction.do?method=sendDetailMessage&id=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/netDebitLimitWarningSetAction.do?method=querySendxml">
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
                						<div  class="text_title"><span class="text_blue2">净借记限额可用额度预警值设置查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0"  class="table_head">
                				<tr>
				                	<td width="120" height="40" class="text_tablehead_b">报文标识号：</td>
				                  	<td width="120">
				                   		<input type="text" name="po.msgid" value="${condition.msgid }"/>
				                  	</td>
				                  	<td width="120" height="40" class="text_tablehead_b">工作日期：</td>
				                  	<td width="120">
				                  	
				                  	
				                  	<input  type="text" name="po.workdate" value="${condition.workdate }" readonly="readonly" title="工作日期" style="width: 180px;"
										class="Wdate" onclick="WdatePicker()" />
										
									</td>								
				                   	<td  width="90" height="40" class="text_tablehead_b"></td>
				                   	<td  colspan="4" align="center">
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
				                </tr> 
            				</table>
            				<br>
		            		<div align="center">
		              			<table width="95%" class="tbcolor">
					                <tr>
					                   <td  align="center" class="text_listhead">报文标识号</td>
					                   <td  align="center" class="text_listhead">工作日期</td>
					                   <td  align="center" class="text_listhead">报文发送时间</td>
					                  <td  align="center" class="text_listhead">发起直接参与机构</td>					                  
					                  <td  align="center" class="text_listhead">被设置清算行行号</td> 
					                   <td  align="center" class="text_listhead">预警开启关闭类型</td>
					                   <td  align="center" class="text_listhead">可用额度预警值</td>					                   
					                   <td  align="center" class="text_listhead">业务拒绝信息</td>
					                   <td  align="center" class="text_listhead">操作</td>
					       				 
					                </tr> 
					                <!--    -->
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list">${po.msgid }</td>
							                  <td  class="text_list">${po.workdate }</td>
							                  <td  class="text_list">${po.chndttm }</td>
							                  <td  class="text_list">${po.senddrctpty }</td>
							                  <td  class="text_list">${po.memberid }</td>
							                  <td  class="text_list">${po.switchtype }</td>
							                  <td  class="text_list">${po.warningvalue }</td>   
							                  <td  class="text_list">${po.rjctdesc }</td>					                  
						                      <td  class="text_list">
                                               <a href="#"   onClick="viewbykey('${po.id}','')"><u>明细</u></a>
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
