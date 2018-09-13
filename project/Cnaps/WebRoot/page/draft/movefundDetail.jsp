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
		<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
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
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			
			function commitForm(){
			  if(VForm.Validate()){
			  	if(document.getElementById('cdtrbrnchid').value!=document.getElementById("cdtrbrnchid1").value){
			  		alert("收款行行号与原业务款行行号不一致");
			  		return false;
			  	}
			  	if(document.getElementById("amount").value!=document.getElementById("amount1").value){
			  		alert("汇款金额与原业务金额不一致");
			  		return false;
			  	}
			  	if(document.getElementById("cdtracct").value!=document.getElementById("cdtracct1").value){
			  		alert("收款人账号与原业务收款人账号不一致");
			  		return false;
			  	}
			  	
			  	if(document.getElementById("signerid").value==document.getElementById("username").value){
			  	alert("复核人员不能与录入人员一致!");
			  	return false;
			  	
			  	}
			  	document.forms[0].submit();
			  }
				
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
		function save(systemcd){
		if(systemcd == "HVPS"){
		document.forms[0].action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=00";
	
	    
		}else{
		document.forms[0].action="<%=path%>/TransProcessAction.do?method=sendBepsCheckMessage&operway=00";
	
		}
		 commitForm();
		
	}
	function viewbykeyfkrxx(id,pmtgrpid){
		var newurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=fkrxx&id="+id+"&pmtgrpid="+pmtgrpid+"&fuhechax=0";
		viewDetails(newurl);
	}
			
		</script>
	</head>
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=00&systemcd=&{entity.}">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					<%-- 
					<td background="<%=path%>/image/content_table_line_L.jpg"></td>
					--%>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);"></td>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd">
											<th class="text_tablehead_b">
												<h4 align="center">
												银行汇票明细页面
													
												</h4>
											</th>
											<tr>
											<td>
											<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  												<legend >业务信息</legend>
  												<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd">
  													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">支付交易组号</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtgrpid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">业务类型编码</td>
														<td  class="text1" width="150">&nbsp;
																<c:if test="${entity.pmttp eq 'A108'}">现金汇款</c:if>
																<c:if test="${entity.pmttp eq 'A109'}">委托收款(划回)</c:if>
																<c:if test="${entity.pmttp eq 'B100'}">普通借记业务</c:if>
																<c:if test="${entity.pmttp eq 'C102'}">个人储蓄通存业务</c:if>
																<c:if test="${entity.pmttp eq 'D102'}">个人储蓄通兑业务</c:if>
																<c:if test="${entity.pmttp eq 'E100'}">普通定期贷记业务</c:if>
														</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">业务种类编码</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtkd}</td>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >交易状态</td>
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
															<c:if test="${entity.status eq 'PR91' }">待复核    </c:if>
															<c:if test="${entity.status eq 'PR92' }">待审核    </c:if>
															<c:if test="${entity.status eq 'PR93' }">待审批    </c:if>
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
														<td   class="text_tablehead_b" align="right"  width="190">收款行行号</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_tablehead_b" align="right"  width="190">收款行名称</td>
														<td class="text1"  colspan="5">&nbsp;${entity.cdtrbrnchnm}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right"  >网点号</td>
														<td  class="text1"  >&nbsp;${entity.brnchid}</td>
														<td   class="text_tablehead_b"  align="right" >系统编号</td>
														<td  class="text1"  >&nbsp;
															<c:if test="${entity.systemcd eq 'HVPS'}">大额</c:if>
															<c:if test="${entity.systemcd eq 'BEPS'}">小额</c:if>
														</td>
														<td   class="text_tablehead_b"  align="right" class="text1" >系统工作日</td>
														<td  class="text1" >&nbsp;${entity.workdt}</td>
														<td   class="text_tablehead_b"  align="right"  >签发模式</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.signmd eq '01'}">现金</c:if>
															<c:if test="${entity.signmd eq '02'}">卡折</c:if>
															<c:if test="${entity.signmd eq '03'}">转账</c:if>
															<c:if test="${entity.signmd eq '04'}">总账</c:if>
														</td>
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right"  >报文标识号</td>
														<td  class="text1">&nbsp;${entity.msgid}</td>
														<td    class="text_tablehead_b" align="right" >回执报文标识号</td>
														<td  class="text1" colspan="5" >&nbsp;${entity.recptmsgid}</td>
														
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right">渠道标识号</td>
														<td  class="text1" >&nbsp;${entity.chnlid}</td>
														<td  class="text_tablehead_b" align="right" >端到端标识号</td>
														<td  class="text1" colspan="5">&nbsp;${entity.endtoendid}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" >本行户</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.bankcustomer eq 'Y'}">是</c:if>
															<c:if test="${entity.bankcustomer eq 'N'}">否</c:if>
														</td>
														<td   class="text_tablehead_b" align="right" class="text1" >币种代码</td>
														<td class="text1" >&nbsp;${entity.currencycd}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" >汇款金额</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
							              				</td>
														<td   class="text_tablehead_b"  align="right" class="text1" >总额</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >签发柜员</td>
														<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">签发终端号</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtrmlid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">签发日期</td>
														<td  class="text1" width="150">&nbsp;${entity.signeddt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">签发时间</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtm}</td>
													</tr>
													<tr>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">上次维护操作员</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintainuserid}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">上次维护终端号</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintaintrmlid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">上次维护日期</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintaindt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">上次维护时间</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintaintm}</td>
												</tr>
												<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">上次状态日期</td>
														<td  class="text1" width="150">&nbsp;${entity.lststatusdt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">上次状态时间</td>
														<td  class="text1" width="150">&nbsp;${entity.lststatustm}</td>
													</tr>
  												</table>
  											</fieldset>
											</td>
											</tr>
											<tr>
											<td>
											
												<div style="width:780px;"  align="center" >
												<div style="float: left;width：40%;"><input type="button" value="核对信息" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"onclick="selectDet(0)"/>|</div>
												<div style="float: left;width：40%;"><input type="button" value="申请人信息" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(1)"/>|</div>
												<div style="float: left;width：40%;"><input type="button" value="收款人信息"style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(2)"/>|</div>
												<div style="float: left;width：40%;"><input type="button" value="收费信息" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(3)"/>|</div>
												<div style="float: left;width：40%;">
													<c:if test="${entity.pmttp eq 'F100'}">
														<input type="button" value="付款人信息"style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="viewbykeyfkrxx('${entity.id}','${entity.pmtgrpid}')"/>
													</c:if>													
													<c:if test="${entity.pmttp != 'F100'}">
														<input type="button" value="付款人信息"style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(4)"/>
													</c:if>
												|</div>
												<div style="float: left;width：40%;"><input type="button" value="柜员信息" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(5)"/>|</div>
												<div style="float: left;width：40%;"><input type="button" value="附加信息" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(6)"/></div>
											
											<div id="details" name="details" style="display:block;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;"  >
											  		<legend >核对信息</legend>	
											  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
												<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
												<input type="hidden" name="pmttp" value="${condition.pmttp }"/>
												<input type="hidden" name="username" id="username" value="${userentity.username}"/><!-- 登录人 -->
												<input type="hidden" name="signerid" id="signerid" value="${entity.signerid}"/><!-- 签发人 -->
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">汇款金额</td>
													<td  class="text1" width="150">&nbsp;<input type="text" name="amount1" value='${entity.amount}' readonly="readonly"/></td>
													<td  class="text1" width="150">&nbsp;<input type="text" name="amount" value=""/>
													<span name="validate" dataName="amount" dataType="Empty" msg="汇款金额不能为空！" class="STYLE1">*</span>
													</td>
													
												</tr>
												<tr>
													<td  class="text_tablehead_b" align="right" class="text1" width="190" >收款人账号</td>
													<td  class="text1" width="150">&nbsp;<input type="text" name="cdtracct1" value='${entity.cdtracct}' readonly="readonly"/></td>
													<td  class="text1" width="150">&nbsp;<input type="text" name="cdtracct" value=""/>
													<span name="validate" dataName="cdtracct" dataType="Empty" msg="收款人账号不能为空！" class="STYLE1">*</span></td>
												</tr>
												<tr>
													<td class="text_tablehead_b" align="right" class="text1" width="190">收款行行号</td>
													<td class="text1" width="150">&nbsp;<input type="text" name="cdtrbrnchid1" value='${entity.cdtrbrnchid}' readonly="readonly"/></td>
													<td class="text1" width="150">&nbsp;<input type="text" name="cdtrbrnchid" value=""/>
													<span name="validate" dataName="cdtrbrnchid" dataType="Empty" msg="收款行行号不能为空！" class="STYLE1">*</span></td>
												</tr>
												</table>
												</fieldset>
											</div>
											
											
											<div id="details" name="details" style="display:none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;"  >
											  		<legend >申请人信息</legend>	
											  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												
												
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">申请人证件号</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercertid}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">申请人证件类型</td>
													<td  class="text1" width="150">&nbsp;
														<c:if test="${entity.proposercerttp eq '01'}">身份证</c:if>
														<c:if test="${entity.proposercerttp eq '02'}">军官证</c:if>
														<c:if test="${entity.proposercerttp eq '03'}">学生证</c:if>
														<c:if test="${entity.proposercerttp eq '04'}">营业执照</c:if>
														<c:if test="${entity.proposercerttp eq '05'}">组织机构代码</c:if>
													</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">申请人证件发行国家</td>
													<td class="text1" width="150"  colspan="3">&nbsp;
														<c:if test="${entity.proposercertissued eq 'CN'}">中华人民共和国</c:if>
													</td>
													
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">申请人账号</td>
													<td  class="text1" width="150">&nbsp;${entity.proposeracct}</td>
													<td class="text_tablehead_b"  align="right" class="text1" width="190">申请人名称</td>
													<td class="text1" width="150">&nbsp;${entity.proposernm}</td>
												</tr>
												<tr>
													<td class="text_tablehead_b"  align="right" class="text1" width="190">申请人联系电话</td>
													<td class="text1" width="150">&nbsp;${entity.proposertel}</td>
														<td class="text_tablehead_b"  align="right" class="text1" width="190">申请人客户号</td>
													<td class="text1" width="150">&nbsp;${entity.proposercstmrid}</td>
												</tr>
												<tr>
													<td class="text_tablehead_b"  align="right" class="text1" width="190">申请人地址</td>
													<td class="text1" width="150" colspan="3">&nbsp;${entity.proposeraddr}</td>
												</tr>
												<tr>
													<td class="text_tablehead_b"  align="right" class="text1" width="190">申请人账户类型</td>
													<td class="text1" width="150">&nbsp;
														<c:if test="${entity.proposeraccttp eq 'AT00'}">对公账户</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT01'}">个人贷记卡账户</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT02'}">个人借记卡账户</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT03'}">存在</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT04'}">其他</c:if>
													</td>
														<td class="text_tablehead_b"  align="right" class="text1" width="190">申请人账户币种</td>
													<td class="text1" width="150">&nbsp;${entity.proposeracctccy}</td>
												</tr>
												</table>
												</fieldset>
											</div>
											<div id="details" name="details" style="display: none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				<legend >收款人信息</legend>
											  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												<tr>
													<td   class="text_tablehead_b" align="right" class="text1" width="190">收款行行号</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">收款行名称</td>
														<td class="text1" width="150">&nbsp;${entity.cdtrbrnchnm}</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人开户行行号</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuer}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人开户行名称</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuernm}</td>
												</tr>
												<tr>
													<td  class="text_tablehead_b" align="right" class="text1" width="190" >收款人账号</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtracct}</td>
													<td    class="text_tablehead_b" align="right" class="text1" width="190">收款人名称</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrnm}</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人地址</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtraddr}</td>
													
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人清算行行号</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtrmmbid}</td>
												</tr>
												</table>
												</fieldset>
											</div>
											<div id="details"  name="details" style="display: none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				<legend >收费金额</legend>
										  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">汇款金额</td>
													<td  class="text1" width="150">&nbsp;
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
													</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">总额</td>
														<td  class="text1" width="150">&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
											</tr>
											<tr>
												<td  class="text_tablehead_b" align="right" class="text1" width="190" >手续费</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.servicecharge }"/>
												</td>
												<td    class="text_tablehead_b" align="right" class="text1" width="190">邮电费</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.postage }"/>
												</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">异地加收</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.outstationcharge }"/>
												</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">减免</td>
												<td  class="text1" width="150">&nbsp;
													<c:if test="${entity.waive eq 'Y'}">减免</c:if>
													<c:if test="${entity.waive eq 'N'}">不减免</c:if>
												</td>
											</tr>
											</table>
											</fieldset>
											</div>
											<div id="details" name="details" style="display: none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				<legend >付款人信息</legend>
										  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												
											<tr>
												<td  class="text_tablehead_b" align="right" class="text1" width="190">付款人账号</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtracct}</td>
												<td    class="text_tablehead_b" align="right" class="text1" width="190">付款人名称</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtrnm}</td>
											</tr>
											<tr>
												<td  class="text_tablehead_b" align="right" class="text1" width="190">付款人地址</td>
												<td  class="text1" colspan="3">&nbsp;${entity.dbtraddr}</td>
												
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">付款人开户行行号</td>
												<td  class="text1">&nbsp;${entity.dbtrissuer}</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">付款人开户行名称</td>
												<td  class="text1">&nbsp;${entity.dbtrissuernm}</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b" align="right" class="text1" width="190">付款行行号</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_tablehead_b" align="right" class="text1" width="190">付款行名称</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">付款清算行行号</td>
												<td  class="text1" colspan="3">&nbsp;${entity.dbtrmmbid}</td>
											</tr>
											</table>
											</fieldset>
											</div>	
											
											<div id="details" name="details" style="display: none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
												  				<legend >柜员信息</legend>
												  <table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >复核柜员</td>
														<td  class="text1" width="150">&nbsp;${entity.checkerid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">复核终端号</td>
														<td  class="text1" width="150">&nbsp;${entity.checkedtrmlid}</td>
													</tr>
													<tr>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">复核日期</td>
														<td  class="text1" width="150">&nbsp;${entity.checkeddt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">复核时间</td>
														<td  class="text1" width="150">&nbsp;${entity.checkedtm}</td>
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >审核柜员</td>
														<td  class="text1" width="150">&nbsp;${entity.approvalid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">审核终端号</td>
														<td  class="text1" width="150">&nbsp;${entity.approvedtrmlid}</td>
													</tr>
													<tr>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">审核日期</td>
														<td  class="text1" width="150">&nbsp;${entity.approveddt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">审核时间</td>
														<td  class="text1" width="150">&nbsp;${entity.approvedtm}</td>
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >审批柜员</td>
														<td  class="text1" width="150">&nbsp;${entity.authenticateid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">审批终端号</td>
														<td  class="text1" width="150">&nbsp;${entity.authenticatedtrmlid}</td>
													</tr>
													<tr>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">审批日期</td>
														<td  class="text1" width="150">&nbsp;${entity.authenticateddt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">审批时间</td>
														<td  class="text1" width="150">&nbsp;${entity.authenticatedtm}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">业务优先级</td>
														<td class="text1" colspan="3">&nbsp;
															<c:if test="${entity.sttlmprty eq 'NORM'}">一般</c:if>
															<c:if test="${entity.sttlmprty eq 'HIGH'}">特急</c:if>
															<c:if test="${entity.sttlmprty eq 'URGT'}">紧急</c:if>
														</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">附言</td>
														<td  class="text1"colspan="3">&nbsp;${entity.ustrd}</td>
													</tr>
													
													
													</table>
													</fieldset>
											</div>
											
											<div id="details" name="details" style="display: none">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				<legend >附加信息</legend>
											  <table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												
												<tr>
													<td  class="text_tablehead_b" align="right" class="text1" width="190" >凭证种类</td>
													<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
													<td    class="text_tablehead_b" align="right" class="text1" width="190">凭证号</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">凭证密码类型</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherpswdtp}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">凭证密码</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherpswd}</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">凭证签发日期</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherissuedt}</td>
												
												</tr>
												<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">票据种类</td>
														<td  class="text1" width="150">&nbsp;${entity.notestp}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">票据日期</td>
														<td  class="text1" width="150">&nbsp;${entity.notesdt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">票据号码</td>
														<td  class="text1" width="150">&nbsp;${entity.notesno}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">赔偿金金额</td>
														<td  class="text1" width="150">&nbsp;${entity.amndsamt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">拒付金额</td>
														<td  class="text1" width="150">&nbsp;${entity.rjctamt}</td>
													</tr>
												</table>
												</fieldset>
											</div>	
											</div>
												</td>
											</tr>
											<tr>
												<td>&nbsp;</td>
											</tr>
										</table>


										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="save('${entity.systemcd }')" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="返  回" onclick="history.back();" />
										<br />
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);"></td>

					<%--
					<td background="<%=path%>/image/content_table_line_R.jpg"></td> --%>
				</tr>
			</table>

		</form>
	</body>
</html>
