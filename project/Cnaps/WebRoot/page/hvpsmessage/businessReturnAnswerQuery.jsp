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
<title>业务退回应答查询</title>
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewdetails(txid,msgid,id,pmttpbgclsotid){
		var newurl = "<%=path %>/TransProcessAction.do?method=gotoTransDetails&txid="+txid+"&msgid="+msgid+"&id="+id+"&direction=I&pmttpbgclsotid="+pmttpbgclsotid;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post" action="/TransProcessAction.do?method=querySendxml&operway=">
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
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="I"/>
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<div align="center">
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="border:1px #99bbe8 solid; padding:3px;" >
                				<tr>
                					<td colspan="8">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">汇兑组号</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>-<input type="text" name="po.endid"  maxlength="19" value="${condition.endid }"/>
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
				                   	<td class="text_tablehead_b">业务类型</td>
				                   	<td  >
				                  		<select name="po.pmttp">
				                  			<option value="">请选择</option>
				                  			<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>现金汇款</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>委托收款(划回)</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>普通借记业务</option>
				                  			<option value="C102"  ${condition.pmttp eq 'C102' ? 'selected' : '' }>个人储蓄通存业务</option>
				                  			<option value="D102"  ${condition.pmttp eq 'D102' ? 'selected' : '' }>个人储蓄通兑业务</option>
				                  			<option value="E100"  ${condition.pmttp eq 'E100' ? 'selected' : '' }>普通定期贷记业务</option>
				                  		</select>
				                  	</td>
				                </tr> 
				                <tr>
				                	<td  class="text_tablehead_b">签发日期</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>-<input type="text" name="po.enddate" class="Wdate" onclick="WdatePicker()" value="${condition.enddate }"/>
				                  	</td>
				               	 	<td  class="text_tablehead_b">客户号</td>
				                   	<td   colspan="3">
				                  		<input type="text" name="po.proposercstmrid" value="${condition.proposercstmrid }" size="32" maxlength="30"/>
				                  	</td>
				                </tr>
				                <tr>
				                		<td class="text_tablehead_b">汇款金额</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>-<input type="text" name="po.endamount" value="${condition.endamount }"/>
				                  	</td>
				                  	 	<td   class="text_tablehead_b">申请人账号</td>
				                   	<td colspan="3">
				                  		<input type="text" name="po.applicantacct" size="32" maxlength="32" value="${condition.applicantacct }"/>
				                  	</td>
				                  
				                   
				                </tr>
				                <tr>
				                	<td class="text_tablehead_b">&nbsp;</td>
                					<td colspan="6" align="right">
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr>
					                   <td  align="center" class="text_listhead">报文标识号</td>
					                   <td  align="center" class="text_listhead">签发日期</td>
					                   <td  align="center" class="text_listhead">签发行行号</td>
					                    <td  align="center" class="text_listhead">客户号</td>
					                  <td  align="center" class="text_listhead">报文编号</td>					                  
					                   <td  align="center" class="text_listhead">业务类型</td>
					                  <td  align="center" class="text_listhead">优先级</td> 
					                   <td  align="center" class="text_listhead">账号</td>
					                   <td  align="center" class="text_listhead">金额</td>					                   
					                   <td  align="center" class="text_listhead">状态</td>
					                   <td  align="center" class="text_listhead">明细</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.proposercstmrid }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">大额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">小额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">小额实时贷记</c:if>
								                   <c:if test="${po.msgtpid eq 'beps.125.001.01'}">小额定期贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">小额普通借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">小额实时借记</c:if>
								                  
								                  </div>
								               </td>
							                  
							                   <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.pmttp eq 'A108'}">现金汇款</c:if>
												<c:if test="${po.pmttp eq 'A109'}">委托收款(划回)</c:if>
												<c:if test="${po.pmttp eq 'B100'}">普通借记业务</c:if>
												<c:if test="${po.pmttp eq 'C102'}">个人储蓄通存业务</c:if>
												<c:if test="${po.pmttp eq 'D102'}">个人储蓄通兑业务</c:if>
												<c:if test="${po.pmttp eq 'E100'}">普通定期贷记业务</c:if>
							                  </div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.sttlmprty eq 'NORM'}">普通</c:if>
								                  <c:if test="${po.sttlmprty eq 'HIGH'}">紧急</c:if>
								                  <c:if test="${po.sttlmprty eq 'URGT'}">特急</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.applicantacct }</div></td>
							                <td  class="text_list"><div class="gridCell_standard">
							                  	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
							                </div></td>

							                  <td  class="text_list"><div class="gridCell_standard">
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
													</div>
							                </td>
							                 <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetails('${po.txid }','${po.msgid}','${po.id }','${po.pmttpbgclsotid}')"><u>明细</u></a></span></div>
                                               </td>				                  
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
	    	</td>
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	  	</tr>  
	</table>
</html:form>
</body>
</html>
