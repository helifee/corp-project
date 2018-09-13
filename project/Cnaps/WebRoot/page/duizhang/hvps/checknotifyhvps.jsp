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
<title>大额汇总核对通知查询列表 </title>
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

	
	function viewdetails1(id){
		var newurl = "<%=path %>/DuizhangAction.do?method=checkNotifyDetails&systemcd=HVPS&msgId="+id;
		viewDetails(newurl);	
	}
	function viewdetails2(chckdt){
		var newurl = "<%=path %>/DuizhangAction.do?method=checkDetails&systemcd=HVPS&chckdt="+chckdt;
		viewDetails(newurl);	
	}
</script>

</head>
<body>
<html:form  method="post" action="/DuizhangAction.do?method=checkNotifyQuery">
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
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">大额汇总核对通知查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head" >
                				<tr>
				                  	<td width="120" height="40" class="text_tablehead_b">对账日期：</td>
				                  	<td width="120"><div align="left">
					                  	<input  type="text" name="chckdt"  value="${chckdt }" readonly="readonly" title="对账日期" style="width: 180px;"
											class="Wdate" onclick="WdatePicker()" />
									</td>								
				                   	<td  width="90" height="40" class="text_tablehead_b"></td>
				                   	<td  colspan="4" align="center">
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
				                </tr> 
            				</table>
            				<br>
		            		<div align="center"><br>
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead"> 
					                   <td>报文标识号</td>
					                   <td>发起直接参与机构</td>	
					                   <td>系统类型</td>
					                   <td>对账日期</td>
					                   <td>业务报文对账记录数</td>
					                   <td>信息报文对账记录数</td>
					                   <td>明细</td>
					                   <td>对账记录列表</td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td ><div class="gridCell_standard">${po.msgid }</div></td>
							                  <td ><div class="gridCell_standard">${po.instgdrctpty }</div></td>
							                   <td ><div class="gridCell_standard">${po.systemcd }</div></td>		
							                    <td ><div class="gridCell_standard">${po.chckdt }</div></td>	
							                     <td ><div class="gridCell_standard">${po.nbofpmtchckinf }</div></td>
							                      <td ><div class="gridCell_standard">${po.nbofmsgchckinf }</div></td>					                  
						                      <td ><div align="center"><span>
                                               <a href="#"   onClick="viewdetails1('${po.msgid}')"><u>明细</u></a></span></div>
                                               </td>
						                      <td ><div align="center"><span>
                                               <a href="#"   onClick="viewdetails2('${po.chckdt}')"><u>对账记录列表</u></a></span></div>
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
