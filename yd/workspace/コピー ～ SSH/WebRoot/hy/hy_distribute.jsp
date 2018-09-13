<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%>
<jsp:include page="/hy/logincheck.jsp" />
<html>
<head>
<title>会议室详细信息</title>
<link href="css/generdistribute.css" rel="stylesheet" type="text/css" />
<sx:head debug="true" />



</head>
<script language="javascript">  

function hysYySummit(hysId){
    var  targetForm = document.forms[0];
	targetForm.action="conferenceinit?hysId="+hysId ; 
	targetForm.submit();
}

xinjiangenggaiTableflag=0;
function xinjiangenggaiTable(){
    objDiv=document.getElementById("xinjiangenggaiTable") ;
    if(xinjiangenggaiTableflag == 0){    	    
    	objDiv.style.display="";
    	xinjiangenggaiTableflag=1;
    }
    else{
        if(xinjiangenggaiTableflag == 1){
            objDiv.style.display="none"; 
            xinjiangenggaiTableflag = 0 ;
        } 
    }    
}

function distributeAction(conferensituationId){	
   targetForm = document.forms[0];
   targetForm.action = "conferenceinit?hamianMC=hysyuyue&conferensituationId="+parseInt(conferensituationId) ;
   targetForm.submit();
}

function show(hysm ){
   tableName = 'xianshiTable'+hysm;
   divName = 'layer'+hysm;
   document.getElementById(tableName).rows(0).style.backgroundColor=r='#DE7594';
   var objDiv=document.getElementById(divName) ;
   objDiv.style.backgroundColor='#DE7594';
    	
}

function hide(hysm ){
   tableName = 'xianshiTable'+hysm;
   divName = 'layer'+hysm;
   document.getElementById(tableName).rows(0).style.backgroundColor=r='#ffffd9';
   var objDiv=document.getElementById(divName) ;
   objDiv.style.backgroundColor='#6C89CB';
} 

function showTable(hysm){
   tableName = 'xianshiTable'+hysm;
   divName = 'layer'+hysm;
   objDiv=document.getElementById(divName).style.backgroundColor='#DE7594'; 
   document.getElementById(tableName).rows(0).style.backgroundColor='#DE7594';         
}  
function hideTable(hysm){
   tableName = 'xianshiTable'+hysm;
   divName = 'layer'+hysm;
   objDiv=document.getElementById(divName).style.backgroundColor='#6C89CB'; 
   document.getElementById(tableName).rows(0).style.backgroundColor='#ffffd9'; 
}

function hysYySummit(hysId){
	var  targetForm = document.forms[0];
	targetForm.action="conferenceinit?hysId="+hysId ; 
	targetForm.submit();
 }

function distributeAction(conferensituationId){	
   	targetForm = document.forms[0];
   	targetForm.action = "conferenceinit?hamianMC=hysyuyue&conferensituationId="+parseInt(conferensituationId) ;
   	targetForm.submit();
}
      
function distributeUpdateAction(){	
  	targetForm = document.forms[0];
  	targetForm.action = "distributeUpdateAction" ;
  	targetForm.submit();
}
      
</script>

<body bgcolor="#ecf6ff">
<table width="972" height="337" border="0" align="center"
	cellpadding="0" cellspacing="0">
	<tr>
		<td width="44" height="72"></td>
		<td width="889">
		<p align="center"><font size="5" color="green"><strong>会议室分布</strong></font></p>
		</td>
		<td width="39"></td>
	</tr>
	<tr>
		<td width="336" height="173" align="center">&nbsp;</td>
		<td width="300" align="center">&nbsp;
		<table width="895" border="0" cellpadding="2" cellspacing="2"
			rules="all">
			<tr>
				<td align="right"><s:a href="#"
					onclick="distributeUpdateAction();">变更</s:a></td>
			</tr>
		</table>
		<div id="juedui" style="position: relative;"><img
			src="images/conference_map.jpg"> <!--     
            <div id="layer1" onmouseover="show('layer1');" onmouseout="hide('layer1');" style="filter:alpha(opacity=70); background-color:#6C89CB; position:absolute; width:90px;  height:80px;  left: 3px;   top: 2px; "  onclick = "hysYySummit('1');"><span class='edge003'></span><span class='container003'><font  size=5>1</font></span> </div>    
	        <div id="layer2" onmouseover="show('layer2');" onmouseout="hide('layer2');" style="filter:alpha(opacity=70); background-color:#6C89CB; position:absolute; width:48px;  height:80px;  left: 592px; top: 2px; "  onclick = "hysYySummit('2>');" ><span class='edge003'></span><span class='container003'><font  size=5>2</font></span></div>  
	        <div id="layer3" onmouseover="show('layer3');" onmouseout="hide('layer3');" style="filter:alpha(opacity=70); background-color:#6C89CB; position:absolute; width:100px; height:80px;  left: 363px;  top: 2px; "  onclick = "hysYySummit('3');"><span class='edge003'></span><span class='container003'><font  size=5>3</font></span></div>  
	        <div id="layer4" onmouseover="show('layer4');" onmouseout="hide('layer4');" style="filter:alpha(opacity=70); background-color:#6C89CB; position:absolute; width:48px;  height:80px;  left: 592px; top: 105px;"  onclick = "hysYySummit('4');"><span class='edge003'></span><span class='container003'><font  size=5>4</font></span></div>
	        <div id="layer5" onmouseover="show('layer5');" onmouseout="hide('layer5');" style="filter:alpha(opacity=70); background-color:#6C89CB; position:absolute; width:30px;  height:74px;  left: 867px;   top: 110px; " onclick = "hysYySummit('5');"><span class='edge003'></span><span class='container003'><font  size=5>5</font></span></div>   
	        <div id="layer6" onmouseover="show('layer6');" onmouseout="hide('layer6');" style="filter:alpha(opacity=70); background-color:#6C89CB; position:absolute; width:30px;  height:74px;  left: 867px;  top: 2px; "   onclick = "hysYySummit('6');"><span class='edge003'></span><span class='container003'><font  size=5>6</font></span></div>
--> <s:if test="divMessagelist.size > 0">
			<s:iterator value="divMessagelist">
				<div id="layer<s:property value="hysid"/>"
					onmouseover="show('<s:property value="hysid"/>' );"
					onmouseout="hide('<s:property value="hysid"/>' );"
					style="filter:alpha(opacity=70); background-color:#6C89CB; position:absolute; width:<s:property value="divWidth" />px;  height:<s:property value="divHeigth" />px;  left: <s:property value="imageFromX" />px;   top: <s:property value="imageFromY" />px; "
					onclick="hysYySummit('<s:property value="hysid"/>');"><span
					class='edge003'></span><span class='container003'><font
					size=5><s:property value="hysid" /></font></span></div>
			</s:iterator>
		</s:if></div>
		</td>
		<td width="336" align="center">&nbsp;</td>
	</tr>
	<tr>
		<td height="227" colspan="3" align="center"><s:form
			theme="simple" method="post">
			<table width="895" border="0" cellpadding="2" cellspacing="2"
				rules="all">

				<tr>
					<td align="left"><font color="green" size=4>会议室信息:</font></td>
				</tr>
			</table>
			<table>
				<tr>
					<td>
					<table width="890" border="0" id="xianshiTable" cellpadding="2"
						cellspacing="1" rules="none">
						<tr bgcolor="#6c95d0" align="center">

							<td width="30"><font color="#FFFFFF" size=2>ID</font></td>
							<td width="135"><font color="#FFFFFF" size=2>会议室名</font></td>
							<td width="66"><font color="#FFFFFF" size=2>容纳人数</font></td>
							<td width="35"><font color="#FFFFFF" size=2>电话</font></td>
							<td width="181"><font color="#FFFFFF" size=2>设备</font></td>
							<td width="107"><font color="#FFFFFF" size=2>网线接口数量</font></td>
							<td width="70"><font color="#FFFFFF" size=2>图像起点X</font></td>
							<td width="70"><font color="#FFFFFF" size=2>图像起点Y</font></td>
							<td width="70"><font color="#FFFFFF" size=2>图像终点X</font></td>
							<td width="70"><font color="#FFFFFF" size=2>图像终点Y</font></td>

						</tr>
					</table>
					</td>
					<td></td>
				</tr>

				<s:if test="distributes.size > 0">
					<s:iterator value="distributes">
						<tr>
							<td>
							<table width="890" border="0"
								id="xianshiTable<s:property value="id"/>" cellpadding="2"
								cellspacing="1" rules="none">
								<tr bgcolor="#ffffd9"
									onmouseover="showTable('<s:property value="id"/>')"
									onmouseout="hideTable('<s:property value="id"/>' )"
									onclick="hysYySummit('<s:property value="id"/>');">

									<td width="30" align="center"><font size=2><s:property
										value="id" /></font></td>
									<td width="135"><font size=2><s:property
										value="hysmc" /></font></td>
									<td width="66" align="center"><font size=2><s:property
										value="rnrs" /></font></td>
									<td width="35"><font size=2><s:property value="dh" /></font></td>
									<td width="181"><font size=2><s:property
										value="sb" /></font></td>
									<td width="107" align="right"><font size=2><s:property
										value="wxjk" /></font></td>
									<td width="70" align="right"><font size=2><s:property
										value="imagefromx" /></font></td>
									<td width="70" align="right"><font size=2><s:property
										value="imagefromy" /></font></td>
									<td width="70" align="right"><font size=2><s:property
										value="imagetox" /></font></td>
									<td width="70" align="right"><font size=2><s:property
										value="imagetoy" /></font></td>
								</tr>
							</table>
							</td>
							<td></td>
						</tr>
					</s:iterator>
				</s:if>
			</table>

		</s:form></td>
	</tr>
	<tr>
	</tr>
</table>

</body>
</html>
