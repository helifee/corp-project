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
<title> ������޶��ѯ�����ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>

<script language="javascript">

	
	function viewdetails(id){
		var newurl = "<%=path %>/applicationEnterAction.do?method=sendDetailMessage&id="+id;
		viewDetails(newurl);	
	}
	
</script>

</head>
<body>
<html:form  method="post" action="/applicationEnterAction.do?method=querySendxml&business=CCMS">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td >
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
			</td>
			<td width="8" ></td>
		</tr>
	  	<tr valign="top">
	    	<td >
	    	<td >
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="8">
                						<div  class="text_title"><span class="text_blue2">������޶��ѯ</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"  class="table_head" >
                				<tr>
				                	<td width="120" height="40" class="text_tablehead_b">���ı�ʶ�ţ�</td>
				                  	<td width="120"><div align="left">
				                   		<input type="text" name="po.msgid" value="${condition.msgid }"/>
				                  	</td>
				                  	<td width="120" height="40" class="text_tablehead_b">�������ڣ�</td>
				                  	<td width="120"><div align="left">
				                  	
				                  	
				                  	<input  type="text" name="po.workdate"  value="${condition.workdate }" readonly="readonly" title="��������" style="width: 180px;"
										class="Wdate" onclick="WdatePicker()" />
										
									</td>								
				                   	<td  width="90" height="40" class="text_tablehead_b"></td>
				                   	<td  colspan="4" align="center">
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td>
				                </tr> 
            				</table>
            				<br>
		            		<br><div align="center">
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr class="text_listhead">
					                   <td  align="center" >���ı�ʶ��</td>
					                   <td  align="center" >��������</td>
					                   <td  align="center" >���ķ���ʱ��</td>
					                  <td  align="center" >����ֱ�Ӳ������</td>					                  
					                  <td  align="center" >��ǰ���þ�����޶�</td> 
					                   <td  align="center" >������޶�</td>
					                   <td  align="center" >Ȧ���ʽ�</td>					                   
					                   <td  align="center" >��Ѻ���</td>
					                   <td  align="center" >����</td>
					       				 
					                </tr> 
					              
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td >${po.msgid }</td>
							                  <td  >${po.workdate }</td>
							                  <td  >${po.chndttm }</td>
							                  <td  >${po.senddrctpty }</td>
							                  <td  >${po.availablenetdebit }</td>
							                  <td  >${po.netdebitlimit }</td>
							                  <td  >${po.creditload }</td>   
							                  <td  >${po.totalpledgevalue }</td>					                  
						                      <td  >
                                               <a href="#"   onClick="viewdetails('${po.id}')"><u>��ϸ</u></a>
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
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	    	</td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
