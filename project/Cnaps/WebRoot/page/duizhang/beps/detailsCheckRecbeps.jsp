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
<title>С����ϸ�˶������¼��ѯ�б� </title>
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

<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>

<script language="javascript">
	function viewdetails(id,sndrcvtp,chckdt,pmttp,netgrnd){
		var newurl = "<%=path %>/DuizhangAction.do?method=gotoDetailsCheck&systemcd=BEPS&id="+id
			+"&sndrcvtp="+sndrcvtp+"&chckdt="+chckdt+"&pmttp="+pmttp+"&netgrnd="+netgrnd;
		viewDetails(newurl);	
	}
	
</script>


</head>
<body>
<html:form  method="post" action="/DuizhangAction.do?method=XXXX">
<input type="hidden" name="systemcd" value="HVPS"/>
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
	        			<td align="center">
	        			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6" >
                						<div  class="text_title"><span class="text_blue2">С����ϸ�˶�������Ϣ</span></div>
                					</td>
                				</tr>
                			</table>
	        			</td>
	        		</tr>
	        		<tr>
	        			
	          			 
	          			<td>
	          				
            				 
		            		<div align="center"> <table width="95%"  class="tbcolor">
					                <tr class="text_listhead">
					                   
					                   <td  align="center" class="text_listhead">���ı�ʶ��</td>
					                   <td  align="center" class="text_listhead">��ִ���ı�ʶ��</td>
					                    <td  align="center" class="text_listhead">��������</td>	
					                     <td  align="center" class="text_listhead">�����</td>	
					                   <td  align="center" class="text_listhead">���ͽ��ձ�ʶ</td>
					                   <td  align="center" class="text_listhead">�������ͱ���</td>
					                   <td  align="center" class="text_listhead">ҵ��״̬</td>
					                   <td  align="center" class="text_listhead">���౨����Ŀ</td>
					                   <td  align="center" class="text_listhead">ҵ����ϸ�˶�</td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                 
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.recptmsgid }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.netgdt }</div></td>
							                    <td  class="text_list"><div class="gridCell_standard">${po.netgrnd }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.sndrcvtp eq 'SR00'}">����</c:if>
							                  	<c:if test="${po.sndrcvtp eq 'SR01'}">����</c:if>
							                  </div></td>		
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgtpcd }</div></td>	
							                  <td  class="text_list"><div class="gridCell_standard">${po.prcsts }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.nbofdtls }</div></td>
						                      <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetails('${po.id}','${po.sndrcvtp}','${po.netgdt }','${po.msgtpcd }','${po.netgrnd }')"><u>ҵ����ϸ�˶�</u></a></span></div>
                                               </td>
						                  </tr>
					                  </logic:iterate> 
					                    <logic:empty name="queryList">
					                  	<tr>
					                		<td colspan="9" align="center"><font color="red">û�з��������ļ�¼!</font></td>
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
	    	</td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
