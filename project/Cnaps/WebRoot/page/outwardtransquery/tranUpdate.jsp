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
<title> ֧��ҵ������ά����ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />	
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
	function viewdetails(id,pmttpbgclsotid){
		var newurl = "<%=path %>/TransProcessAction.do?method=sendDetailMessage&pmtgrpid="+id+"&operway=03&pmttpbgclsotid="+pmttpbgclsotid;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post"  action="/TransProcessAction.do?method=querySendxml&operway=00">
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
                						<div  class="text_title"><span class="text_blue2"> ֧������ά����ѯ</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">������</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">ҵ��״̬</td>
				                  	<td  colspan="3">
				                   		<select name="po.status">
				                  			<option value="PR81">������</option>
				                  		</select>
				                  	</td>
				                   	<td class="text_tablehead_b">ҵ������</td>
				                   	<td  >
				                  		<html:select property="po.pmttp" value="${condition.pmttp }">
				                  			<html:option value="A108">�ֽ���</html:option>
				                  			<html:option value="A109">ί���տ�(����)</html:option>
				                  			<html:option value="A110">���ճи�(����)</html:option>
				                  			<html:option value="A101">�������ʽ�㻮</html:option>
				                  			<html:option value="A102">������</html:option>
				                  			<html:option value="A104">�����ʽ���ǻ���</html:option>
				                  			<html:option value="A301">�ɷ�ҵ��</html:option>
				                  			<html:option value="A201">֧Ʊ</html:option>
				                  			<html:option value="A100">��ͨ���</html:option>
				                  			<html:option value="A112">�������</html:option>
				                  			<html:option value="A200">�м��ʽ�㻮</html:option>
				                  			
				                  			<html:option value="B100">��ͨ���ҵ��</html:option>
				                  			<html:option value="B104">�����ʽ��ǻ���</html:option>
				                  			<html:option value="B307">�����ʽ��ծ�Ҹ���ǻ���</html:option>
				                  			<html:option value="F100">���ڽ��ҵ��</html:option>
				                  			<html:option value="C210">н�𱨳�</html:option>
				                  			<html:option value="E100">���ڴ���ҵ��</html:option>
												 	<html:option value="B308">֧Ʊ����</html:option>
				                  			<html:option value="B309">ͨ��Ʊ�ݽ���</html:option>
				                  		</html:select>
				                  	</td>
				                </tr> 
				                <tr>
				                	<td  class="text_tablehead_b">ǩ������</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>
				                  	</td>
				               	 	<td  class="text_tablehead_b">�ͻ���</td>
				                   	<td   colspan="3">
				                  		<input type="text" name="po.proposercstmrid" value="${condition.proposercstmrid }" size="32" maxlength="30"/>
				                  	</td>
				                  		<td class="text_tablehead_b">ϵͳ����</td>
				                   	<td  >
				                  		<html:select property="po.systemcd" value="${condition.systemcd }">
				                  			<html:option value="HVPS" >���ʵʱ֧��ϵͳ</html:option>
				                  			<html:option value="BEPS" >С������֧��ϵͳ</html:option>
				                  			
				                  		</html:select>
				                  	</td>
				                </tr>
				                <tr>
				                		<td class="text_tablehead_b">�����</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>
				                  	</td>
				                  	 	<td   class="text_tablehead_b">�������˺�</td>
				                   	<td colspan="3">
				                  		<input type="text" name="po.applicantacct" size="32" maxlength="32" value="${condition.applicantacct }"/>
				                  	</td>
				                  
				                   
				                </tr>
				               <tr>
				                	<td class="text_tablehead_b"  colspan="4">&nbsp;</td>
                					<td>
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					               <tr>
					                   <td  align="center" class="text_listhead">������</td>
					                   <td  align="center" class="text_listhead">ǩ������</td>
					                   <td  align="center" class="text_listhead">ǩ�����к�</td>
					                   <td  align="center" class="text_listhead">�ͻ���</td>
					                  <td  align="center" class="text_listhead">���ı��</td>					                  
					                   <td  align="center" class="text_listhead">ҵ������</td>
					                  <td  align="center" class="text_listhead">���ȼ�</td> 
					                   <td  align="center" class="text_listhead">�˺�</td>
					                   <td  align="center" class="text_listhead">���</td>					                   
					                   <td  align="center" class="text_listhead">״̬</td>
					                   <td  align="center" class="text_listhead">��ϸ</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmtgrpid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.proposercstmrid }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                   <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">���ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">С��ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">ʵʱ����</c:if>
								                   <c:if test="${po.msgtpid eq 'beps.125.001.01'}">���ڴ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">��ͨ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">ʵʱ���</c:if>
								                  </div>
								               </td>
							                  
							                  <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.pmttp eq 'A108'}">�ֽ���</c:if>
								                  <c:if test="${po.pmttp eq 'A109'}">�и��ж�(����)</c:if>
								                   <c:if test="${po.pmttp eq 'E100'}">���ڴ���</c:if>
								                   <c:if test="${po.pmttp eq 'B100'}">��ͨ���</c:if>
								                   <c:if test="${po.pmttp eq 'B104'}">�����ʽ��ǻ���</c:if>
								                   <c:if test="${po.pmttp eq 'B307'}">�����ʽ��ծ�Ҹ���ǻ���</c:if>
								                   <c:if test="${po.pmttp eq 'F100'}">���ڽ��</c:if>
								                  </div>
								               </td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.sttlmprty eq 'NORM'}">��ͨ</c:if>
								                  <c:if test="${po.sttlmprty eq 'HIGH'}">����</c:if>
								                  <c:if test="${po.sttlmprty eq 'URGT'}">�ؼ�</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.applicantacct }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                
							                     ${po.status eq 'PR81' ? '������' : ''}
							                    ${po.status eq 'PR82' ? '�����' : ''}
							                     ${po.status eq 'PR83' ? '������' : ''}
							                  
							                  
							                  </div></td> 
							                  <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetails('${po.pmtgrpid}','${po.pmttpbgclsotid}')"><u>ά��</u></a>
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
	    	<td ></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
