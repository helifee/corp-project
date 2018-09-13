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
		<title>���б�Ʊ�ֽ�⸶</title>
		
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	     <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	  	<script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
	
				    
		<script language="javascript">
		//�տ����˻�
		function  PubQueryAccount(paymentGroupNum){
	
	   		if(isNull(trim(paymentGroupNum))){
				 return;
			}
			var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
			pop.show();
			PubService.QueryAccount(paymentGroupNum,function(obj){
			 pop.close();
			if(obj==null||obj.acctid==null){
						  return;
			}else{
				 document.getElementById("receAcount").value=obj.acctid;
		         document.getElementById("name").value=obj.mm==null?"": obj.mm;//����
				 //document.getElementById("receOpenBankNum").value=  obj.issuer==null?"": obj.issuer ;   
				 //document.getElementById("receOpenBankName").value=obj.issuernm==null?"":obj.issuernm ;	
				 //document.getElementById("address").value=obj.addr==null?"": obj.addr;//��ַ
				 document.getElementById("phone").value=obj.tel==null?"": obj.tel;//��ϵ�绰
				 document.getElementById("certsize").value=obj.certip==null?"": obj.certip;//֤������
				document.getElementById("certsize1").value=obj.certip==null?"": obj.certip;//֤������
				 document.getElementById("certnum").value=obj.certid==null?"": obj.certid;//֤����accttp
				// document.getElementById("proposerCstmrId").value=obj.cstmrid==null?"": obj.cstmrid;//�����˿ͻ���
				 //document.getElementById("receAccountType").value=obj.accttp==null?"": obj.accttp;//�������˻�����
				  //document.getElementById("receAccountType1").value=obj.accttp==null?"": obj.accttp;//�������˻�����
			 }
		   	});
				
		}
		

	function OnSave() {
		var userMap = {};
		userMap.accountnumber = document.getElementById("payerAcount").value;
		userMap.accountname = document.getElementById("payName").value;
		//userMap.addr = document.getElementById("payAddress").value;
		userMap.issuer =document.getElementById("payBankNum").value;
		userMap.issuernm =document.getElementById("payBankName").value;
		userMap.mmbid =document.getElementById("fkqshhh").value;
		//userMap.accttp =document.getElementById("payAccountType").value;
		PubService.saveOthersBankAccountMsg(userMap, function(){
		}); 
	}
		function queryBypaymentGroupNum(paymentGroupNum){
			if(isNull(trim(paymentGroupNum))){
				return;
			}
			var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
			pop.show();
			PubService.queryOthersBankAccountMsg(paymentGroupNum,function(obj){
			 	pop.close();
				  if(obj==null||obj.accountnumber==null){
				   return;
				  }else{
				   document.getElementById("dbtramtacctid").value=paymentGroupNum;
				   document.getElementById("dbamtnm").value=obj.accountname==null?"": obj.accountname  ;
					document.getElementById("payName").value=obj.accountname==null?"": obj.accountname  ;
					//document.getElementById("payAddress").value=obj.addr==null?"": obj.addr  ;
					document.getElementById("payBankNum").value= obj.issuer==null?"": obj.issuer ;   
				    document.getElementById("payBankName").value=obj.issuernm==null?"":obj.issuernm ;
				    document.getElementById("payOpenBankName").value= obj.issuernm==null?"": obj.issuernm ;   
				    document.getElementById("fkqshhh").value=obj.mmbid==null?"":obj.mmbid ;//�����������к�
				    document.getElementById("payOpenBankNum").value=obj.issuer==null?"":obj.issuer ;//�����˿������к�
			        //document.getElementById("payAccountType").value==obj.accttp==null?"": obj.accttp;;//�������˻�����
				 }
			});
		}
			//�������кŲ�ѯ
			function selectBankInfo(){
				 var url ="<%=request.getContextPath()%>";
				var payBankNum= document.getElementById("payBankNum");//�����к�
				var payBankName=document.getElementById("payBankName");//��������
				var fkqshhh=document.getElementById("fkqshhh");//�������к�
				var payOpenBankNum= document.getElementById("payOpenBankNum");//�����к�
				var payOpenBankName=document.getElementById("payOpenBankName");//��������
				selectkhhBank(url,payBankNum,payBankName,fkqshhh,payOpenBankNum,payOpenBankName);
			}	
			//�տ��˿������кŲ�ѯ
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skhkhhhh= document.getElementById("receOpenBankNum");
				var skrkhhmc=document.getElementById("receOpenBankName");
				selectBank(url,skhkhhhh,skrkhhmc,"");
			}
			//�����˿������кŲ�ѯ
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var payOpenBankNum= document.getElementById("payOpenBankNum");
				var payOpenBankName=document.getElementById("payOpenBankName");
				var fkqshhh=document.getElementById("fkqshhh");
				selectBank(url,payOpenBankNum,payOpenBankName,fkqshhh);
			}
			
			
			
			 function open2(){
			     var pop = createAuthorWin("popid",'��Ȩ',"<%=request.getContextPath()%>/page/transfer/realtime/authorization.jsp");
				pop.show();
			   
			 }
			 
			 function zcx(val){
				if(val.value=='Y'){
					
					document.getElementById("handingCharge").value=""; 
				    document.getElementById("postCharge").value="";
				    document.getElementById("otherPlaceCharge").value="";
					document.getElementById("handingCharge").readOnly=true;
					document.getElementById("postCharge").readOnly=true;
					document.getElementById("otherPlaceCharge").readOnly=true;
					jisuan();
				}else{
					document.getElementById("handingCharge").readOnly=false;
					document.getElementById("postCharge").readOnly=false;
					document.getElementById("otherPlaceCharge").readOnly=false;
				}
			}
 
			function jisuan(){
				
				var sxf = document.getElementById("handingCharge").value; 
				var ydf = document.getElementById("postCharge").value;
				var ydjs =document.getElementById("otherPlaceCharge").value;
				var hkje = document.getElementById("moneyNum").value;
				document.getElementById("totalMoney").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje), 2);
			}
		
				function commitForm(){
				
			   var msg = "@";
					var receAcount = document.getElementById("receAcount");
					var name = document.getElementById("name");
					var payName = document.getElementById("payName");
                    var payOpenBankNum= document.getElementById("payOpenBankNum");
                    var payBankNum= document.getElementById("payBankNum");
                     var payBankName = document.getElementById("payBankName");
                      var payOpenBankName = document.getElementById("payOpenBankName");
                     var totalMoney = document.getElementById("totalMoney");
                 var phone = document.getElementById("phone");
                  var payerAcount = document.getElementById("payerAcount");
                 
                   var moneyNum = document.getElementById("moneyNum");
                     var paymentGroupNum  = document.getElementById("paymentGroupNum");
                     
                      var fkqshhh  = document.getElementById("fkqshhh");
                      
                      //msg=isMonNull(moneyNum,msg);
                      if(isNull(trim(fkqshhh.value))){
					msg += fkqshhh.title+"����Ϊ�գ�@";
				    }
                  if(isNull(trim(receAcount.value))){
					msg += receAcount.title+"����Ϊ�գ�@";
				    }
                  if(isNull(trim(payerAcount.value))){
					msg += payerAcount.title+"����Ϊ�գ�@";
				    }
 
 					if(isNull(trim(paymentGroupNum.value))){
					msg += paymentGroupNum.title+"����Ϊ�գ�@";
				    }

					if(isNull(trim(moneyNum.value))){
					msg += moneyNum.title+"����Ϊ�գ�@";
				    }
					if(isNull(trim(totalMoney.value))){
					msg += totalMoney.title+"����Ϊ�գ�@";
				    }
		           if(isNull(trim(payBankName.value))){
					msg += payBankName.title+"����Ϊ�գ�@";
				    }  
					if(isNull(trim(payBankNum.value))){
					msg += payBankNum.title+"����Ϊ�գ�@";
				    }
					 
					 
					 
					if(isNull(trim(payName.value))){
					msg += payName.title+"����Ϊ�գ�@";
				    }
					if(isNull(trim(name.value))){
					msg += name.title+"����Ϊ�գ�@";
				    }
					 
				var boo = msgSplit(msg);
				
			if(boo){
			OnSave();
			  document.getElementById("totalMoney").value=rmoney(document.getElementById("totalMoney").value);
				document.getElementById("moneyNum").value=rmoney(document.getElementById("moneyNum").value);//�����
				  document.getElementById("handingCharge").value=rmoney(document.getElementById("handingCharge").value );
				    document.getElementById("postCharge").value=rmoney( document.getElementById("postCharge").value);
				     document.getElementById("otherPlaceCharge").value=rmoney(document.getElementById("otherPlaceCharge").value);
					open2();
				  	}
				  	
				  	
		 }
		</script>
		
		
			<script language="javaScript">
  function sendDate(){
  //	var name=document.form1.Username.value;
  //	var pass=document.form1.Userpass.value;
  	
  	send_request("<%=path%>/transfer/RealTimeCreditAction.do?method=paymentGroupNumAjax");
  	  }
    var http_request = false;
  function send_request(url) {//��ʼ����ָ������������������ĺ���
   http_request = false;
   if(window.XMLHttpRequest) { 
����http_request = new XMLHttpRequest();
����if (http_request.overrideMimeType) {//����MiME���
 ����http_request.overrideMimeType('text/xml');
����}
   }
   else if (window.ActiveXObject) { // IE�����
����try {
 ����http_request = new ActiveXObject("Msxml2.XMLHTTP");
����} catch (e) {
 ����try {
  ����http_request = new ActiveXObject("Microsoft.XMLHTTP");
 ����} catch (e) {}
����}
   }
   if (!http_request) { // �쳣����������ʵ��ʧ��
����window.alert("���ܴ���XMLHttpRequest����ʵ��.");
����return false;
   }
   http_request.onreadystatechange = processRequest;
   // ȷ����������ķ�ʽ��URL�Լ��Ƿ�ͬ��ִ���¶δ���
   http_request.open("GET", url, true);
   http_request.send(null);
  }
  // ��������Ϣ�ĺ���
 ����function processRequest() {
     ����if (http_request.readyState == 4) { // �ж϶���״̬
         ����if (http_request.status == 200) { // ��Ϣ�Ѿ��ɹ����أ���ʼ������Ϣ
         //Ĭ�Ϸ���01��Ҳ���Ǵ�����Ϣ����ʱע���Ϳ���
                        if(http_request.responseText=='01'){
	                alert("��ȡ֧���������ʧ�ܣ���ˢ��ҳ�����»�ȡ");
	             return false;
	               }
                      else{
		                  document.form1.paymentGroupNum.value=http_request.responseText;//֧���������
	           			  document.form1.dddbsh.value=http_request.responseText;//�˵��˱�ʶ��
	                }
         ����   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             ����     alert("���������ҳ�����쳣��");
         ����  }
     ����}
 ����}
     
      
      
      
      
  
   

			
      
      
      
      
      </script>
      <script>
        //�����Ѳ�ѯ����--����ͨ��--ʵʱ���ҵ��
		function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('moneyNum'),
				 	transno:'7131',//ʵʱ���ҵ�� ����ͨ��
				 	pmttp:document.getElementById('businessSizeCode'),
				    sxf : document.getElementById('handingCharge'),
				    ydf : document.getElementById('postCharge'),
				    ydjs : document.getElementById('otherPlaceCharge'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('totalMoney'),
				    signtype: '01',
				    yxj:document.getElementById('yxj'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs"),
				  	waiven: document.getElementById("waiven")
				  };
				 if(obj.hkje.value==""||obj.hkje.value=="0.00"){
				  	clrAmt();
				  }
				  else{
					calcharge(url,beginamt,endamt,obj);				  
				  }
				 //calcharge(url,beginamt,endamt,obj);
			}
				
		
      </script>
      <script>
      function clrAmt(){
				document.getElementById('moneyNum').value="";
				document.getElementById('handingCharge').value="0.00";
				document.getElementById('postCharge').value="0.00";
				document.getElementById('otherPlaceCharge').value="0.00";
				document.getElementById('totalMoney').value="0.00";
				document.getElementById('counterfoil').value="0.00";
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
		<script type="text/javascript">
	     
	      
	      
	      function isMonNull(moneyNum,msg){
		 	if(moneyNum.value==''||moneyNum.value==0.00||moneyNum.value==0||moneyNum.value=='0.00'||moneyNum.value=='0'){
		 		msg += moneyNum.title+"����Ϊ�գ�@";
		 		return msg;
		 	}
		 		return "@";
		 }
	</script>
	
	<script>
		 function namezcx(val){
		 	if(val.value>99){
		 		alert("��������ֵ����");
		 		return;
		 	}
			  
			 var tb = document.getElementById('gkzjgzdfjjhb_mx');
     var rowNum=tb.rows.length;
     for (i=0;i<rowNum;i++)
     {
         tb.deleteRow(i);
         rowNum=rowNum-1;
         i=i-1;
     }
			 for(var i=0;i < val.value;i++){
			  
			  var newTr = this.document.getElementById("gkzjgzdfjjhb_mx").insertRow();
			var newTd1 = newTr.insertCell();
		    var newTd2 = newTr.insertCell();
	   var newTd3 = newTr.insertCell();
	   
	   newTd1.className="text_tablehead_b";
		newTd1.innerHTML = "����������";
		
		newTd2.className="text_tablehead_b";
		newTd2.innerHTML = "<div align='left'><input type='text' name='endrsrNm' id='gz_cptlcd' style='width: 90px;' maxlength='12'/>";
		newTd3.className="text_tablehead_b";
		newTd3.innerHTML = "<input type='button' value='ɾ��'  class='button' onclick='fundelmxgz(this)'/>";
		
			 }
			
			}
			
			
			function fundelmxgz(obj)
	{
		 
		var rowidx = obj.parentNode.parentNode.rowIndex; // ��ȡ�������ڱ���е��е�λ�ã���ɾ����ǰ�к���һ��
		this.document.getElementById("gkzjgzdfjjhb_mx").deleteRow(rowidx);
	
    var length= this.document.getElementById("gkzjgzdfjjhb_mx").rows.length	;//�õ���ɾ��ǰ��ֵ
    		// alert(length);
		 this.document.getElementById("numOfEndrsr").value=length;
	}
	</script>
	</head>
	<body onload="sendDate()">
		<form  name="form1" method="post"
			action="<%=path%>/transferJiefuAction.do?method=sendMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
			<input id="cardcrash" name="cardcrash" type="hidden" value="crash">
		 	 <input name="po.warrantyId" id="contrperson" type="hidden" >
		  	<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="yxj" name="yxj" type="hidden" value='NORM' maxlength="19" />
			
		 	 <input name="po.dbtramtacctid" id="dbtramtacctid" type="hidden"  title="�ۿ��˺�" maxlength="32"  /> 
			<input name="po.dbamtnm" id="dbamtnm" type="hidden"	title="�ۿ��" maxlength="60" />
			<input type="hidden"  name="po.businessSizeCode" id="businessSizeCode" value="B309"/>
			<input type="hidden"  name="po.businessClassCode" id="businessClassCode" value="03406"/>
			<input type="hidden"  name="po.signMd" id="signMd" value="01"/><!-- ǩ��ģʽ �ֽ� -->
			
			
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
						                  	<div  class="text_title"><span class="text_blue2">���б�Ʊ�ֽ�⸶</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																	 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>	 
                                                      <tr>
															<td class="text_tablehead_b"  >
																	֧�����
																</td>
																<td >
																		<input name="po.paymentGroupNum" id="paymentGroupNum" type="text" readonly="readonly"
																		style="width: 180px;" title="֧���������" maxlength="22"
																		  /><span  class="STYLE1">*</span>
																 
																</td>
																<td class="text_tablehead_b" >
																<!--   	�˵��˱�ʶ��-->
																</td>
																<td >
																	<input name="endtoendid" id="dddbsh" type="hidden" value="1234" 
																		maxlength="19" title="�˵��˱�ʶ��"  />
																
																	<!-- 	<span  class="STYLE1">*</span>-->
																</td>
																
															</tr>
															</table>
                                                 </div>
                                             
                                                 
                                                   
                                                    <div class="table_content">
                                                    <table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��������Ϣ</span></td>
                                                      </tr>
                                                  			
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�������˺�
																</td>
																<td>
																	<input name="po.payerAcount"  id="payerAcount" type="text" onblur="queryBypaymentGroupNum(this.value);"
																		 title="�������˺�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	����������
																</td>
																<td>
																	<input name="po.payName" id="payName" type="text" 
																		title="����������" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																<!-- 	�����˿������к�-->
																</td>
																<td>
																	<input name="po.payOpenBankNum" id="payOpenBankNum" type="hidden" class="text_tablehead_b_c"
																		 title="�����˿������к�" maxlength="12" value=""  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<!-- 	<input type="button" class="button"   value="����" onclick="selectBankInfoOfFkk()">-->
																		
																</td>
																<td class="text_tablehead_b">
																<!--  	�����˿���������-->
																</td>
																<td>

																	<input name="po.payOpenBankName" id="payOpenBankName" type="hidden" title="�����˿���������"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�������к�
																</td>
																<td>
																	<input name="po.payBankNum" id="payBankNum" type="text" class="text_tablehead_b_c"
																		 title="�������к�"  maxlength="12"    readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<input type="button" class="button"  value="����" onclick="selectBankInfo()">
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b">
																	  ����������
																</td>
																<td>
																	<input name="po.payBankName" id="payBankName" title="����������"  
																		  maxlength="60"    readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<!--  <span  class="STYLE1">*</span>-->
																</td>
                                                  			</tr>
                                                  			<tr>
																<td class="text_tablehead_b" >
																		�����������к� 
																</td>
																<td>
															<input name="po.dbtrMmbId" id="fkqshhh" type="text"  readonly="readonly"
																		 title="�����������к�" maxlength="12"
																		onKeyPress="actkeyPress()" />																 
																</td>
                                                  			</tr>
                                                  		</table>
                                                   </div>
                                                   
                                                    <div class="table_content">
                                                    	<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">�տ�����Ϣ</span></td>
                                                      </tr>
                                                  		    	<tr>
																<td class="text_tablehead_b" >
																	�տ����˺�
																</td>
																<td>
																	<input name="po.receAcount" id="receAcount" type="text" onblur="PubQueryAccount(this.value);"
																		 title="�տ����˺�" maxlength="32"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="po.name" id="name" type="text" readonly="readonly"
																		title="�տ�������" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
                                                  		    <tr>
																<td class="text_tablehead_b" >
																	<!--�տ����к�-->
																</td>
																<td>
																	<input name="po.cdtrBrnchId" id="cdtrBrnchId" type="hidden" class="text_tablehead_b_c"
																		 title="�տ����к�" maxlength="12"  readonly="readonly" value="${bankInfo.bankcode}"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" >
																	<!--�տ�������  -->
																</td>
																<td>
																	<input name="po.cdtrBrnchNm" id="cdtrBrnchNm" type="hidden" value="${bankInfo.participantname}"
																		style="width: 180px;" title="�տ���������" maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>  
																<tr>
															<td class="text_tablehead_b"  >
																	֤������
																</td>
																<td>
																<input name="po.certsize" id="certsize1" type="hidden"  readonly="readonly"/>
																		<select title='֤������'  name="po.certsize" id="certsize" disabled="disabled">
																		<option value="01" selected>
																			���֤
																		</option>
																		<option value="02">
																			����֤
																		</option>
																		<option value="03">
																			ѧ��֤
																		</option>
																		<option value="04">
																			Ӫҵִ��
																		</option>
																		<option value="05">
																			��֯��������
																		</option>
																	
																	</select>
																	 
																</td>
															
																<td class="text_tablehead_b" >
																	�տ���֤����
																</td>
																<td >
																	<input name="po.certnum" id="certnum" type="text" size="19" onblur="checkIdcard(this.value,'certnum')" readonly="readonly"
																	
																		maxlength="32" title="�տ���֤����" /> <span  class="STYLE1">*</span>
															 		</td>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	�տ�����ϵ�绰
																</td>
																<td>
																	<input  name="po.phone" id="phone" type="text" readonly="readonly"
																		 maxlength="20" title="�տ�����ϵ�绰" />
																</td>
															<tr>
																<td class="text_tablehead_b" >
																	<!-- �տ��˿������к� -->
																</td>
																<td>
																	<input name="po.cdtrIssuer" id="receOpenBankNum" type="hidden"  value="${bankInfo.bankcode}" class="text_tablehead_b_c"
																		 title="�տ��п������к�" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<!--<input type="button" class="button"  value="����" onclick="selectBankInfoOfSkk()">-->	
																</td>
															
																<td class="text_tablehead_b">
																	<!-- �տ��˿��������� -->
																</td>
																<td>
																	<input name="po.cdtrIssuerNm" id="receOpenBankName" type="hidden" readonly="readonly" value="${bankInfo.participantname}"
																		title="�տ��˿���������" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															
																<tr>
																
																
																 <td class="text_tablehead_b" >
																	<!--  �տ����������к�-->
																</td>
																<td>
																		
																		  <input name="po.cdtrMmbId" id="cdtrMmbId" type="hidden" readonly="readonly"
																		title="�տ����������к�" maxlength="12" value="${bankInfo.directbankcode }"
																		 onKeyPress="actkeyPress()" />
																		 
																</td>
															</tr>
                                                  		</table>
                                                 </div>
                                                <div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">Ʊ����Ϣ</span>
																	</td>
																</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	��Ʊ����
																</td>
																<td >
																		<input name="po.notesnum" id="paymentGrouppo" type="text"
																		style="width: 180px;" title="��Ʊ����" maxlength="35"/>
																		<span  class="STYLE1"> *</span>
																 
																</td>
																
																<td class="text_tablehead_b">
																		��Ʊ��Ѻ
																	</td>
																	<td>
																		<input name="po.billseal" id="hpmy" type="text"
																			title="��Ʊ��Ѻ" />
																			<span  class="STYLE1"> *</span>
																	</td>
															</tr>
															<tr>
															  <td class="text_tablehead_b">
																		��Ʊ����
																	</td>
																	<td>
																		<input name="po.issuedt" id="cprq" class="Wdate"
																			type="text" readonly="readonly" title="��Ʊ����"
																			onclick="WdatePicker()" />
																		<span class="STYLE1"> *</span>
															 </td>
															   <td class="text_tablehead_b">
																		��ʾ��������
																	</td>
																	<td>
																		<input name="po.paydt" id="cprq" class="Wdate"
																			type="text" readonly="readonly" title="��ʾ��������"
																			onclick="WdatePicker()" />
																		<span class="STYLE1"> *</span>
															 </td>
															</tr>
															<tr>
																	<td class="text_tablehead_b" >
																	��Ʊ������
																      </td>
																   <td >
																	<input style="width:180px;" name="po.password" id="honourno" type="text" size="19"
																		maxlength="19" title="��Ʊ������" /><span  class="STYLE1"> *</span>
																	
																     </td>
															</tr>
													</table> 
													</div>
                                                    <div class="table_content">
                                                   
                                                  
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">�����Ϣ</span></td>
                                                      </tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	���ִ���
																</td>
																<td>
																	<input name="po.moneyClassCode" id="moneyClassCode" type="text"
																		 title="���ִ���"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" >
																	�ܶ�
																</td>
																<td >
																	<input name="po.totalMoney" id="totalMoney" type="text" readonly="readonly"
																		 title="�ܶ�" maxlength="12"
																		 />
																<span  class="STYLE1">*</span>
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" >
																		�����
																	</td>
																	<td colspan="4">
																		<input name="po.moneyNum" id="moneyNum" type="text"
																			 title="�����" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; addchange(this.value);" />
																	<span  class="STYLE1">*</span>
																	</td>
																	
																</tr>
                                                  		</table>
                                                  	</div>
                                                   
                                                    <div class="table_content">
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">�Ʒ���Ϣ</span></td>
                                                      </tr>
                                                    			<tr>
															<!--  	
													   	<td class="text_tablehead_b" >
																	����
																</td>
																<td >
																
																	<input type="radio" class="text_tablehead_b_rad" name="po.waive" value="N" checked  onclick="zcx(this);">������
																	<input type="radio" class="text_tablehead_b_rad" name="po.waive" value="Y" onclick="zcx(this);">����
																	 
																</td>-->
															</tr>
															<tr>												  	 
					<td class="text_tablehead_b" >
						��ȡ����
					</td>
					<td >					
						<input type="radio" class="text_tablehead_b_rad" name="po.waive" id="waivey" value="Y" checked="checked" onclick="addchange('this.value');">��ȡ
						<input type="radio" class="text_tablehead_b_rad" name="po.waive" id="waiven" value="N"  onclick="clrAmt0()">����ȡ
					</td>
				</tr>
															<tr>
															<td class="text_tablehead_b" >
																	������
																</td>
																<td>
																	<input name="po.handingCharge" id="handingCharge" type="text" 
																		title="������" maxlength="12" 
																		 readonly="readonly" />
																
																</td>
																<td class="text_tablehead_b" >
																	������Ϣ
																</td>
																<td>
																	<input name="systemcd" id="xth" type="hidden" title="ϵͳ��" maxlength="12" value=""/> 
																	<select   id="xth1"  name="systemcd1" title="ϵͳ��" disabled="disabled">
																	<option value="">
																		</option>
																		<option value="HVPS">
																			���
																		</option>
																		<option value="BEPS">
																			С��
																		</option>
																		
																	</select>
																
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	�ʵ��
																</td>
																<td>
																	<input name="po.postCharge" id="postCharge" type="text"
																		title="�ʵ��" maxlength="12" 
																		 readonly="readonly"/>
																
																</td>
																<td class="text_tablehead_b" >
																	��ؼ���
																</td>
																<td colspan="4">
																	<input name="po.otherPlaceCharge" id="otherPlaceCharge" type="text" 
																		title="��ؼ���" maxlength="12" 
																		 readonly="readonly"/>
																
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	������
																</td>
																<td>
																	<input name="counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="������" maxlength="19"  />
																</td>
															</tr>
                                                    		</table>
                                                    </div>
                                                   	 <div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">����ת����Ϣ</span>
																	</td>
																</tr>
																<tr>
																<td class="text_tablehead_b">
																		�Ƿ��Ѿ�����ת��
																	</td>
																	<td>
																		<select name="po.endrsrr" id="endrsrr">
																			<option value="Y">
																				Y-��
																			</option>
																			<option value="N">
																				N-��
																			</option>
																			</select>
																	</td>
																	<td class="text_tablehead_b">
																		��;
																	</td>
																	<td>
																		<input name="po.purpose" id="yt" type="text"
																			title="��;" />
																	</td>
																</tr>
																<tr>
															
																   
																	<td class="text_tablehead_b">
										                   ��������
										                </td>
										                <td>
										                 	<input type="text" name="po.numofendrsr" id="numOfEndrsr" maxlength="10" title="��������"  onkeyup="fun_number(this);namezcx(this);" /><font color="#FF0000">*</font>
										                </td>
																<td class="text_tablehead_b">
																		ԭ�տ���������
																	</td>
																	<td>
																		<input name="po.oricrdtrnm" id="name" type="text"
																			title="ԭ�տ���������" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1"> *</span>
																	</td>
																</tr>
																</table>
																</div>
                                                    <div class="table_content" style="display:none;"><!-- ����������С��ʵʱ���ҵ���޸��� -->
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																	����
																</td>
																<td colspan="3">
																	<textarea name="po.postscript" id="postscript" 
																		rows="2" cols="70" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','postscript')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    		
 </div>                                                  	
   
                                                     
                                                    <div class="table_content" id="fjxx" style="display: true;">
															<table id="gkzjgzdfjjhb_mx" border="0" cellpadding="0"
																cellspacing="0">
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">������Ϣ</span>
																	</td>
																</tr>
																<tr>
																</tr>
															</table>
														</div>
														
                                                     <div class="table_content">
                                                    <table>  
                                              <tr >
                                          
                                             
										 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center"><font color=red>˵������ɫ*��ע��Ϊ������</font></td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>                    
                                                   <tr >
                                          
                                             
										 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center">
										       <input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
										         <input id="saveButton" type="reset" style="cursor: pointer" class="button" value="��  ��"   />
										         </td>
										  <td style="width:25%;">&nbsp;</td>
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
