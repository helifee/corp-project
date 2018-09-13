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
<title>大额明细核对查询列表 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>

<script language="javascript">
	function sendDetailsDownload(orgnlmsgid,orgnlinstgpty,orgnlmsgtpcd,sndrcvtp){
		window.location.href="<%=path %>/DuizhangAction.do?method=sendDetailsDownloadHvps&orgnlmsgid="
			+orgnlmsgid+"&orgnlinstgpty="+orgnlinstgpty+"&orgnlmsgtpcd="+orgnlmsgtpcd+"&sndrcvtp="+sndrcvtp;
	}
</script>

</head>
<body>
<html:form  method="post" action="/DuizhangAction.do?method=XXXX">
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
	    	<td  >
	    	<td >
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	        			<td align="center" colspan="6">
	        			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">大额明细核对列表</span></div>
                					</td>
                				</tr>
                			</table>
	        			</td>
	        		</tr>
	        		<tr>
	          			<td>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
					                <td width="180" height="40"  class="text_tablehead_b">对账日期：${chckdt }</td>
					                <td width="180" height="40"  class="text_tablehead_b">来往标识：
					                	<c:if test="${sndrcvtp eq 'SR00'}">往账</c:if>
					                	<c:if test="${sndrcvtp eq 'SR01'}">来账</c:if>
					                </td>
					                <td width="180" height="40"   class="text_tablehead_b">业务类型：
					                	<c:if test="${pmttp eq 'A100'}">现金汇款</c:if>
					                	<c:if test="${pmttp eq 'A101'}">委托收款</c:if>
					               </td>
					            </tr> 
            				</table>
            				<br>
		            		<div align="center"><br><table width="95%"   class="tbcolor">
					                <tr>
					                   <td  >原报文标识号</td>
					                   <td  >原发起参与机构</td>
					                   <td  >原报文类型编码</td>	
					                   <td  >汇款金额</td>
					                   <td  >业务状态</td>
					                   <td  >报文标识号</td>
					                   <td  >报文业务状态</td>
					                   <td  >报文终态日期</td>
					                   <td  >操作</td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list"><div class="gridCell_standard">${po.orgnlmsgid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.orgnlinstgpty }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.orgnlmsgtpcd }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.amount }</div></td>		
							                  <td  class="text_list"><div class="gridCell_standard">${po.prcsts }</div></td>	
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgId }</div></td>				                  
						                      <td  class="text_list"><div class="gridCell_standard">${po.orgPrcSts }</div></td>
						                      <td  class="text_list"><div class="gridCell_standard">${po.sttlmDt }</div></td>
						                       <td  class="text_list"><div align="center"><span class="text_list">
						                       	<c:if test="${po.msgId eq '' || po.msgId ==null || po.msgId eq 'null'}">
						                       	 	<a href="#"   onClick="sendDetailsDownload('${po.orgnlmsgid}','${po.orgnlinstgpty }','${po.orgnlmsgtpcd }','${sndrcvtp}')"><u>明细下载申请发送</u></a>
						                       	</c:if>
                                              	<c:if test="${!(po.prcsts eq orgPrcSts)&& !(po.msgId eq '' || po.msgId ==null || po.msgId eq 'null') }">
													 <a href="#"   onClick="viewdetails2('${po.msgId}')"><u>业务状态查询</u></a>
												</c:if>
												</span></div>
                                               </td>
						                  </tr>
					                  </logic:iterate> 
					                    <logic:empty name="queryList">
					                  	<tr>
					                		<td colspan="9" align="center"><font color="red">没有符合条件的记录!</font></td>
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
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	    	</td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
