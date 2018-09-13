<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>会议室预约统计一览</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />

<script language="JavaScript" type="text/javascript"
	src="js/prototype.js"></script>
<script language="JavaScript" type="text/javascript"
	src="js/common.js"></script>
<script language="JavaScript" type="text/javascript"
	src="js/applicationStatics.js"></script>
</head>
<body onload="init();">


<div id ="divPosInfoMain" class="container">
<div class="span-24 title"><h2>会议室预约统计一览</h2></div>
<s:form action="" method="post" theme="simple" name="staticsYuyuetongji"
	id="staticsYuyuetongji">
	<div class="nTab span-24">
	     <div class="TabTitle">
                <ul id="myTab0">
                    <li id="stat_1" class="active bd_r_1sccc" onclick="tabFlagChange(1); nTabs(this,0);setTab('disMethod', 1 , 3);">月统计</li>
                    <li id="stat_2" class="normal bd_r_1sccc" onclick="tabFlagChange(2); nTabs(this,1);setTab('disMethod', 2 , 3);">年统计</li>
                    <li id="stat_3" class="normal bd_r_1sccc" onclick="tabFlagChange(3); nTabs(this,2);setTab('disMethod', 3 , 3);">视图统计</li>
                </ul>
         </div>
         <div class="TabContent span-24">   
             <div class="prepend-1 span-23 last"> 
               <div id="disStaticYear1111" class="span-4" >  					
	           	  <s:label id="posInfosCnt" value="年份"></s:label>：<s:select name="staticsyear"  list="yearList"  onchange="yueyueStaticsAction(); " /> 	
			   </div>
			   <div id="con_disMethod_1" class="span-7">
			              统计方式： 
			     <input type="radio" name="radDisM" value="NumByM" id="NumByM" onclick = "radDisMFlagChange(1);setTab('radDisM', 1, 2);"/>
			     <label for="NumByM">次数 </label>  
			     <input type="radio" name="radDisM" value="EffByM" id="EffByM" onclick = "radDisMFlagChange(2);setTab('radDisM', 2, 2);"/>
			     <label for="EffByM">利用率</label>           
			   </div> 
			   
			   <div id="con_disMethod_2" class="none span-7">
			              统计方式： 
			     <input type="radio" name="radDisY" value="NumByY" id="NumByY" onclick = "radDisYFlagChange(1);setTab('radDisY', 1, 2);"/>
			     <label for="NumByY">次数 </label>  
			     <input type="radio" name="radDisY" value="EffByY" id="EffByY" onclick = "radDisYFlagChange(2);setTab('radDisY', 2, 2);"/>
			     <label for="EffByY">利用率</label>			   
			   </div>
			   
			   <div id="con_disMethod_3" class="none span-8">
			           表现方式：
			     <input type="radio" name="radDisV" value="viewByP" id="viewByP" onclick = "radDisVFlagChange(1);setTab('radDisV', 1, 3);"/>
			     <label for="viewByP">饼状图 </label>  
			     <input type="radio" name="radDisV" value="viewByZ" id="viewByZ" onclick = "radDisVFlagChange(2);setTab('radDisV', 2, 3);"/>
			     <label for="viewByZ">柱状图</label>	
			     <input type="radio" name="radDisV" value="viewByX" id="viewByX" onclick = "radDisVFlagChange(3);setTab('radDisV', 3, 3);"/>
			     <label for="viewByX">折线图</label>		   
			   </div>
			   <div class="span-9"></div>
			</div>  
	        <div id="div_hy_staticsAjax" class="span-24 text_left padding_bottom_4">
	                 <s:include value="hy_statistics.jsp" />
	        </div>        
	     </div>
   </div>
</s:form>
</div>
 <!--  	
				   <a href="#" onclick="conferenceinitAction('<s:property value="yyDate"/>');">返回</a>
				  -->
</body>
</html>


