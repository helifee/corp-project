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
<title>�����������嵥 </title>
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
                						<div  class="text_title"><span class="text_blue2">�����������嵥</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0"  class="table_head">
	          					<tr>
	          						<td colspan="4">&nbsp;</td>
	          					</tr>
                				<tr>
				                	
				                  	<td class="text_tablehead_b">��������</td>
				                  	<td >
				                   		<html:text property="po.workdate" styleClass="Wdate" onclick="WdatePicker()"/>
				                  	</td>
				                
				                	<td class="text_tablehead_b">ϵͳ���</td>
				                	<td >
				                   		<select name="po.systemcd" id="systemcd">
				                   			<option value="">��ѡ��</option>
				                   			<option value="HVPS" ${condition.systemcd eq 'HVPS' ? 'selected' : '' }>���ʵʱ֧��ϵͳ</option>
				                   			<option value="BEPS" ${condition.systemcd eq 'BEPS' ? 'selected' : '' }>С������֧��ϵͳ</option>
				                   			<option value="IBPS" ${condition.systemcd eq 'IBPS' ? 'selected' : '' }>����֧����������ϵͳ</option>
				                   		</select>
				                  	</td>
				                  	
				                </tr>
				                <tr>
				                	 <td  class="text_tablehead_b">&nbsp;</td>
				                	  <td  >&nbsp;</td>
				                	   <td  class="text_tablehead_b">&nbsp;</td>
				                	  <td  ><input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/>
				                	  <input type="button" value="�嵥��ӡ" class="button"  onclick="onprint()" >
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
					                  <td  >���</td>
					                   <td  >��������</td>
					                   <td  >�������к�</td>
					                   <td  >�������к�</td>
					                   <td  >���ı�ʶ��</td>
					                   <td  >ϵͳ���</td>
					                   <td  >֧���������</td>
					                   <td  >���</td>
					                   <td  >�տ����˺�</td>
					                   <td  >�������˺�</td>
					       			   
					                </tr> 
					                
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
					                	<td  class="text_list">1</td>
					                	 <td  class="text_list"> 2011-06-21</td>
					                	  <td  class="text_list">313191000013</td>   
					                  <td  class="text_list">313191000011</td>
					                  <td  class="text_list">2011062100005691</td>
					                 <td  class="text_list">���ʵʱ֧��ϵͳ</td>
					                 <td  class="text_list">15102011062100003498</td>
					                 <td  class="text_list">10,000</td>
					                  <td  class="text_list">6222000055000001</td>   
					                  <td  class="text_list">6222000055000003</td>
					                 
					                  </tr>               
					                 
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
