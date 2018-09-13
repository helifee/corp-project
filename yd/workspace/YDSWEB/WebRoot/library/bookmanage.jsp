<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/ydb.css">
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/library/common/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	
	<script type="text/javascript" src="<%=basePath %>js/library/head.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/inputLimit.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/library/common/popup.js"></script>	
<title>远东工会图书馆--图书管理</title>

</head>
<body onload="init(); document.onkeydown();">
	<div class="container">
    	<s:hidden id="userpermit" name="userpermit" value="%{userpermit}"></s:hidden> 
    	<s:hidden id="userhid" name="userhid" value="%{userhid}"></s:hidden> 
	    <s:include value="head.jsp"></s:include>
	    <s:form id="booksearch" theme="simple">
		    <div id="search_t" class="span-14 margin_top_20 margin_left_20" >
		    	<div class="span-13  margin_left_20 font_weight_b">
		    		<div class="span-2 margin_left_20 text_right">
		    			<s:label value="ISBN号:  "/>
		    		</div>
		    		<div class="span-4 text_left">
		    			<s:textfield id="isbn" name="isbn" cssClass="span-3" maxlength="13"/>
		    		</div>
		    		<div class="span-2 margin_left_20 text_right">
		    			<s:label value="图书名称:"/>
		    		</div>
		    		<div class="span-3 text_left">
		    			<s:textfield id="bookname" name="bookname" cssClass="span-3" maxlength="40"/>
		    		</div>
		    	</div>
		    	<div class="span-13  margin_left_20 font_weight_b">
		    		<div class="span-2 margin_left_20 text_right">
		    			<s:label value="图书类型:"/>
		    		</div>
		    		<div class="span-4 text_left">
		    			<s:select id="bookclass" name="bookclass" cssClass="span-4" list="booksortlist" listKey="classid" listValue="classname"/>	
		    		</div>
		    		<div class="span-2 margin_left_20 text_right">
		    			<s:label value="图书状态:"/>
		    		</div>
		    		<div class="span-3 text_left">
		    			<s:select id="bookstate" name="bookstate" cssClass="span-3" list="#{'0':'','1':'借出','2':'空闲'}"/>	
		    		</div>
		    	</div>
		    	<div class="span-13  margin_left_20 font_weight_b">
		    		<div class="span-2 margin_left_20 text_right">
		    			<s:label  value="捐书人ID:"/>
		    		</div>
		    		<div class="span-8 text_left">
					    <s:textfield id="idInput" name="idInput"  cssClass="span-2" value="%{idInput}"></s:textfield>
		    			<s:label>&nbsp;&nbsp;&nbsp;&nbsp;姓名</s:label>
		    			<s:textfield id="nameInput" name="nameInput"  cssClass="span-2" value="%{nameInput}"></s:textfield>
		    		</div>
		    	</div>
		    </div>
		    
		    <div class="span-6 margin_top_20 ">
			    <div class="span-6 margin_top_6">
			    </div>
			    <div id="searchbtn" class="bttn span-2" onclick="searchclick();"> 
          			<a><span>检索 </span></a> 
	          	</div>
		    </div>

			<div class="span-23 margin_top_20">
			    <s:label id="a" name="a" value=""></s:label>
			</div>
		    <div id="managetable">
		    	<s:include value="managetable.jsp"></s:include>
		    </div>
			<div class="span-23 margin_top_20 margin_left_20">
		    	 <div class="span-10 margin_top_2 margin_left_20">
		              <s:label id="b" name="b" theme="simple" value=""/>
		         </div> 
		         <div class="span-2 margin_top_2">
		         	  <div id="updatebtn" class="bttn span-2 margin_top_2" onclick="submitclick();"> 
		         	  <a><span>提交</span></a> 
		         	  </div>
		         </div> 
		    </div>
        	<div id="searchfirm" class="span-6 margin_top_2 margin_left_20 text_center none" >
        
		    	<div id="searchfirmTitle" class=" span-6">
				      <s:label value="数据变更确认:" cssClass="font_weight_b"/>
				</div>
				  <div class="span-6 color_bl font_weight_b">
						<s:label id="mingc" name="mingc" value="您当前有更改内容没有保存，重新检索将导致您的更改内容丢失，确定检索吗？"></s:label>
		  	      </div>
			      <div id="searchokbtn" class="bttn span-3 text_right padding_top_10 " onclick="oksearchHys();"> 
          				<a><span>确定 </span></a> 
          		</div>
				<div id="searchcancelbtn" onclick="cancelsearchHys();" class=" bttn span-2 text_left padding_top_10"> 
          				<a><span>取消 </span></a> 
          		</div>		    
		 	</div> 
        	<div id="distconfirm" class="span-6 margin_top_2 margin_left_20 text_center none" >
        
		    	<div id="distconfirmTitle" class=" span-6">
				      <s:label value="员工密码确认:" cssClass="font_weight_b"/>
				</div>
				  <div class="span-6 color_bl font_weight_b">
						<s:label id="mingc" name="mingc" value="请输入您的密码："></s:label>
		  	      </div>
		  	       <div class="span-6 text_center padding_left_10">
						<s:password id="password" cssClass="span-4" name="xxx.mima" onkeyup="passwordEnter();" value="" maxlength="11"/>
		  	      </div>
			      
			      <div id="okbtn" class="bttn span-3 text_right " onclick="updatechange();"> 
          				<a><span>确定 </span></a> 
          		</div>
				<div id="cancelbtn" onclick="cancelmimaHys();" class=" bttn span-2 text_left"> 
          				<a><span>取消 </span></a> 
          		</div>		    
		 	</div> 
	 	<s:include value="commonLoading.jsp"></s:include>	
	 	<script type="text/javascript" src="<%=basePath %>js/library/bookmanage.js"></script>
	    </s:form>
	</div>
</body>
</html>