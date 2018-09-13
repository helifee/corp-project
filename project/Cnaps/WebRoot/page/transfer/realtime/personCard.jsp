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
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
       <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        
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
	<script type="text/javascript" src="<%=path%>/js/common/checkIdcard.js"></script>
	   <script type="text/javascript">
	   		function saveFun(data) {
      if (data) {
   // alert("ע��ɹ���");
      } else {
   // alert("data��");
    }
 }

	function OnSave() {
var userMap = {};
	userMap.accountnumber = document.getElementById("receNum").value;
	userMap.accountname = document.getElementById("receName").value;
	userMap.addr = document.getElementById("receAddress").value;
	userMap.issuer =document.getElementById("receBankNum").value;
	userMap.issuernm =document.getElementById("receBankName").value;
	userMap.mmbid =document.getElementById("cdtrMmbId").value;
	userMap.accttp =document.getElementById("receAccountType").value;
  PubService.saveOthersBankAccountMsg(userMap, saveFun); 
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
				 
				  //alert(" �տ�����Ϣ�����ڣ�����ʧЧ��δ�鵽�������" );
				  //document.getElementById("cdtracctid").focus();
				       
				   return;
				  }else{ 
			 
			  document.getElementById("receNum").value=obj.accountnumber;
		      document.getElementById("receName").value=obj.accountname==null?"": obj.accountname  ;
			  document.getElementById("receAddress").value=obj.addr==null?"": obj.addr  ;
			   document.getElementById("receOpenBankNum").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("receOpenBankName").value=obj.issuernm==null?"":obj.issuernm ;
			   document.getElementById("receBankNum").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("receBankName").value=obj.issuernm==null?"":obj.issuernm ;	
			  document.getElementById("receAccountType").value=obj.accttp==null?"":obj.accttp ;	
			   document.getElementById("cdtrMmbId").value=obj.mmbid==null?"":obj.mmbid ;//�������к�
		 }
	   	});
				
			}
			
		
		
		
			function  PubQueryAccount(paymentGroupNum){
	 
   		if(isNull(trim(paymentGroupNum))){
					 return;
				   }
				var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
					pop.show();
					PubService.QueryAccount(paymentGroupNum,function(obj){
					     pop.close();
				  if(obj==null||obj.acctid==null){
				 
				  alert(" �տ�����Ϣ�����ڣ�����ʧЧ��δ�鵽�������" );
				 
				       
				   return;
				  }else{
			 
			  //document.getElementById("payerNum").value=obj.acctid;
		      //document.getElementById("dbtrNm").value=obj.acctid==null?"": obj.acctid  ;

    		  document.getElementById("name").value=obj.mm==null?"": obj.mm;//����
		      document.getElementById("address").value=obj.addr==null?"": obj.addr;//��ַ
		      document.getElementById("phone").value=obj.tel==null?"": obj.tel;//��ϵ�绰
		      document.getElementById("certsize1").value=obj.certip==null?"": obj.certip;//֤������
			  document.getElementById("certsize").value=obj.certip==null?"": obj.certip;//֤������
		      document.getElementById("certnum").value=obj.certid==null?"": obj.certid;//֤����
		      document.getElementById("proposerCstmrId").value=obj.cstmrid==null?"": obj.cstmrid;//�����˿ͻ���
		      document.getElementById("payAccountType").value=obj.accttp==null?"": obj.accttp;//�������˻�����
		      document.getElementById("payAccountType1").value=obj.accttp==null?"": obj.accttp;//�������˻�����
		      
			 
			    
		 }
	   	});
				
			}
		
		
	   
	   </script>
		<SCRIPT language="javaScript"><!--
  function sendDate(){
  	
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
	                 
		                
		                  document.form1.paymentGroupNum.value=http_request.responseText;
	           
		               
	             
	                }
         ����   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             ����     alert("���������ҳ�����쳣��");
         ����  }
     ����}
 ����}
      --></script>
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	
	
	
	
		<script type="text/javascript">
				//�տ����кŲ�ѯ
function selectBankInfo(){
				 var url ="<%=request.getContextPath()%>";
				var receBankNum= document.getElementById("receBankNum");//�տ��к�
				var receBankName=document.getElementById("receBankName");//�տ�����
				var cdtrMmbId=document.getElementById("cdtrMmbId");//�������к�
				var receOpenBankNum= document.getElementById("receOpenBankNum");//�����к�
				var receOpenBankName=document.getElementById("receOpenBankName");//��������
				selectkhhBank(url,receBankNum,receBankName,cdtrMmbId,receOpenBankNum,receOpenBankName);
								 
				
				
			}
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skhkhhhh= document.getElementById("receOpenBankNum");
				var skrkhhmc=document.getElementById("receOpenBankName");
				selectBank(url,skhkhhhh,skrkhhmc,"");
			}
			//�����˿�������Ϣ��ѯ
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var fkhkhhhh= document.getElementById("dbtrIssuer");
				var fkrkhhmc=document.getElementById("dbtrIssuerNm");
				selectBank(url,fkhkhhhh,fkrkhhmc,"");
			}
			function selectLoad(){
			 	transferOfClient(temp,'select_input');
				
			}
			 
			 
			 	function zcx(val){
				if(val.value=='Y'){
					$("#handingCharge").val("");//������
					$("#postCharge").val("");//�ʵ��
					$("#otherPlaceCharge").val("");//��ؼ���
					$("#handingCharge").attr("readonly",true);
					$("#postCharge").attr("readonly",true);
					$("#otherPlaceCharge").attr("readonly",true);
					jisuan();
				}else{
					$("#handingCharge").attr("readonly",false);
					$("#postCharge").attr("readonly",false);
					$("#otherPlaceCharge").attr("readonly",false);
				}
			}
 
			function jisuan(){
				var sxf = $("#handingCharge").val();
				var ydf = $("#postCharge").val();
				var ydjs = $("#otherPlaceCharge").val();
				var hkje = $("#moneyNum").val();//�����
			 
				document.getElementById("totalMoney").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje), 2);
			}
			 
			 
			 
			 
	function fmoney(s, n)//������ת���ɶ��ŷָ�����ʽ,������λС��s:value,n:С��λ��      
			{   
			    n = n > 0 && n <= 20 ? n : 2;   
			    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
			    var l = s.split(".")[0].split("").reverse(),   
			    r = s.split(".")[1];   
			    t = "";   
			    for(i = 0; i < l.length; i ++ )   
			    {   
			    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
			    }   
			    return t.split("").reverse().join("") + "." + r;   
			}   
			//��ԭ���   
			function rmoney(s)   
			{   
				var str=/\S/;
				if(!str.test(s)){
					return 0;
				}
				 return parseFloat(s.replace(/[^\d\.-]/g, ""));   
			}
			
			
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
			
				function commitForm(){
				
				
			   var msg = "@";
				var certnum = document.getElementById("certnum");
				var certsize = document.getElementById("certsize");
				var name = document.getElementById("name");
				//var address = document.getElementById("address");
				var phone = document.getElementById("phone");
				 
				var payerNum = document.getElementById("payerNum");
				var receNum = document.getElementById("receNum");
				var receName = document.getElementById("receName");
				var receBankNum = document.getElementById("receBankNum");
				
				
				
				
				var receBankName = document.getElementById("receBankName");
				var receOpenBankNum = document.getElementById("receOpenBankNum");
				var receOpenBankName = document.getElementById("receOpenBankName");
				var moneyClassCode = document.getElementById("moneyClassCode");
				var moneyNum = document.getElementById("moneyNum");
				var totalMoney = document.getElementById("totalMoney");
				var receAccountType = document.getElementById("receAccountType");
				var payAccountType1 = document.getElementById("payAccountType1");
				var fkqshhh  = document.getElementById("fkqshhh");
				var cdtrMmbId  = document.getElementById("cdtrMmbId");
				//msg=isMonNull(moneyNum,msg);
				 if(isNull(trim(cdtrMmbId.value))){
					msg += cdtrMmbId.title+"����Ϊ�գ�@";
				    }
                      if(isNull(trim(fkqshhh.value))){
					msg += fkqshhh.title+"����Ϊ�գ�@";
				    }
				if(isNull(trim(receAccountType.value))){
					msg += receAccountType.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(payAccountType1.value))){
					msg += payAccountType1.title+"����Ϊ�գ�@";
				}

				if(isNull(trim(totalMoney.value))){
					msg += totalMoney.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(receBankName.value))){
					msg += receBankName.title+"����Ϊ�գ�@";
				}
			 
				if(isNull(trim(moneyClassCode.value))){
					msg += moneyClassCode.title+"����Ϊ�գ�@";
				}
				
				if(isNull(trim(receBankNum.value))){
					msg += receBankNum.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(receName.value))){
					msg += receName.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(receNum.value))){
					msg += receNum.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(payerNum.value))){
					msg += payerNum.title+"����Ϊ�գ�@";
				}
				 
				
				 
				if(isNull(trim(name.value))){
					msg += name.title+"����Ϊ�գ�@";
				}
				if(isNull(trim(certsize.value))){
					msg += certsize.title+"����Ϊ�գ�@";
				}
			 
			 
				var boo = msgSplit(msg);
				 
			  	 
	
				if(boo){
				OnSave();
				 document.getElementById("totalMoney").value=rmoney(document.getElementById("totalMoney").value);
				document.getElementById("moneyNum").value=rmoney(document.getElementById("moneyNum").value);//�����
				  document.getElementById("handingCharge").value=rmoney(document.getElementById("handingCharge").value );
				    document.getElementById("postCharge").value=rmoney( document.getElementById("postCharge").value);
				     document.getElementById("otherPlaceCharge").value=rmoney(document.getElementById("otherPlaceCharge").value);
					document.getElementById("dbtramtacctid").value=document.getElementById("payerNum").value;
				     document.getElementById("dbamtnm").value=document.getElementById("name").value;
					open2("<%=request.getContextPath()%>");
					}
				 
		 }
		 
		 function isMonNull(moneyNum,msg){
		 	if(moneyNum.value==''||moneyNum.value==0.00||moneyNum.value==0||moneyNum.value=='0.00'||moneyNum.value=='0'){
		 		msg += moneyNum.title+"����Ϊ�գ�@";
		 		return msg;
		 	}
		 	return "@";
		 }
		 
		 
		 
		 
		 	function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('moneyNum'),
				 	transno:'7123',//ʵʱ����ҵ�� ����ͨ��
				 	pmttp:document.getElementById('businesssizenum'),
				    sxf : document.getElementById('handingCharge'),
				    ydf : document.getElementById('postCharge'),
				    ydjs : document.getElementById('otherPlaceCharge'),
				    ze : document.getElementById('totalMoney'),
				    gbf: document.getElementById('counterfoil'),
				    yxj:'',//���ȼ� 
				    signtype: '02',
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
			
			function clrAmt0(){
				document.getElementById('handingCharge').value="0.00";
				document.getElementById('postCharge').value="0.00";
				document.getElementById('otherPlaceCharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalMoney').value=document.getElementById('moneyNum').value;
			}
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
			
			
			
		</script>
	</head>
	<body onload="sendDate()">
		<form method="post" name="form1"
			action="<%=path%>/transfer/RealTimeCreditAction.do?method=sendCredit">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
		 <input id="cardcrash" name="cardcrash" type="hidden" value="card">
		 <input id="contrperson" name="contrperson" type="hidden" >
		  
		  <input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
		  
		  <input name="dbtramtacctid" id="dbtramtacctid" type="hidden"  title="�ۿ��˺�" maxlength="32"  /> 
		 <input name="dbamtnm" id="dbamtnm" type="hidden"	title="�ۿ��" maxlength="60" />
		  
		  
		  
		  
		  
		  
		  
		  
		  
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
						                  	<div  class="text_title"><span class="text_blue2">���˿��ۿ���ͨ��</span></div>
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
																	<!--   �˵��˱�ʶ��-->
																</td>
																<td >
																	<input name="endtoendid" id="dddbsh" type="hidden" value="feidiao"
																		maxlength="19" title="�˵��˱�ʶ��"  />
																
																	<!-- <span  class="STYLE1">*</span>-->
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	ҵ�����ͱ���
																</td>
																<td>
																	<select  name="po.businesssizenum" id="businesssizenum" style="width:180px;" title="ҵ�����ͱ���">
																<option value="C102"  selected="selected">���˴���ͨ��ҵ��</option>
																 
																 
																</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	ҵ���������
																</td>
																<td >
																	<select  name="po.businessClassCode" id="businessClassCode" style="width:180px;" title="ҵ���������">
																	<option value="03302"  selected="selected">ת��</option>
															
																</select>
																	<span  class="STYLE1">*</span>
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
																	<input name="po.payerNum" id="payerNum" type="text"onblur="PubQueryAccount(this.value);clrAmt();"
																		 title="�������˺�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	����������
																</td>
																<td>
																	<input name="po.dbtrNm" id="name" type="text" readonly="readonly"
																		title="����������" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                         <tr>
															<td class="text_tablehead_b"  >
																	֤������
																</td>
																<td>
																<input name="po.certsize" id="certsize1" type="hidden"  readonly="readonly"/>
																		<select   name="po.certsize" disabled="disabled" id="certsize">
																		<option value="01">
																			���֤
																		</option>
																		<option value="02">
																			����֤
																		</option>
																		<option value="03">
																			ѧ��֤
																		</option>
																	
																	</select>
																 
																</td>
															
																<td class="text_tablehead_b" >
																	������֤����
																</td>
																<td >
																	<input name="po.certnum" id="certnum" type="text" size="19" readonly="readonly"
																		maxlength="32" title="������֤����" onblur="checkIdcard(this.value,'certnum')" /> 
															 		</td>
															</tr>
																<tr>
																	
															
																<td class="text_tablehead_b" >
																	��������ϵ�绰
																</td>
																<td>
																	<input  name="po.phone" id="phone" type="text" readonly="readonly"
																		 maxlength="20" title="��������ϵ�绰" />  
																		 <input type="hidden" readonly="readonly" name="po.proposerAcctCcy" title="�������˻�����" id="proposerAcctCcy" value="CNY">
																		   <input type="hidden"  maxlength="30" name="po.proposerCstmrId" readonly="hidden" title="�����˿ͻ���" id="proposerCstmrId">
																</td>
																
																<td class="text_tablehead_b" >
																	�������˻�����
																</td>
																<td>
																<input type="hidden"  maxlength="30" name="po.payAccountType" id="payAccountType1" readonly="readonly"/>
																		 <select  name="po.payAccountType" title="�������˻�����" id="payAccountType" disabled="disabled">
																	 		 <option value="" >��ѡ��</option>	
																		  <option value="AT01">���˴��ǿ��˻�</option>
																		   <option value="AT02">���˽�ǿ��˻�</option>
																		 </select>
																		 <span  class="STYLE1">*</span>
																</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	<!-- �������к� -->
																</td>
																<td>
																	<input name="po.dbtrbrchid" id="fkhhh" type="hidden" readonly="readonly"
																		 title="�������к�"  maxlength="12"  value="${bankInfo.bankcode }"
																		onKeyPress="actkeyPress()" />
																<!-- 	<span  class="STYLE1">*</span> -->
																</td>
																<td class="text_tablehead_b">
																<!-- 	���������� -->
																</td>
																<td>
																	<input name="po.dbtrbrnchnm" id="fkhmc" type="hidden" title="����������" value="${bankInfo.participantname }"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<!-- 	<span  class="STYLE1">*</span>-->
																</td>
                                                  			</tr>
                                                  		<tr>
																<td class="text_tablehead_b" >
																	�����˿ͻ���
																</td>
																<td >
																	 <input type="text"  maxlength="30" name="po.proposerCstmrId" readonly="readonly" title="�����˿ͻ���" id="proposerCstmrId">
																</td>
																</tr>
																<tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�����˵�ַ
																</td>
																<td colspan="3">
																	<input name="po.address" id="address" class="text_tablehead_b_addr"  readonly="readonly"
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'��ʾ��','address')"/>
																
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	<!--�����˿������к�-->
																</td>
																<td>
																	<input name="po.dbtrIssuer" id="dbtrIssuer" type="hidden" class="text_tablehead_b_c"
																		 title="�����˿������к�" maxlength="12"   readonly="readonly"  
																		 value="${bankInfo.bankcode }"
																		onKeyPress="actkeyPress()" />
																		<!--<input type="button" class="button"   value="����" onclick="selectBankInfoOfFkk()">-->
																		
																</td>
																<td class="text_tablehead_b">
																<!--�����˿���������-->
																</td>
																<td>

																	<input name="po.dbtrIssuerNm" id="dbtrIssuerNm" type="hidden" title="�����˿���������"
																		  maxlength="60" readonly="readonly" value="${bankInfo.participantname }"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	<!-- �����������к�-->
																</td>
																<td>
																	<input name="dbtrmmbid" id="fkqshhh" type="hidden" readonly="readonly"
																		 title="�����������к�" maxlength="12" value="${bankInfo.directbankcode }"
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
																	<input name="po.receNum" id="receNum" type="text" onblur="queryBypaymentGroupNum(this.value)"
																		 title="�տ����˺�" maxlength="32"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="po.receName" id="receName" type="text"
																		title="�տ�������" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															
															<tr>
																
																<td class="text_tablehead_b" >
																	�տ��˵�ַ
																</td>
																<td colspan="3">
																	<input type="text" class="text_tablehead_b_addr"    name="po.receAddress" id="receAddress" 
																		onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'��ʾ��','receAddress')" />
																	
																</td>
															</tr>
															<tr>
																
																
																 <td class="text_tablehead_b" >
																	�տ����˻�����
																</td>
																<td>
																		 <select  name="po.receAccountType"  title="�տ����˻�����" id="receAccountType">
																		  <option  value="">��ѡ��</option>
																		  <option value="AT01">���˴��ǿ��˻�</option>
																		   <option value="AT02">���˽�ǿ��˻�</option>
																		 </select>
																		 <span  class="STYLE1">*</span> 
																</td>
																<td class="text_tablehead_b">
																	�տ��������к�
																</td>
																<td>
																	<input name="po.cdtrMmbId" id="cdtrMmbId" type="text" readonly="readonly"
																		title="�տ��������к�" maxlength="12" 
																		 onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	�տ����к�
																</td>
																<td>
																	<input name="po.receBankNum" id="receBankNum" type="text" class="text_tablehead_b_c"
																		 title="�տ����к�" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<input type="button" class="button"  value="����" onclick="selectBankInfo()">
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="po.receBankName" id="receBankName" type="text"
																		style="width: 180px;" title="�տ�������" maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	<!--�տ��˿������к�-->
																</td>
																<td>
																	<input name="po.receOpenBankNum" id="receOpenBankNum" type="hidden" class="text_tablehead_b_c"
																		 title="�տ��п������к�" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<!--<input type="button" class="button"  value="����" onclick="selectBankInfoOfSkk()">-->	
																</td>
															
																<td class="text_tablehead_b">
																	<!--�տ��˿���������-->
																</td>
																<td>
																	<input name="po.receOpenBankName" id="receOpenBankName" type="hidden" readonly="readonly"
																		title="�տ��˿���������" maxlength="60"
																		onKeyPress="actkeyPress()" />
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
																		 title="�ܶ�" maxlength="12"/>
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
																		title="������" maxlength="12"  readonly="readonly"/>
																
																</td><td class="text_tablehead_b" >
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
																		title="�ʵ��" maxlength="12" readonly="readonly" />
																
																</td>
																<td class="text_tablehead_b" >
																	��ؼ���
																</td>
																<td colspan="4">
																	<input name="po.otherPlaceCharge" id="otherPlaceCharge" type="text" 
																		title="��ؼ���" maxlength="12"  readonly="readonly" />
																
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
                                                   <!-- 
                                                    <div class="table_content">
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
                                                    	</div>-->
                                                   <!--  
                                                    <div class="table_content">
                                                    
                                                  	
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��ע��Ϣ</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																	��ע
																</td>
																<td colspan="3">
																	<textarea name="po.remark" id="remark" 
																		rows="2" cols="100" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','fy')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    </div>
                                                    -->
                                                    
                                                    
                                           <div class="table_content">
                                                    <table>  
                                              <tr >
                                         	 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center"><font color=red>˵������ɫ*��ע��Ϊ������</font></td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>                    
                                                   <tr >
                                          
                                             
										 <td style="width:40%;">
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
