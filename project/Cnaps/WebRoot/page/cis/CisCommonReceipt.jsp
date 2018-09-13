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
		<title>CIS通用回执签发</title>
		
		
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
       <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        <script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
			
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path%>/js/zcxjs/zcx.js"></script>	
	<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
	<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	<script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
	<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
	
	   <script type="text/javascript">
	   		

	function OnSave() {
	var userMap = {};
	 
	userMap.accountnumber = document.getElementById("receNum").value;
	userMap.accountname = document.getElementById("receName").value;
	userMap.addr = document.getElementById("receAddress").value;
	userMap.issuer =document.getElementById("receBankNum").value;
	userMap.issuernm =document.getElementById("receBankName").value;
	userMap.mmbid =document.getElementById("cdtrMmbId").value;
	userMap.accttp =document.getElementById("receAccountType").value;
  PubService.saveOthersBankAccountMsg(userMap, function(data){
  	
  }); 
}
		
		 
		function queryBypaymentGroupNum(paymentGroupNum){
			if(isNull(trim(paymentGroupNum))){
					 return;
			}
			var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
					pop.show();
			 PubService.queryOthersBankAccountMsg(paymentGroupNum,function(obj){
			 	pop.close();
			  if(obj==null||obj.accountnumber==null){
				  alert(" 查询信息不存在，未查到相关数据" );
						  	 return;
			}else{
			 
			  document.getElementById("cdtrAcct").value=obj.accountnumber;
		      document.getElementById("cdtrNm").value=obj.accountname==null?"": obj.accountname  ;
			   document.getElementById("cdtrIssuer").value=  obj.issuer==null?"": obj.issuer ;   
			    document.getElementById("cdtrMmbId").value=obj.mmbid==null?"":obj.mmbid ;//清算行行号
			  document.getElementById("cdtrAddr").value=obj.addr==null?"": obj.addr  ; //人地址
			   document.getElementById("cdtrIssuer").value= obj.issuer==null?"": obj.issuer ;   //行号
			  document.getElementById("cdtrIssuerNm").value=obj.issuernm==null?"":obj.issuernm ; //行名
			    document.getElementById("cdtrMmbId").value=obj.mmbid==null?"":obj.mmbid ;//清算行行号
			    document.getElementById("cdtrBrnchId").value= obj.issuer==null?"": obj.issuer ;   //行号
			  document.getElementById("receBankName").value=obj.issuernm==null?"":obj.issuernm ; //行名
			   	
			    
		 }
	   	});
				
			}
			//查询付款人信息  实时贷记
			
			function  PubQueryAccount(paymentGroupNum){
	 
			if(isNull(trim(paymentGroupNum))){
						return;
					}
				var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
						pop.show();
						PubService.QueryAccount(paymentGroupNum,function(obj){
							pop.close();
					if(obj==null||obj.acctid==null){
						alert("收款人信息查询失败，未查到相关信息" );
					return;
					}else{
								document.getElementById("dbtrNm").value=obj.mm==null?"": obj.mm;//名称
								document.getElementById("dbtrAddr").value=obj.addr==null?"": obj.addr;//地址
								document.getElementById("phone").value=obj.tel==null?"": obj.tel;//联系电话
								 document.getElementById("certsize").value=obj.certip==null?"": obj.certip;//证件类型
								 document.getElementById("certsize1").value=obj.certip==null?"": obj.certip;//证件类型
								document.getElementById("certnum").value=obj.certid==null?"": obj.certid;//证件号
								//document.getElementById("proposercstmrid").value=obj.cstmrid==null?"": obj.cstmrid;//付款人客户号
						      	//document.getElementById("proposerAcctTp").value=obj.accttp==null?"": obj.accttp;//账户类型
								//document.getElementById("proposerAcctTp1").value=obj.accttp==null?"": obj.accttp;//账户类型    
			}
			});
	   	}
		
	 
	   </script>
	
		<script language="javascript">
			//收款行行号查询
function selectBankInfo(){
				 var url ="<%=request.getContextPath()%>";
				var receBankNum= document.getElementById("cdtrBrnchId");//收款行号
				var receBankName=document.getElementById("receBankName");//收款行名
				var cdtrMmbId=document.getElementById("cdtrMmbId");//清算行行号
				var receOpenBankNum= document.getElementById("cdtrIssuer");//开户行号
				var receOpenBankName=document.getElementById("cdtrIssuerNm");//开户行名
				selectkhhBank(url,receBankNum,receBankName,cdtrMmbId,receOpenBankNum,receOpenBankName);
								 
				
				
			}

			//收款人开户行信息查询
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skhkhhhh= document.getElementById("receOpenBankNum");
				var skrkhhmc=document.getElementById("receOpenBankName");
				selectBank(url,skhkhhhh,skrkhhmc,"");
			}
			//付款人开户行信息查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var fkhkhhhh= document.getElementById("dbtrIssuer");
				var fkrkhhmc=document.getElementById("dbtrIssuerNm");
				selectBank(url,fkhkhhhh,fkrkhhmc,"");
			}
	  
				function commitForm(){
			   	var msg = "@";
			   	var answerStatus=document.getElementById("answerStatus");
				var checkNums=document.getElementsByName("checkNums");
				var txrjctinf=document.getElementById("txrjctinf");
				var valStr="";
				var checkedNum=0;
				if(answerStatus.value=='PR09'){
					for(var i=0;i<checkNums.length;i++){
						if(checkNums[i].value!=''&&checkNums[i].checked){
						checkedNum+=1;
						valStr+=checkNums[i].value;					
						}
					}
					if(checkedNum==0){
						msg +="当应答状态为已拒绝（退票）时，拒绝码为必输项！@"
					}
					else if(checkedNum>5){
						msg +="最多填写5种退票代码！@";
					}
					else{
						document.getElementById("refuseNo").value=valStr;
					}
					if(txrjctinf.value==""){
						msg+="当应答状态为已拒绝（退票）时，拒绝信息为必输项！@";
					}
				}
				var dbtrAcct = document.getElementById("dbtrAcct");
				var moneyNum = document.getElementById("ntryAmt");
				 var dbtrNm = document.getElementById("dbtrNm");
				msg=isMonNull(moneyNum,msg);
				if(isNull(trim(dbtrAcct.value))){
					msg += dbtrAcct.title+"不能为空！@";
				}
				 if(isNull(trim(dbtrNm.value))){
					msg += dbtrAcct.title+"不能为空！@";
				}
				 
				 
				 
				 
			 
				var boo = msgSplit(msg);
			 
				if(boo){
					//	OnSave();
		  			 document.getElementById("ntryAmt").value=rmoney(document.getElementById("ntryAmt").value );
				  	document.forms[0].submit();
				}
				  
				 
		 }
		
			
			function isMonNull(moneyNum,msg){
			 
		 	if(moneyNum.value==''||moneyNum.value==0.00||moneyNum.value==0||moneyNum.value=='0.00'||moneyNum.value=='0'){
		 		msg += moneyNum.title+"不能为空！@";
		 		return msg;
		 	}
		 	return "@";
		 }
		 
		 
		</script>
		
		
		<SCRIPT language="javaScript">
  function sendDate(){
  	send_request("<%=path%>/transfer/RealTimeCreditAction.do?method=paymentGroupNumAjax");
  	  }
    var http_request = false;
  function send_request(url) {//初始化、指定处理函数、发送请求的函数
   http_request = false;
   if(window.XMLHttpRequest) { 
　　http_request = new XMLHttpRequest();
　　if (http_request.overrideMimeType) {//设置MiME类别
 　　http_request.overrideMimeType('text/xml');
　　}
   }
   else if (window.ActiveXObject) { // IE浏览器
　　try {
 　　http_request = new ActiveXObject("Msxml2.XMLHTTP");
　　} catch (e) {
 　　try {
  　　http_request = new ActiveXObject("Microsoft.XMLHTTP");
 　　} catch (e) {}
　　}
   }
   if (!http_request) { // 异常，创建对象实例失败
　　window.alert("不能创建XMLHttpRequest对象实例.");
　　return false;
   }
   http_request.onreadystatechange = processRequest;
   // 确定发送请求的方式和URL以及是否同步执行下段代码
   http_request.open("GET", url, true);
   http_request.send(null);
  }
  // 处理返回信息的函数
 　　function processRequest() {
     　　if (http_request.readyState == 4) { // 判断对象状态
         　　if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
         //默认返回01，也就是错误信息，到时注掉就可以
                        if(http_request.responseText=='01'){
	                alert("获取支付交易组号失败，请刷新页面重新获取");
	             return false;
	               }
                      else{
                     
		                   document.forms[0].txid.value=http_request.responseText;
	                }
         　　   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             　　     alert("您所请求的页面有异常。");
         　　  }
     　　}
 　　}
     
      
      
     
			
	 
			function changePKD(){
				var pmttp=this.document.getElementById('pmttp');
				var pmkdVal=(pmttp.value)=="A308" ? '05301' : '05302';
				var pmkdText=pmkdVal=='05301' ? 'CIS支票业务回执' : 'CIS通用票据业务回执';
				var obj=this.document.getElementById('popmtkd');
				obj.innerHTML="<select  name='po.pmtkd' id='pmtkd' style='width:180px;' title='业务种类编码'>"+
				"<option value='"+pmkdVal+"'  selected='selected'>"+pmkdText+"</option></select><span  class='STYLE1'>*</span>";
			}
			
     </script>
	
	</head>
	<body onload="sendDate()"> 
 
			<form method="post" 
			action="<%=path%>/CisCommonReceiptAction.do?method=create">
			<input id="signval" type="hidden" value="sign0">
			<!--  <input type="hidden" name="token" value="${token}" />-->
		 
			<!-- 防止重复提交 -->
			 
		  
		  
		  <input name="po.resuseNo" id="refuseNo" type="hidden" value="">
		  
		  
		 
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					
					<td>
					<input type="hidden" name="po.currencyCd" id="currencyCd" value="CNY"/>
					
					
					
					</td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">CIS通用回执签发</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           	<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                                      </tr>
															<tr>
															<td class="text_tablehead_b"  >
																	明细标识号
																</td>
																<td >
																		<input name="po.txid" id="txid" type="text" readonly="readonly"
																		style="width: 180px;" title="明细标识号" maxlength="22"
																		  /><span  class="STYLE1">*</span>
																 
																</td>
																<td class="text_tablehead_b" >
																	<!--   端到端标识号-->
																</td>
																<td >
																	<input name="po.endToEndId" id="endToEndId" type="hidden"  value="123"
																		maxlength="19" title="端到端标识号"  />
																
																	<!--<span  class="STYLE1">*</span>-->
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	业务类型编码
																</td>
																<td>
																	<select  name="po.pmttp" id="pmttp" style="width:180px;" title="业务类型编码" onChange="changePKD();">
																	<option value="A308"  selected="selected">CIS支票业务回执</option>
																	 <option value="A309"  >CIS通用票据业务回执</option>
																</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	业务种类编码
																</td>
																<td id="popmtkd">
																	<select  name='po.pmtkd' id='pmtkd' style='width:180px;' title='业务种类编码'>
																			<option value='05301'  selected='selected'>CIS支票业务回执</option></select>
																			<span  class='STYLE1'>*</span>
																</td>
															</tr>
															
															</table>
                                                 </div>
                                                
                                               
                                               
                                                    <div class="table_content">
                                                    
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">付款人信息</span></td>
                                                      </tr>
                                                      	<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人账号
																</td>
																<td>
																	  <input name="po.dbtrAcct" id="dbtrAcct" type="text" onblur="PubQueryAccount(this.value)"
																		 title="付款人账号" maxlength="32"
																		onKeyPress="actkeyPress()" /> 
																			<span  class="STYLE1">*</span>
																		 
																</td>
																<td class="text_tablehead_b" >
																	付款人名称
																</td>
																<td>
																	<input name="po.dbtrNm" id="dbtrNm" type="text"  
																		title="付款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																 
                                                  			</tr>
                                                          <tr>
															<td class="text_tablehead_b"  >
																	证件类型
																</td>
																<td> <input type="hidden" id="certsize1" name="po.certsize"/>
																		<select   name="po.certsize" id="certsize" disabled="disabled">
																		<option value="01">
																			身份证
																		</option>
																		<option value="02">
																			军官证
																		</option>
																		<option value="03">
																			学生证
																		</option>
																	<option value="04">
																			营业执照
																		</option>
																		<option value="05">
																			组织机构代码
																		</option>
																	</select>
																 <span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	付款人证件号
																</td>
																<td >
																	<input name="po.certnum" id="certnum" type="text" size="19"  readonly="readonly"
																		maxlength="32" title="付款人证件号"    />
																		 <span  class="STYLE1">*</span>
																 	 		 </td>
																 	 		
															</tr>
																<tr>
																

																<td class="text_tablehead_b" >
																	付款人联系电话
																</td>
																<td>
																	<input  name="po.phone" id="phone" type="text" readonly="readonly"
																		 maxlength="20" title="付款人联系电话" />  
																		 <span  class="STYLE1">*</span>
																</td>
																
																</tr>
															
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																<!-- 付款行行号 -->
																</td>
																<td>
																	<input name="po.dbtrBrnchId" id='fkhhh' type="hidden" type="text" readonly="readonly"
																		 title="付款行行号"  maxlength="12"  value="${bankInfo.bankcode }"
																		onKeyPress="actkeyPress()" />  
																</td>
																<td class="text_tablehead_b">
																 <!-- 付款行名称  -->
																</td>
																<td>
																	<input name="po.dbtrbrnchnm" id="fkhmc" type="hidden" title="付款行名称" value="${bankInfo.participantname }"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		 
																</td>
                                                  			</tr>
                                                  			
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人地址
																</td>
																<td colspan="3">
																	<input name="po.dbtrAddr" id="dbtrAddr" class="text_tablehead_b_addr" 
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','dbtrAddr')"/>
																
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																<!--   付款人开户行行号 -->
																</td>
																<td>
																	<input name="po.dbtrIssuer" id="dbtrIssuer" type="hidden" class="text_tablehead_b_c"
																		 title="付款人开户行行号" maxlength="12"   readonly="readonly" value="${bankInfo.bankcode }"
																		/>
																	<!--	<input type="button" class="button"   value="搜索" onclick="selectBankInfoOfFkk()">-->
																		
																</td>
																<td class="text_tablehead_b">
																<!--  付款人开户行名称 -->
																</td>
																<td>

																	<input name="po.dbtrIssuerNm" id="dbtrIssuerNm"  value="${bankInfo.participantname }" type="hidden" title="付款人开户行名称"
																		  maxlength="60" readonly="readonly"
																		/>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																  <!-- 付款清算行行号 -->
																</td>
																<td>
																	<input name="po.dbtrMmbId" id="fkqshhh" type="hidden" readonly="readonly"
																		 title="付款清算行行号" maxlength="12" value="${bankInfo.directbankcode }"
																		 />
																</td>
                                                  			</tr>
                                                  		</table>
                                                 </div>
                                                   
                                                    <div class="table_content">
                                                    
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">收款人信息</span></td>
                                                      </tr>
															<tr>
																<td class="text_tablehead_b" >
																	收款人账号
																</td>
																<td>
																	<input name="po.cdtrAcct" id="cdtrAcct" type="text"
																		 title="收款人账号" maxlength="32" onblur="queryBypaymentGroupNum(this.value)"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	收款人名称
																</td>
																<td>
																	<input name="po.cdtrNm" id="cdtrNm" type="text" 
																		title="收款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	收款人地址
																</td>
																<td colspan="3">
																	<input type="text" class="text_tablehead_b_addr" name="po.cdtrAddr" id="cdtrAddr" 
																		onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'提示：','cdtrAddr')" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																  <!-- 收款人开户行行号 -->
																</td>
																<td>
																	<input name="po.cdtrIssuer" id="cdtrIssuer" type="hidden" class="text_tablehead_b_c"
																		 title="收款行开户行行号" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<!--<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfSkk()">-->	
																</td>
															
																<td class="text_tablehead_b">
																	 <!-- 收款人开户行名称 -->
																</td>
																<td>
																	<input name="po.cdtrIssuerNm" id="cdtrIssuerNm" type="hidden" readonly="readonly"
																		title="收款人开户行名称" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
																<tr>
																 
																 
																<td class="text_tablehead_b">
																	<!-- 收款清算行行号-->
																</td>
																<td>
																	<input name="po.cdtrMmbId" id="cdtrMmbId" type="hidden" readonly="readonly"
																		title="收款清算行行号" maxlength="12" 
																		 onKeyPress="actkeyPress()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	收款行行号
																</td>
																<td>
																	<input name="po.cdtrBrnchId" id="cdtrBrnchId"  type="text" class="text_tablehead_b_dd"
																		 title="收款行行号" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<input type="button" class="button"  value="搜索" onclick="selectBankInfo()">
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	收款行名称
																</td>
																<td>
																	<input name="po.receBankName" readonly="readonly" id="receBankName" type="text"
																		style="width: 180px;" title="收款人行名称" maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
                                                  		</table>
                                                 
                                                    <div class="table_content">
                                                   		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">金额信息</span></td>
                                                      </tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	币种代码
																</td>
																<td>
																	<input name="po.currencyCd" id="currencyCd" type="text"
																		 title="币种代码"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" >
																	 结算金额
																</td>
																<td >
																	 <input name="po.ntryAmt" id="ntryAmt" type="text"
																		 title=" 结算金额"  
																		 onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';  "
																		 />
																</td>
																
																</tr>
																 
                                                  		</table>
                                                  	</div>
                                                  	 
                                                    <div class="table_content">
                                                    
                                                  	
                                                    		<table>
                                                    		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">附加信息</span></td>
                                                      </tr>
															<tr>
															<td class="text_tablehead_b" >
																	原cis委托日期
																</td>
																<td>
																<input type="text" name="po.ornglCisCnsgnDt" id="ornglCisCnsgnDt"  title="原cis委托日期"  
																readonly="readonly" class="Wdate"  onclick="WdatePicker()"/><font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	原cis交易序号
																</td>
																<td>
																	<input name="po.ornglCisTxId" id="ornglCisTxId" type="text" 
																		title="原cis交易序号" maxlength="12"  />
																
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																	 原cis票据号码
																</td>
																<td>
																	<input name="po.ornglCisNotesNo" id="ornglCisNotesNo" type="text"
																		title="原cis票据号码" maxlength="12"   />
																
																</td>
																	
																<td class="text_tablehead_b" >
																	 应答状态
																</td>
																
																<td >
																	 <select   name="po.answerStatus" id="answerStatus" >
																		<option value="PR02">
																			已付款
																		</option>
																		<option value="PR09">
																			已拒绝（退票）
																		</option>
																	</select>
																</td>
																
															</tr>
															 <tr>
															 <td class="text_tablehead_b" >
																	 拒绝码
																</td>
																<td colspan="4" id="checkTd">
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ21" name="checkNums">大、小写金额不符<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ22" name="checkNums">支票必须记载的事项不全<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ23" name="checkNums">出票人签章与预留银行签章不符<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ24" name="checkNums">约定使用支付密码的，支付密码未填写或错误<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ25" name="checkNums">持票人未作委托收款背书<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ26" name="checkNums">电子清算信息与支票影像不相符<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ27" name="checkNums">出票人账号、户名不符<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ28" name="checkNums">出票人账号余额不足以支付票据款项<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ29" name="checkNums">重复提示付款<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ30" name="checkNums">非本行票据<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ31" name="checkNums">出票人已销户<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ32" name="checkNums">出票人账户已依法冻结<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ33" name="checkNums">持票人已办理挂失止付或已收到法院止付通知书<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ34" name="checkNums">持票人开户行申请止付<br />
																	<input type="checkbox" class="text_tablehead_b_rad" value="RJ35" name="checkNums">数字签名或证书错<br />
																</td>
															 </tr>
															 <tr>
															 <td class="text_tablehead_b" >
																	拒绝信息
																</td>
																<td colspan="3">
																	<textarea name="po.txrjctinf" id="txrjctinf" 
																		rows="2" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','txrjctinf')"></textarea>
																</td>
															 </tr>
                                                    		</table>
                                                   </div>
                                                   
                                                    <div class="table_content">
                                                    
                                                   		<table>
                                                    		 
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">附言信息</span></td>
                                                      </tr>
                                                       <tr>
																<td class="text_tablehead_b" >
																	附言
																</td>
																<td colspan="3">
																	<textarea name="po.addtlInf" id="addtlInf" 
																		rows="2" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','addtlInf')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                   </div>
                                                    
                                                    <div class="table_content">
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">备注信息</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																	备注
																</td>
																<td colspan="3">
																	<textarea name="po.ustrd" id="ustrd" 
																		rows="2" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','ustrd')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                     </div>
                                                     
                                                     
                                                      <div class="table_content">
                                                    <table>  
                                              <tr >
                                          
                                             
										 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center"><font color=red>说明：红色*标注项为必填项</font></td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>                    
                                                   <tr >
                                          
                                             
										 <td style="width:40%;">
										 </td>
										         <td style="width:26%;" align="center">
										       <input name="addButton" type="button" onclick="commitForm();"  style="cursor: pointer"
											class="button" value="保  存"  />
										         <input id="saveButton" type="reset" style="cursor: pointer" class="button" value="重  置"   />
										         </td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>      
                                                    	
                                                    	</table>
                                                    </div>
                                                    
                                           </td>
                                         </tr>
                                      </table>
						              <!--
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />  
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="返  回" onclick="history.back();" />-->
										
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td></td>

					
				</tr>
			</table>

 
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		    	 	 
		</form>
	</body>
</html>
 