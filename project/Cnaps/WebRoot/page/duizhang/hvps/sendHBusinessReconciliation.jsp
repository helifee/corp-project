<%@ page contentType="text/html; charset=GBK" language="java"%>
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
<title> 大额业务对账申请 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript">
	function checkAndSubmit(){
		var flag=true;
		if(this.document.getElementById("InstgPty").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(this.document.getElementById("InstdPty").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(this.document.getElementById("InstgDrctPty").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(this.document.getElementById("InstdDrctPty").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(this.document.getElementById("SystemCd").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(this.document.getElementById("ChckDt").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=false;
		if(flag==true){
			this.document.forms[0].submit();
		}
		else{
			alert("输入要素不完整!");
		}
	}
</script>


</head>
<body>
<html:form method="post" action="/hBusinessReconciliationAction.do?method=sendMsg">
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
						<div  class="text_title"><span class="text_blue2">大额业务对账申请</span></div>
					</td>
				 </tr>
	        		<tr>
	          			<td>
		          			<div class="table_body">
                              
                                   <table class="table_content">
                                   <tr><td colspan="4">&nbsp;</td></tr>
                                   	<tr>
                                   	<%
				                  	Hvpspartyinfo bankInfo = (Hvpspartyinfo) request.getSession()
				.getAttribute("bankInfo");
				                  	 %>
										<td  class="text_tablehead_b">
				                		发起参与机构行号
				                	</td>
				                  	<td>
				                   		<input type="text" name="po.instgPty" value="${bankInfo.bankcode}" readonly="readonly" id="InstgPty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
	          							<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 接收参与机构行号
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instdPty" id="InstdPty" value='0000' readonly='readonly' maxlength="14" />
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                  		 发起直接参与机构
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instgDrctPty" id="InstgDrctPty"   maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                   		<span  class="STYLE1">*</span>
				                  	</td>
									<td  class="text_tablehead_b">
				                		接收直接参与机构
				                	</td>
				                  	<td>
				                   		<input type="text" name="po.instdDrctPty" id="InstdDrctPty" value='0000' readonly='readonly' maxlength="14" />
	          							<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                	 系统编号 	
				                	</td>
				                  	<td>
				                   		<input type="text" name="po.systemCd" id="SystemCd" value='HVPS' readonly='readonly' maxlength="4"/>
	          							<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 对账日期
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.chckDt"  class="Wdate" onclick="WdatePicker()" id="ChckDt" maxlength="10" />
				                   		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b">
				                  		备注
				                  	</td>
				                  	<td colspan="3" >
				                   		<textarea name="po.ustrd" class="textarea_msg" cols="69" rows="5" id="msgcnt" onKeyPress="charPress()"></textarea>
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
