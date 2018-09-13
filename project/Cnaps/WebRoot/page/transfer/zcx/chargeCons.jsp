 
<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%

String path = request.getContextPath();
%>
<html>

<head>
<title>手续费计算</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet"	type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
  <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
  <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
 <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
         
<script language="javascript">
 		//还原金额   
			function rmoney(s)   
			{   
				var str=/\S/;
				if(!str.test(s)){
					return 0;
				}
				 return parseFloat(s.replace(/[^\d\.-]/g, ""));   
			}
	function chargeQuery()
	{
	  var pmttp =self.parent.document.getElementById("pmttp").value;//业务类型
	  var money=self.parent.document.getElementById("hkje").value;//汇款金额
	 
				   alert( rmoney(money)  );
					
					PubService.chargeQuery("7100",rmoney(money),"A100","20000","50000",function(obj){
					   
				
    		 				  if(obj==null ){
				 
				  alert("手续费信息不存在，或已失效，未查到相关数据" );
				 
				       
				   return;
				  }else{
				  for(var i=0;i<obj.length;i++)
{               
            var str = obj[i].msgtpcd.substring(0,4);
               
                    if(str =="beps"){
				   	      document.getElementById("sxf").value=obj[i].charge==null?"": obj[i].charge;//手续费
						  document.getElementById("ydf").value=obj[i].youdianfei==null?"": obj[i].youdianfei; 
						  document.getElementById("ydjs").value=obj[i].yidijiashou==null?"":obj[i].yidijiashou; 
				    
				    }
				     if(str =="hvps"){
				   	      document.getElementById("sxf1").value=obj[i].charge==null?"": obj[i].charge;//手续费
						  document.getElementById("ydf1").value=obj[i].youdianfei==null?"": obj[i].youdianfei; 
						  document.getElementById("ydjs1").value=obj[i].yidijiashou==null?"":obj[i].yidijiashou; 
				    
				    }
}
				  
				    
				   
						     
				
		 }
	   	});

		 
	}
function commitForm(){
   
   var sxf = "";//手续费
   var ydf = "";//邮电费
   var ydjs = "";//异地加收
   var systemcd="";
   
   var radsyscd = document.getElementById('radsyscd');
   if(radsyscd.value==""){
					alert("请选择系统号！");
					radsyscd.value = "";
					return false;
				}
   
   
    if(document.myform["radsyscd"][0].checked){
    	systemcd=document.myform["radsyscd"][0].value;
    }else{
    	systemcd=document.myform["radsyscd"][1].value;
    }
   
      
  if(systemcd=="HVPS"){
     sxf = document.getElementById('sxf1').value;//手续费
     ydf = document.getElementById('ydf1').value;//邮电费
     ydjs = document.getElementById('ydjs1').value;//异地加收
   }else{
     sxf = document.getElementById('sxf').value;//手续费
     ydf = document.getElementById('ydf').value;//邮电费
     ydjs = document.getElementById('ydjs').value;//异地加收
   } 
  

	parent.test(sxf,ydf,ydjs,systemcd);
	
  
}
</script>
</head>
<body  class="table_content"  onload="chargeQuery()">
   <form name="myform" id="myform" method="post" action="">
   <input name="xmlcode" id="xmlcode" type="hidden"      />
   <input name="pmttp" id="pmttp" type="hidden"      />
    	 <div class="table_content">
    	
    	
                                                   	<table>
	                                                  	 
	                                                 	  
	                                                      <tr>
                                                    			<td class="text_tablehead_b" >
																	系统号
																</td>
                                                    			<td >
																	
																	
																	<input type="radio" name="radsyscd" id="radsyscd" class="text_tablehead_b_rad"  value="hvps.111.001.01">大额
																<!-- 
																	<select name="radsyscd" id="radsyscd" onchange="chargeQuery()">
																	<option>请选择</option>
																	<option  value="hvps.111.001.01">大额</option>
																	<option  value="beps.133.001.01">小额</option>
																	</select>
																	 -->
																</td>
															
															<tr>
                                                    			<tr>
																<td class="text_tablehead_b" >
																	手续费
																</td>
																<td>
																	<input name="charge" id="sxf1" type="text" title="手续费" maxlength="12"  />
																
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																	邮电费
																</td>
																<td>
																	<input name="postage" id="ydf1" type="text" title="邮电费" maxlength="12"  />
																
																</td>
																
															
															</tr>
															<tr>
																	<td class="text_tablehead_b" >
																	异地加收
																</td>
																<td colspan="4">
																	<input name="otherchange" id="ydjs1" type="text" title="异地加收" maxlength="12" />
																
																</td>
															</tr>
															<tr>
                                                    			<td class="text_tablehead_b" >
																	&nbsp;
																</td>
															<tr>
															<tr>
                                                    			<td class="text_tablehead_b" >
																	系统号
																</td>
                                                    			<td >
																	
																	
																	<input type="radio" name="radsyscd" id="radsyscd" class="text_tablehead_b_rad"  value="beps.133.001.01">小额
																<!-- 
																	<select name="radsyscd" id="radsyscd" onchange="chargeQuery()">
																	<option>请选择</option>
																	<option  value="hvps.111.001.01">大额</option>
																	<option  value="beps.133.001.01">小额</option>
																	</select>
																	 -->
																</td>
															
															<tr>
                                                    			<tr>
																<td class="text_tablehead_b" >
																	手续费
																</td>
																<td>
																	<input name="charge" id="sxf" type="text" title="手续费" maxlength="12"  />
																
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																	邮电费
																</td>
																<td>
																	<input name="postage" id="ydf" type="text" title="邮电费" maxlength="12"  />
																
																</td>
																
															
															</tr>
															<tr>
																	<td class="text_tablehead_b" >
																	异地加收
																</td>
																<td colspan="4">
																	<input name="otherchange" id="ydjs" type="text" title="异地加收" maxlength="12" />
																
																</td>
															</tr>
															<tr>
                                                    			<td class="text_tablehead_b" >
																	&nbsp;
																</td>
															<tr>
															
                                                    		</table>
                                                  	</div>
                                                  	 <div class="table_content">
                                                    	<table>
                                                    	
                                                    		<tr>
                                                    		
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="确  定" onclick="commitForm();" />
                                                    			</td>
                                                    			
                                                    		</tr>
                                                    	</table>
                                                    </div>
                                                  	</form>
</body>
</html>
