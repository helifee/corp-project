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
<title> 业务退回应答查询 </title>
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
		var newurl = "<%=path %>/businessReturnAnswerAction.do?method=viewDetails&business="+business+"&detailid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/businessReturnAnswerAction.do?method=querysendMsg">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		
	  	<tr valign="top">
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
                						<div  class="text_title"><span class="text_blue2">业务退回应答查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0"  class="table_head">
	          					<tr>
	          						<td colspan="4">&nbsp;</td>
	          					</tr>
                				<tr>
				                	<td class="text_tablehead_b">报文标识号</td>
				                  	<td >
				                   		<html:text property="msgID" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	</td>
				                  	<td class="text_tablehead_b">工作日期</td>
				                  	<td >
				                   		<html:text property="workDt" styleClass="Wdate" onclick="WdatePicker()"/>
				                  	</td>
				                  
				                </tr> 
				                <tr>
				                	<td class="text_tablehead_b">接收参与机构</td>
				                  	<td >
				                   		<html:text property="instdPty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	</td>
				                  	<td class="text_tablehead_b">业务状态</td>
				                  	<td ><select name="status">
				                   			<option value="">请选择</option>
				                  			<option value="PR04" ${status eq 'PR04' ? 'selected' : '' }>已清算</option>
											<option value="PR09" ${status eq 'PR09' ? 'selected' : '' }>已拒绝</option>
											<option value="PR08" ${status eq 'PR08' ? 'selected' : '' }>已撤销</option>
											<option value="PR09" ${status eq 'PR09' ? 'selected' : '' }>已拒绝</option>
											<option value="PR21" ${status eq 'PR21' ? 'selected' : '' }>已止付</option>
											<option value="PR22" ${status eq 'PR22' ? 'selected' : '' }>已冲正</option>
											<option value="PR32" ${status eq 'PR32' ? 'selected' : '' }>已超期</option>
											<option value="PR05" ${status eq 'PR05' ? 'selected' : '' }>已成功</option>
											<option value="PR98" ${status eq 'PR98' ? 'selected' : ''}>待确认    </option>
											<option value="PR90" ${status eq 'PR90' ? 'selected' : ''}>新建      </option>
											<option value="PR91" ${status eq 'PR91' ? 'selected' : ''}>待复核    </option>
											<option value="PR92" ${status eq 'PR92' ? 'selected' : ''}>待审核    </option>
											<option value="PR93" ${status eq 'PR93' ? 'selected' : ''}>待审批    </option>
											<option value="PR95" ${status eq 'PR95' ? 'selected' : ''}>待组包    </option>
											<option value="PR96" ${status eq 'PR96' ? 'selected' : ''}>待发送    </option>
											<option value="PR97" ${status eq 'PR97' ? 'selected' : ''}>已发送    </option>
											<option value="PR11" ${status eq 'PR11' ? 'selected' : ''}>已轧差排队</option> 
											<option value="PR12" ${status eq 'PR12' ? 'selected' : ''}>已清算排队</option> 
											<option value="PR99" ${status eq 'PR99' ? 'selected' : ''}>故障</option>
											<option value="PR03" ${status eq 'PR03' ? 'selected' : ''}>已轧差</option> 
											<option value="PR89" ${status eq 'PR89' ? 'selected' : ''}>待回执 </option>
											<option value="PR88" ${status eq 'PR88' ? 'selected' : ''}>已回执</option>
				                  		</select>
				                  	</td>
				                  
				                </tr> 
				                <tr>
				                	 <td class="text_tablehead_b">退回类型</td>
				                  	<td >
				                   		<select name="status">
				                   			<option value="">请选择</option>
				                  			<option value="SP00" ${backTpCd eq 'SP00' ? 'selected' : '' }>整包止付</option>
											<option value="SP01" ${backTpCd eq 'SP01' ? 'selected' : '' }>部分止付</option>
				                  		</select>
				                  	</td>
				                	   <td  class="text_tablehead_b">&nbsp;</td>
				                	  <td  ><input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> </td>
				                  
				                </tr>
				                <tr>
	          						<td colspan="4">&nbsp;</td>
	          					</tr>
            				</table>
            				<br>
		            		<div align="center">
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead">
					                  	<td  >报文标识号</td>
					                   <td  >工作日期</td>
					                   <td  >接收参与机构</td>
					                   <td  >接收直接参与机构</td>
					                   <td  >业务状态</td>
					                   <td  >退回类型</td>
					       			   <td  >明细</td>
					                </tr> 
					                
					                 <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
					                  <td  class="text_list">${po.msgID}</td>
					                  <td  class="text_list">${po.workDt}</td>   
					                  <td  class="text_list">${po.instdPty}</td>
					                  <td  class="text_list">${po.instdDrctPty}</td>
					                   <td  class="text_list">
										<c:if test="${po.status eq 'PR04' }">已清算</c:if>
										<c:if test="${po.status eq 'PR09' }">已拒绝</c:if>
										<c:if test="${po.status eq 'PR08' }">已撤销</c:if>
										<c:if test="${po.status eq 'PR09' }">已拒绝</c:if>
										<c:if test="${po.status eq 'PR21' }">已止付</c:if>
										<c:if test="${po.status eq 'PR22' }">已冲正</c:if>
										<c:if test="${po.status eq 'PR32' }">已超期</c:if>
										<c:if test="${po.status eq 'PR05' }">已成功</c:if>
										<c:if test="${po.status eq 'PR98' }">待确认    </c:if>
										<c:if test="${po.status eq 'PR90' }">新建      </c:if>
										<c:if test="${po.status eq 'PR91' }">待复核    </c:if>
										<c:if test="${po.status eq 'PR92' }">待审核    </c:if>
										<c:if test="${po.status eq 'PR93' }">待审批    </c:if>
										<c:if test="${po.status eq 'PR95' }">待组包    </c:if>
										<c:if test="${po.status eq 'PR96' }">待发送    </c:if>
										<c:if test="${po.status eq 'PR97' }">已发送    </c:if>
										<c:if test="${po.status eq 'PR11' }">已轧差排队</c:if> 
										<c:if test="${po.status eq 'PR12' }">已清算排队</c:if> 
										<c:if test="${po.status eq 'PR99' }">故障</c:if>
										<c:if test="${po.status eq 'PR03' }">已轧差</c:if> 
										<c:if test="${po.status eq 'PR89' }">待回执 </c:if>
										<c:if test="${po.status eq 'PR88' }">已回执</c:if>
										</td>
					                  <td  class="text_list">
					                  <c:if test="${po.backTpCd eq 'SP00' }">整包止付</c:if>
					                  <c:if test="${po.backTpCd eq 'SP01' }">部分支付</c:if>
					                  </td>
					                  <td class="text_list"><a href="#" onclick="viewbykey('${po.msgID}','${business}')">明细</a></td>
					                  </tr>               
					                  </logic:iterate>
					                </logic:present>
					                <logic:notPresent name="queryList">
					                <tr>
					                		<td colspan="9" align="center"><font color="red">没有符合条件的记录!</font></td>
					                	</tr>
					                </logic:notPresent>                 
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
