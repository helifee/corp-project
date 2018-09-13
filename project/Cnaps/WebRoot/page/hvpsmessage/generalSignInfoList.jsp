<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
%>
  
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>无标题文档</title>
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/systemGroupManage/queryGroup.js"></script>
<script type="text/javascript" src="<%=path %>/js/ybjs/hvpsfront141.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript">

	function viewDetail(detailid){
		var url="<%=path %>/generalSignInfoAction.do?method=viewDetails&id="+detailid;
		viewDetails(url);
	}
	
</script>
</head>
<body>
<html:form  method="post" action="/generalSignInfoAction.do?method=querysendMsg&business=${business}">
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
                						<div  class="text_title"><span class="text_blue2">通用签名信息查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0"  class="table_head">
	          					<tr>
	          						<td colspan="4">&nbsp;</td>
	          					</tr>
                				<tr>
				                	<td width="120"  class="text_tablehead_b">报文标识号：</td>
				                  	<td width="120"><div align="left">
				                   		<input type="text" name="msgid"/>
				                  	</td>				                  	
				                   	<td  width="90" height="40" class="text_tablehead_b"></td>
				                   	<td  colspan="4" align="center">
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
				                </tr> 
            				</table>
            				<br>
		            		<div align="center"><br><div align="center">
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead">
										<td  align="center" class="text_listhead">报文标识号</td>	
										<td  align="center" class="text_listhead">工作日期</td>
										<td  align="center" class="text_listhead">来往标识</td>
										<td  align="center" class="text_listhead">支付交易组号</td>
										<td  align="center" class="text_listhead">发起参与机构行号</td>
										<td  align="center" class="text_listhead">接收参与机构行号</td>
										<td  align="center" class="text_listhead">系统编号</td>
										<td  align="center" class="text_listhead">业务类型编码</td>
										<td  align="center" class="text_listhead">业务种类编码</td>
					                    <td  align="center" class="text_listhead">明细</td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgid }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdate }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.direction }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmtGrpId }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.sendindrctpty }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.recvindrctpty }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.systemcode }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.ctgypurpcd }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.txtpcd }</td>
							                  <td  class="text_list"><div class="gridCell_standard"><a href="#" onclick="viewDetail('${po.id }')">明细</a></td>
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
