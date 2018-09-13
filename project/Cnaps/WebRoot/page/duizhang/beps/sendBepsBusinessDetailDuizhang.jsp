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
<title> С��ҵ����ϸ�˶����� </title>
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
		
		var x=this.document.getElementsByName("MsgTpCd");
		var y=this.document.getElementsByName("PrcSts");
		var x=this.document.getElementsByName("TxNetgDt");
		var y=this.document.getElementsByName("TxNetgRnd");
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
			alert("����Ҫ�ز�����!");
		}
	}
	
	
	
	function addmx(){
				mxts++;
				this.document.getElementById("NbOfTxs").value=mxts;
				
				var newTr0=this.document.getElementById("ywmxtab").insertRow();
				var newTd0=newTr0.insertCell();
				newTd0.className="text_tablehead_b";
				newTd0.innerHTML="�������ʹ���";
				var newTd1=newTr0.insertCell();
				newTd1.innerHTML="<input type='text' name='MsgTpCd' id='MsgTpCd' maxlength='35' onkeyup='fun_number(this)' onblur='fun_number(this)' />"+
				"<span  class='STYLE1'>*</span>";
				var newTd2=newTr0.insertCell();
				newTd2.className="text_tablehead_b";
				newTd2.innerHTML="���͡����ձ�־";
				var newTd3=newTr0.insertCell();
				newTd3.innerHTML="<select name='SndRcvTp' id='SndRcvTp'>"+
			        "<option value='SR00'}>����/����</option>"+
				    "<option value='SR01'}>����/����</option>"+
				 "</select>"+
				"<span  class='STYLE1'>*</span>";
				var newTd4=newTr0.insertCell();
				newTd4.innerHTML="<input type='button' value='ɾ  ��' id='delButton' class='button' onclick='delmx(this);' />"+
				"<span  class='STYLE1'>*</span>";
				
				var newTr1=this.document.getElementById("ywmxtab").insertRow();
				var newTd5=newTr1.insertCell();
				newTd5.className="text_tablehead_b";
				newTd5.innerHTML="����״̬";
				var newTd6=newTr1.insertCell();
				newTd6.innerHTML=	"<select name='PrcSts'>"+
					"<option value=''>��ѡ��</option>"+
					"<option value='PR04'  }>������</option>   "+
					"<option value='PR09'  }>�Ѿܾ�</option>   "+
					"<option value='PR08'  }>�ѳ���</option>   "+
					"<option value='PR09'  }>�Ѿܾ�</option>   "+
					"<option value='PR21'  }>��ֹ��</option>   "+
					"<option value='PR22'  }>�ѳ���</option>   "+
					"<option value='PR32'  }>�ѳ���</option>   "+
					"<option value='PR05'  }>�ѳɹ�</option>   "+
					"<option value='PR98' }>��ȷ��    </option>"+
					"<option value='PR90' }>�½�      </option>"+
					"<option value='PR81' }>������    </option>"+
					"<option value='PR92' }>�����    </option>"+
					"<option value='PR93' }>������    </option>"+
					"<option value='PR95' }>�����    </option>"+
					"<option value='PR96' }>������    </option>"+
					"<option value='PR97' }>�ѷ���    </option>"+
					"<option value='PR11' }>�������Ŷ�</option>"+ 
					"<option value='PR12' }>�������Ŷ�</option>"+ 
					"<option value='PR99' }>����</option>      "+
					"<option value='PR03' }>������</option>    "+
					"<option value='PR89' }>����ִ </option>   "+
					"<option value='PR88' }>�ѻ�ִ</option>    "+
					"</select>";
				var newTd7=newTr1.insertCell();
				newTd7.className="text_tablehead_b";
				newTd7.innerHTML="��������";
				var newTd8=newTr1.insertCell();
				newTd8.innerHTML="<input type='text' name='TxNetgDt' id='TxNetgDt' class='Wdate' onclick='WdatePicker()' id='ChckDt' />"+
				"<span  class='STYLE1'>*</span>";		
				
				var newTr2=this.document.getElementById("ywmxtab").insertRow();
				var newTd9=newTr2.insertCell();
				newTd9.className="text_tablehead_b";
				newTd9.innerHTML="�����";
				var newTd10=newTr2.insertCell();
				newTd10.innerHTML="<input type='text' name='TxNetgRnd' id=' TxNetgRnd' maxlength='2' onkeyup='fun_number(this)' onblur='fun_number(this)' />"+
				"<span  class='STYLE1'>*</span>";	
	}
	
	function delmx(obj){
		mxts--;
		this.document.getElementById("NbOfTxs").value=mxts;
		var rowidx = obj.parentNode.parentNode.rowIndex; // ��ȡ�������ڱ���е��е�λ�ã���ɾ����ǰ�к���һ��
		this.document.getElementById("ywmxtab").deleteRow(rowidx+2);
		this.document.getElementById("ywmxtab").deleteRow(rowidx+1);
		this.document.getElementById("ywmxtab").deleteRow(rowidx);
	}
</script>


</head>
<body>
<html:form method="post" action="/bepsBusinessDetailDuizhangAction.do?method=sendMsg">
	<input id="business_name" type="hidden" value="bepsBusinessDetailDuizhang">
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
						<div  class="text_title"><span class="text_blue2">С��ҵ����ϸ�˶�����</span></div>
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
				                		�����������к�
				                	</td>
				                  	<td>
				                   		<input type="text" name="po.instgPty" id="InstgPty" 	value="${bankInfo.bankcode}" readonly="readonly" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
	          							<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 ���ղ�������к�
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instdPty" id="InstdPty" value='0000' readonly='readonly' maxlength="14" />
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                  		 ����ֱ�Ӳ������
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instgDrctPty" id="InstgDrctPty"   maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                   		<span  class="STYLE1">*</span>
				                  	</td>
									<td  class="text_tablehead_b">
				                		����ֱ�Ӳ������
				                	</td>
				                  	<td>
				                   		<input type="text" name="po.instdDrctPty" id="InstdDrctPty" value='0000' readonly='readonly' maxlength="14" />
	          							<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
									<td  class="text_tablehead_b">
				                	 ϵͳ��� 	
				                	</td>
				                  	<td>
				                   		<input type="text" name="po.systemCd" id="SystemCd" value='BEPS' readonly='readonly' maxlength="4" />
	          							<span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 ��������
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.chckDt"  class="Wdate" onclick="WdatePicker()" id="ChckDt" maxlength="10" />
				                   		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b">
				                  		��ע
				                  	</td>
				                  	<td colspan="3" >
				                   		<textarea name="po.ustrd" class="textarea_msg" cols="69" rows="5" id="msgcnt" onKeyPress="charPress()"></textarea>
				                   	</td>
				                  </tr>
				                  <tr>
                                   	<td colspan="4"><span class="text_tablehead">������ϸ�嵥</span></td>
                                   </tr>
                                   <tr>
				                  	<td  class="text_tablehead_b">
				                  		��ϸ��������
				                  	</td>
				                  	<td colspan="1" >
				                   		<input type='text' name='nbOfTxs' id='NbOfTxs' maxlength='12' readonly='readonly' value='0' />
				                   	</td>
				                   	<td>
				                   		<input name='AddButton' type='button'  style='cursor: pointer' class='button' value='��     ��' onclick='addmx();' />
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
                                                    			<input name="addButton" type="button" style="cursor: pointer" class="button" value="��  ��" onclick="checkAndSubmit();" />
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
