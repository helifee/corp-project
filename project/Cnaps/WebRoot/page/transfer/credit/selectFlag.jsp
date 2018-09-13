<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>定期贷记业务明细建立</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>

<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript">
function queryDelete(url){

	document.forms[0].action=getRootPath()+url;
	document.forms[0].submit();
	
}
function nullsubmit1()
{
	 
		this.document.forms[0].submit();
	 
}
	function ch_cxtj(obj){
		
		if(obj.value == "zfjyzh"){
			this.document.getElementById("zfjyzh_td").style.display="";
			this.document.getElementById("qt_td").style.display="none";
			var tmp = this.document.getElementById("qt_td").all;
			for(var i=0;i<tmp.length;i++){
				tmp.item(i).value="";
			}
		}else{
			this.document.getElementById("qt_td").style.display="";
			this.document.getElementById("zfjyzh_td").style.display="none";
			var tmp = this.document.getElementById("zfjyzh_td").all;
			for(var i=0;i<tmp.length;i++){
				tmp.item(i).value="";
			}
		}
	}
	function dis_cxtj(){
 
		var obj = this.document.getElementById('cxtj').all;
		for(var i=0;i<obj.length;i++){
			if(obj.item(i).name == 'cxtjflag' && obj.item(i).value == 'zfjyzh'){
				this.document.getElementById('zfjyzh_td').style.display="";
				this.document.getElementById('qt_td').style.display="none";
				break;
			}else{
				this.document.getElementById('zfjyzh_td').style.display="none";
				this.document.getElementById('qt_td').style.display="";
				break;
			}
		}
	}
	function addView(){
	
	var url = getRootPath()+"/page/transfer/credit/inputParentDetail.jsp";
	
 	var i = createWin("wind","新增",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/transfer/RegularCreditAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}

	function repairView(path){
	
	var url = getRootPath()+path;
	//alert(url);
 	var i = createWin("wind","明细查看",url);
 	i.on("beforedestroy",function(){
	 		window.location.href=getRootPath()
				+ "/transfer/RegularCreditAction.do?method=queryList";
			return true;
	 	});
 	i.show();
}
//支付组号，明细笔数，累计录入金额,                                申请人证件号,
function closetmp(paymentGroupNum,totalentry,totalentryMoney,certnum,businessSizeCode,phone,address,name,payerAcount,dbtrBrnchId,dbtrBrnchNm){
   var sel = window.parent.document.getElementById("businessSizeCode");
		sel.options.length=0; 
		  if(businessSizeCode== "E100"){
		  var opt =window.parent.document.createElement('option');
						opt.setAttribute('value',"E100");
						opt.innerText = "普通定期贷记业务";
						sel.appendChild(opt);
		  }
		 if(businessSizeCode== "C210"){
		  var opt =window.parent.document.createElement('option');
						opt.setAttribute('value',"C210");
						opt.innerText = "薪金报酬";
						sel.appendChild(opt);
		  }
		  if(businessSizeCode== "A101"){
		  var opt =window.parent.document.createElement('option');
						opt.setAttribute('value',"A101");
						opt.innerText = "公益性资金汇划";
						sel.appendChild(opt);
		  }
		window.parent.document.getElementById("paymentGroupNum").value=paymentGroupNum;
		window.parent.document.getElementById("paymentGroupNum").focus();
		window.parent.document.getElementById("totalentry").value=totalentry;
		window.parent.document.getElementById("totalentryMoney").value=totalentryMoney;
		window.parent.document.getElementById("certnum").value=certnum;
		window.parent.document.getElementById("phone").value=phone;
		window.parent.document.getElementById("address").value=address;
		window.parent.document.getElementById("payName").value=name;
		window.parent.document.getElementById("payerAcount").value=payerAcount;
		window.parent.document.getElementById("payBankNum").value=dbtrBrnchId;//付款 行行号
		window.parent.document.getElementById("payBankName").value=dbtrBrnchNm;//付款 行名称
		window.parent.closetmpwin();
	}

</script>

</head>
<body  >

 










<html:form method="post" action="/transfer/RegularCreditAction.do?method=queryList&syspara=cx">
<input id="repeatmark" type="hidden" value="0">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
								<h5 align="left">&nbsp;</h5>
							</td>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
  <tr valign="top">
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
             <table width="95%"  border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td  >
                  	<div class="text_title"><span class="text_blue2">查询条件</span></div>
                 </td>
                </tr>
              </table>
			 <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
               <tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                <tr>
                <%--  
                  <td id="cxtj" class="text_tablehead_b" >
	                				 
	                					<html:select property="cxtjflag" onchange="ch_cxtj(this)">
	                						<html:option value="zfjyzh">支付交易组号</html:option>
	                						<html:option value="qt">其他</html:option>
	                					</html:select>
	                					
				                    </td>
				                    --%>
              		<td class="text_tablehead_b">支付交易组号</td>
             		 <td id="zfjyzh_td" >
				                  		<html:text property="po.paymentGroupNum" maxlength="20" />
				                  	</td>
              		<td class="text_tablehead_b">付款人账号</td>
                   <td id="qt_td" >
				                  		<html:text property="po.payerAcount" maxlength="32" />
				   </td>
				  
			           </tr>
			           
			           <tr>     
			           <td class="text_tablehead_b"  colspan="3">&nbsp;</td>   		
				                    <td >
				                  		<input name="query" type="button" class="button" value="查 询"  onclick="nullsubmit1()"/>
				                  		 
				                  	</td> 
				                  	 <td  >&nbsp;</td> 
                </tr>  
                <tr><td colspan="6">&nbsp;</td></tr>          
              </table>
              <table width="761" height="23" border="0" cellpadding="0" cellspacing="0">
                <tr >
                <td width="41"   ></td>
                <td width="41" align="center"></td>
                <td width="414" ><div align="right">
                </div></td>
                </tr>
              </table>
              
              <table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr>
                  <td  class="text_listhead">小额支付交易组号</td>
                  <td  class="text_listhead">付款人账号</td>
                  <td  class="text_listhead">累计录入笔数</td>
                   <td  class="text_listhead">累计录入金额</td>
                   
                </tr>
                <logic:present name="queryList">
                <logic:iterate id="pot" name="queryList">
                 <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6" 
                 onclick="closetmp('${pot.paymentGroupNum}','${pot.totalentry}','${pot.totalentryMoney}','${pot.certnum}','${pot.businessSizeCode}',
										  '${pot.phone}','${pot.address}','${pot.name}','${pot.payerAcount}','${pot.dbtrBrnchId}','${pot.dbtrBrnchNm}')"> 
              
            
										  	
							          
                  
                  <td  class="text_list"><div class="gridCell_standard">${pot.paymentGroupNum}</td>
							                  <td  class="text_list">${pot.payerAcount}</td>
							                  <td  class="text_list">${pot.totalentry}</td>
							                  <td  class="text_list">${pot.totalentryMoney}</td>
							                 
                   
                 
                </tr>
				</logic:iterate>
                </logic:present>
             </table></td>
        </tr>
		<tr>  
	      <td></td>      
	      <td>
	            <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><jsp:include page="/page/common/Page.jsp"/></td>
        </tr>
      </table>	      </td>
	      <td></td>
	      </tr>
    </table>    </td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	
  </tr>  
</table>
</html:form>
























 





















</body>
</html>
