<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

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
			
		</script>
	</head>
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=tranUpdate">
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
												业务维护界面
													
												</h4>
											</th>
											<tr>
											<td>
											<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  												<legend >业务信息</legend>
  												<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd">
  												<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
												<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
  													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">支付交易组号</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtgrpid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">业务类型编码</td>
														<td  class="text1" width="150">&nbsp;${entity.pmttp}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">业务种类编码</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtkd}</td>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >交易状态</td>
														<td  class="text1" width="150">&nbsp;${entity.status}</td>
														
													</tr>
													<tr>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">收款行行号</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">收款行名称</td>
														<td class="text1" width="150">&nbsp;${entity.cdtrbrnchnm}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">网点号</td>
														<td  class="text1" width="150">&nbsp;${entity.brnchid}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">系统编号</td>
														<td  class="text1" width="150">&nbsp;${entity.systemcd}</td>
														
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190">报文标识号</td>
														<td  class="text1" width="150">&nbsp;${entity.msgid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">回执报文标识号</td>
														<td  class="text1" width="150">&nbsp;${entity.recptmsgid}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">渠道标识号</td>
														<td  class="text1" width="150">&nbsp;${entity.chnlid}</td>
														<td  class="text_tablehead_b" align="right" class="text1" width="190">端到端标识号</td>
														<td  class="text1" width="150">&nbsp;${entity.endtoendid}</td>
														
													</tr>
													<tr>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">币种代码</td>
														<td class="text1" width="150">&nbsp;${entity.currencycd}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">汇款金额</td>
														<td  class="text1" width="150">&nbsp;${entity.amount}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">系统工作日</td>
														<td  class="text1" width="150">&nbsp;${entity.workdt}</td>
															<td   class="text_tablehead_b"  align="right" class="text1" width="190">总额</td>
														<td  class="text1" width="150">&nbsp;${entity.totalamt}</td>
													</tr>
													<tr>
													
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">本行户</td>
														<td  class="text1" width="150">&nbsp;${entity.bankcustomer}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">签发模式</td>
														<td  class="text1" width="150">&nbsp;${entity.signmd}</td>
														<td colspan="4">&nbsp;</td>
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
												<div style="float: left;width：40%;"><input type="button" value="申请人信息" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(0)"/>|</div>
												<div style="float: left;width：40%;"><input type="button" value="收款人信息"style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(1)"/>|</div>
												<div style="float: left;width：40%;"><input type="button" value="收费信息" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(2)"/>|</div>
												<div style="float: left;width：40%;"><input type="button" value="付款人信息"style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(3)"/>|</div>
												<div style="float: left;width：40%;"><input type="button" value="柜员信息" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(4)"/>|</div>
												<div style="float: left;width：40%;"><input type="button" value="附加信息" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(5)"/></div>
											
											
											
											
											<div id="details" name="details" style="display:none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;"  >
											  		<legend >申请人信息</legend>	
											  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												
												
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">申请人证件号</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercertid}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">申请人证件类型</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercerttp}</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">申请人证件发行国家</td>
													<td class="text1" width="150"  colspan="3">&nbsp;${entity.proposercertissued}</td>
													
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
													<td class="text1" width="150">&nbsp;${entity.proposeraccttp}</td>
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
														<td><input type="text" value="${entity.cdtrbrnchid}" name="cdtrbrnchid"></td>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">收款行名称</td>
														<td><input type="text" value="${entity.cdtrbrnchnm}" name="cdtrbrnchnm"></td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人开户行行号</td>
													<td><input type="text" value="${entity.cdtrissuer}" name="cdtrissuer"></td>
													
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人开户行名称</td>
													<td><input type="text" value="${entity.cdtrissuer}" name="cdtrissuer"></td>
												</tr>
												<tr>
													<td  class="text_tablehead_b" align="right" class="text1" width="190" >收款人账号</td>
													<td><input type="text" value="${entity.cdtracct}" name="cdtracct"></td>
													
													<td    class="text_tablehead_b" align="right" class="text1" width="190">收款人名称</td>
													<td><input type="text" value="${entity.cdtrnm}" name="cdtrnm"></td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人地址</td>
													<td><input type="text" value="${entity.cdtraddr}" name="cdtraddr"></td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">收款人清算行行号</td>
													<td><input type="text" value="${entity.cdtrmmbid}" name="cdtrmmbid"></td>
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
													<td  class="text1" width="150">&nbsp;${entity.amount}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">总额</td>
														<td  class="text1" width="150">&nbsp;${entity.totalamt}</td>
											</tr>
											<tr>
												<td  class="text_tablehead_b" align="right" class="text1" width="190" >手续费</td>
												<td  class="text1" width="150">&nbsp;${entity.servicecharge}</td>
												<td    class="text_tablehead_b" align="right" class="text1" width="190">邮电费</td>
												<td  class="text1" width="150">&nbsp;${entity.postage}</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">异地加收</td>
												<td  class="text1" width="150">&nbsp;${entity.outstationcharge}</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">减免</td>
												<td  class="text1" width="150">&nbsp;${entity.waive}</td>
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
												<td  class="text1" width="150">&nbsp;${entity.dbtraddr}</td>
												
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">付款人开户行行号</td>
												<td  class="text1">&nbsp;${entity.dbtrissuer}</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">付款人清算行行号</td>
												<td  class="text1">&nbsp;${entity.dbtrmmbid}</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b" align="right" class="text1" width="190">付款行行号</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_tablehead_b" align="right" class="text1" width="190">付款行名称</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>
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
														<td class="text1" width="150">&nbsp;${entity.sttlmprty}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">附言</td>
														<td  class="text1" width="150">&nbsp;${entity.ustrd}</td>
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
											class="button" value="保  存" onclick="commitForm();" />
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
