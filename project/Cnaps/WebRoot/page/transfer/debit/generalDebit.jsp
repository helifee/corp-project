<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean"
	prefix="bean"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html"
	prefix="html"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic"
	prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
		<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
		<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache">
		<META HTTP-EQUIV="Expires" CONTENT="0">
		<title><c:choose>
				<c:when test="${syspara == '0'}">普通借记-总账</c:when>
				<c:when test="${syspara == '1'}">普通借记-转账</c:when>
			</c:choose></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css"
			type="text/css" media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/generalDebitaddRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/generalDebit.js"></script>
		
		<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
		<script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		
		<script type="text/javascript"
			src="<%=path%>/js/common/checkIdCardNo.js"></script>
		
		<script type='text/javascript'
			src='<%=path%>/dwr/interface/PubService.js'></script>

		<script language="javascript">
	

	function OnSave() {
	var userMap = {};
	userMap.accountnumber = document.getElementById("dbtracct").value;
	userMap.accountname = document.getElementById("dbtraddr").value;
	userMap.addr = document.getElementById("cdtraddr").value;
	userMap.issuer =document.getElementById("dbtrissuer").value;
	userMap.issuernm =document.getElementById("dbtrissuernm").value;
	userMap.mmbid =document.getElementById("dbtrmmbid").value;
	
	  PubService.saveOthersBankAccountMsg(userMap, function(){
	  
	  }); 
}
		
		
	//付款人账户
		function queryBypaymentGroupNum(paymentGroupNum){
	 			
   			if(isNull(trim(paymentGroupNum))){
					 return;
			}
			var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
			pop.show();
        	PubService.queryOthersBankAccountMsg(paymentGroupNum,function(obj){
		    pop.close();
			   
				  if(obj==null||obj.accountnumber==null){
				  
				   return;
				  }else{
			 
			  document.getElementById("dbtracct").value=obj.accountnumber;
		      document.getElementById("dbtrnm").value=obj.accountname==null?"": obj.accountname  ;
			  document.getElementById("dbtraddr").value=obj.addr==null?"": obj.addr  ;
			   document.getElementById("dbtrissuer").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("dbtrissuernm").value=obj.issuernm==null?"":obj.issuernm ;	
			  
			   document.getElementById("dbtrbrnchid").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("dbtrbrnchnm").value=obj.issuernm==null?"":obj.issuernm ;	
			   document.getElementById("dbtrmmbid").value=obj.mmbid==null?"":obj.mmbid ;	
		 }
	   	});
}
			
		



//收款人账户
function  PubQueryAccount(paymentGroupNum){
	 	clrAmt();
	 	if(isNull(trim(paymentGroupNum))){
							 return;
					}
					var pop = createPopWin("popid",'系统正处理...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
					pop.show();
					PubService.QueryAccount(paymentGroupNum,function(obj){
					 pop.close();
				
    		 				  if(obj==null||obj.acctid==null){
				 
				  	alert(" 收款人信息查询失败，未查到相关数据" );
				 
				       
				   return;
				  }else{
						      document.getElementById("cdtrnm").value=obj.mm==null?"": obj.mm;//名称
						      document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr;//地址
						      document.getElementById("proposertel").value=obj.tel==null?"": obj.tel;//联系电话
						      document.getElementById("proposercerttp").value=obj.certip==null?"": obj.certip;//证件类型
							  document.getElementById("proposercerttp1").value=obj.certip==null?"": obj.certip;//证件类型
						      document.getElementById("proposercertid").value=obj.certid==null?"": obj.certid;//证件号
						      document.getElementById("proposercstmrid").value=obj.cstmrid==null?"": obj.cstmrid;//付款人客户号
						      document.getElementById("proposeraccttp").value=obj.accttp==null?"": obj.accttp;//付款人客户号
						      document.getElementById("cdtrissuer").value=obj.bankcode==null?"": obj.bankcode;//收款人开户行行号
						      document.getElementById("cdtrissuernm").value=obj.acctissr==null?"": obj.acctissr;//收款人开户行名称
		 }
	   	});
				
			}

//付款行行号查询
function selectBankInfo(){
				 var url ="<%=request.getContextPath()%>";
				var dbtrbrnchid= document.getElementById("dbtrbrnchid");
				var dbtrbrnchnm=document.getElementById("dbtrbrnchnm");
				var dbtrmmbid=document.getElementById("dbtrmmbid");
				var dbtrissuer= document.getElementById("dbtrissuer");
				var dbtrissuernm=document.getElementById("dbtrissuernm");
				selectkhhBank(url,dbtrbrnchid,dbtrbrnchnm,dbtrmmbid,dbtrissuer,dbtrissuernm);
								 
				
				
			}
			 		//付款人开户行行号查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var payOpenBankNum= document.getElementById("dbtrissuer");
				var payOpenBankName=document.getElementById("dbtrissuernm");
				selectBank(url,payOpenBankNum,payOpenBankName,"");
			}
			//收款人开户行行号查询
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var cdtrissuer= document.getElementById("cdtrissuer");
				var cdtrissuernm=document.getElementById("cdtrissuernm");
				selectBank(url,cdtrissuer,cdtrissuernm,"");
			}
		
	
	
			  function zcx(val){
				if(val.value=='Y'){
					$("#servicecharge").val("");//手续费
					$("#postage").val("");//邮电费
					$("#outstationcharge").val("");//异地加收
					//$("#agncycharge").val("");//代理行手续费
					$("#servicecharge").attr("readonly",true);
					$("#postage").attr("readonly",true);
					$("#outstationcharge").attr("readonly",true);
					//$("#agncycharge").attr("readonly",true);
					jisuan();
				}else{
				 $("#servicecharge").attr("readonly",false);
					$("#postage").attr("readonly",false);
					$("#outstationcharge").attr("readonly",false);
					//$("#agncycharge").attr("readonly",false);
				 
				}
			}
			
				function arrayIsNull(arrObj){
					var flag=false;
					for(var i=0;i<arrObj.length;i++){
						if(isNull(trim(arrObj[i].value))){
							flag=true;
						}
					}
					return flag;
				}
			
				function commitForm(){
				
			   var msg = "@";
				
		              
		             var rcptltd = document.getElementById("rcptltd");
		             var dbtracct= document.getElementById("dbtracct");
		             var dbtrnm= document.getElementById("dbtrnm");
		             
		             var dbtrbrnchid= document.getElementById("dbtrbrnchid");
		              
		             
                    var cdtracct= document.getElementById("cdtracct");
                    var cdtrissuer= document.getElementById("cdtrissuer");
                    
				 
                   
                    var amount  = document.getElementById("amount");
					 
					  if(isNull(trim(amount.value))){
					msg += amount.title+"不能为空！@";
				    }
					 if(isNull(trim(cdtrissuer.value))){
					msg += cdtrissuer.title+"不能为空！@";
				    }
					 
					if(isNull(trim(cdtracct.value))){
					msg += cdtracct.title+"不能为空！@";
				    }
					 
					 
					 if(isNull(trim(dbtrbrnchid.value))){
					msg += dbtrbrnchid.title+"不能为空！@";
				    } 
					 
					 if(isNull(trim(dbtrnm.value))){
					msg += dbtrnm.title+"不能为空！@";
				    }  
					 
					 if(isNull(trim(dbtracct.value))){
					msg += dbtracct.title+"不能为空！@";
				    } 
					 if(isNull(trim(rcptltd.value))){
					msg += rcptltd.title+"不能为空！@";
				    }
				    
				    var gk_dtlsmmryamt=document.getElementById("gk_dtlsmmryamt"); //明细汇总金额
				    var gk_rprtcd=document.getElementById("gk_rprtcd"); //上报国库代码
				    var gk_flowno=document.getElementById("gk_flowno"); //信息流水号
				    var gk_RcvCd=document.getElementById("gk_RcvCd"); //接收国库代码
				    var gk_rprtforms=document.getElementById("gk_rprtforms"); //报表日期
				    var gk_rprtnum=document.getElementById("gk_rprtnum"); //报表序号
				    var gk_budgetlevel=document.getElementById("gk_budgetlevel"); //预算级次
				    var gk_indicator=document.getElementById("gk_indicator"); //调整期标志
				    var gk_budgettp=document.getElementById("gk_budgettp"); //预算种类
				    var gk_numoftrnsctns=document.getElementById("gk_numoftrnsctns"); //明细条数
				    var gk_typecds=document.getElementsByName("po.gk_typecd"); 
				    var gk_sbjctcds=document.getElementsByName("po.gk_sbjctcd"); 
				    var gk_occrrdamts=document.getElementsByName("po.gk_occrrdamt"); 
				    var pmttp=document.getElementById("pmttp").value;
				   
				    if(pmttp=="B104"){
					    if(isNull(trim(gk_rprtcd.value))){
						msg += "上报国库代码不能为空！@";
					    }
					     if(isNull(trim(gk_flowno.value))){
						msg += "信息流水号不能为空！@";
					    }
					    if(isNull(trim(gk_RcvCd.value))){
						msg += "接收国库代码不能为空！@";
					    }
					    if(isNull(trim(gk_rprtforms.value))){
						msg += "报表日期不能为空！@";
					    }
					    if(isNull(trim(gk_rprtnum.value))){
						msg += "报表序号不能为空！@";
					    }
					    if(isNull(trim(gk_budgetlevel.value))){
						msg += "预算级次不能为空！@";
					    }
					    if(isNull(trim(gk_indicator.value))){
						msg += "调整期标志不能为空！@";
					    }
					    if(isNull(trim(gk_budgettp.value))){
						msg += "预算种类不能为空！@";
					    }
					    if(isNull(trim(gk_numoftrnsctns.value))){
						msg += "明细条数不能为空！@";
					    }
					    if(arrayIsNull(gk_typecds)){
					    	msg += "征收机关大类代码不能为空！@";
					    }
					    if(arrayIsNull(gk_sbjctcds)){
					    	msg += "预算科目代码不能为空！@";
					    }
					    if(arrayIsNull(gk_occrrdamts)){
					    	msg += "发生额不能为空！@";
					    }
				    }
				    
				    var gz_dtlsmmryamt=document.getElementById("gz_dtlsmmryamt"); //明细汇总金额
				    var gz_rprtcd=document.getElementById("gz_rprtcd"); //上报国库代码
				    var gz_flowno=document.getElementById("gz_flowno"); //信息流水号
				    var gz_rcvcd=document.getElementById("gz_rcvcd"); //接收国库代码
				    var gz_rprtforms=document.getElementById("gz_rprtforms"); //报表日期
				    var gz_rprtnum=document.getElementById("gz_rprtnum"); //报表序号
				    var gz_numoftrnsctns=document.getElementById("gz_numoftrnsctns"); //明细条数
				    
				    var gz_typecds=document.getElementsByName("po.gz_typecd"); 
				    var gz_cptlcds=document.getElementsByName("po.gz_cptlcd"); 
				    var gz_cptlamts=document.getElementsByName("po.gz_cptlamt"); 
				    var gz_accrlcds=document.getElementsByName("po.gz_accrlcd"); 
				    var gz_accrlamts=document.getElementsByName("po.gz_accrlamt"); 
				    
				    if(pmttp=="B307"){
				    	if(isNull(trim(gz_dtlsmmryamt.value))){
						msg += "明细汇总金额不能为空！@";
					    }
					    if(isNull(trim(gz_rprtcd.value))){
						msg += "上报国库代码不能为空！@";
					    }
					    if(isNull(trim(gz_flowno.value))){
						msg += "信息流水号不能为空！@";
					    }
					    if(isNull(trim(gz_rcvcd.value))){
						msg += "接收国库代码不能为空！@";
					    }
					    if(isNull(trim(gz_rprtforms.value))){
						msg += "报表日期不能为空！@";
					    }
					    if(isNull(trim(gz_rprtnum.value))){
						msg += "报表序号不能为空！@";
					    }
					    if(isNull(trim(gz_numoftrnsctns.value))){
						msg += "明细条数不能为空！@";
					    }
					     if(arrayIsNull(gz_typecds)){
					    	msg += "兑付国债银行大类不能为空！@";
					    }
					     if(arrayIsNull(gz_cptlcds)){
					    	msg += "本金代码不能为空！@";
					    }
					     if(arrayIsNull(gz_cptlamts)){
					    	msg += "本金金额不能为空！@";
					    }
					     if(arrayIsNull(gz_accrlcds)){
					    	msg += "利息代码不能为空！@";
					    }
					     if(arrayIsNull(gz_accrlamts)){
					    	msg += "利息金额不能为空！@";
					    }
					    
				    }
				    
				    

				
				
				var boo = msgSplit(msg);
				if(boo){
					 OnSave();
			    	 document.getElementById("servicecharge").value=rmoney(document.getElementById("servicecharge").value);
				    document.getElementById("postage").value=rmoney(document.getElementById("postage").value);//汇款金额
				     document.getElementById("counterfoil").value=rmoney(document.getElementById("counterfoil").value) ;
				     document.getElementById("gk_dtlsmmryamt").value=rmoney(document.getElementById("gk_dtlsmmryamt").value);//明细总金额
				     document.getElementById("gz_dtlsmmryamt").value=rmoney(document.getElementById("gz_dtlsmmryamt").value);//明细总金额
				     var gk_occrrdamts=document.getElementsByName("po.gk_occrrdamt");
				     for(var i=0;i<gk_occrrdamts.length;i++){
				     	gk_occrrdamts[i].value=rmoney(gk_occrrdamts[i].value);
				     }
				     var gz_cptlamts=document.getElementsByName("po.gz_cptlamt");
				     for(var i=0;i<gz_cptlamts.length;i++){
				     	gz_cptlamts[i].value=rmoney(gz_cptlamts[i].value);
				     }
				     var gz_accrlamts=document.getElementsByName("po.gz_accrlamt");
				     for(var i=0;i<gz_accrlamts.length;i++){
				     	gz_accrlamts[i].value=rmoney(gz_accrlamts[i].value);
				     }
				    
				  
				   // document.getElementById("agncycharge").value=rmoney(agncycharge.value);
				    document.getElementById("outstationcharge").value=rmoney(document.getElementById("outstationcharge").value);
				     document.getElementById("amount").value=rmoney(document.getElementById("amount").value);
				    if(document.getElementById("waiven").checked!=""){
					open3("<%=request.getContextPath()%>");
				}
				else{
					document.forms[0].submit();
				}
					//document.forms[0].submit();
					 
				}
		 }
		 
		 
			
		 function jisuan(){
				var sxf = document.getElementById("servicecharge").value; 
				var ydf = document.getElementById("postage").value;
				var ydjs =document.getElementById("outstationcharge").value;
				var gbf = document.getElementById("outstationcharge").value;  
				var hkje = document.getElementById("amount").value;  
				var n=0;
				var aa=document.getElementById('pmttp').value;
				
				if(aa=='B104'){
					var amts = document.getElementsByName("po.gk_occrrdamt");
					
					for(var i=0;i<amts.length;i++){
					   n+=parseFloat(rmoney(amts[i].value));
					}
					
						document.getElementById("amount").value=fmoney(n,2);
						document.getElementById("gk_dtlsmmryamt").value=fmoney(n,2);
						document.getElementById("totalamt").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(gbf)+n, 2);
				}else if(aa=='B307'){
					var amts = document.getElementsByName("po.gz_cptlamt");
					for(var i=0;i<amts.length;i++){
					   n+=parseFloat(rmoney(amts[i].value));
					}
					var amts1 = document.getElementsByName("po.gz_accrlamt");
					for(var i=0;i<amts1.length;i++){
					   n+=parseFloat(rmoney(amts1[i].value));
					}
					
						document.getElementById("amount").value=fmoney(n,2);
						document.getElementById("gz_dtlsmmryamt").value=fmoney(n,2);
						document.getElementById("totalamt").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(gbf)+n, 2);
				}else{
						document.getElementById("totalamt").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(gbf)+rmoney(hkje)+n, 2);
				}
		}
			
		 
		 function addchange(paymentGroupNum){
		  		jisuan();
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('amount'),
				 	transno:'7127',
				 	pmttp:document.getElementById('pmttp'),
				    sxf : document.getElementById('servicecharge'),
				    ydf : document.getElementById('postage'),
				    ydjs : document.getElementById('outstationcharge'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('totalamt'),
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
			function funpmttp(flag){
				if(flag=='B104'){//国库资金借记划拨
					document.getElementById("amount").readOnly="readonly";
					document.getElementById("gkzjjjhbdetails").style.display="block";
					document.getElementById("gkzjgzdfjjhbdetails").style.display="none";
				}else if(flag=='B307'){//国库资金国债兑付借记划拨
					document.getElementById("gkzjjjhbdetails").style.display="none";
					document.getElementById("gkzjgzdfjjhbdetails").style.display="block";
					document.getElementById("amount").readOnly="readonly";
				}else{
					document.getElementById("amount").readOnly="";
					document.getElementById("gkzjjjhbdetails").style.display="none";
					document.getElementById("gkzjgzdfjjhbdetails").style.display="none";
				}
				clrContent();
			}
			function clrAmt0(){
				document.getElementById('servicecharge').value="0.00";
				document.getElementById('postage').value="0.00";
				document.getElementById('outstationcharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalamt').value=document.getElementById('amount').value;
			}
			function clrAmt(){
				document.getElementById('amount').value="";
				document.getElementById('servicecharge').value="0.00";
				document.getElementById('postage').value="0.00";
				document.getElementById('outstationcharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalamt').value="";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
				
			}
			function clrContent(){
				var flag = document.getElementById('pmttp').value;
				clrAmt();
				if(flag=='B307'){
					
					document.getElementById("gk_dtlsmmryamt").value=""; //明细汇总金额
				   document.getElementById("gk_rprtcd").value=""; //上报国库代码
				   document.getElementById("gk_flowno").value=""; //信息流水号
				   document.getElementById("gk_RcvCd").value=""; //接收国库代码
				   document.getElementById("gk_rprtforms").value=""; //报表日期
				   document.getElementById("gk_rprtnum").value=""; //报表序号
				  document.getElementById("gk_budgetlevel").value=""; //预算级次
				  document.getElementById("gk_indicator").value=""; //调整期标志
				   document.getElementById("gk_budgettp").value=""; //预算种类
				  	var typecd = document.getElementsByName("po.gk_typecd");
					for(var i=0;i<typecd.length;i++){
						typecd[i].value="";
					}
					
					var sbjctcd = document.getElementsByName("po.gk_sbjctcd");
					for(var i=0;i<sbjctcd.length;i++){
						sbjctcd[i].value="";
					}
					var occrrdamt = document.getElementsByName("po.gk_occrrdamt");
					for(var i=0;i<occrrdamt.length;i++){
						occrrdamt[i].value="";
					}
				   
				}else if(flag=='B104'){
				  document.getElementById("gz_dtlsmmryamt").value="0.00"; //明细汇总金额
				  document.getElementById("gz_rprtcd").value=""; //上报国库代码
				  document.getElementById("gz_flowno").value=""; //信息流水号
				  document.getElementById("gz_rcvcd").value=""; //接收国库代码
				  document.getElementById("gz_rprtforms").value=""; //报表日期
				  document.getElementById("gz_rprtnum").value=""; //报表序号
				  var cptlcd = document.getElementsByName("po.gz_cptlcd");
					for(var i=0;i<cptlcd.length;i++){
						cptlcd[i].value="";
					}
					
					var cptlamt = document.getElementsByName("po.gz_cptlamt");
					for(var i=0;i<cptlamt.length;i++){
						cptlamt[i].value="";
					}
					var accrlcd = document.getElementsByName("po.gz_accrlcd");
					for(var i=0;i<accrlcd.length;i++){
						accrlcd[i].value="";
					}
					var accrlamt = document.getElementsByName("po.gz_accrlamt");
					for(var i=0;i<accrlamt.length;i++){
						accrlamt[i].value="";
					}
				}else{
					document.getElementById("gk_dtlsmmryamt").value=""; //明细汇总金额
					   document.getElementById("gk_rprtcd").value=""; //上报国库代码
					   document.getElementById("gk_flowno").value=""; //信息流水号
					   document.getElementById("gk_RcvCd").value=""; //接收国库代码
					   document.getElementById("gk_rprtforms").value=""; //报表日期
					   document.getElementById("gk_rprtnum").value=""; //报表序号
					  document.getElementById("gk_budgetlevel").value=""; //预算级次
					  document.getElementById("gk_indicator").value=""; //调整期标志
					   document.getElementById("gk_budgettp").value=""; //预算种类
					   document.getElementById("gz_dtlsmmryamt").value="0.00"; //明细汇总金额
					  document.getElementById("gz_rprtcd").value=""; //上报国库代码
					  document.getElementById("gz_flowno").value=""; //信息流水号
					  document.getElementById("gz_rcvcd").value=""; //接收国库代码
					  document.getElementById("gz_rprtforms").value=""; //报表日期
					  document.getElementById("gz_rprtnum").value=""; //报表序号
					  var typecd = document.getElementsByName("po.gk_typecd");
					for(var i=0;i<typecd.length;i++){
						typecd[i].value="";
					}
					
					var sbjctcd = document.getElementsByName("po.gk_sbjctcd");
					for(var i=0;i<sbjctcd.length;i++){
						sbjctcd[i].value="";
					}
					var occrrdamt = document.getElementsByName("po.gk_occrrdamt");
					for(var i=0;i<occrrdamt.length;i++){
						occrrdamt[i].value="";
					}
					 var cptlcd = document.getElementsByName("po.gz_cptlcd");
					for(var i=0;i<cptlcd.length;i++){
						cptlcd[i].value="";
					}
					
					var cptlamt = document.getElementsByName("po.gz_cptlamt");
					for(var i=0;i<cptlamt.length;i++){
						cptlamt[i].value="";
					}
					var accrlcd = document.getElementsByName("po.gz_accrlcd");
					for(var i=0;i<accrlcd.length;i++){
						accrlcd[i].value="";
					}
					var accrlamt = document.getElementsByName("po.gz_accrlamt");
					for(var i=0;i<accrlamt.length;i++){
						accrlamt[i].value="";
					}
				}
				
			}
			
			function selectLoad(){
				var temp = document.getElementById('pmttp').value;
				transferOfClient(temp,'pmtkd');
			

			}	
			
</script>

	</head>
	<body onload="selectLoad()">
		<html:form method="post" 
			action="/generalDebitAction.do?method=sendMsg">
			<input id="business_name" type="hidden" value="generalDebit">
			<input id="repeatmark" type="hidden" value="0">
			<input type="hidden" name="token" value="${token }" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="bepsgbf" name="bepsgbf" type="hidden" maxlength="19" />
			<input  id="hvpsgbf" name="hvpsgbf" type="hidden" maxlength="19" />
			<input id="contrperson" name="po.warrantyId" type="hidden" ><!-- 授权柜员(手续费) -->
			
			<table id="querybook" width="100%" height="100%" border="0"
				cellpadding="0" cellspacing="0">
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
										<br />
										<table width="689" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td>
													<c:choose>
														<c:when test="${syspara == '0'}">
															<div class="text_title">
																<span class="text_blue2">普通借记-总账</span>
															</div>
														</c:when>
														<c:when test="${syspara == '1'}">
															<div class="text_title">
																<span class="text_blue2">普通借记-转账</span>
															</div>
														</c:when>
													</c:choose>
												</td>
											</tr>
											<tr>
												<td>
													<div class="table_body">

														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">基本信息</span>
																		<c:choose>
																			<c:when test="${syspara == '0'}">
																				<input type="hidden" name="po.signmd" value="04" />
																			</c:when>
																			<c:when test="${syspara == '1'}">
																				<input type="hidden" name="po.signmd" value="03" />
																			</c:when>
																		</c:choose>
																		<input type="hidden" name="po.systemcd" value="BEPS" />
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		支付交易组号
																	</td>
																	<td colspan="4">
																		<input type="text" name="po.pmtgrpid" id="pmtgrpid"
																			readonly="readonly" maxlength="20" value="${transId}" />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		业务类型编码
																	</td>
																	<td>
																		<select name="po.pmttp" id="pmttp"
																			onchange="funpmttp(this.value);selectLoad();" title="业务类型编码">

																			<option value="B100">
																				普通借记业务
																			</option>
																			<option value="B104">
																				国库资金借记划拨
																			</option>
																			<option value="B307">
																				国库资金国债兑付借记划拨
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		业务种类编码
																	</td>
																	<td>
																		<select name="po.pmtkd" id="pmtkd" title="业务种类编码">

																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		合同协议号
																	</td>
																	<td>
																		<input type="text" name="po.agrmtnb" id="agrmtnb"
																			maxlength="60" title="合同协议号" />

																	</td>
																	<td class="text_tablehead_b">
																		回执期限
																	</td>
																	<td>
																		<input type="text" name="po.rcptltd" id="rcptltd"
																			title="回执期限" style="width: 100px" maxlength="2"
																			onkeyup="fun_number(this)" onblur="fun_number(this)" />
																		天
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
															</table>
														</div>


														<div class="table_content">
															<table>
																<tr>
																	<td>
																		<span class="text_tablehead">付款人信息</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		付款人账号
																	</td>
																	<td>
																		<input type="text" name="po.dbtracct" id="dbtracct"
																			maxlength="32" title="付款人账号"
																			onblur="queryBypaymentGroupNum(this.value)" />
																		<font color="#FF0000">*</font>
																	</td>
																	<td class="text_tablehead_b">
																		付款人名称
																	</td>
																	<td>
																		<input type="text" name="po.dbtrnm" id="dbtrnm"
																			maxlength="60" title="付款人名称" />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		付款人地址
																	</td>
																	<td colspan="3">

																		<input name="po.dbtraddr" id="dbtraddr"
																			class="text_tablehead_b_addr"
																			onKeyPress="actkeyPress()"
																			onkeyup="limitLength(value,70,'提示：','dbtraddr')" />
																	</td>
																</tr>
<tr>
																	<td class="text_tablehead_b">
																		付款行行号
																	</td>
																	<td>
																		<input type="text" name="po.dbtrbrnchid" readonly="readonly"
																			id="dbtrbrnchid" maxlength="14" title="付款行行号"
																			style="width: 100px;" />
																		<input type="button" class="button" value="搜索"
																			onclick="selectBankInfo()">
																		<font color="#FF0000">*</font>
																	</td>
																	<td class="text_tablehead_b">
																		付款行名称
																	</td>
																	<td>
																		<input type="text" name="po.dbtrbrnchnm" readonly="readonly"
																			id="dbtrbrnchnm" title="付款行名称" maxlength="60"
																			value="" />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
																
																<tr>
																	<td class="text_tablehead_b">
																		<!--  付款人开户行行号-->
																	</td>
																	<td>
																		<input type="hidden" name="po.dbtrissuer"
																			id="dbtrissuer" maxlength="14" title="付款人开户行行号"
																			style="width: 100px;" />
																	</td>
																	<td class="text_tablehead_b">
																		<!-- 	付款人开户行名称-->
																	</td>
																	<td>
																		<input type="hidden" name="po.dbtrissuernm"
																			id="dbtrissuernm" title="付款人开户行名称" maxlength="60" />
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		<!--付款清算行行号-->
																	</td>
																	<td>
																		<input type="hidden" name="po.dbtrmmbid"
																			id="dbtrmmbid" title="付款清算行行号" maxlength="14"
																			readonly="readonly" />
																		<!--  <font color="#FF0000">*</font>-->
																	</td>
																</tr>
															</table>
														</div>
														<div class="table_content">
															<table>
																<tr>
																	<td>
																		<span class="text_tablehead">收款人信息</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		收款人账号
																	</td>
																	<td>
																		<input type="text" name="po.cdtracct" id="cdtracct"
																			title="收款人账号" maxlength="32"
																			onblur="PubQueryAccount(this.value)" />
																		<font color="#FF0000">*</font>
																	</td>
																	<td class="text_tablehead_b">
																		收款人名称
																	</td>
																	<td>
																		<input type="text" name="po.cdtrnm" id="cdtrnm"
																			title="收款人名称" maxlength="60" readonly="readonly" />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>


																<tr>
																	<td class="text_tablehead_b">
																		证件类型
																	</td>
																	<td>
																	<input name="po.proposercerttp" id="proposercerttp1" type="hidden"  readonly="readonly"/>
																		<select name="po.proposercerttp" id="proposercerttp"
																			title="证件类型" disabled="disabled">
																			<option value="01">
																				身份证
																			</option>
																			<option value="02">
																				军官证
																			</option>
																			<option value="03">
																				学生证
																			</option>
																			<c:if test="${syspara == '0'}">
																			<option value="04">
																				营业执照
																			</option>
																			<option value="05">
																				组织机构代码
																			</option>
																			</c:if>
																		</select>
																	</td>
																	<td class="text_tablehead_b">
																		收款人证件号
																	</td>
																	<td>
																		<input type="text" name="po.proposercertid"
																			id="proposercertid" readonly="readonly"
																			onblur="checkIdCardNo(this.value,'proposercertid')"
																			title="收款人证件号" maxlength="32" />

																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		收款人客户号
																	</td>
																	<td>
																		<input type="text" name="po.proposercstmrid"
																			readonly="readonly" title="收款人客户号"
																			id="proposercstmrid" maxlength="30" />

																	</td>
																	<td class="text_tablehead_b">
																		收款人账户类型
																	</td>
																	<td>
																		<select name="po.proposeraccttp" id="proposeraccttp"
																			title="收款人账户类型" disabled="disabled">
																			<option value="">
																				请选择
																			</option>
																			<option value="AT00">
																				对公账户
																			</option>
																			<option value="AT01">
																				个人贷记卡账户
																			</option>
																			<option value="AT02">
																				个人借记卡
																			</option>
																			<option value="AT03">
																				存折
																			</option>
																			<option value="AT04">
																				其他
																			</option>
																		</select>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		<!-- 收款人账户币种 -->
																	</td>
																	<td>
																		<input type="hidden" name="po.proposeracctccy"
																			id="proposeracctccy" title="收款人账户币种" maxlength="3"
																			value="CNY" readonly />
																	</td>
																	<td>
																	</td>
																	<td>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		<!--  收款行行号 -->
																	</td>
																	<td>
																		<input type="hidden" name="po.cdtrbrnchid"
																			id="cdtrbrnchid" title="收款行行号" maxlength="14"
																			readonly="readonly" value="${bankInfo.bankcode }" />

																	</td>
																	<td class="text_tablehead_b">
																		<!--	收款行名称  -->
																	</td>
																	<td>
																		<input type="hidden" name="po.cdtrbrnchnm"
																			id="cdtrbrnchnm" title="收款行名称" readonly="readonly"
																			maxlength="60" value="${bankInfo.participantname }" />

																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		收款人联系电话
																	</td>
																	<td>
																		<input type="text" name="po.proposertel"
																			readonly="readonly" title="收款人联系电话" id="proposertel"
																			maxlength="20" />
																	</td>
																	
																</tr>


																<tr>

																	<td class="text_tablehead_b">
																		收款人地址
																	</td>
																	<td colspan="3">


																		<input name="po.cdtraddr" id="cdtraddr"
																			class="text_tablehead_b_addr" readonly="readonly"
																			onKeyPress="actkeyPress()"
																			onkeyup="limitLength(value,70,'提示：','cdtraddr')" />

																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		<%-- 收款人开户行行号  --%>
																	</td>
																	<td>
																		<input type="hidden" name="po.cdtrissuer"
																			id="cdtrissuer" maxlength="14" title="收款人开户行行号"
																			readonly="readonly" style="width: 100px;"
																			value="${bankInfo.bankcode }" />
																		<%--
								                   		<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfSkk()"><font color="#FF0000">*</font>
								                   		--%>
																	</td>
																	<td class="text_tablehead_b">
																		<%-- 收款人开户行名称--%>
																	</td>
																	<td>
																		<input type="hidden" name="po.cdtrissuernm"
																			id="cdtrissuernm"
																			value="${bankInfo.participantname }" title="收款人开户行名称"
																			maxlength="60" readonly="readonly" />
																	</td>
																</tr>

																<tr>

																	<td class="text_tablehead_b">
																		<!-- 	收款清算行行号 -->
																	</td>
																	<td>
																		<input type="hidden" name="po.cdtrmmbid"
																			id="cdtrmmbid" title="收款清算行行号"
																			value="${bankInfo.directbankcode }" maxlength="14"
																			readonly="readonly" />

																	</td>
																</tr>
																<tr></tr>
															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td>
																		<span class="text_tablehead">金额信息</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		货币符号
																	</td>
																	<td>
																		<input type="text" name="po.currencycd"
																			id="currencycd" value="CNY" readonly="readonly"
																			maxlength="3" />
																		<font color="#FF0000">*</font>
																	</td>
																	<td class="text_tablehead_b">
																		总额
																	</td>
																	<td>
																		<input type="text" name="po.totalamt" id="totalamt"
																			maxlength="19" readonly="readonly"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		交易金额
																	</td>
																	<td colspan="4">
																		<input type="text" name="po.amount" id="amount"
																			title="交易金额" maxlength="9" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange(); " />
																		<font color="#FF0000">*</font>
																	</td>
																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">计费/渠道信息</span>
																	</td>
																</tr>
																<tr>												  	 
					<td class="text_tablehead_b" >
						收取费用
					</td>
					<td >					
						<input type="radio" class="text_tablehead_b_rad" name="po.waive" id="waivey" value="Y" checked="checked" onclick="addchange('this.value');">收取
						<input type="radio" class="text_tablehead_b_rad" name="po.waive" id="waiven" value="N"  onclick="clrAmt0()">不收取
					</td>
				</tr>
																<tr>
																	<td class="text_tablehead_b">
																		手续费
																	</td>
																	<td>
																		<input type="text" name="po.servicecharge"
																			id="servicecharge" maxlength="19" readonly="readonly" />






																	</td>
																	<td class="text_tablehead_b">
																		渠道信息
																	</td>
																	<td>
																		<input name="systemcd" id="xth" type="hidden"
																			title="系统号" maxlength="12" value="" />
																		<select id="xth1" name="systemcd1" title="系统号"
																			disabled="disabled">
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

																	<td class="text_tablehead_b">
																		邮电费
																	</td>
																	<td>
																		<input type="text" name="po.postage" id="postage"
																			maxlength="19" readonly="readonly" />
																	</td>
																	<td class="text_tablehead_b">
																		异地加收
																	</td>
																	<td>
																		<input type="text" name="po.outstationcharge"
																			id="outstationcharge" maxlength="19"
																			readonly="readonly" />


																	</td>
																	<%--
																	<td class="text_tablehead_b" colspan="2">
																		<!--   代理行手续费-->
																	</td>
																	<td>
																		<input type="text" name="po.agncycharge"
																			id="agncycharge" maxlength="19"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />

																	</td>
 																		--%>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	工本费
																</td>
																<td>
																	<input name="counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="工本费" maxlength="19"  />
																</td>
															</tr>
																
															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td>
																		<span class="text_tablehead">附言信息</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		附言
																	</td>
																	<td colspan="4">
																		<textarea name="po.addtlinf" id="addtlinf" cols="60"
																			rows="3" onKeyPress="charPress()"
																			onkeyup="limitLength(value,256,'提示：','addtlinf')"></textarea>
																	</td>
																</tr>
															</table>
														</div>

														<div class="table_content">
															
															<table>
																<tr>
																	<td>
																		<span class="text_tablehead">附加信息</span>
																	</td>
																</tr>
																<tr>
																	<td colspan="5">
																		<div id="gkzjjjhbdetails" style="display: none;">
																		<table id="gkzjjjhb_mx" border="0" cellpadding="0" cellspacing="0">
																			<tr>
																				<td class="text_tablehead_b">
																					明细汇总金额
																				</td>
																				<td>
																					<input type="text" name="po.gk_dtlsmmryamt"
																						id="gk_dtlsmmryamt" readonly="readonly" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					上报国库代码
																				</td>
																				<td>
																					<input type="text" name="po.gk_rprtcd"
																						id="gk_rprtcd" maxlength="10"
																						 />
																					<font color="#FF0000">*</font>
																				</td>

																			</tr>
																			<tr>

																				<td class="text_tablehead_b">
																					信息流水号
																				</td>
																				<td>
																					<input type="text" name="po.gk_flowno"
																						id="gk_flowno" maxlength="10" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					接收国库代码
																				</td>
																				<td>
																					<input type="text" name="po.gk_rcvcd" id="gk_RcvCd"
																						maxlength="10" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					报表日期
																				</td>
																				<td>
																					<input type="text" name="po.gk_rprtforms"
																						id="gk_rprtforms" readonly="readonly"
																						class="Wdate" onclick="WdatePicker()" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					报表序号
																				</td>
																				<td>
																					<input type="text" name="po.gk_rprtnum"
																						id="gk_rprtnum" maxlength="10"
																						onkeyup="fun_number(this)"
																						onblur="fun_number(this)" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					预算级次
																				</td>
																				<td>
																					<select name="po.gk_budgetlevel"
																						id="gk_budgetlevel">
																						<option value="">
																							请选择
																						</option>
																						<option value="BL00">
																							中央级预算
																						</option>
																						<option value="BL01">
																							省级预算
																						</option>
																					</select>
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					调整期标志
																				</td>
																				<td>
																					<select name="po.gk_indicator" id="gk_indicator">
																						<option value="">
																							请选择
																						</option>
																						<option value="ID00">
																							正常
																						</option>
																						<option value="ID01">
																							调整期
																						</option>
																					</select>
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					预算种类
																				</td>
																				<td>
																					<select name="po.gk_budgettp" id="gk_budgettp">
																						<option value="">
																							请选择
																						</option>
																						<option value="BT00">
																							预算内
																						</option>
																						<option value="BT01">
																							预算外
																						</option>
																					</select>
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					明细条数
																				</td>
																				<td>
																					<input type="text" name="po.gk_numoftrnsctns"
																						id="gk_numoftrnsctns" value="1"
																						readonly="readonly" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b" colspan="2">
																					<input type="button" class="button" value="增  加"
																						onclick="AddRow()" />
																				</td>
																			</tr>
																			<tr>
																				<td colspan="4"></td>
																			</tr>
																			<tr>
																				<td colspan="4">
																					<div align="center">
																						<table id="gkzjjjhb_mxadd">
																							<tr>
																								<td>
																							<tr>

																								<td class="text_tablehead_b">
																									征收机关大类代码
																									<font color="#FF0000">*</font>
																								</td>
																								<td class="text_tablehead_b">
																									预算科目代码
																									<font color="#FF0000">*</font>
																								</td>
																								<td class="text_tablehead_b">
																									发生额
																									<font color="#FF0000">*</font>
																								</td>
																							</tr>
																							<tr>
																								<td>
																								<input type="hidden" value="1"
																									style='width: 90px;' name="po.xh" id="xh"
																									readonly="readonly" />
																									<select name="po.gk_typecd" id="gk_typecd">
																										
																										<option value="1111111111">
																											国税
																										</option>
																										<option value="2222222222">
																											地税
																										</option>
																										<option value="3333333333">
																											海关
																										</option>
																										<option value="4444444444">
																											财政
																										</option>
																										<option value="5555555555">
																											其他
																										</option>
																									</select>
																								</td>
																								<td>
																									<input type="text" name="po.gk_sbjctcd"
																										id="gk_sbjctcd" maxlength="20" />
																								</td>
																								<td>
																									<input type="text" name="po.gk_occrrdamt"
																										id="gk_occrrdamt" maxlength="19"
																										onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; addchange();"  />
																								</td>
																								<td>
																									&nbsp;
																								</td>
																							</tr>

																						</table>
																					</div>
																				</td>
																			</tr>

																		</table>
																		</div>
																		<div id="gkzjgzdfjjhbdetails" style="display: none;">
																		<table id="gz_mx" border="0" cellpadding="0"
																			cellspacing="0">
																			<tr>

																				<td class="text_tablehead_b">
																					明细汇总金额
																				</td>
																				<td>
																					<input type="text" name="po.gz_dtlsmmryamt"
																						id="gz_dtlsmmryamt" readonly="readonly" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					上报国库代码
																				</td>
																				<td>
																					<input type="text" name="po.gz_rprtcd"
																						id="gz_rprtcd" maxlength="10"
																						onkeyup="fun_number(this)"
																						onblur="fun_number(this)" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>

																				<td class="text_tablehead_b">
																					信息流水号
																				</td>
																				<td>
																					<input type="text" name="po.gz_flowno"
																						id="gz_flowno" maxlength="10" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					接收国库代码
																				</td>
																				<td>
																					<input type="text" name="po.gz_rcvcd" id="gz_rcvcd"
																						maxlength="10" onkeyup="fun_number(this)"
																						onblur="fun_number(this)" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					报表日期
																				</td>
																				<td>
																					<input type="text" name="po.gz_rprtforms"
																						id="gz_rprtforms" readonly="readonly"
																						class="Wdate" onclick="WdatePicker()" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b">
																					报表序号
																				</td>
																				<td>
																					<input type="text" name="po.gz_rprtnum"
																						id="gz_rprtnum" maxlength="10"
																						onkeyup="fun_number(this)"
																						onblur="fun_number(this)" />
																					<font color="#FF0000">*</font>
																				</td>
																				<td class="text_tablehead_b">
																					明细条数
																				</td>
																				<td>
																					<input type="text" value="1"
																						name="po.gz_numoftrnsctns" id="gz_numoftrnsctns"
																						readonly="readonly" />
																					<font color="#FF0000">*</font>
																				</td>
																			</tr>
																			<tr>
																				<td class="text_tablehead_b" colspan="4">
																					<div>
																						<input type="button" class="button" value="增  加"
																							onclick="AddRowgz();" />
																				</td>
																			</tr>
																			<tr>
																				<td colspan="4">
																					<table id="gkzjgzdfjjhb_mx" border="0"
																						cellpadding="0" cellspacing="0">
																						<tr  align="center">
																							<td class="text_tablehead_b">
																								兑付国债银行大类
																								<font color="#FF0000">*</font>
																							</td>
																							<td class="text_tablehead_b">
																								本金代码
																								<font color="#FF0000">*</font>
																							</td>
																							<td class="text_tablehead_b">
																								本金金额
																								<font color="#FF0000">*</font>
																							</td>
																							<td class="text_tablehead_b">
																								利息代码
																								<font color="#FF0000">*</font>
																							</td>
																							<td class="text_tablehead_b">
																								利息金额
																								<font color="#FF0000">*</font>
																							</td>
																							<td>
																								&nbsp;
																							</td>
																						</tr>
																						<tr align="center">
																							<td class="text_tablehead_b">
																								<select name="po.gz_typecd" id="gz_typecd"
																									style="width: 140px;">
																									
																									<option value="111111111111">
																										人行
																									</option>
																									<option value="222222222222">
																										工行
																									</option>
																									<option value="333333333333">
																										农行
																									</option>
																									<option value="444444444444">
																										中行
																									</option>
																									<option value="555555555555">
																										建行
																									</option>
																									<option value="666666666666">
																										交行
																									</option>
																									<option value="777777777777">
																										其他
																									</option>
																								</select>
																							</td>
																							<td class="text_tablehead_b">
																								<input type="text" name="po.gz_cptlcd"
																									id="gz_cptlcd" style="width: 90px;"
																									maxlength="12" />
																							</td>
																							<td class="text_tablehead_b">
																								<input type="text" name="po.gz_cptlamt"
																									id="gz_cptlamt" style="width: 90px;"
																									maxlength='19' onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; addchange();" />
																							</td>
																							<td class="text_tablehead_b">
																								<input type="text" name="po.gz_accrlcd"
																									id="gz_accrlcd" style="width: 90px;"
																									maxlength="12" />
																							</td>
																							<td class="text_tablehead_b">
																								<input type="text" name="po.gz_accrlamt"
																									id="gz_accrlamt" style="width: 90px;"
																									maxlength='19' onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; addchange();" />
																							</td>
																							<td class="text_tablehead_b">
																								&nbsp;
																							</td>
																						</tr>
																					</table>
																				</td>
																			</tr>
																		</table>
																		</div>
																		<div id="noaddinfo" style="display: none;">
																		</div>
																	<td>
																</tr>
															</table>
														</div>


														<div class="table_content">
															<table>

																<tr>
																	<td class="text_tablehead_b">
																		&nbsp;
																	</td>
																	<td class="text_tablehead_b">
																		&nbsp;
																	</td>
																	<td>
																		<input id="saveButton" type="button"
																			style="cursor: pointer" class="button" value="保  存"
																			onclick="commitForm();" />
																		<input id="saveButton" type="reset"
																			style="cursor: pointer" class="button" value="重  置" />
																	</td>
																	<td>
																		&nbsp;
																	</td>
																</tr>
															</table>
														</div>
														<div class="table_content" align="center">
															<br />
															<span class="STYLE1">说明：红色*标注项为必填项</span>
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
				</tr>
			</table>
			<br />
			<br />
			<br />
		</html:form>
		
	</body>
</html>
