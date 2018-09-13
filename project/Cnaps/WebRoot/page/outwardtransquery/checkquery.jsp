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
<title> 支付业务复核往报查询 </title>
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
		var newurl = "<%=path %>/TransProcessAction.do?method=sendDetailMessage&pmtgrpid="+id+"&pmttpbgclsotid="+pmttpbgclsotid+"&pmttp=${po.pmttp}&operway=00"+"&systemcd="+systemcd;
		var oldurl = "<%=path %>/TransProcessAction.do?method=querySendxml&operway=00";
		viewcheck(newurl,oldurl,"复核界面",document);
		
	}
	function viewdetailsback(id,pmttpbgclsotid,systemcd){
		var newurl = "<%=path %>/TransProcessAction.do?method=sendDetailMessage&pmtgrpid="+id
			+"&pmttpbgclsotid="+pmttpbgclsotid+"&operway=001"+"&systemcd="+systemcd;
		viewDetails(newurl);
		
	}
</script>
</head>
<body>
<html:form  method="post"  action="/TransProcessAction.do?method=querySendxml&operway=00">
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
                						<div  class="text_title"><span class="text_blue2">支付业务复核查询</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="7">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">支付交易组号</td>
				                  	<td  >
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b" >业务状态</td>
				                  	<td  >
				                   		<html:select property="po.status" value="${condition.status }">
				                  			<html:option value="PR81">待复核</html:option>
				                  			<html:option value="PR82">待审核</html:option>
				                  			
				                  		</html:select>
				                  	</td>
				                   	<td class="text_tablehead_b">业务类型</td>
				                   	<td  colspan="2">
				                  		<html:select property="po.pmttp" value="${condition.pmttp }">
				                  			<html:option value="">请选择</html:option>
				                  			<html:option value="A100">普通汇兑</html:option>
				                  			<html:option value="A108">现金汇款</html:option>
				                  			<html:option value="A109">委托收款(划回)</html:option>
				                  			<html:option value="A110">托收承付(划回)</html:option>
				                  			<html:option value="A101">公益性资金汇划</html:option>
				                  			<html:option value="A102">国库汇款</html:option>
				                  			<html:option value="A104">国库资金贷记划拨</html:option>
				                  			<html:option value="A106">支取发行资金</html:option>
				                  			<html:option value="A301">缴费业务</html:option>
				                  			<html:option value="A201">支票</html:option>
				                  			<html:option value="A112">外汇清算</html:option>
				                  			<html:option value="A200">行间资金汇划</html:option>
				                  			<html:option value="A202">银行汇票</html:option>
				                  			<html:option value="B100">普通借记业务</html:option>
				                  			<html:option value="B104">国库资金借记划拨</html:option>
				                  			<html:option value="B307">国库资金国债兑付借记划拨</html:option>
				                  			<html:option value="A307">国库资金国债兑付贷记划拨</html:option>
				                  			<html:option value="A113">跨境支付</html:option>
				                  			<html:option value="B308">支票截留</html:option>
				                  			<html:option value="B309">通用票据截留</html:option>
				                  			<html:option value="E100">定期贷记业务</html:option>
				                  			<html:option value="C210">薪金报酬</html:option>
				                  			<html:option value="A101">公益性资金汇划</html:option>
				                  			<html:option value="F100">定期借记业务</html:option>
				                  			<html:option value="E102">定期代收</html:option>
				                  	       <html:option value="A308"  >CIS支票业务回执</html:option >
				                  		</html:select>
				                  	</td>
				                </tr> 
				                <tr>
				                	<td  class="text_tablehead_b">签发日期</td>
				                  	<td >
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>
				                  	</td>
				                  	<%--
				               	 	<td  class="text_tablehead_b">客户号</td>
				                   	<td   colspan="3">
				                  		<input type="text" name="po.proposercstmrid" value="${condition.proposercstmrid }" size="32" maxlength="30"/>
				                  	</td>
				                  	 --%>
				                  		<td class="text_tablehead_b">系统类型</td>
				                   	<td  >
				                  		<html:select property="po.systemcd" value="${condition.systemcd }">
				                  			<html:option value="">请选择</html:option>
				                  			<html:option value="HVPS" >大额实时支付系统</html:option>
				                  			<html:option value="BEPS" >小额批量支付系统</html:option>
				                  			
				                  		</html:select>
				                  	</td>
				                  		<td   class="text_tablehead_b">申请人账号</td>
				                   	<td colspan="2">
				                  		<input type="text" name="po.applicantacct" size="32" maxlength="32" value="${condition.applicantacct }"/>
				                  	</td>
				                </tr>
				                <tr>
				                		<td class="text_tablehead_b">汇款金额</td>
				                  	<td colspan="6">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>
				                  	</td>
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
					               <tr>
					                   <td  align="center" class="text_listhead">支付交易组号</td>
					                   <td  align="center" class="text_listhead">签发日期</td>
					                   <td  align="center" class="text_listhead">签发行行号</td>
					                  <%-- 
					                   <td  align="center" class="text_listhead">客户号</td>
					                   --%>
					                  <td  align="center" class="text_listhead">报文编号</td>					                  
					                   <td  align="center" class="text_listhead">业务类型</td>
					                   <%--
					                  <td  align="center" class="text_listhead">优先级</td> 
					                   --%>
					                   <td  align="center" class="text_listhead">申请人账号</td>
					                   <td  align="center" class="text_listhead">汇款金额</td>					                   
					                   <td  align="center" class="text_listhead">状态</td>
					                    <td  align="center" class="text_listhead" >机构代码</td>
					                   <td  align="center" class="text_listhead">操作</td>
					                </tr> 
					                
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
											 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">	
							                  <td  class="text_list"><div class="gridCell_standard">${po.pmtgrpid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
							                  <%-- 
							                  <td  class="text_list"><div class="gridCell_standard">${po.proposercstmrid }</div></td>
							                  --%>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">大额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'hvps.112.001.01'}">大额机构普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">小额客户普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.122.001.01'}">小额机构普通贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">普通借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">实时贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">实时借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.125.001.01'}">定期贷记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.133.001.01'}">定期借记</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.130.001.01'}">票交业务</c:if>
								                 </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">
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
								                     <c:if test="${po.pmttp eq 'A308'}">CIS支票业务回执</c:if>
								                   
								                  </div>
								               </td>
								               <%-- 
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.sttlmprty eq 'NORM'}">普通</c:if>
								                  <c:if test="${po.sttlmprty eq 'HIGH'}">紧急</c:if>
								                  <c:if test="${po.sttlmprty eq 'URGT'}">特急</c:if>
								                  </div>
								               </td>
								                --%>
							                  <td  class="text_list"><div class="gridCell_standard">
							                    ${ po.applicantacct eq ''? po.dbtracct : po.applicantacct}
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard" align="right">
							                  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                
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
							                  <td  class="text_list"><div align="center"><span class="text_list">
								                  <c:choose>
	                 								<c:when test="${po.status eq 'PR81' }">
	                                                  <a href="#" onClick="viewdetails('${po.pmtgrpid}','${po.pmttpbgclsotid}','${po.systemcd}')"><u>复核</u></a>
	                                                </c:when>
	                                                <c:when test="${po.status eq 'PR82' }"> 
	                                                 <a href="#" onClick="viewdetailsback('${po.pmtgrpid}','${po.pmttpbgclsotid}','${po.systemcd}')"><u>取消审核</u></a>
	                                                </c:when>
	                                              </c:choose>
								                </span>
								                </div>
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
