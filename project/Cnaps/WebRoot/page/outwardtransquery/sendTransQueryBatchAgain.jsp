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
<title> 批量包重发查询 </title>
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
	function viewdetails(id,pmttpbgclsotid,systemcd){
		var newurl = "<%=path %>/TransProcessAction.do?method=sendDetailMessage&pmtgrpid="+id+"&pmttpbgclsotid="+pmttpbgclsotid+"&operway=00"+"&systemcd="+systemcd;
		var oldurl = "<%=path %>/TransProcessAction.do?method=querySendxml&operway=00";
		viewDetails(newurl);
		//viewcheck(newurl,oldurl,"复核界面",document);
		
	}
</script>
</head>
<body>
<html:form  method="post"  action="/TransProcessAction.do?method=queryPKGInfoAgain">
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
                						<div  class="text_title"><span class="text_blue2">小额汇兑包查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">报文标识号</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="po.msgid"  value="${condition.msgid }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">签发日期</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">处理状态</td>
				                  	<td colspan="3">
										<html:select property="po.prcsts">
										<html:option value="">请选择</html:option>
										<html:option value="PR97">已发送</html:option>
										<html:option value="PR89">待回执</html:option>
										<html:option value="PR09">已拒绝</html:option>
										</html:select>
				                  	</td>
                					<td>
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					               <tr>
					                   <td  align="center" class="text_listhead">汇兑组号</td>
					                   <td  align="center" class="text_listhead">签发行行号</td>
					                  <td  align="center" class="text_listhead">报文编号</td>					                  
					                   <td  align="center" class="text_listhead">业务类型</td>
					                   <td  align="center" class="text_listhead">总金额</td>					                   
					                   <td  align="center" class="text_listhead">总笔数</td>					                   
					                   <td  align="center" class="text_listhead">状态</td>
					                   <td  align="center" class="text_listhead">操作</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmtgrpid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                   <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">大额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">小额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">实时贷记</c:if>
								                   <c:if test="${po.msgtpid eq 'beps.125.001.01'}">定期贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">普通借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">实时借记</c:if>
								                  </div>
								               </td>
							                  
							                  <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.pmttp eq 'A108'}">现金汇款</c:if>
								                  <c:if test="${po.pmttp eq 'A109'}">托付承兑(划回)</c:if>
								                   <c:if test="${po.pmttp eq 'E100'}">定期贷记</c:if>
								                   <c:if test="${po.pmttp eq 'B100'}">普通借记</c:if>
								                   <c:if test="${po.pmttp eq 'B104'}">国库资金借记划拨</c:if>
								                   <c:if test="${po.pmttp eq 'B307'}">国库资金国债兑付借记划拨</c:if>
								                   <c:if test="${po.pmttp eq 'F100'}">定期借记</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.ctrlsum }"/>
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.nboftxs }
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                	<c:if test="${po.prcsts eq 'PR91'}">待复核</c:if>
							                	<c:if test="${po.prcsts eq 'PR95'}">待组包</c:if>
							                	<c:if test="${po.prcsts eq 'PR96'}">待发送</c:if>
							                  
							                  </div></td> 
							                  <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#" onClick="viewdetails('${po.pmtgrpid}','${po.systemcd}')"><u>重发</u></a>
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
	    	
	  	</tr>  
	</table>
</html:form>
</body>
</html>
