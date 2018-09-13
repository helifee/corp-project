<%@ page contentType="text/html; charset=GBK" language="java" %>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ page import="com.cnaps.hvps.persistence.messages.Hvpspartyinfo"%>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 大额业务明细对账申请 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript">

	var mxts=0;
	function checkAndSubmit(){
		var flag=true;
		if(this.document.getElementById("InstgPty").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(this.document.getElementById("InstdPty").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(this.document.getElementById("InstgDrctPty").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(this.document.getElementById("InstdDrctPty").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(this.document.getElementById("SystemCd").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(this.document.getElementById("ChckDt").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		var x=this.document.getElementsByName("PmtTp");
		var y=this.document.getElementsByName("PrcSts");
		var index=0;
		while(index<x.length){
			if(x[index].value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
			if(y[index].value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
			index++;
			if(flag==false) break;
		}
		if(flag==true){
			this.document.forms[0].submit();
		}
		else{
			alert("输入要素不完整!");
		}
	}
	
	function addmx(){
				mxts++;
				this.document.getElementById("mxcount").value=mxts;
				var newTr0=this.document.getElementById("ywmxtab").insertRow();
				var newTd0=newTr0.insertCell();
				newTd0.className="text_tablehead_b";
				newTd0.innerHTML="业务类型编码";
				var newTd1=newTr0.insertCell();
				newTd1.innerHTML="<select name='PmtTp'><option value=''>请选择</option>                                           "+
					"<option value='A108' }>现金汇款</option>             "+
					"<option value='A109' }>委托收款(划回)</option>       "+
					"<option value='A110'  }>托收承付(划回)</option>       "+
					"<option value='A101'  }>公益性资金汇划</option>       "+
					"<option value='A102'  }>国库汇款</option>             "+
					"<option value='A104'  }>国库资金贷记划拨</option>     "+
					"<option value='A301'  }>缴费业务</option>             "+
					"<option value='A201'  }>支票</option>                 "+
					"<option value='A100'  }>普通汇兑</option>             "+
					"<option value='A112'  }>外汇清算</option>             "+
					"<option value='A200'  }>行间资金汇划</option>         "+
					"<option value='A113' }>跨境支付</option>             "+
					"<option value='B100'  }>普通借记业务</option>         "+
					"<option value='C102'  }>个人储蓄通存业务</option>     "+
					"<option value='D102'  }>个人储蓄通兑业务</option>     "+
					"<option value='E100'  }>普通定期贷记业务</option>     "+
					"<option value='B308'  }>支票截留</option>             "+
					"<option value='B309'  }>通用票据截留</option></select>";
				
				var newTd2=newTr0.insertCell();
				newTd2.className="text_tablehead_b";
				newTd2.innerHTML="发送、接收标志";
				var newTd3=newTr0.insertCell();
				newTd3.innerHTML="<select name='SndRcvTp' id='SndRcvTp'>"+
			        "<option value='SR00'}>往账/发送</option>"+
				    "<option value='SR01'}>来账/接收</option>"+
				 "</select>";
				var newTd4=newTr0.insertCell();
				newTd4.innerHTML="<input type='button' value='删  除' id='delButton' class='button' onclick='delmx(this);' />";
				var newTr1=this.document.getElementById("ywmxtab").insertRow();
				var newTd5=newTr1.insertCell();
				newTd5.className="text_tablehead_b";
				newTd5.innerHTML="处理状态";
				var newTd6=newTr1.insertCell();
				newTd6.innerHTML=	"<select name='PrcSts'>"+
					"<option value=''>请选择</option>"+
					"<option value='PR04'  }>已清算</option>   "+
					"<option value='PR09'  }>已拒绝</option>   "+
					"<option value='PR08'  }>已撤销</option>   "+
					"<option value='PR09'  }>已拒绝</option>   "+
					"<option value='PR21'  }>已止付</option>   "+
					"<option value='PR22'  }>已冲正</option>   "+
					"<option value='PR32'  }>已超期</option>   "+
					"<option value='PR05'  }>已成功</option>   "+
					"<option value='PR98' }>待确认    </option>"+
					"<option value='PR90' }>新建      </option>"+
					"<option value='PR81' }>待复核    </option>"+
					"<option value='PR92' }>待审核    </option>"+
					"<option value='PR93' }>待审批    </option>"+
					"<option value='PR95' }>待组包    </option>"+
					"<option value='PR96' }>待发送    </option>"+
					"<option value='PR97' }>已发送    </option>"+
					"<option value='PR11' }>已轧差排队</option>"+ 
					"<option value='PR12' }>已清算排队</option>"+ 
					"<option value='PR99' }>故障</option>      "+
					"<option value='PR03' }>已轧差</option>    "+
					"<option value='PR89' }>待回执 </option>   "+
					"<option value='PR88' }>已回执</option>    "+
					"</select>";				
	}
	
	function delmx(obj){
		mxts--;
		this.document.getElementById("mxcount").value=mxts;
		var rowidx = obj.parentNode.parentNode.rowIndex; // 获取对象所在表格中的行的位置，并删除当前行和下一行
		this.document.getElementById("ywmxtab").deleteRow(rowidx+1);
		this.document.getElementById("ywmxtab").deleteRow(rowidx);
	}
</script>


</head>
<body>
<html:form method="post" action="/hBusinessDetailReconciliationAction.do?method=sendMsg">
	<input id="business_name" type="hidden" value="HBusinessReconciliation">
	<input id="repeatmark" type="hidden" value="0">
	<table id="querybook" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
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
	    	<td ></td>
	    	<td >
	    	
	      		<table width="75%" border="0" cellspacing="0" cellpadding="0" align="center">
	        		
			       <tr>
					 <td  >
						<div  class="text_title"><span class="text_blue2">大额业务明细核对申请</span></div>
					</td>
				 </tr>
	        		<tr>
	          			<td>
		          			<div class="table_body">
                              
                                   <table class="table_content">
                                   <tr><td colspan="5">&nbsp;</td></tr>
                                   <tr>
                                   	<td colspan="5"><span class="text_tablehead">基本信息</span></td>
                                   </tr>
                                   	<tr>
										<td  class="text_tablehead_b">
				                		发起参与机构行号：
				                	</td>
				                  	<td>
				                  	<%
				                  	Hvpspartyinfo bankInfo = (Hvpspartyinfo) request.getSession()
				.getAttribute("bankInfo");
				                  	 %>
				                   		<input type="text" name="po.instgPty" readonly="readonly" value="${bankInfo.bankcode}" id="InstgPty"  maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
	          							<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 接收参与机构行号：
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instdPty" value='0000' readonly='readonly' id="InstdPty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td>&nbsp;</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                  		 发起直接参与机构：
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instgDrctPty" id="InstgDrctPty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                   		<span  class="STYLE1">*</span>
				                  	</td>
									<td  class="text_tablehead_b">
				                		接收直接参与机构：
				                	</td>
				                  	<td>
				                   		<input type="text" name="po.instdDrctPty" value='0000' readonly='readonly' id="InstdDrctPty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
	          							<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td>&nbsp;</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                	 系统编号：	
				                	</td>
				                  	<td>
				                   		<input type="text" name="po.systemCd" value='HVPS' readonly='readonly' id="SystemCd" maxlength="4" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
	          							<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 对账日期：
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.chckDt"  class="Wdate" onclick="WdatePicker()" id="ChckDt" maxlength="10" />
				                   		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td>&nbsp;</td>
				                 </tr>
				                  <tr>
                                   	<td colspan="4"><span class="text_tablehead">对账清单</span></td>
                                   </tr>
                                   <tr>
				                  	<td  class="text_tablehead_b">
				                  		明细总条数：
				                  	</td>
				                  	<td colspan="1" >
				                   		<input type='text' name='mxcount' id='mxcount' maxlength='12' readonly='readonly' value='0' />
				                   	</td>
				                   	<td>
				                   		<input name='AddButton' type='button'  style='cursor: pointer' class='button' value='增     加' onclick='addmx();' />
				                   	</td>
				                   	<td>&nbsp;</td>
				                  </tr>
				                  <tr>
				                  	<td  colspan='5'>
				                  		<table id="ywmxtab">    
										</table>
				                  	</td>
				                  </tr>
                                   

		          					</table>
		          					 <table>
                                                    	<tr><td colspan="4">&nbsp;</td></tr>
                                                    	<tr>
                                                    	
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td >
                                                    			<div class="table_content" align="center">
                                                    			<input name="addButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="checkAndSubmit();" />
                                                    			</div>
															</td>
                                                    		<td >&nbsp;</td>
                                                    	</tr>
                                                    	<tr><td colspan="4">&nbsp;</td></tr>
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td >
                                                    			<div class="table_content" align="center">
                                                    			<span class="STYLE1">说明：红色*标注项为必填项</span>
                                                    			</div>
															</td>
                                                    		<td >&nbsp;</td>
                                                    	</tr>
                                                    	<tr><td colspan="4">&nbsp;</td></tr>
                                                    </table>
		          			</div>
		          			 <div class="table_content">
                                                   
                                                    </div>
                                                    
		          			    			
	            		</td>
	        		</tr>
	    		</table>
	    		
	    	</td>	    	
	    	<td >
	  	</tr>  
	</table>
</html:form>
</body>
</html>
