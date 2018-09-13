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
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			function viewbykeyfkrxx(id,pmtgrpid){
		var newurl = "<%=path %>/RegularDebitChildrenAction.do?method=queryList&syspara=fkrxx&id="+id+"&pmtgrpid="+pmtgrpid+"&checkflag=checkflag";
		viewDetailsByHeightWidth(newurl,'付款人列表',300,'90%');	
		//viewDetails(newurl);
	}
			function commitForm(){
			 
			  	document.forms[0].submit();
			  
				
			}
			function selectDet(i){
				var len = document.getElementsByName("details").length;
				for(var j=0;j<len;j++){
					if(j==i){
						 document.getElementsByName("details")[j].style.display="block";
						 document.getElementsByName("tabdetails")[j].style.background="#B3B3B3";
					}else{
						document.getElementsByName("details")[j].style.display="none";
						document.getElementsByName("tabdetails")[j].style.background="#dbdbdb";
					}
				}
				
			}
			
		</script>
	</head>
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=02">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			
			<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">				
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF;" ><br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								<br></td>
								<td>
									<div align="center">
									<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2"> 
                						
                							业务明细界面
                						
                						</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
													<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
												<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
														<table >
														
  													
			                                     	<tr>
			                	                         <td  class="text_zcx">支付交易组号</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtgrpid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">业务类型</td>
														<td  class="text1" width="150">&nbsp;
																 <c:if test="${entity.pmttp eq 'A100'}">普通汇兑</c:if>
											                  	 <c:if test="${entity.pmttp eq 'A108'}">现金汇款</c:if>
												                  <c:if test="${entity.pmttp eq 'A109'}">委托收款(划回)</c:if>
												                  <c:if test="${entity.pmttp eq 'A110'}">托收承付(划回)</c:if>
												                   <c:if test="${entity.pmttp eq 'A200'}">行间资金汇划</c:if>
												                   <c:if test="${entity.pmttp eq 'A202'}">银行汇票</c:if>
												                  <c:if test="${entity.pmttp eq 'A112'}">外汇清算</c:if>
												                  <c:if test="${entity.pmttp eq 'A101'}">公益性资金汇划)</c:if>
												                  <c:if test="${entity.pmttp eq 'A102'}">国库汇款</c:if>
												                  <c:if test="${entity.pmttp eq 'A104'}">国库资金贷记划拨</c:if>
												                  <c:if test="${entity.pmttp eq 'A301'}">缴费业务</c:if>
												                  <c:if test="${entity.pmttp eq 'A201'}">支票</c:if>
												                   <c:if test="${entity.pmttp eq 'B100'}">普通借记</c:if>
												                   <c:if test="${entity.pmttp eq 'B104'}">国库资金借记划拨</c:if>
												                   <c:if test="${entity.pmttp eq 'B307'}">国库资金国债兑付借记划拨</c:if>
												                     <c:if test="${entity.pmttp eq 'C102'}">个人储蓄通存</c:if>
												                      <c:if test="${entity.pmttp eq 'D102'}">个人储蓄通兑</c:if>
												                      <c:if test="${entity.pmttp eq 'D200'}">实时代收</c:if>
												                     <c:if test="${entity.pmttp eq 'C101'}">实时代付</c:if>
												                     <c:if test="${entity.pmttp eq 'C210'}">薪金报酬</c:if>
												                    <c:if test="${entity.pmttp eq 'C100'}">实时贷记</c:if>
												                    <c:if test="${entity.pmttp eq 'D100'}">实时借记</c:if>
												                    <c:if test="${entity.pmttp eq 'D203'}">实时通用票据截留</c:if>
												                     <c:if test="${entity.pmttp eq 'E100'}">定期贷记</c:if>
												                   <c:if test="${entity.pmttp eq 'F100'}">定期借记</c:if>
												                   <c:if test="${entity.pmttp eq 'C100'}">实时贷记</c:if>
								                    				<c:if test="${entity.pmttp eq 'D100'}">实时借记</c:if>
														</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">业务种类</td>
														<td  class="text1" width="150">&nbsp;
														
														
														
														<c:if test="${entity.pmtkd   eq '03401' }">支票截留</c:if>
														<c:if test="${entity.pmtkd   eq '03402' }">银行汇票</c:if>
														<c:if test="${entity.pmtkd   eq '03403' }">商业承兑汇票</c:if>
														<c:if test="${entity.pmtkd   eq '03404' }">银行承兑汇票</c:if>
														<c:if test="${entity.pmtkd   eq '03405' }">商业本票</c:if>
														<c:if test="${entity.pmtkd   eq '03406' }">银行本票</c:if>
														
															<c:if test="${entity.pmtkd   eq '00100' }">电费</c:if>
															<c:if test="${entity.pmtkd   eq '00200' }">水暖费</c:if>  
                                                            <c:if test="${entity.pmtkd   eq '00300' }">煤气费</c:if>  
                                                            <c:if test="${entity.pmtkd   eq '00400' }">电话费</c:if> 
                                                            <c:if test="${entity.pmtkd   eq '00500' }">通讯费</c:if> 
                                                             <c:if test="${entity.pmtkd   eq '00600' }">保险费</c:if> 
                                                            <c:if test="${entity.pmtkd   eq '00700' }">房屋管理费</c:if> 
                                                           <c:if test="${entity.pmtkd   eq '00800' }">代理服务费</c:if> 
                                                            <c:if test="${entity.pmtkd   eq '00900' }">学教费</c:if>
                                                             <c:if test="${entity.pmtkd   eq '01000' }">有线电视费</c:if>
                                                             <c:if test="${entity.pmtkd   eq '09001' }">其他</c:if>
         			                                          <c:if test="${entity.pmtkd   eq '01100' }">企业管理费用</c:if>
														 <c:if test="${entity.pmtkd   eq '01200' }">薪金报酬</c:if>
														 <c:if test="${entity.pmtkd   eq '01300' }">慈善捐款</c:if>
														<c:if test="${entity.pmtkd   eq '01400' }">缴费</c:if>
														
														
														
														
														
														
														
														
														
														</td>
														<td  class="text_zcx" align="right" class="text1" width="190" >交易状态</td>
														<td  class="text1" width="150">&nbsp;
															 <c:if test="${entity.status eq 'PR04' }">已清算</c:if>
															<c:if test="${entity.status eq 'PR09' }">已拒绝</c:if>
															<c:if test="${entity.status eq 'PR08' }">已撤销</c:if>
															<c:if test="${entity.status eq 'PR09' }">已拒绝</c:if>
															<c:if test="${entity.status eq 'PR21' }">已止付</c:if>
															<c:if test="${entity.status eq 'PR22' }">已冲正</c:if>
															<c:if test="${entity.status eq 'PR32' }">已超期</c:if>
															<c:if test="${entity.status eq 'PR05' }">已成功</c:if>
															<c:if test="${entity.status eq 'PR98' }">待确认    </c:if>
															<c:if test="${entity.status eq 'PR90' }">新建      </c:if>
															<c:if test="${entity.status eq 'PR81' }">待复核    </c:if>
															<c:if test="${entity.status eq 'PR82' }">待审核    </c:if>
															<c:if test="${entity.status eq 'PR83' }">待审批    </c:if>
															<c:if test="${entity.status eq 'PR95' }">待组包    </c:if>
															<c:if test="${entity.status eq 'PR96' }">待发送    </c:if>
															<c:if test="${entity.status eq 'PR97' }">已发送    </c:if>
															<c:if test="${entity.status eq 'PR11' }">已轧差排队</c:if> 
															<c:if test="${entity.status eq 'PR12' }">已清算排队</c:if> 
															<c:if test="${entity.status eq 'PR99' }">故障</c:if>
															<c:if test="${entity.status eq 'PR03' }">已轧差</c:if> 
															<c:if test="${entity.status eq 'PR89' }">待回执 </c:if>
															<c:if test="${entity.status eq 'PR88' }">已回执</c:if>
														</td>
														   
			               </tr>
	
	<tr>
			             	<td   class="text_zcx" align="right"  width="190">收款行行号</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_zcx" align="right"  width="190">收款行名称</td>
														<td class="text1"  colspan="5">&nbsp;${entity.cdtrbrnchnm}</td>
														     </tr>
			               <tr>
			              <td   class="text_zcx"  align="right"  >机构代码</td>
																<td class="text1">
																	&nbsp;${entity.orgCode}
																</td>
														<td   class="text_zcx"  align="right" >系统编号</td>
														<td  class="text1"  >&nbsp;
															<c:if test="${entity.systemcd eq 'HVPS'}">大额</c:if>
															<c:if test="${entity.systemcd eq 'BEPS'}">小额</c:if>
														</td>
														<td   class="text_zcx"  align="right" class="text1" >系统日期</td>
														<td  class="text1" >&nbsp;${entity.workdt}</td>
														<td   class="text_zcx"  align="right"  >签发模式</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.signmd eq '01'}">现金</c:if>
															<c:if test="${entity.signmd eq '02'}">卡折</c:if>
															<c:if test="${entity.signmd eq '03'}">转账</c:if>
															<c:if test="${entity.signmd eq '04'}">总账</c:if>
														</td>
						   </tr>
			               <tr>
			               			<td   class="text_zcx"  align="right">渠道标识</td>
														<td  class="text1" >&nbsp;<c:if test="${entity.chnlrmkid eq '1510'}">柜面</c:if></td>
							
														<td   class="text_zcx" align="right" class="text1" >币种代码</td>
														<td class="text1" >&nbsp;${entity.currencycd}</td>
														<td   class="text_zcx"  align="right" class="text1" >汇款金额</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
							              				</td>
														<td   class="text_zcx"  align="right" class="text1" >总&nbsp;&nbsp;&nbsp;&nbsp;额</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
			               </tr>
			                <tr>
			               		<td  class="text_zcx" align="right" class="text1" width="190" >签发柜员</td>
														<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">签发终端</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtrmlid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">签发日期</td>
														<td  class="text1" width="150">&nbsp;${entity.signeddt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">签发时间</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtm}</td>
																               </tr>
																               <tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	轧差日期
																</td>
																<td class="text1">
																	&nbsp;${entity.netgdt}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	轧差场次
																</td>
																<td class="text1">
																	&nbsp;${entity.netgrnd}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	清算日期
																</td>
																<td class="text1" width="150">
																	&nbsp; ${entity.sttlmdt}
																</td>
															</tr>
															<tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	报文序号
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	${entity.txid }
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	报文标识号
																</td>
																<td class="text1" width="150">
																	&nbsp;${entity.msgid }
																	
																</td>
															</tr>
							<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			附&nbsp;&nbsp;&nbsp;&nbsp;言
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${entity.addtlinf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			备&nbsp;&nbsp;&nbsp;&nbsp;注
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${entity.ustrd}
																		</td>
																	</tr>
													<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">&nbsp;</td>
														<td  class="text1"colspan="3">&nbsp;${entity.ustrd}</td>
													</tr>
							 </table>
							
 								<div  style="width: 90%;" align="left">

															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;background: #B3B3B3;"
																onclick="selectDet(0)">
																收款人信息
															</div>
															<c:if test="${entity.pmttp eq 'F100'}">
																	<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="viewbykeyfkrxx('${entity.id}','${entity.pmtgrpid}')">
																付款人信息
															</div>
															</c:if>													
															<c:if test="${entity.pmttp != 'F100'}">
																<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(1)">
																付款人信息
															</div>
															</c:if>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(2)">
																收费信息
															</div>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(3)">
																柜员信息
															</div>
															

														</div>
 
                                <div id="details" name="details" style="display:block;">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;"  >
											  		
											  	<table >
												
												
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">证件类型</td>
													<td  class="text1" width="150">&nbsp;
														<c:if test="${entity.proposercerttp eq '01'}">身份证</c:if>
														<c:if test="${entity.proposercerttp eq '02'}">军官证</c:if>
														<c:if test="${entity.proposercerttp eq '03'}">学生证</c:if>
														<c:if test="${entity.proposercerttp eq '04'}">营业执照</c:if>
														<c:if test="${entity.proposercerttp eq '05'}">组织机构代码</c:if>
													</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">证件号</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercertid}</td>
													
												</tr>
												
												
												<tr>
													<td class="text_zcx"  align="right" class="text1" width="190">联系电话</td>
													<td class="text1" width="150">&nbsp;${entity.proposertel}</td>
														<td class="text_zcx"  align="right" class="text1" width="190">客户号</td>
													<td class="text1" width="150">&nbsp;${entity.proposercstmrid}</td>
												</tr>
												
												<tr>
													<td class="text_zcx"  align="right" class="text1" width="190">账户类型</td>
													<td class="text1" width="150">&nbsp;
														<c:if test="${entity.proposeraccttp eq 'AT00'}">对公账户</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT01'}">个人贷记卡账户</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT02'}">个人借记卡账户</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT03'}">存在</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT04'}">其他</c:if>
													</td>
														
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >收款人账号</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtracct}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">收款人名称</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrnm}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">收款人地址</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtraddr}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">收款人开户行行号</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuer}</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">收款人开户行名称</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuernm}</td>
												</tr>
												<tr>
													<td   class="text_zcx" align="right" class="text1" width="190">收款行行号</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_zcx" align="right" class="text1" width="190">收款行名称</td>
														<td class="text1" width="150">&nbsp;${entity.cdtrbrnchnm}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">收款清算行行号</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtrmmbid}</td>
												</tr>
												
												
												
												</table>
												</fieldset>
											</div>
											<div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				
										  	<table >
												
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190">付款人账号</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtracct}</td>
												<td    class="text_zcx" align="right" class="text1" width="190">付款人名称</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtrnm}</td>
											</tr>
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190">付款人地址</td>
												<td  class="text1" colspan="3">&nbsp;${entity.dbtraddr}</td>
												
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">付款人开户行行号</td>
												<td  class="text1">&nbsp;${entity.dbtrissuer}</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">付款人开户行名称</td>
												<td  class="text1">&nbsp;${entity.dbtrissuernm}</td>
											</tr>
											<tr>
												<td   class="text_zcx" align="right" class="text1" width="190">付款行行号</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_zcx" align="right" class="text1" width="190">付款行名称</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">付款清算行行号</td>
												<td  class="text1" colspan="3">&nbsp;${entity.dbtrmmbid}</td>
											</tr>
											</table>
											</fieldset>
											</div>	
	

		                       
											
												<div id="details"  name="details" style="display: none;">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				
										  	<table >
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">汇款金额</td>
													<td  class="text1" width="150">&nbsp;
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
													</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">总额</td>
														<td  class="text1" width="150">&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
											</tr>
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190" >手续费</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.servicecharge }"/>
												</td>
												<td    class="text_zcx" align="right" class="text1" width="190">邮电费</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.postage }"/>
												</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">异地加收</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.outstationcharge }"/>
												</td>
												<td class="text_zcx" align="right" class="text1"
																			width="190">
																			工本费
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${entity.counterfoil }" />
																		</td>
												<%--
												<td   class="text_zcx"  align="right" class="text1" width="190">减免</td>
												<td  class="text1" width="150">&nbsp;
													<c:if test="${entity.waive eq 'Y'}">减免</c:if>
													<c:if test="${entity.waive eq 'N'}">不减免</c:if>
												</td>
												 --%>
											</tr>
											</table>
											</fieldset>

                                       </div>

											
	                      
												<div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;" align=center >
												  				
												  <table >
												  <tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			签发柜员
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.signerid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			签发终端号
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.signedtrmlid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			签发日期
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.signeddt}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			签发时间
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.signedtm}
																		</td>
																	</tr>
													<tr>
														<td  class="text_zcx" align="right" class="text1" width="190" >复核柜员</td>
														<td  class="text1" width="150">&nbsp;${entity.checkerid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">复核终端号</td>
														<td  class="text1" width="150">&nbsp;${entity.checkedtrmlid}</td>
													</tr>
													<tr>
														<td    class="text_zcx" align="right" class="text1" width="190">复核日期</td>
														<td  class="text1" width="150">&nbsp;${entity.checkeddt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">复核时间</td>
														<td  class="text1" width="150">&nbsp;${entity.checkedtm}</td>
													</tr>
											 												 
												 
													 
												
													
													
													</table>
													</fieldset>
											</div>
											
											
                                              </div>
                                               
													 <br />
													 
												<br>
                                              </td>      
											</tr>
	 									</table>
													 </td>
											</tr>
										</table>
 
						
					<br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"><br></td>
	
				</tr>
			</table>
			 

 
			 
		 	</body>
</html>
