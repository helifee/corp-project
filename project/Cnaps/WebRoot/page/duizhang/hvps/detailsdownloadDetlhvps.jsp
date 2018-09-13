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
<title>大额明细下载查询列表 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>

<script language="javascript">

	
	function viewdetails(id){
		var newurl = "<%=path %>/DuizhangAction.do?method=detailsDownloadDetl&systemcd=HVPS&msgId="+id;
		viewDetails(newurl);	
	}
	
</script>

</head>
<body>
<html:form  method="post" action="/DuizhangAction.do?method=queryDetailsDownload">
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
	          			<div align="center">
								<table width="95%"  border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">大额明细下载明细</span></div>
                					</td>
                				</tr>
                			</table>
											</div>
            				 
		            		<div align="center"> 
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr class="text_listhead">
					                   <td  >原报文标识号</td>
					                   <td  >原发起参与机构</td>
					                   <td  >原报文类型代码</td>	
					                   <td  >发送接收标识</td>	
					                   <td  >处理状态</td>
					                   <td  >报文内容</td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										   <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list"><div class="gridCell_standard">${po.orgnlmsgid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.orgnlinstgpty }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.orgnlmsgtpcd }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.sndrcvtp eq 'SR00'}">发送</c:if>
							                  	<c:if test="${po.sndrcvtp eq 'SR01'}">接收</c:if>
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.prcsts eq 'PR04'}">已清算</c:if>
							                  	<c:if test="${po.prcsts eq 'PR05'}">已成功</c:if>
							                  	<c:if test="${po.prcsts eq 'PR08'}">已撤销</c:if>
							                  	<c:if test="${po.prcsts eq 'PR09'}">已拒绝</c:if>
							                  </div></td>
						                    
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
	    	<td >
	    	</td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
