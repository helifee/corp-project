
<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%

String path = request.getContextPath();
%>
<html>

	<head>
		<title>�����Ѽ���</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css"
			type="text/css" media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
		<script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>

	<script language="javascript">
 
	function chargeQuery(){
	 	
	  document.getElementById("sxf").value=self.parent.document.getElementById("hvpssxf").value;
	  document.getElementById("ydf").value=self.parent.document.getElementById("hvpsydf").value; 
	  document.getElementById("ydjs").value=self.parent.document.getElementById("hvpsydjs").value; 
	  document.getElementById("sxf1").value=self.parent.document.getElementById("bepssxf").value;
	  document.getElementById("ydf1").value=self.parent.document.getElementById("bepsydf").value; 
	  document.getElementById("ydjs1").value=self.parent.document.getElementById("bepsydjs").value;
	  
}


function commitForm(){
   
   var sxf = "";//������
   var ydf = "";//�ʵ��
   var ydjs = "";//��ؼ���
   var gbf="";//������
   var systemcd="";
  
   if(document.myform["radsyscd"][0].checked){
    	systemcd=document.myform["radsyscd"][0].value;
    }else{
    	systemcd=document.myform["radsyscd"][1].value;
    }
  if(systemcd=="HVPS"){
     sxf = document.getElementById('sxf1').value;//������
     ydf = document.getElementById('ydf1').value;//�ʵ��
     ydjs = document.getElementById('ydjs1').value;//��ؼ���
      gbf = document.getElementById('gbf1').value;//������
   }else{
     sxf = document.getElementById('sxf').value;//������
     ydf = document.getElementById('ydf').value;//�ʵ��
     ydjs = document.getElementById('ydjs').value;//��ؼ���
     gbf = document.getElementById('gbf').value;//������
   }
   
	parent.test(sxf,ydf,ydjs,gbf,systemcd);
	
  
}
</script>
	</head>
	<body class="table_content" onload="chargeQuery();">
		<form name="myform" id="myform" method="post" action="">
			<input name="xmlcode" id="xmlcode" type="hidden" />
			<input name="pmttp" id="pmttp" type="hidden" />
			<div class="table_content" id="chargehvpsdiv">
				<table>
					<tr>
						<td class="text_tablehead_b">
							ϵͳ��
						</td>
						<td>
							<input type="radio" name="radsyscd" id="radsyscd" checked="checked"
								class="text_tablehead_b_rad" value="HVPS">
							���	
						</td>
					<tr>
					<tr>
						<td class="text_tablehead_b">
							������
						</td>
						<td>
							<input name="charge" id="sxf1" type="text" title="������"
								maxlength="12" value="0.00" readonly="readonly" />

						</td>
					</tr>
					<tr>

						<td class="text_tablehead_b">
							�ʵ��
						</td>
						<td>
							<input name="postage" id="ydf1" type="text" title="�ʵ��"
								maxlength="12" value="0.00" readonly="readonly"/>

						</td>


					</tr>
					<tr>
						<td class="text_tablehead_b">
							��ؼ���
						</td>
						<td colspan="4">
							<input name="otherchange" id="ydjs1" type="text" title="��ؼ���"
								maxlength="12" value="0.00" readonly="readonly"/>
						</td>
					</tr>
					<tr>
						<td class="text_tablehead_b">
							������
						</td>
						<td colspan="4">
							<input name="counterfoil" id="gbf1" type="text" title="������"
								maxlength="12" value="0.00" readonly="readonly"/>

						</td>
					</tr>
					<tr>
						<td class="text_tablehead_b">
							&nbsp;
						</td>
					</tr>
					</table>
					</div>
				<div class="table_content" id="chargebepsdiv">	
					<table>
					<tr>
						<td class="text_tablehead_b">
							ϵͳ��
						</td>
						<td>
							<input type="radio" name="radsyscd" id="radsyscd"
								class="text_tablehead_b_rad" value="BEPS">
							С��
							
						</td>
					<tr>
					<tr>
						<td class="text_tablehead_b">
							������
						</td>
						<td>
							<input name="charge" id="sxf" type="text" title="������"
								maxlength="12" value="0.00" readonly="readonly"/>

						</td>
					</tr>
					<tr>

						<td class="text_tablehead_b">
							�ʵ��
						</td>
						<td>
							<input name="postage" id="ydf" type="text" title="�ʵ��"
								maxlength="12" value="0.00" readonly="readonly"/>

						</td>


					</tr>
					<tr>
						<td class="text_tablehead_b">
							��ؼ���
						</td>
						<td colspan="4">
							<input name="otherchange" id="ydjs" type="text" title="��ؼ���"
								maxlength="12" value="0.00" readonly="readonly"/>

						</td>
						
					</tr>
					<tr>
						<td class="text_tablehead_b">
							������
						</td>
						<td colspan="4">
							<input name="counterfoil" id="gbf" type="text" title="������"
								maxlength="12" value="0.00" readonly="readonly"/>

						</td>
					</tr>
					<tr>
						<td class="text_tablehead_b">
							&nbsp;
						</td>
					<tr>
				</table>
			</div>
			<div class="table_content">
				<table>

					<tr>

						<td class="text_tablehead_b">
							&nbsp;
						</td>
						<td>
							<input name="addButton" type="button" style="cursor: pointer"
								class="button" value="ȷ  ��" onclick="commitForm();" />
						</td>

					</tr>
				</table>
			</div>
		</form>
	</body>
</html>
