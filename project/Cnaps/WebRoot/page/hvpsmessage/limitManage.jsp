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
<title> 审核金额管理 </title>
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
                						<div  class="text_title"><span class="text_blue2">额度授权管理</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0"  class="table_head">

	          					  <tr>
	                                 <td colspan="4"><span class="text_tablehead">通用设置</span></td>
	                              </tr>
	          					<tr>
				               		 <td class="text_tablehead_b">网点授权单笔金额</td>
<td>
				                   		<html:text property="po.workdate"  />
				                  	</td>
				                	<td class="text_tablehead_b">上级机构授权单笔金额</td>
				                  	<td >
				                   		<html:text property="po.workdate"  />
				                  	</td>
				                 </tr>
				                 <tr>
				                  	<td class="text_tablehead_b">总行授权单笔金额</td>
				                  	<td >
				                   		<html:text property="po.workdate"  />
				                  	</td>
				                  	<td class="text_tablehead_b">总行授权日累计金额</td>
				                  	<td >
				                   		<html:text property="po.msgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
                  	</td>
				                	  <td  ><input name="query" type="button" class="button" value="设 置"  onclick="submit()"/> </td>
				                  
				                </tr>
				               <tr><td>&nbsp;</td></tr>
				                <tr>
	                                 <td colspan="4"><span class="text_tablehead">个性化设置</span></td>
	                              </tr>
	                             <tr>
	                              <td class="text_tablehead_b">机构代码</td>
				                  	<td >
				                   		<html:text property="po.workdate"  />
				                  	</td>
	                              </tr>
				               <tr>
				               		<td class="text_tablehead_b">网点授权单笔金额</td>
				                  	<td >
				                   		<html:text property="po.workdate"  />
				                  	</td>
				                	<td class="text_tablehead_b">上级机构授权单笔金额</td>
				                  	<td >
				                   		<html:text property="po.workdate"  />
				                  	</td>
				                 </tr>
				                 <tr>
				                  	<td class="text_tablehead_b">总行授权单笔金额</td>
				                  	<td >
				                   		<html:text property="po.workdate"  />
				                  	</td>
				                  	<td class="text_tablehead_b">总行授权日累计金额</td>
				                  	<td >
				                   		<html:text property="po.msgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	</td>
				                	  <td  ><input name="query" type="button" class="button" value="设 置"  onclick="submit()"/> </td>
				                  
				                </tr>
				               <tr><td>&nbsp;</td></tr>
            				</table>
            				
            				<br>
		            		<div align="center">
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr>
					                	<td align="center" class="text_listhead">机构代码</td>
					                	<td align="center" class="text_listhead">机构名称</td>
					                	<td align="center" class="text_listhead">网点授权单笔金额</td>
					                	<td align="center" class="text_listhead">上级机构授权单笔金额</td>
										<td align="center" class="text_listhead">总行授权单笔金额</td>
										<td align="center" class="text_listhead">总行授权日累计金额</td>
					                </tr> 
					                
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
					                  	<td class="text_list"><div class="gridCell_standard">1001</td>
					                  	<td class="text_list"><div class="gridCell_standard">北京工行海淀支行</td>
					                  	<td class="text_list"><div class="gridCell_standard">500,000</td>
					                  	<td class="text_list"><div class="gridCell_standard">1,000,000</td>
										<td class="text_list"><div class="gridCell_standard">10,000,000</td>
										<td class="text_list"><div class="gridCell_standard">100,000,000</td>
					                  </tr>               
					                  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
					                  	<td class="text_list"><div class="gridCell_standard">1002</td>
					                  	<td class="text_list"><div class="gridCell_standard">北京工行朝阳支行</td>
					                  	<td class="text_list"><div class="gridCell_standard">500,000</td>
					                  	<td class="text_list"><div class="gridCell_standard">1,000,000</td>
										<td class="text_list"><div class="gridCell_standard">10,000,000</td>
										<td class="text_list"><div class="gridCell_standard">100,000,000</td>
					                  </tr>
					                   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
					                  	<td class="text_list"><div class="gridCell_standard">1003</td>
					                  	<td class="text_list"><div class="gridCell_standard">北京工行昌平支行</td>
					                  	<td class="text_list"><div class="gridCell_standard">500,000</td>
					                  	<td class="text_list"><div class="gridCell_standard">1,000,000</td>
										<td class="text_list"><div class="gridCell_standard">10,000,000</td>
										<td class="text_list"><div class="gridCell_standard">100,000,000</td>
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
