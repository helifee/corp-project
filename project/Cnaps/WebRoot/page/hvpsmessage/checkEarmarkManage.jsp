<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 支票圈存发送 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript">
	
</script>


</head>
<body >
<html:form method="post" action="/checkEarmarkManageAction.do?method=sendMsg">
	<input id="business_name" type="hidden" value="checkearmarkmanage">
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
						<div  class="text_title"><span class="text_blue2">支票圈存发送</span></div>
					</td>
				 </tr>
	        		<tr>
	          			<td>
		          			<div class="table_body">
                              
                                   <table class="table_content">
                                   <tr><td colspan="4">&nbsp;</td></tr>
                                   <tr>
                                   	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                   </tr>
                                 <tr>
										<td  class="text_tablehead_b">
				                		发起参与机构行号
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.instgpty" id="instgpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 接收参与机构行号
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instdpty" id="instdpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
										<td  class="text_tablehead_b">
				                		发起直接参与机构行号
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.instgdrctpty" id="instgdrctpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 接收直接参与机构行号
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instddrctpty" id="instddrctpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				               	</tr>
				                <tr>
										<td  class="text_tablehead_b">
				                		原发起直接参与机构
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.orgnlinstddrctpty" id="orgnlinstddrctpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 原报文标识号
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.orgnlmsgid" id="orgnlmsgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                <tr>
										<td  class="text_tablehead_b">
				                		原报文类型号
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.orgnlmsgtpcd" id="orgnlmsgtpcd" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 支票圈存申请解除标识
				                  	</td>
				                  	<td >
				                   		<select name="po.applyorccltp" id="applyorccltp">
				                   			<option value="AC00">支票圈存申请</option>
				                   			<option value="AC01">支票圈存解除</option>
				                   		</select>
				                   		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                		出票日期
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.issuedt" id="issuedt" value="" onclick="WdatePicker()" class="Wdate">
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 支票号码
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.notesno" id="notesno" maxlength="32" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                		出票行行号
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.drawerbrnchid" id="drawerbrnchid" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 出票人账号
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.draweracct" id="draweracct" maxlength="32" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
										<td  class="text_tablehead_b">
				                		金额
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.amount" id="amount" maxlength="12" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 校验模式
				                  	</td>
				                  	<td >
				                   		<select name="po.chckmd" id="chckmd">
				                   			<option value="CD00">支付密码单密码</option>
				                   			<option value="CD01">支付密码器密码</option>
				                   			<option value="CD02">数字签名</option>
				                   			<option value="CD03">影像</option>
				                   		</select>
				                   		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                		校验密码
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.chckcd" id="chckcd" maxlength="512" />
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 支票正面图像长度
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.imagefrontlngth" id="imagefrontlngth" maxlength="8" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                		支票正面图像数据
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.imagefrontdt" id="imagefrontdt" maxlength="400000"/>
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
                                                    			<input name="addButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="ckeckwethornull();" />
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
