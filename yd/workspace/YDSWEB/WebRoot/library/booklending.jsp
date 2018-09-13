<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<%@ taglib prefix="s" uri="/struts-tags"%>
<title>远东工会图书馆--图书借阅</title>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!-- 共通JS -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	
	
	
<!-- 页面用js -->
			<script type="text/javascript" src="<%=basePath %>js/library/head.js"></script>
				<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>

			<script type="text/javascript" src="<%=basePath %>js/library/common/popup.js"></script>	
			<script type="text/javascript" src="<%=basePath %>js/library/common/inputLimit.js"></script>
			<script type="text/javascript" src="<%=basePath %>js/library/common/commonMessage.js"></script>	

<!-- 共通CSS -->
<link href="<%=basePath%>css/ydb.css" rel="stylesheet" type="text/css">
</head>
<body onload="init();">
<!-- 页面头部DIV -->
<div id="titleDiv"></div>

<s:form id ="bookjiegm" name="bookjiegm" method ="post" theme="simple" >
<div class="container">
<s:include value="head.jsp" />
			<!-- 隐藏用户信息 -->
         <div class="none">
              <s:textfield id="title1" name="title1" theme="simple" value="%{booklending_userbklimit.booknumlimit}"/>
              <s:textfield id="title2" name="title2" theme="simple" value="%{booklending_userbklimit.booklendednum}"/>
               <s:textfield id="title3" name="title3" theme="simple" value="%{booklending_userbklimit.bookreadnum}"/>
          </div> 
			<!-- 条件栏的DIV定义 -->
		<div class="span-23 margin_top_2 ">
<!-- head部分-->		    
		    <div class="span-23 margin_top_10 ">
		             <div class="span-9 margin_top_2  ">
<!--			             <div class="span-6 margin_top_2  ">-->
<!--					          <s:label id="useridl" value="ISBN号："/>  -->
<!--			                  <s:textfield id="bookIsbn" name="bookIsbn" cssClass="span-x padding_left_2" theme="simple" value="" />-->
<!--			            </div>-->
<!--          				<div class="bttn float_l  span-2 margin_top_2 text_left" onclick="addbuttonclick();" > -->
<!--          								<a><span>追 加 </span></a> -->
<!--          				-->
<!--          				 </div>-->
          				 
          				 		<div class=" span-6  margin_left_20 font_weight_b font_size_18 text_left">
						               <s:label id="isbnnum" name="isbnnum" value="ISBN号："></s:label>
						               <s:textfield id="isbn" name="isbn" onkeyup="addbck();"  cssClass="span-x" maxlength="17"  value=""></s:textfield>
						              
						               
					               </div>
					               		<div class="bttn padding_right_34  text_left" style="margin:0px" onclick="addbuttonclick();" > 
          									<a><span>追加 </span></a> 
          								</div>	
		             </div>      
		    </div>
<!--明细head部分    -->		    
		    <div class="span-23 last">
				      <s:label value="借书明细:" cssClass="font_weight_b"/>
			</div>
<!--明细部分    -->
		    <div class=" span-15" id="">
				<div class="span-22 last "  >
					 <table id="SignFrame" class="grid text_center midintro ellipsis">
				          <tr>
				            <th class="none">Bookid</th><th class="percent_14">ISBN号</th><th class="percent_40">图书名称</th><th>作者</th><th class="percent_30">出版社</th><th>操作</th><th class="none">volumenum</th>
				          
		  	         </table>
<!--最后一行Index -->
    				<input name='txtTRLastIndex' type='hidden' id='txtTRLastIndex' value="1" />			  	         
		  	      </div>			    
		    </div>
<!-- 提交订货按钮 -->
		 <div class="span-23 margin_top_20 margin_left_20">
		    	<div class="span-9 margin_top_2 margin_left_20">
		              <s:label id="b" name="b" theme="simple" value=""/>
		          </div> 
          		<div class="bttn span-2 margin_top_2" onclick="submitclick();" > 
          					<a><span>提交 </span></a> 
          		</div>		          
		    </div>
<!--明细弹出层部分    -->
<!--明细弹出层head部分    -->		    

		    <div id="distInfo" class=" span-22 ">
		    	<div id="distInfoTitle" class=" span-22">
				      <s:label value="请从列表中选择您想借阅的书籍:" cssClass="font_weight_b"/>
				</div>
				<div class="span-23">
					 <table id="jieshumxtbl" class="griddiv  text_center ellipsis">
				          <tr>
				            <th class="none">Bookid</th><th class="percent_16">ISBN号</th><th class="percent_40">图书名称</th><th class="w_84">作者</th><th class="percent_30">出版社</th><th  class="">选择</th><th class="none">volumenum</th>
				          </tr>			          
				          
		  	         </table>
		  	         <!--最后一行Index -->
    				<input name='txtpopupTRLastIndex' type='hidden' id='txtpopupTRLastIndex' value="1" />		
		  	      </div>
		  	      <div class="span-21">
						 <div id="tanchubutton" onclick="addbookmx();" class=" bttn span-10 text_right padding_top_10 padding_left_10 text_right"> 
          								<a><span>确定 </span></a> 
          				 </div>
					      <div id="tanchubtnqx" onclick="cancelHys();" class=" bttn span-2 text_right padding_top_10"> 
          								<a><span>取消 </span></a> 
          				 </div>
			      </div>
		    </div>
		    <div id="distconfirm" class="span-6 margin_top_2 margin_left_20 text_center">
		    	<div id="distconfirmTitle" class=" span-6">
				      <s:label value="员工密码确认:" cssClass="font_weight_b"/>
				</div>
				  <div class="span-6">
						<s:label id="mingc" name="mingc" value="请输入您的密码：" cssClass="color_bl font_weight_b"></s:label>
		  	      </div>
		  	       <div class="span-6 text_center padding_left_10">
						<s:password id="password" onkeyup="mimaclick();" cssClass="span-4   " name="xxx.mima" value="" maxlength="11"></s:password>
		  	      </div>
			      
			      <div id="tanchubtn" class="bttn span-3 text_right    " onclick="sumitlending();"> 
          				<a><span>确定 </span></a> 
          		</div>
				<div id="tanchubtnqx" onclick="cancelmimaHys();" class=" bttn span-2 text_right  "> 
          				<a><span>取消 </span></a> 
          		</div>
	
          		
		    </div>			    	    
</div>
</div>
 	<s:include value="commonLoading.jsp"></s:include>
 				<script type="text/javascript" src="<%=basePath %>js/library/booklending.js"></script>
</s:form>
</body>
</html>