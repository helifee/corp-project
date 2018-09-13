
<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%

String path = request.getContextPath();
%>
<html>

	<head>
		<title>手续费计算</title>
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
   
   var sxf = "";//手续费
   var ydf = "";//邮电费
   var ydjs = "";//异地加收
   var gbf="";//工本费
   var systemcd="";
  
   if(document.myform["radsyscd"][0].checked){
    	systemcd=document.myform["radsyscd"][0].value;
    }else{
    	systemcd=document.myform["radsyscd"][1].value;
    }
  if(systemcd=="HVPS"){
     sxf = document.getElementById('sxf1').value;//手续费
     ydf = document.getElementById('ydf1').value;//邮电费
     ydjs = document.getElementById('ydjs1').value;//异地加收
      gbf = document.getElementById('gbf1').value;//工本费
   }else{
     sxf = document.getElementById('sxf').value;//手续费
     ydf = document.getElementById('ydf').value;//邮电费
     ydjs = document.getElementById('ydjs').value;//异地加收
     gbf = document.getElementById('gbf').value;//工本费
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
							系统号
						</td>
						<td>
							<input type="radio" name="radsyscd" id="radsyscd" checked="checked"
								class="text_tablehead_b_rad" value="HVPS">
							大额	
						</td>
					<tr>
					<tr>
						<td class="text_tablehead_b">
							手续费
						</td>
						<td>
							<input name="charge" id="sxf1" type="text" title="手续费"
								maxlength="12" value="0.00" readonly="readonly" />

						</td>
					</tr>
					<tr>

						<td class="text_tablehead_b">
							邮电费
						</td>
						<td>
							<input name="postage" id="ydf1" type="text" title="邮电费"
								maxlength="12" value="0.00" readonly="readonly"/>

						</td>


					</tr>
					<tr>
						<td class="text_tablehead_b">
							异地加收
						</td>
						<td colspan="4">
							<input name="otherchange" id="ydjs1" type="text" title="异地加收"
								maxlength="12" value="0.00" readonly="readonly"/>
						</td>
					</tr>
					<tr>
						<td class="text_tablehead_b">
							工本费
						</td>
						<td colspan="4">
							<input name="counterfoil" id="gbf1" type="text" title="工本费"
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
							系统号
						</td>
						<td>
							<input type="radio" name="radsyscd" id="radsyscd"
								class="text_tablehead_b_rad" value="BEPS">
							小额
							
						</td>
					<tr>
					<tr>
						<td class="text_tablehead_b">
							手续费
						</td>
						<td>
							<input name="charge" id="sxf" type="text" title="手续费"
								maxlength="12" value="0.00" readonly="readonly"/>

						</td>
					</tr>
					<tr>

						<td class="text_tablehead_b">
							邮电费
						</td>
						<td>
							<input name="postage" id="ydf" type="text" title="邮电费"
								maxlength="12" value="0.00" readonly="readonly"/>

						</td>


					</tr>
					<tr>
						<td class="text_tablehead_b">
							异地加收
						</td>
						<td colspan="4">
							<input name="otherchange" id="ydjs" type="text" title="异地加收"
								maxlength="12" value="0.00" readonly="readonly"/>

						</td>
						
					</tr>
					<tr>
						<td class="text_tablehead_b">
							工本费
						</td>
						<td colspan="4">
							<input name="counterfoil" id="gbf" type="text" title="工本费"
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
								class="button" value="确  定" onclick="commitForm();" />
						</td>

					</tr>
				</table>
			</div>
		</form>
	</body>
</html>
