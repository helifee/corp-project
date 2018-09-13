<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 计费与返还通知查询列表 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>

<script language="javascript">

	
	function viewdetail(id){
		var newurl = "<%=path %>/AccountingReturnAction.do?method=sendDetailMessage&id="+id;
		viewDetails(newurl);	
	}
</script>

</head>
<body>
<html:form  method="post" action="/AccountingReturnAction.do?method=querySendxml">




<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   
  <tr valign="top">
     
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td >
				<table width="100%" height="10" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  >
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
			</td>
		</tr>
	  	<tr valign="top">
	    	<td >
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			 <table width="95%" align="center" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td ><div class="text_title"><span class="text_blue2">计费与返还通知查询列表</span></div></td><td width="781"></td>
                
                </tr>
              </table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
                				<tr>
				                	<td width="120" height="40" class="text_tablehead_b">报文标识号：</td>
				                  	<td width="120"><div align="left">
				                   		<input type="text" name="po.msgId" value="${condition.msgId }"/>
				                  	</td>
				                  	<td width="120" height="40" class="text_tablehead_b">工作日期：</td>
				                  	<td width="120"><div align="left">
				                  	
				                  	
				                  	<input  type="text" name="po.workDate"  value="${condition.workDate }" readonly="readonly" title="工作日期" style="width: 180px;"
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
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr>
					                   <td  align="center" class="text_listhead">报文标识号</td>
					                   <td  align="center" class="text_listhead">工作日期</td>
					                   <td  align="center" class="text_listhead">计费与返还类型</td>					                   
					                   <td  align="center" class="text_listhead">计费直接参与者</td>
					                   <td  align="center" class="text_listhead">计费月份</td>			                  
					                  <td  align="center" class="text_listhead">计费返还总金额</td> 
					                   <td  align="center" class="text_listhead">计费返还总金额(大额)</td>
					                     <td  align="center" class="text_listhead">计费返还总金额(小额)</td>
					                       <td  align="center" class="text_listhead">计费返还总金额(IBPS)</td>
					                        <td  align="center" class="text_listhead">操作</td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgId }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workDate }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.chargeType }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.chargeParticipant }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.chargeMonth }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.totalAmount }</div></td>	
							                   <td  class="text_list"><div class="gridCell_standard">${po.hvpsTotalAmount }</div></td>	
							                    <td  class="text_list"><div class="gridCell_standard">${po.bepsTotalAmount }</div></td>	
							                     <td  class="text_list"><div class="gridCell_standard">${po.ibpsTotalAmount }</div></td>					                  
						                      <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetail('${po.id}')"><u>明细</u></a></span></div>
                                               </td>
						                  </tr>
					                  </logic:iterate>                
					                </logic:present>
					              
		                		</table>
		             		</div>	                
	            		</td>
	        		</tr>
					<tr>  
			    		<td>&nbsp;</td>      
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
	    	</td>
	  	</tr>  
	</table>
	</tr>
	</table>
</html:form>
</body>
</html>
