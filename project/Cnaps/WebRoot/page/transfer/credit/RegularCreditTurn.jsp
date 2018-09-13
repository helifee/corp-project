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
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
    <script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		
		<script language="javascript">
			
			
		//付款行行号查询
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var recvbkno= document.getElementById("payBankNum");
				var recvbkname=document.getElementById("payBankName");
				selectBank(url,recvbkno,recvbkname,"");
			}
		//付款人开户行行号查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var payOpenBankNum= document.getElementById("payOpenBankNum");
				var payOpenBankName=document.getElementById("payOpenBankName");
				selectBank(url,payOpenBankNum,payOpenBankName,"");
			}
		
	var A00100 = {name:"00100",value:"电费"}; 
    var A00200 = {name:"00200",value:"水暖费"}; 
    var A00300 = {name:"00300",value:"煤气费"}; 
    var A00400 = {name:"00400",value:"电话费"}; 
    var A00500 = {name:"00500",value:"通讯费"}; 
    var A00600 = {name:"00600",value:"保险费"}; 
    var A00700 = {name:"00700",value:"房屋管理费"};   
    var A00800 = {name:"00800",value:"代理服务费"}; 
    var A00900 = {name:"00900",value:"学教费"};
    var A01000 = {name:"A01000",value:"企业管理费用"};
    var A09001 = {name:"09001",value:"其他"};
    var A01100 = {name:"01100",value:"代理服务费"};
    var A01200 = {name:"01200",value:"薪金报酬"};
A104 = [A00100,A00200,A00300,A00400,A00500,A00600,A00700,A00800,A00900,A01000,A01100,A09001 ];
	var A01300 = {name:"01300",value:"慈善捐款"};
A105 =[A01300,A09001];	
	
		 function ch_cxtj(obj){
		   var sel = document.getElementById("businessClassCode");
		sel.options.length=0; 
		
		   
		   if(obj.value == "E100"){
	 		for(var i=0;i < A104.length;i++){
			var opt = document.createElement('option');
						opt.setAttribute('value',A104[i].name);
						opt.innerText = A104[i].value;
						sel.appendChild(opt);
			 }
			 
		}else {
		   if(obj.value == "C210"){
			var opt = document.createElement('option');
						opt.setAttribute('value',A01200.name);
						opt.innerText = A01200.value;
						sel.appendChild(opt);
		 	
			}else{
			        if(obj.value == "A101"){
			        
			        for(var i=0;i < A105.length;i++){
			var opt = document.createElement('option');
						opt.setAttribute('value',A105[i].name);
						opt.innerText = A105[i].value;
						sel.appendChild(opt);
			 }
			        }
			}
		
		
	 		}
	 
	}
	
	
		 function businessClassCodedf(value,name){
		
		 
		
		   
		   if( value == "E100"){
	 		for(var i=0;i < A104.length;i++){
	 		 
			  if(name==A104[i].name)
			 	  
			  {
						
				document.getElementById("businessClassCode").value  = A104[i].value;}
						 
			 }
			 
		}else {
		   if( value == "C210"){
		   if(name=A01200.name)
						
				document.getElementById("businessClassCode").value = A01200.value;
		 
		 	
			}else{
			        if( value == "A101"){
			        
			        for(var i=0;i < A105.length;i++){
			         if(name=A105[i].name)
			        document.getElementById("businessClassCode").value = A105[i].value;
		 
		 
						 
						
			 }
			        }
			}
		
		
	 		}
	 
	}
	
		function queryBypaymentGroupNum(paymentGroupNum){
		clrAmt();	
			if(isNull(trim(paymentGroupNum))){
					 return;
				   }
			 PubService.queryRegularCredit(paymentGroupNum,function(obj){
				  if(obj==null||obj.paymentGroupNum==null){
				  alert("支付交易组号不存在，或已失效，未查到相关数据");
				  document.getElementById("paymentGroupNum").value="";
				  document.getElementById("certnum").value="";
					document.getElementById("phone").value="";   
					document.getElementById("address").value="";   
					document.getElementById("payName").value="";   
					document.getElementById("certsize").value="";   
					document.getElementById("certsize1").value="";   
					document.getElementById("payerAcount").value="";  
					document.getElementById("payBankNum").value="";   
					document.getElementById("payBankName").value="";  
					document.getElementById("payOpenBankNum").value="";
					document.getElementById("payOpenBankName").value="";
					document.getElementById("dbtrmmbid").value="";   
					document.getElementById("proposerCstmrId").value="";
					document.getElementById("totalentryMoney").value="";
					document.getElementById("totalentry").value=""; 
					document.getElementById("businessSizeCode").value=""; 
					document.getElementById("businessClassCode").value=""; 
					document.getElementById("proposerAcctTp").value="";
				   document.getElementById("paymentGroupNum").focus();
				   return;
				  }else{
				 
		document.getElementById("paymentGroupNum").value=obj.paymentGroupNum;
		document.getElementById("certnum").value=obj.certnum==null?"": obj.certnum;
		document.getElementById("phone").value=obj.phone==null?"": obj.phone;
		document.getElementById("address").value=obj.address==null?"": obj.address;
		document.getElementById("payName").value=obj.name==null?"": obj.name;
		document.getElementById("certsize").value=obj.certsize==null?"": obj.certsize;//证件类型
		document.getElementById("certsize1").value=obj.certsize==null?"": obj.certsize;//证件类型
		document.getElementById("payerAcount").value=obj.payerAcount==null?"": obj.payerAcount;
		document.getElementById("payBankNum").value=obj.dbtrBrnchId==null?"": obj.dbtrBrnchId;//付款 行行号
		document.getElementById("payBankName").value=obj.dbtrBrnchNm==null?"": obj.dbtrBrnchNm;//付款 行名称
		document.getElementById("payOpenBankNum").value=obj.applyOpenBankNum==null?"": obj.applyOpenBankNum;
		document.getElementById("payOpenBankName").value=obj.applyOpenBankName==null?"": obj.applyOpenBankName;
		document.getElementById("dbtrmmbid").value=obj.dbtrMmbId==null?"": obj.dbtrMmbId;
		document.getElementById("proposerCstmrId").value=obj.proposerCstmrId==null?"": obj.proposerCstmrId;
		document.getElementById("totalentryMoney").value=obj.totalentryMoney==null?"":fmoney( obj.totalentryMoney);
		document.getElementById("totalentry").value=obj.totalentry==null?"": obj.totalentry;
		 
		 		if(obj.businessSizeCode=="E100"){
		document.getElementById("businessSizeCode").value="普通定期贷记业务";
		}
		if(obj.businessSizeCode=="C210"){
		document.getElementById("businessSizeCode").value="薪金报酬";
		}		 
		
		if(obj.businessSizeCode=="A101"){
		document.getElementById("businessSizeCode").value="公益性资金汇划";
		}	
		 
		businessClassCodedf(obj.businessSizeCode,obj.businessClassCode);
		if(obj.payAccountType=="AT00"){
		document.getElementById("proposerAcctTp").value="对公账户";
		}	
		
			if(obj.payAccountType=="AT01"){
		document.getElementById("proposerAcctTp").value="个人贷记卡账户";
		}	
			if(obj.payAccountType=="AT02"){
		document.getElementById("proposerAcctTp").value="个人借记卡账户";
		}	
			if(obj.payAccountType=="AT03"){
		document.getElementById("proposerAcctTp").value="存在";
		}
			if(obj.payAccountType=="AT04"){
		document.getElementById("proposerAcctTp").value="其他";
		}		
		 }
	   	});
				
			}
			
		
				function commitForm(){
			   var msg = "@";
					var password = document.getElementById("password");
					var payerAcount = document.getElementById("payerAcount");
					
					 var payName = document.getElementById("payName");
                      var payOpenBankNum= document.getElementById("payOpenBankNum");
                     var payBankNum= document.getElementById("payBankNum");
                     var payBankName = document.getElementById("payBankName");
                     var payOpenBankName = document.getElementById("payOpenBankName");
                     var totalMoney = document.getElementById("totalMoney");
                 
                    var moneyNum = document.getElementById("moneyNum");
                   
                   var paymentGroupNum  = document.getElementById("paymentGroupNum");
                    
                    
            var totalentryMoney  = document.getElementById("totalentryMoney");
            var totalentry  = document.getElementById("totalentry");

                   	if(isNull(trim(totalentryMoney.value))){
					msg += totalentryMoney.title+"不能为空！不予签发 ！@";
				    }
				    if(isNull(trim(totalentry.value))){
					msg += totalentry.title+"不能为空！不予签发 ！@";
				    }
				    
					if(isNull(trim(paymentGroupNum.value))){
					msg += paymentGroupNum.title+"不能为空！@";
				    }
					 
					if(isNull(trim(moneyNum.value))){
					msg += moneyNum.title+"不能为空！@";
				    }
					if(isNull(trim(totalMoney.value))){
					msg += totalMoney.title+"不能为空！@";
				    }
					if(isNull(trim(payOpenBankName.value))){
					msg += payOpenBankName.title+"不能为空！@";
				    }  
					if(isNull(trim(payBankName.value))){
					msg += payBankName.title+"不能为空！@";
				    }  
					if(isNull(trim(payBankNum.value))){
					msg += payBankNum.title+"不能为空！@";
				    }
					if(isNull(trim(payOpenBankNum.value))){
					msg += payOpenBankNum.title+"不能为空！@";
				    }
				
					 
					if(isNull(trim(payerAcount.value))){
					msg += payerAcount.title+"不能为空！@";
				    }
					 
					 if(isNull(trim(payName.value))){
					msg += payName.title+"不能为空！@";
				    }
					 
				
				
				var boo = msgSplit(msg);
				
				 
				if(boo){
				
			    	if(totalentryMoney.value==moneyNum.value){
						 var handingCharge = document.getElementById("handingCharge");
					   var postCharge = document.getElementById("postCharge");
	                    var otherPlaceCharge = document.getElementById("otherPlaceCharge");
	                   
			 
					    document.getElementById("totalMoney").value=rmoney(totalMoney.value);
					    document.getElementById("moneyNum").value=rmoney(moneyNum.value);//汇款金额
					    document.getElementById("handingCharge").value=rmoney(handingCharge.value);
					    document.getElementById("postCharge").value=rmoney(postCharge.value);
					    document.getElementById("otherPlaceCharge").value=rmoney(otherPlaceCharge.value);
					   var  totalentryMoney=rmoney(document.getElementById("totalentryMoney").value);
						document.forms[0].submit();
					}else{
					  alert("汇款金额与累计录入金额不一致");
					}
				}
		 }
		  function init(){
	 
	  var sel = document.getElementById("businessClassCode");
			for(var i=0;i < A104.length;i++){
			var opt = document.createElement('option');
						opt.setAttribute('value',A104[i].name);
						opt.innerText = A104[i].value;
						sel.appendChild(opt);
			 }
	  		
	 }
		function cxzfjyzh(){
		var newurl = "<%=path%>/transfer/RegularCreditAction.do?method=queryList&selectFlag=selectFlag";
		viewDetails(newurl," ");
		
	 
	}
		 
		 
		 
		 // 异步获取对应的支付交易组号的相关信息
	var request=0;
	function startmethod(url,txt,objvalue){
 
		if(objvalue.replace(/\s/g,"") == ""){
			return false;
		}else{
			createRequest();
			if (!request){
				alert("Error initializing XMLHttpRequest!");
			}else{
				request.open("GET", url, true);
				request.onreadystatechange = test;
				if(txt == 0){
					request.send(null);
				}else{
					request.send(txt);
				}
			}
		}
	}
	
	function test(){
	
		if(request.readyState == 4){
			if(request.status == 200){
				var response = request.responseText.replace(/\s/g,"");
				if(response == 'NULL'){
					alert("该支付交易组号无效！");
				}else if(response == 'USED'){
							alert("该支付交易组号已被使用！");
				}else{
						}
			}else{
				alert("status is " + request.status);
			}
		}
	}
	
		 
		//增加手续费查询
		function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('moneyNum'),
				 	transno:'7125',
				 	pmttp:document.getElementById('businessSizeCode'),
				    sxf : document.getElementById('handingCharge'),
				    ydf : document.getElementById('postCharge'),
				    ydjs : document.getElementById('otherPlaceCharge'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('totalMoney'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs"),
				  	bepsgbf: document.getElementById("bepsgbf"),
				  	hvpsgbf: document.getElementById("hvpsgbf"),
				  	waiven: document.getElementById("waiven")
				  };
				 calcharge(url,beginamt,endamt,obj);
			}	 
		 function clrAmt(){
				document.getElementById('moneyNum').value="";
				document.getElementById('handingCharge').value="0.00";
				document.getElementById('postCharge').value="0.00";
				document.getElementById('otherPlaceCharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalMoney').value="";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
		 
		function clrAmt0(){
				document.getElementById('handingCharge').value="0.00";
				document.getElementById('postCharge').value="0.00";
				document.getElementById('otherPlaceCharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalMoney').value=document.getElementById('moneyNum').value;
			}
		</script>
	</head>  
	<body >
		<form  name="form1" method="post"
			action="<%=path%>/transfer/RegularCreditTurnAction.do?method=sendCredit">
			<!-- 防止重复提交 -->
			<input type="hidden" name="token" value="${token}" />
			<!-- 转账签发 -->
			<input id="cardcrash" name="po.signMd" type="hidden" value="03">
			<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="bepsgbf" name="bepsgbf" type="hidden" maxlength="19" />
			<input  id="hvpsgbf" name="hvpsgbf" type="hidden" maxlength="19" />
			 
	
			
			
			  <table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					
					<td></td>
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
						                  	<div  class="text_title"><span class="text_blue2">定期贷记转账</span></div>
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
																	支付组号
																</td>
																<td >
																		<input name="po.paymentGroupNum" id="paymentGroupNum" type="text"  onblur="queryBypaymentGroupNum(this.value)"
																		 title="支付交易组号" maxlength="22"
																		  /> 
																		  
																		<!-- class="text_tablehead_b_c" <input type="button" style="width: 40px;" value="查 询" onclick="cxzfjyzh()">-->
																	 <span  class="STYLE1">*</span>
																 
																</td>
																<td class="text_tablehead_b" >
																	 
																</td>
																<td >
																 
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	业务类型编码
																</td>
																<td>
																<input name="po.businessSizeCode" id="businessSizeCode" type="text"   readonly="true"
																		 title="业务类型编码" maxlength="22"
																		  />  <span  class="STYLE1">*</span>
															
																</td>
																<td class="text_tablehead_b" >
																	业务种类编码
																</td>
																<td >
																<input name="po.businessClassCode" id="businessClassCode" type="text"   readonly="true" 
																 title="业务种类编码" maxlength="22"
																		  />  <span  class="STYLE1">*</span>
																	 
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
															<td class="text_tablehead_b"  >
																	证件类型
																</td>
																<td>
																<input type="hidden"   name="po.certsize" id="certsize" value="">
																		<select  id="certsize1" disabled="disabled">
																		<option value="">
																			请选择
																		</option>
																		<option value="01">
																			身份证
																		</option>
																		<option value="02">
																			军官证
																		</option>
																		<option value="03">
																			学生证
																		</option>
																	
																	</select>
																	 
																</td>
															
																<td class="text_tablehead_b" >
																	证件号
																</td>
																<td >
																	<input name="po.certnum" id="certnum" type="text" size="19" readonly="readonly"
																		maxlength="32" title="申请人证件号" />
																		 
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	联系电话
																</td>
																<td>
																	<input  name="po.phone" id="phone" type="text"  readonly="readonly"
																		 maxlength="20" title="申请人联系电话" />
																		 
																</td>
																<td class="text_tablehead_b" >
																	客户号
																</td>
																<td >
																	 <input type="text"  maxlength="30" name="po.proposerCstmrId" title="申请人客户号"  readonly="readonly" id="proposerCstmrId">
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	账户类型
																</td>
																<td>
																	 <input type="text"  maxlength="30" name="po.proposerAcctTp" title="申请人账户类型"  readonly="readonly" id="proposerAcctTp">
																</td>
																<td class="text_tablehead_b"  >
																	账户币种
																</td>
																<td >
																	 <input type="text"  name="po.proposerAcctCcy" title="申请人账户币种"  readonly="readonly" id="proposerAcctCcy" value="CNY">
																</td>
															</tr>
															
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款行行号
																</td>
																<td>
																	<input name="po.payBankNum" id="payBankNum" type="text"  
																		 title="付款行行号"  maxlength="12"    readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<!--   <input type="button" class="button"  value="搜索" onclick="selectBankInfo()">-->
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b">
																	付款行名称
																</td>
																<td>
																	<input name="po.payBankName" id="payBankName" type="text" title="付款行名称"  
																		  maxlength="60"    readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人账号
																</td>
																<td>
																	<input name="po.payerAcount" id="payerAcount" type="text" readonly="readonly"
																		 title="付款人账号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	付款人名称
																</td>
																<td>
																	<input name="po.payName" id="payName" type="text" readonly="readonly"
																		title="付款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人地址
																</td>
																<td colspan="3">
																	<input name="po.address" id="address" class="text_tablehead_b_addr"  readonly="readonly"
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','fkrdz')"/>
																
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人开户行行号
																</td>
																<td>
																	<input name="po.payOpenBankNum" id="payOpenBankNum" type="text" 
																		 title="付款人开户行行号" maxlength="12" value=""  readonly="readonly"
																		onKeyPress="actkeyPress()" /> <span  class="STYLE1">*</span>
																	<!-- 	<input type="button" class="button"   value="搜索" onclick="selectBankInfoOfFkk()">-->
																		
																</td>
																<td class="text_tablehead_b">
																	付款人开户行名称
																</td>
																<td>

																	<input name="po.payOpenBankName" id="payOpenBankName" type="text" title="付款人开户行名称" readonly="readonly"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" /> <span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  			
																<td>
																	<input name="po.dbtrmmbid" id="dbtrmmbid" type="hidden"   readonly="readonly"
																		 title="付款清算行行号" maxlength="12" 
																		onKeyPress="actkeyPress()" />
																		
																</td>
                                                  			</tr>
                                                  		</table>
                                                </div>
                                                  
                                                  
                                                    <div class="table_content">
                                                  		<table>
                                                  		<tr>
                                                      	<td colspan="4"><span class="text_tablehead">金额信息</span></td>
                                                      </tr>
                                                      <tr>
																<td class="text_tablehead_b" align="right">
																明细笔数
																</td>
																<td>
																		 <input name="po.totalentry" id="totalentry" type="text" style="width:180px;" title="明细笔数" maxlength="14"  onKeyPress="actkeyPress()" readonly="true"/>  </td>
														 	 
																<td class="text_tablehead_b" align="right" >
																	累计录入金额
																</td>
																<td>
																 <input name="po.totalentryMoney" id="totalentryMoney" type="text" style="width:180px;" title="累计录入金额" maxlength="14"  onKeyPress="actkeyPress()" readonly="true"/>  </td>
														 	  
															</tr>
                                                  			<tr>
																<td class="text_tablehead_b" >
																	币种代码
																</td>
																<td>
																	<input name="po.moneyClassCode" id="moneyClassCode" type="text"
																		 title="币种代码"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" >
																	总额
																</td>
																<td >
																	<input name="po.totalMoney" id="totalMoney" type="text" readonly="readonly"
																		 title="总额" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" >
																		汇款金额
																	</td>
																	<td colspan="4">
																		<input name="po.moneyNum" id="moneyNum" type="text"
																			 title="汇款金额" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange();" />
																	<span  class="STYLE1">*</span>
																	</td>
																	
																</tr>
                                                  		</table>
                                                  	</div>
                                                   
                                                    <div class="table_content">
                                                    		<table>
                                                    					 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">计费/渠道信息</span></td>
                                                      </tr>
                                                    		 <tr>	 
																<td class="text_tablehead_b" >
																	收取费用
																</td>
																<td >
																	<input type="radio" class="text_tablehead_b_rad"  name="po.waive" id="waivey" value="Y" checked="checked" onclick="addchange('this.value');">收取
																	<input type="radio"  class="text_tablehead_b_rad" name="po.waive" id="waiven" value="N"  onclick="clrAmt0()">不收取
																</td>
															</tr>	
															<tr>
															<td class="text_tablehead_b" >
																	手续费
																</td>
																<td>
																	<input name="po.handingCharge" id="handingCharge" type="text" 
																		title="手续费" maxlength="12" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')" readonly="readonly"
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																
																</td>
																<td class="text_tablehead_b" >
																	渠道信息
																</td>
																<td>
																	<input name="systemcd" id="xth" type="hidden" title="系统号" maxlength="12" value=""/> 
																	<select   id="xth1"  name="systemcd1" title="系统号" disabled="disabled">
																	<option value="">
																		</option>
																		<option value="HVPS">
																			大额
																		</option>
																		<option value="BEPS">
																			小额
																		</option>
																	</select>
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	邮电费
																</td>
																<td>
																	<input name="po.postCharge" id="postCharge" type="text"
																		title="邮电费" maxlength="12" readonly="readonly"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')" 
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																
																</td>
																<td class="text_tablehead_b" >
																	异地加收
																</td>
																<td  >
																	<input name="po.otherPlaceCharge" id="otherPlaceCharge" type="text" 
																		title="异地加收" maxlength="12" readonly="readonly"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; " />
																
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	工本费
																</td>
																<td  >
																	<input name="po.counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="工本费" maxlength="12" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																
																</td>
															</tr>
                                                    		</table>
                                                    </div>
                                                    
                                                    
                                                        <div class="table_content">
                                                    	<table>
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    			<span class="STYLE1">说明：红色*标注项为必填项</span>
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td>
                                                    		</tr>
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="保  存" onclick="commitForm();" />
																			<input name="backButton" style="cursor: pointer" type="reset"
											class="button" value="重  置"  />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                  </div>
                                                   
                                           </td>
                                         </tr>
                                      </table>
						              
									
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
