 
<%@ page language="java" import="java.util.*" pageEncoding="GBK"%>
<%

String path = request.getContextPath();
%>
<html>

<head>
<title>�����Ѽ���</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet"	type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
  <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
  <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
 <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
         
<script language="javascript">
 		//��ԭ���   
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
	  var pmttp =self.parent.document.getElementById("pmttp").value;//ҵ������
	  var money=self.parent.document.getElementById("hkje").value;//�����
	 
				   alert( rmoney(money)  );
					
					PubService.chargeQuery("7100",rmoney(money),"A100","20000","50000",function(obj){
					   
				
    		 				  if(obj==null ){
				 
				  alert("��������Ϣ�����ڣ�����ʧЧ��δ�鵽�������" );
				 
				       
				   return;
				  }else{
				  for(var i=0;i<obj.length;i++)
{               
            var str = obj[i].msgtpcd.substring(0,4);
               
                    if(str =="beps"){
				   	      document.getElementById("sxf").value=obj[i].charge==null?"": obj[i].charge;//������
						  document.getElementById("ydf").value=obj[i].youdianfei==null?"": obj[i].youdianfei; 
						  document.getElementById("ydjs").value=obj[i].yidijiashou==null?"":obj[i].yidijiashou; 
				    
				    }
				     if(str =="hvps"){
				   	      document.getElementById("sxf1").value=obj[i].charge==null?"": obj[i].charge;//������
						  document.getElementById("ydf1").value=obj[i].youdianfei==null?"": obj[i].youdianfei; 
						  document.getElementById("ydjs1").value=obj[i].yidijiashou==null?"":obj[i].yidijiashou; 
				    
				    }
}
				  
				    
				   
						     
				
		 }
	   	});

		 
	}
function commitForm(){
   
   var sxf = "";//������
   var ydf = "";//�ʵ��
   var ydjs = "";//��ؼ���
   var systemcd="";
   
   var radsyscd = document.getElementById('radsyscd');
   if(radsyscd.value==""){
					alert("��ѡ��ϵͳ�ţ�");
					radsyscd.value = "";
					return false;
				}
   
   
    if(document.myform["radsyscd"][0].checked){
    	systemcd=document.myform["radsyscd"][0].value;
    }else{
    	systemcd=document.myform["radsyscd"][1].value;
    }
   
      
  if(systemcd=="HVPS"){
     sxf = document.getElementById('sxf1').value;//������
     ydf = document.getElementById('ydf1').value;//�ʵ��
     ydjs = document.getElementById('ydjs1').value;//��ؼ���
   }else{
     sxf = document.getElementById('sxf').value;//������
     ydf = document.getElementById('ydf').value;//�ʵ��
     ydjs = document.getElementById('ydjs').value;//��ؼ���
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
																	ϵͳ��
																</td>
                                                    			<td >
																	
																	
																	<input type="radio" name="radsyscd" id="radsyscd" class="text_tablehead_b_rad"  value="hvps.111.001.01">���
																<!-- 
																	<select name="radsyscd" id="radsyscd" onchange="chargeQuery()">
																	<option>��ѡ��</option>
																	<option  value="hvps.111.001.01">���</option>
																	<option  value="beps.133.001.01">С��</option>
																	</select>
																	 -->
																</td>
															
															<tr>
                                                    			<tr>
																<td class="text_tablehead_b" >
																	������
																</td>
																<td>
																	<input name="charge" id="sxf1" type="text" title="������" maxlength="12"  />
																
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																	�ʵ��
																</td>
																<td>
																	<input name="postage" id="ydf1" type="text" title="�ʵ��" maxlength="12"  />
																
																</td>
																
															
															</tr>
															<tr>
																	<td class="text_tablehead_b" >
																	��ؼ���
																</td>
																<td colspan="4">
																	<input name="otherchange" id="ydjs1" type="text" title="��ؼ���" maxlength="12" />
																
																</td>
															</tr>
															<tr>
                                                    			<td class="text_tablehead_b" >
																	&nbsp;
																</td>
															<tr>
															<tr>
                                                    			<td class="text_tablehead_b" >
																	ϵͳ��
																</td>
                                                    			<td >
																	
																	
																	<input type="radio" name="radsyscd" id="radsyscd" class="text_tablehead_b_rad"  value="beps.133.001.01">С��
																<!-- 
																	<select name="radsyscd" id="radsyscd" onchange="chargeQuery()">
																	<option>��ѡ��</option>
																	<option  value="hvps.111.001.01">���</option>
																	<option  value="beps.133.001.01">С��</option>
																	</select>
																	 -->
																</td>
															
															<tr>
                                                    			<tr>
																<td class="text_tablehead_b" >
																	������
																</td>
																<td>
																	<input name="charge" id="sxf" type="text" title="������" maxlength="12"  />
																
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																	�ʵ��
																</td>
																<td>
																	<input name="postage" id="ydf" type="text" title="�ʵ��" maxlength="12"  />
																
																</td>
																
															
															</tr>
															<tr>
																	<td class="text_tablehead_b" >
																	��ؼ���
																</td>
																<td colspan="4">
																	<input name="otherchange" id="ydjs" type="text" title="��ؼ���" maxlength="12" />
																
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
																		class="button" value="ȷ  ��" onclick="commitForm();" />
                                                    			</td>
                                                    			
                                                    		</tr>
                                                    	</table>
                                                    </div>
                                                  	</form>
</body>
</html>
