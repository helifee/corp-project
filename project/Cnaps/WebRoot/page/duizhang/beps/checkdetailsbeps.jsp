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
<title>小额核对明细查询列表 </title>
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>



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
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	        			<th class="text_tablehead_b" colspan="2">
												<h4 align="center">	小额汇总对账记录列表</h4>
											</th>
	        		</tr>
	        		<tr>
	        			
	          			<td width="10">&nbsp;</td>
	          			<td>
	          				
            				<br>
		            		<div align="center"><br><table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr>
					                   <td  align="center" class="text_listhead">序号</td>
					                   <td  align="center" class="text_listhead">对账日期</td>
					                   <td  align="center" class="text_listhead">报文类型编码</td>	
					                     <td  align="center" class="text_listhead">轧差日期</td>	
					                   <td  align="center" class="text_listhead">轧差场次</td>
					                     <td  align="center" class="text_listhead">发送总笔数</td>
					                          <td  align="center" class="text_listhead">发送总金额</td>
					                          <td  align="center" class="text_listhead">接收总笔数</td>
					                          <td  align="center" class="text_listhead">接收总金额</td>
					                        <td  align="center" class="text_listhead">业务状态</td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">
							                  <td  class="text_list"><div class="gridCell_standard">${po.id }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.chckdt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgtpcd }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.netgdt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.netgrnd }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.sndttlcnt }</div></td>		
							                  <td  class="text_list"><div class="gridCell_standard">${po.sndttlamt }</div></td>	
							                  <td  class="text_list"><div class="gridCell_standard">${po.rcvttlcnt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.rcvttlamt }</div></td>					                  
						                      <td  class="text_list"><div class="gridCell_standard">${po.prcsts }</div></td>
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
