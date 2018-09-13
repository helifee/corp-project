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
<title>�����кŲ�ѯ�б� </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
			type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>

<script language="javascript">

	
	function viewdetails(id){
		var newurl = "<%=path %>/queryBankInfoAction.do?method=querySendxml&id="+id;
		viewDetails(newurl);	
	}


// ���� Cookie 
function setCookie(name, value){ 
	expires = new Date(); 
	expires.setTime(expires.getTime() + (1000 * 86400 * 365)); 
	document.cookie = name + "=" + escape(value) + "; expires=" + expires.toGMTString() + "; path=/"; 
} 
function findBank(str1,str2,str3){
   setCookie("recvbkno",str1);
   setCookie("recvbkname",str2);
   setCookie("sabkcode",str3);
	parent.test();
	
  
}
</script>

</head>
<body>

<html:form  method="post" action="/queryBankInfoAction.do?method=querySendxml">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
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
	          			<table width="95%" border="0"  cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">�����кŲ�ѯ</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0"  cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
				                	<td  class="text_tablehead_b">��������к�</td>
				                  	<td >
				                   		<input type="text" name="po.bankcode" value="${condition.bankcode }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">�����������</td>
				                  	<td >
				                  		<input  type="text" name="po.participantshortname" 
				                  			value="${condition.participantshortname }" />
									</td>								
				                   	<td class="text_tablehead_b"></td>
				                   	<td  >
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td>
				                </tr> 
            				</table>
            				<br>
		            		<div >
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead">
					                   <td  >��������к�</td>
					                   <td  >����������</td>
					                   <td  >����������</td>
					                    <td  >�������к�</td>
					                   <td  >�б����</td>
					                  <td  >��������</td>					                  
					                  <td  >����CCPC</td> 
					                   <td  >�������ȫ��</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6" 
										   	onclick="findBank('${po.bankcode }','${po.participantname }','${po.directbankcode }')">
										   	
							                  <td  class="text_list"><div class="gridCell_standard">
												 ${po.bankcode }
							                 </td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.participantshortname }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.participanttype }</td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.directbankcode }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.bankcategorycode }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.legalperson }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.nodecode }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.participantname }</td>
						                      <td  class="text_list"><div align="center"><span class="text_list">
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
					       	<table width="95%" border="0" cellpadding="0" cellspacing="0">
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
</html:form>
</body>
</html>
