<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>

<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		
	 <script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>

 
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		
		
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"	src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript">
			
			function commitForm(){
			 
			  	document.forms[0].submit();
			  
				
			}
			function selectDet(i){
				var len = document.getElementsByName("details").length;
				for(var j=0;j<len;j++){
					if(j==i){
						 document.getElementsByName("details")[j].style.display="block";
					}else{
						document.getElementsByName("details")[j].style.display="none";
					}
				}
				
			}
		function viewdetails(id,pmttpbgclsotid,systemcd){
		var newurl = "<%=path %>/TransProcessAction.do?method=gotoTransDetails&pmtgrpid="+id+"&pmttpbgclsotid=A&systemcd="+systemcd;
		viewDetails(newurl);	
	}
	function querydetail(id,pmttpbgclsotid,systemcd){
	
	var url = getRootPath()+"/TransProcessAction.do?method=gotoTransDetails&pmtgrpid="+id+"&pmttpbgclsotid=A&systemcd="+systemcd;;
	 viewDetails(url);
 	/*var i = createWin("wind","明细查看",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/TransProcessAction.do?method=queryPKGInfoDetail&pmtgrpid=${msgid}";
			return true;
	 	});
 	i.show();*/
}
</script>
		 
	</head>
	<body>
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=queryPKGInfoDetail">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />

			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr valign="top">
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF;">
						<br>
					</td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
									<br>
								</td>
								<td>
									<div align="center">
										<table width="95%" border="0" align="center" cellpadding="0"
											cellspacing="0">
											<tr>
												<td colspan="6">
													<div class="text_title">
														<span class="text_blue2"> 小额批量包明细 </span>
													</div>
												</td>
											</tr>
										</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head">
											<tr>
												<td height="30">
													<div align="center">
														<br />
														<br />
														<br />
														<table   width="95%"  class="tbcolor">
															<tr>
															<td>
															<input type="hidden" name="pmtgrpid" />
																<table  width="100%"  class="tbcolor">
																<tr>
													                   <td  align="center" class="text_listhead">支付交易组号</td>
													                   <td  align="center" class="text_listhead">签发行行号</td>
													                   <td  align="center" class="text_listhead">接收行行号</td>
													                   <td  align="center" class="text_listhead">报文编号</td>					                  
													                   <td  align="center" class="text_listhead">业务类型</td>
													                   <td  align="center" class="text_listhead">金额</td>					                   
													                   <td  align="center" class="text_listhead">状态</td>
													                   <td  align="center" class="text_listhead">明细查看</td>
													              </tr> 
													              <logic:present name="queryList">
																	  <logic:iterate id="po" name="queryList">
																		 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
															                  <td  class="text_list"><div class="gridCell_standard">${po.pmtgrpid }</div></td>
															                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
															                  <td  class="text_list"><div class="gridCell_standard">${po.instdpty }</div></td>
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
								                   <c:if test="${po.msgtpid eq 'beps.130.001.01'}">	CIS通用回执业务报文</c:if>
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
								                    <c:if test="${po.pmttp eq 'A309'}">CIS通用票据业务回执</c:if>
																                  </div>
																               </td>
															                  <td  class="text_list"><div class="gridCell_standard">
															                  		<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
															                  </div></td>
															                  <td  class="text_list"><div class="gridCell_standard">
															                	<c:if test="${po.status eq 'PR91'}">待复核</c:if>
															                 
															                	 
															       
							                                        <c:if test="${po.status eq 'PR04' }">已清算</c:if>
																	<c:if test="${po.status eq 'PR09' }">已拒绝</c:if>
																	<c:if test="${entity.status eq 'PR08' }">已撤销</c:if>
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
															                  </div></td> 
															                   <td  class="text_list"><div align="center"><span class="text_list">
                                          
                                                  <a href="#"   onClick="querydetail('${po.pmtgrpid}','${po.pmttpbgclsotid}','${po.systemcd}')"><u>明细</u></a></span></div>
                                           
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
																</td>
															</tr>
															
														</table>
														<br />
														<br>
												</td>
											</tr>
										</table>
						</table>
						<br>
					</td>
					<td
						
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<br>
					</td>
				</tr>
				
			</table>
	</body>
</html>
