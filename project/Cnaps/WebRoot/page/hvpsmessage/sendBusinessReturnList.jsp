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
<title> 业务退回申请查询 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />

	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewbykey(indentifier,orgCode){
		var newurl = "<%=path %>/businessReturnAction.do?method=viewSendBusReturnDet&detailid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/businessReturnAction.do?method=querysendMsg">
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
                						<div  class="text_title"><span class="text_blue2">业务退回申请查询</span></div>
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
				                   		<html:text property="msgID" maxlength="35" />
				                  	</td>
				                  	<td class="text_tablehead_b">工作日期</td>
				                  	<td >
				                   		<html:text property="workDt" styleClass="Wdate" onclick="WdatePicker()" readonly="readonly"/>
				                  	</td>
				                  <td class="text_tablehead_b">接收参与机构</td>
				                  	<td >
				                   		<html:text property="instdPty" maxlength="14" />
				                  	</td>
				                </tr> 
				                <tr>
				                	
				                  	<td class="text_tablehead_b">业务状态</td>
				                  	<td >
				                   		
				                   		<html:select property="status">
				                   			<html:option value="">请选择</html:option>
				                   			<html:option value="PR97">已发送</html:option>
				                   			<html:option value="PR89">待回执</html:option>
				                   			<html:option value="PR88">已回执</html:option>
				                   		</html:select>
				                  	</td>
				                  <td class="text_tablehead_b">退回类型</td>
				                  	<td >
				                   		<html:select property="backTpCd">
				                   			<html:option value="">请选择</html:option>
				                   			<html:option value="RP00">整包退回</html:option>
				                   			<html:option value="RP01">部分退回</html:option>
				                   		</html:select>
				                  	</td>
				                  	<td class="text_tablehead_b">来往标识</td>
				                  	<td >
				                   		<html:select property="direction">
				                   			<html:option value="">请选择</html:option>
				                   			<html:option value="O">发送</html:option>
				                   			<html:option value="I">接收</html:option>
				                   		</html:select>
				                  	</td>
				                </tr> 
				                <tr>
				                	 <td class="text_tablehead_b">&nbsp;</td>
				                  	<td >
				                   		&nbsp;
				                  	</td>
				                  	 <td class="text_tablehead_b">&nbsp;</td>
				                  	<td >
				                   		&nbsp;
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
					                   <td>原报文标识号</td>
					                    <td>原报文类型代码</td>
					                    <td>来往标识</td>
					                    <td>发起机构代码</td>
					                    
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
																	<c:if test="${po.status eq 'PR81' }">待复核    </c:if>
																	<c:if test="${po.status eq 'PR82' }">待审核    </c:if>
																	<c:if test="${po.status eq 'PR83' }">待审批    </c:if>
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
					                  	<c:if test="${po.backTpCd eq 'RP00'}">整包退回</c:if>
					                  	<c:if test="${po.backTpCd eq 'RP01'}">部分退回</c:if>
					                  </td>
					                  
					                   <td  class="text_list">${po.ornglMsgId}</td>
					                    <td  class="text_list">
					                    	 <c:if test="${po.ornglMsgTpCd eq 'hvps.111.001.01'}">大额客户普通贷记</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'hvps.112.001.01'}">大额机构普通贷记</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.121.001.01'}">小额客户普通贷记</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.122.001.01'}">小额机构普通贷记</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.127.001.01'}">普通借记</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.123.001.01'}">实时贷记</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.131.001.01'}">实时借记</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.125.001.01'}">定期贷记</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.133.001.01'}">定期借记</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.130.001.01'}">CIS通用回执业务报文</c:if>
					                    </td>
					                    
					                    <td  class="text_list">
					                    	<c:if test="${po.direction eq 'O'}">发送</c:if>
					                    	<c:if test="${po.direction eq 'I'}">接收</c:if>
					                    </td>
					                   <td  class="text_list">${po.orgCode}</td>
					                  <td class="text_list"><a href="#" onclick="viewbykey('${po.id}')">明细</a></td>
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
	  	</tr>  
	</table>
</html:form>
</body>
</html>
