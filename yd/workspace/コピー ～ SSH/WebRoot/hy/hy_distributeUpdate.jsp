<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ taglib prefix="sx" uri="/struts-dojo-tags"%> 
<jsp:include page="/hy/logincheck.jsp" />
<html>
<head>
<title>
会议室详细信息
</title>
<link href="css/generdistribute.css" rel="stylesheet" type="text/css" />
<sx:head debug = "true"/>



</head>
<script language="javascript">  
var distributenewOrUpdateSign = 0 ;
var distributehysidPublic  = 0  ; 
var distributehysmcPublic  = "" ;
var distributecjrsPublic   = 0  ;
var distributehysdhPublic  = "" ;
var distributehyssbPublic  = "" ;
var distributehysjsPublic  = 0  ;
var distributehysBgPublic  = 0  ;
var distributehysqxPublic  = 0  ;
var distributehysqyPublic  = 0  ;
var distributehyszxPublic  = 0  ;
var distributehyszyPublic  = 0  ;
var distributehyspxPublic  = 0  ;
function genggaiXianshiTable(hysid  , hysmc , cjrs , hysdh , hyssb , hysjs , hysBg , hysqx , hysqy , hyszx , hyszy , hyspx){
	distributenewOrUpdateSign = 1 ;

	distributehysidPublic  = hysid ; 
	distributehysmcPublic  = hysmc ;
    distributecjrsPublic   = cjrs  ;
	distributehysdhPublic  = hysdh ;
	distributehyssbPublic  = hyssb ;
	distributehysjsPublic  = hysjs ;
	distributehysBgPublic  = hysBg ;
	distributehysqxPublic  = hysqx ;
	distributehysqyPublic  = hysqy ;
	distributehyszxPublic  = hyszx ;
	distributehyszyPublic  = hyszy ;
	distributehyspxPublic  = hyspx ;
	distributehysdhPublic  = hysdh ;
	distributehyssbPublic  = hyssb ;

 	objDivHysId=document.getElementById("hysId").disabled = "";
 	objDivHysMc=document.getElementById("hysMc").disabled = "";
 	objDivHysRs=document.getElementById("hysRs").disabled = "";
 	objDivHysDh=document.getElementById("hysDh").disabled = "";
 	objDivHysSb=document.getElementById("hysSb").disabled = "";
 	objDivHysJs=document.getElementById("hysJs").disabled = "";
 	objDivHysBg=document.getElementById("hysBg").disabled = "";  	
 	objDivHysPx=document.getElementById("hysPx").disabled = "";
 	objDivHysQx=document.getElementById("hysQx").disabled = "";
 	objDivHysQy=document.getElementById("hysQy").disabled = "";
 	objDivHysZx=document.getElementById("hysZx").disabled = "";
 	objDivHysZy=document.getElementById("hysZy").disabled = "";
 	document.getElementById("tijiao").disabled = "";
 	document.getElementById("quxiao").disabled = "";
    
 	document.getElementById("hysId").value = hysid ;
 	document.getElementById("hysMc").value = hysmc ;
 	document.getElementById("hysRs").value = cjrs ;
 	document.getElementById("hysDh").value = hysdh ;
 	document.getElementById("hysSb").value = hyssb ;
 	document.getElementById("hysJs").value = hysjs ;

    if(hysBg==0){   	
 		objDivHysRs=document.getElementById("hysBg").value = "0" ;
 	}
 	if(hysBg==1){
 		objDivHysRs=document.getElementById("hysBg").value = "1" ;
 	}

 	document.getElementById("hysQx").value = hysqx ;
 	document.getElementById("hysQy").value = hysqy ;
 	document.getElementById("hysZx").value = hyszx ;
 	document.getElementById("hysZy").value = hyszy ;
 	document.getElementById("hysPx").value = hyspx ;
 	
    objDiv=document.getElementById("xinjiangenggaiTable") ;
    objDiv.style.display="";           
}

function xinjianXianshiTable(nextHysid , nextHyspx){
	distributenewOrUpdateSign = 0 ;
 	objDivHysId=document.getElementById("hysId").disabled = "";
 	objDivHysMc=document.getElementById("hysMc").disabled = "";
 	objDivHysRs=document.getElementById("hysRs").disabled = "";
 	objDivHysDh=document.getElementById("hysDh").disabled = "";
 	objDivHysSb=document.getElementById("hysSb").disabled = "";
 	objDivHysJs=document.getElementById("hysJs").disabled = "";
 	objDivHysBg=document.getElementById("hysBg").disabled = "";  	
 	objDivHysPx=document.getElementById("hysPx").disabled = "";
 	objDivHysQx=document.getElementById("hysQx").disabled = "";
 	objDivHysQy=document.getElementById("hysQy").disabled = "";
 	objDivHysZx=document.getElementById("hysZx").disabled = "";
 	objDivHysZy=document.getElementById("hysZy").disabled = "";
 	document.getElementById("tijiao").disabled = "";
 	document.getElementById("quxiao").disabled = "";
     	
 	document.getElementById("hysId").value = nextHysid ;
 	document.getElementById("hysMc").value = "" ;
 	document.getElementById("hysRs").value = "" ;
 	document.getElementById("hysDh").value = "" ;
 	document.getElementById("hysSb").value = "" ;
 	document.getElementById("hysJs").value = "" ;	
 	document.getElementById("hysBg").value = "0" ;   	
 	document.getElementById("hysQx").value = "" ;
 	document.getElementById("hysQy").value = "" ;
 	document.getElementById("hysZx").value = "" ;
 	document.getElementById("hysZy").value = "" ;
 	document.getElementById("hysPx").value = nextHyspx ;
 	
    objDiv=document.getElementById("xinjiangenggaiTable") ;
    objDiv.style.display="";           
 }



function distributeAction(){	
    targetForm = document.forms[0];
    targetForm.action = "distributeaction" ;
    targetForm.submit();
}



function distributeUpdateAction(){
    targetForm = document.forms[0];
    targetForm.action = "distributeUpdateAction" ;
    targetForm.submit();
}



function distributeDeleteAction(hysid){
 	if(confirm("确定删除吗?")){
 		 targetForm = document.forms[0];
 	     targetForm.action = "distributeDeleteAction?hysIddelete="+hysid ;
 	     targetForm.submit();
    }  
}


function submitTypeDistribute(){
 	objDivHysId=document.getElementById("hysId");
 	objDivHysMc=document.getElementById("hysMc");
 	objDivHysRs=document.getElementById("hysRs");
 	objDivHysJs=document.getElementById("hysJs");
 	objDivHysBg=document.getElementById("hysBg");  	
 	objDivHysQx=document.getElementById("hysQx");
 	objDivHysQy=document.getElementById("hysQy");
 	objDivHysZx=document.getElementById("hysZx");
 	objDivHysZy=document.getElementById("hysZy");
 	objDivHysPx=document.getElementById("hysPx");
 	objDivHysDh=document.getElementById("hysDh");
 	objDivHysSb=document.getElementById("hysSb");
 	if(objDivHysId.value ==""){
     	alert("会议室ID不能为空！");
     	return;
     }	                    
 	if(objDivHysMc.value ==""){
     	alert("会议室名称 不能为空！");
     	return;
     }
 	if(objDivHysRs.value ==""){
     	alert("容纳人数不能为空！");
     	return;
     }
 	if(isZhengShu(objDivHysRs.value) == false){
 		alert("容纳人数不能为小数！");
 		return;
 	}
 	if(objDivHysDh.value != ""){
 	  if(isZhengShu(objDivHysDh.value) == false){
 		  alert("电话号码不能为小数！");
 		  return;
 	  }
 	}
 	if(objDivHysJs.value ==""){
     	alert("网线接口数量不能为空！");
     	return;
     }
 	if(isZhengShu(objDivHysJs.value) == false){
 		alert("网线接口数量不能为小数！");
 		return;
 	}
 	if(objDivHysBg.value == 2){
     	alert("是否需要会议室报告不能为空！");
     	return;
     }
 	if(objDivHysPx.value ==""){
     	alert("排列顺序不能为空！");
     	return;
     }
 	if(objDivHysQx.value ==""){
     	alert("图像起点X坐标不能为空！");
     	return;
     }
 	if(isZhengShu(objDivHysQx.value) == false){
 		alert("图像起点X坐标不能为小数！");
 		return;
 	}
 	if(objDivHysQy.value ==""){
     	alert("图像起点Y坐标不能为空！");
     	return;
     }
 	if(isZhengShu(objDivHysQy.value) == false){
 		alert("图像起点Y坐标不能为小数！");
 		return;
 	}
 	if(objDivHysZx.value ==""){
     	alert("图像终点X坐标不能为空！");
     	return;
     }
 	if(isZhengShu(objDivHysZx.value) == false){
 		alert("图像终点X坐标不能为小数！");
 		return;
 	}
 	if(objDivHysZy.value ==""){
     	alert("图像终点Y坐标不能为空！");
     	return;
     }
 	if(isZhengShu(objDivHysZy.value) == false){
 		alert("图像终点Y坐标不能为小数！");
 		return;
 	}
 //	distributehysdhPublic  = hysdh ;
//	distributehyssbPublic  = hyssb ;
    if(distributenewOrUpdateSign == 1){
    	if(objDivHysId.value == distributehysidPublic && objDivHysMc.value == distributehysmcPublic && 
    	   objDivHysRs.value == distributecjrsPublic  && objDivHysJs.value == distributehysjsPublic && 
    	   objDivHysBg.value == distributehysBgPublic && objDivHysPx.value == distributehyspxPublic &&
    	   objDivHysQx.value == distributehysqxPublic && objDivHysQy.value == distributehysqyPublic && 
    	   objDivHysZx.value == distributehyszxPublic && objDivHysZy.value == distributehyszyPublic &&
    	   objDivHysDh.value == distributehysdhPublic && objDivHysSb.value == distributehyssbPublic ){
     	   alert("没有修改的字段！");
      	     return;
    	}		
    }

 	targetForm = document.forms[0];
    targetForm.action = "distributeNewOrUpdateAction" ;
    targetForm.submit();
}
function cancleDistribute(){
	
	document.getElementById("hysId").value = "" ;
 	document.getElementById("hysMc").value = "" ;
 	document.getElementById("hysRs").value = "" ;
 	document.getElementById("hysDh").value = "" ;
 	document.getElementById("hysSb").value = "" ;
 	document.getElementById("hysJs").value = "" ;	
 	document.getElementById("hysBg").value = "2" ;   	
 	document.getElementById("hysQx").value = "" ;
 	document.getElementById("hysQy").value = "" ;
 	document.getElementById("hysZx").value = "" ;
 	document.getElementById("hysZy").value = "" ;
 	document.getElementById("hysPx").value = "" ;

 	distributenewOrUpdateSign = 0 ;
 	objDivHysId=document.getElementById("hysId").disabled = "true";
 	objDivHysMc=document.getElementById("hysMc").disabled = "true";
 	objDivHysRs=document.getElementById("hysRs").disabled = "true";
 	objDivHysDh=document.getElementById("hysDh").disabled = "true";
 	objDivHysSb=document.getElementById("hysSb").disabled = "true";
 	objDivHysJs=document.getElementById("hysJs").disabled = "true";
 	objDivHysBg=document.getElementById("hysBg").disabled = "true";  	
 	objDivHysPx=document.getElementById("hysPx").disabled = "true";
 	objDivHysQx=document.getElementById("hysQx").disabled = "true";
 	objDivHysQy=document.getElementById("hysQy").disabled = "true";
 	objDivHysZx=document.getElementById("hysZx").disabled = "true";
 	objDivHysZy=document.getElementById("hysZy").disabled = "true";
 	document.getElementById("tijiao").disabled = "true";
 	document.getElementById("quxiao").disabled = "true";
	
}
function isZhengShu(panduanData){
	strToFloat = parseFloat (panduanData);
	strToInt = parseInt(panduanData);
	if(strToFloat == strToInt){
	    return true;
	}else{
	    return false;
	}
//	return true;	 
}
function hysYySummit(hysId){
   var  targetForm = document.forms[0];
   targetForm.action="conferenceinit?hysId="+hysId ; 
   targetForm.submit();
}
 
</script>   

<body   bgcolor="#ecf6ff">
<table width="972"  border="0" cellpadding="0" cellspacing="0" align="center">
  <tr height="100" >
    <td width="37"></td>
    <td width="898"><p align="center"><font size="5" color="green"><strong>变更会议室</strong></font></p></td>
    <td width="37"></td>
  </tr>
  <tr>
    <td></td>
    <td>
      <s:form  action=""  theme="simple" method="post"> 
        <table width="898"  border="0"     cellpadding="2" cellspacing="2"  rules="all">
          <tr>
           <td align="right">
              <s:a href="#" onclick="distributeUpdateAction()"><font   size=2>刷新</font></s:a>
           </td>
          </tr> 
        </table>
        <table >
          <tr>
            <td>
	          <table width="898"  border="0"  id="xianshiTable"   cellpadding="2" cellspacing="1"  rules="none">   
                <tr bgcolor="#6c95d0" align="center"  >   
                   <td width="30"   ><font  color="#FFFFFF" size=2>ID</font></td>
                   <td width="135"><font  color="#FFFFFF" size=2>会议室名</font></td>
                   <td width="66" ><font  color="#FFFFFF" size=2>容纳人数</font></td>
                   <td width="30"><font  color="#FFFFFF" size=2>电话</font></td>
                   <td width="138" ><font  color="#FFFFFF" size=2>设备</font></td>
                   <td width="103"><font  color="#FFFFFF" size=2>网线接口数量</font></td> 
                   <td width="68"><font  color="#FFFFFF" size=2>图像起点X</font></td>
                   <td width="68"><font  color="#FFFFFF" size=2>图像起点Y</font></td>  
                   <td width="68"><font  color="#FFFFFF" size=2>图像终点X</font></td>
                   <td width="68"><font  color="#FFFFFF" size=2>图像终点Y</font></td>  
                   <td  bgcolor="#6c95d0" width="70"></td>
                </tr>
              </table> 
            </td>          
          </tr>  
          <s:if test="distributes.size > 0">
          <s:iterator value="distributes"> 
          <tr>
            <td>
              <table width="898"  border="0"   id="xianshiTable<s:property value="id"/>"  cellpadding="2" cellspacing="1"  rules="none">         
                <tr bgcolor="#ffffd9" onmouseover="showTable('<s:property value="id"/>')" onmouseout="hideTable('<s:property value="id"/>' )" > 
                  <td width="30" align="center" ><font   size=2><s:property value="id"/></font></td>
                  <td width="135"><font   size=2><s:property value="hysmc" /></font></td>
                  <td width="66" align="center"><font   size=2><s:property value="rnrs" /></font></td>
                  <td width="30"><font   size=2><s:property value="dh"/></font></td>
                  <td width="138" ><font   size=2><s:property value="sb" /></font></td>
                  <td width="103" align="center" ><font   size=2><s:property value="wxjk" /></font></td>
                  <td width="68" align="left"><font   size=2><s:property value="imagefromx" /></font></td>
                  <td width="68" align="left"><font   size=2><s:property value="imagefromy" /></font></td> 
                  <td width="68" align="left"><font   size=2><s:property value="imagetox" /></font></td>
                  <td width="68" align="left"><font   size=2><s:property value="imagetoy" /></font></td> 
                  <td  width="70" align="center">
                    <s:a href="#" onclick=" genggaiXianshiTable(%{id} , '%{hysmc}' , %{rnrs} , '%{dh}' , '%{sb}' , %{wxjk} , %{hybgbz} ,
                                                                %{imagefromx} , %{imagefromy}, %{imagetox} , %{imagetoy} , %{sortid});">
                                                                <font  size=2>更改</font></s:a>
                    
                    <s:a href="#" onclick="distributeDeleteAction( %{id});"><font   size=2>删除</font></s:a>
                  </td>         
                </tr>
              </table>
            </td>
          </tr>               
          </s:iterator>
          </s:if>  
        </table>
        <table width="895"  border="0"    cellpadding="2" cellspacing="2"  rules="all" >   
          <tr>
            <td>
              <s:a href="#" onclick=" xinjianXianshiTable(%{nextMessage.getNextHysid()} , %{nextMessage.getNextHyspx()});">
                 <font   size=2>新建</font>
              </s:a>
            </td>
          </tr> 
        </table>
        <table width="895"  border="0"  id="xinjiangenggaiTable"  cellpadding="2" cellspacing="2"  rules="all"   >    
          <tr >
            <td align ="left" width="180"> <font color="green" size=4 >新建/变更会议室:</font> </td>
            <td  width="180"></td>
            <td width="130"></td>
            <td width="415"></td>
          </tr>
          <tr>
            <td align ="left">  会议室ID:</td>
            <td><input type="text" id="hysId"  value="" style="WIDTH: 150px; HEIGHT: 20px"  name = "hysId"   disabled = "disabled" maxlength="2"/></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td align ="left">  会议室名称:</td>
            <td><input type="text" id="hysMc"  value="" style="WIDTH: 150px; HEIGHT: 20px"  name = "hysMc"   disabled = "disabled" maxlength="34"/></td>
            <td></td>
            <td></td>
          </tr> 
          <tr>
           <td align ="left"> 容纳人数:</td>
           <td>
             <input type="text"  id="hysRs" value="" style="WIDTH: 150px; HEIGHT: 20px" name = "hysRs" disabled = "disabled" maxlength="3"/>
           </td>
           <td></td>
           <td></td>
          </tr>
          <tr>
            <td align ="left">电话:</td>
            <td>
              <input type="text"  id="hysDh" value="" style="WIDTH: 150px; HEIGHT: 20px" name = "hysDh" disabled = "disabled" maxlength="4"/>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td align ="left">设备: </td>
            <td>
              <input type="text"  id="hysSb" value="" style="WIDTH: 150px; HEIGHT: 20px" name = "hysSb"  disabled = "disabled" maxlength="255"/>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td align ="left">   网线接口数量:</td>
            <td>
              <input type="text"   id="hysJs" value="" style="WIDTH: 150px; HEIGHT: 20px" name = "hysJs"  disabled = "disabled" maxlength="3"/>
            </td>
            <td></td>
            <td></td>
          </tr> 
          <tr>
            <td align ="left">是否需要会议室报告：</td>
            <td> 
              <select name="hysBg" style="WIDTH: 150px; HEIGHT: 20px" id= "hysBg"  disabled = "disabled" >
                <option value="0" selected="selected">否</option>
                <option value="1">是</option>
              </select>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
           <td align ="left">  排列顺序：</td>
           <td>
             <input type="text" id="hysPx" value="" style="WIDTH: 150px; HEIGHT: 20px" name = "hysPx" disabled = "disabled" maxlength="2"/>
           </td>
           <td></td>
           <td></td>
          </tr>
          <tr>
            <td align ="left"> 图像起点X坐标：</td>
            <td>
              <input type="text"   id="hysQx" value="" style="WIDTH: 150px; HEIGHT: 20px" name ="hysQx"  disabled = "disabled" maxlength="4"/>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td align ="left">图像起点Y坐标：</td>
            <td>
              <input type="text"  id="hysQy" value="" style="WIDTH: 150px; HEIGHT: 20px" name = "hysQy" disabled = "disabled" maxlength="4"/>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
           <td>图像终点X坐标：</td>
           <td>
            <input type="text"  id="hysZx" value="" style="WIDTH: 150px; HEIGHT: 20px" name = "hysZx" disabled = "disabled" maxlength="4"/>
           </td>
           <td></td>
           <td></td>
          </tr>
          <tr>
            <td > 图像终点Y坐标：</td>
            <td>
              <input type="text"  id="hysZy" value="" style="WIDTH: 150px; HEIGHT: 20px" name = "hysZy" disabled = "disabled" maxlength="4"/>
            </td>
            <td>
              <input type="button" name="tijiao" value="提交" id = "tijiao" style="WIDTH: 60px; HEIGHT: 24px"  
                     onclick = "submitTypeDistribute();" disabled = "disabled"/>
              <input type="button" name="quxiao" value="取消" id = "quxiao" style="WIDTH: 60px; HEIGHT: 24px"  
                     onclick = "cancleDistribute();" disabled = "disabled"/>
            </td>
            <td align="right">
              <s:a href="#"     onclick="distributeAction();"><font   size=2>返回</font></s:a>
            </td>
          </tr>
        </table>  
      </s:form>
    </td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>
</body>
</html>
         