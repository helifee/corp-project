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
<title> ֧ƱȦ�淢�� </title>
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
						<div  class="text_title"><span class="text_blue2">֧ƱȦ�淢��</span></div>
					</td>
				 </tr>
	        		<tr>
	          			<td>
		          			<div class="table_body">
                              
                                   <table class="table_content">
                                   <tr><td colspan="4">&nbsp;</td></tr>
                                   <tr>
                                   	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                   </tr>
                                 <tr>
										<td  class="text_tablehead_b">
				                		�����������к�
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.instgpty" id="instgpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 ���ղ�������к�
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instdpty" id="instdpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
										<td  class="text_tablehead_b">
				                		����ֱ�Ӳ�������к�
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.instgdrctpty" id="instgdrctpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 ����ֱ�Ӳ�������к�
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instddrctpty" id="instddrctpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				               	</tr>
				                <tr>
										<td  class="text_tablehead_b">
				                		ԭ����ֱ�Ӳ������
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.orgnlinstddrctpty" id="orgnlinstddrctpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 ԭ���ı�ʶ��
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.orgnlmsgid" id="orgnlmsgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                <tr>
										<td  class="text_tablehead_b">
				                		ԭ�������ͺ�
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.orgnlmsgtpcd" id="orgnlmsgtpcd" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 ֧ƱȦ����������ʶ
				                  	</td>
				                  	<td >
				                   		<select name="po.applyorccltp" id="applyorccltp">
				                   			<option value="AC00">֧ƱȦ������</option>
				                   			<option value="AC01">֧ƱȦ����</option>
				                   		</select>
				                   		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                		��Ʊ����
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.issuedt" id="issuedt" value="" onclick="WdatePicker()" class="Wdate">
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 ֧Ʊ����
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.notesno" id="notesno" maxlength="32" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                		��Ʊ���к�
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.drawerbrnchid" id="drawerbrnchid" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 ��Ʊ���˺�
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.draweracct" id="draweracct" maxlength="32" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
										<td  class="text_tablehead_b">
				                		���
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.amount" id="amount" maxlength="12" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 У��ģʽ
				                  	</td>
				                  	<td >
				                   		<select name="po.chckmd" id="chckmd">
				                   			<option value="CD00">֧�����뵥����</option>
				                   			<option value="CD01">֧������������</option>
				                   			<option value="CD02">����ǩ��</option>
				                   			<option value="CD03">Ӱ��</option>
				                   		</select>
				                   		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                		У������
				                	</td>
				                  	<td>
				                  		<input type="text" name="po.chckcd" id="chckcd" maxlength="512" />
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 ֧Ʊ����ͼ�񳤶�
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.imagefrontlngth" id="imagefrontlngth" maxlength="8" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                		֧Ʊ����ͼ������
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
                                                    			<input name="addButton" type="button" style="cursor: pointer" class="button" value="��  ��" onclick="ckeckwethornull();" />
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
                                                    			<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
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
