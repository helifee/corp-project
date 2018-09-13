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
<title> 支付业务往报查询 </title>
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
	function viewdetails(id,pmttpbgclsotid,systemcd,txid){
		var newurl = "<%=path %>/TransProcessAction.do?method=gotoTransDetails&pmtgrpid="+id+"&pmttpbgclsotid="+pmttpbgclsotid+"&systemcd="+systemcd+"&txid="+txid;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post" action="/TransProcessAction.do?method=querySendxml&operway=07">
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
                						<div  class="text_title"><span class="text_blue2">支付业务往报查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">支付交易组号</td>
				                  	<td  colspan="2">
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>-<input type="text" name="po.endid"   value="${condition.endid }"/>

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
											<option value="PR81" ${condition.status eq 'PR81' ? 'selected' : ''}>待复核    </option>
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
				                  	<td>&nbsp;</td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b">签发日期</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>-<input type="text" name="po.enddate" class="Wdate" onclick="WdatePicker()" value="${condition.enddate }"/>
				                  	</td>
				                   	<td class="text_tablehead_b">业务类型</td>
				                   	<td  >
				                  		<select name="po.pmttp">
				                  			<option value="">请选择</option>
				                  			<option value="A100" ${condition.pmttp eq 'A100' ? 'selected' : '' }>普通汇兑</option>
				                  			<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>现金汇款</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>委托收款(划回)</option>
				                  			<option value="A110" ${condition.pmttp eq 'A110' ? 'selected' : '' }>托收承付(划回)</option>
				                  			<option value="A200" ${condition.pmttp eq 'A200' ? 'selected' : '' }>行间资金汇划</option>
				                  			<option value="A202" ${condition.pmttp eq 'A202' ? 'selected' : '' }>银行汇票</option>
				                  			<option value="A113" ${condition.pmttp eq 'A113' ? 'selected' : '' }>跨境支付</option>
				                  			<option value="A101" ${condition.pmttp eq 'A101' ? 'selected' : '' }>公益性资金汇划</option>
				                  			<option value="A102" ${condition.pmttp eq 'A102' ? 'selected' : '' }>国库汇款</option>
				                  			<option value="A104" ${condition.pmttp eq 'A104' ? 'selected' : '' }>国库资金贷记划拨</option>
				                  			<option value="B104" ${condition.pmttp eq 'B104' ? 'selected' : '' }>国库资金借记划拨</option>
				                  			<option value="A106" ${condition.pmttp eq 'A106' ? 'selected' : '' }>支取发行资金</option>
				                  			<option value="A307" ${condition.pmttp eq 'A307' ? 'selected' : '' }>国库资金国债兑付贷记划拨</option>
				                  			<option value="B307" ${condition.pmttp eq 'B307' ? 'selected' : '' }>国库资金国债兑付借记划拨</option>
				                  			<option value="A301" ${condition.pmttp eq 'A301' ? 'selected' : '' }>缴费业务</option>
				                  			<option value="A201" ${condition.pmttp eq 'A201' ? 'selected' : '' }>支票</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>普通借记</option>
				                  			<option value="B308" ${condition.pmttp eq 'B308' ? 'selected' : '' }>支票截留</option>
				                  			<option value="B309" ${condition.pmttp eq 'B309' ? 'selected' : '' }>通用票据截留</option>
				                  			<option value="C102" ${condition.pmttp eq 'C102' ? 'selected' : '' }>个人储蓄通存</option>
				                  			<option value="D102" ${condition.pmttp eq 'D102' ? 'selected' : '' }>个人储蓄通兑</option>
				                  			<option value="E100" ${condition.pmttp eq 'E100' ? 'selected' : '' }>定期贷记</option>
				                  			<option value="F100" ${condition.pmttp eq 'F100' ? 'selected' : '' }>定期借记</option>
				                  			<option value="A309" ${condition.pmttp eq 'A309' ? 'selected' : '' }>CIS通用票据业务回执</option>
				                  			<option value="A308" ${condition.pmttp eq 'A308' ? 'selected' : '' }>CIS支票业务回执</option>
				                  			<%-- 
				                  			<option value="A112" ${condition.pmttp eq 'A112' ? 'selected' : '' }>外汇清算</option>
				                  			--%>
				                  		</select>
				                  	</td>
				                  	<td>&nbsp;</td>
				                </tr> 
				                <tr>
				                	<td class="text_tablehead_b">汇款金额(范围)</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>-<input type="text" name="po.endamount" value="${condition.endamount }"/>
				                  	</td>
				                  	<td class="text_tablehead_b">系统类型</td>
				                   	<td  >
				                  		<html:select property="po.systemcd" value="${condition.systemcd }">
				                  			<html:option value="">请选择</html:option>
				                  			<html:option value="HVPS" >大额实时支付系统</html:option>
				                  			<html:option value="BEPS" >小额批量支付系统</html:option>
				                  			
				                  		</html:select>
				                  	</td>
				                </tr>
				                <tr>
				                <%-- 
				               	 	<td  class="text_tablehead_b">客户号</td>
				                   	<td colspan="2">
				                  		<input type="text" name="po.proposercstmrid" value="${condition.proposercstmrid }" size="32" maxlength="30"/>
				                  	</td>
				                  	--%>
				                  	<td   class="text_tablehead_b">申请人账号</td>
				                   	<td colspan="2">
				                  		<input type="text" name="po.applicantacct" size="32" maxlength="32" value="${condition.applicantacct }"/>
				                  	</td>
				                  	<td   class="text_tablehead_b">报文序号</td>
				                   	<td >
				                  		<input type="text" name="po.txid" size="32" maxlength="32" value="${condition.txid }"/>
				                  	</td>
				                  	<td>&nbsp;</td>
				                </tr>
				                <tr>
				                	<td class="text_tablehead_b"  colspan="4">&nbsp;</td>
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
					                <tr  class="text_listhead">
					                   <td>支付交易组号</td>
					                   <td>报文序号</td>
					                   <td>签发日期</td>
					                   <td >签发行行号</td>
					                  
					                  <td >报文编号</td>					                  
					                   <td >业务类型</td>
					                  
					                   <td   >申请人账号</td>
					                   <td   >汇款金额</td>					                   
					                   <td   >业务状态</td>
					                   <td   >机构代码</td>
					                   <td   >明细</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td><div >${po.pmtgrpid }</div></td>
							                  <td><div >${po.txid }</div></td>
							                  <td><div >${po.workdt }</div></td>
							                  <td><div >${po.instgpty }</div></td>
							                  <td>
							                  	<div >
								                   <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">大额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'hvps.112.001.01'}">大额机构普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">小额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.122.001.01'}">小额机构普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">普通借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">实时贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">实时借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.125.001.01'}">定期贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.133.001.01'}">定期借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.130.001.01'}">CIS通用回执业务报文</c:if>
								                  	
								                </div>
								               </td>
							                   <td><div >
							                     <c:if test="${po.pmttp eq 'A100'}">普通汇兑</c:if>
							                  	 <c:if test="${po.pmttp eq 'A108'}">现金汇款</c:if>
								                  <c:if test="${po.pmttp eq 'A109'}">委托收款(划回)</c:if>
								                  <c:if test="${po.pmttp eq 'A110'}">托收承付(划回)</c:if>
								                   <c:if test="${po.pmttp eq 'A200'}">行间资金汇划</c:if>
								                   <c:if test="${po.pmttp eq 'A202'}">银行汇票</c:if>
								                  <c:if test="${po.pmttp eq 'A112'}">外汇清算</c:if>
								                  <c:if test="${po.pmttp eq 'A101'}">公益性资金汇划)</c:if>
								                  <c:if test="${po.pmttp eq 'A102'}">国库汇款</c:if>
								                  <c:if test="${po.pmttp eq 'A104'}">国库资金贷记划拨</c:if>
								                   <c:if test="${po.pmttp eq 'A106'}">支取发行资金</c:if>
								                  <c:if test="${po.pmttp eq 'A301'}">缴费业务</c:if>
								                  <c:if test="${po.pmttp eq 'A201'}">支票</c:if>
								                   <c:if test="${po.pmttp eq 'B100'}">普通借记</c:if>
								                   <c:if test="${po.pmttp eq 'B104'}">国库资金借记划拨</c:if>
								                   <c:if test="${po.pmttp eq 'B307'}">国库资金国债兑付借记划拨</c:if>
								                    <c:if test="${po.pmttp eq 'A307'}">国库资金国债兑付贷记划拨</c:if>
								                   
								                     <c:if test="${po.pmttp eq 'C102'}">个人储蓄通存</c:if>
								                      <c:if test="${po.pmttp eq 'D102'}">个人储蓄通兑</c:if>
								                      <c:if test="${po.pmttp eq 'D200'}">实时代收</c:if>
								                     <c:if test="${po.pmttp eq 'C101'}">实时代付</c:if>
								                     <c:if test="${po.pmttp eq 'C210'}">薪金报酬</c:if>
								                    <c:if test="${po.pmttp eq 'C100'}">实时贷记</c:if>
								                    <c:if test="${po.pmttp eq 'D100'}">实时借记</c:if>
								                    <c:if test="${po.pmttp eq 'D203'}">实时通用票据截留</c:if>
								                     <c:if test="${po.pmttp eq 'E100'}">定期贷记</c:if>
								                   <c:if test="${po.pmttp eq 'F100'}">定期借记</c:if>
								                   <c:if test="${po.pmttp eq 'B308'}">支票截留</c:if>
								                    <c:if test="${po.pmttp eq 'B309'}">通用票据截留</c:if>
								                     <c:if test="${po.pmttp eq 'A309'}">CIS通用票据业务回执</c:if>
								                    <c:if test="${po.pmttp eq 'A308'}">CIS支票业务回执	</c:if>
							                  </div>
							                  </td>
							                 
							                  <td><div >
							                  
							                   ${po.applicantacct eq ''? po.dbtracct : po.applicantacct}
							                  
							                  </div></td>
							                  <td><div align="right">
							                  	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
							                </div></td>

							                <td>
							                  <div >
							                  	   <c:if test="${po.status eq 'PR04' }">已清算</c:if>
													<c:if test="${po.status eq 'PR09' }">已拒绝</c:if>
													<c:if test="${po.status eq 'PR08' }">已撤销</c:if>
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
												</div>
							                </td>
											<td>
												<div>
												 ${po.orgCode}
												 </div>
											</td>
							                 <td><div ><span >
                                               <a href="#"   onClick="viewdetails('${po.pmtgrpid}','${po.pmttpbgclsotid}','${po.systemcd}','${po.txid }')"><u>明细</u></a></span></div>
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
	    	<td ></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
