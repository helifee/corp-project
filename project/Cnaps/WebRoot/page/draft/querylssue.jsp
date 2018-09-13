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
<title> 银行汇票签发登记簿查询 </title>
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
		var newurl = "<%=path %>//applyCapitalAction.do?method=queryDetailById&detailid="+id;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post" action="/applyCapitalAction.do?method=querylssueList">
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
                						<div  class="text_title"><span class="text_blue2">银行汇票签发登记簿查询</span></div>
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
				                  	<td  class="text_tablehead_b">出票日期</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.issuedtstart" class="Wdate" onclick="WdatePicker()" value="${condition.issuedtstart }"/>-<input type="text" name="po.issuedtend" class="Wdate" onclick="WdatePicker()" value="${condition.issuedtend }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">业务状态</td>
				                  	<td  > 
				                   		<select name="po.status">
				                   			<option value="">请选择</option>
				                  			<option value="PR04" ${condition.status eq 'PR04' ? 'selected' : '' }>已清算</option>
				                  			<option value="PR09" ${condition.status eq 'PR09' ? 'selected' : '' }>已拒绝</option>
				                  			<option value="PR08" ${condition.status eq 'PR08' ? 'selected' : '' }>已撤销</option>
				                  			<option value="PR09" ${condition.status eq 'PR09' ? 'selected' : '' }>已拒绝</option>
				                  			<option value="PR21" ${condition.status eq 'PR21' ? 'selected' : '' }>已止付</option>
				                  			<option value="PR22" ${condition.status eq 'PR22' ? 'selected' : '' }>已冲正</option>
				                  			<option value="PR32" ${condition.status eq 'PR32' ? 'selected' : '' }>已超期</option>
				                  			<option value="PR05" ${condition.status eq 'PR05' ? 'selected' : '' }>已成功</option>
				                  			<option value="PR98" ${condition.status eq 'PR98' ? 'selected' : ''}>待确认    </option>
											<option value="PR90" ${condition.status eq 'PR90' ? 'selected' : ''}>新建      </option>
											<option value="PR91" ${condition.status eq 'PR91' ? 'selected' : ''}>待复核    </option>
											<option value="PR92" ${condition.status eq 'PR92' ? 'selected' : ''}>待审核    </option>
											<option value="PR93" ${condition.status eq 'PR93' ? 'selected' : ''}>待审批    </option>
											<option value="PR95" ${condition.status eq 'PR95' ? 'selected' : ''}>待组包    </option>
											<option value="PR96" ${condition.status eq 'PR96' ? 'selected' : ''}>待发送    </option>
											<option value="PR97" ${condition.status eq 'PR97' ? 'selected' : ''}>已发送    </option>
											<option value="PR11" ${condition.status eq 'PR11' ? 'selected' : ''}>已轧差排队</option> 
											<option value="PR12" ${condition.status eq 'PR12' ? 'selected' : ''}>已清算排队</option> 
											<option value="PR99" ${condition.status eq 'PR99' ? 'selected' : ''}>故障</option>
											<option value="PR03" ${condition.status eq 'PR03' ? 'selected' : ''}>已轧差</option> 
											<option value="PR89" ${condition.status eq 'PR89' ? 'selected' : ''}>待回执 </option>
											<option value="PR88" ${condition.status eq 'PR88' ? 'selected' : ''}>已回执</option>
				                  		</select>
				                  	</td>
                				</tr>
                				<tr>
                				<td class="text_tablehead_b">出票金额</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.issueamtstart" value="${condition.issueamtstart }"/>-<input type="text" name="po.issueamtend" value="${condition.issueamtend }"/>
				                  	</td>
				                  	<td class="text_tablehead_b"  >&nbsp;</td>
                					<td>
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
                				</tr>
				                <tr>
				                	
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					                <tr  class="text_listhead">
					                   <td  >汇票号码</td>
					                   <td   >汇票密押</td>
					                   <td   >出票日期</td>
					                   <td   >汇票种类</td>
					                  <td   >出票金额</td>					                  
					                   <td   >汇票申请人账号</td>
					                  <td   >汇票收款人名称</td> 
					                   <td   >最后持票人账号</td>
					                   <td   >最后持票人名称</td>					                   
					                   <td   >状态</td>
					                   <td   >明细</td>
					       				 
					                </tr>  
					                <logic:present name="querylssueList">
									  <logic:iterate id="po" name="querylssueList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  ><div >${po.notesno }</div></td>
							                  <td  ><div >${po.billseal }</div></td>
							                  <td  ><div >${po.issuedt }</div></td>
							                  <td  ><div >
							                  <c:if test="${po.billtp eq 'CT00' }">可转让汇票</c:if>
							                  <c:if test="${po.billtp eq 'CT01' }">不可转让汇票</c:if>
							                  <c:if test="${po.billtp eq 'CT02' }">现金汇票</c:if>
							                  </div></td>
							                   <td  ><div >${po.issueamt }</div></td>
							                  <td  ><div >${po.issueracct }</div></td>
							                   <td  ><div >${po.rcvrnm }</div></td>
							                    <td  ><div >${po.holderacct }</div></td>
												<td  ><div >${po.holdernm }</div></td>
                                               <td  ><div >
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
													<c:if test="${po.status eq 'PR81' }">待复核</c:if>
                                               </div></td>
							                 <td  ><div ><span >
                                               <a href="#"   onClick="viewdetails('${po.id}')"><u> 明&nbsp;细 </u></a>
                                               </span></div>
                                               </td>				                  
						                  </tr>
					                  </logic:iterate> 
					                   <logic:empty name="querylssueList">
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
