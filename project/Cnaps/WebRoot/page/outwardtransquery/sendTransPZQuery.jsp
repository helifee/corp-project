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
<title> ֧��ҵ������ƾ֤��ѯ </title>
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
		var newurl = "<%=path %>/TransProcessAction.do?method=gotoTransDetails&pmtgrpid="+id;
		viewDetails(newurl);	
	}
	function pzPrint(id,systemcd){
		var msgtpid = document.forms[0]['po.msgtpid'].value;
		var newurl = "<%=path %>/PingzhengPrintAction.do?method=toHVPSendPZPrint&direction=O&pmtgrpid="+id+"&msgtpid="+msgtpid+"&systemcd="+systemcd;
		//window.open(newurl,"�������ƾ֤��ӡ","height=400, width=800, top=200, left=200,scrollbars=yes,resizable=yes");
		//window.location.href=newurl;
		//document.forms[0].action=newurl;
		//document.forms[0].submit();
		viewDetails(newurl);	
	}
	//ƾ֤������ӡ
	function onprintpzpd(){
		var msgtpid = document.forms[0]['po.msgtpid'].value;
		var newurl = "<%=path %>/PingzhengPrintAction.do?method=toHVPRecvPZPPrint&direction=O&msgtpid="+msgtpid;
		window.open(newurl,"�������ƾ֤��ӡ",'height=400, width=800, top=200, left=200,scrollbars=yes,resizable=yes');
		//viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/TransProcessAction.do?method=querySendxml&operway=05">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  >
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
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<div align="center">
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6"><div  class="text_title"><span class="text_blue2">����ƾ֤��ӡ</span></div></td>
                				</tr>
                				</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head" >
                				<tr>
                					<td colspan="8">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td  class="text_tablehead_b">ǩ������</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" style="width:120px;" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>-<input type="text" name="po.enddate" style="width:120px;" class="Wdate" onclick="WdatePicker()" value="${condition.enddate }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">ҵ��״̬</td>
				                  	<td  > 
				                   		<select name="po.status">
				                   			<option value="PR04" ${condition.status eq 'PR04' ? 'selected' : '' }>������</option>
				                  		</select>
				                  	</td>
				                   	<td class="text_tablehead_b">��������</td>
				                   	<td  >
				                  		<select name="po.msgtpid" >
				                  			<option value="hvps.111.001.01" ${condition.msgtpid eq 'hvps.111.001.01' ? 'selected' : '' }>��ͨ����</option>
				                  			
				                  		</select>
				                  	</td>
				                </tr> 
				               
				               
				                <tr>
				                	<td class="text_tablehead_b">&nbsp;</td>
                					<td colspan="6" align="right">
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  		 <input  type="button" value="ƾ֤����" class="button" onclick="onprintpzpd()" >&nbsp;&nbsp;
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					                <tr class="text_listhead">
					                   <td  >֧���������</td>
					                   <td  >ǩ������</td>
					                   <td  >ǩ�����к�</td>
					                   <td  >�ͻ���</td>
					                     <td  >ϵͳ����</td>	
					                  <td  >���ı��</td>					                  
					                   <td  >ҵ������</td>
					                  <td  >���ȼ�</td> 
					                   <td  >�������˺�</td>
					                   <td  >���</td>
					                    <td  >ƾ֤��ӡ</td>
					                   <td  >��ϸ</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmtgrpid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.proposercstmrid }</div></td>
							                    <td  class="text_list"><div class="gridCell_standard">
							                    	<c:if test="${po.systemcd eq 'HVPS'}">���</c:if>
							                    	<c:if test="${po.systemcd eq 'BEPS'}">С��</c:if>
							                    </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.msgtpid eq 'hvps.111.001.01'}">��ͨ����</c:if>
							                  	<c:if test="${po.msgtpid eq 'hvps.112.001.01'}">��ͨ����</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.121.001.01'}">��ͨ����</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.122.001.01'}">��ͨ����</c:if>
							                  	<c:if test="${po.msgtpid eq 'hvps.123.001.01'}">ʵʱ����</c:if>
							                  	<c:if test="${po.msgtpid eq 'hvps.124.001.01'}">ʵʱ���ǻ�ִ</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.125.001.01'}">���ڴ���</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.127.001.01'}">��ͨ���</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.125.001.01'}">���ڴ���</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.128.001.01'}">��ͨ��ǻ�ִ</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.131.001.01'}">ʵʱ���</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.132.001.01'}">ʵʱ��ǻ�ִ</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.133.001.01'}">���ڽ��</c:if>
							                  	<c:if test="${po.msgtpid eq 'beps.134.001.01'}">���ڽ�ǻ�ִ</c:if>
							                 </div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.pmttp eq'A108' }">�ֽ���</c:if>
							                  	<c:if test="${po.pmttp eq'A109' }">ί���տ�</c:if>
							                  </div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test=" ${po.sttlmprty eq 'NORM'}">��ͨ</c:if>
								                  <c:if test=" ${po.sttlmprty eq 'HIGH'}">����</c:if>
								                  <c:if test=" ${po.sttlmprty eq 'URGT'}">�ؼ�</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.applicantacct }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.amount }</div></td>
							                 
							                  <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="pzPrint('${po.pmtgrpid}','${po.systemcd}')"><u>ƾ֤��ӡ</u></a></span></div>
                                               </td>
							                 <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetails('${po.pmtgrpid}')"><u>��ϸ</u></a></span></div>
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
