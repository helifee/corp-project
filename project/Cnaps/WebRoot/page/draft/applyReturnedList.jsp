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
<title> 银行汇票申请退回查询 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewdetails(id){
		var newurl = "<%=path %>/applyReturnedAction.do?method=queryDetailById&detailid="+id;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post" action="/applyReturnedAction.do?method=querySendxml">
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
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="O"/>
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
                						<div  class="text_title"><span class="text_blue2">银行汇票申请退回查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
                				<td  class="text_tablehead_b">工作日期</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.workdtstart" class="Wdate" onclick="WdatePicker()" value="${condition.workdtstart }"/>-<input type="text" name="po.workdtend" class="Wdate" onclick="WdatePicker()" value="${condition.workdtend }"/>
				                  	</td>
				                  	<td class="text_tablehead_b" >
																	汇票种类
																</td>
																<td >
																<select  name="po.billtp" id="po.status" style="width:180px;" title="汇票种类">
																<option value="CT00"  selected="selected">可转让汇票</option>
																<option value="CT01"  selected="selected">不可转让汇票</option>
																<option value="CT02"  selected="selected">现金汇票</option>
																</select>
																</td>
                				</tr>
                				<tr>
                				<td class="text_tablehead_b">出票金额</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.issueamtstart" value="${condition.issueamtstart }"/>-<input type="text" name="po.issueamtend" value="${condition.issueamtend }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">出票日期</td>
				                  	<td colspan="2">
				                   		<!-- <input type="text" name="po.issuedtstart" class="Wdate" onclick="WdatePicker()" value="${condition.issuedtstart }"/>-<input type="text" name="po.issuedtend" class="Wdate" onclick="WdatePicker()" value="${condition.issuedtend }"/> -->
				                   		<input type="text" name="po.issueDt" class="Wdate" onclick="WdatePicker()" value="${condition.issueDt}"/>
				                  	</td>
                				</tr>
				                <tr>
				                  	<td class="text_tablehead_b">&nbsp;</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
				                  	<td>
				                  		&nbsp; 
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
				                  	<td>
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					                <tr  class="text_listhead">
					                 
										<!-- <td  >工作日期            </td> -->
										<td  >报文标识号          </td>
										<td  >出票日期            </td>
										<td  >票据号码            </td>
										<td  >汇票密押            </td>
										<td  >汇票种类            </td>
										<td  >出票金额            </td>
										<td  >汇票签发行行号      </td>
										<td  >明细      </td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
											<!--<td  ><div >${po.workDt}</div></td>-->
												<td  ><div >${po.msgId}</div></td>
												<td  ><div >${po.issueDt}</div></td>
												<td  ><div >${po.notesNo}</div></td>
												<td  ><div >${po.billSeal}</div></td>
												<td  ><div > 
												<c:if test="${po.billTp eq 'CT00' }">可转让汇票</c:if>
							                  <c:if test="${po.billTp eq 'CT01' }">不可转让汇票</c:if>
							                  <c:if test="${po.billTp eq 'CT02' }">现金汇票</c:if>
												</div></td>
												<td align="right" ><div >
												<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.issueAmt}" />
												</div></td>
												<td  ><div >${po.issuerBk}</div></td>
												<td  ><div ><a href="#" onClick="viewdetails('${po.id}')">明&nbsp;细</div></td>
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
	    	<td ></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
