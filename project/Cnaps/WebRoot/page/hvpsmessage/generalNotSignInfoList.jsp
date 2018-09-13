<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> ͨ�÷�ǩ����Ϣ��ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewdetail(id){
		var newurl = "<%=path %>/generalNotSignInfoAction.do?method=sendDetailMessage&id="+id;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post" action="/generalNotSignInfoAction.do?method=querysendMsg&business=${business}">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td width="8" ></td>
		</tr>
	  	<tr valign="top">
	    	<td >
	    	<td >
	    	
	      		<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">ͨ�÷�ǩ����Ϣ��ѯ</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0"  class="table_head">
	          					<tr>
	          						<td colspan="4">&nbsp;</td>
	          					</tr>
                				<tr>
				                	<td width="120"  class="text_tablehead_b">���ı�ʶ�ţ�</td>
				                  	<td width="120"><div align="left">
				                   		<input type="text" name="msgId"/>
				                  	</td>				                  	
				                   	<td  width="90" height="40" class="text_tablehead_b"></td>
				                   	<td  colspan="4" align="center">
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td>
				                </tr> 
            				</table>
            				<br>
		            		<div align="center"><br><div align="center">
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead">
					                   <td  align="center" class="text_listhead">���ı�ʶ��</td>			
					                   <td  align="center" class="text_listhead">��������</td>
					                   <td  align="center" class="text_listhead">������ʶ</td>
					                   <td  align="center" class="text_listhead">֧���������</td>			                   					                  
					                   <td  align="center" class="text_listhead">�����������к�</td>
					                   <td  align="center" class="text_listhead">���ղ�������к�</td>
					                   <td  align="center" class="text_listhead">ϵͳ����</td>
					                   <td  align="center" class="text_listhead">ҵ�����ͱ���</td>
					                   <td  align="center" class="text_listhead">����</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgid }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdate }</td>
							                  <td  class="text_list">
							                   	<c:if test="${po.direction eq 'O'}">����</c:if>
							                  </td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmtGrpId }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgPty }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instdPty }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.systemcode }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.txtpcd }</td>
							                  <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetail('${po.id}')"><u>��ϸ</u></a></span></div>
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
	    	
	 
</html:form>
</body>
</html>
